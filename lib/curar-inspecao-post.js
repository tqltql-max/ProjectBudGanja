'use strict';

/**
 * Inspeção Palavras · curar
 * Eixos: lat. cūrāre ← cūra · tratar × secar/conservar × cura (pároco)
 * · ≠ cuidar (cōgitāre) · curar a planta ≠ a planta cura · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/curar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/curar';
const WIKT_CURA = 'https://pt.wiktionary.org/wiki/cura';
const WIKT_LAT = 'https://en.wiktionary.org/wiki/curo#Latin';
const WIKT_CURA_LAT = 'https://en.wiktionary.org/wiki/cura#Latin';
const WIKT_CUIDAR = 'https://pt.wiktionary.org/wiki/cuidar';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildCurarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-curar.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const guiaCultivo = '/guia/cultivo-basico.html';
  const farmacia = '/posts/post-inspecao-guia-farmacia-viva.html';
  const cannabis = '/posts/post-inspecao-planta-cannabis-sativa.html';
  const cannabisHub = '/plantas/cannabis-sativa/';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const erva = '/posts/post-inspecao-palavra-erva.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const xiv = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[curar](${self})** — verbo do português (lat. *cūrāre* ← *cūra* «cuidado, atenção, trato»). Pedido de campo: *Inspeção na palavra Curar*. Esta ficha cobre o **objeto lexical**, os ofícios que **não** se fundem (tratar o corpo · secar/conservar a colheita · *cura* pároco), o falso amigo **cuidar** (*cōgitāre*), e o corte lab: **curar a [planta](${planta})** ≠ slogan «a planta cura». Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · curar](${WIKT}), [cura](${WIKT_CURA}), lat. [*cūrō*](${WIKT_LAT}) / [*cūra*](${WIKT_CURA_LAT}), [cuidar](${WIKT_CUIDAR}). **Ficha ≠ protocolo clínico, ≠ bula, ≠ receita de secagem, ≠ milagre.** Sem afiliação médica, religiosa ou comercial. Tom: literacia; [respeito](${respeito}) ao corpo e à [verdade](${verdade}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **curar** |
| Classe | Verbo transitivo (também pronominal: *curar-se*) |
| Étimo (trabalho) | Lat. *cūra* «cuidado, inquietação, trato» → *cūrāre* «cuidar de, tratar» → PT **curar** — confiança: **alta** |
| Família | *cura* · *curado* · *curador* · *curadoria* · *curativo* · *curandeiro* · *incurável* · *procurar* · *seguro* |
| Cognatos | esp. *curar* · it. *curare* · fr. *curer* (outro rasto) · ing. *cure* / *curator* / *curious* / *accurate* / *secure* · lat. *cūra* |
| Tipo BudGanja | Palavra — trato × conserva × cuidado; ≠ slogan terapêutico |
| Não é | **Cuidar** (étimo *cōgitāre*) · protocolo clínico · garantia de milagre |
| Elo vivo | [planta](${planta}) · [cultivo](${cultivo}) · [Farmácia Viva](${farmacia}) · [Cannabis sativa](${cannabis}) |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [risco](${risco}) · [skill](${skill}) |
| Elo afecto | [vida](${vidaPalavra}) · [alma](${alma}) · [esperança](${esperanca}) · [lavar](${lavar}) |
| Elo formação | [UNIFESP XIV](${xiv}) · [legal](${legal}) · [etimologia](${etimologia}) |
| Fonte | [curar](${WIKT}) · [*cūra*](${WIKT_CURA_LAT}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo de **atender com cuidado** — o latim ainda não tinha separado «tratar a ferida» de «tratar a carne salgada». O português **separou ofícios**; o lab fiche a palavra para **não os voltar a misturar**.

## 2. Origens (etimologia)

O núcleo é estável.

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| **Lat. *cūra*** | Cuidado, atenção, inquietação, administração de um encargo | **Alta** |
| **Lat. *cūrāre*** | Ocupar-se de; tratar; zelar | **Alta** |
| **PT *curar*** | Herança directa — tratar / sarar / conservar / curtir | **Alta** |
| **PT *cura* (pároco)** | O que tem *cura d'almas* — o encargo pastoral, não o étimo médico | **Alta** (homónimo do substantivo) |
| **PT *cuidar* ← *cōgitāre*** | Pensar, ter em mente — **outro étimo**; parece primo, não é | **Alta** ([cuidar](${WIKT_CUIDAR})) |
| ***prōcūrāre* → *procurar*** | Tratar *adiante* → ir buscar / procurar | **Alta** (família, outro ofício) |
| ***sēcūrus* → *seguro*** | *sē* + *cūra* — sem inquietação | **Alta** (família, outro ofício) |

**H1:** *curar* herda *cūrāre* — **trato com atenção**, não milagre.  
**H2:** *cuidar* e *curar* **parecem** irmãos; a [etimologia](${etimologia}) separa: *cōgitāre* × *cūrāre*.  
**H3:** *cura* (sarar) e *cura* (pároco) partilham o **encargo**; não partilham o consultório.

**Veredicto etimológico:** *cūra* é o avô. Os netos portugueses **especializaram**. Inspecionar = nomear a especialização, não apagá-la.

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **1. Tratar / sarar** | Corpo, ferida, doença — o uso clínico corrente | Protocolo, dose, bula nesta ficha |
| **2. Conservar / secar** | Carne, peixe, tabaco, [planta](${planta}) após a colheita — *cure* EN | Tutorial de secagem; garantia de qualidade |
| **3. Curtir (couro)** | Transformar pele em matéria estável | Catálogo de marroquinaria |
| **4. *Cura* pároco** | Encargo de almas — [alma](${alma}) no nome do ofício | Sermão; equivalência com médico |
| **5. Curador / curadoria** | Quem zela (museu, herança, tutela) | Título de marketing |
| **6. Ofício lab** | Atender a ficha com *cūra* — citar, limitar, não sloganizar | «X cura Y» como manchete |

**H4:** no cultivo BR, «**curar a erva**» é o ofício **2** (tempo, ar, [gesto](${gesto})). «**A erva cura**» é o ofício **1** vestido de slogan — pede [verdade](${verdade}) e [risco](${risco}), não fé.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Milagre** | *Curar* = apagar a doença | Trato com [caminho](${caminho}); resultado **não** está na palavra |
| **Sinónimo de cuidar** | Mesma família | Falso amigo de ouvido — *cōgitāre* × *cūrāre* |
| **Cannabis medicinal** | A [planta](${planta}) «cura» porque o nome pede | Literacia: evidência no [XIV](${xiv}) e na ficha de [espécie](${cannabis}); esta página **não** prescreve |
| **Secagem = tratamento** | Curar a colheita = curar o doente | Dois ofícios, uma raiz — **não** fundir |
| **Curandeiro** | Irmão do médico | Outro mapa social; [respeito](${respeito}) à história, sem receita |
| **Lavar a alma** | *Curar* espiritual = [lavar](${lavar}) | [Lavar](${lavar}) é água; *curar* é trato — elos, não sinónimos |

**H-parece:** a palavra vende **solução**.  
**H-é:** a palavra nomeia **cuidado com ofício**. Solução, se houver, vive noutro sítio — clínica, evidência, tempo.

## 5. Curar a planta × a planta cura

| Frase | Ofício | Leitura lab |
|-------|--------|-------------|
| **«Curar a [planta](${planta})»** (colheita) | Conserva / secagem | Ofício de [cultivo](${cultivo}) — tempo depois da tesoura; ver [guia básico](${guiaCultivo}) como mapa, **não** como protocolo fechado |
| **«Cuidar da planta»** | Atenção quotidiana | *Cuidar* (*cōgitāre*) — estar com o vivo; ≠ secar |
| **«A planta cura»** | Slogan terapêutico | Afirmação clínica — pede fonte, [legal](${legal}), [risco](${risco}). **Fora** desta ficha como receita |
| **«Cannabis medicinal»** | Registo clínico-legal | [Cannabis sativa](${cannabis}) · [hub](${cannabisHub}) · [XIV](${xiv}) · [Farmácia Viva](${farmacia}) — **outras** prateleiras |
| **«Maconha cura»** | Gíria + prometimento | [Maconha](${maconha}) é a palavra popular; *curar* aqui ainda pede [verdade](${verdade}) |

**Veredicto cultivo:** no lab, **curar a colheita** é *cūra* de matéria (humidade, bolor, tempo). **Curar a pessoa** é outro tribunal. Quem funde os dois vende a raiz e esconde o [risco](${risco}).

## 6. Família e falsos amigos

| Termo | Rota | Relação com *curar* |
|-------|------|---------------------|
| **cura** (sarar / tratamento) | Substantivo do mesmo étimo | Resultado ou processo nomeado |
| **cura** (pároco) | *Cura d'almas* | Homónimo — encargo, não consultório |
| **cuidar** | Lat. *cōgitāre* | **Não** é primo etimológico; é vizinho semântico |
| **procurar** | *prō* + *cūrāre* | Família: tratar adiante → ir buscar |
| **seguro** | *sēcūrus* | Família: sem *cūra* (inquietação) |
| **curador** | Quem tem a *cūra* de um bem / pessoa | Ofício de zelar |
| **curandeiro** | Agente popular de trato | História social; **não** é protocolo |
| **curious / accurate** (EN) | *cūriōsus* / *ad* + *cūra* | Netos ingleses da mesma *cūra* |
| **[lavar](${lavar})** | *lavāre* | Outro gesto de cuidado (água) |
| **[erva](${erva})** | Ficha antiga → preferir [planta](${planta}) | Nome, não acto de curar |

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Corpo** | «curar a ferida» | Bom: nomear o trato · Mau: a ficha como receita |
| **Colheita** | «deixar curar a erva» | Bom: ofício 2, com tempo · Mau: fundir com milagre |
| **Alimento** | «carne curada» | Bom: conserva · Mau: «portanto é remédio» |
| **Espiritual** | «curar a [alma](${alma})» | Bom: metáfora consciente · Mau: substituir cuidado clínico |
| **Slogan** | «isso cura ansiedade» | Mau sem [verdade](${verdade}) — ver [risco](${risco}) |
| **Ofício** | «curar a ficha» (lab) | Bom: atender com *cūra* — citar, limitar, [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear **curar** para **atender com cuidado** — tratar, secar, zelar — **sem** vender a palavra como milagre nem fundir colheita com clínica.

## 8. Rede (só fichas existentes)

| Recurso | Relação |
|---------|---------|
| [Planta](${planta}) · [Plantas](${plantas}) · [cultivo](${cultivo}) | O vivo e o ofício depois da colheita |
| [Cannabis sativa](${cannabis}) · [maconha](${maconha}) · [Farmácia Viva](${farmacia}) · [XIV](${xiv}) | Prateleira medicinal — evidência, não slogan |
| [Lavar](${lavar}) · [alma](${alma}) · [vida](${vidaPalavra}) · [esperança](${esperanca}) | Cuidado irmão, outros étimos |
| [Verdade](${verdade}) · [risco](${risco}) · [respeito](${respeito}) · [legal](${legal}) | Filtro do slogan |
| [Gesto](${gesto}) · [caminho](${caminho}) · [skill](${skill}) | Tempo e rasto — curar a colheita pede ofício, não pressa |
| [Etimologia](${etimologia}) · [língua portuguesa](${lingua}) · [Guia](${guia}) | Método e solo |
| [Vida](${vida}) · [Diário](${diario}) · [Valeu !!!](${mantra}) | Fecho |

## 9. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste trato**, hoje; sem prometer o milagre de amanhã |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | *Curar* ≠ apagar · *cuidar* ≠ *curar* · colheita ≠ clínica |
| Par vivo | [planta](${planta}) · [verdade](${verdade}) · [risco](${risco}) |

**Veredicto:** Valeu !!! — **curar** é *cūra*: atender. A [planta](${planta}) pede trato; a palavra **não** assina a cura.

## Hipóteses (síntese)

**H1:** *curar* < lat. *cūrāre* ← *cūra* (alta).  
**H2:** ofícios = tratar · secar/conservar · pároco · curadoria — **não** fundir.  
**H3:** *cuidar* ← *cōgitāre* — falso amigo.  
**H4:** «curar a planta» (colheita) ≠ «a planta cura» (slogan).  
**H5:** fecho = [Valeu !!!](${mantra}) neste trato, hoje.

## Limites

- Não é aconselhamento médico, farmacêutico, pastoral nem jurídico.  
- Não ensina protocolo de secagem, dose, cultivar nem via de administração.  
- *Curandeiro*, *cura* (pároco) e *cannabis medicinal* entram como **mapa social**, não como receita.  
- Falsos amigos (*cuidar*) ficam nomeados; não abrem ficha própria nesta página.  
- [Farmácia Viva](${farmacia}) e [XIV](${xiv}) são elos — não substitutos desta inspeção.

## Status

**Aprovado** — **curar** fichado: étimo *cūra*; ofícios separados; ≠ *cuidar*; corte colheita × slogan; elos [planta](${planta}) · [verdade](${verdade}) · [risco](${risco}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Planta](${planta}) · [▶ Cannabis](${cannabis}) · [▶ Farmácia Viva](${farmacia}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **[curar](${self})** — Lat. *cūrāre* ← *cūra* (“care, attention, charge”). Field request: inspection of the word *Curar*. Offices that must not fuse: **treat the body**, **dry/cure the harvest**, **cura as parish priest**. False friend: **cuidar** (*cōgitāre*). Lab cut: **curing the [plant](${planta})** ≠ slogan “the plant cures”. Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · curar](${WIKT}), [*cūra*](${WIKT_CURA_LAT}). **Sheet ≠ clinical protocol, leaflet, drying recipe, or miracle.**

## Object

| Field | Value |
|-------|-------|
| Word | **curar** — to heal / to cure (preserve) / to treat |
| Etymon | Lat. *cūra* → *cūrāre* → PT **curar** — **high** confidence |
| Not | **cuidar** (*cōgitāre*) · a medical protocol · a guarantee |
| Links | [planta](${planta}) · [cultivo](${cultivo}) · [Cannabis sativa](${cannabis}) · [UNIFESP XIV](${xiv}) · [truth](${verdade}) · [risk](${risco}) |
| Date | ${inspected} |

## Offices (keep apart)

1. **Treat / heal** — body; not a protocol here.  
2. **Cure / dry** — meat, tobacco, post-harvest [plant](${planta}) — EN *cure*.  
3. **Parish *cura*** — charge of [souls](${alma}); not a clinic.  
4. **Lab** — attend the sheet with *cūra* (cite, limit); refuse “X cures Y” as headline.

**Harvest ≠ clinic:** “curar a erva” is office 2 (time, air, [gesture](${gesto})). “A erva cura” is office 1 as slogan — it asks [truth](${verdade}) and [risk](${risco}), not faith.

## Seems vs is

**Seems:** the word *is* the cure.  
**Is:** the word names **care with craft**. Outcome lives elsewhere — clinic, evidence, time. [Valeu !!!](${mantra}) on **this** attending, today.

## Status

**Approved** — *cūra*; offices split; ≠ *cuidar*; harvest ≠ slogan; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Plant](${planta}) · [▶ Cannabis](${cannabis}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[curar](${self})** — lat. *cūrāre* ← *cūra* («cuidado, atención, encargo»). Pedido de campo: inspección de la palabra *Curar*. Oficios que no se fusionan: **tratar el cuerpo**, **secar/curar la cosecha**, **cura párroco**. Falso amigo: **cuidar** (*cōgitāre*). Corte lab: **curar la [planta](${planta})** ≠ eslogan «la planta cura». Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wikcionario · curar](${WIKT}), [*cūra*](${WIKT_CURA_LAT}). **Ficha ≠ protocolo clínico, prospecto, receta de secado ni milagro.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **curar** — sanar / curar (conservar) / tratar |
| Étimo | Lat. *cūra* → *cūrāre* → PT **curar** — confianza **alta** |
| No es | **cuidar** (*cōgitāre*) · protocolo médico · garantía |
| Vínculos | [planta](${planta}) · [cultivo](${cultivo}) · [Cannabis sativa](${cannabis}) · [XIV](${xiv}) · [verdad](${verdade}) · [riesgo](${risco}) |
| Fecha | ${inspected} |

## Oficios (separar)

1. **Tratar / sanar** — cuerpo; no hay protocolo aquí.  
2. **Curar / secar** — carne, tabaco, [planta](${planta}) tras la cosecha.  
3. **Cura párroco** — encargo de [almas](${alma}); no es consultorio.  
4. **Lab** — atender la ficha con *cūra*; rechazar «X cura Y» como titular.

**Cosecha ≠ clínica:** «curar a erva» es oficio 2. «A erva cura» es oficio 1 de eslogan — pide [verdad](${verdade}) y [riesgo](${risco}), no fe.

## Parece × es

**Parece:** la palabra *es* la cura.  
**Es:** la palabra nombra **cuidado con oficio**. El resultado vive en otro sitio. [¡Valeu !!!](${mantra}) en **este** trato, hoy.

## Estado

**Aprobada** — *cūra*; oficios separados; ≠ *cuidar*; cosecha ≠ eslogan; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Planta](${planta}) · [▶ Cannabis](${cannabis}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildCurarPost() {
  const { body, contentEn, contentEs, wiki } = buildCurarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-curar', 201);

  return makePalavra({
    title: 'Inspeção: Curar — cūra, tratar e secar, sem milagre',
    titleEn: 'Inspection: Curar — cūra, to treat and to dry, without miracle',
    titleEs: 'Inspección: Curar — cūra, tratar y secar, sin milagro',
    excerpt:
      'Palavras: «curar» (lat. cūrāre ← cūra) — tratar × secar a colheita; ≠ cuidar (cōgitāre); curar a planta ≠ a planta cura; Valeu !!!',
    excerptEn:
      'Words: “curar” (Lat. cūrāre ← cūra) — treat × dry the harvest; ≠ cuidar (cōgitāre); curing the plant ≠ the plant cures; Valeu !!!',
    excerptEs:
      'Palabras: «curar» (lat. cūrāre ← cūra) — tratar × secar la cosecha; ≠ cuidar (cōgitāre); curar la planta ≠ la planta cura; ¡Valeu !!!',
    slug: 'inspecao-palavra-curar',
    date: '2026-08-22T06:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Curar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCurarPost,
  buildCurarBodies
};
