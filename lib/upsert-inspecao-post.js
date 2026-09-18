'use strict';

/**
 * Inspeção Palavras · upsert
 * Eixos: portmanteau EN update+insert · identidade (chave/slug) ·
 * MERGE / ON CONFLICT · gesto lab upsertPost · ≠ replace ·
 * elo commitar · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/upsert-palavra-cover.jpg';
const WIKT = 'https://en.wiktionary.org/wiki/upsert';
const WIKI_MERGE = 'https://en.wikipedia.org/wiki/Merge_(SQL)';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8'));
    const existing = posts.find((p) => p.slug === slug);
    if (existing && typeof existing.seriesOrder === 'number') return existing.seriesOrder;
    const taken = new Set(posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number'));
    while (taken.has(seriesOrder) && seriesOrder < 320) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function buildUpsertBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const self = '/posts/post-inspecao-palavra-upsert.html';
  const commitar = '/posts/post-inspecao-palavra-commitar.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const exit = '/posts/post-inspecao-palavra-exit.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';

  const body = `## Escopo

Inspeção editorial da palavra **[upsert](${self})** — portmanteau inglês de *update* + *insert*. No ofício de bases de dados: **inserir se a identidade ainda não existe; actualizar se já existe**. Pedido de campo e ironia do lab: os scripts da casa chamam-se \`upsert-palavra-*.js\` — esta ficha entra no catálogo **pelo gesto que nomeia**. Cobre o **lema**, o mapa **INSERT × UPDATE × UPSERT × MERGE × REPLACE**, o calco BR **upsertar**, o elo [commitar](${commitar}) (gravar o snapshot **depois** do merge) e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}), uso BR de oficina. **Ficha ≠ tutorial SQL, ≠ receita de corrida, ≠ licença para overwrite silencioso.** Tom: Inspetor BudGanja — *upsert* é [gesto](${gesto}) de **identidade**, não botão mágico.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **upsert** (EN; substantivo / verbo) |
| Calco BR | **upsertar** (como [commitar](${commitar})) — «fazer upsert» |
| Classe | Empréstimo de ofício (bases de dados, APIs, catálogos) |
| Étimo (trabalho) | Portmanteau *update* + *insert* (jargão EN, séc. XX–XXI) — confiança: **alta** no blend; **média** na data exacta do primeiro uso |
| Família | *upsert* · *upsertar* · SQL *MERGE* · *ON CONFLICT* · *ON DUPLICATE KEY* |
| Falsos irmãos | *upar* (games, «subir de nível») · *replace* (apagar + inserir — outra política) · [commitar](${commitar}) (snapshot git — **depois**) |
| Tipo BudGanja | Palavra — identidade × merge inspeccionável |
| Elo rasto | [commitar](${commitar}) — gravar o que ficou depois do merge |
| Elo molde | [pattern](${pattern}) — *upsert* é um *pattern* de dados, não lei natural |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [skill](${skill}) · [Grok](${grok}) |
| Elo língua | [língua portuguesa](${lingua}) — empréstimo vivo; PT nativo = *inserir ou actualizar* |
| Fonte | [upsert](${WIKT}) · [MERGE](${WIKI_MERGE}) |
| Data | ${inspected} |

**Objecto:** o vocábulo de **não duplicar a identidade**. A chave (id, slug, *primary key*) decide o ramo: novo → insert; já lá → update. Não é «gravar no git». Não é «apagar e pôr outro».

## 2. Hipóteses e método

**H1:** *upsert* é **blend de ofício**, não herança latina — *update* + *insert* colados na boca da base de dados.  
**H2:** o que parece um botão único **é uma política de conflito**: o que fazer quando a chave já existe.  
**H3:** *MERGE* (SQL:2003) é o nome-norma; *upsert* é o nome de oficina (PostgreSQL, MongoDB, APIs).  
**H4:** no lab BudGanja, \`upsertPost(posts, post)\` **é este gesto**: se o *slug* existe, actualiza; senão, insere no topo.  
**H5:** [commitar](${commitar}) vem **depois** — o upsert mistura o objecto; o commit grava o rasto.

Passos: blend EN → mapa SQL → calco BR → gesto lab (slug) → limites → [Valeu !!!](${mantra}).

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **INSERT** | Criar linha nova | Falha (ou ignora) se a chave já existe |
| **UPDATE** | Alterar linha existente | Zero linhas se a chave **não** existe |
| **UPSERT** | Insert **ou** update conforme a chave | Magia; *force* sem inspeccionar campos |
| **MERGE** | Nome ISO SQL do mesmo *pattern* | Outra palavra; mesmo ofício de conflito |
| **REPLACE** | Muitas vezes *delete* + *insert* | Pode **mudar** identidade (rowid); ≠ upsert |
| **[commitar](${commitar})** | Snapshot com mensagem | Não decide insert vs update |

**Irmãos de fluxo (não fundir):** upsert (identidade no catálogo) → [commitar](${commitar}) (rasto) → push / deploy — três gestos. Esta ficha é **só o primeiro**.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Botão único** | «Sempre funciona» | Política de chave + resolução de conflito |
| **Overwrite** | Substituir tudo | Merge **inspeccionável** — campos, não identidade |
| **Inglês no meio do PT** | Estrago da língua | Empréstimo de [ofício](${gesto}), como [skill](${skill}) e [commitar](${commitar}) |
| **upsertar** | Erro / anglicismo feio | Calco vivo do mesmo verbo |
| **Script \`upsert-*\`** | Nome interno de ficheiro | O lab **já pratica** o lema: ficha nova ou ficha actualizada, **um** slug |
| **Corrida** | Dois escritores, um vencedor | Sem [verdade](${verdade}) do conflito = [buguei](${buguei}) |

**H-parece:** *upsert* vende **idempotência fácil** — corre outra vez e está igual.  
**H-é:** só é fácil se a **chave** estiver certa e o merge **não apagar** o que importava.

**Veredicto contraste:** o que parece = um comando; o que é = **identidade + política**. Corrigir a palavra = nomear a chave (no lab: o *slug*).

## 5. Gesto BudGanja

No catálogo da casa, o *slug* é a chave. \`upsertPost\`:

1. Procurar a ficha pelo *slug*.  
2. Se existir: **actualizar** (mesclar campos; não criar segundo «upsert»).  
3. Se não existir: **inserir** (no lab, no topo da lista).  
4. Só depois: [commitar](${commitar}) o rasto — mensagem que diz o **porquê**.  
5. Se o merge sujar: [backspace](${backspace}) / [buguei](${buguei}) — **não** fingir que upsert = limpar.

### Ofício correcto (mapa curto)

1. Fixar a **identidade** (*slug*, id) **antes** de escrever.  
2. Declarar o conflito: actualizar o quê, preservar o quê.  
3. Upsertar **uma** ficha — não duas com o mesmo nome.  
4. [Commitar](${commitar}) o snapshot; fechar com [Valeu !!!](${mantra}).

**Veredicto correção:** **upsert ≠ overwrite silencioso.** No lab, *upsert* só vale com chave visível e merge com [verdade](${verdade}).

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Oficina / SQL** | «Faz upsert pela chave» | Bom: nomear o conflito · Mau: esconder o *ON CONFLICT* |
| **Calco** | «Vou upsertar a ficha» | Bom: ofício, como [commitar](${commitar}) · Mau: jargão sem chave |
| **API / doc** | *upsert: true* | Bom: política explícita · Mau: default que apaga campos |
| **Lab BudGanja** | \`upsert-palavra-upsert-inspecao.js\` | Bom: o script **é** o lema · Mau: duplicar slug |
| **Falso amigo** | «upar o personagem» | **Outra** palavra (games) |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[commitar](${commitar})** | Depois do merge: gravar o rasto; ≠ push/PR |
| [pattern](${pattern}) | *Upsert* é molde de dados — copiar cego é [risco no molde](${pattern}) |
| [skill](${skill}) · [Grok](${grok}) | Outros empréstimos de ofício |
| [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) | Como se upserta |
| [buguei](${buguei}) · [backspace](${backspace}) | Quando o merge trava / rever |
| [EXIT](${exit}) | Sair do aperto ≠ apagar a identidade |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [Vida](${vida}) · [Valeu !!!](${mantra}) | Índice e fecho |

## Limites

- Não ensina SQL, não autoriza corrida sem inspecção, não substitui *backup*.  
- Não trata *upar* de jogo nesta ficha.  
- *upsert* / *upsertar* / *MERGE* (norma SQL) = o mesmo ofício de conflito; *replace* e [commitar](${commitar}) ficam de fora.  
- Menção a *ON CONFLICT* / *ON DUPLICATE KEY* é **nome do *pattern***, não receita de ataque.

## Veredicto

**Aprovado na série Palavras** — *upsert* fichado como **portmanteau de identidade** (*update* + *insert*); calco **upsertar**; ≠ *replace* ≠ [commitar](${commitar}); o lab já pratica o gesto no *slug*; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ Skill](${skill}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[upsert](${self})** — English portmanteau of *update* + *insert*. In database craft: **insert if the identity is new; update if it already exists**. Lab irony: house scripts are named \`upsert-palavra-*.js\` — this sheet enters the catalogue **by the gesture it names**. Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}). **Sheet ≠ SQL tutorial or silent-overwrite licence.**

## Object

| Field | Value |
|-------|-------|
| Word | **upsert** / BR calque **upsertar** |
| Etymon | Blend *update* + *insert* — **high** confidence on the blend |
| False siblings | game *upar* · *replace* (delete+insert) · [commitar](${commitar}) (git snapshot **after**) |
| Links | [commitar](${commitar}) · [pattern](${pattern}) · [skill](${skill}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Offices

1. **INSERT** — new row; fails (or skips) if the key exists.  
2. **UPDATE** — existing row; zero rows if the key is missing.  
3. **UPSERT / MERGE** — insert **or** update by key; not magic overwrite.  
4. **REPLACE** — often delete+insert; identity may change — **not** this sheet.  
5. **[commitar](${commitar})** — snapshot **after** the merge.

**Lab:** \`upsertPost\` looks up the *slug* — update if present, insert if not — then [commitar](${commitar}) the trace.

**Seems:** one button that always works.  
**Is:** a **conflict policy** on identity. Upsert ≠ silent overwrite.

**Verdict:** blend approved; [Valeu !!!](${mantra}) after a visible key.

[▶ Words](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[upsert](${self})** — portmanteau inglés de *update* + *insert*. Oficio de bases de datos: **insertar si la identidad es nueva; actualizar si ya existe**. Ironía del lab: los scripts se llaman \`upsert-palavra-*.js\` — esta ficha entra al catálogo **por el gesto que nombra**. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}). **Ficha ≠ tutorial SQL ni licencia de overwrite silencioso.**

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **upsert** / calco BR **upsertar** |
| Étimo | Blend *update* + *insert* — confianza **alta** en el cruce |
| Falsos hermanos | *upar* (juegos) · *replace* (borrar+insertar) · [commitar](${commitar}) (snapshot **después**) |
| Vínculos | [commitar](${commitar}) · [pattern](${pattern}) · [skill](${skill}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Oficios

1. **INSERT** — fila nueva; falla (u omite) si la clave existe.  
2. **UPDATE** — fila existente; cero filas si la clave falta.  
3. **UPSERT / MERGE** — insertar **o** actualizar por clave; no magia.  
4. **REPLACE** — a menudo borrar+insertar; la identidad puede cambiar.  
5. **[commitar](${commitar})** — instantánea **después** del merge.

**Lab:** \`upsertPost\` busca el *slug* — actualiza si está, inserta si no — luego [commitar](${commitar}) el rastro.

**Parece:** un botón que siempre funciona.  
**Es:** una **política de conflicto** sobre la identidad. Upsert ≠ overwrite silencioso.

**Veredicto:** blend aprobado; [¡Valeu !!!](${mantra}) con la clave visible.

[▶ Palabras](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildUpsertPost() {
  const { body, contentEn, contentEs, wiki } = buildUpsertBodies();
  const seriesOrder = pickOrder('inspecao-palavra-upsert', 199);

  return makePalavra({
    title: 'Inspeção: Upsert — inserir ou actualizar sem duplicar a identidade',
    titleEn: 'Inspection: Upsert — insert or update without duplicating identity',
    titleEs: 'Inspección: Upsert — insertar o actualizar sin duplicar la identidad',
    excerpt:
      'Palavras: «upsert» (update+insert) — chave/slug; MERGE ≠ replace; calco upsertar; elo commitar; o lab já pratica o gesto; Valeu !!!',
    excerptEn:
      'Words: “upsert” (update+insert) — key/slug; MERGE ≠ replace; BR calque upsertar; link commitar; the lab already does the gesture; Valeu !!!',
    excerptEs:
      'Palabras: «upsert» (update+insert) — clave/slug; MERGE ≠ replace; calco upsertar; vínculo commitar; el lab ya practica el gesto; ¡Valeu !!!',
    slug: 'inspecao-palavra-upsert',
    date: '2026-08-22T05:48:00.000Z',
    seriesOrder,
    seriesLabel: 'Upsert · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildUpsertPost,
  buildUpsertBodies
};
