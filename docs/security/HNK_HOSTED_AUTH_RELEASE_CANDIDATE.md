# HNK Hosted Auth — Release Candidate

**Status:** RC — callback code implemented; real production web live in proof mode; hosted Auth smoke pending  
**Date:** 2026-09-03  
**Supabase project:** `codex-hnk-app` (`czgqjrxkveatlnyjiwds`)  
**Related issue:** #15

## 1. Verified hosted state

- Supabase project is `ACTIVE_HEALTHY`.
- Hosted `auth.users` contained **0 users** at the start of this release audit.
- No test identity has been created by SQL or service-role bypass.
- Vercel project `codex-hnk-app` exists.
- Canonical production origin: `https://codex-hnk-app.vercel.app`.
- The first real Next.js production surface replaced the static Release Candidate marker.
- Verified HTTP 200 on `/`, `/day-001` and `/boards/kether`.
- The current production Day 001 explicitly runs in `PROOF MODE` until the Vercel public Supabase environment is configured through the platform environment-variable mechanism.

## 2. Client callback contract

The Expo app declares the custom scheme:

`hnk://`

Native email confirmation callback:

`hnk://auth/callback`

The Auth provider in the application source:

1. passes a platform-aware `emailRedirectTo` on `signUp()`;
2. consumes the initial URL and subsequent Linking events;
3. supports Supabase implicit callbacks with `access_token` + `refresh_token`;
4. supports PKCE callbacks with `code`;
5. calls `setSession()` / `exchangeCodeForSession()` instead of trusting callback parameters directly;
6. removes callback credentials from the browser URL after web session establishment;
7. never logs access tokens, refresh tokens, confirmation URLs or passwords.

`detectSessionInUrl=false` remains intentional because URL handling is explicit and cross-platform.

## 3. Vercel environment required for Web LIVE

The connected deployment API does not expose project Environment Variable writes. Production therefore does not embed or disguise the Supabase publishable key in transport files.

Configure through the Vercel project environment mechanism:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Only the frontend publishable key is permitted. `service_role` is forbidden in web/mobile.

After those variables exist, deploy the real `apps/web` surface again and verify that Day 001 changes from `PROOF MODE` to the authenticated/live boundary before running the hosted smoke.

## 4. Supabase Dashboard configuration required before hosted smoke

Keep email confirmation enabled for the production release path.

In **Authentication → URL Configuration**:

- set **Site URL** to `https://codex-hnk-app.vercel.app`;
- add `https://codex-hnk-app.vercel.app/day-001` to **Additional Redirect URLs**;
- add `hnk://auth/callback` to **Additional Redirect URLs**;
- avoid broad production wildcards when exact URLs are available.

A local/preview redirect may be added separately for development, but it must not replace the production callback contract.

## 5. Hosted smoke identity

The first test account must be created through the public Auth flow using an inbox controlled by the tester.

Forbidden shortcuts:

- direct insert into `auth.users`;
- service-role key inside mobile/web;
- committing test password, access token or confirmation URL;
- placing plaintext Vault content in logs, CI artifacts, GitHub issues or telemetry.

## 6. Smoke proof sequence

1. Configure the Vercel public Supabase environment variables.
2. Configure the exact Site URL and redirect URLs above in Supabase Auth.
3. Confirm `/day-001` reaches the Web Átrio authentication boundary instead of `PROOF MODE`.
4. Create account in **O ÁTRIO**.
5. Confirm the received email.
6. Verify the confirmation returns to the intended HNK origin/app and establishes the authenticated session.
7. Restart the app and verify session persistence.
8. Exercise background/foreground and verify auth refresh remains valid.
9. Complete Day 001 and verify exactly +150 XP once.
10. Revisit Day 001 and verify XP is not duplicated.
11. Complete Days 002–004 sequentially and verify Vehuiah remains 4/5, unlit.
12. Complete Day 005 and verify `Vehuiah · completed_days=5 · lit=true`.
13. Verify total operational cycle XP is 550.
14. Verify Grade remains `Neófito`.
15. Inspect hosted rows: Vault contains ciphertext only; Practice Record evidence contains no prose.

## 7. Release gate

`Cycle I Release V1` remains blocked until the hosted smoke above is captured without credentials or private prose.

The real production web shell and Day 001 proof are now online. Jeliel may continue as local engineering work, but it must not be declared production-ready before this gate closes.
