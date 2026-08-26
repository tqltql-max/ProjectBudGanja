'use strict';

/**
 * Inspeção objecto · incineradora
 * Pedido: «Inceneradora» → forma canónica incineradora.
 * Eixos: in- + cinis (cinza) · forno industrial que reduz a cinza ·
 * ≠ cinzeiro ≠ fogueira ≠ crematório · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/incineradora-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/incinerar';
const WIKT_CINIS = 'https://en.wiktionary.org/wiki/cinis#Latin';
const WIKI = 'https://pt.wikipedia.org/wiki/Incinera%C3%A7%C3%A3o';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildIncineradoraBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-incineradora.html';
  const cinzeiro = '/posts/post-inspecao-palavra-cinzeiro.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const gelo = '/posts/post-inspecao-palavra-gelo.html';
  const incendio = '/posts/post-inspecao-palavra-incendio.html';
  const extintor = '/posts/post-inspecao-palavra-extintor.html';
  const cluster = '/posts/post-inspecao-palavra-objetos-perigosos-incendio.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const cigarro = '/posts/post-inspecao-palavra-cigarro.html';
  const isqueiro = '/posts/post-inspecao-palavra-isqueiro-bic.html';
  const exaustor = '/posts/post-inspecao-palavra-exaustor.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const plantas = '/posts/post-inspecao-palavra-planta.html';
  const cultivo = '/cultivo/';
  const annie = '/posts/post-inspecao-figura-annie-leonard.html';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const molecula = '/posts/post-pesquisa-molecula-ao-lixo.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [incineradora](${self})** — no português do Brasil, o **forno / usina** que reduz matéria a **cinza** por combustão contida. Pedido de campo: *inspeção objeto Inceneradora*. Grafia pedida **Inceneradora** → forma canónica **incineradora** (com **i**; o *e* é lapso de orelha). O irmão masculino **incinerador** nomeia a mesma família de máquina; o feminino puxa a **planta** (*usina incineradora*). Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa industrial**: câmara + chama + chaminé + cinza. Não é receita de queima, não é protocolo de lixo hospitalar, não é fogueira de quintal.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · incinerar](${WIKT}), lat. [*cinis*](${WIKT_CINIS}), [Wikipédia · Incineração](${WIKI}). **Ficha ≠ manual de incinerar, ≠ engenharia ambiental, ≠ endosso de «waste-to-energy».** Nomear o forno ≠ ensinar a acendê-lo. Sem afiliação a concessionárias, municípios ou indústria de resíduos. Tom: Inspetor BudGanja — a incineradora **não faz a coisa desaparecer**; **reduz a cinza e a gás**. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **incineradora** (lema pedido); também **incinerador** (máq. masc.) |
| Grafia pedida | *Inceneradora* → canónica **incineradora** (i, não e) |
| Classe | Substantivo feminino — forno / usina de combustão de resíduos |
| Étimo (trabalho) | *incinerar* + *-dora* ← lat. *incinerāre* «reduzir a cinza» ← *in-* + *cinis, cineris* «cinza» — confiança: **alta** |
| Família | *cinza* · [cinzeiro](${cinzeiro}) · *incinerar* · *incineração* · *incinerador* |
| Cognatos / mapa | esp. *incineradora* · ing. *incinerator* · fr. *incinérateur* · it. *inceneritore* |
| Tipo BudGanja | Objecto — forno que **faz** cinza × [cinzeiro](${cinzeiro}) que **recebe** cinza |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) · cluster [controle de incêndio](${cluster}) |
| Não é | [Cinzeiro](${cinzeiro}) · fogueira · forno de pão · crematório · [extintor](${extintor}) · aterro |
| Elo ofício | [fogo](${fogo}) · [incêndio](${incendio}) · [risco](${risco}) · [gesto](${gesto}) |
| Elo ciclo | [A História das Coisas](${historia}) · [Annie Leonard](${annie}) · [molécula ao lixo](${molecula}) |
| Fonte | [incinerar](${WIKT}) · [Incineração (WP)](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** um **vaso de [fogo](${fogo}) à escala da cidade**. Câmara de combustão, alimentação de resíduo, chaminé (e, quando existe, filtro), cinza / escória na saída. No lab: a irmã grande do [cinzeiro](${cinzeiro}) — aquele guarda o resto; esta **produz** o resto. O [fogo](${fogo}) aqui é ofício contido; se sair da câmara, vira [incêndio](${incendio}).

## 2. Incineradora × cinzeiro × fogo × extintor

| Forma | Onde | Ofício nesta ficha |
|-------|------|-------------------|
| **incineradora** | BR/PT | Objecto — usina / forno que reduz a cinza |
| **incinerador** | Dicionário | Mesma máquina no masculino; muitas vezes o aparelho |
| **incineração** | Processo | O ofício — não é a coisa |
| **incinerar** | Verbo | O gesto industrial — **não** receita nesta ficha |
| **[cinzeiro](${cinzeiro})** | Recipiente | Recebe cinza já feita (cigarro / combustão leve) |
| **[fogo](${fogo})** | Elemento | *focus* — a chama de ofício; aqui, **dentro** da câmara |
| **[incêndio](${incendio})** | Evento | Fogo **fora** de sítio — o que a câmara não deve ser |
| **[extintor](${extintor})** | Controle | Gesto contrário: **apagar**, não reduzir a cinza |
| **fogueira** | Ar livre | Combustão aberta — **não** este objecto |
| **crematório** | Outro objecto | Restos humanos — outra sala, outro rito |
| **aterro** | Outro destino | Enterrar em vez de queimar — outro mapa |

**H1:** *incineradora* < *incinerar* < lat. *incinerāre* < *cinis* — a mesma cinza do [cinzeiro](${cinzeiro}) (alta).  
**H2:** o [cinzeiro](${cinzeiro}) **guarda**; a incineradora **faz**. Escala e ofício diferentes; árvore lexical comum.  
**H3:** *Inceneradora* é orelha (e por i); o [étimo](${etimo}) pede **i** de *cinis*.  
**H4:** [extintor](${extintor}) apaga; incineradora **alimenta** o [fogo](${fogo}) de propósito, dentro de limites.

## 3. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Câmara** | Onde o [fogo](${fogo}) trabalha — o «dentro» que não pode vazar |
| **Alimentação** | O que entra (resíduo nomeado) — sem receita nesta ficha |
| **Chaminé** | Onde o gás sobe — prima do [exaustor](${exaustor}), outra escala |
| **Filtro / lavagem** (quando há) | Tenta apanhar o que a chama **não** apaga — não é magia |
| **Cinza / escória** | O sólido que resta — irmão industrial do que o [cinzeiro](${cinzeiro}) guarda |
| **Calor** | Às vezes vira vapor / electricidade («waste-to-energy») — **nome**, não endosso |
| **Gesto de carga** | Quem alimenta a câmara — [risco](${risco}) profissional, fora desta ficha |

**Veredicto peças:** a incineradora é o **conjunto**. Sem câmara, é fogueira. Sem cinza na saída, a história de «desapareceu» é falsa.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **O away** | A coisa some | Vira cinza + gás — [A História das Coisas](${historia}) |
| **O cinzeiro** | É o mesmo objecto | Escala e ofício: guardar ≠ produzir |
| **A limpeza** | Queimar = higienizar | Queimar **transforma**; não apaga o ciclo ([molécula ao lixo](${molecula})) |
| **A fogueira** | Qualquer chama serve | Esta ficha é **forno industrial**, não quintal |
| **O extintor** | Tudo o que mexe com fogo é irmão | Um apaga; o outro **contém e usa** |
| **O crematório** | Mesma palavra de cinza | Outro objecto, outro rito — não fundir |
| **A grafia** | *Inceneradora* soa certo | Canónica **incineradora** — *cinis* leva **i** |

**H-parece:** a incineradora é o sítio onde o lixo **acaba**.  
**H-é:** o lixo **muda de forma**. [Como os ricos transformam as coisas](${ricos}) — transformar ≠ sumir. [Annie Leonard](${annie}) mapeia o mesmo ciclo: extrair → fazer → descartar; a chama no fim **não fecha** o mapa.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Usina** | «incineradora de lixo da cidade» | Bom: o objecto-planta |
| **Máquina** | «incinerador de documentos» | Bom como **nome** de aparelho; mau se esta ficha vira manual |
| **Grafia** | *Inceneradora* | Mau no papel; orelha registada; canónica com **i** |
| **Metáfora** | «isso vai pra incineradora» | Bom se se lembra que **não some**; mau se «away» |
| **Quintal** | «vou incinerar no fundo» | Mau: fogueira ≠ este objecto; [risco](${risco}) |
| **Cultivo** | «cinza da incineradora no vaso» | Mau sem inspeção — cinza industrial ≠ adubo ([planta](${plantas}) · [cultivo](${cultivo})) |
| **Cigarro** | Cinza no [cinzeiro](${cinzeiro}) | Outra escala — não misturar com usina |

**Finalidade-mãe:** nomear a **incineradora** para inspecionar o **forno que reduz a cinza** — irmã industrial do [cinzeiro](${cinzeiro}) — sem virar receita de queima nem conto de que a coisa desapareceu.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Forno / usina — catálogo [Objetos](${objetos}) · [controle de incêndio](${cluster}) |
| Árvore | *cinis* — mesma cinza do [cinzeiro](${cinzeiro}) |
| Fogo | [Fogo](${fogo}) contido ≠ [incêndio](${incendio}) · [extintor](${extintor}) é o outro gesto |
| Ciclo | [História das Coisas](${historia}) · [Annie Leonard](${annie}) · [molécula ao lixo](${molecula}) |
| Anti-armadilha | Away = falso · *Inceneradora* = orelha · cinza industrial ≠ adubo |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** resto, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **incineradora** é objecto (*in-* + *cinis* + *-dora*); reduz a cinza, **não apaga o ciclo**. O [cinzeiro](${cinzeiro}) guarda o resto pequeno; esta ficha inspeciona o resto **à escala da cidade**.

## Hipóteses (síntese)

**H1:** *incineradora* < *incinerar* < lat. *incinerāre* < *cinis, cineris* — alta.  
**H2:** mesmo [étimo](${etimo}) de cinza / [cinzeiro](${cinzeiro}); classe **forno**, não recipiente.  
**H3:** *Inceneradora* = lapso; canónica com **i**.  
**H4:** incinerador (m.) e incineradora (f.) = mesma família; o feminino puxa a usina.  
**H5:** «away» é história; cinza + gás é matéria.  
**H6:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Cinzeiro](${cinzeiro}) | Recipiente da cinza — irmão pequeno |
| [Fogo](${fogo}) · [incêndio](${incendio}) · [extintor](${extintor}) | Elemento × evento × corte |
| [Controle de incêndio](${cluster}) | Mapa da tenda — esta ficha é a usina, não a tenda |
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Cigarro](${cigarro}) · [isqueiro BIC](${isqueiro}) | Combustão de bolso — outra escala |
| [Exaustor](${exaustor}) | Gás que sai — prima da chaminé |
| [Balde](${balde}) | Outro vaso de ofício — volumes diferentes |
| [A História das Coisas](${historia}) · [Annie Leonard](${annie}) | Ciclo extrair→fazer→descartar; incineração no mapa |
| [Como os ricos transformam as coisas](${ricos}) | Transformar ≠ sumir |
| [Molécula ao lixo](${molecula}) | Resíduo farmacêutico e o mesmo ciclo |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [língua portuguesa](${lingua}) | *cinis* e o i canónico |
| [Gesto](${gesto}) · [verdade](${verdade}) · [risco](${risco}) · [caminho](${caminho}) | Ofício e limite |
| [Planta](${plantas}) · [cultivo](${cultivo}) | Cinza industrial ≠ adubo automático |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é manual de incinerar resíduos, documentos, plantas ou material clínico.  
- Não é projecto de usina, laudo de emissões nem ranking «melhor destino do lixo».  
- Não trata crematório, fogueira, forno de padaria ou [extintor](${extintor}) como este objecto.  
- Cinza de incineradora **não** entra no [cultivo](${cultivo}) sem critério próprio.  
- Grafia canónica: **incineradora** (não «inceneradora»).

## Status

**Aprovado** — **incineradora** fichada como **objecto** (*in-* + *cinis* + *-dora*); pedido *Inceneradora* → canónica com **i**; catálogo [Objetos](${objetos}); forno que **reduz a cinza**, irmã industrial do [cinzeiro](${cinzeiro}); ≠ fogueira ≠ crematório ≠ away. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Cinzeiro](${cinzeiro}) · [▶ Fogo](${fogo}) · [▶ Extintor](${extintor}) · [▶ História das Coisas](${historia}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **incineradora** (requested spelling “Inceneradora” → canonical **incineradora**) — the **object**: an industrial furnace / plant that reduces matter to **ash**. Same *cinis* tree as [cinzeiro](${cinzeiro}) (ashtray): that **holds** ash; this **makes** it. Catalog: [Objetos](${objetos}). Not a how-to. Not a waste-to-energy ad. Close: [Valeu !!!](${mantra}).

> Independent audit. [incinerar](${WIKT}), Lat. [*cinis*](${WIKT_CINIS}), [Wikipedia · Incineration](${WIKI}). The incinerator **does not make stuff vanish**; it **turns it into ash and gas**.

## Object

| Field | Value |
|-------|-------|
| Thing | Combustion chamber + chimney + ash / slag |
| Etymon | *incinerar* + *-dora* ← Lat. *incinerāre* ← *in-* + *cinis* “ash” |
| Requested spelling | *Inceneradora* (e) → **incineradora** (i) |
| Not | [Cinzeiro](${cinzeiro}) · open bonfire · bakery oven · crematorium · [extintor](${extintor}) |
| Links | [fogo](${fogo}) · [incêndio](${incendio}) · [A História das Coisas](${historia}) · [Annie Leonard](${annie}) |
| Date | ${inspected} |

**Seems:** trash goes “away.”  
**Is:** matter **changes form**. [How the rich transform things](${ricos}) — transform ≠ disappear.

## Status

**Approved** — incineradora as object; same *cinis* as [cinzeiro](${cinzeiro}); other scale. No plant affiliation.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Cinzeiro](${cinzeiro}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Incineradora** (portugués; pedido *Inceneradora* → canónica **incineradora**) — el **objeto**: horno / planta industrial que reduce materia a **ceniza**. Mismo árbol *cinis* que [cinzeiro](${cinzeiro}): aquel **guarda**; esta **hace**. Catálogo: [Objetos](${objetos}). No es receta. No es anuncio. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [incinerar](${WIKT}), lat. [*cinis*](${WIKT_CINIS}). La incineradora **no hace desaparecer** las cosas; las **vuelve ceniza y gas**.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Cámara + chimenea + ceniza / escoria |
| Étimo | *incinerar* + *-dora* ← lat. *incinerāre* ← *in-* + *cinis* |
| Grafía | *Inceneradora* (e) → **incineradora** (i) |
| No es | [Cinzeiro](${cinzeiro}) · hogera · horno de pan · crematorio · [extintor](${extintor}) |
| Vínculos | [fogo](${fogo}) · [incêndio](${incendio}) · [A História das Coisas](${historia}) |
| Fecha | ${inspected} |

**Parece:** la basura se va.  
**Es:** la materia **cambia de forma**. Transformar ≠ desaparecer.

## Estado

**Aprobada** — incineradora como objeto; el mismo *cinis* que [cinzeiro](${cinzeiro}); otra escala. Sin afiliación.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Cinzeiro](${cinzeiro}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildIncineradoraPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildIncineradoraBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-incineradora', 307);
  return makePalavra({
    title: 'Inspeção: Incineradora — o objecto que reduz a cinza',
    titleEn: 'Inspection: Incineradora — the object that reduces to ash',
    titleEs: 'Inspección: Incineradora — el objeto que reduce a ceniza',
    excerpt:
      'Objecto: «incineradora» (pedido Inceneradora → canónica; in- + cinis + -dora) — forno que faz cinza; ≠ cinzeiro ≠ fogueira ≠ away; Valeu !!!',
    excerptEn:
      'Object: “incineradora” (requested Inceneradora → canonical; in- + cinis + -dora) — furnace that makes ash; ≠ ashtray ≠ bonfire ≠ away; Valeu !!!',
    excerptEs:
      'Objeto: «incineradora» (pedido Inceneradora → canónica; in- + cinis + -dora) — horno que hace ceniza; ≠ cenicero ≠ hogera ≠ away; ¡Valeu !!!',
    slug: 'inspecao-palavra-incineradora',
    date: '2026-08-24T18:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Incineradora · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIncineradoraPost,
  buildIncineradoraBodies,
  COVER,
  WIKT,
  WIKT_CINIS,
  WIKI
};
