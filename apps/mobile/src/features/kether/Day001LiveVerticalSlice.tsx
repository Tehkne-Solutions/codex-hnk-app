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
import {
  completeCodexDay,
  saveEncryptedVaultEntry,
  savePracticeRecord,
  startPracticeSession,
  type CompletionResult,
  type PracticeSessionRecord,
} from '@hnk/supabase-client';
import { useHnkAuth } from '../auth/AuthContext';
import { encryptVaultText } from '../vault/vault-crypto';
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

type PracticeDurations = {
  jachin: number;
  boaz: number;
  middle: number;
};

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

function createClientSessionId(userId: string): string {
  return `hnk-d001-${userId}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message === 'vault_secure_storage_unavailable_on_web') {
      return 'O Vault V1 fecha com segurança no web. Para selar conteúdo íntimo, use o app mobile enquanto a recuperação E2EE web/multi-device não estiver congelada.';
    }
    if (error.message === 'authentication_required') return 'A sessão do Átrio expirou. Entre novamente antes de selar o Dia.';
    return error.message;
  }
  return 'Não foi possível concluir o selo digital.';
}

export function Day001LiveVerticalSlice() {
  const auth = useHnkAuth();
  const [day, setDay] = useState<Day001Snapshot | null>(null);
  const [scene, setScene] = useState<Scene>('threshold');
  const [distractions, setDistractions] = useState(['', '', '']);
  const [mirror, setMirror] = useState('');
  const [practice, setPractice] = useState<PracticeSessionRecord | null>(null);
  const [durations, setDurations] = useState<PracticeDurations>({ jachin: 0, boaz: 0, middle: 0 });
  const [completion, setCompletion] = useState<CompletionResult | null>(null);
  const [vaultHash, setVaultHash] = useState<string | null>(null);
  const [syncState, setSyncState] = useState<'idle' | 'starting' | 'sealing' | 'sealed' | 'demo' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void loadDay001Snapshot(auth.accessToken ?? undefined).then((snapshot) => {
      if (active) setDay(snapshot);
    });
    return () => {
      active = false;
    };
  }, [auth.accessToken]);

  const sceneIndex = SCENES.indexOf(scene);
  const isLive = Boolean(auth.configured && auth.phase === 'signed-in' && auth.client && auth.userId);
  const totalDuration = durations.jachin + durations.boaz + durations.middle;

  const advance = () => {
    const next = SCENES[sceneIndex + 1];
    if (next) setScene(next);
  };

  async function beginPractice() {
    setSyncError(null);
    if (!isLive || !auth.client || !auth.userId) {
      setSyncState('demo');
      advance();
      return;
    }
    if (practice) {
      advance();
      return;
    }

    setSyncState('starting');
    try {
      const session = await startPracticeSession(auth.client, {
        day: 1,
        clientSessionId: createClientSessionId(auth.userId),
        mode: 'canonical',
        appVersion: '0.1.0',
      });
      setPractice(session);
      setSyncState('idle');
      advance();
    } catch (error) {
      setSyncState('error');
      setSyncError(errorMessage(error));
    }
  }

  async function sealDay() {
    setSyncError(null);
    if (!day) return;

    if (!isLive || !auth.client || !auth.userId || !practice) {
      setSyncState('demo');
      setScene('complete');
      return;
    }

    setSyncState('sealing');
    try {
      let recordHash = vaultHash;
      if (!recordHash) {
        const plaintext = JSON.stringify({
          schema: 'hnk-day001-private-v1',
          mirror: mirror.trim(),
          distractions: distractions.map((value) => value.trim()),
        });
        const payload = await encryptVaultText({
          userId: auth.userId,
          day: 1,
          kind: 'journal',
          plaintext,
        });
        await saveEncryptedVaultEntry(auth.client, { day: 1, payload });
        recordHash = payload.checksumSha256;
        setVaultHash(recordHash);
      }

      await savePracticeRecord(auth.client, {
        sessionId: practice.id,
        durationSeconds: totalDuration,
        metrics: {
          total_practice_seconds: totalDuration,
          jachin_seconds: durations.jachin,
          boaz_seconds: durations.boaz,
          middle_seconds: durations.middle,
        },
        evidence: {
          jachin_completed: true,
          boaz_completed: true,
          middle_completed: true,
          distraction_count: distractions.filter((value) => value.trim().length > 0).length,
          mirror_saved_to_vault: true,
        },
        readyForCompletion: true,
        endedAt: new Date().toISOString(),
        localRecordHash: recordHash,
      });

      const result = await completeCodexDay(auth.client, {
        day: 1,
        sessionId: practice.id,
        localRecordHash: recordHash,
      });

      setCompletion(result);
      setDistractions(['', '', '']);
      setMirror('');
      setSyncState('sealed');
      setScene('complete');
    } catch (error) {
      setSyncState('error');
      setSyncError(errorMessage(error));
    }
  }

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
        <Header
          day={day}
          sceneIndex={sceneIndex}
          live={isLive}
          email={auth.email}
          onSignOut={() => void auth.signOut()}
        />
        <OriginGlyph level={sceneIndex} />

        {scene === 'threshold' && (
          <SceneCard eyebrow="LIMIAR" title="O primeiro ato não é compreender. É entrar.">
            <Text style={styles.bodyMuted}>
              Kether começa quase sem interface. A complexidade nasce à medida que a travessia acontece.
            </Text>
            <SyncBadge live={isLive} state={syncState} />
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
              A primeira centelha não é o Fragmento I da Coroa. O fragmento só é consolidado ao concluir o ciclo de Vehuiah no Dia 005.
            </Text>
            {syncError ? <ErrorNotice text={syncError} /> : null}
            <PrimaryAction
              label={syncState === 'starting' ? 'CRIANDO SESSÃO…' : 'ENTRAR NA PRÁTICA'}
              onPress={() => void beginPractice()}
              disabled={syncState === 'starting'}
            />
          </SceneCard>
        )}

        {scene === 'jachin' && (
          <PracticeScene
            eyebrow="EXPANSÃO"
            title="A abertura"
            durationSeconds={600}
            canonicalText={day.jachinKavanah}
            note="O áudio do Dia 001 permanece PRESET_PENDING: 528 Hz e 432/Theta não são colapsados por inferência do app."
            action="ATRAVESSAR O EIXO"
            onComplete={(elapsed) => {
              setDurations((value) => ({ ...value, jachin: elapsed }));
              advance();
            }}
          />
        )}

        {scene === 'boaz' && (
          <PracticeScene
            eyebrow="RESTRIÇÃO"
            title="O vaso"
            durationSeconds={300}
            canonicalText={day.boazKavanah}
            note="A prática permanece voluntária e reversível. Desconforto não gera penalidade; abra os olhos, mova o corpo e encerre quando necessário."
            action="REGISTRAR RETORNO"
            onComplete={(elapsed) => {
              setDurations((value) => ({ ...value, boaz: elapsed }));
              advance();
            }}
          />
        )}

        {scene === 'distractions' && (
          <SceneCard eyebrow="ORDÁLIA" title="Disseque o ambiente">
            <Text style={styles.canonical}>{day.boazOrdalia}</Text>
            <Text style={styles.platformMicrocopy}>
              Estes textos permanecem apenas em memória até o selo. No modo real, são cifrados no dispositivo antes de qualquer insert no Vault.
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
            note="O app registra duração e conclusão da prática; não interpreta a vocalização como prova automática de origem espiritual ou estado neurológico."
            action="SELAR A CONVERGÊNCIA"
            onComplete={(elapsed) => {
              setDurations((value) => ({ ...value, middle: elapsed }));
              advance();
            }}
          />
        )}

        {scene === 'mirror' && (
          <SceneCard eyebrow="ESPELHO DA ALMA" title="O que atravessou com você?">
            <Text style={styles.bodyMuted}>
              Registre sinais, percepções e aprendizados sem transformar sensação em certeza automática. No modo real, o texto é cifrado com AES-256-GCM antes do sync.
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
            {syncError ? <ErrorNotice text={syncError} /> : null}
            <PrimaryAction
              label={syncState === 'sealing' ? 'SELANDO…' : isLive ? 'CIFRAR E SELAR O DIA' : 'SELAR DEMONSTRAÇÃO'}
              onPress={() => void sealDay()}
              disabled={mirror.trim().length === 0 || syncState === 'sealing'}
            />
          </SceneCard>
        )}

        {scene === 'complete' && (
          <CompletionScene day={day} completion={completion} live={isLive} syncState={syncState} />
        )}

        <FooterStatus day={day} sceneIndex={sceneIndex} practice={practice} vaultHash={vaultHash} />
      </ScrollView>
    </View>
  );
}

function Header({
  day,
  sceneIndex,
  live,
  email,
  onSignOut,
}: {
  day: Day001Snapshot;
  sceneIndex: number;
  live: boolean;
  email: string | null;
  onSignOut: () => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerIdentity}>
        <Text style={styles.eyebrow}>HNK CODEX · DIA {String(day.day).padStart(3, '0')}</Text>
        <Text style={styles.headerTitle}>KETHER</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerCounter}>{Math.min(sceneIndex + 1, 8)}/8</Text>
        <Text style={styles.headerSource}>{day.source === 'supabase' ? 'CANON LIVE' : 'CANON OFFLINE'}</Text>
        {live ? (
          <Pressable onPress={onSignOut} accessibilityRole="button">
            <Text style={styles.signOut}>{email ? 'SAIR DO ÁTRIO' : 'ENCERRAR SESSÃO'}</Text>
          </Pressable>
        ) : null}
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
  onComplete: (elapsed: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  return (
    <SceneCard eyebrow={eyebrow} title={title}>
      <Text style={styles.canonical}>{canonicalText}</Text>
      <PracticeTimer targetSeconds={durationSeconds} elapsed={elapsed} setElapsed={setElapsed} />
      <Text style={styles.platformMicrocopy}>{note}</Text>
      <PrimaryAction label={action} onPress={() => onComplete(elapsed)} />
    </SceneCard>
  );
}

function PracticeTimer({
  targetSeconds,
  elapsed,
  setElapsed,
}: {
  targetSeconds: number;
  elapsed: number;
  setElapsed: (value: number | ((current: number) => number)) => void;
}) {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed((value) => Math.min(targetSeconds, value + 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running, targetSeconds, setElapsed]);

  useEffect(() => {
    if (elapsed >= targetSeconds) setRunning(false);
  }, [elapsed, targetSeconds]);

  const formatted = useMemo(() => {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [elapsed]);

  return (
    <View style={styles.timer}>
      <View>
        <Text style={styles.timerLabel}>RITUAL TIMER · {Math.floor(targetSeconds / 60)} MIN</Text>
        <Text style={styles.timerValue}>{formatted}</Text>
      </View>
      <Pressable style={styles.timerButton} onPress={() => setRunning((value) => !value)}>
        <Text style={styles.timerButtonText}>{running ? 'PAUSAR' : elapsed === 0 ? 'INICIAR' : 'CONTINUAR'}</Text>
      </Pressable>
    </View>
  );
}

function CompletionScene({
  day,
  completion,
  live,
  syncState,
}: {
  day: Day001Snapshot;
  completion: CompletionResult | null;
  live: boolean;
  syncState: string;
}) {
  const first = completion?.firstCompletion === true;
  const reward = completion ? (first ? `+${completion.xpAwarded} XP` : 'XP JÁ SELADO') : `+${day.xp} XP`;

  return (
    <SceneCard eyebrow="PASSAGEM" title="NEÓFITO — TRAVESSIA INICIADA">
      <View style={styles.rewardHalo}>
        <Text style={styles.rewardLabel}>{completion ? 'RESPOSTA CANÔNICA DO SERVIDOR' : 'RECOMPENSA CANÔNICA PREVISTA'}</Text>
        <Text style={styles.rewardXp}>{reward}</Text>
        {completion ? <Text style={styles.rewardTotal}>XP TOTAL · {completion.xpTotal}</Text> : null}
      </View>
      <View style={styles.completionRows}>
        <CompletionRow label="KETHER" value="CENTELHA ACESA" />
        <CompletionRow label="COROA" value="DIA 001 / 036" />
        <CompletionRow label="CICLO I" value="VEHUIAH · 1/5" />
        <CompletionRow label="GRAU" value={completion?.initiatoryTitle?.toUpperCase() ?? 'NEÓFITO'} />
      </View>
      {completion ? (
        <Text style={styles.successCopy}>
          {first
            ? 'O servidor confirmou a primeira conclusão. O XP foi concedido de forma idempotente e o Dia 002 pode ser apresentado como próximo passo.'
            : 'Esta foi uma revisita. O servidor preservou a conclusão anterior e não duplicou XP.'}
        </Text>
      ) : (
        <Text style={styles.platformMicrocopy}>
          {live && syncState !== 'demo'
            ? 'A conclusão não possui confirmação do servidor.'
            : 'Modo demonstrativo: o valor acima vem do cânone, mas nenhum XP foi persistido.'}
        </Text>
      )}
      <View style={[styles.lockedAction, completion && styles.unlockedAction]}>
        <Text style={[styles.lockedActionText, completion && styles.unlockedActionText]}>
          {completion ? 'CONTINUAR A EMANAÇÃO · DIA 002' : 'DIA 002 · AGUARDA SELO REAL'}
        </Text>
      </View>
    </SceneCard>
  );
}

function SyncBadge({ live, state }: { live: boolean; state: string }) {
  return (
    <View style={styles.syncBadge}>
      <View style={[styles.syncDot, live && styles.syncDotLive]} />
      <Text style={styles.syncText}>{live ? `ÁTRIO AUTENTICADO · ${state.toUpperCase()}` : 'MODO DEMONSTRATIVO · SEM PERSISTÊNCIA'}</Text>
    </View>
  );
}

function ErrorNotice({ text }: { text: string }) {
  return (
    <View style={styles.errorNotice}>
      <Text style={styles.errorTitle}>SELO INTERROMPIDO COM SEGURANÇA</Text>
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
}

function SceneCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
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

function PrimaryAction({ label, onPress, disabled = false }: { label: string; onPress: () => void; disabled?: boolean }) {
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

function FooterStatus({
  day,
  sceneIndex,
  practice,
  vaultHash,
}: {
  day: Day001Snapshot;
  sceneIndex: number;
  practice: PracticeSessionRecord | null;
  vaultHash: string | null;
}) {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>SOURCE SHA · {day.sourceSha.slice(0, 10)}</Text>
      <Text style={styles.footerText}>MOVIMENTO · {Math.min(sceneIndex + 1, 8)}/8</Text>
      <Text style={styles.footerText}>SESSION · {practice ? practice.id.slice(0, 8) : 'LOCAL'}</Text>
      <Text style={styles.footerText}>VAULT · {vaultHash ? vaultHash.slice(0, 8) : 'PENDING'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#030406' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28, backgroundColor: '#030406' },
  scrollContent: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 28, paddingBottom: 72 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 16 },
  headerIdentity: { flexShrink: 1 },
  eyebrow: { color: '#9c8a53', fontSize: 11, letterSpacing: 2.1, fontWeight: '600' },
  headerTitle: { color: '#fffdf4', fontSize: 26, letterSpacing: 7, fontWeight: '300', marginTop: 5 },
  headerRight: { alignItems: 'flex-end' },
  headerCounter: { color: '#fffdf4', fontSize: 14, fontVariant: ['tabular-nums'] },
  headerSource: { color: '#777a82', fontSize: 9, letterSpacing: 1.5, marginTop: 5 },
  signOut: { color: '#776d4e', fontSize: 8, letterSpacing: 1.2, marginTop: 8 },
  glyphFrame: { height: 250, alignItems: 'center', justifyContent: 'center', position: 'relative', marginVertical: 6 },
  glyphRing: { position: 'absolute', left: '50%', top: '50%', borderWidth: 1, borderColor: 'rgba(224,203,128,0.32)' },
  glyphAxis: { position: 'absolute', width: 1, height: 190, backgroundColor: 'rgba(255,249,222,0.22)' },
  glyphRay: { position: 'absolute', width: 1, height: 206, backgroundColor: 'rgba(218,195,111,0.11)' },
  originPoint: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#716b5a' },
  originPointActive: { backgroundColor: '#fffbe8', shadowColor: '#fff1b4', shadowOpacity: 0.85, shadowRadius: 17 },
  card: { borderWidth: 1, borderColor: '#292a2e', borderRadius: 28, backgroundColor: '#08090d', padding: 24, gap: 16 },
  sceneEyebrow: { color: '#9b8952', fontSize: 10, letterSpacing: 2.2, fontWeight: '700' },
  sceneTitle: { color: '#fffdf4', fontSize: 30, lineHeight: 36, fontWeight: '300' },
  divider: { height: 1, backgroundColor: '#27282c' },
  bodyMuted: { color: '#b0b2b8', fontSize: 15, lineHeight: 24 },
  canonical: { color: '#ece7d6', fontSize: 17, lineHeight: 28 },
  platformMicrocopy: { color: '#83858d', fontSize: 12, lineHeight: 19 },
  oracle: { color: '#d6c681', fontSize: 12, lineHeight: 20, letterSpacing: 0.7 },
  metaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  metaCell: { minWidth: 118, flexGrow: 1, borderWidth: 1, borderColor: '#24252a', borderRadius: 15, padding: 13, backgroundColor: '#0c0d11' },
  metaLabel: { color: '#696b72', fontSize: 8, letterSpacing: 1.5, fontWeight: '700' },
  metaValue: { color: '#f5efd7', fontSize: 14, marginTop: 5 },
  input: { minHeight: 58, borderWidth: 1, borderColor: '#303138', backgroundColor: '#050609', color: '#fffdf4', borderRadius: 16, padding: 15, fontSize: 15, lineHeight: 21 },
  mirrorInput: { minHeight: 180 },
  primaryButton: { minHeight: 56, borderRadius: 17, backgroundColor: '#e2cf82', alignItems: 'center', justifyContent: 'center', marginTop: 4 },
  primaryButtonPressed: { opacity: 0.85 },
  primaryButtonDisabled: { backgroundColor: '#25251f' },
  primaryButtonText: { color: '#12120f', fontSize: 11, letterSpacing: 1.8, fontWeight: '800' },
  primaryButtonTextDisabled: { color: '#68685e' },
  timer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#3b361f', backgroundColor: '#0c0c09', borderRadius: 18, padding: 17 },
  timerLabel: { color: '#887b51', fontSize: 9, letterSpacing: 1.5 },
  timerValue: { color: '#fff4c0', fontSize: 28, fontVariant: ['tabular-nums'], marginTop: 3 },
  timerButton: { borderWidth: 1, borderColor: '#62562d', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 14 },
  timerButtonText: { color: '#d8c889', fontSize: 9, letterSpacing: 1.3, fontWeight: '700' },
  syncBadge: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  syncDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#716b5a' },
  syncDotLive: { backgroundColor: '#dcca80' },
  syncText: { color: '#777970', fontSize: 9, letterSpacing: 1.2 },
  errorNotice: { borderWidth: 1, borderColor: '#5b3431', backgroundColor: '#140b0b', borderRadius: 16, padding: 15 },
  errorTitle: { color: '#d9988e', fontSize: 9, letterSpacing: 1.4, fontWeight: '800' },
  errorText: { color: '#c8aba7', fontSize: 12, lineHeight: 18, marginTop: 7 },
  rewardHalo: { alignItems: 'center', justifyContent: 'center', minHeight: 180, borderWidth: 1, borderColor: '#4d4325', borderRadius: 90, backgroundColor: '#0e0d08' },
  rewardLabel: { color: '#8d8158', fontSize: 8, letterSpacing: 1.6 },
  rewardXp: { color: '#fff0a9', fontSize: 33, fontWeight: '300', marginTop: 7 },
  rewardTotal: { color: '#8f825e', fontSize: 10, letterSpacing: 1.4, marginTop: 7 },
  completionRows: { gap: 1, borderRadius: 16, overflow: 'hidden' },
  completionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 20, paddingVertical: 12, paddingHorizontal: 14, backgroundColor: '#0c0d11' },
  completionLabel: { color: '#74767d', fontSize: 9, letterSpacing: 1.2 },
  completionValue: { color: '#e3dac0', fontSize: 10, letterSpacing: 1, textAlign: 'right' },
  successCopy: { color: '#c5bb94', fontSize: 13, lineHeight: 20 },
  lockedAction: { borderWidth: 1, borderColor: '#2a2b2f', borderRadius: 15, padding: 15, alignItems: 'center' },
  lockedActionText: { color: '#62646a', fontSize: 9, letterSpacing: 1.4, fontWeight: '700' },
  unlockedAction: { borderColor: '#665a32', backgroundColor: '#0f0e09' },
  unlockedActionText: { color: '#ddcc85' },
  footer: { marginTop: 18, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10, paddingHorizontal: 4 },
  footerText: { color: '#51535a', fontSize: 8, letterSpacing: 1.1 },
});
