'use strict';

/**
 * Pesquisa-laboratório: catálogo de fitocanabinoides (literacia química e de ofício).
 * Não é bula, laudo HPLC nem protocolo de extração/cultivo.
 */

const SLUG = 'pesquisa-fitocanabinoides';
const DATE = '2026-08-19T12:00:00.000Z';
const COVER = 'imagens/pesquisas/fitocanabinoides-cover.jpg';
const HREF = '/posts/post-pesquisa-fitocanabinoides.html';

const L = {
  hub: '/biblioteca/pesquisas/',
  planta: '/plantas/cannabis-sativa/',
  plantaPost: '/posts/post-inspecao-planta-cannabis-sativa.html',
  palavra: '/posts/post-inspecao-palavra-cannabis.html',
  quimio: '/posts/post-inspecao-guia-quimiotipos-cannabis.html',
  ecs: '/posts/post-inspecao-neurociencia-endocanabinoidoma.html',
  meditacao: '/posts/post-inspecao-guia-meditacao-endocanabinoidoma.html',
  xiv: '/biblioteca/unifesp/livro-xiv.html#aula-10',
  curso: '/posts/post-inspecao-curso-unifesp-cannabis-medicinal.html',
  canabinall: '/posts/post-inspecao-canal-canabinall.html',
  albaugh: '/posts/post-inspecao-artigo-albaugh-cannabis-neurodesenvolvimento.html',
  gobbi: '/posts/post-inspecao-artigo-gobbi-cannabis-adolescencia-humor.html',
  diforti: '/posts/post-inspecao-artigo-diforti-eugei-psicose-2019.html',
  devinsky: '/posts/post-inspecao-artigo-devinsky-cbd-dravet-2017.html',
  carlini: '/posts/post-inspecao-elisaldo-carlini.html',
  medicos: '/posts/post-inspecao-guia-cannabis-medicos.html',
  farm: '/posts/post-inspecao-guia-cannabis-farmaceuticos.html',
  droga: '/posts/post-inspecao-palavra-droga.html',
  guia: '/guia/palavras.html?grupo=tecnico',
  molecula: '/posts/post-pesquisa-molecula-ao-lixo.html'
};

