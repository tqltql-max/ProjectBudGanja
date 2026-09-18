'use strict';

/**
 * Inspeção Expressões · Elo de Ligação
 * Locução — o anel que junta A e B · cruzamento da lemniscata (∞) ·
 * gatilho *simbuklo* → símbolo do infinito · aula XIV Kassia · Valeu !!!
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function poemEloDeLigacaoPt() {
  return `O oito deitado chama-se infinito.
O oito em pé chama-se caminho:
o que está em cima fala com o que está em baixo.

No cruzamento — o anel que não se vê —
mora o elo de ligação.

Não é só o elo da corrente na mão.
Não é só o link que se clica.
É o ponto onde as duas voltas
ainda são uma só.

Simbuklo chegou torto no ouvido.
Símbolo endereçou.
A fita (lemniscata) não promete eternidade:
promete comunicação,
ritmo,
equilíbrio.

O corpo já sabia:
relaxar, comer, dormir, proteger —
o maestro liga o que estava separado.

Valeu !!!
no cruzamento,
sem fingir que o infinito cabe numa ficha.`;
}

function poemEloDeLigacaoEn() {
  return `The eight lying down is called infinity.
The eight standing up is called a path:
what is above speaks with what is below.

At the crossing — the ring you do not see —
lives the connecting link.

It is not only the chain-ring in the hand.
It is not only the link you click.
It is the point where both loops
are still one.

Simbuklo arrived crooked in the ear.
Símbolo addressed it.
The ribbon (lemniscate) does not promise forever:
it promises communication,
rhythm,
balance.

The body already knew:
relax, eat, sleep, protect —
the conductor joins what was apart.

Valeu !!!
at the crossing,
without pretending infinity fits on a sheet.`;
}

function poemEloDeLigacaoEs() {
  return `El ocho acostado se llama infinito.
El ocho de pie se llama camino:
lo de arriba habla con lo de abajo.

En el cruce — el anillo que no se ve —
vive el eslabón de ligación.

No es solo el eslabón de la cadena en la mano.
No es solo el link que se clica.
Es el punto donde las dos vueltas
aún son una sola.

Simbuklo llegó torcido al oído.
Símbolo lo enderezó.
La cinta (lemniscata) no promete eternidad:
promete comunicación,
ritmo,
equilibrio.

El cuerpo ya sabía:
relajarse, comer, dormir, proteger —
el maestro une lo que estaba separado.

Valeu !!!
en el cruce,
sin fingir que el infinito cabe en una ficha.`;
}

function buildEloDeLigacaoBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-elo-de-ligacao.html';
  const link = '/posts/post-inspecao-palavra-link.html';
  const conexao = '/posts/post-inspecao-palavra-conexao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const no = '/posts/post-inspecao-palavra-no.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const desatarNo = '/posts/post-inspecao-expressao-desatar-o-no.html';
  const cinta = '/posts/post-inspecao-palavra-cinta.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const vida = '/posts/post-inspecao-palavra-vida.html';
  const trilha = '/vida/';
  const guia = '/guia/palavras.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const tudo = '/posts/post-inspecao-palavra-tudo.html';
  const ecbome = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const movrecam = '/posts/post-inspecao-canal-movrecam.html';
  const lemniscata = '/posts/post-inspecao-palavra-lemniscata.html';
  const emPeDeitado = '/posts/post-inspecao-expressao-em-pe-e-deitado.html';
  const emPe = '/posts/post-inspecao-expressao-em-pe.html';
  const aula8 = '/biblioteca/unifesp/livro-xiv.html#aula-8';
  const kassiaVideos = '/videos/?channel=movrecam&series=kassia-martins';
  const ytAula8 = 'https://www.youtube.com/watch?v=dNcVCa1_7Ig';
  const wikiElo = 'https://pt.wiktionary.org/wiki/elo';
  const wikiLigacao = 'https://pt.wiktionary.org/wiki/liga%C3%A7%C3%A3o';
  const wikiSimbolo = 'https://pt.wiktionary.org/wiki/s%C3%ADmbolo';
  const wikiInfinito = 'https://pt.wikipedia.org/wiki/Infinito';
  const wikiInfSym = 'https://en.wikipedia.org/wiki/Infinity_symbol';
  const wikiLemniscate = 'https://en.wikipedia.org/wiki/Lemniscate';
  const wikiSymbolon = 'https://en.wiktionary.org/wiki/%CF%83%CF%8D%CE%BC%CE%B2%CE%BF%CE%BB%CE%BF%CE%BD';

  const body = `## Escopo

Inspeção editorial da expressão **«[elo de ligação](${self})»** — o **anel que junta** A e B. Pedido de campo: relacionar com o **simbuklo do infinito**. O ouvido trouxe *simbuklo*; a letra endereça **símbolo**. O objecto gráfico é a **[lemniscata](${lemniscata})** (∞, o oito deitado). As posturas — [em pé](${emPe}) e [em pé e deitado](${emPeDeitado}) — ficam nas expressões irmãs. O ofício desta ficha: o **cruzamento** das duas voltas **é** o elo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · elo](${wikiElo}), [ligação](${wikiLigacao}), [símbolo](${wikiSimbolo}), [infinito](${wikiInfinito}), [infinity symbol](${wikiInfSym}), [lemniscate](${wikiLemniscate}), gr. [σύμβολον](${wikiSymbolon}). Analogia de aula: Dra. **Kassia Martins** · [8.ª aula XIV](${aula8}) ([YouTube](${ytAula8})) · [UNIFESP](${unifesp}) / [MovReCam](${movrecam}). **Ficha ≠ misticismo de eternidade, ≠ protocolo clínico, ≠ manual de corrente.** Sem afiliação. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *simbuklo* / *simbolo do infinito* / *oito deitado* / *lemeniscata* (OCR da aula) → **símbolo do infinito** · **[lemniscata](${lemniscata})** · **elo de ligação**. *Bodiado* → [em pé e deitado](${emPeDeitado}). *Em pé* (oito erguido) → [em pé](${emPe}).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **elo de ligação** |
| Classe | Locução substantiva |
| Peças | **elo** (anel de corrente) + **ligação** (acto / efeito de ligar) |
| Par pedido | **símbolo do infinito** (∞ / lemniscata) |
| Gatilho de ouvido | *simbuklo* → **símbolo** |
| Tipo BudGanja | Expressão — anel que junta × cruzamento do ∞ |
| Não é | [link](${link}) (loan EN) sozinho · [nó](${no}) · eternidade · dose |
| Elos lab | [conexão](${conexao}) · [relação](${relacao}) · [ligar](${ligar}) · [endocanabinoidoma](${ecbome}) |
| Fonte aula | [Kassia · aula 8](${kassiaVideos}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português do **elo que realmente liga** — não um anel solto na gaveta. Na corrente, é o anel que segura os outros. No ∞, é o **ponto onde as duas voltas se encontram**. No corpo, a analogia da aula XIV lê o [endocanabinoidoma](${ecbome}) como comunicação cima↔baixo — o cruzamento como ofício, não como dogma.

## 2. Peças da locução

| Peça | Étimo de trabalho | Confiança | Ofício |
|------|-------------------|-----------|--------|
| **elo** | lat. *anellus* «anelzinho» → PT *elo* (elo de corrente) | Alta | O anel; o que encaixa |
| **ligação** | *ligar* ← lat. *ligāre* «atar, unir» | Alta | O acto / o efeito de atar |
| **elo de ligação** | composto vivo PT | Alta no uso | Tautologia útil: o anel **que** liga |
| **símbolo** | gr. σύμβολον *sýmbolon* «peça que encaixa / sinal de reconhecimento» ← σύν + βάλλειν | Alta | O token partido que só vale quando as metades **encontram** |
| **infinito** | lat. *in-* + *fīnītus* «sem fim» | Alta | O nome do sem-limite — não a prova de que «cabe tudo» |
| **[lemniscata](${lemniscata})** | lat. *lemniscus* «fita» ← gr. λημνίσκος | Alta | O oito deitado; a curva em forma de fita — ficha de Palavras |

**H1:** a locução é quase redundante (*elo* já é ligação) — o português insiste para **não** deixar o anel sem ofício.  
**H2:** *símbolo* (σύμβολον) já era, no étimo, um **elo de ligação**: duas metades que se reconhecem.  
**H3:** *simbuklo* não é étimo; é orelha. O lab guarda o gatilho e **corrige** a letra.

Irmãos de mapa (não fundir): [link](${link}) (loan EN, *hlekkr*) · [conexão](${conexao}) (*connexio*) · [relação](${relacao}) (*relatĭō*) · [simbiose](${simbiose}) (*syn*+*bíos*).

## 3. O ∞ — três posturas (não misturar)

| Postura | Nome | Leitura lab | Confiança |
|---------|------|-------------|-----------|
| **∞ deitado** | [Em pé e deitado](${emPeDeitado}) · Wallis, 1655 | Sem-fim matemático / gráfico | Alta no **nome**; o conceito matemático é outro ofício |
| **8 em pé** | [Em pé](${emPe}) · analogia da [aula 8](${aula8}) | Movimento e **comunicação**: cima fala com baixo | Alta como **metáfora de aula**; não é teorema |
| **Cruzamento** | O **elo de ligação** desta ficha | O ponto onde as duas voltas ainda são uma | Alta como leitura de ofício |

**H4:** o oito deitado nomeia o **sem fim**; o oito em pé nomeia o **vai-e-vem**. O cruzamento nomeia o **entre**.  
**H5:** a Dra. Kassia Martins, na [8.ª aula do XIV Curso](${aula8}), pôs a lemniscata junto das funções do SEC (*relaxar, comer, dormir, esquecer, proteger*): quanto mais **ritmado** o movimento cima↔baixo, mais equilíbrio. O lab **relaciona** essa analogia com a locução — **não** afirma que a professora usou as palavras *elo de ligação*.

**Veredicto de analogia:** o [endocanabinoidoma](${ecbome}) é, nessa aula, o **maestro que comunica**. O elo de ligação é o **nome do cruzamento**. Distinto de [tudo](${tudo}) — o infinito **não** cabe numa ficha.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Elo de ligação** | Sinónimo preguiçoso de [link](${link}) | Locução PT: o anel **com ofício** de juntar |
| **Símbolo do infinito** | Promessa de eternidade | Marca gráfica + conceito; aqui = lemniscata |
| ***Simbuklo*** | Palavra nova | Gatilho de ouvido para **símbolo** |
| **Lemniscata em pé** | Religião do oito | Analogia de **comunicação** (aula XIV) |
| **Cruzamento do ∞** | [Nó](${no}) | Encontro contínuo; o [nó](${no}) aperta, o elo **passa** |
| **SEC / eCBome** | O próprio ∞ | Rede fisiológica — mapa em [endocanabinoidoma](${ecbome}); **≠** esta locução |

## 5. Rede BudGanja (só fichas existentes)

| Ficha | Relação |
|-------|---------|
| [Link · Klink](${link}) | Loan EN *elo / hiperligação*; orelha cola no apelido; **não** é esta locução |
| [Conexão](${conexao}) | Ação/efeito de conectar — *x*, não ç |
| [Ligar × desligar](${ligar}) | Verbos do circuito; *ligação* é o substantivo da família |
| [Relação](${relacao}) · [simbiose](${simbiose}) | O *entre* · viver juntos |
| [Nó](${no}) · [corda](${corda}) · [desatar o nó](${desatarNo}) · [cinta](${cinta}) | Laço e fio — o nó **prende**; o elo **encadeia** |
| [Lemniscata](${lemniscata}) | O **nome** da curva-fita; OCR *lemeniscata* |
| [Em pé](${emPe}) | O oito **erguido** — postura vertical; comunicação cima↔baixo |
| [Em pé e deitado](${emPeDeitado}) | As **duas posturas** da mesma fita (*bodiado* → deitado) |
| [Endocanabinoidoma](${ecbome}) | Mapa do SEC; analogia da lemniscata na aula de Kassia |
| [Curso UNIFESP](${unifesp}) · [MovReCam](${movrecam}) · [aula 8](${aula8}) | Crédito da analogia; [vídeos Kassia](${kassiaVideos}) |
| [Sinal](${sinal}) · [gesto](${gesto}) · [verdade](${verdade}) | O símbolo é [sinal](${sinal}); o cruzamento pede [gesto](${gesto}) |
| [Etimologia](${etimologia}) · [língua](${lingua}) · [Guia](${guia}) | *Simbuklo* → símbolo; *anellus* / *ligāre* / σύμβολον |
| [Tudo](${tudo}) · [vida](${vida}) · trilha [Vida](${trilha}) | Sem abraçar o infinito; ofício no chão |
| [Valeu !!!](${mantra}) | Fechar no cruzamento, não no slogan |

## 6. Usos no português

| Uso | Bom × mau no lab |
|-----|------------------|
| **Corrente / cadeia** | Bom: o anel que segura |
| **Pessoa ou peça que junta dois grupos** | Bom: ofício do *entre* |
| **Metáfora do ∞** | Bom se se declara: o cruzamento, não a eternidade |
| **«O SEC é o infinito»** | Mau: cola analogia em dogma |
| **Confundir com [link](${link}) / Klink** | Mau: loan e apelido ficam nas fichas deles |
| **Escrever *simbuklo* como lema** | Mau: guardar o gatilho; grafia = **símbolo** |

**Finalidade-mãe:** guardar a locução **e** o cruzamento. O elo de ligação inspecciona o anel que junta; o símbolo do infinito empresta a figura; a aula XIV empresta o oito em pé. Nenhum dos três é receita.

## Poema Vida

\`\`\`poem
${poemEloDeLigacaoPt()}
\`\`\`

## Hipóteses (síntese)

**H1:** *elo de ligação* = locução do anel **com ofício** de juntar (quase tautológica, por insistência).  
**H2:** *simbuklo* = gatilho de ouvido → **símbolo** (do infinito).  
**H3:** σύμβολον já era um elo: duas metades que se reconhecem.  
**H4:** o cruzamento da lemniscata é a figura pedida — ∞ deitado = nome; 8 em pé = comunicação (Kassia / XIV).  
**H5:** [endocanabinoidoma](${ecbome}) = mapa; analogia ≠ prova.  
**H6:** fecho = [Valeu !!!](${mantra}) — ligar no cruzamento, sem fingir eternidade.

## Limites

- Não é aula de teoria dos conjuntos nem de compactação.  
- Não afirma que Kassia pronunciou *elo de ligação* — a **relação** é do laboratório.  
- Não é protocolo clínico nem dose. O SEC fica na ficha [endocanabinoidoma](${ecbome}).  
- *Link*, *Klink*, [nó](${no}) e [desatar o nó](${desatarNo}) ficam nas fichas deles.  
- OCR da aula escreve *lemeniscata* / *lemenescata* — lema: **lemniscata**.

## Status

**Aprovada** — **elo de ligação** fichada como locução do anel que junta; relacionada ao **símbolo do infinito** (lemniscata) pelo **cruzamento**; gatilho *simbuklo* endereçado; analogia XIV (Kassia) creditada sem afiliação. Sem eternidade de cartaz.

[▶ Expressões](${hub}) · [▶ Em pé](${emPe}) · [▶ Em pé e deitado](${emPeDeitado}) · [▶ Lemniscata](${lemniscata}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **“[elo de ligação](${self})”** — the **ring that joins** A and B. Field request: relate it to the **infinity symbol** (*simbuklo* in the ear → **símbolo**). The graphic is the **lemniscate** (∞). Craft reading: the **crossing** of the two loops **is** the link.

> Independent audit. Sources: [elo](${wikiElo}), [infinity symbol](${wikiInfSym}), [lemniscate](${wikiLemniscate}), [σύμβολον](${wikiSymbolon}). Classroom analogy: Dr. **Kassia Martins**, [UNIFESP XIV lesson 8](${aula8}) ([YouTube](${ytAula8})). **Not mysticism, not a clinical protocol.** Close: [Valeu !!!](${mantra}).

## Object

| Field | Value |
|-------|-------|
| Saying | **elo de ligação** (connecting link) |
| Pair | **infinity symbol** / lemniscate |
| Ear trigger | *simbuklo* → **símbolo** |
| Lab type | Expression — joining ring × ∞ crossing |
| Not | [link](${link}) loan alone · [nó](${no}) · eternity · dose |
| Date | ${inspected} |

**H1:** the phrase is almost tautological — Portuguese insists the ring **do** the joining.  
**H2:** Greek *sýmbolon* was already a joining token (two halves that fit).  
**H3:** Kassia’s standing-8 = communication up↔down; the lab **relates** that crossing to this locution — it does **not** claim she used these words.  
**H4:** [endocannabinoidome](${ecbome}) is the map; the analogy is not proof.

\`\`\`poem
${poemEloDeLigacaoEn()}
\`\`\`

## Status

**Approved** — connecting-link locution filed; related to ∞ by the **crossing**; *simbuklo* addressed; XIV analogy credited without affiliation.

[▶ Sayings](${hub}) · [▶ Link](${link}) · [▶ Endocannabinoidome](${ecbome}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«[elo de ligação](${self})»** — el **anillo que junta** A y B. Pedido de campo: relacionar con el **símbolo del infinito** (*simbuklo* en el oído → **símbolo**). El gráfico es la **lemniscata** (∞). Oficio: el **cruce** de las dos vueltas **es** el eslabón.

> Auditoría independiente. Fuentes: [elo](${wikiElo}), [infinity symbol](${wikiInfSym}), [lemniscate](${wikiLemniscate}), [σύμβολον](${wikiSymbolon}). Analogía de aula: Dra. **Kassia Martins**, [XIV UNIFESP aula 8](${aula8}) ([YouTube](${ytAula8})). **No es misticismo ni protocolo clínico.** Cierre: [¡Valeu !!!](${mantra}).

## Objeto

| Campo | Valor |
|-------|-------|
| Expresión | **elo de ligação** |
| Par | **símbolo del infinito** / lemniscata |
| Gatillo | *simbuklo* → **símbolo** |
| Tipo lab | Expresión — anillo que junta × cruce del ∞ |
| No es | [link](${link}) · [nó](${no}) · eternidad · dosis |
| Fecha | ${inspected} |

**H1:** la locución es casi tautológica — el portugués insiste en que el anillo **haga** el oficio.  
**H2:** gr. *sýmbolon* ya era un token que encaja.  
**H3:** el 8 de pie (Kassia) = comunicación arriba↔abajo; el lab **relaciona** el cruce — **no** afirma que ella dijera estas palabras.  
**H4:** el [endocanabinoidoma](${ecbome}) es el mapa; la analogía no es prueba.

\`\`\`poem
${poemEloDeLigacaoEs()}
\`\`\`

## Estado

**Aprobada** — locución del eslabón que junta; relacionada al ∞ por el **cruce**; *simbuklo* enderezado; analogía XIV acreditada sin afiliación.

[▶ Expresiones](${hub}) · [▶ Link](${link}) · [▶ Endocanabinoidoma](${ecbome}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: wikiInfSym };
}

function buildEloDeLigacaoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildEloDeLigacaoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 21;
  return expressaoPost({
    title: 'Inspeção: Elo de ligação — o cruzamento do infinito, não a eternidade',
    titleEn: 'Inspection: Elo de ligação — the crossing of infinity, not eternity',
    titleEs: 'Inspección: Elo de ligação — el cruce del infinito, no la eternidad',
    excerpt:
      'Expressões: «elo de ligação» — o anel que junta; *simbuklo* → símbolo do infinito (lemniscata); cruzamento = elo; aula XIV Kassia; Valeu !!!',
    excerptEn:
      'Sayings: “elo de ligação” — the ring that joins; *simbuklo* → infinity symbol (lemniscate); crossing = link; UNIFESP XIV Kassia; Valeu !!!',
    excerptEs:
      'Dichos: «elo de ligação» — el anillo que junta; *simbuklo* → símbolo del infinito (lemniscata); cruce = eslabón; aula XIV Kassia; ¡Valeu !!!',
    slug: 'inspecao-expressao-elo-de-ligacao',
    date: '2026-08-22T06:10:00.000Z',
    seriesOrder: order,
    seriesLabel: 'elo de ligação · expressão',
    coverImage: '/imagens/inspecoes/elo-de-ligacao-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildEloDeLigacaoPost,
  buildEloDeLigacaoBodies,
  poemEloDeLigacaoPt,
  poemEloDeLigacaoEn,
  poemEloDeLigacaoEs
};
