'use strict';

/**
 * Inspeção Palavras · alma
 * Eixos: lat. anima · centro vivo · chegar na alma ·
 * elo tudo / coração / vida · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildAlmaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/alma';

  const body = `## Escopo

Inspeção editorial da palavra **alma** — o **centro vivo** da pessoa (e, por extensão, o íntimo de uma obra, de um projecto, de um [gesto](${gesto})). Pedido do lab: que as fichas **cheguem na alma**, não só no inventário. Esta ficha cobre o **objeto** (lat. *anima*), o eixo **alma × coração × vida**, o contraste com [tudo](${tudo}) (totalidade sem centro), a rede com a expressão [vingança / alma / veneno](${vinganca}), e o fecho [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · alma](${wiki}), série [Palavras](${hub}). **Ficha ≠ tratado teológico nem diagnóstico.** Tom: Inspetor BudGanja — *alma* nomeia o que **sente e importa**; ofício sem alma vira lista. Sem afiliação religiosa exclusiva.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **alma** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *anima* («sopro, vida, alma») → pt. *alma* — confiança: **alta** |
| Família | *ânimo* · *animar* · *animal* (mesmo étimo longo) · *almíssimo* (uso raro) |
| Cognatos / paralelos | esp. *alma* · fr. *âme* · it. *anima* · ing. *soul* / *spirit* (parcial) |
| Tipo BudGanja | Palavra — centro vivo × ofício com sentimento |
| Elo vivo | [coração](${coracao}) · [vida](${vidaPalavra}) · [emoção](${emocao}) · [esperança](${esperanca}) |
| Elo ofício | [tudo](${tudo}) · [verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) · [caminho](${caminho}) |
| Elo expressão | [vingança mata a alma](${vinganca}) |
| Elo projecto | [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) · [Vida](${vida}) |
| Fonte | [Wikcionário · alma](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o nome do **íntimo que vive** — sopro, consciência, afecto, o «dentro» que uma frase pode tocar. No lab: chegar na alma = escrever com [verdade](${verdade}) e [respeito](${respeito}), não só com tabela.

## 2. Alma × coração × vida × tudo

| Forma | Ofício | Diferença útil |
|-------|--------|----------------|
| **alma** | Centro / sopro / íntimo | O que «chega» ou se fere |
| **[coração](${coracao})** | Órgão e metáfora do sentir | Vizinho — corpo do afecto |
| **[vida](${vidaPalavra})** · [Vida](${vida}) | Facto de viver / hub | Onde a alma habita o projecto |
| **[tudo](${tudo})** | Totalidade | Sem alma = montão; com alma = inteireza |
| **Espírito** | Outro registo (variável) | Não fundir automaticamente |

**H1:** *alma* < lat. *anima* — sopro/vida (alta confiança).  
**H2:** no BudGanja, «chegar na alma» = critério de ofício das fichas.  
**H3:** ferir a alma (vingança, desprezo) é anti-ofício — ver [expressão](${vinganca}).

## 3. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Íntimo / pessoa** | Centro vivo do sujeito | Alta |
| **Obra / coisa** | «A alma do projecto» | Alta (uso figurado) |
| **Religião / filosofia** | Princípio imaterial (vários sistemas) | Alta (campo amplo) — ficha não escolhe credo |
| **Expressões** | Alma gémea · pôr a alma | Alta (uso vivo) |
| **Ofício lab** | Tom que toca sem fingir | Alta (mapa BudGanja) |

## 4. Rede (só fichas existentes)

| Ficha | Relação com *alma* |
|-------|-------------------|
| [Tudo](${tudo}) | Totalidade que precisa de centro |
| [Coração](${coracao}) · [emoção](${emocao}) · [esperança](${esperanca}) | Sentir e continuar |
| [Vida](${vidaPalavra}) · hub [Vida](${vida}) | Casa do vivo |
| [Verdade](${verdade}) · [respeito](${respeito}) · [gesto](${gesto}) | Como se chega sem ferir |
| [Vingança / alma / veneno](${vinganca}) | Aviso: alma envenenada |
| [Caminho](${caminho}) | Percurso com sentido |

## 5. Usos no português do Brasil

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **«Chegou na alma»** | Emocionou de verdade | Critério de ficha boa |
| **«Pôr a alma»** | Dedicar-se | [Gesto](${gesto}) inteiro |
| **«Alma gémea»** | Vínculo profundo | Fora de catálogo romântico — só nota |
| **Alma do negócio / obra** | Essência | Elo [tudo](${tudo}) essencial |
| **Ofício lab** | Escrever tabelas *e* calor | [Faça o melhor!](${mantra}) com sentimento |

**Finalidade-mãe:** nomear a **alma** para **lembrar o centro** — o ofício inspeciona objectos, mas serve quem sente.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **para tocar com verdade**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Só dado frio» = lista sem alma · «só pose emotiva» = falso · ambos com [verdade](${verdade}) = ofício |
| Par vivo | [tudo](${tudo}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [Vida](${vida}) |

**Veredicto:** Faça o melhor **até chegar na alma**. Alma sem [gesto](${gesto}) = abstracção; alma com ofício = ficha que fica.

## Hipóteses (síntese)

**H1:** *alma* < lat. *anima* (alta confiança).  
**H2:** centro vivo × critério de tom do lab.  
**H3:** elos = [tudo](${tudo}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [vingança/alma](${vinganca}).  
**H4:** fecho = [Faça o melhor!](${mantra}).

## Limites

- Não fecha doutrina religiosa.  
- Não é psicologia clínica.  
- «Chegar na alma» ≠ manipular sentimento.

## Status

**Aprovado** — **alma** fichada: *anima*, centro vivo, rede com tudo/coração/vida e [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tudo](${tudo}) · [▶ Coração](${coracao}) · [▶ Vida](${vida}) · [▶ Faça o melhor!](${mantra}) · [▶ Vingança/alma](${vinganca})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **alma** (soul) — Lat. *anima*, the living center. Lab note: sheets should **reach the soul**, not only the inventory. Links [tudo](${tudo}), [coracao](${coracao}), [vida](${vidaPalavra}), [Do your best!](${mantra}).

> Method note: [Wiktionary · alma](${wiki}). Not a theological treatise.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **alma** |
| Etymon | Lat. *anima* — breath / life — high confidence |
| Lab type | Living center × craft with feeling |
| Links | [tudo](${tudo}) · [coracao](${coracao}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Do your best!

Best possible **to touch with truth**, today.

## Status

**Approved** — center · warmth · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Tudo](${tudo}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **alma** — lat. *anima*, el centro vivo. Nota del lab: las fichas deben **llegar al alma**, no solo al inventario. Vínculos [tudo](${tudo}), [coracao](${coracao}), [vida](${vidaPalavra}), [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · alma](${wiki}). No es tratado teológico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **alma** |
| Étimo | lat. *anima* |
| Tipo lab | Centro vivo × oficio con sentimiento |
| Vínculos | [tudo](${tudo}) · [coracao](${coracao}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. ¡Haz lo mejor!

Lo mejor posible **para tocar con verdad**, hoy.

## Estado

**Aprobada** — centro · calor · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Tudo](${tudo}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildAlmaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildAlmaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 99;
  return makePalavra({
    title: 'Inspeção: Alma — centro vivo e chegar por dentro',
    titleEn: 'Inspection: Alma — living center and reaching within',
    titleEs: 'Inspección: Alma — centro vivo y llegar por dentro',
    excerpt:
      'Palavras: «alma» (lat. *anima*) — centro vivo; chegar na alma; elos tudo, coração, vida; Faça o melhor!',
    excerptEn:
      'Words: “alma” (Lat. *anima*) — living center; reaching the soul; links tudo, coração, vida; Do your best!',
    excerptEs:
      'Palabras: «alma» (lat. *anima*) — centro vivo; llegar al alma; vínculos tudo, corazón, vida; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-alma',
    date: '2026-08-03T18:35:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Alma · palavra',
    coverImage: '/imagens/inspecoes/alma-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAlmaPost,
  buildAlmaBodies
};
