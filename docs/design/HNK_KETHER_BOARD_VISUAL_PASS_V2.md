# HNK Kether Board — Visual Pass V2

Status: **RENDERED / QA PASS / ART-DIRECTION REVIEW PENDING**

Board: `kether-chapter-overview-v1`

Direction: **HNK SACRED EDITORIAL FANTASY**

## Purpose

This pass removes the generic dashboard/card-grid grammar from the Kether chapter overview while preserving the existing Board as Data contract, canonical content boundaries, accessibility hooks and deterministic export pipeline.

The implementation follows the frozen Kether principles in `docs/HNK_VISUAL_BIBLE.md` and `docs/experience/kether/HNK_KETHER_FREEZE_V1.md`:

- fertile black / origin light;
- gold as restrained material and authority;
- primordial geometry as structure;
- editorial asymmetry over an invisible rigid grid;
- three functional typographic voices;
- Kether as emanation rather than generic UI transition;
- no invented sacred names, Hebrew, sigils or angel figures.

## V2 composition

### Origin field

The hero is now a cosmogonic field rather than a conventional app header. It uses a vertical origin axis, concentric rings, a white origin point and restrained gold geometry.

### Chapter metadata

The five chapter facts are rendered as inscriptions in a horizontal/stacked constellation rather than independent SaaS cards.

### Editorial field

The chapter thesis, experience grammar and RPG progression use a 12-column asymmetrical editorial composition. On narrow screens they collapse into a linear manuscript flow.

### Seven cycles

The seven Kether cycles are represented as an emanation path with a central line and seven nodes. Desktop alternates the cycle copy around the axis; mobile preserves a single readable vertical path.

### Portal 036

The final portal is a full-width threshold composition with only approved primordial geometry: square/diamond, circle, axes and origin light. It does not introduce a canonical sigil.

## Automated QA evidence

Final verified GitHub Actions run:

- workflow: `HNK Board Export`
- run id: `33762498497`
- artifact id: `9896105507`
- artifact digest: `sha256:148123b4329ec3fa6b8b7285ed9854dd1abe89af37a6b634658145c830a5516b`

Desktop proof:

- viewport: `1600 × 1200`
- board: `1440 × 5207`
- PNG SHA-256: `f846a7c97974364729f0371c82773b02b1d86050314bb7a08a8473d03504dfc1`

Mobile proof:

- viewport: `390 × 844`
- board: `390 × 5949`
- PNG SHA-256: `b03037b704f01989d8452d837c71132349273ef2d21712371e7cd32a17256c26`

PDF proof:

- PDF SHA-256 for the final packaged run: `d12a60a9ebac44ce78fc4ed37eec1d34284eee67d903670c8521d8a45bc68f40`

The final artifact contains desktop PNG, mobile-390 PNG, PDF, export manifest and board README.

## Registry state

The Supabase `asset_registry` entry remains:

- `approval_state = generated`;
- lifecycle metadata = `rendered`;
- `storage_path = NULL`;
- QA = desktop and mobile render pass;
- art-direction review still required before `approved` or `published`.

This is deliberate. A successful render is not equivalent to visual approval.

## Next production move

Do not create another one-off visual language for Day 001.

The V2 language must now be tokenized into reusable Kether primitives:

1. atmosphere / surface tokens;
2. material-gold tokens;
3. origin-light tokens;
4. sacred display / editorial body / system voice roles;
5. spacing rhythm based on the frozen 3/6/12/24/36/72 structure;
6. geometry primitives for origin, node, ring, axis and threshold;
7. reduced-motion behavior.

Only after those primitives exist should Day 001 become the master vertical-slice screen.
