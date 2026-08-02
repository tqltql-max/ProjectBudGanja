'use strict';

/**
 * Cataloga palavras de uma legenda YouTube já gravada em content/transcripts/.
 * Uso: node scripts/catalog-transcript-palavras.js content/transcripts/tamara-klink/V3GSlr5sp7c.json
 */

const fs = require('fs');
const path = require('path');

function normalize(tok) {
  return String(tok || '')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase();
}

const STOP = new Set(
  [
    'a', 'o', 'e', 'de', 'da', 'do', 'das', 'dos', 'em', 'no', 'na', 'nos', 'nas',
    'um', 'uma', 'uns', 'umas', 'que', 'se', 'por', 'com', 'para', 'pra', 'pro',
    'ao', 'aos', 'à', 'às', 'ou', 'as', 'os', 'é', 'eu', 'tu', 'ele', 'ela',
    'nós', 'vos', 'eles', 'elas', 'me', 'te', 'lhe', 'lhes', 'meu', 'minha',
    'meus', 'minhas', 'teu', 'tua', 'teus', 'tuas', 'seu', 'sua', 'seus', 'suas',
    'nosso', 'nossa', 'nossos', 'nossas', 'este', 'esta', 'estes', 'estas',
    'esse', 'essa', 'esses', 'essas', 'aquele', 'aquela', 'aqueles', 'aquelas',
    'isto', 'isso', 'aquilo', 'como', 'mais', 'mas', 'já', 'não', 'sim', 'nem',
    'também', 'só', 'muito', 'pouco', 'bem', 'mal', 'aqui', 'ali', 'aí', 'lá',
    'cá', 'então', 'quando', 'onde', 'quem', 'qual', 'quais', 'porque', 'pois',
    'porém', 'contudo', 'portanto', 'assim', 'sobre', 'sob', 'entre', 'até',
    'após', 'antes', 'depois', 'ainda', 'sempre', 'nunca', 'ser', 'estar', 'ter',
    'haver', 'ir', 'vir', 'fazer', 'poder', 'dever', 'querer', 'saber', 'dizer',
    'ver', 'dar', 'foi', 'fui', 'foram', 'era', 'eram', 'sou', 'somos', 'são',
    'está', 'estão', 'estava', 'estavam', 'tem', 'têm', 'tinha', 'tinham', 'há',
    'houve', 'vai', 'vão', 'vou', 'eh', 'né', 'tá', 'tô', 'numa', 'num', 'duma',
    'dum', 'dela', 'dele', 'deles', 'delas', 'nela', 'nele', 'neles', 'nelas',
    'tipo', 'gente', 'você', 'vocês', 'mim', 'ti', 'si', 'todo', 'toda', 'todos',
    'todas', 'outro', 'outra', 'outros', 'outras', 'mesmo', 'mesma', 'mesmos',
    'mesmas', 'cada', 'algum', 'alguma', 'alguns', 'algumas', 'hoje', 'agora',
    'bom', 'oi', 'olá', 'ok', 'pq', 'tb', 'tbm', 'vcs', 'menos', 'somente',
    'pela', 'pelo', 'pelas', 'pelos', 'ia', 'iam', 'sei', 'sabe', 'sabia',
    'tava', 'tavam', 'dia', 'sem', 'nesse', 'nessa', 'nesses', 'nessas', 'teve',
    'tivesse', 'acho', 'acha', 'vários', 'várias', 'vez', 'vezes', 'exemplo',
    'bastante', 'coisas', 'coisa', 'boa', 'novo', 'nova', 'anos', 'meses'
  ].map(normalize)
);

function main() {
  const input = process.argv[2];
  if (!input) {
    console.error('Uso: node scripts/catalog-transcript-palavras.js <arquivo.json>');
    process.exit(1);
  }
  const abs = path.resolve(input);
  const raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  const text = (raw.segments || [])
    .map((s) => s.text)
    .join(' ')
    .replace(/\[música\]/gi, ' ')
    .replace(/\[music\]/gi, ' ')
    .replace(/\[applause\]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens = text
    .replace(/["«»„""]/g, ' ')
    .split(/[^\p{L}\p{N}]+/u)
    .map((t) => t.trim())
    .filter(Boolean);

  const freq = new Map();
  const contentFreq = new Map();
  for (const t of tokens) {
    const n = normalize(t);
    if (!n || n.length < 2) continue;
    freq.set(n, (freq.get(n) || 0) + 1);
    if (!STOP.has(n)) contentFreq.set(n, (contentFreq.get(n) || 0) + 1);
  }

  const sorted = (m) =>
    [...m.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pt'));

  const all = sorted(freq);
  const content = sorted(contentFreq);
  const base = abs.replace(/\.json$/i, '');
  const catalog = {
    source: {
      videoId: raw.videoId || null,
      url: raw.url || null,
      title: 'TAMARA KLINK RESPONDE PERGUNTAS DOS LEITORES E LEITORAS',
      lang: raw.lang || null,
      segmentCount: raw.segmentCount || (raw.segments || []).length,
      charCount: text.length,
      tokenCount: tokens.length,
      uniqueCount: all.length,
      contentUniqueCount: content.length
    },
    words: all.map(([word, count]) => ({ word, count })),
    contentWords: content.map(([word, count]) => ({ word, count }))
  };

  fs.writeFileSync(base + '-palavras.json', JSON.stringify(catalog, null, 2) + '\n', 'utf8');

  let md = '# Catálogo de palavras — Tamara Klink\n\n';
  md += 'Fonte: ' + (catalog.source.url || path.basename(abs)) + '\n\n';
  md += '- Tokens: ' + catalog.source.tokenCount + '\n';
  md += '- Únicas: ' + catalog.source.uniqueCount + '\n';
  md += '- Conteúdo (sem stopwords): ' + catalog.source.contentUniqueCount + '\n\n';
  md += '## Top 100 (conteúdo)\n\n| # | Palavra | Freq |\n|---|---------|------|\n';
  content.slice(0, 100).forEach((x, i) => {
    md += '| ' + (i + 1) + ' | ' + x[0] + ' | ' + x[1] + ' |\n';
  });
  md += '\n## Todas as palavras únicas (por frequência)\n\n';
  md += all.map((x) => x[0] + ' (' + x[1] + ')').join(', ') + '\n';
  fs.writeFileSync(base + '-palavras.md', md, 'utf8');

  console.log(JSON.stringify(catalog.source, null, 2));
  console.log('TOP20:', content.slice(0, 20).map((x) => x[0] + ':' + x[1]).join(' | '));
  console.log('OK', base + '-palavras.json');
}

main();
