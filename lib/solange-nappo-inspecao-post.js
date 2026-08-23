'use strict';

/**
 * Inspeção: Profa. Solange Nappo — CEBRID (legado-pessoas).
 * Continuidade da pesquisa no CEBRID após Carlini; coordenação do curso de extensão
 * UNIFESP/MovReCam; elo científico do laboratório.
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
  const portrait = '/imagens/inspecoes/solange-nappo-portrait.jpg';
  const coverNote =
    'Retrato da Profa. Dra. Solange Nappo. Imagem: [CEBRID — Equipe](https://www.cebrid.com.br/equipe/).';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const cebrid = '/posts/post-inspecao-cebrid.html';
  const eliana = '/posts/post-inspecao-eliana-rodrigues.html';
  const gabrielle = '/posts/post-inspecao-gabrielle-dainezi.html';
  const curso = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const canabinall = '/posts/post-inspecao-canal-canabinall.html';
  const ticao = '/posts/post-inspecao-padre-ticao.html';
  const sidarta = '/posts/post-inspecao-sidarta-ribeiro.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const hub = '/biblioteca/inspecoes/';
  const hubUnifesp = '/biblioteca/unifesp/';
  const portalPremio =
    'https://portal.unifesp.br/destaques/curso-sobre-cannabis-medicinal-da-unifesp-e-movrecam-ganha-premio-internacional';
  const cebridCurso = 'https://www.cebrid.com.br/curso-medicina-canabinoide/';
  const prodmais =
    'https://unifesp.br/prodmais/profile.php?lattesID=4675292090990088';

  const body = `## Escopo

Inspeção editorial e documental do papel público da **Profa. Dra. Solange Aparecida Nappo** — farmacêutica-bioquímica, professora da **UNIFESP** e **coordenadora do CEBRID** (Centro Brasileiro de Informações sobre Drogas Psicotrópicas). O recorte desta ficha não é currículo Lattes completo: é registar, com fontes institucionais públicas e com o **mérito que lhe é devido**, três eixos vivos — a **continuidade da pesquisa no [CEBRID](${cebrid})** após [Elisaldo Carlini](${carlini}); a **coordenação do curso de extensão** UNIFESP/MovReCam nomeada pelo [portal da universidade](${portalPremio}); e o **elo directo** com as linhas científicas deste laboratório.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em Prodmais/UNIFESP, FAPESP, páginas oficiais do [CEBRID](https://www.cebrid.com.br/) (equipe, cursos), o portal UNIFESP (prémio CannaPortugal 2025) e cruzamento com inspeções BudGanja já publicadas. **Sem afiliação** com a UNIFESP, o CEBRID, o MovReCam, a ABRAMD, a CAPES/UAB ou a FAP. Todo o mérito da coordenação científica, da pesquisa qualitativa e da formação pertence a Solange Nappo, às suas instituições e às equipas que lidera. **Ficha educativa — não substitui o Lattes nem aconselhamento clínico.**

![Profa. Solange Nappo](${portrait})

*${coverNote}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Solange Aparecida Nappo** |
| Formação | Farmácia e Bioquímica (USP, 1976) · Mestrado em Saúde Pública (USP, 1981) · Doutorado em Ciências (UNIFESP, 1996) |
| Instituição | Professora · **Coordenadora do CEBRID** (UNIFESP) · Pós-graduação em Medicina Preventiva · Ciências Farmacêuticas (Campus Diadema) |
| Linhas públicas | Saúde coletiva · estudos qualitativos · crack / cocaína / cannabis · dependência · vigilância sanitária / uso de medicamentos |
| Extensão SIEX / MovReCam | Nomeada pelo [portal UNIFESP](${portalPremio}) como uma das **coordenadoras** do curso «O Uso Terapêutico da *Cannabis sativa* L.», com [Eliana Rodrigues](${eliana}) e [Gabrielle Dainezi](${gabrielle}) |
| Formação CEBRID | Vice-coordenação do curso [Medicina Canabinoide](${cebridCurso}) (FAP/UNIFESP + CEBRID) · coordenação **PREVINA** (CAPES / UAB-UNIFESP / CEBRID) |
| Redes | Presidente da **ABRAMD** · co-fundadora do **GEFCaP** (cannabis e psicodélicos na farmácia) |
| Elo do laboratório | Nó CEBRID entre o legado de Carlini e as linhas científicas / formativas do Inspetor BudGanja |
| Data da inspeção | ${inspected} |

**O que é inspecionado:** a **continuidade viva** — não um currículo paper-a-paper. Duas casas formativas (extensão gratuita SIEX/MovReCam e Medicina Canabinoide do CEBRID) e uma linha de pesquisa em saúde colectiva; nenhuma apaga as outras.

## Por que esta inspeção existe

Na fila editorial: **continuidade dos trabalhos de pesquisa no CEBRID após o legado do Prof. Carlini**, a coordenação do curso de extensão da UNIFESP e o elo directo com as linhas científicas do laboratório. Sem esta ficha, a cadeia ficava incompleta — Carlini funda e dirige o centro; Nappo **sustenta, actualiza e ensina**. Não substitui [Carlini](${carlini}), [Ticão](${ticao}), [Eliana](${eliana}) nem [Gabrielle](${gabrielle}): **ocupa o nó institucional CEBRID** entre legado científico, extensão premiada e ofício deste laboratório.

## Hipóteses e método

- **H1:** Nappo opera como **guardiã institucional** do CEBRID — continuidade verificável da pesquisa e da informação pública após 35 anos de direção de Carlini.
- **H2:** o portal UNIFESP nomeia-a na coordenação do curso de extensão SIEX/MovReCam; a ficha SIEX 30063 lista [Eliana](${eliana}) como RTC — o ofício é **registar o crédito público sem colapsar os papéis**.
- **H3:** PREVINA e a vice-coordenação da Medicina Canabinoide ligam prevenção, farmácia e cannabis medicinal no mesmo eixo científico, complementar à extensão de periferia.
- **H4:** a pesquisa qualitativa (crack, cocaína, cannabis, medicamentos) é o elo com as linhas deste laboratório: saúde colectiva e redução de danos, não romantização.
- **Método:** (1) síntese biográfica institucional; (2) eixo CEBRID / pesquisa; (3) eixo extensão SIEX; (4) cruzamento com inspeções irmãs; (5) limites; (6) [Valeu !!!](${mantra}).

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1976 | Graduação em Farmácia e Bioquímica (USP). |
| 1981 | Mestrado em Saúde Pública (USP). |
| 1996 | Doutorado em Ciências (UNIFESP). |
| 1988 → | CEBRID em actividade na UNIFESP (fundação / missão pública sob Carlini). |
| Anos seguintes | Linha de investigação em saúde colectiva e estudos qualitativos sobre drogas psicotrópicas (crack, cocaína, cannabis) e vigilância sanitária. |
| 2018 → | Curso de extensão UNIFESP/MovReCam em escala nacional; Nappo figura na coordenação pública do projecto (portal UNIFESP). |
| Pós-2020 | Continuidade da coordenação do CEBRID após o rompimento geracional com Carlini (†2020) — liderança pública nas páginas do centro e dos cursos. |
| 2025 | Portal UNIFESP nomeia Nappo, Eliana e Gabrielle na coordenação do curso premiado (CannaPortugal Global Cannabis Awards). |
| Actual | Coordenação CEBRID · PREVINA · vice-coordenação Medicina Canabinoide · ABRAMD · GEFCaP. |

## Achados (mérito devido)

1. **Continuidade da pesquisa no CEBRID** — após Carlini, o centro permanece activo com investigação, boletins e formação; Nappo é a figura pública que ancora essa continuidade nas fontes institucionais.
2. **Coordenação do curso de extensão** — o [portal UNIFESP](${portalPremio}) cita-a expressamente com Eliana e Gabrielle; omiti-la na tríade seria falhar o crédito. A ficha SIEX do XIV curso lista Eliana como RTC: duas fontes, papéis distintos, ambos públicos.
3. **Duas casas formativas** — PREVINA (professores da rede pública) e Medicina Canabinoide (profissionais de saúde) no CEBRID; extensão SIEX/MovReCam na periferia. Mesmo eixo científico, ofertas diferentes.
4. **Olhar de farmácia e saúde colectiva** — o perfil não é só «pró-cannabis»: inclui dependência, crack/cocaína e uso racional de medicamentos — o realismo que as linhas deste laboratório precisam para não romantizar.
5. **Limites honestos** — esta ficha não inventa afiliação BudGanja–CEBRID nem substitui o Lattes; recomenda CEBRID e as inspeções irmãs como **ponto de partida** de estudo.

## Duas casas, um eixo científico

| Casa | Papel público de Nappo | Recorte BudGanja |
|------|------------------------|------------------|
| **[CEBRID](${cebrid})** | Coordenação do centro · pesquisa qualitativa · PREVINA · vice-coordenação [Medicina Canabinoide](${cebridCurso}) | Continuidade após [Carlini](${carlini}) |
| **Extensão SIEX / [MovReCam](${movrecam})** | Nomeada pelo portal UNIFESP como coordenadora do [curso](${curso}), com [Eliana](${eliana}) (RTC/CEE) e [Gabrielle](${gabrielle}) | Elo com o XIV Curso e com este laboratório |

## Tríade de coordenação (extensão premiada)

| Nó | Foco |
|----|------|
| [Eliana Rodrigues](${eliana}) | RTC / CEE / [CANABinALL](${canabinall}) — ciência etnobotânica e divulgação |
| **Solange Nappo** | CEBRID / prevenção / farmácia — continuidade científica após Carlini |
| [Gabrielle Dainezi](${gabrielle}) | Coordenação / representação do projecto de extensão (CannaPortugal 2025) |

## Complementaridade com o Inspetor BudGanja

| Tema Nappo / CEBRID | Recurso BudGanja |
|---------------------|------------------|
| Fundação e mérito científico | [Elisaldo Carlini](${carlini}) · [CEBRID](${cebrid}) |
| Extensão / periferia / MovReCam | [Curso UNIFESP](${curso}) · [MovReCam](${movrecam}) · [Hub UNIFESP](${hubUnifesp}) |
| Coordenação irmã | [Eliana Rodrigues](${eliana}) · [Gabrielle Dainezi](${gabrielle}) |
| Divulgação científica UNIFESP | [CANABinALL](${canabinall}) |
| Neurociência pública (convidado) | [Sidarta Ribeiro](${sidarta}) |
| Origem pastoral do curso de periferia | [Padre Ticão](${ticao}) |
| Mantra de ofício | [Valeu !!!](${mantra}) |

## Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **ao continuar um laboratório sem apagar quem o fundou**, hoje |
| Anti-armadilha | «Nappo = Carlini» = colapso · «Nappo sustenta o CEBRID e ensina na extensão, com papéis públicos distintos» = ofício |
| Par vivo | [Carlini](${carlini}) · [CEBRID](${cebrid}) · [Eliana](${eliana}) · [Curso UNIFESP](${curso}) |

**Veredicto:** Nappo fez o melhor **também ao não deixar o centro virar arquivo** — pesquisa, prevenção e formação continuam com nome, página e curso.

## Créditos e referências

**Todo o mérito da coordenação do CEBRID, da pesquisa e dos cursos citados pertence à Profa. Solange Nappo, às suas instituições e às equipas do CEBRID/UNIFESP/MovReCam.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [Prodmais UNIFESP — Solange Aparecida Nappo](${prodmais})
- [FAPESP — ficha da pesquisadora](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — site oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina Canabinoide](${cebridCurso})
- [CEBRID — equipe](https://www.cebrid.com.br/equipe/)
- [Portal UNIFESP — curso ganha prémio internacional](${portalPremio})
- Cruzamentos internos: [Carlini](${carlini}) · [CEBRID](${cebrid}) · [curso UNIFESP](${curso}) · [Eliana](${eliana}) · [Gabrielle](${gabrielle})

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito como referência de legado vivo / continuidade CEBRID** — Solange Nappo é o elo público entre o legado de Carlini, a formação actual em prevenção e cannabis medicinal, e as linhas científicas deste laboratório.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](${carlini}) · [Curso UNIFESP](${curso}) · [Valeu !!!](${mantra}) · [Todas as inspeções](${hub})`;

  const contentEn = `## Scope

Editorial and documentary inspection of the public role of **Prof. Dr. Solange Aparecida Nappo** — pharmacist-biochemist, **UNIFESP** professor and **coordinator of CEBRID** (Brazilian Center for Information on Psychotropic Drugs). This sheet is not a full Lattes CV: it records, from public institutional sources and with the **credit she is due**, three living axes — **research continuity at [CEBRID](${cebrid})** after [Elisaldo Carlini](${carlini}); **coordination of the UNIFESP/MovReCam extension course** named by the [university portal](${portalPremio}); and a **direct link** to this laboratory’s scientific lines.

> **Methodological note:** independent audit by Inspector BudGanja based on Prodmais/UNIFESP, FAPESP, official [CEBRID](https://www.cebrid.com.br/) pages (team, courses), the UNIFESP portal (CannaPortugal 2025 award), and cross-checks with published BudGanja inspections. **No affiliation** with UNIFESP, CEBRID, MovReCam, ABRAMD, CAPES/UAB, or FAP. All credit for scientific coordination, qualitative research, and training belongs to Solange Nappo, her institutions, and the teams she leads. **Educational sheet — does not replace a Lattes CV or clinical advice.**

![Prof. Solange Nappo](${portrait})

*Portrait of Prof. Dr. Solange Nappo. Image: [CEBRID — Team](https://www.cebrid.com.br/equipe/).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Solange Aparecida Nappo** |
| Education | Pharmacy and Biochemistry (USP, 1976) · M.Sc. Public Health (USP, 1981) · Ph.D. Sciences (UNIFESP, 1996) |
| Institution | Professor · **CEBRID coordinator** (UNIFESP) · Preventive Medicine graduate program · Pharmaceutical Sciences (Diadema campus) |
| Public lines | Collective health · qualitative studies · crack / cocaine / cannabis · dependence · sanitary surveillance / medicine use |
| SIEX / MovReCam extension | Named by the [UNIFESP portal](${portalPremio}) as one of the **coordinators** of “Therapeutic Use of *Cannabis sativa* L.”, with [Eliana Rodrigues](${eliana}) and [Gabrielle Dainezi](${gabrielle}) |
| CEBRID training | Vice-coordination of the [Cannabinoid Medicine](${cebridCurso}) course (FAP/UNIFESP + CEBRID) · **PREVINA** coordination (CAPES / UAB-UNIFESP / CEBRID) |
| Networks | President of **ABRAMD** · co-founder of **GEFCaP** (cannabis and psychedelics in pharmacy) |
| Lab link | CEBRID node between Carlini’s legacy and Inspector BudGanja’s scientific / training lines |
| Inspection date | ${inspected} |

**What is inspected:** **living continuity** — not a paper-by-paper CV. Two training houses (free SIEX/MovReCam extension and CEBRID Cannabinoid Medicine) plus a collective-health research line; none erases the others.

## Why this inspection exists

Editorial queue: **continuity of research work at CEBRID after Prof. Carlini’s legacy**, coordination of the UNIFESP extension course, and a direct link to the laboratory’s scientific lines. Without this sheet the chain was incomplete — Carlini founds and directs the center; Nappo **sustains, updates, and teaches**. She does not replace [Carlini](${carlini}), [Ticão](${ticao}), [Eliana](${eliana}), or [Gabrielle](${gabrielle}): she **holds the CEBRID institutional node** between scientific legacy, award-winning extension, and this lab’s craft.

## Hypotheses and method

- **H1:** Nappo acts as **institutional guardian** of CEBRID — verifiable continuity of research and public information after Carlini’s 35-year leadership.
- **H2:** the UNIFESP portal names her in the SIEX/MovReCam extension-course coordination; SIEX 30063 lists [Eliana](${eliana}) as RTC — the craft is **recording public credit without collapsing roles**.
- **H3:** PREVINA and Cannabinoid Medicine vice-coordination link prevention, pharmacy, and medicinal cannabis on one scientific axis, complementary to the periphery extension.
- **H4:** qualitative research (crack, cocaine, cannabis, medicines) is the link to this lab’s lines: collective health and harm reduction, not romanticization.
- **Method:** (1) institutional biographical summary; (2) CEBRID / research axis; (3) SIEX extension axis; (4) sibling inspections; (5) limits; (6) [Valeu !!!](${mantra}).

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 1976 | Pharmacy and Biochemistry degree (USP). |
| 1981 | M.Sc. Public Health (USP). |
| 1996 | Ph.D. Sciences (UNIFESP). |
| 1988 → | CEBRID active at UNIFESP (foundation / public mission under Carlini). |
| Following years | Collective-health and qualitative research on psychotropic drugs and sanitary surveillance. |
| 2018 → | UNIFESP/MovReCam extension course at national scale; Nappo appears in the project’s public coordination (UNIFESP portal). |
| Post-2020 | Continuity of CEBRID coordination after the generational break with Carlini (†2020). |
| 2025 | UNIFESP portal names Nappo, Eliana, and Gabrielle in the coordination of the award-winning course (CannaPortugal). |
| Current | CEBRID coordination · PREVINA · Cannabinoid Medicine vice-coordination · ABRAMD · GEFCaP. |

## Findings (credit due)

1. **CEBRID research continuity** — after Carlini, the center remains active with research, bulletins, and training; Nappo is the public figure anchoring that continuity in institutional sources.
2. **Extension-course coordination** — the [UNIFESP portal](${portalPremio}) names her expressly with Eliana and Gabrielle. The XIV SIEX sheet lists Eliana as RTC: two sources, distinct public roles.
3. **Two training houses** — PREVINA (public-school teachers) and Cannabinoid Medicine (health professionals) at CEBRID; SIEX/MovReCam extension in the periphery.
4. **Pharmacy and collective-health lens** — the profile is not only “pro-cannabis”: it includes dependence, crack/cocaine, and rational medicine use.
5. **Honest limits** — this sheet invents no BudGanja–CEBRID affiliation; it recommends CEBRID and sibling inspections as a **study starting point**.

## Two houses, one scientific axis

| House | Nappo’s public role | BudGanja cut |
|-------|---------------------|--------------|
| **[CEBRID](${cebrid})** | Center coordination · qualitative research · PREVINA · [Cannabinoid Medicine](${cebridCurso}) vice-coordination | Continuity after [Carlini](${carlini}) |
| **SIEX / [MovReCam](${movrecam}) extension** | Named by the UNIFESP portal as coordinator of the [course](${curso}), with [Eliana](${eliana}) (RTC/CEE) and [Gabrielle](${gabrielle}) | Link to the 14th Course and this laboratory |

## Coordination triad (award-winning extension)

| Node | Focus |
|------|-------|
| [Eliana Rodrigues](${eliana}) | RTC / CEE / [CANABinALL](${canabinall}) — ethnobotanical science and outreach |
| **Solange Nappo** | CEBRID / prevention / pharmacy — scientific continuity after Carlini |
| [Gabrielle Dainezi](${gabrielle}) | Coordination / representation of the extension project (CannaPortugal 2025) |

## Complementarity with Inspector BudGanja

| Nappo / CEBRID theme | BudGanja resource |
|----------------------|-------------------|
| Scientific founding and merit | [Elisaldo Carlini](${carlini}) · [CEBRID](${cebrid}) |
| Extension / periphery / MovReCam | [UNIFESP course](${curso}) · [MovReCam](${movrecam}) · [UNIFESP hub](${hubUnifesp}) |
| Sister coordination | [Eliana Rodrigues](${eliana}) · [Gabrielle Dainezi](${gabrielle}) |
| UNIFESP science outreach | [CANABinALL](${canabinall}) |
| Public neuroscience (guest) | [Sidarta Ribeiro](${sidarta}) |
| Pastoral origin of the periphery course | [Father Ticão](${ticao}) |
| Craft mantra | [Valeu !!!](${mantra}) |

## Valeu !!!

| Layer | Link |
|-------|------|
| Mantra | [Valeu !!!](${mantra}) — the best possible **by continuing a laboratory without erasing who founded it**, today |
| Anti-trap | “Nappo = Carlini” = collapse · “Nappo sustains CEBRID and teaches in the extension, with distinct public roles” = craft |
| Living pair | [Carlini](${carlini}) · [CEBRID](${cebrid}) · [Eliana](${eliana}) · [UNIFESP course](${curso}) |

**Verdict:** Nappo also did her best **by not letting the center become an archive** — research, prevention, and training still have a name, a page, and a course.

## Credits and references

**All credit for CEBRID coordination, research, and the cited courses belongs to Prof. Solange Nappo, her institutions, and the CEBRID/UNIFESP/MovReCam teams.** This inspection only documents and recommends — without appropriation.

Sources consulted (non-exhaustive):

- [Prodmais UNIFESP — Solange Aparecida Nappo](${prodmais})
- [FAPESP — researcher profile](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — official site](https://www.cebrid.com.br/)
- [CEBRID — Cannabinoid Medicine](${cebridCurso})
- [CEBRID — team](https://www.cebrid.com.br/equipe/)
- [UNIFESP portal — course wins international award](${portalPremio})
- Internal cross-links: [Carlini](${carlini}) · [CEBRID](${cebrid}) · [UNIFESP course](${curso}) · [Eliana](${eliana}) · [Gabrielle](${gabrielle})

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with merit as a living-legacy / CEBRID-continuity reference** — Solange Nappo is the public link between Carlini’s legacy, current prevention and medicinal-cannabis training, and this laboratory’s scientific lines.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](${carlini}) · [UNIFESP course](${curso}) · [Valeu !!!](${mantra}) · [All inspections](${hub})`;

  const contentEs = `## Alcance

Inspección editorial y documental del papel público de la **Profa. Dra. Solange Aparecida Nappo** — farmacéutica-bioquímica, profesora de la **UNIFESP** y **coordinadora del CEBRID** (Centro Brasileño de Informaciones sobre Drogas Psicotrópicas). El recorte de esta ficha no es un Lattes completo: es registrar, con fuentes institucionales públicas y con el **mérito que le corresponde**, tres ejes vivos — la **continuidad de la investigación en el [CEBRID](${cebrid})** tras [Elisaldo Carlini](${carlini}); la **coordinación del curso de extensión** UNIFESP/MovReCam nombrada por el [portal de la universidad](${portalPremio}); y el **vínculo directo** con las líneas científicas de este laboratorio.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en Prodmais/UNIFESP, FAPESP, páginas oficiales del [CEBRID](https://www.cebrid.com.br/) (equipo, cursos), el portal UNIFESP (premio CannaPortugal 2025) y cruce con inspecciones BudGanja ya publicadas. **Sin afiliación** con la UNIFESP, el CEBRID, el MovReCam, la ABRAMD, CAPES/UAB o la FAP. Todo el mérito de la coordinación científica, la investigación cualitativa y la formación pertenece a Solange Nappo, a sus instituciones y a los equipos que lidera. **Ficha educativa — no sustituye el Lattes ni consejo clínico.**

![Profa. Solange Nappo](${portrait})

*Retrato de la Profa. Dra. Solange Nappo. Imagen: [CEBRID — Equipo](https://www.cebrid.com.br/equipe/).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Solange Aparecida Nappo** |
| Formación | Farmacia y Bioquímica (USP, 1976) · Maestría en Salud Pública (USP, 1981) · Doctorado en Ciencias (UNIFESP, 1996) |
| Institución | Profesora · **Coordinadora del CEBRID** (UNIFESP) · Posgrado en Medicina Preventiva · Ciencias Farmacéuticas (Campus Diadema) |
| Líneas públicas | Salud colectiva · estudios cualitativos · crack / cocaína / cannabis · dependencia · vigilancia sanitaria / uso de medicamentos |
| Extensión SIEX / MovReCam | Nombrada por el [portal UNIFESP](${portalPremio}) como una de las **coordinadoras** del curso «El uso terapéutico de *Cannabis sativa* L.», con [Eliana Rodrigues](${eliana}) y [Gabrielle Dainezi](${gabrielle}) |
| Formación CEBRID | Vice-coordinación del curso [Medicina cannabinóide](${cebridCurso}) (FAP/UNIFESP + CEBRID) · coordinación **PREVINA** (CAPES / UAB-UNIFESP / CEBRID) |
| Redes | Presidenta de la **ABRAMD** · cofundadora del **GEFCaP** |
| Eslabón del laboratorio | Nodo CEBRID entre el legado de Carlini y las líneas científicas / formativas del Inspector BudGanja |
| Fecha de la inspección | ${inspected} |

**Qué se inspecciona:** la **continuidad viva** — no un currículum paper a paper. Dos casas formativas (extensión gratuita SIEX/MovReCam y Medicina cannabinóide del CEBRID) y una línea de investigación en salud colectiva.

## Por qué existe esta inspección

En la cola editorial: **continuidad de los trabajos de investigación en el CEBRID tras el legado del Prof. Carlini**, la coordinación del curso de extensión de la UNIFESP y el vínculo directo con las líneas científicas del laboratorio. Sin esta ficha la cadena quedaba incompleta — Carlini funda y dirige el centro; Nappo **sostiene, actualiza y enseña**. No sustituye a [Carlini](${carlini}), [Ticão](${ticao}), [Eliana](${eliana}) ni [Gabrielle](${gabrielle}): **ocupa el nodo institucional CEBRID**.

## Hipótesis y método

- **H1:** Nappo opera como **guardiana institucional** del CEBRID — continuidad verificable de la investigación y de la información pública tras 35 años de dirección de Carlini.
- **H2:** el portal UNIFESP la nombra en la coordinación del curso de extensión SIEX/MovReCam; la ficha SIEX 30063 lista a [Eliana](${eliana}) como RTC — el oficio es **registrar el crédito público sin colapsar los papeles**.
- **H3:** PREVINA y la vice-coordinación de Medicina cannabinóide unen prevención, farmacia y cannabis medicinal en un mismo eje científico.
- **H4:** la investigación cualitativa (crack, cocaína, cannabis, medicamentos) es el eslabón con las líneas de este laboratorio: salud colectiva, no romantización.
- **Método:** (1) síntesis biográfica institucional; (2) eje CEBRID / investigación; (3) eje extensión SIEX; (4) inspecciones hermanas; (5) límites; (6) [¡Valeu !!!](${mantra}).

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| 1976 | Graduación en Farmacia y Bioquímica (USP). |
| 1981 | Maestría en Salud Pública (USP). |
| 1996 | Doctorado en Ciencias (UNIFESP). |
| 1988 → | CEBRID en actividad en la UNIFESP (misión pública bajo Carlini). |
| Años siguientes | Línea en salud colectiva y estudios cualitativos sobre drogas psicotrópicas y vigilancia sanitaria. |
| 2018 → | Curso de extensión UNIFESP/MovReCam a escala nacional; Nappo figura en la coordinación pública del proyecto (portal UNIFESP). |
| Post-2020 | Continuidad de la coordinación del CEBRID tras el corte generacional con Carlini (†2020). |
| 2025 | El portal UNIFESP nombra a Nappo, Eliana y Gabrielle en la coordinación del curso premiado (CannaPortugal). |
| Actual | Coordinación CEBRID · PREVINA · vice-coordinación Medicina cannabinóide · ABRAMD · GEFCaP. |

## Hallazgos (mérito debido)

1. **Continuidad de la investigación en el CEBRID** — tras Carlini, el centro sigue activo; Nappo ancla esa continuidad en fuentes institucionales.
2. **Coordinación del curso de extensión** — el [portal UNIFESP](${portalPremio}) la cita expresamente con Eliana y Gabrielle. La ficha SIEX del XIV curso lista a Eliana como RTC: dos fuentes, papeles públicos distintos.
3. **Dos casas formativas** — PREVINA y Medicina cannabinóide en el CEBRID; extensión SIEX/MovReCam en la periferia.
4. **Mirada de farmacia y salud colectiva** — el perfil no es solo «pro-cannabis»: incluye dependencia, crack/cocaína y uso racional de medicamentos.
5. **Límites honestos** — esta ficha no inventa afiliación BudGanja–CEBRID; recomienda CEBRID e inspecciones hermanas como **punto de partida**.

## Dos casas, un eje científico

| Casa | Papel público de Nappo | Recorte BudGanja |
|------|------------------------|------------------|
| **[CEBRID](${cebrid})** | Coordinación del centro · investigación cualitativa · PREVINA · vice-coordinación [Medicina cannabinóide](${cebridCurso}) | Continuidad tras [Carlini](${carlini}) |
| **Extensión SIEX / [MovReCam](${movrecam})** | Nombrada por el portal UNIFESP como coordinadora del [curso](${curso}), con [Eliana](${eliana}) (RTC/CEE) y [Gabrielle](${gabrielle}) | Vínculo con el XIV Curso y con este laboratorio |

## Tríada de coordinación (extensión premiada)

| Nodo | Foco |
|------|------|
| [Eliana Rodrigues](${eliana}) | RTC / CEE / [CANABinALL](${canabinall}) — ciencia etnobotánica y divulgación |
| **Solange Nappo** | CEBRID / prevención / farmacia — continuidad científica tras Carlini |
| [Gabrielle Dainezi](${gabrielle}) | Coordinación / representación del proyecto de extensión (CannaPortugal 2025) |

## Complementariedad con el Inspector BudGanja

| Tema Nappo / CEBRID | Recurso BudGanja |
|---------------------|------------------|
| Fundación y mérito científico | [Elisaldo Carlini](${carlini}) · [CEBRID](${cebrid}) |
| Extensión / periferia / MovReCam | [Curso UNIFESP](${curso}) · [MovReCam](${movrecam}) · [Hub UNIFESP](${hubUnifesp}) |
| Coordinación hermana | [Eliana Rodrigues](${eliana}) · [Gabrielle Dainezi](${gabrielle}) |
| Divulgación científica UNIFESP | [CANABinALL](${canabinall}) |
| Neurociencia pública (invitado) | [Sidarta Ribeiro](${sidarta}) |
| Origen pastoral del curso de periferia | [Padre Ticão](${ticao}) |
| Mantra de oficio | [¡Valeu !!!](${mantra}) |

## ¡Valeu !!!

| Capa | Ligazón |
|------|---------|
| Mantra | [¡Valeu !!!](${mantra}) — lo mejor posible **al continuar un laboratorio sin borrar a quien lo fundó**, hoy |
| Anti-trampa | «Nappo = Carlini» = colapso · «Nappo sostiene el CEBRID y enseña en la extensión, con papeles públicos distintos» = oficio |
| Par vivo | [Carlini](${carlini}) · [CEBRID](${cebrid}) · [Eliana](${eliana}) · [Curso UNIFESP](${curso}) |

**Veredicto:** Nappo hizo lo mejor **también al no dejar que el centro se volviera archivo** — investigación, prevención y formación siguen con nombre, página y curso.

## Créditos y referencias

**Todo el mérito de la coordinación del CEBRID, de la investigación y de los cursos citados pertenece a la Profa. Solange Nappo, a sus instituciones y a los equipos del CEBRID/UNIFESP/MovReCam.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [Prodmais UNIFESP — Solange Aparecida Nappo](${prodmais})
- [FAPESP — ficha de la investigadora](https://bv.fapesp.br/pt/pesquisador/2034/solange-aparecida-nappo/)
- [CEBRID — sitio oficial](https://www.cebrid.com.br/)
- [CEBRID — Medicina cannabinóide](${cebridCurso})
- [CEBRID — equipo](https://www.cebrid.com.br/equipe/)
- [Portal UNIFESP — el curso gana premio internacional](${portalPremio})
- Cruces internos: [Carlini](${carlini}) · [CEBRID](${cebrid}) · [curso UNIFESP](${curso}) · [Eliana](${eliana}) · [Gabrielle](${gabrielle})

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito como referencia de legado vivo / continuidad CEBRID** — Solange Nappo es el eslabón público entre el legado de Carlini, la formación actual en prevención y cannabis medicinal, y las líneas científicas de este laboratorio.

[CEBRID](https://www.cebrid.com.br/) · [Carlini](${carlini}) · [Curso UNIFESP](${curso}) · [¡Valeu !!!](${mantra}) · [Todas las inspecciones](${hub})`;

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
      'Ficha de legado vivo: Solange Nappo (UNIFESP) — continuidade do CEBRID após Carlini, coordenação do curso de extensão SIEX/MovReCam e elo científico do laboratório.',
    excerptEn:
      'Living-legacy sheet: Solange Nappo (UNIFESP) — CEBRID continuity after Carlini, SIEX/MovReCam extension-course coordination, and a scientific link for the lab.',
    excerptEs:
      'Ficha de legado vivo: Solange Nappo (UNIFESP) — continuidad del CEBRID tras Carlini, coordinación del curso de extensión SIEX/MovReCam y eslabón científico del laboratorio.',
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