function buildPesquisaFitocanabinoidesPost() {
  const body = `## Escopo

Pesquisa-mapa do laboratório BudGanja: **catálogo de ofício dos fitocanabinoides** — moléculas de planta (sobretudo *Cannabis sativa* L.) que se ligam, modulam ou cruzam a mesma rede que o [endocanabinoidoma](${L.ecs}).

Não substitui a [planta](${L.plantaPost}), o [guia de quimiotipos](${L.quimio}) nem a [Aula 10 do XIV UNIFESP](${L.xiv}). Aqui o objecto é a **família química**: ácidos na planta viva, neutros após calor/tempo, série pentil vs propil, e o que o laboratório **pode nomear** sem virar bula.

> **Nota metodológica:** auditoria editorial independente. **Não é aconselhamento médico, laudo analítico, protocolo de extração, dose nem cultivo.** Indexar literatura ≠ endossar produto, associação ou cultivar. Confirmar sempre fontes primárias e a bula/profissional responsável. Sem afiliação com indústria, ANVISA ou UNIFESP.

## Pergunta-guia

O que é um **fitocanabinoide**, como a planta os organiza a partir da **CBGA**, e como ler THC, CBD, CBG e os menores **sem** reduzir a cannabis a um isolado?

## Estado

**Relatório de catálogo · pesquisa em andamento** (\`pesquisa-laboratorio\`). Degrau 1: três famílias · biossíntese de ofício · tabela-mãe · ácidos/neutros · receptores · quimiotipos · limites clínicos e legais. Degraus futuros: um composto aprofundado de cada vez, com papers âncora.

## Metadados

| Campo | Valor |
|-------|-------|
| Tipo | Pesquisa documental / catálogo químico de ofício |
| Série | Laboratório |
| Unidade | Inspetor BudGanja (editorial) |
| Âncoras | [Cannabis sativa](${L.planta}) · [Quimiotipos](${L.quimio}) · [Endocanabinoidoma](${L.ecs}) · [XIV Aula 10](${L.xiv}) |
| Hub | [Pesquisas](${L.hub}) |
| Data | 2026-08-19 |

## Hipóteses (fracas)

- **H1:** Fitocanabinoide ≠ endocanabinoide ≠ sintético — três origens, uma rede de leitura.
- **H2:** Na planta fresca predominam **ácidos** (THCA, CBDA, CBGA…); os neutros (THC, CBD, CBG) aparecem sobretudo com **calor, luz e tempo**.
- **H3:** A **CBGA** é o nó-mãe da via clássica; THCA / CBDA / CBCA são ramificações enzimáticas, não «três drogas soltas».
- **H4:** Quimiotipo (1–5) descreve **teor relativo**, não taxonomia popular sativa/índica ([guia](${L.quimio})).
- **H5:** Isolado ≠ planta inteira. A tese do efeito comitiva é **hipótese de leitura**, não milagre comprovado para cada indicação.
- **H6:** Literacia química **não** autoriza extração caseira nem uso clínico sem profissional.

## 1. Três famílias (não misturar)

| Família | Onde nasce | Exemplo | Leitura BudGanja |
|---------|------------|---------|------------------|
| **Fitocanabinoides** | Planta (tricomas de cannabis; raros noutros géneros) | THCA, CBD, CBG | Esta pesquisa |
| **Endocanabinoides** | Corpo humano/animal | Anandamida, 2-AG | [Endocanabinoidoma](${L.ecs}) · [meditação × eCBome](${L.meditacao}) |
| **Canabinoides sintéticos** | Laboratório humano | Fármacos registados **ou** agonistas ilícitos tipo «spice» | Distinção de ofício — **sem receita de síntese** |

Fitocanabinoide = **canabinoide de planta**. A palavra não significa «natural = inofensivo». THC vegetal activa CB1; o dano no [neurodesenvolvimento](${L.albaugh}) não desaparece por ser «da planta».

Canabinoides sintéticos de farmácia (ex. nabilona, dronabinol em outros países) **não** são a mesma classe de risco que agonistas CB1 clandestinos de elevada potência. O laboratório **nomeia a diferença**; não ensina a fabricar nenhuma das duas.

## 2. Onde estão na planta

Nas **flores femininas**, os **tricomas glandulares** acumulam resina: fitocanabinoides + terpenos ([guia quimiotipos](${L.quimio})). Folhas, caule e sementes têm teores típicos muito mais baixos. O [catálogo da planta](${L.plantaPost}) trata o organismo; esta ficha trata as **moléculas**.

Literatura de fitoquímica descreve **mais de uma centena** de fitocanabinoides em cannabis. A maior parte é vestigial. O ofício do laboratório é ler os **eixos** (mãe CBGA, ramificações, série varin, oxidação) — não memorizar 120 siglas.

## 3. Biossíntese de ofício (sem protocolo)

Mapa de livro, não de bancada:

1. Cadeia de policetídeo + malonil → **ácido olivetólico** (esqueleto C5 / pentil).  
2. Ácido olivetólico + geranil-difosfato → **CBGA** (canabigerólico) — o **nó-mãe**.  
3. Enzimas da planta ramificam a CBGA:  
   - **THCAS** → THCA  
   - **CBDAS** → CBDA  
   - **CBCAS** → CBCA  
4. Se o arranque usa **ácido divarinólico** (C3 / propil) em vez de olivetólico, nasce a série **varin**: CBGVA → THCVA, CBDVA, CBCVA.  
5. **Descarboxilação** (calor, luz, tempo): o «A» sai — THCA→Δ9-THC, CBDA→CBD, CBGA→CBG.  
6. **Envelhecimento / oxidação:** Δ9-THC → **CBN** (e outros produtos). Luz sobre CBC pode ir a **CBL**.

O laboratório **não** publica solventes, temperaturas de extração, rendimentos nem «como decarboxilar em casa». Quem precisa de laudo usa laboratório acreditado; quem precisa de terapêutica usa profissional e produto regularizado.

## 4. Ácidos e neutros

| Forma na planta viva | Neutro (após calor/tempo) | Nota de ofício |
|----------------------|---------------------------|----------------|
| CBGA | CBG | Precursor; quimiotipo 4 quando CBG/CBGA mandam |
| THCA | Δ9-THC | THCA em si tem perfil distinto do THC; o «alto» clássico é do neutro |
| CBDA | CBD | Ácido estudado à parte; não é «CBD cru» no sentido de marketing |
| CBCA | CBC | Menor; via cromeno |
| CBGVA | CBGV | Série propil |
| THCVA | THCV | Varin |
| CBDVA | CBDV | Varin |

Ler um rótulo «THC 20%» sem saber se o laudo é **total** (ácidos convertidos por cálculo) ou só neutro é erro de literacia. Farmacêuticos: [guia](${L.farm}).

## 5. Catálogo — eixos principais

### 5.1 CBGA / CBG — a mãe e o «não psicoativo» relativo

**Canabigerol.** Na planta, a maior parte da via passa pela **CBGA**. Cultivares de [quimiotipo 4](${L.quimio}) acumulam CBG porque a ramificação para THCA/CBDA está reduzida. CBG liga-se de forma fraca a CB1/CB2; a literatura explora TRP, PPAR e α2-adrenérgico. **Não** é «THC sem efeito» nem milagre anti-ansiedade — é **nó biossintético** e menor clínico ainda em construção.

### 5.2 THCA / Δ9-THC — o eixo psicoativo clássico

**Δ9-tetrahidrocanabinol.** Agonista parcial CB1/CB2. Responsável pelo efeito psicoativo típico, taquicardia, alteração de memória de curto prazo, e — em pessoas vulneráveis — risco de **psicose** e pior trajectória se o uso é precoce e pesado. [Albaugh](${L.albaugh}) (córtex adolescente), [Gobbi](${L.gobbi}) (humor) e [Di Forti / EU-GEI](${L.diforti}) (primeiro episódio × potência/frequência): **associação ≠ receita**, mas o laboratório não esconde o sinal.

THCA (ácido) na flor fresca **não** é o mesmo fármaco que o Δ9-THC. Descarboxilação (fumar, vaporizar, cozinhar) converte. Δ8-THC é **minoritário** na planta fresca; produtos «Delta-8» de mercado muitas vezes vêm de **conversão química de CBD** — zona cinzenta regulatória, fora do catálogo da planta viva.

### 5.3 CBDA / CBD — o eixo não euforizante mais estudado

**Canabidiol.** Baixa afinidade directa CB1/CB2; modula a rede (alosteria negativa em CB1, 5-HT1A, TRPV1, enzimas do eCBome). Evidência mais sólida em **epilepsias raras** — ver o RCT [Devinsky 2017](${L.devinsky}) (isolado oral, Dravet, adjuvante; **≠ óleo de loja**). No Brasil o acesso passa por regras da ANVISA e prescrição. Isolado ≠ full spectrum: a [Aula 10](${L.xiv}) e Eliana no XIV insistem na curva em U e no risco de **subir a dose do isolado** a pensar que «é só CBD».

CBD **não** anula automaticamente o THC; pode alterar o efeito, não é antídoto de festa.

### 5.4 CBCA / CBC — cromeno

**Canabicromeno.** Menor. Literatura pré-clínica (TRPA1, inflamação). Poucos ensaios robustos em humanos. No mapa XIV aparece nas actividades da aula — **ponto no mapa**, não indicação.

### 5.5 CBN — o tempo no frasco

**Canabinol.** Produto de oxidação do THC. Afinidade CB1 mais fraca. Marketing de «CBN para dormir» corre **à frente** da evidência. Ofício: CBN no laudo também pode significar **material envelhecido** ou mal armazenado — literacia de cadeia, não só de sono.

### 5.6 Série varin (C3) — THCV, CBDV, CBGV

Cadeia lateral **propil** (três carbonos) em vez de pentil (cinco).

| Sigla | Nome | Leitura prudente |
|-------|------|------------------|
| **THCV** | Tetrahidrocanabivarina | Em doses baixas a literatura descreve perfil distinto do THC (incluindo antagonismo CB1); **não** é «dieta em gotas» |
| **CBDV** | Canabidivarina | Investigada em epilepsia/neuro; não substituir fármaco prescrito |
| **CBGV / CBCV** | Varins de CBG/CBC | Vestigiais na maior parte dos laudos |

Quimiotipos africanos/asiáticos clássicos (ex. algumas landraces) são citados na literatura por THCV — **etnografia química**, não ranking de «strain».

### 5.7 Outros menores (para não fingir que o catálogo acaba em três)

| Sigla | Nome curto | Nota |
|-------|------------|------|
| **CBL** | Canabiciclol | Fotoconversão a partir de CBC |
| **CBE** | Canabielsoína | Relacionado com oxidação do CBD |
| **CBT** | Canabitriol | Menor, várias isómeros |
| **Δ8-THC** | Delta-8 | Vestigial na planta; produtos comerciais ≠ flor |
| **THC-O / HHC / etc.** | Semi-sintéticos de mercado | **Fora** do catálogo fitocanabinoide clássico; risco regulatório e analítico alto |

O laboratório **recusa** tratar semi-sintéticos de e-commerce como «da planta». São outra família — mais perto da coluna «sintético» da tabela 1.

## 6. Receptores — mapa, não dose

| Alvo | Leitura de ofício |
|------|-------------------|
| **CB1** | Abundante no SNC; eixo do efeito psicoativo do THC; também fome, memória, dor |
| **CB2** | Mais periférico/imune na narrativa clássica — simplificação útil, não mapa completo |
| **TRPV1 / TRPA1** | Canais de «pimenta/frio» — CBD, CBC, CBG cruzam aqui na literatura |
| **5-HT1A** | Serotonina — hipótese recorrente para CBD e ansiedade; evidência **mista** |
| **PPAR** | Nucleares — metabolismo/inflamação em modelos |
| **GPR55 e outros** | Fronteira — não usar como slogan de produto |

O [endocanabinoidoma](${L.ecs}) é a rede **endógena**. Fitocanabinoides são **moduladores exógenos** dessa rede — por isso a [meditação e o estilo de vida](${L.meditacao}) aparecem no XIV como camada **sem molécula da planta**. As duas camadas não se anulam nem se substituem.

## 7. Quimiotipos (não sativa/índica)

Síntese já inspeccionada no [guia de quimiotipos](${L.quimio}) (Aula 10, Prof. Diogo):

| Tipo | Predominância |
|------|----------------|
| **1** | Δ9-THC |
| **2** | THC ≈ CBD |
| **3** | CBD, THC baixo |
| **4** | CBG |
| **5** | Quase sem fitocanabinoides (eixo fibras / cânhamo industrial) |

Terpenos (mirceno, limoneno, β-cariofileno, pineno, linalol…) **partilham vias** e o cheiro; β-cariofileno ainda liga CB2. São **comitiva**, não substituto do laudo de canabinoides.

## 8. Clínica, lei e o que esta pesquisa não é

- **Clínica:** [guia médicos](${L.medicos}) · [farmacêuticos](${L.farm}) · [Carlini](${L.carlini}) · [curso UNIFESP](${L.curso}) · [CANABinALL](${L.canabinall}). Esta ficha **não** indica doença, dose, via nem substituição de fármaco.  
- **Desenvolvimento:** uso na adolescência e gravidez = zona de **cautela forte** ([Albaugh](${L.albaugh})).  
- **Direcção / máquinas:** THC prejudica tempo de reacção — literacia de dano, não moralismo.  
- **Brasil:** acesso a produtos de cannabis envolve prescrição, regras da ANVISA e, para cultivo, via judicial/Defensoria — **confirmar o direito vigente**; o laboratório não é escritório.  
- **Cadeia industrial:** quando a molécula vira commodity, entra no mapa [molécula → lixo](${L.molecula}).

## 9. Rede BudGanja

| Camada | Fichas |
|--------|--------|
| Planta / palavra | [Cannabis sativa](${L.plantaPost}) · [hub planta](${L.planta}) · [palavra cannabis](${L.palavra}) |
| Composição | [Quimiotipos](${L.quimio}) · [XIV Aula 10](${L.xiv}) |
| Corpo / cérebro | [Endocanabinoidoma](${L.ecs}) · [Meditação × eCBome](${L.meditacao}) · [Albaugh](${L.albaugh}) · [Gobbi](${L.gobbi}) · [Di Forti](${L.diforti}) · [Devinsky CBD](${L.devinsky}) |
| Formação | [Curso UNIFESP](${L.curso}) · [CANABinALL](${L.canabinall}) · [Carlini](${L.carlini}) |
| Ofício clínico | [Médicos](${L.medicos}) · [Farmacêuticos](${L.farm}) |
| Léxico | [Guia técnico](${L.guia}) · [droga](${L.droga}) |
| Pesquisa irmã | [Da molécula ao lixo](${L.molecula}) |

## 10. O que esta pesquisa **não** afirma

- Que «completo» = todos os >100 traços com paper próprio neste degrau.  
- Que CBD cura ansiedade, cancro ou insónia por ser tendência.  
- Que CBN é hipnótico comprovado.  
- Que THCV emagrece.  
- Que full spectrum é sempre superior ao isolado em qualquer doença.  
- Receita de extração, decarboxilação caseira, cultivo ou síntese.  
- Equivalência entre flor, óleo de associação, fármaco registado e semi-sintético de internet.

## Próximos degraus

1. **THC / THCA** — ficha profunda (receptores, janelas de risco, laudo total vs neutro).  
2. **CBD / CBDA** — evidência por indicação, isolado vs comitiva, interacções.  
3. **CBG** — quimiotipo 4 e o que a literatura ainda não segura.  
4. **Varins** — THCV/CBDV com papers âncora, sem marketing.  
5. **Terpenos cruzados** — tabela de ofício ligada a esta (não duplicar o guia).

## Status

**Publicado — catálogo de ofício (degrau 1).** Aprovado para o hub [Pesquisas](${L.hub}) como mapa-mãe da linha fitocanabinoide. Actualizações incrementais por composto.

[▶ Quimiotipos](${L.quimio}) · [▶ Endocanabinoidoma](${L.ecs}) · [▶ Planta](${L.plantaPost}) · [▶ Pesquisas](${L.hub}) · [▶ XIV Aula 10](${L.xiv})
`;

  const contentEn = `## Scope

BudGanja lab catalogue of **phytocannabinoids** — plant molecules (mainly *Cannabis sativa*) that meet the [endocannabinoidome](${L.ecs}). Complements the [chemotype guide](${L.quimio}) and [XIV Lesson 10](${L.xiv}).

> **Not medical advice, HPLC report, extraction protocol, dose or grow guide.**

## Three families

| Family | Origin | Example |
|--------|--------|---------|
| Phytocannabinoids | Plant trichomes | THCA, CBD, CBG |
| Endocannabinoids | Body | Anandamide, 2-AG |
| Synthetics | Human lab | Licensed drugs **or** illicit CB1 agonists — **no synthesis recipes** |

## Biosynthesis (textbook, not bench)

Olivetolic acid + GPP → **CBGA** (mother node) → THCA / CBDA / CBCA via plant enzymes. Heat/light/time **decarboxylate** acids to neutrals. THC oxidises toward **CBN**. Propyl (varin) series from divarinolic acid: THCV, CBDV.

## Catalogue (axes)

- **CBG/CBGA** — biosynthetic mother; chemotype 4.  
- **Δ9-THC/THCA** — partial CB1 agonist; developmental caution ([Albaugh](${L.albaugh})); potency × first-episode psychosis ([Di Forti](${L.diforti})).  
- **CBD/CBDA** — low CB1 affinity; strongest human signal in rare epilepsies ([Devinsky](${L.devinsky}) RCT); isolate ≠ whole plant.  
- **CBC** — minor chromene.  
- **CBN** — aged THC; sleep marketing outruns evidence.  
- **THCV / CBDV** — C3 varins; not diet drops.  
- **Δ8 / HHC / THC-O** — mostly **not** the living-plant catalogue.

## Chemotypes 1–5

See [chemotype guide](${L.quimio}): THC-dominant → balanced → CBD → CBG → fiber (negligible cannabinoids).

## Status

**Published — catalogue step 1** on [Research](${L.hub}).

[▶ Chemotypes](${L.quimio}) · [▶ Endocannabinoidome](${L.ecs}) · [▶ Plant](${L.plantaPost})
`;

  const contentEs = `## Alcance

Catálogo de laboratorio de **fitocannabinoides** — moléculas de planta (sobre todo *Cannabis sativa*) que cruzan el [endocannabinoidoma](${L.ecs}). Complementa la [guía de quimiotipos](${L.quimio}) y la [Aula 10 del XIV](${L.xiv}).

> **No es consejo médico, laudo HPLC, protocolo de extracción, dosis ni cultivo.**

## Tres familias

Fitocannabinoides (planta) · endocannabinoides (cuerpo) · sintéticos (laboratorio humano: fármaco registrado **o** agonistas ilícitos — **sin recetas de síntesis**).

## Biosíntesis (libro, no bancada)

Ácido olivetólico + GPP → **CBGA** (nodo madre) → THCA / CBDA / CBCA. Calor/luz/tiempo **descarboxilan**. El THC oxida hacia **CBN**. Serie varin (C3): THCV, CBDV.

## Catálogo (ejes)

CBG/CBGA · Δ9-THC/THCA (cautela en desarrollo, [Albaugh](${L.albaugh}); potencia × psicosis, [Di Forti](${L.diforti})) · CBD/CBDA (epilepsias raras, [Devinsky](${L.devinsky}); aislado ≠ planta) · CBC · CBN (marketing de sueño adelanta la evidencia) · THCV/CBDV · Δ8/HHC fuera del catálogo de la planta viva.

## Quimiotipos 1–5

Ver [guía](${L.quimio}).

## Estado

**Publicado — catálogo peldaño 1** en [Pesquisas](${L.hub}).

[▶ Quimiotipos](${L.quimio}) · [▶ Endocannabinoidoma](${L.ecs}) · [▶ Planta](${L.plantaPost})
`;

  return {
    slug: SLUG,
    title: 'Pesquisa: Fitocanabinoides — catálogo da CBGA ao CBN',
    titleEn: 'Research: Phytocannabinoids — catalogue from CBGA to CBN',
    titleEs: 'Investigación: Fitocannabinoides — catálogo de la CBGA al CBN',
    excerpt:
      'Catálogo de ofício: ácidos e neutros, mãe CBGA, THC/CBD/CBG/CBC/CBN e série varin — literacia química ligada a quimiotipos e ao endocanabinoidoma. Não é bula nem extração.',
    excerptEn:
      'Craft catalogue: acids vs neutrals, CBGA mother node, THC/CBD/CBG/CBC/CBN and varin series — chemical literacy tied to chemotypes and the endocannabinoidome. Not a label or extraction guide.',
    excerptEs:
      'Catálogo de oficio: ácidos y neutros, madre CBGA, THC/CBD/CBG/CBC/CBN y serie varin — literacia química ligada a quimiotipos y endocannabinoidoma. No es bula ni extracción.',
    content_raw: body,
    contentEn,
    contentEs,
    format: 'markdown',
    date: DATE,
    published: true,
    coverImage: COVER,
    category: 'pesquisa',
    series: 'pesquisa-laboratorio',
    seriesLabel: 'Laboratório',
    seriesOrder: 5
  };
}

