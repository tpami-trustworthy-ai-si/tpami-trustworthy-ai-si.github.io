#!/usr/bin/env node
/**
 * Renders public/og.png — the 1200x630 social preview card — from the values in
 * src/config/. Re-run it after changing the title, the deadline or the submission status:
 *
 *   npm run og
 *
 * Inter is loaded from scripts/og-assets/ through a throwaway fontconfig file,
 * so nothing is installed into the system font directories.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = path.join(ROOT, 'scripts/og-assets');
const OUT = path.join(ROOT, 'public/og.png');

/* -- Point fontconfig at the bundled Inter files --------------------------- */

const cacheDir = fs.mkdtempSync(path.join(os.tmpdir(), 'si-fontconfig-'));
const confFile = path.join(cacheDir, 'fonts.conf');
fs.writeFileSync(
  confFile,
  `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "urn:fontconfig:fonts.dtd">
<fontconfig>
  <dir>${FONT_DIR}</dir>
  <dir>/usr/share/fonts</dir>
  <cachedir>${cacheDir}</cachedir>
</fontconfig>
`,
);
process.env.FONTCONFIG_FILE = confFile;

const sharp = (await import('sharp')).default;

/* -- Values from the site configuration ------------------------------------ */

const read = (file) => fs.readFileSync(path.join(ROOT, 'src/config', file), 'utf8');
const pick = (source, key) => {
  source = source.replace(/\bconst (\w+)\s*=\s*/g, '$1: ');
  const m = source.match(new RegExp(`\\b${key}:\\s*\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'") : '';
};

const siteSrc = read('site.ts');
const datesSrc = read('dates.ts');

const TITLE = pick(siteSrc, 'title');
const SUBTITLE = pick(siteSrc, 'subtitle');
const JOURNAL_SHORT = pick(siteSrc, 'journalShort');
const HOST = (pick(siteSrc, 'url') || 'https://tpami-trustworthy-ai-si.github.io/')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '');

const STATUS = pick(siteSrc, 'submissionStatus');
const STATUS_LABEL = { open: 'Submissions open', upcoming: 'Opening soon', closed: 'Submissions closed' }[STATUS];

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
const deadlineIso = pick(datesSrc, 'submissionDeadline');
const DEADLINE = deadlineIso
  ? (() => {
      const [y, m, d] = deadlineIso.split('-').map(Number);
      return `${d} ${MONTHS[m - 1]} ${y}`;
    })()
  : '';
if (!TITLE || !SUBTITLE || !DEADLINE || !STATUS_LABEL) {
  throw new Error('Missing title, deadline or status in the site configuration.');
}

/* -- Layout ---------------------------------------------------------------- */

const W = 1200;
const H = 630;
const PAD = 72;

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Greedy wrap using an approximate Inter advance width. */
function wrap(text, fontSize, maxWidth, weightFactor = 0.53) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length * fontSize * weightFactor > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const CONTENT_W = W - PAD * 2;
const titleSize = 60;
const titleLines = wrap(`${TITLE}:`, titleSize, CONTENT_W - 20);
// Shrink the subtitle until it fits on one line inside the content column.
const subtitleSize = Math.min(
  titleSize,
  Math.floor(CONTENT_W / (SUBTITLE.length * 0.53)),
);
const titleTop = 262 - (titleLines.length - 1) * 34;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#a5b4fc"/>
      <stop offset="55%" stop-color="#67e8f9"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0"/>
    </linearGradient>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="110"/>
    </filter>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M56 0H0V56" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#060814"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="140" cy="60" r="240" fill="#4f46e5" fill-opacity="0.45" filter="url(#blur)"/>
  <circle cx="1120" cy="40" r="220" fill="#06b6d4" fill-opacity="0.32" filter="url(#blur)"/>

  <!-- Wordmark -->
  <g transform="translate(${PAD}, 68)">
    <rect width="52" height="52" rx="14" fill="url(#mark)"/>
    <path d="M26 11c-3.7 2.6-8 4.1-12.4 4.2A20.8 20.8 0 0 0 12.6 21c0 9.7 6.7 17.9 13.4 19.9C32.7 38.9 39.4 30.7 39.4 21c0-2-.3-4.1-1-5.9C34 15 29.7 13.6 26 11Z"
      fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="m20.7 24.8 4 4 7.3-8.1" fill="none" stroke="#fff" stroke-width="2.9"
      stroke-linecap="round" stroke-linejoin="round"/>
    <text x="70" y="22" font-family="Inter" font-weight="600" font-size="16"
      letter-spacing="3.4" fill="#94a3b8">${esc(JOURNAL_SHORT.toUpperCase())}</text>
    <text x="70" y="45" font-family="Inter" font-weight="600" font-size="20"
      fill="#ffffff">Special Issue · Call for Papers</text>
  </g>

  <!-- Title -->
  ${titleLines
    .map(
      (line, i) =>
        `<text x="${PAD}" y="${titleTop + i * 68}" font-family="Inter" font-weight="700" font-size="${titleSize}" fill="#ffffff">${esc(line)}</text>`,
    )
    .join('\n  ')}
  <text x="${PAD}" y="${titleTop + (titleLines.length - 1) * 68 + subtitleSize + 26}" font-family="Inter"
    font-weight="700" font-size="${subtitleSize}" fill="url(#accent)">${esc(SUBTITLE)}</text>

  <!-- Footer -->
  <rect x="${PAD}" y="${H - 148}" width="${W - PAD * 2}" height="1.5" fill="url(#rule)"/>
  <g transform="translate(${PAD}, ${H - 112})">
    <text font-family="Inter" font-weight="600" font-size="15" letter-spacing="2.6"
      fill="#64748b">SUBMISSION DEADLINE</text>
    <text y="34" font-family="Inter" font-weight="700" font-size="26" fill="#e2e8f0">${esc(DEADLINE)}</text>
  </g>
  <g transform="translate(${PAD + 420}, ${H - 112})">
    <text font-family="Inter" font-weight="600" font-size="15" letter-spacing="2.6"
      fill="#64748b">CALL FOR PAPERS</text>
    <text y="34" font-family="Inter" font-weight="700" font-size="26" fill="#e2e8f0">${esc(STATUS_LABEL)}</text>
  </g>
  <text x="${PAD}" y="${H - 26}" font-family="Inter"
    font-weight="600" font-size="18" fill="#22d3ee">${esc(HOST)}</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);
fs.rmSync(cacheDir, { recursive: true, force: true });

const kb = Math.round(fs.statSync(OUT).size / 1024);
console.log(`\n  ✓ public/og.png  ${W}x${H}  ${kb} KB\n`);
