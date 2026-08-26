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

Nos canais inspecionados pelo laboratório — sobretudo o [MovReCam](/posts/post-inspecao-canal-movrecam.html) e a grade do [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) — o nome de Ticão aparece como **origem**, não como nota de rodapé. A professora Eliana Rodrigues, coordenadora do curso, afirmou publicamente que foi a **coragem do Padre Ticão e do [professor Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html)** que criou o primeiro curso gratuito sobre cannabis medicinal na periferia de São Paulo e o transformou em referência mundial de democratização do conhecimento.

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
| ~2015–2018 | Aprofunda pesquisa em saúde preventiva/integrativa; contacta o legado científico de [**Elisaldo Carlini**](/posts/post-inspecao-elisaldo-carlini.html) (UNIFESP/CEBRID) sobre cannabis. |
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
| Arquivo de aulas e advocacy | [Inspeção: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Vídeos · Padre Ticão](/videos/?channel=movrecam&series=padre-ticao) |
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

On the channels audited by the lab — especially [MovReCam](/posts/post-inspecao-canal-movrecam.html) and the [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) syllabus — Ticão’s name appears as **origin**, not as a footnote. Course coordinator Prof. Eliana Rodrigues has stated publicly that it was the **courage of Father Ticão and [Prof. Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html)** that created the first free medicinal-cannabis course on São Paulo’s periphery and turned it into a global reference for democratizing knowledge.

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
| ~2015–2018 | Deepens work on preventive/integrative health; engages the scientific legacy of [**Elisaldo Carlini**](/posts/post-inspecao-elisaldo-carlini.html) (UNIFESP/CEBRID) on cannabis. |
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

En los canales inspeccionados por el laboratorio —sobre todo [MovReCam](/posts/post-inspecao-canal-movrecam.html) y la malla del [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)— el nombre de Ticão aparece como **origen**, no como nota a pie. La profesora Eliana Rodrigues, coordinadora del curso, afirmó públicamente que fue la **valentía del Padre Ticão y del [profesor Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html)** la que creó el primer curso gratuito sobre cannabis medicinal en la periferia de São Paulo y lo transformó en referencia mundial de democratización del conocimiento.

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
| ~2015–2018 | Profundiza la investigación en salud preventiva/integrativa; contacta el legado científico de [**Elisaldo Carlini**](/posts/post-inspecao-elisaldo-carlini.html) (UNIFESP/CEBRID) sobre cannabis. |
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

