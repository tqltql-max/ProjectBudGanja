# Inspetor BudGanja

Site estático do laboratório **Inspetor BudGanja** — pesquisas técnicas, inspeções de equipamentos e manuais DIY para cultivo vegetal.

## Estrutura

```
ProjectBudGanja/
├── index.html              # Home + secção Inspeções
├── pesquisas.html          # Lista de pesquisas
├── pesquisa-substratos.html
├── bugigangas.html         # Equipamentos DIY
├── manual-clonadora.html
├── manual-hidrocloradora.html
├── contato.html            # Sobre + contacto
├── style.css
├── js/layout.js            # Header, footer e menu mobile
├── favicon.svg
└── imagens/
    ├── background-hero.svg
    ├── clonadora.svg
    └── hidrocloradora.svg
```

## Desenvolvimento local

Abra `index.html` num browser ou use um servidor local:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Aceda a `http://localhost:8080`.

## Deploy

O site é 100% estático. Pode publicar em:

- **GitHub Pages** — push para um repositório e ative Pages na branch `main`
- **Netlify** — arraste a pasta ou ligue ao repositório Git
- **Cloudflare Pages** — idem

## Personalização

- **Email de contacto:** altere em `contato.html` e `js/layout.js`
- **Imagens:** substitua os SVG em `imagens/` por fotos reais (PNG/JPG) e atualize os `src` nos HTML
- **Novas páginas:** copie a estrutura de qualquer HTML existente, defina `data-page` no `<body>` e adicione o link em `js/layout.js` se necessário

## Aviso legal

Conteúdo educacional. Consulte a legislação local antes de qualquer atividade relacionada com cultivo vegetal.
