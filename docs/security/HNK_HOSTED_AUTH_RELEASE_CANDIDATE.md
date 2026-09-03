# HNK Hosted Auth — Release Candidate

**Status:** RC — callback code implemented, hosted smoke pending  
**Date:** 2026-09-03  
**Supabase project:** `codex-hnk-app` (`czgqjrxkveatlnyjiwds`)  
**Related issue:** #15

## 1. Verified hosted state

- Supabase project is `ACTIVE_HEALTHY`.
- Hosted `auth.users` currently contains **0 users**.
- No test identity has been created by SQL or service-role bypass.
- `codex-hnk-app` is not currently present as a Vercel project/deployment in the connected Vercel account.
- Therefore there is no production web Site URL to canonize yet.

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

- add `hnk://auth/callback` to **Additional Redirect URLs**;
- set **Site URL** only after an official production web deployment exists;
- when the web app is deployed, add its exact production origin as an allowed redirect;
- avoid broad production wildcards when an exact URL is available.

A local/preview redirect may be added separately for development, but it must not replace the production callback contract.

## 4. Hosted smoke identity

The first test account must be created through the public Auth flow using an inbox controlled by the tester.

Forbidden shortcuts:

- direct insert into `auth.users`;
- service-role key inside mobile/web;
- committing test password, access token or confirmation URL;
- placing plaintext Vault content in logs, CI artifacts, GitHub issues or telemetry.

## 5. Smoke proof sequence

1. Create account in **O ÁTRIO**.
2. Confirm the received email.
3. Verify the link opens the HNK app and establishes the authenticated session.
4. Restart the app and verify session persistence.
5. Exercise background/foreground and verify auth refresh remains valid.
6. Complete Day 001 and verify exactly +150 XP once.
7. Revisit Day 001 and verify XP is not duplicated.
8. Complete Days 002–004 sequentially and verify Vehuiah remains 4/5, unlit.
9. Complete Day 005 and verify `Vehuiah · completed_days=5 · lit=true`.
10. Verify total operational cycle XP is 550.
11. Verify Grade remains `Neófito`.
12. Inspect hosted rows: Vault contains ciphertext only; Practice Record evidence contains no prose.

## 6. Release gate

`Cycle I Release V1` remains blocked until the hosted smoke above is captured without credentials or private prose.

This RC does **not** block continued local design/engineering work, but Jeliel should not be declared production-ready before this gate closes.
