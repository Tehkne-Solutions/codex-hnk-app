-- HNK Board Factory V1
-- Idempotent registration of structured board artifacts.
-- A structured board is code + documentation; storage_path remains NULL until a real raster/vector export exists.

insert into public.asset_registry (
  asset_key,
  scope,
  scope_id,
  slot,
  kind,
  storage_path,
  approval_state,
  asset_version,
  license,
  metadata
)
values (
  'kether-chapter-overview-v1',
  'chapter',
  'kether',
  'chapter-overview-board',
  'ui',
  null,
  'draft',
  1,
  'project-generated',
  jsonb_build_object(
    'board_family', 'chapter-overview',
    'board_lifecycle', 'structured',
    'schema_version', '1.0',
    'design_direction', 'HNK SACRED EDITORIAL FANTASY',
    'board_doc', 'assets/boards/chapter/kether/v1/README.md',
    'board_code', 'packages/assets/src/boards/kether-chapter-overview.ts',
    'board_img_planned', 'assets/boards/chapter/kether/v1/kether-chapter-overview.webp',
    'renderer', 'apps/web/app/boards/_components/HnkBoardRenderer.tsx',
    'render_targets', jsonb_build_array('print-landscape', 'desktop', 'tablet', 'mobile-390', 'thumbnail'),
    'source_repository', 'Tehkne-Solutions/hnk-codex-365',
    'source_scope', 'canon/capitulo-01-kether',
    'note', 'Structured Board as Data artifact. No image export is claimed until storage_path/checksum are populated.'
  )
)
on conflict (asset_key) do nothing;
