import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

async function sha256(path) {
  const buffer = await readFile(path);
  return createHash('sha256').update(buffer).digest('hex');
}

const baseUrl = process.env.HNK_DAY001_BASE_URL ?? 'http://127.0.0.1:3000';
const targetUrl = new URL('/day-001', baseUrl).toString();
const outputDirectory = resolve(process.env.HNK_DAY001_OUT ?? 'artifacts/day001');
const videoDirectory = resolve(outputDirectory, 'video-tmp');
await mkdir(outputDirectory, { recursive: true });
await mkdir(videoDirectory, { recursive: true });

const acts = [
  { id: 'limiar', label: 'Limiar' },
  { id: 'revelacao', label: 'Revelação' },
  { id: 'jachin', label: 'Expansão' },
  { id: 'boaz', label: 'Restrição' },
  { id: 'meio', label: 'Convergência' },
  { id: 'passagem', label: 'Passagem' },
];

const demoDistractions = [
  'Notificações durante a prática',
  'Ruído visual no espaço',
  'Interrupções não planejadas',
];

async function waitForAct(page, actId) {
  await page.locator(`main[data-act="${actId}"]`).waitFor({ state: 'visible' });
  await page.waitForTimeout(120);
}

async function clickButton(page, name) {
  const button = page.getByRole('button', { name, exact: false }).last();
  await button.scrollIntoViewIfNeeded();
  await button.click();
}

async function enterRevelation(page) {
  await clickButton(page, /ATRAVESSAR O LIMIAR/);
  await waitForAct(page, 'revelacao');
}

async function enterJachin(page) {
  await enterRevelation(page);
  await clickButton(page, /ABRIR O MANUSCRITO/);
  await waitForAct(page, 'jachin');
}

async function enterBoaz(page) {
  await enterJachin(page);
  await clickButton(page, /CONTRAIR A FORÇA/);
  await waitForAct(page, 'boaz');
}

async function fillDistractions(page) {
  const fields = page.locator('textarea[placeholder="Nomeie sem enviar ao servidor…"]');
  if ((await fields.count()) !== 3) throw new Error('Expected exactly three Boaz distraction fields.');
  for (let index = 0; index < demoDistractions.length; index += 1) {
    await fields.nth(index).fill(demoDistractions[index]);
  }
}

async function enterMiddle(page) {
  await enterBoaz(page);
  await fillDistractions(page);
  await clickButton(page, /CONVERGIR OS PILARES/);
  await waitForAct(page, 'meio');
}

async function prepareMiddleForSeal(page) {
  await page.getByPlaceholder('O que você traz para a travessia?').fill('Entrar em Kether com atenção, estudo e retorno voluntário.');
  await page.getByPlaceholder('O que mudou entre o início e agora?').fill('A sequência conectou leitura, prática, observação e integração em uma única travessia.');
  await clickButton(page, /CONFIRMAR: PRÁTICA VOLUNTÁRIA/);
}

async function enterPassage(page) {
  await enterMiddle(page);
  await prepareMiddleForSeal(page);
  await clickButton(page, /PREPARAR O SELO/);
  await waitForAct(page, 'selo');
  await clickButton(page, /TESTEMUNHAR A PRIMEIRA CENTELHA/);
  await page.getByText('Agora existe uma luz.').waitFor({ state: 'visible' });
}

async function reachAct(page, id) {
  if (id === 'limiar') return;
  if (id === 'revelacao') return enterRevelation(page);
  if (id === 'jachin') return enterJachin(page);
  if (id === 'boaz') return enterBoaz(page);
  if (id === 'meio') return enterMiddle(page);
  if (id === 'passagem') return enterPassage(page);
  throw new Error(`Unknown Day001 macroact: ${id}`);
}

async function preparePage(browser, viewport, reducedMotion = true) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: reducedMotion ? 'reduce' : 'no-preference' });
  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('main[data-hnk-theme="kether"]').waitFor({ state: 'visible' });
  return { context, page };
}

async function startAndPauseTimer(page, label) {
  const timer = page.locator('div').filter({ hasText: label }).filter({ has: page.getByRole('button', { name: 'INICIAR', exact: true }) }).last();
  const start = timer.getByRole('button', { name: 'INICIAR', exact: true });
  if (await start.count()) {
    await start.click();
    await page.waitForTimeout(1100);
    const pause = timer.getByRole('button', { name: 'PAUSAR', exact: true });
    if (await pause.count()) await pause.click();
  }
}

