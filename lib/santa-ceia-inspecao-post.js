'use strict';

/**
 * Artes · pintura mural «A Última Ceia» / Santa Ceia (Leonardo da Vinci, 1495–1498).
 * Obra primeiro; autor em Pessoas. Génese: Evangelhos; o mural é recorte de um instante.
 * Sem catecismo. Sem Código Da Vinci como história da arte.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

const YT_ID = 'XCg7o4onjxs';

function buildSantaCeiaBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/A_%C3%9Altima_Ceia_%28Leonardo_da_Vinci%29';
  const wikiEn = 'https://en.wikipedia.org/wiki/The_Last_Supper_%28Leonardo%29';
  const wikiIt = 'https://it.wikipedia.org/wiki/Ultima_Cena_%28Leonardo%29';
  const smart = 'https://smarthistory.org/leonardo-last-supper/';
  const yt = 'https://www.youtube.com/watch?v=' + YT_ID;
  const commons =
    'https://commons.wikimedia.org/wiki/File:%C3%9Altima_Cena_-_Da_Vinci_5.jpg';
  const leonardo = '/posts/post-inspecao-figura-leonardo-da-vinci.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const filho = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const templo =
    '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const esperanca = '/posts/post-inspecao-palavra-esperanca.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const alquimista = '/posts/post-inspecao-arte-o-alquimista.html';
  const doze = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const chosen = '/posts/post-inspecao-serie-the-chosen.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da pintura mural **«A Última Ceia»** — em italiano *L'Ultima Cena*; em inglês *The Last Supper*; na fala brasileira, **Santa Ceia**. Obra de **[Leonardo da Vinci](${leonardo})** (**1495–1498**), no refeitório do convento de **Santa Maria delle Grazie**, Milão. O **início de tudo** é o **texto canónico**: a ceia nos Evangelhos. O mural é **recorte de um instante** — o anúncio da traição e o [gesto](${gesto}) de cada um à mesa — não o Evangelho, não a liturgia, não catecismo.

O pedido do laboratório chegou em oralidade **«santa ceia leonardp davint»** → forma canónica **Santa Ceia / A Última Ceia · Leonardo da Vinci**. A ficha honra o nome vivo (**Santa Ceia**) e ancora o título de catálogo (**A Última Ceia**). A biografia do autor fica em [Leonardo da Vinci](${leonardo}) (série Pessoas).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · A Última Ceia](${wiki}), [Wikipedia (EN)](${wikiEn}), [IT](${wikiIt}), [Smarthistory](${smart}), conversa Harris/Zucker (${yt}). Crédito: Leonardo / convento dominicanos / Santa Maria delle Grazie — **domínio público** (autor falecido em 1519). Sem afiliação com a Diocese de Milão, UNESCO ou museus. Distinto do [Legado](${legado}) canábico. **Pintura ≠ sacramento ≠ homilia.** Sem proselitismo. *The Da Vinci Code* (2003) é **ficção de recepção** — não história da arte.

Par cultural em Artes: [A Paixão de Cristo](${paixao}) — outro recorte dos Evangelhos (filme 2004; a ceia entra lá como *flashback*). [The Chosen](${chosen}) — série do ministério (2019–); a 5.ª temporada chega à ceia **no ecrã**, não a esta parede. Par metodológico «obra primeiro»: [O Alquimista](${alquimista}). O conjunto à mesa: [os doze apóstolos](${doze}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título canónico PT | **A Última Ceia** |
| Nome vivo BR | **Santa Ceia** (liturgia / fala; nesta ficha = a pintura) |
| Título original | *L'Ultima Cena* (IT) · *The Last Supper* (EN) |
| Autor | [Leonardo da Vinci](${leonardo}) — ofício em Pessoas |
| Datas | **c. 1495–1498** (encomenda de Ludovico Sforza) |
| Lugar | Refeitório, **Santa Maria delle Grazie**, Milão |
| Medidas | ~**460 × 880 cm** (mural de parede, não cavalete) |
| Técnica | Têmpera e óleo sobre gesso seco — **não** *buon fresco* |
| Instante | Anúncio «um de vós me há-de trair» (João 13,21 e sinópticos) |
| Figuras | Cristo + **doze** apóstolos, em **quatro grupos de três** |
| Tipo BudGanja | Arte — **obra primeiro**; autor em Pessoas; génese nos Evangelhos |
| Elo Pessoas | [Leonardo da Vinci](${leonardo}) |
| Elo Palavras | [gesto](${gesto}) · [criatividade](${criatividade}) · [skill](${skill}) · [pattern](${pattern}) · [verdade](${verdade}) · [respeito](${respeito}) · [caminho](${caminho}) · [coração](${coracao}) · [alma](${alma}) |
| Elo Expressões | [filho de deus](${filho}) · [templo de Cristo, corpo e alma](${templo}) · [jesusamado](${jesusamado}) · [os doze apóstolos](${doze}) · [Valeu !!!](${mantra}) |
| Ficha irmã (separada) | [A Paixão de Cristo](${paixao}) · [The Chosen](${chosen}) — outros recortes, outros séculos |
| Fonte | [Wikipédia](${wiki}) · [EN](${wikiEn}) · [Smarthistory](${smart}) · [Commons](${commons}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa nos **Evangelhos**; Leonardo **escolhe um recorte** — o segundo depois da frase, quando a mesa inteira reage.  
**H2:** **Santa Ceia** (sacramento / fala BR) e **A Última Ceia** (título de catálogo) convivem; a ficha inspecciona a **pintura**, não administra a eucaristia.  
**H3:** a técnica a seco é [criatividade](${criatividade}) com custo — o mural começou a degradar cedo; conservar ≠ «inventar o original».  
**H4:** o [gesto](${gesto}) é o texto visível — Judas à mesma mesa, João jovem, Pedro com a faca, Tomé com o dedo.  
**H5:** o ponto de fuga na têmpora direita de Cristo é [pattern](${pattern}) de ofício — matemática ao serviço do instante, não adorno.  
**H6:** *The Da Vinci Code* é recepção popular; a história da arte lê **João**, não Madalena. O laboratório **documenta** a lenda e **não** a adopta.  
**H7:** fecho = [Valeu !!!](${mantra}) — olhar até o [gesto](${gesto}) falar, como Leonardo pediu ao ofício.

Passos:

1. Fixar génese (Evangelhos) e objecto (mural 1495–1498).  
2. Separar sacramento, pintura e romance.  
3. Ligar Pessoas só por referência ([Leonardo](${leonardo})).  
4. Status + limites (fé, conservação, Código).

## O início de tudo — o texto

A ceia aparece nos quatro Evangelhos. O laboratório **não** inspecciona a Bíblia inteira nesta ficha: inspecciona o **mural** que parte desse texto. O instante de Leonardo é sobretudo o de **João 13,21** — «um de vós me há-de trair» — e a tempestade de [gestos](${gesto}) que se segue. Pão e vinho estão na mesa (eco eucarístico); o drama do pintor é **psicológico**, não litúrgico.

Ludovico Sforza encomenda. O refeitório é a sala onde os dominicanos comiam em silêncio — várias vezes ao dia, a mesa dos frades olhava a mesa de Cristo. Arquitectura real e arquitectura pintada conversam: o [caminho](${caminho}) da perspectiva puxa o olhar para o centro.

## A obra de 1495–1498

Milão, parede norte do refeitório. ~4,6 × 8,8 m. Leonardo recusa o fresco clássico (pigmento na cal ainda húmida) para poder **trabalhar devagar** — velaturas, correcções, estudo de mãos e rostos. Pinta a seco (têmpera e óleo sobre preparação). A tinta não agarra como o fresco: o mural entrou em ruína cedo. Isso **não** é falha moral; é o preço de um [skill](${skill}) que quis tempo.

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **c. 1495–1498** | Execução em Milão, sob Sforza. |
| Técnica a seco | Tempo para inspeccionar o [gesto](${gesto}) — e fragilidade. |
| Sem auréolas | A janela central enquadra a cabeça de Cristo — halo **arquitectónico**. |
| Judas na mesa | Quebra da tradição que o isolava do lado de cá. |
| Quatro ternários | Doze + um: ordem sem rigidez; cada trio tem tempestade própria. |
| Ponto de fuga | Têmpora direita de Cristo — [pattern](${pattern}) que segura a sala. |
| **1943** | Bomba no refeitório; a parede, ensacada, sobrevive. |
| **1978–1999** | Restauro Pinin Brambilla Barcilon — **conservar o que resta**, não «repintar Leonardo». |
| Cópias antigas | Giampietrino e outras — **memória** do estado primeiro; não substituem o mural. |

> **Hierarquia BudGanja:** sem o mural de Milão não há «Santa Ceia» cultural inspeccionada aqui. O autor tem ficha própria em Pessoas. O filme [A Paixão de Cristo](${paixao}) tem ficha **própria**.

## A mesa — quem está, o que faz

Identificação corrente (esquerda → direita do espectador). O laboratório **não** canoniza cada lenda de objecto (saleiro, saco); regista o que a história da arte sustenta.

| Grupo | Figuras | Leitura de ofício |
|-------|---------|-------------------|
| 1 (esq.) | Bartolomeu · Tiago Menor · André | Espanto que se levanta da mesa |
| 2 | **Judas** · Pedro · João | Traição, protecção, recosto jovem — **João ≠ Madalena** |
| Centro | **Cristo** | Calma; mãos abertas ao pão e ao vinho; o [coração](${coracao}) da composição |
| 3 | Tomé · Tiago Maior · Filipe | Dedo de Tomé (eco da dúvida futura); pergunta de Filipe |
| 4 (dir.) | Mateus · Tadeu · Simão | Debate que se afasta e regressa |

Judas: mesmo lado da mesa, recuo, sombra, mão junto ao prato — [verdade](${verdade}) do recorte, não caricatura de um povo. Pedro: faca (eco de Getsémani). João: o discípulo amado, jovem, inclinando-se — leitura de oficina, não de romance.

## Tese cultural BudGanja

Leonardo inspecciona o **instante em que a mesa parte**. Cada corpo diz o que a boca ainda não organizou. O laboratório lê isso como ofício: [gesto](${gesto}) primeiro; doutrina depois, se houver; e nesta ficha **não** há doutrina.

| Tema no mural | Tradução editorial |
|---------------|-------------------|
| Anúncio da traição | A [verdade](${verdade}) dita à mesa — inspeção, não espectáculo de culpa |
| [Gesto](${gesto}) | O texto visível; cada mão é uma frase |
| Perspectiva | [Pattern](${pattern}) que não esmaga o humano — a sala serve o instante |
| Sem auréola pintada | Luz e arquitectura em vez de atributo colado |
| Judas entre os doze | [Respeito](${respeito}): o traidor **pertence** à mesa; não é um povo |
| Técnica a seco | [Criatividade](${criatividade}) que aceita o risco de não durar |
| Restauro | Cuidar o que resta — [Valeu !!!](${mantra}) de conservação, não de invenção |
| [Filho de Deus](${filho}) | Título teológico já fichado; aqui o mural é adaptação |
| Santa Ceia (fala) | Nome vivo — **≠** administrar o sacramento nesta página |
| *Da Vinci Code* | Recepção; **não** método |

O laboratório **não** evangeliza nem «desmente» a fé. Usa a ficha para **separar Evangelho, mural, liturgia e romance**.

## Elos

| Recurso | Papel |
|---------|-------|
| [Leonardo da Vinci](${leonardo}) | Autor — ofício de olhar, desenhar, ensaiar (Pessoas) |
| [A Paixão de Cristo](${paixao}) | **Ficha separada** — outro recorte dos Evangelhos |
| [The Chosen](${chosen}) | **Ficha separada** — série 2019–; a ceia no ecrã ≠ este mural |
| [os doze apóstolos](${doze}) | O conjunto nomeado — aqui são **doze gestos** na mesma mesa |
| [filho de deus](${filho}) · [templo…](${templo}) · [jesusamado](${jesusamado}) | Expressões — respeito à fé; sem púlpito nesta ficha |
| [gesto](${gesto}) · [criatividade](${criatividade}) · [skill](${skill}) · [pattern](${pattern}) | Léxico do ofício da parede |
| [verdade](${verdade}) · [respeito](${respeito}) · [caminho](${caminho}) | Instante, mesa, perspectiva |
| [coração](${coracao}) · [alma](${alma}) · [esperança](${esperanca}) · [vida](${vidaPalavra}) | Léxico da ceia sem virar sermão |
| [O Alquimista](${alquimista}) | Outra **obra primeiro** (livro; autor em Pessoas) |
| [Valeu !!!](${mantra}) | Olhar até o gesto falar — o melhor *desta* parede *neste* ofício |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Vida](${vida}) | Separar obra, autor e chão |

> Abrir esta ficha para **a pintura**. Abrir [Leonardo da Vinci](${leonardo}) para o **homem e o ofício**. Abrir [A Paixão de Cristo](${paixao}) para o **filme de 2004**. Não fundir os três.

## Vídeo de referência (embed)

Smarthistory — conversa de Beth Harris e Steven Zucker **no refeitório** — @youtube ${YT_ID}

| Campo | Valor |
|-------|-------|
| Título | Leonardo and the Last Supper (Smarthistory) |
| ID | \`${YT_ID}\` |
| URL | [${yt}](${yt}) |
| Ficha escrita | [smarthistory.org/leonardo-last-supper](${smart}) |
| Nota | Embed **educativo**; a génese é o texto canónico; o objecto é o mural |

## Limites

- Não é catecismo, missa nem tratado de teologia.  
- Santa Ceia (sacramento) ≠ Santa Ceia (esta pintura).  
- João no mural **não** é Maria Madalena; o romance de 2003 é recepção.  
- Conservação: o que se vê hoje é mural + tempo + restauro — **não** o estado de 1498.  
- Judas ≠ um povo.  
- Sem vida privada inventada (Leonardo).  
- Distinto do [Legado](${legado}) canábico.  
- **Não** é ficha de [A Paixão de Cristo](${paixao}).  
- Obra em domínio público — a **fotografia** de restauro tem crédito de arquivo; não se reproduz o mural inteiro como poster comercial nesta ficha.

## Status

**Aprovado na série Artes (ficha própria)** — *A Última Ceia* / **Santa Ceia** (1495–1498). Evangelhos primeiro; mural como recorte creditado; técnica a seco declarada; João ≠ Madalena; autor em [Leonardo da Vinci](${leonardo}).

[▶ Artes](${hub}) · [▶ Leonardo da Vinci](${leonardo}) · [▶ A Paixão de Cristo (outra ficha)](${paixao}) · [▶ The Chosen](${chosen}) · [▶ os doze apóstolos](${doze}) · [▶ gesto](${gesto}) · [▶ Valeu !!!](${mantra}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Inspection of **The Last Supper** (*A Última Ceia*; spoken BR: **Santa Ceia**) — mural by **[Leonardo da Vinci](${leonardo})** (c. **1495–1498**), refectory of **Santa Maria delle Grazie**, Milan. Origin: the **canonical Gospels**. The painting is a **cut of one instant** — the betrayal announcement and the table’s [gesture](${gesto}) — not Scripture, not liturgy, not catechism.

The lab request arrived as oral **«santa ceia leonardp davint»** → canonical **The Last Supper · Leonardo da Vinci**. Biography: [Leonardo da Vinci](${leonardo}) (People).

> **Method note:** [Wikipedia](${wikiEn}) · [PT](${wiki}) · [Smarthistory](${smart}) (${yt}). Public domain (d. 1519). No affiliation. **Painting ≠ sacrament ≠ homily.** *The Da Vinci Code* (2003) is **reception fiction**, not art history. Distinct from cannabis [Legacy](${legado}). No proselytism.

Sister Arts sheet: [The Passion of the Christ](${paixao}) — another Gospel cut (2004 film). Method pair: [The Alchemist](${alquimista}) (work first).

## Inspected object

| Field | Value |
|-------|-------|
| Titles | **The Last Supper** · *L'Ultima Cena* · PT *A Última Ceia* · spoken BR **Santa Ceia** |
| Author | [Leonardo da Vinci](${leonardo}) |
| Dates / place | **c. 1495–1498** · Santa Maria delle Grazie, Milan |
| Size / technique | ~460 × 880 cm · tempera and oil on dry plaster (**not** buon fresco) |
| Instant | “One of you will betray me” (John 13:21 and synoptics) |
| BudGanja type | Art — **work first**; author in People; Gospels as genesis |
| Date | ${inspected} |

## Hypotheses

**H1:** value starts in the **Gospels**; Leonardo chooses the **second after the sentence**.  
**H2:** spoken **Santa Ceia** (sacrament) and catalogue **Last Supper** coexist; this sheet inspects the **wall**.  
**H3:** the dry technique buys time for [gesture](${gesto}) and pays in decay.  
**H4:** vanishing point at Christ’s right temple is [pattern](${pattern}), not ornament.  
**H5:** the beloved disciple is **John**, not Magdalene.  
**H6:** close with [Valeu !!!](${mantra}) — look until the gesture speaks.

## The table (left → right)

Bartholomew, James the Less, Andrew | **Judas**, Peter, John | **Christ** | Thomas, James the Greater, Philip | Matthew, Thaddeus, Simon.

Judas sits **with** the Twelve (break from the isolated-Judas tradition). No painted halo: the central window frames the head. Peter’s knife, Thomas’s finger, John’s youthful recline — workshop reading, not a novel.

## Lab thesis

| Theme | Gloss |
|-------|-------|
| Betrayal announcement | [Truth](${verdade}) at the table — inspection, not a blame show |
| [Gesture](${gesto}) | Visible text; each hand is a sentence |
| Perspective | [Pattern](${pattern}) that serves the instant |
| Dry technique | [Creativity](${criatividade}) that accepts not lasting |
| Restoration 1978–1999 | Care for what remains — not “repaint Leonardo” |
| *Da Vinci Code* | Reception; **not** method |

1943 bombing: the refectory fell; the sandbagged wall survived. What we see now is mural + time + conservation.

## Status

**Approved in Arts as its own sheet** — Gospels first; 1495–1498 mural as credited cut; John ≠ Magdalene; author in [Leonardo da Vinci](${leonardo}).

[▶ Leonardo](${leonardo}) · [▶ Passion (separate)](${paixao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **La última cena** (*A Última Ceia*; habla BR: **Santa Ceia**) — mural de **[Leonardo da Vinci](${leonardo})** (c. **1495–1498**), refectorio de **Santa Maria delle Grazie**, Milán. Origen: los **Evangelios canónicos**. La pintura es un **recorte de un instante** — el anuncio de la traición y el [gesto](${gesto}) de la mesa — no el texto, no la liturgia, no un catecismo.

El pedido llegó en oralidad **«santa ceia leonardp davint»** → forma canónica **La última cena · Leonardo da Vinci**. Biografía: [Leonardo da Vinci](${leonardo}) (Personas).

> **Nota metodológica:** [Wikipedia](${wikiEn}) · [PT](${wiki}) · [Smarthistory](${smart}). Dominio público (m. 1519). **Pintura ≠ sacramento ≠ homilía.** *The Da Vinci Code* (2003) es **ficción de recepción**. Sin proselitismo.

Ficha hermana: [A Paixão de Cristo](${paixao}). Par de método: [O Alquimista](${alquimista}).

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Títulos | **La última cena** · *L'Ultima Cena* · PT *A Última Ceia* · habla BR **Santa Ceia** |
| Autor | [Leonardo da Vinci](${leonardo}) |
| Fechas / lugar | **c. 1495–1498** · Santa Maria delle Grazie, Milán |
| Técnica | Témpera y óleo sobre yeso seco — **no** *buon fresco* |
| Instante | «Uno de vosotros me va a entregar» (Juan 13,21) |
| Tipo BudGanja | Arte — **obra primero**; autor en Personas |
| Fecha | ${inspected} |

## Hipótesis

**H1:** el valor empieza en los **Evangelios**; Leonardo elige el segundo después de la frase.  
**H2:** **Santa Ceia** (sacramento) y **Última Cena** (catálogo) conviven; esta ficha inspecciona el **muro**.  
**H3:** la técnica en seco compra tiempo para el [gesto](${gesto}) y paga en ruina.  
**H4:** el discípulo amado es **Juan**, no Magdalena.  
**H5:** cierre = [¡Valeu !!!](${mantra}).

## La mesa (izq. → der.)

Bartolomé, Santiago el Menor, Andrés | **Judas**, Pedro, Juan | **Cristo** | Tomás, Santiago el Mayor, Felipe | Mateo, Tadeo, Simón.

Judas **en** la mesa. Sin aureola pintada: la ventana central enmarca la cabeza. *The Da Vinci Code* no es método.

## Estado

**Aprobada en Artes (ficha propia)** — Evangelios primero; mural 1495–1498; Juan ≠ Magdalena; autor en [Leonardo da Vinci](${leonardo}).

[▶ Leonardo](${leonardo}) · [▶ Pasión (otra)](${paixao}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSantaCeiaPost() {
  const { body, contentEn, contentEs, wiki } = buildSantaCeiaBodies();
  return artePost({
    title:
      'Inspeção: Santa Ceia — A Última Ceia de Leonardo da Vinci',
    titleEn:
      'Inspection: The Last Supper — Leonardo da Vinci’s mural in Milan',
    titleEs:
      'Inspección: La última cena — el mural de Leonardo da Vinci en Milán',
    excerpt:
      'Artes · pintura: Santa Ceia / A Última Ceia (1495–1498, Leonardo) — Evangelhos primeiro; mural ≠ sacramento ≠ Código Da Vinci. Autor em Pessoas. Valeu !!!',
    excerptEn:
      'Arts · painting: The Last Supper (1495–1498, Leonardo) — Gospels first; mural ≠ sacrament ≠ Da Vinci Code. Author in People. Valeu !!!',
    excerptEs:
      'Artes · pintura: La última cena (1495–1498, Leonardo) — Evangelios primero; mural ≠ sacramento ≠ Código Da Vinci. Autor en Personas. ¡Valeu !!!',
    slug: 'inspecao-arte-santa-ceia',
    date: '2026-08-20T22:30:00.000Z',
    seriesOrder: 64,
    seriesLabel: 'Santa Ceia · Artes',
    coverImage: 'imagens/inspecoes/santa-ceia-cover.jpg',
    sourceUrl: wiki,
    videoId: YT_ID,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSantaCeiaPost,
  buildSantaCeiaBodies,
  YT_ID
};
