'use strict';

/**
 * Inspeção Palavras · sugestão
 * Eixos: lat. suggestio · ato de sugerir · palpite/opinião ·
 * meta-lab (inspecoes-sugestoes) · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSugestaoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/sugest%C3%A3o';

  const body = `## Escopo

Inspeção editorial da palavra **sugestão** — o **ato de sugerir**, o **palpite**, a **opinião** oferecida sem ordem, e, no laboratório BudGanja, o **pedido de ficha** que entra na fila de inspeções. Esta ficha cobre o **objeto** (lat. *suggestio*), o eixo **sugerir × mandar**, o uso psicológico (influência), o **meta-lab** das sugestões de inspeção, e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sugestão](${wiki}), série [Palavras](${hub}). **Ficha ≠ hipnose nem lista de ordens.** Tom: Inspetor BudGanja — *sugestão* é **proposta**; vira ofício quando ganha [objeto](${objetos}), [verdade](${verdade}) e [gesto](${gesto}). Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sugestão** (pl. *sugestões*) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *suggestiō* / *suggestiōnis* (de *suggerere*: «trazer por baixo / propor») — confiança: **alta** |
| Família | *sugerir* · *sugestivo* · *sugestionar* · *sugestionável* |
| Cognatos / paralelos | esp. *sugerencia* · fr. *suggestion* · ing. *suggestion* |
| Tipo BudGanja | Palavra — proposta × fila de ofício |
| Elo ofício | [mensagem](${mensagem}) · [gesto](${gesto}) · [caminho](${caminho}) · [objetos](${objetos}) |
| Elo vivo | [inspiração](${inspiracao}) · [criatividade](${criatividade}) · [sinal](${sinal}) |
| Elo ético | [verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · sugestão](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a **ideia oferecida** — não imposta. No lab: a sugestão alimenta a fila («inspeciona X»); a inspeção responde com ficha, ponte ou «ainda não».

## 2. Sugestão × ordem × inspiração × mensagem

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **sugestão** | Proposta / palpite | Pode recusar-se sem ruptura |
| **ordem** | Mandato | Outro registo de poder |
| **[inspiração](${inspiracao})** | Soprar / acender por dentro | Pode nascer sem pedido explícito |
| **[mensagem](${mensagem})** | Conteúdo enviado | A sugestão *é* um tipo de mensagem |
| **Meta-lab** | Item em *inspecoes-sugestoes* | Sugestão → status feita / pendente |

**H1:** *sugestão* < lat. *suggestio* — ato de propor (alta confiança).  
**H2:** no BudGanja, sugestão boa traz **objeto** claro e fonte quando houver.  
**H3:** sugestionar (psicologia / hipnose) ≠ fila editorial de fichas — não misturar.

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Ato de sugerir** | Propor ideia / caminho | Alta |
| **Palpite / opinião** | «Tenho uma sugestão» | Alta (uso vivo) |
| **Psicologia** | Influência da vontade (incl. hipnótica) | Alta (léxico) — fora do ofício desta ficha |
| **Fila BudGanja** | Pedido de inspeção / palavra / guia | Alta (meta-lab) |
| **Ofício** | Transformar sugestão em [objeto](${objetos}) inspecionável | Alta |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *sugestão* |
|-------|------------------------|
| [Mensagem](${mensagem}) · [sinal](${sinal}) | Como a sugestão chega |
| [Objetos](${objetos}) | O que a sugestão pede para fichar |
| [Inspiração](${inspiracao}) · [criatividade](${criatividade}) | De onde nasce o palpite |
| [Verdade](${verdade}) · [respeito](${respeito}) | Oferecer sem impor; receber sem desprezar |
| [Caminho](${caminho}) · [gesto](${gesto}) | Da ideia ao passo |
| [Risco](${risco}) | Sugestão vaga = ruído; sugestão clara = ofício |
| Hub [Inspeções](${hubAll}) | Casa onde as sugestões viram fichas |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Tenho uma sugestão»** | Proposta educada | Abrir objeto com [verdade](${verdade}) |
| **Caixa de sugestões** | Feedback | Meta-lab: fila de inspeções |
| **Sugestão hipnótica** | Psicologia | Fora do escopo editorial desta ficha |
| **«Só uma sugestão»** | Suavizar | Continua a ser proposta — inspecionar o conteúdo |
| **Ofício lab** | Pedir palavra / guia / planta | Vira Cap. quando aprovada e fichada |

**Finalidade-mãe:** nomear a **sugestão** para **propor com ofício** — ideia leve o bastante para caber, clara o bastante para virar [objeto](${objetos}).

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **nesta proposta**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Sugestão = ordem disfarçada» = falso ofício · «proposta com objeto» = inspetável |
| Par vivo | [mensagem](${mensagem}) · [objetos](${objetos}) · [inspiração](${inspiracao}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **ao sugerir e ao receber**. Sugestão sem [objeto](${objetos}) = névoa; sugestão com método = semente de inspeção.

## Hipóteses (síntese)

**H1:** objeto = lat. *suggestio* → sugestão (alta confiança).  
**H2:** proposta ≠ ordem; meta-lab = fila de fichas.  
**H3:** elos = [mensagem](${mensagem}) · [objetos](${objetos}) · [inspiração](${inspiracao}).  
**H4:** fecho = [Faça o melhor!](${mantra}) — propor e inspecionar.

## Limites

- Não é manual de hipnose nem de persuasão.  
- Sugestão ≠ compromisso automático de publicar.  
- Fila editorial tem prioridade e capacidade.

## Status

**Aprovado** — **sugestão** fichada: *suggestio*, proposta × meta-lab, rede com mensagem/objetos e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Mensagem](${mensagem}) · [▶ Objetos](${objetos}) · [▶ Inspiração](${inspiracao}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sugestão** — the act of suggesting, a tip/opinion, and in BudGanja the **queue item** that asks for a sheet. Lat. *suggestio*. Links [mensagem](${mensagem}), [objetos](${objetos}), [inspiracao](${inspiracao}), [Do your best!](${mantra}).

> Method note: [Wiktionary · sugestão](${wiki}). Not hypnosis. A suggestion is a proposal, not an order.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **sugestão** |
| Etymon | Lat. *suggestiō* — high confidence |
| Lab type | Proposal × inspection queue |
| Links | [mensagem](${mensagem}) · [objetos](${objetos}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Craft note

Good lab suggestions name a clear object. Vague suggestions are noise; clear ones become chapters.

## 3. Do your best!

Best possible **in this proposal**, today.

## Status

**Approved** — object · proposal craft · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Mensagem](${mensagem}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sugestão** — el acto de sugerir, el tip/opinión y, en BudGanja, el **ítem de cola** que pide ficha. Lat. *suggestio*. Vínculos [mensagem](${mensagem}), [objetos](${objetos}), [inspiracao](${inspiracao}), [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · sugestão](${wiki}). No es hipnosis. Sugerencia ≠ orden.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sugestão** |
| Étimo | lat. *suggestiō* |
| Tipo lab | Propuesta × cola de inspección |
| Vínculos | [mensagem](${mensagem}) · [objetos](${objetos}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Oficio

Buena sugerencia nombra un objeto claro.

## 3. ¡Haz lo mejor!

Lo mejor posible **en esta propuesta**, hoy.

## Estado

**Aprobada** — objeto · oficio de proponer · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Mensagem](${mensagem}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSugestaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildSugestaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 97;
  return makePalavra({
    title: 'Inspeção: Sugestão — proposta, palpite e fila de ofício',
    titleEn: 'Inspection: Sugestão — proposal, tip and craft queue',
    titleEs: 'Inspección: Sugestão — propuesta, tip y cola de oficio',
    excerpt:
      'Palavras: «sugestão» (lat. *suggestio*) — ato de sugerir; meta-lab da fila de inspeções; Faça o melhor!',
    excerptEn:
      'Words: “sugestão” (Lat. *suggestio*) — act of suggesting; meta-lab inspection queue; Do your best!',
    excerptEs:
      'Palabras: «sugestão» (lat. *suggestio*) — acto de sugerir; meta-lab de la cola de inspecciones; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-sugestao',
    date: '2026-08-03T18:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Sugestão · palavra',
    coverImage: '/imagens/inspecoes/sugestao-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSugestaoPost,
  buildSugestaoBodies
};
