'use strict';

/**
 * Ciclo Divertidamente / Divertida Mente (Pixar, 2015):
 * Artes (filme) + Palavras (emoção hub + Alegria, Tristeza, Raiva, Medo, Nojinho).
 * Mensagem BudGanja: todas as emoções importam; literacia emocional ≠ protocolo clínico.
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
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  return post;
}

function palavraPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'palavras-origem',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Palavras',
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

const FILME = '/posts/post-inspecao-filme-divertida-mente.html';
const EMOCAO = '/posts/post-inspecao-palavra-emocao.html';
const ALEGRIA = '/posts/post-inspecao-palavra-alegria.html';
const TRISTEZA = '/posts/post-inspecao-palavra-tristeza.html';
const RAIVA = '/posts/post-inspecao-palavra-raiva.html';
const MEDO = '/posts/post-inspecao-palavra-medo.html';
const NOJINHO = '/posts/post-inspecao-palavra-nojinho.html';
const CAMINHO = '/posts/post-inspecao-palavra-caminho.html';
const PASSAR = '/posts/post-inspecao-palavra-passar.html';
const COELHO = '/posts/post-inspecao-palavra-coelho.html';
const ALICE = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
const MATRIX = '/posts/post-inspecao-filme-the-matrix.html';
const CURINGA = '/posts/post-inspecao-arte-o-dia-do-curinga.html';
const ARTES = '/biblioteca/inspecoes/#inspecoes-artes';
const PALAVRAS = '/biblioteca/inspecoes/#inspecoes-palavras';

function buildDivertidamenteBodies() {
  const inspected = '2026-08-01';
  const wiki = 'https://pt.wikipedia.org/wiki/Divertida_Mente';
  const wikiEn = 'https://en.wikipedia.org/wiki/Inside_Out_(2015_film)';
  const ytId = 'ukQeR3zYncw';
  const yt = 'https://www.youtube.com/watch?v=' + ytId;

  const body = `## Escopo

Inspeção editorial de **«Divertida Mente»** (*Inside Out*, 2015) — filme de animação da **Pixar** realizado por **Pete Docter** (com Ronnie del Carmen). O **início de tudo** é esta obra: a mente de **Riley** como paisagem, e as cinco emoções personificadas que a guiam. No Brasil o título oficial é **Divertida Mente**; «Divertidamente» entra como forma corrente. A sequela *Divertida Mente 2* (2024) fica como **eco** — novas emoções (Ansiedade, Inveja, Vergonha, Tédio) sem substituir a génese de 2015.

> **Nota metodológica:** auditoria independente BudGanja. Fontes: [Wikipédia · Divertida Mente](${wiki}), [Wikipedia · Inside Out (2015)](${wikiEn}), trailer oficial dublado ([Walt Disney Studios BR](${yt})). Crédito: Disney/Pixar — sem afiliação. **Não confundir** com Canais (YouTube) nem com Legado clínico. O filme é **literacia emocional em parábola**; o laboratório **não** oferece psicoterapia nem protocolo de substâncias. Indexar ≠ endossar marca.

Esta ficha é Artes · **cinema primeiro**. Rede lexical: [emoção](${EMOCAO}) e as cinco palavras da Riley — [Alegria](${ALEGRIA}), [Tristeza](${TRISTEZA}), [Raiva](${RAIVA}), [Medo](${MEDO}), [Nojinho](${NOJINHO}).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Obra | **Divertida Mente** (*Inside Out*) |
| Ano | **2015** |
| Realização | Pete Docter · Ronnie del Carmen |
| Estúdio | Pixar Animation Studios / Walt Disney Pictures |
| Protagonista | Riley Andersen — e as emoções no centro de comando |
| Emoções âncora (dublagem BR) | Alegria · Tristeza · Raiva · Medo · **Nojinho** |
| Sequela (eco) | *Divertida Mente 2* (2024) — fora do recorte principal |
| Tipo BudGanja | Arte — **filme primeiro**; Palavras em fichas irmãs |
| Elo Palavras hub | [emoção](${EMOCAO}) |
| Fonte | [Wikipédia · Divertida Mente](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** a mensagem que o laboratório guarda com carinho: **nenhuma emoção é lixo** — inclusive a Tristeza, que permite pedido de ajuda e ligação.  
**H2:** a mudança de cidade (Minnesota → São Francisco) é um **caminho** e um **passar** — ver [caminho](${CAMINHO}) e [passar](${PASSAR}).  
**H3:** a mente de Riley é um «país» de regras próprias — par cultural com [Alice](${ALICE}) / [coelho](${COELHO}) (entrar noutro mapa) e com [Matrix](${MATRIX}) (mundo por baixo do quotidiano), sem confundir obras.  
**H4:** as **palavras** das emoções merecem fichas próprias — o filme dá rostos; o laboratório dá etimologia e rede.

Passos:

1. Fixar génese (2015, Docter, Pixar).  
2. Declarar tese emocional a partir do **filme**.  
3. Mapear as cinco emoções → Palavras.  
4. Embed do trailer de referência.  
5. Status + elos.

## O início de tudo — génese

| Marco | O que importa |
|-------|----------------|
| Ideia | Pete Docter parte da observação das emoções da própria filha ao crescer |
| Estreia | **2015** — aclamação crítica; Oscar de Melhor Animação |
| Dublagem BR | Nomes que o público brasileiro memoriza: Alegria, Tristeza, Raiva, Medo, **Nojinho** |
| Núcleo narrativo | Riley muda de cidade; Alegria tenta controlar; Tristeza toca memórias; as duas perdem-se na mente e regressam com outra sabedoria |

> **Hierarquia BudGanja:** sem o filme de 2015 não há o léxico emocional desta rede. A sequela amplia; não substitui.

## A mensagem (com carinho)

O laboratório lê *Divertida Mente* assim — e esta leitura importa:

1. **Alegria não basta sozinha.** Querer que Riley esteja sempre feliz é amor mal calibrado; o filme mostra o custo.  
2. **Tristeza não é falha.** Ela sinaliza perda, pede colo, permite que os pais vejam a filha de verdade.  
3. **Raiva, Medo e Nojinho têm ofício.** Protegem limites, evitam perigo, rejeitam o que faz mal — literacia, não vilania.  
4. **Memórias mistas são humanas.** Uma experiência pode ser alegre e triste ao mesmo tempo — complexidade ≠ defeito.  
5. **Crescer é mudar o mapa interno.** O «caminho» da Riley não é apagar emoções; é aprender a **passar** com todas elas a bordo.

Esta é a «mensagem muito boa» que o utilizador nomeou — e que o BudGanja documenta sem sentimentalismo vazio: **cuidado com prova**, emoção com nome, rede com elos.

## As cinco palavras da Riley

| Emoção (BR) | Papel na obra | Ficha Palavras |
|-------------|---------------|----------------|
| **Alegria** | Quer o bem-estar; aprende a partilhar o comando | [alegria](${ALEGRIA}) |
| **Tristeza** | Toca o azul nas memórias; abre o pedido de ajuda | [tristeza](${TRISTEZA}) |
| **Raiva** | Fogo quando a justiça interna falha | [raiva](${RAIVA}) |
| **Medo** | Segurança e antecipação de risco | [medo](${MEDO}) |
| **Nojinho** | Aversão protetora (brócolis incluído) | [nojinho](${NOJINHO}) |

Hub lexical: [emoção](${EMOCAO}).

## Tese cultural BudGanja

| Tema no filme | Tradução editorial |
|---------------|-------------------|
| Centro de comando | Atenção e narrativa interna — inspecionar o que «manda» |
| Ilhas da personalidade | Identidade como rede (família, amizade, hóquei…) — pode ruir e reconstruir |
| Memórias centrais | O que fica com cor emocional; literacia ≠ apagar o passado |
| Tristeza necessária | Validar o sentir; pedir ajuda é força |
| Mudança de cidade | [caminho](${CAMINHO}) / [passar](${PASSAR}) — travessia sem mapa completo |
| Mente como território | Par com [Alice](${ALICE}) — curiosidade no país das regras estranhas |

## Trailer de referência

@youtube ${ytId}

| Campo | Valor |
|-------|-------|
| Título | Divertida Mente — Trailer Oficial Dublado |
| Canal | Walt Disney Studios BR |
| URL | ${yt} |

## Rede BudGanja

| Recurso | Elo |
|---------|-----|
| [emoção](${EMOCAO}) + cinco Palavras | Léxico da Riley |
| [caminho](${CAMINHO}) · [passar](${PASSAR}) | Mudança e travessia |
| [Alice](${ALICE}) · [coelho](${COELHO}) | Entrar noutro mapa |
| [Matrix](${MATRIX}) | Mundo interno / escolha |
| [O Dia do Curinga](${CURINGA}) | Pergunta «quem somos?» |
| Hub [Artes](${ARTES}) · [Palavras](${PALAVRAS}) | Separar obra e léxico |

## Avaliação BudGanja

### Forças
- Mensagem de **inclusão emocional** clara e repetível.  
- Dá rostos memoráveis a palavras — ponte perfeita Artes × Palavras.  
- Útil para literacia sem patologizar o quotidiano.

### Limites
- Não é manual de psicologia clínica.  
- A sequela 2024 (Ansiedade…) fica para ficha futura se a fila pedir.  
- Direitos da obra pertencem à Disney/Pixar — só análise editorial.

## Como repetir o método

1. Filme primeiro (ano, autor, título local).  
2. Extrair **tese emocional** em linguagem do laboratório.  
3. Uma ficha Palavras por emoção nomeada.  
4. Cruzar caminho/passar/Alice sem forçar alegoria de substâncias.  
5. Status.

## Status

**Aprovado na série Artes** — *Divertida Mente* (2015) documentado com carinho: génese Pixar, mensagem de que **todas as emoções importam**, e rede completa com [emoção](${EMOCAO}) e as cinco palavras da Riley.

[▶ Artes](${ARTES}) · [▶ Emoção](${EMOCAO}) · [▶ Alegria](${ALEGRIA}) · [▶ Tristeza](${TRISTEZA}) · [▶ Caminho](${CAMINHO})
`;

  const contentEn = `## Scope

Editorial inspection of **Inside Out** (*Divertida Mente*, 2015) — Pixar film by **Pete Docter**. **Beginning of everything:** Riley’s mind and five personified emotions. Brazilian dub names: Alegria, Tristeza, Raiva, Medo, **Nojinho**. Sequel 2024 is an echo only.

> **Method note:** independent BudGanja audit. Sources: [Wikipedia](${wikiEn}), [PT](${wiki}), trailer (${yt}). **Not therapy.** Emotional literacy parable — no substance protocol.

Word network: [emoção](${EMOCAO}) · [alegria](${ALEGRIA}) · [tristeza](${TRISTEZA}) · [raiva](${RAIVA}) · [medo](${MEDO}) · [nojinho](${NOJINHO}).

## Message (lab reading)

No emotion is trash. Sadness enables help-seeking. Joy cannot rule alone. Mixed memories are human. Growing up remaps the inner [caminho](${CAMINHO}) / [passar](${PASSAR}).

## Status

**Approved in Arts** — Inside Out (2015) with full emotion-word network.

[▶ Arts](${ARTES}) · [▶ emoção](${EMOCAO})
`;

  const contentEs = `## Alcance

Inspección de **Intensamente / Divertida Mente** (*Inside Out*, 2015) — Pixar, **Pete Docter**. **Inicio de todo:** la mente de Riley y cinco emociones. Doblaje BR: Alegria, Tristeza, Raiva, Medo, **Nojinho**. La secuela 2024 es eco.

> **Nota metodológica:** auditoría independiente. Fuentes: [Wikipedia](${wikiEn}), [PT](${wiki}), tráiler (${yt}). **No es terapia.** Parábola de literacia emocional.

Red léxica: [emoção](${EMOCAO}) y las cinco fichas.

## Mensaje

Ninguna emoción es basura. La tristeza permite pedir ayuda. La alegría no basta sola. Crecer reescribe el [caminho](${CAMINHO}).

## Estado

**Aprobada en Artes** — con red completa de palabras-emoción.

[▶ Artes](${ARTES}) · [▶ emoção](${EMOCAO})
`;

  return { body, contentEn, contentEs, ytId, wiki };
}

function buildDivertidamentePost() {
  const { body, contentEn, contentEs, ytId, wiki } = buildDivertidamenteBodies();
  return artePost({
    title:
      'Inspeção: Divertida Mente — as emoções da Riley e a mensagem que importa',
    titleEn:
      'Inspection: Inside Out — Riley’s emotions and the message that matters',
    titleEs:
      'Inspección: Intensamente — las emociones de Riley y el mensaje que importa',
    excerpt:
      'Artes: Divertida Mente (Pixar, 2015) — literacia emocional com carinho; Alegria, Tristeza, Raiva, Medo e Nojinho em rede com a série Palavras. Todas as emoções importam.',
    excerptEn:
      'Arts: Inside Out (Pixar, 2015) — emotional literacy with care; Joy, Sadness, Anger, Fear and Disgust linked to the Words series. Every emotion matters.',
    excerptEs:
      'Artes: Intensamente / Divertida Mente (Pixar, 2015) — literacia emocional; Alegría, Tristeza, Ira, Miedo y Asco en red con Palabras. Todas las emociones importan.',
    slug: 'inspecao-filme-divertida-mente',
    date: '2026-08-01T23:55:00.000Z',
    seriesOrder: 9,
    seriesLabel: 'Divertida Mente · Artes',
    coverImage: '/imagens/inspecoes/divertida-mente-cover.jpg',
    sourceUrl: wiki,
    videoId: ytId,
    body,
    contentEn,
    contentEs
  });
}

function buildEmocaoBodies() {
  const inspected = '2026-08-01';
  const body = `## Escopo

Inspeção editorial da palavra **emoção** — substantivo que nomeia o **movimento interno** do sentir. Esta ficha é o **hub lexical** das emoções da Riley em [Divertida Mente](${FILME}): cinco personificações, uma só rede.

> **Nota metodológica:** étimo de trabalho: latim *ēmotiō* / *ēmovēre* («mover para fora»). Não é manual clínico DSM. Rede cultural BudGanja com o filme Pixar (2015).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **emoção** |
| Étimo | Latim *ēmovēre* → *ēmotiō* |
| Cognatos | esp. *emoción* · fr. *émotion* · ing. *emotion* |
| Tipo BudGanja | Palavra — hub das emoções da Riley |
| Elo Artes | [Divertida Mente](${FILME}) |
| Filhas lexicais | [alegria](${ALEGRIA}) · [tristeza](${TRISTEZA}) · [raiva](${RAIVA}) · [medo](${MEDO}) · [nojinho](${NOJINHO}) |
| Data | ${inspected} |

## Hipóteses

**H1:** sem a palavra **emoção** as cinco fichas ficam soltas; o hub dá o mapa.  
**H2:** o filme ensina que emoção ≠ inimiga — literacia é **nomear** e **relacionar**.  
**H3:** cruzar com [caminho](${CAMINHO}) e [passar](${PASSAR}): sentir é também atravessar.

## Rede da Riley

| Palavra | Cor simbólica (filme) | Ofício |
|---------|----------------------|--------|
| [Alegria](${ALEGRIA}) | Amarelo | Cuidar do bem-estar sem monopolizar |
| [Tristeza](${TRISTEZA}) | Azul | Pedir ajuda; honrar a perda |
| [Raiva](${RAIVA}) | Vermelho | Limite e indignação justa |
| [Medo](${MEDO}) | Roxo | Antecipar risco |
| [Nojinho](${NOJINHO}) | Verde | Aversão protetora |

## Status

**Aprovado** — hub lexical das emoções da Riley, com elo vivo a [Divertida Mente](${FILME}).

[▶ Palavras](${PALAVRAS}) · [▶ Divertida Mente](${FILME}) · [▶ Alegria](${ALEGRIA}) · [▶ Tristeza](${TRISTEZA})
`;

  const contentEn = `## Scope

Hub word **emoção** (“emotion”) for Riley’s five feelings in [Inside Out](${FILME}). Etymon Latin *ēmovēre*. Not a clinical manual.

## Network

[alegria](${ALEGRIA}) · [tristeza](${TRISTEZA}) · [raiva](${RAIVA}) · [medo](${MEDO}) · [nojinho](${NOJINHO})

## Status

**Approved** — lexical hub linked to the film.

[▶ Words](${PALAVRAS}) · [▶ Inside Out](${FILME})
`;

  const contentEs = `## Alcance

Hub léxico **emoção** para las cinco emociones de Riley en [Divertida Mente](${FILME}). Étimo latín *ēmovēre*.

## Red

[alegria](${ALEGRIA}) · [tristeza](${TRISTEZA}) · [raiva](${RAIVA}) · [medo](${MEDO}) · [nojinho](${NOJINHO})

## Estado

**Aprobada** — hub con vínculo al filme.

[▶ Palabras](${PALAVRAS}) · [▶ Divertida Mente](${FILME})
`;

  return { body, contentEn, contentEs };
}

function buildEmocaoPost() {
  const { body, contentEn, contentEs } = buildEmocaoBodies();
  return palavraPost({
    title: 'Inspeção: Emoção — o hub lexical da Riley (Divertida Mente)',
    titleEn: 'Inspection: Emoção — Riley’s lexical hub (Inside Out)',
    titleEs: 'Inspección: Emoção — el hub léxico de Riley (Intensamente)',
    excerpt:
      'Palavras: «emoção» (*ēmovēre*) — hub das cinco emoções da Riley em Divertida Mente; literacia do sentir com elos a Alegria, Tristeza, Raiva, Medo e Nojinho.',
    excerptEn:
      'Words: “emoção” (*ēmovēre*) — hub of Riley’s five emotions in Inside Out; literacy of feeling with links to Joy, Sadness, Anger, Fear and Disgust.',
    excerptEs:
      'Palabras: «emoção» (*ēmovēre*) — hub de las cinco emociones de Riley; literacia del sentir con vínculos a las cinco fichas.',
    slug: 'inspecao-palavra-emocao',
    date: '2026-08-01T23:56:00.000Z',
    seriesOrder: 12,
    seriesLabel: 'Emoção · palavra',
    coverImage: '/imagens/inspecoes/emocao-palavra-cover.jpg',
    sourceUrl: FILME,
    body,
    contentEn,
    contentEs
  });
}

/**
 * cfg: { word, slugSuffix, seriesOrder, color, role, etymon, cognates, title*, excerpt*, bodyExtra? }
 */
