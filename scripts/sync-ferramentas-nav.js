'use strict';

const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { buildFerramentasNavItem } = require('../lib/ferramentas-nav.js');
const { buildBibliotecaNavItem, buildPrimaryNav } = require('../lib/biblioteca-nav.js');
const { buildLojaNavItem } = require('../lib/loja-nav.js');

const sitePath = path.join(ROOT, 'content', 'site.json');
const dataPath = path.join(ROOT, 'js', 'ferramentas-nav-data.js');
const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));

site.nav = buildPrimaryNav();
fs.writeFileSync(sitePath, JSON.stringify(site, null, 2) + '\n', 'utf8');

const biblioteca = buildBibliotecaNavItem();
const ferramentas = buildFerramentasNavItem();
const loja = buildLojaNavItem();
const dataJs =
  '// Gerado por scripts/sync-ferramentas-nav.js — não editar manualmente\n' +
  'window.__BIBLIOTECA_NAV__ = ' + JSON.stringify(biblioteca, null, 2) + ';\n' +
  'window.__FERRAMENTAS_NAV__ = ' + JSON.stringify(ferramentas, null, 2) + ';\n' +
  'window.__LOJA_NAV__ = ' + JSON.stringify(loja, null, 2) + ';\n';
fs.writeFileSync(dataPath, dataJs, 'utf8');

const calcCount = ferramentas.groups[0].items[0].children.length;
const pesquisaCount = biblioteca.groups[0].items.find((i) => i.slug === 'pesquisas-menu').children.length;
console.log(
  'Nav synced: Biblioteca (' +
    pesquisaCount +
    ' pesquisas) + Ferramentas (' +
    calcCount +
    ' calculadoras) + Loja.'
);
