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

function buildMaconhaBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const planta = '/plantas/cannabis-sativa/';
  const unifesp = '/biblioteca/unifesp/';
  const artigo =
    '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
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
  return buildDuploSentidoPalavraPost({
    word: 'erva',
    slugSuffix: 'erva',
    seriesOrder: 8,
    seriesLabel: 'Erva · palavra',
    title: 'Inspeção: Erva — do sentido botânico amplo ao eufemismo',
    titleEn: 'Inspection: Erva — from broad botanical sense to euphemism',
    titleEs: 'Inspección: Erva — del sentido botánico amplio al eufemismo',
    excerpt:
      'Palavras: «erva» — originalidade (planta herbácea, chá, tempero) coberta pelo eufemismo de cannabis; prejuízo à literacia do catálogo medicinal.',
    excerptEn:
      'Words: “erva” — originality (herb, tea, seasoning) overlaid by cannabis euphemism; harms medicinal-catalog literacy.',
    excerptEs:
      'Palabras: «erva» — originalidad (hierba, té, condimento) tapada por eufemismo de cannabis.',
    etymon: 'Português comum ← latim *herba* — confiança alta',
    original:
      'Qualquer planta herbácea — culinária, chá, medicina popular, mato. O catálogo BudGanja de [plantas](/plantas/) vive deste sentido amplo.',
    prejudicado:
      'Eufemismo: «a erva» passa a codificar cannabis e estreita o campo semântico.',
    mudanca:
      'A literacia botânica sofre: ouvir «erva» e pensar só cannabis apaga camomila, hortelã, guaco, etc. O laboratório mantém o sentido amplo no catálogo e marca o eufemismo nesta ficha.'
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

const {
  DIVERTIDAMENTE_PALAVRAS_POSTS
} = require('./divertidamente-inspecoes-posts.js');

const PALAVRAS_INSPECOES_POSTS = [
  buildMaconhaPost(),
  buildPassarPost(),
  buildCaminhoPost(),
  buildCoelhoPost(),
  buildAnimalPost(),
  buildGanjaPost(),
  buildDiambaPost(),
  buildCannabisPalavraPost(),
  buildMarijuanaPost(),
  buildErvaPost(),
  buildDrogaPost(),
  buildCanhamoPost()
].concat(DIVERTIDAMENTE_PALAVRAS_POSTS);

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
  buildDuploSentidoPalavraPost,
  buildGanjaPost,
  buildDiambaPost,
  buildCannabisPalavraPost,
  buildMarijuanaPost,
  buildErvaPost,
  buildDrogaPost,
  buildCanhamoPost
};
