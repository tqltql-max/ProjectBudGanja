'use strict';

function ytThumb(id) {
  return 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
}

function seriesLinks(order) {
  const slugs = [
    'inspecao-cultivo-inicio',
    'inspecao-nutricao-cannabis',
    'inspecao-solo-vivo-organico',
    'inspecao-arquitetura-cannabis',
    'inspecao-ciencia-floracao',
    'inspecao-propagacao-clonagem',
    'inspecao-cultivo-indoor-ppfd'
  ];
  const lines = ['\n## Série Guia de Cultivo Básico'];
  if (order > 1) {
    lines.push('← [Inspeção anterior](/posts/post-' + slugs[order - 2] + '.html)');
  }
  if (order < slugs.length) {
    lines.push('→ [Próxima inspeção](/posts/post-' + slugs[order] + '.html)');
  }
  lines.push('[Ver todas as inspeções](/biblioteca/inspecoes/)');
  return lines.join('\n\n');
}

function inspectionPost(opts) {
  return {
    title: opts.title,
    excerpt: opts.excerpt,
    excerptEn: opts.excerptEn || '',
    excerptEs: opts.excerptEs || '',
    slug: opts.slug,
    date: opts.date,
    coverImage: ytThumb(opts.videoId),
    category: 'inspecao',
    format: 'markdown',
    published: true,
    series: 'guia-cultivo-basico',
    seriesOrder: opts.seriesOrder,
    seriesLabel: 'Guia de Cultivo Básico',
    videoId: opts.videoId,
    content_raw: opts.body + seriesLinks(opts.seriesOrder)
  };
}

