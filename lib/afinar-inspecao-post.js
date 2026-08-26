'use strict';

/**
 * Inspeção Palavras · afinar
 * Eixos: a- + fino + -ar ← lat. fīnis · objecto violão · passarinho assobiando ·
 * desafinar · Valeu !!!
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

const COVER = '/imagens/inspecoes/afinar-palavra-cover.jpg';
const WIKT = 'https://pt.wiktionary.org/wiki/afinar';
const WIKT_FINO = 'https://pt.wiktionary.org/wiki/fino';
const DLE = 'https://dle.rae.es/afinar';

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

function buildAfinarBodies() {
  const inspected = '2026-08-22';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const hubAll = '/biblioteca/inspecoes/';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const self = '/posts/post-inspecao-palavra-afinar.html';
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const afinador = '/posts/post-inspecao-palavra-afinador.html';
  const objetosCat = '/objetos/';
  const violao = '/posts/post-inspecao-palavra-violao.html';
  const corda = '/posts/post-inspecao-palavra-corda.html';
  const teoriaCordas = '/posts/post-inspecao-palavra-teoria-das-cordas.html';
  const tonos = '/posts/post-inspecao-palavra-tonos.html';
  const orfeu = '/posts/post-inspecao-palavra-orfeu.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const alegria = '/posts/post-inspecao-palavra-alegria.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const inspiracao = '/posts/post-inspecao-palavra-inspiracao.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const poemMantra = '/posts/post-inspecao-palavra-valeu.html';
  const birds = '/posts/post-inspecao-personagem-three-little-birds.html';
  const conto = '/posts/post-inspecao-conto-vida-laboratorio.html';
  const upside = '/posts/post-inspecao-arte-upside-down.html';

  const body = `## Escopo

Inspeção editorial da palavra **[afinar](${self})** — *a-* + *fino* + *-ar*, de *fino* ← lat. *fīnis* («limite, termo»). O pedido de campo põe dois testemunhos no mesmo tom: o **[objecto violão](${violao})** ([corda](${corda}) que se aperta até o diapasão) e o **passarinho assobiando** (bico que já sai no tom, sem cravelha). Esta ficha cobre o **lema**, o par **instrumento × bicho**, o contraste com **desafinar**, e o fecho [Valeu !!!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wikcionário · afinar](${WIKT}), [fino](${WIKT_FINO}), [DLE · afinar](${DLE}). Grafia viva *asoviar* / *assoviar* = **assobiar**. **Ficha ≠ aula de harmonia nem ornitologia.** Tom: Inspetor BudGanja — afinar é [gesto](${gesto}) de ofício, não perfeccionismo alheio.

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Palavra | **afinar** |
| Classe | Verbo (tr. / intr. / prnl.) |
| Étimo (trabalho) | *a-* + *fino* + *-ar* ← *fino* ← lat. *fīnis*; infl. fr. *affiner* («purificar, tornar fino») — confiança: **alta** |
| Família | *fino* · *afinado* · *afinação* · *desafinar* · *afinar-se* |
| Não confundir | *afim* / *afinidade* (vizinhança) · *afinar* «recuar de medo» (registo regional) · *finalizar* (outro *afinar* de *fim*, desusado / Chile) |
| Tipo BudGanja | Palavra — tom × ofício × [objecto](${objetos}) |
| Objecto-âncora | **[violão](${violao})** — [corda](${corda}), cravelha, ouvido |
| Testemunha viva | **passarinho assobiando** — sem [afinador](${afinador}), já no tom |
| Objecto-leitor | **[afinador](${afinador})** — clip / diapasão / app; muleta, não dono |
| Elo lab | [Three Little Birds](${birds}) · [conto Vida](${conto}) · [Vida](${vida}) |
| Fonte | [afinar (PT)](${WIKT}) |
| Data | ${inspected} |

**O que é o objecto:** o verbo que leva uma coisa **ao ponto certo** — fino, justo, no tom. No laboratório: apertar a cravelha do [violão](${violao}) até a [corda](${corda}) **encontrar** o assobio do passarinho, não até a corda **partir**.

## 2. Violão × passarinho assobiando

Dois modos de estar no tom — um precisa de [gesto](${gesto}); o outro já vem afinado.

| Testemunha | O que é | Como afina | No BudGanja |
|-----------|---------|------------|-------------|
| **Violão** | [Objecto](${violao}) de madeira, [corda](${corda}) e cravelha | A mão gira; o ouvido confirma; o [afinador](${afinador}) é muleta, não dono | Ofício: **afinar antes de tocar** — senão o verso desafina o quarto |
| **Passarinho assobiando** | Bicho pequeno; o assobio é [sinal](${sinal}) e [alegria](${alegria}) | Não aperta cravelha. O corpo já «sabe» o tom — ou desafina a seu modo, sem culpa de oficina | Testemunha: a natureza **canta**; o violão **aprende** |
| **Os dois no lab** | No [conto](${conto}) da Vida: violão + passarinhos ([Three Little Birds](${birds})) | O instrumento pede ajuste; o bicho pede escuta | Afinar = **encontrar o entre** — não copiar o pássaro nem idolatrar o [afinador](${afinador}) |

**H1:** *afinar o violão* é o uso-mãe do ofício musical BR — objecto + mão + ouvido.  
**H2:** o **passarinho assobiando** é o diapasão vivo: o lab não o «conserta»; **ouve**.  
**H3:** *asoviar* no pedido = **assobiar** (variante oral). A cola é de ouvido, como o próprio afinar.

**Veredicto do par:** o violão **precisa** de afinar; o passarinho **já assobia**. O ofício é aproximar um do outro sem pretender que a madeira vire bico.

## 3. Camadas de *afinar*

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Música** | Pôr o violão (viola, voz) no tom | Alta |
| **Objecto / matéria** | Tornar fino: fio, lápis, cintura, metal (ourives) | Alta |
| **Ofício** | Dar o último ponto — aprimorar sem refazer o mundo | Alta |
| **Máquina** | Regular motor / aceleração | Média–alta (uso vivo) |
| **Acordo** | *Afinar com* alguém — estar no mesmo diapasão | Média–alta |
| **Armadilha** | Perfeccionismo («nunca está afinado») ou *afinar* = recuar de medo | Média |
| **Lab** | Ajustar a ficha, a luz, o [gesto](${gesto}) — [Valeu !!!](${mantra}) neste tom, hoje | Alta |

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** |
|--------|------------------|-------------|
| **Afinar o violão** | Ritual de músico | [Gesto](${gesto}) concreto: cravelha + ouvido + [verdade](${verdade}) da corda |
| **Passarinho** | Trilha sonora fofa | [Sinal](${sinal}) de tom vivo — elo [Three Little Birds](${birds}) / [alegria](${alegria}) |
| **Afinado** | Perfeito | **No tom desta mão** — não o tom dos outros |
| **Desafinado** | Fracasso | Informação: ainda falta um quarto de volta — ou o pássaro está noutro ramo |
| **Afinar a página** | Polir até sumir o rasto | Ajustar o que desafina **sem** apagar o ofício |

**H-parece:** afinar = chegar à perfeição.  
**H-é:** afinar = **encontrar o tom justo** — como o violão encontra o assobio, não como o [afinador](${afinador}) substitui o ouvido.

## 5. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Violão** | «Afina o violão antes» | Bom: objecto + gesto · mau: adiar o tocar para sempre |
| **Assobio** | «O passarinho tá assobiando afinado» | Bom: ouvir o diapasão vivo · mau: querer «consertar» o bicho |
| **Ofício** | «Vou afinar esta ficha» | Bom: último ponto · mau: nunca publicar |
| **Voz** | «Afina aí, galera» | Bom: acordo de tom · mau: humilhar quem desafina |
| **Medo (reg.)** | «Na hora H, afinou» | Outro mapa — recuo; **≠** cravelha |
| **Grafia** | *asoviar* / *assoviar* | Bom: ler como **assobiar** · mau: fingir lexema novo |

## 6. Rede · Valeu !!!

| Recurso | Papel |
|---------|-------|
| **[Violão](${violao})** | [Corda](${corda}) que pede [gesto](${gesto}) — catálogo [Objetos](${objetosCat}) · [*Upside Down*](${upside}) |
| **[Afinador](${afinador})** | Objecto-leitor (clip / diapasão / app) — lê; a tarraxa escreve |
| [Tónos](${tonos}) | A **tensão** grega que faz a corda soar |
| [Teoria das cordas](${teoriaCordas}) | A física **emprestou** a corda afinada; afinar o violão **não** prova supercorda |
| [Orfeu](${orfeu}) | A lira — o mito do instrumento |
| **Passarinho assobiando** | Diapasão vivo — [Three Little Birds](${birds}) · [conto](${conto}) · [Vida](${vida}) |
| [Skill](${skill}) · [caminho](${caminho}) | Habilidade de ouvir e apertar **um** quarto de volta |
| [Luz](${luz}) · [sinal](${sinal}) · [pattern](${pattern}) | Tom visível / repetível |
| [Risco](${risco}) | Corda demais = parte; perfeccionismo = nunca toca |
| [Inspiração](${inspiracao}) · [alegria](${alegria}) | O assobio que chega sem pedido |
| [Língua portuguesa](${lingua}) · [Guia](${guia}) · [hub](${hubAll}) | Solo |
| [Valeu !!!](${mantra}) · [poema](${poemMantra}) · [Diário](${diario}) | Fecho no tom de hoje |

**Veredicto:** Valeu !!! — **afinar o violão até o passarinho fazer sentido no quarto**, não até o mundo inteiro ficar no lá.

## Hipóteses (síntese)

**H1:** *afinar* = *a-* + *fino* + *-ar* ← *fīnis* (alta).  
**H2:** âncora material = **violão** (objecto).  
**H3:** âncora viva = **passarinho assobiando** (diapasão sem cravelha).  
**H4:** *asoviar* = assobiar.  
**H5:** fecho = [Valeu !!!](${mantra}) neste tom.

## Limites

- Não é método de afinação (não ensina cravelha por cravelha).  
- Não inventaria espécies de passarinho.  
- *Afinar* «acobardar-se» fica nomeado e **fora** do eixo violão/assobio.  
- Passarinho **não** tem ficha própria ainda — habita esta. O **[violão](${violao})** e o **[afinador](${afinador})** têm ficha de objecto.

## Status

**Aprovado** — **afinar** fichado: étimo *fino*; objecto **[violão](${violao})**; leitor **[afinador](${afinador})**; testemunha **passarinho assobiando**; elo [Three Little Birds](${birds}); fecho [Valeu !!!](${mantra}).

[▶ Palavras](${hub}) · [▶ Violão](${violao}) · [▶ Afinador](${afinador}) · [▶ Objectos](${objetos}) · [▶ Three Little Birds](${birds}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

Inspection of Portuguese **afinar** — *a-* + *fino* + *-ar* ← Lat. *fīnis*. Field request: two witnesses of pitch — the **guitar** (object: tuning peg + ear) and the **little bird whistling** (already in tune, no peg). Close: [Valeu !!!](${mantra}).

> Independent audit. [Wiktionary · afinar](${WIKT}). Oral *asoviar* = **assobiar** (to whistle). Not a harmony class or a bird guide.

## Object

| Field | Value |
|-------|-------|
| Word | **afinar** — to tune / refine / thin |
| Object | **[violão](${violao})** (Brazilian guitar) |
| Living tuner | **passarinho assobiando** |
| Lab | [Three Little Birds](${birds}) · [Vida](${vida}) |
| Date | ${inspected} |

## Guitar × whistling bird

The guitar **needs** a gesture ([gesto](${gesto})): turn until the string meets the ear. The bird **already whistles**. The craft is to bring the wood toward the beak — not to “fix” the bird, not to worship the clip-on tuner.

## Seems vs is

**Seems:** perfection.  
**Is:** the right pitch **in this hand, today** — [Valeu !!!](${mantra}), not someone else’s A.

## Status

**Approved** — *fino* etymon; guitar object; whistling bird; [Three Little Birds](${birds}); [Valeu !!!](${mantra}).

[▶ Words](${hub}) · [▶ Violão](${violao}) · [▶ Objects](${objetos}) · [▶ Birds](${birds}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **afinar** — *a-* + *fino* + *-ar* ← lat. *fīnis*. Pedido de campo: dos testigos del tono — el **violão** (objeto: clavija + oído) y el **pajarito silbando** (ya en tono, sin clavija). Cierre: [¡Valeu !!!](${mantra}).

> Auditoría independiente. [Wikcionario · afinar](${WIKT}). Oral *asoviar* = **assobiar** (silbar). No es clase de armonía ni guía de aves.

## Objeto

| Campo | Valor |
|-------|-------|
| Palabra | **afinar** — templar / refinar / adelgazar |
| Objeto | **[violão](${violao})** |
| Afinador vivo | **passarinho assobiando** |
| Lab | [Three Little Birds](${birds}) · [Vida](${vida}) |
| Fecha | ${inspected} |

## Guitarra × pajarito

La guitarra **pide** gesto ([gesto](${gesto})): girar hasta que la cuerda encuentre el oído. El pájaro **ya silba**. El oficio es acercar la madera al pico — no «arreglar» al bicho ni idolatrar el afinador.

## Parece × es

**Parece:** perfección.  
**Es:** el tono justo **en esta mano, hoy** — [¡Valeu !!!](${mantra}).

## Estado

**Aprobada** — étimo *fino*; objeto violão; pajarito silbando; [Three Little Birds](${birds}); [¡Valeu !!!](${mantra}).

[▶ Palabras](${hub}) · [▶ Violão](${violao}) · [▶ Objetos](${objetos}) · [▶ Pájaros](${birds}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki: WIKT };
}

function buildAfinarPost() {
  const { body, contentEn, contentEs, wiki } = buildAfinarBodies();
  const seriesOrder = pickOrder('inspecao-palavra-afinar', 198);

  return makePalavra({
    title: 'Inspeção: Afinar — violão, passarinho assobiando e o tom justo',
    titleEn: 'Inspection: Afinar — guitar, whistling bird and the right pitch',
    titleEs: 'Inspección: Afinar — guitarra, pajarito silbando y el tono justo',
    excerpt:
      'Palavras: «afinar» (a- + fino ← lat. fīnis) — objecto violão; passarinho assobiando como diapasão vivo; desafinar; asoviar = assobiar; Valeu !!!',
    excerptEn:
      'Words: “afinar” (a- + fino ← Lat. fīnis) — guitar object; whistling bird as living tuner; desafinar; asoviar = to whistle; Valeu !!!',
    excerptEs:
      'Palabras: «afinar» (a- + fino ← lat. fīnis) — objeto violão; pajarito silbando como diapasón vivo; desafinar; asoviar = silbar; ¡Valeu !!!',
    slug: 'inspecao-palavra-afinar',
    date: '2026-08-22T05:40:00.000Z',
    seriesOrder,
    seriesLabel: 'Afinar · palavra',
    coverImage: COVER,
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildAfinarPost,
  buildAfinarBodies
};
