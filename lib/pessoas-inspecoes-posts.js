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
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

function buildPadreTicaoBodies(inspected) {
  const vTraj = TICAO_VIDEOS.trajetoria;
  const vHom = TICAO_VIDEOS.homenagem;

  const body = `## Escopo

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

**[O Curso do Padre Ticão: Conheça um pouco da nossa trajetória](https://www.youtube.com/watch?v=${vTraj})**

@youtube ${vTraj}

**[Homenagem ao Padre Ticão](https://www.youtube.com/watch?v=${vHom})** (6ª aula — arquivo histórico)

@youtube ${vHom}

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

[▶ Trajetória no YouTube](https://www.youtube.com/watch?v=${vTraj}) · [▶ Homenagem](https://www.youtube.com/watch?v=${vHom}) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the **life and legacy** of **Father Ticão** — the name by which priest **Antônio Luiz Marchioni** became known (Urupês/SP, c. 1952 — São Paulo, 1 January 2021). This is not a closed hagiography: it records, from public sources and with the **credit he is due**, the thread that links decades of popular struggle in São Paulo’s East Zone to the founding of **MovReCam** and UNIFESP’s extension course on medicinal cannabis — a project now cited as a global benchmark for democratic cannabis education.

> **Methodological note:** independent audit by Inspector BudGanja based on press reports (Folha, Estadão, Elástica/Abril, GQ), [UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) statements, and the public archive of the [MovReCam channel](https://www.youtube.com/@MovReCam). **No affiliation** with the Catholic Church, the Diocese of São Miguel Paulista, UNIFESP, or MovReCam. All credit for the works, the parish, and the movement belongs to Ticão, the communities that stood with him, and the institutions that continued the project after 2021.

## Inspected subject

| Field | Value |
|-------|-------|
| Legal name | **Antônio Luiz Marchioni** |
| Public name | **Father Ticão** (Padre Ticão) |
| Birth | Urupês (SP), c. 1952 |
| Death | 1 January 2021, São Paulo — age 68 |
| Ministry | Parish priest of **São Francisco de Assis Parish**, Ermelino Matarazzo (East Zone of São Paulo), since 1982 |
| Affectionate nickname | “God’s bulldozer” (Dom Angélico Sândalo Bernardino) |
| Movement | Founder / driving force of the **Movement for Cannabis Regulation (MovReCam)** |
| Linked education | UNIFESP extension course · therapeutic use of *Cannabis sativa* L. (SIEX) |
| Inspection date | ${inspected} |

## Why this inspection exists

On the channels audited by the lab — especially [MovReCam](/posts/post-inspecao-canal-movrecam.html) and the [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) syllabus — Ticão’s name appears as **origin**, not as a footnote. Course coordinator Prof. Eliana Rodrigues has stated publicly that it was the **courage of Father Ticão and Prof. Elisaldo Carlini** that created the first free medicinal-cannabis course on São Paulo’s periphery and turned it into a global reference for democratizing knowledge.

Leaving Ticão out would fail the BudGanja method: **credit where credit is due**.

## Hypotheses and method

- **H1:** Ticão’s defense of medicinal cannabis was not a fad — it continued a pastoral of health, housing, and dignity on the periphery.
- **H2:** The UNIFESP/MovReCam course only makes sense as **extension born from community demand**, not as an isolated academic product.
- **H3:** The legacy lives on in the YouTube archive, SIEX, and later editions of the course — inspecting his life is inspecting the root of the ecosystem this site already documents.
- **Method:** (1) public biographical timeline; (2) East Zone social works; (3) turn to medicinal cannabis and founding of MovReCam; (4) cross-check with official videos and BudGanja inspections; (5) merit status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 1970s | Arrives in São Paulo after supporting farmworker and teacher strikes around Araraquara; in the countryside he was called a “communist.” |
| 1982 → | Becomes parish priest in Ermelino Matarazzo — nearly four decades in the same community. |
| 1980s | With parishioners, occupies the state Housing Secretariat to press the Montoro government for public housing. |
| Following decades | Leads or drives Ermelino Matarazzo Hospital, Dom Paulo Evaristo Arns Park, a senior living center, a rehabilitation center for children with disabilities; helps bring USP Leste and UNIFESP to the East Zone. |
| ~2015–2018 | Deepens work on preventive/integrative health; engages the scientific legacy of **Elisaldo Carlini** (UNIFESP/CEBRID) on cannabis. |
| 2018 → | The free periphery course + MovReCam broadcasts begin; attendance grows from hundreds to thousands per edition. |
| 2019–2020 | Faces attacks from conservative sectors; keeps the banner of therapeutic access for low-income families (“rights must be for everyone”). |
| 1 Jan 2021 | Dies at Santa Marcelina Hospital after respiratory complications and cardiac arrest. |
| 2025 | The course he helped found receives the **CannaPortugal Global Cannabis Awards** — UNIFESP explicitly cites his courage at the project’s origin. |

## Findings (credit due)

1. **Periphery pastoral before cannabis** — Ticão was already a reference for housing, health, and popular education decades before CBD entered the pulpit. In his discourse, medicinal cannabis is a **continuation** of the fight for the public health system and dignity, not a rupture.
2. **Public courage under attack** — taking on MovReCam and the parish course drew pejorative labels (“pot priest”) and threats. He did not quit. That is documented by those who walked with him and by contemporary reporting.
3. **Democratizing knowledge** — by joining parishioners, social movement, and university, he shaped the mold that still sustains the country’s largest free cannabis-education project: no tuition, no entrance exam, open archive.
4. **Ethics of access** — the line attributed to Ticão (“I don’t know if God is a pot smoker… but he is certainly a cannabist”) sums up a popular theology of care: the plant as an instrument of relief, not scandal. The pedagogical merit is linking faith, science, and the periphery without asking prejudice for permission.
5. **Living institutional legacy** — [MovReCam](https://movrecam.org.br/), the [channel](https://www.youtube.com/@MovReCam), [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info), and YouTube tributes carry the work forward. Inspecting channels and the course without naming Ticão would be incomplete.

## Voice and memory in the MovReCam archive

Two public records deserve emphasis on this sheet:

**[Father Ticão’s Course: A bit of our journey](https://www.youtube.com/watch?v=${vTraj})**

@youtube ${vTraj}

**[Tribute to Father Ticão](https://www.youtube.com/watch?v=${vHom})** (6th lecture — historical archive)

@youtube ${vHom}

## Complementarity with Inspector BudGanja

| Ticão / MovReCam theme | BudGanja resource |
|------------------------|-------------------|
| Course he helped found | [Inspection: UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Lecture and advocacy archive | [Inspection: MovReCam channel](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| UNIFESP science outreach (ecosystem partner) | [Inspection: CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Academic hub | [UNIFESP library](/biblioteca/unifesp/) |
| Cultivation / metrics (outside Ticão’s pastoral focus) | [Calculators](/calculadoras/) · [Diary](/cultivo/) |

## Credits and references

**All credit for the life, the pastoral work, MovReCam, and the courage to open the periphery to cannabis education belongs to Father Ticão, the communities of Ermelino Matarazzo, and those who continued the project.** This inspection only documents and recommends — without appropriation.

Sources consulted (non-exhaustive):

- [Folha — obituary (02/01/2021)](https://www1.folha.uol.com.br/cotidiano/2021/01/morre-padre-ticao-lider-de-movimentos-sociais-na-zona-leste-de-sp.shtml)
- [Estadão — obituary](https://www.estadao.com.br/brasil/morre-padre-ticao-lideranca-religiosa-e-social-na-zona-leste-aos-68-anos/)
- [Elástica/Abril — “God is a cannabist”](https://elastica.abril.com.br/especiais/padre-maconha-canabidiol-religiao/)
- [GQ — parish course (2020)](https://gq.globo.com/Corpo/Saude/noticia/2020/06/paroquia-em-sp-quer-acesso-da-cannabis-medicinal-para-todos-e-promove-curso-sobre-cbd-e-thc-pedido-pelos-fieis.html)
- [UNIFESP portal — CannaPortugal 2025 award](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [MovReCam](https://movrecam.org.br/) · [YouTube @MovReCam](https://www.youtube.com/@MovReCam)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with maximum merit as a legacy reference** — Father Ticão is a cornerstone of the story linking periphery, university, and responsible regulation of medicinal cannabis in Brazil. Anyone studying via the [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) or the [MovReCam archive](/videos/?channel=movrecam) is, ultimately, studying the fruit of his work. Rest in peace — and may the credit remain public.

[▶ Journey on YouTube](https://www.youtube.com/watch?v=${vTraj}) · [▶ Tribute](https://www.youtube.com/watch?v=${vHom}) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam channel](/posts/post-inspecao-canal-movrecam.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental de la **vida y el legado** del **Padre Ticão** — nombre con el que se conoció al sacerdote **Antônio Luiz Marchioni** (Urupês/SP, c. 1952 — São Paulo, 1 de enero de 2021). El objetivo no es una hagiografía cerrada: es registrar, con fuentes públicas y con el **mérito que le corresponde**, el hilo que une décadas de lucha popular en la zona este paulista a la creación del **MovReCam** y del curso de extensión UNIFESP sobre cannabis medicinal — proyecto hoy citado como referencia mundial de educación canábica democrática.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en reportajes (Folha, Estadão, Elástica/Abril, GQ), comunicados de la [UNIFESP](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional) y el archivo público del [canal MovReCam](https://www.youtube.com/@MovReCam). **Sin afiliación** con la Iglesia Católica, la Diócesis de São Miguel Paulista, la UNIFESP o el MovReCam. Todo el mérito de las obras, de la parroquia y del movimiento pertenece a Ticão, a las comunidades que lo acompañaron y a las instituciones que dieron continuidad al proyecto después de 2021.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre civil | **Antônio Luiz Marchioni** |
| Nombre público | **Padre Ticão** |
| Nacimiento | Urupês (SP), c. 1952 |
| Fallecimiento | 1 de enero de 2021, São Paulo — 68 años |
| Ministerio | Párroco de la **Parroquia São Francisco de Assis**, Ermelino Matarazzo (zona este de São Paulo), desde 1982 |
| Apodo afectuoso | «Tractor de Dios» (Dom Angélico Sândalo Bernardino) |
| Movimiento | Fundador / impulsor del **Movimiento por la Regulación del Cannabis (MovReCam)** |
| Formación vinculada | Curso de extensión UNIFESP · uso terapéutico de *Cannabis sativa* L. (SIEX) |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

En los canales inspeccionados por el laboratorio —sobre todo [MovReCam](/posts/post-inspecao-canal-movrecam.html) y la malla del [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)— el nombre de Ticão aparece como **origen**, no como nota a pie. La profesora Eliana Rodrigues, coordinadora del curso, afirmó públicamente que fue la **valentía del Padre Ticão y del profesor Elisaldo Carlini** la que creó el primer curso gratuito sobre cannabis medicinal en la periferia de São Paulo y lo transformó en referencia mundial de democratización del conocimiento.

Omitir a Ticão sería fallar el método BudGanja: **crédito a quien lo merece**.

## Hipótesis y método

- **H1:** la defensa de la cannabis medicinal por Ticão no fue «moda» — fue continuidad de una pastoral de salud, vivienda y dignidad en la periferia.
- **H2:** el curso UNIFESP/MovReCam solo se explica como proyecto de **extensión nacida de la demanda comunitaria**, no como producto académico aislado.
- **H3:** el legado sobrevive en el archivo de YouTube, en el SIEX y en las ediciones siguientes del curso — inspeccionar la vida es inspeccionar la raíz del ecosistema que el sitio ya documenta.
- **Método:** (1) cronología pública de la biografía; (2) obras sociales en la zona este; (3) paso a la cannabis medicinal y fundación del MovReCam; (4) cruce con videos oficiales e inspecciones BudGanja; (5) estatus de mérito.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| Años 1970 | Llega a São Paulo tras apoyar huelgas de jornaleros y profesores en la región de Araraquara; en el interior lo llamaban «comunista». |
| 1982 → | Se convierte en párroco en Ermelino Matarazzo — casi cuatro décadas en la misma comunidad. |
| Años 1980 | Con fieles, ocupa la Secretaría estatal de Habitación para presionar al gobierno Montoro por conjuntos habitacionales. |
| Décadas siguientes | Lidera o impulsa el Hospital de Ermelino Matarazzo, el Parque Dom Paulo Evaristo Arns, el Centro de Convivencia para la Mejor Edad, el Centro de Recuperación de Niños con Discapacidad; articula la presencia de USP Leste y UNIFESP en la zona este. |
| ~2015–2018 | Profundiza la investigación en salud preventiva/integrativa; contacta el legado científico de **Elisaldo Carlini** (UNIFESP/CEBRID) sobre cannabis. |
| 2018 → | Nace el curso gratuito en la periferia + transmisión MovReCam; crece de cientos a miles de participantes por edición. |
| 2019–2020 | Sufre ataques de sectores conservadores; mantiene la bandera del acceso terapéutico para familias de bajos ingresos («los derechos tienen que ser para todos»). |
| 1 ene 2021 | Fallece en el Hospital Santa Marcelina tras complicaciones respiratorias y paro cardíaco. |
| 2025 | El curso que ayudó a fundar recibe los **CannaPortugal Global Cannabis Awards** — la UNIFESP cita explícitamente su valentía en el origen del proyecto. |

## Hallazgos (mérito debido)

1. **Pastoral de la periferia antes del cannabis** — Ticão ya era referencia de vivienda, salud y educación popular décadas antes de que el CBD entrara al púlpito. En su discurso, la cannabis medicinal es **continuidad** de la lucha por el SUS y la dignidad, no ruptura.
2. **Valentía pública bajo ataque** — asumir el MovReCam y el curso en la parroquia atrajo rótulos peyorativos («marihuanero») y amenazas. No desistió. Es un hecho documentado por quienes lo acompañaron y por reportajes de la época.
3. **Democratización del saber** — al unir fieles, movimiento social y universidad, creó el molde que aún sostiene el mayor proyecto gratuito de educación canábica del país: sin matrícula, sin examen de ingreso, con archivo abierto.
4. **Ética del acceso** — la máxima atribuida a Ticão («no sé si Dios es marihuanero… pero con certeza es cannabista») resume una teología popular del cuidado: la planta como instrumento de alivio, no de escándalo. El mérito pedagógico es unir fe, ciencia y periferia sin pedir permiso al prejuicio.
5. **Legado institucional vivo** — el [MovReCam](https://movrecam.org.br/), el [canal](https://www.youtube.com/@MovReCam), el [SIEX 30063](https://siex.siiu.unifesp.br/catalogo-siex/30063/mais-info) y los homenajes en YouTube prolongan la obra. Inspeccionar canales y el curso sin nombrar a Ticão sería incompleto.

## Voz y memoria en el acervo MovReCam

Dos registros públicos merecen destaque en esta ficha:

**[El curso del Padre Ticão: conoce un poco de nuestra trayectoria](https://www.youtube.com/watch?v=${vTraj})**

@youtube ${vTraj}

**[Homenaje al Padre Ticão](https://www.youtube.com/watch?v=${vHom})** (6.ª clase — archivo histórico)

@youtube ${vHom}

## Complementariedad con el Inspector BudGanja

| Tema Ticão / MovReCam | Recurso BudGanja |
|-----------------------|------------------|
| Curso que ayudó a fundar | [Inspección: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Archivo de clases y advocacy | [Inspección: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| Divulgación científica UNIFESP (socia del ecosistema) | [Inspección: CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |
| Cultivo / métricas (fuera del foco pastoral de Ticão) | [Calculadoras](/calculadoras/) · [Diario](/cultivo/) |

## Créditos y referencias

**Todo el mérito de la vida, de la pastoral, del MovReCam y de la valentía de abrir la periferia a la educación canábica pertenece al Padre Ticão, a las comunidades de Ermelino Matarazzo y a quienes dieron continuidad al proyecto.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [Folha — obituario (02/01/2021)](https://www1.folha.uol.com.br/cotidiano/2021/01/morre-padre-ticao-lider-de-movimentos-sociais-na-zona-leste-de-sp.shtml)
- [Estadão — obituario](https://www.estadao.com.br/brasil/morre-padre-ticao-lideranca-religiosa-e-social-na-zona-leste-aos-68-anos/)
- [Elástica/Abril — «Dios es cannabista»](https://elastica.abril.com.br/especiais/padre-maconha-canabidiol-religiao/)
- [GQ — curso en la parroquia (2020)](https://gq.globo.com/Corpo/Saude/noticia/2020/06/paroquia-em-sp-quer-acesso-da-cannabis-medicinal-para-todos-e-promove-curso-sobre-cbd-e-thc-pedido-pelos-fieis.html)
- [Portal UNIFESP — premio CannaPortugal 2025](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [MovReCam](https://movrecam.org.br/) · [YouTube @MovReCam](https://www.youtube.com/@MovReCam)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito máximo como referencia de legado** — el Padre Ticão es piedra angular de la historia que une periferia, universidad y regulación responsable de la cannabis medicinal en Brasil. Quien estudia por el [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) o por el [archivo MovReCam](/videos/?channel=movrecam) estudia, en última instancia, el fruto de su trabajo. Descanse en paz — y que el crédito siga siendo público.

[▶ Trayectoria en YouTube](https://www.youtube.com/watch?v=${vTraj}) · [▶ Homenaje](https://www.youtube.com/watch?v=${vHom}) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildPadreTicaoInspecaoPost() {
  const inspected = '2026-07-31';
  const refId = TICAO_VIDEOS.trajetoria;
  const { body, contentEn, contentEs } = buildPadreTicaoBodies(inspected);

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
    body,
    contentEn,
    contentEs
  });
}

const PESSOAS_INSPECOES_POSTS = [buildPadreTicaoInspecaoPost()];

module.exports = {
  PESSOAS_INSPECOES_POSTS,
  buildPadreTicaoInspecaoPost,
  buildPadreTicaoBodies,
  TICAO_VIDEOS
};
