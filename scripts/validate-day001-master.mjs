import { existsSync, readFileSync } from 'node:fs';

const required = [
  'apps/mobile/package.json',
  'apps/mobile/src/features/kether/Day001MasterVerticalSlice.tsx',
  'apps/mobile/src/features/kether/Day001LiveVerticalSlice.tsx',
  'apps/web/app/day-001/Day001WebExperience.tsx',
  'apps/web/app/day-001/day001.module.css',
  'apps/web/app/day-001/day001-review.module.css',
  'apps/web/app/day-001/page.tsx',
  'docs/experience/kether/HNK_KETHER_FREEZE_V1.md',
];

const missing = required.filter((path) => !existsSync(path));
if (missing.length) {
  console.error('Missing Day 001 master vertical-slice files:');
  for (const path of missing) console.error(`- ${path}`);
  process.exit(1);
}

const mobilePackage = readFileSync('apps/mobile/package.json', 'utf8');
const mobileMaster = readFileSync('apps/mobile/src/features/kether/Day001MasterVerticalSlice.tsx', 'utf8');
const mobileAlias = readFileSync('apps/mobile/src/features/kether/Day001LiveVerticalSlice.tsx', 'utf8');
const webMaster = readFileSync('apps/web/app/day-001/Day001WebExperience.tsx', 'utf8');
const webCss = readFileSync('apps/web/app/day-001/day001.module.css', 'utf8');
const webReviewCss = readFileSync('apps/web/app/day-001/day001-review.module.css', 'utf8');
const webPage = readFileSync('apps/web/app/day-001/page.tsx', 'utf8');
const freeze = readFileSync('docs/experience/kether/HNK_KETHER_FREEZE_V1.md', 'utf8');

const frozenScenes = [
  'void',
  'touch',
  'geometry',
  'crown',
  'leap',
  'crossing',
  'chamber',
  'reveal',
  'manuscript',
  'relic',
  'kavanah',
  'intention',
  'contract',
  'seal',
  'mirror',
  'quest',
  'reward',
  'tree',
  'passage',
  'atrium',
];

function scenesInOrder(source) {
  let cursor = -1;
  for (const scene of frozenScenes) {
    const next = source.indexOf(`'${scene}'`, cursor + 1);
    if (next < 0) return false;
    cursor = next;
  }
  return true;
}

const invariants = [
  ['Freeze contains approved Day 001 sequence', freeze.includes('vazio') && freeze.includes('Relic Moment') && freeze.includes('Átrio transformado')],
  ['Mobile consumes @hnk/ui', mobilePackage.includes('"@hnk/ui": "workspace:*"')],
  ['Mobile master imports shared tokens', mobileMaster.includes("from '@hnk/ui'")],
  ['Mobile scene order follows freeze', scenesInOrder(mobileMaster)],
  ['Mobile alias routes existing runtime to master slice', mobileAlias.includes('Day001MasterVerticalSlice as Day001LiveVerticalSlice')],
  ['Mobile preserves real practice session write', mobileMaster.includes('startPracticeSession')],
  ['Mobile preserves encrypted Vault write', mobileMaster.includes('saveEncryptedVaultEntry') && mobileMaster.includes('encryptVaultText')],
  ['Mobile preserves practice record write', mobileMaster.includes('savePracticeRecord')],
  ['Mobile preserves idempotent completion path', mobileMaster.includes('completeCodexDay')],
  ['Mobile carries reduced-motion state', mobileMaster.includes('reduceMotionChanged') && mobileMaster.includes('ketherTokens.motion') === false],
  ['Mobile does not resolve pending audio by inference', mobileMaster.includes('PRESET PENDING')],
  ['Mobile explicitly protects canonical sigil boundary', mobileMaster.includes('não é o sigilo canônico de Kether')],
  ['Mobile preserves Day 005 Fragment boundary', mobileMaster.includes('Dia 005')],
  ['Web master follows frozen scene order', scenesInOrder(webMaster)],
  ['Web master activates scoped Kether theme', webMaster.includes('data-hnk-theme="kether"')],
  ['Web exposes scene identity for art-direction states', webMaster.includes('data-scene={scene.key}')],
  ['Web route renders Day 001 master', webPage.includes('<Day001WebExperience />')],
  ['Web proof labels local state truthfully', webMaster.includes('WEB PROOF · LOCAL STATE')],
  ['Web does not silently claim canonical manuscript copy', webMaster.includes('CANON COPY NOT DUPLICATED')],
  ['Web keeps audio unresolved', webMaster.includes('PRESET_PENDING')],
  ['Web CSS consumes semantic void token', webCss.includes('var(--hnk-kether-void)')],
  ['Web CSS consumes material gold token', webCss.includes('var(--hnk-kether-gold-material)')],
  ['Web CSS consumes sacred display role', webCss.includes('var(--hnk-font-sacred-display)')],
  ['Web CSS consumes editorial body role', webCss.includes('var(--hnk-font-editorial-body)')],
  ['Web CSS consumes system role', webCss.includes('var(--hnk-font-system)')],
  ['Web CSS consumes frozen rhythm', webCss.includes('var(--hnk-rhythm-72)')],
  ['Web CSS has mobile breakpoint', webCss.includes('@media (max-width: 640px)')],
  ['Web CSS has reduced-motion behavior', webCss.includes('@media (prefers-reduced-motion: reduce)')],
  ['Visual Review V1 keeps Relic as 12-column editorial composition', webReviewCss.includes('grid-template-columns: repeat(12') && webReviewCss.includes('.relicScene')],
  ['Visual Review V1 elevates transformed Atrium independently', webReviewCss.includes('.atriumScene') && webReviewCss.includes('.treeStage')],
  ['Visual Review V1 preserves mobile-specific composition', webReviewCss.includes('@media (max-width: 640px)')],
  ['Visual Review V1 does not add image or external sacred-symbol dependency', !webReviewCss.includes('url(') && !webMaster.includes('<img')],
];

const failed = invariants.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('HNK Day 001 master vertical-slice validation failed:');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`HNK Day 001 master vertical slice: valid (${invariants.length} invariants)`);
