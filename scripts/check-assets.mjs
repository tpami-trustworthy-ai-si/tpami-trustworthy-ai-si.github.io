#!/usr/bin/env node
/**
 * Verifies that every guest editor photo referenced in src/config/editors.ts
 * exists in public/images/editors/, and reports anything odd about it
 * (non-square, very small, very large file).
 *
 *   npm run check:assets
 *
 * Exit code is 0 even when photos are missing — the site renders a monogram
 * fallback — but the report tells you exactly what is still outstanding.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG = path.join(ROOT, 'src/config/editors.ts');

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (useColor ? `\x1b[${code}m` : '');
const c = {
  reset: paint(0),
  dim: paint(2),
  bold: paint(1),
  green: paint(32),
  yellow: paint(33),
  red: paint(31),
  cyan: paint(36),
};

/** Minimal parse of the editors array — avoids needing a TS toolchain here. */
function readEditors() {
  const source = fs.readFileSync(CONFIG, 'utf8');
  const dirMatch = source.match(/editorPhotoDir\s*=\s*['"]([^'"]+)['"]/);
  const photoDir = dirMatch ? dirMatch[1] : 'images/editors';

  const editors = [];
  const blocks = source.split(/\n\s{2}\{\n/).slice(1);
  for (const block of blocks) {
    const get = (key) => {
      const m = block.match(new RegExp(`\\b${key}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
      return m ? m[1].replace(/\\'/g, "'") : '';
    };
    const name = get('name');
    if (!name) continue;
    editors.push({ id: get('id'), name, photo: get('photo') });
  }
  return { editors, photoDir };
}

/** Read intrinsic dimensions for PNG / JPEG / WebP without a dependency. */
function imageSize(buffer) {
  // PNG
  if (buffer.length > 24 && buffer.toString('ascii', 1, 4) === 'PNG') {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // WebP (VP8X / VP8 / VP8L)
  if (buffer.length > 30 && buffer.toString('ascii', 0, 4) === 'RIFF' &&
      buffer.toString('ascii', 8, 12) === 'WEBP') {
    const fmt = buffer.toString('ascii', 12, 16);
    if (fmt === 'VP8X') {
      return {
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (fmt === 'VP8 ') {
      return {
        width: buffer.readUInt16LE(26) & 0x3fff,
        height: buffer.readUInt16LE(28) & 0x3fff,
      };
    }
    return null;
  }
  // JPEG
  if (buffer.length > 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buffer.length) {
      if (buffer[offset] !== 0xff) {
        offset += 1;
        continue;
      }
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf &&
          ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return {
          height: buffer.readUInt16BE(offset + 5),
          width: buffer.readUInt16BE(offset + 7),
        };
      }
      offset += 2 + length;
    }
  }
  return null;
}

const { editors, photoDir } = readEditors();
const dir = path.join(ROOT, 'public', photoDir);

console.log(
  `\n${c.bold}Guest editor photos${c.reset} ${c.dim}(public/${photoDir}/)${c.reset}\n`,
);

let ok = 0;
let missing = 0;
let warned = 0;

for (const editor of editors) {
  const label = editor.name.padEnd(20);

  if (!editor.photo) {
    console.log(
      `  ${c.yellow}○${c.reset} ${label} ${c.dim}no photo configured — monogram fallback${c.reset}`,
    );
    missing += 1;
    continue;
  }

  const file = path.join(dir, editor.photo);
  if (!fs.existsSync(file)) {
    console.log(
      `  ${c.red}✕${c.reset} ${label} ${c.red}missing${c.reset} ${c.dim}${editor.photo}${c.reset}`,
    );
    missing += 1;
    continue;
  }

  const stat = fs.statSync(file);
  const kb = Math.round(stat.size / 1024);
  const size = imageSize(fs.readFileSync(file));

  const notes = [];
  if (size) {
    const ratio = size.width / size.height;
    if (ratio < 0.9 || ratio > 1.11) {
      notes.push(`not square (${size.width}x${size.height}) — will be centre-cropped`);
    }
    if (Math.min(size.width, size.height) < 400) {
      notes.push(`small (${size.width}x${size.height}) — 600px or more recommended`);
    }
  } else {
    notes.push('could not read dimensions');
  }
  if (kb > 500) notes.push(`${kb} KB — consider compressing`);

  if (notes.length) {
    warned += 1;
    console.log(
      `  ${c.yellow}!${c.reset} ${label} ${c.dim}${editor.photo}${c.reset}\n      ${c.yellow}${notes.join('\n      ')}${c.reset}`,
    );
  } else {
    ok += 1;
    console.log(
      `  ${c.green}✓${c.reset} ${label} ${c.dim}${editor.photo} · ${size.width}x${size.height} · ${kb} KB${c.reset}`,
    );
  }
}

// Files present in the folder that no editor references.
if (fs.existsSync(dir)) {
  const referenced = new Set(editors.map((e) => e.photo).filter(Boolean));
  const orphans = fs
    .readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f) && !referenced.has(f));
  if (orphans.length) {
    console.log(
      `\n  ${c.cyan}i${c.reset} unreferenced files in the folder: ${c.dim}${orphans.join(', ')}${c.reset}`,
    );
  }
}

console.log(
  `\n  ${c.bold}${ok} ready${c.reset}, ${warned} with warnings, ${missing} missing.\n`,
);
if (missing) {
  console.log(
    `  ${c.dim}Add the files to public/${photoDir}/ and make sure the name matches the` +
      ` \`photo\` field in src/config/editors.ts.${c.reset}\n`,
  );
}
