'use strict';

/**
 * Inspeção: plataformas de ensino GOV.BR / MEC —
 * Canal Educação (vídeos), MEC Idiomas, MEC Livros, AVAMEC, MEC Enem.
 * Login gov.br. Gratuitas. Sem afiliação. Catalogar ≠ endosso político.
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

function buildGovbrEnsinoBodies(inspected) {
  const cover = '/imagens/inspecoes/govbr-ensino-cover.jpg';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const icl = '/posts/post-inspecao-icl-cursos.html';
  const iclCanal = '/posts/post-inspecao-canal-icl.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const disney = '/posts/post-inspecao-canal-disneyjr.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/vida/';
  const hubFormacao = '/biblioteca/inspecoes/';

  const gov = 'https://www.gov.br/';
  const mec = 'https://www.gov.br/mec/pt-br';
  const appsMec = 'https://aplicativos.mec.gov.br/';
  const livros = 'https://meclivros.mec.gov.br/';
  const livrosFaq = 'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/mec-livros';
  const livrosHub = 'https://www.gov.br/mec/pt-br/mec-livros';
  const livrosNews =
    'https://www.gov.br/mec/pt-br/assuntos/noticias/2026/abril/mec-disponibiliza-ferramentas-gratuitas-de-livros-e-idiomas';
  const idiomasFaq = 'https://www.gov.br/mec/pt-br/acesso-a-informacao/perguntas-frequentes/mec-idiomas';
  const idiomasHow =
    'https://www.gov.br/mec/pt-br/assuntos/noticias/2026/julho/saiba-como-utilizar-o-aplicativo-mec-idiomas';
  const isf = 'https://isf.mec.gov.br/';
  const avamec = 'https://avamec.mec.gov.br/';
  const avamecGov =
    'https://www.gov.br/pt-br/servicos/realizar-um-curso-no-ambiente-virtual-de-aprendizagem-do-mec-avamec';
  const avamecMec = 'https://www.gov.br/mec/pt-br/mais-professores/portal-formacao/avamec';
  const enem = 'https://www.gov.br/mec/pt-br/mec-enem';
  const enemApp = 'https://app.mecenem.mec.gov.br';
  const canalEdu = 'https://www.gov.br/mec/pt-br/canal-educacao';
  const canalLive = 'https://canaleducacao.ebc.com.br/';
  const canalYt = 'https://www.youtube.com/@canaleducacaobr';
  const canalId = 'UC5bBIQ6aFIOatJCQSueoH1A';
  const mecYt = 'https://www.youtube.com/ministeriodaeducacao';
  const dominio = 'http://www.dominiopublico.gov.br/';

  const body = `## Escopo

Inspeção editorial do **mapa de ensino digital do Governo Federal** — plataformas **gratuitas** do [Ministério da Educação](${mec}) com login [gov.br](${gov}): **vídeos** ([Canal Educação](${canalYt})), **línguas** ([MEC Idiomas](${idiomasFaq})), **leitura** ([MEC Livros](${livros})) e as irmãs **AVAMEC** (cursos) e **MEC Enem** (simulados). O recorte não é um prospecto ministerial nem um ranking de apps: é **nomear a casa pública**, o preço (zero), o login e o limite.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: páginas oficiais [gov.br/mec](${mec}), [FAQ MEC Livros](${livrosFaq}), [FAQ MEC Idiomas](${idiomasFaq}), [serviço AVAMEC](${avamecGov}), [Canal Educação](${canalEdu}), [MEC Enem](${enem}). **Sem afiliação** com MEC, EBC, INEP ou lojas de aplicações. Catálogo, empréstimos, aulas e certificados **mudam** — confirmar sempre no site oficial. **Catalogar ≠ endosso político.** Esta ficha **não** substitui escola, SIEX nem consulta pedagógica.

![Plataformas de ensino GOV.BR / MEC](${cover})

*Capa editorial do laboratório BudGanja — referência visual; logos e ecrãs oficiais em [gov.br/mec](${mec}).*

## Por que esta inspeção existe

O mapa de formação do laboratório já tem **extensão federal especializada** ([UNIFESP / MovReCam](${unifesp})), **formação privada por assinatura** ([ICL Cursos](${icl})) e o alerta de [celular × crianças](${celular}). Faltava a **camada pública geral**: o que qualquer cidadão com CPF e conta gov.br pode abrir **sem pagar** — TV educativa, livros, idiomas, cursos e Enem.

Não é cannabis. Não é ICL. Não é Disney Jr. É o **andar gratuito do Estado** para ler, ouvir aula e treinar língua — e o ofício de inspecção pedia o nome certo.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Plataformas de ensino GOV.BR / MEC** |
| Tipo | Ecossistema federal **gratuito** de aprendizagem digital |
| Chave de acesso | Conta **[gov.br](${gov})** (CPF) — site ou aplicação |
| Ministério | [Ministério da Educação](${mec}) |
| Central de apps | [aplicativos.mec.gov.br](${appsMec}) |
| Vídeos | [Canal Educação](${canalYt}) (@canaleducacaobr) — TV do MEC / EBC |
| Línguas | [MEC Idiomas](${idiomasFaq}) — inglês e espanhol (autoinstrucional) |
| Livros | [MEC Livros](${livros}) — biblioteca digital |
| Cursos | [AVAMEC](${avamec}) — ambiente virtual de aprendizagem |
| Enem | [MEC Enem](${enemApp}) — simulados e redação |
| Tipo BudGanja | Formação académica · **casa pública gratuita** (não é LMS do laboratório) |
| Elo formação | [UNIFESP](${unifesp}) · [ICL Cursos](${icl}) |
| Elo ecrã | [celular × crianças](${celular}) · [Disney Jr.](${disney}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Data | ${inspected} |

## Hipóteses e método

- **H1:** **Login único.** A mesma conta gov.br abre Livros, Idiomas, Enem e (em muitos casos) AVAMEC — não são cinco cadastros comerciais.
- **H2:** **Gratuito ≠ vazio.** Canal Educação, MEC Livros e MEC Idiomas são oferta pública com acervo e aula; o limite é outro: internet, CPF, ecrã e (nos livros licenciados) janela de empréstimo.
- **H3:** **Canal ≠ app ≠ LMS.** YouTube/TV (Canal Educação), leitor de e-books (MEC Livros), treino de língua (MEC Idiomas) e Moodle-like (AVAMEC) **não** são o mesmo objecto.
- **H4:** Esta casa **não** substitui o [SIEX UNIFESP](${unifesp}) (cannabis medicinal) nem a [assinatura ICL](${icl}) (humanas pagas). São contratos sociais diferentes.
- **H5:** Fecho = [Faça o melhor!](${mantra}) — o melhor ecrã possível *nesta* idade *nesta* conta pública, com [respeito](${respeito}) ao tempo de tela ([celular](${celular})).

## Mapa rápido — o que abrir para quê

| Quero… | Abrir | Login | Preço |
|--------|-------|-------|-------|
| **Vídeo / TV educativa** (ao vivo e arquivo) | [Canal Educação](${canalLive}) ou [YouTube @canaleducacaobr](${canalYt}) | YouTube opcional; TV aberta em alguns estados | Grátis |
| **Aprender inglês ou espanhol** | [MEC Idiomas](${idiomasFaq}) (portal + app) | **gov.br** | Grátis |
| **Ler livros** (clássicos e licenciados) | [MEC Livros](${livros}) (site + app) | **gov.br** | Grátis (empréstimo nas obras licenciadas) |
| **Curso com certificado** (formação continuada) | [AVAMEC](${avamec}) | gov.br ou cadastro AVAMEC | Grátis |
| **Treinar para o Enem** | [MEC Enem](${enemApp}) | **gov.br** | Grátis |
| **Lista de apps MEC** | [aplicativos.mec.gov.br](${appsMec}) | — | Grátis |

Passo comum: criar ou entrar em [gov.br](${gov}) → abrir o site ou o aplicativo → «Entrar com Gov.br».

## 1. Canal de vídeos gratuitos — Canal Educação

A **TV do MEC**, em parceria com a [EBC](${canalLive}). Sucessora institucional da lógica da antiga TV Escola: programação educativa **aberta**, não um canal de marca comercial.

| Campo | Valor |
|-------|-------|
| Nome | **Canal Educação** — «a TV do MEC» |
| YouTube | [@canaleducacaobr](${canalYt}) |
| Channel ID | \`${canalId}\` |
| Ao vivo | [canaleducacao.ebc.com.br](${canalLive}) · [gov.br/mec/canal-educacao](${canalEdu}) |
| TV aberta (exemplos oficiais) | 2.3 em Brasília, RJ e Maranhão; 1.3 em São Paulo — [como sintonizar](${canalEdu}) |
| Irmão | Canal Libras (acessibilidade) |
| Canal institucional MEC | [youtube.com/ministeriodaeducacao](${mecYt}) — videoaulas pontuais (ex.: redação Enem / YouTube Edu) |

**Leitura BudGanja:** este é o **hub de vídeos públicos** pedido nesta ficha. **Não** entra no hub [/videos/](/videos/) de cultivo do laboratório (mesmo critério do [canal ICL](${iclCanal}): outra casa, outro arquivo). Assistir no YouTube, no site da EBC ou na TV.

**Não confundir com:** [Disney Jr.](${disney}) (desenhos comerciais) · [MovReCam](${movrecam}) (aulas UNIFESP de cannabis) · lives do ICL (jornalismo).

## 2. Aplicativo de línguas — MEC Idiomas

Portal e aplicativo **gratuito** de aprendizagem **bilíngue autoinstrucional**, do básico ao avançado. Política de origem: internacionalização / [Idiomas sem Fronteiras (IsF)](${isf}). Público prioritário declarado: estudantes da rede pública e professores de idiomas não especializados; **qualquer cidadão** pode usar.

| Campo | Valor |
|-------|-------|
| Nome | **MEC Idiomas** |
| FAQ | [gov.br/mec · MEC Idiomas](${idiomasFaq}) |
| Como usar (MEC, jul. 2026) | [passo a passo](${idiomasHow}) |
| Idiomas no lançamento | **Inglês** e **espanhol** (outros anunciados para depois) |
| Níveis | QECR **A1–C2** (leitura da imprensa oficial / MEC) |
| Peças | Teste de proficiência · trilha aula + reforço · fala e prática · agente de IA (dúvidas e conversação) — **promessa do MEC**, o lab não audita o modelo |
| Login | **gov.br** |
| Preço | Grátis — sem mensalidade |

**H2 aplicada:** treinar língua **no app público** não apaga a [língua portuguesa](${lingua}) do ofício BudGanja — o português continua a ser o meio deste laboratório; o MEC Idiomas é a **porta federal** para o inglês e o espanhol.

Limite: autoinstrucional **não** é graduação, **não** é certificado universitário IsF presencial, **não** substitui professor.

## 3. Aplicativo de leitura — MEC Livros

Biblioteca digital pública do MEC. Site: [meclivros.mec.gov.br](${livros}). App nas lojas. Login **gov.br**.

| Campo | Valor |
|-------|-------|
| Nome | **MEC Livros** — «a biblioteca digital do Brasil» |
| FAQ | [gov.br/mec · MEC Livros](${livrosFaq}) |
| Hub | [gov.br/mec/mec-livros](${livrosHub}) |
| Lançamento público | **Abril de 2026** ([nota MEC](${livrosNews})) |
| Acervo inicial (nota MEC) | Cerca de **8 mil** obras — domínio público + licenciadas |
| Linhagem | O acervo clássico parte do antigo [Domínio Público](${dominio}) (2004) |
| Empréstimo (obras licenciadas) | **14 dias**, renovável (confirmar na app — regras podem mudar) |
| Formatos | Leitor integrado (EPUB) · PDF |
| Acessibilidade (declarada) | Fonte, contraste, dislexia, leitores de ecrã |
| Contacto acervo | meclivros@mec.gov.br |

Números de utilizadores e empréstimos **são do MEC e mudam** (a nota de julho de 2026 já falava em ordem de milhões de contas e centenas de milhares de empréstimos). Esta ficha **não** congela estatística.

**Como emprestar (síntese oficial):** entrar com gov.br → escolher a capa → «Mais informações» → «Emprestar e Ler».

**Não confundir com:** livraria paga · Kindle/assinatura · a biblioteca [Ler+](${icl}) do ICL (atrás de plano).

## 4. Irmãs no mesmo login — AVAMEC e MEC Enem

Não eram o pedido principal, mas **fecham o mapa** e evitam misturar objectos.

### AVAMEC — cursos

[Ambiente Virtual de Aprendizagem do MEC](${avamec}). Cursos a distância, formação continuada de professores e público em geral. Muitos emitem **certificado** — **depende da oferta**. App: AVAMEC Mobile. Serviço gov.br: [realizar um curso no AVAMEC](${avamecGov}). Página MEC: [Avamec](${avamecMec}).

Login: gov.br **ou** cadastro próprio (e-mail/CPF). Ler pré-requisitos **antes** de se inscrever.

### MEC Enem — simulados

[app.mecenem.mec.gov.br](${enemApp}) · [página MEC Enem](${enem}). Trilhas, questões de provas anteriores, assistente virtual e **correção de redação por IA** (o estudante fotografa o manuscrito). **Promessa de produto do MEC** — o laboratório não valida a nota da IA contra o INEP.

Parceria pontual: videoaulas de redação no [canal do MEC](${mecYt}) / YouTube Edu.

## Casas a não misturar

| Casa | Preço | Objecto | Ficha |
|------|-------|---------|-------|
| **GOV.BR / MEC** (esta) | Grátis | Escola pública digital: TV, livros, idiomas, cursos, Enem | Esta página |
| **UNIFESP / MovReCam** | Grátis (SIEX) | Extensão **cannabis medicinal** | [curso](${unifesp}) · [canal](${movrecam}) |
| **ICL Cursos** | Assinatura | Humanas / jornalismo privados | [cursos](${icl}) · [canal](${iclCanal}) |
| **Disney Jr.** | Grátis no YT + marca | Desenhos comerciais | [canal](${disney}) |
| **YouTube aleatório** | Grátis + anúncios | Algoritmo, não currículo | [celular × crianças](${celular}) |

## Limites e riscos (leitura BudGanja)

- **Conta gov.br / CPF:** quem não tem documento ou internet fica de fora — a «gratuidade» é digital, não universal.
- **Ecrã continua ecrã:** [Lei 15.100/2025](${celular}) e o guia federal de telas **não** deixam de valer porque o app é do MEC. Mediação parental.
- **IA no Idiomas e no Enem:** o MEC anuncia agentes e correção automática. Útil como treino; **não** é banca do INEP nem professor.
- **Empréstimo ≠ posse:** livro licenciado volta ao acervo; domínio público é outro regime — ler o ecrã da obra.
- **Certificado AVAMEC ≠ diploma de graduação.**
- **Canal Educação ≠ catálogo BudGanja /videos.** Assistir na fonte.
- **Números em movimento:** 8 mil títulos, 800 aulas, milhões de users — sempre verificar o FAQ do ano.

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [UNIFESP](${unifesp}) · [MovReCam](${movrecam}) | Extensão federal **especializada** — outro contrato |
| [ICL Cursos](${icl}) | Formação **paga** — contraste de preço e de lado declarado |
| [celular × crianças](${celular}) | O ecrã público ainda pede tempo, sono e mediação |
| [Disney Jr.](${disney}) | Desenho comercial — não é TV Escola |
| [língua portuguesa](${lingua}) | Meio do laboratório; MEC Idiomas é a porta **estrangeira** federal |
| [respeito](${respeito}) · [verdade](${verdade}) · [especial](${especial}) · [risco](${risco}) | Recorde, crédito ao MEC, entrega especial, limite do ecrã |

## Como usar (ofício)

1. Criar ou abrir [gov.br](${gov}).  
2. **Ler:** [MEC Livros](${livros}).  
3. **Língua:** [MEC Idiomas](${idiomasFaq}) — teste de nível, depois a trilha.  
4. **Vídeo:** [Canal Educação](${canalYt}) ou [ao vivo EBC](${canalLive}).  
5. **Curso / certificado:** [AVAMEC](${avamec}). **Enem:** [MEC Enem](${enemApp}).  
6. Se o objecto for **cannabis medicinal**, [UNIFESP](${unifesp}) — não este mapa.  
7. Fechar com [Faça o melhor!](${mantra}) e [Vida](${vida}).

## Créditos

**Todo o mérito pedagógico, editorial e técnico pertence ao Ministério da Educação, à EBC, ao INEP, às universidades e equipas parceiras (AVAMEC/LabTime-UFG, IsF, etc.).** Esta inspeção só documenta o mapa público. Sem afiliação. Sem comissão.

Fontes: [MEC](${mec}) · [FAQ Livros](${livrosFaq}) · [FAQ Idiomas](${idiomasFaq}) · [AVAMEC](${avamecGov}) · [Canal Educação](${canalEdu}) · [MEC Enem](${enem}) · [IsF](${isf})

## Status

**Aprovado como ficha-mapa de ensino público GOV.BR** — Canal Educação, MEC Idiomas, MEC Livros, AVAMEC e MEC Enem documentados no eixo [formação académica](${hubFormacao}) do BudGanja, **distintos** do SIEX e do ICL. Indexar ≠ endosso. Confirmar acesso e regras no site oficial.

[▶ MEC Livros](${livros}) · [▶ MEC Idiomas](${idiomasFaq}) · [▶ Canal Educação](${canalYt}) · [▶ AVAMEC](${avamec}) · [▶ MEC Enem](${enemApp}) · [▶ gov.br](${gov}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial map of **Brazil’s free federal learning stack** under [gov.br](${gov}) / [MEC](${mec}): **video** ([Canal Educação](${canalYt}) — @canaleducacaobr), **languages** ([MEC Idiomas](${idiomasFaq}) — English and Spanish), **books** ([MEC Livros](${livros})), plus **AVAMEC** (courses/certificates) and **MEC Enem** (exam practice). Independent audit; **no affiliation**. Catalogues and loan rules change. **Cataloguing ≠ political endorsement.**

One login: **gov.br** (CPF). Apps also listed at [aplicativos.mec.gov.br](${appsMec}).

| Need | Open |
|------|------|
| Educational TV / YouTube | [Canal Educação](${canalYt}) · live [EBC](${canalLive}) |
| English / Spanish | [MEC Idiomas](${idiomasFaq}) |
| Free library | [MEC Livros](${livros}) — ~8k titles at 2026 launch; 14-day loans on licensed works |
| Certified short courses | [AVAMEC](${avamec}) |
| Enem drills / AI essay | [MEC Enem](${enemApp}) |

Does **not** replace the [UNIFESP cannabis extension](${unifesp}) or paid [ICL Courses](${icl}). Screen-time limits still apply ([phone × children](${celular})). Canal Educação is **not** ingested into this lab’s cultivation [/videos/](/videos/) hub.

## Status

**Approved** as the public-education map on the academic-extension series. Confirm access on official pages.

[▶ Books](${livros}) · [▶ Languages](${idiomasFaq}) · [▶ Canal Educação](${canalYt}) · [▶ gov.br](${gov})
`;

  const contentEs = `## Alcance

Mapa editorial de la **oferta federal gratuita de enseñanza** en [gov.br](${gov}) / [MEC](${mec}): **vídeo** ([Canal Educação](${canalYt}) — @canaleducacaobr), **idiomas** ([MEC Idiomas](${idiomasFaq}) — inglés y español), **libros** ([MEC Livros](${livros})), más **AVAMEC** (cursos/certificados) y **MEC Enem** (simulacros). Auditoría independiente; **sin afiliación**. Los acervos cambian. **Indexar ≠ respaldo político.**

Un login: **gov.br** (CPF). Apps en [aplicativos.mec.gov.br](${appsMec}).

| Quiero | Abrir |
|--------|-------|
| TV educativa / YouTube | [Canal Educação](${canalYt}) · vivo [EBC](${canalLive}) |
| Inglés / español | [MEC Idiomas](${idiomasFaq}) |
| Biblioteca gratuita | [MEC Livros](${livros}) — ~8 mil obras en el lanzamiento 2026; préstamo 14 días en obras licenciadas |
| Cursos con certificado | [AVAMEC](${avamec}) |
| Enem / redacción con IA | [MEC Enem](${enemApp}) |

**No** sustituye el [curso UNIFESP](${unifesp}) ni los [cursos ICL](${icl}) de pago. El tiempo de pantalla sigue contando ([celular × niños](${celular})). Canal Educação **no** entra en el hub [/videos/](/videos/) de cultivo de este laboratorio.

## Estado

**Aprobada** como ficha-mapa de enseñanza pública. Confirmar el acceso en las páginas oficiales.

[▶ Libros](${livros}) · [▶ Idiomas](${idiomasFaq}) · [▶ Canal Educação](${canalYt}) · [▶ gov.br](${gov})
`;

  return { body, contentEn, contentEs };
}

function buildGovbrEnsinoInspecaoPost() {
  const inspected = '2026-08-21';
  const { body, contentEn, contentEs } = buildGovbrEnsinoBodies(inspected);

  return formacaoPost({
    title: 'Inspeção: plataformas de ensino GOV.BR — Canal Educação, MEC Idiomas e MEC Livros',
    titleEn: 'Inspection: GOV.BR learning platforms — Canal Educação, MEC Idiomas and MEC Livros',
    titleEs: 'Inspección: plataformas de enseñanza GOV.BR — Canal Educação, MEC Idiomas y MEC Livros',
    excerpt:
      'Mapa gratuito do MEC com login gov.br: Canal Educação (vídeos), MEC Idiomas (inglês/espanhol), MEC Livros (biblioteca), AVAMEC e MEC Enem. Sem afiliação. Catalogar ≠ endosso político.',
    excerptEn:
      'Free MEC map with gov.br login: Canal Educação (video), MEC Idiomas (English/Spanish), MEC Livros (library), AVAMEC and MEC Enem. No affiliation. Cataloguing ≠ political endorsement.',
    excerptEs:
      'Mapa gratuito del MEC con login gov.br: Canal Educação (vídeo), MEC Idiomas (inglés/español), MEC Livros (biblioteca), AVAMEC y MEC Enem. Sin afiliación. Indexar ≠ respaldo político.',
    slug: 'inspecao-plataformas-ensino-govbr',
    date: inspected + 'T18:00:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'GOV.BR · Ensino',
    coverImage: '/imagens/inspecoes/govbr-ensino-cover.jpg',
    sourceUrl: 'https://www.gov.br/mec/pt-br',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildGovbrEnsinoInspecaoPost,
  buildGovbrEnsinoBodies
};
