'use strict';

/**
 * Par Artes × Pessoas: Barriga de Trigo (Wheat Belly) + William Davis.
 * Livro primeiro; autor em Pessoas. Elo forte com Produtos nocivos · glúten.
 * Helpers locais evitam dependência circular com artes/pessoas-historia.
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
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function figuraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'pessoas-historia',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Pessoas',
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

function buildBarrigaDeTrigoBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const pessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const nocivos = '/biblioteca/inspecoes/#inspecoes-derivados';
  const site = 'https://drdavisinfinitehealth.com/';
  const faq = 'https://drdavisinfinitehealth.com/2011/07/wheat-belly-frequently-asked-questions/';
  const wiki = 'https://en.wikipedia.org/wiki/Wheat_Belly';

  const body = `## Escopo

Inspeção editorial de **«Barriga de Trigo»** (*Wheat Belly: Lose the Wheat, Lose the Weight, and Find Your Path Back to Health*, **2011**) — livro de divulgação do cardiologista [William Davis](${davis}). O **início de tudo** é a obra: tese de que o **trigo moderno** (não só a doença celíaca) impulsiona gordura visceral, glicemia e uma cascata de sintomas. A biografia e o ofício do autor ficam em [William Davis](${davis}) (série Pessoas). O eixo proteico/industrial do laboratório continua na ficha [Glúten / farinha](${gluten}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes públicas: site do autor ([drdavisinfinitehealth.com](${site})), FAQ do livro ([Wheat Belly FAQ](${faq})), registo Wikipedia ([Wheat Belly](${wiki})). **Não é aconselhamento médico.** **Indexar ≠ endossar** cada claim do livro (há crítica científica pública a partes do argumento). Distinto de [Legado](/biblioteca/inspecoes/#inspecoes-pessoas) UNIFESP e de [Divulgação Lair](${lair}) — aqui o objecto é **livro + tese cultural de anti-trigo**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra (PT) | **Barriga de Trigo** |
| Obra (EN) | *Wheat Belly* (Rodale, **2011**) |
| Autor | [William Davis](${davis}) — cardiologista (Milwaukee) |
| Género | Divulgação de saúde / dieta — best-seller |
| Tipo BudGanja | Arte — **livro primeiro**; autor em Pessoas |
| Elo Pessoas | [William Davis](${davis}) |
| Elo Produtos nocivos | [Glúten / farinha](${gluten}) · [Caseína](${caseina}) · [Cana / açúcar](${cana}) |
| Tese-âncora | Trigo moderno → «barriga» (gordura visceral) + efeitos metabólicos e inflamatórios |
| Fonte de partida | [Wheat Belly FAQ](${faq}) · [Wikipedia · Wheat Belly](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **livro de 2011** — popularizou a desconfiança pública face ao trigo «integral saudável».  
**H2:** a tese do livro **não** se reduz a «glúten = celíaca»; mistura glúten/exorfinas, **amilopectina A** (glicemia) e crítica aos ultraprocessados «sem glúten».  
**H3:** a ficha [Glúten](${gluten}) cobre o eixo proteico/clínico com método; esta ficha cobre a **obra cultural** e o discurso.

Passos:

1. Fixar génese editorial (título, ano, autor).  
2. Extrair tese a partir do **livro** (não do CV).  
3. Separar claims fortes vs limites de evidência.  
4. Ligar Pessoas + Produtos nocivos.  
5. Status.

## O início de tudo — génese do livro

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| **Autor clínico** | Cardiologista preventivo; narrativa pública de perda de peso e controlo glicémico ao cortar trigo. |
| **2011** | *Wheat Belly* torna-se best-seller (*New York Times*) — marco da onda «wheat-free» popular. |
| **Título PT** | *Barriga de Trigo* — «wheat belly» = gordura abdominal atribuída ao trigo. |
| **Público** | Leitores gerais; não é paper de *peer review* nem guideline de sociedade médica. |

> **Hierarquia BudGanja:** sem o livro de 2011 não há objecto «Barriga de Trigo» inspeccionável. Davis tem ficha própria em Pessoas; o glúten como proteína tem ficha em Produtos nocivos.

## Tese do livro (síntese editorial)

| Eixo no livro | Tradução BudGanja |
|---------------|-------------------|
| Trigo moderno ≠ «grão ancestral inocente» | Separar cereal tradicional de matriz industrial / dose moderna |
| **Glúten** e péptidos | Elo directo com [Glúten / farinha](${gluten}) — celíaca é eixo clínico; o livro alarga o discurso |
| **Amilopectina A** | Carboidrato do trigo descrito como muito digestível → picos de glicemia (claim central do autor) |
| «Trigo vicia» / exorfinas | Argumento popular de apetite; evidência humana forte **não** é consenso |
| «Sem glúten» industrial | O livro **critica** substitutos à base de amidos (arroz, batata, tapioca) — alinhável com alerta BudGanja a ultraprocessados |
| Gordura visceral («barriga») | Metáfora central do título — metabolismo + imagem corporal |

O laboratório **não** adopta a frase máxima do discurso popular («trigo matou mais que todas as guerras»): documenta a tese, cruza com [glúten](${gluten}) e exige método.

## Limites e críticas (honestidade editorial)

- Sociedades e críticas públicas (ex.: reportagens e associações celíacas/cardíacas) recusam dieta sem glúten para quem **não** tem doença celíaca comprovada.  
- Vários claims (adicção ao trigo, lista alargada de doenças) assentam em evidência fraca, extrapolação ou estudos antigos/animais.  
- Cortar ultraprocessados de farinha pode melhorar glicemia/peso por **muitos** mecanismos (calorias, fibra, açúcar) — não prova que «todo o trigo» seja toxina universal.  
- BudGanja mantém: **celíaca = eixo clínico**; **farinha ultraprocessada = eixo de dose/matriz**; livro = **discurso cultural** a auditar.

## Elo com Pessoas e Produtos nocivos

| Recurso | Papel |
|---------|-------|
| [William Davis](${davis}) | Autor — ofício e método de divulgação (Pessoas) |
| [Glúten / farinha](${gluten}) | Proteína + farinha — Produtos nocivos |
| [Caseína](${caseina}) · [Cana](${cana}) | Rede alimentar densificada (leite, açúcar, farinha) |
| [Lair Ribeiro](${lair}) | Divulgação BR com eixo trigo/glúten/leite — complementar, não equivalente |
| Hub [Artes](${hub}) · [Pessoas](${pessoas}) · [Produtos nocivos](${nocivos}) | Separar livro, pessoa e produto |

## Complementaridade com o Inspetor BudGanja

- Ler **este livro** se o interesse for a tese cultural «trigo → barriga».  
- Abrir [Glúten](${gluten}) se o interesse for proteína, celíaca e rótulos.  
- Abrir [William Davis](${davis}) se o interesse for o cardiologista-autor.

## Status

**Aprovado na série Artes** — *Barriga de Trigo* / *Wheat Belly* (2011) documentado como livro primeiro; autor em [William Davis](${davis}); elo proteico em [Glúten](${gluten}).

[▶ Artes](${hub}) · [▶ William Davis](${davis}) · [▶ Glúten](${gluten})
`;

  const contentEn = `## Scope

Editorial inspection of **Wheat Belly** (*Barriga de Trigo*, **2011**) by cardiologist [William Davis](${davis}). The **beginning of everything** is the book. Author sheet: [William Davis](${davis}). Protein/industrial axis: [Gluten / flour](${gluten}).

> **Method note:** independent BudGanja audit. **Not medical advice.** Indexing ≠ endorsing every claim. Public criticism exists for parts of the argument.

## Inspected object

| Field | Value |
|-------|-------|
| Work | **Wheat Belly** / *Barriga de Trigo* (2011) |
| Author | [William Davis](${davis}) |
| BudGanja type | Art — **book first** |
| Harmful-products link | [Gluten](${gluten}) |
| Date | ${inspected} |

## Book thesis (lab gloss)

| Axis | Gloss |
|------|-------|
| Modern wheat vs “healthy whole grain” | Separate traditional cereal from industrial dose |
| Gluten | Link to [Gluten](${gluten}) |
| Amylopectin A | Author’s glycemic claim |
| Gluten-free junk | Book criticizes starch substitutes — aligns with ultra-processed caution |
| Visceral fat (“wheat belly”) | Title metaphor |

## Limits

Celiac disease remains the clear clinical axis for gluten exclusion. Broader disease lists and “wheat addiction” claims are not consensus. Cutting ultra-processed flour can help for many reasons beyond a single “wheat toxin.”

## Status

**Approved in Arts** — book first; author in [William Davis](${davis}); protein sheet [Gluten](${gluten}).
`;

  const contentEs = `## Alcance

Inspección editorial de **Barriga de Trigo** (*Wheat Belly*, **2011**) del cardiólogo [William Davis](${davis}). El **inicio de todo** es el libro. Ficha del autor: [William Davis](${davis}). Eje proteico: [Gluten / harina](${gluten}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** Indexar ≠ respaldar cada claim. Hay crítica científica pública a partes del argumento.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Obra | **Barriga de Trigo** / *Wheat Belly* (2011) |
| Autor | [William Davis](${davis}) |
| Tipo BudGanja | Arte — **libro primero** |
| Productos nocivos | [Gluten](${gluten}) |
| Fecha | ${inspected} |

## Tesis del libro (glosa)

Trigo moderno → grasa visceral y efectos metabólicos; gluten + amilopectina A; crítica a ultraprocesados «sin gluten». El laboratorio separa discurso cultural, eje clínico (celiaquía) y matriz industrial.

## Estado

**Aprobada en Artes** — libro primero; autor en [William Davis](${davis}); proteína en [Gluten](${gluten}).
`;

  return { body, contentEn, contentEs, wiki };
}

function buildBarrigaDeTrigoPost() {
  const { body, contentEn, contentEs, wiki } = buildBarrigaDeTrigoBodies();
  return artePost({
    title:
      'Inspeção: Barriga de Trigo — o livro de William Davis e a tese do trigo moderno',
    titleEn:
      'Inspection: Wheat Belly — William Davis’s book and the modern-wheat thesis',
    titleEs:
      'Inspección: Barriga de Trigo — el libro de William Davis y la tesis del trigo moderno',
    excerpt:
      'Artes: Barriga de Trigo (*Wheat Belly*, 2011) — best-seller de William Davis sobre trigo, glúten, amilopectina A e gordura visceral. Autor em Pessoas; elo em Glúten / farinha.',
    excerptEn:
      'Arts: Wheat Belly (2011) — William Davis bestseller on wheat, gluten, amylopectin A and visceral fat. Author in People; link to Gluten / flour.',
    excerptEs:
      'Artes: Barriga de Trigo (*Wheat Belly*, 2011) — best-seller de William Davis sobre trigo, gluten, amilopectina A y grasa visceral. Autor en Personas; vínculo en Gluten / harina.',
    slug: 'inspecao-arte-barriga-de-trigo',
    date: '2026-08-02T05:10:00.000Z',
    seriesOrder: 9,
    seriesLabel: 'Barriga de Trigo · Artes',
    coverImage: 'imagens/inspecoes/barriga-de-trigo-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

function buildWilliamDavisBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const livro = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const site = 'https://drdavisinfinitehealth.com/';
  const wikiBook = 'https://en.wikipedia.org/wiki/Wheat_Belly';

  const body = `## Escopo

Inspeção editorial e documental de **William Davis** — cardiologista preventivo (prática pública associada a Milwaukee, EUA) e autor de [*Barriga de Trigo* / *Wheat Belly*](${livro}) (2011). O recorte BudGanja **não** é inventário de toda a obra posterior (*Undoctored*, programas Infinite Health, etc.): é a **pessoa e o método** de divulgação clínica-popular sobre trigo, com elo principal no livro (série Artes).

> **Nota metodológica:** auditoria independente. Fontes: [site do autor](${site}), [Wikipedia · Wheat Belly](${wikiBook}). Sem afiliação. Distinto do [Legado](${legado}) UNIFESP/CEBRID e da [Divulgação Lair](${lair}). A ficha do livro inspecciona a **tese**; aqui inspecciona-se o **ofício** do autor-médico. **Não é aconselhamento médico.**

Esta ficha é o elo **Pessoas × Artes (livro de saúde)** — par de [Barriga de Trigo](${livro}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **William Davis** (Dr. William Davis) |
| Ofício público | Cardiologista preventivo · autor de divulgação |
| Obra-âncora BudGanja | [Barriga de Trigo](${livro}) (*Wheat Belly*, 2011) |
| Tipo BudGanja | Pessoa — método de divulgação clínica × Artes |
| Elo principal | [Barriga de Trigo](${livro}) |
| Elo Produtos nocivos | [Glúten / farinha](${gluten}) |
| Fonte de partida | [drdavisinfinitehealth.com](${site}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Davis é um **método de divulgação**: partir da clínica cardiológica/metabólica e traduzir para o leitor geral a desconfiança face ao trigo «saudável».  
**H2:** [Barriga de Trigo](${livro}) é o **elo de obra**; a tese detalhada fica na ficha Artes.  
**H3:** Pessoas acolhe o ofício — sem fundir com Legado académico nem com canal Lair.

Passos (variante «autor × livro de saúde»):

1. Identificar a pessoa e o papel público.  
2. Extrair o **método** (como comunica risco alimentar).  
3. Uma obra Artes como elo principal ([Barriga de Trigo](${livro})).  
4. Contraste com críticas e com [Glúten](${gluten}).  
5. Status.

## Quem é (síntese verificável)

- Cardiologista preventivo nos EUA; narrativa pública de prática clínica e de experiência pessoal com peso/glicemia ao eliminar trigo.  
- Autor de *Wheat Belly* (2011) — best-seller que catalisou a onda wheat-free popular.  
- Mantém site e programas de divulgação (*Infinite Health* / materiais associados ao livro).  
- **Não** é investigador principal de ensaios clínicos sobre glúten no sentido académico clássico: o impacto público vem do **livro e da comunicação**.

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Clínica → público | Traduzir metabolismo (glicemia, gordura visceral) em narrativa acessível |
| Trigo como alvo | Focar um alimento-cultura omnipresente — não só «açúcar» |
| Separar glúten de «sem glúten» junk | Criticar substitutos ultraprocessados — útil ao laboratório |
| Separar pessoa / obra | Davis ≠ *Barriga de Trigo* — ofício em Pessoas, livro em Artes |
| Limite de evidência | Declarar onde o discurso ultrapassa o consenso clínico |

## Elo com Artes e Produtos nocivos

| Recurso | Papel |
|---------|-------|
| [Barriga de Trigo](${livro}) | Livro 2011 — tese cultural |
| Hub [Artes](${artes}) | Obras; não confundir com biografia |
| [Glúten / farinha](${gluten}) | Proteína e farinha — método BudGanja de produto nocivo |
| [Lair Ribeiro](${lair}) | Outro eixo de divulgação (BR) sobre trigo/leite — complementar |

> Abrir primeiro [Barriga de Trigo](${livro}) se o interesse for a **tese do livro**; esta ficha se o interesse for o **cardiologista-autor**.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — distinto de [Legado](${legado}).  
- Cruzar o discurso Davis com a ficha [Glúten](${gluten}) (celíaca vs ultraprocessado).  
- Não inventariar toda a bibliografia posterior: uma obra-âncora basta.

## Como repetir o método

1. Pessoa + fontes públicas (site / Wikipedia da obra).  
2. Método de divulgação, não só CV.  
3. Um elo Artes (livro) com ficha própria.  
4. Slug \`inspecao-figura-…\`.

## Status

**Aprovado na série Pessoas** — William Davis documentado com elo principal em [Barriga de Trigo](${livro}) (Artes) e cruzamento [Glúten](${gluten}).

[▶ Pessoas](${hub}) · [▶ Barriga de Trigo](${livro}) · [▶ Glúten](${gluten}) · [Site do autor](${site})
`;

  const contentEn = `## Scope

Editorial inspection of **William Davis** — preventive cardiologist and author of [Wheat Belly](${livro}) (2011). Focus is the **person and method** of clinical-popular outreach on wheat — **not** a full later bibliography. Book sheet: [Wheat Belly / Barriga de Trigo](${livro}).

> **Method note:** independent audit from [author site](${site}) / [Wikipedia · Wheat Belly](${wikiBook}). Distinct from UNIFESP Legacy and Lair outreach. **Not medical advice.**

## Inspected object

| Field | Value |
|-------|-------|
| Name | **William Davis** |
| Anchor work | [Wheat Belly](${livro}) (2011) |
| BudGanja type | Person — clinical outreach method × Arts |
| Harmful-products link | [Gluten](${gluten}) |
| Date | ${inspected} |

## Method for BudGanja

| Trait | Gloss |
|-------|-------|
| Clinic → public | Translate metabolic risk into accessible narrative |
| Wheat as target | One omnipresent food-culture |
| Criticize GF junk | Aligns with ultra-processed caution |
| Person ≠ work | Davis in People; book in Arts |

## Status

**Approved in People** — primary Arts link [Wheat Belly](${livro}).
`;

  const contentEs = `## Alcance

Inspección editorial de **William Davis** — cardiólogo preventivo y autor de [Barriga de Trigo](${livro}) (2011). El recorte es la **persona y el método** de divulgación clínica-popular sobre el trigo. Ficha del libro: [Barriga de Trigo](${livro}).

> **Nota metodológica:** auditoría independiente ([sitio del autor](${site})). Distinto del Legado UNIFESP y de Lair. **No es consejo médico.**

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **William Davis** |
| Obra ancla | [Barriga de Trigo](${livro}) (2011) |
| Tipo BudGanja | Persona — método de divulgación clínica × Artes |
| Productos nocivos | [Gluten](${gluten}) |
| Fecha | ${inspected} |

## Estado

**Aprobado en Personas** — vínculo principal [Barriga de Trigo](${livro}).
`;

  return { body, contentEn, contentEs, wiki: site };
}

function buildWilliamDavisPost() {
  const { body, contentEn, contentEs, wiki } = buildWilliamDavisBodies();
  return figuraPost({
    title:
      'Inspeção: William Davis — cardiologista de Barriga de Trigo e o método anti-trigo',
    titleEn:
      'Inspection: William Davis — Wheat Belly cardiologist and the anti-wheat method',
    titleEs:
      'Inspección: William Davis — cardiólogo de Barriga de Trigo y el método anti-trigo',
    excerpt:
      'Pessoas × Artes: William Davis — cardiologista preventivo e autor de Barriga de Trigo (*Wheat Belly*, 2011); método de divulgação sobre trigo/glúten. Livro em Artes; elo em Glúten / farinha.',
    excerptEn:
      'People × Arts: William Davis — preventive cardiologist and Wheat Belly (2011) author; outreach method on wheat/gluten. Book in Arts; link to Gluten / flour.',
    excerptEs:
      'Personas × Artes: William Davis — cardiólogo preventivo y autor de Barriga de Trigo (2011); método de divulgación sobre trigo/gluten. Libro en Artes; vínculo en Gluten / harina.',
    slug: 'inspecao-figura-william-davis',
    date: '2026-08-02T05:15:00.000Z',
    seriesOrder: 9,
    seriesLabel: 'William Davis · pessoa',
    coverImage: 'imagens/inspecoes/william-davis-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBarrigaDeTrigoPost,
  buildBarrigaDeTrigoBodies,
  buildWilliamDavisPost,
  buildWilliamDavisBodies
};
