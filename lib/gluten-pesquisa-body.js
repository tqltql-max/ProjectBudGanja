'use strict';

/**
 * Pesquisa completa — glúten, mal à saúde e o acervo de vídeos do projecto.
 * Consumido por lib/produtos-nocivos-inspecoes-posts.js.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function ytLink(id, title) {
  const safe = String(title || id)
    .replace(/\|/g, '/')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')');
  return `[${safe}](https://www.youtube.com/watch?v=${id})`;
}

function loadThemeVideos(rel, themeId) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8'));
    const theme = (data.themes || []).find((t) => t && t.id === themeId);
    return theme && Array.isArray(theme.videos) ? theme.videos : [];
  } catch (e) {
    return [];
  }
}

function mdVideoTable(videos) {
  const rows = videos
    .map((v, i) => `| ${i + 1} | ${ytLink(v.id, v.title)} | ${v.views || '—'} |`)
    .join('\n');
  return `| # | Vídeo | Views |\n|---|-------|-------|\n${rows}`;
}

function buildGlutenBodies() {
  const inspected = '2026-09-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const leite = '/posts/post-inspecao-derivado-leite.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const barriga = '/posts/post-inspecao-arte-barriga-de-trigo.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const soja = '/posts/post-inspecao-planta-soja.html';
  const trigo = '/posts/post-inspecao-planta-trigo.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const brancas = '/posts/post-inspecao-cruzamento-farinha-branca-cocaina-branca-de-neve.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const artBrouns = '/posts/post-inspecao-artigo-brouns-trigo-obesidade-2013.html';
  const artWieser = '/posts/post-inspecao-artigo-wieser-duas-faces-trigo-2020.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const videosHub = '/videos/';
  const videosDavis = '/videos/?channel=davis&series=trigo-gluten';
  const videosLair = '/videos/?channel=lair&series=gluten-leite';
  const videosMundo = '/videos/?channel=manualdomundo';
  const davisJson = '/content/channels/davis-video-themes.json';
  const lairJson = '/content/channels/lair-video-themes.json';

  const vLairGluten = '2qYo3wMHbT0';
  const vLairCusto = 'yLOG0fcqYs0';
  const vDavisWhat = 'fg5UWxahbY0';
  const vDavisNotJust = 'VszkEQNJ5IY';
  const vMundoVer = 'JsjNQOd6ZaI';

  const lairVideos = loadThemeVideos('content/channels/lair-video-themes.json', 'gluten-leite');
  const davisVideos = loadThemeVideos('content/channels/davis-video-themes.json', 'trigo-gluten');
  const lairTable = lairVideos.length ? mdVideoTable(lairVideos) : '| — | (catálogo Lair indisponível) | — |';
  const davisTable = davisVideos.length ? mdVideoTable(davisVideos) : '| — | (catálogo Davis indisponível) | — |';
  const davisN = davisVideos.length || 106;
  const lairN = lairVideos.length || 14;

  const davisAnchors = [
    ['fg5UWxahbY0', 'What is gluten and why you should avoid it'],
    ['VszkEQNJ5IY', "It's not just about gluten"],
    ['T8Z6gT9sOic', 'Amylopectin A: Demon Carbohydrate'],
    ['dl1gCGME1qk', 'Which is worse: Sugar or wheat?'],
    ['CtsmK8QgPBk', 'Wheat is sugar'],
    ['eKc787tV-k4', 'Wheat: How did it become so toxic?'],
    ['0CyQqZLYXaI', 'Do gluten-free foods make you gain weight?'],
    ['Vkf4VbjRRKU', "Don't be a gluten-free health disaster"],
    ['uYoE2OLJG0A', 'Ten Reasons to NEVER Eat Gluten-Free Processed Foods'],
    ['msnJeGC3Bc4', 'The lies being spread about sourdough bread'],
    ['rgupNwJMaMs', 'A Brief History of Wheat'],
    ['JFJWIleLUSE', '"I feel fine when I eat something made with wheat"']
  ];
  const davisAnchorTable = [
    '| # | Âncora Davis |',
    '|---|--------------|',
    ...davisAnchors.map((row, i) => `| ${i + 1} | ${ytLink(row[0], row[1])} |`)
  ].join('\n');

  const body = `## Escopo

Pesquisa editorial completa do **glúten** — a **cola** proteica do trigo (*Triticum* spp.), da cevada e do centeio — como **produto nocivo ao organismo** quando a dose, a genética, a farinha branca e o ultraprocessado se cruzam. O laboratório separa **três eixos clínicos** (doença celíaca, alergia IgE ao trigo, sensibilidade não celíaca), o **eixo da fábrica** (farinha refinada, snacks, «proteína de trigo») e o **eixo do discurso** ([*Barriga de Trigo*](${barriga}) / [William Davis](${davis}); [Lair Ribeiro](${lair})). Cruza a [planta trigo](${trigo}), a [caseína](${caseina}), a [cana / açúcar](${cana}), o [chocolate industrial](${chocolate}), a [soja](${soja}) e o [cruzamento das brancas](${brancas}).

O título desta ficha — **a cola invisível e o mal à saúde** — vem do latim *gluten* (cola): a proteína que liga a massa também liga a prateleira. O mal à saúde **não** é um único diagnóstico; é uma rede de mecanismos, doses e marketing.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem dieta prescrita.** Indexar Davis/Lair **≠** endossar cada claim. O trigo como cultura agrícola **não** é o vilão absoluto. A doença celíaca é eixo clínico — exclusão de glúten sob orientação profissional. Esta pesquisa descreve literacia de rótulo, de evidência e de **vídeo catalogado**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Glúten** (latim *gluten* — cola) |
| Título da pesquisa | A cola invisível e o mal à saúde |
| Origem botânica | [Trigo](${trigo}) (*Triticum aestivum* e afins); também cevada, centeio |
| Química | Gliadinas + gluteninas (+ ATI e frutanos na mesma matriz) |
| Tipo BudGanja | Produto nocivo — proteína vegetal → matriz industrial |
| Produto de risco em foco | Glúten em farinhas refinadas, pão industrial, snacks e «proteína de trigo» |
| Série | Produtos nocivos |
| Data da inspeção (ampliada) | ${inspected} |

## Etimologia — a cola

**Glúten** vem do latim *gluten*, *glutinis*: cola, goma, o que pega. No pão artesanal essa cola é ofício (a rede que prende o gás da fermentação). Na fábrica, a mesma palavra vira **aditivo**, **isolado** e **volume barato**. O laboratório inspecciona o vocábulo no [Guia de Palavras](/guia/palavras.html) e o produto aqui.

| Palavra | O que cola | Ficha |
|---------|------------|-------|
| Glúten | Gliadina + glutenina | Esta pesquisa |
| Farinha branca | Endosperma sem farelo — a cola fica concentrada no amido | [Trigo](${trigo}) · [Brancas](${brancas}) |
| «Sem glúten» | Muitas vezes cola de amido + açúcar no lugar da proteína | Secção da armadilha, abaixo |
| Caseína | A outra proteína-cola da dieta industrial (leite) | [Caseína](${caseina}) |

## O que é o glúten (química, sem protocolo)

O glúten **não** é uma molécula só. É a **rede** que se forma quando as **gliadinas** (prolaminas, mais solúveis) e as **gluteninas** (maior massa, elásticas) hidratam e se cruzam. Essa rede dá extensibilidade à massa.

Na mesma matriz do trigo moderno entram outros actores que o discurso popular mistura com «glúten»:

| Marcador | Papel | Leitura BudGanja |
|----------|-------|------------------|
| Gliadinas | Fragmentos imunogénicos na doença celíaca | Eixo clínico — não slogan |
| Gluteninas | Elasticidade da massa | Ofício do pão ≠ snack |
| ATI (inibidores de amilase-tripsina) | Proteínas do grão; hipótese de inflamação inata | Discurso a auditar; não substitui diagnóstico |
| Frutanos (FODMAP) | Carboidratos fermentáveis do trigo | Podem explicar inchaço **sem** ser glúten |
| Amilopectina A | Amido do endosperma; carga glicémica na farinha branca | Tese Davis — ver [Brouns](${artBrouns}) |
| Farelo / gérmen | Saem no refino | Separar [espiga](${trigo}) do saco branco |

**H1:** literacia botânica separa **cereal** de **farinha industrial**.  
**H2:** literacia clínica separa **celíaca** de **alergia** de **sensibilidade** de **FODMAP**.  
**H3:** literacia de fábrica separa **pão de ofício** de **ultraprocessado de trigo**.  
**H4:** [caseína](${caseina}) e glúten são as duas **colas proteicas** da dieta moderna — eixos distintos, categoria irmã.

## Três eixos clínicos (o mal à saúde, com método)

O «mal do glúten» no senso comum funde doenças diferentes. O laboratório **desfunde**.

| Eixo | O que é | O que não é | Conduta editorial |
|------|---------|-------------|-------------------|
| **Doença celíaca** | Enteropatia autoimune desencadeada pelo glúten em pessoas com predisposição (HLA-DQ2/DQ8). Atrofia das vilosidades, anticorpos (anti-tTG), risco de desnutrição e de complicações se a exposição continua | «Intolerância leve» | Exclusão de glúten **sob orientação profissional**. Não é moda |
| **Alergia ao trigo** | Eixo **IgE** (pode incluir anafilaxia, WDEIA com exercício) | Celíaca | Distinto — proteína do trigo, não só «glúten» de marketing |
| **Sensibilidade não celíaca (NCGS)** | Sintomas digestivos e extra-digestivos relatados **depois** de se excluir celíaca e alergia | Diagnóstico de laboratório único | Evidência **heterogénea**; parte dos casos aponta para **frutanos/FODMAP** ou ATI, não para a rede gliadina-glutenina |
| **Farinha ultraprocessada** | Dose alta, glicemia, aditivos, açúcar, gordura — o [Hall 2019](${hall}) aplica-se à **matriz**, não só à proteína | «O trigo ancestral era inofensivo e o moderno é veneno» como lei | Eixo de **dose e fábrica** |

Mecanismos que a divulgação cita — e os limites:

1. **Atrofia vilositária** — eixo celíaca, evidência clínica sólida.  
2. **Permeabilidade intestinal / zonulina** — gliadina pode sinalizar zonulina em modelos e em alguns estudos humanos; **não** autoriza o slogan «intestino furado em toda a população». Ver também [intestino](${intestino}).  
3. **Inflamação extra-digestiva** (pele, articulações, cérebro no discurso) — celíaca tem manifestações extra-intestinais reais; extrapolar para quem não é celíaco é **discurso**, não laudo.  
4. **Glicemia / gordura visceral** — mais o **amido refinado** e o ultraprocessado do que a cola em si; Davis chama a isto [amilopectina A](${barriga}); [Brouns 2013](${artBrouns}) contrasta a tese populacional.  
5. **«Vício opiáceo da gliadina»** — claim popular de livros; evidência humana **fraca**. Indexar ≠ repetir como facto.

## Do cereal ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Espiga / grão / pão de ofício | Cultura agrícola e fermentação tradicional | Baixo — contexto, dose, ofício |
| Farinha refinada (branca) | Sai fibra; sobra amido + glúten relativo | Intermediário — [trigo](${trigo}) · [brancas](${brancas}) |
| Pão industrial / massa rápida | Volume, melhoradores, açúcar | Elevado |
| Snacks, bolachas, «proteína de trigo» | Glúten como aditivo + açúcar + gordura | Elevado — ver [chocolate](${chocolate}) e [cana](${cana}) |
| Isolado de glúten em ultraprocessados | A cola vira ingrediente | Elevado |

Quem [transforma a prateleira](${ricos}) não «inventa» o trigo: **branqueia**, **concentra** e **mistura**.

## A armadilha «sem glúten»

Trocar pão industrial por **bolacha sem glúten** de amido de milho, açúcar e gordura **não** é literacia — é troca de matriz. Davis, no próprio acervo, insiste nisto (*Don't be a gluten-free health disaster*; *Ten Reasons to NEVER Eat Gluten-Free Processed Foods*). O laboratório **concorda no diagnóstico de prateleira** e **não** adopta a frase máxima («ninguém deve comer trigo»).

| Situação | O que inspeccionar |
|----------|-------------------|
| Celíaca / alergia | Exclusão real — ler rótulo (trigo, cevada, centeio, malt, «proteína vegetal») |
| Snack «fit sem glúten» | Açúcar, amidos, óleo — elo [cana](${cana}) e [Hall](${hall}) |
| Chocolate / wafer | Farinha + açúcar + leite — [chocolate](${chocolate}) |
| Soja industrial + farinha | Mesma prateleira — [soja](${soja}) |

## Universo de vídeos — todos os canais do projecto

O hub [Vídeos](${videosHub}) catalogava **9.798** vídeos únicos na data desta pesquisa. A pergunta não é «quais vídeos falam de glúten»: é **como o eixo se distribui por todo o acervo** — inclusive pela ausência.

| Canal | Vídeos no hub | Hits directos (título: glúten / trigo / wheat / farinha / pão*) | Papel nesta pesquisa |
|-------|---------------|---------------------------------------------------------------|----------------------|
| [William Davis, MD](${davis}) | **476** | **~107** · tema [trigo-gluten](${videosDavis}) = **${davisN}** | Arquivo vivo do discurso trigo/glúten. Massa do eixo |
| [Dr. Lair Ribeiro](${lair}) | **888** | **14** no bucket [gluten-leite](${videosLair}) | Glúten **pareado com leite/lactose**; divulgação PT/EN |
| Manual do Mundo | **2.401** | **1** real (*Como VER o GLÚTEN*) + ruído de «pão» | Literacia visual da proteína — não clínica |
| Slivki Show | **416** | 0 clínico (pão como experiência) | Fora do eixo de dano |
| Richard Rasmussen | **1.851** | **0** | Natureza / ofício — sem trilha alimentar de glúten |
| Zangado | **1.444** | **0** | Jogos |
| Paulinho o LOKO | **1.428** | **0** | Jogos |
| MovReCam | **290** | **0** | UNIFESP / cannabis — sem açúcar·glúten·leite |
| Amyr Klink | **189** | **0** | Mar / ofício |
| Tamara Klink | **150** | **0** | Ártico / ofício |
| CANABinALL | **139** | **0** | Cannabis científica |
| Disney Jr. Brasil | **120** | **0** | Infância / desenhos |
| Inspetor BudGanja | **6** | **0** | Ainda sem série própria de produtos nocivos em vídeo |
| **Total** | **9.798** | **~130** títulos com palavra-chave (maioria Davis) | |

(*) No Manual do Mundo, «pão» no título é quase sempre receita, mágica ou física do pão — **não** inspeção de glúten. O hit clínico-educativo é um: **Como VER o GLÚTEN**.

**Achado principal:** o eixo «glúten e mal à saúde» **não** segue o hub histórico do site (MovReCam / CANABinALL). Segue **Davis** (volume) e **Lair** (par glúten+leite em português). Os outros ~8.000 vídeos **relacionam-se por ausência**: cultivo, mar, jogos e infância **não** carregam esta proteína. Isso é dado — não falha.

A análise-mãe da rede está em [danos × vídeos](${analise}). Aqui o recorte é **só a cola**.

## Vídeos âncora (verificáveis)

@youtube ${vLairGluten}

@youtube ${vDavisWhat}

@youtube ${vMundoVer}

| Eixo | Título | Onde |
|------|--------|------|
| Lair · efeito | Effect of gluten on health | \`${vLairGluten}\` |
| Lair · custo glúten+lactose | GLÚTEN E LACTOSE e o custo para o seu corpo | \`${vLairCusto}\` |
| Davis · definição | What is gluten and why you should avoid it | \`${vDavisWhat}\` |
| Davis · além da proteína | It's not just about gluten | \`${vDavisNotJust}\` |
| Manual do Mundo · ver a cola | Experiência: Como VER o GLÚTEN | \`${vMundoVer}\` |

## Lair — trigo, glúten e laticínios (${lairN})

Bucket [\`gluten-leite\`](${videosLair}) em [\`lair-video-themes.json\`](${lairJson}). **Indexar ≠ endossar.** Vários títulos são **leite** (mito do cálcio, leite materno) — o laboratório mantém o bucket do canal e **marca** o par: Lair ensina glúten **junto** com laticínios, o mesmo cruzamento da série [caseína](${caseina}).

${lairTable}

Leitura: o vídeo de maior massa neste bucket é **GLÚTEN E LACTOSE e o custo para o seu corpo** (65K). A pergunta «trigo ou o glúten do trigo?» (37K) é a pergunta certa desta ficha: **cereal ≠ proteína isolada ≠ fábrica**.

## Davis — trigo, glúten e grãos (${davisN})

Canal [@williamdavismd](${videosDavis}) · ficha [William Davis](${davis}) · livro [*Barriga de Trigo*](${barriga}). Classificação por título em [\`davis-video-themes.json\`](${davisJson}).

**Âncoras desta pesquisa** (a cola, o amido, o «sem glúten» industrial, a história do grão):

${davisAnchorTable}

Temas **vizinhos** no mesmo canal (não são glúten, mas o discurso cola neles): microbioma/intestino/SIBO **80** · diabetes/peso **53** · coração **57**. Quem inspecciona a cola deve saber que Davis **espalha** o trigo por intestino, glicemia e pele — [Wieser 2020](${artWieser}) descreve as «duas faces» do cereal; o laboratório usa Davis como **arquivo**, não como guideline.

### Catálogo completo do tema trigo-gluten (${davisN})

Lista gerada do JSON do canal. **Indexar ≠ endossar.** Filtro: [${videosDavis}](${videosDavis}).

${davisTable}

## Eixos vizinhos no acervo (não são glúten — colam)

| Eixo | Vídeos | Por que entra nesta pesquisa |
|------|--------|------------------------------|
| Lair · açúcar / frutose / adoçantes | 10 | A farinha branca viaja com açúcar; [cana](${cana}) |
| Lair · diabetes / diabesidade | 30 | Carga glicémica da matriz, não só da gliadina |
| Lair · inflamação | 10 | Ponte mecanística com intestino |
| Lair · nutrição (alergia / intolerância / sensibilidade) | 62 (tema largo) | Título-ponte: alergia ≠ intolerância ≠ sensibilidade |
| Davis · microbioma | 80 | Vizinho do [intestino](${intestino}) |
| Davis · «Wheat is sugar» / amilopectina | no tema trigo | Elo metabólico com [cana](${cana}) |
| Chocolate industrial | 3 títulos Lair pró-amargo | Desalinhamento: a ficha [chocolate](${chocolate}) inspecciona o snack, não o nib |

## O que observar nos rótulos

- trigo, farinha de trigo, glúten de trigo, proteína vegetal hidrolisada, seitan, malte, cevada, centeio, *triticale*;
- «sem glúten» com amido, açúcar, xarope e óleo à frente;
- bolacha «de chocolate» = muitas vezes **trigo + açúcar + gordura** ([chocolate](${chocolate}));
- soja isolada + farinha branca na mesma lista ([soja](${soja}));
- alegações de «integral» que não apagam melhoradores e açúcar.

## Cruzamento — fichas do laboratório

| Elo | Ficha |
|-----|-------|
| Planta (espiga vs saco) | [Inspeção: Trigo](${trigo}) |
| Família láctea | [Inspeção: Leite e derivados](${leite}) |
| Caseína (a outra cola) | [Inspeção: Caseína](${caseina}) |
| Açúcar / cana | [Inspeção: Cana-de-açúcar](${cana}) |
| Farinha + açúcar + cacau | [Inspeção: Chocolate industrial](${chocolate}) |
| Soja (feijão vs isolado + farinha) | [Inspeção: Soja](${soja}) |
| Farinha branca × cocaína × Branca de Neve | [Cruzamento das brancas](${brancas}) |
| Ultraprocessados (RCT) | [Artigo Hall et al., 2019](${hall}) |
| Trigo e obesidade (contraponto) | [Brouns et al., 2013](${artBrouns}) |
| Duas faces do trigo | [Wieser et al., 2020](${artWieser}) |
| Quem transforma a prateleira | [Como os ricos transformam as coisas](${ricos}) |
| Livro *Wheat Belly* | [Inspeção: Barriga de Trigo](${barriga}) |
| Autor / arquivo | [Inspeção: William Davis](${davis}) |
| Divulgação PT | [Inspeção: Lair Ribeiro](${lair}) |
| Danos × acervo | [Análise: danos × vídeos](${analise}) |
| Palavra intestino | [Inspeção: intestino](${intestino}) |

## Artigos científicos (âncoras desta pesquisa)

| Artigo | O que segura | Ficha |
|--------|--------------|-------|
| Brouns, van Buul & Shewry, 2013 | O trigo integral **não** explica a obesidade populacional; crítica às teses máximas anti-trigo | [Brouns](${artBrouns}) |
| Wieser et al., 2020 | Duas faces: WRDs (celíaca, alergia, NCGS) **e** o cereal como alimento | [Wieser](${artWieser}) |
| Hall et al., 2019 | Ultraprocessados ↑ kcal e peso — a **matriz**, não só a gliadina | [Hall](${hall}) |

**Síntese:** a evidência **mais firme** de dano do glúten é a **doença celíaca** (e a alergia ao trigo). A evidência de dano **populacional** aponta mais para **farinha refinada + ultraprocessados + açúcar** do que para «a cola mata toda a gente». Davis e Lair são **arquivo de discurso**; Brouns, Wieser e Hall são **arquivo de método**.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · pesquisa ampliada (glúten × saúde × 9.798 vídeos) |
| Veredicto editorial | A **cola** do pão é ofício; a **cola da prateleira** (farinha branca, isolado, snack «sem glúten» açucarado) e os **eixos clínicos** (celíaca em primeiro) merecem alerta — com método, sem pânico e sem dieta prescrita. |
| Vídeos | Davis ${davisN} (trigo-gluten) · Lair ${lairN} (gluten-leite) · Manual do Mundo 1 (ver a proteína) · resto do hub: ausência documentada |

## Hub

[Produtos nocivos](${hub}) · [Trigo](${trigo}) · [Vídeos Davis / trigo-gluten](${videosDavis}) · [Vídeos Lair / gluten-leite](${videosLair}) · [Barriga de Trigo](${barriga}) · [Davis](${davis}) · [Lair](${lair}) · [Análise × vídeos](${analise}) · [Artigos](/biblioteca/inspecoes/#inspecoes-artigos)
`;

  const contentEn = `## Scope

Full editorial research on **gluten** — the wheat-family protein **glue** — as a **harmful product** when dose, genetics, white flour and ultra-processed matrices collide. Three clinical axes (celiac disease, IgE wheat allergy, non-celiac sensitivity), one factory axis, one discourse axis ([Wheat Belly](${barriga}) / [William Davis](${davis}); [Lair Ribeiro](${lair})). Cross-links [wheat](${trigo}), [casein](${caseina}), [sugarcane](${cana}), [industrial chocolate](${chocolate}), [soy](${soja}) and the [whites map](${brancas}).

> **Method note:** independent BudGanja audit. **Not medical advice.** Indexing Davis/Lair ≠ endorsing every claim. Wheat as a crop is not an absolute villain. Celiac disease is a clinical axis.

## The invisible glue

Latin *gluten* means glue. In craft bread that glue is skill; on the industrial shelf it becomes additive, isolate and cheap volume. Sister glue: [casein](${caseina}).

## Clinical axes (harm to health, with method)

| Axis | Reading |
|------|---------|
| **Celiac disease** | Autoimmune enteropathy; gluten exclusion under professional care |
| **Wheat allergy** | IgE axis — distinct from celiac |
| **NCGS** | Heterogeneous; some cases point to fructans/FODMAP or ATI, not only gliadin |
| **Ultra-processed flour** | Dose + sugar + additives — [Hall 2019](${hall}) is about the **matrix** |

Strongest evidence of gluten harm: **celiac disease**. Population-level harm tracks **refined flour + ultra-processed food + sugar** more than “glue kills everyone”. [Brouns 2013](${artBrouns}) and [Wieser 2020](${artWieser}) are the method layer; Davis/Lair are the discourse archive.

## All project videos (9,798)

| Channel | Hub videos | Direct gluten/wheat signal |
|---------|------------|----------------------------|
| [William Davis](${davis}) | 476 | **${davisN}** in [trigo-gluten](${videosDavis}) — the mass of this axis |
| [Lair Ribeiro](${lair}) | 888 | **${lairN}** in [gluten-leite](${videosLair}) — gluten paired with dairy |
| Manual do Mundo | 2,401 | **1** real hit: *Como VER o GLÚTEN* (\`${vMundoVer}\`) |
| Slivki, Rasmussen, Zangado, Paulinho, MovReCam, Amyr, Tamara, CANABinALL, Disney Jr., Inspetor | ~6,033 | **0** clinical gluten trail |

**Finding:** this axis follows **Davis + Lair**, not the site’s historic cannabis/UNIFESP hub. The other ~8,000 videos relate **by absence**. Mother analysis: [harms × videos](${analise}).

@youtube ${vLairGluten}

@youtube ${vDavisWhat}

@youtube ${vMundoVer}

Davis neighbour themes (not gluten, but glued to it): microbiome **80** · diabetes/weight **53**. Full titled list of the wheat theme is in the Portuguese sheet and in [\`davis-video-themes.json\`](${davisJson}).

## Labels

wheat, wheat flour, wheat gluten, hydrolysed vegetable protein, seitan, malt, barley, rye; “gluten-free” snacks that lead with starch and sugar; chocolate wafers = often wheat + sugar + fat.

## Status

**Published** — Harmful products · expanded gluten research (health × 9,798 videos). Craft bread glue ≠ shelf glue. No prescribed diet.

[Harmful products](${hub}) · [Wheat](${trigo}) · [Davis wheat filter](${videosDavis}) · [Lair gluten-dairy](${videosLair})
`;

  const contentEs = `## Alcance

Investigación editorial completa del **gluten** — la **cola** proteica del trigo — como **producto nocivo** cuando dosis, genética, harina blanca y ultraprocesados se cruzan. Tres ejes clínicos (celiaquía, alergia IgE al trigo, sensibilidad no celíaca), un eje de fábrica y un eje de discurso ([Barriga de Trigo](${barriga}) / [William Davis](${davis}); [Lair Ribeiro](${lair})). Cruza [trigo](${trigo}), [caseína](${caseina}), [caña](${cana}), [chocolate industrial](${chocolate}), [soja](${soja}) y el [mapa de las blancas](${brancas}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** Indexar Davis/Lair ≠ respaldar cada claim. El trigo como cultivo no es villano absoluto.

## La cola invisible

Latín *gluten* = cola. En el pan de oficio es oficio; en el estante es aditivo y volumen barato. Cola hermana: [caseína](${caseina}).

## Ejes clínicos

| Eje | Lectura |
|-----|---------|
| **Celiaquía** | Enteropatía autoinmune; exclusión con orientación profesional |
| **Alergia al trigo** | Eje IgE — distinto |
| **NCGS** | Heterogénea; a veces fructanos/FODMAP o ATI |
| **Harina ultraprocesada** | Dosis + azúcar + aditivos — [Hall 2019](${hall}) habla de la **matriz** |

La evidencia más firme de daño del gluten es la **celiaquía**. El daño poblacional sigue más a la **harina refinada + ultraprocesado + azúcar** que a «la cola mata a todo el mundo». [Brouns 2013](${artBrouns}) y [Wieser 2020](${artWieser}) son método; Davis/Lair son archivo de discurso.

## Todos los vídeos del proyecto (9.798)

| Canal | Vídeos | Señal gluten/trigo |
|-------|--------|---------------------|
| [William Davis](${davis}) | 476 | **${davisN}** en [trigo-gluten](${videosDavis}) |
| [Lair Ribeiro](${lair}) | 888 | **${lairN}** en [gluten-leite](${videosLair}) |
| Manual do Mundo | 2.401 | **1** real: *Como VER o GLÚTEN* |
| Resto del hub (~6.033) | | **0** pista clínica de gluten |

**Hallazgo:** el eje sigue a **Davis + Lair**. Los demás vídeos se relacionan **por ausencia**. Análisis madre: [daños × vídeos](${analise}).

@youtube ${vLairGluten}

@youtube ${vDavisWhat}

@youtube ${vMundoVer}

Lista completa de títulos Davis en la ficha PT y en [\`davis-video-themes.json\`](${davisJson}).

## Estado

**Publicada** — Productos nocivos · investigación ampliada (salud × 9.798 vídeos). Sin dieta prescrita.

[Productos nocivos](${hub}) · [Trigo](${trigo}) · [Filtro Davis](${videosDavis}) · [Lair gluten-lácteos](${videosLair})
`;

  return { body, contentEn, contentEs };
}

module.exports = { buildGlutenBodies };
