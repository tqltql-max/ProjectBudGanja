'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('./paths.js');
const { CLONADORA_SUBMENU } = require('./clonadoras-nav.js');
const { mergeGuiaInspecoesPosts, sortPublicPosts } = require('./merge-guia-inspecoes.js');
const { filterPesquisasForPublicList } = require('./pesquisa-origin.js');
const { isInspecaoPost } = require('./inspecoes-public.js');

function readPostsFrom(root) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(root, 'posts.json'), 'utf8') || '[]');
    return mergeGuiaInspecoesPosts(raw);
  } catch (e) {
    return mergeGuiaInspecoesPosts([]);
  }
}

function getPublicPosts(posts, category) {
  let list = posts.filter((p) => p.published !== false && !isInspecaoPost(p));
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
    // Hub /biblioteca/ continua auth-protegido; inspeções só para admin (sem menu público).
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
            description: 'Catálogo de plantas fitoterápicas do Brasil — reino vegetal; o fruto é outro eixo.'
          },
          {
            label: 'Frutos',
            tileLabel: 'Frutos',
            href: '/frutos/',
            icon: '🍊',
            slug: 'frutos',
            featured: true,
            description: 'Catálogo do órgão fruto — não é o reino; a planta fica em Plantas. Fungo é outro reino.'
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
            label: 'Tecnologia',
            tileLabel: 'Tecnologia',
            href: '/tecnologia/',
            icon: '⚙️',
            slug: 'tecnologia',
            featured: true,
            description: 'Catálogo de ofício técnico: vocábulos, hardware, rede e software.'
          },
          {
            label: 'Mitologia',
            tileLabel: 'Mitologia',
            href: '/mitologia/',
            icon: '⚖️',
            slug: 'mitologia',
            featured: true,
            description: 'Catálogo de mitos e deuses: nomes, relatos e elos — Anúbis abre.'
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
            label: 'Manual de Inspeções BudGanja',
            tileLabel: 'Manual',
            href: '/livro/',
            icon: '📘',
            slug: 'livro',
            featured: true,
            description: 'Manual do projecto — Gerar manual, dedicatória e mapa das salas.'
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
                label: 'Astrologia',
                tileLabel: 'Astrologia',
                href: '/guia/astrologia.html',
                icon: '♈',
                slug: 'guia-astrologia',
                featured: true,
                description: 'Doze signos a partir de Áries; céu verificável; Google Sky sem embed web.'
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
