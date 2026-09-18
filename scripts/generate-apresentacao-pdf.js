#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { ROOT } = require('../lib/paths.js');

const PRINT_HTML = path.join(ROOT, 'info', 'apresentacao-unifesp-print.html');
const OUT_PDF = path.join(ROOT, 'info', 'apresentacao-inspetor-budganja-unifesp.pdf');

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.EDGE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) return candidate;
    } catch (_) {
      /* ignore */
    }
  }
  return null;
}

function fileUrl(filePath) {
  const resolved = path.resolve(filePath).replace(/\\/g, '/');
  if (/^[A-Za-z]:/.test(resolved)) {
    return 'file:///' + resolved;
  }
  return 'file://' + resolved;
}

function main() {
  if (!fs.existsSync(PRINT_HTML)) {
    throw new Error('HTML de impressão em falta: ' + PRINT_HTML);
  }

  const chrome = findChrome();
  if (!chrome) {
    console.warn('Aviso: Chrome/Edge não encontrado — PDF da apresentação não gerado.');
    return;
  }

  fs.mkdirSync(path.dirname(OUT_PDF), { recursive: true });
  if (fs.existsSync(OUT_PDF)) {
    fs.unlinkSync(OUT_PDF);
  }

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--print-to-pdf=' + OUT_PDF,
    fileUrl(PRINT_HTML)
  ];

  const result = spawnSync(chrome, args, {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 60000,
    windowsHide: true
  });

  if (result.status !== 0 || !fs.existsSync(OUT_PDF)) {
    const detail = (result.stderr || result.stdout || '').trim();
    throw new Error(
      'Falha ao gerar PDF da apresentação (exit ' +
        result.status +
        ')' +
        (detail ? ': ' + detail.slice(0, 500) : '')
    );
  }

  const sizeKb = Math.round(fs.statSync(OUT_PDF).size / 1024);
  console.log('PDF gerado:', path.relative(ROOT, OUT_PDF), '(' + sizeKb + ' KB)');
}

main();
