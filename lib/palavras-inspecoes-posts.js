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

const PALAVRAS_INSPECOES_POSTS = [buildMaconhaPost()];

module.exports = {
  PALAVRAS_INSPECOES_POSTS,
  buildMaconhaPost,
  buildMaconhaBodies
};
