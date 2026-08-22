'use strict';

/**
 * Inspeção Palavras · node × nuds
 * Eixos: EN node ← lat. nodus (nó / junção) ·
 * nuds/nudes ← lat. nudus (nu) · orelha cola · étimo corta ·
 * esp. nudos (nós) parece EN nudes · it. nodo ≠ nudo · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/node-palavra-cover.jpg';
const WIKT_EN = 'https://en.wiktionary.org/wiki/node';
const WIKT_NUDE = 'https://en.wiktionary.org/wiki/nude';
const WIKT_NODUS = 'https://en.wiktionary.org/wiki/nodus#Latin';
const WIKT_NUDUS = 'https://en.wiktionary.org/wiki/nudus#Latin';
const WIKT_PT_NODO = 'https://pt.wiktionary.org/wiki/nodo';
const WIKT_PT_NU = 'https://pt.wiktionary.org/wiki/nu';
const WIKI_NODE = 'https://en.wikipedia.org/wiki/Node_(computer_science)';
const WIKI_NODEJS = 'https://en.wikipedia.org/wiki/Node.js';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildNodeBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-node.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatar = '/posts/post-inspecao-palavra-desatar.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const script = '/posts/post-inspecao-palavra-script.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const cola = '/posts/post-inspecao-palavra-cola-colar.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const pelados = '/posts/post-inspecao-arte-pelados-em-santos.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[node](${self})** e da sua **[relação](${relacao})** com **nuds** / **nudes**. Pedido de campo: *node relaciona com nuds ou algo do tipo*. A orelha (e o olho) brasileira **cola** *nodes* em *nudes*. O étimo **corta**. Duas peças latinas, uma letra de diferença: *nodus* (**nó**, junção) e *nudus* (**nu**, despido). Esta ficha é o **objecto lexical**. O laço na [corda](${corda}) já vive em **[nó](${no})**.

> **Nota metodológica:** auditoria independente. Fontes: [node (EN)](${WIKT_EN}), [nude](${WIKT_NUDE}), lat. [nodus](${WIKT_NODUS}), [nudus](${WIKT_NUDUS}), [nodo (PT)](${WIKT_PT_NODO}), [nu](${WIKT_PT_NU}), [node (CS)](${WIKI_NODE}), [Node.js](${WIKI_NODEJS}). **Ficha ≠ tutorial de Node.js, ≠ catálogo de imagens íntimas, ≠ protocolo clínico.** Ofício da cola: [a orelha cola o que a boca juntou](${orelhaCola}). Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Âncora 1 | **node** — empréstimo EN (grafo, rede, haste, runtime) ← lat. *nodus* |
| Âncora 2 | **nuds** / **nudes** — gíria EN de *nude* ← lat. *nudus* «nu» |
| O que a orelha faz | Colar *node(s)* em *nude(s)* / *nuds* |
| O que o étimo faz | **Separar** — *o* ≠ *u* |
| Irmã PT do nó | **[nó](${no})** · *nodo* (grafia técnica) · *nódulo* |
| Irmã PT do nu | **nu** / **nua** · *nus* · *desnudar* · *desnudo* (ES) |
| Tipo BudGanja | Palavra — homografia de ouvido/olho × [relação](${relacao}) |
| Não é | Tutorial Node.js · álbum de nudes · [corda](${corda}) · [Pelados em Santos](${pelados}) (outra sala) |
| Elo mapa | [nó](${no}) · [conexão](${conexao}) · [link](${link}) · [script](${script}) · [trocadilho](${trocadilho}) |
| Fonte | [node (EN)](${WIKT_EN}) · [nodus](${WIKT_NODUS}) · [nudus](${WIKT_NUDUS}) |
| Data | ${inspected} |

**Objecto:** não é o corpo despido nem o programa que «roda o site». É o **vocábulo do ponto de junção** (*node*) e o **falso amigo** que a fala cola nele (*nuds*).

## 2. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Olho EN** | *nodes* ≈ *nudes* | Uma letra: **o** (*nodus*) × **u** (*nudus*) |
| **Gíria *nuds*** | Outro nome de *node* | Grafia solta de **nudes** — outro ofício |
| **Espanhol *nudos*** | «nudes» escrito em ES | Plural de *nudo* = **[nó](${no})**, não nu |
| **Italiano** | *nodo* e *nudo* «são a mesma» | *nodo* = nó; *nudo* = nu — o par **mostra** o corte |
| **Tech BR** | *node* = Node.js | Runtime é **uma** camada; o vocábulo é mais antigo |
| **Haste / corpo** | Nó da planta ≈ nódulo ≈ nu | Junção botânica / gânglio ≠ despido |
| **BudGanja** | Palavra de informático ou de chat | **Ponto de [conexão](${conexao})** × **nu** — duas fichas no mesmo olho |

**H-parece:** *node* e *nuds* são primos porque se escrevem quase iguais.  
**H-é:** primos de **olho**, não de **origem**. A [cola](${cola}) é do ouvido; o avô latino não cola.

**Veredicto contraste:** o que parece = uma família; o que é = dois étimos. Corrigir a palavra = preferir a letra certa ao [trocadilho](${trocadilho}).

## 3. Origens (etimologia)

Dois núcleos. Não fundir.

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| **Lat. *nodus* → EN *node*** | «Nó, laço, protuberância, ponto de cruzamento» → PT [nó](${no}) / *nodo*; ES *nudo*; IT *nodo*; FR *nœud* | **Alta** |
| **Lat. *nudus* → EN *nude* / *nudes* / gíria *nuds*** | «Nu, despido, sem cobertura» → PT *nu*; ES *desnudo*; IT *nudo*; FR *nu* | **Alta** |
| **Uma letra** | *n**o**dus* × *n**u**dus* — vogal média × vogal fechada | **Alta** (forma latina) |
| **ES *nudos*** | Plural de *nudo* (nó). O olho EN lê *nudes* | **Alta** (falso amigo visual) |
| **IT *nodo* × *nudo*** | O italiano **guarda** a oposição que o espanhol encobre no *nudo* do nó | **Alta** |
| **PT *nós* × *nus*** | *nós* = pronome / plural de [nó](${no}); *nus* = masculinos de *nu* | **Alta** (homofonia possível) |
| **Node.js** | Runtime JS (2009); nome de **nós de rede**, não de nudes | **Alta** no uso; média como étimo de marca |

**Veredicto etimológico:** *node* **não** desce de *nude*. *Nuds* **não** é grafia técnica de *nodes*. A [etimologia](${etimologia}) aqui é um corte de uma letra.

## 4. Node × nó × nuds × nu

| Termo | Ofício | Diferença útil |
|-------|--------|----------------|
| **node** | Loan EN (grafo, anatomia, haste, runtime) | Ponto onde a [conexão](${conexao}) **mora** |
| **[nó](${no})** | PT herdado de *nodus* | Laço na [corda](${corda}); ficha-mãe do laço |
| **nodo** | Grafia técnica PT | Mesmo étimo; menos oral que *nó* |
| **nódulo** | Protuberância / gânglio | Dim. de *nodus*; **não** é *nude* |
| **nodes** | Plural EN de *node* | Soa/olha *nudes* — a cola |
| **nude / nudes** | EN «nu» / género artístico *the nude* / gíria de fotos | Lat. *nudus* |
| **nuds** | Grafia de chat de *nudes* | **Não** é plural técnico de *node* |
| **nu / nua** | PT herdado de *nudus* | Corpo sem cobertura; palavra, não álbum |
| **desnudar** | Tirar a cobertura / fig. revelar | Outro ofício do *nudus*; ≠ *anudar* (fazer nó) |
| **anudar** | Fazer [nó](${no}) | Família *nodus* |
| **Node.js** | Interpretador / runtime | Camada [script](${script}); o nome é *node* de rede |

**H1:** no lab BR, *node* = ponto de junção emprestado do inglês (alta confiança no uso tech).  
**H2:** *nuds* entra pelo chat como *nudes*; a orelha **cola** no plural *nodes*.  
**H3:** [nó](${no}) guarda o laço; esta ficha guarda o **empréstimo** e o **falso amigo**.

## 5. Sentidos — camadas vivas

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Grafo / rede** | Vértice — ponto com [ligações](${link}) | Alta |
| **Informática** | Máquina, processo, *cluster node*; *Node.js* | Alta |
| **Botânica** | Nó da haste (gomo) — já na ficha [nó](${no}) | Alta |
| **Anatomia** | *Lymph node* = gânglio / nódulo linfático | Alta no EN; PT prefere *gânglio* / *nódulo* |
| **Astronomia / física** | Ponto nodal (órbita, onda) | Alta no técnico |
| **EN *nude*** | Nu artístico; adjetivo «despido» | Alta |
| **Gíria *nudes* / *nuds*** | Fotos íntimas pedidas em chat | Alta no uso; **fora** do catálogo do lab |
| **ES *nudos*** | Nós (laços) — olho EN lê *nudes* | Alta (armadilha) |
| **Ofício lab** | Pasta \`scripts/\` corre em **Node** — interpretador, não nudes | Alta (mapa BudGanja) |

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «*Node* é a mesma família de *nudes*» | Família de **olho**. Étimo: *nodus* ≠ *nudus* |
| «*Nuds* é o plural de *node*» | Plural de *node* = **nodes**. *Nuds* = gíria de *nudes* |
| «Em espanhol *nudos* são nudes» | *Nudos* = **nós**. Nudes ES = *desnudos* / *nudes* (empréstimo) |
| «Node.js tem a ver com nudes» | Nome de **nós de rede**. Ver [script](${script}) — sequência, não corpo |
| «*Nodo* em PT é nu» | *Nodo* = [nó](${no}) técnico. Nu = *nu* / *nua* |
| «Pedir nudes no lab» | [Respeito](${respeito}): a ficha nomeia o vocábulo; **não** pede, guarda nem publica imagens íntimas |
| «Pelados = nudes = node» | [Pelados em Santos](${pelados}) é **arte/canção**. Outra sala. Não fundir com o ponto de rede |

### Ofício correcto (mapa curto)

1. Ver a letra: **o** (*node* / *nodus*) ou **u** (*nude* / *nudus*).  
2. Se for junção → [nó](${no}) / *node* / [conexão](${conexao}).  
3. Se for despido → *nu* / *nude* — palavra, com [respeito](${respeito}).  
4. Se a orelha colou os dois → nomear a cola ([orelha cola](${orelhaCola})) e **cortar**.  
5. Fechar com [Valeu !!!](${mantra}) — o melhor **nesta** letra, hoje.

**Veredicto correção:** **node ≠ nuds.** No lab, *node* só vale como ponto de junção. *Nuds* não entra pela porta do runtime.

## 7. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Oficina / lab** | «Sobe o script no Node» | Bom: nomear o runtime · Mau: colar *nudes* na mesma frase sem corte |
| **Grafo / mapa** | «Cada página é um node» | Bom: ponto de [conexão](${conexao}) · Mau: apagar a palavra *nó* / *vértice* |
| **Chat** | «Manda nuds» | Mau no lab: outro ofício; [respeito](${respeito}) · Bom só como **exemplo** da cola |
| **ES no olho** | Ler *nudos* como nudes | Mau como tradução · Bom: inspecionar o *nudo* = [nó](${no}) |
| **Botânica** | «Node da haste» | Bom se for o gomo · Preferir **[nó](${no})** em ficha PT |
| **Piada** | «Node.js manda nudes» | [Trocadilho](${trocadilho}) consciente · Mau como étimo |

**Finalidade-mãe:** nomear o **node** para **juntar com ofício** — útil no grafo, na haste e no runtime; perigoso quando a orelha troca o ponto pelo corpo.

## 8. Rede (só fichas existentes)

| Ficha | Relação com *node* / *nuds* |
|-------|------------------------------|
| [Nó](${no}) | Ficha-mãe do *nodus* — laço na [corda](${corda}) |
| [Desatar](${desatar}) | Gesto de soltar o laço; não despir |
| [Conexão](${conexao}) · [link](${link}) | O que o node **segura** |
| [Script](${script}) | Sequência que o **Node.js** interpreta |
| [Trocadilho](${trocadilho}) | A cola *nodes*/*nudes* é jogo de olho, não origem |
| [A orelha cola…](${orelhaCola}) · [cola](${cola}) | Nome do ofício desta ficha |
| [Etimologia](${etimologia}) | Uma letra: *o* × *u* |
| [Respeito](${respeito}) · [verdade](${verdade}) | *Nudes* como vocábulo ≠ pedido de imagem |
| [Pelados em Santos](${pelados}) | Canção / alegria — outra sala |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo + falso amigo no solo BR |
| [Gesto](${gesto}) · [risco](${risco}) | Juntar sem fundir; não humilhar o rasto |
| [Valeu !!!](${mantra}) | Fecho vivo |

