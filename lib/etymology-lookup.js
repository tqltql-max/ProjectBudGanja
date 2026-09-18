'use strict';

const { lookupLabEtymology, variantsOf } = require('./etymology-lab.js');

const UA = 'InspetorBudGanja/1.0 (https://inspetorbudganja.com.br/; etymology lookup)';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX = 200;
const cache = new Map();

function sanitizeWord(word) {
  const w = String(word || '').replace(/\s+/g, ' ').trim();
  if (!w || w.length > 48) return '';
  if (!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’\- ]*$/.test(w)) return '';
  return w;
}

function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return hit.value;
}

function cacheSet(key, value) {
  if (cache.size >= CACHE_MAX) {
    const first = cache.keys().next().value;
    if (first != null) cache.delete(first);
  }
  cache.set(key, { at: Date.now(), value: value });
}

function decodeEntities(text) {
  return String(text || '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, function (_, n) {
      return String.fromCharCode(Number(n));
    });
}

function stripHtml(html) {
  return decodeEntities(String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<sup[^>]*class="[^"]*reference[^"]*"[\s\S]*?<\/sup>/gi, ' ')
    .replace(/<span[^>]*class="[^"]*mw-editsection[^"]*"[\s\S]*?<\/span>/gi, ' ')
    .replace(/<[^>]+>/g, ' '));
}

function cleanWikiText(html) {
  let text = stripHtml(html).replace(/\u00a0/g, ' ');
  text = text.replace(/\[\s*(editar|edit|editar código-fonte)\s*\]/gi, '');
  text = text.replace(/^\s*(Etimologia|Etymology(?:\s+\d+)?)\s*/i, '');
  return text.replace(/\s+/g, ' ').trim();
}

function clipEtym(text) {
  if (!text) return '';
  if (text.length <= 420) return text;
  let cut = text.slice(0, 420);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '), cut.lastIndexOf(' — '));
  if (stop > 180) cut = cut.slice(0, stop + 1);
  else {
    const space = cut.lastIndexOf(' ');
    if (space > 180) cut = cut.slice(0, space);
  }
  return cut.replace(/[.,;:\s]+$/, '') + '…';
}

function sectionIsEtym(line) {
  return /etimolog|etymolog|étymolog|origem/i.test(String(line || '').replace(/<[^>]+>/g, ''));
}

function wikiHref(host, title) {
  return 'https://' + host + '/wiki/' + encodeURIComponent(String(title || '').replace(/ /g, '_'));
}

async function fetchWikiJson(host, params) {
  const query = ['origin=*', 'format=json', 'formatversion=2'];
  Object.keys(params).forEach(function (key) {
    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]));
  });
  const res = await fetch('https://' + host + '/w/api.php?' + query.join('&'), {
    headers: { 'User-Agent': UA, Accept: 'application/json' }
  });
  if (!res.ok) throw new Error('wiki ' + res.status);
  return res.json();
}

async function resolveWikiTitle(host, word) {
  const title = sanitizeWord(word);
  if (!title) return '';
  const json = await fetchWikiJson(host, {
    action: 'query',
    titles: title,
    redirects: '1'
  });
  const pages = (json && json.query && json.query.pages) || [];
  const page = pages[0];
  if (page && !page.missing && page.title) return page.title;
  const search = await fetchWikiJson(host, {
    action: 'query',
    list: 'search',
    srsearch: title,
    srnamespace: '0',
    srlimit: '1'
  });
  const hits = (search && search.query && search.query.search) || [];
  return hits[0] && hits[0].title ? hits[0].title : '';
}

async function parseEtymSections(host, title, data) {
  const sections = (data && data.parse && data.parse.sections) || [];
  const indexes = [];
  for (let i = 0; i < sections.length; i++) {
    if (sectionIsEtym(sections[i].line)) indexes.push(String(sections[i].index));
  }
  if (!indexes.length) return '';
  const parts = await Promise.all(indexes.slice(0, 2).map(async function (index) {
    try {
      const json = await fetchWikiJson(host, {
        action: 'parse',
        page: title,
        prop: 'text',
        section: index,
        disableeditsection: '1',
        redirects: '1'
      });
      let html = json && json.parse && json.parse.text;
      if (html && typeof html === 'object') html = html['*'];
      return cleanWikiText(html || '');
    } catch (e) {
      return '';
    }
  }));
  return parts.filter(Boolean).join(' ');
}

async function fetchHostEtymology(host, label, word) {
  const title = await resolveWikiTitle(host, word);
  if (!title) return null;
  const data = await fetchWikiJson(host, {
    action: 'parse',
    page: title,
    prop: 'sections',
    redirects: '1'
  });
  const text = clipEtym(await parseEtymSections(host, title, data));
  if (!text) return null;
  return { text: text, href: wikiHref(host, title), source: label, title: title };
}

async function lookupEtymology(word) {
  const clean = sanitizeWord(word);
  if (!clean) return null;
  const key = clean.toLocaleLowerCase('pt-BR');
  const cached = cacheGet(key);
  if (cached) return cached;

  const lab = lookupLabEtymology(clean);
  if (lab) {
    cacheSet(key, lab);
    return lab;
  }

  const catalogs = [
    { host: 'pt.wiktionary.org', label: 'Wikcionário' },
    { host: 'en.wiktionary.org', label: 'Wiktionary' }
  ];
  const tries = variantsOf(clean).filter(function (item, i, all) {
    return all.indexOf(item) === i && sanitizeWord(item);
  });
  for (let t = 0; t < tries.length; t++) {
    for (let i = 0; i < catalogs.length; i++) {
      try {
        const found = await fetchHostEtymology(catalogs[i].host, catalogs[i].label, tries[t]);
        if (found) {
          cacheSet(key, found);
          return found;
        }
      } catch (e) { /* next catalog */ }
    }
  }
  cacheSet(key, null);
  return null;
}

module.exports = { lookupEtymology, sanitizeWord };
