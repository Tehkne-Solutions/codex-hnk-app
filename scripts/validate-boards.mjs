import { existsSync, readFileSync } from 'node:fs';

const required = [
  'docs/design/HNK_BOARD_ARTIFACT_SYSTEM_V1.md',
  'packages/assets/src/board.ts',
  'packages/assets/src/catalog.ts',
  'packages/assets/src/boards/kether-chapter-overview.ts',
  'assets/boards/chapter/kether/v1/README.md',
  'apps/web/app/boards/_components/HnkBoardRenderer.tsx',
  'apps/web/app/boards/_components/board-renderer.module.css',
  'apps/web/app/boards/kether/page.tsx',
];

const missing = required.filter((path) => !existsSync(path));
if (missing.length) {
  console.error('Missing required Board Factory files:');
  for (const path of missing) console.error(`- ${path}`);
  process.exit(1);
}

const systemDoc = readFileSync('docs/design/HNK_BOARD_ARTIFACT_SYSTEM_V1.md', 'utf8');
const boardSource = readFileSync('packages/assets/src/boards/kether-chapter-overview.ts', 'utf8');
const catalogSource = readFileSync('packages/assets/src/catalog.ts', 'utf8');
const rendererSource = readFileSync('apps/web/app/boards/_components/HnkBoardRenderer.tsx', 'utf8');

const invariants = [
  ['Board as Data decision', systemDoc.includes('Board as Data')],
  ['chapter-overview family', systemDoc.includes('chapter-overview')],
  ['stable Kether board id', boardSource.includes('kether-chapter-overview-v1')],
  ['structured lifecycle', boardSource.includes("lifecycle: 'structured'")],
  ['board-img output', boardSource.includes("kind: 'board-img'")],
  ['board-doc output', boardSource.includes("kind: 'board-doc'")],
  ['board-code output', boardSource.includes("kind: 'board-code'")],
  ['mobile-390 target', boardSource.includes("'mobile-390'")],
  ['catalog contract assertion', catalogSource.includes('assertBoardContract')],
  ['renderer consumes HnkBoard', rendererSource.includes('board: HnkBoard')],
  ['renderer exposes accessibility alt', rendererSource.includes('board.accessibility.alt')],
];

const failed = invariants.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('Board Factory invariant validation failed:');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log('HNK Board Factory V1: valid');
