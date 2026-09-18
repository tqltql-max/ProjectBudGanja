'use strict';

/**
 * Inspeção Expressões · «Virou carne de vaca»
 * Sentido da boca: ficou comum pra nós — o especial virou o de todo o dia.
 * Eco no lab (segunda mesa): animal → corte → prateleira.
 * Consumido por scripts/upsert-expressao-virou-carne-de-vaca.js
 */

const { expressaoPost } = require('./expressoes-ditados-inspecoes-posts.js');

function ytLink(id, title) {
  const safe = String(title || id)
    .replace(/\|/g, '/')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')');
  return `[${safe}](https://www.youtube.com/watch?v=${id})`;
}

function buildVirouCarneDeVacaBodies() {
  const inspected = '2026-09-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-expressoes';
  const self = '/posts/post-inspecao-expressao-virou-carne-de-vaca.html';
  const vaca = '/animais/vaca/';
  const vacaInsp = '/posts/post-inspecao-animal-vaca.html';
  const vacaDeriv = '/posts/post-inspecao-derivado-vaca.html';
  const galinha = '/animais/galinha/';
  const galinhaDeriv = '/posts/post-inspecao-derivado-galinha.html';
  const porco = '/animais/porco/';
  const porcoDeriv = '/posts/post-inspecao-derivado-porco.html';
  const peixe = '/animais/peixe-tilapia/';
  const peixeDeriv = '/posts/post-inspecao-derivado-peixe.html';
  const caseina = '/posts/post-inspecao-derivado-caseina.html';
  const leite = '/posts/post-inspecao-derivado-leite.html';
  const gluten = '/posts/post-inspecao-derivado-gluten.html';
  const cana = '/posts/post-inspecao-derivado-cana-de-acucar.html';
  const chocolate = '/posts/post-inspecao-derivado-chocolate.html';
  const ricos = '/posts/post-inspecao-expressao-como-os-ricos-transformam-as-coisas.html';
  const hall = '/posts/post-inspecao-artigo-hall-ultraprocessados-2019.html';
  const artWho = '/posts/post-inspecao-artigo-oms-acucares-livres-2015.html';
  const animalPal = '/posts/post-inspecao-palavra-animal.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const rasmussen = '/posts/post-inspecao-canal-richard-rasmussen.html';
  const davis = '/posts/post-inspecao-figura-william-davis.html';
  const lair = '/posts/post-inspecao-divulgacao-lair-ribeiro.html';
  const analise = '/posts/post-inspecao-derivado-analise-danos-videos.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const videosHub = '/videos/';
  const videosRas = '/videos/?channel=rasmussen';
  const videosDavis = '/videos/?channel=davis';
  const videosMundo = '/videos/?channel=manualdomundo';
  const iarc = 'https://doi.org/10.1016/S1470-2045(15)00444-1';

  const vRasQuanto = 'To_7Gmj4_EE';
  const vRasSempre = 'cIjBop1jaZE';
  const vRasWagyu = 'BZLQarCXynM';
  const vRasGrama = '0y1dNwtlq1g';
  const vRasFrango = 'PqQXSSOuzRE';
  const vDavisBacon = 'GCI2QjUtkAw';
  const vDavisBaconQ = '0byPl1mpnQQ';
  const vDavisVeg = 'rak2zSL8zsc';

  const body = `## Escopo

Inspeção editorial da expressão **«[virou carne de vaca](${self})»**. O sentido da boca é este: **ficou comum pra nós**. A [carne de vaca](${vaca}) é o prato do dia na mesa brasileira — o default, o que já não espanta. Por isso a locução funciona: quando algo **deixa de ser especial** e passa a ser **o de todo o mundo**, a boca diz que **virou carne de vaca**. Não é insulto ao [animal](${animalPal}). Não é, na fala, uma frase de abate. É a **medida do ordinário**.

O laboratório **ouve primeiro a boca**. Só depois abre uma segunda mesa — o eco literal: a [vaca / boi](${vaca}) (*Bos taurus*) também **vira corte**, e o corte **pode virar prateleira**. Essa leitura não substitui o ditado. Humanos **podem** comer carne; não há um **devem** único. O mal à saúde discute-se em **dose, matriz e fábrica**, noutro eixo.

> **Nota metodológica:** auditoria independente BudGanja. **Não é aconselhamento médico nem nutricional.** O animal **não** é vilão. Indexar Rasmussen/Davis/Lair **≠** endossar cada claim. Sem protocolo de abate, sem receita de embutido, sem dieta prescrita. Conteúdo educacional.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Expressão | **Virou carne de vaca** |
| Tipo | Expressão — ditado BR: o especial virou o comum pra nós |
| Literal (eco) | [Vaca](${vaca}) (*Bos taurus*) → carne de ofício ou de fábrica |
| Núcleo | Virar · comum · mesa · caro/carnis · vacca |
| Elos animais | [Vaca](${vaca}) · [galinha](${galinha}) · [porco](${porco}) · [tilápia](${peixe}) |
| Elos derivados | [Vaca](${vacaDeriv}) · [galinha](${galinhaDeriv}) · [porco](${porcoDeriv}) · [peixe](${peixeDeriv}) |
| Elo irmão (leite no mesmo animal) | [Caseína — a cola do leite](${caseina}) |
| Elo poder | [Como os ricos transformam as coisas](${ricos}) |
| Data | ${inspected} |

## Etimologia — três palavras, um virar

| Palavra | Étimo | Leitura BudGanja |
|---------|-------|------------------|
| **Virou** | Port. *virar* — voltar, mudar de estado (latim tardio *virare*) | O instante em que **deixa de ser especial** |
| **Carne** | Latim *caro, carnis* — polpa, corpo | No ditado: o alimento **de todo o dia**, não o corte de festa |
| **Vaca** | Latim *vacca* | A medida do comum na mesa BR — o bife que já é **nosso** |

No Brasil a carne de vaca é o **default** da mesa. Por isso a locução funciona: **virar carne de vaca** = **ficar comum pra nós**, tão ordinário quanto o bife do dia. O laboratório **não** usa a frase para insultar o animal nem para trocar o ditado por uma inspeção de esteira. O salto de categoria (vivo → ofício → fábrica) é **eco**, não o sentido da boca.

## Mapa de usos

| Uso | O que a boca diz | Leitura laboratorial |
|-----|------------------|----------------------|
| **Sentido da boca (o ditado)** | «Isso virou carne de vaca» — **ficou comum pra nós** | Especial → ordinário. A carne de vaca é a **régua** do comum |
| **Literal alimentar** | O boi / a vaca **viram** carne | [Ficha da vaca](${vaca}) · inspeção do animal [${vacaInsp}](${vacaInsp}) |
| **Eco de fábrica** | O corte vira embutido, nugget, hambúrguer de esteira | [Derivados da vaca](${vacaDeriv}) · [Hall 2019](${hall}) — **segunda mesa**, não a boca |
| **Fazer carne** (vizinha) | Espancar, destruir alguém | **Outra** locução — violência, não prato. Não colapsar |
| **Eslogans** | «Carne mata» / «tem de comer carne» | Os dois apagam ofício, dose e pessoa |

**H1:** o sentido da expressão é **comum pra nós** — o que já não é raro, o que já é de todo o dia.  
**H2:** a vaca entra como **metáfora do default** da mesa BR, não como vilã.  
**H3:** humanos são **omnívoros facultativos**: podem comer carne; podem viver sem ela (com planeamento; B12 de fora, na prática). Nenhuma das duas é lei da natureza.  
**H4:** o dano populacional mais firme está na **carne processada** (cura industrial, nitritos, embutido de prateleira), não no animal em si.  
**H5:** ética e ecologia são **eixos à parte** da saúde. [Ricos transformam as coisas](${ricos}) descreve **quem** empacota; esta frase descreve o **efeito na boca**: virou comum.

## Eco no laboratório — do animal à mercadoria

| Etapa | O que acontece | Risco editorial | Ficha |
|-------|----------------|-----------------|-------|
| Animal vivo | Criação, pasto, granja, rio | Baixo como **ser** — [animal](${animalPal}) | [Vaca](${vaca}) · [galinha](${galinha}) · [porco](${porco}) |
| Corte de ofício | Fresco, assado, cozido, charcutaria de mão | Dose e contexto | Esta expressão (literal) |
| Processamento | Moagem, cura, sal, fumo | Intermediário | [Porco](${porcoDeriv}) |
| Ultraprocessado | Nugget, salsicha industrial, empanado, hambúrguer de esteira | Elevado | [Vaca](${vacaDeriv}) · [galinha](${galinhaDeriv}) · [peixe](${peixeDeriv}) |
| Snack da mesma gôndola | Pão + carne + [açúcar](${cana}) + [farinha](${gluten}) | Rede | [Chocolate](${chocolate}) · [Hall](${hall}) |

Quem [transforma a prateleira](${ricos}) não inventa o boi: **abate em escala**, **emulsiona**, **cura com química de fábrica** e **vende o nome do animal** no rótulo curto.

## Quatro eixos (o mal à saúde, com método)

O «mal da carne» funde o animal, o corte, o nitrito e o snack. O laboratório **desfunde**.

| Eixo | Onde vive | Conduta editorial |
|------|-----------|-------------------|
| **Omnívoro facultativo** | Biologia e história da alimentação | Podem; não devem-por-decreto. B12, ferro heme, proteína — e o inverso planeado |
| **Carne vermelha não processada** | Bife, cozido, assado | IARC grupo **2A** (provavelmente cancerígena) — risco **relativo**, não sentença individual. Dose. |
| **Carne processada** | Embutido industrial, bacon de fábrica, fiambre, salsicha de lista longa | IARC grupo **1** (cancerígena para humanos) — evidência de associação populacional. [Bouvard et al., *Lancet Oncol* 2015](${iarc}) |
| **Matriz ultraprocessada** | Nugget, empanado, hambúrguer de esteira + pão + molho doce | [Hall 2019](${hall}) · [açúcar](${cana}) · [glúten](${gluten}) |
| **Ética / ecologia** | Confinamento, desmatamento, sofrimento | Eixo **à parte**. Recusar carne por aqui é coerente — não prova que o omnívoro «errou» a biologia |

**Leitura:** o ditado **não** descreve esta tabela. A tabela é o **eco** — o que o laboratório inspeciona *depois* de ouvir a boca. Na fala, **virou carne de vaca** = **ficou comum pra nós**. Na esteira, o nome do animal ainda está no pacote, mas o ofício já saiu.

## A armadilha dos dois slogans

| Slogan | O que esconde |
|--------|----------------|
| «Carne é veneno» | O corte de ofício, a cultura, a pessoa, a diferença processada × fresca |
| «Tem de comer carne» | Quem não come, quem não pode, o ultraprocessado vendido como «proteína» |
| «Bacon is a health food» | Marketing inverso — [Davis](${davis}) no acervo **não** é protocolo |
| «Wagyu salva» | Nobreza de raça ≠ ausência de dose · Rasmussen mostra o ofício, não o milagre |

## Universo de vídeos — todos os canais do projecto

O hub [Vídeos](${videosHub}) catalogava **9.798** vídeos únicos. A locução **«virou carne de vaca»** **não aparece em nenhum título**. O acervo fala **carne** como quinta, receita, bacon e pergunta de dose — nunca como ditado.

| Canal | Vídeos no hub | Sinal «carne / meat / bacon / gado» | Papel nesta ficha |
|-------|---------------|--------------------------------------|-------------------|
| [Richard Rasmussen](${rasmussen}) | **1.851** | **Dezenas** — «quanto temos de comer de carne?», «sempre foi o alimento», Wagyu, capim, frango | Origem, ofício, a pergunta da expressão |
| [William Davis, MD](${davis}) | **476** | **3** âncoras: *Eat More Bacon*, *Bacon: is it really unhealthy?*, dieta vegetariana × coração | Discurso inverso + contraponto |
| Manual do Mundo | **2.401** | Receita de hambúrguer, «abacaxi amacia carne», espetos | Ofício de bancada / ruído de palito |
| [Dr. Lair Ribeiro](${lair}) | **888** | **Quase 0** no título (fígado de galinha, peixe) | **Ausência**: Lair fala leite/glúten/açúcar, quase nunca «carne» |
| Slivki | **416** | Salsicha / galinha-experiência | Fora do eixo de dano |
| Amyr Klink | **189** | 1 falso (*Canal do Boi*) | Ruído |
| Zangado, Paulinho, MovReCam, Klink, CANABinALL, Disney, Inspetor | ~3.577 | **0** | Ausência documentada |
| **Total** | **9.798** | **0** títulos com o **ditado**; carne como **comida/quinta** no Rasmussen | |

**Achado:** o hub **não tem série «carne»**. Tem quinta (Rasmussen), bacon (Davis) e silêncio (Lair + jogos + UNIFESP). Esta expressão junta o mapa. Análise-mãe: [danos × vídeos](${analise}).

## Vídeos âncora (verificáveis)

@youtube ${vRasQuanto}

@youtube ${vRasSempre}

@youtube ${vDavisBaconQ}

| Eixo | Título | Onde |
|------|--------|------|
| Rasmussen · a pergunta | O QUANTO TEMOS QUE COMER DE CARNE? | ${ytLink(vRasQuanto, 'O QUANTO TEMOS QUE COMER DE CARNE?')} |
| Rasmussen · história | A CARNE SEMPRE FOI O NOSSO ALIMENTO MAIS IMPORTANTE | ${ytLink(vRasSempre, 'A CARNE SEMPRE FOI O NOSSO ALIMENTO MAIS IMPORTANTE')} |
| Rasmussen · ofício / raça | O segredo da carne mais nobre: Wagyu e Angus | ${ytLink(vRasWagyu, 'Wagyu e Angus')} |
| Rasmussen · pasto | O capim que move a pecuária | ${ytLink(vRasGrama, 'O capim que move a pecuária')} |
| Rasmussen · frango × carne | The secret behind your chicken and meat | ${ytLink(vRasFrango, 'The secret behind your chicken and meat')} |
| Davis · slogan | Eat More Bacon | ${ytLink(vDavisBacon, 'Eat More Bacon')} |
| Davis · a pergunta | Bacon: Is it REALLY unhealthy? | ${ytLink(vDavisBaconQ, 'Bacon: Is it REALLY unhealthy?')} |
| Davis · contraponto | Does a vegetarian diet reverse heart disease? | ${ytLink(vDavisVeg, 'Does a vegetarian diet reverse heart disease?')} |

Indexar ≠ endossar. Rasmussen pergunta a **dose** e mostra a **quinta**. Davis joga o **bacon** contra o senso comum — literacia de discurso, não receita. Lair, neste acervo, **não** carrega o eixo.

[${videosRas}](${videosRas}) · [${videosDavis}](${videosDavis}) · [${videosMundo}](${videosMundo})

## Distinções úteis

| Par | Diferença |
|-----|-----------|
| **Vaca** vs **carne de vaca** | O animal do catálogo × a régua do comum na mesa |
| **Corte de ofício** vs **embutido de esteira** | Mão e fogo × lista longa, nitrito, amido |
| **Carne vermelha** vs **processada** | IARC 2A × IARC 1 — não são o mesmo aviso |
| **Leite / caseína** vs **carne** | Mesmo animal, **outro** derivado — [caseína](${caseina}) |
| **Esta frase** vs **fazer carne** | Ficou comum pra nós × violência física |
| **Sentido da boca** vs **eco do lab** | Ordinário na mesa × animal que vira corte e prateleira |
| **Recusar por ética** vs **proibir por saúde** | Eixos distintos; o lab não funde |

## O que observar nos rótulos (eco — não é o ditado)

Na boca, **já virou** = já é comum pra nós. Na gôndola, o laboratório ainda olha isto:

- o nome do animal na frente e a lista de aditivos atrás = já **virou**;
- nitritos/nitratos, xarope, amido modificado, «proteína» sem corte;
- nugget / empanado / salsicha de supermercado ≠ linguiça de ofício;
- pão + carne + molho doce = rede [glúten](${gluten}) + [açúcar](${cana});
- «angus», «wagyu», «grass-fed» no rótulo **não** apagam ultraprocessamento.

## Cruzamento — fichas do laboratório

| Elo | Ficha |
|-----|-------|
| Animal | [Vaca / boi](${vaca}) · [inspeção do animal](${vacaInsp}) |
| Derivado bovino (carne + laticínio genérico) | [Derivados da vaca](${vacaDeriv}) |
| Ave / suíno / peixe | [Galinha](${galinhaDeriv}) · [Porco](${porcoDeriv}) · [Peixe](${peixeDeriv}) |
| Leite no mesmo animal | [Leite e derivados](${leite}) · [Caseína](${caseina}) |
| A outra cola da prateleira | [Glúten](${gluten}) |
| Quem transforma | [Como os ricos transformam as coisas](${ricos}) |
| Ultraprocessados | [Hall 2019](${hall}) |
| Açúcar no molho / snack | [Cana](${cana}) · [OMS 2015](${artWho}) |
| Palavra | [Animal](${animalPal}) · [risco](${risco}) |
| Vídeos | [Rasmussen](${rasmussen}) · [Davis](${davis}) · [Análise × vídeos](${analise}) |
| IARC 2015 | [Bouvard et al., *Lancet Oncol*](${iarc}) |

## Síntese

O ditado **virou carne de vaca** nomeia o momento em que algo **fica comum pra nós** — tão ordinário quanto o bife do dia. A vaca é a **régua**, não a vilã. Humanos **podem** comer carne. O eco literal (animal → corte → fábrica) fica na segunda mesa: a evidência mais firme de dano **populacional** está no **processado** e na **matriz ultraprocessada**. Ética à parte. Sem dieta prescrita.

## Faça o melhor!

Não pedimos permissão para nomear  
**quando** o especial virou o de todo o dia.  
Pedimos ofício: ouvir a boca,  
ver a mesa,  
e só depois o pacote —  
sem odiar o prato do vizinho  
e sem fingir que o raro ainda é raro.

**[Faça o melhor!](${mantra})** — o melhor possível **nesta inspeção do comum**, hoje.

## Status

| Campo | Valor |
|-------|-------|
| Status | Publicado — Expressões · virou carne de vaca × 9.798 vídeos |
| Veredicto editorial | Sentido da boca: **ficou comum pra nós**. Eco no lab: omnívoro facultativo; IARC 1 no processado; 2A no vermelho não processado; ética à parte. |
| Vídeos | 0 títulos com o ditado · Rasmussen (quinta + «quanto comer») · Davis (bacon + vegetariano) · Lair quase silêncio |

## Hub

[Expressões](${hub}) · [Vaca](${vaca}) · [Leite e derivados](${leite}) · [Derivados da vaca](${vacaDeriv}) · [Rasmussen](${rasmussen}) · [Ricos transformam](${ricos}) · [Caseína](${caseina}) · [Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the Brazilian saying **“virou carne de vaca”**. What the mouth means: **it became ordinary for us**. Beef is the everyday plate in Brazil — the default. When something **stops being special** and turns into **everybody’s thing**, the mouth says it **turned into cow meat**. That is not an insult to the [animal](${animalPal}), and it is not, in speech, a slaughter phrase.

The lab **hears the mouth first**. Only then does it open a second table: the [cow](${vaca}) also becomes a cut, and the cut may become a shelf. That echo does not replace the saying.

> **Method note:** independent BudGanja audit. **Not medical advice.** The animal is not a villain. Humans **can** eat meat; there is no single species-wide **must**. Indexing Rasmussen/Davis ≠ endorsement. No slaughter protocol, no cured-meat recipe, no prescribed diet.

## What the mouth says

| Use | Lab reading |
|-----|-------------|
| The saying | **Became common for us** — as ordinary as everyday beef |
| Literal | [Cattle](${vaca}) → meat |
| Factory echo | Nugget, industrial sausage, belt burger — [cattle derivatives](${vacaDeriv}) |
| Neighbour «fazer carne» | To beat someone up — **another** locution |

## Health axes (limits)

| Axis | Reading |
|------|---------|
| Facultative omnivore | Possible with or without meat (B12 from elsewhere if without) |
| Unprocessed red meat | IARC **2A** — relative risk, dose |
| Processed meat | IARC **1** — [Bouvard 2015](${iarc}) |
| Ultra-processed matrix | [Hall 2019](${hall}) · [sugar](${cana}) · [gluten](${gluten}) |
| Ethics / ecology | Separate axis |

## All project videos (9,798)

**Zero** titles carry the **saying**. Rasmussen asks **how much meat** and shows the farm. Davis plays **bacon** against common sense. Lair is almost **silent** on meat (his bucket is milk/gluten/sugar). Gaming and UNIFESP channels: absence.

@youtube ${vRasQuanto}

@youtube ${vRasSempre}

@youtube ${vDavisBaconQ}

## Status

**Published** — Sayings · *virou carne de vaca* (health × 9,798 videos). No prescribed diet.

[Sayings](${hub}) · [Cattle](${vaca}) · [Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del dicho brasileño **«virou carne de vaca»**. Lo que dice la boca: **se volvió común para nosotros**. La carne de vaca es el plato del día en Brasil — el default. Cuando algo **deja de ser especial** y pasa a ser **de todo el mundo**, la boca dice que **se volvió carne de vaca**. No es insulto al [animal](${animalPal}) ni, en el habla, una frase de faena.

El laboratorio **oye la boca primero**. Solo después abre una segunda mesa: la [vaca](${vaca}) también vira corte, y el corte puede virar estante. Ese eco no sustituye el dicho.

> **Nota metodológica:** auditoría independiente. **No es consejo médico.** El animal no es villano. Los humanos **pueden** comer carne; no hay un **deben** único. Sin protocolo de faena ni dieta prescrita.

## Usos

| Uso | Lectura |
|-----|---------|
| El dicho | **Se volvió común para nosotros** — tan ordinario como el bife del día |
| Literal | [Vaca](${vaca}) → carne |
| Eco de fábrica | Nugget, embutido industrial — [derivados](${vacaDeriv}) |

## Ejes de salud

Omnívoro facultativo. Carne roja no procesada: IARC **2A**. Procesada: IARC **1** ([Bouvard 2015](${iarc})). Matriz ultraprocesada: [Hall 2019](${hall}). Ética aparte.

## Vídeos (9.798)

**Cero** títulos con el **dicho**. Rasmussen pregunta la dosis. Davis habla de bacon. Lair casi calla.

@youtube ${vRasQuanto}

@youtube ${vRasSempre}

@youtube ${vDavisBaconQ}

## Estado

**Publicada** — Expresiones · *virou carne de vaca* (salud × 9.798 vídeos). Sin dieta prescrita.

[Expresiones](${hub}) · [Vaca](${vaca}) · [¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildVirouCarneDeVacaPost(seriesOrder) {
  const { body, contentEn, contentEs } = buildVirouCarneDeVacaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 1;
  return expressaoPost({
    title: 'Inspeção: Virou carne de vaca — ficou comum pra nós',
    titleEn: 'Inspection: Virou carne de vaca — it became ordinary for us',
    titleEs: 'Inspección: Virou carne de vaca — se volvió común para nosotros',
    excerpt:
      'Expressão BR: ficou comum pra nós — tão ordinário quanto o bife do dia. A vaca é a régua, não a vilã. Eco no lab: ofício × fábrica. Não é dieta prescrita.',
    excerptEn:
      'Brazilian saying: it became ordinary for us — as common as everyday beef. The cow is the measuring stick, not the villain. Lab echo: craft vs factory. Not a prescribed diet.',
    excerptEs:
      'Dicho BR: se volvió común para nosotros — tan ordinario como el bife del día. La vaca es la regla, no la villana. Eco en el lab: oficio × fábrica. No es dieta prescrita.',
    slug: 'inspecao-expressao-virou-carne-de-vaca',
    date: '2026-09-18T14:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Virou carne de vaca · Expressão',
    coverImage: '/imagens/inspecoes/virou-carne-de-vaca-cover.jpg',
    sourceUrl: '/animais/vaca/',
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildVirouCarneDeVacaPost,
  buildVirouCarneDeVacaBodies
};
