'use strict';

/**
 * Inspeção Expressões · que não arrisca não petisca
 * Ditado BR · quem × que (forma de campo) · arriscar × petiscar ·
 * ≠ aposta vazia ≠ Valeu !!! · elo risco · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/quem-nao-arrisca-nao-petisca-cover.jpg';
const WIKT_ARRISCAR = 'https://pt.wiktionary.org/wiki/arriscar';
const WIKT_PETISCAR = 'https://pt.wiktionary.org/wiki/petiscar';
const WIKT_PETISCO = 'https://pt.wiktionary.org/wiki/petisco';
const WIKT_QUEM = 'https://pt.wiktionary.org/wiki/quem';
const WIKT_NVNG = 'https://en.wiktionary.org/wiki/nothing_ventured,_nothing_gained';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'expressoes-ditados')
        .map((p) => Number(p.seriesOrder))
        .filter((n) => Number.isFinite(n) && n > 0)
    );
    if (!taken.size) return start;
    seriesOrder = Math.max(...taken) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Que não arrisca não petisca.
Quem é o nome do ditado.
Que é a boca de campo.

Arriscar não é cair de propósito.
É pôr o pé onde o mapa
ainda não fechou.

Petiscar não é banquete.
É o gosto que só chega
a quem chegou à mesa.

O laboratório não vende salto.
Inspeciona o risco.
Faz o possível nesta mão.
E petisca o que o ofício deu.

Valeu !!!`;
}

function poemEn() {
  return `Que não arrisca não petisca.
Quem is the proverb’s name.
Que is the field mouth.

To risk is not to fall on purpose.
It is to set a foot where the map
has not yet closed.

To nibble is not a feast.
It is the taste that only comes
to whoever reached the table.

The lab does not sell the leap.
It inspects the risk.
It does what fits this hand.
And tastes what the craft gave.

Valeu !!!`;
}

function poemEs() {
  return `Que não arrisca não petisca.
Quem es el nombre del dicho.
Que es la boca de campo.

Arriesgar no es caer a propósito.
Es poner el pie donde el mapa
aún no cerró.

Picar no es banquete.
Es el gusto que solo llega
a quien llegó a la mesa.

El laboratorio no vende el salto.
Inspecciona el riesgo.
Hace lo posible en esta mano.
Y pica lo que el oficio dio.

¡Valeu !!!`;
}

function buildQuemNaoArriscaNaoPetiscaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-expressao-quem-nao-arrisca-nao-petisca.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const boa = '/posts/post-inspecao-palavra-boa.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const inverno = '/inverno/';

  const body = `## Escopo

Inspeção editorial da expressão **«[que não arrisca não petisca](${self})»**. Pedido de campo: **expressão : que não arrisca não petisca** — e, na mesma conversa, **mudar Valeu !!! da página index para essa expressão**. A forma de dicionário é **quem não arrisca não petisca**. A boca BR corta o *m*: **que** no lugar de **quem**. O ofício é o mesmo: **sem risco calculado, não há gosto**. Não substitui [Valeu !!!](${valeu}) no fecho das fichas. Na [index](/) (hoje [/inverno/](${inverno})), o mantra visível passa a ser **este ditado**.

> **Nota metodológica:** auditoria independente. Fontes: [arriscar](${WIKT_ARRISCAR}), [petiscar](${WIKT_PETISCAR}), [petisco](${WIKT_PETISCO}), [quem](${WIKT_QUEM}), paralelo EN [nothing ventured, nothing gained](${WIKT_NVNG}), ficha [risco](${risco}). **Ficha ≠ conselho de aposta, ≠ incentivo a dano, ≠ autoajuda de salto.** Tom: Inspetor BudGanja — *petiscar* o ofício, não o abismo.

**Gatilho:** *que não arrisca não petisca* / *quem não arrisca não petisca* → **quem não arrisca não petisca** (canónica) · **que não arrisca não petisca** (voz viva / index).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Voz viva / index | **que não arrisca não petisca** |
| Forma âncora | **quem não arrisca não petisca** |
| Classe | Ditado / provérbio BR (paralelismo negativo) |
| Étimo (trabalho) | *quem* (pron. indefinido) · *não* ← lat. *nōn* · *arriscar* (*a-* + [risco](${risco})) · *petiscar* (de *petisco*, «bocado») — confiança **alta** no uso; **média–alta** no étimo remoto de *petisco* |
| Família | *quem não arrisca…* · *que não arrisca…* · *arriscar* · *arriscado* · *petisco* · *petiscar* |
| Paralelo EN / ES | *nothing ventured, nothing gained* · *quien no arriesga no pica / no gana* |
| Não é | [Valeu !!!](${valeu}) · [Faça o seu melhor](${faca}) · aposta · ordem de imprudência |
| Tipo BudGanja | Expressão — ditado de [risco](${risco}) × gosto · mantra da index |
| Elo | [risco](${risco}) · [medo](${medo}) · [gesto](${gesto}) · [caminho](${caminho}) · [Faça o seu melhor](${faca}) · [Tamara](${tamara}) · [*Bom dia, Inverno*](${bomDia}) |
| Fonte | [arriscar](${WIKT_ARRISCAR}) · [petiscar](${WIKT_PETISCAR}) |
| Data | ${inspected} |

**Objecto:** o **ditado do bocado**. [A orelha cola](${orelhaCola}) *arriscar* em coragem vazia e *petiscar* em petisco de gôndola. O étimo **corta**: risco com método; gosto de quem chegou.

## 2. Hipóteses

**H1:** *quem* é a forma plena; *que* é **recorte oral** da mesma pessoa gramatical — não outro ditado.  
**H2:** o eixo é **condicional de ofício**: sem [risco](${risco}) assumido, não há *petisco* (gosto / ganho / prova).  
**H3:** *petiscar* vem do **bocado**, não do banquete — o ditado promete **prova**, não fortuna.  
**H4:** [medo](${medo}) é afecto; [risco](${risco}) é mapa. O ditado **não** apaga o medo — recusa a paralisia que também não petisca.  
**H5:** na index, este ditado **ocupa o sítio do mantra visível** que era [Valeu !!!](${valeu}) / [Faça o seu melhor](${faca}) na campanha Inverno. Valeu !!! **fica** como fecho das fichas.  
**H6:** [Tamara](${tamara}) no gelo é elo de **risco com método**, não prova de que todo o salto é sábio.

## 3. Que × quem

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **quem não arrisca…** | Só a «certa» | Canónica escrita / dicionário |
| **que não arrisca…** | Erro | Voz viva BR — *quem* sem o *m* na boca |
| **que** relativo («a coisa que…») | A mesma peça | Outra sala gramatical — **não** este ditado |

**Veredicto de forma:** a index leva a **voz viva** (*que*). A ficha ancora **quem**. Não fundir.

## 4. Peças da frase (como veneno)

Pedido: significado de **todas as palavras** — **só nesta ficha**. Método igual ao de [veneno](/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html): comum × BudGanja.

| Categoria | Palavra | Comum (mundano) | BudGanja |
|-----------|---------|-----------------|----------|
| Pessoa | **quem** / **que** | Pronome — a pessoa de quem se fala | Quem assume o [gesto](${gesto}); *que* = boca de campo |
| Negação | **não** (2×) | Lat. *nōn* | Dois cortes: sem risco **e** sem gosto — o segundo depende do primeiro |
| Ofício | **arrisca** / [arriscar](${risco}) | Expor-se ao [risco](${risco}) | Mapa, não pose; elo [medo](${medo}) × método |
| Gosto | **petisca** / petiscar | Petiscar = petisco + *-ar* — beliscar, provar | O bocado do ofício — ≠ prémio, ≠ gôndola |

**≠ petisco industrial** (saquinho): o ditado empresta o **bocado**, não a marca.  
**≠ arriscar a vida dos outros:** o *quem* é **esta mão**.

## 5. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Arriscar com [mapa](${caminho}): publicar, ficar, inspecionar |
| Bom | Petiscar o resultado honesto — [Boa!!!](${boa}) nomeia o gosto |
| Bom | Index: o ditado à vista, [Valeu !!!](${valeu}) no fecho das fichas |
| Mau | Transformar ditado em ordem de imprudência |
| Mau | Fundir com aposta / «all-in» |
| Mau | Apagar [Faça o seu melhor](${faca}) — salas irmãs, não sinónimos |

## 6. Index × Valeu !!! × Faça o seu melhor

| Peça | Sítio | Ofício |
|------|-------|--------|
| **que não arrisca não petisca** | Mantra visível da [index](/) / [Inverno](${inverno}) | Convite ao [risco](${risco}) com método |
| **[Valeu !!!](${valeu})** | Fecho das fichas · alteração [eu amo a vida](${amo}) | Gratidão leve — **não apagado** |
| **[Faça o seu melhor](${faca})** | Mantra Vida / ofício | O possível nesta mão — irmão, não substituto |

**Veredicto contraste:** Valeu !!! diz «teve valor». Faça o seu melhor diz «esta mão, hoje». **Que não arrisca não petisca** diz «sem mapa assumido, não há bocado». Três salas.

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não é conselho financeiro, jurídico nem clínico.  
- Não romantizar dano nem salto sem [respeito](${respeito}) ao [risco](${risco}).  
- Ficha de oralidade, não de receita de coragem.  
- A index muda o **mantra visível**; Valeu !!! continua o fecho editorial.

## Status

**Aprovado** na série Expressões — **que não arrisca não petisca** (voz viva / index) · **quem não arrisca não petisca** (âncora). Elo [risco](${risco}) · [medo](${medo}) · [Faça o seu melhor](${faca}). Fecho: [Valeu !!!](${valeu}) · [eu amo a vida](${amo}).

[▶ Expressões](${hub}) · [▶ Risco](${risco}) · [▶ Faça o seu melhor](${faca}) · [▶ Valeu !!!](${valeu}) · [▶ Index / Inverno](${inverno}) · [▶ Palavras](${hubPalavras}) · [▶ Guia](${guia}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **«[que não arrisca não petisca](${self})»**. Field: the saying, and **swap Valeu !!! on the index** for this line. Dictionary form: **quem não arrisca não petisca**. Living BR mouth: **que**. Parallel: [nothing ventured, nothing gained](${WIKT_NVNG}). Does **not** erase [Valeu !!!](${valeu}) as sheet-close.

> Independent audit. [arriscar](${WIKT_ARRISCAR}), [petiscar](${WIKT_PETISCAR}). **Not** gambling advice, **not** a dare.

## Object

| Field | Value |
|-------|-------|
| Index / living | **que não arrisca não petisca** |
| Anchor | **quem não arrisca não petisca** |
| Axis | [risco](${risco}) (map) × *petiscar* (a taste, not a feast) |
| vs Valeu !!! | Visible index mantra × thanks-close of sheets |
| vs [Do your best](${faca}) | Risk/taste × this hand today |
| Date | ${inspected} |

\`\`\`poem
${poemEn()}
\`\`\`

**Verdict:** approved in Sayings. Index shows this ditado; [Valeu !!!](${valeu}) remains the editorial close.

[▶ Risk](${risco}) · [▶ Sayings](${hub}) · [▶ Valeu !!!](${valeu})
`;

  const contentEs = `## Alcance

Inspección de **«[que não arrisca não petisca](${self})»**. Pedido: el dicho, y **cambiar Valeu !!! en la index** por esta línea. Forma de diccionario: **quem não arrisca não petisca**. Boca viva BR: **que**. Paralelo: *quien no arriesga no pica / no gana*. **No** borra [¡Valeu !!!](${valeu}) como cierre de ficha.

> Auditoría independiente. [arriscar](${WIKT_ARRISCAR}), [petiscar](${WIKT_PETISCAR}). **No** es consejo de apuesta ni de imprudencia.

## Objeto

| Campo | Valor |
|-------|-------|
| Index / viva | **que não arrisca não petisca** |
| Ancla | **quem não arrisca não petisca** |
| Eje | [risco](${risco}) (mapa) × *petiscar* (bocado, no banquete) |
| vs Valeu !!! | Mantra visible de la index × cierre de gratitud de las fichas |
| vs [Haz tu mejor](${faca}) | Riesgo/gusto × esta mano hoy |
| Fecha | ${inspected} |

\`\`\`poem
${poemEs()}
\`\`\`

**Veredicto:** aprobado en Expresiones. La index muestra este dicho; [¡Valeu !!!](${valeu}) sigue siendo el cierre editorial.

[▶ Riesgo](${risco}) · [▶ Expresiones](${hub}) · [▶ ¡Valeu !!!](${valeu})
`;

  return { body, contentEn, contentEs, wiki: WIKT_ARRISCAR };
}

function buildQuemNaoArriscaNaoPetiscaPost() {
  const { body, contentEn, contentEs, wiki } = buildQuemNaoArriscaNaoPetiscaBodies();
  return expressaoPost({
    title: 'Inspeção: que não arrisca não petisca — o ditado do bocado',
    titleEn: 'Inspection: que não arrisca não petisca — the nibble proverb',
    titleEs: 'Inspección: que não arrisca não petisca — el dicho del bocado',
    excerpt:
      'Expressões: que não arrisca não petisca — voz viva; âncora quem não arrisca…; index no lugar de Valeu !!!; ≠ aposta; Valeu !!!',
    excerptEn:
      'Sayings: que não arrisca não petisca — living voice; anchor quem não arrisca…; index instead of Valeu !!!; ≠ gamble; Valeu !!!',
    excerptEs:
      'Dichos: que não arrisca não petisca — voz viva; ancla quem não arrisca…; index en lugar de Valeu !!!; ≠ apuesta; ¡Valeu !!!',
    slug: 'inspecao-expressao-quem-nao-arrisca-nao-petisca',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: pickOrder('inspecao-expressao-quem-nao-arrisca-nao-petisca', 43),
    seriesLabel: 'que não arrisca não petisca · expressão',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildQuemNaoArriscaNaoPetiscaPost,
  buildQuemNaoArriscaNaoPetiscaBodies,
  poemPt,
  poemEn,
  poemEs
};
