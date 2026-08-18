'use strict';

/**
 * Legado · família Klink: Amyr (pai) + Tamara (filha).
 * Série legado-pessoas — Caps. 7 e 8 (juntos no hub).
 * Recorte: navegação, planeamento e coragem brasileira — distinto do eixo clínico Ticão–Carlini.
 */

function pessoaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
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
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

const AMYR = '/posts/post-inspecao-amyr-klink.html';
const TAMARA = '/posts/post-inspecao-tamara-klink.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const LEGADO = '/biblioteca/inspecoes/#inspecoes-pessoas';
const WIKI_AMYR = 'https://pt.wikipedia.org/wiki/Amyr_Klink';
const WIKI_TAMARA = 'https://pt.wikipedia.org/wiki/Tamara_Klink';
const SITE_TAMARA = 'https://www.tamaraklink.com';
const CANAL_TAMARA = '/posts/post-inspecao-canal-tamaraklink.html';
const CANAL_AMYR = '/posts/post-inspecao-canal-amyrklink.html';
const VIDEOS_TAMARA = '/videos/?channel=tamara';
const VIDEOS_AMYR = '/videos/?channel=amyr';

function buildAmyrBodies(inspected) {
  const body = `## Escopo

Inspeção editorial e documental do **legado público** de **Amyr Khan Klink** (São Paulo, 25 de setembro de 1955) — navegador, explorador e escritor brasileiro. O objectivo não é biografia náutica completa: é registar, com fontes públicas e com o **mérito que lhe é devido**, o fio de **planeamento, risco calculado e partida** que o laboratório cruza com a metáfora do [caminho](${CAMINHO}) — e que continua na filha [Tamara Klink](${TAMARA}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikipédia · Amyr Klink](${WIKI_AMYR}), livros e reportagens públicas. **Sem afiliação** com Amyr Klink, a família ou editoras. Este capítulo de **Legado** é **cultural / exploratório** — não faz parte do eixo clínico Ticão–Carlini–CEBRID; fica **junto** da ficha da [Tamara](${TAMARA}) por continuidade familiar e de ofício.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Amyr Khan Klink** |
| Nascimento | 25 de setembro de 1955, São Paulo |
| Ofício | Navegador · explorador · escritor · palestrante |
| Feito âncora | 1.ª travessia a remo do Atlântico Sul em solitário (1984) — barco **IAT** |
| Família | Casado com Marina Bandeira Klink; três filhas, incluindo **Tamara** |
| Elo BudGanja | Legado Cap. 7 · filha Cap. 8 · [caminho](${CAMINHO}) / [passar](${PASSAR}) |
| Canal YouTube | [Inspeção do canal](${CANAL_AMYR}) · [Vídeos · Amyr](${VIDEOS_AMYR}) — **pessoa ≠ canal** |
| Filha (vídeos) | [Tamara + família](${VIDEOS_TAMARA}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O laboratório documenta **crédito a quem merece**. Amyr é referência nacional de quem **parte** depois de planear — cem dias entre céu e mar, Antártida, circum-navegações. Sem o pai, a ficha da [Tamara](${TAMARA}) ficaria órfã de contexto. Colocá-los **juntos** no Legado é método, não coincidência.

## Hipóteses e método

- **H1:** o legado de Amyr é **método** (plano, risco, obstinação) antes de ser «aventura».
- **H2:** a travessia de 1984 e as invernagens polares fixam um padrão de **coragem com disciplina**.
- **H3:** a continuidade familiar com Tamara é um [passar](${PASSAR}) de ofício — não cópia, mas herança viva.
- **Método:** (1) síntese biográfica pública; (2) feitos âncora; (3) elo com Tamara e Palavras; (4) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1955 | Nasce em São Paulo (pai libanês, mãe sueca). |
| 1984 | Travessia a remo Namíbia → Bahia (~100 dias, ~7 000 km) — livro *Cem Dias entre Céu e Mar*. |
| 1989–1991 | Expedição Antártida / *Paratii*; invernagem no gelo. |
| 1998–1999 | Circum-navegação em solitário (*Paratii*). |
| 2003–2004 | Nova circum-navegação em altas latitudes (*Paratii 2*). |
| 1996 → | Casamento com Marina Bandeira Klink; filhas Tamara, Laura e Marina Helena. |
| Décadas seguintes | Livros, palestras (planeamento, liderança, risco) e Museu Nacional do Mar (sócio fundador). |

## Achados (mérito devido)

1. **Pioneirismo náutico brasileiro** — a remada de 1984 entrou no imaginário nacional de exploração.
2. **Planeamento como ética** — a fala pública de Amyr insiste: sonho sem partida é barco no quintal.
3. **Elo familiar** — três filhas; Tamara prolonga o ofício com feitos próprios (Ártico, Passagem Noroeste).
4. **Complementaridade lexical** — [caminho](${CAMINHO}) e [passar](${PASSAR}) leem-se melhor com este legado de rota.
5. **Limites** — ficha não substitui os livros nem inventa afiliação canábica; é **legado de coragem e método**.

## Complementaridade com o Inspetor BudGanja

| Tema Amyr | Recurso BudGanja |
|-----------|------------------|
| Filha / continuidade | [Tamara Klink](${TAMARA}) |
| Metáfora de rota | [caminho](${CAMINHO}) · [passar](${PASSAR}) |
| Arquivo YouTube | [Canal Amyr](${CANAL_AMYR}) · [Vídeos](${VIDEOS_AMYR}) · [Tamara + família](${VIDEOS_TAMARA}) |
| Hub Legado | [Inspeções · Legado](${LEGADO}) |

## Créditos e referências

- [Wikipédia · Amyr Klink](${WIKI_AMYR})
- *Cem Dias entre Céu e Mar* e restantes obras públicas
- Ficha irmã: [Tamara Klink](${TAMARA})

## Status

**Aprovado com mérito como referência de legado exploratório brasileiro** — Amyr Klink · Cap. 7; Tamara · Cap. 8 (junto).

[Tamara Klink](${TAMARA}) · [Canal YouTube](${CANAL_AMYR}) · [Vídeos](${VIDEOS_AMYR}) · [Legado](${LEGADO}) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial inspection of **Amyr Khan Klink** (b. 1955, São Paulo) — Brazilian navigator, explorer and writer. Focus: planning, calculated risk and the courage to depart — linked to [caminho](${CAMINHO}) and to his daughter [Tamara Klink](${TAMARA}).

> Independent BudGanja audit. Sources: [Wikipedia · Amyr Klink](${WIKI_AMYR}). No affiliation. Cultural/exploratory **Legacy** chapter — not the Ticão–Carlini clinical axis; placed **next to** [Tamara](${TAMARA}).

## Object

| Field | Value |
|-------|-------|
| Name | **Amyr Khan Klink** |
| Anchor feat | First solo row across the South Atlantic (1984) |
| Family | Married to Marina Bandeira Klink; daughters include **Tamara** |
| Inspection date | ${inspected} |

## Status

**Approved with merit** — exploratory Brazilian legacy · Cap. 7, beside Cap. 8 [Tamara](${TAMARA}).`;

  const contentEs = `## Alcance

Inspección editorial de **Amyr Khan Klink** (n. 1955, São Paulo) — navegante, explorador y escritor brasileño. Foco: planificación, riesgo calculado y coraje de partir — enlace con [caminho](${CAMINHO}) y su hija [Tamara Klink](${TAMARA}).

> Auditoría independiente. Fuentes: [Wikipedia · Amyr Klink](${WIKI_AMYR}). Sin afiliación. Capítulo de **Legado** cultural/exploratorio — junto a [Tamara](${TAMARA}).

## Estado

**Aprobado con mérito** — legado exploratorio brasileño · Cap. 7, junto al Cap. 8 [Tamara](${TAMARA}).`;

  return { body, contentEn, contentEs };
}

