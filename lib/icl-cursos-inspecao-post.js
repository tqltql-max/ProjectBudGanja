'use strict';

/**
 * Inspeção: ICL Cursos — plataforma de formação do Instituto Conhecimento Liberta.
 * Cursos (icl.com.br) ≠ canal YouTube. Sem afiliação. Catalogar ≠ endosso político.
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

function buildIclCursosBodies(inspected) {
  const cover = '/imagens/inspecoes/icl-cursos-cover.jpg';
  const canal = '/posts/post-inspecao-canal-icl.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const esapp = '/posts/post-inspecao-esapp-agronomia-paraguacu-paulista.html';
  const cebrid = '/posts/post-inspecao-cebrid.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Instituto_Conhecimento_Liberta';
  const site = 'https://icl.com.br/';
  const noticias = 'https://iclnoticias.com.br/conhecimento/icl/';
  const fespsp = 'https://www.fespsp.org.br/';

  const body = `## Escopo

Inspeção editorial e documental do **ICL Cursos** — a camada de **formação paga** do **Instituto Conhecimento Liberta** (plataforma [icl.com.br](${site})). O recorte não é um prospecto comercial nem um voto político: é separar, com fontes públicas, **o que é curso** (assinatura, certificados, pós FESPSP, trilhas) do **que é canal** YouTube ([ficha do canal](${canal}) — jornalismo ao vivo, gratuito).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [site da plataforma](${site}), [Wikipédia](${wiki}), [texto institucional «O que é o ICL?»](${noticias}) (14/10/2025). **Sem afiliação** com o ICL, a FESPSP, Eduardo Moreira, Rafael Donatiello, Jessé Souza ou Felipe Neto. Preços, planos, grade e regras de bolsa **mudam** — confirmar sempre em [icl.com.br](${site}) antes de assinar. **Catalogar ≠ endosso político.** **Cursos ≠ canal.**

![ICL Cursos — Instituto Conhecimento Liberta](${cover})

*Capa editorial do laboratório BudGanja — referência visual; imagens e planos oficiais em [icl.com.br](${site}).*

## Homónimo a não confundir

| Nome | O que é | Site |
|------|---------|------|
| **Instituto Conhecimento Liberta (ICL)** | Plataforma de educação, jornalismo e cultura (esta ficha) | [icl.com.br](${site}) |
| **ICL Cursos e Preparatórios** | Cursinho de concursos — **outra instituição** | [iclcursos.com.br](https://iclcursos.com.br/) |

O laboratório inspeciona o **Instituto Conhecimento Liberta**. O cursinho de concursos **não** entra nesta ficha.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **ICL Cursos** — plataforma de formação do Instituto Conhecimento Liberta |
| Sigla | **ICL** |
| Tipo | Instituto privado de educação e cultura · **assinatura** (não é universidade pública) |
| Fundação | **2020** (pandemia de COVID-19) |
| Fundadores (fontes públicas) | **Eduardo Moreira**, **Rafael Donatiello**, **Jessé Souza** |
| Parceria anunciada (2024) | **Felipe Neto** como sócio (imprensa) |
| Missão declarada | «A verdadeira liberdade só pode ser alcançada pelo conhecimento» — democratizar conteúdos |
| Oferta | **200–400+** cursos livres + originais (séries, documentários, biblioteca) |
| Pós-graduação | *Lato sensu* em parceria com a [FESPSP](${fespsp}) (348 h; concebida por Jessé Souza) |
| Trilhas à parte da assinatura | Empreendedor Mestre · Investidor Mestre |
| Financiamento declarado | **Assinantes** — sem anunciantes institucionais, segundo o próprio ICL |
| Jornalismo (camada grátis) | Portal [ICL Notícias](https://iclnoticias.com.br/) + [canal YouTube](${canal}) |
| Site | [icl.com.br](${site}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O mapa de formação do laboratório já tem **extensão federal gratuita** ([UNIFESP / MovReCam](${unifesp})), **centro científico** ([CEBRID](${cebrid})) e **intenção de graduação agronómica** ([ESAPP](${esapp})). Faltava uma ficha para um **ecossistema privado de cursos + jornalismo** de grande audiência BR — o ICL — precisamente para **não** o misturar com o SIEX nem com o cursinho de concursos homónimo.

O BudGanja **não** é um projecto do ICL. O ICL **não** ensina cultivo de cannabis. Esta ficha existe para o ofício de inspecção: nomear o objecto, o preço, o lado declarado e o limite.

## Hipóteses e método

- **H1:** **Cursos ≠ canal.** A formação densa (aulas gravadas, certificado, pós, biblioteca) vive atrás da assinatura; o YouTube é a vitrine de jornalismo ao vivo.
- **H2:** O ICL **declara lado** (campo progressista / esquerda, direitos sociais, crítica ao neoliberalismo). Indexar esse facto é [verdade](${verdade}) de recorde — não é voto do laboratório.
- **H3:** Um curso **pago por assinatura** não substitui a [extensão UNIFESP](${unifesp}) (gratuita, SIEX, cannabis medicinal) nem a [ESAPP](${esapp}) (graduação em Agronomia). São casas diferentes.
- **H4:** Volume e marca **não** são mérito pedagógico por si: o mérito, se houver, está em professores nomeados, parceria FESPSP e transparência de preço — a verificar no site, não nesta ficha.
- **Método:** (1) identidade e homónimo; (2) história pública; (3) oferta de cursos vs jornalismo; (4) preço e bolsas (valores à data); (5) posicionamento declarado; (6) limites; (7) cruzamento BudGanja.

## História (síntese verificável)

| Período | Marco |
|---------|-------|
| **2020** | Fundação na pandemia — Eduardo Moreira (economista, ex-banqueiro), Rafael Donatiello (marketing digital), Jessé Souza (sociólogo) |
| 2020–2024 | Crescimento da plataforma de cursos + canal de jornalismo; corpo com Marilena Chauí, Leonardo Boff, Chico Pinheiro, Rodrigo Vianna, entre outros (lista pública, não exaustiva) |
| **2024** | Mais de **100 mil** assinantes (Wikipédia); pós ICL/FESPSP; Felipe Neto anunciado como sócio |
| **2024–2025** | Documentário *De Quanta Terra Precisa o Homem?* (dir. Adilson Mendes; 46ª Mostra SP) |
| **2025** | Revista Liberta; Editora Conhecimento Liberta; Medalha Pedro Ernesto (Câmara Municipal do RJ) |
| **2025** | Comunicação institucional: mais de **250 mil** assinantes |

Números de audiência e de «mais de N cursos» são **do próprio ICL / Wikipédia** — o laboratório não audita CRM nem LMS.

## O que a plataforma oferece (camada cursos)

Leitura BudGanja a partir do que o ICL descreve em [icl.com.br](${site}) e no texto «O que é o ICL?»:

| Frente | O que é | Relação com a assinatura |
|--------|---------|--------------------------|
| **Cursos livres** | 200–400+ aulas gravadas (filosofia, história, política, espiritualidade, idiomas, etc.) + certificado | Incluídos no plano |
| **Pós ICL / FESPSP** | *Lato sensu* 348 h — história, política, economia, cultura, direitos humanos | **À parte** da assinatura mensal |
| **Empreendedor Mestre** | Formação de empreendedorismo com recorte social | **À parte** |
| **Investidor Mestre** | Economia política, finanças, mercado | **À parte** |
| **ICL+ / originais** | Séries e documentários | Incluídos (segundo o site) |
| **Ler+ / biblioteca** | Livros digitais da editora | Incluídos ou no plano Solidário (confirmar no checkout) |
| **ICL Kids / Oráculo** | Camadas extra anunciadas no site (2026) | Confirmar no plano vigente |

## Pago e gratuito — dois andares

O ICL diz: «é pago. Mas também é gratuito.»

| Andar | Acesso | Onde |
|-------|--------|------|
| **Jornalismo** | Gratuito | Portal + [canal YouTube](${canal}) (~8 h/dia de programação) |
| **Cursos, originais, biblioteca** | Assinatura | [icl.com.br](${site}) |
| **Bolsas** | Formulário (critério interno) | Canal oficial — o lab **não** gere bolsas |

### Preços públicos (outubro 2025 — podem ter mudado)

Valores citados no texto institucional do ICL Notícias (14/10/2025). **Não** são proposta comercial do BudGanja.

| Plano | Valor então publicado | Nota |
|-------|----------------------|------|
| Essencial | 12× **R$ 47**/mês | Cursos + originais + comunidade |
| Solidário | 12× **R$ 62**/mês | Essencial + 1 bolsa doada + extras |
| Site (2026) | A partir de **R$ 47–57**/mês | Confirmar checkout |