function buildRileyEmotionPost(cfg) {
  const inspected = '2026-08-01';
  const siblings = [
    ['alegria', ALEGRIA, 'Alegria'],
    ['tristeza', TRISTEZA, 'Tristeza'],
    ['raiva', RAIVA, 'Raiva'],
    ['medo', MEDO, 'Medo'],
    ['nojinho', NOJINHO, 'Nojinho']
  ]
    .filter(([id]) => id !== cfg.slugSuffix)
    .map(([, href, label]) => `[${label}](${href})`)
    .join(' · ');

  const body = `## Escopo

Inspeção editorial da palavra **${cfg.word}** — uma das cinco emoções personificadas de **Riley** em [Divertida Mente](${FILME}). Cor simbólica no filme: **${cfg.color}**. Ofício narrativo: ${cfg.role}

> **Nota metodológica:** auditoria linguística e cultural. Étimo de trabalho: ${cfg.etymon}. Não é diagnóstico. Hub: [emoção](${EMOCAO}). Sem afiliação Disney/Pixar.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **${cfg.word}** |
| Étimo (trabalho) | ${cfg.etymon} |
| Cognatos / notas | ${cfg.cognates} |
| Tipo BudGanja | Palavra — sentimento da Riley |
| Elo Artes | [Divertida Mente](${FILME}) |
| Hub | [emoção](${EMOCAO}) |
| Irmãs | ${siblings} |
| Data | ${inspected} |

## Hipóteses

**H1:** nomear **${cfg.word}** treina literacia — o filme dá rosto; a ficha dá rede.  
**H2:** no arco de Riley, esta emoção **não é vilã**; tem ofício (${cfg.role}).  
**H3:** cruzar com [caminho](${CAMINHO}) e [passar](${PASSAR}): sentir também é atravessar.

## No filme (com carinho)

${cfg.filmNote}

## Rede BudGanja

| Recurso | Elo |
|---------|-----|
| [Divertida Mente](${FILME}) | Obra âncora |
| [emoção](${EMOCAO}) | Hub lexical |
| ${siblings} | Irmãs da sala de comando |
| [caminho](${CAMINHO}) · [passar](${PASSAR}) | Travessia da mudança |
| [Alice](${ALICE}) | Outro mapa interior |

## Status

**Aprovado** — «${cfg.word}» documentada como palavra-sentimento da Riley, com elo vivo a [Divertida Mente](${FILME}).

[▶ ${cfg.word}](${EMOCAO}) · [▶ Divertida Mente](${FILME}) · [▶ Emoção](${EMOCAO})
`;

  const contentEn = `## Scope

Word **${cfg.word}** — one of Riley’s five emotions in [Inside Out](${FILME}). Role: ${cfg.role}. Hub: [emoção](${EMOCAO}).

## Status

**Approved** — emotion-word linked to the film.

[▶ Inside Out](${FILME}) · [▶ emoção](${EMOCAO})
`;

  const contentEs = `## Alcance

Palabra **${cfg.word}** — una de las cinco emociones de Riley en [Divertida Mente](${FILME}). Oficio: ${cfg.role}. Hub: [emoção](${EMOCAO}).

## Estado

**Aprobada** — palabra-sentimiento con vínculo al filme.

[▶ Divertida Mente](${FILME}) · [▶ emoção](${EMOCAO})
`;

  return palavraPost({
    title: cfg.title,
    titleEn: cfg.titleEn,
    titleEs: cfg.titleEs,
    excerpt: cfg.excerpt,
    excerptEn: cfg.excerptEn,
    excerptEs: cfg.excerptEs,
    slug: 'inspecao-palavra-' + cfg.slugSuffix,
    date: cfg.date,
    seriesOrder: cfg.seriesOrder,
    seriesLabel: cfg.word.charAt(0).toUpperCase() + cfg.word.slice(1) + ' · palavra',
    coverImage: '/imagens/inspecoes/' + cfg.slugSuffix + '-palavra-cover.jpg',
    sourceUrl: FILME,
    body,
    contentEn,
    contentEs
  });
}

