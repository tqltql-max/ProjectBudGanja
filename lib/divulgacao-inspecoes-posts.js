'use strict';

/**
 * Inspeções «Divulgação»: comunicação pública de saúde / cannabinoides
 * fora do eixo UNIFESP–MovReCam–CEBRID (Legado).
 * Série: divulgacao-saude — tipagem no hub → 'divulgacao'.
 *
 * Método: biografia pública + canal (IDs verificáveis) + textos canábicos
 * + limites/controvérsias com fontes — sem equiparar a Ticão/Carlini.
 */

function divulgacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'divulgacao-saude',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Divulgação',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildLairRibeiroBodies() {
  const inspected = '2026-08-01';
  const hub = '/biblioteca/inspecoes/#inspecoes-divulgacao';
  const wiki = 'https://pt.wikipedia.org/wiki/Lair_Ribeiro';
  const site = 'https://lairribeiro.com.br/';
  const yt = 'https://www.youtube.com/@DrLairRibeiroOficiall';
  const ytId = 'UCk9mgpQVdJ5oKQWkM1UPBaQ';
  const ig = 'https://www.instagram.com/drlairribeiro/';
  const pain =
    'https://lairribeiro.com.br/en/the-use-of-cannabinoids-as-an-adjuvant-in-the-treatment-of-chronic-pain/';
  const alz =
    'https://lairribeiro.com.br/en/the-use-of-cannabinoids-as-an-adjuvant-in-the-treatment-of-alzheimers-disease/';
  const liveCannabis = 'S61hC_9hmf8';
  const planta = '/plantas/cannabis-sativa/';
  const palavras = '/posts/post-inspecao-palavra-maconha.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const canabinall = '/posts/post-inspecao-canal-canabinall.html';

  const body = `## Escopo

Inspeção editorial de **Dr. Lair Geraldo Theodoro Ribeiro** (Juiz de Fora, 6 de julho de 1945) — cardiologista, nutrólogo, escritor e palestrante — e do **canal oficial no YouTube**, com foco no que o laboratório BudGanja precisa: **referências verificáveis do canal** e textos públicos sobre **cannabinoides**. Série **Divulgação** — complementar ao ecossistema; **não é origem UNIFESP / MovReCam / CEBRID**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia](${wiki}), [portal lairribeiro.com.br](${site}), canal YouTube verificado por ID. **Não é aconselhamento médico.** Sem afiliação com o autor, o portal ou o canal. **Não equiparar** esta ficha a [Carlini](${carlini}), [Ticão/curso UNIFESP](${unifesp}) ou [CANABinALL](${canabinall}). Controvérsias públicas (abaixo) são registadas com fontes — sem juízo de fórum.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Lair Geraldo Theodoro Ribeiro** |
| Nascimento | 6 de julho de 1945, Juiz de Fora (MG) |
| Formação declarada (portal) | Medicina; cardiologia; mestrado cardiologia PUC-Rio; nutrologia ABRAN/AMB |
| CRM citado no portal | CRM-MG 6972 · RQE cardiologia / nutrologia (ver portal) |
| Tipo BudGanja | Divulgação de saúde — pessoa + canal |
| Elo planta | [Cannabis sativa](${planta}) |
| Elo Palavras | [maconha](${palavras}) |
| Data da inspeção | ${inspected} |

## Canal — referências necessárias (verificado)

| Campo | Valor |
|-------|-------|
| Nome no YouTube | **Dr. Lair Ribeiro Oficial** |
| Handle | [@DrLairRibeiroOficiall](${yt}) *(dois «l» no final)* |
| ID do canal | \`${ytId}\` |
| URL canónica | [youtube.com/channel/${ytId}](https://www.youtube.com/channel/${ytId}) |
| URL vanity | [${yt}](${yt}) |
| Site oficial | [${site}](${site}) |
| Instagram (bio do canal) | [${ig}](${ig}) |
| Declaração recorrente (site/canal) | Não vende remédio/suplemento; não realiza atendimento; não comercializa aparelhos |

### Vídeo de referência (cannabis no canal)

| Campo | Valor |
|-------|-------|
| Título | AO VIVO COM Dr. Lair Ribeiro \| A força terapêutica da cannabis |
| ID | \`${liveCannabis}\` |
| URL | [youtube.com/watch?v=${liveCannabis}](https://www.youtube.com/watch?v=${liveCannabis}) |

@youtube ${liveCannabis}

> **Nota de catálogo:** o canal mistura nutrição, longevidade, autoajuda e temas clínicos em tom de divulgação. Esta inspeção **não inventaria os ~1000 vídeos**; fixa IDs oficiais e um marco canábico verificável. Novos vídeos sobre cannabis devem actualizar esta tabela em revisões futuras.

## Hipóteses e método

**H1:** o valor BudGanja é mapear **onde** Lair fala de cannabinoides (canal + site) e **como** isso se distingue do eixo acadêmico/extensão já inspecionado.  
**H2:** textos do portal sobre dor crónica e Alzheimer são **divulgação / actualização de literatura**, não substituto de artigo peer-reviewed do laboratório BudGanja.  
**H3:** registar controvérsias públicas evita que o hub «lave» a figura ao indexá-la.

Passos:

1. Confirmar IDs do canal (handle + UC…).  
2. Listar textos canábicos no site com URL.  
3. Escolher 1 vídeo-âncora no canal.  
4. Cruzar com [planta](${planta}) / [Palavras](${palavras}) / Legado (por contraste).  
5. Declarar controvérsias com fonte.  
6. Status.

## Quem é (síntese pública)

- Cardiologista e nutrólogo; escritor de dezenas de livros (autoajuda / saúde); palestrante.  
- Portal e canal declaram passagem por instituições nos EUA (Harvard Medical School, Baylor, Thomas Jefferson) e cargos em indústria farmacêutica — **crédito ao portal**; não auditámos currículos internos aqui.  
- Visibilidade histórica forte nos anos 1990 (capa *Exame*, best-sellers); continua activo em YouTube e produtos digitais do portal.  
- Pós-graduação citada: Uningá — Adequação Nutricional e Manutenção da Homeostase.

## Textos públicos sobre cannabinoides (site)

| Texto | URL | Nota editorial |
|-------|-----|----------------|
| Cannabinoids as adjuvant in chronic pain (2019) | [abrir](${pain}) | Actualização / divulgação; sistema endocanabinoide, dor |
| Cannabinoids as adjuvant in Alzheimer’s (2020) | [abrir](${alz}) | Actualização / divulgação; busca em bases (PubMed, etc.) |
| Blog: arquitectura do sistema endocanabinoide | [portal · artigos](${site}) | Entrada recente listada na home («efeito comitiva» / *Cannabis* spp.) |

**Veredicto editorial parcial:** há material canábico **explícito** no ecossistema Lair — útil como referência de divulgação popular. **Não** substitui [curso UNIFESP](${unifesp}), [CANABinALL](${canabinall}) nem [Carlini](${carlini}).

## Controvérsias e limites (obrigatório)

Fontes públicas (síntese via [Wikipédia · Lair Ribeiro](${wiki}) e reportagens lá citadas) associam a figura a:

- promoção de práticas e substâncias contestadas por órgãos de saúde (ex.: relatos sobre cloroquina/ozonioterapia na pandemia; MMS/Miracle Mineral Supplement; óleo de coco em narrativas de «cura»);  
- caso Marcelo Rezende (2017) — cobertura jornalística sobre orientação à distância / licença em SP;  
- críticas a afirmações em programas e redes (pseudociência / PNL em contextos de saúde).

**Regra BudGanja:** indexar ≠ endossar. Quem usa esta ficha deve ler as fontes e **não** tomar o canal como protocolo clínico.

## Avaliação BudGanja

### Forças
- IDs de canal e URLs de site **verificáveis** (pedido explícito desta inspeção).  
- Textos canábicos localizados (dor, Alzheimer, live cannabis).  
- Fronteira clara face ao Legado UNIFESP/MovReCam.

### Limites
- Sem inventário completo do YouTube.  
- Sem revisão sistemática da qualidade de cada claim clínico do canal.  
- Controvérsias exigem leitura das fontes primárias — a tabela acima é mapa, não veredicto judicial.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Hub Divulgação | [Inspeções · Divulgação](${hub}) |
| Planta | [Cannabis sativa](${planta}) |
| Palavra | [maconha](${palavras}) |
| Legado (contraste) | [Inspeções · Legado](${legado}) |
| Extensão académica | [Curso UNIFESP](${unifesp}) |
| Divulgação científica UNIFESP | [CANABinALL](${canabinall}) |
| Wikipédia | [Lair Ribeiro](${wiki}) |
| Canal | [@DrLairRibeiroOficiall](${yt}) |

## Como repetir o método (Divulgação)

1. Pessoa pública de saúde + canal.  
2. Tabela Canal: nome, handle, UC…, site, redes.  
3. 1–3 URLs de conteúdo no tema BudGanja (cannabis / plantas).  
4. 1 vídeo-âncora com ID.  
5. Secção Controvérsias se houver fontes públicas relevantes.  
6. Cruzar com Legado **por contraste**, não por fusão.  
7. Status.

## Status

**Aprovado como ficha fundadora da série Divulgação** — canal e textos canábicos de Lair Ribeiro documentados com IDs; independência e limites explícitos.

[▶ Divulgação](${hub}) · [Canal](${yt}) · [Site](${site}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Dr. Lair Ribeiro** and his **official YouTube channel**, focused on **verifiable channel IDs** and public cannabinoid texts. **Outreach** series — complementary; **not** UNIFESP / MovReCam / CEBRID origin.

> **Method note:** independent audit. **Not medical advice.** Indexing ≠ endorsement. Controversies listed with public sources.

## Channel references (verified)

| Field | Value |
|-------|-------|
| YouTube name | Dr. Lair Ribeiro Oficial |
| Handle | [@DrLairRibeiroOficiall](${yt}) |
| Channel ID | \`${ytId}\` |
| Site | [${site}](${site}) |
| Instagram | [${ig}](${ig}) |
| Anchor video | [A força terapêutica da cannabis](https://www.youtube.com/watch?v=${liveCannabis}) (\`${liveCannabis}\`) |

## Cannabinoid texts (site)

- [Chronic pain adjuvant (2019)](${pain})
- [Alzheimer’s adjuvant (2020)](${alz})

## Limits

Public controversies (COVID-era claims, MMS, other contested promotions; media coverage of the Marcelo Rezende case) are mapped via [Wikipedia](${wiki}). This sheet does **not** equate Lair with [Carlini](${carlini}) or [UNIFESP](${unifesp}).

## Status

**Approved as founding sheet of the Outreach series.**

[▶ Outreach](${hub}) · [Channel](${yt}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial del **Dr. Lair Ribeiro** y su **canal oficial de YouTube**, con foco en **IDs verificables** y textos públicos sobre cannabinoides. Serie **Divulgación** — complementaria; **no** es origen UNIFESP / MovReCam / CEBRID.

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** Indexar ≠ respaldar.

## Referencias del canal (verificado)

| Campo | Valor |
|-------|-------|
| Nombre | Dr. Lair Ribeiro Oficial |
| Handle | [@DrLairRibeiroOficiall](${yt}) |
| ID | \`${ytId}\` |
| Sitio | [${site}](${site}) |
| Instagram | [${ig}](${ig}) |
| Vídeo ancla | [A força terapêutica da cannabis](https://www.youtube.com/watch?v=${liveCannabis}) |

## Textos sobre cannabinoides

- [Dolor crónico (2019)](${pain})
- [Alzheimer (2020)](${alz})

## Límites

Controversias públicas mapeadas vía [Wikipedia](${wiki}). No equiparar con [Carlini](${carlini}) ni [UNIFESP](${unifesp}).

## Estado

**Aprobada como ficha fundadora de Divulgación.**

[▶ Divulgación](${hub}) · [Canal](${yt}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs, liveCannabis };
}

function buildLairRibeiroPost() {
  const { body, contentEn, contentEs, liveCannabis } = buildLairRibeiroBodies();
  return divulgacaoPost({
    title: 'Inspeção: Dr. Lair Ribeiro — canal oficial e divulgação sobre cannabinoides',
    titleEn: 'Inspection: Dr. Lair Ribeiro — official channel and cannabinoid outreach',
    titleEs: 'Inspección: Dr. Lair Ribeiro — canal oficial y divulgación sobre cannabinoides',
    excerpt:
      'Ficha fundadora da série Divulgação: IDs do canal @DrLairRibeiroOficiall, textos do portal sobre dor/Alzheimer e limites públicos — complementar ao Legado UNIFESP, sem equiparação.',
    excerptEn:
      'Founding sheet of the Outreach series: @DrLairRibeiroOficiall channel IDs, portal texts on pain/Alzheimer’s, and public limits — complementary to UNIFESP Legacy, without equivalence.',
    excerptEs:
      'Ficha fundadora de Divulgación: IDs del canal @DrLairRibeiroOficiall, textos del portal sobre dolor/Alzheimer y límites públicos — complementaria al Legado UNIFESP, sin equivalencia.',
    slug: 'inspecao-divulgacao-lair-ribeiro',
    date: '2026-08-01T09:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Lair Ribeiro · divulgação',
    coverImage: 'https://i.ytimg.com/vi/' + liveCannabis + '/hqdefault.jpg',
    sourceUrl: 'https://www.youtube.com/@DrLairRibeiroOficiall',
    videoId: liveCannabis,
    body,
    contentEn,
    contentEs
  });
}

const DIVULGACAO_INSPECOES_POSTS = [buildLairRibeiroPost()];

module.exports = {
  DIVULGACAO_INSPECOES_POSTS,
  buildLairRibeiroPost,
  buildLairRibeiroBodies
};
