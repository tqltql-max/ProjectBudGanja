'use strict';

/**
 * Inspeção Palavras · Cuca
 * Eixos: história infantil · folclore BR · cantiga de ninar ·
 * cabeça (gíria) · diminutivo cucuca · medo com respeito
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildCucaBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const medo = '/posts/post-inspecao-palavra-medo.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const animais = '/animais/';
  const selvagem = '/posts/post-inspecao-palavra-selvagem.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const crianca = '/posts/post-inspecao-expressao-toda-crianca-nasce-cientista.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const disney = '/posts/post-inspecao-canal-disneyjr.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/cuca';
  const wikiFolc = 'https://pt.wikipedia.org/wiki/Cuca_(folclore)';
  const wikiSitio = 'https://pt.wikipedia.org/wiki/S%C3%ADtio_do_Picapau_Amarelo';
  const wikiCoca = 'https://pt.wikipedia.org/wiki/Coca_(folclore)';

  const body = `## Escopo

Inspeção editorial da palavra e da figura **Cuca** — o **bicho de história infantil** brasileiro (folclore + *Sítio do Picapau Amarelo*) e, no português vivo, também a **cabeça** («ficar de cuca»). Recorte: **conto para criança**, cantiga de ninar, e o diminutivo **cucuca**. Não é biografia de streamer nem guia de susto.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · cuca](${wiki}), [Wikipédia · Cuca (folclore)](${wikiFolc}), [Coca (folclore)](${wikiCoca}), [Sítio do Picapau Amarelo](${wikiSitio}). Crédito a Monteiro Lobato e à tradição oral — **sem afiliação**. **Ficha ≠ protocolo de medo.** [Respeito](${respeito}) à criança: o conto nomeia o [medo](${medo}); não o usa para humilhar.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra / figura | **Cuca** (diminutivo oral: **cucuca**) |
| Classe | Substantivo feminino (personagem) · também gíria («cuca» = cabeça) |
| Tipo BudGanja | Palavra — história infantil × folclore × [medo](${medo}) com [respeito](${respeito}) |
| História âncora | Cantiga «nana neném, que a Cuca vem pegar» · Cuca do *Sítio* (cabeça de jacaré) |
| Elo criança | [Toda criança nasce cientista](${crianca}) · [celular / ecrãs](${celular}) · [Disney Jr.](${disney}) |
| Elo conto | [Alice](${alice}) · [Divertida Mente](${divertida}) — outro ecrã de infância, outro mapa |
| Elo vivo | [animal](${animal}) · [Animais](${animais}) · [selvagem](${selvagem}) |
| Elo afecto | [medo](${medo}) · [mãe](${mae}) · [respeito](${respeito}) |
| Fonte | [Wikcionário · cuca](${wiki}) · [Cuca (folclore)](${wikiFolc}) |
| Data | ${inspected} |

**O que é o objeto:** a figura que a infância brasileira **ouve antes de dormir** — e a palavra que, à parte, nomeia a **cabeça**. *Cucuca* é o mesmo bicho no diminutivo carinhoso (ou irónico). Personagem de jogo / handle de canal **não** é esta ficha.

## 2. Hipóteses e método

**H1:** a Cuca da cantiga é **coca ibérica** (bicho que leva criança) aportuguesada — não invenção só do *Sítio*.  
**H2:** Monteiro Lobato **fixou a imagem** (cuca-jacaré, bruxa do mato) no ecrã e no livro escolar brasileiro.  
**H3:** a cantiga usa [medo](${medo}) como **gesto de ninar** — o lab inspecciona o gesto; não o endossa como ameaça.  
**H4:** *cucuca* herda a Cuca: diminutivo da história infantil, não prova de parentesco com nenhum canal.

Passos: (1) étimo e cantiga; (2) *Sítio*; (3) gíria cabeça; (4) diminutivo; (5) limites; (6) status.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Coca / Cuca ibérica | Bicho folclórico que «leva» criança; parente da *coca* galego-portuguesa e da *Coca* espanhola | Alta (tradição atlântica) |
| Cantiga de ninar BR | «Nana neném / que a Cuca vem pegar / papai foi pra roça / mamãe foi trabalhar» | Alta (oralidade viva) |
| Lobato / *Sítio* | Cuca com **cabeça de jacaré**, rival de Emília, Narizinho, Pedrinho | Alta (literatura + TV) |
| Gíria «cuca» | Cabeça, juízo («ficar de cuca», «lelé da cuca») | Alta (uso comum) |
| Diminutivo **cucuca** | Cuca + redobro infantil — o bicho fica «pequeno» na boca | Média–alta (oral) |

**Veredicto etimológico:** duas linhas **convivem** — o **bicho da ninar** (folclore) e a **cabeça** (gíria). Não fundir. A história infantil é o recorte desta ficha.

## 4. História infantil — o que o conto faz

| Camada | O que a criança encontra | Leitura BudGanja |
|--------|--------------------------|------------------|
| **Cantiga** | A Cuca «vem pegar» se o sono não chega | [Medo](${medo}) como ritmo de ninar — não como castigo real |
| **Sítio** | Bruxa do mato, cabeça de jacaré, trama com o sítio | Literacia de conto BR — [animal](${animal}) no rosto, [selvagem](${selvagem}) no mato |
| **Função** | Dar forma ao escuro (como o bicho-papão) | Nomear o [medo](${medo}) para o poder **olhar de novo** ([respeito](${respeito})) |
| **Armadilha** | Assustar para obedecer | O lab **não** recomenda ameaça; a [mãe](${mae}) nina com ofício, não com terror |
| **Ecrã** | Desenho, TV Cultura, reprises | Distinto de [Disney Jr.](${disney}) — Cuca é **chão BR**, não importação |

**Veredicto do conto:** a Cuca **merece ficha** porque é património oral da infância brasileira. O melhor ofício: contar o bicho **sem** usar a criança como objecto de susto.

## 5. Transformação / rede de sentidos

| Eixo | Exemplos | Nota |
|------|----------|------|
| Folclore | Coca, bicho-papão, Cuca da cantiga | Tradição — não zoologia |
| Literatura / TV | *Sítio do Picapau Amarelo* | Imagem escolar BR |
| Gíria | «cuca» = cabeça; «lelé da cuca» | Outra ficha possível; aqui só se **separa** |
| Diminutivo | **cucuca** | A Cuca miúda na boca — carinho ou gozo |
| Infância no lab | [Toda criança nasce cientista](${crianca}) | Perguntar o porquê do bicho, não engolir o susto |
| Ecrã / risco | [Celular · crianças](${celular}) | Conto ≠ feed; ninar ≠ ecrã na cama |

## 6. Cucuca — relação lexical (não biografia)

**Cucuca** é, nesta ficha, o **diminutivo** de Cuca: o mesmo bicho da história infantil, dito miúdo. Rima e redobro (*cu-cu-ca*) são ofício de ninar, como *neném*.

Um **handle** ou personagem de GTA RP com nome parecido é **outro objecto** (ficção de jogo). Esta inspeção **não** funde conto de ninar com canal. Personagem ≠ folclore.

## 7. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor conto possível **com** a criança, **sem** ameaça |
| Anti-armadilha | «a Cuca pega mesmo» = terror · «a Cuca é um bicho do conto» = literacia |
| Par infância | [Toda criança nasce cientista](${crianca}) · [medo](${medo}) · [respeito](${respeito}) · [mãe](${mae}) |
| Par ecrã | [Disney Jr.](${disney}) · [Alice](${alice}) · [Divertida Mente](${divertida}) |

**Veredicto:** Valeu !!! **ao ninar** — [respeito](${respeito}) + [medo](${medo}) nomeado. Cuca no quarto é história; Cuca como arma de obediência é mapa incompleto.

## Hipóteses (síntese)

**H1:** Cuca da cantiga ← coca ibérica.  
**H2:** *Sítio* fixou a cuca-jacaré no Brasil escolar.  
**H3:** *cucuca* = diminutivo da mesma figura.  
**H4:** gíria «cabeça» convive, não se funde.  
**H5:** fecho = [Valeu !!!](${mantra}) com [respeito](${respeito}) à infância.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Medo](${medo}) · [Respeito](${respeito}) | O conto olha o escuro sem humilhar |
| [Toda criança nasce cientista](${crianca}) | Perguntar o bicho |
| [Mãe](${mae}) | Quem nina — ofício, não ameaça |
| [Animal](${animal}) · [Animais](${animais}) · [selvagem](${selvagem}) | Jacaré no rosto da Cuca do *Sítio* |
| [Disney Jr.](${disney}) · [Alice](${alice}) | Outros ecrãs de infância |
| [Pato](${pato}) | Outra palavra-animal com conto (Patinho Feio) |
| [Celular · crianças](${celular}) | Ecrã ≠ cantiga |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [Vida](${vida}) · [Diário](${diario}) | Solo |

## Limites

- Não é tratado de folclore comparativo nem biografia de Lobato.  
- Não é guia para assustar criança.  
- Não é ficha de canal / personagem de GTA RP.  
- Gíria «cuca» (cabeça) fica **separada** — não reabre aqui o léxico clínico de «lelé da cuca».  
- A cantiga cita-se como **objecto oral**; o lab não reproduz ameaça como método.

## Status

**Aprovado** — **Cuca** fichada como **história infantil** brasileira (cantiga + *Sítio*), com *cucuca* como diminutivo e a gíria «cabeça» só demarcada. [Medo](${medo}) com [respeito](${respeito}). Sem afiliação.

[▶ Palavras](${hub}) · [▶ Medo](${medo}) · [▶ Respeito](${respeito}) · [▶ Toda criança nasce cientista](${crianca}) · [▶ Disney Jr.](${disney}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Brazilian **Cuca** — the **children’s bogey** of the lullaby (“nana neném, que a Cuca vem pegar”) and of Monteiro Lobato’s *Sítio do Picapau Amarelo* (alligator-headed witch). Also notes the slang *cuca* = “head,” and the diminutive **cucuca**. Not a streamer bio.

> Independent audit. Sources: [Wiktionary](${wiki}), [Cuca (folklore)](${wikiFolc}). Respect for the child: [fear](${medo}) is named, not used as a weapon.

## Object

| Field | Value |
|-------|-------|
| Word / figure | **Cuca** (diminutive **cucuca**) |
| Anchor | Brazilian children’s lore + *Sítio* |
| Links | [fear](${medo}) · [respect](${respeito}) · [every child is born a scientist](${crianca}) |
| Date | ${inspected} |

## Status

**Approved** — children’s-story Cuca filed; *cucuca* = diminutive of the same figure; game handles stay off this sheet.

[▶ Words](${hub}) · [▶ Fear](${medo}) · [▶ Respect](${respeito}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la **Cuca** brasileña — el **bicho de historia infantil** (nana «que a Cuca vem pegar») y la bruja de cabeza de caimán del *Sítio do Picapau Amarelo*. También la jerga *cuca* = cabeza, y el diminutivo **cucuca**. No es ficha de streamer.

> Auditoría independiente. Fuentes: [Wikcionario](${wiki}), [Cuca (folclore)](${wikiFolc}). [Miedo](${medo}) con [respeto](${respeito}) a la infancia.

## Estado

**Aprobada** — Cuca de cuento infantil; *cucuca* = diminutivo; el canal de juego queda aparte.

[▶ Palabras](${hub}) · [▶ Miedo](${medo}) · [▶ Respeto](${respeito}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildCucaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildCucaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 80;
  return makePalavra({
    title: 'Inspeção: Cuca — história infantil, cantiga e o bicho do Sítio',
    titleEn: 'Inspection: Cuca — children’s tale, lullaby and the Sítio bogey',
    titleEs: 'Inspección: Cuca — historia infantil, nana y el bicho del Sítio',
    excerpt:
      'Palavras: Cuca — folclore e Sítio do Picapau Amarelo; cantiga de ninar; diminutivo cucuca; medo com respeito. Não é ficha de streamer.',
    excerptEn:
      'Words: Cuca — Brazilian children’s lore and Sítio; lullaby; diminutive cucuca; fear with respect. Not a streamer sheet.',
    excerptEs:
      'Palabras: Cuca — folclore infantil y Sítio; nana; diminutivo cucuca; miedo con respeto. No es ficha de streamer.',
    slug: 'inspecao-palavra-cuca',
    date: '2026-08-21T16:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Cuca · palavra',
    coverImage: '/imagens/inspecoes/cuca-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCucaPost,
  buildCucaBodies
};
