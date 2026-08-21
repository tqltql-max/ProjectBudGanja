'use strict';

/**
 * Inspeção Expressões · muitoobrigado
 * Oralidade BR — gratidão reforçada; forma lab colada.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildMuitoObrigadoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const ausdhuashduas = '/posts/post-inspecao-expressao-ausdhuashduas.html';
  const deuCerto = '/posts/post-inspecao-expressao-deu-certo-galera.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const valeu = '/posts/post-inspecao-palavra-valeu.html';
  const wikt = 'https://pt.wiktionary.org/wiki/obrigado';

  const body = `## Escopo

Inspeção editorial da expressão oral brasileira **«muito obrigado»** — pedido de campo **«Muito obrigado!»** (com maiúscula e ponto de exclamação). Forma canónica lab **«[muitoobrigado](${self})»**: gratidão **reforçada** num só sopro (muitas vezes colada no chat, às vezes no teclado a correr). Marca **reconhecimento** do gesto alheio — calor sem conta, presença sem sermão. Ficha de **oralidade** na série Expressões; irmã de tom de [jesusamando](${jesusamando}) e irmã leve de [valeu](${valeu}); solo da [língua portuguesa](${lingua}). Cruza o **étimo** (*obrigar* / lat. *obligare* — «ligar») com a memória brasileira de **escravidão** e do ciclo da [cana-de-açúcar](${cana}) — sem confundir o sopro quotidiano com o crime histórico.

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** *muito obrigado* / *muitoobrigado* / **Muito obrigado!** **e** o mapa etimológico/histórico (ligação · obrigação · escravidão). Não é etiqueta vazia nem sermão: é termómetro de **crédito afectivo** com [verdade](${verdade}) sobre a raiz. Sem afiliação comercial. **Ficha ≠ equivalência** «agradecer = escravizar». Teclado a correr (letras a mais, acentos a menos) = o **mesmo** sopro.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão (lab) | **muitoobrigado** |
| Forma falada / escrita | **muito obrigado** · *muito obrigada* |
| Forma curta | *obrigado* / *obrigada* · *valeu* |
| Tipo | Interjeição / fórmula de gratidão — oralidade BR |
| Forma canónica lab | **muitoobrigado** (uma peça — como no chat apressado) |
| Núcleo semântico | Gratidão · reconhecimento · calor · «recebi o gesto» |
| Escala de tom | [aff](${aff}) (fecha) ← → **muitoobrigado** (abre com crédito) ← → [jesusamando](${jesusamando}) (calor) |
| Tipo BudGanja | Expressão — fecho afectivo do ofício |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo afecto | [alegria](${alegria}) · [respeito](${respeito}) · [jesusamando](${jesusamando}) · [valeu](${valeu}) |
| Elo histórico | Étimo *obrigar* / *obligare* · [cana-de-açúcar](${cana}) (engenhos / escravidão) |
| Fonte léxica | [Wikcionário · obrigado](${wikt}) |
| Data | ${inspected} |

## Étimo e elo com escravidão

| Camada | Leitura laboratorial |
|--------|----------------------|
| **Lat. *obligare*** | «Ligar», «atar», «impor vínculo» — raiz de *obrigar* / *obrigado* |
| **PT *obrigado*** | Particípio → fórmula de gratidão («fico obrigado / ligado ao gesto») |
| **Campo semântico** | Obrigação · dívida · vínculo — vizinho perigoso da **servidão** quando o poder força o «obrigado» |
| **Brasil / escravidão** | No ciclo da [cana](${cana}) (engenhos, açúcar), a língua da colónia circulou com **trabalho forçado**; a ficha **nomeia** esse solo histórico sem dizer que quem agradece hoje «repete» a escravidão |
| **Uso vivo hoje** | *Muitoobrigado* = crédito afectivo livre · **não** é contrato de dono |

**H-histórico:** o laboratório separa (1) o **sopro oral** de gratidão e (2) a **memória** de quem foi *obrigado* sem escolha. Agradecer com [respeito](${respeito}) e [verdade](${verdade}) é o oposto de apagar a escravidão.

## Forma e variantes

| Forma | Nota |
|-------|------|
| **muitoobrigado** | Canónica lab — colada |
| **Muito obrigado!** | Pedido de campo — maiúscula + ponto de exclamação; o mesmo ofício |
| muito obrigado | Separada — forma «de livro» / falada pausada |
| muito obrigada | Concordância de género — mesma família |
| obrigado / obrigada | Forma curta — gratidão sem o «muito» |
| [valeu](${valeu}) / vlw | Registo informal — parentesco de tom |
| «Muito obrigado, hein?» | Com confirmação afectuosa |
| grafia apressada no chat | Letras a mais, acentos a menos — **mesmo sopro**; a ficha lê o tom, não a ortografia |

**Veredicto de forma:** o laboratório ficheia **muitoobrigado** (minúscula, uma peça) e reconhece **Muito obrigado!** como a mesma gratidão reforçada; *muito obrigado/a*, *obrigado/a* e [valeu](${valeu}) são família viva.

## O que a frase inspeciona

| Peça / tom | Leitura laboratorial | Bom × mau |
|------------|----------------------|-----------|
| **Reconhecer** | Nomear que alguém fez algo | Bom: [gesto](${gesto}) visível · Mau: gratidão automática sem olhar |
| **Reforço («muito»)** | Intensidade — não era só educação | Bom: calor honesto · Mau: bajulação |
| **Fechar o ciclo** | Depois da ajuda, devolver crédito | Bom: [verdade](${verdade}) · Mau: dívida tóxica |
| **Abrir o peito** | Saída do enfado / [aff](${aff}) | Bom: [alegria](${alegria}) · Mau: obrigar o outro a «merecer» |
| **Ofício depois** | Agradeceu — e segue o trabalho | Bom: [Faça o melhor!](${mantra}) · Mau: só fórmula |

**H1:** *muitoobrigado* é o **termómetro de gratidão reforçada** da oralidade BR — crédito afectivo depois do gesto.  
**H2:** o «muito» marca intensidade; a forma curta *obrigado* é irmã, não rival.  
**H3:** o étimo (*obligare*) lembra **vínculo**; no Brasil, cruzar com escravidão / [cana](${cana}) exige [verdade](${verdade}) — sem anular o calor do sopro.  
**H4:** no BudGanja, fecha o ciclo com [respeito](${respeito}) e [gesto](${gesto}) — depois, [Faça o melhor!](${mantra}).

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Agradecer** | Reconhecer ajuda, tempo, cuidado | Tom das fichas / [Vida](${vida}) |
| **Devolver calor** | Responder a [jesusamando](${jesusamando}) / carona / ofício | Elo afectivo |
| **Fechar encontro** | Encerrar sem [aff](${aff}) residual | [gesto](${gesto}) · [caminho](${caminho}) |
| **Celebrar acerto** | Par de [deu certo, galera](${deuCerto}) | Partilha sem culto |
| **Fechar com ofício** | Depois do crédito, trabalhar | [Faça o melhor!](${mantra}) |

## Nota de campo (2026-08-03)

Auditoria oral no fio do laboratório: depois de ajuda e de uma nota de campo em [jesusamando](${jesusamando}) (cuidado / companhia), o sopro de fecho foi **muito obrigado** — gratidão reforçada, sem sermão. Sem dados pessoais.

| Campo | Registo |
|-------|---------|
| Contexto | Fecho afectivo após ofício partilhado |
| Tom observado | Crédito · calor · [respeito](${respeito}) |
| Contraste | [aff](${aff}) fecha · **muitoobrigado** abre e devolve |
| Limite | Ficha ≠ protocolo de etiqueta comercial |

## Nota de campo (2026-08-21)

Pedido de campo: **Muito obrigado!** — depois de um dia de ofício na bancada. A ficha lê **gratidão reforçada**, não a pontuação nem a grafia.

| Campo | Registo |
|-------|---------|
| Forma pedida | **Muito obrigado!** |
| Teclado | Apressado — o mesmo objecto |
| Fecho do dia | Crédito · [respeito](${respeito}) · depois [Faça o melhor!](${mantra}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [jesusamando](${jesusamando}) | Irmã — calor; esta ficha = crédito explícito |
| [meudeusdoceu](${meudeusdoceu}) · [ausdhuashduas](${ausdhuashduas}) | Escala: espanto / riso × gratidão |
| [deu certo, galera](${deuCerto}) | Celebração colectiva — par de tom |
| [Faça o melhor!](${mantra}) | Depois do crédito — o ofício continua |
| [valeu](${valeu}) | Irmã leve — gratidão curta |
| [cana-de-açúcar](${cana}) | Elo histórico — engenhos / escravidão / açúcar |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno × gratidão |
| [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) | Acto + crédito + verdade |
| [língua portuguesa](${lingua}) | Solo oral onde a expressão vive |
| [alegria](${alegria}) · [caminho](${caminho}) | Peito aberto · seguir |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Língua | [língua portuguesa](${lingua}) |
| História agrária | [Cana-de-açúcar (derivado)](${cana}) |
| Irmã leve | [valeu](${valeu}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |

## Limites

- Não transforma gratidão em dívida ou chantagem afectiva.  
- Não exige performance de educação — lê o **tom**.  
- Não substitui [verdade](${verdade}) nem método — é **fecho**, não prova científica.  
- Grafias e género variam (*obrigado/a*); **Muito obrigado!** e a forma lab colada são o mesmo ofício.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *muitoobrigado* fichado como sopro BR de gratidão reforçada; contraste com [aff](${aff}); elo [gesto](${gesto}), [respeito](${respeito}) e fecho [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ Gesto](${gesto}) · [▶ Aff](${aff}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian oral expression **“muito obrigado”** — field request **“Muito obrigado!”**. Lab form **“muitoobrigado”**: **reinforced gratitude** in one breath. Also maps the etymon (*obrigar* ← Lat. *obligare*, “to bind”) with Brazilian **slavery** memory and the [sugarcane](${cana}) cycle — without equating today’s thanks with that crime. Sister of [jesusamando](${jesusamando}); light sister of [valeu](${valeu}).

> Independent BudGanja audit. Living form + historical map. **Not** “thanking = enslaving”. Rushed typing = the same breath.

## Object

| Field | Value |
|-------|-------|
| Saying (lab) | **muitoobrigado** |
| Spoken form | **muito obrigado** / *muito obrigada* / **Muito obrigado!** |
| Etymology | *obrigar* / *obligare* — to bind |
| Historical link | Slavery · [cane](${cana}) mills |
| Tone scale | [aff](${aff}) (closes) ← → **muitoobrigado** (credit) ← → [jesusamando](${jesusamando}) (warmth) |
| Links | [Portuguese](${lingua}) · [gesture](${gesto}) · [respect](${respeito}) · [valeu](${valeu}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** thermometer of reinforced gratitude — affective credit after a gesture.  
**H2:** “muito” marks intensity; short *obrigado* and [valeu](${valeu}) are family.  
**H3:** the etymon recalls a **bond**; crossing with slavery / [cane](${cana}) needs [truth](${verdade}) without cancelling warmth.  
**H4:** closes the cycle — then [Do your best!](${mantra}).

## Field note (2026-08-03)

After shared craft help and a [jesusamando](${jesusamando}) care note, the closing breath was **muito obrigado**. No personal data.

## Field note (2026-08-21)

Field request: **Muito obrigado!** — same object, with capital letter and bang. The sheet reads gratitude, not spelling.

## Verdict

**Approved** — BR reinforced gratitude; contrast with [aff](${aff}); link [gesture](${gesto}) and [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ Aff](${aff}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de la expresión oral brasileña **«muito obrigado»** — pedido de campo **«Muito obrigado!»**. Forma lab **«muitoobrigado»**: **gratitud reforzada** en un soplo. También mapea el étimo (*obrigar* ← lat. *obligare*, «ligar») con la memoria brasileña de la **esclavitud** y el ciclo de la [caña de azúcar](${cana}) — sin igualar el gracias de hoy con ese crimen. Hermana de [jesusamando](${jesusamando}); hermana ligera de [valeu](${valeu}).

> Auditoría independiente. Forma viva + mapa histórico. **No** «agradecer = esclavizar». Teclado a prisa = el mismo soplo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión (lab) | **muitoobrigado** |
| Forma hablada | **muito obrigado** / *muito obrigada* / **Muito obrigado!** |
| Etimología | *obrigar* / *obligare* — ligar |
| Vínculo histórico | Esclavitud · ingenios de [caña](${cana}) |
| Escala | [aff](${aff}) (cierra) ← → **muitoobrigado** (crédito) ← → [jesusamando](${jesusamando}) (calor) |
| Vínculos | [portugués](${lingua}) · [gesto](${gesto}) · [respeito](${respeito}) · [valeu](${valeu}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** termómetro de gratitud reforzada — crédito afectivo tras el gesto.  
**H2:** «muito» marca intensidad; *obrigado* corto y [valeu](${valeu}) son familia.  
**H3:** el étimo recuerda un **vínculo**; cruzar con esclavitud / [caña](${cana}) pide [verdad](${verdade}) sin anular el calor.  
**H4:** cierra el ciclo — luego [¡Haz lo mejor!](${mantra}).

## Nota de campo (2026-08-03)

Tras ayuda compartida y una nota de [jesusamando](${jesusamando}), el soplo de cierre fue **muito obrigado**. Sin datos personales.

## Nota de campo (2026-08-21)

Pedido de campo: **Muito obrigado!** — el mismo objeto, con mayúscula y admiración. La ficha lee gratitud, no ortografía.

## Veredicto

**Aprobada** — gratitud reforzada BR; contraste con [aff](${aff}); vínculo [gesto](${gesto}) y [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ Aff](${aff}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildMuitoObrigadoPost() {
  const { body, contentEn, contentEs } = buildMuitoObrigadoBodies();
  return expressaoPost({
    title: 'Inspeção: muitoobrigado — gratidão reforçada e oralidade BR',
    titleEn: 'Inspection: muitoobrigado — reinforced gratitude and Brazilian orality',
    titleEs: 'Inspección: muitoobrigado — gratitud reforzada y oralidad BR',
    excerpt:
      'Expressões: «Muito obrigado!» / muitoobrigado — gratidão reforçada; étimo obligare × memória da escravidão/cana; elos gesto, valeu, jesusamando; Faça o melhor!',
    excerptEn:
      'Sayings: “Muito obrigado!” / muitoobrigado — reinforced gratitude; etymon obligare × slavery/sugarcane memory; gesture, valeu, jesusamando; Do your best!',
    excerptEs:
      'Dichos: «Muito obrigado!» / muitoobrigado — gratitud reforzada; étimo obligare × memoria de esclavitud/caña; gesto, valeu, jesusamando; ¡Haz lo mejor!',
    slug: 'inspecao-expressao-muito-obrigado',
    date: '2026-08-03T18:00:00.000Z',
    seriesOrder: 8,
    seriesLabel: 'muitoobrigado · expressão',
    coverImage: '/imagens/inspecoes/muito-obrigado-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMuitoObrigadoPost,
  buildMuitoObrigadoBodies
};
