'use strict';

/**
 * Inspeção Expressões · «Deus abençoe»
 * Bênção oral BR — despedida, desejo de bem, tipografia «Deus Abenço».
 * Respeito à fé; sem proselitismo. Ficha ≠ catecismo.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildDeusAbencoeBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const jesusudavi = '/posts/post-inspecao-expressao-jesusudavi.html';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const obrigado = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';

  const body = `## Escopo

Inspeção editorial da expressão **«[Deus abençoe](${self})»** — bênção viva no português do Brasil: desejo de bem, despedida com calor, fecho de conversa. Pedido do lab: forma oral truncada **«Deus Abenço»** → forma canónica **Deus abençoe**. Irmã de [jesusamando](${jesusamando}), [filho de deus](${filhoDeDeus}) e [muito obrigado](${obrigado}); solo da [língua portuguesa](${lingua}).

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** na fala e na escrita corrente. Respeito à fé de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ catecismo. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **Deus abençoe** (também: *Deus te abençoe*, *Deus abençoe você*, *abençoe*) |
| Tipo | Expressão — bênção × despedida × desejo de bem |
| Forma canónica lab | **Deus abençoe** |
| Tipografia / oral truncado | **Deus Abenço** → **Deus abençoe** |
| Núcleo semântico | Bênção · cuidado · despedida · boa vontade |
| Escala oral irmã | [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) · [jesusudavi](${jesusudavi}) / [meudeusdoceu](${meudeusdoceu}) · [muito obrigado](${obrigado}) |
| Tipo BudGanja | Expressão — mapa de usos com limites claros |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [Faça o melhor!](${mantra}) · [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) |
| Elo afecto | [mãe](${mae}) · [alma](${alma}) · [Padre Ticão](${padreTicao}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Nota |
|-------|------|
| **Deus abençoe** | Canónica lab — bênção completa (subjuntivo) |
| Deus te abençoe / Deus abençoe você | Com destinatário explícito |
| abençoe / te abençoe | Forma curta — mesmo ofício |
| **Deus Abenço** | Tipografia / oral truncado — **→ Deus abençoe** |
| Deus abençoe! | Exclamação — calor na saída |

**Veredicto de forma:** o laboratório ficheia **Deus abençoe** como âncora; **Deus Abenço** fica como pedido/tipografia a corrigir — não como doutrina.

## Mapa de usos

| Uso | Leitura laboratorial | Bom × mau |
|-----|----------------------|-----------|
| **Bênção / desejo de bem** | Pedir ou desejar cuidado divino / bem-estar a alguém | Bom: [gesto](${gesto}) de cuidado · Mau: chantagem («se Deus abençoar, então…») |
| **Despedida** | Fechar conversa, chamada, mensagem | Bom: calor sem pressa · Mau: fórmula vazia para cortar sem [respeito](${respeito}) |
| **Gratidão alargada** | Depois de ajuda — vizinho de [muito obrigado](${obrigado}) | Bom: reconhecer o outro · Mau: substituir ofício por só bênção |
| **Comunidade / pastoral** | Linguagem de acolhimento | Bom: elo [Padre Ticão](${padreTicao}) · Mau: excluir quem não crê |
| **Ofício** | Depois da bênção — trabalhar | [Faça o melhor!](${mantra}) |

**H1:** *Deus abençoe* é **bênção oral viva** — desejo de bem e despedida no mesmo sintagma.  
**H2:** **Deus Abenço** = forma truncada / tipografia; canónico = **Deus abençoe**.  
**H3:** a ficha **mapeia** usos; **não** ensina doutrina nem exige crença.  
**H4:** fecho BudGanja = [gesto](${gesto}) + [respeito](${respeito}) + [Faça o melhor!](${mantra}).

## Relação com irmãs orais

| Expressão | Plano dominante | Quando |
|-----------|-----------------|--------|
| [jesusamando](${jesusamando}) | Afeto / espanto leve | Calor na voz |
| [filho de deus](${filhoDeDeus}) | Título · dignidade | Honrar / exclamar |
| [jesusudavi](${jesusudavi}) / [meudeusdoceu](${meudeusdoceu}) | Assombro alto | Espanto |
| [muito obrigado](${obrigado}) | Gratidão | Receber ajuda |
| **Deus abençoe** | Bênção · despedida | Desejar bem / sair com cuidado |

**Veredicto de escala:** *Deus abençoe* aponta **para fora** (desejo ao outro); não é só termómetro do peito de quem fala.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Abençoar** | Desejar bem (fé ou cultura) | Respeito · sem doutrina |
| **Despedir** | Fechar com calor | [Gesto](${gesto}) de saída |
| **Acolher** | Pastoral / família / rua | Elo [mãe](${mae}) · [Padre Ticão](${padreTicao}) |
| **Agradecer alargado** | Depois do [muito obrigado](${obrigado}) | Rede de cuidado |
| **Fechar com ofício** | Depois da frase | [Faça o melhor!](${mantra}) · [verdade](${verdade}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) | Irmãs — calor × dignidade |
| [muito obrigado](${obrigado}) | Gratidão vizinha da bênção |
| [Faça o melhor!](${mantra}) | Depois do desejo — o ofício |
| [língua portuguesa](${lingua}) | Solo da forma viva |
| [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) | Acto · honra · crédito |
| [mãe](${mae}) · [alma](${alma}) | Cuidado e centro |
| [Padre Ticão](${padreTicao}) | Legado de cuidado no catálogo |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmãs | [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) · [muito obrigado](${obrigado}) |
| Língua | [língua portuguesa](${lingua}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |
| Cuidado | [mãe](${mae}) · [Padre Ticão](${padreTicao}) |

## Limites

- Não é aula de religião, dogma ou juízo sobre quem crê ou não crê.  
- Não usa a bênção para excluir, humilhar ou chantagem.  
- Não substitui [verdade](${verdade}) nem método — bênção ≠ prova laboratorial.  
- «Deus Abenço» truncado fica mapeado; a âncora é **Deus abençoe**.  
- Elo [Padre Ticão](${padreTicao}) = legado de cuidado; **não** afiliação eclesiástica desta ficha.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *Deus abençoe* fichado como **bênção e despedida** viva; tipografia **Deus Abenço → Deus abençoe**; irmã de [jesusamando](${jesusamando}) / [filho de deus](${filhoDeDeus}) / [muito obrigado](${obrigado}); fecho [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ filho de deus](${filhoDeDeus}) · [▶ muito obrigado](${obrigado}) · [▶ Língua portuguesa](${lingua}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“Deus abençoe”** (God bless / may God bless you). Brazilian oral blessing and farewell. Lab tipography: **Deus Abenço → Deus abençoe**. Sisters [jesusamando](${jesusamando}), [filho de deus](${filhoDeDeus}), [muito obrigado](${obrigado}).

> Independent BudGanja audit. Respect for faith; **no** proselytizing. Sheet ≠ catechism.

## Object

| Field | Value |
|-------|-------|
| Saying | **Deus abençoe** (also *Deus te abençoe*) |
| Tipography | **Deus Abenço → Deus abençoe** |
| Type | Blessing × farewell × goodwill |
| Links | [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) · [muito obrigado](${obrigado}) · [gesture](${gesto}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** living oral blessing — wish and farewell.  
**H2:** truncated **Deus Abenço** maps to canonical **Deus abençoe**.  
**H3:** maps uses; does not teach doctrine.  
**H4:** close with [gesture](${gesto}), [respect](${respeito}), [Do your best!](${mantra}).

## Verdict

**Approved** — blessing · farewell · care; [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ Do your best!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección de **«Deus abençoe»** (Dios te bendiga). Bendición y despedida oral BR. Tipografía: **Deus Abenço → Deus abençoe**. Hermanas [jesusamando](${jesusamando}), [filho de deus](${filhoDeDeus}), [muito obrigado](${obrigado}).

> Auditoría independiente. Respeto a la fe; **sin** proselitismo. Ficha ≠ catecismo.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **Deus abençoe** |
| Tipografía | **Deus Abenço → Deus abençoe** |
| Tipo | Bendición × despedida × buena voluntad |
| Vínculos | [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) · [muito obrigado](${obrigado}) · [gesto](${gesto}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** bendición oral viva.  
**H2:** **Deus Abenço** truncado → **Deus abençoe**.  
**H3:** mapea usos; no enseña doctrina.  
**H4:** cierre con [gesto](${gesto}), [respeto](${respeito}), [¡Haz lo mejor!](${mantra}).

## Veredicto

**Aprobada** — bendición · despedida · cuidado; [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ jesusamando](${jesusamando}) · [▶ ¡Haz lo mejor!](${mantra}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildDeusAbencoePost() {
  const { body, contentEn, contentEs } = buildDeusAbencoeBodies();
  return expressaoPost({
    title: 'Inspeção: Deus abençoe — bênção, despedida e tipografia Deus Abenço',
    titleEn: 'Inspection: Deus abençoe — blessing, farewell and tipography Deus Abenço',
    titleEs: 'Inspección: Deus abençoe — bendición, despedida y tipografía Deus Abenço',
    excerpt:
      'Expressões: «Deus abençoe» — bênção e despedida BR; tipografia Deus Abenço → Deus abençoe; sem proselitismo; Faça o melhor!',
    excerptEn:
      'Sayings: “Deus abençoe” — BR blessing and farewell; tipography Deus Abenço → Deus abençoe; no proselytizing; Do your best!',
    excerptEs:
      'Dichos: «Deus abençoe» — bendición y despedida BR; tipografía Deus Abenço → Deus abençoe; sin proselitismo; ¡Haz lo mejor!',
    slug: 'inspecao-expressao-deus-abencoe',
    date: '2026-08-03T23:30:00.000Z',
    seriesOrder: 11,
    seriesLabel: 'Deus abençoe · expressão',
    coverImage: '/imagens/inspecoes/deus-abencoe-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildDeusAbencoePost,
  buildDeusAbencoeBodies
};
