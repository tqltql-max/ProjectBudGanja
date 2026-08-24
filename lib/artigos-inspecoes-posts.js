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

const {
  ARTIGOS_PRODUTOS_NOCIVOS_POSTS
} = require('./artigos-produtos-nocivos-inspecoes-posts.js');

const ARTIGOS_INSPECOES_POSTS = [
  buildAlbaughCannabisNeurodesenvolvimentoPost(),
  buildGobbiCannabisAdolescenciaHumorPost(),
  ...ARTIGOS_PRODUTOS_NOCIVOS_POSTS
];

module.exports = {
  ARTIGOS_INSPECOES_POSTS,
  artigoPost,
  buildAlbaughCannabisNeurodesenvolvimentoPost,
  buildGobbiCannabisAdolescenciaHumorPost
};
