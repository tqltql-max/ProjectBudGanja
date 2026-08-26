'use strict';

const path = require('path');

function projectRoot() {
  if (typeof __dirname === 'string') {
    return path.resolve(__dirname, '..');
  }
  if (typeof process !== 'undefined' && typeof process.cwd === 'function') {
    return process.cwd();
  }
  return '.';
}

/** Raiz do projeto (pasta acima de lib/) */
const ROOT = projectRoot();

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
