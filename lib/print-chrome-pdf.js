'use strict';

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { ROOT } = require('./paths.js');

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

function printHtmlToPdf(htmlPath, pdfPath, opts) {
  const timeout = (opts && opts.timeout) || 60000;
  if (!fs.existsSync(htmlPath)) {
    throw new Error('HTML de impressão em falta: ' + htmlPath);
  }

  const chrome = findChrome();
  if (!chrome) {
    console.warn('Aviso: Chrome/Edge não encontrado — PDF não gerado.');
    return false;
  }

  fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync(pdfPath);
  }

  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=120000',
    '--print-to-pdf=' + pdfPath,
    fileUrl(htmlPath)
  ];

  const result = spawnSync(chrome, args, {
    cwd: ROOT,
    encoding: 'utf8',
    timeout,
    windowsHide: true
  });

  if (result.status !== 0 || !fs.existsSync(pdfPath)) {
    const detail = (result.stderr || result.stdout || '').trim();
    throw new Error(
      'Falha ao gerar PDF (exit ' +
        result.status +
        ')' +
        (detail ? ': ' + detail.slice(0, 500) : '')
    );
  }

  const sizeKb = Math.round(fs.statSync(pdfPath).size / 1024);
  console.log('PDF gerado:', path.relative(ROOT, pdfPath), '(' + sizeKb + ' KB)');
  return true;
}

module.exports = { findChrome, fileUrl, printHtmlToPdf };
