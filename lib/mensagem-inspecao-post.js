'use strict';

/**
 * Inspeção Palavras · mensagem
 * Comunicação · SMS/chat · «deixar mensagem» · sinal ≠ mensagem
 * Tipografia: sm,enajsos → mensagem. Cover plural: mensagens.
 * Elos (só se slug existir): sinal · gesto · lingua-portuguesa
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function slugExists(slugSuffix) {
  const html = path.join(
    __dirname,
    '..',
    'posts',
    'post-inspecao-palavra-' + slugSuffix + '.html'
  );
  if (fs.existsSync(html)) return true;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    return posts.some((p) => p.slug === 'inspecao-palavra-' + slugSuffix);
  } catch (_) {
    return false;
  }
}

function linkOrPlain(label, href, exists) {
  return exists ? '[' + label + '](' + href + ')' : '**' + label + '**';
}

function buildMensagemBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const comunidade = '/comunidade/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiki = 'https://pt.wiktionary.org/wiki/mensagem';
  const wikiEn = 'https://en.wiktionary.org/wiki/message';
  const wikiEl = 'https://pt.wikipedia.org/wiki/Mensagem';

  const hasGesto = slugExists('gesto');
  const hasLingua = slugExists('lingua-portuguesa');
  const hasSinal = slugExists('sinal');
  const sinalHref = '/posts/post-inspecao-palavra-sinal.html';

  const eloGesto = linkOrPlain('gesto', gesto, hasGesto);
  const eloLingua = linkOrPlain('língua portuguesa', lingua, hasLingua);
  const eloSinal = linkOrPlain('sinal', sinalHref, hasSinal);

  const body = `## Escopo

Inspeção editorial da palavra **mensagem** — o **conteúdo que se envia** (e o plural **mensagens**): recado, SMS, chat, nota deixada, comunicado. Tipografia de entrada: «sm,enajsos» → **mensagem**. Esta ficha cobre o **objeto**, os **sentidos** (comunicação · era digital · «deixar mensagem»), o contraste **${eloSinal} ≠ mensagem**, e o fecho [Faça o melhor!](${mantra}). Tom: **Inspetor BudGanja** — ofício cálido, sem sermão de «desliga o telemóvel». Elos: ${eloGesto} · ${eloLingua}${hasSinal ? ' · ' + eloSinal : ''}.

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wikcionário · mensagem](${wiki}), [Wiktionary · message](${wikiEn}), [Wikipédia · Mensagem](${wikiEl}), série [Palavras](${hub}). Étimo de trabalho: lat. *mittere* («enviar») → via fr. *message* / lat. med. *missaticum* → PT **mensagem** / **mensagens**. **Ficha de palavra ≠ manual de redes sociais nem teoria da informação.** Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **mensagem** (plural **mensagens**) |
| Tipografia origem | sm,enajsos → mensagem |
| Classe | Substantivo feminino |
| Étimo (trabalho) | Lat. *mittere* («enviar») → *missus* / *missaticum* → fr. *message* → PT *mensagem* — confiança: alta |
| Família | *mensageiro* · *mensagemzinha* · *mensagem de voz* · *caixa de mensagens* |
| Cognatos | esp. *mensaje* · fr. *message* · it. *messaggio* · ing. *message* · lat. *mittere* |
| Tipo BudGanja | Palavra — comunicação × era SMS/chat × ofício de deixar rasto |
| Elo ofício | ${eloGesto} · [verdade](${verdade}) · [caminho](${caminho}) |
| Elo língua | ${eloLingua} |
| Elo contraste | ${eloSinal} ≠ mensagem (marca ≠ conteúdo) |
| Elo rede | [Comunidade](${comunidade}) · [Vida](${vida}) · [Diário](${diario}) |
| Fonte | [Wikcionário · mensagem](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia o **conteúdo comunicado** — o que alguém diz, escreve, grava ou deixa para outro. No lab: mensagem boa = **conteúdo com destino e cuidado**; mensagem má = ruído, spam, ou «já mandei» sem [verdade](${verdade}).

## 2. Sentidos — comunicação · digital · deixar rasto

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo (*mittere*)** | Enviar, fazer passar | Alta |
| **Comunicação** | Conteúdo dirigido a alguém (recado, carta, aviso) | Alta |
| **Era SMS / chat** | Texto curto no telemóvel; bolha; «visto» | Alta (uso vivo) |
| **«Deixar mensagem»** | Recado na ausência — secretária, caixa postal, nota | Alta |
| **Plural «mensagens»** | Fila, histórico, caixa de entrada | Alta |
| **Figurativo** | «A mensagem do filme»; «passar a mensagem» | Alta–média |
| **Ofício lab** | Comunicar com método — sem confundir com ${eloSinal} | Alta (mapa BudGanja) |

**H1:** *mensagem* herda o *mittere* — **há envio**, não só «barulho».  
**H2:** na era SMS/chat, mensagem = unidade mínima do diálogo mediado — curta, datada, com rasto.  
**H3:** «deixar mensagem» = cuidar da ausência: o outro não está; o conteúdo fica.

## 3. Sinal ≠ mensagem

No laboratório importa não misturar camadas:

| Termo | Papel | Exemplo |
|-------|-------|---------|
| **Sinal** | Marca, alerta, índice — «há algo» | Luz a piscar; emoji de status; tipografia |
| **Mensagem** | Conteúdo — «o quê» | Texto, áudio, recado com sentido |
| **Gesto** | Acto — «o como se faz» | Escrever, enviar, citar, ficar |

${hasSinal ? `Regra: o [${'sinal'}](${sinalHref}) pode **avisar**; a **mensagem** **diz**. Confundir os dois vira ficha oca — barulho sem conteúdo, ou conteúdo sem rasto.` : 'Regra: o **sinal** pode **avisar**; a **mensagem** **diz**. Confundir os dois vira ficha oca — barulho sem conteúdo, ou conteúdo sem rasto. (Ficha «sinal» ainda não no catálogo — contraponto lexical aqui.)'}

| Situação | Bom (ofício) | Mau (ruído) |
|----------|--------------|-------------|
| **SMS / chat** | Texto claro + contexto | «Ok» vazio; flood; ghosting sem fecho |
| **Deixar mensagem** | Recado útil na ausência | Caixa cheia de spam / pressão |
| **Lab / inspeção** | Citar, limitar, apontar fonte | Slogan sem [verdade](${verdade}) |
| **Comunidade** | Partilhar com cuidado ([Comunidade](${comunidade})) | Mensagem como arma ou fofoca |

**Veredicto:** mensagem boa no lab = **conteúdo com destino, limite e carinho**. Se só for ${hasSinal ? eloSinal : 'sinal'} sem dizer nada, falta a ficha.

## 4. Era SMS / chat e «deixar mensagem»

| Eixo | Onde vive | Papel |
|------|-----------|-------|
| **SMS / chat** | Telemóvel, apps, bolhas | Unidade curta; histórico = plural **mensagens** |
| **Deixar mensagem** | Secretária, voz, nota na porta | Cuidado na ausência — o outro lê depois |
| **Comunidade** | [Comunidade](${comunidade}) | Partilha pública com método |
| **Vida / Diário** | [Vida](${vida}) · [Diário](${diario}) | Mensagem a si e ao projecto — registo |
| **Língua** | ${eloLingua} | Solo onde a mensagem se forma em português |

A tipografia «sm,enajsos» lembra o ofício: **corrigir o teclado**, não apagar o sentido. Mensagem chega torta → inspeciona-se e endireita-se ([caminho](${caminho})).

## 5. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Comunicar** | Recado, carta, aviso | Conteúdo com [verdade](${verdade}) |
| **SMS / chat** | Texto curto mediado | Unidade do diálogo digital |
| **Deixar mensagem** | Na ausência do outro | Cuidado + rasto |
| **Plural** | Caixa de **mensagens** | Histórico; fila; capa da série |
| **Figurativo** | «Mensagem da obra» | Ler o que a ficha *diz*, não só o título |
| **Fechar** | Depois de enviar | [Faça o melhor!](${mantra}) — a melhor mensagem possível **hoje** |

**Finalidade-mãe:** nomear a **mensagem** para **separar conteúdo de ruído** — comunicação com destino; SMS/chat com ofício; «deixar mensagem» como cuidado; ${eloSinal} ≠ mensagem.

## 6. Faça o melhor!

| Camada | Ligação |
|--------|---------|
| Mantra | [Faça o melhor!](${mantra}) — a melhor mensagem possível **hoje** (clara, honesta, com destino) |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Já mandei» ≠ comunicado · flood ≠ presença · sinal sem conteúdo = vazio |
| Acto | ${eloGesto} de escrever / enviar / deixar |
| Língua | ${eloLingua} — a mensagem vive no português do lab |
| Contraste | ${eloSinal} avisa · mensagem diz |
| Percurso | [Caminho](${caminho}) · [Verdade](${verdade}) |

**Veredicto:** Faça o melhor **com a mensagem** — conteúdo com destino, na era do chat, sem confundir com ${hasSinal ? eloSinal : 'sinal'}. Mensagem sem ${hasGesto ? eloGesto : 'gesto'} = bolha vazia; mensagem com ofício = comunicação que o lab respeita.

## Hipóteses (síntese)

**H1:** objeto = lat. *mittere* → fr. *message* → PT **mensagem** / **mensagens** (tipografia sm,enajsos).  
**H2:** sentidos = comunicação · SMS/chat · deixar mensagem · figurativo.  
**H3:** contraste = ${eloSinal} ≠ mensagem; elos = ${eloGesto} · ${eloLingua}.  
**H4:** fecho = [Faça o melhor!](${mantra}) — a melhor mensagem possível hoje.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| ${eloGesto} | Acto de enviar / deixar / citar |
| ${eloLingua} | Solo lexical do laboratório |
| ${eloSinal} | Contraste — marca ≠ conteúdo |
| [Verdade](${verdade}) · [Caminho](${caminho}) | Conteúdo verificável e percurso |
| [Comunidade](${comunidade}) · [Vida](${vida}) · [Diário](${diario}) | Onde as mensagens circulam |
| [Guia de palavras](${guia}) · [hub](${hubAll}) | Catálogo |
| [Faça o melhor!](${mantra}) | Finalidade viva |

## Limites

- Não é manual de netiqueta nem política de moderação de plataformas.  
- Não é teoria da informação (bits, ruído de Shannon) — só literacia da palavra.  
- «Mensagem» figurativa de obras de arte ≠ SMS — registos distintos, ambos legítimos.  
${hasSinal ? '' : '- Ficha **sinal** ainda ausente no catálogo — o contraste lexical fica nesta inspeção até lá.\n'}
## Status

**Aprovado** — **mensagem** / **mensagens** fichada: objeto (*mittere* → message), tipografia sm,enajsos, sentidos (comunicação · SMS/chat · deixar mensagem), contraste ${eloSinal} ≠ mensagem, elos ${eloGesto} · ${eloLingua}; [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Língua portuguesa](${lingua})${hasSinal ? ' · [▶ Sinal](' + sinalHref + ')' : ''} · [▶ Verdade](${verdade}) · [▶ Comunidade](${comunidade}) · [▶ Faça o melhor!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **mensagem** (message; plural **mensagens**) — content that is sent: note, SMS, chat, voicemail. Entry typo: “sm,enajsos” → **mensagem**. Covers **object**, **senses** (communication · digital era · “leave a message”), contrast **${hasSinal ? 'sinal' : 'signal'} ≠ message**, and [Do your best!](${mantra}). Links: ${eloGesto} · ${eloLingua}${hasSinal ? ' · ' + eloSinal : ''}.

> Method note: [Wiktionary · mensagem](${wiki}), [message](${wikiEn}). Lat. *mittere* → Fr. *message* → PT *mensagem*. Word sheet ≠ social-media manual.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **mensagem** (plural **mensagens**) |
| Etymon | Lat. *mittere* (“to send”) → Fr. *message* → PT *mensagem* |
| Lab type | Communication × SMS/chat era × leaving a trace |
| Links | ${eloGesto} · ${eloLingua} · ${eloSinal} · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Communication** · **SMS / chat** · **“leave a message”** (care in absence) · plural **mensagens** (inbox / history) · figurative “the film’s message”.

## 3. Signal ≠ message

${hasSinal ? eloSinal : '**Signal**'} can **alert**; **message** **says**. Gesture (${eloGesto}) is the act of sending. Good craft = clear content with destination; bad = spam, empty “ok”, or signal without substance.

## 4. SMS / chat era

Short mediated units; history = **mensagens**. “Leave a message” = care when the other is away. Language soil: ${eloLingua}.

## 5. Do your best!

Best possible **message today** — clear, honest, with a destination. Message without ${hasGesto ? 'gesture' : 'act'} = empty bubble; message with craft = communication the lab respects.

## Status

**Approved** — object · senses · signal ≠ message · SMS/chat · leave a message · [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Gesture](${gesto}) · [▶ Portuguese](${lingua})${hasSinal ? ' · [▶ Signal](' + sinalHref + ')' : ''} · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **mensagem** (mensaje; plural **mensagens**) — el **contenido que se envía**: recado, SMS, chat, buzón. Tipografía: «sm,enajsos» → **mensagem**. Cubre **objeto**, **sentidos** (comunicación · era digital · «dejar mensaje»), contraste **${hasSinal ? 'sinal' : 'señal'} ≠ mensaje**, y [¡Haz lo mejor!](${mantra}). Vínculos: ${eloGesto} · ${eloLingua}${hasSinal ? ' · ' + eloSinal : ''}.

> Nota: [Wikcionario · mensagem](${wiki}), [message](${wikiEn}). Lat. *mittere* → fr. *message* → PT *mensagem*. Ficha de palabra ≠ manual de redes.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **mensagem** (plural **mensagens**) |
| Étimo | Lat. *mittere* → fr. *message* → PT *mensagem* |
| Tipo lab | Comunicación × era SMS/chat × dejar rastro |
| Vínculos | ${eloGesto} · ${eloLingua} · ${eloSinal} · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Comunicación** · **SMS / chat** · **«dejar mensaje»** · plural **mensagens** · figurado.

## 3. Señal ≠ mensaje

${hasSinal ? eloSinal : '**Señal**'} puede **avisar**; **mensaje** **dice**. El ${eloGesto} es el acto de enviar. Buen oficio = contenido con destino; malo = spam o señal sin sustancia.

## 4. Era SMS / chat

Unidades cortas; historial = **mensagens**. «Dejar mensaje» = cuidado en la ausencia. Suelo lingüístico: ${eloLingua}.

## 5. ¡Haz lo mejor!

El mejor **mensaje posible hoy** — claro, honesto, con destino.

## Estado

**Aprobada** — objeto · sentidos · señal ≠ mensaje · SMS/chat · dejar mensaje · [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ Lengua portuguesa](${lingua})${hasSinal ? ' · [▶ Señal](' + sinalHref + ')' : ''} · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wiki, hasSinal, hasGesto, hasLingua };
}

function buildMensagemPost() {
  const { body, contentEn, contentEs, wiki } = buildMensagemBodies();
  return makePalavra({
    title:
      'Inspeção: Mensagem — comunicação, SMS/chat e deixar rasto',
    titleEn:
      'Inspection: Mensagem — communication, SMS/chat and leaving a trace',
    titleEs:
      'Inspección: Mensagem — comunicación, SMS/chat y dejar rastro',
    excerpt:
      'Palavras: «mensagem» / «mensagens» (lat. *mittere* → *message*) — comunicação; era SMS/chat; «deixar mensagem»; sinal ≠ mensagem; tipografia sm,enajsos.',
    excerptEn:
      'Words: “mensagem” / “mensagens” (Lat. *mittere* → *message*) — communication; SMS/chat era; “leave a message”; signal ≠ message; typo sm,enajsos.',
    excerptEs:
      'Palabras: «mensagem» / «mensagens» (lat. *mittere* → *message*) — comunicación; era SMS/chat; «dejar mensaje»; señal ≠ mensaje; tipografía sm,enajsos.',
    slug: 'inspecao-palavra-mensagem',
    date: '2026-08-03T22:40:00.000Z',
    seriesOrder: 79,
    seriesLabel: 'Mensagem · palavra',
    coverImage: '/imagens/inspecoes/mensagem-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMensagemPost,
  buildMensagemBodies
};
