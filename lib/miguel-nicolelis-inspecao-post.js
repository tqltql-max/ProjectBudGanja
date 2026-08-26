'use strict';

/**
 * Homenagem · Neurociências Cap. 2 — Miguel Nicolelis.
 * Série: neurociencias — tipagem no hub via resolveInspecaoTipo() → 'neurociencia'.
 * Reaproveita o helper neurocienciaPost() já usado no Cap. 1 (endocanabinoidoma).
 */

const { neurocienciaPost } = require('./endocanabinoidoma-neurociencia-inspecao-post.js');

function buildMiguelNicolelisBodies() {
  const inspected = '2026-08-03';
  const hub = '/biblioteca/inspecoes/#inspecoes-neurociencias';
  const hubAll = '/biblioteca/inspecoes/';
  const endocanabinoidoma = '/posts/post-inspecao-neurociencia-endocanabinoidoma.html';
  const sidarta = '/posts/post-inspecao-sidarta-ribeiro.html';
  const carlini = '/posts/post-inspecao-elisaldo-carlini.html';
  const unifesp = '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html';
  const mantra = '/posts/post-inspecao-palavra-valeu.html';
  const wiki = 'https://pt.wikipedia.org/wiki/Miguel_Nicolelis';
  const portrait = '/imagens/inspecoes/miguel-nicolelis-portrait.jpg';
  const portraitCredit =
    'Miguel Nicolelis no programa Roda Viva (TV Cultura, 2008). Foto: [Everton Zanella Alvarenga](https://commons.wikimedia.org/wiki/File:Nicolelis.jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).';

  const body = `## Escopo

Homenagem documental do laboratório ao médico e neurocientista **Miguel Ângelo Laporta Nicolelis** (São Paulo, 27 de março de 1961) — um dos pioneiros mundiais das **interfaces cérebro-máquina (ICM)** e coordenador do **Projeto Andar de Novo**. Abre o **Cap. 2** da série **Neurociências**, na sequência do mapa de ofício do [endocanabinoidoma](${endocanabinoidoma}) (Cap. 1): se o Cap. 1 mapeia o sistema, este capítulo homenageia **um método e uma carreira** — como um cérebro brasileiro ajudou a reescrever o que se entende por "ler" e "devolver" sinal ao sistema nervoso.

> **Nota metodológica:** homenagem editorial e documental do Inspetor BudGanja, com base em fontes públicas (Wikipédia, Duke Neurobiology, Nicolelis Institute, imprensa científica). **Sem afiliação** com a Duke University, a AASDAP, o Instituto Santos Dumont, o IINN-ELS ou o Walk Again Project. Todo o mérito da obra científica pertence a Miguel Nicolelis, aos seus colaboradores e às instituições que a acolheram. **Ficha educativa — não é biografia acadêmica fechada, não substitui literatura científica revisada por pares e não é aconselhamento médico.**

![Miguel Nicolelis](${portrait})

*${portraitCredit}*

## 1. Objeto homenageado

| Campo | Valor |
|-------|-------|
| Nome | **Miguel Ângelo Laporta Nicolelis** |
| Nascimento | 27 de março de 1961, São Paulo (SP) |
| Formação | Medicina (USP, 1984) · Doutorado em Ciências / Fisiologia Geral (USP, 1989) · Pós-doutorado em Fisiologia e Biofísica (Hahnemann University, EUA) |
| Instituição-âncora | Duke University — Professor Titular de Neurobiologia (1994–2021) · Professor Emérito desde 2021 · cofundador do Center for Neuroengineering |
| Ofício | Registro simultâneo de populações de neurônios · interfaces cérebro-máquina (ICM) · neuropróteses |
| Projeto-símbolo | **Projeto Andar de Novo** (Walk Again Project) — exoesqueleto controlado por sinais cerebrais |
| Instituições no Brasil | AASDAP · Instituto Santos Dumont · Instituto Internacional de Neurociências de Natal (IINN-ELS) |
| Série | Neurociências · Cap. 2 |
| Elo Cap. 1 | [Endocanabinoidoma — mapa de ofício](${endocanabinoidoma}) |
| Data da homenagem | ${inspected} |

**O que é homenageado:** não uma pessoa perfeita nem um projeto sem tropeços — mas um **método**: registrar centenas de neurônios ao mesmo tempo, decodificar sinal em tempo real e devolver informação ao cérebro. Esse método mudou o que se considerava possível em neurociência translacional.

## 2. Por que o laboratório homenageia Nicolelis

| Motivo | Leitura de ofício |
|--------|--------------------|
| **Pioneirismo verificável** | Entre 1999 e 2003, o grupo de Nicolelis (com John Chapin, depois com Jose Carmena) publicou os primeiros registros de macacos controlando braços robóticos por sinal cortical — base técnica de toda a ICM moderna. |
| **Ambição translacional** | O Projeto Andar de Novo (2009–2014) tentou levar isso da bancada ao paciente: exoesqueleto + protocolo de reabilitação para pessoas com paraplegia. |
| **Visibilidade simbólica** | Em 12 de junho de 2014, um voluntário paraplégico dá o pontapé inicial da Copa do Mundo com o exoesqueleto — o momento que apresentou ICM ao mundo. |
| **Orgulho de ofício brasileiro** | Formado e doutorado na USP antes de consolidar carreira em Duke — uma trajetória que este laboratório, editado em português, tem prazer em nomear. |
| **Elo científico direto** | Coautor com [Sidarta Ribeiro](${sidarta}) de estudos e revisões sobre registro multieletrodo (2002, 2006) — outra ponte natural da série Neurociências. |

## 3. Hipóteses e método

- **H1:** a contribuição mais duradoura de Nicolelis não é um único experimento, mas a **mudança de unidade de análise** — do neurônio isolado para populações de neurônios registradas simultaneamente.
- **H2:** o Projeto Andar de Novo é, ao mesmo tempo, o maior êxito de visibilidade e o episódio mais discutido da carreira — o gesto de 2014 foi real, mas breve e amplificado pela mídia além do que os dados publicados sustentavam no momento.
- **H3:** o valor educativo, para quem lê este laboratório, está em separar o **método** (registro de populações, decodificação, neuroplasticidade) do **espetáculo midiático** — sem negar nenhum dos dois.
- **Método:** (1) síntese biográfica pública; (2) linha do tempo de marcos científicos verificáveis; (3) achados e mérito; (4) limites honestos, incluindo controvérsias administrativas; (5) elos com a série Neurociências e o Legado do laboratório.

## 4. Cronologia (síntese verificável)

| Período | Marco |
|---------|-------|
| 1961 | Nasce em São Paulo; formação no Colégio Bandeirantes. |
| 1984 | Forma-se em Medicina pela USP. |
| 1989 | Doutorado em Ciências (Fisiologia Geral), USP — base técnica em registro multi-neuronal. |
| 1989–1994 | Pós-doutorado na Hahnemann University (Filadélfia), com John Chapin — primeiros registros simultâneos de populações de neurônios. |
| 1994–2021 | Professor Titular de Neurobiologia e Engenharia Biomédica na Duke University; cofundador do Center for Neuroengineering. |
| 1999–2000 | Primeiros estudos com Chapin e depois publicação na *Nature* (2000): macacos controlam braço robótico via atividade cortical. |
| 2003 | *PLoS Biology* (Carmena et al.): macacos aprendem a controlar ICM por tentativa e erro — plasticidade sensório-motora induzida por neuroprótese. |
| 2004 | Funda o Instituto Internacional de Neurociências de Natal (IINN-ELS), no Rio Grande do Norte, com apoio da Edmond and Lily Safra Foundation. |
| 2009–2014 | Coordena o **Projeto Andar de Novo** — consórcio internacional com mais de 150 pesquisadores. |
| 12 jun. 2014 | Voluntário paraplégico dá o pontapé inicial da Copa do Mundo FIFA com exoesqueleto controlado por sinais cerebrais. |
| 2014–2016 | TCU audita aspectos **administrativos** (não científicos) do Campus do Cérebro do IINN-ELS; Nicolelis deixa a direção institucional em Natal. |
| 2016 | *Scientific Reports*: pacientes paraplégicos em treino prolongado com o protocolo do Walk Again apresentam recuperação neurológica parcial. |
| 2013–2019 | Linha de pesquisa dos "brainets" — redes de cérebros interligados (ratos, depois primatas). |
| 2020 | Publica *The True Creator of Everything* (Yale University Press). |
| 2021 | Torna-se Professor Emérito da Duke University. |
| 2024 | Anuncia o Nicolelis Institute for Advanced Brain Studies, com polo em Milão. |

## 5. Achados (mérito devido)

1. **Mudança de paradigma técnico** — antes de Nicolelis e colaboradores, a neurofisiologia dependia largamente do registro de neurônios isolados; o registro simultâneo de dezenas a centenas de neurônios abriu caminho para toda a neuroengenharia de ICM que veio depois.
2. **Prova de conceito translacional** — o salto de "macaco move braço robótico" (2000–2003) para "paciente treina com exoesqueleto" (2014) percorreu, em uma carreira, o caminho que normalmente separa ciência básica de tecnologia assistiva.
3. **Visibilidade global para a neurociência brasileira** — o pontapé de 2014 é, até hoje, um dos momentos de maior audiência já dados a um experimento de neurociência.
4. **Investimento em ciência fora do eixo tradicional** — a criação do IINN-ELS em Natal, com programa educacional para crianças de baixa renda, tentou (com resultados mistos, ver Limites) descentralizar pesquisa de ponta no Brasil.
5. **Formação de rede** — colaborações e coautorias com [Sidarta Ribeiro](${sidarta}) situam Nicolelis dentro da mesma geração de neurocientistas brasileiros que o laboratório já reconhece.

## 6. Limites (para não virar hagiografia)

- **O gesto de 2014 foi real, mas parcial:** a transmissão ao vivo mostrou poucos segundos de um movimento simples; a extensão exata da recuperação sensório-motora só foi detalhada em publicações científicas posteriores (2016).
- **Controvérsia administrativa, não científica:** entre 2014 e 2016, o TCU apontou fragilidades de **gestão** (obras, contratos, cronograma) no Campus do Cérebro em Macaíba — as auditorias não avaliaram o mérito das pesquisas.
- **Divergências institucionais no Brasil:** a saída de pesquisadores e a reorganização do IINN-ELS ao longo da década de 2010 mostram que ciência de fronteira, mesmo bem-sucedida no laboratório, enfrenta atrito real de gestão e financiamento.
- **Não é literatura clínica:** esta ficha não substitui os artigos revisados por pares nem orienta tratamento — para reabilitação motora real, a referência são os protocolos publicados e a equipe médica responsável.
- **Ideias teóricas em debate:** propostas mais recentes (ex.: rejeição da metáfora "cérebro-computador", teoria do "cérebro relativístico") são posições autorais discutidas na comunidade científica, não consenso fechado.

## 7. Rede BudGanja (elos vivos)

| Ficha | Relação |
|-------|---------|
| [Endocanabinoidoma — Neurociências Cap. 1](${endocanabinoidoma}) | Mapa de sistema que abre a série; este capítulo homenageia um método, não um sistema molecular |
| [Sidarta Ribeiro](${sidarta}) | Coautor de Nicolelis em estudos sobre registro multieletrodo (2002, 2006); geração da neurociência pública brasileira |
| [Elisaldo Carlini](${carlini}) | Outro pilar da neurociência/psicofarmacologia brasileira já fichado pelo laboratório |
| [Curso UNIFESP](${unifesp}) | Formação de extensão em cannabis medicinal — contexto onde este laboratório nasce |
| [Valeu !!!](${mantra}) | Mantra do laboratório aplicado à ciência de ofício |

## 8. Valeu !!!

| Camada | Ligação |
|--------|---------|
| Mantra | [Valeu !!!](${mantra}) — o melhor possível **ao registrar sinal, treinar paciente e admitir o que ainda não funciona**, hoje |
| Anti-armadilha | «exoesqueleto cura paralisia» = hype · «exoesqueleto é ferramenta de pesquisa em reabilitação, com resultados parciais e reais» = ofício |
| Par vivo | [Sidarta](${sidarta}) · [Endocanabinoidoma](${endocanabinoidoma}) · [UNIFESP](${unifesp}) |

**Veredicto:** Nicolelis fez o melhor **também ao arriscar** — publicar cedo, demonstrar em praça pública, fundar instituto em região historicamente afastada da ciência de ponta. Nem tudo deu certo; o método e a ambição merecem registro.

## Hipóteses (síntese)

**H1:** mérito central = mudança de unidade de análise (populações de neurônios) em neurociência.
**H2:** Projeto Andar de Novo = maior êxito simbólico e episódio mais escrutinado, ambos reais.
**H3:** elo natural com a série = [Endocanabinoidoma](${endocanabinoidoma}) (Cap. 1) e [Sidarta Ribeiro](${sidarta}).
**H4:** fecho = [Valeu !!!](${mantra}).

## Status

**Aprovado com mérito** — Neurociências Cap. 2: Miguel Nicolelis fichado como homenagem documental, com método reconhecido e limites declarados.

[▶ Neurociências](${hub}) · [▶ Endocanabinoidoma (Cap. 1)](${endocanabinoidoma}) · [▶ Sidarta Ribeiro](${sidarta}) · [▶ Todas](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEn = `## Scope

A documentary homage from the lab to physician and neuroscientist **Miguel Ângelo Laporta Nicolelis** (São Paulo, 27 March 1961) — one of the world's pioneers of **brain-machine interfaces (BMI)** and coordinator of the **Walk Again Project**. Opens **Cap. 2** of the **Neuroscience** series, following the [endocannabinoidome](${endocanabinoidoma}) craft map (Cap. 1): if Cap. 1 maps a system, this chapter honors **a method and a career** — how a Brazilian brain helped rewrite what it means to "read" and "write back" signal to the nervous system.

> **Method note:** editorial and documentary homage by Inspector BudGanja, based on public sources (Wikipedia, Duke Neurobiology, Nicolelis Institute, science press). **No affiliation** with Duke University, AASDAP, Instituto Santos Dumont, IINN-ELS, or the Walk Again Project. All credit for the scientific work belongs to Miguel Nicolelis, his collaborators, and the institutions that hosted it. **Educational sheet — not a closed academic biography, does not replace peer-reviewed literature, and is not medical advice.**

![Miguel Nicolelis](${portrait})

*Miguel Nicolelis on Roda Viva (TV Cultura, 2008). Photo: [Everton Zanella Alvarenga](https://commons.wikimedia.org/wiki/File:Nicolelis.jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*

## 1. Subject honored

| Field | Value |
|-------|-------|
| Name | **Miguel Ângelo Laporta Nicolelis** |
| Born | 27 March 1961, São Paulo (SP) |
| Education | Medicine (USP, 1984) · PhD, General Physiology (USP, 1989) · Postdoc, Physiology and Biophysics (Hahnemann University, USA) |
| Anchor institution | Duke University — Professor of Neurobiology (1994–2021) · Professor Emeritus since 2021 · co-founder, Center for Neuroengineering |
| Craft | Simultaneous multi-neuron population recording · brain-machine interfaces (BMI) · neuroprosthetics |
| Symbol project | **Walk Again Project** — brain-controlled exoskeleton |
| Brazilian institutions | AASDAP · Instituto Santos Dumont · International Institute of Neuroscience of Natal (IINN-ELS) |
| Series | Neuroscience · Cap. 2 |
| Cap. 1 link | [Endocannabinoidome — craft map](${endocanabinoidoma}) |
| Homage date | ${inspected} |

## 2. Why the lab honors Nicolelis

Verifiable pioneering work (1999–2003) on population-level neural recording and BMI control; translational ambition with the Walk Again Project (2009–2014); global symbolic visibility (2014 World Cup kickoff); Brazilian scientific pride — trained at USP before a career at Duke; and a direct scientific link to [Sidarta Ribeiro](${sidarta}) as a co-author on multielectrode-recording papers (2002, 2006).

## 3. Limits (so this stays a homage, not hagiography)

The 2014 kickoff was real but brief on live TV, with fuller results published later (2016). Between 2014–2016 Brazil's federal audit court (TCU) flagged **administrative**, not scientific, weaknesses in the Campus do Cérebro construction project. Institutional turnover at IINN-ELS through the 2010s shows frontier science still faces real management friction. This sheet is not clinical literature and does not replace peer-reviewed sources or medical guidance. Recent theoretical claims (e.g. rejecting the "brain-as-computer" metaphor) are the author's positions, still debated.

## Status

**Approved with merit** — Neuroscience Cap. 2: Miguel Nicolelis recorded as a documentary homage, method acknowledged, limits stated.

[▶ Neuroscience](${hub}) · [▶ Endocannabinoidome (Cap. 1)](${endocanabinoidoma}) · [▶ Sidarta Ribeiro](${sidarta}) · [▶ All](${hubAll}) · [▶ Valeu !!!](${mantra})
`;

  const contentEs = `## Alcance

Homenaje documental del laboratorio al médico y neurocientífico **Miguel Ângelo Laporta Nicolelis** (São Paulo, 27 de marzo de 1961) — uno de los pioneros mundiales de las **interfaces cerebro-máquina (ICM)** y coordinador del **Proyecto Andar de Novo**. Abre el **Cap. 2** de la serie **Neurociencias**, tras el mapa de oficio del [endocannabinoidoma](${endocanabinoidoma}) (Cap. 1): si el Cap. 1 mapea un sistema, este capítulo homenajea **un método y una carrera**.

> **Nota metodológica:** homenaje editorial y documental del Inspector BudGanja, basado en fuentes públicas (Wikipedia, Duke Neurobiology, Nicolelis Institute, prensa científica). **Sin afiliación** con Duke University, AASDAP, Instituto Santos Dumont, IINN-ELS o el Walk Again Project. Todo el mérito de la obra científica pertenece a Miguel Nicolelis, sus colaboradores y las instituciones que la acogieron. **Ficha educativa — no es biografía académica cerrada, no sustituye literatura revisada por pares ni es consejo médico.**

![Miguel Nicolelis](${portrait})

*Miguel Nicolelis en Roda Viva (TV Cultura, 2008). Foto: [Everton Zanella Alvarenga](https://commons.wikimedia.org/wiki/File:Nicolelis.jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*

## 1. Objeto homenajeado

| Campo | Valor |
|-------|-------|
| Nombre | **Miguel Ângelo Laporta Nicolelis** |
| Nacimiento | 27 de marzo de 1961, São Paulo (SP) |
| Formación | Medicina (USP, 1984) · Doctorado en Fisiología General (USP, 1989) · Posdoctorado en Fisiología y Biofísica (Hahnemann University, EE. UU.) |
| Institución ancla | Duke University — Profesor Titular de Neurobiología (1994–2021) · Profesor Emérito desde 2021 |
| Oficio | Registro simultáneo de poblaciones de neuronas · interfaces cerebro-máquina (ICM) · neuroprótesis |
| Proyecto símbolo | **Proyecto Andar de Novo** — exoesqueleto controlado por señales cerebrales |
| Serie | Neurociencias · Cap. 2 |
| Enlace Cap. 1 | [Endocannabinoidoma — mapa de oficio](${endocanabinoidoma}) |
| Fecha del homenaje | ${inspected} |

## 2. Por qué el laboratorio homenajea a Nicolelis

Pionerismo verificable (1999–2003) en registro poblacional y control por ICM; ambición traslacional con el Proyecto Andar de Novo (2009–2014); visibilidad simbólica global (Copa del Mundo 2014); orgullo científico brasileño — formado en la USP antes de su carrera en Duke; y vínculo científico directo con [Sidarta Ribeiro](${sidarta}), coautor en estudios sobre registro multielectrodo (2002, 2006).

## 3. Límites (para que sea homenaje, no hagiografía)

El gesto de 2014 fue real pero breve en la transmisión en vivo; los resultados completos se publicaron después (2016). Entre 2014 y 2016 el TCU señaló fragilidades **administrativas**, no científicas, en las obras del Campus do Cérebro. La reorganización institucional del IINN-ELS en la década de 2010 muestra que la ciencia de frontera enfrenta fricciones reales de gestión. Esta ficha no es literatura clínica ni sustituye fuentes revisadas por pares ni orientación médica. Ideas teóricas recientes (p. ej., el rechazo a la metáfora "cerebro-computadora") son posiciones del autor, aún en debate.

## Estado

**Aprobado con mérito** — Neurociencias Cap. 2: Miguel Nicolelis fichado como homenaje documental, método reconocido, límites declarados.

[▶ Neurociencias](${hub}) · [▶ Endocannabinoidoma (Cap. 1)](${endocanabinoidoma}) · [▶ Sidarta Ribeiro](${sidarta}) · [▶ Todas](${hubAll}) · [▶ ¡Valeu !!!](${mantra})
`;

  return { body, contentEn, contentEs, wiki, portrait };
}

function buildMiguelNicolelisNeurocienciaPost(seriesOrder) {
  const { body, contentEn, contentEs, wiki } = buildMiguelNicolelisBodies();
  const order = Number.isFinite(seriesOrder) ? seriesOrder : 2;
  return neurocienciaPost({
    title: 'Homenagem: Miguel Nicolelis — pioneiro das interfaces cérebro-máquina',
    titleEn: 'Homage: Miguel Nicolelis — brain-machine interface pioneer',
    titleEs: 'Homenaje: Miguel Nicolelis — pionero de las interfaces cerebro-máquina',
    excerpt:
      'Neurociências Cap. 2: homenagem documental a Miguel Nicolelis — interfaces cérebro-máquina, Projeto Andar de Novo e o pontapé da Copa 2014. Mérito e limites, sem hagiografia.',
    excerptEn:
      'Neuroscience Cap. 2: a documentary homage to Miguel Nicolelis — brain-machine interfaces, the Walk Again Project and the 2014 World Cup kickoff. Merit and limits, no hagiography.',
    excerptEs:
      'Neurociencias Cap. 2: homenaje documental a Miguel Nicolelis — interfaces cerebro-máquina, Proyecto Andar de Novo y el saque inicial del Mundial 2014. Mérito y límites, sin hagiografía.',
    slug: 'inspecao-neurociencia-miguel-nicolelis',
    date: '2026-08-03T22:00:00.000Z',
    seriesOrder: order,
    seriesLabel: 'Nicolelis · homenagem',
    coverImage: '/imagens/inspecoes/miguel-nicolelis-neurociencia-cover.jpg',
    sourceUrl: wiki,
    body,
    contentEn,
    contentEs
  });
}

module.exports = {
  buildMiguelNicolelisNeurocienciaPost,
  buildMiguelNicolelisBodies
};
