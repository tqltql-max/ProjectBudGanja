'use strict';

/**
 * Inspeção Palavras · Mara
 * Eixos: nome próprio BR · maravilha (som e ofício) · barquinhos de papel ·
 * chegou sem ser a intenção · ≠ Tamara / Maria / mar / Māra · Faça o melhor!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function maraPoemPt() {
  return `Dobra uma margem.
Dobra outra.
O rio cabe na palma.

Não pede motor.
Não pede mapa.
Pede só um sopro —
e a maravilha de flutuar
mesmo sendo tão pouco.

Mara não era a rota de hoje.
Chegou.
Como o barquinho:
sem intenção de oceano,
com ofício de água.

Faça o melhor!`;
}

function maraPoemEn() {
  return `Fold one edge.
Fold the other.
The river fits in the palm.

It asks for no engine.
It asks for no map.
It asks only for a breath —
and the wonder of floating
even while being so small.

Mara was not today’s route.
She arrived.
Like the paper boat:
no intention of ocean,
with the craft of water.

Do your best!`;
}

function maraPoemEs() {
  return `Dobla un margen.
Dobla el otro.
El río cabe en la palma.

No pide motor.
No pide mapa.
Pide solo un soplo —
y la maravilla de flotar
aunque sea tan poco.

Mara no era la ruta de hoy.
Llegó.
Como el barquito:
sin intención de océano,
con oficio de agua.

¡Haz lo mejor!`;
}

function buildMaraBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const poema = '/vida/#poema=barquinhos-de-papel';
  const maravilhoso = '/posts/post-inspecao-palavra-maravilhoso.html';
  const alice = '/posts/post-inspecao-filme-alice-no-pais-das-maravilhas.html';
  const mae = '/posts/post-inspecao-palavra-mae.html';
  const donaMaria = '/posts/post-inspecao-personagem-dona-maria.html';
  const tamara = '/posts/post-inspecao-tamara-klink.html';
  const mar = '/posts/post-inspecao-palavra-mar.html';
  const barco = '/posts/post-inspecao-palavra-barco.html';
  const agua = '/posts/post-inspecao-palavra-agua.html';
  const vidaPalavra = '/posts/post-inspecao-palavra-vida.html';
  const alma = '/posts/post-inspecao-palavra-alma.html';
  const coracao = '/posts/post-inspecao-palavra-coracao.html';
  const memoravel = '/posts/post-inspecao-palavra-memoravel.html';
  const passado = '/posts/post-inspecao-palavra-passado.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wikiMara = 'https://pt.wiktionary.org/wiki/Mara';
  const wikiMaravilha = 'https://pt.wiktionary.org/wiki/maravilha';
  const wikiRuth = 'https://pt.wikipedia.org/wiki/Livro_de_Rute';

  const poem = maraPoemPt();
  const poemEn = maraPoemEn();
  const poemEs = maraPoemEs();

  const body = `## Escopo

Inspeção editorial do nome **Mara** — nome próprio no português do Brasil; no mapa do lab, também o som que vive **dentro** de [maravilha](${maravilhoso}). Pedido de campo: a tia. Não era a ficha da lista. **Demorou a chegar. Pensou-se nela o dia inteiro. Aconteceu.**

Esta ficha cobre o **objeto** (o nome), as **camadas etimológicas** sem reduzir a pessoa a nenhuma delas, o elo com **maravilha / maravilhoso**, e um poema curto — as maravilhas dos **barquinhos de papel**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · Mara](${wikiMara}), [maravilha](${wikiMaravilha}), [Livro de Rute](${wikiRuth}), série [Palavras](${hub}). **Ficha ≠ necrológio, biografia clínica nem sermão.** O lab fiche o **nome** que chegou; não inventa vida privada. Sem afiliação religiosa exclusiva.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **Mara** (nome próprio; também grafia minúscula *mara* quando o objecto é o vocábulo) |
| Classe | Antropónimo feminino no PT-BR (hipocorístico frequente de *Maria* / *Marlene* / *Marília* / *Amarílis*; também forma plena) |
| Tipo BudGanja | Palavra — nome × maravilha × barquinho |
| Chegada | Sem ser a intenção do dia — **aconteceu** |
| Elo maravilha | [maravilhoso](${maravilhoso}) ← subst. *maravilha* ← lat. *mirabilia* |
| Elo infância / ofício pequeno | barquinho de papel · [aula de origami](/origami/barquinho-de-papel/) · [barco](${barco}) · [água](${agua}) · [mar](${mar}) |
| Elo parentesco | [mãe](${mae}) · [Dona Maria](${donaMaria}) — família de cuidado, **não** a mesma ficha |
| ≠ | [Tamara](${tamara}) (Tamar = palmeira) · Maria (outra pessoa / outra ficha) · [mar](${mar}) (eco folclórico) · sânsc. *Māra* (outro objecto) |
| Fonte | [Wikcionário · Mara](${wikiMara}) |
| Data | ${inspected} |

**O que é o objeto:** o **nome**. No lab: quem chega ao mapa merece ficha, mesmo quando o dia não a tinha na rota. Nomear é [gesto](${gesto}); nomear com [verdade](${verdade}) é ofício.

## 2. Camadas — sem fundir

| Camada | Leitura | Confiança | Ofício |
|--------|---------|-----------|--------|
| **Nome BR** | Antropónimo vivo; muitas vezes diminutivo de Maria e parentes | Alta (uso) | Objecto desta ficha |
| **Som em maravilha** | *Mara-* abre *maravilha* / *maravilhoso* | Alta (forma) | Elo principal com [maravilhoso](${maravilhoso}) |
| **Heb. מָרָה *mārāh*** | «Amarga» — Rute 1:20: Noemi pede *Mara* na hora amarga | Alta (texto bíblico) | **Camada**, não veredicto sobre a tia |
| **Tamara** | Hebr. *tāmār* (palmeira) — outra ficha, outro nome | Alta | [Tamara Klink](${tamara}) ≠ Mara |
| **mar** | Lat. *mare* — eco de ouvido, não étimo do antropónimo | Folclórica | [mar](${mar}) fica irmão de água, não pai do nome |
| **Sânsc. *Māra*** | Figura de morte/desejo no budismo | Alta (outro léxico) | **Ruído** se colado à tia |

**H1:** no BR, **Mara** é **nome de alguém** — hipocorístico ou forma plena — antes de ser sentença.  
**H2:** o étimo hebraico *mārāh* (amarga) existe e fica mapeado; **não** reduz a pessoa a Rute. Noemi *escolheu* o nome na mágoa; o lab **não** escolhe amargura como destino da ficha.  
**H3:** *maravilha* (lat. *mirabilia*, o admirável) é o elo que o peito pediu hoje: Mara **cola** em Maravilha pelo som e pelo ofício do pequeno.

## 3. Mara × Maravilha

[Maravilhoso](${maravilhoso}) herda **maravilha**: o que abre o peito. *Mara* não é sinónimo de *maravilha* — é **o nome que cabe dentro do assombro**.

| Palavra | Eixo | Pergunta do lab |
|---------|------|-----------------|
| **Mara** | Nome que chegou | «Quem chegou, mesmo sem estar na lista?» |
| **maravilha** / [maravilhoso](${maravilhoso}) | Assombro e elogio BR | «O peito abriu — com rasto?» |
| [Alice](${alice}) | País das Maravilhas (obra) | Literatura — não protocolo; outro buraco |
| barquinho de papel | Maravilha **pequena** | Cabe na palma; flutua sem oceano |

**Veredicto cola:** a maravilha desta ficha não é a das sete maravilhas do mundo. É a do **barquinho de papel** — dobrar, soprar, ver flutuar. Mara chega nesse tamanho. Aula de ofício: [aprender origami · barquinho](/origami/barquinho-de-papel/) — mãos reais; vídeo sem fala, áudio local.

## 4. Poema — as maravilhas dos barquinhos de papel

Pedido do lab: um poema curto. Fica também na trilha [Vida](${poema}).

> ${poem.split('\n').join('\n> ')}

Leitura: o barquinho não compete com o [barco](${barco}) da invernagem nem com o [mar](${mar}) do gelo. É **outra escala**. Papel, dobra, [água](${agua}) rasa. A maravilha é caber.

## 5. Chegada — pensou-se nela o dia inteiro

| Facto de campo | Leitura lab |
|----------------|-------------|
| Pensou-se nela muito hoje | O nome já trabalhava antes da ficha |
| Demorou a chegar aqui | O mapa não apressa o luto nem o afecto |
| Não era a intenção | Lista ≠ o que o ofício precisa |
| Aconteceu | Fichar o que chega — [verdade](${verdade}) |

**Anti-armadilha:** transformar a tia em símbolo, em Rute, em Tamara, em milagre. O lab recusa. Fica o **nome**, o **poema**, a **maravilha pequena**.

## 6. Usos e limites

| Uso | Bom × mau no lab |
|-----|------------------|
| **Nomear Mara** | Bom: vínculo · Mau: necrológio sem ofício |
| **Colar em maravilha** | Bom: som + barquinho · Mau: apagar o nome sob o elogio |
| **Ler Rute** | Bom: camada hebraica · Mau: «ela era a amarga» |
| **Dobrar papel** | Bom: [gesto](${gesto}) de infância · Mau: infantilizar o luto |
| **Fechar** | [Faça o melhor!](${mantra}) — o melhor possível **hoje**, com o que chegou |

## 7. Rede (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Maravilhoso](${maravilhoso}) | Maravilha — assombro; Mara cola no som e no peito |
| [Alice · País das Maravilhas](${alice}) | Outra maravilha (obra) — não fundir |
| [Barco](${barco}) · [mar](${mar}) · [água](${agua}) | Família da água; o barquinho é a escala de palma |
| [Mãe](${mae}) · [Dona Maria](${donaMaria}) | Cuidado familiar — Mara ≠ Maria |
| [Tamara](${tamara}) | Outro nome; palmeira ≠ esta ficha |
| [Vida](${vidaPalavra}) · [alma](${alma}) · [coração](${coracao}) | Onde o nome mora quando chega |
| [Memorável](${memoravel}) · [passado](${passado}) | O que fica; o que já foi — sem congelar |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Casa do vocábulo |
| [Faça o melhor!](${mantra}) · [poema Vida](${poema}) | Fecho e verso |

## Hipóteses (síntese)

**H0:** o nome **chegou** — sem ser a intenção; o ofício é fichar.  
**H1:** Mara = antropónimo BR (e hipocorístico de Maria e parentes).  
**H2:** *mārāh* hebraica = camada, não destino.  
**H3:** cola com **maravilha** / [maravilhoso](${maravilhoso}) pelo som e pelo barquinho.  
**H4:** Tamara, Maria, mar, *Māra* sânscrito = ≠.  
**H5:** fecho = [Faça o melhor!](${mantra}).

## Limites

- Não é obituário nem biografia da tia.  
- Não fecha doutrina (Rute, maravilha teológica, além).  
- Não substitui [maravilhoso](${maravilhoso}) nem [Tamara](${tamara}).

## Status

**Aprovado** — **Mara** fichada: nome que chegou; cola em [maravilha](${maravilhoso}); poema dos [barquinhos de papel](${poema}); [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Poema](${poema}) · [▶ Barco](${barco}) · [▶ Mãe](${mae}) · [▶ Tamara](${tamara}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida}) · [▶ Hub](${hubAll})
`;

  const contentEn = `## Scope

Editorial inspection of the given name **Mara** in Brazilian Portuguese. Field note: an aunt. It was not the planned sheet. **It took time to arrive. She was thought of all day. It happened.**

The name **sits inside** [maravilha / maravilhoso](${maravilhoso}) (wonder). A short poem: the wonders of **paper boats**.

> Method: [Wiktionary · Mara](${wikiMara}). **Not an obituary.** The lab files the **name** that arrived.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **Mara** |
| Lab type | Given name × wonder × paper boat |
| Arrival | Not the day’s intention — **it happened** |
| Wonder link | [maravilhoso](${maravilhoso}) ← *maravilha* ← Lat. *mirabilia* |
| ≠ | [Tamara](${tamara}) · Maria · [mar](${mar}) · Skt. *Māra* |
| Date | ${inspected} |

Hebrew *mārāh* (“bitter”, Ruth 1:20) is a **layer**, not a verdict on the person.

## 2. Poem — paper-boat wonders

> ${poemEn.split('\n').join('\n> ')}

Also on [Vida](${poema}).

## Status

**Approved** — Mara filed; glued to [wonder](${maravilhoso}); paper boats; [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Poem](${poema}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del nombre propio **Mara** en el portugués de Brasil. Nota de campo: la tía. No era la ficha prevista. **Tardó en llegar. Se pensó en ella todo el día. Sucedió.**

El nombre **cabe dentro** de [maravilha / maravilhoso](${maravilhoso}). Un poema breve: las maravillas de los **barquitos de papel**.

> Método: [Wikcionario · Mara](${wikiMara}). **No es necrológico.** El lab ficha el **nombre** que llegó.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **Mara** |
| Tipo lab | Nombre × maravilla × barquito |
| Llegada | No era la intención del día — **sucedió** |
| Vínculo | [maravilhoso](${maravilhoso}) ← *maravilha* ← lat. *mirabilia* |
| ≠ | [Tamara](${tamara}) · Maria · [mar](${mar}) · sánsc. *Māra* |
| Fecha | ${inspected} |

El hebreo *mārāh* («amarga», Rut 1:20) es **capa**, no veredicto sobre la persona.

## 2. Poema — maravillas de los barquitos de papel

> ${poemEs.split('\n').join('\n> ')}

También en [Vida](${poema}).

## Estado

**Aprobada** — Mara fichada; pega en [maravilla](${maravilhoso}); barquitos; [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Maravilhoso](${maravilhoso}) · [▶ Poema](${poema}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiMara, poem, poemEn, poemEs };
}

function buildMaraPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMaraBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 160;
  return makePalavra({
    title: 'Inspeção: Mara — o nome que chegou, a maravilha e os barquinhos de papel',
    titleEn: 'Inspection: Mara — the name that arrived, wonder and paper boats',
    titleEs: 'Inspección: Mara — el nombre que llegó, la maravilla y los barquitos de papel',
    excerpt:
      'Palavras: «Mara» — nome que chegou sem estar na lista; cola em maravilha; étimo hebr. mārāh é camada, não veredicto; poema dos barquinhos de papel; Faça o melhor!',
    excerptEn:
      'Words: “Mara” — a name that arrived unplanned; glued to maravilha (wonder); Heb. mārāh is a layer, not a verdict; paper-boat poem; Do your best!',
    excerptEs:
      'Palabras: «Mara» — nombre que llegó sin lista; pega en maravilha; el hebr. mārāh es capa, no veredicto; poema de barquitos de papel; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-mara',
    date: '2026-08-22T04:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mara · palavra',
    coverImage: '/imagens/inspecoes/mara-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMaraPost,
  buildMaraBodies,
  maraPoemPt,
  maraPoemEn,
  maraPoemEs
};
