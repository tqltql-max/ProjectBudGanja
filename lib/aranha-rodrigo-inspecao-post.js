'use strict';

/**
 * Inspeção Animais · Aranha Rodrigo — saltadora nomeada no Slivki Show.
 * Aranha ≠ inseto. Ser ≠ canal.
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
    series: opts.series || 'animais-catalogo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Aranha Rodrigo · Animais',
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

function buildAranhaRodrigoBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-animais';
  const canal = '/posts/post-inspecao-canal-slivki.html';
  const videos = '/videos/?channel=slivki&series=rodrigo';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const animais = '/animais/';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const abelha = '/posts/post-inspecao-animal-abelha.html';
  const rasmussen = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Salticidae';
  const wikiEn = 'https://en.wikipedia.org/wiki/Jumping_spider';
  const origin = 'https://www.youtube.com/watch?v=fLiiQ71CW5I';
  const destaque = 'https://www.youtube.com/watch?v=VEWy9VgN1cU';
  const muda = 'https://www.youtube.com/watch?v=mveQcKNw32I';
  const espelho = 'https://www.youtube.com/watch?v=OhEmVvedf6I';
  const seedId = 'VEWy9VgN1cU';

  const body = `## Escopo

Inspeção editorial da **Aranha Rodrigo** — saltadora (**Salticidae**) com **nome próprio** no canal [Slivki Show](${canal}) (@slivkishowen). Esta ficha é o **destaque** da inspeção [especial](${especial}) desse arquivo: o ser, não o gadget. **Aranha ≠ [inseto](${inseto}).** Ser ≠ canal.

> **Nota metodológica:** auditoria independente. Fontes: [Salticidae (PT)](${wiki}), [Jumping spider (EN)](${wikiEn}), série pública no YouTube ([origem](${origin}), [muda](${muda}), [espelho](${espelho}), [destaque](${destaque})). Crédito: Slivki Show — **sem afiliação**. **Não é** protocolo de terrário, manual de maneio nem paper de cognição. A espécie exacta **não** está no título EN; a família (saltadora) lê-se no ofício de ecrã (salto, visão frontal, caça à espera). Catalogar ≠ endosso do palco *vs*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome no ecrã | **Rodrigo** (EN: *Rodrigo the spider*) |
| Classe | **Aranha** (Araneae) — **não** [inseto](${inseto}) |
| Família (leitura) | **Salticidae** — aranha-saltadora / *jumping spider* — confiança: **alta** no tipo; espécie: **não nomeada** nos títulos EN |
| Distinção rápida | 8 patas · 2 tagmas · quelíceras · **sem** antenas (inseto: 6 patas, 3 tagmas, antenas) |
| Ofício no ecrã | Observação macro: encontro, muda, espelho, caça a [insetos](${inseto}) do bosque |
| Canal | [Slivki Show · @slivkishowen](${canal}) |
| Hub | [Vídeos · Rodrigo](${videos}) |
| Tipo BudGanja | Animal — **ser nomeado** · destaque da inspeção especial do canal |
| Elo Palavras | [animal](${animal}) · [inseto](${inseto}) (contraste) · [respeito](${respeito}) · [risco](${risco}) · [verdade](${verdade}) · [especial](${especial}) |
| Elo seres | [Abelha](${abelha}) · [Joaninha Joana](${joaninha}) (conto; outro contrato) · hub [Animais](${animais}) |
| Data | ${inspected} |

**O que é o objeto:** uma **saltadora individual** a quem o canal deu nome. O nome não muda a biologia; muda o [respeito](${respeito}) do olhar — deixa de ser «bicho nojento» genérico e passa a ser **este** animal no ecrã.

## Origem da série (recorde público)

| Data (EN) | Peça | Leitura BudGanja |
|-----------|------|------------------|
| 2025-12-24 | [I BEFRIENDED THE SMARTEST SPIDER IN THE WORLD](${origin}) | Encontro — o nome entra no arquivo |
| 2026-02-07 | [SOMETHING HAPPENED TO RODRIGO THE SPIDER](${muda}) | **Muda** (exúvia) — crescimento de artrópode, não «plot twist» vazio |
| 2026-03-26 | [Espelho](${espelho}) | Visão de saltadora; título *smartest* = marketing, não paper |
| 2026-08-08 | [RODRIGO THE SPIDER VS WILD FOREST INSECTS](${destaque}) | **Destaque** — predador × presas insetos; [risco](${risco}) e [respeito](${respeito}) aos dois lados |

## Hipóteses e método

**H1:** Rodrigo é **aranha-saltadora**, não [inseto](${inseto}) — a fala popular («bicho») mistura; a ficha **separa**.  
**H2:** o nome próprio é [respeito](${respeito}) de recorde: este indivíduo, este arquivo — sem fingir que todas as saltadoras se chamam Rodrigo.  
**H3:** *smartest spider in the world* é **título**; saltadoras têm visão excelente **entre aranhas** — isso não autoriza ranking de QI.  
**H4:** o *vs* com insetos do bosque é **caça real** em palco de ecrã — indexa-se com [verdade](${verdade}); o lab **não** ensina a montar combates.  
**H5:** fecho = [Faça o melhor!](${mantra}) — o melhor olhar é curioso, preciso e sem crueldade de claque.

## Mérito — o que esta série faz bem

| Gesto | Porquê conta |
|-------|----------------|
| **Nomear** | Tira a aranha do nojo de classe |
| **Mostrar a muda** | Literacia de artrópode — o corpo cabe em tamanho novo |
| **Macro da caça** | Saltadora à espera / salto — ofício de predador, não *jump scare* vazio |
| **Separar presa** | Os insetos do *vs* **são** [insetos](${inseto}); Rodrigo **não** |

## Limites e [risco](${risco})

- **Não** é ficha de espécie até ao epíteto (o título EN não a dá).  
- **Não** é guia de pet: saltadoras em cativeiro pedem fonte e maneio **fora** desta página.  
- Veneno de saltadora para humanos é, em regra, de baixo impacto clínico — **não** é licença para manusear.  
- Palco *vs* pode **encenar** encontro; o lab regista o ecrã, não o terrário privado.  
- Distinto de [Joaninha Joana](${joaninha}) (personagem do conto Vida) e de [Rasmussen](${rasmussen}) / [selvagem](${selvagem}) (expedição).  
- Cookie, o gato do projecto Slivki, **não** é esta ficha.

## Vídeo âncora (embed) — destaque

@youtube ${seedId}

| Campo | Valor |
|-------|-------|
| Título | RODRIGO THE SPIDER VS WILD FOREST INSECTS |
| ID | \`${seedId}\` |
| Série | [Vídeos · Rodrigo](${videos}) |

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Canal Slivki Show](${canal}) | Arquivo — esta página é o **ser** |
| [inseto](${inseto}) | O que Rodrigo **não** é; o que as presas do *vs* **são** |
| [animal](${animal}) · [Animais](${animais}) | Classe de ser vivo — aranha cabe aqui |
| [especial](${especial}) | Destaque desta entrega |
| [respeito](${respeito}) · [risco](${risco}) · [verdade](${verdade}) | Olhar de novo; palco; título ≠ paper |

## Como usar no site

1. Ver a série em [Vídeos · Rodrigo](${videos}).  
2. Ler o [canal](${canal}) só para o arquivo e os life hacks.  
3. Cruzar com [inseto](${inseto}) para não misturar oito patas com seis.  
4. Fechar com [Faça o melhor!](${mantra}).

## Status

**Aprovado como destaque** — **Aranha Rodrigo** fichada como saltadora nomeada do [Slivki Show](${canal}); aranha ≠ inseto; série pública indexada; âncora *vs* insetos do bosque. Sem protocolo de maneio. Sem ranking de inteligência. Indexar ≠ endosso do palco.

[▶ Vídeos · Rodrigo](${videos}) · [▶ Canal](${canal}) · [▶ Inseto](${inseto}) · [▶ Animal](${animal}) · [▶ Animais](${hub}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Rodrigo the spider** — a named **jumping spider** (Salticidae) on [Slivki Show](${canal}) (@slivkishowen). This sheet is the **highlight** of that [special](${especial}) channel audit. **Spider ≠ [insect](${inseto}).** Animal ≠ channel.

> Independent audit. Sources: [Salticidae](${wiki}), [Jumping spider](${wikiEn}), public YouTube series. No affiliation. Not a husbandry guide. Species epithet is **not** in the English titles. Cataloguing ≠ endorsement of staged hunts.

Highlight: **RODRIGO THE SPIDER VS WILD FOREST INSECTS** — @youtube ${seedId}

## Status

**Approved as highlight** — named jumping spider; spider ≠ insect; title “smartest” is marketing, not a paper.

[▶ Videos](${videos}) · [▶ Channel](${canal})
`;

  const contentEs = `## Alcance

Inspección de la **araña Rodrigo** — saltadora (**Salticidae**) con **nombre propio** en [Slivki Show](${canal}) (@slivkishowen). Esta ficha es el **destaque** de esa inspección [especial](${especial}). **Araña ≠ [insecto](${inseto}).** Ser ≠ canal.

> Auditoría independiente. Fuentes: [Salticidae](${wiki}), [Jumping spider](${wikiEn}), serie pública. Sin afiliación. No es guía de terrario. El epíteto específico **no** está en los títulos EN. Indexar ≠ respaldar el palco *vs*.

Destaque: **RODRIGO THE SPIDER VS WILD FOREST INSECTS** — @youtube ${seedId}

## Estado

**Aprobada como destaque** — saltadora nombrada; araña ≠ insecto; «smartest» es título, no paper.

[▶ Vídeos](${videos}) · [▶ Canal](${canal})
`;

  return { body, contentEn, contentEs, seedId, wiki };
}

function buildAranhaRodrigoPost(seriesOrder) {
  const { body, contentEn, contentEs, seedId, wiki } = buildAranhaRodrigoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 21;
  return artePost({
    title: 'Inspeção: Aranha Rodrigo — saltadora nomeada do Slivki Show',
    titleEn: 'Inspection: Rodrigo the spider — named jumping spider on Slivki Show',
    titleEs: 'Inspección: araña Rodrigo — saltadora nombrada de Slivki Show',
    excerpt:
      'Animais (destaque): Aranha Rodrigo — saltadora (Salticidae) com nome próprio no @slivkishowen; aranha ≠ inseto; série encontro / muda / espelho / vs bosque. Sem protocolo de maneio.',
    excerptEn:
      'Animals (highlight): Rodrigo the spider — named jumping spider (Salticidae) on @slivkishowen; spider ≠ insect; series meet / molt / mirror / vs forest. Not a husbandry guide.',
    excerptEs:
      'Animales (destaque): araña Rodrigo — saltadora (Salticidae) con nombre en @slivkishowen; araña ≠ insecto; serie encuentro / muda / espejo / vs bosque. No es guía de manejo.',
    slug: 'inspecao-animal-aranha-rodrigo',
    date: '2026-08-21T16:45:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Aranha Rodrigo · Animais',
    coverImage: '/imagens/inspecoes/aranha-rodrigo-cover.jpg',
    sourceUrl: wiki,
    videoId: seedId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAranhaRodrigoPost,
  buildAranhaRodrigoBodies
};
