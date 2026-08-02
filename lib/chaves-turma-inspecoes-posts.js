'use strict';

/**
 * Chaves / El Chavo del Ocho — homenagem a Ramón Valdés + inspeção do programa/turma.
 * Artes: o programa como obra + turma (sem posicionamento «para crianças»).
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

function buildRamonValdesBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const artes = '/biblioteca/inspecoes/#inspecoes-artes';
  const programa = '/posts/post-inspecao-serie-chaves-el-chavo.html';
  const expressao =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Ram%C3%B3n_Vald%C3%A9s';
  const vida = '/vida/';

  const body = `## Escopo

Homenagem editorial e documental a **Ramón Valdés** (1923–1988) — o actor mexicano que deu corpo, voz e dignidade cómica ao **Seu Madruga** (*Don Ramón*) em *El Chavo del Ocho* (*Chaves*). O recorte BudGanja devolve-lhe os **devidos méritos**: não como «meme» solto, mas como artesão do humor popular que ensinou, sem sermão, o valor do trabalho, da amizade na vizinhança e do aviso contra o rancor.

> **Nota metodológica:** auditoria independente com base em fontes públicas (incl. [Wikipédia · Ramón Valdés](${wiki})), circulação latino-americana da série e memória cultural no Brasil (SBT / reprises). **Não é biografia íntima nem fofoca.** Crédito do personagem e das falas partilha-se com o criador Roberto Gómez Bolaños (*Chespirito*) e com a equipa; o mérito de Valdés é a **interpretação** que tornou o Madruga inesquecível. Sem afiliação com Televisa, SBT ou marcas do elenco.

Elo com a série [Expressões](/biblioteca/inspecoes/#inspecoes-expressoes): a frase [«A vingança nunca é plena…»](${expressao}) circula com a voz do Madruga — esta ficha honra a **pessoa** por trás da voz. Elo com [Artes · Chaves](${programa}): a turma e o programa como obra de humor de vizinhança.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Ramón Gómez Valdés y Castillo** |
| Nome artístico | Ramón Valdés |
| Personagem-âncora | **Seu Madruga** (*Don Ramón*) |
| Nascimento / morte | 2 set. 1923 (México) — 9 ago. 1988 (México), 64 anos |
| Obra-âncora | *El Chavo del Ocho* (anos 1970–80) + universo Chespirito |
| Tipo BudGanja | Pessoa — ofício cómico e mérito cultural |
| Elo principal | [Expressão · vingança / alma / veneno](${expressao}) |
| Elo obra | [Artes · Chaves / El Chavo](${programa}) |
| Fonte | [Wikipédia · Ramón Valdés](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o mérito de Valdés não é «ser pobre engraçado» — é ter feito do Madruga um **vizinho digno**: falível, trabalhador quando pode, protector da Chiquinha, resistente ao ridículo sem perder humanidade.  
**H2:** a comicidade do personagem ensina **limites** (dívida do aluguer, briga com Dona Florinda, orgulho ferido) sem humilhar a pobreza como destino moral.  
**H3:** frases que ficaram (incluindo a da vingança) só têm peso porque Valdés as **encarnou** — timing, olhar e voz de quem já viu a vida.

## Méritos devidos (Ramón Valdés / Seu Madruga)

| Mérito | Porquê inspecionar |
|--------|--------------------|
| **Ofício de actor popular** | Transformou texto e sketch em personagem nacional em vários países |
| **Dignidade na comicidade** | O Madruga ri *com* a plateia sem transformar a precariedade em humilhação gratuita |
| **Paternidade afectiva** | Relação com a Chiquinha — cuidado e orgulho dentro do humor |
| **Aviso moral sem sermão** | Linhas como [a da vingança](${expressao}) — ética embutida no gag |
| **Trabalho em ensemble** | Brilho próprio **sem** apagar a turma (ver [programa](${programa})) |
| **Legado pósumo vivo** | Décadas depois, o público ainda cita o Madruga — prova de ofício bem feito |

## Biografia breve (factos públicos)

- Irmão dos também actores Pedro, Germán («Tin-Tan») e Antônio Valdés — família de tradição cómica mexicana.  
- Percurso em cinema e televisão antes e durante o universo Chespirito.  
- Como Seu Madruga, tornou-se uma das figuras mais queridas da vila: chapéu, camisola listrada, calma irónica e explosões calculadas.  
- Faleceu em 1988; a memória pública permanece ligada ao carinho do público latino-americano e brasileiro.

## Cruzamentos BudGanja

| Tema | Recurso |
|------|---------|
| Hub Pessoas | [Pessoas](${hub}) |
| Programa e turma | [Chaves · Artes](${programa}) |
| Frase-legado | [Vingança / alma / veneno](${expressao}) |
| Hub Artes | [Artes](${artes}) |
| Cuidado e vizinhança | [Vida](${vida}) |

## Limites

- Não romantizamos dívidas, violência doméstica caricaturada nem estereótipos de época — a homenagem é ao **ofício** e aos **avisos bons** que a personagem carregou.  
- Não confundir actor e personagem: Valdés ≠ Madruga em vida privada.  
- Direitos e créditos comerciais pertencem aos detentores da obra; aqui só há inspeção cultural educativa.

## Veredicto

**Aprovado na série Pessoas — com honra explícita.** Ramón Valdés recebe os devidos méritos como intérprete que deu alma ao Seu Madruga: humor com dignidade, ética sem sermão e lugar permanente na memória cultural latino-americana. Continuar em [Chaves · o programa e a turma](${programa}).

[▶ Pessoas](${hub}) · [▶ Chaves (programa)](${programa}) · [▶ Expressão da vingança](${expressao}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial homage to **Ramón Valdés** (1923–1988) — the Mexican actor who embodied **Seu Madruga** (*Don Ramón*) in *El Chavo del Ocho*. BudGanja restores his **due credit**: craft of popular comedy, dignity, and the warning against resentment.

> Independent audit. Not private gossip. Credit shared with creator Roberto Gómez Bolaños and the ensemble; Valdés’s merit is the **performance**.

## Merits

| Merit | Why |
|-------|-----|
| Popular acting craft | Made the character unforgettable across Latin America |
| Dignity in comedy | Poverty is not treated as a moral punchline |
| Caring father figure | Bond with Chilindrina / Chiquinha inside the jokes |
| Moral without sermon | Lines like [the revenge saying](${expressao}) |
| Ensemble player | Shines without erasing the cast — see [the show](${programa}) |

## Verdict

**Approved in People — with explicit honour.** Continue at [Chaves · show & cast](${programa}).

[▶ People](${hub}) · [▶ Show](${programa}) · [▶ Saying](${expressao})
`;

  const contentEs = `## Alcance

Homenaje editorial a **Ramón Valdés** (1923–1988) — el actor mexicano que dio cuerpo a **Don Ramón** (*Seu Madruga*) en *El Chavo del Ocho*. BudGanja le devuelve el **mérito debido**: oficio cómico, dignidad y el aviso contra el rencor.

> Auditoría independiente. El mérito de Valdés es la **interpretación**; el crédito se comparte con Chespirito y la troupe.

## Méritos

| Mérito | Por qué |
|--------|---------|
| Oficio de actor popular | Personaje inolvidable en Latinoamérica |
| Dignidad en la comicidad | La precariedad no es humillación gratuita |
| Paternidad afectiva | Vínculo con la Chilindrina |
| Ética sin sermón | Frases como [la de la venganza](${expressao}) |
| Ensemble | Brilla sin apagar a la tropa — ver [el programa](${programa}) |

## Veredicto

**Aprobado en Personas — con honra explícita.** Seguir en [El Chavo · programa y tropa](${programa}).

[▶ Personas](${hub}) · [▶ Programa](${programa}) · [▶ Dicho](${expressao})
`;

  return { body, contentEn, contentEs };
}

function buildRamonValdesPost() {
  const { body, contentEn, contentEs } = buildRamonValdesBodies();
  return figuraPost({
    title:
      'Inspeção: Ramón Valdés — Seu Madruga e os devidos méritos',
    titleEn:
      'Inspection: Ramón Valdés — Seu Madruga and due credit',
    titleEs:
      'Inspección: Ramón Valdés — Don Ramón y los méritos debidos',
    excerpt:
      'Pessoas: homenagem a Ramón Valdés (1923–1988) — o actor que deu dignidade cómica ao Seu Madruga; ofício, ética sem sermão e legado cultural latino-americano.',
    excerptEn:
      'People: homage to Ramón Valdés (1923–1988) — the actor who gave comic dignity to Seu Madruga; craft, ethics without sermon and Latin American cultural legacy.',
    excerptEs:
      'Personas: homenaje a Ramón Valdés (1923–1988) — el actor que dio dignidad cómica a Don Ramón; oficio, ética sin sermón y legado cultural latinoamericano.',
    slug: 'inspecao-figura-ramon-valdes',
    date: '2026-08-02T21:00:00.000Z',
    seriesOrder: 10,
    seriesLabel: 'Ramón Valdés · pessoa',
    coverImage: '/imagens/inspecoes/ramon-valdes-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/Ram%C3%B3n_Vald%C3%A9s',
    body,
    contentEn,
    contentEs
  });
}

function buildChavesProgramaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const madruga = '/posts/post-inspecao-figura-ramon-valdes.html';
  const expressao =
    '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const wiki = 'https://pt.wikipedia.org/wiki/El_Chavo_del_Ocho';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção cultural de ***El Chavo del Ocho*** (*Chaves* no Brasil) — sitcom mexicana criada por **Roberto Gómez Bolaños** (*Chespirito*) — como **obra de vizinhança** e homenagem à **turma inteira**: empatia, partilha, limites e humor sem precisar de crueldade gratuita.

> **Nota metodológica:** auditoria independente BudGanja. Fontes públicas (incl. [Wikipédia · El Chavo del Ocho](${wiki})), memória de exibição no Brasil e leitura cultural. Episódios antigos têm gags de época (tapas, estereótipos) — a ficha abaixo inclui **como assistir com cuidado**. Sem afiliação comercial com detentores de direitos.

Homenagem irmã: [Ramón Valdés / Seu Madruga](${madruga}). Frase-legado: [vingança / alma / veneno](${expressao}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **El Chavo del Ocho** (*Chaves*) |
| Criador | Roberto Gómez Bolaños (*Chespirito*) |
| País / época | México · anos 1970–1980 (sketches e série) |
| Tipo | Sitcom / humor de vila · ensemble |
| Tipo BudGanja | Artes — obra + turma |
| Elo Pessoa | [Ramón Valdés](${madruga}) |
| Elo Expressão | [Vingança nunca é plena…](${expressao}) |
| Fonte | [Wikipédia · El Chavo del Ocho](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o bem que a série ensina não está num «manual» — está na **vila como laboratório social**: partilhar o pão, fora da escola, briga e reconciliação.  
**H2:** cada membro da turma carrega um **mérito cultural** (ver tabela) — por isso a homenagem é colectiva.  
**H3:** assistir *Chaves* hoje pede **contexto**: rir e nomear o que já não se imita (tapas, gozação pesada).

## Homenagem à turma — méritos devidos

| Personagem (BR) | Intérprete | Mérito que o laboratório reconhece |
|-----------------|------------|-------------------------------------|
| **Chaves** | Roberto Gómez Bolaños | Ingenuidade generosa; personagem que quer pertencer e partilhar |
| **Seu Madruga** | Ramón Valdés | Dignidade na precariedade; ética sem sermão — [ficha própria](${madruga}) |
| **Chiquinha** | María Antonieta de las Nieves | Esperteza afectuosa; lealdade e voz própria |
| **Kiko** | Carlos Villagrán | Orgulho frágil e amizade competitiva — rir da vaidade sem destruir o amigo |
| **Nhonho** | Édgar Vivar | Comicidade do excesso + humanidade; também o peso do Senhor Barriga |
| **Dona Florinda** | Florinda Meza | Protecção maternal intensa; caricatura que pede conversa sobre respeito |
| **Professor Girafales** | Rubén Aguirre | Figura do mestre — estudo, formalidade e paixão ridícula (humana) |
| **Dona Clotilde** | Angelines Fernández | Vizinhança excêntrica; lembrar que «diferente» não é monstro |
| **Popis** | Florinda Meza | Extensão do núcleo da vila — brincadeira e imitação |
| **Godinez** | Horacio Gómez Bolaños | O colega quieto — presença sem precisar ser o centro |
| **Senhor Barriga** | Édgar Vivar | Trabalho e cobrança do aluguer — humor sobre dívida **sem** glorificar humilhação |
| **Jaiminho** | Raúl «Chato» Padilla | O carteiro que «sobrevive» — preguiça cómica vs responsabilidade (contexto) |
| **Chespirito (criador)** | Roberto Gómez Bolaños | Arquitectura da vila, sketches e insistência em humor popular acessível |

**Veredicto de turma:** o brilho é **coral**. Honrar só um e apagar os outros seria inspecção incompleta — por isso esta ficha enumera méritos de todos os pilares.

## O que a obra ensina de bom

| Aprendizado | Onde aparece na vila |
|-------------|----------------------|
| **Partilhar** | Sanduíche de presunto, brinquedos, espaço do pátio |
| **Pedir desculpa** | Depois da confusão — o gag fecha com reconciliação |
| **Amizade atravessa diferença** | Chaves, Chiquinha, Kiko, Nhonho — temperamentos distintos |
| **Escola importa** | Sala do Professor Girafales — estudar também é cena |
| **Palavra tem peso** | Avisos como [a frase do Madruga sobre vingança](${expressao}) |
| **Vizinho não é inimigo** | A vila inteira como rede (eco de [Vida](${vida})) |

## Como assistir com cuidado

Obra de humor clássico latino-americano que ainda fala de pertença e partilha — com **contexto** para gags de época.

Boas práticas ao assistir hoje:

1. **Escolher episódios** mais leves para as primeiras sessões.  
2. **Pausar e conversar** se houver tapa ou gozação: «isso era gag antigo; não se imita».  
3. **Destacar o bom:** pedir desculpa, partilhar, ajudar o amigo.  
4. **Emparelhar** com obras que nomeiam emoções com vocabulário actual — ex. [Divertida Mente](${divertida}).  
5. **Honrar o elenco** pelo nome: dizer Ramón Valdés, Chespirito, María Antonieta… — méritos têm dono.

## Cruzamentos

| Tema | Recurso |
|------|---------|
| Hub Artes | [Artes](${hub}) |
| Seu Madruga (pessoa) | [Ramón Valdés](${madruga}) |
| Expressão-legado | [Vingança / alma / veneno](${expressao}) |
| Emoções (outra porta) | [Divertida Mente](${divertida}) |
| Cuidado e vizinhança | [Vida](${vida}) |

## Limites

- Gags de violência cómica e estereótipos de género/época **não** são endossados — são contexto histórico.  
- Não cobrimos todos os episódios nem spin-offs animados em detalhe.  
- Direitos da obra pertencem aos detentores legais; esta ficha é educativa.

## Veredicto

**Aprovado na série Artes — homenagem à turma.** *Chaves* / *El Chavo del Ocho* merece lugar no laboratório como humor de vizinhança que ensina partilha e reconciliação; a turma toda recebe méritos; Ramón Valdés tem [homenagem própria](${madruga}).

[▶ Artes](${hub}) · [▶ Ramón Valdés](${madruga}) · [▶ Expressão](${expressao}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Cultural inspection of ***El Chavo del Ocho*** (*Chaves* in Brazil) — Mexican sitcom by **Roberto Gómez Bolaños** (*Chespirito*) — as a **neighbourhood work** and homage to the **whole cast**: empathy, sharing, limits and humour without needing gratuitous cruelty.

> Independent BudGanja audit. Older slapstick needs context.

Sister homage: [Ramón Valdés / Seu Madruga](${madruga}).

## Cast merits (summary)

Chaves (Bolaños), Seu Madruga ([Valdés](${madruga})), Chiquinha (de las Nieves), Kiko (Villagrán), Nhonho / Señor Barriga (Vivar), Dona Florinda / Popis (Meza), Professor Girafales (Aguirre), Dona Clotilde (Fernández), Godinez (Horacio Gómez), Jaiminho (Padilla), plus Chespirito as architect of the neighbourhood.

## Watching with care

**Classic Latin American humour** — pause on slapstick; highlight sharing, apologies and friendship. Pair with [Inside Out](${divertida}) for modern emotion vocabulary.

## Verdict

**Approved in Arts — ensemble homage.** Full honour to the cast; Valdés has a [dedicated People sheet](${madruga}).

[▶ Arts](${hub}) · [▶ Valdés](${madruga}) · [▶ Saying](${expressao})
`;

  const contentEs = `## Alcance

Inspección cultural de ***El Chavo del Ocho*** (*Chaves* en Brasil) — sitcom mexicana de **Roberto Gómez Bolaños** (*Chespirito*) — como **obra de vecindad** y homenaje a **toda la tropa**: empatía, compartir, límites y humor sin crueldad gratuita.

> Auditoría independiente. El slapstick antiguo pide contexto.

Homenaje hermano: [Ramón Valdés / Don Ramón](${madruga}).

## Méritos del elenco (resumen)

El Chavo (Bolaños), Don Ramón ([Valdés](${madruga})), Chilindrina (de las Nieves), Quico (Villagrán), Ñoño / Señor Barriga (Vivar), Doña Florinda / Popis (Meza), Profesor Jirafales (Aguirre), Doña Clotilde (Fernández), Godínez (Horacio Gómez), Jaimito (Padilla), más Chespirito como arquitecto de la vecindad.

## Cómo ver con cuidado

**Humor clásico latinoamericano** — pausar el slapstick; destacar el compartir, pedir perdón y la amistad. Emparejar con [Intensamente](${divertida}).

## Veredicto

**Aprobado en Artes — homenaje al elenco.** Honor al ensemble; Valdés tiene [ficha propia en Personas](${madruga}).

[▶ Artes](${hub}) · [▶ Valdés](${madruga}) · [▶ Dicho](${expressao})
`;

  return { body, contentEn, contentEs };
}

function buildChavesProgramaPost() {
  const { body, contentEn, contentEs } = buildChavesProgramaBodies();
  return artePost({
    title:
      'Inspeção: Chaves (El Chavo del Ocho) — a turma e o bem que ensina',
    titleEn:
      'Inspection: El Chavo del Ocho — the cast and what it teaches',
    titleEs:
      'Inspección: El Chavo del Ocho — la tropa y lo bueno que enseña',
    excerpt:
      'Artes: *Chaves* / *El Chavo del Ocho* — homenagem à turma inteira e méritos de cada pilar: partilha, desculpa e amizade.',
    excerptEn:
      'Arts: *El Chavo del Ocho* — homage to the whole cast and merits of each pillar: sharing, apology and friendship.',
    excerptEs:
      'Artes: *El Chavo del Ocho* — homenaje a toda la tropa y méritos de cada pilar: compartir, pedir perdón y amistad.',
    slug: 'inspecao-serie-chaves-el-chavo',
    date: '2026-08-02T21:30:00.000Z',
    seriesOrder: 20,
    seriesLabel: 'Chaves · Artes',
    coverImage: '/imagens/inspecoes/chaves-el-chavo-cover.jpg',
    sourceUrl: 'https://pt.wikipedia.org/wiki/El_Chavo_del_Ocho',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRamonValdesPost,
  buildRamonValdesBodies,
  buildChavesProgramaPost,
  buildChavesProgramaBodies
};
