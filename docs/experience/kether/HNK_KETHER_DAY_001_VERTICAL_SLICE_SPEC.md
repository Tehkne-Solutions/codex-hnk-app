# HNK KETHER — DAY 001 VERTICAL SLICE SPEC

**Status:** Design Proposal v0.1  
**Dia:** 001  
**Sephira:** Kether  
**Mundo:** Atziluth  
**Anjo:** Vehuiah  
**XP canônico:** +150  
**Tracks canônicos:** `TEURG-101`, `COMP-101`, `BIO-101`  
**Fonte de verdade:** `hnk-codex-365/canon/capitulo-01-kether/dia-001.md`

> Este documento define experiência e software. Não substitui o Markdown canônico e não autoriza alteração do texto editorial.

---

## 1. POR QUE O DIA 001 É O VERTICAL SLICE

O Dia 001 precisa provar, numa única experiência, que o HNK consegue unir:

- grimório canônico;
- três pilares sem aparência de formulário;
- prática guiada;
- áudio;
- ritual visual;
- diário zero-knowledge;
- registro de evidência;
- XP idempotente;
- progressão da Coroa;
- deep-link/QR;
- offline;
- acessibilidade;
- Asset Registry.

Se o Dia 001 estiver correto, a arquitetura pode ser escalada para os outros 35 dias sem transformar o Codex em um template mecânico.

---

## 2. SNAPSHOT CANÔNICO QUE O APP DEVE CARREGAR

O app não hardcoda estes valores; eles vêm do Supabase sincronizado com o repositório canônico:

- `day = 1`
- `chapter = 1`
- `sephira = Kether`
- `world = Atziluth`
- `angel = Vehuiah`
- `xp = 150`
- `tracks = [TEURG-101, COMP-101, BIO-101]`
- Tarot: **O Louco**
- Runa: **Fehu**
- I-Ching: **Hexagrama 1 — O Criativo**

A página contém três atos editoriais:

1. **Jachin / Expansão** — Kether, Zoe, O Louco, Dai Koo Myo, foco e visualização.
2. **Boaz / Restrição** — Fator Crítico, disciplina, auto-hipnose/relaxamento e redução de distrações.
3. **Caminho do Meio / Integração** — convergência, vocalização/glossolália, registro e validação no HNK.

---

## 3. CONFLITOS CANÔNICOS ABERTOS

### AUDIO-001 — `REVIEW_REQUIRED`

O mesmo Markdown menciona:

- **528 Hz** em uma Ordália;
- no QR: **ondas Theta / 432 Hz base**.

O banco ainda não possui `audio_presets.day = 1`.

**Regra de implementação:** não escolher silenciosamente 528 ou 432. O vertical slice pode implementar o player e o estado `PRESET_PENDING`, mas um preset de produção só entra após decisão editorial.

**Possível reconciliação para avaliação, não aprovada:** 528 Hz como camada ritual/Solfeggio e 432 Hz como carrier/base de um binaural Theta. Isso exige aprovação explícita e testes de áudio antes de virar cânone de plataforma.

### XP-001 — resolvido pela fonte de verdade

O plano antigo do capítulo descrevia +100 XP para “O Salto Cósmico”; o arquivo canônico atual e o dataset sincronizado usam **+150 XP**. O app usa +150.

---

## 4. OBJETIVO EMOCIONAL E NARRATIVO

O usuário deve sentir que está **entrando** no Codex, não abrindo uma lição.

A palavra-chave do Dia 001 é **LIMIAR**.

A experiência começa quase vazia. A interface revela informação somente quando necessária. O primeiro toque não abre um dashboard cheio de números; ele acende uma centelha no node de Kether.

### Resultado narrativo

Antes: `FORA DO TEMPLO`  
Depois: `NEÓFITO — TRAVESSIA INICIADA`

A Coroa ainda não recebe o Fragmento I completo — isso ocorre apenas no Dia 005 — mas ganha a **primeira centelha**.

---

## 5. STATE MACHINE

```text
LOCKED
  ↓ unlock
AVAILABLE
  ↓ start
THRESHOLD
  ↓
CANON_REVEAL
  ↓
JACHIN_ACTIVE
  ↓
BOAZ_ACTIVE
  ↓
MIDDLE_ACTIVE
  ↓
EVIDENCE_PENDING
  ↓ save record
COMPLETE
  ↓ optional
REVISIT
```

### Saídas não destrutivas

De `JACHIN_ACTIVE`, `BOAZ_ACTIVE` ou `MIDDLE_ACTIVE` o usuário pode:

- pausar;
- encerrar sessão;
- retornar depois;
- salvar observações parciais localmente.

Uma interrupção nunca gera “falha espiritual”.

---

## 6. SEQUÊNCIA DE EXPERIÊNCIA — CENA A CENA

