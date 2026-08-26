'use strict';

/**
 * Inspeção Palavras · pessoas
 * Lat. persōna (máscara / papel) → pessoa humana.
 * Pedido: inspela da palara Pessoas.
 * Corta: conjugação (1.ª/2.ª/3.ª) × hub da série × vocábulo.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/pessoas-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/pessoa';
const WIKT_LA = 'https://en.wiktionary.org/wiki/persona#Latin';
const WIKI_PESSOA = 'https://pt.wikipedia.org/wiki/Pessoa';
const WIKI_GRAM = 'https://pt.wikipedia.org/wiki/Pessoa_%28gram%C3%A1tica%29';

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
    while (taken.has(seriesOrder) && seriesOrder < 800) seriesOrder += 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

function poemPt() {
  return `Pessoas.
Não é a conjugação.
Não é o hub.

Persōna era a máscara
no palco — o papel que se põe.
Depois virou quem vive:
a pessoa humana.

A série guarda biografias.
Esta ficha guarda o nome.
Heródoto abre a porta.
A palavra não é a lista.

Valeu !!!
quem vive,
sem fundir o verbo com o rosto.`;
}

function poemEn() {
  return `Pessoas.
Not the conjugation.
Not the hub.

Persōna was the mask
on stage — the role you put on.
Then it became who lives:
the human person.

The series keeps biographies.
This sheet keeps the name.
Herodotus opens the door.
The word is not the list.

Valeu !!!
who lives,
without fusing the verb with the face.`;
}

function poemEs() {
  return `Pessoas.
No es la conjugación.
No es el hub.

Persōna era la máscara
en el palco — el papel que se pone.
Después viró quien vive:
la persona humana.

La serie guarda biografías.
Esta ficha guarda el nombre.
Heródoto abre la puerta.
La palabra no es la lista.

¡Valeu !!!
quien vive,
sin fundir el verbo con el rostro.`;
}

function buildPessoasBodies() {
  const inspected = '2026-08-26';
  const hubPalavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubPessoas = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const self = '/posts/post-inspecao-palavra-pessoas.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const conjugacao = '/posts/post-inspecao-palavra-conjugacao.html';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const animal = '/posts/post-inspecao-palavra-animal.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const amo = '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';

  const body = `## Escopo

Inspeção editorial da palavra **[pessoas](${self})** — o vocábulo que **nomeia quem vive** e, no laboratório, o **nome da série** de biografias. Pedido de campo: *inspela da palara Pessoas*.

Objecto = a **palavra**. A série [Pessoas](${hubPessoas}) é o **lugar** das fichas (Heródoto, Duvivier, Shakespeare…). A [conjugação](${conjugacao}) usa *pessoa* para os **3 elos do verbo** (eu / tu / ele). Três mapas. [A orelha cola](${orelhaCola}); o [étimo](${etimo}) **corta**.

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · pessoa](${WIKT}), lat. [*persōna*](${WIKT_LA}), [Pessoa](${WIKI_PESSOA}), [pessoa (gramática)](${WIKI_GRAM}). Método: [etimologia](${etimologia}) · [latim](${latim}). **Ficha ≠ enciclopédia de biografias, ≠ gramática normativa, ≠ tratado de direito de personalidade.** Irmã de ofício: [palavra](${palavra}) (o vocábulo que nomeia a série Palavras). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *pessoas* / *pessoa* / *Pessoas* (série) / *persona* → lema **pessoas**. *pessoa* gramatical (1.ª/2.ª/3.ª) → [conjugação](${conjugacao}). Uma ficha de alguém → série [Pessoas](${hubPessoas}), não esta página.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **pessoa** (sg.) · **pessoas** (pl. / nome da série) |
| Classe | Substantivo feminino |
| Étimo (trabalho) | lat. *persōna* «máscara de teatro, papel, personagem» → «indivíduo jurídico / humano» — confiança: **alta** no étimo; **média** no detalhe etrusco da máscara |
| Pedido de campo | *Pessoas* — a boca nomeia a **série** e o **vocábulo** |
| Tipo BudGanja | Palavra — humano × série × corte gramatical |
| Não é | Hub [Pessoas](${hubPessoas}) · [conjugação](${conjugacao}) · [animal](${animal}) · uma biografia |
| Elo série | Fundadora: [Heródoto](${herodoto}) · método [Duvivier](${duvivier}) |
| Elo irmã | [palavra](${palavra}) — a peça-mãe da série Palavras |
| Fonte | [pessoa](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o nome português de **quem é alguém**. No palco antigo, *persōna* era a **máscara**. No direito e na fala, passou a nomear o **indivíduo**. No BudGanja, **Pessoas** (maiúsculas) é o **ficheiro de rostos** — e esta página é só o **vocábulo**.

## 2. Persōna — máscara, papel, alguém

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **persōna** (lat.) | Máscara de actor; papel; depois pessoa jurídica / humana | Alta |
| Hipótese etrusca | *phersu* (máscara) → lat. *persōna* | Média — citada, não fechada |
| PT **pessoa** | O indivíduo; também a pessoa gramatical | Alta |
| EN *person* / ES *persona* | Cognatos da mesma árvore | Alta |
| EN *people* | Outra via (lat. *populus*) — **não** o plural etimológico de *person* | Alta |

**H-máscara:** a pessoa **não** é a máscara; a palavra **veio** da máscara. O lab honra o teatro e **não** reduz o humano a papel.  
**H-people:** inglês *people* («gente / povo») **não** é o plural de *person* na árvore latina. PT **pessoas** é o plural de **pessoa**.

## 3. Três salas — vocábulo × série × gramática

| Sala | O que é | Onde vive |
|------|---------|-----------|
| **A. Vocábulo** | *pessoa* / *pessoas* — quem vive | **Esta** ficha |
| **B. Série** | Hub de biografias e ofícios | [Pessoas](${hubPessoas}) — lugar, não étimo |
| **C. Gramática** | 1.ª / 2.ª / 3.ª do verbo | [conjugação](${conjugacao}) |

**H-série:** como [palavra](${palavra}) não é o hub Palavras, **pessoas** não é o hub Pessoas.  
**H-gramática:** «a 1.ª pessoa do singular» **não** é uma biografia. A [conjugação](${conjugacao}) já corta: *pessoa* gramatical ≠ série histórica.

Pedido *inspela da palara Pessoas*: a orelha cola *palara* em [palavra](${palavra}) e *Pessoas* na série. Duas peças-mãe. Dois nomes. Sem fundir as listas.

## 4. O que a orelha cola

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Pessoas** (maiúsculas) | Esta ficha | O [hub](${hubPessoas}) de biografias |
| **pessoa** (gramática) | O mesmo humano | Elo do verbo — [conjugação](${conjugacao}) |
| **persona** (EN/ES) | Só tradução | Cognato; em EN também *máscara / personagem* |
| **[animal](${animal})** | Também «ser vivo» | Outra série / outro étimo (*anima*) |
| **povo** / *people* | Plural de pessoa | *populus* — gente como conjunto, **não** este lema |

## 5. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Fichar **uma** pessoa na série [Pessoas](${hubPessoas}); citar esta página quando o objecto é o **vocábulo** |
| Bom | Mandar eu/tu/ele para a [conjugação](${conjugacao}) |
| Bom | Tratar a pessoa com [respeito](${respeito}) e [verdade](${verdade}) — sem vida privada inventada |
| Mau | Fundir vocábulo, hub e gramática num só sopro |
| Mau | Transformar a ficha-palavra numa lista de biografias |

Fecho: [Valeu !!!](${mantra}) · [eu amo a vida](${amo}).

## 6. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vida}#poema=pessoas)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Hub Pessoas](${hubPessoas}) | O **lugar** das fichas |
| [Heródoto](${herodoto}) | Ficha fundadora da série |
| [Duvivier](${duvivier}) | Método da palavra — pessoa que inspeciona palavras |
| [palavra](${palavra}) | Irmã: vocábulo que nomeia a série Palavras |
| [conjugação](${conjugacao}) | Pessoa gramatical |
| [respeito](${respeito}) · [relação](${relacao}) · [verdade](${verdade}) | Ofício com quem vive |
| [Guia](${guia}) · [Palavras](${hubPalavras}) | Mapa |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não inventaria as biografias do hub.  
- Não é aula de direito de personalidade nem de máscaras etruscas.  
- Não funde *pessoa* gramatical com a pessoa humana.

## Status

**Aprovado na série Palavras** — *pessoas* fichada como lat. *persōna* (máscara → alguém); série no [hub](${hubPessoas}); gramática na [conjugação](${conjugacao}). [Valeu !!!](${mantra}).

[▶ Palavras](${hubPalavras}) · [▶ Pessoas (hub)](${hubPessoas}) · [▶ Palavra](${palavra}) · [▶ Conjugação](${conjugacao}) · [▶ Heródoto](${herodoto}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Portuguese **pessoas** (“people / persons”) — the vocable that **names who lives**, and in the lab the **name of the People series**. Field request: inspect *Pessoas*. Not the [hub](${hubPessoas}) of biographies. Not [grammatical person](${conjugacao}) (I / you / they). Latin *persōna* was first a **stage mask**, then the human individual. Sister sheet: [palavra](${palavra}) (the word that names Words).

> [Wiktionary](${WIKT}), Lat. [*persōna*](${WIKT_LA}). Close: [Valeu !!!](${mantra}).

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Vocable filed; series on the [hub](${hubPessoas}); grammar in [conjugation](${conjugacao}). [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

**pessoas** — el vocablo que **nombra a quien vive** y, en el laboratorio, el **nombre de la serie Personas**. Pedido: inspeccionar *Pessoas*. No es el [hub](${hubPessoas}) de biografías. No es la [persona gramatical](${conjugacao}) (yo / tú / él). Lat. *persōna* fue primero **máscara de teatro**, después el individuo. Hermana: [palavra](${palavra}) (el vocablo que nombra Palabras).

> [Wikcionario](${WIKT}), lat. [*persōna*](${WIKT_LA}). Cierre: [¡Valeu !!!](${mantra}).

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Vocablo fichado; serie en el [hub](${hubPessoas}); gramática en [conjugación](${conjugacao}). [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildPessoasPost() {
  const { body, contentEn, contentEs } = buildPessoasBodies();
  return makePalavra({
    title: 'Inspeção: Pessoas — o vocábulo que nomeia a série',
    titleEn: 'Inspection: Pessoas — the vocable that names the People series',
    titleEs: 'Inspección: Pessoas — el vocablo que nombra la serie Personas',
    excerpt:
      'Palavras: pessoas ← lat. persōna (máscara → alguém); o vocábulo, não o hub; ≠ conjugação (1.ª/2.ª/3.ª); Valeu !!!',
    excerptEn:
      'Words: pessoas ← Lat. persōna (mask → someone); the vocable, not the hub; ≠ conjugation (1st/2nd/3rd); Valeu !!!',
    excerptEs:
      'Palabras: pessoas ← lat. persōna (máscara → alguien); el vocablo, no el hub; ≠ conjugación (1.ª/2.ª/3.ª); ¡Valeu !!!',
    slug: 'inspecao-palavra-pessoas',
    date: '2026-08-26T11:40:00.000Z',
    seriesOrder: pickOrder('inspecao-palavra-pessoas', 365),
    seriesLabel: 'Pessoas · persōna',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPessoasPost,
  buildPessoasBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT
};
