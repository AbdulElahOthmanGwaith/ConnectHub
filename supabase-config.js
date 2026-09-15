/* Public runtime configuration for GitHub Pages.
 * Only the Supabase project URL and publishable/anon key belong here.
 * NEVER put a service_role, secret, database password, or private key in this file.
 * Replace the empty values during deployment, or define window.CONNECTHUB_SUPABASE_CONFIG
 * before this script loads. The app refuses fake authentication when values are missing.
 */
window.CONNECTHUB_SUPABASE_CONFIG = window.CONNECTHUB_SUPABASE_CONFIG || {
  url: '',
  publishableKey: ''
};
