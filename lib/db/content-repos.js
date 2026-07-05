'use strict';

const fs = require('fs');
const path = require('path');

function nowIso() {
  return new Date().toISOString();
}

function pageSection(pageId) {
  const id = String(pageId || '');
  if (id.startsWith('biblioteca/')) return 'biblioteca';
  if (id.startsWith('calculadoras/')) return 'calculadoras';
  if (id.startsWith('guia/')) return 'guia';
  if (id.startsWith('equipamentos/')) return 'equipamentos';
  if (id.startsWith('info/')) return 'info';
  if (id.startsWith('sorteios/')) return 'sorteios';
  if (id.startsWith('videos/')) return 'videos';
  return 'site';
}

function rowToPost(row) {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content_raw: row.content_raw,
    format: row.format,
    filename: row.filename,
    url: row.url,
    date: row.date,
    published: !!row.published,
    coverImage: row.cover_image,
    category: row.category,
    series: row.series || '',
    seriesLabel: row.series_label || ''
  };
}

function rowToPage(row) {
  return {
    id: row.id,
    label: row.label,
    updatedAt: row.updated_at,
    title: row.title,
    metaDescription: row.meta_description,
    ogTitle: row.og_title,
    ogDescription: row.og_description,
    ogType: row.og_type,
    dataPage: row.data_page,
    headExtra: row.head_extra,
    body: row.body,
    scripts: row.scripts
  };
}

async function tableCount(db, table) {
  const r = await db.execute('SELECT COUNT(*) AS c FROM ' + table);
  return Number(r.rows[0] && r.rows[0].c) || 0;
}

async function readKv(db, key) {
  const r = await db.execute({ sql: 'SELECT value FROM kv_store WHERE key = ?', args: [key] });
  if (!r.rows.length) return null;
  try {
    return JSON.parse(r.rows[0].value);
  } catch (e) {
    return null;
  }
}

// --- Posts ---

async function loadPosts(db) {
  // series/series_label columns added in migration v16 — use COALESCE for resilience
  const r = await db.execute(
    `SELECT slug, title, excerpt, content_raw, format, filename, url, date, published, cover_image, category,
            COALESCE(series,'') AS series, COALESCE(series_label,'') AS series_label
     FROM posts ORDER BY date DESC`
  );
  return r.rows.map(rowToPost);
}

async function savePosts(db, posts) {
  await db.execute('DELETE FROM posts');
  for (const p of posts || []) {
    if (!p || !p.slug) continue;
    await db.execute({
      sql: `INSERT INTO posts (slug, title, excerpt, content_raw, format, filename, url, date, published, cover_image, category, series, series_label, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(p.slug),
        String(p.title || ''),
        String(p.excerpt || ''),
        String(p.content_raw || ''),
        String(p.format || 'markdown'),
        String(p.filename || ''),
        String(p.url || ''),
        p.date || nowIso(),
        p.published !== false ? 1 : 0,
        String(p.coverImage || ''),
        String(p.category || 'pesquisa'),
        String(p.series || ''),
        String(p.seriesLabel || ''),
        nowIso()
      ]
    });
  }
}

async function importPosts(db, posts) {
  if (!Array.isArray(posts) || !posts.length) return 0;
  await savePosts(db, posts);
  return posts.length;
}

// --- Pages ---

async function loadPages(db) {
  const r = await db.execute(
    `SELECT id, section, label, title, meta_description, og_title, og_description, og_type,
            data_page, head_extra, body, scripts, updated_at FROM pages ORDER BY id`
  );
  const out = {};
  for (const row of r.rows) {
    out[row.id] = rowToPage(row);
  }
  return Object.keys(out).length ? out : null;
}

async function savePages(db, pages) {
  await db.execute('DELETE FROM pages');
  for (const [id, page] of Object.entries(pages || {})) {
    if (!page) continue;
    await db.execute({
      sql: `INSERT INTO pages (id, section, label, title, meta_description, og_title, og_description, og_type,
            data_page, head_extra, body, scripts, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(id),
        pageSection(id),
        String(page.label || ''),
        String(page.title || ''),
        String(page.metaDescription || ''),
        String(page.ogTitle || ''),
        String(page.ogDescription || ''),
        String(page.ogType || 'website'),
        String(page.dataPage || ''),
        String(page.headExtra || ''),
        String(page.body || ''),
        String(page.scripts || ''),
        page.updatedAt || nowIso()
      ]
    });
  }
}

