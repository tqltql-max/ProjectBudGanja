'use strict';

/**
 * Inspeção Palavras · Linha 10 · cerol
 * Eixos: número da linha de pipa (calibre 10) · cerol (revestimento cortante) ·
 * gatilho de campo: contato com objeto cortante · pé direito ·
 * ≠ CPTM Linha 10 · ≠ pé-direito (teto) · ≠ receita ·
 * Brasil com P de Perigo · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/linha-10-cerol-palavra-cover.jpg';
const WIKI_CEROL = 'https://pt.wikipedia.org/wiki/Cerol';
const WIKI_PIPA = 'https://pt.wikipedia.org/wiki/Pipa_%28brinquedo%29';
const WIKI_L10 = 'https://pt.wikipedia.org/wiki/Linha_10_do_Trem_Metropolitano_de_S%C3%A3o_Paulo';
const WIKT_LINHA = 'https://pt.wiktionary.org/wiki/linha';
const WIKT_PE = 'https://pt.wiktionary.org/wiki/p%C3%A9';
const WIKT_PE_DIR = 'https://pt.wiktionary.org/wiki/p%C3%A9-direito';
const WIKT_CONTATO = 'https://pt.wiktionary.org/wiki/contato';
const WIKT_CORTANTE = 'https://pt.wiktionary.org/wiki/cortante';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Linha 10.
Não é o trem.
Não é o pé-direito do teto.
É o número do fio.

Cerol.
Não é receita.
É o P na rua.

Contato com objeto cortante.
Pé direito.
O corpo nomeia o sítio.
O lab nomeia o objecto.

A pipa pode subir.
A linha que corta não.

Valeu !!!
com linha que seja só linha,
sem colar vidro no céu.`;
}

function poemEn() {
  return `Line 10.
It is not the train.
It is not ceiling height.
It is the number of the string.

Cerol.
Not a recipe.
The P in the street.

Contact with a cutting object.
Right foot.
The body names the site.
The lab names the object.

The kite may rise.
The cutting line may not.

Valeu !!!
with a line that is only a line,
without gluing glass to the sky.`;
}

function poemEs() {
  return `Línea 10.
No es el tren.
No es el pie derecho del techo.
Es el número del hilo.

Cerol.
No es receta.
Es la P en la calle.

Contacto con objeto cortante.
Pie derecho.
El cuerpo nombra el sitio.
El lab nombra el objeto.

La cometa puede subir.
La línea que corta no.

¡Valeu !!!
con línea que sea solo línea,
sin pegar vidrio al cielo.`;
}

function buildLinha10CerolBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-linha-10-cerol.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const sinais = '/posts/post-inspecao-palavra-sinais.html';
  const sangue = '/posts/post-inspecao-palavra-sangue.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const curar = '/posts/post-inspecao-palavra-curar.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';

  const body = `## Escopo

Inspeção editorial de **[Linha 10 · cerol](${self})** — o **número do fio** da pipa brasileira e o revestimento que o torna **colante e cortante**. Pedido de campo: *inspeção em Linha 10 cerol*, no mesmo sopro que *contato com obejto cortante pé direito* (canónico: **objeto**). A família lexical já está em **[cola / colar](${cola})**. Esta ficha desce ao **calibre nomeado** e ao **sítio do corpo**.

[A orelha cola](${orelhaCola}) *Linha 10* no [trem](${WIKI_L10}) e *pé direito* no **pé-direito** do teto. O étimo e o chão **cortam**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Cerol](${WIKI_CEROL}), [Pipa](${WIKI_PIPA}), [linha](${WIKT_LINHA}), [pé](${WIKT_PE}), [pé-direito](${WIKT_PE_DIR}), [contato](${WIKT_CONTATO}), [cortante](${WIKT_CORTANTE}). Série [Palavras](${hub}). **Ficha ≠ receita de cerol, ≠ protocolo clínico, ≠ CAT, ≠ código CID, ≠ manual de trânsito.** Nomear o objecto público ≠ ensinar o fabrico. Se houver corte, procurar **cuidado de saúde** — esta página não trata. Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **linha 10** · **cerol** |
| Gatilho de campo | **contato com objeto cortante** · **pé direito** |
| Tipo BudGanja | Palavra — calibre da pipa × literacia de dano × sítio do corpo |
| Carimbo | **Brasil com P de Perigo** (herdado de [cola / colar](${cola})) |
| Não é | [CPTM Linha 10](${WIKI_L10}) · [pé-direito](${WIKT_PE_DIR}) (altura do teto) · [fim da linha](${fimLinha}) · faca de cozinha como definição · receita |
| Elo cadeia | [cola / colar](${cola}) — colante · cortante · cerol · pipa · linha |
| Elo corpo | [sinais](${sinais}) · [sangue](${sangue}) · [mãos](${maos}) / [esquerdo](${esquerdo}) · [em pé](${emPe}) |
| Elo mapa | [objetos](${objetos}) · [risco](${risco}) · [medo](${medo}) · [respeito](${respeito}) |
| Fonte | [Cerol](${WIKI_CEROL}) · [linha](${WIKT_LINHA}) |
| Data | ${inspected} |

**O que é o objecto:** **linha 10** = o fio da pipa no **número 10** da prateleira brasileira (calibre / espessura, não um código de comboio). **Cerol** = o revestimento que torna essa linha **colante e cortante**. O gatilho *contato com objeto cortante, pé direito* nomeia o **sítio** (pé [direito](${maos}) do corpo) e a **classe** do objecto (cortante) — sem substituir o nome próprio: **linha 10 com cerol**.

## 2. Hipóteses e método

**H1:** *linha 10* nesta ficha é **calibre de pipa**, não a [Linha 10 Turquesa](${WIKI_L10}) da CPTM.  
**H2:** o **10** numera o fio (4, 6, 8, 10, 12… na banca); **não** numera o cerol. Sem revestimento cortante, linha 10 continua linha.  
**H3:** cerol = literacia de dano; a ficha **não** descreve modo de fabrico. O facto público basta: adesivo + abrasivo no fio = linha perigosa.  
**H4:** *contato com objeto cortante* é **fala de atendimento** (pronto-socorro / CAT), não laudo e não receita.  
**H5:** *pé direito* aqui é o **pé do lado direito** (lat. *pēs* + *dexter*), não o [pé-direito](${WIKT_PE_DIR}) da arquitectura (altura do piso ao teto).  
**H6:** o caso irmão no mesmo ofício de corpo × objecto — *contato com objeto escada · dedo do pé esquerdo* — ficou na [mindinho](${mindinho}) como **outra sala** (escada, pé esquerdo). Esta ficha é **linha cortante, pé direito**.  
**H7:** fecho = [Valeu !!!](${mantra}) — pipa com linha que seja só linha; [respeito](${respeito}) a quem passa na rua.

Passos: número do fio → cerol (P) → fala de contato → sítio do pé → cortes de homógrafo → [Valeu !!!](${mantra}).

## 3. Linha 10 — o número do fio

No léxico da pipa brasileira, a **linha** vende-se com **número**. O 10 é um calibre **comum** na banca: mais grosso que os miúdos (4, 6, 8), ainda nome de brinquedo. O número descreve o **fio**, não o revestimento.

| Forma | O que nomeia | Nota |
|-------|--------------|------|
| **Linha** | Fio da pipa; também fila, verso, pesca, comboio | Nesta ficha: o que sobe com a pipa |
| **Linha 10** | Calibre **10** desse fio | Número de prateleira, não de estação |
| **Cerol** | Revestimento que torna a linha colante **e** cortante | Objecto de [literacia](${WIKI_CEROL}), não de tutorial |
| **Linha chilena** e afins | Outros nomes de **linha cortante** | Mesmo ofício de dano, outro rótulo — sem fabrico |
| **Pipa** | Brinquedo aéreo | Sem linha cortante continua pipa |

**H-calibre:** linha 10 **sem** cerol ≠ objecto desta ficha. O P cola no **revestimento cortante**, não no algodão nu.

**Veredicto de número:** o 10 é o nome do fio. O perigo é o que se **cola** nele.

## 4. Três Linha 10 que não se colam

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Linha 10** (pipa) | «a linha» | Calibre do fio — âncora desta ficha |
| **[Linha 10](${WIKI_L10})** CPTM | o mesmo número | Comboio Turquesa (SP) — **outro mapa** |
| **Linha 10** de ônibus / mapa | o mesmo número | Itinerário — outro mapa |
| **[Fim da linha](${fimLinha})** | a linha acaba | Locução de percurso / esteira — outra ficha |
| **Linha** de pesca / de texto | o mesmo lema | Outro ofício da [linha](${WIKT_LINHA}) |

**H-orelha:** a boca diz *linha dez*; a orelha pode ouvir o **trem**. O chão desta ficha é a **pipa**.

## 5. Contato com objeto cortante — pé direito

Gatilho de campo (com o lapso *obejto*): **contato com objeto cortante · pé direito**.

É a frase que o atendimento usa quando o corpo encontra um [objeto](${objetos}) que **corta**. Não é o nome do objecto. O objecto, neste sopro, foi nomeado a seguir: **linha 10 + cerol**.

| Peça | Leitura lab | Não é |
|------|-------------|-------|
| **Contato** | Encontro corpo × objecto (lat. *contactus*) | Amizade · e-mail de [contato](${WIKT_CONTATO}) |
| **Objeto cortante** | Classe: o que corta | Faca de cozinha como definição · receita |
| **Pé direito** | Pé do lado **direito** do corpo | [Pé-direito](${WIKT_PE_DIR}) = altura do teto · [direita](${maos}) política |
| **Cerol na linha 10** | O objecto **próprio** deste contato | «Qualquer corte» |

O caso irmão ([mindinho](${mindinho})): *contato com objeto escada · dedo do pé esquerdo · dor*. Duas salas: **escada / pé esquerdo** × **linha cortante / pé direito**. Relacionar ≠ fundir.

**H-corpo:** [sinais](${sinais}) mostram o sítio; [sangue](${sangue}) pode aparecer; [curar](${curar}) é ofício clínico — **fora desta página**. [Medo](${medo}) é o peito; [risco](${risco}) é o mapa; **perigo** é o fio ainda na rua.

**Veredicto de contato:** a fala de atendimento **aponta**; o lab **nomeia**. Objecto = linha 10 com cerol. Sítio = pé direito. Ficha ≠ tratamento.

## 6. Pé direito × pé-direito (teto)

| Forma | Étimo de trabalho | Ofício |
|-------|-------------------|--------|
| **pé direito** (corpo) | lat. *pēs* + *dexter* | O pé do lado direito — âncora do gatilho |
| **[pé-direito](${WIKT_PE_DIR})** | mesmo *pé*, outro ofício | Altura do piso ao teto (arquitectura / maquete) |
| **[em pé](${emPe})** | locução de postura | Corpo erguido — não o pé ferido |
| **pé esquerdo** | par de lateralidade | Caso da [escada](${mindinho}) — outra sala |

**H-teto:** *pé direito duplo* na maquete é **altura**. *Pé direito* nesta ficha é **membro**. A hífen da arquitectura ajuda a cortar; a fala de atendimento quase nunca a usa — por isso o lab declara as duas salas.

## 7. Cerol — o P, sem receita

A ficha-mãe **[cola / colar](${cola})** já carimbou **Brasil com P de Perigo**. Aqui o P aterra num **número de fio** e num **pé**.

A [Wikipédia · Cerol](${WIKI_CEROL}) documenta o uso recreativo (cortar a linha da outra pipa) e o **dano colateral**: motociclistas, ciclistas, peões, fauna. Leis municipais e estaduais proíbem fabrico, venda e uso em muitos sítios. Antena corta-linha na moto é **defesa de quem passa**, não elogio do cerol.

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| «Linha 10 no cerol» | linha melhor para a disputa | Linha **cortante** no calibre 10 |
| Pipa no céu | infância | Brinquedo — enquanto a linha for só linha |
| Proibir a pipa | solução | Erro de objecto: o perigo é a **linha cortante** |
| Ficha do lab | tutorial | Literacia — **sem** fabrico |

**H-P:** [medo](${medo}) avisa; **perigo** está no fio; [risco](${risco}) mapeia onde **não** soltar linha cortante. Quem diz «é só brincadeira» apaga o P. Quem apaga a pipa inteira erra o [objeto](${objetos}).

## Hipóteses (síntese)

**H1:** linha 10 = calibre de pipa ≠ CPTM ≠ ônibus.  
**H2:** o 10 numera o fio; o cerol é o P.  
**H3:** ficha ≠ receita ≠ CID ≠ CAT.  
**H4:** contato com objeto cortante aponta; linha 10 + cerol nomeia.  
**H5:** pé direito (corpo) ≠ pé-direito (teto).  
**H6:** pipa fica; linha cortante não.  
**H7:** fecho = [Valeu !!!](${mantra}) · [vida](${vidaPalavra}) — [respeito](${respeito}) na rua.

## Poema Vida

\`\`\`poem
${poemPt()}
\`\`\`

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Cola / colar](${cola}) | Família colante · cortante · cerol · pipa · linha |
| [Objetos](${objetos}) · [risco](${risco}) · [medo](${medo}) | Coisa × mapa × peito |
| [Sinais](${sinais}) · [sangue](${sangue}) · [curar](${curar}) | Corpo — sítio, fluido, ofício clínico (fora da ficha) |
| [Mãos](${maos}) · [esquerdo](${esquerdo}) · [em pé](${emPe}) | Lateralidade e postura |
| [Mindinho](${mindinho}) | Caso irmão: escada · pé esquerdo |
| [Fim da linha](${fimLinha}) | Outra *linha* — percurso |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Vida](${vida}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é receita de cerol, linha chilena ou afins.  
- Não é protocolo de ferida, sutura, vacina ou CAT.  
- Não é ficha da [Linha 10](${WIKI_L10}) CPTM nem de pé-direito arquitectónico.  
- Não substitui lei local nem antena de moto.  
- Pipa como cachimbo, anuro ou pipa de vinho = outros mapas.

## Status

**Aprovado** — **linha 10** fichada como calibre de pipa; **cerol** como P de Perigo no fio; gatilho **contato com objeto cortante · pé direito** lido como sítio do corpo, sem laudo. Pipa sem linha cortante permanece brinquedo. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Cola / colar](${cola}) · [▶ Cerol (fonte)](${WIKI_CEROL}) · [▶ Risco](${risco}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Brazilian **line 10** (kite-string gauge) plus **cerol** (the coating that makes a line sticky and cutting). Field trigger: *contact with a cutting object, right foot*. The word family lives on **[cola / colar](${cola})**. This sheet names the numbered string and the body site.

The ear glues *Linha 10* to São Paulo’s [CPTM Line 10](${WIKI_L10}) and *pé direito* to architectural **ceiling height**. The ground of this sheet is the kite.

> Independent audit. Sources: [Wikipedia · Cerol](${WIKI_CEROL}), [linha](${WIKT_LINHA}), [pé](${WIKT_PE}). **Not a recipe, not a clinical protocol, not an ICD code.** Naming a public hazard is literacy, not a how-to. Seek care for a cut — this page does not treat. Stamp: **Brazil with P for Perigo**.

## Object

| Field | Value |
|-------|-------|
| Anchor | **linha 10** · **cerol** |
| Trigger | contact with a cutting object · **right foot** |
| Not | CPTM Line 10 · ceiling height (*pé-direito*) · a kitchen knife as the definition |
| Date | ${inspected} |

**Verdict:** the 10 numbers the string. Cerol is the P. The kite stays; the cutting line does not.

## Status

**Approved** — numbered kite line filed; cutting-line danger named; body site named without a medical record; no how-to.

[▶ Words](${hub}) · [▶ Cola / colar](${cola}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la **línea 10** brasileña (calibre del hilo de cometa) más **cerol** (el revestimiento que la hace colante y cortante). Gatillo de campo: *contacto con objeto cortante, pie derecho*. La familia léxica vive en **[cola / colar](${cola})**. Esta ficha nombra el hilo numerado y el sitio del cuerpo.

El oído pega *Linha 10* al [tren CPTM Línea 10](${WIKI_L10}) y *pé direito* al **pie derecho** del techo (altura). El suelo de esta ficha es la cometa.

> Auditoría independiente. Fuentes: [Wikipedia · Cerol](${WIKI_CEROL}), [linha](${WIKT_LINHA}). **No es receta, no es protocolo clínico, no es código CIE.** Nombrar el peligro público es literacia, no tutorial. Si hay corte, buscar **cuidado de salud**. Sello: **Brasil con P de Perigo**.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **linha 10** · **cerol** |
| Gatillo | contacto con objeto cortante · **pie derecho** |
| No es | CPTM Línea 10 · altura del techo · cuchillo de cocina como definición |
| Fecha | ${inspected} |

**Veredicto:** el 10 numera el hilo. El cerol es la P. La cometa queda; la línea cortante no.

## Estado

**Aprobada** — calibre fichado; peligro de la línea cortante nombrado; sitio del cuerpo nombrado sin ficha clínica; sin modo de fabricación.

[▶ Palabras](${hub}) · [▶ Cola / colar](${cola}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI_CEROL };
}

function buildLinha10CerolPost() {
  const { body, contentEn, contentEs, wiki } = buildLinha10CerolBodies();
  const seriesOrder = pickOrder('inspecao-palavra-linha-10-cerol', 200);
  const post = makePalavra({
    title: 'Inspeção: Linha 10 · Cerol — contato com objeto cortante, pé direito',
    titleEn: 'Inspection: Line 10 · Cerol — contact with a cutting object, right foot',
    titleEs: 'Inspección: Línea 10 · Cerol — contacto con objeto cortante, pie derecho',
    excerpt:
      'Palavras: linha 10 (calibre de pipa ≠ CPTM) · cerol; gatilho contato com objeto cortante · pé direito (≠ teto); Brasil com P; ficha ≠ receita; Valeu !!!',
    excerptEn:
      'Words: line 10 (kite gauge ≠ train) · cerol; trigger contact with a cutting object · right foot (≠ ceiling height); P for Danger; not a recipe; Valeu !!!',
    excerptEs:
      'Palabras: línea 10 (calibre de cometa ≠ tren) · cerol; gatillo contacto con objeto cortante · pie derecho (≠ techo); P de Perigo; no es receta; ¡Valeu !!!',
    slug: 'inspecao-palavra-linha-10-cerol',
    date: '2026-08-24T10:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Linha 10 · Cerol · palavra',
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

module.exports = {
  buildLinha10CerolPost,
  buildLinha10CerolBodies,
  poemPt,
  poemEn,
  poemEs,
  WIKI_CEROL,
  WIKT_LINHA
};
