'use strict';

/**
 * Inspeção Palavras · mapa
 * Pedido: inspeção da palavra MApa · relação com Maão.
 *
 * Duas peças, um campo:
 *   mapa — lat. mappa «pano / guardanapo» → mappa mundi
 *   mão  — lat. manus «mão» (ficha irmã)
 * A orelha e o olho colam o MA- (MApa / Maão). O étimo corta.
 * A relação de ofício: o pano do mundo cabe na palma.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mapa-palavra-cover.jpg';
const WIKT_MAPA = 'https://pt.wiktionary.org/wiki/mapa';
const WIKT_MAPA_EN = 'https://en.wiktionary.org/wiki/mapa';
const WIKT_MAPPA = 'https://en.wiktionary.org/wiki/mappa#Latin';
const WIKT_MAO = 'https://pt.wiktionary.org/wiki/m%C3%A3o';
const WIKT_MANUS = 'https://en.wiktionary.org/wiki/manus#Latin';
const WIKT_MAPEAR = 'https://pt.wiktionary.org/wiki/mapear';
const WIKI_MAPA = 'https://pt.wikipedia.org/wiki/Mapa';
const WIKI_MAPPA_MUNDI = 'https://pt.wikipedia.org/wiki/Mappa_mundi';
const WIKT_CARTO = 'https://pt.wiktionary.org/wiki/cartografia';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Mapa.
Não é a mão.
É o pano do mundo.

Latim mappa.
Pano, guardanapo, tecido.
Mappa mundi: o mundo no pano.

Mão.
Latim manus.
A palma que segura o pano.

MApa.
Maão.
A orelha cola o MA.
O étimo corta.

O mapa na mão.
Não é posse.
É o traço que a palma fez.

No pano cabe a estrada.
Cabe o automóvel.
Cabe a bateria.
Cabe a encruzilhada.
O pano não é o leito.

Valeu !!!
ter o caminho no pano
sem fundir o pano com a palma.`;
}

function poemEn() {
  return `Mapa.
It is not the hand.
It is the cloth of the world.

Latin mappa.
Cloth, napkin, fabric.
Mappa mundi: the world on cloth.

Mão.
Latin manus.
The palm that holds the cloth.

MApa.
Maão.
The ear glues the MA.
The etymon cuts.

The map in the hand.
It is not possession.
It is the trace the palm made.

On the cloth fits the road.
Fits the car.
Fits the battery.
Fits the crossroads.
The cloth is not the bed.

Valeu !!!
have the path on the cloth
without fusing cloth and palm.`;
}

function poemEs() {
  return `Mapa.
No es la mano.
Es el paño del mundo.

Latín mappa.
Paño, servilleta, tejido.
Mappa mundi: el mundo en el paño.

Mão.
Latín manus.
La palma que sujeta el paño.

MApa.
Maão.
El oído pega el MA.
El étimo corta.

El mapa en la mano.
No es posesión.
Es el trazo que hizo la palma.

En el paño cabe la estrada.
Cabe el automóvil.
Cabe la batería.
Cabe la encrucijada.
El paño no es el lecho.

¡Valeu !!!
tener el camino en el paño
sin fusionar el paño con la palma.`;
}

function buildMapaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-mapa.html';
  const mao = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const pediMao = '/posts/post-inspecao-palavra-pedi-mao.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const estrada = '/posts/post-inspecao-palavra-estrada.html';
  const automovel = '/posts/post-inspecao-palavra-automovel.html';
  const bateria = '/posts/post-inspecao-palavra-bateria.html';
  const encruzilhada = '/posts/post-inspecao-palavra-encruzilhada.html';
  const cruzamento = '/posts/post-inspecao-cruzamento-estrada-encruzilhada-jesus-cristo.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const horizonte = '/posts/post-inspecao-arte-horizonte-geografico.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const mindinho = '/posts/post-inspecao-expressao-mindinho.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vida = '/vida/';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const inspecoes = '/biblioteca/inspecoes/';

  const body = `## Escopo

Inspeção editorial da palavra **[mapa](${self})** — lat. *mappa* «pano / guardanapo»: o **tecido** onde se desenha o mundo, e por extensão o **desenho do território**, o **esquema** e o **plano**. Pedido de campo: *inspeção da palavra MApa · relação com Maão*.

Duas peças, um campo. O **objecto** é o vocábulo português *mapa*. O **cruzamento** é **[mão](${mao})** — lat. *manus*. [A orelha cola](${orelhaCola}) o **MA-** (*MApa* / *Maão*). O [étimo](${etimo}) **corta**: *mappa* ≠ *manus*. A [relação](${relacao}) de ofício permanece: o **pano do mundo cabe na palma**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · mapa](${WIKT_MAPA}), EN [*mapa*](${WIKT_MAPA_EN}), lat. [*mappa*](${WIKT_MAPPA}), [mão](${WIKT_MAO}), lat. [*manus*](${WIKT_MANUS}), [mapear](${WIKT_MAPEAR}), [WP · mapa](${WIKI_MAPA}), [*mappa mundi*](${WIKI_MAPPA_MUNDI}), [cartografia](${WIKT_CARTO}). Método: [etimologia](${etimologia}) — étimo × cola × sala. **Ficha ≠ atlas, ≠ GPS, ≠ quiromancia, ≠ mapa clínico.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho tipográfico:** *MApa* / *mapa* / *MAPA* → **mapa**. *Maão* / *mão* / *MAO* → ficha irmã **[mão](${mao})**. *mapear* nesta ficha = variação verbal — **não** abre lema próprio.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **mapa** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | lat. *mappa* «pano, guardanapo, toalha» — confiança: **alta**; via púnica discutida (Quintiliano) — **média** |
| Família | *mapear* · *mapeamento* · *mapinha* · esp. *mapa* · ing. *map* · fr. *mappe* (arcaico) / *carte* |
| Cruzamento | **[mão](${mao})** — lat. *manus*; cola *MA-*; **não** o mesmo avô |
| Gatilho de campo | *MApa* × *Maão* — o olho marca o prefixo partilhado |
| Tipo BudGanja | Palavra — pano × desenho × plano × ofício na palma; o pano **desenha** a viagem sem ser o leito |
| Não é | GPS · atlas completo · quiromancia · [cartografia](${WIKT_CARTO}) como o mesmo étimo |
| Elo caminho | [caminho](${caminho}) · [passar](${passar}) — a rota; o mapa é o **desenho** da rota |
| Elo palma | [mão](${mao}) · [gesto](${gesto}) · [pedi a mão](${pediMao}) · [mindinho](${mindinho}) |
| Elo território | [horizonte geográfico](${horizonte}) · [mar](${mar}) |
| Fonte | [mapa](${WIKT_MAPA}) · [*mappa*](${WIKT_MAPPA}) |
| Data | ${inspected} |

**O que é o objecto:** o nome do **pano onde o mundo cabe** — e, vivo, do **desenho**, do **esquema** («mapa mental»), do **plano** («ter o mapa») e da **metáfora de rede** no lab (mapa canábico, mapa de sentidos). No lab: [objecto](${self}) lexical. A [mão](${mao}) **não** é outro mapa: é a **palma que segura e traça**.

## 2. Mapa × mão — a relação pedida

Pedido de campo: *MApa · relação com Maão*. O lab **cruza** e **não funde**.

| Peça | Forma | Origem | Ofício nesta ficha |
|------|-------|--------|---------------------|
| **Pano / desenho** | *mapa* | lat. *mappa* | O tecido do mundo; o traço do território |
| **Palma** | *mão* | lat. *manus* | A ferramenta do [gesto](${gesto}); ficha [mão](${mao}) |
| **Cola de campo** | *MApa* / *Maão* | o olho e a orelha partilham **MA-** | Gatilho — **não** prova de sangue |
| **Locução** | *mapa na mão* | uso BR | Ter a rota; **não** posse do território |
| **Ofício** | traçar / segurar | cartógrafo + palma | A [mão](${mao}) faz o mapa; o mapa **orienta** a mão |
| **Árvore cortada** | *cartografia* | gr. *chártēs* + *gráphein* | Outro étimo — papel/escrever, não pano |
| **Árvore cortada** | *manus* como pai de *mapa* | lat. da palma | **Não** é o avô de *mapa* |

**H1:** *mapa* < lat. *mappa* (pano) — alta.  
**H2:** *mão* < lat. *manus* — alta; **não** é o mesmo avô.  
**H3:** a [relação](${relacao}) de campo = cola *MA-* + **pano na palma** + locução *mapa na mão* + ofício de traçar.  
**H4:** *mappa mundi* (Idade Média) = o mundo no pano — o pano **cabe na mão**.  
**H5:** [caminho](${caminho}) é a rota; *mapa* é o **desenho** da rota. Sem [passar](${passar}) o mapa fica papel.

### Camadas da relação (sem fundir)

| Camada | O que **é** | O que **não** é |
|--------|-------------|-----------------|
| **Ouvido / olho** | *mapa* e *mão* partilham **MA-** (*MApa* / *Maão*) | Não prova parentesco |
| **Pano** | *mappa* era **tecido** — coisa que a [mão](${mao}) segura | O pano ≠ a palma |
| **Ofício** | A palma **traça** o território; o mapa **devolve** a rota à palma | GPS não apaga o gesto |
| **Locução** | *ter o mapa na mão* = ter a orientação | Não é posse do chão |
| **Linhas da palma** | A mão **também** se lê como desenho de linhas | **≠** quiromancia nesta ficha |
| **Lab** | «mapa canábico», «mapa de sentidos» | Metáfora de rede — **≠** atlas clínico |
| **Trocadilho** | *MApa* / *Maão* no [trocadilho](${trocadilho}) | Bom no jogo; mau como étimo |

**Leitura lab:** inspecionar o **mapa** (pano → desenho) **e** a **[mão](${mao})** (palma → gesto) **sem** baptizar o pano com o nome da palma. Par de método: [mola](/posts/post-inspecao-palavra-mola.html) × [mula](/posts/post-inspecao-animal-mula.html) — a orelha cola; o [étimo](${etimo}) corta.

### O pano da viagem (sem fundir com o leito)

Pedido posterior do laboratório: **fazer o mapa de novo** — desenhar no pano as peças da viagem. O [mapa](${self}) **não é** a [estrada](${estrada}): um é o **tecido**; a outra é o **chão**. *Mappa* ≠ *strata* ≠ *manus*.

| Peça no pano | Ofício | Ficha | O mapa **não** é isto |
|--------------|--------|-------|------------------------|
| **Este pano** | lat. *mappa* — o tecido onde o mundo cabe | esta ficha | o leito |
| **[Estrada](${estrada})** | lat. *strata* — via calçada | Palavra · Cap. da via | o pano |
| **[Automóvel](${automovel})** | gr. *autós* + lat. *mōbilis* — move-se a si | Objecto no catálogo | o mapa nem o rumo |
| **[Bateria](${bateria})** | fr. *batterie* ← *battre* — pulso da máquina | Objecto no catálogo | a alma / o Espírito |
| **[Encruzilhada](${encruzilhada})** | *en-* + *cruz* + *-ilhada* — o X das vias | Palavra · o sítio | o madeiro |
| **[Jesus Cristo](${cruzamento})** | Yeshua + Christós; João 14:6 fala de **[caminho](${caminho})** | Cruzamento · Pessoas | a [estrada](${estrada}) |

**H6:** o ofício do mapa é **desenhar** a viagem na palma; o da [estrada](${estrada}) é **ser chão**; o do [cruzamento](${cruzamento}) é **relacionar** *crux* com *crux* sem fundir asfalto e madeiro.  
**H7:** categorias da fila: [estrada](${estrada}) e [encruzilhada](${encruzilhada}) = **palavra**; [automóvel](${automovel}) e [bateria](${bateria}) = **objeto**; Jesus Cristo = **pessoas**. O pano **agrupa** sem misturar os tipos.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *mappa* | «pano, guardanapo, toalha de mesa» | Alta |
| *mappa mundi* | «pano do mundo» — o mapa medieval no tecido | Alta |
| Via púnica | Quintiliano atribui *mappa* a origem cartaginesa | Média (debate filológico) |
| Romance | pt. *mapa* · esp. *mapa* · ing. *map* (via lat. med.) | Alta |
| **Não** *manus* | A palma é outra árvore — ficha [mão](${mao}) | Alta (corte) |
| **Não** *chártēs* | *cartografia* / *carta* geográfica = outro étimo (grego) | Alta (corte) |

**Veredicto etimológico:** origem **latina clara** (*mappa* = pano). O português vive no **desenho do território** e no **plano**. A [mão](${mao}) entra por **ofício e cola**, não por sangue.

O [latim](${latim}) guarda as duas peças no mesmo alfabeto: *mappa* e *manus*. O português aproxima-as no ouvido (*mapa* / *mão*). O lab **nomeia as duas** e **não funde**.

## 4. Transformação / rede de sentidos

| Eixo | Exemplos | Nota BudGanja |
|------|----------|---------------|
| Pano / objecto | mapa de papel, mapa de pano, mapa-múndi | Eco do étimo — [objetos](${objetos}) |
| Território | mapa do Brasil; mapa da estufa | Desenho do chão — [horizonte](${horizonte}) |
| Rota | mapa do [caminho](${caminho}); ter o mapa | Orientar o [passar](${passar}) |
| Plano / esquema | mapa mental; mapa do projecto | Metáfora de rede — literacia, não GPS |
| Verbo | **mapear** (variação nesta ficha) | Pôr no pano; inventariar sem possuir |
| Palma | *mapa na mão*; traçar à mão | [Relação](${relacao}) com [mão](${mao}) |
| Lab | mapa canábico; mapa de sentidos; mapa molécula→lixo | Uso interno — **≠** laudo |
| Digital | mapa no telemóvel; pin no ecrã | Outro suporte; o étimo continua pano |
| Carta | carta náutica / carta geográfica | Sala *chártēs* — irmã de uso, **não** de raiz |

### Mapear — variação de mapa

Pedido implícito do ofício: o verbo mora **aqui**. *Mapear* = pôr no pano (inventariar, localizar, desenhar a rede). Não há ficha-lema **mapear**. Como [relação](${relacao}) guarda *cruzar*: mesmo ofício, outra classe.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Palma** | *mapa* = *mão* porque *MA-* | Pano (*mappa*) ≠ palma (*manus*) |
| **GPS** | O mapa *é* o telemóvel | O suporte mudou; o ofício (orientar) ficou |
| **Atlas** | Esta ficha é o mundo inteiro | É o **vocábulo**, não o volume |
| **Carta** | *carta* = *mapa* | Irmã de **uso**; raiz grega outra |
| **Quiromancia** | Linhas da mão = mapa do destino | Desenho da palma ≠ oráculo |
| **Mapa clínico** | «mapa canábico» = protocolo | Metáfora de rede no lab — [verdade](${verdade}) da literacia |
| **Posse** | *ter o mapa na mão* = dono do chão | Orientação — não título de terra |

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Objecto** | «abre o mapa», «mapa de papel» | Bom: o pano / o desenho |
| **Rota** | «mapa até à estufa» | Bom: elo [caminho](${caminho}) |
| **Plano** | «já tenho o mapa» | Bom se for orientação; mau se for pose |
| **Palma** | «mapa na mão» | Bom: locução; mau: fundir com [mão](${mao}) |
| **Verbo** | «mapear a rede» | Bom: variação; não abre lema |
| **Lab** | «mapa de sentidos» | Bom: metáfora declarada |
| **Trocadilho** | *MApa* / *Maão* | Bom no [trocadilho](${trocadilho}); mau como étimo |
| **Digital** | pin, GPS, satélite | Bom como suporte; mau: apagar o pano e a palma |

**Finalidade-mãe:** nomear o **mapa** para inspecionar o **pano do mundo**, e cruzar com a **[mão](${mao})** **sem** colar a palma no pano.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Objecto | Pano → desenho — esta ficha |
| Palma | [Mão](${mao}) — *manus*; esquerda × direita |
| Locução | *mapa na mão* — orientar, não possuir |
| Rota | [Caminho](${caminho}) · [passar](${passar}) |
| Território | [Horizonte geográfico](${horizonte}) · [mar](${mar}) |
| Gesto | [Gesto](${gesto}) · [mindinho](${mindinho}) · [pedi a mão](${pediMao}) |
| Tesoura | [Étimo](${etimo}) · [etimologia](${etimologia}) · [latim](${latim}) |
| Mantra | [Valeu !!!](${mantra}) — o melhor **neste** pano, hoje |
| Ofício | [Faça o seu melhor](${faca}) |

**Veredicto:** Valeu !!! — **mapa** é pano (*mappa*); **mão** é palma (*manus*). A locução junta os dois na **palma**; o étimo não.

## Hipóteses (síntese)

**H1:** *mapa* < lat. *mappa* «pano» — alta.  
**H2:** via púnica de *mappa* — média.  
**H3:** *mão* < lat. *manus* — alta; **não** o mesmo avô.  
**H4:** a [relação](${relacao}) de campo = cola *MA-* (*MApa* / *Maão*) + pano na palma + *mapa na mão* + traçar.  
**H5:** [caminho](${caminho}) = rota; mapa = desenho da rota.  
**H6:** o pano desenha [estrada](${estrada}), [automóvel](${automovel}), [bateria](${bateria}), [encruzilhada](${encruzilhada}) e o [cruzamento](${cruzamento}) — *mappa* ≠ *strata*.  
**H7:** *mapear* = variação verbal nesta ficha.  
**H8:** *cartografia* / *carta* = outra árvore (grego).  
**H9:** fecho = [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Mão](${mao}) | A palma do pedido — *manus* |
| [Pedi a mão](${pediMao}) · [mindinho](${mindinho}) | Locuções da palma |
| [Caminho](${caminho}) · [passar](${passar}) · [estrada](${estrada}) | A rota, a travessia, o leito — o mapa **desenha**; não é o chão |
| [Automóvel](${automovel}) · [bateria](${bateria}) | Objectos da viagem no pano — catálogo [Objetos](${objetos}) |
| [Encruzilhada](${encruzilhada}) · [Cruzamento · Jesus Cristo](${cruzamento}) | O X e o nome; *crux* relaciona sem fundir |
| [Relação](${relacao}) · [trocadilho](${trocadilho}) | O *entre* e o jogo *MApa* / *Maão* |
| [Horizonte geográfico](${horizonte}) · [mar](${mar}) | Território e travessia |
| [Gesto](${gesto}) · [verdade](${verdade}) | Traçar sem pose |
| [Étimo](${etimo}) · [etimologia](${etimologia}) · [latim](${latim}) · [língua portuguesa](${lingua}) | Tesoura |
| [Objetos](${objetos}) | O mapa de papel / pano como coisa |
| [Guia](${guia}) · [hub](${hubAll}) · [inspeções](${inspecoes}) | Rede |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) · [Vida](${vida}) · [vida](${vidaPalavra}) | Fecho |

## Poema do laboratório

\`\`\`poem
${poemPt()}
\`\`\`

## Limites

- Não é atlas, GPS, aula de cartografia nem protocolo de orientação.  
- Não é quiromancia nem leitura de destino nas linhas da palma.  
- «Mapa canábico» / «mapa de sentidos» são metáforas de rede no lab — **não** laudo clínico.  
- *Carta* geográfica é irmã de **uso**, não de étimo (*chártēs* ≠ *mappa*).  
- A ficha [mão](${mao}) continua a cobrir esquerda × direita; esta ficha cobre o **pano**.  
- Não é a ficha da [estrada](${estrada}), do [automóvel](${automovel}), da [bateria](${bateria}) nem da [encruzilhada](${encruzilhada}): o pano **mostra-as**; não as substitui.  
- João 14:6 vive no [cruzamento](${cruzamento}) — *caminho*, não *estrada*, não *mappa*.

## Status

**Aprovado** — **mapa** fichado como **pano do mundo** (lat. *mappa*); [relação](${relacao}) com **[mão](${mao})** (*manus*) por cola *MA-* (*MApa* / *Maão*), pano na palma e locução *mapa na mão*; o pano **desenha** a viagem ([estrada](${estrada}) × [automóvel](${automovel}) × [bateria](${bateria}) × [encruzilhada](${encruzilhada}) × [Jesus Cristo](${cruzamento})) **sem** fundir étimos. Sem afiliação.

[▶ Palavras](${hub}) · [▶ Mão](${mao}) · [▶ Estrada](${estrada}) · [▶ Caminho](${caminho}) · [▶ Relação](${relacao}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **[mapa](${self})** — Lat. *mappa* “cloth / napkin”: the **fabric** on which the world is drawn, then the **drawing of territory**, the **scheme**, the **plan**. Field request: *MApa · relation with Maão* ([mão](${mao}), Lat. *manus*). The ear and the eye glue **MA-**. The [etymon](${etimo}) **cuts**. Craft [relação](${relacao}): the cloth of the world fits in the palm. Close: [Valeu !!!](${mantra}).

> Independent audit. [mapa](${WIKT_MAPA}), Lat. [*mappa*](${WIKT_MAPPA}), [mão](${WIKT_MAO}), Lat. [*manus*](${WIKT_MANUS}), [*mappa mundi*](${WIKI_MAPPA_MUNDI}). Not an atlas. Not GPS. Not palmistry.

## Object

| Field | Value |
|-------|-------|
| Word | **mapa** (map) |
| Etymon | Lat. *mappa* “cloth, napkin” — high; Punic path (Quintilian) — medium |
| Crossing | **[mão](${mao})** — Lat. *manus*; shared **MA-**; **not** the same ancestor |
| Field trigger | *MApa* × *Maão* |
| Not | GPS · full atlas · palmistry · *cartografia* as the same etymon (Gk. *chártēs*) |
| Path link | [caminho](${caminho}) is the route; *mapa* is the **drawing** of the route |
| Journey on the cloth | [estrada](${estrada}) · [automóvel](${automovel}) · [bateria](${bateria}) · [encruzilhada](${encruzilhada}) · [Jesus Christ](${cruzamento}) — *mappa* ≠ *strata* |

**H1:** *mapa* and *mão* do **not** share an etymon.  
**H2:** the requested [relação](${relacao}) is ear/eye glue + cloth in the palm + *mapa na mão* (to have the route) + tracing.  
**H3:** *mappa mundi* = the world on cloth — cloth a [hand](${mao}) can hold.  
**H4:** *mapear* (to map) is a verbal variation **on this sheet**.  
**H5:** the cloth **draws** the journey; it is not the [road](${estrada}).

## Relation with mão

| Layer | What it **is** | What it is **not** |
|-------|----------------|--------------------|
| Ear / eye | Shared **MA-** (*MApa* / *Maão*) | Proof of kinship |
| Cloth | *mappa* was fabric the [hand](${mao}) holds | Cloth ≠ palm |
| Craft | The palm traces; the map returns the route | GPS does not erase the gesture |
| Phrase | *mapa na mão* = orientation | Title to the land |
| Palm lines | The hand can be read as a drawing of lines | Fortune-telling |

## Status

**Approved** — **mapa** as cloth of the world (*mappa*); **[mão](${mao})** as palm (*manus*); the cloth draws the journey without fusing etymons.

[▶ Words](${hub}) · [▶ Hand](${mao}) · [▶ Estrada](${estrada}) · [▶ Path](${caminho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Portugués **[mapa](${self})** — lat. *mappa* «paño / servilleta»: el **tejido** donde se dibuja el mundo, luego el **dibujo del territorio**, el **esquema**, el **plan**. Pedido de campo: *MApa · relación con Maão* ([mão](${mao}), lat. *manus*). El oído y el ojo pegan el **MA-**. El [étimo](${etimo}) **corta**. [Relación](${relacao}) de oficio: el paño del mundo cabe en la palma. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [mapa](${WIKT_MAPA}), lat. [*mappa*](${WIKT_MAPPA}), [mão](${WIKT_MAO}), lat. [*manus*](${WIKT_MANUS}), [*mappa mundi*](${WIKI_MAPPA_MUNDI}). No es atlas. No es GPS. No es quiromancia.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **mapa** |
| Étimo | lat. *mappa* «paño, servilleta» — alta; vía púnica (Quintiliano) — media |
| Cruce | **[mão](${mao})** — lat. *manus*; **MA-** compartido; **no** el mismo abuelo |
| Gatillo | *MApa* × *Maão* |
| No es | GPS · atlas completo · quiromancia · *cartografia* como el mismo étimo (gr. *chártēs*) |
| Vínculo | [caminho](${caminho}) es la ruta; *mapa* es el **dibujo** de la ruta |
| Viaje en el paño | [estrada](${estrada}) · [automóvel](${automovel}) · [bateria](${bateria}) · [encruzilhada](${encruzilhada}) · [Jesucristo](${cruzamento}) — *mappa* ≠ *strata* |

**H1:** *mapa* y *mão* **no** comparten étimo.  
**H2:** la [relación](${relacao}) pedida es cola de oído/ojo + paño en la palma + *mapa na mão* + trazar.  
**H3:** *mappa mundi* = el mundo en el paño — paño que una [mano](${mao}) sujeta.  
**H4:** *mapear* es variación verbal **en esta ficha**.  
**H5:** el paño **dibuja** el viaje; no es la [estrada](${estrada}).

## Relación con mão

| Capa | Lo que **es** | Lo que **no** es |
|------|---------------|------------------|
| Oído / ojo | **MA-** compartido (*MApa* / *Maão*) | Prueba de parentesco |
| Paño | *mappa* era tejido que la [mano](${mao}) sujeta | Paño ≠ palma |
| Oficio | La palma traza; el mapa devuelve la ruta | El GPS no borra el gesto |
| Locución | *mapa na mão* = orientación | Título de tierra |
| Líneas | La mano también se lee como dibujo | Quiromancia |

## Estado

**Aprobada** — **mapa** como paño del mundo (*mappa*); **[mão](${mao})** como palma (*manus*); el paño dibuja el viaje sin fusionar étimos.

[▶ Palabras](${hub}) · [▶ Mano](${mao}) · [▶ Estrada](${estrada}) · [▶ Camino](${caminho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT_MAPA };
}

function buildMapaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMapaBodies();
  const order = Number.isFinite(seriesOrder)
    ? seriesOrder
    : pickOrder('inspecao-palavra-mapa', 200);
  return makePalavra({
    title: 'Inspeção: Mapa — o pano do mundo (relação com mão)',
    titleEn: 'Inspection: Mapa — the cloth of the world (relation with mão)',
    titleEs: 'Inspección: Mapa — el paño del mundo (relación con mão)',
    excerpt:
      'Palavras: mapa (lat. mappa «pano») × mão (lat. manus); o pano desenha estrada, automóvel, bateria e encruzilhada; ≠ strata ≠ cartografia; Valeu !!!',
    excerptEn:
      'Words: mapa (Lat. mappa “cloth”) × mão (Lat. manus); the cloth draws road, car, battery and crossroads; ≠ strata ≠ cartography; Valeu !!!',
    excerptEs:
      'Palabras: mapa (lat. mappa «paño») × mão (lat. manus); el paño dibuja estrada, auto, batería y encrucijada; ≠ strata ≠ cartografía; ¡Valeu !!!',
    slug: 'inspecao-palavra-mapa',
    date: '2026-08-24T13:05:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mapa · mappa × manus',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMapaPost,
  buildMapaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_MAPA,
  WIKT_MAPPA,
  WIKT_MAO,
  WIKT_MANUS,
  WIKI_MAPA,
  WIKI_MAPPA_MUNDI
};
