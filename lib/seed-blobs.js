const fs = require('fs');
const path = require('path');
const { normalizePosts } = require('./posts-service.js');

let seeded = false;

function readJson(root, rel) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
  } catch (e) {
    return null;
  }
}

async function ensureBlobSeed(store, root) {
  if (seeded) return;

  const existingPosts = await store.getPosts();
  if (existingPosts && existingPosts.length) {
    seeded = true;
    return;
  }

  const posts = readJson(root, 'posts.json');
  if (posts && posts.length) {
    await store.setPosts(normalizePosts(posts));
    console.log('Seeded posts into Blobs:', posts.length);
  }

  const pages = await store.getPages();
  if (!pages) {
    const fromRepo = readJson(root, 'content/pages.json');
    if (fromRepo) {
      await store.setPages(fromRepo);
      console.log('Seeded pages into Blobs');
    }
  }

  const site = await store.getSite();
  if (!site) {
    const fromRepo = readJson(root, 'content/site.json');
    if (fromRepo) {
      await store.setSite(fromRepo);
      console.log('Seeded site into Blobs');
    }
  }

  const sorteioConfig = await store.getSorteioConfig();
  if (!sorteioConfig) {
    const fromRepo = readJson(root, 'content/sorteio.json');
    if (fromRepo) {
      await store.setSorteioConfig(fromRepo);
      console.log('Seeded sorteio config into Blobs');
    }
  }

  const guiaCultivo = await store.getGuiaCultivo();
  if (!guiaCultivo) {
    const fromRepo = readJson(root, 'content/guia-cultivo.json');
    if (fromRepo && store.setGuiaCultivo) {
      await store.setGuiaCultivo(fromRepo);
      console.log('Seeded guia-cultivo into Blobs');
    }
  }

  seeded = true;
}

module.exports = { ensureBlobSeed };
