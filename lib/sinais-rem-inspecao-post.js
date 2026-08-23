'use strict';

/**
 * Inspeção Palavras · sinais REM
 * Eixos: plural de sinal · dois REM que não se misturam
 * (sono Rapid Eye Movement × sigla lab Relaxamento·Endocanabinoide·Modular) ·
 * sinais ≠ signo ≠ mensagem · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/sinais-rem-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Sono_REM';

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

function buildSinaisRemBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-sinais-rem.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const nap = '/posts/post-inspecao-palavra-nap.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const sol = '/posts/post-inspecao-palavra-sol.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const sinaisCorpo = '/posts/post-inspecao-palavra-sinais.html';
  const barriga = '/posts/post-inspecao-palavra-barriga.html';
  const orelha = '/posts/post-inspecao-palavra-orelha.html';
  const mama = '/posts/post-inspecao-palavra-mama.html';
  const cabelo = '/posts/post-inspecao-palavra-cabelo.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const sidarta = '/posts/post-inspecao-sidarta-ribeiro.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const meditacao = '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html';
  const modulacao = '/posts/post-inspecao-guia-canabimeticos-modulacao.html';
  const unifesp = '/biblioteca/unifesp/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const wikiEn = 'https://en.wikipedia.org/wiki/Rapid_eye_movement_sleep';
  const wikiRem = 'https://en.wiktionary.org/wiki/REM#English';
  const wikiSinal = 'https://pt.wiktionary.org/wiki/sinal';

  const body = `## Escopo

Inspeção editorial do composto **[sinais REM](${self})** — o **campo de marcas** (plural de [sinal](${sinal})), lido em **dois REM que não se fundem**. Pedido de campo: *sinais REM?* Esta ficha cobre (1) os **sinais do sono REM** (*Rapid Eye Movement*), (2) a **sigla de ofício** do laboratório **R·E·M = Relaxamento · Endocanabinoide · Modular**, e (3) o contraste **sinais ≠ signo ≠ [mensagem](${mensagem})**. Elos: [gesto](${gesto}), [nap](${nap}), [Sidarta](${sidarta}), [endocanabinoidoma](${ecbome}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Sono REM](${WIKI}), [EN · REM sleep](${wikiEn}), [Wiktionary · REM](${wikiRem}), [Wikcionário · sinal](${wikiSinal}), série [Palavras](${hub}). **Ficha ≠ polissonografia, ≠ diagnóstico de sono, ≠ bula, ≠ protocolo clínico.** A sigla lab (Relaxamento · Endocanabinoide · Modular) é **mapa de ofício BudGanja**, não acrónimo médico oficial. Sem afiliação comercial.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **sinais REM** |
| Peças | **sinais** = plural de [sinal](${sinal}) (lat. *signum*) · **REM** = duas leituras |
| REM 1 (sono) | *Rapid Eye Movement* — fase do sono (Aserinsky & Kleitman, 1953) |
| REM 2 (lab) | **R**elaxamento · **E**ndocanabinoide · **M**odular — mapa de ofício |
| Não é | Um único [sinal](${sinal}) · [mensagem](${mensagem}) completa · exame de sono |
| Tipo BudGanja | Palavra — campo de marcas × dois REM × literacia |
| Elo sono | [nap](${nap}) · [Sidarta](${sidarta}) · [Vida](${vida}) |
| Elo SEC | [endocanabinoidoma](${ecbome}) · [meditação × eCBome](${meditacao}) · [modulação](${modulacao}) |
| Elo corpo | [gesto](${gesto}) · [tônus](${tonos}) · [coração](${coracao}) · [sinais do corpo](${sinaisCorpo}) · [água](${agua}) · [sol](${sol}) |
| Elo cautela | [risco](${risco}) · [verdade](${verdade}) |
| Fonte | [Sono REM](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** não um semáforo. É o **conjunto legível** — o que o corpo, o cultivo ou o ofício **mostram** quando se fala de REM. Um [sinal](${sinal}) aponta; **sinais** são o campo. Confundir os dois REM vira ruído.

## 2. Dois REM — não misturar

| Leitura | Expansão | O que inspeciona | Confiança |
|---------|----------|------------------|-----------|
| **Sono REM** | *Rapid Eye Movement* | Fase paradoxal do sono | Alta (literatura) |
| **Sigla lab** | Relaxamento · Endocanabinoide · Modular | Mapa de ofício BudGanja | Alta *como mapa do lab* — **não** como acrónimo clínico |

**H1:** a boca pediu *sinais REM* — plural + sigla. A âncora escrita é este composto, não a ficha singular [sinal](${sinal}).  
**H2:** o sono REM e a sigla lab **partilham letras**, não o mesmo objecto.  
**H3:** sinais do sono = marcas fisiológicas; sinais do lab = [gestos](${gesto}) de tônus, pausa e ajuste.

Regra: se a pergunta for **sono / sonho / olhos**, abrir a coluna 1. Se for **relaxar / SEC / modular**, abrir a coluna 2. Se vier tudo colado, **separar primeiro**.

## 3. Sinais do sono REM

Literacia curta — **não** é staging clínico:

| Sinal (campo) | Leitura de ofício | Mau (falha) |
|---------------|-------------------|-------------|
| **Olhos rápidos** (pálpebras fechadas) | Marca clássica da fase | Inventar REM só porque «sonhei» |
| **Atónia** (corpo mole, excepto olhos/diafragma) | O tônus desceu | Confundir com paralisia a diagnosticar em casa |
| **Sonho vívido** (relato frequente) | Elo [Sidarta](${sidarta}) / narrativa | Tratar todo sonho como prova de laboratório |
| **Autonómico irregular** (respiração / pulso) | O ciclo não é «plano» | Panicá-lo como [risco](${risco}) sem método |
| **Ciclo** (mais REM no fim da noite) | O [nap](${nap}) curto ≠ noite REM completa | Trocar soneca por «fiz o sono inteiro» |

**Veredicto sono:** sinais REM fisiológicos são **indícios de fase**, não receita. Quem quiser laudo, vai a profissional — o lab só nomeia.

## 4. Sinais do REM lab (R·E·M)

Mapa de ofício — três letras, três campos de [sinal](${sinal}):

| Letra | Nome | Sinais no corpo / ofício | Elo |
|-------|------|--------------------------|-----|
| **R** | Relaxamento | O [tônus](${tonos}) baixa um pouco; o [peito](${coracao}) desce; a pausa cabe | [gesto](${gesto}) · [nap](${nap}) |
| **E** | Endocanabinoide | O corpo **já** produz mensageiros ([anandamida / 2-AG](${ecbome})); exercício e [meditação](${meditacao}) entram como *via endógena*, não como bula | [eCBome](${ecbome}) · [UNIFESP](${unifesp}) |
| **M** | Modular | Ajustar o próximo passo — não dose única, não «tudo é sinal» | [modulação](${modulacao}) · [caminho](${caminho}) |

Gestos concretos que o lab já tem fichados (não viram protocolo de sono):

| Gesto | Papel no campo de sinais |
|-------|--------------------------|
| [Água](${agua}) | Molhar / beber / lágrima — o corpo pede fluido, não slogan |
| [Sol](${sol}) | Luz e ritmo — o dia marca o ciclo; excesso também é [risco](${risco}) |
| [Coração / peito](${coracao}) | Onde o tônus se lê sem aparelho — descer um pouco ≠ desligar a [vida](${vida}) |
| [Nap](${nap}) | Pausa curta de ofício — irmão do REM sono, **não** o substituto da noite |
| [Sinais do corpo](${sinaisCorpo}) | Mapa: [barriga](${barriga}) (satisfação) · [orelha](${orelha}) (pulga/curiosidade) · [mama](${mama}) (algo fácil) · [cabelo](${cabelo}) (deixa com as mulheres) |

**Veredicto lab:** sinais REM de ofício = **ler o tônus, nomear o SEC, modular o próximo [gesto](${gesto})**. Misturar com staging de sono = ruído.

## 5. Sinais ≠ signo ≠ mensagem

| Termo | Papel | Exemplo |
|-------|-------|---------|
| **[Sinal](${sinal})** | Uma marca | «Há sinal de…» |
| **Sinais** | O campo | O conjunto que se lê de uma vez |
| **Signo** | Nome / código (M, palavra, * ) | O que se *chama* — não o gesto |
| **[Mensagem](${mensagem})** | Conteúdo enviado | O que se *diz* |
| **[Gesto](${gesto})** | Acto mínimo | O que se *faz* com o sinal à vista |

Regra: o sinal **avisa**; os sinais **desenham o campo**; o signo **nomeia**; a mensagem **diz**; o gesto **age**. Fundir tudo vira superstição («tudo é sinal REM»).

## 6. Usos e finalidade

| Uso | No mundo | No BudGanja |
|-----|----------|-------------|
| **Sono** | Fase REM / sonho / atónia | Literacia — [Sidarta](${sidarta}) · [nap](${nap}) |
| **Sigla lab** | Relaxar · SEC · ajustar | Mapa R·E·M — sem fingir acrónimo clínico |
| **Corpo** | Peito, tônus, água, luz | [Gesto](${gesto}) proporcional ao [risco](${risco}) |
| **Cultivo / ofício** | Folha, cheiro, cansaço | Ler o campo, não inventar o mapa |
| **Fechar** | Depois de ler, agir | [Valeu !!!](${mantra}) **com os sinais que há** |

**Finalidade-mãe:** nomear **sinais REM** para **separar sono e sigla**, ler o campo sem superstição, e escolher o próximo [gesto](${gesto}) com [verdade](${verdade}).

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com os sinais à vista**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha 1 | Fundir sono REM com a sigla lab = ruído |
| Anti-armadilha 2 | «Tudo é sinal REM» = superstição · sem método não há campo |
| Anti-armadilha 3 | Usar esta ficha como diagnóstico de sono ou dose de cannabis = fora de escopo |
| Par de método | [sinal](${sinal}) · [gesto](${gesto}) · [nap](${nap}) · [eCBome](${ecbome}) |

**Veredicto:** Valeu !!! **com os sinais REM** — separar as duas leituras, ler o campo, modular. Sinais sem [verdade](${verdade}) = alarme falso; sinais com ofício = mapa curto.

## Hipóteses (síntese)

**H1:** objecto = plural de [sinal](${sinal}) + sigla **REM** (duas expansões).  
**H2:** sono REM = *Rapid Eye Movement* (sinais fisiológicos de fase).  
**H3:** REM lab = Relaxamento · Endocanabinoide · Modular (sinais de tônus, SEC e ajuste).  
**H4:** fecho = [Valeu !!!](${mantra}) lendo o campo, não inventando o mapa.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Sinal](${sinal}) | A marca no singular — irmão desta ficha |
| [Gesto](${gesto}) · [tônus](${tonos}) · [coração](${coracao}) | Acto e leitura do peito |
| [Nap](${nap}) · [Sidarta](${sidarta}) | Pausa e sono / sonho |
| [Endocanabinoidoma](${ecbome}) · [meditação](${meditacao}) · [modulação](${modulacao}) | E e M da sigla lab |
| [Água](${agua}) · [sol](${sol}) | Gestos concretos do campo |
| [Mensagem](${mensagem}) | Contraste — conteúdo ≠ marca |
| [Risco](${risco}) · [verdade](${verdade}) · [caminho](${caminho}) | Cautela e percurso |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Finalidade viva |

## Limites

- Não é polissonografia nem manual de distúrbios do sono.  
- Não é aconselhamento médico, dose, cultivo ilícito nem protocolo de meditação.  
- A sigla lab **não** substitui a expansão científica *Rapid Eye Movement*.  
- Signo (nome/código) não é monografado aqui — só o contraste.

## Status

**Aprovado** — **sinais REM** fichados: plural de [sinal](${sinal}), dois REM (sono × sigla lab), campo ≠ mensagem, elos [gesto](${gesto}) · [nap](${nap}) · [eCBome](${ecbome}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Sinal](${sinal}) · [▶ Sinais do corpo](${sinaisCorpo}) · [▶ Gesto](${gesto}) · [▶ Nap](${nap}) · [▶ Sidarta](${sidarta}) · [▶ Endocanabinoidoma](${ecbome}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **[sinais REM](${self})** — the **field of marks** (plural of [sinal](${sinal})) under **two REM readings that do not fuse**: (1) **REM sleep** (*Rapid Eye Movement*), (2) the lab acronym **Relaxation · Endocannabinoid · Modular**. Contrast: signals ≠ sign-name ≠ [mensagem](${mensagem}). Links: [gesto](${gesto}), [nap](${nap}), [Sidarta](${sidarta}), [endocannabinoidome](${ecbome}), [Valeu !!!](${mantra}).

> Method note: [Wikipedia · REM sleep](${wikiEn}), [Wiktionary · REM](${wikiRem}). **Not** a sleep study, diagnosis, or dosing sheet. The lab acronym is a BudGanja craft map, not an official medical expansion.

## 1. Object

| Field | Value |
|-------|-------|
| Form | **sinais REM** |
| REM 1 | Rapid Eye Movement — sleep stage (Aserinsky & Kleitman, 1953) |
| REM 2 | Relaxation · Endocannabinoid · Modular — lab map |
| Not | A single [sinal](${sinal}) · a full [message](${mensagem}) · a clinical staging |
| Date | ${inspected} |

## 2. Two REM

Sleep column = physiological marks (rapid eyes, atonia, vivid dream reports, irregular autonomic). Lab column = tone drop, endogenous SEC, next-step modulation. Shared letters ≠ shared object.

## 3. Craft signals (lab)

[Tônus](${tonos}) / [peito](${coracao}) · [água](${agua}) · [sol](${sol}) · [nap](${nap}) as readable [gestos](${gesto}) — not a sleep protocol.

## 4. Valeu !!!

Best possible **with the signals in view**, today. Anti-trap: “everything is a REM signal” without method = superstition.

## Status

**Approved** — plural field · two REM · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Sinal](${sinal}) · [▶ Nap](${nap}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[sinais REM](${self})** — el **campo de marcas** (plural de [sinal](${sinal})) bajo **dos REM que no se funden**: (1) **sueño REM** (*Rapid Eye Movement*), (2) la sigla de oficio **Relajación · Endocanabinoide · Modular**. Contraste: señales ≠ signo-nombre ≠ [mensagem](${mensagem}). Vínculos: [gesto](${gesto}), [nap](${nap}), [Sidarta](${sidarta}), [endocanabinoidoma](${ecbome}), [¡Valeu !!!](${mantra}).

> Nota: [Wikipedia · sueño REM](${WIKI}). **No** es polisomnografía ni bula. La sigla del lab es mapa de oficio, no acrónimo clínico oficial.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Forma | **sinais REM** |
| REM 1 | Rapid Eye Movement — fase del sueño |
| REM 2 | Relajación · Endocanabinoide · Modular — mapa del lab |
| No es | Un solo [sinal](${sinal}) · un [mensaje](${mensagem}) completo |
| Fecha | ${inspected} |

## 2. Dos REM

Columna sueño = marcas fisiológicas. Columna lab = tono, SEC endógeno, ajuste. Las mismas letras ≠ el mismo objeto.

## 3. Señales de oficio

[Tônus](${tonos}) / [pecho](${coracao}) · [água](${agua}) · [sol](${sol}) · [nap](${nap}) como [gestos](${gesto}) legibles — no protocolo de sueño.

## 4. ¡Valeu !!!

Lo mejor posible **con las señales a la vista**, hoy. Anti-trampa: «todo es señal REM» sin método = superstición.

## Estado

**Aprobado** — campo en plural · dos REM · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Sinal](${sinal}) · [▶ Nap](${nap}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildSinaisRemPost() {
  const { body, contentEn, contentEs, wiki } = buildSinaisRemBodies();
  const seriesOrder = pickOrder('inspecao-palavra-sinais-rem', 155);
  const post = makePalavra({
    title: 'Inspeção: Sinais REM — o campo, o sono e a sigla do laboratório',
    titleEn: 'Inspection: Sinais REM — the field, sleep, and the lab acronym',
    titleEs: 'Inspección: Sinais REM — el campo, el sueño y la sigla del laboratorio',
    excerpt:
      'Palavras: «sinais REM» — plural de sinal; sono Rapid Eye Movement × sigla lab Relaxamento·Endocanabinoide·Modular; elos gesto, nap, eCBome; Valeu !!!',
    excerptEn:
      'Words: “sinais REM” — plural of sinal; Rapid Eye Movement sleep × lab acronym Relaxation·Endocannabinoid·Modular; links gesto, nap, eCBome; Valeu !!!',
    excerptEs:
      'Palabras: «sinais REM» — plural de sinal; sueño Rapid Eye Movement × sigla lab Relajación·Endocanabinoide·Modular; vínculos gesto, nap, eCBome; ¡Valeu !!!',
    slug: 'inspecao-palavra-sinais-rem',
    date: '2026-08-21T17:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Sinais REM · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
  post.coverImage = COVER;
  post.sourceUrl = wiki;
  post.seriesOrder = seriesOrder;
  return post;
}

module.exports = { buildSinaisRemPost, buildSinaisRemBodies };
