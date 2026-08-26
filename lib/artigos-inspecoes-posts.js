'use strict';

/**
 * Inspeções de artigos científicos (revistas peer-reviewed).
 * Série: artigos-cientificos — tipagem no hub via resolveInspecaoTipo() → 'artigo'.
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
  post.content_raw = opts.body;
  if (opts.titleEn) {
    post.titleEn = opts.titleEn;
    post.titleEn = opts.titleEn;
  }
  if (opts.titleEs) {
    post.titleEs = opts.titleEs;
    post.titleEs = opts.titleEs;
  }
  if (opts.excerptEn) {
    post.excerptEn = opts.excerptEn;
    post.excerptEn = opts.excerptEn;
  }
  if (opts.excerptEs) {
    post.excerptEs = opts.excerptEs;
    post.excerptEs = opts.excerptEs;
  }
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.doi) post.doi = opts.doi;
  return post;
}

function buildAlbaughCannabisNeurodesenvolvimentoPost() {
  return artigoPost({
    title: 'Inspeção: Artigo — Cannabis na adolescência e neurodesenvolvimento (JAMA Psychiatry)',
    titleEn:
      'Inspection: Article — Adolescent cannabis use and neurodevelopment (JAMA Psychiatry)',
    titleEs:
      'Inspección: Artículo — Cannabis en la adolescencia y neurodesarrollo (JAMA Psychiatry)',
    excerpt:
      'Auditoria editorial do estudo longitudinal IMAGEN (Albaugh et al., 2021): 799 adolescentes naïve, 1598 RM, afinamento cortical pré-frontal dose-dependente e sobreposição com densidade de receptores CB1.',
    excerptEn:
      'Editorial audit of the IMAGEN longitudinal study (Albaugh et al., 2021): 799 cannabis-naïve adolescents, 1,598 MRIs, dose-dependent prefrontal cortical thinning overlapping CB1 receptor density.',
    excerptEs:
      'Auditoría editorial del estudio longitudinal IMAGEN (Albaugh et al., 2021): 799 adolescentes naïve, 1598 RM, adelgazamiento cortical prefrontal dosis-dependiente y solapamiento con densidad de receptores CB1.',
    slug: 'inspecao-artigo-albaugh-cannabis-neurodesenvolvimento',
    date: '2026-07-30T22:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'JAMA Psychiatry · 2021',
    coverImage: '/imagens/inspecoes/jama-albaugh-cover.jpg',
    sourceUrl: 'https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2781289',
    doi: '10.1001/jamapsychiatry.2021.1258',
    body: `## Escopo

Inspeção editorial independente do artigo científico **Association of Cannabis Use During Adolescence With Neurodevelopment**, publicado em *JAMA Psychiatry* (2021). O objectivo é traduzir, para o público do laboratório BudGanja, o desenho, os achados, os limites e a relevância prática — sem substituir a leitura do original nem orientação clínica.

> **Nota metodológica:** auditoria baseada no texto completo (open access, licença CC-BY), Key Points, Abstract, Methods, Results, Discussion e Article Information. **Sem vínculo** com os autores, o consórcio IMAGEN, a JAMA Network ou financiadores. Esta ficha **não** constitui aconselhamento médico.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Association of Cannabis Use During Adolescence With Neurodevelopment |
| Autores (1.º / correspondente) | Matthew D. Albaugh, PhD (University of Vermont) · et al.; consórcio **IMAGEN** |
| Revista | *JAMA Psychiatry*, 2021;78(9):1031–1040 |
| DOI | [10.1001/jamapsychiatry.2021.1258](https://doi.org/10.1001/jamapsychiatry.2021.1258) |
| URL JAMA | [fullarticle/2781289](https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2781289) |
| Tipo | Original Investigation · coorte longitudinal · neuroimagem |
| PubMed | [PMID 34132750](https://pubmed.ncbi.nlm.nih.gov/34132750/) |
| Acesso | Open access (CC-BY) |
| Aceite / online | 18/04/2021 · 16/06/2021 |
| Data da inspeção | 2026-07-30 |

## Pergunta de investigação (Key Points)

**Questão:** em que medida o uso de cannabis se associa ao desenvolvimento da espessura cortical cerebral medida por RM durante a adolescência?

**Achado central:** em 1598 imagens de 799 participantes, o uso de cannabis associou-se a **afinamento cortical acelerado** (14–19 anos), sobretudo em regiões **pré-frontais**. O padrão espacial correlacionou-se com um mapa PET de disponibilidade de receptores **CB1**.

**Significado declarado pelos autores:** o uso de cannabis na adolescência média–tardia pode associar-se a neurodesenvolvimento cortical alterado, especialmente em córtices ricos em CB1.

## Hipóteses e método da inspeção

- **H1:** o artigo apresenta um desenho longitudinal forte o suficiente para ser referência de primeira linha sobre cannabis e cérebro adolescente.
- **H2:** os controlos (álcool, tabaco, espessura basal) e a convergência com mapa CB1 elevam a credibilidade biológica dos achados.
- **H3:** os limites (auto-relato, desenho observacional, PET em amostra distinta) impedem inferência causal definitiva — a ficha deve deixar isso explícito.
- **Método BudGanja:** (1) leitura integral do paper; (2) extracção de desenho, amostra, exposições e desfechos; (3) síntese de resultados com estatísticas-chave; (4) avaliação crítica de forças/limites; (5) cruzamento com formação e recursos do site.

## Desenho e amostra

| Elemento | Detalhe |
|----------|---------|
| Coorte | **IMAGEN** — 8 centros europeus |
| Critério-chave | Cannabis-**naïve** no baseline + RM e dados comportamentais em T0 e follow-up de 5 anos |
| N analisado | **799** participantes · **1598** RM |
| Sexo | 450 mulheres (56,3%) |
| Idade | Baseline **14,4 ± 0,4** anos · Follow-up **19,0 ± 0,7** anos |
| Janela de aquisição | Baseline 2008–2011 · Follow-up 2013–2016 |
| Exposição | ESPAD (frequência lifetime: 0 a ≥40 usos) |
| Neuroimagem | RM T1 3D · pipeline **CIVET 2.1.0** · análise SurfStat |
| Modelo principal | Linear mixed-effects (LMM); ID como efeito aleatório |
| Covariáveis | Idade, volume cerebral total, sexo, lateralidade, centro, consumo de álcool (AUDIT-C) |
| Correção espacial | Random field theory · *P* < 0,05 (cluster-corrected) |
| Uso no follow-up | 208 com 1–9 usos · 161 com 10 a ≥40 usos |

## Achados principais

### 1. Associação transversal (≈19 anos)

Uso lifetime negativamente associado à espessura pré-frontal:

| Hemisfério | Pico *t* | Vértices | *P* (cluster RFT) |
|------------|----------|----------|-------------------|
| Pré-frontal esquerdo | t₇₈₅ = −4,87 | 1558 | 1,10 × 10⁻⁶ |
| Pré-frontal direito | t₇₈₅ = −4,27 | 1551 | 2,81 × 10⁻⁵ |

### 2. Temporalidade

**Sem** associação significativa entre espessura cortical no baseline (≈14 anos) e uso lifetime no follow-up — sugere que as diferenças observadas **não precediam** a iniciação.

### 3. Análise longitudinal (interacção tempo × cannabis)

Afinamento idade-relacionado **qualificado** pelo uso, de forma dose-dependente:

| Hemisfério | Pico *t* | Vértices | *P* (cluster RFT) |
|------------|----------|----------|-------------------|
| Pré-frontal esquerdo | t₈₁₅,₂₇ = −4,24 | 3643 | 2,28 × 10⁻⁸ |
| Pré-frontal direito | t₈₁₃,₃₀ = −4,71 | 2675 | 3,72 × 10⁻⁸ |

### 4. Convergência biológica e comportamental

| Teste | Resultado |
|-------|-----------|
| Mapa PET CB1 (amostra independente, [¹¹C]OMAR) | Correlação espacial com o padrão de afinamento (*r* = −0,189; *P* < 0,001); em homens apenas, *r* = −0,313 |
| Afinamento idade-relacionado na amostra | Correlação com o padrão cannabis-relacionado (*r* = 0,540; *P* < 0,001) |
| Impulsividade atencional (Barratt) | Afinamento pré-frontal dorsomedial direito associado a maior impulsividade atencional no follow-up (*b* = −0,119; *P* = 0,003) |
| Sexo como moderador | Sem interacção significativa sexo × cannabis |
| Controlo de tabaco | Achados longitudinalmente consistentes após covariar uso de tabaco |

## Avaliação metodológica

### Forças

1. **Maior estudo longitudinal de neuroimagem** sobre uso de cannabis na adolescência à data da publicação (segundo os autores).
2. Participantes **naïve no baseline** — exposição concentrada na mesma janela desenvolvimental (14→19 anos).
3. Controlo de álcool; robustez parcial a tabaco, QI e nível socioeconómico.
4. Convergência com densidade CB1 e com regiões de maior mudança maturacional — coerência biológica plausível.
5. Open access — replicabilidade editorial e acesso público ao texto.

### Limites (declarados e relevantes)

| Limite | Implicação |
|--------|------------|
| Desenho **observacional** | Associação ≠ causalidade; trajectórias pré-existentes não podem ser excluídas de forma absoluta |
| Uso por **auto-relato** (ESPAD) | Viés de memória / honestidade; sem tipificação de produto (óleos, potência, CBD:THC) |
| PET CB1 em **outra amostra** (homens adultos) | Não prova densidade CB1 nos 799 adolescentes; é convergência espacial |
| Mecanismo MRI do «thinning» | Pode reflectir mielinização de camadas profundas vs. poda sináptica — interpretação biológica ainda aberta |
| Sem foco subcortical | Amígdala, hipocampo e outros sítios ricos em CB1 ficam para estudos futuros |

### Veredicto técnico BudGanja

| Critério | Nota |
|----------|------|
| Relevância para cannabis / saúde pública | ★★★★★ |
| Rigor de desenho longitudinal | ★★★★★ |
| Controlo de confundidores | ★★★★☆ |
| Inferência causal | ★★★☆☆ (associação forte, causalidade não estabelecida) |
| Utilidade educativa no laboratório | ★★★★★ |

**Status sugerido:** referência científica de **alta qualidade** para discutir risco neurodesenvolvimental do uso na adolescência — com ênfase em redução de danos e atraso da iniciação, não em estigmatização do adulto responsável.

## Implicações práticas (laboratório e educação)

1. **Janela crítica 14–19 anos** — o artigo reforça que a adolescência média–tardia é período de remodelação cortical intensiva; exposição repetida a cannabis nesta faixa merece prudência acrescida.
2. **Dose importa** — padrão dose-dependente: maior frequência associada a maior afinamento pré-frontal.
3. **Pré-frontal e impulsividade** — ligação com impulsividade atencional ajuda a explicar, em linguagem acessível, preocupações com atenção e controlo executivo.
4. **Não generalizar ao uso adulto terapêutico regulado** — a amostra é comunitária europeia adolescente; não avalia cannabis medicinal prescrita nem produtos padronizados ANVISA.
5. **Política e educação** — os autores sublinham relevância face à legalização recreativa; no Brasil, o material serve sobretudo para formação e redução de danos em jovens.

## Complementaridade com o Inspetor BudGanja

| Tema do artigo | Recurso BudGanja |
|----------------|------------------|
| Cannabis e cérebro / saúde mental | [Pesquisas](/biblioteca/pesquisas/) · [Inspeções](/biblioteca/inspecoes/) |
| Formação clínica e redução de danos | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Hub UNIFESP](/biblioteca/unifesp/) |
| Divulgação académica em vídeo | [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Canal CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Botânica e planta | [Cannabis sativa](/plantas/cannabis-sativa/) · [Cuidados na ficha](/plantas/cannabis-sativa/#planta-cuidados) |
| Cultivo responsável (contexto adulto) | [Diário de pesquisas](/cultivo/) · [Ferramentas](/calculadoras/) |

## Como repetir o método (inspeções de artigos)

1. Identificar DOI, PMID e tipo de estudo (RCT, coorte, meta-análise).
2. Extrair pergunta, amostra, exposição, desfecho e modelo estatístico.
3. Separar **achados** de **interpretação** e listar limites dos autores.
4. Atribuir veredicto técnico (forças / limites / utilidade educativa).
5. Ligar a páginas do site sem exagerar generalizações clínicas.
6. Fechar com status claro e links canónicos (DOI + publisher).

## Créditos e transparência

- **Artigo ©** Albaugh MD et al. / JAMA Network — open access CC-BY
- **Fonte canónica:** [jamanetwork.com/…/2781289](https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2781289) · [doi.org/10.1001/jamapsychiatry.2021.1258](https://doi.org/10.1001/jamapsychiatry.2021.1258)
- **Consórcio:** IMAGEN Consortium
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)
- **Finalidade:** educação científica e redução de danos — **não** substitui avaliação médica, psicológica ou jurídica

## Status

**Aprovado como referência científica** — estudo longitudinal de grande porte que associa, de forma dose-dependente, o uso de cannabis na adolescência a afinamento cortical pré-frontal acelerado, com convergência espacial para regiões ricas em CB1. Recomendado para estudo crítico; causalidade permanece aberta; priorizar prevenção e atraso da iniciação em adolescentes.

[▶ Ler o artigo (JAMA)](https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2781289) · [DOI](https://doi.org/10.1001/jamapsychiatry.2021.1258) · [PubMed](https://pubmed.ncbi.nlm.nih.gov/34132750/) · [Todas as inspeções](/biblioteca/inspecoes/#inspecoes-artigos)`
  });
}

function buildGobbiCannabisAdolescenciaHumorPost() {
  const albaugh = '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const planta = '/plantas/cannabis-sativa/';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const pesquisas = '/biblioteca/pesquisas/';
  const fito = '/posts/post-pesquisa-fitocanabinoides.html';
  const jama = 'https://jamanetwork.com/journals/jamapsychiatry/fullarticle/2723657';
  const pmc = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6450286/';
  const doi = '10.1001/jamapsychiatry.2018.4500';
  return artigoPost({
    title:
      'Inspeção: Artigo — Cannabis na adolescência, depressão e suicídio (JAMA Psychiatry)',
    titleEn:
      'Inspection: Article — Adolescent cannabis, depression and suicide (JAMA Psychiatry)',
    titleEs:
      'Inspección: Artículo — Cannabis en la adolescencia, depresión y suicidio (JAMA Psychiatry)',
    excerpt:
      'Auditoria da meta-análise Gobbi et al. (2019): 11 coortes, 23 317 jovens; OR 1,37 para depressão, 1,50 para ideação, 3,46 para tentativas; ansiedade não significativa. Associação ≠ destino; CVV 188.',
    excerptEn:
      'Audit of Gobbi et al. (2019) meta-analysis: 11 cohorts, 23,317 youths; OR 1.37 for depression, 1.50 for ideation, 3.46 for attempts; anxiety not significant. Association ≠ destiny; seek help.',
    excerptEs:
      'Auditoría del metanálisis Gobbi et al. (2019): 11 cohortes, 23 317 jóvenes; OR 1,37 depresión, 1,50 ideación, 3,46 intentos; ansiedad no significativa. Asociación ≠ destino; pedir ayuda.',
    slug: 'inspecao-artigo-gobbi-cannabis-adolescencia-humor',
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: 7,
    seriesLabel: 'JAMA Psychiatry · 2019',
    coverImage: '/imagens/inspecoes/jama-gobbi-cover.jpg',
    sourceUrl: jama,
    doi: doi,
    body: `## Escopo

Inspeção editorial independente do artigo **Association of Cannabis Use in Adolescence and Risk of Depression, Anxiety, and Suicidality in Young Adulthood: A Systematic Review and Meta-analysis** (*JAMA Psychiatry*, 2019). Complementa a ficha de neuroimagem [Albaugh / IMAGEN (2021)](${albaugh}): aqui o desfecho não é espessura cortical, é **humor e comportamento suicida** na entrada da vida adulta.

> **Cuidado e ajuda:** esta ficha fala de depressão e de suicídio como **desfechos epidemiológicos**. Não descreve métodos. Se estiveres em crise no Brasil, liga **188** (CVV, 24 h, sigilo). Procura um serviço de saúde. A leitura do paper **não** substitui avaliação clínica.

> **Nota metodológica:** auditoria do texto completo disponível no [PMC 6450286](${pmc}) (versão JAMA). **Sem vínculo** com McGill, JAMA Network, CIHR ou indústria. **Associação observacional ≠ causalidade individual ≠ receita.**

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Association of Cannabis Use in Adolescence and Risk of Depression, Anxiety, and Suicidality in Young Adulthood |
| Autores | Gabriella Gobbi, MD, PhD (McGill; correspondente) · Tobias Atkin · Tomasz Zytynski · et al. |
| Revista | *JAMA Psychiatry*, 2019;76(4):426–434 |
| DOI | [${doi}](https://doi.org/${doi}) |
| URL JAMA | [fullarticle/2723657](${jama}) |
| PMC / PMID | [PMC6450286](${pmc}) · [30758486](https://pubmed.ncbi.nlm.nih.gov/30758486/) |
| Tipo | Revisão sistemática + meta-análise de coortes longitudinais (PRISMA) |
| Acesso | Texto completo no PMC; artigo da JAMA Network |
| Correcção | 13/03/2019 (Discussion) |
| Financiamento | CIHR (knowledge synthesis 147991) · Quebec Network on Suicide, Mood Disorders and Related Disorders |
| Data da inspeção | 2026-08-24 |

## Pergunta de investigação (Key Points)

**Questão:** o consumo de cannabis na adolescência associa-se a depressão, ansiedade e suicídio na jovem adultícia?

**Achado central:** 11 estudos, **23 317** pessoas. Cannabis na adolescência associou-se a **mais depressão e comportamento suicida** mais tarde, mesmo depois de ajustar depressão/ansiedade/suicídio no baseline. **Ansiedade: sem associação estatística.**

**Significado declarado pelos autores:** pré-adolescentes e adolescentes devem evitar cannabis; o achado deve informar política de prevenção. O laboratório traduz o número — **não** transforma OR em destino pessoal.

## Hipóteses e método da inspeção

- **H1:** o desenho (só coortes com ajuste de humor no baseline) é o mínimo aceitável para não confundir auto-medicação com sequência temporal.
- **H2:** o OR de depressão (~1,4) é **modesto no indivíduo** e ganha peso populacional pela prevalência de uso.
- **H3:** o OR de tentativas (~3,5) assenta em **poucos estudos** e heterogeneidade alta — tratar com cautela.
- **H4:** ansiedade nula é um resultado, não um «esquecimento».
- **Método BudGanja:** (1) Key Points / Abstract; (2) critérios de inclusão e enviesamento; (3) ORs com I²; (4) PAF e conflitos; (5) cruzar [Albaugh](${albaugh}), [planta](${planta}), [UNIFESP](${unifesp}).

## Desenho e amostra

| Elemento | Detalhe |
|----------|---------|
| Fontes | Medline, Embase, CINAHL, PsycInfo, teses ProQuest · início → Janeiro 2017 |
| Selecção | 3142 → 269 texto completo → 35 revisão → **11** na quantitativa |
| Desenho exigido | Longitudinal **prospectivo**; cannabis (não «drogas» genéricas); desfecho humor/suicídio |
| Exposição | Pelo menos 1 medição **< 18 anos**; quando havia vários ORs, ficou o da **maior frequência vs. não-uso** |
| Desfecho | Depressão / ansiedade / ideação / tentativas aos **18–32 anos** (DSM-III/IV ou escalas com corte) |
| Ajuste mínimo | Idade, sexo e humor/suicídio **no baseline**; quase todos: NSE, álcool, tabaco |
| Síntese | Modelo de **efeitos aleatórios**; qualidade = RTI item bank (não score único) |
| Software | metafor (R 3.4.0) |

## Achados principais

| Desfecho | Estudos | OR agrupado (IC 95 %) | I² | Leitura BudGanja |
|----------|---------|------------------------|----|------------------|
| Depressão | 7 | **1,37** (1,16–1,62) | 0 % | Sinal homogéneo, magnitude **modesta** |
| Ansiedade | 3 | 1,18 (0,84–1,67) | 42 % | **Não significativo** |
| Ideação suicida | 3 | **1,50** (1,11–2,03) | 0 % | Sinal; amostra de estudos curta |
| Tentativas | 3 | **3,46** (1,53–7,84) | **61 %** | Ponto alto, **incerto** (heterogeneidade) |

Sensibilidade: tirar Degenhardt et al. (possível sobreposição Victoria / Silins) manteve depressão (OR 1,40). Reanálise de Marmorstein & Iacono com *propensity score* manteve OR elevado naquela coorte (≈ 2,5–2,6).

**PAF dos autores (EUA, ilustrativo):** 7,2 % → ~413 000 casos de depressão em jovens 18–34 anos «atribuíveis» se a associação fosse causal. É **extrapolação norte-americana**, não censo brasileiro. Causalidade **não** está fechada.

## Forças

- Só longitudinais com **ajuste de humor prévio** — corta a leitura preguiçosa «já estava deprimido, por isso fumou».
- Depressão com I² = 0 % no pool principal.
- PRISMA, pesquisa por bibliotecária, dupla triagem.
- Distingue ansiedade (nula) de humor/suicídio (presente).

## Limites (os autores e o laboratório)

- Observacional: **não** prova que a cannabis «cause» o episódio daquela pessoa.
- Nem todos os estudos ajustam outras drogas, abandono escolar ou pares.
- Medição de uso = **frequência**, não miligramas de THC; potência subiu desde os anos 1980.
- Tentativas: 3 estudos, I² alta — não transformar 3,46 em lei.
- Harder et al. (2008) já tinham mostrado que *propensity scores* podem **apagar** o sinal de depressão noutros desenhos — a literatura não é unânime.
- Conflitos: Gobbi teve grant de CBD (dor neuropática) com participação da Aurora; Ware passou a empregado da Canopy Growth (2018), após a sua parte no estudo. Declarados; a ficha **não** os apaga.

## Veredicto técnico

**Referência de primeira linha para literacia de dano na adolescência**, ao lado de [Albaugh](${albaugh}) (cérebro) e da [planta](${planta}) (botânica ≠ inocuidade). Útil para dizer: **atrasar iniciação** e não confundir «planta medicinal regulamentada» com «livre na puberdade». Inútil para estigma, para negar cannabis medicinal em adulto com prescrição, ou para afirmar que um único uso «marca» depressão.

Escala de leitura BudGanja: evidência **associativa consolidada** (depressão); evidência **associativa frágil-a-moderada** (tentativas); evidência **insuficiente** (ansiedade neste pool).

## Complementaridade BudGanja

| Camada | Ficha |
|--------|-------|
| Cérebro adolescente (RM) | [Albaugh 2021](${albaugh}) |
| Psicose · potência (caso-controlo) | [Di Forti 2019 · EU-GEI](/posts/post-inspecao-artigo-diforti-eugei-psicose-2019.html) |
| CBD isolado (RCT Dravet) | [Devinsky 2017](/posts/post-inspecao-artigo-devinsky-cbd-dravet-2017.html) |
| Catálogo molecular | [Fitocanabinoides](${fito}) |
| Planta / lei / UNIFESP | [Cannabis sativa](${planta}) · [Curso UNIFESP](${unifesp}) |
| Hub | [Pesquisas](${pesquisas}) · [Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |

## Como repetir o método

1. Confirmar DOI, PMC e tipo (meta-análise vs. coorte vs. RCT).
2. Extrair critérios de inclusão — aqui o ouro é o **ajuste de baseline**.
3. Copiar ORs **com I² e n de estudos**, não só o título da imprensa.
4. Separar PAF / política da inferência individual.
5. Ligar ajuda (CVV 188) quando o desfecho é suicídio.
6. Declarar conflitos da indústria.

## Créditos e transparência

- **Artigo ©** American Medical Association / autores — citar o original; esta ficha é auditoria educativa.
- **Canónico:** [JAMA 2723657](${jama}) · [doi.org/${doi}](https://doi.org/${doi}) · [PMC](${pmc})
- **Inspeção:** Inspetor BudGanja · 2026-08-24
- **Não é** aconselhamento médico, jurídico nem prevenção clínica protocolada

## Status

**Aprovado como referência científica** — meta-análise JAMA que associa cannabis **antes dos 18** a mais depressão e mais ideação/tentativas na jovem adultícia, com ansiedade não significativa neste pool. Ler junto com [Albaugh](${albaugh}). Causalidade aberta; prevenção na adolescência é a leitura de saúde pública, não o pânico nem o laissez-faire.

Ajuda: **CVV 188**.

[▶ JAMA](${jama}) · [DOI](https://doi.org/${doi}) · [PMC](${pmc}) · [Albaugh](${albaugh}) · [Todas as inspeções](/biblioteca/inspecoes/#inspecoes-artigos)`
  });
}

function buildDiFortiEugeiPsicose2019Post() {
  const albaugh = '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const gobbi = '/posts/post-inspecao-artigo-gobbi-cannabis-adolescencia-humor.html';
  const devinsky = '/posts/post-inspecao-artigo-devinsky-cbd-dravet-2017.html';
  const planta = '/plantas/cannabis-sativa/';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const fito = '/posts/post-pesquisa-fitocanabinoides.html';
  const lancet = 'https://www.thelancet.com/journals/lanpsy/article/PIIS2215-0366(19)30048-3/fulltext';
  const pmc = 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6447576/';
  const doi = '10.1016/S2215-0366(19)30048-3';
  return artigoPost({
    title: 'Inspeção: Artigo — Cannabis de alta potência e psicose (EU-GEI, Lancet Psychiatry)',
    titleEn:
      'Inspection: Article — High-potency cannabis and first-episode psychosis (EU-GEI, Lancet Psychiatry)',
    titleEs:
      'Inspección: Artículo — Cannabis de alta potencia y psicosis (EU-GEI, Lancet Psychiatry)',
    excerpt:
      'Auditoria do caso-controlo EU-GEI (Di Forti et al., 2019): 901 primeiros episódios vs 1237 controlos em 11 sítios; uso diário OR 3,2; diário de alta potência OR 4,8. PAF assume causalidade. Associação ≠ destino.',
    excerptEn:
      'Audit of the EU-GEI case-control study (Di Forti et al., 2019): 901 first-episode cases vs 1,237 controls across 11 sites; daily use OR 3.2; daily high-potency OR 4.8. PAF assumes causality. Association ≠ destiny.',
    excerptEs:
      'Auditoría del caso-control EU-GEI (Di Forti et al., 2019): 901 primeros episodios vs 1237 controles en 11 sitios; uso diario OR 3,2; diario de alta potencia OR 4,8. El PAF asume causalidad. Asociación ≠ destino.',
    slug: 'inspecao-artigo-diforti-eugei-psicose-2019',
    date: '2026-08-24T18:00:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'Lancet Psychiatry · 2019',
    coverImage: '/imagens/inspecoes/lancet-diforti-cover.jpg',
    sourceUrl: lancet,
    doi: doi,
    body: `## Escopo

Inspeção editorial independente de **The contribution of cannabis use to variation in the incidence of psychotic disorder across Europe (EU-GEI): a multicentre case-control study** (*The Lancet Psychiatry*, 2019). Fecha o marcador da fila científica depois de [Albaugh](${albaugh}) (cérebro) e [Gobbi](${gobbi}) (humor): aqui o desfecho é **primeiro episódio psicótico**, e a exposição distingue **frequência** e **potência** (THC).

> **Cuidado:** psicose é urgência de saúde. Esta ficha **não** descreve sintomas para auto-diagnóstico nem métodos de dano. No Brasil, em crise: **SAMU 192**, UPA/PS, CAPS. A leitura do paper **não** substitui avaliação clínica.

> **Nota metodológica:** auditoria do texto publicado (DOI + PMC). **Sem vínculo** com King's College London, EU-GEI, *The Lancet* ou financiadores. **Caso-controlo ≠ RCT. Associação ≠ causalidade individual. PAF assume causalidade.** Não é veredicto sobre cannabis medicinal de adulto com prescrição. Não fundir com o ensaio de [CBD / Dravet](${devinsky}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | The contribution of cannabis use to variation in the incidence of psychotic disorder across Europe (EU-GEI) |
| 1.ª / correspondente | Marta Di Forti (King's College London) |
| Co-autores (elo BR) | Cristina Marta Del-Ben · Paulo Rossi Menezes (USP / Ribeirão Preto no consórcio) |
| Revista | *Lancet Psychiatry*, 2019;6(5):427–436 |
| DOI | [10.1016/S2215-0366(19)30048-3](https://doi.org/${doi}) |
| URL Lancet | [PIIS2215-0366(19)30048-3](${lancet}) |
| PubMed | [PMID 30902669](https://pubmed.ncbi.nlm.nih.gov/30902669/) |
| PMC | [PMC6447576](${pmc}) |
| Tipo | Caso-controlo multicêntrico · 11 sítios (10 Europa + 1 Brasil) |
| Janela | 1 mai. 2010 – 1 abr. 2015 |
| Financiamento | FP7, MRC, NIHR, Wellcome, **FAPESP** (Brasil) — financiadores não redigiram o paper |
| Data da inspeção | 2026-08-24 |

## Pergunta de investigação

Em que medida o **uso diário** e o uso de cannabis de **alta potência** (THC ≥ 10 %) se associam a primeiro episódio psicótico, e se a prevalência desses padrões nos controlos acompanha a variação geográfica da incidência?

## Hipóteses e método da inspeção

- **H1:** o desenho EU-GEI (casos de primeiro episódio + controlos populacionais + incidência por sítio) é referência de primeira linha para literacia de **potência × frequência**.
- **H2:** o corte THC &lt;10 % vs ≥10 % (EMCDDA / tipo esperado no mercado) é útil e **conservador** — não é ensaio laboratorial do cigarro de cada pessoa.
- **H3:** PAF e correlações ecológicas são leitura de **saúde pública**, não prova de que «todo o uso causa psicose».
- **Método BudGanja:** (1) paper integral; (2) amostra, exposição, OR ajustados; (3) PAF e geografia; (4) limites dos autores; (5) cruzamento com [Albaugh](${albaugh}) / [Gobbi](${gobbi}) sem fundir desfechos.

## Desenho e amostra

| Elemento | Detalhe |
|----------|---------|
| Desenho | Caso-controlo multicêntrico |
| Casos | **901** primeiro episódio (CID-10 F20–F33), 18–64 anos |
| Controlos | **1237** amostrados da população em risco |
| Recrutamento abordado | 1519 doentes; 23 % recusaram (mais velhos e mais mulheres) |
| Sítios excluídos | Verona, Santiago, Oviedo, Valência, Cuenca (≥10 % dados em falta + N pequeno) |
| Exposição | CEQ<sub>EU-GEI</sub>; potência baixa THC **&lt;10 %** vs alta **≥10 %** (estimativas oficiais, não dose no laboratório) |
| Viés de recrutamento | Materiais **não** mencionavam cannabis |
| Ajuste (OR «fully adjusted») | Idade, sexo, etnia, escolaridade, emprego, tabaco, estimulantes, ketamina, *legal highs*, alucinogénios |

Casos eram mais novos, mais homens, mais de minorias étnicas, com menos escolaridade e mais desemprego — o padrão esperado vs. população geral, não um «defeito» escondido.

## Achados principais

### Frequência e potência (vs nunca-utilizadores)

| Exposição | Controlos | Casos | OR ajustado (IC 95 %) |
|-----------|-----------|-------|------------------------|
| Algum uso lifetime | 46,4 % | 64,9 % | **1,3** (1,1–1,6) |
| Início ≤15 anos | 13,7 % | 28,6 % | **1,6** (1,1–2,1) |
| Uso diário | **6,8 %** | **29,5 %** | **3,2** (2,2–4,1) |
| ≥ €20 / semana | 3,2 % | 17,4 % | 2,5 (1,6–3,8) |
| Alta potência (THC ≥10 %) | **19,4 %** | **37,1 %** | **1,6** (1,2–2,2) |
| Baixa potência (THC &lt;10 %) | 26,7 % | 27,9 % | 1,1 (0,9–1,5) — NS |
| Diário + alta potência (amostra) | — | — | **4,8** (2,5–6,3) |

O dinheiro gasto perde força depois de controlar frequência e tipo. Início precoce não é independente da frequência/potência. Não houve interacção significativa frequência × tipo (p = 0,25) nem heterogeneidade dos OR entre sítios para uso diário (p = 0,25) ou alta potência (p = 0,45).

### Geografia (literacia, não ranking moral)

Nos três sítios com mais consumo de alta potência, o uso **diário de alta potência** vs nunca: ~4× Paris, ~5× Londres, &gt;9× Amesterdão. Amesterdão: OR de uso diário **7,1** (3,4–11,8); Palermo: alta potência sem efeito principal (PAF não calculado).

### PAF (só se a associação fosse causal)

| Medida | Estimativa |
|--------|------------|
| Uso diário (11 sítios) | **20,4 %** (17,6–22,0) dos novos casos |
| Alta potência (11 sítios) | **12,2 %** (3,0–16,1) |
| Alta potência · Londres | **30,3 %** |
| Alta potência · Amesterdão | **50,3 %** (27,4–66,0) |
| Uso diário · Amesterdão | 43,8 % (34,0–69,1) |
| Uso diário · Puy-de-Dôme | 1,2 % |

O laboratório **não** traduz PAF em «X % dos psicóticos devem-se à cannabis» na boca do leitor. É contrafactual dos autores, com IC largo em vários sítios.

### Incidência × prevalência nos controlos

Taxas ajustadas de psicose correlacionaram-se com prevalência de uso diário nos controlos (**r = 0,8**; p = 0,0109) e de alta potência (**r = 0,7**; p = 0,0286). Uso diário e alta potência nos controlos correlacionavam-se só modestamente (r = 0,2). Londres ~45,7 / 100 000 pessoas-ano; Amesterdão 37,9; Bolonha 21,0.

## Forças

- Multicentro com **incidência** no mesmo mapa — raro em cannabis × psicose.
- Primeiro episódio reduz viés de curso da doença.
- Recrutamento sem mencionar cannabis.
- Ajuste para outras drogas e demografia.
- Distingue baixa vs alta potência; elo Brasil (USP / FAPESP) no consórcio.
- Análise de sensibilidade a viés de selecção (apêndice): OR de uso diário manteve-se na mesma ordem, IC mais largo.

## Limites (os autores e o laboratório)

- **Observacional:** não prova que a cannabis «cause» o episódio daquela pessoa; causalidade inversa e confundimento residual (vulnerabilidade partilhada) permanecem em debate na literatura.
- Uso = auto-relato; sem urina/cabelo para a história de anos — os autores citam fiabilidade do relato de frequência/tipo.
- Potência = tipo **esperado no mercado** (EMCDDA), não % THC do cigarro; CBD quase não entra (dados só Inglaterra/Holanda).
- Corte 10 % pode **subestimar** o efeito no Reino Unido e nos Países Baixos, onde médias de rua são mais altas.
- Vários sítios espanhóis/italianos saíram por dados em falta.
- PAF **assume causalidade** — se essa premissa falha, a fracção atribuível cai.
- Não é ensaio de cannabis medicinal regulamentada nem de isolado de CBD.

## Veredicto técnico

**Referência de primeira linha para literacia de dano por potência e uso diário**, ao lado de [Albaugh](${albaugh}) (córtex) e [Gobbi](${gobbi}) (humor). Útil para dizer: **frequência + THC alto** não são o mesmo que «um uso». Inútil para estigma, para afirmar que todo o consumidor terá psicose, ou para negar [CBD farmacêutico em epilepsia rara](${devinsky}).

Escala BudGanja: evidência **associativa forte** (caso-controlo multicêntrico, dose-resposta frequência/potência); evidência **causal não fechada**; PAF = cenário, não censo.

## Complementaridade BudGanja

| Camada | Ficha |
|--------|-------|
| Cérebro adolescente (RM) | [Albaugh 2021](${albaugh}) |
| Humor / suicídio (meta-análise) | [Gobbi 2019](${gobbi}) |
| CBD isolado (RCT, outro desfecho) | [Devinsky 2017 · Dravet](${devinsky}) |
| Catálogo molecular | [Fitocanabinoides](${fito}) |
| Planta / UNIFESP | [Cannabis sativa](${planta}) · [Curso UNIFESP](${unifesp}) |
| Hub | [Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |

## Como repetir o método

1. Confirmar DOI, PMID, tipo (caso-controlo ≠ coorte ≠ RCT).
2. Separar OR brutos, OR ajustados e **PAF** (este último só com a premissa causal).
3. Copiar N de casos/controlos e o corte de potência, não só o título da imprensa.
4. Nomear geografia sem transformar Amesterdão/Londres em moral.
5. Ligar urgência de saúde (SAMU 192 / CAPS) quando o desfecho é psicose.
6. Não fundir com ensaios de CBD.

## Créditos e transparência

- **Artigo ©** Elsevier / autores EU-GEI — citar o original; esta ficha é auditoria educativa.
- **Canónico:** [Lancet](${lancet}) · [doi.org/${doi}](https://doi.org/${doi}) · [PMC6447576](${pmc})
- **Inspeção:** Inspetor BudGanja · 2026-08-24
- **Não é** aconselhamento médico, jurídico nem protocolo de prevenção clínica

## Status

**Aprovado como referência científica** — caso-controlo EU-GEI que associa uso **diário** e cannabis de **alta potência** a primeiro episódio psicótico, com PAF e correlação ecológica que **assumem** (não provam) causalidade. Ler junto com [Albaugh](${albaugh}) e [Gobbi](${gobbi}), contra o ensaio de [CBD](${devinsky}). Prevenção e atraso da iniciação pesada na adolescência são a leitura de saúde pública, não o pânico nem o laissez-faire.

Ajuda em crise no Brasil: **SAMU 192**.

[▶ Lancet](${lancet}) · [DOI](https://doi.org/${doi}) · [PMC](${pmc}) · [Gobbi](${gobbi}) · [Devinsky CBD](${devinsky}) · [Todas as inspeções](/biblioteca/inspecoes/#inspecoes-artigos)`
  });
}

function buildDevinskyCbdDravet2017Post() {
  const albaugh = '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html';
  const gobbi = '/posts/post-inspecao-artigo-gobbi-cannabis-adolescencia-humor.html';
  const diforti = '/posts/post-inspecao-artigo-diforti-eugei-psicose-2019.html';
  const planta = '/plantas/cannabis-sativa/';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const fito = '/posts/post-pesquisa-fitocanabinoides.html';
  const quimio = '/posts/post-inspecao-guia-quimiotipos-cannabis.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const nejm = 'https://www.nejm.org/doi/full/10.1056/NEJMoa1611618';
  const pdf = 'https://discovery.ucl.ac.uk/id/eprint/1558984/1/Cross_nejmoa1611618.pdf';
  const doi = '10.1056/NEJMoa1611618';
  return artigoPost({
    title: 'Inspeção: Artigo — CBD oral no síndrome de Dravet (Devinsky et al., NEJM)',
    titleEn: 'Inspection: Article — Oral CBD for Dravet syndrome (Devinsky et al., NEJM)',
    titleEs: 'Inspección: Artículo — CBD oral en el síndrome de Dravet (Devinsky et al., NEJM)',
    excerpt:
      'Auditoria do RCT NEJM 2017 (N=120, 2–18 anos): CBD isolado 20 mg/kg/dia vs placebo; crises convulsivas 12,4→5,9 vs 14,9→14,1 (P=0,01). Respondedores ≥50 % NS. Isolado ≠ óleo de loja; GW financiou.',
    excerptEn:
      'Audit of the 2017 NEJM RCT (N=120, ages 2–18): pharmaceutical CBD 20 mg/kg/day vs placebo; convulsive seizures 12.4→5.9 vs 14.9→14.1 (P=0.01). ≥50% responders NS. Isolate ≠ shop oil; GW funded.',
    excerptEs:
      'Auditoría del RCT NEJM 2017 (N=120, 2–18 años): CBD aislado 20 mg/kg/día vs placebo; crisis convulsivas 12,4→5,9 vs 14,9→14,1 (P=0,01). Respondedores ≥50 % NS. Aislado ≠ aceite de tienda; GW financió.',
    slug: 'inspecao-artigo-devinsky-cbd-dravet-2017',
    date: '2026-08-24T18:30:00.000Z',
    seriesOrder: 9,
    seriesLabel: 'NEJM · 2017',
    coverImage: '/imagens/inspecoes/nejm-devinsky-cbd-cover.jpg',
    sourceUrl: nejm,
    doi: doi,
    body: `## Escopo

Inspeção editorial independente de **Trial of Cannabidiol for Drug-Resistant Seizures in the Dravet Syndrome** (Devinsky, Cross, Laux, Marsh, Miller, Nabbout, Scheffer, Thiele, Wright et al., *N Engl J Med* 2017). É o segundo caminho da fila científica: um **RCT** de CBD **isolado farmacêutico** em epilepsia rara resistente — não um ensaio de «óleo de CBD» de loja, nem o inverso do [Di Forti](${diforti}).

> **Nota metodológica:** auditoria do artigo NEJM e do PDF institucional UCL. **Sem vínculo** com os autores, GW Pharmaceuticals ou o *Journal*. Esta ficha **não** é bula, **não** é protocolo de dose e **não** autoriza automedicação. Financiamento e conflitos **declarados abaixo**.

> **Não fundir:** [Di Forti](${diforti}) = THC / uso diário / psicose (observacional). Esta ficha = CBD isolado / Dravet / adjuvante de FAE (experimental). CBD **não** é o antídoto epidemiológico daquele paper.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | Trial of Cannabidiol for Drug-Resistant Seizures in the Dravet Syndrome |
| 1.º autor | Orrin Devinsky (NYU) |
| Revista | *N Engl J Med*, 2017;376:2011–2020 |
| DOI | [10.1056/NEJMoa1611618](https://doi.org/${doi}) |
| URL NEJM | [NEJMoa1611618](${nejm}) |
| PDF OA (UCL) | [discovery.ucl.ac.uk/1558984](${pdf}) |
| PubMed | [PMID 28538133](https://pubmed.ncbi.nlm.nih.gov/28538133/) |
| Registo | [NCT02091375](https://clinicaltrials.gov/study/NCT02091375) |
| Tipo | RCT duplo-cego, placebo-controlado, paralelo |
| Patrocínio | **GW Pharmaceuticals** (desenho, fármaco, análise — nomear) |
| Data da inspeção | 2026-08-24 |

## Pergunta de investigação

O canabidiol **oral isolado** (solução 100 mg/mL, alvo 20 mg/kg/dia), adicionado à medicação antiepiléptica estável, reduz a frequência de **crises convulsivas** em crianças e jovens com síndrome de Dravet resistente a fármacos, face a placebo?

## Hipóteses e método da inspeção

- **H1:** o RCT é âncora de primeira linha para «CBD medicinal com evidência» — com o recorte Dravet / isolado / adjuvante.
- **H2:** desfechos secundários não significativos (respondedores ≥50 %, crises não convulsivas, QdV) impedem o título milagroso.
- **H3:** interacções (clobazam → sonolência; valproato → aminotransferases) são literacia obrigatória, não letra miúda.
- **Método BudGanja:** (1) ITT e primário; (2) secundários com P; (3) EA e abandonos; (4) conflitos GW; (5) elo histórico [Carlini](${carlini}) (Cunha et al. 1980 citados no paper) sem transformar 1980 neste RCT.

## Desenho e amostra

| Elemento | Detalhe |
|----------|---------|
| N aleatorizado | **120** (61 CBD · 59 placebo) |
| Completaram | 108 |
| Idade | 2–18 anos (média ~9,8) |
| Diagnóstico | Síndrome de Dravet, epilepsia resistente (definição ILAE) |
| Baseline | ≥4 crises convulsivas nos 28 dias de basal |
| Centros | 23 (EUA + Europa) |
| Intervenção | Solução oral CBD **100 mg/mL**, titulação 2 semanas até **20 mg/kg/dia** BID |
| Tratamento | 14 semanas (2 titulação + 12 manutenção) + desmame |
| FAE concomitantes | Mediana **3**; clobazam **65 %**; valproato ~59 % |
| Primário | Variação percentual da frequência mensal de crises **convulsivas** (Wilcoxon / Hodges–Lehmann) |

## Achados principais

### Eficácia (ITT)

| Desfecho | CBD | Placebo | Contraste |
|----------|-----|---------|-----------|
| Crises convulsivas / mês (mediana) | 12,4 → **5,9** | 14,9 → 14,1 | diferença mediana ajustada **−22,8 pp** (−41,1 a −5,4); **P = 0,01** |
| Variação % mediana | **−38,9 %** | −13,3 % | — |
| Redução ≥50 % (chave secundária) | 26/61 (**43 %**) | 16/59 (**27 %**) | OR 2,00 (0,93–4,30); **P = 0,08 — NS** |
| Livres de crise (tratamento) | **3** | **0** | P = 0,08 |
| Crises totais | — | — | P = **0,03** |
| Não convulsivas | — | — | P = **0,88 — NS** |
| CGIC (melhoria cuidador) | **62 %** | **34 %** | P = **0,02** |
| QdV / Vineland-II | — | — | NS |

Três doentes no CBD ficaram livres de crises no período de tratamento; nenhum no placebo. O efeito parece concentrar-se nas **convulsivas**; olhar fixo breve em criança com atraso do desenvolvimento é difícil de contar — os autores admitem-no.

### Segurança

| Evento | CBD (n=61) | Placebo (n=59) |
|--------|------------|----------------|
| Qualquer EA | **93 %** | 75 % |
| Sonolência | **36 %** (22) | 10 % (6) |
| Diarreia | 31 % | 10 % |
| ↓ apetite | 28 % | 5 % |
| Fadiga | 20 % | 3 % |
| Vómitos | 15 % | 5 % |
| Febre | 15 % | 8 % |
| EA graves | 10 (16 %) | 3 (5 %) |
| Saída por EA | **8** | 1 |
| Aminotransferases &gt;3× LSN | **12** | 1 — **todos com valproato** |
| Estado de mal | 3 | 3 (não excesso; nenhum atribuído ao fármaco) |
| Mortes | 0 | 0 |

Dos 22 com sonolência no CBD, **18** estavam com clobazam (interacção). Redução de dose resolveu o EA em 8/10. Elevações de enzimas que permaneceram no ensaio voltaram ao normal **ainda em CBD**. Sem ideação suicida no C-SSRS (77 questionários; aplicabilidade limitada nesta população).

## Forças

- RCT duplo-cego em síndrome catastrófica, desfecho primário pré-especificado.
- ITT; centros múltiplos; critério de resistência ILAE.
- Separa convulsivas de não convulsivas e admite o que **não** move.
- Perfil de EA e interacções publicados com números, não só «bem tolerado».
- Elo de história: o paper cita Cunha, Carlini et al. 1980 — ver [Elisaldo Carlini](${carlini}).

## Limites (os autores e o laboratório)

- **Isolado farmacêutico ≠ óleo de loja ≠ flor rica em CBD.** Quimiotipo de planta ≠ este frasco.
- Dravet ≠ «CBD para ansiedade / insónia / tudo».
- Adjuvante de FAE, **não** monoterapia; 14 semanas — falta de longo prazo neste paper (OLE à parte).
- Respondedores ≥50 % e liberdade de crises **não** atingiram P &lt; 0,05.
- Possível desvelamento por sabor / sonolência (análise *post hoc* dos autores: sonolência não explicava o efeito nas crises).
- **GW Pharmaceuticals** financiou desenho, medicamento e análise; Wright era empregado GW; Devinsky declarou equity em empresas de canabinoides. A ficha **não** apaga o conflito; também **não** apaga o P = 0,01 no primário.
- Esta ficha **não** é posologia.

## Veredicto técnico

**Referência de primeira linha para CBD medicinal com evidência de RCT** no recorte Dravet / isolado / 20 mg/kg/dia / adjuvante. Útil para cortar o marketing de óleo. Inútil para contradizer [Di Forti](${diforti}) (outro canabinoide, outro desfecho, outro desenho) ou para receitar em casa.

Escala BudGanja: evidência **experimental positiva** no primário convulsivo; evidência **inconclusiva** no binário ≥50 %; segurança **com sinal** (sonolência, GI, fígado + valproato).

## Complementaridade BudGanja

| Camada | Ficha |
|--------|-------|
| THC / psicose (observacional) | [Di Forti 2019](${diforti}) |
| Adolescência · cérebro / humor | [Albaugh](${albaugh}) · [Gobbi](${gobbi}) |
| Molécula / quimiotipo | [Fitocanabinoides](${fito}) · [Quimiotipos](${quimio}) |
| História BR | [Elisaldo Carlini](${carlini}) · [Curso UNIFESP](${unifesp}) |
| Planta | [Cannabis sativa](${planta}) |
| Hub | [Artigos](/biblioteca/inspecoes/#inspecoes-artigos) |

## Como repetir o método

1. Confirmar NCT, dose, formulação (isolado vs extracto) e síndrome (Dravet ≠ LGS ≠ «epilepsia»).
2. Copiar o **primário** e os secundários que falharam, não só a mediana que desceu.
3. Tabelar EA com % vs placebo e nomear clobazam / valproato.
4. Declarar o patrocinador na mesma página do P.
5. Recusar a frase «o CBD cura» e a frase «o CBD não faz nada».

## Créditos e transparência

- **Artigo ©** Massachusetts Medical Society / autores — citar o original.
- **Canónico:** [NEJM](${nejm}) · [doi.org/${doi}](https://doi.org/${doi}) · [PDF UCL](${pdf})
- **Inspeção:** Inspetor BudGanja · 2026-08-24
- **Não é** aconselhamento médico nem protocolo de dose

## Status

**Aprovado como referência científica** — RCT NEJM que mostra redução de crises **convulsivas** com CBD isolado oral no Dravet, com EA reais e financiamento GW à vista. Ler **contra** o marketing de óleo e **ao lado** (não por cima) de [Di Forti](${diforti}).

[▶ NEJM](${nejm}) · [DOI](https://doi.org/${doi}) · [PDF](${pdf}) · [Di Forti](${diforti}) · [Carlini](${carlini}) · [Todas as inspeções](/biblioteca/inspecoes/#inspecoes-artigos)`
  });
}

const {
  ARTIGOS_PRODUTOS_NOCIVOS_POSTS
} = require('./artigos-produtos-nocivos-inspecoes-posts.js');

const ARTIGOS_INSPECOES_POSTS = [
  buildAlbaughCannabisNeurodesenvolvimentoPost(),
  buildGobbiCannabisAdolescenciaHumorPost(),
  buildDiFortiEugeiPsicose2019Post(),
  buildDevinskyCbdDravet2017Post(),
  ...ARTIGOS_PRODUTOS_NOCIVOS_POSTS
];

module.exports = {
  ARTIGOS_INSPECOES_POSTS,
  artigoPost,
  buildAlbaughCannabisNeurodesenvolvimentoPost,
  buildGobbiCannabisAdolescenciaHumorPost,
  buildDiFortiEugeiPsicose2019Post,
  buildDevinskyCbdDravet2017Post
};
