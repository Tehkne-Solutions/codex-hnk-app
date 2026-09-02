# HNK Codex Sync

## Source of truth

The canonical editorial source remains:

- Repository: `Tehkne-Solutions/hnk-codex-365`
- Branch: `main`
- Chapter 1 directory: `canon/capitulo-01-kether`

The application database is a synchronized projection, never the editorial source of truth.

## Current Kether sync

The private database function `hnk_private.sync_codex_range(start_day, end_day, source_commit_sha)` fetches the canonical raw Markdown directly from GitHub, parses required frontmatter, calculates the Git blob SHA from the raw bytes, and upserts `public.codex_days`.

For each day the database preserves:

- canonical day/chapter/sephira/world/angel/level/XP
- tracks
- editorial version and epistemic protocol when declared
- canonical H1 as the database title
- source path
- calculated Git blob SHA
- complete raw Markdown in `content.raw_markdown`
- raw frontmatter in `content.frontmatter`
- source URL and source commit SHA

If a legacy canonical page does not declare `epistemic_protocol`, the projection stores `not-declared`; the sync must not invent metadata that is absent from the source.

## Integrity rules

A sync fails when:

1. the GitHub raw request is not HTTP 200;
2. requested day and frontmatter day differ;
3. required canonical metadata is absent.

The Git blob SHA is calculated as Git does:

`SHA1("blob " + byte_length + NUL + raw_bytes)`

This permits byte-level verification against GitHub without a second content transformation.

## Kether baseline

The first platform import used canonical source commit:

`eeb1be4ff704e2bd4cd598e4d5bc2bc449a26c83`

It projected days 1–36. Validation required:

- 36 rows
- 36 distinct days
- min day 1 / max day 36
- zero missing days
- zero non-canon rows
- zero invalid SHA values
- zero missing raw Markdown
- all rows in chapter 1 / Kether

## Operational invocation

Run with a privileged database connection only:

```sql
select *
from hnk_private.sync_codex_range(
  1,
  36,
  '<CURRENT_HNK_CODEX_MAIN_COMMIT_SHA>'
);
```

Do not grant this function to `anon` or `authenticated`. It is an infrastructure synchronizer, not an application RPC.

## Future chapters

The current URL adapter is deliberately scoped to `capitulo-01-kether`, because only Chapter 1 is part of the current MVP dataset. Before importing Chokmah, extend the source-path resolver from canonical repository structure rather than guessing future directory names.
