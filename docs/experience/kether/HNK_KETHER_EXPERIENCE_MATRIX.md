# HNK KETHER EXPERIENCE MATRIX — DIAS 001–036

**Status:** Design Proposal v0.1  
**Escopo:** Capítulo 1 — Kether / Atziluth / Grau 1 — Neófito  
**Função:** contrato entre Cânone → UX → Game Design → Asset Factory → Mobile/Web → HNK Studio  
**Fonte editorial de verdade:** `Tehkne-Solutions/hnk-codex-365`  
**Regra:** este documento NÃO altera Doutrina, Kavanah, Ordália, XP ou metadados canônicos. Quando houver divergência, o Markdown canônico vence.

---

## 1. OBJETIVO DE EXPERIÊNCIA

Kether deve funcionar como uma iniciação digital completa de 36 dias, e não como uma coleção de páginas com três caixas. A geometria editorial Jachin → Boaz → Caminho do Meio permanece íntegra no conteúdo, mas a plataforma a converte em uma jornada contínua:

`Limiar → Descoberta → Experiência → Restrição/Teste → Integração → Evidência → Selo → Próximo Dia`

O jogador entra como **Neófito**, constrói simbolicamente a **Coroa de Kether** através de sete fragmentos/ciclos e enfrenta o **Portal 036** para desbloquear Chokmah.

### 1.1. Princípios obrigatórios

1. **Canon-first:** nenhum componente de UX reescreve o protocolo do dia.
2. **A experiência não exige um fenômeno subjetivo específico para conceder conclusão.** O usuário conclui ao executar o protocolo voluntariamente e registrar evidência compatível com a prática.
3. **Os três pilares não aparecem obrigatoriamente como três cards.** Eles são atos narrativos e podem ser apresentados por scroll, transições, áudio, interação ou mudança de estado visual.
4. **Métrica antes de espetáculo:** quando o dia permite comparação, o app registra duração, latência, distrações, intensidade e/ou antes/depois.
5. **Diário privado por padrão:** conteúdo livre permanece no cofre criptografado; telemetria não deve conter texto privado.
6. **Offline-first para prática:** timer, áudio básico, registro local e conteúdo do dia devem continuar operando sem conexão.
7. **Interrupção voluntária:** toda experiência de foco/transe possui `Pausar`, `Encerrar` e retorno claro ao estado normal.
8. **Assets são versionados:** nenhuma imagem gerada entra diretamente em produção sem Asset Registry e aprovação.

---

## 2. MACROJORNADA — A COROA DE SETE FRAGMENTOS

| Fragmento | Dias | Ciclo | Beat narrativo | Competência dominante | Estado da Coroa |
|---|---:|---|---|---|---|
| I | 1–5 | Vehuiah | **O Despertar** | intenção, contrato, primeira disciplina | 1/7 aceso |
| II | 6–10 | Jeliel | **O Silêncio** | escuta, auto-indução, âncora | 2/7 acesos |
| III | 11–15 | Sitael | **A Disciplina do Olhar** | observação, foco, Trataka | 3/7 acesos |
| IV | 16–20 | Elemiah | **A Voz e o Vazio** | som, vocalização, ressonância, silêncio posterior | 4/7 acesos |
| V | 21–25 | Mahasiah | **A Luz no Corpo** | respiração, visualização somática, mãos, espaço | 5/7 acesos |
| VI | 26–30 | Lelahel | **A Percepção** | foco frontal, Pérola Azul, imaginação espacial, áudio | 6/7 acesos |
| VII | 31–35 | Achaiah | **A Profundidade** | auto-hipnose profunda, quietude, signo-sinal, fechamento ritual | 7/7 acesos |
| Portal | 36 | Kether → Chokmah | **A Travessia** | integração e prova de autonomia | Coroa completa → Portal |

### 2.1. Ritual visual de fechamento de ciclo

Ao completar o quinto dia de cada ciclo:

- o fragmento correspondente da Coroa recebe luz;
- o node de Kether ganha uma nova camada/anel;
- o usuário vê um resumo de evidência do ciclo, sem ranking competitivo;
- a fórmula teúrgica e o emblema do ciclo aparecem como selo;
- o próximo ciclo é apresentado por uma microcena de 5–10 segundos, nunca por popup genérico.

