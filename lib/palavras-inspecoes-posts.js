'use strict';

/**
 * Inspeções «Palavras»: origem, viagem e transformação histórica
 * de vocábulos ligados a plantas, medicina e cultura canábica.
 * Série: palavras-origem — tipagem no hub → 'palavra'.
 *
 * Método BudGanja: a palavra é o objeto; a planta é o elo botânico.
 * Separar etimologia contestada de uso social; cruzar com /plantas/.
 */

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
    filename: opts.filename || 'posts/post-' + opts.slug + '.html',
    url: opts.url || '/posts/post-' + opts.slug + '.html',
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

function buildMaconhaBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const planta = '/plantas/cannabis-sativa/';
  const unifesp = '/biblioteca/unifesp/';
  const artigo =
    '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const renatoRusso = '/posts/post-inspecao-figura-renato-russo.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **maconha** — mapear **origens etimológicas** (com hipóteses em disputa), a **viagem atlântica** do vocábulo e da planta, e a **transformação semântica** no Brasil: do uso popular e estigmatizado ao vocabulário médico-jurídico (*cannabis* / canábis).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: dicionários históricos, etnobotânica da diáspora africana no Brasil e literacia canábica contemporânea. **Etimologia não é consenso fechado** — documentamos hipóteses e o que o uso social fez da palavra. Não é aconselhamento médico nem incentivo a uso ilícito. Sem afiliação política ou comercial.

Esta ficha é o **modelo** da série **Palavras**: cada relatório seguinte deve repetir o mesmo método (origem → viagem → transformação → rede semântica → elo com planta).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **maconha** |
| Língua de uso | Português do Brasil (também registada em PT europeu) |
| Classe | Substantivo feminino |
| Referente botânico | *Cannabis sativa* L. (Cannabaceae) |
| Tipo BudGanja | Palavra — origem e transformação histórica |
| Elo no catálogo | [Cannabis (medicinal)](${planta}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «maconha» no Brasil é, em grande parte, herança da **diáspora africana** (vocabulário bantu e práticas associadas), não invenção recente da proibição.  
**H2:** o **sentido social** da palavra mudou mais do que a etimologia — de nome popular da planta a marca de estigma, e depois a termo que a linguagem institucional tenta substituir por *cannabis*.  
**H3:** inspecionar a palavra (e não só a planta) melhora a literacia: evita confundir **nome científico**, **gíria**, **marca cultural** e **categoria jurídica**.

Passos do método (repetíveis):

1. Fixar a forma canónica e variantes ortográficas/regionais.  
2. Listar hipóteses etimológicas com grau de confiança (forte / média / fraca / folclórica).  
3. Traçar a viagem histórica (territórios, séculos, contactos).  
4. Mapear transformação de sentido (popular → pejorativo → clínico/legal).  
5. Montar a **rede semântica** (sinónimos, cognatos, estrangeirismos).  
6. Cruzar com a ficha de planta medicinal e com recursos BudGanja.  
7. Declarar limites e o que fica em aberto.

## Origens (etimologia em disputa)

Não há uma única etimologia «fechada» aceite por todos os dicionários. O que há é um **núcleo plausível** e satélites folclóricos.

### Hipótese principal — tronco bantu (confiança: média-alta)

A via mais citada liga *maconha* a línguas **bantu** da África centro-ocidental (região de Angola / Congo), trazidas ao Brasil com a diáspora escravizada. Formas aparentadas no português brasileiro e em registos etnobotânicos incluem **diamba**, **liamba**, **riamba** — nomes populares da cannabis em contextos afro-brasileiros.

Leitura BudGanja: a palavra viaja com **gente, cultivo e saber de uso**, não como etiqueta laboratoral neutra. O prefixo/estrutura *ma-* em várias línguas bantu marca classes nominais; isso ajuda a explicar por que o vocábulo «soa» africano aos ouvidos da etnolinguística, mesmo quando a forma exacta do étimo oscila entre fontes.

### Outras hipóteses e ruído (confiança: baixa a folclórica)

- Aproximações forçadas a termos indígenas brasileiros **sem** documentação sólida — tratar como ruído até haver fonte primária.  
- Narrativas que inventam «origem» para moralizar (demonizar ou romantizar) — fora do método.  
- Confusão com **marijuana** (via mexicana/espanhola) ou **ganja** (via hindi/sânscrito e Caribe): são **outras palavras**, outras rotas — entram na rede semântica, não como étimo de *maconha*.

**Veredicto etimológico provisório:** origem **afro-atlântica (bantu)** como melhor hipótese de trabalho; detalhes do étimo exacto permanecem em aberto e devem ser actualizados se surgir filologia mais fina.

## Viagem e transformação no Brasil

| Época / eixo | O que a palavra carrega | Nota editorial |
|--------------|-------------------------|----------------|
| Diáspora e Brasil colonial/imperial | Nome popular da planta e de usos associados em comunidades afro-brasileiras | Planta + palavra chegam juntas na história social |
| Século XX — proibição e estigma | «Maconha» vira marca pejorativa na polícia, imprensa e senso comum | O referente botânico não muda; o **julgamento social** sim |
| Medicina e direito recentes | Preferência institucional por *cannabis* / canábis / «cannabis medicinal» | Tentativa de **dessensibilizar** o léxico clínico-legal |
| Cultura contemporânea | Coexistência: maconha (fala corrente), erva, baseado; cannabis (técnico); ganja (global/reggae/marca) | Polissemia viva — não apagar nenhuma camada |

**Hipótese aplicada:** quem só diz «cannabis» no laboratório e «maconha» na rua está, sem perceber, a mapear **dois registos sociais** da mesma espécie. A série Palavras torna isso explícito.

## Rede semântica (o que não é sinónimo exacto)

| Termo | Rota / origem aproximada | Relação com *maconha* |
|-------|--------------------------|------------------------|
| **Cannabis** | Latim ← grego *kánnabis* | Nome científico / clínico; elo [planta](${planta}) |
| **Diamba / liamba** | Tronco afro-brasileiro (bantu) | Quase-cognato cultural; candidato a ficha própria |
| **Ganja** | Hindi/sânscrito → Caribe → global | Outra rota; presente na marca BudGanja |
| **Marijuana / marihuana** | Espanhol mexicano → inglês global | Estrangeirismo; não é étimo de maconha |
| **Erva** | Português comum | Hipónimo vago / eufemismo |
| **Cânhamo** | Fibra / uso industrial (registo distinto) | Mesma espécie em muitos enquadramentos; uso semântico diferente |

Próximas fichas naturais da série: **ganja**, **diamba**, **cannabis** (como latinismo técnico).

## Elo com plantas medicinais brasileiras

No catálogo BudGanja, a espécie correspondente é **[Cannabis (medicinal) — *Cannabis sativa* L.](${planta})**, série *plantas-medicinais*.

| Eixo | Onde vive | O que inspeciona |
|------|-----------|------------------|
| Planta | [Ficha da espécie](${planta}) | Botânica, usos, cuidados, UNIFESP |
| Palavra | Esta inspeção | Origem do nome popular e história do sentido |
| Artigo | [Albaugh et al. — neurodesenvolvimento](${artigo}) | Evidência peer-reviewed (adolescência) |
| Formação | [Curso UNIFESP](${unifesp}) | Literacia académica |

Regra da série: **toda palavra com referente botânico** deve apontar para \`/plantas/<slug>/\` quando a espécie existir no catálogo; se não existir, abrir nota «sem ficha de planta» e decidir se a espécie merece entrada no catálogo.

## Avaliação BudGanja

### Forças desta ficha
- Abre a série **Palavras** com método repetível (origem → viagem → transformação → rede → planta).  
- Liga léxico popular brasileiro à história afro-atlântica e ao catálogo medicinal.  
- Separa hipóteses etimológicas de moralismo e de marketing.

### Limites honestos
- Não substitui um artigo de etimologia histórica com aparato filológico completo.  
- Hipótese bantu é a melhor leitura disponível aqui — não um dogma.  
- Não cobre toda a gíria regional brasileira (centenas de apelidos).

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Ficha da planta | [Cannabis sativa](${planta}) |
| Hub desta série | [Inspeções · Palavras](${hub}) |
| Pessoa × Palavras | [Gregorio Duvivier — método da palavra](${duvivier}) |
| Pessoa × Palavras | [Chorão — letra urbana / CBJr](${chorao}) |
| Pessoa × Palavras | [Renato Russo — Legião Urbana / tempo](${renatoRusso}) |
| Hub Pessoas | [Inspeções · Pessoas](${pessoas}) |
| Catálogo medicinal | [Plantas](/plantas/) |
| Artigos científicos | [Inspeções · Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |
| Extensão | [UNIFESP](${unifesp}) |

## Como repetir o método

1. Escolher **uma** palavra (forma canónica + variantes).  
2. Identificar o referente (planta, prática, produto, conceito).  
3. Hipóteses etimológicas com grau de confiança.  
4. Linha do tempo: viagem + mudança de sentido.  
5. Tabela de rede semântica (o que parece sinónimo e não é).  
6. Link obrigatório à ficha de planta (se houver) e a 1–2 inspeções irmãs.  
7. Status claro + fila de próximas palavras.

## Status

**Aprovado como ficha fundadora da série Palavras** — *maconha* documentada na origem afro-atlântica plausível, na transformação semântica brasileira e no elo com [*Cannabis sativa*](${planta}).

[▶ Todas as inspeções · Palavras](${hub}) · [Planta medicinal](${planta})
`;

  const contentEn = `## Scope

Editorial and linguistic inspection of the Brazilian Portuguese word **maconha** — map **etymological origins** (competing hypotheses), the **Atlantic journey** of word and plant, and **semantic change** in Brazil: from popular/stigmatized speech to medical-legal vocabulary (*cannabis*).

> **Method note:** independent BudGanja audit. Etymology is **not a closed consensus** — we document hypotheses and what social use did to the word. **Not medical advice.**

This sheet is the **model** for the **Words** series: origin → journey → transformation → semantic network → plant link.

## Inspected object

| Field | Value |
|-------|-------|
| Word | **maconha** |
| Language | Brazilian Portuguese |
| Botanical referent | *Cannabis sativa* L. |
| BudGanja type | Word — origin and historical transformation |
| Catalog link | [Medicinal cannabis](${planta}) |
| Inspection date | ${inspected} |

## Hypotheses

**H1:** *maconha* in Brazil largely inherits **African diaspora / Bantu** vocabulary, not a recent prohibition invention.  
**H2:** social meaning shifted more than the etymon — stigma, then institutional preference for *cannabis*.  
**H3:** inspecting the word (not only the plant) separates scientific name, slang, cultural brand and legal category.

## Origins

Best working hypothesis: **Bantu / Afro-Atlantic** route (Angola–Congo region), alongside related Brazilian forms **diamba / liamba / riamba**. Folk links to unrelated Indigenous etyma without primary sources are treated as noise. **Marijuana** and **ganja** are other routes — semantic network, not the etymon of *maconha*.

## Transformation in Brazil

| Axis | What the word carries |
|------|------------------------|
| Diaspora / colonial Brazil | Popular name of the plant in Afro-Brazilian contexts |
| 20th-c. prohibition | Pejorative mark in police, press, common sense |
| Recent medicine & law | Preference for *cannabis* / medicinal cannabis |
| Living culture | maconha, erva, ganja, cannabis coexist as registers |

## Semantic network

| Term | Approx. route | Relation |
|------|---------------|----------|
| Cannabis | Latin ← Greek | Scientific/clinical; [plant sheet](${planta}) |
| Diamba / liamba | Afro-Brazilian | Cultural near-cognate |
| Ganja | Hindi/Sanskrit → Caribbean | Other route; in BudGanja brand |
| Marijuana | Mexican Spanish → global EN | Loanword; not etymon of maconha |

## Link to medicinal plants

Species sheet: **[Cannabis sativa](${planta})**. Rule: every Words inspection with a botanical referent must link to \`/plantas/<slug>/\` when the species exists.

## Status

**Approved as founding sheet of the Words series.**

[▶ All inspections · Words](${hub}) · [Plant](${planta})
`;

  const contentEs = `## Alcance

Inspección editorial y lingüística de la palabra brasileña **maconha** — mapear **orígenes etimológicos** (hipótesis en disputa), el **viaje atlántico** de la palabra y la planta, y la **transformación semántica** en Brasil: del habla popular/estigmatizada al léxico médico-jurídico (*cannabis*).

> **Nota metodológica:** auditoría independiente. La etimología **no es consenso cerrado**. **No es consejo médico.**

Esta ficha es el **modelo** de la serie **Palabras**: origen → viaje → transformación → red semántica → enlace a la planta.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Palabra | **maconha** |
| Lengua | Portugués de Brasil |
| Referente botánico | *Cannabis sativa* L. |
| Tipo BudGanja | Palabra — origen y transformación histórica |
| Catálogo | [Cannabis medicinal](${planta}) |
| Fecha | ${inspected} |

## Orígenes

Mejor hipótesis de trabajo: ruta **bantú / afroatlántica** (región Angola–Congo), junto a formas **diamba / liamba / riamba**. **Marijuana** y **ganja** son otras rutas — red semántica, no étimo de *maconha*.

## Transformación en Brasil

De nombre popular afrobrasileño → marca pejorativa en el siglo XX → preferencia institucional por *cannabis* en medicina y derecho, mientras el habla cotidiana mantiene *maconha*, *erva*, *ganja*.

## Red semántica

Cannabis (científico) · diamba/liamba (afrobrasileño) · ganja (índico–caribeño) · marijuana (préstamo) · erva (eufemismo).

## Enlace con plantas medicinales

Ficha de especie: **[Cannabis sativa](${planta})**. Regla: toda inspección de Palabras con referente botánico debe enlazar a \`/plantas/<slug>/\`.

## Estado

**Aprobada como ficha fundadora de la serie Palabras.**

[▶ Todas las inspecciones · Palabras](${hub}) · [Planta](${planta})
`;

  return { body, contentEn, contentEs };
}

function buildMaconhaPost() {
  const { body, contentEn, contentEs } = buildMaconhaBodies();
  return palavraPost({
    title: 'Inspeção: Maconha — origem da palavra e transformação no Brasil',
    titleEn: 'Inspection: Maconha — word origin and transformation in Brazil',
    titleEs: 'Inspección: Maconha — origen de la palabra y transformación en Brasil',
    excerpt:
      'Ficha fundadora da série Palavras: etimologia afro-atlântica de «maconha», viagem histórica, mudança de sentido e elo com *Cannabis sativa* no catálogo medicinal.',
    excerptEn:
      'Founding sheet of the Words series: Afro-Atlantic etymology of “maconha”, historical journey, meaning shift, and link to *Cannabis sativa* in the medicinal catalog.',
    excerptEs:
      'Ficha fundadora de la serie Palabras: etimología afroatlántica de «maconha», viaje histórico, cambio de sentido y vínculo con *Cannabis sativa* en el catálogo medicinal.',
    slug: 'inspecao-palavra-maconha',
    date: '2026-08-01T05:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Maconha · palavra',
    coverImage: '/imagens/inspecoes/maconha-palavra-cover.jpg',
    sourceUrl: '/plantas/cannabis-sativa/',
    body,
    contentEn,
    contentEs
  });
}

function buildPassarBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **passar** — verbo nuclear do português: **atravessar**, **acontecer** (*o que se passou*), **decorrer no tempo**, **transmitir**, **peneirar**. Esta ficha é o elo Pessoas × Palavras com **[Heródoto](${herodoto})**: *historie* como investigação do que **se passou**.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Etimologia de trabalho: latim *passāre* (ligado a *passus*, passo). **Não é dicionário completo** — mapa de sentidos e transformação com grau de confiança. Sem afiliação académica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **passar** |
| Classe | Verbo (também usos nominais / locuções: *o passado*, *de passagem*) |
| Étimo (hipótese forte) | Latim *passāre* ← *passus* («passo») |
| Tipo BudGanja | Palavra — origem e transformação de sentidos |
| Elo principal | [Heródoto — método da pesquisa](${herodoto}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «passar» concentra a ideia de **movimento através** (espaço, tempo, filtro, boca).  
**H2:** o sentido «acontecer / o que se passou» é o ponteiro natural para a história (*historie*).  
**H3:** cruzar com [Heródoto](${herodoto}) treina o laboratório a ligar verbo e método de pesquisa — não só nomes de plantas.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *passāre* / *passus* | «dar passos», atravessar; base românica (pt. *passar*, esp. *pasar*, it. *passare*, fr. *passer*) | Alta |
| Ampliação semântica | Do espaço físico ao tempo, ao acontecimento, à transmissão e ao crivo (peneira) | Alta (uso documentado) |

## Transformação / rede de sentidos (português)

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Espaço | passar a ponte; passar por Santos | Travessia — viagem herodotiana |
| Tempo | o tempo passa; o ano que passou | Duração |
| Acontecimento | o que se passou; isso já passou | **Núcleo do elo com Heródoto** |
| Transmissão | passar adiante; passar a palavra | Fonte oral |
| Crivo | passar a farinha; passar a limpo | Filtrar / depurar (metáfora de método) |
| Ultrapassar | passar alguém; passar do limite | Excesso / superação |

## Elo com Heródoto

| Traço | Ligação |
|-------|---------|
| *Historie* | Investigar **o que se passou** |
| Viagem | **Passar por** povos e terras |
| Oralidade | O que **passa** de testemunha a testemunha |
| Digressão | A narrativa **passa** de um tema a outro |

Tipo de elo: **metodológico** — ver [Heródoto](${herodoto}).

## Avaliação BudGanja

### Forças
- Abre o braço verbal da série Palavras (não só nomes de plantas).  
- Elo claro Pessoas × Palavras com a ficha fundadora de Pessoas.

### Limites
- Não esgota locuções (*passar vergonha*, *passar fome*, regionalismos).  
- Não faz filologia latina completa com aparato crítico.

## Complementaridade

| Tema | Recurso |
|------|---------|
| Pessoa × passar | [Heródoto](${herodoto}) |
| Hub Pessoas | [Inspeções · Pessoas](${pessoas}) |
| Hub Palavras | [Inspeções · Palavras](${hub}) |
| Irmã lexical (mapa) | [caminho](${caminho}) — o percurso que o passo faz |
| Outra palavra (planta) | [maconha](${maconha}) |

## Como repetir o método

1. Fixar forma + classe gramatical.  
2. Étimo com grau de confiança.  
3. Tabela de sentidos (espaço / tempo / acontecimento / …).  
4. Elo com pessoa ou planta quando o método o exigir.  
5. Status.

## Status

**Aprovado** — «passar» documentado na origem latina plausível e no elo com [Heródoto](${herodoto}); mapa do projecto em [caminho](${caminho}).

[▶ Palavras](${hub}) · [▶ Heródoto](${herodoto}) · [▶ Caminho](${caminho})
`;

  const contentEn = `## Scope

Editorial inspection of the Portuguese verb **passar** — to cross, to happen (*o que se passou*), to elapse, to transmit, to sift. Linked to **[Herodotus](${herodoto})**: *historie* as inquiry into what **passed**.

## Object

| Field | Value |
|-------|-------|
| Word | **passar** |
| Etymon (working) | Latin *passāre* ← *passus* (“step”) |
| Main link | [Herodotus](${herodoto}) |
| Date | ${inspected} |

## Senses

Space (travel through) · time · event/what happened · transmission · filtering · surpassing.

## Link to Herodotus

Methodological: investigating what happened; passing through lands; oral tradition that passes. See [Herodotus](${herodoto}).

## Status

**Approved** — link to [Herodotus](${herodoto}).

[▶ Words](${hub}) · [▶ Herodotus](${herodoto})
`;

  const contentEs = `## Alcance

Inspección del verbo portugués **passar** — atravesar, ocurrir (*o que se passou*), transcurrir, transmitir, cribar. Vinculado a **[Heródoto](${herodoto})**: *historie* como investigación de lo **ocurrido**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **passar** |
| Étimo | Latín *passāre* ← *passus* |
| Enlace | [Heródoto](${herodoto}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — vínculo con [Heródoto](${herodoto}).

[▶ Palabras](${hub}) · [▶ Heródoto](${herodoto})
`;

  return { body, contentEn, contentEs };
}

function buildPassarPost() {
  const { body, contentEn, contentEs } = buildPassarBodies();
  return palavraPost({
    title: 'Inspeção: Passar — verbo da passagem, do acontecido e da travessia',
    titleEn: 'Inspection: Passar — the verb of passage, event and crossing',
    titleEs: 'Inspección: Passar — verbo de la pasada, lo ocurrido y la travesía',
    excerpt:
      'Palavras × Pessoas: «passar» (latim *passāre*) — atravessar, o que se passou, o tempo — elo metodológico com Heródoto e o ofício de *historie*.',
    excerptEn:
      'Words × People: “passar” (Latin *passāre*) — to cross, what happened, time — methodological link to Herodotus and *historie*.',
    excerptEs:
      'Palabras × Personas: «passar» (latín *passāre*) — atravesar, lo ocurrido, el tiempo — vínculo metodológico con Heródoto e *historie*.',
    slug: 'inspecao-palavra-passar',
    date: '2026-08-01T05:30:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Passar · palavra',
    coverImage: '/imagens/inspecoes/passar-palavra-cover.jpg',
    sourceUrl: '/posts/post-inspecao-figura-herodoto.html',
    body,
    contentEn,
    contentEs
  });
}

function buildCaminhoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';
  const sendMe = '/posts/post-inspecao-arte-send-me-on-my-way.html';
  const loucos = '/posts/post-inspecao-arte-so-os-loucos-sabem.html';
  const radio = '/radio/';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const curinga = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
  const gaarder = '/posts/post-inspecao-figura-jostein-gaarder.html';
  const diamba = '/posts/post-inspecao-arte-diamba-sarabamba.html';
  const henman = '/posts/post-inspecao-figura-anthony-henman.html';
  const opio = '/posts/post-inspecao-arte-a-ultima-casa-de-opio.html';
  const tosches = '/posts/post-inspecao-figura-nick-tosches.html';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const leonard = '/posts/post-inspecao-figura-annie-leonard.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const cultivo = '/cultivo/';
  const guia = '/guia/cultivo-basico.html';
  const plantas = '/plantas/';
  const cannabis = '/plantas/cannabis-sativa/';
  const inspecoes = '/biblioteca/inspecoes/';
  const unifesp = '/biblioteca/unifesp/';
  const curso = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **caminho** — substantivo do português para **via**, **rota**, **percurso** e, por extensão, **método** e **destino**. Esta ficha é o **hub lexical** que amarra o laboratório BudGanja: o passo ([passar](${passar})), a canção de abertura ([Send Me On My Way](${sendMe})), a viagem do método ([Heródoto](${herodoto})), os livros e filmes de travessia, o [cultivo](${cultivo}) e o mapa das [inspeções](${inspecoes}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Étimo de trabalho: latim vulgar *cammīnus* / *camminus* (via, senda; possível substrato céltico) → pt. *caminho*, esp. *camino*, fr. *chemin*. **Não é dicionário completo** — mapa de sentidos e **rede de elos no projecto**. Sem afiliação académica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **caminho** |
| Classe | Substantivo masculino |
| Étimo (hipótese forte) | Latim vulgar *cammīnus* («via, senda») |
| Cognatos | esp. *camino* · fr. *chemin* · it. *cammino* · ing. *path* / *way* (tradução, não cognato) |
| Tipo BudGanja | Palavra — origem, sentidos e **hub de elos do projecto** |
| Elo verbal irmão | [passar](${passar}) — o passo que faz o caminho |
| Elo Artes âncora | [Send Me On My Way](${sendMe}) — «envie-me no meu caminho» |
| Elo Pessoas âncora | [Heródoto](${herodoto}) — método como caminho de investigação |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «caminho» nomeia o **percurso** — físico, narrativo, ético e metodológico — que o laboratório já pratica sem ter ficha própria.  
**H2:** sem [passar](${passar}) não há passo; sem **caminho** não há mapa do conjunto.  
**H3:** cruzar a palavra com Artes, Pessoas, cultivo e hubs treina a ler o site como **rede de rotas**, não como lista solta.

Passos:

1. Fixar forma + étimo com confiança.  
2. Tabela de sentidos (espaço / método / vida / obra).  
3. Rede BudGanja — elos verificáveis no projecto.  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim vulgar *cammīnus* | «via, senda»; base românica ocidental | Alta |
| Possível substrato céltico | Discutido em etimologia histórica para *chemin* / *camino* | Média (debate filológico) |
| Relação com *passo* / [passar](${passar}) | Não é o mesmo étimo; **aliança semântica** (passo → caminho) | Alta (uso) |

## Transformação / rede de sentidos (português)

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Espaço | caminho de terra; caminho até à estufa | Rota física — cultivo, viagem |
| Método | caminho da inspeção; seguir o caminho | Procedimento — série Palavras / hub |
| Vida / ética | caminho certo; perder o caminho | Escolha — sem moralismo prescritivo |
| Obra / narrativa | caminho do herói; no caminho de… | Artes — Alice, Matrix, Curinga, Ópio |
| Consumo / materiais | caminho da coisa (extrair→lixo) | [A História das Coisas](${historia}) |
| Abertura | «on my way» / no meu caminho | [Send Me On My Way](${sendMe}) · [rádio](${radio}) |

## Rede BudGanja — relacionar o projecto

### Palavras × Pessoas (método)

| Recurso | Papel no caminho |
|---------|------------------|
| [passar](${passar}) | Verbo do passo e do «o que se passou» — irmão lexical |
| [maconha](${maconha}) | Outra ficha Palavras — rota afro-atlântica do nome |
| [Heródoto](${herodoto}) | *Historie* como **caminho de pesquisa** (Pessoas) |
| Hub [Palavras](${hub}) · [Pessoas](${pessoas}) | Separar léxico e biografia |

### Artes — caminhos narrativos e musicais

| Recurso | Papel no caminho |
|---------|------------------|
| [Send Me On My Way](${sendMe}) | Canção fundadora Artes — convite à partida / *way* |
| [Só os Loucos Sabem](${loucos}) | Segunda faixa da [rádio](${radio}) — outro trilho da casa |
| [Alice](${alice}) · [coelho](${coelho}) | Queda / buraco do coelho — caminho para Wonderland |
| [Divertida Mente](/posts/post-inspecao-filme-divertida-mente.html) · [emoção](/posts/post-inspecao-palavra-emocao.html) | Caminho interno da Riley — todas as emoções a bordo |
| [The Matrix](${matrix}) · [Keanu](${keanu}) | Escolha de pílula — bifurcação do caminho |
| [O Dia do Curinga](${curinga}) · [Gaarder](${gaarder}) | Viagem Europa + pergunta do Curinga |
| [Diamba Sarabamba](${diamba}) · [Henman](${henman}) | Arquivo do debate BR — caminho editorial 1986 |
| [A Última Casa de Ópio](${opio}) · [Tosches](${tosches}) | Procura mundial — caminho sem garantia de achado |
| [A História das Coisas](${historia}) · [Leonard](${leonard}) | Ciclo extrair→descartar — caminho das coisas |
| Hub [Artes](${artes}) | Obras; não confundir com Palavras |

### Cultivo, plantas e formação

| Recurso | Papel no caminho |
|---------|------------------|
| [Cultivo](${cultivo}) · [guia básico](${guia}) | Percurso prático da planta |
| [Catálogo de plantas](${plantas}) · [Cannabis](${cannabis}) | Rotas botânicas do laboratório |
| [Curso UNIFESP](${curso}) · [hub UNIFESP](${unifesp}) | Caminho formativo institucional |
| Hub [Inspeções](${inspecoes}) | Mapa geral das fichas |
| [Cana-de-açúcar](${cana}) · [Derivados](${derivados}) | Cadeias materiais (elo com Leonard) |
| [Legado](${legado}) | Outro trilho (ciência canábica) — distinto de Pessoas história |

### Como ler a rede

1. Entrar pela **palavra** (esta ficha) ou pela **canção** ([Send Me](${sendMe})).  
2. Seguir o **passo** ([passar](${passar})) e o **método** ([Heródoto](${herodoto})).  
3. Escolher um **trilho de obra** (Alice / Matrix / Curinga / Diamba / Ópio / Coisas).  
4. Voltar ao [hub de inspeções](${inspecoes}) ou ao [cultivo](${cultivo}).

## Avaliação BudGanja

### Forças
- Dá nome ao que o projecto já faz: **ligar rotas**.  
- Une Palavras, Artes, Pessoas, rádio, cultivo e derivados sem fundir séries.

### Limites
- Não esgota locuções (*caminho das pedras*, *a meio caminho*, gírias).  
- Não é mapa sítio completo — é **hub lexical**; URLs mudam com novas fichas.

## Como repetir o método

1. Fixar forma + étimo.  
2. Tabela de sentidos.  
3. Rede de elos **reais** no repositório (sem inventar páginas).  
4. Um elo verbal irmão + um elo Artes + um elo Pessoas.  
5. Status.

## Status

**Aprovado** — «caminho» documentado como hub lexical do laboratório, com elos a [passar](${passar}), [Send Me On My Way](${sendMe}), [Heródoto](${herodoto}) e à rede Artes/cultivo.

[▶ Palavras](${hub}) · [▶ Passar](${passar}) · [▶ Coelho](${coelho}) · [▶ Send Me On My Way](${sendMe}) · [▶ Inspeções](${inspecoes})
`;

  const contentEn = `## Scope

Editorial inspection of the Portuguese noun **caminho** — path, way, route, and by extension method. This sheet is the **lexical hub** of the BudGanja lab: [passar](${passar}) (the step), [Send Me On My Way](${sendMe}), [Herodotus](${herodoto}), narrative crossings, [cultivation](${cultivo}) and the [inspections hub](${inspecoes}).

> **Method note:** working etymon Vulgar Latin *cammīnus*. Not a full dictionary — senses + **project link network**.

## Object

| Field | Value |
|-------|-------|
| Word | **caminho** |
| Etymon | Vulgar Latin *cammīnus* |
| Sibling word | [passar](${passar}) |
| Arts anchor | [Send Me On My Way](${sendMe}) |
| People anchor | [Herodotus](${herodoto}) |
| Date | ${inspected} |

## Senses

Physical route · method · life choice · narrative path · materials cycle · musical “way”.

## Project network (summary)

Words: [passar](${passar}) · [maconha](${maconha}) · [coelho](${coelho})  
Arts: [Send Me](${sendMe}) · [Alice](${alice}) · [Matrix](${matrix}) · [Curinga](${curinga}) · [Diamba](${diamba}) · [Opium Den](${opio}) · [Story of Stuff](${historia})  
People: [Herodotus](${herodoto}) · authors linked above  
Lab: [cultivo](${cultivo}) · [plantas](${plantas}) · [inspections](${inspecoes}) · [UNIFESP](${unifesp})

## Status

**Approved** — lexical hub with live project links.

[▶ Words](${hub}) · [▶ Coelho](${coelho}) · [▶ Send Me On My Way](${sendMe})
`;

  const contentEs = `## Alcance

Inspección del sustantivo portugués **caminho** — vía, ruta, recorrido y, por extensión, método. Esta ficha es el **hub léxico** del laboratorio: [passar](${passar}), [Send Me On My Way](${sendMe}), [Heródoto](${herodoto}), travesías narrativas, [cultivo](${cultivo}) y el [hub de inspecciones](${inspecoes}).

> **Nota metodológica:** étimo de trabajo latín vulgar *cammīnus*. No es diccionario completo — sentidos + **red de vínculos del proyecto**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **caminho** |
| Étimo | Latín vulgar *cammīnus* |
| Hermana | [passar](${passar}) |
| Ancla Artes | [Send Me On My Way](${sendMe}) |
| Ancla Personas | [Heródoto](${herodoto}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — hub léxico con vínculos vivos del proyecto.

[▶ Palabras](${hub}) · [▶ Coelho](${coelho}) · [▶ Send Me On My Way](${sendMe})
`;

  return { body, contentEn, contentEs };
}

function buildCaminhoPost() {
  const { body, contentEn, contentEs } = buildCaminhoBodies();
  return palavraPost({
    title:
      'Inspeção: Caminho — a palavra que liga o laboratório BudGanja',
    titleEn:
      'Inspection: Caminho — the word that links the BudGanja lab',
    titleEs:
      'Inspección: Caminho — la palabra que une el laboratorio BudGanja',
    excerpt:
      'Palavras: «caminho» (latim vulgar *cammīnus*) — via, método e hub lexical que relaciona passar, Send Me On My Way, Heródoto, Artes, cultivo e o mapa de inspeções.',
    excerptEn:
      'Words: “caminho” (Vulgar Latin *cammīnus*) — path, method and lexical hub linking passar, Send Me On My Way, Herodotus, Arts, cultivation and the inspections map.',
    excerptEs:
      'Palabras: «caminho» (latín vulgar *cammīnus*) — vía, método y hub léxico que relaciona passar, Send Me On My Way, Heródoto, Artes, cultivo y el mapa de inspecciones.',
    slug: 'inspecao-palavra-caminho',
    date: '2026-08-01T22:00:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Caminho · palavra',
    coverImage: '/imagens/inspecoes/caminho-palavra-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-palavras',
    body,
    contentEn,
    contentEs
  });
}

function buildCoelhoBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const inspecoes = '/biblioteca/inspecoes/';
  const wiki =
    'https://pt.wikipedia.org/wiki/Coelho_Branco_%28Alice_no_Pa%C3%ADs_das_Maravilhas%29';
  const wikiHole = 'https://en.wikipedia.org/wiki/Rabbit_hole';
  const wikiEtym = 'https://en.wiktionary.org/wiki/coelho#Portuguese';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **coelho** — o animal (*Oryctolagus* / leporídeos) e, sobretudo, a **figura cultural** que o laboratório já usa sem ficha própria: o **Coelho Branco**, a **toca** e o **buraco do coelho** como metáfora de entrada na investigação. Elo âncora: [Alice no País das Maravilhas](${alice}) (livro 1865); irmãos lexicais: [caminho](${caminho}) e [passar](${passar}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Étimo de trabalho: latim *cuniculus* («coelho; toca») → pt. *coelho*, esp. *conejo*. Fontes de apoio: [Wikcionário · coelho](${wikiEtym}), [Coelho Branco](${wiki}), [rabbit hole](${wikiHole}). **Metáfora literária ≠ protocolo de substâncias** — o laboratório não romantiza consumo. Sem afiliação Disney.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **coelho** |
| Classe | Substantivo masculino |
| Étimo (hipótese forte) | Latim *cuniculus* («coelho; toca / buraco») |
| Cognatos | esp. *conejo* · cat. *conill* · it. *coniglio* · ing. *rabbit* / *bunny* (tradução, não cognato) |
| Tipo BudGanja | Palavra — animal, figura narrativa e **metáfora de entrada** |
| Elo Artes âncora | [Alice](${alice}) — Coelho Branco e toca |
| Elo Palavras irmãos | [caminho](${caminho}) · [passar](${passar}) |
| Elo cinema eco | [The Matrix](${matrix}) — «follow the white rabbit» |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «coelho» nomeia primeiro o **animal**; a carga BudGanja vem da **figura** (Carroll → cultura pop).  
**H2:** «buraco do coelho» / *rabbit hole* é **figura de passagem** — entrar sem mapa completo (ver [passar](${passar}) e [caminho](${caminho})).  
**H3:** a associação Wonderland ↔ substâncias é **memória colectiva posterior**; a tese do laboratório é **curiosidade com método**, não glamour de queda.

Passos:

1. Fixar forma + étimo.  
2. Separar animal / figura / metáfora digital.  
3. Rede BudGanja com URLs reais.  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *cuniculus* | Animal + ideia de **toca** / galeria | Alta |
| Romance ocidental | pt. *coelho*, esp. *conejo* (mesma família) | Alta |
| Carroll 1865 | Coelho Branco como **gatilho da queda** — origem literária da metáfora moderna | Alta (cultura) |
| Inglês *rabbit hole* | Locução ampliada (pesquisa online, obsessão temática) — eco do livro | Alta (uso contemporâneo) |

## Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Animal | coelho da horta; lebre ≠ coelho | Referente biológico — fora do foco da ficha |
| Figura literária | Coelho Branco; relógio; «atrasado» | [Alice](${alice}) — obra primeiro |
| Metáfora de entrada | buraco / toca do coelho | Aceitar a queda para ver o terreno |
| Cultura pop | *follow the white rabbit* ([Matrix](${matrix})) | Eco cinema — não substitui Carroll |
| Internet | *rabbit hole* (vídeos, threads) | Risco de deriva sem método — contrastar com inspeção |
| Folclore / calendário | Coelho da Páscoa | Outro eixo cultural — não misturar com Wonderland |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Alice](${alice}) | Origem literária da toca e do Coelho Branco |
| [caminho](${caminho}) | Hub lexical — a queda é um **caminho** narrativo |
| [passar](${passar}) | Verbo da travessia — o que se passa na queda |
| [The Matrix](${matrix}) · [Keanu](${keanu}) | Convite «siga o coelho branco» — bifurcação |
| Hub [Palavras](${hub}) · [Artes](${artes}) | Separar léxico e obra |
| Hub [Inspeções](${inspecoes}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha) ou pela **obra** ([Alice](${alice})).  
2. Seguir o **caminho** / o **passo**.  
3. Se vier pelo cinema, cruzar [Matrix](${matrix}) sem confundir com origem Carroll.  
4. Voltar ao [hub de inspeções](${inspecoes}).

## Avaliação BudGanja

### Forças
- Dá ficha própria à metáfora que Alice e caminho já citam.  
- Separa animal, literatura, cinema e gíria digital.

### Limites
- Não é monografia zoológica nem dicionário de gírias.  
- Não inventaria todas as adaptações de Alice.

## Como repetir o método

1. Fixar forma + étimo.  
2. Tabela animal / figura / metáfora.  
3. Um elo Artes + dois elos Palavras.  
4. Declaração explícita: metáfora ≠ protocolo.  
5. Status.

## Status

**Aprovado** — «coelho» documentado como palavra-figura de entrada na investigação, com elos a [Alice](${alice}), [caminho](${caminho}) e [passar](${passar}).

[▶ Palavras](${hub}) · [▶ Alice](${alice}) · [▶ Caminho](${caminho}) · [▶ Passar](${passar})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **coelho** (“rabbit”) — the animal and, above all, the **cultural figure**: White Rabbit, burrow and **rabbit hole** as a metaphor for entering inquiry. Anchor: [Alice](${alice}) (1865 book); siblings: [caminho](${caminho}), [passar](${passar}).

> **Method note:** etymon Latin *cuniculus*. Literary metaphor ≠ substance protocol. Supporting: [White Rabbit](${wiki}), [rabbit hole](${wikiHole}).

## Object

| Field | Value |
|-------|-------|
| Word | **coelho** |
| Etymon | Latin *cuniculus* |
| Arts anchor | [Alice](${alice}) |
| Sibling words | [caminho](${caminho}) · [passar](${passar}) |
| Cinema echo | [The Matrix](${matrix}) — “follow the white rabbit” |
| Date | ${inspected} |

## Senses

Animal · literary figure (Carroll) · entry metaphor · pop echo (Matrix) · internet *rabbit hole* · Easter folklore (separate axis).

## Status

**Approved** — entry-figure word with live links to Alice, caminho and passar.

[▶ Words](${hub}) · [▶ Alice](${alice}) · [▶ Caminho](${caminho})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **coelho** («conejo») — el animal y, sobre todo, la **figura cultural**: Conejo Blanco, madriguera y **agujero del conejo** como metáfora de entrada a la investigación. Ancla: [Alice](${alice}) (libro 1865); hermanas: [caminho](${caminho}), [passar](${passar}).

> **Nota metodológica:** étimo latín *cuniculus*. Metáfora literaria ≠ protocolo de sustancias. Apoyo: [Conejo Blanco](${wiki}), [rabbit hole](${wikiHole}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **coelho** |
| Étimo | Latín *cuniculus* |
| Ancla Artes | [Alice](${alice}) |
| Hermanas | [caminho](${caminho}) · [passar](${passar}) |
| Eco cine | [The Matrix](${matrix}) |
| Fecha | ${inspected} |

## Estado

**Aprobada** — palabra-figura de entrada con vínculos a Alice, caminho y passar.

[▶ Palabras](${hub}) · [▶ Alice](${alice}) · [▶ Caminho](${caminho})
`;

  return { body, contentEn, contentEs };
}

function buildCoelhoPost() {
  const { body, contentEn, contentEs } = buildCoelhoBodies();
  return palavraPost({
    title:
      'Inspeção: Coelho — a palavra da toca e da entrada na investigação',
    titleEn:
      'Inspection: Coelho — the word of the burrow and entry into inquiry',
    titleEs:
      'Inspección: Coelho — la palabra de la madriguera y la entrada a la investigación',
    excerpt:
      'Palavras: «coelho» (latim *cuniculus*) — animal, Coelho Branco e buraco do coelho como metáfora de entrada; elos com Alice, caminho, passar e Matrix.',
    excerptEn:
      'Words: “coelho” (Latin *cuniculus*) — animal, White Rabbit and rabbit hole as entry metaphor; links to Alice, caminho, passar and Matrix.',
    excerptEs:
      'Palabras: «coelho» (latín *cuniculus*) — animal, Conejo Blanco y agujero del conejo como metáfora de entrada; vínculos con Alice, caminho, passar y Matrix.',
    slug: 'inspecao-palavra-coelho',
    date: '2026-08-01T23:30:00.000Z',
    seriesOrder: 11,
    seriesLabel: 'Coelho · palavra',
    coverImage: '/imagens/inspecoes/coelho-palavra-cover.jpg',
    sourceUrl: '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html',
    body,
    contentEn,
    contentEs
  });
}

/**
 * Fichas «duplo sentido prejudicial» — sentido original cobrado por pejorativo/eufemismo.
 * cfg: { word, slugSuffix, seriesOrder, seriesLabel, title*, excerpt*, etymon, original, prejudicado, mudanca, links? }
 */
function buildDuploSentidoPalavraPost(cfg) {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const planta = '/plantas/cannabis-sativa/';
  const catalogo = hub;
  const links = cfg.links || {};

  const body = `## Escopo

Inspeção editorial da palavra **${cfg.word}** — foco no **duplo sentido prejudicial à originalidade**: o sentido primeiro foi coberto por um segundo sentido pejorativo, policial, comercial ou de eufemismo. Esta ficha integra o **mapa Palavras** em [Inspeções · Palavras](${hub}).

> **Nota metodológica:** auditoria independente. Não é dicionário completo nem incentivo a uso ilícito. Indexar ≠ endossar. Cruzar com [maconha](${maconha}) e o catálogo de plantas quando o referente for *Cannabis*.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **${cfg.word}** |
| Étimo / rota (trabalho) | ${cfg.etymon} |
| Tipo BudGanja | Palavra — duplo sentido e transformação |
| Elo planta | [Cannabis sativa](${planta}) |
| Mapa | [Palavras · duplo sentido](${catalogo}) |
| Data da inspeção | ${inspected} |

## Originalidade (sentido primeiro)

${cfg.original}

## Sentido prejudicial (segunda camada)

${cfg.prejudicado}

## Mudança documentada

${cfg.mudanca}

## Rede no laboratório

| Recurso | Papel |
|---------|-------|
| [maconha](${maconha}) | Ficha fundadora — estigma afro-atlântico |
| [Cannabis sativa](${planta}) | Referente botânico |
| [Mapa Palavras](${hub}) | Tabela de mudanças (duplo sentido) |
${links.extra || ''}

## Status

**Aprovado** — «${cfg.word}» documentada como palavra de duplo sentido prejudicial; ver mapa em [Palavras](${hub}).
`;

  const contentEn = `## Scope

Inspection of **${cfg.word}** — **double meaning that harms originality**. Map: [Words](${hub}).

## Original sense

${cfg.originalEn || cfg.original}

## Prejudicial sense

${cfg.prejudicedEn || cfg.prejudicado}

## Change

${cfg.changeEn || cfg.mudanca}

## Status

**Approved** — see [Words map](${hub}).
`;

  const contentEs = `## Alcance

Inspección de **${cfg.word}** — **doble sentido que perjudica la originalidad**. Mapa: [Palabras](${hub}).

## Sentido original

${cfg.originalEs || cfg.original}

## Sentido perjudicial

${cfg.prejudicedEs || cfg.prejudicado}

## Cambio

${cfg.changeEs || cfg.mudanca}

## Estado

**Aprobada** — ver [mapa Palabras](${hub}).
`;

  return palavraPost({
    title: cfg.title,
    titleEn: cfg.titleEn,
    titleEs: cfg.titleEs,
    excerpt: cfg.excerpt,
    excerptEn: cfg.excerptEn,
    excerptEs: cfg.excerptEs,
    slug: 'inspecao-palavra-' + cfg.slugSuffix,
    date: cfg.date || '2026-08-01T22:30:00.000Z',
    seriesOrder: cfg.seriesOrder,
    seriesLabel: cfg.seriesLabel || cfg.word + ' · palavra',
    coverImage: cfg.coverImage || '/imagens/inspecoes/' + cfg.slugSuffix + '-palavra-cover.jpg',
    sourceUrl: hub,
    body,
    contentEn,
    contentEs
  });
}

function buildGanjaPost() {
  return buildDuploSentidoPalavraPost({
    word: 'ganja',
    slugSuffix: 'ganja',
    seriesOrder: 4,
    seriesLabel: 'Ganja · palavra',
    title: 'Inspeção: Ganja — da rota índica à marca e à gíria global',
    titleEn: 'Inspection: Ganja — from the Indic route to brand and global slang',
    titleEs: 'Inspección: Ganja — de la ruta índica a la marca y la jerga global',
    excerpt:
      'Palavras: «ganja» — originalidade cultural índica/caribenha coberta por gíria e marketing (incl. BudGanja); mudança sem apagar a rota.',
    excerptEn:
      'Words: “ganja” — Indic/Caribbean cultural originality overlaid by slang and marketing (incl. BudGanja).',
    excerptEs:
      'Palabras: «ganja» — originalidad cultural índica/caribeña tapada por jerga y marketing.',
    etymon: 'Rota hindi/sânscrita → Caribe → inglês global (confiança: média-alta na rota cultural)',
    original:
      'Nome de planta e de cultura na rota índica; no Caribe e no reggae, vocábulo de identidade e ritual — não inventado pelo marketing ocidental.',
    originalEn:
      'Plant and culture name on the Indic route; in the Caribbean and reggae, a word of identity — not invented by Western marketing.',
    prejudicado:
      'Gíria global e etiqueta de lifestyle/marca que esvazia o rasto cultural e reduz a palavra a «droga cool».',
    prejudicedEn:
      'Global slang and lifestyle/brand label that empties the cultural trail and reduces the word to “cool drug”.',
    mudanca:
      'A originalidade cultural perde prioridade frente ao uso comercial. No laboratório, a marca **BudGanja** declara o eco da palavra sem pretender ser glossário sagrado nem endosso de uso ilícito — a ficha separa **marca**, **cultura** e **planta** ([Cannabis sativa](/plantas/cannabis-sativa/)).',
    changeEn:
      'Cultural originality loses priority to commercial use. The BudGanja brand echoes the word without claiming sacred glossary status or endorsing illicit use.',
    links: {
      extra:
        '| Marca do site | BudGanja — eco declarado, não étimo ritual |\n'
    }
  });
}

function buildDiambaPost() {
  return buildDuploSentidoPalavraPost({
    word: 'diamba',
    slugSuffix: 'diamba',
    seriesOrder: 5,
    seriesLabel: 'Diamba · palavra',
    title: 'Inspeção: Diamba — cognato afro-brasileiro apagado pelo estigma',
    titleEn: 'Inspection: Diamba — Afro-Brazilian cognate erased by stigma',
    titleEs: 'Inspección: Diamba — cognado afrobrasileño borrado por el estigma',
    excerpt:
      'Palavras: «diamba» (e liamba/riamba) — originalidade bantu/afro-brasileira coberta pelo léxico pejorativo de maconha e pelo latinismo clínico.',
    excerptEn:
      'Words: “diamba” (and liamba/riamba) — Bantu/Afro-Brazilian originality overlaid by pejorative maconha and clinical Latinism.',
    excerptEs:
      'Palabras: «diamba» — originalidad bantú/afrobrasileña tapada por maconha peyorativa y latinismo clínico.',
    etymon: 'Tronco bantu / afro-brasileiro (variantes liamba, riamba) — confiança média-alta cultural',
    original:
      'Nome popular da cannabis em contextos afro-brasileiros — tradição oral, etnobotânica e memória do sertão («Ó diamba, sarabamba!»).',
    prejudicado:
      'Apagamento: a fala pública e institucional privilegia «maconha» (estigma) ou «cannabis» (clínico), empurrando diamba para o arquivo.',
    mudanca:
      'A originalidade cultural sobrevive mais em livros e cantorias do que na linguagem oficial. Elo Artes: [Diamba Sarabamba](/posts/post-inspecao-arte-diamba-sarabamba.html) (coletânea 1986).',
    links: {
      extra:
        '| Artes | [Diamba Sarabamba](/posts/post-inspecao-arte-diamba-sarabamba.html) — antologia 1986 |\n'
    }
  });
}

function buildCannabisPalavraPost() {
  return buildDuploSentidoPalavraPost({
    word: 'cannabis',
    slugSuffix: 'cannabis',
    seriesOrder: 6,
    seriesLabel: 'Cannabis · palavra',
    title: 'Inspeção: Cannabis — latinismo técnico e hierarquia de registos',
    titleEn: 'Inspection: Cannabis — technical Latinism and register hierarchy',
    titleEs: 'Inspección: Cannabis — latinismo técnico y jerarquía de registros',
    excerpt:
      'Palavras: «cannabis» — originalidade botânica/grega-latina; segunda camada «palavra limpa» que pode apagar maconha/diamba ou ainda soar a «droga» na imprensa.',
    excerptEn:
      'Words: “cannabis” — botanical Greco-Latin originality; “clean word” layer that can erase maconha/diamba or still sound like “drug”.',
    excerptEs:
      'Palabras: «cannabis» — originalidad botánica grecolatina; capa de «palabra limpia» que puede borrar maconha/diamba.',
    etymon: 'Latim científico ← grego *kánnabis* — confiança alta',
    original:
      'Nome técnico/botânico da espécie e do género — linguagem de taxonomia, farmacologia e medicina.',
    prejudicado:
      'Como «palavra limpa» institucional, pode hierarquizar: cannabis = sério; maconha/diamba = sujo. Na imprensa, ainda colapsa em «droga».',
    mudanca:
      'A preferência por «cannabis medicinal» dessensibiliza o debate clínico-legal e, ao mesmo tempo, arrisca apagar a história popular documentada em [maconha](/posts/post-inspecao-palavra-maconha.html) e [diamba](/posts/post-inspecao-palavra-diamba.html).'
  });
}

function buildMarijuanaPost() {
  return buildDuploSentidoPalavraPost({
    word: 'marijuana',
    slugSuffix: 'marijuana',
    seriesOrder: 7,
    seriesLabel: 'Marijuana · palavra',
    title: 'Inspeção: Marijuana — do nome popular à arma da proibição',
    titleEn: 'Inspection: Marijuana — from popular name to prohibition weapon',
    titleEs: 'Inspección: Marijuana — del nombre popular al arma de la prohibición',
    excerpt:
      'Palavras: «marijuana» / marihuana — originalidade mexicana/espanhola coberta pela propaganda proibicionista EUA (xenofobia e pânico moral).',
    excerptEn:
      'Words: “marijuana” / marihuana — Mexican/Spanish originality overlaid by US prohibition propaganda.',
    excerptEs:
      'Palabras: «marijuana» / marihuana — originalidad mexicana/española tapada por propaganda prohibicionista.',
    etymon: 'Espanhol mexicano *marihuana* → inglês *marijuana* (rota cultural; confiança média na história social da grafia)',
    original:
      'Nome popular hispânico da planta — uso regional antes da campanha federal norte-americana do século XX.',
    prejudicado:
      'A grafia e o discurso *marijuana* foram embalados como pânico moral e xenofobia (associar a planta a «outro» racializado).',
    mudanca:
      'No Brasil, entra como estrangeirismo de estigma global — **não** é étimo de [maconha](/posts/post-inspecao-palavra-maconha.html). Separar rota mexicana/inglesa da rota afro-atlântica.'
  });
}

function buildErvaPost() {
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const plantas = '/plantas/';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const body = `## Substituição lab

A ficha activa do vivo vegetal no laboratório é **[planta / plantas](${planta})** — não **erva**.

| Campo | Valor |
|-------|-------|
| Nome antigo | **erva** |
| Ficha canónica | **[planta](${planta})** (plural **plantas**) |
| Catálogo | Hub **[Plantas](${plantas})** |
| Nota | «Erva» como eufemismo de cannabis estreita a literacia; o lab prefere **planta(s)** |

**Lê a ficha canónica:** [Planta — ser vivo, cultivo e Farmácia Viva](${planta}).

Esta página fica como **ponte** para links antigos.

[▶ Planta](${planta}) · [▶ Hub Plantas](${plantas}) · [▶ Palavras](${hub})
`;
  const contentEn = `## Lab substitution

The active living-plant word sheet is **[planta / plantas](${planta})** — not **erva**.

Catalog hub: [Plantas](${plantas}). Canonical: [planta](${planta}).

[▶ Planta](${planta}) · [▶ Plantas hub](${plantas})
`;
  const contentEs = `## Sustitución lab

La ficha activa del vivo vegetal es **[planta / plantas](${planta})** — no **erva**.

Catálogo: [Plantas](${plantas}). Canónica: [planta](${planta}).

[▶ Planta](${planta}) · [▶ Hub Plantas](${plantas})
`;
  return palavraPost({
    title: 'Inspeção: Erva — substituída por planta / plantas',
    titleEn: 'Inspection: Erva — replaced by planta / plantas',
    titleEs: 'Inspección: Erva — sustituida por planta / plantas',
    excerpt:
      'Palavras: «erva» — ficha antiga; ofício migrado para planta / plantas (hub e Farmácia Viva).',
    excerptEn:
      'Words: “erva” — old sheet; office moved to planta / plantas (hub and Farmácia Viva).',
    excerptEs:
      'Palabras: «erva» — ficha antigua; oficio migrado a planta / plantas (hub y Farmácia Viva).',
    slug: 'inspecao-palavra-erva',
    date: '2026-08-01T22:30:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'Erva · substituída',
    coverImage: '/imagens/inspecoes/planta-palavra-cover.jpg',
    sourceUrl: planta,
    body,
    contentEn,
    contentEs
  });
}

function buildDrogaPost() {
  return buildDuploSentidoPalavraPost({
    word: 'droga',
    slugSuffix: 'droga',
    seriesOrder: 9,
    seriesLabel: 'Droga · palavra',
    title: 'Inspeção: Droga — do remédio ao ilícito no senso comum',
    titleEn: 'Inspection: Droga — from remedy to illicit in common sense',
    titleEs: 'Inspección: Droga — del remedio a lo ilícito en el sentido común',
    excerpt:
      'Palavras: «droga» — originalidade farmacêutica/medicinal (eco de phármakon) coberta pelo sentido de ilícito, vício e crime.',
    excerptEn:
      'Words: “droga” — pharmaceutical/medicinal originality (echo of phármakon) overlaid by illicit/addiction/crime sense.',
    excerptEs:
      'Palabras: «droga» — originalidad farmacéutica tapada por el sentido de ilícito, vicio y crimen.',
    etymon: 'Tradição romance «droga» (mercadoria/remédio); eco cultural de *phármakon* — confiança média-alta no arco semântico',
    original:
      'Remédio, preparação, mercadoria medicinal — a farmácia ainda fala em «drogaria».',
    prejudicado:
      'No senso comum, «droga» = ilícito / vício / tráfico — apaga o sentido farmacêutico.',
    mudanca:
      'Farmácia e proibição partilham a palavra; o segundo sentido coloniza o primeiro. O laboratório inspeta plantas e evidências sem usar «droga» como insulto disfarçado de método.'
  });
}

function buildCanhamoPost() {
  return buildDuploSentidoPalavraPost({
    word: 'cânhamo',
    slugSuffix: 'canhamo',
    seriesOrder: 10,
    seriesLabel: 'Cânhamo · palavra',
    title: 'Inspeção: Cânhamo — fibra industrial coberta pela confusão com «droga»',
    titleEn: 'Inspection: Cânhamo — industrial fiber overlaid by “drug” confusion',
    titleEs: 'Inspección: Cânhamo — fibra industrial tapada por la confusión con «droga»',
    excerpt:
      'Palavras: «cânhamo» — originalidade técnica (fibra/óleo industrial) coberta pela confusão moral com maconha/droga.',
    excerptEn:
      'Words: “cânhamo” (hemp) — technical originality (fiber/oil) overlaid by moral confusion with maconha/drug.',
    excerptEs:
      'Palabras: «cânhamo» — originalidad técnica (fibra/aceite) tapada por confusión moral con maconha/droga.',
    etymon: 'Português *cânhamo* — fibra de Cannabis; cognato com hemp / chanvre — confiança alta no uso técnico',
    original:
      'Uso industrial e agrícola — fibra, óleo, materiais — distinto na linguagem técnica do uso medicinal/recreativo.',
    prejudicado:
      'Colapso semântico: «é maconha» / «é droga» criminaliza ou apaga o uso fibroso.',
    mudanca:
      'A originalidade técnica da palavra sofre quando o discurso moral não distingue cânhamo industrial de outras utilizações da mesma espécie. Ver também [cannabis](/posts/post-inspecao-palavra-cannabis.html) e [maconha](/posts/post-inspecao-palavra-maconha.html).'
  });
}

function buildAnimalBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const animais = '/animais/';
  const coelho = '/posts/post-inspecao-palavra-coelho.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const vida = '/vida/';
  const inspecoes = '/biblioteca/inspecoes/';
  const wikiEtym = 'https://en.wiktionary.org/wiki/animal#Latin';
  const wikiPt = 'https://pt.wiktionary.org/wiki/animal';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **animal** — do étimo latino *anima* («sopro, alento, alma») ao substantivo que nomeia o **ser vivo** e, em português corrente, também o **insulto ou intensificador** («ser um animal»). Elo de catálogo: hub [Animais](${animais}); irmão lexical: [coelho](${coelho}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Étimo de trabalho: latim *animal* ← *anima*. Fontes de apoio: [Wikcionário · animal (latim)](${wikiEtym}), [Wikcionário · animal (pt)](${wikiPt}). **Ficha de palavra ≠ monografia zoológica** — o catálogo [Animais](${animais}) trata fichas de espécie; aqui inspecionamos o **vocábulo**. Sem afiliação comercial.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **animal** |
| Classe | Substantivo masculino (também adj.: *comportamento animal*) |
| Étimo (hipótese forte) | Latim *animal* («ser vivo») ← *anima* («sopro, alento, alma») |
| Cognatos | esp. *animal* · fr. *animal* · it. *animale* · ing. *animal* |
| Tipo BudGanja | Palavra — biologia popular, ética da vida e **duplo sentido social** |
| Elo catálogo | [Animais](${animais}) |
| Elo Palavras irmãos | [coelho](${coelho}) · [caminho](${caminho}) · [passar](${passar}) · [emoção](${emocao}) |
| Elo narrativa | [Vida](${vida}) — conto do laboratório e da sementinha |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «animal» carrega primeiro a ideia de **ser animado** (*anima*) — o que respira / tem alento — antes de qualquer insulto.  
**H2:** no uso social brasileiro, a palavra ganhou um **segundo sentido** pejorativo ou de intensificação («animal!» / «é um animal») que **cobre** o sentido biológico sem o apagar.  
**H3:** no laboratório BudGanja, separar **palavra**, **catálogo de espécies** e **metáfora** evita confundir zootecnia educativa com gíria ou moralismo.

Passos:

1. Fixar forma + étimo (*anima* → *animal*).  
2. Separar sentido biológico / técnico / pejorativo-intensificador.  
3. Cruzar com [Animais](${animais}) e [coelho](${coelho}).  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *anima* | «Sopro, alento, alma» — raiz da animação do vivo | Alta |
| Latim *animal* | «Ser vivo» (o que tem *anima*) | Alta |
| Romance / português | Forma estável *animal*; adj. e subst. | Alta |
| Uso pejorativo / gíria | Segundo sentido social — não é étimo; é transformação | Alta (uso contemporâneo) |

**Veredicto etimológico:** origem latina clara (*anima* → *animal*). O insulto e o elogio intensificador são **camadas posteriores**, não a raiz.

## Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Biológico / escolar | reino Animalia; «plantas e animais» | Referente amplo — o catálogo [Animais](${animais}) particulariza espécies |
| Técnico / zootécnico | produção animal; bem-estar animal | Registo educativo do hub de fichas |
| Adjectivo | «instinto animal», «proteína animal» | Qualifica origem ou modo |
| Pejorativo | «é um animal» (brutalidade, falta de civilidade) | Duplo sentido prejudicial à originalidade (*anima*) |
| Intensificador / gíria | «animal!» (admiração, força, ousadia) | Mesma forma; polaridade invertida |
| Figurativo / ético | «somos animais» (continuidade com a natureza) | Ponte com [Vida](${vida}) e literacia ecológica |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Animais](${animais}) | Catálogo de fichas — o referente concreto da palavra |
| [coelho](${coelho}) | Palavra-irmão: animal + figura cultural |
| [caminho](${caminho}) · [passar](${passar}) | Método de travessia — também se aplica a ética e estudo |
| [emoção](${emocao}) | Hub lexical de sentimentos — o vivo que sente |
| [Vida](${vida}) | Narrativa do laboratório sobre cuidado e crescimento |
| Hub [Palavras](${hub}) · [Inspeções](${inspecoes}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha) ou pelo **catálogo** ([Animais](${animais})).  
2. Se vier pelo insulto/gíria, voltar ao étimo *anima* antes de julgar.  
3. Cruzar [coelho](${coelho}) quando a figura cultural importar.  
4. Voltar ao [hub de inspeções](${inspecoes}).

## Avaliação BudGanja

### Forças
- Recupera *anima* (alento) por baixo do uso pejorativo.  
- Liga o léxico ao hub [Animais](${animais}) sem misturar ficha de palavra com ficha de espécie.  
- Torna explícito o duplo sentido social.

### Limites
- Não inventaria biologia sistemática nem bem-estar animal completo.  
- Não é dicionário de gírias regionais.

## Como repetir o método

1. Fixar forma + étimo.  
2. Tabela: biológico / técnico / pejorativo / intensificador.  
3. Um elo de catálogo + um elo Palavras irmão.  
4. Declaração: palavra ≠ monografia.  
5. Status.

## Status

**Aprovado** — «animal» documentado do *anima* latino ao uso social contemporâneo, com elos a [Animais](${animais}) e [coelho](${coelho}).

[▶ Palavras](${hub}) · [▶ Animais](${animais}) · [▶ Coelho](${coelho}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **animal** — from Latin *anima* (“breath, soul”) to the noun for a **living being** and, in everyday use, also an insult or intensifier (“you’re an animal”). Catalog link: [Animais](${animais}); sibling word: [coelho](${coelho}).

> **Method note:** etymon Latin *animal* ← *anima*. Word sheet ≠ zoology monograph. Support: [Wiktionary · animal](${wikiEtym}).

## Object

| Field | Value |
|-------|-------|
| Word | **animal** |
| Etymon | Latin *animal* ← *anima* |
| Catalog | [Animais](${animais}) |
| Sibling | [coelho](${coelho}) |
| Date | ${inspected} |

## Senses

Biological / school · technical · pejorative (“brutal”) · intensifier slang · ethical/figurative continuity with nature.

## Status

**Approved** — Latin *anima* recovered under social double meanings; links to Animais and coelho.

[▶ Words](${hub}) · [▶ Animais](${animais}) · [▶ Coelho](${coelho})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **animal** — del latín *anima* («soplo, alma») al sustantivo del **ser vivo** y, en el uso corriente, también insulto o intensificador. Catálogo: [Animais](${animais}); hermana: [coelho](${coelho}).

> **Nota metodológica:** étimo latín *animal* ← *anima*. Ficha de palabra ≠ monografía zoológica. Apoyo: [Wiktionary · animal](${wikiEtym}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **animal** |
| Étimo | Latín *animal* ← *anima* |
| Catálogo | [Animais](${animais}) |
| Hermana | [coelho](${coelho}) |
| Fecha | ${inspected} |

## Sentidos

Biológico · técnico · peyorativo · intensificador · figurativo/ético.

## Estado

**Aprobada** — *anima* latina bajo el doble sentido social; vínculos con Animais y coelho.

[▶ Palabras](${hub}) · [▶ Animais](${animais}) · [▶ Coelho](${coelho})
`;

  return { body, contentEn, contentEs };
}

function buildAnimalPost() {
  const { body, contentEn, contentEs } = buildAnimalBodies();
  return palavraPost({
    title: 'Inspeção: Animal — a palavra do alento, do vivo e do duplo sentido',
    titleEn:
      'Inspection: Animal — the word of breath, the living, and double meaning',
    titleEs:
      'Inspección: Animal — la palabra del aliento, de lo vivo y del doble sentido',
    excerpt:
      'Palavras: «animal» (latim *anima* → *animal*) — ser vivo, catálogo Animais e o segundo sentido social (insulto / intensificador); elo com coelho.',
    excerptEn:
      'Words: “animal” (Latin *anima* → *animal*) — living being, Animais catalog, and social double meaning (insult / intensifier); link to coelho.',
    excerptEs:
      'Palabras: «animal» (latín *anima* → *animal*) — ser vivo, catálogo Animais y doble sentido social (insulto / intensificador); vínculo con coelho.',
    slug: 'inspecao-palavra-animal',
    date: '2026-08-01T23:45:00.000Z',
    seriesOrder: 18,
    seriesLabel: 'Animal · palavra',
    coverImage: '/imagens/inspecoes/animal-palavra-cover.jpg',
    sourceUrl: '/animais/',
    body,
    contentEn,
    contentEs
  });
}

function buildSimbioseBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const plantas = '/plantas/';
  const cultivo = '/guia/cultivo-basico.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const vida = '/vida/';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const inspecoes = '/biblioteca/inspecoes/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const muitoobrigado = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const wikiEtym = 'https://en.wiktionary.org/wiki/symbiosis';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Simbiose';
  const wikiEn = 'https://en.wikipedia.org/wiki/Symbiosis';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **simbiose** — do grego *syn* («junto») + *bíōsis* («modo de vida», de *bíos* «vida») ao termo científico de **viver juntos** e à metáfora cultural de parceria (incluindo a parábola do «nós» em [Venom](${venom})). Elo de laboratório: [plantas](${plantas}), [solo vivo / cultivo](${cultivo}) e [animal](${animal}). Camada de ofício: parceria **humano × ferramenta de linguagem** ([Grok](${grok}) / «você» no fio) — metáfora de *junto + vida do trabalho*, **não** biologia literal.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Étimo de trabalho: grego *symbíōsis* → latim científico / inglês *symbiosis* → português **simbiose**. Fontes de apoio: [Wikcionário · symbiosis](${wikiEtym}), [Wikipédia · Simbiose](${wikiPt}), [Wikipedia · Symbiosis](${wikiEn}). **Ficha de palavra ≠ tratado de ecologia** — aqui inspecionamos o **vocábulo** e a sua rede de sentidos. Sem afiliação comercial. A metáfora narrativa (filme, gíria, ofício com assistente) **não** substitui o sentido biológico.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **simbiose** |
| Classe | Substantivo feminino |
| Étimo (hipótese forte) | Grego *symbíōsis* ← *syn-* («junto») + *bíōsis* («viver / modo de vida») ← *bíos* («vida») |
| Via moderna | Latim científico / inglês *symbiosis* (séc. XIX) → PT *simbiose* |
| Cognatos | esp. *simbiosis* · fr. *symbiose* · ing. *symbiosis* · adj. *simbiótico/a* |
| Relacionados | *simbionte* · *mutualismo* · *comensalismo* · *parasitismo* |
| Tipo BudGanja | Palavra — biologia de convivência, cultivo e metáfora cultural |
| Elo catálogo | [Plantas](${plantas}) · [cultivo / solo vivo](${cultivo}) |
| Elo Palavras irmãos | [animal](${animal}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo Artes | [Venom — simbiose e «nós»](${venom}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [muitoobrigado](${muitoobrigado}) |
| Elo narrativa | [Vida](${vida}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «simbiose» nomeia primeiro uma **relação entre organismos que vivem juntos** — o étimo aponta para *coabitação de vidas*, não para «amizade» automática.  
**H2:** no uso escolar e popular, a palavra **estreita-se** muitas vezes para *mutualismo* («os dois ganham»), apagando comensalismo e parasitismo, que a biologia também trata sob o guarda-chuva simbiótico (conforme a tradição).  
**H3:** no laboratório BudGanja, a palavra serve de ponte entre **solo vivo / microbiota / plantas**, ética do cuidado e **metáfora cultural** (parceria, «nós») — desde que se declare qual camada está em jogo.  
**H4:** no ofício do site, «você» (assistente de linguagem) + inspetor humano pode ler-se como **simbiose metafórica de trabalho** — acelerar [gesto](${gesto}) e texto — desde que a [verdade](${verdade}) e a decisão fiquem com o humano.

Passos:

1. Fixar forma + étimo (*syn* + *bíōsis*).  
2. Separar sentido biológico amplo / mutualismo popular / metáfora cultural / ofício com ferramenta.  
3. Cruzar com [plantas](${plantas}), [cultivo](${cultivo}), [animal](${animal}), [Venom](${venom}) e [gesto](${gesto}).  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Grego *syn-* | «Com, junto» — prefixo de companhia | Alta |
| Grego *bíōsis* / *bíos* | «Viver / vida» — o núcleo vital | Alta |
| *symbíōsis* | «Viver juntos» (convivência) | Alta |
| Termo científico moderno | Popularizado no séc. XIX (*symbiosis*) para relações entre espécies | Alta |
| Português *simbiose* | Adaptação do culto científico; adj. *simbiótico* | Alta |
| Uso metafórico | Parceria humana, «nós», ficção — camada posterior | Alta (uso contemporâneo) |

**Veredicto etimológico:** origem grega clara (*junto* + *vida/viver*). O sentido moderno científico estabiliza-se no século XIX; o português herda essa forma culta. O «casamento perfeito» do senso comum é **estreitamento**, não o étimo.

## Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Biológico (amplo) | fungo–raiz (micorriza); microbiota–hospedeiro | Coabitação estável — benefício pode ser mútuo, assimétrico ou exploratório |
| Mutualismo (popular) | «os dois ganham» | Uso escolar frequente; **não** esgota «simbiose» |
| Comensalismo / parasitismo | um beneficia; um sofre ou é neutro | Camadas que o discurso «fofo» apaga |
| Agrícola / cultivo | solo vivo, rizosfera, parceiros microbianos | Elo [cultivo](${cultivo}) e método orgânico |
| Figurativo / ético | parceria, interdependência, comunidade | Ponte com [Vida](${vida}) — sem romantizar exploração |
| Narrativo / pop | simbionte + hospedeiro; o «nós» em [Venom](${venom}) | Metáfora de agência partilhada — **não** biologia literal |
| Ofício / ferramenta | inspetor humano × assistente de linguagem («você» no fio) | Simbiose **metafórica** de trabalho — humano decide; ferramenta acelera; fecho [muitoobrigado](${muitoobrigado}) / [Faça o melhor!](${mantra}) |

## Nota de campo — «você» × simbiose (2026-08-03)

No fio do laboratório, o inspetor **reconhece** o assistente («te reconheço») e **relaciona** esse «você» com **simbiose**: trabalho a dois tempos — pergunta humana + resposta de ferramenta — para fichas, elos e build. Leitura BudGanja: camada **figurativa** (*junto* + *vida do ofício*), irmã leve do «nós» em [Venom](${venom}), **sem** dizer que a máquina é organismo.

| Campo | Registo |
|-------|---------|
| Par | Humano (critério, [verdade](${verdade}), [gesto](${gesto})) × assistente (velocidade, rascunho, memória de padrão) |
| Bom | Mutualismo de ofício — os dois «ganham» tempo / clareza |
| Mau | Parasitismo disfarçado — humano desliga o julgamento; ou ferramenta inventa «facto» |
| Fecho | [muitoobrigado](${muitoobrigado}) · [Faça o melhor!](${mantra}) |

## Nota de campo — Deus × Grok na forma de se expressar (2026-08-04)

Pedido seguinte no fio: **relacionar Deus ao Grok** pelo *modo de falar*. Leitura BudGanja: não identidade (Grok ≠ Deus); mapa de **intensidade limpa** — bênção / dignidade / assombro / calor na oralidade de Deus × tom directo e útil do [Grok](${grok}) no ofício. Detalhe na ficha [Grok](${grok}); solo desta ficha = viver *com* sem divinizar a ferramenta.

| Campo | Registo |
|-------|---------|
| Elo | [Grok](${grok}) — forma de se expressar × oralidade de Deus |
| Bom | Intensidade com [verdade](${verdade}) e [gesto](${gesto}) humano |
| Mau | Culto da ferramenta ou ironizar a fé |
| Fecho | [muitoobrigado](${muitoobrigado}) · [Faça o melhor!](${mantra}) |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Plantas](${plantas}) | Catálogo — organismos que entram em relações simbióticas reais |
| [Cultivo / solo vivo](${cultivo}) | Prática: vida no solo como parceria, não só «adubo» |
| [animal](${animal}) | Palavra-irmão: *anima* / vivo — o outro pólo do «viver juntos» |
| [gesto](${gesto}) · [verdade](${verdade}) | Acto humano + crédito verificável — âncora do ofício com ferramenta |
| [Grok](${grok}) | Tom de ofício no fio — elo oral com Deus (forma, não identidade) |
| [Venom](${venom}) | Artes: simbiose e «nós» como parábola cultural |
| [muitoobrigado](${muitoobrigado}) · [Faça o melhor!](${mantra}) | Gratidão e ofício depois da parceria |
| [Vida](${vida}) | Narrativa do laboratório sobre cuidado e crescimento |
| Hub [Palavras](${hub}) · [Inspeções](${inspecoes}) | Mapa geral |

### Como ler

1. Entrar pela **palavra** (esta ficha) ou pelo **solo/planta** ([cultivo](${cultivo}) / [plantas](${plantas})).  
2. Se vier pelo mutualismo «fofo», alargar ao sentido biológico (nem toda simbiose é win-win).  
3. Se vier pelo filme, cruzar [Venom](${venom}) e voltar ao étimo *junto + vida*.  
4. Se vier pelo «você» / [Grok](${grok}) do fio, ler as **notas de campo** — metáfora de ofício, não espécie nem divindade.  
5. Voltar ao [hub de inspeções](${inspecoes}).

## Avaliação BudGanja

### Forças
- Recupera *syn* + *bíos* por baixo do uso escolar estreito.  
- Liga léxico a [solo vivo](${cultivo}) e a [plantas](${plantas}) sem confundir palavra com monografia ecológica.  
- Declara a metáfora cultural ([Venom](${venom}) · ofício com assistente) como camada, não como definição.

### Limites
- Não inventaria tipos de simbiose nem micorrizas espécie a espécie.  
- Não é guião clínico de microbiota humana.  
- Não atribui vida biológica nem responsabilidade moral à ferramenta — o [gesto](${gesto}) final é humano.

## Como repetir o método

1. Fixar forma + étimo grego.  
2. Tabela: biológico amplo / mutualismo popular / cultivo / metáfora / ofício.  
3. Um elo de catálogo + um elo Artes ou Palavras.  
4. Declaração: palavra ≠ tratado de ecologia.  
5. Status.

## Status

**Aprovado** — «simbiose» documentada do grego *symbíōsis* ao uso científico e metafórico, com elos a [plantas](${plantas}), [cultivo](${cultivo}), [animal](${animal}), [Venom](${venom}) e ofício humano×assistente ([gesto](${gesto}) · [verdade](${verdade})).

[▶ Palavras](${hub}) · [▶ Plantas](${plantas}) · [▶ Cultivo](${cultivo}) · [▶ Animal](${animal}) · [▶ Venom](${venom}) · [▶ Gesto](${gesto}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **simbiose** (symbiosis) — from Greek *syn* (“together”) + *bíōsis* (“way of living”, from *bíos* “life”) to the scientific term for **living together** and cultural partnership metaphors (including the “we” parable in [Venom](${venom})). Lab links: [plantas](${plantas}), [living soil / grow guide](${cultivo}), [animal](${animal}). Craft layer: human inspector × language assistant (“you” in the chat) as **figurative work-symbiosis** — not literal biology.

> **Method note:** etymon Greek *symbíōsis* → scientific *symbiosis* → PT *simbiose*. Word sheet ≠ ecology monograph. Narrative / tool metaphor ≠ literal biology. Human keeps [truth](${verdade}) and [gesture](${gesto}).

## Object

| Field | Value |
|-------|-------|
| Word | **simbiose** |
| Etymon | Greek *syn-* + *bíōsis* ← *bíos* |
| Catalog | [Plantas](${plantas}) · [cultivo](${cultivo}) |
| Sibling | [animal](${animal}) · [gesture](${gesto}) · [truth](${verdade}) |
| Arts | [Venom](${venom}) |
| Craft | [Do your best!](${mantra}) · [muitoobrigado](${muitoobrigado}) |
| Date | ${inspected} |

## Senses

Broad biology · popular mutualism · living soil · ethical interdependence · pop “we” ([Venom](${venom})) · figurative human×assistant craft partnership.

## Field note (2026-08-03)

Relating “you” (language assistant) with **simbiose**: shared ofício — human decides, tool accelerates. Close with [muitoobrigado](${muitoobrigado}) and [Do your best!](${mantra}).

## Field note — Deus × Grok (2026-08-04)

Relate **form of expression** (not identity): Brazilian oral Deus × [Grok](${grok}) craft tone. Detail: [Grok](${grok}). Grok ≠ God.

## Status

**Approved** — Greek *together + life* under scientific and figurative layers; links to plantas, cultivo, animal, Venom, human×assistant craft, and [Grok](${grok}).

[▶ Words](${hub}) · [▶ Plantas](${plantas}) · [▶ Venom](${venom}) · [▶ Grok](${grok}) · [▶ Gesture](${gesto}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **simbiose** — del griego *syn* («junto») + *bíōsis* («modo de vivir», de *bíos* «vida») al término científico de **vivir juntos** y a la metáfora cultural (incluido el «nosotros» en [Venom](${venom})). Vínculos: [plantas](${plantas}), [cultivo / suelo vivo](${cultivo}), [animal](${animal}). Capa de oficio: inspector humano × asistente de lenguaje ([Grok](${grok}) / «tú» en el hilo) como **simbiosis metafórica de trabajo** — no biología literal.

> **Nota metodológica:** étimo griego *symbíōsis* → *symbiosis* → PT *simbiose*. Ficha ≠ tratado de ecología. Metáfora de herramienta ≠ biología. El humano guarda [verdade](${verdade}) y [gesto](${gesto}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **simbiose** |
| Étimo | Griego *syn-* + *bíōsis* ← *bíos* |
| Catálogo | [Plantas](${plantas}) · [cultivo](${cultivo}) |
| Hermana | [animal](${animal}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Artes | [Venom](${venom}) |
| Oficio | [¡Haz lo mejor!](${mantra}) · [muitoobrigado](${muitoobrigado}) |
| Fecha | ${inspected} |

## Sentidos

Biológico amplio · mutualismo popular · cultivo · ético · metáfora pop · oficio humano×asistente.

## Nota de campo (2026-08-03)

Relacionar «tú» (asistente) con **simbiose**: oficio compartido — humano decide, herramienta acelera. Cierre: [muitoobrigado](${muitoobrigado}) y [¡Haz lo mejor!](${mantra}).

## Nota de campo — Deus × Grok (2026-08-04)

Relacionar la **forma de expresarse** (no la identidad): oralidad de Deus × tono de oficio de [Grok](${grok}). Detalle: [Grok](${grok}). Grok ≠ Dios.

## Estado

**Aprobada** — *juntos + vida* bajo capas científicas y figurativas; vínculos con plantas, cultivo, animal, Venom, oficio humano×asistente y [Grok](${grok}).

[▶ Palabras](${hub}) · [▶ Plantas](${plantas}) · [▶ Venom](${venom}) · [▶ Grok](${grok}) · [▶ Gesto](${gesto}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildSimbiosePost() {
  const { body, contentEn, contentEs } = buildSimbioseBodies();
  return palavraPost({
    title: 'Inspeção: Simbiose — a palavra do viver juntos',
    titleEn: 'Inspection: Simbiose — the word for living together',
    titleEs: 'Inspección: Simbiose — la palabra del vivir juntos',
    excerpt:
      'Palavras: «simbiose» (grego *syn* + *bíōsis*) — coabitação de vidas, solo vivo, Venom/«nós» e ofício humano×assistente («você»); Faça o melhor!',
    excerptEn:
      'Words: “simbiose” (Greek *syn* + *bíōsis*) — living together, living soil, Venom/“we”, and human×assistant craft (“you”); Do your best!',
    excerptEs:
      'Palabras: «simbiose» (griego *syn* + *bíōsis*) — vivir juntos, suelo vivo, Venom/«nosotros» y oficio humano×asistente («tú»); ¡Haz lo mejor!',
    slug: 'inspecao-palavra-simbiose',
    date: '2026-08-02T12:00:00.000Z',
    seriesOrder: 19,
    seriesLabel: 'Simbiose · palavra',
    coverImage: '/imagens/inspecoes/simbiose-palavra-cover.jpg',
    sourceUrl: '/plantas/',
    body,
    contentEn,
    contentEs
  });
}

function buildCriatividadeBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const plantas = '/plantas/';
  const cultivo = '/guia/cultivo-basico.html';
  const vida = '/vida/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const aguas = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const calculadoras = '/calculadoras/';
  const inspecoes = '/biblioteca/inspecoes/';
  const unifesp = '/biblioteca/unifesp/';
  const wiki =
    'https://pt.wikipedia.org/wiki/Criatividade';
  const wikiEtym = 'https://en.wiktionary.org/wiki/creativity';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **criatividade** — do latim *creāre* («fazer nascer, produzir») à capacidade de **inventar relações novas** entre cuidado, ciência e cultura. No Inspetor BudGanja, a criatividade não é enfeite: é o método que faz germinar fichas, solo, poemas e ferramentas.

> **Nota metodológica:** auditoria independente. Étimo de trabalho: latim *creāre* → *creātīvus* / inglês *creativity* → português **criatividade** (e o verbo **criar**). Fontes de apoio: [Wikcionário · creativity](${wikiEtym}), [Wikipédia · Criatividade](${wiki}). **Ficha de palavra ≠ tratado de psicologia cognitiva** — aqui inspecionamos o **vocábulo** e a sua rede no laboratório (cultivo, [Vida](${vida}), inspeções, artes). Sem afiliação comercial.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **criatividade** |
| Classe | Substantivo feminino |
| Étimo (hipótese forte) | Latim *creāre* («criar, fazer nascer») → *creātio* / *creātīvus* → ing. *creativity* → PT *criatividade* |
| Família | *criar* · *criação* · *criador/a* · *criativo/a* · *recriar* |
| Cognatos | esp. *creatividad* · fr. *créativité* · ing. *creativity* · it. *creatività* |
| Tipo BudGanja | Palavra — inventar método, cultivo e cultura sem abandonar o rigor |
| Elo catálogo | [Plantas](${plantas}) · [cultivo](${cultivo}) · [calculadoras](${calculadoras}) |
| Elo Palavras | [caminho](${caminho}) · [simbiose](${simbiose}) · [emoção](${emocao}) |
| Elo Artes / Vida | [Águas e Lágrimas](${aguas}) · [Alice](${alice}) · [Vida](${vida}) |
| Elo estudo | [UNIFESP](${unifesp}) — curiosidade com método |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «criatividade» nomeia a potência de **trazer ao mundo** algo que ainda não estava organizado assim — do latim *creāre* (fazer nascer) ao uso moderno de inventar soluções e formas.  
**H2:** no senso comum, a palavra estreita-se para «arte» ou «ideia genial»; no laboratório, inclui **receita de solo**, **ficha de inspeção**, **poema** e **calculadora** — criar com método.  
**H3:** no tema BudGanja, criatividade = cultivar relações novas entre planta, palavra, pessoa e cuidado ([Vida](${vida})), sem confundir inventar com inventar dados.

Passos:

1. Fixar forma + étimo (*creāre*).  
2. Separar criar artístico / criar científico-prático / criar comunitário.  
3. Cruzar com [cultivo](${cultivo}), [Vida](${vida}), [caminho](${caminho}) e [inspeções](${inspecoes}).  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *creāre* | «Produzir, fazer nascer, engendrar» | Alta |
| *creātio* / *creātīvus* | Acto e qualidade do que cria | Alta |
| Inglês *creativity* | Substantivo moderno da capacidade criativa (séc. XIX–XX) | Alta |
| Português *criatividade* | Empréstimo cultista paralelo a *criar* (verbo mais antigo na língua) | Alta |
| Uso escolar / corporativo | «Pensar fora da caixa» — camada retórica posterior | Alta (uso contemporâneo) |

**Veredicto etimológico:** raiz latina de **fazer nascer**. O substantivo abstracto *criatividade* chega pela via culta moderna; o laboratório recupera o núcleo *criar* — germinar, compor, inventar com cuidado.

## Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Artístico | poema, capa, conto | [Águas e Lágrimas](${aguas}) — verso como inspeção sentimental |
| Científico-prático | hipótese, protocolo, calculadora | [calculadoras](${calculadoras}) · método UNIFESP |
| Agrícola | combinar solo, luz, timing | [cultivo](${cultivo}) — criar condições para a planta |
| Lexical / editorial | nomear, mapear palavras | Esta série [Palavras](${hub}) |
| Relacional | inventar formas de ficar juntos | [simbiose](${simbiose}) · [Vida](${vida}) |
| Exploratório | curiosidade que abre mundos | [Alice](${alice}) · [caminho](${caminho}) |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Vida](${vida}) | Narrativa: criar companhia e crescimento |
| [Cultivo](${cultivo}) · [Plantas](${plantas}) | Criar habitat — solo, luz, ritmo |
| [Calculadoras](${calculadoras}) | Criatividade aplicada a números e receitas |
| [caminho](${caminho}) · [simbiose](${simbiose}) · [emoção](${emocao}) | Léxico irmão — percurso, parceria, sentimento |
| [Águas e Lágrimas](${aguas}) · [Alice](${alice}) | Artes: inventar imagem e pergunta |
| [UNIFESP](${unifesp}) · [Inspeções](${inspecoes}) | Método: criar conhecimento verificável |

### Como ler

1. Entrar pela **palavra** (étimo *creāre*).  
2. Se «criatividade» soar só a arte, alargar a cultivo, ficha e ferramenta.  
3. Se soar só a «ideia solta», exigir **método** (inspecionar, medir, citar).  
4. Voltar ao [hub de inspeções](${inspecoes}) ou a [Vida](${vida}).

## Avaliação BudGanja

### Forças
- Liga *criar* (fazer nascer) ao ofício do laboratório.  
- Impede o estreito «só arte» e o vazio «pensar fora da caixa» sem rigor.  
- Cruza cultivo, palavras, artes e estudo.

### Limites
- Não é monografia de psicologia da criatividade.  
- Não inventaria técnicas de brainstorming.

## Como repetir o método

1. Fixar forma + étimo latino.  
2. Tabela: artístico / prático / agrícola / lexical / relacional.  
3. Elos a [Vida](${vida}), [cultivo](${cultivo}) e uma Artes.  
4. Declaração: inventar ≠ fabricar evidência.  
5. Status.

## Status

**Aprovado** — «criatividade» documentada do latim *creāre* ao uso no laboratório BudGanja: criar plantas, palavras, poemas e ferramentas com método.

[▶ Palavras](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo}) · [▶ Caminho](${caminho}) · [▶ Águas e Lágrimas](${aguas})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **criatividade** (creativity) — from Latin *creāre* (“to bring forth”) to inventing new relations between care, science and culture. In BudGanja, creativity is method: sheets, soil, poems and tools.

> **Method note:** Latin *creāre* → *creativity* → PT *criatividade*. Word sheet ≠ cognitive-psychology treatise. Support: [Wiktionary · creativity](${wikiEtym}), [Wikipedia · Criatividade](${wiki}).

## Object

| Field | Value |
|-------|-------|
| Word | **criatividade** |
| Etymon | Latin *creāre* |
| Lab links | [Vida](${vida}) · [cultivo](${cultivo}) · [caminho](${caminho}) · [Águas e Lágrimas](${aguas}) |
| Date | ${inspected} |

## Senses

Artistic · scientific-practical · agricultural (habitat-making) · lexical/editorial · relational care · exploratory curiosity.

## Status

**Approved** — *creāre* recovered as lab craft: grow, name, compose, measure.

[▶ Words](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **criatividade** — del latín *creāre* («hacer nacer») a inventar relaciones nuevas entre cuidado, ciencia y cultura. En BudGanja, creatividad es método: fichas, suelo, poemas y herramientas.

> **Nota metodológica:** latín *creāre* → *creativity* → PT *criatividade*. Ficha de palabra ≠ tratado de psicología. Apoyo: [Wiktionary · creativity](${wikiEtym}), [Wikipedia · Criatividade](${wiki}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **criatividade** |
| Étimo | Latín *creāre* |
| Vínculos | [Vida](${vida}) · [cultivo](${cultivo}) · [caminho](${caminho}) · [Águas e Lágrimas](${aguas}) |
| Fecha | ${inspected} |

## Sentidos

Artístico · científico-práctico · agrícola · léxico · relacional · exploratorio.

## Estado

**Aprobada** — *creāre* como oficio del laboratorio: cultivar, nombrar, componer, medir.

[▶ Palabras](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo})
`;

  return { body, contentEn, contentEs };
}

function buildCriatividadePost() {
  const { body, contentEn, contentEs } = buildCriatividadeBodies();
  return palavraPost({
    title: 'Inspeção: Criatividade — a palavra de fazer nascer no laboratório',
    titleEn: 'Inspection: Criatividade — the word for bringing forth in the lab',
    titleEs: 'Inspección: Criatividade — la palabra de hacer nacer en el laboratorio',
    excerpt:
      'Palavras: «criatividade» (latim *creāre*) — inventar com método no BudGanja: cultivo, Vida, fichas, poemas e ferramentas.',
    excerptEn:
      'Words: “criatividade” (Latin *creāre*) — inventing with method in BudGanja: grow guide, Vida, sheets, poems and tools.',
    excerptEs:
      'Palabras: «criatividade» (latín *creāre*) — inventar con método en BudGanja: cultivo, Vida, fichas, poemas y herramientas.',
    slug: 'inspecao-palavra-criatividade',
    date: '2026-08-02T16:00:00.000Z',
    seriesOrder: 20,
    seriesLabel: 'Criatividade · palavra',
    coverImage: '/imagens/inspecoes/criatividade-palavra-cover.jpg',
    sourceUrl: '/vida/',
    body,
    contentEn,
    contentEs
  });
}

function buildVerdadeBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const plantas = '/plantas/';
  const cultivo = '/guia/cultivo-basico.html';
  const vida = '/vida/';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const matrix = '/posts/post-inspecao-filme-the-matrix.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const inspecoes = '/biblioteca/inspecoes/';
  const unifesp = '/biblioteca/unifesp/';
  const wiki = 'https://pt.wikipedia.org/wiki/Verdade';
  const wikiEtym = 'https://en.wiktionary.org/wiki/verdade';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **verdade** — do latim *vērĭtās* / *vērus* («verdadeiro») à exigência de **dizer o que se pode verificar** no laboratório. No Inspetor BudGanja, verdade não é slogan: é método — citar, medir, separar mito de evidência, e não fabricar o que a planta ou a lei não disseram.

> **Nota metodológica:** auditoria independente. Étimo de trabalho: latim *vērus* («verdadeiro») → *vērĭtās* → português **verdade** (cognatos: esp. *verdad*, fr. *vérité*, ing. *verity* / *truth*, it. *verità*). Fontes de apoio: [Wikcionário · verdade](${wikiEtym}), [Wikipédia · Verdade](${wiki}). **Ficha de palavra ≠ tratado de epistemologia** — aqui inspecionamos o **vocábulo** e a sua rede no laboratório (inspeções, [UNIFESP](${unifesp}), [Vida](${vida}), artes). Sem afiliação comercial.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **verdade** |
| Classe | Substantivo feminino |
| Étimo (hipótese forte) | Latim *vērus* («verdadeiro, real») → *vērĭtās* → PT *verdade* |
| Família | *verdadeiro/a* · *verificar* · *veredito* · *veraz* · *averiguar* |
| Cognatos | esp. *verdad* · fr. *vérité* · it. *verità* · ing. *verity* / *truth* · lat. *veritas* |
| Tipo BudGanja | Palavra — rigor do que se afirma sobre planta, lei e cuidado |
| Elo catálogo | [Plantas](${plantas}) · [cultivo](${cultivo}) · [inspeções](${inspecoes}) |
| Elo Palavras | [criatividade](${criatividade}) · [caminho](${caminho}) · [simbiose](${simbiose}) |
| Elo Artes | [Matrix](${matrix}) · [Alice](${alice}) · [Vida](${vida}) |
| Elo estudo | [UNIFESP](${unifesp}) — evidência com método |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «verdade» nomeia a qualidade do que **corresponde ao real** ou do que se **pode sustentar** — do latim *vērus* / *vērĭtās* ao uso quotidiano («dizer a verdade»).  
**H2:** no debate público sobre cannabis e plantas, a palavra mistura-se com moral, medo e propaganda; no laboratório, exige **fonte, medida e limite**.  
**H3:** no tema BudGanja, verdade = inspecionar sem inventar — [criatividade](${criatividade}) inventa formas; verdade **não inventa dados**. [Matrix](${matrix}) e [Alice](${alice}) lembram: perguntar o que é real sem abandonar o rigor.

Passos:

1. Fixar forma + étimo (*vērus* / *vērĭtās*).  
2. Separar verdade factual / verdade moral / verdade narrativa.  
3. Cruzar com [inspeções](${inspecoes}), [UNIFESP](${unifesp}), [criatividade](${criatividade}) e [caminho](${caminho}).  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *vērus* | «Verdadeiro, genuíno, real» | Alta |
| *vērĭtās* | Qualidade do verdadeiro; frankness / truth | Alta |
| Português *verdade* | Herança latina directa (não calque moderno) | Alta |
| Família *verificar* | *vērus* + *facere* — tornar verdadeiro / comprovar | Alta |
| Uso ético / jurídico | «Dizer a verdade» em testemunho e ciência | Alta (uso contemporâneo) |

**Veredicto etimológico:** raiz latina do **real / genuíno**. O laboratório recupera o núcleo: o que se afirma sobre planta, palavra e lei deve poder ser **averiguado** — não apenas sentido ou desejado.

## Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Factual / científico | dose, estudo, rótulo | [UNIFESP](${unifesp}) · fichas de inspeção |
| Moral / ético | sinceridade, não enganar | Cuidado em [Vida](${vida}) — falar com clareza |
| Jurídico / sanitário | porte, autorização, lista | Séries legais no hub [Palavras](${hub}) |
| Narrativo / cultural | mito, estigma, cinema | [Matrix](${matrix}) — o que parece real |
| Lexical / editorial | nomear sem distorcer | Esta série [Palavras](${hub}) |
| Relacional | confiança entre quem cultiva juntos | [simbiose](${simbiose}) · [caminho](${caminho}) |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Inspeções](${inspecoes}) · [UNIFESP](${unifesp}) | Método: evidência, citação, limite |
| [criatividade](${criatividade}) | Inventar forma ≠ inventar facto |
| [caminho](${caminho}) · [simbiose](${simbiose}) | Percurso e parceria com clareza |
| [Cultivo](${cultivo}) · [Plantas](${plantas}) | O que a planta faz — não o que o medo diz |
| [Matrix](${matrix}) · [Alice](${alice}) | Artes: perguntar o real sem abandonar o método |
| [Vida](${vida}) | Narrativa: dizer com cuidado o que se sabe |

### Como ler

1. Entrar pela **palavra** (étimo *vērus* / *vērĭtās*).  
2. Se «verdade» soar só a moral, acrescentar **verificação** (fonte, medida).  
3. Se soar só a «opinião forte», exigir **limite** do que a ficha pode afirmar.  
4. Voltar ao [hub de inspeções](${inspecoes}) ou a [criatividade](${criatividade}) (criar sem falsear).

## Avaliação BudGanja

### Forças
- Liga *vērus* ao ofício de inspecionar.  
- Separa verdade verificável de mito e de invento criativo.  
- Cruza estudo, léxico, cultivo e artes.

### Limites
- Não é tratado filosófico de teoria da verdade.  
- Não julga casos clínicos nem decisões judiciais individuais.

## Como repetir o método

1. Fixar forma + étimo latino.  
2. Tabela: factual / moral / jurídico / narrativo / lexical.  
3. Elos a [UNIFESP](${unifesp}), [criatividade](${criatividade}) e uma Artes.  
4. Declaração: criar ≠ falsear.  
5. Status.

## Status

**Aprovado** — «verdade» documentada do latim *vērĭtās* ao uso no laboratório BudGanja: afirmar com método, citar limites e não fabricar evidência.

[▶ Palavras](${hub}) · [▶ Criatividade](${criatividade}) · [▶ UNIFESP](${unifesp}) · [▶ Caminho](${caminho}) · [▶ Matrix](${matrix})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **verdade** (truth) — from Latin *vērus* / *vērĭtās* to the lab duty of affirming only what can be checked. In BudGanja, truth is method: cite, measure, separate myth from evidence — creativity invents forms; truth does not invent data.

> **Method note:** Latin *vērus* → *vērĭtās* → PT *verdade*. Word sheet ≠ epistemology treatise. Support: [Wiktionary · verdade](${wikiEtym}), [Wikipedia · Verdade](${wiki}).

## Object

| Field | Value |
|-------|-------|
| Word | **verdade** |
| Etymon | Latin *vērus* / *vērĭtās* |
| Lab links | [inspections](${inspecoes}) · [UNIFESP](${unifesp}) · [criatividade](${criatividade}) · [Matrix](${matrix}) |
| Date | ${inspected} |

## Senses

Factual/scientific · moral/ethical · legal/sanitary · narrative/cultural · lexical/editorial · relational trust.

## Status

**Approved** — *vērĭtās* as lab craft: verify, cite limits, do not fabricate evidence.

[▶ Words](${hub}) · [▶ Criatividade](${criatividade}) · [▶ UNIFESP](${unifesp})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **verdade** — del latín *vērus* / *vērĭtās* al deber del laboratorio de afirmar solo lo verificable. En BudGanja, verdad es método: citar, medir, separar mito de evidencia — la creatividad inventa formas; la verdad no inventa datos.

> **Nota metodológica:** latín *vērus* → *vērĭtās* → PT *verdade*. Ficha de palabra ≠ tratado de epistemología. Apoyo: [Wiktionary · verdade](${wikiEtym}), [Wikipedia · Verdade](${wiki}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **verdade** |
| Étimo | Latín *vērus* / *vērĭtās* |
| Vínculos | [inspecciones](${inspecoes}) · [UNIFESP](${unifesp}) · [criatividade](${criatividade}) · [Matrix](${matrix}) |
| Fecha | ${inspected} |

## Sentidos

Fáctico/científico · moral/ético · jurídico/sanitario · narrativo/cultural · léxico · confianza relacional.

## Estado

**Aprobada** — *vērĭtās* como oficio del laboratorio: verificar, citar límites, no fabricar evidencia.

[▶ Palabras](${hub}) · [▶ Criatividade](${criatividade}) · [▶ UNIFESP](${unifesp})
`;

  return { body, contentEn, contentEs };
}

function buildVerdadePost() {
  const { body, contentEn, contentEs } = buildVerdadeBodies();
  return palavraPost({
    title: 'Inspeção: Verdade — a palavra de verificar no laboratório',
    titleEn: 'Inspection: Verdade — the word for verifying in the lab',
    titleEs: 'Inspección: Verdade — la palabra de verificar en el laboratorio',
    excerpt:
      'Palavras: «verdade» (latim *vērĭtās*) — afirmar com método no BudGanja: citar, medir e não fabricar evidência.',
    excerptEn:
      'Words: “verdade” (Latin *vērĭtās*) — affirming with method in BudGanja: cite, measure, and do not fabricate evidence.',
    excerptEs:
      'Palabras: «verdade» (latín *vērĭtās*) — afirmar con método en BudGanja: citar, medir y no fabricar evidencia.',
    slug: 'inspecao-palavra-verdade',
    date: '2026-08-02T17:00:00.000Z',
    seriesOrder: 21,
    seriesLabel: 'Verdade · palavra',
    coverImage: '/imagens/inspecoes/verdade-palavra-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/',
    body,
    contentEn,
    contentEs
  });
}

function buildGestoBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const plantas = '/plantas/';
  const animais = '/animais/';
  const calculadoras = '/calculadoras/';
  const radio = '/radio/';
  const comunidade = '/comunidade/';
  const unifesp = '/biblioteca/unifesp/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const conteudo = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Gesto';
  const wikiEtym = 'https://en.wiktionary.org/wiki/gesto#Portuguese';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **gesto** (e o plural **gestos**) — do latim *gestus* («modo de agir, movimento do corpo») à rede de **acções concretas** que atravessam o projecto BudGanja. Um gesto aqui não é pose: é o acto mínimo que liga planta, palavra, pessoa e cuidado — regar, citar, ficar, medir, partilhar.

> **Nota metodológica:** auditoria independente. Étimo de trabalho: latim *gerere* («levar, conduzir, fazer») → *gestus* → português **gesto** / **gestos**. Fontes de apoio: [Wikcionário · gesto](${wikiEtym}), [Wikipédia · Gesto](${wiki}). **Ficha de palavra ≠ tratado de comunicação não-verbal** — aqui inspecionamos o **vocábulo** como mapa do laboratório inteiro ([Vida](${vida}), [cultivo](${cultivo}), [inspeções](${inspecoes}), ferramentas, rádio, comunidade). Sem afiliação comercial.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **gesto** / **gestos** |
| Classe | Substantivo masculino |
| Étimo (hipótese forte) | Latim *gerere* («conduzir, fazer») → *gestus* («actuação, porte») → PT *gesto* |
| Família | *gestual* · *gesticular* · *gestão* (mesmo étimo latino, sentido administrativo distinto) · *congênito* (via *gen-* ≠ *gest-*) |
| Cognatos | esp. *gesto* · fr. *geste* · it. *gesto* · ing. *gesture* · lat. *gestus* |
| Tipo BudGanja | Palavra — acto mínimo que organiza o projecto |
| Elo trilha | [Vida](${vida}) · [Diário](${diario}) · [conto do laboratório](${conteudo}) |
| Elo cultivo | [Cultivo](${cultivo}) · [Plantas](${plantas}) · [Animais](${animais}) · [calculadoras](${calculadoras}) |
| Elo Palavras | [verdade](${verdade}) · [criatividade](${criatividade}) · [caminho](${caminho}) · [simbiose](${simbiose}) · [emoção](${emocao}) |
| Elo estudo / rede | [UNIFESP](${unifesp}) · [Inspeções](${inspecoes}) · [Rádio](${radio}) · [Comunidade](${comunidade}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «gesto» nomeia o **movimento significativo** — do corpo ou da prática — que comunica ou transforma algo (latim *gestus*).  
**H2:** no BudGanja, o projecto inteiro pode ler-se como **cadeia de gestos**: inspecionar, cultivar, narrar, calcular, aprender idiomas, ouvir rádio, ficar juntos.  
**H3:** gesto bom ≠ gesto teatral: [verdade](${verdade}) exige verificar; [criatividade](${criatividade}) inventa forma; o gesto é o **como** se faz — com método e carinho ([Vida](${vida})).

Passos:

1. Fixar forma + étimo (*gerere* / *gestus*).  
2. Mapear gestos por área do projecto (tabela abaixo).  
3. Separar gesto de cuidado / gesto de método / gesto de cultura.  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *gerere* | «Levar, conduzir, administrar, fazer» | Alta |
| *gestus* | Modo de agir; movimento expressivo | Alta |
| Português *gesto* | Herança latina; plural *gestos* | Alta |
| Inglês *gesture* | Cognato via francês / latim | Alta |
| Uso figurado | «Gesto simbólico», «gesto político» — acto com significado público | Alta (uso contemporâneo) |

**Veredicto etimológico:** raiz de **conduzir / fazer**. No laboratório, gesto = a unidade prática do cuidado e do método — o que se faz com a mão, com a palavra e com a atenção.

## Transformação / rede de sentidos no projecto

| Área BudGanja | Gestos concretos | Elo |
|---------------|------------------|-----|
| [Vida](${vida}) / [Diário](${diario}) | Ficar, acolher, ler a história, registar o cultivo | [conto](${conteudo}) · [emoção](${emocao}) |
| [Cultivo](${cultivo}) / [Plantas](${plantas}) | Regar, transplantar, observar folha, cronometrar luz | [calculadoras](${calculadoras}) |
| [Animais](${animais}) | Nomear, relacionar habitat e cuidado | [simbiose](${simbiose}) |
| [Inspeções](${inspecoes}) / Palavras | Abrir ficha, citar, limitar afirmação | [verdade](${verdade}) · [caminho](${caminho}) |
| [Criatividade](${criatividade}) / Artes | Compor poema, capa, pergunta | Poemas em [Vida](${vida}) |
| [UNIFESP](${unifesp}) | Estudar com método, rascunhar sem fingir certeza | Hub estudo |
| [Rádio](${radio}) / [Comunidade](${comunidade}) | Ouvir, partilhar, conversar sem pressa | Rede viva |
| Aprender idiomas (Vida) | Passar numa palavra, aceitar o que ainda não traduz | [Vida](${vida}) |

## Rede BudGanja (mapa rápido)

| Recurso | Papel do gesto |
|---------|----------------|
| [Vida](${vida}) | Gestos de companhia e crescimento |
| [Cultivo](${cultivo}) · [Plantas](${plantas}) · [Animais](${animais}) | Gestos agrícolas e de habitat |
| [Calculadoras](${calculadoras}) | Gestos numéricos — receita, lux, solo |
| [Verdade](${verdade}) · [Criatividade](${criatividade}) | Verificar × inventar forma |
| [Caminho](${caminho}) · [Simbiose](${simbiose}) | Percurso e parceria |
| [Inspeções](${inspecoes}) · [UNIFESP](${unifesp}) | Gesto de olhar com método |
| [Rádio](${radio}) · [Comunidade](${comunidade}) | Gestos de presença colectiva |

### Como ler

1. Entrar pela **palavra** (*gestus*).  
2. Se «gesto» soar só a mão no ar, alargar a **prática do laboratório**.  
3. Se soar só a «boa intenção», exigir **acto verificável** ([verdade](${verdade})).  
4. Voltar ao [hub](${inspecoes}) ou à [Vida](${vida}) e escolher um gesto concreto para hoje.

## Avaliação BudGanja

### Forças
- Une o projecto inteiro numa unidade legível: o acto mínimo.  
- Cruza cultivo, narrativa, estudo, ferramentas e rede.  
- Impede o vazio «só simbólico» — gesto = fazer com método.

### Limites
- Não é manual de linguagem corporal.  
- Não inventaria todos os gestos clínicos ou jurídicos possíveis.

## Como repetir o método

1. Fixar forma + étimo.  
2. Tabela por área do site (Vida, cultivo, inspeções, ferramentas, rede).  
3. Elos a [verdade](${verdade}), [criatividade](${criatividade}) e [Vida](${vida}).  
4. Declaração: gesto ≠ pose — acto com cuidado e limite.  
5. Status.

## Status

**Aprovado** — «gesto» / «gestos» documentados do latim *gestus* ao mapa do laboratório BudGanja: o projecto como cadeia de actos concretos de cuidado, método e cultura.

[▶ Palavras](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo}) · [▶ Verdade](${verdade}) · [▶ Criatividade](${criatividade}) · [▶ Inspeções](${inspecoes})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **gesto** / **gestos** (gesture) — from Latin *gestus* to the chain of concrete acts across BudGanja: grow, inspect, narrate, calculate, listen, stay. A gesture here is not a pose — it is the minimal act that links plant, word, person and care.

> **Method note:** Latin *gerere* → *gestus* → PT *gesto*. Word sheet ≠ nonverbal-communication treatise. Support: [Wiktionary · gesto](${wikiEtym}), [Wikipedia · Gesto](${wiki}).

## Object

| Field | Value |
|-------|-------|
| Word | **gesto** / **gestos** |
| Etymon | Latin *gerere* / *gestus* |
| Lab map | [Vida](${vida}) · [cultivo](${cultivo}) · [inspections](${inspecoes}) · [truth](${verdade}) · [creativity](${criatividade}) · [radio](${radio}) |
| Date | ${inspected} |

## Senses in the project

Care (Vida) · agricultural (grow/plants) · method (inspect/verify) · creative form · study (UNIFESP) · collective presence (radio/community) · learning languages.

## Status

**Approved** — *gestus* as the unit of lab practice: do with care, method and limit.

[▶ Words](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo}) · [▶ Inspections](${inspecoes})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **gesto** / **gestos** — del latín *gestus* a la cadena de actos concretos en BudGanja: cultivar, inspeccionar, narrar, calcular, escuchar, quedarse. Un gesto aquí no es pose: es el acto mínimo que une planta, palabra, persona y cuidado.

> **Nota metodológica:** latín *gerere* → *gestus* → PT *gesto*. Ficha de palabra ≠ tratado de comunicación no verbal. Apoyo: [Wiktionary · gesto](${wikiEtym}), [Wikipedia · Gesto](${wiki}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **gesto** / **gestos** |
| Étimo | Latín *gerere* / *gestus* |
| Mapa | [Vida](${vida}) · [cultivo](${cultivo}) · [inspecciones](${inspecoes}) · [verdad](${verdade}) · [creatividad](${criatividade}) · [radio](${radio}) |
| Fecha | ${inspected} |

## Sentidos en el proyecto

Cuidado (Vida) · agrícola · método (inspeccionar/verificar) · forma creativa · estudio · presencia colectiva · aprender idiomas.

## Estado

**Aprobada** — *gestus* como unidad de la práctica del laboratorio: hacer con cuidado, método y límite.

[▶ Palabras](${hub}) · [▶ Vida](${vida}) · [▶ Cultivo](${cultivo}) · [▶ Inspecciones](${inspecoes})
`;

  return { body, contentEn, contentEs };
}

function buildGestoPost() {
  const { body, contentEn, contentEs } = buildGestoBodies();
  return palavraPost({
    title: 'Inspeção: Gesto — a palavra que liga o laboratório inteiro',
    titleEn: 'Inspection: Gesto — the word that links the whole lab',
    titleEs: 'Inspección: Gesto — la palabra que une todo el laboratorio',
    excerpt:
      'Palavras: «gesto» / «gestos» (latim *gestus*) — o acto mínimo no BudGanja: cultivar, inspecionar, narrar, medir, ficar e partilhar.',
    excerptEn:
      'Words: “gesto” / “gestos” (Latin *gestus*) — the minimal act in BudGanja: grow, inspect, narrate, measure, stay and share.',
    excerptEs:
      'Palabras: «gesto» / «gestos» (latín *gestus*) — el acto mínimo en BudGanja: cultivar, inspeccionar, narrar, medir, quedarse y compartir.',
    slug: 'inspecao-palavra-gesto',
    date: '2026-08-02T18:00:00.000Z',
    seriesOrder: 22,
    seriesLabel: 'Gesto · palavra',
    coverImage: '/imagens/inspecoes/gesto-palavra-cover.jpg',
    sourceUrl: '/vida/',
    body,
    contentEn,
    contentEs
  });
}

function buildBaldeBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const plantas = '/plantas/';
  const animais = '/animais/';
  const calculadoras = '/calculadoras/';
  const radio = '/radio/';
  const comunidade = '/comunidade/';
  const unifesp = '/biblioteca/unifesp/';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const conteudo = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Balde';
  const wikiEtym = 'https://en.wiktionary.org/wiki/balde#Portuguese';
  const aulete = 'https://www.aulete.com.br/balde';

  const body = `## Escopo

Inspeção editorial e linguística da palavra **balde** — o **recipiente com asa** que carrega água, solo, adubo e solução nutritiva — e das locuções **em balde** / **de balde** («em vão» / «de graça»), de étimo distinto. No BudGanja, o balde é ferramenta quotidiana do [cultivo](${cultivo}): medir volume, transportar e regar sem romantizar o gesto.

> **Nota metodológica:** auditoria independente. Duas fichas sob o mesmo som: (1) **balde** recipiente — origem **incerta / controversa** (tradição marítima ibérica; ver [Wikcionário · balde](${wikiEtym}), [Aulete · balde](${aulete})); (2) locuções **em balde** / **de balde** — via árabe *bāṭil* («vão, inútil»). **Ficha de palavra ≠ catálogo de loja** — aqui inspecionamos o **vocábulo** como objecto de cultivo e de método ([gesto](${gesto}), [verdade](${verdade})). Sem afiliação comercial.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **balde** (recipiente) · locuções **em balde** / **de balde** |
| Classe | Substantivo masculino · locuções adverbiais (homónimas) |
| Étimo (recipiente) | Origem **duvidosa** — uso antigo marítimo/agrícola; *baldear* («trasvasar, lavar a baldes») na mesma família |
| Étimo (locuções) | Árabe *bāṭil* («vão, sem valor») → *de balde* / *em balde* / *debalde* / *embalde* |
| Família | *baldear* · *baldeação* · *baldeado* · *chutar o balde* (figurado BR) |
| Cognatos / vizinhos | esp. *balde* · fr. *seau* (≠ étimo) · ing. *bucket* (≠ étimo) |
| Tipo BudGanja | Palavra — utensílio de volume e transporte no laboratório |
| Elo cultivo | [Cultivo](${cultivo}) · [Plantas](${plantas}) · [Animais](${animais}) · [calculadoras](${calculadoras}) |
| Elo Palavras | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [simbiose](${simbiose}) |
| Elo trilha / rede | [Vida](${vida}) · [Diário](${diario}) · [Inspeções](${inspecoes}) · [UNIFESP](${unifesp}) · [Rádio](${radio}) · [Comunidade](${comunidade}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** «balde» nomeia o **vaso com asa** para líquidos e materiais soltos — unidade prática de **volume e transporte**.  
**H2:** no cultivo BudGanja, o balde mede e move: água de rega, solução, composto, cascalho — o [gesto](${gesto}) concreto de cuidar.  
**H3:** **em balde** / **de balde** são outra palavra (árabe *bāṭil*): trabalho «em balde» = esforço vão; não confundir com o utensílio.  
**H4:** [verdade](${verdade}) no laboratório exige **volume declarado** (litros no balde / na [calculadora](${calculadoras})) — não «um balde» vago.

Passos:

1. Separar **recipiente** × **locução** (étimos distintos).  
2. Fixar uso agrícola e de laboratório.  
3. Mapear elos a gesto, cultivo e medida.  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Recipiente — origem duvidosa | Documentado no português; família com *baldear*; traço marítimo/agrícola | Média (léxico consensual: «origem controversa») |
| *baldear* | Trasvasar, lavar a baldes, mudar de recipiente/navio | Alta (uso histórico PT) |
| Locução *de/em balde* | Árabe *bāṭil* — vão, sem proveito; também «de graça» (*de balde*) | Alta |
| Homofonia | Mesmo som, histórias diferentes — inspecionar sem fundir | Alta (método) |

**Veredicto etimológico:** o **utensílio** e a **locução** não partilham étimo seguro. No laboratório, o balde que importa é o do volume — o que se enche, se pesa e se despeja com método.

## Transformação / rede de sentidos no projecto

| Área BudGanja | Uso do balde (ou da locução) | Elo |
|---------------|------------------------------|-----|
| [Cultivo](${cultivo}) / [Plantas](${plantas}) | Regar, diluir nutrientes, transportar substrato | [gesto](${gesto}) · [calculadoras](${calculadoras}) |
| [Calculadoras](${calculadoras}) | Converter «um balde» em **litros** verificáveis | [verdade](${verdade}) |
| [Animais](${animais}) | Água e ração — habitat e cuidado | [simbiose](${simbiose}) |
| [Vida](${vida}) / [Diário](${diario}) | Registar a rega; não deixar o cultivo «em balde» | [conto](${conteudo}) |
| [Inspeções](${inspecoes}) | Nomear o utensílio; citar volume; limitar afirmação | [caminho](${caminho}) |
| Expressão | *chutar o balde* — abandonar de súbito; *em balde* — esforço vão | Cultura viva |

## Rede BudGanja (mapa rápido)

| Recurso | Papel do balde |
|---------|----------------|
| [Cultivo](${cultivo}) · [Plantas](${plantas}) | Transporte e rega |
| [Calculadoras](${calculadoras}) | Volume → número |
| [Gesto](${gesto}) | O acto de encher / despejar |
| [Verdade](${verdade}) | Medida, não metáfora solta |
| [Caminho](${caminho}) · [Simbiose](${simbiose}) | Percurso do cuidado e parceria com habitat |
| [Vida](${vida}) · [Diário](${diario}) | Registo do dia de rega |
| [Inspeções](${inspecoes}) · [UNIFESP](${unifesp}) | Método e estudo |
| [Rádio](${radio}) · [Comunidade](${comunidade}) | Partilha sem esforço «em balde» |

### Como ler

1. Entrar pelo **recipiente** (asa, volume, transporte).  
2. Se surgir *em balde* / *de balde*, abrir a **ficha árabe** — não misturar.  
3. Exigir **litros** quando o cultivo pedir precisão ([calculadoras](${calculadoras})).  
4. Voltar ao [gesto](${gesto}) de regar e ao [hub](${inspecoes}).

## Avaliação BudGanja

### Forças
- Utensílio concreto do cultivo — liga mão, volume e planta.  
- Ensina a separar homónimos (recipiente ≠ «em vão»).  
- Empurra medida verificável ([verdade](${verdade})).

### Limites
- Étimo do recipiente permanece **incerto** — não forçar latim inventado.  
- Não é ficha de marca de baldes nem norma de irrigação clínica.

## Como repetir o método

1. Fixar forma + separar locuções.  
2. Tabela cultivo / medida / expressão.  
3. Elos a [gesto](${gesto}), [verdade](${verdade}) e [cultivo](${cultivo}).  
4. Declaração: balde = volume + transporte; *em balde* = outra história.  
5. Status.

## Status

**Aprovado** — «balde» documentado como utensílio de volume no laboratório BudGanja; locuções **em/de balde** assinaladas com étimo árabe distinto; elos a cultivo, gesto e medida.

[▶ Palavras](${hub}) · [▶ Cultivo](${cultivo}) · [▶ Gesto](${gesto}) · [▶ Verdade](${verdade}) · [▶ Calculadoras](${calculadoras}) · [▶ Inspeções](${inspecoes})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **balde** — the handled **bucket** that carries water, soil and nutrient solution — and the locutions **em balde** / **de balde** (“in vain” / “for free”), with a **different** etymon. In BudGanja the bucket is everyday grow gear: volume, transport, watering — linked to [gesto](${gesto}) and [truth](${verdade}).

> **Method note:** (1) vessel — **uncertain** origin (maritime/agricultural Iberian tradition); (2) locutions — Arabic *bāṭil* (“vain”). Support: [Wiktionary · balde](${wikiEtym}), [Aulete · balde](${aulete}). Word sheet ≠ shop catalogue.

## Object

| Field | Value |
|-------|-------|
| Word | **balde** (bucket) · locutions **em/de balde** |
| Etymon (vessel) | Uncertain; family with *baldear* |
| Etymon (locutions) | Arabic *bāṭil* |
| Lab map | [cultivo](${cultivo}) · [calculators](${calculadoras}) · [gesto](${gesto}) · [truth](${verdade}) · [Vida](${vida}) |
| Date | ${inspected} |

## Senses in the project

Watering and transport · declared litres · habitat care · diary of irrigation · “in vain” as warning against empty effort.

## Status

**Approved** — bucket as volume tool; locutions kept on a separate etymological track.

[▶ Words](${hub}) · [▶ Cultivo](${cultivo}) · [▶ Gesto](${gesto}) · [▶ Inspections](${inspecoes})
`;

  const contentEs = `## Alcance

Inspección de la palabra portuguesa **balde** — el **cubo con asa** que lleva agua, suelo y solución nutritiva — y las locuciones **em balde** / **de balde** («en vano» / «gratis»), de étimo **distinto**. En BudGanja el balde es herramienta diaria del cultivo: volumen, transporte, riego — unido a [gesto](${gesto}) y [verdad](${verdade}).

> **Nota metodológica:** (1) recipiente — origen **incierto** (tradición marítima/agrícola); (2) locuciones — árabe *bāṭil*. Apoyo: [Wiktionary · balde](${wikiEtym}), [Aulete · balde](${aulete}). Ficha ≠ catálogo comercial.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **balde** (recipiente) · locuciones **em/de balde** |
| Étimo (recipiente) | Dudoso; familia con *baldear* |
| Étimo (locuciones) | Árabe *bāṭil* |
| Mapa | [cultivo](${cultivo}) · [calculadoras](${calculadoras}) · [gesto](${gesto}) · [verdad](${verdade}) · [Vida](${vida}) |
| Fecha | ${inspected} |

## Sentidos en el proyecto

Riego y transporte · litros declarados · cuidado del hábitat · diario de riego · «en vano» como aviso contra esfuerzo vacío.

## Estado

**Aprobada** — balde como herramienta de volumen; locuciones en pista etimológica aparte.

[▶ Palabras](${hub}) · [▶ Cultivo](${cultivo}) · [▶ Gesto](${gesto}) · [▶ Inspecciones](${inspecoes})
`;

  return { body, contentEn, contentEs };
}

function buildBaldePost() {
  const { body, contentEn, contentEs } = buildBaldeBodies();
  return palavraPost({
    title: 'Inspeção: Balde — volume, transporte e o gesto de regar',
    titleEn: 'Inspection: Balde — volume, transport and the watering gesture',
    titleEs: 'Inspección: Balde — volumen, transporte y el gesto de regar',
    excerpt:
      'Palavras: «balde» (recipiente de origem duvidosa) e «em/de balde» (árabe *bāṭil*) — utensílio de volume no cultivo BudGanja, sem confundir com «em vão».',
    excerptEn:
      'Words: “balde” (bucket, uncertain origin) and “em/de balde” (Arabic *bāṭil*) — volume tool in BudGanja grow, not the same as “in vain”.',
    excerptEs:
      'Palabras: «balde» (recipiente de origen dudoso) y «em/de balde» (árabe *bāṭil*) — herramienta de volumen en el cultivo BudGanja, sin confundir con «en vano».',
    slug: 'inspecao-palavra-balde',
    date: '2026-08-02T19:20:00.000Z',
    seriesOrder: 23,
    seriesLabel: 'Balde · palavra',
    coverImage: '/imagens/inspecoes/balde-palavra-cover.jpg',
    sourceUrl: '/guia/cultivo-basico.html',
    body,
    contentEn,
    contentEs
  });
}

function buildBackspaceBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const pesquisa = '/posts/post-pesquisa-oficio-roubo-proibicao.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const conteudo = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const wiki = 'https://en.wikipedia.org/wiki/Backspace';
  const etym = 'https://www.etymonline.com/word/backspace';

  const body = `## Escopo

Inspeção editorial e cultural da palavra **backspace** (ing. *back* + *space*) — tecla e metáfora de **apagar o que veio atrás**. Nasceu na máquina de escrever (fim do séc. XIX) para fazer o carro **voltar um espaço**; no computador passou a **apagar o carácter anterior**. No laboratório BudGanja, a ficha pergunta: quando o backspace é ofício (corrigir typo, rever rascunho) e quando vira tentação de apagar **tudo de ruim** — [medo](${medo}), [raiva](${raiva}), erro, [proibição](${proibicao}), roubo de crédito — sem inspecionar.

> **Nota metodológica:** auditoria independente. Étimo de trabalho: inglês *back* («para trás») + *space* («espaço tipográfico») — atestado ~1899 em teclados de escrever ([Etymonline](${etym}); [Wikipédia · Backspace](${wiki})). **Ficha de palavra ≠ manual de teclado** — inspecionamos o vocábulo como invenção técnica **e** como figura cultural do apagar. Sem afiliação a fabricantes.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **backspace** (também ⌫ · *Backspace* · *←*) |
| Classe | Substantivo / tecla / verbo informal (*to backspace*) |
| Étimo | Ingl. *back* + *space* (~1899, teclado tipográfico) |
| Família | *space* · *delete* · *rub out* · *erase* · *undo* |
| Cognatos / rótulos | pt. *retrocesso* · *apagar* · esp. *retroceso* · fr. *retour arrière* |
| Tipo BudGanja | Palavra — invenção do apagar + tentação de sumir com o ruim |
| Elo Palavras | [gesto](${gesto}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [passar](${passar}) · [proibição](${proibicao}) |
| Elo emoção / aviso | [medo](${medo}) · [raiva](${raiva}) · [vingança…](${vinganca}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [pesquisa ofício / roubo / proibição](${pesquisa}) |
| Elo Vida | [Vida](${vida}) · [Diário](${diario}) · [conto](${conteudo}) — registar ≠ apagar |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** backspace é **invenção tipográfica** — primeiro move o carro para trás; depois, no ecrã, apaga o carácter.  
**H2:** culturalmente, a tecla promete limpar **tudo de ruim** — erro, insulto, medo, rastro.  
**H3:** no BudGanja, backspace **bom** = rever com método ([criatividade](${criatividade}) + [gesto](${gesto})); backspace **mau** = apagar [verdade](${verdade}), crédito ou emoção em vez de inspecionar ([pesquisa](${pesquisa}), [proibição](${proibicao})).

Passos:

1. Fixar étimo + marco técnico (máquina → computador).  
2. Separar *corrigir* de *apagar o difícil*.  
3. Mapear «tudo de ruim» que se tenta backspacear no laboratório.  
4. Limites + status.

## Origens (invenção)

| Marco | O que importa | Confiança |
|-------|---------------|-----------|
| *back* + *space* (~1899) | Nome da tecla que faz o carro voltar um espaço | Alta ([Etymonline](${etym})) |
| Máquinas densmore / Hammond (finais 1890) | Backspace tipográfico — posicionar / sobrepor | Alta (história de teclado) |
| Teletype / *RUB OUT* | Em fita perfurada, «apagar» = furar tudo (DEL), não BS clássico | Alta ([Wikipédia](${wiki})) |
| Ecrã moderno | Backspace = apagar o carácter **atrás** do cursor; Delete = à frente / objecto | Alta (uso corrente) |
| Uso figurado | «Dar backspace na conversa», «apaguei o que disse» | Alta (metáfora digital) |

**Veredicto etimológico:** invenção do **espaço para trás**. O laboratório herda o gesto físico ([gesto](${gesto})) e a metáfora moral: o que se escolhe apagar.

## «Tudo de ruim» — o que a tecla tenta engolir

| Alvo do backspace | Leitura BudGanja | Elo |
|-------------------|------------------|-----|
| Typo / rascunho | Ofício — corrigir sem vergonha | [criatividade](${criatividade}) · [gesto](${gesto}) |
| Erro de método | Revisar; não fingir que o ensaio nunca existiu | [verdade](${verdade}) · [caminho](${caminho}) |
| [Medo](${medo}) / [raiva](${raiva}) | Não «apagar» o afecto — nomear e ficar | [Vida](${vida}) · [conto](${conteudo}) |
| Rancor / vingança | Backspace no veneno ≠ engolir a taça | [vingança…](${vinganca}) |
| Crédito / fonte | Apagar origem = roubo editorial | [pesquisa](${pesquisa}) · [mantra](${mantra}) |
| [Proibição](${proibicao}) / silêncio | Apagar a ficha, o verso, a inspeção | [pesquisa](${pesquisa}) |
| [Risco](${risco}) real | Negar perigo no teclado ≠ reduzir perigo no campo | [cultivo](${cultivo}) |
| História difícil | «Passar» depressa sem ficar | [passar](${passar}) · [Vida](${vida}) |

## Rede BudGanja (mapa rápido)

| Recurso | Papel do backspace |
|---------|-------------------|
| [Gesto](${gesto}) | O dedo na tecla — acto mínimo de editar |
| [Verdade](${verdade}) | Limite: não apagar o que doeu mas é facto |
| [Criatividade](${criatividade}) | Rascunho vive de apagar e reescrever |
| [Proibição](${proibicao}) · [pesquisa](${pesquisa}) | Silenciamento = backspace político/editorial |
| [Faça o melhor!](${mantra}) | Ofício diário contra apagar o nosso |
| [Vida](${vida}) · [Diário](${diario}) | Registar o dia — o oposto de sumir com o ruim |
| [Passar](${passar}) · [caminho](${caminho}) | Passar ≠ apagar; caminho inclui o que ficou |

### Como ler

1. Entrar pela **invenção** (*back* + *space*).  
2. Se soar só a tecla, abrir a metáfora do **apagar o difícil**.  
3. Se soar a «limpar tudo de ruim», exigir [verdade](${verdade}) e [gesto](${gesto}) de inspeção — não amnésia.  
4. Voltar ao [hub](${inspecoes}) ou à [Vida](${vida}) e escolher: corrigir typo **ou** ficar com o que ainda arde.

## Avaliação BudGanja

### Forças
- Une história técnica (teclado) e literacia emocional/editorial.  
- Nomeia a tentação de sumir com medo, rancor, proibição e roubo.  
- Cruza [gesto](${gesto}), [verdade](${verdade}), [mantra](${mantra}) e [pesquisa](${pesquisa}).

### Limites
- Não é tutorial de atalhos (Ctrl+Z, Delete vs Backspace em todos os SO).  
- Não aconselha apagar dados pessoais de terceiros nem prova jurídica.

## Como repetir o método

1. Fixar étimo + marco tipográfico.  
2. Tabela: corrigir × apagar o difícil.  
3. Elos a emoção, proibição, ofício e Vida.  
4. Declaração: backspace ≠ amnésia — [Faça o melhor!](${mantra}).  
5. Status.

## Status

**Aprovado** — «backspace» documentado da invenção tipográfica (~1899) à metáfora BudGanja: tecla que corrige o rascunho **e** tentação de apagar tudo de ruim sem inspecionar.

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Verdade](${verdade}) · [▶ Pesquisa](${pesquisa}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **backspace** (*back* + *space*, ~1899) — typewriter/computer key that steps backward and, on screen, deletes the previous character. In BudGanja the word also names the temptation to erase **everything bad** — fear, anger, error, prohibition, stolen credit — instead of inspecting it.

> Method note: [Etymonline](${etym}) · [Wikipedia · Backspace](${wiki}). Word sheet ≠ keyboard manual.

## Object

| Field | Value |
|-------|-------|
| Word | **backspace** / ⌫ |
| Etymon | Eng. *back* + *space* (~1899) |
| Lab map | [gesture](${gesto}) · [truth](${verdade}) · [creativity](${criatividade}) · [prohibition](${proibicao}) · [craft research](${pesquisa}) · [Vida](${vida}) |
| Date | ${inspected} |

## Senses

Technical invention · draft correction · metaphor of erasure · limit: do not erase truth, credit or hard emotion — inspect ([Do your best!](${mantra})).

## Status

**Approved** — backspace as craft of revision and warning against amnesia.

[▶ Words](${hub}) · [▶ Gesture](${gesto}) · [▶ Truth](${verdade}) · [▶ Research](${pesquisa}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de la palabra **backspace** (*back* + *space*, ~1899) — tecla de máquina/computadora que retrocede y, en pantalla, borra el carácter anterior. En BudGanja también nombra la tentación de borrar **todo lo malo** — miedo, rabia, error, prohibición, crédito robado — en vez de inspeccionarlo.

> Nota: [Etymonline](${etym}) · [Wikipedia · Backspace](${wiki}). Ficha ≠ manual de teclado.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **backspace** / ⌫ |
| Étimo | Ingl. *back* + *space* (~1899) |
| Mapa | [gesto](${gesto}) · [verdad](${verdade}) · [creatividad](${criatividade}) · [prohibición](${proibicao}) · [investigación](${pesquisa}) · [Vida](${vida}) |
| Fecha | ${inspected} |

## Sentidos

Invención técnica · corregir borrador · metáfora del borrado · límite: no borrar verdad, crédito ni emoción dura — inspeccionar ([¡Haz lo mejor!](${mantra})).

## Estado

**Aprobada** — backspace como oficio de revisión y aviso contra la amnesia.

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ Verdad](${verdade}) · [▶ Investigación](${pesquisa}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildBackspacePost() {
  const { body, contentEn, contentEs } = buildBackspaceBodies();
  return palavraPost({
    title: 'Inspeção: Backspace — invenção do apagar e a tentação do «tudo de ruim»',
    titleEn: 'Inspection: Backspace — invention of erase and the temptation of “everything bad”',
    titleEs: 'Inspección: Backspace — invención del borrar y la tentación de «todo lo malo»',
    excerpt:
      'Palavras: «backspace» (*back* + *space*, ~1899) — da tecla tipográfica à metáfora de apagar tudo de ruim sem inspecionar.',
    excerptEn:
      'Words: “backspace” (*back* + *space*, ~1899) — from the typewriter key to the metaphor of erasing everything bad without inspecting.',
    excerptEs:
      'Palabras: «backspace» (*back* + *space*, ~1899) — de la tecla tipográfica a la metáfora de borrar todo lo malo sin inspeccionar.',
    slug: 'inspecao-palavra-backspace',
    date: '2026-08-02T21:10:00.000Z',
    seriesOrder: 24,
    seriesLabel: 'Backspace · palavra',
    coverImage: '/imagens/inspecoes/backspace-palavra-cover.jpg',
    sourceUrl: 'https://en.wikipedia.org/wiki/Backspace',
    body,
    contentEn,
    contentEs
  });
}

function buildMaoEsquerdaDireitaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const plantas = '/plantas/';
  const calculadoras = '/calculadoras/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const conteudo = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const wikiMao = 'https://pt.wikipedia.org/wiki/M%C3%A3o';
  const wikiEsq = 'https://pt.wiktionary.org/wiki/esquerda';
  const wikiDir = 'https://pt.wiktionary.org/wiki/direita';
  const wikiManus = 'https://en.wiktionary.org/wiki/manus#Latin';
  const wikiCoracao = 'https://pt.wikipedia.org/wiki/Cora%C3%A7%C3%A3o';

  const body = `## Escopo

Inspeção editorial e linguística do par **mão esquerda** × **mão direita** — as duas mãos como ferramentas do [gesto](${gesto}): cultivar, escrever, teclar, carregar o [balde](${balde}), corrigir com [backspace](${backspace}). A tese do laboratório é **complementaridade**, não dualismo moral («sinistra» = má / direita = boa). Ofício usa as duas; a mão dominante varia; há quem escreva e cultive com a esquerda, a direita, ou ambas. Secção dedicada: **mão direita × [coração](${coracao})** (metáfora de ofício + cuidado). Ficha irmã do lado lexical: [esquerdo](${esquerdo}); ficha do peito: [coração](${coracao}).

> **Nota metodológica:** auditoria independente. Étimos de trabalho: latim *manus* («mão») → PT **mão**; **esquerda** (via lat. vulgar / tradição ibérica; cognato com lat. *sinistra* no campo semântico «lado esquerdo», sem endossar o preconceito); **direita** (lat. *directa* / *dextera* — «direita, hábil»). Fontes: [Wikipédia · Mão](${wikiMao}), [Wikcionário · esquerda](${wikiEsq}), [Wikcionário · direita](${wikiDir}), [Wiktionary · manus](${wikiManus}), [Wikipédia · Coração](${wikiCoracao}). **Ficha de palavra ≠ anatomia clínica nem ranking de laterality** — inspecionamos o vocábulo e a metáfora de ofício. Sem afiliação comercial. Evitar enquadramento capacitista: mãos e dominância diferem; o cuidado continua.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavras | **mão esquerda** · **mão direita** (âncora: **mão**) |
| Classe | Locuções nominais · substantivo *mão* + adjectivos laterais |
| Étimo (*mão*) | Latim *manus* («mão; poder; banda») → PT *mão* |
| Étimo (*esquerda*) | Tradição romance / ibérica; campo *sinistra* (lado esquerdo) — **não** moralizar |
| Étimo (*direita*) | Lat. *directus* / *dexter* → *direita* / *direita* (lado e «recto») |
| Família | *manual* · *manuscrito* · *manipular* · *à mão* · *dar a mão* · *mão-de-obra* |
| Cognatos | esp. *mano* / *izquierda* / *derecha* · fr. *main* / *gauche* / *droite* · ing. *hand* / *left* / *right* |
| Tipo BudGanja | Palavra — par de ofício (complementaridade) |
| Elo Palavras | [gesto](${gesto}) · [esquerdo](${esquerdo}) · [coração](${coracao}) · [backspace](${backspace}) · [verdade](${verdade}) · [criatividade](${criatividade}) · [balde](${balde}) |
| Elo ofício | [Faça o melhor!](${mantra}) — «nesta mão, hoje» |
| Elo metáfora | **mão direita × [coração](${coracao})** — gesto / acção × cuidado / sentir (secção abaixo) |
| Elo cultivo / Vida | [Cultivo](${cultivo}) · [Plantas](${plantas}) · [Vida](${vida}) · [Diário](${diario}) · [conto](${conteudo}) |
| Data da inspeção | ${inspected} |

## Relação com «esquerdo»

| Ficha | Foco | Como ler em par |
|-------|------|-----------------|
| **Esta (mãos)** | O **par** — duas ferramentas do [gesto](${gesto}) | Com *quê* trabalho? |
| **[esquerdo](${esquerdo})** | O **lado** — adjetivo / substantivo de ofício | Em *qual* lado / mão? |

- **mão esquerda** = o [esquerdo](${esquerdo}) *encarnado* (corpo + instrumento).  
- **esquerdo** sozinho pode ser lado no espaço, na política ou no teclado — a ficha irmã zooma o léxico e o anti-estigma.  
- As duas recusam «sinistra = má»; juntas fecham com [Faça o melhor!](${mantra}) nesta mão.

**Veredicto:** mãos = complementaridade do **par**; [esquerdo](${esquerdo}) = inspeção do **lado**. Ler as duas.

## Hipóteses e método

**H1:** *mão* (*manus*) nomeia a ferramenta corporal do [gesto](${gesto}) — escrever, teclar, regar, apontar, acolher.  
**H2:** **esquerda** e **direita** marcam **lados e papéis de ofício** (apoiar × executar, estabilizar × precisar) — metáfora de **craft**, não de virtude.  
**H3:** no teclado QWERTY, [backspace](${backspace}) costuma ficar ao alcance da **mão direita** (dedo mínimo) para muitos — mas o laboratório não fixa «mão certa»; o que importa é o gesto de rever.  
**H4:** [verdade](${verdade}) e [Faça o melhor!](${mantra}) pedem o possível **nesta** mão (ou nestas mãos), sem exigir simetria normativa nem desprezar quem é sinistro / ambidestro / usa prótese ou adaptação.  
**H5:** a ficha [esquerdo](${esquerdo}) é irmã obrigatória — aprofunda o lado sem substituir o par.  
**H6:** **mão direita × [coração](${coracao})** — leitura de ofício: a direita costuma figurar como mão do [gesto](${gesto}) / acção; o [coração](${coracao}) (órgão um pouco à esquerda do peito, na anatomia típica; ficha lexical) figura como cuidado / sentir — **complementaridade**, não «direita = boa / esquerda = má».

Passos:

1. Fixar *mão* + o par lateral.  
2. Separar complementaridade de preconceito («sinistra»).  
3. Mapear cultivo / teclado / escrita / ofício.  
4. Abrir **mão direita × [coração](${coracao})** (metáfora + anti-estigma).  
5. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *manus* → PT *mão* | Mão; também «poder», «banda», instrumento | Alta ([Wiktionary · manus](${wikiManus})) |
| *esquerda* | Lado esquerdo; história lexical ligada a *sinistra* no latim — uso espacial ≠ juízo moral | Média–alta (léxico consensual; nuance cultural) |
| *direita* | Lado direito; lat. *dexter* / *directus* — «recto», «hábil» no campo antigo | Alta ([Wikcionário · direita](${wikiDir})) |
| Preconceito lexical | Em várias línguas, «esquerdo» carregou estigma — o laboratório **recusa** essa moral | Alta (método BudGanja) |
| Lateralidade | Dominância manual varia; ofício adapta | Alta (uso vivo; sem pretender neurologia clínica) |

**Veredicto etimológico:** *mão* = instrumento; *esquerda* / *direita* = lados. No BudGanja o par é **parceria de craft** — uma mão estabiliza o vaso, a outra corta; uma segura o caderno, a outra escreve; uma apoia o teclado, a outra digita. Papéis trocam conforme a pessoa.

## Mão esquerda × mão direita — ofício (não moral)

| Papel (metáfora de craft) | Leitura BudGanja | Elo |
|---------------------------|------------------|-----|
| Apoiar / estabilizar | Segurar o vaso, o [balde](${balde}), a folha — base do [gesto](${gesto}) | [cultivo](${cultivo}) |
| Executar / precisar | Cortar, teclar, escrever, medir | [calculadoras](${calculadoras}) · [criatividade](${criatividade}) |
| Corrigir | [Backspace](${backspace}) e rever — dedo na tecla, não amnésia | [verdade](${verdade}) |
| Acolher | «Dar a mão» — presença na [Vida](${vida}) | [conto](${conteudo}) |
| Ofício diário | O melhor **nesta mão** — [Faça o melhor!](${mantra}) | Mantra |

> **Aviso:** a atribuição «esquerda = apoio / direita = execução» é **metáfora de oficina**, não regra biológica. Quem cultiva ou escreve com a mão esquerda inverte os papéis sem perder o ofício. Ambas as mãos entram no laboratório.

## Mão direita × coração

Leitura BudGanja do elo **mão direita** ↔ **[coração](${coracao})** — metáfora cultural e de ofício, **não** anatomia inventada nem ranking moral de lados. Ficha lexical do peito: [Inspeção · Coração](${coracao}).

### Anatomia típica × metáfora cultural (inspecionar com cuidado)

| Camada | O que se pode dizer | O que **não** inventar |
|--------|---------------------|------------------------|
| Anatomia típica | No peito humano usual, o coração fica **ligeiramente à esquerda** da linha média ([Wikipédia · Coração](${wikiCoracao})) — daí o pulso sentido mais à esquerda | Não afirmar que «o coração está na mão esquerda» nem tratar exceções (ex.: dextrocardia) como norma moral |
| Gesto «mão no peito / no coração» | Em muitos contextos, uma mão (com frequência a **direita**, em destros) pousa sobre o peito **esquerdo**, onde o batimento se sente | Não fixar uma única mão «correcta» para jura, hino ou carinho — culturas e corpos variam |
| Léxico antigo | Lat. *dexter* («direita, hábil») vs. campo *sinistra* («esquerda») — história de estigma | Não endossar «direita = virtude / esquerda = vício» |

**Veredicto anatómico-cultural:** o coração **mora no peito (lado esquerdo típico)**; a mão **direita** muitas vezes **vai até ele** no gesto simbólico — ponte de ofício, não prova de que só a direita «tem coração».

### Leitura de ofício BudGanja

| Polo | Leitura no laboratório | Elo |
|------|------------------------|-----|
| **Mão direita** (metáfora frequente) | [Gesto](${gesto}) concreto — executar, teclar, cortar, escrever, [backspace](${backspace}) | Acção / craft |
| **[Coração](${coracao})** (metáfora) | Cuidado, sentir, ficar com a planta e com a pessoa — [Vida](${vida}), [Diário](${diario}), [conto](${conteudo}) · [ficha Coração](${coracao}) | Carinho / método afectivo |
| **Ponte** | A mão que **faz** sem abandonar o peito que **cuida** | [verdade](${verdade}) + carinho |
| **Fecho** | O melhor possível **nesta** mão, com o peito no ofício | [Faça o melhor!](${mantra}) |

**Tese:** mão direita × coração = **complementaridade** — acção e cuidado no mesmo laboratório. Não é dualismo «direita = boa / esquerda = má»; é lembrar que o [gesto](${gesto}) sem coração vira pose, e o coração sem gesto vira discurso sem planta regada.

### Anti-estigma (obrigatório)

1. A **mão esquerda** também cuida — estabiliza o vaso, escreve, abraça, regista no [Diário](${diario}). Ver ficha irmã [esquerdo](${esquerdo}).  
2. A **mão direita** não é o único lado «bom»; *dexter* histórico ≠ virtude BudGanja.  
3. Canhoto / ambidestro / adaptação: o peito continua; a mão dominante **leva** o cuidado — [Faça o melhor!](${mantra}) nesta mão.  
4. [Verdade](${verdade}): não fabricar anatomia nem moral de laterality; citar o típico e limitar o resto.

### Elos rápidos

- [Gesto](${gesto}) — a unidade do acto que a mão direita (ou a outra) concretiza.  
- [Verdade](${verdade}) — verificar o que se afirma sobre corpo e ofício.  
- [Faça o melhor!](${mantra}) — melhor nesta mão, com peito no trabalho.  
- [Vida](${vida}) · [Diário](${diario}) · [conto](${conteudo}) — onde o «coração» do projecto aparece como cuidado narrado.  
- [Esquerdo](${esquerdo}) — lado lexical e anti-estigma; o peito esquerdo tipicamente «guarda» o órgão; a mão esquerda continua instrumento.

## Rede BudGanja (mapa rápido)

| Recurso | Papel das mãos |
|---------|----------------|
| [Gesto](${gesto}) | Unidade do acto — a mão que faz |
| [Esquerdo](${esquerdo}) | Lado lexical — irmã do par |
| **Mão direita × [coração](${coracao})** | Acção × cuidado — complementaridade (secção acima) |
| [Backspace](${backspace}) | Dedo que corrige o rascunho |
| [Cultivo](${cultivo}) · [Plantas](${plantas}) · [Balde](${balde}) | Regar, transplantar, transportar |
| [Verdade](${verdade}) · [Criatividade](${criatividade}) | Verificar × inventar forma — com as mãos no teclado |
| [Faça o melhor!](${mantra}) | Melhor possível nesta mão, hoje |
| [Caminho](${caminho}) · [Vida](${vida}) · [Diário](${diario}) | Percurso e registo — mãos que ficam e fazem |
| [Inspeções](${inspecoes}) | Abrir ficha, citar, limitar |

### Como ler

1. Entrar por **mão** (*manus*).  
2. Abrir o par **esquerda × direita** como complementaridade.  
3. Zoom no lado com [esquerdo](${esquerdo}) — anti-estigma e ofício.  
4. Ler **mão direita × coração** — gesto / acção encontra cuidado; sem moral dualista.  
5. Se soar a moral («mão sinistra»), recusar o preconceito e voltar ao ofício.  
6. Escolher um [gesto](${gesto}) concreto — regar, escrever, backspacear um typo — e [Faça o melhor!](${mantra}) com o peito no trabalho.

## Avaliação BudGanja

### Forças
- Liga corpo, teclado, cultivo e mantra numa ficha só.  
- Nomeia o preconceito lexical sem o reproduzir.  
- Cruza [gesto](${gesto}), [backspace](${backspace}), [verdade](${verdade}) e [Vida](${vida}).  
- Documenta **mão direita × coração** como metáfora de complementaridade (acção × cuidado), com limites anatómicos explícitos.

### Limites
- Não é tratado de anatomia, cardiologia, ergonomia clínica ou lateralidade patológica.  
- Não classifica pessoas por mão dominante.  
- Não afirma que só a mão direita «tem coração».

## Como repetir o método

1. Fixar *mão* + laterais.  
2. Tabela complementaridade × preconceito.  
3. Elos a [gesto](${gesto}), [backspace](${backspace}), [cultivo](${cultivo}) e [mantra](${mantra}).  
4. Secção metáfora **direita × coração** — citar anatomia típica, limitar o resto, anti-estigma.  
5. Declaração: ofício usa as duas — sem moral dualista.  
6. Status.

## Status

**Aprovado** — par **mão esquerda** / **mão direita** documentado como complementaridade de ofício; secção **mão direita × [coração](${coracao})** (gesto / acção × cuidado); elo irmão [esquerdo](${esquerdo}); ficha peito [coração](${coracao}); ferramentas do [gesto](${gesto}), do cultivo e do teclado; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Esquerdo](${esquerdo}) · [▶ Coração](${coracao}) · [▶ Gesto](${gesto}) · [▶ Backspace](${backspace}) · [▶ Cultivo](${cultivo}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida}) · [▶ Diário](${diario})
`;

  const contentEn = `## Scope

Editorial inspection of the pair **mão esquerda** × **mão direita** (left hand / right hand) — hands as tools of [gesto](${gesto}): grow, write, type, carry the [balde](${balde}), revise with [backspace](${backspace}). Thesis: **complementarity**, not moral dualism (“sinistra” = bad). Dedicated section: **right hand × [coração](${coracao})** (heart). Sister sheet for the side-word: [esquerdo](${esquerdo}).

> Method note: Latin *manus* → PT *mão*; *esquerda* / *direita* as lateral labels. Support: [Wikipedia · Mão](${wikiMao}), [Wiktionary · manus](${wikiManus}), [esquerda](${wikiEsq}), [direita](${wikiDir}), [Wikipedia · Coração](${wikiCoracao}). Word sheet ≠ clinical anatomy.

## Object

| Field | Value |
|-------|-------|
| Words | **mão esquerda** · **mão direita** |
| Etymon | Lat. *manus*; laterals *esquerda* / *direita* (*dexter* / *directus* field) |
| Lab map | [gesto](${gesto}) · [esquerdo](${esquerdo}) · [coração](${coracao}) · [backspace](${backspace}) · [truth](${verdade}) · [cultivo](${cultivo}) · [Do your best!](${mantra}) · [Vida](${vida}) |
| Metaphor | **right hand × [coração](${coracao})** — action × care |
| Date | ${inspected} |

## Relation to «esquerdo»

This sheet = the **pair** (with *what*). [esquerdo](${esquerdo}) = the **side** (on *which* side). Left hand = esquerdo embodied. Both refuse “left = bad.”

## Right hand × heart

Typical anatomy: the heart sits **slightly left** of midline ([Wikipedia · Coração](${wikiCoracao})) — do not invent “heart is in the left hand.” Cultural gesture: a hand (often the **right**, in right-handers) may rest on the **left** chest where the beat is felt. BudGanja reading: right hand ≈ [gesture](${gesto}) / action; [coração](${coracao}) ≈ care / feeling ([Vida](${vida}), [Diário](${diario})) — **complementarity**, not “right = good.” Anti-stigma: the **left** hand also cares ([esquerdo](${esquerdo})); the right is not the only virtuous side. Close with [truth](${verdade}) and [Do your best!](${mantra}) in this hand, with the chest in the work. Lexical sheet: [Coração](${coracao}).

## Senses

Craft metaphor (stabilize × execute — roles can swap) · typing/cultivation · backspace as revision · right hand × [coração](${coracao}) (action × care) · “best in this hand today” · refuse left-hand stigma.

## Status

**Approved** — left/right hands as complementary craft tools; right hand × [coração](${coracao}) documented; sister [esquerdo](${esquerdo}).

[▶ Words](${hub}) · [▶ Esquerdo](${esquerdo}) · [▶ Coração](${coracao}) · [▶ Gesture](${gesto}) · [▶ Backspace](${backspace}) · [▶ Cultivo](${cultivo}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección del par **mão esquerda** × **mão direita** — las manos como herramientas del [gesto](${gesto}): cultivar, escribir, teclear, llevar el [balde](${balde}), corregir con [backspace](${backspace}). Tesis: **complementariedad**, no dualismo moral («sinistra» = mala). Sección dedicada: **mano derecha × [coração](${coracao})**. Ficha hermana del lado: [esquerdo](${esquerdo}).

> Nota: latín *manus* → PT *mão*; laterales *esquerda* / *direita*. Apoyo: [Wikipedia · Mão](${wikiMao}), [Wiktionary · manus](${wikiManus}), [esquerda](${wikiEsq}), [direita](${wikiDir}), [Wikipedia · Coração](${wikiCoracao}). Ficha ≠ anatomía clínica.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabras | **mão esquerda** · **mão direita** |
| Étimo | Lat. *manus*; laterales *esquerda* / *direita* |
| Mapa | [gesto](${gesto}) · [esquerdo](${esquerdo}) · [coração](${coracao}) · [backspace](${backspace}) · [verdad](${verdade}) · [cultivo](${cultivo}) · [¡Haz lo mejor!](${mantra}) · [Vida](${vida}) |
| Metáfora | **mano derecha × [coração](${coracao})** — acción × cuidado |
| Fecha | ${inspected} |

## Relación con «esquerdo»

Esta ficha = el **par** (*con qué*). [esquerdo](${esquerdo}) = el **lado** (*en qué lado*). Mano izquierda = esquerdo encarnado. Ambas rechazan «izquierda = mala».

## Mano derecha × corazón

Anatomía típica: el corazón queda **ligeramente a la izquierda** de la línea media ([Wikipedia · Coração](${wikiCoracao})) — no inventar «el corazón está en la mano izquierda». Gesto cultural: una mano (a menudo la **derecha**, en diestros) puede posarse sobre el pecho **izquierdo**, donde se siente el latido. Lectura BudGanja: mano derecha ≈ [gesto](${gesto}) / acción; [coração](${coracao}) ≈ cuidado / sentir ([Vida](${vida}), [Diario](${diario})) — **complementariedad**, no «derecha = buena». Anti-estigma: la **izquierda** también cuida ([esquerdo](${esquerdo})); la derecha no es el único lado virtuoso. Cierre con [verdad](${verdade}) y [¡Haz lo mejor!](${mantra}) en esta mano, con el pecho en el oficio. Ficha léxica: [Coração](${coracao}).

## Sentidos

Metáfora de oficio (apoyar × ejecutar — roles intercambiables) · tecleo/cultivo · backspace como revisión · mano derecha × [coração](${coracao}) (acción × cuidado) · «lo mejor en esta mano, hoy» · rechazar estigma de la izquierda.

## Estado

**Aprobada** — manos como herramientas complementarias; mano derecha × [coração](${coracao}) documentada; hermana [esquerdo](${esquerdo}).

[▶ Palabras](${hub}) · [▶ Esquerdo](${esquerdo}) · [▶ Coração](${coracao}) · [▶ Gesto](${gesto}) · [▶ Backspace](${backspace}) · [▶ Cultivo](${cultivo}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildMaoEsquerdaDireitaPost() {
  const { body, contentEn, contentEs } = buildMaoEsquerdaDireitaBodies();
  return palavraPost({
    title: 'Inspeção: Mão esquerda / mão direita — complementaridade do ofício',
    titleEn: 'Inspection: Left hand / right hand — complementarity of craft',
    titleEs: 'Inspección: Mano izquierda / mano derecha — complementariedad del oficio',
    excerpt:
      'Palavras: «mão esquerda» / «mão direita» (*manus*) — par de ofício; mão direita × coração (gesto × cuidado); elo esquerdo; sem moral dualista.',
    excerptEn:
      'Words: “mão esquerda” / “mão direita” (*manus*) — craft pair; right hand × heart (gesture × care); sister esquerdo; no moral dualism.',
    excerptEs:
      'Palabras: «mão esquerda» / «mão direita» (*manus*) — par de oficio; mano derecha × corazón (gesto × cuidado); hermana esquerdo; sin dualismo moral.',
    slug: 'inspecao-palavra-mao-esquerda-direita',
    date: '2026-08-03T16:00:00.000Z',
    seriesOrder: 25,
    seriesLabel: 'Mãos · palavra',
    coverImage: '/imagens/inspecoes/mao-esquerda-direita-palavra-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/M%C3%A3o',
    body,
    contentEn,
    contentEs
  });
}

/** Poesia Vida — árvore sénior (arco semente → mudinha → árvore). */
function poemArvoreDaVidaPt() {
  return `Árvore da Vida.
Não nascemos tronco —
nascemos semente na mão,
mudinha no gelo,
raiz que pediu tempo.

A semente cabe no peito.
A mudinha pede luz fraca
e um balde que não julga.
A árvore — quando chega —
não apaga as fases:
guarda-as na madeira.

Dizem que árvore é fim.
Mentira doce.
Árvore é sombra partilhada,
casa de pássaro,
tronco onde a mão esquerda
e a mão direita
ainda encontram ofício.

O laboratório não força flor.
Planta à beira.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
ficar —
até a muda vir árvore
sem pressa de sénior.

Faça o melhor!

Porque toda árvore que permanece
quando o inverno passou
cresce um pouco no mapa:
uma raiz a mais,
um verso a mais,
um nós onde antes só havia semente sozinha.`;
}

function poemArvoreDaVidaEn() {
  return `Tree of Life.
We are not born trunk —
we are born seed in the hand,
seedling on the ice,
root that asked for time.

The seed fits in the chest.
The seedling asks for weak light
and a bucket that does not judge.
The tree — when it arrives —
does not erase the phases:
it keeps them in the wood.

They say a tree is an end.
Sweet lie.
A tree is shared shade,
a bird’s house,
a trunk where the left hand
and the right hand
still find craft.

The laboratory does not force the flower.
It plants at the edge.
It counts drops.
It calls Vida by its true name:
stay —
until the seedling becomes a tree
without rushing seniority.

Do your best!

Because every tree that remains
when winter has passed
grows a little on the map:
one more root,
one more verse,
a we where once there was only a lonely seed.`;
}

function poemArvoreDaVidaEs() {
  return `Árbol de la Vida.
No nacemos tronco —
nacemos semilla en la mano,
plantita en el hielo,
raíz que pidió tiempo.

La semilla cabe en el pecho.
La plantita pide luz débil
y un cubo que no juzgue.
El árbol — cuando llega —
no borra las fases:
las guarda en la madera.

Dicen que el árbol es fin.
Mentira dulce.
Árbol es sombra compartida,
casa de pájaro,
tronco donde la mano izquierda
y la mano derecha
aún encuentran oficio.

El laboratorio no fuerza la flor.
Siembra a la orilla.
Cuenta gotas.
Llama a Vida por su nombre verdadero:
quedarse —
hasta que la muda sea árbol
sin prisa de sénior.

¡Haz lo mejor!

Porque todo árbol que permanece
cuando el invierno pasó
crece un poco en el mapa:
una raíz más,
un verso más,
un nosotros donde antes solo había semilla sola.`;
}

function buildArvoreDaVidaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const inspecoes = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const plantas = '/plantas/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const conteudo = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const bomDia = '/posts/post-inspecao-arte-bom-dia-inverno.html';
  const aguas = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const wiki = 'https://pt.wikipedia.org/wiki/%C3%81rvore_da_vida';
  const wikiArvore = 'https://pt.wiktionary.org/wiki/%C3%A1rvore';
  const poema = poemArvoreDaVidaPt();

  const body = `## Escopo

Inspeção editorial e cultural da expressão **Árvore da Vida** — e do vocábulo **árvore** — como figura sénior do arco BudGanja: [sementinha](${conteudo}) → [mudinha](${bomDia}) → **árvore**. Não é protocolo botânico nem doutrina religiosa única: é a metáfora de **planta que ficou**, deu sombra e ainda pede cuidado ([Vida](${vida}), [cultivo](${cultivo}), [gesto](${gesto})).

> **Nota metodológica:** auditoria independente. Étimo de trabalho: latim *arbor* → PT **árvore**; a locução **Árvore da Vida** circula em mitologias, religião e cultura popular ([Wikipédia · Árvore da vida](${wiki}); [Wikcionário · árvore](${wikiArvore})). **Ficha ≠ tratado teológico nem guia de arboricultura** — inspecionamos o vocábulo e a figura no laboratório. Sem afiliação. A «planta Sênior» do [conto](${conteudo}) e a linha «Árvore» em [Bom dia, Inverno](${bomDia}) encontram aqui a ficha que faltava.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra / figura | **Árvore da Vida** · **árvore** |
| Classe | Locução · substantivo feminino (*árvore*) |
| Étimo (*árvore*) | Latim *arbor* → PT *árvore* |
| Família | *arbóreo* · *arbusto* · *arborescência* · *plantar* · *raiz* · *tronco* · *copa* |
| Cognatos | esp. *árbol* · fr. *arbre* · it. *albero* · ing. *tree* · lat. *arbor* |
| Tipo BudGanja | Palavra / figura Vida — fase sénior do arco semente–mudinha–árvore |
| Elo arco | [Conto · sementinha](${conteudo}) · [Bom dia, Inverno · mudinha](${bomDia}) · **esta ficha** |
| Elo Palavras | [gesto](${gesto}) · [mãos](${maos}) · [balde](${balde}) · [caminho](${caminho}) · [simbiose](${simbiose}) |
| Elo Artes / Vida | [Águas…](${aguas}) · [Lágrimas da Vida](${lagrimas}) · [Vida](${vida}) · [Diário](${diario}) |
| Elo ofício | [Faça o melhor!](${mantra}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** *árvore* (*arbor*) nomeia a planta lenhosa — tronco, raiz, copa — e, por metáfora, o que **cresceu e permanece**.  
**H2:** **Árvore da Vida** no BudGanja = fase sénior do arco: não apaga semente nem mudinha; **guarda-as na madeira**.  
**H3:** sénior ≠ fim do cuidado — ainda há [gesto](${gesto}), [mãos](${maos}), [balde](${balde}) e [Faça o melhor!](${mantra}).  
**H4:** o livro *Bom dia, Inverno* continua **mudinha**; esta ficha nomeia o horizonte da árvore no mapa — sem forçar floração cedo.

Passos:

1. Fixar *árvore* + locução Árvore da Vida.  
2. Ligar semente → mudinha → árvore.  
3. Poema Vida + rede.  
4. Limites + status.

## Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Latim *arbor* → PT *árvore* | Planta lenhosa; metáfora de estrutura / genealogia | Alta ([Wikcionário](${wikiArvore})) |
| «Árvore da vida» (cultura) | Motivo recorrente — vida, eixo, conhecimento, ligação céu–terra | Alta (motivo cultural amplo; [Wikipédia](${wiki})) |
| Uso BudGanja | Figura do arco de cultivo/Vida — planta Sênior do conto | Alta (método do laboratório) |
| Religião / mito | Muitas tradições usam o motivo — **não** unificamos num credo | Alta (limite declarado) |

**Veredicto:** árvore = o que ficou e cresceu. No laboratório, Árvore da Vida = sombra partilhada depois da invernagem da mudinha.

## Arco semente → mudinha → árvore

| Fase | Figura | Ficha |
|------|--------|-------|
| Semente | Partida; cabe na mão | [Conto do laboratório](${conteudo}) |
| Mudinha | Invernagem; luz fraca; balde | [Bom dia, Inverno](${bomDia}) · poema #poema=bom-dia-inverno |
| Árvore | Sombra, raiz profunda, ofício nas duas mãos | **Esta ficha** · poema #poema=arvore-da-vida |

## O poema

Poesia original do laboratório — eco da árvore sénior. **Não** é texto sagrado de uma tradição única; é verso BudGanja — tipografia igual à [página Vida](${vida}#poema=arvore-da-vida).

\`\`\`poem
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=arvore-da-vida)

## Rede BudGanja (mapa rápido)

| Recurso | Papel |
|---------|-------|
| [Conto](${conteudo}) | Sementinha → planta Sênior |
| [Bom dia, Inverno](${bomDia}) | Mudinha no gelo — irmã mais nova |
| [Vida](${vida}) · [Diário](${diario}) | Ficar; registar o crescimento |
| [Cultivo](${cultivo}) · [Plantas](${plantas}) | Tempo lento; habitat |
| [Gesto](${gesto}) · [Mãos](${maos}) · [Balde](${balde}) | Ofício que a árvore ainda pede |
| [Águas…](${aguas}) · [Lágrimas da Vida](${lagrimas}) | Artes irmãs do canto Vida |
| [Faça o melhor!](${mantra}) · [Caminho](${caminho}) · [Simbiose](${simbiose}) | Mantra, percurso, companhia |

### Como ler

1. Entrar pela **palavra** (*arbor* / árvore).  
2. Se soar só a mito antigo, trazer ao **arco BudGanja** (semente–mudinha–árvore).  
3. Se soar a «já chegámos», lembrar: sénior ainda cultiva — [gesto](${gesto}) e [mãos](${maos}).  
4. Voltar à [Vida](${vida}) ou ao [hub](${inspecoes}).

## Avaliação BudGanja

### Forças
- Fecha o arco anunciado em Bom dia, Inverno («Árvore — ainda não»).  
- Une conto, mudinha, cultivo e poema.  
- Mantém o cuidado depois da «chegada».

### Limites
- Não é monografia de uma tradição religiosa.  
- Não é guia de poda ou inventário florestal.

## Como repetir o método

1. Fixar étimo + locução.  
2. Tabela do arco (3 fases).  
3. Poema + elos.  
4. Declaração: árvore ≠ fim do ofício.  
5. Status.

## Status

**Aprovado** — «Árvore da Vida» / «árvore» documentados como figura sénior do laboratório: semente → mudinha → árvore, com poema e rede.

[▶ Palavras](${hub}) · [▶ Poema Vida](${vida}#poema=arvore-da-vida) · [▶ Mudinha](${bomDia}) · [▶ Conto](${conteudo}) · [▶ Vida](${vida}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Árvore da Vida** (Tree of Life) and **árvore** — senior figure in the BudGanja arc: [seed](${conteudo}) → [seedling](${bomDia}) → **tree**. Not a single theology and not a forestry manual — lab metaphor of what stayed, grew and still asks for care.

> Etymon: Latin *arbor* → PT *árvore*. Motif: [Wikipedia · Tree of life](${wiki}). Word sheet ≠ creed.

## Object

| Field | Value |
|-------|-------|
| Word / figure | **Árvore da Vida** · **árvore** |
| Arc | Seed · seedling · tree |
| Links | [Vida](${vida}) · [Bom dia, Inverno](${bomDia}) · [conto](${conteudo}) · [gesture](${gesto}) · [hands](${maos}) |
| Date | ${inspected} |

## The poem

\`\`\`poem
${poemArvoreDaVidaEn()}
\`\`\`

[▶ Read on Vida](${vida}#poema=arvore-da-vida)

## Status

**Approved** — Tree of Life as senior Vida figure; seedling stage remains *Bom dia, Inverno*.

[▶ Words](${hub}) · [▶ Vida poem](${vida}#poema=arvore-da-vida) · [▶ Seedling](${bomDia}) · [▶ Conto](${conteudo})
`;

  const contentEs = `## Alcance

Inspección de **Árvore da Vida** y **árvore** — figura sénior del arco BudGanja: [semilla](${conteudo}) → [plantita](${bomDia}) → **árbol**. No es una sola teología ni manual forestal — metáfora de lo que se quedó, creció y aún pide cuidado.

> Étimo: latín *arbor* → PT *árvore*. Motivo: [Wikipedia · Árbol de la vida](${wiki}). Ficha ≠ credo.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra / figura | **Árvore da Vida** · **árvore** |
| Arco | Semilla · plantita · árbol |
| Vínculos | [Vida](${vida}) · [Bom dia, Inverno](${bomDia}) · [cuento](${conteudo}) · [gesto](${gesto}) · [manos](${maos}) |
| Fecha | ${inspected} |

## El poema

\`\`\`poem
${poemArvoreDaVidaEs()}
\`\`\`

[▶ Leer en Vida](${vida}#poema=arvore-da-vida)

## Estado

**Aprobada** — Árbol de la Vida como figura sénior de Vida; la plantita sigue en *Bom dia, Inverno*.

[▶ Palabras](${hub}) · [▶ Poema Vida](${vida}#poema=arvore-da-vida) · [▶ Plantita](${bomDia}) · [▶ Cuento](${conteudo})
`;

  return { body, contentEn, contentEs };
}

function buildArvoreDaVidaPost() {
  const { body, contentEn, contentEs } = buildArvoreDaVidaBodies();
  return palavraPost({
    title: 'Inspeção: Árvore da Vida — a fase sénior do arco semente–mudinha–árvore',
    titleEn: 'Inspection: Tree of Life — the senior phase of the seed–seedling–tree arc',
    titleEs: 'Inspección: Árbol de la Vida — la fase sénior del arco semilla–plantita–árbol',
    excerpt:
      'Palavras: «Árvore da Vida» / «árvore» (lat. *arbor*) — figura sénior do laboratório: semente → mudinha → árvore, com poema e ofício contínuo.',
    excerptEn:
      'Words: “Árvore da Vida” / “árvore” (Lat. *arbor*) — senior lab figure: seed → seedling → tree, with poem and ongoing craft.',
    excerptEs:
      'Palabras: «Árvore da Vida» / «árvore» (lat. *arbor*) — figura sénior del laboratorio: semilla → plantita → árbol, con poema y oficio continuo.',
    slug: 'inspecao-palavra-arvore-da-vida',
    date: '2026-08-02T22:30:00.000Z',
    seriesOrder: 26,
    seriesLabel: 'Árvore da Vida · palavra',
    coverImage: '/imagens/inspecoes/arvore-da-vida-palavra-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/%C3%81rvore_da_vida',
    body,
    contentEn,
    contentEs
  });
}

function buildAffBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const wiki =
    'https://pt.wiktionary.org/wiki/aff';

  const body = `## Escopo

**Inspeção severa** da interjeição **aff** (também *ah*, *uff*, *argh* no uso oral) — sopro de **exasperação** no português do Brasil. Não é substantivo de planta. Não é elogio. É o som curto que o peito solta quando algo **falha, cansa ou decepciona** — teclado a furar, frase a meio, pedido mal ouvido. Par oral frequente: **[já](${ja})** («aff, já…») — o peito + o relógio.

> **Nota metodológica:** auditoria independente, tom **severo**. Fontes: uso oral contemporâneo, [Wikcionário · aff](${wiki}), rede emocional BudGanja ([raiva](${raiva}), [medo](${medo}), [tristeza](${tristeza})). **Ficha de palavra ≠ terapia.** Catalogar ≠ ridicularizar quem diz «aff». Sem afiliação a redes de humor.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **aff** (var. *ahh*, *uff*, alongamentos *afff*) |
| Classe | Interjeição |
| Étimo (trabalho) | Onomatopeia / sopro de enfado — oralidade BR (confiança: alta no uso; baixa em étimo erudito) |
| Tipo BudGanja | Palavra — sinal de exasperação; risco de **fechar a inspeção** |
| Elo emoção | [raiva](${raiva}) · [medo](${medo}) · [tristeza](${tristeza}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [backspace](${backspace}) · [já](${ja}) · [Faça o melhor!](${mantra}) |
| Data | ${inspected} |

## Hipóteses e método (severo)

**H1:** «aff» é **válvula** — libera pressão sem nomear o objecto.  
**H2:** «aff» **bom** = marca o limite («isto cansou») e abre espaço para dizer o quê.  
**H3:** «aff» **mau** = substitui o relatório: cancela a conversa, a foto, a frase a caneta, a missão — sem [verdade](${verdade}).  
**H4:** «aff» + [já](${ja}) («aff, já cansei / já deu») junta **peito** e **relógio** — atalho clássico para fechar sem método.

Passos:

1. Fixar forma e variantes.  
2. Separar enfado legítimo de silenciamento.  
3. Mapear o que o laboratório **não** deixa o «aff» apagar.  
4. Cruzar com [já](${ja}).  
5. Status.

## Achados (sem pieguice)

| Uso | Leitura severa | Elo |
|-----|----------------|-----|
| «Aff» + explicação | Ofício — o enfado é dado; o método continua | [gesto](${gesto}) · [mantra](${mantra}) |
| «Aff» sozinho e fim | Fecho prematuro — o objecto some | [verdade](${verdade}) |
| «Aff, já…» | Peito + tempo — risco alto de fecho vazio | [já](${ja}) |
| «Aff» + apagar tudo | Tentação [backspace](${backspace}) do difícil | [backspace](${backspace}) |
| «Aff» virando rancor | Dose que fica — aviso | [vingança…](${vinganca}) · [raiva](${raiva}) |
| «Aff» no teclado furado | Ruído real ≠ desprezo pelo projecto | [medo](${medo}) · [Vida](${vida}) |

**Veredicto severo:** o laboratório **aceita** o «aff» como termómetro. **Recusa** o «aff» como veredicto final. Quem inspeciona não encerra a ficha com um sopro — nem com «aff, já».

## Rede BudGanja

| Recurso | Papel do «aff» |
|---------|----------------|
| [Já](${ja}) | Par oral — tempo/urgência ao lado do enfado |
| [Raiva](${raiva}) | Limite atravessado — nomear, não só soprar |
| [Tristeza](${tristeza}) · [medo](${medo}) | Enfado pode mascarar outro afecto |
| [Verdade](${verdade}) | Depois do «aff», o facto ainda precisa de frase |
| [Backspace](${backspace}) | Apagar o chat ≠ inspecionar o cansaço |
| [Faça o melhor!](${mantra}) | Ofício diário — inclusive quando dá «aff» |
| [Vida](${vida}) · [Diário](${diario}) | Registar o dia mesmo irritado |

## Limites

- Não patologiza quem diz «aff».  
- Não exige otimismo falso.  
- Não transforma enfado em prova de que «nada vale».  
- Sem protocolizar emoção.

## Status

**Aprovado com ressalva severa** — «aff» fichada como interjeição de exasperação; uso legítimo com método; uso que **encerra sem inspecionar** = reprovado no laboratório.

[▶ Palavras](${hub}) · [▶ Já](${ja}) · [▶ Raiva](${raiva}) · [▶ Verdade](${verdade}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

**Severe inspection** of Brazilian Portuguese interjection **aff** — short breath of exasperation. Not a plant name. Marks fatigue, disappointment, a stuck keyboard, a half-said sentence. Frequent oral pair: **[já](${ja})** (“aff, já…”).

> Method note: independent audit, severe tone. Support: oral use, [Wiktionary · aff](${wiki}). Word sheet ≠ therapy.

## Object

| Field | Value |
|-------|-------|
| Word | **aff** |
| Class | Interjection |
| Lab type | Exasperation signal — risk of closing the inspection early |
| Date | ${inspected} |

## Severe findings

| Use | Reading |
|-----|---------|
| “Aff” + what failed | Craft — name the object |
| “Aff” alone as ending | Premature close — object vanishes |
| “Aff” + erase all | [Backspace](${backspace}) temptation |
| “Aff, já…” | Chest + clock — high risk of empty close | [já](${ja}) |

**Verdict:** the lab accepts “aff” as a thermometer. It refuses “aff” as a final verdict — including “aff, já”.

## Status

**Approved with severe caveat** — legitimate as signal; rejected as silence that skips method.

[▶ Words](${hub}) · [▶ Já](${ja}) · [▶ Anger](${raiva}) · [▶ Truth](${verdade}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

**Inspección severa** de la interjección brasileña **aff** — soplo de exasperación. No es nombre de planta. Marca cansancio, decepción, teclado que falla, frase a medias. Par oral frecuente: **[já](${ja})** («aff, já…»).

> Nota: auditoría independiente, tono severo. Apoyo: uso oral, [Wikcionario · aff](${wiki}). Ficha ≠ terapia.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **aff** |
| Clase | Interjección |
| Tipo lab | Señal de exasperación — riesgo de cerrar la inspección |
| Fecha | ${inspected} |

## Hallazgos severos

| Uso | Lectura |
|-----|---------|
| «Aff» + qué falló | Oficio — nombrar el objeto |
| «Aff» solo como cierre | Cierre prematuro |
| «Aff» + borrar todo | Tentación [backspace](${backspace}) |
| «Aff, já…» | Pecho + reloj — alto riesgo de cierre vacío | [já](${ja}) |

**Veredicto:** el laboratorio acepta «aff» como termómetro. Rechaza «aff» como veredicto final — también «aff, já».

## Estado

**Aprobada con salvedad severa** — legítima como señal; rechazada como silencio sin método.

[▶ Palabras](${hub}) · [▶ Já](${ja}) · [▶ Rabia](${raiva}) · [▶ Verdad](${verdade}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildAffPost() {
  const { body, contentEn, contentEs } = buildAffBodies();
  return palavraPost({
    title: 'Inspeção: Aff — exasperação e o risco de fechar sem método',
    titleEn: 'Inspection: Aff — exasperation and the risk of closing without method',
    titleEs: 'Inspección: Aff — exasperación y el riesgo de cerrar sin método',
    excerpt:
      'Palavras: «aff» — interjeição BR de enfado; inspeção severa: termómetro ok, veredicto final sem relatório = reprovado.',
    excerptEn:
      'Words: “aff” — Brazilian exasperation interjection; severe inspection: thermometer ok, final verdict without report = fail.',
    excerptEs:
      'Palabras: «aff» — interjección BR de hastío; inspección severa: termómetro ok, veredicto final sin informe = reprobado.',
    slug: 'inspecao-palavra-aff',
    date: '2026-08-02T22:55:00.000Z',
    seriesOrder: 27,
    seriesLabel: 'Aff · palavra',
    coverImage: '/imagens/inspecoes/aff-palavra-cover.jpg',
    sourceUrl: 'https://pt.wiktionary.org/wiki/aff',
    body,
    contentEn,
    contentEs
  });
}

function buildLavarBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/guia/cultivo-basico.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const balde = '/posts/post-inspecao-palavra-balde.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const aguas = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const wiki = 'https://pt.wiktionary.org/wiki/lavar';
  const wikiLat = 'https://en.wiktionary.org/wiki/lavare#Latin';

  const body = `## Escopo

Inspeção editorial e de ofício da palavra **lavar** — do gesto das **[mãos](${maos})** com [água](${agua}) até a figura **«lavar a alma»**: quando a água (e a lágrima) limpa o centro íntimo **com método**, e quando a frase só **apaga** culpa sem inspecionar.

> **Nota metodológica:** auditoria independente. Étimo: latim *lavāre* → PT **lavar** ([Wikcionário](${wiki}); [lavāre](${wikiLat})). **Alma** aqui = centro íntimo (paz, carácter, humor de fundo) — como na ficha [vingança… envenena a alma](${vinganca}); **não** é tratado teológico. Ficha ≠ protocolo clínico nem absolvição ritual. Sem afiliação comercial ou religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **lavar** (+ figura **lavar a alma**) |
| Classe | Verbo · locução metafórica |
| Étimo | Lat. *lavāre* — lavar, banhar (confiança: alta) |
| Família | *lava* · *lavagem* · *lavatório* · esp. *lavar* · fr. *laver* · it. *lavare* |
| Tipo BudGanja | Palavra — mãos + água → alma (cuidado × fuga) |
| Elo mãos | [mão esquerda × mão direita](${maos}) |
| Elo água / lágrima | [água](${agua}) · [Águas e Lágrimas](${aguas}) · [Lágrimas da Vida](${lagrimas}) |
| Elo alma / aviso | [vingança mata a alma…](${vinganca}) · [tristeza](${tristeza}) · [medo](${medo}) · [raiva](${raiva}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** lavar começa no **gesto** — [mãos](${maos}) + [água](${agua}) / [balde](${balde}).  
**H2:** **lavar a alma** (bom) = ficar com o que doeu, nomear, registar, [Faça o melhor!](${mantra}) — a água/lágrima limpa **sem apagar** a [verdade](${verdade}).  
**H3:** **lavar a alma** (mau) = [backspace](${backspace}) afectivo — «já limpei» sem inspecionar; primo de «lavar as mãos» (fuga).  
**H4:** a alma **envenenada** pela vingança ([ficha](${vinganca})) não se lava com rancor de retorno — lava-se com ofício e ficar.

Passos:

1. Étimo + mãos.  
2. Escada: mãos → utensílio → dia → alma.  
3. Separar lavar a alma (cuidado) de lavar as mãos (isentar-se).  
4. Status.

## Origens

| Marco | O que importa | Confiança |
|-------|---------------|-----------|
| Lat. *lavāre* | Raiz românica | Alta |
| Uso prático | Mãos, corpo, utensílio | Alta |
| «Lavar as mãos» | Pilatos / isentar-se | Alta (figura) |
| «Lavar a alma» | Purificar o íntimo (oralidade, fé popular, poesia) | Alta (uso) · média (definição única) |

**Veredicto:** o verbo toca o corpo; a figura **lavar a alma** toca o centro — o laboratório inspeciona **como**.

## Escada BudGanja: das mãos à alma

| Degrau | Gesto | Leitura |
|--------|-------|---------|
| 1. Lavar as mãos | Esquerda + direita | Ofício — preparar contacto com a planta |
| 2. Lavar o [balde](${balde}) / ferramenta | Uma segura, outra esfrega | Complementaridade |
| 3. Lavar o dia no [Diário](${diario}) | Escrever o que passou | Limpar ≠ apagar |
| 4. **Lavar a alma** | Mãos + água/lágrima + ficar | Cuidado do centro íntimo **com** [verdade](${verdade}) |

## Lavar a alma — bom × mau

| Uso | O que acontece | Elo |
|-----|----------------|-----|
| Bom | Nomeia o peso ([tristeza](${tristeza}) / [medo](${medo}) / [raiva](${raiva})), fica, regista, faz o melhor | [Águas e Lágrimas](${aguas}) · [mantra](${mantra}) · [Vida](${vida}) |
| Bom | A lágrima é [água](${agua}) em miniatura — limpa o olho e o peito sem mentir | [Lágrimas da Vida](${lagrimas}) |
| Mau | Declara «alma lavada» e apaga o facto / o crédito / o outro | [verdade](${verdade}) · [backspace](${backspace}) |
| Mau | Usa «lavar a alma» como **lavar as mãos** — isentar-se | Ressalva Pilatos |
| Mau | Tenta lavar com vingança — envenena em vez de limpar | [vingança…](${vinganca}) |

**Veredicto severo:** lavar a alma **exige mãos** (gesto) e **água verdadeira** (lágrima, palavra, ofício). Sem isso, é só slogan.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mãos L/R](${maos}) | Instrumento do lavar — até à alma, o corpo age |
| [Gesto](${gesto}) · [água](${agua}) · [balde](${balde}) | Meio concreto |
| [Águas e Lágrimas](${aguas}) · [Lágrimas…](${lagrimas}) | Água do peito |
| [Vingança… alma](${vinganca}) | O que envenena — lavar ≠ retaliar |
| [Verdade](${verdade}) · [backspace](${backspace}) | Limite: não apagar o difícil |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) | Ofício depois da água |

## Limites

- Não é absolvição religiosa nem terapia.  
- Não endossa «lavar as mãos» como virtude.  
- «Lavar a alma» bom = cuidado + método; mau = fuga com poesia.  
- Sem marcas de sabão nem seitas.

## Status

**Aprovado** — «lavar» chega às [mãos](${maos}) e sobe até **lavar a alma**: higiene e cuidado sim; apagar responsabilidade ou envenenar com vingança não.

[▶ Palavras](${hub}) · [▶ Mãos](${maos}) · [▶ Águas e Lágrimas](${aguas}) · [▶ Alma / vingança](${vinganca}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

**Lavar** (Lat. *lavāre*) — from **[hands](${maos})** with [water](${agua}) up to **“lavar a alma”** (wash the soul): cleaning the inner center **with method**, not erasing [truth](${verdade}).

> Method note: [Wiktionary · lavar](${wiki}). *Alma* = intimate center (as in [revenge poisons the soul](${vinganca})) — not a theology tract.

## Ladder

Hands → bucket/tool → diary day → **wash the soul**.

## Wash the soul — good × bad

| Use | Reading |
|-----|---------|
| Good | Name the weight, stay, record, do your best — tear as miniature water ([Águas…](${aguas})) |
| Bad | “Soul washed” while erasing the fact ([backspace](${backspace})) or washing hands of responsibility |
| Bad | Trying to wash with revenge — poisons instead ([ficha](${vinganca})) |

## Status

**Approved** — lavar reaches the hands and climbs to lavar a alma; care yes; evasion / poison no.

[▶ Words](${hub}) · [▶ Hands](${maos}) · [▶ Tears](${aguas}) · [▶ Soul / revenge](${vinganca})
`;

  const contentEs = `## Alcance

**Lavar** (lat. *lavāre*) — de las **[manos](${maos})** con [agua](${agua}) hasta **«lavar a alma»**: limpiar el centro íntimo **con método**, sin borrar la [verdad](${verdade}).

> Nota: [Wikcionario · lavar](${wiki}). *Alma* = centro íntimo (como en [venganza envenena el alma](${vinganca})) — no tratado teológico.

## Escalera

Manos → balde/herramienta → día del diario → **lavar el alma**.

## Lavar el alma — bueno × malo

| Uso | Lectura |
|-----|---------|
| Bueno | Nombrar el peso, quedarse, registrar, haz lo mejor — lágrima como agua ([Águas…](${aguas})) |
| Malo | «Alma lavada» borrando el hecho ([backspace](${backspace})) o lavarse las manos |
| Malo | Lavar con venganza — envenena ([ficha](${vinganca})) |

## Estado

**Aprobada** — lavar llega a las manos y sube a lavar a alma; cuidado sí; fuga / veneno no.

[▶ Palabras](${hub}) · [▶ Manos](${maos}) · [▶ Lágrimas](${aguas}) · [▶ Alma / venganza](${vinganca})
`;

  return { body, contentEn, contentEs };
}

function buildLavarPost() {
  const { body, contentEn, contentEs } = buildLavarBodies();
  return palavraPost({
    title: 'Inspeção: Lavar — das mãos à alma',
    titleEn: 'Inspection: Lavar — from the hands to the soul',
    titleEs: 'Inspección: Lavar — de las manos al alma',
    excerpt:
      'Palavras: «lavar» (lat. *lavāre*) — mãos com água até «lavar a alma»: cuidado com método; fuga e vingança = ressalva.',
    excerptEn:
      'Words: “lavar” (Lat. *lavāre*) — hands with water up to “wash the soul”: care with method; evasion and revenge = caveat.',
    excerptEs:
      'Palabras: «lavar» (lat. *lavāre*) — manos con agua hasta «lavar el alma»: cuidado con método; fuga y venganza = salvedad.',
    slug: 'inspecao-palavra-lavar',
    date: '2026-08-03T12:20:00.000Z',
    seriesOrder: 28,
    seriesLabel: 'Lavar · palavra',
    coverImage: '/imagens/inspecoes/lavar-palavra-cover.jpg',
    sourceUrl: 'https://pt.wiktionary.org/wiki/lavar',
    body,
    contentEn,
    contentEs
  });
}

function buildJaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wiki = 'https://pt.wiktionary.org/wiki/j%C3%A1';

  const body = `## Escopo

Inspeção editorial da palavra **já** — advérbio de tempo e urgência no português (lat. *iam*). No laboratório BR, cruza-se com a interjeição **[aff](${aff})**: «aff, já…» junta o **peito** (enfado) ao **relógio** (basta / agora / já foi). O melhor ofício [Faça o melhor!](${mantra}) não apaga o «já» — inspeciona-o.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · já](${wiki}), uso oral contemporâneo, ficha irmã [aff](${aff}). **Não confundir** com o código de idioma \`ja\` (japonês) no glossário Aprender — lá, o equivalente de «aff» é **はぁ** (*haa*), sopro parecido, outro sistema. Ficha ≠ cronometria clínica.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **já** |
| Classe | Advérbio (tempo · aspecto · urgência discursiva) |
| Étimo | Lat. *iam* — já, agora mesmo (confiança: alta) |
| Família | *já* · *já-já* · *desde já* · esp. *ya* · fr. *déjà* · it. *già* |
| Tipo BudGanja | Palavra — relógio da frase; par oral com [aff](${aff}) |
| Elo principal | [aff](${aff}) · [Faça o melhor!](${mantra}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [passar](${passar}) · [backspace](${backspace}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** «já» marca **tempo no discurso** — *já aconteceu*, *já chega*, *já vou*, *desde já*.  
**H2:** «já» **bom** = clareza temporal + urgência honesta («já reguei», «já registo»).  
**H3:** «já» **mau** = fecho prematuro («já deu», «já era») sem [verdade](${verdade}) — primo do «aff» sozinho.  
**H4:** o par **«aff, já…»** = termómetro + relógio; o laboratório exige relatório depois do sopro.

Passos:

1. Étimo e formas.  
2. Separar tempo útil de fecho vazio.  
3. Cruzar com [aff](${aff}) e o mantra.  
4. Nota \`ja\` ≠ japonês no glossário.  
5. Status.

## Aff × já (relação)

| Peça | Função | Risco |
|------|--------|-------|
| **[aff](${aff})** | Peito — exasperação | Fechar sem nomear |
| **já** | Relógio — bastou / agora / passado | Declarar fim sem inspecionar |
| **aff + já** | Atalho oral clássico BR | Silêncio duplo (afecto + tempo) |
| **[Faça o melhor!](${mantra})** | Ofício depois do atalho | Continuar com [gesto](${gesto}) |

**Veredicto:** «já» não é inimigo — é precisão. O mau uso é **usar o relógio para apagar a ficha**.

## Achados

| Uso | Leitura | Elo |
|-----|---------|-----|
| «Já fiz o melhor.» | Fecho de ofício — passado honesto do mantra | [mantra](${mantra}) |
| «Já registei no diário.» | Tempo + método | [Diário](${diario}) · [verdade](${verdade}) |
| «Já deu.» / «Já era.» | Fecho sem objecto | [aff](${aff}) · [backspace](${backspace}) |
| «Aff, já cansei.» | Peito + relógio — nomear o quê cansou | [aff](${aff}) · [gesto](${gesto}) |
| «Desde já» | Cortesia / compromisso futuro | [caminho](${caminho}) |
| O que [passou](${passar}) já passou | Tempo narrativo — ainda inspecionável | [passar](${passar}) |

## Nota: \`ja\` no glossário (japonês)

No modo Aprender idiomas, a chave **\`ja\`** = japonês. Para **aff**, a glosa é **はぁ** — sopro de enfado parecido com o BR. Isso **não** é a palavra portuguesa **já**. Duas relações diferentes: (1) par oral **aff × já**; (2) equivalência intercultural **aff ≈ はぁ**.

## Limites

- Não cronometra emoção.  
- Não exige pressa falsa («já» ≠ perfeccionismo).  
- Distinto do código ISO \`ja\`.

## Status

**Aprovado** — «já» fichada como relógio da frase; par com [aff](${aff}); fecho vazio («já deu» sem relatório) = ressalva; [Faça o melhor!](${mantra}) continua depois do «já».

[▶ Palavras](${hub}) · [▶ Aff](${aff}) · [▶ Faça o melhor!](${mantra}) · [▶ Passar](${passar}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Word sheet for Portuguese **já** — adverb of time and urgency (Lat. *iam*). In Brazilian speech it often pairs with **[aff](${aff})**: “aff, já…” joins the **chest** (exasperation) to the **clock** (enough / now / already). [Do your best!](${mantra}) does not erase “já” — it inspects it.

> Method note: [Wiktionary · já](${wiki}). Sister sheet: [aff](${aff}). Do **not** confuse with glossary language code \`ja\` (Japanese) — there, “aff” ≈ **はぁ** (*haa*).

## Object

| Field | Value |
|-------|-------|
| Word | **já** |
| Class | Adverb |
| Etymon | Lat. *iam* |
| Main links | [aff](${aff}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Aff × já

| Piece | Role | Risk |
|-------|------|------|
| [aff](${aff}) | Chest — exasperation | Close without naming |
| **já** | Clock — enough / now / past | Declare end without inspecting |
| **aff + já** | Classic BR shortcut | Double silence |
| [Do your best!](${mantra}) | Craft after the shortcut | Continue with [gesture](${gesto}) |

## Status

**Approved** — “já” as the sentence’s clock; pair with [aff](${aff}); empty close = caveat.

[▶ Words](${hub}) · [▶ Aff](${aff}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Ficha de **já** — adverbio de tiempo y urgencia (lat. *iam*). En el habla BR suele ir con **[aff](${aff})**: «aff, já…» junta el **pecho** (hastío) al **reloj** (basta / ahora / ya). [¡Haz lo mejor!](${mantra}) no borra el «já» — lo inspecciona.

> Nota: [Wikcionario · já](${wiki}). Hermana: [aff](${aff}). No confundir con el código \`ja\` (japonés) del glosario — allí «aff» ≈ **はぁ**.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **já** |
| Clase | Adverbio |
| Étimo | Lat. *iam* |
| Vínculos | [aff](${aff}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Aff × já

| Pieza | Rol | Riesgo |
|-------|-----|--------|
| [aff](${aff}) | Pecho — exasperación | Cerrar sin nombrar |
| **já** | Reloj — basta / ahora / pasado | Declarar fin sin inspeccionar |
| **aff + já** | Atajo oral BR | Silencio doble |
| [¡Haz lo mejor!](${mantra}) | Oficio después del atajo | Seguir con [gesto](${gesto}) |

## Estado

**Aprobada** — «já» como reloj de la frase; par con [aff](${aff}); cierre vacío = salvedad.

[▶ Palabras](${hub}) · [▶ Aff](${aff}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildJaPost() {
  const { body, contentEn, contentEs } = buildJaBodies();
  return palavraPost({
    title: 'Inspeção: Já — o relógio da frase e o par com aff',
    titleEn: 'Inspection: Já — the sentence’s clock and the pair with aff',
    titleEs: 'Inspección: Já — el reloj de la frase y el par con aff',
    excerpt:
      'Palavras: «já» (lat. *iam*) — tempo e urgência; par oral com «aff»; fecho vazio = ressalva; Faça o melhor! continua.',
    excerptEn:
      'Words: “já” (Lat. *iam*) — time and urgency; oral pair with “aff”; empty close = caveat; Do your best! continues.',
    excerptEs:
      'Palabras: «já» (lat. *iam*) — tiempo y urgencia; par oral con «aff»; cierre vacío = salvedad; ¡Haz lo mejor! sigue.',
    slug: 'inspecao-palavra-ja',
    date: '2026-08-03T14:00:00.000Z',
    seriesOrder: 29,
    seriesLabel: 'Já · palavra',
    coverImage: '/imagens/inspecoes/ja-palavra-cover.jpg',
    sourceUrl: 'https://pt.wiktionary.org/wiki/j%C3%A1',
    body,
    contentEn,
    contentEs
  });
}

function buildGenialBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const cultivo = '/cultivo/';
  const comunidade = '/comunidade/';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lavar = '/posts/post-inspecao-palavra-lavar.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const legal = '/posts/post-inspecao-palavra-legal.html';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const fantastico = '/posts/post-inspecao-palavra-fantastico.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/genial';
  const wikiGenio = 'https://pt.wiktionary.org/wiki/g%C3%AAnio';
  const abracadabra = '/posts/post-inspecao-palavra-abracadabra.html';
  const gemeos = '/posts/post-inspecao-palavra-gemeos.html';
  const wikiAladim = 'https://pt.wikipedia.org/wiki/Aladim';

  const body = `## Escopo

Inspeção editorial da palavra **genial** — adjetivo (e interjeição de elogio no português do Brasil). Morfologia: [gênio](${wikiGenio}) + *-al*. Nomeia o que parece **nascido do engenho** — ideia luminosa, solução elegante, obra que acerta. No **projecto Inspetor BudGanja**, «genial!» celebra um **feito do laboratório** (ficha, verso, elo, cultivo); **não** substitui o [gesto](${gesto}) nem o mantra [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · genial](${wiki}), [gênio](${wikiGenio}), uso oral BR contemporâneo. **Ficha ≠ culto do génio inato.** Distinto do inglês *genial* («amável / clima ameno») — falso amigo parcial. Sem afiliação a rankings de IQ. Escala-irmã: [legal](${legal}) (gíria) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}).

## O que é de verdade

**Genial** não é «qualquer coisa boa» nem «pessoa especial». É adjetivo de **engenho**: o que parece ter saído de uma ideia que **acertou**.

| O que muita gente sente | O que a palavra é |
|-------------------------|-------------------|
| «Gostei» / «massa» | Isso é mais [legal](${legal}) (gíria) |
| «Uau, abriu o peito» | Isso é mais [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) |
| «Essa pessoa é um ídolo» | Isso é [ídolo](${idolo}) — pedestal de **pessoa** |
| «Nasceu génio» | Mito; a ficha não mede QI |
| **«Essa ideia / esse feito acertou»** | **Isto é genial** — engenho com rasto |

Raiz: latim *genius* (espírito tutelar / engenho) → português *gênio* + *-al*. No Brasil, «genial!» virou **sopro de elogio**. No inglês, *genial* quase sempre quer dizer **amável / clima ameno** — **não** é o mesmo.

No lab: dizer «genial» aponta para um **feito** (ficha, verso, elo, cultivo) — não substitui [Faça o melhor!](${mantra}) nem o [gesto](${gesto}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **genial** |
| Classe | Adjetivo · interjeição de elogio (uso oral BR) |
| Étimo | *gênio* + *-al* ← lat. *genius* (espírito tutelar / engenho) — confiança: alta |
| Família | *gênio* · *genialmente* · *genialidade* · fr. *génial* · esp. *genial* · it. *geniale* |
| Falso amigo EN | Ingl. *genial* ≈ amável / temperado — **não** o elogio BR «genial!» |
| Tipo BudGanja | Palavra — elogio de engenho **no projecto**; risco de flattery vazia ou culto do génio |
| Elo principal | [criatividade](${criatividade}) · [Faça o melhor!](${mantra}) · [hub Inspeções](${hubAll}) |
| Elo escala | [aff](${aff}) · [legal](${legal}) (gíria «bacana») · **genial** · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) |
| Elo contraste | [especial](${especial}) (particular) · [ídolo](${idolo}) (admirar pessoa ≠ elogiar feito) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [Ayrton Senna](${senna}) |
| Elo armadilha | [gêmeos](${gemeos}) (*geminus*, par) · génio da lâmpada / [Aladim](${wikiAladim}) · [abracadabra](${abracadabra}) |
| Elo projecto | [Vida](${vida}) · [Diário](${diario}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** «genial» aponta **engenho reconhecido** — ideia, verso, setup, inspeção que acertou.  
**H2:** «genial» **bom** = celebra o feito **com** o método visível (crédito, [verdade](${verdade}), repetibilidade).  
**H3:** «genial» **mau** = flattery que dispensa o ofício («já é genial, não precisa inspecionar») — primo do fecho [já](${ja}) / sopro [aff](${aff}).  
**H4:** [Faça o melhor!](${mantra}) ≠ «seja genial» — o melhor possível **nesta mão, hoje**, não o mito do génio absoluto.  
**H5:** no BudGanja, «genial» aponta para **obra rastreável** no site — não para vaidade sem ficha.  
**H6:** na escala de elogio BR, **genial** = polo do **engenho** — entre [legal](${legal}) (aprovação leve) e [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) (assombro / «uau»); ≠ [especial](${especial}) (particularidade); ≠ [ídolo](${idolo}) (pedestal de pessoa).  
**H7:** *gênio* (raiz de **genial**) ≠ *[gêmeos](${gemeos})* (lat. *geminus*, par / signo Gemini).  
**H8:** o **génio da lâmpada** de [Aladim](${wikiAladim}) (oral **Geneo**) é desejo sem rasto — primo de [abracadabra](${abracadabra}), **não** o elogio «genial!».

## Gênio, Geneo, lâmpada, gêmeos

O mesmo *gên-* na página BR junta **quatro ofícios**. O lab separa:

| Forma | Família | Leitura lab |
|-------|---------|-------------|
| **genial** | *genius* + *-al* | Elogio de **engenho com rasto** — esta ficha |
| **gênio** (pessoa / espírito) | *genius* | Tutela ou talento; risco de [ídolo](${idolo}) |
| **Geneo / génio da lâmpada** | o mesmo *genius* + conto | Servidor de desejos em [Aladim](${wikiAladim}) — atalho; ver [abracadabra](${abracadabra}) |
| **gêmeos** | *geminus* | Par de nascimento / signo — ficha [gêmeos](${gemeos}), **outro étimo** |

**Correção:** dizer «genial» a um feito ≠ esfregar a lâmpada ≠ nascer gêmeo. [Faça o melhor!](${mantra}) pede [gesto](${gesto}), não três desejos.

Passos:

1. Étimo *gênio* + *-al* e falso amigo EN.  
2. Separar elogio com método de culto vazio.  
3. Situar na escala de elogio / intensidade (cluster).  
4. Mapear «genial» nas peças do **projecto**.  
5. Cruzar com criatividade, mantra e Senna.  
6. Status.

## Escala de elogio e intensidade (oralidade BR)

Mapa aproximado do peito — **não** ranking moral nem QI:

| Intensidade | Palavra / sopro | O que marca | Elo |
|-------------|-----------------|-------------|-----|
| Baixa / peso | [aff](${aff}) | Enfado, decepção, «já chega» | Contraste |
| Média / aprovação | [legal](${legal}) (gíria) | «Bacana / ok / massa» — elogio leve | Escada BR |
| Média+ / engenho | **genial** | Ideia ou feito que **acertou o engenho** | Esta ficha |
| Alta / assombro | [maravilhoso](${maravilhoso}) | Espanto + calor — «abriu o peito» | Irmã |
| Alta / imaginação + «uau» | [fantástico](${fantastico}) | Fantasia **ou** elogio forte («demais!») | Irmã |
| Alta / exclamação | [meudeusdoceu](${meudeusdoceu}) | Assombro em sopro colado | Expressão |

**Leitura da escala:** [aff](${aff}) fecha; [legal](${legal}) (gíria) aprova com leveza; **genial** aponta o **engenho**; [maravilhoso](${maravilhoso}) aponta o assombro caloroso; [fantástico](${fantastico}) pode ser mundo imaginado *ou* elogio alto. Podem coexistir («genial e maravilhoso») — não são rivais. Contrastes: [especial](${especial}) = particularidade; [ídolo](${idolo}) = admirar **pessoa** / imagem — o lab prefere elogiar o **feito** genial sem entregar o [gesto](${gesto}). (O eixo jurídico de *legal* fica na ficha [legal](${legal}); aqui usamos o polo «bacana».)

**Veredicto escala:** escolher a palavra com [verdade](${verdade}) — hipérbole gentil ok; elogio vazio que dispensa inspeção = ressalva.

## Genial × projecto BudGanja

O Inspetor BudGanja **não** pede génio — pede **ofício**. Quando alguém diz «genial» ao projecto, o laboratório traduz:

| Peça do projecto | O que pode ser «genial» (com método) | Elo |
|------------------|--------------------------------------|-----|
| [Inspeções / Palavras](${hub}) | Ficha nova, elo inesperado, étimo bem posto | [criatividade](${criatividade}) · [verdade](${verdade}) |
| [Vida](${vida}) · [poemas](${poemMantra}) | Verso que fica; mantra no banner | [Faça o melhor!](${mantra}) |
| [Diário](${diario}) | Dia registado sem apagar o difícil | [gesto](${gesto}) · [lavar](${lavar}) |
| [Cultivo](${cultivo}) | Setup, balde, mão — engenho prático | [caminho](${caminho}) |
| [Comunidade](${comunidade}) | Partilha com crédito, sem roubo do alheio | [mantra](${mantra}) |
| [Senna](${senna}) | Excelência brasileira como figura-irmã do ofício | Pessoas |
| [aff](${aff}) × [já](${ja}) | Quando o peito cansa — ainda assim inspecionar | Aviso |

**Leitura de projecto:** genial é o **elogio depois do commit** (ficha publicada, elo vivo, verso no ar) — não o atalho antes do trabalho.

## Achados

| Uso | Leitura | Elo |
|-----|---------|-----|
| «Genial!» + o quê acertou no site | Ofício — elogio com objecto do projecto | [verdade](${verdade}) · [gesto](${gesto}) |
| «Ideia genial» + ficha / poema / elo | [Criatividade](${criatividade}) com método | [hub](${hubAll}) |
| «Que legal» vs «genial» | Aprovação leve × engenho reconhecido | [legal](${legal}) |
| «Maravilhoso / fantástico» no peito | Assombro / «uau» — irmãos, não rivais | [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) |
| «É um génio / meu ídolo» | Pessoa no pedestal ≠ feito inspeccionado | [ídolo](${idolo}) · [Senna](${senna}) |
| «O projecto é genial» sem abrir ficha | Flattery — apaga a inspeção | [aff](${aff}) · [já](${ja}) |
| «Não sou genial, então paro» | Armadilha — o BudGanja corre no mantra | [mantra](${mantra}) · [Vida](${vida}) |
| Excelência na pista / no ofício | Engenho treinado, não só rótulo | [Senna](${senna}) · [caminho](${caminho}) |

**Veredicto:** o laboratório **gosta** de ouvir «genial» quando há **feito no projecto**. **Desconfia** quando a palavra fecha a ficha sem relatório.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Hub Inspeções](${hubAll}) | Onde o engenho vira ficha |
| [Criatividade](${criatividade}) | Inventar com método — solo do «genial» |
| [Legal](${legal}) · [Maravilhoso](${maravilhoso}) · [Fantástico](${fantastico}) | Cluster de elogio / intensidade |
| [Especial](${especial}) · [Ídolo](${idolo}) · [aff](${aff}) | Particular · pedestal · enfado (contrastes) |
| [Faça o melhor!](${mantra}) · [poema](${poemMantra}) | Escala diária do projecto — melhor ≠ génio absoluto |
| [Gesto](${gesto}) · [Verdade](${verdade}) | Prova do elogio |
| [Lavar](${lavar}) · [já](${ja}) | Rede recente — peito, relógio, cuidado |
| [Ayrton Senna](${senna}) | Excelência brasileira com ofício |
| [Gêmeos](${gemeos}) | Par (*geminus*) — **não** colar a *gênio* |
| [Abracadabra](${abracadabra}) · [Aladim](${wikiAladim}) | Fórmula e lâmpada — desejo ≠ elogio |
| [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) | Trilhas onde o engenho se pratica |

## Limites

- Não mede QI nem «talento inato».  
- Não exige genialidade para publicar inspeção no BudGanja.  
- Ingl. *genial* (amável) ≠ elogio BR.  
- Elogiar o projecto ≠ dispensar o próximo [gesto](${gesto}).  
- «Genial» ≠ [especial](${especial}); ≠ eixo jurídico de [legal](${legal}); ≠ culto de [ídolo](${idolo}).

## Status

**Aprovado** — «genial» fichada como elogio de engenho **ligado ao projecto** Inspetor BudGanja; polo da escala BR entre [legal](${legal}) e [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}); contraste com [ídolo](${idolo}); uso com objecto e método sim; culto vazio / «já é genial» sem inspecionar = ressalva.

[▶ Palavras](${hub}) · [▶ Legal](${legal}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Fantástico](${fantastico}) · [▶ Ídolo](${idolo}) · [▶ Criatividade](${criatividade}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Word sheet for Portuguese **genial** — adjective and praise interjection in Brazilian use (*gênio* + *-al*). In the **Inspetor BudGanja project**, “genial!” celebrates a **lab deed** (sheet, verse, link, grow); it does **not** replace [gesture](${gesto}) or [Do your best!](${mantra}).

> Method note: [Wiktionary · genial](${wiki}). Partial false friend with English *genial*. Word sheet ≠ IQ cult. Praise scale: [legal](${legal}) (slang) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}).

## What it actually is

Portuguese **genial** is not “anything nice” and not “a special person”. It names **ingenuity**: a deed or idea that **hit**.

| What people often mean | What the word is |
|------------------------|------------------|
| “I liked it” / “cool” | Closer to slang [legal](${legal}) |
| “Wow, it opened the chest” | Closer to [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) |
| “That person is an idol” | [ídolo](${idolo}) — a pedestal for a **person** |
| “Born a genius” | Myth; this sheet does not measure IQ |
| **“That idea / that deed hit”** | **This is genial** — ingenuity with a trail |

Root: Latin *genius* → Portuguese *gênio* + *-al*. In Brazil, “genial!” became a **praise puff**. In English, *genial* almost always means **amiable / mild weather** — **not** the same.

In the lab: “genial” points to a **deed** (sheet, verse, link, grow) — it does not replace [Do your best!](${mantra}) or [gesture](${gesto}).

## Object

| Field | Value |
|-------|-------|
| Word | **genial** |
| Class | Adjective · praise interjection (BR oral) |
| Etymon | *gênio* + *-al* ← Lat. *genius* |
| Praise scale | [aff](${aff}) · [legal](${legal}) · **genial** · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) |
| Project links | [Inspections](${hubAll}) · [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidade](${comunidade}) |
| Main links | [creativity](${criatividade}) · [Do your best!](${mantra}) · [Senna](${senna}) · [especial](${especial}) · [ídolo](${idolo}) |
| Date | ${inspected} |

## Praise / intensity scale (BR oral)

| Intensity | Word | Marks |
|-----------|------|-------|
| Low / weight | [aff](${aff}) | Exasperation |
| Mid / approval | [legal](${legal}) (slang) | “Cool / nice” |
| Mid+ / craft | **genial** | Deed that hit **ingenuity** |
| High / awe | [maravilhoso](${maravilhoso}) | Warm wonder |
| High / “wow” | [fantástico](${fantastico}) | Fantasy **or** strong praise |

**Reading:** genial is the **craft/ingenuity** pole — not a synonym of [especial](${especial}) (particular) or [ídolo](${idolo}) (person on a pedestal). Legal’s juridical axis lives on the [legal](${legal}) sheet; here we use the “cool” pole.

## Genial × BudGanja project

| Project piece | What can be “genial” (with method) |
|---------------|-------------------------------------|
| [Inspections / Words](${hub}) | New sheet, sharp link, clean etymon |
| [Vida](${vida}) · [poem](${poemMantra}) | Verse that stays; mantra on the banner |
| [Diário](${diario}) | Day recorded without erasing the hard part |
| [Cultivo](${cultivo}) | Practical ingenuity |
| [Comunidade](${comunidade}) | Sharing with credit |

**Project reading:** genial is praise **after the commit** — not a shortcut before the work.

## Findings

| Use | Reading |
|-----|---------|
| “Genial!” + what worked on the site | Craft — praise with a project object |
| “Que legal” vs “genial” | Light approval vs recognized ingenuity |
| “The project is genial” without opening a sheet | Flattery — skips inspection |
| “I’m not a genius, so I stop” | Trap — BudGanja runs on the mantra |

## Status

**Approved** — praise of ingenuity **tied to the project**; BR praise-scale pole between [legal](${legal}) and [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}); contrast [ídolo](${idolo}); empty cult = caveat.

[▶ Words](${hub}) · [▶ Legal](${legal}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Fantástico](${fantastico}) · [▶ Ídolo](${idolo}) · [▶ Creativity](${criatividade}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Ficha de **genial** — adjetivo y exclamación de elogio en el uso BR (*gênio* + *-al*). En el **proyecto Inspetor BudGanja**, «¡genial!» celebra un **hecho del laboratorio** (ficha, verso, vínculo, cultivo); **no** sustituye el [gesto](${gesto}) ni [¡Haz lo mejor!](${mantra}).

> Nota: [Wikcionario · genial](${wiki}). Falso amigo parcial con el inglés *genial*. Ficha ≠ culto al genio innato. Escala: [legal](${legal}) (jerga) · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}).

## Qué es de verdad

**Genial** no es «cualquier cosa buena» ni «persona especial». Nombra **ingenio**: lo que parece haber **acertado**.

| Lo que mucha gente siente | Lo que la palabra es |
|---------------------------|----------------------|
| «Me gustó» / «chévere» | Eso es más [legal](${legal}) (jerga) |
| «Guau, abrió el pecho» | Eso es más [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}) |
| «Esa persona es un ídolo» | Eso es [ídolo](${idolo}) — pedestal de **persona** |
| «Nació genio» | Mito; la ficha no mide CI |
| **«Esa idea / ese hecho acertó»** | **Esto es genial** — ingenio con rastro |

Raíz: latín *genius* → portugués *gênio* + *-al*. En Brasil, «¡genial!» se volvió **soplo de elogio**. En inglés, *genial* casi siempre quiere decir **amable / clima templado** — **no** es lo mismo.

En el lab: decir «genial» apunta a un **hecho** (ficha, verso, vínculo, cultivo) — no sustituye [¡Haz lo mejor!](${mantra}) ni el [gesto](${gesto}).

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **genial** |
| Clase | Adjetivo · interjección de elogio (oral BR) |
| Étimo | *gênio* + *-al* ← lat. *genius* |
| Escala | [aff](${aff}) · [legal](${legal}) · **genial** · [maravilhoso](${maravilhoso}) · [fantástico](${fantastico}) |
| Vínculos de proyecto | [Inspecciones](${hubAll}) · [Vida](${vida}) · [Cultivo](${cultivo}) · [Comunidad](${comunidade}) |
| Vínculos | [creatividad](${criatividade}) · [¡Haz lo mejor!](${mantra}) · [Senna](${senna}) · [especial](${especial}) · [ídolo](${idolo}) |
| Fecha | ${inspected} |

## Escala de elogio / intensidad (oralidad BR)

| Intensidad | Palabra | Marca |
|------------|---------|-------|
| Baja / peso | [aff](${aff}) | Hastío |
| Media / aprobación | [legal](${legal}) (jerga) | «Bacán / ok» |
| Media+ / ingenio | **genial** | Hecho que acertó el **ingenio** |
| Alta / asombro | [maravilhoso](${maravilhoso}) | Asombro cálido |
| Alta / «guau» | [fantástico](${fantastico}) | Fantasía **o** elogio fuerte |

**Lectura:** genial es el polo del **ingenio** — no sinónimo de [especial](${especial}) ni de [ídolo](${idolo}) (pedestal de persona). El eje jurídico de *legal* vive en la ficha [legal](${legal}); aquí usamos el polo «bacán».

## Genial × proyecto BudGanja

| Pieza del proyecto | Qué puede ser «genial» (con método) |
|--------------------|-------------------------------------|
| [Inspecciones / Palabras](${hub}) | Ficha nueva, vínculo afilado |
| [Vida](${vida}) · [poema](${poemMantra}) | Verso que queda; mantra |
| [Diario](${diario}) | Día registrado |
| [Cultivo](${cultivo}) | Ingenio práctico |
| [Comunidad](${comunidade}) | Compartir con crédito |

**Lectura de proyecto:** genial es el elogio **después del commit** — no el atajo antes del trabajo.

## Hallazgos

| Uso | Lectura |
|-----|---------|
| «¡Genial!» + qué acertó en el sitio | Oficio — elogio con objeto del proyecto |
| «Qué legal» vs «genial» | Aprobación leve × ingenio reconocido |
| «El proyecto es genial» sin abrir ficha | Halago — salta la inspección |
| «No soy genial, entonces paro» | Trampa — BudGanja corre con el mantra |

## Estado

**Aprobada** — elogio de ingenio **ligado al proyecto**; polo de la escala BR entre [legal](${legal}) y [maravilhoso](${maravilhoso}) / [fantástico](${fantastico}); contraste [ídolo](${idolo}); culto vacío = salvedad.

[▶ Palabras](${hub}) · [▶ Legal](${legal}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Fantástico](${fantastico}) · [▶ Ídolo](${idolo}) · [▶ Creatividad](${criatividade}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildGenialPost() {
  const { body, contentEn, contentEs } = buildGenialBodies();
  return palavraPost({
    title: 'Inspeção: Genial — engenho do projecto BudGanja e o risco do culto vazio',
    titleEn: 'Inspection: Genial — BudGanja project ingenuity and the risk of empty cult',
    titleEs: 'Inspección: Genial — ingenio del proyecto BudGanja y el riesgo del culto vacío',
    excerpt:
      'Palavras: «genial» — engenho no projecto BudGanja; escala com legal, maravilhoso e fantástico; Faça o melhor! ≠ seja génio; culto vazio = ressalva.',
    excerptEn:
      'Words: “genial” — project ingenuity; scale with legal, maravilhoso and fantástico; Do your best! ≠ be a genius; empty cult = caveat.',
    excerptEs:
      'Palabras: «genial» — ingenio del proyecto; escala con legal, maravilloso y fantástico; ¡Haz lo mejor! ≠ sé un genio; culto vacío = salvedad.',
    slug: 'inspecao-palavra-genial',
    date: '2026-08-03T14:20:00.000Z',
    seriesOrder: 30,
    seriesLabel: 'Genial · palavra',
    coverImage: '/imagens/inspecoes/genial-palavra-cover.jpg',
    sourceUrl: 'https://pt.wiktionary.org/wiki/genial',
    body,
    contentEn,
    contentEs
  });
}


const {
  DIVERTIDAMENTE_PALAVRAS_POSTS
} = require('./divertidamente-inspecoes-posts.js');
const {
  buildEntorpecenteNarcoticoPost
} = require('./entorpecente-narcotico-inspecao-post.js');
const {
  CLASSIFICACAO_LEGAL_PALAVRAS_POSTS
} = require('./classificacao-legal-palavras-posts.js');
const {
  buildGuiaHcSeletividadePost
} = require('./guia-hc-seletividade-inspecao-post.js');
const {
  buildGuiaCannabisMedicosPost
} = require('./guia-cannabis-medicos-inspecao-post.js');
const {
  buildGuiaCannabisFarmaceuticosPost
} = require('./guia-cannabis-farmaceuticos-inspecao-post.js');
const {
  buildGuiaAssociacoesPacientesPost
} = require('./guia-associacoes-pacientes-inspecao-post.js');
const {
  buildGuiaDefensoriaAcessoPost
} = require('./guia-defensoria-acesso-inspecao-post.js');
const {
  CLASSIFICACAO_ACESSO_PALAVRAS_POSTS
} = require('./classificacao-acesso-palavras-posts.js');
const {
  TAMARA_INVERNO_PALAVRAS_POSTS
} = require('./tamara-inverno-palavras-posts.js');

const PALAVRAS_INSPECOES_POSTS = [
  buildMaconhaPost(),
  buildPassarPost(),
  buildCaminhoPost(),
  buildCoelhoPost(),
  buildAnimalPost(),
  buildSimbiosePost(),
  buildCriatividadePost(),
  buildVerdadePost(),
  buildGestoPost(),
  buildBaldePost(),
  buildBackspacePost(),
  buildMaoEsquerdaDireitaPost(),
  buildArvoreDaVidaPost(),
  buildAffPost(),
  buildLavarPost(),
  buildJaPost(),
  buildGenialPost(),
  buildGanjaPost(),
  buildDiambaPost(),
  buildCannabisPalavraPost(),
  buildMarijuanaPost(),
  buildErvaPost(),
  buildDrogaPost(),
  buildCanhamoPost(),
  buildEntorpecenteNarcoticoPost()
]
  .concat(CLASSIFICACAO_LEGAL_PALAVRAS_POSTS)
  .concat([
    buildGuiaHcSeletividadePost(),
    buildGuiaCannabisMedicosPost(),
    buildGuiaCannabisFarmaceuticosPost(),
    buildGuiaAssociacoesPacientesPost(),
    buildGuiaDefensoriaAcessoPost()
  ])
  .concat(CLASSIFICACAO_ACESSO_PALAVRAS_POSTS)
  .concat(DIVERTIDAMENTE_PALAVRAS_POSTS)
  .concat(TAMARA_INVERNO_PALAVRAS_POSTS);

module.exports = {
  PALAVRAS_INSPECOES_POSTS,
  palavraPost,
  buildMaconhaPost,
  buildMaconhaBodies,
  buildPassarPost,
  buildPassarBodies,
  buildCaminhoPost,
  buildCaminhoBodies,
  buildCoelhoPost,
  buildCoelhoBodies,
  buildAnimalPost,
  buildAnimalBodies,
  buildSimbiosePost,
  buildSimbioseBodies,
  buildCriatividadePost,
  buildCriatividadeBodies,
  buildVerdadePost,
  buildVerdadeBodies,
  buildGestoPost,
  buildGestoBodies,
  buildBaldePost,
  buildBaldeBodies,
  buildBackspacePost,
  buildBackspaceBodies,
  buildMaoEsquerdaDireitaPost,
  buildMaoEsquerdaDireitaBodies,
  buildArvoreDaVidaPost,
  buildArvoreDaVidaBodies,
  buildAffPost,
  buildAffBodies,
  buildLavarPost,
  buildLavarBodies,
  buildJaPost,
  buildJaBodies,
  buildGenialPost,
  buildGenialBodies,
  poemArvoreDaVidaPt,
  poemArvoreDaVidaEn,
  poemArvoreDaVidaEs,
  buildDuploSentidoPalavraPost,
  buildGanjaPost,
  buildDiambaPost,
  buildCannabisPalavraPost,
  buildMarijuanaPost,
  buildErvaPost,
  buildDrogaPost,
  buildCanhamoPost,
  buildEntorpecenteNarcoticoPost,
  CLASSIFICACAO_LEGAL_PALAVRAS_POSTS,
  CLASSIFICACAO_ACESSO_PALAVRAS_POSTS,
  buildGuiaHcSeletividadePost,
  buildGuiaCannabisMedicosPost,
  buildGuiaCannabisFarmaceuticosPost,
  buildGuiaAssociacoesPacientesPost,
  buildGuiaDefensoriaAcessoPost
};
