'use strict';

/**
 * Vida · personagem Flor Maria Jane Maria
 * Pedido de campo: contato com flor maria jane maria personagem do canal joana e maria.
 *
 * Canal = o par Joana (folha) + Dona Maria (solo) no laboratório.
 * Jane = inglês de Joana. Maria Jane / Mary Jane = outra sala (gíria).
 * Ficha ≠ receita de floração ≠ ficha da palavra Maria ≠ ficha da palavra Flor.
 */

function poemPt() {
  return `Flor Maria Jane Maria.
O contacto que aparece
quando o solo da Maria
encontra a guarda da Joana.

Jane é a Joana em inglês.
Maria Jane é outra sala.
A flor não é a gíria.
A flor é o encontro.

Valeu !!!
folha e terra
no mesmo canal.`;
}

function poemEn() {
  return `Flor Maria Jane Maria.
The contact that appears
when Maria’s soil
meets Joana’s watch.

Jane is Joana in English.
Maria Jane is another room.
The flower is not the slang.
The flower is the meeting.

Valeu !!!
leaf and earth
on the same channel.`;
}

function poemEs() {
  return `Flor Maria Jane Maria.
El contacto que aparece
cuando el suelo de María
encuentra la guarda de Juana.

Jane es Juana en inglés.
Maria Jane es otra sala.
La flor no es la jerga.
La flor es el encuentro.

¡Valeu !!!
hoja y tierra
en el mismo canal.`;
}

function florLinks(L) {
  const joana = L.JOANA;
  const dona = L.DONA_MARIA;
  const flor = L.FLOR_PALAVRA || '/posts/post-inspecao-palavra-flor.html';
  const maria = L.MARIA_PALAVRA || '/posts/post-inspecao-palavra-maria.html';
  const contato = L.CONTATO || '/posts/post-inspecao-palavra-linha-10-cerol.html';
  const cannabis = L.CANNABIS || '/plantas/cannabis-sativa/';
  const valeu = L.VALEU || '/posts/post-inspecao-palavra-valeu.html';
  const vidaAmo = L.VIDA_AMO || '/posts/post-inspecao-expressao-eu-amo-a-vida.html';
  return { joana, dona, flor, maria, contato, cannabis, valeu, vidaAmo };
}

