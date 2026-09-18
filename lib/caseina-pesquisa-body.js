'use strict';

/**
 * Pesquisa completa — caseína, mal à saúde e o acervo de vídeos do projecto.
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

function buildCaseinaBodies() {
  const inspected = '2026-09-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-derivados';
  const vaca = '/animais/vaca/';
  const leite = '/posts/post-inspecao-derivado-leite.html';
  const vacaDeriv = '/posts/post-inspecao-derivado-vaca.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const soja = '/posts/post-inspecao-planta-soja.html';
  const trigo = '/posts/post-inspecao-planta-trigo.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const artCasein = '/posts/post-inspecao-artigo-brooke-taylor-caseina-a1-a2-2017.html';
  const artWho = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const intestino = '/posts/post-inspecao-palavra-intestino.html';
  const rasmussen = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const videosHub = '/videos/';
  const videosLair = '/videos/?channel=lair&series=gluten-leite';
  const videosDavis = '/videos/?channel=davis';
  const videosMundo = '/videos/?channel=manualdomundo';
  const videosRas = '/videos/?channel=rasmussen';
  const lairJson = '/content/channels/lair-video-themes.json';
  const davisJson = '/content/channels/davis-video-themes.json';

  const vLairLeite = 'cID3nNJsgm4';
  const vLairCusto = 'yLOG0fcqYs0';
  const vLairCalcio = 'XP6cOQ1RvmI';
  const vDavisLactose = 'LGqjlu5p6dc';
  const vDavisDairy = 'ribcYXzfzgQ';
  const vMundoCola = 'SJtQyG-oPZs';
  const vMundoPlastico = '1iKUEPxcIBg';
  const vMundoWhey = 'd_yjRh1cxZc';
  const vRasMal = '4njQ7vAzK_U';
  const vRasTruth = 'PWR8bPgKX2k';

  const lairVideos = loadThemeVideos('content/channels/lair-video-themes.json', 'gluten-leite');
  const lairTable = lairVideos.length ? mdVideoTable(lairVideos) : '| — | (catálogo Lair indisponível) | — |';
  const lairN = lairVideos.length || 14;

  const davisYogurt = [
    ['flYcGht6YiU', 'What\'s all this about making "yogurt"?'],
    ['PHjqQQRwFh4', "It's Not Yogurt"],
    ['wchmObOotRg', 'What is "SIBO Yogurt"'],
    ['ribcYXzfzgQ', 'Can dairy products block weight loss?'],
    ['LGqjlu5p6dc', 'Lactose Intolerance']
  ];
  const davisYogurtTable = [
    '| # | Âncora Davis (laticínios no título) |',
    '|---|-------------------------------------|',
    ...davisYogurt.map((row, i) => `| ${i + 1} | ${ytLink(row[0], row[1])} |`)
  ].join('\n');

  const mundoChem = [
    ['SJtQyG-oPZs', 'Cola de leite (EXPERIÊNCIA QUÍMICA + receita de cola)'],
    ['1iKUEPxcIBg', 'Plástico de leite (EXPERIÊNCIA de QUÍMICA)'],
    ['d_yjRh1cxZc', 'Como o WHEY PROTEIN é FABRICADO'],
    ['7n9jjSLZmDU', 'Como é FEITO o LEITE EM PÓ'],
    ['E3sd344jS_M', 'A transformação do leite em iogurte']
  ];
  const mundoTable = [
    '| # | Manual do Mundo — literacia da proteína |',
    '|---|------------------------------------------|',
    ...mundoChem.map((row, i) => `| ${i + 1} | ${ytLink(row[0], row[1])} |`)
  ].join('\n');

  const rasFarm = [
    ['4njQ7vAzK_U', 'O LEITE FAZ MAL?'],
    ['PWR8bPgKX2k', 'THE TRUTH ABOUT MILK! YOU WILL NEVER LOOK THE SAME AGAIN!'],
    ['nqIXme_Y2zU', 'O SEGREDO DAS VACAS QUE PRODUZEM MAIS LEITE NO BRASIL'],
    ['J9d60PbLbTU', 'O MELHOR QUEIJO DO MUNDO! DESCOBRI COMO É FABRICADO!']
  ];
  const rasTable = [
    '| # | Rasmussen — leite / queijo / vaca |',
    '|---|-----------------------------------|',
    ...rasFarm.map((row, i) => `| ${i + 1} | ${ytLink(row[0], row[1])} |`)
  ].join('\n');

  const body = `## Escopo

Pesquisa editorial completa da **caseína** — a proteína dominante do leite de [vaca](${vaca}) (*Bos taurus*) — como **produto nocivo ao organismo** quando a genética da proteína (A1/A2), a dose, o isolado industrial e o ultraprocessado lácteo se cruzam. O laboratório separa **quatro eixos clínicos** (intolerância à lactose, alergia IgE à proteína do leite, hipóteses A1/BCM-7, matriz ultraprocessada), o **eixo da fábrica** (caseinatos, leite em pó, shakes) e o **eixo do discurso** ([Lair Ribeiro](${lair}) fala «leite» e «lactose»; [Davis](${davis}) fala iogurte de *L. reuteri*, quase nunca «caseína»). Cruza o [glúten](${gluten}) (a outra cola), o hub [leite e derivados](${leite}), o [chocolate industrial](${chocolate}), a [cana / açúcar](${cana}) e os [derivados da vaca](${vacaDeriv}) (carne).

O título desta ficha — **a cola do leite e o mal à saúde** — vem do latim *caseus* (queijo): a proteína que coalha o leite também foi cola de madeira e plástico (galalite). O mal à saúde **não** é um único diagnóstico; é uma rede de açúcar do leite, proteína, genética e marketing.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem nutricional.** O animal e o leite fresco tradicional **não** são vilões absolutos. Indexar Lair/Davis/Rasmussen **≠** endossar cada claim. **Zero** títulos do hub nomeiam a palavra *caseína* — o acervo fala *leite*, *lactose* e *iogurte*. Esta pesquisa descreve literacia de rótulo, de evidência e de **vídeo catalogado**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome popular | **Caseína** (latim *caseus* — queijo) |
| Título da pesquisa | A cola do leite e o mal à saúde |
| Origem animal | [Vaca / boi](${vaca}) (*Bos taurus*) |
| Química | ~80% das proteínas do leite (αs1, αs2, β, κ); soro/whey ~20% |
| Tipo BudGanja | Produto nocivo — proteína animal → matriz industrial |
| Produto de risco em foco | Caseína (esp. β-caseína A1) + caseinatos + laticínios ultraprocessados |
| Série | Produtos nocivos |
| Data da inspeção (ampliada) | ${inspected} |

## Etimologia — a cola do queijo

**Caseína** vem do latim *caseus* (queijo) + sufixo *-ína* (substância). No queijo artesanal essa cola é ofício (coalho, micela, cálcio). Na fábrica, a mesma palavra vira **caseinato de sódio**, **sólidos lácteos** e **«proteína do leite»** em barras. Historicamente a caseína foi **cola** e **plástico** (galalite) — o [Manual do Mundo](${videosMundo}) ainda mostra a experiência *Cola de leite*. Irmã de prateleira: [glúten](${gluten}) (latim *gluten*, cola da massa).

| Palavra | O que cola | Ficha |
|---------|------------|-------|
| Caseína | Micelas do leite → queijo, cola, isolado | Esta pesquisa |
| Lactose | Açúcar do leite — **não** é a proteína | Eixo clínico distinto, abaixo |
| Soro / whey | ~20% restante; shakes e «proteína» de marketing | Rótulo — não demonizar o soro tradicional |
| Glúten | A outra cola da dieta industrial | [Glúten — a cola invisível](${gluten}) |

## O que é a caseína (química, sem protocolo)

A caseína **não** é uma molécula só. São quatro famílias (αs1, αs2, β, κ) organizadas em **micelas** com cálcio e fosfato. A β-caseína tem variantes genéticas **A1** e **A2**. Na digestão da A1 pode libertar-se o peptídeo **BCM-7** (beta-casomorfina-7).

| Marcador | Papel | Leitura BudGanja |
|----------|-------|------------------|
| Caseínas (α, β, κ) | ~80% da proteína do leite de vaca | Ofício do queijo ≠ caseinato de fábrica |
| Soro / whey | ~20% | Isolado de shake ≠ leite da ordenha |
| β-caseína A1 | Variante comum em raças leiteiras industriais; pode libertar BCM-7 | Hipótese GI — [Brooke-Taylor 2017](${artCasein}) |
| β-caseína A2 | Variante que não gera o mesmo BCM-7 | Marketing A2 ≠ prova de «leite inofensivo» |
| BCM-7 | Peptídeo opioide da digestão A1 | Evidência humana **heterogénea** |
| Lactose | Dissacarídeo (açúcar) | Intolerância ≠ alergia à proteína |
| Caseinatos | Sódio/cálcio — ingrediente industrial | Elevado em ultraprocessados |

**H1:** separar **vaca / leite fresco** de **caseína industrial em dose alta**.  
**H2:** quem reage ao «leite» pode estar a reagir a **lactose**, a **caseína**, a ambos — ou à **matriz** (açúcar, aroma, volume).  
**H3:** [glúten](${gluten}) e caseína são as duas **colas proteicas** da dieta moderna — eixos distintos, categoria irmã.  
**H4:** o acervo de vídeos **não nomeia** a caseína; nomeia o leite. A ficha recupera a palavra.

## Quatro eixos clínicos (o mal à saúde, com método)

O «mal do leite» no senso comum funde doenças diferentes. O laboratório **desfunde**.

| Eixo | O que é | O que não é | Conduta editorial |
|------|---------|-------------|-------------------|
| **Intolerância à lactose** | Défice de lactase; o **açúcar** do leite fermenta | Alergia; «caseína» | Distinto — ler rótulo *lactose* ≠ *proteína do leite* |
| **Alergia à proteína do leite (APLV)** | Eixo **IgE** (caseína e/ou soro); pode incluir anafilaxia | Intolerância | Clínico — orientação profissional |
| **A1 / BCM-7** | Hipótese de trânsito mais lento, inflamação GI e desconforto com A1 vs A2 | «Leite é opioide para toda a gente» | [Brooke-Taylor](${artCasein}): evidência humana limitada; marketing A2 ≠ guideline |
| **Laticínio ultraprocessado** | Caseinatos + açúcar + aroma + volume | Leite da ordenha | Eixo de **dose e fábrica** — [Hall 2019](${hall}) · [OMS açúcares](${artWho}) |

Mecanismos que a divulgação cita — e os limites:

1. **Alergia IgE** — eixo clínico sólido quando diagnosticado.  
2. **Lactose** — o mais comum no discurso Lair («GLÚTEN E LACTOSE»); **não** é caseína.  
3. **BCM-7 / permeabilidade** — revisão 2017 útil; **não** autoriza o slogan «intestino furado em toda a população». Ver [intestino](${intestino}).  
4. **Cálcio do leite como mito** — Lair ataca o mito; o laboratório lê como **discurso**, não como laudo ósseo.  
5. **Iogurte «probiótico» Davis** — fermento *L. reuteri* **não** inspecciona a caseína industrial; é outro eixo (microbioma).

## Do animal ao produto de risco

| Etapa | O que acontece | Risco editorial |
|-------|----------------|-----------------|
| Vaca / leite fresco | Ordenha, consumo tradicional | Baixo — contexto e dose · [ficha da vaca](${vaca}) |
| Queijo / iogurte de ofício | Coalho, fermentação | Intermediário — dose |
| Leite em pó / sólidos lácteos | Concentração, prateleira longa | Intermediário a elevado |
| Caseinatos / isolados | Extração industrial da cola | Elevado em ultraprocessados |
| Bebida láctea / chocolate ao leite | Caseína + [açúcar](${cana}) + (muitas vezes) [farinha](${gluten}) | Elevado — rede completa |

Quem [transforma a prateleira](${ricos}) não «inventa» a vaca: **seca**, **isola** e **adoça**.

## A armadilha «leite saudável» / A2 / shake

Trocar leite fresco por **bebida láctea adoçada**, **barra de caseína** ou **iogurte de prateleira com xarope** não é literacia. O marketing A2 vende genética; o shake vende gramas. Nenhum apaga ultraprocessamento.

| Situação | O que inspeccionar |
|----------|-------------------|
| APLV / alergia | Exclusão real — caseína, soro, sólidos lácteos, manteiga, lactose residual |
| Intolerância à lactose | Açúcar do leite — queijo longo e iogurte podem diferir; não é a cola |
| Shake / caseinato | Dose alta + rótulo longo |
| Chocolate ao leite | Leite em pó + açúcar — [chocolate](${chocolate}) |
| «Sem lactose» industrial | Pode manter a **proteína**; ler se há caseinato |

## Universo de vídeos — todos os canais do projecto

O hub [Vídeos](${videosHub}) catalogava **9.798** vídeos únicos na data desta pesquisa. Achado-mãe: **nenhum título nomeia caseína / casein / BCM-7**. O eixo entra por *leite*, *lactose*, *iogurte*, *queijo* e *whey*.

| Canal | Vídeos no hub | Hits (leite / lactose / dairy / iogurte / queijo / whey) | Papel nesta pesquisa |
|-------|---------------|----------------------------------------------------------|----------------------|
| [Dr. Lair Ribeiro](${lair}) | **888** | **14** no bucket [gluten-leite](${videosLair}) | Discurso de dano: mito do leite, lactose, par com glúten. **0** «caseína» |
| [William Davis, MD](${davis}) | **476** | **~20** (quase todos iogurte *L. reuteri*) + 1 lactose + 1 dairy/peso | **Não** é arquivo anti-caseína; é fermento / microbioma |
| Manual do Mundo | **2.401** | **5** de literacia química (cola, plástico, whey, leite em pó, iogurte) + ruído | Ver a cola do leite — paralelo a *Como VER o GLÚTEN* |
| [Richard Rasmussen](${rasmussen}) | **1.851** | **~11** leite/queijo/vaca de quinta + 2 títulos de dano («faz mal?», «truth about milk») | Origem animal e ofício; não a proteína isolada |
| Slivki Show | **416** | 1 (*How to Make a Yogurt*) | Experiência — fora do eixo de dano |
| Disney Jr. | **120** | 1 falso (*Árvores de Queijo*) | Ruído |
| Zangado, Paulinho, MovReCam, Amyr, Tamara, CANABinALL, Inspetor | ~3.246 | **0** | Relacionam-se **por ausência** |
| **Total** | **9.798** | **~63** títulos com palavra-chave láctea | **0** com a palavra caseína |

**Achado principal:** o eixo «caseína e mal à saúde» **não** tem nome no hub. Lair carrega o **leite** (pareado com glúten). Davis carrega o **iogurte fermentado** (outro ofício). Rasmussen carrega a **vaca**. O Manual do Mundo é o único que **mostra a cola**. A ficha existe precisamente para recuperar a palavra que os títulos escondem. Análise-mãe: [danos × vídeos](${analise}).

## Vídeos âncora (verificáveis)

@youtube ${vLairLeite}

@youtube ${vMundoCola}

@youtube ${vRasMal}

| Eixo | Título | Onde |
|------|--------|------|
| Lair · mito do leite | O mito do leite | \`${vLairLeite}\` |
| Lair · par com glúten | GLÚTEN E LACTOSE e o custo para o seu corpo | \`${vLairCusto}\` |
| Lair · cálcio | The myth of calcium in MILK | \`${vLairCalcio}\` |
| Davis · lactose (não caseína) | Lactose Intolerance | \`${vDavisLactose}\` |
| Davis · dairy / peso | Can dairy products block weight loss? | \`${vDavisDairy}\` |
| Manual do Mundo · ver a cola | Cola de leite | \`${vMundoCola}\` |
| Manual do Mundo · plástico | Plástico de leite | \`${vMundoPlastico}\` |
| Manual do Mundo · whey | Como o WHEY PROTEIN é FABRICADO | \`${vMundoWhey}\` |
| Rasmussen · a pergunta | O LEITE FAZ MAL? | \`${vRasMal}\` |
| Rasmussen · «verdade» | THE TRUTH ABOUT MILK | \`${vRasTruth}\` |

## Lair — trigo, glúten e laticínios (${lairN})

O mesmo bucket [\`gluten-leite\`](${videosLair}) da pesquisa do [glúten](${gluten}). **Indexar ≠ endossar.** Lair ensina o par: a cola da massa **e** o leite. Vários títulos são **leite materno** ou **cálcio** — o laboratório mantém o bucket do canal e marca: o discurso de dano lácteo **quase nunca diz caseína**.

${lairTable}

Leitura: a massa deste bucket para a caseína é **O mito do leite** (57K) e **GLÚTEN E LACTOSE** (65K). O custo nomeia o **açúcar** (lactose), não a cola. A ficha A1/BCM-7 preenche o que o título omite.

## Davis — iogurte, lactose e dairy (~20)

Canal [@williamdavismd](${videosDavis}) · ficha [William Davis](${davis}). Os hits «dairy/yogurt» **não** são a tese *Wheat Belly* aplicada ao leite: são **fermentos** (*L. reuteri*, «SIBO yogurt») e um vídeo de **lactose**. Isso desalinha título↔ficha — o mesmo tipo de desalinhamento que a [análise de danos](${analise}) descreveu no chocolate (elogio ao amargo ≠ snack). JSON: [\`davis-video-themes.json\`](${davisJson}).

${davisYogurtTable}

## Manual do Mundo — ver a cola do leite

Paralelo exacto a *Como VER o GLÚTEN* na pesquisa irmã. Aqui a proteína **coalha** e vira cola e plástico. Filtro: [${videosMundo}](${videosMundo}).

${mundoTable}

Ruído a não contar como inspeção de dano: caixa de leite (origami), leite psicodélico (detergente), mágica da revista, pão de queijo.

## Rasmussen — a vaca e a pergunta «faz mal?»

Canal [Richard Rasmussen](${rasmussen}) · filtro [${videosRas}](${videosRas}). Ofício de quinta, raças, ordenha, queijo. Dois títulos perguntam o dano; o resto é **origem** — o mesmo gesto da [ficha da vaca](${vaca}): não demonizar o animal.

${rasTable}

## Eixos vizinhos no acervo (não são caseína — colam)

| Eixo | Vídeos | Por que entra nesta pesquisa |
|------|--------|------------------------------|
| Lair · glúten (mesmo bucket) | 14 | O par da prateleira — [glúten](${gluten}) |
| Lair · açúcar / diabesidade | 10 + 30 | Bebida láctea adoçada — [cana](${cana}) |
| Davis · microbioma | 80 | O iogurte *L. reuteri* vive aqui, não na ficha A1 |
| Chocolate industrial | 3 pró-amargo | A ficha [chocolate](${chocolate}) é que põe o leite em pó no snack |
| Hall 2019 | artigo | Matriz ultraprocessada ↑ kcal |

## O que observar nos rótulos

- «proteína do leite», «caseinato de sódio/cálcio», «sólidos lácteos», «leite em pó», «soro», «whey»;
- bebidas lácteas com açúcar, xarope e aroma — elo [cana](${cana}) e [OMS](${artWho});
- chocolate ao leite / recheio — [chocolate](${chocolate});
- «sem lactose» que mantém caseína;
- alegações A2, «ósseo», «proteína» que escondem ultraprocessamento.

## Cruzamento — fichas do laboratório

| Elo | Ficha |
|-----|-------|
| Animal de origem | [Vaca / boi](${vaca}) · [Leite e derivados](${leite}) · [Derivados da vaca](${vacaDeriv}) |
| A outra cola (gliadina) | [Inspeção: Glúten — a cola invisível](${gluten}) |
| Açúcar / cana | [Inspeção: Cana-de-açúcar](${cana}) |
| Farinha + açúcar + leite | [Inspeção: Chocolate industrial](${chocolate}) |
| Soja (isolado na mesma prateleira) | [Inspeção: Soja](${soja}) |
| Trigo (matriz bolacha) | [Inspeção: Trigo](${trigo}) |
| A1 vs A2 (revisão) | [Brooke-Taylor et al., 2017](${artCasein}) |
| Ultraprocessados (RCT) | [Artigo Hall et al., 2019](${hall}) |
| Açúcares livres | [OMS 2015](${artWho}) |
| Quem transforma a prateleira | [Como os ricos transformam as coisas](${ricos}) |
| Divulgação PT | [Inspeção: Lair Ribeiro](${lair}) |
| Arquivo Davis | [Inspeção: William Davis](${davis}) |
| Danos × acervo | [Análise: danos × vídeos](${analise}) |
| Palavra intestino | [Inspeção: intestino](${intestino}) |

## Artigos científicos (âncoras desta pesquisa)

| Artigo | O que segura | Ficha |
|--------|--------------|-------|
| Brooke-Taylor et al., 2017 | A1 vs A2: GI, trânsito, BCM-7 — evidência humana limitada | [Brooke-Taylor](${artCasein}) |
| Hall et al., 2019 | Ultraprocessados ↑ kcal e peso — a **matriz**, não só a micela | [Hall](${hall}) |
| OMS 2015 | Açúcares livres nas bebidas lácteas adoçadas | [OMS](${artWho}) |

**Síntese:** a evidência **mais firme** de dano da proteína do leite é a **alergia IgE**. A evidência de dano **populacional** aponta mais para **laticínio ultraprocessado + açúcar** do que para «a cola do queijo mata toda a gente». A1/BCM-7 é hipótese a auditar ([Brooke-Taylor](${artCasein})), não slogan. Lair é arquivo de **leite/lactose**; Davis é arquivo de **fermento**; Rasmussen é arquivo da **vaca**; o Manual do Mundo é o único que **mostra a cola**.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Produtos nocivos · pesquisa ampliada (caseína × saúde × 9.798 vídeos) |
| Veredicto editorial | O leite tradicional merece contexto; a **cola industrial** (caseinato, leite em pó, bebida adoçada) e os **eixos clínicos** (alergia em primeiro; lactose distinta; A1 com cautela) merecem alerta — com método, sem pânico e sem dieta prescrita. |
| Vídeos | **0** títulos com a palavra caseína · Lair 14 (leite/lactose no bucket gluten-leite) · Davis ~20 (iogurte, não A1) · Manual do Mundo 5 (ver a cola) · Rasmussen ~11 (vaca/queijo) · resto: ausência |

## Hub

[Produtos nocivos](${hub}) · [Vaca](${vaca}) · [Vídeos Lair / gluten-leite](${videosLair}) · [Glúten](${gluten}) · [Brooke-Taylor](${artCasein}) · [Lair](${lair}) · [Davis](${davis}) · [Análise × vídeos](${analise}) · [Artigos](/biblioteca/inspecoes/#inspecoes-artigos)
`;

  const contentEn = `## Scope

Full editorial research on **casein** — cow’s milk’s dominant protein — as a **harmful product** when protein genetics (A1/A2), dose, industrial isolate and ultra-processed dairy collide. Four clinical axes (lactose intolerance, IgE milk-protein allergy, A1/BCM-7 hypotheses, ultra-processed matrix), one factory axis, one discourse axis ([Lair](${lair}) says “milk”/“lactose”; [Davis](${davis}) says *L. reuteri* yogurt). Cross-links [gluten](${gluten}) (the other glue), [industrial chocolate](${chocolate}), [sugarcane](${cana}) and the [cattle sheet](${vaca}).

> **Method note:** independent BudGanja audit. **Not medical advice.** The animal and traditional fresh milk are not absolute villains. **Zero** hub titles name *casein*. Indexing Lair/Davis/Rasmussen ≠ endorsing every claim.

## Milk’s glue

Latin *caseus* means cheese. In craft cheese that glue is skill; on the shelf it becomes caseinate, milk powder and “milk protein”. Sister glue: [gluten](${gluten}). Manual do Mundo still shows the chemistry: *Cola de leite* (milk glue) and milk plastic.

## Clinical axes (harm to health, with method)

| Axis | Reading |
|------|---------|
| **Lactose intolerance** | The **sugar**, not the protein |
| **IgE cow’s-milk allergy** | Casein and/or whey — professional care |
| **A1 / BCM-7** | GI hypothesis; human evidence limited — [Brooke-Taylor 2017](${artCasein}) |
| **Ultra-processed dairy** | Caseinates + sugar + flavour — [Hall 2019](${hall}) |

Strongest protein-harm evidence: **IgE allergy**. Population-level harm tracks **sweetened ultra-processed dairy** more than “cheese glue kills everyone”. A1 is a hypothesis to audit, not a slogan.

## All project videos (9,798)

| Channel | Hub videos | Dairy-keyword signal |
|---------|------------|----------------------|
| [Lair Ribeiro](${lair}) | 888 | **${lairN}** in [gluten-leite](${videosLair}) — milk paired with gluten; **0** “casein” |
| [William Davis](${davis}) | 476 | ~20 yogurt/*L. reuteri* + 1 lactose + 1 dairy/weight — **not** an A1 archive |
| Manual do Mundo | 2,401 | **5** chemistry hits (glue, plastic, whey, milk powder, yogurt) |
| [Rasmussen](${rasmussen}) | 1,851 | Farm milk/cheese + 2 harm questions (*O LEITE FAZ MAL?*) |
| Games, UNIFESP, Klink, CANABinALL, Inspetor | ~3,246 | **0** |

**Finding:** this axis has **no name** in the hub. Lair carries **milk**; Davis carries **ferment**; Rasmussen carries the **cow**; Manual do Mundo **shows the glue**. Mother analysis: [harms × videos](${analise}).

@youtube ${vLairLeite}

@youtube ${vMundoCola}

@youtube ${vRasMal}

## Labels

«milk protein», sodium/calcium caseinate, dairy solids, milk powder, whey; lactose-free products that keep the protein; milk chocolate = powder + sugar.

## Status

**Published** — Harmful products · expanded casein research (health × 9,798 videos). Craft milk ≠ shelf glue. No prescribed diet.

[Harmful products](${hub}) · [Cattle](${vaca}) · [Lair gluten-dairy](${videosLair}) · [Gluten](${gluten}) · [Brooke-Taylor](${artCasein})
`;

  const contentEs = `## Alcance

Investigación editorial completa de la **caseína** — proteína dominante de la leche de vaca — como **producto nocivo** cuando genética (A1/A2), dosis, aislado industrial y lácteo ultraprocesado se cruzan. Cuatro ejes clínicos (lactosa, alergia IgE, A1/BCM-7, matriz ultraprocesada). Cruza [gluten](${gluten}) (la otra cola), [chocolate industrial](${chocolate}), [caña](${cana}) y la [ficha de la vaca](${vaca}).

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** El animal y la leche fresca tradicional no son villanos absolutos. **Cero** títulos del hub nombran *caseína*.

## La cola de la leche

Latín *caseus* = queso. En el queso de oficio es oficio; en el estante es caseinato y leche en polvo. Cola hermana: [gluten](${gluten}). Manual do Mundo muestra *Cola de leite* y el plástico de leche.

## Ejes clínicos

| Eje | Lectura |
|-----|---------|
| **Intolerancia a la lactosa** | El **azúcar**, no la proteína |
| **Alergia IgE** | Caseína y/o suero — orientación profesional |
| **A1 / BCM-7** | Hipótesis GI; evidencia humana limitada — [Brooke-Taylor 2017](${artCasein}) |
| **Lácteo ultraprocesado** | Caseinatos + azúcar — [Hall 2019](${hall}) |

La evidencia más firme de daño de la proteína es la **alergia IgE**. El daño poblacional sigue más al **lácteo ultraprocesado azucarado** que a «la cola del queso mata a todo el mundo».

## Todos los vídeos del proyecto (9.798)

| Canal | Vídeos | Señal láctea |
|-------|--------|--------------|
| [Lair](${lair}) | 888 | **${lairN}** en [gluten-leite](${videosLair}) — leche con gluten; **0** «caseína» |
| [Davis](${davis}) | 476 | ~20 yogur *L. reuteri* — no es archivo A1 |
| Manual do Mundo | 2.401 | **5** de química (cola, plástico, whey, leche en polvo) |
| [Rasmussen](${rasmussen}) | 1.851 | Granja + 2 preguntas de daño |
| Resto (~3.246) | | **0** |

**Hallazgo:** el eje **no tiene nombre** en el hub. Lair carga la **leche**; Davis el **fermento**; Rasmussen la **vaca**; Manual do Mundo **muestra la cola**. Análisis madre: [daños × vídeos](${analise}).

@youtube ${vLairLeite}

@youtube ${vMundoCola}

@youtube ${vRasMal}

## Estado

**Publicada** — Productos nocivos · investigación ampliada (salud × 9.798 vídeos). Sin dieta prescrita.

[Productos nocivos](${hub}) · [Vaca](${vaca}) · [Lair gluten-lácteos](${videosLair}) · [Gluten](${gluten})
`;

  return { body, contentEn, contentEs };
}

module.exports = { buildCaseinaBodies };
