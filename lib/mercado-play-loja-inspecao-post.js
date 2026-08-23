'use strict';

/**
 * Inspeção Lojas · Mercado Play (Mercado Livre TV)
 * Objecto = o serviço AVOD + indicação datada de títulos legais no player oficial.
 * Grátis com anúncios ≠ domínio público. Aluguel e assinaturas parceiras ficam de fora.
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
    series: opts.series || 'loja-streaming',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Mercado Play · TV grátis',
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

const COVER = '/imagens/inspecoes/mercado-play-cover.jpg';
const SITE = 'https://play.mercadolivre.com.br/';
const FILMES = 'https://play.mercadolivre.com.br/filtrar/filmes';
const TV = 'https://play.mercadolivre.com.br/mercado-play-tv';
const PRIV = 'https://www.mercadolivre.com.br/privacidade';
const FOLHA =
  'https://www1.folha.uol.com.br/mercado/2023/08/mercado-livre-lanca-servico-de-streaming-com-filmes-de-graca.shtml';
const NEWS_TV = 'http://news.mercadolivre.com/pt/mercado-play-em-todas-as-Smart-TVs';
const ERA = 'https://play.mercadolivre.com.br/assistir/a-era-do-gelo/5051e6a2251a4028877bda541ffb481e';
const PANICO = 'https://play.mercadolivre.com.br/assistir/todo-mundo-em-panico/d23907ce82d44785952f00d7cbdc9052';
const CRUZADAS = 'https://play.mercadolivre.com.br/assistir/historias-cruzadas/84da0ed5fd664dfabedc9f67a445439c';
const ANIMAIS = 'https://play.mercadolivre.com.br/assistir/o-segredo-dos-animais/ba77c0e284394b7f801bd14e6fcebcc3';
const ARTHUR = 'https://play.mercadolivre.com.br/assistir/king-arthur/98c4d78f72194f6aae574733321de8f4';
const NORTHMEN = 'https://play.mercadolivre.com.br/assistir/northmen-a-saga-viking/a022f6063d274c4a9a4842de0742a95f';
const MALDICAO = 'https://play.mercadolivre.com.br/assistir/a-maldicao-do-rio/efa253b1cce7403bb76754be3ff3121d';

function buildMercadoPlayBodies() {
  const inspected = '2026-08-20';
  const pipoca = '/posts/post-inspecao-palavra-pipoca.html';
  const filmicca = '/posts/post-inspecao-loja-filmicca.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const lojas = '/biblioteca/inspecoes/#inspecoes-lojas';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';

  const body = `## Escopo

Inspeção editorial do **[Mercado Play](${SITE})** — streaming do **Mercado Livre** (a «TV grátis» no app e na Smart TV). O pedido de campo foi indicar **filmes legais** no serviço. O objecto é a **plataforma** mais um **snapshot datado** de títulos que a casa marca como **grátis** no player oficial. Esta ficha **não hospeda** filmes, **não** aponta cópias piratas e **não** trata o catálogo AVOD como domínio público.

> **Nota metodológica:** auditoria independente, leitura das páginas públicas em ${inspected}. Fontes âncora: [home](${SITE}), [filmes](${FILMES}), fichas \`/assistir/…\` com a marca «Grátis no Mercado Play», [TV](${TV}), [Folha · lançamento 2023](${FOLHA}), [privacidade ML](${PRIV}). **Sem afiliação** com EBAZAR.COM.BR LTDA / Mercado Livre / Mercado Play. Indexar ≠ endossar. O acervo **roda**: um título grátis hoje pode sair amanhã — confirmar no player. Listas de blogs (TechTudo, etc.) **não** substituem a ficha oficial.

![Mercado Play — capa editorial BudGanja](${COVER})

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | **Mercado Play** |
| URL canónico | [play.mercadolivre.com.br](${SITE}) |
| Catálogo de filmes | [play.mercadolivre.com.br/filtrar/filmes](${FILMES}) |
| Porta TV | [mercado-play-tv](${TV}) |
| Grupo | Mercado Livre (Mercado Libre) |
| Razão social (Brasil, fontes públicas) | **EBAZAR.COM.BR LTDA** |
| CNPJ | 03.007.331/0001-41 |
| Lançamento BR | **ago. 2023** ([Folha](${FOLHA}): ~1.600 títulos no arranque; receita via anúncios / Mercado Ads) |
| Modelo | **AVOD** — grátis com anúncios; também **aluguel** (TVOD) e vitrine de **assinaturas parceiras** |
| Território | Brasil (conta Mercado Livre) |
| Tipo BudGanja | Loja / streaming — **indicação legal** no player da casa |
| Elo de sala | [pipoca](${pipoca}) · [FILMICCA](${filmicca}) (outro modelo: assinatura com curadoria) · [Artes](${artes}) · [VEVO](${vevo}) |
| Data da leitura | ${inspected} |

## 2. Hipóteses e método

**H1:** «TV grátis» no Mercado Livre **não** é domínio público: é **licença comercial** paga com anúncios.  
**H2:** o mesmo ecrã mistura **três camadas** — AVOD grátis, aluguel, e CTA de HBO Max / Globoplay / Universal+. Indicar «filmes legais deles» = só a camada **Assistir grátis**.  
**H3:** legal, aqui, = **ver no player oficial** da casa que licenciou. Copiar o ficheiro, embeber o stream ou apontar para dump pirata **sai** desta ficha.  
**H4:** classificação etária na ficha (L, 12, 14, 16) é da plataforma; títulos 16+ pedem login.  
**H5:** fecho = [Valeu !!!](${mantra}) — a melhor sala *desta* prateleira *neste* dia, sem virar agregador pirata.

Método: (1) abrir a vitrine pública; (2) separar aluguel e assinatura parceira; (3) cruzar fichas \`/assistir/…\` cuja página declara **Grátis**; (4) datar; (5) ligar só a URLs \`play.mercadolivre.com.br\`.

## 3. Grátis ≠ domínio público

O laboratório **pode** indicar filmes com copyright **quando** o visionamento é na plataforma que os licenciou. O Mercado Play é esse caso: Sony, Paramount, Lionsgate e outras casas entram no discurso de lançamento ([Folha](${FOLHA})).

| Confusão | Leitura |
|----------|---------|
| «É grátis, então não tem direito de autor» | Falso. O direito continua; a casa **paga a licença** e cobra em **atenção** (anúncios) |
| «Posso descarregar e republicar» | Fora desta ficha. A indicação é **ligar ao player**, não espelhar o ficheiro |
| «É o mesmo que Internet Archive / filme mudo PD» | Não. PD é outra prateleira ([Artes](${artes}) quando houver ficha). Aqui o título é **protegido** e **legal no sítio deles** |
| «A lista de um blog basta» | Não. *Whiplash* já esteve e saiu (relato de imprensa). Âncora = ficha oficial do dia |

## 4. Três camadas no mesmo ecrã (${inspected})

| Camada | O que é | Nesta ficha |
|--------|---------|-------------|
| **Assistir grátis** | AVOD no Mercado Play | **Sim** — indicações abaixo |
| **Aluguel** | Pago por título. Na home: *It: A coisa* (2017) com o texto «Disponível para alugar» | **Não** indicar como grátis |
| **Assine HBO Max / Globoplay / Universal+** | Vitrine de **outro** streaming, com preço no ecrã | **Não** é catálogo grátis do Play |

A [página TV](${TV}) declara as duas primeiras camadas com clareza: «Séries e filmes grátis» **e** «Lançamentos exclusivos para alugar». Quem só lê «TV é grátis» e aluga *It* está noutro contrato.

## 5. Indicações legais (snapshot ${inspected})

Só títulos vistos na vitrine pública **sem** selo de aluguel, ou em ficha \`/assistir/…\` cujo título da página traz **«Grátis no Mercado Play»** / CTA **«Assistir grátis»**. Sinopses da casa **não** se copiam aqui — título, ano, classificação e o **link oficial**.

### 5.1 Vitrine (home e [filmes](${FILMES}))

| Título | Ano | Class. | Nota | Onde ver |
|--------|-----|--------|------|----------|
| **A Era do Gelo** | 2002 | L | Família / comédia. CTA **Assistir grátis** na ficha | [▶ ficha oficial](${ERA}) |
| **Todo Mundo em Pânico** | 2000 | 16 | Comédia. Ficha pede login (idade) | [▶ ficha oficial](${PANICO}) |
| **Rio** | 2011 | L | Família / comédia. Na vitrine; slug \`/assistir/rio\` sozinho redirecciona à home | [▶ catálogo de filmes](${FILMES}) |
| **Duro de Matar 4.0** | 2007 | 14 | Acção. Na vitrine, sem selo de aluguel | [▶ catálogo de filmes](${FILMES}) |
| **O Segredo dos Animais** | 2006 | L | Comédia / aventura | [▶ ficha oficial](${ANIMAIS}) |

### 5.2 Outras fichas oficiais com «Grátis» no título

| Título | Ano | Class. | Onde ver |
|--------|-----|--------|----------|
| **Histórias Cruzadas** | 2011 | 12 | [▶ ficha oficial](${CRUZADAS}) |
| **King Arthur** | 2004 | 14 | [▶ ficha oficial](${ARTHUR}) |
| **Northmen — A Saga Viking** | 2014 | 16 | [▶ ficha oficial](${NORTHMEN}) |
| **A maldição do rio** | — | (idade na ficha) | [▶ ficha oficial](${MALDICAO}) |

Isto **não** é o catálogo completo (~milhares de horas no discurso de 2023). É uma **prateleira de entrada** para quem quer dar play **legal** na TV/web deles. Títulos 14/16: a sala é da classificação da casa, não do laboratório.

## 6. Como chegar à TV

A [landing TV](${TV}) e o [comunicado](${NEWS_TV}) descrevem o app **Mercado Play** na loja da Smart TV (Samsung Tizen, LG webOS, Android TV / Google TV), login com conta Mercado Livre (código no telemóvel / [play.meli.com/login](https://play.meli.com/login)). Chromecast e espelhamento a partir do app Mercado Livre entram no discurso de tutoriais; esta ficha **não** testou hardware.

Conta: o site deixa **explorar** a vitrine sem login; fichas com restrição de idade pedem sessão. Imprensa descreve ainda um recorte mais largo (**Universal+ Essencial**) para quem **comprou** no marketplace no último ano — claim de produto, **não** auditado aqui. **Sem plano Play sem anúncios** no discurso público corrente (AVOD é o modelo).

## 7. Distinção: Mercado Play ≠ FILMICCA ≠ ficha de filme

| Porta | Papel |
|-------|--------|
| [Mercado Play](${SITE}) | Volume AVOD da loja — **esta** ficha |
| [FILMICCA](${filmicca}) | Assinatura com curadoria autoral/cult; **sem** dump de catálogo |
| [Artes](${artes}) | Um filme, uma inspeção — Matrix, Shawshank, etc. **não** passam a ser «do Play» por esta lista |
| [Pipoca](${pipoca}) | O lanche da sala; o Play é a **prateleira grátis-com-anúncios** |

Uma plataforma **não absorve** as inspeções de cada título. Indicar *A Era do Gelo* no Play **não** abre ficha Artes desse filme.

## 8. Limites

- Sem login completo, sem contagem de SKUs, sem teste de app/TV neste laboratório.  
- *Rio* e *Duro de Matar 4.0* estão na vitrine pública; o slug curto \`/assistir/rio\` não devolveu ficha estável no fetch — por isso o elo é o [catálogo](${FILMES}), não um ID inventado.  
- Listas de 2025 (Diabo Veste Prada, Cisne Negro, Dexter…) **não** foram revalidadas hoje: não entram.  
- Indexar o Play **não** é endosso do marketplace, do aluguel, nem das assinaturas parceiras. [Verdade](${verdade}) = citar a ficha oficial; [respeito](${respeito}) = não fingir que grátis = livre de direitos.

## 9. Estado

**Aprovada** — inspeção de **loja / streaming** com **indicação legal datada**. Ver no [Mercado Play](${SITE}). Fora do player oficial, esta lista **não** autoriza cópia.

[▶ Play](${SITE}) · [▶ filmes](${FILMES}) · [▶ TV](${TV}) · [▶ FILMICCA](${filmicca}) · [▶ pipoca](${pipoca}) · [▶ Artes](${artes}) · [▶ Lojas](${lojas}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[Mercado Play](${SITE})** — Mercado Livre’s free ad-supported streaming (“free TV”). Request = point to **legal** films on **their** player. Object = the service plus a **dated snapshot**. This page does **not** host files and does **not** treat AVOD as public domain.

> Independent reading of public pages on ${inspected}. **No affiliation.** Catalogue rotates. Blogs are not the official sheet.

## Subject

| Field | Value |
|-------|-------|
| Company (BR, public) | EBAZAR.COM.BR LTDA · CNPJ 03.007.331/0001-41 |
| Launch BR | Aug 2023 |
| Model | AVOD (free + ads); also rental and partner-subscription upsells |
| Lab type | Shop / streaming — legal pointers only |

## Free ≠ public domain

Copyright remains. The house licensed the titles; you watch **on their player**. Rental (*It*, 2017 on the home) and HBO Max / Globoplay / Universal+ CTAs are **not** “free Mercado Play films”.

## Snapshot (${inspected})

Official **free** sheets: [Ice Age](${ERA}) (2002, L) · [Scary Movie](${PANICO}) (2000, 16) · [The Help](${CRUZADAS}) (2011, 12) · [Barnyard](${ANIMAIS}) (2006, L) · [King Arthur](${ARTHUR}) (2004, 14) · [Northmen](${NORTHMEN}) (2014, 16) · [A maldição do rio](${MALDICAO}). On the public [films](${FILMES}) rail without a rental badge: *Rio* (2011, L) and *Live Free or Die Hard* (2007, 14) — link the catalogue, not a guessed id.

## Status

**Approved** — platform sheet + dated legal pointers. Not a full catalogue, not an endorsement.

[▶ Play](${SITE}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Mercado Play](${SITE})** — streaming gratuito con anuncios del Mercado Livre («TV gratis»). Pedido = indicar **filmes legales** en **su** reproductor. No se alojan archivos; AVOD **no** es dominio público.

> Lectura de páginas públicas el ${inspected}. **Sin afiliación.** El catálogo rota.

## Objeto

| Campo | Valor |
|-------|-------|
| Empresa (BR) | EBAZAR.COM.BR LTDA · CNPJ 03.007.331/0001-41 |
| Lanzamiento BR | ago. 2023 |
| Modelo | AVOD; también alquiler y CTAs de otros streamings |
| Tipo lab | Tienda / streaming |

## Gratis ≠ dominio público

El derecho de autor sigue. Ver **en el player oficial**. El alquiler (*It*, 2017) y HBO Max / Globoplay / Universal+ **no** entran como «gratis del Play».

## Instantánea (${inspected})

Fichas oficiales **gratis**: [La era de hielo](${ERA}) · [Scary Movie](${PANICO}) · [Criadas y señoras](${CRUZADAS}) · [La granja](${ANIMAIS}) · [King Arthur](${ARTHUR}) · [Northmen](${NORTHMEN}) · [A maldição do rio](${MALDICAO}). En la [vitrina](${FILMES}) sin sello de alquiler: *Rio* (2011) y *Duro de matar 4.0* (2007).

## Estado

**Aprobada** — ficha de plataforma + indicaciones legales fechadas. Sin endoso.

[▶ Play](${SITE}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMercadoPlayPost() {
  const { body, contentEn, contentEs } = buildMercadoPlayBodies();
  let seriesOrder = 1;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-loja-mercado-play');
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
    title: 'Inspeção: Mercado Play — TV grátis do Mercado Livre e filmes legais no player',
    titleEn: 'Inspection: Mercado Play — Mercado Livre’s free TV and legal films on their player',
    titleEs: 'Inspección: Mercado Play — la TV gratis de Mercado Livre y filmes legales en su reproductor',
    excerpt:
      'Lojas · streaming: Mercado Play (play.mercadolivre.com.br) — AVOD BR 2023; grátis com anúncios ≠ domínio público; indicação datada só no player oficial; aluguel e Max/Globoplay de fora; sem endosso.',
    excerptEn:
      'Shops · streaming: Mercado Play — BR AVOD 2023; free-with-ads ≠ public domain; dated pointers only to the official player; rental and partner apps excluded; no endorsement.',
    excerptEs:
      'Tiendas · streaming: Mercado Play — AVOD BR 2023; gratis con anuncios ≠ dominio público; indicaciones fechadas solo al player oficial; alquiler y apps socias fuera; sin endoso.',
    slug: 'inspecao-loja-mercado-play',
    date: '2026-08-20T06:45:00.000Z',
    seriesOrder,
    seriesLabel: 'Mercado Play · TV grátis',
    coverImage: COVER,
    sourceUrl: SITE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMercadoPlayPost,
  buildMercadoPlayBodies
};
