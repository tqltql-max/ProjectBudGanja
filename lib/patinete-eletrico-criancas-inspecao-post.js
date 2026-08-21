'use strict';

/**
 * Inspeção: Patinete eléctrico — locomoção a bateria, crianças e perigos.
 * Série: verificacao-equipamento.
 */

function verificacaoPost(opts) {
  const post = {
    title: opts.title,
    excerpt: opts.excerpt,
    slug: opts.slug,
    date: opts.date,
    coverImage: opts.coverImage || 'imagens/og-default.jpg',
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'verificacao-equipamento',
    seriesOrder: opts.seriesOrder,
    seriesLabel: opts.seriesLabel || 'Verificação de objectos',
    content_raw: opts.body
  };
  if (opts.titleEn) post.titleEn = opts.titleEn;
  if (opts.titleEs) post.titleEs = opts.titleEs;
  if (opts.excerptEn) post.excerptEn = opts.excerptEn;
  if (opts.excerptEs) post.excerptEs = opts.excerptEs;
  if (opts.contentEn) post.contentEn = opts.contentEn;
  if (opts.contentEs) post.contentEs = opts.contentEs;
  if (opts.sourceUrl) post.sourceUrl = opts.sourceUrl;
  return post;
}

const COVER = '/imagens/inspecoes/patinete-eletrico-criancas-cover.jpg';
const INMETRO_BRINQUEDO =
  'https://www.gov.br/inmetro/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-conformidade/brinquedos/brinquedos-eletricos-devem-ser-certificados';
const CONTRAN_PDF =
  'https://www.gov.br/transportes/pt-br/assuntos/transito/conteudo-contran/resolucoes/Resolucao9962023.pdf';
const CONTRAN_DOU =
  'https://www.in.gov.br/en/web/dou/-/resolucao-contran-n-996-de-15-de-junho-de-2023-491553860';
const SECOM_FAKE =
  'https://www.gov.br/secom/pt-br/fatos/brasil-contra-fake/noticias/2023/06/bicicletas-eletricas-e-equipamentos-autopropelidos-nao-precisam-de-registro-emplacamento-ou-habilitacao';
const BYD_WIKI = 'https://en.wikipedia.org/wiki/BYD_Company';
const BLADE_WIKI = 'https://en.wikipedia.org/wiki/BYD_Blade_battery';