const GUIA_FITOCANABINOIDES_ITEMS = [
  {
    id: 'fitocanabinoide',
    word: 'Fitocanabinoide',
    simple:
      'Canabinoide de planta (sobretudo cannabis) — catálogo de ofício: ácidos na flor, neutros com calor/tempo, distintos do endocanabinoide e do sintético.',
    simpleEn:
      'Plant cannabinoid (especially cannabis) — craft catalogue: acids in the flower, neutrals with heat/time, distinct from endo- and synthetics.',
    simpleEs:
      'Cannabinoide de planta (sobre todo cannabis) — catálogo de oficio: ácidos en la flor, neutros con calor/tiempo, distintos del endo y del sintético.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'cbga',
    word: 'CBGA',
    simple:
      'Ácido canabigerólico — nó-mãe da via clássica; ramifica a THCA, CBDA e CBCA nas enzimas da planta (pesquisa Fitocanabinoides).',
    simpleEn: 'Cannabigerolic acid — mother node of the classic path; branches to THCA, CBDA and CBCA (Phytocannabinoids research).',
    simpleEs: 'Ácido cannabigerólico — nodo madre de la vía clásica; ramifica a THCA, CBDA y CBCA.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'thca',
    word: 'THCA',
    simple:
      'Ácido Δ9-tetrahidrocanabinólico — forma predominante na flor fresca; não é o mesmo perfil do Δ9-THC após descarboxilação.',
    simpleEn: 'Δ9-tetrahydrocannabinolic acid — main form in fresh flower; not the same profile as decarboxylated Δ9-THC.',
    simpleEs: 'Ácido Δ9-tetrahidrocannabinólico — forma predominante en flor fresca; no es el mismo perfil del Δ9-THC.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'cbda',
    word: 'CBDA',
    simple:
      'Ácido canabidiólico — forma ácida do CBD na planta viva; estudar à parte do CBD neutro (pesquisa Fitocanabinoides).',
    simpleEn: 'Cannabidiolic acid — acidic form of CBD in the living plant; study apart from neutral CBD.',
    simpleEs: 'Ácido cannabidiólico — forma ácida del CBD en la planta viva; estudiar aparte del CBD neutro.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'descarboxilacao',
    word: 'Descarboxilação',
    simple:
      'Perda do grupo ácido (o «A») com calor, luz ou tempo — THCA→THC, CBDA→CBD; literacia de laudo, não receita de cozinha.',
    simpleEn: 'Loss of the acid group with heat, light or time — THCA→THC, CBDA→CBD; lab-label literacy, not a kitchen recipe.',
    simpleEs: 'Pérdida del grupo ácido con calor, luz o tiempo — THCA→THC, CBDA→CBD; literacia de laudo, no receta de cocina.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'thcv',
    word: 'THCV',
    simple:
      'Tetrahidrocanabivarina — série propil (C3); perfil distinto do THC nas doses descritas na literatura; não é «dieta em gotas».',
    simpleEn: 'Tetrahydrocannabivarin — propyl (C3) series; profile distinct from THC in the literature; not “diet drops”.',
    simpleEs: 'Tetrahidrocannabivarina — serie propilo (C3); perfil distinto del THC; no es «dieta en gotas».',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'cbdv',
    word: 'CBDV',
    simple:
      'Canabidivarina — varin do CBD; investigada em epilepsia/neuro. Não substitui fármaco prescrito (pesquisa Fitocanabinoides).',
    simpleEn: 'Cannabidivarin — CBD’s varin; researched in epilepsy/neuro. Does not replace a prescribed drug.',
    simpleEs: 'Cannabidivarina — varin del CBD; investigada en epilepsia/neuro. No sustituye fármaco prescrito.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'serie-varin',
    word: 'Série varin',
    simple:
      'Fitocanabinoides de cadeia lateral C3 (propil) — THCV, CBDV, CBGV — distintos da série pentil (C5) do THC/CBD clássicos.',
    simpleEn: 'C3 (propyl) side-chain phytocannabinoids — THCV, CBDV, CBGV — distinct from the classic C5 pentyl series.',
    simpleEs: 'Fitocannabinoides de cadena lateral C3 (propilo) — THCV, CBDV, CBGV — distintos de la serie pentilo C5.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  },
  {
    id: 'canabinoide-sintetico',
    word: 'Canabinoide sintético',
    simple:
      'Molécula canabinoide feita em laboratório humano — fármaco registado ou agonista ilícito; não é fitocanabinoide da flor. Sem receita de síntese.',
    simpleEn: 'Cannabinoid made in a human lab — licensed drug or illicit agonist; not a flower phytocannabinoid. No synthesis recipe.',
    simpleEs: 'Cannabinoide hecho en laboratorio humano — fármaco registrado o agonista ilícito; no es fitocannabinoide de la flor.',
    group: 'tecnico',
    fromTitle: false,
    href: HREF
  }
];

module.exports = {
  buildPesquisaFitocanabinoidesPost,
  GUIA_FITOCANABINOIDES_ITEMS,
  POST_HREF: HREF
};
