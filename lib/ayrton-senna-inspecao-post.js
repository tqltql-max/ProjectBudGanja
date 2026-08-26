'use strict';

/**
 * Inspeção Pessoas · homenagem completa a Ayrton Senna (Brasil).
 * Elo principal: expressão «Valeu !!!» — ofício, foco e doação.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildAyrtonSennaBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Ayrton_Senna';
  const instituto = 'https://www.institutoayrtonsenna.org.br/';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poema = '/posts/post-inspecao-palavra-valeu.html';
  const vida = '/vida/';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const vinganca = '/posts/post-inspecao-expressao-vinganca-mata-alma-envenena.html';
  const megaSena = '/posts/post-inspecao-palavra-mega-sena.html';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Ayrton Senna da Silva** (São Paulo, 21 mar. 1960 — Bolonha, 1 maio 1994) — piloto de Fórmula 1, empresário e filantropo brasileiro. Tricampeão mundial (1988, 1990, 1991). O recorte BudGanja **não** é culto do acidente nem inventário de rivalidades: é a **pessoa e o ofício** — foco, chuva, excelência e doação — com elo principal no mantra [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente com base na [Wikipédia · Ayrton Senna](${wiki}) e no legado público do [Instituto Ayrton Senna](${instituto}). Sem afiliação comercial com F1, McLaren, Williams ou marcas. Distinto do [Legado](${legado}) canábico. **Não romantiza a morte** — honra a vida, o ofício e o bem que ficou; quando a dor pedir companhia, o laboratório aponta [Vida](${vida}).

Esta ficha é o elo **Pessoas × Expressões (mantra)** — Senna como figura brasileira do **melhor possível nesta mão, hoje**.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome | **Ayrton Senna da Silva** |
| Nascimento / morte | 21 mar. 1960, São Paulo — 1 maio 1994, Bolonha (34 anos) |
| Nacionalidade | Brasileira |
| Ofícios | Piloto de Fórmula 1 · empresário · filantropo |
| Títulos F1 | **3× campeão mundial** (1988, 1990, 1991) |
| Números F1 (síntese) | 161 GPs · **41** vitórias · **80** pódios · **65** poles · 19 voltas mais rápidas |
| Equipes-marca | Toleman · Lotus · **McLaren-Honda** · Williams |
| Marca visual | Capacete amarelo (pintura Sid Mosca) · Brasil nas pistas |
| Legado social | [Instituto Ayrton Senna](${instituto}) (fundado por Viviane Senna) · Senninha (ideais de superação) |
| Tipo BudGanja | Pessoa — ofício de excelência × mantra Valeu !!! |
| Elo principal | [Valeu !!!](${mantra}) · [poema Vida](${poema}) |
| Elo Palavras | [gesto](${gesto}) · [caminho](${caminho}) · [risco](${risco}) · [verdade](${verdade}) · [criatividade](${criatividade}) |
| Fonte de partida | [Wikipédia · Ayrton Senna](${wiki}) |
| Data da inspeção | ${inspected} |

## Hipóteses e método

**H1:** o valor BudGanja de Senna é o **ofício do melhor** — preparação, foco e entrega no limite do possível **sem** transformar a morte em ideal.  
**H2:** [Valeu !!!](${mantra}) traduz o método Senna em linguagem do laboratório: o melhor **teu**, o de **hoje**, o que cabe **nesta mão**.  
**H3:** o bem duradouro inclui a **filantropia** e a educação (Instituto) — vitória que continua depois da bandeira xadrez.  
**H4:** rivalidade e pressão fazem parte da história pública; a resposta BudGanja **não** é [vingança](${vinganca}) — é ofício, verdade e caminho.

Passos (variante «herói nacional × mantra»):

1. Pessoa, datas e fonte wiki.  
2. Extrair o **método** (foco, chuva, preparação, doação).  
3. Elo obrigatório com [Valeu !!!](${mantra}).  
4. Nomear o legado social (Instituto).  
5. Limite ético: honrar sem glamourizar o acidente.  
6. Status — homenagem completa ao que há de bom.

## Quem foi (síntese verificável)

- Nasce em São Paulo (1960); infância em Santana / Zona Norte; pai Milton da Silva e mãe Neyde Senna.  
- Kart desde os 13 anos (1.ª vitória oficial em Interlagos, 1973); campeão brasileiro e sul-americano; capacete amarelo torna-se marca.  
- Europa: Fórmula Ford 1600/2000 e Fórmula 3 britânica (1983) — porta de entrada à F1.  
- F1: estreia 1984 (Toleman) — destaque sob chuva em Mônaco; Lotus 1985–87 (1.ª vitória em Estoril sob chuva, 1985); McLaren-Honda 1988–93 — tricampeonato; Williams 1994.  
- Amplamente lembrado como um dos maiores da F1 e ídolo brasileiro do século XX (ex.: eleito pela *IstoÉ* o esportista do século no Brasil).  
- Após a morte, Viviane Senna funda o **Instituto Ayrton Senna** — educação e oportunidade para crianças e jovens.

## Tudo de bom (méritos BudGanja)

| Mérito | Leitura no laboratório |
|--------|------------------------|
| Excelência repetida | Três títulos mundiais — método, não sorte isolada |
| Chuva e precisão | Domínio sob condições difíceis = [gesto](${gesto}) treinado |
| Foco e preparação | O «melhor» começa **antes** da largada |
| Brasil no grid | Orgulho nacional sem precisar diminuir o outro |
| Filantropia | Vitória que vira escola — [Instituto](${instituto}) |
| Senninha / ideais | Superação e dedicação traduzidas para novas gerações |
| Segurança (legado da época) | A dor de 1994 acelerou melhorias na F1 — o laboratório lê **cuidado**, não culto do risco cego |
| Capacete amarelo | Identidade visual = assinatura de ofício |

## O ofício que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Valeu !!! | Elo directo com [mantra](${mantra}) e [poema](${poema}) |
| Gesto | Mãos no volante = [gesto](${gesto}) de precisão |
| Caminho | Kart → Europa → F1 → legado social = [caminho](${caminho}) |
| Risco inspecionado | Velocidade com método — ver [risco](${risco}); não incentivar imprudência |
| Verdade na pista | Volta cronometrada não mente — elo [verdade](${verdade}) |
| Criatividade sob pressão | Improviso sob chuva / setup = [criatividade](${criatividade}) de ofício |
| Sem rancor | Rivalidade histórica ≠ [vingança](${vinganca}); resposta = método |

## Elo com «Valeu !!!»

Senna é, no mapa BudGanja, a figura brasileira que **encarna** o mantra sem precisar da frase literal:

| Camada | Ligação |
|--------|---------|
| Expressão | [Valeu !!!](${mantra}) — ofício diário |
| Poesia Vida | [poema Valeu !!!](${poema}) |
| Vida | [Página Vida](${vida}) — ficar e cuidar |
| Palavras | [gesto](${gesto}) · [caminho](${caminho}) · [verdade](${verdade}) |

> Abrir primeiro [Valeu !!!](${mantra}) se o interesse for o **mantra**; esta ficha se o interesse for a **pessoa** — a homenagem completa.

## Limites (leitura responsável)

- A morte em Ímola (GP de San Marino, 1994) é **facto histórico** — a homenagem **não** a transforma em ideal nem em espectáculo.  
- Esta ficha **não** é biografia fechada, ranking definitivo nem análise forense do acidente.  
- Velocidade e [risco](${risco}) no desporto de elite ≠ protocolo para a vida quotidiana: no laboratório, **cuidado** e **método** vêm primeiro.  
- Distinto do [Legado](${legado}) canábico — aqui o ofício é excelência humana e brasileira.  
- Corte de orelha: **[Mega-Sena](${megaSena})** (um **n**, lat. *sēnī* = seis da urna) **≠** o apelido **Senna** (dois **n**). Homofonia + calendário 1994/1996; não é homenagem no nome da loteria.

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}).  
- Tratar Senna no corpus como **homenagem de ofício e bem** — vitórias, foco, Instituto, Brasil.  
- O mantra [Valeu !!!](${mantra}) é a ponte viva: cada inspeção, cada verso, cada dia de cultivo pode «largar» com a mesma intenção.

## Como repetir o método

1. Pessoa + wiki + uma obra/legado social verificável.  
2. Extrair o **método** (como fazia o melhor), não só o CV.  
3. Elo obrigatório com Expressões / mantra quando couber.  
4. Slug \`inspecao-figura-…\`.  
5. Declarar limites éticos quando a biografia inclui morte trágica.

## Status

**Aprovado na série Pessoas** — homenagem completa a Ayrton Senna do Brasil: tudo de bom do ofício, com elo principal em [Valeu !!!](${mantra}).

[▶ Pessoas](${hub}) · [▶ Valeu !!!](${mantra}) · [▶ Poema](${poema}) · [▶ Vida](${vida}) · [▶ Instituto](${instituto}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage and editorial inspection of **Ayrton Senna da Silva** (São Paulo, 21 Mar 1960 — Bologna, 1 May 1994) — Brazilian Formula 1 driver, businessman and philanthropist. Three-time world champion (1988, 1990, 1991). BudGanja focus: the **person and craft** — focus, rain, excellence and giving — with primary link to [Valeu !!!](${mantra}).

> **Method note:** independent audit from [Wikipedia · Ayrton Senna](${wiki}) and the public legacy of the [Instituto Ayrton Senna](${instituto}). No commercial affiliation. Does **not** romanticize the crash. For companionship, see [Vida](${vida}). Distinct from cannabis Legacy.

## Inspected object

| Field | Value |
|-------|-------|
| Name | **Ayrton Senna da Silva** |
| Titles | **3× F1 World Champion** (1988, 1990, 1991) |
| F1 summary | 161 GPs · **41** wins · **80** podiums · **65** poles |
| Social legacy | [Instituto Ayrton Senna](${instituto}) |
| Lab type | Person — craft of excellence × Valeu !!! |
| Main link | [Valeu !!!](${mantra}) · [Vida poem](${poema}) |
| Words | [gesture](${gesto}) · [path](${caminho}) · [risk](${risco}) · [truth](${verdade}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Hypotheses

**H1:** Senna’s BudGanja value is the **craft of the best** — preparation and delivery without making death an ideal.  
**H2:** [Valeu !!!](${mantra}) translates Senna’s method: *your* best, *today’s*, what fits *in this hand*.  
**H3:** Lasting good includes education/philanthropy (Instituto).  
**H4:** Rivalry ≠ [revenge](${vinganca}) — answer with craft and truth.

## Who he was (verifiable)

- Born in São Paulo (1960); kart from age 13; Brazilian/South American titles; yellow helmet trademark.  
- Europe: Formula Ford and British F3 (1983) → F1.  
- F1: Toleman 1984 (Monaco rain standout); Lotus 1985–87 (first win Estoril 1985 in rain); McLaren-Honda tricampeonato; Williams 1994.  
- Widely remembered among the greatest in F1 and a Brazilian icon of the 20th century.  
- After his death, Viviane Senna founded the **Instituto Ayrton Senna**.

## All the good (lab merits)

| Merit | Reading |
|-------|---------|
| Repeated excellence | Three world titles — method, not one-off luck |
| Rain & precision | Hard conditions = trained [gesture](${gesto}) |
| Focus before the lights | The “best” starts before the start |
| Brazil on the grid | National pride without diminishing others |
| Philanthropy | Victory that becomes school — [Instituto](${instituto}) |
| Safety legacy of the era | 1994 pain sped up F1 safety — read as **care**, not cult of blind risk |

## Link to “Valeu !!!”

| Layer | Link |
|-------|------|
| Expression | [Valeu !!!](${mantra}) |
| Vida poem | [poem](${poema}) |
| Vida | [Vida page](${vida}) |

## Limits

- Imola 1994 is historical fact — homage does **not** turn it into spectacle or ideal.  
- Not a closed biography, definitive ranking, or forensic crash analysis.  
- Elite speed ≠ everyday protocol: in the lab, **care** and **method** come first.

## Status

**Approved in People series** — full homage to Ayrton Senna of Brazil, primary link [Valeu !!!](${mantra}).

[▶ People](${hub}) · [▶ Valeu !!!](${mantra}) · [▶ Poem](${poema}) · [▶ Instituto](${instituto}) · [Wikipedia](${wiki})
`;

  const contentEs = `## Alcance

Homenaje e inspección editorial de **Ayrton Senna da Silva** (São Paulo, 21 mar. 1960 — Bolonia, 1 mayo 1994) — piloto brasileño de Fórmula 1, empresario y filántropo. Tricampeón mundial (1988, 1990, 1991). Recorte BudGanja: la **persona y el oficio** — foco, lluvia, excelencia y donación — con vínculo principal en [¡Valeu !!!](${mantra}).

> **Nota metodológica:** auditoría independiente con [Wikipedia · Ayrton Senna](${wiki}) y el legado público del [Instituto Ayrton Senna](${instituto}). Sin afiliación comercial. **No** romantiza la muerte. Compañía: [Vida](${vida}). Distinto del Legado cannábico.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre | **Ayrton Senna da Silva** |
| Títulos | **3× campeón mundial** de F1 (1988, 1990, 1991) |
| Resumen F1 | 161 GP · **41** victorias · **80** podios · **65** poles |
| Legado social | [Instituto Ayrton Senna](${instituto}) |
| Tipo lab | Persona — oficio de excelencia × Valeu !!! |
| Vínculo principal | [¡Valeu !!!](${mantra}) · [poema Vida](${poema}) |
| Palabras | [gesto](${gesto}) · [camino](${caminho}) · [riesgo](${risco}) · [verdad](${verdade}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Hipótesis

**H1:** el valor BudGanja de Senna es el **oficio de lo mejor** — preparación y entrega sin idealizar la muerte.  
**H2:** [¡Valeu !!!](${mantra}) traduce el método Senna: lo mejor *tuyo*, el de *hoy*, lo que cabe *en esta mano*.  
**H3:** el bien duradero incluye la filantropía/educación (Instituto).  
**H4:** rivalidad ≠ [venganza](${vinganca}) — respuesta con oficio y verdad.

## Quién fue (verificable)

- Nace en São Paulo (1960); kart desde los 13; títulos brasileños/sudamericanos; casco amarillo.  
- Europa: Fórmula Ford y F3 británica (1983) → F1.  
- F1: Toleman 1984; Lotus 1985–87 (primera victoria Estoril 1985 bajo lluvia); McLaren-Honda tricampeonato; Williams 1994.  
- Recordado entre los más grandes de la F1 e ídolo brasileño del siglo XX.  
- Tras su muerte, Viviane Senna funda el **Instituto Ayrton Senna**.

## Todo lo bueno (méritos)

| Mérito | Lectura |
|--------|---------|
| Excelencia repetida | Tres títulos — método |
| Lluvia y precisión | Condiciones difíciles = [gesto](${gesto}) entrenado |
| Foco antes de la salida | Lo «mejor» empieza antes |
| Brasil en la parrilla | Orgullo sin disminuir al otro |
| Filantropía | Victoria que se vuelve escuela — [Instituto](${instituto}) |
| Legado de seguridad de la época | El dolor de 1994 aceleró la seguridad en F1 — **cuidado**, no culto al riesgo ciego |

## Vínculo con «¡Valeu !!!»

| Capa | Enlace |
|------|--------|
| Expresión | [¡Valeu !!!](${mantra}) |
| Poema Vida | [poema](${poema}) |
| Vida | [página Vida](${vida}) |

## Límites

- Ímola 1994 es hecho histórico — el homenaje **no** lo convierte en espectáculo ni ideal.  
- No es biografía cerrada ni análisis forense.  
- Velocidad de élite ≠ protocolo cotidiano: en el lab, primero **cuidado** y **método**.

## Estado

**Aprobado en serie Personas** — homenaje completo a Ayrton Senna de Brasil, vínculo principal [¡Valeu !!!](${mantra}).

[▶ Personas](${hub}) · [▶ ¡Valeu !!!](${mantra}) · [▶ Poema](${poema}) · [▶ Instituto](${instituto}) · [Wikipedia](${wiki})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildAyrtonSennaPost() {
  const { body, contentEn, contentEs, wiki } = buildAyrtonSennaBodies();
  return figuraPost({
    title:
      'Inspeção: Ayrton Senna — homenagem completa ao Brasil e ao Valeu !!!',
    titleEn:
      'Inspection: Ayrton Senna — full homage to Brazil and Valeu !!!',
    titleEs:
      'Inspección: Ayrton Senna — homenaje completo a Brasil y ¡Valeu !!!',
    excerpt:
      'Pessoas × Expressões: homenagem completa a Ayrton Senna (1960–1994) — tricampeão, ofício, filantropia e elo principal no mantra Valeu !!!; sem romantizar a morte.',
    excerptEn:
      'People × Expressions: full homage to Ayrton Senna (1960–1994) — three-time champion, craft, philanthropy and primary link to Valeu !!!; without romanticizing death.',
    excerptEs:
      'Personas × Expresiones: homenaje completo a Ayrton Senna (1960–1994) — tricampeón, oficio, filantropía y vínculo principal en ¡Valeu !!!; sin romantizar la muerte.',
    slug: 'inspecao-figura-ayrton-senna',
    date: '2026-08-03T13:00:00.000Z',
    seriesOrder: 11,
    seriesLabel: 'Ayrton Senna · pessoa',
    coverImage: '/imagens/inspecoes/ayrton-senna-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAyrtonSennaPost,
  buildAyrtonSennaBodies
};
