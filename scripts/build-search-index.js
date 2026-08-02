'use strict';

const fs = require('fs');
const path = require('path');
const { readPostsFrom } = require('../lib/publish-static.js');
const { ROOT } = require('../lib/paths.js');
const OUT = path.join(ROOT, 'search-index.json');

const { CALCULADORAS, getCalculadoraUrl } = require('../lib/calculadoras-registry.js');

const STATIC_PAGES = [
  { url: '/', title: 'Início', desc: 'Laboratório de fitoterapia brasileira — plantas medicinais, UNIFESP e cultivo responsável', keywords: 'home fitoterapia plantas' },
  { url: '/plantas/', title: 'Plantas fitoterápicas', desc: 'Catálogo curado de plantas medicinais e fitoterápicas do Brasil', keywords: 'plantas fitoterapia medicinal babosa camomila cannabis' },
  { url: '/animais/', title: 'Animais', desc: 'Catálogo de animais: criação, companhia e derivados industriais de risco', keywords: 'animais produção galinha vaca porco abelha derivados indústria' },
  { url: '/biblioteca/unifesp/', title: 'Curso UNIFESP', desc: 'Hub do XIV curso de extensão UNIFESP sobre cannabis medicinal', keywords: 'unifesp curso cannabis medicinal siex formação' },
  { url: '/biblioteca/inspecoes/', title: 'Inspeções', desc: 'Relatórios técnicos com método verificável — canais, equipamentos e cursos', keywords: 'inspeção auditoria método' },
  { url: '/biblioteca/pesquisas/', title: 'Pesquisas', desc: 'Relatórios e estudos técnicos', keywords: 'pesquisa relatório' },
  { url: '/equipamentos/', title: 'Equipamentos', desc: 'Manuais caseiros e equipamentos documentados', keywords: 'equipamento caseiro manual clonadora' },
  { url: '/calculadoras/', title: 'Ferramentas', desc: 'Super Calc, luxímetro e Super Solo', keywords: 'ferramentas cultivo vpd dli' },
  ...CALCULADORAS.map((c) => ({
    url: getCalculadoraUrl(c),
    title: c.shortTitle || c.title,
    desc: c.description,
    keywords: c.keywords || c.slug
  })),
  { url: '/comunidade/', title: 'Feed Vivo', desc: 'Feed Vivo — fotos e relatos de cultivo vegetal partilhados pelos cultivadores', keywords: 'comunidade feed vivo fotos diário cultivo comentários' },
  { url: '/sorteios/', title: 'Sorteios', desc: 'Sorteio de inauguração — clonadora aeropônica caseira em breve', keywords: 'sorteio inauguração clonadora' },
  { url: '/guia/palavras.html', title: 'Guia de Palavras', desc: 'Glossário simples dos títulos do site e do léxico inspecionado', keywords: 'palavras glossário significado maconha ganja inspetor budganja' },
  { url: '/videos/', title: 'Últimos vídeos', desc: 'Vídeos recentes do canal YouTube', keywords: 'youtube vídeo canal' },
  { url: '/radio/', title: 'BudGanja Radio', desc: 'Playlist BudGanja Radio do laboratório', keywords: 'rádio budganja playlist' },
  { url: '/vida/', title: 'Vida — conto familiar', desc: 'Conto familiar do Laboratório BudGanja: cuidar de plantas com ciência, natureza e amizade', keywords: 'vida conto infantil família plantas semente inspetor dona maria' },
  { url: '/info/sobre.html', title: 'Sobre', desc: 'Propósito e metodologia do projeto', keywords: 'sobre missão fitoterapia' },
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
    const { readPlantas, getPlantUrl } = require('../lib/plantas-service.js');
    const catalog = readPlantas();
    catalog.plants.forEach((plant) => {
      items.push({
        title: plant.nomePopular + (plant.nomeCientifico ? ' (' + plant.nomeCientifico + ')' : ''),
        url: getPlantUrl(plant),
        excerpt: plant.summary || '',
        text: [
          plant.nomePopular,
          plant.nomeCientifico,
          plant.familia,
          plant.summary,
          (plant.tags || []).join(' '),
          (plant.traditionalUses || []).join(' '),
          'planta fitoterapia medicinal'
        ]
          .filter(Boolean)
          .join(' ')
          .slice(0, 2000)
      });
    });
  } catch (e) { /* optional */ }

  try {
    const { readAnimais, getAnimalUrl } = require('../lib/animais-service.js');
    const catalog = readAnimais();
    catalog.animals.forEach((animal) => {
      items.push({
        title: animal.nomePopular + (animal.nomeCientifico ? ' (' + animal.nomeCientifico + ')' : ''),
        url: getAnimalUrl(animal),
        excerpt: animal.summary || '',
        text: [
          animal.nomePopular,
          animal.nomeCientifico,
          animal.familia,
          animal.summary,
          animal.hubCategory || '',
          (animal.tags || []).join(' '),
          (animal.traditionalUses || []).join(' '),
          'animal produção indústria derivado'
        ]
          .filter(Boolean)
          .join(' ')
          .slice(0, 2000)
      });
    });
  } catch (e) { /* optional */ }

  fs.writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), items }, null, 2), 'utf8');
  console.log('search-index.json:', items.length, 'itens');
}

buildIndex();
