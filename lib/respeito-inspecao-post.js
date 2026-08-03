'use strict';

/**
 * Inspeção Palavras · respeito
 * Eixos: olhar de novo · valor social · prática (não sermão) ·
 * elos verdade/gesto · contraste vingança · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildRespeitoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const livro = '/posts/post-inspecao-palavra-livro.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const jesus = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeus = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/respeito';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Respeito';

  const body = `## Escopo

Inspeção editorial da palavra **respeito** — substantivo (e prática) do português para **consideração**, **consideração mútua** e o acto de **olhar de novo** para alguém ou algo. Esta ficha cobre o **objeto**, os **sentidos** (valor × prática social × limite), o contraste com a [vingança](${vinganca}) e o fecho [Faça o melhor!](${mantra}). Tom: **ofício**, não sermão. Elos: [verdade](${verdade}), [gesto](${gesto}), [alegria](${alegria}), [raiva](${raiva}), [emocao](${emocao}), [caminho](${caminho}), [Vida](${vida}) / [Diário](${diario}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · respeito](${wiki}), [Wikipédia · Respeito](${wikiEl}), série [Palavras](${hub}). Étimo de trabalho: latim *respectus* («olhar para trás; consideração») ← *respicere* (*re-* + *specere*, olhar). **Ficha ≠ catecismo moral nem protocolo de etiqueta.** Sem afiliação religiosa ou comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **respeito** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *respectus* ← *respicere* («olhar de novo / ter em conta») → PT *respeito* — confiança: alta |
| Família | *respeitar* · *respeitável* · *respeitoso* · *desrespeito* · *a respeito de* |
| Cognatos | esp. *respeto* · fr. *respect* · it. *rispetto* · ing. *respect* · lat. *respectus* |
| Tipo BudGanja | Palavra — valor × prática social × ofício |
| Elo inspeção | [verdade](${verdade}) · [gesto](${gesto}) |
| Elo afecto | [alegria](${alegria}) · [raiva](${raiva}) · [medo](${medo}) · [emocao](${emocao}) |
| Elo contraste | [A vingança mata a alma e a envenena](${vinganca}) |
| Elo ofício | [caminho](${caminho}) · [Faça o melhor!](${mantra}) · [língua portuguesa](${lingua}) |
| Elo projecto | [livro](${livro}) · [simbiose](${simbiose}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · respeito](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **consideração** — não só «ser educado», mas **voltar a olhar** (étimo) e ajustar o trato. No BudGanja: prática de laboratório (fontes, pessoas, planta, desacordo) com [verdade](${verdade}) à vista; não pose de virtude.

## 2. Sentidos — olhar · valor · prática · limite

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo (*respicere*)** | Olhar de novo; ter em conta | Alta |
| **Consideração** | Levar o outro (ou o objecto) a sério no cálculo | Alta (uso comum) |
| **Valor social** | Norma de convívio — «ter respeito» | Alta |
| **Prática** | Actos concretos: ouvir, citar, não humilhar, cumprir trato | Alta (uso vivo) |
| **Limite / autoprotecção** | Respeito próprio; não confundir com submissão | Alta–média |
| **Registo («a respeito de»)** | «Sobre / acerca de» — sentido gramatical vizinho | Alta |
| **Ofício lab** | Tratar fonte, planta e interlocutor com método — sem flattery | Média–alta (mapa BudGanja) |

**H1:** *respeito* herda o *respectus* — **olhar de novo**, não só «boa educação».  
**H2:** valor sem [gesto](${gesto}) vira cartaz; gesto sem [verdade](${verdade}) vira performance.  
**H3:** no lab, respeito **bom** = considerar o outro *e* a evidência; **mau** = silêncio forçado ou culto de hierarquia.

## 3. Prática social (sem sermão)

Respeito aqui é **como se age no convívio e no ofício** — não lista de mandamentos.

| Situação | Bom (prática) | Mau (pose) |
|----------|---------------|------------|
| **Desacordo** | Nomear o ponto com [verdade](${verdade}); ouvir o outro | «Respeito» como tapa-boca · ou humilhar |
| **Fonte / [livro](${livro})** | Citar, contextualizar, não inventar página | Nomear sem ler · ou apagar mérito alheio |
| **Afecto** | [Alegria](${alegria}) sem invadir; [raiva](${raiva}) com limite | «Respeito» que engole emoção · ou fogo sem ofício |
| **Medo / vulnerabilidade** | [Medo](${medo}) reconhecido sem zombar | Ridicularizar quem treme |
| **Fé alheia** | Tom de [jesusamando](${jesus}) / [meudeusdoceu](${meudeus}): acolher sem doutrina | Ironizar crença · ou impor crença na ficha |
| **Convívio vivo** | [Simbiose](${simbiose}) — viver *com*, não *sobre* | Hierarquia teatral sem mérito |

**Veredicto da prática:** respeito = **consideração rastreável**. Se não dá para apontar o [gesto](${gesto}), era só discurso.

## 4. Contraste — respeito × vingança

| Polo | Leitura BudGanja |
|------|------------------|
| **Respeito** | Olhar de novo; manter o outro (e a si) no cálculo; fechar com ofício |
| **[Vingança](${vinganca})** | Olhar só o dano; devolver veneno; a expressão do lab já avisa: mata a alma e envenena |

Não é «nunca sentir [raiva](${raiva})». É escolher se a [raiva](${raiva}) vira **limite com método** ou **ciclo de veneno**. Respeito próprio também cabe: sair do ciclo sem fingir santidade.

## 5. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Considerar** | Ter em conta pessoa, regra, espaço | Olhar de novo a fonte e o interlocutor |
| **Convívio** | Não humilhar; cumprir trato | Tom das fichas · [Vida](${vida}) / [Diário](${diario}) |
| **Autoridade** | Respeito por mérito / cargo | Mérito rastreável — não culto vazio |
| **Próprio** | Não se anular | Limite saudável ≠ ego inflado |
| **«A respeito de»** | Sobre o assunto | Registo gramatical — não confundir com valor |
| **Fechar** | Depois do trato, o acto | [Verdade](${verdade}) + [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** nomear o **respeito** para **praticar consideração com ofício** — olhar de novo; não sermão nem submissão disfarçada.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com este trato**, hoje — sem pose de virtude |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Exijo respeito, dispenso [verdade](${verdade})» = falso · respeito pede inspeção |
| Par afecto | [Alegria](${alegria}) · [raiva](${raiva}) · [medo](${medo}) — emoções com espaço, sem zombaria |
| Contraste | [Vingança](${vinganca}) — o outro polo do peito ferido |
| Oralidade | [jesusamando](${jesus}) · [meudeusdoceu](${meudeus}) — respeito à fé sem doutrina |

**Veredicto:** Faça o melhor **com respeito** — [gesto](${gesto}) + [verdade](${verdade}). Respeito sem [caminho](${caminho}) = cartaz; respeito com método = consideração que fica.

## Hipóteses (síntese)

**H1:** objeto = *respectus* → olhar de novo / consideração.  
**H2:** sentidos = valor · prática · limite · registo («a respeito de»).  
**H3:** elos = [verdade](${verdade}) · [gesto](${gesto}) · [emocao](${emocao}) · [vinganca](${vinganca}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com respeito, sem sermão.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Verdade](${verdade}) · [Gesto](${gesto}) | Inspeção e acto |
| [Alegria](${alegria}) · [Raiva](${raiva}) · [Medo](${medo}) · [Emoção](${emocao}) | Afectos com espaço |
| [Vingança](${vinganca}) | Contraste — veneno vs. consideração |
| [Livro](${livro}) · [Simbiose](${simbiose}) | Fonte e convívio vivo |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é catecismo, protocolo de etiqueta nem aconselhamento psicológico.  
- Respeito ≠ silêncio forçado; ≠ licença para mentir.  
- Respeito próprio ≠ ego inflado; ≠ submissão disfarçada de virtude.  
- Fé alheia: acolher tom; sem proselitismo nesta ficha.

## Status

**Aprovado** — **respeito** fichado: objeto (*respectus* / olhar de novo), sentidos (valor · prática · limite), contraste com [vingança](${vinganca}) e [Faça o melhor!](${mantra}) sem sermão.

[▶ Palavras](${hub}) · [▶ Verdade](${verdade}) · [▶ Gesto](${gesto}) · [▶ Alegria](${alegria}) · [▶ Vingança](${vinganca}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **respeito** (respect) — consideration, social practice, and the etymological sense of **looking again**. Covers **object**, **senses** (value × practice × boundary), contrast with [vingança](${vinganca}), and [Do your best!](${mantra}). Tone: craft, not sermon. Links: [verdade](${verdade}), [gesto](${gesto}), [alegria](${alegria}), [raiva](${raiva}), [Vida](${vida}).

> Method note: [Wiktionary · respeito](${wiki}), [Wikipedia · Respeito](${wikiEl}). Lat. *respectus* ← *respicere*. Not a moral catechism or etiquette manual.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **respeito** |
| Etymon | Lat. *respectus* ← *respicere* (look again / regard) → PT *respeito* |
| Lab type | Value × social practice × craft |
| Links | [truth](${verdade}) · [gesture](${gesto}) · [revenge](${vinganca}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Look again** (etymon) · **consideration** · **social value** · **practice** (concrete acts) · **self-boundary** · register «a respeito de» (about).

## 3. Practice

Good = trackable [gesto](${gesto}) with [verdade](${verdade}). Bad = “respect” as muzzle, hierarchy theater, or flattery. Faith of others: welcome tone ([jesusamando](${jesus}) / [meudeusdoceu](${meudeus})) without doctrine.

## 4. Contrast

**Respeito** looks again; [vingança](${vinganca}) returns poison. Anger ([raiva](${raiva})) may become boundary with method — or a venom cycle.

## 5. Do your best!

Best possible **with this regard**, today — without virtue posing. Respect without [path](${caminho}) = poster; respect with method = consideration that stays.

## Status

**Approved** — object · senses · practice · contrast with revenge · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Truth](${verdade}) · [▶ Gesture](${gesto}) · [▶ Alegria](${alegria}) · [▶ Revenge](${vinganca}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **respeito** (respeto) — consideración, práctica social y el sentido etimológico de **volver a mirar**. Cubre **objeto**, **sentidos** (valor × práctica × límite), contraste con [vingança](${vinganca}) y [¡Haz lo mejor!](${mantra}). Tono: oficio, no sermón. Vínculos: [verdade](${verdade}), [gesto](${gesto}), [alegria](${alegria}), [raiva](${raiva}), [Vida](${vida}).

> Nota: [Wikcionario · respeito](${wiki}), [Wikipedia · Respeito](${wikiEl}). Lat. *respectus* ← *respicere*. No es catecismo ni manual de etiqueta.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **respeito** |
| Étimo | Lat. *respectus* ← *respicere* → PT *respeito* |
| Tipo lab | Valor × práctica social × oficio |
| Vínculos | [verdad](${verdade}) · [gesto](${gesto}) · [venganza](${vinganca}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Volver a mirar** · **consideración** · **valor social** · **práctica** · **límite propio** · registro «a respeito de».

## 3. Práctica

Bueno = [gesto](${gesto}) rastreable con [verdade](${verdade}). Malo = «respeto» como tapabocas o teatro de jerarquía. Fe ajena: acoger tono sin doctrina.

## 4. Contraste

Respeito vuelve a mirar; [vingança](${vinganca}) devuelve veneno. La [raiva](${raiva}) puede ser límite con método — o ciclo de veneno.

## 5. ¡Haz lo mejor!

Lo mejor posible **con este trato**, hoy — sin pose de virtud.

## Estado

**Aprobada** — objeto · sentidos · práctica · contraste · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Verdad](${verdade}) · [▶ Gesto](${gesto}) · [▶ Alegria](${alegria}) · [▶ Venganza](${vinganca}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRespeitoPost() {
  const { body, contentEn, contentEs, wiki } = buildRespeitoBodies();
  return makePalavra({
    title:
      'Inspeção: Respeito — olhar de novo, prática social e Faça o melhor!',
    titleEn:
      'Inspection: Respeito — looking again, social practice and Do your best!',
    titleEs:
      'Inspección: Respeito — volver a mirar, práctica social y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «respeito» (lat. *respectus* / *respicere*) — consideração e prática social, sem sermão; elo verdade/gesto; contraste com vingança; Faça o melhor!',
    excerptEn:
      'Words: “respeito” (Lat. *respectus* / *respicere*) — consideration and social practice, no sermon; truth/gesture links; contrast with revenge; Do your best!',
    excerptEs:
      'Palabras: «respeito» (lat. *respectus* / *respicere*) — consideración y práctica social, sin sermón; vínculos verdad/gesto; contraste con venganza; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-respeito',
    date: '2026-08-03T20:15:00.000Z',
    seriesOrder: 65,
    seriesLabel: 'Respeito · palavra',
    coverImage: '/imagens/inspecoes/respeito-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRespeitoPost,
  buildRespeitoBodies
};
