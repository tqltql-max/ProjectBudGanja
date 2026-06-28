# Arquitetura do repositório — Inspetor BudGanja

Este projeto **não** é um monorepo clássico `frontend/` + `backend/`. É um **site estático com servidor Node** e painel admin: as pastas na raiz coincidem com as **URLs públicas** (`/equipamentos/`, `/biblioteca/pesquisas/`, etc.). Mover essas pastas para dentro de `frontend/` quebraria links, sitemap, PWA e deploy.

O que parece “extenso” na raiz é, na maior parte, o **site publicado**. O código de sistema já está agrupado em `lib/`, `server/` e `scripts/`.

## Visão em camadas

```
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 1 — Site público (URLs = pastas na raiz)            │
│  index.html, biblioteca/, equipamentos/, calculadoras/,     │
│  css/, js/, imagens/, posts/, loja/, sw.js, manifest.json   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 2 — Runtime (servidor + API)                        │
│  server/index.js  →  lib/api-handler.js, auth, stores       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 3 — Build (gera artefactos estáticos)               │
│  scripts/build.js  →  posts, guia, busca, sitemap, nav      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 4 — Dados                                           │
│  data/budganja.db (SQLite)  ·  content/*.json  ·  posts.json│
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│  CAMADA 5 — Deploy / produção                               │
│  deploy/, netlify/, .well-known/                            │
└─────────────────────────────────────────────────────────────┘
```

## O que é cada zona

| Zona | Pastas / ficheiros | Função |
|------|-------------------|--------|
| **Páginas do site** | `index.html`, `biblioteca/`, `equipamentos/`, `calculadoras/`, `guia/`, `loja/`, `info/`, `videos/`, `sorteios/`, `entrar.html`, `perfil.html` | HTML servido tal como está; caminho = URL |
| **Assets do browser** | `css/`, `js/`, `imagens/`, `favicon.svg` | CSS, JS do layout, calculadoras, ícones PWA |
| **Publicações geradas** | `posts/`, `posts.json`, `posts-public.json` | Artigos da biblioteca (build a partir do admin/BD) |
| **Índices gerados** | `search-index.json`, `sitemap.xml`, `version.json`, `js/*-data.js` | Busca, SEO, cache-bust — **não editar à mão** |
| **Backend partilhado** | `lib/` | Lógica: API, auth, SQLite, CMS, nav, loja Magalu, posts |
| **Servidor HTTP** | `server/index.js` | Estáticos + `/api/*` em desenvolvimento e PM2 |
| **Pipeline** | `scripts/` | `npm run build`, migrações, sync páginas ↔ BD |
| **Conteúdo / seed** | `content/` | JSON de site, páginas, guia, sorteio, loja (espelho da BD) |
| **Base de dados** | `data/budganja.db` | SQLite local (não versionado) |
| **Deploy** | `deploy/`, `netlify/` | Túnel Cloudflare, TWA Android, functions Netlify |
| **Uploads** | `uploads/` | Imagens enviadas pelo admin |

## `lib/` — mapa rápido

| Subárea | Ficheiros típicos |
|---------|-------------------|
| **API** | `api-handler.js`, `content-service.js`, `posts-service.js` |
| **CMS / páginas** | `content-store.js`, `page-html.js`, `sync-db-files.js` |
| **Auth** | `auth-service.js`, `user-auth-service.js`, `oauth-state-service.js` |
| **Navegação** | `biblioteca-nav.js`, `ferramentas-nav.js`, `clonadoras-nav.js` |
| **Domínio** | `loja-catalog.js`, `magalu-influencer.js`, `calculadoras-registry.js`, `sorteios-service.js` |
| **BD** | `lib/db/schema.sql`, `lib/db/content-repos.js`, `store-sql.js` |
| **Utilitários** | `paths.js`, `asset-version.js`, `security-headers.js` |

`lib/paths.js` define `ROOT` como a pasta do projeto — qualquer mudança de estrutura física exige atualizar dezenas de referências.

## Fluxo típico de alteração

1. **Página fixa** — editar `equipamentos/foo.html` → `npm run sync:pages` (ou `npm run build`) → BD atualizada.
2. **Só lógica servidor** — editar `lib/` → reiniciar `npm start` / `deploy/start-now.ps1`.
3. **Catálogo loja / menu** — editar `lib/loja-catalog.js` ou `lib/biblioteca-nav.js` → `npm run build`.
4. **Post novo** — Admin ou `posts.json` → `npm run build:posts`.

## Por que não separar em `frontend/` e `backend/`?

| Motivo | Detalhe |
|--------|---------|
| URLs | `/equipamentos/clonadora-6-estacas.html` tem de existir nesse caminho no disco |
| Netlify / Cloudflare | Servem a raiz do repo como document root |
| PWA | `sw.js` lista centenas de caminhos absolutos |
| Custo | Mover exigiria redirects, retestar tudo, sem ganho para o utilizador final |

Um layout `apps/web` + `packages/api` só compensa se o projeto crescer para **várias apps** (app mobile separado, API só JSON, etc.). Hoje o modelo **site estático + lib Node** é adequado ao tamanho do BudGanja.

## O que pode melhorar sem mover pastas

- Manter **regra de ouro**: HTML público na raiz; lógica em `lib/`; automação em `scripts/`.
- Novos módulos de servidor → `lib/nome-modulo.js` (ou `lib/nome/` se crescer muito).
- Novos scripts de build → `scripts/sync-*.js` ou `scripts/build-*.js`, registados em `scripts/build.js`.
- Documentação de dados → [`estrutura-dados.md`](estrutura-dados.md).

## Ficheiros soltos na raiz (normal)

| Ficheiro | Motivo |
|----------|--------|
| `login.html`, `admin.html` | URLs fixas do admin |
| `sw.js`, `manifest.json` | PWA na raiz por convenção |
| `posts.json` | Fonte legada / espelho de metadados |
| `netlify.toml`, `_redirects` | Config de hosting |

## Resumo

A estrutura **está organizada por função**, mas **não por pasta de topo única**, porque o produto é um site cujas pastas são rotas. O que importa para desenvolvimento:

- **Ver / alterar o site** → pastas de páginas + `css/` + `js/`
- **Ver / alterar API e regras** → `lib/` + `server/`
- **Ver / alterar build** → `scripts/`
- **Ver dados** → `data/` + `content/` + [`estrutura-dados.md`](estrutura-dados.md)
