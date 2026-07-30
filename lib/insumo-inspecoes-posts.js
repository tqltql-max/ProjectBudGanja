'use strict';

/**
 * Inspeções de insumos do nicho cultivo (fertilizantes, substratos, aditivos).
 * Série partilhada: insumos-cultivo — tipagem no hub via resolveInspecaoTipo().
 */

function insumoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || '/imagens/inspecoes/loja-default-cover.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'insumos-cultivo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Insumos de cultivo',
    content_raw: opts.body
  };
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  return post;
}

function buildBioBizzInspectionPost() {
  return insumoPost({
    title: 'Inspeção: Fertilizantes BioBizz',
    excerpt:
      'Auditoria da linha orgânica BioBizz (Holanda) — Bio·Grow, Bio·Bloom, stimulators e cruzamento com EC, solo vivo e o guia de nutrição do laboratório.',
    excerptEn:
      'Catalog audit of BioBizz organic fertilizers — Bio·Grow, Bio·Bloom and stimulators, cross-checked with BudGanja EC tools and nutrition inspections.',
    excerptEs:
      'Auditoría de fertilizantes orgánicos BioBizz — Bio·Grow, Bio·Bloom y estimuladores, contrastada con las herramientas EC y nutrición BudGanja.',
    slug: 'inspecao-insumo-biobizz',
    date: '2026-07-20T20:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'BioBizz',
    coverImage: '/imagens/inspecoes/insumo-biobizz-cover.jpg',
    body: `## Escopo

Inspeção documental da **linha de fertilizantes e stimulators orgânicos BioBizz** (Biobizz Worldwide Organics, Holanda, desde 1992) — bases de vegetativo/floração, aditivos e lógica de dosagem, com foco no uso em cultivo indoor/outdoor e na disponibilidade típica no Brasil via revendedores.

> **Nota metodológica:** auditoria editorial independente do Inspetor BudGanja com base em fichas públicas, tabelas de aplicação e catálogos de revendedores BR (ex.: grow shops) em **2026-07-20**. **Sem afiliação comercial** com a BioBizz; NPK, dosagens e stock podem variar por lote/região — confirmar sempre no rótulo e em [biobizz.com](https://www.biobizz.com/).

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Marca | BioBizz (Biobizz Worldwide Organics) |
| Origem | Holanda (1992) |
| Site oficial | [biobizz.com](https://www.biobizz.com/) |
| Perfil | Fertilizantes e stimulators **100% orgânicos** (líquidos + substratos na linha global) |
| Disponibilidade BR | Via revendedores / grow shops (não é loja própria BudGanja) |
| Embalagens típicas | 250 ml · 500 ml · 1 L · 5 L (+ kits Try-Pack / Grow+Bloom) |
| Data da inspeção | 2026-07-20 |

## Hipóteses e método

- **H1:** A dupla **Bio·Grow + Bio·Bloom** cobre o ciclo completo em solo/coco para cultivadores que preferem orgânico líquido sem programa mineral multi-parte complexo.
- **H2:** Em orgânico, **EC/PPM não substitui** observação de planta e tabela do fabricante — mas a [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) ainda ajuda a registar a água de saída e a detectar acumulação.
- **H3:** Stimulators (Top·Max, Bio·Heaven, Alg·A·Mic, Root·Juice, etc.) só fazem sentido depois das bases estarem estáveis.
- **Método:** (1) inventário da linha mais citada em BR; (2) papel de cada produto no ciclo; (3) faixas de dosagem públicas; (4) cruzamento com [Inspeção: Nutrição](/calculadoras/cultivo-lab.html?mode=ec), [Solo Vivo](/calculadoras/super-solo.html) e [Super-Solo](/calculadoras/super-solo.html).

## Mapa da linha (catálogo típico)

### Bases

| Produto | Fase / papel | Notas de inspeção |
|---------|--------------|-------------------|
| **Bio·Grow** | Vegetativo (e manutenção) | Base líquida orgânica; frequentemente associada a melaço/vinhaça de beterraba — favorece atividade microbiana no substrato |
| **Bio·Bloom** | Floração → colheita | Base de floração; NPK típico comunicado ~**2-7-4** / faixa próxima **1-2-2** conforme ficha/região — **ler o rótulo do lote** |
| **Fish·Mix** | Veg. / solo vivo | Estimula flora bacteriana; uso comum em solo e como “wake-up” do meio |

### Stimulators / aditivos (linha global — stock BR varia)

| Produto | Papel |
|---------|-------|
| **Top·Max** | Booster de floração / qualidade floral |
| **Bio·Heaven** | Aminoácidos / energia e absorção |
| **Alg·A·Mic** | Extrato de algas — stress / vigor foliar |
| **Root·Juice** | Enraizamento / estabelecimento |
| **CalMag** (quando disponível) | Suporte Ca/Mg em água mole ou coco |
| **Acti·Vera** / outros | Linha estendida — confirmar importação local |

### Substratos (linha global)

Light·Mix, All·Mix, Coco·Mix, Worm·Humus, etc. — **nem todos** têm distribuição estável no Brasil; muitos cultivadores BR usam só os líquidos sobre solo local ou super-solo.

## Dosagem e método de uso (síntese)

| Tema | Prática observada nas fichas |
|------|------------------------------|
| Início típico | Quando a planta tem ~10–15 cm / primeiras folhas verdadeiras estáveis |
| Bio·Grow | Ordem de grandeza **1–4 ml/L** (tabela do frasco) |
| Bio·Bloom | Ordem de grandeza **2–4 ml/L** na floração (tabela do frasco) |
| Frequência | Em geral a cada rega ou conforme tabela semanal do fabricante |
| pH | Orgânico tolera faixa mais larga que mineral; ainda assim monitorizar se usar água tratada / coco |
| Validade (revendedores) | Alguns BR citam ~**3 anos** a partir da fabricação — verificar lote |

> **Não misturar às cegas** com programa mineral completo (ex.: GHE/Advanced) na mesma rega sem protocolo — risco de antagonismo e overfert.

## Achados

1. **Ecossistema simples** — duas bases + 1–2 stimulators cobrem a maioria dos ciclos solo para iniciantes em orgânico.
2. **Dependência do solo vivo** — BioBizz rende melhor com biologia ativa; ver [Inspeção: Solo Vivo](/calculadoras/super-solo.html) e [Calculadora Super-Solo](/calculadoras/super-solo.html).
3. **EC como diário, não como receita** — anotar EC da solução e do runoff no [diário](/cultivo/) ajuda a detectar salinidade mesmo em orgânico.
4. **Kits BR** — GrowFert e similares vendem kits Grow+Bloom e Try-Pack; preços e volumes mudam — esta inspeção **não** é cotação.
5. **Complementaridade com mineral** — cultivadores avançados por vezes fazem transição; documentar no diário a data de mudança de programa.

## Complementaridade com o Inspetor BudGanja

| Necessidade | Ferramenta / inspeção |
|-------------|----------------------|
| Entender NPK / overfert / flush | [Inspeção: Nutrição](/calculadoras/cultivo-lab.html?mode=ec) · [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) |
| Solo orgânico / biologia | [Inspeção: Solo Vivo](/calculadoras/super-solo.html) · [Super-Solo](/calculadoras/super-solo.html) |
| Ambiente (interage com nutrição) | [VPD](/calculadoras/cultivo-lab.html?mode=vpd) · [Cultivo Indoor](/calculadoras/luximetro.html) |
| Registo de doses por semana | [Diário de Cultivo](/cultivo/) |
| Arranque do ciclo | [Diário de Cultivo](/cultivo/) |

## Como repetir o método

1. Abrir fichas oficiais (Bio·Grow / Bio·Bloom) e anotar NPK + ml/L.
2. Listar o que o revendedor BR tem em stock (bases vs stimulators).
3. Cruzar com a fase do ciclo no diário (veg. / flip / floração).
4. Registar EC e resposta da planta durante 2–3 semanas antes de subir dose.
5. Atualizar a inspeção se a linha ou a distribuição BR mudar.

## Créditos e transparência

- **Marca, fichas e tabelas** © BioBizz / Biobizz Worldwide Organics — [biobizz.com](https://www.biobizz.com/).
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente).
- **Finalidade:** mapear a linha e a complementaridade com o método do laboratório — **não** constitui endosso comercial.

## Status

**Aprovado como referência de insumos orgânicos** — linha coerente para solo/coco com curva de aprendizagem baixa (Grow + Bloom). Recomendado validar sempre a tabela do frasco e cruzar com EC + observação no diário; stimulators só após bases estáveis.

[▶ Site BioBizz](https://www.biobizz.com/) · [Inspeção: Nutrição](/calculadoras/cultivo-lab.html?mode=ec) · [Todas as inspeções](/biblioteca/inspecoes/)`
  });
}

const INSUMO_INSPECOES_POSTS = [buildBioBizzInspectionPost()];

module.exports = {
  INSUMO_INSPECOES_POSTS,
  buildBioBizzInspectionPost
};
