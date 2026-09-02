# HNK KETHER — EXPERIENCE MASTER INDEX

**Status:** Experience Architecture 36/36 specified  
**Scope:** Chapter 1 — Kether  
**World:** Atziluth  
**Entry grade:** Level 1 — Neófito  
**Exit grade:** Level 2 — Iniciado, only after Portal 036  
**Canonical source of truth:** `Tehkne-Solutions/hnk-codex-365`

> This directory is the product/experience contract for Kether. It does not replace canonical Codex text. When a conflict exists, canonical content must be resolved in `hnk-codex-365`; the app must not silently rewrite the source.

---

## 1. WHAT IS COMPLETE HERE

The **Experience Design architecture for all 36 Kether days is specified**.

This does **not** mean Kether production is finished. Implementation, approved assets, audio, AR, Acoustic Lab, unresolved canonical references, QA and release work remain.

The experience layer now covers:

- Days 001–035 as seven five-day arcs;
- seven Crown fragments;
- Practice Record / evidence / revisit rules;
- XP versus Initiatory Grade separation;
- Day 001 vertical slice;
- Portal 036 boss / promotion contract;
- safety, privacy, accessibility and epistemic product rules.

---

## 2. CORE CONTRACTS

### Experience Matrix

`HNK_KETHER_EXPERIENCE_MATRIX.md`

Defines the 001–036 macro experience map, state model, mechanic library and day-level evidence intent.

### Practice & Progression

`HNK_KETHER_PRACTICE_AND_PROGRESSION_SPEC.md`

Defines:

- `practice_sessions`;
- canonical completion;
- revisits;
- idempotent XP;
- Crown derivation;
- Initiatory Grade separated from cumulative XP;
- Day 036 as the only Kether grade-promotion gate.

### Day 001 Vertical Slice

`HNK_KETHER_DAY_001_VERTICAL_SLICE_SPEC.md`

Defines the quality bar for the complete daily flow before scaling implementation across Kether.

### Portal 036

`HNK_KETHER_PORTAL_036_SPEC.md`

Defines the final boss / rite of passage:

`REUNIR → EXECUTAR → COMPARAR → REVISAR → TESTEMUNHAR → ATRAVESSAR`

---

## 3. SEVEN CYCLES

| Fragment | Days | Cycle | Experience arc | Operational XP |
|---|---:|---|---|---:|
| I | 001–005 | Vehuiah | `ENTRAR → PERMANECER → OBSERVAR → RECONFIGURAR → DELIMITAR` | 550 |
| II | 006–010 | Jeliel | `RUÍDO → ENTREGA → PROFUNDIDADE → MEMÓRIA → EVOCAÇÃO` | 650 |
| III | 011–015 | Sitael | `OBSERVAR → SUSTENTAR → CORRIGIR → DIRIGIR → RETORNAR` | 550 |
| IV | 016–020 | Elemiah | `PERCEBER → VOCALIZAR → RESSONAR → MEDIR → SILENCIAR` | 650 |
| V | 021–025 | Mahasiah | `CONDUZIR → TRAÇAR → COMPARAR → PERCORRER → ESTABELECER` | 700 |
| VI | 026–030 | Lelahel | `LOCALIZAR → ESTABILIZAR → NAVEGAR → TRANSMUTAR → MODULAR` | 750 |
| VII | 031–035 | Achaiah | `ENTREGAR → DESCER → AQUIETAR → ANCORAR → DELIMITAR` | 800 |
| Portal | 036 | Kether → Chokmah | `REUNIR → EXECUTAR → COMPARAR → REVISAR → TESTEMUNHAR → ATRAVESSAR` | 500 |

**Current operational total:** `5150 XP` based on canonical frontmatter currently consumed by the platform.

Open canonical XP-copy issues can change prose or, if explicitly decided, canonical frontmatter. The app must always follow the approved canonical metadata after resync.

### Cycle files

- `cycles/HNK_KETHER_CYCLE_01_VEHUIAH_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_02_JELIEL_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_03_SITAEL_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_04_ELEMIAH_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_05_MAHASIAH_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_06_LELAHEL_SPEC.md`
- `cycles/HNK_KETHER_CYCLE_07_ACHAIAH_SPEC.md`

---

## 4. CROWN / GRADE STATE MACHINE

```text
VEHUIAH 001–005   → Fragment I
JELIEL 006–010    → Fragment II
SITAEL 011–015    → Fragment III
ELEMIAH 016–020   → Fragment IV
MAHASIAH 021–025  → Fragment V
LELAHEL 026–030   → Fragment VI
ACHAIAH 031–035   → Fragment VII

           ↓

       COROA 7/7

           ↓

     PORTAL 036 AVAILABLE

           ↓

     DAY 036 COMPLETE

           ↓

NEÓFITO → INICIADO
```

