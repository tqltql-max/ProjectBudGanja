'use strict';

/**
 * Inspeção Palavras · parábola (lat. parabola · gr. parabolḗ)
 * Uma página de estudo: latim e português; narrativa e curva.
 * Pedido: inspeção da palavra Parabola; «criar pagina dedicada».
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/parabola-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/par%C3%A1bola';
const WIKT_LA = 'https://en.wiktionary.org/wiki/parabola#Latin';
const WIKT_GR = 'https://en.wiktionary.org/wiki/%CF%80%CE%B1%CF%81%CE%B1%CE%B2%CE%BF%CE%BB%CE%AE#Ancient_Greek';
const WIKT_EN_CURVE = 'https://en.wiktionary.org/wiki/parabola';
const WIKT_EN_STORY = 'https://en.wiktionary.org/wiki/parable';
const WIKI_NARR = 'https://pt.wikipedia.org/wiki/Par%C3%A1bola_(narrativa)';
const WIKI_GEO = 'https://pt.wikipedia.org/wiki/Par%C3%A1bola';
const WIKI_CONIC = 'https://pt.wikipedia.org/wiki/Sec%C3%A7%C3%A3o_c%C3%B3nica';

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
  return `Parábola.
Lançar ao lado.

Uma história que compara
sem dizer o nome.
Uma curva que junta
o foco e a directriz.

A mesma raiz
deu a palavra
e a parábola.

Em inglês cortam:
parable / parabola.
Em português
é a mesma boca.

Valeu !!!
duas salas,
um étimo.`;
}

function poemEn() {
  return `Parábola.
To throw beside.

A story that compares
without naming the thing.
A curve that joins
the focus and the directrix.

The same root
gave the word
and the parabola.

English cuts them:
parable / parabola.
Portuguese
keeps one mouth.

Valeu !!!
two rooms,
one etymon.`;
}

function poemEs() {
  return `Parábola.
Lanzar al lado.

Una historia que compara
sin decir el nombre.
Una curva que junta
el foco y la directriz.

La misma raíz
dio la palavra
y la parábola.

En inglés cortan:
parable / parabola.
En portugués
es la misma boca.

¡Valeu !!!
dos salas,
un étimo.`;
}

function buildParabolaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-parabola.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const alquimista = '/posts/post-inspecao-arte-o-alquimista.html';
  const coelho = '/posts/post-inspecao-figura-paulo-coelho.html';
  const lucas = '/posts/post-inspecao-figura-lucas-evangelista.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const metafora = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Página de estudo da família **[parábola](${self})** — uma ficha para o **latim** *parabola* e o **português** *parábola*. Pedido de campo: *inspeção da palavra Parabola*; depois: *criar uma pagina dedicada a parabolas* — a mesma do latim e do português, para estudá-las aqui.

Objecto = o **vocábulo e as duas salas** que ele abre. Não são duas páginas. Não é o hub [Palavras](${hub}). Não é a ficha [palavra](${palavra}) (a **filha** romance: vocábulo). Aqui estudamos o avô e o nome que ficou: **lançar ao lado**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · parábola](${WIKT}), lat. [*parabola*](${WIKT_LA}), gr. [*parabolḗ*](${WIKT_GR}), EN [*parabola*](${WIKT_EN_CURVE}) / [*parable*](${WIKT_EN_STORY}), [narrativa](${WIKI_NARR}), [curva](${WIKI_GEO}), [cónica](${WIKI_CONIC}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}). **Ficha ≠ catecismo, ≠ tratado de cónicas, ≠ lista de parábolas evangélicas.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *parabola* / *parábola* / *parábolas* / *parable* / *parabole* / *parabolḗ* / *lançar ao lado*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **parábola** (PT) · **parabola** (latim / EN da curva) |
| Classe PT | Substantivo feminino |
| Étimo (trabalho) | Gr. *parabolḗ* (παραβολή) ← *para-* «ao lado» + *bállein* «lançar» → lat. *parabola* — confiança: **alta** |
| Tipo BudGanja | Palavra — página de estudo (latim × português; narrativa × curva) |
| Filha romance | [palavra](${palavra}) — o vocábulo; **não** esta ficha |
| Não é | Catecismo · aula completa de cónicas · ficha de [metáfora](${metafora}) · hub da série |
| Data | ${inspected} |
| Fonte | [parábola](${WIKT}) · [parabola (LA)](${WIKT_LA}) |

**O que é o objecto:** o nome de **pôr uma coisa ao lado de outra para comparar**. No grego é o gesto. No latim é a fala / a comparação / a história. No português a **mesma boca** nomeia a história que ensina e a curva da geometria. Em inglês **cortam**: *parable* × *parabola*. Esta página é o sítio para estudar as duas salas **sem as fundir**.

## 2. Grego — lançar ao lado

*Parabolḗ* (παραβολή) é *para-* («ao lado, ao longo») + o verbo *bállein* («lançar, atirar»). O ofício antigo: **atirar uma imagem ao lado** da coisa que se quer fazer ver. Não é o nome directo. É a comparação que **viaja ao lado**.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **παρά** *para-* | Ao lado, junto, ao longo | Alta |
| **βάλλειν** *bállein* | Lançar, atirar | Alta |
| **παραβολή** *parabolḗ* | Comparação, aplicação, «lançamento ao lado» | Alta |
| Retórica | Figura de comparação (vizinha da metáfora, não idêntica) | Alta |
| Geometria (Apolónio) | *Parabolḗ* = «aplicação» de áreas — a cónica em que o quadrado da ordenada **iguala** o rectângulo aplicado ao parâmetro | Alta no nome técnico; **média** no detalhe escolar desta ficha |

**H-lançar:** a parábola **não** é o objecto; é o **lado** pelo qual o objecto se deixa ver.  
**H-Apolónio:** a curva herda o mesmo gesto: uma grandeza **aplicada ao lado** de outra. História e geometria **partilham o lançamento**; não partilham o ofício.

## 3. Latim — *parabola* (a mesma página)

O [latim](${latim}) toma *parabola* do grego: comparação, provérbio, fala, depois a **história que ensina**. A Vulgata usa *parabola* para as narrativas de Jesus. Não há, no latim clássico, uma «curva» com este nome — a sala da geometria entra depois, pelo grego técnico.

| Uso latino | Ofício | Sala nesta ficha |
|------------|--------|------------------|
| **parabola** | Comparação / fala / provérbio | Sala da narrativa |
| **parabolice** | De modo comparativo | Advérbio da mesma árvore |
| **Não é** | *verbum* (deu *verbo*, *verbal*) | Vizinho — **não** o pai de [palavra](${palavra}) |
| **Não é** | *sermo* / *oratio* | Outras bocas da fala |

**H-latim:** estudar *parabola* **aqui**, não numa ficha só de latim. O [latim](${latim}) é a língua; esta página é a **peça**.

## 4. Português — uma boca, duas salas

PT **parábola** (com acento) guarda o avô. A [orelha](${orelhaCola}) pode colar *parabola* (sem acento, EN/latim) em *parábola*. O lab **lê as duas** e **mantém uma página**.

| Sala | Leitura PT | O que estudar aqui |
|------|-----------|---------------------|
| **A. Narrativa** | História que compara para ensinar | Secção 6 |
| **B. Curva** | Cónica; *y = ax²*; foco e directriz | Secção 7 |
| **C. Filha** | [palavra](${palavra}) ← *parabola* | Vocábulo — **outra ficha** |
| **D. Ofício lab** | «usar X como parábola de…» | Método: Artes como comparação, não cosmologia |

**H-acento:** *parabola* no pedido de campo é latim / EN / lapso. O lema PT é **parábola**.  
**H-filha:** *palavra*, ES *palabra*, IT *parola*, FR *parole*, CAT *paraula* são a **especialização** «vocábulo / fala». A parábola **ficou** com a comparação. Não fundir filha e mãe.

## 5. Família romance — o fork

| Língua | Vocábulo / fala | Comparação / curva | Nota |
|--------|-----------------|---------------------|------|
| **Latim** | *(verbum* noutro tronco*) | *parabola* | *parabola* ainda não é «word» |
| **Português** | [palavra](${palavra}) | **parábola** (as duas salas) | Esta página = a mãe |
| **Espanhol** | *palabra* | *parábola* | Mesmo fork |
| **Italiano** | *parola* | *parabola* | Uma grafia para a comparação/curva |
| **Francês** | *parole* (fala; também *word* jurídico) | *parabole* | EN *parole* (liberdade condicional) = outra viagem |
| **Catalão** | *paraula* | *paràbola* | Mesmo mapa |
| **Inglês** | *word* (germânico) | **parable** × **parabola** | **Corta** o que o PT junta |

**H-inglês:** quem traduz *parábola* precisa de **duas** palavras EN. Quem traduz *palavra* **não** usa *parabola*. A [relação](${relacao}) é de família, não de sinónimo.

## 6. Sala A — estudar a parábola narrativa

A parábola **lança** um caso ao lado da tese. O ouvinte faz o trabalho. Não é definição. Não é sermão colado. Não é [mensagem](${mensagem}) em bruto: a mensagem **viaja dentro** da comparação.

| Vizinho | O que é | Corte |
|---------|---------|-------|
| **Fábula** | Caso com animais / moral explícita | Moral à vista; a parábola muitas vezes **esconde** o nome |
| **Alegoria** | Sistema de correspondências | A parábola pode ser **um** lance, não um código inteiro |
| **[Metáfora](${metafora})** | Transporte de sentido («A é B») | A parábola é **história** ao lado; a metáfora é **peça** na frase |
| **Analogia** | Proporção A:B :: C:D | Vizinha racional; não é o género literário |
| **Exemplo** | Caso que ilustra a regra | A parábola **desloca**; o exemplo **confirma** |

### Elos já no laboratório

| Recurso | Papel nesta sala |
|---------|------------------|
| [Lucas Evangelista](${lucas}) | Ofício de cuidado; o evangelho de Lucas **guarda** muitas narrativas deste género — ficha de **Pessoa**, não catecismo desta página |
| [O Alquimista](${alquimista}) · [Paulo Coelho](${coelho}) | Romance como **parábola de viagem** — Artes / Pessoas; alquimia = metáfora, não protocolo |
| [The Matrix](${matrix}) | O lab usa o filme como **parábola de verificação** — não adopta a cosmologia |
| [caminho](${caminho}) · [sinal](${sinal}) · [gesto](${gesto}) | Peças com que a narrativa de ofício se constrói |

**H-lab:** quando uma ficha de Artes diz «usa-se como parábola de…», o sentido é **esta sala**: comparação metódica. Não é a curva. Não é doutrina.

**Limite:** o lab **não** inventaria as parábolas dos Evangelhos nem cola texto com direitos. Estuda o **género** e aponta as fichas.

## 7. Sala B — estudar a parábola curva

A [curva](${WIKI_GEO}) é uma [secção cónica](${WIKI_CONIC}): o plano corta o cone **paralelo** a uma geratriz. Irmãs: elipse, hipérbole, circunferência. A [lemniscata](${lemniscata}) é **outra curva** (fita / oito) — não é cónica desta família.

### Definição de foco e directriz (alta)

Uma **parábola** é o lugar dos pontos **à mesma distância** de um ponto fixo (**foco**) e de uma recta fixa (**directriz**).

| Peça | Ofício |
|------|--------|
| **Vértice** | O ponto mais «fundo» (ou mais alto) da curva |
| **Eixo** | A recta de simetria; passa pelo foco e pelo vértice |
| **Foco** | O ponto que «recolhe» os raios paralelos ao eixo |
| **Directriz** | A recta que equilibra a distância ao foco |
| **Parâmetro** | A «abertura» — quão larga sobe a curva |

Forma escolar (eixo vertical): **y = ax² + bx + c**. O sinal de *a* diz se abre para cima ou para baixo. Isto é **mapa**, não caderno de exercícios.

### Propriedade que o ofício usa

Raios **paralelos ao eixo** reflectem-se para o **foco**. Daí:

| Aplicação | Leitura |
|-----------|---------|
| Antena parabólica / disco | O [sinal](${sinal}) concentra-se no foco |
| Farol / lanterna | O foco ilumina um feixe paralelo |
| Trajectória de projéctil (sem resistência) | A queda no campo uniforme desenha uma parábola |
| Cabo / arco (aproximação) | Alguns pontes e arcos aproximam a cónica |

**H-reflexão:** a curva **não** é a antena; a antena **usa** a curva.  
**H-física:** trajectória parabólica é modelo; vento e arrasto **cortam** o ideal.  
**H-lemniscata:** oito / ∞ = [lemniscata](${lemniscata}). Não colar o oito na cónica.

### Irmãs de dupla vida (ainda sem ficha própria)

O mesmo fork grego vive noutros pares. Esta página **declara** e **não** as inspeciona:

| Geometria | Retórica / língua | Estado |
|-----------|-------------------|--------|
| **parábola** | parábola (história) | **Esta ficha** |
| hipérbole (curva) | hipérbole (exagero) | Sala futura |
| elipse (curva) | elipse / elipse (omissão) | Sala futura |

## 8. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **parábola** | Só a história da escola dominical | Duas salas PT — narrativa **e** curva |
| **parabola** | Erro de acento | Latim / EN da curva / lapso de campo |
| **[palavra](${palavra})** | A mesma coisa | Filha: o vocábulo; avô comum, ofício outro |
| **parable** (EN) | Tradução total | Só a **sala A** |
| **parabola** (EN) | Tradução total | Só a **sala B** |
| **parabólica** (antena) | A palavra da história | Adjectivo da **curva** |
| **[metáfora](${metafora})** | Sinónimo | Transporte na frase, não género narrativo |
| **[lemniscata](${lemniscata})** | «Outra parábola» | Outra curva — fita, não cónica |

**H1:** *parábola* < lat. *parabola* < gr. *parabolḗ* — lançar ao lado (alta).  
**H2:** PT junta o que EN corta (*parable* × *parabola*).  
**H3:** [palavra](${palavra}) é filha, não sinónimo.  
**H4:** o ofício lab («X como parábola de Y») vive na **sala A**.

## 9. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Estudar as duas salas **nesta** página; citar o étimo; cortar filha e mãe |
| Bom | Dizer *parable* ou *parabola* em EN conforme a sala |
| Bom | Usar «parábola de verificação» em Artes como **comparação**, não cosmologia |
| Mau | Fundir vocábulo, história evangélica e antena num só sopro |
| Mau | Tratar esta ficha como catecismo ou como caderno de *y = x²* |
| Mau | Colar [lemniscata](${lemniscata}) ou hipérbole sem corte |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* família *hoje*.

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vidaHub}#poema=parabola)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [palavra](${palavra}) | Filha romance — o vocábulo |
| [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}) | Método e língua-mãe |
| [língua portuguesa](${lingua}) | Solo onde as duas salas convivem |
| [lemniscata](${lemniscata}) · [pattern](${pattern}) | Curvas / formas irmãs — não fundir |
| [O Alquimista](${alquimista}) · [Paulo Coelho](${coelho}) | Parábola de viagem (Artes / Pessoas) |
| [Lucas Evangelista](${lucas}) | Pessoa; género narrativo ao lado, sem catecismo |
| [The Matrix](${matrix}) | Parábola de verificação |
| [caminho](${caminho}) · [sinal](${sinal}) · [gesto](${gesto}) · [verdade](${verdade}) | Ofício |
| [Guia](${guia}) · hub [Palavras](${hub}) | Mapa |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é catecismo nem inventário de parábolas bíblicas.  
- Não é curso de cónicas, nem manual de antenas, nem caderno de projécteis.  
- Não funde [palavra](${palavra}), *verbum* e Verbo teológico.  
- Hipérbole e elipse ficam **declaradas**, sem ficha própria ainda.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **parábola** fichada como gr. *parabolḗ* → lat. *parabola* → PT *parábola*; **uma página** para latim e português; duas salas (narrativa × curva); filha [palavra](${palavra}) cortada; EN *parable* × *parabola* declarado. Sítio para **estudá-las**. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Palavra](${palavra}) · [▶ Latim](${latim}) · [▶ Etimologia](${etimologia}) · [▶ Lemniscata](${lemniscata}) · [▶ O Alquimista](${alquimista}) · [▶ Poema Vida](${vidaHub}#poema=parabola) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Study page for Portuguese **parábola** and Latin **parabola** — one sheet, two rooms. Greek *parabolḗ* (*para-* “beside” + *bállein* “to throw”): to throw a comparison **beside** the thing. Field request: inspect *Parabola*; then: a dedicated page for parabolas, Latin and Portuguese together.

Room A = the **story** that teaches by comparison (EN *parable*). Room B = the **curve** (EN *parabola*; conic; focus and directrix). Daughter [palavra](${palavra}) (“word”) is **another** sheet. Not a catechism. Not a full conics course.

> Sources: [Wiktionary](${WIKT}), Lat. [*parabola*](${WIKT_LA}), Gk. [*parabolḗ*](${WIKT_GR}), [*parable*](${WIKT_EN_STORY}) / [*parabola*](${WIKT_EN_CURVE}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Two rooms

| Room | English | Craft |
|------|---------|-------|
| **A. Narrative** | *parable* | A story thrown beside the thesis |
| **B. Curve** | *parabola* | Points equidistant from focus and directrix; *y = ax²* |
| **Daughter** | *word* ≠ *parabola* | [palavra](${palavra}) — Romance child of the same Latin |
| **Lab use** | “X as a parable of Y” | Room A — method, not cosmology |

English **cuts** what Portuguese **keeps together**. [The Matrix](${matrix}) is used in the lab as a **parable of verification**. [O Alquimista](${alquimista}) is a travel parable. [Lemniscate](${lemniscata}) is another curve, not this conic.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** One page for Latin and Portuguese. Two rooms. Daughter *palavra* cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Página de estudio de **parábola** (PT) y lat. **parabola** — una ficha, dos salas. Gr. *parabolḗ* (*para-* «al lado» + *bállein* «lanzar»): lanzar una comparación **al lado**. Pedido: inspeccionar *Parabola*; luego: una página dedicada, latín y portugués juntos.

Sala A = la **historia** que enseña comparando (EN *parable*). Sala B = la **curva** (EN *parabola*; cónica; foco y directriz). La hija [palavra](${palavra}) («vocablo») es **otra** ficha. No es catecismo. No es curso de cónicas.

> Fuentes: [Wikcionario](${WIKT}), lat. [*parabola*](${WIKT_LA}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Dos salas

| Sala | Inglés | Oficio |
|------|--------|--------|
| **A. Narrativa** | *parable* | Historia lanzada al lado de la tesis |
| **B. Curva** | *parabola* | Puntos a igual distancia del foco y la directriz |
| **Hija** | *word* ≠ *parabola* | [palavra](${palavra}) — hija romance |
| **Uso lab** | «X como parábola de Y» | Sala A — método, no cosmología |

El inglés **corta** lo que el portugués **junta**. [The Matrix](${matrix}) se usa como **parábola de verificación**. [O Alquimista](${alquimista}) es parábola de viaje. La [lemniscata](${lemniscata}) es otra curva.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Una página para latín y portugués. Dos salas. Hija *palavra* cortada. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildParabolaPost() {
  const { body, contentEn, contentEs } = buildParabolaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-parabola', 310);
  return makePalavra({
    title: 'Inspeção: Parábola — lançar ao lado; latim e português na mesma página',
    titleEn: 'Inspection: Parábola — throw beside; Latin and Portuguese on the same page',
    titleEs: 'Inspección: Parábola — lanzar al lado; latín y portugués en la misma página',
    excerpt:
      'Palavras: parábola ← lat. parabola ← gr. parabolḗ — estudar narrativa e curva aqui; filha palavra noutra ficha; EN parable × parabola; Valeu !!!',
    excerptEn:
      'Words: parábola ← Lat. parabola ← Gk. parabolḗ — study story and curve here; daughter palavra on another sheet; EN parable × parabola; Valeu !!!',
    excerptEs:
      'Palabras: parábola ← lat. parabola ← gr. parabolḗ — estudiar narrativa y curva aquí; hija palavra en otra ficha; EN parable × parabola; ¡Valeu !!!',
    slug: 'inspecao-palavra-parabola',
    date: '2026-08-24T12:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Parábola · parabola',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildParabolaPost,
  buildParabolaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_LA,
  WIKT_GR,
  WIKT_EN_CURVE,
  WIKT_EN_STORY
};