function buildAlegriaPost() {
  return buildRileyEmotionPost({
    word: 'alegria',
    slugSuffix: 'alegria',
    seriesOrder: 13,
    date: '2026-08-01T23:56:10.000Z',
    color: 'amarelo',
    role: 'quer o bem-estar de Riley; aprende a não monopolizar o comando',
    etymon: 'latim *alacer* / *alacritās* → pt. *alegria* (via *alegre*)',
    cognates: 'esp. *alegría* · fr. *allégresse* (parcial) · ing. *joy* / *happiness* (tradução)',
    filmNote:
      'Alegria é a primeira a chegar e a que mais tempo passa no botão. O filme ama-a — e corrige-a com ternura: **felicidade permanente não é cuidado**. Quando deixa a Tristeza trabalhar, Riley consegue falar com os pais. Essa é a viragem de ouro.',
    title: 'Inspeção: Alegria — a palavra amarela da Riley',
    titleEn: 'Inspection: Alegria — Riley’s yellow word (Joy)',
    titleEs: 'Inspección: Alegria — la palabra amarilla de Riley',
    excerpt:
      'Palavras: «alegria» — emoção-âncora de Divertida Mente; quer o bem de Riley e aprende a partilhar o comando com a Tristeza.',
    excerptEn:
      'Words: “alegria” (Joy) — Inside Out’s anchor emotion; wants Riley’s good and learns to share the console with Sadness.',
    excerptEs:
      'Palabras: «alegria» — emoción ancla de Divertida Mente; aprende a compartir el mando con la Tristeza.'
  });
}