### S001 — DEEP LINK / ENTRADA

**Entrada possível:** Home, QR físico ou URL `hnk://codex/day/001`.

**UI:** fundo Atziluth/Kether quase preto; apenas um ponto branco pulsando muito lentamente.

**Ações:**

- `Entrar no Dia 1`
- `Ler sem iniciar prática`

O QR nunca concede XP sozinho; apenas resolve o Dia.

---

### S002 — O LIMIAR

A centelha expande e revela o node de Kether.

Metadados aparecem em camadas:

`DIA 001`  
`KETHER · ATZILUTH`  
`VEHUIAH`  
`O LOUCO · FEHU · HEXAGRAMA 1`

XP aparece discretamente como recompensa futura, não como caça-níquel.

**Asset dependencies:**

- `kether-background`
- `kether-key-art`
- `kether-tree-node-active`
- `day-001-thumbnail`

Se algum asset não estiver `published`, usar fallback do Design System; nunca URL improvisada.

---

### S003 — A ABERTURA / JACHIN

O texto canônico entra em blocos respirados sobre a key art. Não exibir o rótulo “137 palavras” para o usuário padrão; isso pode existir em modo editorial/HNK Studio.

**Transição:** o texto vai perdendo moldura e se tornando Focus Mode.

CTA contextual: `Entrar na prática`.

---

### S004 — JACHIN FOCUS MODE

A Kavanah de Jachin é renderizada a partir do Markdown canônico.

**Componentes:**

- `RITUAL_TIMER`
- `FOCUS_ORB`/visual de Kether coerente com o texto
- botão `Encerrar agora`
- redução de movimento configurável

**Registro estruturado:**

- duração;
- conforto 0–10;
- foco 0–10;
- silêncio 0–10;
- número opcional de distrações.

O app registra percepções; não tenta verificar presença espiritual, “energia” ou qualquer resultado metafísico.

---

### S005 — TRANSIÇÃO JACHIN → BOAZ

Visualmente, expansão se contrai em um eixo central.

Uma única frase de passagem de UX pode ser criada, desde que marcada como microcopy da plataforma e não confundida com texto do Codex.

A interface muda de “campo aberto” para “estrutura”.

---

### S006 — BOAZ / RESTRIÇÃO

Doutrina canônica apresentada em composição mais contida.

A Kavanah utiliza roteiro textual canônico e um timer discreto.

**Componentes:**

- `RITUAL_TIMER`
- `COUNTDOWN_DISSOLVE` somente se o texto ativo do cânone solicitar contagem;
- body relaxation indicator não diagnóstico.

**Registro:**

- relaxamento 0–10;
- profundidade subjetiva 0–10;
- conforto;
- controle voluntário preservado `yes/no`;
- observação livre opcional no Vault.

A experiência deve sempre terminar com orientação explícita de retorno antes de abrir outro instrumento.

---

### S007 — ORDÁLIA DE BOAZ / DISSECAÇÃO DO AMBIENTE

A Ordália canônica pede registro de três distrações.

Transformar isso em uma interação de **três lâminas/cartas**:

`DISTRAÇÃO 1`  
`DISTRAÇÃO 2`  
`DISTRAÇÃO 3`

Para cada uma:

- descrição livre → **Vault criptografado**;
- ação prática opcional não sensível pode ser salva como campo estruturado.

Ao confirmar, as três cartas se afastam do centro visual de Kether.

---

### S008 — CAMINHO DO MEIO / CONVERGÊNCIA

O layout volta a abrir-se. O objetivo é deixar claro que não começamos um “terceiro formulário”; as duas forças anteriores convergem.

O texto canônico é exibido com uma linha/anel ligando Jachin e Boaz ao centro.

CTA: `Integrar`.

---

### S009 — VOCALIZAÇÃO / VOICE MODE

Quando a Kavanah canônica de vocalização for iniciada:

- pedir consentimento de microfone;
- permitir prática **sem gravação**;
- gravação é opt-in;
- arquivo permanece local por padrão;
- upload nunca é automático;
- transcrição não é necessária para concluir o Dia.

**Componentes:**

- timer;
- waveform local simples;
- `Stop` sempre visível;
- sem inferir “nível de espiritualidade”, veracidade ou qualidade da oração pela voz.

Se o usuário decidir salvar no Diário, criptografar antes do sync conforme a arquitetura do Vault.

---

### S010 — AUDIO / QR SEAL

O player está implementado, mas o conteúdo sonoro fica dependente de `audio_presets`.

Enquanto `AUDIO-001` não for resolvido:

```text
Player: READY
Preset: EDITORIAL REVIEW
Production playback: BLOCKED
```

Em ambiente de desenvolvimento é permitido usar um tone-test técnico claramente identificado como não canônico.

