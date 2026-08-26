'use strict';

/**
 * Inspeção Palavras · inserção / inserir
 * Derivação: verbo inserir + -ção → nome inserção
 * Étimo: lat. inserere (in- + serere «juntar») → insertiō
 * Cortes: ≠ inseto · ≠ upsert · ≠ INSERT SQL
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/insercao-palavra-cover.jpg';
const WIKI = 'https://pt.wiktionary.org/wiki/inser%C3%A7%C3%A3o';
const WIKI_V = 'https://pt.wiktionary.org/wiki/inserir';
const WIKI_LAT = 'https://en.wiktionary.org/wiki/inserere#Latin';
const WIKI_LAT_N = 'https://en.wiktionary.org/wiki/insertio#Latin';
const WIKI_CAO = 'https://pt.wiktionary.org/wiki/-%C3%A7%C3%A3o';
const WIKI_DER = 'https://pt.wikipedia.org/wiki/Deriva%C3%A7%C3%A3o_%28lingu%C3%ADstica%29';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const taken = new Set(
      posts
        .filter((p) => p.series === 'palavras-origem')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    const max = taken.size ? Math.max.apply(null, Array.from(taken)) : start - 1;
    seriesOrder = Math.max(start, max + 1);
    while (taken.has(seriesOrder) && seriesOrder < 500) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildInsercaoBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const self = '/posts/post-inspecao-palavra-insercao.html';
  const acao = '/posts/post-inspecao-palavra-acao.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const upsert = '/posts/post-inspecao-palavra-upsert.html';
  const inseto = '/posts/post-inspecao-palavra-inseto.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial do par **[inserir](${WIKI_V}) → [inserção](${self})** — **derivação** de verbo a nome pelo sufixo **[-ção](${WIKI_CAO})**. Pedido de campo: *derivação de inserção inserir*. [Étimo](${etimo}): latim *inserere* (*in-* + *serere*, «juntar, entrançar») → particípio *insertus* → *insertiō*. No lab: o **verbo** é o [gesto](${gesto}) de meter para dentro; o **nome** é o acto (ou o resultado) já nomeado. Fecho: [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · inserção](${WIKI}), [inserir](${WIKI_V}), lat. [*inserere*](${WIKI_LAT}), [*insertiō*](${WIKI_LAT_N}), [derivação](${WIKI_DER}). **Ficha de palavra ≠ tutorial SQL, ≠ manual de upsert, ≠ ficha de [inseto](${inseto}).** Tom: [verdade](${verdade}) da morfologia.

**Gatilho:** *inserir* / *inserção* / *insercao* / *insert* / *insertar* / *inserido* → lema **inserção** (par com **inserir**).

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Par | **inserir** (verbo) → **inserção** (nome) |
| Classe | Verbo 3.ª (-ir) · substantivo feminino |
| [Étimo](${etimo}) (trabalho) | Lat. *inserere* ← *in-* + *serere* («juntar») · nome lat. *insertiō* ← *insertus* + *-tiō* — confiança: **alta** |
| Máquina PT | radical *inser-* + sufixo **-ção** (lat. *-tiō*) — a mesma peça de [ação](${acao}) / [conjugação](${conjugacao}) |
| Família | *inserido* · *inserto* · *insertar* (mais ES) · ing. *insert* / *insertion* |
| Cognatos | esp. *inserir* / *inserción* · fr. *insérer* / *insertion* · it. *inserire* / *inserzione* |
| Tipo BudGanja | Palavra — derivação × gesto × nome do acto |
| Cortes | **[inseto](${inseto})** (*insecāre*, cortar) · **[upsert](${upsert})** (update+insert) · \`INSERT\` de SQL |
| Elo ofício | [gesto](${gesto}) · [ação](${acao}) · [caminho](${caminho}) · [língua portuguesa](${lingua}) |
| Elo método | [étimo](${etimo}) · [etimologia](${etimologia}) · [conjugação](${conjugacao}) · [aglutinação](${aglutinacao}) |
| Fonte | [inserção](${WIKI}) · [inserir](${WIKI_V}) |
| Data | ${inspected} |

**O que é o objecto:** não uma palavra só — **o passo** do verbo ao nome. *Inserir* faz; *inserção* **nomeia** o fazer (e, por metonímia, o que ficou dentro).

## 2. Hipóteses e método

**H1:** sincronicamente, *inserção* = *inserir* + **-ção** (o *-ir* cai; o sufixo cola no radical).  
**H2:** diacronicamente, o nome já vem do latim *insertiō* (não foi inventado ontem no português). As duas leituras **não se contradizem**.  
**H3:** *serere* «juntar» ≠ *secāre* «cortar» — [inseto](${inseto}) é **falsa cola da orelha**.  
**H4:** [upsert](${upsert}) usa o *insert* inglês no portmanteau; **esta** ficha fica no par PT.  
**H5:** [Valeu !!!](${mantra}) fecha o gesto de inserir a ficha — sem tutorial de base de dados.

Passos: (1) par e étimo; (2) a máquina *-ção*; (3) cortes; (4) rede; (5) limites.

## 3. Origens

| Hipótese | Leitura | Confiança |
|----------|---------|-----------|
| Lat. *inserere* | *in-* («para dentro») + *serere* («juntar, entrançar») | Alta |
| Lat. *insertiō* | Nome de acção ← *insertus* (particípio) + *-tiō* | Alta |
| PT **-ção** | Herdeiro de *-tiō* — [ação](${acao}), [conjugação](${conjugacao}), inserção | Alta |
| Ing. *insert* / *insertion* | Cognato, não étimo do português | Alta (paralelo) |
| Esp. *inserción* | Irmã romance — o *c* marca o *t* latino | Alta |

**Veredicto etimológico:** origem **latina** fechada. Gloss de campo: «meter para dentro e juntar». O que esta ficha inspeciona é a **derivação** — o passo verbo → nome — não o SQL.

**Duas *serere* latinas (não fundir):** *serere / sēvī / satum* = semear; *serere / seruī / sertum* = juntar. *Inserere* puxa a segunda (entrançar para dentro). A leitura de sementeira fica **imagem de lab**, não étimo.

## 4. A máquina -ção

| Peça | Função | Exemplo |
|------|--------|---------|
| **inserir** | Verbo — o [gesto](${gesto}) | inserir a ficha; inserir a estaca |
| radical *inser-* | O que resta quando cai *-ir* | inser- |
| **-ção** | Sufixo de **acto / resultado** (lat. *-tiō*) | inserção · [ação](${acao}) · [conjugação](${conjugacao}) |
| **inserção** | Nome — o fazer nomeado, ou o que ficou dentro | «a inserção da palavra»; «ponto de inserção» |

**Regra sincrónica:** verbo de ofício + *-ção* → nome do ofício. Irmãs de máquina: *agir* → [ação](${acao}); *conjugar* → [conjugação](${conjugacao}); *inspirar* → inspiração.

**Não é [aglutinação](${aglutinacao}):** não se fundem duas palavras livres (*planalto*). Aqui cola-se um **sufixo** a um radical. Derivação ≠ composição.

## 5. Cortes (salas vizinhas)

| Termo | Papel | Corte |
|-------|-------|-------|
| **inserir / inserção** | Par desta ficha | Verbo e nome do meter-para-dentro |
| **[Inseto](${inseto})** | *insectum* ← *insecāre* («cortar em») | Orelha cola *inser-* / *inse-*; étimos **opostos** (juntar × cortar) |
| **[Upsert](${upsert})** | EN *update*+*insert* · nome nosso *opsert* | Usa *insert*; **não** inspeciona a derivação PT |
| **INSERT** (SQL) | Comando de base | Outra sala — ficha ≠ tutorial |
| **impressão** | *imprimere* (apertar) | Outro *in-* + *-ção* |

**Regra:** se a orelha ouvir *inseto*, voltar ao *serere* «juntar». Se o disco pedir \`upsert-*.js\`, ir à ficha [upsert](${upsert}). Se a mão **meter a palavra no catálogo**, esta é a ficha.

## 6. Usos e finalidade

| Uso / finalidade | No mundo | No BudGanja |
|------------------|----------|-------------|
| **Gesto** | Meter para dentro | [Inserir](${WIKI_V}) a ficha, a estaca, o elo |
| **Nome do acto** | «fazer a inserção» | *Inserção* = [ação](${acao}) já baptizada |
| **Resultado** | O que ficou inserido | Palavra no [guia](${guia}); rasto no [caminho](${caminho}) |
| **Morfologia** | Estudar *-ção* | Esta derivação como exemplo vivo |
| **Fechar** | Depois de meter | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** mostrar a **derivação** *inserir → inserção* para a mão não confundir o gesto com o bicho, nem o nome PT com o portmanteau EN.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| **inserir** | O [gesto](${gesto}) — meter para dentro |
| **inserção** | O nome do acto / do resultado |
| [ação](${acao}) | Irmã de *-ção* — o fazer nomeado em geral |
| [conjugação](${conjugacao}) | Outra *-ção* de ofício gramatical |
| [upsert](${upsert}) | Sala EN — MERGE; *insert* é peça, não o par PT |
| [inseto](${inseto}) | Falsa cola — *secāre*, não *serere* |
| [aglutinação](${aglutinacao}) | Outra máquina (fusão de palavras) — ≠ sufixo |
| [étimo](${etimo}) · [etimologia](${etimologia}) | Peça *inserere* · ofício de a procurar |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Catálogo |
| [Valeu !!!](${mantra}) | Fecho depois da inserção |

### Como ler

1. Entrar pelo **verbo** (*inserir*) ou pelo **nome** (*inserção*) — é o **mesmo** par.  
2. Se vier pelo [upsert](${upsert}), ficar no MERGE; voltar cá só para o étimo PT.  
3. Se a orelha colar [inseto](${inseto}), cortar: juntar ≠ cortar.  
4. Fechar com [Valeu !!!](${mantra}).  
5. Voltar ao [hub](${hub}).

## 8. Limites

- Não é tutorial de \`INSERT INTO\`.  
- Não substitui a ficha [upsert](${upsert}).  
- Não inventaria todos os nomes em *-ção*.  
- Não é a ficha [inseto](${inseto}).

## Status

**Aprovado** — par **inserir / inserção** fichado: derivação *-ção*, étimo *inserere* / *insertiō*, cortes **[inseto](${inseto})** e **[upsert](${upsert})**; [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Inserir](${WIKI_V}) · [▶ Ação](${acao}) · [▶ Gesto](${gesto}) · [▶ Upsert](${upsert}) · [▶ Inseto](${inseto}) · [▶ Valeu !!!](${mantra}) · [▶ Guia](${guia})
`;

  const contentEn = `## Scope

Editorial inspection of the Portuguese pair **inserir** (verb) → **inserção** (noun) — **derivation** by the suffix **-ção** (Lat. *-tiō*). Field request: inspect the derivation *inserção / inserir*. Etymon: Lat. *inserere* (*in-* + *serere*, “to join”) → *insertiō*. In the lab: the verb is the [gesture](${gesto}) of putting in; the noun names the act (or the result). Close: [Valeu !!!](${mantra}).

> Method note: [Wiktionary · inserção](${WIKI}), [inserir](${WIKI_V}), Lat. [*inserere*](${WIKI_LAT}). Word sheet ≠ SQL tutorial, ≠ [upsert](${upsert}) sheet, ≠ [insect](${inseto}).

## Object

| Field | Value |
|-------|-------|
| Pair | **inserir** (verb) → **inserção** (noun) |
| Etymon | Lat. *inserere* ← *in-* + *serere* (“to join”); noun *insertiō* (high confidence) |
| PT machine | stem *inser-* + **-ção** — same piece as [ação](${acao}) |
| Cuts | ≠ [inseto](${inseto}) (*insecāre*, to cut) · ≠ [upsert](${upsert}) · ≠ SQL \`INSERT\` |
| Links | [gesto](${gesto}) · [ação](${acao}) · [upsert](${upsert}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

**Cut:** [inseto](${inseto}) is “cut into”; **inserção** is “join into.” [Upsert](${upsert}) keeps the English merge verb.

## Status

**Approved** — *inserere* path documented; derivation *inserir → inserção* cut from insect and from upsert.

[▶ Words](${hub}) · [▶ Ação](${acao}) · [▶ Upsert](${upsert}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del par portugués **inserir** (verbo) → **inserção** (nombre) — **derivación** por el sufijo **-ção** (lat. *-tiō*). Pedido de campo: inspeccionar la derivación *inserção / inserir*. Étimo: lat. *inserere* (*in-* + *serere*, «juntar») → *insertiō*. En el lab: el verbo es el [gesto](${gesto}) de meter dentro; el nombre nombra el acto (o el resultado). Cierre: [¡Valeu !!!](${mantra}).

> Nota: [Wikcionario · inserção](${WIKI}), [inserir](${WIKI_V}), lat. [*inserere*](${WIKI_LAT}). Ficha ≠ tutorial SQL, ≠ ficha [upsert](${upsert}), ≠ [insecto](${inseto}).

## Objeto

| Campo | Valor |
|-------|-------|
| Par | **inserir** (verbo) → **inserção** (nombre) |
| Étimo | Lat. *inserere* ← *in-* + *serere* («juntar»); nombre *insertiō* (confianza alta) |
| Máquina PT | radical *inser-* + **-ção** — la misma pieza de [ação](${acao}) |
| Cortes | ≠ [inseto](${inseto}) (*insecāre*, cortar) · ≠ [upsert](${upsert}) · ≠ SQL \`INSERT\` |
| Vínculos | [gesto](${gesto}) · [ação](${acao}) · [upsert](${upsert}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

**Corte:** el [inseto](${inseto}) «corta en»; la **inserção** «junta hacia dentro». [Upsert](${upsert}) se queda con el verbo inglés de MERGE.

## Estado

**Aprobada** — vía *inserere* documentada; derivación *inserir → inserção* cortada del insecto y del upsert.

[▶ Palabras](${hub}) · [▶ Ação](${acao}) · [▶ Upsert](${upsert}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKI };
}

function buildInsercaoPost() {
  const { body, contentEn, contentEs, wiki } = buildInsercaoBodies();
  const seriesOrder = pickOrder('inspecao-palavra-insercao', 292);

  return makePalavra({
    title: 'Inspeção: Inserção — derivação de inserir (-ção), o gesto e o nome',
    titleEn: 'Inspection: Inserção — derivation from inserir (-ção), the gesture and the name',
    titleEs: 'Inspección: Inserção — derivación de inserir (-ção), el gesto y el nombre',
    excerpt:
      'Palavras: inserir → inserção — étimo lat. inserere / insertiō; sufixo -ção; ≠ inseto ≠ upsert; Valeu !!!',
    excerptEn:
      'Words: inserir → inserção — etymon Lat. inserere / insertiō; suffix -ção; ≠ insect ≠ upsert; Valeu !!!',
    excerptEs:
      'Palabras: inserir → inserção — étimo lat. inserere / insertiō; sufijo -ção; ≠ insecto ≠ upsert; ¡Valeu !!!',
    slug: 'inspecao-palavra-insercao',
    date: '2026-08-24T14:52:00.000Z',
    seriesOrder,
    seriesLabel: 'Inserção · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildInsercaoPost,
  buildInsercaoBodies
};
