# HNK KETHER — QA EXECUTABLE SPECS INDEX

**Status:** P0 QA design baseline complete  
**Scope:** Kether Days 001–036 / pre-RC1

This directory turns the approved Kether Acceptance & QA Matrix into implementation-ready test contracts.

## Core QA contract

- `../HNK_KETHER_ACCEPTANCE_QA_MATRIX.md` — stable QA IDs, severity, coverage and RC1 gates.

## P0 executable layers

### 1. Database / RLS / RPC / idempotency

`HNK_KETHER_P0_DB_EXECUTABLE_SPEC.md`

Covers:

- `PRC-001/002` ownership/RLS;
- `DAY-002/005/006/008` sequence/evidence/completion;
- `XP-001..006` direct-write protection and idempotency;
- `CRW-001/009/010` derived Crown and Portal gate;
- `P36-001/002/012/013/014/015/018` backend Portal invariants.

Important known RED gate:

`P36-012` — current backend does not yet validate the complete structural Portal evidence schema. This test must not be waived for RC1.

### 2. Offline / sync / multi-device

`HNK_KETHER_P0_SYNC_OFFLINE_EXECUTABLE_SPEC.md`

Covers:

- `OFF-002` server decides first completion vs already complete;
- `OFF-003` two-device conflict cannot duplicate XP/completion;
- `OFF-006` offline Portal remains `PROMOTION_PENDING_SYNC`;
- stable `client_session_id` retry behavior;
- stale local XP/Crown never overwrites server truth;
- unsynced evidence is preserved through recoverable failures.

### 3. Portal 036 E2E

`HNK_KETHER_P0_PORTAL_E2E_EXECUTABLE_SPEC.md`

Covers:

- 34/35 locked;
- 35/35 Crown 7/7 while still Neófito;
- Portal Condition A and Return Gate A;
- base Condition B and Return Gate B;
- read-only review of Days 001–035;
- structural Portal evidence;
- safety blocking state;
- +500 XP exactly once;
- atomic Neófito → Iniciado ceremony after backend confirmation;
- retry/concurrency;
- offline pending promotion;
- reduced-motion parity;
- Chokmah unlocked without auto-starting Day 037.

## Implementation order

```text
DB/RLS baseline
      ↓
sequence + evidence
      ↓
XP/idempotency
      ↓
Crown/Portal gate
      ↓
Portal structural validator
      ↓
P36-012 RED → GREEN
      ↓
offline/sync reconciliation
      ↓
Portal web/mobile E2E
      ↓
full P0 CI gate
      ↓
Kether RC1 eligibility
```

## CI rule

A P0 regression must fail CI. A release candidate cannot be declared while any P0 acceptance test is failing or skipped as a workaround.

## Production boundary

These documents define QA behavior. They do not authorize the Experience Lab to invent unresolved canonical assets, audio presets, symbols or ritual operators.

Portal 036 production remains dependent on approved canonical references for:

- Sintonizador Angelical;
- Solfeggio de transição;
- sigilo de Kether.
