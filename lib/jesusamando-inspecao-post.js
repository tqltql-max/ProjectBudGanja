'use strict';

/**
 * Inspeção Expressões · jesusamando
 * Oralidade BR — afeto, assombro e bênção num só sopro.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildJesusamandoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-jesusamando.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';

  const body = `## Escopo

Inspeção editorial da expressão oral brasileira **«[jesusamando](${self})»** — um só sopro (muitas vezes escrito colado) que junta **assombro**, **afeto** e, para muita gente, **bênção**. Não é tratado teológico: é ficha de **oralidade** na série Expressões, no solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** *jesusamando* / *Jesus amando* no português do Brasil. Respeito à fé de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ catecismo. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **jesusamando** (também: *Jesus amando*, *Jesusamando*) |
| Tipo | Interjeição / exclamação de oralidade BR |
| Forma canónica lab | **jesusamando** (uma palavra — como se ouve e se escreve no chat) |
| Núcleo semântico | Assombro · afeto · bênção leve · «nossa» caloroso |
| Contraste | [aff](${aff}) (enfado) × **jesusamando** (abertura / calor) |
| Tipo BudGanja | Expressão — tom do peito na fala |
| Elo língua | [língua portuguesa](${lingua}) — oralidade BR |
| Elo ofício | [Faça o melhor!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo afecto | [alegria](${alegria}) · [genial](${genial}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **jesusamando** | Canónica lab — colada, como no teclado e na boca |
| Jesus amando | Separada — mesma família sonora |
| Jesusamando | Maiúscula inicial — variante gráfica |
| «Jesus amando, hein?» | Com pergunta / confirmação afectuosa |

**Veredicto de forma:** o laboratório ficheia **jesusamando** (minúscula, uma peça) como forma oral estável — sem exigir grafia litúrgica.

## O que a frase inspeciona

| Peça / tom | Leitura laboratorial | Bom × mau |
|------------|----------------------|-----------|
| **Assombro** | Algo surpreendeu — bom ou absurdo | Bom: nomear o espanto · Mau: ironizar a fé alheia |
| **Afeto** | Calor na voz — «que coisa linda / intensa» | Bom: partilha · Mau: pressão afectiva |
| **Bênção leve** | Para quem crê: lembrança de cuidado maior | Bom: respeito · Mau: impor crença na ficha |
| **Alívio** | Depois do aperto — peito abre | Bom: [alegria](${alegria}) · Mau: negar o [aff](${aff}) anterior |
| **Elogio** | Parecido com «[genial](${genial})!» em outro registo | Bom: celebrar feito · Mau: culto vazio |

**H1:** *jesusamando* é **termómetro positivo** da oralidade BR — espelho invertido do [aff](${aff}).  
**H2:** a origem soa a *Jesus* + *amando*, mas o uso quotidiano **não** exige catecismo para ser compreendido.  
**H3:** no BudGanja, serve para marcar **calor e assombro** sem substituir o ofício — depois do sopro, [Faça o melhor!](${mantra}).

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Exclamar** | Reagir ao inesperado com calor | Tom da fala nas fichas / [Vida](${vida}) |
| **Abençoar leve** | Desejo de bem (quem crê) | Respeito · sem doutrina |
| **Abrir o peito** | Sair do enfado ([aff](${aff}) / [já](${ja})) | Voltar ao [gesto](${gesto}) |
| **Celebrar** | Feito, encontro, planta, verso | Par afectivo de [genial](${genial}) |
| **Fechar com ofício** | Depois do espanto, trabalhar | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [Faça o melhor!](${mantra}) | Depois do sopro — o ofício continua |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno × calor |
| [aff](${aff}) · [já](${ja}) | Termómetros de enfado / tempo — pares opostos de tom |
| [genial](${genial}) | Elogio de engenho — outro registo de celebração |
| [língua portuguesa](${lingua}) | Solo oral onde a expressão vive |
| [alegria](${alegria}) · [gesto](${gesto}) · [verdade](${verdade}) | Afecto + acto + crédito |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Língua | [língua portuguesa](${lingua}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |
| Criatividade | [criatividade](${criatividade}) |

## Limites

- Não é aula de religião nem juízo sobre quem crê ou não crê.  
- Não usa a expressão para excluir quem não partilha a fé.  
- Não substitui [verdade](${verdade}) nem método — é **tom**, não veredicto científico.  
- Grafias variam; a ficha ancora a forma oral colada.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *jesusamando* fichado como sopro BR de assombro e afeto; contraste com [aff](${aff}); elo [língua portuguesa](${lingua}) e fecho [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ Língua portuguesa](${lingua}) · [▶ Aff](${aff}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian oral expression **“jesusamando”** — one breath (often written as one word) that mixes **awe**, **affection**, and, for many, a light **blessing**. Not a theological treatise — an **orality** sheet in Expressions, on [Portuguese language](${lingua}) soil.

> Independent BudGanja audit. Object = the living form. Respect for faith; **no** proselytizing.

## Object

| Field | Value |
|-------|-------|
| Saying | **jesusamando** (also *Jesus amando*) |
| Type | BR oral interjection |
| Contrast | [aff](${aff}) (exasperation) × **jesusamando** (warmth / awe) |
| Links | [Portuguese](${lingua}) · [Do your best!](${mantra}) · [gesture](${gesto}) · [joy](${alegria}) |
| Date | ${inspected} |

## Reading

**H1:** positive oral thermometer — mirror of [aff](${aff}).  
**H2:** sounds like *Jesus* + *loving*, but everyday use does not require catechism.  
**H3:** marks warmth and awe — then [Do your best!](${mantra}).

## Purpose

Exclaim · lightly bless (for those who believe) · open the chest after strain · celebrate · return to craft.

## Verdict

**Approved** — BR oral warmth; contrast with [aff](${aff}); link [Portuguese](${lingua}) and [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ Portuguese](${lingua}) · [▶ Aff](${aff}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de la expresión oral brasileña **«jesusamando»** — un solo soplo (a menudo escrito junto) que mezcla **asombro**, **afecto** y, para muchos, una **bendición** leve. No es tratado teológico — ficha de **oralidad** en Expresiones, en el suelo de la [lengua portuguesa](${lingua}).

> Auditoría independiente. Respeto a la fe; **sin** proselitismo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **jesusamando** (también *Jesus amando*) |
| Tipo | Interjección oral BR |
| Contraste | [aff](${aff}) (hastío) × **jesusamando** (calor / asombro) |
| Vínculos | [portugués](${lingua}) · [¡Haz lo mejor!](${mantra}) · [gesto](${gesto}) · [alegría](${alegria}) |
| Fecha | ${inspected} |

## Lectura

**H1:** termómetro oral positivo — espejo de [aff](${aff}).  
**H2:** suena a *Jesus* + *amando*, pero el uso cotidiano no exige catecismo.  
**H3:** marca calor y asombro — luego [¡Haz lo mejor!](${mantra}).

## Veredicto

**Aprobada** — calor oral BR; contraste con [aff](${aff}); vínculo [portugués](${lingua}) y [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Portugués](${lingua}) · [▶ Aff](${aff}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildJesusamandoPost() {
  const { body, contentEn, contentEs } = buildJesusamandoBodies();
  return expressaoPost({
    title: 'Inspeção: jesusamando — assombro, afeto e oralidade BR',
    titleEn: 'Inspection: jesusamando — awe, affection and Brazilian orality',
    titleEs: 'Inspección: jesusamando — asombro, afecto y oralidad BR',
    excerpt:
      'Expressões: «jesusamando» — sopro BR de assombro e afeto; contraste com aff; elo língua portuguesa e Faça o melhor!',
    excerptEn:
      'Sayings: “jesusamando” — Brazilian breath of awe and affection; contrast with aff; Portuguese language and Do your best!',
    excerptEs:
      'Dichos: «jesusamando» — soplo BR de asombro y afecto; contraste con aff; lengua portuguesa y ¡Haz lo mejor!',
    slug: 'inspecao-expressao-jesusamando',
    date: '2026-08-03T16:30:00.000Z',
    seriesOrder: 3,
    seriesLabel: 'jesusamando · expressão',
    coverImage: '/imagens/inspecoes/jesusamando-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildJesusamandoPost,
  buildJesusamandoBodies
};
