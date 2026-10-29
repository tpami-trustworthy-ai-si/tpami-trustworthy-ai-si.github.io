import fs from 'node:fs';
import path from 'node:path';
import { editorPhotoDir, type Editor } from '../config/editors';
import { withBase } from './url';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Resolve an editor's photo URL at build time.
 *
 * Returns null when `photo` is empty or the file is not present in
 * public/images/editors/, so the card can fall back to a monogram instead of
 * shipping a broken <img>. A missing file is reported once as a build warning.
 */
const warned = new Set<string>();

export function resolvePhoto(editor: Editor): string | null {
  const file = editor.photo?.trim();
  if (!file) return null;

  const relative = `${editorPhotoDir}/${file}`;
  const absolute = path.join(PUBLIC_DIR, relative);

  if (!fs.existsSync(absolute)) {
    if (!warned.has(relative)) {
      warned.add(relative);
      console.warn(
        `[editors] photo not found: public/${relative} — "${editor.name}" will render a monogram. ` +
          `Add the file or clear the \`photo\` field in src/config/editors.ts.`,
      );
    }
    return null;
  }

  return withBase(relative);
}

/** Up to two initials, used for the monogram fallback. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}