function buildPatineteBodies(inspected) {
  const objetos = '/posts/post-inspecao-palavra-objetos.html';
  const risco = '/posts/post-inspecao-palavra-risco.html';
  const fogo = '/posts/post-inspecao-palavra-fogo.html';
  const eletrizante = '/posts/post-inspecao-palavra-eletrizante.html';
  const interruptor = '/posts/post-inspecao-palavra-interruptor.html';
  const ligar = '/posts/post-inspecao-palavra-ligar-desligar.html';
  const luz = '/posts/post-inspecao-palavra-luz.html';
  const caminho = '/posts/post-inspecao-palavra-caminho.html';
  const pular = '/posts/post-inspecao-palavra-pular.html';
  const gesto = '/posts/post-inspecao-palavra-gesto.html';
  const sinal = '/posts/post-inspecao-palavra-sinal.html';
  const verdade = '/posts/post-inspecao-palavra-verdade.html';
  const respeito = '/posts/post-inspecao-palavra-respeito.html';
  const celular = '/posts/post-inspecao-celular-riscos-saude-criancas.html';
  const delorean = '/posts/post-inspecao-delorean.html';
  const mantra = '/posts/post-inspecao-expressao-faca-o-melhor.html';
  const hub = '/biblioteca/inspecoes/';
  const catalogo = '/objetos/';
  const self = '/posts/post-inspecao-patinete-eletrico-criancas.html';

  const body = `## Escopo

Inspeção editorial do **[patinete eléctrico](${self})** — objecto de **locomoção a bateria**. O pedido de campo chegou em três voltas: marca de veículos **BYD**; a **relação com baterias**; depois o objecto miúdo: **patinetes, crianças e perigos**. Esta ficha começa no **objecto que a criança sobe**, não no catálogo de automóveis. A bateria é o **motor da tese**; a BYD entra como **genealogia industrial** (empresa que nasceu da célula e só depois fez o carro) — **sem** fundir o patinete de prateleira com o sedã.

> **Nota metodológica:** auditoria independente. Fontes: [INMETRO · brinquedos eléctricos](${INMETRO_BRINQUEDO}), [Resolução CONTRAN nº 996/2023](${CONTRAN_PDF}) ([DOU](${CONTRAN_DOU})), [Secom · o que a 996 não exige](${SECOM_FAKE}), [BYD Company](${BYD_WIKI}), [Blade Battery](${BLADE_WIKI}). **Não é aconselhamento médico, jurídico nem de compra. Não é review de SKU. Não é endosso de marca.** Leis municipais e selos mudam — confirmar no órgão da via e no INMETRO. Sem afiliação com BYD, marketplaces ou fabricantes de patinete.

![Patinete eléctrico — locomoção a bateria, crianças e perigos](${COVER})

*Capa editorial — o objecto inspecionado é a locomoção a bateria no tamanho da criança, não um modelo comercial.*

## 1. Objecto inspecionado

| Campo | Valor |
|-------|-------|
| Objecto | **Patinete eléctrico** (e-scooter) — duas (ou mais) rodas + motor + **bateria** |
| Recorte | Crianças e adolescentes; perigos do corpo, da via e da célula |
| Classe | Locomoção a bateria — família do carro eléctrico, da e-bike e do hoverboard |
| Distinto de | Patinete de **empurrar** (sem motor) · bicicleta · ciclomotor · automóvel BYD |
| Tipo BudGanja | [Objetos](${objetos}) · verificação de equipamento · [risco](${risco}) |
| Elo circuito | [interruptor](${interruptor}) · [ligar / desligar](${ligar}) · [eletrizante](${eletrizante}) · [fogo](${fogo}) · [luz](${luz}) |
| Elo ofício | [caminho](${caminho}) · [gesto](${gesto}) · [pular](${pular}) · [sinal](${sinal}) |
| Par infantil | [Celular — riscos à saúde das crianças](${celular}) (ecrã ≠ roda; ambos objectos da casa) |
| Data | ${inspected} |

## 2. Hipóteses e método

**H1:** o objecto **não** é «brinquedo com motor». É **locomoção a bateria** — energia armazenada que move massa.  
**H2:** três camadas de [risco](${risco}) **não se fundem**: (1) queda e via; (2) célula / carregador / [fogo](${fogo}); (3) classificação (brinquedo INMETRO × autopropelido CONTRAN × ciclomotor).  
**H3:** «é só um patinete» e «a criança já sabe» são **claims** — o laboratório não os copia.  
**H4:** a BYD ilustra a **ordem verdadeira** da indústria eléctrica: **bateria primeiro, veículo depois**. No patinete infantil a ordem inverte-se no marketing: veículo-brinquedo primeiro, bateria escondida. A ficha **reordena**.  
**H5:** fecho = [respeito](${respeito}) à criança + [Faça o melhor!](${mantra}) — o melhor recorte *deste* objecto *neste* ecrã, sem virar vitrine nem pânico.

Método: (1) fixar o objecto; (2) separar classes legais; (3) mapear perigos; (4) situar a bateria (indústria × pacote de marketplace); (5) checklist para quem decide em casa; (6) limites.

## 3. Três classes que o marketplace cola

O perigo começa quando o mesmo desenho de duas rodas vende-se como **três coisas ao mesmo tempo**.

| Classe | O que é | Âncora | Confiança |
|--------|---------|--------|-----------|
| **Brinquedo eléctrico** | Tensão máxima **24 V**; patinetes e veículos «para a criança guiar» à bateria/pilha; **selo INMETRO** de brinquedo | [FAQ INMETRO](${INMETRO_BRINQUEDO}) | Alta — recorte de conformidade, não de trânsito |
| **Autopropelido** | Mobilidade individual: até **1000 W**, velocidade de fabrico ≤ **32 km/h**, largura ≤ 70 cm; campainha, [luz](${luz}) e limitador; **sem** placa/CNH federais | [CONTRAN 996/2023](${CONTRAN_PDF}) · [Secom](${SECOM_FAKE}) | Alta — via pública; **não** fixa idade mínima |
| **Ciclomotor** | Acima desses limiares (potência/velocidade) | Mesma resolução | Alta — ACC/CNH A, registo, emplacamento |

**O que o INMETRO recusa como brinquedo:** tensão **acima de 24 V**; velocidade/potência acima da série NM 300; veículos **destinados a vias públicas ou passeios**. Um patinete «de criança» vendido a 36 V no marketplace **já saiu** da prateleira de brinquedo — mesmo com desenho de desenho animado.

**Hótese aplicada:** a criança não lê a [Resolução 996](${CONTRAN_PDF}). Quem compra lê. Sem selo, sem tensão escrita, sem limitador — o objecto **não** está inspecionado.

## 4. A bateria (o início de tudo)

Pedido anterior: *relação da BYD com baterias*. A leitura BudGanja: **BYD Company** (Shenzhen, **Wang Chuanfu**, **1995**) começa como **fábrica de células recarregáveis** (NiCd, depois NiMH e lítio para telemóveis). O automóvel (**BYD Auto**, 2003) é **camada posterior**. A **Blade Battery** (LFP, FinDreams Battery, lançamento público **2020**) é ofício de célula em escala de carro e autocarro — incluindo planta de LFP em **Manaus** (2020) para autocarros. Fontes: [BYD](${BYD_WIKI}), [Blade](${BLADE_WIKI}).

| Camada | O que é | O que esta ficha **não** faz |
|--------|---------|------------------------------|
| Indústria (BYD / FinDreams) | Célula como ofício; carro e autocarro como aplicação; LFP «lâmina» como tese de segurança estrutural | Não é ficha da marca, não é teste de sedã, não é endosso |
| Pacote do patinete infantil | Célula (muitas vezes lítio-íão NMC ou genérica) + BMS barato + carregador solto | Não é a Blade; **não** herda o ensaio de prego da BYD |
| Física comum | Energia química → eléctrica → cinética. Dano, curto, sobrecarga, calor | Mesma família de [eletrizante](${eletrizante}) / [fogo](${fogo}); escala diferente |

**Veredicto da relação:** a BYD prova que **locomoção eléctrica é ofício de bateria**. O patinete da criança prova o inverso do marketing: se a célula não está nomeada (tensão, química, carregador original, certificação), o objecto é **locomoção sem ficha**. Célula industrial ≠ pacote de marketplace. Demo de segurança de uma marca **não** certifica o brinquedo da outra.

Perigos específicos da célula no quarto:

| Gesto | Risco | Leitura |
|-------|-------|---------|
| Carregador «genérico» / USB improvisado | Sobrecarga, calor, ignição | O [interruptor](${interruptor}) da parede não inspeciona a célula |
| Carga de noite, debaixo da cama, no sofá | [Fogo](${fogo}) sem testemunha | Superfície dura, à vista, longe de tecidos |
| Pacote inchado, molhado, caído | Fuga térmica | Parar de usar — não «ainda anda» |
| Hoverboard / monociclo irmão | Mesma família de células em objecto instável | Não diluir o patinete noutro SKU; o mapa é o mesmo |

## 5. Mapa de perigos (criança no objecto)

| Domínio | O que acontece | Notas |
|---------|----------------|-------|
| **Queda / cabeça** | O motor antecipa o [gesto](${gesto}) que a criança ainda não tem; o peso do objecto cai *com* ela | Capacete (selo), joelheiras, cotoveleiras — [respeito](${respeito}) ao crânio, não pose |
| **Velocidade × idade** | 15–32 km/h num corpo de 20–40 kg | «Já sabe o de empurrar» **não** transfere para o eléctrico |
| **Via / carro** | Autopropelido na rua onde o limite do carro é 40 km/h; calçada a passo de peão (recorte típico 6 km/h) | A 996 **não** dá idade mínima; o município regula a via |
| **Silêncio** | Motor sem ruído de motorina — peão e criança não se ouvem | Campainha é equipamento, não enfeite ([sinal](${sinal})) |
| **Passageiro** | Segunda criança no deck | Em regra **proibido** no autopropelido — um corpo, um objecto |
| **Massa do equipamento** | Patinete eléctrico pesa; atropela o pé, prende o tornozelo | Distinto do de empurrar oco |
| **Água / chuva** | Curto + perda de travão | Locomoção ≠ brinquedo de piscina |
| **Ecrã / distração** | Celular no guidão | Par com a ficha [celular](${celular}): dois objectos, um [caminho](${caminho}) |
| **Claim «é seguro»** | Caixa com desenho, influencer, «a partir dos 3 anos» | Sem selo e sem tensão = [verdade](${verdade}) em falta |

O laboratório **não** fecha uma idade mágica. Fecha o método: se o objecto entra na via, aplica-se a 996 e a regra local; se entra no quarto como brinquedo, aplica-se o INMETRO (≤ 24 V + selo). **No meio** — 36 V «kids», sem selo, na calçada — está o fosso onde o perigo mora.

## 6. Como usar esta inspeção

1. Ler a **tensão** e o **selo** antes do preço. ≤ 24 V + INMETRO brinquedo ≠ via.  
2. Se for autopropelido (até 1000 W / 32 km/h): limitador, campainha, [luz](${luz}); capacete; **um** condutor; fora de vias rápidas.  
3. Carregar com o **carregador do objecto**, à vista, em superfície dura; [desligar](${ligar}) a célula inchada.  
4. Não tratar a Blade Battery / BYD como certificado do patinete da prateleira.  
5. Cruzar com [celular](${celular}) quando a distracção for ecrã + roda.  
6. Fechar com [Faça o melhor!](${mantra}) — o melhor para *esta* criança *neste* [caminho](${caminho}), não o melhor anúncio.

## Status

**Aprovada** — patinete eléctrico documentado como **objecto de locomoção a bateria**; perigos infantis mapeados em três camadas (corpo/via, célula/[fogo](${fogo}), classificação INMETRO × CONTRAN 996); BYD citada como **genealogia da célula**, não como vitrine. **Sem** endosso. **Sem** idade mágica. Rever se a 996 ou o INMETRO actualizarem o recorte.

[▶ Objetos](${catalogo}) · [▶ Inspeções](${hub}) · [▶ INMETRO](${INMETRO_BRINQUEDO}) · [▶ CONTRAN 996](${CONTRAN_PDF}) · [▶ celular](${celular}) · [▶ risco](${risco}) · [▶ Faça o melhor!](${mantra})
`;

  const contentEn = `## Scope

Editorial inspection of the **electric scooter** as **battery-powered locomotion**. Field request: BYD as a car brand → batteries → **children’s scooters and dangers**. This sheet starts with the **object the child stands on**. BYD enters as **industrial genealogy** (cells first, cars later) — not as a showroom.

> Independent audit. Sources: [INMETRO electric toys](${INMETRO_BRINQUEDO}), [CONTRAN Resolution 996/2023](${CONTRAN_PDF}), [BYD](${BYD_WIKI}). **Not medical, legal or buying advice. Not a SKU review. Not an endorsement.**

## Object

| Field | Value |
|-------|-------|
| Object | Electric kick scooter (e-scooter) — wheels + motor + **battery** |
| Cut | Children; body, road and cell hazards |
| Distinct from | Push scooter · e-bike · moped · BYD car |
| Date | ${inspected} |

## Three classes the marketplace glues together

| Class | Anchor |
|-------|--------|
| **Electric toy** | Max **24 V**; INMETRO toy mark. Above 24 V, or meant for public roads, **is not** a toy ([INMETRO](${INMETRO_BRINQUEDO})). |
| **Self-propelled device** | ≤ **1000 W**, factory speed ≤ **32 km/h**; bell, lights, limiter; no federal plate/licence. **No minimum age** in 996. |
| **Moped** | Above those limits — ACC / category A, registration. |

## The battery

**BYD** (1995, Wang Chuanfu) is a **battery company that later built cars**. The Blade Battery (LFP, 2020) is industrial cell craft. A children’s marketplace pack **does not inherit** that nail-penetration demo. Same physics family ([fire](${fogo})); different object, different duty.

Charge with the original charger, in sight, on a hard surface. A swollen pack is out of service.

## Child hazards

Falls and head injury; speed vs age; mixing with cars; silent motor; extra passenger (usually forbidden); device mass; water; phone-on-bars (see [phone sheet](${celular})). “It’s just a toy” and “the child already knows the push scooter” are **claims**, not facts.

## Status

**Approved** as equipment verification — battery locomotion; three risk layers; BYD as cell genealogy only. No endorsement. No magic age.

[▶ INMETRO](${INMETRO_BRINQUEDO}) · [▶ CONTRAN 996](${CONTRAN_PDF}) · [▶ Do your best!](${mantra})
`;

  const contentEs = `## Alcance

Inspección del **patinete eléctrico** como **locomoción a batería**. El pedido de campo: marca BYD → baterías → **patinetes, niñas/os y peligros**. La ficha empieza en el **objeto que la niña sube**. BYD entra como **genealogía industrial** (célula primero, coche después) — no como vitrina.

> Auditoría independiente. Fuentes: [INMETRO](${INMETRO_BRINQUEDO}), [CONTRAN 996/2023](${CONTRAN_PDF}). **No es consejo médico, jurídico ni de compra. No es endoso.**

## Objeto

| Campo | Valor |
|-------|-------|
| Objeto | Patinete eléctrico — ruedas + motor + **batería** |
| Recorte | Infancia; cuerpo, vía y celda |
| Distinto de | Patinete de empujar · e-bike · ciclomotor · coche BYD |
| Fecha | ${inspected} |

## Tres clases que el marketplace pega

| Clase | Ancla |
|-------|--------|
| **Juguete eléctrico** | Máx. **24 V** + sello INMETRO. Por encima de 24 V, o para vía pública, **no** es juguete. |
| **Autopropulsado** | ≤ **1000 W**, ≤ **32 km/h**; timbre, luces, limitador. La 996 **no** fija edad mínima. |
| **Ciclomotor** | Por encima — ACC / categoría A, registro. |

## La batería

**BYD** (1995) es **empresa de celdas que después hizo coches**. Blade Battery (LFP, 2020) es oficio industrial. El pack del patinete infantil **no hereda** ese ensayo. Misma física ([fuego](${fogo})); otro objeto.

Cargar con el cargador del objeto, a la vista, sobre superficie dura. Pack hinchado = fuera de servicio.

## Peligros infantiles

Caída y cabeza; velocidad × edad; mezcla con coches; motor silencioso; segundo pasajero (en regla, prohibido); masa del aparato; agua; celular en el manillar ([ficha del celular](${celular})). «Es solo un juguete» es **claim**.

## Estado

**Aprobada** — locomoción a batería; tres capas de riesgo; BYD solo como genealogía de la celda. Sin endoso. Sin edad mágica.

[▶ INMETRO](${INMETRO_BRINQUEDO}) · [▶ CONTRAN 996](${CONTRAN_PDF}) · [▶ ¡Haz lo mejor!](${mantra})
`;

  return { body, contentEn, contentEs };
}

