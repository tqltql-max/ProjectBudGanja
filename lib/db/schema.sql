-- BudGanja — schema SQLite (libSQL) v2
-- Utilizadores e sessões

CREATE TABLE IF NOT EXISTS schema_migrations (
  version INTEGER PRIMARY KEY,
  applied_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  picture TEXT NOT NULL DEFAULT '',
  provider TEXT NOT NULL DEFAULT 'google',
  profile_json TEXT NOT NULL DEFAULT '{}',
  is_admin INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

CREATE TABLE IF NOT EXISTS user_sessions (
  token TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

CREATE TABLE IF NOT EXISTS admin_sessions (
  token TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  return_to TEXT NOT NULL DEFAULT '/perfil.html',
  created_at INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_oauth_states_expires ON oauth_states(expires_at);

-- Publicações (biblioteca / blog)

CREATE TABLE IF NOT EXISTS posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content_raw TEXT NOT NULL DEFAULT '',
  format TEXT NOT NULL DEFAULT 'markdown',
  filename TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  cover_image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'pesquisa',
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date);

-- Páginas CMS (biblioteca, calculadoras, guia, equipamentos, info…)

CREATE TABLE IF NOT EXISTS pages (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL DEFAULT 'site',
  label TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  og_title TEXT NOT NULL DEFAULT '',
  og_description TEXT NOT NULL DEFAULT '',
  og_type TEXT NOT NULL DEFAULT 'website',
  data_page TEXT NOT NULL DEFAULT '',
  head_extra TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  scripts TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_pages_section ON pages(section);

-- Calculadoras (ferramentas do laboratório)

CREATE TABLE IF NOT EXISTS calculators (
  slug TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  guide_post_slug TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_calculators_sort ON calculators(sort_order);

-- Configuração global do site + navegação

CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_name TEXT NOT NULL DEFAULT '',
  site_tagline TEXT NOT NULL DEFAULT '',
  footer_text TEXT NOT NULL DEFAULT '',
  privacy_updated TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  youtube_channel_url TEXT NOT NULL DEFAULT '',
  youtube_channel_label TEXT NOT NULL DEFAULT '',
  youtube_jardim_url TEXT NOT NULL DEFAULT '',
  youtube_jardim_label TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS nav_sections (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  mega INTEGER NOT NULL DEFAULT 0,
  mega_compact INTEGER NOT NULL DEFAULT 0,
  mega_header TEXT NOT NULL DEFAULT '',
  mega_header_href TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS nav_groups (
  id TEXT PRIMARY KEY,
  section_id TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (section_id) REFERENCES nav_sections(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS nav_items (
  id TEXT PRIMARY KEY,
  group_id TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  tile_label TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT '',
  slug TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (group_id) REFERENCES nav_groups(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_nav_items_slug ON nav_items(slug);

CREATE TABLE IF NOT EXISTS footer_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  label TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS footer_groups (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS footer_group_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  href TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY (group_id) REFERENCES footer_groups(id) ON DELETE CASCADE
);

-- Guia de cultivo

CREATE TABLE IF NOT EXISTS guia_cultivo (
  id TEXT PRIMARY KEY DEFAULT 'default',
  title TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  channel_url TEXT NOT NULL DEFAULT '',
  channel_name TEXT NOT NULL DEFAULT '',
  channel_id TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS guia_chapters (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  video_ids_json TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS guia_videos (
  youtube_id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  published TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  custom_title TEXT NOT NULL DEFAULT ''
);

-- Sorteios

CREATE TABLE IF NOT EXISTS sorteio_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  ativo INTEGER NOT NULL DEFAULT 0,
  em_breve INTEGER NOT NULL DEFAULT 1,
  titulo TEXT NOT NULL DEFAULT '',
  descricao TEXT NOT NULL DEFAULT '',
  data_sorteio TEXT NOT NULL DEFAULT '',
  google_form_url TEXT NOT NULL DEFAULT '',
  manual_url TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sorteio_prizes (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS sorteio_entries (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  cpf TEXT NOT NULL DEFAULT '',
  cpf_formatado TEXT NOT NULL DEFAULT '',
  telefone TEXT NOT NULL DEFAULT '',
  cidade TEXT NOT NULL DEFAULT '',
  estado TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  premio_id TEXT NOT NULL DEFAULT '',
  premio_label TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sorteio_entries_email ON sorteio_entries(email);

CREATE TABLE IF NOT EXISTS sorteio_alert_subscribers (
  user_id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  subscribed_at TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_sorteio_alert_email ON sorteio_alert_subscribers(email);

-- Feed YouTube (canal Inspetor)

CREATE TABLE IF NOT EXISTS youtube_feed (
  id TEXT PRIMARY KEY DEFAULT 'default',
  channel_id TEXT NOT NULL DEFAULT '',
  channel_url TEXT NOT NULL DEFAULT '',
  channel_name TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS youtube_feed_videos (
  youtube_id TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  published TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  url TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- Legado: kv_store (apenas migração; não usar em código novo)

CREATE TABLE IF NOT EXISTS kv_store (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS loja_orders (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL DEFAULT '',
  package_id TEXT NOT NULL DEFAULT '',
  package_label TEXT NOT NULL DEFAULT '',
  package_price_note TEXT NOT NULL DEFAULT '',
  nome TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  telefone TEXT NOT NULL DEFAULT '',
  cidade TEXT NOT NULL DEFAULT '',
  estado TEXT NOT NULL DEFAULT '',
  mensagem TEXT NOT NULL DEFAULT '',
  user_id TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'novo',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_loja_orders_product ON loja_orders(product_id);
CREATE INDEX IF NOT EXISTS idx_loja_orders_created ON loja_orders(created_at);

-- Diário de Pesquisas (utilizador autenticado)

CREATE TABLE IF NOT EXISTS cultivo_settings (
  user_id TEXT PRIMARY KEY,
  phase TEXT NOT NULL DEFAULT '',
  phase_started_at TEXT,
  active_grow_id TEXT NOT NULL DEFAULT '',
  custom_guide TEXT NOT NULL DEFAULT '',
  guide_week_notes TEXT NOT NULL DEFAULT '{}',
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cultivo_grows (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  planted_at TEXT,
  phase TEXT NOT NULL DEFAULT 'germinacao',
  plant_count INTEGER NOT NULL DEFAULT 1,
  species TEXT NOT NULL DEFAULT '',
  environment TEXT NOT NULL DEFAULT '',
  substrate TEXT NOT NULL DEFAULT '',
  custom_guide TEXT NOT NULL DEFAULT '',
  guide_week_notes TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cultivo_grows_user ON cultivo_grows(user_id);

CREATE TABLE IF NOT EXISTS cultivo_entries (
  id TEXT PRIMARY KEY,
  grow_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  entry_date TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  source TEXT NOT NULL DEFAULT 'manual',
  action_type TEXT NOT NULL DEFAULT 'obs',
  metrics_json TEXT NOT NULL DEFAULT '{}',
  photos_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL,
  FOREIGN KEY (grow_id) REFERENCES cultivo_grows(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cultivo_entries_grow ON cultivo_entries(grow_id);
CREATE INDEX IF NOT EXISTS idx_cultivo_entries_user ON cultivo_entries(user_id);

CREATE TABLE IF NOT EXISTS cultivo_plan_tasks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  label TEXT NOT NULL DEFAULT '',
  done INTEGER NOT NULL DEFAULT 0,
  tool_href TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  due_at TEXT,
  action_type TEXT NOT NULL DEFAULT '',
  grow_id TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cultivo_plan_tasks_user ON cultivo_plan_tasks(user_id);

CREATE TABLE IF NOT EXISTS cultivo_submissions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  grow_id TEXT NOT NULL,
  grow_name TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'pending',
  title TEXT NOT NULL DEFAULT '',
  excerpt TEXT NOT NULL DEFAULT '',
  content_md TEXT NOT NULL DEFAULT '',
  reviewer_note TEXT NOT NULL DEFAULT '',
  post_slug TEXT NOT NULL DEFAULT '',
  submitted_at TEXT NOT NULL,
  reviewed_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_status ON cultivo_submissions(status);
CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_user ON cultivo_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_cultivo_submissions_grow ON cultivo_submissions(grow_id);
