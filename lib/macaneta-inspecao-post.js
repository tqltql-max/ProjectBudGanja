'use strict';

/**
 * Inspeção Palavras · maçaneta (+ cruzamento)
 * Relação: gesto torcer/abrir × mãos E/D × porta/janela ×
 * ligar/desligar luz/energia (interruptor) · Valeu !!!
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildMacanetaBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const maos = '/posts/post-inspecao-palavra-mao-esquerda-direita.html';
  const esquerdo = '/posts/post-inspecao-palavra-esquerdo.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/ma%C3%A7aneta';
  const wikiPorta = 'https://pt.wiktionary.org/wiki/porta';
  const wikiJanela = 'https://pt.wiktionary.org/wiki/janela';

  const body = `## Escopo

Inspeção editorial da palavra **maçaneta** — e do **cruzamento de ofício** pedido ao laboratório: **gesto de torcer e abrir** × **mão esquerda / mão direita** × **porta e janela** × **[ligar / desligar](${ligar}) a luz e a energia**. A maçaneta é o **ponto onde a mão pousa** na [porta](${wikiPorta}) (e, por extensão, em fechos de [janela](${wikiJanela})); o [interruptor](${interruptor}) é o ponto irmão na parede da luz. Esta ficha nomeia o utensílio e **mapeia a relação** com [gesto](${gesto}), [mãos](${maos}) e o par [ligar × desligar](${ligar}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · maçaneta](${wiki}), [porta](${wikiPorta}), [janela](${wikiJanela}), fichas [gesto](${gesto}), [mão E/D](${maos}), [interruptor](${interruptor}), [ligar × desligar](${ligar}). **Ficha ≠ manual de serralharia nem de electricidade.** Tom: Inspetor BudGanja — torcer/abrir/ligar/desligar são [gestos](${gesto}) com ofício e [risco](${risco}).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **maçaneta** |
| Classe | Substantivo feminino |
| Étimo (trabalho) | De *maçã* + *-eta* (diminutivo) — puxador/fecho em forma (ou memória) de maçã; via romance — confiança: **média–alta** (forma PT viva; detalhe iconográfico varia) |
| Famílias vizinhas | *puxador* · *fechadura* · *trinco* · *fechadura* · *botão* (janela) · *manivela* |
| Tipo BudGanja | Palavra — utensílio do **abrir/fechar** × cruzamento com mãos e luz |
| Elo gesto | [gesto](${gesto}) — torcer · puxar · empurrar · abrir · fechar |
| Elo mãos | [mão esquerda × direita](${maos}) · [esquerdo](${esquerdo}) |
| Elo vão | **porta** · **janela** (esta ficha) |
| Elo energia | [interruptor](${interruptor}) · [ligar × desligar](${ligar}) · [eletrizante](${eletrizante}) · [sinal](${sinal}) |
| Elo ofício | [caminho](${caminho}) · [passar](${passar}) · [verdade](${verdade}) · [risco](${risco}) · [objetos](${objetos}) |
| Fonte | [maçaneta](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** a peça que a mão **torce ou empurra** para abrir/fechar a porta (e afins). Sem maçaneta, a porta pede outro ofício (chave, trinco, força); com maçaneta, o [gesto](${gesto}) fica **mínimo e repetível** — como o clique no [interruptor](${interruptor}).

## 2. Hipóteses do cruzamento

**H1:** **torcer** e **abrir** são gestos-irmãos: a maçaneta pede rotação (ou pressão) → o vão responde (porta/janela).  
**H2:** [mão esquerda](${maos}) e [mão direita](${maos}) são **complementares** no mesmo ofício — uma estabiliza, a outra executa (ou o inverso, conforme domínio).  
**H3:** **porta** = passar de um espaço a outro ([caminho](${caminho}) / [passar](${passar})); **janela** = abrir ao ar/luz sem necessariamente sair.  
**H4:** **maçaneta** (vão) e **[interruptor](${interruptor})** (luz/energia) são **pontos de contacto** da mão com o ambiente — um abre espaço; o outro abre circuito.  
**H5:** [ligar × desligar](${ligar}) é o verbo do circuito; torcer/abrir é o verbo do vão — ambos fecham com [Valeu !!!](${mantra}).

## 3. Mapa — gesto × utensílio × vão × energia

| Gesto da mão | Utensílio | Vão / fluxo | Leitura BudGanja |
|--------------|-----------|-------------|------------------|
| **Torcer** | Maçaneta (rotação) | Porta / algumas janelas | Rodar o fecho — ofício de abrir sem arrombar |
| **Puxar / empurrar** | Maçaneta / puxador | Porta | Depois do torcer (ou em vez dele) — [passar](${passar}) |
| **Abrir** | Maçaneta + folha | Porta / janela | Resultado do gesto — espaço ou ar |
| **Fechar** | Maçaneta + folha | Porta / janela | Contenção — [risco](${risco}) de corrente/segurança |
| **Clicar / baixar** | [Interruptor](${interruptor}) | Luz / energia | [Ligar](${ligar}) ou [desligar](${ligar}) o circuito |
| **Esquerda × direita** | Qualquer dos dois | Qualquer | [Mãos](${maos}) — complementaridade, sem moral «sinistra» |

## 4. Porta × janela

| Vão | Ofício | Elo |
|-----|--------|-----|
| **Porta** | Entrar / sair / [passar](${passar}) de quarto | [Caminho](${caminho}) — limiar |
| **Janela** | Ventilar / ver / deixar luz solar | Luz natural × luz eléctrica ([ligar](${ligar})) |
| **Maçaneta da porta** | Torcer + abrir o limiar | Gesto social («bate à porta») |
| **Fecho / botão da janela** | Abrir ao ar sem atravessar | Menos «passar», mais «respirar» |

**Tese:** a mesma [mão](${maos}) serve os dois vãos; a **intenção** muda — atravessar (porta) ou aerar/ver (janela).

## 5. Maçaneta × interruptor — irmãos de parede

| | Maçaneta | Interruptor |
|-|----------|-------------|
| **Onde** | Porta / janela | Parede / aparelho |
| **Gesto típico** | Torcer / puxar | Clicar / baixar / rodar (dimmer) |
| **Fluxo** | Espaço (pessoas, ar) | Energia ([eletrizante](${eletrizante}) / luz) |
| **Verbo** | Abrir / fechar | [Ligar](${ligar}) / [desligar](${ligar}) |
| **Sinal** | «Está aberto» | Luz acesa / apagada ([sinal](${sinal})) |
| **Risco** | Dedo / porta na mão / corrente de ar | Choque / [fogo](${fogo}) eléctrico / deixar ligado |

**Par lab:** sem maçaneta o vão pede força bruta; sem [interruptor](${interruptor}) a luz pede outro corte. Ambos pedem [gesto](${gesto}) com [verdade](${verdade}) — saber o que se abre e o que se deixa aberto.

## 6. Mão esquerda × mão direita no ofício

| Situação | Leitura típica de oficina | Aviso |
|----------|---------------------------|-------|
| Abrir porta com a dominante | Execução do torcer | Dominância ≠ moral |
| Outra mão no batente / sacola | Estabilizar ([mãos](${maos})) | Complementaridade |
| Interruptor alto / baixo | Qualquer mão que alcance | Altura e [risco](${risco}) |
| Escuro + maçaneta | Tato antes da vista | [Sinal](${sinal}) tátil |

> Atribuição «esquerda estabiliza / direita executa» é **metáfora de oficina**, não regra — quem é canhoto inverte sem perder ofício ([mão E/D](${maos})).

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Gesto](${gesto}) | Torcer · abrir · fechar · clicar |
| [Mão E/D](${maos}) · [esquerdo](${esquerdo}) | Quem executa o gesto |
| [Interruptor](${interruptor}) · [ligar × desligar](${ligar}) | Luz / energia |
| [Sinal](${sinal}) · [eletrizante](${eletrizante}) · [fogo](${fogo}) | Circuito e aviso |
| [Caminho](${caminho}) · [passar](${passar}) | Porta como limiar |
| [Objetos](${objetos}) · [risco](${risco}) · [verdade](${verdade}) | Peça · dano · crédito do acto |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) | Fecho |

## 8. Valeu !!!

Não pedimos permissão para abrir a porta.  
Pedimos ofício: torcer sem arrombar,  
[ligar](${ligar}) a luz quando o peito pede clareza,  
[desligar](${ligar}) quando o [risco](${risco}) pede corte,  
e saber qual [mão](${maos}) segura o quê.

**Valeu !!!** — o melhor possível **neste limiar e neste circuito**, hoje.

## 9. Status

**Aprovado** — **maçaneta** fichada + cruzamento **gesto (torcer/abrir) × mãos E/D × porta/janela × ligar/desligar luz/energia**.

[▶ Gesto](${gesto}) · [▶ Mãos](${maos}) · [▶ Interruptor](${interruptor}) · [▶ Ligar × desligar](${ligar}) · [▶ Valeu !!!](${mantra}) · [▶ Palavras](${hub})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **maçaneta** (doorknob / handle) and the **craft crossing**: **twist / open gesture** × **left / right hand** × **door / window** × **[ligar / desligar](${ligar}) light and energy**. Links [gesto](${gesto}), [mãos](${maos}), [interruptor](${interruptor}).

> Method note: [Wiktionary · maçaneta](${wiki}). Not a locksmith or electrical manual.

## Map

| Gesture | Tool | Opening / flow |
|---------|------|----------------|
| Twist / pull | Maçaneta | Door / window |
| Click | [Interruptor](${interruptor}) | Light / energy ([ligar](${ligar})) |
| Left × right | Both tools | [Mãos](${maos}) — complementarity |

**Door** = threshold ([passar](${passar})). **Window** = air / view without necessarily leaving. **Maçaneta** and **switch** are sibling contact points for the hand.

## Status

**Approved** — knob + crossing map.

[▶ Gesture](${gesto}) · [▶ Hands](${maos}) · [▶ Switch](${interruptor}) · [▶ On/off](${ligar}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **maçaneta** (pomo / manilla) y el **cruce de oficio**: **gesto de torcer / abrir** × **mano izquierda / derecha** × **puerta / ventana** × **[ligar / desligar](${ligar}) luz y energía**. Vínculos [gesto](${gesto}), [mãos](${maos}), [interruptor](${interruptor}).

> Nota: [Wikcionario · maçaneta](${wiki}). No es manual de cerrajería ni eléctrico.

## Mapa

| Gesto | Utensilio | Vano / flujo |
|-------|-----------|--------------|
| Torcer / tirar | Maçaneta | Puerta / ventana |
| Clic | [Interruptor](${interruptor}) | Luz / energía ([ligar](${ligar})) |
| Izquierda × derecha | Ambos | [Mãos](${maos}) — complementariedad |

**Puerta** = umbral ([passar](${passar})). **Ventana** = aire / vista. **Maçaneta** e **interruptor** son puntos hermanos de la mano.

## Estado

**Aprobada** — manilla + mapa de cruce.

[▶ Gesto](${gesto}) · [▶ Manos](${maos}) · [▶ Interruptor](${interruptor}) · [▶ Ligar/desligar](${ligar}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildMacanetaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMacanetaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 115;
  return makePalavra({
    title:
      'Inspeção: Maçaneta — torcer, abrir, mãos, porta/janela e ligar a luz',
    titleEn:
      'Inspection: Maçaneta — twist, open, hands, door/window, and switching light',
    titleEs:
      'Inspección: Maçaneta — torcer, abrir, manos, puerta/ventana y encender la luz',
    excerpt:
      'Palavras: maçaneta — gesto torcer/abrir × mão E/D × porta/janela × ligar/desligar luz; elos gesto, interruptor; Valeu !!!',
    excerptEn:
      'Words: maçaneta — twist/open × hands × door/window × on/off light; links gesto, interruptor; Valeu !!!',
    excerptEs:
      'Palabras: maçaneta — torcer/abrir × manos × puerta/ventana × ligar/desligar luz; vínculos gesto, interruptor; ¡Valeu !!!',
    slug: 'inspecao-palavra-macaneta',
    date: '2026-08-04T21:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Maçaneta · palavra',
    coverImage: '/imagens/inspecoes/macaneta-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMacanetaPost,
  buildMacanetaBodies
};
