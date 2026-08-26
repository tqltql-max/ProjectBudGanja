'use strict';

/**
 * Inspeção Lojas · FILMICCA
 * Plataforma BR de streaming + distribuidora. Objecto = o site/serviço,
 * não um filme isolado nem endosso de catálogo.
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
    seriesLabel: opts.seriesLabel || 'FILMICCA · streaming',
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

const COVER = '/imagens/inspecoes/filmicca-cover.jpg';
const SITE = 'https://www.filmicca.com.br/';
const SOBRE = 'https://www.filmicca.com.br/sobre';
const AJUDA = 'https://www.filmicca.com.br/ajuda/o-que-e-a-filmicca';
const FAQ_N = 'https://www.filmicca.com.br/ajuda/quantos-filmes-estao-disponiveis';
const FAQ_PAISES = 'https://www.filmicca.com.br/ajuda/a-filmicca-tem-obras-de-quais-paises';
const FAQ_EPOCAS = 'https://www.filmicca.com.br/ajuda/a-filmicca-tem-obras-de-quais-epocas';
const FAQ_ESTREIAS = 'https://www.filmicca.com.br/ajuda/quando-estreiam-novos-filmes';
const FAQ_PRAZO = 'https://www.filmicca.com.br/ajuda/por-quanto-tempo-os-filmes-ficam-disponiveis';
const FAQ_IDIOMA = 'https://www.filmicca.com.br/ajuda/qual-o-idioma-dos-filmes-sao-legendados';
const FAQ_QUALIDADE = 'https://www.filmicca.com.br/ajuda/os-filmes-estao-disponiveis-em-qual-qualidade';
const FAQ_BR = 'https://www.filmicca.com.br/ajuda/posso-assistir-fora-do-brasil';
const FAQ_EXPLORAR = 'https://www.filmicca.com.br/ajuda/posso-explorar-o-acervo-antes-de-assinar';
const TERMOS = 'https://www.filmicca.com.br/termos-de-uso';
const LOJA = 'https://loja.filmicca.com.br/pages/sobre';
const ASSISTA = 'https://assista.filmicca.com.br/';
const WIKI = 'https://pt.wikipedia.org/wiki/Filmicca';
const EXIBIDOR =
  'https://www.exibidor.com.br/noticias/mercado/11194-plataforma-filmicca-chega-ao-mercado-substituindo-as-marcas-da-supo-mungam';

function buildFilmiccaBodies() {
  const inspected = '2026-08-20';
  const pipoca = '/posts/post-inspecao-palavra-pipoca.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const shawshank = '/posts/post-inspecao-filme-um-sonho-de-liberdade.html';
  const bttf = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const lojas = '/biblioteca/inspecoes/#inspecoes-lojas';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const self = '/posts/post-inspecao-loja-filmicca.html';
  const vevo = '/posts/post-inspecao-canal-vevo.html';

  const body = `## Escopo

Inspeção editorial do **site e serviço** **[FILMICCA](${SITE})** — plataforma brasileira de streaming com curadoria de cinema autoral, cult e independente, também **distribuidora** e, em 2026, **loja de blu-ray**. O pedido de campo foi o URL. O objecto aqui **não é um filme**: é a **vitrine comercial** ([filmicca.com.br](${SITE})), o **player** ([assista.filmicca.com.br](${ASSISTA})), a [loja](${LOJA}) e o que a casa **declara** sobre si. Fichas de obra (Matrix, Shawshank, Alice…) ficam em [Artes](${artes}) — uma plataforma **não absorve** as inspeções de cada título.

> **Nota metodológica:** auditoria independente, leitura directa das páginas públicas em ${inspected}. Fontes âncora: [Sobre](${SOBRE}), [Central de Ajuda](${AJUDA}), [Termos](${TERMOS}) (act. 03/07/2025), [loja · Sobre](${LOJA}), [Wikipédia](${WIKI}). **Sem afiliação** com CSF DISTRIBUIDORA & STREAMING LTDA / FILMICCA. Indexar ≠ endossar. Preços, cupões e tamanho do acervo **mudam** — confirmar no site. Números de catálogo são os **declarados** pela plataforma ou citados na imprensa, não uma contagem feita por este laboratório.

![FILMICCA — capa editorial BudGanja](${COVER})

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | **FILMICCA** (maiúsculas no site) |
| URL canónico | [filmicca.com.br](${SITE}) |
| Player | [assista.filmicca.com.br](${ASSISTA}) |
| Loja física digital | [loja.filmicca.com.br](${LOJA}) (blu-ray, 2026) |
| Razão social (Receita, fontes públicas) | **CSF DISTRIBUIDORA & STREAMING LTDA** |
| Nome fantasia cadastral | CINEMA SEM FRONTEIRAS |
| CNPJ | 39.493.419/0001-68 |
| Abertura cadastral | 19 out. 2020 (São Paulo) |
| Marca FILMICCA no ar | **12 nov. 2021** (substitui Supo Mungam Films / Supo Mungam Plus) |
| Fundadora (página Sobre) | **Gracielly Pinto** (Gracie Pinto; RF: Gracielly Aparecida da Silva Pinto) |
| Antecedente | Supo Mungam Films (**2014**, wiki) → streaming Supo Mungam Plus (dez. 2020) |
| Território | **Só Brasil** (licenças; assinar de fora não desbloqueia o catálogo) |
| Tipo BudGanja | Loja / streaming — vitrine + assinatura; **não** ficha de filme |
| Elo de sala | [pipoca](${pipoca}) · [Artes](${artes}) · [VEVO](${vevo}) (outra plataforma de média) |
| Data da leitura | ${inspected} |

## 2. Hipóteses e método

**H1:** o objecto é a **plataforma** (site + termos + ajuda), não um título do acervo.  
**H2:** «curadoria humana e única» e «o melhor do cinema mundial» são **claims de marca** — descrevem um modelo (selecção humana, nicho), não um ranking objectivo.  
**H3:** «100% brasileira e independente» é **autodescrição**; a empresa é BR e de porte pequeno nas fontes públicas — «100%» e «independente» não foram auditados como estrutura de capital.  
**H4:** «metade do acervo realizado por mulheres» é **dado declarado** pela casa, não contagem independente desta ficha.  
**H5:** preços da *landing* são **oferta datada** (urgência «só até hoje» × validade até 30/06/2026 no mesmo ecrã).  
**H6:** fecho = [Valeu !!!](${mantra}) — o melhor recorte *desta* loja *neste* ecrã, sem virar vitrine.

Método: (1) mapear URLs; (2) fixar empresa e linha do tempo; (3) separar slogan vs FAQ; (4) fotografar preços como *snapshot*; (5) cruzar com [Artes](${artes}) sem fingir que o laboratório viu o catálogo inteiro.

## 3. Arquitectura do site

Três portas, um ofício:

| Porta | Função | Nota |
|-------|--------|------|
| [filmicca.com.br](${SITE}) | *Landing*: slogan, planos, depoimentos, CTA | Marketing. Catálogo explorável **antes** de assinar ([FAQ](${FAQ_EXPLORAR})), excepto em TVs (pede conta) |
| [assista.filmicca.com.br](${ASSISTA}) | Serviço de visionamento | Citado nos [Termos](${TERMOS}) como endereço de acesso |
| [loja.filmicca.com.br](${LOJA}) | Blu-rays «seleccionados e exclusivos» | A loja Sobre confirma também o braço **distribuidora** (ex.: *Jeanne Dielman* restaurado nos cinemas BR, 2025) |
| [/sobre](${SOBRE}) · [/ajuda](${AJUDA}) · [termos](${TERMOS}) | Identidade, FAQ, contrato | A página Sobre no fetch continha bloco *lorem ipsum* de *headings* no rodapé editorial — ruído de CMS, não conteúdo |

Apps declarados na *landing* e nos termos: web, iOS, Android, TVs (Samsung Tizen 5.5+, Apple TV, Android TV, Amazon Fire TV). Até **5** ecrãs em simultâneo. Downloads no app mobile (claim da *landing*). **Sem anúncios** (claim da *landing*). **Sem período de teste grátis** ([Termos](${TERMOS})).

Pagamento: cartão Visa/Mastercard via **Stripe** (planos recorrentes) **ou** **Passe Pix** (sem renovação automática). Assinatura nas lojas de app gere-se **na loja** (Apple / Google / Amazon), não no site.

## 4. Linha do tempo (o que as fontes dizem)

| Data | Facto | Fonte |
|------|-------|-------|
| 2014 | Supo Mungam Films — distribuição de cinema independente | [Wiki](${WIKI}) |
| 2015+ | Gracielly como curadora/programadora SMF (a própria [Sobre](${SOBRE})) | Site |
| dez. 2020 | Supo Mungam **Plus** (streaming) | Wiki / imprensa |
| 19 out. 2020 | CNPJ CSF DISTRIBUIDORA & STREAMING LTDA | Receita (agregadores públicos) |
| **12 nov. 2021** | Marca **FILMICCA** substitui SMF / Plus; degustação de 5 títulos grátis 30 dias | [Exibidor / Cineplaneta](${EXIBIDOR}) |
| 2025 | *Jeanne Dielman* (Akerman) restaurado nos cinemas BR | [Loja · Sobre](${LOJA}) |
| 2026 | Loja virtual de blu-ray | Loja · Sobre |

A [Wikipédia](${WIKI}) e a imprensa ligam **Pedro H. Leite** à fundação da SMF e à curadoria a dois. A página [Sobre](${SOBRE}) oficial **só nomeia Gracielly Pinto**. Esta ficha **não unifica** os dois relatos: o site é a âncora da marca; o sócio aparece como camada jornalística/wiki.

## 5. O que a marca diz de si × leitura BudGanja

| Frase (site / ajuda) | Leitura |
|----------------------|---------|
| «Streaming com curadoria» / «curadoria humana e única» | Modelo: selecção editorial, não algoritmo de volume. «Única» é **marketing** — há outras curadorias (MUBI, etc.) fora desta ficha |
| «O melhor do cinema mundial» | Superlativo. O que se sustenta: **nicho autoral/cult/festivais**, não «o melhor» absoluto |
| «Plataforma 100% brasileira e independente» | Empresa BR, microempresa nas fichas cadastrais. Independência de capital **não** auditada aqui |
| «Metade do acervo realizado por mulheres» | **Declarado** em [Sobre](${SOBRE}) e na loja. Colecções citadas: Akerman, Sara Gómez, Márta Mészáros, Ngozi Onwurah, Ulrike Ottinger. Sem censo feito por este laboratório |
| «Novidades toda semana» | Confirmado no [FAQ de estreias](${FAQ_ESTREIAS}) (Letterboxd / Instagram / X / newsletter) |
| Depoimentos na *landing* («catálogo surreal», «precinho mais top») | Prova social de marketing — **não** métrica |

## 6. Catálogo — números declarados (não contados aqui)

| Grandeza | O que a casa diz (FAQ, leitura ${inspected}) | Outra camada |
|----------|-----------------------------------------------|--------------|
| Títulos | «cerca de **400**» ([FAQ](${FAQ_N})) | Imprensa 2026 (ex. Luiz Cesar / Substack) cita «cerca de **630**» e **90** países — **não** substitui o FAQ; ambos são datados |
| Países | **67** ([FAQ](${FAQ_PAISES})) — exemplos: BR, Japão, Senegal, França, EUA, Peru, Espanha, Irão, Reino Unido, China, México, Hungria | |
| Épocas | Primeiras décadas do cinema → anos 60/70 → 80–2010 → lançamentos 2020 | [FAQ épocas](${FAQ_EPOCAS}) |
| Permanência | **Pelo menos 2 anos** no acervo; excepções (festivais, título específico) | [FAQ prazo](${FAQ_PRAZO}) |
| Áudio / legendas | Idioma original + legendas **PT**; nacionais legendados «quando disponíveis» | [FAQ idioma](${FAQ_IDIOMA}) |
| Qualidade | Maioria **Full HD**; clássicos sobretudo restaurados; SD só se for a única cópia | [FAQ qualidade](${FAQ_QUALIDADE}) |
| Fora do Brasil | **Não** | [FAQ](${FAQ_BR}) |

**Veredicto do catálogo:** o laboratório **não** abriu sessão autenticada nem contou SKUs. Usa-se o FAQ como declaração oficial do dia da leitura; divergências de imprensa ficam como **alerta de data**, não como correcção silenciosa.

## 7. Preços e urgência (snapshot ${inspected})

A *home* mostrava, no mesmo ecrã, **várias ofertas sobrepostas**. Não são tabelas eternas.

| Oferta visível | Valor declarado | Validade no ecrã |
|----------------|-----------------|------------------|
| Plano mensal | de R$ 29,90 **por R$ 19,90**/mês («desconto vitalício») | «até 30/06/2026» |
| Passe anual Pix | de R$ 239,90 **por R$ 199,90** | «até 30/06/2026» |
| Cupão **FLMC150** | Passe Pix 12 meses a **R$ 150** | «oferta limitada» |
| Faixa «Só até hoje» | Passe anual **R$ 99,90** no Pix «até 23h59» | Urgência de *landing* — **não** cruzar com a validade de junho sem reler o checkout |
| Passe Pix curto | 48 h R$ 9,90 · 3 meses R$ 49,90 · 6 meses R$ 89,90 | Sem renovação automática |

