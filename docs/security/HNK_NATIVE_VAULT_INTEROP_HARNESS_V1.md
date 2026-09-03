# HNK Native Vault Interop Harness V1

**Status:** IMPLEMENTED · CONTRACT/BUILD GATE · DEVICE PASS PENDING  
**Date:** 2026-09-03

## Purpose

Prove that the actual Android/iOS Expo Crypto engine reproduces the exact deterministic Vault payload already frozen by the Web Crypto Lab.

This harness is isolated from production Vault state. It does not read/write SecureStore, Supabase, `journal_vault`, `vault_key_envelopes`, Practice Record, completion or XP.

## Shared vector

The single source is now:

`@hnk/vault-interop-vectors`

Both the Web Crypto Lab and Native harness consume that package. This prevents Web and Native from silently maintaining different copies of the expected ciphertext.

## Native implementation

`apps/mobile/src/features/vault/NativeVaultInteropHarness.ts`

The harness:

1. refuses to count Web as a native proof;
2. imports the frozen 256-bit VDK using `AESEncryptionKey.import()`;
3. encrypts the public fixture with `aesEncryptAsync()`;
4. supplies the frozen AAD as the base64 `additionalData` contract used by production Native Vault V1;
5. supplies the frozen 12-byte nonce through `nonce: { bytes: ... }`;
6. requests a 16-byte GCM tag;
7. exports ciphertext with tag appended;
8. verifies exact nonce, ciphertext+tag and checksum;
9. decrypts the sealed data and verifies the round-trip fixture.

A result is `PASS` only when all four exact checks pass on `Platform.OS === 'android'` or `Platform.OS === 'ios'`.

## Device route

Expo Router route:

`/labs/vault-interop`

The screen is deliberately unlinked from the production experience and labeled:

`HNK SECURITY LAB · EXPERIMENTAL · NO VAULT WRITES`

It displays only redacted pass/fail facts. It does not display or log the VDK or RRS.

## Acceptance target

Required before Native↔Web interoperability can be called production-proven:

- Android: `PASS` on the frozen vector;
- iOS: `PASS` on the same frozen vector;
- capture platform/version + four boolean checks without raw secrets;
- preserve the result as a release-security artifact.

A Web/Expo-Web result must remain `NATIVE_DEVICE_REQUIRED` and is not acceptable evidence.

## Current release status

The harness source can be typechecked and exported by CI, but the available CI pipeline does not execute an Android/iOS native runtime. Therefore:

`NATIVE DEVICE VECTOR PROOF = PENDING`

Web Vault writes and Day 001 Web XP remain blocked independently of this harness until all E2EE release gates pass.
