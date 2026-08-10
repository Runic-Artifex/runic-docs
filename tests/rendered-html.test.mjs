import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import test from 'node:test';

const buildDirectory = fileURLToPath(new URL('../build/', import.meta.url));

function render(path = '/') {
  const relativePath =
    path === '/' ? 'index.html' : `${path.slice(1)}/index.html`;
  return readFile(join(buildDirectory, relativePath), 'utf8');
}

test('renders the documentation home with complete metadata and branding', async () => {
  const html = await render();
  assert.match(
    html,
    /^<!doctype html>\s*<html lang="en" class="dark" data-theme="runic">/,
  );
  assert.match(html, /name="color-scheme" content="dark light"/);
  assert.match(html, /Build one application model across \.NET surfaces/);
  assert.match(
    html,
    /<title>Build one application model across \.NET surfaces · Runic Artifex<\/title>/,
  );
  assert.match(html, /<small>Documentation<\/small>/);
  assert.match(
    html,
    /property="og:image" content="https:\/\/docs\.runic-artifex\.eu\/og\.png"/,
  );
  assert.match(
    html,
    /rel="canonical" href="https:\/\/docs\.runic-artifex\.eu\/"/,
  );
  assert.match(html, /href="\.\/getting-started"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /rel="icon" href="\/icon\.png"/);
  assert.match(html, /runic-docs\.theme-mode/);
  assert.match(html, /runic-docs\.theme-palette/);
  assert.doesNotMatch(html, /runic-translations\.theme-/);
  assert.match(html, /aria-label="Appearance, Runic Gold · Dark"/);
  assert.match(html, /data-appearance-trigger="compact"/);
  assert.match(
    html,
    /<a class="skip-link" href="#content">Skip to content<\/a>/,
  );
  assert.match(html, /<main id="content" tabindex="-1">/);
  assert.equal(html.match(/<main\b/g)?.length, 1);
  assert.match(
    html,
    /background-image:\s*url\(\/products\/runic-toolkit\.png\)/,
  );
  assert.match(html, /Runic Toolkit/);
  assert.match(html, /CsWebUi/);
  assert.doesNotMatch(
    html,
    /codex-preview|SkeletonPreview|Your site is taking shape/,
  );
});

test('keeps navigation usable before hydration and exposes the Sheet trigger contract', async () => {
  const homeHtml = await render();
  const productsHtml = await render('/products');
  const fallback = homeHtml.match(/<noscript>([\s\S]*?)<\/noscript>/)?.[1];

  assert.ok(fallback, 'expected a no-JavaScript navigation fallback');
  assert.match(fallback, /<details class="noscript-nav">/);
  assert.match(fallback, /Mobile navigation without JavaScript/);
  for (const [href, label] of [
    ['./getting-started', 'Start'],
    ['./products', 'Products'],
    ['./application-bridge', 'Application Bridge'],
    ['./architecture', 'Architecture'],
    ['./packages', 'Packages'],
    ['./releases', 'Releases'],
  ]) {
    assert.match(fallback, new RegExp(`href="${href}">${label}<\\/a>`));
  }

  assert.match(
    productsHtml,
    /<noscript>[\s\S]*?href="\.\.\/products" aria-current="page">Products<\/a>[\s\S]*?<\/noscript>/,
  );
  assert.match(homeHtml, /aria-haspopup="dialog"/);
  assert.match(homeHtml, /aria-expanded="false"/);
  assert.match(homeHtml, /data-dialog-trigger=""/);
  assert.match(homeHtml, /data-state="closed"/);
  assert.match(homeHtml, /aria-label="Open documentation navigation"/);
  assert.doesNotMatch(homeHtml, /data-slot="sheet-content"/);
});

test('renders every primary documentation route', async () => {
  const routes = [
    ['/getting-started', 'Begin at the capability boundary'],
    ['/products', 'Independent products'],
    ['/architecture', 'Ownership and dependency direction'],
    ['/packages', 'One owner for every public package'],
    ['/releases', 'Verify once'],
    ['/products/runic-toolkit', 'Runic Toolkit'],
    ['/application-bridge', 'Named application concepts'],
    ['/products/runic-flow', 'Runic Flow'],
    ['/products/runic-assets', 'Runic Assets'],
    ['/products/runic-translations', 'Runic Translations'],
    ['/products/runic-translations-editor', 'Runic Translations Editor'],
    ['/products/runic-command-line', 'Runic Command Line'],
    ['/products/cs-webui', 'CsWebUi'],
  ];

  for (const [path, expected] of routes) {
    assert.match(await render(path), new RegExp(expected), path);
  }
});

