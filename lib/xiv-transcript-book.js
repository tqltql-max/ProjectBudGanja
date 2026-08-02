'use strict';

/**
 * Rascunhos das aulas XIV — legendas PT (MovReCam / UNIFESP).
 * Página pública: biblioteca/unifesp/livro-xiv.html (URL estável).
 */

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');

const TRANSCRIPTS_DIR = path.join(ROOT, 'content', 'transcripts', 'xiv');
const MANIFEST_FILE = path.join(TRANSCRIPTS_DIR, 'manifest.json');
const BOOK_MD = path.join(ROOT, 'content', 'livros', 'xiv-curso-unifesp.md');
const BOOK_HTML = path.join(ROOT, 'biblioteca', 'unifesp', 'livro-xiv.html');

function aulaNumber(title) {
  const m = String(title || '').match(/(\d+)\s*ª?\s*Aula|Aula\s+(\d+)/i);
  if (!m) return 999;
  return Number(m[1] || m[2] || 999);
}

function shortHeading(title) {
  const t = String(title || '').trim();
  const m = t.match(/(\d+)\s*ª?\s*Aula[^-\u2013\u2014|]*/i);
  if (m) {
    const rest = t
      .replace(/^.*?\d+\s*ª?\s*Aula\s*[-–—:]?\s*/i, '')
      .replace(/\s+/g, ' ')
      .trim();
    return (m[0].replace(/\s+/g, ' ').trim() + (rest ? ' — ' + rest : '')).slice(0, 160);
  }
  return t.slice(0, 160);
}

function loadXivVideosFromHub() {
  const hubPath = path.join(ROOT, 'content', 'videos-hub.json');
  const hub = JSON.parse(fs.readFileSync(hubPath, 'utf8'));
  const list = (hub.videos || []).filter(
    (v) => v.channel === 'movrecam' && (v.series || []).includes('xiv')
  );
  const byId = new Map();
  list.forEach((v) => {
    if (v && v.id) byId.set(v.id, v);
  });
  return Array.from(byId.values()).sort((a, b) => {
    const na = aulaNumber(a.title);
    const nb = aulaNumber(b.title);
    if (na !== nb) return na - nb;
    return String(a.published || '').localeCompare(String(b.published || ''));
  });
}

