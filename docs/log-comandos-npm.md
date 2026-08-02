# Log de comandos npm — Inspetor BudGanja

Referência rápida de todos os scripts definidos em `package.json`.
Correr na **raiz do projeto** (`ProjectBudGanja`).

Última actualização: 2026-08-02 (livro XIV + catálogos).

---

## Uso diário / deploy

```bash
npm start
npm run start:dev
npm run start:quick
npm run start:quick:tunnel
npm run deploy:online
```

| Comando | O que faz |
|---------|-----------|
| `npm start` / `start:dev` | Servidor Node local |
| `npm run start:quick` | Arranque rápido local (sem migrate/build) |
| `npm run start:quick:tunnel` | Local + túnel Cloudflare |
| `npm run deploy:online` | Build + servidor + túnel (`deploy/start-site.ps1`) |

---

## Build do site

```bash
npm run build
npm run build:posts
npm run stamp:hero
npm run optimize:hero
npm run build:guia
npm run build:youtube
npm run build:radio
npm run build:plantas
npm run build:animais
npm run build:search
npm run build:sitemap
npm run build:assetlinks
npm run build:apresentacao-pdf
```

| Comando | O que faz |
|---------|-----------|
| `npm run build` | Pipeline completo (ícones, posts, páginas, hub vídeos, busca, sitemap…) |
| `npm run build:posts` | Regenera HTML dos posts a partir de `posts.json` |
| `npm run stamp:hero` | Estampa versão de assets nos HTML |
| `npm run optimize:hero` | Optimiza variantes do hero |
| `npm run build:guia` | Actualiza `content/guia-cultivo.json` |
| `npm run build:youtube` | Feed do canal Inspetor |
| `npm run build:radio` | Playlist da rádio |
| `npm run build:plantas` | Hub + fichas `/plantas/` |
| `npm run build:animais` | Hub + fichas `/animais/` |
| `npm run build:search` | `search-index.json` |
| `npm run build:sitemap` | `sitemap.xml` |
| `npm run build:assetlinks` | TWA / Play Store |
| `npm run build:apresentacao-pdf` | PDF da apresentação UNIFESP |

---

## Páginas e sync

```bash
npm run sync:pages
npm run sync:pages:db
npm run sync:pages:all
```

| Comando | O que faz |
|---------|-----------|
| `npm run sync:pages` | HTML → `content/pages.json` |
| `npm run sync:pages:db` | `pages.json` → base SQL |
| `npm run sync:pages:all` | Os dois acima |

---

## Canais de vídeo / catálogos

```bash
npm run build:movrecam
npm run build:canabinall
```

| Comando | O que faz |
|---------|-----------|
| `npm run build:movrecam` | Catálogo YouTube MovReCam → `content/channels/movrecam.json` |
| `npm run build:canabinall` | Catálogo CANABinALL → `content/channels/canabinall.json` |

Professores (série no hub) regeneram-se no `npm run build` via `lib/movrecam-professor-series.js`.
Manual opcional:

```bash
node scripts/build-movrecam-professores.js
```

---

## Livro XIV — legendas das aulas (Vol. 1)

```bash
npm run fetch:xiv-transcripts
npm run build:xiv-livro
```

| Comando | O que faz |
|---------|-----------|
| `npm run fetch:xiv-transcripts` | Baixa legendas PT das aulas XIV → `content/transcripts/xiv/` |
| `npm run build:xiv-livro` | Gera Markdown + HTML do livro (`biblioteca/unifesp/livro-xiv.html`) |

Fluxo completo quando saem aulas novas:

```bash
npm run fetch:xiv-transcripts
npm run build:xiv-livro
npm run build
npm run deploy:online
```

Página pública: `/biblioteca/unifesp/livro-xiv.html`

---

## Base de dados

```bash
npm run db:migrate
npm run db:cleanup
npm run db:backup
npm run db:backup:external
npm run db:backup:schedule
```

| Comando | O que faz |
|---------|-----------|
| `npm run db:migrate` | Migrações SQL |
| `npm run db:cleanup` | Limpa artefactos de teste |
| `npm run db:backup` | Backup local da BD |
| `npm run db:backup:external` | Cópia para `~/BudGanjaBackups/` |
| `npm run db:backup:schedule` | Agendamento de backups |

---

## Testes e verificação

```bash
npm test
npm run test:lib
npm run test:db
npm run test:cultivo
npm run test:cultivo-submissions
npm run test:users-admin
npm run test:api:contract
npm run test:site
npm run verify
npm run check:assetlinks
npm run check:db:naming
```

| Comando | O que faz |
|---------|-----------|
| `npm test` | Suite principal de testes |
| `npm run test:lib` | Unitários (merge inspeções, calculadoras) |
| `npm run test:db` | Persistência BD |
| `npm run test:cultivo` | Persistência cultivo |
| `npm run test:cultivo-submissions` | Submissões de cultivo |
| `npm run test:users-admin` | Admin de utilizadores |
| `npm run test:api:contract` | Contrato API admin |
| `npm run test:site` | HTTP (servidor a correr noutro terminal) |
| `npm run verify` | Verificação geral |
| `npm run check:assetlinks` | Valida TWA / assetlinks |
| `npm run check:db:naming` | Audita snake_case na BD |

---

## Lista crua (copiar/colar)

```bash
npm start
npm run start:dev
npm run start:quick
npm run start:quick:tunnel
npm run deploy:online
npm run build
npm run stamp:hero
npm run optimize:hero
npm run build:posts
npm run sync:pages
npm run sync:pages:db
npm run sync:pages:all
npm run build:guia
npm run build:youtube
npm run build:radio
npm run build:plantas
npm run build:animais
npm run build:search
npm run build:sitemap
npm run build:assetlinks
npm run build:apresentacao-pdf
npm run test:site
npm run test:lib
npm run check:assetlinks
npm run db:migrate
npm run db:cleanup
npm run db:backup
npm run db:backup:external
npm run test:db
npm run test:cultivo
npm run test:cultivo-submissions
npm run test:users-admin
npm run test:api:contract
npm run check:db:naming
npm test
npm run verify
npm run db:backup:schedule
npm run build:movrecam
npm run build:canabinall
npm run fetch:xiv-transcripts
npm run build:xiv-livro
```

---

## Notas

- Após alterações de conteúdo/HTML/JS: preferir `npm run build` e depois `npm run deploy:online` (ou `deploy\start-site.ps1`).
- Scripts `node scripts/upsert-*.js` (inspeções pontuais) **não** estão no `package.json`; correm com `node scripts/…` quando necessário.
- Este ficheiro espelha o `package.json` — se adicionares um script npm, actualiza também este log.