function buildPatineteEletricoCriancasInspecaoPost() {
  const inspected = '2026-08-21';
  const { body, contentEn, contentEs } = buildPatineteBodies(inspected);

  return verificacaoPost({
    title: 'Inspeção: Patinete eléctrico — locomoção a bateria, crianças e perigos',
    titleEn: 'Inspection: Electric scooter — battery locomotion, children and hazards',
    titleEs: 'Inspección: Patinete eléctrico — locomoción a batería, niñas/os y peligros',
    excerpt:
      'Objetos: patinete eléctrico como locomoção a bateria — não é brinquedo com motor; INMETRO ≤24 V × CONTRAN 996; célula ≠ BYD Blade; quedas, via e fogo; sem endosso.',
    excerptEn:
      'Objects: e-scooter as battery locomotion — not a motorized toy; INMETRO ≤24 V vs CONTRAN 996; cell ≠ BYD Blade; falls, traffic and fire; no endorsement.',
    excerptEs:
      'Objetos: patinete eléctrico como locomoción a batería — no es juguete con motor; INMETRO ≤24 V × CONTRAN 996; celda ≠ BYD Blade; caídas, vía y fuego; sin endoso.',
    slug: 'inspecao-patinete-eletrico-criancas',
    date: inspected + 'T10:50:00.000Z',
    seriesOrder: 4,
    seriesLabel: 'Patinete · crianças',
    coverImage: COVER,
    sourceUrl: CONTRAN_PDF,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildPatineteEletricoCriancasInspecaoPost,
  buildPatineteBodies
};
