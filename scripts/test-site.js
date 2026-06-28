'use strict';

require('../lib/load-env.js');

const fs = require('fs');
const path = require('path');
const http = require('http');

const { ROOT } = require('../lib/paths.js');
const { isDevModeEnabled } = require('../lib/site-dev-mode.js');
const BASE = 'http://localhost:8080';
const TIMEOUT = 8000;

const PROTECTED_PAGES = new Set(['admin.html', 'sorteios-admin.html', 'loja-admin.html']);
const DEV_MODE_PUBLIC_PAGES = new Set(['login.html', 'em-desenvolvimento.html']);
const DEV_MODE = isDevModeEnabled();
const API_ROUTES = ['/api/me', '/api/site', '/api/posts', '/api/sorteio', '/api/guia-cultivo', '/api/youtube-feed', '/api/loja/encomendas'];

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(BASE + urlPath, { timeout: TIMEOUT }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        resolve({
          url: urlPath,
          status: res.statusCode,
          type: res.headers['content-type'] || '',
          headers: res.headers,
          body: Buffer.concat(chunks).toString('utf8')
        });
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('timeout: ' + urlPath));
    });
  });
}

function localPathFromHref(href) {
  if (!href || href.startsWith('#') || /^https?:\/\//i.test(href) || href.startsWith('mailto:')) {
    return null;
  }
  if (href.startsWith('/api/') || href.startsWith('api/')) {
    return null;
  }
  const clean = href.split('?')[0].split('#')[0].replace(/^\.\//, '').replace(/^\/+/, '');
  if (!clean || clean.endsWith('/')) return null;
  return path.join(ROOT, clean);
}

function extractRefs(html) {
  const refs = [];
  const re = /\b(?:href|src)=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) refs.push(m[1]);
  return refs;
}

function parseZIndexScale(css) {
  const scale = {};
  const re = /--z-([\w-]+):\s*(\d+)/g;
  let m;
  while ((m = re.exec(css)) !== null) scale[m[1]] = Number(m[2]);
  return scale;
}

function checkLayering(css) {
  const issues = [];
  const scale = parseZIndexScale(css);

  if (!scale.header || !scale['nav-dropdown'] || !scale.main === undefined) {
    issues.push({ kind: 'z-index', severity: 'warn', message: 'Escala --z-* incompleta em :root' });
  }

  if (scale.modal && scale['nav-dropdown'] && scale.modal <= scale['nav-dropdown']) {
    issues.push({
      kind: 'z-index',
      severity: 'error',
      message: `Modal (--z-modal: ${scale.modal}) deve ficar acima do dropdown (${scale['nav-dropdown']})`
    });
  }

  if (scale.header && scale['nav-dropdown'] && scale['nav-dropdown'] <= scale.header) {
    issues.push({
      kind: 'z-index',
      severity: 'error',
      message: 'Dropdown do menu deve ter z-index maior que o header'
    });
  }

  if (!/#site-header\s*\{[^}]*z-index:\s*var\(--z-header\)/s.test(css)) {
    issues.push({
      kind: 'z-index',
      severity: 'error',
      message: '#site-header sem z-index var(--z-header)'
    });
  }

  const headerClip = /\.(?:site-header|header-right|primary-nav|nav-dropdown)\s*\{[^}]*overflow:\s*hidden/gi;
  if (headerClip.test(css)) {
    issues.push({
      kind: 'overflow',
      severity: 'error',
      message: 'overflow:hidden no header/nav pode cortar dropdowns'
    });
  }

  return issues;
}

