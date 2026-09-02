-- Kether sync baseline.
-- Replace the commit SHA before each privileged run.
select *
from hnk_private.sync_codex_range(
  1,
  36,
  'eeb1be4ff704e2bd4cd598e4d5bc2bc449a26c83'
);