Garantia de 15 dias, renovação automática e cancelamento sem fidelidade são **promessas do ICL** — ler o contrato no acto da compra.

## Posicionamento político (facto declarado)

O ICL **não esconde o lado**. Texto institucional: projecto do **campo progressista**, defesa da democracia, direitos sociais e redução de desigualdades; crítica ao neoliberalismo e à «mercantilização do saber».

No laboratório:

- **Registar o lado** = [verdade](${verdade}) de ficha.
- **Adoptar o lado** = o BudGanja **não** faz.
- Índice e inspeção **não** são campanha.

Quem procura formação **clínica / agronómica / canábica** continua no eixo [UNIFESP](${unifesp}) · [CEBRID](${cebrid}) · [ESAPP](${esapp}). O ICL é outra casa: humanas, política, jornalismo.

## Limites e riscos (leitura BudGanja)

- **Partidarização do saber:** a plataforma assume lado. Útil para quem quer essa lente; insuficiente como única fonte. Cruzar.
- **Curso pago ≠ diploma MEC de graduação:** cursos livres e pós *lato sensu* FESPSP **não** substituem Agronomia nem o SIEX.
- **Preço em movimento:** o site já mostrou R$ 47 e R$ 57 no mesmo intervalo; esta ficha não congela tabela.
- **Volume ≠ rigor:** 300 cursos e 8 h de live **não** provam qualidade de cada aula. Amostra, professor, ementa.
- **Conflito de marca:** Felipe Neto como sócio (2024) é facto de imprensa — o lab não avalia o negócio.
- **Homónimo:** iclcursos.com.br é outro objecto.

