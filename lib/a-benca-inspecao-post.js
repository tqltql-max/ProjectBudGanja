'use strict';

/**
 * Inspeção Expressões · «a bença»
 * Pedir bênção BR — a bença · Deus te abençoe · dorme com Deus · amém.
 * Respeito à fé; sem proselitismo. Ficha ≠ catecismo.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemABencaPt() {
  return `A bença, pai.
A bença, mãe.
Não é contrato.
É a mão que pede
antes de deitar o dia.

Deus te abençoe —
a resposta que devolve o pedido
sem pesar o merecimento.
Quem pede não compra.
Quem abençoa não cobra.

Dorme com Deus.
Não é fuga da noite.
É o quarto inspeccionado:
a luz baixa, o peito ainda cá,
a linha do sono sem chantagem.

Amém.
Tipografia viva: amem.
Selo curto — o sim que fecha
sem transformar a bênção em prova.

Faça o melhor
depois da bença —
com respeito,
sem catecismo,
com o gesto que ainda cabe
nesta mão.`;
}

function poemABencaEn() {
  return `Your blessing, father.
Your blessing, mother.
It is not a contract.
It is the hand that asks
before the day is put to bed.

God bless you —
the answer that returns the request
without weighing desert.
Whoever asks does not buy.
Whoever blesses does not charge.

Sleep with God.
Not a flight from night.
The room inspected:
low light, the chest still here,
the line of sleep without blackmail.

Amen.
Living typing: amem.
A short seal — the yes that closes
without turning blessing into proof.

Do your best
after the blessing —
with respect,
no catechism,
with the gesture that still fits
this hand.`;
}

function poemABencaEs() {
  return `La bendición, padre.
La bendición, madre.
No es contrato.
Es la mano que pide
antes de acostar el día.

Dios te bendiga —
la respuesta que devuelve el pedido
sin pesar el merecimiento.
Quien pide no compra.
Quien bendice no cobra.

Duerme con Dios.
No es huida de la noche.
Es el cuarto inspeccionado:
luz baja, el pecho aún aquí,
la línea del sueño sin chantaje.

Amén.
Tipografía viva: amem.
Sello corto — el sí que cierra
sin convertir la bendición en prueba.

Haz lo mejor
después de la bendición —
con respeto,
sin catecismo,
con el gesto que aún cabe
en esta mano.`;
}

function buildABencaBodies() {
  const inspected = '2026-08-19';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-expressao-a-benca.html';
  const abencoe = '/posts/post-inspecao-expressao-deus-abencoe.html';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const filhoDeDeus = '/posts/post-inspecao-expressao-filho-de-deus.html';
  const obrigado = '/posts/post-inspecao-expressao-muito-obrigado.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const noite = '/posts/post-inspecao-palavra-noite.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const padreTicao = '/posts/post-inspecao-padre-ticao.html';
  const wikiBencao = 'https://pt.wiktionary.org/wiki/bênção';
  const wikiAmen = 'https://pt.wiktionary.org/wiki/amém';
  const poema = poemABencaPt();

  const body = `## Escopo

Inspeção editorial da expressão **«[a bença](${self})»** — o **pedido** de bênção no português do Brasil: criança ou adulto que pede à [mãe](${mae}) / ao pai / a um mais velho. O ritual vivo fecha em três irmãs de ofício: **[Deus te abençoe](${abencoe})** (a resposta), **dorme com Deus** (a [noite](${noite})) e **amém** (o selo; tipografia **amem**). Irmã da ficha [Deus abençoe](${abencoe}) — aquela **dá**; esta **pede** e **deita**.

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **forma viva** (pedir, responder, deitar, selar). Respeito à fé de quem a usa; **sem** proselitismo nem doutrina. Ficha ≠ catecismo, ≠ manual de reza. Sem afiliação religiosa.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão âncora | **a bença** (oral de *bênção*) |
| Tipo | Expressão — pedido × resposta × noite × selo |
| Sequência viva | pedir **a bença** → **Deus te abençoe** → **dorme com Deus** → **amém** |
| Tipografia | **benca** / **amem** → **bença** / **amém** |
| Núcleo semântico | Pedir cuidado · receber desejo de bem · deitar em paz · fechar com sim |
| Irmã (dar) | [Deus abençoe](${abencoe}) |
| Tipo BudGanja | Expressão — mapa de rito oral com limites claros |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) · [Faça o melhor!](${mantra}) |
| Elo afecto | [mãe](${mae}) · [alma](${alma}) · [noite](${noite}) · [Padre Ticão](${padreTicao}) |
| Fontes | [bênção](${wikiBencao}) · [amém](${wikiAmen}) |
| Data | ${inspected} |

## Forma e variantes

| Forma | Ofício | Nota |
|-------|--------|------|
| **a bença** / *bença, pai* / *bença, mãe* | **Pedir** | Canónica lab do pedido; oral de *bênção* |
| bênção (forma de livro) | Mesmo núcleo | Grafia plena — a ficha ancora a boca: **bença** |
| **Deus te abençoe** | **Dar** | Resposta ao pedido — ficha-irmã [Deus abençoe](${abencoe}) |
| Deus abençoe / te abençoe | Dar (curta) | Mesmo ofício da irmã |
| **dorme com Deus** / *durma com Deus* | **Noite** | Despedida de deitar — elo [noite](${noite}) |
| boa noite com Deus | Variante | Mesmo plano: deitar com cuidado |
| **amém** | **Selo** | Fecha o rito — hebraico *āmēn* («assim seja») |
| **amem** | Tipografia | Oral / teclado sem acento → **amém** |

**Veredicto de forma:** o laboratório ficheia **a bença** como âncora do **pedido**; **Deus te abençoe** fica na irmã [Deus abençoe](${abencoe}) e nesta sequência; **dorme com Deus** é a noite; **amem → amém** é o selo — não doutrina.

## O rito em quatro peças

| Peça | Quem | Leitura laboratorial | Bom × mau |
|------|------|----------------------|-----------|
| **A bença** | Quem pede | [Gesto](${gesto}) de honra — mão, voz, às vezes beijo na mão | Bom: [respeito](${respeito}) · Mau: obrigação que humilha |
| **Deus te abençoe** | Quem dá | Devolve o pedido sem fatura | Bom: calor · Mau: chantagem («só se…») — ver [Deus abençoe](${abencoe}) |
| **Dorme com Deus** | Quem deita / quem cuida | A [noite](${noite}) como fase, não como abandono | Bom: quarto inspeccionado · Mau: silenciar medo com fórmula |
| **Amém** | Quem fecha | Selo curto — «assim seja» cultural | Bom: fechar · Mau: transformar em prova de fé |

**H1:** *a bença* é o **pedido** — distinto de [Deus abençoe](${abencoe}), que é o **dom**.  
**H2:** *Deus te abençoe* é a **resposta** viva ao pedido; a ficha-irmã guarda a despedida diurna.  
**H3:** *dorme com Deus* inspecciona a [noite](${noite}) — deitar com cuidado, sem sermão de sono.  
**H4:** *amém* / tipografia *amem* é o **selo**; não substitui [verdade](${verdade}) nem método.  
**H5:** depois do rito — [Faça o melhor!](${mantra}) no que ainda cabe nesta mão.

## Relação com irmãs orais

| Expressão | Plano | Quando |
|-----------|-------|--------|
| **a bença** | Pedido | Antes de sair / deitar / honrar mais velho |
| [Deus abençoe](${abencoe}) | Dádiva / despedida | Responder ou sair com calor |
| **dorme com Deus** | Noite | Fechar o dia |
| **amém** | Selo | Fechar a frase |
| [muito obrigado](${obrigado}) | Gratidão | Depois de receber |
| [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) | Calor / dignidade | Outra prateleira «Deus» |
| [meudeusdoceu](${meudeusdoceu}) | Assombro | Não é bênção de deitar |

**Veredicto de escala:** pedir **não** é o mesmo que dar. Esta ficha honra o **pedido** e a **noite**; a irmã honra a **saída diurna**.

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Pedir bença** | Honrar pai / [mãe](${mae}) / mais velho | [Gesto](${gesto}) · [respeito](${respeito}) |
| **Receber Deus te abençoe** | Ouvir o desejo de bem | Elo [Deus abençoe](${abencoe}) |
| **Dormir com Deus** | Boa-noite com cuidado | [Noite](${noite}) · trilha [Vida](${vida}) |
| **Dizer amém** | Fechar | Selo — sem prova |
| **Seguir** | Depois do rito | [Faça o melhor!](${mantra}) |

## Rede aparentada

| Expressão / palavra | Relação |
|---------------------|---------|
| [Deus abençoe](${abencoe}) | Irmã — o **dar**; aqui o **pedir** |
| [mãe](${mae}) | A quem muitas vezes se pede a bença |
| [noite](${noite}) | Solo de *dorme com Deus* |
| [muito obrigado](${obrigado}) | Gratidão vizinha |
| [jesusamando](${jesusamando}) · [filho de deus](${filhoDeDeus}) | Família oral «Deus» — outro tom |
| [gesto](${gesto}) · [respeito](${respeito}) · [verdade](${verdade}) | Acto · honra · crédito |
| [alma](${alma}) · [Padre Ticão](${padreTicao}) | Centro e legado de cuidado |
| [língua portuguesa](${lingua}) | Solo da forma viva |
| [Faça o melhor!](${mantra}) | Depois da bença — o ofício |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Expressões | [Expressões e Ditados](${hub}) |
| Hub Palavras | [Palavras](${hubPalavras}) |
| Irmã (dar) | [Deus abençoe](${abencoe}) |
| Noite | [noite](${noite}) |
| Cuidado | [mãe](${mae}) · [Padre Ticão](${padreTicao}) |
| Mantra | [Faça o melhor!](${mantra}) |
| Vida / Diário | [Vida](${vida}) · [Diário](${diario}) |

## O poema

\`\`\`poem
${poema}
\`\`\`

## Limites

- Não é aula de religião, dogma ou juízo sobre quem crê ou não crê.  
- Não usa a bença para humilhar criança, chantagem ou exclusão.  
- Não substitui [verdade](${verdade}) nem método — bênção ≠ prova.  
- *Dorme com Deus* **não** é protocolo de sono nem conselho clínico.  
- Tipografia **amem** / **benca** fica mapeada; âncoras = **amém** / **bença**.  
- Elo [Padre Ticão](${padreTicao}) = legado de cuidado; **não** afiliação eclesiástica.  
- O poema é **criação do laboratório**.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — *a bença* fichada como **pedido** vivo; sequência **Deus te abençoe** · **dorme com Deus** · **amém**; irmã [Deus abençoe](${abencoe}); elos [mãe](${mae}), [noite](${noite}), [Faça o melhor!](${mantra}).

[▶ Expressões](${hub}) · [▶ Deus abençoe](${abencoe}) · [▶ mãe](${mae}) · [▶ noite](${noite}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian **“a bença”** (asking a blessing — oral form of *bênção*). Living ritual: **ask** → **[Deus te abençoe](${abencoe})** (God bless you) → **dorme com Deus** (sleep with God) → **amém** (amen; typed **amem**). Sister sheet [Deus abençoe](${abencoe}) **gives**; this sheet **asks** and **puts the day to bed**.

> Independent BudGanja audit. Respect for faith; **no** proselytizing. Sheet ≠ catechism.

## Object

| Field | Value |
|-------|-------|
| Anchor | **a bença** |
| Sequence | ask → God bless you → sleep with God → amen |
| Tipography | **benca** / **amem** → **bença** / **amém** |
| Links | [Deus abençoe](${abencoe}) · [mãe](${mae}) · [noite](${noite}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## Reading

**H1:** *a bença* is the **request** — distinct from giving.  
**H2:** *Deus te abençoe* is the living **answer**.  
**H3:** *dorme com Deus* inspects [night](${noite}) as care, not a sleep protocol.  
**H4:** *amém* / typed *amem* is the **seal**, not proof.  
**H5:** then [Do your best!](${mantra}).

## The poem

\`\`\`poem
${poemABencaEn()}
\`\`\`

## Verdict

**Approved** — asking a blessing · night · amen; sister [Deus abençoe](${abencoe}); [Do your best!](${mantra}).

[▶ Expressions](${hub}) · [▶ Deus abençoe](${abencoe}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«a bença»** (pedir la bendición — forma oral de *bênção*). Rito vivo: **pedir** → **[Deus te abençoe](${abencoe})** → **dorme com Deus** → **amém** (teclado **amem**). La ficha hermana [Deus abençoe](${abencoe}) **da**; esta **pide** y **acuesta el día**.

> Auditoría independiente. Respeto a la fe; **sin** proselitismo. Ficha ≠ catecismo.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **a bença** |
| Secuencia | pedir → Dios te bendiga → duerme con Dios → amén |
| Tipografía | **benca** / **amem** → **bença** / **amém** |
| Vínculos | [Deus abençoe](${abencoe}) · [mãe](${mae}) · [noite](${noite}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## Lectura

**H1:** *a bença* es el **pedido**.  
**H2:** *Deus te abençoe* es la **respuesta**.  
**H3:** *dorme com Deus* inspecciona la [noche](${noite}).  
**H4:** *amém* / *amem* es el **sello**, no una prueba.  
**H5:** luego [¡Haz lo mejor!](${mantra}).

## El poema

\`\`\`poem
${poemABencaEs()}
\`\`\`

## Veredicto

**Aprobada** — pedir bendición · noche · amén; hermana [Deus abençoe](${abencoe}); [¡Haz lo mejor!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Deus abençoe](${abencoe}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wikiBencao };
}

function buildABencaPost(seriesOrder) {
  const { body, contentEn, contentEs, wikiBencao } = buildABencaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 15;
  return expressaoPost({
    title:
      'Inspeção: a bença — pedir bênção, dorme com Deus e amém',
    titleEn:
      'Inspection: a bença — asking a blessing, sleep with God and amen',
    titleEs:
      'Inspección: a bença — pedir la bendición, duerme con Dios y amén',
    excerpt:
      'Expressões: «a bença» — pedido BR de bênção; sequência Deus te abençoe · dorme com Deus · amém (tipografia amem); irmã de Deus abençoe; sem catecismo.',
    excerptEn:
      'Sayings: “a bença” — BR request for a blessing; sequence God bless you · sleep with God · amen (typed amem); sister of Deus abençoe; no catechism.',
    excerptEs:
      'Dichos: «a bença» — pedido BR de bendición; secuencia Dios te bendiga · duerme con Dios · amén (teclado amem); hermana de Deus abençoe; sin catecismo.',
    slug: 'inspecao-expressao-a-benca',
    date: '2026-08-20T02:20:00.000Z',
    seriesOrder: order,
    seriesLabel: 'a bença · expressão',
    coverImage: '/imagens/inspecoes/a-benca-cover.jpg',
    sourceUrl: wikiBencao,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildABencaPost,
  buildABencaBodies,
  poemABencaPt,
  poemABencaEn,
  poemABencaEs
};
