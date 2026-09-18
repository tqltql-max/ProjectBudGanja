'use strict';

/**
 * Inspeção Palavras · legal
 * Eixos: jurídico · gíria BR («bacana») · inglês × português · Faça o melhor!
 * Elos: ilícito · Lei 11.343 · porte×tráfico · descriminalização · risco · verdade
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildLegalBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const ilicito = '/posts/post-inspecao-palavra-ilicito.html';
  const lei11343 = '/posts/post-inspecao-palavra-lei-11-343.html';
  const porteTrafico = '/posts/post-inspecao-palavra-porte-trafico.html';
  const descrim = '/posts/post-inspecao-palavra-descriminalizacao.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/legal';
  const wikiEn = 'https://en.wiktionary.org/wiki/legal';
  const wikiLei = 'https://pt.wikipedia.org/wiki/Lei';

  const body = `## Escopo

Inspeção editorial da palavra **legal** — do polo **jurídico** (conforme a lei) à gíria brasileira **«bacana / ok / massa»**, sem apagar nenhum dos dois. Esta ficha cobre o **objeto**, os **dois eixos de sentido**, o contraste útil com o inglês *legal*, e o fecho [Faça o melhor!](${mantra}). Elos naturais: [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · legal](${wiki}), [Wiktionary · legal (EN)](${wikiEn}), [Lei](${wikiLei}), série [Palavras](${hub}). **Ficha ≠ parecer jurídico** — mapa lexical e de ofício. Sem afiliação política ou comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **legal** |
| Classe | Adjetivo (também advérbio informal: «tá legal») |
| Étimo (trabalho) | Latim *legālis* («relativo à lei») ← *lex, legis* — confiança: alta |
| Família | *lei* · *legalidade* · *legalizar* · *ilegal* · *ilegalidade* · *legítimo* (vizinho) |
| Cognatos | esp. *legal* · fr. *légal* · it. *legale* · ing. *legal* (mesmo étimo; usos sociais divergem) |
| Tipo BudGanja | Palavra — jurídico × gíria BR × literacia |
| Elo jurídico | [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [porte × tráfico](${porteTrafico}) · [descriminalização](${descrim}) |
| Elo ofício | [verdade](${verdade}) · [risco](${risco}) · [gesto](${gesto}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) — polissemia viva no BR |
| Fonte | [Wikcionário · legal](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que, no Brasil, **carrega duas ferramentas** — (1) enquadrar o que a lei permite/proíbe; (2) avaliar o quotidiano com tom positivo («que legal!»). O lab inspeciona **qual ferramenta** está na mesa, sem moralizar a gíria.

## 2. Origem e sentidos

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *legālis* | Relativo à *lex* (lei) | Alta |
| Jurídico PT | Conforme o direito; lícito; «caminho legal» | Alta |
| Antónimo clássico | [Ilícito](${ilicito}) / ilegal | Alta |
| Gíria BR | «Bacana», «maneiro», «ok», aprovação afectiva | Alta (uso vivo) |
| Advérbio oral | «Tá legal», «fica legal assim» — acordo / qualidade | Alta |
| Inglês *legal* | Quase só jurídico / «legal counsel»; **não** = «cool» | Alta (contraste) |
| Debate público | «Legalizar» ≠ [descriminalizar](${descrim}) (mapas distintos) | Alta (literacia) |

**H1:** *legal* nasce na **lei** (*lex*) — o sentido jurídico é o chão etimológico.  
**H2:** no Brasil, o sentido **«bacana»** é expansão afectiva estável, não erro de português.  
**H3:** confundir gíria com parecer jurídico (ou o inverso) é falha de [verdade](${verdade}) no lab — não «falta de cultura».

## 3. Dois eixos — jurídico × gíria BR

| Eixo | Exemplo | Bom × mau no lab |
|------|---------|------------------|
| **Jurídico** | «Uso medicinal com via legal» | Bom: citar norma · Mau: fingir que gíria resolve [risco](${risco}) |
| **Lícito × ilícito** | Contraste com [ilícito](${ilicito}) | Bom: polarizar com método · Mau: estigma sem ficha |
| **Lei 11.343** | Marco penal das drogas | Bom: [ficha da lei](${lei11343}) · Mau: slogan sem texto |
| **Porte × tráfico** | Distinção prática no Brasil | Bom: [porte × tráfico](${porteTrafico}) · Mau: misturar categorias |
| **Descriminalização** | Atipicidade / debate ≠ legalização | Bom: [descriminalização](${descrim}) · Mau: sinónimo falso |
| **Gíria «bacana»** | «Que legal o relato!» | Bom: calor humano · Mau: usar como se fosse parecer legal |
| **Acordo oral** | «Tá legal, seguimos» | Bom: consentimento leve · Mau: substituir [verdade](${verdade}) técnica |

### Inglês *legal* × português BR

| Situação | Inglês *legal* | Português BR *legal* |
|----------|----------------|----------------------|
| Escritório / norma | «Is that legal?» ≈ é lícito? | Mesmo eixo jurídico |
| Elogio / «cool» | Usa-se *cool*, *nice*, *awesome* | **«Legal!»** = bacana |
| Tradução cega | «That's legal!» (só jurídico) | Pode soar frio ou errado se a intenção era elogio |
| Ofício BudGanja | Separar eixos sem ridicularizar o falante | Literacia = **nomear qual sentido** |

**Veredicto contraste:** o inglês quase **não** empresta o «bacana»; o brasileiro **vive** os dois. Não é pregar «fale direito» — é **inspecionar a ferramenta** que está na frase.

## 4. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Nomear a lei** | Lícito / ilegal / via institucional | Elos [Lei 11.343](${lei11343}) · [ilícito](${ilicito}) |
| **Separar mapas** | Legalizar ≠ descriminalizar ≠ porte | [Descriminalização](${descrim}) · [porte × tráfico](${porteTrafico}) |
| **Calcular risco** | Consequência jurídica real | [Risco](${risco}) com método, sem pânico nem negação |
| **Aprovar com calor** | «Que legal!» no peito e no grupo | Gíria legítima — sem fingir que é norma |
| **Dizer a verdade** | Qual sentido está em jogo | [Verdade](${verdade}) · [gesto](${gesto}) |
| **Fechar** | Depois do mapa, o acto | [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** usar **legal** com **clareza de eixo** — lei quando for lei; bacana quando for bacana; nunca um no lugar do outro sem aviso.

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **com a palavra certa**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se eu acho legal (bacana), então é legal (lícito)» = falso |
| Anti-armadilha 2 | «Só o jurídico conta; a gíria é errada» = falso · o BR fala os dois |
| Par de método | [Verdade](${verdade}) · [risco](${risco}) · [caminho](${caminho}) |
| Rede normativa | [Ilícito](${ilicito}) · [proibição × proibicionismo](${proibicao}) · [Lei 11.343](${lei11343}) |

**Veredicto:** Faça o melhor **com legal** — inspecionar o eixo, citar quando for lei, celebrar quando for peito, sem misturar as ferramentas.

## Hipóteses (síntese)

**H1:** objeto = lat. *legālis* → jurídico + gíria BR.  
**H2:** inglês *legal* ≠ «bacana»; BR carrega os dois.  
**H3:** elos = [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [descriminalização](${descrim}) · [risco](${risco}) · [verdade](${verdade}).  
**H4:** fecho = [Faça o melhor!](${mantra}) com clareza de eixo.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Ilícito](${ilicito}) · [Proibição × proibicionismo](${proibicao}) | Polo e camada política |
| [Lei 11.343](${lei11343}) · [Porte × tráfico](${porteTrafico}) · [Descriminalização](${descrim}) | Mapa normativo BR |
| [Risco](${risco}) · [Verdade](${verdade}) · [Gesto](${gesto}) | Ofício sem confusão de eixos |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo da polissemia |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é consultoria jurídica nem interpretação oficial de leis.  
- Não moraliza a gíria «legal» (= bacana).  
- Não trata «legalizar» e «descriminalizar» como sinónimos.

## Status

**Aprovado** — **legal** fichado: jurídico × gíria BR; contraste com inglês; elos ilícito / Lei 11.343 / descriminalização / risco / verdade; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Descriminalização](${descrim}) · [▶ Verdade](${verdade}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **legal** — the **juridical** pole (lawful) and Brazilian slang **“cool / nice / ok”**, without erasing either. Covers **object**, **two sense axes**, useful contrast with English *legal*, and [Do your best!](${mantra}). Links: [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> Method note: [Wiktionary · legal](${wiki}), [legal (EN)](${wikiEn}). Not legal advice.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **legal** |
| Etymon | Latin *legālis* ← *lex* — high confidence |
| Lab type | Juridical × BR slang × literacy |
| Links | [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [truth](${verdade}) · [risk](${risco}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses

Juridical (lawful / licit) · antonym [ilícito](${ilicito}) · BR slang “bacana” · oral agreement (“tá legal”). English *legal* is almost only juridical — **not** “cool.” Literacy = name which sense is in play. Legalize ≠ [descriminalize](${descrim}).

## 4. Purpose

Name the law · separate maps (legalize / descriminalize / possession) · calculate [risk](${risco}) · approve with warmth when slang · close with [Do your best!](${mantra}).

## 5. Do your best!

Best possible **with the right tool** — law when law; “cool” when chest; never one standing in for the other without a flag. Trap: “I find it legal (cool) → therefore it is legal (lawful)” = false.

## Status

**Approved** — juridical × BR slang; English contrast; network linked; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Truth](${verdade}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **legal** — polo **jurídico** (conforme a la ley) y jerga brasileña **«bacán / ok / bueno»**, sin borrar ninguno. Cubre **objeto**, **dos ejes**, contraste con el inglés *legal*, y [¡Haz lo mejor!](${mantra}). Vínculos: [ilícito](${ilicito}), [Lei 11.343](${lei11343}), [porte × tráfico](${porteTrafico}), [descriminalização](${descrim}), [risco](${risco}), [verdade](${verdade}).

> Nota: [Wikcionario · legal](${wiki}), [legal (EN)](${wikiEn}). No es dictamen jurídico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **legal** |
| Étimo | Latín *legālis* ← *lex* |
| Tipo lab | Jurídico × jerga BR × literacia |
| Vínculos | [ilícito](${ilicito}) · [Lei 11.343](${lei11343}) · [verdad](${verdade}) · [riesgo](${risco}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos

Jurídico · antónimo [ilícito](${ilicito}) · jerga BR «bacana» · acuerdo oral. Inglés *legal* ≈ solo jurídico — **no** «cool». Legalizar ≠ [descriminalizar](${descrim}).

## 4. Para qué sirve

Nombrar la ley · separar mapas · calcular [riesgo](${risco}) · aprobar con calor (jerga) · cerrar con [¡Haz lo mejor!](${mantra}).

## 5. ¡Haz lo mejor!

Lo mejor posible **con la herramienta correcta** — ley cuando es ley; «bacán» cuando es pecho. Trampa: «me parece legal (bacán) → entonces es legal (lícito)» = falso.

## Estado

**Aprobada** — jurídico × jerga BR; contraste con inglés; red enlazada; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Ilícito](${ilicito}) · [▶ Lei 11.343](${lei11343}) · [▶ Verdad](${verdade}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLegalPost() {
  const { body, contentEn, contentEs, wiki } = buildLegalBodies();
  return makePalavra({
    title:
      'Inspeção: Legal — lei, gíria BR «bacana» e Faça o melhor!',
    titleEn:
      'Inspection: Legal — law, BR slang “cool”, and Do your best!',
    titleEs:
      'Inspección: Legal — ley, jerga BR «bacán» y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «legal» (lat. *legālis*) — eixo jurídico e gíria BR «bacana»; contraste com inglês; elos ilícito, Lei 11.343, descriminalização, risco e verdade.',
    excerptEn:
      'Words: “legal” (Lat. *legālis*) — juridical axis and BR slang “cool”; English contrast; links illicit, Lei 11.343, descriminalization, risk and truth.',
    excerptEs:
      'Palabras: «legal» (lat. *legālis*) — eje jurídico y jerga BR «bacán»; contraste con inglés; vínculos ilícito, Lei 11.343, descriminalización, riesgo y verdad.',
    slug: 'inspecao-palavra-legal',
    date: '2026-08-03T21:00:00.000Z',
    seriesOrder: 37,
    seriesLabel: 'Legal · palavra',
    coverImage: '/imagens/inspecoes/legal-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLegalPost,
  buildLegalBodies
};