function buildTristezaPost() {
  return buildRileyEmotionPost({
    word: 'tristeza',
    slugSuffix: 'tristeza',
    seriesOrder: 14,
    date: '2026-08-01T23:56:20.000Z',
    color: 'azul',
    role: 'honrar a perda; abrir o pedido de ajuda; tingir memórias de complexidade',
    etymon: 'latim *trīstis* → pt. *triste* → *tristeza*',
    cognates: 'esp. *tristeza* · fr. *tristesse* · ing. *sadness* (tradução)',
    filmNote:
      'Tristeza começa «no canto» — e o filme pede-nos para a olhar com respeito. Ao tocar memórias, não as estraga: **completa-as**. No reencontro com os pais, é ela quem permite o choro verdadeiro. Mensagem BudGanja: **validar o azul** não é desistir; é literacia.',
    title: 'Inspeção: Tristeza — a palavra azul que também cuida',
    titleEn: 'Inspection: Tristeza — the blue word that also cares (Sadness)',
    titleEs: 'Inspección: Tristeza — la palabra azul que también cuida',
    excerpt:
      'Palavras: «tristeza» — em Divertida Mente, a emoção que abre o pedido de ajuda; sem ela a Alegria não basta.',
    excerptEn:
      'Words: “tristeza” (Sadness) — in Inside Out, the emotion that opens help-seeking; without her Joy is not enough.',
    excerptEs:
      'Palabras: «tristeza» — en Divertida Mente, la emoción que abre el pedido de ayuda.'
  });
}

