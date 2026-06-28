const { ROOT } = require('../lib/paths.js');
const { writeGuiaRedirectPage } = require('../lib/guia-cultivo-service.js');

if (!writeGuiaRedirectPage(ROOT)) {
  console.error('Failed to write guia redirect page');
  process.exit(1);
}

console.log('Guia redirect page synced → biblioteca/inspecoes/');
