import { existsSync, readFileSync } from 'node:fs';

const paths = {
  policy: 'docs/experience/HNK_EXPERIENCE_QA_GATE_V1.md',
  mobileAlias: 'apps/mobile/src/features/kether/Day001LiveVerticalSlice.tsx',
  mobile: 'apps/mobile/src/features/kether/Day001ImmersiveMobileVerticalSlice.tsx',
  mobileLegacy: 'apps/mobile/src/features/kether/Day001MasterVerticalSlice.tsx',
  webPage: 'apps/web/app/day-001/page.tsx',
  web: 'apps/web/app/day-001/Day001ImmersiveExperience.tsx',
};

const missing = Object.values(paths).filter((path) => !existsSync(path));
if (missing.length) {
  console.error('HNK Experience QA: required files missing');
  for (const path of missing) console.error(`- ${path}`);
  process.exit(1);
}

const policy = readFileSync(paths.policy, 'utf8');
const mobileAlias = readFileSync(paths.mobileAlias, 'utf8');
const mobile = readFileSync(paths.mobile, 'utf8');
const mobileLegacy = readFileSync(paths.mobileLegacy, 'utf8');
const webPage = readFileSync(paths.webPage, 'utf8');
const web = readFileSync(paths.web, 'utf8');

const acts = ['limiar', 'revelacao', 'jachin', 'boaz', 'meio', 'selo'];

function tokensInOrder(source, tokens) {
  let cursor = -1;
  for (const token of tokens) {
    const next = source.indexOf(`'${token}'`, cursor + 1);
    if (next < 0) return false;
    cursor = next;
  }
  return true;
}

const checks = [
  ['Policy freezes living-experience axiom', policy.includes('ESTRUTURA RÍGIDA POR BAIXO. EXPERIÊNCIA VIVA POR CIMA.')],
  ['Policy explicitly rejects slide-click-through', policy.includes('frase curta → botão CONTINUAR → nova frase curta')],
  ['Policy requires human video gate', policy.includes('Gate humano para vídeo/review')],

  ['Native active alias points to immersive V2', mobileAlias.includes('Day001ImmersiveMobileVerticalSlice as Day001LiveVerticalSlice')],
  ['Native active alias does not point to legacy 20-state component', !mobileAlias.includes('Day001MasterVerticalSlice as Day001LiveVerticalSlice')],
  ['Legacy component remains comparison-only', mobileLegacy.includes('const SCENES: Scene[]')],
  ['Native visible grammar is six macroacts', tokensInOrder(mobile, acts) && mobile.includes('Mapa ritual do Dia 001')],
  ['Native does not expose 20-screen counter', !mobile.includes('SCENES.length') && !mobile.includes('/ 20') && !mobile.includes('01 / 20')],
  ['Native has canonical educational matter', mobile.includes('day.jachinDoctrine') && mobile.includes('day.boazDoctrine') && mobile.includes('day.middleDoctrine')],
  ['Native has symbolic revelation', mobile.includes("id: 'louco'") && mobile.includes("id: 'fehu'") && mobile.includes("id: 'iching'")],
  ['Native has three practice timers', mobile.includes('targetSeconds={600}') && mobile.includes('targetSeconds={300}') && mobile.includes('targetSeconds={180}')],
  ['Native has laboratory and reflection', mobile.includes('DISTRAÇÃO') && mobile.includes('ESPELHO DA ALMA') && mobile.includes('INTENÇÃO DO NEÓFITO')],
  ['Native has transformation/progression consequence', mobile.includes('TreeField') && mobile.includes('1 DE 36 TRAVESSIAS DE KETHER')],
  ['Native keeps server/Vault runtime', mobile.includes('encryptVaultText') && mobile.includes('saveEncryptedVaultEntry') && mobile.includes('savePracticeRecord') && mobile.includes('completeCodexDay')],
  ['Native does not create off-grid rhythm token r18', !mobile.includes('R.r18')],
  ['Native keeps audio unresolved instead of inventing preset', mobile.includes('PRESET_PENDING')],
  ['Native keeps Day 005 Fragment boundary', mobile.includes('Fragmento I de Vehuiah') && mobile.includes('Dia 005')],

  ['Web route points to immersive V2', webPage.includes('<Day001ImmersiveExperience />') && !webPage.includes('<Day001WebExperience />')],
  ['Web visible grammar is six macroacts', tokensInOrder(web, acts) && web.includes('Mapa ritual do Dia 001')],
  ['Web does not expose slide counter', !web.includes('SCENES.length') && !web.includes('/ 20') && !web.includes('01 / 20')],
  ['Web has canonical educational matter', web.includes('jachinDoctrine') && web.includes('boazDoctrine') && web.includes('middleDoctrine')],
  ['Web has symbolic revelation', web.includes("id: 'louco'") && web.includes("id: 'fehu'") && web.includes("id: 'iching'")],
  ['Web has practice, laboratory and reflection', web.includes('<RitualTimer') && web.includes('DISTRAÇÃO') && web.includes('ESPELHO DA ALMA')],
  ['Web has first-spark consequence', web.includes('1 de 36 travessias de Kether') && web.includes('Fragmento I de Vehuiah')],
  ['Web keeps audio unresolved', web.includes('PRESET_PENDING')],

  ['Both surfaces expose HNK-EP boundary', mobile.includes('HNK-EP') && web.includes('HNK-EP')],
  ['Both surfaces state scientific/biomedical distinction', mobile.includes('afirmação científica ou biomédica') && web.includes('afirmação científica ou biomédica')],
];

const failed = checks.filter(([, ok]) => !ok);
if (failed.length) {
  console.error('HNK Experience QA Gate V1 failed:');
  for (const [name] of failed) console.error(`- ${name}`);
  process.exit(1);
}

console.log(`HNK Experience QA Gate V1: valid (${checks.length} checks)`);
