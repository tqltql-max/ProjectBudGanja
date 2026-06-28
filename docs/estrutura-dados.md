# Estrutura de dados — Project BudGanja

Base de dados **SQLite** (`data/budganja.db` localmente; **Turso** em produção). Cada tipo de conteúdo tem **tabela própria** — não usa JSON genérico para dados dinâmicos.

## Mapa de tabelas

| Área | Tabela(s) | O que guarda |
|------|-----------|--------------|
| **Utilizadores** | `users` | Conta Google + `profile_json` (nome, idade, avatar — **sem** diário) + `is_admin` |
| **Diário de Pesquisas** | `cultivo_settings`, `cultivo_grows`, `cultivo_entries`, `cultivo_plan_tasks`, `cultivo_submissions` | Pesquisas de cultivo por utilizador + fila de publicação |
| **Sessões** | `user_sessions`, `admin_sessions`, `oauth_states` | Login utilizador, admin, OAuth |
| **Publicações** | `posts` | Artigos da biblioteca (markdown, capa, categoria) |
| **Páginas CMS** | `pages` | HTML editável: biblioteca, calculadoras, guia, equipamentos, info… |
| **Calculadoras** | `calculators` | Registo das 10 ferramentas (slug, href, ícone, descrição) |
| **Site** | `site_settings` | Nome, footer, e-mails, URLs YouTube |
| **Navegação** | `nav_sections`, `nav_groups`, `nav_items` | Menu principal (Biblioteca, Ferramentas, Sorteios…) |
| **Rodapé** | `footer_links`, `footer_groups`, `footer_group_links` | Links do footer |
| **Guia de cultivo** | `guia_cultivo`, `guia_chapters`, `guia_videos` | Trilha em vídeo @InspetorBudGanja |
| **Sorteios** | `sorteio_settings`, `sorteio_prizes`, `sorteio_entries`, `sorteio_alert_subscribers` | Config + inscrições + alertas |
| **Loja** | `loja_orders` | Pedidos de encomenda |
| **YouTube** | `youtube_feed`, `youtube_feed_videos` | Feed do canal Inspetor |

Schema SQL: `lib/db/schema.sql` · Repositórios: `lib/db/content-repos.js`, `lib/db/cultivo-repos.js`

## Diário de Pesquisas (`cultivo_*`)

Dados do módulo `/cultivo/` — API `GET/PUT /api/cultivo`, fotos `POST /api/cultivo/photo`.

| Tabela | Conteúdo |
|--------|----------|
| `cultivo_settings` | Fase activa, grow activo (roteiro global legado — migrado para `cultivo_grows`) |
| `cultivo_grows` | Cada pesquisa: nome, espécie, fase, nº plantas, ambiente, substrato, data plantio, `custom_guide`, `guide_week_notes` |
| `cultivo_entries` | Registos do diário (texto, métricas JSON, fotos, tipo) |
| `cultivo_plan_tasks` | Lembretes e tarefas do plano |
| `cultivo_submissions` | Fila de submissão ao laboratório (`pending` → `approved` / `rejected`) |

API de submissão: `POST /api/cultivo/submit`, `GET /api/cultivo/submissions`. Admin: `pesquisas-admin.html`, rotas `/api/admin/cultivo-submissions/*`.

Migração legada: dados antigos em `users.profile_json` (campo `growLogs`) são importados para estas tabelas na primeira leitura (`lib/cultivo-user-service.js`).

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
| `id` | ex.: `calculadoras/cultivo-lab.html`, `biblioteca/pesquisas/substratos.html` |
| `section` | `biblioteca`, `calculadoras`, `guia`, `equipamentos`, `info`, `site`… |

### `users.profile_json` (apenas perfil de conta)

| Campo | Descrição |
|-------|-----------|
| `displayName`, `age` | Obrigatórios para aceder ao diário (≥18 anos) |
| `avatarUrl`, `experience`, `environment`… | Metadados opcionais do cultivador |

**Não guardar** `growLogs`, `journal`, `planTasks` em `profile_json` — usar tabelas `cultivo_*`.

### Permissões de administrador

| Origem | Descrição |
|--------|-----------|
| `users.is_admin` | Concedido em `/usuarios-admin.html` (API `POST /api/admin/users/:id/admin`) |
| `ADMIN_EMAILS` (env) | Lista de e-mails com acesso admin via Google (complementar) |
| `admin_sessions` | Login por palavra-passe em `/login.html` |

Painel: `usuarios-admin.html` · API: `GET /api/admin/users`, `GET /api/admin/users/:id`.