const GUIA_INSPECOES_POSTS = [
  inspectionPost({
    title: 'Inspeção: O Início do Cultivo de Cannabis',
    excerpt: 'Verificação das quatro fases fenológicas e dos fatores ambientais críticos no arranque do cultivo — base do guia em vídeo do canal.',
    slug: 'inspecao-cultivo-inicio',
    videoId: '38uUEL1B-v4',
    date: '2026-06-27T17:01:02.000Z',
    seriesOrder: 1,
    body: `## Escopo

Inspeção documental do **arranque do cultivo** conforme metodologia apresentada no canal @InspetorBudGanja: delimitação das fases fenológicas, variáveis ambientais mensuráveis e critérios de aceitação para germinação e vegetativo inicial.

## Hipóteses e método

- **H1:** O ciclo completo divide-se em quatro etapas operacionais distintas (germinação → vegetativo → floração → secagem/cura).
- **H2:** Luz, água, ar, temperatura, umidade relativa (UR) e substrato/nutrição são variáveis de primeira ordem — falha em qualquer uma compromete o rendimento global.
- **Método:** Revisão do protocolo em vídeo, cruzamento com parâmetros de referência do laboratório e checklist de instrumentação mínima.

## Parâmetros de referência

| Variável | Faixa alvo (indoor típico) | Instrumento |
|----------|---------------------------|-------------|
| Temperatura | 22–28 °C (dia) | [Termo-higrômetro digital](/loja/#cultivo-indoor) |
| UR ar | 55–70 % (vegetativo) | Termo-higrômetro |
| Fotoperíodo (veg.) | 18/6 h | [Timer digital](/loja/#cultivo-indoor) |
| Substrato | Bem drenado, pH 6,0–6,5 | Medidor de pH (opcional) |

## Achados

1. **Germinação:** sementes viáveis exigem umidade constante (não encharcamento) e temperatura estável; escotofobia impede desenvolvimento sem luz após emergência.
2. **Vegetativo:** taxa de crescimento correlaciona-se com fotossíntese líquida — insuficiência lumínica alonga internós e reduz biomassa foliar.
3. **Transição:** mudança de fotoperíodo e nutrição antecipa floração; documentar data de flip é essencial para o diário de cultivo.
4. **Secagem/cura:** redução gradual da UR (≈55–62 %) preserva terpenos; monitorização contínua evita mofo.

## Equipamentos verificados (loja parceira)

- [Termo-higrômetro digital](/loja/#cultivo-indoor) — leitura simultânea T e UR no dossel
- [Timer de fotoperíodo](/loja/#cultivo-indoor) — repetibilidade 18/6 ou 12/12
- [Tomada inteligente Wi-Fi](/loja/#cultivo-indoor) — registo remoto de ciclos luz/escuro

## Ferramentas do laboratório

- [Calculadora VPD](/calculadoras/vpd.html) — validar déficit de pressão de vapor
- [Diário de Cultivo](/cultivo/) — registar fase e lembretes por semana

## Vídeo explicativo

@youtube 38uUEL1B-v4

## Status

**Aprovado** — framework das quatro fases e variáveis críticas adequado como protocolo de entrada para cultivadores iniciantes com monitorização básica.`
  }),

  inspectionPost({
    title: 'Inspeção: Nutrição da Cannabis',
    excerpt: 'Análise das necessidades de macro e micronutrientes por fase fenológica, relação N:P:K e condutividade elétrica da solução nutritiva.',
    slug: 'inspecao-nutricao-cannabis',
    videoId: 'XIrSJWjhd6Q',
    date: '2026-06-27T17:07:52.000Z',
    seriesOrder: 2,
    body: `## Escopo

Inspeção da **nutrição mineral e orgânica** da *Cannabis sativa* L. em cultivo controlado: demanda por macronutrientes (N, P, K, Ca, Mg, S), micronutrientes (Fe, Mn, Zn, Cu, B, Mo) e ajuste por fase vegetativa vs. floração.

## Hipóteses e método

- **H1:** A relação N:P:K deve inverter-se entre vegetativo (ênfase em N) e floração (ênfase em P e K).
- **H2:** EC e pH da solução ou do extrato de solo predizem disponibilidade iônica — fora da faixa ótima ocorre bloqueio antagónico (ex.: excesso de Ca bloqueia Mg).
- **Método:** Síntese do protocolo do vídeo + tabela de faixas EC/pH aceites para cada meio.

## Medições de referência

| Fase | N:P:K típico | EC solução (mS/cm) | pH alvo |
|------|-------------|-------------------|---------|
| Plântula / início veg. | 3:1:2 | 0,8–1,2 | 5,8–6,2 (hidro) / 6,0–6,5 (solo) |
| Vegetativo pleno | 3:1:2 – 2:1:2 | 1,2–1,8 | 5,8–6,2 |
| Floração | 1:3:2 | 1,4–2,0 | 5,8–6,0 |
| Final floração | 0:3:3 | 1,0–1,4 | 5,8–6,0 |

## Achados

- **Deficiência de N:** clorose em folhas inferiores (mobilização de reservas).
- **Deficiência de P:** folhas escuras com manchas bronzeadas; atraso na floração.
- **Deficiência de K:** necrose marginal em folhas maduras durante floração.
- **Toxicidade por excesso:** pontas queimadas, bloqueio de outros íons — reduzir EC antes de adicionar mais fertilizante.
- Em **solo vivo**, a nutrição é mediada pelo microbioma — ver [Inspeção: Solo Vivo Orgânico](/posts/post-inspecao-solo-vivo-organico.html).

## Equipamentos verificados (loja parceira)

- [Medidor de pH da água](/loja/#cultivo-indoor) — calibração semanal recomendada
- [Balança digital de precisão](/loja/#cultivo-indoor) — dosagem de fertilizantes
- [Fertilizante NPK para plantas](/loja/#cultivo-indoor) — linha vegetativo e floração

## Ferramentas do laboratório

- [Calculadora EC](/calculadoras/ec.html)
- [Calculadora de diluição](/calculadoras/diluicao.html)

## Vídeo explicativo

@youtube XIrSJWjhd6Q

## Status

**Aprovado** — esquema N:P:K por fase e monitorização EC/pH consistentes com prática agronómica de cultivo intensivo.`
  }),

  inspectionPost({
    title: 'Inspeção: Solo Vivo Orgânico',
    excerpt: 'Verificação da construção de super-solo com microbioma ativo, ciclagem de nutrientes e indicadores de saúde do substrato.',
    slug: 'inspecao-solo-vivo-organico',
    videoId: '092X69hq8Os',
    date: '2026-06-27T17:08:37.000Z',
    seriesOrder: 3,
    body: `## Escopo

Inspeção do **substrato vivo** (*living soil*): composição do super-solo, papel de bactérias, fungos micorrízicos e invertebrados na mineralização e disponibilização de nutrientes.

## Hipóteses e método

- **H1:** Um solo vivo reduz a dependência de fertilizantes minerais sintéticos ao manter ciclagem fechada de C e N.
- **H2:** A estrutura física (porosidade, retenção hídrica) e a atividade biológica são indicadores complementares de saúde.
- **Método:** Análise da receita do vídeo (turfa/coco, composto, perlita, amendamentos) e critérios de manutenção (rega com chá de compostagem, cobertura morta).

## Composição verificada (receita base)

| Componente | Função | Proporção orientativa |
|------------|--------|----------------------|
| Turfa / coco | Matriz e retenção | 30–40 % |
| Composto maduro | Nutrientes lentos + microbioma | 30–40 % |
| Perlita / vermiculita | Drenagem e aeração | 10–20 % |
| Farinha de ossos / guano | P e Ca (liberação lenta) | conforme análise |
| Humus de minhoca | Inóculo microbiano | 5–10 % |

## Achados

- **Atividade biológica:** odor terroso, agregados estáveis e presença de micélio visível indicam colonização fúngica benéfica.
- **pH tampão:** matéria orgânica complexa mantém faixa 6,0–7,0 em cultivo de cânhamo.
- **Irrigação:** regas com **chá de compostagem** (aerada 24–48 h) repõem microbioma sem sobrefertilizar.
- **Cobertura morta (mulch):** reduz evaporação e alimenta decompositores na superfície.

## Equipamentos verificados (loja parceira)

- [Substrato orgânico para plantas](/loja/#cultivo-indoor)
- [Perlita para cultivo](/loja/#cultivo-indoor)
- [Termo-higrômetro](/loja/#cultivo-indoor) — UR do dossel em solo vivo (55–65 % veg.)

## Ferramentas do laboratório

- [Calculadora VPD](/calculadoras/vpd.html) — ambiente do dossel
- [Inspeção: Nutrição](/posts/post-inspecao-nutricao-cannabis.html) — complemento mineral

## Vídeo explicativo

@youtube 092X69hq8Os

## Status

**Aprovado** — metodologia de super-solo alinhada com princípios de agricultura regenerativa aplicada ao cultivo indoor/outdoor.`
  }),

  inspectionPost({
    title: 'Inspeção: Arquitetura da Cannabis',
    excerpt: 'Avaliação morfológica da planta — nós, internós, gemas apicais e laterais — e técnicas de manejo (topping, LST, SCROG).',
    slug: 'inspecao-arquitetura-cannabis',
    videoId: 'OO7d72tHwJY',
    date: '2026-06-27T17:10:07.000Z',
    seriesOrder: 4,
    body: `## Escopo

Inspeção da **arquitetura vegetativa** da cannabis: padrão de ramificação, dominância apical, distribuição de fluxo assimilatório e intervenções de treino que maximizam área foliar iluminada.

## Hipóteses e método

- **H1:** A dominância apical concentra auxinas na gema terminal, limitando brotação lateral até intervenção mecânica.
- **H2:** Topping, LST (Low Stress Training) e SCROG aumentam colmos produtivos de forma previsível se aplicados no vegetativo.
- **Método:** Mapeamento morfológico (nó/internó), registo fotográfico no diário e verificação de uniformidade lumínica no dossel.

## Parâmetros morfológicos

| Estrutura | Função | Indicador de saúde |
|-----------|--------|-------------------|
| Gema apical | Crescimento vertical | Cor verde uniforme, sem necrose |
| Gemas axilares | Ramos laterais | Ativas após topping/LST |
| Pecíolo | Suporte e transporte | Ângulo 45–90° após treino |
| Internódio | Distância entre nós | Curto = luz adequada; longo = estiolamento |

## Achados

- **Topping (pinceamento apical):** duas gemas laterais assumem dominância; ideal com 4–6 nós desenvolvidos.
- **LST:** dobragem gradual redistribui hormônios sem choque — fita macia ou arame revestido.
- **SCROG:** [rede de treino](/loja/#cultivo-indoor) nivela dossel; PPFD homogéneo reduz “pipoca” (buds inferiores improdutivos).
- **Folhas:** índice de área foliar (LAI) correlaciona com taxa fotossintética — remover apenas fan leaves que sombreiam gemas.

## Equipamentos verificados (loja parceira)

- [Rede SCROG para cultivo](/loja/#cultivo-indoor)
- [Tesoura de poda](/loja/#cultivo-indoor)
- [Painel LED full spectrum](/loja/#cultivo-indoor) — uniformidade no dossel

## Ferramentas do laboratório

- [Calculadora Watts/m²](/calculadoras/watts-m2.html)
- [Diário de Cultivo](/cultivo/) — fotos antes/depois do treino

## Vídeo explicativo

@youtube OO7d72tHwJY

## Status

**Aprovado** — protocolos de manejo compatíveis com maximização de área foliar útil em espaço indoor limitado.`
  }),

  inspectionPost({
    title: 'Inspeção: A Ciência da Floração',
    excerpt: 'Verificação do gatilho fotoperiódico, desenvolvimento pistilar, maturação tricomática e janela ideal de colheita.',
    slug: 'inspecao-ciencia-floracao',
    videoId: 'V6LO6nXh8bI',
    date: '2026-06-27T17:11:03.000Z',
    seriesOrder: 5,
    body: `## Escopo

Inspeção da **fase reprodutiva**: transição vegetativo→floração por fotoperíodo, morfologia floral, biosíntese de canabinoides e terpenos nos tricomas glandulares.

## Hipóteses e método

- **H1:** Fotoperíodo ≤12 h de luz contínua induz floração em genótipos fotoperiódicos via interação phytochrome (Pfr/Pr).
- **H2:** A maturação tricomática (clara→leitosa→âmbar) correlaciona-se com perfil de efeito e rendimento — não apenas calendário.
- **Método:** Registo de data de flip 12/12, contagem de semanas de floração e observação tricomática com lupa 60×.

## Parâmetros críticos na floração

| Variável | Alvo | Notas |
|----------|------|-------|
| Fotoperíodo | 12/12 h | [Timer digital](/loja/#cultivo-indoor) — sem fugas de luz |
| Temperatura | 20–26 °C | Calor noturno excessivo degrada terpenos |
| UR | 40–50 % | Reduz risco de botrytis |
| VPD | 1,0–1,4 kPa | [Calculadora VPD](/calculadoras/vpd.html) |
| N:P:K | Baixo N, alto P/K | Ver inspeção de nutrição |

## Achados

- **Pré-flora:** alongamento internodal (“stretch”) nas 2–3 primeiras semanas pós-flip — reforçar suporte/SCROG.
- **Pistilos:** brancos e erectos no início; escurecimento e retração indicam aproximação da maturação.
- **Tricomas:** colheita majoritariamente leitosa para perfil mais cerebral; 10–20 % âmbar para efeito mais sedativo.
- **Flush opcional:** redução de EC nas últimas 1–2 semanas pode melhorar sabor em cultivo mineral.

## Equipamentos verificados (loja parceira)

- [Timer fotoperíodo 12/12](/loja/#cultivo-indoor)
- [Tomada inteligente](/loja/#cultivo-indoor) — confirmação de escuro absoluto
- [Termo-higrômetro](/loja/#cultivo-indoor) — UR baixa na floração

## Ferramentas do laboratório

- [Calculadora DLI](/calculadoras/dli.html)
- [Diário de Cultivo](/cultivo/) — registar semanas de floração

## Vídeo explicativo

@youtube V6LO6nXh8bI

## Status

**Aprovado** — critérios fotoperiódicos e de maturação tricomática adequados para decisão de colheita baseada em evidência.`
  }),

  inspectionPost({
    title: 'Inspeção: Propagação e Clonagem',
    excerpt: 'Verificação de técnicas de multiplicação vegetativa — estacas, ambiente de enraizamento e sistemas aeropónicos caseiros.',
    slug: 'inspecao-propagacao-clonagem',
    videoId: 'tdMl4X5h83Y',
    date: '2026-06-27T17:11:35.000Z',
    seriesOrder: 6,
    body: `## Escopo

Inspeção dos **métodos de propagação clonal**: seleção de material-mãe, estacas apicais, parâmetros de enraizamento (T, UR, oxigenação radicular) e comparação entre métodos passivos e aeropónicos.

## Hipóteses e método

- **H1:** Estacas de 10–15 cm com 2–3 nós, cortadas em bisel sob água corrente, enraízam mais rápido com UR elevada (70–90 %).
- **H2:** Oxigenação contínua da zona radicular (clonadora com bombinha ou aspersão) acelera emissão de raízes adventícias.
- **Método:** Protocolo do vídeo cruzado com manuais das clonadoras documentadas no laboratório.

## Parâmetros de enraizamento

| Parâmetro | Faixa alvo | Equipamento |
|-----------|-----------|-------------|
| Temperatura | 24–26 °C | Termo-higrômetro |
| UR | 70–90 % | Domo / propagador |
| Fotoperíodo | 18/6 ou 24/0 h | Timer |
| Oxigenação (aeroponia) | 24 h contínuo | [Bombinha de ar](/loja/#clonadora-6) |

## Achados

- **Material-mãe:** plantas sadias, livres de pragas; últimos ramos vegetativos são ideais.
- **Clonadora 6 estacas:** pote + buchas + [compressor de ar](/loja/#clonadora-6) — baixo custo, documentada em [manual 6 estacas](/equipamentos/clonadora-6-estacas.html).
- **Clonadora 12 estacas:** aspersão com [bomba submersa](/loja/#clonadora-12) — maior throughput.
- **Gel de enraizamento:** opcional; ácido indolilbutírico (AIB) estimula calo e raízes.
- Tempo típico: **7–14 dias** até raízes visíveis com ambiente estável.

## Equipamentos verificados (loja parceira)

- [Clonadora de 6 estacas — materiais](/loja/#clonadora-6)
- [Clonadora de 12 estacas — materiais](/loja/#clonadora-12)
- [Gel de enraizamento](/loja/#clonadora-6)

## Ferramentas do laboratório

- [Manual clonadora 6 estacas](/equipamentos/clonadora-6-estacas.html)
- [Manual clonadora 12 estacas](/equipamentos/clonadora-12-estacas.html)

## Vídeo explicativo

@youtube tdMl4X5h83Y

## Status

**Aprovado** — protocolos de clonagem reprodutíveis com materiais acessíveis e documentação de campo completa.`
  }),

  inspectionPost({
    title: 'Inspeção: Otimização do Cultivo Indoor (PPFD e ambiente)',
    excerpt: 'Verificação integrada de PPFD, DLI, VPD, ventilação e layout da tenda — síntese do ambiente indoor eficiente.',
    slug: 'inspecao-cultivo-indoor-ppfd',
    videoId: 'zwKXgqZMPro',
    date: '2026-06-27T17:13:59.000Z',
    seriesOrder: 7,
    body: `## Escopo

Inspeção **integrada do ambiente indoor**: densidade de fluxo de fótons fotossinteticamente ativos (PPFD), integral diária de luz (DLI), déficit de pressão de vapor (VPD), renovação de ar e disposição física da tenda.

## Hipóteses e método

- **H1:** PPFD no dossel entre 400–600 μmol/m²/s (floração) com fotoperíodo 12 h produz DLI ≈ 17–26 mol/m²/d — faixa produtiva para cannabis.
- **H2:** VPD estável (0,8–1,2 kPa veg.; 1,0–1,4 kPa floração) maximiza transpiração sem fechar estômatos.
- **H3:** Renovação de ar ≥1 volume/minuto reduz gradiente térmico e acúmulo de etileno.
- **Método:** Checklist do vídeo + cruzamento com [Inspeção: Ventilação da Tenda](/posts/post-inspecao-ventilacao-tenda.html).

## Medições de referência

| Grandeza | Vegetativo | Floração | Ferramenta |
|----------|-----------|----------|------------|
| PPFD (dossel) | 300–500 μmol/m²/s | 400–700 μmol/m²/s | Luxímetro/quantum (ou estimativa W/m²) |
| DLI | 18–24 mol/m²/d | 30–45 mol/m²/d | [Calculadora DLI](/calculadoras/dli.html) |
| VPD | 0,8–1,2 kPa | 1,0–1,4 kPa | [Calculadora VPD](/calculadoras/vpd.html) |
| T | 24–28 °C (luz) | 20–26 °C | Termo-higrômetro |
| Renovação ar | ~1,2 min⁻¹ | idem | Exaustor dimensionado |

## Achados

- **LED full spectrum:** posicionar a 30–45 cm do dossel; ajustar altura conforme [Watts/m²](/calculadoras/watts-m2.html).
- **Exaustor inline + filtro de carvão:** pressão negativa evita odor; ver relatório de ventilação do laboratório.
- **Ventilador de circulação interno:** previne microclimas e fortalece caules.
- **Automação:** [tomada inteligente](/loja/#cultivo-indoor) + timer segregam luz, exaustor e umidificador por fase.
- **Layout:** reservar espaço para acesso, espectro uniforme e manutenção do filtro.

## Equipamentos verificados (loja parceira)

- [Painel LED cultivo indoor](/loja/#cultivo-indoor)
- [Exaustor inline para tenda](/loja/#cultivo-indoor)
- [Ventilador de circulação](/loja/#cultivo-indoor)
- [Termo-higrômetro digital](/loja/#cultivo-indoor)
- [Timer e tomada inteligente](/loja/#cultivo-indoor)

## Ferramentas do laboratório

- [Calculadora Luxímetro](/calculadoras/luximetro.html)
- [Calculadora VPD](/calculadoras/vpd.html)
- [Calculadora Watts/m²](/calculadoras/watts-m2.html)
- [Inspeção: Ventilação](/posts/post-inspecao-ventilacao-tenda.html)

## Vídeo explicativo

@youtube zwKXgqZMPro

## Status

**Aprovado** — ambiente indoor dimensionado com métricas fotométricas e climáticas rastreáveis; série Guia de Cultivo Básico concluída.`
  })
];

