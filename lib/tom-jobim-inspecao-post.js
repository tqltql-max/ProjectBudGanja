'use strict';

/**
 * Inspeção Pessoas × Palavras / Artes: Tom Jobim.
 * Método da palavra-música (bossa) · Águas de Março · arquitetura ·
 * dedicatória lab «Adoro origami» (ori=dobrar, kami=papel).
 */

function figuraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'pessoas-historia',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Pessoas',
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

function buildTomJobimBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Ant%C3%B4nio_Carlos_Jobim';
  const wikiEn = 'https://en.wikipedia.org/wiki/Ant%C3%B4nio_Carlos_Jobim';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const aguas = '/posts/post-inspecao-arte-aguas-e-lagrimas.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const papelTabaco = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const renato = '/posts/post-inspecao-figura-renato-russo.html';
  const radio = '/radio/';
  const vida = '/vida/';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const wikiOrigami = 'https://pt.wikipedia.org/wiki/Origami';

  const body = `## Escopo

Inspeção editorial e documental de **Tom Jobim** — **Antônio Carlos Brasileiro de Almeida Jobim** (Rio de Janeiro, 25 de janeiro de 1927 — Nova Iorque, 8 de dezembro de 1994). Compositor, pianista, arranjador e cantor; expoente da **bossa nova** e da canção brasileira no jazz mundial. O recorte BudGanja não é discografia completa: é o **método da palavra-música** — harmonia cuidadosa, natureza nomeada, parceria com letristas — e uma **dedicatória do laboratório**: *Adoro origami* — o que a palavra **origami** significa e por que o lab a dobra junto ao ofício de Jobim (que chegou a flertar com a **arquitetura** antes da música; o filho Paulo Jobim foi arquitecto).

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Antônio Carlos Jobim](${wiki}), [EN](${wikiEn}), [Origami](${wikiOrigami}). Sem afiliação com Jobim Music, gravadoras ou herdeiros. Crédito das canções pertence a Jobim e parceiros (Vinicius de Moraes, Newton Mendonça, Chico Buarque, etc.). **«Adoro origami»** nesta ficha é **dedicatória/leitura BudGanja**, não citação documentada de uma dedicatória histórica de Jobim com essa frase — se existir manuscrito privado com essa inscrição, o lab acolhe a fonte; até lá, o sentido é **editorial**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Antônio Carlos Brasileiro de Almeida Jobim** (Tom Jobim) |
| Nascimento / morte | 25 jan. 1927 (RJ) — 8 dez. 1994 (Nova Iorque), 67 anos |
| Causa (fonte) | Parada cardíaca / complicações pós-cirurgia (tumor bexiga; embolia) |
| Ofícios | Compositor · pianista · violonista · arranjador · cantor |
| Marcos | Bossa nova · *Getz/Gilberto* · *Garota de Ipanema* · *Águas de Março* · *Elis & Tom* · *Antonio Brasileiro* |
| Tipo BudGanja | Pessoa — método da palavra-música (+ elo Artes / Palavras) |
| Elo Palavras | [água](${agua}) · [mar](${mar}) · [caminho](${caminho}) · [gesto](${gesto}) · [criatividade](${criatividade}) |
| Elo Artes | [Águas do Mar e Lágrimas](${aguas}) — espelho lab da água/mar |
| Elo dedicatória | **Origami** — *ori* (dobrar) + *kami* (papel) |
| Fonte | [Wikipédia](${wiki}) |
| Data | ${inspected} |

## Dedicatória do laboratório — «Adoro origami»

### O que significa *origami*

| Parte | Japonês | Sentido |
|-------|---------|---------|
| **ori** | 折り | dobrar |
| **kami** | 紙 | papel |
| **origami** | 折り紙 | a arte de **dobrar papel** até nascer uma forma (tsuru, flor, arquitectura de papel…) |

Não é «só brinquedo»: é **ofício de precisão** — uma folha plana vira volume sem cola obrigatória (no clássico). Variantes: *kirigami* (corta), *origamic architecture* (papel que «salta» ao abrir — arquitectura em cartão).

### Por que o lab dedica isso a Tom Jobim

| Jobim | Origami (leitura BudGanja) |
|-------|----------------------------|
| Quis ser **arquitecto**; ficou músico | Arquitectura do **papel**: plano → forma |
| Dobrou o samba em **bossa** íntima | Dobrar sem rasgar o que já existia |
| Harmonias cuidadas, perfil que «fica» | Cada dobra conta; não se força a flor |
| Natureza (chuva, sol, árvore, peixe, pássaro) | Forma viva saída de matéria simples |
| Filho **Paulo Jobim**, arquitecto | A casa e a partitura no mesmo sangue de ofício |

**Leitura:** *Adoro origami* = **adoro o ofício de dobrar com cuidado** — a mesma paciência com que Jobim dobrou a canção brasileira até caber no mundo sem perder o Rio. Não é biografia forçada: é **gesto de homenagem** do laboratório ([gesto](${gesto}) · [criatividade](${criatividade})).

\`\`\`poem
Adoro origami.
Não o papel por moda —
o ofício de dobrar
até a forma aparecer
sem gritar.

Tom dobrou o samba
até caber na sala,
na voz baixa,
no jazz que veio de longe
e voltou com cheiro de Ipanema.

Água de março:
lista que se dobra em canção.
Mar que cabe no peito.
Caminho que não precisa de tanque.

O laboratório planta à beira.
Conta gotas.
Chama a Vida pelo nome verdadeiro:
ficar —
e dobrar de novo,
com [Faça o melhor!](${mantra})
\`\`\`

## Hipóteses e método

**H1:** o valor BudGanja de Jobim é a **palavra-música** — natureza, amor e cidade nomeados com harmonia de ofício.  
**H2:** *Águas de Março* é âncora lexical ([água](${agua}) · [mar](${mar})) e irmã de espírito de [Águas do Mar e Lágrimas](${aguas}).  
**H3:** a dedicatória **origami** traduz arquitectura + cuidado + papel — sem inventar citação falsa de Jobim.  
**H4:** cruzar Pessoas ↔ Palavras ↔ Artes evita silo: a pessoa que compõe e a ficha que inspeciona a água iluminam-se.

Passos: biografia verificável → método (bossa / parceria) → obra-âncora → dedicatória origami → elos → status.

## Quem foi (síntese)

- Nascido na Tijuca; infância em **Ipanema** após a separação dos pais; pai Jorge Jobim morre em 1935; padrasto Celso da Frota Pessoa incentiva o piano.  
- Estudos com Lúcia Branco e **Hans-Joachim Koellreutter**; influências: Pixinguinha, Villa-Lobos, Debussy, Ravel, Ary Barroso.  
- Anos 40–50: piano em bares; arranjos; primeira gravação de composição (*Incerteza*, 1953, c/ Newton Mendonça).  
- Com **Vinicius de Moraes**: *Orfeu da Conceição* → trilha de *Orfeu Negro* (1959).  
- Com **João Gilberto**: *Chega de Saudade* / *Desafinado* (1958+) — marco da bossa nova.  
- Internacionalização: Carnegie Hall (1962); *Getz/Gilberto* (1963) — Grammy Álbum do Ano; *Garota de Ipanema*.  
- *Francis Albert Sinatra & Antônio Carlos Jobim* (1967); *Elis & Tom* (1974); *Águas de Março* (1972); *Passarim*; *Antonio Brasileiro* (1994, póstumo).  
- Morte em Nova Iorque (8 dez. 1994); sepultado no São João Batista (RJ). Aeroporto Galeão leva o seu nome (1999).

## Método da palavra-música

| Ofício | Exemplo | Elo lab |
|--------|---------|---------|
| Lista-poema | *Águas de Março* | [água](${agua}) · [mar](${mar}) · [Águas…](${aguas}) |
| Perfil / instante | *Garota de Ipanema* | [gesto](${gesto}) de olhar que passa |
| Parceria letra | Vinicius · Newton · Chico | Duas mãos no mesmo papel |
| Natureza como partitura | chuva, árvore, pássaro, peixe | [criatividade](${criatividade}) · [verdade](${verdade}) do lugar |
| Arquitectura latente | quis ser arquitecto; Paulo Jobim arquitecto | Origami / dobra / forma |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Água](${agua}) · [mar](${mar}) · [Águas do Mar e Lágrimas](${aguas}) | Canção e verso da água |
| [Caminho](${caminho}) · [gesto](${gesto}) · [criatividade](${criatividade}) | Ofício |
| [Papel de enrolar × tabaco](${papelTabaco}) | Outro ofício do **papel** (não confundir com origami) |
| [Chorão](${chorao}) · [Duvivier](${duvivier}) · [Renato Russo](${renato}) | Outros ofícios da palavra BR |
| [Rádio](${radio}) · [Vida](${vida}) · [Artes](${artes}) · [Palavras](${palavras}) | Mapa |
| [Faça o melhor!](${mantra}) | Fecho |

## Status

**Aprovado** — Tom Jobim fichado: método da bossa / palavra-música; dedicatória lab **Adoro origami** (*dobrar papel* → forma) cruzada com arquitectura e *Águas de Março*.

[▶ Águas…](${aguas}) · [▶ Água](${agua}) · [▶ Mar](${mar}) · [▶ Faça o melhor!](${mantra}) · [▶ Pessoas](${hub})
`;

  const contentEn = `## Scope

Editorial inspection of **Tom Jobim** (Antônio Carlos Jobim, 1927–1994) — bossa nova, word-music craft, *Águas de Março*. Lab dedication: **“I love origami”** — *ori* (to fold) + *kami* (paper). Not a documented Jobim quote with that phrase: a BudGanja homage linking his architecture interest to careful folding of form.

> Sources: [Wikipedia](${wikiEn}), [Origami](${wikiOrigami}). No affiliation.

## Origami

Japanese **origami** = fold + paper: precision craft turning a flat sheet into form. Lab reading: Jobim folded samba into intimate bossa without tearing the root.

## Status

**Approved** — person sheet + origami dedication + water/sea links.

[▶ Waters poem](${aguas}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Tom Jobim** (1927–1994) — bossa nova, oficio palabra-música, *Águas de Março*. Dedicatoria del lab: **«Adoro origami»** — *ori* (doblar) + *kami* (papel). No es cita documentada de Jobim con esa frase: homenaje BudGanja que une su interés por la arquitectura con el doblar cuidadoso de la forma.

> Fuentes: [Wikipedia](${wiki}), [Origami](${wikiOrigami}). Sin afiliación.

## Origami

**Origami** = doblar + papel: oficio de precisión. Lectura lab: Jobim dobló el samba en bossa íntima sin romper la raíz.

## Estado

**Aprobado** — ficha de persona + dedicatoria origami + elos agua/mar.

[▶ Aguas…](${aguas}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildTomJobimPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildTomJobimBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 13;
  return figuraPost({
    title:
      'Inspeção: Tom Jobim — bossa, Águas de Março e a dedicatória «Adoro origami»',
    titleEn:
      'Inspection: Tom Jobim — bossa, Waters of March, and the “I love origami” dedication',
    titleEs:
      'Inspección: Tom Jobim — bossa, Águas de Março y la dedicatoria «Adoro origami»',
    excerpt:
      'Pessoas × Palavras: Tom Jobim — método da palavra-música; Águas de Março; dedicatória lab origami (dobrar papel → forma).',
    excerptEn:
      'People × Words: Tom Jobim — word-music craft; Waters of March; lab origami dedication (fold paper → form).',
    excerptEs:
      'Personas × Palabras: Tom Jobim — oficio palabra-música; Águas de Março; dedicatoria lab origami (doblar papel → forma).',
    slug: 'inspecao-figura-tom-jobim',
    date: '2026-08-04T22:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Tom Jobim · Pessoas',
    coverImage: '/imagens/inspecoes/tom-jobim-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildTomJobimPost,
  buildTomJobimBodies
};
