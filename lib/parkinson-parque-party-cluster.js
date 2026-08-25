'use strict';

/**
 * Trio Palavras · Parkinson × parque de diversões × party (paRTY)
 * Pedido: inspeção Parkinson relacionar com parque de diversões; cruzar party.
 * Método: a orelha cola PARK / PAR; o étimo corta.
 * Parkinson = Parkin + -son (Parkin ← Pedro); ≠ park.
 * Parque = recinto (parc / parricus); diversões = festa escolhida.
 * Party = partie ← partire (partir / partilhar); ≠ festum; ≠ Parkinson.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const HREF_P = '/posts/post-inspecao-palavra-parkinson.html';
const HREF_Q = '/posts/post-inspecao-palavra-parque-de-diversoes.html';
const HREF_Y = '/posts/post-inspecao-palavra-party.html';
const HREF_J = '/posts/post-inspecao-palavra-json.html';
const COVER_P = '/imagens/inspecoes/parkinson-palavra-cover.jpg';
const COVER_Q = '/imagens/inspecoes/parque-de-diversoes-palavra-cover.jpg';
const COVER_Y = '/imagens/inspecoes/party-palavra-cover.jpg';

const WIKT_PARKINSON = 'https://en.wiktionary.org/wiki/Parkinson';
const WIKT_PARKIN = 'https://en.wiktionary.org/wiki/Parkin';
const WIKI_JAMES = 'https://en.wikipedia.org/wiki/James_Parkinson';
const WIKI_DOENCA = 'https://pt.wikipedia.org/wiki/Doen%C3%A7a_de_Parkinson';
const WIKT_PARQUE = 'https://pt.wiktionary.org/wiki/parque';
const WIKT_PARK = 'https://en.wiktionary.org/wiki/park';
const WIKI_PARQUE = 'https://pt.wikipedia.org/wiki/Parque_de_divers%C3%B5es';
const WIKT_PARTY = 'https://en.wiktionary.org/wiki/party';
const WIKT_PARTIRE = 'https://en.wiktionary.org/wiki/partio#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 600) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

const fox = '/posts/post-inspecao-figura-michael-j-fox.html';
const unifesp13 = '/biblioteca/unifesp/livro-xiv.html#aula-13';
const caderno13 = '/biblioteca/unifesp/caderno.html#aula-13';
const curso = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
const canabinall = '/posts/post-inspecao-canal-canabinall.html';
const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
const etimo = '/posts/post-inspecao-palavra-etimo.html';
const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
const relacao = '/posts/post-inspecao-palavra-relacao.html';
const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
const respeito = '/posts/post-inspecao-palavra-respeito.html';
const verdade = '/posts/post-inspecao-palavra-verdade.html';
const alegria = '/posts/post-inspecao-palavra-alegria.html';
const dor = '/posts/post-inspecao-palavra-dor.html';
const gesto = '/posts/post-inspecao-palavra-gesto.html';
const boston = '/posts/post-inspecao-palavra-boston.html';
const mexico = '/posts/post-inspecao-palavra-mexico.html';
const vidaHub = '/vida/';
const mantra = '/posts/post-inspecao-palavra-valeu.html';
const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
const guia = '/guia/palavras.html';

function poemParkinsonPt() {
  return `Parkinson.
Não é o parque.
Não é a party.
É o filho de Parkin —
e Parkin é Pedro, não o recinto.

A orelha lê PARK
e aponta o parque de diversões.
O étimo corta:
o recinto é outro avô.

A doença leva o apelido
de James, 1817 —
paralisia agitante.
Facto. Não é o centro desta palavra.
Não é brinquedo.
Não é festa.

Party é partir / partilhar.
Parque é o cercado.
Parkinson é o patronímico.

Valeu !!!
três mapas,
sem fundir o tremor com a roda.`;
}

function poemParkinsonEn() {
  return `Parkinson.
It is not the park.
It is not the party.
It is the son of Parkin —
and Parkin is Peter, not the enclosure.

The ear reads PARK
and points to the amusement park.
The etymon cuts:
the enclosure is another grandfather.

The disease bears the surname
of James, 1817 —
shaking palsy.
Fact. Not the center of this word.
Not a ride.
Not a feast.

Party is to divide / to share.
Park is the enclosure.
Parkinson is the patronymic.

Valeu !!!
three maps,
without fusing tremor with the wheel.`;
}

function poemParkinsonEs() {
  return `Parkinson.
No es el parque.
No es la party.
Es el hijo de Parkin —
y Parkin es Pedro, no el recinto.

El oído lee PARK
y apunta al parque de diversiones.
El étimo corta:
el recinto es otro abuelo.

La enfermedad lleva el apellido
de James, 1817 —
parálisis agitante.
Hecho. No es el centro de esta palabra.
No es un juego.
No es fiesta.

Party es partir / compartir.
Parque es el cercado.
Parkinson es el patronímico.

¡Valeu !!!
tres mapas,
sin fundir el temblor con la rueda.`;
}

function poemParquePt() {
  return `Parque de diversões.
O recinto da festa escolhida.
Parque é o cercado.
Diversão é o desvio alegre.

Não é Parkinson.
Não é o tremor que ninguém pediu.
A roda gira porque se comprou o bilhete.

Party pode entrar no recinto.
Party não é o recinto.

Valeu !!!
diversão no sítio,
sem colar o apelido na bilheteira.`;
}

function poemParqueEn() {
  return `Amusement park.
The enclosure of chosen fun.
Park is the yard.
Diversion is the glad turning-aside.

It is not Parkinson.
It is not the tremor nobody asked for.
The wheel turns because a ticket was bought.

A party may enter the enclosure.
A party is not the enclosure.

Valeu !!!
fun in its place,
without gluing the surname to the ticket booth.`;
}

function poemParqueEs() {
  return `Parque de diversiones.
El recinto de la fiesta elegida.
Parque es el cercado.
Diversión es el desvío alegre.

No es Parkinson.
No es el temblor que nadie pidió.
La rueda gira porque se compró el boleto.

Party puede entrar en el recinto.
Party no es el recinto.

¡Valeu !!!
diversión en su sitio,
sin pegar el apellido en la taquilla.`;
}

function poemPartyPt() {
  return `Party.
Não é Parkinson.
Não é o parque.
É a parte que se junta —
partie, partir, partilhar.

No Brasil, a festa emprestada.
paRTY — o calor da boca.
PAR- que a orelha cola no PARK.

O parque de diversões
pode hospedar a party.
Não empresta o étimo.

Festa é festum.
Party é partire.
Traduzem-se. Não são o mesmo avô.

Valeu !!!
a festa no recinto,
o apelido no outro mapa.`;
}

function poemPartyEn() {
  return `Party.
It is not Parkinson.
It is not the park.
It is the part that gathers —
partie, to divide, to share.

In Brazil, the borrowed feast.
paRTY — heat of the mouth.
PAR- that the ear glues onto PARK.

The amusement park
may host the party.
It does not lend the etymon.

Festa is festum.
Party is partire.
They translate. They are not the same grandfather.

Valeu !!!
the feast in the enclosure,
the surname on the other map.`;
}

function poemPartyEs() {
  return `Party.
No es Parkinson.
No es el parque.
Es la parte que se junta —
partie, partir, compartir.

En Brasil, la fiesta prestada.
paRTY — el calor de la boca.
PAR- que el oído pega al PARK.

El parque de diversiones
puede hospedar la party.
No presta el étimo.

Festa es festum.
Party es partire.
Se traducen. No son el mismo abuelo.

¡Valeu !!!
la fiesta en el recinto,
el apellido en el otro mapa.`;
}

function sharedNote() {
  return `Pedido de campo: *inspeção na palavra Parkinson relacionar com parque de diversões*; *palavra paRTY também cruzar*. Método: [a orelha cola](${orelha}); o [étimo](${etimo}) **corta**. Irmão: [Boston](${boston}) × bosta; [México](${mexico}).`;
}

function buildParkinsonBodies() {
  const inspected = '2026-08-25';
  const body = `## Escopo

Inspeção editorial da palavra **[Parkinson](${HREF_P})** — o **apelido inglês** que virou **epónimo**. ${sharedNote()}

Objecto = o **vocábulo** *Parkinson* (Parkin + *-son*). Relação pedida: **[parque de diversões](${HREF_Q})** (a orelha lê *PARK*). Cruzamento pedido: **[party](${HREF_Y})** / *paRTY* (a orelha lê *PAR-*). A [doença de Parkinson](${WIKI_DOENCA}) **regista-se como facto e epónimo**; **não** é o centro desta ficha, **não** se romantiza e **não** se cola a um brinquedo.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · Parkinson](${WIKT_PARKINSON}), [Parkin](${WIKT_PARKIN}), [James Parkinson](${WIKI_JAMES}), [doença de Parkinson](${WIKI_DOENCA}). **Ficha ≠ manual clínico, ≠ conselho terapêutico, ≠ chacota do tremor, ≠ guia de parque.** Pessoa já fichada: [Michael J. Fox](${fox}) — ofício, não ficha de doença. Clínica canábica: [UNIFESP XIV aula 13](${unifesp13}) (Ana Rouver) — **outra sala**. Tom: [respeito](${respeito}) · [verdade](${verdade}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *Parkinson* / *PARKINSON* / *Parkinson's* / *mal de Parkinson* / *doença de Parkinson* / cola *parque* / cola *party*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Parkinson** (EN/PT — apelido e epónimo) |
| Classe | Antropónimo → epónimo médico |
| Étimo (trabalho) | EN **Parkin** + **-son** («filho de Parkin»); *Parkin* é hipocorístico de **Peter / Pedro** (via *Perkin*) — confiança: **alta** |
| O que a orelha lê | **PARK** → [parque](${HREF_Q}); **PAR-** → [party](${HREF_Y}) |
| Tipo BudGanja | Palavra — patronímico × cola de orelha × epónimo (facto, não centro) |
| Não é | [parque de diversões](${HREF_Q}) · [party](${HREF_Y}) · receita clínica · [Michael J. Fox](${fox}) (pessoa) |
| Elo mapa | [James Parkinson](${WIKI_JAMES}) (1755–1824) — *An Essay on the Shaking Palsy*, 1817 |
| Elo ofício | [etimologia](${etimologia}) · [trocadilho](${trocadilho}) · [relação](${relacao}) · [orelha cola](${orelha}) |
| Fonte | [Parkinson](${WIKT_PARKINSON}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome**. *Parkinson* = filho de Parkin. Parkin = Pedro no diminutivo inglês. O *park* do recinto **não** entra no avô.

## 2. Hipóteses e método

**H1:** *Parkinson* nesta ficha = o **vocábulo** (apelido / epónimo) — alta.  
**H2:** étimo = *Parkin* + *-son*; *Parkin* ← *Peter* — alta.  
**H3:** EN *park* / PT [parque](${HREF_Q}) (recinto ← *parc* / *parricus*) é **outro avô** — alta.  
**H4:** [party](${HREF_Y}) (*partie* ← *partire*) é **outro avô** — alta.  
**H5:** a cola BR (*Parkinson* contém *park*) é [trocadilho](${trocadilho}) / paronomásia visual, **não** parentesco — alta.  
**H6:** a doença é **epónimo** (Charcot popularizou *maladie de Parkinson*); facto; **não** o centro da palavra; **não** se compara a um brinquedo — alta (leitura de ofício).  
**H7:** [Michael J. Fox](${fox}) é **pessoa**; a aula 13 UNIFESP é **clínica** — outras salas.  
**H8:** fecho = [Valeu !!!](${mantra}).

Passos: (1) patronímico; (2) corte *park*; (3) cruzar [parque](${HREF_Q}) e [party](${HREF_Y}); (4) epónimo como facto; (5) limites.

## 3. Étimo — Parkin + son (Pedro, não o recinto)

| Peça | Leitura de trabalho | Confiança |
|------|---------------------|-----------|
| **Parkin** | Hipocorístico inglês de *Peter* (via *Perkin* / *Pierre*) | Alta |
| **-son** | Patronímico EN — «filho de» | Alta |
| **Parkinson** | «Filho de Parkin» | Alta |
| **Folk «filho do parque»** | A orelha cola *park* = [parque](${HREF_Q}) | **Recusada** como étimo |
| **Folk «Park + inson»** | Recinto + som | [Trocadilho](${trocadilho}), não avô |

**H-Pedro:** o *Park-* de *Parkin* é o Pedro inglês, não o *park* do jardim. Apagar o Pedro é o truque da orelha; o lab **repor** o Pedro.

Cognatos de ofício (não de sangue com *parque*): outros *-son* (*Johnson*, *Wilson*). PT **filho** / **pedro** são outro mapa; o cruzamento é de **nome**, não de recinto.

## 4. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Parkinson** ≈ **park** | O apelido «é» o recinto | Homografia parcial (*Park-*); o avô é *Peter* |
| **Parkinson** → [parque de diversões](${HREF_Q}) | A doença «é» um parque | Pedido de campo: **relacionar** ≠ **fundir**. O parque é recinto de [alegria](${alegria}) escolhida |
| **Parkinson** → [party](${HREF_Y}) | *PAR-* partilhado | *Party* ← *partire*; cola de letras, não de étimo |
| **«é uma festa no corpo»** | Metáfora do tremor | **Mau.** O tremor não é [party](${HREF_Y}) nem roda. [Dor](${dor}) e [gesto](${gesto}) ficam no corpo; a festa fica no recinto |
| **Boston Tea Party** | *Party* no mesmo sopro | 1773 é política colonial na ficha [Boston](${boston}); **não** este apelido |
| **[JSON](${HREF_J})** ≈ *jay-son* | A notação «é» o *-son* | JavaScript Object Notation; soa *Jason*; **não** o filho de Parkin. Pedido irmão: relacionar **PARK** com JSON |

**Veredicto contraste:** parece um só *PARK*; são **três mapas**. A [relação](${relacao}) etiquetada: o entre. Fundir é o erro.

## 5. Epónimo — facto, não centro

James Parkinson (1755–1824), cirurgião e paleontólogo inglês, descreve em 1817 a *shaking palsy* / **paralisia agitante**. Mais tarde o nome da doença leva o apelido. No lab:

| Sala | O que fazer |
|------|-------------|
| **Vocábulo** | Esta ficha — *Parkin* + *-son* |
| **Doença** | Nomear o epónimo; **não** diagnosticar, **não** dosar, **não** comparar a brinquedo |
| **Pessoa** | [Michael J. Fox](${fox}) — timing, ofício, advocacia; Parkinson **regista-se**, não se romantiza |
| **Clínica canábica** | [XIV aula 13](${unifesp13}) · [caderno](${caderno13}) · [curso](${curso}) · menção no [Canabinall](${canabinall}) — **outra sala** |
| **Vida** | Se a [dor](${dor}) pedir companhia: [Vida](${vidaHub}) · [eu amo a vida](${amo}) |

**H-não-ride:** o movimento do [parque de diversões](${HREF_Q}) é **escolhido** (bilhete). O tremor do epónimo **não** é atração. Relacionar as palavras **não** autoriza a metáfora cruel.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Parkinson vem de parque» | **Não.** Vem de *Parkin* (Pedro) + *-son* |
| «É a mesma palavra que park» | Partilha letras. **Não** partilha avô (*parricus* vs *Peter*) |
| «Cruzar com party é fundir» | Cruzar é **etiquetar o entre**. [Party](${HREF_Y}) ← *partire* |
| «A ficha zomba da doença» | A ficha **inspecciona o nome** e **recusa** a cola no brinquedo |
| «Ficha = aula 13» | A aula 13 é canabinóides e Parkinson **clínico**. Esta é a **palavra** |

**Veredicto correção:** **Parkinson = filho de Parkin (Pedro).** Se a boca disse *parque de diversões* ou *paRTY* no mesmo sopro, abrir esta ficha **e** [parque](${HREF_Q}) **e** [party](${HREF_Y}).

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Parque de diversões](${HREF_Q})** | Relação pedida — recinto da [alegria](${alegria}) escolhida; **não** o apelido |
| **[Party](${HREF_Y})** | Cruzamento pedido (*paRTY*) — *partie* / *partire*; **não** o apelido |
| **[JSON](${HREF_J})** | Cruzamento PARK × JSON — notação; soa *jay-son*; o lab **parqueia** objectos no ficheiro |
| [Trocadilho](${trocadilho}) · [etimologia](${etimologia}) · [orelha cola](${orelha}) | Mecanismo da cola × corte |
| [Boston](${boston}) · [México](${mexico}) | Irmãs de método (orelha ≠ mapa) |
| [Michael J. Fox](${fox}) | Pessoa — facto, advocacia; ≠ esta palavra |
| [UNIFESP aula 13](${unifesp13}) · [curso](${curso}) | Clínica — outra sala |
| [Dor](${dor}) · [gesto](${gesto}) · [respeito](${respeito}) · [alegria](${alegria}) | Corpo e ofício, sem metáfora de ride |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hub}) | Solo |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) · [Vida](${vidaHub}) | Fecho |

## 8. O poema

\`\`\`poem
${poemParkinsonPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=parkinson)

## Limites

- Não é diagnóstico, protocolo, dosagem nem revisão de evidência canábica.  
- Não inventaria a história completa de James Parkinson nem da fundação Fox.  
- Não é licença para metáfora de parque ou de festa sobre o tremor.  
- O [trocadilho](${trocadilho}) inspecciona-se; não se promove como étimo.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **Parkinson** fichado como **Parkin + -son** (Pedro, não o recinto); relação com [parque de diversões](${HREF_Q}) e cruzamento com [party](${HREF_Y}) etiquetados como cola de orelha, **não** parentesco; epónimo como facto, sem centro patológico. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Parque de diversões](${HREF_Q}) · [▶ Party](${HREF_Y}) · [▶ JSON](${HREF_J}) · [▶ Michael J. Fox](${fox}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of **[Parkinson](${HREF_P})** — the **English surname** that became an **eponym**. Field: *relate Parkinson to amusement park*; *also cross party (paRTY)*.

Etymon: **Parkin** + **-son** (Parkin = pet form of **Peter**). EN *park* / PT [parque de diversões](${HREF_Q}) (*parc* / *parricus*) is **another grandfather**. [Party](${HREF_Y}) (*partie* ← *partire*) is **another**. The ear reads PARK / PAR; the [etymon](${etimo}) **cuts**.

The [disease](${WIKI_DOENCA}) is fact and eponym — **not** the center of this word, **not** a ride, **not** a feast. Person sheet: [Michael J. Fox](${fox}). Clinic: [UNIFESP class 13](${unifesp13}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemParkinsonEn()}
\`\`\`

**Verdict:** son of Parkin (Peter) ≠ amusement park ≠ party. Relate = label the gap. [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Amusement park](${HREF_Q}) · [▶ Party](${HREF_Y}) · [▶ JSON](${HREF_J}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Parkinson](${HREF_P})** — el **apellido** que viró **epónimo**. Pedido: *relacionar con parque de diversiones*; *cruzar también party (paRTY)*.

Étimo: **Parkin** + **-son** (Parkin = Pedro). [Parque de diversiones](${HREF_Q}) (*parc* / *parricus*) es **otro abuelo**. [Party](${HREF_Y}) (*partire*) es **otro**. El oído lee PARK / PAR; el [étimo](${etimo}) **corta**.

La [enfermedad](${WIKI_DOENCA}) es hecho y epónimo — **no** el centro, **no** un juego, **no** fiesta. Persona: [Michael J. Fox](${fox}). Clínica: [UNIFESP aula 13](${unifesp13}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemParkinsonEs()}
\`\`\`

**Veredicto:** hijo de Parkin (Pedro) ≠ parque de diversiones ≠ party. Relacionar = etiquetar el entre. [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Parque](${HREF_Q}) · [▶ Party](${HREF_Y}) · [▶ JSON](${HREF_J}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildParqueBodies() {
  const inspected = '2026-08-25';
  const body = `## Escopo

Inspeção editorial do composto **[parque de diversões](${HREF_Q})** — o **recinto da festa escolhida**. ${sharedNote()}

Objecto = o **sintagma** *parque de diversões* (EN *amusement park* / *theme park*). Primeira peça: **parque** ← fr. *parc* ← lat. tardio *parricus* (cercado). Segunda: **diversões** ← *diversão* ← lat. *dīvertere* («desviar»). Par de ofício: **[Parkinson](${HREF_P})** (cola *PARK*, étimo outro) e **[party](${HREF_Y})** (a festa pode **entrar** no recinto; não **é** o recinto).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · parque](${WIKT_PARQUE}), EN [park](${WIKT_PARK}), [Parque de diversões](${WIKI_PARQUE}). **Ficha ≠ guia de parques, ≠ ranking de montanha-russa, ≠ metáfora da doença de Parkinson.** Tom: [alegria](${alegria}) escolhida; [respeito](${respeito}) ao corpo que não pediu tremor. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *parque de diversões* / *parque de diversao* / *amusement park* / *theme park* / *parque temático* / *parque de atrações*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **parque de diversões** |
| Irmãs | **parque temático** · EN **amusement park** · **theme park** · **funfair** / feira |
| Peças | *parque* (recinto) + *de* + *diversões* (festa / desvio alegre) |
| Étimo (trabalho) | *parque* ← fr. *parc* ← lat. tard. *parricus* «cercado» · *diversão* ← *dīvertere* — confiança: **alta** |
| Tipo BudGanja | Palavra — recinto de [alegria](${alegria}) **escolhida** |
| Não é | [Parkinson](${HREF_P}) · jardim público *tout court* · [party](${HREF_Y}) (evento) · marca de parque |
| Elo cruzado | [Parkinson](${HREF_P}) (orelha *PARK*) · [party](${HREF_Y}) (festa no recinto) |
| Fonte | [parque de diversões](${WIKI_PARQUE}) |
| Data | ${inspected} |

**O que é o objecto:** o **lugar** onde o movimento se compra com bilhete. Não é o apelido. Não é o tremor.

## 2. Hipóteses e método

**H1:** *parque de diversões* = recinto + diversão escolhida — alta.  
**H2:** *parque* e EN *park* partilham *parc* / *parricus* — alta.  
**H3:** o *Park-* de [Parkinson](${HREF_P}) **não** herda este recinto — alta.  
**H4:** [party](${HREF_Y}) pode **ocorrer** no parque; o étimo de *party* é *partire*, não *parricus* — alta.  
**H5:** jardim / parque urbano é **vizinho** (mesmo *parque*); o composto desta ficha puxa a **atração** — alta.  
**H6:** fecho = [Valeu !!!](${mantra}).

## 3. Duas peças

| Peça | Avô | Ofício aqui |
|------|-----|-------------|
| **parque** | *parc* / *parricus* — cercado, depois jardim público, depois recinto temático | O chão |
| **diversões** | *dīvertere* — desviar; daí *diversão* = [alegria](${alegria}) que tira do caminho sério | O programa |
| **de** | Relação | O entre |

**H-bilhete:** a roda, o tremor do carrinho, a queda — são **gestos comprados**. Sem bilhete, não há esta palavra.

## 4. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Parkinson** contém *park* | O apelido nasceu no parque | [Parkinson](${HREF_P}) = filho de Parkin (Pedro) |
| **parque** = [party](${HREF_Y}) | O lugar é a festa | Lugar × evento (*partire*) |
| **diversão** = doença | «O corpo faz um parque» | **Mau.** Diversão é desvio **pedido**; o epónimo não é atração |
| **parque** = só jardim | Só relva | Jardim é vizinho; esta ficha ancora a **atração** |

**Veredicto:** relacionar [Parkinson](${HREF_P}) com este recinto **nomeia a cola**. Não transmite o apelido à bilheteira.

## 5. Party no recinto

Pedido irmão: cruzar **[party](${HREF_Y})**. Uma *party* **cabe** no parque de diversões (festa de aniversário, evento noturno, *park party*). Isso é **uso** (festa no lugar). Não é **sangue** (*parricus* ≠ *partire*).

| Colocação | Leitura |
|-----------|---------|
| *festa no parque* | PT nativo — [alegria](${alegria}) no recinto |
| *park party* / *party no parque* | Empréstimo + lugar |
| *Parkinson's party* | **Não** é colocação desta ficha |

## 6. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Parkinson](${HREF_P})** | Apelido — cola *PARK* recusada como étimo |
| **[Party](${HREF_Y})** | Evento que pode entrar; avô *partire* |
| [Alegria](${alegria}) · [gesto](${gesto}) | Festa escolhida × movimento comprado |
| [Boston](${boston}) | Irmã de método; Tea Party ≠ este recinto |
| [Guia](${guia}) · [hub](${hub}) | Catálogo |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) | Fecho |

## 7. O poema

\`\`\`poem
${poemParquePt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=parque-de-diversoes)

## Limites

- Não inventaria marcas, bilhetes nem normas de segurança.  
- Não funde jardim público e parque temático além do corte.  
- Não usa a roda como metáfora da doença.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **parque de diversões** fichado como recinto (*parricus*) + diversão (*dīvertere*); cola com [Parkinson](${HREF_P}) recusada; [party](${HREF_Y}) como evento no lugar, não como étimo.

[▶ Palavras](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Party](${HREF_Y}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **parque de diversões** — **amusement park**. Pieces: *parque* ← *parc* / *parricus* (enclosure) + *diversões* ← *dīvertere*. Field: relate to **[Parkinson](${HREF_P})** (ear reads PARK; etymon is Peter) and cross **[party](${HREF_Y})** (a party may happen here; it is not this place).

The ride’s shake is **chosen**. It is not the eponym. Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemParqueEn()}
\`\`\`

[▶ Words](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Party](${HREF_Y}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **parque de diversões** — recinto de la fiesta elegida. *Parque* ← *parc* / *parricus*; *diversões* ← *dīvertere*. Relación: **[Parkinson](${HREF_P})** (el oído lee PARK; el étimo es Pedro). Cruce: **[party](${HREF_Y})** (puede entrar; no es el recinto).

La rueda se elige. El epónimo no es un juego. Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemParqueEs()}
\`\`\`

[▶ Palabras](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Party](${HREF_Y}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildPartyBodies() {
  const inspected = '2026-08-25';
  const body = `## Escopo

Inspeção editorial da palavra **[party](${HREF_Y})** — empréstimo inglês vivo no Brasil para **festa / reunião**. Pedido de campo: *palavra paRTY também cruzar* (no mesmo sopro de [Parkinson](${HREF_P}) × [parque de diversões](${HREF_Q})).

Objecto = o vocábulo EN **party** (grafia de campo **paRTY**). Étimo de trabalho: antigo francês *partie* ← lat. *partīre* / *partiō* («partir, dividir, partilhar»). **Não** é [Parkinson](${HREF_P}). **Não** é o [parque](${HREF_Q}). A festa **pode** acontecer no recinto; o avô **não** é o recinto.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · party](${WIKT_PARTY}), lat. [*partiō*](${WIKT_PARTIRE}). **Ficha ≠ manual de evento, ≠ partido político completo, ≠ Tea Party como étimo deste lema.** Corte: PT **festa** ← lat. *festum* — **tradução viva, avô outro**. Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

**Gatilho:** *party* / *paRTY* / *PARTY* / *parties* / *park party* / *festa*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **party** (EN; empréstimo BR) |
| Gatilho de campo | **paRTY** (calor gráfico) |
| Classe | Substantivo (também verbo EN *to party*) |
| Étimo (trabalho) | OF *partie* ← lat. *partīre* «partir / partilhar» — confiança: **alta** |
| Andares vivos | **A.** festa / celebração · **B.** grupo de pessoas · **C.** partido político · **D.** verbo *to party* |
| Tipo BudGanja | Palavra — empréstimo de festa × cola *PAR-* |
| Não é | [Parkinson](${HREF_P}) · [parque de diversões](${HREF_Q}) · *festa* (avô *festum*) · Boston Tea Party (sala [Boston](${boston})) |
| Fonte | [party](${WIKT_PARTY}) |
| Data | ${inspected} |

**O que é o objecto:** a **parte que se junta**. Da partilha nasce a reunião; da reunião, no BR, a festa emprestada.

## 2. Hipóteses e método

**H1:** *party* ← *partie* ← *partīre* — alta.  
**H2:** *festa* (lat. *festum*) traduz o andar A; **não** é o étimo — alta.  
**H3:** *PAR-* partilhado com *park* / [Parkinson](${HREF_P}) é cola de orelha — alta.  
**H4:** [parque de diversões](${HREF_Q}) **hospeda** party; não **gera** party como avô — alta.  
**H5:** partido político e Tea Party são **andares / salas**, não o étimo do apelido Parkinson — alta.  
**H6:** fecho = [Valeu !!!](${mantra}).

## 3. Andares (não misturar)

| Andar | Leitura | Corte |
|-------|---------|-------|
| **A. Festa** | Celebração; o uso BR mais pedido | ≠ *festum* (avô da palavra *festa*) |
| **B. Grupo** | Uma *party* de viajantes / de pesquisa | ≠ recinto |
| **C. Partido** | *political party* | Outra sala; não esta ficha a esgotar |
| **D. Verbo** | *to party* = festejar | Gesto; [alegria](${alegria}) |
| **Tea Party 1773** | Nome histórico em [Boston](${boston}) | Política colonial; ≠ apelido Parkinson |

## 4. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **paRTY** | Outra palavra | O mesmo lema com calor (*TEologigiA* de método) |
| **party** ≈ **park** | Irmãs de sangue | *partīre* × *parricus* — **dois** avôs |
| **party** ≈ **Parkinson** | O apelido é uma festa | [Parkinson](${HREF_P}) = Parkin (Pedro) + *-son* |
| **park party** | Uma só peça | Colocação: [festa](${HREF_Y}) **no** [recinto](${HREF_Q}) |
| **festa** = **party** | O mesmo étimo | Tradução; *festum* ≠ *partīre* |

**Veredicto:** cruzar *paRTY* com Parkinson e com o parque **etiqueta o PAR- visível**. O lab **não** funde Pedro, recinto e partilha.

## 5. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Parkinson](${HREF_P})** | Apelido — cola *PAR-* recusada |
| **[Parque de diversões](${HREF_Q})** | Recinto que pode hospedar a festa |
| [Alegria](${alegria}) · [gesto](${gesto}) | Andar da celebração |
| [Boston](${boston}) | Tea Party — sala histórica, não este étimo |
| [Trocadilho](${trocadilho}) · [orelha cola](${orelha}) · [etimologia](${etimologia}) | Método |
| [Valeu !!!](${mantra}) · [eu amo a vida](${amo}) | Fecho |

## 6. O poema

\`\`\`poem
${poemPartyPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=party)

## Limites

- Não é produção de evento nem história dos partidos.  
- Tea Party fica na ficha [Boston](${boston}) se a boca trouxe o chá.  
- Não cola festa no tremor.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **party** fichada como *partie* ← *partīre*; gatilho *paRTY*; cortes [Parkinson](${HREF_P}) e [parque de diversões](${HREF_Q}) (cola, não sangue); *festa* como tradução (*festum*).

[▶ Palavras](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Parque de diversões](${HREF_Q}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of English **party** as a Brazilian loan — feast / gathering. Field spelling **paRTY**. Etymon: OF *partie* ← Lat. *partīre* (“to divide, to share”). Cross: **[Parkinson](${HREF_P})** (Parkin = Peter) and **[parque de diversões](${HREF_Q})** (enclosure). Shared letters PAR- are ear-glue, not blood. PT *festa* (*festum*) translates sense A; it is not this etymon.

\`\`\`poem
${poemPartyEn()}
\`\`\`

[▶ Words](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Amusement park](${HREF_Q}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **party** como préstamo en Brasil — fiesta / reunión. Grafía de campo **paRTY**. Étimo: OF *partie* ← lat. *partīre*. Cruce: **[Parkinson](${HREF_P})** y **[parque de diversões](${HREF_Q})**. Las letras PAR- son cola de oído. PT *festa* (*festum*) traduce; no es este étimo.

\`\`\`poem
${poemPartyEs()}
\`\`\`

[▶ Palabras](${hub}) · [▶ Parkinson](${HREF_P}) · [▶ Parque](${HREF_Q}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function stamp(post, cover, sourceUrl) {
  post.coverImage = cover;
  post.sourceUrl = sourceUrl;
  post.content_raw = post.content_raw || post.body;
  return post;
}

function buildParkinsonPost() {
  const { body, contentEn, contentEs } = buildParkinsonBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Parkinson — Parkin + son (Pedro); ≠ parque ≠ party',
      titleEn: 'Inspection: Parkinson — Parkin + son (Peter); ≠ park ≠ party',
      titleEs: 'Inspección: Parkinson — Parkin + son (Pedro); ≠ parque ≠ party',
      excerpt:
        'Palavras: Parkinson = Parkin + -son (Pedro); cola PARK com parque de diversões e PAR com party recusada; epónimo facto, não centro; Valeu !!!',
      excerptEn:
        'Words: Parkinson = Parkin + -son (Peter); PARK/PAR ear-glue to amusement park and party refused; eponym as fact, not center; Valeu !!!',
      excerptEs:
        'Palabras: Parkinson = Parkin + -son (Pedro); cola PARK/PAR con parque y party rechazada; epónimo como hecho, no centro; ¡Valeu !!!',
      slug: 'inspecao-palavra-parkinson',
      date: '2026-08-25T09:30:00.000Z',
      seriesOrder: pickOrder('inspecao-palavra-parkinson', 341),
      seriesLabel: 'Parkinson · Parkin-son',
      coverImage: COVER_P,
      sourceUrl: WIKT_PARKINSON,
      body,
      contentEn,
      contentEs
    }),
    COVER_P,
    WIKT_PARKINSON
  );
}

function buildParquePost() {
  const { body, contentEn, contentEs } = buildParqueBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Parque de diversões — recinto da festa escolhida; ≠ Parkinson',
      titleEn: 'Inspection: Parque de diversões — enclosure of chosen fun; ≠ Parkinson',
      titleEs: 'Inspección: Parque de diversões — recinto de la fiesta elegida; ≠ Parkinson',
      excerpt:
        'Palavras: parque de diversões = parc/parricus + diversão (dīvertere); cola PARK com Parkinson recusada; party pode entrar, não é o recinto; Valeu !!!',
      excerptEn:
        'Words: amusement park = parc/parricus + diversion; PARK glue to Parkinson refused; party may enter, is not the enclosure; Valeu !!!',
      excerptEs:
        'Palabras: parque de diversiones = parc/parricus + diversión; cola PARK con Parkinson rechazada; party puede entrar, no es el recinto; ¡Valeu !!!',
      slug: 'inspecao-palavra-parque-de-diversoes',
      date: '2026-08-25T09:31:00.000Z',
      seriesOrder: pickOrder('inspecao-palavra-parque-de-diversoes', 342),
      seriesLabel: 'Parque de diversões',
      coverImage: COVER_Q,
      sourceUrl: WIKI_PARQUE,
      body,
      contentEn,
      contentEs
    }),
    COVER_Q,
    WIKI_PARQUE
  );
}

function buildPartyPost() {
  const { body, contentEn, contentEs } = buildPartyBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Party — partie / partire; paRTY; ≠ Parkinson ≠ parque',
      titleEn: 'Inspection: Party — partie / partire; paRTY; ≠ Parkinson ≠ park',
      titleEs: 'Inspección: Party — partie / partire; paRTY; ≠ Parkinson ≠ parque',
      excerpt:
        'Palavras: party ← partie ← partire; gatilho paRTY; cola PAR com Parkinson e park recusada; festa (festum) traduz, não herda; Valeu !!!',
      excerptEn:
        'Words: party ← partie ← partire; trigger paRTY; PAR glue to Parkinson and park refused; festa (festum) translates, does not inherit; Valeu !!!',
      excerptEs:
        'Palabras: party ← partie ← partire; gatillo paRTY; cola PAR con Parkinson y park rechazada; festa (festum) traduce, no hereda; ¡Valeu !!!',
      slug: 'inspecao-palavra-party',
      date: '2026-08-25T09:32:00.000Z',
      seriesOrder: pickOrder('inspecao-palavra-party', 343),
      seriesLabel: 'Party · paRTY',
      coverImage: COVER_Y,
      sourceUrl: WIKT_PARTY,
      body,
      contentEn,
      contentEs
    }),
    COVER_Y,
    WIKT_PARTY
  );
}

module.exports = {
  buildParkinsonPost,
  buildParquePost,
  buildPartyPost,
  poemParkinsonPt,
  poemParkinsonEn,
  poemParkinsonEs,
  poemParquePt,
  poemParqueEn,
  poemParqueEs,
  poemPartyPt,
  poemPartyEn,
  poemPartyEs,
  HREF_P,
  HREF_Q,
  HREF_Y,
  HREF_J,
  COVER_P,
  COVER_Q,
  COVER_Y,
  WIKT_PARKINSON,
  WIKI_PARQUE,
  WIKT_PARTY
};