function buildRaivaPost() {
  return buildRileyEmotionPost({
    word: 'raiva',
    slugSuffix: 'raiva',
    seriesOrder: 15,
    date: '2026-08-01T23:56:30.000Z',
    color: 'vermelho',
    role: 'sinalizar injustiça interna; proteger limites; fogo quando o mundo «não é justo»',
    etymon: 'latim *rabies* («fúria, raiva») → pt. *raiva*',
    cognates: 'esp. *rabia* · fr. *rage* · ing. *anger* / *rage* (tradução)',
    filmNote:
      'Raiva explode quando a muda de escola e a perda de rotina ferem o senso de justiça da Riley. O filme não a cancela: dá-lhe **ofício**. Literacia: raiva nomeada pode defender; raiva sem mapa queima a sala de comando. Relacionar com [passar](' +
      PASSAR +
      ') o que dói.',
    title: 'Inspeção: Raiva — a palavra vermelha da sala de comando',
    titleEn: 'Inspection: Raiva — the red word at the console (Anger)',
    titleEs: 'Inspección: Raiva — la palabra roja de la consola',
    excerpt:
      'Palavras: «raiva» — em Divertida Mente, fogo de limite e indignação; emoção com ofício, não vilania.',
    excerptEn:
      'Words: “raiva” (Anger) — in Inside Out, fire of boundary and indignation; emotion with a job, not villainy.',
    excerptEs:
      'Palabras: «raiva» — en Divertida Mente, fuego de límite e indignación.'
  });
}

