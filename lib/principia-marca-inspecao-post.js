'use strict';

/**
 * Inspeção Lojas · Principia
 * Marca brasileira de dermocosméticos. O pedido de campo («mais recomendada
 * pelos dermatologistas») entra como claim a auditar, não como facto fechado.
 */

const fs = require('fs');
const path = require('path');

function lojaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series || 'loja-dermocosmetico',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Principia · marca',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const COVER = '/imagens/inspecoes/principia-marca-cover.jpg';
const SITE = 'https://www.principiaskin.com/';
const PANORAMA =
  'https://panoramafarmaceutico.com.br/dermocosmeticos-de-alta-performance/';
const FAQ = 'https://www.principiaskin.com/duvidas-frequentes';
const DOISAMAIS =
  'https://www.doisamaiscosmetica.com.br/noticias/principia-chega-para-democratizar-o-acesso-a-dermocosmeticos-de-alta-performance/';

function buildPrincipiaBodies() {
  const inspected = '2026-08-20';
  const hubLojas = '/biblioteca/inspecoes/';
  const anvisa = '/posts/post-inspecao-palavra-anvisa.html';
  const rdc = '/posts/post-inspecao-palavra-rdc-autorizacao-sanitaria.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const self = '/posts/post-inspecao-loja-principia.html';

  const body = `## Escopo

Inspeção editorial da marca **[Principia](${self})** — dermocosméticos brasileiros de «alta performance» a «preços justos». O pedido de campo chegou assim: *«a marca mais recomendada pelos dermatologistas»* (grafia *dernatoloogistas*). Esta ficha **inspeciona o claim**, a empresa, o modelo de rótulo (concentração à vista) e os limites: cosmético ≠ medicamento; ranking de prescrição ≠ endosso clínico eterno.

> **Nota metodológica:** auditoria independente. Fontes: [site](${SITE}), [FAQ](${FAQ}), [Panorama Farmacêutico](${PANORAMA}), [2A+ Cosmética](${DOISAMAIS}), [ANVISA](${anvisa}). **Não é aconselhamento médico nem dermatológico. Não é review de SKU. Não é endosso.** Sem afiliação com PRINCIPIA COMÉRCIO DE COSMÉTICOS LTDA. Preços e catálogo mudam — confirmar no site.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | **Principia** |
| Razão social | PRINCIPIA COMÉRCIO DE COSMÉTICOS LTDA |
| CNPJ | 34.506.209/0001-43 |
| Fundação cadastral | 12 ago. 2019 (São Paulo) |
| Fundador (imprensa) | Márcio (Marcio Roberto Marques dos Santos) — experiência em indústria farmacêutica |
| Loja | [principiaskin.com](${SITE}) |
| Lançamento de produtos | 2020 (nativa digital na pandemia; depois farmácia) |
| Tipo BudGanja | Loja / marca — catálogo comercial × claim de prescrição |
| Elo sanitário | [ANVISA](${anvisa}) · [RDC / autorização](${rdc}) · [risco](${risco}) |
| Elo ofício da pele | [sol](${sol}) · [água](${agua}) · [lavar](${lavar}) · [verdade](${verdade}) |
| Data | ${inspected} |

## 2. Hipóteses e método

**H1:** o objecto é a **marca** (modelo de negócio + rótulo), não um sérum isolado.  
**H2:** «mais recomendada pelos dermatologistas» é **frase de rua / marketing**; o recorte jornalístico disponível aponta **2ª mais prescrita** (Memed, janela de 18 meses) — não «a mais», não para sempre.  
**H3:** «dermatologicamente testado» e «concentração no rótulo» são **literacia de produto**, não receita.  
**H4:** cosmético no Brasil regula-se como **cosmético** ([ANVISA](${anvisa})) — distinto de medicamento.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* marca *neste* ecrã, sem virar vitrine.

Método: (1) fixar empresa e site; (2) separar slogan da marca vs claim do pedido de campo; (3) documentar o número Memed **como recorte**, com data/fonte; (4) listar o modelo de ativos sem protocolar rotina; (5) limites e [respeito](${respeito}) a quem usa a pele como ofício.

## 3. O que a marca diz de si

Leitura a partir do [FAQ](${FAQ}) e da imprensa de lançamento ([2A+](${DOISAMAIS})):

| Frase da marca | Leitura BudGanja |
|----------------|------------------|
| Dermocosméticos de **alta performance** | Fórmulas com **altas concentrações** de activos com eficácia/segurança **declaradas** — não é ensaio clínico publicado nesta ficha |
| **Preços justos** / democratizar | Modelo tipo «activos à vista, margem menor, menos marketing de glamour» — claim comercial, não auditoria de preço |
| Concentrações **no rótulo** | O diferencial mais sólido: o que outras marcas tratam como segredo, aqui vai escrito. Elo [verdade](${verdade}) |
| **Dermatologicamente testados** | Protocolos de segurança cosmética — **não** equivalem a registo de medicamento |

Activos que a vitrine empurra (niacinamida, zinco PCA, vitamina C, ácido hialurónico, retinol, etc.) são **ingredientes com literatura** — a ficha **não** doseia, **não** combina e **não** substitui dermatologista.

## 4. O claim «mais recomendada pelos dermatologistas»

O pedido de campo afirma o superlativo. O laboratório **não o copia como facto**.

| Camada | O que há | Confiança |
|--------|----------|-----------|
| **Pedido de campo** | «a marca mais recomendada pelos dermatologistas» | Oral / hipérbole — a inspecionar |
| **Imprensa (Panorama Farmacêutico)** | Em 18 meses, Principia tornou-se a **segunda** marca de dermocosméticos **mais prescrita** no Brasil, segundo a **Memed**; a empresa visita cerca de **13 mil** dermatologistas | Média — recorte jornalístico, não paper; janela temporal |
| **Visita médica** | Força de campo junto a prescritores | Alta como prática comercial; **não** prova independência do ranking |
| **Google Reviews / influenciadoras** | Boca-a-boca e e-commerce (a marca cita dezenas de milhares de avaliações na mesma reportagem) | Marketing + reputação digital — distinto de prescrição |
| **«A mais» para sempre** | Não documentado aqui | **Rejeitado** como facto fechado |

**Veredicto do claim:** o que se sustenta, com fonte e data, é **prescrição elevada num recorte Memed** (2º lugar, 18 meses, citado na [reportagem](${PANORAMA})). «Mais recomendada» no superlativo absoluto **não** passa. Recomendação de médico é **caso a caso** — pele, história, tolerância — não ranking de prateleira.

## 5. Cosmético × medicamento (não misturar)

| Eixo | Principia | Correção |
|------|-----------|----------|
| Registo | Cosmético / dermocosmético de prateleira e farmácia | [ANVISA](${anvisa}) — não é bula de fármaco |
| Teste | «Dermatologicamente testado» (FAQ) | Segurança de uso cosmética ≠ indicação terapêutica |
| Prescrição Memed | Médicos **podem** receitar dermocosmético | Receitar ≠ o laboratório BudGanja receitar |
| Activos (retinol, ácidos…) | Potência real, irritação possível | [risco](${risco}): ler rótulo, introduzir devagar, perguntar a quem cuida da pele |

**Hótese aplicada:** a marca ganhou espaço porque **escreve a concentração** e **cabe no bolso da prescrição** (adesão). Isso é ofício de mercado. Não transforma a ficha em receituário.

## 6. Como usar esta inspeção

1. Abrir o [site](${SITE}) se o interesse for **catálogo e preço**.  
2. Tratar «mais recomendada» como **frase a verificar** — o recorte Memed diz **2ª mais prescrita**, numa janela.  
3. Cruzar com [ANVISA](${anvisa}) quando a dúvida for **cosmético vs remédio**.  
4. Cruzar com [sol](${sol}) / [lavar](${lavar}) / [água](${agua}) quando o ofício for **cuidado**, não marca.  
5. Não começar retinol, ácido ou vitamina C **por esta página**.  
6. Fechar com [Valeu !!!](${mantra}).

## Status

**Aprovada** — marca **Principia** documentada como loja/dermocosmético; claim de dermatologistas **auditado** (2ª mais prescrita Memed no recorte jornalístico ≠ «a mais» absoluta); **sem** endosso clínico.

[▶ Inspeções](${hubLojas}) · [▶ ANVISA](${anvisa}) · [▶ risco](${risco}) · [▶ principiaskin.com](${SITE}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian dermocosmetic brand **Principia**. The field line «most recommended by dermatologists» is audited as a **claim**, not copied as fact.

> Independent audit. Sources: [site](${SITE}), [Panorama Farmacêutico](${PANORAMA}). **Not medical advice, not a SKU review, not an endorsement.**

## Object

| Field | Value |
|-------|-------|
| Company | PRINCIPIA COMÉRCIO DE COSMÉTICOS LTDA · CNPJ 34.506.209/0001-43 |
| Founded | 2019 (products 2020) |
| Lab type | Shop / brand — catalog × prescription claim |
| Date | ${inspected} |

## The claim

Press citing **Memed**: in 18 months Principia became the **second** most **prescribed** dermocosmetic brand in Brazil — not “the most”, not forever. Visiting ~13k dermatologists is sales force, not an independent eternal ranking.

## Correction

Cosmetic ≠ medicine ([ANVISA](${anvisa})). “Dermatologically tested” ≠ drug approval. Concentrations on the label are the solid literacy point. Close with [Valeu !!!](${mantra}).

## Status

**Approved** — claim audited; no clinical endorsement.

[▶ ANVISA](${anvisa}) · [▶ site](${SITE})
`;

  const contentEs = `## Alcance

Inspección de la marca brasileña de dermocosméticos **Principia**. La frase «la más recomendada por los dermatólogos» se audita como **claim**, no se copia como hecho.

> Auditoría independiente. **No es consejo médico ni endoso.**

## Objeto

| Campo | Valor |
|-------|-------|
| Empresa | PRINCIPIA COMÉRCIO DE COSMÉTICOS LTDA |
| Tipo lab | Tienda / marca — catálogo × claim de prescripción |
| Fecha | ${inspected} |

## El claim

Prensa (Memed): en 18 meses, **segunda** marca dermocosmética **más prescrita** en Brasil — no «la más», no para siempre.

## Corrección

Cosmético ≠ medicamento ([ANVISA](${anvisa})). Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — claim auditado; sin endoso clínico.

[▶ ANVISA](${anvisa}) · [▶ sitio](${SITE})
`;

  return { body, contentEn, contentEs };
}