## 9. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **nesta letra**, hoje |
| Anti-armadilha | «*Node* soa a *nudes*» ≠ argumento de origem · «*nodus* ou *nudus*?» = ofício |
| Par vivo | [nó](${no}) · [conexão](${conexao}) · [script](${script}) |

**Veredicto:** Valeu !!! **também ao separar o ponto do corpo**. Node sem corte = cola; node com [verdade](${verdade}) = junção.

## Hipóteses (síntese)

**H1:** âncora 1 = EN *node* ← lat. *nodus* → PT [nó](${no}) / *nodo* (junção).  
**H2:** âncora 2 = *nuds* / *nudes* ← lat. *nudus* → PT *nu* (despido).  
**H3:** a orelha cola; o étimo corta (*o* × *u*; ES *nudos* ≠ EN *nudes*; IT *nodo* ≠ *nudo*).  
**H4:** Node.js = runtime de [script](${script}), nome de nós de rede.  
**H5:** fecho = [Valeu !!!](${mantra}) — sem fundir chat íntimo com ponto de grafo.

## Limites

- Não é curso de Node.js, grafos ou anatomia.  
- Não publica, pede nem ensina a obter imagens íntimas.  
- *Nude* artístico (género de atelier) só se **demarca**; não é catálogo.  
- [Pelados em Santos](${pelados}) não é esta ficha.  
- Loanword *node* ≠ apagar [nó](${no}) em texto PT do lab.

