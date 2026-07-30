'use strict';

/**
 * Inspeções de lojas do nicho cultivo (bancos de sementes, grow shops, head shops).
 * Série partilhada: loja-cultivo — tipagem no hub via resolveInspecaoTipo().
 */

function lojaPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    // Preferir JPG 1200×630 em /imagens/inspecoes/ (OG / WhatsApp).
    coverImage: opts.coverImage || '/imagens/inspecoes/loja-default-cover.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'loja-cultivo',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Loja de cultivo',
    content_raw: opts.body
  };
  if (opts.videoId) post.videoId = opts.videoId;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  return post;
}

function buildFloraUrbanaInspectionPost() {
  return lojaPost({
    title: 'Inspeção: Loja Flora Urbana 420',
    excerpt:
      'Auditoria da vitrine floraurbana420.com.br — sementes de coleção, bancos representados, logística BR, PIX e cruzamento com o guia de cultivo.',
    excerptEn:
      'Catalog audit of Flora Urbana 420 (Brazil) — collection seeds, seed banks, shipping and checkout, cross-checked with BudGanja cultivation tools.',
    excerptEs:
      'Auditoría del catálogo Flora Urbana 420 (Brasil) — semillas de colección, bancos, envío y checkout, contrastada con las herramientas BudGanja.',
    slug: 'inspecao-loja-floraurbana',
    date: '2026-07-20T18:00:00.000Z',
    seriesOrder: 1,
    seriesLabel: 'Flora Urbana 420',
    coverImage: '/imagens/inspecoes/loja-floraurbana-cover.jpg',
    body: `## Escopo

Inspeção documental da **loja virtual Flora Urbana 420** — vitrine brasileira de **sementes de coleção**, lifestyle e head shop associados, com foco em catálogo de bancos, filtros de compra, logística nacional e transparência de atendimento.

> **Nota metodológica:** auditoria editorial independente do Inspetor BudGanja com base nas páginas públicas do site em **2026-07-20**. **Sem afiliação comercial** com a Flora Urbana; preços, stock e condições podem mudar — confirmar sempre em [floraurbana420.com.br](https://floraurbana420.com.br/). Códigos de desconto de canais externos **não** são códigos do Inspetor BudGanja.

> **Enquadramento legal / editorial:** a loja declara vender sementes para **coleção, pesquisa ou preservação genética**. Esta inspeção é **educacional** e descreve a vitrine pública; não incentiva ilícitos. Cabe ao leitor conhecer a legislação local.

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Loja | Flora Urbana 420 |
| Site | [floraurbana420.com.br](https://floraurbana420.com.br/) |
| Não confundir com | [floraurbana.com.br](https://floraurbana.com.br/) (loja de plantas ornamentais / decoração — domínio distinto) |
| Idioma / moeda | Português (BR) · R$ |
| Pagamento declarado | **PIX** (exclusivo na data da inspeção) |
| Logística declarada | Correios · rastreio · envio discreto · postagem seg–sex · até **72 h úteis** após confirmação |
| Atendimento | Seg–sex 10:00–17:00 (Brasília) · WhatsApp / e-mail |
| App / cupom observado | App com cupom **APP10** (10% OFF) na data da inspeção |
| Data da inspeção | 2026-07-20 |

## Hipóteses e método

- **H1:** Uma loja BR com múltiplos bancos internacionais + filtros (ciclo, feminizada/regular, pack) reduz fricção na escolha de genética para colecionadores.
- **H2:** Políticas claras de armazenamento, germinação e troca (via banco) são tão importantes quanto o catálogo para confiança do comprador.
- **H3:** A loja não substitui formação de cultivo — o valor complementar está no cruzamento com ferramentas e inspeções do laboratório.
- **Método:** (1) leitura da home, catálogo e [central de info](https://floraurbana420.com.br/info/); (2) inventário dos bancos listados na vitrine; (3) registo de checkout/logística; (4) cruzamento com [Diário de Cultivo](/cultivo/) e calculadoras do site.

## Perfil editorial (achados)

1. **Posicionamento** — “O autocultivo é o caminho”; discurso de coleção + cultura carioca; marca própria **Seis Pés Seeds** em destaque na home.
2. **Catálogo amplo** — dezenas de bancos internacionais e nacionais na grelha de marcas (ex.: Barney’s Farm, Dutch Passion, Fast Buds, Green House, Pure Instinto, Royal Queen, Sweet Seeds, Sensi, Seis Pés, entre outros listados na home).
3. **Filtros úteis** — ciclo (automática / fast flowering / fotoperíodo), tipo (feminizada / regular), tamanho de pack e disponibilidade.
4. **Lifestyle** — linha de vestuário, glass jars e acessórios head shop além das sementes.
5. **Educação própria limitada** — FAQ indica que **não** dão orientações diretas de cultivo; apontam conteúdos de parceiros. Isso torna ainda mais relevante o cruzamento com o laboratório BudGanja.
6. **Germinação** — sem garantia direta da loja; trocas dependem de autorização do **banco** com registo fotográfico/vídeo do processo inicial.

## Mapa do catálogo (vitrine)

| Área | O que a inspeção observou |
|------|---------------------------|
| Sementes de coleção | Genéticas por banco; packs a partir de ~R$85–R$255+ na vitrine amostrada (valores flutuam) |
| Linha Seis Pés | Banco/lifestyle próprio com packs e merchandising |
| Bancos internacionais | Grelha extensa (Europa, EUA, etc.) — confirmar stock por SKU |
| Filtros | Ciclo, feminizada/regular, pack, preço, disponibilidade |
| Head shop / wear | Cuia, cinzeiros, jars, bags, camisetas |
| Conteúdo | Blog (eventos, cultura, bancos) + FAQ / manuais de manuseio |

### Bancos observados na home (amostra da grelha)

Barney’s Farm · Black Farm Genetix · Black Tuna · BSF Seeds · DNA Genetics · Dutch Passion · EcoTrio Labs · Fast Buds · Green House Seeds · Grounded Genetics · Humboldt · Old School Genetics · Perfect Tree Seeds · Pure Instinto · Pyramid Seeds · Royal Queen Seeds · Sativa Creations · Secret File · Seedstockers · Seis Pés · Sensi Seeds · Serious Seeds · Silent Seeds · Sweet Seeds · T.H. Seeds · UMAMI Seeds

*(Lista não exaustiva do stock total — a vitrine pode incluir mais marcas nas páginas de colecionáveis.)*

## Logística, pagamento e políticas

| Tema | Declaração pública (resumo) |
|------|-----------------------------|
| Pagamento | Apenas **PIX** no site |
| Envio | Correios; código de rastreio por e-mail após postagem |
| Prazo de despacho | Até 72 horas úteis após confirmação (seg–sex) |
| Armazenamento (manual) | Refrigerador 4–8 °C; embalagem hermética; evitar luz/calor/humidade |
| Trocas / germinação | Sem garantia direta da loja; canal via banco com evidências |
| Responsabilidade de entrega | Compromisso de reenvio/reembolso em extravio/dano atribuível ao serviço de entrega (CDC) |

## Complementaridade com o Inspetor BudGanja

| Necessidade do colecionador / cultivador | Ferramenta / inspeção BudGanja |
|------------------------------------------|--------------------------------|
| Escolher genética e planear ciclo | [Diário de Cultivo](/cultivo/) · [Diário de Cultivo](/cultivo/) |
| Germinação e arranque | [Inspeção: Propagação e Clonagem](/equipamentos/clonadora-6-estacas.html) |
| Ambiente indoor (PPFD / VPD) | [Inspeção: Cultivo Indoor](/calculadoras/luximetro.html) · [Calculadora VPD](/calculadoras/cultivo-lab.html?mode=vpd) |
| Nutrição após germinar | [Inspeção: Nutrição](/calculadoras/cultivo-lab.html?mode=ec) · [Calculadora EC](/calculadoras/cultivo-lab.html?mode=ec) |
| Hardware (LED / tenda) | [Inspeção: Mars Hydro Brasil](/posts/post-inspecao-marshydro-brasil.html) |

## Como repetir o método

1. Abrir a home e anotar bancos em destaque + filtros ativos.
2. Ler FAQ / institucional (pagamento, envio, germinação, trocas).
3. Amostrar 5–10 SKUs (automática vs fotoperíodo; preço; pack).
4. Registar data da visita — stock e preços mudam.
5. Cruzar com ferramentas do laboratório (tabela acima), sem copiar o catálogo comercial.

## Créditos e transparência

- **Catálogo, imagens, preços e políticas** © Flora Urbana — consultar [floraurbana420.com.br](https://floraurbana420.com.br/).
- **Inspeção redigida por:** Inspetor BudGanja (laboratório digital independente).
- **Finalidade:** mapear a vitrine e a complementaridade com o método do laboratório — **não** constitui endosso comercial nem promoção de cultivo ilegal.

## Status

**Aprovado como referência de loja (sementes de coleção)** — vitrine BR clara, catálogo multi-banco, filtros úteis e políticas de envio/atendimento legíveis. Pontos de atenção: pagamento só PIX; germinação sem garantia da loja (depende do banco); conteúdo de cultivo é externo — usar o guia e as calculadoras do Inspetor BudGanja para o lado técnico.

[▶ Ver loja Flora Urbana 420](https://floraurbana420.com.br/) · [Todas as inspeções](/biblioteca/inspecoes/)`
  });
}

const LOJA_INSPECOES_POSTS = [buildFloraUrbanaInspectionPost()];

module.exports = {
  LOJA_INSPECOES_POSTS,
  buildFloraUrbanaInspectionPost
};
