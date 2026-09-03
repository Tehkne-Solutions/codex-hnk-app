import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  runNativeVaultInteropVector,
  type NativeVaultInteropResult,
} from '../../features/vault/NativeVaultInteropHarness';

export default function NativeVaultInteropLabRoute() {
  const [result, setResult] = useState<NativeVaultInteropResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run() {
    setBusy(true);
    setError(null);
    try {
      setResult(await runNativeVaultInteropVector());
    } catch (reason) {
      setResult(null);
      setError(reason instanceof Error ? reason.message : 'native_vault_interop_failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.shell}>
      <Text style={styles.eyebrow}>HNK SECURITY LAB · EXPERIMENTAL · NO VAULT WRITES</Text>
      <Text style={styles.title}>Native Vault Interop</Text>
      <Text style={styles.body}>
        Executa o vetor público congelado diretamente no expo-crypto nativo. Não acessa SecureStore,
        Supabase, diário, XP ou o Vault de produção.
      </Text>
      <View style={styles.meta}>
        <Text style={styles.metaText}>PLATFORM · {Platform.OS.toUpperCase()}</Text>
        <Text style={styles.metaText}>REQUIRED · ANDROID / IOS</Text>
      </View>
      <Pressable style={[styles.button, busy && styles.buttonDisabled]} disabled={busy} onPress={() => void run()}>
        <Text style={styles.buttonText}>{busy ? 'EXECUTANDO…' : 'EXECUTAR VETOR NATIVO'}</Text>
      </Pressable>
      {error ? <Text style={styles.error}>FAIL · {error}</Text> : null}
      {result ? (
        <View style={styles.result}>
          <Text style={styles.status}>{result.status}</Text>
          <Text style={styles.vector}>{result.vectorId}</Text>
          {result.checks.map((check) => (
            <View key={check.name} style={styles.checkRow}>
              <Text style={styles.checkName}>{check.name}</Text>
              <Text style={styles.checkValue}>{check.ok ? 'PASS' : 'FAIL'}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  shell: { minHeight: '100%', padding: 24, paddingTop: 72, backgroundColor: '#07080a' },
  eyebrow: { color: '#cbb06d', fontSize: 11, letterSpacing: 1.5, marginBottom: 18 },
  title: { color: '#f7f4e8', fontSize: 44, lineHeight: 46, marginBottom: 20 },
  body: { maxWidth: 720, color: '#b8b7b0', fontSize: 16, lineHeight: 26 },
  meta: { marginTop: 28, paddingVertical: 16, borderTopWidth: StyleSheet.hairlineWidth, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#3c392f', gap: 6 },
  metaText: { color: '#8f8d84', fontSize: 11, letterSpacing: 1.2 },
  button: { marginTop: 28, padding: 18, borderWidth: 1, borderColor: '#cbb06d', alignItems: 'center' },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#cbb06d', fontSize: 12, fontWeight: '700', letterSpacing: 1.4 },
  result: { marginTop: 28 },
  status: { color: '#f7f4e8', fontSize: 30, marginBottom: 8 },
  vector: { color: '#8f8d84', marginBottom: 18 },
  checkRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#2a2b2e' },
  checkName: { color: '#d7d4c9' },
  checkValue: { color: '#cbb06d', fontWeight: '700' },
  error: { marginTop: 24, color: '#f3a6a6' },
});
