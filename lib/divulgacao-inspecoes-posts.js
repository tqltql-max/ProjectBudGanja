'use strict';

/**
 * Inspeções «Divulgação»: comunicação pública de saúde / cannabinoides
 * fora do eixo UNIFESP–MovReCam–CEBRID (Legado).
 * Série: divulgacao-saude — tipagem no hub → 'divulgacao'.
 *
 * Método: biografia pública + canal (IDs verificáveis) + textos canábicos
 * + limites/controvérsias com fontes — sem equiparar a Ticão/Carlini.
 */

const {
  categorizeLairVideos,
  writeThemesJson,
  buildLairCatalogMarkdown,
  buildLairCatalogSummaryI18n
} = require('./lair-video-themes.js');

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
  const inspected = '2026-08-02';
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
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const derivados = '/biblioteca/inspecoes/#inspecoes-derivados';
  const lairParte4 =
    'https://lairribeiro.com.br/parte-4-inflamacoes-cronica-causada-por-carboidratos/';
  const lairHits = '/content/channels/lair-sugar-hits.json';
  const lairThemes = '/content/channels/lair-video-themes.json';
  const vSugar = 'UfPawBg7vXc';
  const vFructose = 'rVS2M4wuseE';
  const vSweeteners = 'oGhMcYmy-C4';
  const vHangout = 'VItTyNMP_xg';

  const themesDoc = categorizeLairVideos();
  writeThemesJson(themesDoc);
  const catalogMd = buildLairCatalogMarkdown({ doc: themesDoc });
  const catalogEn = buildLairCatalogSummaryI18n('en', themesDoc);
  const catalogEs = buildLairCatalogSummaryI18n('es', themesDoc);

  const body = `## Escopo

Inspeção editorial de **Dr. Lair Geraldo Theodoro Ribeiro** (Juiz de Fora, 6 de julho de 1945) — cardiologista, nutrólogo, escritor e palestrante — e do **canal oficial no YouTube**, com foco no que o laboratório BudGanja precisa: **referências verificáveis do canal**, textos públicos sobre **cannabinoides** e o **cruzamento com riscos do açúcar / cana** (série [Derivados](${derivados})). Série **Divulgação** — complementar ao ecossistema; **não é origem UNIFESP / MovReCam / CEBRID**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia](${wiki}), [portal lairribeiro.com.br](${site}), canal YouTube verificado por ID; varredura de títulos (887 vídeos + buscas temáticas → [\`lair-sugar-hits.json\`](${lairHits})). **Não é aconselhamento médico.** Sem afiliação com o autor, o portal ou o canal. **Não equiparar** esta ficha a [Carlini](${carlini}), [Ticão/curso UNIFESP](${unifesp}) ou [CANABinALL](${canabinall}). Controvérsias públicas (abaixo) são registadas com fontes — sem juízo de fórum.

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

> **Nota de catálogo:** o canal mistura nutrição, longevidade, autoajuda e temas clínicos em tom de divulgação. Marco canábico: vídeo acima. **Varredura (2026-08-01):** **887** títulos únicos; **38** hits açúcar/frutose/diabetes → [\`lair-sugar-hits.json\`](${lairHits}). **Categorização completa (2026-08-02):** todos os vídeos em temas editoriais → [\`lair-video-themes.json\`](${lairThemes}) e secção *Catálogo temático* abaixo.

## Hipóteses e método

**H1:** o valor BudGanja é mapear **onde** Lair fala de cannabinoides (canal + site) e **como** isso se distingue do eixo acadêmico/extensão já inspecionado.  
**H2:** textos do portal sobre dor crónica e Alzheimer são **divulgação / actualização de literatura**, não substituto de artigo peer-reviewed do laboratório BudGanja.  
**H3:** registar controvérsias públicas evita que o hub «lave» a figura ao indexá-la.  
**H4:** no eixo metabólico, Lair nomeia a **sacarose da cana** (portal) e insiste em **açúcar / frutose / diabesidade** (vídeos) — elo natural com a ficha [cana-de-açúcar](${cana}), sem confundir divulgação com OMS.

Passos:

1. Confirmar IDs do canal (handle + UC…).  
2. Listar textos canábicos no site com URL.  
3. Escolher 1 vídeo-âncora no canal (cannabis).  
4. Varrer títulos por açúcar/cana/riscos; cruzar com [cana](${cana}).  
5. Cruzar com [planta](${planta}) / [Palavras](${palavras}) / Legado (por contraste).  
6. Declarar controvérsias com fonte.  
7. Status.

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

## Açúcar, cana e riscos metabólicos (varredura)

### Portal — elo explícito com a cana

| Texto | Elo |
|-------|-----|
| [Parte 4 — inflamações crónicas por carboidratos](${lairParte4}) (2020) | Define **sacarose** como açúcar branco de mesa **da cana-de-açúcar ou beterraba**; associa excesso de açúcares/frutose a obesidade, diabetes tipo 2, esteatose e síndrome metabólica |

Este é o **elo textual verificável** entre a divulgação Lair e a planta da ficha [Cana-de-açúcar — Derivados de risco](${cana}).

### Canal — o que os títulos mostram

| Achado da varredura | Valor |
|---------------------|-------|
| Vídeos catalogados | **887** |
| Hits temáticos (título) | **38** ([JSON](${lairHits})) |
| Títulos com «cana-de-açúcar» | **0** (o nome da planta está no portal, não nos títulos YT filtrados) |
| Núcleo «açúcar / frutose / adoçante» | Ex.: Truths about Sugar, Sugar and Sweeteners, Fructose the unknown poison, shorts em PT |
| Núcleo «diabetes / obesidade / insulina» | Série Diabete e Obesidade + hangout histórico |

| Tema | Título | ID |
|------|--------|-----|
| Açúcar | Truths about Sugar | \`${vSugar}\` |
| Açúcar + adoçantes | Sugar and Sweeteners \| Dr. Lair Ribeiro | \`${vSweeteners}\` |
| Frutose | Fructose the unknown poison | \`${vFructose}\` |
| Diabesidade | Diabetes e Obesidade \| Hangout | \`${vHangout}\` |

@youtube ${vSugar}

> **Leitura cruzada:** [Cana](${cana}) traz origem botânica + **OMS (açúcares livres)**; esta ficha traz a **divulgação Lair** (sacarose da cana no portal + vídeos de açúcar/frutose). Manter a fronteira: divulgação ≠ Legado académico ≠ guideline clínico.

${catalogMd}

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
- Varredura açúcar/cana com método e JSON auditável.  
- Fronteira clara face ao Legado UNIFESP/MovReCam.

### Limites
- Varredura por **título** (não transcrição integral de ~900 vídeos).  
- Sem revisão sistemática da qualidade de cada claim clínico do canal.  
- Controvérsias exigem leitura das fontes primárias — a tabela acima é mapa, não veredicto judicial.

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Hub Divulgação | [Inspeções · Divulgação](${hub}) |
| Derivado · cana / açúcar | [Cana-de-açúcar](${cana}) |
| Hits da varredura | [\`lair-sugar-hits.json\`](${lairHits}) |
| Catálogo temático (todos) | [\`lair-video-themes.json\`](${lairThemes}) |
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

**Aprovado como ficha fundadora da série Divulgação** — canal e textos canábicos documentados; cruzamento açúcar/cana (portal + varredura de 887 vídeos) ligado a [Derivados · cana](${cana}); **catálogo temático completo** em [\`lair-video-themes.json\`](${lairThemes}); independência e limites explícitos.

[▶ Divulgação](${hub}) · [Cana](${cana}) · [Canal](${yt}) · [Site](${site}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Dr. Lair Ribeiro** and his **official YouTube channel** — cannabinoid texts **and** sugar/cane metabolic-risk cross-link to [sugarcane](${cana}). **Outreach** series — not UNIFESP / MovReCam / CEBRID.

> **Method note:** independent audit; 887-video title scan → [\`lair-sugar-hits.json\`](${lairHits}); full thematic catalog → [\`lair-video-themes.json\`](${lairThemes}). **Not medical advice.** Indexing ≠ endorsement.

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

## Sugar / cane / metabolic risk

Portal [Part 4 — carbohydrates](${lairParte4}) names **sugarcane** (or beet) as the source of table **sucrose**. Channel title scan: 887 videos → [\`lair-sugar-hits.json\`](${lairHits}). Anchors: Truths about Sugar (\`${vSugar}\`), Fructose the unknown poison (\`${vFructose}\`), Diabetes & Obesity hangout (\`${vHangout}\`). Cross: [sugarcane](${cana}).

@youtube ${vSugar}

${catalogEn}

## Status

**Approved as founding Outreach sheet** — with sugar/cane cross-link to Derivatives and a full thematic catalog of the channel.

[▶ Outreach](${hub}) · [Sugarcane](${cana}) · [Channel](${yt}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial del **Dr. Lair Ribeiro** y su **canal oficial** — cannabinoides **y** cruce azúcar/caña con [caña de azúcar](${cana}). Serie **Divulgación** — no es origen UNIFESP / MovReCam / CEBRID.

> **Nota metodológica:** auditoría independiente; barrido de 887 títulos → [\`lair-sugar-hits.json\`](${lairHits}); catálogo temático → [\`lair-video-themes.json\`](${lairThemes}). **No es consejo médico.** Indexar ≠ respaldar.

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

## Azúcar / caña / riesgo metabólico

Portal [Parte 4 — carbohidratos](${lairParte4}): la **sacarosa** de mesa proviene de la **caña** o remolacha. Anclas: Truths about Sugar (\`${vSugar}\`), Fructose the unknown poison (\`${vFructose}\`). Cruce: [caña](${cana}).

@youtube ${vSugar}

${catalogEs}

## Límites

Controversias públicas mapeadas vía [Wikipedia](${wiki}). No equiparar con [Carlini](${carlini}) ni [UNIFESP](${unifesp}).

## Estado

**Aprobada como ficha fundadora de Divulgación** — con cruce azúcar/caña y catálogo temático completo del canal.

[▶ Divulgación](${hub}) · [Caña](${cana}) · [Canal](${yt}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs, liveCannabis, themesDoc };
}

function buildLairRibeiroPost() {
  const { body, contentEn, contentEs, liveCannabis } = buildLairRibeiroBodies();
  return divulgacaoPost({
    title: 'Inspeção: Dr. Lair Ribeiro — cannabinoides, açúcar e cruzamento com a cana',
    titleEn: 'Inspection: Dr. Lair Ribeiro — cannabinoids, sugar and sugarcane cross-link',
    titleEs: 'Inspección: Dr. Lair Ribeiro — cannabinoides, azúcar y cruce con la caña',
    excerpt:
      'Divulgação: IDs do canal, textos canábicos, limites públicos, varredura açúcar/frutose e catálogo temático completo dos ~887 vídeos do canal — elo com a ficha Derivados da cana-de-açúcar.',
    excerptEn:
      'Outreach: channel IDs, cannabinoid texts, public limits, sugar/fructose scan and a full thematic catalog of ~887 channel videos — linked to the sugarcane Derivatives sheet.',
    excerptEs:
      'Divulgación: IDs del canal, textos cannábicos, límites públicos, barrido azúcar/fructosa y catálogo temático completo de ~887 vídeos — vínculo con la ficha Derivados de la caña.',
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