function buildElisaldoCarliniBodies(inspected) {
  const portrait = '/imagens/inspecoes/elisaldo-carlini-cover.jpg';
  const portraitCredit =
    'Retrato do Prof. Emérito Elisaldo Luiz de Araújo Carlini. Imagem: [Pesquisa FAPESP](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/) (crédito da publicação original).';

  const body = `## Escopo

Inspeção editorial e documental da **vida e do legado científico** do **Prof. Emérito Elisaldo Luiz de Araújo Carlini** (Ribeirão Preto/SP, 9 de junho de 1930 — São Paulo, 16 de setembro de 2020). Médico, farmacologista e psicofarmacologista, Carlini é o marco ético e histórico da pesquisa canábica brasileira. O recorte desta ficha são três eixos: a **raiz científica** da cannabis medicinal no Brasil; a **fundação e o legado do [CEBRID](/posts/post-inspecao-cebrid.html)**; e a **dedicatória científica** do [CANABinALL](/posts/post-inspecao-canal-canabinall.html). O objectivo é registar, com fontes públicas e com o **mérito que lhe é devido**, o fio que liga a Escola Paulista de Medicina, o centro que fundou, a vigilância sanitária e a luta pelo uso medicinal da cannabis no Brasil.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em biografias institucionais (UNIFESP, CNPq), entrevistas e reportagens (*Pesquisa FAPESP*, Wikipedia) e cruzamento com as inspeções do [CEBRID](/posts/post-inspecao-cebrid.html), do [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), do [Padre Ticão](/posts/post-inspecao-padre-ticao.html) e do [CANABinALL](/posts/post-inspecao-canal-canabinall.html). **Sem afiliação** com a UNIFESP, o CEBRID, a ANVISA ou a família Carlini. Todo o mérito da obra científica e da militância pelo acesso terapêutico pertence a Carlini, às suas equipes e às instituições que continuam o legado.

![Prof. Elisaldo Carlini](${portrait})

*${portraitCredit}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Elisaldo Luiz de Araújo Carlini** |
| Nascimento | 9 de junho de 1930, Ribeirão Preto (SP) |
| Falecimento | 16 de setembro de 2020, São Paulo — 90 anos |
| Formação | Medicina, Escola Paulista de Medicina (UNIFESP), turma 1957 · mestrado em psicofarmacologia, Yale University (anos 1960) |
| Instituição | Professor emérito da **UNIFESP** · fundador do Departamento de Psicobiologia (EPM) |
| Centro | Fundador / diretor científico do **[CEBRID](/posts/post-inspecao-cebrid.html)** (Centro Brasileiro de Informações sobre Drogas Psicotrópicas) |
| Marcos públicos | Presidência da Secretaria Nacional de Vigilância Sanitária (antecessora da ANVISA, 1995–1997) · painéis OMS / INCB |
| Produção | Centenas de artigos e livros; dezenas de orientações de mestrado e doutorado |
| Ecossistema BudGanja | Origem científica do curso UNIFESP/MovReCam · dedicatória do CANABinALL |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Nos canais e na formação já inspecionados pelo laboratório, Carlini não é detalhe: é **raiz**. A Profa. Eliana Rodrigues atribui a criação do primeiro curso gratuito de cannabis medicinal na periferia à **coragem do Padre Ticão e do professor Elisaldo Carlini**. O CANABinALL é **dedicado** ao Prof. Emérito. Omitir Carlini seria falhar o método BudGanja: **crédito a quem merece** — no caso, ao cientista que sustentou com evidência o que o movimento popular tornou acesso.

## Hipóteses e método

- **H1:** o pioneirismo de Carlini na farmacologia da cannabis no Brasil antecede e fundamenta o ciclo pastoral/comunitário do MovReCam.
- **H2:** [CEBRID](/posts/post-inspecao-cebrid.html) + levantamentos nacionais + presença em OMS/INCB/ANVISA mostram um cientista que ligou bancada, política pública e redução de danos.
- **H3:** o legado sobrevive no próprio [CEBRID](/posts/post-inspecao-cebrid.html) (continuidade [Nappo](/posts/post-inspecao-solange-nappo.html)), na UNIFESP (orientação, Diadema/ICAQF, curso de extensão) e na curadoria científica do [CANABinALL](/posts/post-inspecao-canal-canabinall.html).
- **Método:** (1) cronologia pública da biografia; (2) contribuições científicas e institucionais; (3) papel na cannabis medicinal e na regulamentação; (4) cruzamento com inspeções BudGanja; (5) status de mérito.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1930 | Nasce em Ribeirão Preto; infância/estudos iniciais em Piraju (escola rural). |
| ~1945 | Muda-se para São Paulo; trabalha e estuda à noite (Caetano de Campos). |
| 1952–1957 | Ingressa e forma-se na Escola Paulista de Medicina; estágio precoce em farmacologia (José Ribeiro do Valle, José Leal Prado). |
| ~1960–1964 | Bolsa Rockefeller / formação nos EUA; mestrado em psicofarmacologia em **Yale**. |
| 1970 → | Retorna à EPM; cria o sector de Psicofarmacologia, depois Departamento de Psicobiologia; impulsiona a pós-graduação na área. |
| Décadas seguintes | Pesquisa plantas brasileiras com acção no SNC; estudos sobre cannabis/canabidiol; colaboração intelectual no eixo Mechoulam–cannabinoides. |
| 1990 | Participa da criação da SOBRAVIME (vigilância de medicamentos). |
| 1995–1997 | Preside a Secretaria Nacional de Vigilância Sanitária (pré-ANVISA). |
| 1997 → | Consolida o **[CEBRID](/posts/post-inspecao-cebrid.html)** na UNIFESP — informação e levantamentos sobre álcool e outras drogas para políticas públicas. |
| Mandatos internacionais | Painel de especialistas da OMS sobre dependência; múltiplos mandatos no **INCB** (ONU). |
| 2010s | Apoio científico e ético ao debate do uso medicinal; ligação com famílias, associações e, depois, com a demanda que vira curso UNIFESP/MovReCam. |
| 2019–2020 | Continua a planear e falar sobre terapêutica canábica (ex.: simpósio CEBRID); falece em 16/09/2020. |
| Pós-2020 | Nome evocado em homenagens legislativas (ex. pedidos ligados ao PL 399/2015), no prémio internacional do curso UNIFESP (2025) e na dedicatória do CANABinALL. |

## Achados (mérito devido)

1. **Pioneiro da farmacologia da cannabis no Brasil** — da orientação de Ribeiro do Valle à linha própria sobre THC/CBD e sistema nervoso, Carlini colocou o país no mapa científico da planta quando o tema era tabu académico e político.
2. **Instituições que ficaram** — Psicobiologia na EPM/UNIFESP, [CEBRID](/posts/post-inspecao-cebrid.html), contribuições à vigilância sanitária e à formação de gerações de pesquisadores. O mérito não é só um paper: é infraestrutura de conhecimento.
3. **Ciência ao serviço da política pública** — levantamentos nacionais, SENAD, OMS, INCB: Carlini traduziu evidência em linguagem de Estado, sem abandonar a bancada.
4. **Elo com a periferia e o MovReCam** — quando o [Padre Ticão](/posts/post-inspecao-padre-ticao.html) busca ciência para a pastoral da zona leste, encontra Carlini. O curso gratuito na periferia é filho desse encontro entre **método** e **demanda comunitária**.
5. **Ética da continuidade** — [CANABinALL](/posts/post-inspecao-canal-canabinall.html) (canal **dedicado** ao Prof. Emérito), curso SIEX e arquivo MovReCam prolongam o seu nome. Inspecionar esses projectos sem nomear Carlini seria incompleto.

## Complementaridade com o Inspetor BudGanja

| Tema Carlini | Recurso BudGanja |
|--------------|------------------|
| Casa científica que fundou | [Inspeção: CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Curso que ajudou a fundar (com Ticão) | [Inspeção: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Parceiro pastoral / origem comunitária | [Inspeção: Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Arquivo de aulas | [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Vídeos · MovReCam](/videos/?channel=movrecam) |
| Canal dedicado a Carlini | [Inspeção: CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Vídeos · CANABinALL](/videos/?channel=canabinall) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos e referências

**Todo o mérito da vida científica, da formação de pesquisadores, do CEBRID e da coragem de defender a cannabis medicinal com evidência pertence ao Prof. Elisaldo Carlini, às suas equipas e às instituições que mantêm o legado.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [UNIFESP — Ciência e Cientistas: Elisaldo Carlini](https://cienciaecientistas.unifesp.br/cientistas-unifesp/elisaldo-luiz-de-araujo-carlini)
- [CNPq — nota de falecimento](https://www.gov.br/cnpq/pt-br/assuntos/noticias/destaque-em-cti/cnpq-lamenta-falecimento-do-prof-carlini)
- [Pesquisa FAPESP — «O uso medicinal da maconha»](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/)
- [Pesquisa FAPESP — «The pharmacy of plants»](https://revistapesquisa.fapesp.br/en/the-pharmacy-of-plants/)
- [Wikipedia — Elisaldo Carlini](https://pt.wikipedia.org/wiki/Elisaldo_Carlini)
- [Portal UNIFESP — prémio do curso (cita Ticão e Carlini)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CEBRID — site oficial](https://www.cebrid.com.br/)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito máximo como referência de legado científico** — Elisaldo Carlini é pedra angular da história que liga farmacologia, universidade pública e regulamentação responsável da cannabis medicinal no Brasil. Quem estuda pelo [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), pelo [CEBRID](/posts/post-inspecao-cebrid.html) ou pelo [CANABinALL](/posts/post-inspecao-canal-canabinall.html) estuda, em última análise, o fruto do seu trabalho. Descanse em paz — e que o crédito continue público.

[CEBRID](/posts/post-inspecao-cebrid.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the **life and scientific legacy** of **Professor Emeritus Elisaldo Luiz de Araújo Carlini** (Ribeirão Preto/SP, 9 June 1930 — São Paulo, 16 September 2020). Physician, pharmacologist, and psychopharmacologist, Carlini is the ethical and historical landmark of Brazilian cannabis research. This sheet has three axes: the **scientific root** of medicinal cannabis in Brazil; the **founding and legacy of [CEBRID](/posts/post-inspecao-cebrid.html)**; and the **scientific dedication** of [CANABinALL](/posts/post-inspecao-canal-canabinall.html). The aim is to record, from public sources and with the **credit he is due**, the thread linking the São Paulo School of Medicine, the center he founded, sanitary surveillance, and the fight for medicinal cannabis in Brazil.

> **Methodological note:** independent audit by Inspector BudGanja based on institutional biographies (UNIFESP, CNPq), interviews and reporting (*Pesquisa FAPESP*, Wikipedia), and cross-checks with the [CEBRID](/posts/post-inspecao-cebrid.html), [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), [Father Ticão](/posts/post-inspecao-padre-ticao.html), and [CANABinALL](/posts/post-inspecao-canal-canabinall.html) inspections. **No affiliation** with UNIFESP, CEBRID, ANVISA, or the Carlini family. All credit for the scientific work and advocacy for therapeutic access belongs to Carlini, his teams, and the institutions that continue the legacy.

![Prof. Elisaldo Carlini](${portrait})

*Portrait of Professor Emeritus Elisaldo Luiz de Araújo Carlini. Image: [Pesquisa FAPESP](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/) (credit from the original publication).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Elisaldo Luiz de Araújo Carlini** |
| Birth | 9 June 1930, Ribeirão Preto (SP) |
| Death | 16 September 2020, São Paulo — age 90 |
| Education | Medicine, São Paulo School of Medicine (UNIFESP), class of 1957 · M.Sc. psychopharmacology, Yale University (1960s) |
| Institution | Professor emeritus at **UNIFESP** · founder of the Department of Psychobiology (EPM) |
| Center | Founder / scientific director of **[CEBRID](/posts/post-inspecao-cebrid.html)** (Brazilian Center of Information on Psychotropic Drugs) |
| Public roles | Head of the National Sanitary Surveillance Secretariat (ANVISA’s predecessor, 1995–1997) · WHO / INCB panels |
| Output | Hundreds of papers and books; dozens of master’s and doctoral supervisees |
| BudGanja ecosystem | Scientific origin of the UNIFESP/MovReCam course · CANABinALL dedication |
| Inspection date | ${inspected} |

## Why this inspection exists

On the channels and training already audited by the lab, Carlini is not a detail: he is a **root**. Prof. Eliana Rodrigues attributes the first free medicinal-cannabis course on the periphery to the **courage of Father Ticão and Professor Elisaldo Carlini**. CANABinALL is **dedicated** to the Professor Emeritus. Leaving Carlini out would fail the BudGanja method: **credit where credit is due** — here, to the scientist who backed with evidence what the popular movement turned into access.

## Hypotheses and method

- **H1:** Carlini’s pioneering cannabis pharmacology in Brazil precedes and grounds MovReCam’s pastoral/community cycle.
- **H2:** [CEBRID](/posts/post-inspecao-cebrid.html) + national surveys + WHO/INCB/ANVISA roles show a scientist who linked bench, public policy, and harm reduction.
- **H3:** The legacy lives on at [CEBRID](/posts/post-inspecao-cebrid.html) itself (continuity under [Nappo](/posts/post-inspecao-solange-nappo.html)), at UNIFESP (supervision, Diadema/ICAQF, extension course), and in [CANABinALL](/posts/post-inspecao-canal-canabinall.html)’s scientific curation.
- **Method:** (1) public biographical timeline; (2) scientific and institutional contributions; (3) role in medicinal cannabis and regulation; (4) cross-check with BudGanja inspections; (5) merit status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 1930 | Born in Ribeirão Preto; early schooling in Piraju (rural school). |
| ~1945 | Moves to São Paulo; works while studying at night. |
| 1952–1957 | Enters and graduates from the São Paulo School of Medicine; early pharmacology apprenticeship. |
| ~1960–1964 | Rockefeller fellowship / U.S. training; psychopharmacology master’s at **Yale**. |
| 1970 → | Returns to EPM; creates Psychopharmacology, then the Department of Psychobiology; builds graduate training. |
| Following decades | Research on Brazilian CNS-active plants; cannabis/cannabidiol studies; intellectual links on the Mechoulam–cannabinoid axis. |
| 1990 | Helps found SOBRAVIME (medicines surveillance). |
| 1995–1997 | Heads the National Sanitary Surveillance Secretariat (pre-ANVISA). |
| 1997 → | Consolidates **[CEBRID](/posts/post-inspecao-cebrid.html)** at UNIFESP — information and surveys on alcohol and other drugs for public policy. |
| International mandates | WHO expert panel on dependence; multiple **INCB** (UN) terms. |
| 2010s | Scientific and ethical support for medicinal-use debates; ties to families, associations, and the demand that becomes the UNIFESP/MovReCam course. |
| 2019–2020 | Continues planning and speaking on cannabinoid therapeutics; dies on 16/09/2020. |
| After 2020 | Name evoked in legislative tributes, the UNIFESP course’s international award (2025), and the CANABinALL dedication. |

## Findings (credit due)

1. **Pioneer of cannabis pharmacology in Brazil** — from Ribeiro do Valle’s mentorship to his own THC/CBD and CNS line, Carlini put the country on the scientific map of the plant when the topic was academic and political taboo.
2. **Institutions that remain** — Psychobiology at EPM/UNIFESP, [CEBRID](/posts/post-inspecao-cebrid.html), sanitary-surveillance contributions, and generations of researchers. The merit is not one paper: it is knowledge infrastructure.
3. **Science for public policy** — national surveys, SENAD, WHO, INCB: Carlini translated evidence into state language without leaving the bench.
4. **Link to the periphery and MovReCam** — when [Father Ticão](/posts/post-inspecao-padre-ticao.html) seeks science for East Zone pastoral work, he finds Carlini. The free periphery course is the child of that meeting between **method** and **community demand**.
5. **Ethics of continuity** — [CANABinALL](/posts/post-inspecao-canal-canabinall.html) (the channel **dedicated** to the Professor Emeritus), the SIEX course, and the MovReCam archive carry his name forward. Inspecting those projects without naming Carlini would be incomplete.

## Complementarity with Inspector BudGanja

| Carlini theme | BudGanja resource |
|---------------|-------------------|
| Scientific house he founded | [Inspection: CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Course he helped found (with Ticão) | [Inspection: UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Pastoral partner / community origin | [Inspection: Father Ticão](/posts/post-inspecao-padre-ticao.html) |
| Lecture archive | [MovReCam channel](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| Channel dedicated to Carlini | [Inspection: CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Videos · CANABinALL](/videos/?channel=canabinall) |
| Academic hub | [UNIFESP library](/biblioteca/unifesp/) |

## Credits and references

**All credit for the scientific life, researcher training, CEBRID, and the courage to defend medicinal cannabis with evidence belongs to Prof. Elisaldo Carlini, his teams, and the institutions that keep the legacy.** This inspection only documents and recommends — without appropriation.

Sources consulted (non-exhaustive):

- [UNIFESP — Science and Scientists: Elisaldo Carlini](https://cienciaecientistas.unifesp.br/cientistas-unifesp/elisaldo-luiz-de-araujo-carlini)
- [CNPq — death notice](https://www.gov.br/cnpq/pt-br/assuntos/noticias/destaque-em-cti/cnpq-lamenta-falecimento-do-prof-carlini)
- [Pesquisa FAPESP — medicinal marijuana interview](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/)
- [Pesquisa FAPESP — “The pharmacy of plants”](https://revistapesquisa.fapesp.br/en/the-pharmacy-of-plants/)
- [Wikipedia — Elisaldo Carlini](https://pt.wikipedia.org/wiki/Elisaldo_Carlini)
- [UNIFESP portal — course award (cites Ticão and Carlini)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CEBRID — official site](https://www.cebrid.com.br/)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with maximum merit as a scientific-legacy reference** — Elisaldo Carlini is a cornerstone of the story linking pharmacology, the public university, and responsible regulation of medicinal cannabis in Brazil. Anyone studying via the [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), [CEBRID](/posts/post-inspecao-cebrid.html), or [CANABinALL](/posts/post-inspecao-canal-canabinall.html) is, ultimately, studying the fruit of his work. Rest in peace — and may the credit remain public.

[CEBRID](/posts/post-inspecao-cebrid.html) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Father Ticão](/posts/post-inspecao-padre-ticao.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental de la **vida y el legado científico** del **Prof. Emérito Elisaldo Luiz de Araújo Carlini** (Ribeirão Preto/SP, 9 de junio de 1930 — São Paulo, 16 de septiembre de 2020). Médico, farmacólogo y psicofarmacólogo, Carlini es el hito ético e histórico de la investigación canábica brasileña. El recorte de esta ficha son tres ejes: la **raíz científica** del cannabis medicinal en Brasil; la **fundación y el legado del [CEBRID](/posts/post-inspecao-cebrid.html)**; y la **dedicatoria científica** de [CANABinALL](/posts/post-inspecao-canal-canabinall.html). El objetivo es registrar, con fuentes públicas y con el **mérito que le corresponde**, el hilo que une la Escuela Paulista de Medicina, el centro que fundó, la vigilancia sanitaria y la lucha por el uso medicinal del cannabis en Brasil.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en biografías institucionales (UNIFESP, CNPq), entrevistas y reportajes (*Pesquisa FAPESP*, Wikipedia) y cruce con las inspecciones del [CEBRID](/posts/post-inspecao-cebrid.html), del [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), del [Padre Ticão](/posts/post-inspecao-padre-ticao.html) y de [CANABinALL](/posts/post-inspecao-canal-canabinall.html). **Sin afiliación** con la UNIFESP, el CEBRID, la ANVISA o la familia Carlini. Todo el mérito de la obra científica y de la militancia por el acceso terapéutico pertenece a Carlini, a sus equipos y a las instituciones que continúan el legado.

![Prof. Elisaldo Carlini](${portrait})

*Retrato del Prof. Emérito Elisaldo Luiz de Araújo Carlini. Imagen: [Pesquisa FAPESP](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/) (crédito de la publicación original).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Elisaldo Luiz de Araújo Carlini** |
| Nacimiento | 9 de junio de 1930, Ribeirão Preto (SP) |
| Fallecimiento | 16 de septiembre de 2020, São Paulo — 90 años |
| Formación | Medicina, Escuela Paulista de Medicina (UNIFESP), promoción 1957 · maestría en psicofarmacología, Yale University (años 1960) |
| Institución | Profesor emérito de la **UNIFESP** · fundador del Departamento de Psicobiología (EPM) |
| Centro | Fundador / director científico del **[CEBRID](/posts/post-inspecao-cebrid.html)** (Centro Brasileño de Informaciones sobre Drogas Psicotrópicas) |
| Cargos públicos | Presidencia de la Secretaría Nacional de Vigilancia Sanitaria (antecesora de ANVISA, 1995–1997) · paneles OMS / INCB |
| Producción | Cientos de artículos y libros; decenas de orientaciones de maestría y doctorado |
| Ecosistema BudGanja | Origen científico del curso UNIFESP/MovReCam · dedicación del CANABinALL |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

En los canales y la formación ya inspeccionados por el laboratorio, Carlini no es un detalle: es **raíz**. La Profa. Eliana Rodrigues atribuye la creación del primer curso gratuito de cannabis medicinal en la periferia a la **valentía del Padre Ticão y del profesor Elisaldo Carlini**. CANABinALL está **dedicado** al Prof. Emérito. Omitirlo sería fallar el método BudGanja: **crédito a quien lo merece** — aquí, al científico que sostuvo con evidencia lo que el movimiento popular convirtió en acceso.

## Hipótesis y método

- **H1:** el pionerismo de Carlini en la farmacología del cannabis en Brasil antecede y fundamenta el ciclo pastoral/comunitario del MovReCam.
- **H2:** [CEBRID](/posts/post-inspecao-cebrid.html) + encuestas nacionales + presencia en OMS/INCB/ANVISA muestran a un científico que unió laboratorio, política pública y reducción de daños.
- **H3:** el legado sobrevive en el propio [CEBRID](/posts/post-inspecao-cebrid.html) (continuidad [Nappo](/posts/post-inspecao-solange-nappo.html)), en la UNIFESP (orientaciones, Diadema/ICAQF, curso de extensión) y en la curaduría científica de [CANABinALL](/posts/post-inspecao-canal-canabinall.html).
- **Método:** (1) cronología pública de la biografía; (2) aportes científicos e institucionales; (3) papel en el cannabis medicinal y la regulación; (4) cruce con inspecciones BudGanja; (5) estatus de mérito.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| 1930 | Nace en Ribeirão Preto; estudios iniciales en Piraju (escuela rural). |
| ~1945 | Se muda a São Paulo; trabaja y estudia de noche. |
| 1952–1957 | Ingresa y se gradúa en la Escuela Paulista de Medicina; pasantía temprana en farmacología. |
| ~1960–1964 | Beca Rockefeller / formación en EE. UU.; maestría en psicofarmacología en **Yale**. |
| 1970 → | Regresa a la EPM; crea Psicofarmacología y luego el Departamento de Psicobiología; impulsa el posgrado. |
| Décadas siguientes | Investiga plantas brasileñas con acción en el SNC; estudios sobre cannabis/cannabidiol; vínculo intelectual en el eje Mechoulam–cannabinoides. |
| 1990 | Participa en la creación de SOBRAVIME (vigilancia de medicamentos). |
| 1995–1997 | Preside la Secretaría Nacional de Vigilancia Sanitaria (pre-ANVISA). |
| 1997 → | Consolida el **[CEBRID](/posts/post-inspecao-cebrid.html)** en la UNIFESP — información y encuestas sobre alcohol y otras drogas para políticas públicas. |
| Mandatos internacionales | Panel de expertos de la OMS sobre dependencia; múltiples mandatos en el **INCB** (ONU). |
| Años 2010 | Apoyo científico y ético al debate del uso medicinal; vínculo con familias, asociaciones y la demanda que se vuelve curso UNIFESP/MovReCam. |
| 2019–2020 | Sigue planificando y hablando de terapéutica cannábica; fallece el 16/09/2020. |
| Después de 2020 | Nombre evocado en homenajes legislativos, el premio internacional del curso UNIFESP (2025) y la dedicación del CANABinALL. |

## Hallazgos (mérito debido)

1. **Pionero de la farmacología del cannabis en Brasil** — de la orientación de Ribeiro do Valle a su propia línea sobre THC/CBD y sistema nervioso, Carlini puso al país en el mapa científico de la planta cuando el tema era tabú académico y político.
2. **Instituciones que permanecen** — Psicobiología en EPM/UNIFESP, [CEBRID](/posts/post-inspecao-cebrid.html), aportes a la vigilancia sanitaria y formación de generaciones de investigadores. El mérito no es un paper: es infraestructura de conocimiento.
3. **Ciencia al servicio de la política pública** — encuestas nacionales, SENAD, OMS, INCB: Carlini tradujo evidencia a lenguaje de Estado sin abandonar el laboratorio.
4. **Eslabón con la periferia y el MovReCam** — cuando el [Padre Ticão](/posts/post-inspecao-padre-ticao.html) busca ciencia para la pastoral de la zona este, encuentra a Carlini. El curso gratuito en la periferia es hijo de ese encuentro entre **método** y **demanda comunitaria**.
5. **Ética de la continuidad** — [CANABinALL](/posts/post-inspecao-canal-canabinall.html) (canal **dedicado** al Prof. Emérito), el curso SIEX y el archivo MovReCam prolongan su nombre. Inspeccionar esos proyectos sin nombrar a Carlini sería incompleto.

## Complementariedad con el Inspector BudGanja

| Tema Carlini | Recurso BudGanja |
|--------------|------------------|
| Casa científica que fundó | [Inspección: CEBRID](/posts/post-inspecao-cebrid.html) · [Solange Nappo](/posts/post-inspecao-solange-nappo.html) |
| Curso que ayudó a fundar (con Ticão) | [Inspección: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) |
| Socio pastoral / origen comunitario | [Inspección: Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Archivo de clases | [Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| Canal dedicado a Carlini | [Inspección: CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [Videos · CANABinALL](/videos/?channel=canabinall) |
| Hub formativo | [Biblioteca UNIFESP](/biblioteca/unifesp/) |

## Créditos y referencias

**Todo el mérito de la vida científica, de la formación de investigadores, del CEBRID y de la valentía de defender el cannabis medicinal con evidencia pertenece al Prof. Elisaldo Carlini, a sus equipos y a las instituciones que mantienen el legado.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [UNIFESP — Ciencia y Científicos: Elisaldo Carlini](https://cienciaecientistas.unifesp.br/cientistas-unifesp/elisaldo-luiz-de-araujo-carlini)
- [CNPq — nota de fallecimiento](https://www.gov.br/cnpq/pt-br/assuntos/noticias/destaque-em-cti/cnpq-lamenta-falecimento-do-prof-carlini)
- [Pesquisa FAPESP — entrevista sobre uso medicinal](https://revistapesquisa.fapesp.br/elisaldo-carlini-o-uso-medicinal-da-maconha/)
- [Pesquisa FAPESP — “The pharmacy of plants”](https://revistapesquisa.fapesp.br/en/the-pharmacy-of-plants/)
- [Wikipedia — Elisaldo Carlini](https://pt.wikipedia.org/wiki/Elisaldo_Carlini)
- [Portal UNIFESP — premio del curso (cita a Ticão y Carlini)](https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional)
- [CEBRID — sitio oficial](https://www.cebrid.com.br/)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito máximo como referencia de legado científico** — Elisaldo Carlini es piedra angular de la historia que une farmacología, universidad pública y regulación responsable del cannabis medicinal en Brasil. Quien estudia por el [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html), por el [CEBRID](/posts/post-inspecao-cebrid.html) o por [CANABinALL](/posts/post-inspecao-canal-canabinall.html) estudia, en última instancia, el fruto de su trabajo. Descanse en paz — y que el crédito siga siendo público.

[CEBRID](/posts/post-inspecao-cebrid.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Padre Ticão](/posts/post-inspecao-padre-ticao.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildElisaldoCarliniInspecaoPost() {
  const inspected = '2026-07-31';
  const { body, contentEn, contentEs } = buildElisaldoCarliniBodies(inspected);

  return pessoaPost({
    title: 'Inspeção: Prof. Elisaldo Carlini — pioneiro da cannabis medicinal',
    titleEn: 'Inspection: Prof. Elisaldo Carlini — medicinal cannabis pioneer',
    titleEs: 'Inspección: Prof. Elisaldo Carlini — pionero del cannabis medicinal',
    excerpt:
      'Homenagem documental ao Prof. Emérito Elisaldo Luiz de Araújo Carlini (1930–2020): médico e psicofarmacologista da UNIFESP, fundador do CEBRID — mérito máximo na ciência e na democratização do conhecimento sobre cannabis medicinal no Brasil.',
    excerptEn:
      'Documentary tribute to Professor Emeritus Elisaldo Luiz de Araújo Carlini (1930–2020): UNIFESP physician and psychopharmacologist, CEBRID founder — maximum credit for science and democratizing medicinal-cannabis knowledge in Brazil.',
    excerptEs:
      'Homenaje documental al Prof. Emérito Elisaldo Luiz de Araújo Carlini (1930–2020): médico y psicofarmacólogo de la UNIFESP, fundador del CEBRID — mérito máximo en la ciencia y la democratización del conocimiento sobre cannabis medicinal en Brasil.',
    slug: 'inspecao-elisaldo-carlini',
    date: inspected + 'T17:00:00.000Z',
    seriesOrder: 2,
    seriesLabel: 'Elisaldo Carlini · legado',
    coverImage: '/imagens/inspecoes/elisaldo-carlini-cover.jpg',
    sourceUrl: 'https://cienciaecientistas.unifesp.br/cientistas-unifesp/elisaldo-luiz-de-araujo-carlini',
    body,
    contentEn,
    contentEs
  });
}

const {
  buildSidartaRibeiroInspecaoPost,
  buildSidartaRibeiroBodies,
  SIDARTA_VIDEOS
} = require('./sidarta-ribeiro-inspecao-post.js');

const {
  buildSolangeNappoInspecaoPost,
  buildSolangeNappoBodies
} = require('./solange-nappo-inspecao-post.js');

const {
  buildElianaRodriguesInspecaoPost,
  buildElianaRodriguesBodies
} = require('./eliana-rodrigues-inspecao-post.js');

const {
  buildGabrielleDaineziInspecaoPost,
  buildGabrielleDaineziBodies
} = require('./gabrielle-dainezi-inspecao-post.js');

const {
  buildAmyrKlinkInspecaoPost,
  buildTamaraKlinkInspecaoPost
} = require('./klink-legado-inspecoes-posts.js');

const PESSOAS_INSPECOES_POSTS = [
  buildPadreTicaoInspecaoPost(),
  buildElisaldoCarliniInspecaoPost(),
  buildSidartaRibeiroInspecaoPost(),
  buildSolangeNappoInspecaoPost(),
  buildElianaRodriguesInspecaoPost(),
  buildGabrielleDaineziInspecaoPost(),
  buildAmyrKlinkInspecaoPost(),
  buildTamaraKlinkInspecaoPost()
];

module.exports = {
  PESSOAS_INSPECOES_POSTS,
  buildPadreTicaoInspecaoPost,
  buildPadreTicaoBodies,
  buildElisaldoCarliniInspecaoPost,
  buildElisaldoCarliniBodies,
  buildSidartaRibeiroInspecaoPost,
  buildSidartaRibeiroBodies,
  buildSolangeNappoInspecaoPost,
  buildSolangeNappoBodies,
  buildElianaRodriguesInspecaoPost,
  buildElianaRodriguesBodies,
  buildGabrielleDaineziInspecaoPost,
  buildGabrielleDaineziBodies,
  buildAmyrKlinkInspecaoPost,
  buildTamaraKlinkInspecaoPost,
  TICAO_VIDEOS,
  SIDARTA_VIDEOS
};
