# Kether Chapter Overview — Board V1

Asset key: `kether-chapter-overview-v1`

Lifecycle: **structured**

Family: `chapter-overview`

Scope: `chapter / kether`

## Purpose

This board is the editorial overview surface for Chapter 1 — Kether, Days 1–36. It is designed to exist simultaneously as:

- a premium digital magazine/grimoire spread;
- a responsive coded board in the HNK platform;
- an exported lossless `board-img` master;
- a PDF document generated from the same coded source.

It is intentionally distinct from `kether-key-art`.

## Visual direction

Use `HNK SACRED EDITORIAL FANTASY` with dense editorial hierarchy rather than generic dashboard grammar.

Kether-specific material language:

- deep fertile black;
- intense white origin light;
- restrained gold as material/authority;
- blue only when canonically/contextually required;
- sacred geometry as structure, not ornament;
- minimal particle use;
- strong negative space around the crown/origin hierarchy.

## Information architecture

The code representation carries:

1. chapter identity and range;
2. Sephira / World / Level / Attribute focus;
3. chapter thesis;
4. seven five-day cycles;
5. Day 036 portal to Chokmah;
6. source/provenance references;
7. responsive render targets.

The final visual export may compress or regroup these fields, but may not invent new doctrine, sacred names, correspondences or factual chapter metadata.

## Render outputs

Lossless image master:

`assets/boards/chapter/kether/v1/kether-chapter-overview.png`

Document export:

`assets/boards/chapter/kether/v1/kether-chapter-overview.pdf`

Export manifest with dimensions and SHA-256 checksums:

`assets/boards/chapter/kether/v1/export-manifest.json`

Code source:

`packages/assets/src/boards/kether-chapter-overview.ts`

Document source:

`assets/boards/chapter/kether/v1/README.md`

Renderer:

`apps/web/app/boards/_components/HnkBoardRenderer.tsx`

Export command:

`pnpm export:board -- --id kether-chapter-overview-v1 --route /boards/kether --out assets/boards/chapter/kether/v1`

The export command expects the web app to be available at `HNK_BOARD_BASE_URL` (default `http://127.0.0.1:3000`). The GitHub Actions Board Export workflow builds/starts the app and runs this command automatically.

## Approval rule

The board remains `structured` until an actual rendered composition is reviewed. A render becoming available advances the artifact to `rendered`; it does not make it `approved` or `published` automatically.
