'use strict';

/**
 * Troca a voz do lab:
 *   «muito obrigado» → «Gratidão»
 *   «Valeu !!!» / «Valeu !!!!» → «Valeu !!!»
 * Uso: node scripts/rename-mantras-gratidao-valeu.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIR = new Set([
  'node_modules',
  '.git',
  'uploads',
  'data',
  'imagens',
  'agent-tools'
]);
const SKIP_EXT = new Set([
  '.png', '.jpg', '.jpeg', '.webp', '.gif', '.ico', '.svg', '.pdf',
  '.woff', '.woff2', '.ttf', '.mp3', '.mp4', '.zip', '.db'
]);

function skipPath(rel) {
  const n = rel.replace(/\\/g, '/');
  if (n.startsWith('content/transcripts/')) return true;
  if (n.startsWith('biblioteca/unifesp/livro')) return true;
  if (n.startsWith('content/livros/xiv')) return true;
  if (n.includes('scripts/tmp')) return true;
  if (n.includes('.wip-bak')) return true;
  if (n === 'scripts/rename-mantras-gratidao-valeu.js') return true;
  return false;
}

function keepOldInspection(rel) {
  const n = rel.replace(/\\/g, '/');
  return (
    n.includes('faca-o-melhor') ||
    n.includes('muito-obrigado') ||
    n.includes('muitoobrigado')
  );
}

function transformDisplay(s) {
  s = s.replace(/Valeu !!!!/g, 'Valeu !!!');
  s = s.replace(/Valeu !!!\./g, 'Valeu !!!');
  s = s.replace(/Valeu !!!»/g, 'Valeu !!!»');
  s = s.replace(/«Valeu !!!»/g, '«Valeu !!!»');
  s = s.replace(/Valeu !!!!/g, 'Valeu !!!');
  s = s.replace(/Valeu !!!\./g, 'Valeu !!!');
  s = s.replace(/¡Valeu !!!!/g, '¡Valeu !!!');
  s = s.replace(/Valeu !!!\./g, 'Valeu !!!');
  s = s.replace(/Valeu !!!!/g, 'Valeu !!!');
  s = s.replace(/¡Valeu !!!»/g, '¡Valeu !!!»');

  s = s.replace(/muitoobrigado/g, 'Gratidão');
  s = s.replace(/Muitoobrigado/g, 'Gratidão');
  s = s.replace(/MUITOOBRIGADO/g, 'Gratidão');
  s = s.replace(/muito Obrigado/g, 'Gratidão');
  s = s.replace(/Muito Obrigado/g, 'Gratidão');
  s = s.replace(/Muito obrigado/g, 'Gratidão');
  s = s.replace(/muito obrigado/gi, 'Gratidão');

  s = s.replace(/Thank you very much/g, 'Gratitude');
  s = s.replace(/thank you very much/g, 'gratitude');
  s = s.replace(/Muchas gracias/g, 'Gratitud');
  s = s.replace(/muchas gracias/g, 'gratitud');
  return s;
}

function transformUrls(s, keepOld) {
  if (keepOld) return s;
  s = s.replace(
    /\/posts\/post-inspecao-expressao-faca-o-melhor\.html/g,
    '/posts/post-inspecao-palavra-valeu.html'
  );
  s = s.replace(
    /\/vida\/#poema=faca-o-melhor/g,
    '/posts/post-inspecao-palavra-valeu.html'
  );
  s = s.replace(
    /\/posts\/post-inspecao-expressao-muito-obrigado\.html/g,
    '/posts/post-inspecao-palavra-gratidao.html'
  );
  return s;
}

function transformConsts(s, keepOld) {
  if (keepOld) return s;
  s = s.replace(
    /const mantra = '\/posts\/post-inspecao-expressao-faca-o-melhor\.html'/g,
    "const mantra = '/posts/post-inspecao-palavra-valeu.html'"
  );
  s = s.replace(
    /const faca = '\/posts\/post-inspecao-expressao-faca-o-melhor\.html'/g,
    "const faca = '/posts/post-inspecao-palavra-valeu.html'"
  );
  s = s.replace(
    /const muito = '\/posts\/post-inspecao-expressao-muito-obrigado\.html'/g,
    "const muito = '/posts/post-inspecao-palavra-gratidao.html'"
  );
  return s;
}

function transformFile(abs, rel) {
  const ext = path.extname(rel).toLowerCase();
  if (SKIP_EXT.has(ext)) return false;
  let raw;
  try {
    raw = fs.readFileSync(abs, 'utf8');
  } catch (e) {
    return false;
  }
  if (!raw || raw.indexOf('\u0000') !== -1) return false;
  const keepOld = keepOldInspection(rel);
  let next = raw;
  next = transformConsts(next, keepOld);
  next = transformUrls(next, keepOld);
  if (!keepOld) next = transformDisplay(next);
  if (next === raw) return false;
  fs.writeFileSync(abs, next, 'utf8');
  return true;
}

function walk(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    if (ent.name.startsWith('.') && ent.name !== '.cursor') continue;
    if (SKIP_DIR.has(ent.name)) continue;
    const abs = path.join(dir, ent.name);
    const rel = path.relative(ROOT, abs);
    if (skipPath(rel)) continue;
    if (ent.isDirectory()) walk(abs, acc);
    else acc.push({ abs, rel });
  }
}

const files = [];
walk(ROOT, files);
let changed = 0;
for (const f of files) {
  if (transformFile(f.abs, f.rel)) {
    changed += 1;
    console.log('ok', f.rel.replace(/\\/g, '/'));
  }
}
console.log('Ficheiros alterados:', changed);
