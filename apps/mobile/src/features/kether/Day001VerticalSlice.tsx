import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { loadDay001Snapshot, type Day001Snapshot } from './day001-data';

type Scene =
  | 'threshold'
  | 'reveal'
  | 'jachin'
  | 'boaz'
  | 'distractions'
  | 'middle'
  | 'mirror'
  | 'complete';

const SCENES: Scene[] = [
  'threshold',
  'reveal',
  'jachin',
  'boaz',
  'distractions',
  'middle',
  'mirror',
  'complete',
];

export function Day001VerticalSlice() {
  const [day, setDay] = useState<Day001Snapshot | null>(null);
  const [scene, setScene] = useState<Scene>('threshold');
  const [distractions, setDistractions] = useState(['', '', '']);
  const [mirror, setMirror] = useState('');

  useEffect(() => {
    let active = true;
    void loadDay001Snapshot().then((snapshot) => {
      if (active) setDay(snapshot);
    });
    return () => {
      active = false;
    };
  }, []);

  const sceneIndex = SCENES.indexOf(scene);
  const revealLevel = Math.max(0, sceneIndex);

  const advance = () => {
    const next = SCENES[sceneIndex + 1];
    if (next) setScene(next);
  };

  if (!day) {
    return (
      <View style={styles.loading}>
        <OriginGlyph level={0} />
        <ActivityIndicator color="#fff8df" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Header day={day} sceneIndex={sceneIndex} />
        <OriginGlyph level={revealLevel} />

        {scene === 'threshold' && (
          <SceneCard eyebrow="LIMIAR" title="O primeiro ato não é compreender. É entrar.">
            <Text style={styles.bodyMuted}>
              Kether começa quase sem interface. A complexidade surgirá apenas quando você atravessar o limiar.
            </Text>
            <PrimaryAction label="ABRIR O PORTAL" onPress={advance} />
          </SceneCard>
        )}

        {scene === 'reveal' && (
          <SceneCard eyebrow="REVELAÇÃO" title={day.experienceTitle}>
            <View style={styles.metaGrid}>
              <Meta label="SEPHIRA" value={day.sephira} />
              <Meta label="MUNDO" value={day.world} />
              <Meta label="ANJO" value={day.angel} />
              <Meta label="XP" value={`+${day.xp}`} />
            </View>
            <Text style={styles.oracle}>{day.tarot} · {day.rune} · {day.iching}</Text>
            <Text style={styles.platformMicrocopy}>
              Você está diante da primeira centelha. Ainda não há Fragmento da Coroa: o Ciclo I só se completa no Dia 005.
            </Text>
            <PrimaryAction label="ENTRAR NA PRÁTICA" onPress={advance} />
          </SceneCard>
        )}

        {scene === 'jachin' && (
          <PracticeScene
            eyebrow="EXPANSÃO"
            title="A abertura"
            durationSeconds={600}
            canonicalText={day.jachinKavanah}
            note="Áudio do Dia 001 continua em revisão editorial: 528 Hz e 432/Theta não são colapsados em um único preset por inferência."
            action="ATRAVESSAR O EIXO"
            onComplete={advance}
          />
        )}

        {scene === 'boaz' && (
          <PracticeScene
            eyebrow="RESTRIÇÃO"
            title="O vaso"
            durationSeconds={300}
            canonicalText={day.boazKavanah}
            note="A prática deve permanecer voluntária e reversível. Se houver desconforto, abra os olhos, mova o corpo e encerre sem penalidade."
            action="REGISTRAR RETORNO"
            onComplete={advance}
          />
        )}

        {scene === 'distractions' && (
          <SceneCard eyebrow="ORDÁLIA" title="Disseque o ambiente">
            <Text style={styles.canonical}>{day.boazOrdalia}</Text>
            <Text style={styles.platformMicrocopy}>
              Estes campos ficam somente na memória local deste protótipo. O Vault criptografado será conectado antes do release.
            </Text>
            {distractions.map((value, index) => (
              <TextInput
                key={index}
                value={value}
                onChangeText={(text) =>
                  setDistractions((current) => current.map((item, itemIndex) => (itemIndex === index ? text : item)))
                }
                placeholder={`DISTRAÇÃO ${index + 1}`}
                placeholderTextColor="#686b73"
                style={styles.input}
                multiline
              />
            ))}
            <PrimaryAction
              label="AFASTAR DO CENTRO"
              onPress={advance}
              disabled={distractions.some((item) => item.trim().length === 0)}
            />
          </SceneCard>
        )}

        {scene === 'middle' && (
          <PracticeScene
            eyebrow="CONVERGÊNCIA"
            title="A voz encontra o centro"
            durationSeconds={180}
            canonicalText={day.middleKavanah}
            note="O app registra duração e percepção; não interpreta a vocalização como prova automática de origem espiritual ou estado neurológico."
            action="SELAR A CONVERGÊNCIA"
            onComplete={advance}
          />
        )}

        {scene === 'mirror' && (
          <SceneCard eyebrow="ESPELHO DA ALMA" title="O que atravessou com você?">
            <Text style={styles.bodyMuted}>
              Registre sinais, percepções e aprendizados sem transformar cada sensação em certeza. O diário de produção será criptografado antes do sync.
            </Text>
            <TextInput
              value={mirror}
              onChangeText={setMirror}
              placeholder="ESCREVA SEM PRESSA…"
              placeholderTextColor="#686b73"
              style={[styles.input, styles.mirrorInput]}
              multiline
              textAlignVertical="top"
            />
            <PrimaryAction label="SELAR O DIA" onPress={advance} disabled={mirror.trim().length === 0} />
          </SceneCard>
        )}

        {scene === 'complete' && <CompletionScene day={day} />}

        <FooterStatus day={day} sceneIndex={sceneIndex} />
      </ScrollView>
    </View>
  );
}

function Header({ day, sceneIndex }: { day: Day001Snapshot; sceneIndex: number }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>HNK CODEX · DIA {String(day.day).padStart(3, '0')}</Text>
        <Text style={styles.headerTitle}>KETHER</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerCounter}>{Math.min(sceneIndex + 1, 8)}/8</Text>
        <Text style={styles.headerSource}>{day.source === 'supabase' ? 'CANON LIVE' : 'CANON OFFLINE'}</Text>
      </View>
    </View>
  );
}

