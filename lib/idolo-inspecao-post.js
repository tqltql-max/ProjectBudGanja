'use strict';

/**
 * Inspeção Palavras · ídolo
 * Eixos: celebridade · ídolo religioso · idolatrar (figurado) · cultura de média
 * Tom: inspetor, sem sermão
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildIdoloBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const jesusamando = '/posts/post-inspecao-expressao-jesusamando.html';
  const meudeusdoceu = '/posts/post-inspecao-expressao-meudeusdoceu.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const keanu = '/posts/post-inspecao-figura-keanu-reeves.html';
  const wiki = 'https://pt.wiktionary.org/wiki/%C3%ADdolo';
  const wikiEl = 'https://pt.wikipedia.org/wiki/%C3%8Ddolo';

  const body = `## Escopo

Inspeção editorial da palavra **ídolo** — pessoa admirada / celebridade, imagem de culto, verbo figurado **idolatrar**, e o eco na **cultura de média**. Esta ficha cobre o **objeto**, os **sentidos em camadas**, o **bom × mau uso** no laboratório e o fecho [Faça o melhor!](${mantra}). Elos: fichas [Senna](${senna}), [Chorão](${chorao}), [Keanu](${keanu}) (figuras do catálogo — não «santos» do lab), [genial](${genial}), [verdade](${verdade}), [gesto](${gesto}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · ídolo](${wiki}), [Wikipédia · Ídolo](${wikiEl}), série [Palavras](${hub}). **Ficha ≠ catecismo nem crítica moralista de fãs** — mapa lexical e de ofício. Sem afiliação comercial, religiosa ou de marca.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **ídolo** |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Latim *īdōlum* ← grego *εἴδωλον* (*eídōlon*, «imagem; aparência; espectro») — confiança: alta |
| Família | *idolatrar* · *idolatria* · *idolátrico* · *ídola* (raro / literário) |
| Cognatos | esp. *ídolo* · fr. *idole* · it. *idolo* · ing. *idol* · lat. *īdōlum* |
| Tipo BudGanja | Palavra — admiração × imagem × média × ofício |
| Elo figuras | [Senna](${senna}) · [Chorão](${chorao}) · [Keanu](${keanu}) |
| Elo afecto / peito | [coração](${coracao}) · [fogo](${fogo}) · [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [genial](${genial}) · [Faça o melhor!](${mantra}) |
| Elo língua | [língua portuguesa](${lingua}) · [Guia](${guia}) |
| Fonte | [Wikcionário · ídolo](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **imagem** (sentido antigo) e, no uso vivo BR, a **pessoa admirada** — estrela, referência, «meu ídolo». No BudGanja: ferramenta para **inspecionar admiração** sem apagar o afecto nem transformar fã em pecador.

## 2. Sentidos — pessoa · culto · figurado · média

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Imagem / representação** | Étimo grego: aparência, figura, «o que se vê» | Alta (história da palavra) |
| **Ídolo religioso** | Imagem de culto / objecto de adoração (registo bíblico-cultural e dicionarístico) | Alta — **mapa lexical**, não sermão |
| **Pessoa / celebridade** | Alguém que se admira («meu ídolo», ídolo do futebol / da música) | Alta (uso BR quotidiano) |
| **Idolatrar (figurado)** | Adorar em excesso — projecto, marca, ego, ecrã | Alta (uso vivo) |
| **Cultura de média** | Feed, fandom, cancelamento, pedestal e queda | Alta–média (mapa cultural) |
| **Ofício lab** | Admirar o feito ([genial](${genial})) sem entregar o [gesto](${gesto}) a outrem | Média–alta (mapa BudGanja) |

**H1:** *ídolo* nasce na **imagem** (*eídōlon*) — ver antes de «adorar».  
**H2:** no BR, o sentido dominante no peito é **pessoa admirada**; o registo religioso permanece no dicionário e na memória cultural, sem obrigar o laboratório a pregar.  
**H3:** *idolatrar* avisa quando a admiração **come o ofício** — pedestal que apaga [verdade](${verdade}) e [caminho](${caminho}).

## 3. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Admiração nomeada** | «Senna é ídolo» / «meu ídolo na música» | Bom: crédito ao feito ([Senna](${senna}) · [Chorão](${chorao})) · Mau: apagar o ofício próprio |
| **Cultura pop / média** | Ídolo de reality, feed, «stan» | Bom: mapear o pedestal · Mau: confundir persona com pessoa inteira |
| **Registo religioso (lexical)** | Ídolo = imagem de culto | Bom: literacia da palavra · Mau: usar a ficha como púlpito |
| **Idolatrar (verbo)** | «Idolatra o chefe / a marca / o próprio ego» | Bom: aviso de excesso · Mau: vergonha permanente por admirar |
| **Queda do pedestal** | «Caiu do pedestal» | Bom: rever com [verdade](${verdade}) · Mau: carnaval de ódio |
| **Par afectivo** | Admiração com [coração](${coracao}) e [fogo](${fogo}) | Bom: calor com medida · Mau: labareda que queima o outro |

## 4. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Nomear admiração** | Fãs, desporto, arte, política pop | Creditar figuras do catálogo sem culto cego |
| **Separar imagem e pessoa** | Persona × gente | [Verdade](${verdade}) — inspecionar o relato, não só o brilho |
| **Avisar o excesso** | Idolatria figurada | Voltar ao [gesto](${gesto}) e ao [caminho](${caminho}) próprios |
| **Ler a média** | Pedestal, hype, cancelamento | Mapa cultural — sem moral barata |
| **Fechar** | Depois da admiração, o acto | [Faça o melhor!](${mantra}) |

**Finalidade-mãe:** usar **ídolo** para **admirar com ofício** — ver a imagem, creditando o feito, sem entregar a mão.

## 5. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — o melhor possível **nesta mão**, hoje — mesmo (e sobretudo) quando há ídolos no horizonte |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Tenho ídolo, então não preciso fazer» = falso · o mantra pede [gesto](${gesto}) |
| Anti-sermão | «Admirar = pecado» = falso · o lab inspeciona **excesso**, não o afecto em si |
| Elos vivos | [Senna](${senna}) (mantra encarnado no catálogo) · [genial](${genial}) (feito, não mito vazio) |

**Veredicto:** Faça o melhor **com ídolos no mapa** — admirar o que inspira; trabalhar o que é teu. Ídolo sem [caminho](${caminho}) = pedestal oco; ídolo com método = referência que devolve a mão.

## Hipóteses (síntese)

**H1:** objeto = *eídōlon* / *īdōlum* → **ídolo** (imagem → pessoa admirada).  
**H2:** usos = celebridade · culto (lexical) · *idolatrar* · média.  
**H3:** elos = [Senna](${senna}) · [Chorão](${chorao}) · [genial](${genial}) · [verdade](${verdade}) · [gesto](${gesto}).  
**H4:** fecho = [Faça o melhor!](${mantra}) sem entregar o ofício.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Senna](${senna}) · [Chorão](${chorao}) · [Keanu](${keanu}) | Figuras do catálogo — admiração com ficha, não culto cego |
| [Genial](${genial}) · [Gesto](${gesto}) · [Verdade](${verdade}) · [Caminho](${caminho}) | Ofício: feito × mão × relato |
| [Coração](${coracao}) · [Fogo](${fogo}) | Afecto e ardor com medida |
| [jesusamando](${jesusamando}) · [meudeusdoceu](${meudeusdoceu}) | Sopros orais — assombro ≠ catecismo nesta ficha |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Solo lexical |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [hub](${hubAll}) | Finalidade viva |

## Limites

- Não é sermão contra religião nem contra fãs.  
- Não diagnostica «idolatria» clínica ou moral como veredicto sobre a pessoa.  
- Figuras ligadas ([Senna](${senna}) etc.) são **elos de catálogo** — esta ficha não as promove a ídolos oficiais do lab.  
- Cultura de média muda rápido; o mapa lexical permanece.

## Status

**Aprovado** — **ídolo** fichado: imagem → pessoa admirada → *idolatrar* → média; elos figuras e ofício; [Faça o melhor!](${mantra}) sem pedestal oco.

[▶ Palavras](${hub}) · [▶ Senna](${senna}) · [▶ Genial](${genial}) · [▶ Verdade](${verdade}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **ídolo** (idol) — admired person / celebrity, cult image, figurative *idolatrar*, and media culture. Covers **object**, **layered senses**, lab **use**, and [Do your best!](${mantra}). Links: [Senna](${senna}), [Chorão](${chorao}), [genial](${genial}), [truth](${verdade}), [gesture](${gesto}).

> Method note: [Wiktionary · ídolo](${wiki}), [Wikipedia · Ídolo](${wikiEl}). Not a sermon or anti-fan essay.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **ídolo** |
| Etymon | Latin *īdōlum* ← Greek *eídōlon* (“image; appearance”) |
| Lab type | Admiration × image × media × craft |
| Links | [Senna](${senna}) · [gesture](${gesto}) · [truth](${verdade}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2–3. Senses and uses

Image/representation · religious-cult register (lexical, not preachy) · admired person (dominant BR use) · figurative *idolatrar* (excess) · media pedestal / fall. **H:** see the image before “worship”; admiration with craft ≠ handing over your [gesture](${gesto}).

## 4. Purpose

Name admiration · separate persona from person · warn on excess · read media without cheap morals · close with [Do your best!](${mantra}).

## 5. Do your best!

Best possible **in this hand**, today — even when idols are on the horizon. Idol without [path](${caminho}) = empty pedestal; idol with method = reference that returns the hand.

## Status

**Approved** — image → admired person → *idolatrar* → media; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Senna](${senna}) · [▶ Genial](${genial}) · [▶ Truth](${verdade}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **ídolo** — persona admirada / celebridad, imagen de culto, *idolatrar* figurado y cultura mediática. Cubre **objeto**, **sentidos**, uso en el lab y [¡Haz lo mejor!](${mantra}). Vínculos: [Senna](${senna}), [Chorão](${chorao}), [genial](${genial}), [verdad](${verdade}), [gesto](${gesto}).

> Nota: [Wikcionario · ídolo](${wiki}), [Wikipedia · Ídolo](${wikiEl}). No es sermón ni ensayo anti-fan.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **ídolo** |
| Étimo | Latín *īdōlum* ← griego *eídōlon* («imagen; apariencia») |
| Tipo lab | Admiración × imagen × medios × oficio |
| Vínculos | [Senna](${senna}) · [gesto](${gesto}) · [verdad](${verdade}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2–3. Sentidos y usos

Imagen · registro de culto (léxico, sin púlpito) · persona admirada (uso BR dominante) · *idolatrar* (exceso) · pedestal mediático. Admirar con oficio ≠ entregar el [gesto](${gesto}).

## 4. Para qué sirve

Nombrar admiración · separar persona y persona mediática · avisar el exceso · leer medios · cerrar con [¡Haz lo mejor!](${mantra}).

## 5. ¡Haz lo mejor!

Lo mejor posible **en esta mano**, hoy — con ídolos en el mapa, sin pedestal hueco.

## Estado

**Aprobada** — imagen → persona admirada → *idolatrar* → medios; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Senna](${senna}) · [▶ Genial](${genial}) · [▶ Verdad](${verdade}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildIdoloPost() {
  const { body, contentEn, contentEs, wiki } = buildIdoloBodies();
  return makePalavra({
    title:
      'Inspeção: Ídolo — admiração, imagem, média e Faça o melhor!',
    titleEn:
      'Inspection: Ídolo — admiration, image, media and Do your best!',
    titleEs:
      'Inspección: Ídolo — admiración, imagen, medios y ¡Haz lo mejor!',
    excerpt:
      'Palavras: «ídolo» (gr. eídōlon) — celebridade, culto lexical, idolatrar e cultura de média; admirar com ofício; Faça o melhor!',
    excerptEn:
      'Words: “ídolo” (Gk. eídōlon) — celebrity, lexical cult sense, idolatrar and media culture; admire with craft; Do your best!',
    excerptEs:
      'Palabras: «ídolo» (gr. eídōlon) — celebridad, culto léxico, idolatrar y cultura mediática; admirar con oficio; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-idolo',
    date: '2026-08-03T20:00:00.000Z',
    seriesOrder: 71,
    seriesLabel: 'Ídolo · palavra',
    coverImage: '/imagens/inspecoes/idolo-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildIdoloPost,
  buildIdoloBodies
};
