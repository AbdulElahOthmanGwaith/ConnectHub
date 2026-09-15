# ConnectHub — Supabase Implementation Phase 01 Report

## Status

Phase 01 foundation is implemented in the existing frontend without rebuilding the application, changing the Android project, generating an AAB, or preparing Google Play. The remote Supabase project was not accessed because this session had no project URL or publishable key and the Supabase connectors were disabled.

## Files created

| File | Purpose |
|---|---|
| `supabase-config.js` | Public runtime configuration placeholder for project URL and publishable/anon key. It contains no real credentials. |
| `supabase-auth.js` | Browser Supabase client loaded from a pinned CDN URL. Implements registration, login, logout, session persistence, current-user/profile loading, profile update helper, and sanitized user-facing errors. |
| `connecthub-phase01.js` | Compatibility bridge that overrides the old fake login/signup/logout handlers and connects Auth state to the existing UI. |
| `supabase-phase-01.sql` | Conceptual/ready-to-run Phase 01 migration for `profiles`, timestamps, index, trigger, Auth profile creation, and RLS policies. |
| `SUPABASE-PHASE-01-SETUP.md` | Setup and real-project verification instructions. |
| `SUPABASE-PHASE-01-REPORT.md` | This report. |

## Files modified

| File | Modification |
|---|---|
| `index.html` | Added the authentication message region and loaded the public config, Supabase Auth module, and Phase 01 bridge. |
| `script.js` | Added a controlled current-user setter, prevents Auth identity restoration/saving through localStorage when Supabase is configured, and escapes user-controlled values in key notification/post/comment/friend templates. |

No Android file was modified. No dependency was installed. The implementation uses the browser ESM CDN import for `@supabase/supabase-js`.

## Supabase configuration required

Create a Supabase project and fill only these public values in `supabase-config.js`:

```js
window.CONNECTHUB_SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey: 'YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY'
};
```

The file must never contain a service-role key, secret key, database password, JWT signing secret, or private key. Configure email/password Auth and the GitHub Pages production site/redirect URLs in Supabase. Run `supabase-phase-01.sql` in the SQL editor.

## Database table created by the migration

The migration creates only `public.profiles`:

- `id uuid primary key references auth.users(id) on delete cascade`
- `display_name text` with a 1–80 character constraint
- `avatar_url text`
- `bio text` limited to 500 characters
- `created_at timestamptz`
- `updated_at timestamptz`

It also creates a case-insensitive display-name index, an update timestamp trigger, and an Auth-user trigger that creates a profile after registration. The migration does not create posts, comments, likes, friends, groups, notifications, media, or messaging tables.

## RLS policies

RLS is enabled on `public.profiles`.

- `profiles_are_readable`: permits reading approved profile fields to anonymous and authenticated clients. The table does not expose `auth.users.email`.
- `users_insert_own_profile`: authenticated users may insert only a row whose ID equals `auth.uid()`.
- `users_update_own_profile`: authenticated users may update only their own row, and the resulting ID must remain their own ID.
- There is deliberately no client delete policy in Phase 01. Account deletion requires a later verified workflow covering Auth, profile, owned content, media, and retention.

There are no allow-all mutation policies.

## Authentication flow

When configuration is missing, the old fake authentication is blocked and the UI shows a setup message rather than accepting local credentials. When configured:

1. Registration calls `supabase.auth.signUp()` with email, password, and display name metadata.
2. Supabase Auth handles password storage, duplicate-email behavior, and optional email confirmation.
3. The database trigger creates the profile row.
4. Login calls `signInWithPassword()`.
5. The Auth client persists and restores the session.
6. Auth state changes update the existing `currentUser` model used by the UI.
7. Logout calls `signOut()` and returns the user to the login page.
8. Internal Auth/database errors are mapped to generic Arabic messages; raw secrets or database details are not displayed.

## localStorage transition

When Supabase is configured, `currentUser` is no longer loaded from or written to localStorage. Existing local `posts`, `friends`, `friendRequests`, `notifications`, and other prototype state remain untouched for later migration phases. Language preference and harmless presentation state remain local. The old `deviceAccounts` limit is not used as a security mechanism for server accounts.

## Security fixes in this phase

The new configuration contains no real Supabase URL or JWT-like key. Secret/service-role key markers appear only in comments warning against exposing them. The integration uses only a public key placeholder. Key dynamic values in notifications, post content, comments, and friend names are escaped before insertion into the existing HTML templates. Authentication bypass through the old handlers is disabled whenever Supabase is configured.

The remaining application still contains legacy local-only features and legacy templates outside this Phase 01 boundary. They are not connected to a backend and must be migrated and reviewed in later phases before production social data is enabled.

## Tests performed

The following passed locally:

- `node tests/interaction-regression.cjs`
- `node --check script.js`
- `node --check connecthub-phase01.js`
- `node --check supabase-auth.js`
- `git diff --check`
- Local HTTP serving of the new JavaScript and SQL/Markdown files
- Scan for real-looking Supabase URLs and JWT-like credentials: none found
- Confirmed no Android files were modified in this phase

Remote tests were not performed because no Supabase project URL/key was available. Therefore User A/User B, RLS denial, email confirmation, duplicate email, refresh persistence, and second-device tests remain required after project configuration.

## Known limitations

The profile UI currently displays the authenticated display name through the existing navigation/sidebar elements; a complete profile edit screen is not part of the current UI and remains a later enhancement. Posts, comments, likes, friends, groups, notifications, media, messaging, and account deletion remain local or unimplemented by design. The CDN import requires network access and a supported modern browser/WebView. The current service worker must be kept from caching private Supabase API responses in later phases.

## Exact continuation to Phase 02

First configure and verify Phase 01 with a real Supabase project and two test accounts. Then Phase 02 should replace the local `posts` array and `saveData()` post behavior with server-backed `posts` and `comments` tables, cursor pagination, ownership RLS, and a controlled local-data transition. It should not migrate unverified local passwords or treat local account/device records as authoritative. Likes, friends, notifications, media, and groups should remain out of scope until their dedicated schema and RLS policies are designed.
