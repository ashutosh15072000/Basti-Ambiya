/**
 * Utility to resolve static asset paths cleanly in any hosting environment,
 * including GitHub Pages repositories with subpath URLs (e.g. https://<user>.github.io/<repo>/).
 */
export const getAssetPath = (path: string): string => {
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  return `${baseWithSlash}${cleanPath}`;
};
