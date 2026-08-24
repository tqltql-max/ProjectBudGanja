'use strict';

/**
 * Inspeção Expressões · missão comprida
 * Eixos: locução viva BR (trocadilho) · canónica missão cumprida ·
 * cumprir (complēre) × comprido (mesmo particípio antigo, sala do comprimento) ·
 * missão (missiō / mittere) ≠ metro ≠ visto militar ·
 * irmãos comprimento / cumprimento.
 * Pedido: inspeção da expressão missão comprida.
 */

const fs = require('fs');
const path = require('path');
const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/missao-comprida-cover.jpg';
const WIKT_CUMPRIR = 'https://pt.wiktionary.org/wiki/cumprir';
const WIKT_COMPRIDO = 'https://pt.wiktionary.org/wiki/comprido';
const WIKT_CUMPRIDO = 'https://pt.wiktionary.org/wiki/cumprido';
const WIKT_MISSAO = 'https://pt.wiktionary.org/wiki/miss%C3%A3o';
const WIKT_COMPLEO = 'https://en.wiktionary.org/wiki/compleo#Latin';
const WIKT_MISSIO = 'https://en.wiktionary.org/wiki/missio#Latin';
const WIKT_MITTO = 'https://en.wiktionary.org/wiki/mitto#Latin';
const WIKT_COMPRIMENTO = 'https://pt.wiktionary.org/wiki/comprimento';
const WIKT_CUMPRIMENTO = 'https://pt.wiktionary.org/wiki/cumprimento';
const WIKT_MISSION_ACC = 'https://en.wiktionary.org/wiki/mission_accomplished';
const WIKI_POP = 'https://pt.wikipedia.org/wiki/Etimologia_popular';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'expressoes-ditados')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start) + (orders.length ? 1 : 0);
    if (!orders.length) seriesOrder = start;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Missão comprida.
A orelha troca o u pelo o.
A boca ri.
O étimo não ri tanto:
os dois vêm da mesma ânfora.

complēre — encher até ao bordo.
O particípio antigo ficou comprido:
completo no comprimento.
O verbo moderno ficou cumprir:
encher o dever.

Missão é o envio.
Não é o metro.
Não é o visto.

A cola diz: foi longa.
A norma diz: foi feita.
O laboratório diz: as duas salas.
O u e o o são primos.
Não são o mesmo ofício.

Valeu !!!
cumprir o que cabe
sem fingir que o caminho curto
é o único cumprimento.`;
}

function poemEn() {
  return `Long mission.
The ear swaps u for o.
The mouth laughs.
The etymon does not laugh as much:
both come from the same jar.

complēre — fill to the brim.
The old participle stayed comprido:
complete in length.
The modern verb became cumprir:
to fill the duty.

Mission is the sending.
It is not the metre.
It is not the stamp.

The glue says: it was long.
The norm says: it was done.
The lab says: two rooms.
The u and the o are cousins.
They are not the same office.

Valeu !!!
fulfill what fits
without pretending the short path
is the only greeting.`;
}

function poemEs() {
  return `Misión larga.
El oído cambia la u por la o.
La boca ríe.
El étimo no ríe tanto:
los dos vienen de la misma ánfora.

complēre — llenar hasta el borde.
El participio antiguo quedó comprido:
completo en la longitud.
El verbo moderno quedó cumprir:
llenar el deber.

Misión es el envío.
No es el metro.
No es el sello.

La cola dice: fue larga.
La norma dice: fue hecha.
El laboratorio dice: dos salas.
La u y la o son primas.
No son el mismo oficio.

