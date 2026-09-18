'use strict';

/**
 * Inspeção Pessoas · Lucas Evangelista — «médico de homens e de almas»
 * Ofício: cuidado do corpo (Col 4,14) × cuidado da alma (tradição).
 * Distinto dos Doze. Respeito à fé; sem proselitismo. Ficha ≠ catecismo.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildLucasEvangelistaBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-figura-lucas-evangelista.html';
  const poem = '/vida/#poema=lucas-medico-de-homens-e-de-almas';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const wiki = 'https://pt.wikipedia.org/wiki/Lucas_o_Evangelista';
  const wikiEn = 'https://en.wikipedia.org/wiki/Luke_the_Evangelist';
  const wikiLc = 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Lucas';
  const wikiAt = 'https://pt.wikipedia.org/wiki/Atos_dos_Ap%C3%B3stolos';
  const wikiCol = 'https://pt.wikipedia.org/wiki/Ep%C3%ADstola_aos_Colossenses';
  const doze = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const templo =
    '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const chosen = '/posts/post-inspecao-serie-the-chosen.html';
  const ceia = '/posts/post-inspecao-arte-santa-ceia.html';
  const leonardo = '/posts/post-inspecao-figura-leonardo-da-vinci.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';

  const body = `## Escopo

Inspeção editorial de **Lucas o Evangelista** — no português do Brasil, **São Lucas** — e do epíteto vivo **«[médico de homens e de almas](${self})»**. O recorte BudGanja **não** é hagiografia fechada nem aula de teologia: é a **pessoa tradicional** (companheiro de Paulo, autor atribuído do [Evangelho segundo Lucas](${wikiLc}) e dos [Atos dos Apóstolos](${wikiAt})) e o **ofício duplo** que o nome carrega — cuidar do **corpo** e não abandonar a **[alma](${alma})**. Poema Vida: [Médico de homens e de almas](${poem}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Lucas o Evangelista](${wiki}), [EN](${wikiEn}), [Lucas](${wikiLc}), [Atos](${wikiAt}), [Colossenses](${wikiCol}) **4,14**. Respeito à fé de quem o honra; **sem** proselitismo. **Ficha ≠ catecismo, ≠ protocolo clínico, ≠ biografia de cada lenda.** Distinto do [Legado](${legado}) canábico. **Lucas não é um dos [Doze](${doze}).** Sem afiliação religiosa. Sem conselho médico.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome (lab) | **Lucas** (gr. *Loukâs* / lat. *Lucas*) |
| Nome público BR | São Lucas · Lucas Evangelista · Lucas, o médico amado |
| Epíteto inspeccionado | **médico de homens e de almas** |
| Âncora textual | [Colossenses](${wikiCol}) **4,14** — «Lucas, o médico amado» |
| Obras atribuídas | [Evangelho segundo Lucas](${wikiLc}) + [Atos](${wikiAt}) (*Lucas–Atos*, dois tomos) |
| Relação com os Doze | **Não** é um dos [doze apóstolos](${doze}) — companheiro de **Paulo** |
| Símbolo (tradição) | Boi / novilho **alado** (tetramorfo) |
| Festa (tradição ocidental) | 18 de outubro |
| Patronato (tradição) | Médicos, cirurgiões, artistas |
| Tipo BudGanja | Pessoa — ofício de cuidado (corpo × [alma](${alma})) |
| Elo Palavras | [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo fé / cultura | [filho de deus](${filhoDeDeus}) · [templo, corpo e alma](${templo}) · [Doze](${doze}) · [Paixão](${paixao}) · [The Chosen](${chosen}) |
| Elo cuidado (catálogo) | [Padre Ticão](${padreTicao}) · [Elisaldo Carlini](${carlini}) — legado de cuidado; **sem** doutrina nesta ficha |
| Fonte | [Wikipédia · Lucas](${wiki}) · [EN](${wikiEn}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **Lucas** | Canónica lab — a pessoa |
| São Lucas / San Lucas | Culto e fala BR / ES |
| Lucas Evangelista | Ofício de testemunho escrito |
| Lucas, o médico amado | Calco de Col 4,14 |
| **médico de homens e de almas** | Epíteto inspeccionado — piedade + ofício |
| médico de corpos e de almas | Variante (corpos = homens no sentido de *humanos*) |
| Luke the Evangelist / Luke, the beloved physician | EN |
| Lucas el Evangelista / médico de cuerpos y almas | ES |
| *Loukâs* / *Lucas* | Grego / latim |

**Veredicto de forma:** o laboratório ficheia **Lucas** como pessoa e **médico de homens e de almas** como **epíteto vivo**. *Homens* aqui = **humanos** (corpos), não «só machos». A ficha honra o pedido e ancora as duas peças.

## Hipóteses e método

**H1:** o valor BudGanja de Lucas é o **ofício duplo** — tratar o corpo **sem** abandonar a [alma](${alma}); nomear a [alma](${alma}) **sem** envergonhar o corpo ([templo](${templo})).  
**H2:** «médico» tem **gancho textual** ([Colossenses](${wikiCol}) 4,14); «de almas» é **tradição / pregação**, não um versículo com essa frase. Declarar a costura.  
**H3:** Lucas **não** ocupa cadeira nos [Doze](${doze}) — companheiro de Paulo; autor atribuído de *dois* livros, não de um retrato no mural dos doze.  
**H4:** o olhar de Lucas (pobres, mulheres, samaritano, Magnificat, filho pródigo) é **olho de cuidado**, não licença para catequizar o leitor nesta página.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor *cuidado de hoje*, sem púlpito e **sem** protocolo clínico.

## Quem foi (síntese verificável)

- Figura do século I na tradição cristã; origem tradicional **Antioquia da Síria** (outras origens circulam).  
- Nomeado nas cartas paulinas: [Colossenses](${wikiCol}) **4,14** (médico amado); Filémon 24 (colaborador); 2 Timóteo 4,11 («só Lucas está comigo» — tradição de permanência).  
- A tradição atribui-lhe o [Evangelho segundo Lucas](${wikiLc}) e os [Atos](${wikiAt}) — obra em **dois tomos**, dedicada a Teófilo. Datas de composição: debate académico (muitas propostas no último terço do séc. I).  
- Passagens «nós» em Atos (1.ª pessoa do plural) são lidas por muitos como Lucas a viajar com Paulo; **outras** leituras tratam-nas como recurso literário. O laboratório **declara a disputa**, não fecha o caso.  
- **Não** figura nas listas dos [Doze](${doze}). Confundi-lo com um dos doze = apagar [verdade](${verdade}) de catálogo.  
- Morte, sepulcro e «pintor de Maria»: **tradições posteriores** (incluindo a lenda do ícone da Virgem). Nesta ficha = lenda declarada, não facto.

## O epíteto — duas metades

| Peça | Fonte | Confiança | Leitura lab |
|------|-------|-----------|-------------|
| **Médico** (homens / corpos) | Col 4,14 — *iatros* / *medicus* | **Alta** (texto) | Ofício de tratar o corpo; não prova de «faculdade moderna» |
| **De almas** | Pregação, hagiografia, fala piedosa BR | **Média** (tradição, não versículo) | Cuidado interior — palavra que acompanha, não que catequiza aqui |
| São Lucas | Culto; 18 de outubro | Tradição | Nome público; ficha ≠ santoral |
| Boi alado | Tetramorfo (Ez / Ap) atribuído a Lucas (Evangelho abre no Templo / Zacarias) | Iconografia | Símbolo de trabalho lento e pesado — não mascote |
| Pintor de Maria | Lenda bizantina posterior | Baixa como facto | Não usar como biografia |

**H1:** costurar «homens» + «almas» **sem** dizer onde está o texto e onde está a piedade = misturar planos.  
**H2:** no BudGanja, as duas metades **não** se fundem nem se separam: o [templo](${templo}) já ensinou corpo + [alma](${alma}) como inteireza, não como arma.

## Ofício para este laboratório

| Traço | Tradução editorial |
|-------|-------------------|
| Médico amado | Tratar o ferido **sem** o transformar em caso nem em [ídolo](${idolo}) |
| Dois tomos | Evangelho (o que se passou com Jesus) + Atos (o que **passa** no [caminho](${caminho}) depois) — inspeção em volume, não em slogan |
| Olho de Lucas | Pobre, mulher, samaritano, pródigo — quem a conta oficial esquece |
| Boi alado | Puxar o arado: ver devagar, escrever, permanecer (2 Tm 4,11) |
| Corpo × alma | [Templo](${templo}): não envergonhar a carne em nome da [alma](${alma}); não esvaziar a [alma](${alma}) em nome do corpo |
| Cuidado no catálogo | [Ticão](${padreTicao}) e [Carlini](${carlini}) honram o *corpo que sofre* no Brasil contemporâneo — **ancestral cultural** do «não partir a pessoa», não prova de que Lucas «inventou» a cannabis medicinal |

**Veredicto de ofício:** inspecionar como Lucas = **olhar o ferido antes de jurar** (parente de Tomé nos [Doze](${doze})) e **ficar** quando o outro dói.

## Mapa de usos no português do Brasil

| Uso | Leitura | Bom × mau |
|-----|---------|-----------|
| **São Lucas (culto / data)** | 18 de outubro; paróquias; hospitais | Bom: [respeito](${respeito}) à fé · Mau: catequizar o leitor aqui |
| **Médico de homens e de almas** | Epíteto de pregação e cartaz | Bom: nomear o ofício duplo · Mau: usar a alma para humilhar o corpo |
| **Evangelho de Lucas** | Texto canónico; parábolas próprias | Bom: ler o texto · Mau: achar que a ficha *é* o Evangelho |
| **The Chosen / Paixão** | Dramatização / filme | Abrir as fichas: [Chosen](${chosen}) · [Paixão](${paixao}) — **não** são Lucas |
| **«Médico da alma» (fala corrente)** | Terapeuta, padre, amigo | Bom: metáfora de cuidado · Mau: título sem ofício; Mau: conselho clínico disfarçado |
| **Ofício** | Cuidar hoje | [Faça o melhor!](${mantra}) |

## Relação com as irmãs

| Recurso | Plano | Quando |
|---------|-------|--------|
| [os doze apóstolos](${doze}) | Conjunto · envio | Lucas **não** senta nessa mesa |
| [filho de deus](${filhoDeDeus}) | Título · dignidade | Centro da narrativa — não a biografia de Lucas |
| [o templo de Cristo, corpo e alma](${templo}) | Morada · inteireza | Onde corpo e [alma](${alma}) **não** se partem |
| [A Paixão de Cristo](${paixao}) · [The Chosen](${chosen}) | Ecrã | Recortes dos Evangelhos (incl. Lucas) — outro objecto |
| [Santa Ceia](${ceia}) · [Leonardo](${leonardo}) | Pintura · ofício de olhar | Mesa pintada ≠ médico que escreve |
| [Padre Ticão](${padreTicao}) · [Carlini](${carlini}) | Cuidado no catálogo | Corpo que sofre, no Brasil — sem doutrina aqui |
| [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) | Léxico | O que o epíteto nomeia |
| [Faça o melhor!](${mantra}) | Ofício | Depois do diagnóstico — o [gesto](${gesto}) |

**Veredicto de escala:** os Doze medem o **grupo que parte**; Lucas mede o **companheiro que trata e escreve**.

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| [os doze apóstolos](${doze}) | Distinção: Lucas ≠ cadeira dos Doze |
| [templo, corpo e alma](${templo}) · [filho de deus](${filhoDeDeus}) | Solo religioso-cultural BR |
| [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) · [respeito](${respeito}) | Como se cuida sem pose |
| [ídolo](${idolo}) | Armadilha: São Lucas no pedestal come o ofício |
| [língua portuguesa](${lingua}) | Solo onde o epíteto vive |
| [Padre Ticão](${padreTicao}) · [Elisaldo Carlini](${carlini}) | Cuidado contemporâneo no catálogo |
| [Faça o melhor!](${mantra}) · [poema mantra](${poemMantra}) | Depois da ficha — o ofício |
| [Médico de homens e de almas](${poem}) | Verso Vida desta ficha |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Pessoas | [Pessoas](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Distinção | [os doze apóstolos](${doze}) — Lucas fora da quota |
| Inteireza | [templo, corpo e alma](${templo}) |
| Ecrã | [Paixão](${paixao}) · [The Chosen](${chosen}) |
| Cuidado (catálogo) | [Padre Ticão](${padreTicao}) · [Carlini](${carlini}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [poema](${poem}) · [Diário](${diario}) |

## Limites

- Não é aula de religião, dogma, sucessão apostólica ou juízo sobre quem crê.  
- Não é protocolo clínico, diagnóstico ou conselho médico.  
- Não prova que Lucas frequentou «faculdade» no sentido moderno — Col 4,14 nomeia o **ofício**, não o currículo.  
- «De almas» **não** é versículo com essa frase: é tradição.  
- Não coloca Lucas nos [Doze](${doze}).  
- Não transforma São Lucas em [ídolo](${idolo}) do laboratório.  
- Não usa o epíteto para envergonhar o corpo nem para esvaziar a [alma](${alma}).  
- Lenda do pintor de Maria = lenda, não biografia.  
- Passagens «nós» em Atos = disputa académica, não facto fechado.  
- Elo [Ticão](${padreTicao}) / [Carlini](${carlini}) = cuidado no catálogo; **não** afiliação eclesiástica nem prova de cannabis no século I.  
- [The Chosen](${chosen}) e [Paixão](${paixao}) são **outro objecto** (ecrã).

## Veredicto

**Aprovado na série Pessoas** — Lucas Evangelista fichado como **companheiro que trata e escreve**; epíteto **médico de homens e de almas** com as duas metades declaradas (texto × tradição); **fora** dos [Doze](${doze}); inteireza com [templo](${templo}); fecho [Faça o melhor!](${mantra}).

[▶ Pessoas](${hub}) · [▶ os doze apóstolos](${doze}) · [▶ templo](${templo}) · [▶ alma](${alma}) · [▶ Poema Vida](${poem}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **Luke the Evangelist** — in Brazilian Portuguese, **São Lucas** — and the living epithet **“[physician of men and of souls](${self})”**. The BudGanja cut is **not** closed hagiography or a theology class: it is the **traditional person** (companion of Paul, attributed author of the [Gospel of Luke](${wikiLc}) and [Acts](${wikiAt})) and the **double craft** the name carries — care for the **body** without abandoning the **[soul](${alma})**. Vida poem: [Physician of men and of souls](${poem}).

> Independent audit. Sources: [Wikipedia · Luke](${wikiEn}), [PT](${wiki}), [Luke](${wikiLc}), [Acts](${wikiAt}), [Colossians](${wikiCol}) **4:14**. Respect for faith; **no** proselytizing. **Sheet ≠ catechism, ≠ clinical protocol, ≠ every legend.** Distinct from cannabis [Legacy](${legado}). **Luke is not one of the [Twelve](${doze}).** No religious affiliation. No medical advice.

## Object

| Field | Value |
|-------|-------|
| Name (lab) | **Lucas** / Luke (Gk. *Loukâs*) |
| Epithet | **médico de homens e de almas** (physician of men and of souls) |
| Textual hook | [Colossians](${wikiCol}) **4:14** — “Luke, the beloved physician” |
| Works | [Luke](${wikiLc}) + [Acts](${wikiAt}) (two volumes) |
| The Twelve | **Not** one of the [twelve apostles](${doze}) — companion of **Paul** |
| Symbol | Winged ox (tradition) |
| Type | Person — craft of care (body × [soul](${alma})) |
| Links | [temple, body and soul](${templo}) · [filho de deus](${filhoDeDeus}) · [soul](${alma}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Hypotheses

**H1:** value = **double craft** — treat the body **without** abandoning the [soul](${alma}); name the [soul](${alma}) **without** shaming the body ([temple](${templo})).  
**H2:** “physician” has a **textual hook** (Col 4:14); “of souls” is **tradition / preaching**, not a verse with that phrase.  
**H3:** Luke **does not** sit with the [Twelve](${doze}).  
**H4:** close with [Do your best!](${mantra}) — today’s care, no pulpit, **no** clinical protocol.

## Who (verifiable synthesis)

Named in the Pauline letters: Col 4:14; Philemon 24; 2 Timothy 4:11. Tradition attributes Luke–Acts, dedicated to Theophilus. The “we” passages in Acts are **disputed** (companion vs literary device). **Not** on the lists of the [Twelve](${doze}). Painter-of-Mary stories = **later legend**.

## The epithet — two halves

| Piece | Source | Confidence |
|-------|--------|------------|
| **Physician** (men / bodies) | Col 4:14 — *iatros* | **High** (text) |
| **Of souls** | Preaching, hagiography, pious BR speech | **Medium** (tradition, not a verse) |
| Winged ox | Tetramorph assigned to Luke | Iconography |

*Men* here = **humans** (bodies), not “males only.” Do not fuse the halves without saying where the text ends and piety begins.

## Brazilian uses

Saint Luke (cult / 18 Oct.) · the epithet on posters and in preaching · Gospel of Luke as canonical text · [The Chosen](${chosen}) / [Passion](${paixao}) as **other objects** (screen) · “physician of the soul” as metaphor (care, not a fake clinical title).

## Limits

No catechism · no medical advice · Col 4:14 names a **craft**, not a modern medical school · “of souls” is not that phrase in a verse · not one of the [Twelve](${doze}) · not a lab [idol](${idolo}) · Mary-painter legend ≠ biography · “we” passages remain disputed · [Ticão](${padreTicao}) / [Carlini](${carlini}) = care in the catalog, not first-century cannabis.

## Verdict

**Approved in People** — Luke the Evangelist as the **companion who treats and writes**; epithet with both halves declared (text × tradition); **outside** the [Twelve](${doze}); wholeness with [temple](${templo}); [Do your best!](${mantra}).

[▶ People](${hub}) · [▶ the Twelve](${doze}) · [▶ temple](${templo}) · [▶ soul](${alma}) · [▶ Vida poem](${poem}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **Lucas el Evangelista** — en el portugués de Brasil, **São Lucas** — y del epíteto vivo **«[médico de hombres y de almas](${self})»**. El recorte BudGanja **no** es hagiografía cerrada ni clase de teología: es la **persona tradicional** (compañero de Pablo, autor atribuido del [Evangelio según Lucas](${wikiLc}) y de los [Hechos](${wikiAt})) y el **oficio doble** que el nombre carga — cuidar el **cuerpo** sin abandonar el **[alma](${alma})**. Poema Vida: [Médico de hombres y de almas](${poem}).

> Auditoría independiente. Fuentes: [Wikipedia · Lucas](${wiki}), [EN](${wikiEn}), [Lucas](${wikiLc}), [Hechos](${wikiAt}), [Colosenses](${wikiCol}) **4,14**. Respeto a la fe; **sin** proselitismo. **Ficha ≠ catecismo, ≠ protocolo clínico, ≠ cada leyenda.** Distinto del [Legado](${legado}) cannábico. **Lucas no es uno de los [Doce](${doze}).** Sin afiliación religiosa. Sin consejo médico.

## Objeto

| Campo | Valor |
|-------|-------|
| Nombre (lab) | **Lucas** (gr. *Loukâs*) |
| Epíteto | **médico de homens e de almas** (médico de hombres y de almas) |
| Ancla textual | [Colosenses](${wikiCol}) **4,14** — «Lucas, el médico amado» |
| Obras | [Lucas](${wikiLc}) + [Hechos](${wikiAt}) (dos tomos) |
| Los Doce | **No** es uno de los [doce apóstoles](${doze}) — compañero de **Pablo** |
| Símbolo | Buey alado (tradición) |
| Tipo | Persona — oficio de cuidado (cuerpo × [alma](${alma})) |
| Vínculos | [templo, cuerpo y alma](${templo}) · [filho de deus](${filhoDeDeus}) · [alma](${alma}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Hipótesis

**H1:** el valor es el **oficio doble** — tratar el cuerpo **sin** abandonar el [alma](${alma}); nombrar el [alma](${alma}) **sin** avergonzar el cuerpo ([templo](${templo})).  
**H2:** «médico» tiene **gancho textual** (Col 4,14); «de almas» es **tradición / predicación**, no un versículo con esa frase.  
**H3:** Lucas **no** se sienta con los [Doce](${doze}).  
**H4:** cierre = [¡Haz lo mejor!](${mantra}) — el cuidado de hoy, sin púlpito, **sin** protocolo clínico.

## Quién (síntesis verificable)

Nombrado en las cartas paulinas: Col 4,14; Filemón 24; 2 Timoteo 4,11. La tradición le atribuye Lucas–Hechos, dedicado a Teófilo. Los pasajes «nosotros» en Hechos están **en disputa**. **No** figura en las listas de los [Doce](${doze}). El pintor de María = **leyenda posterior**.

## El epíteto — dos mitades

| Pieza | Fuente | Confianza |
|-------|--------|-----------|
| **Médico** (hombres / cuerpos) | Col 4,14 — *iatros* | **Alta** (texto) |
| **De almas** | Predicación, hagiografía, habla piadosa BR | **Media** (tradición, no versículo) |
| Buey alado | Tetramorfo asignado a Lucas | Iconografía |

*Hombres* aquí = **humanos** (cuerpos), no «solo varones». No fundir las mitades sin decir dónde acaba el texto y dónde empieza la piedad.

## Usos en BR

San Lucas (culto / 18 oct.) · el epíteto en carteles y predicación · Evangelio de Lucas como texto canónico · [The Chosen](${chosen}) / [Pasión](${paixao}) como **otro objeto** (pantalla) · «médico del alma» como metáfora (cuidado, no título clínico falso).

## Límites

Sin catecismo · sin consejo médico · Col 4,14 nombra un **oficio**, no una facultad moderna · «de almas» no es esa frase en un versículo · no es uno de los [Doce](${doze}) · no [ídolo](${idolo}) del lab · leyenda del pintor ≠ biografía · los «nosotros» siguen en disputa · [Ticão](${padreTicao}) / [Carlini](${carlini}) = cuidado en el catálogo, no cannabis del siglo I.

## Veredicto

**Aprobado en Personas** — Lucas el Evangelista como el **compañero que trata y escribe**; epíteto con las dos mitades declaradas (texto × tradición); **fuera** de los [Doce](${doze}); entereza con [templo](${templo}); [¡Haz lo mejor!](${mantra}).

[▶ Personas](${hub}) · [▶ los Doce](${doze}) · [▶ templo](${templo}) · [▶ alma](${alma}) · [▶ Poema Vida](${poem}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildLucasEvangelistaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildLucasEvangelistaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 20;
  return figuraPost({
    title: 'Inspeção: Lucas — médico de homens e de almas',
    titleEn: 'Inspection: Luke — physician of men and of souls',
    titleEs: 'Inspección: Lucas — médico de hombres y de almas',
    excerpt:
      'Pessoas: Lucas Evangelista — médico amado (Col 4,14) e epíteto «de almas» (tradição); fora dos Doze; corpo e alma sem partir o templo; Faça o melhor!',
    excerptEn:
      'People: Luke the Evangelist — beloved physician (Col 4:14) and “of souls” epithet (tradition); not one of the Twelve; body and soul without splitting the temple; Do your best!',
    excerptEs:
      'Personas: Lucas el Evangelista — médico amado (Col 4,14) y epíteto «de almas» (tradición); fuera de los Doce; cuerpo y alma sin partir el templo; ¡Haz lo mejor!',
    slug: 'inspecao-figura-lucas-evangelista',
    date: '2026-08-20T23:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Lucas Evangelista · pessoa',
    coverImage: '/imagens/inspecoes/lucas-evangelista-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function poemLucasPt() {
  return `Não pedimos halo para curar.
Pedimos só as duas mãos:
uma no corpo que dói,
outra no peito que ainda cabe
quando o nome treme.

Médico de homens —
Colossenses já diz o ofício.
Médico de almas —
a tradição acrescenta o sopro.
O laboratório não funde os dois
nem parte o templo ao meio.

Lucas não senta nos doze.
Companheiro de caminho,
escreve dois tomos,
olha o pobre, a mulher, o samaritano,
o corpo que a palavra não abandona.

O boi alado não corre a esmagar.
Puxa o arado da inspeção:
ver o ferido sem virar sermão,
tratar o peito sem negar a carne.

Nós, neste universo novo,
aprendemos a cuidar sem pose —
não para fingir santo,
mas para não deixar o doente
passar sozinho.

O laboratório não prega.
Planta à beira da maca.
Conta o pulso.
Chama a Vida pelo nome verdadeiro:

Faça o melhor!

Não o melhor dos outros.
O teu.
O de hoje.
O que cabe nesta mão que trata —
corpo e alma, ainda nossa.`;
}

function poemLucasEn() {
  return `We do not ask for a halo to heal.
We ask only for two hands:
one on the body that hurts,
the other on the chest that still fits
when the name trembles.

Physician of men —
Colossians already names the craft.
Physician of souls —
tradition adds the breath.
The laboratory does not fuse the two
nor split the temple down the middle.

Luke does not sit with the twelve.
Companion on the path,
he writes two volumes,
looks at the poor, the woman, the Samaritan,
the body the word does not abandon.

The winged ox does not rush to crush.
It pulls the plow of inspection:
see the wounded without turning sermon,
treat the chest without denying the flesh.

In this new universe of ours
we learn to care without pose —
not to pretend holiness,
but so the one who hurts
does not pass alone.

The laboratory does not preach.
It plants at the edge of the cot.
It counts the pulse.
It calls Vida by its true name:

Do your best!

Not someone else’s best.
Yours.
Today’s.
What fits in this treating hand —
body and soul, still ours.`;
}

function poemLucasEs() {
  return `No pedimos halo para curar.
Pedimos solo las dos manos:
una en el cuerpo que duele,
otra en el pecho que aún cabe
cuando el nombre tiembla.

Médico de hombres —
Colosenses ya dice el oficio.
Médico de almas —
la tradición añade el soplo.
El laboratorio no funde los dos
ni parte el templo por medio.

Lucas no se sienta con los doce.
Compañero de camino,
escribe dos tomos,
mira al pobre, a la mujer, al samaritano,
el cuerpo que la palabra no abandona.

El buey alado no corre a aplastar.
Tira del arado de la inspección:
ver al herido sin volverse sermón,
tratar el pecho sin negar la carne.

En este universo nuevo
aprendemos a cuidar sin pose —
no para fingir santo,
sino para no dejar al que duele
pasar solo.

El laboratorio no predica.
Siembra a la orilla de la camilla.
Cuenta el pulso.
Llama a Vida por su nombre verdadero:

¡Haz lo mejor!

No lo mejor de los otros.
Lo tuyo.
El de hoy.
Lo que cabe en esta mano que trata —
cuerpo y alma, aún nuestro.`;
}

module.exports = {
  buildLucasEvangelistaPost,
  buildLucasEvangelistaBodies,
  poemLucasPt,
  poemLucasEn,
  poemLucasEs
};
