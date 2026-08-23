'use strict';

/**
 * Inspeção Palavras · fogo
 * Eixos: objeto · usos · cuidado · Valeu !!!
 * Elos: água · raiva · cultivo · verdade · gesto
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildFogoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/cultivo/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const neve = '/posts/post-inspecao-palavra-neve.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const lava = '/posts/post-inspecao-palavra-lava.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const wiki = 'https://pt.wiktionary.org/wiki/fogo';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Fogo';

  const body = `## Escopo

Inspeção editorial da palavra **fogo** — elemento, calor, luz e metáfora de ofício (e de perigo). Esta ficha cobre o **objeto**, os **usos** (físicos e figurados), o **cuidado** no laboratório e o fecho [Valeu !!!](${mantra}). Elos naturais: [água](${agua}) (par clássico), [raiva](${raiva}) (fogo do peito), [cultivo](${cultivo}) (luz / calor medidos).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · fogo](${wiki}), [Wikipédia · Fogo](${wikiEl}), série [Palavras](${hub}). **Ficha ≠ manual de segurança contra incêndios** — mapa lexical e de ofício. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **fogo** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Latim *focus* («lareira; fogão; ponto») → PT *fogo* — confiança: alta |
| Família | *fogueira* · *fogão* · *fogoso* · *à prova de fogo* · *pegar fogo* · *jogo* (etimo distinto) |
| Cognatos | esp. *fuego* · fr. *feu* · it. *fuoco* · ing. *fire* (germânico; sentido paralelo) |
| Tipo BudGanja | Palavra — elemento × metáfora × cuidado |
| Elo elemento | [água](${agua}) · [gelo](${gelo}) · [neve](${neve}) |
| Elo afecto | [raiva](${raiva}) — fogo de limite (não vilania) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [Valeu !!!](${mantra}) |
| Elo projecto | [Cultivo](${cultivo}) · [Vida](${vida}) · [língua portuguesa](${lingua}) |
| Fonte | [Wikcionário · fogo](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **combustão** e, por extensão, o **calor**, a **luz**, o **ardor** e o **risco**. No BudGanja: ferramenta de metáfora com **limites** — aquece o ofício; queima o que não inspeciona.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *focus* | Lareira / fogão → centro de calor doméstico | Alta |
| Elemento | Combustão, chama, calor radiante | Alta |
| Luz | Claridade do fogo / «à luz do fogo» | Alta |
| Afecto | Ardor, paixão, [raiva](${raiva}) («fogo no peito») | Alta (uso vivo) |
| Perigo | Incêndio, queimadura, «pegar fogo» | Alta |
| Provação | «À prova de fogo» — teste duro | Alta |
| Ofício lab | Calor/luz no [cultivo](${cultivo}); metáfora de engenho ([genial](${genial})) | Média–alta (mapa BudGanja) |

**H1:** *fogo* herda o *focus* — o **centro** onde se aquece e se junta a casa.  
**H2:** no peito, cruza com [raiva](${raiva}): fogo com ofício ≠ [vingança](${vinganca}) que envenena.  
**H3:** no cultivo, «fogo» sem medida = dano; luz/calor **medidos** = cuidado.

## 3. Usos — físicos e figurados

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Elemento / chama** | Fogão, fogueira, vela | Bom: nomear · Mau: brincar com risco real |
| **Calor / luz (cultivo)** | Painéis, temperatura, «queimar» planta | Bom: medir · Mau: excesso sem ficha |
| **Ardor afectivo** | «Fogo no peito», paixão pelo ofício | Bom: energia · Mau: confundir com rancor |
| **[Raiva](${raiva})** | Ira como fogo de limite | Bom: inspecionar · Mau: deixar virar [vingança](${vinganca}) |
| **Criação** | Ideia que «pega fogo» / engenho | Bom: [criatividade](${criatividade}) · Mau: culto vazio |
| **Prova** | «À prova de fogo» — testar o relato | Bom: [verdade](${verdade}) · Mau: humilhar |
| **Par com água** | Apagar, equilibrar, [lavar](${lavar}) | Bom: [água](${agua}) · [balde](${balde}) · Mau: extremos sem método |

## 4. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Aquecer / iluminar** | Casa, noite, fogão | Metáfora de ofício que aquece sem queimar o projecto |
| **Avisar** | Perigo de incêndio | Limite: [raiva](${raiva}) com ofício; não veneno |
| **Equilibrar** | Fogo × [água](${agua}) | Par elemental nas [Palavras](${hub}) |
| **Cultivar** | Calor e luz medidos | [Cultivo](${cultivo}) — dose, não labareda cega |
| **Criar** | Energia da ideia | [genial](${genial}) · [criatividade](${criatividade}) · [gesto](${gesto}) |
| **Fechar** | Depois do ardor, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear o fogo para **usar com medida** — calor que serve; chama que inspeciona o próprio limite.

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com este calor**, hoje — sem incendiar o peito alheio |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Estou em fogo, então destroço» = falso · o mantra pede [gesto](${gesto}) e [verdade](${verdade}) |
| Par afectivo | [Raiva](${raiva}) com ofício ≠ [vingança](${vinganca}) |
| Par elemental | [Água](${agua}) — equilibrar; [lavar](${lavar}) quando o excesso suja |

**Veredicto:** Valeu !!! **com o fogo** — acender o ofício, não a conta a saldar. Fogo sem [caminho](${caminho}) = labareda; fogo com método = lareira.

## Hipóteses (síntese)

**H1:** objeto = *focus* → fogo (elemento + metáfora).  
**H2:** usos = chama · calor · ardor · prova · perigo.  
**H3:** elos = [água](${agua}) · [raiva](${raiva}) · [cultivo](${cultivo}) · [verdade](${verdade}).  
**H4:** fecho = [Valeu !!!](${mantra}) com medida.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Água](${agua}) · [Gelo](${gelo}) · [Neve](${neve}) | Par / contraste elemental |
| [Raiva](${raiva}) · [Vingança…](${vinganca}) | Fogo do peito × veneno |
| [Cultivo](${cultivo}) · [Balde](${balde}) · [Lavar](${lavar}) | Dose de calor / cuidado |
| [Lava](${lava}) | Rocha fundida do vulcão — elo elemental desta ficha |
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Criatividade](${criatividade}) · [Genial](${genial}) | Ofício |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é guia de combate a incêndios nem aconselhamento médico de queimaduras.  
- Não romantiza a destruição («queimar tudo»).  
- Metáfora afectiva ≠ licença para agressão.

## Status

**Aprovado** — **fogo** fichado: objeto (*focus*), usos, cuidado (água · raiva · cultivo) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Água](${agua}) · [▶ Raiva](${raiva}) · [▶ Cultivo](${cultivo}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **fogo** (fire) — element, heat, light and craft metaphor (and danger). Covers **object**, **uses**, **care**, and [Valeu !!!](${mantra}). Links: [água](${agua}), [raiva](${raiva}), [cultivo](${cultivo}).

> Method note: [Wiktionary · fogo](${wiki}), [Wikipedia · Fogo](${wikiEl}). Not a fire-safety manual.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **fogo** |
| Etymon | Latin *focus* (“hearth; stove; point”) → PT *fogo* |
| Lab type | Element × metaphor × care |
| Links | [água](${agua}) · [raiva](${raiva}) · [gesture](${gesto}) · [truth](${verdade}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses and uses

Combustion · heat/light · affective ardor ([raiva](${raiva})) · danger · “trial by fire” · cultivation dose (measured heat, not blind blaze).

**H:** hearth-center (*focus*); anger with craft ≠ [revenge](${vinganca}); in grow, unmeasured “fire” = harm.

## 4. Purpose

Warm/illuminate · warn · balance with [água](${agua}) · grow with measured heat · create · close with [Valeu !!!](${mantra}).

## 5. Valeu !!!

Best possible **with this heat**, today — without burning another’s chest. Fire without [path](${caminho}) = blaze; fire with method = hearth.

## Status

**Approved** — object · uses · care · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Água](${agua}) · [▶ Raiva](${raiva}) · [▶ Cultivo](${cultivo}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **fogo** (fuego) — elemento, calor, luz y metáfora de oficio (y peligro). Cubre **objeto**, **usos**, **cuidado** y [¡Valeu !!!](${mantra}). Vínculos: [água](${agua}), [raiva](${raiva}), [cultivo](${cultivo}).

> Nota: [Wikcionario · fogo](${wiki}), [Wikipedia · Fogo](${wikiEl}). No es manual de incendios.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **fogo** |
| Étimo | Latín *focus* → PT *fogo* |
| Tipo lab | Elemento × metáfora × cuidado |
| Vínculos | [água](${agua}) · [raiva](${raiva}) · [gesto](${gesto}) · [verdad](${verdade}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y usos

Combustión · calor/luz · ardor afectivo ([raiva](${raiva})) · peligro · «a prueba de fuego» · cultivo con dosis (calor medido).

## 4. Para qué sirve

Calentar/iluminar · avisar · equilibrar con [água](${agua}) · cultivar · crear · cerrar con [¡Valeu !!!](${mantra}).

## 5. ¡Valeu !!!

Lo mejor posible **con este calor**, hoy — sin incendiar el pecho ajeno.

## Estado

**Aprobada** — objeto · usos · cuidado · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Água](${agua}) · [▶ Raiva](${raiva}) · [▶ Cultivo](${cultivo}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildFogoPost() {
  const { body, contentEn, contentEs, wiki } = buildFogoBodies();
  return makePalavra({
    title: 'Inspeção: Fogo — elemento, ardor, cuidado e Valeu !!!',
    titleEn: 'Inspection: Fogo — element, ardor, care and Valeu !!!',
    titleEs: 'Inspección: Fogo — elemento, ardor, cuidado y ¡Valeu !!!',
    excerpt:
      'Palavras: «fogo» (lat. *focus*) — elemento e metáfora; elos água, raiva e cultivo; Valeu !!! com medida.',
    excerptEn:
      'Words: “fogo” (Lat. *focus*) — element and metaphor; links água, raiva and cultivo; Valeu !!! with measure.',
    excerptEs:
      'Palabras: «fogo» (lat. *focus*) — elemento y metáfora; vínculos água, raiva y cultivo; ¡Valeu !!! con medida.',
    slug: 'inspecao-palavra-fogo',
    date: '2026-08-03T17:00:00.000Z',
    seriesOrder: 33,
    seriesLabel: 'Fogo · palavra',
    coverImage: '/imagens/inspecoes/fogo-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFogoPost,
  buildFogoBodies
};