---

## 3. SISTEMA DE ESTADOS DO DIA

Cada dia pode estar em um dos seguintes estados:

- `LOCKED` — ainda não disponível.
- `AVAILABLE` — pode ser iniciado.
- `ACTIVE` — sessão atual em andamento.
- `EVIDENCE_PENDING` — prática executada, falta registro mínimo.
- `COMPLETE` — protocolo + evidência mínima registrados.
- `REVISIT` — dia concluído e reaberto sem novo XP canônico.

Não existe estado de “falha espiritual”. Uma tentativa interrompida retorna para `AVAILABLE` ou `EVIDENCE_PENDING`, conforme o que foi registrado.

---

## 4. CONFLITO DE PROGRESSÃO IDENTIFICADO

### Fontes em conflito

- O Capítulo 1 define Kether inteiro como **Level 1 — Neófito** e o Dia 36 como a passagem oficial para **Level 2 — Iniciado**.
- O manual antigo de onboarding define Level 2 a partir de **1.500 XP** e Level 3 a partir de **5.500 XP**.
- Os valores de XP atualmente canônicos dos Dias 1–36 somam **5.150 XP**.

Isso faria o usuário alcançar Level 2 muito antes do Portal, contrariando a dramaturgia iniciática do capítulo.

### Decisão de design recomendada — v0.1

Separar dois sistemas:

1. **GRAU INICIÁTICO** — Neófito, Iniciado, Teurgo etc. É desbloqueado exclusivamente por conclusão de capítulo/Portal.
2. **XP TOTAL / MAESTRIA** — pontuação cumulativa usada para feedback, badges, progressão interna, métricas e futuros sistemas de recompensa.

Assim, durante os Dias 1–35 o usuário continua **Grau 1 — Neófito**, mesmo acumulando XP. O Portal 36 promove para **Grau 2 — Iniciado**.

A fórmula antiga de nível por XP fica marcada como `REVIEW_REQUIRED` e não deve ser usada para promoção de Grau até decisão editorial definitiva.

---

## 5. BIBLIOTECA DE MECÂNICAS REUTILIZÁVEIS

Estas são peças de UX, não novos ensinamentos:

- `RITUAL_TIMER` — timer com início, pausa, encerramento e marcador de interrupções.
- `BREATH_PACER` — animação respiratória opcional configurável.
- `FOCUS_ORB` — ponto/forma estável para foco visual sem flashes agressivos.
- `COUNTDOWN_DISSOLVE` — contagem regressiva visual/sonora para induções previstas no cânone.
- `AUDIO_SYNTH` — player Web Audio com preset do dia.
- `VOICE_CAPTURE` — gravação local com consentimento explícito.
- `SPECTRUM_VIEW` — visualização de espectro/frequência, sem inferir diagnóstico ou estado espiritual.
- `GESTURE_ANCHOR` — instrução e cronômetro para gesto cinestésico previsto no cânone.
- `BEFORE_AFTER` — escala subjetiva 0–10 antes/depois.
- `STRUCTURED_JOURNAL` — campos objetivos + área livre criptografada.
- `SPATIAL_VISUALIZER` — geometria/posição para exercícios imaginativos.
- `CAMERA_OVERLAY` — overlay visual opcional; não afirma detectar “energia”.
- `CONTROL_COMPARISON` — sessão ativa × condição neutra quando o protocolo canônico HNK-EP prevê comparação.
- `CYCLE_SEAL` — fechamento do ciclo e iluminação de fragmento da Coroa.
- `PORTAL_SEQUENCE` — composição multi-etapas exclusiva do Dia 36.

---

## 6. EXPERIENCE MATRIX — 36 DIAS

> **Nota:** os nomes temáticos abaixo vêm do plano de escrita do Capítulo 1 e funcionam como labels narrativos. XP e tracks devem sempre ser carregados do dataset canônico. A execução textual exata deve vir de `codex_days.content.raw_markdown`, nunca desta tabela.

