'use strict';

/**
 * Inspeção: Dr. Sidarta Ribeiro — Revolução Canabinóide (legado-pessoas).
 * Aulas catalogadas no hub MovReCam / videos-hub.json.
 */

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

const SIDARTA_VIDEOS = {
  revolucao4: 's1hXNAGKUww',
  class5en: 'fcWRuPDoD8s',
  aula12: 'HOYas8rxqlo'
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

function buildSidartaRibeiroBodies(inspected) {
  const v4 = SIDARTA_VIDEOS.revolucao4;
  const vEn = SIDARTA_VIDEOS.class5en;
  const v12 = SIDARTA_VIDEOS.aula12;
  const portrait = '/imagens/inspecoes/sidarta-ribeiro-portrait.jpg';
  const portraitCredit =
    'Retrato de Sidarta Ribeiro (2021). Foto: [Luiza Mugnol Ugarte](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).';

  const body = `## Escopo

Inspeção editorial e documental do papel público do **Dr. Sidarta Tollendal Gomes Ribeiro** (Brasília, 16 de abril de 1971) — neurocientista, professor titular e um dos fundadores do **Instituto do Cérebro da UFRN (ICe)**, escritor e voz recorrente na defesa da cannabis medicinal com base em evidência. O recorte desta ficha não é biografia académica completa: é registar, com fontes públicas e com o **mérito que lhe é devido**, a ponte entre a sua divulgação científica («Revolução Canabinóide») e o acervo do [curso UNIFESP / MovReCam](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) já inspecionado pelo laboratório.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em biografias públicas (Wikipedia, Museu do Amanhã), entrevistas (Kaya Mind, VEJA, Trip) e no catálogo oficial do [canal MovReCam](https://www.youtube.com/@MovReCam) espelhado em [Vídeos · MovReCam](/videos/?channel=movrecam). **Sem afiliação** com a UFRN, o ICe, a SBPC, a Fiocruz, o MovReCam ou editoras dos livros citados. Todo o mérito da obra científica, da divulgação e das aulas pertence a Sidarta Ribeiro, às suas instituições e aos projetos que o convidam.

![Dr. Sidarta Ribeiro](${portrait})

*${portraitCredit}*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Sidarta Tollendal Gomes Ribeiro** |
| Nascimento | 16 de abril de 1971, Brasília (DF) |
| Formação | Biologia (UnB, 1993) · Mestrado em Biofísica (UFRJ, 1994) · Ph.D. Comportamento Animal (Rockefeller, 2000) · Pós-doutorado em Neurofisiologia (Duke, 2005) |
| Instituição | Professor titular · fundador / vice-diretor do **Instituto do Cérebro (ICe-UFRN)** |
| Linhas públicas | Sono, sonho e memória · cannabis e política de drogas · psicodélicos · neuroeducação |
| Livros (seleção) | *Maconha, Cérebro e Saúde* (2007, c/ Renato Malcher-Lopes) · *O Oráculo da Noite* (2019) · *As Flores do Bem* (2023) |
| Acervo MovReCam | Aulas «Revolução Canabinóide» (PT e EN) catalogadas no hub de vídeos |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila editorial do laboratório, Sidarta já constava como sugestão de legado: as aulas **Revolução Canabinóide** estão no arquivo MovReCam que o site documenta. Omiti-lo seria falhar o método BudGanja — **crédito a quem merece** — no elo entre neurociência pública contemporânea e a grade de extensão UNIFESP. Não substitui [Carlini](/posts/post-inspecao-elisaldo-carlini.html) nem [Ticão](/posts/post-inspecao-padre-ticao.html): **complementa** a cadeia (ciência → pastoral → divulgação viva).

## Hipóteses e método

- **H1:** Sidarta opera como **tradutor público** do sistema endocanabinoide e da história da planta — linguagem acessível sem abandonar a bancada.
- **H2:** a presença repetida no MovReCam («Revolução Canabinóide») confirma o papel de convidado-chave da extensão, não de figura periférica.
- **H3:** livros e entrevistas ligam evidência, política de drogas e experiência pessoal — útil ao estudante do curso, desde que lidos com limites éticos claros (não substituem orientação clínica).
- **Método:** (1) síntese biográfica pública; (2) eixo cannabis/divulgação; (3) embeds das aulas MovReCam catalogadas; (4) cruzamento com inspeções BudGanja; (5) status de mérito.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1971 | Nasce em Brasília. |
| 1993–2005 | UnB → UFRJ → Rockefeller (Ph.D.) → Duke (pós-doutorado). |
| ~2005–2011 | Integra o projecto de repatriação de neurocientistas que origina o ICe-UFRN (e o contexto IINN-ELS); em 2011 participa da inauguração do Instituto do Cérebro. |
| 2007 | Publica *Maconha, Cérebro e Saúde* (c/ Renato Malcher-Lopes) — divulgação científica antiproibicionista baseada em evidência. |
| 2009– | SBNeC, Pew Fellows, LA School, Plataforma Brasileira de Política de Drogas, SBPC, Academia de Ciências da América Latina (ACAL), entre outros mandatos públicos. |
| 2019–2023 | *O Oráculo da Noite*; *Sonho Manifesto*; *As Flores do Bem* — cannabis como «antibiótico do século XXI» no debate público. |
| Acervo MovReCam | Aulas «Revolução Canabinóide» (edições em português e inglês) e participação em aula combinada (câncer / revolução). |
| 2022–2023 | Medalha Noilde Ramalho (ALRN) · Medalha Pedro Ernesto (CMRJ) — reconhecimento ligado à educação e à cannabis medicinal. |

## Achados (mérito devido)

1. **Ponte neurociência ↔ sociedade** — Sidarta torna o sistema endocanabinoide e a história da domesticação da planta inteligíveis para o público leigo sem diluir o rigor — exactamente o tipo de voz que um curso de extensão precisa.
2. **Presença verificável no MovReCam** — pelo menos três vídeos catalogados no hub BudGanja citam-no explicitamente; a «Revolução Canabinóide» é eixo temático, não menção ocasional.
3. **Continuidade editorial** — de *Maconha, Cérebro e Saúde* (2007) a *As Flores do Bem* (2023), mantém a linha de desmistificar falácias e pressionar por regulamentação baseada em evidência.
4. **Instituição no Nordeste** — o ICe-UFRN e a rede de pós-graduação em Natal mostram que a referência não é só «palestra de capital»: há laboratório, formação e extensão.
5. **Limites honestos** — esta ficha não avalia papers um a um nem endossa posições políticas; recomenda as aulas e os livros como **material de estudo complementar** ao SIEX e às inspeções de canal/curso.

## Aulas «Revolução Canabinóide» no acervo MovReCam

Três registos públicos merecem destaque (IDs do [hub de vídeos](/videos/?channel=movrecam)):

**[4ª Aula — Revolução Canabinóide — Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${v4})**

@youtube ${v4}

**[Class 1 — 5th Course — Cannabinoid Revolution, Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${vEn})** (edição em inglês)

@youtube ${vEn}

**[12ª Aula — Câncer (Dra. Paula Toledo) / Revolução Canabinóide (Dr. Sidarta Ribeiro)](https://www.youtube.com/watch?v=${v12})**

@youtube ${v12}

## Complementaridade com o Inspetor BudGanja

| Tema Sidarta | Recurso BudGanja |
|--------------|------------------|
| Aulas no arquivo de extensão | [Inspeção: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Vídeos · MovReCam](/videos/?channel=movrecam) |
| Curso que as enquadra | [Inspeção: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Hub UNIFESP](/biblioteca/unifesp/) |
| Raiz científica / pastoral | [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Divulgação científica UNIFESP (parceira) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Estudo prático (fora do foco clínico de Sidarta) | [Ferramentas](/calculadoras/) · [Diário](/cultivo/) |

## Créditos e referências

**Todo o mérito da obra científica, da divulgação e das aulas «Revolução Canabinóide» pertence ao Dr. Sidarta Ribeiro, às suas instituições e ao MovReCam/UNIFESP que as transmitem.** Esta inspeção apenas documenta e recomenda — sem apropriação.

Fontes consultadas (não exaustivo):

- [Wikipedia — Sidarta Ribeiro](https://pt.wikipedia.org/wiki/Sidarta_Ribeiro)
- [Museu do Amanhã — ficha Sidarta Ribeiro](https://acervo.museudoamanha.org.br/referencias/pessoas/941/sidarta-ribeiro)
- [Kaya Mind — entrevista](https://kayamind.com/entrevista-sidarta-ribeiro/)
- [VEJA — legislação e *As Flores do Bem*](https://veja.abril.com.br/ciencia/o-brasil-esta-bem-atrasado-na-legislacao-sobre-maconha/)
- [Trip — sonho, memória e maconha](https://revistatrip.uol.com.br/trip-fm/sidarta-ribeiro-sonho-memoria-e-maconha)
- [MovReCam](https://www.youtube.com/@MovReCam) · catálogo interno BudGanja (\`videos-hub.json\`)
- Retrato: [File:Sidarta Ribeiro.jpg](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) (Luiza Mugnol Ugarte, CC BY-SA 4.0)

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente)

## Status

**Aprovado com mérito como referência de legado vivo / divulgação neurocientífica** — Sidarta Ribeiro é elo público entre evidência endocanabinoide, política de drogas e a grade MovReCam. Quem assiste às aulas «Revolução Canabinóide» no [hub de vídeos](/videos/?channel=movrecam) encontra a voz que a sugestão editorial do laboratório já apontava.

[▶ 4ª Aula](https://www.youtube.com/watch?v=${v4}) · [▶ Class 1 (EN)](https://www.youtube.com/watch?v=${vEn}) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial and documentary inspection of the public role of **Dr. Sidarta Tollendal Gomes Ribeiro** (Brasília, 16 April 1971) — neuroscientist, full professor and co-founder of the **UFRN Brain Institute (ICe)**, author, and a recurring voice for evidence-based medicinal cannabis. This sheet is not a full academic biography: it records, from public sources and with the **credit he is due**, the bridge between his science communication (“Cannabinoid Revolution”) and the [UNIFESP / MovReCam course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) archive already audited by the laboratory.

> **Methodological note:** independent audit by Inspector BudGanja based on public biographies (Wikipedia, Museum of Tomorrow), interviews (Kaya Mind, VEJA, Trip), and the official [MovReCam](https://www.youtube.com/@MovReCam) catalog mirrored in [Videos · MovReCam](/videos/?channel=movrecam). **No affiliation** with UFRN, ICe, SBPC, Fiocruz, MovReCam, or the publishers of the cited books. All credit for the scientific work, outreach, and lectures belongs to Sidarta Ribeiro, his institutions, and the projects that invite him.

![Dr. Sidarta Ribeiro](${portrait})

*Portrait of Sidarta Ribeiro (2021). Photo: [Luiza Mugnol Ugarte](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).*

## Inspected subject

| Field | Value |
|-------|-------|
| Name | **Sidarta Tollendal Gomes Ribeiro** |
| Birth | 16 April 1971, Brasília (DF) |
| Education | Biology (UnB, 1993) · M.Sc. Biophysics (UFRJ, 1994) · Ph.D. Animal Behavior (Rockefeller, 2000) · Postdoc Neurophysiology (Duke, 2005) |
| Institution | Full professor · co-founder / vice-director of the **Brain Institute (ICe-UFRN)** |
| Public lines | Sleep, dream and memory · cannabis and drug policy · psychedelics · neuroeducation |
| Books (selection) | *Maconha, Cérebro e Saúde* (2007, with Renato Malcher-Lopes) · *O Oráculo da Noite* (2019) · *As Flores do Bem* (2023) |
| MovReCam archive | “Cannabinoid Revolution” lectures (PT and EN) catalogued in the video hub |
| Inspection date | ${inspected} |

## Why this inspection exists

In the lab’s editorial queue, Sidarta was already listed as a legacy suggestion: the **Cannabinoid Revolution** lectures sit in the MovReCam archive this site documents. Leaving him out would fail the BudGanja method — **credit where credit is due** — on the link between contemporary public neuroscience and the UNIFESP extension grid. He does not replace [Carlini](/posts/post-inspecao-elisaldo-carlini.html) or [Ticão](/posts/post-inspecao-padre-ticao.html): he **complements** the chain (science → pastoral work → living outreach).

## Hypotheses and method

- **H1:** Sidarta acts as a **public translator** of the endocannabinoid system and the plant’s history — accessible language without leaving the bench.
- **H2:** repeated MovReCam presence (“Cannabinoid Revolution”) confirms a key guest role in the extension course, not a peripheral mention.
- **H3:** books and interviews link evidence, drug policy, and personal experience — useful to course students if read with clear ethical limits (they do not replace clinical advice).
- **Method:** (1) public biographical summary; (2) cannabis/outreach axis; (3) embeds of catalogued MovReCam lectures; (4) cross-check with BudGanja inspections; (5) merit status.

## Timeline (verifiable summary)

| Period | Milestone |
|--------|-----------|
| 1971 | Born in Brasília. |
| 1993–2005 | UnB → UFRJ → Rockefeller (Ph.D.) → Duke (postdoc). |
| ~2005–2011 | Joins the neuroscientist repatriation project that originates ICe-UFRN; in 2011 helps inaugurate the Brain Institute. |
| 2007 | Publishes *Maconha, Cérebro e Saúde* (with Renato Malcher-Lopes) — evidence-based anti-prohibition science outreach. |
| 2009– | SBNeC, Pew Fellows, LA School, Brazilian Drug Policy Platform, SBPC, Latin American Academy of Sciences (ACAL), among other public roles. |
| 2019–2023 | *O Oráculo da Noite*; *Sonho Manifesto*; *As Flores do Bem* — cannabis as the “antibiotic of the 21st century” in public debate. |
| MovReCam archive | “Cannabinoid Revolution” lectures (Portuguese and English editions) and a combined lecture (cancer / revolution). |
| 2022–2023 | Noilde Ramalho Medal (ALRN) · Pedro Ernesto Medal (CMRJ) — recognition tied to education and medicinal cannabis. |

## Findings (credit due)

1. **Neuroscience ↔ society bridge** — Sidarta makes the endocannabinoid system and plant domestication intelligible to lay audiences without diluting rigor — exactly the voice an extension course needs.
2. **Verifiable MovReCam presence** — at least three videos in the BudGanja hub name him explicitly; “Cannabinoid Revolution” is a thematic axis, not a cameo.
3. **Editorial continuity** — from *Maconha, Cérebro e Saúde* (2007) to *As Flores do Bem* (2023), he keeps demystifying fallacies and pressing for evidence-based regulation.
4. **Institution in the Northeast** — ICe-UFRN and Natal’s graduate network show the reference is not only a “capital-city talk”: there is a lab, training, and extension.
5. **Honest limits** — this sheet does not grade papers one by one nor endorse political positions; it recommends the lectures and books as **complementary study material** to SIEX and channel/course inspections.

## “Cannabinoid Revolution” lectures in the MovReCam archive

Three public records deserve emphasis (IDs from the [video hub](/videos/?channel=movrecam)):

**[4th Lecture — Cannabinoid Revolution — Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${v4})**

@youtube ${v4}

**[Class 1 — 5th Course — Cannabinoid Revolution, Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${vEn})** (English edition)

@youtube ${vEn}

**[12th Lecture — Cancer (Dr. Paula Toledo) / Cannabinoid Revolution (Dr. Sidarta Ribeiro)](https://www.youtube.com/watch?v=${v12})**

@youtube ${v12}

## Complementarity with Inspector BudGanja

| Sidarta theme | BudGanja resource |
|---------------|-------------------|
| Lectures in the extension archive | [Inspection: MovReCam channel](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| Course that frames them | [Inspection: UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [UNIFESP hub](/biblioteca/unifesp/) |
| Scientific / pastoral roots | [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Father Ticão](/posts/post-inspecao-padre-ticao.html) |
| UNIFESP science outreach (partner) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Practical study (outside Sidarta’s clinical focus) | [Tools](/calculadoras/) · [Diary](/cultivo/) |

## Credits and references

**All credit for the scientific work, outreach, and “Cannabinoid Revolution” lectures belongs to Dr. Sidarta Ribeiro, his institutions, and MovReCam/UNIFESP that broadcast them.** This inspection only documents and recommends — without appropriation.

Sources consulted (non-exhaustive):

- [Wikipedia — Sidarta Ribeiro](https://pt.wikipedia.org/wiki/Sidarta_Ribeiro)
- [Museum of Tomorrow — Sidarta Ribeiro profile](https://acervo.museudoamanha.org.br/referencias/pessoas/941/sidarta-ribeiro)
- [Kaya Mind — interview](https://kayamind.com/entrevista-sidarta-ribeiro/)
- [VEJA — legislation and *As Flores do Bem*](https://veja.abril.com.br/ciencia/o-brasil-esta-bem-atrasado-na-legislacao-sobre-maconha/)
- [Trip — dream, memory and marijuana](https://revistatrip.uol.com.br/trip-fm/sidarta-ribeiro-sonho-memoria-e-maconha)
- [MovReCam](https://www.youtube.com/@MovReCam) · BudGanja internal catalog (\`videos-hub.json\`)
- Portrait: [File:Sidarta Ribeiro.jpg](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) (Luiza Mugnol Ugarte, CC BY-SA 4.0)

**Inspection written by:** Inspector BudGanja (independent digital laboratory)

## Status

**Approved with merit as a living-legacy / neuroscience-outreach reference** — Sidarta Ribeiro is a public link between endocannabinoid evidence, drug policy, and the MovReCam grid. Anyone watching the “Cannabinoid Revolution” lectures in the [video hub](/videos/?channel=movrecam) finds the voice the lab’s editorial suggestion already pointed to.

[▶ 4th Lecture](https://www.youtube.com/watch?v=${v4}) · [▶ Class 1 (EN)](https://www.youtube.com/watch?v=${vEn}) · [UNIFESP course](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial y documental del papel público del **Dr. Sidarta Tollendal Gomes Ribeiro** (Brasilia, 16 de abril de 1971) — neurocientífico, profesor titular y uno de los fundadores del **Instituto del Cerebro de la UFRN (ICe)**, escritor y voz recurrente en la defensa del cannabis medicinal basada en evidencia. El recorte de esta ficha no es una biografía académica completa: es registrar, con fuentes públicas y con el **mérito que le corresponde**, el puente entre su divulgación científica («Revolución cannabinóide») y el acervo del [curso UNIFESP / MovReCam](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) ya inspeccionado por el laboratorio.

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en biografías públicas (Wikipedia, Museo del Mañana), entrevistas (Kaya Mind, VEJA, Trip) y el catálogo oficial del [canal MovReCam](https://www.youtube.com/@MovReCam) espejado en [Videos · MovReCam](/videos/?channel=movrecam). **Sin afiliación** con la UFRN, el ICe, la SBPC, Fiocruz, MovReCam o las editoriales de los libros citados. Todo el mérito de la obra científica, la divulgación y las clases pertenece a Sidarta Ribeiro, a sus instituciones y a los proyectos que lo invitan.

![Dr. Sidarta Ribeiro](${portrait})

*Retrato de Sidarta Ribeiro (2021). Foto: [Luiza Mugnol Ugarte](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Sidarta Tollendal Gomes Ribeiro** |
| Nacimiento | 16 de abril de 1971, Brasilia (DF) |
| Formación | Biología (UnB, 1993) · Maestría en Biofísica (UFRJ, 1994) · Ph.D. Comportamiento Animal (Rockefeller, 2000) · Posdoctorado en Neurofisiología (Duke, 2005) |
| Institución | Profesor titular · fundador / vicedirector del **Instituto del Cerebro (ICe-UFRN)** |
| Líneas públicas | Sueño, sueño onírico y memoria · cannabis y política de drogas · psicodélicos · neuroeducación |
| Libros (selección) | *Maconha, Cérebro e Saúde* (2007, con Renato Malcher-Lopes) · *O Oráculo da Noite* (2019) · *As Flores do Bem* (2023) |
| Acervo MovReCam | Clases «Revolución cannabinóide» (PT y EN) catalogadas en el hub de videos |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

En la cola editorial del laboratorio, Sidarta ya figuraba como sugerencia de legado: las clases **Revolución cannabinóide** están en el archivo MovReCam que el sitio documenta. Omitirlo sería fallar el método BudGanja — **crédito a quien lo merece** — en el eslabón entre neurociencia pública contemporánea y la malla de extensión UNIFESP. No sustituye a [Carlini](/posts/post-inspecao-elisaldo-carlini.html) ni a [Ticão](/posts/post-inspecao-padre-ticao.html): **complementa** la cadena (ciencia → pastoral → divulgación viva).

## Hipótesis y método

- **H1:** Sidarta opera como **traductor público** del sistema endocannabinoide y de la historia de la planta — lenguaje accesible sin abandonar el laboratorio.
- **H2:** la presencia repetida en MovReCam («Revolución cannabinóide») confirma el papel de invitado clave de la extensión, no de figura periférica.
- **H3:** libros y entrevistas unen evidencia, política de drogas y experiencia personal — útiles al estudiante del curso si se leen con límites éticos claros (no sustituyen orientación clínica).
- **Método:** (1) síntesis biográfica pública; (2) eje cannabis/divulgación; (3) embeds de las clases MovReCam catalogadas; (4) cruce con inspecciones BudGanja; (5) estatus de mérito.

## Cronología (síntesis verificable)

| Período | Hito |
|---------|------|
| 1971 | Nace en Brasilia. |
| 1993–2005 | UnB → UFRJ → Rockefeller (Ph.D.) → Duke (posdoctorado). |
| ~2005–2011 | Integra el proyecto de repatriación de neurocientíficos que origina el ICe-UFRN; en 2011 participa en la inauguración del Instituto del Cerebro. |
| 2007 | Publica *Maconha, Cérebro e Saúde* (con Renato Malcher-Lopes) — divulgación científica antiprohibicionista basada en evidencia. |
| 2009– | SBNeC, Pew Fellows, LA School, Plataforma Brasileña de Política de Drogas, SBPC, Academia de Ciencias de América Latina (ACAL), entre otros mandatos públicos. |
| 2019–2023 | *O Oráculo da Noite*; *Sonho Manifesto*; *As Flores do Bem* — cannabis como «antibiótico del siglo XXI» en el debate público. |
| Acervo MovReCam | Clases «Revolución cannabinóide» (ediciones en portugués e inglés) y participación en clase combinada (cáncer / revolución). |
| 2022–2023 | Medalla Noilde Ramalho (ALRN) · Medalla Pedro Ernesto (CMRJ) — reconocimiento ligado a la educación y al cannabis medicinal. |

## Hallazgos (mérito debido)

1. **Puente neurociencia ↔ sociedad** — Sidarta vuelve inteligible el sistema endocannabinoide y la domesticación de la planta para el público lego sin diluir el rigor — exactamente la voz que un curso de extensión necesita.
2. **Presencia verificable en MovReCam** — al menos tres videos catalogados en el hub BudGanja lo citan explícitamente; la «Revolución cannabinóide» es eje temático, no mención ocasional.
3. **Continuidad editorial** — de *Maconha, Cérebro e Saúde* (2007) a *As Flores do Bem* (2023), mantiene la línea de desmitificar falacias y presionar por una regulación basada en evidencia.
4. **Institución en el Nordeste** — el ICe-UFRN y la red de posgrado en Natal muestran que la referencia no es solo «charla de capital»: hay laboratorio, formación y extensión.
5. **Límites honestos** — esta ficha no evalúa papers uno a uno ni respalda posiciones políticas; recomienda las clases y los libros como **material de estudio complementario** al SIEX y a las inspecciones de canal/curso.

## Clases «Revolución cannabinóide» en el acervo MovReCam

Tres registros públicos merecen destaque (IDs del [hub de videos](/videos/?channel=movrecam)):

**[4.ª Clase — Revolución cannabinóide — Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${v4})**

@youtube ${v4}

**[Class 1 — 5th Course — Cannabinoid Revolution, Dr. Sidarta Ribeiro](https://www.youtube.com/watch?v=${vEn})** (edición en inglés)

@youtube ${vEn}

**[12.ª Clase — Cáncer (Dra. Paula Toledo) / Revolución cannabinóide (Dr. Sidarta Ribeiro)](https://www.youtube.com/watch?v=${v12})**

@youtube ${v12}

## Complementariedad con el Inspector BudGanja

| Tema Sidarta | Recurso BudGanja |
|--------------|------------------|
| Clases en el archivo de extensión | [Inspección: Canal MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Videos · MovReCam](/videos/?channel=movrecam) |
| Curso que las enmarca | [Inspección: Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [Hub UNIFESP](/biblioteca/unifesp/) |
| Raíz científica / pastoral | [Carlini](/posts/post-inspecao-elisaldo-carlini.html) · [Padre Ticão](/posts/post-inspecao-padre-ticao.html) |
| Divulgación científica UNIFESP (socia) | [CANABinALL](/posts/post-inspecao-canal-canabinall.html) |
| Estudio práctico (fuera del foco clínico de Sidarta) | [Herramientas](/calculadoras/) · [Diario](/cultivo/) |

## Créditos y referencias

**Todo el mérito de la obra científica, de la divulgación y de las clases «Revolución cannabinóide» pertenece al Dr. Sidarta Ribeiro, a sus instituciones y a MovReCam/UNIFESP que las transmiten.** Esta inspección solo documenta y recomienda — sin apropiación.

Fuentes consultadas (no exhaustivo):

- [Wikipedia — Sidarta Ribeiro](https://pt.wikipedia.org/wiki/Sidarta_Ribeiro)
- [Museo del Mañana — ficha Sidarta Ribeiro](https://acervo.museudoamanha.org.br/referencias/pessoas/941/sidarta-ribeiro)
- [Kaya Mind — entrevista](https://kayamind.com/entrevista-sidarta-ribeiro/)
- [VEJA — legislación y *As Flores do Bem*](https://veja.abril.com.br/ciencia/o-brasil-esta-bem-atrasado-na-legislacao-sobre-maconha/)
- [Trip — sueño, memoria y marihuana](https://revistatrip.uol.com.br/trip-fm/sidarta-ribeiro-sonho-memoria-e-maconha)
- [MovReCam](https://www.youtube.com/@MovReCam) · catálogo interno BudGanja (\`videos-hub.json\`)
- Retrato: [File:Sidarta Ribeiro.jpg](https://commons.wikimedia.org/wiki/File:Sidarta_Ribeiro.jpg) (Luiza Mugnol Ugarte, CC BY-SA 4.0)

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente)

## Estado

**Aprobado con mérito como referencia de legado vivo / divulgación neurocientífica** — Sidarta Ribeiro es eslabón público entre evidencia endocannabinoide, política de drogas y la malla MovReCam. Quien mira las clases «Revolución cannabinóide» en el [hub de videos](/videos/?channel=movrecam) encuentra la voz que la sugerencia editorial del laboratorio ya señalaba.

[▶ 4.ª Clase](https://www.youtube.com/watch?v=${v4}) · [▶ Class 1 (EN)](https://www.youtube.com/watch?v=${vEn}) · [Curso UNIFESP](/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html) · [MovReCam](/posts/post-inspecao-canal-movrecam.html) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildSidartaRibeiroInspecaoPost() {
  const inspected = '2026-07-31';
  const refId = SIDARTA_VIDEOS.revolucao4;
  const { body, contentEn, contentEs } = buildSidartaRibeiroBodies(inspected);

  return pessoaPost({
    title: 'Inspeção: Dr. Sidarta Ribeiro — Revolução Canabinóide',
    titleEn: 'Inspection: Dr. Sidarta Ribeiro — Cannabinoid Revolution',
    titleEs: 'Inspección: Dr. Sidarta Ribeiro — Revolución cannabinóide',
    excerpt:
      'Ficha de legado vivo: Sidarta Ribeiro (UFRN/ICe) — neurocientista e divulgador; aulas «Revolução Canabinóide» no acervo MovReCam e ponte entre evidência endocanabinoide e o curso UNIFESP.',
    excerptEn:
      'Living-legacy sheet: Sidarta Ribeiro (UFRN/ICe) — neuroscientist and science communicator; “Cannabinoid Revolution” lectures in the MovReCam archive and a bridge between endocannabinoid evidence and the UNIFESP course.',
    excerptEs:
      'Ficha de legado vivo: Sidarta Ribeiro (UFRN/ICe) — neurocientífico y divulgador; clases «Revolución cannabinóide» en el acervo MovReCam y puente entre evidencia endocannabinoide y el curso UNIFESP.',
    slug: 'inspecao-sidarta-ribeiro',
    date: inspected + 'T19:00:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Sidarta Ribeiro · legado',
    coverImage: '/imagens/inspecoes/sidarta-ribeiro-cover.jpg',
    videoId: refId,
    sourceUrl: 'https://www.youtube.com/watch?v=' + refId,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  SIDARTA_VIDEOS,
  buildSidartaRibeiroInspecaoPost,
  buildSidartaRibeiroBodies
};
