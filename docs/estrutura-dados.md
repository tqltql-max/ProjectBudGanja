# Estrutura de dados — Project BudGanja

Base de dados **SQLite** (`data/budganja.db` localmente; **Turso** em produção). Cada tipo de conteúdo tem **tabela própria** — não usa JSON genérico para dados dinâmicos.

## Mapa de tabelas

| Área | Tabela(s) | O que guarda |
|------|-----------|--------------|
| **Utilizadores** | `users` | Conta Google + `profile_json` (perfil, diários, plano) |
| **Sessões** | `user_sessions`, `admin_sessions`, `oauth_states` | Login cultivador, admin, OAuth |
| **Publicações** | `posts` | Artigos da biblioteca (markdown, capa, categoria) |
| **Páginas CMS** | `pages` | HTML editável: biblioteca, calculadoras, guia, equipamentos, info… |
| **Calculadoras** | `calculators` | Registo das 10 ferramentas (slug, href, ícone, descrição) |
| **Site** | `site_settings` | Nome, footer, e-mails, URLs YouTube |
| **Navegação** | `nav_sections`, `nav_groups`, `nav_items` | Menu principal (Biblioteca, Ferramentas, Sorteios…) |
| **Rodapé** | `footer_links`, `footer_groups`, `footer_group_links` | Links do footer |
| **Guia de cultivo** | `guia_cultivo`, `guia_chapters`, `guia_videos` | Trilha em vídeo @InspetorBudGanja |
| **Sorteios** | `sorteio_settings`, `sorteio_prizes`, `sorteio_entries` | Config + inscrições |
| **YouTube** | `youtube_feed`, `youtube_feed_videos` | Feed do canal Inspetor |

Schema SQL: `lib/db/schema.sql` · Repositórios: `lib/db/content-repos.js`

## Colunas principais

### `posts` (publicações / biblioteca)

| Coluna | Descrição |
|--------|-----------|
| `slug` | Identificador único |
| `title`, `excerpt`, `content_raw` | Conteúdo |
| `category` | `pesquisa`, `equipamento`, `inspecao`… |
| `published` | 0 ou 1 |
| `cover_image`, `filename`, `url`, `date` | Metadados |

### `pages` (CMS)

| Coluna | Descrição |
|--------|-----------|
| `id` | ex.: `calculadoras/vpd.html`, `biblioteca/pesquisas/substratos.html` |
| `section` | `biblioteca`, `calculadoras`, `guia`, `equipamentos`, `info`, `site`… |
| `title`, `body`, `scripts` | Conteúdo da página |
| `meta_description`, `og_*` | SEO |

### `calculators`

| Coluna | Descrição |
|--------|-----------|
| `slug` | `luximetro`, `vpd`, `dli`… |
| `label`, `href`, `icon`, `description` | UI e navegação |
| `featured`, `sort_order` | Destaque e ordem no menu |

### `users` + `profile_json`

Perfil do cultivador (diários `growLogs`, avatar, roteiro…) — ver secção anterior em `lib/user-auth-service.js`.

## Fluxo

```
Admin / API → lib/store-sql.js → lib/db/content-repos.js → tabelas SQL
Build estático → lê posts.json / pages.json do repo (artefactos gerados)
Runtime (npm start) → fonte da verdade = data/budganja.db
```

## Comandos

```bash
npm run db:migrate     # schema + importar JSON se tabelas vazias
deploy\start-now.ps1   # reiniciar servidor após mudanças em lib/
```

## Migração

1. **JSON no repo** (`posts.json`, `content/pages.json`, …) → importados na primeira execução
2. **kv_store legado** (BD v1) → copiados para tabelas dedicadas automaticamente
3. Ficheiros JSON continuam como seed/backup; **gravações da API vão para SQL**

## Produção

- **Turso**: `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` no Netlify
- Sem Turso: Netlify Blobs (comportamento anterior)

Variáveis: `.env.example` · Backend: `lib/create-store.js`
