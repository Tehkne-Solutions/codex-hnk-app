import { existsSync, readFileSync } from 'node:fs';

const required = [
  'packages/vault-interop-vectors/package.json',
  'packages/vault-interop-vectors/src/index.ts',
  'apps/mobile/src/features/vault/NativeVaultInteropHarness.ts',
  'apps/mobile/src/app/labs/vault-interop.tsx',
  'docs/security/HNK_WEB_E2EE_EXECUTABLE_SPEC_V1_CANDIDATE.md',
];

const missing = required.filter((file) => !existsSync(file));
if (missing.length) {
  console.error('Missing Native Vault interoperability files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const vector = readFileSync('packages/vault-interop-vectors/src/index.ts', 'utf8');
const harness = readFileSync('apps/mobile/src/features/vault/NativeVaultInteropHarness.ts', 'utf8');
const route = readFileSync('apps/mobile/src/app/labs/vault-interop.tsx', 'utf8');
const mobilePackage = readFileSync('apps/mobile/package.json', 'utf8');
const webVectors = readFileSync('packages/vault-web-crypto-lab/src/vectors.ts', 'utf8');
const productionVault = readFileSync('apps/mobile/src/features/vault/vault-crypto.ts', 'utf8');
const day001 = readFileSync('apps/mobile/src/features/kether/Day001MasterVerticalSlice.tsx', 'utf8');
const spec = readFileSync('docs/security/HNK_WEB_E2EE_EXECUTABLE_SPEC_V1_CANDIDATE.md', 'utf8');

const invariants = [
  ['Neutral vector package is wired to Mobile', mobilePackage.includes('"@hnk/vault-interop-vectors": "workspace:*"')],
  ['Web and Native share one vector source', webVectors.includes("from '@hnk/vault-interop-vectors'") && harness.includes("from '@hnk/vault-interop-vectors'")],
  ['Frozen vector checksum is unchanged', vector.includes('157c92b5e1b1da403003fe1fd244bb7d46f3a3f085bc407373388491055a4020')],
  ['Native harness refuses Web as native proof', harness.includes("platform !== 'android' && platform !== 'ios'") && harness.includes("status: 'NATIVE_DEVICE_REQUIRED'")],
  ['Native harness imports fixed VDK through Expo Crypto', harness.includes('AESEncryptionKey.import') && harness.includes('vector.vdkHex')],
  ['Native harness injects exact frozen nonce', harness.includes('nonce: { bytes: vector.nonceBase64 }')],
  ['Native harness supplies frozen base64 AAD', harness.includes('additionalData: vector.aadBase64')],
  ['Native harness compares ciphertext with appended tag', harness.includes("includeTag: true") && harness.includes('vector.ciphertextBase64')],
  ['Native harness verifies frozen checksum', harness.includes('CryptoDigestAlgorithm.SHA256') && harness.includes('vector.checksumSha256')],
  ['Native harness verifies decrypt round-trip', harness.includes("name: 'decrypt-roundtrip'")],
  ['Native harness has no SecureStore dependency', !harness.includes("from 'expo-secure-store'") && !harness.includes('SecureStore.')],
  ['Native harness has no Supabase/network dependency', !harness.includes('@hnk/supabase-client') && !harness.includes('fetch(')],
  ['Lab route is explicitly experimental and no-write', route.includes('EXPERIMENTAL · NO VAULT WRITES')],
  ['Production Native Vault remains independent from public test vectors', !productionVault.includes('@hnk/vault-interop-vectors')],
  ['Day 001 remains disconnected from Native interop harness', !day001.includes('NativeVaultInteropHarness') && !day001.includes('@hnk/vault-interop-vectors')],
  ['Executable spec still treats actual device proof as pending', spec.includes('NATIVE DEVICE VECTOR PROOF = PENDING')],
];

const failed = invariants.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('HNK Native Vault interoperability contract validation failed:');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}
console.log(`HNK Native Vault interoperability contract: valid (${invariants.length} invariants)`);
