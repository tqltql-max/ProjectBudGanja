'use strict';

/**
 * Cluster Palavras · sinais do corpo
 * Hub: sinais (plural) = mapa do corpo
 * Leituras de campo:
 *   barriga → satisfação
 *   orelha  → pulga atrás → curiosidade
 *   mama    → teta → algo fácil
 *   cabelo  → deixa com as mulheres (sabem mais)
 *   cruzar os braços em cima da cabeça → pausa da cabeça
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 280) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

const H = {
  hub: '/biblioteca/inspecoes/#inspecoes-palavras',
  sinais: '/posts/post-inspecao-palavra-sinais.html',
  sinaisRem: '/posts/post-inspecao-palavra-sinais-rem.html',
  sinal: '/posts/post-inspecao-palavra-sinal.html',
  barriga: '/posts/post-inspecao-palavra-barriga.html',
  orelha: '/posts/post-inspecao-palavra-orelha.html',
  mama: '/posts/post-inspecao-palavra-mama.html',
  cabelo: '/posts/post-inspecao-palavra-cabelo.html',
  respeito: '/posts/post-inspecao-palavra-respeito.html',
  gesto: '/posts/post-inspecao-palavra-gesto.html',
  risco: '/posts/post-inspecao-palavra-risco.html',
  verdade: '/posts/post-inspecao-palavra-verdade.html',
  mensagem: '/posts/post-inspecao-palavra-mensagem.html',
  maos: '/posts/post-inspecao-palavra-mao-esquerda-direita.html',
  bracosCabeca: '/posts/post-inspecao-expressao-cruzar-os-bracos-em-cima-da-cabeca.html',
  coracao: '/posts/post-inspecao-palavra-coracao.html',
  inseto: '/posts/post-inspecao-palavra-inseto.html',
  animal: '/posts/post-inspecao-palavra-animal.html',
  ouvidos: '/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html',
  cientista: '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html',
  trigo: '/posts/post-inspecao-arte-barriga-de-trigo.html',
  mamao: '/posts/post-inspecao-planta-mamao.html',
  mae: '/posts/post-inspecao-palavra-mae.html',
  lingua: '/posts/post-inspecao-palavra-lingua-portuguesa.html',
  caminho: '/posts/post-inspecao-palavra-caminho.html',
  mantra: '/posts/post-inspecao-palavra-valeu.html',
  poem: '/posts/post-inspecao-palavra-valeu.html',
  vida: '/vida/',
  guia: '/guia/palavras.html'
};

function shortEnEs(opts) {
  const contentEn = `## Scope

${opts.enScope}

> Method note: word sheet ≠ clinical anatomy. Close: [Valeu !!!](${H.mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **${opts.word}** |
| Craft signal | ${opts.enSignal} |
| Hub | [sinais](${H.sinais}) |
| Date | 2026-08-21 |

## Valeu !!!

Best possible **with this body signal in view**, today.

## Status

**Approved** — ${opts.enStatus}

[▶ Signs](${H.sinais}) · [▶ Valeu !!!](${H.mantra})
`;
  const contentEs = `## Alcance

${opts.esScope}

> Nota: ficha ≠ anatomía clínica. Cierre: [¡Valeu !!!](${H.mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **${opts.word}** |
| Señal de oficio | ${opts.esSignal} |
| Mapa | [sinais](${H.sinais}) |
| Fecha | 2026-08-21 |

## ¡Valeu !!!

Lo mejor posible **con esta señal del cuerpo a la vista**, hoy.

## Estado

**Aprobado** — ${opts.esStatus}

[▶ Señales](${H.sinais}) · [▶ ¡Valeu !!!](${H.mantra})
`;
  return { contentEn, contentEs };
}

function buildSinaisBodies() {
  const wiki = 'https://pt.wiktionary.org/wiki/sinal';
  const body = `## Escopo

Inspeção editorial de **[sinais](${H.sinais})** — o **plural** de [sinal](${H.sinal}): o **campo de marcas do corpo**. Pedido de campo: *sinais* (partes: orelha, mama, barriga, cabelo). Esta ficha é o **mapa**; as peças com leitura já dita vão às fichas-irmãs. Elos: [gesto](${H.gesto}), [sinais REM](${H.sinaisRem}), [Valeu !!!](${H.mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sinal](${wiki}), série [Palavras](${H.hub}). **Ficha ≠ atlas de anatomia, ≠ diagnóstico, ≠ pornografia.** Leituras de ofício (satisfação, curiosidade, facilidade, deferência no cabelo) são **mapa lexical**, não protocolo clínico. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **sinais** (plural de [sinal](${H.sinal}), lat. *signum*) |
| Tipo BudGanja | Palavra — campo do corpo × literacia |
| Irmão REM | [sinais REM](${H.sinaisRem}) — sono × sigla lab (não fundir) |
| Peças com leitura | [barriga](${H.barriga}) · [orelha](${H.orelha}) · [mama / teta](${H.mama}) · [cabelo](${H.cabelo}) · [braços em cima da cabeça](${H.bracosCabeca}) |
| Já fichadas | [mãos](${H.maos}) · [coração / peito](${H.coracao}) |
| Fonte | [sinal](${wiki}) |
| Data | 2026-08-21 |

**O que é o objecto:** o **conjunto**. Um [sinal](${H.sinal}) aponta; **sinais** são o corpo lido de uma vez.

## 2. Mapa do corpo (leituras de campo)

| Parte | Sinal de ofício | Ficha |
|-------|-----------------|-------|
| **[Barriga](${H.barriga})** | **Satisfação** — o «chega», o bastante | fichada |
| **[Orelha](${H.orelha})** | **Curiosidade** — a pulga atrás | fichada |
| **[Mama](${H.mama})** / **teta** | **Algo fácil** — o que está à mão | fichada |
| **[Cabelo](${H.cabelo})** | **Deixa com as mulheres** — elas sabem mais | fichada |
| **[Braços em cima da cabeça](${H.bracosCabeca})** | **Pausa da cabeça** — crânio abrigado, peito aberto | fichada |
| **[Mãos](${H.maos})** | [Gesto](${H.gesto}) que executa | já existia |
| **[Coração / peito](${H.coracao})** | Centro / tônus | já existia |

**H1:** sinais do corpo ≠ [sinais REM](${H.sinaisRem}) (sono / sigla).  
**H2:** cada parte **nomeia um ofício** — não inventar o que o campo ainda não disse.  
**H3:** [mensagem](${H.mensagem}) diz; sinais **mostram**.

## 3. Como ler

1. Entrar pelo **plural** (esta ficha).  
2. Abrir a **parte** ou o **gesto** com leitura (barriga / orelha / mama / cabelo / [braços em cima da cabeça](${H.bracosCabeca})).  
3. Se a boca misturar com sono REM, ir a [sinais REM](${H.sinaisRem}) **depois**.  
4. No [cabelo](${H.cabelo}): não fingir ofício — [respeito](${H.respeito}) a quem sabe mais.

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${H.mantra}) — com os **sinais do corpo à vista**, hoje |
| Poema | [poema Vida](${H.poem}) |
| Anti-armadilha | «Tudo é sinal» sem parte nomeada = superstição |
| Par | [sinal](${H.sinal}) · [gesto](${H.gesto}) · [verdade](${H.verdade}) |

**Veredicto:** Valeu !!! **lendo o campo** — barriga (satisfação), orelha (curiosidade), mama/teta (algo fácil), cabelo (deixa com quem sabe), braços em cima da cabeça (pausa da cabeça).

## Status

**Aprovado** — mapa do corpo; cinco leituras de campo; [Valeu !!!](${H.mantra}).

[▶ Palavras](${H.hub}) · [▶ Barriga](${H.barriga}) · [▶ Orelha](${H.orelha}) · [▶ Mama](${H.mama}) · [▶ Cabelo](${H.cabelo}) · [▶ Braços na cabeça](${H.bracosCabeca}) · [▶ Sinais REM](${H.sinaisRem}) · [▶ Valeu !!!](${H.mantra})
`;
  const { contentEn, contentEs } = shortEnEs({
    word: 'sinais',
    enScope:
      'Plural of [sinal](' +
      H.sinal +
      ') — the **body-signal field**. Craft readings: [belly](' +
      H.barriga +
      ') = satisfaction; [ear](' +
      H.orelha +
      ') = flea-behind / curiosity; [breast / teat](' +
      H.mama +
      ') = something easy; [hair](' +
      H.cabelo +
      ') = leave it with women (they know more); [arms on the head](' +
      H.bracosCabeca +
      ') = head pause. Brother sheet: [sinais REM](' +
      H.sinaisRem +
      ').',
    enSignal: 'the field, not one mark',
    enStatus: 'body map · five craft readings',
    esScope:
      'Plural de [sinal](' +
      H.sinal +
      ') — el **campo de señales del cuerpo**. Lecturas: [barriga](' +
      H.barriga +
      ') = satisfacción; [oreja](' +
      H.orelha +
      ') = pulga detrás / curiosidad; [mama / teta](' +
      H.mama +
      ') = algo fácil; [cabello](' +
      H.cabelo +
      ') = déjalo con las mujeres (saben más); [brazos en la cabeza](' +
      H.bracosCabeca +
      ') = pausa de la cabeza. Ficha hermana: [sinais REM](' +
      H.sinaisRem +
      ').',
    esSignal: 'el campo, no una sola marca',
    esStatus: 'mapa del cuerpo · cinco lecturas'
  });
  return { body, contentEn, contentEs, wiki };
}

function buildBarrigaBodies() {
  const wiki = 'https://pt.wiktionary.org/wiki/barriga';
  const wikiSat = 'https://pt.wiktionary.org/wiki/satisfa%C3%A7%C3%A3o';
  const body = `## Escopo

Inspeção editorial da palavra **[barriga](${H.barriga})** — o ventre como **[sinal](${H.sinal}) de satisfação**. Pedido de campo: *barriga é sinal de satisfação*. Esta ficha cobre o **objecto** (o ventre), a leitura de ofício (**chega / bastante**), o contraste com o livro *[Barriga de Trigo](${H.trigo})*, e o fecho [Valeu !!!](${H.mantra}). Mapa: [sinais](${H.sinais}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · barriga](${wiki}), [satisfação](${wikiSat}). **Ficha ≠ IMC, ≠ dieta, ≠ endocrinologia.** Satisfação aqui = o corpo a dizer **«basta»** — não elogio de doença nem tese de farinha. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **barriga** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Ibér. / origem discutida («ventre, pança») — confiança: média–alta no uso vivo |
| Família | *esbarrigar* · *barrigudo* · *de barriga cheia* |
| Sinal de ofício | **Satisfação** (lat. *satisfacere* — fazer o bastante) |
| Não é | [Barriga de Trigo](${H.trigo}) (livro de Davis) · diagnóstico de gordura visceral |
| Tipo BudGanja | Palavra — parte do corpo × sinal de satisfação |
| Elo mapa | [sinais](${H.sinais}) · [orelha](${H.orelha}) · [mama](${H.mama}) |
| Elo ofício | [gesto](${H.gesto}) · [verdade](${H.verdade}) · [Valeu !!!](${H.mantra}) |
| Fonte | [barriga](${wiki}) |
| Data | 2026-08-21 |

**O que é o objecto:** o **ventre** que, no mapa de [sinais](${H.sinais}), **mostra o bastante**. Barriga cheia ≠ prova científica; é **marca de ofício**: chegou.

## 2. Satisfação — o bastante

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ventre** | Parte do corpo abaixo do peito | Alta |
| **Sinal** | Satisfação — «está bom», «chega» | Alta (leitura de campo) |
| **«De barriga cheia»** | Fartura / descanso depois do comer | Alta (BR) |
| **Livro Davis** | Título *[Barriga de Trigo](${H.trigo})* — **outro objecto** | Alta (não fundir) |

**H1:** no mapa de sinais, barriga **nomeia satisfação**.  
**H2:** satisfação = *satis* (bastante) + *facere* (fazer) — o bastante feito.  
**H3:** não usar esta ficha para magoar o corpo alheio nem para vender dieta.

## 3. Parece × é

| Parece | É |
|--------|---|
| Tese de trigo / IMC | Palavra do ventre + sinal de **satisfação** |
| «Barriga = falha» | No lab: pode ser o **chega** — ler com [verdade](${H.verdade}) |
| O livro [Barriga de Trigo](${H.trigo}) | Arte / tese de Davis — irmão de recorte, **não** esta ficha |

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${H.mantra}) — o melhor possível **com o bastante à vista**, hoje |
| Anti-armadilha | Transformar satisfação em culpa = ruído · transformar em bula = fora de escopo |
| Mapa | [sinais](${H.sinais}) |

**Veredicto:** Valeu !!! **com a barriga como sinal de satisfação** — o bastante, sem tese de farinha colada.

## Status

**Aprovado** — barriga fichada: ventre · satisfação · ≠ Barriga de Trigo; [Valeu !!!](${H.mantra}).

[▶ Sinais](${H.sinais}) · [▶ Orelha](${H.orelha}) · [▶ Mama](${H.mama}) · [▶ Cabelo](${H.cabelo}) · [▶ Barriga de Trigo](${H.trigo}) · [▶ Valeu !!!](${H.mantra})
`;
  const { contentEn, contentEs } = shortEnEs({
    word: 'barriga',
    enScope:
      'Portuguese **barriga** (belly) as a **[signal](' +
      H.sinal +
      ') of satisfaction** — the body saying “enough.” Distinct from the book *[Wheat Belly](' +
      H.trigo +
      ')*. Hub: [sinais](' +
      H.sinais +
      ').',
    enSignal: 'satisfaction / enough',
    enStatus: 'belly · satisfaction · not Wheat Belly',
    esScope:
      '**Barriga** (vientre) como **[señal](' +
      H.sinal +
      ') de satisfacción** — el cuerpo diciendo «basta». Distinto del libro *[Barriga de Trigo](' +
      H.trigo +
      ')*. Mapa: [sinais](' +
      H.sinais +
      ').',
    esSignal: 'satisfacción / lo bastante',
    esStatus: 'vientre · satisfacción · ≠ Barriga de Trigo'
  });
  return { body, contentEn, contentEs, wiki };
}

function buildOrelhaBodies() {
  const wiki = 'https://pt.wiktionary.org/wiki/orelha';
  const wikiPulga = 'https://pt.wiktionary.org/wiki/pulga';
  const wikiLoc = 'https://pt.wiktionary.org/wiki/ficar_com_a_pulga_atr%C3%A1s_da_orelha';
  const body = `## Escopo

Inspeção editorial da palavra **[orelha](${H.orelha})** — a orelha como **[sinal](${H.sinal}) de curiosidade**, via a locução BR **«pulga atrás da orelha»**. Pedido de campo: *orelha temos a pulga atrás, curiosidade*. Esta ficha cobre o **objecto** (lat. *auricula*), o **inseto** da fala ([pulga](${H.inseto})), a **curiosidade** de ofício, e o fecho [Valeu !!!](${H.mantra}). Mapa: [sinais](${H.sinais}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · orelha](${wiki}), [pulga](${wikiPulga}), [ficar com a pulga atrás da orelha](${wikiLoc}). **Ficha ≠ otologia, ≠ entomologia clínica.** A pulga da fala **não** é receita de picada. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **orelha** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *auricula* (dim. de *auris*, «orelha») → PT *orelha* — confiança: alta |
| Família | *orelhão* · *orelhudo* · *dar orelha* |
| Locução | **pulga atrás da orelha** — suspeita leve / **curiosidade** que não assenta |
| Sinal de ofício | **Curiosidade** |
| Tipo BudGanja | Palavra — parte do corpo × sinal de curiosidade |
| Elo inseto | [inseto](${H.inseto}) · [animal](${H.animal}) — a pulga da fala, não o laudo |
| Elo ouvir | [Deus deu dois ouvidos](${H.ouvidos}) |
| Elo pergunta | [Toda criança nasce cientista](${H.cientista}) |
| Elo mapa | [sinais](${H.sinais}) · [barriga](${H.barriga}) · [mama](${H.mama}) |
| Fonte | [orelha](${wiki}) |
| Data | 2026-08-21 |

**O que é o objecto:** a **orelha** que, no mapa de [sinais](${H.sinais}), **coce quando a pergunta não fechou**. A pulga é figura: um [inseto](${H.inseto}) na fala, não um espécime nesta ficha.

## 2. A pulga atrás — curiosidade

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Órgão** | Pavilhão da orelha; ouvir | Alta |
| **Locução** | «Ficar com a pulga atrás da orelha» | Alta (BR) |
| **Sinal** | Curiosidade / suspeita leve — «isto não assenta» | Alta (leitura de campo) |
| **Pulga (bicho)** | [Inseto](${H.inseto}) real — **outro registo** | Alta (não fundir) |

**H1:** orelha no mapa = **curiosidade**.  
**H2:** a pulga atrás é o **coce** da pergunta — primo de [Toda criança nasce cientista](${H.cientista}).  
**H3:** ouvir com os [dois ouvidos](${H.ouvidos}) ≠ deixar a pulga virar paranoia.

## 3. Bom × mau

| Bom (ofício) | Mau (ruído) |
|--------------|-------------|
| Nomear a pulga e **inspecionar** | Inventar trama sem [verdade](${H.verdade}) |
| Curiosidade que abre ficha | Fofoca disfarçada de pulga |
| Ouvir ([dois ouvidos](${H.ouvidos})) | Só a pulga, nunca a escuta |

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${H.mantra}) — o melhor possível **com a pulga nomeada**, hoje |
| Anti-armadilha | Pulga ≠ prova · curiosidade ≠ acusação |
| Mapa | [sinais](${H.sinais}) |

**Veredicto:** Valeu !!! **com a orelha como sinal de curiosidade** — a pulga atrás pede inspeção, não sentença.

## Status

**Aprovado** — orelha fichada: *auricula* · pulga atrás · curiosidade; [Valeu !!!](${H.mantra}).

[▶ Sinais](${H.sinais}) · [▶ Barriga](${H.barriga}) · [▶ Mama](${H.mama}) · [▶ Cabelo](${H.cabelo}) · [▶ Inseto](${H.inseto}) · [▶ Dois ouvidos](${H.ouvidos}) · [▶ Valeu !!!](${H.mantra})
`;
  const { contentEn, contentEs } = shortEnEs({
    word: 'orelha',
    enScope:
      'Portuguese **orelha** (ear) as a **[signal](' +
      H.sinal +
      ') of curiosity** via the idiom **“pulga atrás da orelha”** (a flea behind the ear). Hub: [sinais](' +
      H.sinais +
      '). Links [inseto](' +
      H.inseto +
      '), [two ears](' +
      H.ouvidos +
      ').',
    enSignal: 'curiosity (flea behind the ear)',
    enStatus: 'ear · flea idiom · curiosity',
    esScope:
      '**Orelha** (oreja) como **[señal](' +
      H.sinal +
      ') de curiosidad** vía **«pulga atrás da orelha»**. Mapa: [sinais](' +
      H.sinais +
      '). Vínculos [inseto](' +
      H.inseto +
      '), [dos oídos](' +
      H.ouvidos +
      ').',
    esSignal: 'curiosidad (pulga detrás de la oreja)',
    esStatus: 'oreja · pulga · curiosidad'
  });
  return { body, contentEn, contentEs, wiki };
}

function buildMamaBodies() {
  const wiki = 'https://pt.wiktionary.org/wiki/mama';
  const wikiTeta = 'https://pt.wiktionary.org/wiki/teta';
  const wikiFacil = 'https://pt.wiktionary.org/wiki/f%C3%A1cil';
  const body = `## Escopo

Inspeção editorial da palavra **[mama](${H.mama})** — no fala BR, **teta**; no mapa de [sinais](${H.sinais}), **sinal de algo fácil**. Pedido de campo: *mama é teta, algo fácil*. Esta ficha cobre o **objecto** (lat. *mamma*), a forma oral **teta**, a leitura de ofício (**facilidade** — o que está à mão), os **não-é**, e o fecho [Valeu !!!](${H.mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mama](${wiki}), [teta](${wikiTeta}), [fácil](${wikiFacil}). **Ficha de palavra ≠ atlas clínico, ≠ pornografia, ≠ reduzir pessoa a uma parte.** Tom: literacia do corpo com [respeito](${H.gesto}). Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **mama** (forma oral de campo: **teta**) |
| Classe | Substantivo feminino |
| Étimo *mama* | Lat. *mamma* («peito, teta») — confiança: alta |
| Étimo *teta* | Uso ibér./BR para o mesmo referente — confiança: alta no oral |
| Sinal de ofício | **Algo fácil** — lat. *facilis* (fácil de fazer) · o que está à mão |
| Não é | [Mamão](${H.mamao}) (fruto) · [mãe](${H.mae}) / mamãe (pessoa) · conteúdo sexual |
| Tipo BudGanja | Palavra — parte do corpo × sinal de facilidade |
| Elo mapa | [sinais](${H.sinais}) · [barriga](${H.barriga}) · [orelha](${H.orelha}) |
| Fonte | [mama](${wiki}) |
| Data | 2026-08-21 |

**O que é o objecto:** a **mama** / **teta** que, no mapa de [sinais](${H.sinais}), **nomeia o fácil** — o primeiro à mão, o que não pede pose. Fácil ≠ preguiça automática; fácil = **acesso**.

## 2. Mama = teta = algo fácil

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Mama** | Peito / glândula (léxico) | Alta |
| **Teta** | A mesma peça na boca BR | Alta (oral) |
| **Sinal** | Algo **fácil** — à mão, sem drama | Alta (leitura de campo) |
| **Primeiro alimento (figura)** | O que chega sem mapa comprido | Média (metáfora de ofício; não bula de aleitamento) |

**H1:** no campo, *mama* e *teta* **são o mesmo referente**.  
**H2:** o sinal é **facilidade** — *facilis*, fácil de fazer.  
**H3:** fácil de nomear ≠ fácil de desrespeitar.

## 3. Correções (não misturar)

| Forma | Objecto |
|-------|---------|
| **Mama / teta** | Esta ficha — parte + sinal de algo fácil |
| **[Mamão](${H.mamao})** | Fruto (*Carica papaya*) |
| **[Mãe](${H.mae}) / mamãe** | Pessoa — ofício de cuidar; **não** é a teta |
| **«Mamar nas tetas» (registo cínico)** | Outra fala (aproveitar à custa) — **limite**, não a leitura-mãe desta ficha |

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${H.mantra}) — o melhor possível **com o fácil à vista**, hoje |
| Anti-armadilha 1 | Reduzir pessoa a teta = falha de [respeito](${H.gesto}) |
| Anti-armadilha 2 | Confundir com [mamão](${H.mamao}) ou [mãe](${H.mae}) = ruído |
| Anti-armadilha 3 | «Fácil» como desculpa para não inspecionar = falso |
| Mapa | [sinais](${H.sinais}) |

**Veredicto:** Valeu !!! **com mama/teta como sinal de algo fácil** — o à-mão, sem pornografar nem fundir com fruto ou com a [mãe](${H.mae}).

## Status

**Aprovado** — mama = teta = sinal de algo fácil; ≠ mamão ≠ mãe; [Valeu !!!](${H.mantra}).

[▶ Sinais](${H.sinais}) · [▶ Barriga](${H.barriga}) · [▶ Orelha](${H.orelha}) · [▶ Cabelo](${H.cabelo}) · [▶ Mamão](${H.mamao}) · [▶ Mãe](${H.mae}) · [▶ Valeu !!!](${H.mantra})
`;
  const { contentEn, contentEs } = shortEnEs({
    word: 'mama / teta',
    enScope:
      'Portuguese **mama** (breast), oral **teta** (teat), as a **[signal](' +
      H.sinal +
      ') of something easy** — what is at hand (*facilis*). Not [papaya](' +
      H.mamao +
      '), not [mother](' +
      H.mae +
      '), not porn. Hub: [sinais](' +
      H.sinais +
      ').',
    enSignal: 'something easy / at hand',
    enStatus: 'mama = teta = ease · not papaya · not mother',
    esScope:
      '**Mama** / oral **teta**, como **[señal](' +
      H.sinal +
      ') de algo fácil** — lo que está a mano (*facilis*). No es [mamón](' +
      H.mamao +
      '), no es [madre](' +
      H.mae +
      '), no es pornografía. Mapa: [sinais](' +
      H.sinais +
      ').',
    esSignal: 'algo fácil / a mano',
    esStatus: 'mama = teta = facilidad · ≠ mamón · ≠ madre'
  });
  return { body, contentEn, contentEs, wiki };
}

function buildCabeloBodies() {
  const wiki = 'https://pt.wiktionary.org/wiki/cabelo';
  const body = `## Escopo

Inspeção editorial da palavra **[cabelo](${H.cabelo})** — o cabelo como **[sinal](${H.sinal}) de deferência**: *a gente deixa com as mulheres; elas sabem mais sobre o assunto*. Pedido de campo. Esta ficha cobre o **objecto** (lat. *capillus*), a leitura de ofício (**não fingir expertise**), os **limites** (não despejar trabalho, não reduzir mulher a cabelo), e o fecho [Valeu !!!](${H.mantra}). Mapa: [sinais](${H.sinais}).

> **Nota metodológica:** auditoria independente. Fonte: [Wikcionário · cabelo](${wiki}). **Ficha ≠ tratado de tricologia, ≠ manual de salão, ≠ regra de género sobre quem pode ter cabelo.** Homens também têm cabelo; a leitura é de **ofício e [respeito](${H.respeito})**, não de anatomia. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cabelo** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *capillus* → PT *cabelo* — confiança: alta |
| Família | *cabeleira* · *cabeludo* · *encabular* (outro étimo) · *pentear* |
| Sinal de ofício | **Deixa com as mulheres** — elas sabem mais do assunto |
| Tipo BudGanja | Palavra — parte do corpo × deferência de ofício |
| Elo mapa | [sinais](${H.sinais}) · [barriga](${H.barriga}) · [orelha](${H.orelha}) · [mama](${H.mama}) |
| Elo ofício | [respeito](${H.respeito}) · [verdade](${H.verdade}) · [gesto](${H.gesto}) |
| Fonte | [cabelo](${wiki}) |
| Data | 2026-08-21 |

**O que é o objecto:** o **cabelo**. No mapa de [sinais](${H.sinais}), o lab **não dá aula**: escuta quem sabe mais. Pedido de campo: as mulheres.

## 2. Deixar com quem sabe

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Fio / cabeleira** | Queratina visível; corte, trato, pente | Alta |
| **Sinal** | Deferência — *elas sabem mais* | Alta (leitura de campo) |
| **Ofício** | [Respeito](${H.respeito}) = olhar de novo, não fingir | Alta (mapa BudGanja) |

**H1:** cabelo no mapa = **sinal para não inventar**.  
**H2:** «deixar com as mulheres» = **crédito de saber**, não despejo de tarefa.  
**H3:** ter cabelo ≠ ter ofício de cabelo — o lab admite o limite.

## 3. Bom × mau

| Bom (ofício) | Mau (ruído) |
|--------------|-------------|
| Escutar, citar, não fingir | Dar palpite de salão sem [verdade](${H.verdade}) |
| [Respeito](${H.respeito}) a quem sabe | Reduzir mulher a «assunto de cabelo» noutros temas |
| Admitir o limite do lab | Despejar trabalho não pago e chamar isso de deferência |
| Homem também tem cabelo | «Cabelo é só delas» como anatomia — falso |

## 4. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${H.mantra}) — o melhor possível **sem fingir o ofício do cabelo**, hoje |
| Anti-armadilha 1 | Deferência ≠ despejo |
| Anti-armadilha 2 | Saber de cabelo ≠ único saber das mulheres |
| Mapa | [sinais](${H.sinais}) |

**Veredicto:** Valeu !!! **deixando o cabelo com quem sabe** — as mulheres, neste recorte; o lab ouve.

## Status

**Aprovado** — cabelo fichado: *capillus* · deixa com as mulheres · [respeito](${H.respeito}); [Valeu !!!](${H.mantra}).

[▶ Sinais](${H.sinais}) · [▶ Barriga](${H.barriga}) · [▶ Orelha](${H.orelha}) · [▶ Mama](${H.mama}) · [▶ Respeito](${H.respeito}) · [▶ Valeu !!!](${H.mantra})
`;
  const { contentEn, contentEs } = shortEnEs({
    word: 'cabelo',
    enScope:
      'Portuguese **cabelo** (hair) as a **[signal](' +
      H.sinal +
      ') of deference**: leave it with women — they know more. Not a salon manual. Not “men have no hair.” Hub: [sinais](' +
      H.sinais +
      '). Link [respeito](' +
      H.respeito +
      ').',
    enSignal: 'leave with women (they know more)',
    enStatus: 'hair · deference · not dumping labor',
    esScope:
      '**Cabelo** (cabello) como **[señal](' +
      H.sinal +
      ') de deferencia**: déjalo con las mujeres — saben más. No es manual de salón. No es «los hombres no tienen pelo». Mapa: [sinais](' +
      H.sinais +
      '). Vínculo [respeito](' +
      H.respeito +
      ').',
    esSignal: 'déjalo con las mujeres (saben más)',
    esStatus: 'cabello · deferencia · no es descargar trabajo'
  });
  return { body, contentEn, contentEs, wiki };
}

function stamp(post, slug, start, cover, wiki) {
  const seriesOrder = pickOrder(slug, start);
  post.seriesOrder = seriesOrder;
  post.coverImage = cover;
  post.sourceUrl = wiki;
  return post;
}

function buildSinaisPost() {
  const { body, contentEn, contentEs, wiki } = buildSinaisBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Sinais — o campo do corpo',
      titleEn: 'Inspection: Sinais — the body-signal field',
      titleEs: 'Inspección: Sinais — el campo del cuerpo',
      excerpt:
        'Palavras: «sinais» — plural de sinal; mapa do corpo: barriga=satisfação, orelha=pulga/curiosidade, mama/teta=algo fácil, cabelo=deixa com as mulheres, braços na cabeça=pausa; Valeu !!!',
      excerptEn:
        'Words: “sinais” — plural of sinal; body map: belly=satisfaction, ear=flea/curiosity, breast/teat=easy, hair=leave with women, arms on head=pause; Valeu !!!',
      excerptEs:
        'Palabras: «sinais» — plural de sinal; mapa del cuerpo: barriga=satisfacción, oreja=pulga/curiosidad, mama/teta=fácil, cabello=déjalo con las mujeres, brazos en la cabeza=pausa; ¡Valeu !!!',
      slug: 'inspecao-palavra-sinais',
      date: '2026-08-21T18:00:00.000Z',
      seriesOrder: 156,
      seriesLabel: 'Sinais · palavra',
      coverImage: '/imagens/inspecoes/sinais-palavra-cover.jpg',
      sourceUrl: wiki,
      body,
      contentEn,
      contentEs
    }),
    'inspecao-palavra-sinais',
    156,
    '/imagens/inspecoes/sinais-palavra-cover.jpg',
    wiki
  );
}

function buildBarrigaPost() {
  const { body, contentEn, contentEs, wiki } = buildBarrigaBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Barriga — sinal de satisfação',
      titleEn: 'Inspection: Barriga — signal of satisfaction',
      titleEs: 'Inspección: Barriga — señal de satisfacción',
      excerpt:
        'Palavras: «barriga» — ventre como sinal de satisfação (o bastante); ≠ Barriga de Trigo; mapa sinais; Valeu !!!',
      excerptEn:
        'Words: “barriga” — belly as a signal of satisfaction (enough); ≠ Wheat Belly; sinais map; Valeu !!!',
      excerptEs:
        'Palabras: «barriga» — vientre como señal de satisfacción (lo bastante); ≠ Barriga de Trigo; mapa sinais; ¡Valeu !!!',
      slug: 'inspecao-palavra-barriga',
      date: '2026-08-21T18:05:00.000Z',
      seriesOrder: 157,
      seriesLabel: 'Barriga · palavra',
      coverImage: '/imagens/inspecoes/barriga-palavra-cover.jpg',
      sourceUrl: wiki,
      body,
      contentEn,
      contentEs
    }),
    'inspecao-palavra-barriga',
    157,
    '/imagens/inspecoes/barriga-palavra-cover.jpg',
    wiki
  );
}

function buildOrelhaPost() {
  const { body, contentEn, contentEs, wiki } = buildOrelhaBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Orelha — pulga atrás, curiosidade',
      titleEn: 'Inspection: Orelha — flea behind, curiosity',
      titleEs: 'Inspección: Orelha — pulga detrás, curiosidad',
      excerpt:
        'Palavras: «orelha» — pulga atrás da orelha = curiosidade; elos inseto, dois ouvidos; mapa sinais; Valeu !!!',
      excerptEn:
        'Words: “orelha” — flea behind the ear = curiosity; links insect, two ears; sinais map; Valeu !!!',
      excerptEs:
        'Palabras: «orelha» — pulga detrás de la oreja = curiosidad; insecto, dos oídos; mapa sinais; ¡Valeu !!!',
      slug: 'inspecao-palavra-orelha',
      date: '2026-08-21T18:10:00.000Z',
      seriesOrder: 158,
      seriesLabel: 'Orelha · palavra',
      coverImage: '/imagens/inspecoes/orelha-palavra-cover.jpg',
      sourceUrl: wiki,
      body,
      contentEn,
      contentEs
    }),
    'inspecao-palavra-orelha',
    158,
    '/imagens/inspecoes/orelha-palavra-cover.jpg',
    wiki
  );
}

function buildMamaPost() {
  const { body, contentEn, contentEs, wiki } = buildMamaBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Mama — teta, sinal de algo fácil',
      titleEn: 'Inspection: Mama — teat, signal of something easy',
      titleEs: 'Inspección: Mama — teta, señal de algo fácil',
      excerpt:
        'Palavras: «mama» = «teta» — sinal de algo fácil; ≠ mamão ≠ mãe; mapa sinais; Valeu !!!',
      excerptEn:
        'Words: “mama” = “teta” — signal of something easy; ≠ papaya ≠ mother; sinais map; Valeu !!!',
      excerptEs:
        'Palabras: «mama» = «teta» — señal de algo fácil; ≠ mamón ≠ madre; mapa sinais; ¡Valeu !!!',
      slug: 'inspecao-palavra-mama',
      date: '2026-08-21T18:15:00.000Z',
      seriesOrder: 159,
      seriesLabel: 'Mama · palavra',
      coverImage: '/imagens/inspecoes/mama-palavra-cover.jpg',
      sourceUrl: wiki,
      body,
      contentEn,
      contentEs
    }),
    'inspecao-palavra-mama',
    159,
    '/imagens/inspecoes/mama-palavra-cover.jpg',
    wiki
  );
}

function buildCabeloPost() {
  const { body, contentEn, contentEs, wiki } = buildCabeloBodies();
  return stamp(
    makePalavra({
      title: 'Inspeção: Cabelo — deixa com as mulheres',
      titleEn: 'Inspection: Cabelo — leave it with women',
      titleEs: 'Inspección: Cabelo — déjalo con las mujeres',
      excerpt:
        'Palavras: «cabelo» — sinal de deferência: a gente deixa com as mulheres, elas sabem mais; ≠ despejo; mapa sinais; Valeu !!!',
      excerptEn:
        'Words: “cabelo” — signal of deference: leave it with women, they know more; ≠ dumping labor; sinais map; Valeu !!!',
      excerptEs:
        'Palabras: «cabelo» — señal de deferencia: déjalo con las mujeres, saben más; ≠ descargar trabajo; mapa sinais; ¡Valeu !!!',
      slug: 'inspecao-palavra-cabelo',
      date: '2026-08-21T18:20:00.000Z',
      seriesOrder: 160,
      seriesLabel: 'Cabelo · palavra',
      coverImage: '/imagens/inspecoes/cabelo-palavra-cover.jpg',
      sourceUrl: wiki,
      body,
      contentEn,
      contentEs
    }),
    'inspecao-palavra-cabelo',
    160,
    '/imagens/inspecoes/cabelo-palavra-cover.jpg',
    wiki
  );
}

module.exports = {
  buildSinaisPost,
  buildBarrigaPost,
  buildOrelhaPost,
  buildMamaPost,
  buildCabeloPost
};
