import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>HNK CODEX INTERATIVO 365</Text>
      <Text style={styles.title}>Kether</Text>
      <Text style={styles.subtitle}>Foundation shell · Dias 1–36</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>O portal digital está sendo erguido.</Text>
        <Text style={styles.cardBody}>
          Este shell valida Expo, React Native e a arquitetura do primeiro vertical slice HNK.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: '#08090c',
  },
  eyebrow: {
    color: '#a99654',
    fontSize: 12,
    letterSpacing: 2.4,
    marginBottom: 12,
  },
  title: {
    color: '#fffdf4',
    fontSize: 56,
    fontWeight: '700',
  },
  subtitle: {
    color: '#a6a8ae',
    fontSize: 16,
    marginTop: 4,
    marginBottom: 32,
  },
  card: {
    borderWidth: 1,
    borderColor: '#5b4e27',
    borderRadius: 22,
    padding: 22,
    backgroundColor: '#101116',
  },
  cardTitle: {
    color: '#f6e7a1',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    color: '#c8c9ce',
    fontSize: 15,
    lineHeight: 22,
  },
});
