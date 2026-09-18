'use strict';

/**
 * Inspeção Palavras · Xiaomi
 * Eixos: grafia certa Xiaomi · rasto oral BR (xioomi) · chinês 小米 (milheto)
 * Ficha de palavra, não review de telemóvel nem biografia de Lei Jun.
 * Tipografia: *xioomi* → **Xiaomi**.
 */

const fs = require('fs');
const path = require('path');
const { palavraPost: makePalavra } = require('./palavras-inspecoes-posts.js');

function buildXioomiBodies() {
  const inspected = '2026-08-21';
  const hub = '/biblioteca/inspecoes/#inspecoes-palavras';
  const guia = '/guia/palavras.html';
  const vida = '/vida/';
  const diario = '/vida/diario/';
  const objetos = '/objetos/';
  const self = '/posts/post-inspecao-palavra-xiaomi.html';
  const jobs = '/posts/post-inspecao-palavra-jobs.html';
  const figura = '/posts/post-inspecao-figura-steve-jobs.html';
  const skill = '/posts/post-inspecao-palavra-skill.html';
  const idolo = '/posts/post-inspecao-palavra-idolo.html';
  const criatividade = '/posts/post-inspecao-palavra-criatividade.html';
  const genial = '/posts/post-inspecao-palavra-genial.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const grok = '/posts/post-inspecao-palavra-grok.html';
  const pattern = '/posts/post-inspecao-palavra-pattern.html';
  const lingua = '/posts/post-inspecao-palavra-lingua-portuguesa.html';
  const objetosPalavra = '/posts/post-inspecao-palavra-objetos.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const sozna = '/posts/post-inspecao-palavra-sozna.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const poemMantra = '/vida/#poema=faca-o-melhor';
  const wiktXiaomi = 'https://en.wiktionary.org/wiki/Xiaomi';
  const wiktMillet = 'https://en.wiktionary.org/wiki/%E5%B0%8F%E7%B1%B3';
  const wikiEn = 'https://en.wikipedia.org/wiki/Xiaomi';
  const wikiPt = 'https://pt.wikipedia.org/wiki/Xiaomi';
  const wikiLei = 'https://en.wikipedia.org/wiki/Lei_Jun';

  const body = `## Escopo

Inspeção editorial da palavra **[Xiaomi](${self})** — grafia **certa** da marca (pinyin). O pedido de campo chegou *xioomi*; a correção é a mesma do [Grok](${grok}): *xioomi* → **Xiaomi**. Esta ficha cobre o **objeto lexical**, o **étimo chinês** 小米 *xiǎomǐ* («milheto / arroz miúdo»), o **choque de camadas** (grão humilde × telemóvel de gôndola × ídolo tech) e a **correção BudGanja**: [objeto](${objetosPalavra}) com rasto, sem pedestal de marca. Elos: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [celular](${celular}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}), [Xiaomi (PT)](${wikiPt}), [Lei Jun](${wikiLei}), série [Palavras](${hub}). **Ficha ≠ review de SKU, ≠ ranking «melhor custo-benefício», ≠ biografia do fundador.** Sem afiliação comercial. *xioomi* é rasto oral (como [sozna](${sozna})) — inspeciona-se; a âncora é **Xiaomi**.

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **Xiaomi** (grafia certa / pinyin da marca) |
| Rasto oral BR | *xioomi* · *xiômi* · *xiomi* · *xiaome* |
| Chinês | **小米** *xiǎomǐ* — 小 «pequeno» + 米 «milheto / arroz» |
| Camadas | 1) rasto oral BR · 2) marca de electrónica · 3) grão · 4) «Jobs chinês» / iPhone barato |
| Classe | Substantivo próprio (marca) · comum em chinês (milheto) |
| Étimo 小米 | Chinês *xiǎomǐ* «milheto» (também arroz miúdo) — confiança: **alta** |
| Fundação marca | Pequim, 2010 — Lei Jun — confiança: **alta** (imprensa / wiki) |
| Tipo BudGanja | Palavra — oralidade × marca × grão × culto de produto |
| Elo ofício | [skill](${skill}) · [gesto](${gesto}) · [caminho](${caminho}) · [objetos](${objetosPalavra}) |
| Elo culto | [ídolo](${idolo}) · [Jobs](${jobs}) · [genial](${genial}) |
| Elo corpo / ecrã | [celular](${celular}) · [risco](${risco}) · [interruptor](${interruptor}) · [ligar / desligar](${ligar}) |
| Elo língua | [língua portuguesa](${lingua}) · [sozna](${sozna}) · [pattern](${pattern}) · [Grok](${grok}) |
| Fonte | [Xiaomi (EN)](${wikiEn}) · [小米](${wiktMillet}) |
| Data | ${inspected} |

**O que é o objeto:** não é o catálogo Redmi/POCO/Mi nem a vida de Lei Jun. É o **vocábulo certo** — **Xiaomi** — que, no BR, aponta para um telemóvel e, em chinês, aponta para um **grão**. Inspecionar Xiaomi = não deixar a gôndola comer o milheto, nem o milheto romantizar a marca. *xioomi* fica no mapa como rasto.

## 2. Quatro camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **Xiaomi** (marca / âncora) | Grafia certa — empresa de electrónica (telefone, IoT, wearables) | Alta |
| **xioomi** (oral BR) | Como a palavra chega: *xiômi*, *xioomi*, *xiomi*, *xiaome* | Alta (uso vivo) |
| **小米** (grão) | Milheto — cereal miúdo, comida corrente na China | Alta (léxico) |
| **Mito fundador** | Lei Jun comparado a Steve Jobs (gola, palco, «inovação para todos») | Alta–média (mapa cultural, não biografia) |
| **Choque útil** | A marca de telemóvel **é** o nome de um grão humilde | Alta (leitura lab) |

**H1:** no BR, **Xiaomi** entra primeiro como **objecto de mão** (o telemóvel), não como milheto.  
**H2:** o chinês 小米 continua a nomear o **grão** — e o lab recusa apagar essa camada.  
**H3:** [ídolo](${idolo}) avisa quando «é o iPhone do pobre» come o [gesto](${gesto}): citar a marca **sem** inspecionar o [objeto](${objetosPalavra}).

## 3. Oralidade BR — Xiaomi × xioomi

Pinyin *Xiǎomǐ* ≈ «chiáu-mii» (o *x* chinês não é o *x* de *exame*). No português do Brasil o ouvido faz o que pode: **xi-ô-mi**, **xi-au-mi**, **xioomi**. Correção de ofício: *xioomi* → **Xiaomi**.

| Forma | Papel | Leitura lab |
|-------|-------|-------------|
| **Xiaomi** | Âncora desta ficha | Grafia certa; pinyin sem acentos |
| **xioomi** | Rasto oral / teclado | Inspeciona-se; não é a forma a publicar |
| **xiomi / xiaome** | Variantes vizinhas | Mesmo objecto; aliases do glossário |
| **MI / Mi** | Atalho de produto (MIUI, Mi Band) | Camada de marketing — confiança **média** na expansão («Mobile Internet») |
| **小米** | Étimo vivo | Grão; a marca sentou em cima |

**Tese:** *Xiaomi* é a marca certa; *xioomi* é o rasto; *小米* é o grão. Inspeciona-se o trio.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Gôndola** | «O iPhone que o povo pode» | Telemóvel Android de uma empresa — [objeto](${objetosPalavra}), não identidade |
| **Slogan** | Inovação para todos = santidade | Claim de mercado; ver [verdade](${verdade}) |
| **Fundador** | Jobs com gola laranja | Pessoa + empresa + mito editado — elos [Jobs](${jobs}) · [ídolo](${idolo}) |
| **Palavra ZH** | Só um nome estranho | 小米 = **milheto** — o chão agrícola da marca |
| **Criança + ecrã** | «É só um Xiaomi» | O [risco](${risco}) do [celular](${celular}) **não** muda com o logótipo |
| **BudGanja** | Ficha de fã / hate de marca | Mapa lexical: oral × marca × grão × pedestal |

**H-parece:** Xiaomi = atalho de telemóvel barato.  
**H-é:** Xiaomi = **marca** sobre **milheto**; *xioomi* = rasto BR; barato sem rasto é só preço.

**Veredicto contraste:** o que parece = gôndola; o que é = palavra com três portas (oral / marca / grão). Entrar pela porta do ofício.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «É o iPhone do pobre» | Classismo + culto invertido; o [objeto](${objetosPalavra}) não tem classe social | 
| «Lei Jun é o Jobs da China» | Comparação de palco ≠ identidade; ver [Jobs](${jobs}) e [ídolo](${idolo}) |
| «Xiaomi = qualidade / lixo» (binário) | SKU ≠ palavra; esta ficha **não** ranqueia aparelhos |
| «O miúdo já tem um Xiaomi, está seguro» | Marca ≠ [risco](${risco}); cruzar [celular](${celular}) |
| «Escreveu xioomi» | Oralidade BR; *xioomi* → **Xiaomi** (como [sozna](${sozna}) → sozinho) |
| «Faça diferente» (vazio de anúncio) | Fechar com [Faça o melhor!](${mantra}) **neste** [caminho](${caminho}) |

### Ofício correcto (mapa curto)

1. Se disser **Xiaomi**, saber se fala de **palavra**, de **marca** ou de **este** aparelho na mesa.  
2. *xioomi* no teclado → **Xiaomi** na ficha.  
3. Admirar o feito ([genial](${genial})) sem entregar o [gesto](${gesto}) ao logótipo.  
4. Tratar o telemóvel como [objeto](${objetosPalavra}): [ligar / desligar](${ligar}), [interruptor](${interruptor}), [risco](${risco}) no ecrã.  
5. Fechar com [Faça o melhor!](${mantra}).

**Veredicto correção:** **Xiaomi ≠ manual de consumo.** No lab, a palavra vale quando aponta a grafia certa, o grão, ou um objecto **sem** o transformar em relíquia (nem em lixo de classe).

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Atalho de aparelho** | «pega o Xiaomi» | Bom: nomear o objecto · Mau: a marca como identidade |
| **Elogio de preço** | «saiu barato, é Xiaomi» | Bom: se houver rasto de uso · Mau: magia de custo-benefício |
| **Pejorativo de classe** | «é só um Xiaomi» | Mau: desprezo disfarçado de gosto |
| **Ídolo tech** | Keynote, gola, «o Jobs chinês» | Bom: mapear o mito · Mau: religião de produto |
| **Oral / teclado** | *xioomi*, *xiomi*, *xiaome* | Bom: inspecionar o rasto · Mau: corrigir com soberba |

## 7. Anti-culto · Faça o melhor!

| Armadilha | Leitura |
|-----------|---------|
| **Marca = pessoa** | Xiaomi ≠ Lei Jun ≠ o dono do telemóvel |
| **Barato = santo / lixo** | Preço não é ética nem [skill](${skill}) |
| **Cosplay de Jobs** | Gola e palco; some o [caminho](${caminho}) — ver [Jobs](${jobs}) |
| **Ecrã na criança** | Logótipo laranja **não** anula a ficha [celular](${celular}) |
| **Nome de grão = Deus do povo** | Humildade de marketing ≠ milheto no prato |

| Camada mantra | Ligação |
|----------------|---------|
| Expressão | [Faça o melhor!](${mantra}) — o melhor **neste** objecto, hoje |
| Poema | [poema Vida](${poemMantra}) |
| Anti-armadilha | «Ser o dono do Xiaomi certo» = falso ofício |
| Rede | [skill](${skill}) · [ídolo](${idolo}) · [Jobs](${jobs}) · [celular](${celular}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **sem o culto da marca** — **Xiaomi** como nome certo; *xioomi* como rasto; 小米 como grão, não altar.

## Hipóteses (síntese)

**H1:** **Xiaomi** = grafia certa; *xioomi* BR = rasto oral; 小米 ZH = milheto.  
**H2:** parece telemóvel barato; é palavra com camadas — oral × marca × grão × mito.  
**H3:** elos = [Jobs](${jobs}) · [ídolo](${idolo}) · [objetos](${objetosPalavra}) · [celular](${celular}).  
**H4:** fecho [Faça o melhor!](${mantra}); ficha ≠ review.

## Rede BudGanja

| Recurso | Papel |
|---------|-------|
| [Jobs](${jobs}) · [Steve Jobs (pessoa)](${figura}) | Palco, mito, anti-pedestal — eco no «Jobs chinês» |
| [Ídolo](${idolo}) · [Genial](${genial}) · [Criatividade](${criatividade}) | Admirar o feito sem relíquia |
| [Skill](${skill}) · [Gesto](${gesto}) · [Caminho](${caminho}) | Ofício com rasto |
| [Objetos](${objetosPalavra}) · [catálogo](${objetos}) | O telemóvel como coisa, não como eu |
| [Celular (crianças)](${celular}) · [risco](${risco}) | Ecrã ≠ logótipo |
| [Interruptor](${interruptor}) · [ligar / desligar](${ligar}) | Circuito do aparelho |
| [Sozna](${sozna}) · [língua portuguesa](${lingua}) | Oralidade / teclado sem vergonha |
| [Grok](${grok}) · [pattern](${pattern}) | Nomes tech no solo BR |
| [Faça o melhor!](${mantra}) · [Vida](${vida}) · [Diário](${diario}) · [Guia](${guia}) | Fecho sem culto |

## Limites

- Não é review de telemóvel, wearable ou aspirador.  
- Não julga quem compra ou quem escreveu *xioomi* no teclado.  
- Não é biografia de Lei Jun nem história completa da empresa.  
- 小米 como **cereal** fica nomeado para **não colar** o grão ao SKU.

## Status

**Aprovado** — **Xiaomi** fichado (*xioomi* → Xiaomi): marca × 小米 (milheto) × rasto oral BR; anti-pedestal; elos [Jobs](${jobs}) · [ídolo](${idolo}) · [celular](${celular}); fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Jobs](${jobs}) · [▶ Ídolo](${idolo}) · [▶ Objetos](${objetosPalavra}) · [▶ Celular](${celular}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[Xiaomi](${self})** — correct brand spelling (pinyin). Field input *xioomi*; correction like [Grok](${grok}): *xioomi* → **Xiaomi**. Covers the **lexical object**, the Chinese etymon 小米 *xiǎomǐ* (“millet / little rice”), the **layer clash** (humble grain × handset × tech idol), and the BudGanja correction: [object](${objetosPalavra}) with a trail, no brand pedestal. Links: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [phone / children](${celular}), [Do your best!](${mantra}).

> Method note: [Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}). **Not a product review, not a founder biography.** *xioomi* is a trail (like [sozna](${sozna})); the anchor is **Xiaomi**.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **Xiaomi** (correct) · *xioomi* (BR oral trail) · **小米** millet |
| Path | Chin. *xiǎomǐ* “millet” × 2010 Beijing brand × BR pronunciation *xiômi* |
| Links | [Jobs](${jobs}) · [ídolo](${idolo}) · [objects](${objetosPalavra}) · [phone](${celular}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** cheap-phone shortcut / “iPhone of the poor”.  
**Is:** the **correct brand name** on a **grain**; *xioomi* is the BR trail. Price without a trail is only price. The [phone risk](${celular}) does not change with the logo.

## 3. BudGanja correction

**Xiaomi ≠ consumption manual.** If you say Xiaomi, know whether you mean a **word**, a **brand**, or **this** device. *xioomi* → **Xiaomi**. Admire the deed ([genial](${genial})) without handing the [gesture](${gesto}) to the logo. Treat the handset as an [object](${objetosPalavra}). Close with [Do your best!](${mantra}).

## Status

**Approved** — **Xiaomi** (*xioomi* → Xiaomi) × millet 小米; anti-pedestal; links [Jobs](${jobs}) · [ídolo](${idolo}) · [phone](${celular}); [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Jobs](${jobs}) · [▶ Ídolo](${idolo}) · [▶ Objects](${objetosPalavra}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[Xiaomi](${self})** — grafía **correcta** de la marca (pinyin). El pedido de campo llegó *xioomi*; la corrección es la misma de [Grok](${grok}): *xioomi* → **Xiaomi**. Cubre el **objeto léxico**, el étimo chino 小米 *xiǎomǐ* («mijo / arroz menudo»), el **choque de capas** (grano humilde × teléfono × ídolo tech) y la corrección BudGanja: [objeto](${objetosPalavra}) con rastro, sin pedestal de marca. Vínculos: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [celular](${celular}), [¡Haz lo mejor!](${mantra}).

> Nota: [Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}). **No es reseña de producto ni biografía del fundador.** *xioomi* es rastro (como [sozna](${sozna})); el ancla es **Xiaomi**.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **Xiaomi** (correcta) · *xioomi* (rastro oral BR) · **小米** mijo |
| Camino | Chin. *xiǎomǐ* “mijo” × marca Pekín 2010 × pronunciación BR *xiômi* |
| Vínculos | [Jobs](${jobs}) · [ídolo](${idolo}) · [objetos](${objetosPalavra}) · [celular](${celular}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** atajo de teléfono barato / «iPhone del pobre».  
**Es:** el **nombre correcto de la marca** sobre un **grano**; *xioomi* es el rastro BR. El [riesgo del celular](${celular}) no cambia con el logotipo.

## 3. Corrección BudGanja

**Xiaomi ≠ manual de consumo.** Saber si se habla de **palabra**, **marca** o **este** aparato. *xioomi* → **Xiaomi**. Admirar el hecho sin entregar el [gesto](${gesto}) al logo. Tratar el teléfono como [objeto](${objetosPalavra}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — **Xiaomi** (*xioomi* → Xiaomi) × mijo 小米; anti-pedestal; vínculos [Jobs](${jobs}) · [ídolo](${idolo}) · [celular](${celular}); [¡Haz lo mejor!](${mantra}).

[▶ Palabras](${hub}) · [▶ Jobs](${jobs}) · [▶ Ídolo](${idolo}) · [▶ Objetos](${objetosPalavra}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs, wikiEn };
}

function buildXioomiPost(seriesOrder) {
  const { body, contentEn, contentEs, wikiEn } = buildXioomiBodies();
  let order = Number.isFinite(seriesOrder) ? seriesOrder : 150;
  if (!Number.isFinite(seriesOrder)) {
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find(
        (p) =>
          p.slug === 'inspecao-palavra-xiaomi' ||
          p.slug === 'inspecao-palavra-xioomi'
      );
      if (existing && typeof existing.seriesOrder === 'number') {
        order = existing.seriesOrder;
      } else {
        const taken = new Set(
          posts
            .filter((p) => p.series === 'palavras-origem')
            .map((p) => p.seriesOrder)
            .filter((n) => typeof n === 'number')
        );
        const max = taken.size ? Math.max(...taken) : 149;
        order = max + 1;
        while (taken.has(order) && order < 400) order += 1;
      }
    } catch (_) {
      /* keep 150 */
    }
  }

  return makePalavra({
    title:
      'Inspeção: Xiaomi — milheto, marca e ofício sem pedestal',
    titleEn:
      'Inspection: Xiaomi — millet, brand, and craft without a pedestal',
    titleEs:
      'Inspección: Xiaomi — mijo, marca y oficio sin pedestal',
    excerpt:
      'Palavras: «Xiaomi» (*xioomi* → Xiaomi) — 小米 milheto; marca × grão × ídolo tech; elos Jobs, objetos e celular; Faça o melhor!',
    excerptEn:
      'Words: “Xiaomi” (*xioomi* → Xiaomi) — 小米 millet; brand × grain × tech idol; links Jobs, objects and phone; Do your best!',
    excerptEs:
      'Palabras: «Xiaomi» (*xioomi* → Xiaomi) — 小米 mijo; marca × grano × ídolo tech; vínculos Jobs, objetos y celular; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-xiaomi',
    date: '2026-08-21T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Xiaomi · palavra',
    coverImage: '/imagens/inspecoes/xiaomi-palavra-cover.jpg',
    sourceUrl: wikiEn,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildXioomiPost,
  buildXioomiBodies
};