| Dia | Beat / label narrativo | XP canônico | Interação principal proposta | Evidência mínima proposta | Output visual / sistema |
|---:|---|---:|---|---|---|
| 001 | **O Salto Cósmico** | 150 | `INTENTION_CONTRACT` + leitura imersiva + selo inicial | intenção/contrato registrado + baseline de estado | primeira centelha da Coroa; Diário criado |
| 002 | **Imobilidade Corporal** | 100 | `RITUAL_TIMER` de quietude + contador voluntário de impulsos | duração + impulsos + conforto | halo corporal progressivamente estável |
| 003 | **Despolarização do Ego** | 100 | três cartões de crença → questionamento → reescrita | 3 certezas/modelos registrados | cartas quebrando e recompondo-se |
| 004 | **Efeito Placebo Intencional** | 100 | `BEFORE_AFTER` + experimento comportamental do dia | expectativa antes/depois + observação | alternância de “lentes” de paradigma |
| 005 | **Banimento Inicial por Intenção** | 100 | expiração guiada + `RITUAL_TIMER` curto | tensão antes/depois + conclusão | **CYCLE_SEAL Vehuiah**; Fragmento I |
| 006 | **O Silêncio da Psuche** | 100 | mapa sonoro sem rótulos + timer de escuta | sons percebidos + distrações | UI reduz palavras progressivamente |
| 007 | **Dave Elman I** | 150 | roteiro de auto-indução + timer de teste voluntário | relaxamento ocular subjetivo + controle voluntário preservado | foco de luz sobre olhos fechados estilizados |
| 008 | **Dave Elman II** | 150 | `COUNTDOWN_DISSOLVE` + body relaxation map | número em que houve maior redução de diálogo + profundidade | números dissolvem-se no vazio de Kether |
| 009 | **Diário de Sonhos Psiconáutico** | 150 | preparação do diário onírico + `VOICE_CAPTURE` opcional | registro ao despertar ou declaração “sem recordação” | constelação de fragmentos oníricos |
| 010 | **Ancoragem da Calmaria** | 100 | `GESTURE_ANCHOR` + teste antes/depois | intensidade de calma + voluntariedade/reversibilidade | **CYCLE_SEAL Jeliel**; Fragmento II |
| 011 | **Espelho do Observador** | 100 | timer + modo de observação sem julgamento | duração + autojulgamentos percebidos | reflexo abstrato, sem distorção assustadora |
| 012 | **Trataka Primal** | 100 | `FOCUS_ORB` / modo vela seguro + timer de foco | duração + distrações + conforto ocular | chama/ponto minimalista |
| 013 | **Triturador de Números** | 100 | contador aritmético assistido, sem gamificar velocidade | série alcançada + carga mental percebida | trilha numérica vertical |
| 014 | **Concentração Unidirecional** | 100 | `FOCUS_ORB` geométrico | tempo sustentado + desvios | círculo azul estável |
| 015 | **Banimento pelo Fogo** | 150 | registro simbólico digital + encerramento não inflamável no app | item/ruído nomeado + ação de encerramento | **CYCLE_SEAL Sitael**; Fragmento III |
| 016 | **Ruína do Controle Verbal** | 100 | paisagem sonora + redução deliberada de labels | observação fenomenológica curta | palavras desmancham em ondas |
| 017 | **Ativação da Glossolália** | 150 | `VOICE_CAPTURE` opcional + timer | duração + conforto + voluntariedade | waveform abstrata, sem “tradução espiritual” automática |
| 018 | **Som Extático do Corpo** | 150 | mapa corporal de ressonância tocável | regiões de vibração percebida + intensidade | silhueta com três zonas de ressonância |
| 019 | **Análise Vocal no App** | 150 | `VOICE_CAPTURE` + `SPECTRUM_VIEW` | gravação local/opcional + espectro técnico | espectrograma e harmônicos; sem diagnóstico |
| 020 | **Esvaziamento Pós-Êxtase** | 100 | quietude pós-som + `BEFORE_AFTER` | silêncio interno antes/depois | **CYCLE_SEAL Elemiah**; Fragmento IV |
| 021 | **Linha de Prana / Ki** | 100 | `BREATH_PACER` + visualização axial | respirações + sensação corporal registrada | coluna de luz Kether→Malkuth como visualização HNK |
| 022 | **Sintonização do Dai Koo Myo** | 150 | traçado guiado/estudo visual do símbolo aprovado | sequência concluída + observação | asset canônico do símbolo; nunca IA improvisada |
| 023 | **Imposição das Mãos na Coroa** | 150 | timer + mapa de posição das mãos sem exigir contato | duração + calor/formigamento/nenhuma sensação | halo da Coroa e mãos em outline |
| 024 | **Auto-Reiki de Sintonização** | 150 | sequência de posições + timer modular | posições concluídas + conforto | mapa corporal estilizado |
| 025 | **Passe Magnético no Ambiente** | 150 | `CAMERA_OVERLAY` opcional + fallback 2D | sessão concluída + percepção do ambiente antes/depois | **CYCLE_SEAL Mahasiah**; Fragmento V |
| 026 | **Terceiro Olho / Brodmann 10** | 100 | foco frontal + timer; sem alegar identidade anatômica Ajna=BA10 | pressão/calor/formigamento/nenhuma sensação + conforto | ponto frontal abstrato |
| 027 | **Pérola Azul** | 150 | `FOCUS_ORB` azul-cobalto em fundo escuro | estabilidade percebida + tempo + distrações | micro-orbe azul, asset de assinatura |
| 028 | **Gneo Geo Astral** | 150 | `SPATIAL_VISUALIZER` de cockpit HNK | orientação, estabilidade e detalhes lembrados | diagrama Gneo Geo versionado |
| 029 | **Boneco de Auto-Purificação** | 250 | worksheet simbólico de externalização + fechamento seguro | padrão nomeado + gesto de encerramento + registro | sem instrução operacional de fogo no app; asset simbólico |
| 030 | **Gnose por ASMR** | 100 | `AUDIO_SYNTH` / preset ASMR Kether + controle neutro quando previsto | relaxamento/foco antes-depois + conforto auditivo | **CYCLE_SEAL Lelahel**; Fragmento VI |
| 031 | **Morte do Ego na Cruz** | 100 | rito contemplativo guiado, temporário e reversível | controle/diálogo analítico antes-depois + orientação ao retorno | cruz/luz sem imagética autodestrutiva |
| 032 | **Elevador de Esdaile** | 150 | `COUNTDOWN_DISSOLVE` em sete níveis + marcadores somáticos | profundidade, conforto, orientação, retorno | elevador abstrato descendo camadas de Kether |
| 033 | **Quietude Corporal Profunda** | 150 | `RITUAL_TIMER` de imobilidade confortável + condição controle | duração, impulsos, movimentos, conforto, resposta a som | nunca pontuar dor ou “resistência à dor” |
| 034 | **Instalação do Signo-Sinal Final** | 150 | `GESTURE_ANCHOR` + frase canônica + teste ativo × gesto neutro | latência, silêncio/foco, voluntariedade, reversibilidade | selo cinestésico da Coroa |
| 035 | **Ritual do Pentagrama Primal** | 250 | sequência espacial de círculos + visualização teúrgica | estabilidade/limite/intrusões antes-depois + retorno | **CYCLE_SEAL Achaiah**; Fragmento VII; Coroa completa |
| 036 | **Portal Kether → Chokmah** | 500 | `PORTAL_SEQUENCE` multi-etapas | checklist de integração + revisão dos 35 dias + sessão final + retorno | promoção de Grau; Fehu→Uruz; Louco→Mago; Chokmah desbloqueado |

