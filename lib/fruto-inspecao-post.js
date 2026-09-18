'use strict';

/**
 * Inspeção Palavras · fruto
 * Eixos: botânico (fructus) · plural frutos · fruta×fruto BR ·
 * figurado «frutos do trabalho» · elos plantas / simbiose · Faça o melhor!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function slugExists(slug) {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    return posts.some((p) => p.slug === slug);
  } catch (_) {
    return false;
  }
}

function buildFrutoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubFrutos = '/biblioteca/inspecoes/#inspecoes-frutos';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const plantas = '/plantas/';
  const cultivo = '/guia/cultivo-basico.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const arvore = '/posts/post-inspecao-palavra-arvore-da-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const pesquisa =
    '/posts/post-pesquisa-insumos-organicos-vs-industrializados-fruto.html';
  const abacate = '/posts/post-inspecao-planta-abacate.html';
  const banana = '/posts/post-inspecao-planta-banana.html';
  const wiki = 'https://pt.wiktionary.org/wiki/fruto';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Fruto';
  const wikiLat = 'https://en.wiktionary.org/wiki/fructus#Latin';

  const plantaPalavra = slugExists('inspecao-palavra-planta')
    ? '/posts/post-inspecao-palavra-planta.html'
    : plantas;

  const body = `## Escopo

Inspeção editorial da palavra **fruto** — lema do português (lat. *fructus*) para o **órgão botânico** que carrega a semente, o **plural quotidiano frutos**, o contraste útil com **fruta**, e o sentido figurado vivo no BR (**«frutos do trabalho»**). Esta ficha cobre o **objeto lexical**, os **eixos de sentido**, e o fecho [Faça o melhor!](${mantra}). Elos: [plantas](${plantas}) / [hub frutos](${hubFrutos}), [simbiose](${simbiose}), [animal](${animal}), [árvore da vida](${arvore}), [pesquisa · insumos × fruto](${pesquisa}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · fruto](${wiki}), [Wikipédia · Fruto](${wikiEl}), [fructus (lat.)](${wikiLat}), série [Palavras](${hub}). **Ficha de palavra ≠ monografia de fruticultura** — as fichas de espécie ficam no [hub Plantas / frutos](${hubFrutos}); aqui inspecionamos o **vocábulo**. Sem afiliação comercial agrícola.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra (lema) | **fruto** |
| Forma pedida | **frutos** (plural) — coberta nesta ficha |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *fructus* («fruto; proveito; rendimento») ← *fruī* («desfrutar, usufruir») — confiança: alta |
| Família | *frutificar* · *frutífero* · *fruticultura* · *infrutescência* · *fruta* (vizinho culinário) · *usufruto* |
| Cognatos | esp. *fruto* · fr. *fruit* · it. *frutto* · ing. *fruit* · lat. *fructus* |
| Tipo BudGanja | Palavra — botânica × quotidiano BR × figurado |
| Elo botânico | [Plantas](${plantas}) · [hub frutos](${hubFrutos}) · [cultivo](${cultivo}) |
| Elo espécie (amostra) | [Abacate](${abacate}) · [Banana](${banana}) — só âncoras; não esgotar o catálogo |
| Elo lab | [Simbiose](${simbiose}) · [animal](${animal}) · [árvore da vida](${arvore}) |
| Elo ofício | [Caminho](${caminho}) · [criatividade](${criatividade}) · [gesto](${gesto}) · [Faça o melhor!](${mantra}) |
| Elo pesquisa | [Insumos orgânicos vs industrializados — fruto](${pesquisa}) |
| Elo língua | [Língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · fruto](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **resultado reprodutivo da planta** (semente + envoltório) e, por metáfora estável no português, o **resultado do esforço humano**. Quem pediu «frutos» pediu o plural do mesmo lema — o lab inspeciona **fruto** e mapeia o plural e o figurado no mesmo relatório.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *fructus* | Fruto; proveito; rendimento; usufruto | Alta |
| Botânica | Órgão derivado do ovário (e anexos) que contém a(s) semente(s) | Alta |
| Plural **frutos** | Vários frutos; também «os frutos» figurados | Alta (uso vivo) |
| **Fruta** (vizinho) | Uso culinário / comercial do fruto comestível doce ou ácido | Alta (norma BR escolar) |
| Figurado | «Frutos do trabalho / da pesquisa / da paciência» = resultado | Alta |
| Jurídico vizinho | *Usufruto* — gozo de bem alheio (mesmo étimo *fruī*) | Alta (rede; não foco) |
| Lab BudGanja | Fruto = encontro planta↔tempo↔espécies; figurado = [gesto](${gesto}) que amadureceu | Média–alta (mapa) |

**H1:** *fruto* herda *fructus* — **órgão** e **proveito** já conviviam no latim.  
**H2:** no BR, **fruta** puxa a mesa; **fruto** puxa a botânica e o figurado — não são «erros» um do outro.  
**H3:** «frutos do trabalho» sem [verdade](${verdade}) de processo vira slogan; com processo, é mapa do que amadureceu.

## 3. Botânica × quotidiano BR

| Eixo | Exemplo | Bom × mau no lab |
|------|---------|------------------|
| **Botânico** | «O tomate é um fruto» | Bom: critério reprodutivo · Mau: ridicularizar quem diz «fruta» na cozinha |
| **Culinário (*fruta*)** | «Comprei fruta no mercado» | Bom: registo da mesa · Mau: apagar o vocábulo *fruto* |
| **Plural** | «Colheita de frutos» / «frutos maduros» | Bom: nomear o lote · Mau: confundir com «frutas» só por hábito |
| **Espécie-âncora** | [Abacate](${abacate}), [Banana](${banana}) | Bom: ficha de planta · Mau: transformar esta palavra numa lista de PR |
| **Solo / insumos** | Qualidade do fruto final | Bom: [pesquisa insumos × fruto](${pesquisa}) · Mau: milagre de rótulo sem método |
| **Simbiose** | Polinizador, solo vivo, tempo | Bom: [simbiose](${simbiose}) · Mau: fruto «de fórmula» sem elenco vivo |
| **Árvore / ciclo** | Flor → fruto → semente | Bom: [árvore da vida](${arvore}) · Mau: saltar o tempo da espécie |

### Fruto × fruta (literacia rápida)

| Situação | Preferência típica | Nota BudGanja |
|----------|-------------------|---------------|
| Aula / ficha botânica | **fruto** | Critério: semente + envoltório |
| Mercado / lanche | **fruta** | Critério: uso alimentar quotidiano |
| Figurado («do trabalho») | **frutos** (quase sempre plural) | Resultado do esforço — não «fruta do trabalho» |
| Inglês *fruit* | Cobre os dois registos | Traduzir com o eixo em jogo |

**Veredicto contraste:** inspecionar **qual ferramenta** está na frase — mesa, laboratório ou metáfora — sem moralizar o falante.

## 4. Figurado — «frutos do trabalho»

| Camada | Leitura |
|--------|---------|
| Núcleo | Resultado que **amadureceu** após esforço (tempo + cuidado) |
| Par de ofício | [Caminho](${caminho}) + [gesto](${gesto}) → fruto; [criatividade](${criatividade}) sem colheita = flor só |
| Anti-armadilha | Cobrar «frutos» sem plantar (expectativa sem processo) |
| Anti-armadilha 2 | Exibir frutos alheios como se fossem próprios ([verdade](${verdade})) |
| Lab | Relatório, cultivo, poema, ficha — cada um tem tempo de maturação |

**Leitura do inspetor:** no peito BR, *frutos* figurados pedem a mesma paciência do fruto botânico — luz, tempo, elenco vivo. O lab não romantiza a colheita: nomeia o [caminho](${caminho}).

## 5. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Nomear o órgão** | Botânica, agronomia, etnobotânica | Hub [frutos](${hubFrutos}) · [plantas](${plantas}) |
| **Separar mesa × lab** | Fruta na cozinha; fruto na ficha | Literacia sem snobismo |
| **Ligar qualidade** | Solo, insumos, pós-colheita | [Pesquisa insumos × fruto](${pesquisa}) |
| **Nomear resultado** | «Frutos do trabalho» | [Gesto](${gesto}) · [caminho](${caminho}) · [criatividade](${criatividade}) |
| **Lembrar o elenco** | Polinizador, solo, tempo | [Simbiose](${simbiose}) · [animal](${animal}) |
| **Fechar** | Depois do mapa, o acto | [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** usar **fruto / frutos** com **eixo claro** — órgão, mesa ou metáfora — e não confundir colheita com slogan.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com o tempo do fruto**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Quero os frutos já» sem planta / sem [gesto](${gesto}) |
| Par de método | [Verdade](${verdade}) · [caminho](${caminho}) · [simbiose](${simbiose}) |
| Rede viva | [Plantas](${plantas}) · [árvore da vida](${arvore}) · [Vida](${vida}) / [Diário](${diario}) |

**Veredicto:** Faça o melhor **com fruto** — nomear o órgão com rigor, a mesa com calor, o figurado com processo; colher o que plantou, sem roubar o tempo da espécie.

## 7. Rede BudGanja

| Camada | Elos |
|--------|------|
| Hub Palavras | [Palavras](${hub}) · [Guia](${guia}) |
| Hub frutos / plantas | [Inspeções · frutos](${hubFrutos}) · [Plantas](${plantas}) · [planta (hub)](${plantaPalavra}) |
| Espécies (amostra) | [Abacate](${abacate}) · [Banana](${banana}) |
| Pesquisa | [Insumos × fruto](${pesquisa}) |
| Ciclo / convívio | [Simbiose](${simbiose}) · [animal](${animal}) · [árvore da vida](${arvore}) |
| Ofício | [Caminho](${caminho}) · [gesto](${gesto}) · [criatividade](${criatividade}) · [verdade](${verdade}) |
| Fecho | [Faça o melhor!](${mantra}) · [Vida](${vida}) |

## Estado da inspeção

**Aprovada** — lema **fruto** · plural **frutos** · botânica × fruta × figurado · [pesquisa insumos](${pesquisa}) · [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Frutos (hub)](${hubFrutos}) · [▶ Plantas](${plantas}) · [▶ Simbiose](${simbiose}) · [▶ Pesquisa · fruto](${pesquisa}) · [▶ Faça o melhor!](${mantra}) · [▶ Guia](${guia}) · [▶ Acervo](${hubAll})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **fruto** (lemma; Lat. *fructus*) — botanical fruit, everyday plural **frutos**, useful contrast with culinary **fruta**, and figurative **“frutos do trabalho”** (fruits of one’s labor). Closes with [Do your best!](${mantra}). Links: [plantas](${plantas}), [fruit hub](${hubFrutos}), [simbiose](${simbiose}), [animal](${animal}), [research · inputs × fruit](${pesquisa}).

> Method note: [Wiktionary · fruto](${wiki}), [Wikipedia · Fruto](${wikiEl}), [fructus](${wikiLat}). Word sheet ≠ fruit-growing monograph — species sheets live in the [fruit hub](${hubFrutos}).

## 1. Object

| Field | Value |
|-------|-------|
| Lemma | **fruto** (covers plural **frutos**) |
| Etymon | Lat. *fructus* ← *fruī* “to enjoy / make use of” |
| Type | Botanical × everyday BR × figurative |
| Links | [plantas](${plantas}) · [simbiose](${simbiose}) · [animal](${animal}) · [Do your best!](${mantra}) |
| Sample species | [Avocado](${abacate}) · [Banana](${banana}) |
| Date | ${inspected} |

## 2. Senses

Botanical organ · plural **frutos** · culinary **fruta** · figurative result of work · lab reading (time + care + living cast).

**H1:** Latin already held organ + profit.  
**H2:** BR **fruta** ≈ table; **fruto** ≈ botany + metaphor.  
**H3:** “Fruits of labor” without process becomes slogan.

## 3. Botany × table

Name the axis: lab criterion vs kitchen register. Sample anchors only — [avocado](${abacate}), [banana](${banana}). Quality map: [organic vs industrial inputs](${pesquisa}).

## 4. Figurative

**Frutos do trabalho** = matured result after effort. Pair with [caminho](${caminho}) / [gesto](${gesto}). Trap: demand harvest without planting.

## 5. Do your best!

Best possible **with the fruit’s time**, today — rigor for the organ, warmth for the table, process for the metaphor.

## Status

**Approved** — lemma **fruto** · plural · botany × table × figurative · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Fruit hub](${hubFrutos}) · [▶ Simbiose](${simbiose}) · [▶ Research](${pesquisa}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fruto** (lema; lat. *fructus*) — órgano botánico, plural **frutos**, contraste con **fruta** culinaria, y figurado **«frutos do trabalho»** (frutos del trabajo). Cierre: [¡Haz lo mejor!](${mantra}). Vínculos: [plantas](${plantas}), [hub frutos](${hubFrutos}), [simbiose](${simbiose}), [animal](${animal}), [investigación · insumos × fruto](${pesquisa}).

> Nota: [Wikcionario · fruto](${wiki}), [Wikipedia · Fruto](${wikiEl}), [fructus](${wikiLat}). Ficha de palabra ≠ monografía de fruticultura.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Lema | **fruto** (cubre el plural **frutos**) |
| Étimo | Lat. *fructus* ← *fruī* |
| Tipo | Botánica × cotidiano BR × figurado |
| Vínculos | [plantas](${plantas}) · [simbiose](${simbiose}) · [animal](${animal}) · [¡Haz lo mejor!](${mantra}) |
| Muestra | [Aguacate](${abacate}) · [Banana](${banana}) |
| Fecha | ${inspected} |

## 2. Sentidos

Órgano botánico · plural · **fruta** de mesa · resultado del esfuerzo · lectura de lab (tiempo + cuidado).

## 3. Botánica × mesa

Nombrar el eje. Anclas: [aguacate](${abacate}), [banana](${banana}). Mapa de calidad: [insumos × fruto](${pesquisa}).

## 4. Figurado

**Frutos do trabalho** = resultado madurado. Par: [caminho](${caminho}) / [gesto](${gesto}). Trampa: exigir cosecha sin sembrar.

## 5. ¡Haz lo mejor!

Lo mejor posible **con el tiempo del fruto**, hoy.

## Estado

**Aprobada** — lema **fruto** · plural · botánica × mesa × figurado · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Hub frutos](${hubFrutos}) · [▶ Simbiose](${simbiose}) · [▶ Investigación](${pesquisa}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFrutoPost() {
  const { body, contentEn, contentEs, wiki } = buildFrutoBodies();
  let seriesOrder = 49;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-fruto');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 120) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 49 */
  }

  return makePalavra({
    title:
      'Inspeção: Fruto — fructus, frutos e os frutos do trabalho',
    titleEn:
      'Inspection: Fruto — fructus, frutos, and the fruits of labor',
    titleEs:
      'Inspección: Fruto — fructus, frutos y los frutos del trabajo',
    excerpt:
      'Palavras: «fruto» (lat. *fructus*) — órgão botânico, plural frutos, contraste com fruta, figurado «frutos do trabalho»; elos plantas/simbiose; Faça o melhor!',
    excerptEn:
      'Words: “fruto” (Lat. *fructus*) — botanical organ, plural frutos, contrast with culinary fruta, figurative “fruits of labor”; plant/simbiose links; Do your best!',
    excerptEs:
      'Palabras: «fruto» (lat. *fructus*) — órgano botánico, plural frutos, contraste con fruta, figurado «frutos del trabajo»; vínculos plantas/simbiose; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-fruto',
    date: '2026-08-03T23:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Fruto · palavra',
    coverImage: '/imagens/inspecoes/fruto-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFrutoPost,
  buildFrutoBodies
};