function bodyPt(L) {
  const x = florLinks(L);
  return `## Escopo

Ficha do personagem **Flor Maria Jane Maria** na série [Vida](${L.HUB}) — o **contacto visível** do canal **Joana e Maria**. Pedido de campo: *contato com flor maria jane maria personagem do canal joana e maria*.

> Conteúdo educacional da série Vida. **Ficha ≠ receita de floração, ≠ protocolo clínico, ≠ tutorial de gíria.** Personagem ≠ pessoa civil. Sem afiliação.

## Quem é

| Campo | Valor |
|-------|-------|
| Nome | **Flor Maria Jane Maria** |
| Função | A **flor** do laboratório — o encontro visível quando o solo e a folha trabalham juntos. |
| Especialidade | Nomear a floração com carinho; lembrar que flor é **desfecho**, não atalho. |
| Identidade | Personagem do **canal Joana e Maria**: [Joaninha Joana](${x.joana}) (guarda das folhas) + [Dona Maria](${x.dona}) (mestra do solo). |
| Gatilho de campo | **contato com Flor Maria Jane Maria** |
| Série | Vida · contos |
| Hub | [Vida](${L.HUB}) |
| História completa | [O Laboratório e a Sementinha](${L.HISTORIA}) |

## Canal Joana e Maria

No laboratório, **canal** não é um handle vazio da internet: é o **par** que conduz o cuidado.

| Peça | Ofício | Ficha |
|------|--------|-------|
| **Joana** | Folha, guarda biológica, joaninha | [Joaninha Joana](${x.joana}) |
| **Maria** | Solo vivo, cama da semente | [Dona Maria](${x.dona}) |
| **Flor** | O contacto que **aparece** quando os dois ofícios se encontram | Esta ficha |

**H-canal:** Joana + Maria = o canal. Flor Maria Jane Maria = a personagem **desse** canal, não um terceiro solo nem uma segunda joaninha.

## Contato

O gatilho *contato com…* nesta ficha é **encontro com a personagem** (a flor que se mostra). Não é a fala de pronto-socorro.

| Peça | Leitura lab | Não é |
|------|-------------|-------|
| **Contato** | Encontro com a flor / a personagem | E-mail · amizade de agenda · [contato com objeto cortante](${x.contato}) |
| **Flor** | Desfecho visível do cultivo — ver [flor](${x.flor}) | Forçar flor no inverno · receita |
| **Maria** | Nome próprio — ver [Maria](${x.maria}) | A planta · marijuana como definição desta ficha |
| **Jane** | Inglês de **Joana** | Outra pessoa civil |

**Veredicto de contacto:** a Joana vigia a folha; a Dona Maria faz a cama; a Flor **aparece**. Relacionar ≠ fundir.

## O nome em camadas

| Camada | Leitura | Corte |
|--------|---------|-------|
| **Flor** | A flor do conto; vocábulo em [flor](${x.flor}) | Não forçar floração |
| **Maria** | Eco da Dona Maria; vocábulo em [Maria](${x.maria}) | Nome ≠ planta |
| **Jane** | EN de Joana (a joaninha) | Jane ≠ outra heroína de ecrã |
| **Maria Jane** | Gíria inglesa *Mary Jane* (cannabis) | **Outra sala** — catálogo [Cannabis](${x.cannabis}); esta ficha **não** ensina a gíria nem o cultivo |
| **Maria** (de novo) | O nome volta: a flor leva o coração da mestra do solo | Não duplicar a Dona Maria |

**H-gíria:** a orelha cola *Maria Jane* em Mary Jane. O étimo do **personagem** é o canal Joana e Maria. A gíria fica no catálogo da planta. Duas salas.

## O que ensina

- Flor é **encontro**, não pressa.  
- Joana e Maria são o canal; a flor é o contacto.  
- Nome próprio, gíria e planta **não** são a mesma ficha.  
- Observar a floração com o mesmo carinho com que se observa a folha.

## Na prática

- No [hub Vida](${L.HUB}), seguir o par Joana + Dona Maria até esta ficha.  
- Ler [flor](${x.flor}) quando o objecto for o vocábulo; ler [Maria](${x.maria}) quando o objecto for o nome.  
- Desenhar uma flor entre uma joaninha e um vaso de terra — o canal, visível.

## Elos

- [História completa](${L.HISTORIA}) · hub [Vida](${L.HUB})
- Equipe: [Inspetor](${L.INSPETOR}) · [Dona Maria](${x.dona}) · [DJ Brisa](${L.DJ_BRISA}) · [Joana](${x.joana}) · [Flor Maria Jane Maria](${L.FLOR_HREF}) · [Three Little Birds](${L.PASSARINHOS})
- Léxico: [flor](${x.flor}) · [Maria](${x.maria}) · [Valeu !!!](${x.valeu}) · [eu amo a vida](${x.vidaAmo})
- Catálogo: [Plantas](${L.PLANTAS})

## Status

**Publicado** — personagem da série Vida; contacto do canal Joana e Maria (2026-08-24).`;
}

