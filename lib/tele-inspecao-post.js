'use strict';

/**
 * Inspeção Palavras · tele
 * Pedido de campo: «isnpeçioanal palavra Tele» → inspeção na palavra Tele.
 * Eixos: gr. τῆλε (têle) «longe» · prefixo · recorte BR «a tele» (TV) ·
 * ≠ tela (lat. tēla) · ≠ Telê (alcunha) · família telefone / telescópio · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/tele-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/tele';
const WIKT_TELE_GR = 'https://en.wiktionary.org/wiki/%CF%84%E1%BF%86%CE%BB%CE%B5#Ancient_Greek';
const WIKT_TV = 'https://pt.wiktionary.org/wiki/televis%C3%A3o';
const WIKT_TEL = 'https://pt.wiktionary.org/wiki/telefone';
const WIKT_TELA = 'https://pt.wiktionary.org/wiki/tela';

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

function buildTeleBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-tele.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const discada = '/posts/post-inspecao-palavra-internet-discada.html';
  const dsl = '/posts/post-inspecao-palavra-dsl.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const olho = '/posts/post-inspecao-palavra-olho.html';
  const oculos = '/posts/post-inspecao-palavra-oculos.html';
  const mtela = '/posts/post-inspecao-palavra-mtela.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const login = '/posts/post-inspecao-palavra-login.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[tele](${self})**. Pedido de campo: *isnpeçioanal palavra Tele* → **inspeção na palavra Tele**. Duas salas no mesmo sopro: o **prefixo grego** τῆλε (*têle*) «longe / à distância», e o **recorte brasileiro** *a tele* (= [televisão](${WIKT_TV})). A [orelha cola](${orelhaCola}) **tele** em **tela**. O [étimo](${etimo}) corta.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · tele](${WIKT}), gr. [τῆλε](${WIKT_TELE_GR}), [televisão](${WIKT_TV}), [telefone](${WIKT_TEL}), [tela](${WIKT_TELA}). **Ficha ≠ história da TV, ≠ manual de telecomunicações, ≠ biografia de Telê Santana.** Série [Palavras](${hub}). Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *Tele* / *tele* / *a tele* / smash *isnpeçioanal* → lema **tele**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **tele** |
| Classes | 1) prefixo / forma combinante · 2) substantivo informal (recorte) |
| Étimo (trabalho) | gr. τῆλε *têle* «longe, ao longe, à distância» — confiança: **alta** |
| Recorte BR | *a tele* ← **televisão** (visão ao longe) |
| Não é | **[tela](${mtela})** (lat. *tēla* «pano / tecido» → ecrã) · Telê (alcunha) · til · telex (sistema) |
| Família (mapa) | telefone · televisão · telescópio · telegrama · telepatia · telecomando · teletrabalho |
| Elos lab | [ligar](${ligar}) · [conexão](${conexao}) · [internet discada](${discada}) · [olho](${olho}) · [luz](${luz}) · [sinal](${sinal}) |
| Fonte | [tele](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** a peça curta que, no grego, mede **distância**; na sala BR, nomeia **a caixa que mostra ao longe**. Duas funções; um étimo.

## 2. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **tele** | A [tela](${mtela}); o ecrã | Prefixo *longe* **ou** recorte de televisão |
| **[tela](${mtela})** | A tele | Lat. *tēla* — pano, teia, depois ecrã / cinema — [ficha mtela](${mtela}) |
| **a tele** | Qualquer ecrã | Recorte de **televisão** — a caixa, o canal, o hábito |
| **Telê** | O prefixo em maiúsculas | Alcunha (ex. Telê Santana) — **outra ficha**, se vier |
| **telex** | «tele» + x | Sistema telegráfico próprio — composto, não o lema |
| **telefone** | «a tele» que fala | *têle* + *phōnē* (voz) — [ligar](${ligar}) a voz ao longe |

**H1:** o prefixo **tele-** = longe (grego). Confiança alta.  
**H2:** *a tele* na fala BR é **recorte** de televisão, não o prefixo sozinho a circular.  
**H3:** [tela](${mtela}) e **tele** colam na orelha; os étimos **não** se tocam (*tēla* ≠ *têle*). A ficha da tela (e da [relação](/posts/post-inspecao-palavra-relacao.html) com papelão) é [mtela](${mtela}).  
**H4:** os compostos (telefone, telescópio…) **herdam o prefixo**; cada um pode ter ficha própria — esta ficha não os esgota.

## 3. Duas salas

| Sala | Ofício | Exemplo vivo |
|------|--------|--------------|
| **Prefixo** | Marca distância no composto | telefone, telescópio, telegrama, telepatia, teletrabalho |
| **Recorte** | Nome curto da televisão | «liga a tele», «não tem nada na tele», «a tele está alta» |

No lab: o prefixo é o **metro** (longe); o recorte é o **móvel** (a caixa). Não fundir.

## 4. Família à distância (mapa, não fichas-filhas)

| Composto | Peças | Leitura BudGanja |
|----------|-------|------------------|
| **telefone** | *têle* + *phōnē* (voz) | Voz ao longe — gesto: [ligar](${ligar}) |
| **televisão** | *têle* + visão | Ver ao longe — origem do recorte *a tele*; [luz](${luz}) no ecrã |
| **telescópio** | *têle* + *skopeîn* (olhar) | Olhar ao longe — [olho](${olho}) / [óculos](${oculos}) |
| **telegrama** | *têle* + *grámma* (letra) | Escrita ao longe — irmã da [mensagem](${mensagem}) |
| **telepatia** | *têle* + *páthos* | Sentir ao longe — metáfora; não protocolo |
| **telecomando** | *têle* + comando | Gesto ao longe — irmão do clique [ligar](${ligar}) |
| **internet discada** | o cano que **telefona** | [Discada](${discada}) / [DSL](${dsl}) — o prefixo no fio, não na caixa |

O [login](${login}) é a **porta**; a [conexão](${conexao}) é o **acto**; **tele** é a marca de que A e B **não estão no mesmo sítio**.

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Dizer «prefixo tele-» quando o composto mede distância |
| Bom | Dizer «a tele» quando a boca nomeia a televisão |
| Bom | Cortar **tele** × **tela** quando a orelha cola |
| Mau | Tratar *tele* como sinónimo de ecrã (*tela*) |
| Mau | Fundir Telê (nome) no prefixo |
| Mau | Transformar esta ficha em história da TV ou em tutorial de rede |

## 6. Verso de bancada

<pre class="lab-verse">tele.
não é a tela.
é o longe no grego
e a caixa na sala.
a orelha cola o pano no prefixo.
o étimo corta.
Valeu !!!</pre>

## Status

**Aprovado na série Palavras** — *tele* fichado: prefixo τῆλε (longe) × recorte *a tele* (TV); ≠ tela; família apontada, não esgotada.

[▶ Palavras](${hub}) · [▶ Ligar](${ligar}) · [▶ Conexão](${conexao}) · [▶ Discada](${discada}) · [▶ Olho](${olho}) · [▶ Luz](${luz}) · [▶ Guia](${guia}) · [▶ Língua](${lingua}) · [Wikcionário](${WIKT}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[tele](${self})**. Field request: *inspection of the word Tele*. Two rooms: the Greek prefix τῆλε (*têle*) “far / at a distance”, and the Brazilian clipping *a tele* (= television). The [ear glues](${orelhaCola}) **tele** to **tela** (screen). The etymon cuts.

> **Method note:** [Wiktionary · tele](${WIKT}), Gr. [τῆλε](${WIKT_TELE_GR}). **Not** a TV history, **not** a telecom manual, **not** Telê Santana. Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Word | **tele** |
| Classes | combining form · informal clipping |
| Etymon | Gr. τῆλε *têle* “far” — **high** confidence |
| Clipping | *a tele* ← televisão |
| Not | **tela** (Lat. *tēla* “cloth” → screen) · Telê (nickname) · tilde · telex |
| Links | [ligar](${ligar}) · [conexão](${conexao}) · [olho](${olho}) · [luz](${luz}) |
| Date | ${inspected} |

**H1:** prefix **tele-** = far.  
**H2:** spoken *a tele* is a clipping of television, not the prefix wandering alone.  
**H3:** *tela* and *tele* rhyme in the ear; *tēla* ≠ *têle*. The sheet for tela (and cardboard) is [mtela](${mtela}).  
**H4:** compounds inherit the prefix; this sheet does not exhaust them.

[▶ Words](${hub}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección editorial de **[tele](${self})**. Pedido: *inspección de la palabra Tele*. Dos salas: el prefijo griego τῆλε (*têle*) «lejos / a distancia», y el recorte brasileño *a tele* (= televisión). La oreja pega **tele** a **tela**. El étimo corta.

> **Nota:** [Wikcionario · tele](${WIKT}), gr. [τῆλε](${WIKT_TELE_GR}). **No** es historia de la TV ni manual de red. Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **tele** |
| Clases | prefijo / forma combinante · recorte informal |
| Étimo | gr. τῆλε *têle* «lejos» — confianza **alta** |
| Recorte | *a tele* ← televisão |
| No es | **tela** (lat. *tēla*) · Telê (apodo) · telex |
| Fecha | ${inspected} |

**H1:** prefijo **tele-** = lejos.  
**H2:** *a tele* en el habla BR es recorte de televisión.  
**H3:** *tela* ≠ *tele* en el étimo. La ficha de tela (y del cartón) es [mtela](${mtela}).  
**H4:** los compuestos heredan el prefijo; esta ficha no los agota.

[▶ Palabras](${hub}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildTelePost() {
  const { body, contentEn, contentEs, wiki } = buildTeleBodies();
  const seriesOrder = pickOrder('inspecao-palavra-tele', 315);
  return makePalavra({
    title: 'Inspeção: Tele — longe no grego, a caixa na sala',
    titleEn: 'Inspection: Tele — far in Greek, the box in the room',
    titleEs: 'Inspección: Tele — lejos en griego, la caja en la sala',
    excerpt:
      'Palavras: tele ← gr. têle (longe); recorte BR «a tele» (TV); ≠ tela (lat. tēla); família telefone/telescópio; Valeu !!!',
    excerptEn:
      'Words: tele ← Gr. têle (far); BR clipping “a tele” (TV); ≠ tela (Lat. tēla, screen); family telephone/telescope; Valeu !!!',
    excerptEs:
      'Palabras: tele ← gr. têle (lejos); recorte BR «a tele» (TV); ≠ tela (lat. tēla); familia teléfono/telescopio; ¡Valeu !!!',
    slug: 'inspecao-palavra-tele',
    date: '2026-08-24T15:00:00.000Z',
    seriesOrder,
    seriesLabel: 'Tele · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTelePost,
  buildTeleBodies,
  COVER,
  WIKT,
  WIKT_TELE_GR,
  WIKT_TV,
  WIKT_TEL,
  WIKT_TELA
};
