'use strict';

/**
 * Inspeção Palavras · sinal
 * Eixos: lat. signum · marca / aviso · trânsito · corpo · «dar sinal» ·
 * elos gesto · risco · verdade · Valeu !!!
 * Tipografia de entrada: «singlam» → lema canónico **sinal** (não slang).
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSinalBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/sinal';
  const wikiSignum = 'https://en.wiktionary.org/wiki/signum#Latin';

  const body = `## Escopo

Inspeção editorial da palavra **sinal** — marca, aviso, indício e mensagem que o mundo (ou o corpo) manda antes da decisão. Esta ficha cobre o **objeto** (lat. *signum*), os **sentidos** (marca · trânsito · linguagem corporal · «dar sinal» · aviso de [risco](${risco})), e o fecho [Valeu !!!](${mantra}). Tom: Inspetor BudGanja — ler o sinal com método, não inventar o mapa. Elos: [gesto](${gesto}), [risco](${risco}), [verdade](${verdade}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · sinal](${wiki}), [Wikcionário · signum (latim)](${wikiSignum}), série [Palavras](${hub}). Entrada tipográfica «singlam» → lema canónico **sinal** (português claro); não promover slang / loanword quando o vocábulo BR basta. **Ficha de palavra ≠ código de estrada nem protocolo clínico.** Sem afiliação comercial.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **sinal** (entrada tipográfica: *singlam* → corrigida para **sinal**) |
| Classe | Substantivo masculino |
| Étimo (trabalho) | Lat. *signum* («marca, signo, estandarte, indício») → PT *sinal* — confiança: alta |
| Família | *sinalizar* · *sinalização* · *sinaleiro* · *assinalar* · *designar* (vizinho) · *signo* (registo culto) |
| Cognatos | esp. *señal* · fr. *signal* / *signe* · it. *segnale* / *segno* · ing. *signal* / *sign* · lat. *signum* |
| Tipo BudGanja | Palavra — marca × aviso × comunicação × literacia |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Elo cautela | [risco](${risco}) — o sinal que pede cálculo, não pânico |
| Elo projecto | [caminho](${caminho}) · [língua portuguesa](${lingua}) · [Vida](${vida}) · [hub](${hubAll}) |
| Fonte | [Wikcionário · sinal](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que nomeia a **marca legível** — no asfalto, no corpo, no texto, no cultivo. Sinal não é o destino; é o **indício** que permite escolher o próximo [gesto](${gesto}) com [verdade](${verdade}).

## 2. Sentidos — marca · aviso · corpo · «dar sinal»

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Étimo (*signum*)** | Marca, signo, estandarte, indício | Alta |
| **Marca / indício** | Algo que aponta («há sinal de…») | Alta |
| **Trânsito / sinalização** | Semáforo, placa, seta — regra partilhada | Alta |
| **Corpo / linguagem** | Aceno, olhar, postura — sinal sem palavra | Alta (uso vivo) |
| **Aviso / alerta** | Sinal de [risco](${risco}), de falha, de progresso | Alta |
| **«Dar sinal»** | Avisar; ligar; pedir atenção; «dar o sinal» de partida | Alta (BR) |
| **Técnico / lab** | Sinal mensurável, sinalização celular (registo especial) | Média–alta (outro registo; não monografar aqui) |
| **Ofício lab** | Ler o sinal → nomear com [verdade](${verdade}) → [gesto](${gesto}) | Alta (mapa BudGanja) |

**H1:** *sinal* herda *signum* — **marca que comunica**, não ruído.  
**H2:** no lab, sinal bom = **legível e proporcional** ao [risco](${risco}); mau = alarme falso ou silêncio conveniente.  
**H3:** «dar sinal» é acto social — cruza [gesto](${gesto}) e [verdade](${verdade}).

## 3. Trânsito, corpo e aviso

O sinal vive em três arenas que o BudGanja cruza sem misturar:

| Arena | Exemplo | Bom (ofício) | Mau (falha) |
|-------|---------|--------------|-------------|
| **Trânsito** | Semáforo, placa, seta | Respeitar a regra partilhada | Ignorar o sinal e culpar o mundo |
| **Corpo** | Aceno, sobrancelha, mão | Ler o [gesto](${gesto}) com cuidado | Inventar intenções sem evidência |
| **Aviso** | Folha amarela, cheiro estranho, «algo não fecha» | Tratar como [risco](${risco}) calculável | Negar o sinal ou dramatizar sem método |
| **Convívio** | «Dá um sinal quando chegar» | Combinar e cumprir | Sumir sem rasto — quebra de [verdade](${verdade}) |

**Veredicto:** sinal no lab = **informação com responsabilidade**. Quem lê demais vê conspiração; quem lê de menos perde o [caminho](${caminho}).

## 4. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Marcar** | «Sinal de vida»; marca no mapa | Indício com [verdade](${verdade}) |
| **Avisar** | Alerta de perigo / mudança | Elo [risco](${risco}) — calcular, não congelar |
| **Orientar** | Trânsito, setas, placas | Regra partilhada — literacia colectiva |
| **Comunicar sem fala** | Linguagem corporal | [Gesto](${gesto}) legível |
| **«Dar sinal»** | Avisar / ligar / iniciar | Acto com compromisso |
| **Fechar** | Depois de ler, agir | [Valeu !!!](${mantra}) com o sinal à vista |

**Finalidade-mãe:** nomear o **sinal** para **agir com literacia** — ler a marca, medir o [risco](${risco}), escolher o [gesto](${gesto}) sem inventar o que não está lá.

## 5. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **com o sinal que há**, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Se não gostei, não era sinal» = falso · o sinal não pede aprovação emocional |
| Anti-armadilha 2 | «Tudo é sinal» = falso · sem método vira superstição |
| Par de método | [Gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) |
| Solo | [Língua portuguesa](${lingua}) · [Guia](${guia}) · [caminho](${caminho}) |

**Veredicto:** Valeu !!! **com o sinal** — ler, nomear, agir. Sinal sem [verdade](${verdade}) = ruído; sinal com ofício = mapa curto para o próximo passo.

## Hipóteses (síntese)

**H1:** objeto = lat. *signum* → PT *sinal* (marca / indício / aviso).  
**H2:** sentidos = marca · trânsito · corpo · «dar sinal» · alerta de [risco](${risco}).  
**H3:** elos = [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}).  
**H4:** fecho = [Valeu !!!](${mantra}) lendo o sinal com método (não superstição).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Gesto](${gesto}) | Acto mínimo que o sinal pede ou confirma |
| [Risco](${risco}) | O que o aviso quer proteger / calcular |
| [Verdade](${verdade}) | Nomear o indício sem pose |
| [Caminho](${caminho}) · [Língua portuguesa](${lingua}) · [Guia](${guia}) | Trajecto e solo lexical |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Finalidade viva |

## Limites

- Não é código de trânsito oficial nem manual de condução.  
- Não é diagnóstico clínico, protocolo de biomarcadores nem aconselhamento médico.  
- «Sinal» técnico (eletrónica, biologia celular) é registo vizinho — não monografado aqui.  
- Tipografia *singlam* não cria lema paralelo; o canónico é **sinal**.

## Status

**Aprovado** — **sinal** fichado: objeto (*signum*), sentidos (marca · trânsito · corpo · «dar sinal» · aviso), elos [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}); [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Gesto](${gesto}) · [▶ Risco](${risco}) · [▶ Verdade](${verdade}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **sinal** (signal / sign / mark) — mark, warning, clue and message before the next decision. Covers **object** (Lat. *signum*), **senses** (mark · traffic · body language · “dar sinal” · [risk](${risco}) alert), and [Valeu !!!](${mantra}). Typed entry “singlam” → canonical lemma **sinal**. Links: [gesto](${gesto}), [risco](${risco}), [verdade](${verdade}).

> Method note: [Wiktionary · sinal](${wiki}), [Wiktionary · signum](${wikiSignum}). Word sheet ≠ traffic code or clinical protocol.

## 1. Object

| Field | Value |
|-------|-------|
| Word | **sinal** (typed *singlam* → corrected) |
| Etymon | Lat. *signum* (mark, sign, standard, clue) → PT *sinal* |
| Lab type | Mark × warning × communication × literacy |
| Links | [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Senses

**Mark / clue** · **traffic signals** · **body language** · **warning** · BR **“dar sinal”** (to signal / call / give notice) · lab craft = read → name with [truth](${verdade}) → [gesture](${gesto}).

## 3. Traffic, body, warning

Good craft = readable, proportional to [risk](${risco}). Bad = false alarm, convenient silence, or inventing intention without evidence.

## 4. Valeu !!!

Best possible **with the signal that is there**, today — read, name, act. Signal without [truth](${verdade}) = noise; signal with craft = a short map for the next step. Anti-trap: “everything is a sign” without method = superstition.

## Status

**Approved** — object · senses · traffic/body/warning · links gesto/risco/verdade · [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Gesto](${gesto}) · [▶ Risco](${risco}) · [▶ Verdade](${verdade}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **sinal** (señal / signo / marca) — marca, aviso, indicio y mensaje antes de la decisión. Cubre **objeto** (lat. *signum*), **sentidos** (marca · tráfico · cuerpo · «dar sinal» · alerta de [risco](${risco})), y [¡Valeu !!!](${mantra}). Entrada tipográfica «singlam» → lema canónico **sinal**. Vínculos: [gesto](${gesto}), [risco](${risco}), [verdade](${verdade}).

> Nota: [Wikcionario · sinal](${wiki}), [Wikcionario · signum](${wikiSignum}). Ficha ≠ código de tráfico ni protocolo clínico.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **sinal** (escrito *singlam* → corregido) |
| Étimo | Lat. *signum* → PT *sinal* |
| Tipo lab | Marca × aviso × comunicación × literacia |
| Vínculos | [gesto](${gesto}) · [risco](${risco}) · [verdade](${verdade}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Sentidos

**Marca / indicio** · **tráfico** · **lenguaje corporal** · **aviso** · BR **«dar sinal»** · oficio = leer → nombrar con [verdad](${verdade}) → [gesto](${gesto}).

## 3. Tráfico, cuerpo, aviso

Buen oficio = legible y proporcional al [riesgo](${risco}). Malo = falsa alarma, silencio conveniente o inventar intención sin evidencia.

## 4. ¡Valeu !!!

Lo mejor posible **con la señal que hay**, hoy — leer, nombrar, actuar. Señal sin [verdad](${verdade}) = ruido; señal con oficio = mapa corto. Anti-trampa: «todo es señal» sin método = superstición.

## Estado

**Aprobada** — objeto · sentidos · tráfico/cuerpo/aviso · vínculos gesto/risco/verdade · [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Gesto](${gesto}) · [▶ Risco](${risco}) · [▶ Verdade](${verdade}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSinalPost() {
  const { body, contentEn, contentEs, wiki } = buildSinalBodies();
  return makePalavra({
    title: 'Inspeção: Sinal — marca, aviso, gesto e dar sinal',
    titleEn: 'Inspection: Sinal — mark, warning, gesture and giving a signal',
    titleEs: 'Inspección: Sinal — marca, aviso, gesto y dar señal',
    excerpt:
      'Palavras: «sinal» (lat. *signum*) — marca, trânsito, corpo, aviso e «dar sinal»; tipografia singlam → sinal; elos gesto, risco, verdade; Valeu !!!',
    excerptEn:
      'Words: “sinal” (Lat. *signum*) — mark, traffic, body, warning and “dar sinal”; typed singlam → sinal; links gesto, risco, verdade; Valeu !!!',
    excerptEs:
      'Palabras: «sinal» (lat. *signum*) — marca, tráfico, cuerpo, aviso y «dar sinal»; tipografía singlam → sinal; vínculos gesto, risco, verdade; ¡Valeu !!!',
    slug: 'inspecao-palavra-sinal',
    date: '2026-08-03T12:00:00.000Z',
    seriesOrder: 75,
    seriesLabel: 'Sinal · palavra',
    coverImage: '/imagens/inspecoes/sinal-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSinalPost,
  buildSinalBodies
};
