'use strict';

/**
 * Inspeção: ESAPP — Escola Superior de Agronomia de Paraguaçu Paulista (formacao-academica).
 * Instituição onde o Inspetor BudGanja pretende cursar Engenharia Agronômica.
 */

function formacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'formacao-academica',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Extensão académica',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

function buildEsappBodies(inspected) {
  const cover = '/imagens/inspecoes/esapp-cover.jpg';

  const body = `## Escopo

Inspeção editorial e documental da **ESAPP** — **Escola Superior de Agronomia de Paraguaçu Paulista** — instituição de ensino superior mantida pela **Fundação Gammon de Ensino (FUNGE)**, na Estância Turística de **Paraguaçu Paulista**, região oeste do Estado de São Paulo. O recorte não é um guia de vestibular: é registar, com fontes públicas e tom respeitoso, **por que esta escola importa ao laboratório BudGanja** e **onde o Inspetor BudGanja pretende cursar Engenharia Agronômica** — complementando a formação em fitoterapia e cannabis medicinal já documentada no [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base no [site oficial da ESAPP](https://www.esapp.edu.br/), páginas institucionais e documentos públicos da mantenedora. **Sem afiliação** com a ESAPP, a FUNGE ou o MEC. Prazos de vestibular, mensalidades e regras de matrícula podem mudar — confirmar sempre nos canais oficiais antes de se inscrever. **Não inventamos** status de matrícula: esta ficha declara apenas a **intenção formativa** do projeto.

![ESAPP — Agronomia em Paraguaçu Paulista](${cover})

*Capa editorial do laboratório BudGanja — referência visual; consultar [esapp.edu.br](https://www.esapp.edu.br/) para imagens e comunicados oficiais.*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **ESAPP** — Escola Superior de Agronomia de Paraguaçu Paulista |
| Sigla | **ESAPP** (não «ESSAP» — grafia correta verificada no site institucional) |
| Mantenedora | [Fundação Gammon de Ensino (FUNGE)](https://www.esapp.edu.br/) |
| Município | **Paraguaçu Paulista** — SP (Estância Turística) |
| Curso inspecionado | **Agronomia** — formação em **Engenharia Agronômica** (5 anos) |
| Credenciamento | Janeiro de **1974** (Decreto nº 73.409, de 02/01/1974) |
| Reconhecimento | Decreto nº 81.760, de 06/06/1978 |
| Campus urbano | Rua Prefeito Jayme Monteiro, 791 — Centro — CEP 19700-000 |
| Campus rural | **Fazenda Modelo** — Rodovia SP 421, km 56 + 300 m (~298 ha) |
| Site | [esapp.edu.br](https://www.esapp.edu.br/) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O Inspetor BudGanja nasceu como laboratório digital de **plantas medicinais**, **cultivo responsável** e **fitoterapia** — com o criador, **Tiago Queiroz Loureiro**, já inserido no ecossistema UNIFESP/MovReCam ([XIV Curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)). Falta, no mapa editorial, a **casa de formação agronómica de graduação** onde o projeto pretende **cursar Agronomia**: a ESAPP, tradição regional desde 1974 e referência em ciências agrárias no Médio Vale do Paranapanema.

Esta ficha **não substitui** o prospecto oficial nem garante vaga — documenta a escolha institucional do laboratório e liga-a ao restante acervo (plantas, calculadoras, diário de cultivo).

## Hipóteses e método

- **H1:** Uma escola de agronomia com **Fazenda Modelo** e campus urbano oferece base prática alinhada ao que o BudGanja mede em ambiente controlado ([calculadoras](/calculadoras/), [cultivo](/cultivo/)).
- **H2:** A formação agronómica **complementa** — não substitui — a extensão UNIFESP em cannabis medicinal: graduação em produção vegetal + extensão clínica/regulatória.
- **H3:** A ESAPP, ao re-adoptar o nome histórico em **outubro de 2022**, reforça identidade em ciências agrárias — coerente com o foco do laboratório em plantas e agronegócio responsável.
- **Método:** (1) missão e história institucional; (2) perfil público do curso de Agronomia; (3) infraestrutura (campi); (4) cruzamento com inspeções BudGanja; (5) enquadramento da intenção formativa.

## História e missão (síntese verificável)

| Período | Marco |
|---------|-------|
| 26/12/1970 | Criação da **Fundação Gammon de Ensino** — movimento comunitário pela educação superior na região |
| Jan. 1974 | Credenciamento da **ESAPP** e autorização do curso de **Agronomia** |
| 1978 | Reconhecimento oficial do curso |
| Décadas seguintes | Expansão da mantenedora (ex. FACIG); consolidação regional |
| Out. 2022 | Retorno ao nome **ESAPP**, reforçando tradição na formação de engenheiros agrônomos |
| Actual | Missão pública: ensino, pesquisa e extensão; valores de **ética**, **solidariedade** e **responsabilidade socioambiental** |

A ESAPP herda experiência do **Instituto Presbiteriano Gammon** (Lavras/MG), com raízes em educação agrícola desde o século XIX — contexto histórico descrito no site institucional, sem confundir a ESAPP com a [UFLA](https://ufla.br/) federalizada.

## Perfil do curso de Agronomia

Segundo a página pública do curso, a Agronomia da ESAPP visa formação **generalista** em Engenharia Agronômica, atenta ao **agronegócio brasileiro** e à realidade fundiária nacional. O engenheiro agrônomo forma-se para planejar, orientar e executar produção agropecuária — de alimentos de origem vegetal e animal até a comercialização — incluindo projetos agroindustriais, vistorias, laudos e gestão de cadeias produtivas.

Para o BudGanja, os eixos de interesse cruzam-se com:

- **Botânica e fisiologia vegetal** — base das [fichas de plantas](/plantas/) e inspeções fitoterápicas
- **Produção vegetal e solo** — [Super Solo](/calculadoras/super-solo.html), nutrição, substratos
- **Ambiente controlado** — luz, clima e IoT agrícola (CEA) documentados no [diário](/cultivo/)
- **Extensão e responsabilidade socioambiental** — alinhamento ético com fitoterapia e cannabis medicinal regulada

## Infraestrutura inspecionada (dados públicos)

| Unidade | Dado público |
|---------|--------------|
| Campus urbano | ~**120 000 m²** — área central de Paraguaçu Paulista |
| Fazenda Modelo | ~**298,61 ha** — a ~2 km do campus urbano; práticas de campo |
| Biblioteca | Centro Cultural Célio Rodrigues Siqueira — apoio a ensino, pesquisa e extensão |
| Duração do curso | **5 anos** (informação pública do site) |

## O Inspetor BudGanja e a ESAPP

**Tiago Queiroz Loureiro** — criador do Inspetor BudGanja, cientista da computação com foco em agricultura de ambiente controlado (CEA), automação e IoT agrícola, aluno do [XIV Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) — **pretende cursar Agronomia na ESAPP**. Esta inspeção regista essa **intenção formativa** como parte do percurso do laboratório: unir graduação agronómica à extensão em cannabis medicinal e ao arquivo público de plantas.

> **Transparência:** não afirmamos matrícula efectiva, semestre de ingresso nem bolsa — apenas a direcção escolhida pelo projecto, sujeita a processos seletivos e calendários oficiais da instituição.

## Complementaridade com o Inspetor BudGanja

| Tema ESAPP | Recurso BudGanja |
|------------|------------------|
| Formação agronómica (graduação) | Esta ficha · [Biblioteca](/biblioteca/inspecoes/) |
| Cannabis medicinal (extensão) | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Plantas medicinais | [Catálogo de plantas](/plantas/) · [Inspeções de plantas](/biblioteca/inspecoes/#inspecoes-plantas) |
| Cultivo e métricas | [Calculadoras](/calculadoras/) · [Diário de pesquisas](/cultivo/) |
| Ciências agrárias e legado | [CEBRID](/posts/post-inspecao-cebrid.html) (eixo saúde/psicotrópicos) — eixo distinto, complementar |

## Créditos e referências

**Todo o mérito institucional, pedagógico e de infraestrutura pertence à ESAPP, à FUNGE e às suas equipas.** Esta inspeção apenas documenta e contextualiza — sem apropriação.

Fontes consultadas (não exaustivo):

- [ESAPP — site oficial](https://www.esapp.edu.br/)
- [ESAPP — instituição](https://www.esapp.edu.br/instituicao/)
- [ESAPP — curso de Agronomia](https://www.esapp.edu.br/curso/)
- Cruzamentos: [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Sobre o laboratório](/info/sobre.html)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado como referência institucional de formação agronómica** — a ESAPP é a escola escolhida pelo Inspetor BudGanja para **cursar Agronomia**, ancorando o laboratório numa formação de graduação em ciências agrárias no interior paulista. Recomendado cruzar o curso com extensão UNIFESP, fichas de plantas e medições reais no [laboratório BudGanja](/cultivo/).

[ESAPP](https://www.esapp.edu.br/) · [Curso de Agronomia](https://www.esapp.edu.br/curso/) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of **ESAPP** — the **Escola Superior de Agronomia de Paraguaçu Paulista** (School of Agronomy of Paraguaçu Paulista) — a higher-education institution maintained by the **Fundação Gammon de Ensino (FUNGE)** in the tourist town of **Paraguaçu Paulista**, western São Paulo state. This is not an admissions guide: it records, from public sources and in a respectful tone, **why this school matters to the BudGanja laboratory** and **where Inspector BudGanja intends to pursue a degree in Agronomic Engineering** — complementing the phytotherapy and medicinal-cannabis training already documented in the [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Methodological note:** independent audit by Inspector BudGanja based on the [official ESAPP website](https://www.esapp.edu.br/), institutional pages, and public documents from the maintaining foundation. **No affiliation** with ESAPP, FUNGE, or the Ministry of Education. Entrance deadlines, tuition, and enrollment rules may change — always confirm on official channels before applying. **We do not invent** enrollment status: this sheet only states the project’s **educational intention**.

![ESAPP — Agronomy in Paraguaçu Paulista](${cover})

*Editorial cover by the BudGanja laboratory — visual reference; see [esapp.edu.br](https://www.esapp.edu.br/) for official images and notices.*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **ESAPP** — Escola Superior de Agronomia de Paraguaçu Paulista |
| Acronym | **ESAPP** (not “ESSAP” — correct spelling verified on the institutional site) |
| Maintaining entity | [Fundação Gammon de Ensino (FUNGE)](https://www.esapp.edu.br/) |
| Municipality | **Paraguaçu Paulista** — SP (tourist town) |
| Inspected program | **Agronomy** — **Agronomic Engineering** degree (5 years) |
| Accreditation | January **1974** (Decree No. 73.409, 01/02/1974) |
| Recognition | Decree No. 81.760, 06/06/1978 |
| Urban campus | Rua Prefeito Jayme Monteiro, 791 — Downtown — ZIP 19700-000 |
| Rural campus | **Fazenda Modelo** — SP-421 highway, km 56 + 300 m (~298 ha) |
| Site | [esapp.edu.br](https://www.esapp.edu.br/) |
| Inspection date | ${inspected} |

## Why this inspection exists

Inspector BudGanja began as a digital laboratory for **medicinal plants**, **responsible cultivation**, and **phytotherapy** — with creator **Tiago Queiroz Loureiro** already in the UNIFESP/MovReCam ecosystem ([14th Course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)). Missing from the editorial map was the **undergraduate agronomy school** where the project intends to **study Agronomy**: ESAPP, a regional tradition since 1974 and a reference in agricultural sciences in the Middle Paranapanema Valley.

This sheet **does not replace** the official prospectus or guarantee a place — it documents the laboratory’s institutional choice and links it to the rest of the archive (plants, calculators, cultivation journal).

## Hypotheses and method

- **H1:** An agronomy school with a **Model Farm** and an urban campus offers practical training aligned with what BudGanja measures in controlled environments ([calculators](/calculadoras/), [cultivation journal](/cultivo/)).
- **H2:** Agronomic training **complements** — does not replace — UNIFESP extension in medicinal cannabis: undergraduate plant production + clinical/regulatory extension.
- **H3:** By re-adopting its historic name in **October 2022**, ESAPP reinforces its identity in agricultural sciences — consistent with the lab’s focus on plants and responsible agribusiness.
- **Method:** (1) mission and institutional history; (2) public Agronomy program profile; (3) infrastructure (campuses); (4) cross-links with BudGanja inspections; (5) framing of educational intention.

## History and mission (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 12/26/1970 | Creation of **Fundação Gammon de Ensino** — community movement for higher education in the region |
| Jan. 1974 | **ESAPP** accreditation and authorization of the **Agronomy** program |
| 1978 | Official program recognition |
| Following decades | Expansion of the maintaining foundation (e.g. FACIG); regional consolidation |
| Oct. 2022 | Return to the **ESAPP** name, reinforcing tradition in training agronomists |
| Current | Public mission: teaching, research, and extension; values of **ethics**, **solidarity**, and **socio-environmental responsibility** |

ESAPP inherits experience from the **Instituto Presbiteriano Gammon** (Lavras/MG), with roots in agricultural education since the 19th century — historical context described on the institutional site, without confusing ESAPP with federalized [UFLA](https://ufla.br/).

## Agronomy program profile

According to the public course page, ESAPP Agronomy aims at **generalist** training in Agronomic Engineering, attentive to the **Brazilian agribusiness** and national land reality. Agronomists are trained to plan, guide, and execute agricultural production — from plant- and animal-origin food to marketing — including agro-industrial projects, surveys, technical reports, and supply-chain management.

For BudGanja, axes of interest cross with:

- **Botany and plant physiology** — foundation of [plant profiles](/plantas/) and phytotherapy inspections
- **Crop production and soil** — [Super Solo](/calculadoras/super-solo.html), nutrition, substrates
- **Controlled environment** — light, climate, and agricultural IoT (CEA) documented in the [journal](/cultivo/)
- **Extension and socio-environmental responsibility** — ethical alignment with phytotherapy and regulated medicinal cannabis

## Inspected infrastructure (public data)

| Unit | Public data |
|------|-------------|
| Urban campus | ~**120,000 m²** — central area of Paraguaçu Paulista |
| Model Farm | ~**298.61 ha** — ~2 km from the urban campus; field practice |
| Library | Centro Cultural Célio Rodrigues Siqueira — support for teaching, research, and extension |
| Program length | **5 years** (public information on the site) |

## Inspector BudGanja and ESAPP

**Tiago Queiroz Loureiro** — creator of Inspector BudGanja, computer scientist focused on controlled-environment agriculture (CEA), automation, and agricultural IoT, student in the [14th UNIFESP Course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) — **intends to study Agronomy at ESAPP**. This inspection records that **educational intention** as part of the laboratory’s path: combining an agronomy degree with extension in medicinal cannabis and the public plant archive.

> **Transparency:** we do not claim active enrollment, intake semester, or scholarships — only the direction chosen by the project, subject to official selective processes and institutional calendars.

## Complementarity with Inspector BudGanja

| ESAPP theme | BudGanja resource |
|-------------|---------------------|
| Agronomic training (undergraduate) | This sheet · [Library](/biblioteca/inspecoes/) |
| Medicinal cannabis (extension) | [UNIFESP Course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Medicinal plants | [Plant catalog](/plantas/) · [Plant inspections](/biblioteca/inspecoes/#inspecoes-plantas) |
| Cultivation and metrics | [Calculators](/calculadoras/) · [Research journal](/cultivo/) |
| Agricultural sciences and legacy | [CEBRID](/posts/post-inspecao-cebrid.html) (health/psychotropics axis) — distinct, complementary axis |

## Credits and references

**All institutional, pedagogical, and infrastructure credit belongs to ESAPP, FUNGE, and their teams.** This inspection only documents and contextualizes — without appropriation.

Sources consulted (non-exhaustive):

- [ESAPP — official site](https://www.esapp.edu.br/)
- [ESAPP — institution](https://www.esapp.edu.br/instituicao/)
- [ESAPP — Agronomy program](https://www.esapp.edu.br/curso/)
- Cross-links: [UNIFESP Course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [About the laboratory](/info/sobre.html)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved as an institutional reference for agronomic training** — ESAPP is the school chosen by Inspector BudGanja to **study Agronomy**, anchoring the laboratory in an undergraduate program in agricultural sciences in inland São Paulo. Recommended to cross the degree with UNIFESP extension, plant profiles, and real measurements in the [BudGanja laboratory](/cultivo/).

[ESAPP](https://www.esapp.edu.br/) · [Agronomy program](https://www.esapp.edu.br/curso/) · [UNIFESP Course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental de la **ESAPP** — **Escola Superior de Agronomia de Paraguaçu Paulista** (Escuela Superior de Agronomía de Paraguaçu Paulista) — institución de educación superior mantenida por la **Fundação Gammon de Ensino (FUNGE)**, en la Estancia Turística de **Paraguaçu Paulista**, región oeste del estado de São Paulo. El recorte no es una guía de admisión: es registrar, con fuentes públicas y tono respetuoso, **por qué esta escuela importa al laboratorio BudGanja** y **dónde el Inspector BudGanja pretende cursar Ingeniería Agronómica** — complementando la formación en fitoterapia y cannabis medicinal ya documentada en el [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html).

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en el [sitio oficial de la ESAPP](https://www.esapp.edu.br/), páginas institucionales y documentos públicos de la mantenedora. **Sin afiliación** con la ESAPP, la FUNGE o el MEC. Plazos de vestibular, matrículas y reglas de inscripción pueden cambiar — confirmar siempre en canales oficiales. **No inventamos** estado de matrícula: esta ficha solo declara la **intención formativa** del proyecto.

![ESAPP — Agronomía en Paraguaçu Paulista](${cover})

*Portada editorial del laboratorio BudGanja — referencia visual; consultar [esapp.edu.br](https://www.esapp.edu.br/) para imágenes y comunicados oficiales.*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **ESAPP** — Escola Superior de Agronomia de Paraguaçu Paulista |
| Sigla | **ESAPP** (no «ESSAP» — grafía correcta verificada en el sitio institucional) |
| Mantenedora | [Fundação Gammon de Ensino (FUNGE)](https://www.esapp.edu.br/) |
| Municipio | **Paraguaçu Paulista** — SP (Estancia Turística) |
| Curso inspeccionado | **Agronomía** — formación en **Ingeniería Agronómica** (5 años) |
| Credenciamento | Enero de **1974** (Decreto nº 73.409, de 02/01/1974) |
| Reconocimiento | Decreto nº 81.760, de 06/06/1978 |
| Campus urbano | Rua Prefeito Jayme Monteiro, 791 — Centro — CEP 19700-000 |
| Campus rural | **Fazenda Modelo** — Rodovia SP 421, km 56 + 300 m (~298 ha) |
| Sitio | [esapp.edu.br](https://www.esapp.edu.br/) |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

El Inspector BudGanja nació como laboratorio digital de **plantas medicinales**, **cultivo responsable** y **fitoterapia** — con el creador, **Tiago Queiroz Loureiro**, ya inserto en el ecosistema UNIFESP/MovReCam ([XIV Curso](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)). Faltaba en el mapa editorial la **casa de formación agronómica de grado** donde el proyecto pretende **cursar Agronomía**: la ESAPP, tradición regional desde 1974 y referencia en ciencias agrarias en el Medio Valle del Paranapanema.

Esta ficha **no sustituye** el prospecto oficial ni garantiza cupo — documenta la elección institucional del laboratorio y la enlaza con el resto del acervo (plantas, calculadoras, diario de cultivo).

## Hipótesis y método

- **H1:** Una escuela de agronomía con **Fazenda Modelo** y campus urbano ofrece base práctica alineada con lo que BudGanja mide en ambiente controlado ([calculadoras](/calculadoras/), [cultivo](/cultivo/)).
- **H2:** La formación agronómica **complementa** — no sustituye — la extensión UNIFESP en cannabis medicinal: grado en producción vegetal + extensión clínica/regulatoria.
- **H3:** La ESAPP, al readoptar el nombre histórico en **octubre de 2022**, refuerza identidad en ciencias agrarias — coherente con el foco del laboratorio en plantas y agronegocio responsable.
- **Método:** (1) misión e historia institucional; (2) perfil público del curso de Agronomía; (3) infraestructura (campi); (4) cruces con inspecciones BudGanja; (5) encuadre de la intención formativa.

## Historia y misión (síntesis verificable)

| Período | Hito |
|---------|------|
| 26/12/1970 | Creación de la **Fundação Gammon de Ensino** — movimiento comunitario por educación superior en la región |
| Ene. 1974 | Credenciamento de la **ESAPP** y autorización del curso de **Agronomía** |
| 1978 | Reconocimiento oficial del curso |
| Décadas siguientes | Expansión de la mantenedora (p. ej. FACIG); consolidación regional |
| Oct. 2022 | Retorno al nombre **ESAPP**, reforzando tradición en formación de ingenieros agrónomos |
| Actual | Misión pública: enseñanza, investigación y extensión; valores de **ética**, **solidaridad** y **responsabilidad socioambiental** |

La ESAPP hereda experiencia del **Instituto Presbiteriano Gammon** (Lavras/MG), con raíces en educación agrícola desde el siglo XIX — contexto histórico descrito en el sitio institucional, sin confundir la ESAPP con la [UFLA](https://ufla.br/) federalizada.

## Perfil del curso de Agronomía

Según la página pública del curso, la Agronomía de la ESAPP apunta a formación **generalista** en Ingeniería Agronómica, atenta al **agronegocio brasileño** y a la realidad fundiaria nacional. El ingeniero agrónomo se forma para planificar, orientar y ejecutar producción agropecuaria — de alimentos de origen vegetal y animal hasta la comercialización — incluyendo proyectos agroindustriales, inspecciones, laudos y gestión de cadenas productivas.

Para BudGanja, los ejes de interés se cruzan con:

- **Botánica y fisiología vegetal** — base de las [fichas de plantas](/plantas/) e inspecciones fitoterápicas
- **Producción vegetal y suelo** — [Super Solo](/calculadoras/super-solo.html), nutrición, sustratos
- **Ambiente controlado** — luz, clima e IoT agrícola (CEA) documentados en el [diario](/cultivo/)
- **Extensión y responsabilidad socioambiental** — alineación ética con fitoterapia y cannabis medicinal regulada

## Infraestructura inspeccionada (datos públicos)

| Unidad | Dato público |
|--------|--------------|
| Campus urbano | ~**120 000 m²** — área central de Paraguaçu Paulista |
| Fazenda Modelo | ~**298,61 ha** — a ~2 km del campus urbano; prácticas de campo |
| Biblioteca | Centro Cultural Célio Rodrigues Siqueira — apoyo a enseñanza, investigación y extensión |
| Duración del curso | **5 años** (información pública del sitio) |

## El Inspector BudGanja y la ESAPP

**Tiago Queiroz Loureiro** — creador del Inspector BudGanja, científico de la computación con foco en agricultura de ambiente controlado (CEA), automatización e IoT agrícola, alumno del [XIV Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) — **pretende cursar Agronomía en la ESAPP**. Esta inspección registra esa **intención formativa** como parte del recorrido del laboratorio: unir grado agronómico con extensión en cannabis medicinal y el archivo público de plantas.

> **Transparencia:** no afirmamos matrícula efectiva, semestre de ingreso ni beca — solo la dirección elegida por el proyecto, sujeta a procesos selectivos y calendarios oficiales de la institución.

## Complementariedad con el Inspector BudGanja

| Tema ESAPP | Recurso BudGanja |
|------------|------------------|
| Formación agronómica (grado) | Esta ficha · [Biblioteca](/biblioteca/inspecoes/) |
| Cannabis medicinal (extensión) | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) |
| Plantas medicinales | [Catálogo de plantas](/plantas/) · [Inspecciones de plantas](/biblioteca/inspecoes/#inspecoes-plantas) |
| Cultivo y métricas | [Calculadoras](/calculadoras/) · [Diario de investigaciones](/cultivo/) |
| Ciencias agrarias y legado | [CEBRID](/posts/post-inspecao-cebrid.html) (eje salud/psicotrópicos) — eje distinto, complementario |

## Créditos y referencias

**Todo el mérito institucional, pedagógico y de infraestructura pertenece a la ESAPP, a la FUNGE y a sus equipos.** Esta inspección solo documenta y contextualiza — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [ESAPP — sitio oficial](https://www.esapp.edu.br/)
- [ESAPP — institución](https://www.esapp.edu.br/instituicao/)
- [ESAPP — curso de Agronomía](https://www.esapp.edu.br/curso/)
- Cruces: [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Sobre el laboratorio](/info/sobre.html)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado como referencia institucional de formación agronómica** — la ESAPP es la escuela elegida por el Inspector BudGanja para **cursar Agronomía**, anclando el laboratorio en una formación de grado en ciencias agrarias en el interior paulista. Recomendado cruzar el curso con extensión UNIFESP, fichas de plantas y mediciones reales en el [laboratorio BudGanja](/cultivo/).

[ESAPP](https://www.esapp.edu.br/) · [Curso de Agronomía](https://www.esapp.edu.br/curso/) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildEsappInspecaoPost() {
  const inspected = '2026-08-01';
  const { body, contentEn, contentEs } = buildEsappBodies(inspected);

  return formacaoPost({
    title: 'Inspeção: ESAPP — Agronomia em Paraguaçu Paulista',
    titleEn: 'Inspection: ESAPP — Agronomy in Paraguaçu Paulista',
    titleEs: 'Inspección: ESAPP — Agronomía en Paraguaçu Paulista',
    excerpt:
      'Ficha institucional da ESAPP (Paraguaçu Paulista/SP): curso de Agronomia, Fazenda Modelo e tradição desde 1974 — onde o Inspetor BudGanja pretende cursar graduação, complementar ao XIV Curso UNIFESP.',
    excerptEn:
      'Institutional sheet on ESAPP (Paraguaçu Paulista/SP): Agronomy program, Model Farm, and tradition since 1974 — where Inspector BudGanja intends to pursue an undergraduate degree, complementing the 14th UNIFESP Course.',
    excerptEs:
      'Ficha institucional de la ESAPP (Paraguaçu Paulista/SP): curso de Agronomía, Fazenda Modelo y tradición desde 1974 — donde el Inspector BudGanja pretende cursar grado, complementario al XIV Curso UNIFESP.',
    slug: 'inspecao-esapp-agronomia-paraguacu-paulista',
    date: inspected + 'T18:00:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'ESAPP · graduação',
    coverImage: '/imagens/inspecoes/esapp-cover.jpg',
    sourceUrl: 'https://www.esapp.edu.br/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEsappInspecaoPost,
  buildEsappBodies
};
