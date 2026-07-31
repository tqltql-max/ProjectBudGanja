'use strict';

/**
 * Inspeções de legado / pessoas de referência citadas no ecossistema canábico.
 * Série: legado-pessoas — tipagem no hub via resolveInspecaoTipo() → 'pessoa'.
 */

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

const TICAO_VIDEOS = {
  homenagem: '-CaKnBsFxxg',
  trajetoria: 'rg_ptxZEGI8'
};

function pessoaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'legado-pessoas',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Legado',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

function buildPadreTicaoInspecaoPost() {
  const inspected = '2026-07-31';
  const refId = TICAO_VIDEOS.trajetoria;

  return pessoaPost({
    title: 'Inspeção: Padre Ticão — Antônio Luiz Marchioni',
    titleEn: 'Inspection: Father Ticão — Antônio Luiz Marchioni',
    titleEs: 'Inspección: Padre Ticão — Antônio Luiz Marchioni',
    excerpt:
      'Homenagem documental ao Padre Ticão (Antônio Luiz Marchioni, 1952–2021): pároco de Ermelino Matarazzo, líder popular da zona leste e fundador do MovReCam — mérito máximo na democratização da educação sobre cannabis medicinal no Brasil.',
    excerptEn:
      'Documentary tribute to Father Ticão (Antônio Luiz Marchioni, 1952–2021): parish priest of Ermelino Matarazzo, East Zone popular leader and MovReCam founder — maximum credit for democratizing medicinal-cannabis education in Brazil.',
    excerptEs:
      'Homenaje documental al Padre Ticão (Antônio Luiz Marchioni, 1952–2021): párroco de Ermelino Matarazzo, líder popular de la zona este y fundador del MovReCam — mérito máximo en la democratización de la educación sobre cannabis medicinal en Brasil.',
    slug: 'inspecao-padre-ticao',
    date: inspected + 'T16:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Padre Ticão · legado',
    coverImage: ytThumb(refId),
    videoId: refId,
    sourceUrl: 'https://www.youtube.com/watch?v=' + refId,
    body: `## Escopo

Inspeção editorial e documental da **vida e do legado** do **Padre Ticão** — nome pelo qual ficou conhecido o sacerdote **Antônio Luiz Marchioni** (Urupês/SP, c. 1952 — São Paulo, 1 de janeiro de 2021). O objectivo não é biografia hagiográfica fechada: é registar, com fontes públicas e com o **mérito que lhe é devido**, o fio que liga décadas de luta popular na zona leste paulistana à criação do **MovReCam** e do curso de extensão UNIFESP sobre cannabis medicinal — projecto hoje citado como referência mundial de educação canábica democrática.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em reportagens (Folha, Estadão, Elástica/Abril, GQ), comunicados da [UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) e do acervo público do [canal MovReCam](https://www.youtube.com/@MovReCam). **Sem afiliação** com a Igreja Católica, a Diocese de São Miguel Paulista, a UNIFESP ou o MovReCam. Todo o mérito das obras, da paróquia e do movimento pertence a Ticão, às comunidades que o acompanharam e às instituições que deram continuidade ao projecto após 2021.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Antônio Luiz Marchioni** |
| Nome público | **Padre Ticão** |
| Nascimento | Urupês (SP), c. 1952 |
| Falecimento | 1 de janeiro de 2021, São Paulo — 68 anos |
| Ministério | Pároco da **Paróquia São Francisco de Assis**, Ermelino Matarazzo (zona leste de São Paulo), desde 1982 |
| Apelido carinhoso | «Trator de Deus» (Dom Angélico Sândalo Bernardino) |
| Movimento | Fundador / impulsor do **Movimento pela Regulamentação da Cannabis (MovReCam)** |
| Formação vinculada | Curso de extensão UNIFESP · uso terapêutico da *Cannabis sativa* L. (SIEX) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Nos canais inspecionados pelo laboratório — sobretudo o [MovReCam](/posts/post-inspecao-canal-movrecam.html) e a grade do [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) — o nome de Ticão aparece como **origem**, não como nota de rodapé. A professora Eliana Rodrigues, coordenadora do curso, afirmou publicamente que foi a **coragem do Padre Ticão e do professor Elisaldo Carlini** que criou o primeiro curso gratuito sobre cannabis medicinal na periferia de São Paulo e o transformou em referência mundial de democratização do conhecimento.

Omitir Ticão seria falhar o método BudGanja: **crédito a quem merece**.

## Hipóteses e método

- **H1:** a defesa da cannabis medicinal por Ticão não foi «moda» — foi continuidade de uma pastoral de saúde, moradia e dignidade na periferia.
- **H2:** o curso UNIFESP/MovReCam só se explica como projecto de **extensão nascida da demanda comunitária**, não como produto académico isolado.
- **H3:** o legado sobrevive no arquivo YouTube, no SIEX e nas edições seguintes do curso — inspecionar a vida é inspecionar a raiz do ecossistema que o site já documenta.
- **Método:** (1) cronologia pública da biografia; (2) obras sociais na zona leste; (3) passagem à cannabis medicinal e fundação do MovReCam; (4) cruzamento com vídeos oficiais e inspeções BudGanja; (5) status de mérito.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| Anos 1970 | Chega a São Paulo após apoiar greves de bóias-frias e professores na região de Araraquara; no interior era chamado de «comunista». |
| 1982 → | Torna-se pároco em Ermelino Matarazzo — quase quatro décadas na mesma comunidade. |
| Anos 1980 | Com fiéis, ocupa a Secretaria estadual da Habitação para pressionar o governo Montoro por conjuntos habitacionais. |
| Décadas seguintes | Lidera ou impulsiona Hospital de Ermelino Matarazzo, Parque Dom Paulo Evaristo Arns, Centro de Convivência para Melhor Idade, Centro de Recuperação de Crianças Deficientes; articula presença da USP Leste e da UNIFESP na zona leste. |
| ~2015–2018 | Aprofunda pesquisa em saúde preventiva/integrativa; contacta o legado científico de **Elisaldo Carlini** (UNIFESP/CEBRID) sobre cannabis. |
| 2018 → | Nasce o curso gratuito na periferia + transmissão MovReCam; cresce de centenas para milhares de participantes por edição. |
| 2019–2020 | Sofre ataques de sectores conservadores; mantém a bandeira do acesso terapêutico para famílias de baixa renda («direitos têm de ser para todos»). |
| 1 jan 2021 | Falece no Hospital Santa Marcelina após complicações respiratórias e parada cardíaca. |
| 2025 | O curso que ajudou a fundar recebe o **CannaPortugal Global Cannabis Awards** — a UNIFESP cita explicitamente a sua coragem na origem do projecto. |

## Achados (mérito devido)

1. **Pastoral da periferia antes da cannabis** — Ticão já era referência de moradia, saúde e educação popular décadas antes do CBD entrar no púlpito. A cannabis medicinal, no seu discurso, é **continuidade** da luta pelo SUS e pela dignidade, não ruptura.
2. **Coragem pública sob ataque** — assumir o MovReCam e o curso na paróquia atraiu rótulos pejorativos («maconheiro») e ameaças. Não desistiu. Isso é facto documentado por quem o acompanhou e por reportagens da época.
3. **Democratização do saber** — ao juntar fiéis, movimento social e universidade, criou o molde que ainda sustenta o maior projecto gratuito de educação canábica do país: sem mensalidade, sem vestibular, com arquivo aberto.
4. **Ética do acesso** — a máxima atribuída a Ticão («não sei se Deus é maconheiro… mas com certeza é canabista») resume uma teologia popular do cuidado: a planta como instrumento de alívio, não de escândalo. O mérito pedagógico é ligar fé, ciência e periferia sem pedir licença ao preconceito.
5. **Legado institucional vivo** — o [MovReCam](https://movrecam.org.br/), o [canal](https://www.youtube.com/@MovReCam), o [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info) e as homenagens no acervo YouTube prolongam a obra. Inspecionar canais e o curso sem nomear Ticão seria incompleto.

## Voz e memória no acervo MovReCam

Dois registos públicos merecem destaque nesta ficha:

**[O Curso do Padre Ticão: Conheça um pouco da nossa trajetória](https://www.youtube.com/watch?v=${TICAO_VIDEOS.trajetoria})**

@youtube ${TICAO_VIDEOS.trajetoria}

**[Homenagem ao Padre Ticão](https://www.youtube.com/watch?v=${TICAO_VIDEOS.homenagem})** (6ª aula — arquivo histórico)

@youtube ${TICAO_VIDEOS.homenagem}

## Complementaridade com o Inspetor BudGanja

| Tema Ticão / MovReCam | Recurso BudGanja |
|-----------------------|------------------|
| Curso que ajudou a fundar | [Inspeção: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Arquivo de aulas e advocacy | [Inspeção: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Vídeos · MovReCam](/videos/?channel=movrecam) |
| Divulgação científica UNIFESP (parceira do ecossistema) | [Inspeção: CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |
| Cultivo / métricas (fora do foco pastoral de Ticão) | [Calculadoras](/calculadoras/) · [Diário](/cultivo/) |

## Créditos e referências

**Todo o mérito da vida, da pastoral, do MovReCam e da coragem de abrir a periferia à educação canábica pertence ao Padre Ticão, às comunidades de Ermelino Matarazzo e a quem deu continuidade ao projecto.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [Folha — obituário (02/01/2021)](https://www1.folha.uol.com.br/cotidiano/2021/01/morre-padre-ticao-lider-de-movimentos-sociais-na-zona-leste-de-sp.shtml)
- [Estadão — obituário](https://www.estadao.com.br/brasil/morre-padre-ticao-lideranca-religiosa-e-social-na-zona-leste-aos-68-anos/)
- [Elástica/Abril — «Deus é canabista»](https://elastica.abril.com.br/especiais/padre-maconha-canabidiol-religiao/)
- [GQ — curso na paróquia (2020)](https://gq.globo.com/Corpo/Saude/noticia/2020/06/paroquia-em-sp-quer-acesso-da-cannabis-medicinal-para-todos-e-promove-curso-sobre-cbd-e-thc-pedido-pelos-fieis.html)
- [Portal UNIFESP — prémio CannaPortugal 2025](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [MovReCam](https://movrecam.org.br/) · [YouTube @MovReCam](https://www.youtube.com/@MovReCam)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como referência de legado** — Padre Ticão é pedra angular da história que liga periferia, universidade e regulamentação responsável da cannabis medicinal no Brasil. Quem estuda pelo [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) ou pelo [arquivo MovReCam](/videos/?channel=movrecam) estuda, em última análise, o fruto do seu trabalho. Descanse em paz — e que o crédito continue público.

[▶ Trajetória no YouTube](https://www.youtube.com/watch?v=${TICAO_VIDEOS.trajetoria}) · [▶ Homenagem](https://www.youtube.com/watch?v=${TICAO_VIDEOS.homenagem}) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas as inspeções](/biblioteca/inspecoes/)`
  });
}

const PESSOAS_INSPECOES_POSTS = [buildPadreTicaoInspecaoPost()];

module.exports = {
  PESSOAS_INSPECOES_POSTS,
  buildPadreTicaoInspecaoPost,
  TICAO_VIDEOS
};
