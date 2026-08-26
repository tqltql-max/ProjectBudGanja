'use strict';

/**
 * Inspeção Expressões · deu certo, galera
 * Oralidade BR — celebração colectiva («deucer galerra»).
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildDeuCertoGaleraBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-deu-certo-galera.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';

  const body = `## Escopo

Inspeção editorial da expressão oral brasileira **«[deu certo, galera](${self})»** — no chat e na boca muitas vezes **«deucer galerra»**: celebração colectiva de um feito que saiu bem. Ficha de **oralidade** na série Expressões; irmã de tom de [jesusamado](${jesusamado}) e [meudeusdoceu](${meudeusdoceu}); contraste com [aff](${aff}) e [buguei](${buguei}); solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** *deu certo, galera* / *deucer galerra*. Sem doutrina, sem proselitismo. Ficha de fala e de partilha — não de culto.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **deu certo, galera** (também: *deucer galerra*, *deu certo galera!*) |
| Tipo | Exclamação de oralidade BR — celebração colectiva |
| Forma canónica lab | **deu certo, galera** (vírgula de fala; *deucer galerra* = colagem oral) |
| Núcleo semântico | Sucesso · alívio · partilha com o grupo · «funcionou!» |
| Escala de tom | [aff](${aff}) / [buguei](${buguei}) (tranco) ← → **deu certo, galera** (acerto partilhado) ← → [genial](${genial}) / [jesusamado](${jesusamado}) (elogio / calor) |
| Tipo BudGanja | Expressão — vitória em voz alta, no plural afectivo |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo irmãs | [jesusamado](${jesusamado}) · [meudeusdoceu](${meudeusdoceu}) |
| Elo ofício | [Valeu !!!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) |
| Elo celebração | [genial](${genial}) · [alegria](${alegria}) · [criatividade](${criatividade}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **deu certo, galera** | Canónica lab — pausa de fala na vírgula |
| deucer galerra | Colagem oral / chat — mesmo sopro, grafia «de ouvido» |
| deu certo galera! | Sem vírgula — mesma família |
| «Deu certo, galera!» | Maiúscula + exclamação — anúncio ao grupo |
| «Deu certo!» | Forma curta — sem vocativo; menos coral |

**Veredicto de forma:** o laboratório ficheia **deu certo, galera** (com vírgula de oralidade) e reconhece **deucer galerra** como variante estável de teclado/boca — sem exigir norma escolar.

## O que a frase inspeciona

| Peça / tom | Leitura laboratorial | Bom × mau |
|------------|----------------------|-----------|
| **Acerto** | Algo funcionou — prova, planta, código, gesto | Bom: creditação · Mau: vanglória vazia |
| **Celebração colectiva** | *galera* = o nós afectivo | Bom: partilha · Mau: excluir quem não festeja |
| **Alívio pós-tranco** | Saída do [buguei](${buguei}) / do [aff](${aff}) | Bom: nomear a viragem · Mau: negar o aperto anterior |
| **Anúncio ao grupo** | Contar o feito em voz alta | Bom: [verdade](${verdade}) do resultado · Mau: pressa de aplauso |
| **Par de [genial](${genial})** | Elogio do engenho × celebração do resultado | Bom: dois registos · Mau: confundir culto com ofício |
| **Espelho de [meudeusdoceu](${meudeusdoceu})** | Espanto alto × «saiu bem» | Bom: escala de tom · Mau: gritar sem [gesto](${gesto}) |

**H1:** *deu certo, galera* é o **termómetro de acerto partilhado** da oralidade BR — contraste directo com [aff](${aff}) e [buguei](${buguei}).  
**H2:** *galera* não é multidão anónima: é o círculo que ouve o anúncio.  
**H3:** no BudGanja, celebra o resultado e devolve ao ofício — [Valeu !!!](${mantra}) continua depois da festa.

## Relação com aff, buguei e irmãs orais

| Expressão | Tom | Quando |
|-----------|-----|--------|
| [aff](${aff}) | Enfado / cansaço | Fechar, soltar o peito |
| [buguei](${buguei}) | Tranco / «deu ruim» | Nomear a falha no peito ou na máquina |
| [meudeusdoceu](${meudeusdoceu}) | Espanto / incredulidade | Abrir os olhos — alto |
| [jesusamado](${jesusamado}) | Afeto / bênção leve | Abrir com calor |
| **deu certo, galera** | Acerto colectivo | Anunciar que funcionou — ao grupo |

**Veredicto de escala:** as cinco são sopros BR; *deu certo, galera* é o **polo positivo do resultado** — não substitui [genial](${genial}) (engenho) nem [jesusamado](${jesusamado}) (calor).

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Celebrar o acerto** | Contar que saiu bem | Tom da fala / [Vida](${vida}) |
| **Chamar a galera** | Incluir o círculo no alívio | Partilha sem culto |
| **Sair do tranco** | Depois de [buguei](${buguei}) / [aff](${aff}) | Voltar ao [gesto](${gesto}) |
| **Creditação leve** | «Funcionou» sem relatório | Par de [verdade](${verdade}) · [genial](${genial}) |
| **Fechar com ofício** | Depois da festa | [Valeu !!!](${mantra}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [jesusamado](${jesusamado}) · [meudeusdoceu](${meudeusdoceu}) | Irmãs — calor e espanto; esta ficha = acerto partilhado |
| [aff](${aff}) · [buguei](${buguei}) | Contraste — enfado e tranco × celebração |
| [genial](${genial}) | Elogio de engenho — outro registo de celebração |
| [Valeu !!!](${mantra}) | Depois do «deu certo» — o ofício segue |
| [língua portuguesa](${lingua}) | Solo oral |
| [alegria](${alegria}) · [gesto](${gesto}) · [criatividade](${criatividade}) | Afecto + acto + engenho |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno × festa limpa |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmãs orais | [jesusamado](${jesusamado}) · [meudeusdoceu](${meudeusdoceu}) |
| Contraste | [aff](${aff}) · [buguei](${buguei}) |
| Língua | [língua portuguesa](${lingua}) |
| Mantra | [Valeu !!!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |

## Limites

- Não é métrica de sucesso nem KPI — é **tom** de celebração.  
- Não exclui quem ainda está no [buguei](${buguei}) ou no [aff](${aff}).  
- Não substitui [verdade](${verdade}) nem método — «deu certo» pede prova leve, não mito.  
- Grafias variam (*deucer galerra*); a ficha ancora a oralidade.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *deu certo, galera* / *deucer galerra* fichado como sopro BR de **celebração colectiva**; contraste com [aff](${aff}) e [buguei](${buguei}); elos [genial](${genial}), [jesusamado](${jesusamado}), [meudeusdoceu](${meudeusdoceu}), [Valeu !!!](${mantra}), [língua portuguesa](${lingua}).

[▶ Expressões](${hub}) · [▶ jesusamado](${jesusamado}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Aff](${aff}) · [▶ Buguei](${buguei}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian oral expression **“deu certo, galera”** (chat/mouth often **“deucer galerra”**) — **collective celebration** that something worked. Orality sheet; sisters [jesusamado](${jesusamado}) and [meudeusdoceu](${meudeusdoceu}); contrast with [aff](${aff}) and [buguei](${buguei}); on [Portuguese](${lingua}) soil.

> Independent BudGanja audit. **No** proselytizing — speech and sharing, not cult.

## Object

| Field | Value |
|-------|-------|
| Saying | **deu certo, galera** (also *deucer galerra*) |
| Type | BR oral celebration (group vocative) |
| Tone scale | [aff](${aff}) / [buguei](${buguei}) (stall) ← → **deu certo, galera** (shared win) ← → [genial](${genial}) / [jesusamado](${jesusamado}) |
| Links | [Portuguese](${lingua}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** shared-success thermometer — opposite pole of [aff](${aff}) / [buguei](${buguei}).  
**H2:** *galera* is the circle that hears the announcement.  
**H3:** celebrate the result, then return to craft — [Valeu !!!](${mantra}).

## Purpose

Celebrate the win · call the circle · leave the stall · light credit · close with craft.

## Verdict

**Approved** — BR breath of collective celebration; contrast with [aff](${aff}) / [buguei](${buguei}); links [genial](${genial}), [jesusamado](${jesusamado}), [meudeusdoceu](${meudeusdoceu}), [Valeu !!!](${mantra}).

[▶ Expressions](${hub}) · [▶ jesusamado](${jesusamado}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Aff](${aff}) · [▶ Buguei](${buguei}) · [▶ Genial](${genial}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la expresión oral brasileña **«deu certo, galera»** (en chat/boca a menudo **«deucer galerra»**) — **celebración colectiva** de que algo salió bien. Ficha de oralidad; hermanas [jesusamado](${jesusamado}) y [meudeusdoceu](${meudeusdoceu}); contraste con [aff](${aff}) y [buguei](${buguei}); suelo de la [lengua portuguesa](${lingua}).

> Auditoría independiente. **Sin** proselitismo — habla y compartición, no culto.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **deu certo, galera** (también *deucer galerra*) |
| Tipo | Celebración oral BR (vocativo de grupo) |
| Escala | [aff](${aff}) / [buguei](${buguei}) (tranco) ← → **deu certo, galera** (acierto compartido) ← → [genial](${genial}) / [jesusamado](${jesusamado}) |
| Vínculos | [portugués](${lingua}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** termómetro de acierto compartido — polo opuesto de [aff](${aff}) / [buguei](${buguei}).  
**H2:** *galera* es el círculo que oye el anuncio.  
**H3:** celebrar el resultado y volver al oficio — [¡Valeu !!!](${mantra}).

## Veredicto

**Aprobada** — soplo BR de celebración colectiva; contraste con [aff](${aff}) / [buguei](${buguei}); vínculos [genial](${genial}), [jesusamado](${jesusamado}), [meudeusdoceu](${meudeusdoceu}), [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ jesusamado](${jesusamado}) · [▶ meudeusdoceu](${meudeusdoceu}) · [▶ Aff](${aff}) · [▶ Buguei](${buguei}) · [▶ Genial](${genial}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildDeuCertoGaleraPost() {
  const { body, contentEn, contentEs } = buildDeuCertoGaleraBodies();
  return expressaoPost({
    title: 'Inspeção: deu certo, galera — celebração colectiva e oralidade BR',
    titleEn: 'Inspection: deu certo, galera — collective celebration and Brazilian orality',
    titleEs: 'Inspección: deu certo, galera — celebración colectiva y oralidad BR',
    excerpt:
      'Expressões: «deu certo, galera» / deucer galerra — celebração colectiva; contraste com aff e buguei; elos genial, jesusamado, meudeusdoceu, Valeu !!!',
    excerptEn:
      'Sayings: “deu certo, galera” / deucer galerra — collective celebration; contrast with aff and buguei; links genial, jesusamado, meudeusdoceu, Valeu !!!',
    excerptEs:
      'Dichos: «deu certo, galera» / deucer galerra — celebración colectiva; contraste con aff y buguei; vínculos genial, jesusamado, meudeusdoceu, ¡Valeu !!!',
    slug: 'inspecao-expressao-deu-certo-galera',
    date: '2026-08-03T18:00:00.000Z',
    seriesOrder: 5,
    seriesLabel: 'deu certo, galera · expressão',
    coverImage: '/imagens/inspecoes/deu-certo-galera-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDeuCertoGaleraPost,
  buildDeuCertoGaleraBodies
};
