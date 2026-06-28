'use strict';

const path = require('path');

/** Raiz do projeto (pasta acima de lib/) */
const ROOT = path.resolve(__dirname, '..');

module.exports = {
  ROOT,
  contentDir: path.join(ROOT, 'content'),
  cssDir: path.join(ROOT, 'css'),
  jsDir: path.join(ROOT, 'js'),
  imagensDir: path.join(ROOT, 'imagens'),
  uploadsDir: path.join(ROOT, 'uploads'),
  scriptsDir: path.join(ROOT, 'scripts'),
  serverDir: path.join(ROOT, 'server')
};
