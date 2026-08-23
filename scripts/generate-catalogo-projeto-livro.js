#!/usr/bin/env node
'use strict';

/**
 * Livro-catálogo do laboratório Inspetor BudGanja.
 * HTML de impressão + PDF (mesmo Chrome da apresentação UNIFESP).
 * Uso: node scripts/generate-catalogo-projeto-livro.js
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { printHtmlToPdf } = require('../lib/print-chrome-pdf.js');

const PRINT_HTML = path.join(ROOT, 'info', 'livro-inspetor-budganja-print.html');
const OUT_PDF = path.join(ROOT, 'info', 'livro-inspetor-budganja.pdf');
const SITE = 'https://inspetorbudganja.com.br';

const SERIES_TOPICS = [
  { title: 'Palavras', series: ['palavras-origem'] },
  { title: 'Expressões e ditos', series: ['expressoes-ditos'] },
  { title: 'Artes e cultura', series: ['artes-cultura', 'filmografias'] },
  {
    title: 'Pessoas, legado e formação',
    series: ['pessoas-historia', 'legado-pessoas', 'formacao-academica']
  },
  {
    title: 'Plantas nas inspeções',
    series: ['plantas-medicinais', 'plantas-frutos', 'plantas-derivados-risco']
  },
  {
    title: 'Animais nas inspeções',
    series: ['animais-catalogo', 'animais-producao', 'animais-derivados-risco']
  },
  { title: 'Fungos nas inspeções', series: ['fungos-catalogo'] },
  {
    title: 'Artigos, neurociência e pesquisas',
    series: ['artigos-cientificos', 'neurociencias', 'pesquisa-laboratorio', 'divulgacao-saude']
  },
  {
    title: 'Canais',
    series: [
      'canal-movrecam',
      'canal-canabinall',
      'canal-icl',
      'canal-manual-do-mundo',
      'canal-slivki',
      'canal-zangado',
      'canal-paulinho',
      'canal-bagual',
      'canal-tamaraklink',
      'canal-amyrklink',
      'canal-richard-rasmussen',
      'canal-disneyjr',
      'canal-vevo'
    ]
  },
  { title: 'Jogos e cadernos', series: ['cadernos-jogo'] },
  { title: 'Lojas e plataformas', series: ['loja-streaming', 'loja-dermocosmetico'] },
  {
    title: 'Equipamento e ferramentas (fichas)',
    series: ['verificacao-equipamento', 'guia-ferramenta']
  },
  { title: 'Vida (contos inspecionados)', series: ['vida-contos'] }
];

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function siteUrl(href) {
  if (!href) return SITE + '/';
  if (/^https?:/i.test(href)) return href;
  return SITE + (href.charAt(0) === '/' ? href : '/' + href);
}

function comparePt(a, b) {
  return String(a || '').localeCompare(String(b || ''), 'pt');
}

function renderLinkList(items, labelFn, hrefFn) {
  if (!items.length) return '<p class="muted">Nada neste tópico.</p>';
  const rows = items
    .slice()
    .sort((a, b) => comparePt(labelFn(a), labelFn(b)))
    .map((item) => {
      return (
        '<li><a href="' +
        escapeHtml(siteUrl(hrefFn(item))) +
        '">' +
        escapeHtml(labelFn(item)) +
        '</a></li>'
      );
    })
    .join('\n');
  return '<ul class="ficha-list">' + rows + '</ul>';
}

function renderPostList(items) {
  if (!items.length) return '<p class="muted">Nenhuma ficha nesta sala.</p>';
  const rows = items
    .slice()
    .sort((a, b) => {
      const oa = Number(a.seriesOrder);
      const ob = Number(b.seriesOrder);
      if (Number.isFinite(oa) && Number.isFinite(ob) && oa !== ob) return oa - ob;
      return comparePt(a.title, b.title);
    })
    .map((post) => {
      const cap = Number.isFinite(Number(post.seriesOrder))
        ? 'Cap. ' + post.seriesOrder + ' · '
        : '';
      const href = siteUrl(post.url || '/posts/post-' + post.slug + '.html');
      return (
        '<li><a href="' +
        escapeHtml(href) +
        '">' +
        escapeHtml(cap + (post.title || post.slug)) +
        '</a></li>'
      );
    })
    .join('\n');
  return '<ol class="ficha-list">' + rows + '</ol>';
}

function printCss() {
  return `@page { size: A4; margin: 18mm 16mm 20mm 16mm; }
@page :first { margin: 0; }
* { box-sizing: border-box; }
body {
  margin: 0;
  font-family: "Palatino Linotype", "Book Antiqua", Georgia, "Segoe UI", serif;
  font-size: 10pt;
  line-height: 1.42;
  color: #1a1f14;
  background: #fff;
}
a { color: #3d4d12; text-decoration: none; }
.cover {
  min-height: 297mm;
  padding: 42mm 22mm 28mm;
  background: #1a1f14;
  color: #f4f1e6;
  page-break-after: always;
}
.cover .eyebrow {
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 9pt;
  color: #c5d08a;
  margin: 0 0 18px;
  font-family: "Segoe UI", Arial, sans-serif;
}
.cover h1 { font-size: 32pt; line-height: 1.12; margin: 0 0 12px; }
.cover .subtitle { font-size: 13pt; color: #e4e0d0; margin: 0 0 28px; max-width: 140mm; }
.cover .meta { font-size: 9.5pt; color: #c5d08a; font-family: "Segoe UI", Arial, sans-serif; }
.cover .valeu { margin-top: 48mm; font-size: 14pt; color: #e8d48a; }
.page { max-width: 180mm; margin: 0 auto; }
.dedication {
  page-break-after: always;
  min-height: 240mm;
  padding-top: 36mm;
  text-align: center;
}
.dedication h2 {
  font-size: 11pt;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #5a6b1a;
  margin: 0 0 28px;
}
.dedication p { font-size: 12pt; line-height: 1.55; max-width: 130mm; margin: 0 auto 14px; }
.dedication .especial { font-size: 13.5pt; font-style: italic; margin-top: 22px; }
.dedication .field-note {
  margin-top: 28px;
  font-size: 8.5pt;
  color: #555;
  font-family: "Segoe UI", Arial, sans-serif;
  font-style: normal;
}
.dedication .valeu { margin-top: 36px; font-size: 13pt; color: #3d4d12; }
h1.chap {
  font-size: 18pt;
  color: #1a1f14;
  border-bottom: 2.5px solid #5a6b1a;
  padding-bottom: 6px;
  margin: 0 0 10px;
  page-break-before: always;
  page-break-after: avoid;
}
h1.chap.toc-title { page-break-before: auto; }
h2.topic {
  font-size: 12pt;
  color: #3d4d12;
  border-bottom: 1px solid #c5d08a;
  padding-bottom: 3px;
  margin: 16px 0 8px;
  page-break-after: avoid;
}
p.lead { margin: 0 0 10px; }
.muted { color: #555; font-size: 9pt; }
.toc { page-break-after: always; }
.toc ol { list-style: none; padding: 0; margin: 0; }
.toc > ol > li { margin: 0 0 10px; }
.toc .chap-line { font-weight: 700; font-size: 11pt; }
.toc .topics { margin: 4px 0 0 14px; font-size: 9.5pt; color: #333; }
.stats { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 10px 0 14px; }
.stat {
  border: 1px solid #c5d08a;
  background: #f7f9ef;
  padding: 8px 10px;
  page-break-inside: avoid;
}
.stat strong { display: block; font-size: 16pt; color: #3d4d12; }
.ficha-list {
  columns: 2;
  column-gap: 14px;
  margin: 0 0 10px;
  padding-left: 1.15em;
  font-size: 8.4pt;
  font-family: "Segoe UI", Arial, sans-serif;
}
.ficha-list li { break-inside: avoid; margin-bottom: 2px; }
.box {
  border: 1px solid #c5d08a;
  background: #f7f9ef;
  padding: 8px 10px;
  margin: 8px 0 12px;
  page-break-inside: avoid;
}
.colophon { page-break-before: always; padding-top: 24mm; font-size: 9.5pt; color: #444; }
.colophon h2 { color: #5a6b1a; font-size: 12pt; }`;
}

function buildHtml() {
  const posts = readJson('posts.json').filter((post) => post.published !== false);
  const pages = readJson('content/pages.json');
  const plants = (readJson('content/plantas.json').plants || []);
  const animals = (readJson('content/animais.json').animals || []);
  const fungi = (readJson('content/fungos.json').fungi || []);
  const poems = (readJson('content/vida-poemas.json').poems || []);
  const tracks = (readJson('radio/playlist.json').tracks || []);

  const usedSeries = new Set();
  SERIES_TOPICS.forEach((topic) => topic.series.forEach((key) => usedSeries.add(key)));
  const leftoverPosts = posts.filter((post) => post.series && !usedSeries.has(post.series));
  const orphanPosts = posts.filter((post) => !post.series);

  const pageRooms = Object.keys(pages)
    .filter((key) => !/admin/i.test(key))
    .map((key) => {
      const page = pages[key];
      let href = '/' + key.replace(/index\.html$/i, '').replace(/\\/g, '/');
      if (href === '/') {
        /* home */
      } else if (!href.endsWith('/') && !href.endsWith('.html')) {
        href += '/';
      }
      return { label: page.label || page.title || key, href: href };
    })
    .sort((a, b) => comparePt(a.label, b.label));

  const tools = [
    { title: 'Super Calc (VPD, DLI, pH, EC…)', href: '/calculadoras/cultivo-lab.html' },
    { title: 'Luxímetro', href: '/calculadoras/luximetro.html' },
    { title: 'Super Solo', href: '/calculadoras/super-solo.html' },
    { title: 'Hub de ferramentas', href: '/calculadoras/' }
  ];
  const gear = [
    { title: 'Clonadora 6 estacas', href: '/equipamentos/clonadora-6-estacas.html' },
    { title: 'Clonadora 12 estacas', href: '/equipamentos/clonadora-12-estacas.html' },
    { title: 'Manual da clonadora', href: '/equipamentos/manual-clonadora.html' },
    { title: 'Manual da hidroclonadora', href: '/equipamentos/manual-hidrocloradora.html' },
    { title: 'Objectos', href: '/objetos/' },
    { title: 'Equipamentos', href: '/equipamentos/' }
  ];
  const rooms = [
    { title: 'Biblioteca', href: '/biblioteca/' },
    { title: 'Inspeções', href: '/biblioteca/inspecoes/' },
    { title: 'UNIFESP · XIV Curso', href: '/biblioteca/unifesp/' },
    { title: 'Rascunhos das aulas (Livro XIV)', href: '/biblioteca/unifesp/livro-xiv.html' },
    { title: 'Cadernos de engenharia', href: '/biblioteca/cadernos/' },
    { title: 'Pesquisas', href: '/biblioteca/pesquisas/' },
    { title: 'Guia de Palavras', href: '/guia/palavras.html' },
    { title: 'Guia de cultivo básico', href: '/guia/cultivo-basico.html' },
    { title: 'Plantas', href: '/plantas/' },
    { title: 'Animais', href: '/animais/' },
    { title: 'Fungos', href: '/fungos/' },
    { title: 'Vida', href: '/vida/' },
    { title: 'Diário Vida', href: '/vida/diario/' },
    { title: 'Bom dia, Inverno', href: '/inverno/' },
    { title: 'Origami', href: '/origami/' },
    { title: 'Barquinho de papel', href: '/origami/barquinho-de-papel/' },
    { title: 'Cultivo / diário de pesquisas', href: '/cultivo/' },
    { title: 'Vídeos', href: '/videos/' },
    { title: 'Jogos', href: '/jogos/' },
    { title: 'Rádio', href: '/radio/' },
    { title: 'Comunidade (Feed Vivo)', href: '/comunidade/' },
    { title: 'Apresentação UNIFESP', href: '/info/apresentacao-unifesp.html' },
    { title: 'Sobre', href: '/info/sobre.html' }
  ];

  const generatedAt = new Date().toISOString().slice(0, 10);
  const inspectionTopics = SERIES_TOPICS.map((topic) => ({
    title: topic.title,
    items: posts.filter((post) => topic.series.indexOf(post.series) >= 0)
  }));
  if (leftoverPosts.length) {
    inspectionTopics.push({ title: 'Outras inspeções', items: leftoverPosts });
  }
  if (orphanPosts.length) {
    inspectionTopics.push({ title: 'Sem série', items: orphanPosts });
  }

  const toc = [
    { n: 'I', title: 'Dedicatória', topics: ['Ao XIV Curso', 'Em especial: Profa. Dra. Eliana Rodrigues'] },
    { n: 'II', title: 'Como ler este livro', topics: ['O que é', 'O que não é', 'Números do laboratório'] },
    { n: 'III', title: 'Mapa das salas', topics: ['Salas vivas', 'Páginas do site'] },
    { n: 'IV', title: 'Biblioteca e UNIFESP', topics: ['Hubs', 'Curso, SIEX, crédito'] },
    { n: 'V', title: 'Catálogo vivo — Plantas', topics: [plants.length + ' fichas'] },
    { n: 'VI', title: 'Catálogo vivo — Animais', topics: [animals.length + ' fichas'] },
    { n: 'VII', title: 'Catálogo vivo — Fungos', topics: [fungi.length + ' fichas'] },
    {
      n: 'VIII',
      title: 'Inspeções',
      topics: inspectionTopics.map((topic) => topic.title + ' (' + topic.items.length + ')')
    },
    { n: 'IX', title: 'Ferramentas, equipamentos e cultivo', topics: ['Calculadoras', 'Equipamentos', 'Diário'] },
    { n: 'X', title: 'Vida, poemas, Inverno e origami', topics: [poems.length + ' poemas'] },
    { n: 'XI', title: 'Vídeos, jogos, rádio e comunidade', topics: [tracks.length + ' faixas na rádio'] },
    { n: 'XII', title: 'Colofão', topics: ['Independência', 'Valeu !!!'] }
  ];

  const tocHtml = toc
    .map((chapter) => {
      const topics = (chapter.topics || []).map(escapeHtml).join(' · ');
      return (
        '<li><span class="chap-line">Capítulo ' +
        chapter.n +
        ' — ' +
        escapeHtml(chapter.title) +
        '</span>' +
        (topics ? '<div class="topics">' + topics + '</div>' : '') +
        '</li>'
      );
    })
    .join('\n');

  const inspectionHtml = inspectionTopics
    .map((topic) => {
      return (
        '<h2 class="topic">' +
        escapeHtml(topic.title) +
        ' <span class="muted">(' +
        topic.items.length +
        ')</span></h2>\n' +
        renderPostList(topic.items)
      );
    })
    .join('\n');

  const elianaHref = siteUrl('/posts/post-inspecao-eliana-rodrigues.html');
  const plantLabel = (item) =>
    (item.nomePopular || item.slug || '') + (item.nomeCientifico ? ' — ' + item.nomeCientifico : '');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Livro do laboratório — Inspetor BudGanja</title>
  <style>${printCss()}</style>
