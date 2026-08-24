'use strict';

/**
 * Inspeção Palavras · Patia / -patia (gr. πάθος · -πάθεια)
 * Pedido: inspeção da palavra Patia.
 * Peça = o sufixo culto; quatro salas; ≠ pato ≠ pátria ≠ pátio.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/patia-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/-patia';
const WIKT_EN = 'https://en.wiktionary.org/wiki/-pathy';
const WIKT_GR = 'https://en.wiktionary.org/wiki/%CF%80%CE%AC%CE%B8%CE%BF%CF%82#Ancient_Greek';
const WIKT_GR_SFX = 'https://en.wiktionary.org/wiki/-%CF%80%CE%AC%CE%B8%CE%B5%CE%B9%CE%B1#Ancient_Greek';
const WIKT_PATHOS = 'https://en.wiktionary.org/wiki/pathos';
const WIKI_EMP = 'https://pt.wikipedia.org/wiki/Empatia';
const WIKI_HOM = 'https://pt.wikipedia.org/wiki/Homeopatia';
const WIKI_NEU = 'https://pt.wikipedia.org/wiki/Neuropatia';
const WIKI_ALE = 'https://pt.wikipedia.org/wiki/Alelopatia';
const WIKI_GEO = 'https://pt.wikipedia.org/wiki/Pat%C3%ADa';

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

function poemPt() {
  return `Patia.
Não é o pato.

É o sufixo
que herda o páthos:
sentir, sofrer, padecer.

Empatia sente para dentro.
Simpatia sente com.
Apatia não sente.
Neuropatia nomeia o dano.
Homeopatia nomeia a escola.

A orelha cola pato.
O étimo corta:
πάθος, não a ave.

Valeu !!!
quatro salas,
um sufixo.`;
}

function poemEn() {
  return `Patia.
Not the duck.

It is the suffix
that inherits páthos:
to feel, to suffer, to undergo.

Empathy feels inward.
Sympathy feels with.
Apathy does not feel.
Neuropathy names the harm.
Homeopathy names the school.

The ear glues duck.
The etymon cuts:
páthos, not the bird.

Valeu !!!
four rooms,
one suffix.`;
}

function poemEs() {
  return `Patia.
No es el pato.

Es el sufijo
que hereda el páthos:
sentir, sufrir, padecer.

Empatía siente hacia dentro.
Simpatía siente con.
Apatía no siente.
Neuropatía nombra el daño.
Homeopatía nombra la escuela.

El oído pega pato.
El étimo corta:
πάθος, no el ave.

¡Valeu !!!
cuatro salas,
un sufijo.`;
}

function buildPatiaBodies() {
  const inspected = '2026-08-24';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const self = '/posts/post-inspecao-palavra-patia.html';
  const palavra = '/posts/post-inspecao-palavra-palavra.html';
  const etimologia = '/posts/post-inspecao-palavra-etimologia.html';
  const etimo = '/posts/post-inspecao-palavra-etimo.html';
  const latim = '/posts/post-inspecao-palavra-latim.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const aglutinacao = '/posts/post-inspecao-palavra-aglutinacao.html';
  const emocao = '/posts/post-inspecao-palavra-emocao.html';
  const relacao = '/posts/post-inspecao-palavra-relacao.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const pato = '/posts/post-inspecao-palavra-pato.html';
  const simbiose = '/posts/post-inspecao-palavra-simbiose.html';
  const orelhaCola = '/posts/post-inspecao-expressao-a-orelha-cola-o-que-a-boca-juntou.html';
  const faca = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const guia = '/guia/palavras.html';
  const vidaHub = '/vida/';
  const unifesp = '/biblioteca/unifesp/';
  const livroXiv = '/biblioteca/unifesp/livro-xiv.html';
  const horizonte = '/posts/post-inspecao-arte-horizonte-geografico.html';
  const parabola = '/posts/post-inspecao-palavra-parabola.html';

  const body = `## Escopo

Inspeção editorial da peça **[Patia](${self})** / **[-patia](${self})**. Pedido de campo: *inspecionar palavra Patia*.

O português quase **não** usa *patia* sozinha. O que vive na boca é o **sufixo culto** **-patia** (ES *-patía*, EN *-pathy*): a cauda que o grego *πάθος* (*páthos* — sentir, sofrer, padecer) deixou em dezenas de compostos. Esta ficha cobre **a peça**, não cada doença, não cada escola, não o [pato](${pato}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · -patia](${WIKT}), EN [*-pathy*](${WIKT_EN}), gr. [*πάθος*](${WIKT_GR}) / [*‑πάθεια*](${WIKT_GR_SFX}), [*pathos*](${WIKT_PATHOS}), [empatia](${WIKI_EMP}), [homeopatia](${WIKI_HOM}), [neuropatia](${WIKI_NEU}), [alelopatia](${WIKI_ALE}), [Patía](${WIKI_GEO}). Método: [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}) · [aglutinação](${aglutinacao}). **Ficha ≠ dicionário clínico, ≠ defesa ou ataque a escolas médicas, ≠ protocolo, ≠ receita de herbicida.** Série [Palavras](${hub}). Solo da [língua portuguesa](${lingua}). Fecho: [Faça o seu melhor](${faca}) · [Valeu !!!](${mantra}).

**Gatilho:** *Patia* / *patia* / *-patia* / *-pathia* / *-pathy* / *páthos* / *pathos* / *empatia* / *simpatia* / *apatia* / *homeopatia* / *alopatia* / *neuropatia* / *patologia* / *alelopatia* / *Patía*.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Formas âncora | **patia** (pedido) · **-patia** (sufixo PT) |
| Classe | Sufixo substantival culto (a forma isolada é rara) |
| Étimo (trabalho) | Gr. *πάθος* (*páthos*) «experiência, sentimento, sofrimento» → *-πάθεια* (*-pátheia*) → lat. científico *-pathia* → PT **-patia** — confiança: **alta** |
| Tipo BudGanja | Palavra — peça de formação (quatro salas) |
| Não é | [Pato](${pato}) · pátria · pátio · pata · [patologia](${self}) como tratado · diagnóstico |
| Data | ${inspected} |
| Fonte | [-patia](${WIKT}) · [πάθος](${WIKT_GR}) |

**O que é o objecto:** a **cauda** que nomeia um *páthos* — um sentir, um sofrer, ou (mais tarde) uma **escola** que reivindica esse nome. Não é a ave. Não é o pai da [pátria](${self}) (*pater*). Não é o pátio. É o **mesmo gesto grego** em quatro ofícios.

## 2. Grego — *páthos*

*Páthos* (πάθος) vem do verbo *πάσχειν* (*páskhein*): **padecer, sofrer, experimentar, ser afectado**. No grego antigo o *páthos* é o que **acontece** ao sujeito — paixão, emoção, infortúnio, qualidade de ser tocado. Não é só «doença». Não é só «carinho».

| Peça | Traçado | Confiança |
|------|---------|-----------|
| **πάσχειν** *páskhein* | Padecer / experimentar | Alta |
| **πάθος** *páthos* | O que se padece: sentimento, sofrimento, acontecimento | Alta |
| **‑πάθεια** *-pátheia* | Abstracto: o modo de padecer / o sistema de padecer | Alta |
| Retórica | *Pathos* = a emoção no discurso (junto de *ethos* e *logos*) | Alta |
| Medicina grega | *Páthos* como afeição / padecimento do corpo | Alta no nome; **média** no detalhe clínico desta ficha |

**H-páthos:** o étimo **não escolhe** a sala. Escolhe o **ser afectado**. A sala (afecto, doença, escola, planta) é **história posterior**.

**H-vizinho latino:** lat. *patī* / *patior* («sofrer, aguentar») deu *paciência*, *paciente*, *paixão*. É **primo de ofício**, não o pai do sufixo culto **-patia**. O sufixo entra pelo **grego científico** (via latim / francês modernos), não pelo *patī* popular.

## 3. Quatro salas — a mesma cauda

O português **guarda uma boca**. O ofício **corta** as salas.

| Sala | Leitura | Compostos-tipo | O que estudar aqui |
|------|---------|----------------|---------------------|
| **A. Afecto** | Sentir com / em / sem o outro | empatia, simpatia, apatia, antipatia, telepatia | Secção 4 |
| **B. Doença** | Padecimento nomeado | neuropatia, cardiopatia, miopatia, retinopatia | Secção 5 |
| **C. Escola** | Sistema que reivindica o *páthos* | homeopatia, alopatia, osteopatia, naturopatia | Secção 6 |
| **D. Ecologia** | Afeição química entre plantas | alelopatia | Secção 7 |

**H-uma boca:** *empatia* e *neuropatia* **rimam**. Não são o mesmo ofício.  
**H-escola:** *homeopatia* **não** é uma doença. É uma **marca de prática**. A orelha cola-a na sala B; o étimo **permite** a cola; o ofício **corta**.  
**H-EN:** inglês *-pathy* cobre as mesmas quatro salas (*empathy*, *neuropathy*, *homeopathy*, *allelopathy*). ES escreve **-patía**.

## 4. Sala A — afecto (sentir)

Aqui *páthos* é [emoção](${emocao}) / [relação](${relacao}): o que se sente **em relação** ao outro.

| Composto | Peças | Ofício | Corte |
|----------|-------|--------|-------|
| **empatia** | *en-* «em» + *páthos* | Sentir **dentro** do outro (perspectiva) | ≠ simpatia (sentir **com**) |
| **simpatia** | *syn-* «com» + *páthos* | Afeição partilhada; também «vibrar à mesma frequência» (diapasão) | ≠ diagnóstico; ≠ «ser simpático» como etiqueta social só |
| **apatia** | *a-* privativo + *páthos* | Ausência de afecto visível | Nome; **não** insulto clínico desta ficha |
| **antipatia** | *anti-* «contra» | Aversão | Relação, não doença |
| **telepatia** | *têle-* «longe» | «Sentir à distância» — nome cultural / ficcional | **Não** é evidência; é o **nome** |

**Empatógenos** (UNIFESP): classe de substâncias ditas a promover [empatia](${WIKI_EMP}) / contacto. O curso distingue *enteógeno* (o divino **dentro**), *tactógeno* / *empatógeno* (o contacto **com**). Esta ficha **nomeia** a cauda. **Não** é ficha de substância nem protocolo.

**H-Riley:** a sala de comando das [emoções](${emocao}) (alegria, tristeza, raiva, medo, nojinho) é **outra** ficha. *Empatia* **usa** essas peças; não as substitui.

## 5. Sala B — doença (sofrer)

Aqui *-patia* entra no **léxico clínico**: o padecimento de um tecido, um nervo, um órgão. O nome **aponta**. Não trata.

| Composto | Leitura | Corte de ofício |
|----------|---------|-----------------|
| **neuropatia** | Padecimento do nervo | Nome; [Livro XIV](${livroXiv}) cita *neuropatia periférica* em revisão de evidência — **não** é receita desta página |
| **cardiopatia** | Padecimento do coração | Nome de classe, não diagnóstico pessoal |
| **miopatia** | Padecimento do músculo | Idem |
| **idiopatia** | Padecimento «de causa própria» (sem causa conhecida) | O prefixo *idio-* = próprio; não é insulto |
| **patologia** | *páthos* + *lógos* | O **estudo** (ou o quadro) do padecer — irmã, **não** o sufixo sozinho |

**H-clínica:** esta ficha **não** diagnostica, **não** compara tratamentos, **não** traduz *-patia* em dose. Quem vive uma neuropatia precisa de **cuidado clínico**, não de etimologia. A etimologia só **corta o nome**.

## 6. Sala C — escola (o sistema que reivindica o *páthos*)

No século XVIII–XIX o sufixo vira **marca de doutrina**. Hahnemann chama *homeopatia* ao símile (*hómoios* «semelhante» + *páthos*). *Alopatia* (*állos* «outro») é o nome que essa escola deu à medicina dos **contrários**. Osteopatia, naturopatia, etc., herdam a **mesma cauda** para nomear um **sistema**, não uma lesão.

| Nome | Peça grega | O que o nome **diz** | O que esta ficha **não** faz |
|------|------------|----------------------|------------------------------|
| **homeopatia** | *hómoios* + *páthos* | Semelhante trata semelhante | Não avalia eficácia; não é fitoterapia |
| **alopatia** | *állos* + *páthos* | Tratar pelo contrário / pelo outro | Não é insulto automático nem sinónimo de «ciência» |
| **osteopatia** | *ostéon* + *páthos* | Escola do osso / manipulação | Não é protocolo |
| **naturopatia** | natureza + *páthos* | Marca de prática | Não é o [Livro XIV](${livroXiv}) |

No [XIV Curso UNIFESP](${unifesp}) (aula de farmácias vivas, Jaqueline Guimarães) o corte é de **ofício**: **fitoterapia** age pelos contrários, como a alopatia; **homeopatia** age pelos semelhantes; **não** são o mesmo que óleos essenciais nem antroposofia. Cannabis medicinal no SUS **não** é homeopatia por usar planta. A planta na farmácia viva é **outra sala**.

**H-lab:** quem cola *homeopatia* em *cannabis* está a fundir **escola** e **droga vegetal**. O étimo **não** autoriza a fusão.

## 7. Sala D — ecologia (alelopatia)

**Alelopatia** (*allelon* «uns aos outros» + *páthos*): química com que uma planta **afecta** a vizinha — inibe ou estimula. No [horizonte geográfico](${horizonte}) o lab já cortou: **guerra entre plantas** = nome da disputa (luz, água, solo, química); **≠** guerra humana; **≠** manual de herbicida.

| Corte | Leitura |
|-------|---------|
| Alelopatia ≠ empatia das plantas | Não há «sentir» moral; há **química** |
| Alelopatia ≠ simbiose | [Simbiose](${simbiose}) é viver **com**; alelopatia pode ser inibição |
| Alelopatia ≠ receita | Esta ficha **não** ensina a formular extractos |

## 8. Formas irmãs

| Forma | Classe | Exemplo | Nota |
|-------|--------|---------|------|
| **-patia** | Sufixo do nome | empatia, neuropatia | Esta peça |
| **-pata** | Agente | homeopata, psicopata | Quem **pratica** ou **padece** no nome |
| **-pático** | Adjectivo | simpático, empático, neuropático | Qualidade / relação |
| **pathos** | Empréstimo | retórica, crítica | A peça grega **nua** |
| **patético** | Adjectivo | de *pathos* | Outrora «comovente»; hoje muitas vezes pejorativo — **história de uso**, não insulto desta ficha |
| **patologia** | Composto | estudo / quadro | *páthos* + *lógos* |

**H-psicopata:** o nome clínico / cultural **não** é diagnóstico desta página. Corta-se o étimo (*psukhḗ* + *páthos*). Não se cola estigma.

## 9. O que a orelha cola — e o étimo corta

| Forma | O que **parece** | O que **é** |
|-------|------------------|-------------|
| **Patia** | Nome próprio / o [pato](${pato}) | Pedido de campo = o **sufixo** *-patia* |
| **patia** sozinha | Palavra corrente | Cauda culta; rara fora de compostos |
| **[pato](${pato})** | O mesmo radical | Ave (árabe-hispânico) — **outra árvore** |
| **pátria** | A mesma boca | Lat. *patria* ← *pater* — **pai**, não *páthos* |
| **pátio** | A mesma boca | Outro étimo (espaço aberto) |
| **pata** | A mesma boca | Pata do animal — **não** o sufixo |
| **paciência** | «Sofre como -patia» | Lat. *patī* — **primo**, não o sufixo grego culto |
| **empatia** = **simpatia** | Sinónimos | *em-* vs *syn-*: dentro **×** com |
| **homeopatia** = **fitoterapia** | «Tudo planta» | Escola do símile **×** planta como fármaco |
| **alopatia** | Insulto | Nome histórico de uma escola para a outra |
| **neuropatia** | Receita canábica | Nome clínico; evidência vive noutro sítio |
| **Patía** (Cauca) | O sufixo | [Município / rio na Colômbia](${WIKI_GEO}) — **homónimo geográfico** |

**H1:** *-patia* < gr. *-pátheia* < *páthos* — ser afectado (alta).  
**H2:** quatro salas (afecto × doença × escola × planta); uma boca.  
**H3:** [pato](${pato}), pátria e pátio são **colas da orelha**.  
**H4:** lat. *patī* é vizinho; o sufixo é **empréstimo culto grego**.

## 10. Bom × mau uso no laboratório

| Uso | Ofício |
|-----|--------|
| Bom | Nomear a **cauda**; cortar a sala antes de traduzir |
| Bom | Dizer *empatia* quando é perspectiva; *simpatia* quando é afeição partilhada |
| Bom | Distinguir homeopatia / alopatia / fitoterapia como no [XIV](${livroXiv}) |
| Bom | Tratar alelopatia como **nome** ecológico, não receita |
| Mau | Fundir pato, pátria e -patia num só sopro |
| Mau | Transformar esta ficha em clínica, em defesa de escola, ou em protocolo |
| Mau | Colar *empatógeno* / *neuropatia* / *homeopatia* em dose |

Fecho: [Valeu !!!](${mantra}) — o melhor recorte *desta* cauda *hoje*.

## 11. O poema

\`\`\`poem
${poemPt()}
\`\`\`

[▶ Ler na página Vida](${vidaHub}#poema=patia)

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [pato](${pato}) | A cola da orelha — a ave; **outra** árvore |
| [emoção](${emocao}) | Sala A — as peças do afecto |
| [relação](${relacao}) · [simbiose](${simbiose}) | Vínculo; viver-com ≠ alelopatia |
| [etimologia](${etimologia}) · [étimo](${etimo}) · [latim](${latim}) | Método; *patī* é vizinho |
| [aglutinação](${aglutinacao}) | Como as peças se soldam (*en-* + *páthos*) |
| [parábola](${parabola}) | Outra cauda grega com salas duplas — irmã de método |
| [língua portuguesa](${lingua}) | Solo do sufixo |
| [horizonte geográfico](${horizonte}) | Alelopatia já cortada como nome, não receita |
| [Livro XIV](${livroXiv}) · [UNIFESP](${unifesp}) | Homeopatia × alopatia × fitoterapia; neuropatia como nome de evidência |
| [Guia](${guia}) · hub [Palavras](${hub}) | Mapa |
| [Faça o seu melhor](${faca}) | Ofício |
| [Valeu !!!](${mantra}) | Fecho |

## Limites

- Não é dicionário de doenças nem de escolas.  
- Não avalia homeopatia, osteopatia ou cannabis.  
- Não diagnostica neuropatia nem apatia.  
- Não ensina alelopatia como formulação.  
- Patía (Colômbia) fica **declarada** como homónimo, sem ficha geográfica.  
- Compostos (*empatia*, *homeopatia*…) podem ganhar ficha própria mais tarde; hoje vivem **nesta** cauda.  
- O poema é **criação do laboratório**.

## Status

**Aprovado na série Palavras** — **patia** / **-patia** fichada como gr. *páthos* → *-pátheia* → PT *-patia*; **quatro salas** (afecto × doença × escola × ecologia); [pato](${pato}) / pátria / pátio cortados; *patī* declarado vizinho; homónimo [Patía](${WIKI_GEO}) declarado. [Faça o seu melhor](${faca}). [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Pato](${pato}) · [▶ Emoção](${emocao}) · [▶ Étimo](${etimo}) · [▶ Etimologia](${etimologia}) · [▶ Aglutinação](${aglutinacao}) · [▶ Horizonte](${horizonte}) · [▶ Livro XIV](${livroXiv}) · [▶ Poema Vida](${vidaHub}#poema=patia) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of Portuguese **Patia** / **-patia** (EN *-pathy*). Field request: inspect the word *Patia*.

Portuguese barely uses *patia* alone. What lives in the mouth is the learned suffix **-patia**, from Greek *páthos* (“feeling, suffering, being affected”) via *-pátheia*. This sheet covers **the piece**, not each disease, not each medical school, not the [duck](${pato}) (*pato*).

> Sources: [Wiktionary · -patia](${WIKT}), [*-pathy*](${WIKT_EN}), Gk. [*páthos*](${WIKT_GR}). Method: [etymology](${etimologia}). Not a clinical dictionary. Not a protocol. Close: [Valeu !!!](${mantra}).

## Four rooms, one tail

| Room | Reading | Examples |
|------|---------|----------|
| **A. Feeling** | *páthos* as affect | empathy, sympathy, apathy, telepathy |
| **B. Disease** | *páthos* as suffering | neuropathy, cardiopathy |
| **C. School** | a practice that claims the name | homeopathy, allopathy, osteopathy |
| **D. Ecology** | chemistry between plants | allelopathy |

English keeps the same four rooms under *-pathy*. Spanish writes *-patía*. [Pato](${pato}) (duck), *pátria* (fatherland ← *pater*) and *pátio* are **ear-glue**, not this tree. Latin *patī* (“to suffer”) gave *paciência* — a **neighbour**, not the father of the learned suffix.

In the [UNIFESP XIV course](${livroXiv}), phytotherapy is not homeopathy; neuropathy is a **name** in evidence reviews, not a recipe on this page. Allelopathy is already cut on the [geographic horizon](${horizonte}) sheet: a **name**, not a herbicide manual.

## Lab poem

\`\`\`poem
${poemEn()}
\`\`\`

## Status

**Approved in Words.** Suffix filed. Four rooms. Duck cut. [Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **Patia** / **-patia** (ES **-patía**, EN *-pathy*). Pedido de campo: inspeccionar la palabra *Patia*.

El portugués casi no usa *patia* sola. Lo que vive en la boca es el sufijo culto **-patia**, del griego *páthos* («sentimiento, sufrimiento, ser afectado») vía *-pátheia*. Esta ficha cubre **la pieza**, no cada enfermedad, no cada escuela, no el [pato](${pato}).

> Fuentes: [Wikcionario · -patia](${WIKT}), gr. [*páthos*](${WIKT_GR}). Método: [etimología](${etimologia}). No es diccionario clínico. No es protocolo. Cierre: [¡Valeu !!!](${mantra}).

## Cuatro salas, una cola

| Sala | Lectura | Ejemplos |
|------|---------|----------|
| **A. Afecto** | *páthos* como sentir | empatía, simpatía, apatía, telepatía |
| **B. Enfermedad** | *páthos* como padecer | neuropatía, cardiopatía |
| **C. Escuela** | práctica que reivindica el nombre | homeopatía, alopatía, osteopatía |
| **D. Ecología** | química entre plantas | alelopatía |

El español escribe **-patía**. [Pato](${pato}), *pátria* (← *pater*) y *pátio* son **pegamento del oído**. Lat. *patī* («sufrir») dio *paciencia* — **primo**, no el padre del sufijo culto.

En el [curso XIV UNIFESP](${livroXiv}) la fitoterapia no es homeopatía; la neuropatía es **nombre** en revisiones, no receta. La alelopatía ya está cortada en el [horizonte geográfico](${horizonte}): **nombre**, no manual de herbicida.

## Poema del laboratorio

\`\`\`poem
${poemEs()}
\`\`\`

## Estado

**Aprobada en Palabras.** Sufijo fichado. Cuatro salas. Pato cortado. [¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildPatiaPost() {
  const { body, contentEn, contentEs } = buildPatiaBodies();
  const seriesOrder = pickOrder('inspecao-palavra-patia', 315);
  return makePalavra({
    title: 'Inspeção: Patia — -patia ← gr. páthos; sentir × sofrer × escola',
    titleEn: 'Inspection: Patia — -patia ← Gk. páthos; feeling × suffering × school',
    titleEs: 'Inspección: Patia — -patia ← gr. páthos; sentir × sufrir × escuela',
    excerpt:
      'Palavras: Patia / -patia ← gr. páthos · -pátheia — afecto × doença × escola × alelopatia; ≠ pato ≠ pátria; Valeu !!!',
    excerptEn:
      'Words: Patia / -patia ← Gk. páthos · -pátheia — feeling × disease × school × allelopathy; ≠ duck ≠ fatherland; Valeu !!!',
    excerptEs:
      'Palabras: Patia / -patia ← gr. páthos · -pátheia — afecto × enfermedad × escuela × alelopatía; ≠ pato ≠ patria; ¡Valeu !!!',
    slug: 'inspecao-palavra-patia',
    date: '2026-08-24T13:20:00.000Z',
    seriesOrder,
    seriesLabel: 'Patia · -patia',
    coverImage: COVER,
    sourceUrl: WIKT,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPatiaPost,
  buildPatiaBodies,
  poemPt,
  poemEn,
  poemEs,
  COVER,
  WIKT,
  WIKT_EN,
  WIKT_GR,
  WIKT_GR_SFX,
  WIKI_GEO
};
