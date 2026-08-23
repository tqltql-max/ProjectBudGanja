'use strict';

/**
 * Inspeção Palavras · Mega-Sena
 * Objecto: o NOME (mega + sena) e os PATROCÍNIOS (destinação × logo).
 * ≠ senha ≠ cena ≠ Senna (Ayrton) ≠ sorteios do lab. Sem sistema de aposta.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/mega-sena-palavra-cover.jpg';
const WIKI = 'https://pt.wikipedia.org/wiki/Mega-Sena';
const WIKT_MEGA = 'https://pt.wiktionary.org/wiki/mega-';
const WIKT_SENA = 'https://pt.wiktionary.org/wiki/sena';
const WIKT_PATROCINIO = 'https://pt.wiktionary.org/wiki/patroc%C3%ADnio';
const CAIXA = 'https://loterias.caixa.gov.br/Paginas/Mega-Sena.aspx';
const LEI = 'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13756.htm';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 330) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildMegaSenaBodies() {
  const inspected = '2026-08-23';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-mega-sena.html';
  const catorze = '/posts/post-inspecao-palavra-catorze.html';
  const zero = '/posts/post-inspecao-palavra-zero.html';
  const tres = '/posts/post-inspecao-palavra-tres.html';
  const patrao = '/posts/post-inspecao-palavra-patrao.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sexta = '/posts/post-inspecao-palavra-sexta-feira-13.html';
  const senna = '/posts/post-inspecao-figura-ayrton-senna.html';
  const sorteiosLab = '/sorteios/';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do **nome [Mega-Sena](${self})** — composto **mega** + **sena** — e dos **patrocínios** que o nome arrasta. Pedidos de campo: *MegaSena* · *nome* · *patrocínios* · *relação com Senna / Ayrton Senna*. Esta ficha cobre as **peças do vocábulo**, a **Sena antiga** (1996) e o corte de orelha: **Sena (um n, o seis) ≠ [Senna](${senna}) (dois n, o apelido)**. Patrocinar ≠ tornar o 14 sortudo.

> **Nota metodológica:** auditoria independente. Fontes: [Wikipédia · Mega-Sena](${WIKI}), [Wikcionário · mega-](${WIKT_MEGA}), [sena](${WIKT_SENA}), [patrocínio](${WIKT_PATROCINIO}), [Caixa · Mega-Sena](${CAIXA}), [Lei 13.756/2018](${LEI}). **Ficha ≠ tutorial de aposta, ≠ sistema, ≠ previsão, ≠ anúncio da Caixa.** Sem afiliação comercial. O laboratório **não é patrocinado** por loteria. Indexar o nome ≠ incentivar jogo. Maiores de 18; jogo tem [risco](${risco}) de prejuízo e de hábito — **não é ofício**. Percentagens de destinação **mudam**: confirmar na lei / Caixa.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Mega-Sena** (hífen oficial) |
| Rasto oral / teclado | *MegaSena* · *mega sena* · *megasena* |
| Peças do **nome** | **mega-** (gr. *μέγας* «grande») + **sena** (conjunto de **seis**) |
| Palavra incluída | **patrocínio** / **patrocínios** — *patronus* → [patrão](${patrao}); nesta ficha: destinação × logo |
| Operador | Caixa Econômica Federal — loteria da União |
| Estreia | **11 mar. 1996** (substitui a antiga **Sena**) |
| Matemática do tambor | 6 dezenas em **01–60** (o **[0](${zero})** sozinho **não** entra) → **C(60,6) = 50 063 860** |
| Tipo BudGanja | Palavra — nome de modalidade × literacia × patrocínio |
| O que **não** é | [Sorteios](${sorteiosLab}) do lab · [senha](${self}) · [cena](${self}) · [Ayrton Senna](${senna}) · oráculo |
| Elo | [patrão](${patrao}) · [risco](${risco}) · [verdade](${verdade}) · [catorze / 14](${catorze}) · [três](${tres}) · [Ayrton Senna](${senna}) |
| Fonte | [Mega-Sena](${WIKI}) |
| Data | ${inspected} |

**Objecto:** o **nome** que promete a sena *grande*. Os números 01–60 são iguais. O [14](${catorze}) não ganha patrocínio.

## 2. O nome — mega + sena

| Peça | Étimo (trabalho) | Ofício no nome |
|------|------------------|----------------|
| **mega-** | Gr. *μέγας* → prefixo PT «muito grande» | Intensivo — a sena **ampliada** (prémio / escala), não um segundo jogo |
| **sena** | Lat. *sēnī* «de seis em seis» → PT *sena* (grupo de seis) | A **quota seis**: acertar as seis dezenas |
| **hífen** | Grafia comercial **Mega-Sena** | Junta o intensivo ao objecto; *MegaSena* é rasto, não âncora |

**H1:** *sena* nomeia o **seis**, não a sorte. Quina (5) e quadra (4) são irmãs de **contagem**, não de milagre.  
**H2:** a antiga **Sena** (Caixa, antes de 1996) deixou o segundo morfo; **mega-** marcou o salto de escala.  
**H3:** orelha cola *sena* em **senha**, **cena** e **[Senna](${senna})**. São **quatro salas**.  
**H4:** *mega* ≠ ómega. O prefixo incha o nome; não altera **C(60,6)**.

### Variantes de nome (mesma sala)

| Forma | Nota |
|-------|------|
| **Mega-Sena** | Âncora — grafia Caixa |
| **Mega da Virada** | Concurso de nome próprio no réveillon — ainda sena de seis; regras de acúmulo **outras** |
| **Sena** (antiga) | Antepassada; não reabrir «anterior / posterior» nesta ficha |

## 2b. Sena × Senna (Ayrton) — orelha cola, étimo corta

Pedido: *relação do nome com Senna / Ayrton Senna*. **Há cola de orelha. Não há étimo comum.**

| Forma | Grafia | Origem | Sala |
|-------|--------|--------|------|
| **sena** (Mega-**Sena**) | um **n** | Lat. *sēnī* «de seis em seis» — quota **6** da urna | Loteria · esta ficha |
| **Senna** ([Ayrton Senna da Silva](${senna})) | dois **n** | Apelido de família (mãe Neyde **Senna**) | Pessoa · homenagem de ofício |
| **senha** | — | Palavra-passe | Chave, não seis |
| **cena** | — | Palco / recorte | Teatro, não urna |

**Porque a orelha cola:** no PT-BR as duas soam quase iguais; [Ayrton Senna](${senna}) morre em **1 maio 1994**; a Mega-Sena estreia em **11 mar. 1996**. O luto nacional e o nome novo **encostam no calendário**. Isso é **coincidência cultural**, não baptismo.

**O que as fontes da loteria dizem:** a Caixa **reformulou a modalidade antiga chamada Sena** (seis / faixas anterior-posterior) e pôs **mega-** no intensivo. Não há rasto público de homenagem ao piloto no morfo *Sena* da loteria.

**Patrocínio ≠ baptismo:** destinação de loterias ao esporte (lei) **não** transforma o nome Mega-Sena em memorial Senna. O Instituto e o ofício do piloto vivem na [ficha Ayrton Senna](${senna}) e no mantra [Valeu !!!](${mantra}) — **outra sala**.

**Veredicto de relação:** **não**. Homofonia + calendário 1994/1996. Um **n** conta seis; dois **n** nomeiam o piloto.

## 3. Patrocínios — três camadas (não misturar)

Pedido: *patrocínios*. Lat. *patronus* «protector» → PT [patrocínio](${WIKT_PATROCINIO}) · família [patrão](${patrao}) / [pattern](${pattern}).

| Camada | O que é | O que **não** é |
|--------|---------|-----------------|
| **Destinação legal** | A lei reparte arrecadação de loterias (prémios × fundos: esporte, cultura, segurança, seguridade, etc.) — [Lei 13.756/2018](${LEI}) e alterações | Não é o lab a «apoiar» o jogo; % **não** são eternos nesta ficha |
| **Marca / logo** | Caixa e Mega-Sena **aparecem** como nome em publicidade, eventos, camisas, TV | Logo na manga **≠** aumenta C(60,6) |
| **Pose de sorte** | «Número patrocinado», bolão da firma, 07 / 13 / 14 «da sorte» | Folclore. [14](${catorze}) = 2×7; [13](${sexta}) no calendário é outra ficha |

**H5:** patrocínio (dinheiro que **sai** da arrecadação para destinos públicos / marca) **não** é método de acertar.  
**H6:** esta página **não tem patrocinador** de loteria. Sem cupom, sem afiliado, sem «aposte aqui».  
**H7:** [sorteios](${sorteiosLab}) do Inspetor (clonadora, inscrição grátis) são **outra sala** — não são Mega-Sena.

**Veredicto patrocínio:** nomear destinação e logo é literacia. Confundir com dica de jogo é [risco](${risco}) disfarçado de apoio.

## 4. Matemática (literacia, não sistema)

| Facto | Leitura lab |
|-------|-------------|
| 6 em 60 | Combinação **sem ordem** — C(60,6) = **50 063 860** |
| Aposta simples | **Uma** dessas combinações |
| 07 · 08 · 13 · 14 · 21 | Dezenas **iguais** às outras; 14 tem ficha [catorze](${catorze}) |
| **0** | **Não** é dezena — ficha [zero](${zero}) |
| Acumular | Calendário de concurso, não «sinal do cosmos» |

Não publicamos tabelas de «atraso», «quente/frio» nem bolão. Isso finge [pattern](${pattern}) onde há sorteio.

## 5. O que parece × o que é

| Camada | Parece | É |
|--------|--------|---|
| Nome | Palavra mágica / homenagem a Senna | Composto **grande + seis**; ≠ [Ayrton Senna](${senna}) |
| Patrocínio | A marca «abana» o apostador | Destinação / anúncio — **não** muda a urna |
| Mega | Mais fácil por ser mega | Mais **visível**; a combinação continua enorme |
| Lab | Sorteio do site = Mega | [Sorteios](${sorteiosLab}) ≠ Caixa |

## 6. Limites

- Não ensinamos a apostar nem a «melhorar odds».  
- Não listamos lotéricas, apps nem convites de bolão.  
- Não usamos esta ficha como anúncio.  
- Jogo pode gerar prejuízo e dependência — procurar ajuda especializada se o hábito apertar; **ficha ≠ clínica**.  
- Destinações sociais **não** lavam o [risco](${risco}) da aposta pessoal.

## Veredicto

**Aprovado** — **Mega-Sena** fichada como **nome** (mega + sena) e como mapa de **patrocínios** (destinação × logo × pose). Sem sistema. Fecho: [Valeu !!!](${mantra}) **fora** da fila da lotérica.

[▶ Palavras](${hub}) · [▶ 14 / catorze](${catorze}) · [▶ Ayrton Senna](${senna}) · [▶ Patrão](${patrao}) · [▶ Risco](${risco}) · [▶ Sorteios do lab](${sorteiosLab}) · [▶ Caixa](${CAIXA}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of the **name [Mega-Sena](${self})** — **mega** (great) + **sena** (set of six) — and of **sponsorships**: legal earmarks × brand logo × luck pose. Field: *name* · *patrocínios*. **Not** a betting guide. No affiliate. Lab giveaways at [sorteios](${sorteiosLab}) are another room.

## Name

| Piece | Work etymon |
|-------|-------------|
| **mega-** | Gk. *megas* — intensifier |
| **sena** | Lat. *sēnī* — six at a time; the six-hit prize |
| Old **Sena** | Caixa lottery replaced in **1996** |

Ear glue: *sena* (one **n**, six) ≠ [Ayrton Senna](${senna}) (two **n**, surname) ≠ *senha* ≠ *cena*. The lottery (1996) reused the old **Sena** game-name, not the driver’s. 1994/1996 sit next to each other on the calendar — that is grief + homophony, not etymology.

## Sponsorships

Lat. *patronus* → PT *patrocínio* · see [patrão](${patrao}). Lottery proceeds are **split by law** (prizes × public funds). A logo on a shirt **does not** change C(60,6) = 50,063,860. This sheet is **not sponsored**.

## Verdict

**Approved** — name + sponsorship literacy. Close: [Valeu !!!](${mantra}) off the lottery queue.

[▶ Words](${hub}) · [▶ 14](${catorze}) · [▶ Risk](${risco})
`;

  const contentEs = `## Alcance

Inspección del **nombre [Mega-Sena](${self})** — **mega** + **sena** (seis) — y de los **patrocinios**: destinos legales × logo × pose de suerte. Pedido: *nome* · *patrocínios*. **No** es guía de apuestas. Sin afiliación. Los [sorteos](${sorteiosLab}) del lab son otra sala.

## Nombre

| Pieza | Étimo de trabajo |
|-------|------------------|
| **mega-** | Gr. *megas* — intensivo |
| **sena** | Lat. *sēnī* — de seis en seis |
| **Sena** antigua | Lotería Caixa sustituida en **1996** |

La oreja pega *sena* (una **n**, el seis) en [Ayrton Senna](${senna}) (dos **n**, el apellido), *senha* y *cena*. La lotería (1996) reusa el nombre del juego antiguo **Sena**, no el del piloto. 1994/1996 es calendario, no étimo.

## Patrocinios

Lat. *patronus* → *patrocinio* · ver [patrão](${patrao}). La ley reparte recaudación. El logo **no** cambia C(60,6) = 50.063.860. Esta ficha **no** está patrocinada.

## Veredicto

**Aprobado** — nombre + literacia de patrocinio. Cierre: [¡Valeu !!!](${mantra}) fuera de la cola.

[▶ Palabras](${hub}) · [▶ 14](${catorze}) · [▶ Riesgo](${risco})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildMegaSenaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMegaSenaBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : pickOrder('inspecao-palavra-mega-sena', 262);
  return makePalavra({
    title: 'Inspeção: Mega-Sena — o nome (mega + sena) e os patrocínios',
    titleEn: 'Inspection: Mega-Sena — the name (mega + sena) and sponsorships',
    titleEs: 'Inspección: Mega-Sena — el nombre (mega + sena) y los patrocinios',
    excerpt:
      'Palavras: Mega-Sena — nome mega + sena (seis); ≠ Senna (Ayrton, dois n); patrocínios ≠ sorte; Valeu !!!',
    excerptEn:
      'Words: Mega-Sena — mega + sena (six); ≠ Ayrton Senna (two n); sponsorships ≠ luck; Valeu !!!',
    excerptEs:
      'Palabras: Mega-Sena — mega + sena (seis); ≠ Ayrton Senna (dos n); patrocinios ≠ suerte; ¡Valeu !!!',
    slug: 'inspecao-palavra-mega-sena',
    date: '2026-08-23T13:40:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Mega-Sena · nome · patrocínios',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = { buildMegaSenaPost, buildMegaSenaBodies };
