'use strict';

/**
 * Artigos científicos da rede Produtos nocivos (trigo/Davis, UPF, caseína, açúcar).
 * Série: artigos-cientificos — tipagem hub → 'artigo'.
 */

function artigoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artigos-cientificos',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artigos científicos',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.doi) post.doi = opts.doi;
  return post;
}

const hubArtigos = '/biblioteca/inspecoes/#inspecoes-artigos';
const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
const gluten = '/posts/post-inspecao-derivado-gluten.html';
const caseina = '/posts/post-inspecao-derivado-caseina.html';
const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
const davis = '/posts/post-inspecao-figura-william-davis.html';
const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';

function buildBrounsWheatFatSickPost() {
  return artigoPost({
    title: 'Inspeção: Artigo — O trigo engorda e adoece? (Brouns et al., 2013)',
    titleEn: 'Inspection: Article — Does wheat make us fat and sick? (Brouns et al., 2013)',
    titleEs: 'Inspección: Artículo — ¿El trigo engorda y enferma? (Brouns et al., 2013)',
    excerpt:
      'Auditoria do artigo de Brouns, van Buul & Shewry (Journal of Cereal Science, 2013) que examina as teses populares anti-trigo (incl. Barriga de Trigo / Davis) e conclui que o trigo integral não explica a obesidade na população geral.',
    excerptEn:
      'Audit of Brouns, van Buul & Shewry (Journal of Cereal Science, 2013): examines popular anti-wheat theses (incl. Wheat Belly / Davis) and concludes whole wheat does not explain population obesity.',
    excerptEs:
      'Auditoría de Brouns, van Buul & Shewry (Journal of Cereal Science, 2013): examina las tesis populares anti-trigo (incl. Barriga de Trigo / Davis) y concluye que el trigo integral no explica la obesidad poblacional.',
    slug: 'inspecao-artigo-brouns-trigo-obesidade-2013',
    date: '2026-08-02T06:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'J. Cereal Sci. · 2013',
    coverImage: '/imagens/inspecoes/artigo-brouns-trigo-cover.jpg',
    sourceUrl: 'https://doi.org/10.1016/j.jcs.2013.06.002',
    doi: '10.1016/j.jcs.2013.06.002',
    body: `## Escopo

Inspeção editorial do artigo **Does wheat make us fat and sick?** (Brouns, van Buul & Shewry, *Journal of Cereal Science*, 2013). É a peça científica de primeira linha que a BudGanja cruza com [*Barriga de Trigo*](${barriga}) e [William Davis](${davis}): literacia de discurso vs. evidência.

> **Nota metodológica:** auditoria do texto completo (versão de autores / repositório Rothamsted, CC-BY). **Não** é aconselhamento médico. Indexar ≠ endossar o livro popular nem negar doença celíaca.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Does wheat make us fat and sick? |
| Autores | Fred J.P.H. Brouns · Vincent J. van Buul · Peter R. Shewry |
| Revista | *Journal of Cereal Science*, 2013;58(2):209–215 |
| DOI | [10.1016/j.jcs.2013.06.002](https://doi.org/10.1016/j.jcs.2013.06.002) |
| Tipo | Revisão / ensaio crítico com base em evidência |
| Acesso | Open access (versão de autores) |
| Data da inspeção | 2026-08-02 |

## Pergunta de investigação

As alegações de que o **trigo moderno** causa obesidade, «vício» opiáceo (gliadina) e doença na população geral — popularizadas por livros como *Wheat Belly* — são **sustentáveis** pela literatura científica?

## Hipóteses e método da inspeção

- **H1:** o artigo distingue **trigo integral** de **matriz ultraprocessada** (snacks, bolachas, chocolate de prateleira).
- **H2:** gliadina / opioides e «GM wheat» no discurso popular não resistem à crítica botânica e nutricional.
- **H3:** doença celíaca, alergia e sensibilidade exigem exclusão — sem generalizar a toda a população.
- **Método BudGanja:** extrair tese → contra-argumentos → veredicto → ligar a [glúten](${gluten}), [chocolate](${chocolate}) e [Davis](${davis}).

## Achados principais (síntese)

1. **Atribuir obesidade a um único alimento** (trigo) em vez de exceso calórico + sedentarismo **não é correcto**.
2. Alegações de «adicção» / sobreingestão via gliadina **não se substantivam** com a evidência revista.
3. Trigo «GM» comercial **não** estava no mercado; melhoramento clássico ≠ engenharia genética de prateleira.
4. **Trigo integral** em quantidades recomendadas associa-se a **menor** risco de diabetes tipo 2, doença cardíaca e melhor gestão ponderal a longo prazo.
5. Quem tem predisposição **celíaca**, alergia ou sensibilidade **beneficia** de evitar trigo e cereais com proteínas relacionadas com glúten (incl. espécies «antigas»).

## Avaliação metodológica

| Critério | Nota |
|----------|------|
| Relevância para discurso Davis / Barriga | ★★★★★ |
| Rigor (revisão narrativa, não meta-análise formal) | ★★★★☆ |
| Utilidade educativa BudGanja | ★★★★★ |
| Inferência clínica individual | ★★★☆☆ |

**Veredicto:** referência **anti-simplificação** — o vilão da prateleira é muitas vezes a **matriz** (açúcar + farinha refinada + gordura), não o grão integral em si.

## Complementaridade BudGanja

| Tema | Recurso |
|------|---------|
| Discurso popular | [*Barriga de Trigo*](${barriga}) · [William Davis](${davis}) |
| Eixo clínico / industrial | [Glúten / farinha](${gluten}) |
| Matriz snack | [Chocolate industrial](${chocolate}) · [Análise × vídeos](${analise}) |
| Outros artigos | [Wieser — duas faces do trigo](/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html) |

## Status

**Aprovado como contraponto científico** ao maximalismo anti-trigo. Usar junto com a ficha de [glúten](${gluten}) (método celíaca vs. ultraprocessado).

[▶ DOI](https://doi.org/10.1016/j.jcs.2013.06.002) · [PDF Rothamsted](https://repository.rothamsted.ac.uk/id/eprint/18903/1/1-s2.0-S0733521013000969-main.pdf) · [Artigos](${hubArtigos})`
  });
}

