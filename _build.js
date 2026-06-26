const fs = require('fs');
const path = require('path');
const { publishStaticAssets } = require('./_publish.js');

const ROOT = path.resolve(__dirname);

publishStaticAssets(ROOT);
console.log('Build concluído: ficheiros estáticos gerados a partir do repositório.');
