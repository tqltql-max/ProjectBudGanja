'use strict';

/**
 * Inspeção-cruzamento: Raiva × Emoção × Venom × Vida × sentimentos de Divertida Mente.
 * Objecto = a intersecção (mapa emocional), não uma obra isolada.
 */

function artePost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'artes-cultura',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Artes',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function buildCruzamentoRaivaVenomVidaDivertidaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const filme = '/posts/post-inspecao-filme-divertida-mente.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const nojinho = '/posts/post-inspecao-palavra-nojinho.html';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const vida = '/vida/';
  const aguas = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
  const lagrimas = '/posts/post-inspecao-arte-lagrimas-da-vida.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const expressoes = '/biblioteca/inspecoes/#inspecoes-expressoes';

  const body = `## Escopo

Inspeção editorial do **cruzamento** **Raiva × Emoção × Venom × Vida** lido com o quadro de sentimentos de **[Divertida Mente](${filme})** (*Inside Out*, 2015). O objecto **não** é um filme nem uma palavra isolada: é o **mapa** onde a sala de comando da Riley, o «nós» do simbionte, o aviso do veneno da vingança e o «ficar» da [Vida](${vida}) se encontram.

> **Nota metodológica:** auditoria independente BudGanja. Cruzamos fichas já publicadas — Artes, Palavras, Expressões e hub Vida — sem fundir enredos nem inventar cânone partilhado entre Pixar e Marvel. **Não é aconselhamento clínico.** Sem afiliação Disney/Pixar, Sony/Marvel ou Televisa/SBT.

Pergunta-guia: *quando o fogo interno (Raiva) encontra o veneno metafórico (Venom / vingança) e o cuidado de ficar (Vida), o que cada emoção da Riley inspeciona?*

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Cruzamento emocional** — mapa, não obra única |
| Eixos nomeados | [Raiva](${raiva}) · [Emoção](${emocao}) · [Venom](${venom}) · [Vida](${vida}) |
| Quadro de leitura | Cinco sentimentos de [Divertida Mente](${filme}) |
| Tipo BudGanja | Artes — inspeção-cruzamento |
| Hub lexical | [emoção](${emocao}) |
| Elo Expressões | [A vingança nunca é plena…](${vinganca}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** [Divertida Mente](${filme}) dá o **alfabeto** — Alegria, Tristeza, Raiva, Medo, Nojinho têm ofício; nenhuma é lixo.  
**H2:** [Venom](${venom}) / [simbiose](${simbiose}) dão a metáfora do **corpo partilhado** — duas vozes, um volante; escutar impulsos sem entregar o comando.  
**H3:** a [Raiva](${raiva}) nomeada defende limites; a raiva sem mapa vira dose que [envenena a alma](${vinganca}) — aviso da oralidade, não condenação do afecto.  
**H4:** [Vida](${vida}) (contos, poemas, «ficar») é o laboratório do **cuidado com prova** — onde o mapa emocional deixa de ser só ecrã e vira permanência.

Passos:

1. Fixar o quadro das cinco emoções (Riley).  
2. Ler cada emoção nos eixos Raiva / Venom / Vida.  
3. Separar ofício (literacia) de veneno (rancor cultivado).  
4. Amarrar rede BudGanja e declarar limites.

## Quadro Divertida Mente — as cinco na sala de comando

Hub: [emoção](${emocao}). Obra âncora: [Divertida Mente](${filme}).

| Sentimento | Cor | Ofício (filme) | Ficha |
|------------|-----|----------------|-------|
| **Alegria** | Amarelo | Cuidar do bem-estar sem monopolizar | [alegria](${alegria}) |
| **Tristeza** | Azul | Pedir ajuda; honrar a perda | [tristeza](${tristeza}) |
| **Raiva** | Vermelho | Limite e indignação justa | [raiva](${raiva}) |
| **Medo** | Roxo | Antecipar risco | [medo](${medo}) |
| **Nojinho** | Verde | Aversão protetora | [nojinho](${nojinho}) |

Tese herdada do filme: **nenhuma emoção é lixo** — inclusive as que a cultura trata como «más».

## Mapa do cruzamento — cada sentimento × os quatro eixos

### Alegria × Vida (e o risco de monopolizar)

| Eixo | Leitura |
|------|---------|
| Divertida Mente | Quer o bem de Riley; aprende a **partilhar** o botão com a Tristeza |
| Vida | Contos e cuidado — alegria como presença, não performance eterna |
| Venom | O «nós» não é só fúria: há humor e aliança; alegria sem mapa ignora o custo da simbiose |
| Raiva / Emoção | Alegria que cancela a Raiva não cuida — **apaga o alarme** |

### Tristeza × Vida (ficar quando o sal arde)

| Eixo | Leitura |
|------|---------|
| Divertida Mente | Abre o pedido de ajuda; completa memórias |
| Vida | [Águas e Lágrimas](${aguas}) · [Lágrimas da Vida](${lagrimas}) — «ficar»; a raiva que não gritou atraca no mesmo porto que a tristeza |
| Venom | Sem tristeza/perda nomeada, a simbiose vira só poder — sem luto do que se deixa de ser «só eu» |
| Raiva / Emoção | Tristeza e Raiva não se anulam: uma pede banco ao lado; a outra pede limite |

### Raiva × Venom × Expressão (ofício vs veneno)

| Eixo | Leitura |
|------|---------|
| Divertida Mente | Fogo quando o mundo «não é justo»; ofício, não vilania |
| Palavra | [Raiva](${raiva}) — *rabies*; literacia: nomear para não queimar a sala |
| Venom | Impulso letal do simbionte = figura de **raiva sem volante**; o laboratório guarda «escutar sem entregar o comando» |
| Expressão | [Vingança… envenena](${vinganca}) — quando a Raiva vira rancor cultivado, a dose fica **dentro** de quem a bebe |
| Vida | Raiva que não gritou (verso em [Águas](${aguas})) ainda atraca — merece inspeção, não repressão cega |

**Veredicto local:** Raiva **nomeada** = literacia. Raiva **armada em vingança** = metáfora do veneno. Venom (filme) ilustra a segunda sem patologizar a primeira.

### Medo × simbiose (quem conduz?)

| Eixo | Leitura |
|------|---------|
| Divertida Mente | Ensaiar o pior cenário; cuidado antecipatório |
| Venom / simbiose | Medo legítimo de perder agência («quem manda no corpo?») |
| Vida | Medo de ficar / de partir — inspecionar sem cobardia nem pânico como única voz |
| Emoção | Medo e Raiva partilham o console: um antevê; a outra explode — ambos podem proteger |

### Nojinho × veneno (rejeitar o que faz mal)

| Eixo | Leitura |
|------|---------|
| Divertida Mente | Aversão protetora — o que «não entra» |
| Venom / Expressão | Nojo do veneno **auto-ingerido** (rancor) ≠ nojo do simbionte como monstro de ecrã |
| Vida | Recusar o que corrompe o «ficar» — sem transformar aversão em desprezo às pessoas |
| Emoção | Nojinho completa o mapa: nem tudo se resolve com Alegria ou só com Raiva |

## Diagrama rápido (uma frase por nó)

| Nó | Frase BudGanja |
|----|----------------|
| [Emoção](${emocao}) | Hub — sem nome, as cinco ficam soltas |
| [Divertida Mente](${filme}) | Alfabeto: todas as emoções importam |
| [Raiva](${raiva}) | Fogo de limite; ofício vermelho |
| [Venom](${venom}) | «Nós» — impulsos a bordo, um volante |
| [Vingança…](${vinganca}) | Aviso: rancor envenena quem o cultiva |
| [Vida](${vida}) | Ficar — cuidado com prova, não ecrã só |
| [Águas e Lágrimas](${aguas}) | Medo, alegria, raiva e tristeza no mesmo porto |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Artes | [Artes](${hub}) |
| Filme · alfabeto emocional | [Divertida Mente](${filme}) |
| Hub lexical | [Emoção](${emocao}) |
| Cinco palavras | [Alegria](${alegria}) · [Tristeza](${tristeza}) · [Raiva](${raiva}) · [Medo](${medo}) · [Nojinho](${nojinho}) |
| Filme · simbiose / «nós» | [Venom](${venom}) |
| Palavra · simbiose | [Simbiose](${simbiose}) |
| Expressão · veneno do rancor | [A vingança nunca é plena…](${vinganca}) |
| Hub Expressões | [Expressões](${expressoes}) |
| Hub Palavras | [Palavras](${palavras}) |
| Contos / cuidado | [Vida](${vida}) |
| Poesia · porto das emoções | [Águas e Lágrimas](${aguas}) · [Lágrimas da Vida](${lagrimas}) |

## Limites

- Não fundimos o enredo de Divertida Mente com o de Venom — são **pares culturais** (vozes interiores / corpo partilhado), não universo partilhado.  
- Não patologizamos quem sente raiva, medo ou nojo.  
- Metáfora do veneno ≠ toxicologia de plantas nem protocolo clínico.  
- Vida no BudGanja não é terapia; é arquivo de cuidado, contos e poemas.

## Veredicto

**Aprovado como inspeção-cruzamento (Artes)** — mapa Raiva × Emoção × Venom × Vida lido com os cinco sentimentos de Divertida Mente: ofício de cada emoção fixado; fronteira entre **raiva que defende** e **rancor que envenena** declarada; rede amarrada a Palavras, Expressões e Vida.

[▶ Divertida Mente](${filme}) · [▶ Emoção](${emocao}) · [▶ Raiva](${raiva}) · [▶ Venom](${venom}) · [▶ Vida](${vida}) · [▶ Vingança…](${vinganca})
`;

  const contentEn = `## Scope

Editorial **cross-inspection**: **Anger × Emotion × Venom × Vida** read through the feelings of **[Inside Out](${filme})** (*Divertida Mente*, 2015). Object = the **map**, not a single work.

> Independent BudGanja audit. Cross-links published Arts / Words / Sayings / Vida cards. Not clinical advice. No Disney/Pixar or Sony/Marvel affiliation.

## Object

| Field | Value |
|-------|-------|
| Object | Emotional **cross-map** |
| Axes | [Anger](${raiva}) · [Emotion](${emocao}) · [Venom](${venom}) · [Vida](${vida}) |
| Reading frame | Five Inside Out feelings |
| Date | ${inspected} |

## Five feelings (Riley)

| Feeling | Office | Card |
|---------|--------|------|
| Joy | Care without monopolizing | [alegria](${alegria}) |
| Sadness | Help-seeking; honor loss | [tristeza](${tristeza}) |
| Anger | Boundary and just indignation | [raiva](${raiva}) |
| Fear | Anticipate risk | [medo](${medo}) |
| Disgust | Protective aversion | [nojinho](${nojinho}) |

## Cross reading (core)

**H1:** Inside Out = alphabet — no emotion is trash.  
**H2:** Venom / [simbiose](${simbiose}) = shared body — listen without handing over the wheel.  
**H3:** Named anger defends; cultivated revenge [poisons the soul](${vinganca}).  
**H4:** [Vida](${vida}) = staying with care — [Águas e Lágrimas](${aguas}).

| Node | BudGanja line |
|------|----------------|
| Anger | Fire of limit — office, not villainy |
| Venom | “We” — impulses aboard, one wheel |
| Saying | Resentment is a dose you drink |
| Vida | Stay — care with proof |

## Verdict

**Approved** as Arts cross-inspection — Anger × Emotion × Venom × Vida mapped onto Inside Out’s five feelings; boundary between defending anger and poisoning resentment stated.

[▶ Inside Out](${filme}) · [▶ Emotion](${emocao}) · [▶ Anger](${raiva}) · [▶ Venom](${venom}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

**Inspección-cruce**: **Rabia × Emoción × Venom × Vida** leída con los sentimientos de **[Divertida Mente](${filme})** (*Inside Out*, 2015). Objeto = el **mapa**, no una sola obra.

> Auditoría independiente BudGanja. Cruza fichas ya publicadas. No es consejo clínico.

## Objeto

| Campo | Valor |
|-------|-------|
| Objeto | **Mapa emocional** de cruce |
| Ejes | [Rabia](${raiva}) · [Emoción](${emocao}) · [Venom](${venom}) · [Vida](${vida}) |
| Marco | Cinco sentimientos de Divertida Mente |
| Fecha | ${inspected} |

## Cinco sentimientos (Riley)

| Sentimiento | Oficio | Ficha |
|-------------|--------|-------|
| Alegría | Cuidar sin monopolizar | [alegria](${alegria}) |
| Tristeza | Pedir ayuda; honrar la pérdida | [tristeza](${tristeza}) |
| Rabia | Límite e indignación justa | [raiva](${raiva}) |
| Miedo | Anticipar riesgo | [medo](${medo}) |
| Asco / Nojinho | Aversión protectora | [nojinho](${nojinho}) |

## Lectura del cruce

**H1:** Divertida Mente = alfabeto — ninguna emoción es basura.  
**H2:** Venom / [simbiose](${simbiose}) = cuerpo compartido — escuchar sin entregar el volante.  
**H3:** Rabia nombrada defiende; venganza cultivada [envenena el alma](${vinganca}).  
**H4:** [Vida](${vida}) = quedarse con cuidado — [Águas e Lágrimas](${aguas}).

## Veredicto

**Aprobado** como inspección-cruce (Artes) — Rabia × Emoción × Venom × Vida leídos con los cinco sentimientos; frontera entre rabia que defiende y rencor que envenena declarada.

[▶ Divertida Mente](${filme}) · [▶ Emoción](${emocao}) · [▶ Rabia](${raiva}) · [▶ Venom](${venom}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs };
}

function buildCruzamentoRaivaVenomVidaDivertidaPost() {
  const { body, contentEn, contentEs } = buildCruzamentoRaivaVenomVidaDivertidaBodies();
  return artePost({
    title:
      'Inspeção: Cruzamento — Raiva, Emoção, Venom e Vida no mapa de Divertida Mente',
    titleEn:
      'Inspection: Cross-map — Anger, Emotion, Venom and Vida through Inside Out',
    titleEs:
      'Inspección: Cruce — Rabia, Emoción, Venom y Vida en el mapa de Divertida Mente',
    excerpt:
      'Artes · cruzamento: Raiva × Emoção × Venom × Vida lidos com Alegria, Tristeza, Raiva, Medo e Nojinho — ofício de cada sentimento vs veneno do rancor; rede com Divertida Mente e o «ficar» da Vida.',
    excerptEn:
      'Arts · cross-map: Anger × Emotion × Venom × Vida read through Joy, Sadness, Anger, Fear and Disgust — each feeling’s office vs resentment’s poison; links to Inside Out and Vida’s “stay”.',
    excerptEs:
      'Artes · cruce: Rabia × Emoción × Venom × Vida con Alegría, Tristeza, Rabia, Miedo y Nojinho — oficio de cada sentimiento vs veneno del rencor; red con Divertida Mente y el «quedarse» de Vida.',
    slug: 'inspecao-cruzamento-raiva-venom-vida-divertida',
    date: '2026-08-02T21:30:00.000Z',
    seriesOrder: 13,
    seriesLabel: 'Cruzamento · sala de comando',
    coverImage: '/imagens/inspecoes/cruzamento-raiva-venom-vida-cover.jpg',
    sourceUrl: '/posts/post-inspecao-filme-divertida-mente.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCruzamentoRaivaVenomVidaDivertidaPost,
  buildCruzamentoRaivaVenomVidaDivertidaBodies
};
