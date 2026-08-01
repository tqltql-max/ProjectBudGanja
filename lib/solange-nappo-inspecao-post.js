'use strict';

/**
 * Inspeção: Profa. Solange Nappo — CEBRID (legado-pessoas).
 * Continuidade institucional do CEBRID após Carlini; formação e cannabis medicinal.
 */

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

function buildSolangeNappoBodies(inspected) {
  const cover = '/imagens/inspecoes/solange-nappo-cover.jpg';
  const portrait = '/imagens/inspecoes/solange-nappo-portrait.jpg';
  const coverNote =
    'Retrato da Profa. Dra. Solange Nappo. Imagem: [CEBRID — Equipe](https://www.cebrid.com.br/equipe/).';

  const body = `## Escopo

Inspeção editorial e documental do papel público da **Profa. Dra. Solange Aparecida Nappo** — farmacêutica-bioquímica, professora da **UNIFESP** e **coordenadora do CEBRID** (Centro Brasileiro de Informações sobre Drogas Psicotrópicas). O recorte desta ficha não é currículo Lattes completo: é registar, com fontes institucionais públicas e com o **mérito que lhe é devido**, a **continuidade do CEBRID** após [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) e a ponte com a formação em cannabis medicinal e prevenção já inspecionada pelo laboratório.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em Prodmais/UNIFESP, FAPESP, páginas oficiais do [CEBRID](https://www.cebrid.com.br/) (equipe, cursos) e cruzamento com inspeções BudGanja já publicadas. **Sem afiliação** com a UNIFESP, o CEBRID, a ABRAMD, a CAPES/UAB ou a FAP. Todo o mérito da coordenação científica, da pesquisa qualitativa e da formação pertence a Solange Nappo, às suas instituições e às equipas que lidera.

![Profa. Solange Nappo](${portrait})

*${coverNote}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Solange Aparecida Nappo** |
| Formação | Farmácia e Bioquímica (USP, 1976) · Mestrado em Saúde Pública (USP, 1981) · Doutorado em Ciências (UNIFESP, 1996) |
| Instituição | Professora · **Coordenadora do CEBRID** (UNIFESP) · Pós-graduação em Medicina Preventiva · Ciências Farmacêuticas (Campus Diadema) |
| Linhas públicas | Saúde coletiva · estudos qualitativos · crack / cocaína / cannabis · dependência · vigilância sanitária / uso de medicamentos |
| Formação (coordenação) | **PREVINA** (CAPES / UAB-UNIFESP / CEBRID) · vice-coordenação do curso de cannabis medicinal (FAP/UNIFESP + CEBRID) |
| Redes | Presidente da **ABRAMD** · co-fundadora do **GEFCaP** (cannabis e psicodélicos na farmácia) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila editorial, Solange Nappo já constava como sugestão de legado: **«continuidade do CEBRID após Carlini»** e elo directo com a linha científica do laboratório. Sem esta ficha, a cadeia ficava incompleta — Carlini funda e dirige o centro; Nappo **sustenta e actualiza** a missão (informação, epidemiologia, formação). Não substitui [Carlini](/posts/post-inspecao-elisaldo-carlini.html), [Ticão](/posts/post-inspecao-padre-ticao.html) nem [Sidarta](/posts/post-inspecao-sidarta-ribeiro.html): **ocupa o nó institucional CEBRID** entre legado científico e cursos actuais.

## Hipóteses e método

- **H1:** Nappo opera como **guardiã institucional** do CEBRID — continuidade verificável após 35 anos de direção de Carlini.
- **H2:** a coordenação de PREVINA e a vice-coordenação do curso de medicina canabinoide ligam prevenção, farmácia e cannabis medicinal num mesmo eixo formativo.
- **H3:** a pesquisa qualitativa (crack, cocaína, cannabis, medicamentos) complementa a narrativa «cannabis medicinal» com o realismo da **saúde colectiva** e da redução de danos.
- **Método:** (1) síntese biográfica institucional; (2) eixo CEBRID / formação; (3) cruzamento com inspeções BudGanja; (4) limites (sem avaliação paper-a-paper); (5) status de mérito.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1976 | Graduação em Farmácia e Bioquímica (USP). |
| 1981 | Mestrado em Saúde Pública (USP). |
| 1996 | Doutorado em Ciências (UNIFESP). |
| 1988 → | CEBRID em actividade na UNIFESP (fundação / missão pública sob Carlini). |
| Anos seguintes | Linha de investigação em saúde colectiva e estudos qualitativos sobre drogas psicotrópicas (crack, cocaína, cannabis) e vigilância sanitária. |
| Pós-2020 | Continuidade da coordenação do CEBRID após o rompimento geracional com Carlini (†2020) — liderança pública reconhecida nas páginas do centro e dos cursos. |
| Actual | Coordenação PREVINA (professores da rede pública) · vice-coordenação do curso Cannabis medicinal (área da saúde) · ABRAMD · GEFCaP. |

## Achados (mérito devido)

1. **Continuidade do CEBRID** — após Carlini, o centro permanece activo com pesquisa, boletins e formação; Nappo é a figura pública que ancora essa continuidade nas fontes institucionais.
2. **Ponte prevenção ↔ cannabis medicinal** — PREVINA (professores) e o curso de medicina canabinoide (profissionais de saúde) mostram duas frentes da mesma casa científica, não silos isolados.
3. **Olhar de farmácia e saúde colectiva** — o perfil não é só «pró-cannabis»: inclui dependência, crack/cocaína e uso racional de medicamentos — útil ao estudante que quer contexto epidemiológico sem romantizar.
4. **Redes profissionais** — ABRAMD e GEFCaP ampliam o alcance para farmacêuticos e estudos multidisciplinares sobre drogas.
5. **Limites honestos** — esta ficha não inventa afiliação BudGanja–CEBRID nem substitui o Lattes; recomenda CEBRID e as inspeções irmãs como **ponto de partida** de estudo.

## CEBRID e formação (eixos públicos)

Dois eixos oficiais merecem destaque na documentação pública do centro:

1. **[CEBRID — missão e equipe](https://www.cebrid.com.br/)** — informação gratuita sobre uso indevido de drogas psicotrópicas; pesquisas e publicações ligadas à UNIFESP.
2. **[Curso Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/)** — chancela CEBRID; Nappo figura como coordenadora/vice-coordenadora e docente do módulo histórico da *Cannabis sativa* L.; Eliana Rodrigues na coordenação técnico-científica (etnobotânica) — elo com o ecossistema já inspecionado ([CANABinALL](/posts/post-inspecao-canal-canabinall.html), [curso UNIFESP extensão](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)).

## Complementaridade com o Inspetor BudGanja

| Tema Nappo / CEBRID | Recurso BudGanja |
|---------------------|------------------|
| Fundação e mérito científico | [Inspeção: Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Extensão / periferia / MovReCam | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Hub UNIFESP](/biblioteca/unifesp/) |
| Divulgação científica UNIFESP | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Neurociência pública (convidado) | [Sidarta Ribeiro](/posts/post-inspecao-sidarta-ribeiro.html) |
| Origem pastoral do curso de periferia | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Estudo prático (fora do foco clínico CEBRID) | [Ferramentas](/calculadoras/) · [Diário](/cultivo/) |

## Créditos e referências

**Todo o mérito da coordenação do CEBRID, da pesquisa e dos cursos citados pertence à Profa. Solange Nappo, às suas instituições e às equipas do CEBRID/UNIFESP.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [Prodmais UNIFESP — Solange Aparecida Nappo](https://unifesp.br/prodmais/profile.php?lattesID=4675292090990088)
- [FAPESP — ficha da pesquisadora](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — site oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina Canabinoide](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — equipe](https://www.cebrid.com.br/equipe/)
- Cruzamentos internos: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito como referência de legado vivo / continuidade CEBRID** — Solange Nappo é o elo público entre o legado de Carlini e a formação actual em prevenção e cannabis medicinal. Quem estuda o ecossistema UNIFESP/CEBRID no [hub de inspeções](/biblioteca/inspecoes/) encontra a continuidade que a sugestão editorial já apontava.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the public role of **Prof. Dr. Solange Aparecida Nappo** — pharmacist-biochemist, **UNIFESP** professor and **coordinator of CEBRID** (Brazilian Center for Information on Psychotropic Drugs). This sheet is not a full Lattes CV: it records, from public institutional sources and with the **credit she is due**, **CEBRID’s continuity** after [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) and the bridge to medicinal-cannabis and prevention training already audited by the laboratory.

> **Methodological note:** independent audit by Inspector BudGanja based on Prodmais/UNIFESP, FAPESP, official [CEBRID](https://www.cebrid.com.br/) pages (team, courses), and cross-checks with published BudGanja inspections. **No affiliation** with UNIFESP, CEBRID, ABRAMD, CAPES/UAB, or FAP. All credit for scientific coordination, qualitative research, and training belongs to Solange Nappo, her institutions, and the teams she leads.

![Prof. Solange Nappo](${portrait})

*Portrait of Prof. Dr. Solange Nappo. Image: [CEBRID — Team](https://www.cebrid.com.br/equipe/).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Solange Aparecida Nappo** |
| Education | Pharmacy and Biochemistry (USP, 1976) · M.Sc. Public Health (USP, 1981) · Ph.D. Sciences (UNIFESP, 1996) |
| Institution | Professor · **CEBRID coordinator** (UNIFESP) · Preventive Medicine graduate program · Pharmaceutical Sciences (Diadema campus) |
| Public lines | Collective health · qualitative studies · crack / cocaine / cannabis · dependence · sanitary surveillance / medicine use |
| Training (coordination) | **PREVINA** (CAPES / UAB-UNIFESP / CEBRID) · vice-coordination of the medicinal cannabis course (FAP/UNIFESP + CEBRID) |
| Networks | President of **ABRAMD** · co-founder of **GEFCaP** (cannabis and psychedelics in pharmacy) |
| Inspection date | ${inspected} |

## Why this inspection exists

In the editorial queue, Solange Nappo was already listed as a legacy suggestion: **“CEBRID continuity after Carlini”** and a direct link to the lab’s scientific line. Without this sheet the chain was incomplete — Carlini founds and directs the center; Nappo **sustains and updates** the mission (information, epidemiology, training). She does not replace [Carlini](/posts/post-inspecao-elisaldo-carlini.html), [Ticão](/posts/post-inspecao-padre-ticao.html), or [Sidarta](/posts/post-inspecao-sidarta-ribeiro.html): she **holds the CEBRID institutional node** between scientific legacy and current courses.

## Hypotheses and method

- **H1:** Nappo acts as **institutional guardian** of CEBRID — verifiable continuity after Carlini’s 35-year leadership.
- **H2:** PREVINA coordination and vice-coordination of the cannabinoid-medicine course link prevention, pharmacy, and medicinal cannabis in one training axis.
- **H3:** qualitative research (crack, cocaine, cannabis, medicines) complements the “medicinal cannabis” narrative with collective-health realism and harm reduction.
- **Method:** (1) institutional biographical summary; (2) CEBRID / training axis; (3) cross-check with BudGanja inspections; (4) limits (no paper-by-paper grading); (5) merit status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 1976 | Pharmacy and Biochemistry degree (USP). |
| 1981 | M.Sc. Public Health (USP). |
| 1996 | Ph.D. Sciences (UNIFESP). |
| 1988 → | CEBRID active at UNIFESP (foundation / public mission under Carlini). |
| Following years | Collective-health and qualitative research on psychotropic drugs and sanitary surveillance. |
| Post-2020 | Continuity of CEBRID coordination after the generational break with Carlini (†2020) — public leadership recognized on the center’s and courses’ pages. |
| Current | PREVINA coordination · medicinal cannabis course vice-coordination · ABRAMD · GEFCaP. |

## Findings (credit due)

1. **CEBRID continuity** — after Carlini, the center remains active with research, bulletins, and training; Nappo is the public figure anchoring that continuity in institutional sources.
2. **Prevention ↔ medicinal cannabis bridge** — PREVINA (teachers) and the cannabinoid-medicine course (health professionals) are two fronts of the same scientific house.
3. **Pharmacy and collective-health lens** — the profile is not only “pro-cannabis”: it includes dependence, crack/cocaine, and rational medicine use.
4. **Professional networks** — ABRAMD and GEFCaP widen reach to pharmacists and multidisciplinary drug studies.
5. **Honest limits** — this sheet invents no BudGanja–CEBRID affiliation; it recommends CEBRID and sibling inspections as a **study starting point**.

## CEBRID and training (public axes)

1. **[CEBRID — mission and team](https://www.cebrid.com.br/)** — free information on psychotropic drug misuse; research and publications tied to UNIFESP.
2. **[Cannabinoid Medicine course](https://www.cebrid.com.br/curso-medicina-canabinoide/)** — CEBRID endorsement; Nappo appears as coordinator/vice-coordinator and lecturer on the history of *Cannabis sativa* L.; Eliana Rodrigues on scientific-technical coordination — link to the already inspected ecosystem ([CANABinALL](/posts/post-inspecao-canal-canabinall.html), [UNIFESP extension course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)).

## Complementarity with Inspector BudGanja

| Nappo / CEBRID theme | BudGanja resource |
|----------------------|-------------------|
| Scientific founding and merit | [Inspection: Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Extension / periphery / MovReCam | [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [UNIFESP hub](/biblioteca/unifesp/) |
| UNIFESP science outreach | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Public neuroscience (guest) | [Sidarta Ribeiro](/posts/post-inspecao-sidarta-ribeiro.html) |
| Pastoral origin of the periphery course | [Father Ticão](/posts/post-inspecao-padre-ticao.html) |
| Practical study (outside CEBRID’s clinical focus) | [Tools](/calculadoras/) · [Diary](/cultivo/) |

## Credits and references

**All credit for CEBRID coordination, research, and the cited courses belongs to Prof. Solange Nappo, her institutions, and the CEBRID/UNIFESP teams.** This inspection only documents and recommends — without appropriation.

Sources consulted (non-exhaustive):

- [Prodmais UNIFESP — Solange Aparecida Nappo](https://unifesp.br/prodmais/profile.php?lattesID=4675292090990088)
- [FAPESP — researcher profile](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — official site](https://www.cebrid.com.br/)
- [CEBRID — Cannabinoid Medicine](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — team](https://www.cebrid.com.br/equipe/)
- Internal cross-links: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with merit as a living-legacy / CEBRID-continuity reference** — Solange Nappo is the public link between Carlini’s legacy and current prevention and medicinal-cannabis training. Anyone studying the UNIFESP/CEBRID ecosystem in the [inspections hub](/biblioteca/inspecoes/) finds the continuity the editorial suggestion already pointed to.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental del papel público de la **Profa. Dra. Solange Aparecida Nappo** — farmacéutica-bioquímica, profesora de la **UNIFESP** y **coordinadora del CEBRID** (Centro Brasileño de Informaciones sobre Drogas Psicotrópicas). El recorte de esta ficha no es un Lattes completo: es registrar, con fuentes institucionales públicas y con el **mérito que le corresponde**, la **continuidad del CEBRID** tras [Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) y el puente con la formación en cannabis medicinal y prevención ya inspeccionada por el laboratorio.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en Prodmais/UNIFESP, FAPESP, páginas oficiales del [CEBRID](https://www.cebrid.com.br/) (equipo, cursos) y cruce con inspecciones BudGanja ya publicadas. **Sin afiliación** con la UNIFESP, el CEBRID, la ABRAMD, CAPES/UAB o la FAP. Todo el mérito de la coordinación científica, la investigación cualitativa y la formación pertenece a Solange Nappo, a sus instituciones y a los equipos que lidera.

![Profa. Solange Nappo](${portrait})

*Retrato de la Profa. Dra. Solange Nappo. Imagen: [CEBRID — Equipo](https://www.cebrid.com.br/equipe/).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Solange Aparecida Nappo** |
| Formación | Farmacia y Bioquímica (USP, 1976) · Maestría en Salud Pública (USP, 1981) · Doctorado en Ciencias (UNIFESP, 1996) |
| Institución | Profesora · **Coordinadora del CEBRID** (UNIFESP) · Posgrado en Medicina Preventiva · Ciencias Farmacéuticas (Campus Diadema) |
| Líneas públicas | Salud colectiva · estudios cualitativos · crack / cocaína / cannabis · dependencia · vigilancia sanitaria / uso de medicamentos |
| Formación (coordinación) | **PREVINA** (CAPES / UAB-UNIFESP / CEBRID) · vice-coordinación del curso de cannabis medicinal (FAP/UNIFESP + CEBRID) |
| Redes | Presidenta de la **ABRAMD** · cofundadora del **GEFCaP** |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

En la cola editorial, Solange Nappo ya figuraba como sugerencia de legado: **«continuidad del CEBRID tras Carlini»** y vínculo directo con la línea científica del laboratorio. Sin esta ficha la cadena quedaba incompleta — Carlini funda y dirige el centro; Nappo **sostiene y actualiza** la misión. No sustituye a [Carlini](/posts/post-inspecao-elisaldo-carlini.html), [Ticão](/posts/post-inspecao-padre-ticao.html) ni [Sidarta](/posts/post-inspecao-sidarta-ribeiro.html): **ocupa el nodo institucional CEBRID** entre legado científico y cursos actuales.

## Hipótesis y método

- **H1:** Nappo opera como **guardiana institucional** del CEBRID — continuidad verificable tras 35 años de dirección de Carlini.
- **H2:** la coordinación de PREVINA y la vice-coordinación del curso de medicina cannabinóide unen prevención, farmacia y cannabis medicinal en un mismo eje formativo.
- **H3:** la investigación cualitativa (crack, cocaína, cannabis, medicamentos) complementa la narrativa «cannabis medicinal» con el realismo de la **salud colectiva**.
- **Método:** (1) síntesis biográfica institucional; (2) eje CEBRID / formación; (3) cruce con inspecciones BudGanja; (4) límites; (5) estatus de mérito.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| 1976 | Graduación en Farmacia y Bioquímica (USP). |
| 1981 | Maestría en Salud Pública (USP). |
| 1996 | Doctorado en Ciencias (UNIFESP). |
| 1988 → | CEBRID en actividad en la UNIFESP (misión pública bajo Carlini). |
| Años siguientes | Línea en salud colectiva y estudios cualitativos sobre drogas psicotrópicas y vigilancia sanitaria. |
| Post-2020 | Continuidad de la coordinación del CEBRID tras el corte generacional con Carlini (†2020). |
| Actual | Coordinación PREVINA · vice-coordinación del curso Cannabis medicinal · ABRAMD · GEFCaP. |

## Hallazgos (mérito debido)

1. **Continuidad del CEBRID** — tras Carlini, el centro sigue activo; Nappo ancla esa continuidad en fuentes institucionales.
2. **Puente prevención ↔ cannabis medicinal** — PREVINA y el curso de medicina cannabinóide son dos frentes de la misma casa científica.
3. **Mirada de farmacia y salud colectiva** — el perfil no es solo «pro-cannabis»: incluye dependencia, crack/cocaína y uso racional de medicamentos.
4. **Redes profesionales** — ABRAMD y GEFCaP amplían el alcance a farmacéuticos y estudios multidisciplinares.
5. **Límites honestos** — esta ficha no inventa afiliación BudGanja–CEBRID; recomienda CEBRID e inspecciones hermanas como **punto de partida**.

## CEBRID y formación (ejes públicos)

1. **[CEBRID — misión y equipo](https://www.cebrid.com.br/)** — información gratuita sobre uso indebido de drogas psicotrópicas.
2. **[Curso Medicina Cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/)** — chancela CEBRID; Nappo figura como coordinadora/vice-coordinadora y docente del módulo histórico de *Cannabis sativa* L.; Eliana Rodrigues en la coordinación técnico-científica — vínculo con el ecosistema ya inspeccionado ([CANABinALL](/posts/post-inspecao-canal-canabinall.html), [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html)).

## Complementariedad con el Inspector BudGanja

| Tema Nappo / CEBRID | Recurso BudGanja |
|---------------------|------------------|
| Fundación y mérito científico | [Inspección: Elisaldo Carlini](/posts/post-inspecao-elisaldo-carlini.html) |
| Extensión / periferia / MovReCam | [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Hub UNIFESP](/biblioteca/unifesp/) |
| Divulgación científica UNIFESP | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Neurociencia pública (invitado) | [Sidarta Ribeiro](/posts/post-inspecao-sidarta-ribeiro.html) |
| Origen pastoral del curso de periferia | [Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Estudio práctico | [Herramientas](/calculadoras/) · [Diario](/cultivo/) |

## Créditos y referencias

**Todo el mérito de la coordinación del CEBRID, de la investigación y de los cursos citados pertenece a la Profa. Solange Nappo, a sus instituciones y a los equipos del CEBRID/UNIFESP.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [Prodmais UNIFESP — Solange Aparecida Nappo](https://unifesp.br/prodmais/profile.php?lattesID=4675292090990088)
- [FAPESP — ficha de la investigadora](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — sitio oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina Cannabinóide](https://www.cebrid.com.br/curso-medicina-canabinoide/)
- [CEBRID — equipo](https://www.cebrid.com.br/equipe/)
- Cruces internos: [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [CANABinALL](/posts/post-inspecao-canal-canabinall.html)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito como referencia de legado vivo / continuidad CEBRID** — Solange Nappo es el eslabón público entre el legado de Carlini y la formación actual en prevención y cannabis medicinal.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildSolangeNappoInspecaoPost() {
  const inspected = '2026-07-31';
  const { body, contentEn, contentEs } = buildSolangeNappoBodies(inspected);

  return pessoaPost({
    title: 'Inspeção: Profa. Solange Nappo — CEBRID',
    titleEn: 'Inspection: Prof. Solange Nappo — CEBRID',
    titleEs: 'Inspección: Profa. Solange Nappo — CEBRID',
    excerpt:
      'Ficha de legado vivo: Solange Nappo (UNIFESP) — coordenadora do CEBRID após Carlini; saúde colectiva, prevenção (PREVINA) e formação em cannabis medicinal.',
    excerptEn:
      'Living-legacy sheet: Solange Nappo (UNIFESP) — CEBRID coordinator after Carlini; collective health, prevention (PREVINA), and medicinal-cannabis training.',
    excerptEs:
      'Ficha de legado vivo: Solange Nappo (UNIFESP) — coordinadora del CEBRID tras Carlini; salud colectiva, prevención (PREVINA) y formación en cannabis medicinal.',
    slug: 'inspecao-solange-nappo',
    date: inspected + 'T20:00:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'Solange Nappo · legado',
    coverImage: '/imagens/inspecoes/solange-nappo-cover.jpg',
    sourceUrl: 'https://www.cebrid.com.br/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSolangeNappoInspecaoPost,
  buildSolangeNappoBodies
};