[Termos](${TERMOS}): **CDC art. 49** — reembolso integral da **primeira** assinatura/passe em **7 dias** corridos por escrito a suporte@filmicca.com.br; renovação **mensal** não reembolsada; renovação **anual** em 7 dias com **multa de 30%**. Valores promocionais «não são reembolsáveis» (cláusula da casa). Menores: serviço para **18+**; menores só com supervisão; controlo parental com PIN.

E-mails oficiais citados nos termos: suporte@filmicca.com.br · assinatura@filmicca.com.br · filmicca@filmicca.com.br. A casa pede para **não** seguir links de remetentes outros.

## 8. Distinção: plataforma ≠ obra

O laboratório inspeciona **filmes um a um** quando o pedido é a obra. Exemplos já no ficheiro: [The Matrix](${matrix}), [Um Sonho de Liberdade](${shawshank}), [De Volta para o Futuro](${bttf}), [Alice](${alice}), [Divertida Mente](${divertida}). A FILMICCA pode **albergar** (ou não) equivalentes — **esta ficha não confirma presença de nenhum título**. [Pipoca](${pipoca}) é o lanche da sala; a FILMICCA é a **prateleira digital** com curadoria e preço. Elo de [caminho](${caminho}): escolher o que ver **sem** o volume das gigantes — tese da marca, não prova de qualidade de cada filme.