---

## 7. DIÁRIO E EVIDÊNCIA — MODELO DE DADOS DE EXPERIÊNCIA

Cada conclusão deve produzir um **Practice Record** estruturado. Texto livre continua criptografado; dados estruturados podem ser armazenados separadamente quando não revelarem conteúdo sensível.

### 7.1. Campos comuns

- `day`
- `started_at`
- `completed_at`
- `duration_seconds`
- `interrupted_count`
- `comfort_0_10`
- `focus_0_10`
- `silence_0_10`
- `depth_0_10` quando aplicável
- `orientation_after_0_10`
- `completed_voluntarily`
- `journal_entry_id` opcional
- `protocol_version`

### 7.2. Campos específicos por mecânica

Exemplos:

- foco: `distractions`, `stable_seconds`;
- âncora: `latency_seconds`, `active_rating`, `control_rating`;
- áudio: `volume_safe_confirmed`, `preset_id`, `before_rating`, `after_rating`;
- voz: `recording_local_id`, `spectrum_generated`, sem upload automático;
- quietude corporal: `motor_impulses`, `movements`, `sound_reactivity`;
- portal: `days_reviewed`, `competencies_strong`, `competencies_fragile`, `return_complete`.

---

## 8. UX DOS TRÊS PILARES — SEM MECANIZAÇÃO