function cleanCaptionText(segments) {
  const parts = [];
  let prev = '';
  for (let i = 0; i < segments.length; i++) {
    let text = String((segments[i] && segments[i].text) || '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!text) continue;
    if (/^\[(música|applause|music|inaudível|risos)\]$/i.test(text)) continue;
    if (text === prev) continue;
    prev = text;
    parts.push(text);
  }
  let joined = parts.join(' ');
  joined = joined
    .replace(/\s+([,.!?;:])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  // Quebras leves em frases longas
  const sentences = joined.split(/(?<=[.!?])\s+/);
  const paragraphs = [];
  let buf = [];
  for (let i = 0; i < sentences.length; i++) {
    buf.push(sentences[i]);
    if (buf.length >= 4 || i === sentences.length - 1) {
      paragraphs.push(buf.join(' '));
      buf = [];
    }
  }
  return paragraphs.filter(Boolean).join('\n\n');
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function ensureDirs() {
  fs.mkdirSync(TRANSCRIPTS_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(BOOK_MD), { recursive: true });
  fs.mkdirSync(path.dirname(BOOK_HTML), { recursive: true });
}

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
  } catch (e) {
    return null;
  }
}

function buildBookFromManifest(manifest) {
  const chapters = (manifest && manifest.chapters) || [];
  const ok = chapters.filter((c) => c.status === 'ok');
  const failed = chapters.filter((c) => c.status !== 'ok');

  const mdChapters = ok
    .map((c) => {
      const body = c.body || '';
      return `## ${c.heading}

> Aula ${c.aulaNumber} · [${c.videoId}](https://www.youtube.com/watch?v=${c.videoId}) · ~${c.charCount || body.length} caracteres · idioma ${c.lang || 'pt'}

${body}
`;
    })
    .join('\n\n---\n\n');

  const md = `# XIV Curso UNIFESP — Rascunhos das aulas

**Rascunhos** a partir das legendas das aulas da XIV edição (MovReCam), compilados pelo Inspetor BudGanja para estudo. Não é um livro oficial — é material de rascunho / revisão.

> **Aviso:** conteúdo educacional. As legendas vêm do YouTube (muitas vezes **automáticas**) e podem conter erros. **Não** é publicação oficial da UNIFESP nem do MovReCam. Todo o mérito das aulas pertence aos professores e ao MovReCam. **Não substitui** a frequência no SIEX nem aconselhamento clínico/jurídico. Uso preferencial: estudo pessoal / rascunho das aulas.

| Campo | Valor |
|-------|-------|
| Edição | XIV · 16/06/2026–12/11/2026 |
| Canal | [MovReCam](https://www.youtube.com/@MovReCam) |
| Tipo | Rascunhos das aulas (legendas) |
| Vídeos com legenda | **${ok.length}** / ${chapters.length} |
| Gerado em | ${manifest.builtAt || new Date().toISOString()} |
| Hub de vídeos | [/videos/?channel=movrecam&series=xiv](/videos/?channel=movrecam&series=xiv) |

## Índice das aulas

${ok.map((c) => `- [Aula ${c.aulaNumber} — ${c.heading.replace(/^.*?—\s*/, '')}](#aula-${c.aulaNumber})`).join('\n')}
${failed.length ? '\n### Sem legenda\n\n' + failed.map((c) => `- Aula ${c.aulaNumber}: ${c.title} — ${c.error || 'falhou'}`).join('\n') : ''}

---

${mdChapters}
`;

  const htmlChapters = ok
    .map((c) => {
      const paras = String(c.body || '')
        .split(/\n\n+/)
        .map((p) => '<p>' + escapeHtml(p) + '</p>')
        .join('\n');
      return `<section class="livro-chapter" id="aula-${c.aulaNumber}">
  <h2>${escapeHtml(c.heading)}</h2>
  <p class="livro-meta">Aula ${c.aulaNumber} · <a href="https://www.youtube.com/watch?v=${escapeHtml(c.videoId)}" rel="noopener noreferrer" target="_blank">YouTube</a> · ~${c.charCount || 0} caracteres · ${escapeHtml(c.lang || 'pt')}</p>
  <div class="livro-body">
${paras}
  </div>
</section>`;
    })
    .join('\n\n');

  const toc = ok
    .map(
      (c) =>
        `<li><a href="#aula-${c.aulaNumber}">Aula ${c.aulaNumber}</a> — ${escapeHtml(
          shortHeading(c.title).replace(/^.*?—\s*/, '') || c.title
        )}</li>`
    )
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Rascunhos das aulas da XIV edição UNIFESP / MovReCam — legendas YouTube para estudo (Inspetor BudGanja).">
    <meta property="og:title" content="Rascunhos das aulas XIV · UNIFESP | Inspetor BudGanja">
    <meta property="og:description" content="Rascunhos a partir das legendas PT das aulas da XIV edição do curso de cannabis medicinal UNIFESP + MovReCam.">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://inspetorbudganja.com.br/biblioteca/unifesp/livro-xiv.html">
    <meta property="og:image" content="https://inspetorbudganja.com.br/imagens/og-default.jpg">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="https://inspetorbudganja.com.br/biblioteca/unifesp/livro-xiv.html">
    <meta name="robots" content="noindex,follow">
    <link rel="icon" href="/imagens/favicon-32.v313.png" sizes="32x32" type="image/png">
    <link rel="manifest" href="/manifest.json?v=313">
    <meta name="theme-color" content="#a68628">
    <link rel="stylesheet" href="/css/style.css?v=313">
    <title>Rascunhos das aulas XIV · UNIFESP | Inspetor BudGanja</title>
    <style>
      .livro-page { max-width: 42rem; }
      .livro-toc { margin: 1.5rem 0 2rem; }
      .livro-chapter { margin: 2.5rem 0; padding-top: 0.5rem; border-top: 1px solid rgba(166,134,40,0.25); }
      .livro-meta { font-size: 0.9rem; opacity: 0.85; }
      .livro-body p { margin: 0 0 1rem; line-height: 1.65; }
      @media print {
        .site-header, #site-header, .livro-actions { display: none !important; }
        .livro-chapter { break-inside: avoid; }
      }
    </style>
</head>
<body data-page="unifesp-livro-xiv">
    <div id="site-header"></div>
    <main id="main-content" class="article-page relatorio-container livro-page">
        <header class="article-header">
            <p class="article-eyebrow">Formação · UNIFESP · Rascunhos</p>
            <h1>Rascunhos das aulas — XIV Curso</h1>
            <p class="page-intro">Material de rascunho a partir das legendas das aulas da XIV edição (MovReCam): para revisão e estudo, não um livro oficial.</p>
        </header>

        <aside class="unifesp-disclaimer" role="note">
            <strong>Rascunho / estudo.</strong>
            Texto gerado a partir de legendas (muitas vezes OCR automático do YouTube) — pode ter erros e falhas.
            Não é publicação oficial da UNIFESP ou do MovReCam. Não substitui presença no SIEX nem orientação médica.
            Mérito das aulas: professores convidados e MovReCam.
        </aside>

        <p class="livro-actions">
            <a class="botao botao-outline botao-sm" href="/biblioteca/unifesp/">Hub UNIFESP</a>
            <a class="botao botao-outline botao-sm" href="/videos/?channel=movrecam&amp;series=xiv">Vídeos · XIV</a>
            <a class="botao botao-outline botao-sm" href="/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html">Inspeção do curso</a>
            <button type="button" class="botao botao-outline botao-sm" onclick="window.print()">Imprimir / PDF</button>
        </p>

        <p><strong>${ok.length}</strong> aulas com rascunho (legenda)${failed.length ? ' · <strong>' + failed.length + '</strong> sem legenda' : ''} · gerado ${escapeHtml(
          (manifest.builtAt || '').slice(0, 19).replace('T', ' ')
        )} UTC</p>

        <nav class="livro-toc" aria-label="Índice das aulas">
            <h2>Índice das aulas</h2>
            <ol>
${toc}
            </ol>
        </nav>

${htmlChapters}

        <footer class="info-panel" style="margin-top:3rem">
            <p>Fonte: legendas YouTube · canal <a href="https://www.youtube.com/@MovReCam">@MovReCam</a> · rascunhos compilados pelo Inspetor BudGanja.</p>
            <p><a href="/biblioteca/unifesp/">← Voltar ao hub UNIFESP</a></p>
        </footer>
    </main>
    <div id="site-footer"></div>
    <script src="/js/layout.js?v=313"></script>
</body>
</html>
`;

  return { md, html, okCount: ok.length, failCount: failed.length };
}

module.exports = {
  TRANSCRIPTS_DIR,
  MANIFEST_FILE,
  BOOK_MD,
  BOOK_HTML,
  aulaNumber,
  shortHeading,
  loadXivVideosFromHub,
  cleanCaptionText,
  ensureDirs,
  readManifest,
  buildBookFromManifest
};