function buildTamaraBodies(inspected) {
  const body = `## Escopo

Inspeção editorial e documental do **legado vivo** de **Tamara Wolff Bandeira Klink** (São Paulo, 25 de março de 1997) — velejadora e escritora brasileira, filha de [Amyr Klink](${AMYR}) e da fotógrafa Marina Bandeira Klink. O objectivo é registar, com fontes públicas e com o **mérito que lhe é devido**, os feitos próprios (Atlântico, invernagem ártica, Passagem Noroeste) **sem reduzir** Tamara a «filha de» — embora a ficha fique **junto do pai** no Legado (Caps. 7–8).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Tamara Klink](${WIKI_TAMARA}), [site oficial](${SITE_TAMARA}), UNESCO, G1, National Geographic e reportagens. Grafia oficial: **Klink** (por vezes escrita «Clinck»). **Sem afiliação**. Capítulo de **Legado** cultural / exploratório — distinto do eixo clínico Ticão–Carlini.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Tamara Wolff Bandeira Klink** |
| Nascimento | 25 de março de 1997, São Paulo |
| Pais | [Amyr Klink](${AMYR}) · Marina Bandeira Klink |
| Ofício | Velejadora · escritora · oradora |
| Embarcação | *Sardinha* / *Sardinha 2* — nome dado pela avó **Ana Francesca** |
| Feitos âncora | Atlântico em solitário; 1.ª mulher a invernar sozinha no Ártico congelado; Passagem Noroeste em solitário (2025) |
| Elo BudGanja | Legado Cap. 8 · pai Cap. 7 · [caminho](${CAMINHO}) / [passar](${PASSAR}) |
| Canal YouTube | [Inspeção do canal](${CANAL_TAMARA}) · [Vídeos · Tamara + família](${VIDEOS_TAMARA}) — **pessoa ≠ canal** |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila do laboratório: honrar quem **continua o ofício com voz própria**. Tamara cresceu no mar da família Klink e depois **partiu** — Atlântico, Ártico, Noroeste — com livros (*Crescer e partir*, *Nós*, *Bom dia, Inverno*) e reconhecimento internacional (UNESCO, National Geographic). Colocá-la **junto do pai** no hub Legado torna legível a herança e a diferença.

## Hipóteses e método

- **H1:** Tamara herda o **método** (preparação, obstinação) e afirma **autonomia** (feitos em solitário, narrativa própria).
- **H2:** a invernagem ártica e a Passagem Noroeste são marcos de [caminho](${CAMINHO}) extremo — risco, isolamento, disciplina.
- **H3:** o par Amyr–Tamara ilustra o [passar](${PASSAR}) geracional sem apagar a individualidade da filha.
- **Método:** (1) biografia pública; (2) feitos verificáveis; (3) obras; (4) elo com Amyr; (5) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1997 | Nasce em São Paulo; gémea de Laura; irmã de Marina Helena. |
| 2010 | *Férias na Antártica* (com as irmãs) — viagens em família. |
| 2020 | 1.ª travessia em solitário (Mar do Norte) com o *Sardinha* (nome da avó Ana Francesca). |
| 2021 | Atlântico França → Recife em solitário; livros *Mil Milhas*, *Um mundo em poucas linhas*, *Crescer e partir*. |
| 2022 | Minissérie *Seu Melhor Caminho é o Próximo* (Globoplay); costa brasileira Recife → Paraty. |
| 2023–2024 | Expedição França → Groenlândia; invernagem sozinha no gelo ártico (~8 meses) — [*Bom dia, Inverno*](/posts/post-inspecao-arte-bom-dia-inverno.html) (2026). |
| Set 2025 | Conclui a **Passagem Noroeste** em solitário (Groenlândia → Alasca) — 1.ª pessoa da América Latina; entre as mais jovens do mundo. |

## Achados (mérito devido)

1. **Feitos próprios** — invernagem ártica solo e Passagem Noroeste não são «sombra» do pai; são capítulos novos.
2. **Escrita como instrumento** — a obra literária documenta o método e a experiência (não só o recorde).
3. **Continuidade com diferença** — junto de [Amyr](${AMYR}) no Legado; mérito dual: herança + autonomia.
4. **Elo com o laboratório** — metáforas de [caminho](${CAMINHO}) e [passar](${PASSAR}) ganham corpo humano e histórico.
5. **Limites** — sem inventar vínculos clínicos com cannabis medicinal; o crédito é náutico, literário e ético.

## Complementaridade com o Inspetor BudGanja

| Tema Tamara | Recurso BudGanja |
|-------------|------------------|
| Pai / origem do ofício | [Amyr Klink](${AMYR}) · [canal do pai](${CANAL_AMYR}) |
| Avó / barco | Ana Francesca nomeou o *Sardinha* |
| Rota e travessia | [caminho](${CAMINHO}) · [passar](${PASSAR}) |
| Arquivo YouTube | [Canal @TamaraKlink](${CANAL_TAMARA}) · [Vídeos + família](${VIDEOS_TAMARA}) |
| Hub Legado | [Inspeções · Legado](${LEGADO}) |
| Site | [tamaraklink.com](${SITE_TAMARA}) |

## Créditos e referências

- [Wikipédia · Tamara Klink](${WIKI_TAMARA})
- [Site oficial](${SITE_TAMARA})
- UNESCO · G1 · National Geographic · reportagens sobre Passagem Noroeste (2025)
- Ficha irmã: [Amyr Klink](${AMYR})
- Canal (vídeos, não biografia): [Inspeção @TamaraKlink](${CANAL_TAMARA}) · [Vídeos](${VIDEOS_TAMARA})

## Status

**Aprovado com mérito máximo como referência de legado vivo exploratório** — Tamara Klink · Cap. 8, **junto do pai** Amyr · Cap. 7. O arquivo YouTube vive na [ficha do canal](${CANAL_TAMARA}).

[Amyr Klink](${AMYR}) · [Canal YouTube](${CANAL_TAMARA}) · [Vídeos](${VIDEOS_TAMARA}) · [Legado](${LEGADO}) · [Todas as inspeções](/biblioteca/inspecoes/)`;

  const contentEn = `## Scope

Editorial inspection of **Tamara Wolff Bandeira Klink** (b. 1997) — Brazilian sailor and writer, daughter of [Amyr Klink](${AMYR}). Own feats: solo Atlantic, first woman to winter alone in the frozen Arctic, Northwest Passage (2025). Placed **next to her father** in Legacy (Caps. 7–8).

> Independent audit. Sources: [Wikipedia · Tamara Klink](${WIKI_TAMARA}), [official site](${SITE_TAMARA}). Official spelling **Klink**. Cultural/exploratory Legacy — not the clinical Ticão–Carlini axis.

## Status

**Approved with highest merit** — living exploratory legacy · Cap. 8, beside Cap. 7 [Amyr](${AMYR}). YouTube archive: [channel sheet](${CANAL_TAMARA}) · [Videos](${VIDEOS_TAMARA}).`;

  const contentEs = `## Alcance

Inspección editorial de **Tamara Wolff Bandeira Klink** (n. 1997) — navegante y escritora brasileña, hija de [Amyr Klink](${AMYR}). Hazañas propias: Atlántico en solitario, primera mujer en invernar sola en el Ártico congelado, Paso del Noroeste (2025). Colocada **junto a su padre** en Legado (Caps. 7–8).

> Auditoría independiente. Fuentes: [Wikipedia · Tamara Klink](${WIKI_TAMARA}). Grafía **Klink**. Legado cultural/exploratorio.

## Estado

**Aprobado con mérito máximo** — legado vivo exploratorio · Cap. 8, junto al Cap. 7 [Amyr](${AMYR}). Archivo YouTube: [ficha del canal](${CANAL_TAMARA}) · [Videos](${VIDEOS_TAMARA}).`;

  return { body, contentEn, contentEs };
}