function buildWieserTwoFacesWheatPost() {
  return artigoPost({
    title: 'Inspeção: Artigo — As duas faces do trigo (Wieser, Koehler & Scherf, 2020)',
    titleEn: 'Inspection: Article — The Two Faces of Wheat (Wieser, Koehler & Scherf, 2020)',
    titleEs: 'Inspección: Artículo — Las dos caras del trigo (Wieser, Koehler & Scherf, 2020)',
    excerpt:
      'Auditoria da revisão Frontiers in Nutrition (2020): trigo como alimento básico nutritivo vs. doenças relacionadas com o trigo (WRDs) e a confusão gerada por livros como Barriga de Trigo.',
    excerptEn:
      'Audit of the Frontiers in Nutrition 2020 review: wheat as nutritious staple vs wheat-related disorders (WRDs) and confusion from books like Wheat Belly.',
    excerptEs:
      'Auditoría de la revisión Frontiers in Nutrition 2020: trigo como alimento básico nutritivo vs trastornos relacionados (WRDs) y la confusión de libros como Barriga de Trigo.',
    slug: 'inspecao-artigo-wieser-duas-faces-trigo-2020',
    date: '2026-08-02T06:10:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Front. Nutr. · 2020',
    coverImage: '/imagens/inspecoes/artigo-wieser-trigo-cover.jpg',
    sourceUrl: 'https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2020.517313/full',
    doi: '10.3389/fnut.2020.517313',
    body: `## Escopo

Inspeção de **The Two Faces of Wheat** (Wieser, Koehler & Scherf, *Frontiers in Nutrition*, 2020) — revisão open access que equilibra o papel nutricional do trigo com as **WRDs** (doenças relacionadas com o trigo) e responde ao ruído mediático pós-*Wheat Belly* / *Grain Brain*.

> **Nota metodológica:** texto completo PMC (CC-BY). **Não** é aconselhamento médico.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | The Two Faces of Wheat |
| Autores | Herbert Wieser · Peter Koehler · Katharina A. Scherf |
| Revista | *Frontiers in Nutrition*, 2020;7:517313 |
| DOI | [10.3389/fnut.2020.517313](https://doi.org/10.3389/fnut.2020.517313) |
| PubMed | [PMID 33195360](https://pubmed.ncbi.nlm.nih.gov/33195360/) |
| PMC | [PMC7609444](https://pmc.ncbi.nlm.nih.gov/articles/PMC7609444/) |
| Tipo | Revisão |
| Acesso | Open access (CC-BY) |
| Data da inspeção | 2026-08-02 |

## Pergunta de investigação

Como reconciliar o trigo como **fonte millenar de energia, fibra e micronutrientes** com o aumento de diagnósticos e auto-diagnósticos de problemas relacionados com glúten/trigo — e com o discurso popular que pede exclusão total?

## Achados principais (síntese)

1. Livros como [*Barriga de Trigo*](${barriga}) e media geraram a impressão de que o trigo é nocivo para **toda** a população — afirmações que a comunidade científica tem **refutado** em revisões.
2. Exclusão só é necessária após **diagnóstico médico** de WRD verdadeira (celíaca, alergia, sensibilidade não celíaca bem definida).
3. Consumo regular de **integrais** associa-se a riscos **reduzidos** de diabetes tipo 2, cancro colorrectal e melhor gestão de peso (síntese citada pelos autores).
4. O mercado «sem glúten» cresceu muito além da prevalência clínica — literacia de rótulo importa (elo [chocolate](${chocolate}) / snacks).

## Avaliação metodológica

| Critério | Nota |
|----------|------|
| Equilíbrio risco–benefício | ★★★★★ |
| Ligação ao discurso Davis | ★★★★★ |
| Profundidade de WRDs | ★★★★☆ |
| Utilidade BudGanja | ★★★★★ |

**Veredicto:** mapa mental «duas faces» — planta/alimento vs. doença diagnosticada vs. marketing anti-trigo.

## Complementaridade BudGanja

| Tema | Recurso |
|------|---------|
| Contraponto 2013 | [Brouns et al.](/posts/post-inspecao-artigo-brouns-trigo-obesidade-2013.html) |
| Discurso | [Davis](${davis}) · [*Barriga*](${barriga}) |
| Matriz industrial | [Glúten](${gluten}) · [Chocolate](${chocolate}) |

## Status

**Aprovado** como revisão de síntese para o hub de [artigos](${hubArtigos}) e a ficha de [glúten](${gluten}).

[▶ Frontiers](https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2020.517313/full) · [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC7609444/) · [DOI](https://doi.org/10.3389/fnut.2020.517313) · [Artigos](${hubArtigos})`
  });
}

