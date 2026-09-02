# HNK Asset Registry V1

This document records the implemented database contract behind `HNK_ASSET_MANIFEST.md`.

## Scopes

Supported scopes:

- `global`
- `day`
- `chapter`
- `sephira`
- `cycle`
- `oracle`

`scope_id` identifies the concrete object within that scope, for example `kether`, `vehuiah`, `attribute:HIP`, or `036`.

## Lifecycle

Planning and production states:

`planned` → `generated` / `draft` → `review` → `approved` → `published`

Terminal/alternate states:

- `rejected`
- `retired`
- `archived`

Only `published` is eligible for the final user-facing production experience.

## Provenance and approval

The registry carries:

- `asset_version`
- `source_tool`
- `model_version`
- prompt and `prompt_ref`
- negative prompt
- reference assets
- seed when available
- SHA-256 checksum
- license
- approver and approval timestamp
- publication timestamp
- provider/editor metadata through `metadata`

## Kether Asset Set V1 baseline

The first production queue contains **101 planned assets**:

- 15 foundational Kether/global assets;
- 14 reusable cycle assets (emblem + background for Vehuiah, Jeliel, Sitael, Elemiah, Mahasiah, Lelahel and Achaiah);
- 72 mandatory daily assets: one thumbnail and one QR/deep-link asset for each day 1–36.

Heroes and exercise/ritual diagrams are intentionally not bulk-created. They are added only after canonical content review determines that they improve comprehension or experience.

No seeded asset is considered generated, approved or published merely because a registry row exists.