function buildAmyrKlinkInspecaoPost() {
  const inspected = '2026-08-01';
  const { body, contentEn, contentEs } = buildAmyrBodies(inspected);
  return pessoaPost({
    title: 'Inspeção: Amyr Klink — navegador e legado de caminho',
    titleEn: 'Inspection: Amyr Klink — navigator and legacy of path',
    titleEs: 'Inspección: Amyr Klink — navegante y legado de camino',
    excerpt:
      'Ficha de legado: Amyr Klink — pioneiro da travessia a remo do Atlântico Sul (1984); planeamento, risco e ofício que continua na filha Tamara.',
    excerptEn:
      'Legacy sheet: Amyr Klink — pioneer of the solo South Atlantic row (1984); planning, risk and craft continued by daughter Tamara.',
    excerptEs:
      'Ficha de legado: Amyr Klink — pionero de la travesía a remo del Atlántico Sur (1984); planificación y oficio que continúa en su hija Tamara.',
    slug: 'inspecao-amyr-klink',
    date: inspected + 'T20:00:00.000Z',
    seriesOrder: 7,
    seriesLabel: 'Amyr Klink · legado',
    coverImage: 'imagens/inspecoes/amyr-klink-cover.jpg',
    sourceUrl: WIKI_AMYR,
    body,
    contentEn,
    contentEs
  });
}