---

### S011 — EVIDENCE SHEET

A experiência converge em uma única folha de evidência, não três relatórios.

Mostrar somente os dados que o usuário decidiu registrar:

- tempo total de prática;
- foco;
- silêncio;
- conforto;
- distrações;
- prática vocal realizada `yes/no`;
- áudio canônico executado `yes/no/not_available`;
- diário registrado `yes/no`.

Área final:

`O que mudou entre o início e o fim da sessão?`

Resposta livre → Vault.

---

### S012 — SELO / XP

Pré-condições técnicas para conclusão:

1. sessão foi iniciada;
2. ao menos um Practice Record foi criado;
3. usuário confirma conclusão voluntária;
4. retorno da prática foi registrado;
5. `day_completions(user_id, day=1)` ainda não existe.

A conclusão cria de forma idempotente:

- `day_completions`;
- um único `xp_event` de +150 com chave idempotente determinística;
- atualização de `user_progress.current_day` para 2 quando aplicável;
- evento visual `KETHER_FIRST_SPARK`.

Reabrir o Dia 001 não concede XP novamente.

---

### S013 — PRIMEIRA CENTELHA

A Árvore da Vida aparece por poucos segundos, sem dashboard completo.

Kether ganha uma centelha/anel mínimo.

Texto de sistema:

`1 de 36 travessias de Kether registradas.`

Não dizer “1/7 fragmentos” ainda; o Fragmento Vehuiah só é conquistado no Dia 005.

CTA primário: `Voltar ao Templo`  
CTA secundário: `Ver Dia 002`.

---

## 7. COMO OS TRÊS PILARES APARECEM SEM VIRAR TRÊS CAIXAS

### Jachin

- composição ampla;
- maior profundidade de background;
- texto respirado;
- primeira prática emerge do próprio conteúdo.

### Boaz

- geometria mais contida;
- linhas/limites mais presentes;
- controles e métricas tornam-se mais precisos.

### Meio

- duas geometrias se sobrepõem;
- voz, diário e evidência convergem;
- a UI abandona esquerda/direita e retorna ao centro.

O usuário sente três mudanças de “campo”, não três abas chamadas Pilar 1, 2 e 3.

---

## 8. COMPONENTES DE SOFTWARE NECESSÁRIOS

### Shared

- `CodexDayProvider`
- `CanonMarkdownRenderer`
- `PracticeSessionProvider`
- `RitualTimer`
- `FocusMode`
- `MetricRating`
- `EncryptedJournalComposer`
- `XpSeal`
- `CrownProgress`
- `AudioPresetPlayer`
- `VoicePractice`

### Mobile

- secure local storage;
- microphone permission;
- local encrypted attachment handling;
- haptic feedback muito leve e desativável.

### Web

- Web Crypto;
- Web Audio;
- microphone APIs quando suportadas;
- fallback quando browser negar permissões.

---

## 9. DATA CONTRACT — LEITURAS

### `codex_days`

Carregar:

- `day`
- `chapter`
- `sephira`
- `world`
- `angel`
- `xp`
- `tracks`
- `content`
- `source_sha`
- `editorial_version`

### `asset_registry`

Resolver somente assets em estado permitido pela build/release. Em produção, preferencialmente `published`.

### `audio_presets`

Dia 001 não possui row no momento. A UI deve tratar ausência como estado válido e editorialmente bloqueado, não como erro fatal.

---

## 10. DATA CONTRACT — ESCRITAS

Tabelas existentes:

- `day_completions`
- `xp_events`
- `journal_vault`
- `user_progress`

### Lacuna identificada

A plataforma ainda necessita de uma entidade própria para evidência/prática estruturada, separada do texto criptografado do diário.

**Proposta para implementação posterior:** `practice_records`.

Campos mínimos sugeridos:

```text
id
user_id
day
protocol_version
started_at
completed_at
duration_seconds
metrics jsonb
completed_voluntarily
journal_entry_id nullable
client_record_hash
created_at
```

Essa tabela não deve guardar texto livre do Diário.

---

## 11. XP IDEMPOTENTE

Chave recomendada:

`codex-day-completion:{user_id}:001:{completion_version}`

O banco, e não apenas a UI, deve impedir prêmio duplicado.

Clicar novamente, reinstalar o app ou sincronizar dois dispositivos não pode duplicar +150 XP.

---

## 12. PRIVACIDADE E VOZ

No Dia 001 existe conteúdo vocal. Regras:

- microfone só após ação explícita do usuário;
- prática pode ocorrer sem gravação;
- análise pode ser local;
- nenhum áudio privado entra em analytics;
- nenhum arquivo é usado para treino/modelos por padrão;
- se houver cloud sync, criptografar antes do upload;
- apagar localmente deve ser uma ação clara.

