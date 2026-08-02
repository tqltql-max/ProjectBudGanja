'use strict';

/**
 * Inspeções «Expressões e Ditados populares»:
 * frases da oralidade que carregam método, aviso ou mapa emocional.
 * Série: expressoes-ditados — tipagem no hub → 'expressao'.
 */

function expressaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'expressoes-ditados',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Expressões',
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

/** Poesia Vida — a partir do ditado e das palavras vermelhas (comum × lab). */
function poemVingancaPt() {
  return `Disseram na vizinhança, com voz de brincadeira,
que a vingança nunca é plena —
promete fechar a conta
e deixa o peito em aberto.

Comum: desforra, olho por olho, revidar o golpe.
Lab: a conta não fecha.
Quem bebe a dose
pensa que o outro morre primeiro.

Mata — no dicionário — tira a vida.
Aqui mata outro jeito:
esvazia a alma,
tira o nome verdadeiro do centro,
deixa o espírito sem água para a planta.

Veneno — no mundo — adoecer, matar.
Veneno — nesta frase — o rancor
que ocupa o lugar do cuidado,
que corrompe por dentro
enquanto a mão ainda aponta para fora.

Ressentimento é mágoa que não passa.
Rancor é a garrafa que a gente guarda
como se fosse justiça.
Não é.
É dose.
É aviso.

O laboratório não condena a raiva —
a raiva tem ofício, tem limite, tem cor.
O laboratório inspeciona o veneno
para não confundir fogo com veneno,
emoção com retaliação,
ficar com revidar.

Seu Madruga já avisava no pátio:
nunca é plena.
Nós, na trilha Vida, traduzimos o ditado
em verso e em método —
não para apagar a mágoa,
mas para não beber sozinho
o que poderia ser partilha.

Planta à beira do rancor.
Conta gotas.
Chama a alma pelo nome comum
e pelo nome BudGanja:
centro íntimo —
ainda vivo —
ainda capaz de ficar.`;
}

function poemVingancaEn() {
  return `They said it in the yard, half as a joke,
that revenge is never complete —
it promises to settle the score
and leaves the chest open.

Everyday: payback, eye for eye, strike back.
Lab: the account never closes.
Whoever drinks the dose
thinks the other dies first.

To kill — in the dictionary — takes a life.
Here it kills another way:
it empties the soul,
takes the true name from the center,
leaves the spirit without water for the plant.

Poison — in the world — to sicken, to kill.
Poison — in this saying — the grudge
that takes the place of care,
that corrupts from within
while the hand still points outward.

Resentment is a hurt that will not pass.
A grudge is the bottle we keep
as if it were justice.
It is not.
It is a dose.
It is a warning.

The laboratory does not condemn anger —
anger has a craft, a limit, a color.
The laboratory inspects the poison
so we do not confuse fire with venom,
emotion with retaliation,
staying with striking back.

Seu Madruga already warned in the courtyard:
never complete.
We, on the Vida path, turn the saying
into verse and method —
not to erase the hurt,
but so we do not drink alone
what could have been sharing.

Plant at the edge of the grudge.
Count the drops.
Call the soul by its everyday name
and by its BudGanja name:
intimate center —
still alive —
still able to stay.`;
}

function poemVingancaEs() {
  return `Lo dijeron en el patio, a medias en broma,
que la venganza nunca es plena —
promete cerrar la cuenta
y deja el pecho abierto.

Común: desquite, ojo por ojo, devolver el golpe.
Lab: la cuenta no cierra.
Quien bebe la dosis
cree que el otro muere primero.

Matar — en el diccionario — quitar la vida.
Aquí mata de otro modo:
vacía el alma,
quita el nombre verdadero del centro,
deja el espíritu sin agua para la planta.

Veneno — en el mundo — enfermar, matar.
Veneno — en esta frase — el rencor
que ocupa el lugar del cuidado,
que corrompe por dentro
mientras la mano aún señala afuera.

El resentimiento es una herida que no pasa.
El rencor es la botella que guardamos
como si fuera justicia.
No lo es.
Es dosis.
Es aviso.

El laboratorio no condena la rabia —
la rabia tiene oficio, límite, color.
El laboratorio inspecciona el veneno
para no confundir fuego con veneno,
emoción con retaliación,
quedarse con devolver el golpe.

Don Ramón ya avisaba en el patio:
nunca es plena.
Nosotros, en la senda Vida, traducimos el dicho
en verso y en método —
no para borrar la herida,
sino para no beber solos
lo que podría ser compartida.

Siembra a la orilla del rencor.
Cuenta gotas.
Llama al alma por su nombre común
y por su nombre BudGanja:
centro íntimo —
aún vivo —
aún capaz de quedarse.`;
}

function buildVingancaAlmaEnvenenaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const venom = '/posts/post-inspecao-filme-venom.html';
  const raiva = '/posts/post-inspecao-palavra-raiva.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const madruga = '/posts/post-inspecao-figura-ramon-valdes.html';
  const programa = '/posts/post-inspecao-serie-chaves-el-chavo.html';
  const vida = '/vida/';
  const cruzamento = '/posts/post-inspecao-cruzamento-raiva-venom-vida-divertida.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const self = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const poema = poemVingancaPt();

  const body = `## Escopo

Inspeção editorial da expressão popular **«A [vingança](${self}) nunca é plena, [mata](${self}) a [alma](${self}) e a [envenena](${self})»** — frase que atravessou gerações no Brasil e na América Latina pela voz do personagem **Seu Madruga** (*El Chavo del Ocho* / *Chaves*), e que resume um aviso antigo: o [rancor](${self}) promete [justiça](${self}) e cobra o preço no próprio [espírito](${self}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Objecto = a **frase em circulação** (oralidade + TV + memes), não biografia de actores nem doutrina religiosa. Cruzamos cultura popular, metáfora do veneno e literacia emocional. **Não é aconselhamento clínico.** Sem afiliação com Televisa, SBT ou marcas do elenco.

Esta ficha abre a série **Expressões e Ditados populares**: o método é fixar a forma canónica, mapear origem/circulação, ler o aviso embutido e cruzar com outras fichas BudGanja (emoções, artes, vida).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **A vingança nunca é plena, mata a alma e a envenena** |
| Tipo | Ditado / frase de cultura popular (TV → oralidade) |
| Atribuição popular | Seu Madruga (*Chaves*) |
| Núcleo semântico | [Vingança](${self}) · [alma](${self}) · [veneno](${venom}) |
| Tipo BudGanja | Expressão — aviso emocional |
| Elo próximo | [Ramón Valdés](${madruga}) · [Chaves · programa](${programa}) · [Raiva](${raiva}) · [Emoção](${emocao}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** a força da frase não está no humor da cena — está na **metáfora toxicológica**: o ressentimento age como dose que o próprio sujeito ingere.  
**H2:** «mata a alma e a envenena» junta dois danos — **esvaziar** (matar) e **corromper** (envenenar) — o que a oralidade resume melhor do que um tratado.  
**H3:** a série Expressões inspeciona **sabedoria em circulação**, distinta de Palavras (etimologia de um vocábulo) e de Artes (obra completa).

Passos do método (repetíveis):

1. Fixar a forma canónica e variantes.  
2. Localizar origem cultural / circulação (série, região, memes).  
3. Extrair o aviso embutido (o que a frase *faz* ao ouvinte).  
4. Mapear rede de ditados aparentados.  
5. Cruzar com fichas BudGanja (emoções, artes, vida).  
6. Declarar limites.

## Forma e variantes

Forma estável (PT-BR):

> A vingança nunca é plena, mata a alma e a envenena.

Variantes orais frequentes:

- «A vingança nunca é plena — mata a alma e a envenena.» (pausa dramática)  
- Citação truncada: só «mata a alma e a envenena»  
- Parentes próximos na rede popular: «o rancor é um veneno que você bebe esperando que o outro morra»

**Veredicto de forma:** a versão completa com «nunca é plena» é a canónica para esta ficha — sem ela, perde-se o aviso de que a vingança **não completa** o que promete.

## Origem e circulação

| Camada | O que carrega |
|--------|----------------|
| TV latino-americana | Falas do Seu Madruga em *El Chavo del Ocho* — humor + moralidade de vizinhança |
| Brasil | *Chaves* (SBT e reprises) — frase vira refrão de meme, camisola e conversa |
| Tradição moral mais antiga | Ecos de avisos religiosos e filosóficos contra o rancor (sem exigir citação única) |
| Rede contemporânea | Memes, shorts, citação fora de contexto — a frase viaja **sem** a cena original |

Leitura BudGanja: a expressão **sobrevive** porque é curta, ritmada e traduz uma experiência partilhada — o desejo de revidar e o preço de guardar veneno.

## O que a frase inspeciona

| Peça | Leitura laboratorial |
|------|----------------------|
| **[Vingança](${self})** | Promessa de equilíbrio pela [retaliação](${self}) — o ditado diz que essa conta **não fecha** («nunca é [plena](${self})») |
| **[Alma](${self})** | Aqui não é teologia dogmática: é o **centro íntimo** (paz, carácter, humor de fundo) |
| **[Envenena](${self})** | Metáfora de [dose](${venom}) contínua — o [ressentimento](${self}) fica **dentro** de quem o cultiva |

**Hipótese aplicada:** no laboratório emocional BudGanja, «[veneno](${venom})» nesta frase ≠ toxina botânica de planta; é **carga afectiva** que ocupa espaço onde deveriam estar cuidado, cultivo e partilha ([Vida](${vida})).

## Palavras de aviso (vermelhas · âmbar)

No modo **Aprender idiomas**, as vermelhas mostram **categoria + sentido comum + leitura BudGanja** ao passar o rato. Catálogo: *Vida/Palavras-aviso.txt*.

### Vermelhas (perigosa) — significado mundano

| Categoria | Palavra | Comum (mundano) | BudGanja |
|-----------|---------|-----------------|----------|
| Retaliação | [vingança](${self}) | Desforra ou castigo a quem ofendeu | Promessa de equilíbrio que cobra o preço em quem a cultiva |
| Retaliação | [retaliação](${self}) | Resposta igual ao dano («olho por olho») | Conta que a frase diz nunca fechar («nunca é plena») |
| Retaliação | [revidar](${self}) | Responder a um golpe com outro | Impulso que a oralidade avisa contra |
| Dano à vida | [mata](${self}) / [matar](${self}) | Tirar a vida; causar a morte | Esvaziar o centro íntimo (não homicídio literal) |
| Toxina | [veneno](${venom}) | Substância tóxica que pode matar ou adoecer | Carga afectiva no lugar do cuidado — ≠ toxina de planta |
| Toxina | [envenena](${self}) / [envenenar](${self}) | Dar ou aplicar veneno; tornar tóxico | Dose que fica no próprio sujeito |
| Toxina | [corromper](${self}) | Estragar; deteriorar moral ou materialmente | Segundo dano da frase («envenena») |
| Afecto tóxico | [rancor](${self}) | Ódio ou mágoa guardada | Dose auto-ingerida |
| Afecto tóxico | [ressentimento](${self}) | Mágoa persistente por ofensa | Ferida que continua a actuar — nutriente do rancor |
| Esvaziamento | [esvaziar](${self}) | Deixar vazio; retirar o conteúdo | Primeiro dano da frase («mata a alma») |

### Âmbar (uso cauteloso)

| Tom | Palavras | Nota |
|-----|----------|------|
| **Uso cauteloso** | [alma](${self}) · [espírito](${self}) · [raiva](${raiva}) · [emoção](${emocao}) · [justiça](${self}) · [plena](${self}) · [dose](${venom}) · [aviso](${self}) · [ditado](${hub}) · [expressão](${hub}) · [metáfora](${self}) · [oralidade](${self}) | Centro íntimo, afecto e figura — precisão editorial |

## Rede de expressões aparentadas

| Expressão | Relação |
|-----------|---------|
| O rancor é um veneno que você bebe esperando que o outro morra | Quase-sinónimo moderno; enfatiza a **auto-ingestão** |
| Águas passadas não movem moinhos | Convite a largar o passado — outro eixo, mesma família de avisos |
| Quem semeia vento, colhe tempestade | Foco na **consequência externa**; a frase do Seu Madruga foca o **dano interno** |
| [Venom · Artes](${venom}) | Outro «veneno» cultural — simbionte / dose / identidade; cruzamento metafórico, não etimológico |

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub desta série | [Expressões e Ditados](${hub}) |
| Pessoa · Seu Madruga | [Ramón Valdés](${madruga}) |
| Artes · programa e turma | [Chaves / El Chavo](${programa}) |
| Palavra · raiva | [Raiva](${raiva}) |
| Palavra · emoção | [Emoção](${emocao}) |
| Artes · metáfora do veneno | [Venom](${venom}) |
| Contos / cuidado | [Vida](${vida}) · [poema na Vida](${vida}#poema=vinganca-nunca-e-plena) |
| Mapa · Divertida Mente | [Cruzamento Raiva × Venom × Vida](${cruzamento}) · [Divertida Mente](${divertida}) |

## O poema

Texto do ditado e das palavras vermelhas (comum × BudGanja) transformado em verso da trilha [Vida](${vida}) — literacia emocional, não condenação do afecto.

\`\`\`
${poema}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=vinganca-nunca-e-plena)

## Limites

- Não atribuímos autoria literária única à frase além da circulação popular via *Chaves*.  
- Não patologizamos quem sente raiva — a ficha inspeciona o **aviso** da oralidade, não condena o afecto.  
- Não confundir metáfora do veneno com toxicologia de plantas ou com a ficha do filme [Venom](${venom}).  
- O poema abaixo é **criação do laboratório** a partir do ditado — não é letra oficial de *Chaves*.

## Veredicto

**Aprovado na série Expressões e Ditados populares** — frase-modelo: forma canónica fixada; aviso (vingança incompleta + dano interno) mapeado; poema Vida com sentidos mundanos; rede e cruzamentos com Raiva, Emoção, Venom e Vida.

[▶ Expressões](${hub}) · [▶ Poema Vida](${vida}#poema=vinganca-nunca-e-plena) · [▶ Ramón Valdés](${madruga}) · [▶ Chaves](${programa}) · [▶ Raiva](${raiva})
`;

  const contentEn = `## Scope

Editorial inspection of the popular saying **“Revenge is never complete — it kills the soul and poisons it”** (Portuguese: *A vingança nunca é plena, mata a alma e a envenena*) — a line that travelled Latin America through **Seu Madruga** (*El Chavo del Ocho*) and warns that resentment charges its fee inside the self.

> Independent BudGanja audit. Object = the **circulating phrase**, not cast biography. Not clinical advice.

## Object

| Field | Value |
|-------|-------|
| Saying | A vingança nunca é plena, mata a alma e a envenena |
| Type | Popular expression (TV → everyday speech) |
| Popular attribution | Seu Madruga (*El Chavo*) |
| BudGanja type | Expression — emotional warning |
| Cross-links | [Anger](${raiva}) · [Emotion](${emocao}) · [Venom](${venom}) |
| Date | ${inspected} |

## Reading

**H1:** the power is the toxicology metaphor — resentment is a dose you drink yourself.  
**H2:** “kills the soul and poisons it” pairs emptying and corrupting.  
**H3:** Expressions inspect circulating wisdom — distinct from Words (etymology) and Arts (full works).

## The poem

\`\`\`
${poemVingancaEn()}
\`\`\`

[▶ Read on Vida](${vida}#poema=vinganca-nunca-e-plena)

## Verdict

**Approved** in **Popular Expressions & Sayings** — canonical form fixed; warning mapped; Vida poem with everyday senses; links to Anger, Emotion, Venom and [Vida](${vida}).

[▶ Expressions](${hub}) · [▶ Vida poem](${vida}#poema=vinganca-nunca-e-plena) · [▶ Anger](${raiva}) · [▶ Venom](${venom})
`;

  const contentEs = `## Alcance

Inspección editorial de la expresión popular **«La venganza nunca es plena, mata el alma y la envenena»** (*A vingança nunca é plena, mata a alma e a envenena*) — frase que circuló en Latinoamérica con **El Chavo del 8** / Don Ramón y advierte que el rencor cobra el precio en el propio espíritu.

> Auditoría independiente BudGanja. Objeto = la **frase en circulación**. No es consejo clínico.

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | A vingança nunca é plena, mata a alma e a envenena |
| Tipo | Dichos / cultura popular (TV → oralidad) |
| Atribución popular | Don Ramón (*El Chavo*) |
| Tipo BudGanja | Expresión — aviso emocional |
| Cruces | [Rabia](${raiva}) · [Emoción](${emocao}) · [Venom](${venom}) |
| Fecha | ${inspected} |

## Lectura

**H1:** la fuerza está en la metáfora toxicológica — el resentimiento es una dosis que uno mismo bebe.  
**H2:** «mata el alma y la envenena» une vaciar y corromper.  
**H3:** Expresiones inspecciona sabiduría en circulación — distinta de Palabras y Artes.

## El poema

\`\`\`
${poemVingancaEs()}
\`\`\`

[▶ Leer en Vida](${vida}#poema=vinganca-nunca-e-plena)

## Veredicto

**Aprobado** en **Expresiones y Dichos populares** — forma canónica; aviso mapeado; poema Vida con sentidos comunes; cruces con Rabia, Emoción, Venom y [Vida](${vida}).

[▶ Expresiones](${hub}) · [▶ Poema Vida](${vida}#poema=vinganca-nunca-e-plena) · [▶ Rabia](${raiva}) · [▶ Venom](${venom})
`;

  return { body, contentEn, contentEs };
}

