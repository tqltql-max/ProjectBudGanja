'use strict';

/**
 * Inspeção: Celular — riscos para a saúde das crianças (sociedade e mundo).
 * Série: verificacao-equipamento.
 */

function verificacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/background-hero.svg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'verificacao-equipamento',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Verificação de objectos',
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

function buildCelularRiscosBodies(inspected) {
  const cover = '/imagens/inspecoes/celular-riscos-criancas-cover.jpg';

  const body = `## Escopo

Inspeção editorial do **celular (smartphone)** enquanto **equipamento de uso quotidiano** — com foco nos **riscos para a saúde das crianças e adolescentes**, cruzando orientações da **sociedade brasileira** (SBP, Governo Federal, Lei nº 15.100/2025) com o debate **mundial** (UNESCO, evidências internacionais de tempo de ecrã e mediação parental).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja com base em documentos públicos de saúde, educação e direitos da criança. **Não é consulta médica** nem endosso de marca de telemóvel. Limites de tempo, leis e guias podem ser actualizados — confirmar sempre nas fontes oficiais. **Sem afiliação** com SBP, ministérios ou fabricantes.

![Celular — riscos para a saúde das crianças](${cover})

*Capa editorial do laboratório BudGanja — o objecto inspecionado é o smartphone como equipamento social, não um modelo comercial específico.*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Equipamento | **Celular / smartphone** (ecrã táctil + conectividade móvel) |
| Recorte | Riscos à **saúde física, mental e do desenvolvimento** na infância e adolescência |
| Escala sociedade | Brasil — SBP, Caderneta da Criança, Guia federal *Crianças, Adolescentes e Telas Digitais* (2025), Lei nº 15.100/2025 |
| Escala mundo | UNESCO (distracção e aprendizagem), consenso pediátrico internacional sobre ecrãs precoces |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O laboratório BudGanja documenta **equipamentos** (luz, ventilação, tendas) com o mesmo rigor com que inspecciona plantas e formação. O celular é o equipamento mais presente na vida familiar — e o que mais altera sono, atenção, visão e vínculos. Esta ficha traduz o consenso público em checklist útil para famílias e educadores, sem moralismo e sem marketing de «detox» comercial.

## Hipóteses e método

- **H1:** O risco dominante não é o hardware em si, mas o **uso excessivo, precoce e sem mediação** (tempo + conteúdo + horário).
- **H2:** Orientações da **SBP** e do **Guia federal 2025** são coerentes entre si e com alertas internacionais (sono, miopia, saúde mental, aprendizagem).
- **H3:** A **Lei nº 15.100/2025** (restrição nas escolas) é peça de política pública alinhada à protecção da saúde mental e do ambiente de aprendizagem — complementar, não substituta, da mediação em casa.
- **Método:** (1) inventário de riscos documentados; (2) tabela de limites por faixa etária (fontes BR); (3) mapa sociedade × mundo; (4) recomendações práticas; (5) cruzamento com o acervo BudGanja.

## Mapa de riscos (achados)

| Domínio | Risco associado (síntese pública) | Notas |
|---------|-----------------------------------|-------|
| Sono | Atraso do sono, insónia, irritabilidade no dia seguinte | Luz LED / estímulo nocturno dificulta «desligar» o cérebro |
| Visão | Miopia, fadiga ocular, olhos secos | Uso prolongado de ecrãs a curta distância |
| Desenvolvimento | Atrasos cognitivos, de linguagem e emocionais em usos problemáticos precoces | Quanto mais tarde a posse própria, melhor o perfil de risco |
| Saúde mental | Ansiedade, humor baixo, pressão por validação em redes | Intensificado por algoritmos e comparação social |
| Corpo | Sedentarismo, obesidade, menos brincadeira livre | Tempo de ecrã desloca movimento e interação presencial |
| Aprendizagem | Distracção, queda de concentração, impacto escolar | UNESCO alerta para telemóveis como fonte de distracção se não mediados |
| Segurança | Conteúdo inadequado, cyberbullying, privacidade, exploração | Risco online distinto do «tempo de ecrã» puro |

## Limites por idade (sociedade brasileira)

Síntese das orientações públicas da **Sociedade Brasileira de Pediatria** e do **Guia federal** (confirmar sempre o texto oficial actualizado):

| Faixa | Orientação pública (síntese) |
|-------|------------------------------|
| &lt; 2 anos | **Evitar ecrãs**, salvo videochamadas com familiares |
| 2–5 anos | Até **~1 h/dia**, preferencialmente com adulto |
| 6–10 anos | Até **~2 h/dia**, com supervisão |
| 11–17 anos | Até **~2–3 h/dia** (SBP); uso de apps/redes com acompanhamento |
| Antes dos 12 anos | Guia federal: **evitar smartphone próprio** |
| Redes sociais | Respeitar classificação indicativa; termos das plataformas costumam exigir 13+ |
| Escola | **Lei nº 15.100/2025** — restrição de aparelhos portáteis na educação básica (aulas, recreios e intervalos), com excepções previstas na lei |

## Sociedade e mundo (enquadramento)

| Escala | Referência | O que inspeccionámos |
|--------|------------|----------------------|
| Brasil | SBP + Caderneta da Criança | Limites de tempo e supervisão |
| Brasil | Guia *Crianças, Adolescentes e Telas Digitais* (Secom / multi-ministérios, 2025) | Uso saudável, segurança online, equilíbrio offline |
| Brasil | Lei nº 15.100/2025 | Protecção da saúde mental/física no ambiente escolar |
| Mundo | UNESCO e literatura internacional | Distracção, aprendizagem, necessidade de mediação adulta |
| Mundo | Consenso pediátrico amplo | Evitar ecrãs na primeira infância; adiar posse do aparelho |

O celular é um equipamento **global**; as regras locais (Brasil) traduzem um consenso crescente: **proteger o desenvolvimento** sem negar o valor de acessibilidade, educação e contacto familiar quando bem mediado — incluindo uso por crianças com deficiência para fins de acessibilidade (explicitado no guia federal).

## Checklist prático (famílias e escolas)

1. **Adiar a posse** do primeiro smartphone o mais possível (ideal: após os 12, conforme guia federal).
2. **Zonas sem ecrã:** refeições, quarto à noite, primeira hora após acordar.
3. **Conteúdo &gt; tempo:** preferir apps sem scroll infinito / autoplay / recomendação agressiva.
4. **Co-uso:** adulto presente nas primeiras exposições; conversar sobre o que a criança vê.
5. **Modelo adulto:** o celular dos pais também é equipamento inspeccionável — o exemplo conta.
6. **Escola:** cumprir a Lei 15.100 e reforçar escuta sobre sofrimento psíquico e uso imoderado.
7. **Sinais de alerta:** queda de sono, irritabilidade extrema ao retirar o aparelho, isolamento, queda escolar — procurar profissional de saúde.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso BudGanja |
|------|------------------|
| Equipamentos e verificação | [Biblioteca · Equipamentos](/biblioteca/inspecoes/) · [Mars Hydro](/posts/post-inspecao-marshydro-brasil.html) |
| Saúde e divulgação responsável | [Divulgação em saúde](/biblioteca/inspecoes/) (série distincta — não confundir com esta ficha de equipamento) |
| Formação e infância / atenção | [Artes · Divertida Mente](/posts/post-inspecao-filme-divertida-mente.html) · palavras emocionais no hub |
| Laboratório e rotina | [Diário de pesquisas](/cultivo/) — disciplina de observação também aplica-se a hábitos familiares |

## Créditos e referências

Fontes públicas consultadas (não exaustivo):

- [Sociedade Brasileira de Pediatria](https://www.sbp.com.br/) — orientações sobre tempo de ecrã
- [Guia federal — Crianças, Adolescentes e Telas Digitais](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) (Secom e ministérios, 2025)
- [Lei nº 15.100/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm) — restrição de aparelhos electrónicos na educação básica
- UNESCO — alertas sobre tecnologias móveis e qualidade da aprendizagem
- Materiais de apoio: Instituto Alana / Criança e Consumo e literatura pediátrica de acesso público

**Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente).  
**Finalidade:** checklist editorial de equipamento e saúde pública — **não** substitui pediatra, psicólogo ou orientação escolar individualizada.

## Status

**Aprovado como referência de equipamento social** — o celular entra na série de verificação de equipamentos do laboratório com o mesmo critério de evidência pública aplicado a luz e ventilação: objecto definido, riscos medidos por fontes oficiais, recomendações repetíveis. Recomendado rever anualmente perante actualizações da SBP e do Guia federal.

[Guia federal (Secom)](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) · [SBP](https://www.sbp.com.br/) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial inspection of the **smartphone** as everyday **equipment** — focused on **risks to children’s and adolescents’ health**, crossing **Brazilian society** guidance (SBP, Federal Government, Law 15.100/2025) with the **global** debate (UNESCO, international screen-time evidence and parental mediation).

> **Method note:** independent BudGanja audit based on public health, education and child-rights documents. **Not medical advice** and not a phone-brand endorsement. Limits, laws and guides may change — always confirm official sources. **No affiliation** with SBP, ministries or manufacturers.

![Phone — risks to children’s health](${cover})

*BudGanja editorial cover — the inspected object is the smartphone as social equipment, not a specific commercial model.*

## Inspected object

| Field | Value |
|-------|-------|
| Equipment | **Smartphone** (touchscreen + mobile connectivity) |
| Focus | Risks to **physical, mental and developmental health** in childhood and adolescence |
| Society scale | Brazil — SBP, Child Health Booklet, federal guide *Children, Adolescents and Digital Screens* (2025), Law 15.100/2025 |
| World scale | UNESCO (distraction and learning), international pediatric consensus on early screens |
| Inspection date | ${inspected} |

## Why this inspection exists

BudGanja documents **equipment** (lights, ventilation, tents) with the same rigor as plants and training. The phone is the most present household device — and the one that most reshapes sleep, attention, vision and bonds. This sheet turns public consensus into a practical checklist for families and educators, without moralism or commercial “detox” marketing.

## Hypotheses and method

- **H1:** The dominant risk is not the hardware itself, but **excessive, early and unmediated use** (time + content + schedule).
- **H2:** **SBP** and the **2025 federal guide** align with each other and with international alerts (sleep, myopia, mental health, learning).
- **H3:** **Law 15.100/2025** (school restrictions) is public policy aligned with protecting mental health and learning environments — complementary to, not a substitute for, home mediation.
- **Method:** (1) risk inventory; (2) age-band limits table (BR sources); (3) society × world map; (4) practical recommendations; (5) cross-links to BudGanja.

## Risk map (findings)

| Domain | Associated risk (public synthesis) | Notes |
|--------|------------------------------------|-------|
| Sleep | Delayed sleep, insomnia, next-day irritability | LED light / night stimulation hinders winding down |
| Vision | Myopia, eye strain, dry eyes | Prolonged near-screen use |
| Development | Cognitive, language and emotional delays in problematic early use | Later personal ownership → better risk profile |
| Mental health | Anxiety, low mood, validation pressure online | Intensified by algorithms and social comparison |
| Body | Sedentary habits, obesity, less free play | Screen time displaces movement and in-person interaction |
| Learning | Distraction, poorer focus, school impact | UNESCO flags phones as distraction sources if unmediated |
| Safety | Inappropriate content, cyberbullying, privacy, exploitation | Online harm distinct from “screen time” alone |

## Age limits (Brazilian society)

Public synthesis of **Brazilian Society of Pediatrics** and the **federal guide** (always confirm the latest official text):

| Age band | Public guidance (synthesis) |
|----------|-----------------------------|
| &lt; 2 years | **Avoid screens**, except family video calls |
| 2–5 years | Up to **~1 h/day**, preferably with an adult |
| 6–10 years | Up to **~2 h/day**, with supervision |
| 11–17 years | Up to **~2–3 h/day** (SBP); apps/social with accompaniment |
| Before age 12 | Federal guide: **avoid personal smartphones** |
| Social media | Follow age ratings; platforms often require 13+ |
| School | **Law 15.100/2025** — restriction of portable devices in basic education (classes, recesses, breaks), with legal exceptions |

## Society and world (framing)

| Scale | Reference | What we inspected |
|-------|-----------|-------------------|
| Brazil | SBP + Child Health Booklet | Time limits and supervision |
| Brazil | Federal guide (Secom / multi-ministry, 2025) | Healthy use, online safety, offline balance |
| Brazil | Law 15.100/2025 | Mental/physical health protection at school |
| World | UNESCO and international literature | Distraction, learning, need for adult mediation |
| World | Broad pediatric consensus | Avoid screens in early childhood; delay device ownership |

The phone is **global** equipment; local Brazilian rules translate a growing consensus: **protect development** without denying accessibility, education and family contact when well mediated — including use by children with disabilities for accessibility (noted in the federal guide).

## Practical checklist (families and schools)

1. **Delay ownership** of the first smartphone as long as possible (ideally after 12, per the federal guide).
2. **Screen-free zones:** meals, bedroom at night, first hour after waking.
3. **Content &gt; time:** prefer apps without infinite scroll / autoplay / aggressive recommendation.
4. **Co-use:** adult present in early exposure; talk about what the child sees.
5. **Adult model:** parents’ phones are inspectable equipment too — example matters.
6. **School:** follow Law 15.100 and strengthen listening on mental distress and immoderate use.
7. **Warning signs:** sleep drop, extreme irritability when removing the device, isolation, school decline — seek a health professional.

## Complementarity with Inspector BudGanja

| Theme | BudGanja resource |
|-------|-------------------|
| Equipment verification | [Library · Equipment](/biblioteca/inspecoes/) · [Mars Hydro](/posts/post-inspecao-marshydro-brasil.html) |
| Responsible health outreach | Health-outreach series in the hub (distinct from this equipment sheet) |
| Attention / childhood culture | [Arts · Inside Out](/posts/post-inspecao-filme-divertida-mente.html) |
| Lab and routine | [Research diary](/cultivo/) — observation discipline also applies to family habits |

## Credits and references

Public sources consulted (non-exhaustive):

- [Brazilian Society of Pediatrics](https://www.sbp.com.br/)
- [Federal guide — Children, Adolescents and Digital Screens](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) (2025)
- [Law 15.100/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm)
- UNESCO — mobile tech and learning quality alerts
- Supporting materials: Alana / Criança e Consumo and public pediatric literature

**Written by:** Inspector BudGanja (independent digital lab).  
**Purpose:** editorial equipment & public-health checklist — **not** a substitute for individualized pediatric, psychological or school guidance.

## Status

**Approved as a social-equipment reference** — the smartphone joins BudGanja’s equipment-verification series with the same public-evidence standard used for lights and ventilation. Revisit yearly against SBP and federal-guide updates.

[Federal guide (Secom)](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) · [SBP](https://www.sbp.com.br/) · [All inspections](/biblioteca/inspecoes/)`;

  const contentEs = `## Alcance

Inspección editorial del **celular (smartphone)** como **equipo de uso cotidiano** — con foco en los **riesgos para la salud de niños y adolescentes**, cruzando orientaciones de la **sociedad brasileña** (SBP, Gobierno Federal, Ley nº 15.100/2025) con el debate **mundial** (UNESCO, evidencia internacional sobre tiempo de pantalla y mediación parental).

> **Nota metodológica:** auditoría independiente del Inspector BudGanja basada en documentos públicos de salud, educación y derechos de la infancia. **No es consulta médica** ni respaldo de marca. Límites, leyes y guías pueden actualizarse — confirmar siempre fuentes oficiales. **Sin afiliación** con SBP, ministerios o fabricantes.

![Celular — riesgos para la salud de los niños](${cover})

*Portada editorial del laboratorio BudGanja — el objeto inspeccionado es el smartphone como equipo social, no un modelo comercial específico.*

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Equipo | **Celular / smartphone** (pantalla táctil + conectividad móvil) |
| Recorte | Riesgos a la **salud física, mental y del desarrollo** en la infancia y adolescencia |
| Escala sociedad | Brasil — SBP, Caderneta da Criança, Guía federal *Crianças, Adolescentes e Telas Digitais* (2025), Ley nº 15.100/2025 |
| Escala mundo | UNESCO (distracción y aprendizaje), consenso pediátrico internacional sobre pantallas precoces |
| Fecha de la inspección | ${inspected} |

## Por qué existe esta inspección

El laboratorio BudGanja documenta **equipos** (luz, ventilación, carpas) con el mismo rigor que plantas y formación. El celular es el equipo más presente en la vida familiar — y el que más altera sueño, atención, visión y vínculos. Esta ficha traduce el consenso público en una lista útil para familias y educadores, sin moralismo ni marketing de «detox» comercial.

## Hipótesis y método

- **H1:** El riesgo dominante no es el hardware en sí, sino el **uso excesivo, precoz y sin mediación** (tiempo + contenido + horario).
- **H2:** Las orientaciones de la **SBP** y de la **Guía federal 2025** son coherentes entre sí y con alertas internacionales (sueño, miopía, salud mental, aprendizaje).
- **H3:** La **Ley nº 15.100/2025** (restricción en escuelas) es política pública alineada con la protección de la salud mental y del entorno de aprendizaje — complementaria, no sustituta, de la mediación en casa.
- **Método:** (1) inventario de riesgos; (2) tabla de límites por edad (fuentes BR); (3) mapa sociedad × mundo; (4) recomendaciones prácticas; (5) cruces con el acervo BudGanja.

## Mapa de riesgos (hallazgos)

| Dominio | Riesgo asociado (síntesis pública) | Notas |
|---------|-----------------------------------|-------|
| Sueño | Retraso del sueño, insomnia, irritabilidad al día siguiente | Luz LED / estímulo nocturno dificulta «apagar» el cerebro |
| Visión | Miopía, fatiga ocular, ojos secos | Uso prolongado de pantallas a corta distancia |
| Desarrollo | Retrasos cognitivos, de lenguaje y emocionales en usos problemáticos precoces | Cuanto más tarde la posesión propia, mejor el perfil de riesgo |
| Salud mental | Ansiedad, ánimo bajo, presión por validación en redes | Intensificado por algoritmos y comparación social |
| Cuerpo | Sedentarismo, obesidad, menos juego libre | El tiempo de pantalla desplaza movimiento e interacción presencial |
| Aprendizaje | Distracción, menor concentración, impacto escolar | UNESCO alerta sobre móviles como fuente de distracción si no se median |
| Seguridad | Contenido inadecuado, ciberacoso, privacidad, explotación | Riesgo en línea distinto del «tiempo de pantalla» puro |

## Límites por edad (sociedad brasileña)

Síntesis de orientaciones públicas de la **Sociedad Brasileña de Pediatría** y de la **Guía federal** (confirmar siempre el texto oficial actualizado):

| Franja | Orientación pública (síntesis) |
|--------|--------------------------------|
| &lt; 2 años | **Evitar pantallas**, salvo videollamadas con familiares |
| 2–5 años | Hasta **~1 h/día**, preferentemente con un adulto |
| 6–10 años | Hasta **~2 h/día**, con supervisión |
| 11–17 años | Hasta **~2–3 h/día** (SBP); apps/redes con acompañamiento |
| Antes de los 12 | Guía federal: **evitar smartphone propio** |
| Redes sociales | Respetar clasificación por edad; las plataformas suelen exigir 13+ |
| Escuela | **Ley nº 15.100/2025** — restricción de aparatos portátiles en la educación básica (clases, recreos e intervalos), con excepciones previstas |

## Sociedad y mundo (encuadre)

| Escala | Referencia | Qué inspeccionamos |
|--------|------------|--------------------|
| Brasil | SBP + Caderneta da Criança | Límites de tiempo y supervisión |
| Brasil | Guía federal (Secom / multi-ministerios, 2025) | Uso saludable, seguridad en línea, equilibrio offline |
| Brasil | Ley nº 15.100/2025 | Protección de la salud mental/física en la escuela |
| Mundo | UNESCO y literatura internacional | Distracción, aprendizaje, necesidad de mediación adulta |
| Mundo | Consenso pediátrico amplio | Evitar pantallas en la primera infancia; retrasar la posesión del aparato |

El celular es un equipo **global**; las reglas locales (Brasil) traducen un consenso creciente: **proteger el desarrollo** sin negar el valor de accesibilidad, educación y contacto familiar cuando está bien mediado — incluido el uso por niños con discapacidad para accesibilidad (explícito en la guía federal).

## Lista práctica (familias y escuelas)

1. **Retrasar la posesión** del primer smartphone lo más posible (ideal: después de los 12, según la guía federal).
2. **Zonas sin pantalla:** comidas, dormitorio por la noche, primera hora al despertar.
3. **Contenido &gt; tiempo:** preferir apps sin scroll infinito / autoplay / recomendación agresiva.
4. **Co-uso:** adulto presente en las primeras exposiciones; hablar de lo que ve el niño.
5. **Modelo adulto:** el celular de los padres también es equipo inspeccionable — el ejemplo cuenta.
6. **Escuela:** cumplir la Ley 15.100 y reforzar la escucha sobre sufrimiento psíquico y uso inmoderado.
7. **Señales de alerta:** caída del sueño, irritabilidad extrema al retirar el aparato, aislamiento, caída escolar — buscar profesional de salud.

## Complementariedad con el Inspector BudGanja

| Tema | Recurso BudGanja |
|------|------------------|
| Equipos y verificación | [Biblioteca · Equipos](/biblioteca/inspecoes/) · [Mars Hydro](/posts/post-inspecao-marshydro-brasil.html) |
| Salud y divulgación responsable | Serie de divulgación en salud del hub (distinta de esta ficha de equipo) |
| Atención / cultura infantil | [Artes · Intensamente](/posts/post-inspecao-filme-divertida-mente.html) |
| Laboratorio y rutina | [Diario de investigaciones](/cultivo/) — la disciplina de observación también aplica a hábitos familiares |

## Créditos y referencias

Fuentes públicas consultadas (no exhaustivo):

- [Sociedad Brasileña de Pediatría](https://www.sbp.com.br/)
- [Guía federal — Crianças, Adolescentes e Telas Digitais](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) (2025)
- [Ley nº 15.100/2025](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15100.htm)
- UNESCO — alertas sobre tecnologías móviles y calidad del aprendizaje
- Materiales de apoyo: Instituto Alana / Criança e Consumo y literatura pediátrica de acceso público

**Inspección redactada por:** Inspector BudGanja (laboratorio digital independiente).  
**Finalidad:** lista editorial de equipo y salud pública — **no** sustituye pediatra, psicólogo u orientación escolar individualizada.

## Estado

**Aprobado como referencia de equipo social** — el celular entra en la serie de verificación de equipos del laboratorio con el mismo criterio de evidencia pública aplicado a luz y ventilación. Recomendado revisar anualmente ante actualizaciones de la SBP y de la Guía federal.

[Guía federal (Secom)](https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes) · [SBP](https://www.sbp.com.br/) · [Todas las inspecciones](/biblioteca/inspecoes/)`;

  return { body, contentEn, contentEs };
}

