'use strict';

require('../lib/load-env.js');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('../lib/paths.js');
const { createSqlStore } = require('../lib/store-sql.js');
const { DEFAULT_SORTEIO_CONFIG } = require('../lib/sorteio-config.js');
const { getDbClient, initDatabaseOnce } = require('../lib/db/client.js');

const SOBRE_META = 'Conheça o propósito e a metodologia do projeto Inspetor BudGanja.';
const SITE_TAGLINE = 'Laboratório de cultivo';

async function main() {
  console.log('A limpar artefactos de teste BD…\n');

  // --- JSON estático ---
  const sitePath = path.join(ROOT, 'content', 'site.json');
  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
  site.siteTagline = SITE_TAGLINE;
  fs.writeFileSync(sitePath, JSON.stringify(site, null, 2), 'utf8');
  console.log('  site.json → siteTagline restaurado');

  const sorteioPath = path.join(ROOT, 'content', 'sorteio.json');
  const sorteioClean = Object.assign({}, DEFAULT_SORTEIO_CONFIG, {
    ativo: false,
    emBreve: true,
    titulo: 'Sorteio de inauguração — Inspetor BudGanja',
    descricao: 'O primeiro sorteio do laboratório será a clonadora caseira com pote de sorvete documentada aqui no site. As inscrições abrem em breve; o resultado será divulgado no canal @InspetorBudGanja.',
    premios: [{ id: 'clonadora-aeroponica', label: 'Clonadora caseira com pote de sorvete' }]
  });
  fs.writeFileSync(sorteioPath, JSON.stringify(sorteioClean, null, 2), 'utf8');
  console.log('  sorteio.json → configuração original');

  const pagesPath = path.join(ROOT, 'content', 'pages.json');
  const pages = JSON.parse(fs.readFileSync(pagesPath, 'utf8'));
  if (pages['info/sobre.html']) {
    pages['info/sobre.html'].metaDescription = SOBRE_META;
    pages['info/sobre.html'].updatedAt = new Date().toISOString();
  }
  fs.writeFileSync(pagesPath, JSON.stringify(pages, null, 2), 'utf8');
  console.log('  pages.json → meta sobre restaurada');

  const guiaPath = path.join(ROOT, 'content', 'guia-cultivo.json');
  const guia = JSON.parse(fs.readFileSync(guiaPath, 'utf8'));
  for (const v of Object.values(guia.videos || {})) {
    if (v && v.customTitle && /teste bd/i.test(v.customTitle)) delete v.customTitle;
  }
  fs.writeFileSync(guiaPath, JSON.stringify(guia, null, 2), 'utf8');
  console.log('  guia-cultivo.json → customTitle de teste removido');

  const sobreHtml = path.join(ROOT, 'info', 'sobre.html');
  if (fs.existsSync(sobreHtml)) {
    let html = fs.readFileSync(sobreHtml, 'utf8');
    html = html.replace(/<meta name="description" content="[^"]*Teste BD[^"]*">/, '<meta name="description" content="' + SOBRE_META + '">');
    fs.writeFileSync(sobreHtml, html, 'utf8');
    console.log('  info/sobre.html → meta restaurada');
  }

  // --- SQLite ---
  const dbPath = path.join(ROOT, 'data', 'budganja.db');
  if (!fs.existsSync(dbPath)) {
    console.log('\nSem budganja.db — só JSON limpo.');
    return;
  }

  await initDatabaseOnce(ROOT);
  const db = getDbClient(ROOT);
  const store = await createSqlStore(ROOT);

  await store.setSite(site);
  await store.setSorteioConfig(sorteioClean);
  await store.setPages(pages);
  await store.setGuiaCultivo(guia);

  await db.execute("DELETE FROM admin_sessions WHERE username = 'admin-test'");
  await db.execute("DELETE FROM sorteio_entries WHERE email LIKE 'teste.db.%@example.com'");
  await db.execute("DELETE FROM sorteio_prizes WHERE id = 'premio-teste'");
  await db.execute("UPDATE guia_videos SET custom_title = '' WHERE custom_title LIKE '%BD teste%'");

  const usersJsonPath = path.join(ROOT, 'content', 'users.json');
  if (fs.existsSync(usersJsonPath)) {
    const usersJson = JSON.parse(fs.readFileSync(usersJsonPath, 'utf8'));
    const dbUsers = await store.getUsers();
    for (const [id, jsonUser] of Object.entries(usersJson)) {
      const dbUser = dbUsers[id];
      if (!dbUser) continue;
      const profile = dbUser.profile || {};
      const polluted =
        (profile.displayName && /teste bd perfil/i.test(profile.displayName)) ||
        (profile.notes && /nota teste persistência/i.test(profile.notes)) ||
        (Array.isArray(profile.growLogs) && profile.growLogs.some((g) => g && /planta teste sql/i.test(g.name)));
      if (polluted && jsonUser.profile) {
        dbUsers[id] = Object.assign({}, dbUser, {
          name: jsonUser.name,
          profile: jsonUser.profile,
          updatedAt: new Date().toISOString()
        });
        console.log('  users → perfil restaurado:', id);
      }
    }
    await store.setUsers(dbUsers);
  }

  console.log('\nLimpeza concluída. Execute: npm run build');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