async function main() {
  const css = fs.readFileSync(path.join(ROOT, 'css', 'style.css'), 'utf8');
  function collectHtmlFiles(dir, prefix) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
      const rel = prefix ? prefix + '/' + entry.name : entry.name;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        out.push(...collectHtmlFiles(full, rel));
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        out.push(rel);
      }
    }
    return out;
  }
  const htmlFiles = collectHtmlFiles(ROOT, '');
  const issues = [];
  const ok = [];

  issues.push(...checkLayering(css));

  for (const file of htmlFiles) {
    const urlPath = file.endsWith('/index.html')
      ? '/' + file.replace(/index\.html$/, '')
      : '/' + file;
    try {
      const res = await fetchUrl(urlPath);
      const allowed = res.status === 200
        || (PROTECTED_PAGES.has(file) && (res.status === 302 || res.status === 401))
        || (DEV_MODE && res.status === 503 && !DEV_MODE_PUBLIC_PAGES.has(file));
      if (!allowed) {
        issues.push({ kind: 'http', severity: 'error', message: `${urlPath} → HTTP ${res.status}` });
        continue;
      }
      ok.push(`${urlPath} → ${res.status}`);

      if (res.status !== 200 && !(DEV_MODE && res.status === 503)) continue;

      const refs = extractRefs(res.body);
      const missing = [];
      refs.forEach((ref) => {
        const local = localPathFromHref(ref);
        if (local && !fs.existsSync(local)) missing.push(ref);
      });
      if (missing.length) {
        issues.push({
          kind: 'asset',
          severity: 'error',
          message: `${file}: recursos em falta → ${[...new Set(missing)].join(', ')}`
        });
      }

      if (!res.body.includes('id="site-header"') && !PROTECTED_PAGES.has(file) && file !== 'login.html' && file !== 'em-desenvolvimento.html') {
        issues.push({ kind: 'layout', severity: 'warn', message: `${file} não usa #site-header` });
      }
    } catch (e) {
      issues.push({ kind: 'http', severity: 'error', message: `${urlPath} → ${e.message}` });
    }
  }

  for (const route of API_ROUTES) {
    try {
      const res = await fetchUrl(route);
      const jsonOk = res.type.includes('application/json');
      if (!jsonOk && res.status !== 401) {
        issues.push({ kind: 'api', severity: 'error', message: `${route} → HTTP ${res.status}, tipo ${res.type}` });
      } else {
        ok.push(`${route} → ${res.status}`);
      }
    } catch (e) {
      issues.push({ kind: 'api', severity: 'error', message: `${route} → ${e.message}` });
    }
  }

  const staticAssets = ['css/style.css', 'js/layout.js', 'js/ferramentas-nav-data.js', 'js/site-features.js', 'js/home.js', 'js/perfil.js', 'js/cultivo.js', 'js/guia-cultivo.js', 'js/videos.js', 'js/loja.js', 'js/loja-data.js', 'js/loja-order-ui.js', 'js/loja-order-callout.js', 'js/equip-loja-materials.js', 'js/loja-encomenda.js', 'js/loja-admin.js', 'content/guia-cultivo.json', 'content/youtube-feed.json', 'search-index.json', 'sw.js', 'posts-public.json'];
  for (const asset of staticAssets) {
    try {
      const res = await fetchUrl('/' + asset);
      if (DEV_MODE && res.status === 503) {
        ok.push('/' + asset + ' bloqueado em dev mode (503)');
        continue;
      }
      if (res.status !== 200) {
        issues.push({ kind: 'asset', severity: 'error', message: `/${asset} → HTTP ${res.status}` });
      } else {
        ok.push(`/${asset} OK`);
      }
    } catch (e) {
      issues.push({ kind: 'asset', severity: 'error', message: `/${asset} → ${e.message}` });
    }
  }

  const blockedPaths = [
    '.env',
    'posts.json',
    'sorteios.json',
    'package.json',
    'content/users.json',
    'content/sessions.json',
    'content/user-sessions.json',
    'content/pages.json',
    'content/site.json',
    'lib/utils.js',
    'server/index.js'
  ];
  for (const blocked of blockedPaths) {
    try {
      const res = await fetchUrl('/' + blocked);
      if (res.status === 200) {
        issues.push({ kind: 'security', severity: 'error', message: `/${blocked} exposto publicamente (HTTP 200)` });
      } else {
        ok.push(`/${blocked} bloqueado (${res.status})`);
      }
    } catch (e) {
      issues.push({ kind: 'security', severity: 'error', message: `/${blocked} → ${e.message}` });
    }
  }

  try {
    const indexRes = await fetchUrl('/');
    const headers = indexRes.headers || {};
    const requiredHeaders = ['x-content-type-options', 'x-frame-options', 'content-security-policy'];
    requiredHeaders.forEach((h) => {
      if (!headers[h]) {
        issues.push({ kind: 'security', severity: 'error', message: `Resposta / sem header ${h}` });
      } else {
        ok.push(`header ${h} presente`);
      }
    });
  } catch (e) {
    issues.push({ kind: 'security', severity: 'error', message: 'Verificação de headers falhou: ' + e.message });
  }

  const errors = issues.filter((i) => i.severity === 'error');
  const warns = issues.filter((i) => i.severity === 'warn');

  console.log('\n=== Teste do site Inspetor BudGanja ===\n');
  console.log(`Páginas HTML: ${htmlFiles.length}`);
  console.log(`Verificações OK: ${ok.length}\n`);

  if (errors.length) {
    console.log('ERROS (' + errors.length + '):');
    errors.forEach((i) => console.log('  ✗ [' + i.kind + '] ' + i.message));
    console.log('');
  }
  if (warns.length) {
    console.log('AVISOS (' + warns.length + '):');
    warns.forEach((i) => console.log('  ! [' + i.kind + '] ' + i.message));
    console.log('');
  }
  if (!errors.length && !warns.length) {
    console.log('Nenhum problema detectado.\n');
  }

  process.exit(errors.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
