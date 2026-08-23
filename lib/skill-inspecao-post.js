'use strict';

/**
 * Inspeção Palavras · skill
 * Eixos: empréstimo EN → BR · habilidade / craft · anti-LinkedIn ·
 * elos multitask / genial · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildSkillBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const buguei = '/posts/post-inspecao-palavra-buguei.html';
  const backspace = '/posts/post-inspecao-palavra-backspace.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const multitask = '/posts/post-inspecao-palavra-multitask.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wikt =
    'https://en.wiktionary.org/wiki/skill';
  const wiktPt =
    'https://pt.wiktionary.org/wiki/skill';
  const wiki =
    'https://en.wikipedia.org/wiki/Skill';

  const body = `## Escopo

Inspeção editorial de **skill** — empréstimo inglês vivo no português do Brasil: jogos, chat, oficina, currículo e peito. Esta ficha cobre o **objeto** (EN → uso BR), o contraste com **habilidade** / **ofício** / *craft*, a **correção BudGanja** (anti-hype de LinkedIn) e o fecho [Valeu !!!](${mantra}). Gatilho tipográfico do lote: *skgll* → **skill**. Elos: [multitask](${multitask}), [genial](${genial}).

> **Nota metodológica:** auditoria independente do Inspetor BudGanja. Fontes: [Wiktionary · skill](${wikt}), [skill (PT)](${wiktPt}), [Skill (EN)](${wiki}), uso oral BR (games, lab, rua). **Ficha ≠ curso de soft skills** nem manual de RH. Sem afiliação a plataformas de emprego.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **skill** (EN; substantivo — também adjectivo informal em BR: «tá skill») |
| Irmãs PT | **habilidade** · **destreza** · **ofício** · *craft* (empréstimo paralelo) |
| Família | *skills* · *skillado* · *soft/hard skills* · *skill issue* (meme) · *upskill* |
| Classe | Empréstimo EN → uso BR; PT nativo = *habilidade* / *mestria* |
| Étimo (trabalho) | Antigo nórdico / germânico *skil* «distinção, saber fazer» → inglês *skill* → BR gamer/oficina/CV |
| Tipo BudGanja | Palavra — empréstimo × habilidade × craft |
| Elo ofício | [gesto](${gesto}) · [verdade](${verdade}) · [caminho](${caminho}) · [Valeu !!!](${mantra}) |
| Elo empréstimo | [multitask](${multitask}) — outro rótulo EN de produtividade no solo BR |
| Elo engenho | [genial](${genial}) · [criatividade](${criatividade}) — elogio do feito, não do CV |
| Elo língua | [língua portuguesa](${lingua}) — empréstimo vivo; tipografia *skgll* → skill |
| Fonte | [skill (EN)](${wikt}) · [Skill](${wiki}) |
| Data | ${inspected} |

**Objeto:** não é «lista de competências para o recrutador». É um **rótulo de capacidade** que viajou do inglês (saber fazer com distinção) para o BR — e aqui vibra entre **jogo**, **oficina** e **marketing de pessoa**.

## 2. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **LinkedIn / CV** | Badge de empregabilidade («soft skills») | Catálogo de virtudes — muitas vezes vazio de [gesto](${gesto}) |
| **Games / chat** | Elogio («skill demais») ou corte («skill issue») | Julgamento de desempenho no momento |
| **Oficina / lab** | Domínio técnico nomeável | **Habilidade com rasto** — prática + método |
| **Culto** | Ter *skills* = ser valioso | Identidade comprada; ofício some |
| **BudGanja** | Palavra mágica de competência | **Craft**: o que a mão (e a cabeça) **faz**, inspecionável |

**H-parece:** *skill* vende **competência portátil** — cola no perfil, brilha no feed.  
**H-é:** no ofício, *skill* sem [gesto](${gesto}) é rótulo; com gesto é **habilidade em acto**.

**Veredicto contraste:** o que parece = medalha de CV; o que é = saber fazer com rasto. Corrigir a palavra = preferir a obra ao badge.

## 3. Skill × habilidade × craft

| Termo | Registo | Leitura lab |
|-------|---------|-------------|
| **skill** | Empréstimo EN no BR | Rápido, gamer, CV; inspecionar se há rasto |
| **habilidade** | PT nativo | Capacidade treinável — irmã sem verniz anglo |
| **ofício / craft** | Lab BudGanja | Método + repetição + [verdade](${verdade}) do feito |
| **[genial](${genial})** | Elogio de engenho | Celebra o resultado; culto vazio = ressalva |
| **[multitask](${multitask})** | Empréstimo irmão | Espalha frentes; *skill* nomeia a frente — sem confundir os eixos |

**Veredicto mapa:** *skill* no BR **não apaga** *habilidade*. Usar o empréstimo com consciência; quando o peito pedir precisão, dizer **habilidade** ou nomear o [gesto](${gesto}) («regar», «soldar», «rever o commit»).

## 4. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «Preciso de soft skills» (sem acto) | Preferir nomear o [gesto](${gesto}) concreto — comunicação = ouvir + escrever + corrigir |
| «Sou full of skills» | Identidade-badge; ofício pede rasto, não lista |
| «Skill issue» como humilhação vazia | Pode ser meme honesto *ou* fuga de ensinar; inspecionar o contexto |
| «Multitask + mil skills = sucesso» | Ver [multitask](${multitask}): uma com método **ou** paralelo com limites |
| «Genial = tem skill» | [Genial](${genial}) elogia engenho no feito; *skill* sem obra = marketing |

### Ofício correcto (mapa curto)

1. Nomear **uma** habilidade em acto (não dez badges).  
2. Treinar com [caminho](${caminho}) — repetição com [verdade](${verdade}).  
3. Se travar: [buguei](${buguei}) → [backspace](${backspace}) → voltar ao gesto.  
4. Fechar com [Valeu !!!](${mantra}) — melhor **neste** craft, hoje.

**Veredicto correção:** **skill ≠ badge de LinkedIn.** No lab, *skill* só vale com rasto — habilidade / craft inspecionável.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Games / chat** | «Que skill» / «skill issue» | Bom: juízo do momento · Mau: humilhar sem ensinar |
| **Oficina** | «Skill de poda / de clonagem» | Bom: nomear domínio · Mau: jargão sem prática |
| **CV / feed** | «Soft skills: liderança, sinergia…» | Bom: se houver rasto · Mau: catálogo vazio (anti-LinkedIn) |
| **Adjectivo informal** | «Tá skill esse setup» | Bom: elogio vivo · Mau: substituir [genial](${genial}) sem olhar a obra |
| **Tipografia** | *skgll* → **skill** | Bom: corrigir ao canónico · Mau: fingir que o lapso é outra palavra |

## 6. Anti-hype · Valeu !!!

| Armadilha | Leitura |
|-----------|---------|
| **Culto do soft skill** | Virtudes em lista sem peito nem [gesto](${gesto}) |
| **Identidade skillado** | Pessoa = portfólio — ver ressalva em [genial](${genial}) (culto vazio) |
| **Skill sem treino** | Quer o nome; foge do [caminho](${caminho}) |
| **Empilhar com multitask** | Muitas frentes + muitos badges = [buguei](${buguei}) |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Valeu !!!](${mantra}) — o melhor **nesta** habilidade / neste craft |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Tenho skills, logo sou» = falso |
| Rede | [gesto](${gesto}) · [multitask](${multitask}) · [genial](${genial}) · [língua portuguesa](${lingua}) |

**Veredicto:** Valeu !!! **sem o culto do badge** — habilidade com rasto; empréstimo *skill* inspecionado, não idolatrado.

## Hipóteses (síntese)

**H1:** *skill* = empréstimo EN (*skil* germânico → *skill*) → BR (games, lab, CV).  
**H2:** parece medalha de competência; é saber fazer — só vale com rasto.  
**H3:** irmãs = **habilidade** / **ofício** / *craft*; elos = [multitask](${multitask}) · [genial](${genial}).  
**H4:** tipografia *skgll* → skill; anti-LinkedIn; fecho [Valeu !!!](${mantra}).

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Gesto](${gesto}) · [Verdade](${verdade}) · [Caminho](${caminho}) | Craft com método |
| [Multitask](${multitask}) | Empréstimo irmão — frentes × foco |
| [Genial](${genial}) · [Criatividade](${criatividade}) | Elogio do feito ≠ badge |
| [Buguei](${buguei}) · [Backspace](${backspace}) | Quando a «skill» trava / rever |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) | Empréstimo no solo BR |
| [Valeu !!!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) | Fecho sem culto de CV |

## Limites

- Não é curso de carreira nem avaliação de desempenho.  
- Não nega que **existe** habilidade treinável — só recusa o culto do rótulo vazio.  
- *Soft/hard skills* entram como **registo social**, não como taxonomia científica do lab.

## Status

**Aprovado** — **skill** fichado: empréstimo EN→BR; habilidade/craft; anti-LinkedIn; elos [multitask](${multitask}) · [genial](${genial}); tipografia *skgll*; elo [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Multitask](${multitask}) · [▶ Genial](${genial}) · [▶ Gesto](${gesto}) · [▶ Caminho](${caminho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **skill** — English loan alive in Brazilian Portuguese: games, chat, workshop, résumé and chest. Covers **object** (EN → BR), contrast with **habilidade** / craft, **BudGanja correction** (anti-LinkedIn hype), and [Valeu !!!](${mantra}). Typo trigger: *skgll* → **skill**. Links: [multitask](${multitask}), [genial](${genial}).

> Method note: [skill](${wikt}), [Skill](${wiki}). Not a soft-skills course or HR manual.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **skill** · PT sisters **habilidade** / craft / ofício |
| Path | Gmc *skil* → EN *skill* → BR games/lab/CV |
| Links | [gesture](${gesto}) · [multitask](${multitask}) · [genial](${genial}) · [path](${caminho}) · [Valeu !!!](${mantra}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** portable competence badge for profiles.  
**Is:** know-how with a trail — practice + method. Without [gesture](${gesto}), *skill* is a label.

## 3. BudGanja correction

**skill ≠ LinkedIn badge.** Prefer naming the concrete act; train on the [path](${caminho}); when it stalls → [buguei](${buguei}) → [backspace](${backspace}). [Multitask](${multitask}) spreads fronts; *skill* names a front — don’t confuse axes. [Genial](${genial}) praises the deed, not the CV list. Close with [Valeu !!!](${mantra}).

## Status

**Approved** — EN loan → BR; habilidade/craft; anti-badge; links [multitask](${multitask}) · [genial](${genial}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Multitask](${multitask}) · [▶ Genial](${genial}) · [▶ Gesture](${gesto}) · [▶ Path](${caminho}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **skill** — préstamo inglés vivo en el portugués de Brasil: juegos, chat, taller, currículum y pecho. Cubre **objeto** (EN → BR), contraste con **habilidade** / oficio, **corrección BudGanja** (anti-hype LinkedIn) y [¡Valeu !!!](${mantra}). Tipografía: *skgll* → **skill**. Vínculos: [multitask](${multitask}), [genial](${genial}).

> Nota: [skill](${wikt}), [Skill](${wiki}). No es curso de soft skills ni manual de RR.HH.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **skill** · hermanas PT **habilidade** / oficio / craft |
| Camino | Germ. *skil* → EN *skill* → BR juegos/taller/CV |
| Vínculos | [gesto](${gesto}) · [multitask](${multitask}) · [genial](${genial}) · [camino](${caminho}) · [¡Valeu !!!](${mantra}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** medalla portátil de competencia.  
**Es:** saber hacer con rastro — práctica + método. Sin [gesto](${gesto}), *skill* es etiqueta.

## 3. Corrección BudGanja

**skill ≠ insignia de LinkedIn.** Nombrar el acto; entrenar en el [camino](${caminho}); si traba → [buguei](${buguei}). [Multitask](${multitask}) reparte frentes; *skill* nombra una. [Genial](${genial}) celebra la obra, no la lista. Cerrar con [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — préstamo EN→BR; habilidade/oficio; anti-insignia; vínculos [multitask](${multitask}) · [genial](${genial}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Multitask](${multitask}) · [▶ Genial](${genial}) · [▶ Gesto](${gesto}) · [▶ Camino](${caminho}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildSkillPost() {
  const { body, contentEn, contentEs, wiki } = buildSkillBodies();
  // Cap. 75 — free seriesOrder at build time (batch skill/passado/total).
  let seriesOrder = 75;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === 'inspecao-palavra-skill');
    if (existing && typeof existing.seriesOrder === 'number') {
      seriesOrder = existing.seriesOrder;
    } else {
      const taken = new Set(
        posts.map((p) => p.seriesOrder).filter((n) => typeof n === 'number')
      );
      while (taken.has(seriesOrder) && seriesOrder < 160) seriesOrder += 1;
    }
  } catch (_) {
    /* keep 75 */
  }

  return makePalavra({
    title:
      'Inspeção: Skill — empréstimo EN, habilidade e craft sem LinkedIn',
    titleEn:
      'Inspection: Skill — EN loan, habilidade and craft without LinkedIn',
    titleEs:
      'Inspección: Skill — préstamo EN, habilidade y oficio sin LinkedIn',
    excerpt:
      'Palavras: «skill» — empréstimo EN→BR; habilidade/craft; anti-badge LinkedIn; elos multitask e genial; tipografia skgll → skill; Valeu !!!',
    excerptEn:
      'Words: “skill” — EN→BR loan; habilidade/craft; anti-LinkedIn badge; links multitask and genial; typo skgll → skill; Valeu !!!',
    excerptEs:
      'Palabras: «skill» — préstamo EN→BR; habilidade/oficio; anti-insignia LinkedIn; vínculos multitask y genial; tipografía skgll → skill; ¡Valeu !!!',
    slug: 'inspecao-palavra-skill',
    date: '2026-08-03T20:30:00.000Z',
    seriesOrder,
    seriesLabel: 'Skill · palavra',
    coverImage: '/imagens/inspecoes/skill-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildSkillPost,
  buildSkillBodies
};
