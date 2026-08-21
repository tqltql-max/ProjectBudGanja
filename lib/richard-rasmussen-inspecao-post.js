'use strict';

/**
 * Inspeção Legado · Richard Rasmussen — ofício selvagem no ecrã BR.
 * Pessoa ≠ canal: arquivo em post-inspecao-canal-richard-rasmussen.html.
 */

function pessoaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'legado-pessoas',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Richard Rasmussen · legado',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  if (opts.videoId) post.videoId = opts.videoId;
  return post;
}

function buildRasmussenPessoaBodies(inspected) {
  const canal = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const videos = '/videos/?channel=rasmussen';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const especial = '/posts/post-inspecao-palavra-especial.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const animais = '/animais/';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const amyr = '/posts/post-inspecao-amyr-klink.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const wiki = 'https://pt.wikipedia.org/wiki/Richard_Rasmussen';
  const site = 'https://www.richardrasmussen.com.br';
  const yt = 'https://www.youtube.com/@RichardRasmussenSelvagem';
  const seed = 'BQgTqm7KlEY';

  const body = `## Escopo

Inspeção editorial e documental do **legado público** de **Richard Rasmussen** (São Paulo, 15 de fevereiro de 1970) — naturólogo, economista, **biólogo** (CRBio 068861/01-D) e apresentador brasileiro. Esta página **merece [respeito](${respeito})**: *respicere* — **olhar de novo**. Não é altar nem panfleto. É considerar a sério duas décadas a **levar fauna ao ecrã brasileiro**, com o mérito rastreável e com o recorde público à vista. O handle do canal é [Selvagem](${selvagem}): a palavra do bosque; esta ficha é a **pessoa**.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikipédia · Richard Rasmussen](${wiki}), [site](${site}), [canal YouTube](${yt}). **Sem afiliação** com Richard Rasmussen, emissoras, Embratur ou partidos. Capítulo de **Legado** cultural / naturalista — distinto do eixo clínico Ticão–Carlini. **Pessoa ≠ canal.** Indexar ≠ endosso político. Esta inspeção é **[especial](${especial})**: pessoa + arquivo. [Respeito](${respeito}) aqui = consideração de ofício, não sermão.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Richard Rasmussen** («Richard Selvagem») |
| Nascimento | 15 de fevereiro de 1970, São Paulo |
| Formação | Economia (USP) · Biologia (Universidade Ibirapuera, 2008) · CRBio 068861/01-D |
| Ofício | Biólogo · naturalista · jornalista · apresentador |
| Feito âncora | Duas décadas a levar natureza às telas BR (Record, SBT, Band, NatGeo, Cultura) + YouTube desde 2016 |
| Canal | [Inspeção do canal](${canal}) · [Vídeos](${videos}) — **pessoa ≠ canal** |
| Elo BudGanja | Legado Cap. 10 · [respeito](${respeito}) · [selvagem](${selvagem}) · [animal](${animal}) · hub [Animais](${animais}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

O laboratório já fichou [selvagem](${selvagem}) — *silva*, natureza, **sem romantizar dano**. Rasmussen é a voz BR mais reconhecível desse ecrã: serpentes, biomas, expedição. Omiti-lo seria falhar o método — **crédito a quem merece**. Colocá-lo no Legado junto de exploradores como [Amyr](${amyr}) e [Tamara](${tamara}) é continuidade de ofício no território, não fusão de pessoas.

## Respeito devido

No lab, [respeito](${respeito}) não é elogio vazio: é **voltar a olhar** e ajustar o trato. Nesta ficha, o olhar de novo tem quatro alvos — todos obrigatórios.

| Alvo | O que o lab considera |
|------|------------------------|
| **O animal** | Ser vivo no ecrã — nomear a espécie, o habitat, o [risco](${risco}); não trophy hunt |
| **O público** | Décadas de literacia de fauna em horário aberto (Record, SBT, Band, NatGeo, Cultura) |
| **O ofício** | CRBio à vista · biólogo que apresenta, não só «aventureiro» |
| **O recorde** | Limites públicos ficam no mapa — [verdade](${verdade}) também é respeito; não apagam o ofício |

**Veredicto desta secção:** esta página **não se achata** na controvérsia. Olha de novo o trabalho. Os limites vêm depois, com o mesmo método.

## Hipóteses e método

- **H1:** o legado de Rasmussen é **divulgação de fauna** antes de ser «aventura».
- **H2:** o YouTube (2016–) é o **arquivo vivo** da mesma voz que passou por Record, SBT, Band e NatGeo.
- **H3:** [selvagem](${selvagem}) no handle obriga o lab a aplicar a própria ficha: [respeito](${respeito}) à natureza **e** [risco](${risco}) / [verdade](${verdade}) quando o recorde público pede.
- **H4:** limites (criadouro, multas, teses controversas) **não apagam** o ofício de ecrã — e o ofício **não apaga** os limites.
- **H5:** [respeito](${respeito}) nesta ficha = olhar de novo o **ofício** *e* o **recorde** — sem altar, sem linchamento.
- **Método:** (1) síntese biográfica pública; (2) carreira de ecrã; (3) respeito devido; (4) mérito; (5) limites; (6) elos; (7) status.

## Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1970 | Nasce em São Paulo; infância em São Roque, chácara e mata. |
| ~1982 → | Viagens com o avô paterno a Mato Grosso e Amazónia. |
| Década de 1990 | Dez anos como auditor; criadouro conservacionista «Casa da Tartaruga». |
| 2005 | Fecha o criadouro após autuações do IBAMA (fonte: Folha / Wikipédia). Estreia o quadro **Selvagem ao Extremo** (Record / *Domingo Espetacular*). |
| 2008 | Forma-se em Biologia (Unib); cadastro CRBio activo. |
| 2009–2014 | **Aventura Selvagem** (SBT). |
| 2013 | **O Mundo Selvagem de Richard Rasmussen** (National Geographic). |
| 2015–2017 | **Sábado Animal** (Band), com Manu Karsten. |
| 2016 → | Canal YouTube [@RichardRasmussenSelvagem](${yt}). |
| 2019 | Nomeado embaixador do turismo pela Embratur (governo Bolsonaro). **As Aventuras de Richard no Paraná** (TV Paraná Turismo). |
| 2020 → | **Brasil Biomas** (TV Cultura). Acordo com órgãos ambientais / MPF sobre multas (reparação *in natura* em UCs — fonte: UOL / Wikipédia). |
| 2026 | Filiação ao MDB; candidatura a deputado federal por São Paulo (fonte: Wikipédia). |

## Achados (mérito devido)

1. **Ofício de ecrã** — duas décadas a traduzir fauna e biomas para um público amplo, com CRBio à vista: Record (*Selvagem ao Extremo*), SBT (*Aventura Selvagem*), NatGeo (*O Mundo Selvagem*), Band (*Sábado Animal*), Cultura (*Brasil Biomas*).
2. **Arquivo YouTube** — o canal próprio (2016) torna o ofício **inspeccionável** no lab: ver [ficha do canal](${canal}) (${videos}) — milhares de peças, não um recorte de polémica.
3. **Literacia de espécie** — serpente, felino, rio, bioma: o título costuma **nomear** o ser, não só o hype. Isso é [respeito](${respeito}) ao animal no ecrã.
4. **Infância e território** — São Roque, chácara, viagens com o avô a Mato Grosso e Amazónia: o ofício não nasceu no estúdio.
5. **Elo lexical** — [selvagem](${selvagem}) no handle; [animal](${animal}) e [Animais](${animais}) no hub do lab.
6. **Complementaridade exploratória** — no Legado, vizinho de [Amyr](${amyr}) / [Tamara](${tamara}): território e partida, não o mesmo mar.

## Limites (o respeito também olha o recorde)

[Respeito](${respeito}) sem [verdade](${verdade}) vira cartaz. Os itens abaixo **não cancelam** o ofício; o ofício **não os apaga**. O lab **não** rejulga processos.

- **Criadouro (2005):** o IBAMA fechou a «Casa da Tartaruga» após autuações (fugas, mortes, origem de animais) — facto público.
- **Multas ambientais:** reportagem à data da nomeação Embratur (2019) e acordo posterior de reparação em unidades de conservação (2020) — recorde, não pamphlet.
- **Boto-cor-de-rosa (2014):** pescadores acusaram pagamento para abate numa gravação do *Fantástico*; Rasmussen **negou** ter pago para matar e disse que a intenção era denunciar a matança. O lab **regista a controvérsia**; não decide o foro.
- **«Boi bombeiro» (2020):** tese de que o gado previne queimadas no Pantanal — a imprensa científica de referência (G1 e outras) tratou-a como **infundada**. Aqui: hipótese pública, não consenso.
- **Desmatamento (2019):** em entrevista à *Época*, considerou «pouco provável» a alta na Amazónia com base no calendário das chuvas — dedução de divulgador, **não** substitui série INPE.
- **Política:** embaixador Embratur (2019) e candidatura MDB (2026) são facto biográfico. Esta ficha **não** é boletim eleitoral.
- **Contacto com fauna:** o ecrã mostra manejo; **não** é protocolo para o espectador tocar em silvestre. [Risco](${risco}) primeiro.
- **Não é etologia fechada** nem laudo de IBAMA: é ficha de legado + ponte para o [canal](${canal}).

## Rede BudGanja

| Ficha | Relação |
|-------|---------|
| [Canal · Selvagem](${canal}) · [Vídeos](${videos}) | Arquivo YouTube — pessoa ≠ canal |
| [respeito](${respeito}) | Olhar de novo — esta página merece consideração de ofício |
| [selvagem](${selvagem}) | Palavra do bosque no handle; anti-romantização |
| [especial](${especial}) | Esta entrega: inspeção especial (pessoa + canal) |
| [animal](${animal}) · [Animais](${animais}) | Ser vivo — livre × companheiro |
| [risco](${risco}) · [verdade](${verdade}) | Recorde honesto; não apaga o mérito |
| [Amyr](${amyr}) · [Tamara](${tamara}) | Exploração BR no mesmo Legado — mar ≠ mata |
| [Faça o melhor!](${mantra}) | Fecho de ofício |

## Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor ecrã possível **com** o ser vivo, **com** [respeito](${respeito}), **sem** apagar [risco](${risco}) |
| Anti-armadilha | «selvagem na TV = natureza salva» **ou** «todo apresentador de fauna é fraude» = mapas incompletos |
| Par vivo | [Canal](${canal}) · [selvagem](${selvagem}) · [respeito](${respeito}) · [Animais](${animais}) |

**Veredicto:** Rasmussen fez o melhor **também ao arriscar o ecrã**. O laboratório faz o melhor ao **olhar de novo**: creditar o ofício, declarar os limites, **respeitar a página**.

## Status

**Aprovado com respeito de ofício** — Richard Rasmussen · Legado Cap. 10; canal em [Canais](${canal}). Mérito à vista; limites no recorde. Sem afiliação. Sem voto.

[▶ Canal YouTube](${canal}) · [▶ Vídeos](${videos}) · [▶ Selvagem](${selvagem}) · [▶ Respeito](${respeito}) · [▶ Legado](${legado}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **Richard Rasmussen** (b. 15 Feb 1970, São Paulo) — biologist (CRBio 068861/01-D) and Brazilian wildlife presenter. This page is due **[respeito](${respeito})** — *respicere*: look again. Two decades bringing fauna to Brazilian screens, plus the YouTube archive since 2016. Handle: [selvagem](${selvagem}) (“wild”). **Person ≠ channel.**

> Independent audit. Sources: [Wikipedia](${wiki}), [site](${site}), [YouTube](${yt}). No affiliation. Public limits stay on the record — they do not cancel the craft.

## Object

| Field | Value |
|-------|-------|
| Name | **Richard Rasmussen** |
| Craft | Biologist · naturalist · presenter |
| Anchor | TV wildlife craft + [@RichardRasmussenSelvagem](${yt}) |
| Channel sheet | [${canal}](${canal}) |
| Date | ${inspected} |

## Status

**Approved with craft respect** — Legacy Cap. 10. Channel catalogued separately.

[▶ Channel](${canal}) · [▶ Videos](${videos}) · [▶ Selvagem](${selvagem}) · [▶ Respeito](${respeito})
`;

  const contentEs = `## Alcance

Inspección de **Richard Rasmussen** (n. 15 feb 1970, São Paulo) — biólogo (CRBio 068861/01-D) y presentador de fauna brasileño. Esta página merece **[respeito](${respeito})**: volver a mirar el oficio. Dos décadas de naturaleza en pantalla y el archivo YouTube desde 2016. Handle: [selvagem](${selvagem}). **Persona ≠ canal.**

> Auditoría independiente. Fuentes: [Wikipedia](${wiki}), [sitio](${site}), [YouTube](${yt}). Sin afiliación. Los límites públicos quedan en el registro — no cancelan el oficio.

## Estado

**Aprobado con respeto de oficio** — Legado Cap. 10. Canal aparte.

[▶ Canal](${canal}) · [▶ Vídeos](${videos}) · [▶ Selvagem](${selvagem}) · [▶ Respeito](${respeito})
`;

  return { body, contentEn, contentEs, wiki, seed };
}

