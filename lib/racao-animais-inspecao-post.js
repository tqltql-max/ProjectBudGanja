'use strict';

/**
 * Hub Produtos nocivos — ração para animais (pet food + ração de produção).
 * Distinto das fichas de animal e dos derivados que o humano come (nugget, embutido, leite).
 */

function nocivoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || '/imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: opts.series,
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel,
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const SLUG = 'inspecao-derivado-racao';
const COVER = '/imagens/inspecoes/racao-animais-cover.jpg';
const DATE = '2026-08-24T12:30:00.000Z';

function buildRacaoAnimaisBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const animais = '/animais/';
  const cao = '/animais/cao/';
  const gato = '/animais/gato/';
  const cavalo = '/animais/cavalo/';
  const vaca = '/animais/vaca/';
  const galinha = '/animais/galinha/';
  const porco = '/animais/porco/';
  const peixe = '/animais/peixe-tilapia/';
  const codorna = '/animais/codorna/';
  const caoInsp = '/posts/post-inspecao-animal-cao.html';
  const gatoInsp = '/posts/post-inspecao-animal-gato.html';
  const vacaDer = '/posts/post-inspecao-derivado-vaca.html';
  const galinhaDer = '/posts/post-inspecao-derivado-galinha.html';
  const porcoDer = '/posts/post-inspecao-derivado-porco.html';
  const peixeDer = '/posts/post-inspecao-derivado-peixe.html';
  const leite = '/posts/post-inspecao-derivado-leite.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const oms = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const animalPal = '/posts/post-inspecao-palavra-animal.html';
  const wikiRacao = 'https://pt.wikipedia.org/wiki/Ra%C3%A7%C3%A3o_animal';
  const wikiPet = 'https://en.wikipedia.org/wiki/Pet_food';
  const wikiFodder = 'https://en.wikipedia.org/wiki/Fodder';
  const wikiRatio = 'https://pt.wiktionary.org/wiki/ra%C3%A7%C3%A3o';
  const mapa = 'https://www.gov.br/agricultura/pt-br';

  const body = `## Escopo

Inspeção editorial da **ração para animais** — o alimento industrial que entra no comedouro — como **produto nocivo ao organismo** quando a **dose**, o **processamento** e a **matriz extrusada** se cruzam de forma desfavorável. Esta ficha é o **hub da família**: ração seca (kibble), húmida, petiscos, concentrado pecuário, premix e a ração de aquicultura. O animal vive nas fichas de [cão](${cao}), [gato](${gato}), [vaca](${vaca}), [galinha](${galinha}), [porco](${porco}), [peixe-tilápia](${peixe}), [cavalo](${cavalo}) e [codorna](${codorna}). O que o **humano** come desses animais (nugget, embutido, leite) fica nos **derivados de risco** de cada espécie — **outra sala**.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. **Não é aconselhamento veterinário, zootécnico nem nutricional.** O animal **não** é o vilão; o foco é a **cadeia industrial de ração** (extrusão, subprodutos, milho/soja, palatabilizantes, corantes, açúcar) e a literacia de rótulo. Indexar a [Wikipédia · ração animal](${wikiRacao}) ≠ endossar marca. Sem afiliação com a indústria pet ou de alimentação animal.

## Não fundir as salas

| Sala | O que inspecciona | Ficha |
|------|-------------------|-------|
| Animal de companhia | *Canis* / *Felis* — bem-estar, não o saco | [Cão](${cao}) · [gato](${gato}) · [inspeções](${caoInsp}) |
| Animal de produção | Criação, leite, ovo, carne **frescos** | [Vaca](${vaca}) · [galinha](${galinha}) · [porco](${porco}) · [tilápia](${peixe}) |
| O que o **animal** come | Ração / pet food / concentrado (esta ficha) | **Aqui** |
| O que o **humano** come | Nugget, embutido, laticínio industrial | [Galinha](${galinhaDer}) · [porco](${porcoDer}) · [vaca](${vacaDer}) · [leite](${leite}) |
| Palavra | *animal* como vocábulo | [animal](${animalPal}) |
| Ração de combate | Comida empacotada de tropa | **Outra árvore** — desambiguação da [Wikipédia](https://pt.wikipedia.org/wiki/Ra%C3%A7%C3%A3o) |

**H0:** três objectos colados na boca e **cortados** no laboratório — o bicho, o saco, o que sai do bicho para o prato humano.

## Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Ração** (pet food · alimento industrial para animais) |
| Étimo (trabalho) | Lat. *ratio* «medida, porção, conta» → PT **ração** — confiança: **alta** ([Wikcionário](${wikiRatio})) |
| Tipo BudGanja | Produto nocivo — porção medida → categoria industrial |
| Produto de risco em foco | Kibble extrusado de baixa densidade nutricional + concentrado pecuário milho/soja + petiscos adoçados / corados |
| Série | Produtos nocivos |
| Data da inspeção | ${inspected} |
| Fontes de partida | [Ração animal](${wikiRacao}) · [Pet food](${wikiPet}) · [Fodder](${wikiFodder}) · [MAPA](${mapa}) |

**O que é o objecto:** o nome da **porção medida** que a indústria transformou em **categoria de prateleira**. Não é o [cão](${cao}). Não é o nugget. Não é a ração de combate.

## O que é a ração (composição, não moral)

*Ração* começa como **conta**: a medida do que cabe ao corpo naquele dia. No comedouro contemporâneo vira **saco** — milho, soja, farinhas de carne/vísceras, gordura pulverizada, palatabilizante, corante, antioxidante. O laboratório não discute «ração = veneno»; discute **qual ração**, **em que matriz** e **com que dose**.

| Fracção | O que é | Onde aprofundar |
|---------|---------|-----------------|
| Energia | Milho, trigo, arroz, gordura spray | [Glúten / farinha](${gluten}) quando o cereal é eixo |
| Proteína declarada | Farinha de carne, vísceras, soja, glúten de milho | Subproduto ≠ automaticamente «mau» ([Wikipédia](${wikiRacao})) — **qual** subproduto |
| Palatabilizante | Digest, gordura animal, aroma | O que faz o animal **pedir mais** |
| Corante / açúcar | Estética do kibble e petisco «sabor churrasco» | [Cana](${cana}) · [OMS açúcares livres](${oms}) como analogia de matriz |
| Humidade | Seca ≤ ~10% · húmida até ~70% | Classificação clássica da ficha Wikipédia |
| Completa e equilibrada | Alegação de rótulo (MAPA / identidade) | Literacia — o nome legal **não** apaga a lista |

**H1:** literacia zootécnica/pet separa **pasto / comida inteira com critério veterinário** de **saco extrusado de gôndola**.  
**H2:** «premium» / «super premium» no saco é **classe de marketing**, não ensaio clínico desta página.  
**H3:** o mesmo milho que engorda o frango industrial alimenta o kibble — a [História das Coisas](${historia}) lê a cadeia; esta ficha lê o **comedouro**.

## Mapa da família — o saco e o tanque

| Produto | O que é | Leitura BudGanja |
|---------|---------|------------------|
| Ração seca / kibble | Extrusão a quente; amido gelatinizado; meses na prateleira | Intermédio a elevado — conveniência ≠ dieta ancestral do carnívoro |
| Ração húmida / lata | Maior humidade; por vezes mais carne visível | Intermédio — ler proteína vs caldo e amido |
| Semi-húmida / petisco | Palatabilidade alta; açúcar, corante, sal | Elevado — o «biscoito» do cão é irmão de snack |
| Ração «completa» de companhia | Destinada a ser o único alimento | Depende da fórmula — não do slogan |
| Concentrado pecuário | Milho + soja + premix para granja | Elevado em cadeia — vira ovo, leite, carne de gôndola |
| Volumoso / pasto / feno | Fibra, ofício rural | Baixo a intermédio — contexto e manejo |
| Premix vitamínico-mineral | Núcleo técnico da ração | Literacia; **não** é protocolo de formulação nesta ficha |
| Ração de aquicultura | Farinha de peixe, soja, óleo | Elo com [tilápia](${peixe}) e [derivados do peixe](${peixeDer}) |
| Comida caseira / BARF | Tendência; formulação incompleta é risco real | **Veterinário** se for o caminho — esta ficha **não** ensina receita |

## Do grão à extrusora

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Commodity | Milho e soja — 35% do farelo de soja e ~60% do milho BR já iam para alimentação animal (registo Wikipédia / SINDIRAÇÕES, 2011) | Elevado em escala — elo [História das Coisas](${historia}) |
| Rendering / farinhas | Subprodutos de abate viram farinha de carne e ossos | Intermédio — vísceras podem ser nutritivas; bicos e penas, menos |
| Moagem + mistura | Receita industrial; premix | Intermédio |
| Extrusão | Calor, pressão, formato de kibble | Intermédio a elevado — marca a matriz ultraprocessada |
| Spray de gordura / digest | Cheiro e sabor que «puxam» o comedouro | Elevado em palatabilidade viciante (analogia, não RCT pet) |
| Corante + saco | O kibble «parece carne» | Marketing — o [chocolate](${chocolate}) humano usa o mesmo ofício de cor/açúcar |

O [intestino](${intestino}) do cão e do gato processa o que entra: rótulo curto ajuda; slogan «sabor caseiro» não apaga a extrusora.

## Pet food — literacia de rótulo (cão e gato)

As fichas de [cão](${cao}) e [gato](${gato}) já pedem **distância crítica** da indústria pet de baixa qualidade. Esta inspeção nomeia o saco.

- **primeiro ingrediente** e ordem da lista (quantidade decrescente);
- «farinha de carne», «subprodutos», «glúten de milho», «plasma», «digest»;
- açúcar, melaço, xarope, corante (o kibble vermelho não é músculo);
- lista longa + aroma + palatabilizante = matriz industrial, mesmo com lobo no anúncio;
- alegações «premium», «natural», «grain-free», «hipoalergénica» que escondem a fórmula;
- **chocolate, cebola, uva, xilitol, lírios** — tóxicos para cão/gato: o [chocolate](${chocolate}) é sala humana; no comedouro é **veneno**, não petisco.

**Grain-free e cardiomiopatia dilatada (cão):** debate científico **aberto** (sinal FDA/investigação, evidência heterogénea). O laboratório **não** fecha veredicto nem manda trocar de saco sem veterinário.

**H-gato:** felino é carnívoro estrito — taurina, proteína animal, água. Ração seca como único alimento merece pergunta veterinária, não pânico desta página.

## Ração de produção — o que o animal come vira o que o humano come

A ração de granja **não** é petisco. É a máquina que transforma milho/soja em [galinha](${galinhaDer}), [porco](${porcoDer}), [leite](${leite}) e [peixe](${peixeDer}) de gôndola.

| Elo | Leitura |
|-----|---------|
| Frango + concentrado | O nugget começa no silo, não só na empanadora |
| Suíno + ração | Embutido industrial herda a dieta da granja **e** o processamento da fábrica |
| Vaca + concentrado | Leite UHT e carne processada — salas já cortadas no [leite](${leite}) e na [vaca](${vacaDer}) |
| Tilápia + ração | Farinha de peixe / soja no tanque → empanado na gôndola |
| Aflatoxinas | Milho mal armazenado — risco de ofício agrícola, não teoria |
| Aditivos zootécnicos | Promotores e fármacos na ração são **regulação MAPA**, não protocolo desta ficha |

**H-círculo:** inspeccionar o nugget **sem** inspeccionar a ração da granja deixa metade da cadeia no escuro — o mesmo método de [Annie Leonard](${historia}).

## Ultraprocessado no comedouro (analogia, não o mesmo RCT)

O artigo [Hall et al., 2019](${hall}) mede dieta ultraprocessada **em humanos**. Esta ficha **não** afirma que o NIH ensaiou kibble. Afirma o **método**: matriz extrusada + palatabilidade + densidade calórica + dose diária. Obesidade, sarro e «pedir sempre o saco» são sinais de **literacia**, não diagnóstico.

## O que observar nos rótulos (Brasil)

- ração **completa** vs **complementar** / petisco — nomes de uso diferentes;
- espécie e fase (filhote, adulto, gato indoor) — o saco «de cão» no gato é outro erro de sala;
- milho, soja, trigo, sorgo nas primeiras posições;
- corante, antioxidante, palatabilizante no fim da lista (o fim ainda conta);
- «sabor» que não é o ingrediente (sabor picanha ≠ picanha);
- MAPA / serviço de inspeção no saco — legalidade ≠ qualidade sensorial ou densidade.

## Cruzamentos — rede Produtos nocivos

| Elo | Papel |
|-----|-------|
| [Cão](${cao}) · [gato](${gato}) | Quem come o pet food — não o vilão |
| [Vaca](${vaca}) · [galinha](${galinha}) · [porco](${porco}) · [tilápia](${peixe}) | Quem come o concentrado — e depois alimenta o humano |
| [Leite](${leite}) · [derivados da vaca](${vacaDer}) | O que sai da vaca **depois** da ração |
| [Chocolate](${chocolate}) | Matriz snack humana; **tóxico** para cão/gato |
| [Cana / açúcares livres](${cana}) | Petisco e kibble «sabor» |
| [Glúten / farinha](${gluten}) | Cereal como enchimento |
| [Hall 2019](${hall}) | Analogia de ultraprocessado — humanos, não pets |
| [História das Coisas](${historia}) | Extração → fábrica → comedouro → dejecto |
| [Análise danos × vídeos](${analise}) | Onde o acervo fala (ou não) de ração |

**Veredicto editorial:** pasto, feno e comida inteira com **critério profissional** merecem contexto; o **kibble extrusado barato**, o **petisco corado** e o **concentrado de granja** como máquina de proteína industrial merecem alerta — com método, sem pânico e sem confundir o animal com o saco.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · Cap. ração para animais |
| Veredicto | Hub do comedouro industrial; animais nas fichas de espécie; o que o humano come nos derivados de cada animal. |

## Hub

Voltar a [Produtos nocivos](${hub}) e ao [catálogo de animais](${animais}).
`;

  const contentEn = `## Scope

Editorial inspection of **animal feed** — industrial food that enters the bowl — as a **harmful product** when **dose**, **processing** and the **extruded matrix** collide. This sheet is the **family hub**: dry kibble, wet food, treats, livestock concentrate, premix and aquaculture feed. The animal lives on the [dog](${cao}), [cat](${gato}), [cattle](${vaca}), [chicken](${galinha}), [pig](${porco}), [tilapia](${peixe}), [horse](${cavalo}) and [quail](${codorna}) sheets. What **humans** eat from those animals lives on each species’ **risk-derivative** sheet — **another room**.

> **Method note:** independent BudGanja audit. **Not veterinary, zootechnical or dietary advice.** The animal is **not** the villain; the focus is the **industrial feed chain**. Indexing [Wikipedia · animal feed](${wikiRacao}) ≠ endorsing a brand.

## Do not merge rooms

| Room | Sheet |
|------|-------|
| Companion animal | [Dog](${cao}) · [cat](${gato}) |
| Production animal | [Cattle](${vaca}) · [chicken](${galinha}) · [pig](${porco}) · [tilapia](${peixe}) |
| What the **animal** eats | **This sheet** |
| What the **human** eats | [Chicken derivatives](${galinhaDer}) · [pork](${porcoDer}) · [cattle](${vacaDer}) · [milk](${leite}) |
| Combat ration | Packed troop food — **another tree** |

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Feed** / pet food / kibble |
| Etymon | Lat. *ratio* “measure, portion” → PT *ração* |
| Risk focus | Cheap extruded kibble + corn/soy livestock concentrate + dyed/sweet treats |
| Series | Harmful products |
| Inspection date | ${inspected} |

## What feed is

*Ração* starts as a **measured portion**. On the contemporary shelf it is a **bag**: corn, soy, meat/bone meals, sprayed fat, palatants, dye. The lab does not say “kibble = poison”; it asks **which formula**, **which matrix**, **which dose**.

**H1:** separate pasture / whole food under veterinary guidance from grocery extruded bags.  
**H2:** “premium” on the sack is **marketing class**, not a trial on this page.  
**H3:** the same corn that fattens industrial chicken fills kibble — [Story of Stuff](${historia}) reads the chain; this sheet reads the **bowl**.

## Family map

| Product | BudGanja reading |
|---------|------------------|
| Dry kibble | Intermediate–high — convenience ≠ ancestral carnivore diet |
| Wet / canned | Intermediate — protein vs broth and starch |
| Treats | High — the dog “biscuit” is a snack sibling |
| Livestock concentrate | High in the chain — becomes egg, milk, grocery meat |
| Pasture / hay | Low–intermediate — husbandry context |
| Homemade / BARF | **Vet** if that is the path — **no recipe** here |

## Pet-food labels

- first ingredient and list order;
- meat meal, by-products, corn gluten, digest;
- sugar, molasses, dye (red kibble is not muscle);
- “premium”, “natural”, “grain-free” as claims;
- chocolate, onion, grapes, xylitol, lilies — toxic to dog/cat; [chocolate](${chocolate}) is a human room, **poison** in the bowl.

**Grain-free and canine DCM:** **open** scientific debate. The lab does not close a verdict.

## Production feed — what the animal eats becomes what the human eats

| Link | Reading |
|------|---------|
| Chicken + concentrate | The nugget starts in the silo |
| Pig + feed | Industrial sausage inherits the barn diet **and** the factory |
| Cow + concentrate | Already cut on [milk](${leite}) and [cattle derivatives](${vacaDer}) |
| Tilapia + feed | Fishmeal/soy in the tank → breaded fish on the shelf |

**H-circle:** inspecting the nugget **without** inspecting barn feed leaves half the chain dark.

## Ultra-processed analogy

[Hall et al., 2019](${hall}) measured ultra-processed diets **in humans**. This sheet does **not** claim NIH trialled kibble. It claims the **method**: extruded matrix + palatability + calorie density + daily dose.

**Editorial verdict:** pasture and whole food with **professional criteria** deserve context; cheap extruded kibble, dyed treats and barn concentrate as an industrial protein machine deserve an alert — with method, without panic, without confusing the animal with the bag.

## Hub

Return to [Harmful products](${hub}) and the [animals catalog](${animais}).
`;

  const contentEs = `## Alcance

Inspección editorial del **pienso** / **ración para animales** — el alimento industrial que entra en el comedero — como **producto nocivo** cuando **dosis**, **procesamiento** y **matriz extruida** se cruzan. Esta ficha es el **hub de la familia**: kibble seco, húmedo, snacks, concentrado pecuario, premix y pienso de acuicultura. El animal vive en [perro](${cao}), [gato](${gato}), [vaca](${vaca}), [gallina](${galinha}), [cerdo](${porco}), [tilapia](${peixe}), [caballo](${cavalo}) y [codorniz](${codorna}). Lo que el **humano** come de esos animales vive en los **derivados de riesgo** de cada especie — **otra sala**.

> **Nota metodológica:** auditoría independiente BudGanja. **No es consejo veterinario, zootécnico ni nutricional.** El animal **no** es el villano; el foco es la **cadena industrial de pienso**.

## No fusionar las salas

| Sala | Ficha |
|------|-------|
| Compañía | [Perro](${cao}) · [gato](${gato}) |
| Producción | [Vaca](${vaca}) · [gallina](${galinha}) · [cerdo](${porco}) · [tilapia](${peixe}) |
| Lo que come el **animal** | **Esta ficha** |
| Lo que come el **humano** | [Derivados de gallina](${galinhaDer}) · [cerdo](${porcoDer}) · [vaca](${vacaDer}) · [leche](${leite}) |
| Ración de combate | Comida de tropa — **otro árbol** |

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Ración** / pienso / pet food |
| Étimo | Lat. *ratio* «medida, porción» → PT *ração* |
| Producto de riesgo | Kibble barato + concentrado maíz/soja + snacks teñidos/azucarados |
| Serie | Productos nocivos |
| Fecha | ${inspected} |

## Qué es la ración

*Ração* empieza como **porción medida**. En el estante contemporáneo es un **saco**: maíz, soja, harinas de carne, grasa pulverizada, palatabilizantes, colorante. El laboratorio no dice «pienso = veneno»; pregunta **cuál fórmula**, **en qué matriz**, **con qué dosis**.

**H1:** separar pasto / comida entera con criterio veterinario del saco extruido de góndola.  
**H2:** «premium» en el saco es **clase de marketing**, no un ensayo de esta página.  
**H3:** el mismo maíz que engorda el pollo industrial llena el kibble — [La historia de las cosas](${historia}) lee la cadena; esta ficha lee el **comedero**.

## Mapa de la familia

| Producto | Lectura BudGanja |
|----------|------------------|
| Kibble seco | Intermedio–alto |
| Húmedo / lata | Intermedio — proteína vs caldo y almidón |
| Snacks | Alto — el «biscocho» del perro es hermano del snack |
| Concentrado pecuario | Alto en la cadena — vira huevo, leche, carne de góndola |
| Pasto / heno | Bajo–intermedio |
| Casera / BARF | **Veterinario** si ese es el camino — **sin receta** aquí |

## Etiquetas pet

- primer ingrediente y orden de la lista;
- harina de carne, subproductos, gluten de maíz, digest;
- azúcar, melaza, colorante;
- chocolate, cebolla, uva, xilitol, lirios — tóxicos para perro/gato; el [chocolate](${chocolate}) es sala humana, **veneno** en el comedero.

**Grain-free y MCD canina:** debate científico **abierto**. El laboratorio no cierra veredicto.

## Pienso de producción

Inspeccionar el nugget **sin** inspeccionar el pienso de granja deja media cadena a oscuras. [Hall 2019](${hall}) midió ultraprocesados **en humanos** — analogía de método, no el mismo RCT.

**Veredicto editorial:** pasto y comida entera con **criterio profesional** merecen contexto; el kibble barato, el snack teñido y el concentrado de granja como máquina de proteína industrial merecen alerta — con método, sin pánico, sin confundir al animal con el saco.

## Hub

Volver a [Productos nocivos](${hub}) y al [catálogo de animales](${animais}).
`;

  return { body, contentEn, contentEs };
}

