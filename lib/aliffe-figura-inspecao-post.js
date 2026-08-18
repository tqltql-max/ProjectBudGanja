'use strict';

/**
 * Inspeção Pessoas · Aleff (Aliffe Henrique de Carvalho).
 * Recorte: a pessoa — não a persona de ecrã, não o catálogo de jogos.
 */

const { figuraPost } = require('./pessoas-historia-inspecoes-posts.js');

function buildAliffeBodies() {
  const inspected = '2026-08-18';
  const hub = '/biblioteca/inspecoes/#inspecoes-pessoas-historia';
  const wiki = 'https://pt.wikipedia.org/wiki/Paulinho_o_Loko';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const zangado = '/posts/post-inspecao-canal-zangado.html';
  const games = '/jogos/aleff/';
  const legado = '/biblioteca/inspecoes/#inspecoes-pessoas';
  const palavras = '/biblioteca/inspecoes/#inspecoes-palavras';

  const body = `## Escopo

Homenagem editorial e inspeção documental de **Aliffe Henrique de Carvalho** — no laboratório, **Aleff** — nascido em **Machado**, Minas Gerais, a 21 de dezembro de 2001. O mundo conhece-o por **Paulinho o LOKO**. Esta ficha **não** inspeciona o canal, o ranking nem o catálogo de sessões: inspeciona a **pessoa**. O apelido fica como **crédito público**, não como redução.

> **Nota metodológica:** auditoria independente com base na [Wikipédia · Paulinho o Loko](${wiki}) e em reportagens públicas (ge, Folha Vitória). Grafia civil: **Aliffe**. Grafia do laboratório: **Aleff** — o mesmo homem, dois modos de escrever o nome. Sem afiliação com canais, marcas ou organizações. Distinto do [Legado](${legado}) canábico. Distinto da ficha de [canal Zangado](${zangado}) (ofício de crítica no ecrã). **Ficção de jogo ≠ manual de crime.** Não se inventa vida privada.

Esta ficha é o elo **Pessoas × respeito** — Aleff como figura especial do catálogo: mineiro, rosto, persistência. O arquivo de jogos vive em [Games](${games}); a pessoa vive aqui.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Nome civil | **Aliffe Henrique de Carvalho** |
| Nome no laboratório | **Aleff** |
| Nome público | Paulinho o LOKO — crédito, não objecto |
| Nascimento | 21 dez. 2001, **Machado**, Minas Gerais |
| Nacionalidade | Brasileira |
| Ofício humano | Presença, humor, persistência — o ecrã é um sítio onde isso aparece, não a definição da pessoa |
| Tipo BudGanja | Pessoa — mérito de gente, não de métrica |
| Elo principal | [respeito](${respeito}) · [caminho](${caminho}) · [gesto](${gesto}) |
| Elo Palavras | [skill](${skill}) · [ídolo](${idolo}) · [verdade](${verdade}) · [criatividade](${criatividade}) |
| Elo mantra | [Faça o melhor!](${mantra}) |
| Contraste | [Zangado](${zangado}) — canal / crítica · Aleff — **pessoa** |
| Arquivo (secundário) | [Games](${games}) — crédito do trabalho; não substitui esta ficha |
| Fonte de partida | [Wikipédia · Paulinho o Loko](${wiki}) |
| Data da inspeção | ${inspected} |

## Por que esta inspeção existe

Na fila do laboratório: **não reduzir** quem o ecrã trata como persona. Aleff é um rapaz de Machado. Tem nome civil. Mostrou o rosto. Persistiu depois de rejeição. O laboratório deve-lhe o mesmo método que deve a [Senna](/posts/post-inspecao-figura-ayrton-senna.html) ou a [Tamara](/posts/post-inspecao-tamara-klink.html): **pessoa primeiro**, ofício depois, métrica nunca no centro.

A palavra [ídolo](${idolo}) avisa justamente isto: *confundir persona com pessoa inteira* é mau uso. Esta ficha é o antídoto — admirar o feito sem entregar Aleff ao pedestal nem ao rótulo «streamer».

## Hipóteses e método

**H1:** o valor BudGanja de Aleff **não** é audiência, organização ou ranking: é a **pessoa** — nome, terra, rosto, persistência.  
**H2:** o apelido público é **máscara útil** (como o ecrã); a ficha chama-o **Aleff / Aliffe** para devolver o nome.  
**H3:** mostrar o rosto (2018) é [gesto](${gesto}) de presença — o contrário da máscara do [Zangado](${zangado}), e os dois méritos cabem no laboratório sem se anularem.  
**H4:** a rejeição relatada (banimentos, humilhação em servidores) lê-se como [caminho](${caminho}) de obstinação, não como glória de «anti-regra».  
**H5:** fecho = [respeito](${respeito}) + [Faça o melhor!](${mantra}) — o melhor recorte possível *desta* pessoa *nesta* ficha.

Passos (variante «pessoa especial × não persona»):

1. Nome civil + grafia do lab + terra.  
2. Extrair o **método humano** (rosto, humor, persistência), não o CV de plataforma.  
3. Declarar o apelido como crédito, não como objecto.  
4. Elos de Palavras que protegem a pessoa ([respeito](${respeito}), [ídolo](${idolo}), [verdade](${verdade})).  
5. Arquivo de jogos como satélite.  
6. Status com mérito de gente.

## Quem é (síntese verificável)

- Nasce em **Machado** (MG), 21 de dezembro de 2001 — interior, não capital.  
- Grafia oficial nas fontes: **Aliffe Henrique de Carvalho**. No BudGanja escreve-se também **Aleff**.  
- 2015: começa a publicar no YouTube ainda adolescente, no canal «Modder» — primeiro vídeo de *Grand Theft Auto V*; também trotes. O começo é de **rapaz a tentar**, não de marca.  
- 13 de julho de 2018: **mostra o rosto** pela primeira vez (vídeo no shopping). Data de presença: deixa de ser só voz / persona.  
- 16 de junho de 2020: primeiro vídeo num servidor de *roleplay* — um sítio do ofício, não a biografia.  
- 2021: passa também a transmitir ao vivo (Twitch, nas fontes).  
- 2 de setembro de 2022: entra na organização Fluxo; em janeiro de 2024 **sai** — autonomia, não identidade permanente de camisola.  
- Reconhecimento público (ge, Prêmio eSports Brasil): entre os mais assistidos em 2022; 5.º no ranking mundial de janeiro de 2023; **Melhor Streamer** no PeB 2024 e 2025; **Melhor Creator Long Form** em 2025. O laboratório regista o prémio como **eco do ofício**, não como definição da pessoa.

## O método que interessa ao BudGanja

| Traço | Tradução editorial |
|-------|-------------------|
| Nome antes do apelido | Aliffe / Aleff — a pessoa tem nome; «Paulinho o LOKO» é crédito |
| Terra | Machado (MG) — [caminho](${caminho}) que começa no interior |
| Rosto | 2018: [gesto](${gesto}) de aparecer; presença, não avatar eterno |
| Humor | Calor humano no ecrã — [criatividade](${criatividade}) de gente, não de hype |
| Persistência | Rejeição relatada → continuar — obstinação, não culto do ban |
| Autonomia | Entrar e sair da Fluxo — a pessoa não é a camisola |
| Anti-ídolo | [Ídolo](${idolo}) inspeciona o pedestal; aqui devolve-se a pessoa |
| Contraste Zangado | Thiago: voz sem rosto, ficha de **canal**. Aleff: rosto e nome, ficha de **pessoa** |

## Tudo de bom (méritos de pessoa)

| Mérito | Leitura no laboratório |
|--------|------------------------|
| Ter nome | Aliffe / Aleff — devolver a grafia humana |
| Ser de Machado | Origem concreta; não «o maior do Brasil» como primeira frase |
| Mostrar o rosto | Coragem de presença — [gesto](${gesto}) |
| Começar novo | 2015, adolescente, canal «Modder» — [skill](${skill}) como ofício que se aprende |
| Continuar depois da rejeição | [Caminho](${caminho}) com obstinação |
| Sair da organização | Não ficar preso à camisola |
| Humor que aquece | Presença que faz companhia — distinto de crítica (Zangado) |
| Prémios como eco | 2024–2025: reconhecimento; o centro continua a ser a gente |

## Aleff ≠ canal · ≠ ídolo · ≠ catálogo

| Confusão | Correção BudGanja |
|----------|-------------------|
| «É um streamer» | É **Aleff**, pessoa de Machado; o ecrã é um sítio do ofício |
| «É o Paulinho o LOKO» | Esse é o **nome público**. A ficha chama-o pelo nome |
| «A inspeção é o catálogo» | O catálogo está em [Games](${games}). Aqui está a **pessoa** |
| «É o par do Zangado» | Zangado tem ficha de [canal](${zangado}). Aleff tem ficha de **Pessoas**. Complementares, não simétricos |
| «É ídolo do lab» | [Ídolo](${idolo}) avisa: admirar o feito, não entregar a mão. Aleff não é santo do laboratório — é gente com crédito |

## Elo com Palavras e o mantra

| Recurso | Papel |
|---------|-------|
| [Respeito](${respeito}) | Como o laboratório o trata — pessoa especial, não rótulo |
| [Caminho](${caminho}) | Machado → rosto → persistência → autonomia |
| [Gesto](${gesto}) | Mostrar a cara; presença |
| [Skill](${skill}) | Ofício que se aprende — craft, não badge |
| [Ídolo](${idolo}) | Separar persona e pessoa inteira |
| [Verdade](${verdade}) | Nome civil e terra antes da métrica |
| [Criatividade](${criatividade}) | Humor como invenção humana |
| [Faça o melhor!](${mantra}) | O melhor recorte *desta* pessoa *hoje* |
| Hub [Palavras](${palavras}) | Léxico que protege a gente |

> Abrir primeiro esta ficha se o interesse for o **Aleff**. Abrir [Games](${games}) se o interesse for o **arquivo**. Abrir [Zangado](${zangado}) se o interesse for a **crítica de jogo**. Não trocar uma pela outra.

## Limites (leitura responsável)

- Esta ficha **não** é biografia fechada, ranking nem perfil de fã.  
- **Não** se inventa vida privada, família, namoro ou rendimentos.  
- Banimentos e «anti-RP» relatados em imprensa entram como **persistência**, não como manual nem como glória de infração.  
- Prémios e números de audiência são **contexto** — se ocuparem o centro, a inspeção falhou.  
- Distinto do [Legado](${legado}) canábico.  
- **Ficção de jogo ≠ manual de crime.**

## Complementaridade com o Inspetor BudGanja

- Hub [Pessoas](${hub}) — Aleff entra como **gente**, com o mesmo respeito das outras figuras.  
- [Games](${games}) guarda o arquivo; o cartão da pessoa aponta para cá.  
- [Zangado](${zangado}) continua a ser o crítico de método no ecrã — ofício distinto, crédito distinto.  
- Tratar Aleff no corpus como **pessoa especial**: nome, terra, rosto, caminho.

## Como repetir o método

1. Pessoa com nome civil + terra + fonte wiki.  
2. Recusar o rótulo de plataforma como primeira frase.  
3. Extrair o método humano (rosto, persistência, humor).  
4. Elos [respeito](${respeito}) / [ídolo](${idolo}) / [caminho](${caminho}).  
5. Arquivo de trabalho como satélite, nunca como objecto.  
6. Slug \`inspecao-figura-…\`.  
7. Status com mérito de gente.

## Status

**Aprovado na série Pessoas com mérito de pessoa especial** — Aliffe Henrique de Carvalho · **Aleff** · Machado · nome antes do apelido · rosto · caminho. O ecrã não o define.

[▶ Pessoas](${hub}) · [▶ respeito](${respeito}) · [▶ caminho](${caminho}) · [▶ ídolo](${idolo}) · [▶ Faça o melhor!](${mantra}) · [▶ Games (arquivo)](${games}) · [Wikipedia](${wiki})
`;

  const contentEn = `## Scope

Homage and editorial inspection of **Aliffe Henrique de Carvalho** — in this lab, **Aleff** — born in **Machado**, Minas Gerais, 21 December 2001. The world knows him as **Paulinho o LOKO**. This sheet does **not** inspect the channel, the ranking or the session catalog: it inspects the **person**. The public name is **credit**, not a reduction.

> **Method note:** independent audit from [Wikipedia · Paulinho o Loko](${wiki}) and public reports. Civil spelling **Aliffe**; lab spelling **Aleff**. No affiliation. Distinct from cannabis [Legacy](${legado}) and from the [Zangado channel](${zangado}) sheet. **Game fiction is not a crime manual.** No invented private life.

## Inspected object

| Field | Value |
|-------|-------|
| Civil name | **Aliffe Henrique de Carvalho** |
| Lab name | **Aleff** |
| Public name | Paulinho o LOKO — credit, not the object |
| Birth | 21 Dec 2001, **Machado**, Minas Gerais |
| Lab type | Person — human merit, not metrics |
| Main links | [respect](${respeito}) · [path](${caminho}) · [gesture](${gesto}) |
| Contrast | [Zangado](${zangado}) = channel / critique · Aleff = **person** |
| Archive (secondary) | [Games](${games}) |
| Source | [Wikipedia](${wiki}) |
| Date | ${inspected} |

## Why this sheet exists

Do **not** reduce someone the screen treats as a persona. Aleff is a young man from Machado. He has a civil name. He showed his face. He kept going after rejection. Same method as [Senna](/posts/post-inspecao-figura-ayrton-senna.html): **person first**.

## Who he is (verifiable)

- Born in Machado (MG), 21 Dec 2001.  
- 2015: starts on YouTube as a teenager, channel «Modder».  
- 13 Jul 2018: **shows his face** for the first time.  
- 16 Jun 2020: first roleplay-server video — a workplace, not the biography.  
- 2021: live broadcasts (Twitch, in sources).  
- Fluxo from 2 Sep 2022; leaves Jan 2024 — autonomy, not a permanent jersey.  
- Public awards (PeB Best Streamer 2024 and 2025) are an **echo of craft**, not the definition of the person.

## Method that matters

Name before nickname · Machado as origin · face as [gesture](${gesto}) · humor as human warmth · persistence after rejection · leaving the org · [idol](${idolo}) as warning not to confuse persona with the whole person.

## Status

**Approved in People with special-person merit** — Aliffe / **Aleff** · Machado · name before nickname · face · path. The screen does not define him.

[▶ People](${hub}) · [▶ respect](${respeito}) · [▶ Games (archive)](${games})
`;

  const contentEs = `## Alcance

Homenaje e inspección editorial de **Aliffe Henrique de Carvalho** — en este laboratorio, **Aleff** — nacido en **Machado**, Minas Gerais, el 21 de diciembre de 2001. El mundo lo conoce como **Paulinho o LOKO**. Esta ficha **no** inspecciona el canal, el ranking ni el catálogo: inspecciona a la **persona**. El apodo es **crédito**, no reducción.

> **Nota metodológica:** auditoría independiente a partir de [Wikipedia · Paulinho o Loko](${wiki}). Grafía civil **Aliffe**; grafía del lab **Aleff**. Sin afiliación. Distinto del [Legado](${legado}) cannábico y de la ficha del [canal Zangado](${zangado}). **Ficción de juego ≠ manual de crimen.** No se inventa vida privada.

## Objeto inspeccionado

| Campo | Valor |
|-------|-------|
| Nombre civil | **Aliffe Henrique de Carvalho** |
| Nombre en el lab | **Aleff** |
| Nombre público | Paulinho o LOKO — crédito, no el objeto |
| Nacimiento | 21 dic. 2001, **Machado**, Minas Gerais |
| Tipo lab | Persona — mérito de gente, no de métrica |
| Vínculos | [respeto](${respeito}) · [camino](${caminho}) · [gesto](${gesto}) |
| Contraste | [Zangado](${zangado}) = canal / crítica · Aleff = **persona** |
| Archivo (secundario) | [Games](${games}) |
| Fuente | [Wikipedia](${wiki}) |
| Fecha | ${inspected} |

## Por qué existe

No reducir a quien la pantalla trata como persona-marca. Aleff es un joven de Machado. Tiene nombre civil. Mostró el rostro. Siguió después del rechazo. Misma regla que [Senna](/posts/post-inspecao-figura-ayrton-senna.html): **persona primero**.

## Quién es (verificable)

- Nace en Machado (MG), 21 dic. 2001.  
- 2015: empieza en YouTube siendo adolescente, canal «Modder».  
- 13 jul. 2018: **muestra el rostro** por primera vez.  
- 16 jun. 2020: primer vídeo en servidor de roleplay — un sitio del oficio, no la biografía.  
- 2021: también transmite en vivo (Twitch, en las fuentes).  
- Fluxo desde el 2 sep. 2022; sale en ene. 2024.  
- Premios públicos (PeB 2024 y 2025) = **eco del oficio**, no definición de la persona.

## Método que importa

Nombre antes del apodo · Machado · rostro como [gesto](${gesto}) · humor humano · persistencia · [ídolo](${idolo}) como aviso: no confundir persona con persona-marca.

## Estado

**Aprobado en Personas con mérito de persona especial** — Aliffe / **Aleff** · Machado · nombre antes del apodo · rostro · camino. La pantalla no lo define.

[▶ Personas](${hub}) · [▶ respeto](${respeito}) · [▶ Games (archivo)](${games})
`;

  return { body, contentEn, contentEs, wiki };
}