O conteúdo canônico continua dividido em Jachin, Boaz e Caminho do Meio, mas a tela diária não deve usar sempre a mesma composição.

### Padrão narrativo

**Jachin — abrir**  
A interface expande, ganha espaço, apresenta possibilidade e contexto.

**Boaz — testar**  
A interface se torna mais precisa, reduz opções, pede comparação, limite ou observação.

**Caminho do Meio — integrar**  
As duas leituras convergem em uma prática, decisão, medida ou registro.

### Regras de variação

Ao menos quatro famílias de composição devem existir em Kether:

1. **Scroll ritual cinematográfico** — texto e prática fundidos verticalmente.
2. **Focus mode** — tela limpa, quase sem UI, para timer/Trataka/quietude.
3. **Instrument mode** — espectro, áudio, mapa corporal, métricas.
4. **Portal / ceremony mode** — sequência full-screen sem navegação lateral dominante.

---

## 9. DIA 001 — VERTICAL SLICE DE REFERÊNCIA

O Dia 001 será o laboratório de qualidade para o capítulo inteiro.

### 9.1. Fluxo

1. **Threshold** — Kether quase apagado; uma centelha branca responde ao toque.
2. **Canon reveal** — título, Vehuiah, O Louco, Fehu, Hexagrama 1, tracks e XP carregados do Supabase.
3. **Jachin** — leitura progressiva com key art de Kether e controle de ritmo.
4. **Practice** — visualização/foco conforme Markdown canônico; timer e saída sempre visíveis discretamente.
5. **Boaz** — perguntas de contraste e limite derivadas do conteúdo canônico, sem reescrever o texto.
6. **Middle** — criação/registro do contrato de prática e baseline pessoal.
7. **Evidence** — `focus`, `silence`, `comfort`, observação curta.
8. **Seal** — +150 XP canônico; primeira centelha da Coroa.
9. **Teaser** — Dia 002 aparece como silhueta, sem revelar todo o conteúdo.

### 9.2. Critérios de aceite

- nenhum placeholder editorial;
- dados do Dia vêm do Supabase/cânone;
- experiência funciona offline após preload;
- nenhuma chave de serviço no cliente;
- Diário livre é criptografado antes do sync;
- XP não pode ser duplicado por repetir/recarregar a conclusão;
- áudio possui volume inicial conservador e stop imediato;
- usuário consegue abandonar a sessão sem perder orientação;
- animação respeita `Reduce Motion`;
- tela pequena não perde CTA nem conteúdo;
- Asset Registry contém todos os assets exibidos.

---

## 10. PORTAL 036 — BOSS / EXAME DE INTEGRAÇÃO

O Dia 36 não é uma página comum. É uma composição de competências acumuladas.

### Sequência proposta

`Entrada → Revisão da Coroa → Sintonizador → Indução → Foco/Silêncio → Signo-Sinal → Sigilo/identidade de Kether → Revisão do Diário → Autoavaliação → Retorno Completo → Portal`

### Gating mínimo recomendado

- Dias 1–35 em `COMPLETE`;
- sete Fragmentos da Coroa acesos;
- Diário disponível e desbloqueável no dispositivo;
- sessão do Portal concluída com retorno/orientação registrados;
- nenhuma exigência de “visão”, “energia”, transe profundo ou outro fenômeno subjetivo específico.

