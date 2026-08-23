'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CLONADORA_SUBMENU } = require('./clonadoras-nav.js');
const { mergeGuiaInspecoesPosts, sortPublicPosts } = require('./merge-guia-inspecoes.js');
const { filterPesquisasForPublicList } = require('./pesquisa-origin.js');

function readPostsFrom(root) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, 'posts.json'), 'utf8') || '[]');
    return mergeGuiaInspecoesPosts(raw);
  } catch (e) {
    return mergeGuiaInspecoesPosts([]);
  }
}

function getPublicPosts(posts, category) {
  let list = posts.filter((p) => p.published !== false);
  if (category) {
    list = list.filter((p) => (p.category || 'pesquisa') === category);
  }
  return sortPublicPosts(list);
}

function shortLabel(text, max) {
  const s = String(text || '').trim();
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

const FEATURED_INSPECAO_SLUGS = new Set([
  'inspecao-arte-bom-dia-inverno',
  'inspecao-guia-meditacao-endocanabinoidoma'
]);

function postToNavItem(post, icon) {
  const href = post.url || '/' + String(post.filename || '').replace(/^\//, '');
  const item = {
    label: post.title,
    tileLabel: shortLabel(post.title, 32),
    href,
    icon,
    slug: 'post-' + post.slug,
    description: post.excerpt || ''
  };
  if (FEATURED_INSPECAO_SLUGS.has(String(post.slug || ''))) {
    item.featured = true;
  }
  return item;
}

function readYoutubeFeed(root) {
  try {
    const data = JSON.parse(
      fs.readFileSync(path.join(root, 'content', 'youtube-feed.json'), 'utf8')
    );
    return Array.isArray(data.videos) ? data.videos : [];
  } catch (e) {
    return [];
  }
}

function buildBibliotecaNavItem(root) {
  const base = root || ROOT;
  const posts = readPostsFrom(base);
  const videos = readYoutubeFeed(base);

  const pesquisaItems = [
    {
      label: 'Pesquisas',
      tileLabel: 'Índice',
      href: '/biblioteca/pesquisas/',
      icon: '🔬',
      slug: 'pesquisas',
      featured: true,
      description: 'Pesquisas do laboratório e da comunidade.'
    },
    {
      label: 'Substratos biodegradáveis',
      tileLabel: 'Substratos',
      href: '/biblioteca/pesquisas/substratos.html',
      icon: '📄',
      slug: 'substratos',
      description: 'Relatório sobre substratos biodegradáveis.'
    },
    ...filterPesquisasForPublicList(getPublicPosts(posts, 'pesquisa')).map((p) => postToNavItem(p, '📋'))
  ];

  const inspecaoItems = [
    {
      label: 'Todas as inspeções',
      tileLabel: 'Índice',
      href: '/biblioteca/inspecoes/',
      icon: '🔍',
      slug: 'inspecoes',
      featured: true,
      description: 'Canais, equipamentos, insumos e formação.'
    },
    ...getPublicPosts(posts, 'inspecao').map((p) => postToNavItem(p, '🔍'))
  ];

  const videoItems = [
    {
      label: 'Todos os vídeos',
      tileLabel: 'Índice',
      href: '/videos/',
      icon: '▶️',
      slug: 'videos',
      featured: true,
      description: 'Canal @InspetorBudGanja.'
    },
    {
      label: 'Jogos',
      tileLabel: 'Jogos',
      href: '/jogos/',
      icon: '🎮',
      slug: 'games',
      featured: true,
      description: 'GTA RP, Zangado e Paulinho — página só de jogos.'
    },
    ...videos.slice(0, 12).map((v) => ({
      label: v.title,
      tileLabel: shortLabel(v.title, 32),
      href: '/videos/#' + v.id,
      icon: '▶️',
      slug: 'video-' + v.id,
      description: v.summary || ''
    }))
  ];

  return {
    label: 'Biblioteca',
    mega: true,
    megaCompact: true,
    megaAccordion: true,
    megaHeader: 'Biblioteca',
    megaHeaderHref: '/biblioteca/',
    // Hub /biblioteca/ continua auth-protegido; o menu fica público para
    // descobrir inspeções, plantas, UNIFESP e guias sem login.
    authOnly: false,
    groups: [
      {
        title: '',
        items: [
          {
            label: 'Plantas',
            tileLabel: 'Plantas',
            href: '/plantas/',
            icon: '🌿',
            slug: 'plantas',
            featured: true,
            description: 'Catálogo de plantas fitoterápicas do Brasil.'
          },
          {
            label: 'Animais',
            tileLabel: 'Animais',
            href: '/animais/',
            icon: '🐾',
            slug: 'animais',
            featured: true,
            description: 'Catálogo de animais: criação, companhia e derivados industriais.'
          },
          {
            label: 'Fungos',
            tileLabel: 'Fungos',
            href: '/fungos/',
            icon: '🍄',
            slug: 'fungos',
            featured: true,
            description: 'Catálogo de fungos: identificação e enquadramento — não é cultivo nem uso.'
          },
          {
            label: 'Curso UNIFESP',
            tileLabel: 'UNIFESP',
            href: '/biblioteca/unifesp/',
            icon: '🎓',
            slug: 'unifesp',
            featured: true,
            description: 'Hub do XIV curso de extensão sobre cannabis medicinal.'
          },
          {
            label: 'Cadernos de Engenharia',
            tileLabel: 'Cadernos',
            href: '/biblioteca/cadernos/',
            icon: '📓',
            slug: 'cadernos-engenharia',
            featured: true,
            description: 'Um caderno por matéria, método Cornell — anotações do curso de engenharia.'
          },
          {
            label: 'Origami',
            tileLabel: 'Origami',
            href: '/origami/',
            icon: '📄',
            slug: 'origami',
            featured: true,
            description: 'Aprender a dobrar papel — mãos reais; aula do barquinho. Sem fala, áudio local.'
          },
          {
            label: 'Vida',
            tileLabel: 'Vida',
            href: '/vida/',
            icon: '🌱',
            slug: 'vida',
            featured: true,
            description: 'Conto familiar: cuidar de plantas com ciência, natureza e amizade.'
          },
          {
            label: 'Bom dia, Inverno',
            tileLabel: 'Inverno',
            href: '/inverno/',
            icon: '❄️',
            slug: 'inverno',
            featured: true,
            description: 'Divulgação do livro de Tamara Klink — fazer circular.'
          },
          {
            label: 'Livro do laboratório',
            tileLabel: 'Livro',
            href: '/livro/',
            icon: '📘',
            slug: 'livro',
            featured: true,
            description: 'Página-livro do projecto — Gerar livro, dedicatória e mapa das salas.'
          },
          {
            label: 'Guias',
            tileLabel: 'Guias',
            icon: '📚',
            slug: 'guias',
            submenu: true,
            children: [
              {
                label: 'Palavras',
                tileLabel: 'Palavras',
                href: '/guia/palavras.html',
                icon: '📖',
                slug: 'guia-palavras',
                featured: true,
                description: 'Glossário simples: títulos do site e léxico inspecionado.'
              },
              {
                label: 'Chá de plantas',
                tileLabel: 'Chá de plantas',
                href: '/posts/post-inspecao-guia-preparo-cha-plantas.html',
                icon: '🍵',
                slug: 'guia-preparo-cha-plantas',
                featured: true,
                description: 'Manual: infusão, decoção, proporções e segurança no preparo caseiro.'
              },
              {
                label: 'Receitas de plantas',
                tileLabel: 'Receitas de plantas',
                href: '/posts/post-inspecao-guia-receitas-plantas.html',
                icon: '🌿',
                slug: 'guia-receitas-plantas',
                featured: true,
                description: 'Lote 1: oito tisanas de ofício com elos ao catálogo Plantas.'
              },
              CLONADORA_SUBMENU
            ]
          },
          {
            label: 'Pesquisas',
            tileLabel: 'Pesquisas',
            icon: '🔬',
            slug: 'pesquisas-menu',
            submenu: true,
            children: pesquisaItems
          },
          {
            label: 'Inspeções',
            tileLabel: 'Inspeções',
            icon: '🔍',
            slug: 'inspecoes-menu',
            submenu: true,
            children: inspecaoItems
          },
          {
            label: 'Vídeos',
            tileLabel: 'Vídeos',
            icon: '▶️',
            slug: 'videos-menu',
            submenu: true,
            children: videoItems
          }
        ]
      }
    ]
  };
}

function mergeBibliotecaNav(nav) {
  if (!Array.isArray(nav)) return nav;
  const biblioteca = buildBibliotecaNavItem();
  const index = nav.findIndex((item) => item && item.label === 'Biblioteca');
  if (index === -1) return [biblioteca].concat(nav);
  const next = nav.slice();
  next[index] = biblioteca;
  return next;
}

function buildPrimaryNav(root) {
  const { buildFerramentasNavItem } = require('./ferramentas-nav.js');
  return [buildBibliotecaNavItem(root), buildFerramentasNavItem()];
}

module.exports = {
  buildBibliotecaNavItem,
  mergeBibliotecaNav,
  buildPrimaryNav
};
