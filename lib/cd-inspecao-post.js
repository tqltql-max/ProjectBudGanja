'use strict';

/**
 * Inspeção objecto · CD (Compact Disc)
 * Pedido: inspeção do objecto CD + actividade de backup na página Tecnologia.
 * Eixos: disco compacto 120 mm · fosso + laser · CD-DA / CD-ROM / CD-R / CD-RW ·
 * ≠ vinil ≠ DVD ≠ Blu-ray ≠ certificado de depósito ≠ USB ·
 * catálogo /objetos/ e /tecnologia/ · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/cd-objeto-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/CD';
const WIKT_EN = 'https://en.wiktionary.org/wiki/CD';
const WIKI = 'https://pt.wikipedia.org/wiki/CD';
const WIKI_EN = 'https://en.wikipedia.org/wiki/Compact_disc';
const WIKI_CDR = 'https://en.wikipedia.org/wiki/CD-R';

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
  return `CD.
Não é o certificado do banco.
É o disco de 12 centímetros
que o laser lê em espiral.

Fosso no plástico.
Alumínio a devolver a luz.
A boca diz cedê
e o ofício guarda o nome Compact Disc.

Áudio no Red Book.
Dados no CD-ROM.
Uma vez no CD-R.
Apaga e grava no RW.

Não é vinil.
Não é DVD.
Não é a nuvem.
É o objecto que a gaveta ainda conhece.

Valeu !!!
com o disco certo
e sem tutorial de queima.`;
}

function poemEn() {
  return `CD.
It is not a bank certificate.
It is the twelve-centimetre disc
the laser reads in a spiral.

A pit in the plastic.
Aluminium giving the light back.
The mouth says cedê
and the craft keeps Compact Disc.

Audio in the Red Book.
Data on the CD-ROM.
Once on the CD-R.
Erase and write on RW.

It is not vinyl.
It is not DVD.
It is not the cloud.
It is the object the drawer still knows.

Valeu !!!
with the right disc
and no burning tutorial.`;
}

function poemEs() {
  return `CD.
No es el certificado del banco.
Es el disco de 12 centímetros
que el láser lee en espiral.

Foso en el plástico.
Aluminio que devuelve la luz.
La boca dice cedê
y el oficio guarda Compact Disc.

Audio en el Red Book.
Datos en el CD-ROM.
Una vez en el CD-R.
Borra y graba en el RW.

No es vinilo.
No es DVD.
No es la nube.
Es el objeto que el cajón aún conoce.

¡Valeu !!!
con el disco cierto
y sin tutorial de grabación.`;
}

function buildCdBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-cd.html';
  const backup = '/posts/post-inspecao-palavra-backup.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const hd = '/posts/post-inspecao-palavra-hd-escravo.html';
  const tech = '/posts/post-inspecao-palavra-tecnologia.html';
  const cat = '/tecnologia/';
  const objetos = '/objetos/';
  const objetosLema = '/posts/post-inspecao-palavra-objetos.html';
  const saveGame = '/posts/post-inspecao-palavra-save-game.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial do **objecto [CD](${self})** — *Compact Disc*, o disco compacto de **120 mm** que o laser lê em espiral. Pedido de campo: *inspeção do objeto CD e actividade de BACKUP na página de tecnologias*. O CD entra no catálogo [Objetos](${objetos}) como **coisa** e em [Tecnologia](${cat}) como **hardware**. A [actividade de backup](${backup}) é ficha irmã: o ofício de guardar uma reserva; o CD é **um** dos sítios onde essa reserva já morou.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · CD](${WIKT}), [CD (EN)](${WIKT_EN}), [WP · CD](${WIKI}), [Compact disc](${WIKI_EN}), [CD-R](${WIKI_CDR}). **Ficha ≠ tutorial de gravação, ≠ pirataria, ≠ loja de mídia, ≠ certificado de depósito bancário.** Sem afiliação a Philips, Sony nem a marcas de gravador. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *CD* / *cedê* / *cidi* / *compact disc* / *disco compacto* / *CD-ROM* / *CD-R* / *CD-RW*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **CD** — Compact Disc (disco compacto) |
| Classe | Substantivo masculino invariável (sigla); fala BR *o cedê* |
| Étimo (trabalho) | EN *compact* + *disc* — norma Philips/Sony, 1982 (áudio) — confiança: **alta** |
| Família | CD-DA · CD-ROM · CD-R · CD-RW · Mini-CD (80 mm) |
| Tipo BudGanja | Objecto — suporte óptico de leitura a laser |
| Catálogo | [Objetos](${objetos}) · [Tecnologia](${cat}) · lema [tecnologia](${tech}) |
| Não é | Vinil · DVD · Blu-ray · pen USB · [HD](${hd}) · certificado de depósito · [Save Game](${saveGame}) |
| Elo ofício | [Backup](${backup}) (actividade) · [restore](${restore}) (família lexical) · [gesto](${gesto}) |
| Fonte | [CD](${WIKT}) · [Compact disc](${WIKI_EN}) |
| Data | ${inspected} |

**O que é o objecto:** um disco de policarbonato, em regra **120 mm** de diâmetro e **1,2 mm** de espessura, com pista em espiral de **fossos** (*pits*) que um **laser** lê por reflexão. A capa de alumínio (ou ouro no gravável) devolve a luz; o aparelho traduz o padrão em áudio ou em dados. No lab: o CD **não** é a música, **não** é o ficheiro, **não** é o backup — é a **coisa** que os pode carregar.

## 2. CD × o que a orelha cola

| Forma | O que **é** | O que **não** é |
|-------|-------------|-----------------|
| **CD** / **Compact Disc** | Objecto desta ficha | Certificado de depósito (*certificate of deposit*) — outra sigla |
| **cedê** / **cidi** | Fala BR do mesmo disco | Lapso *sidí* / *sidi* — orelha, não lema |
| **CD-DA** | Áudio — *Red Book* (1980–82) | A canção em si |
| **CD-ROM** | Dados só de leitura — *Yellow Book* | Tutorial desta ficha |
| **CD-R** | Gravável uma vez — *Orange Book* | Licença para copiar obra alheia |
| **CD-RW** | Regravável | Pen USB nem «nuvem» |
| **DVD / Blu-ray** | Outros discos ópticos | Irmãos de família, **outras** fichas |
| **Vinil** | Sulco analógico | Outro objecto, outro ofício de ouvido |
| **[HD escravo](${hd})** | Disco magnético + jumper | Outra sala de hardware |

**H1:** a sigla **CD** nesta ficha é *Compact Disc*, não finança.  
**H2:** *cedê* é a boca BR; o lema no papel continua **CD**.  
**H3:** CD-R foi, no ofício caseiro, **suporte clássico** da [actividade de backup](${backup}) — o disco **não** é a actividade.

## 3. Peças do objecto (mapa curto)

| Peça | Leitura lab |
|------|-------------|
| **Policarbonato** | O corpo transparente — 120 mm (ou 80 mm no mini) |
| **Fosso / pista** | A escrita óptica em espiral, do centro para fora |
| **Camada reflexiva** | Alumínio (prensado) ou corante + metal (CD-R) |
| **Laca / serigrafia** | O lado que se pega; o laser lê o outro |
| **Orifício 15 mm** | O eixo da gaveta |
| **Capacidade clássica** | 74 min / ~650 MB; comum 80 min / ~700 MB — mapa, não receita |
| **Gaveta / leitor** | O aparelho; **não** é o disco |

**Veredicto peças:** o CD é o **conjunto**. Riscar a face de leitura ≠ «apagar a música do mundo». Partir o disco ≠ formatar o [HD](${hd}).

## 4. O CD e o backup (o pedido irmão)

A [actividade de backup](${backup}) é o **gesto** de guardar uma reserva. O CD (sobretudo **CD-R**) foi, nas décadas de 1990–2000, o sítio visível desse gesto: «queimar um CD» = copiar para o objecto. O lab **corta**:

| Sala | Ficha |
|------|-------|
| O disco | **Esta** — objecto Compact Disc |
| O ofício de copiar a reserva | **[Backup](${backup})** — actividade em [Tecnologia](${cat}) |
| A família restore / back / backup / up | **[Restore](${restore})** — léxico, quatro salas |
| O slot do jogo | **[Save Game](${saveGame})** — outro rasto |

Queimar sem testar a leitura é papel. Backup no CD que ninguém consegue abrir é amuleto. A bancada em [Tecnologia](${cat}) mostra o circuito **sem** ensinar a gravar discos.

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Sigla** | Qualquer CD | Nesta ficha: Compact Disc |
| **Música** | O CD *é* o álbum | O álbum é conteúdo; o CD é suporte |
| **Backup** | Ter um CD = estar seguro | Só se a [actividade](${backup}) copiou **e** a leitura se prova |
| **Eterno** | «Digital não estraga» | Riscos, oxidação, cola da etiqueta — o objecto envelhece |
| **Tutorial** | Como gravar no Nero | Recusado — inspeção, não receita |

## 6. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear o CD como objecto óptico e apontar a [actividade de backup](${backup}) |
| Bom | Distinguir CD-DA, CD-ROM, CD-R, CD-RW |
| Bom | Mandar restore lexical para [restore](${restore}) |
| Mau | Tutorial de gravação ou de cópia de obra alheia |
| Mau | Fundir CD com certificado de depósito, DVD ou USB |
| Mau | Tratar o disco como milagre de arquivo eterno |

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=cd)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Backup](${backup}) | Actividade irmã — a reserva; o CD é um suporte |
| [Tecnologia](${cat}) | Catálogo — hardware + bancada da actividade |
| [Restore](${restore}) | Família lexical restore × back × backup × up |
| [HD escravo](${hd}) | Outro disco — magnético, jumper ATA |
| [Objetos](${objetos}) · [lema](${objetosLema}) | O CD como *coisa* |
| [Save Game](${saveGame}) · [backspace](${backspace}) | Rasto de jogo / tecla — outras salas |
| [Étimo](${etimo}) · [língua](${lingua}) · [gesto](${gesto}) | Solo |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a gravar, raspar, ripar nem a recuperar disco riscado.  
- Não é ficha de DVD, Blu-ray, ISO nem de loja de mídia.  
- Não autoriza cópia de obra alheia.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **CD** fichado como Compact Disc (objecto óptico); salas cortadas (finança, vinil, DVD, tutorial de queima). Mora em [Objetos](${objetos}) e [Tecnologia](${cat}). Irmã: [actividade de backup](${backup}). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tecnologia](${cat}) · [▶ Objetos](${objetos}) · [▶ Backup](${backup}) · [▶ Poema Vida](/vida/#poema=cd) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the **object [CD](${self})** — *Compact Disc*, the **120 mm** disc a laser reads in a spiral. Field request: *CD object inspection and BACKUP activity on the technology page*. The CD enters [Objetos](${objetos}) as a **thing** and [Tecnologia](${cat}) as **hardware**. The [backup activity](${backup}) is the sister sheet: the craft of keeping a spare; the CD is **one** place that spare has lived.

Not a burning tutorial. Not a shop. Not a certificate of deposit.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Compact Disc as optical object; rooms cut. Sister: [backup activity](${backup}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **objeto [CD](${self})** — *Compact Disc*, el disco de **120 mm** que el láser lee en espiral. Pedido: *inspección del objeto CD y actividad de BACKUP en la página de tecnologías*. El CD entra en [Objetos](${objetos}) como **cosa** y en [Tecnologia](${cat}) como **hardware**. La [actividad de backup](${backup}) es la ficha hermana: el oficio de guardar una reserva; el CD es **un** sitio donde esa reserva ya vivió.

No es tutorial de grabación. No es tienda. No es certificado de depósito.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Compact Disc como objeto óptico; salas cortadas. Hermana: [actividad de backup](${backup}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildCdPost() {
  const { body, contentEn, contentEs } = buildCdBodies();
  const seriesOrder = pickOrder('inspecao-palavra-cd', 330);
  return makePalavra({
    title: 'Inspeção: CD — Compact Disc, o objecto que o laser lê; ≠ vinil ≠ depósito',
    titleEn: 'Inspection: CD — Compact Disc, the object the laser reads; ≠ vinyl ≠ deposit',
    titleEs: 'Inspección: CD — Compact Disc, el objeto que el láser lee; ≠ vinilo ≠ depósito',
    excerpt:
      'Objecto: CD (Compact Disc) — disco óptico 120 mm; CD-DA / CD-ROM / CD-R; suporte clássico da actividade de backup; ≠ certificado de depósito; Valeu !!!',
    excerptEn:
      'Object: CD (Compact Disc) — 120 mm optical disc; CD-DA / CD-ROM / CD-R; classic medium of the backup activity; ≠ certificate of deposit; Valeu !!!',
    excerptEs:
      'Objeto: CD (Compact Disc) — disco óptico 120 mm; CD-DA / CD-ROM / CD-R; soporte clásico de la actividad de backup; ≠ certificado de depósito; ¡Valeu !!!',
    slug: 'inspecao-palavra-cd',
    date: '2026-08-24T14:00:00.000Z',
    seriesOrder,
    seriesLabel: 'CD · objecto',
    coverImage: COVER,
    sourceUrl: WIKI_EN,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildCdPost,
  buildCdBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKI,
  WIKI_EN
};