Crown fragments are derived from canonical day completions. They are not a separate client-written currency.

---

## 5. GLOBAL EXPERIENCE RULES

### Completion

Normal day flow:

`LOCKED → AVAILABLE → ACTIVE → EVIDENCE_PENDING → COMPLETE`

A revisit creates another Practice Record but does not grant duplicate canonical XP or another Crown fragment.

### Active + Control

Where canonical content requires active/control comparison, both conditions form one canonical practice. Completing only half does not grant final day completion.

### Safety

Safety interruption is valid data. The platform never rewards:

- tolerating pain;
- ignoring breathing difficulty;
- remaining immobile through harmful discomfort;
- stronger mystical phenomena;
- loss of orientation;
- perceived invulnerability.

### Epistemic separation

The UI must preserve distinction among:

- E1 Instrumental;
- E2 Psychophysiological/Behavioral;
- E3 Phenomenological;
- E4 Traditional/Theurgic;
- E5 Theological.

A user-reported sensation is not silently converted into biomedical or spiritual proof.

### Privacy

Structured Practice Records contain minimal operational evidence. Sensitive free text belongs in the encrypted Journal Vault.

---

## 6. CURRENT APP-REPO IMPLEMENTATION BLOCKERS

Open work currently includes:

- **#1** Kether audio normalization — 528 Hz / 432 Hz / Theta / 52 Hz semantics;
- **#3** Day 019 local Acoustic Lab;
- **#4** Day 025 spatial AR altar field;
- **#5** Day 030 versioned ASMR active/control audio pair;
- **#6** Day 036 Portal boss + atomic Neófito → Iniciado promotion.

These are implementation/release blockers, not reasons to alter canonical text in the app.

---

## 7. CURRENT CANONICAL/EDITORIAL BLOCKERS

Open canonical work currently includes:

- **hnk-codex-365 #3** — Days 002/003/005 XP copy versus frontmatter;
- **#4** — Day 011 says “conclua o ciclo” before Sitael actually ends;
- **#8** — canonical Dai Koo Myo reference;
- **#11** — canonical Gneo Geo / Estrela Goética Dupla / eight circuits;
- **#12** — Day 035 “Pentagrama Primal” title versus circle/Tetragrammaton procedure;
- **#14** — Portal 036 Sintonizador Angelical / transition Solfeggio / Kether sigil definitions.

When any canonical issue changes a Day file:

1. preserve exact editorial validator rules;
2. rebuild canonical manuscript;
3. obtain green canonical CI;
4. resync Kether into Supabase;
5. update dependent experience/assets only after the canonical commit exists.

---

## 8. IMPLEMENTATION ORDER FOR PRODUCTION LAB

Recommended order:

```text
1. Core Day Shell + Practice Record
2. Day 001 Vertical Slice
3. Vehuiah 001–005
4. Jeliel 006–010
5. Sitael 011–015
6. Elemiah 016–020 + Acoustic Lab
7. Mahasiah 021–025 + symbol/AR dependencies
8. Lelahel 026–030 + Gneo Geo/ASMR dependencies
9. Achaiah 031–035
10. Crown 7/7 presentation
11. Portal 036
12. Full Kether QA / RC1
```

Do not wait for every late-cycle blocker before building the core shell and early cycles. Do not, however, ship placeholders as canonical assets.

---

## 9. KETHER EXPERIENCE DEFINITION OF DONE

Experience Architecture is considered designed when all 36 Days have a documented interaction/evidence/completion model. **That milestone is now reached.**

Kether Product Release is a different milestone and requires, at minimum:

- canonical blockers resolved where they affect executable content;
- all required assets approved/published;
- audio contracts resolved;
- real Acoustic Lab where required;
- real AR where required;
- Practice Record and canonical completion implemented;
- Crown state implemented;
- Portal promotion implemented;
- mobile + web paths tested;
- Vault/privacy tested;
- accessibility tested;
- offline/retry/idempotency tested;
- Supabase synced;
- CI/CD green;
- end-to-end run from onboarding/Kether entry through Portal 036.

---

## 10. BOUNDARY WITH CHOKMAH

This directory stops at the Kether → Chokmah threshold.

A successful Portal may unlock Chokmah in the product state, but **must not automatically begin or invent Day 037** while Chapter 2 production remains intentionally paused.

The final Kether product state is therefore:

```text
KETHER COMPLETE
LEVEL 2 — INICIADO
CHOKMAH UNLOCKED
DAY 037 NOT AUTO-STARTED
```
