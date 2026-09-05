# HNK Vault Recovery — Hosted Reconciliation V1

**Status:** HOSTED SCHEMA RECONCILED / APPLICATION INTEGRATION STILL BLOCKED  
**Date:** 2026-09-05  
**Hosted Supabase project:** `czgqjrxkveatlnyjiwds` (`codex-hnk-app`)

## 1. Purpose

This record reconciles the Vault recovery-envelope schema between the repository, local CI and the hosted Supabase project without enabling Web Vault writes.

The recovery model remains the HNK Web E2EE V1 candidate:

- AES-256-GCM journal encryption;
- 256-bit Vault Data Key (VDK);
- user-held 256-bit Recovery Root Secret (RRS), never uploaded;
- HKDF-SHA-256 recovery KEK;
- AES-KW-256 wrapping of the VDK;
- non-extractable browser Device KEK stored through IndexedDB structured clone;
- ciphertext/envelope-only server persistence.

## 2. Drift found

The repository contained `20260903152500_add_vault_key_envelopes.sql`, but the hosted Supabase project had not applied it. The hosted database therefore had no `public.vault_key_envelopes` table even though local Foundation/P0 tests were green.

## 3. Hosted migration applied

The missing DDL was applied to the hosted project through the Supabase migration API on 2026-09-05.

Hosted migration history now records:

`20260905011011_add_vault_key_envelopes`

The repository migration filename is aligned to that hosted version in this reconciliation change so a future migration push does not treat the old local version as unapplied drift.

## 4. Hosted state verified

Verified after migration:

- `public.vault_key_envelopes` exists;
- row-level security is enabled;
- owner-only SELECT/INSERT/UPDATE/DELETE policies exist;
- one-active-recovery-envelope partial unique index exists;
- `(user_id, key_version, created_at desc)` index exists;
- schema accepts only `envelope_kind = recovery`;
- schema accepts only `AES-KW-256` wrapping;
- schema accepts only `HKDF-SHA-256` recovery derivation;
- there is no plaintext prose, RRS, raw VDK or device-key column.

## 5. Adapter state

`@hnk/supabase-client` already contains the typed recovery-envelope adapter at `packages/supabase-client/src/vault-key-envelopes.ts`.

Its write input contains only key version, wrapped key, wrap algorithm, KDF algorithm, KDF salt and KDF info version. Ownership is resolved from the authenticated session and is not caller-supplied.

## 6. QA already green

Existing CI evidence covers Web Crypto recovery/device envelopes, deterministic Native↔Web vectors, wrong-RRS/context/tamper rejection, non-extractable Device KEK, IndexedDB CryptoKey round-trip, multi-device browser-lab recovery, server-dump fixture isolation, pgTAP coverage, Foundation typecheck/test/build and Kether P0 DB/concurrency proofs.

## 7. Advisor result

Post-DDL Supabase security advisor reported no new warning for `vault_key_envelopes` or its RLS. A pre-existing warning remains for the independently governed `public.complete_codex_day(...)` SECURITY DEFINER RPC; it is outside the scope of this migration.

The performance advisor reports the new supporting index as unused immediately after creation. No index is removed based on zero production traffic.

## 8. Gates that remain open

This reconciliation does **not** authorize production Web Vault writes.

Still required before Issue #12 can close:

1. explicit approval of the recovery model / threat model;
2. physical Android interoperability proof with the frozen vector;
3. physical iOS interoperability proof with the frozen vector;
4. lost-device/recovery UX and warning copy approval;
5. explicit rotation/revocation UX proof;
6. hosted HTTPS origin with strict CSP and Vault-surface script discipline;
7. hosted Auth + recovery smoke without RRS/plaintext logging;
8. hosted browser storage-loss → recovery proof;
9. decrypt-after-recovery release QA;
10. only then, an explicit application integration pass for Web Vault writes / Practice Record / completion / XP.

**Result:** the hosted schema/persistence substrate is reconciled and green; recovery release semantics and physical/hosted proofs remain intentionally gated.