function buildVingancaAlmaEnvenenaPost() {
  const { body, contentEn, contentEs } = buildVingancaAlmaEnvenenaBodies();
  return expressaoPost({
    title:
      'Inspeção: A vingança nunca é plena — mata a alma e a envenena',
    titleEn:
      'Inspection: Revenge is never complete — it kills the soul and poisons it',
    titleEs:
      'Inspección: La venganza nunca es plena — mata el alma y la envenena',
    excerpt:
      'Expressões: «A vingança nunca é plena, mata a alma e a envenena» — ditado popular via Seu Madruga (*Chaves*); o rancor como veneno que o próprio sujeito ingere.',
    excerptEn:
      'Sayings: “A vingança nunca é plena…” — popular line via Seu Madruga (*El Chavo*); resentment as poison you drink yourself.',
    excerptEs:
      'Dichos: «A vingança nunca é plena…» — frase popular vía Don Ramón (*El Chavo*); el rencor como veneno que uno mismo bebe.',
    slug: 'inspecao-expressao-vinganca-mata-alma-envenena',
    date: '2026-08-02T20:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Vingança · expressão',
    coverImage: '/imagens/inspecoes/vinganca-alma-envenena-cover.jpg',
    sourceUrl: '/biblioteca/inspecoes/#inspecoes-expressoes',
    body,
    contentEn,
    contentEs
  });
}

const EXPRESSOES_DITADOS_INSPECOES_POSTS = [buildVingancaAlmaEnvenenaPost()];

module.exports = {
  EXPRESSOES_DITADOS_INSPECOES_POSTS,
  expressaoPost,
  buildVingancaAlmaEnvenenaPost,
  buildVingancaAlmaEnvenenaBodies,
  poemVingancaPt,
  poemVingancaEn,
  poemVingancaEs
};
