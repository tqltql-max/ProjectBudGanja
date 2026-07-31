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
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
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
    coverImage: '/imagens/og-default.jpg',
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
| Botânica e planta | [Cannabis sativa](/plantas/cannabis-sativa/) |
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

const ARTIGOS_INSPECOES_POSTS = [buildAlbaughCannabisNeurodesenvolvimentoPost()];

module.exports = {
  ARTIGOS_INSPECOES_POSTS,
  buildAlbaughCannabisNeurodesenvolvimentoPost
};