function buildMedoPost() {
  return buildRileyEmotionPost({
    word: 'medo',
    slugSuffix: 'medo',
    seriesOrder: 16,
    date: '2026-08-01T23:56:40.000Z',
    color: 'roxo',
    role: 'antecipar perigo; ensaiar o pior cenário; cuidar da segurança',
    etymon: 'latim *metus* → pt. *medo* (via evolução românica)',
    cognates: 'esp. *miedo* · fr. *peur* (não cognato directo) · ing. *fear* (tradução)',
    filmNote:
      'Medo lê o mundo à procura de falhas de segurança — da ficha escolar ao que pode correr mal. Em doses certas, é **cuidado antecipatório**. O filme mostra o excesso (paralisia) e o valor (evitar o precipício). BudGanja: medo nomeado ≠ cobardia; é dado para inspecionar.',
    title: 'Inspeção: Medo — a palavra roxa da vigilância interior',
    titleEn: 'Inspection: Medo — the purple word of inner vigilance (Fear)',
    titleEs: 'Inspección: Medo — la palabra púrpura de la vigilancia',
    excerpt:
      'Palavras: «medo» — em Divertida Mente, a emoção da segurança e do ensaio do risco; ofício protetor.',
    excerptEn:
      'Words: “medo” (Fear) — in Inside Out, the emotion of safety and risk rehearsal; protective office.',
    excerptEs:
      'Palabras: «medo» — en Divertida Mente, la emoción de la seguridad y el ensayo del riesgo.'
  });
}