## 9. Limites

- Sem login, sem lista completa de títulos, sem teste de app/TV.  
- CNPJ e quadro societário: agregadores da Receita, não extracto emitido nesta ficha.  
- «Independência», paridade de género no acervo e «melhor preço do mercado» **não** passam como facto fechado.  
- Indexar uma loja de cinema **não** é crítica de filme nem aconselhamento de compra. [Verdade](${verdade}) = citar a fonte; [respeito](${respeito}) = não transformar curadoria alheia em endosso BudGanja.

## 10. Estado

**Aprovada** — inspeção de **site / loja de streaming**. Claims de superlativo e de volume de catálogo ficam **datados e atribuídos**. Sem endosso comercial.

[▶ site](${SITE}) · [▶ Sobre](${SOBRE}) · [▶ Ajuda](${AJUDA}) · [▶ Termos](${TERMOS}) · [▶ pipoca](${pipoca}) · [▶ Artes](${artes}) · [▶ Lojas](${lojas}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[FILMICCA](${SITE})** — Brazilian curated streaming (auteur / cult / independent), also a **distributor** and (2026) a **blu-ray shop**. Object = the **commercial site and service**, not a single film.

> Independent audit of public pages on ${inspected}. **No affiliation.** Indexing ≠ endorsement. Prices and catalogue size change.

## Subject

| Field | Value |
|-------|-------|
| Company (public registry) | CSF DISTRIBUIDORA & STREAMING LTDA · CNPJ 39.493.419/0001-68 |
| Brand live | 12 Nov 2021 (replaces Supo Mungam Films / Plus) |
| Founder (About page) | Gracielly Pinto |
| Territory | **Brazil only** |
| Lab type | Shop / streaming |

## Claims

“Human, unique curation” and “the best of world cinema” are **brand language**. Official FAQ (~${inspected}): about **400** titles, **67** countries, weekly premieres, titles kept **≥ 2 years**, original language + PT subs, mostly Full HD. Press may cite larger numbers — treat as **dated**, not a silent correction.

## Prices

Landing-page offers on ${inspected} stacked urgency (“only today”) with coupons valid to 30/06/2026. Snapshot only. Terms: no free trial; Stripe or PIX pass; 5 simultaneous devices; 7-day first-purchase refund (CDC); annual-renewal 30% fee clause.

## Status

**Approved** — platform sheet, not a film review, not a purchase recommendation.

[▶ site](${SITE}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[FILMICCA](${SITE})** — streaming brasileño con curaduría (autor / cult / independiente), también **distribuidora** y (2026) **tienda blu-ray**. El objeto es el **sitio/servicio**, no un filme.

> Auditoría independiente (${inspected}). **Sin afiliación.** Indexar ≠ endosar.

## Objeto

| Campo | Valor |
|-------|-------|
| Empresa | CSF DISTRIBUIDORA & STREAMING LTDA · CNPJ 39.493.419/0001-68 |
| Marca al aire | 12 nov. 2021 (sustituye Supo Mungam) |
| Fundadora (Sobre) | Gracielly Pinto |
| Territorio | **Solo Brasil** |
| Tipo lab | Tienda / streaming |

## Claims

«Curaduría humana y única» y «lo mejor del cine mundial» son **lenguaje de marca**. FAQ oficial: ~**400** títulos, **67** países, estrenos semanales, ≥ **2 años** en catálogo. La prensa puede citar cifras mayores — datar, no corregir en silencio.

## Precios

La home del ${inspected} superponía urgencia («solo hoy») y cupones hasta 30/06/2026. Instantánea. Términos: sin prueba gratis; Stripe o pase Pix; 5 pantallas; reembolso 7 días (primera compra); cláusula 30% en renovación anual.

## Estado

**Aprobada** — ficha de plataforma, no crítica de filme ni recomendación de compra.

[▶ sitio](${SITE}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildFilmiccaPost() {
  const { body, contentEn, contentEs } = buildFilmiccaBodies();
  let seriesOrder = 1;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-loja-filmicca');
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
    title: 'Inspeção: FILMICCA — streaming com curadoria, site e o catálogo declarado',
    titleEn: 'Inspection: FILMICCA — curated streaming, the site, and the declared catalogue',
    titleEs: 'Inspección: FILMICCA — streaming con curaduría, el sitio y el catálogo declarado',
    excerpt:
      'Lojas · streaming: FILMICCA (filmicca.com.br) — plataforma BR 2021 (ex-Supo Mungam); curadoria humana é claim; catálogo e preços datados; só Brasil; sem endosso.',
    excerptEn:
      'Shops · streaming: FILMICCA (filmicca.com.br) — BR platform 2021 (ex-Supo Mungam); “human curation” is a claim; catalogue and prices dated; Brazil only; no endorsement.',
    excerptEs:
      'Tiendas · streaming: FILMICCA (filmicca.com.br) — plataforma BR 2021 (ex-Supo Mungam); la curaduría humana es claim; catálogo y precios fechados; solo Brasil; sin endoso.',
    slug: 'inspecao-loja-filmicca',
    date: '2026-08-20T06:15:00.000Z',
    seriesOrder,
    seriesLabel: 'FILMICCA · streaming',
    coverImage: COVER,
    sourceUrl: SITE,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFilmiccaPost,
  buildFilmiccaBodies
};
