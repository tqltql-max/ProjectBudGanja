'use strict';

/**
 * Inspeção Palavras · cola / colar
 * Eixos: kólla (grude) × collum (pescoço) × Cola (noz) ·
 * colante · cortante · cerol · pipa · linha ·
 * Brasil com P de Perigo · ≠ receita · ≠ risco (mapa)
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cola-colar-palavra-cover.jpg';
const WIKT_COLA = 'https://pt.wiktionary.org/wiki/cola';
const WIKT_COLAR = 'https://pt.wiktionary.org/wiki/colar';
const WIKI_CEROL = 'https://pt.wikipedia.org/wiki/Cerol';
const WIKI_PIPA = 'https://pt.wikipedia.org/wiki/Pipa_(brinquedo)';

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

function buildColaColarBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-cola-colar.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const linha10 = '/posts/post-inspecao-palavra-linha-10-cerol.html';

  const body = `## Escopo

Inspeção editorial da família **[cola / colar](${self})** — e de tudo o que o pedido de campo colou à volta: **colante**, **cortante**, **cerol**, **pipa**, **linha**, **perigo**. O laboratório não funde os étimos. A âncora é a palavra; o caso brasileiro que pede carimbo é a **linha de pipa**. Veredicto de chão: **Brasil com P de Perigo** — literacia pública, não pânico, não receita.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cola](${WIKT_COLA}), [colar](${WIKT_COLAR}), [Wikipédia · Cerol](${WIKI_CEROL}), [Pipa (brinquedo)](${WIKI_PIPA}). Série [Palavras](${hub}). **Ficha ≠ manual de cerol, ≠ protocolo clínico, ≠ código penal comentado.** Nomear a mistura pública (adesivo + abrasivo na linha) ≠ ensinar a fazê-la. Pipa sem linha cortante continua brinquedo. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **cola** · **colar** |
| Família pedida | **colante** · **cortante** · **cerol** · **pipa** · **linha** · **perigo** |
| Carimbo de chão | **Brasil com P de Perigo** |
| Tipo BudGanja | Palavra — homógrafos × cadeia da pipa × literacia de dano |
| Não é | Receita · marca de refrigerante como definição · jóia · [risco](${risco}) (mapa calculado) |
| Elo léxico | [língua portuguesa](${lingua}) · [aglutinação](${aglutinacao}) (cola gramatical) · [glúten](${gluten}) (lat. *gluten* = cola) |
| Elo peito | [medo](${medo}) · [verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) |
| Elo mapa | [risco](${risco}) · [relação](${relacao}) · [simbiose](${simbiose}) · [criatividade](${criatividade}) |
| Fonte | [cola](${WIKT_COLA}) · [Cerol](${WIKI_CEROL}) |
| Data | ${inspected} |

**O que é o objecto:** várias palavras que **parecem uma**. Cola pega; colar pega ou enfeita o pescoço; colante descreve o que pega; cortante descreve o que corta; cerol é o nome BR da linha que pega **e** corta; pipa é o brinquedo; linha é o fio; perigo é o que acontece quando essa linha cruza uma rua.

## 2. Três raízes que não se colam

| Forma | Étimo de trabalho | Confiança | Ofício nesta ficha |
|-------|-------------------|-----------|-------------------|
| **cola** (grude) | lat. vulg. *colla* ← gr. κόλλα (*kólla*) «cola» | Alta | Âncora 1 |
| **colar** (verbo: pegar) | da mesma família de *cola* | Alta | O gesto de aderir |
| **colar** (substantivo: jóia) | lat. *collare* ← *collum* «pescoço» | Alta | Homógrafo — **outro objecto** |
| **cola** (noz / refrigerante) | género botânico *Cola* (África ocidental) | Alta noutro mapa | Homónimo de prateleira — **não** define o grude |
| **cola** (cauda / «na cola») | via «rabo, encalço» (paralelo com esp. *cola*) | Média–alta no uso BR | «Ir na cola» = perseguir de perto |

**H1:** *cola* de escola e *colar* de pescoço **rimam**; não partilham avô.  
**H2:** o refrigerante e a noz-de-cola são **terceira raiz** — marca e planta, não adesivo.  
**H3:** no Brasil, a cadeia que pede **P** não é a jóia nem a lata: é a **linha**.

**Veredicto etimológico:** três famílias sob grafias parecidas. Esta ficha segue a do **grude**, declara a do **pescoço** e a da **noz**, e desce à rua da **pipa**.

## 3. Família do grude (mapa curto)

| Palavra | Classe | Leitura lab |
|---------|--------|-------------|
| **cola** | s.f. | A substância que faz aderir; também «cola» de prova (anotação escondida) e, por extensão, plágio |
| **colar** | v. | Pegar, aderir, aplicar cola; no BR informal, **colar na prova** e **colar com** alguém (andar junto) |
| **colado** | adj. | Preso; também «muito perto» |
| **descolar** | v. | Soltar o que estava colado; no avião, decolar/descolar = deixar o chão |
| **colante** | adj. | Que cola — o que **pega** |
| **colagem** | s.f. | Arte de colar recortes — elo [criatividade](${criatividade}) |
| **colágeno** | s.m. | Proteína do tecido (gr. *kólla* + *-genēs*) — mesmo avô grego; **não** é cerol |
| **aglutinação** | s.f. | Cola **gramatical** — ficha [aglutinação](${aglutinacao}) |
| **glúten** | s.m. | Cola do trigo — ficha [glúten](${gluten}) |

**Leitura:** o grego *kólla* viajou para o tubo escolar, para o verso gramático, para o pão e para o corpo. O cerol é **um** uso brasileiro dessa viagem — o mais grave na rua.

## 4. Colante × cortante

No léxico da pipa brasileira, o par pede-se junto: linha **colante** e **cortante**.

| Termo | O que nomeia | Nota |
|-------|--------------|------|
| **Colante** | A linha (ou o revestimento) que **adere** | Sem o «pegar», o abrasivo não fica no fio |
| **Cortante** | A linha que **corta** outra linha — e, fora do céu, pele e via aérea | O adjectivo escolar («faca cortante») aqui vira **dano público** |
| **Linha** | O fio da pipa; também fila, verso, linha de pesca — **outro mapa** se não for pipa | Nesta ficha, linha = o que sobe com a pipa |
| **Pipa** | Brinquedo aéreo (também papagaio, raia, pandorga) | Pipa **sem** linha cortante ≠ cerol |
| **Cerol** | Nome BR do revestimento que torna a linha colante **e** cortante | Objecto de [literacia](${WIKI_CEROL}), não de tutorial |

**H4:** colante sem cortante ainda é cola. Cortante na linha, no Brasil, é o capítulo do **P**.  
**H5:** a ficha **não** descreve modo de fabrico. O facto público basta: adesivo + material abrasivo no fio = linha perigosa.

## 5. Cerol, pipa, linha — o caso brasileiro

A [Wikipédia · Cerol](${WIKI_CEROL}) documenta o uso recreativo (cortar a linha da outra pipa) e o **dano colateral**: motociclistas, ciclistas, peões, fauna, até aeronaves leves. O pico costuma cruzar férias escolares. Leis **municipais e estaduais** proíbem fabrico, venda e uso em muitos sítios; o debate federal segue; o Código Penal já cobre **perigo à vida** e lesão. Antena corta-linha na moto é **defesa de quem passa**, não elogio do cerol.

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| Pipa no céu | Infância, vento, [gesto](${gesto}) lúdico | Brinquedo — enquanto a linha for só linha |
| «Ganhar a disputa» | Jogo entre pipas | Fora do céu, a mesma linha atravessa pescoço e guidão |
| Cerol / linha chilena e afins | «Melhor linha» | Nomes de **linha cortante** — mesmo ofício de dano, outro rótulo |
| Proibir a pipa | Solução | Erro de objecto: o objecto perigoso é a **linha cortante**, não o papel no ar |

**Veredicto de objecto:** a pipa fica; o cerol não. Colar papel na pipa é ofício. Colar abrasivo na linha é **perigo**.

**Caso de campo (2026-08-24):** *contato com objeto cortante · pé direito* — o objecto nomeado foi **linha 10 + cerol**. Ficha própria: [Linha 10 · Cerol](${linha10}) (calibre do fio ≠ CPTM; pé direito do corpo ≠ pé-direito do teto).

## 6. Brasil com P de Perigo

O carimbo do laboratório não é slogan de pânico. É alfabeto:

**Brasil** — o chão onde cola, pipa e rua se cruzam.  
**com P** — a letra que esta ficha não deixa cair.  
**de Perigo** — ameaça **imediata** (lat. *periculum*), distinta do [risco](${risco}) (perigo **com contorno**, mapa, cálculo).

Dois P que a *cola* brasileira já conhece, sem os misturar:

| P | Caso | O que a ficha faz |
|---|------|-------------------|
| **Pipa / linha** | Cerol e afins | Nomear, recusar receita, apontar lei e trânsito |
| **Cola de sapateiro** | Adesivo volátil (tolueno) usado como droga — [Wikcionário](${WIKT_COLA}) | Só literacia de dano; **sem** via de uso |

**H6:** [medo](${medo}) é o peito a avisar; **perigo** é o facto na rua; [risco](${risco}) é o mapa para não fingir que «é só brincadeira».  
**H7:** [respeito](${respeito}) aqui é com o motociclista, a criança, o pássaro e quem só quer soltar pipa **sem** linha cortante.

## 7. Outros usos (para não colar o mundo todo no cerol)

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| Escola | cola branca, «cola o recorte» | Bom: âncora do grude |
| Prova | «levar cola», «colar» | Outro ofício ( copiar ) — declarar a camada |
| Afeto / rua | «cola comigo», «fica colado» | Gíria de companhia — não é cerol |
| Jóia | um colar no pescoço | Homógrafo *collum* — **não** misturar com linha no pescoço da rua |
| Refrigerante | cola / Coca-Cola | Homónimo de marca — recepção, não definição |
| Arte | colagem | [Criatividade](${criatividade}) |
| Gramática | [aglutinação](${aglutinacao}) | Colar morfemas |
| Corpo / pão | colágeno · [glúten](${gluten}) | Mesmo avô *kólla* / *gluten* — outras fichas |

## 8. Perigo × risco × medo

| Palavra | Ofício | Nesta ficha |
|---------|--------|-------------|
| **Perigo** | Ameaça já no caminho (o fio está lá) | Carimbo **P** |
| **[Risco](${risco})** | Perigo calculável; também o traço no papel | Mapa — não substitui o P |
| **[Medo](${medo})** | Afecto | Dados, não cobardia |

**Leitura:** quem só diz «é o risco da brincadeira» apaga o **P**. Quem só grita perigo sem [verdade](${verdade}) vira alarme. O lab quer os dois: nomear o perigo da linha; calcular o risco de soltar pipa **onde** e **com que** linha.

## Hipóteses (síntese)

**H1:** *cola* (grude) ≠ *colar* (jóia) ≠ *cola* (noz).  
**H2:** a família pedida (colante, cortante, cerol, pipa, linha) é a **cadeia brasileira** do grude no céu.  
**H3:** cerol = literacia de dano; ficha ≠ fabrico.  
**H4:** pipa ≠ inimiga; linha cortante é o objecto perigoso.  
**H5:** **Brasil com P de Perigo** é carimbo, não ódio ao brinquedo.  
**H6:** fecho = [Valeu !!!](${mantra}) — colar papel, não vidro; soltar pipa com [respeito](${respeito}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Aglutinação](${aglutinacao}) | Cola de palavras |
| [Glúten](${gluten}) | Cola do trigo |
| [Risco](${risco}) · [medo](${medo}) | Mapa × peito |
| [Gesto](${gesto}) · [relação](${relacao}) · [simbiose](${simbiose}) | Pegar com cuidado |
| [Criatividade](${criatividade}) | Colagem de arte |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Linha 10 · Cerol](${linha10}) | Calibre 10 + contato no pé direito |
| [Vida](${vida}) · [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Fecho |

## Limites

- Não é receita de cerol nem de linha chilena / afins.  
- Não é tratado de trânsito nem substitui lei local.  
- Não é ficha da jóia *colar* nem da marca de refrigerante.  
- Cola de sapateiro = outro P: só aviso, sem via.  
- Pipa como cachimbo, como anuro *Pipa*, como pipa de vinho = **outros mapas**.

## Status

**Aprovado** — **cola / colar** fichados com a cadeia **colante · cortante · cerol · pipa · linha**; carimbo **Brasil com P de Perigo**; pipa sem linha cortante permanece brinquedo. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Cerol (fonte)](${WIKI_CEROL}) · [▶ Risco](${risco}) · [▶ Aglutinação](${aglutinacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **cola / colar** and the Brazilian kite chain: **colante**, **cortante**, **cerol**, **pipa**, **linha**, **perigo**. Stamp: **Brazil with P for Perigo** (danger). Three roots: Greek *kólla* (glue), Latin *collum* (necklace), *Cola* the plant/drink. This sheet follows the glue, then the street.

> Independent audit. Sources: [Wiktionary · cola](${WIKT_COLA}), [Wikipedia · Cerol](${WIKI_CEROL}). **Not a recipe.** Naming a public mixture (adhesive + abrasive on the line) is literacy, not a tutorial. A kite without a cutting line remains a toy.

## Object

| Field | Value |
|-------|-------|
| Anchor | **cola** · **colar** |
| BR chain | sticky · cutting · cerol · kite · line · danger |
| Stamp | **P for Perigo** |
| Not | necklace catalogue · soda brand as definition · [risco](${risco}) (calculated map) |
| Date | ${inspected} |

**Verdict:** glue the paper, not glass on the line. The kite stays; cerol does not.

## Status

**Approved** — word family filed; Brazilian cutting-line danger named; no how-to.

[▶ Words](${hub}) · [▶ Risk](${risco}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **cola / colar** y la cadena brasileña de la cometa: **colante**, **cortante**, **cerol**, **pipa**, **linha**, **perigo**. Sello: **Brasil con P de Perigo**. Tres raíces: gr. *kólla* (pegamento), lat. *collum* (collar), planta/bebida *Cola*. Esta ficha sigue el grude y baja a la calle.

> Auditoría independiente. Fuentes: [Wikcionario · cola](${WIKT_COLA}), [Wikipedia · Cerol](${WIKI_CEROL}). **No es receta.** Nombrar la mezcla pública no es tutorial. Cometa sin línea cortante sigue siendo juguete.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **cola** · **colar** |
| Cadena BR | pegajosa · cortante · cerol · cometa · línea · peligro |
| Sello | **P de Perigo** |
| Fecha | ${inspected} |

## Estado

**Aprobada** — familia fichada; peligro de la línea cortante nombrado; sin modo de fabricación.

[▶ Palabras](${hub}) · [▶ Riesgo](${risco}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_COLA };
}

function buildColaColarPost() {
  const { body, contentEn, contentEs, wiki } = buildColaColarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-cola-colar', 170);
  const post = makePalavra({
    title: 'Inspeção: Cola · Colar — colante, cortante, cerol, pipa, linha e o Brasil com P de Perigo',
    titleEn: 'Inspection: Cola · Colar — sticky, cutting, cerol, kite, line, and Brazil with P for Danger',
    titleEs: 'Inspección: Cola · Colar — colante, cortante, cerol, cometa, línea y Brasil con P de Peligro',
    excerpt:
      'Palavras: cola/colar (kólla ≠ pescoço ≠ noz); cadeia BR colante·cortante·cerol·pipa·linha; Brasil com P de Perigo; ficha ≠ receita; Valeu !!!',
    excerptEn:
      'Words: cola/colar (glue ≠ necklace ≠ kola); BR chain sticky·cutting·cerol·kite·line; Brazil with P for Danger; not a recipe; Valeu !!!',
    excerptEs:
      'Palabras: cola/colar (pegamento ≠ collar ≠ cola); cadena BR; Brasil con P de Peligro; no es receta; ¡Valeu !!!',
    slug: 'inspecao-palavra-cola-colar',
    date: '2026-08-21T20:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Cola · Colar · palavra',
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

module.exports = { buildColaColarPost, buildColaColarBodies };
