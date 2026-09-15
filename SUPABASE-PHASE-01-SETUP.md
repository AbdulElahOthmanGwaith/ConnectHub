# Supabase Phase 01 setup

This phase adds a safe public configuration placeholder, Supabase Auth integration, the `profiles` SQL migration, RLS policies, and a transition bridge. It intentionally does not implement posts, comments, likes, friends, groups, notifications, media storage, or messaging.

## Required project setup

Create a Supabase project, copy its project URL and its publishable/anon client key, then place only those two public values in `supabase-config.js`:

```js
window.CONNECTHUB_SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey: 'YOUR_PUBLIC_PUBLISHABLE_OR_ANON_KEY'
};
```

Never put a `service_role` key, secret key, database password, JWT signing secret, or private key in this file. The publishable/anon key is not an authorization substitute; the SQL RLS policies are the protection boundary.

Run `supabase-phase-01.sql` in the Supabase SQL editor. Enable email/password Auth. If email confirmation is enabled, registration shows a confirmation message and the user must verify the email before signing in. Configure the production site URL and redirect URLs for the GitHub Pages origin.

## Phase 01 behavior

When the public configuration is empty, the application refuses to perform fake login or registration and displays a configuration message. When configured, registration calls Supabase Auth and stores the display name in Auth metadata; the database trigger creates the corresponding profile. Login, logout, session persistence, and auth-state restoration use Supabase Auth. The current UI continues to render the authenticated display name.

`currentUser` is no longer restored from localStorage when Supabase configuration is present. Existing local posts, friends, requests, notifications, and other prototype data remain untouched in localStorage for the later migration phases. The language preference remains local. The local device-account limit is not used as a security boundary for Supabase accounts.

## Verification checklist requiring a real project

Create User A, log out, create User B, log out, sign back in as User A, refresh, and verify that User A’s profile returns from `profiles`. In the Supabase SQL editor or an authenticated test client, verify that User A cannot update User B’s row and that anonymous writes are rejected. Repeat from a second browser profile or device.

This repository session did not contain a Supabase project URL/key and the Supabase connectors were disabled, so no remote account or database test was performed here. No secret was requested or stored.
