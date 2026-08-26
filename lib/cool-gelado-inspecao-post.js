'use strict';

/**
 * Inspeção Palavras · Cool Gelado
 * Derivação de Legal !!! (eixo gíria BR «bacana»)
 * Cadeia: legal (BR) → cool (EN elogio) → cool (EN térmico) → gelado (PT)
 * ≠ eixo jurídico de legal · ≠ gelo · ≠ congelado · ≠ sorvete de marca
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cool-gelado-palavra-cover.jpg';
const WIKI_COOL = 'https://en.wiktionary.org/wiki/cool';
const WIKI_GELADO = 'https://pt.wiktionary.org/wiki/gelado';
const WIKI_GELAR = 'https://pt.wiktionary.org/wiki/gelar';
const WIKI_GELU = 'https://en.wiktionary.org/wiki/gelu#Latin';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem' && /^inspecao-palavra-/.test(p.slug || ''))
        .map((p) => Number(p.seriesOrder) || 0)
    );
    let n = start;
    while (taken.has(n) && n < 240) n += 1;
    seriesOrder = n;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemCoolPt() {
  return `Legal! — peito.
Cool! — a mesma festa, outra boca.
Gelado — o ar, não o elogio.

Quem traduz o calor da gíria
pelo termómetro
bebe gelo e chama isso de festa.

A lei fica no Legal da lex.
O bacana fica no Legal da rua.
O fresco fica no gelado da língua.

Três geladeiras.
Não misturar as chaves.
Valeu !!!`;
}

function poemCoolEn() {
  return `Legal! — the chest.
Cool! — the same party, another mouth.
Gelado — the air, not the praise.

Whoever translates slang warmth
with a thermometer
drinks ice and calls it a feast.

Law stays in Legal from lex.
“Nice” stays in street Legal.
The chill stays in Portuguese gelado.

Three fridges.
Don’t mix the keys.
Valeu !!!`;
}

function poemCoolEs() {
  return `¡Legal! — pecho.
¡Cool! — la misma fiesta, otra boca.
Gelado — el aire, no el elogio.

Quien traduce el calor de la jerga
con el termómetro
bebe hielo y lo llama fiesta.

La ley queda en Legal de lex.
Lo bacán queda en el Legal de la calle.
Lo fresco queda en el gelado de la lengua.

Tres neveras.
No mezclar las llaves.
¡Valeu !!!`;
}

function buildCoolGeladoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-cool-gelado.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const ilicito = '/posts/post-inspecao-palavra-ilicito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const calorFrio = '/posts/post-inspecao-palavra-calor-frio.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const congelado = '/posts/post-inspecao-palavra-congelado.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const inverno = '/posts/post-inspecao-palavra-inverno.html';
  const incrivel = '/posts/post-inspecao-palavra-incrivel.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial de **[Cool Gelado](${self})** — **derivação** da ficha-mãe **[Legal !!!](${legal})**, no eixo da **gíria BR «bacana»**, não no eixo da *lex*. Pedido de campo: *inspeção da palavra cool gelado, derivação de Legal!!!*. Esta ficha cobre a **cadeia de tradução**, os **dois ofícios do inglês *cool*** (elogio × temperatura) e o **português *gelado*** (adj. térmico / PT-PT «sorvete»), sem fundir lei, festa e termómetro.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · cool](${WIKI_COOL}), [Wikcionário · gelado](${WIKI_GELADO}), [gelar](${WIKI_GELAR}), lat. [*gelū*](${WIKI_GELU}), mãe [Legal](${legal}), série [Palavras](${hub}). **Ficha ≠ marca de gelado, ≠ cardápio, ≠ parecer jurídico, ≠ manual de climatização.** Sem afiliação comercial.

**Gatilho:** *parabbra / palavra cool gelado* · *cool gelado* · *gelado* como eco de *Legal!* → lema **cool gelado**. O eixo jurídico de *legal* continua na [ficha-mãe](${legal}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Lema | **cool gelado** (par de derivação) |
| Peças | ing. *cool* · PT *gelado* |
| Classe | *cool*: adj. / interjeição EN · *gelado*: adj. / subst. (PT-PT: gelado = sorvete) |
| Étimo *cool* | Ingl. ant. *cōl* ← protogerm. *kōlaz* «frio» — confiança: **alta** |
| Étimo *gelado* | Part. de *gelar* ← lat. *gelāre* ← *gelū* «geada, gelo» — confiança: **alta** |
| Mãe | **[Legal !!!](${legal})** — só o polo **gíria «bacana»** |
| Tipo BudGanja | Palavra — derivação slang × falso amigo térmico |
| Elo térmico | [calor × frio](${calorFrio}) · [gelo](${gelo}) · [congelado](${congelado}) · [água](${agua}) |
| Elo elogio | [Legal](${legal}) · [incrível](${incrivel}) · [genial](${genial}) |
| Elo ofício | [verdade](${verdade}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Fonte | [cool](${WIKI_COOL}) · [gelado](${WIKI_GELADO}) |
| Data | ${inspected} |

**O que é o objecto:** não uma marca. É o **trocadilho de ofício**: o brasileiro diz **Legal!** (= bacana); o inglês responde **Cool!**; *cool* também significa **fresco / frio**; o português nomeia esse frio com **gelado**. A ficha inspeciona a **ponte** — e corta o curto-circuito.

## 2. Hipóteses e método

**H1:** *cool gelado* **deriva** de [Legal](${legal}) pelo eixo **gíria**, não pelo eixo **lei**.  
**H2:** inglês *cool* tem **dois ofícios estáveis** — temperatura (chão etimológico) e elogio / compostura (expansão moderna).  
**H3:** PT *gelado* herda *gelū* — qualidade **muito fria** / estado gelado; em PT europeu também o **sorvete**.  
**H4:** traduzir *Legal!* → *That's cool!* → *Isso é gelado!* é **falso amigo de volta** — mistura festa com termómetro.  
**H5:** [gelo](${gelo}) é matéria; [congelado](${congelado}) é estado (mar Tamara); *gelado* nesta ficha é o **grau + o eco da gíria**.  
**H6:** [Valeu !!!](${mantra}) fecha com a **ferramenta certa** — bacana, fresco ou lícito, cada um na sua sala.

Passos: (1) cadeia a partir de Legal; (2) dois *cool*; (3) *gelado* ≠ gelo ≠ congelado; (4) armadilhas de tradução; (5) rede e limites.

## 3. A cadeia — derivação de Legal !!!

Pedido de campo: *derivação de Legal!!!*. O laboratório lê **quatro degraus**, sem empurrar a *lex* para o copo:

| Degrau | Palavra | Eixo | O que **não** é |
|--------|---------|------|-----------------|
| **0** | [Legal](${legal}) ← lat. *legālis* | **Lei** / lícito | Gíria |
| **1** | [Legal!](${legal}) | **Gíria BR** «bacana / ok / massa» | Parecer jurídico |
| **2** | **Cool!** | Tradução EN do degrau 1 — elogio / compostura | *legal* inglês (só jurídico) |
| **3** | **cool** | Chão térmico EN — «fresco, não quente» | Elogio |
| **4** | **gelado** | Tradução PT do degrau 3 — muito frio / PT-PT sorvete | «Legal!» |

**Regra de derivação:** descer **1 → 2 → 3 → 4** é literacia. Arrastar o **degrau 0** (lei) para o gelado é o mesmo erro que a mãe já corta: «acho legal (bacana) → logo é legal (lícito)».

> **Legal !!!** —gíria→ **Cool!** —sentido térmico→ **gelado**.  
> A *lex* / lei fica no degrau 0. O inglês *legal* **não** é *cool*.

O inglês *legal* **não** entra nesta ponte: quase só jurídico, como a [ficha-mãe](${legal}) já fixou. *Cool* é o **empréstimo certo** do elogio BR — e, ao mesmo tempo, a **porta do frio**.

## 4. Dois ofícios de *cool*

| Ofício | Exemplo | Bom no lab | Mau no lab |
|--------|---------|------------|------------|
| **Térmico** (étimo) | *cool water*, *cool breeze* | Nomear grau — par [calor × frio](${calorFrio}) | Fingir que «cool!» elogia a temperatura |
| **Compostura** | *keep your cool* | Sangue-frio ≠ gelo Tamara | Colar [congelado](${congelado}) sem aviso |
| **Elogio / estilo** | *That's cool!* ≈ [Legal!](${legal}) | Traduzir o peito | Traduzir por «é lícito» ou por «está gelado» |
| **Marca / pose** | *cool* como lifestyle | Detectar o vazio | Comprar a pose sem [gesto](${gesto}) |

**Veredicto *cool*:** o frio é o **chão**; o elogio é **metáfora estabilizada** (séc. XX, jazz / inglês afro-americano: manter-se fresco = estilo). No BudGanja, *cool* **bom** = eixo nomeado. *Cool* **mau** = uma palavra a tapar três salas.

## 5. *Gelado* — o que é e o que não é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **gelado** (adj.) | «O mesmo que frio» | Grau **alto** de frio — mais perto do gelo que do fresco ameno |
| **gelado** (PT-PT subst.) | «Gelo para comer» | **Sorvete** em Portugal; no BR diz-se sobretudo *sorvete* / picolé |
| **«Fiquei gelado»** | Temperatura | Figura: susto, choque — peito, não termómetro |
| **[Gelo](${gelo})** | Sinónimo | Matéria (água sólida) — palco Tamara / [inverno](${inverno}) |
| **[Congelado](${congelado})** | Sinónimo | Estado do mar preso — *ficar*, não elogio |
| **[Frio](${calorFrio})** | Clone | Qualidade no par calor; *gelado* é um **ponto** dessa escala |
| **Cool gelado (lema)** | Marca de copo | **Derivação lexical** de [Legal!](${legal}) |

**Cortes:** esta ficha **não** inspecciona SKU, açúcar de gôndola nem fábrica de sorvete. Quem quiser derivado alimentar vai à prateleira de [derivados](/biblioteca/inspecoes/#inspecoes-derivados) — outra sala.

## 6. Armadilhas de tradução

| Frase | Leitura certa | Leitura falsa |
|-------|---------------|---------------|
| «Que **legal!**» | Gíria BR — [Legal](${legal}) degrau 1 | «É lícito» · «está gelado» |
| *That's **cool**!* | Elogio EN ≈ Legal! | Inglês *legal* · PT *gelado* |
| «Água **gelada**» | Térmico — copo frio | Elogio («água bacana») |
| «Sorvete / **gelado**» | PT-PT alimento; BR *sorvete* | A ficha-mãe Legal |
| «Keep **cool**» | Compostura | [Congelado](${congelado}) do Ártico |
| «Acho **legal**, então pode» | Mistura peito + lei | Armadilha já cortada na [mãe](${legal}) |

**Literacia:** se a boca veio de **Legal!**, pergunta: estou no **peito**, na **lei**, ou no **copo**? Só uma resposta por frase.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **[Legal !!!](${legal})** | Ficha-mãe — lei × gíria; daqui sai a derivação |
| [Ilegal](${ilegal}) · [ilícito](${ilicito}) | Polo jurídico — **não** viajar no gelado |
| [Incrível](${incrivel}) · [genial](${genial}) | Escala de elogio BR (acima de «legal/cool») |
| [Calor × frio](${calorFrio}) | Qualidade térmica — o termómetro |
| [Gelo](${gelo}) · [congelado](${congelado}) · [água](${agua}) · [inverno](${inverno}) | Matéria / estado / estação — outra sala |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo da polissemia e do calque |
| [Verdade](${verdade}) · [gesto](${gesto}) · [risco](${risco}) · [caminho](${caminho}) | Ofício: nomear o eixo |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho vivo |

### Como ler

1. Entrar pela mãe **[Legal !!!](${legal})** se a dúvida for lei × bacana.  
2. Entrar **aqui** se a boca passou por *cool* e escorregou para o frio.  
3. Se for matéria de gelo / Ártico, ir a [gelo](${gelo}) / [congelado](${congelado}).  
4. Se for grau quente/frio da tenda, ir a [calor × frio](${calorFrio}).  
5. Fechar com [Valeu !!!](${mantra}).

## Poema Vida

\`\`\`poem
${poemCoolPt()}
\`\`\`

## 8. Limites

- Não é ficha de produto, marca, receita ou calorias de gelado.  
- Não substitui [Legal](${legal}) no eixo jurídico.  
- Não funde *gelado* com [gelo](${gelo}) nem com [congelado](${congelado}).  
- Não moraliza o anglicismo *cool* no português BR — inspeciona o **calque**.  
- PT-PT *gelado* (sorvete) ≠ BR *gelado* (muito frio) — os dois cabem; não são o lema da mãe.

## Status

**Aprovado** — **cool gelado** fichado como **derivação** de [Legal !!!](${legal}) (eixo gíria): *cool* (elogio EN × térmico) → *gelado* (PT); cortes gelo / congelado / lei; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Legal !!!](${legal}) · [▶ Calor × frio](${calorFrio}) · [▶ Gelo](${gelo}) · [▶ Congelado](${congelado}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[Cool Gelado](${self})** — a **derivation** of **[Legal !!!](${legal})** on the Brazilian slang axis (“cool / nice”), not the *lex* axis. Field request: *cool gelado as a derivation of Legal!!!*. Covers the **translation chain**, English *cool* (praise × temperature), and Portuguese *gelado* (ice-cold / PT-PT “ice cream”).

> Note: [cool](${WIKI_COOL}), [gelado](${WIKI_GELADO}). Not a brand review, not legal advice, not HVAC.

## 1. Object

| Field | Value |
|-------|-------|
| Headword | **cool gelado** |
| Mother sheet | [Legal !!!](${legal}) — slang pole only |
| *cool* | OE *cōl* “cold” → modern praise / composure |
| *gelado* | From *gelar* ← Lat. *gelū* |
| Date | ${inspected} |

**Object:** the **craft pun**. BR **Legal!** = nice; English answers **Cool!**; *cool* also means chilly; Portuguese names that chill **gelado**. Inspect the bridge; cut the short circuit.

## 2–3. Chain from Legal !!!

| Step | Word | Axis |
|------|------|------|
| 0 | [Legal](${legal}) | Law / lawful |
| 1 | Legal! | BR slang |
| 2 | Cool! | EN praise (translation of 1) |
| 3 | cool | EN temperature (etymon) |
| 4 | gelado | PT thermal (translation of 3) |

English *legal* does **not** join this bridge. Dragging step 0 (law) into the ice-cream cup repeats the mother trap: “I find it legal (cool) → therefore it is legal (lawful).”

## 4–5. Two *cool*s · *gelado* cuts

*Cool* thermal ≠ *cool* praise. *Gelado* ≠ [gelo](${gelo}) (ice as matter) ≠ [congelado](${congelado}) (Tamara’s locked sea). PT-PT *gelado* = ice cream; BR usually *sorvete*.

## 6. Translation traps

“Que legal!” ≠ ice-cold. *That's cool!* ≠ Portuguese *gelado*. “Água gelada” ≠ slang praise. Literacy = one room per sentence: **chest**, **law**, or **glass**.

\`\`\`poem
${poemCoolEn()}
\`\`\`

## Status

**Approved** — derivation of [Legal !!!](${legal}) (slang pole); *cool* praise × thermal; *gelado* cut from ice/frozen/law; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Legal !!!](${legal}) · [▶ Heat × cold](${calorFrio}) · [▶ Ice](${gelo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **[Cool Gelado](${self})** — **derivación** de **[Legal !!!](${legal})** en el eje de la jerga BR («bacán»), no en el eje de la *lex*. Pedido de campo: *cool gelado como derivación de Legal!!!*. Cubre la **cadena de traducción**, el inglés *cool* (elogio × temperatura) y el portugués *gelado* (muy frío / PT-PT «helado»).

> Nota: [cool](${WIKI_COOL}), [gelado](${WIKI_GELADO}). Ficha ≠ marca, ≠ dictamen jurídico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Lema | **cool gelado** |
| Ficha madre | [Legal !!!](${legal}) — solo el polo jerga |
| *cool* | Ingl. ant. *cōl* «frío» → elogio / compostura |
| *gelado* | De *gelar* ← lat. *gelū* |
| Fecha | ${inspected} |

**Objeto:** el **calambur de oficio**. BR **¡Legal!** = bacán; el inglés responde **Cool!**; *cool* también es fresco; el portugués nombra ese frío **gelado**. Inspeccionar el puente; cortar el cortocircuito.

## 2–3. Cadena desde Legal !!!

| Peldaño | Palabra | Eje |
|---------|---------|-----|
| 0 | [Legal](${legal}) | Ley / lícito |
| 1 | ¡Legal! | Jerga BR |
| 2 | Cool! | Elogio EN (traducción de 1) |
| 3 | cool | Temperatura EN (étimo) |
| 4 | gelado | Térmico PT (traducción de 3) |

El inglés *legal* **no** entra en este puente. Arrastrar el peldaño 0 (ley) al vaso repite la trampa de la madre.

## 4–6. Cortes y trampas

*Cool* térmico ≠ *cool* elogio. *Gelado* ≠ [gelo](${gelo}) ≠ [congelado](${congelado}). PT-PT *gelado* = helado; BR *sorvete*. «Que legal!» ≠ «está helado». Literacia = **pecho**, **ley** o **vaso**.

\`\`\`poem
${poemCoolEs()}
\`\`\`

## Estado

**Aprobada** — derivación de [Legal !!!](${legal}) (polo jerga); *cool* elogio × térmico; *gelado* cortado de hielo/congelado/ley; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Legal !!!](${legal}) · [▶ Calor × frío](${calorFrio}) · [▶ Hielo](${gelo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCoolGeladoPost() {
  const { body, contentEn, contentEs } = buildCoolGeladoBodies();
  return makePalavra({
    title: 'Inspeção: Cool Gelado — derivação de Legal !!! (cool × gelado)',
    titleEn: 'Inspection: Cool Gelado — derivation of Legal !!! (cool × gelado)',
    titleEs: 'Inspección: Cool Gelado — derivación de Legal !!! (cool × gelado)',
    excerpt:
      'Palavras: «cool gelado» deriva de Legal !!! (gíria «bacana») — inglês cool (elogio × frio) → PT gelado; não é lei, não é gelo Tamara, não é marca de sorvete.',
    excerptEn:
      'Words: “cool gelado” derives from Legal !!! (slang “nice”) — English cool (praise × cold) → PT gelado; not law, not Tamara ice, not an ice-cream brand.',
    excerptEs:
      'Palabras: «cool gelado» deriva de Legal !!! (jerga «bacán») — inglés cool (elogio × frío) → PT gelado; no es ley, no es hielo Tamara, no es marca de helado.',
    slug: 'inspecao-palavra-cool-gelado',
    date: '2026-08-24T13:00:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-cool-gelado', 97),
    seriesLabel: 'Cool Gelado · palavra',
    coverImage: COVER,
    sourceUrl: WIKI_COOL,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCoolGeladoPost,
  buildCoolGeladoBodies
};