function OriginGlyph({ level }: { level: number }) {
  const ringCount = level <= 0 ? 0 : Math.min(3, Math.ceil(level / 2));
  const showAxis = level >= 5;
  const showMarks = level >= 7;

  return (
    <View style={styles.glyphFrame} accessibilityLabel="Geometria progressiva de Kether">
      {Array.from({ length: ringCount }, (_, index) => {
        const size = 88 + index * 58;
        return (
          <View
            key={size}
            style={[
              styles.glyphRing,
              { width: size, height: size, borderRadius: size / 2, marginLeft: -size / 2, marginTop: -size / 2 },
            ]}
          />
        );
      })}
      {showAxis && <View style={styles.glyphAxis} />}
      {showMarks &&
        Array.from({ length: 12 }, (_, index) => (
          <View key={index} style={[styles.glyphRay, { transform: [{ rotate: `${index * 30}deg` }] }]} />
        ))}
      <View style={[styles.originPoint, level > 0 && styles.originPointActive]} />
    </View>
  );
}

function PracticeScene({
  eyebrow,
  title,
  durationSeconds,
  canonicalText,
  note,
  action,
  onComplete,
}: {
  eyebrow: string;
  title: string;
  durationSeconds: number;
  canonicalText: string;
  note: string;
  action: string;
  onComplete: () => void;
}) {
  return (
    <SceneCard eyebrow={eyebrow} title={title}>
      <Text style={styles.canonical}>{canonicalText}</Text>
      <PracticeTimer targetSeconds={durationSeconds} />
      <Text style={styles.platformMicrocopy}>{note}</Text>
      <PrimaryAction label={action} onPress={onComplete} />
    </SceneCard>
  );
}