const GUIA_I18N = {
  'inspecao-cultivo-inicio': {
    excerptEn: 'Field review of the four phenological phases and critical environmental variables at crop start.',
    excerptEs: 'Revisión de las cuatro fases fenológicas y variables ambientales críticas al inicio del cultivo.'
  },
  'inspecao-nutricao-cannabis': {
    excerptEn: 'Nutrient strategy inspection — EC/PPM, macro and micro elements in vegetative and flowering.',
    excerptEs: 'Inspección de nutrición — EC/PPM, macro y microelementos en vegetativo y floración.'
  },
  'inspecao-solo-vivo-organico': {
    excerptEn: 'Living soil audit — organic substrate, microbiology and sustainable buffering.',
    excerptEs: 'Auditoría de suelo vivo — sustrato orgánico, microbiología y tamponamiento.'
  },
  'inspecao-arquitetura-cannabis': {
    excerptEn: 'Plant architecture inspection — training, LST/SCROG and canopy management.',
    excerptEs: 'Inspección de arquitectura — entrenamiento, LST/SCROG y manejo del dosel.'
  },
  'inspecao-ciencia-floracao': {
    excerptEn: 'Flowering science review — photoperiod, hormones and harvest indicators.',
    excerptEs: 'Revisión de floración — fotoperiodo, hormonas e indicadores de cosecha.'
  },
  'inspecao-propagacao-clonagem': {
    excerptEn: 'Propagation inspection — cloning, rooting and aeroponic systems.',
    excerptEs: 'Inspección de propagación — clonaje, enraizamiento y sistemas aeropónicos.'
  },
  'inspecao-cultivo-indoor-ppfd': {
    excerptEn: 'Indoor PPFD audit — light intensity, DLI targets and measurement tools.',
    excerptEs: 'Auditoría PPFD indoor — intensidad lumínica, DLI objetivo e instrumentos.'
  }
};

GUIA_INSPECOES_POSTS.forEach(function (p) {
  const tr = GUIA_I18N[p.slug];
  if (tr) {
    if (!p.excerptEn) p.excerptEn = tr.excerptEn;
    if (!p.excerptEs) p.excerptEs = tr.excerptEs;
  }
});

module.exports = { GUIA_INSPECOES_POSTS };