function buildRasmussenPessoaPost(seriesOrder) {
  const inspected = '2026-08-21';
  const { body, contentEn, contentEs, wiki, seed } = buildRasmussenPessoaBodies(inspected);
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 10;
  return pessoaPost({
    title: 'Inspeção: Richard Rasmussen — respeito ao ofício selvagem no ecrã brasileiro',
    titleEn: 'Inspection: Richard Rasmussen — respect for wild craft on Brazilian screens',
    titleEs: 'Inspección: Richard Rasmussen — respeto al oficio salvaje en la pantalla brasileña',
    excerpt:
      'Legado: Richard Rasmussen — biólogo (CRBio) e apresentador de fauna; respeito de ofício (*respicere*: olhar de novo); YouTube @RichardRasmussenSelvagem; pessoa ≠ canal.',
    excerptEn:
      'Legacy: Richard Rasmussen — biologist (CRBio) and wildlife presenter; craft respect (look again); YouTube @RichardRasmussenSelvagem; person ≠ channel.',
    excerptEs:
      'Legado: Richard Rasmussen — biólogo (CRBio) y presentador de fauna; respeto de oficio (volver a mirar); YouTube @RichardRasmussenSelvagem; persona ≠ canal.',
    slug: 'inspecao-richard-rasmussen',
    date: '2026-08-21T14:15:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Richard Rasmussen · legado',
    coverImage: '/imagens/inspecoes/richard-rasmussen-cover.jpg',
    sourceUrl: wiki,
    videoId: seed,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRasmussenPessoaPost,
  buildRasmussenPessoaBodies
};
