'use strict';

/**
 * Inspeção Pessoas × Palavras: Renato Russo e a Legião Urbana.
 * Elo principal: palavra «tempo» (Tempo Perdido) + hub Palavras / maconha (cultural).
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildRenatoRussoBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Renato_Russo';
  const wikiLegiao = 'https://pt.wikipedia.org/wiki/Legi%C3%A3o_Urbana';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';
  const tempo = '/posts/post-inspecao-palavra-tempo.html';
  const maconha = '/posts/post-inspecao-palavra-maconha.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const planta = '/plantas/cannabis-sativa/';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const chorao = '/posts/post-inspecao-figura-chorao.html';
  const duvivier = '/posts/post-inspecao-figura-duvivier.html';
  const herodoto = '/posts/post-inspecao-figura-herodoto.html';

  const body = `## Escopo

Inspeção editorial e documental de **Renato Russo** — nome artístico de **Renato Manfredini Júnior** (Rio de Janeiro, 27 de março de 1960 — Rio de Janeiro, 11 de outubro de 1996). Vocalista, **letrista** e fundador da **Legião Urbana**. O recorte BudGanja não é hagiografia de rockstar: é recuperar o **método da palavra no rock brasileiro** — letra como poesia política, intimista e de geração — e cruzá-lo com a série **[Palavras](${palavras})**, sobretudo a ficha **[tempo](${tempo})** (o vocábulo que a canção *Tempo Perdido* tornou refrão nacional) e, em segundo plano cultural, **[maconha](${maconha})**.

> **Nota metodológica:** auditoria independente com base na [Wikipédia · Renato Russo](${wiki}) e [Legião Urbana](${wikiLegiao}). Sem afiliação com a banda, gravadoras ou marcas do artista. **Não romantiza dependência, HIV/AIDS nem morte.** A morte por complicações da AIDS (1996) e o historial de substâncias registam-se como factos biográficos; o foco editorial é o **ofício de letrista** e o laboratório da banda. Crédito das canções e do legado musical pertence a Renato Russo e aos demais integrantes (Dado Villa-Lobos, Marcelo Bonfá, Renato Rocha, entre outros).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Renato Manfredini Júnior** |
| Nome artístico | **Renato Russo** (homenagem a Bertrand Russell, Jean-Jacques Rousseau e Henri Rousseau) |
| Nascimento / morte | 27 mar. 1960 (RJ) — 11 out. 1996 (RJ), 36 anos |
| Causa (fonte) | Complicações da AIDS (DPOC, septicemia, infecção urinária) |
| Bandas | Aborto Elétrico (1978–81) · **Legião Urbana** (1982/85–1996) · fase *O Trovador Solitário* |
| Formação clássica (Legião) | Renato Russo · Dado Villa-Lobos · Marcelo Bonfá · (baixo) Renato Rocha (1984–89) |
| Ofício BudGanja | Principal letrista / voz — método da palavra geracional |
| Marcos | Oito álbuns de estúdio com a Legião; ~20 milhões de discos (estimativa citada na fonte); três discos solo |
| Géneros citados | Pós-punk, rock alternativo, punk, art rock, folk rock |
| Tipo BudGanja | Pessoa — método da palavra (+ banda como laboratório) |
| Elo principal | [Palavras](${palavras}) · [tempo](${tempo}) |
| Elo cultural (secundário) | [maconha](${maconha}) · [Cannabis sativa](${planta}) — território lexical / cultural; não confundir obra com endosso de uso |
| Fonte | [Wikipédia · Renato Russo](${wiki}) · [Legião Urbana](${wikiLegiao}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Renato Russo é a **letra** — português culto e popular que nomeia país, tempo, filhos, índios, amor e medo, até virar memória colectiva.  
**H2:** a **Legião Urbana** é o laboratório: voz + guitarra + bateria (e baixo) onde a palavra ganha refrão nacional; Aborto Elétrico e o Trovador Solitário são a pré-história do método.  
**H3:** cruzar Russo ↔ [tempo](${tempo}) inspeciona **como uma palavra do quotidiano vira canção e depois vocábulo-âncora**; o elo com [maconha](${maconha}) é cultural (geração, estigma, fala), não clínica.

Passos (variante «letrista / Palavras / banda»):

1. Biografia verificável + papel de letrista e fundador.  
2. Extrair o método da palavra (política, intimidade, geração, refrão).  
3. Documentar a banda como laboratório (Aborto → Legião → discografia).  
4. Tabela de registos (rua · palco · disco · memória póstuma).  
5. Elo com Palavras + [tempo](${tempo}); links opcionais a [verdade](${verdade}), [caminho](${caminho}), [maconha](${maconha}).  
6. Declarar limites (AIDS, dependência — facto, não centro).  
7. Status.

## Quem foi (síntese verificável)

- Nascido na Ilha do Governador (RJ); infância com passagem por Nova Iorque (pai no Banco do Brasil); família muda para Brasília (1973).  
- Adolescência marcada por epifisiólise (~1975): cirurgia, longa recuperação — período de escuta intensa de discos.  
- Professor de inglês na Cultura Inglesa; repórter/rádio; vestibular de Jornalismo na UnB.  
- **Aborto Elétrico** (1978–81) com Fê Lemos e outros — berço punk de Brasília; temas como «Que país é esse?» nascem aí.  
- Após a cisão: **O Trovador Solitário** (violão de 12 cordas) → forma a **Legião Urbana** com Marcelo Bonfá e, depois, Dado Villa-Lobos (+ Renato Rocha no baixo na fase clássica).  
- Discografia-âncora com a Legião: *Legião Urbana* (1985), *Dois* (1986), *Que País É Este* (1987), *As Quatro Estações* (1989), *V* (1991), *O Descobrimento do Brasil* (1993), *A Tempestade* (1996), *Uma Outra Estação* (1997, póstumo).  
- Discos solo: *The Stonewall Celebration Concert* (1994), *Equilíbrio Distante* (1995), *O Último Solo* (1997).  
- Declaração pública de sexualidade (gay / depois pansexual) — facto biográfico; não é o objecto da inspeção.  
- Morte em 11 de outubro de 1996; onze dias depois, Bonfá, Villa-Lobos e o empresário anunciam o fim da banda.

## A Legião Urbana como laboratório

| Traço | Tradução editorial |
|-------|-------------------|
| Nome «Legião» | Colectivo; a palavra do frontman precisa de banda |
| Formação clássica | Russo (letra/voz) · Villa-Lobos (guitarra) · Bonfá (bateria) · Rocha (baixo, 84–89) |
| Pós-punk / rock BR | A língua muda de ritmo; o sentido fica |
| Ditadura e pós-ditadura | Contexto que atravessa letras de país, medo e geração |
| Fim da banda (1996) | Laboratório encerra com a morte do letrista — facto, não mito a romantizar |

Se [Chorão](${chorao}) inspeciona a palavra no skate e no refrão dos 90/2000, Renato Russo inspeciona a palavra na **geração Legião** — Brasília, rock nacional e português que virou hino.

## O método da palavra (o que interessa ao BudGanja)

| Traço | Tradução editorial |
|-------|-------------------|
| Letra como ofício principal | A palavra antecede o mito do frontman |
| Português geracional | Vocabulário que circula — objecto da série Palavras |
| Política + intimidade | País e peito no mesmo disco |
| Refrão nacional | Frases que ficam após 1996 |
| Elo *Tempo Perdido* | Ponte directa com a ficha [tempo](${tempo}) |

## Frases anotadas — tempo que não volta

Citação breve (crítica editorial) da abertura de *Tempo Perdido* (*Dois*, 1986). **Não reproduzir a letra completa.**

> «Todos os dias quando acordo / Não tenho mais o tempo que passou.»

| Frase | Em uma linha |
|-------|----------------|
| **Todos os dias quando acordo** | Ritual do quotidiano — o dia recomeça |
| **Não tenho mais** | Perda nomeada sem eufemismo |
| **o tempo que passou** | Elo directo com [tempo](${tempo}) — chronos que não regressa |
| **(implicação)** | O [caminho](${caminho}) segue; a [verdade](${verdade}) do gasto não se apaga |

## Elo com a série Palavras

| Recurso | Por que cruzar |
|---------|----------------|
| Hub [Palavras](${palavras}) | Mesmo eixo: uso, transformação e poder do vocábulo |
| [Tempo — cronologia, clima, compasso](${tempo}) | Canção-âncora: a palavra «tempo» em refrão nacional |
| [Verdade](${verdade}) | Letra que nomeia sem anestesia — ofício de dizer |
| [Caminho](${caminho}) | Geração em trânsito; o que se percorre depois do tempo gasto |
| [Maconha — origem e transformação](${maconha}) | Terreno lexical/cultural da fala BR — elo cultural, não clínica |
| [Cannabis sativa](${planta}) | Ficha botânica — outro eixo; não substitui a análise da letra |

**Tipo de elo:** metodológico e cultural (linguagem / rock BR). Não afirmamos que cada canção «seja sobre» maconha ou tempo etimológico; afirmamos que o laboratório da palavra é o elo justo.

### Rede de registos

| Registo | Em Russo / Legião | Em Palavras (ex.: tempo) |
|---------|-------------------|---------------------------|
| Rua / geração | Letra falada, show, fãs | «tempo» no quotidiano |
| Disco / rádio | Refrão nacional (*Tempo Perdido*, *Que País É Este*…) | Circulação do vocábulo |
| Banda | Laboratório colectivo | Rede semântica partilhada |
| Memória | Frases após 1996; fim da Legião | História do sentido social da palavra |

## Avaliação BudGanja

### Forças
- Continua o braço **Pessoas × Palavras** com o letrista central do rock BR dos 80/90.  
- Elo natural e verificável com [tempo](${tempo}).  
- Separa legado lírico de romantização da AIDS e da dependência.  
- Documenta a **banda** como parte do método (não só o frontman isolado).

### Limites
- Não inventaria o catálogo completo de letras/álbuns.  
- Não faz análise literária verso a verso.  
- HIV/AIDS e substâncias: registados; não são o objecto da série.  
- Não substitui biografia académica nem documentário (*Somos Tão Jovens*, etc.).

## Complementaridade com o Inspetor BudGanja

| Tema | Recurso |
|------|---------|
| Hub Pessoas | [Inspeções · Pessoas](${hub}) |
| Hub Palavras | [Inspeções · Palavras](${palavras}) |
| Elo principal | [Tempo](${tempo}) |
| Ficha cultural | [Maconha](${maconha}) |
| Planta (secundário) | [Cannabis sativa](${planta}) |
| Outra Pessoa × Palavras (letrista) | [Chorão](${chorao}) |
| Outra Pessoa × Palavras | [Gregorio Duvivier](${duvivier}) |
| Pessoa × passar | [Heródoto](${herodoto}) |
| Legado (outro eixo) | [Inspeções · Legado](${legado}) |
| Fonte | [Wikipédia · Renato Russo](${wiki}) · [Legião Urbana](${wikiLegiao}) |

## Como repetir o método

1. Pessoa com ofício explícito de **letra / poesia / voz** (+ banda se for o laboratório).  
2. Três hipóteses sobre o método da palavra.  
3. Tabela de registos (rua · palco · disco · memória).  
4. Elo com [Palavras](${palavras}) + ficha \`inspecao-palavra-*\` (aqui: tempo).  
5. Se houver doença/substância na biografia: facto + limite — sem centro moralista.  
6. Status.

## Status

**Aprovado na série Pessoas** — Renato Russo e a Legião Urbana documentados como laboratório da palavra; elo principal com [Palavras](${palavras}) / [tempo](${tempo}); elo cultural secundário com [maconha](${maconha}).

[▶ Pessoas](${hub}) · [▶ Palavras](${palavras}) · [▶ Tempo](${tempo}) · [Wikipédia](${wiki})
`;

  const contentEn = `## Scope

Editorial inspection of **Renato Russo** (Renato Manfredini Júnior, 1960–1996) — lead vocalist and **lyricist** of **Legião Urbana**. BudGanja focus: the **method of the word** in Brazilian rock — political and generational Portuguese — crossed with **[Words](${palavras})**, especially **[tempo](${tempo})** (*Tempo Perdido*), and culturally with **[maconha](${maconha})**.

> **Method note:** based on [Wikipedia · Renato Russo](${wiki}) and [Legião Urbana](${wikiLegiao}). **Does not romanticize addiction, HIV/AIDS, or death.** Focus is lyric craft and the band as workshop.

## Inspected object

| Field | Value |
|-------|-------|
| Civil name | Renato Manfredini Júnior |
| Stage name | Renato Russo |
| Band | Legião Urbana (also Aborto Elétrico; solo work) |
| Classic lineup | Russo · Dado Villa-Lobos · Marcelo Bonfá · Renato Rocha (bass, 1984–89) |
| Main link | [Words](${palavras}) · [tempo](${tempo}) |
| Secondary | [maconha](${maconha}) · [Cannabis sativa](${planta}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** BudGanja value is the lyric — Portuguese that became national memory.  
**H2:** Legião Urbana is the workshop where the word becomes refrain.  
**H3:** Russo ↔ tempo inspects how a everyday word becomes song and then an anchor sheet.

## Method of the word

Lyric as primary craft · generational register · politics + intimacy · national refrain. If [Chorão](${chorao}) works language in skate/90s rock, Russo works it in the Legião generation (Brasília, national rock).

## Annotated phrases

Short quote from *Tempo Perdido* (*Dois*, 1986) — do not reproduce the full lyric:

> “Todos os dias quando acordo / Não tenho mais o tempo que passou.”

Daily ritual · named loss · link to [tempo](${tempo}).

## Status

**Approved in the People series** — primary link to Words / tempo; cultural secondary link to maconha; band documented as workshop.

[▶ People](${hub}) · [▶ Words](${palavras}) · [▶ Tempo](${tempo}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Inspección editorial de **Renato Russo** (Renato Manfredini Júnior, 1960–1996) — vocalista y **letrista** de **Legião Urbana**. Foco BudGanja: el **método de la palabra** en el rock brasileño — portugués político y generacional — cruzado con **[Palabras](${palavras})**, sobre todo **[tempo](${tempo})** (*Tempo Perdido*), y culturalmente con **[maconha](${maconha})**.

> **Nota metodológica:** basada en [Wikipedia · Renato Russo](${wiki}) y [Legião Urbana](${wikiLegiao}). **No romantiza la adicción, el VIH/sida ni la muerte.** El foco es el oficio de letrista y la banda como laboratorio.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | Renato Manfredini Júnior / Renato Russo |
| Banda | Legião Urbana (también Aborto Elétrico; discos solo) |
| Formación clásica | Russo · Dado Villa-Lobos · Marcelo Bonfá · Renato Rocha (bajo, 1984–89) |
| Enlace principal | [Palabras](${palavras}) · [tempo](${tempo}) |
| Secundario | [maconha](${maconha}) · [Cannabis sativa](${planta}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Método de la palabra

Letra como oficio · registro generacional · política + intimidad · estribillo nacional. Si [Chorão](${chorao}) trabaja la palabra en el skate/rock de los 90, Russo la trabaja en la generación Legião.

## Frases anotadas

Cita breve de *Tempo Perdido* (*Dois*, 1986) — no reproducir la letra completa:

> «Todos os dias quando acordo / Não tenho mais o tempo que passou.»

Ritual cotidiano · pérdida nombrada · vínculo con [tempo](${tempo}).

## Estado

**Aprobado en la serie Personas** — enlace principal con Palabras / tempo; enlace cultural secundario con maconha; banda documentada como laboratorio.

[▶ Personas](${hub}) · [▶ Palabras](${palavras}) · [▶ Tempo](${tempo}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildRenatoRussoPost() {
  const { body, contentEn, contentEs, wiki } = buildRenatoRussoBodies();
  return figuraPost({
    title: 'Inspeção: Renato Russo — Legião Urbana, letra geracional e a série Palavras',
    titleEn: 'Inspection: Renato Russo — Legião Urbana, generational lyrics and the Words series',
    titleEs: 'Inspección: Renato Russo — Legião Urbana, letra generacional y la serie Palabras',
    excerpt:
      'Pessoas × Palavras: Renato Russo e a Legião Urbana — letra geracional do rock BR cruzada com a ficha tempo (Tempo Perdido) e o hub de vocábulos.',
    excerptEn:
      'People × Words: Renato Russo and Legião Urbana — generational Brazilian rock lyrics crossed with the tempo sheet (Tempo Perdido) and the Words hub.',
    excerptEs:
      'Personas × Palabras: Renato Russo y Legião Urbana — letra generacional del rock BR cruzada con la ficha tempo (Tempo Perdido) y el hub de vocablos.',
    slug: 'inspecao-figura-renato-russo',
    date: '2026-08-03T17:00:00.000Z',
    seriesOrder: 12,
    seriesLabel: 'Renato Russo · pessoa',
    coverImage: '/imagens/inspecoes/renato-russo-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildRenatoRussoPost,
  buildRenatoRussoBodies
};