function PracticeTimer({ targetSeconds }: { targetSeconds: number }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((value) => Math.min(targetSeconds, value + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running, targetSeconds]);

  useEffect(() => {
    if (elapsed >= targetSeconds) setRunning(false);
  }, [elapsed, targetSeconds]);

  const formatted = useMemo(() => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [elapsed]);

  const target = `${Math.floor(targetSeconds / 60)} MIN`;

  return (
    <View style={styles.timer}>
      <View>
        <Text style={styles.timerLabel}>RITUAL TIMER · {target}</Text>
        <Text style={styles.timerValue}>{formatted}</Text>
      </View>
      <Pressable style={styles.timerButton} onPress={() => setRunning((value) => !value)}>
        <Text style={styles.timerButtonText}>{running ? 'PAUSAR' : elapsed === 0 ? 'INICIAR' : 'CONTINUAR'}</Text>
      </Pressable>
    </View>
  );
}

function CompletionScene({ day }: { day: Day001Snapshot }) {
  return (
    <SceneCard eyebrow="PASSAGEM" title="NEÓFITO — TRAVESSIA INICIADA">
      <View style={styles.rewardHalo}>
        <Text style={styles.rewardLabel}>RECOMPENSA CANÔNICA</Text>
        <Text style={styles.rewardXp}>+{day.xp} XP</Text>
      </View>
      <View style={styles.completionRows}>
        <CompletionRow label="KETHER" value="CENTELHA ACESA" />
        <CompletionRow label="COROA" value="DIA 001 / 036" />
        <CompletionRow label="CICLO I" value="VEHUIAH · 1/5" />
        <CompletionRow label="GRAU" value="NEÓFITO" />
      </View>
      <Text style={styles.platformMicrocopy}>
        Esta branch ainda não cria `practice_session` autenticada; portanto o XP acima é a recompensa prevista pelo cânone, não uma alegação de persistência no servidor.
      </Text>
      <View style={styles.lockedAction}>
        <Text style={styles.lockedActionText}>CONTINUAR A EMANAÇÃO · DIA 002</Text>
      </View>
    </SceneCard>
  );
}

function SceneCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.sceneEyebrow}>{eyebrow}</Text>
      <Text style={styles.sceneTitle}>{title}</Text>
      <View style={styles.divider} />
      {children}
    </View>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metaCell}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

function CompletionRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.completionRow}>
      <Text style={styles.completionLabel}>{label}</Text>
      <Text style={styles.completionValue}>{value}</Text>
    </View>
  );
}

