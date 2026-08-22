'use strict';

/**
 * Inspeção objecto · violão
 * Eixos: viola + -ão · guitarra clássica / acústica de nylon (BR) ·
 * ≠ guitarra eléctrica · ≠ viola caipira · ≠ violino ·
 * as cordas cantam no objecto · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/violao-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/viol%C3%A3o';
const WIKI = 'https://pt.wikipedia.org/wiki/Viol%C3%A3o';
const WIKI_GUITARRA = 'https://pt.wikipedia.org/wiki/Guitarra';

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

function buildViolaoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const self = '/posts/post-inspecao-palavra-violao.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const afinar = '/posts/post-inspecao-palavra-afinar.html';
  const afinador = '/posts/post-inspecao-palavra-afinador.html';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const objetos = '/objetos/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiktViola = 'https://pt.wiktionary.org/wiki/viola';

  const body = `## Escopo

Inspeção editorial do **objecto [violão](${self})** — no português do Brasil, a **guitarra clássica / acústica** de [cordas](${corda}) de nylon (e, por extensão, o folk de aço quando a boca ainda diz *violão*). Pedido de campo: *inspeção objeto Violão*. Esta ficha entra no catálogo [Objetos](${objetos}) como **coisa**: caixa, braço, boca, tarraxas, seis [cordas](${corda}). O ofício de pôr no tom é a ficha [afinar](${afinar}); o leitor de frequência é o [afinador](${afinador}). Não é aula, não é loja, não é a [guitarra](${WIKI_GUITARRA}) eléctrica.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · violão](${WIKT}), [Wikipédia · guitarra clássica](${WIKI}), [guitarra](${WIKI_GUITARRA}), [viola](${wiktViola}). **Ficha ≠ método de cifras, ≠ luthieria completa, ≠ catálogo de marcas.** Sem afiliação comercial. Tom: Inspetor BudGanja — o violão é o **vaso de madeira onde as [cordas](${corda}) afinam**. Fecho: [Valeu !!!](${mantra}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **violão** (BR); plural *violões* |
| Classe | Substantivo masculino — cordofone acústico |
| Étimo (trabalho) | *viola* + aumentativo *-ão* — «viola grande» — confiança: **alta** ([Wikcionário](${WIKT})) |
| Família | *viola* · *violonista* · *violão de 7 cordas* · *violão folk* |
| Cognatos / mapa | esp. *guitarra* · ing. *classical guitar* · PT-PT *viola* / *guitarra clássica* (o BR *violão* não é o padrão em Portugal) |
| Tipo BudGanja | Objecto — instrumento × [corda](${corda}) × [gesto](${gesto}) |
| Catálogo | [Objetos](${objetos}) · lema [objetos](${objetosLema}) |
| Não é | Guitarra **eléctrica** (no BR: *guitarra*) · viola caipira (10 cordas, outro corpo) · violino · viola de arco · guitarra portuguesa (fado) |
| Elo matéria | [corda](${corda}) — o fio que canta; [tónos](${tonos}) — a tensão do afinar |
| Elo ofício | [afinar](${afinar}) · [afinador](${afinador}) · [gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) · [verdade](${verdade}) |
| Fonte | [violão](${WIKT}) · [guitarra clássica](${WIKI}) |
| Data | ${inspected} |

**O que é o objecto:** uma **caixa oca em forma de oito**, um **braço** com trastes, uma **boca** e **seis [cordas](${corda})** (canónico clássico: nylon). A forma moderna da caixa deve muito ao ofício espanhol do séc. XIX (Torres e pares) — história do **objecto**, não baptismo de marca nesta ficha.

## 2. Violão × guitarra × viola × violino

| Forma | Onde | Ofício nesta ficha |
|-------|------|-------------------|
| **violão** | BR | Objecto — acústico; nylon (clássico) ou aço (folk, se a boca disser *violão*) |
| **guitarra** | BR séc. XX+ | Quase só a **eléctrica** — outro objecto (captador, cabo, amp) |
| **viola** | PT; BR *caipira* | Em Portugal: muitas vezes a clássica; no BR rural: [viola caipira](https://pt.wikipedia.org/wiki/Viola_caipira) de 10 cordas — **não** fundir |
| **violino** | Família de arco | Falso amigo de ouvido (*viol-*) — outro mapa |
| **[corda](${corda})** | Matéria | O fio **no** violão; a ficha de corda é o suporte, não o instrumento |

**H1:** *violão* = *viola* + *-ão* — aumentativo de um corpo já chamado viola (alta).  
**H2:** no BR, *guitarra* e *violão* **separaram-se** no séc. XX: eléctrica vs acústica.  
**H3:** as [cordas](${corda}) do violão são o mesmo avô grego χορδή da ficha [corda](${corda}) — matéria, não sinónimo do instrumento.  
**H4:** [afinar](${afinar}) = [gesto](${gesto}) de [tónos](${tonos}) nas tarraxas; desafinar ≠ partir o objecto.

## 3. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Caixa / tampo** | Vaso de ressonância — madeira que devolve o pulso |
| **Braço + trastes** | [Caminho](${caminho}) da mão esquerda — casas, não atalho |
| **Boca** | O buraco que deixa o ar trabalhar — não é «o som»; o som é caixa + [corda](${corda}) + [gesto](${gesto}) |
| **Tarraxas** | Onde se **[afina](${afinar})** — tensão ([tónos](${tonos})) com medida, não com raiva |
| **[Afinador](${afinador})** | Acessório-leitor (clip / diapasão / app) — **não** é peça do corpo; muleta, não dono |
| **Cavalete** | Onde as [cordas](${corda}) assentam no tampo |
| **Cordas** | Matéria que canta — ver ficha [corda](${corda}) |

**Veredicto peças:** o violão é o **conjunto**; a [corda](${corda}) é a peça que se troca e se afina. Não culpar o objecto inteiro pelo fio solto.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Aula / cifra** | O objecto *é* o método | O objecto é madeira + fio; o método é [caminho](${caminho}) |
| **Marca / loja** | O nome da loja define o violão | Sem afiliação — inspecionar a **coisa** |
| **Guitarra** | Sinónimo mundial | No BR, *guitarra* puxa a eléctrica |
| **Inspiração** | O violão «traz» a muse | [Inspiração](${inspiracao}) é sopro; o objecto **espera** o [gesto](${gesto}) |
| **Skill** | Comprar violão = ter [skill](${skill}) | Skill é rasto na mão, não o instrumento na parede |

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «pega o violão» | Bom: a coisa |
| **Ofício** | «afinar o violão» | Bom: ficha [afinar](${afinar}) — [gesto](${gesto}) + [tónos](${tonos}) |
| **Género** | «violão de 7 cordas» (choro) | Bom: família do mesmo objecto, outra contagem de [cordas](${corda}) |
| **Folk / aço** | «violão folk» | Bom se se nomeia o aço; mau se se apaga a diferença de tensão |
| **Confusão PT** | chamar *guitarra* ao nylon no BR | Mau no mapa BR — a orelha local já separou |
| **Enfeite** | violão na parede sem rasto | Mau: objecto como pose — ver [skill](${skill}) |

**Finalidade-mãe:** nomear o **violão** para **inspecionar a coisa** — caixa que segura [cordas](${corda}), mão que afina, [verdade](${verdade}) do som, sem virar tutorial nem vitrine.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Madeira + [corda](${corda}) + boca |
| Gesto | [Afinar](${afinar}) · dedilhar · abafar — [gesto](${gesto}) com [tónos](${tonos}) |
| Anti-armadilha | Comprar o objecto ≠ [skill](${skill}); desafinar ≠ desastre se houver [caminho](${caminho}) |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** instrumento, hoje |
| Poema | [poema Vida](${poemMantra}) |

**Veredicto:** Valeu !!! — o **violão** é objecto BR (viola grande); as [cordas](${corda}) cantam nele; a *guitarra* eléctrica é outro mapa.

## Hipóteses (síntese)

**H1:** *violão* < *viola* + *-ão*.  
**H2:** no BR, acústico = violão; eléctrica = guitarra.  
**H3:** [corda](${corda}) = matéria; violão = conjunto.  
**H4:** [afinar](${afinar}) = [tónos](${tonos}) + [gesto](${gesto}).  
**H5:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Corda](${corda}) | O fio no braço e no cavalete |
| [Afinar](${afinar}) | O ofício — violão × passarinho assobiando |
| [Afinador](${afinador}) | Objecto que **lê** a [corda](${corda}); a tarraxa escreve |
| [Objetos](${objetos}) · [objetos](${objetosLema}) | Catálogo da coisa |
| [Tónos](${tonos}) | Tensão do afinar |
| [Gesto](${gesto}) · [skill](${skill}) · [caminho](${caminho}) | Mão com rasto |
| [Inspiração](${inspiracao}) · [verdade](${verdade}) | Sopro ≠ objecto |
| [Língua portuguesa](${lingua}) · [hub](${hubAll}) | Solo BR do nome |
| [Risco](${risco}) · [pattern](${pattern}) | Não partir braço / não forçar tarraxa |
| [Valeu !!!](${mantra}) · [Vida](${vida}) | Fecho |

## Limites

- Não é método de ensino nem tablatura.  
- Não fecha o debate luthier (madeiras, escalas, electrificação acústica).  
- Não trata viola caipira, guitarra portuguesa nem violino como o mesmo objecto.  
- *Guitarra* noutros países de língua portuguesa ≠ mapa BR.

## Status

**Aprovado** — **violão** fichado como **objecto** (*viola* + *-ão*); catálogo [Objetos](${objetos}); [cordas](${corda}) no braço; ≠ guitarra eléctrica. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Objetos](${objetos}) · [▶ Corda](${corda}) · [▶ Afinar](${afinar}) · [▶ Afinador](${afinador}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Brazilian Portuguese **violão** — the **object**: nylon-string classical / acoustic guitar (*viola* + augmentative *-ão*). Not the BR **guitarra** (usually electric). Catalog: [Objetos](${objetos}). The [corda](${corda}) (string) is the singing material; [afinar](${afinar}) is the tuning craft. Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · violão](${WIKT}), [classical guitar](${WIKI}). Not a lesson, shop, or brand sheet.

## Object

| Field | Value |
|-------|-------|
| Thing | Hollow body, neck, sound hole, tuners, six [strings](${corda}) |
| Etymon | *viola* + *-ão* — “big viola” |
| Not | Electric guitar · viola caipira · violin · Portuguese guitar |
| Links | [corda](${corda}) · [afinar](${afinar}) · [tónos](${tonos}) · [gesture](${gesto}) · [skill](${skill}) |
| Date | ${inspected} |

## Status

**Approved** — violão as BR object; strings live on it; electric *guitarra* is another map.

[▶ Words](${hub}) · [▶ Objects](${objetos}) · [▶ Corda](${corda}) · [▶ Afinar](${afinar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**Violão** (portugués de Brasil) — el **objeto**: guitarra clásica / acústica de [cuerdas](${corda}) de nylon (*viola* + aumentativo *-ão*). No es la **guitarra** eléctrica del mapa BR. El oficio de poner en tono es [afinar](${afinar}). Catálogo: [Objetos](${objetos}). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wikcionario · violão](${WIKT}). No es método, tienda ni marca.

## Objeto

| Campo | Valor |
|-------|-------|
| Cosa | Caja, brazo, boca, clavijas, seis [cuerdas](${corda}) |
| Étimo | *viola* + *-ão* |
| No es | Eléctrica · viola caipira · violín |
| Vínculos | [corda](${corda}) · [afinar](${afinar}) · [tónos](${tonos}) · [gesto](${gesto}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — violão como objeto BR; las cuerdas cantan en él; la guitarra eléctrica es otro mapa.

[▶ Palabras](${hub}) · [▶ Objetos](${objetos}) · [▶ Corda](${corda}) · [▶ Afinar](${afinar}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildViolaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildViolaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-violao', 176);
  return makePalavra({
    title: 'Inspeção: Violão — o objecto onde as cordas afinam',
    titleEn: 'Inspection: Violão — the object where the strings are tuned',
    titleEs: 'Inspección: Violão — el objeto donde se afinan las cuerdas',
    excerpt:
      'Objecto: «violão» (viola + -ão) — guitarra clássica/acústica BR; ≠ guitarra eléctrica ≠ viola caipira; cordas no braço; ofício afinar; catálogo Objetos; Valeu !!!',
    excerptEn:
      'Object: “violão” (viola + -ão) — BR classical/acoustic guitar; ≠ electric guitarra ≠ viola caipira; strings on the neck; Objects catalog; Valeu !!!',
    excerptEs:
      'Objeto: «violão» (viola + -ão) — guitarra clásica/acústica BR; ≠ guitarra eléctrica ≠ viola caipira; cuerdas en el brazo; catálogo Objetos; ¡Valeu !!!',
    slug: 'inspecao-palavra-violao',
    date: '2026-08-22T05:45:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Violão · objecto',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildViolaoPost, buildViolaoBodies };
