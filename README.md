# Inspetor BudGanja

Site do laboratório **Inspetor BudGanja** com painel administrativo para publicar pesquisas, editar páginas e gerir o menu.

## Início rápido

```bash
npm start
```

Aceda a `http://localhost:8080/login.html` — credenciais padrão: `admin` / `test123`

## Como publicar uma pesquisa

1. Faça login e aceda ao **Admin**
2. Preencha **Título** e **Resumo** (aparece no card da listagem)
3. Escolha a **Categoria** (Pesquisas ou Equipamentos)
4. Escreva o conteúdo em **Markdown** — use os botões da barra ou envie imagens
5. Marque **Publicar no site** ou desmarque para rascunho
6. Clique **Publicar** ou **Salvar alterações**

### Markdown suportado

- `## Título`, `**negrito**`, `*itálico*`
- `- lista` e `1. lista numerada`
- `> citação`, blocos de código com \`\`\`
- `![descrição](/uploads/foto.png)`

### Rascunhos

Desmarque **Publicar no site** para guardar como rascunho — só visível no admin.

## Estrutura

```
ProjectBudGanja/
├── admin.html, login.html
├── pesquisas.html          # Listagem (posts injetados pelo servidor + JS)
├── post-*.html             # Páginas geradas automaticamente
├── posts.json              # Metadados das publicações
├── content/
│   ├── pages.json          # Conteúdo das páginas fixas
│   └── site.json           # Menu e rodapé
├── _server.js, _content.js, _markdown.js
└── js/ (layout.js, admin.js, posts.js, markdown.js, login.js)
```

## Variáveis de ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `ADMIN_USER` | `admin` | Utilizador |
| `RESEARCH_PASS` | `test123` | Palavra-passe |
| `PORT` | `8080` | Porta |

## Deploy

O site funciona em **dois ambientes** com a **mesma API** (`/api/*`):

### Local (`npm start`)
Servidor Node na porta 8080. Dados em ficheiros (`posts.json`, `content/`).

### Netlify (Admin online)
- **Netlify Functions** servem a API (`netlify/functions/`)
- **Netlify Blobs** guardam posts, páginas, menu e sessões
- Build (`npm run build`) exporta ficheiros estáticos a partir dos Blobs

**Configuração no Netlify → Site settings → Environment variables:**

| Variável | Exemplo | Descrição |
|----------|---------|-----------|
| `ADMIN_USER` | `admin` | Utilizador do Admin |
| `RESEARCH_PASS` | `sua-senha-segura` | Palavra-passe |
| `NETLIFY_BUILD_HOOK` | *(opcional)* | URL do build hook para rebuild após editar |

**Build settings** (já em `netlify.toml`):

| Campo | Valor |
|-------|--------|
| Build command | `npm run build` |
| Publish directory | `.` |

Após deploy, aceda a `https://seu-site.netlify.app/login.html` — o Admin funciona online.

**Fluxo:** login no Netlify → editar conteúdo → dados guardados nos Blobs → listagens e posts actualizados via API (imediato) → rebuild opcional para HTML estático.

## Aviso legal

Conteúdo educacional. Consulte a legislação local antes de qualquer atividade relacionada com cultivo vegetal.
