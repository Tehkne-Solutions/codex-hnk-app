# HNK Hosted Auth — Release Candidate

**Status:** RC — callback code implemented; production web origin reserved; hosted Auth smoke pending  
**Date:** 2026-09-03  
**Supabase project:** `codex-hnk-app` (`czgqjrxkveatlnyjiwds`)  
**Related issue:** #15

## 1. Verified hosted state

- Supabase project is `ACTIVE_HEALTHY`.
- Hosted `auth.users` contained **0 users** at the start of this release audit.
- No test identity has been created by SQL or service-role bypass.
- Vercel project `codex-hnk-app` now exists.
- First production RC deployment returned HTTP 200.
- Reserved production origin: `https://codex-hnk-app-thales-dvfs-projects.vercel.app`.
- The deployed RC surface is intentionally a release marker, not a claim that the complete web application is already published.

## 2. Client callback contract

The Expo app declares the custom scheme:

`hnk://`

Native email confirmation callback:

`hnk://auth/callback`

The Auth provider now:

1. passes a platform-aware `emailRedirectTo` on `signUp()`;
2. consumes the initial URL and subsequent Linking events;
3. supports Supabase implicit callbacks with `access_token` + `refresh_token`;
4. supports PKCE callbacks with `code`;
5. calls `setSession()` / `exchangeCodeForSession()` instead of trusting callback parameters directly;
6. removes callback credentials from the browser URL after web session establishment;
7. never logs access tokens, refresh tokens, confirmation URLs or passwords.

`detectSessionInUrl=false` remains intentional because URL handling is explicit and cross-platform.

## 3. Supabase Dashboard configuration required before hosted smoke

Keep email confirmation enabled for the production release path.

In **Authentication → URL Configuration**:

- set **Site URL** to `https://codex-hnk-app-thales-dvfs-projects.vercel.app`;
- add `https://codex-hnk-app-thales-dvfs-projects.vercel.app` to **Additional Redirect URLs**;
- add `hnk://auth/callback` to **Additional Redirect URLs**;
- avoid broad production wildcards when exact URLs are available.

A local/preview redirect may be added separately for development, but it must not replace the production callback contract.

## 4. Hosted smoke identity

The first test account must be created through the public Auth flow using an inbox controlled by the tester.

Forbidden shortcuts:

- direct insert into `auth.users`;
- service-role key inside mobile/web;
- committing test password, access token or confirmation URL;
- placing plaintext Vault content in logs, CI artifacts, GitHub issues or telemetry.

## 5. Smoke proof sequence

1. Configure the exact Site URL and redirects above in Supabase Auth.
2. Create account in **O ÁTRIO**.
3. Confirm the received email.
4. Verify the link opens the HNK app/web origin and establishes the authenticated session.
5. Restart the app and verify session persistence.
6. Exercise background/foreground and verify auth refresh remains valid.
7. Complete Day 001 and verify exactly +150 XP once.
8. Revisit Day 001 and verify XP is not duplicated.
9. Complete Days 002–004 sequentially and verify Vehuiah remains 4/5, unlit.
10. Complete Day 005 and verify `Vehuiah · completed_days=5 · lit=true`.
11. Verify total operational cycle XP is 550.
12. Verify Grade remains `Neófito`.
13. Inspect hosted rows: Vault contains ciphertext only; Practice Record evidence contains no prose.

## 6. Release gate

`Cycle I Release V1` remains blocked until the hosted smoke above is captured without credentials or private prose.

The production origin is now reserved and verified, but the complete web application has not yet replaced the RC marker surface. This RC does **not** block continued local design/engineering work, but Jeliel should not be declared production-ready before this gate closes.
