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
await mkdir(outputDirectory, { recursive: true });

const targets = [
  { name: 'origin', title: 'Antes da forma.' },
  { name: 'relic', title: 'A origem torna-se tocável.' },
  { name: 'atrium', title: 'Agora existe uma luz.' },
];

async function advance(page) {
  const title = await page.locator('h1').textContent();
  if (title === 'Nomeie o que você traz.') {
    await page.locator('textarea').fill('Prova visual automatizada — conteúdo local não persistido.');
  }
  if (title === 'Prática voluntária. Retorno preservado.') {
    await page.getByRole('button', { name: /TOCAR PARA CONFIRMAR/ }).click();
  }
  if (title === 'O que mudou?') {
    await page.locator('textarea').fill('Prova visual automatizada — Espelho local não persistido.');
  }
  const cta = page.locator('button').filter({ hasText: /TOCAR A ORIGEM|CONTINUAR|PASSAR ADIANTE/ }).last();
  if (await cta.count()) await cta.click();
}

async function reach(page, expectedTitle) {
  for (let step = 0; step < 24; step += 1) {
    const title = await page.locator('h1').textContent();
    if (title === expectedTitle) return;
    await advance(page);
    await page.waitForTimeout(25);
  }
  throw new Error(`Unable to reach Day 001 proof scene: ${expectedTitle}`);
}

async function prepare(browser, viewport) {
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.locator('main[data-hnk-theme="kether"]').waitFor({ state: 'visible' });
  return page;
}

const browser = await chromium.launch({ headless: true });
const outputs = [];

try {
  for (const target of targets) {
    for (const mode of [
      { key: 'desktop', viewport: { width: 1600, height: 1200 } },
      { key: 'mobile-390', viewport: { width: 390, height: 844 } },
    ]) {
      const page = await prepare(browser, mode.viewport);
      await reach(page, target.title);
      const path = resolve(outputDirectory, `day001-${target.name}-${mode.key}.png`);
      await page.locator('main[data-hnk-theme="kether"]').screenshot({
        path,
        type: 'png',
        fullPage: true,
        animations: 'disabled',
      });
      outputs.push({
        kind: 'day001-visual-proof',
        scene: target.name,
        target: mode.key,
        format: 'png',
        path,
        sha256: await sha256(path),
      });
      await page.close();
    }
  }

  const pdfPage = await prepare(browser, { width: 1600, height: 1200 });
  await reach(pdfPage, 'Agora existe uma luz.');
  const pdfPath = resolve(outputDirectory, 'day001-atrium.pdf');
  await pdfPage.pdf({
    path: pdfPath,
    printBackground: true,
    format: 'A4',
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });
  outputs.push({
    kind: 'day001-document-proof',
    scene: 'atrium',
    target: 'print',
    format: 'pdf',
    path: pdfPath,
    sha256: await sha256(pdfPath),
  });
  await pdfPage.close();

  const manifest = {
    schemaVersion: '1.0',
    experience: 'kether-day-001-master',
    route: '/day-001',
    sourceUrl: targetUrl,
    exportedAt: new Date().toISOString(),
    renderer: 'playwright/chromium',
    reducedMotion: true,
    outputs,
  };
  const manifestPath = resolve(outputDirectory, 'export-manifest.json');
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(manifest, null, 2));
} finally {
  await browser.close();
}
