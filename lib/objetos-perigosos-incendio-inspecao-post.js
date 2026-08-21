'use strict';

/**
 * Palavras · objectos perigosos para controle de incêndio
 * Mapa do cluster: perigo × corte × marcas (Mars Hydro / Vivosun).
 * Ficha ≠ manual de bombeiros.
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');
const {
  LINKS: L,
  DATE,
  DATE_ISO,
  pickPalavrasOrder
} = require('./incendio-objetos-shared.js');

const COVER = '/imagens/inspecoes/objetos-perigosos-incendio-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Inc%C3%AAndio';

function buildBodies() {
  const body = `## Escopo

Inspeção editorial do composto **[objectos perigosos para controle de incêndio](${L.cluster})** — o **mapa** do laboratório indoor: o que **pode acender**, o que **corta / avisa / apaga**, e as **marcas** que só nomeiam o SKU. Pedido de campo: *marshydrobr* · *vivosun* · *origem da palavra* · *objectos perigosos para controle de incêndio* · *para todos os objectos relacionados*. Esta ficha **não** substitui o corpo de bombeiros. Cobre o **léxico**, o **catálogo de coisas** e o **ofício de não misturar** marca com certificado de segurança. Elos: [fogo](${L.fogo}), [incêndio](${L.incendio}), [risco](${L.risco}), [Mars Hydro](${L.marsPalavra}), [Vivosun](${L.vivosunPalavra}), [Faça o melhor!](${L.mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Incêndio](${WIKI}), [Wikcionário · fogo](https://pt.wiktionary.org/wiki/fogo), [NFPA — grow operations (EN)](https://www.nfpa.org/), série [Palavras](${L.hub}), catálogo [Objetos](${L.objetos}). **Ficha ≠ NR-23, ≠ projecto de SPCI, ≠ treino de combate, ≠ bula de extintor.** Marca ≠ inspeção eléctrica. Sem afiliação comercial com Mars Hydro, Vivosun ou revendedores.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **objectos perigosos para controle de incêndio** |
| Peças | **[objectos](${L.objetosPalavra})** · **perigosos** ([risco](${L.risco})) · **controle** · **[incêndio](${L.incendio})** (≠ [fogo](${L.fogo}) elemento) |
| Tipo lab | Mapa — perigo × corte × nome de marca |
| Não é | Manual de evacuação · ranking «LED mais seguro» · endosso de SKU |
| Data | ${DATE} |

**O que é o objecto:** o **sintagma** que junta três ofícios. *Objectos* = o que fica diante. *Perigosos* = podem iniciar ou alimentar um [incêndio](${L.incendio}). *Para controle* = o outro conjunto: o que **avisa, corta ou apaga**. No indoor BR, as marcas [Mars Hydro](${L.marsPalavra}) (*marshydrobr*) e [Vivosun](${L.vivosunPalavra}) entram como **nomes em cima de objectos eléctricos dentro de uma [tenda](${L.tenda})** — não como selo de segurança.

## 2. Duas colunas (não misturar)

| Coluna | Leitura | Exemplos no lab |
|--------|---------|-----------------|
| **Perigo** (pode acender / alimentar) | Carga eléctrica, calor, combustível, chama de bolso | [fonte](${L.fonte}) / driver · [extensão](${L.extensao}) · [lâmpada](${L.lampada}) / painel LED · [tenda](${L.tenda}) (tecido + recinto) · [exaustor](${L.exaustor}) (motor) · [isqueiro](${L.isqueiro}) · lastro HID legado |
| **Controle** (avisa / corta / apaga) | Dispositivo e gesto de limite | [interruptor](${L.interruptor}) · [ligar / desligar](${L.ligar}) · disjuntor · detector de fumo · [extintor](${L.extintor}) · [água](${L.agua}) **não** no quadro eléctrico |
| **Nome** (marca) | Palavra em cima do SKU | [Mars Hydro](${L.marsPalavra}) · [Vivosun](${L.vivosunPalavra}) — o [risco](${L.risco}) **não** muda com o logótipo |

**H1:** *controle de incêndio* não é o mesmo que *objecto perigoso* — um [extintor](${L.extintor}) controla; uma [fonte](${L.fonte}) escondida atrás do painel pode *ser* o perigo.  
**H2:** [fogo](${L.fogo}) (lat. *focus*, elemento) ≠ [incêndio](${L.incendio}) (lat. *incendium*, evento descontrolado).  
**H3:** *marshydrobr* e *Vivosun* são **origens de palavra / vitrines**; o circuito é o objecto a inspecionar.

## 3. Origem das peças do composto

| Peça | Étimo (trabalho) | Confiança |
|------|------------------|-----------|
| **objecto** | Lat. *objectum* «o que é lançado diante» — ver [objectos](${L.objetosPalavra}) | Alta |
| **perigoso** | *perigo* ← lat. *periculum* | Alta |
| **controle** | Fr. *contrôle* ← *contre-rôle* (registo contra) | Alta |
| **incêndio** | Lat. *incendium* ← *incendere* «atear» — ficha [incêndio](${L.incendio}) | Alta |
| **Mars Hydro** | *Mars* (planeta / deus) + gr. *hýdōr* «água» + rasto *marshydrobr* | Alta (peças) / média (mito da marca) |
| **Vivosun** | Lat./PT *vivo* + EN *sun* = «sol vivo» | Alta (leitura lexical) / média (story oficial) |

## 4. Todos os objectos relacionados (catálogo lab)

### 4.1 Marcas (nome ≠ certificado)

| Objecto | Origem da palavra (âncora) | Verificação de catálogo |
|---------|----------------------------|-------------------------|
| **Mars Hydro** / *marshydrobr* | [Mars Hydro](${L.marsPalavra}) | [Equipamentos Mars Hydro Brasil](${L.marsEquip}) |
| **Vivosun** | [Vivosun](${L.vivosunPalavra}) | [Equipamentos Vivosun](${L.vivosunEquip}) |

### 4.2 Recinto e ar (o que fecha o calor)

| Objecto | Papel no cluster | Ficha |
|---------|------------------|-------|
| **[tenda](${L.tenda})** | Recinto Oxford / Mylar — concentra [luz](${L.luz}), calor e odor | Palavra |
| **[exaustor](${L.exaustor})** | Motor inline — ar, pó, rolamento, cabo | Palavra |
| **Ventilação da tenda** | Medição de fluxo / ruído / ΔT no lab | [Verificação](${L.ventilacao}) |
| Filtro de carvão / duto | Combustível + restrição de fluxo (não ficha própria — mapa aqui) | Elo [exaustor](${L.exaustor}) |

### 4.3 Luz e electricidade (o «sol» na caixa)

| Objecto | Papel no cluster | Ficha |
|---------|------------------|-------|
| **[lâmpada](${L.lampada})** / painel LED | Vaso de [luz](${L.luz}) — calor no dissipador e no driver | Palavra |
| **[luz](${L.luz})** / **[sol](${L.sol})** | Radiação e metáfora — Vivosun cola *sun* | Palavras |
| **[fonte](${L.fonte})** (driver) | Fonte de alimentação — objecto perigoso **escondido** | Palavra |
| **[extensão](${L.extensao})** / benjamim | Sobrecarga do circuito da casa | Palavra |
| **[interruptor](${L.interruptor})** / **[ligar-desligar](${L.ligar})** | Corte — objecto de **controle** | Palavras |
| Lastro HID / HPS legado | Calor histórico do indoor; Vivosun começou em HPS (2009) | Mapa (sem ficha SKU) |

### 4.4 Elemento, evento, corte, cinza

| Objecto | Papel no cluster | Ficha |
|---------|------------------|-------|
| **[fogo](${L.fogo})** | Elemento (*focus*) | Palavra |
| **[incêndio](${L.incendio})** | Evento descontrolado | Palavra |
| **[risco](${L.risco})** | Perigo calculado | Palavra |
| **[extintor](${L.extintor})** | Objecto de controle | Palavra |
| Detector de fumo | Aviso — mapa aqui (sem ficha própria) | Elo [risco](${L.risco}) |
| **[isqueiro BIC](${L.isqueiro})** | Chama de bolso — perigo **portátil** | Palavra |
| **[cinzeiro](${L.cinzeiro})** | Recebe cinza; não apaga o quadro | Palavra |
| **[água](${L.agua})** / **[mar](${L.mar})** | Par do [fogo](${L.fogo}); étimo *Hydro* / planeta *Mars* | Palavras |

**Tese:** inspecionar *todos os relacionados* = **não** fazer dez reviews de SKU. É **nomear cada coisa** e pô-la na coluna certa (perigo × controle × nome).

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| Kit «completo» | «Comprei Mars / Vivosun, está seguro» | Conjunto de [objectos](${L.objetosPalavra}) eléctricos num recinto — o [risco](${L.risco}) é do **circuito** |
| LED «frio» | LED não queima | Dissipador + [fonte](${L.fonte}) aquecem; tenda fecha o calor |
| *Hydro* / *vivo* / *sun* | A água e o sol protegem | Nomes. [Água](${L.agua}) no quadro **piora**. [Sol](${L.sol}) na [tenda](${L.tenda}) é watts |
| Extintor na foto | «Já tenho controle» | [Extintor](${L.extintor}) sem classe certa / sem acesso = adereço |
| Esta ficha | Curso de bombeiro | Mapa lexical e de ofício |

**Veredicto contraste:** o que parece = kit de marca; o que é = **rede de objectos** com calor, cabo e recinto.

## 6. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «A tenda é à prova de fogo» | Tecido retarda ou **não**; o recinto **concentra** calor — ver [tenda](${L.tenda}) |
| «É LED, não esquenta» | Medir; o driver ([fonte](${L.fonte})) é o ponto cego |
| «A extensão aguenta» | [Extensão](${L.extensao}) ≠ circuito dimensionado |
| «Mars Hydro / Vivosun é profissional, logo seguro» | Marca ≠ laudo; ver palavras e [verificações](${L.marsEquip}) |
| «Controle de incêndio = ter um isqueiro longe» | [Isqueiro](${L.isqueiro}) é perigo portátil; controle = corte + aviso + [extintor](${L.extintor}) |
| «Faça diferente» (vazio) | [Faça o melhor!](${L.mantra}) **neste** circuito, hoje |

### Ofício correcto (mapa curto)

1. Nomear o [objecto](${L.objetosPalavra}): painel, [fonte](${L.fonte}), cabo, [tenda](${L.tenda}), [exaustor](${L.exaustor}).  
2. Pôr na coluna **perigo** ou **controle** — a marca fica na coluna **nome**.  
3. [Interruptor](${L.interruptor}) acessível; não empilhar [extensões](${L.extensao}).  
4. Cruzar PPFD / watts com [Luxímetro](${L.lux}) e [Watts/m²](${L.watts}) — dose de [luz](${L.luz}), não labareda.  
5. Fechar com [Faça o melhor!](${L.mantra}).

**Veredicto correção:** **marca ≠ controle de incêndio.** No lab, a palavra vale quando aponta a **coisa** e o **gesto de corte**.

## 7. Rede · Faça o melhor!

| Recurso | Papel |
|---------|-------|
| [Mars Hydro (palavra)](${L.marsPalavra}) · [catálogo BR](${L.marsEquip}) | *Mars* + *Hydro* + *marshydrobr* |
| [Vivosun (palavra)](${L.vivosunPalavra}) · [catálogo](${L.vivosunEquip}) | *vivo* + *sun* |
| [Tenda](${L.tenda}) · [exaustor](${L.exaustor}) · [ventilação](${L.ventilacao}) | Recinto e ar |
| [Fonte](${L.fonte}) · [extensão](${L.extensao}) · [interruptor](${L.interruptor}) | Circuito |
| [Fogo](${L.fogo}) · [incêndio](${L.incendio}) · [extintor](${L.extintor}) · [risco](${L.risco}) | Elemento × evento × corte |
| [Lâmpada](${L.lampada}) · [luz](${L.luz}) · [sol](${L.sol}) | O «sol» na caixa |
| [Xiaomi](${L.xiaomi}) | Mesmo método: marca × objecto × anti-pedestal |
| [Faça o melhor!](${L.mantra}) · [poema](${L.poemMantra}) | Fecho sem culto de kit |

**Veredicto:** Faça o melhor **sem o culto da marca e sem o teatro do extintor** — inspecionar o cabo, a [fonte](${L.fonte}), a [tenda](${L.tenda}) e o gesto de [desligar](${L.ligar}).

## Hipóteses (síntese)

**H1:** o composto nomeia um **mapa**, não um SKU.  
**H2:** perigo × controle × nome são três colunas.  
**H3:** Mars Hydro e Vivosun entram pela **origem da palavra** e pela **verificação** — o [incêndio](${L.incendio}) não lê logótipos.  
**H4:** fecho [Faça o melhor!](${L.mantra}); ficha ≠ NR-23.

## Limites

- Não ensina a combater incêndio nem a escolher classe de [extintor](${L.extintor}) para o teu município.  
- Não ranqueia Mars Hydro contra Vivosun em segurança.  
- Preços, SKUs e normas mudam — confirmar no sítio oficial e no electricista da casa.  
- Detector de fumo e lastro HID ficam no mapa **sem** ficha própria nesta leva.

## Status

**Aprovado** — mapa **objectos perigosos para controle de incêndio**: colunas perigo × corte × nome; origens [Mars Hydro](${L.marsPalavra}) e [Vivosun](${L.vivosunPalavra}); todos os relacionados fichados ou elos; fecho [Faça o melhor!](${L.mantra}).

[▶ Palavras](${L.hub}) · [▶ Mars Hydro](${L.marsPalavra}) · [▶ Vivosun](${L.vivosunPalavra}) · [▶ Incêndio](${L.incendio}) · [▶ Extintor](${L.extintor}) · [▶ Objetos](${L.objetos}) · [▶ Faça o melhor!](${L.mantra})
`;

  const contentEn = `## Scope

Editorial map of **dangerous objects for fire control** in the indoor lab — what can ignite, what cuts / warns / extinguishes, and brand names that only label SKUs. Field request: Mars Hydro BR, Vivosun, word origins, all related objects. **Not a fire-department manual.** Links: [fogo](${L.fogo}), [incêndio](${L.incendio}), [Mars Hydro](${L.marsPalavra}), [Vivosun](${L.vivosunPalavra}), [Do your best!](${L.mantra}).

> Sources: [Fire (event)](${WIKI}). **Not NR-23, not an extinguisher tutorial, not a brand ranking.** Logo ≠ electrical inspection.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **objectos perigosos para controle de incêndio** |
| Columns | Hazard × control × brand name |
| Date | ${DATE} |

## 2. Seems vs is

**Seems:** “I bought Mars / Vivosun, so it’s safe.”  
**Is:** electrical [objects](${L.objetosPalavra}) inside a [tent](${L.tenda}); [risk](${L.risco}) lives in the **circuit** ([fonte](${L.fonte}), [extensão](${L.extensao})), not the logo.

## 3. Related objects

Brands: [Mars Hydro](${L.marsPalavra}) · [Vivosun](${L.vivosunPalavra}). Enclosure: [tenda](${L.tenda}) · [exaustor](${L.exaustor}). Circuit: [fonte](${L.fonte}) · [extensão](${L.extensao}) · [interruptor](${L.interruptor}). Element: [fogo](${L.fogo}) · [incêndio](${L.incendio}) · [extintor](${L.extintor}). Light: [lâmpada](${L.lampada}) · [sol](${L.sol}).

## 4. BudGanja correction

**Brand ≠ fire control.** Name the thing, put it in the right column, keep the [switch](${L.interruptor}) reachable. Close with [Do your best!](${L.mantra}).

## Status

**Approved** — cluster map; word origins; related objects; [Do your best!](${L.mantra}).

[▶ Words](${L.hub}) · [▶ Mars Hydro](${L.marsPalavra}) · [▶ Vivosun](${L.vivosunPalavra}) · [▶ Do your best!](${L.mantra})
`;

  const contentEs = `## Alcance

Mapa editorial de **objetos peligrosos para control de incendio** en el lab indoor — lo que puede encender, lo que corta / avisa / apaga, y las marcas que solo nombran el SKU. Pedido: Mars Hydro BR, Vivosun, origen de la palabra, todos los objetos relacionados. **No es manual de bomberos.** Vínculos: [fogo](${L.fogo}), [incêndio](${L.incendio}), [Mars Hydro](${L.marsPalavra}), [Vivosun](${L.vivosunPalavra}), [¡Haz lo mejor!](${L.mantra}).

> Fuentes: [Incendio](${WIKI}). **No es NR-23 ni ranking de marcas.** El logo no inspecciona el circuito.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **objectos perigosos para controle de incêndio** |
| Columnas | Peligro × control × nombre de marca |
| Fecha | ${DATE} |

## 2. Parece × es

**Parece:** «compré Mars / Vivosun, está seguro».  
**Es:** [objetos](${L.objetosPalavra}) eléctricos dentro de una [tenda](${L.tenda}); el [riesgo](${L.risco}) está en el **circuito**.

## 3. Objetos relacionados

Marcas: [Mars Hydro](${L.marsPalavra}) · [Vivosun](${L.vivosunPalavra}). Recinto: [tenda](${L.tenda}) · [exaustor](${L.exaustor}). Circuito: [fonte](${L.fonte}) · [extensão](${L.extensao}) · [interruptor](${L.interruptor}). Elemento: [fogo](${L.fogo}) · [incêndio](${L.incendio}) · [extintor](${L.extintor}).

## 4. Corrección BudGanja

**Marca ≠ control de incendio.** Nombrar la cosa, ponerla en la columna cierta. Cerrar con [¡Haz lo mejor!](${L.mantra}).

## Estado

**Aprobado** — mapa del clúster; orígenes; objetos relacionados; [¡Haz lo mejor!](${L.mantra}).

[▶ Palabras](${L.hub}) · [▶ Mars Hydro](${L.marsPalavra}) · [▶ Vivosun](${L.vivosunPalavra}) · [▶ ¡Haz lo mejor!](${L.mantra})
`;

  return { body, contentEn, contentEs };
}

function buildObjetosPerigososIncendioPost() {
  const { body, contentEn, contentEs } = buildBodies();
  const seriesOrder = pickPalavrasOrder(
    'inspecao-palavra-objetos-perigosos-incendio',
    156
  );
  return makePalavra({
    title:
      'Inspeção: Objectos perigosos para controle de incêndio — mapa da tenda',
    titleEn:
      'Inspection: Dangerous objects for fire control — the tent map',
    titleEs:
      'Inspección: Objetos peligrosos para control de incendio — el mapa de la carpa',
    excerpt:
      'Palavras: mapa perigo × corte × marca — Mars Hydro / Vivosun e todos os objectos da tenda; ≠ manual de bombeiros; Faça o melhor!',
    excerptEn:
      'Words: hazard × cut × brand map — Mars Hydro / Vivosun and every tent object; not a fire-crew manual; Do your best!',
    excerptEs:
      'Palabras: mapa peligro × corte × marca — Mars Hydro / Vivosun y todos los objetos de la carpa; no es manual de bomberos; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-objetos-perigosos-incendio',
    date: DATE_ISO,
    seriesOrder,
    seriesLabel: 'Incêndio · mapa · palavra',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildObjetosPerigososIncendioPost
};