---

## 13. ACESSIBILIDADE

Obrigatório no vertical slice:

- `Reduce Motion`;
- alto contraste suficiente;
- fontes escaláveis;
- navegação por teclado na Web;
- labels acessíveis para timer/player;
- alternativa a haptics;
- alternativa visual ao áudio e alternativa textual à animação;
- nenhum flash rápido;
- Focus Mode não pode esconder permanentemente o botão de saída.

---

## 14. OFFLINE

Depois do preload do Dia 001, devem funcionar offline:

- conteúdo canônico;
- assets essenciais cacheados;
- timer;
- prática;
- métricas;
- Diário local criptografado;
- conclusão pendente.

XP remoto e sync podem entrar em fila até a conexão retornar.

Conflitos de dois dispositivos devem preservar idempotência.

---

## 15. ASSET CHECKLIST — DAY 001

Já registrados/planned:

- `day-001-thumbnail`
- `day-001-qr`
- `kether-background`
- `kether-key-art`
- `kether-tree-node-active`

Ainda necessários como classes funcionais, caso não existam em Design System:

- Coroa `0/7 + first-spark`;
- O Louco — tratamento HNK;
- Fehu — tratamento HNK;
- Hexagrama 1 — tratamento HNK;
- approved Dai Koo Myo reference asset;
- focus visual;
- waveform/spectrum primitives;
- Vehuiah micro-emblem;
- transition geometry Jachin→Boaz→Meio.

Nenhum texto deve ser rasterizado dentro das artes-base.

---

## 16. EVENTOS DE ANALYTICS PERMITIDOS

- `day_viewed`
- `practice_started`
- `practice_paused`
- `practice_completed`
- `day_completed`
- `audio_opened`
- `audio_stopped`
- `voice_mode_opened`
- `cycle_progress_viewed`

Payloads nunca incluem texto de Diário, transcrição ou gravação.

---

## 17. QA — TESTES DE ACEITAÇÃO

### Canon

- [ ] Dia, anjo, XP, tracks e texto vêm do Supabase.
- [ ] `source_sha` pode ser exibido no HNK Studio para auditoria.
- [ ] nenhum texto da plataforma se passa por texto canônico.

### UX

- [ ] usuário entende onde está sem dashboard pesado;
- [ ] pilares são percebidos como jornada;
- [ ] qualquer prática pode ser interrompida;
- [ ] retorno fica explícito;
- [ ] completion não exige sensação sobrenatural específica.

### RPG

- [ ] +150 XP apenas uma vez;
- [ ] Grau permanece Neófito;
- [ ] Kether ganha first-spark, não Fragmento I completo;
- [ ] Dia 002 fica disponível após conclusão conforme regra de progressão.

### Security

- [ ] service role nunca está no cliente;
- [ ] Journal plaintext não chega ao servidor;
- [ ] áudio privado não entra em analytics;
- [ ] RLS cobre todas as escritas pessoais.

### Resilience

- [ ] funciona após perder internet no meio da sessão;
- [ ] retomada preserva Practice Record local;
- [ ] sync posterior não duplica XP;
- [ ] ausência de audio preset não quebra o Dia.

### Visual

- [ ] todos assets resolvidos por registry/fallback;
- [ ] Reduce Motion funciona;
- [ ] mobile pequeno não corta CTA;
- [ ] dark UI mantém legibilidade;
- [ ] nenhum símbolo tradicional foi improvisado por IA.

---

## 18. DEFINITION OF DONE — VERTICAL SLICE

O Dia 001 só recebe status `EXPERIENCE_READY` quando:

1. canon remoto renderiza;
2. sessão Jachin/Boaz/Meio funciona como narrativa contínua;
3. evidência estruturada é persistida;
4. diário zero-knowledge funciona;
5. XP é idempotente;
6. first-spark da Coroa é persistido/derivável;
7. offline e retomada funcionam;
8. assets utilizados estão aprovados para o ambiente;
9. conflito AUDIO-001 está resolvido ou explicitamente bloqueado;
10. Expo + Web passam a mesma suíte funcional;
11. HNK Studio consegue inspecionar status do Dia;
12. CI verde.

---

## 19. HANDOFF PARA O PRODUCTION LAB

A implementação deve acontecer nesta ordem:

1. criar `PracticeSessionProvider` e modelo local;
2. implementar renderer canônico e scene shell;
3. implementar Evidence Sheet;
4. criar `practice_records` após revisão do schema;
5. implementar XP idempotente server-side;
6. integrar Vault;
7. integrar Crown first-spark;
8. resolver assets;
9. resolver AUDIO-001;
10. QA Mobile/Web;
11. publicar Day 001 em ambiente preview;
12. somente então escalar para Dias 002–005.