function buildTamaraKlinkInspecaoPost() {
  const inspected = '2026-08-01';
  const { body, contentEn, contentEs } = buildTamaraBodies(inspected);
  return pessoaPost({
    title: 'Inspeção: Tamara Klink — legado vivo no Ártico',
    titleEn: 'Inspection: Tamara Klink — living legacy in the Arctic',
    titleEs: 'Inspección: Tamara Klink — legado vivo en el Ártico',
    excerpt:
      'Ficha de legado vivo: Tamara Klink — filha de Amyr; Atlântico, invernagem ártica e Passagem Noroeste em solitário; crédito junto do pai no hub Legado.',
    excerptEn:
      'Living-legacy sheet: Tamara Klink — Amyr’s daughter; solo Atlantic, Arctic wintering and Northwest Passage; filed next to her father in Legacy.',
    excerptEs:
      'Ficha de legado vivo: Tamara Klink — hija de Amyr; Atlántico, invernada ártica y Paso del Noroeste; junto a su padre en Legado.',
    slug: 'inspecao-tamara-klink',
    date: inspected + 'T20:05:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'Tamara Klink · legado',
    coverImage: 'imagens/inspecoes/tamara-klink-cover.jpg',
    sourceUrl: WIKI_TAMARA,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAmyrKlinkInspecaoPost,
  buildTamaraKlinkInspecaoPost,
  buildAmyrBodies,
  buildTamaraBodies
};
