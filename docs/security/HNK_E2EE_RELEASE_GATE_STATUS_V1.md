# HNK E2EE — Release Gate Status V1

**Status:** ENGINEERING CANDIDATE · WEB WRITES STILL BLOCKED  
**Date:** 2026-09-03  
**Current validated head:** `51819fdf356a0405e2f4295cd2fc89484915bd2a`

## 1. Executive state

The HNK Vault E2EE work now has three deliberately separated layers:

1. **Web Crypto Lab** — cryptographic primitives + recovery/device envelopes + IndexedDB proof;
2. **Server Recovery Envelope Store** — ciphertext/key-envelope persistence with owner-only RLS;
3. **Native Expo Interop Harness** — actual `expo-crypto` contract harness for Android/iOS using the same frozen vector as Web.

None of these layers currently enables Day 001 Web Vault persistence, Practice Record finalization or XP completion.

`DAY 001 WEB VAULT WRITES = BLOCKED`

`DAY 001 WEB COMPLETION / XP = BLOCKED`

## 2. Web cryptography gate — GREEN

Implementation package:

`@hnk/vault-web-crypto-lab`

Shared deterministic vector:

`@hnk/vault-interop-vectors`

Proved in Node/WebCrypto and Chromium:

- AES-256-GCM journal payload;
- 12-byte nonce;
- 16-byte GCM tag;
- Native-compatible AAD format;
- HKDF-SHA-256 recovery KEK;
- AES-KW-256 VDK wrapping;
- non-extractable Device KEK;
- IndexedDB structured-clone of non-extractable `CryptoKey`;
- recovery to a second device envelope;
- wrong RRS rejection;
- wrong user recovery-context rejection;
- ciphertext/AAD tamper rejection;
- no Vault/RRS material in localStorage/sessionStorage;
- database-dump fixture alone insufficient for plaintext recovery.

Latest proof after the shared-vector refactor:

```text
workflow = HNK Web Vault Crypto Lab
run = 33772091792
head = 92adae0ea5c04049b8c98620281af63869834efa
artifact = 9900104144
artifact digest = sha256:3af1594eefbe21582485670a721a031fae2e9e549d80fe0017ceabd394e245f0
result = PASS
```

The later head `51819fdf...` changes only the semantic Native validator rule and does not alter the Web crypto implementation/vector.

## 3. Recovery envelope database gate — GREEN

Migration:

`supabase/migrations/20260903152500_add_vault_key_envelopes.sql`

Table:

`public.vault_key_envelopes`

Server persistence accepts only recovery envelope material:

- `wrapped_key`;
- `AES-KW-256`;
- `HKDF-SHA-256`;
- recovery salt;
- key version / KDF info version;
- rotation/revocation metadata.

It has no plaintext, RRS, raw VDK or device-key column.

Security behavior:

- RLS enabled;
- owner-only SELECT;
- owner-only INSERT;
- owner-only UPDATE;
- owner-only DELETE;
- ownership reassignment rejected;
- cross-user write/delete rejected;
- one active recovery envelope per key version;
- revoked envelope can be replaced;
- unapproved wrap algorithm rejected;
- unapproved KDF rejected;
- device-envelope material rejected by schema.

Latest Foundation proof:

```text
workflow = HNK Platform Foundation
run = 33772195307
head = 51819fdf356a0405e2f4295cd2fc89484915bd2a
validate/build = SUCCESS
Kether P0 DB Acceptance = SUCCESS
pgTAP = SUCCESS
real concurrency proof = SUCCESS
```

The `vault_key_envelopes.sql` pgTAP file contributes 20 dedicated VKE assertions.

## 4. Native interoperability contract gate — SOURCE/BUILD GREEN

Shared vector source:

`packages/vault-interop-vectors/src/index.ts`

Native harness:

`apps/mobile/src/features/vault/NativeVaultInteropHarness.ts`

Manual native lab route:

`/labs/vault-interop`

The harness is isolated from:

- SecureStore production Vault key lifecycle;
- Supabase;
- `journal_vault`;
- `vault_key_envelopes`;
- Practice Record;
- completion / XP;
- Day 001 runtime.

The harness uses the actual Expo Crypto API contract to:

1. import the frozen 256-bit VDK;
2. supply the exact frozen base64 AAD;
3. supply the exact frozen 12-byte nonce;
4. encrypt with AES-GCM and 16-byte tag;
5. retrieve ciphertext with tag appended;
6. compare nonce exactly;
7. compare ciphertext+tag exactly;
8. compare SHA-256 checksum exactly;
9. decrypt and verify round-trip.

The harness refuses Web as native evidence and returns `NATIVE_DEVICE_REQUIRED` unless `Platform.OS` is Android or iOS.

Foundation gate:

```text
Native Vault interop static invariants = PASS
workspace typecheck = PASS
workspace tests = PASS
workspace build = PASS
```

## 5. Native physical/runtime gate — PENDING

This is the remaining interoperability proof:

`ANDROID FROZEN VECTOR PASS = PENDING`

`IOS FROZEN VECTOR PASS = PENDING`

A PASS must come from the `/labs/vault-interop` route running under an actual Android or iOS Expo/React Native runtime. Expo Web, Node and Chromium are explicitly insufficient evidence.

Required captured evidence is redacted:

```text
platform
app/runtime version
vector id
nonce-exact = true
ciphertext-tag-exact = true
checksum-exact = true
decrypt-roundtrip = true
```

Never capture the raw VDK, RRS, private prose or authenticated production secrets.

## 6. Production-origin security gate — PENDING

Before enabling browser Vault persistence:

- official HTTPS origin;
- strict Content Security Policy;
- no uncontrolled third-party script on Vault surfaces;
- XSS/security review;
- dependency/supply-chain review;
- hosted Auth callback smoke on exact origin;
- recovery UX smoke without logging RRS;
- browser storage-loss/recovery test on hosted origin.

## 7. Application integration gate — NOT STARTED BY DESIGN

The following remain absent from the Day 001 Web experience:

- Web E2EE package import;
- recovery-envelope adapter calls;
- `saveEncryptedVaultEntry()`;
- final `savePracticeRecord()`;
- `completeCodexDay()`;
- XP grant after Web mirror.

The authenticated Web experience must continue to stop at the Mirror until the release gates above are green and an explicit integration pass is performed.

## 8. Next safe implementation step

The next code step can be the **typed recovery-envelope persistence adapter** in `@hnk/supabase-client`, still unreferenced by Day 001.

Its API must accept only:

- key version;
- wrapped VDK;
- wrap algorithm;
- KDF algorithm;
- KDF salt;
- KDF info version;
- revocation/rotation intent.

Its public TypeScript input must have no RRS, plaintext, raw key or raw VDK property.

After that adapter is typechecked/tested, the remaining non-automatable gate is Android/iOS execution of the shared frozen vector.
