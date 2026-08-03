'use strict';

/**
 * Inspeção Expressões · «filho de deus»
 * Oralidade + sentido religioso/cultural — título, exclamação, dignidade.
 * Respeito à fé; sem proselitismo. Ficha ≠ catecismo.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildFilhoDeDeusBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[filho de deus](${self})»** (também *Filho de Deus*, *filho de Deus*). Vive em três planos que o laboratório distingue sem misturar: **título teológico** (tradição cristã), **intensidade oral BR** (exclamação / espanto / elogio) e **metáfora de dignidade e cuidado** («tratar como filho de Deus»). Ficha de **oralidade e cultura** na série Expressões; irmã de [jesusamando](${jesusamando}) e [meudeusdoceu](${meudeusdoceu}); solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** na fala e na escrita corrente. Respeito à fé de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ catecismo. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **filho de deus** (também: *Filho de Deus*, *filho de Deus*) |
| Tipo | Expressão — título × oralidade × metáfora de dignidade |
| Forma canónica lab | **filho de deus** (minúscula — mapa de usos, não liturgia) |
| Núcleo semântico | Filiação / sacralidade · exclamação · dignidade · cuidado |
| Escala oral irmã | [aff](${aff}) ← → [meudeusdoceu](${meudeusdoceu}) ← → [jesusamando](${jesusamando}) · **filho de deus** (título + metáfora) |
| Tipo BudGanja | Expressão — mapa de usos com limites claros |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo pastoral (catálogo) | [Padre Ticão](${padreTicao}) — legado de cuidado; sem doutrina nesta ficha |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **filho de deus** | Canónica lab — mapa de usos |
| Filho de Deus | Maiúsculas — registo teológico / litúrgico corrente |
| filho de Deus | Mista — fala e texto corrente |
| «Filho de Deus!» | Exclamação — intensidade oral |
| «tratar como filho de Deus» | Metáfora de dignidade / cuidado |

**Veredicto de forma:** o laboratório ficheia **filho de deus** em minúscula como âncora de **usos** — sem impor grafia litúrgica nem negar a fé de quem capitaliza.

## Mapa de usos

| Uso | Leitura laboratorial | Bom × mau |
|-----|----------------------|-----------|
| **Título teológico** | Na tradição cristã: Cristo / filiação divina (quem crê) | Bom: respeitar o sentido de fé · Mau: catequizar o leitor na ficha |
| **Exclamação / intensidade BR** | Espanto, elogio, «nossa» alto — vizinho de [meudeusdoceu](${meudeusdoceu}) / [jesusamando](${jesusamando}) | Bom: nomear o pico · Mau: ironizar a fé alheia |
| **Metáfora de dignidade** | Tratar alguém com valor sagrado / cuidado máximo | Bom: [gesto](${gesto}) de respeito · Mau: chantagem afectiva («se fores filho de Deus…») |
| **Cuidado comunitário** | Linguagem de acolhimento (ex.: pastorais, rua, hospital) | Bom: elo [Padre Ticão](${padreTicao}) · Mau: usar o nome para excluir |
| **Ofício** | Depois do sopro / da metáfora — trabalhar | [Faça o melhor!](${mantra}) |

**H1:** *filho de deus* é **polissemia viva** — título, grito e metáfora de dignidade no mesmo sintagma.  
**H2:** a ficha **mapeia** usos; **não** ensina doutrina nem exige crença para compreender a oralidade.  
**H3:** no BudGanja, o fecho é [gesto](${gesto}) + [verdade](${verdade}) + [Faça o melhor!](${mantra}) — não sermão.

## Relação com jesusamando e meudeusdoceu

| Expressão | Plano dominante | Quando |
|-----------|-----------------|--------|
| [meudeusdoceu](${meudeusdoceu}) | Assombro alto (sopro colado) | Espanto / incredulidade |
| [jesusamando](${jesusamando}) | Afeto / bênção leve (sopro) | Calor na voz |
| **filho de deus** | Título · exclamação · dignidade | Fé, elogio intenso ou cuidado |

**Veredicto de escala:** as três partilham solo religioso-cultural BR; **filho de deus** carrega mais **peso de título e de dignidade** — não é só termómetro de peito.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Nomear o sagrado** | Fé cristã (quem crê) | Respeito · sem doutrina |
| **Exclamar** | Intensidade oral | Escala com [jesusamando](${jesusamando}) / [meudeusdoceu](${meudeusdoceu}) |
| **Honrar dignidade** | «Tratar como…» | Metáfora de cuidado · [gesto](${gesto}) |
| **Acolher** | Pastoral / comunidade | Elo [Padre Ticão](${padreTicao}) (legado no catálogo) |
| **Fechar com ofício** | Depois da frase | [Faça o melhor!](${mantra}) · [verdade](${verdade}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) | Irmãs orais — calor × espanto |
| [Faça o melhor!](${mantra}) | Depois do nome / do sopro — o ofício |
| [língua portuguesa](${lingua}) | Solo onde título e fala convivem |
| [gesto](${gesto}) · [verdade](${verdade}) · [alegria](${alegria}) | Acto · crédito · afecto |
| [Padre Ticão](${padreTicao}) | Figura de cuidado no catálogo — sem catecismo aqui |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno × dignidade |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmãs orais | [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) |
| Língua | [língua portuguesa](${lingua}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |
| Cuidado (catálogo) | [Padre Ticão](${padreTicao}) |

## Limites

- Não é aula de religião, dogma ou juízo sobre quem crê ou não crê.  
- Não usa a expressão para excluir, humilhar ou chantagem («prova que és filho de Deus…»).  
- Não substitui [verdade](${verdade}) nem método — título e metáfora ≠ prova laboratorial.  
- Grafias e capitalização variam; a ficha ancora o **mapa de usos**, não a liturgia.  
- Elo [Padre Ticão](${padreTicao}) = legado de cuidado no catálogo; **não** afiliação eclesiástica desta ficha.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *filho de deus* fichado como expressão de **título teológico**, **intensidade oral BR** e **metáfora de dignidade/cuidado**; irmã de [jesusamando](${jesusamando}) e [meudeusdoceu](${meudeusdoceu}); fecho [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Língua portuguesa](${lingua}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“filho de deus”** (*Filho de Deus* / son of God). Three planes: **theological title**, **Brazilian oral intensity**, and **metaphor of dignity/care**. Orality sheet; sisters [jesusamando](${jesusamando}) and [meudeusdoceu](${meudeusdoceu}); [Portuguese](${lingua}) soil.

> Independent BudGanja audit. Respect for faith; **no** proselytizing. Sheet ≠ catechism.

## Object

| Field | Value |
|-------|-------|
| Saying | **filho de deus** (also *Filho de Deus*) |
| Type | Title × oral exclamation × dignity metaphor |
| Links | [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) · [Portuguese](${lingua}) · [gesture](${gesto}) · [truth](${verdade}) · [Do your best!](${mantra}) · [Father Ticão](${padreTicao}) |
| Date | ${inspected} |

## Reading

**H1:** living polysemy — title, cry, and dignity metaphor.  
**H2:** maps uses; does not teach doctrine.  
**H3:** close with [gesture](${gesto}), [truth](${verdade}), [Do your best!](${mantra}).

## Purpose

Name the sacred (for believers) · exclaim · honor dignity · welcome · return to craft.

## Limits

No catechism · no exclusion · no emotional blackmail · title ≠ lab proof.

## Verdict

**Approved** — title · oral intensity · dignity/care; sisters [jesusamando](${jesusamando}) / [meudeusdoceu](${meudeusdoceu}); [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Portuguese](${lingua}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **«filho de deus»** (*Filho de Deus*). Tres planos: **título teológico**, **intensidad oral BR** y **metáfora de dignidad/cuidado**. Ficha de oralidad; hermanas [jesusamando](${jesusamando}) y [meudeusdoceu](${meudeusdoceu}); suelo de la [lengua portuguesa](${lingua}).

> Auditoría independiente. Respeto a la fe; **sin** proselitismo. Ficha ≠ catecismo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **filho de deus** (también *Filho de Deus*) |
| Tipo | Título × exclamación oral × metáfora de dignidad |
| Vínculos | [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) · [portugués](${lingua}) · [gesto](${gesto}) · [verdad](${verdade}) · [¡Haz lo mejor!](${mantra}) · [Padre Ticão](${padreTicao}) |
| Fecha | ${inspected} |

## Lectura

**H1:** polisemia viva — título, grito y metáfora de dignidad.  
**H2:** mapa de usos; no enseña doctrina.  
**H3:** cierre con [gesto](${gesto}), [verdad](${verdade}), [¡Haz lo mejor!](${mantra}).

## Veredicto

**Aprobada** — título · intensidad oral · dignidad/cuidado; hermanas [jesusamando](${jesusamando}) / [meudeusdoceu](${meudeusdoceu}); [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Portugués](${lingua}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildFilhoDeDeusPost() {
  const { body, contentEn, contentEs } = buildFilhoDeDeusBodies();
  return expressaoPost({
    title: 'Inspeção: filho de deus — título, oralidade e dignidade',
    titleEn: 'Inspection: filho de deus — title, orality and dignity',
    titleEs: 'Inspección: filho de deus — título, oralidad y dignidad',
    excerpt:
      'Expressões: «filho de deus» — título teológico, intensidade oral BR e metáfora de dignidade/cuidado; sem proselitismo; Faça o melhor!',
    excerptEn:
      'Sayings: “filho de deus” — theological title, BR oral intensity and dignity/care metaphor; no proselytizing; Do your best!',
    excerptEs:
      'Dichos: «filho de deus» — título teológico, intensidad oral BR y metáfora de dignidad/cuidado; sin proselitismo; ¡Haz lo mejor!',
    slug: 'inspecao-expressao-filho-de-deus',
    date: '2026-08-03T18:30:00.000Z',
    seriesOrder: 6,
    seriesLabel: 'filho de deus · expressão',
    coverImage: '/imagens/inspecoes/filho-de-deus-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildFilhoDeDeusPost,
  buildFilhoDeDeusBodies
};
