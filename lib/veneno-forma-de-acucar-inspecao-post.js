'use strict';

/**
 * Expressões · «O veneno é forma de açúcar»
 * Poema-método: a planta não é vilã; o veneno é a forma (refino, açúcar livre, prateleira).
 * Consumido por scripts/upsert-expressao-veneno-forma-de-acucar.js
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemVenenoFormaDeAcucarPt() {
  return `O veneno é forma de açúcar.

Não a cana no campo —
o caule ainda doce de ofício,
o caldo que a mão conhece.

O veneno é o pó branco
que já não lembra a planta.
É a forma que esconde a origem,
o cristal que cabe em tudo
e não avisa a dose.

Dizem que o doce é vilão.
Mentira antiga.
Vilão é o disfarce:
açúcar livre na prateleira,
matriz que entra sem nome,
gota que vira rio
porque a fábrica não conta.

Há um açúcar de talo.
Há outro de esteira.
O primeiro ainda é terra.
O segundo já é veneno
sem parecer veneno —
porque veio com gosto de festa.

O laboratório não queima a cana.
Separa a forma.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
dose.

Faça o melhor!

Porque todo doce que ainda lembra a planta
cresce um pouco no mapa:
uma raiz a mais,
um aviso a mais,
um nós onde antes só havia
açúcar sem origem.`;
}

function poemVenenoFormaDeAcucarEn() {
  return `Poison is a form of sugar.

Not the cane in the field —
the stem still sweet with craft,
the juice the hand knows.

The poison is the white powder
that no longer remembers the plant.
It is the form that hides the origin,
the crystal that fits in everything
and does not warn the dose.

They say sweetness is the villain.
Old lie.
The villain is the disguise:
free sugar on the shelf,
a matrix that enters without a name,
a drop that becomes a river
because the factory does not count.

There is a sugar of the stalk.
There is another of the belt.
The first is still earth.
The second is already poison
without looking like poison —
because it arrived tasting like a feast.

The laboratory does not burn the cane.
It separates the form.
It counts drops.
It calls Vida by its true name:
dose.

Do your best!

Because every sweetness that still remembers the plant
grows a little on the map:
one more root,
one more warning,
a we where once there was only
sugar without origin.`;
}

function poemVenenoFormaDeAcucarEs() {
  return `El veneno es forma de azúcar.

No la caña en el campo —
el tallo aún dulce de oficio,
el jugo que la mano conoce.

El veneno es el polvo blanco
que ya no recuerda la planta.
Es la forma que esconde el origen,
el cristal que cabe en todo
y no avisa la dosis.

Dicen que lo dulce es villano.
Mentira antigua.
Villano es el disfraz:
azúcar libre en el estante,
matriz que entra sin nombre,
gota que vira río
porque la fábrica no cuenta.

Hay un azúcar de tallo.
Hay otro de cinta.
El primero aún es tierra.
El segundo ya es veneno
sin parecer veneno —
porque llegó con gusto de fiesta.

El laboratorio no quema la caña.
Separa la forma.
Cuenta gotas.
Llama a la Vida por su nombre verdadero:
dosis.

¡Haz lo mejor!

Porque todo dulce que aún recuerda la planta
crece un poco en el mapa:
una raíz más,
un aviso más,
un nosotros donde antes solo había
azúcar sin origen.`;
}

function buildVenenoFormaDeAcucarBodies() {
  const inspected = '2026-09-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-veneno-forma-de-acucar.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const who = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const leite = '/posts/post-inspecao-derivado-leite.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const plantas = '/plantas/';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poema = poemVenenoFormaDeAcucarPt();
  const poemaEn = poemVenenoFormaDeAcucarEn();
  const poemaEs = poemVenenoFormaDeAcucarEs();

  const body = `## Escopo

Inspeção editorial da frase-método **«[o veneno é forma de açúcar](${self})»**. O laboratório **não** diz que o doce é crime nem que a [cana](${cana}) é vilã. Diz o contrário da boca rápida: o **veneno** aqui é a **forma** — o pó que já não lembra o talo, o [açúcar livre](${who}) que entra na [matriz ultraprocessada](${hall}) sem avisar a dose.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem nutricional.** A planta **não** é o vilão. Sem receita, sem protocolo de desintoxicação, sem dieta prescrita. Conteúdo educacional. O [veneno](${vinganca}) afectivo da vingança e o [Venom](${venom}) de ecrã são **outras fichas**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **O veneno é forma de açúcar** |
| Tipo | Expressão-método — poema do laboratório |
| Núcleo | Forma · [açúcar](${cana}) · [dose](${who}) · origem × prateleira |
| Elo planta | [Cana-de-açúcar](${cana}) — resgatar a espécie, inspecionar o refino |
| Elo saúde pública | [OMS açúcares livres (2015)](${who}) · [Hall ultraprocessados (2019)](${hall}) |
| Elos de gôndola | [Chocolate](${chocolate}) · [glúten](${gluten}) · [leite](${leite}) · [caseína](${caseina}) |
| Elo poder | [Como os ricos transformam as coisas](${ricos}) |
| Data | ${inspected} |

## O que a boca não deve colar

| Cola | Corte do laboratório |
|------|----------------------|
| «Açúcar = veneno» | Apaga a [planta](${plantas}) e o ofício. O objecto é a **forma**. |
| «A cana é o crime» | A cana é gramínea. O desvio é **refino + dose + matriz**. |
| «Zero doce para sempre» | Não é esta ficha. Sem dieta prescrita. |
| Veneno = toxina de planta | Aqui **veneno** é metáfora de **forma industrial**, não alcalóide. |

**H1:** o veneno desta frase é a **forma** (cristal branco, açúcar livre, prateleira), não o talo.  
**H2:** a [cana](${cana}) pede resgate botânico — igual aos outros derivados: origem ≠ fábrica.  
**H3:** a evidência de dano populacional discute-se em [açúcares livres](${who}) e [ultraprocessados](${hall}), noutro eixo da poesia.  
**H4:** [quem empacota](${ricos}) transforma o talo em gosto que não conta gotas.

## O poema

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=veneno-forma-de-acucar)

## Limites

- Não confundir esta frase com a ficha [Venom](${venom}) nem com [a vingança envenena](${vinganca}).  
- Não transformar o poema em proibição do caldo, da fruta ou da festa.  
- Não é aconselhamento médico. Dose e pessoa ficam com quem cuida — o laboratório inspeciona a **forma**.  
- O poema é **criação do laboratório**.

## Veredicto

**Aprovado na série Expressões e Ditados** — poema-método: o veneno é a forma; a cana permanece planta. [Faça o melhor!](${mantra})

[▶ Expressões](${hub}) · [▶ Poema Vida](${vida}#poema=veneno-forma-de-acucar) · [▶ Cana](${cana}) · [▶ OMS 2015](${who}) · [▶ Hall 2019](${hall}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the lab phrase **“poison is a form of sugar”**. The lab does **not** call sweetness a crime or the [cane](${cana}) a villain. The **poison** here is the **form** — the powder that no longer remembers the stalk, [free sugar](${who}) inside an [ultra-processed matrix](${hall}) that does not warn the dose.

> **Method note:** independent BudGanja audit. **Not medical or nutritional advice.** The plant is not the villain. No recipe, no detox protocol, no prescribed diet.

## The poem

\`\`\`poem
${poemaEn}
\`\`\`

[▶ Read on Vida](${vida}#poema=veneno-forma-de-acucar)

## Limits

This is not the [Venom](${venom}) sheet and not [revenge poisons the soul](${vinganca}). The poem is lab-made. [Do your best!](${mantra})

[Sayings](${hub}) · [Cane](${cana}) · [WHO 2015](${who}) · [Hall 2019](${hall})
`;

  const contentEs = `## Alcance

Inspección de la frase-método **«el veneno es forma de azúcar»**. El laboratorio **no** dice que lo dulce sea crimen ni que la [caña](${cana}) sea villana. El **veneno** aquí es la **forma** — el polvo que ya no recuerda el tallo, el [azúcar libre](${who}) en la [matriz ultraprocesada](${hall}) que no avisa la dosis.

> **Nota metodológica:** auditoría independiente. **No es consejo médico ni nutricional.** La planta no es villana. Sin receta ni dieta prescrita.

## El poema

\`\`\`poem
${poemaEs}
\`\`\`

[▶ Leer en Vida](${vida}#poema=veneno-forma-de-acucar)

## Límites

No es la ficha [Venom](${venom}) ni [la venganza envenena](${vinganca}). El poema es del laboratorio. [¡Haz lo mejor!](${mantra})

[Expresiones](${hub}) · [Caña](${cana}) · [OMS 2015](${who}) · [Hall 2019](${hall})
`;

  return { body, contentEn, contentEs };
}

function buildVenenoFormaDeAcucarPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildVenenoFormaDeAcucarBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 1;
  return expressaoPost({
    title: 'Inspeção: O veneno é forma de açúcar',
    titleEn: 'Inspection: Poison is a form of sugar',
    titleEs: 'Inspección: El veneno es forma de azúcar',
    excerpt:
      'Poema-método: a cana não é vilã. O veneno é a forma — pó branco, açúcar livre, prateleira. Não é dieta prescrita.',
    excerptEn:
      'Method poem: the cane is not the villain. Poison is the form — white powder, free sugar, the shelf. Not a prescribed diet.',
    excerptEs:
      'Poema-método: la caña no es villana. El veneno es la forma — polvo blanco, azúcar libre, estante. No es dieta prescrita.',
    slug: 'inspecao-expressao-veneno-forma-de-acucar',
    date: '2026-09-19T18:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'O veneno é forma de açúcar · Expressão',
    coverImage: '/imagens/inspecoes/veneno-forma-de-acucar-cover.jpg',
    sourceUrl: '/posts/post-inspecao-derivado-cana-de-acucar.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  poemVenenoFormaDeAcucarPt,
  poemVenenoFormaDeAcucarEn,
  poemVenenoFormaDeAcucarEs,
  buildVenenoFormaDeAcucarPost,
  buildVenenoFormaDeAcucarBodies
};