function buildRacaoAnimaisPost() {
  const { body, contentEn, contentEs } = buildRacaoAnimaisBodies();
  return nocivoPost({
    title: 'Inspeção: Ração para animais — do saco industrial ao comedouro',
    titleEn: 'Inspection: Animal feed — from the industrial bag to the bowl',
    titleEs: 'Inspección: Pienso para animales — del saco industrial al comedero',
    excerpt:
      'Produtos nocivos: ração para animais — kibble, petiscos e concentrado pecuário versus pasto e comida inteira. Hub do comedouro industrial; o animal nas fichas de espécie; o que o humano come nos derivados.',
    excerptEn:
      'Harmful products: animal feed — kibble, treats and livestock concentrate versus pasture and whole food. Industrial-bowl hub; the animal on the species sheets; what humans eat on the derivative sheets.',
    excerptEs:
      'Productos nocivos: pienso para animales — kibble, snacks y concentrado pecuario frente a pasto y comida entera. Hub del comedero industrial; el animal en las fichas de especie; lo que come el humano en los derivados.',
    slug: SLUG,
    date: DATE,
    series: 'animais-derivados-risco',
    seriesOrder: 8,
    seriesLabel: 'Ração · nocivo',
    coverImage: COVER,
    sourceUrl: '/animais/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  SLUG,
  COVER,
  DATE,
  buildRacaoAnimaisBodies,
  buildRacaoAnimaisPost
};
