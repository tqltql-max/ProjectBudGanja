'use strict';

/**
 * Inspeção Expressões · desatar o nó
 * Ditado BR — soltar o laço; ofício antes/depois do desastre.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemDesatarONoPt() {
  return `A corda não pede sermão.
Pede o fio certo.
O nó não se ofende
quando a mão inspeciona
em vez de puxar cego.

Desatar não é desastre.
Desastre é a má estrela —
outro avô, outro céu.
Aqui o ofício é chão:
achar a volta,
soltar sem cortar a vida.

Ufa é o ar que sai
quando o laço cede.
Legal é o sorriso, se couber.
Valeu !!!
com o nó ainda quente —
hoje, neste resto de corda.`;
}

function poemDesatarONoEn() {
  return `The rope does not ask for a sermon.
It asks for the right thread.
The knot is not offended
when the hand inspects
instead of pulling blind.

Untying is not disaster.
Disaster is the ill star —
another ancestor, another sky.
Here the craft is ground:
find the turn,
loosen without cutting life.

Phew is the air that leaves
when the loop yields.
Cool is the smile, if it fits.
Valeu !!!
with the knot still warm —
today, on this remaining rope.`;
}

function poemDesatarONoEs() {
  return `La cuerda no pide sermón.
Pide el hilo cierto.
El nudo no se ofende
cuando la mano inspecciona
en vez de tirar a ciegas.

Desatar no es desastre.
Desastre es la mala estrella —
otro abuelo, otro cielo.
Aquí el oficio es suelo:
hallar la vuelta,
soltar sin cortar la vida.

Ufa es el aire que sale
cuando el lazo cede.
Legal es la sonrisa, si cabe.
Valeu !!!
con el nudo aún caliente —
hoy, en este resto de cuerda.`;
}

function buildDesatarONoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const noVida = '/posts/post-inspecao-expressao-no-na-vida.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const trilha = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/desatar';

  const body = `## Escopo

Inspeção editorial da expressão **«[desatar o nó](${self})»** — o **ofício** de soltar o [nó](${no}) na [corda](${corda}) e, por figura, na [vida](${vida}). Pedido de campo: *Desatar* · *desatar o nó* · relacionar **[desastre](${desastre})**. O lab: desatar o nó **não** é desastre; desastre é má estrela. A relação é **método**.

> **Nota metodológica:** auditoria independente. Objecto = a **locução viva**. **Ficha ≠ terapia, ≠ corte de laços humanos como receta.** Par: [nó na vida!](${noVida}). Depois: **[ufa](${ufa})**. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto

| Campo | Valor |
|-------|-------|
| Expressão | **desatar o nó** |
| Tipo | Locução oral BR — resolver o laço |
| Peças | [desatar](${desatar}) + [nó](${no}) |
| Par | [nó na vida!](${noVida}) |
| Contraste | [desastre](${desastre}) — outro étimo; ofício vizinho |
| Data | ${inspected} |

## 2. Leitura

**H1:** desatar o nó = [gesto](${gesto}) com [verdade](${verdade}) no fio certo.  
**H2:** [desastre](${desastre}) cola no ouvido (*desatar* / *desastre*) e **não** no avô (*astro*).  
**H3:** um [nó na vida!](${noVida}) inspecionado pede esta locução **antes** de virar ruína nomeada.  
**H4:** depois do laço ceder: [ufa](${ufa}); se couber o sorriso, [legal](${legal}) (gíria).

## 3. O poema

\`\`\`poem
${poemDesatarONoPt()}
\`\`\`

## Status

**Aprovada** — locução do soltar; relacionada a [desastre](${desastre}) por ofício, não por étimo.

[▶ Expressões](${hub}) · [▶ Desatar](${desatar}) · [▶ Desastre](${desastre}) · [▶ Nó na vida!](${noVida}) · [▶ Ufa](${ufa}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian saying **“desatar o nó”** (untie the knot). Craft on the [corda](${corda}) and in [life](${vida}). Related to [desastre](${desastre}) by **method**, not etymon. After: [ufa](${ufa}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemDesatarONoEn()}
\`\`\`

## Status

**Approved** — locution of release; disaster is another ancestor.

[▶ Sayings](${hub}) · [▶ Untie](${desatar}) · [▶ Disaster](${desastre}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Dicho BR **«desatar o nó»**. Oficio en la [corda](${corda}) y en la [vida](${vida}). Relacionado con [desastre](${desastre}) por **método**, no por étimo. Después: [ufa](${ufa}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemDesatarONoEs()}
\`\`\`

## Estado

**Aprobada** — locución de soltar; el desastre es otro abuelo.

[▶ Expresiones](${hub}) · [▶ Desatar](${desatar}) · [▶ Desastre](${desastre}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDesatarONoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDesatarONoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 20;
  return expressaoPost({
    title: 'Inspeção: desatar o nó — o ofício, não o desastre',
    titleEn: 'Inspection: desatar o nó — the craft, not the disaster',
    titleEs: 'Inspección: desatar o nó — el oficio, no el desastre',
    excerpt:
      'Expressões: «desatar o nó» — soltar o laço na corda e na vida; ≠ desastre (*astro*); par nó na vida; ufa depois; Valeu !!!',
    excerptEn:
      'Sayings: “desatar o nó” — untie the knot on the rope and in life; ≠ disaster (*star*); pair nó na vida; phew after; Valeu !!!',
    excerptEs:
      'Dichos: «desatar o nó» — soltar el nudo en la cuerda y en la vida; ≠ desastre (*astro*); par nó na vida; ufa después; ¡Valeu !!!',
    slug: 'inspecao-expressao-desatar-o-no',
    date: '2026-08-22T03:22:00.000Z',
    seriesOrder: order,
    seriesLabel: 'desatar o nó · expressão',
    coverImage: '/imagens/inspecoes/desatar-o-no-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDesatarONoPost,
  buildDesatarONoBodies,
  poemDesatarONoPt,
  poemDesatarONoEn,
  poemDesatarONoEs
};