¡Valeu !!!
cumplir lo que cabe
sin fingir que el camino corto
es el único cumplimiento.`;
}

function buildMissaoCompridaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-missao-comprida.html';
  const orelha = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const trocadilho = '/posts/post-inspecao-palavra-trocadilho.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const deuCerto = '/posts/post-inspecao-expressao-deu-certo-galera.html';
  const fimLinha = '/posts/post-inspecao-expressao-fim-da-linha.html';
  const meter = '/posts/post-inspecao-expressao-meter-marcha.html';
  const missClick = '/posts/post-inspecao-expressao-miss-click.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[missão comprida](${self})»** — o [trocadilho](${trocadilho}) BR que troca o **u** de *cumprida* pelo **o** de *comprida*. Pedido de campo: *inspeção da expressão missão comprida*.

Duas salas, um sopro. A [orelha cola](${orelha}): **missão** + **comprida** (longa). A norma da locução é **missão cumprida** (feita, executada). O étimo **não funde** as salas — e, no mesmo gesto, **reconhece o parentesco**: *cumprido* e *comprido* nascem da mesma ânfora latina. Objecto = a **locução viva**. Não é briefing militar. Não é aula de metro. Não é o visto «Mission Accomplished» como âncora.

> **Nota metodológica:** auditoria independente. Fontes: [cumprir](${WIKT_CUMPRIR}), [comprido](${WIKT_COMPRIDO}), [cumprido](${WIKT_CUMPRIDO}), [missão](${WIKT_MISSAO}), [compleō](${WIKT_COMPLEO}), [missiō](${WIKT_MISSIO}), [mittō](${WIKT_MITTO}), [comprimento](${WIKT_COMPRIMENTO}), [cumprimento](${WIKT_CUMPRIMENTO}), [mission accomplished](${WIKT_MISSION_ACC}), [etimologia popular](${WIKI_POP}). Método: [etimologia](${etimologia}) — étimo × cola. **Ficha ≠ doutrina de dever, ≠ cronómetro, ≠ bandeira de palco.** Série [Expressões](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *missão comprida* / *missão cumprida* / *missão cumprida!* / *foi longa, mas cumprida*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **missão comprida** (trocadilho / boca do pátio) |
| Forma canónica | **missão cumprida** (particípio de *cumprir*) |
| Formas irmãs | *missão cumprida!* · *dever cumprido* · *foi comprida* (duração) |
| Classe | Locução PT de fecho + [trocadilho](${trocadilho}) por parónimos *cumprida* / *comprida* |
| Étimo (trabalho) | *missão* ← lat. *missiō* (*mittō* «enviar») + *cumprida* ← *cumprir* ← lat. *complēre* — confiança: **alta** |
| Cola | *comprida* = «longa» — a [orelha](${orelha}) troca **u** por **o** |
| Parentesco profundo | *comprido* é o particípio antigo de *comprir* (o mesmo *complēre*) que ficou na sala do comprimento |
| Tipo BudGanja | Expressão — fecho de [ação](${acao}) × duração no [caminho](${caminho}) × cola da orelha |
| Não é | Bandeira de palco · tutorial de régua · cumprimento (saudação) como origem da locução |
| Data | ${inspected} |
| Fonte | [cumprir](${WIKT_CUMPRIR}) · [comprido](${WIKT_COMPRIDO}) |

**O que é o objecto:** o nome do **feito que a boca alonga**. No lab: a locução canónica *missão cumprida* e a forma viva *missão comprida*. A mnemónica **foi longa** é ofício da [orelha](${orelha}); a genealogia do **u** e do **o** é ofício da [etimologia](${etimologia}).

## 2. Três linhagens — o u e o o não são o mesmo ofício

Pedido de campo: a expressão **missão comprida**. O lab **não funde**. Três famílias; só uma faz a locução canónica; a âncora de campo é a cola.

| Linhagem | Peça | Origem | Ofício nesta ficha |
|----------|------|--------|---------------------|
| **Canónica** | *missão cumprida* | *cumprir* ← lat. *complēre* «encher / completar» | **A [ação](${acao}) foi executada** — esta é a locução de fecho |
| **Cola / âncora** | *missão comprida* | *comprido* «longo» ← particípio arcaico de *comprir* | [Trocadilho](${trocadilho}): a boca mede o [caminho](${caminho}) |
| **Envio** | *missão* | lat. *missiō* ← *mittō* «enviar» | O encargo que foi **enviado** — outra árvore |
| **Irmãos gráficos** | *comprimento* / *cumprimento* | o mesmo corte **o** × **u** | Metro × saudação / acto de cumprir |

**H-linhagem:** *cumprir* e *comprido* são **primos**, não sinónimos. O português arcaico *comprir* (lat. vulg. *complīre* ← *complēre*) deu o verbo moderno **cumprir** (o átono passou a **u**) e deixou o adjectivo **comprido** na grafia antiga: «enchido por completo» → «extenso / longo». A [etimologia popular](${etimologia}) da cola *missão comprida* acerta o **parentesco** e erra o **ofício** se o toma por origem da locução.  
**H-letras:** o teste não é «soa quase igual». O teste é a **família**: dever preenchido × extensão medida.

## 3. *cumprir* — encher o dever

O [Wiktionary · cumprir](${WIKT_CUMPRIR}) fecha o étimo: latim *complēre* ([compleō](${WIKT_COMPLEO})) — *com-* («de todo») + *plēre* («encher»). Encher até ao bordo. Depois: executar, realizar, preencher o prazo, caber («cumpre dizer»).

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **complēre** | Lat. «encher por completo» | Alta |
| **complīre** (vulg.) | Via românica — PT arcaico *comprir* | Alta |
| **cumprir** | o átono → **u**; ofício: executar / preencher | Alta |
| **cumprido / cumprida** | Particípio moderno — «feito» | Alta |
| **missão cumprida** | Locução de fecho: o envio foi **executado** | Alta (uso vivo) |

Registo de pátio e de ofício: *missão cumprida* fecha a [ação](${acao}). Irmã de tom: [deu certo, galera](${deuCerto}). Não é o mesmo que [fim da linha](${fimLinha}) — o fim pode chegar **sem** o dever enchido.

**H-encher:** cumprir não é «acabar por cansaço». É **preencher** o que foi enviado. O [tempo](${tempo}) pode ser curto. A locução não mede metros.

## 4. *comprido* — o particípio que ficou longo

[Comprido](${WIKT_COMPRIDO}) não é um adjectivo órfão. É o **particípio antigo** de *comprir*: «enchido inteiramente; completado» → «completo na extensão» → **longo / alto**. A grafia com **o** ficou para o comprimento; a grafia com **u** ficou para o verbo de dever. O parónimo é histórico, não acaso de teclado.

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Extensão no espaço** | caminho comprido; cabelo comprido | Alta |
| **Extensão no tempo** | conversa comprida; espera comprida | Alta |
| **Estatura** | pessoa comprida | Alta (uso) |
| **Missão comprida** | a [ação](${acao}) **durou** | Cola desta ficha |
| **Língua comprida** | mexerico | **Corte** — outra locução |

**H-comprido:** a cola *missão comprida* **acerta uma verdade possível** (foi longa) e **não substitui** a locução de fecho (*cumprida*). Duas frases, dois ofícios.  
**H-metro:** [comprimento](${WIKT_COMPRIMENTO}) é a sala da medida. Não gera a expressão de vitória.

## 5. *missão* — o envio, não o metro

[Missão](${WIKT_MISSAO}) vem do latim *missiō* ([missiō](${WIKT_MISSIO})) — o acto de **enviar**, de *mittō* ([mittō](${WIKT_MITTO})) «lançar / mandar». Encargo, recado, tarefa enviada. O inglês *mission accomplished* ([mission accomplished](${WIKT_MISSION_ACC})) é calco paralelo (lat. *accomplēre*, a mesma família de *encher*), não o étimo da boca BR.

| Teste | *missão* (étimo) | *comprida* (cola) | *cumprida* (canónica) |
|-------|------------------|-------------------|------------------------|
| **Família** | *mittō* «enviar» | *complēre* via *comprir* (extensão) | *complēre* via *cumprir* (dever) |
| **Ofício** | o encargo | a duração | o fecho |
| **Veredicto** | peça 1 da locução | [trocadilho](${trocadilho}) | origem da locução de pátio |

**H-envio:** sem [missão](${WIKT_MISSAO}) não há o que cumprir. Sem *cumprir* a missão fica só comprida — [caminho](${caminho}) sem fecho.  
**H-palco:** a faixa *Mission Accomplished* é **outra** sala (história política / mídia). A ficha não a usa como prova do étimo BR.

## 6. A cola da orelha — *comprida* ≠ origem da locução

A [etimologia popular](${WIKI_POP}) é um **mecanismo**, não um erro de quem ouve. A boca ouve *cumprida* e cola **comprida** porque um **u** e um **o** vizinhos pedem [trocadilho](${trocadilho}). O lab honra o instinto e **corta o ofício**.

| Teste | *cumprida* (canónica) | *comprida* (cola) |
|-------|----------------------|-------------------|
| **Família viva** | verbo *cumprir* | adjectivo *comprido* |
| **Ofício** | o dever foi enchido | o [caminho](${caminho}) foi longo |
| **Grafia** | **u** na primeira sílaba | **o** na primeira sílaba |
| **Pode ser verdade ao mesmo tempo?** | Sim — duas salas | Sim — se o [tempo](${tempo}) durou |
| **Veredicto** | origem da locução | [trocadilho](${trocadilho}) / cola da [orelha](${orelha}) |

**H-cola:** mesmo o «não é comprida» ainda pega o metro se vier na mesma frase. Cortar em duas frases: o fecho. Ponto. A duração. Ponto.  
**H-primos:** a cola é mais fina do que *Miss Click* ([irmã de ofício](${missClick})): ali a senhorita é **outra árvore**; aqui *comprido* e *cumprido* **são a mesma árvore partida**. A orelha recupera a grafia antiga. O lab agradece e **não** funde os ofícios.

## 7. Irmãos — comprimento × cumprimento

O mesmo corte **o** / **u** abre outra porta da casa.

| Forma | Ofício | Sala |
|-------|--------|------|
| **comprimento** | extensão medida | Metro / [caminho](${caminho}) |
| **cumprimento** | acto de cumprir; saudação | Dever / [gesto](${gesto}) de cortesia |
| **comprida** | longa | Cola desta ficha |
| **cumprida** | executada | Canónica desta ficha |

**H-saudação:** *cumprimento* («olá») **não** gerou *missão cumprida*. É o mesmo verbo em outra extensão (preencher a cortesia). Sala cortada como âncora.  
**H-relação:** [relação](${relacao}) entre as duas grafias é de **parentesco**, não de identidade.

## 8. Duas salas — mapa rápido

| Sala | Peça | Ofício |
|------|------|--------|
| **Canónica** | **missão cumprida** | O envio foi executado |
| **Âncora viva** | **missão comprida** | A boca mede a duração |
| **Étimo cumprir** | *complēre* | Encher / completar |
| **Étimo comprido** | o mesmo *complēre*, particípio antigo | Longo |
| **Missão** | *missiō* | Enviar |
| **Irmãos** | comprimento / cumprimento | Metro × saudação |
| **Arranque** | [meter marcha](${meter}) | Sair do ponto morto — **antes** |
| **Fecho coral** | [deu certo, galera](${deuCerto}) | Acerto partilhado |
| **Limite** | [fim da linha](${fimLinha}) | Acabar o percurso — pode ser sem dever enchido |
| **Irmã de cola** | [Miss Click](${missClick}) | Orelha cola; étimo corta |
| **Corte** | bandeira de palco · régua · mexerico (*língua comprida*) | Outras árvores / outros ofícios |

## 9. Derivação — a família à vista

| Forma | Papel | Sala |
|-------|-------|------|
| **missão** | Encargo enviado | Peça 1 |
| **cumprir** | Encher o dever | Peça 2 canónica |
| **cumprida** | Particípio — feita | Locução |
| **comprido / comprida** | Longo | Cola |
| **comprir** (arcaico) | Avô comum | História |
| **comprimento** | Extensão | Irmão **o** |
| **cumprimento** | Dever / saudação | Irmão **u** |
| **mission accomplished** | Calco EN | Paralelo, não étimo BR |
| **misión cumplida** | Paralelo ES | O trocadilho *comprida* **não** cola em espanhol (*larga*) |

**H-derivação:** o trocadilho é **português**. Em espanhol *misión cumplida* não abre a porta *comprida*. A cola mora nesta [língua](${lingua}).

## 10. Hipóteses

**H1:** *missão cumprida* = locução de fecho (*cumprir* ← *complēre*) — alta.  
**H2:** *missão comprida* é [trocadilho](${trocadilho}) / cola da [orelha](${orelha}) (parónimos *cumprida* / *comprida*) — alta.  
**H3:** *comprido* ← particípio arcaico de *comprir* (o mesmo *complēre*) com sentido de extensão — alta.  
**H4:** *missão* ← *missiō* / *mittō* «enviar» — árvore distinta — alta.  
**H5:** comprimento / cumprimento são o mesmo corte gráfico **o** × **u** — alta.  
**H6:** *cumprimento* (saudação) não é a origem da locução — alta.  
**H7:** a faixa *Mission Accomplished* é sala de palco, não prova do étimo BR.  
**H8:** o lab pode dizer as duas verdades: foi [comprida](${caminho}) e foi [cumprida](${acao}) — sem fundir as salas.  
**H9:** o lab nomeia com [verdade](${verdade}); não transforma a duração em desculpa nem o fecho em vanglória.

## 11. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | *comprida* = a forma certa de *cumprida* | Parónimos: duração × fecho |
| **O erro** | quem diz *comprida* errou o português | Trocadilho consciente (muitas bocas) ou lapso; o lab **nomeia**, não humilha |
| **O acaso** | u / o à sorte | Partição histórica do mesmo *complēre* |
| **Missão** | viagem longa | Encargo **enviado** |
| **Cumprimento** | a origem da frase | Irmão; saudação é outra sala |
| **Vitória** | a ficha é hino militar | Vocábulo de fecho — sala de palco cortada |

## 12. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear **missão cumprida** como fecho da [ação](${acao}) |
| Bom | Usar **missão comprida** como cola — e declarar que é [trocadilho](${trocadilho}), não norma |
| Bom | Separar *cumprir* (dever), *comprido* (extensão), *missão* (envio) |
| Bom | Dizer as duas verdades: foi longa **e** foi feita |
| Bom | [Respeito](${respeito}) a quem fez o [caminho](${caminho}) comprido |
| Mau | Corrigir o trocadilho como se fosse ignorância, sem ouvir o ofício |
| Mau | Fundir comprimento com cumprimento |
| Mau | Transformar o fecho em vanglória ou o comprimento em [risco](${risco}) de nunca fechar |

## 13. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=missao-comprida)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A orelha cola o que a boca juntou](${orelha}) | Ofício da cola *cumprida* → *comprida* |
| [Etimologia](${etimologia}) · [trocadilho](${trocadilho}) · [aglutinação](${aglutinacao}) | Étimo × popular × solda (aqui: parónimos, não solda nova) |
| [Caminho](${caminho}) · [ação](${acao}) · [tempo](${tempo}) · [gesto](${gesto}) | Duração, fecho, [gesto](${gesto}) de encerrar |
| [Miss Click](${missClick}) | Irmã: orelha cola, étimo corta (ali a senhorita é outra árvore) |
| [Meter marcha](${meter}) · [deu certo, galera](${deuCerto}) · [fim da linha](${fimLinha}) | Arranque · festa · limite |
| [Língua portuguesa](${lingua}) · [relação](${relacao}) | Solo do par **o** / **u** |
| [Verdade](${verdade}) · [respeito](${respeito}) · [risco](${risco}) | Ofício |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é briefing militar, faixa de palco nem tutorial de régua.  
- Não é ficha da saudação *cumprimento* nem de *língua comprida* (mexerico).  
- Não funde duração com fecho.  
- O poema é **criação do laboratório**.

## Status

**Aprovada na série Expressões** — **missão comprida** fichada como [trocadilho](${trocadilho}) sobre a locução **missão cumprida** (*cumprir* ← *complēre*); *comprido* é primo (particípio arcaico do mesmo étimo, sala do comprimento); *missão* ← *missiō* (envio). Salas cortadas (palco, régua, saudação como origem). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Trocadilho](${trocadilho}) · [▶ Etimologia](${etimologia}) · [▶ Orelha cola](${orelha}) · [▶ Caminho](${caminho}) · [▶ Miss Click](${missClick}) · [▶ Poema Vida](/vida/#poema=missao-comprida) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the expression **«[missão comprida](${self})»** — the Brazilian [pun](${trocadilho}) that swaps the **u** of *cumprida* for the **o** of *comprida*. Field request: inspect *missão comprida*.

Two rooms, one breath. The [ear glues](${orelha}): **mission** + **long**. The canonical locution is **missão cumprida** (fulfilled). The etymon **does not fuse** the rooms — and still **honours the kinship**: *cumprido* and *comprido* come from the same Latin jar. Object = the **living locution**. Not a military briefing. Not a measuring-tape class.

> Sources: [cumprir](${WIKT_CUMPRIR}), [comprido](${WIKT_COMPRIDO}), [missão](${WIKT_MISSAO}), [compleō](${WIKT_COMPLEO}), [missiō](${WIKT_MISSIO}), [folk etymology](${WIKI_POP}). Method: [etymology](${etimologia}). Close: [Valeu !!!](${mantra}).

## Three lineages

| Lineage | Piece | Origin | Office |
|---------|-------|--------|--------|
| **Canonical** | *missão cumprida* | *cumprir* ← Lat. *complēre* «to fill / complete» | **The [action](${acao}) was executed** |
| **Glue / anchor** | *missão comprida* | *comprido* «long» ← old participle of *comprir* | [Pun](${trocadilho}): the mouth measures the [path](${caminho}) |
| **Sending** | *missão* | Lat. *missiō* ← *mittō* «to send» | The charge that was **sent** — another tree |

**H-letters:** Old Portuguese *comprir* (VL *complīre*) gave modern **cumprir** (unstressed *o* → *u*) and left **comprido** in the old spelling: «filled completely» → «long». The ear recovers the old letter. The lab does **not** fuse the offices. Sibling pair: *comprimento* (length) / *cumprimento* (fulfillment / greeting).

The pun is **Portuguese**. Spanish *misión cumplida* does not open *comprida* (*larga*). Sister of craft: [Miss Click](${missClick}) — there the young lady is another tree; here the cousins share a root.

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Sayings.** Anchor *missão comprida* as pun on *missão cumprida* (*complēre*). *comprido* = old participle, length room. *missão* = sending. Rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la expresión **«[missão comprida](${self})»** — el [juego](${trocadilho}) BR que cambia la **u** de *cumprida* por la **o** de *comprida*. Pedido de campo: inspeccionar *missão comprida*.

Dos salas, un soplo. El [oído pega](${orelha}): **misión** + **larga**. La locución canónica es **missão cumprida** (hecha). El étimo **no funde** las salas — y aún **honra el parentesco**: *cumprido* y *comprido* vienen de la misma ánfora latina. Objeto = la **locución viva**. No es briefing militar. No es clase de metro.

> Fuentes: [cumprir](${WIKT_CUMPRIR}), [comprido](${WIKT_COMPRIDO}), [missão](${WIKT_MISSAO}), [compleō](${WIKT_COMPLEO}), [missiō](${WIKT_MISSIO}), [etimología popular](${WIKI_POP}). Método: [etimología](${etimologia}). Cierre: [¡Valeu !!!](${mantra}).

## Tres linajes

| Linaje | Pieza | Origen | Oficio |
|--------|-------|--------|--------|
| **Canónica** | *missão cumprida* | *cumprir* ← lat. *complēre* «llenar / completar» | **La [acción](${acao}) fue ejecutada** |
| **Cola / ancla** | *missão comprida* | *comprido* «largo» ← participio antiguo de *comprir* | [Juego](${trocadilho}): la boca mide el [camino](${caminho}) |
| **Envío** | *missão* | lat. *missiō* ← *mittō* «enviar» | El encargo **enviado** — otro árbol |

**H-letras:** el portugués arcaico *comprir* dio el moderno **cumprir** (*o* átona → *u*) y dejó **comprido** en la grafía antigua: «llenado del todo» → «largo». El oído recupera la letra vieja. El lab **no** funde oficios. Par hermano: *comprimento* / *cumprimento*. El juego es **portugués**: en español *misión cumplida* no abre *comprida* (*larga*). Hermana de oficio: [Miss Click](${missClick}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Expresiones.** Ancla *missão comprida* como juego sobre *missão cumprida* (*complēre*). *comprido* = participio antiguo, sala de la longitud. *missão* = envío. Salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildMissaoCompridaPost() {
  const { body, contentEn, contentEs } = buildMissaoCompridaBodies();
  const seriesOrder = pickOrder('inspecao-expressao-missao-comprida', 281);
  return expressaoPost({
    title: 'Inspeção: missão comprida — cola do comprimento; canónica cumprida; primos de complēre',
    titleEn: 'Inspection: missão comprida — length-glue; canonical cumprida; cousins of complēre',
    titleEs: 'Inspección: missão comprida — cola de la longitud; canónica cumprida; primos de complēre',
    excerpt:
      'Expressões: missão comprida — trocadilho sobre missão cumprida (complēre); comprido é primo (extensão); missão é envio; Valeu !!!',
    excerptEn:
      'Sayings: missão comprida — pun on missão cumprida (complēre); comprido is a cousin (length); missão is sending; Valeu !!!',
    excerptEs:
      'Dichos: missão comprida — juego sobre missão cumprida (complēre); comprido es primo (extensión); missão es envío; ¡Valeu !!!',
    slug: 'inspecao-expressao-missao-comprida',
    date: '2026-08-24T12:20:00.000Z',
    seriesOrder,
    seriesLabel: 'missão comprida · expressão',
    coverImage: COVER,
    sourceUrl: WIKT_CUMPRIR,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMissaoCompridaPost,
  buildMissaoCompridaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT_CUMPRIR
};
