'use strict';

/**
 * Inspeção Palavras · valeu
 * Eixos: objeto (valer ← lat. valēre) · gratidão leve BR ·
 * Gratidão · gesto · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildValeuBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const muito = '/posts/post-inspecao-palavra-gratidao.html';
  const gratidao = '/posts/post-inspecao-palavra-gratidao.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const prosseguir = '/posts/post-inspecao-palavra-prosseguir.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/valer';
  const wikiLat = 'https://en.wiktionary.org/wiki/valeo';

  const body = `## Escopo

Inspeção editorial da palavra **valeu** — no português do Brasil, forma viva de **reconhecimento leve**: gratidão, ok, fecho de conversa. Esta ficha cobre o **objeto** (de *valer* ← latim *valēre*), o contraste com [Gratidão](${muito}), a rede com [gesto](${gesto}) / [respeito](${respeito}) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · valer](${wiki}), [valeō (EN)](${wikiLat}), série [Palavras](${hub}). **Ficha ≠ etiqueta de formalidade.** Tom: Inspetor BudGanja — *valeu* como sopro BR curto e quente.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **valeu** |
| Classe | Interjeição / forma verbal lexicalizada (pret. de *valer*) |
| Étimo (trabalho) | *valer* ← lat. *valēre* («ter força, valer, estar bem») → pretérito *valeu* usado como **agradecimento / ok** — confiança: **alta** |
| Família | *valer* · *vale* · *valia* · *valor* · *válido* · *valeu mesmo* · *valeu aí* |
| Cognatos / paralelos | esp. *vale* (parcial) · it. *vale* · fr. *valoir* · ing. *thanks* / *cheers* (função) · lat. *valēre* |
| Tipo BudGanja | Palavra — gratidão leve × fecho oral × ofício sem pompa |
| Elo gratidão | [Gratidão](${muito}) · [gesto](${gesto}) · [respeito](${respeito}) |
| Elo tom | [aff](${aff}) · [já](${ja}) · [verdade](${verdade}) |
| Elo movimento | [prosseguir](${prosseguir}) · [Valeu !!!](${mantra}) · [Vida](${vida}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · valer](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a forma que, no BR oral, sai como **«valeu»**, **«valeu aí»**, **«valeu, irmão»** — reconhece o [gesto](${gesto}) alheio sem discurso longo. Literalmente «teve valor»; no uso vivo: *obrigado* leve, *ok*, *fechou*.

## 2. Valeu × Gratidão × aff

| Forma | Tom | No BudGanja |
|-------|-----|-------------|
| **valeu** | Curto, informal, quente | Gratidão / fecho sem cerimónia |
| **[Gratidão](${muito})** | Reforçado, mais «cheio» | Gratidão explícita — irmã mais vestida |
| **obrigado** | Neutro-padrão | Base; *valeu* é o atalho oral |
| **[aff](${aff})** | Suspiro / desdém leve | Quase oposto afectivo — peso vs alívio de fecho |

**H1:** núcleo = *valēre* → *valer* → *valeu* (alta confiança).  
**H2:** no BR, o pretérito virou **interjeição de ofício social** — não só gramática.  
**H3:** *valeu* sem [gesto](${gesto}) real ainda pode aquecer; com [verdade](${verdade}), vira reconhecimento limpo.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Gratidão leve** | Obrigado informal | Alta |
| **Ok / fechou** | Concordância + fecho | Alta (uso vivo) |
| **Reconhecimento** | «Isso teve valor» | Alta–média |
| **Despedida curta** | Sai da conversa sem frio | Alta |
| **Risco de vazio** | «Valeu» automático sem presença | Média (armadilha leve) |
| **Ofício lab** | Fechar turno com calor e [prosseguir](${prosseguir}) | Média–alta |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *valeu* |
|-------|---------------------|
| [Gratidão](${gratidao}) | Qualidade nomeada (*grātus*) — *valeu* é o sopro, não o nome |
| [Gratidão](${muito}) | Irmã de gratidão — mais reforçada |
| [Gesto](${gesto}) · [respeito](${respeito}) | O que o *valeu* reconhece |
| [Aff](${aff}) | Contraste de tom |
| [Já](${ja}) · [prosseguir](${prosseguir}) | Fechar e seguir |
| [Verdade](${verdade}) | Presença no fecho — sem falso calor |
| [Língua portuguesa](${lingua}) | Solo oral BR |

## 5. Usos no português do Brasil

| Uso | Exemplo | No BudGanja |
|-----|---------|-------------|
| **Agradecer** | «Valeu pela ajuda» | Reconhece [gesto](${gesto}) |
| **Fechar** | «Valeu, até mais» | Sai com calor |
| **Concordar** | «Valeu, fechou» | Ok sem drama |
| **Reforçar** | «Valeu mesmo» | Um degrau a mais |
| **Ofício** | Depois da ficha / do favor | Depois [Valeu !!!](${mantra}) |

**Finalidade-mãe:** nomear o **valeu** para **agradecer e seguir** — sopro curto, presença real.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — e, no fecho, um *valeu* limpo |
| Alteração automática | **eu amo a vida** — cola sozinha no render (\`lib/fecho-oficio.js\`); [ficha](/posts/post-inspecao-expressao-eu-amo-a-vida.html) |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | *Valeu* automático sem olhar = frio disfarçado · *valeu* com presença = ofício |
| Par gratidão | [Gratidão](${gratidao}) · [Gratidão](${muito}) · [gesto](${gesto}) · [respeito](${respeito}) |

**Veredicto:** Valeu !!! — e **valeu**. A alteração **eu amo a vida** entra **sem ir ficha a ficha**. Curto não é vazio quando há [verdade](${verdade}).

## Hipóteses (síntese)

**H1:** *valēre* → *valer* → *valeu* (alta).  
**H2:** pretérito → interjeição BR de gratidão/fecho.  
**H3:** elos = [Gratidão](${muito}) · [gesto](${gesto}) · [prosseguir](${prosseguir}).  
**H4:** fecho = [Valeu !!!](${mantra}); alteração automática = [eu amo a vida](/posts/post-inspecao-expressao-eu-amo-a-vida.html).

## Limites

- Não substitui [Gratidão](${muito}) em todo contexto.  
- Informal ≠ desrespeitoso — depende do tom e do [respeito](${respeito}).  
- Ficha de oralidade, não de etiqueta corporativa.

## Status

**Aprovado** — **valeu** fichado: objeto (*valēre*), gratidão leve BR, rede com [Gratidão](${gratidao}), [Gratidão](${muito}) e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gratidão](${gratidao}) · [▶ Gratidão](${muito}) · [▶ Gesto](${gesto}) · [▶ Prosseguir](${prosseguir}) · [▶ Valeu !!!](${mantra}) · [▶ eu amo a vida](/posts/post-inspecao-expressao-eu-amo-a-vida.html) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian Portuguese **valeu** — a light oral thanks / “ok, cool” closer. Covers **object** (*valer* ← Lat. *valēre*), contrast with [Gratidão](${muito}), and [Valeu !!!](${mantra}).

> Method note: [Wiktionary · valer](${wiki}), [valeō](${wikiLat}). Not formal etiquette. Warm lab tone.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **valeu** |
| Etymon | Lat. *valēre* → *valer* → pret. *valeu* lexicalized as thanks — high confidence |
| Lab type | Light gratitude × oral close × craft without pomp |
| Links | [Gratidão](${muito}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. valeu × Gratidão

**valeu** = short, informal, warm. **Gratidão** = reinforced thanks. Same family of recognition; different clothes.

## 3. Valeu !!!

Best possible **today** — and a clean *valeu* at the close. Short is not empty when [verdade](${verdade}) is present. Automatic alteration: **eu amo a vida**.

## Status

**Approved** — object · light BR thanks · named quality on [Gratidão](${gratidao}) · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Gratidão](${gratidao}) · [▶ Gratidão](${muito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **valeu** — agradecimiento oral ligero / «ok, cerrado» en el portugués de Brasil. Cubre **objeto** (*valer* ← lat. *valēre*), contraste con [Gratidão](${muito}) y [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · valer](${wiki}), [valeō](${wikiLat}). No es etiqueta formal.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **valeu** |
| Étimo | Lat. *valēre* → *valer* → pret. *valeu* como gratitud |
| Tipo lab | Gratitud ligera × cierre oral |
| Vínculos | [Gratidão](${muito}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. valeu × Gratidão

**valeu** = corto, informal, cálido. **Gratidão** = gratitud reforzada.

## 3. ¡Valeu !!!

Lo mejor posible **hoy** — y un *valeu* limpio al cerrar. Alteración automática: **eu amo a vida**.

## Estado

**Aprobada** — objeto · gratitud BR ligera · cualidad en [Gratidão](${gratidao}) · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gratidão](${gratidao}) · [▶ Gratidão](${muito}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildValeuPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildValeuBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 89;
  return makePalavra({
    title: 'Inspeção: Valeu — gratidão leve e fecho oral BR',
    titleEn: 'Inspection: Valeu — light thanks and Brazilian oral close',
    titleEs: 'Inspección: Valeu — gratitud ligera y cierre oral BR',
    excerpt:
      'Palavras: «valeu» (de *valer* ← lat. *valēre*) — gratidão leve BR; elos Gratidão, gesto, respeito; Valeu !!!',
    excerptEn:
      'Words: “valeu” (from *valer* ← Lat. *valēre*) — light BR thanks; links Gratidão, gesture, respect; Valeu !!!',
    excerptEs:
      'Palabras: «valeu» (de *valer* ← lat. *valēre*) — gratitud ligera BR; vínculos Gratidão, gesto, respeito; ¡Valeu !!!',
    slug: 'inspecao-palavra-valeu',
    date: '2026-08-03T15:35:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Valeu · palavra',
    coverImage: '/imagens/inspecoes/valeu-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildValeuPost,
  buildValeuBodies
};