</head>
<body>
  <section class="cover">
    <p class="eyebrow">Laboratório digital · livro-catálogo</p>
    <h1>Inspetor BudGanja</h1>
    <p class="subtitle">O projecto inteiro, em capítulos e tópicos — um mapa para estudar, não um tratado clínico.</p>
    <p class="meta">
      ${escapeHtml(generatedAt)} · ${posts.length} inspeções · ${plants.length} plantas · ${animals.length} animais · ${fungi.length} fungos<br>
      ${escapeHtml(SITE)}
    </p>
    <p class="valeu">Valeu !!!</p>
  </section>

  <div class="page">
    <section class="dedication" id="dedicatoria">
      <h2>Dedicatória</h2>
      <p>
        Ao <strong>XIV Curso de Extensão sobre o uso terapêutico da
        <em>Cannabis sativa</em> L.</strong><br>
        UNIFESP · MovReCam · SIEX
      </p>
      <p>
        Com respeito a todas as professoras e professores,
        à coordenação, à vice-coordenação e a quem sustenta
        a extensão pública.
      </p>
      <p class="especial">
        Em especial à <strong>Profa. Dra. Eliana Rodrigues</strong> —
        coordenação RTC, CEE, curadoria CANABinALL —
        pelo ofício de ensinar com método e crédito.
      </p>
      <p class="field-note">
        Pedido de campo: <em>Heliana Rodrigues</em>.
        A ficha canónica do laboratório corta o nome:
        <a href="${escapeHtml(elianaHref)}">Eliana Rodrigues</a>.
        Não se inventa uma professora nova; honra-se a que já ensina o curso.
      </p>
      <p>
        Este livro não pede afiliação nem endosso da Universidade.
        É o mapa de um aluno.
      </p>
      <p class="valeu">Valeu !!!</p>
    </section>

    <section class="toc">
      <h1 class="chap toc-title">Sumário</h1>
      <p class="lead">Capítulos e tópicos. A ordem do PDF é esta.</p>
      <ol>${tocHtml}</ol>
    </section>

    <h1 class="chap">Capítulo II — Como ler este livro</h1>
    <h2 class="topic">O que é</h2>
    <p>Catálogo do laboratório Inspetor BudGanja: salas, fichas e URLs. Cada linha aponta para a página viva.</p>
    <h2 class="topic">O que não é</h2>
    <div class="box">
      Não é manual clínico, farmacêutico ou jurídico. Não substitui SIEX, aulas oficiais nem certificado.
      Não é o texto integral de cada inspeção — isso vive no HTML. Aqui está o <strong>índice do ofício</strong>.
    </div>
    <h2 class="topic">Números do laboratório</h2>
    <div class="stats">
      <div class="stat"><strong>${posts.length}</strong>inspeções</div>
      <div class="stat"><strong>${plants.length}</strong>plantas</div>
      <div class="stat"><strong>${animals.length}</strong>animais</div>
      <div class="stat"><strong>${fungi.length}</strong>fungos</div>
      <div class="stat"><strong>${poems.length}</strong>poemas Vida</div>
      <div class="stat"><strong>${pageRooms.length}</strong>páginas-hub</div>
    </div>

    <h1 class="chap">Capítulo III — Mapa das salas</h1>
    <h2 class="topic">Salas vivas</h2>
    ${renderLinkList(rooms, (item) => item.title, (item) => item.href)}
    <h2 class="topic">Páginas do site (sem admin)</h2>
    ${renderLinkList(pageRooms, (item) => item.label, (item) => item.href)}

    <h1 class="chap">Capítulo IV — Biblioteca e UNIFESP</h1>
    <p class="lead">
      Hub: <a href="${escapeHtml(siteUrl('/biblioteca/'))}">/biblioteca/</a> ·
      Curso: <a href="${escapeHtml(siteUrl('/biblioteca/unifesp/'))}">/biblioteca/unifesp/</a> ·
      Apresentação: <a href="${escapeHtml(siteUrl('/info/apresentacao-unifesp.html'))}">/info/apresentacao-unifesp.html</a>
    </p>
    <p>
      Título oficial: XIV Curso sobre o uso terapêutico da <em>Cannabis sativa</em> L.
      Coordenação RTC: Profa. Dra. Eliana Rodrigues.
      Independência editorial: o laboratório não reivindica marca nem endosso da UNIFESP.
    </p>

    <h1 class="chap">Capítulo V — Catálogo vivo: Plantas</h1>
    <p class="muted">${plants.length} fichas educacionais. Não substituem consulta.</p>
    ${renderLinkList(plants, plantLabel, (item) => '/plantas/' + (item.slug || item.id) + '/')}

    <h1 class="chap">Capítulo VI — Catálogo vivo: Animais</h1>
    <p class="muted">${animals.length} fichas. Corte: animal ≠ derivado industrial.</p>
    ${renderLinkList(animals, plantLabel, (item) => '/animais/' + (item.slug || item.id) + '/')}

    <h1 class="chap">Capítulo VII — Catálogo vivo: Fungos</h1>
    <p class="muted">${fungi.length} fichas. Identificação — não é cultivo nem dose.</p>
    ${renderLinkList(fungi, plantLabel, (item) => '/fungos/' + (item.slug || item.id) + '/')}

    <h1 class="chap">Capítulo VIII — Inspeções</h1>
    <p class="lead">${posts.length} fichas publicadas, cortadas por série.</p>
    ${inspectionHtml}

    <h1 class="chap">Capítulo IX — Ferramentas, equipamentos e cultivo</h1>
    <h2 class="topic">Calculadoras</h2>
    ${renderLinkList(tools, (item) => item.title, (item) => item.href)}
    <h2 class="topic">Equipamentos e objectos</h2>
    ${renderLinkList(gear, (item) => item.title, (item) => item.href)}
    <h2 class="topic">Diário de pesquisas</h2>
    <p><a href="${escapeHtml(siteUrl('/cultivo/'))}">/cultivo/</a> — registo, roteiro e plano. Públicas: <a href="${escapeHtml(siteUrl('/biblioteca/pesquisas/'))}">/biblioteca/pesquisas/</a>.</p>

    <h1 class="chap">Capítulo X — Vida, poemas, Inverno e origami</h1>
    <h2 class="topic">Poemas do laboratório</h2>
    ${renderLinkList(poems, (item) => item.title || item.slug, (item) => item.inspectionHref || '/vida/')}
    <h2 class="topic">Salas irmãs</h2>
    <ul class="ficha-list">
      <li><a href="${escapeHtml(siteUrl('/vida/'))}">Vida — conto familiar</a></li>
      <li><a href="${escapeHtml(siteUrl('/inverno/'))}">Bom dia, Inverno — Tamara Klink</a></li>
      <li><a href="${escapeHtml(siteUrl('/origami/'))}">Origami</a></li>
      <li><a href="${escapeHtml(siteUrl('/origami/barquinho-de-papel/'))}">Barquinho de papel</a></li>
    </ul>

    <h1 class="chap">Capítulo XI — Vídeos, jogos, rádio e comunidade</h1>
    <h2 class="topic">Rádio</h2>
    ${renderLinkList(tracks, (item) => item.title || item.id, () => '/radio/')}
    <h2 class="topic">Salas</h2>
    <ul class="ficha-list">
      <li><a href="${escapeHtml(siteUrl('/videos/'))}">Vídeos</a></li>
      <li><a href="${escapeHtml(siteUrl('/jogos/'))}">Jogos</a></li>
      <li><a href="${escapeHtml(siteUrl('/comunidade/'))}">Feed Vivo</a></li>
    </ul>

    <section class="colophon">
      <h2>Capítulo XII — Colofão</h2>
      <p>
        Gerado em ${escapeHtml(generatedAt)} a partir dos JSON vivos do repositório,
        com o mesmo gerador de PDF da apresentação UNIFESP (Chrome headless).
      </p>
      <p>
        Independente. Educacional. Sem afiliação comercial à UNIFESP.
        Crédito a quem ensina — em especial à Profa. Dra. Eliana Rodrigues e ao XIV Curso.
      </p>
      <p><strong>Valeu !!!</strong></p>
    </section>
  </div>
</body>
</html>`;
}

function main() {
  const html = buildHtml();
  fs.mkdirSync(path.dirname(PRINT_HTML), { recursive: true });
  fs.writeFileSync(PRINT_HTML, html, 'utf8');
  console.log('HTML do livro:', path.relative(ROOT, PRINT_HTML), '(' + Math.round(html.length / 1024) + ' KB)');
  printHtmlToPdf(PRINT_HTML, OUT_PDF, { timeout: 180000 });
}

main();
