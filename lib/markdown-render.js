const { renderYouTubeLine } = require('./youtube.js');

function inlineFormat(text) {
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

function splitTableCells(line) {
  let s = String(line || '').trim();
  if (s.startsWith('|')) s = s.slice(1);
  if (s.endsWith('|')) s = s.slice(0, -1);
  return s.split('|').map((c) => c.trim());
}

function isTableSeparator(line) {
  const cells = splitTableCells(line);
  if (!cells.length) return false;
  return cells.every((c) => /^:?-{3,}:?$/.test(c));
}

function isTableRow(line) {
  const t = String(line || '').trim();
  return t.includes('|') && !/^```/.test(t);
}

function renderMarkdown(md) {
  if (!md) return '';
  const lines = md.replace(/\r/g, '').split('\n');
  const out = [];
  let buf = [];
  let inCode = false;
  let codeBuf = [];
  let listType = null;
  let listBuf = [];
  let tableBuf = [];

  function flushParagraph() {
    if (!buf.length) return;
    if (buf.length === 1) {
      const embed = renderYouTubeLine(buf[0]);
      if (embed) {
        out.push(embed);
        buf = [];
        return;
      }
    }
    out.push('<p>' + buf.map(inlineFormat).join('<br>') + '</p>');
    buf = [];
  }

  function flushList() {
    if (!listBuf.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    out.push('<' + tag + '>' + listBuf.map((i) => '<li>' + inlineFormat(i) + '</li>').join('') + '</' + tag + '>');
    listBuf = [];
    listType = null;
  }

  function flushTable() {
    if (tableBuf.length < 2) {
      if (tableBuf.length) {
        buf.push(...tableBuf);
        tableBuf = [];
        flushParagraph();
      }
      return;
    }
    const header = splitTableCells(tableBuf[0]);
    let rowStart = 1;
    if (isTableSeparator(tableBuf[1])) rowStart = 2;
    const bodyRows = tableBuf.slice(rowStart).filter((r) => !isTableSeparator(r));
    const thead =
      '<thead><tr>' +
      header.map((c) => '<th>' + inlineFormat(c) + '</th>').join('') +
      '</tr></thead>';
    const tbody =
      '<tbody>' +
      bodyRows
        .map((row) => {
          const cells = splitTableCells(row);
          while (cells.length < header.length) cells.push('');
          return (
            '<tr>' +
            cells
              .slice(0, header.length)
              .map((c) => '<td>' + inlineFormat(c) + '</td>')
              .join('') +
            '</tr>'
          );
        })
        .join('') +
      '</tbody>';
    out.push('<table>' + thead + tbody + '</table>');
    tableBuf = [];
  }

  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const next = lines[i + 1] || '';

    if (/^```/.test(ln)) {
      flushParagraph();
      flushList();
      flushTable();
      if (inCode) {
        out.push('<pre><code>' + codeBuf.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>');
        codeBuf = [];
        inCode = false;
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(ln);
      continue;
    }

    const youtubeBlock = renderYouTubeLine(ln);
    if (youtubeBlock) {
      flushParagraph();
      flushList();
      flushTable();
      out.push(youtubeBlock);
      continue;
    }

    if (/^#{1,6}\s+/.test(ln)) {
      flushParagraph();
      flushList();
      flushTable();
      const m = ln.match(/^(#{1,6})\s+(.*)$/);
      out.push('<h' + m[1].length + '>' + inlineFormat(m[2]) + '</h' + m[1].length + '>');
      continue;
    }

    if (/^>\s+/.test(ln)) {
      flushParagraph();
      flushList();
      flushTable();
      out.push('<blockquote><p>' + inlineFormat(ln.replace(/^>\s+/, '')) + '</p></blockquote>');
      continue;
    }

    if (tableBuf.length && isTableRow(ln)) {
      tableBuf.push(ln);
      continue;
    }

    if (!tableBuf.length && isTableRow(ln) && isTableSeparator(next)) {
      flushParagraph();
      flushList();
      tableBuf.push(ln);
      continue;
    }

    if (tableBuf.length) {
      flushTable();
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

    if (/^\s*$/.test(ln)) {
      flushParagraph();
      flushList();
      flushTable();
      continue;
    }

    flushList();
    buf.push(ln);
  }

  flushParagraph();
  flushList();
  flushTable();
  if (inCode && codeBuf.length) {
    out.push('<pre><code>' + codeBuf.join('\n').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</code></pre>');
  }

  return out.join('\n');
}

module.exports = { renderMarkdown, inlineFormat };
