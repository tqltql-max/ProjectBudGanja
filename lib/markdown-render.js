const { renderYouTubeLine } = require('./youtube.js');

function inlineFormat(text) {
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

function isTableRow(ln) {
  return /^\s*\|/.test(ln);
}

function isTableSeparator(ln) {
  if (!isTableRow(ln)) return false;
  return parseTableCells(ln).every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseTableCells(ln) {
  return ln
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());
}

function renderTableHtml(rows) {
  if (!rows || rows.length < 2) return '';
  const header = parseTableCells(rows[0]);
  let bodyStart = 1;
  if (rows[1] && isTableSeparator(rows[1])) bodyStart = 2;
  const body = rows.slice(bodyStart).filter((r) => r && !isTableSeparator(r));
  let html = '<div class="post-table-wrap"><table class="post-table"><thead><tr>';
  header.forEach((cell) => {
    html += '<th scope="col">' + inlineFormat(cell) + '</th>';
  });
  html += '</tr></thead><tbody>';
  body.forEach((row) => {
    html += '<tr>';
    parseTableCells(row).forEach((cell) => {
      html += '<td>' + inlineFormat(cell) + '</td>';
    });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
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

  function flushTable() {
    if (!tableBuf.length) return;
    out.push(renderTableHtml(tableBuf));
    tableBuf = [];
  }

  function flushParagraph(skipTable) {
    if (!skipTable) flushTable();
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

  function flushList(skipTable) {
    if (!skipTable) flushTable();
    if (!listBuf.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    out.push('<' + tag + '>' + listBuf.map((i) => '<li>' + inlineFormat(i) + '</li>').join('') + '</' + tag + '>');
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

    if (inCode) {
      codeBuf.push(ln);
      continue;
    }

    if (isTableRow(ln)) {
      flushParagraph(true);
      flushList(true);
      tableBuf.push(ln);
      continue;
    }

    flushTable();

    const youtubeBlock = renderYouTubeLine(ln);
    if (youtubeBlock) {
      flushParagraph();
      flushList();
      out.push(youtubeBlock);
      continue;
    }

    if (/^#{1,6}\s+/.test(ln)) {
      flushParagraph();
      flushList();
      const m = ln.match(/^(#{1,6})\s+(.*)$/);
      out.push('<h' + m[1].length + '>' + inlineFormat(m[2]) + '</h' + m[1].length + '>');
      continue;
    }

    if (/^>\s+/.test(ln)) {
      flushParagraph();
      flushList();
      out.push('<blockquote><p>' + inlineFormat(ln.replace(/^>\s+/, '')) + '</p></blockquote>');
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

    if (/^\s*$/.test(ln)) {
      flushParagraph();
      flushList();
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
