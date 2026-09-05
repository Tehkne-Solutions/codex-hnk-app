# HNK E2EE — Release Gate Status V1

**Status:** ENGINEERING CANDIDATE · CRYPTO + ENVELOPE SUBSTRATE GREEN · WEB WRITES STILL BLOCKED  
**Updated:** 2026-09-05

## 1. Executive state

The HNK Vault E2EE work has four deliberately separated layers:

1. **Web Crypto Lab** — cryptographic primitives + recovery/device envelopes + IndexedDB proof;
2. **Server Recovery Envelope Store** — ciphertext/key-envelope persistence with owner-only RLS;
3. **Typed Recovery Adapter** — authenticated persistence API in `@hnk/supabase-client`;
4. **Native Expo Interop Harness** — actual `expo-crypto` contract harness for Android/iOS using the same frozen vector as Web.

The first three layers are implemented and validated. The fourth is source/build green but still requires physical Android and iOS runtime evidence.

None of these layers authorizes Day 001 Web Vault persistence, Practice Record finalization or XP completion.

`DAY 001 WEB VAULT WRITES = BLOCKED`

`DAY 001 WEB COMPLETION / XP = BLOCKED`

## 2. Web cryptography gate — GREEN

Implementation package: `@hnk/vault-web-crypto-lab`  
Shared deterministic vector: `@hnk/vault-interop-vectors`

Proved in Node/WebCrypto and Chromium:

- AES-256-GCM journal payload;
- 12-byte nonce / 16-byte GCM tag;
- Native-compatible AAD format;
- HKDF-SHA-256 recovery KEK;
- AES-KW-256 VDK wrapping;
- non-extractable Device KEK;
- IndexedDB structured-clone of non-extractable `CryptoKey`;
- recovery to a second device envelope;
- wrong RRS/context rejection;
- ciphertext/AAD tamper rejection;
- no Vault/RRS material in Web Storage;
- database-dump fixture alone insufficient for plaintext recovery.

Frozen format: `docs/security/HNK_WEB_E2EE_EXECUTABLE_SPEC_V1_CANDIDATE.md`.

## 3. Recovery envelope database gate — HOSTED GREEN

Repository/hosted migration identity:

`supabase/migrations/20260905011011_add_vault_key_envelopes.sql`

Hosted project: `czgqjrxkveatlnyjiwds`  
Table: `public.vault_key_envelopes`

Verified on 2026-09-05:

- RLS enabled;
- owner-only SELECT/INSERT/UPDATE/DELETE;
- one active recovery envelope per key version;
- `AES-KW-256` wrapping constraint;
- `HKDF-SHA-256` KDF constraint;
- no plaintext/RRS/raw-VDK/device-key column.

The migration had been green locally but absent from the hosted project. That drift was corrected and the repository migration version was aligned to hosted migration history. See `docs/security/HNK_VAULT_RECOVERY_HOSTED_RECONCILIATION_V1.md`.

## 4. Typed recovery-envelope adapter — GREEN

Implementation: `packages/supabase-client/src/vault-key-envelopes.ts`.

Supported operations:

- save an already-wrapped recovery envelope;
- list the authenticated user's recovery envelopes;
- get the active recovery envelope;
- revoke an active recovery envelope.

Its public write input has no RRS, plaintext, raw VDK or raw device-key field. `user_id` is resolved from the authenticated session, with RLS remaining the server-side ownership boundary.

Adapter unit tests and the Foundation validator are green.

## 5. Native interoperability contract — SOURCE/BUILD GREEN

Shared vector: `packages/vault-interop-vectors/src/index.ts`  
Native harness: `apps/mobile/src/features/vault/NativeVaultInteropHarness.ts`  
Manual route: `/labs/vault-interop`

The harness is isolated from the production Vault key lifecycle, Supabase persistence, Practice Records and XP. It uses the actual Expo Crypto contract to reproduce the frozen Native↔Web AES-GCM vector and refuses Web as native evidence.

## 6. Native physical/runtime gate — PENDING

`ANDROID FROZEN VECTOR PASS = PENDING`

`IOS FROZEN VECTOR PASS = PENDING`

A PASS must come from the native lab running under an actual Android or iOS Expo/React Native runtime. Captured evidence must be redacted and never include raw VDK, RRS, private prose or authenticated production secrets.

## 7. Production-origin security gate — PENDING

Before enabling browser Vault persistence:

- official HTTPS origin;
- strict Content Security Policy;
- no uncontrolled third-party script on Vault surfaces;
- XSS/security review;
- dependency/supply-chain review;
- hosted Auth callback smoke on exact origin;
- recovery UX smoke without logging RRS;
- browser storage-loss/recovery test on hosted origin.

Vercel repo-side Node runtime is pinned to Node 22.x; Git-driven production deployment hardening remains tracked in Issue #19.

## 8. Recovery product semantics — PENDING APPROVAL

The engineering candidate is implementation-backed, but Issue #12 still requires explicit product/security approval for:

- user-held Recovery Root Secret model;
- lost-device warning/copy;
- multi-device enrollment semantics;
- recovery-envelope rotation;
- data-key rotation semantics;
- local-device enrollment deletion/revocation wording.

Implementation existence is not treated as approval of recovery UX or threat-model semantics.

## 9. Application integration gate — BLOCKED BY DESIGN

Do not enable production Web `saveEncryptedVaultEntry()`, recovery enrollment from Day 001, final Practice Record, `completeCodexDay()` or XP grant until the remaining release gates are green.

## 10. Current safe next steps

1. capture Android native frozen-vector evidence;
2. capture iOS native frozen-vector evidence;
3. complete Git-driven hosted origin hardening (#19);
4. review/approve recovery UX and threat-model semantics (#12);
5. execute hosted storage-loss → recovery proof;
6. execute decrypt-after-recovery release QA;
7. only then perform the explicit Day 001 Web Vault integration pass.

**Current result:** cryptographic format, hosted database substrate and typed persistence adapter are green; physical native evidence, hosted-origin security and recovery product approval remain the release boundary.
