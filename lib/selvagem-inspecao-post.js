'use strict';

/**
 * Inspeção Palavras · selvagem
 * Eixos: silva / silvaticus · selvagem × domesticado · natureza ·
 * «bicho selvagem» · planta / animal / inseto · sem romantizar dano
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSelvagemBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const animais = '/animais/';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const rasmussen = '/posts/post-inspecao-richard-rasmussen.html';
  const rasmussenCanal = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const rasmussenVideos = '/videos/?channel=rasmussen';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/selvagem';
  const wikiSilva = 'https://pt.wiktionary.org/wiki/silva#Latim';
  const wikiSilvaticus = 'https://en.wiktionary.org/wiki/silvaticus';

  const body = `## Escopo

Inspeção editorial da palavra **selvagem** — o que vem da **silva** (mata, bosque) e o que a fala BR faz com isso: natureza, contraste com o **domesticado**, e o peito («bicho selvagem»). Esta ficha cobre o **objeto** lexical, o **étimo** (*silvaticus* ← *silva*), o eixo **selvagem × domesticado** no lab ([planta](${planta}) · [animal](${animal}) · [inseto](${inseto})), e o fecho [Valeu !!!](${mantra}). Tom: laboratório quente — **respeito à natureza sem romantizar dano**. Tipografia de entrada: *silvaogsn* → **selvagem** (o *silva* do teclado já apontava o bosque).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · selvagem](${wiki}), [silva (latim)](${wikiSilva}), [silvaticus](${wikiSilvaticus}), uso oral BR. **Ficha ≠ tratado de etologia nem manifesto «volta à natureza».** Sem afiliação comercial de «eco-turismo» nem de caça. Não romantiza violência, praga nem risco real.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **selvagem** |
| Classe | Adjectivo (também substantivado: «o selvagem») |
| Étimo (trabalho) | Lat. *silvaticus* («da silva / do bosque») ← *silva* («mata, floresta») — confiança: alta |
| Família | *selva* · *silvestre* · *silvícola* · *asselvajar* · *domesticação* (antónimo de ofício) |
| Cognatos | esp. *salvaje* · fr. *sauvage* · it. *selvaggio* · ing. *savage* (via fr.) · lat. *silvaticus* |
| Tipo BudGanja | Palavra — natureza × cultivo × peito |
| Elo seres | [planta](${planta}) · [animal](${animal}) · [inseto](${inseto}) · hubs [Plantas](${plantas}) · [Animais](${animais}) |
| Elo relação | [simbiose](${simbiose}) — viver *com* o que não foi «feito para nós» |
| Elo ofício | [cultivo](${cultivo}) · [gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [medo](${medo}) |
| Elo língua | [língua portuguesa](${lingua}) · [Guia](${guia}) |
| Fonte | [Wikcionário · selvagem](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que marca o que **não foi domesticado** — ou o que ainda cheira a mata. No lab: planta espontânea, animal livre, inseto fora do insectário; na rua: «bicho selvagem», «festa selvagem», «ideia selvagem». A ficha fixa o núcleo **silva → selvagem** sem apagar o figurado.

## 2. Origem e forma — *silva* → *silvaticus* → selvagem

| Camada | Leitura | Nota |
|--------|---------|------|
| **Lat. *silva*** | Mata, bosque, floresta | O «lugar» de onde a palavra nasce |
| **Lat. *silvaticus*** | «Da silva» — silvestre | Étimo clássico do adjectivo |
| **PT *selvagem*** | Forma viva BR/PT | Também *selva* (substantivo) |
| **PT *silvestre*** | Vizinho culto / botânico | Mesma família; registo mais técnico |
| **Ing. *savage*** | Via francesa; carga colonial e pejorativa | **Não** é sinónimo neutro — mapear com cuidado |

**H1:** *selvagem* herda a *silva* — nome de **lugar natural**, não de «monstro».  
**H2:** *silvestre* e *selvagem* são **irmãos**; o uso escolhe o registo.  
**H3:** *savage* (ing.) carrega história de estigma; a ficha PT não importa essa carga às cegas.

**Veredicto etimológico:** *selvagem* = palavra do **bosque** que virou contraste com o domesticado — confiança alta no étimo; o figurado e o pejorativo são camadas sociais a inspecionar.

## 3. Selvagem × domesticado — no lab BudGanja

No ofício, **selvagem** não é elogio automático nem insulto. É mapa:

| Eixo | Selvagem (leitura) | Domesticado (leitura) | Bom × mau |
|------|--------------------|------------------------|-----------|
| **[Planta](${planta})** | Espontânea, ruderale, fora do canteiro | Cultivada, seleccionada, cuidada | Bom: nomear o estado · Mau: «selvagem = inútil» ou «cultivada = falsa» |
| **[Animal](${animal})** | Livre, não habituado ao humano | Criado, treinado, companheiro | Bom: respeito à natureza do ser · Mau: romantizar agressão ou negar [risco](${risco}) |
| **[Inseto](${inseto})** | Fora do insectário; teia viva | Criado / usado no controlo | Bom: ver função ecológica · Mau: «todo selvagem é praga» |
| **Peito («bicho selvagem»)** | Energia crua, teimosia, impulso | Contido, educado, previsível | Bom: metáfora com humor · Mau: desculpa para dano |

**H-ecologia:** o lab **cultiva** ([cultivo](${cultivo})) sem odiar o selvagem; o selvagem **existe** sem anular o ofício.  
**Veredicto:** inspecionar o **estado** (livre × cuidado) e o **gesto** — [simbiose](${simbiose}) pede viver *com*, não só domesticar ou destruir.

## 4. Cultura e língua — da mata ao peito

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Biológico / escolar** | «Espécie selvagem» / «população silvestre» | Bom: literacia · Mau: lista sem habitat |
| **Quotidiano BR** | «Tem um gato selvagem no terreno» | Bom: observar · Mau: pânico ou crueldade |
| **«Bicho selvagem»** | Energia, raiva, teimosia afectuosa | Bom: carinho com limite · Mau: romantizar violência |
| **Festivo / gíria** | «Festa selvagem», «ideia selvagem» | Bom: intensidade · Mau: apagar responsabilidade |
| **Estigma histórico** | «Povos selvagens» (colonial) | Mau mapa — a palavra aqui **fere**; preferir nomes próprios e [verdade](${verdade}) |

**Veredicto cultural:** *selvagem* segura natureza e metáfora; o ofício escolhe o tom — curiosidade e respeito primeiro; [medo](${medo}) e [risco](${risco}) quando forem reais, sem romance de dano.

## 5. Para que serve · Valeu !!!

| Finalidade | Leitura |
|------------|---------|
| **Nomear o estado** | Selvagem ≠ «mau»; domesticado ≠ «falso» |
| **Cruzar com o lab** | [Planta](${planta}) · [animal](${animal}) · [inseto](${inseto}) · [simbiose](${simbiose}) |
| **Não romantizar dano** | Energia «selvagem» não justifica ferir gente, bicho ou planta |
| **Ofício na margem** | Observar → [gesto](${gesto}) → [Valeu !!!](${mantra}) |
| **Lembrar a silva** | Tipografia *silvaogsn* → a mata no teclado |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor cuidado **com** o que é livre e **com** o que se cultiva, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Selvagem = puro / superior» **ou** «selvagem = inimigo» = mapas incompletos |

**Veredicto:** Valeu !!! **na margem entre silva e canteiro** — literacia da palavra, respeito ao vivo, [gesto](${gesto}) quando o risco for real.

## Hipóteses (síntese)

**H1:** *selvagem* ← lat. *silvaticus* ← *silva* (bosque).  
**H2:** núcleo = **não domesticado** / da natureza; figurado = energia, intensidade.  
**H3:** elos = [planta](${planta}) · [animal](${animal}) · [inseto](${inseto}) · [simbiose](${simbiose}).  
**H4:** anti-romantização = dano e [risco](${risco}) entram no mapa.  
**H5:** fecho = [Valeu !!!](${mantra}) entre mata e cultivo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Planta](${planta}) · [Plantas](${plantas}) | Ser vivo vegetal — espontâneo × cultivado |
| [Animal](${animal}) · [Animais](${animais}) | Ser vivo — livre × companheiro / criação |
| [Richard Rasmussen](${rasmussen}) · [canal Selvagem](${rasmussenCanal}) · [Vídeos](${rasmussenVideos}) | Ofício de ecrã com [respeito](${respeito}) devido — o handle leva esta palavra; pessoa ≠ canal |
| [Inseto](${inseto}) | Vida miúda da teia — nem só praga |
| [Simbiose](${simbiose}) · [Erva](${erva}) | Viver *com*; nome popular da planta |
| [Cultivo](${cultivo}) · [Vida](${vida}) · [Diário](${diario}) | Ofício, conto, margem |
| [Risco](${risco}) · [Medo](${medo}) · [Verdade](${verdade}) | Quando o selvagem pede cuidado, não romance |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo lexical |

## Limites

- Não substitui etologia, manejo de fauna nem protocolo agronómico.  
- Não romantiza agressão, praga, caça ilegal nem risco real.  
- Não usa *selvagem* como rótulo de povos ou pessoas — essa carga colonial fica **rejeitada** na ficha.  
- *Savage* (ing.) ≠ tradução neutra de *selvagem*.

## Status

**Aprovado** — **selvagem** fichado: *silva* / *silvaticus*; selvagem × domesticado; elos planta · animal · inseto; «bicho selvagem» com limites; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Planta](${planta}) · [▶ Animal](${animal}) · [▶ Inseto](${inseto}) · [▶ Simbiose](${simbiose}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **selvagem** (“wild”) — from Lat. *silva* / *silvaticus* to Brazilian use: nature, wild vs domesticated, and “bicho selvagem.” Warm lab tone. Links: [planta](${planta}), [animal](${animal}), [inseto](${inseto}), [simbiose](${simbiose}). Close: [Valeu !!!](${mantra}). Does **not** romanticize harm. Typo trail: *silvaogsn* → **selvagem**.

> Method note: [Wiktionary · selvagem](${wiki}), [silva](${wikiSilva}), [silvaticus](${wikiSilvaticus}). Not an ethology treatise.

## Object

| Field | Value |
|-------|-------|
| Word | **selvagem** |
| Etymon | Lat. *silvaticus* ← *silva* (“forest”) |
| Links | [planta](${planta}) · [animal](${animal}) · [inseto](${inseto}) · [simbiose](${simbiose}) |
| Date | ${inspected} |

## Wild × domesticated

In the lab: spontaneous [plant](${planta}), free [animal](${animal}), [insect](${inseto}) in the living web — vs cultivated / companion / managed. Good map names the **state**; bad map says “wild = pure” or “wild = enemy.”

## Culture

School biology, backyard talk, affectionate “bicho selvagem,” party slang — and a colonial stigma when used against peoples (**rejected** here). English *savage* is not a neutral twin.

## Valeu !!!

Literacy on the edge between forest and bed — [Valeu !!!](${mantra}) with respect and real [risk](${risco}) in view.

## Status

**Approved** — selvagem; silva etymon; plant/animal/insect links; no romance of harm; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Plant](${planta}) · [▶ Animal](${animal}) · [▶ Insect](${inseto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **selvagem** («salvaje») — de lat. *silva* / *silvaticus* al uso BR: naturaleza, salvaje × domesticado, «bicho selvagem». Tono de lab. Vínculos: [planta](${planta}), [animal](${animal}), [inseto](${inseto}), [simbiose](${simbiose}). Cierre: [¡Valeu !!!](${mantra}). **Sin** romantizar daño. Tipografía: *silvaogsn* → **selvagem**.

> Nota: [Wikcionario · selvagem](${wiki}), [silva](${wikiSilva}), [silvaticus](${wikiSilvaticus}). No es tratado de etología.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **selvagem** |
| Étimo | Lat. *silvaticus* ← *silva* («bosque») |
| Vínculos | [planta](${planta}) · [animal](${animal}) · [inseto](${inseto}) · [simbiose](${simbiose}) |
| Fecha | ${inspected} |

## Salvaje × domesticado

En el lab: [planta](${planta}) espontánea, [animal](${animal}) libre, [insecto](${inseto}) en la red — frente a cultivado / compañero / manejado. Buen mapa nombra el **estado**; mal mapa dice «salvaje = puro» o «salvaje = enemigo».

## Cultura

Biología escolar, patio, «bicho selvagem», jerga festiva — y estigma colonial contra pueblos (**rechazado** aquí). Ingl. *savage* no es gemelo neutro.

## ¡Valeu !!!

Literacia en el borde entre selva y cantero — [¡Valeu !!!](${mantra}) con respeto y [riesgo](${risco}) real a la vista.

## Estado

**Aprobada** — selvagem; étimo silva; vínculos planta/animal/insecto; sin romance del daño; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Planta](${planta}) · [▶ Animal](${animal}) · [▶ Insecto](${inseto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSelvagemPost() {
  const { body, contentEn, contentEs, wiki } = buildSelvagemBodies();
  let seriesOrder = 74;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-selvagem');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 200) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 74 */
  }

  return makePalavra({
    title:
      'Inspeção: Selvagem — silva, natureza e o limiar do domesticado',
    titleEn:
      'Inspection: Selvagem — silva, nature, and the edge of the domesticated',
    titleEs:
      'Inspección: Selvagem — silva, naturaleza y el umbral de lo domesticado',
    excerpt:
      'Palavras: «selvagem» (lat. silvaticus ← silva) — natureza, selvagem × domesticado, «bicho selvagem»; elos planta/animal/inseto; sem romantizar dano; Valeu !!!',
    excerptEn:
      'Words: “selvagem” (Lat. silvaticus ← silva) — nature, wild vs domesticated, “bicho selvagem”; plant/animal/insect links; no romance of harm; Valeu !!!',
    excerptEs:
      'Palabras: «selvagem» (lat. silvaticus ← silva) — naturaleza, salvaje × domesticado, «bicho selvagem»; vínculos planta/animal/insecto; sin romantizar daño; ¡Valeu !!!',
    slug: 'inspecao-palavra-selvagem',
    date: '2026-08-03T23:55:00.000Z',
    seriesOrder,
    seriesLabel: 'Selvagem · palavra',
    coverImage: '/imagens/inspecoes/selvagem-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSelvagemPost,
  buildSelvagemBodies
};
