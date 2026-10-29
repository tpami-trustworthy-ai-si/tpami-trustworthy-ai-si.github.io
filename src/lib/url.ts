const RAW_BASE = import.meta.env.BASE_URL ?? '/';

/** Configured base path without a trailing slash, e.g. '/si' (or '' at root). */
export const BASE = RAW_BASE.replace(/\/+$/, '');

/** Join a public-folder path onto the configured base path. */
export function withBase(path: string): string {
  return `${BASE}/${path.replace(/^\/+/, '')}`;
}
