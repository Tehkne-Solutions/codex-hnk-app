# HNK Day 001 — Web Runtime Boundary V1

**Status:** AUTH / CANON / PRACTICE LIVE READY · VAULT / COMPLETION BLOCKED BY DESIGN  
**Scope:** `apps/web/app/day-001`  
**Date:** 2026-09-03

This document records the security boundary of the Day 001 Web vertical slice. It does not approve a Web Vault key-recovery design and does not change canonical Codex content.

## 1. What is live-ready on Web

The `/day-001` route now has a real runtime boundary built on `@hnk/supabase-client`.

When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are configured:

- the Web Atrium requires public Supabase Auth;
- Auth supports sign-in and sign-up;
- session persistence is browser-local for **Auth state only**;
- callback handling is explicit through `parseAuthCallbackUrl()`;
- token callbacks use `setSession()`;
- PKCE callbacks use `exchangeCodeForSession()`;
- callback credentials are removed from the visible URL after consumption;
- no service-role credential is used by the browser;
- Day 001 validates the server `codex_days` snapshot before live traversal;
- the snapshot must match the frozen Day 001 metadata contract;
- `content.raw_markdown` must exist before the Manuscript is declared linked to live canon;
- the Crossing cannot open until canon validation succeeds;
- Crossing creates a real `practice_session` through `startPracticeSession()`.

When the public Supabase environment is not configured, the same route remains in deterministic local proof mode for design and CI.

## 2. What remains intentionally blocked

The authenticated Web flow stops at the **Espelho da Alma** boundary.

The Web implementation does **not** call:

- `saveEncryptedVaultEntry()`;
- `savePracticeRecord()`;
- `completeCodexDay()`.

Therefore authenticated Web currently cannot:

- persist private intention/mirror prose;
- finalize structured practice evidence;
- create a canonical Day completion;
- award +150 XP;
- advance `user_progress`;
- light the first server-confirmed Kether spark.

This is deliberate rather than an incomplete optimistic implementation.

## 3. Why Vault is blocked

The current Mobile Vault contract uses:

- AES-256-GCM;
- a per-user AES key;
- device SecureStore / platform keychain storage;
- `WHEN_UNLOCKED_THIS_DEVICE_ONLY` semantics;
- ciphertext-only sync to Supabase;
- no key inside the server payload.

The current Vault implementation explicitly throws `vault_secure_storage_unavailable_on_web` on browser platforms.

No approved repository specification currently defines a Web equivalent for:

- protected key storage;
- passphrase derivation policy;
- recovery;
- multi-device enrollment;
- device revocation;
- key rotation;
- lost-device behavior;
- migration between Native V1 and Web V1 keys.

Using `localStorage` for a Vault master key would silently weaken the current trust model and is therefore prohibited by this boundary.

## 4. Private text behavior before Web E2EE

In authenticated Web mode:

- intention and mirror text may exist in React memory for the active page only;
- the UI labels that state as volatile and non-persistent;
- that text is not intentionally written to `localStorage`;
- that text is not intentionally sent to Supabase;
- reaching the Mirror produces a visible security boundary;
- the completion CTA remains disabled and directs the user to the Mobile app for encrypted completion.

No XP is displayed as server-awarded after that boundary because no completion RPC has occurred.

## 5. CI enforcement

`validate:day001` now protects this boundary.

The validator requires:

- `@hnk/supabase-client` in the Web package;
- the authenticated Web runtime provider and Atrium boundary;
- explicit public environment roles;
- canonical `raw_markdown` validation;
- real `startPracticeSession()` usage;
- the visible Web Vault block;
- absence of `saveEncryptedVaultEntry()` from the Web Day 001 runtime;
- absence of `savePracticeRecord()` from the Web Day 001 runtime;
- absence of `completeCodexDay()` from the Web Day 001 runtime;
- no private-text `localStorage` usage inside the Day 001 experience.

At source SHA `858779094c8eb2b735aa5388dfaf8209be1b6b1a`, Foundation run `33769185384` passed:

- architecture;
- shared UI tokens;
- Day 001 validation;
- Board Factory;
- typecheck;
- tests;
- build;
- Kether P0 pgTAP;
- real concurrency acceptance.

## 6. Visual non-regression proof

Visual proof run: `33769185383`  
Artifact: `9898910944`  
Digest: `sha256:83cdf397bf95521a3e037881027d282d3d4b6c81beb35da688dd620dcc2b5913`

All six PNG proofs remained byte-identical to the Day 001 Visual Review V1 candidate master:

- Origin desktop: `18e9b9272ae5b57ff02975ff0978bbb91ffd9b93eeb4f88cf074efcb866a3f9c`
- Origin mobile 390: `43ae21b3b56b2d23f086c5ac9b45d4c191418fe4d41ed12dd71177215170766d`
- Relic desktop: `f9f5244d1369c0e359cdc7c8d911107da19823d805a95627a047748332f4920d`
- Relic mobile 390: `c358c8776c43fd953d792ae39240bfed2178ab88df7f6117e0380fa3063ba365`
- Atrium desktop: `5056fbac99c01563101c496ff5d4cc0ad7139675351d08c199b8b647df6ef8b5`
- Atrium mobile 390: `9418f0e2a5c63a7667c5fd582b1b8bd14d3dcf12b7b1722df98f9f38ccd8b41e`

The generated PDF hash is not used as a pixel-stability invariant because regenerated PDF container metadata may change even when the rendered reference frames do not.

## 7. Next security design gate

Before Web can write private Vault data or complete Day 001, an executable **Web E2EE Key & Recovery V1** specification must define and test:

1. a non-exported browser working key where supported;
2. a user-held or user-derived recovery root;
3. authenticated key wrapping rather than plaintext key persistence;
4. multi-device enrollment without exposing plaintext Vault keys to Supabase;
5. revocation and rotation semantics;
6. recovery-failure behavior;
7. explicit migration/interoperability with the Native Vault contract;
8. browser threat assumptions and unsupported-browser fallback;
9. destructive tests proving server/database compromise does not reveal journal prose;
10. a release rule preventing completion when the E2EE boundary cannot be established.

Until that gate is approved and implemented, **Mobile remains the only trusted surface for encrypted Day 001 completion**.
