# HNK KETHER — CICLO I VEHUIAH · IMPLEMENTATION STATUS

**Status:** implementation candidate V1  
**Scope:** Dias 001–005  
**Depends on:** `HNK_KETHER_CYCLE_01_VEHUIAH_SPEC.md`, `HNK_KETHER_FREEZE_V1.md`  
**Canonical source:** `Tehkne-Solutions/hnk-codex-365`

> Este documento registra o estado de implementação. Não substitui o conteúdo canônico nem altera a Experience Spec.

## 1. CORREÇÃO DE STATUS EDITORIAL

A seção 11 da Experience Spec original registra uma discrepância histórica de XP nos textos dos Dias 002, 003 e 005.

Essa pendência **já foi resolvida no repositório canônico** durante o Kether Canon Freeze:

- Dia 001: +150 XP;
- Dia 002: +100 XP;
- Dia 003: +100 XP;
- Dia 004: +100 XP;
- Dia 005: +100 XP.

Total operacional/canônico do Ciclo I: **550 XP**.

A plataforma continua usando `codex_days.xp` como autoridade de recompensa. Não existe correção de Markdown em runtime.

## 2. IMPLEMENTAÇÃO ATUAL

### Day 001 — Entrar
Implementado e mergeado anteriormente como circuito autenticado:

`Átrio → Auth → Practice Session → Vault cifrado → Practice Record → complete_codex_day → XP`

### Day 002 — Permanecer
Candidate V1:
- Stillness Timer 15 min;
- tempo efetivo, nunca `900` falsificado;
- contador de impulsos percebidos;
- contador de ajustes reais de postura;
- conforto 0–10;
- quietude 0–10;
- integração temporizada;
- reflexão cifrada no Vault;
- safety layer explícito: dor/dormência/tontura/necessidade real de ajuste não são falha.

### Day 003 — Observar
Candidate V1:
- Thought Stream 10 min;
- marcador de envolvimento com pensamentos;
- Belief Audit com três textos cifrados;
- Practice Record recebe apenas `beliefs_logged_count`;
- complaint-fast 24h registrado apenas como booleano de início;
- integração temporizada;
- reflexão cifrada.

### Day 004 — Reconfigurar
Candidate V1:
- Mantle Visualization 10 min;
- Cancel Marker 10 min;
- contador de `cancel`;
- gatilho privado cifrado;
- Swish em três estágios: pequeno/escuro → deslocamento → grande/luminoso;
- HNK-EP layer impede converter linguagem bioquímica/quântica do texto em alegação clínica da plataforma.

### Day 005 — Delimitar
Candidate V1:
- Porous Breath Pacer 10 min;
- orientação Leste e sequência de gestos somente com elementos suportados pelo texto-fonte;
- nenhuma cardinalidade adicional inventada;
- nenhuma câmera julgando gesto no MVP;
- Closing Sphere 5 min;
- journal cifrado;
- conclusão consulta estado de Coroa vindo do servidor.

## 3. PROGRESSÃO

O roteador lê `user_progress.current_day` sob RLS.

Modo real:
- não permite escolher um Dia futuro no trilho;
- `complete_codex_day` continua autoridade de sequência e XP;
- o Dia seguinte aparece somente depois do progresso confirmado;
- revisita não duplica XP.

Modo demonstração:
- Dias 001–005 podem ser escolhidos para QA visual;
- nenhum XP/progresso é persistido;
- UI identifica explicitamente o modo demo.

## 4. FRAGMENTO I

A UI não calcula o Fragmento I por conta própria.

Somente pode exibir `VEHUIAH ACESO` quando `get_kether_crown_state()` retorna para o ciclo 1:

```json
{
  "fragment": 1,
  "angel": "Vehuiah",
  "completed_days": 5,
  "lit": true
}
```

Existe teste automatizado para impedir `4/5 → lit`.

O fim de Vehuiah mantém:

`GRAU = NEÓFITO`

Jeliel / Dia 006 é insinuado, não iniciado automaticamente.

## 5. PRIVACIDADE

Invariant V1:
- texto de crenças, gatilhos, diário e reflexões → Vault AES-256-GCM;
- `practice_sessions.metrics/evidence` → apenas number/boolean/null;
- plaintext é limpo da state local após selo confirmado;
- analytics não recebe prose;
- web continua fail-closed para Vault enquanto a estratégia de recuperação/multi-device não estiver aprovada.

## 6. PENDÊNCIAS ANTES DE MARCAR CYCLE I RELEASED

- hosted Auth smoke test com usuário real;
- e-mail confirmation/deep-link de Auth definido;
- Vault recovery/multi-device (#12);
- presets de áudio do ciclo aprovados/versionados;
- Day 001 endurecido para não permitir evidência de duração zero em produção;
- assets fundacionais `approved/published`;
- QA mobile físico, reduced motion e offline;
- prova end-to-end real 001→005 em ambiente hospedado;
- Fragmento I 5/5 confirmado em sessão real.

## 7. GATE

Este ciclo pode entrar no `main` como **implementation candidate** quando:
- architecture/typecheck/tests/build verdes;
- Kether P0 DB acceptance verde;
- prova de concorrência verde;
- testes de roteamento e Fragmento I verdes.

Ele só vira **Cycle I Release V1** depois das pendências de produção da seção 6.
