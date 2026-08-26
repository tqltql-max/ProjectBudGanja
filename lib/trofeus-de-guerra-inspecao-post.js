'use strict';

/**
 * Inspeção Palavras · Troféus de guerra
 * Eixos: lat. tropaeum · espólio · memória · El Cristiano como caso
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/trofeus-de-guerra-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/trof%C3%A9u';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 250) seriesOrder += 1;
  } catch (_) {
    /* keep */
  }
  return seriesOrder;
}

function buildTrofeusDeGuerraBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-trofeus-de-guerra.html';
  const canhao = '/posts/post-inspecao-palavra-canhao.html';
  const guerra = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiktEn = 'https://en.wiktionary.org/wiki/trophy';
  const tropaeum = 'https://en.wiktionary.org/wiki/tropaeum';

  const body = `## Escopo

Inspeção editorial de **[troféus de guerra](${self})** (pedido: *TROFEIS DE GEURRA*). **Troféu** vem do latim *tropaeum* / grego *tropaion* — marca do inimigo posto em fuga. No plural de campo, o lab lê o **espólio**: armas, bandeiras, bronze, papéis levados como prova de vitória. Caso âncora desta fila: o [canhão El Cristiano](${canhao}) da [Guerra do Paraguai](${guerra}), ainda no Museu Histórico Nacional (Rio) quando o governo BR **autorizou avançar a devolução** (ago. 2026) — **sem** data de entrega fechada nesta ficha. Elos: [objectos](${objetos}), [passado](${passado}), [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · troféu](${WIKI}), [trophy](${wiktEn}), [*tropaeum*](${tropaeum}), imprensa sobre El Cristiano (G1, O Globo, Estadão, ago. 2026). **Ficha ≠ parecer jurídico de restituição, ≠ lista de todo o espólio da Tríplice Aliança.** Direito internacional de bens culturais e tombamento IPHAN são **camadas** — o lab não as substitui.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **troféus de guerra** |
| Singular | **troféu** |
| Lapso do pedido | *trofeis* · *geurra* → **troféus** · **guerra** |
| Étimo | Gr. *τρόπαιον* → lat. *tropaeum* → PT *troféu* — confiança: **alta** no percurso; **média** no uso moderno (desporto vs espólio) |
| Tipo BudGanja | Palavra — [objecto](${objetos}) de vitória × memória do vencido |
| Caso | [Canhão](${canhao}) · [Guerra do Paraguai](${guerra}) · [Paraguai](${paraguai}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome do espólio**. No desporto, troféu é copa. Na guerra, é **coisa tirada a outro corpo político**.

## 2. Camadas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Léxico** | Marca de vitória (*tropaeum*) | Alta |
| **Espólio** | Arma / bandeira / arquivo levado | Alta |
| **Museu** | Objecto tombado, visitável, narrado pelo vencedor | Alta (caso MHN) |
| **Devolução** | Gesto diplomático; destombamento; Itamaraty | Alta como **processo**; baixa como data desta ficha |
| **Ídolo** | O bronze como prova moral | Armadilha — ver [ídolo](${idolo}) |

**H1:** *trofeis de geurra* = **troféus de guerra**.  
**H2:** devolver um troféu **não** apaga a [guerra](${guerra}); muda o **sítio** do [objecto](${objetos}).  
**H3:** o [canhão](${canhao}) é um caso, não o inventário.

## 3. O que parece × o que é

| Camada | Parece | É |
|--------|--------|---|
| **Vitória** | Quem tem o bronze tem a [verdade](${verdade}) | Quem tem o bronze tem o **objecto** |
| **Museu** | Arquivo neutro | Arquivo com **narrador** |
| **Devolver** | Humilhação ou justiça automática | Política + património + [respeito](${respeito}) — resultado ainda **em trâmite** (ago. 2026) |

**Veredicto contraste:** parece medalha eterna; é **coisa** que pode mudar de casa sem mudar 1870.

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Troféu = história» | Troféu = [objecto](${objetos}); história = arquivo + teses |
| «Fica no Rio para sempre porque foi guerra» | Permanência é **política de acervo**, não lei da física |
| «Devolver é fingir que não houve guerra» | A [guerra](${guerra}) está nos livros; o tubo de bronze é outro capítulo |
| «Já foi devolvido» | Autorizar **não** é o camião à porta — verificar data |

**Veredicto correção:** **troféus de guerra = espólio nomeado.** Caso vivo: [El Cristiano](${canhao}).

## Hipóteses (síntese)

**H1:** *troféu* < *tropaeum*.  
**H2:** no lab, o caso âncora é o [canhão](${canhao}) da [Guerra do Paraguai](${guerra}).  
**H3:** devolução 2026 = processo, não milagre.  
**H4:** fecho [Valeu !!!](${mantra}) — o melhor é **não confundir bronze com [verdade](${verdade})**.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Canhão](${canhao}) | O objecto |
| [Guerra do Paraguai](${guerra}) · [Paraguai](${paraguai}) | O conflito e o país |
| [Objectos](${objetos}) · [Passado](${passado}) · [Risco](${risco}) | Método |
| [Valeu !!!](${mantra}) | Fecho |

## Status

**Aprovado** — **troféus de guerra** fichados como espólio; caso [canhão](${canhao}); grafia corrigida de *trofeis* / *geurra*.

[▶ Palavras](${hub}) · [▶ Canhão](${canhao}) · [▶ Guerra do Paraguai](${guerra}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **troféus de guerra** (“war trophies”; field typos *trofeis* / *geurra*). Lat. *tropaeum*. Anchor case: [El Cristiano cannon](${canhao}) from the [Paraguayan War](${guerra}). Return authorized in Brazilian reporting (Aug 2026) is **not** the same as delivery completed.

## Correction

A trophy is an [object](${objetos}), not the whole truth of the war. Close with [Valeu !!!](${mantra}).

## Status

**Approved.** Date ${inspected}.
`;

  const contentEs = `## Alcance

Inspección de **troféus de guerra** (lapsus *trofeis* / *geurra*). Lat. *tropaeum*. Caso: [cañón El Cristiano](${canhao}) de la [Guerra del Paraguay](${guerra}). Autorizar la devolución (ago. 2026) **no** es la entrega hecha.

## Corrección

El trofeo es un [objeto](${objetos}), no toda la verdad de la guerra. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada.** Fecha ${inspected}.
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildTrofeusDeGuerraPost() {
  const { body, contentEn, contentEs, wiki } = buildTrofeusDeGuerraBodies();
  const seriesOrder = pickOrder('inspecao-palavra-trofeus-de-guerra', 131);
  const post = makePalavra({
    title: 'Inspeção: Troféus de guerra — espólio, museu e o caso El Cristiano',
    titleEn: 'Inspection: War trophies — spoils, museum, and the El Cristiano case',
    titleEs: 'Inspección: Trofeos de guerra — botín, museo y el caso El Cristiano',
    excerpt:
      'Palavras: troféus de guerra (*tropaeum*) — espólio ≠ verdade da guerra; caso canhão El Cristiano (devolução autorizada, entrega não fechada); Valeu !!!',
    excerptEn:
      'Words: war trophies (*tropaeum*) — spoils ≠ the war’s truth; El Cristiano case (return authorized, delivery not closed); Valeu !!!',
    excerptEs:
      'Palabras: trofeos de guerra (*tropaeum*) — botín ≠ verdad de la guerra; caso El Cristiano (devolución autorizada, entrega no cerrada); ¡Valeu !!!',
    slug: 'inspecao-palavra-trofeus-de-guerra',
    date: '2026-08-20T04:26:00.000Z',
    seriesOrder,
    seriesLabel: 'Troféus de guerra · palavra',
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

module.exports = { buildTrofeusDeGuerraPost, buildTrofeusDeGuerraBodies };
