# HNK Completion RPC — Security Boundary

**Status:** intentional exception / reviewed  
**RPC:** `public.complete_codex_day(...)`

## Why this function is SECURITY DEFINER

Signed-in clients are intentionally denied direct write access to:

- `day_completions`
- `xp_events`
- `user_progress`

The HNK app must still be able to complete a canonical day. `complete_codex_day(...)` is therefore the single transactional write boundary for completion, XP and initiatory progression.

Using `SECURITY INVOKER` for this RPC would require reopening direct table privileges or moving this authority to an external trusted service. At the current architecture stage, the SECURITY DEFINER RPC is the narrower boundary.

## Controls

1. Function is callable only by `authenticated`.
2. `anon` and `public` EXECUTE are revoked.
3. `search_path` is fixed to an empty string and all referenced relations are schema-qualified.
4. Identity comes from `auth.uid()`; no `user_id` parameter is accepted.
5. Practice Session must belong to the authenticated user and requested day.
6. First completion requires non-empty structured evidence.
7. Kether sequence is validated server-side.
8. Portal 036 requires all Days 001–035.
9. `day_completions` has unique `(user_id, day)` semantics through its primary key.
10. XP uses an idempotency key and atomic insert.
11. Client has read-only access to completion/progress/XP result tables.
12. Journal plaintext is never processed by this RPC.

## Supabase Advisor

The Supabase database linter reports `authenticated_security_definer_function_executable` because an authenticated user can intentionally call this SECURITY DEFINER function. This warning is accepted only for this RPC and must be re-reviewed whenever its parameters, grants or body change.

Remediation/reference: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable

## Future option

If the product later adopts a trusted backend/Edge Function as the sole completion authority, this RPC can move out of the exposed API surface and its EXECUTE grant can be revoked from `authenticated`.