function buildHallUpfRctPost() {
  return artigoPost({
    title: 'Inspeção: Artigo — Dietas ultraprocessadas, calorias e peso (Hall et al., 2019)',
    titleEn: 'Inspection: Article — Ultra-processed diets, calories and weight (Hall et al., 2019)',
    titleEs: 'Inspección: Artículo — Dietas ultraprocesadas, calorías y peso (Hall et al., 2019)',
    excerpt:
      'Auditoria do RCT inpatient NIH (Hall et al., Cell Metabolism 2019): dieta ultraprocessada aumentou ~508 kcal/dia e +0,9 kg em 2 semanas vs. dieta não processada emparelhada — eixo central do chocolate industrial.',
    excerptEn:
      'Audit of the NIH inpatient RCT (Hall et al., Cell Metabolism 2019): ultra-processed diet raised ~508 kcal/day and +0.9 kg in 2 weeks vs matched unprocessed diet — core axis for industrial chocolate.',
    excerptEs:
      'Auditoría del RCT inpatient NIH (Hall et al., Cell Metabolism 2019): dieta ultraprocesada aumentó ~508 kcal/día y +0,9 kg en 2 semanas vs dieta no procesada emparejada — eje central del chocolate industrial.',
    slug: 'inspecao-artigo-hall-ultraprocessados-2019',
    date: '2026-08-02T06:20:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'Cell Metabolism · 2019',
    coverImage: '/imagens/inspecoes/artigo-hall-upf-cover.jpg',
    sourceUrl: 'https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7',
    doi: '10.1016/j.cmet.2019.05.008',
    body: `## Escopo

Inspeção de **Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain** (Hall et al., *Cell Metabolism*, 2019) — o RCT inpatient mais citado sobre **NOVA / ultraprocessados**. Ancora o hub [chocolate industrial](${chocolate}): não é o cacau sozinho; é a **matriz de fábrica**.

> **Nota metodológica:** abstract + relatório clínico publicado; registo [NCT03407053](https://clinicaltrials.gov/study/NCT03407053). **Não** é aconselhamento médico. N=20 — evidência causal forte no desenho, generalização cautelosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain: An Inpatient Randomized Controlled Trial of Ad Libitum Food Intake |
| Autores | Kevin D. Hall et al. (NIH / NIDDK) |
| Revista | *Cell Metabolism*, 2019;30(1):67–77.e3 |
| DOI | [10.1016/j.cmet.2019.05.008](https://doi.org/10.1016/j.cmet.2019.05.008) |
| PubMed | [PMID 31105044](https://pubmed.ncbi.nlm.nih.gov/31105044/) |
| Tipo | RCT crossover inpatient · ad libitum |
| Registo | NCT03407053 |
| Data da inspeção | 2026-08-02 |

## Pergunta de investigação

Controlando calorias apresentadas, macronutrientes, açúcar, sódio e fibra, uma dieta **ultraprocessada** leva a maior ingestão energética e ganho de peso do que uma dieta **não processada**?

## Desenho e amostra

| Elemento | Detalhe |
|----------|---------|
| N | 20 adultos estáveis em peso |
| Idade / IMC | 31,2 ± 1,6 anos · IMC 27 ± 1,5 |
| Desenho | 2 semanas UPF ↔ 2 semanas unprocessed (ordem aleatória) |
| Instrução | Comer tanto ou tão pouco quanto desejado |
| Emparelhamento | Calorias apresentadas, densidade energética, macros, açúcar, sódio, fibra |

## Achados principais

| Desfecho | Resultado |
|----------|-----------|
| Ingestão energética | **+508 ± 106 kcal/dia** na dieta UPF (*p* = 0,0001) |
| Carboidrato / gordura | +280 e +230 kcal/dia; proteína sem diferença significativa |
| Peso | **+0,9 ± 0,3 kg** (UPF) · **−0,9 ± 0,3 kg** (unprocessed) |
| Correlação | Δ peso altamente correlacionado com ingestão (*r* = 0,8) |

## Avaliação metodológica

### Forças
1. Controlo metabolic inpatient — raridade em nutrição.
2. Emparelhamento agressivo de nutrientes — isola o **processamento**.
3. Desfecho duro (kcal, kg) com significância clara.

### Limites
| Limite | Implicação |
|--------|------------|
| N=20, 2 semanas | Precisão alta, generalização populacional limitada |
| Ambiente hospitalar | Externalidade para vida real |
| Heterogeneidade UPF | Chocolate, refrigerantes e embutidos não são o mesmo risco |

**Veredicto:** ★★★★★ para literacia de **ultraprocessado** no laboratório; base causal para a ficha de [chocolate](${chocolate}).

## Complementaridade BudGanja

| Tema | Recurso |
|------|---------|
| Matriz snack | [Chocolate](${chocolate}) · [Açúcar/cana](${cana}) · [OMS açúcares](/posts/post-inspecao-artigo-oms-acucares-livres-2015.html) |
| Farinha + marketing | [Glúten](${gluten}) · [Lair](${lair}) |
| Vídeos | [Análise × vídeos](${analise}) |

## Status

**Aprovado como referência causal** sobre ultraprocessados. Ligar sempre: indexar UPF ≠ demonizar todos os alimentos industrializados sem rótulo.

[▶ Cell](https://www.cell.com/cell-metabolism/fulltext/S1550-4131(19)30248-7) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/31105044/) · [DOI](https://doi.org/10.1016/j.cmet.2019.05.008) · [Artigos](${hubArtigos})`
  });
}

