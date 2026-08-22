'use strict';

/**
 * Inspeção Expressões · «Deus deu dois ouvidos e uma boca»
 * Ditado de proporção: ouvir 2× / falar 1×.
 * Tipografia oral: «dois pouvi» → «dois ouvidos».
 * Respeito à fé cultural; sem proselitismo. Ficha ≠ sermão.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildDeusDeuDoisOuvidosBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-deus-deu-dois-ouvidos.html';
  const deusAbencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const vinganca =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[Deus deu dois ouvidos e uma boca](${self})»** — ditado de **proporção oral**: ouvir em dobro, falar em metade. Pedido do lab: tipografia / oral truncado **«dois pouvi»** → forma canónica **dois ouvidos**. Irmã de [Deus abençoe](${deusAbencoe}) e [filho de deus](${filhoDeDeus}) no solo «Deus…»; ofício com [gesto](${gesto}), [respeito](${respeito}) e [mensagem](${mensagem}); solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** na fala e na escrita corrente. Respeito à fé cultural de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ sermão. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **Deus deu dois ouvidos e uma boca** |
| Tipo | Expressão — ditado de proporção × aviso de conversa |
| Forma canónica lab | **Deus deu dois ouvidos e uma boca** |
| Tipografia / oral truncado | **dois pouvi** → **dois ouvidos** |
| Núcleo semântico | Escuta · proporção · falar menos · cuidado na boca |
| Escala oral irmã | [Deus abençoe](${deusAbencoe}) · [filho de deus](${filhoDeDeus}) · [jesusamado](${jesusamado}) / [meudeusdoceu](${meudeusdoceu}) |
| Tipo BudGanja | Expressão — mapa de usos com limites claros |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [Valeu !!!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo comunicação | [mensagem](${mensagem}) · [relação](${relacao}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **Deus deu dois ouvidos e uma boca** | Canónica lab — ditado completo |
| Deus nos deu dois ouvidos e uma boca | Com «nos» — destinatário colectivo |
| dois ouvidos e uma boca | Forma curta — mesmo ofício de proporção |
| **dois pouvi** | Tipografia / oral truncado — **→ dois ouvidos** |
| ouvir duas vezes / falar uma | Paráfrase didáctica (sem «Deus») |

**Veredicto de forma:** o laboratório ficheia **Deus deu dois ouvidos e uma boca** como âncora; **pouvi** fica como pedido/tipografia a corrigir — não como étimo.

## Mapa de usos

| Uso | Leitura laboratorial | Bom × mau |
|-----|----------------------|-----------|
| **Aviso de escuta** | Antes de responder — ouvir de verdade | Bom: [gesto](${gesto}) de presença · Mau: silêncio passivo-agressivo |
| **Proporção na conversa** | Falar menos do que se ouve | Bom: [respeito](${respeito}) ao outro · Mau: calar quem precisa de voz |
| **Correcção suave** | «Lembra: Deus deu…» | Bom: lembrete afectuoso · Mau: sermão para humilhar |
| **Ofício da [mensagem](${mensagem})** | Conteúdo que chega depois da escuta | Bom: ouvir → depois falar · Mau: monólogo disfarçado de ditado |
| **Ofício** | Depois do aviso — trabalhar | [Valeu !!!](${mantra}) |

**H1:** *Deus deu dois ouvidos e uma boca* é **ditado de proporção** — escuta em dobro, fala em metade.  
**H2:** **dois pouvi** = forma truncada / tipografia; canónico = **dois ouvidos**.  
**H3:** a ficha **mapeia** usos; **não** ensina doutrina nem exige crença.  
**H4:** fecho BudGanja = [gesto](${gesto}) + [respeito](${respeito}) + [Valeu !!!](${mantra}).

## Relação com irmãs orais

| Expressão | Plano dominante | Quando |
|-----------|-----------------|--------|
| [Deus abençoe](${deusAbencoe}) | Bênção · despedida | Desejar bem / sair |
| [filho de deus](${filhoDeDeus}) | Título · dignidade | Honrar / exclamar |
| [jesusamado](${jesusamado}) / [meudeusdoceu](${meudeusdoceu}) | Afeto / assombro | Calor ou espanto |
| **Deus deu dois ouvidos…** | Proporção · escuta | Antes de falar / corrigir o ritmo |

**Veredicto de escala:** este ditado aponta **para o ofício da boca e do ouvido** — não é só termómetro do peito; é mapa de conversa.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Lembrar a proporção** | Ouvir 2× / falar 1× | Método de diálogo |
| **Abrir espaço** | Deixar o outro terminar | [Gesto](${gesto}) de escuta |
| **Cuidar da boca** | Não disparar [mensagem](${mensagem}) sem ouvir | [Verdade](${verdade}) depois da escuta |
| **Honrar a [relação](${relacao})** | Diálogo ≠ monólogo | [Respeito](${respeito}) |
| **Fechar com ofício** | Depois da frase | [Valeu !!!](${mantra}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [Deus abençoe](${deusAbencoe}) · [filho de deus](${filhoDeDeus}) | Irmãs no solo «Deus…» |
| [Valeu !!!](${mantra}) | Depois do aviso — o ofício |
| [língua portuguesa](${lingua}) | Solo da forma viva |
| [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) | Acto · honra · crédito |
| [mensagem](${mensagem}) · [relação](${relacao}) | O que se diz e o entre |
| [A vingança nunca é plena…](${vinganca}) | Contraste: veneno na boca × escuta |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmãs | [Deus abençoe](${deusAbencoe}) · [filho de deus](${filhoDeDeus}) |
| Comunicação | [mensagem](${mensagem}) · [relação](${relacao}) |
| Língua | [língua portuguesa](${lingua}) |
| Mantra | [Valeu !!!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |

## Limites

- Não é aula de religião, dogma ou juízo sobre quem crê ou não crê.  
- Não usa o ditado para silenciar quem precisa de voz (abuso, denúncia, pedido de ajuda).  
- Não substitui [verdade](${verdade}) nem método — proporção oral ≠ prova laboratorial.  
- «pouvi» truncado fica mapeado; a âncora é **dois ouvidos**.  
- Escutar muito não autoriza acumular e depois esmagar o outro com monólogo.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *Deus deu dois ouvidos e uma boca* fichado como **ditado de proporção** (ouvir 2× / falar 1×); tipografia **dois pouvi → dois ouvidos**; irmã de [Deus abençoe](${deusAbencoe}) / [filho de deus](${filhoDeDeus}); fecho [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Deus abençoe](${deusAbencoe}) · [▶ filho de deus](${filhoDeDeus}) · [▶ mensagem](${mensagem}) · [▶ Língua portuguesa](${lingua}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“Deus deu dois ouvidos e uma boca”** (God gave two ears and one mouth) — proverb of **oral proportion**: listen twice, speak once. Lab tipography: **dois pouvi → dois ouvidos**. Sisters [Deus abençoe](${deusAbencoe}), [filho de deus](${filhoDeDeus}).

> Independent BudGanja audit. Respect for cultural faith; **no** proselytizing. Sheet ≠ sermon.

## Object

| Field | Value |
|-------|-------|
| Saying | **Deus deu dois ouvidos e uma boca** |
| Tipography | **dois pouvi → dois ouvidos** |
| Type | Proportion proverb × conversation craft |
| Links | [Deus abençoe](${deusAbencoe}) · [filho de deus](${filhoDeDeus}) · [message](${mensagem}) · [gesture](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** living proportion proverb — listen 2× / speak 1×.  
**H2:** truncated **pouvi** maps to canonical **ouvidos**.  
**H3:** maps uses; does not teach doctrine.  
**H4:** close with [gesture](${gesto}), [respect](${respeito}), [Valeu !!!](${mantra}).

## Verdict

**Approved** — proportion · listening · mouth craft; [Valeu !!!](${mantra}).

[▶ Expressions](${hub}) · [▶ Deus abençoe](${deusAbencoe}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **«Deus deu dois ouvidos e uma boca»** (Dios dio dos oídos y una boca) — dicho de **proporción oral**: oír el doble, hablar la mitad. Tipografía: **dois pouvi → dois ouvidos**. Hermanas [Deus abençoe](${deusAbencoe}), [filho de deus](${filhoDeDeus}).

> Auditoría independiente. Respeto a la fe cultural; **sin** proselitismo. Ficha ≠ sermón.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **Deus deu dois ouvidos e uma boca** |
| Tipografía | **dois pouvi → dois ouvidos** |
| Tipo | Proverbio de proporción × oficio de conversación |
| Vínculos | [Deus abençoe](${deusAbencoe}) · [filho de deus](${filhoDeDeus}) · [mensaje](${mensagem}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** dicho vivo de proporción — oír 2× / hablar 1×.  
**H2:** **pouvi** truncado → **ouvidos**.  
**H3:** mapea usos; no enseña doctrina.  
**H4:** cierre con [gesto](${gesto}), [respeto](${respeito}), [¡Valeu !!!](${mantra}).

## Veredicto

**Aprobada** — proporción · escucha · oficio de la boca; [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Deus abençoe](${deusAbencoe}) · [▶ ¡Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildDeusDeuDoisOuvidosPost() {
  const { body, contentEn, contentEs } = buildDeusDeuDoisOuvidosBodies();
  return expressaoPost({
    title:
      'Inspeção: Deus deu dois ouvidos e uma boca — proporção, escuta e tipografia pouvi',
    titleEn:
      'Inspection: Deus deu dois ouvidos e uma boca — proportion, listening and tipography pouvi',
    titleEs:
      'Inspección: Deus deu dois ouvidos e uma boca — proporción, escucha y tipografía pouvi',
    excerpt:
      'Expressões: «Deus deu dois ouvidos e uma boca» — ouvir 2× / falar 1×; tipografia dois pouvi → dois ouvidos; sem proselitismo; Valeu !!!',
    excerptEn:
      'Sayings: “Deus deu dois ouvidos e uma boca” — listen 2× / speak 1×; tipography dois pouvi → dois ouvidos; no proselytizing; Valeu !!!',
    excerptEs:
      'Dichos: «Deus deu dois ouvidos e uma boca» — oír 2× / hablar 1×; tipografía dois pouvi → dois ouvidos; sin proselitismo; ¡Valeu !!!',
    slug: 'inspecao-expressao-deus-deu-dois-ouvidos',
    date: '2026-08-04T14:20:00.000Z',
    seriesOrder: 12,
    seriesLabel: 'Deus deu dois ouvidos · expressão',
    coverImage: '/imagens/inspecoes/deus-deu-dois-ouvidos-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDeusDeuDoisOuvidosPost,
  buildDeusDeuDoisOuvidosBodies
};
