'use strict';

const fs = require('fs');
const path = require('path');
const { readPostsFrom } = require('../lib/publish-static.js');
const { ROOT } = require('../lib/paths.js');
const OUT = path.join(ROOT, 'search-index.json');

const { CALCULADORAS, getCalculadoraUrl } = require('../lib/calculadoras-registry.js');

const STATIC_PAGES = [
  { url: '/', title: 'Início', desc: 'Laboratório digital de cultivo vegetal', keywords: 'home laboratório' },
  { url: '/biblioteca/inspecoes/', title: 'Inspeções — Guia de Cultivo Básico', desc: 'Série de inspeções com relatórios e vídeos @InspetorBudGanja', keywords: 'guia cultivo inspeção vídeo' },
  { url: '/biblioteca/pesquisas/', title: 'Pesquisas', desc: 'Relatórios e estudos técnicos', keywords: 'pesquisa relatório' },
  { url: '/biblioteca/inspecoes/', title: 'Inspeções', desc: 'Verificações de campo e inspeções técnicas', keywords: 'inspeção campo' },
  { url: '/equipamentos/', title: 'Equipamentos', desc: 'Manuais caseiros e equipamentos documentados', keywords: 'equipamento caseiro manual clonadora' },
  { url: '/loja/', title: 'Loja parceira', desc: 'Materiais das clonadoras na vitrine Magazine Inspetor BudGanja (Magalu)', keywords: 'loja clonadora bombinha bucha balde bomba aspersor feltro magazine luiza magalu influenciador' },
  { url: '/calculadoras/', title: 'Ferramentas', desc: 'Super Calc, luxímetro e Super Solo', keywords: 'ferramentas cultivo vpd dli' },
  ...CALCULADORAS.map((c) => ({
    url: getCalculadoraUrl(c),
    title: c.shortTitle || c.title,
    desc: c.description,
    keywords: c.keywords || c.slug
  })),
  { url: '/sorteios/', title: 'Sorteios', desc: 'Sorteio de inauguração — clonadora aeropônica caseira em breve', keywords: 'sorteio inauguração clonadora' },
  { url: '/videos/', title: 'Últimos vídeos', desc: 'Vídeos recentes do canal YouTube', keywords: 'youtube vídeo canal' },
  { url: '/info/sobre.html', title: 'Sobre', desc: 'Propósito e metodologia do projeto', keywords: 'sobre missão' },
  { url: '/info/contato.html', title: 'Contato', desc: 'E-mail e perguntas frequentes', keywords: 'contato email' },
  { url: '/info/privacidade.html', title: 'Privacidade', desc: 'LGPD e dados de sorteios', keywords: 'privacidade lgpd' },
  { url: '/equipamentos/clonadora-6-estacas.html', title: 'Guia: Clonadora de 6 estacas', desc: 'Pote de sorvete, bucha de louça e bombinha 24 h', keywords: 'clonadora 6 estacas pote sorvete bucha bombinha' },
  { url: '/equipamentos/clonadora-12-estacas.html', title: 'Guia: Clonadora de 12 estacas', desc: 'Balde, bomba submersa, microaspersores e feltro', keywords: 'clonadora 12 estacas balde aspersor bomba submersa feltro' },
  { url: '/equipamentos/manual-clonadora.html', title: 'Clonadoras (redirecionamento)', desc: 'Redireciona para a lista de equipamentos', keywords: 'clonadora' },
  { url: '/equipamentos/manual-hidrocloradora.html', title: 'Clonadora de 12 estacas (redirecionamento)', desc: 'Redireciona para o guia de 12 estacas', keywords: 'clonadora hidro' },
  { url: '/biblioteca/pesquisas/substratos.html', title: 'Pesquisa: Substratos', desc: 'Relatório sobre substratos biodegradáveis', keywords: 'substrato pesquisa' }
];

function buildIndex() {
  const items = STATIC_PAGES.map((p) => ({
    title: p.title,
    url: p.url,
    excerpt: p.desc,
    text: [p.title, p.desc, p.keywords].join(' ')
  }));

  const posts = readPostsFrom(ROOT).filter((p) => p.published !== false);
  posts.forEach((p) => {
    const url = p.url || (p.filename ? '/' + String(p.filename).replace(/^\/+/, '') : '');
    items.push({
      title: p.title || '',
      url,
      excerpt: p.excerpt || '',
      text: [p.title, p.excerpt, p.category, p.content_raw].filter(Boolean).join(' ').slice(0, 2000)
    });
  });

  try {
    const { GUIA_INSPECOES_POSTS } = require('../lib/guia-inspecoes-posts.js');
    GUIA_INSPECOES_POSTS.forEach((post) => {
      const url = post.url || (post.filename ? '/' + String(post.filename).replace(/^\/+/, '') : '');
      items.push({
        title: post.title,
        url,
        excerpt: post.excerpt || '',
        text: [post.title, post.excerpt, post.content_raw, 'guia cultivo básico inspeção'].join(' ').slice(0, 2000)
      });
    });
  } catch (e) { /* optional */ }

  fs.writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2), 'utf8');
  console.log('search-index.json:', items.length, 'itens');
}

buildIndex();