function buildBrookeTaylorCaseinPost() {
  return artigoPost({
    title: 'Inspeção: Artigo — Efeitos GI da caseína A1 vs A2 (Brooke-Taylor et al., 2017)',
    titleEn: 'Inspection: Article — GI effects of A1 vs A2 β-casein (Brooke-Taylor et al., 2017)',
    titleEs: 'Inspección: Artículo — Efectos GI de caseína A1 vs A2 (Brooke-Taylor et al., 2017)',
    excerpt:
      'Auditoria da revisão sistemática Advances in Nutrition (2017): 39 estudos sobre β-caseína A1 vs A2, trânsito intestinal, BCM-7 e desconforto digestivo — elo científico da ficha Caseína e do chocolate ao leite.',
    excerptEn:
      'Audit of the Advances in Nutrition 2017 systematic review: 39 studies on A1 vs A2 β-casein, transit, BCM-7 and digestive discomfort — scientific link for the Casein sheet and milk chocolate.',
    excerptEs:
      'Auditoría de la revisión sistemática Advances in Nutrition 2017: 39 estudios sobre β-caseína A1 vs A2, tránsito, BCM-7 y malestar digestivo — vínculo científico de la ficha Caseína y el chocolate con leche.',
    slug: 'inspecao-artigo-brooke-taylor-caseina-a1-a2-2017',
    date: '2026-08-02T06:30:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'Adv. Nutr. · 2017',
    coverImage: '/imagens/inspecoes/artigo-brooke-taylor-caseina-cover.jpg',
    sourceUrl: 'https://doi.org/10.3945/an.116.013953',
    doi: '10.3945/an.116.013953',
    body: `## Escopo

Inspeção de **Systematic Review of the Gastrointestinal Effects of A1 Compared with A2 β-Casein** (Brooke-Taylor, Dwyer, Woodford & Kost, *Advances in Nutrition*, 2017). Base científica da ficha [Caseína](${caseina}) e do elo leite no [chocolate](${chocolate}).

> **Nota metodológica:** revisão sistemática (39 estudos). Evidência humana ainda **limitada**. **Não** é aconselhamento médico. Marketing A2 ≠ prova de risco cardiovascular.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Systematic Review of the Gastrointestinal Effects of A1 Compared with A2 β-Casein |
| Autores | Simon Brooke-Taylor · Karen Dwyer · Keith Woodford · Natalya Kost |
| Revista | *Advances in Nutrition*, 2017;8(5):739–748 |
| DOI | [10.3945/an.116.013953](https://doi.org/10.3945/an.116.013953) |
| PubMed | [PMID 28916574](https://pubmed.ncbi.nlm.nih.gov/28916574/) |
| PMC | [PMC5593102](https://pmc.ncbi.nlm.nih.gov/articles/PMC5593102/) |
| Tipo | Revisão sistemática |
| N estudos | 39 (até 12/04/2017) |
| Data da inspeção | 2026-08-02 |

## Pergunta de investigação

A β-caseína **A1** produz efeitos gastrointestinais diferentes da **A2** (trânsito, inflamação, desconforto), via peptídeo opioide **BCM-7**?

## Achados principais (síntese)

1. Em **roedores**, A1 vs A2 atrasa trânsito intestinal por mecanismo **opioide**; marcadores inflamatórios e TLR mais elevados com A1.
2. Em **humanos** (poucos ensaios): A1 associado a trânsito mais lento (1 estudo) e fezes mais moles (2); desconforto correlaciona com marcadores inflamatórios para A1, não A2.
3. Queijos e fermentados foram **excluídos** — atenção ao chocolate ao leite / leite em pó (matriz diferente).
4. Autores pedem mais investigação clínica em populações e contextos dietéticos variados.

## Avaliação metodológica

| Critério | Nota |
|----------|------|
| Sistematicidade | ★★★★★ |
| Evidência humana GI | ★★★☆☆ (moderada / emergente) |
| Extrapolação extra-GI | ★★☆☆☆ (fora do foco) |
| Utilidade BudGanja | ★★★★☆ |

**Veredicto:** âncora para falar A1/A2 **com cautela** — útil na [caseína](${caseina}); não transforma todo o leite em «tóxico».

## Complementaridade BudGanja

| Tema | Recurso |
|------|---------|
| Ficha produto | [Caseína](${caseina}) · [Derivado vaca](/posts/post-inspecao-derivado-vaca.html) |
| Matriz doce | [Chocolate](${chocolate}) |
| Ultraprocessado | [Hall 2019](/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html) |

## Status

**Aprovado** como revisão sistemática de referência GI A1/A2 no hub de [artigos](${hubArtigos}).

[▶ DOI](https://doi.org/10.3945/an.116.013953) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/28916574/) · [PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5593102/) · [Artigos](${hubArtigos})`
  });
}

