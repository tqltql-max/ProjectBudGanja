'use strict';

/**
 * Inspeção Palavras · inseto / insetos
 * Eixos: vida · ecologia · cultura · elos joaninha/abelha/animal/simbiose ·
 * contraste buguei · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildInsetoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const animais = '/animais/';
  const cultivo = '/cultivo/';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const rodrigo = '/posts/post-inspecao-animal-aranha-rodrigo.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Inseto';
  const wikt = 'https://pt.wiktionary.org/wiki/inseto';
  const wikiInsecta = 'https://pt.wikipedia.org/wiki/Insecta';

  const body = `## Escopo

Inspeção editorial da palavra **inseto** (e do plural vivo **insetos**) — seres de seis patas, antenas e muitas vidas no solo, na folha e na cultura. Esta ficha cobre o **objeto** lexical, a **origem** (lat. *insectum*), o lugar na **ecologia** e no **quotidiano BR**, e o fecho [Valeu !!!](${mantra}). Tom: laboratório quente — **vida**, não manual seco de entomologia. Elos: [animal](${animal}), [simbiose](${simbiose}), [Joaninha Joana](${joaninha}), [abelha](${abelha}), contraste [buguei](${buguei}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikipédia · Inseto](${wiki}), [Insecta](${wikiInsecta}), [Wikcionário · inseto](${wikt}), uso oral BR. **Ficha ≠ tratado taxonómico completo** — mapa de palavra, ecologia e cultura. Sem afiliação comercial de pesticidas.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **inseto** (lemma) · plural **insetos** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *insectum* («cortado em» — corpo segmentado) ← *insecare* — confiança: alta |
| Família | *inseticida* · *entomologia* · *insectário* · gíria *bicho* / *bug* |
| Cognatos | esp. *insecto* · fr. *insecte* · it. *insetto* · ing. *insect* · lat. *insectum* |
| Tipo BudGanja | Palavra — vida × ecologia × cultura |
| Elo seres | [animal](${animal}) · [abelha](${abelha}) · [Joaninha](${joaninha}) · [Animais](${animais}) |
| Elo relação | [simbiose](${simbiose}) — viver *com*, não só *contra* |
| Elo contraste | [buguei](${buguei}) — quando *bug* (inseto) vira «deu ruim» |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) · [cultivo](${cultivo}) |
| Elo língua | [língua portuguesa](${lingua}) · [Guia](${guia}) |
| Fonte | [Wikipédia · Inseto](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a grande família dos **insetos** — e, no peito BR, também o «bichinho» do jardim, da cozinha e da imaginação. Lemma **inseto**; no corpo da ficha o plural **insetos** entra porque a vida quase nunca vem sozinha.

## 2. Origem e forma — *insectum* → inseto

| Camada | Leitura | Nota |
|--------|---------|------|
| **Lat. *insectum*** | «Cortado em» — alusão ao corpo em segmentos | Étimo clássico (Plínio e tradição naturalista) |
| **PT *inseto*** | Forma culta / escolar | Também escrita *insecto* (variante) |
| **Plural *insetos*** | Uso quotidiano — nuvem, colmeia, folha cheia | A palavra no mundo quase sempre no plural vivo |
| **Gíria *bicho*** | Amplia: inseto, aranha, «qualquer bichinho» | Popular — nem sempre preciso |
| **Ingl. *bug*** | Inseto → falha → [buguei](${buguei}) | Outra viagem; não confundir com o lemma PT |

**H1:** *inseto* herda o *insectum* — nome de **forma** (segmentos), não de «praga».  
**H2:** o plural **insetos** carrega a intuição ecológica: são **muitos**, em rede.  
**H3:** «bicho» e *bug* são **vizinhos**; a ficha fixa o lemma cultor sem apagar o oral.

**Veredicto etimológico:** *inseto* = palavra de **corpo cortado em partes** que virou nome de um reino imenso de vida — confiança alta no étimo; a taxonomia fina fica para a entomologia.

## 3. Vida e ecologia — os insetos no laboratório

No BudGanja, **insetos** não são só «inimigos da planta». São polinizadores, predadores, decompositores, comida de pássaros — e também, às vezes, praga que pede [gesto](${gesto}) com método.

| Papel | Exemplo no lab | Leitura |
|-------|----------------|---------|
| **Polinização** | [Abelha](${abelha}) e outras | Sem elas, muita flor e fruto murcham de sentido |
| **Controlo biológico** | [Joaninha Joana](${joaninha}) × pulgões | Amiga do jardim — proteger sem destruir o equilíbrio |
| **Solo e ciclo** | Decompositores, detritívoros | A «cama» da semente também é teia de bichinhos |
| **Praga (quando há)** | Folha comida demais, ácaro, etc. | Nomear com [verdade](${verdade}); tratar com ofício, não pânico |
| **[Simbiose](${simbiose})** | Viver *com* o que não é humano | Inseto no cálculo — não só no spray |

**H-ecologia:** bons **insetos** no mapa = diversidade e funções; maus mapas = «todo bicho é inimigo».  
**Veredicto:** inspecionar a folha **e** a teia — a [Joaninha](${joaninha}) ensina o método do lab.

## 4. Cultura e língua — do jardim ao peito

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Biológico / escolar** | «A abelha é um inseto» | Bom: literacia · Mau: lista sem vida |
| **Quotidiano BR** | «Tem insetos na planta» | Bom: observar · Mau: matar tudo sem olhar |
| **Medo / nojinho** | «Ai, inseto!» | Bom: limite próprio · Mau: ódio a toda a classe |
| **Metáfora (*bug*)** | [Buguei](${buguei}) | Bom: lembrar o étimo inseto · Mau: pessoa = defeito |
| **Cultura / conto** | [Joaninha](${joaninha}) na [Vida](${vida}) | Bom: carinho com método · Mau: só fofura sem ecologia |

**Veredicto cultural:** a palavra **inseto** segura ciência e afecto; o ofício escolhe o tom — curiosidade primeiro, spray depois (se precisar).

## 5. Para que serve · Valeu !!!

| Finalidade | Leitura |
|------------|---------|
| **Nomear com precisão** | Inseto ≠ «qualquer bicho»; lemma claro |
| **Ver a teia** | Plural **insetos** = rede, não monstro único |
| **Cruzar com o lab** | [Abelha](${abelha}) · [Joaninha](${joaninha}) · [animal](${animal}) · [simbiose](${simbiose}) |
| **Desfazer o estigma do *bug*** | [Buguei](${buguei}) — o peito trava; o inseto na origem não é «lixo» |
| **Ofício na folha** | Observar → [gesto](${gesto}) → [Valeu !!!](${mantra}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor cuidado **com** a vida miúda, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Inseto = só praga» = mapa incompleto |

**Veredicto:** Valeu !!! **com os insetos no cálculo** — literacia da palavra, respeito à teia, [gesto](${gesto}) quando a praga for real.

## Hipóteses (síntese)

**H1:** *inseto* ← lat. *insectum* (corpo segmentado).  
**H2:** plural **insetos** = intuição de rede / ecologia.  
**H3:** elos = [animal](${animal}) · [simbiose](${simbiose}) · [joaninha](${joaninha}) · [abelha](${abelha}) · [Aranha Rodrigo](${rodrigo}) (contraste: aranha ≠ inseto).  
**H4:** contraste = [buguei](${buguei}) (inseto no étimo do «deu ruim»).  
**H5:** fecho = [Valeu !!!](${mantra}) no cultivo e na curiosidade.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Animal](${animal}) · [Animais](${animais}) | Classe maior — inseto é animal (no sentido amplo de ser vivo) |
| [Abelha](${abelha}) · [Joaninha Joana](${joaninha}) | Fichas vivas do lab |
| [Cigarra](/posts/post-inspecao-palavra-cigarra.html) | Insecto do canto — orelha cola **cigarro** (outra ficha) |
| [Formiga](/posts/post-inspecao-palavra-formiga.html) · [larva](/posts/post-inspecao-palavra-larva.html) | Povo do chão · estádio jovem |
| [Formiga lava-pé](/posts/post-inspecao-expressao-formiga-lava-pe.html) | *Solenopsis* — ferroada; ≠ lava de vulcão |
| [Aranha Rodrigo](${rodrigo}) | Contraste — **aranha ≠ inseto**; destaque no [Slivki Show](/posts/post-inspecao-canal-slivki.html) |
| [Simbiose](${simbiose}) | Viver *com* |
| [Buguei](${buguei}) | Viagem inseto → falha → peito |
| [Cultivo](${cultivo}) · [Vida](${vida}) · [Diário](${diario}) | Folha, conto, ofício |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo lexical |

## Limites

- Não substitui identificação de espécies nem protocolo agronómico.  
- Não romantiza praga nem demoniza classe inteira.  
- Aracnídeos e outros artrópodes **não** são insetos — a fala popular às vezes mistura; a ficha marca o lemma. Destaque vivo: [Aranha Rodrigo](${rodrigo}).

## Status

**Aprovado** — **inseto** / **insetos** fichados: étimo, vida, ecologia, cultura; elos joaninha · abelha · animal · simbiose; contraste [buguei](${buguei}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Animal](${animal}) · [▶ Joaninha](${joaninha}) · [▶ Abelha](${abelha}) · [▶ Aranha Rodrigo](${rodrigo}) · [▶ Simbiose](${simbiose}) · [▶ Buguei](${buguei}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **inseto** (lemma; plural **insetos** in body) — insects as life, ecology and culture in the BudGanja lab. Warm tone, not a dry entomology textbook. Links: [animal](${animal}), [simbiose](${simbiose}), [Joaninha](${joaninha}), [bee](${abelha}), contrast [buguei](${buguei}), close [Valeu !!!](${mantra}).

> Method note: [Insect (PT)](${wiki}), [Insecta](${wikiInsecta}), [Wiktionary · inseto](${wikt}). Not a full taxonomic treatise.

## Object

| Field | Value |
|-------|-------|
| Word | **inseto** · plural **insetos** |
| Etymon | Lat. *insectum* (“cut into” — segmented body) |
| Links | [animal](${animal}) · [Joaninha](${joaninha}) · [bee](${abelha}) · [simbiose](${simbiose}) · [buguei](${buguei}) |
| Date | ${inspected} |

## Life & ecology

Insects pollinate ([bee](${abelha})), control pests ([Joaninha](${joaninha})), cycle soil, and sometimes become pests that need careful [gesture](${gesto}). Good map = functions and diversity; bad map = “every bug is the enemy.”

## Culture

School word, garden talk, fear/disgust, and the *bug* metaphor → [buguei](${buguei}). Curiosity first; spray only with method.

## Valeu !!!

Keep **insetos** in the calculation — literacy, web of life, [Valeu !!!](${mantra}).

## Status

**Approved** — inseto/insetos; ecology & culture; lab links; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Animal](${animal}) · [▶ Joaninha](${joaninha}) · [▶ Bee](${abelha}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **inseto** (lema; plural **insetos** en el cuerpo) — insectos como vida, ecología y cultura en el lab BudGanja. Tono cálido, no manual seco. Vínculos: [animal](${animal}), [simbiose](${simbiose}), [Joaninha](${joaninha}), [abeja](${abelha}), contraste [buguei](${buguei}), cierre [¡Valeu !!!](${mantra}).

> Nota: [Insecto](${wiki}), [Insecta](${wikiInsecta}), [Wikcionario · inseto](${wikt}). No es tratado taxonómico completo.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **inseto** · plural **insetos** |
| Étimo | Lat. *insectum* («cortado en» — cuerpo segmentado) |
| Vínculos | [animal](${animal}) · [Joaninha](${joaninha}) · [abeja](${abelha}) · [simbiose](${simbiose}) · [buguei](${buguei}) |
| Fecha | ${inspected} |

## Vida y ecología

Polinizan ([abeja](${abelha})), controlan plagas ([Joaninha](${joaninha})), ciclan el suelo; a veces son plaga con [gesto](${gesto}) de oficio. Buen mapa = funciones; mal mapa = «todo bicho es enemigo».

## Cultura

Palabra escolar, jardín, miedo/asco, y la metáfora *bug* → [buguei](${buguei}). Curiosidad primero.

## ¡Valeu !!!

Mantener a los **insetos** en el cálculo — [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — inseto/insetos; ecología y cultura; vínculos del lab; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Animal](${animal}) · [▶ Joaninha](${joaninha}) · [▶ Abeja](${abelha}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildInsetoPost() {
  const { body, contentEn, contentEs, wiki } = buildInsetoBodies();
  return makePalavra({
    title:
      'Inspeção: Inseto — vida, ecologia, cultura e Valeu !!!',
    titleEn:
      'Inspection: Inseto — life, ecology, culture and Valeu !!!',
    titleEs:
      'Inspección: Inseto — vida, ecología, cultura y ¡Valeu !!!',
    excerpt:
      'Palavras: «inseto» / «insetos» — lat. insectum; vida, ecologia e cultura; elos joaninha, abelha, animal, simbiose; contraste buguei; Valeu !!!',
    excerptEn:
      'Words: “inseto” / “insetos” — Lat. insectum; life, ecology and culture; links to ladybug, bee, animal, symbiosis; contrast buguei; Valeu !!!',
    excerptEs:
      'Palabras: «inseto» / «insetos» — lat. insectum; vida, ecología y cultura; vínculos joaninha, abeja, animal, simbiosis; contraste buguei; ¡Valeu !!!',
    slug: 'inspecao-palavra-inseto',
    date: '2026-08-03T23:50:00.000Z',
    seriesOrder: 73,
    seriesLabel: 'Inseto · palavra',
    coverImage: '/imagens/inspecoes/inseto-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInsetoPost,
  buildInsetoBodies
};
