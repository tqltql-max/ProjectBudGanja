'use strict';

/**
 * Inspeção Expressões · «Como os ricos transformam as coisas»
 * Pedido tipográfico: «como osricostramsorandascoisas»
 * → canónica: Como os ricos transformam as coisas.
 * Elo: A História das Coisas · Annie Leonard · objetos · ofício.
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function buildComoOsRicosTransformamAsCoisasBodies() {
  const inspected = '2026-08-04';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self =
    '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const historia = '/posts/post-inspecao-arte-a-historia-das-coisas.html';
  const annie = '/posts/post-inspecao-figura-annie-leonard.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const proibicao = '/posts/post-inspecao-palavra-proibicao-proibicionismo.html';
  const oficio = '/posts/post-pesquisa-oficio-roubo-proibicao.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const fruto = '/posts/post-inspecao-palavra-fruto.html';
  const papel = '/posts/post-inspecao-palavra-papel-enrolar-tabaco.html';
  const killing = '/posts/post-inspecao-arte-killing-in-the-name.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const wikiStuff = 'https://en.wikipedia.org/wiki/The_Story_of_Stuff';

  const body = `## Escopo

Inspeção editorial da expressão **«[Como os ricos transformam as coisas](${self})»** — pedido do lab em tipografia colada **«como osricostramsorandascoisas»** → forma canónica **Como os ricos transformam as coisas**. Não é ditado popular antigo fechado: é **frase-mapa** do laboratório para inspecionar **quem muda o destino das [coisas](${objetos})** (extrair → fazer → vender → descartar) e com que poder. Elo principal: [A História das Coisas](${historia}) ([Annie Leonard](${annie})).

> **Nota metodológica:** auditoria independente BudGanja. Correção tipográfica do pedido oral/colado. Fontes de apoio: [Story of Stuff](${wikiStuff}), fichas [História das Coisas](${historia}) e [Annie Leonard](${annie}). **Ficha ≠ panfleto de ódio de classe** — inspeciona **método e poder** sobre materiais, não demoniza pessoas. Sem afiliação com Story of Stuff Project.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **Como os ricos transformam as coisas** |
| Tipografia pedida | **como osricostramsorandascoisas** |
| Forma canónica lab | **Como os ricos transformam as coisas** |
| Tipo | Expressão — frase-mapa × aviso de economia material |
| Núcleo | Poder · transformação · coisas · ciclo linear |
| Elo Artes | [A História das Coisas](${historia}) |
| Elo Pessoas | [Annie Leonard](${annie}) |
| Elo Palavras | [objetos](${objetos}) · [risco](${risco}) · [verdade](${verdade}) · [gesto](${gesto}) |
| Elo ofício | [pesquisa ofício / roubo / proibição](${oficio}) · [proibição](${proibicao}) · [Valeu !!!](${mantra}) |
| Data | ${inspected} |

## Forma e tipografia

| Forma | Nota |
|-------|------|
| **Como os ricos transformam as coisas** | Canónica lab |
| como os ricos transformam as coisas | Minúsculas — mesmo ofício |
| **como osricostramsorandascoisas** | Pedido colado — **→** canónica (espaços + *transformam*) |
| como os ricos *tramam* as coisas | Vizinha semântica («tramar» = maquinar) — **não** é a forma ficheada; se surgir, mapear como variante de suspeita |
| a história das coisas | Obra-âncora — não sinónimo exacto da frase |

**Veredicto de forma:** o lab ficheia **Como os ricos transformam as coisas**; o blob tipográfico fica como **gatilho de correcção**, não como étimo.

## Mapa de usos

| Uso | Leitura laboratorial | Bom × mau |
|-----|----------------------|-----------|
| **Pergunta de inspeção** | «Como…?» = abrir o ciclo das coisas | Bom: método · Mau: slogan vazio |
| **Poder sobre materiais** | Quem decide extrair / preço / descarte | Bom: nomear [verdade](${verdade}) · Mau: inveja sem mapa |
| **Elo História das Coisas** | Máquina linear extrair→fazer→descartar | Bom: auditar o ciclo · Mau: culpabilizar só o consumidor pobre |
| **Transformar vs cuidar** | Transformar pode ser ofício ou esmagamento | Bom: [gesto](${gesto}) com [risco](${risco}) · Mau: lucro sem conta ecológica |
| **Ofício lab** | Depois de ver o mapa — trabalhar | [Valeu !!!](${mantra}) |

**H1:** a frase é **pergunta-método** — como o poder transforma a matéria em mercadoria e lixo.  
**H2:** [A História das Coisas](${historia}) é o **manual de leitura** do ciclo; esta expressão é o **refrão oral**.  
**H3:** «ricos» aqui = **quem concentra poder sobre o fluxo das coisas**, não insulto genérico a quem tem casa.  
**H4:** fecho = [verdade](${verdade}) + [ofício](${oficio}) + [Valeu !!!](${mantra}) — sem tanque, com inspeção ([Killing in the Name](${killing}) como eco: máquina que mata no nome da ordem).

## Relação com A História das Coisas

| Etapa Leonard | «Transformar as coisas» (leitura lab) |
|---------------|--------------------------------------|
| Extração | Terra / água / trabalho viram matéria-prima |
| Produção | Matéria vira produto — custo oculto |
| Distribuição | Logística e preço — quem ganha no meio |
| Consumo | Desejo fabricado · [objetos](${objetos}) no peito |
| Descarte | Coisa vira lixo — planeta finito |
| Mudança | Outra transformação possível — circular / cuidado |

## Distinções úteis

| Par | Diferença |
|-----|-----------|
| **Transformar** vs **tramar** | Mudar a forma / destino × maquinar em segredo — a ficha ancora em **transformar** |
| **Ricos** (poder) vs **riqueza de cuidado** | Concentração de fluxo × [fruto](${fruto}) do ofício partilhado |
| **Coisas** vs **plantas / vida** | Mercadoria linear × vivo que pede [caminho](${caminho}) |
| Esta frase vs [papel × tabaco](${papel}) | Economia material ampla × genealogia de um par concreto |

## Para que serve

| Função | No mundo | No laboratório |
|--------|----------|----------------|
| **Abrir o ciclo** | Perguntar de onde veio / para onde vai | Inspeção de [objetos](${objetos}) |
| **Nomear poder** | Quem decide o preço e o lixo | [Verdade](${verdade}) sem moralismo vazio |
| **Ler Annie** | Vídeo/livro da máquina linear | [História das Coisas](${historia}) · [Annie](${annie}) |
| **Agir depois** | Recusar só consumir sem mapa | [Valeu !!!](${mantra}) · [poema](${poemMantra}) |

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [A História das Coisas](${historia}) · [Annie Leonard](${annie}) | Obra e ofício |
| [Objetos](${objetos}) · [fruto](${fruto}) · [papel × tabaco](${papel}) | Coisas nomeadas |
| [Proibição](${proibicao}) · [ofício / roubo](${oficio}) · [risco](${risco}) | Poder e aviso |
| [Killing in the Name](${killing}) | Máquina / ordem / recusa |
| [Gesto](${gesto}) · [caminho](${caminho}) · [Vida](${vida}) | Ofício de ficar e cuidar |
| [Valeu !!!](${mantra}) | Fecho |
| Hub [Expressões](${hub}) | Mapa |

## Valeu !!!

Não pedimos permissão para perguntar  
**como** as coisas são transformadas.  
Pedimos ofício: ver o ciclo,  
nomear o poder sem odiar o peito do vizinho,  
e transformar de novo —  
com cuidado, não com tanque.

**Valeu !!!** — o melhor possível **nesta inspeção das coisas**, hoje.

## Status

**Aprovado** — expressão-mapa **Como os ricos transformam as coisas** (tipografia *osricostramsorandascoisas* corrigida); elo [História das Coisas](${historia}).

[▶ História das Coisas](${historia}) · [▶ Annie Leonard](${annie}) · [▶ Objetos](${objetos}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **“How the rich transform things”** (PT **Como os ricos transformam as coisas**) — typed blob *osricostramsorandascoisas* → canonical phrase. Lab map-phrase for who reshapes the destiny of [stuff](${objetos}). Primary link: [The Story of Stuff / A História das Coisas](${historia}) ([Annie Leonard](${annie})).

> Not class hatred — method and power over materials. [Story of Stuff](${wikiStuff}).

## Thesis

Ask **how** power transforms extraction→product→waste. Leonard’s linear machine is the reading guide; this phrase is the oral refrain. Close with [Valeu !!!](${mantra}).

## Status

**Approved.**

[▶ Story of Stuff](${historia}) · [▶ Annie](${annie}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **«Cómo los ricos transforman las cosas»** (PT **Como os ricos transformam as coisas**) — tipografía *osricostramsorandascoisas* → forma canónica. Frase-mapa del lab sobre quién cambia el destino de las [cosas](${objetos}). Vínculo: [A História das Coisas](${historia}) ([Annie Leonard](${annie})).

> No es odio de clase — método y poder sobre materiales.

## Tesis

Preguntar **cómo** el poder transforma extracción→producto→basura. El ciclo de Leonard es la guía; esta frase es el estribillo. Cierre [¡Valeu !!!](${mantra}).

## Estado

**Aprobada.**

[▶ Historia de las cosas](${historia}) · [▶ Annie](${annie}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildComoOsRicosTransformamAsCoisasPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildComoOsRicosTransformamAsCoisasBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 13;
  return expressaoPost({
    title:
      'Inspeção: Como os ricos transformam as coisas — poder, ciclo e História das Coisas',
    titleEn:
      'Inspection: How the rich transform things — power, cycle, and Story of Stuff',
    titleEs:
      'Inspección: Cómo los ricos transforman las cosas — poder, ciclo e Historia de las cosas',
    excerpt:
      'Expressões: «Como os ricos transformam as coisas» (tipografia osricostramsorandascoisas) — mapa do poder sobre o ciclo das coisas; elo Annie Leonard.',
    excerptEn:
      'Expressions: “How the rich transform things” — map of power over the stuff cycle; link Annie Leonard.',
    excerptEs:
      'Expresiones: «Cómo los ricos transforman las cosas» — mapa del poder sobre el ciclo; vínculo Annie Leonard.',
    slug: 'inspecao-expressao-como-os-ricos-transformam-as-coisas',
    date: '2026-08-04T23:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Como os ricos transformam as coisas · Expressão',
    coverImage: '/imagens/inspecoes/como-os-ricos-transformam-as-coisas-cover.jpg',
    sourceUrl: '/posts/post-inspecao-arte-a-historia-das-coisas.html',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildComoOsRicosTransformamAsCoisasPost,
  buildComoOsRicosTransformamAsCoisasBodies
};