function buildNojinhoPost() {
  return buildRileyEmotionPost({
    word: 'nojinho',
    slugSuffix: 'nojinho',
    seriesOrder: 17,
    date: '2026-08-01T23:56:50.000Z',
    color: 'verde',
    role: 'aversão protetora; rejeitar o que «não entra»; humor e limite sensorial',
    etymon:
      'pt. *nojo* (aversão) + diminutivo afetivo **-inho* da dublagem BR — forma memorável do filme; quotidiano também usa *nojo* / *aversão*',
    cognates:
      'esp. *asco* · ing. *disgust* (tradução) · forma BR de ecrã: **Nojinho**',
    filmNote:
      'Nojinho é o nome que o Brasil memorizou — carinhoso e preciso. Protege Riley do que repele (sim, brócolis). Por baixo do gag há literacia: **aversão também cuida**. A ficha honra a forma do filme e aponta o substantivo *nojo* como irmão lexical adulto.',
    title: 'Inspeção: Nojinho — a palavra verde da aversão que protege',
    titleEn: 'Inspection: Nojinho — the green word of protective disgust',
    titleEs: 'Inspección: Nojinho — la palabra verde del asco que protege',
    excerpt:
      'Palavras: «nojinho» — forma BR de Divertida Mente para Disgust; aversão protetora com humor e limite.',
    excerptEn:
      'Words: “nojinho” — Brazilian Inside Out name for Disgust; protective aversion with humor and boundary.',
    excerptEs:
      'Palabras: «nojinho» — nombre BR de Divertida Mente para el Asco; aversión protectora.'
  });
}

const DIVERTIDAMENTE_ARTES_POSTS = [buildDivertidamentePost()];
const DIVERTIDAMENTE_PALAVRAS_POSTS = [
  buildEmocaoPost(),
  buildAlegriaPost(),
  buildTristezaPost(),
  buildRaivaPost(),
  buildMedoPost(),
  buildNojinhoPost()
];

module.exports = {
  DIVERTIDAMENTE_ARTES_POSTS,
  DIVERTIDAMENTE_PALAVRAS_POSTS,
  buildDivertidamentePost,
  buildDivertidamenteBodies,
  buildEmocaoPost,
  buildAlegriaPost,
  buildTristezaPost,
  buildRaivaPost,
  buildMedoPost,
  buildNojinhoPost
};
