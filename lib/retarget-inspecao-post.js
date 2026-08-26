'use strict';

/**
 * Inspeção Palavras · retarget
 * Eixos: empréstimo EN re- + target (voltar a apontar) ·
 * objecto alvo ← lat. albus (o branco do centro) ·
 * cola da orelha: rato (rat) + alvo (target) ·
 * ≠ étimo / ≠ etimologia popular como origem ·
 * ≠ rato de computador · ≠ tutorial de anúncio.
 * Pedido: fala mais — étimo × albus × cola (não é a origem).
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/retarget-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/retarget';
const WIKT_TARGET = 'https://en.wiktionary.org/wiki/target';
const WIKT_ALVO = 'https://pt.wiktionary.org/wiki/alvo';
const WIKT_RATO = 'https://pt.wiktionary.org/wiki/rato';
const WIKT_RE = 'https://en.wiktionary.org/wiki/re-#English';
const WIKT_ALBUS = 'https://en.wiktionary.org/wiki/albus#Latin';
const WIKT_TARGE = 'https://en.wiktionary.org/wiki/targe';
const WIKI_POP = 'https://pt.wikipedia.org/wiki/Etimologia_popular';

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
  return `Retarget.
Não é o rato que inventou o verbo.
É o prefixo de novo
mais o alvo.

Albus era o branco fosco.
O branco era o centro.
O centro virou o objecto.
Alvo.

A orelha cola:
rato + alvo.
A boca junta o sopro.
O étimo corta — as letras são re-, não rat.

re- outra vez.
Target o escudo que virou disco.
Alvo o objecto.
Rato o animal — cola, não pai.

O anúncio é outra sala.
O rato do rato é outra sala.
O delator é outra sala.

Valeu !!!
apontar de novo
sem fundir o bicho no branco.`;
}

function poemEn() {
  return `Retarget.
The rat did not invent the verb.
It is the prefix again
plus the target.

Albus was the dull white.
The white was the centre.
The centre became the object.
Alvo.

The ear glues:
rat + target.
The mouth joins the breath.
The etymon cuts — the letters are re-, not rat.

re- once more.
Target the shield that became a disk.
Alvo the object.
Rat the animal — glue, not father.

The ad is another room.
The computer mouse is another room.
The snitch is another room.

Valeu !!!
aim again
without fusing the beast into the white.`;
}

function poemEs() {
  return `Retarget.
No es la rata quien inventó el verbo.
Es el prefijo de nuevo
más el blanco.

Albus era el blanco mate.
El blanco era el centro.
El centro viró el objeto.
Alvo.

El oído pega:
rata + blanco.
La boca junta el soplo.
El étimo corta — las letras son re-, no rat.

re- otra vez.
Target el escudo que viró disco.
Alvo el objeto.
Rata el animal — cola, no padre.

El anuncio es otra sala.
El ratón del ordenador es otra sala.
El soplón es otra sala.

¡Valeu !!!
apuntar de nuevo
sin fundir el bicho en el blanco.`;
}

function buildRetargetBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-retarget.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const animais = '/animais/';

  const body = `## Escopo

Inspeção editorial da palavra **[retarget](${self})** — empréstimo inglês: prefixo **re-** («de novo / outra vez») + **target** («alvo»). Pedido de campo: relacionar com o **objecto [alvo](${objetos})** e o **animal rato**.

Duas salas, um sopro. A [orelha cola](${orelha}): **rat** + **target** soa a **retarget**. O étimo **corta**: o [rato](${animal}) não gerou o verbo; o [alvo](${objetos}) é a peça portuguesa de *target*. Objecto = o **vocábulo**. Não é tutorial de anúncio. Não é ficha zoológica. Não é o rato do computador.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · retarget](${WIKT}), [target](${WIKT_TARGET}), [re-](${WIKT_RE}), [targe](${WIKT_TARGE}), [albus](${WIKT_ALBUS}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}), [etimologia popular](${WIKI_POP}). Método: [etimologia](${etimologia}) — étimo × cola. **Ficha ≠ playbook de tracking, ≠ manual de praga, ≠ dicionário de hardware.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *retarget* / *retargeting* / *retargetar* / *rato no alvo* / *voltar a apontar*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **retarget** (EN de oficina; verbo / substantivo de jargão) |
| Classe | Empréstimo EN; calco BR *retargetar*; gerúndio de mercado *retargeting* |
| Étimo (trabalho) | EN **re-** + **target** — confiança: **alta** |
| Target | Ant. fr. *targette* ← *targe* «broquel / escudo pequeno» — o disco a atingir |
| Alvo (PT) | Lat. *albus* «branco» → o **branco do centro** (bullseye) → o objecto da pontaria |
| Rato (cola) | Lat. tardio *rattus* — [animal](${animal}); EN *rat* cola no ouvido com *target* |
| Tipo BudGanja | Palavra — étimo × cola da orelha × objecto × animal |
| Não é | Tutorial de ads · praga urbana · rato de computador (PT-PT) · delator · [upsert](${upsert}) |
| Data | ${inspected} |
| Fonte | [retarget](${WIKT}) |

**O que é o objecto:** o nome de **voltar a apontar ao mesmo alvo**. No lab: o [gesto](${gesto}) *re-* + o [objecto](${objetos}) *alvo*. A mnemónica **rato + alvo** é ofício da [orelha](${orelha}), não genealogia.

## 2. Três linhagens — o étimo não é o rato

Pedido de campo: *objecto alvo* e *animal rato*. O lab **não funde**. Quatro famílias; só duas fazem o verbo.

| Linhagem | Peça | Origem | Ofício nesta ficha |
|----------|------|--------|---------------------|
| **Étimo** | *re-* + *target* | lat. *re-* «de volta / de novo» + ant. fr. *targette* | **Voltar a apontar** — esta é a origem |
| **Objecto PT** | **alvo** | lat. [*albus*](${WIKT_ALBUS}) «branco fosco» | O **branco do centro** virou o objecto da pontaria |
| **Cola** | **rato** (*rat*) + **alvo** (*target*) | coincidência de ouvido | [Etimologia popular](${etimologia}) — serve para *lembrar*, **não** para *provar origem* |
| **Animal** | **rato** | lat. tardio *rattus* / OE *ræt* | Ser vivo ([animal](${animal})); âncora da memória |

**H-linhagem:** *retarget* é prefixação inglesa ([aglutinação](${aglutinacao}) de ofício: *re-* solda-se a *target*). A história *rato + alvo* é o mesmo mecanismo do [trocadilho](${trocadilho}) *cara+alho*: a boca reanalisa, a [orelha cola](${orelha}), o étimo **corta**.  
**H-letras:** as letras do verbo são **re-** + *target* (*r-e-t…*). A cola precisa de trocar o **e** pelo **a** para fazer *rat*. Esse salto já denuncia: **não é a origem**.

## 3. *re-* + *target* — voltar a apontar

O [Wiktionary](${WIKT}) fecha o étimo: *retarget* = *re-* + *target* — «to target again». Duas leituras do prefixo, um só ofício.

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **re-** | Prefixo EN ← lat. *re-* «de volta, outra vez» — o mesmo de *return*, *rewrite*, *retomar* | Alta |
| **target** (nome) | Ant. fr. *targette* (diminutivo) ← [*targe*](${WIKT_TARGE}) «broquel / escudo pequeno» ← germ. *targō* / nórd. *targa* «escudo redondo» | Alta no traçado geral |
| **target** (verbo) | Do nome: apontar a arma / o discurso a um objecto | Alta |
| **retarget** | Composto moderno de oficina: voltar a apontar **ou** mudar o sítio da pontaria | Alta |

Shakespeare ainda usa *target* como **escudo** (*Henry IV*). Depois o escudo (o disco que se levanta à frente) vira o **disco a atingir**. Depois a meta, o público, a pessoa. O lab fica no [gesto](${gesto}): **apontar de novo**.

Dois *re-* úteis, sem fundir:

1. **De novo no mesmo branco** — voltar ao objecto que já se apontou.  
2. **De novo noutro branco** — mudar o sítio (*retarget the missiles*, Putin 2008 no *New York Times*; compilador que *retarget* outra plataforma).

Em ambos: sem [alvo](${objetos}), o *re-* não tem onde pousar.

## 4. O objecto alvo — *albus*, o branco do centro

*Alvo* no português **é** o [objecto](${objetos}) da pontaria — e ainda é, em registo mais alto, a **cor branca**. Étimo de trabalho: lat. [*albus*](${WIKT_ALBUS}) «branco fosco» (o latim distinguia *albus* fosco de *candidus* brilhante). O centro do alvo de tiro era o **branco**; o branco virou o nome do objecto. A língua ainda diz *acertar no branco*.

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Adjectivo** | *pele alva*, *cabelos alvos* — branco / pálido | Alta |
| **Branco do centro** | *albus* → o ponto branco → bullseye | Alta (via da cor) |
| **Objecto físico** | Disco / silhueta a atingir — o nome passou do centro ao todo | Alta |
| **Meta** | «O alvo da campanha» | Alta (extensão) |
| **Pessoa como alvo** | Figura, não coisa inerte | Alta — pede [respeito](${respeito}) |
| **Família *albus*** | *alvura*, *álbum*, *albino*, *albedo*, *alba* (alvorada) | Alta como parentesco; **não** entram no étimo de *retarget* |

Dois caminhos para o **mesmo ofício de pontaria** — [relação](${relacao}), não calco:

| Língua | Palavra do objecto | Veio de | A cor branca quotidiana |
|--------|-------------------|---------|-------------------------|
| **PT** | *alvo* | lat. *albus* (a cor do centro) | *branco* ← germ. *blank* |
| **ES** | *blanco* | germ. *blank* — **a mesma palavra** faz cor e alvo | *blanco* |
| **EN** | *target* | o **escudo** (*targe*) | *blank* / *white*; *point-blank* = apontar ao branco (*de pointe en blanc*) |

**H-alvo:** *alvo* PT **não** é tradução tardia de *target*. Veio da cor. *Target* EN veio do escudo. Espanhol fundiu cor e objecto em *blanco*. Inglês guardou o branco no *blank* e deu outro nome ao disco. Três soluções, um ofício.

No lab: *alvo* é o **objecto inspecionado da pontaria**. *Retarget* nomeia o [gesto](${gesto}) de **voltar** a esse objecto.

## 5. A cola da orelha — rato + alvo ≠ origem

A [etimologia popular](${WIKI_POP}) é um **mecanismo**, não um erro de quem ouve. A boca inglesa junta *rat* + *target*; a orelha portuguesa cola **retarget** e **traduz** as peças: *rat* → *rato*, *target* → *alvo*. Daí a mnemónica **rato + alvo**. O lab honra o instinto e **corrige o étimo** — ofício da ficha [etimologia](${etimologia}).

| Teste | *re-* + *target* (étimo) | *rat* + *target* (cola) |
|-------|--------------------------|-------------------------|
| **Letras** | *r-e-* + *t-a-r-g-e-t* | precisaria de *r-a-t-* |
| **Som EN** | /riːˈtɑː(r)ɡɪt/ — vogal de *re-* é /iː/ ou /ə/ | /ræt/ — vogal de *rat* é /æ/ |
| **Família** | prefixo latino + escudo germânico/francês | animal (*rattus* / *ræt*) — **outra** árvore |
| **Em português** | *retarget* soa a empréstimo | *rato + alvo* **não** soa a *retarget* — a cola é **bilingue** (ouvido EN + tradução PT) |
| **Veredicto** | origem | [trocadilho](${trocadilho}) / cola da [orelha](${orelha}) |

**H-cola:** mesmo o «não é o rato» ainda pega o bicho se vier na mesma frase. Cortar em duas frases: o animal. Ponto. O alvo. Ponto.  
**H-rato:** o animal entra **a pedido**. Não é pai do verbo. É a âncora da memória.  
**H-aglutinação:** a solda **verdadeira** é *re-* + *target*. A solda **falsa** é *rat* + *target* — parece [aglutinação](${aglutinacao}); é [etimologia popular](${etimologia}).

## 6. Duas salas — mapa rápido

| Sala | Peça | Ofício |
|------|------|--------|
| **Étimo** | *re-* + *target* | De novo + o disco a atingir |
| **Objecto** | **alvo** | A coisa posta à frente — [objetos](${objetos}); em PT, o branco do centro |
| **Cola** | **rato** (*rat*) + **alvo** (*target*) | Lembrar, não provar origem |
| **Animal** | **rato** | Ser vivo; sem ficha própria no [catálogo](${animais}) ainda |
| **Mercado** | *retargeting* / remarketing | Voltar a mostrar [mensagem](${mensagem}) a quem já passou — **outra** sala |
| **Hardware** | rato / *mouse* | Apontador do ecrã — **corte** (PT-PT *rato* ≠ o bicho desta cola) |
| **Gíria** | rato = delator | EN *rat* «informante» — **corte** |

## 7. Derivação — a família à vista

| Forma | Papel | Sala |
|-------|-------|------|
| **target** | EN — alvo / objecto da pontaria | Peça-mãe do composto |
| **re-** | Prefixo EN «outra vez» | O *de novo* |
| **retarget** | Verbo / jargão | Esta ficha |
| **retargeting** | Nome de prática (ads, campanha) | Sala mercado — inspeccionar o vocábulo, não o funil |
| **retargetar** | Calco BR | Boca de oficina; não é a fala de pátio |
| **remarketing** | Primo de mercado (Google / ads) | Quase-sinónimo comercial; **não** o étimo |
| **alvo** | PT — objecto / meta / branco do centro | A peça portuguesa pedida |
| **objetivo** | Meta abstracta | Vizinho; não o disco físico |
| **rato** | Animal; em PT-PT também o apontador | Cola + homógrafo a cortar |

**H-derivação:** *retargetar* é calco, como [upsert](${upsert}) tem *upsertar*. O lema EN fica no disco; a boca BR pode calcar. O lab nomeia os dois e **não** finge que o calco é nativo antigo.

## 8. O animal rato

*Rato* — [animal](${animal}) roedor (família Muridae; género *Rattus* no sentido comum). Étimo de trabalho: lat. tardio *rattus* (provável eco germânico / onomatopaico; OE *ræt*). Irmãos de catálogo no lab: [coelho](${coelho}) (lagomorfo — **não** fundir com roedor), [pato](${pato}) (ave). Ainda **não** há ficha *animal rato* no [catálogo](${animais}); esta palavra empresta a peça.

| Camada | Leitura | Corte |
|--------|---------|-------|
| **Animal** | O bicho — vivo, dente, noite, cidade | Esta cola |
| **EN rat** | A mesma peça na boca inglesa | O que a orelha cola em *retarget* — **sem** ser pai do verbo |
| **Rato de computador** | PT-PT para *mouse* | **Outra** sala — apontador, não Muridae |
| **Delator** | Gíria EN *rat* / «rato» de alcunha | **Corte** — não é o animal da mnemónica |
| **Praga / veneno** | Ofício de saneamento | **Não** esta ficha |

**H-animal:** o pedido «animal rato» é honrado como **peça da cola**. O lab não ensina a caçar, não estigmatiza o bicho, não o transforma em mascote de anúncio. O étimo de *rato* (*rattus*) **não toca** o étimo de *retarget* (*re-* + *target*).

## 9. Hipóteses

**H1:** *retarget* EN = *re-* + *target* — «voltar a apontar» — alta.  
**H2:** *target* ← fr. *targette* / *targe* (escudo) — alta no traçado geral.  
**H3:** PT *alvo* ← *albus* (branco do centro) — alta; **não** é calco de *target*.  
**H4:** a cola **rato + alvo** (*rat* + *target*) é mnemónica da [orelha](${orelha}) — alta como ofício; **nula** como étimo.  
**H5:** a prova das letras: *retarget* escreve **re-**, não *rat*. A cola troca o *e* pelo *a*.  
**H6:** *retargeting* de mercado é **uso** do verbo, não a origem. Ficha ≠ tutorial de pixel, cookie ou lista.  
**H7:** rato de computador e rato-delator são homógrafos / gírias — cortar.  
**H8:** o lab aponta de novo ao objecto com [verdade](${verdade}); não persegue pessoa.

## 10. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Retarget = o rato no alvo | Étimo *re-* + *target*; cola à parte |
| **As letras** | Começa por *rat-* | Começa por *re-* + *t…* |
| **Alvo** | Só «meta» abstracta; calco de *target* | Primeiro o **objecto** (branco / disco) via *albus* |
| **Rato** | Pai da palavra | Animal + cola; [etimologia popular](${etimologia}), não genealogia |
| **Retargeting** | A ficha é um curso de ads | Vocábulo de um [gesto](${gesto}) comercial — sala cortada |
| **Rato (PT-PT)** | O apontador do ecrã | Homógrafo; hardware ≠ Muridae |
| **Remarketing** | Sinónimo exacto | Primo de mercado; outro nome de marca |

## 11. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *retarget* como **voltar a apontar ao alvo** |
| Bom | Contar *albus* — o branco do centro — como étimo do **objecto** PT |
| Bom | Usar **rato + alvo** como cola — e declarar que **não é a origem** |
| Bom | Separar objecto (*alvo*), animal (*rato*) e jargão EN |
| Bom | [Respeito](${respeito}) a quem é tratado como «alvo» de mensagem |
| Mau | Tutorial de perseguir gente com anúncio |
| Mau | Fundir o animal no étimo |
| Mau | Fundir o rato do computador com o bicho |
| Mau | Transformar o bicho em praga-mascote da ficha |

## 12. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=retarget)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Objetos](${objetos}) | Casa do **alvo** como coisa posta diante |
| [Animal](${animal}) · [Animais](${animais}) | Casa do **rato** como ser vivo |
| [Coelho](${coelho}) · [pato](${pato}) | Irmãos-animais no léxico — não fundir espécies |
| [A orelha cola o que a boca juntou](${orelha}) | Ofício da cola *rat* + *target* |
| [Etimologia](${etimologia}) · [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) | Étimo × popular × solda verdadeira |
| [Relação](${relacao}) | *Alvo* e *target* — dois caminhos, um ofício |
| [Pattern](${pattern}) · [skill](${skill}) · [upsert](${upsert}) | Empréstimos EN de oficina |
| [Mensagem](${mensagem}) | O que o mercado *re-* aponta — sem tutorial |
| [Gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [respeito](${respeito}) | Ofício |
| [Língua portuguesa](${lingua}) | Solo do *alvo* e do *rato* |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é manual de campanha, pixel, cookie nem lista de remarketing.  
- Não é ficha de *Rattus* no catálogo animal (ainda não existe; a peça entra aqui).  
- Não é aula de tiro nem de hardware.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **retarget** fichado como *re-* + *target* (voltar a apontar); **alvo** como objecto via *albus* (o branco do centro); **rato** como cola da [orelha](${orelha}), **não** como étimo (as letras são *re-*, não *rat*). Salas cortadas (ads-tutorial, mouse, delator). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Etimologia](${etimologia}) · [▶ Objetos](${objetos}) · [▶ Animal](${animal}) · [▶ Orelha cola](${orelha}) · [▶ Poema Vida](/vida/#poema=retarget) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of English **retarget** — prefix *re-* («again») + *target* («to aim again»). Field request: relate it to the **object alvo** (Portuguese for target, from Lat. *albus*, the white of the centre) and the **animal rato** (rat).

Two rooms, one breath. The [ear glues](${orelha}): **rat** + **target** sounds like **retarget**. The etymon **cuts**: the letters are *re-*, not *rat*. The [rat](${animal}) did not father the verb; [alvo](${objetos}) is the Portuguese piece of *target*. Object = the **word**. Not an ads playbook. Not a pest sheet. Not the computer mouse.

> Method note: [Wiktionary · retarget](${WIKT}), [targe](${WIKT_TARGE}), [albus](${WIKT_ALBUS}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}), [folk etymology](${WIKI_POP}). Method: [etymology](${etimologia}). **Sheet ≠ tracking tutorial.** Close: [Valeu !!!](${mantra}).

## Three lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Etymon** | *re-* + *target* | Lat. *re-* «back / again» + OF *targette* / *targe* (small shield) | **Aim again** — this is the origin |
| **PT object** | **alvo** | Lat. *albus* «dull white» | The **white of the centre** became the thing aimed at |
| **Glue** | **rato** (*rat*) + **alvo** (*target*) | Ear coincidence | [Folk etymology](${etimologia}) — memory, **not** genealogy |
| **Animal** | **rato** | Late Lat. *rattus* | Living being; mnemonic only |

**H-letters:** *retarget* writes **re-** + *t…*. The glue must swap *e* for *a* to make *rat*. That swap already shows it is **not** the origin.

## Object *alvo* — *albus*

Portuguese *alvo* is still, in a higher register, the colour white (*pele alva*). The shooting mark had a **white** centre; the white became the name of the object. PT still says *acertar no branco* («hit the white»). English named the object from the **shield** (*targe*); Spanish fused colour and target in *blanco*; English kept the white in *blank* (*point-blank* = *de pointe en blanc*).

## Glue — rat + target ≠ etymon

The Portuguese mnemonic *rato + alvo* is a **translation** of an English ear-glue. In Portuguese, *rato + alvo* does **not** sound like *retarget*. Same mechanism as [pun](${trocadilho}) *cara+alho*: the mouth reanalyses; the etymon cuts.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Etymon *re-* + *target* (aim again). Object *alvo* via *albus* (the white of the centre). Animal *rato* as glue only — letters are *re-*, not *rat*. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **retarget** — prefijo inglés *re-* («de nuevo») + *target* («volver a apuntar»). Pedido de campo: relacionarlo con el **objeto alvo** (blanco, del lat. *albus*, el blanco del centro) y el **animal rato** (rata).

Dos salas, un soplo. El [oído pega](${orelha}): **rat** + **target** suena a **retarget**. El étimo **corta**: las letras son *re-*, no *rat*. La [rata](${animal}) no engendró el verbo; [alvo](${objetos}) es la pieza portuguesa de *target*. Objeto = el **vocablo**. No es tutorial de anuncios. No es ficha de plaga. No es el ratón del ordenador.

> Nota: [Wiktionary · retarget](${WIKT}), [targe](${WIKT_TARGE}), [albus](${WIKT_ALBUS}), [alvo](${WIKT_ALVO}), [rato](${WIKT_RATO}), [etimología popular](${WIKI_POP}). Método: [etimología](${etimologia}). **Ficha ≠ tutorial de tracking.** Cierre: [¡Valeu !!!](${mantra}).

## Tres linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Étimo** | *re-* + *target* | lat. *re-* + ant. fr. *targe* (escudo pequeño) | **Apuntar de nuevo** — esta es la origen |
| **Objeto PT** | **alvo** | lat. *albus* «blanco mate» | El **blanco del centro** viró el objeto |
| **Cola** | **rato** (*rat*) + **alvo** (*target*) | coincidencia de oído | [Etimología popular](${etimologia}) — memoria, **no** genealogía |
| **Animal** | **rato** | lat. tardío *rattus* | Ser vivo; solo ancla |

**H-letras:** *retarget* escribe **re-**. La cola cambia la *e* por *a* para hacer *rat*. Ese salto ya denuncia: **no es el origen**.

El portugués *alvo* sigue siendo, en registro alto, el color blanco. El español fundió color y objeto en *blanco*. El inglés nombró el objeto desde el **escudo** (*targe*) y guardó el blanco en *blank* (*point-blank*).

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Étimo *re-* + *target* (apuntar de nuevo). Objeto *alvo* vía *albus* (el blanco del centro). Animal *rato* solo como cola — las letras son *re-*, no *rat*. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildRetargetPost() {
  const { body, contentEn, contentEs } = buildRetargetBodies();
  const seriesOrder = pickOrder('inspecao-palavra-retarget', 290);
  return makePalavra({
    title: 'Inspeção: Retarget — re- + alvo; a orelha cola o rato; ≠ tutorial de anúncio',
    titleEn: 'Inspection: Retarget — re- + target; the ear glues the rat; ≠ ads tutorial',
    titleEs: 'Inspección: Retarget — re- + blanco; el oído pega la rata; ≠ tutorial de anuncio',
    excerpt:
      'Palavras: retarget (re- + target) — voltar a apontar ao alvo; cola rato+alvo (rat+target) ≠ étimo; objecto alvo (albus); animal rato; Valeu !!!',
    excerptEn:
      'Words: retarget (re- + target) — aim again at the target; rat+target glue ≠ etymon; object alvo (albus); animal rato; Valeu !!!',
    excerptEs:
      'Palabras: retarget (re- + target) — apuntar de nuevo al blanco; cola rata+blanco ≠ étimo; objeto alvo (albus); animal rato; ¡Valeu !!!',
    slug: 'inspecao-palavra-retarget',
    date: '2026-08-24T01:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Retarget · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRetargetPost,
  buildRetargetBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
