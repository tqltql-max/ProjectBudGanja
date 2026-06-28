/* Markdown renderer (mirrors lib/markdown-render.js for admin preview) */
function mdInlineFormat(text) {
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

function renderMarkdownPreview(md) {
  if (!md) return '';
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let buf = [];
  let inCode = false;
  let codeBuf = [];
  let listType = null;
  let listBuf = [];

  function flushParagraph() {
    if (!buf.length) return;
    if (buf.length === 1 && typeof renderYouTubeLine === 'function') {
      const embed = renderYouTubeLine(buf[0]);
      if (embed) {
        out.push(embed);
        buf = [];
        return;
      }
    }
    out.push('<p>' + buf.map(mdInlineFormat).join('<br>') + '</p>');
    buf = [];
  }

  function flushList() {
    if (!listBuf.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    out.push('<' + tag + '>' + listBuf.map((i) => '<li>' + mdInlineFormat(i) + '</li>').join('') + '</' + tag + '>');
    listBuf = [];
    listType = null;
  }

  for (const raw of lines) {
    const ln = raw;

    if (/^```/.test(ln)) {
      flushParagraph();
      flushList();
      if (inCode) {
        out.push('<pre><code>' + codeBuf.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>');
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) { codeBuf.push(ln); continue; }

    if (typeof renderYouTubeLine === 'function') {
      const youtubeBlock = renderYouTubeLine(ln);
      if (youtubeBlock) {
        flushParagraph();
        flushList();
        out.push(youtubeBlock);
        continue;
      }
    }

    if (/^#{1,6}\s+/.test(ln)) {
      flushParagraph(); flushList();
      const m = ln.match(/^(#{1,6})\s+(.*)$/);
      out.push('<h' + m[1].length + '>' + mdInlineFormat(m[2]) + '</h' + m[1].length + '>');
      continue;
    }

    if (/^>\s+/.test(ln)) {
      flushParagraph(); flushList();
      out.push('<blockquote><p>' + mdInlineFormat(ln.replace(/^>\s+/, '')) + '</p></blockquote>');
      continue;
    }

    if (/^\s*[-*]\s+/.test(ln)) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      listBuf.push(ln.replace(/^\s*[-*]\s+/, ''));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(ln)) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      listBuf.push(ln.replace(/^\s*\d+\.\s+/, ''));
      continue;
    }

    if (/^\s*$/.test(ln)) { flushParagraph(); flushList(); continue; }

    flushList();
    buf.push(ln);
  }

  flushParagraph();
  flushList();
  return out.join('\n');
}

function formatDatePtBR(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch (e) {
    return iso;
  }
}