test('builds an accessible branded page for nginx 404 responses', async () => {
  const html = await render('/404');
  assert.match(html, /That rune is not in the catalog/);
  assert.match(html, /<title>Page not found · Runic Artifex<\/title>/);
  assert.match(html, /Skip to content/);
});

test('presents the editor as a downstream application with its own artifacts', async () => {
  const html = await render('/products/runic-translations-editor');
  assert.match(html, /Release artifacts/);
  assert.match(html, /Linux x64 self-contained archive/);
  assert.match(html, /First release pending/);
  assert.match(html, /Does not own the compiler, schemas, runtime ABI/);
  assert.doesNotMatch(html, /Prepare to install/);
});

test('documents the headless Flow surface and package ownership', async () => {
  const flowHtml = await render('/products/runic-flow');
  assert.match(flowHtml, /deterministic application processes/i);
  assert.match(flowHtml, /RunicFlow\.ApplicationBridge/);
  assert.doesNotMatch(
    flowHtml,
    /RunicFlow\.(?:Generators|CommunityToolkit|RunicToolkit)/,
  );

  const packageHtml = await render('/packages');
  assert.match(packageHtml, /@runic-artifex\/application-bridge/);
  assert.match(packageHtml, /RunicToolkit\.ApplicationBridge\.Generators/);
  assert.match(packageHtml, /RunicTranslations\.Generator/);
  assert.match(packageHtml, /RunicTranslations\.Authoring/);
  assert.match(packageHtml, /@runic-artifex\/vite-plugin-runic-translations/);
});

test('renders package and release tables with captions, scoped heads, and overflow containment', async () => {
  const packageHtml = await render('/packages');
  const releaseHtml = await render('/releases');

  for (const html of [packageHtml, releaseHtml]) {
    assert.match(
      html,
      /data-slot="table-container" class="relative w-full overflow-x-auto"/,
    );
    assert.match(html, /data-slot="table-caption"/);
    assert.match(html, /<th[^>]*scope="col">/);
  }
  assert.match(
    packageHtml,
    /Runic Artifex public package ownership and publication status/,
  );
  assert.match(
    releaseHtml,
    /Runic Artifex release candidates and publication order/,
  );
  assert.equal(packageHtml.match(/scope="col"/g)?.length, 4);
  assert.equal(releaseHtml.match(/scope="col"/g)?.length, 3);
});

test('uses semantic untruncated release steps', async () => {
  const html = await render('/releases');

  for (const title of [
    'Freeze exact source commits',
    'Build fresh candidates',
    'Cross the documentation gate',
    'Enable trusted publishing',
  ]) {
    assert.match(
      html,
      new RegExp(`<h2 class="font-serif text-xl">${title}<\\/h2>`),
    );
  }
  assert.equal(html.match(/data-slot="item-description"/g)?.length, 4);
  assert.equal(html.match(/line-clamp-none/g)?.length, 8);
  assert.doesNotMatch(html, /data-slot="item-description"[^>]*line-clamp-2/);
  assert.match(
    html,
    /Restore, test, pack, and run frontend, downstream-consumer, and\s+applicable NativeAOT gates without sibling source dependencies\./,
  );
});

test('uses the canonical Runic Translations identifiers', async () => {
  const html = await render('/products/runic-translations');
  assert.match(html, /<h1>Runic Translations<\/h1>/);
  assert.match(html, /runic\.translations\/1/);
  assert.match(html, /RunicTranslations\.Compiler/);
  assert.match(html, /@runic-artifex\/vite-plugin-runic-translations/);
});

test('reports release readiness conservatively', async () => {
  const homeHtml = await render('/');
  const releaseHtml = await render('/releases');
  const gettingStartedHtml = await render('/getting-started');
  const bridgeHtml = await render('/application-bridge');
  assert.match(homeHtml, /The source is public/i);
  assert.match(homeHtml, /registry publication remains gated/i);
  assert.match(releaseHtml, /0\.1\.0-preview\.22\.1 · verified, unpublished/);
  assert.match(releaseHtml, /0\.1\.0-preview\.4\.3 · verified, unpublished/);
  assert.doesNotMatch(homeHtml, /packages? (?:are|is) public/i);
  assert.doesNotMatch(
    releaseHtml,
    /<span class="status-pill">Published<\/span>/,
  );
  assert.match(
    gettingStartedHtml,
    /Exact candidates for the other package\s+families have passed their public-source verification workflows/,
  );
  assert.match(
    bridgeHtml,
    /Exact Toolkit, Svelte, and Vite candidates have passed their\s+public-source verification workflows/,
  );
  for (const html of [gettingStartedHtml, bridgeHtml]) {
    assert.doesNotMatch(html, /refreshing candidates/i);
    assert.doesNotMatch(html, /being rebuilt/i);
    assert.doesNotMatch(html, /refreshed public candidates/i);
  }
});
