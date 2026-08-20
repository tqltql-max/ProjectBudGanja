'use strict';

/**
 * Inspeção Palavras · Guerra do Paraguai
 * Eixos: 1864–1870 · Tríplice Aliança · nomes do conflito · ≠ mapa de Paraguaçu
 * Ficha de acontecimento nomeado, não manual militar.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/guerra-do-paraguai-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Guerra_do_Paraguai';

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

function buildGuerraDoParaguaiBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-guerra-do-paraguai.html';
  const paraguai = '/posts/post-inspecao-palavra-paraguai.html';
  const paraguacu = '/posts/post-inspecao-palavra-paraguacu.html';
  const trofeus = '/posts/post-inspecao-palavra-trofeus-de-guerra.html';
  const canhao = '/posts/post-inspecao-palavra-canhao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiEn = 'https://en.wikipedia.org/wiki/Paraguayan_War';
  const wikiEs = 'https://es.wikipedia.org/wiki/Guerra_de_la_Triple_Alianza';

  const body = `## Escopo

Inspeção editorial do nome **[Guerra do Paraguai](${self})** — o maior conflito internacional da América do Sul no século XIX (**dez. 1864 – mar. 1870**). No Brasil o nome aponta o [Paraguai](${paraguai}); na Argentina e no Uruguai fala-se **Guerra da Tríplice Aliança**; no Paraguai, **Guerra Grande** / *Guerra contra la Triple Alianza*. Pedido de campo: *GUERRRA DO PARAGUAY*. Esta ficha cobre o **objecto nomeado**, as **camadas de narrativa** (quem «começou», quem pagou o preço) e o elo com [troféus de guerra](${trofeus}) e o [canhão El Cristiano](${canhao}). **Não** é tratado militar nem veredicto de culpa em uma frase.

> **Nota metodológica:** auditoria independente. Fontes de partida: [Wikipédia · Guerra do Paraguai](${WIKI}), [EN](${wikiEn}), [ES](${wikiEs}). Números de mortos e «quem invadiu primeiro» **variam** segundo a escola historiográfica. O lab **declara o dissenso** em vez de escolher um hino. **Ficha ≠ apologia de nenhum Estado.** Sem afiliação.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Nome âncora (PT) | **Guerra do Paraguai** |
| Outros nomes | Guerra da Tríplice Aliança · Guerra Grande · *Paraguayan War* |
| Datas (consenso amplo) | **27 dez. 1864** – **1 mar. 1870** (Cerro Corá; morte de Francisco Solano López) |
| Beligerantes | [Paraguai](${paraguai}) × Império do Brasil + Argentina + Uruguai (Tríplice Aliança) |
| Tipo BudGanja | Palavra-acontecimento — nome × memória × [troféus](${trofeus}) |
| Não é | [Paraguaçu](${paraguacu}) · mapa de Paraguaçu Paulista |
| Elo objectos | [Canhão](${canhao}) · [troféus de guerra](${trofeus}) |
| Elo ofício | [verdade](${verdade}) · [respeito](${respeito}) · [passado](${passado}) · [risco](${risco}) |
| Fonte | [Guerra do Paraguai](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** o **nome de uma guerra** e as **histórias rivais** que o nome carrega. A boca pediu *Paraguay*; a âncora PT do conflito é **Guerra do Paraguai**.

## 2. Sequência pública (mínimo verificável)

| Marco | O que as fontes públicas repetem |
|-------|----------------------------------|
| 1864, Uruguai | Intervenção brasileira no Uruguai; López trata como ameaça ao equilíbrio do Prata |
| 11 nov. 1864 | Captura do vapor brasileiro *Marquês de Olinda* em Assunção |
| Dez. 1864 | Ofensiva paraguaia no Mato Grosso |
| 1865 | Incursões na Argentina; **Tríplice Aliança** |
| 1865–1866 | Riachuelo (naval) e fase de invasão / contenção |
| 1866–1868 | Tuiuti, Humaitá — desgaste enorme |
| 1868–1870 | Campanha até Cerro Corá; López morto (1 mar. 1870) |
| Pós-guerra | Ocupação, tratados, perda territorial paraguaia, demografia devastada |

**H-calendário:** as datas-âncora são **altas**; o **motivo** («invasão», «equilíbrio», «império») é **tese**, não facto único.

## 3. Três narrativas (não fundir)

| Narrativa | Ênfase | O lab faz |
|-----------|--------|-----------|
| **Aliança / BR escolar clássica** | López expansionista; o Paraguai «invadiu» | Citar como **uma** leitura |
| **Paraguaia / revisionista** | Cerco geopolítico; preço humano desproporcional; memória de resistência | Citar como **outra** leitura |
| **Diplomacia 2026** | Fala pública BR sobre «o Paraguai decidiu invadir» × pedido de [troféus](${trofeus}) | Facto **mediático**; não fecha 1864 |

Números de mortos no Paraguai circulam de **dezenas / centenas de milhares** até hipóteses mais altas — **intervalo, não cifra mágica**. Brasil, Argentina e Uruguai também pagaram tropas e civis; a **desproporção paraguaia** é o traço que quase todas as sínteses reconhecem.

**H-preço:** a guerra é um [risco](${risco}) de Estado contra corpos. O lab não transforma isso em slogan.

## 4. O que parece × o que é

| Camada | Parece | É |
|--------|--------|---|
| **Nome** | A guerra *é* o [Paraguai](${paraguai}) | O país sobreviveu; a guerra é um [passado](${passado}) nomeado |
| **Uma causa** | «Começou porque X» | Cadeia platina (Uruguai, rios, fronteiras, López, Império) — **várias** teses |
| **Troféu** | O canhão *prova* quem tem razão | O [canhão](${canhao}) prova **captura e museu**; a [verdade](${verdade}) da guerra não cabe num tubo de bronze |
| **Som** | Guerra «de Paraguaçu» | [Paraguaçu](${paraguacu}) é outro mapa |

**Veredicto contraste:** parece um único filme de invasão; é um **conflito longo** com **nomes e memórias em disputa**.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «O Paraguai invadiu e acabou» | Houve ofensiva paraguaia **e** uma guerra de anos com custo assimétrico |
| «A Tríplice Aliança só se defendeu» | Aliança ofensiva formal (1865); história **não** é só defesa |
| «Os números são exactos» | São **estimativas** em conflito |
| «Devolver o canhão reescreve 1870» | Devolver um [troféu](${trofeus}) é gesto diplomático; não apaga o arquivo |

**Veredicto correção:** **Guerra do Paraguai = nome PT de 1864–1870.** Inspecionar o nome e os [troféus](${trofeus}); não fingir um único culpado de palco.

## Hipóteses (síntese)

**H1:** âncora PT = Guerra do Paraguai; *Paraguay* no pedido = o mesmo conflito.  
**H2:** Tríplice Aliança / Guerra Grande = **outros nomes**, não outras guerras.  
**H3:** [canhão](${canhao}) e [troféus](${trofeus}) são a ponta **material** desta memória.  
**H4:** fecho [Faça o melhor!](${mantra}) — o melhor aqui é **não mentir o preço**.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Paraguai](${paraguai}) | O país no nome |
| [Paraguaçu](${paraguacu}) | O homófono que **não** é este teatro |
| [Troféus de guerra](${trofeus}) · [Canhão](${canhao}) | Espólio e objecto |
| [Passado](${passado}) · [Verdade](${verdade}) · [Respeito](${respeito}) · [Caminho](${caminho}) | Método |
| [Faça o melhor!](${mantra}) | Fecho sem hino |

## Limites

- Não reconstrói cada batalha.  
- Não arbitra teses de Chiavenato vs escola militar clássica.  
- Não é parecer do Itamaraty.

## Status

**Aprovado** — conflito **1864–1870** fichado pelo **nome**; narrativas em tensão; elos [Paraguai](${paraguai}), [troféus](${trofeus}), [canhão](${canhao}).

[▶ Palavras](${hub}) · [▶ Paraguai](${paraguai}) · [▶ Troféus](${trofeus}) · [▶ Canhão](${canhao}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the Portuguese name **Guerra do Paraguai** (Paraguayan War / War of the Triple Alliance), **Dec. 1864 – Mar. 1870**. Field request *GUERRRA DO PARAGUAY*. Death tolls and “who started it” are **disputed**. Links: [Paraguai](${paraguai}), [trophies](${trofeus}), [cannon](${canhao}). **Not a war manual.**

## Correction

The name is not the whole country. A trophy does not settle 1870. Close with [Do your best!](${mantra}) — here, that means not lying about the cost.

## Status

**Approved.** Date ${inspected}.

[▶ Words](${hub}) · [▶ Cannon](${canhao})
`;

  const contentEs = `## Alcance

Inspección del nombre **Guerra do Paraguai** (Guerra de la Triple Alianza), **dic. 1864 – mar. 1870**. Pedido *GUERRRA DO PARAGUAY*. Cifras y «quién empezó» están **en disputa**. Vínculos: [Paraguai](${paraguai}), [trofeos](${trofeus}), [cañón](${canhao}).

## Corrección

El nombre no es todo el país. Un trofeo no cierra 1870. Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada.** Fecha ${inspected}.

[▶ Palabras](${hub}) · [▶ Cañón](${canhao})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildGuerraDoParaguaiPost() {
  const { body, contentEn, contentEs, wiki } = buildGuerraDoParaguaiBodies();
  const seriesOrder = pickOrder('inspecao-palavra-guerra-do-paraguai', 130);
  const post = makePalavra({
    title: 'Inspeção: Guerra do Paraguai — o nome de 1864–1870, a Tríplice Aliança e a memória em disputa',
    titleEn: 'Inspection: Guerra do Paraguai — the 1864–1870 name, the Triple Alliance, and contested memory',
    titleEs: 'Inspección: Guerra do Paraguai — el nombre 1864–1870, la Triple Alianza y la memoria en disputa',
    excerpt:
      'Palavras: Guerra do Paraguai / Paraguay — 1864–1870; Tríplice Aliança; números e culpas em disputa; elos troféus e canhão El Cristiano; Faça o melhor!',
    excerptEn:
      'Words: Paraguayan War — 1864–1870; Triple Alliance; disputed tolls and blame; links trophies and El Cristiano cannon; Do your best!',
    excerptEs:
      'Palabras: Guerra del Paraguay — 1864–1870; Triple Alianza; cifras y culpas en disputa; vínculos trofeos y cañón El Cristiano; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-guerra-do-paraguai',
    date: '2026-08-20T04:24:00.000Z',
    seriesOrder,
    seriesLabel: 'Guerra do Paraguai · palavra',
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

module.exports = { buildGuerraDoParaguaiPost, buildGuerraDoParaguaiBodies };