### Recompensa

- +500 XP canônico;
- `initiatory_grade: 1 → 2`;
- título `Neófito → Iniciado`;
- Kether `COMPLETE`;
- Chokmah `UNLOCKED`;
- transição visual **O Louco → O Mago**;
- transição rúnica **Fehu → Uruz**.

---

## 11. ASSET REQUIREMENTS DERIVADOS DA EXPERIÊNCIA

Além do inventário já existente, a Matrix identifica classes funcionais que a Asset Factory deve suportar:

### Fundacionais

- Kether key art;
- Atziluth/Kether background;
- Kether node locked/active/complete;
- Coroa com estados 0/7 a 7/7;
- O Louco / Fehu / Hexagrama 1 em linguagem HNK própria;
- Portal Kether→Chokmah;
- transição Louco→Mago e Fehu→Uruz.

### Ciclos

Para cada ciclo: `emblem`, `background/accent`, `seal animation`, `thumbnail treatment`.

### Instrumentos

- focus orb;
- countdown numerals;
- body resonance map;
- spectrum grid;
- breath column;
- approved Dai Koo Myo asset;
- Gneo Geo diagram;
- gesture anchor iconography;
- concentric-circle ritual diagram.

Nenhum símbolo tradicional sensível deve ser redesenhado por um gerador de imagem sem referência aprovada.

---

## 12. ANALYTICS — O QUE MEDIR SEM INVADIR O DIÁRIO

Permitido/útil:

- início/conclusão/interrupção;
- duração;
- componente utilizado;
- erro técnico;
- áudio iniciado/parado;
- faixa de rating estruturado quando consentido;
- conclusão de ciclo/Portal.

Não enviar para analytics:

- texto do diário;
- transcrição de voz;
- conteúdo de oração;
- imagens privadas;
- interpretações espirituais pessoais;
- conteúdo descriptografado do Vault.

---

## 13. ORDEM DE IMPLEMENTAÇÃO DERIVADA

### KX-1 — Vertical Slice
Dia 001 completo: Today → leitura → prática → registro → XP → Coroa.

### KX-2 — Núcleo reutilizável
Timer, Focus Mode, Structured Journal, XP idempotente, states do dia.

### KX-3 — Vehuiah 1–5
Primeiro ciclo totalmente jogável + Fragmento I.

### KX-4 — Instrumentos avançados
Voice/Spectrum, Audio Synth, Camera Overlay fallback, Spatial Visualizer.

### KX-5 — Ciclos 2–7
Jeliel → Achaiah com QA por ciclo.

### KX-6 — Portal 036
Boss sequence + promoção de Grau + unlock de Chokmah.

### KX-7 — Kether RC1
36/36 navegáveis, assets publicados, métricas, offline, acessibilidade, segurança e CI verdes.

---

## 14. DEFINITION OF DONE — KETHER EXPERIENCE

Kether só está completo quando:

- [ ] 36 dias canônicos renderizam sem placeholder;
- [ ] cada Dia possui interaction spec e evidence spec;
- [ ] 7 ciclos possuem identidade e selo;
- [ ] Coroa progride de 0/7 a 7/7;
- [ ] XP é idempotente;
- [ ] Grau não muda antes do Portal 036;
- [ ] diário livre permanece zero-knowledge;
- [ ] áudio e sessões podem ser interrompidos imediatamente;
- [ ] assets exibidos estão `approved/published` no registry;
- [ ] Portal 036 promove Neófito → Iniciado;
- [ ] Chokmah permanece bloqueado antes do Portal;
- [ ] Expo, Web e HNK Studio refletem o mesmo estado;
- [ ] testes mobile/desktop e CI passam;
- [ ] nenhum fenômeno espiritual subjetivo é usado como requisito obrigatório de sucesso do software.

---

## 15. PRÓXIMO DOCUMENTO

`HNK_KETHER_DAY_001_VERTICAL_SLICE_SPEC.md`

Ele deve transformar o Dia 001 desta Matrix em especificação de tela por tela, estados, componentes, transições, dados Supabase, eventos de XP, journal schema, assets, áudio, acessibilidade e critérios de QA.