function bodyEn(L) {
  const x = florLinks(L);
  return `## Scope

Character sheet for **Flor Maria Jane Maria** in the [Vida](${L.HUB}) series — the **visible contact** of the **Joana and Maria** channel. Field request: *contact with flor maria jane maria, character of the joana e maria channel*.

> Educational content from the Vida series. **Sheet ≠ flowering recipe, ≠ clinical protocol, ≠ slang tutorial.** Character ≠ civil person. No affiliation.

## Who they are

| Field | Value |
|-------|-------|
| Name | **Flor Maria Jane Maria** |
| Role | The lab’s **flower** — the visible meeting when soil and leaf work together. |
| Specialty | Naming bloom with care; flower is an **outcome**, not a shortcut. |
| Identity | Character of the **Joana and Maria channel**: [Ladybug Joana](${x.joana}) (leaf guard) + [Dona Maria](${x.dona}) (soil master). |
| Field trigger | **contact with Flor Maria Jane Maria** |
| Series | Vida · stories |
| Hub | [Vida](${L.HUB}) |
| Full story | [The Lab and the Little Seed](${L.HISTORIA}) |

## Joana and Maria channel

In the lab, **channel** is not an empty internet handle: it is the **pair** that carries the care.

| Piece | Office | Sheet |
|-------|--------|-------|
| **Joana** | Leaf, biological guard, ladybug | [Ladybug Joana](${x.joana}) |
| **Maria** | Living soil, seed bed | [Dona Maria](${x.dona}) |
| **Flor** | The contact that **appears** when both offices meet | This sheet |

## Contact

The trigger *contact with…* here is **meeting the character** (the flower that shows). It is not ER speech.

| Piece | Lab reading | It is not |
|-------|-------------|-----------|
| **Contact** | Meeting the flower / the character | Email · [contact with a cutting object](${x.contato}) |
| **Flor** | Visible outcome of growing — see [flor](${x.flor}) | Forcing bloom in winter · a recipe |
| **Maria** | Proper name — see [Maria](${x.maria}) | The plant as this sheet’s definition |
| **Jane** | English for **Joana** | Another civil person |

## Name in layers

| Layer | Reading | Cut |
|-------|---------|-----|
| **Flor** | The story’s flower; word sheet [flor](${x.flor}) | Do not force flowering |
| **Maria** | Echo of Dona Maria; word sheet [Maria](${x.maria}) | Name ≠ plant |
| **Jane** | EN for Joana | Jane ≠ another screen heroine |
| **Maria Jane** | English slang *Mary Jane* (cannabis) | **Another room** — [Cannabis](${x.cannabis}) catalog; this sheet does **not** teach slang or grow |
| **Maria** (again) | The name returns | Do not duplicate Dona Maria |

## What they teach

- Flower is a **meeting**, not haste.  
- Joana and Maria are the channel; the flower is the contact.  
- Proper name, slang and plant are **not** the same sheet.

## Links

- [Full story](${L.HISTORIA}) · hub [Vida](${L.HUB})
- Team: [Inspector](${L.INSPETOR}) · [Dona Maria](${x.dona}) · [DJ Brisa](${L.DJ_BRISA}) · [Joana](${x.joana}) · [Flor Maria Jane Maria](${L.FLOR_HREF}) · [Three Little Birds](${L.PASSARINHOS})
- Lexicon: [flor](${x.flor}) · [Maria](${x.maria}) · [Valeu !!!](${x.valeu})
- Catalog: [Plants](${L.PLANTAS})

## Status

**Published** — Vida series character; contact of the Joana and Maria channel (2026-08-24).`;
}

function bodyEs(L) {
  const x = florLinks(L);
  return `## Alcance

Ficha del personaje **Flor Maria Jane Maria** en la serie [Vida](${L.HUB}) — el **contacto visible** del canal **Joana e Maria**. Pedido de campo: *contacto con flor maria jane maria, personaje del canal joana e maria*.

> Contenido educativo de la serie Vida. **Ficha ≠ receta de floración, ≠ protocolo clínico, ≠ tutorial de jerga.** Personaje ≠ persona civil. Sin afiliación.

## Quién es

| Campo | Valor |
|-------|-------|
| Nombre | **Flor Maria Jane Maria** |
| Función | La **flor** del laboratorio — el encuentro visible cuando suelo y hoja trabajan juntos. |
| Especialidad | Nombrar la floración con cariño; flor es **desenlace**, no atajo. |
| Identidad | Personaje del **canal Joana e Maria**: [Mariquita Juana](${x.joana}) + [Doña María](${x.dona}). |
| Gatillo de campo | **contacto con Flor Maria Jane Maria** |
| Serie | Vida · cuentos |
| Hub | [Vida](${L.HUB}) |
| Historia completa | [El Laboratorio y la Semillita](${L.HISTORIA}) |

## Canal Joana e Maria

En el laboratorio, **canal** no es un handle vacío: es el **par** que conduce el cuidado. Joana = hoja. María = suelo. Flor = el contacto que **aparece**.

## Contacto

El gatillo *contacto con…* aquí es **encuentro con el personaje**, no habla de urgencias.

## El nombre en capas

**Jane** = inglés de Joana. **Maria Jane** / *Mary Jane* = **otra sala** (jerga; catálogo [Cannabis](${x.cannabis})). Esta ficha no enseña jerga ni cultivo. Nombre ≠ planta — ver [Maria](${x.maria}) y [flor](${x.flor}).

## Qué enseña

- Flor es **encuentro**, no prisa.  
- Joana y María son el canal; la flor es el contacto.  
- Nombre propio, jerga y planta **no** son la misma ficha.

## Enlaces

- [Historia completa](${L.HISTORIA}) · hub [Vida](${L.HUB})
- Equipo: [Inspector](${L.INSPETOR}) · [Doña María](${x.dona}) · [DJ Brisa](${L.DJ_BRISA}) · [Juana](${x.joana}) · [Flor Maria Jane Maria](${L.FLOR_HREF}) · [Three Little Birds](${L.PASSARINHOS})
- Léxico: [flor](${x.flor}) · [Maria](${x.maria}) · [Valeu !!!](${x.valeu})
- Catálogo: [Plantas](${L.PLANTAS})

## Estado

**Publicado** — personaje de la serie Vida; contacto del canal Joana e Maria (2026-08-24).`;
}