function PrimaryAction({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.primaryButton, disabled && styles.primaryButtonDisabled, pressed && !disabled && styles.primaryButtonPressed]}
    >
      <Text style={[styles.primaryButtonText, disabled && styles.primaryButtonTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

function FooterStatus({ day, sceneIndex }: { day: Day001Snapshot; sceneIndex: number }) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>SOURCE SHA · {day.sourceSha.slice(0, 10)}</Text>
      <Text style={styles.footerText}>MOVIMENTO · {Math.min(sceneIndex + 1, 8)}/8</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030406' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28, backgroundColor: '#030406' },
  scrollContent: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 28, paddingBottom: 72 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 },
  eyebrow: { color: '#9c8a53', fontSize: 11, letterSpacing: 2.1, fontWeight: '600' },
  headerTitle: { color: '#fffdf4', fontSize: 26, letterSpacing: 7, fontWeight: '300', marginTop: 5 },
  headerRight: { alignItems: 'flex-end' },
  headerCounter: { color: '#fffdf4', fontSize: 14, fontVariant: ['tabular-nums'] },
  headerSource: { color: '#777a82', fontSize: 9, letterSpacing: 1.5, marginTop: 5 },
  glyphFrame: { height: 250, alignItems: 'center', justifyContent: 'center', position: 'relative', marginVertical: 6 },
  glyphRing: { position: 'absolute', left: '50%', top: '50%', borderWidth: 1, borderColor: 'rgba(224,203,128,0.32)' },
  glyphAxis: { position: 'absolute', width: 1, height: 190, backgroundColor: 'rgba(255,253,244,0.4)' },
  glyphRay: { position: 'absolute', width: 1, height: 220, backgroundColor: 'rgba(224,203,128,0.14)' },
  originPoint: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#73757b' },
  originPointActive: { backgroundColor: '#fffdf4', shadowColor: '#fff7cf', shadowOpacity: 0.9, shadowRadius: 18, elevation: 8 },
  card: { backgroundColor: 'rgba(11,12,16,0.88)', borderWidth: 1, borderColor: 'rgba(156,138,83,0.38)', borderRadius: 28, padding: 24, gap: 16 },
  sceneEyebrow: { color: '#bca86b', fontSize: 10, letterSpacing: 2.8, fontWeight: '700' },
  sceneTitle: { color: '#fffdf4', fontSize: 30, lineHeight: 36, fontWeight: '400' },
  divider: { height: 1, backgroundColor: 'rgba(188,168,107,0.22)' },
  bodyMuted: { color: '#b8bac0', fontSize: 16, lineHeight: 25 },
  canonical: { color: '#e9e5d8', fontSize: 17, lineHeight: 28 },
  platformMicrocopy: { color: '#8e9199', fontSize: 13, lineHeight: 20, borderLeftWidth: 1, borderLeftColor: '#6f6037', paddingLeft: 12 },
  oracle: { color: '#d9c77d', fontSize: 13, letterSpacing: 0.8, lineHeight: 20 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metaCell: { flexGrow: 1, minWidth: 118, borderWidth: 1, borderColor: 'rgba(188,168,107,0.2)', borderRadius: 16, padding: 14, backgroundColor: 'rgba(255,255,255,0.018)' },
  metaLabel: { color: '#777a82', fontSize: 9, letterSpacing: 1.5 },
  metaValue: { color: '#f2e4aa', fontSize: 15, marginTop: 5 },
  primaryButton: { marginTop: 4, minHeight: 54, borderRadius: 999, borderWidth: 1, borderColor: '#bca86b', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, backgroundColor: 'rgba(188,168,107,0.08)' },
  primaryButtonPressed: { backgroundColor: 'rgba(188,168,107,0.16)' },
  primaryButtonDisabled: { borderColor: '#35373d', backgroundColor: 'transparent' },
  primaryButtonText: { color: '#fff3bd', fontSize: 12, letterSpacing: 2.2, fontWeight: '700' },
  primaryButtonTextDisabled: { color: '#555860' },
  timer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 18, padding: 16, backgroundColor: '#07080b', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  timerLabel: { color: '#747780', fontSize: 9, letterSpacing: 1.5 },
  timerValue: { color: '#fffdf4', fontSize: 30, fontVariant: ['tabular-nums'], marginTop: 3, fontWeight: '300' },
  timerButton: { borderWidth: 1, borderColor: '#5d512f', borderRadius: 999, paddingVertical: 10, paddingHorizontal: 14 },
  timerButtonText: { color: '#d9c77d', fontSize: 10, letterSpacing: 1.4 },
  input: { minHeight: 58, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(188,168,107,0.24)', color: '#fffdf4', paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, backgroundColor: '#07080b' },
  mirrorInput: { minHeight: 150 },
  rewardHalo: { alignItems: 'center', paddingVertical: 22, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(217,199,125,0.42)', backgroundColor: 'rgba(217,199,125,0.05)' },
  rewardLabel: { color: '#777a82', fontSize: 9, letterSpacing: 2 },
  rewardXp: { color: '#fff0a7', fontSize: 46, fontWeight: '300', marginTop: 4 },
  completionRows: { gap: 8 },
  completionRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)' },
  completionLabel: { color: '#777a82', fontSize: 10, letterSpacing: 1.3 },
  completionValue: { color: '#e9e5d8', fontSize: 12, letterSpacing: 0.8 },
  lockedAction: { minHeight: 54, borderRadius: 999, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#303238' },
  lockedActionText: { color: '#777a82', fontSize: 11, letterSpacing: 1.8 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 22, paddingHorizontal: 4 },
  footerText: { color: '#50525a', fontSize: 9, letterSpacing: 1.2 },
});
