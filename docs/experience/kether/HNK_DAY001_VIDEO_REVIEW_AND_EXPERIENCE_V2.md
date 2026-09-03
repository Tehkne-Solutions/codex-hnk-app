# HNK DAY 001 — VIDEO REVIEW + EXPERIENCE V2

**Status:** IMPLEMENTATION CORRECTION IN PROGRESS  
**Trigger:** user visual review of the first Day 001 test video  
**Decision:** state-machine engineering retained; slideshow-like experience layer rejected

## 1. Finding

The first recorded proof rendered the internal twenty-movement state grammar as twenty user-facing screens dominated by:

`eyebrow → title → short body → continue`

This produced a storyboard/click-through effect instead of the frozen Kether experience direction.

The issue is not that short contemplative copy is forbidden. A single sentence can be powerful inside a ritual or focus state. The failure was using the same low-density composition as the primary content pattern across the whole journey.

## 2. Why the proof failed the product direction

The frozen Kether contract says:

- the user must feel they are entering the Codex, not opening a lesson;
- the experience movements are grammar, not a mechanical screen template;
- structure remains rigid underneath while experience remains alive above;
- Day 001 must prove manuscript, practice, ritual visual, evidence, Vault boundary, progress and transformation;
- a Relic Moment must be experiential rather than a text label saying that a relic exists.

The test proof violated that intent by replacing several experiences with statements about those experiences.

Examples of the failure mode:

- instead of showing/reading the manuscript, a scene explained that the manuscript should exist;
- instead of living the practice, a scene announced “Prática guiada”;
- instead of a distraction interaction, the experience mostly advanced through copy;
- instead of spatial transformation, visual grammar remained nearly constant;
- the video contained no audio track, so atmosphere and sonic pacing were absent;
- the visible `01 / 20` counter exposed implementation states as if they were lesson slides.

## 3. Decision

Keep:

- canonical data flow;
- authenticated runtime;
- Practice Session contract;
- Vault boundary;
- idempotent XP architecture;
- state-machine concepts;
- HNK semantic tokens;
- reduced-motion rules;
- unresolved canonical audio/reference boundaries.

Reject as final experience:

- twenty visible slide-like scenes;
- repetitive `CONTINUAR` pacing;
- one sentence as the dominant educational unit;
- identical composition for revelation, manuscript, ritual, laboratory and reward;
- screen counter exposing `01/20` as primary progress language.

## 4. Experience V2 — six visible macroacts

The twenty internal movements are collapsed into six experiential fields:

1. **Limiar** — void, first response, Kether metadata and crossing;
2. **Revelação** — O Louco, Fehu and Hexagrama 1 as explorable symbolic keys;
3. **Jachin / Expansão** — canonical manuscript + margin notes + ten-minute Kavanah chamber;
4. **Boaz / Restrição** — canonical manuscript + five-minute practice + three-distraction laboratory;
5. **Pilar do Meio / Convergência** — canonical integration + optional voice practice + intention + Mirror + voluntary contract;
6. **Selo / Passagem** — evidence rehearsal + Tree of Life + first spark + canonical reward preview.

These are user-facing macroacts. Internal state may remain more granular.

## 5. Educational rule

Every Day must change the form of knowledge during the journey:

`learn → see → manipulate → practice → observe → record → integrate → apply → progress`

A mystical interface without learning is decoration.
A textbook without transformation is a PDF.
A game without canonical depth is a generic RPG.

HNK must combine the three.

## 6. Canon rule

Experience V2 consumes the synchronized `raw_markdown` when the hosted runtime is live.

For Web proof/offline rendering, Day 001 may carry an explicitly labeled educational fallback snapshot derived from the canonical Day 001 source. The fallback is not the editorial source of truth and must never silently diverge from the canonical repository.

Dai Koo Myo visual reference remains pending. The V2 interface names the operator because it is in the canonical text, but does not invent a visual master.

Audio remains `PRESET_PENDING`. No 528/432/Theta choice is made silently by the experience layer.

## 7. Safety / epistemology

Product safety may contextualize the canonical practice without rewriting the manuscript:

- user can pause, reposition, open eyes or stop;
- discomfort is not a success condition;
- no XP bonus for intensity or altered-state claims;
- symbolic/traditional/phenomenological content is not silently promoted to biomedical fact;
- microphone is optional;
- no automatic recording/upload;
- proof-web private fields remain memory-only until the approved E2EE Vault boundary is active.

## 8. Video regression gate

A future Day 001 video fails review if a viewer can accurately summarize the interaction as:

> “I kept clicking Continue to see another sentence.”

A passing proof should visibly demonstrate at minimum:

- a threshold with response to action;
- an educational symbolic interaction;
- real manuscript reading density;
- a timed contemplative practice;
- a distinct Boaz field;
- manipulation/entry of three distractions;
- optional vocal practice;
- intention + Mirror interaction;
- transformation of the Tree/progress state;
- materially different visual fields across the journey.

## 9. Implementation artifacts

V2 is implemented through:

- `apps/web/app/day-001/Day001ImmersiveExperience.tsx`
- `apps/web/app/day-001/day001-immersive.module.css`
- updated `apps/web/app/day-001/page.tsx`
- updated `scripts/validate-day001-master.mjs`

The legacy `Day001WebExperience.tsx` remains temporarily in the repository as a comparison/proof artifact but is no longer the routed Day 001 experience.