## Status

**Aprovado** — **node** fichado: *nodus*; **nuds** demarco: *nudus*; orelha cola, étimo corta; elos [nó](${no}) · [conexão](${conexao}) · [script](${script}); elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Nó](${no}) · [▶ Conexão](${conexao}) · [▶ Script](${script}) · [▶ Todas as inspeções](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[node](${self})** and its **[relation](${relacao})** to **nuds** / **nudes**. Field request: *node relates to nuds or something like that*. The Brazilian ear (and eye) **glues** *nodes* to *nudes*. Etymology **cuts**. Two Latin pieces, one letter apart: *nodus* (**knot** / junction) and *nudus* (**nude**, unclothed). The knot on the [corda](${corda}) already lives in **[nó](${no})**.

> Method note: [node](${WIKT_EN}), [nude](${WIKT_NUDE}), [nodus](${WIKT_NODUS}), [nudus](${WIKT_NUDUS}). Not a Node.js tutorial, not an intimate-image catalogue. Craft of the glue: [the ear glues what the mouth joined](${orelhaCola}). Close: [Valeu !!!](${mantra}).

## 1. Object

| Field | Value |
|-------|-------|
| Anchor 1 | **node** ← Lat. *nodus* (junction) |
| Anchor 2 | **nuds** / **nudes** ← Lat. *nudus* (bare) |
| Ear | Glues *node(s)* to *nude(s)* |
| Etymon | **Separates** — *o* ≠ *u* |
| Links | [nó](${no}) · [conexão](${conexao}) · [script](${script}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Seems:** one family because the spellings almost match.  
**Is:** two roots. Spanish *nudos* = knots (not nudes). Italian keeps the pair: *nodo* (knot) × *nudo* (nude).

## 2. BudGanja correction

**node ≠ nuds.** Plural of *node* = **nodes**. *Nuds* is chat spelling of *nudes*. Node.js is named for **network nodes**. [Respeito](${respeito}): the sheet names the word; it does not ask for or host intimate images. Close with [Valeu !!!](${mantra}).

## Status

**Approved** — EN *node* ← *nodus*; *nuds* marked as *nudus*; ear glues, etymon cuts; links [nó](${no}) · [conexão](${conexao}) · [script](${script}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Nó](${no}) · [▶ Conexão](${conexao}) · [▶ Script](${script}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[node](${self})** y su **[relación](${relacao})** con **nuds** / **nudes**. Pedido de campo: *node relaciona con nuds o algo así*. El oído (y el ojo) **pega** *nodes* a *nudes*. El étimo **corta**. Dos piezas latinas, una letra de diferencia: *nodus* (**nudo** / juntura) y *nudus* (**desnudo**). El lazo en la [corda](${corda}) ya vive en **[nó](${no})**.

> Nota: [node](${WIKT_EN}), [nude](${WIKT_NUDE}), [nodus](${WIKT_NODUS}), [nudus](${WIKT_NUDUS}). No es tutorial de Node.js ni catálogo de imágenes íntimas. Oficio de la cola: [la oreja pega lo que la boca juntó](${orelhaCola}). Cierre: [¡Valeu !!!](${mantra}).

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla 1 | **node** ← lat. *nodus* (juntura) |
| Ancla 2 | **nuds** / **nudes** ← lat. *nudus* (desnudo) |
| Oído | Pega *node(s)* a *nude(s)* |
| Étimo | **Separa** — *o* ≠ *u* |
| Trampa ES | *nudos* (plural de *nudo* = [nó](${no})) **parece** EN *nudes* |
| Vínculos | [nó](${no}) · [conexão](${conexao}) · [script](${script}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Parece:** una familia porque se escriben casi igual.  
**Es:** dos raíces. Italiano guarda el par: *nodo* (nudo/juntura) × *nudo* (desnudo).

## 2. Corrección BudGanja

**node ≠ nuds.** Plural de *node* = **nodes**. *Nuds* es grafía de chat de *nudes*. Node.js toma el nombre de **nodos de red**. [Respeito](${respeito}): la ficha nombra el vocablo; no pide ni publica imágenes íntimas. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — EN *node* ← *nodus*; *nuds* marcado como *nudus*; el oído pega, el étimo corta; vínculos [nó](${no}) · [conexão](${conexao}) · [script](${script}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Nó](${no}) · [▶ Conexão](${conexao}) · [▶ Script](${script}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_EN };
}

function buildNodePost() {
  const { body, contentEn, contentEs, wiki } = buildNodeBodies();
  const seriesOrder = pickOrder('inspecao-palavra-node', 208);

  return makePalavra({
    title: 'Inspeção: Node · nuds — orelha cola, étimo corta',
    titleEn: 'Inspection: Node · nuds — the ear glues, the etymon cuts',
    titleEs: 'Inspección: Node · nuds — el oído pega, el étimo corta',
    excerpt:
      'Palavras: «node» (lat. *nodus*) × «nuds/nudes» (lat. *nudus*) — uma letra; ES nudos ≠ EN nudes; elos nó/conexão/script; Valeu !!!',
    excerptEn:
      'Words: “node” (Lat. *nodus*) × “nuds/nudes” (Lat. *nudus*) — one letter; ES nudos ≠ EN nudes; links nó/conexão/script; Valeu !!!',
    excerptEs:
      'Palabras: «node» (lat. *nodus*) × «nuds/nudes» (lat. *nudus*) — una letra; ES nudos ≠ EN nudes; vínculos nó/conexão/script; ¡Valeu !!!',
    slug: 'inspecao-palavra-node',
    date: '2026-08-22T06:50:00.000Z',
    seriesOrder,
    seriesLabel: 'Node · nuds · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildNodePost,
  buildNodeBodies
};