function buildWhoSugarsGuidelinePost() {
  return artigoPost({
    title: 'Inspeção: Diretriz OMS — Ingestão de açúcares livres (2015)',
    titleEn: 'Inspection: WHO guideline — Free sugars intake (2015)',
    titleEs: 'Inspección: Directriz OMS — Ingesta de azúcares libres (2015)',
    excerpt:
      'Auditoria da diretriz WHO 2015 sobre açúcares livres (<10% da energia; condicional <5%): âncora global para cana, chocolate industrial e divulgação Lair — não é paper único, é norma de saúde pública.',
    excerptEn:
      'Audit of the 2015 WHO free sugars guideline (<10% energy; conditional <5%): global anchor for sugarcane, industrial chocolate and Lair outreach — public-health norm, not a single paper.',
    excerptEs:
      'Auditoría de la directriz OMS 2015 sobre azúcares libres (<10% energía; condicional <5%): ancla global para caña, chocolate industrial y divulgación Lair.',
    slug: 'inspecao-artigo-oms-acucares-livres-2015',
    date: '2026-08-02T06:40:00.000Z',
    seriesOrder: 6,
    seriesLabel: 'WHO Guideline · 2015',
    coverImage: '/imagens/inspecoes/artigo-oms-acucares-cover.jpg',
    sourceUrl: 'https://www.who.int/publications/i/item/9789241549028',
    doi: '',
    body: `## Escopo

Inspeção da **Guideline: Sugars intake for adults and children** (World Health Organization, 2015) — norma de saúde pública que a BudGanja usa como elo do [açúcar/cana](${cana}), do [chocolate](${chocolate}) e da varredura [Lair](${lair}).

> **Nota metodológica:** documento normativo WHO (ISBN 978-92-4-154902-8 · handle [10665/149782](https://iris.who.int/handle/10665/149782)). **Não** substitui consulta clínica. «Açúcares livres» ≠ todos os hidratos de carbono.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Guideline: Sugars intake for adults and children |
| Emissor | World Health Organization (WHO) |
| Ano | 2015 |
| ISBN | 978-92-4-154902-8 |
| URL | [who.int/publications/…](https://www.who.int/publications/i/item/9789241549028) |
| IRIS | [handle/10665/149782](https://iris.who.int/handle/10665/149782) |
| Tipo | Diretriz de saúde pública (GRADE) |
| Data da inspeção | 2026-08-02 |

## Recomendações centrais

| Força | Recomendação |
|-------|----------------|
| Forte | Reduzir ingestão de **açúcares livres** ao longo da vida |
| Forte | Em adultos e crianças: **&lt; 10%** da energia total |
| Condicional | Redução adicional para **&lt; 5%** da energia (benefícios acrescidos, p.ex. cáries) |

**Açúcares livres** = monossacarídeos e dissacarídeos **adicionados** + açúcares naturalmente presentes em mel, xaropes, sumos de fruta e concentrados de sumo — o eixo do chocolate de fábrica e bebidas.

## Hipóteses BudGanja

- **H1:** a diretriz justifica inspeccionar **sacarose/xaropes** no rótulo do chocolate, não só o «cacau %».
- **H2:** alinha com [Hall 2019](/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html) (matriz UPF) sem precisar da tese maximalista anti-trigo.
- **H3:** [Lair](${lair}) e o laboratório podem citar OMS como norma — com a nuance GRADE (forte vs condicional).

## Avaliação

| Critério | Nota |
|----------|------|
| Autoridade global | ★★★★★ |
| Aplicabilidade ao chocolate industrial | ★★★★★ |
| Granularidade de produto | ★★★☆☆ (norma, não ficha de snack) |

**Veredicto:** pedra angular de **literacia de açúcar livre** no hub Produtos nocivos.

## Complementaridade BudGanja

| Tema | Recurso |
|------|---------|
| Derivado | [Cana / açúcares](${cana}) |
| Matriz | [Chocolate](${chocolate}) · [Hall UPF](/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html) |
| Divulgação | [Lair Ribeiro](${lair}) · [Análise × vídeos](${analise}) |

## Status

**Aprovado como norma de referência** (diretriz, não RCT). Sempre distinguir açúcar livre de fibra/amido de alimentos integrais.

[▶ WHO](https://www.who.int/publications/i/item/9789241549028) · [IRIS PDF](https://iris.who.int/handle/10665/149782) · [Artigos](${hubArtigos})`
  });
}

const ARTIGOS_PRODUTOS_NOCIVOS_POSTS = [
  buildBrounsWheatFatSickPost(),
  buildWieserTwoFacesWheatPost(),
  buildHallUpfRctPost(),
  buildBrookeTaylorCaseinPost(),
  buildWhoSugarsGuidelinePost()
];

module.exports = {
  ARTIGOS_PRODUTOS_NOCIVOS_POSTS,
  buildBrounsWheatFatSickPost,
  buildWieserTwoFacesWheatPost,
  buildHallUpfRctPost,
  buildBrookeTaylorCaseinPost,
  buildWhoSugarsGuidelinePost
};