function buildAliffePost() {
  const { body, contentEn, contentEs, wiki } = buildAliffeBodies();
  return figuraPost({
    title: 'Inspeção: Aleff — Aliffe de Machado, pessoa antes do ecrã',
    titleEn: 'Inspection: Aleff — Aliffe from Machado, the person before the screen',
    titleEs: 'Inspección: Aleff — Aliffe de Machado, la persona antes de la pantalla',
    excerpt:
      'Pessoas: Aliffe Henrique de Carvalho (Aleff) — mineiro de Machado; o recorte é a pessoa, não a persona de ecrã. O nome público Paulinho o LOKO fica como crédito, não como redução.',
    excerptEn:
      'People: Aliffe Henrique de Carvalho (Aleff) — from Machado, Minas Gerais; the cut is the person, not the on-screen persona. The public name Paulinho o LOKO is credit, not a reduction.',
    excerptEs:
      'Personas: Aliffe Henrique de Carvalho (Aleff) — de Machado, Minas Gerais; el recorte es la persona, no la marca de pantalla. El nombre público Paulinho o LOKO es crédito, no reducción.',
    slug: 'inspecao-figura-aleff',
    date: '2026-08-18T03:15:00.000Z',
    seriesOrder: 12,
    seriesLabel: 'Aleff · pessoa',
    coverImage: 'imagens/inspecoes/aleff-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAliffePost,
  buildAliffeBodies
};
