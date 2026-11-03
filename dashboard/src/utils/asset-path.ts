/**
 * Prefix a ``public/`` asset path with the Vite base (e.g. "/winagent/").
 * String literals like "/logo.png" bypass the base in subpath deployments and
 * resolve outside the app (SPA fallback → broken image / HTML). Only imported
 * asset URLs get the base automatically — literals must go through here.
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL || "/"
  if (base === "/" || /^(https?:|data:)/i.test(path)) return path
  return base.replace(/\/$/, "") + path
}