## Relação com as fichas BudGanja

| Ficha | Papel |
|-------|-------|
| [Canal ICL](${canal}) | YouTube — jornalismo ao vivo. **Não** é o LMS de cursos |
| [Curso UNIFESP](${unifesp}) · [MovReCam](${movrecam}) | Extensão **gratuita** e federal em cannabis medicinal — outro contrato social |
| [CEBRID](${cebrid}) | Centro científico UNIFESP — psicotrópicos; não é ICL |
| [ESAPP](${esapp}) | Graduação em Agronomia — intenção formativa do Inspetor |
| [verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}) · [especial](${especial}) | Palavras do método: recorde, crédito, limite, entrega especial |

## Como usar no site

1. Se o objecto for **aula / assinatura / pós**, esta ficha e [icl.com.br](${site}).  
2. Se o objecto for **telejornal / live**, a [ficha do canal](${canal}).  
3. Se o objecto for **cannabis medicinal**, [UNIFESP](${unifesp}) — não o ICL.  
4. Fechar com [Valeu !!!](${mantra}) — o melhor recorte possível *desta* casa *neste* laboratório.

## Créditos

**Todo o mérito pedagógico, jornalístico e editorial pertence ao Instituto Conhecimento Liberta, aos professores, jornalistas e equipas.** Esta inspeção só documenta. Sem afiliação. Sem comissão.

Fontes: [icl.com.br](${site}) · [ICL Notícias — O que é o ICL?](${noticias}) · [Wikipédia](${wiki}) · [FESPSP](${fespsp})

