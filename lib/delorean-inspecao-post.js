'use strict';

/**
 * Inspeção Artes · objecto: DeLorean DMC — carro real e máquina do filme.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildDeloreanBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wiki = 'https://pt.wikipedia.org/wiki/DeLorean_DMC-12';
  const wikiEn = 'https://en.wikipedia.org/wiki/DMC_DeLorean';
  const john = 'https://pt.wikipedia.org/wiki/John_DeLorean';
  const filme = '/posts/post-inspecao-filme-de-volta-para-o-futuro.html';
  const fox = '/posts/post-inspecao-figura-michael-j-fox.html';
  const lloyd = '/posts/post-inspecao-figura-christopher-lloyd.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';

  const body = `## Escopo

Inspeção editorial do **DeLorean** — o **DMC DeLorean** (designação interna de pré-produção **DMC-12**; nas vendas, só **DeLorean**). Coupé de aço inoxidável e portas *gull-wing*, desenhado por **Giorgetto Giugiaro**, produzido em **Dunmurry** (Irlanda do Norte) em **1981–1982**. O **início de tudo** é o **carro real**. A máquina do tempo de [De Volta para o Futuro](${filme}) (1985) entra **depois**, como **camada de ficção** — não como origem.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · DeLorean DMC-12](${wiki}), [EN](${wikiEn}), [John DeLorean](${john}). Crédito: DMC, Giugiaro / Italdesign, Lotus / Colin Chapman, operários de Dunmurry. Sem afiliação com réplicas, merchandising ou a DMC do Texas. Distinto do [Legado](${legado}) canábico. **Ficção de viagem no tempo ≠ manual.** Prisão de John DeLorean (1982) e absolvição (1984): **facto**; **não** é o centro desta ficha.

Esta ficha é Artes · **objecto**. O filme honra os actores; aqui honra-se o **carro** e as **pessoas que o fizeram**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **DeLorean** (pré-produção: DMC-12) |
| Classe | Coupé desportivo · 2 portas |
| Fabricante | DeLorean Motor Company (DMC) |
| Designer | **Giorgetto Giugiaro** (Italdesign) — eco do Porsche Tapiro (1970) |
| Engenharia | William T. Collins (protótipo) · **Colin Chapman** / Lotus (chassi em Y) |
| Produção | **jan. 1981 – 24 dez. 1982** · Dunmurry, condado de Antrim |
| Unidades | ~**9 000** (fontes: 8 583–9 200) |
| Carroçaria | Aço inoxidável **SS304** sem tinta · portas *gull-wing* (Grumman / Unbrako) |
| Motor | PRV V6 2,8 L (Peugeot–Renault–Volvo) · traseiro · 130 hp (EUA) |
| Tração | Traseira · 5 marchas manuais ou 3 automáticas (Renault) |
| Peso / comprimento | ~1 233 kg · 4 216 mm |
| Tipo BudGanja | Objecto — **carro real primeiro**; máquina do filme como camada |
| Elo filme | [De Volta para o Futuro](${filme}) |
| Elo Palavras | [objetos](${objetos}) · [tempo](${tempo}) · [caminho](${caminho}) · [skill](${skill}) |
| Fonte | [Wikipédia · DMC-12](${wiki}) |
| Data | ${inspected} |

## Hipóteses e método

**H1:** o DeLorean **existe sem o filme** — Dunmurry, Giugiaro, inox, *gull-wing*. A ficha começa aí.  
**H2:** Zemeckis/Gale escolhem-no porque **parece um disco voador** (os Peabody, 1955) e porque o frigorífico era perigoso para crianças. A ficção **adapta** o objecto; não o inventa.  
**H3:** 88 mph é **regra de cinema**, não especificação de fábrica. O carro real pode passar de 88; a viagem no tempo **não**.  
**H4:** crédito às **pessoas do objecto**: John DeLorean, Giugiaro, Collins, Chapman, a linha de Dunmurry.  
**H5:** fecho = [objetos](${objetos}) + [Valeu !!!](${mantra}) — inspecionar o que fica diante, sem confundir aço com mito.

## 1. O carro real (génese)

**John Zachary DeLorean** (Detroit, 6 jan. 1925 — 19 mar. 2005) sai da GM (Pontiac GTO / Firebird) e funda a DMC. O primeiro protótipo («DSV-1») fica pronto em **outubro de 1976** (William T. Collins). O nome **DMC-12** apontava a US$ 12 000; o preço de venda chega a **~US$ 25 000**.

O motor Wankel / Citroën não vinga. Fica o **PRV V6**. A tecnologia ERM do chassi não escala; **Colin Chapman** (Lotus) redesenha: chassi em duplo Y, métodos da Esprit. Giugiaro veste o inox e as portas asa-de-gaivota.

A fábrica de Dunmurry abre numa Irlanda do Norte com desemprego alto. Protestantes e católicos na mesma linha. Centenas de «mulas» pretas de fibra (sem inox) formam os operários. Primeira unidade: **21 de janeiro de 1981**. Última: **24 de dezembro de 1982**.

A DMC falha a **26 de outubro de 1982**, no mês da prisão de John DeLorean sob acusações de tráfico. **Absolvido em agosto de 1984.** A empresa já tinha caído. O laboratório regista o processo como **facto judicial** e **não** o transforma em lenda nem em sermão. O objecto inspecionado continua a ser o **carro**.

Em 2007 estimava-se que restavam ~6 500 unidades.

## 2. Ficha técnica (o que se pode verificar)

| Item | Valor (fontes wiki) |
|------|---------------------|
| Motor | 2,8 L PRV V6 · Bosch K-Jetronic · 130 hp @ 5 500 rpm (versão EUA) |
| Binário | ~208–220 N·m @ 2 750 rpm |
| 0–60 mph | DMC: 8,8 s (manual) · medições: ~9,5 s · automático *R&T*: 10,5 s |
| Vel. máxima | Fontes divergem: 175–209 km/h (109–130 mph) |
| Peso / depósito | 1 233 kg · 51 L |
| Portas | *Gull-wing* · ~27,5 cm de vão para abrir · cintas para fechar |
| Distribuição | ~35 % frente / 65 % traseira |
| Pintura de fábrica | Nenhuma (excepto 3 banhados a ouro de série especial) |

Imprensa da época: visual e consumo elogiados; **desempenho abaixo** do desportivo prometido (~200 hp no sonho; ~130 hp após normas EUA). Análises posteriores foram mais duras (*Time* «50 piores»). O laboratório **não** precisa de defender o 0–60: inspeciona o **objecto que é**, não o cartaz.

## 3. Pessoas do objecto (crédito)

| Pessoa / grupo | Ofício |
|----------------|--------|
| **John DeLorean** | Visão, DMC, o nome no capô — [pessoa](${john}), não a máquina |
| **Giorgetto Giugiaro** | Forma: inox, *gull-wing*, linha Tapiro |
| **William T. Collins** | Protótipo DSV / engenharia inicial |
| **Colin Chapman** + Lotus | Chassi que se pode produzir |
| **Linha de Dunmurry** | Quem aparafusou o inox — [respeito](${respeito}) de ofício |
| **Grumman / Unbrako** | Barras de torção das portas |

John DeLorean **não** é o carro. Giugiaro **não** é o filme. Os operários **não** são figurantes.

## 4. A camada do filme (1985)

Em [De Volta para o Futuro](${filme}), Zemeckis e Gale **trocam o frigorífico** (risco de crianças se trancarem) e a explosão nuclear por este coupé. A família Peabody, em 1955, lê o aço e as portas como **disco voador** — a piada só funciona porque o objecto **já** parece de outro planeta.

| Peça de cinema | Leitura BudGanja |
|----------------|------------------|
| 88 mph | Número de **guião** — não é dado de fábrica |
| Flux capacitor | Invenção narrativa (Doc / [Lloyd](${lloyd})) |
| Plutónio / raio / Mr. Fusion | Combustível de **ficção** — não se reproduz |
| Time circuits | Léxico de [tempo](${tempo}) / [passado](${passado}) |
| [Fox](${fox}) ao volante | Actor no objecto; o carro não é o homem |

**Ficção de jogo / cinema ≠ manual.** Esta ficha **não** ensina a «converter» um DeLorean nem a brincar com alta tensão, combustível ou velocidade.

## 5. Tese cultural

O DeLorean é um [objeto](${objetos}) com **duas vidas**: máquina falhada de mercado (1981–82) e ícone que o filme **não inventou**, só **acendeu**. O [caminho](${caminho}) do aço — Detroit → Dunmurry → Hill Valley — é ofício + acaso + [criatividade](${criatividade}) de quem escolheu *este* carro e não outro.

| Confusão | Correção |
|----------|----------|
| «O DeLorean é a máquina do tempo» | É um **coupé DMC**. A máquina é **camada** do filme |
| «88 mph é a especificação» | 88 é **cena**. O carro real tem outra ficha |
| «John DeLorean = o vilão / o génio» | É **pessoa** com CV e processo; o objecto é o carro |
| «Inspecionar = tunar» | Inspecionar = **nomear, medir, creditar** |

## Elos

| Recurso | Papel |
|---------|-------|
| [De Volta para o Futuro](${filme}) | Filme — actores e obra |
| [Michael J. Fox](${fox}) · [Christopher Lloyd](${lloyd}) | Quem conduz e quem «inventa» no ecrã |
| [objetos](${objetos}) | Meta: o que fica diante |
| [tempo](${tempo}) · [passado](${passado}) · [caminho](${caminho}) | Léxico da travessia |
| [skill](${skill}) | Engenharia Lotus + portas Grumman |
| [Valeu !!!](${mantra}) | O melhor recorte *deste* objecto |

> Abrir primeiro esta ficha se o interesse for o **carro**. Abrir o [filme](${filme}) se o interesse for a **obra e o elenco**.

## Limites

- Não é anúncio, leilão nem guia de compra.  
- Não é física de viagem no tempo.  
- Processo de 1982–84: facto + absolvição; **sem** centro moralista.  
- Números de produção e de velocidade máxima **divergem** nas fontes — a ficha declara a margem.  
- Distinto do [Legado](${legado}) canábico.

## Status

**Aprovado na série Artes como objecto** — DeLorean DMC · carro real (Giugiaro, Dunmurry, 1981–82) · camada de [De Volta para o Futuro](${filme}) como ficção creditada, não como origem.

[▶ Artes](${hub}) · [▶ o filme](${filme}) · [▶ objetos](${objetos}) · [▶ tempo](${tempo}) · [▶ Valeu !!!](${mantra}) · [Wikipedia · carro](${wiki}) · [John DeLorean](${john})
`;

  const contentEn = `## Scope

Inspection of the **DMC DeLorean** (pre-production **DMC-12**). Real stainless-steel gull-wing coupe by **Giorgetto Giugiaro**, built in **Dunmurry** (1981–1982). The **car comes first**. The time machine in [Back to the Future](${filme}) is a **fiction layer**, not the origin.

> [Wikipedia](${wikiEn}). Credit: DMC, Giugiaro, Lotus/Chapman, Dunmurry line. **Time-travel fiction is not a manual.** John DeLorean’s 1982 arrest and 1984 acquittal: fact — not the center.

## Object

~9 000 cars · SS304 unpainted · PRV V6 2.8 L · ~130 hp (US) · rear engine. Designer Giugiaro; chassis after Colin Chapman / Lotus.

## Film layer

Fridge replaced (child-safety). DeLorean chosen because it **looks like a UFO** in 1955. **88 mph** is a script number, not a factory spec.

## Status

**Approved in Arts as object** — real car first; [film](${filme}) as credited fiction.

[▶ Film](${filme}) · [▶ Objects](${objetos})
`;

  const contentEs = `## Alcance

Inspección del **DMC DeLorean** (preproducción **DMC-12**). Cupé real de acero inoxidable y puertas *gull-wing*, **Giorgetto Giugiaro**, fábrica de **Dunmurry** (1981–1982). El **coche va primero**. La máquina del tiempo de [De Volta para o Futuro](${filme}) es **capa de ficción**, no el origen.

> [Wikipedia](${wiki}). **La ficción de viaje en el tiempo no es manual.** Arresto de 1982 y absolución de 1984: hecho — no el centro.

## Objeto

~9 000 unidades · SS304 sin pintura · PRV V6 2,8 L · ~130 hp (EE. UU.). Chasis Lotus / Chapman.

## Capa del filme

El frigorífico se descarta (seguridad infantil). Eligen el DeLorean porque **parece un ovni** en 1955. **88 mph** es número de guion.

## Estado

**Aprobado en Artes como objeto** — coche real primero; [filme](${filme}) como ficción acreditada.

[▶ Filme](${filme}) · [▶ objetos](${objetos})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildDeloreanPost() {
  const { body, contentEn, contentEs, wiki } = buildDeloreanBodies();
  return artePost({
    title: 'Inspeção: DeLorean — o carro de Dunmurry e a camada de 1985',
    titleEn: 'Inspection: DeLorean — the Dunmurry car and the 1985 layer',
    titleEs: 'Inspección: DeLorean — el coche de Dunmurry y la capa de 1985',
    excerpt:
      'Artes · objecto: DeLorean DMC (Giugiaro, Dunmurry, 1981–82) — o carro real primeiro; a máquina de De Volta para o Futuro é camada de ficção, não origem.',
    excerptEn:
      'Arts · object: DMC DeLorean (Giugiaro, Dunmurry, 1981–82) — the real car first; the Back to the Future machine is a fiction layer, not the origin.',
    excerptEs:
      'Artes · objeto: DeLorean DMC (Giugiaro, Dunmurry, 1981–82) — el coche real primero; la máquina de Back to the Future es capa de ficción, no origen.',
    slug: 'inspecao-delorean',
    date: '2026-08-18T05:40:00.000Z',
    seriesOrder: 51,
    seriesLabel: 'DeLorean · objecto',
    coverImage: 'imagens/inspecoes/delorean-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDeloreanPost,
  buildDeloreanBodies
};
