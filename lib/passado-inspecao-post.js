'use strict';

/**
 * Inspeção Palavras · passado
 * Eixos: tempo já decorrido · memória / história · vs futuro ·
 * irmão lexical de «passar» · elos memorável / verdade / língua
 */

const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildPassadoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const passar = '/posts/post-inspecao-palavra-passar.html';
  const memoravel = '/posts/post-inspecao-palavra-memoravel.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const ja = '/posts/post-inspecao-palavra-ja.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';
  const divertida = '/posts/post-inspecao-filme-divertida-mente.html';
  const livro = '/posts/post-inspecao-palavra-livro.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wiktionary.org/wiki/passado';
  const wikiPassar = 'https://pt.wiktionary.org/wiki/passar';
  const wikiLat = 'https://en.wiktionary.org/wiki/passatus';

  const body = `## Escopo

Inspeção editorial da palavra **passado** — o **tempo já decorrido**, o **particípio** do verbo [passar](${passar}), e o substantivo que nomeia **história pessoal ou colectiva** («o passado»). Esta ficha cobre o **objeto** (lat. *passāre* → *passado*), o eixo **memória × tempo**, o contraste **passado × futuro**, e o ofício de **inspecionar o que ficou** sem romantizar nem apagar. Elos vivos: [memorável](${memoravel}), [verdade](${verdade}), [língua portuguesa](${lingua}), [Heródoto](${herodoto}), [já](${ja}), [caminho](${caminho}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · passado](${wiki}), [passar](${wikiPassar}), série [Palavras](${hub}). **Ficha ≠ terapia do trauma nem historiografia académica** — mapa lexical e de ofício. Tipografia de origem («psasafo») lida como **passado**. Tom: Inspetor BudGanja — tempo que passou, rasto que fica, futuro que ainda se faz. Sem afiliação comercial.

**Gatilho tipográfico:** *psasafo* / *pasaado* → **passado**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **passado** |
| Classe | Substantivo masculino · adjectivo · particípio de [passar](${passar}) |
| Étimo (trabalho) | Latim *passāre* («atravessar») ← *passus* («passo») → PT *passar* → particípio/adjectivo/substantivo **passado** — confiança: **alta** |
| Família | *passar* · *passagem* · *passante* · *compasso* · *ultrapassar* · *impasse* |
| Cognatos | esp. *pasado* · fr. *passé* · it. *passato* · ing. *past* / *passed* (sentido paralelo) |
| Tipo BudGanja | Palavra — tempo decorrido × memória × história × ofício do rasto |
| Elo verbal irmão | [passar](${passar}) — o verbo de onde nasce o particípio |
| Elo memória | [memorável](${memoravel}) · [Divertida Mente](${divertida}) · [livro](${livro}) · [Diário](${diario}) |
| Elo método | [verdade](${verdade}) · [Heródoto](${herodoto}) · [já](${ja}) · [caminho](${caminho}) |
| Elo língua | [língua portuguesa](${lingua}) |
| Elo ofício | [gesto](${gesto}) · [Valeu !!!](${mantra}) · [Vida](${vida}) |
| Fonte | [Wikcionário · passado](${wiki}) |
| Data | ${inspected} |

**O que é o objeto:** o vocábulo que marca o **já foi** — tempo gramatical, tempo vivido, arquivo afectivo. No BR oral: «no passado», «isso é passado», «não viva no passado», «o passado não volta». No laboratório: o que **se passou** pede [verdade](${verdade}) e rasto — não nostalgia vazia nem apagamento.

## 2. Origem e gramática

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| Lat. *passus* / *passāre* | Passo; atravessar | Alta |
| PT *passar* | Verbo nuclear — travessia, acontecer, decorrer | Alta — ficha irmã |
| Particípio *passado* | Forma verbal: «eu tinha passado» / «foi passado a limpo» | Alta |
| Adjectivo | Tempo / aspecto: «semana passada», «ano passado» | Alta |
| Substantivo *o passado* | O que já ocorreu; história; memória colectiva | Alta (uso vivo) |

**H1:** *passado* não é étimo autónomo — é **filho de** [passar](${passar}): o passo que **já deu**.  
**H2:** no BR, «é passado» pode significar *já acabou* **ou** *pertence à história* — o lab pergunta: **acabou com rasto** ou **apagou sem inspecionar**?  
**H3:** [memorável](${memoravel}) mede o que **fica**; *passado* nomeia **onde o tempo já esteve** — podem coincidir, não são a mesma ferramenta.

## 3. Passado × futuro × presente

| Eixo | Leitura | Pergunta do lab |
|------|---------|-----------------|
| **Passado** | O que já ocorreu; arquivo; rasto | «O que ficou verificável?» ([verdade](${verdade})) |
| **Presente** | O ofício de agora | «Que [gesto](${gesto}) cabe hoje?» |
| **Futuro** | O ainda-por-vir | «O [caminho](${caminho}) abre a partir do rasto ou da fuga?» |
| **[já](${ja})** | Relógio — bastou / agora / já foi | «Fecha ou declara sem inspecionar?» |
| **[memorável](${memoravel})** | Retenção digna | «Cola depois do scroll?» |

### Usos vivos de «passado»

| Uso | Exemplo | Bom × mau |
|-----|---------|-----------|
| **Tempo calendário** | «semana passada» · «ano passado» | Bom: âncora temporal · Mau: vago sem data no [diário](${diario}) |
| **Arquivo pessoal** | «no meu passado» | Bom: nomear com [verdade](${verdade}) · Mau: romance ou apagamento |
| **Fecho discursivo** | «isso é passado» | Bom: largar rancor com ofício · Mau: calar o que ainda sangra sem olhar |
| **História / método** | investigar o passado ([Heródoto](${herodoto})) | Bom: *historie* = perguntar · Mau: mito sem fonte |
| **Gramática** | pretérito / particípio | Bom: tempo claro na [língua](${lingua}) · Mau: confusão *passado* × *passar* sem ficha |

**Veredicto contraste:** o futuro **não apaga** o passado — e o passado **não manda** sozinho no presente. No BudGanja, inspeciona-se o rasto ([memorável](${memoravel}), [diário](${diario}), ficha) e segue-se o [caminho](${caminho}) com [Valeu !!!](${mantra}).

## 4. Passado × projecto BudGanja

| Peça | O que o passado faz no lab | Elo |
|------|---------------------------|-----|
| [Passar](${passar}) · [Heródoto](${herodoto}) | O verbo e o método: o que **se passou** | Pessoas × Palavras |
| [Memorável](${memoravel}) | O que do passado **merece ficar** | Retenção ≠ nostalgia |
| [Verdade](${verdade}) | Narrar o passado sem fabricar | Método |
| [Língua portuguesa](${lingua}) | Solo gramatical do particípio / substantivo | Léxico |
| [Diário](${diario}) · [livro](${livro}) | Arquivo com data — passado com âncora | [Vida](${vida}) |
| [Divertida Mente](${divertida}) | Memórias com cor afectiva (≠ protocolo clínico) | Artes × Palavras |
| [Já](${ja}) | Relógio que declara «já foi» | Tempo discursivo |
| [Caminho](${caminho}) | Passo a partir do rasto, não só da nostalgia | Ofício |

**Leitura de projecto:** passado no BudGanja é **material de inspeção** — o que aconteceu, o que se registou, o que ainda informa o próximo [gesto](${gesto}). Não é prisão nem postal.

## 5. Para que serve (finalidade)

| Finalidade | No mundo | No BudGanja |
|------------|----------|-------------|
| **Nomear tempo decorrido** | «ano passado», «já passou» | Data no [diário](${diario}); Cap. com data |
| **Arquivar com critério** | História pessoal / colectiva | [Verdade](${verdade}) · fonte · limite |
| **Distinguir retenção** | Lembrar ≠ viver preso | [Memorável](${memoravel}) = o que cola com dignidade |
| **Abrir o presente** | Largar o que já foi *com* olhar | [Gesto](${gesto}) · [caminho](${caminho}) |
| **Fechar** | Depois do mapa, o acto | [Valeu !!!](${mantra}) |

**Finalidade-mãe:** usar **passado** para o que **já ocorreu** — e, quando for arquivo, amarrar a [verdade](${verdade}) e a rasto ([memorável](${memoravel})), sem impedir o próximo passo.

## 6. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor **hoje** escreve o passado de **amanhã** |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Esquece o passado» = apagar sem inspecionar · mau ofício |
| Anti-armadilha 2 | «Só vivo no passado» = sem [caminho](${caminho}) · nostalgia sem gesto |
| Par de método | [Passar](${passar}) · [memorável](${memoravel}) · [verdade](${verdade}) · [já](${ja}) |

**Veredicto:** Valeu !!! **agora** — o passado inspecionado vira rasto; o passado ignorado vira ruído.

## 7. Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Hub Inspeções](${hubAll}) · [Guia Palavras](${guia}) | Onde o rasto vira ficha |
| [Passar](${passar}) · [Heródoto](${herodoto}) | Verbo irmão · método do que se passou |
| [Memorável](${memoravel}) · [Diário](${diario}) · [Livro](${livro}) | Retenção e arquivo |
| [Verdade](${verdade}) · [Gesto](${gesto}) · [Caminho](${caminho}) | Contar sem fabricar; actuar depois |
| [Já](${ja}) · [Língua portuguesa](${lingua}) | Relógio discursivo · solo gramatical |
| [Divertida Mente](${divertida}) · [Vida](${vida}) | Memória afectiva · trilha vivida |
| [Valeu !!!](${mantra}) | Fecho de ofício |

## Limites

- Não é terapia, luto clínico nem protocolo de trauma.  
- Não é tratado de historiografia — é ficha de palavra.  
- «Águas passadas» / ditados entram como **uso cultural**, não como doutrina.  
- Tipografia *psasafo* → **passado** (não *passar* sozinho; o substantivo/particípio tem ficha própria).

## Status

**Aprovado** — **passado** fichado como filho de [passar](${passar}): tempo decorrido, arquivo e particípio; eixo **história × memória** com [memorável](${memoravel}), [verdade](${verdade}) e [língua portuguesa](${lingua}); futuro e presente não apagam o rasto — inspecionam-no; Valeu !!! **hoje**.

[▶ Palavras](${hub}) · [▶ Passar](${passar}) · [▶ Memorável](${memoravel}) · [▶ Verdade](${verdade}) · [▶ Língua portuguesa](${lingua}) · [▶ Heródoto](${herodoto}) · [▶ Já](${ja}) · [▶ Valeu !!!](${mantra}) · [▶ Vida](${vida})
`;

  const contentEn = `## Scope

Word sheet for Portuguese **passado** — *the past*, the participle of [passar](${passar}), and the noun for personal/collective history. Core: Lat. *passāre* → *passado*. Axes: elapsed time · memory · history vs future. Live links: [memorável](${memoravel}), [verdade](${verdade}), [língua portuguesa](${lingua}), [Herodotus](${herodoto}), [já](${ja}).

> Method: [Wiktionary · passado](${wiki}), [passar](${wikiPassar}). Not trauma therapy or academic historiography. Typo “psasafo” → **passado**. Tone: Inspector BudGanja — time that passed, trace that remains.

## Object

| Field | Value |
|-------|-------|
| Word | **passado** |
| Class | Noun · adjective · participle of [passar](${passar}) |
| Etymon | Lat. *passāre* ← *passus* → PT *passar* → **passado** |
| Sibling verb | [passar](${passar}) |
| Memory links | [memorável](${memoravel}) · [Inside Out](${divertida}) · [diary](${diario}) |
| Method links | [truth](${verdade}) · [Herodotus](${herodoto}) · [já](${ja}) · [path](${caminho}) |
| Language | [língua portuguesa](${lingua}) |
| Date | ${inspected} |

## Past × future × present

| Axis | Lab question |
|------|----------------|
| **Passado** | What is still verifiable? ([verdade](${verdade})) |
| **Present** | What [gesture](${gesto}) fits today? |
| **Future** | Does the [path](${caminho}) open from the trace or from escape? |
| **[memorável](${memoravel})** | Does it stick with dignity? |

The future does **not erase** the past — and the past does **not rule** the present alone. Inspect the trace; walk the path with [Valeu !!!](${mantra}).

## BudGanja

Past = **inspection material** (what happened, what was logged, what still informs the next gesture). Not a prison and not a postcard. [Passar](${passar}) · [memorável](${memoravel}) · [verdade](${verdade}) · [diary](${diario}).

## Status

**Approved** — child of [passar](${passar}); history × memory with [memorável](${memoravel}) / [verdade](${verdade}) / [língua](${lingua}); Valeu !!! **today**.

[▶ Words](${hub}) · [▶ Passar](${passar}) · [▶ Memorável](${memoravel}) · [▶ Truth](${verdade}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Ficha de **passado** — *el pasado*, participio de [passar](${passar}), y el sustantivo de historia personal/colectiva. Núcleo: lat. *passāre* → *passado*. Ejes: tiempo trascurrido · memoria · historia vs futuro. Vínculos: [memorável](${memoravel}), [verdade](${verdade}), [língua portuguesa](${lingua}), [Heródoto](${herodoto}), [já](${ja}).

> Método: [Wiktionary · passado](${wiki}), [passar](${wikiPassar}). No es terapia ni historiografía académica. Tipografía «psasafo» → **passado**. Tono: Inspector BudGanja.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **passado** |
| Clase | Sustantivo · adjetivo · participio de [passar](${passar}) |
| Étimo | Lat. *passāre* ← *passus* → PT *passar* → **passado** |
| Hermano verbal | [passar](${passar}) |
| Memoria | [memorável](${memoravel}) · [Divertida Mente](${divertida}) · [diario](${diario}) |
| Método | [verdad](${verdade}) · [Heródoto](${herodoto}) · [já](${ja}) · [camino](${caminho}) |
| Lengua | [língua portuguesa](${lingua}) |
| Fecha | ${inspected} |

## Pasado × futuro × presente

| Eje | Pregunta del lab |
|-----|------------------|
| **Passado** | ¿Qué quedó verificable? ([verdade](${verdade})) |
| **Presente** | ¿Qué [gesto](${gesto}) cabe hoy? |
| **Futuro** | ¿El [camino](${caminho}) abre desde el rastro o desde la fuga? |
| **[memorável](${memoravel})** | ¿Queda con dignidad? |

El futuro **no borra** el pasado — y el pasado **no manda** solo en el presente. Inspeccionar el rastro; caminar con [¡Valeu !!!](${mantra}).

## BudGanja

Pasado = **material de inspección**. No prisión ni postal. [Passar](${passar}) · [memorável](${memoravel}) · [verdade](${verdade}) · [diario](${diario}).

## Estado

**Aprobada** — hija de [passar](${passar}); historia × memoria con [memorável](${memoravel}) / [verdade](${verdade}) / [língua](${lingua}); Valeu !!! **hoy**.

[▶ Palabras](${hub}) · [▶ Passar](${passar}) · [▶ Memorável](${memoravel}) · [▶ Verdad](${verdade}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildPassadoPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildPassadoBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 70;
  return makePalavra({
    title:
      'Inspeção: Passado — tempo decorrido, memória e o rasto que inspeciona',
    titleEn:
      'Inspection: Passado — elapsed time, memory and the trace you inspect',
    titleEs:
      'Inspección: Passado — tiempo trascurrido, memoria y el rastro que se inspecciona',
    excerpt:
      'Palavras: «passado» (de passar / lat. passāre) — tempo já decorrido; memória × história; ≠ futuro; elos memorável, verdade, língua; Valeu !!!',
    excerptEn:
      'Words: “passado” (from passar / Lat. passāre) — elapsed time; memory × history; ≠ future; links to memorável, truth, language; Valeu !!!',
    excerptEs:
      'Palabras: «passado» (de passar / lat. passāre) — tiempo trascurrido; memoria × historia; ≠ futuro; vínculos memorável, verdad, lengua; ¡Valeu !!!',
    slug: 'inspecao-palavra-passado',
    date: '2026-08-03T14:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Passado · palavra',
    coverImage: '/imagens/inspecoes/passado-palavra-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPassadoPost,
  buildPassadoBodies
};
