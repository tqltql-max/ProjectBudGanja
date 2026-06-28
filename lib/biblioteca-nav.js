'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CLONADORA_SUBMENU } = require('./clonadoras-nav.js');
const { mergeGuiaInspecoesPosts, sortPublicPosts } = require('./merge-guia-inspecoes.js');

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

function postToNavItem(post, icon) {
  const href = post.url || '/' + String(post.filename || '').replace(/^\//, '');
  return {
    label: post.title,
    tileLabel: shortLabel(post.title, 32),
    href,
    icon,
    slug: 'post-' + post.slug,
    description: post.excerpt || ''
  };
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
      label: 'Todas as pesquisas',
      tileLabel: 'Índice',
      href: '/biblioteca/pesquisas/',
      icon: '🔬',
      slug: 'pesquisas',
      featured: true,
      description: 'Relatórios e estudos técnicos.'
    },
    {
      label: 'Substratos biodegradáveis',
      tileLabel: 'Substratos',
      href: '/biblioteca/pesquisas/substratos.html',
      icon: '📄',
      slug: 'substratos',
      description: 'Relatório sobre substratos biodegradáveis.'
    },
    ...getPublicPosts(posts, 'pesquisa').map((p) => postToNavItem(p, '📋'))
  ];

  const inspecaoItems = [
    {
      label: 'Todas as inspeções',
      tileLabel: 'Índice',
      href: '/biblioteca/inspecoes/',
      icon: '🔍',
      slug: 'inspecoes',
      featured: true,
      description: 'Verificações de campo.'
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
    ...videos.slice(0, 12).map((v) => ({
      label: v.title,
      tileLabel: shortLabel(v.title, 32),
      href: v.url,
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
    megaHeaderHref: '/biblioteca/pesquisas/',
    groups: [
      {
        title: '',
        items: [
          {
            label: 'Guias',
            tileLabel: 'Guias',
            icon: '📚',
            slug: 'guias',
            submenu: true,
            children: [
              {
                label: 'Cultivo',
                tileLabel: 'Cultivo',
                href: '/biblioteca/inspecoes/',
                icon: '📖',
                slug: 'guia-cultivo',
                featured: true,
                description: 'Série de inspeções do Guia de Cultivo Básico — vídeos e relatórios técnicos.'
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
          },
          {
            label: 'Loja parceira',
            tileLabel: 'Loja',
            href: '/loja/',
            icon: '🛒',
            slug: 'loja',
            description: 'Produtos das experiências de campo e laboratório.'
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
  const { buildLojaNavItem } = require('./loja-nav.js');
  return [buildBibliotecaNavItem(root), buildFerramentasNavItem(), buildLojaNavItem()];
}

module.exports = {
  buildBibliotecaNavItem,
  mergeBibliotecaNav,
  buildPrimaryNav
};
