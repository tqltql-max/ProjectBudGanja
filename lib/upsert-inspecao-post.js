'use strict';

/**
 * Inspeção Palavras · upsert
 * Eixos: portmanteau EN update+insert · nome nosso opsert ·
 * identidade (chave/slug) · MERGE / ON CONFLICT · gesto lab ·
 * ≠ replace · elo commitar · Valeu !!!
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

Inspeção editorial da palavra **[upsert](${self})** — portmanteau inglês de *update* + *insert*. No ofício: **inserir se a identidade ainda não existe; actualizar se já existe**. Pedido de campo: o lab **quer o gesto** e precisa de **nome nosso**. Nome de ofício: **opsert** (verbo **opsertar**; fecho **Opsert.**). Boca BR do lema EN: o *u* abre em *o* — como [commitar](${commitar}) tomou o git. As **mãos** do gesto (plural — *mãos à obra*, não *mão à obra*): **levante** o que já está; **insira** o que ainda não está (pedido *levante e insiera*). Os scripts da casa continuam \`upsert-*.js\` (lema EN no disco). Calco **upsertar** fica no mapa; **não** é a fala. Fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}), boca de oficina BR. **Ficha ≠ tutorial SQL, ≠ receita de corrida, ≠ licença para overwrite silencioso.** Tom: Inspetor BudGanja — *upsert* é o lema EN; **opsert** é o [gesto](${gesto}) de **identidade**.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora (EN) | **upsert** (substantivo / verbo de oficina) |
| Nome nosso | **opsert** — verbo **opsertar** · fecho **Opsert.** |
| Grafia viva | *opsert* (pedido de campo) — o **mesmo** objecto que *upsert*, boca BR |
| Mãos | **mãos à obra** (plural) — **levante** o que já está; **insira** o novo — lapso de campo *insiera* |
| Calco BR | **upsertar** — anglicismo de oficina; **não** é a voz viva |
| Classe | Empréstimo EN + nome nosso de ofício |
| Étimo (trabalho) | EN *update*+*insert* (confiança **alta**). BR **opsert**: o *u* abre em *o* na boca da oficina — confiança **alta** no gesto; **média** na grafia ainda nova |
| Família | *upsert* · *opsert* · *opsertar* · *Opsert.* · *mãos à obra* · *upsertar* (calco) · SQL *MERGE* |
| Falsos irmãos | *upar* (games) · *replace* (apagar + inserir) · *fundir* (derreter dois num) · [commitar](${commitar}) (snapshot **depois**) |
| Tipo BudGanja | Palavra — identidade × sítio único |
| Elo rasto | [commitar](${commitar}) — gravar o que ficou **depois** do opsert |
| Elo molde | [pattern](${pattern}) — o molde EN chama-se *upsert*; o gesto chama-se opsert |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [skill](${skill}) · [Grok](${grok}) |
| Elo língua | [língua portuguesa](${lingua}) — nome nosso *opsert*; EN no ficheiro |
| Fonte | [upsert](${WIKT}) · [MERGE](${WIKI_MERGE}) |
| Data | ${inspected} |

**Objecto:** o vocábulo EN de **não duplicar a identidade** — e o nome nosso **opsert**. A chave (id, slug) decide o ramo: novo → **insira**; já lá → **levante**. Não é «gravar no git». Não é «apagar e pôr outro». Não é abrir segunda ficha com o mesmo nome.

## 2. Hipóteses e método

**H1:** *upsert* é **blend de ofício EN**, não herança latina — *update* + *insert* colados na boca da base de dados.  
**H2:** o que parece um botão único **é uma política de conflito**: o que fazer quando a chave já existe.  
**H3:** *MERGE* (SQL:2003) é o nome-norma; *upsert* é o nome de oficina EN; **opsert** é o nome BudGanja (boca BR do mesmo lema).  
**H4:** no lab, \`upsertPost(posts, post)\` **é opsertar**: se o *slug* existe, levanta (actualiza); senão, insere no topo.  
**H5:** [commitar](${commitar}) vem **depois** — o opsert mistura o objecto; o commit grava o rasto.  
**H6:** *upsertar* é calco do EN. O lab **não** o elege como voz viva: elege **opsert**.  
**H7:** *levante e insiera* (campo) são as **mãos** do mesmo gesto — não um segundo nome.  
**H8:** o grito é **mãos à obra** (plural). *Mão à obra* (uma) é calco vivo; o ofício usa **as duas**.

Passos: blend EN → nome nosso (**opsert**) → mãos à obra → mapa SQL → gesto lab (slug) → limites → [Valeu !!!](${mantra}).

## 3. Ofícios (não misturar)

| Ofício | O que é | O que **não** é |
|--------|---------|-----------------|
| **INSERT** | Criar linha nova | Falha (ou ignora) se a chave já existe |
| **UPDATE** | Alterar linha existente | Zero linhas se a chave **não** existe |
| **UPSERT** | Insert **ou** update conforme a chave | Magia; *force* sem inspeccionar campos |
| **Opsert** | Nome nosso do mesmo gesto | *Fundir* (derreter dois) · *replace* (arrancar a cadeira) |
| **Mãos à obra** | Grito plural do mesmo gesto (*insiera* no ouvido) | *Mão à obra* (uma só) — mapa, não fala |
| **MERGE** | Nome ISO SQL do mesmo *pattern* | Outra palavra EN; mesmo ofício de conflito |
| **REPLACE** | Muitas vezes *delete* + *insert* | Pode **mudar** identidade (rowid); ≠ upsert |
| **[commitar](${commitar})** | Snapshot com mensagem | Não decide insert vs update |

**Irmãos de fluxo (não fundir):** opsert (identidade no catálogo) → [commitar](${commitar}) (rasto) → push / deploy — três gestos. Esta ficha é **só o primeiro**.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Botão único** | «Sempre funciona» | Política de chave + resolução de conflito |
| **Overwrite** | Substituir tudo | Merge **inspeccionável** — campos, não identidade |
| **Inglês no meio do PT** | Estrago da língua | Lema EN no ficheiro (\`upsert-*\`); voz viva = **opsert** |
| **upsertar** | Nome nosso | Calco de oficina — fica no mapa; **não** é a fala do lab |
| **opsert** | Erro de digitação de *upsert* | Nome nosso: boca BR do lema, como [commitar](${commitar}) |
| **Script \`upsert-*\`** | Nome interno de ficheiro | O lab **já pratica** o lema EN no disco e **opserta** no catálogo: um *slug* |
| **Corrida** | Dois escritores, um vencedor | Sem [verdade](${verdade}) do conflito = [buguei](${buguei}) |

**H-parece:** *upsert* vende **idempotência fácil** — corre outra vez e está igual.  
**H-é:** só é fácil se a **chave** estiver certa e o merge **não apagar** o que importava.

**Veredicto contraste:** o que parece = um comando EN; o que é = **identidade + política**. Corrigir a palavra = nomear a chave (no lab: o *slug*) e **opsertar**.

## 5. Gesto BudGanja

No catálogo da casa, o *slug* é a chave. Dizemos **opsert**. \`upsertPost\`:

1. Procurar a ficha pelo *slug*.  
2. Se existir: **levantar** (actualizar; não criar segunda ficha).  
3. Se não existir: **inserir** (no lab, no topo da lista).  
4. Só depois: [commitar](${commitar}) o rasto — mensagem que diz o **porquê**.  
5. Se o merge sujar: [backspace](${backspace}) / [buguei](${buguei}) — **não** fingir que opsert = limpar.

### Ofício correcto (mapa curto)

1. Fixar a **identidade** (*slug*, id) **antes** de escrever.  
2. Declarar o conflito: actualizar o quê, preservar o quê.  
3. Opsertar **uma** ficha — não duas com o mesmo nome. **Mãos à obra.**  
4. [Commitar](${commitar}) o snapshot; fechar com [Valeu !!!](${mantra}) — **Opsert.**

**Veredicto correção:** **opsert ≠ overwrite silencioso.** No lab, o gesto só vale com chave visível e merge com [verdade](${verdade}).

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Nome nosso** | «Vou opsertar a ficha» · **Opsert.** | Bom: voz do lab · Mau: opsert sem chave |
| **Mãos** | «Mãos à obra» · «levante e insira» (*insiera*) | Bom: plural, as duas · Mau: *mão à obra* como se fosse uma só |
| **Oficina / SQL** | «Faz upsert pela chave» | Bom: nomear o lema EN · Mau: esconder o *ON CONFLICT* |
| **Calco** | «Vou upsertar a ficha» | Bom: mapear o anglicismo · Mau: usar como se fosse o nome nosso |
| **API / doc** | *upsert: true* | Bom: política explícita · Mau: default que apaga campos |
| **Lab BudGanja** | \`upsert-palavra-upsert-inspecao.js\` | Bom: ficheiro EN + gesto **opsert** · Mau: duplicar slug |
| **Falso amigo** | «upar o personagem» · «fundir duas fichas» | **Outras** palavras |

## Rede aparentada

| Recurso | Relação |
|---------|---------|
| **[commitar](${commitar})** | Depois do merge: gravar o rasto; ≠ push/PR |
| [pattern](${pattern}) | *Upsert* é molde de dados — copiar cego é [risco no molde](${pattern}) |
| [skill](${skill}) · [Grok](${grok}) | Outros empréstimos de ofício |
| [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) | Como se opserta |
| [buguei](${buguei}) · [backspace](${backspace}) | Quando o merge trava / rever |
| [EXIT](${exit}) | Sair do aperto ≠ apagar a identidade |
| [língua portuguesa](${lingua}) · [Guia](${guia}) · [Vida](${vida}) · [Valeu !!!](${mantra}) | Índice e fecho |

## Limites

- Não ensina SQL, não autoriza corrida sem inspecção, não substitui *backup*.  
- Não trata *upar* de jogo nesta ficha.  
- *upsert* (lema EN) / **opsert** (nome nosso) / *upsertar* (calco) / *MERGE* (norma SQL) = o mesmo ofício de conflito; *replace* e [commitar](${commitar}) ficam de fora.  
- Menção a *ON CONFLICT* / *ON DUPLICATE KEY* é **nome do *pattern***, não receita de ataque.

## Veredicto

**Aprovado na série Palavras** — *upsert* fichado como **portmanteau de identidade**; nome nosso **opsert** / **Opsert.**; grito **mãos à obra** (plural); ramos *levante e insira*; calco *upsertar* no mapa, não na fala; ≠ *replace* ≠ [commitar](${commitar}); o lab já opserta no *slug*; fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ Skill](${skill}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[upsert](${self})** — English portmanteau of *update* + *insert*. Lab living name: **opsert** (verb **opsertar**; close **Opsert.**). Craft cry: **mãos à obra** (plural — both hands; not *mão à obra*). Two branches of the same gesture: **raise** what is already there; **insert** what is not. House files stay \`upsert-*.js\`. Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}). **Sheet ≠ SQL tutorial or silent-overwrite licence.**

## Object

| Field | Value |
|-------|-------|
| EN lemma | **upsert** |
| Lab name | **opsert** / **opsertar** / **Opsert.** |
| Hands | **mãos à obra** (plural) — raise and insert |
| BR calque | **upsertar** — map only, not lab speech |
| Etymon | Blend *update* + *insert* — **high** confidence |
| False siblings | game *upar* · *replace* · [commitar](${commitar}) (snapshot **after**) |
| Links | [commitar](${commitar}) · [pattern](${pattern}) · [skill](${skill}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## Offices

1. **INSERT** — new row; fails (or skips) if the key exists.  
2. **UPDATE** — existing row; zero rows if the key is missing.  
3. **UPSERT / MERGE / opsert** — insert **or** update by key; not magic overwrite.  
4. **REPLACE** — often delete+insert; identity may change — **not** this sheet.  
5. **[commitar](${commitar})** — snapshot **after** the merge.

**Lab:** \`upsertPost\` looks up the *slug* — update if present, insert if not — then [commitar](${commitar}) the trace. Cry: **Mãos à obra.**

**Seems:** one button that always works.  
**Is:** a **conflict policy** on identity. Opsert ≠ silent overwrite.

**Verdict:** living name **opsert** approved; [Valeu !!!](${mantra}) after a visible key.

[▶ Words](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[upsert](${self})** — portmanteau inglés de *update* + *insert*. Nombre vivo del lab: **opsert** (verbo **opsertar**; cierre **Opsert.**). Grito: **mãos à obra** (plural — las dos manos; no *mão à obra*). Dos ramas del mismo gesto: **levantar** lo que ya está; **insertar** lo que no. Los ficheros siguen \`upsert-*.js\`. Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wiktionary · upsert](${WIKT}), [MERGE (SQL)](${WIKI_MERGE}). **Ficha ≠ tutorial SQL ni licencia de overwrite silencioso.**

## Objeto

| Campo | Valor |
|-------|-------|
| Lema EN | **upsert** |
| Nombre del lab | **opsert** / **opsertar** / **Opsert.** |
| Manos | **mãos à obra** (plural) — levantar e insertar |
| Calco BR | **upsertar** — mapa, no habla del lab |
| Étimo | Blend *update* + *insert* — confianza **alta** |
| Falsos hermanos | *upar* · *replace* · [commitar](${commitar}) (snapshot **después**) |
| Vínculos | [commitar](${commitar}) · [pattern](${pattern}) · [skill](${skill}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## Oficios

1. **INSERT** — fila nueva; falla (u omite) si la clave existe.  
2. **UPDATE** — fila existente; cero filas si la clave falta.  
3. **UPSERT / MERGE / opsert** — insertar **o** actualizar por clave; no magia.  
4. **REPLACE** — a menudo borrar+insertar; la identidad puede cambiar.  
5. **[commitar](${commitar})** — instantánea **después** del merge.

**Lab:** \`upsertPost\` busca el *slug* — actualiza si está, inserta si no — luego [commitar](${commitar}) el rastro. Grito: **Mãos à obra.**

**Parece:** un botón que siempre funciona.  
**Es:** una **política de conflicto** sobre la identidad. Opsert ≠ overwrite silencioso.

**Veredicto:** nombre vivo **opsert** aprobado; [¡Valeu !!!](${mantra}) con la clave visible.

[▶ Palabras](${hub}) · [▶ Commitar](${commitar}) · [▶ Pattern](${pattern}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildUpsertPost() {
  const { body, contentEn, contentEs, wiki } = buildUpsertBodies();
  const seriesOrder = pickOrder('inspecao-palavra-upsert', 199);

  return makePalavra({
    title: 'Inspeção: Opsert — inserir ou actualizar sem duplicar a identidade',
    titleEn: 'Inspection: Opsert — insert or update without duplicating identity',
    titleEs: 'Inspección: Opsert — insertar o actualizar sin duplicar la identidad',
    excerpt:
      'Palavras: opsert (boca BR de upsert) — mãos à obra (plural); chave/slug; MERGE ≠ replace; calco upsertar; elo commitar; Valeu !!!',
    excerptEn:
      'Words: opsert (BR mouth of upsert) — mãos à obra (plural); key/slug; MERGE ≠ replace; calque upsertar; link commitar; Valeu !!!',
    excerptEs:
      'Palabras: opsert (boca BR de upsert) — mãos à obra (plural); clave/slug; MERGE ≠ replace; calco upsertar; vínculo commitar; ¡Valeu !!!',
    slug: 'inspecao-palavra-upsert',
    date: '2026-08-22T05:48:00.000Z',
    seriesOrder,
    seriesLabel: 'Opsert · palavra',
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