function buildCelularRiscosCriancasInspecaoPost() {
  const inspected = '2026-08-01';
  const { body, contentEn, contentEs } = buildCelularRiscosBodies(inspected);

  return verificacaoPost({
    title: 'Inspeção: Celular — os riscos para a saúde das crianças (sociedade e mundo)',
    titleEn: 'Inspection: Phone — risks to children’s health (society and world)',
    titleEs: 'Inspección: Celular — riesgos para la salud de los niños (sociedad y mundo)',
    excerpt:
      'Verificação do smartphone como equipamento social: riscos à saúde infantil (sono, visão, mente, aprendizagem), limites SBP/guia federal 2025, Lei 15.100/2025 e enquadramento mundial (UNESCO).',
    excerptEn:
      'Smartphone as social equipment: risks to children’s health (sleep, vision, mind, learning), SBP/2025 federal-guide limits, Law 15.100/2025 and global framing (UNESCO).',
    excerptEs:
      'Smartphone como equipo social: riesgos para la salud infantil (sueño, visión, mente, aprendizaje), límites SBP/guía federal 2025, Ley 15.100/2025 y encuadre mundial (UNESCO).',
    slug: 'inspecao-celular-riscos-saude-criancas',
    date: inspected + 'T22:30:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'Celular · saúde infantil',
    coverImage: '/imagens/inspecoes/celular-riscos-criancas-cover.jpg',
    sourceUrl:
      'https://www.gov.br/secom/pt-br/acompanhe-a-secom/noticias/2025/03/governo-lanca-guia-para-uso-saudavel-de-telas-por-criancas-e-adolescentes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCelularRiscosCriancasInspecaoPost,
  buildCelularRiscosBodies
};