function buildPrincipiaPost() {
  const { body, contentEn, contentEs } = buildPrincipiaBodies();
  let seriesOrder = 1;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-loja-principia');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts
          .filter((p) => String(p.series || '').indexOf('loja-') === 0)
          .map((p) => p.seriesOrder)
          .filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 50) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 1 */
  }

  return lojaPost({
    title: 'Inspeção: Principia — marca, rótulo e o claim dos dermatologistas',
    titleEn: 'Inspection: Principia — brand, label, and the dermatologist claim',
    titleEs: 'Inspección: Principia — marca, etiqueta y el claim de los dermatólogos',
    excerpt:
      'Lojas: Principia (dermocosmético BR) — concentrações no rótulo; «mais recomendada pelos dermatologistas» auditado (Memed: 2ª mais prescrita no recorte); sem endosso clínico.',
    excerptEn:
      'Shops: Principia (BR dermocosmetic) — concentrations on the label; “most recommended by dermatologists” audited (Memed: 2nd most prescribed in the clip); no clinical endorsement.',
    excerptEs:
      'Tiendas: Principia (dermocosmético BR) — concentraciones en la etiqueta; «la más recomendada por dermatólogos» auditado (Memed: 2.ª más prescrita en el recorte); sin endoso clínico.',
    slug: 'inspecao-loja-principia',
    date: '2026-08-20T04:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Principia · marca',
    coverImage: COVER,
    sourceUrl: SITE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPrincipiaPost,
  buildPrincipiaBodies
};
