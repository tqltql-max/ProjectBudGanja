'use strict';

/**
 * Inspeção actividade · BACKUP
 * Pedido: inspeção do objecto CD + actividade de backup na página Tecnologia.
 * Eixos: ofício de guardar uma reserva · back + up · cópia de segurança ·
 * suporte clássico CD-R · ≠ restore (família lexical) ≠ Save Game ≠ backspace ·
 * bancada em /tecnologia/ · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/backup-atividade-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/backup';
const WIKT_PT = 'https://pt.wiktionary.org/wiki/backup';
const WIKI = 'https://en.wikipedia.org/wiki/Backup';
const WIKI_PT = 'https://pt.wikipedia.org/wiki/C%C3%B3pia_de_seguran%C3%A7a';

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
  return `Backup.
Não é o restore da boca.
Não é a tecla que apaga.
É o gesto de deixar uma reserva.

Back é o atrás.
Up é pôr de pé.
Juntos, copiar por trás
para um dia poder voltar.

O CD já foi o sítio.
O HD também guarda.
A nuvem é outro nome
do mesmo ofício — não milagre.

Quem copia e nunca lê
segura papel.
Quem restaura sem cópia
pede ao ar o que não guardou.

Valeu !!!
com a reserva no sítio
e o disco a responder.`;
}

function poemEn() {
  return `Backup.
It is not the mouth’s restore.
It is not the key that deletes.
It is the gesture of leaving a spare.

Back is behind.
Up is on its feet.
Together, copy from behind
so one day you can return.

The CD was once the place.
The HD also holds.
The cloud is another name
for the same craft — not a miracle.

Whoever copies and never reads
holds paper.
Whoever restores without a copy
asks the air for what was not kept.

Valeu !!!
with the spare in place
and the disc answering.`;
}

function poemEs() {
  return `Backup.
No es el restore de la boca.
No es la tecla que borra.
Es el gesto de dejar una reserva.

Back es el atrás.
Up es poner de pie.
Juntos, copiar por detrás
para un día poder volver.

El CD ya fue el sitio.
El HD también guarda.
La nube es otro nombre
del mismo oficio — no milagro.

Quien copia y nunca lee
sostiene papel.
Quien restaura sin copia
pide al aire lo que no guardó.

¡Valeu !!!
con la reserva en su sitio
y el disco respondiendo.`;
}

function buildBackupBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-backup.html';
  const cd = '/posts/post-inspecao-palavra-cd.html';
  const restore = '/posts/post-inspecao-palavra-restore.html';
  const hd = '/posts/post-inspecao-palavra-hd-escravo.html';
  const tech = '/posts/post-inspecao-palavra-tecnologia.html';
  const cat = '/tecnologia/';
  const objetos = '/objetos/';
  const saveGame = '/posts/post-inspecao-palavra-save-game.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';

  const body = `## Escopo

Inspeção editorial da **actividade [backup](${self})** — o ofício de **guardar uma reserva** (cópia de segurança) para um dia se poder [restaurar](${restore}). Pedido de campo: *inspeção do objeto CD e actividade de BACKUP na página de tecnologias*. Esta ficha é o **gesto**. O [CD](${cd}) é um **objecto** que já serviu de suporte. A família lexical *restore · back · backup · up* mora na ficha [restore](${restore}) — quatro salas de étimo; aqui o lema é a **actividade**. Entra em [Tecnologia](${cat}) no eixo **actividade**. A bancada da página mostra o circuito **sem** runbook de servidor.

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · backup](${WIKT}), [backup (PT)](${WIKT_PT}), [WP · Backup](${WIKI}), [cópia de segurança](${WIKI_PT}). **Ficha ≠ manual de disaster recovery, ≠ tutorial de cópia de sistema, ≠ receita 3-2-1 como procedimento operacional, ≠ licença para overwrite.** Sem afiliação a marcas de software de cópia. Fecho: [Valeu !!!](${mantra}).

**Gatilho:** *BACKUP* / *backup* / *back up* / *bakup* / *bacape* / *cópia de segurança* / *cópia de reserva* / *fazer o backup*.

## 1. Actividade inspecionada

| Campo | Valor |
|-------|-------|
| Lema | **backup** (actividade) — também *cópia de segurança* |
| Classe | Empréstimo EN vivo no BR; verbo *fazer backup* / *back up* |
| Étimo (trabalho) | EN *back* + *up* «apoiar por trás» → reserva / cópia (séc. XX, informática) — confiança: **alta** no composto; **média-alta** no sentido técnico |
| Lapso de campo | **bakup** / **bacape** / **backupe** — boca, não lema |
| Tipo BudGanja | Actividade — o gesto de deixar reserva |
| Catálogo | [Tecnologia](${cat}) · eixo actividade · lema [tecnologia](${tech}) |
| Não é | [Restore](${restore}) (pôr de pé de novo) · [Save Game](${saveGame}) · [backspace](${backspace}) · [commitar](${commitar}) · o [CD](${cd}) em si |
| Elo objecto | [CD](${cd}) — suporte clássico (CD-R) · [HD](${hd}) — outro sítio de guarda |
| Fonte | [backup](${WIKT}) · [Backup (WP)](${WIKI}) |
| Data | ${inspected} |

**O que é a actividade:** copiar o que importa para um **sítio de reserva**, de modo a que um [restore](${restore}) seja possível. Não é milagre. Não é a tecla que apaga para trás. Não é gravar o slot do jogo. No lab: backup **só vale** se a porta de volta se puder abrir.

## 2. Actividade × palavra × objecto

Três salas — sem fundir:

| Sala | Ficha | Ofício |
|------|-------|--------|
| **Actividade** | **Esta** | O gesto: copiar a reserva e poder voltar |
| **Léxico** | [Restore · back · backup · up](${restore}) | Quatro vocábulos, um circuito de étimo |
| **Objecto** | [CD](${cd}) | Disco óptico — um suporte histórico da reserva |
| **Disco magnético** | [HD escravo](${hd}) | Outro aparelho; jumper ≠ cópia |
| **Jogo** | [Save Game](${saveGame}) | Grava o rasto da partida — irmão de mesa, não a reserva do ofício |
| **Tecla** | [Backspace](${backspace}) | Apaga o carácter de trás — **não** guarda |
| **Git** | [Commitar](${commitar}) | Snapshot de código — rasto, não necessariamente restore de máquina |

**H1:** *backup* como **actividade** é o composto em uso: deixar reserva.  
**H2:** a ficha [restore](${restore}) inspecciona as **quatro palavras**; esta inspecciona o **ofício**.  
**H3:** o [CD](${cd}) não *é* o backup — é um sítio onde o backup **já morou**.

## 3. Peças do gesto (mapa, não receita)

| Peça | Leitura lab |
|------|-------------|
| **Original** | O que ainda está no sítio de trabalho |
| **Reserva** | A cópia por trás — o backup |
| **Suporte** | CD-R, [HD](${hd}), fita, USB, outro disco, «nuvem» — o *onde*, não o gesto |
| **Prova** | Ler / [restaurar](${restore}) a reserva **antes** de precisar dela |
| **3-2-1 (literacia)** | Três cópias, dois tipos de suporte, uma fora do sítio — **mapa**, não runbook desta ficha |

A bancada em [Tecnologia](${cat}#tecnologia-backup) mostra original → CD → restore **com peças de brinquedo**. Não copia ficheiros reais. Não ensina a clonar disco.

## 4. Smash e fala BR

| Forma | Sala |
|-------|------|
| **backup** | Lema EN / loan PT |
| **cópia de segurança** | Irmã nativa |
| **fazer o backup** | Verbo de oficina |
| **bakup** / **bacape** | Lapso — orelha cola o inglês |
| **back up** (duas palavras) | Verbo EN: copiar / apoiar / recuar o carro — nesta ficha o ofício é a **cópia** |
| **upar** | Outra sala de *up* (jogo / nível) — **não** esta actividade |

## 5. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Ter um CD** | Backup feito | Só se a [actividade](${self}) copiou **e** o [CD](${cd}) ainda se lê |
| **Nuvem** | Outro milagre | Outro suporte; o gesto é o mesmo |
| **Save** | O mesmo que backup | [Save Game](${saveGame}) grava a partida; backup guarda a **reserva do ofício** |
| **Commit** | Backup do código | [Commitar](${commitar}) é rasto git — irmão, não sinónimo |
| **Restore back** | Fórmula completa | Tautologia — ver [restore](${restore}) |
| **Nunca testar** | «Está guardado» | Papel — a reserva sem porta de volta é amuleto |

## 6. Bom × mau

| Uso | Ofício |
|-----|--------|
| Bom | Nomear backup como **actividade** e o [CD](${cd}) como **objecto** |
| Bom | Cruzar com [restore](${restore}) sem fundir as fichas |
| Bom | Dizer: copiar → provar a leitura → só então confiar |
| Mau | Runbook de servidor, clonagem ou recuperação forense |
| Mau | Fundir com backspace, save-game ou certificado de depósito |
| Mau | Tutorial de copiar obra alheia «para backup» |

## 7. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](/vida/#poema=backup)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [CD](${cd}) | Objecto irmão — suporte óptico clássico da reserva |
| [Tecnologia](${cat}#tecnologia-backup) | Catálogo + bancada da actividade |
| [Restore](${restore}) | Família lexical — pôr de pé; back; backup; up |
| [HD escravo](${hd}) | Outro disco — jumper, não o gesto de copiar |
| [Save Game](${saveGame}) · [commitar](${commitar}) · [upsert](${upsert}) | Outros gestos de gravar |
| [Backspace](${backspace}) | Apaga; não reserva |
| [Objetos](${objetos}) | O CD como coisa |
| [Étimo](${etimo}) · [língua](${lingua}) · [gesto](${gesto}) | Solo |
| [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não ensina a copiar discos, clonar sistemas nem a recuperar dados perdidos.  
- Não é norma ISO de arquivo nem política de retenção.  
- A menção 3-2-1 é **literacia**, não procedimento.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **backup** fichado como **actividade** (gesto de reserva); [CD](${cd}) noutra sala (objecto); [restore](${restore}) guarda o circuito lexical. Mora em [Tecnologia](${cat}). [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Tecnologia](${cat}#tecnologia-backup) · [▶ CD](${cd}) · [▶ Restore](${restore}) · [▶ Poema Vida](/vida/#poema=backup) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the **activity [backup](${self})** — the craft of **keeping a spare copy** so a [restore](${restore}) can exist. Field request: *CD object and BACKUP activity on the technology page*. This sheet is the **gesture**. The [CD](${cd}) is an **object** that once held the spare. The word family *restore · back · backup · up* lives on [restore](${restore}). Here the lemma is the **activity**. It enters [Tecnologia](${cat}) on the **activity** axis. The bench on that page shows the circuit **without** a server runbook.

Not disaster-recovery instructions. Not a how-to for cloning a drive.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Backup as activity; [CD](${cd}) as object; [restore](${restore}) keeps the lexicon. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de la **actividad [backup](${self})** — el oficio de **guardar una reserva** para que un [restore](${restore}) sea posible. Pedido: *objeto CD y actividad de BACKUP en la página de tecnologías*. Esta ficha es el **gesto**. El [CD](${cd}) es un **objeto** que ya sirvió de soporte. La familia *restore · back · backup · up* vive en [restore](${restore}). Aquí el lema es la **actividad**. Entra en [Tecnologia](${cat}) en el eje **actividad**. La bancada muestra el circuito **sin** runbook de servidor.

No es manual de recuperación. No es tutorial de clonar disco.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Backup como actividad; [CD](${cd}) como objeto; [restore](${restore}) guarda el léxico. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildBackupPost() {
  const { body, contentEn, contentEs } = buildBackupBodies();
  const seriesOrder = pickOrder('inspecao-palavra-backup', 331);
  return makePalavra({
    title: 'Inspeção: Backup — a actividade de deixar reserva; ≠ restore ≠ CD',
    titleEn: 'Inspection: Backup — the activity of leaving a spare; ≠ restore ≠ CD',
    titleEs: 'Inspección: Backup — la actividad de dejar reserva; ≠ restore ≠ CD',
    excerpt:
      'Actividade: backup (back+up) — copiar a reserva e poder voltar; CD é suporte, restore é outra ficha; smash bakup; Valeu !!!',
    excerptEn:
      'Activity: backup (back+up) — copy the spare so you can return; CD is a medium, restore is another sheet; slip bakup; Valeu !!!',
    excerptEs:
      'Actividad: backup (back+up) — copiar la reserva para poder volver; el CD es soporte, restore es otra ficha; lapso bakup; ¡Valeu !!!',
    slug: 'inspecao-palavra-backup',
    date: '2026-08-24T14:10:00.000Z',
    seriesOrder,
    seriesLabel: 'Backup · actividade',
    coverImage: COVER,
    sourceUrl: WIKI,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildBackupPost,
  buildBackupBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKI
};