function buildFlorMariaPersonagemCfg(L) {
  const href = L.FLOR_HREF;
  const pt = bodyPt(L);
  return {
    seriesOrder: 7,
    date: '2026-08-24',
    slug: 'inspecao-personagem-flor-maria-jane-maria',
    coverImage: 'imagens/inspecoes/vida-flor-maria-jane-maria-cover.jpg',
    nome: 'Flor Maria Jane Maria',
    title: 'Vida — Flor Maria Jane Maria, contacto do canal Joana e Maria',
    titleEn: 'Vida — Flor Maria Jane Maria, contact of the Joana and Maria channel',
    titleEs: 'Vida — Flor Maria Jane Maria, contacto del canal Joana e Maria',
    excerpt:
      'A flor do laboratório: contacto visível do canal Joana e Maria — solo da Dona Maria × guarda da Joana. Jane = Joana em inglês; Maria Jane = outra sala.',
    excerptEn:
      'The lab’s flower: visible contact of the Joana and Maria channel — Dona Maria’s soil × Joana’s watch. Jane = Joana in English; Maria Jane = another room.',
    excerptEs:
      'La flor del laboratorio: contacto visible del canal Joana e Maria — suelo de Doña María × guarda de Juana. Jane = Juana en inglés; Maria Jane = otra sala.',
    funcao: 'A flor do laboratório — o encontro visível quando o solo e a folha trabalham juntos.',
    especialidade: 'Nomear a floração com carinho; lembrar que flor é desfecho, não atalho.',
    identidade:
      'Personagem do canal Joana e Maria: Joaninha Joana (folhas) + Dona Maria (solo).',
    ensina: `- Flor é **encontro**, não pressa.  
- Joana e Maria são o canal; a flor é o contacto.  
- Nome próprio, gíria e planta **não** são a mesma ficha.`,
    pratica: `- No [hub Vida](${L.HUB}), seguir o par Joana + Dona Maria até [esta ficha](${href}).  
- Ler [flor](${L.FLOR_PALAVRA || '/posts/post-inspecao-palavra-flor.html'}) quando o objecto for o vocábulo.`,
    elosExtra: `- Léxico: [flor](${L.FLOR_PALAVRA || '/posts/post-inspecao-palavra-flor.html'}) · [Maria](${
      L.MARIA_PALAVRA || '/posts/post-inspecao-palavra-maria.html'
    })`,
    extraBody: pt.replace(/^## Escopo[\s\S]*?## Quem é[\s\S]*?\n\n/, '').replace(/\n## Status[\s\S]*$/, ''),
    skipDefaultBody: true,
    bodyOverride: pt,
    contentEn: bodyEn(L),
    contentEs: bodyEs(L),
    color1: '#3a1828',
    color2: '#1a2410',
    accent: '#e8a0c0'
  };
}

module.exports = {
  buildFlorMariaPersonagemCfg,
  bodyPt,
  bodyEn,
  bodyEs,
  poemPt,
  poemEn,
  poemEs,
  FLOR_SLUG: 'inspecao-personagem-flor-maria-jane-maria',
  FLOR_HREF: '/posts/post-inspecao-personagem-flor-maria-jane-maria.html'
};