async function importPages(db, pages) {
  if (!pages || typeof pages !== 'object') return 0;
  await savePages(db, pages);
  return Object.keys(pages).length;
}

// --- Calculators ---

async function loadCalculators(db) {
  const r = await db.execute(
    'SELECT slug, label, href, icon, description, featured, sort_order, guide_post_slug FROM calculators ORDER BY sort_order, label'
  );
  return r.rows.map((row) => ({
    slug: row.slug,
    label: row.label,
    href: row.href,
    icon: row.icon,
    description: row.description,
    featured: !!row.featured,
    guidePostSlug: row.guide_post_slug
  }));
}

async function saveCalculators(db, items) {
  await db.execute('DELETE FROM calculators');
  let order = 0;
  for (const item of items || []) {
    if (!item || !item.slug) continue;
    await db.execute({
      sql: `INSERT INTO calculators (slug, label, href, icon, description, featured, sort_order, guide_post_slug, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(item.slug),
        String(item.label || ''),
        String(item.href || ''),
        String(item.icon || ''),
        String(item.description || ''),
        item.featured ? 1 : 0,
        order++,
        String(item.guidePostSlug || ''),
        nowIso()
      ]
    });
  }
}

function extractCalculatorsFromSite(site) {
  const items = [];
  const nav = site && site.nav ? site.nav : [];
  for (const section of nav) {
    if (String(section.label || '') !== 'Ferramentas') continue;
    const groups = section.groups || [];
    for (const group of groups) {
      for (const item of group.items || []) {
        if (!item.slug) continue;
        items.push({
          slug: item.slug,
          label: item.label || '',
          href: item.href || '',
          icon: item.icon || '',
          description: item.description || '',
          featured: !!item.featured,
          guidePostSlug: ''
        });
      }
    }
  }
  return items;
}

async function importCalculatorsFromSite(db, site) {
  const items = extractCalculatorsFromSite(site);
  if (!items.length) return 0;
  await saveCalculators(db, items);
  return items.length;
}

// --- Site settings + navigation ---

async function clearSiteNav(db) {
  await db.execute('DELETE FROM nav_items');
  await db.execute('DELETE FROM nav_groups');
  await db.execute('DELETE FROM nav_sections');
  await db.execute('DELETE FROM footer_group_links');
  await db.execute('DELETE FROM footer_groups');
  await db.execute('DELETE FROM footer_links');
}

async function saveSite(db, site) {
  if (!site || typeof site !== 'object') return;
  await clearSiteNav(db);

  await db.execute({
    sql: `INSERT INTO site_settings (id, site_name, site_tagline, footer_text, privacy_updated, og_image,
          contact_email, youtube_channel_url, youtube_channel_label, youtube_jardim_url, youtube_jardim_label, updated_at)
          VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            site_name = excluded.site_name,
            site_tagline = excluded.site_tagline,
            footer_text = excluded.footer_text,
            privacy_updated = excluded.privacy_updated,
            og_image = excluded.og_image,
            contact_email = excluded.contact_email,
            youtube_channel_url = excluded.youtube_channel_url,
            youtube_channel_label = excluded.youtube_channel_label,
            youtube_jardim_url = excluded.youtube_jardim_url,
            youtube_jardim_label = excluded.youtube_jardim_label,
            updated_at = excluded.updated_at`,
    args: [
      String(site.siteName || ''),
      String(site.siteTagline || ''),
      String(site.footerText || ''),
      String(site.privacyUpdated || ''),
      String(site.ogImage || ''),
      String(site.contactEmail || ''),
      String(site.youtubeChannelUrl || ''),
      String(site.youtubeChannelLabel || ''),
      String(site.youtubeJardimUrl || ''),
      String(site.youtubeJardimLabel || ''),
      nowIso()
    ]
  });

  const nav = site.nav || [];
  for (let si = 0; si < nav.length; si++) {
    const section = nav[si];
    const sectionId = 'nav-' + si;
    await db.execute({
      sql: `INSERT INTO nav_sections (id, label, mega, mega_compact, mega_header, mega_header_href, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [
        sectionId,
        String(section.label || ''),
        section.mega ? 1 : 0,
        section.megaCompact ? 1 : 0,
        String(section.megaHeader || ''),
        String(section.megaHeaderHref || ''),
        si
      ]
    });
    const groups = section.groups || [];
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const groupId = sectionId + '-g' + gi;
      await db.execute({
        sql: 'INSERT INTO nav_groups (id, section_id, title, sort_order) VALUES (?, ?, ?, ?)',
        args: [groupId, sectionId, String(group.title || ''), gi]
      });
      const items = group.items || [];
      for (let ii = 0; ii < items.length; ii++) {
        const item = items[ii];
        const itemId = groupId + '-i' + ii;
        await db.execute({
          sql: `INSERT INTO nav_items (id, group_id, label, tile_label, href, description, icon, slug, featured, sort_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            itemId,
            groupId,
            String(item.label || ''),
            String(item.tileLabel || ''),
            String(item.href || ''),
            String(item.description || ''),
            String(item.icon || ''),
            String(item.slug || ''),
            item.featured ? 1 : 0,
            ii
          ]
        });
      }
    }
  }

  const footerLinks = site.footerLinks || [];
  for (let i = 0; i < footerLinks.length; i++) {
    const link = footerLinks[i];
    await db.execute({
      sql: 'INSERT INTO footer_links (label, href, sort_order) VALUES (?, ?, ?)',
      args: [String(link.label || ''), String(link.href || ''), i]
    });
  }

  const footerGroups = site.footerGroups || [];
  for (let gi = 0; gi < footerGroups.length; gi++) {
    const group = footerGroups[gi];
    const groupId = 'fg-' + gi;
    await db.execute({
      sql: 'INSERT INTO footer_groups (id, title, sort_order) VALUES (?, ?, ?)',
      args: [groupId, String(group.title || ''), gi]
    });
    const links = group.links || [];
    for (let li = 0; li < links.length; li++) {
      const link = links[li];
      await db.execute({
        sql: 'INSERT INTO footer_group_links (group_id, label, href, sort_order) VALUES (?, ?, ?, ?)',
        args: [groupId, String(link.label || ''), String(link.href || ''), li]
      });
    }
  }

  await importCalculatorsFromSite(db, site);
}

async function loadSite(db) {
  const settings = await db.execute({ sql: 'SELECT * FROM site_settings WHERE id = ?', args: ['default'] });
  if (!settings.rows.length) return null;
  const s = settings.rows[0];

  const sections = await db.execute('SELECT * FROM nav_sections ORDER BY sort_order');
  const nav = [];
  for (const sec of sections.rows) {
    const groupsRows = await db.execute({
      sql: 'SELECT * FROM nav_groups WHERE section_id = ? ORDER BY sort_order',
      args: [sec.id]
    });
    const groups = [];
    for (const grp of groupsRows.rows) {
      const itemsRows = await db.execute({
        sql: 'SELECT * FROM nav_items WHERE group_id = ? ORDER BY sort_order',
        args: [grp.id]
      });
      groups.push({
        title: grp.title,
        items: itemsRows.rows.map((item) => ({
          label: item.label,
          tileLabel: item.tile_label || undefined,
          href: item.href,
          description: item.description || undefined,
          icon: item.icon || undefined,
          slug: item.slug || undefined,
          featured: !!item.featured
        }))
      });
    }
    nav.push({
      label: sec.label,
      mega: !!sec.mega,
      megaCompact: !!sec.mega_compact,
      megaHeader: sec.mega_header || undefined,
      megaHeaderHref: sec.mega_header_href || undefined,
      groups: groups
    });
  }

  const footerLinksRows = await db.execute('SELECT label, href FROM footer_links ORDER BY sort_order');
  const footerLinks = footerLinksRows.rows.map((r) => ({ label: r.label, href: r.href }));

  const footerGroupsRows = await db.execute('SELECT id, title FROM footer_groups ORDER BY sort_order');
  const footerGroups = [];
  for (const fg of footerGroupsRows.rows) {
    const linksRows = await db.execute({
      sql: 'SELECT label, href FROM footer_group_links WHERE group_id = ? ORDER BY sort_order',
      args: [fg.id]
    });
    footerGroups.push({
      title: fg.title,
      links: linksRows.rows.map((r) => ({ label: r.label, href: r.href }))
    });
  }

  return {
    siteName: s.site_name,
    siteTagline: s.site_tagline,
    footerText: s.footer_text,
    privacyUpdated: s.privacy_updated,
    ogImage: s.og_image,
    contactEmail: s.contact_email,
    youtubeChannelUrl: s.youtube_channel_url,
    youtubeChannelLabel: s.youtube_channel_label,
    youtubeJardimUrl: s.youtube_jardim_url,
    youtubeJardimLabel: s.youtube_jardim_label,
    nav: nav,
    footerLinks: footerLinks,
    footerGroups: footerGroups
  };
}

// --- Guia cultivo ---

async function saveGuiaCultivo(db, guia) {
  if (!guia || typeof guia !== 'object') return;
  await db.execute('DELETE FROM guia_chapters');
  await db.execute('DELETE FROM guia_videos');

  await db.execute({
    sql: `INSERT INTO guia_cultivo (id, title, subtitle, channel_url, channel_name, channel_id, updated_at)
          VALUES ('default', ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            subtitle = excluded.subtitle,
            channel_url = excluded.channel_url,
            channel_name = excluded.channel_name,
            channel_id = excluded.channel_id,
            updated_at = excluded.updated_at`,
    args: [
      String(guia.title || ''),
      String(guia.subtitle || ''),
      String(guia.channelUrl || ''),
      String(guia.channelName || ''),
      String(guia.channelId || ''),
      guia.updatedAt || nowIso()
    ]
  });

  const chapters = guia.chapters || [];
  for (let i = 0; i < chapters.length; i++) {
    const ch = chapters[i];
    await db.execute({
      sql: 'INSERT INTO guia_chapters (id, title, description, video_ids_json, sort_order) VALUES (?, ?, ?, ?, ?)',
      args: [
        String(ch.id),
        String(ch.title || ''),
        String(ch.description || ''),
        JSON.stringify(ch.videoIds || []),
        i
      ]
    });
  }

  const videos = guia.videos && typeof guia.videos === 'object' ? guia.videos : {};
  for (const [vid, v] of Object.entries(videos)) {
    if (!v) continue;
    await db.execute({
      sql: `INSERT INTO guia_videos (youtube_id, title, published, summary, url, custom_title) VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(youtube_id) DO UPDATE SET
              title = excluded.title,
              published = excluded.published,
              summary = excluded.summary,
              url = excluded.url,
              custom_title = CASE WHEN excluded.custom_title != '' THEN excluded.custom_title ELSE guia_videos.custom_title END`,
      args: [
        String(v.id || vid),
        String(v.title || ''),
        String(v.published || ''),
        String(v.summary || ''),
        String(v.url || ''),
        String(v.customTitle || '')
      ]
    });
  }
}

async function loadGuiaCultivo(db) {
  const main = await db.execute("SELECT * FROM guia_cultivo WHERE id = 'default'");
  if (!main.rows.length) return null;
  const g = main.rows[0];

  const chaptersRows = await db.execute('SELECT * FROM guia_chapters ORDER BY sort_order');
  const chapters = chaptersRows.rows.map((row) => {
    let videoIds = [];
    try {
      videoIds = JSON.parse(row.video_ids_json || '[]');
    } catch (e) {
      videoIds = [];
    }
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      videoIds: videoIds
    };
  });

  const videosRows = await db.execute('SELECT * FROM guia_videos');
  const videos = {};
  for (const row of videosRows.rows) {
    videos[row.youtube_id] = {
      id: row.youtube_id,
      title: row.title,
      published: row.published,
      summary: row.summary,
      url: row.url
    };
    if (row.custom_title) videos[row.youtube_id].customTitle = row.custom_title;
  }

  return {
    title: g.title,
    subtitle: g.subtitle,
    channelUrl: g.channel_url,
    channelName: g.channel_name,
    channelId: g.channel_id,
    updatedAt: g.updated_at,
    chapters: chapters,
    videos: videos
  };
}

// --- Sorteio config + entries ---

async function saveSorteioConfig(db, config) {
  if (!config || typeof config !== 'object') return;
  await db.execute('DELETE FROM sorteio_prizes');

  await db.execute({
    sql: `INSERT INTO sorteio_settings (id, ativo, em_breve, titulo, descricao, data_sorteio, google_form_url, manual_url, updated_at)
          VALUES ('default', ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            ativo = excluded.ativo,
            em_breve = excluded.em_breve,
            titulo = excluded.titulo,
            descricao = excluded.descricao,
            data_sorteio = excluded.data_sorteio,
            google_form_url = excluded.google_form_url,
            manual_url = excluded.manual_url,
            updated_at = excluded.updated_at`,
    args: [
      config.ativo ? 1 : 0,
      config.emBreve ? 1 : 0,
      String(config.titulo || ''),
      String(config.descricao || ''),
      String(config.dataSorteio || ''),
      String(config.googleFormUrl || ''),
      String(config.manualUrl || ''),
      nowIso()
    ]
  });

  const premios = config.premios || [];
  for (let i = 0; i < premios.length; i++) {
    const p = premios[i];
    await db.execute({
      sql: 'INSERT INTO sorteio_prizes (id, label, sort_order) VALUES (?, ?, ?)',
      args: [String(p.id), String(p.label || ''), i]
    });
  }
}

async function loadSorteioConfig(db) {
  const r = await db.execute("SELECT * FROM sorteio_settings WHERE id = 'default'");
  if (!r.rows.length) return null;
  const s = r.rows[0];
  const premiosRows = await db.execute('SELECT id, label FROM sorteio_prizes ORDER BY sort_order');
  return {
    ativo: !!s.ativo,
    emBreve: !!s.em_breve,
    titulo: s.titulo,
    descricao: s.descricao,
    dataSorteio: s.data_sorteio,
    googleFormUrl: s.google_form_url,
    manualUrl: s.manual_url,
    premios: premiosRows.rows.map((p) => ({ id: p.id, label: p.label }))
  };
}

async function saveSorteios(db, entries) {
  await db.execute('DELETE FROM sorteio_entries');
  for (const e of entries || []) {
    if (!e || !e.id) continue;
    await db.execute({
      sql: `INSERT INTO sorteio_entries (id, user_id, nome, email, cpf, cpf_formatado, telefone, cidade, estado, instagram, premio_id, premio_label, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(e.id),
        String(e.userId || e.user_id || ''),
        String(e.nome || ''),
        String(e.email || ''),
        String(e.cpf || ''),
        String(e.cpfFormatado || ''),
        String(e.telefone || ''),
        String(e.cidade || ''),
        String(e.estado || ''),
        String(e.instagram || ''),
        String(e.premioId || ''),
        String(e.premio || e.premioLabel || ''),
        e.createdAt || nowIso()
      ]
    });
  }
}

async function loadSorteios(db) {
  const r = await db.execute(
    `SELECT id, user_id, nome, email, cpf, cpf_formatado, telefone, cidade, estado, instagram, premio_id, premio_label, created_at
     FROM sorteio_entries ORDER BY created_at DESC`
  );
  return r.rows.map((row) => ({
    id: row.id,
    userId: row.user_id || '',
    nome: row.nome,
    email: row.email,
    cpf: row.cpf,
    cpfFormatado: row.cpf_formatado,
    telefone: row.telefone,
    cidade: row.cidade,
    estado: row.estado,
    instagram: row.instagram,
    premioId: row.premio_id,
    premio: row.premio_label,
    createdAt: row.created_at
  }));
}

// --- Avisos de sorteio (newsletter) ---

async function loadSorteioAlertSubscribers(db) {
  const r = await db.execute(
    `SELECT user_id, email, name, subscribed_at, active
     FROM sorteio_alert_subscribers
     WHERE active = 1
     ORDER BY subscribed_at DESC`
  );
  return r.rows.map((row) => ({
    userId: row.user_id,
    email: row.email,
    name: row.name,
    subscribedAt: row.subscribed_at,
    active: !!row.active
  }));
}

async function getSorteioAlertSubscriberByUserId(db, userId) {
  const r = await db.execute({
    sql: 'SELECT user_id, email, name, subscribed_at, active FROM sorteio_alert_subscribers WHERE user_id = ?',
    args: [String(userId)]
  });
  if (!r.rows.length) return null;
  const row = r.rows[0];
  return {
    userId: row.user_id,
    email: row.email,
    name: row.name,
    subscribedAt: row.subscribed_at,
    active: !!row.active
  };
}

async function upsertSorteioAlertSubscriber(db, subscriber) {
  const userId = String(subscriber.userId || '');
  const email = String(subscriber.email || '').trim().toLowerCase();
  const name = String(subscriber.name || '').trim();
  const subscribedAt = subscriber.subscribedAt || nowIso();
  await db.execute({
    sql: `INSERT INTO sorteio_alert_subscribers (user_id, email, name, subscribed_at, active)
          VALUES (?, ?, ?, ?, 1)
          ON CONFLICT(user_id) DO UPDATE SET
            email = excluded.email,
            name = excluded.name,
            subscribed_at = excluded.subscribed_at,
            active = 1`,
    args: [userId, email, name, subscribedAt]
  });
}

async function deactivateSorteioAlertSubscriber(db, userId) {
  await db.execute({
    sql: 'UPDATE sorteio_alert_subscribers SET active = 0 WHERE user_id = ?',
    args: [String(userId)]
  });
}

// --- Encomendas loja ---

async function saveLojaOrders(db, orders) {
  await db.execute('DELETE FROM loja_orders');
  const list = Array.isArray(orders) ? orders : [];
  for (const o of list) {
    if (!o || !o.id) continue;
    await db.execute({
      sql: `INSERT INTO loja_orders (id, product_id, product_title, package_id, package_label, package_price_note, nome, email, telefone, cidade, estado, mensagem, user_id, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        String(o.id),
        String(o.productId || o.product_id || ''),
        String(o.productTitle || o.product_title || ''),
        String(o.packageId || o.package_id || ''),
        String(o.packageLabel || o.package_label || ''),
        String(o.packagePriceNote || o.package_price_note || ''),
        String(o.nome || ''),
        String(o.email || ''),
        String(o.telefone || ''),
        String(o.cidade || ''),
        String(o.estado || ''),
        String(o.mensagem || ''),
        String(o.userId || o.user_id || ''),
        String(o.status || 'novo'),
        String(o.createdAt || o.created_at || nowIso())
      ]
    });
  }
}

async function loadLojaOrders(db) {
  const r = await db.execute(
    `SELECT id, product_id, product_title, package_id, package_label, package_price_note, nome, email, telefone, cidade, estado, mensagem, user_id, status, created_at
     FROM loja_orders ORDER BY created_at DESC`
  );
  return r.rows.map((row) => ({
    id: row.id,
    productId: row.product_id,
    productTitle: row.product_title,
    packageId: row.package_id,
    packageLabel: row.package_label,
    packagePriceNote: row.package_price_note,
    nome: row.nome,
    email: row.email,
    telefone: row.telefone,
    cidade: row.cidade,
    estado: row.estado,
    mensagem: row.mensagem,
    userId: row.user_id,
    status: row.status,
    createdAt: row.created_at
  }));
}

// --- YouTube feed ---

async function saveYoutubeFeed(db, feed) {
  if (!feed || typeof feed !== 'object') return;
  await db.execute('DELETE FROM youtube_feed_videos');

  await db.execute({
    sql: `INSERT INTO youtube_feed (id, channel_id, channel_url, channel_name, updated_at)
          VALUES ('default', ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            channel_id = excluded.channel_id,
            channel_url = excluded.channel_url,
            channel_name = excluded.channel_name,
            updated_at = excluded.updated_at`,
    args: [
      String(feed.channelId || ''),
      String(feed.channelUrl || ''),
      String(feed.channelName || ''),
      feed.updatedAt || nowIso()
    ]
  });

  const videos = feed.videos || [];
  for (let i = 0; i < videos.length; i++) {
    const v = videos[i];
    if (!v || !v.id) continue;
    await db.execute({
      sql: `INSERT INTO youtube_feed_videos (youtube_id, title, published, summary, url, sort_order) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [String(v.id), String(v.title || ''), String(v.published || ''), String(v.summary || ''), String(v.url || ''), i]
    });
  }
}

async function loadYoutubeFeed(db) {
  const r = await db.execute("SELECT * FROM youtube_feed WHERE id = 'default'");
  if (!r.rows.length) return null;
  const f = r.rows[0];
  const videosRows = await db.execute('SELECT * FROM youtube_feed_videos ORDER BY sort_order');
  return {
    channelId: f.channel_id,
    channelUrl: f.channel_url,
    channelName: f.channel_name,
    updatedAt: f.updated_at,
    videos: videosRows.rows.map((v) => ({
      id: v.youtube_id,
      title: v.title,
      published: v.published,
      summary: v.summary,
      url: v.url
    }))
  };
}

// --- Migration orchestration ---

function readJsonFile(filePath, fallback) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

async function migrateContentFromKv(db) {
  const report = { posts: 0, pages: 0, site: 0, sorteios: 0, sorteioConfig: 0, guia: 0, youtube: 0, calculators: 0 };

  if (await tableCount(db, 'posts') === 0) {
    const posts = await readKv(db, 'posts');
    if (Array.isArray(posts) && posts.length) report.posts = await importPosts(db, posts);
  }

  if (await tableCount(db, 'pages') === 0) {
    const pages = await readKv(db, 'pages');
    if (pages) report.pages = await importPages(db, pages);
  }

  if (await tableCount(db, 'site_settings') === 0) {
    const site = await readKv(db, 'site');
    if (site) {
      await saveSite(db, site);
      report.site = 1;
      report.calculators = await tableCount(db, 'calculators');
    }
  }

  if (await tableCount(db, 'sorteio_entries') === 0) {
    const entries = await readKv(db, 'sorteios');
    if (Array.isArray(entries) && entries.length) {
      await saveSorteios(db, entries);
      report.sorteios = entries.length;
    }
  }

  if (await tableCount(db, 'sorteio_settings') === 0) {
    const config = await readKv(db, 'sorteio-config');
    if (config) {
      await saveSorteioConfig(db, config);
      report.sorteioConfig = 1;
    }
  }

  if (await tableCount(db, 'guia_cultivo') === 0) {
    const guia = await readKv(db, 'guia-cultivo');
    if (guia) {
      await saveGuiaCultivo(db, guia);
      report.guia = 1;
    }
  }

  return report;
}

async function migrateContentFromJsonFiles(db, root) {
  const report = { posts: 0, pages: 0, site: 0, sorteios: 0, sorteioConfig: 0, guia: 0, youtube: 0, calculators: 0 };

  if (await tableCount(db, 'posts') === 0) {
    const posts = readJsonFile(path.join(root, 'posts.json'), []);
    if (posts.length) report.posts = await importPosts(db, posts);
  }

  if (await tableCount(db, 'pages') === 0) {
    const pages = readJsonFile(path.join(root, 'content', 'pages.json'), null);
    if (pages) report.pages = await importPages(db, pages);
  }

  if (await tableCount(db, 'site_settings') === 0) {
    const site = readJsonFile(path.join(root, 'content', 'site.json'), null);
    if (site) {
      await saveSite(db, site);
      report.site = 1;
      report.calculators = await tableCount(db, 'calculators');
    }
  }

  if (await tableCount(db, 'sorteio_entries') === 0) {
    const entries = readJsonFile(path.join(root, 'sorteios.json'), []);
    if (entries.length) {
      await saveSorteios(db, entries);
      report.sorteios = entries.length;
    }
  }

  if (await tableCount(db, 'sorteio_settings') === 0) {
    const config = readJsonFile(path.join(root, 'content', 'sorteio.json'), null);
    if (config) {
      await saveSorteioConfig(db, config);
      report.sorteioConfig = 1;
    }
  }

  if (await tableCount(db, 'guia_cultivo') === 0) {
    const guia = readJsonFile(path.join(root, 'content', 'guia-cultivo.json'), null);
    if (guia) {
      await saveGuiaCultivo(db, guia);
      report.guia = 1;
    }
  }

  if (await tableCount(db, 'youtube_feed') === 0) {
    const feed = readJsonFile(path.join(root, 'content', 'youtube-feed.json'), null);
    if (feed) {
      await saveYoutubeFeed(db, feed);
      report.youtube = 1;
    }
  }

  return report;
}

async function ensureContentMigrated(db, root) {
  const kvReport = await migrateContentFromKv(db);
  const jsonReport = await migrateContentFromJsonFiles(db, root);
  const syncReport = await syncJsonToDbIfBehind(db, root);
  return { kv: kvReport, json: jsonReport, sync: syncReport };
}

async function syncJsonToDbIfBehind(db, root) {
  const report = {};

  const postsJson = readJsonFile(path.join(root, 'posts.json'), []);
  const postsDb = await tableCount(db, 'posts');
  if (postsJson.length > postsDb) {
    report.posts = await importPosts(db, postsJson);
  }

  const pagesJson = readJsonFile(path.join(root, 'content', 'pages.json'), null);
  const pagesDb = await tableCount(db, 'pages');
  if (pagesJson && Object.keys(pagesJson).length > pagesDb) {
    report.pages = await importPages(db, pagesJson);
  }

  const siteJson = readJsonFile(path.join(root, 'content', 'site.json'), null);
  if (siteJson && (await tableCount(db, 'site_settings')) === 0) {
    await saveSite(db, siteJson);
    report.site = 1;
  }

  const sorteiosJson = readJsonFile(path.join(root, 'sorteios.json'), []);
  const sorteiosDb = await tableCount(db, 'sorteio_entries');
  if (sorteiosJson.length > sorteiosDb) {
    await saveSorteios(db, sorteiosJson);
    report.sorteios = sorteiosJson.length;
  }

  return report;
}

async function contentTableCounts(db) {
  const tables = [
    'posts', 'pages', 'calculators', 'site_settings', 'nav_sections', 'nav_items',
    'guia_cultivo', 'guia_chapters', 'guia_videos', 'sorteio_settings', 'sorteio_entries',
    'sorteio_alert_subscribers', 'youtube_feed', 'youtube_feed_videos', 'users', 'loja_orders'
  ];
  const out = {};
  for (const t of tables) {
    out[t] = await tableCount(db, t);
  }
  return out;
}

module.exports = {
  pageSection,
  loadPosts,
  savePosts,
  loadPages,
  savePages,
  loadCalculators,
  saveCalculators,
  loadSite,
  saveSite,
  loadGuiaCultivo,
  saveGuiaCultivo,
  loadSorteioConfig,
  saveSorteioConfig,
  loadSorteios,
  saveSorteios,
  loadSorteioAlertSubscribers,
  getSorteioAlertSubscriberByUserId,
  upsertSorteioAlertSubscriber,
  deactivateSorteioAlertSubscriber,
  loadLojaOrders,
  saveLojaOrders,
  loadYoutubeFeed,
  saveYoutubeFeed,
  loadSeriesOptions,
  upsertSeriesOption,
  deleteSeriesOption,
  ensureContentMigrated,
  contentTableCounts,
  tableCount,
  readJsonFile
};

// --- Séries de publicações ---

async function loadSeriesOptions(db, category) {
  const sql = category
    ? 'SELECT id, label, category, sort_order FROM post_series WHERE category = ? ORDER BY sort_order, label'
    : 'SELECT id, label, category, sort_order FROM post_series ORDER BY category, sort_order, label';
  const r = category
    ? await db.execute({ sql, args: [category] })
    : await db.execute(sql);
  return r.rows.map((row) => ({
    id: row.id,
    label: row.label,
    category: row.category,
    sortOrder: row.sort_order
  }));
}

async function upsertSeriesOption(db, item) {
  await db.execute({
    sql: `INSERT INTO post_series (id, label, category, sort_order, created_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET label = excluded.label, category = excluded.category, sort_order = excluded.sort_order`,
    args: [String(item.id), String(item.label), String(item.category || 'inspecao'), Number(item.sortOrder) || 0, new Date().toISOString()]
  });
}

async function deleteSeriesOption(db, id) {
  await db.execute({ sql: 'DELETE FROM post_series WHERE id = ?', args: [String(id)] });
}
