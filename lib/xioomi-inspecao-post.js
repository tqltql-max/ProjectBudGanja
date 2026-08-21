'use strict';

/**
 * Inspeção Palavras · xioomi / Xiaomi
 * Eixos: forma oral BR (xioomi) · marca Xiaomi · chinês 小米 (milheto)
 * Ficha de palavra, não review de telemóvel nem biografia de Lei Jun.
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
  const self = '/posts/post-inspecao-palavra-xioomi.html';
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

Inspeção editorial da palavra **[xioomi](${self})** — forma **oral / teclado** do português do Brasil para a marca **Xiaomi**. Esta ficha cobre o **objeto lexical** (como a palavra chega no fio), o **étimo chinês** 小米 *xiǎomǐ* («milheto / arroz miúdo»), o **choque de camadas** (grão humilde × telemóvel de gôndola × ídolo tech) e a **correção BudGanja**: [objeto](${objetosPalavra}) com rasto, sem pedestal de marca. Elos: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [celular](${celular}), [Faça o melhor!](${mantra}).

> **Nota metodológica:** auditoria independente. Fontes: [Wiktionary · Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}), [Xiaomi (PT)](${wikiPt}), [Lei Jun](${wikiLei}), série [Palavras](${hub}). **Ficha ≠ review de SKU, ≠ ranking «melhor custo-benefício», ≠ biografia do fundador.** Sem afiliação comercial. *xioomi* não é erro a envergonhar — é o rasto (como [sozna](${sozna})).

## 1. Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Forma âncora | **xioomi** (oral / teclado BR) |
| Forma canónica | **Xiaomi** (pinyin da marca) |
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

**O que é o objeto:** não é o catálogo Redmi/POCO/Mi nem a vida de Lei Jun. É o **vocábulo** que, no BR, aponta para um telemóvel — e, em chinês, aponta para um **grão**. Inspecionar xioomi = não deixar a gôndola comer o milheto, nem o milheto romantizar a marca.

## 2. Quatro camadas (não misturar)

| Camada | Leitura | Confiança |
|--------|---------|-----------|
| **xioomi** (oral BR) | Como a palavra chega: *xiômi*, *xioomi*, *xiomi*, *xiaome* | Alta (uso vivo) |
| **Xiaomi** (marca) | Empresa de electrónica (telefone, IoT, wearables) | Alta |
| **小米** (grão) | Milheto — cereal miúdo, comida corrente na China | Alta (léxico) |
| **Mito fundador** | Lei Jun comparado a Steve Jobs (gola, palco, «inovação para todos») | Alta–média (mapa cultural, não biografia) |
| **Choque útil** | A marca de telemóvel **é** o nome de um grão humilde | Alta (leitura lab) |

**H1:** no BR, **xioomi** entra primeiro como **objecto de mão** (o telemóvel), não como milheto.  
**H2:** o chinês 小米 continua a nomear o **grão** — e o lab recusa apagar essa camada.  
**H3:** [ídolo](${idolo}) avisa quando «é o iPhone do pobre» come o [gesto](${gesto}): citar a marca **sem** inspecionar o [objeto](${objetosPalavra}).

## 3. Oralidade BR — xioomi × Xiaomi

Pinyin *Xiǎomǐ* ≈ «chiáu-mii» (o *x* chinês não é o *x* de *exame*). No português do Brasil o ouvido faz o que pode: **xi-ô-mi**, **xi-au-mi**, **xioomi**.

| Forma | Papel | Leitura lab |
|-------|-------|-------------|
| **xioomi** | Âncora desta ficha | Rasto oral / teclado — inspeciona-se, não se ri |
| **Xiaomi** | Grafia da marca | Canónica em latim; pinyin sem acentos |
| **xiomi / xiaome** | Variantes vizinhas | Mesmo objecto; aliases do glossário |
| **MI / Mi** | Atalho de produto (MIUI, Mi Band) | Camada de marketing — confiança **média** na expansão («Mobile Internet») |
| **小米** | Étimo vivo | Grão; a marca sentou em cima |

**Tese:** *xioomi* é o rasto; *Xiaomi* é a marca; *小米* é o grão. Inspeciona-se o trio.

## 4. O que parece × o que é

| Camada | O que **parece** | O que **é** (leitura lab) |
|--------|------------------|---------------------------|
| **Gôndola** | «O iPhone que o povo pode» | Telemóvel Android de uma empresa — [objeto](${objetosPalavra}), não identidade |
| **Slogan** | Inovação para todos = santidade | Claim de mercado; ver [verdade](${verdade}) |
| **Fundador** | Jobs com gola laranja | Pessoa + empresa + mito editado — elos [Jobs](${jobs}) · [ídolo](${idolo}) |
| **Palavra ZH** | Só um nome estranho | 小米 = **milheto** — o chão agrícola da marca |
| **Criança + ecrã** | «É só um Xiaomi» | O [risco](${risco}) do [celular](${celular}) **não** muda com o logótipo |
| **BudGanja** | Ficha de fã / hate de marca | Mapa lexical: oral × marca × grão × pedestal |

**H-parece:** xioomi = atalho de telemóvel barato.  
**H-é:** xioomi = **rasto BR** sobre **Xiaomi** sobre **milheto**; barato sem rasto é só preço.

**Veredicto contraste:** o que parece = gôndola; o que é = palavra com três portas (oral / marca / grão). Entrar pela porta do ofício.

## 5. Correção BudGanja

| Afirmação comum | Correção lab |
|-----------------|--------------|
| «É o iPhone do pobre» | Classismo + culto invertido; o [objeto](${objetosPalavra}) não tem classe social | 
| «Lei Jun é o Jobs da China» | Comparação de palco ≠ identidade; ver [Jobs](${jobs}) e [ídolo](${idolo}) |
| «Xiaomi = qualidade / lixo» (binário) | SKU ≠ palavra; esta ficha **não** ranqueia aparelhos |
| «O miúdo já tem um xioomi, está seguro» | Marca ≠ [risco](${risco}); cruzar [celular](${celular}) |
| «Escreveu xioomi, errou» | Oralidade BR; como [sozna](${sozna}) — rasto, não vergonha |
| «Faça diferente» (vazio de anúncio) | Fechar com [Faça o melhor!](${mantra}) **neste** [caminho](${caminho}) |

### Ofício correcto (mapa curto)

1. Se disser **xioomi**, saber se fala de **palavra**, de **marca** ou de **este** aparelho na mesa.  
2. Admirar o feito ([genial](${genial})) sem entregar o [gesto](${gesto}) ao logótipo.  
3. Tratar o telemóvel como [objeto](${objetosPalavra}): [ligar / desligar](${ligar}), [interruptor](${interruptor}), [risco](${risco}) no ecrã.  
4. Fechar com [Faça o melhor!](${mantra}).

**Veredicto correção:** **xioomi ≠ manual de consumo.** No lab, a palavra vale quando aponta o rasto oral, o grão, ou um objecto **sem** o transformar em relíquia (nem em lixo de classe).

## 6. Usos no português do Brasil

| Uso | Exemplo | Bom × mau no lab |
|-----|---------|------------------|
| **Atalho de aparelho** | «pega o xioomi» | Bom: nomear o objecto · Mau: a marca como identidade |
| **Elogio de preço** | «saiu barato, é xioomi» | Bom: se houver rasto de uso · Mau: magia de custo-benefício |
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
| Anti-armadilha | «Ser o dono do xioomi certo» = falso ofício |
| Rede | [skill](${skill}) · [ídolo](${idolo}) · [Jobs](${jobs}) · [celular](${celular}) · [gesto](${gesto}) |

**Veredicto:** Faça o melhor **sem o culto da marca** — *xioomi* como rasto; Xiaomi como nome inspecionado; 小米 como grão, não altar.

## Hipóteses (síntese)

**H1:** *xioomi* BR = rasto oral de **Xiaomi**; 小米 ZH = milheto.  
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
- Não julga quem compra ou quem escreve *xioomi*.  
- Não é biografia de Lei Jun nem história completa da empresa.  
- 小米 como **cereal** fica nomeado para **não colar** o grão ao SKU.

## Status

**Aprovado** — **xioomi** fichado: oral BR × marca **Xiaomi** × 小米 (milheto); anti-pedestal; elos [Jobs](${jobs}) · [ídolo](${idolo}) · [celular](${celular}); fecho [Faça o melhor!](${mantra}).

[▶ Palavras](${hub}) · [▶ Jobs](${jobs}) · [▶ Ídolo](${idolo}) · [▶ Objetos](${objetosPalavra}) · [▶ Celular](${celular}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of **[xioomi](${self})** — Brazilian Portuguese **oral / keyboard** form of the brand **Xiaomi**. Covers the **lexical object**, the Chinese etymon 小米 *xiǎomǐ* (“millet / little rice”), the **layer clash** (humble grain × handset × tech idol), and the BudGanja correction: [object](${objetosPalavra}) with a trail, no brand pedestal. Links: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [phone / children](${celular}), [Do your best!](${mantra}).

> Method note: [Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}). **Not a product review, not a founder biography.** *xioomi* is a trail (like [sozna](${sozna})), not a shameful typo.

## 1. Object

| Field | Value |
|-------|-------|
| Anchor | **xioomi** (BR oral) · **Xiaomi** (brand) · **小米** millet |
| Path | Chin. *xiǎomǐ* “millet” × 2010 Beijing brand × BR pronunciation *xiômi* |
| Links | [Jobs](${jobs}) · [ídolo](${idolo}) · [objects](${objetosPalavra}) · [phone](${celular}) · [Do your best!](${mantra}) |
| Date | ${inspected} |

## 2. Seems vs is

**Seems:** cheap-phone shortcut / “iPhone of the poor”.  
**Is:** a **BR trail** on a **brand** on a **grain**. Price without a trail is only price. The [phone risk](${celular}) does not change with the logo.

## 3. BudGanja correction

**xioomi ≠ consumption manual.** If you say xioomi, know whether you mean a **word**, a **brand**, or **this** device. Admire the deed ([genial](${genial})) without handing the [gesture](${gesto}) to the logo. Treat the handset as an [object](${objetosPalavra}). Close with [Do your best!](${mantra}).

## Status

**Approved** — BR oral *xioomi* × brand Xiaomi × millet 小米; anti-pedestal; links [Jobs](${jobs}) · [ídolo](${idolo}) · [phone](${celular}); [Do your best!](${mantra}).

[▶ Words](${hub}) · [▶ Jobs](${jobs}) · [▶ Ídolo](${idolo}) · [▶ Objects](${objetosPalavra}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección de **[xioomi](${self})** — forma **oral / teclado** del portugués de Brasil para la marca **Xiaomi**. Cubre el **objeto léxico**, el étimo chino 小米 *xiǎomǐ* («mijo / arroz menudo»), el **choque de capas** (grano humilde × teléfono × ídolo tech) y la corrección BudGanja: [objeto](${objetosPalavra}) con rastro, sin pedestal de marca. Vínculos: [Jobs](${jobs}), [ídolo](${idolo}), [skill](${skill}), [celular](${celular}), [¡Haz lo mejor!](${mantra}).

> Nota: [Xiaomi](${wiktXiaomi}), [小米](${wiktMillet}), [Xiaomi (EN)](${wikiEn}). **No es reseña de producto ni biografía del fundador.** *xioomi* es rastro (como [sozna](${sozna})), no un error para avergonzar.

## 1. Objeto

| Campo | Valor |
|-------|-------|
| Ancla | **xioomi** (oral BR) · **Xiaomi** (marca) · **小米** mijo |
| Camino | Chin. *xiǎomǐ* “mijo” × marca Pekín 2010 × pronunciación BR *xiômi* |
| Vínculos | [Jobs](${jobs}) · [ídolo](${idolo}) · [objetos](${objetosPalavra}) · [celular](${celular}) · [¡Haz lo mejor!](${mantra}) |
| Fecha | ${inspected} |

## 2. Parece × es

**Parece:** atajo de teléfono barato / «iPhone del pobre».  
**Es:** un **rastro BR** sobre una **marca** sobre un **grano**. El [riesgo del celular](${celular}) no cambia con el logotipo.

## 3. Corrección BudGanja

**xioomi ≠ manual de consumo.** Saber si se habla de **palabra**, **marca** o **este** aparato. Admirar el hecho sin entregar el [gesto](${gesto}) al logo. Tratar el teléfono como [objeto](${objetosPalavra}). Cerrar con [¡Haz lo mejor!](${mantra}).

## Estado

**Aprobada** — oral BR *xioomi* × marca Xiaomi × mijo 小米; anti-pedestal; vínculos [Jobs](${jobs}) · [ídolo](${idolo}) · [celular](${celular}); [¡Haz lo mejor!](${mantra}).

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
      const existing = posts.find((p) => p.slug === 'inspecao-palavra-xioomi');
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
      'Inspeção: xioomi — Xiaomi, milheto e a marca sem pedestal',
    titleEn:
      'Inspection: xioomi — Xiaomi, millet, and the brand without a pedestal',
    titleEs:
      'Inspección: xioomi — Xiaomi, mijo y la marca sin pedestal',
    excerpt:
      'Palavras: «xioomi» — rasto oral BR de Xiaomi (小米, milheto); marca × grão × ídolo tech; elos Jobs, objetos e celular; Faça o melhor!',
    excerptEn:
      'Words: “xioomi” — BR oral trail of Xiaomi (小米, millet); brand × grain × tech idol; links Jobs, objects and phone; Do your best!',
    excerptEs:
      'Palabras: «xioomi» — rastro oral BR de Xiaomi (小米, mijo); marca × grano × ídolo tech; vínculos Jobs, objetos y celular; ¡Haz lo mejor!',
    slug: 'inspecao-palavra-xioomi',
    date: '2026-08-21T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'xioomi · palavra',
    coverImage: '/imagens/inspecoes/xioomi-palavra-cover.jpg',
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
