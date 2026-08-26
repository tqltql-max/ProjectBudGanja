'use strict';

/**
 * Inspeção Palavras · buguei / bugar / bug
 * Eixos: inseto → falha → peito «ruim» · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildBugueiBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const animais = '/animais/';
  const joaninha = '/posts/post-inspecao-personagem-joaninha-joana.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const aff = '/posts/post-inspecao-palavra-aff.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const jesusamado = '/posts/post-inspecao-expressao-jesusamado.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikiBug = 'https://en.wikipedia.org/wiki/Software_bug';
  const wikiInseto = 'https://pt.wikipedia.org/wiki/Inseto';
  const wiktBug = 'https://en.wiktionary.org/wiki/bug';

  const body = `## Escopo

Inspeção editorial da forma oral brasileira **buguei** (e da família **bugar** / **bug**) — do **inseto** inglês *bug* à falha de máquina e, no peito BR, ao «deu ruim na cabeça». Esta ficha cobre a **relação com insetos**, a **alteração de sentido** que fez o vocábulo parecer **algo ruim**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · bug](${wiktBug}), [Software bug](${wikiBug}), [Inseto](${wikiInseto}), uso oral BR. **Ficha ≠ diagnóstico clínico** (não é «bug» médico). Sem afiliação comercial de software.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **buguei** (1.ª pessoa — «eu buguei») |
| Família | *bug* · *bugar* · *bugado* · *bugou* · *desbugar* |
| Classe | Verbo informal (pt-BR) ← substantivo inglês *bug* |
| Étimo (trabalho) | Ingl. *bug* «inseto» → falha / defeito → empréstimo BR |
| Tipo BudGanja | Palavra — viagem inseto → erro → peito |
| Elo inseto / vida | [animal](${animal}) · [Joaninha](${joaninha}) · [Animais](${animais}) |
| Elo oralidade | [aff](${aff}) · [já](${ja}) · [meudeusdoceu](${meudeusdoceu}) · [jesusamado](${jesusamado}) |
| Elo ofício | [backspace](${backspace}) · [verdade](${verdade}) · [gesto](${gesto}) · [Valeu !!!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) — empréstimo vivo |
| Fonte | [Software bug](${wikiBug}) · [bug (EN)](${wiktBug}) |
| Data | ${inspected} |

## 2. Relação com insetos

| Camada | Leitura | Nota |
|--------|---------|------|
| **Ingl. *bug*** | Inseto pequeno — mosca, besouro, «bicho» | Sentido biológico antigo |
| **Praga / incómodo** | Inseto que **incomoda** a casa ou a colheita | Já carrega tom negativo leve |
| **Máquina** | Falha de sistema baptizada *bug* (folclore da mariposa no relé — [Grace Hopper / Mark II](${wikiBug})) | Inseto literal → metáfora de defeito |
| **Software** | *bug* = erro no código | Insecto some; fica o **ruim** |
| **Português BR** | *bugar* / **buguei** = travar, confundir, «dar tela azul» no peito | Empréstimo oral — inseto quase invisível |

**H-inseto:** a palavra **nasce no bicho**; o laboratório **não apaga** o inseto — inspeta a viagem até ao peito. [Joaninha](${joaninha}) e outros seres do lab lembram: nem todo inseto é «ruim»; o léxico é que **carregou** o estigma.

**Veredicto inseto:** *bug* = insecto → **incómodo** → **defeito**. O bicho ficou no étimo; o uso moderno quase só ouve o **erro**.

## 3. Como foi alterada para parecer algo ruim

Mapa da alteração (origem → pejorativo):

| Fase | Sentido | Tom |
|------|---------|-----|
| 1. Inseto | Animal pequeno | Neutro / biológico |
| 2. Praga | Inseto que estraga | Negativo leve |
| 3. Falha técnica | Defeito na máquina / código | Negativo técnico |
| 4. Empréstimo BR | *bugar* o aparelho | Negativo quotidiano |
| 5. Peito / mente | **Buguei** — travei, confundi, «deu ruim» | Negativo afectivo / social |

### Mecanismos da alteração

| Mecanismo | O que faz | Ressalva BudGanja |
|-----------|-----------|-------------------|
| **Metáfora de praga** | O que «entra» e estraga = inseto ruim | Nem todo insecto estraga |
| **Metáfora de máquina** | Pessoa tratada como aparelho que falhou | Humano ≠ CPU — cuidar do peito |
| **Empréstimo sem crédito** | Usa-se *bug* sem lembrar o bicho | Inspecionar = devolver a viagem |
| **Tom de culpa** | «Buguei» = eu falhei / sou defeituoso | Pode ser **aviso** honesto, não veredicto moral |
| **Contraste oral** | Parece pior que «confundi» ou «travei» | Escolher palavra com [verdade](${verdade}) |

**H-ruim:** a alteração **não** inventa o mal do zero — **amplifica** o lado «praga/defeito» e **apaga** o lado «só um insecto / só um momento». Parecer «algo ruim» = efeito de **selecção de sentido**, não destino eterno da palavra.

**Veredicto alteração:** *buguei* soa a falha porque a história lexical **escolheu** o defeito. O ofício pode **desbugar** o tom: nomear o tranco sem se chamar lixo.

## 4. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Máquina** | «O app bugou» | Bom: descrever falha · Mau: xingar sem inspecionar |
| **Peito / mente** | «Buguei na prova» | Bom: pedir pausa · Mau: vergonha permanente |
| **Social** | «Buguei com a notícia» | Bom: [meudeusdoceu](${meudeusdoceu}) · Mau: parar o [gesto](${gesto}) |
| **Correcção** | «Desbuguei» / [backspace](${backspace}) | Bom: rever · Mau: fingir que não bugou |

## 5. Para que serve · Valeu !!!

| Finalidade | Leitura |
|------------|---------|
| **Nomear o tranco** | Sem dramatizar nem esconder |
| **Lembrar o inseto** | Étimo vivo — literacia da palavra |
| **Separar aviso de insulto** | «Buguei» ≠ «sou um bug» |
| **Voltar ao ofício** | [backspace](${backspace}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — depois do bug, o próximo [gesto](${gesto}) |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Buguei = acabou» = falso · o mantra pede ofício **hoje** |
| Termómetros | [aff](${aff}) · [já](${ja}) · [meudeusdoceu](${meudeusdoceu}) — outros sopros do tranco |

**Veredicto:** Valeu !!! **depois de buguei** — inspecionar o tranco, creditando o insecto na origem, sem transformar a pessoa em defeito.

## Hipóteses (síntese)

**H1:** *bug* = insecto → falha → **buguei** no peito BR.  
**H2:** o tom «ruim» vem da selecção praga/defeito, não do animal em si.  
**H3:** elos = [animal](${animal}) · [joaninha](${joaninha}) · [backspace](${backspace}) · oralidade.  
**H4:** fecho = [Valeu !!!](${mantra}) após o bug.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Animal](${animal}) · [Joaninha](${joaninha}) · [Animais](${animais}) | Elo vivo com seres — nem todo bicho é praga |
| [Aff](${aff}) · [Já](${ja}) · [meudeusdoceu](${meudeusdoceu}) · [jesusamado](${jesusamado}) | Termómetros do peito |
| [Backspace](${backspace}) · [Verdade](${verdade}) · [Gesto](${gesto}) | Desbugar com método |
| [Fogo](${fogo}) | Intensidade do tranco (metáfora) |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo no solo BR |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Depois do bug |

## Limites

- Não patologiza «buguei» como doença.  
- Não romantiza erro de software nem culpa a pessoa por falha de sistema.  
- Folclore da mariposa no Mark II é **história cultural** do termo — não prova única da etimologia de *bug*.

## Status

**Aprovado** — **buguei** fichado: inseto → falha → peito; alteração que parece «ruim» mapeada; elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Animal](${animal}) · [▶ Joaninha](${joaninha}) · [▶ Aff](${aff}) · [▶ Backspace](${backspace}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian oral **buguei** (family *bugar* / *bug*) — from English *bug* (insect) to machine fault to “my mind glitched.” Covers the **insect link**, the **shift that made it sound bad**, and [Valeu !!!](${mantra}).

> Method note: [bug (EN)](${wiktBug}), [Software bug](${wikiBug}), [Insect](${wikiInseto}). Not a clinical diagnosis.

## Object

| Field | Value |
|-------|-------|
| Anchor | **buguei** (“I glitched / froze”) |
| Etymon path | EN *bug* “insect” → defect → BR slang |
| Links | [animal](${animal}) · [Joaninha](${joaninha}) · [aff](${aff}) · [backspace](${backspace}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Insect relation

Insect → pest/nuisance → machine *bug* (defect metaphor) → BR *bugar* / **buguei** (mind/chest freeze). The insect stays in the etymon; modern use mostly hears the **error**.

## How it was altered to seem “bad”

Phases: insect (neutral) → pest (mild negative) → technical fault → device slang → affective “I failed.” Mechanisms: pest metaphor, person-as-machine, borrowing without credit, guilt tone. **Verdict:** sounding “bad” is **sense selection**, not the animal’s destiny — craft can name the stall without calling the person trash.

## Valeu !!!

After **buguei**, inspect the stall, credit the insect origin, return to [gesture](${gesto}) and [Valeu !!!](${mantra}).

## Status

**Approved** — insect → fault → chest; pejorative shift mapped; [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Animal](${animal}) · [▶ Aff](${aff}) · [▶ Backspace](${backspace}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **buguei** (familia *bugar* / *bug*) — del inglés *bug* (insecto) al fallo de máquina y al «se me trabó la cabeza» en BR. Cubre el **vínculo con insectos**, la **alteración** que lo hizo sonar a algo malo, y [¡Valeu !!!](${mantra}).

> Nota: [bug (EN)](${wiktBug}), [Software bug](${wikiBug}), [Insecto](${wikiInseto}). No es diagnóstico clínico.

## Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **buguei** |
| Camino | EN *bug* «insecto» → defecto → jerga BR |
| Vínculos | [animal](${animal}) · [Joaninha](${joaninha}) · [aff](${aff}) · [backspace](${backspace}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Relación con insectos

Insecto → plaga → *bug* de máquina → *bugar* / **buguei** en el pecho. El insecto queda en el étimo; el uso moderno oye sobre todo el **error**.

## Cómo se alteró para parecer algo malo

Fases: insecto → plaga → fallo técnico → jerga de aparato → «fallé». Parecer «malo» = **selección de sentido**, no destino del animal.

## ¡Valeu !!!

Después de **buguei**, inspeccionar el tranco y volver al [gesto](${gesto}) con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — insecto → fallo → pecho; alteración mapeada; [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Animal](${animal}) · [▶ Aff](${aff}) · [▶ Backspace](${backspace}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wikiBug };
}

function buildBugueiPost() {
  const { body, contentEn, contentEs, wikiBug } = buildBugueiBodies();
  return makePalavra({
    title:
      'Inspeção: Buguei — do inseto ao «deu ruim» e Valeu !!!',
    titleEn:
      'Inspection: Buguei — from insect to “it went bad” and Valeu !!!',
    titleEs:
      'Inspección: Buguei — del insecto al «salió mal» y ¡Valeu !!!',
    excerpt:
      'Palavras: «buguei» — de bug (inseto) à falha e ao peito; como o sentido foi alterado para parecer ruim; Valeu !!! depois do tranco.',
    excerptEn:
      'Words: “buguei” — from bug (insect) to fault and the chest; how sense shifted to sound bad; Valeu !!! after the stall.',
    excerptEs:
      'Palabras: «buguei» — de bug (insecto) al fallo y al pecho; cómo el sentido se alteró para sonar malo; ¡Valeu !!! después del tranco.',
    slug: 'inspecao-palavra-buguei',
    date: '2026-08-03T18:00:00.000Z',
    seriesOrder: 34,
    seriesLabel: 'Buguei · palavra',
    coverImage: '/imagens/inspecoes/buguei-palavra-cover.jpg',
    sourceUrl: wikiBug,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBugueiPost,
  buildBugueiBodies
};
