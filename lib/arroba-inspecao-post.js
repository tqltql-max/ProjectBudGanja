'use strict';

/**
 * Inspeção Palavras · @ / arroba
 * Eixos: glifo U+0040 · PT arroba ← ár. ar-rubʿ (o quarto / o peso)
 * · EN at (o sítio) · cruzar com olho (lat. oculus) pelo método relação
 * · o olho cola o pictograma; a orelha não; o étimo corta
 * · ≠ caracol ≠ macaco ≠ órgão · Valeu !!!
 * Pedido de campo: relação de @ com olhos.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/arroba-palavra-cover.jpg';
const WIKT_ARROBA = 'https://pt.wiktionary.org/wiki/arroba';
const WIKT_AT_SIGN = 'https://en.wiktionary.org/wiki/at_sign';
const WIKT_AT = 'https://en.wiktionary.org/wiki/@';
const WIKI_ARROBA = 'https://pt.wikipedia.org/wiki/Arroba';
const WIKI_AT = 'https://en.wikipedia.org/wiki/At_sign';
const WIKT_RUB = 'https://en.wiktionary.org/wiki/%D8%B1%D8%A8%D8%B9';

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
  return `@.
O olho cola.
A orelha não.

Órbita.
A letra a por íris.
A cauda fecha o olhar.

Arroba.
Árabe ar-rubʿ —
o quarto, o peso.
Não é oculus.

At.
O sítio.
O nome na rede.
Chamar o olhar
não é ser o órgão.

Valeu !!!
ver o glifo
sem fundir com a carne.`;
}

function poemEn() {
  return `@.
The eye glues.
The ear does not.

Orbit.
The letter a as iris.
The tail closes the look.

Arroba.
Arabic ar-rubʿ —
the quarter, the weight.
It is not oculus.

At.
The place.
The name on the net.
Calling the look
is not being the organ.

Valeu !!!
see the glyph
without fusing it with flesh.`;
}

function poemEs() {
  return `@.
El ojo pega.
El oído no.

Órbita.
La letra a por iris.
La cola cierra la mirada.

Arroba.
Árabe ar-rubʿ —
el cuarto, el peso.
No es oculus.

At.
El sitio.
El nombre en la red.
Llamar la mirada
no es ser el órgano.

¡Valeu !!!
ver el glifo
sin fundirlo con la carne.`;
}

function buildArrobaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-arroba.html';
  const olho = '/posts/post-inspecao-palavra-olho.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const letraX = '/posts/post-inspecao-palavra-letra-x.html';
  const letraL = '/posts/post-inspecao-palavra-letra-l.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const ramela = '/posts/post-inspecao-palavra-ramela.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const vidaHub = '/vida/';

  const body = `## Escopo

Inspeção editorial do glifo **[@](${self})** — nome português **arroba**; inglês *at sign* / *commercial at* (U+0040) — **cruzado**, pelo método de **[relação](${relacao})**, com **[olho](${olho})** / **olhos**. Pedido de campo: *relação de @ com olhos*.

Duas salas, um **entre** de vista. O **[olho](${olho}) cola** o pictograma: órbita + *a*-íris. [A orelha](${orelhaCola}) **não cola** (*arroba* ≠ *olho*). O [étimo](${etimo}) **corta**: ár. *ar-rubʿ* (o quarto / o peso) × lat. *oculus*.

| Forma | Avô | Ofício antigo | Ofício agora |
|-------|-----|---------------|--------------|
| **@ / arroba** | ár. [*ar-rubʿ*](${WIKT_RUB}) «o quarto» | unidade de **peso**; depois «à razão de» | glifo de **sítio** (*at*) e de **menção** |
| **[olho](${olho}) / olhos** | lat. *oculus* | órgão que **vê** | olhar, abertura, broto |
| **at** (EN) | germânico / uso comercial | preposição de **lugar** | o nome do glifo na rede |
| **Alcunhas do glifo** | — | caracol, rabo de macaco, cão | **não** são *olho* |

**H-relação:** [relação](${relacao}) = pôr A e B **no entre** sem fundir. A relação pedida é de **olho** (o órgão lê o glifo como olho) e de **ofício** (@ chama o olhar). Não é de **genealogia**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · arroba](${WIKT_ARROBA}), EN [*at sign*](${WIKT_AT_SIGN}), [*@*](${WIKT_AT}), [Wikipédia · Arroba](${WIKI_ARROBA}), [At sign](${WIKI_AT}), ár. [*rubʿ*](${WIKT_RUB}). Método: [etimologia](${etimologia}) · [relação](${relacao}). **Ficha ≠ manual de e-mail, ≠ oftalmologia, ≠ Unicode Standard comentado linha a linha.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *@* / *arroba* / *at sign* / *arroba eletrónica* / *mencionar* / *@alguém* / *olhos* (cruzamento).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **@** (glifo) · lema PT **arroba** |
| Cruzamento | **[olho](${olho}) / olhos** — objecto irmão de **vista**, não de **raiz** |
| Método | [relação](${relacao}) — *cruzar* = o verbo do entre |
| Classe | @ : carácter / [sinal](${sinal}) · arroba: substantivo feminino · olho: substantivo masculino |
| Étimo arroba (trabalho) | ár. *ar-rubʿ* «o quarto» (unidade de peso ibérica) — confiança: **alta** no nome; origem **exacta** do *desenho* @: **média** (várias hipóteses) |
| Étimo olho (trabalho) | lat. *oculus* — ficha [olho](${olho}) — confiança: **alta** |
| Ofício EN | *at* — o **sítio** (nome *at* domínio; menção *@user*) |
| Tipo BudGanja | Palavra-glifo — pictograma × peso × sítio × relação com olho |
| Não é | O órgão [olho](${olho}) · [óculos](${oculos}) · caracol / macaco / cão (alcunhas) · laudo de vista |
| Elo método | [relação](${relacao}) · [etimologia](${etimologia}) · [cola / colar](${cola}) · [verdade](${verdade}) |
| Elo vista | [olho](${olho}) · [óculos](${oculos}) · [orelha](${orelha}) (o outro sentido: **não** cola aqui) |
| Elo rede | [mensagem](${mensagem}) · [sinal](${sinal}) · [letra X](${letraX}) (irmã de glifo) |
| Data | ${inspected} |
| Fonte | [arroba](${WIKT_ARROBA}) · [at sign](${WIKT_AT_SIGN}) |

**O que é o objecto:** o **glifo @** e o seu nome português **arroba** — e a **[relação](${relacao})** que o põe ao lado de **olhos** sem soldar *ar-rubʿ* em *oculus*.

## 2. Hipóteses e método

**H1:** o nome PT/ES **arroba** < ár. *ar-rubʿ* (o quarto; unidade de peso) — alta.  
**H2:** o ofício moderno do glifo é EN **at** (sítio, taxa, menção) — alta.  
**H3:** a [relação](${relacao}) com [olho](${olho}) é de **pictograma** (o olho lê órbita + íris) e de **ofício** (@ chama o olhar) — alta o pedido; o étimo **não** une — alta o corte.  
**H4:** [a orelha](${orelhaCola}) não cola *arroba* em *olho*; quem cola é o **olho** — alta.  
**H5:** as alcunhas mundiais (caracol, macaco, cão) provam que o glifo **não** nasceu com o nome *olho* — alta como evidência negativa.  
**H6:** a origem *exacta* do desenho (ligatura *ad*, ânfora, marca comercial) permanece em debate — média; não fecha esta ficha.

Passos: (1) fixar @ / arroba; (2) cruzar olhos pelo método [relação](${relacao}); (3) cortar órgão e alcunhas; (4) rede de [sinal](${sinal}) / [mensagem](${mensagem}); (5) limites.

## 3. @ — o peso, o sítio, o glifo

Em português e espanhol o carácter chama-se **[arroba](${WIKT_ARROBA})**. O avô é árabe: *ar-rubʿ*, «o quarto» — unidade de peso da Península (cerca de 15 kg, com variação local). Os mercadores usavam o sinal como **à razão de**: *5 @ 3* = cinco à taxa de três. O inglês leu isso como **at**.

Em 1971, Ray Tomlinson escolheu @ para o correio electrónico porque já significava *at* e quase não aparecia em nomes. A [mensagem](${mensagem}) ganhou um **sítio**: *nome@domínio*. A rede social ganhou uma **menção**: *@alguém* = chamar aquele olhar.

| Camada | Leitura | Sala |
|--------|---------|------|
| **Peso** | Unidade ibérica *arroba* | História comercial — não o olho |
| **Taxa** | *at the rate of* | Inglês comercial |
| **Sítio** | *user at domain* | Correio |
| **Menção** | *@nome* chama a pessoa | Rede / [mensagem](${mensagem}) |
| **Glifo** | U+0040 COMMERCIAL AT | [Sinal](${sinal}) tipográfico |
| **Letra de dentro** | o **a** (de *at* / da marca) | Não é a pupila — o olho *lê* pupila |

**H-desenho (média):** hipóteses de trabalho para *como* o traço nasceu — ligatura latina *ad* («a / para»); marca de *arroba*; ânfora. O lab **não fecha** o lápis medieval. Fecha o **nome** ibérico e o **ofício** *at*.

**H-a:** a letra no centro é **a**, não um olho. O [olho](${olho}) *projeta* íris no *a*. Essa projecção é a [relação](${relacao}) pedida — pictograma, não anatomia.

## 4. Olhos — o órgão, o olhar

A ficha **[olho](${olho})** já crava: lat. *oculus*; plural **olhos**; cruzamento *zaroio*. Aqui o objecto **não se repete**. Repete-se só o **entre**.

| Peça de [olho](${olho}) | Papel nesta relação |
|------------------------|---------------------|
| **Órgão** | O que *vê* o glifo @ e o cola numa cara |
| **Olhar** | O que @ **chama** na menção (*olha pra mim*) |
| **Abertura / órbita** | O círculo exterior do @, lido como cavidade |
| **Zaroio** | Outro cruzamento da ficha olho — **não** entra aqui |
| **[Óculos](${oculos})** | Objecto *diante* do olho — outra classe; @ não é armação |

**H-olhos (plural):** o pedido veio no plural. Um @ é **um** pictograma de olho. Dois @ não são um par de olhos no teclado — são duas menções, ou um peso a dobrar. O par no rosto fica na ficha [olho](${olho}).

## 5. Relação — o olho cola, a orelha não

Pedido de campo: *[relação](${relacao}) de @ com olhos*. O verbo **cruzar** mora na ficha [relação](${relacao}): pôr A e B no entre. Não abre lema próprio. Não solda raízes.

Isto inverte o ofício habitual. Quase sempre [a orelha cola](${orelhaCola}) o que a boca juntou. Aqui **o olho cola** o que a tinta desenhou. A orelha fica de fora: *arroba* não soa a *olho*.

| Peça | Papel nesta ficha |
|------|-------------------|
| **[relação](${relacao})** | O **nome** do entre |
| **cruzar** | O **verbo** — pôr @ ao lado de olhos |
| **Cola de olho** | Pictograma: órbita + *a* + cauda |
| **Cola de orelha** | **Ausente** — *arroba* ≠ *olho* |
| **Étimo** | *ar-rubʿ* × *oculus* — [etimologia](${etimologia}) corta |
| **Ofício** | @ **chama** o olhar; olho **é** o olhar nomeado |

**Como ler o cruzamento**

1. Entrar pelo glifo **@** (esta âncora).  
2. Cruzar **olhos** — mesma vista, outra raiz.  
3. Não fundir com o órgão, nem com [óculos](${oculos}), nem com as alcunhas (caracol, macaco, cão).  
4. Se a orelha pedir cola, dizer que **não há**: quem cola é o olho.  
5. Fechar com [Valeu !!!](${mantra}).

**Anti-armadilha:** tratar @ como «o olho da internet» (vigilância metafórica) e esquecer o peso *arroba*. Outra: derivar *olho* de @ porque «parece». Outra: achar que *at* (EN) é cognato de *olho*. *At* é o **sítio**; *olho* é o **órgão**.

## 6. Três colas — o que o mundo lê no @

O glifo tem **muitos** nomes. Quase nenhum é *olho*. Isso importa: a relação com olhos é **desta** inspeção, não da tradição onomástica.

| Língua / sítio | Alcunha viva | O que vê |
|----------------|--------------|----------|
| PT / ES | **arroba** | O peso; o quarto |
| EN | *at* / *at sign* | O sítio |
| IT | *chiocciola* | Caracol |
| NL | *apenstaartje* | Rabo de macaco |
| DE | *Klammeraffe* | Macaco-prego |
| RU | *sobaka* | Cão |
| FR | *arobase* / *arrobe* | Empréstimo do ibérico |
| **Este lab** | **olho (pictograma)** | Órbita + íris — [relação](${relacao}) pedida |

**H-alcunha:** se o mundo visse um olho, o nome *olho* já estaria na tabela. Não está. A cola é **possível** (o traço aceita a leitura) e **não étimo**. O lab honra o pedido sem reescrever a história do carácter.

## 7. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Glifo** | Um olho desenhado | Pictograma *possível*; avô = peso / *at* |
| **Letra a** | Pupila / íris | A letra de *at* / da marca |
| **Menção @** | O olho em cima de alguém | Chamar o olhar; não é o órgão |
| **Arroba** | Nome do olho | Nome do **quarto** (peso) |
| **Olhos** | Cognato do @ | Lat. *oculus* — outra árvore |
| **Vigilância** | @ = Big Brother | Metáfora; **não** étimo desta ficha |
| **Par @@** | Dois olhos | Duas menções / peso a dobrar |

## 8. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Dizer *@* / *arroba* para o glifo; *olho* para o órgão |
| Bom | Cruzar os dois pela [relação](${relacao}) e declarar: cola de **olho**, não de orelha, não de raiz |
| Bom | Reservar *at* para o sítio; *arroba* para o nome ibérico |
| Mau | Fundir @ = olho = vigilância = menção num só sopro |
| Mau | Inventar que *olho* vem do @ (calco visual falso) |
| Mau | Tratar a ficha como manual de e-mail, Unicode ou oftalmologia |

## 9. Poema do laboratório

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=arroba)

## 10. Avaliação BudGanja

### Forças
- Separa **peso** (*ar-rubʿ*) de **órgão** (*oculus*) — a [relação](${relacao}) pede o entre, não a solda.  
- Nomeia a cola invertida: **o olho cola**, [a orelha](${orelhaCola}) não.  
- Guarda as alcunhas mundiais como prova de que *olho* **não** é o nome herdado.  
- Liga [mensagem](${mensagem}) e [sinal](${sinal}) sem virar tutorial de login.

### Limites
- A origem gráfica exacta do traço @ permanece **em debate** (ligatura *ad*, ânfora, marca).  
- Não é Unicode Standard, RFC de e-mail nem laudo de vista.  
- O poema é **criação do laboratório**.

## 11. Como repetir o método

1. Fixar a forma âncora (aqui: **@** / **arroba**).  
2. Cruzar o equivalente de **vista** (**olhos**) pela ficha [relação](${relacao}) — sem fundir raízes.  
3. Tabela de colas (olho × orelha × étimo).  
4. Alcunhas mundiais como **corte** (o que o mundo *não* chamou).  
5. Status + [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Olho](${olho}) | O órgão / o olhar — a outra âncora desta [relação](${relacao}) |
| [Óculos](${oculos}) | Objecto *diante* do olho — não é o @ |
| [Relação](${relacao}) | O método do entre |
| [Orelha cola…](${orelhaCola}) · [orelha](${orelha}) | O ofício que **aqui não cola** |
| [Sinal](${sinal}) · [mensagem](${mensagem}) | Marca e envio — o @ vive aqui |
| [Letra X](${letraX}) · [letra L](${letraL}) | Irmãs de método — glifo ≠ órgão ≠ slogan |
| [Ramela](${ramela}) | Outra peça do canto do olho — outra ficha |
| [Cola / colar](${cola}) · [étimo](${etimo}) · [etimologia](${etimologia}) | Cola × corte |
| [Língua portuguesa](${lingua}) · [verdade](${verdade}) · [gesto](${gesto}) | Solo e ofício |
| [Vida](${vida}) | O peito que vê |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Ofício e fecho |

## Status

**Aprovado** — **@** / **arroba** fichado: étimo *ar-rubʿ* (o quarto / o peso); ofício *at* (sítio, menção); cruzamento com **[olho](${olho}) / olhos** pelo método [relação](${relacao}) — cola de **olho** (pictograma), não de orelha, não de raiz; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Olho](${olho}) · [▶ Relação](${relacao}) · [▶ Sinal](${sinal}) · [▶ Mensagem](${mensagem}) · [▶ Valeu !!!](${mantra}) · [▶ Hub](${hubAll}) · [▶ Guia](${guia}) · [▶ Vida](${vidaHub})
`;

  const contentEn = `## Scope

Editorial inspection of the glyph **[@](${self})** — Portuguese name **arroba**; English *at sign* / *commercial at* (U+0040) — **crossed**, by the method of **[relação](${relacao})** (“relation”), with **[olho](${olho})** / **eyes**. Field request: *relation of @ with eyes*.

Two rooms, one visual **between**. The **[eye](${olho}) glues** the pictogram: orbit + *a*-as-iris. [The ear](${orelhaCola}) **does not glue** (*arroba* ≠ *olho*). The etymon **cuts**: Ar. *ar-rubʿ* (the quarter / the weight) × Lat. *oculus*.

| Form | Ancestor | Old office | Office now |
|------|----------|------------|------------|
| **@ / arroba** | Ar. [*ar-rubʿ*](${WIKT_RUB}) “the quarter” | a **weight**; then “at the rate of” | glyph of **place** (*at*) and of **mention** |
| **[olho](${olho}) / eyes** | Lat. *oculus* | the organ that **sees** | look, opening, bud |
| **at** (EN) | the preposition of **place** | commercial “at” | the glyph’s name on the net |

**H-relation:** [relação](${relacao}) = set A and B **in the between** without fusing. The asked relation is of **eye** (the organ reads the glyph as an eye) and of **office** (@ calls the look). It is not of **genealogy**.

> Sources: [arroba](${WIKT_ARROBA}), [*at sign*](${WIKT_AT_SIGN}), [At sign](${WIKI_AT}). **Sheet ≠ email manual, ≠ ophthalmology.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Anchor | **@** (glyph) · PT lemma **arroba** |
| Cross | **olho / eyes** — sibling of **sight**, not of **root** |
| Arroba etymon | Ar. *ar-rubʿ* “the quarter” (Iberian weight) — **high** for the name; **medium** for the exact stroke history |
| Olho etymon | Lat. *oculus* — see [olho](${olho}) — **high** |
| Not | the organ · glasses · snail / monkey / dog nicknames |
| Date | ${inspected} |

## @ — weight, place, glyph

In Portuguese and Spanish the character is **arroba**, from Arabic *ar-rubʿ*, “the quarter” — an Iberian unit of weight. Merchants used the mark as **at the rate of**. English read that as **at**. In 1971 Ray Tomlinson picked @ for email because it already meant *at*. Social networks turned it into a **mention**: *@someone* = call that look.

The letter in the middle is **a**, not a pupil. The [eye](${olho}) *projects* an iris onto the *a*. That projection is the [relation](${relacao}) asked for — pictogram, not anatomy.

## Eyes — the organ, the look

The **[olho](${olho})** sheet already sets Latin *oculus*. This sheet does not repeat it. It only repeats the **between**. One @ is **one** eye-pictogram. Two @@ are two mentions, not a face.

## Relation — the eye glues, the ear does not

This inverts the usual office. Almost always [the ear glues](${orelhaCola}) what the mouth joined. Here **the eye glues** what the ink drew. The ear stays out: *arroba* does not sound like *olho*.

World nicknames (IT snail, NL monkey-tail, DE spider-monkey, RU dog) prove the glyph was **not** born with the name *eye*. The eye-reading is **this** inspection’s relation, not inherited onomastics.

**Anti-trap:** treating @ as “the eye of the internet” (surveillance metaphor) and forgetting the weight *arroba*. Another: deriving *olho* from @ because it “looks like” one. Another: claiming EN *at* is a cognate of *olho*. *At* is the **place**; *olho* is the **organ**.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** *@* / *arroba*: etymon *ar-rubʿ* (quarter / weight); office *at* (place, mention); cross with **olho / eyes** by [relação](${relacao}) — **eye**-glue (pictogram), not ear, not root. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial del glifo **[@](${self})** — nombre portugués/español **arroba**; inglés *at sign* (U+0040) — **cruzado**, por el método de **[relação](${relacao})**, con **[olho](${olho})** / **ojos**. Pedido de campo: *relación de @ con ojos*.

Dos salas, un **entre** de vista. El **[ojo](${olho}) pega** el pictograma: órbita + *a*-iris. [El oído](${orelhaCola}) **no pega** (*arroba* ≠ *olho* / *ojo*). El étimo **corta**: ár. *ar-rubʿ* (el cuarto / el peso) × lat. *oculus*.

| Forma | Abuelo | Oficio antiguo | Oficio ahora |
|-------|--------|----------------|--------------|
| **@ / arroba** | ár. [*ar-rubʿ*](${WIKT_RUB}) «el cuarto» | unidad de **peso**; luego «a razón de» | glifo de **sitio** (*at*) y de **mención** |
| **[olho](${olho}) / ojos** | lat. *oculus* | el órgano que **ve** | mirada, abertura, brote |
| **at** (EN) | preposición de **lugar** | «at» comercial | el nombre del glifo en la red |

**H-relación:** [relação](${relacao}) = poner A y B **en el entre** sin fundir. La relación pedida es de **ojo** (el órgano lee el glifo como ojo) y de **oficio** (@ llama la mirada). No es de **genealogía**.

> Fuentes: [arroba](${WIKT_ARROBA}), [*at sign*](${WIKT_AT_SIGN}). **Ficha ≠ manual de correo, ≠ oftalmología.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **@** (glifo) · lema **arroba** |
| Cruce | **olho / ojos** — hermano de **vista**, no de **raíz** |
| Étimo arroba | ár. *ar-rubʿ* «el cuarto» — **alta** el nombre; **media** el trazo exacto |
| Étimo olho | lat. *oculus* — ver [olho](${olho}) — **alta** |
| No es | el órgano · gafas · apodos caracol / mono / perro |
| Fecha | ${inspected} |

## @ — el peso, el sitio, el glifo

En portugués y español el carácter se llama **arroba**, del árabe *ar-rubʿ*, «el cuarto» — unidad de peso ibérica. Los mercaderes lo usaban como **a razón de**. El inglés lo leyó *at*. En 1971 Ray Tomlinson lo eligió para el correo porque ya significaba *at*. La red lo volvió **mención**: *@alguien* = llamar esa mirada.

La letra del centro es **a**, no una pupila. El [ojo](${olho}) *proyecta* un iris sobre la *a*. Esa proyección es la [relación](${relacao}) pedida — pictograma, no anatomía.

## Relación — el ojo pega, el oído no

Esto invierte el oficio habitual. Casi siempre [el oído pega](${orelhaCola}) lo que la boca juntó. Aquí **el ojo pega** lo que la tinta dibujó. El oído se queda fuera: *arroba* no suena a *olho* / *ojo*.

Los apodos mundiales (IT caracol, NL colita de mono, DE mono, RU perro) prueban que el glifo **no** nació con el nombre *ojo*. La lectura ocular es la relación de **esta** ficha.

**Anti-trampa:** tratar @ como «el ojo de internet» (metáfora de vigilancia) y olvidar el peso *arroba*. Otra: derivar *olho* de @ porque «parece». Otra: creer que *at* es cognado de *olho*. *At* es el **sitio**; *olho* es el **órgano**.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** *@* / *arroba*: étimo *ar-rubʿ* (cuarto / peso); oficio *at* (sitio, mención); cruce con **olho / ojos** por [relação](${relacao}) — cola de **ojo** (pictograma), no de oído, no de raíz. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildArrobaPost() {
  const { body, contentEn, contentEs } = buildArrobaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-arroba', 292);
  return makePalavra({
    title:
      'Inspeção: @ / arroba — *ar-rubʿ* (o quarto); cruzar com olhos (*oculus*); o olho cola, a orelha não; Valeu !!!',
    titleEn:
      'Inspection: @ / arroba — *ar-rubʿ* (the quarter); cross with eyes (*oculus*); the eye glues, the ear does not; Valeu !!!',
    titleEs:
      'Inspección: @ / arroba — *ar-rubʿ* (el cuarto); cruzar con ojos (*oculus*); el ojo pega, el oído no; ¡Valeu !!!',
    excerpt:
      'Palavras: @ / arroba (ár. ar-rubʿ, o peso) × olho / olhos (lat. oculus) — relação de pictograma, não de étimo; menção chama o olhar; Valeu !!!',
    excerptEn:
      'Words: @ / arroba (Ar. ar-rubʿ, the weight) × olho / eyes (Lat. oculus) — pictogram relation, not etymon; mention calls the look; Valeu !!!',
    excerptEs:
      'Palabras: @ / arroba (ár. ar-rubʿ, el peso) × olho / ojos (lat. oculus) — relación de pictograma, no de étimo; la mención llama la mirada; ¡Valeu !!!',
    slug: 'inspecao-palavra-arroba',
    date: '2026-08-24T12:10:00.000Z',
    seriesOrder,
    seriesLabel: '@ · palavra',
    filename: 'posts/post-inspecao-palavra-arroba.html',
    url: '/posts/post-inspecao-palavra-arroba.html',
    coverImage: COVER,
    sourceUrl: WIKT_ARROBA,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildArrobaPost,
  buildArrobaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_ARROBA,
  WIKT_AT_SIGN,
  WIKI_AT
};
