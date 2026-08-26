'use strict';

/**
 * Inspeção Expressões · perda total
 * Pedidos de campo: Perda Toral · PT · usaul · animal Lula · urna eleitoral.
 * Locução de seguro / sinistro; não é slogan político.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/perda-total-cover.jpg';
const WIKT_PERDA = 'https://pt.wiktionary.org/wiki/perda';
const WIKT_TOTAL = 'https://pt.wiktionary.org/wiki/total';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `O usual amassa o pára-choques.
A perda total baixa o bem.

Toral comeu um t.
PT não é esta sigla.
Lula no mar é cefalópode.
A urna não é o pátio do seguro.

Valeu !!!
com a conta fechada no contrato,
sem transformar pessoa em sucata.`;
}

function poemEn() {
  return `The usual dents the bumper.
Total loss writes the goods off.

Toral ate a t.
PT is not this acronym.
Lula in the sea is a squid.
The ballot box is not the insurance yard.

Valeu !!!
with the account closed in the policy,
without turning a person into scrap.`;
}

function poemEs() {
  return `Lo usual abolla el parachoques.
La pérdida total da de baja el bien.

Toral se comió una t.
PT no es esta sigla.
Lula en el mar es un calamar.
La urna no es el patio del seguro.

¡Valeu !!!
con la cuenta cerrada en la póliza,
sin volver a una persona chatarra.`;
}

function buildPerdaTotalBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-perda-total.html';
  const total = '/posts/post-inspecao-palavra-total.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const objeto = '/posts/post-inspecao-palavra-objetos.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const peixe = '/posts/post-inspecao-animal-peixe-tilapia.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da locução **«[perda total](${self})»** — no português do Brasil, sobretudo no **seguro** e no **sinistro**: o bem (quase sempre um veículo) cuja reparação, segundo a **apólice**, já não compensaria. Pedidos de campo: *Perda Toral* (o **t**), *PT*, *usaul* → **usual**, *animal Lula*, *urna eleitoral* / *Eleitroral*. Esta ficha cobre a **locução**, o contraste com o **usual**, e os **cortes** de orelha — sem transformar pessoa nem voto em sucata.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · perda](${WIKT_PERDA}), [total](${WIKT_TOTAL}), ficha-irmã [total](${total}). **Ficha ≠ parecer de seguradora, ≠ tutorial de fraude, ≠ campanha, ≠ ataque a pessoa.** Percentagens de «baixa» **variam** com o contrato — confirmar na apólice, não nesta página. Sem afiliação a seguradoras nem a partidos. Tom: [Faça o seu melhor](${faca}) na conta, não no slogan.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **perda total** |
| Lapso | *perda toral* · *Eleitroral* · *usaul* |
| Classe | Locução (seguro / sinistro / hiperbolia oral) |
| Peças | **perda** (lat. *perdere*) + **[total](${total})** (lat. *tōtus*) |
| Núcleo | O [objeto](${objeto}) **não vale a pena reparar** segundo a regra da apólice |
| Tipo BudGanja | Expressão — conta de dano × [legal](${legal}) do contrato |
| O que **não** é | Gíria «total!» · sigla **PT** (partido) · urna de voto · insulto a pessoa |
| Elo | [total](${total}) · [risco](${risco}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Fonte | [perda](${WIKT_PERDA}) · [total](${WIKT_TOTAL}) |
| Data | ${inspected} |

**Objecto:** o **fecho da conta do bem**. No lab: nomear o sinistro; não baixar um nome próprio.

## 2. Relação pedida (não fundir)

| Pedido de campo | Sala | Relação |
|-----------------|------|---------|
| **Perda Toral** | Esta locução | *Toral* = *Total* com o **t** comido |
| **usual** (*usaul*) | Contraste | O **usual** é o amassado do dia; perda total é a **baixa** |
| **PT** | Corte | **Partido dos Trabalhadores** (e, noutra mesa, português *PT*) — **não** é abreviatura desta locução |
| **animal Lula** | Corte | **Lula** no mar = cefalópode (irmã de [animal](${animal}) / [peixe](${peixe})); o **apelido** político é outra pessoa — **≠** sinistro |
| **urna eleitoral** | Corte | Caixa de **voto** (TSE / urna eletrónica BR) — **≠** pátio do seguro; ficha ≠ tutorial de fraude |
| **[total](${total})** | Irmã | Palavra do inteiro / «total!» de acordo; aqui o **total** é o dano |
| **[Faça o seu melhor](${faca})** | Fecho | Depois do sinistro, o ofício — não a pose |

**H1:** *perda total* herda [total](${total}) como **completude do dano**, não como elogio «total!».  
**H2:** *usual* marca o **quotidiano**; perda total marca a **excepção contratual**.  
**H3:** colar a locução a **PT**, a **Lula** ou à **urna** como slogan é falha de [verdade](${verdade}) — orelha, não étimo.  
**H4:** chamar pessoa de «perda total» sem [respeito](${respeito}) é xingamento, não inspeção.

## 3. Usual × perda total

| | **Usual** | **Perda total** |
|--|-----------|-----------------|
| Dano | O de sempre: amassado, arranhão | O bem, na regra da apólice, **não se repara** |
| Tom | Quotidiano | Fecho / baixa |
| Lab | Nomear o hábito | Nomear o limite do contrato |
| Mau uso | «Sempre foi assim» a tapar [risco](${risco}) | Absolutizar uma vida ou um voto |

**Usual** (lat. *usualis* «de uso») não precisa de ficha-irmã para este contraste: aqui entra como **o que não chega a total**.

## 4. O que parece × o que é

| Parece | É |
|--------|---|
| Sigla PT | Partido **ou** língua; **não** «perda total» abreviado |
| Baixa de um político | Outra sala (pessoa / urna); aqui é o **bem segurado** |
| Animal Lula = sucata | Lula-molusco ≠ apelido ≠ sinistro |
| Urna «deu perda total» | Metáfora de campanha — **corte**; sem procedimento de voto |
| «Total!» de acordo | Ficha [total](${total}) — outro ofício da mesma palavra |
| Receita para «ganhar» o seguro | **Não** — [risco](${risco}) de fraude |

## 5. Limites

- Não ensinamos a simular sinistro nem a contestar apólice.  
- Não transformamos esta ficha em urna, em partido nem em biografia.  
- Percentagem de baixa: **ler o contrato**.  
- Hiperbolia oral («foi perda total») inspeccionar: é conta ou é grito?

\`\`\`poem
${poemPt()}
\`\`\`

## Veredicto

**Aprovado** na série Expressões — **perda total** = o [total](${total}) do **dano no bem**, distinto do **usual**, da sigla **PT**, da **urna** e do **animal / apelido Lula**. Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) **com a conta no contrato**, sem baixar gente.

[▶ Expressões](${hub}) · [▶ Total](${total}) · [▶ Legal](${legal}) · [▶ Faça o seu melhor](${faca}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian locution **«[perda total](${self})»** — insurance **total loss**. Field slips: *Perda Toral*, *PT*, *usaul* → **usual**, *animal Lula*, *urna eleitoral*. **Not** a party slogan, a person, or a ballot box.

> Independent audit. Sister word: [total](${total}). **Not** an insurer’s opinion or a fraud guide.

## Object

| Field | Value |
|-------|-------|
| Saying | **perda total** |
| Pieces | *perda* + [total](${total}) |
| Lab | The goods are written off under the policy |
| Not | PT (Workers’ Party) · squid/politician Lula · voting machine |
| Date | ${inspected} |

**H1:** total loss ≠ slang “total!”.  
**H2:** **usual** = everyday ding; this locution = write-off.  
**H3:** gluing it to a person or a ballot is ear, not method.

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** account on the contract. [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra})

[▶ Sayings](${hub}) · [▶ Total](${total}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Locución BR **«[perda total](${self})»** — **pérdida total** del seguro. Lapsos: *Perda Toral*, *PT*, *usaul* → **usual**, *animal Lula*, *urna eleitoral*. **No** es eslogan de partido ni urna de voto.

> Auditoría independiente. Hermana: [total](${total}). **No** es dictamen de aseguradora.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **perda total** |
| Piezas | *perda* + [total](${total}) |
| Lab | El bien se da de baja según la póliza |
| No es | PT (partido) · calamar/apodo Lula · urna electoral |
| Fecha | ${inspected} |

**H1:** pérdida total ≠ jerga «¡total!».  
**H2:** **usual** = abollón de todos los días.  
**H3:** pegarlo a una persona o a una urna es oído, no método.

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** cuenta en el contrato. [Faça o seu melhor](${faca}) · [¡Valeu !!!](${mantra})

[▶ Expresiones](${hub}) · [▶ Total](${total}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_PERDA };
}

function buildPerdaTotalPost() {
  const { body, contentEn, contentEs, wiki } = buildPerdaTotalBodies();
  return expressaoPost({
    title: 'Inspeção: Perda total — a baixa do bem, não da pessoa',
    titleEn: 'Inspection: Perda total — writing off the goods, not the person',
    titleEs: 'Inspección: Perda total — la baja del bien, no de la persona',
    excerpt:
      'Expressões: perda total — sinistro / baixa do bem; Toral = o t; usual ≠ PT ≠ urna ≠ Lula; Valeu !!!',
    excerptEn:
      'Sayings: perda total — insurance write-off; Toral = missing t; usual ≠ PT ≠ ballot ≠ Lula; Valeu !!!',
    excerptEs:
      'Dichos: perda total — baja del seguro; Toral = la t; usual ≠ PT ≠ urna ≠ Lula; ¡Valeu !!!',
    slug: 'inspecao-expressao-perda-total',
    date: '2026-08-23T15:40:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-perda-total', 33),
    seriesLabel: 'Perda total · sinistro',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildPerdaTotalPost, buildPerdaTotalBodies };