async function recordWalkthrough(browser, outputs) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    recordVideo: { dir: videoDirectory, size: { width: 1440, height: 900 } },
  });
  const page = await context.newPage();
  const video = page.video();

  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('main[data-hnk-theme="kether"]').waitFor({ state: 'visible' });
  await page.waitForTimeout(1400);

  await clickButton(page, /ATRAVESSAR O LIMIAR/);
  await waitForAct(page, 'revelacao');
  await page.waitForTimeout(900);

  for (const key of ['Fehu', 'Hexagrama 1', 'O Louco']) {
    await clickButton(page, new RegExp(key));
    await page.waitForTimeout(650);
  }

  await clickButton(page, /ABRIR O MANUSCRITO/);
  await waitForAct(page, 'jachin');
  await page.waitForTimeout(1100);
  await page.mouse.wheel(0, 520);
  await page.waitForTimeout(700);
  await startAndPauseTimer(page, 'FOCO DE JACHIN');
  await page.waitForTimeout(650);

  await clickButton(page, /CONTRAIR A FORÇA/);
  await waitForAct(page, 'boaz');
  await page.waitForTimeout(900);
  await page.mouse.wheel(0, 680);
  await startAndPauseTimer(page, 'RELAXAMENTO · BOAZ');
  await fillDistractions(page);
  await page.waitForTimeout(900);

  await clickButton(page, /CONVERGIR OS PILARES/);
  await waitForAct(page, 'meio');
  await page.waitForTimeout(900);
  await clickButton(page, /PRATICAR SEM GRAVAR/);
  await page.waitForTimeout(850);
  await prepareMiddleForSeal(page);
  await page.waitForTimeout(650);

  await clickButton(page, /PREPARAR O SELO/);
  await waitForAct(page, 'selo');
  await page.waitForTimeout(1200);
  await clickButton(page, /TESTEMUNHAR A PRIMEIRA CENTELHA/);
  await page.getByText('Agora existe uma luz.').waitFor({ state: 'visible' });
  await page.waitForTimeout(1800);

  await page.close();
  await context.close();

  if (!video) throw new Error('Playwright did not create a Day001 walkthrough video handle.');
  const temporaryPath = await video.path();
  const videoPath = resolve(outputDirectory, 'day001-immersive-walkthrough-desktop.webm');
  const bytes = await readFile(temporaryPath);
  await writeFile(videoPath, bytes);
  outputs.push({
    kind: 'day001-immersive-walkthrough',
    scene: 'full-journey',
    target: 'desktop-1440x900',
    format: 'webm',
    path: videoPath,
    sha256: await sha256(videoPath),
    audioStatus: 'PRESET_PENDING_NO_AUDIO_TRACK_EXPECTED',
  });
}

const browser = await chromium.launch({ headless: true });
const outputs = [];

try {
  for (const target of acts) {
    for (const mode of [
      { key: 'desktop', viewport: { width: 1600, height: 1200 } },
      { key: 'mobile-390', viewport: { width: 390, height: 844 } },
    ]) {
      const { context, page } = await preparePage(browser, mode.viewport, true);
      await reachAct(page, target.id);
      const path = resolve(outputDirectory, `day001-${target.id}-${mode.key}.png`);
      await page.screenshot({ path, type: 'png', fullPage: true, animations: 'disabled' });
      outputs.push({
        kind: 'day001-macroact-proof',
        scene: target.id,
        label: target.label,
        target: mode.key,
        format: 'png',
        path,
        sha256: await sha256(path),
      });
      await context.close();
    }
  }

  await recordWalkthrough(browser, outputs);

  const manifest = {
    schemaVersion: '2.0',
    experience: 'kether-day-001-immersive-v2',
    route: '/day-001',
    sourceUrl: targetUrl,
    exportedAt: new Date().toISOString(),
    renderer: 'playwright/chromium',
    macroacts: acts.map((act) => act.id),
    screenshotReducedMotion: true,
    walkthroughReducedMotion: false,
    audioStatus: 'PRESET_PENDING_NO_AUDIO_TRACK_EXPECTED',
    visualApproval: 'REQUIRES_HUMAN_VIDEO_DEVICE_REVIEW',
    outputs,
  };
  const manifestPath = resolve(outputDirectory, 'export-manifest.json');
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(manifest, null, 2));
} finally {
  await browser.close();
}
