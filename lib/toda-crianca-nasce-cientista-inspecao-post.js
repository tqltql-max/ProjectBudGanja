'use strict';

/**
 * Inspeção Expressões · Toda criança nasce cientista
 * Citação de campo (Arleu Barbosa Viana-Junior / CNN Brasil) —
 * chegou ao laboratório como mensagem da mãe.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemTodaCriancaNasceCientistaPt() {
  return `Toda criança nasce cientista —
não por diploma,
por necessidade de mundo.
Põe o dedo, pergunta,
levanta a pedra,
não tem vergonha do porquê.

Depois a gente cresce.
Aprende a não perguntar.
Guarda o jaleco no armário
e chama de maturidade
o que às vezes é só medo
de parecer criança outra vez.

O campo devolve o ofício:
mão na terra,
olho no inseto,
paciência de quem ainda descobre.
Não é voltar atrás.
É lembrar o método
que já estava no peito.

A mãe mandou o recado.
O laboratório leu.
Fica.
Conta gotas.
Planta à beira.
Chama a Vida pelo nome verdadeiro:

Valeu !!!`;
}

function poemTodaCriancaNasceCientistaEn() {
  return `Every child is born a scientist —
not by diploma,
by need of the world.
A finger, a question,
a stone lifted,
no shame in why.

Then we grow.
We learn not to ask.
We put the lab coat away
and call maturity
what is sometimes only fear
of looking like a child again.

The field gives the craft back:
hand in the soil,
eye on the insect,
patience of one who still discovers.
It is not going backwards.
It is remembering the method
that was already in the chest.

The mother sent the note.
The laboratory read it.
Stay.
Count drops.
Plant at the edge.
Call Vida by its true name:

Valeu !!!`;
}

function poemTodaCriancaNasceCientistaEs() {
  return `Toda niña y todo niño nace científico —
no por diploma,
por necesidad de mundo.
Pone el dedo, pregunta,
levanta la piedra,
no tiene vergüenza del porqué.

Después crecemos.
Aprendemos a no preguntar.
Guardamos la bata
y llamamos madurez
a lo que a veces es solo miedo
de parecer niño otra vez.

El campo devuelve el oficio:
mano en la tierra,
ojo en el insecto,
paciencia de quien aún descubre.
No es volver atrás.
Es recordar el método
que ya estaba en el pecho.

La madre mandó el recado.
El laboratorio lo leyó.
Quédate.
Cuenta gotas.
Siembra a la orilla.
Llama a Vida por su nombre verdadero:

¡Valeu !!!`;
}

function buildTodaCriancaNasceCientistaBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const poemHref = '/vida/#poema=toda-crianca-nasce-cientista';
  const self = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const mensagem = '/posts/post-inspecao-palavra-mensagem.html';
  const planta = '/posts/post-inspecao-palavra-planta.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const teoriaCordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const cnn =
    'https://www.cnnbrasil.com.br/ciencia/cupins-criam-ar-condicionado-que-funciona-melhor-do-que-usados-por-humanos/';
  const scholar = 'https://scholar.google.com.br/citations?user=2R5Lh3IAAAAJ';
  const gleiser =
    'https://feeds.folha.uol.com.br/fsp/cienciasaude/135893-toda-crianca-nasce-cientista.shtml';

  const body = `## Escopo

Inspeção editorial da frase viva **«[Toda criança nasce cientista](${self})»** — recado de curiosidade e de **trabalho de campo**. O laboratório não inventou a citação: ela entrou como [mensagem](${mensagem}) da [mãe](${mae}). O texto citado, na forma deste cartão, é de **Arleu Barbosa Viana-Junior** (professor da Universidade Estadual da Paraíba; líder do recorte de **predação** num projecto de ecologia no Cerrado), publicado pela [CNN Brasil](${cnn}) a propósito de campo na Chapada dos Veadeiros.

> **Nota metodológica:** auditoria independente BudGanja. Objecto = a **frase** e o **caminho de chegada** (recado de casa). Crédito público do autor e da reportagem; **ficha ≠ biografia** de Arleu, **≠** currículo da UEPB, **≠** manual de ciência infantil, **≠** afiliação com Instituto Serrapilheira, CNN ou UEPB. A fórmula «toda criança nasce cientista» circula noutros textos (p. ex. [Marcelo Gleiser, *Folha*, 2013](${gleiser})) — **não** fundir versões.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão (lab) | **Toda criança nasce cientista** |
| Forma plena (citação) | *Toda criança nasce cientista, pela necessidade de descoberta do mundo, mas acabamos perdendo isso ao crescer. Fazer esse tipo de trabalho de campo é como voltar a ser criança e cientista por natureza.* |
| Tipo | Citação de campo · frase viva de ofício científico |
| Autor da citação | **Arleu Barbosa Viana-Junior** — professor, UEPB; líder do projecto de predação no recorte da reportagem |
| Via pública | [CNN Brasil · cupins / campo no Cerrado](${cnn}) |
| Chegada ao lab | [Mensagem](${mensagem}) da [mãe](${mae}) — cartão com a citação |
| Tipo BudGanja | Expressão — curiosidade × campo × [Vida](${vida}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo vivo | [planta](${planta}) · [inseto](${inseto}) · [selvagem](${selvagem}) · [criatividade](${criatividade}) |
| Data | ${inspected} |

## A citação, palavra a palavra

> Toda criança nasce cientista, pela necessidade de descoberta do mundo, mas acabamos perdendo isso ao crescer. Fazer esse tipo de trabalho de campo é como voltar a ser criança e cientista por natureza.
>
> — **Arleu Barbosa Viana-Junior**, professor da Universidade Estadual da Paraíba e líder do projecto sobre predação. Via [CNN Brasil](${cnn}).

| Peça | Leitura laboratorial | Bom × mau |
|------|----------------------|-----------|
| **Toda criança nasce cientista** | Curiosidade como método nativo — perguntar, tocar, testar | Bom: honrar o *porquê* · Mau: romantizar risco sem cuidado |
| **necessidade de descoberta** | O mundo pede mapa; a criança mapeia com o corpo | Bom: ofício · Mau: forçar «génio» em criança |
| **acabamos perdendo isso ao crescer** | Escola, medo e pose de adulto podem calar a pergunta | Bom: nomear a perda · Mau: desprezar o adulto que ainda pergunta |
| **trabalho de campo** | Mão na [terra](${planta}), olho no [inseto](${inseto}), dados no caderno | Bom: método · Mau: turismo de jaleco |
| **voltar a ser criança e cientista por natureza** | Lembrar o método, não fingir idade | Bom: ofício vivo · Mau: infantilizar a ciência |

**H1:** a frase **não** diz que criança = doutor; diz que o **método de descobrir** já está no peito.  
**H2:** o campo (Cerrado, predação, cupinzeiro) é o **exemplo** da reportagem — não o único campo do mundo.  
**H3:** no BudGanja, inspecionar [planta](${planta}), palavra e [gesto](${gesto}) também é campo — com [respeito](${respeito}) e [verdade](${verdade}).

## Como chegou: mensagem da mãe

| Camada | O que é | O que não é |
|--------|---------|-------------|
| **Cartão** | Objecto recebido — citação + atribuição | Não é texto da mãe; ela **enviou** o recado |
| **[Mãe](${mae})** | Caminho doméstico do ofício: casa manda ciência para o lab | **Sem** nome, biografia nem retrato privados |
| **[Mensagem](${mensagem})** | Conteúdo que se envia e deixa rasto | Sinal ≠ mensagem — aqui o conteúdo é a frase |
| **Laboratório** | Ficha a citação, credita a fonte, liga à [Vida](${vida}) | Não adopta a frase como slogan de marca |

**Veredicto de chegada:** o recado de casa **abre** a inspeção; a [CNN Brasil](${cnn}) **ancora** a autoria pública.

## Contexto público (o bastante)

A reportagem descreve um programa de formação em ecologia quantitativa (Instituto Serrapilheira) com trabalho de campo na **Chapada dos Veadeiros** (Cavalcante, GO): temperatura de cupinzeiros, predação de lagartas com modelos de massinha, e o Cerrado sob fogo e espécie invasora. Arleu aparece como **líder do recorte de predação**. Perfil académico público: [Google Scholar](${scholar}) (ecologia, UEPB). Esta ficha **não** resume o paper nem o currículo.

A abertura «toda criança nasce cientista» também aparece noutros autores (p. ex. [Gleiser 2013](${gleiser}), e a fala popular de Neil deGrasse Tyson sobre criança que vira pedra e pétala). **Esta ficha ancora a versão de Arleu** — a que liga a perda da curiosidade ao **voltar ao campo**.

## Rede aparentada

| Ficha | Relação |
|-------|---------|
| [mãe](${mae}) · [mensagem](${mensagem}) | Caminho de chegada |
| [planta](${planta}) · [inseto](${inseto}) · [selvagem](${selvagem}) | Campo vivo — o que o Cerrado inspecciona |
| [criatividade](${criatividade}) · [caminho](${caminho}) | Perguntar sem pose |
| [Teoria das cordas](${teoriaCordas}) | Programa de física **aberto** — o *porquê* não fecha com o nome grande |
| [gesto](${gesto}) · [verdade](${verdade}) · [respeito](${respeito}) | Ofício depois da frase |
| [vida](${vidaPalavra}) · trilha [Vida](${vida}) | Criança, casa, descoberta |
| [língua portuguesa](${lingua}) | Frase viva em PT-BR |
| [Valeu !!!](${mantra}) | Depois da citação — trabalhar |

## Poema Vida

[Toda criança nasce cientista](${poemHref}) — verso do laboratório a partir da citação e do recado de casa; **não** substitui as palavras de Arleu.

## Limites

- Não inventa vida privada de Arleu nem da [mãe](${mae}) que enviou o cartão.  
- Não funde esta citação com a coluna de Gleiser nem com Tyson.  
- Não é aula de ecologia, protocolo de predação, nem curso para crianças.  
- Não pede que criança vá sozinha ao campo; [respeito](${respeito}) e cuidado primeiro.  
- Sem afiliação com UEPB, Serrapilheira, CNN Brasil ou o projecto citado.

## Veredicto

**Aprovada na série Expressões e Ditados populares** — *Toda criança nasce cientista* fichada como **citação de campo** (Arleu Barbosa Viana-Junior / [CNN Brasil](${cnn})), chegada como [mensagem](${mensagem}) da [mãe](${mae}); o campo devolve o método que o crescer às vezes esconde; fecho [Valeu !!!](${mantra}).

[▶ Expressões](${hub}) · [▶ Mãe](${mae}) · [▶ Mensagem](${mensagem}) · [▶ Inseto](${inseto}) · [▶ Poema](${poemHref}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of **“[Every child is born a scientist](${self})”** — a fieldwork quote. It entered the lab as a [message](${mensagem}) from [mother](${mae}). The wording on the card is by **Arleu Barbosa Viana-Junior** (UEPB; predation lead in the report), published by [CNN Brasil](${cnn}) from Cerrado field work (Chapada dos Veadeiros).

> Independent BudGanja audit. Object = the **sentence** and the **path of arrival**. **Not** a biography, **not** a kids’ science course, **not** affiliation with UEPB / Serrapilheira / CNN. Other texts use a similar opening (e.g. [Gleiser, *Folha*, 2013](${gleiser})) — **do not** merge versions.

## Object

| Field | Value |
|-------|-------|
| Saying | **Toda criança nasce cientista** |
| Author | Arleu Barbosa Viana-Junior — UEPB; predation project lead in the CNN piece |
| Public source | [CNN Brasil](${cnn}) |
| Lab arrival | [Message](${mensagem}) from [mother](${mae}) |
| Links | [plant](${planta}) · [insect](${inseto}) · [gesture](${gesto}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Verdict

**Approved** — fieldwork quote (Arleu / CNN); arrived as a mother’s message; the field returns the method growing-up sometimes hides; close with [Valeu !!!](${mantra}).

[▶ Expressions](${hub}) · [▶ Mother](${mae}) · [▶ Poem](${poemHref}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[Toda criança nasce cientista](${self})»** — cita de trabajo de campo. Entró al laboratorio como [mensaje](${mensagem}) de la [madre](${mae}). El texto del cartel es de **Arleu Barbosa Viana-Junior** (UEPB; líder del recorte de depredación), publicado por [CNN Brasil](${cnn}) desde el Cerrado (Chapada dos Veadeiros).

> Auditoría independiente. Objeto = la **frase** y el **camino de llegada**. **No** es biografía, **no** es curso infantil, **no** hay afiliación con UEPB / Serrapilheira / CNN. Otros textos usan un arranque parecido (p. ej. [Gleiser, *Folha*, 2013](${gleiser})) — **no** fusionar versiones.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **Toda criança nasce cientista** |
| Autor | Arleu Barbosa Viana-Junior — UEPB; líder del proyecto de depredación en la pieza |
| Fuente pública | [CNN Brasil](${cnn}) |
| Llegada al lab | [Mensaje](${mensagem}) de la [madre](${mae}) |
| Vínculos | [planta](${planta}) · [insecto](${inseto}) · [gesto](${gesto}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Veredicto

**Aprobada** — cita de campo (Arleu / CNN); llegó como mensaje de la madre; el campo devuelve el método que crecer a veces esconde; cierre [¡Valeu !!!](${mantra}).

[▶ Expresiones](${hub}) · [▶ Madre](${mae}) · [▶ Poema](${poemHref}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildTodaCriancaNasceCientistaPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildTodaCriancaNasceCientistaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 19;
  return expressaoPost({
    title:
      'Inspeção: Toda criança nasce cientista — recado de campo e mensagem da mãe',
    titleEn:
      'Inspection: Every child is born a scientist — field note and a mother’s message',
    titleEs:
      'Inspección: Toda niña y niño nace científico — recado de campo y mensaje de la madre',
    excerpt:
      'Expressões: Toda criança nasce cientista — citação de Arleu Barbosa Viana-Junior (CNN / campo no Cerrado); chegou como mensagem da mãe; Valeu !!!',
    excerptEn:
      'Sayings: Every child is born a scientist — Arleu Barbosa Viana-Junior (CNN / Cerrado field); arrived as a mother’s message; Valeu !!!',
    excerptEs:
      'Dichos: Toda criança nasce cientista — cita de Arleu Barbosa Viana-Junior (CNN / campo en el Cerrado); llegó como mensaje de la madre; ¡Valeu !!!',
    slug: 'inspecao-expressao-toda-crianca-nasce-cientista',
    date: '2026-08-21T13:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'toda criança nasce cientista · expressão',
    coverImage: '/imagens/inspecoes/toda-crianca-nasce-cientista-cover.jpg',
    sourceUrl:
      'https://www.cnnbrasil.com.br/ciencia/cupins-criam-ar-condicionado-que-funciona-melhor-do-que-usados-por-humanos/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTodaCriancaNasceCientistaPost,
  buildTodaCriancaNasceCientistaBodies,
  poemTodaCriancaNasceCientistaPt,
  poemTodaCriancaNasceCientistaEn,
  poemTodaCriancaNasceCientistaEs
};
