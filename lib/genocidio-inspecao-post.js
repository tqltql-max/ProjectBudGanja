'use strict';

/**
 * Inspeção Palavras · genocídio
 * Eixos: gr. génos + lat. -cīdium (caedere) · Lemkin 1944 ·
 * Convenção ONU 1948 · Lei 2.889/1956 · uso jurídico × uso político ·
 * ≠ guerra ≠ massacre ≠ homicídio ≠ escravidão ≠ perseguição.
 * Pedido: Inpeçao em Genocidio.
 * Ficha de vocábulo — não tribunal, não manifesto, não inventário de casos.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/genocidio-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/genoc%C3%ADdio';
const WIKT_EN = 'https://en.wiktionary.org/wiki/genocide';
const WIKT_CIDE = 'https://en.wiktionary.org/wiki/-cide';
const WIKT_GENOS = 'https://en.wiktionary.org/wiki/%CE%B3%CE%AD%CE%BD%CE%BF%CF%82#Ancient_Greek';
const WIKI = 'https://pt.wikipedia.org/wiki/Genoc%C3%ADdio';
const WIKI_LEMKIN = 'https://pt.wikipedia.org/wiki/Raphael_Lemkin';
const ONU = 'https://www.ohchr.org/pt/instruments-mechanisms/instruments/convention-prevention-and-punishment-crime-genocide';
const LEI = 'https://www.planalto.gov.br/ccivil_03/leis/L2889.htm';

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
  return `Genocídio.
Palavra nova
para um crime antigo.

Génos — o povo, o género, o tronco.
-Cídio — o corte que mata.

Não é a guerra sozinha.
Não é o massacre sozinho.
Não é o homicídio de um.
Não é a escravidão com outro nome.

É o nome de destruir
um grupo como grupo —
e isso pede tribunal,
não slogan.

O laboratório honra o peso
e corta as salas.
Não faz lista.
Não faz hino.

Valeu !!!
com respeito —
sem sermão no vocábulo.`;
}

function poemEn() {
  return `Genocídio.
A new word
for an old crime.

Génos — the people, the kind, the stock.
-Cide — the cut that kills.

Not war alone.
Not massacre alone.
Not the killing of one.
Not slavery under another name.

It is the name of destroying
a group as a group —
and that asks a court,
not a slogan.

The lab honours the weight
and cuts the rooms.
It makes no list.
It makes no hymn.

Valeu !!!
with respect —
no sermon on the word.`;
}

function poemEs() {
  return `Genocídio.
Palabra nueva
para un crimen antiguo.

Génos — el pueblo, el género, el tronco.
-Cidio — el corte que mata.

No es la guerra sola.
No es la masacre sola.
No es el homicidio de uno.
No es la esclavitud con otro nombre.

Es el nombre de destruir
un grupo como grupo —
y eso pide tribunal,
no eslogan.

El laboratorio honra el peso
y corta las salas.
No hace lista.
No hace himno.

¡Valeu !!!
con respeto —
sin sermón en el vocablo.`;
}

function buildGenocidioBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-genocidio.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const preso = '/posts/post-inspecao-palavra-preso.html';
  const liberdade = '/posts/post-inspecao-palavra-liberdade.html';
  const perseguicao = '/posts/post-inspecao-palavra-perseguicao.html';
  const ilegal = '/posts/post-inspecao-palavra-ilegal.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const guerra = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const unifesp = '/biblioteca/unifesp/';
  const unifespLivro = '/biblioteca/unifesp/livro-xiv.html';
  const unifespCurso = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';

  const body = `## Escopo

Inspeção editorial da palavra **[genocídio](${self})** — gr. *génos* («raça, povo, género, linhagem») + lat. *-cīdium* (*caedere*, «cortar / matar»). Pedido de campo: *Inpeçao em Genocidio*.

Objecto = o **vocábulo**. Não é tribunal. Não é manifesto. Não é inventário de casos. Não é [guerra](${guerra}). Não é [escravidão](${escravidao}). Não é [perseguição](${perseguicao}). O lab honra o peso da palavra e **corta as salas**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · genocídio](${WIKT}), [genocide](${WIKT_EN}), [*génos*](${WIKT_GENOS}), [*-cide*](${WIKT_CIDE}), [Wikipédia](${WIKI}), [Raphael Lemkin](${WIKI_LEMKIN}), [Convenção ONU 1948](${ONU}), [Lei 2.889/1956](${LEI}). **Ficha ≠ parecer jurídico, ≠ sentença, ≠ hino, ≠ negação.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *genocidio* / *genocídio* / *genocide* / *génocide* / *genocida* / *inpeçao em genocidio*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **genocídio** (PT) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Gr. *génos* + lat. *-cīdium* (*caedere*) — via fr. *génocide* / ing. *genocide* — confiança: **alta** |
| Data do nome | **1944** — Raphael Lemkin, *Axis Rule in Occupied Europe* |
| Marco jurídico | Convenção ONU para a Prevenção e a Repressão do Crime de Genocídio (**9 dez. 1948**) |
| Marco BR | [Lei 2.889, de 1 out. 1956](${LEI}) |
| Tipo BudGanja | Palavra — crime contra um **grupo como grupo** × uso político × família *-cídio* |
| Não é | [Guerra](${guerra}) · massacre · homicídio · [escravidão](${escravidao}) · [perseguição](${perseguicao}) |
| Data | ${inspected} |
| Fonte | [genocídio](${WIKT}) |

**O que é o objecto:** o nome jurídico (e depois político) de **destruir, no todo ou em parte, um grupo nacional, étnico, racial ou religioso, como tal**. A palavra é **nova** (meados do séc. XX). O crime que ela tenta nomear é **antigo**. O lab inspeciona o **nome**, não julga o século.

## 2. Origem — palavra nova, crime antigo

Até 1944, o português (e o direito internacional) tinha *homicídio*, *massacre*, *extermínio*, *guerra*. Não tinha **uma** peça que dissesse: *matar o grupo enquanto grupo*.

[Raphael Lemkin](${WIKI_LEMKIN}) (1900–1959), jurista polaco de família judaica, cunhou *genocide* no livro de 1944, na sombra da Shoah e da ocupação nazi. Junta:

| Peça | Língua | Sentido |
|------|--------|---------|
| **génos** (γένος) | Grego | Povo, estirpe, género, espécie — o **tronco** |
| **-cide / -cídio** | Lat. *caedere* / *-cīdium* | O corte que mata — família de *homicídio* |

A via até ao PT é culto-internacional: EN *genocide* / FR *génocide* → PT **genocídio**, ES *genocidio*, IT *genocidio*. Não é étimo popular brasileiro. Não viajou na diáspora da [maconha](${maconha}). Entrou pelo **direito e pela imprensa do pós-guerra**.

**H-idade:** a palavra tem ~80 anos; o acto que ela nomeia atravessa milénios. Fundir «não havia a palavra» com «não havia o crime» é falha de ofício.

## 3. A lei — o teste, não o slogan

A [Convenção de 1948](${ONU}) (art. II) define genocídio como actos cometidos **com intenção de destruir**, no todo ou em parte, um grupo **nacional, étnico, racial ou religioso, como tal**:

1. matar membros do grupo;  
2. ofensa grave à integridade física ou mental;  
3. sujeitar o grupo a condições de vida capazes de provocar a destruição física;  
4. impedir nascimentos no grupo;  
5. transferir à força crianças do grupo.

No Brasil, a [Lei 2.889/1956](${LEI}) internaliza essa figura. O lab **cita** a norma; **não** aplica a norma a um caso.

| Peça jurídica | Leitura lab |
|---------------|-------------|
| **Grupo protegido** | Nacional / étnico / racial / religioso — **não** o grupo político (exclusão de 1948, contestada até hoje) |
| **Dolo especial** | Querer destruir o grupo *como grupo* — não basta o número de mortos |
| **No todo ou em parte** | Não exige extinção total para o nome caber |
| **Genocídio cultural** | Lemkin discutiu; a Convenção **não** o listou como tal — outra sala |
| **Prevenção e punição** | O título da Convenção não é só memória; é **dever** dos Estados |

**H-lei:** genocídio é **figura penal internacional** (e BR). Quem usa a palavra como insulto de comício **baixa o teste**. Quem recusa a palavra para apagar o crime **apaga o teste**. Os dois erros são o mesmo: uma sala só.

## 4. Salas cortadas — o que a orelha cola

[A orelha cola o que a boca juntou](${orelha}). Aqui a cola é perigosa.

| Vizinho | Por que a orelha cola | Corte do lab |
|---------|----------------------|--------------|
| **Guerra** | Mortes em massa, Estados, exércitos | Guerra pode **conter** genocídio; guerra **não é** genocídio por defeito. Ver [Guerra do Paraguai](${guerra}) — o lab já declarou dissenso de números e culpas; **não** fecha o nome desta ficha sobre 1864–1870 |
| **Massacre** | Muitos mortos de uma vez | Massacre é método / evento; falta o **dolo contra o grupo como tal** |
| **Homicídio** | Mesmo *-cídio* | Objecto = **uma** vida; genocídio = o **grupo** |
| **[Escravidão](${escravidao})** | Crime contra pessoas, história atlântica | Outro étimo, outro sistema, outra lei (cativeiro × art. 149). **Não** fundir |
| **[Perseguição](${perseguicao})** | Seguir / oprimir um grupo | Pode ser caminho; não é o mesmo crime |
| **Limpeza étnica** | Deslocar, expulsar, apagar presença | Sobreposição frequente; **não** sinónimo jurídico fechado |
| **[Preso](${preso}) / [liberdade](${liberdade})** | Encarceramento em massa | Estado de cativeiro ≠ destruição do grupo *como tal* |
| **[Ilegal](${ilegal}) / [proibição](${proibicao})** | Política de drogas, seletividade | Uso político BR da palavra — **viagem semântica**, não sentença |

**H-Paraguai:** chamar 1864–1870 de genocídio é **tese historiográfica em disputa**, não o objecto desta ficha. O lab aponta a [guerra](${guerra}) e **não** aplica o art. II da Convenção (que ainda não existia) como atalho.

## 5. Família *-cídio* — mesmo sufixo, outro objecto

| Forma | Objecto | Sala |
|-------|---------|------|
| **homicídio** | A pessoa | Crime contra a vida individual |
| **suicídio** | Si | Outra ficha, se o campo pedir |
| **infanticídio** | A criança (figura penal própria) | Não fundir com o grupo |
| **fratricídio** | O irmão | Metáfora viva; não é esta ficha |
| **pesticida** | A praga | Química / cultivo — **mesmo sufixo, outro mundo** |
| **genocida** | Quem pratica / é acusado do crime | Agente; não o vocábulo-mãe |

**H-família:** *-cídio* só diz **morte por corte**. O prefixo diz **quem / o quê**. Fundir pesticida com genocídio porque rimam é ofício morto.

## 6. Viagem no português do Brasil

Três camadas, **três frases**.

1. **Sala da lei.** Convenção 1948 · [Lei 2.889/1956](${LEI}) · tribunais (Nuremberga como contexto da cunhagem; depois TPI, TIJ, tribunais ad hoc). O lab **não** lista sentenças.  
2. **Sala da história.** A palavra nasce para nomear o que o direito antigo não cobria de um só golpe. Uso responsável: fonte, grupo protegido, intenção.  
3. **Sala da política BR.** No debate público, *genocídio* alarga-se: juventude negra, povos indígenas, Amazónia, política de drogas. No [livro XIV UNIFESP](${unifespLivro}) (aula SUS), a 17.ª Conferência Nacional de Saúde cita a regulamentação da [maconha](${maconha}) «como forma de combate ao genocídio, encarceramento da juventude negra». Isso é **uso** da palavra em política de saúde — ver [curso UNIFESP](${unifespCurso}) · [hub](${unifesp}). O lab **regista a viagem**. Não transforma a frase da Conferência em artigo da Convenção, nem a Convenção em silêncio sobre o encarceramento.

**H-viagem:** alargar o vocábulo pode **alertar** ou **esvaziar**. O ofício é dizer **qual sala** está na boca. [Respeito](${respeito}) a quem vive a palavra; [verdade](${verdade}) sobre o teste jurídico.

## 7. Hipóteses

**H1:** PT *genocídio* ← FR/EN *génocide* / *genocide* ← gr. *génos* + lat. *-cīdium* — alta.  
**H2:** cunhagem = Lemkin, 1944 — alta.  
**H3:** o núcleo jurídico = intenção de destruir um grupo protegido *como tal* — alta (texto da Convenção).  
**H4:** guerra, massacre, homicídio, [escravidão](${escravidao}) e [perseguição](${perseguicao}) são vizinhos, não sinónimos — alta.  
**H5:** o uso político BR é transformação semântica viva — alta o facto; **média** qualquer equivalência legal.  
**H6:** o lab não inventaria casos, não nega crimes, não ensina dano. Inspeciona o vocábulo.

## 8. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | Muitos mortos = genocídio | Falta o **grupo como tal** e a **intenção** |
| **A guerra** | Toda guerra é genocídio | Pode conter; não é o nome automático |
| **O slogan** | A palavra vale como grito | Na lei, é **teste**; no comício, é **uso** — duas salas |
| **A idade** | Sem a palavra, sem o crime | O nome é de 1944; o acto não |
| **A cannabis** | A ficha é a guerra às drogas | A [proibição](${proibicao}) pode **citar** o vocábulo; não o define |
| **A lista** | Esta página escolhe quais genocídios «contam» | Esta página **recusa** a lista — isso é tribunal |

## 9. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear *genocídio* como figura com teste (grupo + intenção) |
| Bom | Separar lei, história e política em frases distintas |
| Bom | [Respeito](${respeito}) às vítimas e à [vida](${vida}) — sem transformar memória em arma de teclado |
| Mau | Tutorial, apologia ou negação |
| Mau | Fundir com [guerra](${guerra}), [escravidão](${escravidao}) ou homicídio |
| Mau | Usar a palavra para ganhar uma discussão e perder o sentido |

## 10. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=genocidio)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Escravidão](${escravidao}) | Sistema outro — não fundir |
| [Preso](${preso}) · [liberdade](${liberdade}) | Cativeiro / condição — vizinhos |
| [Perseguição](${perseguicao}) | Seguir hostil — pode ser caminho, não o mesmo crime |
| [Guerra do Paraguai](${guerra}) | Guerra nomeada; tese de genocídio = disputa, não desta ficha |
| [Legal](${legal}) · [ilegal](${ilegal}) · [proibição](${proibicao}) | Lei e política — salas ao lado |
| [Maconha](${maconha}) · [UNIFESP](${unifesp}) · [livro XIV](${unifespLivro}) | Onde o vocábulo viaja no debate de saúde BR |
| [Verdade](${verdade}) · [respeito](${respeito}) · [vida](${vida}) | Ofício |
| [Língua portuguesa](${lingua}) | Solo do empréstimo culto |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho — com respeito |

## Limites

- Não é parecer da Convenção nem da [Lei 2.889/1956](${LEI}).  
- Não inventaria genocídios reconhecidos ou contestados.  
- Não comenta conflitos contemporâneos caso a caso.  
- Não é ficha de homicídio, massacre ou «genocídio cultural».  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **genocídio** fichado como gr. *génos* + lat. *-cīdium* (Lemkin 1944; Convenção 1948; Lei 2.889/1956); crime contra o **grupo como grupo**; salas cortadas (guerra, massacre, homicídio, escravidão, perseguição, slogan). Uso político BR registado como viagem, não como sentença. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Escravidão](${escravidao}) · [▶ Perseguição](${perseguicao}) · [▶ Guerra do Paraguai](${guerra}) · [▶ UNIFESP](${unifesp}) · [▶ Poema Vida](/vida/#poema=genocidio) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **genocídio** — Gk. *génos* («people, kind, stock») + Lat. *-cīdium* (*caedere*, «to cut / to kill»). Field request: *Inpeçao em Genocidio*. The object is the **word**: a **1944** coinage (Raphael Lemkin) for the crime of destroying a **group as a group**. Not a court. Not a manifesto. Not a case list. Not [war](${guerra}), [slavery](${escravidao}), [persecution](${perseguicao}), or homicide.

Legal core: [UN Convention, 9 Dec. 1948](${ONU}) (Art. II) — intent to destroy, in whole or in part, a national, ethnical, racial or religious group as such. Brazil: [Law 2.889/1956](${LEI}). Political use in BR (including [UNIFESP XIV](${unifespLivro}) on cannabis / Black youth) is **semantic travel**, not a verdict.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Group-as-group ≠ war ≠ massacre ≠ slogan. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **genocídio** — gr. *génos* («pueblo, género, linaje») + lat. *-cīdium* (*caedere*). Pedido: *Inpeçao em Genocidio*. El objeto es el **vocablo**: acuñación de **1944** (Raphael Lemkin) para destruir un **grupo como grupo**. No es tribunal. No es manifiesto. No es lista de casos. No es [guerra](${guerra}), [esclavitud](${escravidao}), [persecución](${perseguicao}) ni homicidio.

Núcleo jurídico: [Convención ONU, 9 dic. 1948](${ONU}) (art. II). Brasil: [Ley 2.889/1956](${LEI}). El uso político BR (incl. [UNIFESP XIV](${unifespLivro})) es **viaje semántico**, no sentencia.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Grupo-como-grupo ≠ guerra ≠ masacre ≠ eslogan. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildGenocidioPost() {
  const { body, contentEn, contentEs } = buildGenocidioBodies();
  const seriesOrder = pickOrder('inspecao-palavra-genocidio', 307);
  return makePalavra({
    title: 'Inspeção: Genocídio — o nome de destruir um grupo como grupo; ≠ guerra ≠ slogan',
    titleEn: 'Inspection: Genocídio — the name of destroying a group as a group; ≠ war ≠ slogan',
    titleEs: 'Inspección: Genocídio — el nombre de destruir un grupo como grupo; ≠ guerra ≠ eslogan',
    excerpt:
      'Palavras: genocídio (génos + -cīdium; Lemkin 1944) — Convenção 1948 · Lei 2.889/1956; ≠ guerra ≠ massacre ≠ escravidão; Valeu !!!',
    excerptEn:
      'Words: genocídio (génos + -cīdium; Lemkin 1944) — 1948 Convention · Law 2.889/1956; ≠ war ≠ massacre ≠ slavery; Valeu !!!',
    excerptEs:
      'Palabras: genocídio (génos + -cīdium; Lemkin 1944) — Convención 1948 · Ley 2.889/1956; ≠ guerra ≠ masacre ≠ esclavitud; ¡Valeu !!!',
    slug: 'inspecao-palavra-genocidio',
    date: '2026-08-24T12:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Genocídio · palavra',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGenocidioPost,
  buildGenocidioBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_EN,
  ONU,
  LEI
};
