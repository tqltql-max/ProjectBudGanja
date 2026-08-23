'use strict';

/**
 * Inspeção Expressões · nó na vida!
 * Ditado BR — o laço no arco da vida; par de desatar o nó.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemNoNaVidaPt() {
  return `Disseram que a vida é um fio
e o nó é castigo.
Mentira de metade.
O nó é o cruzamento —
onde a corda se encontra a si.

Há um nó no cadarço.
Há outro no peito.
Há um terceiro no mapa:
o caminho dobra e não mente.

Não é desastre ainda.
É laço.
Quem nomeia o nó
já começou a desatar.
Quem chama ruína ao aperto
aperta mais.

Ufa vem depois —
não no lugar do gesto.

Valeu !!!
com o fio na mão,
sem fingir que a vida é lisa.`;
}

function poemNoNaVidaEn() {
  return `They said life is a thread
and the knot is punishment.
Half a lie.
The knot is the crossing —
where the rope meets itself.

There is a knot in the lace.
There is another in the chest.
There is a third on the map:
the path bends and does not lie.

It is not disaster yet.
It is a loop.
Whoever names the knot
has already begun to untie.
Whoever calls ruin the tightness
tightens more.

Phew comes after —
not in place of the gesture.

Valeu !!!
with the thread in hand,
without pretending life is smooth.`;
}

function poemNoNaVidaEs() {
  return `Dijeron que la vida es un hilo
y el nudo es castigo.
Mentira a medias.
El nudo es el cruce —
donde la cuerda se encuentra a sí.

Hay un nudo en el cordón.
Hay otro en el pecho.
Hay un tercero en el mapa:
el camino dobla y no miente.

Aún no es desastre.
Es lazo.
Quien nombra el nudo
ya empezó a desatar.
Quien llama ruina al apriete
aprieta más.

Ufa viene después —
no en lugar del gesto.

Valeu !!!
con el hilo en la mano,
sin fingir que la vida es lisa.`;
}

function buildNoNaVidaBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-no-na-vida.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const desastre = '/posts/post-inspecao-palavra-desastre.html';
  const ufa = '/posts/post-inspecao-palavra-ufa.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const trilha = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/n%C3%B3';

  const body = `## Escopo

Inspeção editorial da expressão **«[nó na vida!](${self})»** — o **laço** no arco da [vida](${vida}): aperto, dobra, conta por resolver. Pedido de campo: *expressão nó na vida!* Par de ofício: **[desatar o nó](${desatarNo})**. Não é ainda [desastre](${desastre}) — a menos que o lab recuse nomear o [nó](${no}).

> **Nota metodológica:** auditoria independente. Objecto = a **locução viva** BR. **Ficha ≠ autoajuda, ≠ protocolo clínico.** Elos: [nó](${no}) · [corda](${corda}) · [vida](${vida}) / trilha [Vida](${trilha}) · [Valeu !!!](${mantra}).

## 1. Objecto

| Campo | Valor |
|-------|-------|
| Expressão | **nó na vida!** |
| Tipo | Locução oral BR — aperto no arco |
| Peças | [nó](${no}) + [vida](${vida}) |
| Par | [desatar o nó](${desatarNo}) |
| Não é | [desastre](${desastre}) (má estrela) · sermão de culpa |
| Data | ${inspected} |

## 2. Leitura

**H1:** o [nó](${no}) na [vida](${vida}) é **cruzamento**, não sentença.  
**H2:** a [corda](${corda}) é o fio do arco; o nó é o acontecimento.  
**H3:** chamar [desastre](${desastre}) ao nó inflaciona ruína e atrasa [desatar](${desatar}).  
**H4:** a resposta é [desatar o nó](${desatarNo}) e, depois, **[ufa](${ufa})**.

## 3. O poema

\`\`\`poem
${poemNoNaVidaPt()}
\`\`\`

## Status

**Aprovada** — locução do laço na [vida](${vida}); par [desatar o nó](${desatarNo}); ≠ desastre automático.

[▶ Expressões](${hub}) · [▶ Nó](${no}) · [▶ Desatar o nó](${desatarNo}) · [▶ Vida](${vida}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian saying **“nó na vida!”** — a knot in [life](${vida}). Pair: [desatar o nó](${desatarNo}). Not yet [desastre](${desastre}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemNoNaVidaEn()}
\`\`\`

## Status

**Approved** — locution of the knot in the arc of life.

[▶ Sayings](${hub}) · [▶ Knot](${no}) · [▶ Untie the knot](${desatarNo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Dicho BR **«nó na vida!»** — nudo en la [vida](${vida}). Par: [desatar o nó](${desatarNo}). Aún no es [desastre](${desastre}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemNoNaVidaEs()}
\`\`\`

## Estado

**Aprobada** — locución del nudo en el arco de la vida.

[▶ Expresiones](${hub}) · [▶ Nó](${no}) · [▶ Desatar o nó](${desatarNo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildNoNaVidaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildNoNaVidaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 19;
  return expressaoPost({
    title: 'Inspeção: nó na vida! — o laço no arco, ainda não é desastre',
    titleEn: 'Inspection: nó na vida! — the knot in the arc, not yet disaster',
    titleEs: 'Inspección: nó na vida! — el nudo en el arco, aún no es desastre',
    excerpt:
      'Expressões: «nó na vida!» — laço no arco da vida; par desatar o nó; ≠ desastre; ufa depois; Valeu !!!',
    excerptEn:
      'Sayings: “nó na vida!” — knot in the arc of life; pair untying the knot; ≠ disaster; phew after; Valeu !!!',
    excerptEs:
      'Dichos: «nó na vida!» — nudo en el arco de la vida; par desatar o nó; ≠ desastre; ufa después; ¡Valeu !!!',
    slug: 'inspecao-expressao-no-na-vida',
    date: '2026-08-22T03:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'nó na vida! · expressão',
    coverImage: '/imagens/inspecoes/no-na-vida-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNoNaVidaPost,
  buildNoNaVidaBodies,
  poemNoNaVidaPt,
  poemNoNaVidaEn,
  poemNoNaVidaEs
};
