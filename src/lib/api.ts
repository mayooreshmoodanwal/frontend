/**
 * Wishelier API Configuration Helper
 * Resolves the backend base URL dynamically based on environment configuration.
 *
 * In Development: defaults to http://localhost:8000
 * In Production: uses NEXT_PUBLIC_API_URL set in environment variables (e.g. Render backend URL)
 */
export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
).replace(/\/$/, '');

export function getApiUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
}
