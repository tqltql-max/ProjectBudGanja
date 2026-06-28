# Inspetor BudGanja

Site do laboratório **Inspetor BudGanja** com painel administrativo para publicar pesquisas, inspeções, equipamentos, sorteios e editar páginas fixas.

Canais: [@InspetorBudGanja](https://www.youtube.com/@InspetorBudGanja)

## Início rápido

```bash
npm install
npm start
```

Aceda a `http://localhost:8080` — Admin em `/login.html`

**Credenciais locais (apenas desenvolvimento):** `admin` / `test123`

> Em produção (Netlify), defina `ADMIN_USER` e `RESEARCH_PASS` seguros. Nunca use as credenciais padrão online.

## Git e backups

Repositório Git na raiz. A base `data/budganja.db` **não** é versionada. Backup recomendado fora do projecto:

```powershell
npm run db:backup:external
```

Detalhes: [`docs/GIT.md`](docs/GIT.md) · copie `.env.example` → `.env`

## Menu do site

| Secção | Páginas |
|--------|---------|
| **Cultivo** | [Diário de Cultivo](/cultivo/) · [Minha conta](/perfil.html) |
| **Biblioteca** | [Inspeções](/biblioteca/inspecoes/) (série Guia de Cultivo), [Pesquisas](/biblioteca/pesquisas/), [Equipamentos](/equipamentos/) |
| **Ferramentas** | [Calculadoras](/calculadoras/), [Luxímetro](/calculadoras/luximetro.html) |
| **Conteúdo** | [Sorteios](/sorteios/), [Últimos vídeos](/videos/), [Loja parceira](/loja/) |

> O antigo [Guia de Cultivo](/guia/cultivo-basico.html) redireciona para as [Inspeções](/biblioteca/inspecoes/) — cada capítulo em vídeo virou relatório técnico com embed do YouTube.

## Funcionalidades

- **Busca no site** — botão no header ou `Ctrl+K` (índice em `search-index.json`)
- **Breadcrumbs** — navegação contextual em páginas internas
- **Tema claro/escuro** — botão ◐ no header (preferência guardada localmente)
- **PWA offline** — calculadoras, inspeções, luxímetro e índice de busca em cache
- **App Android (Play Store)** — preparado via TWA; guia em [`deploy/android/PLAY-STORE.md`](deploy/android/PLAY-STORE.md)
- **SEO** — sitemap dinâmico, JSON-LD (Organization, Article, Course, VideoObject), OG por post
- **Segurança** — rate limit no login (8 tentativas / 15 min), headers CSP/HSTS-like no servidor e Netlify

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm start` | Servidor local na porta 8080 |
| `npm run build` | Build completo: posts, páginas, guia, YouTube, busca, sitemap |
| `npm run build:posts` | Regenera HTML dos posts a partir de `posts.json` |
| `npm run sync:pages` | Sincroniza `content/pages.json` a partir dos HTML |
| `npm run build:guia` | Actualiza `content/guia-cultivo.json` via RSS |
| `npm run build:youtube` | Actualiza `content/youtube-feed.json` via RSS |
| `npm run build:search` | Gera `search-index.json` |
| `npm run build:sitemap` | Gera `sitemap.xml` (usa `SITE_URL` ou URL Netlify) |
| `npm run build:assetlinks` | Gera `.well-known/assetlinks.json` (TWA / Play Store) |
| `npm run test:lib` | Testes unitários (merge inspeções, calculadoras) |
| `npm run test:site` | Testes HTTP com servidor a correr (`npm start` noutro terminal) |
| `npm run check:assetlinks` | Valida TWA / `.well-known/assetlinks.json` |
| `npm run db:backup:external` | Cópia de `data/budganja.db` para `~/BudGanjaBackups/` |

### Build e deploy

O comando `npm run build` executa, por ordem:

1. Export de `posts-public.json` e placeholders nas listagens
2. `sync:pages`
3. `build:guia` · `build:youtube` · `build:search` · `build:sitemap` · `build:assetlinks`

Defina `SITE_URL=https://inspetorbudganja.com.br` para o sitemap apontar ao domínio correcto.

### Google Play Store (TWA)

1. Instalar JDK 17 + Android Studio (ver `deploy/android/PLAY-STORE.md`)
2. `.\deploy\android\init-twa.ps1` — gera projecto Android
3. `.\deploy\android\get-signing-fingerprint.ps1` — copiar SHA-256 para `deploy/android/assetlinks.config.json`
4. `npm run build` — publica `/.well-known/assetlinks.json`
5. `.\deploy\android\build-twa.ps1` — gera `.aab` para a Play Console

## Publicar — inspetorbudganja.com.br (Registro.br)

Modo prático: **Cloudflare + túnel no PC Windows** (pasta `deploy/`).

1. [Cloudflare](https://dash.cloudflare.com) → Add site → `inspetorbudganja.com.br`
2. [Registro.br](https://registro.br) → **Alterar servidores DNS** → 2 nameservers da Cloudflare
3. ```powershell
   cd deploy
   .\setup.ps1
   ```
4. Editar `..\.env` — senha `RESEARCH_PASS` + Google OAuth (`GOOGLE_CLIENT_ID`). Script guiado: `.\deploy\setup-google-login.ps1`
5. Túnel (uma vez):
   ```powershell
   cloudflared tunnel login
   cloudflared tunnel create budganja
   ```
   Copiar `deploy\cloudflared.config.example.yml` → `%USERPROFILE%\.cloudflared\config.yml` (ajustar Tunnel ID e user)
   ```powershell
   cloudflared tunnel route dns budganja inspetorbudganja.com.br
   cloudflared tunnel route dns budganja www.inspetorbudganja.com.br
   ```
6. ```powershell
   .\deploy\start-site.ps1
   ```

**URLs:** https://inspetorbudganja.com.br · Admin: `/login.html`

O PC deve ficar ligado (PM2: `pm2 status`).

### Testes locais

```bash
npm start
# noutro terminal:
npm run test:site
```

## Google Search Console

1. Deploy com `sitemap.xml` actualizado
2. Adicione a propriedade do site em [Search Console](https://search.google.com/search-console)
3. Envie `https://inspetorbudganja.com.br/sitemap.xml` como mapa do site

## Como publicar conteúdo

1. Login → **Admin**
2. Preencha título, resumo, categoria e corpo em Markdown
3. Opcional: imagem de capa (usada em OG/Twitter Cards)
4. Marque **Publicar no site** ou guarde como rascunho
5. **Publicar** — rebuild automático se `NETLIFY_BUILD_HOOK` estiver definido

## Login administrativo

Aceda a `/login.html` com `ADMIN_USER` e `RESEARCH_PASS` definidos no `.env`. Após entrar, use **Admin** para gerir publicações, sorteios e produtos.

## Conta de cultivador (Google)

Utilizadores do site entram em **`/entrar.html`** com Google e completam o cadastro em **`/perfil.html`** com **nome** e **idade** (obrigatório **18 anos ou mais**). Depois acedem ao painel com ferramentas, plano e diário.

Configure no `.env`:

| Variável | Descrição |
|----------|-----------|
| `GOOGLE_CLIENT_ID` | OAuth 2.0 Client ID (Google Cloud Console → Credentials → Web application) |

Origens autorizadas no Google Cloud: `https://inspetorbudganja.com.br` e `http://localhost:8080` (desenvolvimento).

## Sorteios e newsletter

- Configuração: `content/sorteio.json` ou Admin → Sorteios
- Avisos por e-mail: link na página [Contato](/info/contato.html)

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `ADMIN_USER` | `admin` | Utilizador do Admin |
| `RESEARCH_PASS` | `test123` | Palavra-passe (**alterar em produção**) |
| `GOOGLE_CLIENT_ID` | — | Login Google em `/entrar.html` |
| `SITE_DEV_MODE` | — | `1` = visitantes veem tela «em construção»; admin autenticado vê o site |
| Idiomas | `pt-BR`, `en`, `es` | Detecção automática do navegador; seletor no header; preferência guardada no browser |
| `PORT` | `8080` | Porta local |
| `SITE_URL` | `https://inspetorbudganja.com.br` | Base do site e sitemap |
| `YOUTUBE_CHANNEL_ID` | canal Inspetor | RSS do feed de vídeos |
| `NETLIFY_BUILD_HOOK` | — | Rebuild após editar no Admin online |
| `TURSO_DATABASE_URL` | — | Base SQL remota (produção Netlify) |
| `TURSO_AUTH_TOKEN` | — | Token Turso |
| `STORE_BACKEND` | `sql` (local) | `sql`, `fs` ou `blobs` |

## Base de dados

Localmente, `npm start` grava utilizadores, sessões e conteúdo dinâmico em **`data/budganja.db`** (SQLite). Na primeira execução importa dados de `content/users.json` se existirem.

### Checklist (primeira vez ou novo PC)

```powershell
npm install
npm run db:migrate    # criar schema + importar JSON → tabelas SQL
npm run test:db       # validar persistência Admin + utilizador (28 testes)
npm run build         # exporta BD → JSON estático + gera HTML
deploy\start-now.ps1  # migra + build + servidor
```

| Comando | Função |
|---------|--------|
| `npm run db:migrate` | Schema + importação JSON legado |
| `npm run test:db` | Testa gravação em `posts`, `pages`, `users`, `sorteio_entries`, etc. |
| `npm run db:backup` | Cópia em `data/backups/budganja-YYYY-MM-DD.db` |
| `npm run db:backup:external` | Cópia **fora do repo** (`~/BudGanjaBackups/` — ver [`docs/GIT.md`](docs/GIT.md)) |
| DB Browser for SQLite | Abrir `data/budganja.db` (pare o servidor antes) |

Documentação: [`docs/GIT.md`](docs/GIT.md) (Git e backups) · [`docs/estrutura-dados.md`](docs/estrutura-dados.md) (tabelas SQL) · [`docs/ARQUITETURA.md`](docs/ARQUITETURA.md) (mapa do repositório) · [`docs/CHECKLIST-ALTERACOES.md`](docs/CHECKLIST-ALTERACOES.md) (**checklist ~5 min** após cada alteração)

Produção Netlify: Turso (`TURSO_*`) ou Netlify Blobs sem Turso.

### Mapa do repositório

O site público **tem de ficar na raiz** (cada pasta = URL). Código de sistema: `lib/` + `server/` + `scripts/`. Detalhes e diagrama: **[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)**.

```
ProjectBudGanja/
├── [SITE — URLs públicas]
│   ├── index.html, entrar.html, perfil.html, login.html, admin.html
│   ├── biblioteca/, guia/, equipamentos/, calculadoras/, loja/, info/, videos/, sorteios/
│   ├── css/, js/, imagens/, posts/
│   └── sw.js, manifest.json, favicon.svg
├── [RUNTIME]
│   ├── server/index.js          # HTTP local + API
│   └── lib/                     # API, auth, CMS, nav, loja, BD (ver ARQUITETURA.md)
├── [BUILD]
│   └── scripts/                 # npm run build, sync, testes
├── [DADOS]
│   ├── content/                 # JSON espelho / seed
│   ├── data/budganja.db         # SQLite local (não versionado)
│   └── posts.json
├── [GERADOS — não editar à mão]
│   └── search-index.json, sitemap.xml, version.json, js/*-data.js
└── [DEPLOY]
    ├── deploy/                  # Cloudflare tunnel, PM2
    └── netlify/                 # Functions serverless
```

## Aviso legal

Conteúdo educacional. Consulte a legislação local antes de qualquer atividade relacionada com cultivo vegetal.
