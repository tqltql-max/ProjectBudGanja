'use strict';

/**
 * Inspeção Palavras · link × Klink
 * Eixos: loanword EN (elo / hiperligação) · sobrenome Klink (Tamara / Amyr) ·
 * orelha cola · étimo separa · ≠ alemão link «esquerda» · ≠ Coronel Klink
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/link-klink-palavra-cover.jpg';
const WIKT_EN = 'https://en.wiktionary.org/wiki/link';
const WIKT_PT = 'https://pt.wiktionary.org/wiki/link';
const WIKI_AMYR = 'https://pt.wikipedia.org/wiki/Amyr_Klink';
const WIKI_TAMARA = 'https://pt.wikipedia.org/wiki/Tamara_Klink';
const DAFN = 'https://www.ancestry.com/last-name-meaning/klink';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildLinkKlinkBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-link.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const siteTamara = '/posts/post-inspecao-site-tamaraklink.html';
  const canalTamara = '/posts/post-inspecao-canal-tamaraklink.html';
  const inverno = '/inverno/';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const eloLigacao = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const colchao = '/posts/post-inspecao-palavra-colchao.html';

  const body = `## Escopo

Inspeção editorial da palavra **[link](${self})** e da sua **[relação](${relacao})** com o sobrenome **Klink** de [Tamara Klink](${tamara}). O pedido de campo é o da orelha brasileira: *Klink* **soa** a *link*; o sítio [tamaraklink.com](${siteTamara}) **lê-se** «Tamara link». O laboratório declara a cola do ouvido e **recusa** transformá-la em étimo. Duas peças: o loanword inglês; o apelido germânico da família.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · link](${WIKT_EN}), [Wikcionário · link](${WIKT_PT}), [Wikipédia · Tamara](${WIKI_TAMARA}), [Amyr](${WIKI_AMYR}), onomástica pública [Klink](${DAFN}). **Palavra ≠ pessoa.** Fichas de legado: [Tamara](${tamara}) · [Amyr](${amyr}). Sem afiliação. Grafia oficial do apelido: **Klink** (por vezes «Clinck»).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Âncora 1 | **link** — loanword EN no PT (elo, hiperligação) |
| Âncora 2 | **Klink** — sobrenome público de [Tamara](${tamara}) e [Amyr](${amyr}) |
| O que a orelha faz | Colar *K-link* em *link* |
| O que o étimo faz | **Separar** |
| Tipo BudGanja | Palavra — homografia de ouvido × [relação](${relacao}) |
| Não é | Biografia · Coronel Klink (série) · *Link* de videojogo · alemão *link* «esquerda» |
| Elo pessoa | [Tamara](${tamara}) · [Amyr](${amyr}) · [site](${siteTamara}) · [canal](${canalTamara}) |
| Elo mapa | [relação](${relacao}) · [conexão](${conexao}) · [caminho](${caminho}) · [passar](${passar}) · [risco](${risco}) |
| Fonte | [link (EN)](${WIKT_EN}) |
| Data | ${inspected} |

**O que é o objecto:** duas formas que **partilham quatro letras**. *Link* nomeia o **elo**. *Klink* nomeia uma **família**. A [relação](${relacao}) entre elas é de **ouvido e de metáfora** — não de avô comum fechado.

## 2. Três «link» que não se colam

| Forma | Étimo de trabalho | Confiança | Ofício nesta ficha |
|-------|-------------------|-----------|-------------------|
| **link** (EN → PT) | inglês *link* «elo de corrente / ligação» ← médio inglês *linke* ← nórdico antigo *hlekkr* «anel de corrente» | Alta | Âncora 1 — o vocábulo |
| **Link** (informática) | o mesmo, sentido *hyperlink* (séc. XX–XXI) | Alta | O clique; o URL |
| **link** (alemão, adj.) | «esquerdo»; falso amigo | Alta noutro mapa | **Fora** — não é o sobrenome |
| **Klink** (apelido) | alemão/neerlandês: (A) *klinke* «trinco / barreia / maçaneta»; (B) variante toponímica de *Klinge* (ravina, ribeiro); (C) habitar sítio chamado Klink | Média–alta **como tipo de nome**; **não** fechada para *esta* família | Âncora 2 — o sobrenome |
| **Khan** (nome do meio de Amyr) | título/nome de raiz persa-árabe, comum no Líbano | Alta noutro mapa | Pai libanês — [Wikipédia](${WIKI_AMYR}); **≠** Klink |

**H1:** *link* no português do Brasil é **empréstimo** do inglês (elo / hiperligação).  
**H2:** *Klink* é **apelido germânico** (trinco, lugar, ravina) — hipóteses onomásticas em paralelo, sem eleger uma como baptismo da Tamara.  
**H3:** a letra **K** não é prefixo de *link*. É a cara alemã do nome.  
**H4:** Amyr = pai libanês + mãe sueca ([Wikipédia](${WIKI_AMYR})). Qual dos lados **transmitiu** Klink **não** está documentado nesta ficha — o que está: o apelido público é Klink; Khan é outra peça.

**Veredicto etimológico:** orelha **cola**; filologia **corta**. *Klink* não «vem de» *link*.

## 3. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Klink** no papel | *link* com um K | Apelido; tipo alemão/neerlandês |
| **tamaraklink.com** | «Tamara + link» | [Tamara](${tamara}) + **Klink** concatenados — a [ficha do site](${siteTamara}) |
| «Tamara é um link» | Étimo do sobrenome | **Metáfora de ofício** — só se declarada: elo entre [Amyr](${amyr}) e o próprio [caminho](${caminho}) |
| Alemão *link* | O mesmo vocábulo | «Esquerda» — falso amigo |
| Coronel Klink | A mesma família | Personagem de série — **outro mapa**, sem crédito aqui |
| *Link* (jogo) | Herói com o nome da palavra | Outro mapa |

## 4. A [relação](${relacao}) que o laboratório aceita

A ficha [relação](${relacao}) nomeia o **entre**. Aqui o entre é lícito **como leitura**, ilícito **como origem**:

| Leitura | Status lab |
|---------|------------|
| Tamara **liga** o legado do pai ao gelo próprio ([passar](${passar}) de ofício, não cópia) | Metáfora — [respeito](${respeito}) à [ficha de pessoa](${tamara}) |
| O site é um **link** para o Ártico | Literal: hiperligação |
| O sobrenome **significa** «elo» | Recusado como étimo |
| Invernagem = elo com [risco](${risco}) e [gesto](${gesto}) | Ofício — [*Bom dia, Inverno*](${bomDia}) · [hub Inverno](${inverno}) |

**H5:** chamar à Tamara um *link* só depois de dizer: **é figura, não filologia**.  
**H6:** fecho = [Valeu !!!](${mantra}) — ligar fichas com [verdade](${verdade}), sem baptizar o apelido.

## 5. Usos no português

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Hiperligação** | «abre o link» | Bom: âncora do loanword |
| **Elo** | «o link mais fraco» | Bom: sentido de corrente |
| **URL da Tamara** | tamaraklink.com | Bom se se lê **Klink**; mau se se apaga o K |
| **Sobrenome** | Tamara **Klink** | Bom: pessoa · mau: «o nome dela quer dizer link» |
| **Esquerda (DE)** | *linke Hand* | Outro mapa |

## Hipóteses (síntese)

**H1:** *link* = elo EN no PT.  
**H2:** *Klink* = apelido germânico (trinco / lugar / ravina) — tipo, não biografia.  
**H3:** a cola é de **ouvido** e de **URL**.  
**H4:** a [relação](${relacao}) lícita é metáfora de [caminho](${caminho}) / [passar](${passar}), com crédito às fichas de [Tamara](${tamara}) e [Amyr](${amyr}).  
**H5:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tamara Klink](${tamara}) · [Amyr](${amyr}) | Pessoas — Caps. 8 e 7 do [Legado](${legado}) |
| [Site](${siteTamara}) · [canal](${canalTamara}) | O URL que a orelha lê como *link* |
| [*Bom dia, Inverno*](${bomDia}) · [Inverno](${inverno}) | Ofício no gelo |
| [Relação](${relacao}) · [conexão](${conexao}) · [simbiose](${simbiose}) | O *entre* · a ação de ligar |
| [Elo de ligação](${eloLigacao}) | Locução PT do anel que junta; cruzamento do ∞ — **não** o loan *link* |
| [Colchão](${colchao}) | Outro «parece» da sessão — dormir, não elo |
| [Caminho](${caminho}) · [passar](${passar}) · [risco](${risco}) | Herança de ofício, não de étimo |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Fecho |

## Limites

- Não fecha qual progenitor de Amyr transmitiu o apelido.  
- Não é tratado de onomástica alemã. Hipóteses (trinco / *Klinge* / topónimo) ficam em paralelo.  
- Não mistura esta ficha com a biografia: pessoa = [Tamara](${tamara}).  
- Coronel Klink e *Link* de videojogo = fora.

## Status

**Aprovado** — **link** fichado como loanword (elo); **Klink** como sobrenome de [Tamara](${tamara}); a [relação](${relacao}) é de ouvido e de metáfora, **não** de origem. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Tamara](${tamara}) · [▶ Relação](${relacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **link** (English loan: chain-ring / hyperlink) and its **relation** to the surname **Klink** of [Tamara Klink](${tamara}). The Brazilian ear glues *Klink* to *link*; [tamaraklink.com](${siteTamara}) reads as “Tamara link”. The lab names the glue and **refuses** it as etymon.

> Independent audit. Sources: [Wiktionary · link](${WIKT_EN}), [Wikipedia · Tamara](${WIKI_TAMARA}), [Amyr](${WIKI_AMYR}). Word ≠ person. Official spelling **Klink**.

## Object

| Field | Value |
|-------|-------|
| Word | **link** — EN loan |
| Surname | **Klink** — Germanic-type family name |
| Ear | K-link ≈ link |
| Etymon | **apart** |
| Date | ${inspected} |

**Verdict:** *link* is a chain-ring. *Klink* is a family. Calling Tamara “a link” is craft metaphor ([caminho](${caminho}) / [passar](${passar})) — not the origin of the name.

## Status

**Approved** — loanword filed; surname filed; relation = ear + metaphor, not ancestry.

[▶ Words](${hub}) · [▶ Tamara](${tamara}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **link** (préstamo EN: eslabón / hipervínculo) y su **relación** con el apellido **Klink** de [Tamara Klink](${tamara}). El oído brasileño pega *Klink* a *link*; [tamaraklink.com](${siteTamara}) se lee «Tamara link». El laboratorio nombra la cola y **rechaza** el étimo.

> Auditoría independiente. Fuentes: [Wiktionary · link](${WIKT_EN}), [Wikipedia · Tamara](${WIKI_TAMARA}). Palabra ≠ persona. Grafía **Klink**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **link** — préstamo EN |
| Apellido | **Klink** — tipo germánico |
| Oído | K-link ≈ link |
| Étimo | **aparte** |
| Fecha | ${inspected} |

## Estado

**Aprobada** — préstamo fichado; apellido fichado; relación = oído + metáfora, no origen.

[▶ Palabras](${hub}) · [▶ Tamara](${tamara}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_EN };
}

function buildLinkKlinkPost() {
  const { body, contentEn, contentEs, wiki } = buildLinkKlinkBodies();
  const seriesOrder = pickOrder('inspecao-palavra-link', 172);
  const post = makePalavra({
    title: 'Inspeção: Link · Klink — a relação que a orelha cola e o étimo corta (Tamara)',
    titleEn: 'Inspection: Link · Klink — the relation the ear glues and the etymon cuts (Tamara)',
    titleEs: 'Inspección: Link · Klink — la relación que el oído pega y el étimo corta (Tamara)',
    excerpt:
      'Palavras: link (elo EN) × sobrenome Klink da Tamara; tamaraklink.com soa a «Tamara link»; metáfora de caminho ≠ origem do apelido; Valeu !!!',
    excerptEn:
      'Words: link (EN chain-ring) × Tamara’s surname Klink; tamaraklink.com reads as “Tamara link”; craft metaphor ≠ name origin; Valeu !!!',
    excerptEs:
      'Palabras: link (eslabón EN) × apellido Klink de Tamara; tamaraklink.com suena a «Tamara link»; metáfora de oficio ≠ origen; ¡Valeu !!!',
    slug: 'inspecao-palavra-link',
    date: '2026-08-21T20:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Link · Klink · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildLinkKlinkPost, buildLinkKlinkBodies };
