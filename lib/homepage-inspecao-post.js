'use strict';

/**
 * Inspeção Palavras · homepage
 * Eixos: composto EN home + page · página inicial ·
 * orelha/olho cola Homer · casa (domus) ≠ ponto de partida da rede ·
 * index.html · ≠ landing · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/homepage-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/homepage';
const WIKT_HOME_PAGE = 'https://en.wiktionary.org/wiki/home_page';
const WIKT_HOME = 'https://en.wiktionary.org/wiki/home';
const WIKT_PAGE = 'https://en.wiktionary.org/wiki/page';
const WIKT_PAGINA = 'https://pt.wiktionary.org/wiki/p%C3%A1gina';
const WIKT_LAT_PAGINA = 'https://en.wiktionary.org/wiki/pagina#Latin';
const WIKI = 'https://en.wikipedia.org/wiki/Home_page';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/P%C3%A1gina_inicial';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 340) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildHomepageBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-homepage.html';
  const homeSite = '/';
  const link = '/posts/post-inspecao-palavra-link.html';
  const node = '/posts/post-inspecao-palavra-node.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const livro = '/posts/post-inspecao-palavra-livro.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[homepage](${self})** — composto inglês **home + page**. Pedido de campo: *inspeção na palavra homepage* (e a cola viva *homer e page*). A orelha e o olho brasileiros **juntam** Homer (personagem) a *home*. O étimo **corta**. Irmã portuguesa: **página inicial**. No laboratório, a homepage do sítio é **[/](${homeSite})** (\`index.html\`). Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [homepage](${WIKT}), [home page](${WIKT_HOME_PAGE}), [home](${WIKT_HOME}), [page](${WIKT_PAGE}), [página](${WIKT_PAGINA}), lat. [*pāgina*](${WIKT_LAT_PAGINA}), [Home page](${WIKI}), [página inicial](${WIKI_PT}). **Ficha ≠ tutorial de HTML, ≠ biografia de Simpson, ≠ receita de landing page.** Ofício da cola: [a orelha cola o que a boca juntou](${orelhaCola}).

**Gatilho:** *homepage* / *home page* / *home-page* / *homer page* / *a home* → lema **homepage**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **homepage** (EN, uma palavra) |
| Forma irmã EN | **home page** (duas palavras) · *home-page* (hífen, mapa) |
| Irmã PT | **página inicial** · também *página principal* / *página de entrada* |
| Boca BR | *a home* · *a homepage* · *voltar pra home* |
| Classe | Composto EN → empréstimo BR; calco PT *página inicial* |
| Étimo (trabalho) | EN *home* (OE *hām*, morada / ponto de partida) + *page* (lat. *pāgina*, folha escrita) — confiança: **alta** |
| Família | *homepage* · *home page* · *páginas iniciais* · ícone da casinha no browser · \`index.html\` · \`rel="home"\` |
| Falsos irmãos | **Homer** (nome / personagem) · *casa* (lat. *domus*) · *landing page* (página de campanha) · folha do [livro](${livro}) sem ser a da rede |
| Tipo BudGanja | Palavra — ponto de partida da rede × [caminho](${caminho}) |
| Elo mapa | [link](${link}) · [conexão](${conexao}) · [node](${node}) · [script](${script}) · [exit](${exit}) |
| Fonte | [homepage](${WIKT}) · [página inicial](${WIKI_PT}) |
| Data | ${inspected} |

**Objecto:** não é a casa de tijolo nem o Homer da série. É a **primeira folha da rede** — o sítio onde o [caminho](${caminho}) **começa** e para onde o ícone da casinha **volta**.

## 2. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Olho «homer e page»** | Homer + page = homepage | *Homer* é nome. *Home* é morada / ponto de partida. Uma letra **não** faz o personagem |
| **Casa** | Homepage = a casa | *Casa* é *domus*. No web, *home* é **onde se começa**, não o quarto |
| **Landing** | Landing page = homepage | Landing vende um recorte; homepage é a **porta do sítio inteiro** |
| **Livro** | Page = folha | Sim no étimo (*pāgina*); no web a folha é **URL**, não papel |
| **Ícone da casinha** | Decoração | [Gesto](${gesto}) de **voltar ao início** — o mesmo ofício da palavra |
| **index.html** | Nome técnico misterioso | Ficheiro clássico da homepage; no lab vive em **[/](${homeSite})** |
| **«A home»** | Preguiça de dizer página inicial | Boca BR do lema — válida; a ficha guarda também o calco PT |

**H-parece:** *homepage* é Homer, ou é a casa, ou é qualquer primeira tela.  
**H-é:** composto **home + page** — folha de partida da rede. A [cola](${cola}) *Homer/home* é do olho; o avô inglês não cola o personagem.

**Veredicto contraste:** o que parece = casa / Homer / landing; o que é = **página inicial**. Corrigir a palavra = preferir o ponto de partida ao [trocadilho](${trocadilho}).

## 3. Origens (etimologia)

Dois núcleos. Um composto. Não fundir com o nome Homer.

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| **EN *home*** | OE *hām* «morada, lugar nativo»; no computador, *home directory* (séc. XX); na WWW, o sítio de onde se parte | **Alta** |
| **EN *page*** | OF *page* ← lat. *pāgina* «coluna / folha escrita» → PT [página](${WIKT_PAGINA}) | **Alta** |
| **Composto *home page*** | Anos 1990 (WWW / Mosaic): a página que o sítio chama de casa — **início da visita** | **Alta** no uso; média no «primeiro a dizer» |
| **Uma palavra *homepage*** | Grafia colada do composto; as duas formas convivem | **Alta** |
| **Calco PT *página inicial*** | Traduz o ofício (folha + início), não a casa | **Alta** |
| **Homer** | Nome próprio grego (*Ὅμηρος*); personagem de sitcom — **outro mapa** | **Alta** (corte) |
| **index.html** | Convenção de servidor: o ficheiro que responde a \`/\` | **Alta** no ofício; não é o étimo da palavra |

**Veredicto etimológico:** *homepage* **não** desce de Homer. *Home* + *page* = folha de partida. A [etimologia](${etimologia}) aqui é um corte de uma letra no olho (*homer* × *home*) e um composto no ouvido.

## 4. Homepage × página inicial × home × landing × Homer

| Termo | Ofício | Diferença útil |
|-------|--------|----------------|
| **homepage** | Loan EN (uma palavra) | Lema desta ficha |
| **home page** | Mesmo composto, duas palavras | Grafia dicionário; não muda o ofício |
| **página inicial** | Calco PT | Porta do sítio; preferível em texto institucional |
| **a home** | Boca BR | Dizer *home* no web ≠ dizer *casa* |
| **casa** | Lat. *domus* | Quarto / morada; **não** é a homepage |
| **landing page** | Página de campanha | Recorte para um clique; pode não ser a porta |
| **splash** | Tela de espera / marca | Eco; não substitui a inicial |
| **Homer** | Nome / personagem | Olho cola em *home*; étimo **corta** |
| **página** (livro) | Folha do [livro](${livro}) | Mesmo avô latino; outro suporte |
| **[/](${homeSite})** | Homepage **deste** laboratório | O objecto vivo: Inspetor BudGanja |

**H1:** no lab BR, *homepage* = página inicial do sítio (alta).  
**H2:** *a home* entra pela boca da oficina; o calco *página inicial* guarda o português.  
**H3:** Homer é cola de olho — como [node](${node}) cola em *nuds*.

## 5. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **WWW** | Primeira página do sítio — o que \`/\` serve | Alta |
| **Browser** | Ícone da casinha = voltar à homepage | Alta |
| **Oficina** | \`index.html\` · *rel="home"* · [link](${link}) para a porta | Alta |
| **Boca BR** | «Abre a home» · «volta pra homepage» | Alta |
| **Institucional PT** | *página inicial* / *página principal* | Alta |
| **Marketing** | Confundir com landing | Média (uso frouxo) |
| **Casa** | Metáfora da morada | Alta como imagem; **má** como étimo único |
| **Homer** | Cola de olho *homer e page* | Alta como armadilha; **zero** como origem |

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Homepage vem de Homer» | Cola de **olho**. Étimo: *home* + *page* |
| «Homer e page» | Lema: **homepage**. Homer fica noutro mapa |
| «Homepage é a casa» | Metáfora. Palavra PT da morada = *casa*. Palavra PT da porta web = **página inicial** |
| «Landing page = homepage» | Landing é campanha; homepage é a **porta do sítio** |
| «A home não é português» | É empréstimo. O calco *página inicial* convive; não apagar a boca |
| «index.html é a palavra» | É o **ficheiro**. A palavra é homepage / página inicial |
| «Toda primeira tela é homepage» | Só a porta do sítio. Splash e landing são outras folhas |

### Ofício correcto (mapa curto)

1. Ver a letra: **home** (partida) ou **Homer** (nome).  
2. Se for a porta do sítio → **homepage** / **página inicial** / **[/](${homeSite})**.  
3. Se for campanha → *landing* — outra folha.  
4. Se o olho colou Homer → nomear a cola ([orelha cola](${orelhaCola})) e **cortar**.  
5. Fechar com [Valeu !!!](${mantra}) — o melhor **nesta** porta, hoje.

**Veredicto correção:** **homepage ≠ Homer.** No lab, *homepage* só vale como página inicial. A casinha do browser é [gesto](${gesto}) de voltar; não é biografia.

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Oficina / lab** | «A homepage do BudGanja é [/](${homeSite})» | Bom: nomear a porta · Mau: chamar landing à inicial |
| **Boca** | «Volta pra home» | Bom como fala · Preferir *página inicial* no texto institucional |
| **Calco** | «Página inicial» | Bom: PT do ofício · Mau: apagar o empréstimo como se fosse erro |
| **Olho** | Escrever *homerpage* / *homer e page* | Mau como lema · Bom só como **exemplo** da cola |
| **Browser** | Clicar a casinha | Bom: [gesto](${gesto}) de início · Mau: achar que *casa* = étimo |
| **Piada** | «Homer page» | [Trocadilho](${trocadilho}) consciente · Mau como origem |

**Finalidade-mãe:** nomear a **homepage** para **começar com ofício** — útil como porta da rede; perigosa quando o olho troca a partida pelo personagem.

## 8. Rede (só fichas existentes)

| Ficha | Relação com *homepage* |
|-------|------------------------|
| **[/](${homeSite})** | A homepage **deste** sítio |
| [Link](${link}) | O elo que traz de volta à porta |
| [Conexão](${conexao}) · [elo de ligação](${eloLigacao}) | O que a porta **abre** |
| [Node](${node}) | Ponto de junção; a homepage é um node especial (a raiz) |
| [Script](${script}) | Sequência que a página pode seguir; ≠ a página ela mesma |
| [Caminho](${caminho}) | A visita **começa** na homepage |
| [EXIT](${exit}) | Sair ≠ voltar a casa; outro [gesto](${gesto}) |
| [Ligar / desligar](${ligar}) | Abrir o sítio × cortar a sessão |
| [A orelha cola…](${orelhaCola}) · [cola](${cola}) · [trocadilho](${trocadilho}) | Homer × home |
| [Etimologia](${etimologia}) · [língua portuguesa](${lingua}) | Composto EN + calco *página inicial* |
| [Livro](${livro}) | *Página* de papel × página da rede |
| [Verdade](${verdade}) · [Valeu !!!](${mantra}) | Cortar a cola; fechar o ofício |

## 9. Limites

- Não é curso de HTML, SEO nem de desenho de landing.  
- Não é ficha de *The Simpsons* nem biografia de Homer.  
- Empréstimo *homepage* convive com o calco *página inicial* — não apagar nenhum.  
- \`index.html\` entra como **ficheiro**, não como étimo.  
- Distinto de *home directory* (sistema de ficheiros) — primo de oficina, não o objecto desta página.

## Status

**Aprovado na série Palavras** — *homepage* fichado: *home* + *page*; irmã **página inicial**; cola Homer cortada; porta viva **[/](${homeSite})**; elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Homepage do lab](${homeSite}) · [▶ Link](${link}) · [▶ Conexão](${conexao}) · [▶ Caminho](${caminho}) · [▶ Guia](${guia}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[homepage](${self})** — English compound **home + page**. Field request includes the living glue *homer and page*. The eye joins Homer (a name) to *home*. Etymology **cuts**. Portuguese sister: **página inicial**. In this lab the homepage is **[/](${homeSite})**. Close: [Valeu !!!](${mantra}).

> Method note: [homepage](${WIKT}), [home page](${WIKT_HOME_PAGE}), [Home page](${WIKI}). Not an HTML tutorial, not a Simpson biography, not a landing-page recipe. Craft of the glue: [the ear glues what the mouth joined](${orelhaCola}).

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **homepage** · sister **home page** · PT **página inicial** |
| Path | OE *hām* + Lat. *pāgina* → EN compound → BR loan / calque |
| False kin | **Homer** · *casa* (*domus*) · landing page |
| Links | [link](${link}) · [conexão](${conexao}) · [caminho](${caminho}) · [exit](${exit}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Seems:** Homer, or the brick house, or any first screen.  
**Is:** the **front door of the site** — the leaf where the [path](${caminho}) starts.

## 2. BudGanja correction

**homepage ≠ Homer.** *Home* is starting place; *page* is the leaf (Lat. *pāgina*). Landing is a campaign cut. The browser house icon is the [gesture](${gesto}) of going back to **[/](${homeSite})**. Close with [Valeu !!!](${mantra}).

## Status

**Approved in Words** — *home* + *page*; PT *página inicial*; Homer glue cut; live door **[/](${homeSite})**.

[▶ Words](${hub}) · [▶ Lab home](${homeSite}) · [▶ Link](${link}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[homepage](${self})** — compuesto inglés **home + page**. El pedido incluye la cola viva *homer y page*. El ojo junta Homer (nombre) con *home*. El étimo **corta**. Hermana PT: **página inicial**. En este laboratorio la homepage es **[/](${homeSite})**. Cierre: [¡Valeu !!!](${mantra}).

> Nota: [homepage](${WIKT}), [home page](${WIKT_HOME_PAGE}), [página inicial](${WIKI_PT}). No es tutorial HTML ni biografía de Simpson ni receta de landing. Oficio de la cola: [la oreja pega lo que la boca juntó](${orelhaCola}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **homepage** · hermana **home page** · PT **página inicial** |
| Camino | OE *hām* + lat. *pāgina* → compuesto EN → préstamo / calco BR |
| Falsos hermanos | **Homer** · *casa* (*domus*) · landing page |
| Vínculos | [link](${link}) · [conexão](${conexao}) · [caminho](${caminho}) · [exit](${exit}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Parece:** Homer, o la casa de ladrillo, o cualquier primera pantalla.  
**Es:** la **puerta del sitio** — la hoja donde empieza el [camino](${caminho}).

## 2. Corrección BudGanja

**homepage ≠ Homer.** *Home* es el punto de partida; *page* es la hoja (lat. *pāgina*). Landing es recorte de campaña. El icono de casita es el [gesto](${gesto}) de volver a **[/](${homeSite})**. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada en Palabras** — *home* + *page*; PT *página inicial*; cola Homer cortada; puerta viva **[/](${homeSite})**.

[▶ Palabras](${hub}) · [▶ Home del lab](${homeSite}) · [▶ Link](${link}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildHomepagePost() {
  const { body, contentEn, contentEs, wiki } = buildHomepageBodies();
  const seriesOrder = pickOrder('inspecao-palavra-homepage', 244);

  return makePalavra({
    title: 'Inspeção: Homepage — home + page; a porta, não o Homer',
    titleEn: 'Inspection: Homepage — home + page; the door, not Homer',
    titleEs: 'Inspección: Homepage — home + page; la puerta, no Homer',
    excerpt:
      'Palavras: homepage ← home + page; irmã página inicial; cola Homer cortada; ≠ casa ≠ landing; porta viva /; Valeu !!!',
    excerptEn:
      'Words: homepage ← home + page; sister página inicial; Homer glue cut; ≠ house ≠ landing; live door /; Valeu !!!',
    excerptEs:
      'Palabras: homepage ← home + page; hermana página inicial; cola Homer cortada; ≠ casa ≠ landing; puerta viva /; ¡Valeu !!!',
    slug: 'inspecao-palavra-homepage',
    date: '2026-08-23T04:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Homepage · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildHomepagePost,
  buildHomepageBodies,
  WIKT,
  WIKT_HOME_PAGE,
  WIKI,
  WIKI_PT
};
