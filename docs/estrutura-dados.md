# Estrutura de dados — Project BudGanja

Base de dados **SQLite** (`data/budganja.db` localmente; **Turso** em produção). Cada tipo de conteúdo tem **tabela própria** — não usa JSON genérico para dados dinâmicos.

## Mapa de tabelas

| Área | Tabela(s) | O que guarda |
|------|-----------|--------------|
| **Utilizadores** | `users` | Conta/autenticação + onboarding progressivo + segurança/auditoria (`email_verified_at`, `birth_date`, `username`, `registration_ip`, `account_status`, `activity_log_json`) + `profile_json` (metadados de perfil, sem diário) + `is_admin` |
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

## Convenção oficial de nomenclatura

Para manter banco, backend, API e painel admin coesos, a convenção oficial é:

- Banco SQL: `snake_case` (colunas e tabelas)
- Contrato de API e frontend: `camelCase`
- Camada de persistência: responsável por mapear `snake_case <-> camelCase`

Mapa canônico aplicado em código (`lib/persistence-naming.js`):

| Domínio | Banco (SQL) | API/Admin (canônico) | Alias legado suportado |
|--------|--------------|----------------------|------------------------|
| Sorteios | `user_id` | `userId` | — |
| Sorteios | `cpf_formatado` | `cpfFormatado` | — |
| Sorteios | `premio_id` | `premioId` | — |
| Sorteios | `premio_label` | `premioLabel` | `premio` |
| Sorteios | `created_at` | `createdAt` | — |
| Loja | `product_id` | `productId` | `produto` (entrada) |
| Loja | `product_title` | `productTitle` | — |
| Loja | `package_id` | `packageId` | `pacote` (entrada) |
| Loja | `package_label` | `packageLabel` | — |
| Loja | `package_price_note` | `packagePriceNote` | — |
| Loja | `user_id` | `userId` | — |
| Loja | `created_at` | `createdAt` | — |
| Utilizadores | `google_id` | `googleId` | — |
| Utilizadores | `email_verified_at` | `emailVerifiedAt` / `emailVerified` | — |
| Utilizadores | `username` | `username` | `userName`, `user_name` |
| Utilizadores | `birth_date` | `birthDate` | — |
| Utilizadores | `local_password_hash` | `localPasswordHash` | — |
| Utilizadores | `local_password_updated_at` | `localPasswordUpdatedAt` | — |
| Utilizadores | `reset_token_hash` | `resetTokenHash` | — |
| Utilizadores | `reset_token_expires_at` | `resetTokenExpiresAt` | — |
| Utilizadores | `registration_ip` | `registrationIp` | — |
| Utilizadores | `last_login_at` | `lastLoginAt` | — |
| Utilizadores | `last_login_ip` | `lastLoginIp` | — |
| Utilizadores | `account_status` | `accountStatus` | — |
| Utilizadores | `onboarding_stage` | `onboardingStage` | — |
| Utilizadores | `activity_log_json` | `activityLog` | `activity_log` |
| Utilizadores | `is_admin` | `isAdmin` | — |
| Utilizadores | `created_at` | `createdAt` | — |
| Utilizadores | `updated_at` | `updatedAt` | — |
| Sessões admin | `expires_at` | `expiresAt` | — |
| Sessões utilizador | `user_id` | `userId` | — |
| Sessões utilizador | `expires_at` | `expiresAt` | — |
| OAuth states | `return_to` | `returnTo` | — |
| OAuth states | `created_at` | `createdAt` | — |
| OAuth states | `expires_at` | `expiresAt` | — |

Notas de arquitetura:

- A escrita em SQL ocorre sempre com campos normalizados canônicos.
- A leitura para API/admin retorna `camelCase` previsível; aliases são mantidos apenas para retrocompatibilidade.
- Novas tabelas devem seguir o mesmo padrão (SQL em `snake_case`, contrato externo em `camelCase`).
- Teste de contrato: `npm run test:api:contract` valida automaticamente payloads canônicos em endpoints administrativos críticos.

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

### `users` (segurança, auditoria e onboarding)

| Coluna | Descrição |
|-------|-----------|
| `email_verified_at` | Timestamp ISO de verificação de e-mail (Google já entra verificado) |
| `username` | Nome de utilizador único (índice único parcial, ignorando vazio) |
| `birth_date` | Data de nascimento canônica (`YYYY-MM-DD`) para cálculo dinâmico de idade |
| `registration_ip` | IP de criação da conta |
| `last_login_at`, `last_login_ip` | Último acesso autenticado |
| `account_status` | `pending_profile`, `active`, `suspended`, `disabled` |
| `onboarding_stage` | `initial`, `profile_pending`, `complete` |
| `activity_log_json` | Últimos eventos de autenticação/perfil (janela curta) |

### `users.profile_json` (metadados de perfil)

| Campo | Descrição |
|-------|-----------|
| `displayName`, `age`, `username`, `birthDate` | Dados de perfil para UX; idade é dinâmica com base em `birthDate` |
| `avatarUrl`, `experience`, `environment`… | Metadados opcionais do cultivador |

**Não guardar** `growLogs`, `journal`, `planTasks` em `profile_json` — usar tabelas `cultivo_*`.

### Permissões de administrador

| Origem | Descrição |
|--------|-----------|
| `users.is_admin` | Concedido em `/usuarios-admin.html` (API `POST /api/admin/users/:id/admin`) |
| `ADMIN_EMAILS` (env) | Lista de e-mails com acesso admin via Google (complementar) |
| `admin_sessions` | Login por palavra-passe em `/login.html` |

Painel: `usuarios-admin.html` · API: `GET /api/admin/users`, `GET /api/admin/users/:id`.
