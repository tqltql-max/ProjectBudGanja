'use strict';

/**
 * Inspeção Expressões · «os doze apóstolos»
 * Conjunto nomeado (tradição cristã) × frase viva BR × ofício de envio.
 * Respeito à fé; sem proselitismo. Ficha ≠ catecismo, ≠ hagiografia.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildDozeApostolosBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const poem = '/vida/#poema=os-doze-apostolos';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const templo =
    '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const abencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const ceia = '/posts/post-inspecao-arte-santa-ceia.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Doze_Ap%C3%B3stolos';
  const wikiEn =
    'https://en.wikipedia.org/wiki/Apostles_in_the_New_Testament';
  const wikiAp = 'https://pt.wiktionary.org/wiki/ap%C3%B3stolo';
  const wikiMt = 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Mateus';
  const wikiMc = 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Marcos';
  const wikiLc = 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Lucas';
  const wikiAt = 'https://pt.wikipedia.org/wiki/Atos_dos_Ap%C3%B3stolos';
  const lucas = '/posts/post-inspecao-figura-lucas-evangelista.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[os doze apóstolos](${self})»** — o **conjunto nomeado** da tradição cristã e a **frase viva** no português do Brasil (igreja, oralidade, metáfora de equipa completa). Pedido do lab também como *os dozes apostulos* (plural analógico + sem acento): a ficha ancora **os doze apóstolos**. Irmã de [filho de deus](${filhoDeDeus}), [o templo de Cristo, corpo e alma](${templo}) e [A Paixão de Cristo](${paixao}); solo da [língua portuguesa](${lingua}). Poema Vida: [Os doze](${poem}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = o **nome do conjunto** e o vocábulo **apóstolo** (gr. *apóstolos*, «enviado»). Respeito à fé de quem os honra; **sem** proselitismo nem doutrina. **Ficha ≠ catecismo, ≠ santoral, ≠ biografia de cada um.** Listas evangélicas **divergem** em um ou dois nomes — o laboratório **declara a variação**, não escolhe uma igreja. Sem afiliação religiosa. O debate sobre Judas **não** se transforma em ódio a um povo: [respeito](${respeito}) primeiro.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão (lab) | **os doze apóstolos** |
| Pedido / oral | *os dozes apostulos* · *os 12 apostolos* |
| Núcleo | **apóstolo** — *enviado* (não «chefe» nem [ídolo](${idolo})) |
| Tipo | Expressão — conjunto nomeado × frase viva × ofício de envio |
| Número | **Doze** — quota do grupo (irmão de [três](${tres}) como número que *fecha um conjunto*, outro objecto) |
| Tipo BudGanja | Mapa cultural e lexical — sem hagiografia |
| Elo ofício | [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo fé / cultura | [filho de deus](${filhoDeDeus}) · [templo, corpo e alma](${templo}) · [Paixão](${paixao}) · [Santa Ceia](${ceia}) · [Padre Ticão](${padreTicao}) |
| Fonte | [Wikipédia · Doze Apóstolos](${wiki}) · [EN](${wikiEn}) · [Wikcionário · apóstolo](${wikiAp}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **os doze apóstolos** | Canónica lab — número + nome do ofício |
| os dozes apostulos | Pedido / oral — *dozes* por analogia (*os dois, os três… os dozes*); *apostulos* sem acento |
| os 12 apóstolos / os 12 | Cifra — mesmo conjunto |
| os Doze | Maiúscula de conjunto (tradição) |
| the Twelve / the twelve apostles | EN |
| los doce apóstoles | ES |
| apóstolo / apostolo | Vocábulo isolado — ver étimo |
| apostolado / apostólico | Família: missão, carta, sede |

**Veredicto de forma:** *doze* (invariável neste uso) é a forma culta; *dozes* fica como **oralidade do pedido**, não como correção moral. A ficha honra o pedido e ancora a grafia.

## Étimo de trabalho — apóstolo

| Peça | Étimo (trabalho) | Confiança |
|------|------------------|-----------|
| **apóstolo** | gr. *ἀπόστολος* (*apóstolos*) «enviado, delegado» ← *ἀποστέλλω* «enviar» | Alta |
| lat. *apostolus* | Ponte para as línguas romances | Alta |
| **discípulo** | gr. *mathētḗs* «aluno» — quem **aprende**; não é sinónimo automático de *apóstolo* | Alta |
| **os doze** | Quota do grupo nas listas dos Evangelhos e em [Atos](${wikiAt}) 1 | Alta (tradição textual) |

**H1:** *apóstolo* = **quem é enviado**, não quem sobe ao pedestal.  
**H2:** todo o doze é discípulo; **nem todo** discípulo é um dos Doze.  
**H3:** no BR vivo, *apóstolo* também é **título** de liderança em algumas igrejas — **uso contemporâneo**, distinto do conjunto do século I.

## Hipóteses e método

**H1:** o valor BudGanja do conjunto é o **envio** ([caminho](${caminho}) + [gesto](${gesto})), não a colecção de santos para o laboratório.  
**H2:** as listas de [Mateus](${wikiMt}) 10, [Marcos](${wikiMc}) 3, [Lucas](${wikiLc}) 6 e [Atos](${wikiAt}) 1 **não coincidem letra a letra** (Tadeu / Judas de Tiago; Simão Zelote / Cananeu). Mapear ≠ harmonizar à força.  
**H3:** Judas Iscariotes faz parte da lista original; [Matias](${wikiAt}) restaura os doze depois; **Paulo** é apóstolo na tradição e **não** um dos Doze — não colapsar.  
**H4:** Tomé (o que inspecciona) é **parente de ofício** deste laboratório: ver antes de jurar.  
**H5:** fecho = [Valeu !!!](${mantra}) — o melhor *envio de hoje*, sem púlpito.

## Os doze — mesa de trabalho (tradição ocidental corrente no BR)

Nomes em português do Brasil. A coluna «nota» é **memória cultural**, não prova histórica desta ficha. A coluna «ofício lab» traduz sem canonizar.

| # | Nome (BR) | Memória cultural (alta / média) | Ofício lab |
|---|-----------|---------------------------------|------------|
| 1 | **Simão Pedro** | Pedra, pesca, triple negação, levantar-se | Cair e **ficar** — [gesto](${gesto}) depois da falha |
| 2 | **André** | Irmão de Pedro; tradição de «primeiro chamado» | Trazer o outro sem o apagar |
| 3 | **Tiago Maior** | Filho de Zebedeu; *Boanerges*; martírio em Atos 12 | Fogo curto no [caminho](${caminho}) |
| 4 | **João** | Irmão de Tiago; tradição do discípulo amado / testemunho | Palavra e [relação](${relacao}) |
| 5 | **Filipe** | Betsaida; «vem e vê» | Convite — não pressão |
| 6 | **Bartolomeu** (Natanael) | Identificação tradicional com Natanael | Sem dolo — [verdade](${verdade}) no encontro |
| 7 | **Tomé** | Gémeo; dúvida e confissão | **Inspecionar** antes de crer — par do lab |
| 8 | **Mateus** | Publicano / Levi; tradição do Evangelho | Da mesa da receita à mesa do envio |
| 9 | **Tiago Menor** | Filho de Alfeu | O «menor» no nome ≠ menor no ofício |
| 10 | **Judas Tadeu** (Tadeu) | Listas divergem (Tadeu / Judas de Tiago / Lebeu) | Não confundir o **nome** com Iscariotes |
| 11 | **Simão Zelote** | Zelote / Cananeu | Fogo político × envio — não misturar |
| 12 | **Judas Iscariotes** | Traição; trinta moedas | Mapear a queda **sem** [vingança](${vinganca}) e sem ódio a um povo |

**Décimo terceiro (restauração):** **Matias** — escolhido em [Atos](${wikiAt}) 1 para **repor os doze**.  
**Fora da quota e ainda apóstolo (tradição):** **Paulo** (Saulo) — envio às nações; **não** substitui a ficha dos Doze.  
**Fora da quota (companheiro que escreve):** **[Lucas](${lucas})** — médico de homens e de almas; **não** um dos Doze.

**Veredicto de lista:** o laboratório ficheia **doze assentos** e declara o **assento vazio / restaurado**. Não inventa um décimo terceiro «oficial» do lab.

## Mapa de usos no português do Brasil

| Uso | Leitura | Bom × mau |
|-----|---------|-----------|
| **Conjunto da tradição** | Os Doze dos Evangelhos | Bom: [respeito](${respeito}) à fé · Mau: catequizar o leitor aqui |
| **Igreja / topónimo** | Paróquia, festa, «Igreja dos Doze Apóstolos» | Bom: mapa cultural · Mau: achar que o lab é a paróquia |
| **Equipa completa** | «Os doze» = o time fechado | Bom: metáfora de conjunto · Mau: clube que humilha quem ficou de fora |
| **Título «Apóstolo» (hoje)** | Liderança em algumas igrejas pentecostais / neopentecostais | Bom: nomear o uso vivo · Mau: zombar da fé alheia **ou** confundir com os Doze do século I |
| **Judas (insulto)** | Traidor na fala corrente | Bom: nomear a ferida · Mau: linchar; Mau: antissemitismo disfarçado de «Judas» |
| **Tomé (dúvida)** | «São-tomé» / incrédulo | Bom: direito de inspecionar · Mau: humilhar quem pergunta |
| **Pedro (base)** | Pedra, chaves, queda | Bom: levantar-se · Mau: pedestal infalível ([ídolo](${idolo})) |
| **Ofício** | Enviar-se ao [caminho](${caminho}) de hoje | [Valeu !!!](${mantra}) |

## Relação com as irmãs

| Expressão / obra | Plano | Quando |
|------------------|-------|--------|
| [filho de deus](${filhoDeDeus}) | Título · dignidade | Nomear o centro — não a equipa |
| [o templo de Cristo, corpo e alma](${templo}) | Morada · inteireza | Onde se habita |
| [jesusamado](${jesusamado}) · [jesusudavi](${jesusudavi}) | Sopro oral | Peito, não lista |
| [A Paixão de Cristo](${paixao}) | Filme 2004 | Recorte das últimas horas — **não** biografia dos Doze |
| [A vingança nunca é plena…](${vinganca}) | Aviso | Depois de Judas: não beber o rancor |
| [ídolo](${idolo}) | Armadilha | Os Doze no pedestal comem o [gesto](${gesto}) |
| **os doze apóstolos** | Conjunto · envio | Nomear a mesa dos enviados |

**Veredicto de escala:** as irmãs medem **peito, título e morada**; esta ficha mede o **grupo que parte**.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear o conjunto** | Fé, arte, escola | Mapa — sem santoral |
| **Distinguir envio e pedestal** | Apóstolo ≠ [ídolo](${idolo}) | Ofício de ser enviado |
| **Honrar a dúvida** | Tomé | Inspecção ≠ falta de [alma](${alma}) |
| **Não odiar na traição** | Judas na fala | [Respeito](${respeito}) · [vingança](${vinganca}) como aviso |
| **Fechar com ofício** | Depois da lista | [Valeu !!!](${mantra}) · [poema](${poem}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| [filho de deus](${filhoDeDeus}) · [templo, corpo e alma](${templo}) · [Deus abençoe](${abencoe}) | Solo religioso-cultural BR |
| [A Paixão de Cristo](${paixao}) | Cinema da Paixão — outro objecto |
| [Padre Ticão](${padreTicao}) | Cuidado no catálogo — sem doutrina aqui |
| [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) | Como se envia sem pose |
| [ídolo](${idolo}) · [três](${tres}) | Pedestal × quota de conjunto |
| [língua portuguesa](${lingua}) | Solo onde *doze* e *dozes* convivem |
| [Valeu !!!](${mantra}) · [poema mantra](${poemMantra}) | Depois da mesa — o ofício |
| [Os doze](${poem}) | Verso Vida desta ficha |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmãs | [filho de deus](${filhoDeDeus}) · [templo](${templo}) · [Paixão](${paixao}) |
| Mantra | [Valeu !!!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [poema](${poem}) · [Diário](${diario}) |
| Cuidado (catálogo) | [Padre Ticão](${padreTicao}) |

## Limites

- Não é aula de religião, dogma, sucessão apostólica ou juízo sobre quem crê.  
- Não é biografia completa de cada um dos doze — é **mesa**, não enciclopédia.  
- Não usa Judas para odiar judeus, nem Tomé para humilhar quem pergunta.  
- Não confunde o título contemporâneo «Apóstolo» com os Doze do século I.  
- Não transforma os Doze em [ídolos](${idolo}) do laboratório.  
- Harmonizar listas à força = apagar [verdade](${verdade}) textual.  
- Elo [Padre Ticão](${padreTicao}) = legado de cuidado no catálogo; **não** afiliação eclesiástica desta ficha.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *os doze apóstolos* fichados como **conjunto nomeado**, **frase viva BR** e **ofício de envio** (*apóstolos* = enviados); listas divergentes declaradas; Judas e Matias no mapa sem veneno; Tomé como par da inspeção; fecho [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ filho de deus](${filhoDeDeus}) · [▶ templo](${templo}) · [▶ Paixão](${paixao}) · [▶ Santa Ceia](${ceia}) · [▶ Poema Vida](${poem}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“[os doze apóstolos](${self})”** — the **named set** in Christian tradition and a **living phrase** in Brazilian Portuguese (church, speech, metaphor of a complete team). The lab request also arrived as *os dozes apostulos* (analogical plural + no accent): the sheet anchors **os doze apóstolos**. Sisters [filho de deus](${filhoDeDeus}), [temple of Christ, body and soul](${templo}), [The Passion of the Christ](${paixao}); [Portuguese](${lingua}) soil. Vida poem: [The Twelve](${poem}).

> Independent BudGanja audit. Object = the **name of the set** and the word **apostle** (Gk. *apóstolos*, “one sent”). Respect for faith; **no** proselytizing. **Sheet ≠ catechism, ≠ saint list, ≠ twelve biographies.** Gospel lists **diverge** on one or two names — we **declare variation**, we do not pick a church. No religious affiliation. The Judas debate **must not** become hatred of a people: [respect](${respeito}) first.

## Object

| Field | Value |
|-------|-------|
| Saying (lab) | **os doze apóstolos** (the twelve apostles) |
| Request / oral | *os dozes apostulos* · *os 12 apostolos* |
| Core | **apostle** — *sent one* (not “boss”, not [idol](${idolo})) |
| Type | Named set × living phrase × craft of being sent |
| Links | [filho de deus](${filhoDeDeus}) · [temple](${templo}) · [Passion](${paixao}) · [gesture](${gesto}) · [path](${caminho}) · [truth](${verdade}) · [Valeu !!!](${mantra}) |
| Source | [Wikipedia · Twelve Apostles](${wiki}) · [EN](${wikiEn}) · [Wiktionary](${wikiAp}) |
| Date | ${inspected} |

## Form

**os doze apóstolos** is the lab form. *dozes* stays as **orality of the request**, not a moral correction. *Apostle* ≠ automatic synonym of *disciple*: the Twelve are disciples; **not every** disciple is one of the Twelve.

## The twelve — working table (Western list common in BR)

Cultural memory, not historical proof in this sheet.

| # | Name | Lab office |
|---|------|------------|
| 1 | **Simon Peter** | Fall and **stay** — [gesture](${gesto}) after failure |
| 2 | **Andrew** | Bring the other without erasing him |
| 3 | **James the Greater** | Short fire on the [path](${caminho}) |
| 4 | **John** | Word and [relation](${relacao}) |
| 5 | **Philip** | Invitation — not pressure |
| 6 | **Bartholomew** (Nathanael) | Without guile — [truth](${verdade}) |
| 7 | **Thomas** | **Inspect** before swearing — kin of this lab |
| 8 | **Matthew** | From the tax table to the sending table |
| 9 | **James the Less** | “Less” in the name ≠ less in the craft |
| 10 | **Jude Thaddaeus** | Do not confuse the **name** with Iscariot |
| 11 | **Simon the Zealot** | Political fire × sending — do not mix |
| 12 | **Judas Iscariot** | Map the fall **without** [revenge](${vinganca}) and without hatred of a people |

**Restoration:** **Matthias** ([Acts](${wikiAt}) 1) restores the twelve.  
**Apostle and not of the Twelve:** **Paul**.  
**Companion who writes, not of the Twelve:** **[Luke](${lucas})** — physician of men and of souls.

**H1:** value = **being sent**, not a pedestal of lab saints.  
**H2:** lists in [Matthew](${wikiMt}) 10, [Mark](${wikiMc}) 3, [Luke](${wikiLc}) 6, [Acts](${wikiAt}) 1 are **not letter-identical**.  
**H3:** Thomas is craft-kin: seeing is not lack of [soul](${alma}).  
**H4:** close with [Valeu !!!](${mantra}) — today’s sending, no pulpit.

## Brazilian uses

Tradition set · church / place-name · “the twelve” as a closed team · modern title **Apostle** in some churches (**not** the first-century Twelve) · **Judas** as insult (name the wound; do not lynch; no antisemitism) · **Thomas** as doubter (right to inspect) · **Peter** as rock (rise; no infallible [idol](${idolo})).

## Limits

No catechism · no full biography of each · no hatred via Judas · no mockery of living faith · do not collapse today’s title with the Twelve · do not force-harmonize lists.

## Verdict

**Approved** — named set · living BR phrase · craft of being sent; divergent lists declared; Judas and Matthias on the map without poison; Thomas as inspection’s pair; [Valeu !!!](${mantra}).

[▶ Expressions](${hub}) · [▶ filho de deus](${filhoDeDeus}) · [▶ temple](${templo}) · [▶ Passion](${paixao}) · [▶ Vida poem](${poem}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **«[os doze apóstolos](${self})»** — el **conjunto nombrado** de la tradición cristiana y la **frase viva** en el portugués de Brasil (iglesia, oralidad, metáfora de equipo completo). El pedido del lab también llegó como *os dozes apostulos* (plural analógico + sin acento): la ficha ancla **os doze apóstolos**. Hermanas [filho de deus](${filhoDeDeus}), [el templo de Cristo, cuerpo y alma](${templo}), [La Pasión de Cristo](${paixao}); suelo de la [lengua portuguesa](${lingua}). Poema Vida: [Los doce](${poem}).

> Auditoría independiente. Objeto = el **nombre del conjunto** y la voz **apóstol** (gr. *apóstolos*, «enviado»). Respeto a la fe; **sin** proselitismo. **Ficha ≠ catecismo, ≠ santoral, ≠ doce biografías.** Las listas evangélicas **divergen** en uno o dos nombres — se **declara la variación**. Sin afiliación religiosa. El debate sobre Judas **no** se vuelve odio a un pueblo: [respeto](${respeito}) primero.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión (lab) | **os doze apóstolos** (los doce apóstoles) |
| Pedido / oral | *os dozes apostulos* · *os 12 apostolos* |
| Núcleo | **apóstol** — *enviado* (no «jefe» ni [ídolo](${idolo})) |
| Tipo | Conjunto nombrado × frase viva × oficio de envío |
| Vínculos | [filho de deus](${filhoDeDeus}) · [templo](${templo}) · [Pasión](${paixao}) · [gesto](${gesto}) · [camino](${caminho}) · [verdad](${verdade}) · [¡Valeu !!!](${mantra}) |
| Fuente | [Wikipedia · Doce Apóstoles](${wiki}) · [EN](${wikiEn}) · [Wikcionario](${wikiAp}) |
| Fecha | ${inspected} |

## Forma

**os doze apóstolos** es la forma lab. *dozes* queda como **oralidad del pedido**, no como corrección moral. *Apóstol* ≠ sinónimo automático de *discípulo*.

## Los doce — mesa de trabajo (lista occidental corriente en BR)

Memoria cultural, no prueba histórica en esta ficha.

| # | Nombre | Oficio lab |
|---|--------|------------|
| 1 | **Simón Pedro** | Caer y **quedarse** — [gesto](${gesto}) después de la falla |
| 2 | **Andrés** | Traer al otro sin borrarlo |
| 3 | **Santiago el Mayor** | Fuego corto en el [camino](${caminho}) |
| 4 | **Juan** | Palabra y [relación](${relacao}) |
| 5 | **Felipe** | Invitación — no presión |
| 6 | **Bartolomé** (Natanael) | Sin dolo — [verdad](${verdade}) |
| 7 | **Tomás** | **Inspeccionar** antes de jurar — par del lab |
| 8 | **Mateo** | De la mesa del impuesto a la del envío |
| 9 | **Santiago el Menor** | «Menor» en el nombre ≠ menor en el oficio |
| 10 | **Judas Tadeo** | No confundir el **nombre** con Iscariote |
| 11 | **Simón el Zelote** | Fuego político × envío — no mezclar |
| 12 | **Judas Iscariote** | Mapear la caída **sin** [venganza](${vinganca}) y sin odio a un pueblo |

**Restauración:** **Matías** ([Hechos](${wikiAt}) 1) repone los doce.  
**Apóstol y no de los Doce:** **Pablo**.  
**Compañero que escribe, no de los Doce:** **[Lucas](${lucas})** — médico de hombres y de almas.

**H1:** el valor es el **envío**, no el pedestal.  
**H2:** las listas de [Mateo](${wikiMt}) 10, [Marcos](${wikiMc}) 3, [Lucas](${wikiLc}) 6 y [Hechos](${wikiAt}) 1 **no coinciden letra a letra**.  
**H3:** Tomás es par de oficio: ver no es falta de [alma](${alma}).  
**H4:** cierre = [¡Valeu !!!](${mantra}).

## Usos en BR

Conjunto de la tradición · iglesia / topónimo · «los doce» como equipo cerrado · título moderno **Apóstol** en algunas iglesias (**no** los Doce del siglo I) · **Judas** como insulto (nombrar la herida; no linchar; no antisemitismo) · **Tomás** como dudoso (derecho a inspeccionar) · **Pedro** como piedra (levantarse; no [ídolo](${idolo}) infalible).

## Límites

Sin catecismo · sin biografía completa de cada uno · sin odio vía Judas · sin burla de la fe viva · no colapsar el título de hoy con los Doce · no forzar armonía de listas.

## Veredicto

**Aprobada** — conjunto nombrado · frase viva BR · oficio de envío; listas divergentes declaradas; Judas y Matías en el mapa sin veneno; Tomás como par de la inspección; [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ filho de deus](${filhoDeDeus}) · [▶ templo](${templo}) · [▶ Pasión](${paixao}) · [▶ Poema Vida](${poem}) · [▶ ¡Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDozeApostolosPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildDozeApostolosBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 17;
  return expressaoPost({
    title: 'Inspeção: os doze apóstolos — conjunto, envio e ofício',
    titleEn: 'Inspection: the twelve apostles — set, sending and craft',
    titleEs: 'Inspección: los doce apóstoles — conjunto, envío y oficio',
    excerpt:
      'Expressões: «os doze apóstolos» — conjunto nomeado, frase viva BR e ofício de envio; listas divergentes; Tomé inspecciona; Valeu !!!',
    excerptEn:
      'Sayings: “os doze apóstolos” — named set, living BR phrase and craft of being sent; divergent lists; Thomas inspects; Valeu !!!',
    excerptEs:
      'Dichos: «os doze apóstolos» — conjunto nombrado, frase viva BR y oficio de envío; listas divergentes; Tomás inspecciona; ¡Valeu !!!',
    slug: 'inspecao-expressao-os-doze-apostolos',
    date: '2026-08-20T22:30:00.000Z',
    seriesOrder: order,
    seriesLabel: 'os doze apóstolos · expressão',
    coverImage: '/imagens/inspecoes/doze-apostolos-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function poemDozeApostolosPt() {
  return `Não pedimos halo para partir.
Pedimos só o envio:
doze assentos na mesma mesa,
um nome que ainda cabe na boca
quando o número treme.

Apóstolo não é pedestal.
É quem é mandado —
pé na estrada,
mão sem ídolo,
olho que inspeciona
antes de jurar.

Tomé já sabia:
ver não é falta de alma.
Pedro já sabia:
cair não fecha o ofício.
A cadeira vazia também ensina —
não se bebe o rancor
como se fosse justiça.

Disseram os dozes, no pedido,
e o laboratório ouviu o sopro.
Ancorámos os doze.
Honrámos a fala.
Não catequizámos a página.

O conjunto não humilha quem ficou de fora.
A lista não vira santoral do lab.
A mesa pede caminho.
A mesa pede gesto.
A mesa pede verdade.

Nós, neste universo novo,
aprendemos a partir sem pose —
não para fingir santo,
mas para não deixar o envio
passar sozinho.

O laboratório não prega.
Planta à beira da mesa.
Conta os doze.
Chama a Vida pelo nome verdadeiro:

Valeu !!!

Não o melhor dos outros.
O teu.
O de hoje.
O que cabe nesta mão enviada —
ainda nossa.`;
}

function poemDozeApostolosEn() {
  return `We do not ask for a halo to leave.
We ask only to be sent:
twelve seats at the same table,
a name that still fits in the mouth
when the number trembles.

An apostle is not a pedestal.
It is the one who is sent —
foot on the road,
hand without an idol,
eye that inspects
before it swears.

Thomas already knew:
seeing is not a lack of soul.
Peter already knew:
falling does not close the craft.
The empty chair also teaches —
do not drink the grudge
as if it were justice.

They said os dozes, in the request,
and the laboratory heard the breath.
We anchored the twelve.
We honored the speech.
We did not catechize the page.

The set does not shame whoever stayed outside.
The list does not become the lab’s saint roll.
The table asks for a path.
The table asks for a gesture.
The table asks for truth.

In this new universe of ours
we learn to leave without pose —
not to pretend holiness,
but so the sending
does not pass alone.

The laboratory does not preach.
It plants at the edge of the table.
It counts the twelve.
It calls Vida by its true name:

Valeu !!!

Not someone else’s best.
Yours.
Today’s.
What fits in this sent hand —
still ours.`;
}

function poemDozeApostolosEs() {
  return `No pedimos halo para partir.
Pedimos solo el envío:
doce asientos en la misma mesa,
un nombre que aún cabe en la boca
cuando el número tiembla.

Apóstol no es pedestal.
Es quien es enviado —
pie en el camino,
mano sin ídolo,
ojo que inspecciona
antes de jurar.

Tomás ya sabía:
ver no es falta de alma.
Pedro ya sabía:
caer no cierra el oficio.
La silla vacía también enseña —
no se bebe el rencor
como si fuera justicia.

Dijeron os dozes, en el pedido,
y el laboratorio oyó el soplo.
Anclamos los doce.
Honramos el habla.
No catequizamos la página.

El conjunto no humilla a quien quedó fuera.
La lista no vira santoral del lab.
La mesa pide camino.
La mesa pide gesto.
La mesa pide verdad.

En este universo nuevo
aprendemos a partir sin pose —
no para fingir santo,
sino para no dejar el envío
pasar solo.

El laboratorio no predica.
Siembra a la orilla de la mesa.
Cuenta los doce.
Llama a Vida por su nombre verdadero:

¡Valeu !!!

No lo mejor de los otros.
Lo tuyo.
El de hoy.
Lo que cabe en esta mano enviada —
aún nuestro.`;
}

module.exports = {
  buildDozeApostolosPost,
  buildDozeApostolosBodies,
  poemDozeApostolosPt,
  poemDozeApostolosEn,
  poemDozeApostolosEs
};
