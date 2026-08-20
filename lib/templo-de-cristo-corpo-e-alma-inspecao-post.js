'use strict';

/**
 * Inspeção Expressões · «o templo de Cristo, corpo e alma»
 * Peças: templo · Cristo · corpo · alma.
 * Camadas: morada / corpo de Cristo / locução de inteireza.
 * Respeito à fé; sem proselitismo. Ficha ≠ catecismo.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildTemploDeCristoCorpoEAlmaBodies() {
  const inspected = '2026-08-20';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self =
    '/posts/post-inspecao-expressao-templo-de-cristo-corpo-e-alma.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const abencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const aBenca = '/posts/post-inspecao-expressao-a-benca.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';
  const paixao = '/posts/post-inspecao-filme-a-paixao-de-cristo.html';
  const doze = '/posts/post-inspecao-expressao-os-doze-apostolos.html';
  const wikiTemplo = 'https://pt.wiktionary.org/wiki/templo';
  const wikiCristo = 'https://pt.wiktionary.org/wiki/Cristo';
  const wikiCorpo = 'https://pt.wiktionary.org/wiki/corpo';
  const wikiAlma = 'https://pt.wiktionary.org/wiki/alma';
  const wikiJoao = 'https://pt.wikipedia.org/wiki/Evangelho_segundo_Jo%C3%A3o';
  const wikiCor =
    'https://pt.wikipedia.org/wiki/Primeira_Ep%C3%ADstola_aos_Cor%C3%ADntios';

  const body = `## Escopo

Inspeção editorial da expressão **«[o templo de Cristo, corpo e alma](${self})»**. Pedido do lab em caixa alta colada **O TEMPLO DE CRISTO CORPO E ALMA** → forma canónica **o templo de Cristo, corpo e alma**. Não é um ditado popular fechado: é **fórmula viva** que junta quatro peças — **templo**, **Cristo**, **corpo**, **[alma](${alma})** — e uma locução de inteireza (**corpo e alma**). Série Expressões; irmã de [filho de deus](${filhoDeDeus}), [jesusamando](${jesusamando}) e [Deus abençoe](${abencoe}); solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** (edifício, corpo, pessoa inteira, compromisso). Respeito à fé de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ catecismo, ≠ sermão sobre o corpo. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **o templo de Cristo, corpo e alma** |
| Pedido / tipografia | **O TEMPLO DE CRISTO CORPO E ALMA** → canónica com vírgula |
| Tipo | Expressão — morada × Cristo × inteireza (corpo + alma) |
| Peças | *templo* · *Cristo* · *corpo* · [alma](${alma}) |
| Locução âncora | **corpo e alma** («por inteiro; com tudo») |
| Núcleo semântico | Morada sagrada · pessoa inteira · compromisso total |
| Tipo BudGanja | Expressão — mapa de camadas com limites claros |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo vivo | [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) · [Vida](${vida}) |
| Elo irmãs | [filho de deus](${filhoDeDeus}) · [jesusamando](${jesusamando}) · [Deus abençoe](${abencoe}) · [a bença](${aBenca}) |
| Elo catálogo | [Padre Ticão](${padreTicao}) · [A Paixão de Cristo](${paixao}) |
| Fontes | [templo](${wikiTemplo}) · [Cristo](${wikiCristo}) · [corpo](${wikiCorpo}) · [alma](${wikiAlma}) |
| Data | ${inspected} |

**O que é o objeto:** o sintagma que nomeia **uma morada** (templo), **um nome** (Cristo) e **uma pessoa sem fenda** (corpo e alma). No lab: não partir o humano em matéria desprezível × espírito puro; não usar o templo para envergonhar o corpo.

## Forma e variantes

| Forma | Nota |
|-------|------|
| **o templo de Cristo, corpo e alma** | Canónica lab — vírgula marca a locução de inteireza |
| O TEMPLO DE CRISTO CORPO E ALMA | Pedido em caixa alta colada — **→** canónica |
| templo de Cristo | Peça — morada / corpo de Cristo (sem a locução) |
| corpo e alma | Locução — inteireza, entrega total |
| «entregar-se corpo e alma» | Uso vivo BR — compromisso, não anatomia |

**Veredicto de forma:** a caixa alta é **intensidade**; a ficha ancora a forma **legível**, com vírgula, para não fundir *Cristo-corpo* num único bloco opaco.

## Peças — étimo de trabalho

| Peça | Étimo (trabalho) | Confiança |
|------|------------------|-----------|
| **templo** | lat. *templum* («recinto sagrado; espaço marcado») | Alta |
| **Cristo** | gr. *Khristós* («ungido») ← hebr. *mashiach* | Alta |
| **corpo** | lat. *corpus* («corpo, conjunto») | Alta |
| **[alma](${alma})** | lat. *anima* («sopro, vida, centro vivo») | Alta |
| **corpo e alma** | locução romance — a pessoa **inteira** (não duas metades à venda) | Alta (uso vivo) |

**H1:** as quatro peças têm étimo **claro**; a **fórmula** é o objecto — não cada vocábulo isolado.  
**H2:** *corpo e alma* no PT é sobretudo **inteireza** («com tudo»), não tratado de dualismo.  
**H3:** *templo de Cristo* não se confunde automaticamente com «igreja de pedra» nem com «corpo físico de Jesus» — são **camadas**.

## Mapa de camadas (sem misturar)

| Camada | Leitura | Bom × mau |
|--------|---------|-----------|
| **Edifício / recinto** | Templo = lugar marcado, morada | Bom: nomear o sagrado espacial · Mau: só pedra, sem pessoa |
| **Corpo de Cristo (João)** | Tradição cristã: «ele falava do templo do seu corpo» ([João](${wikiJoao}) 2,19–21) | Bom: mapa cultural · Mau: catequizar o leitor na ficha |
| **Corpo como templo (Paulo)** | Tradição paulina: o corpo como morada ([1 Coríntios](${wikiCor}) 3,16; 6,19–20) | Bom: dignidade do corpo · Mau: **vergonha** do corpo em nome do templo |
| **Igreja / comunidade** | «Corpo de Cristo» = assembleia (1 Cor 12) | Bom: cuidado colectivo · Mau: excluir quem não crê |
| **Locução BR** | *corpo e alma* = por inteiro | Bom: compromisso com [gesto](${gesto}) · Mau: slogan sem ofício |
| **Ofício lab** | Pessoa inteira como lugar de trabalho | [alma](${alma}) + corpo no [gesto](${gesto}) · [Faça o melhor!](${mantra}) |

**H4:** a ficha **mapeia** herança cristã e uso BR; **não** ensina doutrina nem exige crença.  
**H5:** no BudGanja, «templo» **não** é arma contra o corpo, o cultivo ou a [vida](${vidaPalavra}).

## Corpo e alma — não partir a pessoa

| Leitura | Ofício | Armadilha |
|---------|--------|-----------|
| **Inteireza** | Entregar-se *corpo e alma* = com tudo | Frase oca («corpo e alma» sem [verdade](${verdade})) |
| **Par vivo** | Corpo = [gesto](${gesto}), peito, [coração](${coracao}); alma = centro ([alma](${alma})) | Alma «salva» + corpo «sujo» |
| **Cuidado** | Honrar o corpo que habita — saúde, descanso, ofício | Pânico moral / estigma em nome do templo |
| **Comunidade** | Morada partilhada — elo [Padre Ticão](${padreTicao}) | Templo como clube que humilha |

**Veredicto de inteireza:** *corpo e alma* no lab = **não fender**. Quem honra o templo honra o **corpo que vive** e a **alma que sente** — sem sermão.

## Relação com as irmãs orais

| Expressão | Plano dominante | Quando |
|-----------|-----------------|--------|
| [jesusamando](${jesusamando}) | Afeto / bênção leve | Calor na voz |
| [jesusudavi](${jesusudavi}) | Assombro alto | Espanto |
| [filho de deus](${filhoDeDeus}) | Título · dignidade | Fé, elogio, cuidado |
| [Deus abençoe](${abencoe}) · [a bença](${aBenca}) | Bênção pedida / dada | Saída e deitar |
| **o templo de Cristo, corpo e alma** | Morada · inteireza | Nomear o lugar e a pessoa toda |

**Veredicto de escala:** as irmãs medem **peito e título**; esta ficha mede **onde se habita** e **com que inteireza**.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear morada** | Templo, igreja, peito | Mapa — sem afiliação |
| **Nomear Cristo** | Fé cristã (quem crê) | Respeito · [filho de deus](${filhoDeDeus}) · [Paixão](${paixao}) |
| **Nomear inteireza** | *corpo e alma* | Não partir pessoa |
| **Cuidar do corpo** | Saúde, [gesto](${gesto}), [respeito](${respeito}) | Anti-vergonha · anti-pânico |
| **Fechar com ofício** | Depois da fórmula | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| [alma](${alma}) · [coração](${coracao}) · [vida](${vidaPalavra}) | Peças vivas — centro, peito, facto de viver |
| [filho de deus](${filhoDeDeus}) · [jesusamando](${jesusamando}) · [Deus abençoe](${abencoe}) | Irmãs de solo religioso-cultural BR |
| [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) | Como se habita o templo sem pose |
| [Padre Ticão](${padreTicao}) | Cuidado no catálogo — sem doutrina aqui |
| [A Paixão de Cristo](${paixao}) | Corpo de Cristo no cinema — ficha de arte, não de culto |
| [os doze apóstolos](${doze}) | Mesa dos enviados — conjunto, não pedestal |
| [língua portuguesa](${lingua}) | Solo onde pedra, fé e locução convivem |
| [Faça o melhor!](${mantra}) | Depois da fórmula — o ofício |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Centro vivo | [alma](${alma}) · [Vida](${vida}) · [Diário](${diario}) |
| Irmãs | [filho de deus](${filhoDeDeus}) · [jesusamando](${jesusamando}) · [Deus abençoe](${abencoe}) |
| Mantra | [Faça o melhor!](${mantra}) |

## Limites

- Não é aula de religião, dogma ou juízo sobre quem crê ou não crê.  
- Não usa «templo» para **envergonhar o corpo**, o sexo, o cultivo ou a saúde.  
- Não parte a pessoa: alma «pura» × corpo «impuro» é anti-ofício nesta ficha.  
- Não é nome comercial de congregação nem afiliação eclesiástica do laboratório.  
- Citações de João e 1 Coríntios = **mapa cultural**; não substituem [verdade](${verdade}) laboratorial.  
- Elo [Padre Ticão](${padreTicao}) = legado de cuidado; **não** doutrina desta ficha.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *o templo de Cristo, corpo e alma* fichado como fórmula de **morada**, **nome** e **inteireza**; irmã de [filho de deus](${filhoDeDeus}) e [alma](${alma}); fecho [Faça o melhor!](${mantra}) — habitar o templo **sem fender** o corpo.

[▶ Expressões](${hub}) · [▶ Alma](${alma}) · [▶ filho de deus](${filhoDeDeus}) · [▶ Deus abençoe](${abencoe}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“o templo de Cristo, corpo e alma”** (lab request in caps: **O TEMPLO DE CRISTO CORPO E ALMA**). Living formula: **temple** + **Christ** + **body and soul** (wholeness). Sisters [filho de deus](${filhoDeDeus}), [jesusamando](${jesusamando}), [Deus abençoe](${abencoe}); [soul](${alma}); [Portuguese](${lingua}) soil.

> Independent BudGanja audit. Respect for faith; **no** proselytizing. Sheet ≠ catechism. Temple is **not** a weapon against the body.

## Object

| Field | Value |
|-------|-------|
| Saying | **o templo de Cristo, corpo e alma** |
| Pieces | temple (*templum*) · Christ (*Khristós*) · body (*corpus*) · [soul](${alma}) (*anima*) |
| Anchor idiom | **corpo e alma** — the whole person, not two halves |
| Links | [filho de deus](${filhoDeDeus}) · [soul](${alma}) · [heart](${coracao}) · [gesture](${gesto}) · [truth](${verdade}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** four clear etymons; the **formula** is the object.  
**H2:** *corpo e alma* in PT = **wholeness** more than dualism.  
**H3:** cultural map — John’s “temple of his body”; Pauline body-as-temple — **not** doctrine in this sheet.  
**H4:** close with craft: inhabit without splitting body from [soul](${alma}).

## Limits

No catechism · no shaming the body · no church affiliation · formula ≠ lab proof.

## Verdict

**Approved** — dwelling · name · wholeness; sisters [filho de deus](${filhoDeDeus}) / [soul](${alma}); [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ Soul](${alma}) · [▶ filho de deus](${filhoDeDeus}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **«o templo de Cristo, corpo e alma»** (pedido en mayúsculas coladas). Fórmula viva: **templo** + **Cristo** + **cuerpo y alma** (entereza). Hermanas [filho de deus](${filhoDeDeus}), [jesusamando](${jesusamando}), [Deus abençoe](${abencoe}); [alma](${alma}); suelo de la [lengua portuguesa](${lingua}).

> Auditoría independiente. Respeto a la fe; **sin** proselitismo. Ficha ≠ catecismo. El templo **no** es arma contra el cuerpo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **o templo de Cristo, corpo e alma** |
| Piezas | templo · Cristo · cuerpo · [alma](${alma}) |
| Locución | **corpo e alma** — la persona entera |
| Vínculos | [filho de deus](${filhoDeDeus}) · [alma](${alma}) · [gesto](${gesto}) · [verdad](${verdade}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** cuatro étimos claros; el objeto es la **fórmula**.  
**H2:** *corpo e alma* = **entereza**, no dualismo de manual.  
**H3:** mapa cultural (Juan / 1 Corintios) — no doctrina en esta ficha.  
**H4:** habitar sin hender cuerpo y [alma](${alma}).

## Veredicto

**Aprobada** — morada · nombre · entereza; hermanas [filho de deus](${filhoDeDeus}) / [alma](${alma}); [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Alma](${alma}) · [▶ filho de deus](${filhoDeDeus}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, wikiTemplo };
}

function buildTemploDeCristoCorpoEAlmaPost(seriesOrder) {
  const { body, contentEn, contentEs, wikiTemplo } =
    buildTemploDeCristoCorpoEAlmaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 16;
  return expressaoPost({
    title:
      'Inspeção: o templo de Cristo, corpo e alma — morada, inteireza e ofício',
    titleEn:
      'Inspection: the temple of Christ, body and soul — dwelling, wholeness and craft',
    titleEs:
      'Inspección: el templo de Cristo, cuerpo y alma — morada, entereza y oficio',
    excerpt:
      'Expressões: «o templo de Cristo, corpo e alma» — morada, nome e inteireza; peças templo · Cristo · corpo · alma; sem catecismo; Faça o melhor!',
    excerptEn:
      'Sayings: “o templo de Cristo, corpo e alma” — dwelling, name and wholeness; pieces temple · Christ · body · soul; no catechism; Do your best!',
    excerptEs:
      'Dichos: «o templo de Cristo, corpo e alma» — morada, nombre y entereza; piezas templo · Cristo · cuerpo · alma; sin catecismo; ¡Haz lo mejor!',
    slug: 'inspecao-expressao-templo-de-cristo-corpo-e-alma',
    date: '2026-08-20T05:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'templo de Cristo · corpo e alma · expressão',
    coverImage: '/imagens/inspecoes/templo-de-cristo-corpo-e-alma-cover.jpg',
    sourceUrl: wikiTemplo,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTemploDeCristoCorpoEAlmaPost,
  buildTemploDeCristoCorpoEAlmaBodies
};
