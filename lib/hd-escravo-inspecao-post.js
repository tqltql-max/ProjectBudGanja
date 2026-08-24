'use strict';

/**
 * Inspeção Palavras · HD escravo (slave)
 * Eixos: disco rígido · jumper ATA/IDE mestre–escravo · smash slayr ·
 * Device 0 / Device 1 · Cable Select · SATA sem par ·
 * ≠ escravidão humana ≠ gíria de trabalho · lema tecnologia · Valeu !!!
 * Pedido: inspeção em HD slayr escravo tecnologia + página dedicada.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/hd-escravo-palavra-cover.jpg';
const WIKI_PATA = 'https://en.wikipedia.org/wiki/Parallel_ATA';
const WIKI_PATA_PT = 'https://pt.wikipedia.org/wiki/ATA_Packet_Interface';
const WIKI_HDD = 'https://pt.wikipedia.org/wiki/Disco_r%C3%ADgido';
const WIKI_HDD_EN = 'https://en.wikipedia.org/wiki/Hard_disk_drive';
const WIKI_MS = 'https://en.wikipedia.org/wiki/Master/slave_(technology)';
const WIKT_SLAVE = 'https://en.wiktionary.org/wiki/slave';
const WIKT_ESCRAVO = 'https://pt.wiktionary.org/wiki/escravo';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts.filter((p) => p.series === 'palavras-origem').map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `HD escravo.
Não é o nome de uma pessoa.
É o jumper do disco
no cabo que levava dois.

Mestre num pino.
Escravo no outro.
Cable select no meio.
A fita IDE cantava os dois.

Slayr é o smash
da boca a escrever slave.
A orelha cola o inglês
no português do manual.

SATA já não pede o par.
A indústria troca o jargão:
device 0, device 1.
A sala humana fica à parte.

Valeu !!!
sem tutorial de parafuso
e sem metáfora de cativeiro.`;
}

function poemEn() {
  return `HD slave.
It is not a person’s name.
It is the disk jumper
on the cable that carried two.

Master on one pin.
Slave on the other.
Cable select in between.
The IDE ribbon sang both.

Slayr is the smash
of the mouth writing slave.
The ear glues the English
to the Portuguese of the manual.

SATA no longer asks for the pair.
The industry changes the jargon:
device 0, device 1.
The human room stays apart.

Valeu !!!
no screwdriver tutorial
and no bondage metaphor.`;
}

function poemEs() {
  return `HD esclavo.
No es el nombre de una persona.
Es el jumper del disco
en el cable que llevaba dos.

Maestro en un pin.
Esclavo en el otro.
Cable select en el medio.
La cinta IDE cantaba los dos.

Slayr es el smash
de la boca al escribir slave.
El oído pega el inglés
al portugués del manual.

SATA ya no pide el par.
La industria cambia la jerga:
device 0, device 1.
La sala humana queda aparte.

¡Valeu !!!
sin tutorial de tornillo
y sin metáfora de cautiverio.`;
}

function buildHdEscravoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-hd-escravo.html';
  const cat = '/tecnologia/';
  const tecnologia = '/posts/post-inspecao-palavra-tecnologia.html';
  const escravidao = '/posts/post-inspecao-palavra-escravidao.html';
  const preso = '/posts/post-inspecao-palavra-preso.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const objetosHub = '/objetos/';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do jargão **[HD escravo](${self})** — inglês *slave* no par **master/slave** do [disco rígido](${WIKI_HDD}) em cabo **[Parallel ATA / IDE](${WIKI_PATA})**. Pedido de campo: *inspeção em HD slayr escravo tecnologia*.

Quatro peças, salas cortadas.

1. **HD** = *hard disk* / disco rígido — o [objecto](${objetos}).  
2. **slave** = jumper inglês do segundo dispositivo no mesmo cabo. Smash de campo: **slayr**.  
3. **escravo** = calco português dos manuais (mestre / escravo).  
4. **[tecnologia](${tecnologia})** = lema; a página dedicada é o catálogo **[Tecnologia](${cat})**.

O vocábulo humano **[escravidão](${escravidao})** é **outra ficha**. Aí o lab recusa «escravo» como piada ou gíria de trabalho. **Aqui** não se usa o jargão para rir: documenta-se o jumper histórico e o movimento da indústria para *device 0 / device 1*. Duas frases. [A orelha cola o que a boca juntou](${orelhaCola}).

> **Nota metodológica:** auditoria independente. Fontes: [disco rígido](${WIKI_HDD}), [HDD](${WIKI_HDD_EN}), [Parallel ATA](${WIKI_PATA}), [ATA Packet Interface](${WIKI_PATA_PT}), [Master/slave (technology)](${WIKI_MS}), [slave](${WIKT_SLAVE}), [escravo](${WIKT_ESCRAVO}). **Ficha ≠ tutorial de jumper, ≠ recuperação de dados, ≠ RAID, ≠ metáfora de cativeiro.** Sem afiliação com fabricantes. Série [Palavras](${hub}). Catálogo [Tecnologia](${cat}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *HD escravo* / *HD slave* / *slayr* / *mestre e escravo* / *jumper IDE* / *cable select*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **HD escravo** (PT de oficina) · ing. **slave** (jumper) |
| Smash de campo | **slayr** → *slave* (como *Restoure* → [restore](${restore}), *xioomi* → Xiaomi) |
| Objecto físico | [Disco rígido](${WIKI_HDD}) (HDD) no cabo PATA/IDE de dois dispositivos |
| Par | **master** / **slave** · PT **mestre** / **escravo** · depois **device 0** / **device 1** |
| Terceiro pino | **Cable Select (CS)** — o cabo escolhe quem é 0 e quem é 1 |
| Tipo BudGanja | Palavra + objecto — jargão de [tecnologia](${tecnologia}) |
| Não é | [Escravidão](${escravidao}) · [preso](${preso}) · SATA (ponto-a-ponto) · tutorial de parafuso |
| Data | ${inspected} |
| Fonte | [Master/slave (technology)](${WIKI_MS}) |

**O que é o objecto:** o **nome do segundo dispositivo** no mesmo cabo IDE. Não é identidade. Não é crime. Não é metáfora. É um pino no disco.

## 2. O cabo que levava dois

| Peça | Ofício | Confiança |
|------|--------|-----------|
| **IDE / PATA** | Um cabo-fita, até **dois** aparelhos (disco + disco, ou disco + leitor) | Alta |
| **Master (DS)** | Device **0** — jumper «mestre» nos manuais BR | Alta |
| **Slave** | Device **1** — jumper «escravo» | Alta |
| **Cable Select** | O fio 28 do cabo decide 0/1 pela posição da ficha | Alta |
| **SATA** (c. 2003) | Um cabo, um aparelho — **não há par** mestre/escravo | Alta |
| **SCSI / SAS** | Initiator / target — **outra** árvore de jargão | Média (vizinho) |

**H-ATA:** o par nasceu da economia do cabo, não de uma tese sobre pessoas.  
**H-SATA:** quando o cabo passou a ser ponto-a-ponto, o jumper morreu no hardware novo. O vocábulo ficou nos manuais velhos e na boca.  
**H-rename:** a indústria e o software (ramos *master*→*main*, replicação *primary/replica*) trocam o jargão. Documentar o histórico ≠ defendê-lo como piada.

## 3. Slayr — o smash

Pedido escrito: *HD **slayr** escravo*. A boca mira o inglês **slave** e acerta **slayr** (y no lugar do v; o r no fim como em *slayer*). O lab mapeia o smash; não inventa marca.

| Forma | Sala |
|-------|------|
| **slave** | Inglês do jumper / da replicação antiga |
| **slayr** | Smash de campo → *slave* |
| **slayer** | Outra palavra (quem mata) — a orelha pode colar; **cortar** |
| **escravo** | Calco PT do manual IDE |
| **mestre** | Calco PT de *master* neste par |

[A orelha cola](${orelhaCola}) *slayr* em *slayer* e *escravo* em [escravidão](${escravidao}). O étimo do jumper **corta**: é etiqueta de pino.

## 4. Duas salas — jumper × cativeiro

A ficha [escravidão](${escravidao}) recusa usar «escravo» como piada ou gíria de trabalho. Esta ficha **não desfaz** esse corte.

| Sala | Objecto | O que o lab faz |
|------|---------|-----------------|
| **[Escravidão](${escravidao})** | Sistema que trata pessoas como propriedade | Vocábulo humano; lei da época × lei de agora |
| **HD escravo** | Jumper Device 1 no cabo IDE | Documentar o jargão e o rename; **não** usar como gozo |
| **«escravo da tecnologia»** | Metáfora de hábito | Recusada como diagnóstico; ver lema [tecnologia](${tecnologia}) |

Fundir as duas salas num sopro [buguei](${buguei}). [Respeito](${respeito}): o peso da palavra humana não se empresta ao pino.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Uma coisa só** | HD escravo = pessoa escravizada | Etiqueta de jumper |
| **Ainda vale** | Todo disco tem mestre/escravo | Só PATA de dois dispositivos; SATA não |
| **Slayr** | Marca / nick | Smash de *slave* |
| **Rename** | Apagar a história | Trocar o jargão **e** guardar o recorte histórico nesta ficha |
| **Tutorial** | Como pinar o disco | Recusado — não é guia de montagem |

## 6. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Dizer *device 0 / device 1* no hardware novo |
| Bom | Nomear *master/slave* como **jargão histórico** do cabo IDE |
| Bom | Mandar a palavra humana para [escravidão](${escravidao}) |
| Mau | Usar «escravo» para rir do trabalho ou da máquina |
| Mau | Tutorial de jumper disfarçado de inspeção |
| Mau | Fundir SATA, RAID e IDE num só sopro |

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=hd-escravo)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Tecnologia](${tecnologia}) | Lema — *tékhnē* + *lógos* |
| [Catálogo Tecnologia](${cat}) | Página dedicada |
| [Escravidão](${escravidao}) | Sala humana — não fundir |
| [Preso](${preso}) | Estado; outro vocábulo |
| [Objetos](${objetos}) · [hub](${objetosHub}) | O disco como *coisa* |
| [Restore / backup](${restore}) | O que o disco *guarda* — outra ficha |
| [Interruptor](${interruptor}) | Gesto de circuito |
| [A orelha cola](${orelhaCola}) · [buguei](${buguei}) | Ofício do corte |
| [Verdade](${verdade}) · [gesto](${gesto}) · [respeito](${respeito}) · [língua](${lingua}) | Solo |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a pinar um disco nem a recuperar dados.  
- Não é ficha de RAID, SCSI, replicação de base de dados nem ramo git *master*.  
- Não aligeira [escravidão](${escravidao}).  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **HD escravo** fichado como jumper ATA/IDE (Device 1); smash **slayr** mapeado; SATA sem par; salas cortadas (escravidão humana, tutorial, slayer). Mora no catálogo [Tecnologia](${cat}). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tecnologia](${cat}) · [▶ Lema](${tecnologia}) · [▶ Escravidão](${escravidao}) · [▶ Poema Vida](/vida/#poema=hd-escravo) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the jargon **HD escravo** — English *slave* in the **master/slave** pair on a [Parallel ATA / IDE](${WIKI_PATA}) hard disk. Field request: *HD slayr escravo tecnologia*.

**slayr** is the smash for *slave*. Portuguese manuals said *mestre / escravo*. The human word **[escravidão](${escravidao})** is another sheet. SATA is point-to-point: no pair. The dedicated page is **[Tecnologia](${cat})**.

Not a jumper tutorial. Not a bondage metaphor.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** ATA jumper; smash mapped; rooms cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la jerga **HD escravo** — inglés *slave* en el par **master/slave** del disco [Parallel ATA / IDE](${WIKI_PATA}). Pedido: *HD slayr escravo tecnologia*.

**slayr** es el smash de *slave*. Los manuales PT decían *mestre / escravo*. La palabra humana **[escravidão](${escravidao})** es otra ficha. SATA es punto a punto: no hay par. La página dedicada es **[Tecnologia](${cat})**.

No es tutorial de jumper. No es metáfora de cautiverio.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Jumper ATA; smash mapeado; salas cortadas. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildHdEscravoPost() {
  const { body, contentEn, contentEs } = buildHdEscravoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-hd-escravo', 311);
  return makePalavra({
    title: 'Inspeção: HD escravo (slave) — jumper ATA; slayr; ≠ escravidão ≠ SATA',
    titleEn: 'Inspection: HD slave — ATA jumper; slayr; ≠ slavery ≠ SATA',
    titleEs: 'Inspección: HD esclavo — jumper ATA; slayr; ≠ esclavitud ≠ SATA',
    excerpt:
      'Palavras: HD escravo = jumper IDE Device 1; smash slayr → slave; ≠ escravidão humana ≠ SATA; catálogo /tecnologia/; Valeu !!!',
    excerptEn:
      'Words: HD escravo = IDE jumper Device 1; smash slayr → slave; ≠ human slavery ≠ SATA; catalog /tecnologia/; Valeu !!!',
    excerptEs:
      'Palabras: HD escravo = jumper IDE Device 1; smash slayr → slave; ≠ esclavitud humana ≠ SATA; catálogo /tecnologia/; ¡Valeu !!!',
    slug: 'inspecao-palavra-hd-escravo',
    date: '2026-08-24T12:42:00.000Z',
    seriesOrder,
    seriesLabel: 'HD escravo · palavra',
    coverImage: COVER,
    sourceUrl: WIKI_MS,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildHdEscravoPost,
  buildHdEscravoBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKI_MS,
  WIKT_ESCRAVO
};
