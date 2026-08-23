'use strict';

/**
 * Inspeção Palavras · cinta
 * Eixos: objeto (faixa que cinge) · ofício de amarrar/suportar ·
 * cultivo × gesto · ≠ sinta · ≠ cinta ID (amor) · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildCintaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const cultivo = '/cultivo/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const equipamentos = '/objetos/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/cinta';
  const wikiCingere = 'https://pt.wiktionary.org/wiki/cingir';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';

  const body = `## Escopo

Inspeção editorial da palavra **cinta** — no português do Brasil, a **faixa** ou **banda** que **cinge**, **segura** ou **amarra**: cintura, correia, tira, e no ofício de cultivo a **cinta / fita** que tutora ou marca a [planta](${planta}) sem a estrangular. Esta ficha cobre o **objeto**, o eixo **suporte × cuidado**, a distinção **cinta ≠ sinta** e o falso amigo **cinta** (indonésio «amor»), e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · cinta](${wiki}), [cingir](${wikiCingere}), série [Palavras](${hub}). **Ficha ≠ manual de tutoramento nem catálogo de fitas.** Tom: Inspetor BudGanja — *cinta* nomeia o que **envolve e segura**; no lab, o [gesto](${gesto}) decide se segura ou fere. Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **cinta** |
| Classe | Substantivo feminino (também formas do verbo *cintar* / particípio de *cingir*) |
| Étimo (trabalho) | lat. *cincta* / família de *cingere* («cingir, rodear») → pt. *cinta*, esp. *cinta*, gal. *cinta* — confiança: **alta** |
| Família | *cintura* · *cinturão* · *cintar* · *cingir* · *cinto* |
| Cognatos / paralelos | esp. *cinta* · fr. *ceinture* (cintura/cinto) · ing. *belt* / *tape* / *strap* (conforme sentido) |
| Tipo BudGanja | Palavra — suporte / faixa × ofício vivo |
| Elo ofício | [gesto](${gesto}) · [cultivo](${cultivo}) · [planta](${planta}) · [risco](${risco}) |
| Elo léxico | [sinal](${sinal}) · [caminho](${caminho}) · [verdade](${verdade}) · [língua portuguesa](${lingua}) |
| Elo projecto | [Objetos](${equipamentos}) · [Plantas](${plantas}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · cinta](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a **tira** que **roda e segura** — corpo, volume, haste ou rótulo. No lab: ferramenta de **suporte e marcação**; o ofício é apertar o bastante para **não cair**, frouxo o bastante para **não matar**.

## 2. Cinta × sinta × cinta (ID) × fita

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **cinta** | Faixa / banda / correia | Substantivo — o objecto que cinge |
| **sinta** | Forma de *sentir* («que ela sinta») | Homófono em alguns sotaques — **não** é a mesma palavra ([Wikcionário](${wiki})) |
| **cinta (indonésio)** | «amor» | Falso amigo no pack multilíngue — **≠** cinta PT |
| **fita** | Tira fina (adesiva, de marcar, cassete) | Vizinha de ofício; elo da expressão [fim da linha](${fimLinha}) — o resto do rolo |
| **cinto** | Mais «acessório de cintura» | Parente; cinta cobre faixa/banda em geral |

**H1:** *cinta* vem da família de *cingir* — rodear para segurar.  
**H2:** no cultivo, cinta má = [risco](${risco}) de anelamento; cinta boa = [gesto](${gesto}) com folga.  
**H3:** não misturar com *sinta* nem com o «amor» indonésio.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Corpo / vestuário** | Faixa na cintura; modeladora | Alta |
| **Tira / correia** | Segurar carga, volume, peça | Alta |
| **Cinta adesiva** | Fita cola (uso corrente BR) | Alta (uso vivo) |
| **Cultivo / tutor** | Amarrar haste a estaca / arco | Alta (ofício lab) |
| **Marcação** | Etiqueta / faixa de identificação | Média–alta |
| **Verbo** | *cintar* / flexões de *cingir* | Alta (gramática) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *cinta* |
|-------|---------------------|
| [Planta](${planta}) · [Plantas](${plantas}) · [Cultivo](${cultivo}) | Onde a cinta tutora ou marca o vivo |
| [Gesto](${gesto}) | Aperto certo — ofício da mão |
| [Risco](${risco}) | Estrangular o caule = falha de inspeção |
| [Sinal](${sinal}) | Cinta de cor / rótulo como sinal |
| [Caminho](${caminho}) · [verdade](${verdade}) | Segurar o plano sem forçar o vivo |
| [Objetos](${equipamentos}) | Clonadoras e montagens — fitas/cintas no material |
| [Língua portuguesa](${lingua}) | Solo lexical |
| [Fim da linha](${fimLinha}) | Quando a fita acaba — casca do confeito, resto do rolo, arco da vida |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Cinta / cinto** | Vestuário | Metáfora de «o que segura o meio» |
| **Cinta adesiva** | Colar / embalar | Ofício de oficina — não confundir com tutor macio |
| **Cinta na planta** | Tutoramento | Folga + material que não corte; rever crescimento |
| **«Pôr uma cinta»** | Reforçar / apertar | Inspecionar se o aperto ainda serve |
| **Homófono *sinta*** | Verbo *sentir* | Ortografia e contexto — [verdade](${verdade}) da frase |

**Finalidade-mãe:** nomear a **cinta** para **segurar com ofício** — suporte que acompanha o crescimento, não nó que mata.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor aperto **nesta haste**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Quanto mais apertado, melhor» = falso · «segura e deixa crescer» = ofício |
| Par vivo | [gesto](${gesto}) · [planta](${planta}) · [cultivo](${cultivo}) · [risco](${risco}) |

**Veredicto:** Valeu !!! **com a cinta certa**. Cinta sem [gesto](${gesto}) = estrangulamento; cinta com inspeção = suporte que respeita o vivo.

## Hipóteses (síntese)

**H1:** objeto = faixa da família *cingere* → cinta (alta confiança).  
**H2:** no lab = suporte / marcação com folga.  
**H3:** elos = [gesto](${gesto}) · [planta](${planta}) · [cultivo](${cultivo}) · [risco](${risco}).  
**H4:** fecho = [Valeu !!!](${mantra}) — amarrar e revisitar.

## Limites

- Não é tutorial completo de tutoramento nem lista de materiais.  
- Cinta PT ≠ *cinta* (amor, indonésio) ≠ *sinta* (*sentir*).  
- Material e aperto mudam com espécie e fase — inspecionar de novo.

## Status

**Aprovado** — **cinta** fichada: faixa que cinge, ofício de suporte no cultivo, distinções *sinta* / falso amigo ID, rede com gesto/planta e [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Planta](${planta}) · [▶ Cultivo](${cultivo}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **cinta** — a **band / strap / belt** that girds or holds; in the lab, soft ties and tapes that stake or label a [planta](${planta}) without girdling it. Links [gesto](${gesto}), [cultivo](${cultivo}), [risco](${risco}), [Valeu !!!](${mantra}).

> Method note: [Wiktionary · cinta](${wiki}). Not a staking manual. ≠ *sinta* (*sentir*). ≠ Indonesian *cinta* (“love”).

## 1. Object

| Field | Value |
|-------|-------|
| Word | **cinta** |
| Etymon | Lat. *cincta* / *cingere* — “to gird” — high confidence |
| Lab type | Support / band × living craft |
| Links | [gesto](${gesto}) · [planta](${planta}) · [cultivo](${cultivo}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Craft note

Good cinta holds with slack for growth. Tight cinta = [risco](${risco}) of stem girdling. Re-check as the plant thickens.

## 3. Valeu !!!

Best possible **on this stem**, today. Cinta without [gesto](${gesto}) = damage; with inspection = support.

## Status

**Approved** — object · support craft · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Gesto](${gesto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **cinta** — **banda / correa / tira** que ciñe o sujeta; en el lab, cintas que tutoran o marcan la [planta](${planta}) sin estrangularla. Vínculos [gesto](${gesto}), [cultivo](${cultivo}), [risco](${risco}), [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · cinta](${wiki}). No es manual de tutorado. ≠ *sinta* (*sentir*). ≠ indonesio *cinta* («amor»).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **cinta** |
| Étimo | lat. *cincta* / *cingere* — «ceñir» |
| Tipo lab | Soporte / banda × oficio vivo |
| Vínculos | [gesto](${gesto}) · [planta](${planta}) · [cultivo](${cultivo}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Oficio

Cinta buena = sujeta con holgura. Cinta apretada = [risco](${risco}) de anillado. Revisar al crecer.

## 3. ¡Valeu !!!

Lo mejor posible **en este tallo**, hoy.

## Estado

**Aprobada** — objeto · oficio de soporte · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCintaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCintaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 92;
  return makePalavra({
    title: 'Inspeção: Cinta — faixa que cinge e suporte no cultivo',
    titleEn: 'Inspection: Cinta — girding band and cultivation support',
    titleEs: 'Inspección: Cinta — banda que ciñe y soporte en el cultivo',
    excerpt:
      'Palavras: «cinta» (lat. *cincta* / *cingere*) — faixa que segura; tutoramento com gesto; ≠ sinta; Valeu !!!',
    excerptEn:
      'Words: “cinta” (Lat. *cincta* / *cingere*) — band that holds; staking with craft; ≠ sinta; Valeu !!!',
    excerptEs:
      'Palabras: «cinta» (lat. *cincta* / *cingere*) — banda que sujeta; tutorado con oficio; ≠ sinta; ¡Valeu !!!',
    slug: 'inspecao-palavra-cinta',
    date: '2026-08-03T16:45:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cinta · palavra',
    coverImage: '/imagens/inspecoes/cinta-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCintaPost,
  buildCintaBodies
};
