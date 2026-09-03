import { Platform } from 'react-native';
import {
  AESEncryptionKey,
  CryptoDigestAlgorithm,
  aesDecryptAsync,
  aesEncryptAsync,
  digestStringAsync,
} from 'expo-crypto';
import { HNK_VAULT_INTEROP_VECTOR_V1 as vector } from '@hnk/vault-interop-vectors';

export type NativeVaultInteropStatus = 'PASS' | 'FAIL' | 'NATIVE_DEVICE_REQUIRED';

export interface NativeVaultInteropCheck {
  name: string;
  ok: boolean;
}

export interface NativeVaultInteropResult {
  vectorId: string;
  platform: string;
  status: NativeVaultInteropStatus;
  checks: NativeVaultInteropCheck[];
}

function hexToBytes(hex: string): Uint8Array {
  if (!/^[a-f0-9]+$/i.test(hex) || hex.length % 2 !== 0) throw new Error('invalid_vector_hex');
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

/**
 * Executes the public, deterministic HNK Vault interoperability fixture through
 * the real Expo Crypto AES implementation. It never reads/writes SecureStore,
 * Supabase, journal_vault or production Vault state.
 *
 * A PASS is meaningful only when Platform.OS is android or ios.
 */
export async function runNativeVaultInteropVector(): Promise<NativeVaultInteropResult> {
  const platform = Platform.OS;
  if (platform !== 'android' && platform !== 'ios') {
    return {
      vectorId: vector.id,
      platform,
      status: 'NATIVE_DEVICE_REQUIRED',
      checks: [],
    };
  }

  const key = (await AESEncryptionKey.import(hexToBytes(vector.vdkHex))) as AESEncryptionKey;
  const plaintextBytes = new TextEncoder().encode(vector.plaintext);
  const sealed = await aesEncryptAsync(plaintextBytes, key, {
    additionalData: vector.aadBase64,
    nonce: { bytes: vector.nonceBase64 },
    tagLength: 16,
  });

  const ciphertext = await sealed.ciphertext({ encoding: 'base64', includeTag: true });
  const nonce = await sealed.iv('base64');
  if (typeof ciphertext !== 'string' || typeof nonce !== 'string') {
    throw new Error('native_interop_invalid_crypto_output');
  }

  const checksum = await digestStringAsync(
    CryptoDigestAlgorithm.SHA256,
    `${nonce}.${ciphertext}.${vector.aadBase64}`,
  );

  const decrypted = await aesDecryptAsync(sealed, key, {
    additionalData: vector.aadBase64,
    output: 'bytes',
  });
  if (!(decrypted instanceof Uint8Array)) throw new Error('native_interop_invalid_plaintext_output');
  const plaintext = new TextDecoder().decode(decrypted);

  const checks: NativeVaultInteropCheck[] = [
    { name: 'nonce-exact', ok: nonce === vector.nonceBase64 },
    { name: 'ciphertext-tag-exact', ok: ciphertext === vector.ciphertextBase64 },
    { name: 'checksum-exact', ok: checksum === vector.checksumSha256 },
    { name: 'decrypt-roundtrip', ok: plaintext === vector.plaintext },
  ];

  return {
    vectorId: vector.id,
    platform,
    status: checks.every((check) => check.ok) ? 'PASS' : 'FAIL',
    checks,
  };
}