## Status

**Aprovado como ficha de formação privada** — ICL Cursos documentado no mapa académico do BudGanja, **distinto** do [canal](${canal}) e **não** confundido com o cursinho de concursos. Indexar ≠ endosso. Confirmar preço e ementa no site oficial.

[▶ ICL Cursos](${site}) · [▶ Canal YouTube](${canal}) · [▶ UNIFESP](${unifesp}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **ICL Courses** — the paid learning layer of **Instituto Conhecimento Liberta** ([icl.com.br](${site})). **Courses ≠ YouTube channel** ([channel sheet](${canal})). Independent audit; **no affiliation**. Prices change. **Cataloguing ≠ political endorsement.**

Do not confuse with **ICL Cursos e Preparatórios** ([iclcursos.com.br](https://iclcursos.com.br/)) — a different exam-prep school.

Founded **2020** by Eduardo Moreira, Rafael Donatiello and Jessé Souza. 200–400+ recorded courses behind a subscription; journalism on the free portal and YouTube (~8 h/day). Postgraduate *lato sensu* with [FESPSP](${fespsp}). The institute **states a progressive/left stance** — recorded as fact, not as this lab's vote.

Does **not** replace [UNIFESP cannabis extension](${unifesp}) or [ESAPP Agronomy](${esapp}).

## Status

**Approved** as a private-education sheet. Confirm prices on the official site.

[▶ Courses](${site}) · [▶ Channel](${canal})
`;

  const contentEs = `## Alcance

Inspección editorial de **ICL Cursos** — la capa de formación de pago del **Instituto Conhecimento Liberta** ([icl.com.br](${site})). **Cursos ≠ canal de YouTube** ([ficha del canal](${canal})). Auditoría independiente; **sin afiliación**. Los precios cambian. **Indexar ≠ respaldo político.**

No confundir con **ICL Cursos e Preparatórios** ([iclcursos.com.br](https://iclcursos.com.br/)).

Fundado en **2020**. Cursos grabados tras suscripción; periodismo gratis en portal y YouTube. Posgrado con [FESPSP](${fespsp}). El instituto **declara** campo progresista — se registra; el laboratorio no vota.

No sustituye el [curso UNIFESP](${unifesp}) ni la [ESAPP](${esapp}).

## Estado

**Aprobada** como ficha de formación privada. Confirmar precios en el sitio oficial.

[▶ Cursos](${site}) · [▶ Canal](${canal})
`;

  return { body, contentEn, contentEs };
}

function buildIclCursosInspecaoPost() {
  const inspected = '2026-08-21';
  const { body, contentEn, contentEs } = buildIclCursosBodies(inspected);

  return formacaoPost({
    title: 'Inspeção: ICL Cursos — Instituto Conhecimento Liberta',
    titleEn: 'Inspection: ICL Courses — Instituto Conhecimento Liberta',
    titleEs: 'Inspección: ICL Cursos — Instituto Conhecimento Liberta',
    excerpt:
      'Ficha da plataforma de cursos do ICL (icl.com.br): assinatura, pós FESPSP, cursos ≠ canal YouTube. Sem afiliação. Catalogar ≠ endosso político.',
    excerptEn:
      'Sheet on ICL’s course platform (icl.com.br): subscription, FESPSP postgraduate, courses ≠ YouTube channel. No affiliation. Cataloguing ≠ political endorsement.',
    excerptEs:
      'Ficha de la plataforma de cursos del ICL (icl.com.br): suscripción, posgrado FESPSP, cursos ≠ canal de YouTube. Sin afiliación. Indexar ≠ respaldo político.',
    slug: 'inspecao-icl-cursos',
    date: inspected + 'T16:00:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'ICL · Cursos',
    coverImage: '/imagens/inspecoes/icl-cursos-cover.jpg',
    sourceUrl: 'https://icl.com.br/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIclCursosInspecaoPost,
  buildIclCursosBodies
};
