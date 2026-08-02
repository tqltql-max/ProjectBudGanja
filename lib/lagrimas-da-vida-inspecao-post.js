'use strict';

/**
 * Inspeção Artes · poesia: «Lágrimas da Vida» (Álvares de Azevedo).
 * Lira dos Vinte Anos — ultrarromantismo brasileiro; elo com /vida/.
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

function buildLagrimasDaVidaBodies() {
  const inspected = '2026-08-02';
  const hub = '/biblioteca/inspecoes/#inspecoes-artes';
  const wikiAutor = 'https://pt.wikipedia.org/wiki/%C3%81lvares_de_Azevedo';
  const wikiLira = 'https://pt.wikipedia.org/wiki/Lira_dos_vinte_anos';
  const poema =
    'https://pt.wikisource.org/wiki/Lira_dos_Vinte_Anos/II._Lagrimas_de_sangue/Lagrimas_da_vida';
  const poemaAlt = 'https://www.escritas.org/pt/t/10787/lagrimas-da-vida';
  const vida = '/vida/';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const tristeza = '/posts/post-inspecao-palavra-tristeza.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const inspecoes = '/biblioteca/inspecoes/';

  const body = `## Escopo

Inspeção editorial do poema **«Lágrimas da Vida»** (também referido no singular como *a lágrima da vida*) — peça de **Álvares de Azevedo** na **[Lira dos Vinte Anos](${wikiLira})**, marco do **ultrarromantismo** brasileiro. O **recorte principal** é o **texto poético**; a biografia do autor e o livro completo entram como contexto.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes de apoio: [Wikipédia · Álvares de Azevedo](${wikiAutor}), [Lira dos vinte anos](${wikiLira}), texto em [Wikisource / Escritas](${poemaAlt}). Obra no domínio público (séc. XIX). **Não confundir** com Canais (YouTube) nem com [Legado](${legado}) canábico. O poema dramatiza desdém, lágrima e *mal du siècle* — o laboratório **não** romantiza autodestruição nem «suicídio no esquecimento»; lê a obra como **literatura**, e aponta o canto [Vida](${vida}) quando a dor pedir companhia, não só verso.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Título | **Lágrimas da Vida** (forma corrente: *a lágrima da vida*) |
| Autor | **Álvares de Azevedo** (1831–1852) |
| Livro | *Lira dos Vinte Anos* (publicação póstuma da poesia reunida; colectânea feita pelo autor) |
| Meio | Poema · ultrarromantismo brasileiro |
| Época | Século XIX — segunda geração romântica («mal do século») |
| Tipo BudGanja | Arte — **poema primeiro**; livro e biografia como contexto |
| Elo Vida | [Vida](${vida}) — trilha do laboratório sobre cuidado e ficar |
| Elo Palavras | [emoção](${emocao}) · [tristeza](${tristeza}) |
| Elo Artes | [Alice](${alice}) — outra obra onde a curiosidade/dor inspeciona um mundo interior |
| Fonte | [Álvares de Azevedo](${wikiAutor}) · [texto do poema](${poemaAlt}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja começa no **verso** — lágrima, sorriso fingido, peito como templo, «anjo da vida» nos sonhos.  
**H2:** o ultrarromantismo *byroniano* dramatiza a **ferida afectiva**; inspecionar a palavra **não** é adoptar o culto da morte precoce.  
**H3:** no laboratório, o poema conversa com [Vida](${vida}): a lágrima é real; a resposta do canto familiar é **ficar** e cultivar companhia — não «suicidiar-se no esquecimento».

Passos:

1. Fixar título canónico + autor + livro.  
2. Declarar tese cultural (lágrima / máscara / esperança no sonho).  
3. Separar literatura de protocolo de sofrimento.  
4. Cruzar [Vida](${vida}), [emoção](${emocao}), [tristeza](${tristeza}).  
5. Status + limites.

## Génese e contexto

| Marco | O que importa ao laboratório |
|-------|------------------------------|
| Autor | Álvares de Azevedo — principal voz da 2.ª geração romântica no Brasil; morreu aos 20 anos |
| *Lira dos Vinte Anos* | Colectânea central; partes Ariel / Calibã (sublime e grotesco) |
| «Lágrimas da Vida» | Poema de amor ferido, máscara de alegria e lágrima contida |
| Domínio público | Texto do séc. XIX — legível e citável sem afiliação comercial |
| Eco cultural | Ultrarromantismo, *mal du siècle*, influência Byron / Musset |

> **Hierarquia BudGanja:** sem o poema (e a *Lira*), não há «lágrima da vida» cultural nesta ficha. Biografia do autor explica o clima da época; **não** substitui a leitura do verso.

## A obra (síntese editorial)

- O eu lírico teme que o outro veja só o «sorrir leviano» e ignore a **lágrima** nos olhos.  
- O peito era templo; a imagem amada murchar flores e apagar a ilusão.  
- Aparecem orgias, blasfémiia e o desejo de «suicidiar» a alma no esquecimento — **figura literária** do ultrarromantismo, não conselho.  
- Ainda assim o poema fecha com o **Anjo da vida** nos sonhos e lábios orvalhados de esperança — a lágrima não apaga por completo a vida.

## Tese cultural BudGanja

| Tema no poema | Tradução editorial |
|---------------|-------------------|
| Lágrima escondida | Dor que a máscara social cobre — inspecionar o sorriso |
| Templo / imagem | Idolatria afectiva que se desfaz — verificar o altar |
| Esquecimento / orgia | Ultrarromantismo *byroniano* — literatura ≠ protocolo |
| Anjo da vida | Eco de esperança no sonho — ponte com [Vida](${vida}) |
| Tristeza / emoção | Rede [tristeza](${tristeza}) · [emoção](${emocao}) — literacia sentimental |

O laboratório **não** adopta o culto da morte jovem: usa o poema como **espelho de máscara e lágrima**, e devolve o leitor ao canto onde se cultiva ficar.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Vida](${vida}) | Mensagem do laboratório — ficar quando nada parece ligar |
| [emoção](${emocao}) · [tristeza](${tristeza}) | Léxico do sentimento |
| [Alice](${alice}) | Artes literárias — mundo interior e curiosidade |
| Hub [Artes](${hub}) · [Inspeções](${inspecoes}) | Mapa geral |

### Como ler

1. Ler o **poema** (texto público).  
2. Separar **máscara** e **lágrima** sem romantizar autodestruição.  
3. Se a dor pesar, ir a [Vida](${vida}) — companhia do laboratório, não só verso.  
4. Voltar ao [hub de inspeções](${inspecoes}).

## Avaliação BudGanja

### Forças
- Fixa uma peça canónica do ultrarromantismo brasileiro no mapa Artes.  
- Liga lágrima literária a [Vida](${vida}) e à série Palavras de sentimento.  
- Declara limites éticos claros (literatura ≠ culto da morte).

### Limites
- Não é biografia completa de Álvares de Azevedo.  
- Não inventaria toda a *Lira dos Vinte Anos*.  
- Não é apoio clínico.

## Status

**Aprovado** — «Lágrimas da Vida» documentada como poema da *Lira*, com elos a [Vida](${vida}), [emoção](${emocao}) e [tristeza](${tristeza}).

[▶ Artes](${hub}) · [▶ Vida](${vida}) · [▶ Emoção](${emocao}) · [▶ Tristeza](${tristeza}) · [▶ Texto](${poemaAlt})
`;

  const contentEn = `## Scope

Editorial inspection of the poem **“Lágrimas da Vida”** (“Tears of Life”; also called *the tear of life*) by **Álvares de Azevedo**, in *Lira dos Vinte Anos* — Brazilian ultra-romanticism. Main cut: the **poem**; book and biography as context.

> **Method note:** independent BudGanja audit. Support: [Wikipedia · Álvares de Azevedo](${wikiAutor}), [poem text](${poemaAlt}). Public-domain 19th-c. text. **Does not** romanticize self-harm; literature ≠ clinical advice. For companionship, see [Vida](${vida}).

## Object

| Field | Value |
|-------|-------|
| Title | **Lágrimas da Vida** |
| Author | Álvares de Azevedo (1831–1852) |
| Book | *Lira dos Vinte Anos* |
| Lab links | [Vida](${vida}) · [emoção](${emocao}) · [tristeza](${tristeza}) |
| Date | ${inspected} |

## Thesis

Hidden tear under a light smile · shattered temple of love · ultra-romantic “forgetting” as **figure**, not protocol · “angel of life” as hope echo · return to [Vida](${vida}).

## Status

**Approved** — poem fixed on the Arts map with Vida and emotion-word links.

[▶ Arts](${hub}) · [▶ Vida](${vida})
`;

  const contentEs = `## Alcance

Inspección del poema **«Lágrimas da Vida»** (también *la lágrima de la vida*) de **Álvares de Azevedo**, en *Lira dos Vinte Anos* — ultrarromanticismo brasileño. Recorte: el **poema**.

> **Nota metodológica:** auditoría independiente. Apoyo: [Álvares de Azevedo](${wikiAutor}), [texto](${poemaAlt}). Dominio público. **No** romantiza autodestrucción. Compañía: [Vida](${vida}).

## Objeto

| Campo | Valor |
|-------|-------|
| Título | **Lágrimas da Vida** |
| Autor | Álvares de Azevedo |
| Libro | *Lira dos Vinte Anos* |
| Vínculos | [Vida](${vida}) · [emoção](${emocao}) · [tristeza](${tristeza}) |
| Fecha | ${inspected} |

## Tesis

Lágrima bajo la máscara · templo afectivo · olvido ultrarromántico como **figura** · ángel de la vida · volver a [Vida](${vida}).

## Estado

**Aprobada** — poema en el mapa Artes con vínculos a Vida y al léxico del sentimiento.

[▶ Artes](${hub}) · [▶ Vida](${vida})
`;

  return { body, contentEn, contentEs, sourceUrl: poemaAlt };
}

function buildLagrimasDaVidaPost() {
  const { body, contentEn, contentEs, sourceUrl } = buildLagrimasDaVidaBodies();
  return artePost({
    title:
      'Inspeção: Lágrimas da Vida — o poema de Álvares de Azevedo e a máscara que chora',
    titleEn:
      'Inspection: Lágrimas da Vida — Álvares de Azevedo’s poem and the mask that weeps',
    titleEs:
      'Inspección: Lágrimas da Vida — el poema de Álvares de Azevedo y la máscara que llora',
    excerpt:
      'Artes · poesia: «Lágrimas da Vida» (Álvares de Azevedo, *Lira dos Vinte Anos*) — ultrarromantismo, lágrima escondida e elo com a trilha Vida.',
    excerptEn:
      'Arts · poetry: “Lágrimas da Vida” (Álvares de Azevedo, *Lira dos Vinte Anos*) — ultra-romanticism, hidden tear, and a link to the Vida trail.',
    excerptEs:
      'Artes · poesía: «Lágrimas da Vida» (Álvares de Azevedo, *Lira dos Vinte Anos*) — ultrarromanticismo, lágrima oculta y vínculo con Vida.',
    slug: 'inspecao-arte-lagrimas-da-vida',
    date: '2026-08-02T13:00:00.000Z',
    seriesOrder: 11,
    seriesLabel: 'Lágrimas da Vida · Artes',
    coverImage: '/imagens/inspecoes/lagrimas-da-vida-cover.jpg',
    sourceUrl,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildLagrimasDaVidaPost,
  buildLagrimasDaVidaBodies
};
