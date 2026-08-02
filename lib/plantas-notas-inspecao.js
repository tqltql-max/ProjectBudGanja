'use strict';

/**
 * Notas educacionais por espécie do catálogo /plantas/ — química, usos, etimologia.
 * Consumido pelo builder de inspeções e por getPlantNoteMeta() para metadados.
 */

function L(pt, en, es) {
  return { pt, en, es };
}

function pick(loc, obj) {
  if (!obj || typeof obj !== 'object') return '';
  if (loc === 'en') return obj.en || obj.pt || '';
  if (loc === 'es') return obj.es || obj.pt || '';
  return obj.pt || '';
}

const SECTION = {
  identity: L(
    'Identidade e etimologia',
    'Identity and etymology',
    'Identidad y etimología'
  ),
  chemistry: L(
    'Química e marcadores',
    'Chemistry and markers',
    'Química y marcadores'
  ),
  uses: L(
    'Usos e benefícios (contexto educacional)',
    'Uses and benefits (educational context)',
    'Usos y beneficios (contexto educativo)'
  ),
  cautions: L(
    'Cuidados reforçados',
    'Reinforced cautions',
    'Cuidados reforzados'
  ),
  links: L(
    'Elos no laboratório',
    'Links in the lab',
    'Enlaces en el laboratorio'
  ),
};

const TABLE = {
  marker: L('Marcador', 'Marker', 'Marcador'),
  note: L('Notas', 'Notes', 'Notas'),
  theme: L('Tema', 'Theme', 'Tema'),
  frame: L('Como o laboratório enquadra', 'How the lab frames it', 'Cómo lo enmarca el laboratorio'),
};

const LIMITS = {
  chemistry: L(
    '**Limites da leitura química:** perfis variam por cultivar, parte usada, secagem e preparo. Isto **não** é protocolo clínico nem laudo de produto.',
    '**Limits of chemical readout:** profiles vary by cultivar, plant part, drying and preparation. This is **not** a clinical protocol or product assay.',
    '**Límites de la lectura química:** los perfiles varían según cultivar, parte usada, secado y preparación. Esto **no** es protocolo clínico ni análisis de producto.'
  ),
  uses: L(
    '**Limites da evidência:** tradição popular e interesse científico **não** substituem diagnóstico, prescrição ou acompanhamento profissional.',
    '**Limits of evidence:** folk tradition and scientific interest **do not** replace diagnosis, prescription or professional care.',
    '**Límites de la evidencia:** la tradición popular y el interés científico **no** sustituyen diagnóstico, prescripción ni seguimiento profesional.'
  ),
};

const NOTES = {
  babosa: {
    titleSuffix: L('gel foliar e polissacarídeos', 'leaf gel and polysaccharides', 'gel foliar y polisacáridos'),
    excerpt: L(
      'Gel de *Aloe vera* — polissacarídeos, antraquinonas e uso tópico tradicional; cautela com ingestão.',
      '*Aloe vera* gel — polysaccharides, anthraquinones and traditional topical use; caution with ingestion.',
      'Gel de *Aloe vera* — polisacáridos, antraquinonas y uso tópico tradicional; precaución con la ingestión.'
    ),
    etimo: L(
      'O nome **babosa** (português) descreve a consistência viscosa do gel; o binómio **Aloe vera** vem do latim *aloe* (planta amarga) e *vera* (verdadeira). Não confundir com outras espécies de *Aloe* com perfil químico distinto.',
      'The Portuguese **babosa** names the viscous gel; **Aloe vera** comes from Latin *aloe* (bitter plant) and *vera* (true). Do not confuse with other *Aloe* species with different chemistry.',
      '**Babosa** (portugués) describe la consistencia viscosa del gel; **Aloe vera** viene del latín *aloe* (planta amarga) y *vera* (verdadera). No confundir con otras especies de *Aloe*.'
    ),
    chemistry: [
      {
        marker: L('Polissacarídeos (acemana)', 'Polysaccharides (acemannan)', 'Polisacáridos (acemana)'),
        note: L(
          'Gel interno da folha — mucilagem hidratante; marcador frequentemente citado em estudos do gel depurado.',
          'Inner leaf gel — hydrating mucilage; marker often cited in studies of purified gel.',
          'Gel interno de la hoja — mucílagos hidratantes; marcador citado en estudios del gel depurado.'
        ),
      },
      {
        marker: L('Antraquinonas (aloina / barbaloina)', 'Anthraquinones (aloin / barbaloin)', 'Antraquinonas (aloina / barbaloina)'),
        note: L(
          'Concentradas sobretudo no látex amarelo periférico — efeito laxante; separar gel do látex em preparações caseiras.',
          'Concentrated mainly in yellow peripheral latex — laxative effect; separate gel from latex in home prep.',
          'Concentradas sobre todo en el látex amarillo periférico — efecto laxante; separar gel del látex en preparaciones caseras.'
        ),
      },
      {
        marker: L('Antioxidantes fenólicos', 'Phenolic antioxidants', 'Antioxidantes fenólicos'),
        note: L(
          'Flavonoides e ácidos fenólicos no gel — interesse em proteção cutânea (contexto in vitro / tradicional).',
          'Flavonoids and phenolic acids in gel — interest in skin protection (in vitro / traditional context).',
          'Flavonoides y ácidos fenólicos en el gel — interés en protección cutánea (contexto in vitro / tradicional).'
        ),
      },
      {
        marker: L('Minerais e vitaminas', 'Minerals and vitamins', 'Minerales y vitaminas'),
        note: L(
          'Traços de zinco, magnésio, vitaminas A, C, E — contribuição nutricional marginal face ao gel tópico.',
          'Traces of zinc, magnesium, vitamins A, C, E — marginal nutritional contribution vs topical gel use.',
          'Trazas de zinc, magnesio, vitaminas A, C, E — aporte nutricional marginal frente al gel tópico.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Hidratação tópica', 'Topical hydration', 'Hidratación tópica'),
        frame: L(
          'Gel depurado em queimaduras leves, pele seca e cosmética caseira — linha de base mais segura do laboratório.',
          'Purified gel for minor burns, dry skin and home cosmetics — lab’s safer baseline.',
          'Gel depurado en quemaduras leves, piel seca y cosmética casera — línea base más segura del laboratorio.'
        ),
      },
      {
        theme: L('Pós-sol e irritação cutânea', 'After-sun and skin irritation', 'Post-sol e irritación cutánea'),
        frame: L(
          'Tradição popular de alívio refrescante; evidência mista — não substitui tratamento de queimaduras graves.',
          'Popular cooling relief tradition; mixed evidence — does not replace treatment of severe burns.',
          'Tradición popular de alivio refrescante; evidencia mixta — no sustituye tratamiento de quemaduras graves.'
        ),
      },
      {
        theme: L('Uso interno (látex / suco)', 'Internal use (latex / juice)', 'Uso interno (látex / jugo)'),
        frame: L(
          'Historicamente laxante — hoje exige separação rigorosa e orientação profissional; automedicação desaconselhada.',
          'Historically laxative — today requires strict separation and professional guidance; self-medication discouraged.',
          'Históricamente laxante — hoy exige separación rigurosa y orientación profesional; automedicación desaconsejada.'
        ),
      },
    ],
    cautionsExtra: L(
      'Látex e antraquinonas irritam mucosas; gestantes, lactantes e pessoas com doença renal/hepática devem evitar ingestão sem supervisão. Produtos comerciais devem declarar se o gel é depurado de antraquinonas.',
      'Latex and anthraquinones irritate mucous membranes; pregnant, nursing and kidney/liver disease patients should avoid ingestion without supervision. Commercial products should state if anthraquinones were removed.',
      'El látex y las antraquinonas irritan mucosas; embarazadas, lactantes y personas con enfermedad renal/hepática deben evitar la ingestión sin supervisión.'
    ),
    links: [],
  },

  camomila: {
    titleSuffix: L('apigenina e óleo azul', 'apigenin and blue oil', 'apigenina y aceite azul'),
    excerpt: L(
      'Capítulos florais ricos em flavonoides e óleo essencial — chá calmante clássico com perfil químico documentado.',
      'Floral heads rich in flavonoids and essential oil — classic calming tea with documented chemistry.',
      'Capítulos florales ricos en flavonoides y aceite esencial — infusión calmante clásica.'
    ),
    etimo: L(
      '**Camomila** deriva do grego *chamaimēlon* (χαμαίμηλον) — «maçã do chão», pela fragrância frutada das flores. O género **Matricaria** alude à matriz (útero) em referências históricas europeias.',
      '**Chamomile** from Greek *chamaimēlon* — «ground apple», for the fruity flower scent. Genus **Matricaria** historically linked to the womb in European references.',
      '**Manzanilla** / **camomila** del griego *chamaimēlon* — «manzana del suelo». El género **Matricaria** alude históricamente al útero.'
    ),
    chemistry: [
      {
        marker: L('Apigenina (flavonoide)', 'Apigenin (flavonoid)', 'Apigenina (flavonoide)'),
        note: L(
          'Marcador principal dos capítulos — interesse em modulação GABAérgica e efeito calmante (estudos in vitro / clínicos leves).',
          'Main marker in floral heads — interest in GABAergic modulation and calming effect (in vitro / mild clinical studies).',
          'Marcador principal de los capítulos — interés en modulación GABAérgica y efecto calmante.'
        ),
      },
      {
        marker: L('Camazuleno', 'Chamazulene', 'Camazuleno'),
        note: L(
          'Formado na destilação do óleo essencial — pigmento azul; anti-inflamatório leve em modelos experimentais.',
          'Formed during essential oil distillation — blue pigment; mild anti-inflammatory in experimental models.',
          'Formado en la destilación del aceite esencial — pigmento azul; antiinflamatorio leve en modelos experimentales.'
        ),
      },
      {
        marker: L('α-bisabolol', 'α-bisabolol', 'α-bisabolol'),
        note: L(
          'Sesquiterpeno do óleo — pele calmante e anti-irritante em preparações tópicas.',
          'Sesquiterpene in the oil — skin calming and anti-irritant in topical preparations.',
          'Sesquiterpeno del aceite — calmante cutáneo y anti-irritante en preparaciones tópicas.'
        ),
      },
      {
        marker: L('Cumarinas e flavonoides', 'Coumarins and flavonoids', 'Cumarinas y flavonoides'),
        note: L(
          'Perfil fenólico amplo nos capítulos secos — contribui para sabor amargo-dulce característico.',
          'Broad phenolic profile in dried heads — contributes to characteristic bitter-sweet taste.',
          'Perfil fenólico amplio en capítulos secos — contribuye al sabor amargo-dulce característico.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá calmante e sono', 'Calming tea and sleep', 'Infusión calmante y sueño'),
        frame: L(
          'Infusão leve antes de dormir — tradição europeia adaptada ao Brasil; dose moderada (1–2 chávenes).',
          'Mild infusion before sleep — European tradition adapted to Brazil; moderate dose (1–2 cups).',
          'Infusión leve antes de dormir — tradición europea adaptada; dosis moderada (1–2 tazas).'
        ),
      },
      {
        theme: L('Conforto digestivo leve', 'Mild digestive comfort', 'Conforto digestivo leve'),
        frame: L(
          'Após refeições pesadas — efeito antiespasmódico suave documentado para óleo e extratos.',
          'After heavy meals — documented mild antispasodic effect for oil and extracts.',
          'Tras comidas pesadas — efecto antiespasmódico suave documentado para aceite y extractos.'
        ),
      },
      {
        theme: L('Compressas e banhos', 'Compresses and baths', 'Compresas y baños'),
        frame: L(
          'Uso tópico em irritações cutâneas leves e olhos cansados (tradição popular, não oftalmológica).',
          'Topical use for mild skin irritation and tired eyes (folk tradition, not ophthalmological).',
          'Uso tópico en irritaciones cutáneas leves (tradición popular).'
        ),
      },
    ],
    cautionsExtra: L(
      'Alergia cruzada possível com Asteraceae (margarida, ambrósia). Interações teóricas com anticoagulantes em doses altas de extrato concentrado — chá ocasional difere de suplemento.',
      'Possible cross-allergy with Asteraceae (daisy, ragweed). Theoretical interactions with anticoagulants at high extract doses — occasional tea differs from supplements.',
      'Posible alergia cruzada con Asteraceae. Interacciones teóricas con anticoagulantes en dosis altas de extracto.'
    ),
    links: [],
  },

  'capim-limao': {
    titleSuffix: L('citral e gramínea aromática', 'citral and aromatic grass', 'citral y gramínea aromática'),
    excerpt: L(
      'Folhas de *Cymbopogon citratus* — citral dominante, chás digestivos e culinária tailandesa/brasileira.',
      '*Cymbopogon citratus* leaves — dominant citral, digestive teas and Thai/Brazilian cuisine.',
      'Hojas de *Cymbopogon citratus* — citral dominante, infusiones digestivas y cocina.'
    ),
    etimo: null,
    chemistry: [
      {
        marker: L('Citral (geranial + neral)', 'Citral (geranial + neral)', 'Citral (geranial + neral)'),
        note: L(
          'Aldeído terpenoide principal (≈65–85% do óleo) — aroma limão; marcador de identidade da espécie.',
          'Main terpenoid aldehyde (≈65–85% of oil) — lemon aroma; species identity marker.',
          'Aldehído terpenoide principal (≈65–85% del aceite) — aroma limón; marcador de identidad.'
        ),
      },
      {
        marker: L('Mirceno e geraniol', 'Myrcene and geraniol', 'Mirceno y geraniol'),
        note: L(
          'Monoterpenos secundários no óleo essencial — modulam o perfil aromático e efeitos relaxantes leves.',
          'Secondary monoterpenes in essential oil — modulate aroma profile and mild relaxing effects.',
          'Monoterpenos secundarios en el aceite esencial — modulan el perfil aromático.'
        ),
      },
      {
        marker: L('Flavonoides e ácido clorogénico', 'Flavonoids and chlorogenic acid', 'Flavonoides y ácido clorogénico'),
        note: L(
          'Presentes na infusão aquosa — contribuição antioxidante além do óleo volátil.',
          'Present in aqueous infusion — antioxidant contribution beyond volatile oil.',
          'Presentes en la infusión acuosa — contribución antioxidante más allá del aceite volátil.'
        ),
      },
      {
        marker: L('Fibras e minerais', 'Fiber and minerals', 'Fibras y minerales'),
        note: L(
          'Infusão e folha cozinhada fornecem traços de ferro, magnésio e fibra insolúvel.',
          'Infusion and cooked leaf provide traces of iron, magnesium and insoluble fiber.',
          'Infusión y hoja cocida aportan trazas de hierro, magnesio y fibra insoluble.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá digestivo e febrífugo leve', 'Digestive tea and mild febrifuge', 'Infusión digestiva y febrífugo leve'),
        frame: L(
          'Decocto ou infusão após refeições — tradição popular brasileira e asiática.',
          'Decoction or infusion after meals — Brazilian and Asian folk tradition.',
          'Decocción o infusión tras comidas — tradición popular brasileña y asiática.'
        ),
      },
      {
        theme: L('Culinária aromática', 'Aromatic cuisine', 'Cocina aromática'),
        frame: L(
          'Base de curries, sopas e peixes — exposição alimentar quotidiana (dose culinária).',
          'Base for curries, soups and fish — everyday dietary exposure (culinary dose).',
          'Base de curries, sopas y pescados — exposición alimentaria cotidiana.'
        ),
      },
      {
        theme: L('Repelente de insetos (tópico)', 'Insect repellent (topical)', 'Repelente de insectos (tópico)'),
        frame: L(
          'Óleo essencial diluído — uso tradicional; testar pele antes de aplicação ampla.',
          'Diluted essential oil — traditional use; patch-test before wide application.',
          'Aceite esencial diluido — uso tradicional; probar en piel antes de aplicación ampla.'
        ),
      },
    ],
    cautionsExtra: L(
      'Óleo essencial concentrado irrita pele e mucosas. Cautela em gestantes com óleo não diluído. Infusão moderada é a linha prudente do laboratório.',
      'Concentrated essential oil irritates skin and mucous membranes. Caution in pregnancy with undiluted oil. Moderate infusion is the lab’s prudent line.',
      'Aceite esencial concentrado irrita piel y mucosas. Precaución en embarazo con aceite no diluido.'
    ),
    links: [],
  },

  carqueja: {
    titleSuffix: L('flavonoides e amargor nativo', 'flavonoids and native bitterness', 'flavonoides y amargor nativo'),
    excerpt: L(
      '*Baccharis trimera* — chá amargo do Sul/Sudeste; flavonoides e ácidos fenólicos na tradição hepato-digestiva.',
      '*Baccharis trimera* — bitter tea of South/Southeast Brazil; flavonoids in hepato-digestive folk use.',
      '*Baccharis trimera* — infusión amarga del Sur/Sudeste; flavonoides en uso hepato-digestivo popular.'
    ),
    etimo: null,
    chemistry: [
      {
        marker: L('Flavonoides (ex.: quercetina, rutina)', 'Flavonoids (e.g. quercetin, rutin)', 'Flavonoides (p. ej. quercetina, rutina)'),
        note: L(
          'Marcadores fenólicos dominantes nas partes aéreas — interesse antioxidante e hepatoprotector (modelos animais).',
          'Dominant phenolic markers in aerial parts — antioxidant and hepatoprotective interest (animal models).',
          'Marcadores fenólicos dominantes en partes aéreas — interés antioxidante y hepatoprotector (modelos animales).'
        ),
      },
      {
        marker: L('Ácido clorogénico e derivados', 'Chlorogenic acid and derivatives', 'Ácido clorogénico y derivados'),
        note: L(
          'Ácido fenólico abundante — comum em plantas amargas nativas.',
          'Abundant phenolic acid — common in native bitter plants.',
          'Ácido fenólico abundante — común en plantas amargas nativas.'
        ),
      },
      {
        marker: L('Diterpenos e triterpenos', 'Diterpenes and triterpenes', 'Diterpenos y triterpenos'),
        note: L(
          'Perfil lipofílico em extratos etanólicos — contribui para amargor e atividade biológica documentada.',
          'Lipophilic profile in ethanolic extracts — contributes to bitterness and documented bioactivity.',
          'Perfil lipofílico en extractos etanólicos — contribuye al amargor y actividad biológica.'
        ),
      },
      {
        marker: L('Taninos condensados', 'Condensed tannins', 'Taninos condensados'),
        note: L(
          'Efeito adstringente — relevante em decoctos concentrados.',
          'Astringent effect — relevant in concentrated decoctions.',
          'Efecto adstringente — relevante en decocciones concentradas.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá digestivo amargo', 'Bitter digestive tea', 'Infusión digestiva amarga'),
        frame: L(
          'Tradição gaúcha e do Sudeste — «limpar» o fígado (metáfora popular, não clínica).',
          'Gaúcho and Southeast tradition — «cleanse» the liver (popular metaphor, not clinical).',
          'Tradición gaúcha y del Sudeste — «limpiar» el hígado (metáfora popular).'
        ),
      },
      {
        theme: L('Controle glicêmico (interesse)', 'Glycemic control (interest)', 'Control glucémico (interés)'),
        frame: L(
          'Estudos preliminares com extratos — **não** substituem tratamento de diabetes.',
          'Preliminary studies with extracts — **do not** replace diabetes treatment.',
          'Estudios preliminares con extractos — **no** sustituyen tratamiento de diabetes.'
        ),
      },
      {
        theme: L('Diurético leve', 'Mild diuretic', 'Diurético leve'),
        frame: L(
          'Uso popular em retenção de líquidos — monitorizar eletrólitos se uso prolongado.',
          'Folk use for fluid retention — monitor electrolytes with prolonged use.',
          'Uso popular en retención de líquidos — monitorizar electrolitos con uso prolongado.'
        ),
      },
    ],
    cautionsExtra: L(
      'Hepatotoxicidade reportada em casos de uso excessivo ou preparações não padronizadas. Evitar em gestantes, lactantes e doença hepática sem acompanhamento. Não combinar com outros hepatotóxicos.',
      'Hepatotoxicity reported with excessive or non-standardized use. Avoid in pregnancy, nursing and liver disease without supervision. Do not combine with other hepatotoxins.',
      'Hepatotoxicidad reportada con uso excesivo. Evitar en embarazo, lactancia y enfermedad hepática sin supervisión.'
    ),
    links: [],
  },

  cavalinha: {
    titleSuffix: L('sílica e remineralizante', 'silica and remineralizing', 'sílice y remineralizante'),
    excerpt: L(
      '*Equisetum arvense* — alto teor de sílica silícea, flavonoides e uso tradicional em chás e banhos.',
      '*Equisetum arvense* — high siliceous silica, flavonoids and traditional tea/bath use.',
      '*Equisetum arvense* — alto contenido de sílice, flavonoides y uso tradicional en infusiones y baños.'
    ),
    etimo: L(
      '**Cavalinha** (português) evoca a forma segmentada do caule («pequenos cascos»). O nome científico **Equisetum** vem do latim *equus* (cavalo) + *seta* (crina) — crina de cavalo.',
      '**Cavalinha** (Portuguese) evokes the segmented stem shape. **Equisetum** from Latin *equus* (horse) + *seta* (bristle) — horsetail.',
      '**Cola de caballo** / **cavalinha**: **Equisetum** del latín *equus* (caballo) + *seta* (crin).'
    ),
    chemistry: [
      {
        marker: L('Sílica (ácido silícico)', 'Silica (silicic acid)', 'Sílice (ácido silícico)'),
        note: L(
          '5–10% de sílica em planta seca — marcador distintivo; deposita nos estômatos e paredes celulares.',
          '5–10% silica in dry plant — distinctive marker; deposits in stomata and cell walls.',
          '5–10% de sílice en planta seca — marcador distintivo; se deposita en estomas y paredes celulares.'
        ),
      },
      {
        marker: L('Flavonoides (ex.: quercetina, kaempferol)', 'Flavonoids (e.g. quercetin, kaempferol)', 'Flavonoides (p. ej. quercetina, kaempferol)'),
        note: L(
          'Contribuição antioxidante da infusão — complementa o perfil mineral.',
          'Antioxidant contribution of infusion — complements mineral profile.',
          'Contribución antioxidante de la infusión — complementa el perfil mineral.'
        ),
      },
      {
        marker: L('Alcaloides traço (palustrina)', 'Trace alkaloids (palustrine)', 'Alcaloides traza (palustrina)'),
        note: L(
          'Presentes em baixíssima concentração — relevância toxicológica sobretudo em extratos concentrados ou uso prolongado.',
          'Present in very low concentration — toxicological relevance mainly in concentrated extracts or prolonged use.',
          'Presentes en muy baja concentración — relevancia toxicológica sobre todo en extractos concentrados.'
        ),
      },
      {
        marker: L('Minerais (K, Ca, Mg)', 'Minerals (K, Ca, Mg)', 'Minerales (K, Ca, Mg)'),
        note: L(
          'Perfil ash mineral — base da tradição «remineralizante» (contexto popular).',
          'Mineral ash profile — basis of «remineralizing» folk tradition.',
          'Perfil mineral — base de la tradición «remineralizante» popular.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá diurético e remineralizante', 'Diuretic and remineralizing tea', 'Infusión diurética y remineralizante'),
        frame: L(
          'Tradição europeia e brasileira — dose curta e intermitente; não como substituto de água potável.',
          'European and Brazilian tradition — short intermittent doses; not a substitute for drinking water.',
          'Tradición europea y brasileña — dosis corta e intermitente.'
        ),
      },
      {
        theme: L('Unhas e cabelo (tópico/oral)', 'Nails and hair (topical/oral)', 'Uñas y cabello (tópico/oral)'),
        frame: L(
          'Metáfora popular de fortalecimento via sílica — evidência clínica limitada.',
          'Popular metaphor of strengthening via silica — limited clinical evidence.',
          'Metáfora popular de fortalecimiento vía sílice — evidencia clínica limitada.'
        ),
      },
      {
        theme: L('Banhos de assento', 'Sitz baths', 'Baños de asiento'),
        frame: L(
          'Uso tópico em inflamações leves — prática doméstica histórica.',
          'Topical use for mild inflammation — historical home practice.',
          'Uso tópico en inflamaciones leves — práctica doméstica histórica.'
        ),
      },
    ],
    cautionsExtra: L(
      'Contém tiaminase — pode reduzir vitamina B1 com uso crónico; preferir decocto ocasional. Contraindicada em gravidez e em pessoas com doença renal. Interage teoricamente com diuréticos e lítio.',
      'Contains thiaminase — may reduce vitamin B1 with chronic use; prefer occasional decoction. Contraindicated in pregnancy and kidney disease. Theoretical interaction with diuretics and lithium.',
      'Contiene tiaminasa — puede reducir vitamina B1 con uso crónico. Contraindicada en embarazo y enfermedad renal.'
    ),
    links: [],
  },

  'erva-cidreira': {
    titleSuffix: L('citral e verbena brasileira', 'citral and Brazilian verbena', 'citral y verbena brasileña'),
    excerpt: L(
      '*Lippia alba* — erva aromática brasileira; quimiotipos ricos em citral ou carvona conforme região.',
      '*Lippia alba* — Brazilian aromatic herb; chemotypes rich in citral or carvone by region.',
      '*Lippia alba* — hierba aromática brasileña; quimiotipos ricos en citral o carvona.'
    ),
    etimo: null,
    chemistry: [
      {
        marker: L('Citral (quimiotipo comum)', 'Citral (common chemotype)', 'Citral (quimiotipo común)'),
        note: L(
          'Quimiotipo «cidreira» no Sul/Sudeste — aroma limão; sedativo leve documentado in vivo.',
          '«Cidreira» chemotype in South/Southeast — lemon aroma; mild sedative documented in vivo.',
          'Quimiotipo «cidreira» en Sur/Sudeste — aroma limón; sedante leve documentado in vivo.'
        ),
      },
      {
        marker: L('Carvona (quimiotipo alternativo)', 'Carvone (alternative chemotype)', 'Carvona (quimiotipo alternativo)'),
        note: L(
          'Quimiotipo «limão» ou «menta» — perfil distinto; identificar origem ao comparar estudos.',
          '«Lemon» or «mint» chemotype — distinct profile; identify origin when comparing studies.',
          'Quimiotipo «limón» o «menta» — perfil distinto; identificar origen al comparar estudios.'
        ),
      },
      {
        marker: L('Limoneno e mirceno', 'Limonene and myrcene', 'Limoneno y mirceno'),
        note: L(
          'Monoterpenos de apoio no óleo essencial — modulam absorção e aroma.',
          'Supporting monoterpenes in essential oil — modulate absorption and aroma.',
          'Monoterpenos de apoyo en el aceite esencial — modulan absorción y aroma.'
        ),
      },
      {
        marker: L('Flavonoides e ácido verbascósido', 'Flavonoids and verbascoside', 'Flavonoides y ácido verbascósido'),
        note: L(
          'Fenólicos na infusão — atividade antioxidante complementar aos terpenos.',
          'Phenolics in infusion — antioxidant activity complementing terpenes.',
          'Fenólicos en la infusión — actividad antioxidante complementaria a los terpenos.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá calmante e digestivo', 'Calming and digestive tea', 'Infusión calmante y digestiva'),
        frame: L(
          'Erva de quintal brasileira — infusão leve para ansiedade leve e desconforto gástrico.',
          'Brazilian backyard herb — mild infusion for mild anxiety and gastric discomfort.',
          'Hierba de quinta brasileña — infusión leve para ansiedad leve y malestar gástrico.'
        ),
      },
      {
        theme: L('Banhos aromáticos', 'Aromatic baths', 'Baños aromáticos'),
        frame: L(
          'Folhas frescas ou secas em banho — tradição de relaxamento sensorial.',
          'Fresh or dried leaves in bath — sensory relaxation tradition.',
          'Hojas frescas o secas en baño — tradición de relajación sensorial.'
        ),
      },
      {
        theme: L('Repelente doméstico', 'Home repellent', 'Repelente doméstico'),
        frame: L(
          'Folhas esfregadas ou óleo diluído — prática popular contra mosquitos.',
          'Crushed leaves or diluted oil — popular practice against mosquitoes.',
          'Hojas frotadas o aceite diluido — práctica popular contra mosquitos.'
        ),
      },
    ],
    cautionsExtra: L(
      'Quimiotipos diferem quimicamente — não assumir equivalência entre lotes. Óleo essencial concentrado é irritante. Cautela em gestantes e com sedativos (potencialização teórica).',
      'Chemotypes differ chemically — do not assume equivalence between batches. Concentrated essential oil is irritant. Caution in pregnancy and with sedatives (theoretical potentiation).',
      'Quimiotipos difieren químicamente. Aceite esencial concentrado es irritante. Precaución en embarazo y con sedantes.'
    ),
    links: [],
  },

  'espinheira-santa': {
    titleSuffix: L('friedelina e triterpenos', 'friedelin and triterpenes', 'friedelina y triterpenos'),
    excerpt: L(
      '*Maytenus ilicifolia* — arbusto da Mata Atlântica; triterpenos e taninos na fitoterapia gástrica popular.',
      '*Maytenus ilicifolia* — Atlantic Forest shrub; triterpenes and tannins in popular gastric phytotherapy.',
      '*Maytenus ilicifolia* — arbusto de la Mata Atlántica; triterpenos y taninos en fitoterapia gástrica.'
    ),
    etimo: null,
    chemistry: [
      {
        marker: L('Friedelina e derivados', 'Friedelin and derivatives', 'Friedelina y derivados'),
        note: L(
          'Triterpeno pentacíclico marcador das folhas — citado em estudos gastroprotectores.',
          'Pentacyclic triterpene marker in leaves — cited in gastroprotective studies.',
          'Triterpeno pentacíclico marcador de las hojas — citado en estudios gastroprotectores.'
        ),
      },
      {
        marker: L('Taninos e flavonoides', 'Tannins and flavonoids', 'Taninos y flavonoides'),
        note: L(
          'Efeito adstringente e anti-inflamatório leve em mucosas (modelos experimentais).',
          'Astringent and mild anti-inflammatory effect on mucous membranes (experimental models).',
          'Efecto adstringente y antiinflamatorio leve en mucosas (modelos experimentales).'
        ),
      },
      {
        marker: L('Maytenósidos (alcaloides)', 'Maytenosides (alkaloids)', 'Maytenósidos (alcaloides)'),
        note: L(
          'Alcaloides evolutivos do género *Maytenus* — presentes em baixa concentração nas folhas comerciais.',
          'Evolutionary alkaloids of genus *Maytenus* — low concentration in commercial leaf.',
          'Alcaloides evolutivos del género *Maytenus* — baja concentración en hoja comercial.'
        ),
      },
      {
        marker: L('Saponinas', 'Saponins', 'Saponinas'),
        note: L(
          'Contribuem para atividade citotóxica in vitro — relevância clínica depende de dose e preparo.',
          'Contribute to in vitro cytotoxic activity — clinical relevance depends on dose and preparation.',
          'Contribuyen a actividad citotóxica in vitro — relevancia clínica depende de dosis y preparación.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Conforto gástrico e úlcera (tradição)', 'Gastric comfort and ulcer (tradition)', 'Conforto gástrico y úlcera (tradición)'),
        frame: L(
          'Chá ou cápsulas de folha — fitoterapia brasileira clássica; estudos em modelos animais de gastroproteção.',
          'Leaf tea or capsules — classic Brazilian phytotherapy; gastroprotection studies in animal models.',
          'Infusión o cápsulas de hoja — fitoterapia brasileña clásica; estudios de gastroprotección en animales.'
        ),
      },
      {
        theme: L('Anti-inflamatório digestivo leve', 'Mild digestive anti-inflammatory', 'Antiinflamatorio digestivo leve'),
        frame: L(
          'Uso popular em gastrite funcional — não substitui endoscopia nem tratamento de *H. pylori*.',
          'Folk use for functional gastritis — does not replace endoscopy or *H. pylori* treatment.',
          'Uso popular en gastritis funcional — no sustituye endoscopia ni tratamiento de *H. pylori*.'
        ),
      },
      {
        theme: L('Fitoterápico industrial', 'Industrial phytotherapeutic', 'Fitoterápico industrial'),
        frame: L(
          'Presente em produtos registrados no Brasil — comparar com chá artesanal (padronização diferente).',
          'Present in registered products in Brazil — compare with artisanal tea (different standardization).',
          'Presente en productos registrados en Brasil — comparar con infusión artesanal.'
        ),
      },
    ],
    cautionsExtra: L(
      'Contraindicada em gestantes (estudos em animais). Pode interagir com antiácidos e IPP — espaçar administração. Uso prolongado sem orientação desaconselhado.',
      'Contraindicated in pregnancy (animal studies). May interact with antacids and PPIs — space administration. Prolonged unsupervised use discouraged.',
      'Contraindicada en embarazo (estudios en animales). Puede interactuar con antiácidos e IBP.'
    ),
    links: [],
  },

  guaco: {
    titleSuffix: L('cumarina e trepadeira respiratória', 'coumarin and respiratory vine', 'cumarina y enredadera respiratoria'),
    excerpt: L(
      '*Mikania glomerata* — cumarina marcante, xaropes e chás da medicina popular respiratória brasileira.',
      '*Mikania glomerata* — distinctive coumarin, syrups and teas in Brazilian respiratory folk medicine.',
      '*Mikania glomerata* — cumarina marcante, jarabes e infusiones de medicina respiratoria popular.'
    ),
    etimo: L(
      '**Guaco** é nome de origem indígena tupi-guarani (*guaco*, «que cura cobra») — tradição oral sobre mordeduras e uso respiratório. O binómio **Mikania** homenageia o botânico J. Mikan.',
      '**Guaco** is of Tupi-Guarani origin (*guaco*, «snake healer») — oral tradition on bites and respiratory use. **Mikania** honors botanist J. Mikan.',
      '**Guaco** es de origen tupí-guarani (*guaco*, «que cura serpiente»). **Mikania** homenajea al botánico J. Mikan.'
    ),
    chemistry: [
      {
        marker: L('Cumarina', 'Coumarin', 'Cumarina'),
        note: L(
          '0,5–1% nas folhas — aroma doce característico; broncodilatador leve em modelos animais (não extrapolar dose humana).',
          '0.5–1% in leaves — characteristic sweet aroma; mild bronchodilator in animal models (do not extrapolate human dose).',
          '0,5–1% en hojas — aroma dulce característico; broncodilatador leve en modelos animales.'
        ),
      },
      {
        marker: L('Lupeol e triterpenos', 'Lupeol and triterpenes', 'Lupeol y triterpenos'),
        note: L(
          'Triterpenos pentacíclicos — anti-inflamatório e imunomodulação leve (estudos in vitro).',
          'Pentacyclic triterpenes — mild anti-inflammatory and immunomodulation (in vitro studies).',
          'Triterpenos pentacíclicos — antiinflamatorio e inmunomodulación leve (estudios in vitro).'
        ),
      },
      {
        marker: L('Flavonoides (ex.: kaempferol)', 'Flavonoids (e.g. kaempferol)', 'Flavonoides (p. ej. kaempferol)'),
        note: L(
          'Complementam perfil antioxidante da folha fresca ou seca.',
          'Complement antioxidant profile of fresh or dried leaf.',
          'Complementan perfil antioxidante de hoja fresca o seca.'
        ),
      },
      {
        marker: L('Óleos essenciais traço', 'Trace essential oils', 'Aceites esenciales traza'),
        note: L(
          'Monoterpenos menores — contribuição aromática secundária face à cumarina.',
          'Minor monoterpenes — secondary aroma contribution vs coumarin.',
          'Monoterpenos menores — contribución aromática secundaria frente a cumarina.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Xarope e chá «expectorante»', '«Expectorant» syrup and tea', 'Jarabe e infusión «expectorante»'),
        frame: L(
          'Medicina popular para tosse e bronquites leves — cumarina como marcador de identidade do xarope caseiro.',
          'Folk medicine for cough and mild bronchitis — coumarin as identity marker of home syrup.',
          'Medicina popular para tos y bronquitis leves — cumarina como marcador del jarabe casero.'
        ),
      },
      {
        theme: L('Broncodilatação leve (interesse)', 'Mild bronchodilation (interest)', 'Broncodilatación leve (interés)'),
        frame: L(
          'Estudos em animais — **não** equivale a broncodilatador farmacológico prescrito.',
          'Animal studies — **not** equivalent to prescribed pharmacological bronchodilator.',
          'Estudios en animales — **no** equivale a broncodilatador farmacológico prescrito.'
        ),
      },
      {
        theme: L('Antitérmico popular', 'Popular antipyretic', 'Antitérmico popular'),
        frame: L(
          'Chá em resfriados — tradição combinada com mel e limão (contexto doméstico).',
          'Tea for colds — tradition combined with honey and lemon (home context).',
          'Infusión en resfriados — tradición combinada con miel y limón.'
        ),
      },
    ],
    cautionsExtra: L(
      'Cumarina em excesso é hepatotóxica (referência também em tonka e cassia). Evitar uso crónico em altas doses. Contraindicado em gestantes, lactantes e anticoagulados (warfarina).',
      'Excess coumarin is hepatotoxic (reference also in tonka and cassia). Avoid chronic high doses. Contraindicated in pregnancy, nursing and anticoagulated patients (warfarin).',
      'Cumarina en exceso es hepatotóxica. Evitar uso crónico en altas dosis. Contraindicado en embarazo, lactancia y anticoagulados.'
    ),
    links: [],
  },

  hortela: {
    titleSuffix: L('mentol e mentona', 'menthol and menthone', 'mentol y mentona'),
    excerpt: L(
      '*Mentha spicata* (hortelã-verde) — mentol, mentona e chás digestivos de cultivo doméstico.',
      '*Mentha spicata* (spearmint) — menthol, menthone and digestive home-garden teas.',
      '*Mentha spicata* (hierbabuena) — mentol, mentona e infusiones digestivas de cultivo doméstico.'
    ),
    etimo: L(
      '**Hortelã** vem do latim *hortus* (jardim) — erva de horta. **Mentha** remete à ninfa Mintho na mitologia grega; o óleo **mentol** deriva do género.',
      '**Mint** from Latin *hortus* (garden). **Mentha** refers to nymph Mintho in Greek myth; **menthol** derives from the genus.',
      '**Menta** / **hortelã** del latín *hortus* (jardín). **Mentha** remite a la ninfa Mintho; el **mentol** deriva del género.'
    ),
    chemistry: [
      {
        marker: L('Carvona (hortelã-verde)', 'Carvone (spearmint)', 'Carvona (hierbabuena)'),
        note: L(
          'Principal terpeno do óleo de *M. spicata* — aroma doce, distinto da menta-piperita (mentol).',
          'Main terpene in *M. spicata* oil — sweet aroma, distinct from peppermint (menthol).',
          'Principal terpeno del aceite de *M. spicata* — aroma dulce, distinto de la menta piperita.'
        ),
      },
      {
        marker: L('Mentol e mentona (traços)', 'Menthol and menthone (traces)', 'Mentol y mentona (trazas)'),
        note: L(
          'Presentes em menor quantidade que em *M. piperita* — confundir espécies altera o perfil.',
          'Present in lower amount than *M. piperita* — confusing species changes profile.',
          'Presentes en menor cantidad que en *M. piperita* — confundir especies altera el perfil.'
        ),
      },
      {
        marker: L('Flavonoides (ex.: hesperidina)', 'Flavonoids (e.g. hesperidin)', 'Flavonoides (p. ej. hesperidina)'),
        note: L(
          'Infusão aquosa — contribuição antioxidante além dos voláteis.',
          'Aqueous infusion — antioxidant contribution beyond volatiles.',
          'Infusión acuosa — contribución antioxidante más allá de los volátiles.'
        ),
      },
      {
        marker: L('Taninos e ácidos fenólicos', 'Tannins and phenolic acids', 'Taninos y ácidos fenólicos'),
        note: L(
          'Amargor leve em decoctos prolongados — modera o efeito «refrescante».',
          'Mild bitterness in prolonged decoctions — moderates «refreshing» effect.',
          'Amargor leve en decocciones prolongadas — modera el efecto «refrescante».'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá digestivo e anti-náusea leve', 'Digestive tea and mild anti-nausea', 'Infusión digestiva y antináusea leve'),
        frame: L(
          'Folhas frescas ou secas — tradição universal em dispepsias leves e gravidez (com orientação).',
          'Fresh or dried leaves — universal tradition for mild dyspepsia and pregnancy (with guidance).',
          'Hojas frescas o secas — tradición universal en dispepsias leves.'
        ),
      },
      {
        theme: L('Culinária e bebidas', 'Cuisine and beverages', 'Cocina y bebidas'),
        frame: L(
          'Molhos, chás gelados, coquetéis sem álcool — exposição alimentar segura em doses culinárias.',
          'Sauces, iced teas, mocktails — safe dietary exposure at culinary doses.',
          'Salsas, infusiones frías — exposición alimentaria segura en dosis culinarias.'
        ),
      },
      {
        theme: L('Aromaterapia leve', 'Mild aromatherapy', 'Aromaterapia leve'),
        frame: L(
          'Inalação de vapores de infusão — conforto sensorial; não substitui tratamento de asma.',
          'Inhalation of infusion vapors — sensory comfort; does not replace asthma treatment.',
          'Inhalación de vapores de infusión — confort sensorial; no sustituye tratamiento de asma.'
        ),
      },
    ],
    cautionsExtra: L(
      'Óleo essencial concentrado pode causar queimadura e broncoespasmo em asmáticos. *M. piperita* tem mais mentol — identificar espécie. Cautela com refluxo (pode relaxar esfíncter esofágico).',
      'Concentrated essential oil can burn and trigger bronchospasm in asthmatics. *M. piperita* has more menthol — identify species. Caution with reflux (may relax esophageal sphincter).',
      'Aceite esencial concentrado puede causar quemaduras y broncoespasmo. Identificar especie. Precaución con reflujo.'
    ),
    links: [],
  },

  boldo: {
    titleSuffix: L('falso-boldo brasileiro', 'Brazilian false boldo', 'falso-boldo brasileño'),
    excerpt: L(
      '*Plectranthus barbatus* — «boldo» do Brasil (falso-boldo); distinguir do boldo-chileno *Peumus boldus*.',
      '*Plectranthus barbatus* — Brazil’s «boldo» (false boldo); distinguish from Chilean *Peumus boldus*.',
      '*Plectranthus barbatus* — «boldo» de Brasil (falso-boldo); distinguir del boldo chileno *Peumus boldus*.'
    ),
    etimo: L(
      'No Brasil **boldo** designa sobretudo *Plectranthus barbatus* (**falso-boldo**), embora o nome venha emprestado do **boldo-chileno** (*Peumus boldus* Molina, Monimiaceae) — espécie distinta, nativa do Chile, rica em **boldina** e perfil hepatobiliar diferente.',
      'In Brazil **boldo** mainly means *Plectranthus barbatus* (**false boldo**), though the name is borrowed from Chilean **boldo** (*Peumus boldus* Molina, Monimiaceae) — a distinct species native to Chile, rich in **boldine** with a different hepato-biliary profile.',
      'En Brasil **boldo** designa sobre todo *Plectranthus barbatus* (**falso-boldo**), aunque el nombre se toma del **boldo chileno** (*Peumus boldus*) — especie distinta, nativa de Chile, rica en **boldina**.'
    ),
    chemistry: [
      {
        marker: L('Diterpenos (ex.: barbatusol)', 'Diterpenes (e.g. barbatusol)', 'Diterpenos (p. ej. barbatusol)'),
        note: L(
          'Marcadores do *P. barbatus* — **não** são boldina do boldo-chileno; confundir espécies invalida comparações.',
          'Markers of *P. barbatus* — **not** boldine from Chilean boldo; confusing species invalidates comparisons.',
          'Marcadores de *P. barbatus* — **no** es boldina del boldo chileno; confundir especies invalida comparaciones.'
        ),
      },
      {
        marker: L('Óleo essencial (cineol, α-pineno)', 'Essential oil (cineole, α-pinene)', 'Aceite esencial (cineol, α-pineno)'),
        note: L(
          'Perfil aromático distinto do *Peumus* — identifica o falso-boldo brasileiro.',
          'Aroma profile distinct from *Peumus* — identifies Brazilian false boldo.',
          'Perfil aromático distinto de *Peumus* — identifica el falso-boldo brasileño.'
        ),
      },
      {
        marker: L('Flavonoides e fenólicos', 'Flavonoids and phenolics', 'Flavonoides y fenólicos'),
        note: L(
          'Atividade antioxidante documentada em folhas secas — complementa diterpenos.',
          'Antioxidant activity documented in dried leaves — complements diterpenes.',
          'Actividad antioxidante documentada en hojas secas — complementa diterpenos.'
        ),
      },
      {
        marker: L('Boldina (ausente ou traço)', 'Boldine (absent or trace)', 'Boldina (ausente o traza)'),
        note: L(
          'Alcaloide característico do *Peumus boldus* — **não** usar como marcador do falso-boldo brasileiro.',
          'Characteristic alkaloid of *Peumus boldus* — **do not** use as marker for Brazilian false boldo.',
          'Alcaloide característico de *Peumus boldus* — **no** usar como marcador del falso-boldo brasileño.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá digestivo amargo', 'Bitter digestive tea', 'Infusión digestiva amarga'),
        frame: L(
          'Tradição doméstica brasileira — 1 chávene ocasional; **não** equivalente ao boldo-chileno farmacológico.',
          'Brazilian home tradition — 1 occasional cup; **not** equivalent to pharmacological Chilean boldo.',
          'Tradición doméstica brasileña — 1 taza ocasional; **no** equivalente al boldo chileno farmacológico.'
        ),
      },
      {
        theme: L('Conforto hepático (metáfora popular)', 'Hepatic comfort (popular metaphor)', 'Conforto hepático (metáfora popular)'),
        frame: L(
          'Associado a «depurar» — evidência clínica fraca para *P. barbatus* vs tradição do *Peumus*.',
          'Associated with «cleansing» — weak clinical evidence for *P. barbatus* vs *Peumus* tradition.',
          'Asociado a «depurar» — evidencia clínica débil para *P. barbatus* vs tradición de *Peumus*.'
        ),
      },
      {
        theme: L('Cultivo ornamental e medicinal doméstica', 'Ornamental and home medicinal cultivation', 'Cultivo ornamental y medicinal doméstico'),
        frame: L(
          'Planta de fácil cultivo — padronização química varia; preferir folha seca identificada.',
          'Easy to grow — chemical standardization varies; prefer identified dried leaf.',
          'Planta de fácil cultivo — estandarización química varía; preferir hoja seca identificada.'
        ),
      },
    ],
    cautionsExtra: L(
      '**Confusão de espécies é risco real:** *Peumus boldus* tem contraindicações e interações próprias (obstrução biliar). *P. barbatus* também exige moderação — evitar uso crónico, gravidez e lactação sem orientação.',
      '**Species confusion is a real risk:** *Peumus boldus* has its own contraindications and interactions (biliary obstruction). *P. barbatus* also requires moderation — avoid chronic use, pregnancy and nursing without guidance.',
      '**Confusión de especies es riesgo real:** *Peumus boldus* tiene contraindicaciones propias. *P. barbatus* también exige moderación — evitar uso crónico y embarazo sin orientación.'
    ),
    links: [],
  },

  melissa: {
    titleSuffix: L('citral e melissa officinalis', 'citral and Melissa officinalis', 'citral y Melissa officinalis'),
    excerpt: L(
      '*Melissa officinalis* — erva-citronela europeia; citral, ácido rosmarínico e chás calmantes.',
      '*Melissa officinalis* — European lemon balm; citral, rosmarinic acid and calming teas.',
      '*Melissa officinalis* — toronjil europeo; citral, ácido rosmarínico e infusiones calmantes.'
    ),
    etimo: L(
      '**Melissa** deriva do grego *mélissa* (μέλισσα) — «abelha», pela afinidade das abelhas com as flores. **Officinalis** indica uso em farmácia/oficina histórica.',
      '**Melissa** from Greek *mélissa* (μέλισσα) — «bee», for bees’ affinity to the flowers. **Officinalis** indicates historical pharmacy use.',
      '**Melissa** del griego *mélissa* (μέλισσα) — «abeja». **Officinalis** indica uso en farmacia histórica.'
    ),
    chemistry: [
      {
        marker: L('Citral e citronelal', 'Citral and citronellal', 'Citral y citronelal'),
        note: L(
          'Óleo essencial — aroma limão; sedação leve e antiviral in vitro (extratos, não óleo puro oral).',
          'Essential oil — lemon aroma; mild sedation and in vitro antiviral activity (extracts, not pure oral oil).',
          'Aceite esencial — aroma limón; sedación leve y antiviral in vitro (extractos).'
        ),
      },
      {
        marker: L('Ácido rosmarínico', 'Rosmarinic acid', 'Ácido rosmarínico'),
        note: L(
          'Fenólico abundante — anti-inflamatório e antioxidante documentado; também presente em alecrim e hortelã.',
          'Abundant phenolic — documented anti-inflammatory and antioxidant; also in rosemary and mint.',
          'Fenólico abundante — antiinflamatorio y antioxidante documentado; también en romero y menta.'
        ),
      },
      {
        marker: L('Flavonoides (ex.: luteolina)', 'Flavonoids (e.g. luteolin)', 'Flavonoides (p. ej. luteolina)'),
        note: L(
          'Complementam efeito calmante da infusão aquosa.',
          'Complement calming effect of aqueous infusion.',
          'Complementan efecto calmante de la infusión acuosa.'
        ),
      },
      {
        marker: L('Taninos', 'Tannins', 'Taninos'),
        note: L(
          'Adstringência leve — relevante em decoctos longos.',
          'Mild astringency — relevant in long decoctions.',
          'Adstringencia leve — relevante en decocciones largas.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Chá calmante e sono', 'Calming tea and sleep', 'Infusión calmante y sueño'),
        frame: L(
          'Infusão vespertina — tradição europeia; estudos leves em ansiedade e insónia subclínica.',
          'Evening infusion — European tradition; mild studies on anxiety and subclinical insomnia.',
          'Infusión vespertina — tradición europea; estudios leves en ansiedad e insomnio subclínico.'
        ),
      },
      {
        theme: L('Herpes labial (extrato tópico)', 'Cold sores (topical extract)', 'Herpes labial (extracto tópico)'),
        frame: L(
          'Extrato padronizado tópico — evidência moderada; chá caseiro **não** equivale a creme registrado.',
          'Standardized topical extract — moderate evidence; home tea **does not** equal registered cream.',
          'Extracto tópico estandarizado — evidencia moderada; infusión casera **no** equivale a crema registrada.'
        ),
      },
      {
        theme: L('Digestivo leve', 'Mild digestive', 'Digestivo leve'),
        frame: L(
          'Após refeições — antiespasmódico suave em modelos experimentais.',
          'After meals — mild antispasmodic in experimental models.',
          'Tras comidas — antiespasmódico suave en modelos experimentales.'
        ),
      },
    ],
    cautionsExtra: L(
      'Pode potencializar sedativos e hormona tiroideia (in vitro — cautela com hipotiroidismo). Óleo essencial oral concentrado é tóxico. Identificar *Melissa* vs *Lippia alba* (erva-cidreira brasileira).',
      'May potentiate sedatives and thyroid hormone (in vitro — caution with hypothyroidism). Concentrated oral essential oil is toxic. Distinguish *Melissa* vs *Lippia alba* (Brazilian erva-cidreira).',
      'Puede potenciar sedantes e hormona tiroidea. Aceite esencial oral concentrado es tóxico. Distinguir *Melissa* vs *Lippia alba*.'
    ),
    links: [],
  },

  alecrim: {
    titleSuffix: L('ácidos diterpênicos e cineol', 'diterpene acids and cineole', 'ácidos diterpénicos y cineol'),
    excerpt: L(
      '*Salvia rosmarinus* — ácido rosmarínico, carnósico e 1,8-cineol; cozinha, chás e tradição antioxidante.',
      '*Salvia rosmarinus* — rosmarinic acid, carnosic acid and 1,8-cineole; kitchen, teas and antioxidant tradition.',
      '*Salvia rosmarinus* — ácido rosmarínico, carnósico y 1,8-cineol; cocina, infusiones y tradición antioxidante.'
    ),
    etimo: L(
      '**Alecrim** deriva do latim *ros marinus* — «orvalho do mar» ( aroma resinoso costeiro). Reclassificado de *Rosmarinus* para *Salvia* (2017).',
      '**Rosemary** from Latin *ros marinus* — «dew of the sea». Reclassified from *Rosmarinus* to *Salvia* (2017).',
      '**Romero** del latín *ros marinus* — «rocío del mar». Reclasificado de *Rosmarinus* a *Salvia* (2017).'
    ),
    chemistry: [
      {
        marker: L('Ácido carnósico e carnosol', 'Carnosic acid and carnosol', 'Ácido carnósico y carnosol'),
        note: L(
          'Diterpenos fenólicos — potentes antioxidantes lipofílicos; marcadores do extrato padronizado.',
          'Phenolic diterpenes — potent lipophilic antioxidants; standardized extract markers.',
          'Diterpenos fenólicos — potentes antioxidantes lipofílicos; marcadores del extracto estandarizado.'
        ),
      },
      {
        marker: L('Ácido rosmarínico', 'Rosmarinic acid', 'Ácido rosmarínico'),
        note: L(
          'Fenólico hidrofílico — comum em folhas frescas e infusões curtas.',
          'Hydrophilic phenolic — common in fresh leaves and short infusions.',
          'Fenólico hidrofílico — común en hojas frescas e infusiones cortas.'
        ),
      },
      {
        marker: L('1,8-cineol (eucaliptol)', '1,8-cineole (eucalyptol)', '1,8-cineol (eucaliptol)'),
        note: L(
          'Monoterpeno do óleo essencial — aroma camphorado; estimulante circulatório leve (tópico/inhalado).',
          'Monoterpene in essential oil — camphoraceous aroma; mild circulatory stimulant (topical/inhaled).',
          'Monoterpeno del aceite esencial — aroma alcanforado; estimulante circulatorio leve.'
        ),
      },
      {
        marker: L('Flavonoides e terpenos menores', 'Flavonoids and minor terpenes', 'Flavonoides y terpenos menores'),
        note: L(
          'Perfil completo varia com clima e rega — horta doméstica vs wildcrafting.',
          'Full profile varies with climate and watering — home garden vs wildcrafting.',
          'Perfil completo varía con clima y riego — huerto doméstico vs recolección silvestre.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Culinária aromática', 'Aromatic cuisine', 'Cocina aromática'),
        frame: L(
          'Carnes, batatas, pães — exposição alimentar clássica mediterrânica adaptada ao Brasil.',
          'Meats, potatoes, breads — classic Mediterranean dietary exposure adapted to Brazil.',
          'Carnes, patatas, panes — exposición alimentaria mediterránea adaptada a Brasil.'
        ),
      },
      {
        theme: L('Chá estimulante leve', 'Mild stimulating tea', 'Infusión estimulante leve'),
        frame: L(
          'Manhãs — tradição de «clarear ideias»; contém estimulantes leves (não substitui café em dose).',
          'Mornings — tradition to «clear the mind»; mild stimulants (does not replace coffee at equivalent dose).',
          'Mañanas — tradición de «aclarar ideas»; estimulantes leves.'
        ),
      },
      {
        theme: L('Conservação antioxidante', 'Antioxidant preservation', 'Conservación antioxidante'),
        frame: L(
          'Folha em azeite ou sal — uso tradicional de preservação (carnósico retarda oxidação lipídica).',
          'Leaf in oil or salt — traditional preservation (carnosic delays lipid oxidation).',
          'Hoja en aceite o sal — uso tradicional de preservación (carnósico retarda oxidación lipídica).'
        ),
      },
    ],
    cautionsExtra: L(
      'Óleo essencial oral em dose alta pode convulsionar. Contraindicado em gravidez (emmenagogo tradicional). Interações teóricas com anticoagulantes e anti-hipertensivos em extratos concentrados.',
      'High-dose oral essential oil may cause seizures. Contraindicated in pregnancy (traditional emmenagogue). Theoretical interactions with anticoagulants and antihypertensives in concentrated extracts.',
      'Aceite esencial oral en dosis alta puede convulsionar. Contraindicado en embarazo. Interacciones teóricas con anticoagulantes.'
    ),
    links: [],
  },

  gengibre: {
    titleSuffix: L('gingeróis e rizoma picante', 'gingerols and pungent rhizome', 'jengibreoles y rizoma picante'),
    excerpt: L(
      '*Zingiber officinale* — gingeróis, shogaóis e uso digestivo/anti-náusea com tradição pan-asiática.',
      '*Zingiber officinale* — gingerols, shogaols and digestive/anti-nausea use with pan-Asian tradition.',
      '*Zingiber officinale* — jengibreoles, shogaoles y uso digestivo/antináusea de tradición panasiática.'
    ),
    etimo: L(
      '**Gengibre** vem do latim *zingiber*, emprestado do sânscrito *śṛṅgavera* (forma de chifre). Mesma família (Zingiberaceae) que a [cúrcuma](/posts/post-inspecao-planta-curcuma.html).',
      '**Ginger** from Latin *zingiber*, borrowed from Sanskrit *śṛṅgavera* (horn shape). Same family (Zingiberaceae) as [turmeric](/posts/post-inspecao-planta-curcuma.html).',
      '**Jengibre** del latín *zingiber*, del sánscrito *śṛṅgavera*. Misma familia (Zingiberaceae) que la [cúrcuma](/posts/post-inspecao-planta-curcuma.html).'
    ),
    chemistry: [
      {
        marker: L('Gingeróis (ex.: -6-gingerol)', 'Gingerols (e.g. 6-gingerol)', 'Jengibreoles (p. ej. 6-jengibreol)'),
        note: L(
          'Fenólicos picantes do rizoma fresco — anti-náusea e anti-inflamatório leve (estudos clínicos moderados).',
          'Pungent phenolics in fresh rhizome — anti-nausea and mild anti-inflammatory (moderate clinical studies).',
          'Fenólicos picantes del rizoma fresco — antináusea y antiinflamatorio leve (estudios clínicos moderados).'
        ),
      },
      {
        marker: L('Shogaóis (rizoma seco/cozido)', 'Shogaols (dried/cooked rhizome)', 'Shogaoles (rizoma seco/cocido)'),
        note: L(
          'Degradados dos gingeróis com aquecimento — maior picância e atividade antioxidante em seco.',
          'Gingerol degradation products with heat — greater pungency and antioxidant activity when dried.',
          'Degradados de jengibreoles con calor — mayor picor y actividad antioxidante en seco.'
        ),
      },
      {
        marker: L('Zingerona e terpenos voláteis', 'Zingerone and volatile terpenes', 'Zingerona y terpenos volátiles'),
        note: L(
          'Aroma doce após cozedura — marcador sensorial distinto do fresco.',
          'Sweet aroma after cooking — sensory marker distinct from fresh.',
          'Aroma dulce tras cocción — marcador sensorial distinto del fresco.'
        ),
      },
      {
        marker: L('Fibras e minerais', 'Fiber and minerals', 'Fibras y minerales'),
        note: L(
          'Magnésio, potássio e fibra insolúvel — contribuição nutricional do rizoma em pó ou fresco ralado.',
          'Magnesium, potassium and insoluble fiber — nutritional contribution of powdered or grated fresh rhizome.',
          'Magnesio, potasio y fibra insoluble — contribución nutricional del rizoma en polvo o fresco rallado.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Anti-náusea (gravidez, cinetose)', 'Anti-nausea (pregnancy, motion sickness)', 'Antináusea (embarazo, cinetosis)'),
        frame: L(
          'Rizoma em chá ou cápsula padronizada — evidência moderada; dose baixa e orientação pré-natal.',
          'Rhizome in tea or standardized capsule — moderate evidence; low dose and prenatal guidance.',
          'Rizoma en infusión o cápsula estandarizada — evidencia moderada; dosis baja y orientación prenatal.'
        ),
      },
      {
        theme: L('Digestivo e anti-inflamatório culinário', 'Culinary digestive and anti-inflammatory', 'Digestivo y antiinflamatorio culinario'),
        frame: L(
          'Cozinhas asiáticas e chás — exposição alimentar quotidiana como linha segura.',
          'Asian cuisines and teas — everyday dietary exposure as safe line.',
          'Cocinas asiáticas e infusiones — exposición alimentaria cotidiana como línea segura.'
        ),
      },
      {
        theme: L('Dor muscular leve pós-exercício', 'Mild post-exercise muscle pain', 'Dolor muscular leve post-ejercicio'),
        frame: L(
          'Extratos padronizados — estudos leves; comida picante ≠ suplemento.',
          'Standardized extracts — mild studies; spicy food ≠ supplement.',
          'Extractos estandarizados — estudios leves; comida picante ≠ suplemento.'
        ),
      },
    ],
    cautionsExtra: L(
      'Pode potencializar anticoagulantes e reduzir glicemia (monitorizar diabéticos). Cálculos biliares e úlcera activa — cautela. Interação com anti-hipertensivos em doses altas.',
      'May potentiate anticoagulants and lower blood sugar (monitor diabetics). Gallstones and active ulcer — caution. Interaction with antihypertensives at high doses.',
      'Puede potenciar anticoagulantes y reducir glucemia. Cálculos biliares y úlcera activa — precaución.'
    ),
    links: [
      {
        href: '/posts/post-inspecao-planta-curcuma.html',
        label: L(
          'Inspeção: Cúrcuma — açafrão-da-terra e curcumina',
          'Inspection: Turmeric — açafrão-da-terra and curcumin',
          'Inspección: Cúrcuma — açafrão-da-terra y curcumina'
        ),
      },
    ],
  },

  curcuma: {
    titleSuffix: L('açafrão-da-terra e curcumina', 'açafrão-da-terra and curcumin', 'açafrão-da-terra y curcumina'),
    excerpt: L(
      '*Curcuma longa* — açafrão-da-terra; curcumina, corante culinário e interesse anti-inflamatório (não é açafrão verdadeiro).',
      '*Curcuma longa* — açafrão-da-terra; curcumin, culinary dye and anti-inflammatory interest (not true saffron).',
      '*Curcuma longa* — açafrão-da-terra; curcumina, colorante culinario e interés antiinflamatorio (no es azafrán verdadero).'
    ),
    etimo: L(
      '**Cúrcuma** / **açafrão-da-terra** vem do árabe *kurkum* e do persa, referindo o colorante amarelo — **não** confundir com açafrão verdadeiro (*Crocus sativus*). Mesma família do [gengibre](/posts/post-inspecao-planta-gengibre.html) (Zingiberaceae).',
      '**Turmeric** / **açafrão-da-terra** from Arabic *kurkum* and Persian, referring to the yellow dye — **not** true saffron (*Crocus sativus*). Same family as [ginger](/posts/post-inspecao-planta-gengibre.html) (Zingiberaceae).',
      '**Cúrcuma** / **açafrão-da-terra** del árabe *kurkum* — **no** confundir con azafrán verdadero (*Crocus sativus*). Misma familia que el [jengibre](/posts/post-inspecao-planta-gengibre.html).'
    ),
    chemistry: [
      {
        marker: L('Curcumina (curcuminoides)', 'Curcumin (curcuminoids)', 'Curcumina (curcuminoides)'),
        note: L(
          '2–5% no rizoma seco — marcador amarelo; biodisponibilidade oral baixa sem piperina ou lipídios.',
          '2–5% in dry rhizome — yellow marker; low oral bioavailability without piperine or lipids.',
          '2–5% en rizoma seco — marcador amarillo; biodisponibilidad oral baja sin piperina o lípidos.'
        ),
      },
      {
        marker: L('Demetoxicurcumina e bisdemetoxicurcumina', 'Demethoxycurcumin and bisdemethoxycurcumin', 'Demetoxicurcumina y bisdemetoxicurcumina'),
        note: L(
          'Curcuminoides menores — modulam actividade antioxidante total do extrato.',
          'Minor curcuminoids — modulate total antioxidant activity of extract.',
          'Curcuminoides menores — modulan actividad antioxidante total del extracto.'
        ),
      },
      {
        marker: L('Óleo essencial (tumerona, atlantona)', 'Essential oil (turmerone, atlantone)', 'Aceite esencial (tumerona, atlantona)'),
        note: L(
          'Terpenos do rizoma — aroma terroso; sinergia com curcuminoides em extratos integrais.',
          'Rhizome terpenes — earthy aroma; synergy with curcuminoids in whole extracts.',
          'Terpenos del rizoma — aroma terroso; sinergia con curcuminoides en extractos integrales.'
        ),
      },
      {
        marker: L('Polissacarídeos e fibras', 'Polysaccharides and fiber', 'Polisacáridos y fibras'),
        note: L(
          'Fração não colorante do pó — relevante em uso culinário integral vs cápsula isolada.',
          'Non-dye fraction of powder — relevant in whole culinary use vs isolated capsule.',
          'Fracción no colorante del polvo — relevante en uso culinario integral vs cápsula aislada.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Tempero e corante culinário', 'Spice and culinary dye', 'Condimento y colorante culinario'),
        frame: L(
          'Arroz, caldos, curry — exposição alimentar quotidiana; linha de base mais prudente do laboratório.',
          'Rice, broths, curry — everyday dietary exposure; lab’s most prudent baseline.',
          'Arroz, caldos, curry — exposición alimentaria cotidiana; línea base más prudente.'
        ),
      },
      {
        theme: L('Conforto digestivo e leite dourado', 'Digestive comfort and golden milk', 'Conforto digestivo y leche dorada'),
        frame: L(
          'Chás e «golden milk» — tradição ayurvédica adaptada; combinar com gordura/pimenta para absorção.',
          'Teas and golden milk — adapted Ayurvedic tradition; combine with fat/pepper for absorption.',
          'Infusiones y «golden milk» — tradición ayurvédica adaptada; combinar con grasa/pimienta.'
        ),
      },
      {
        theme: L('Interesse anti-inflamatório (suplementos)', 'Anti-inflammatory interest (supplements)', 'Interés antiinflamatorio (suplementos)'),
        frame: L(
          'Extratos padronizados estudados em artrite leve — **não** equivalem a colher de pó na comida.',
          'Standardized extracts studied in mild arthritis — **not** equivalent to a spoonful in food.',
          'Extractos estandarizados estudiados en artritis leve — **no** equivalen a cucharada en comida.'
        ),
      },
    ],
    cautionsExtra: L(
      'Pode interagir com anticoagulantes e irritar vesícula biliar. Suplementos concentrados ≠ uso culinário. Não confundir com *Crocus sativus* (açafrão verdadeiro). Cautela na gravidez em doses altas.',
      'May interact with anticoagulants and irritate gallbladder. Concentrated supplements ≠ culinary use. Do not confuse with *Crocus sativus* (true saffron). Caution in pregnancy at high doses.',
      'Puede interactuar con anticoagulantes e irritar vesícula biliar. Suplementos concentrados ≠ uso culinario. No confundir con *Crocus sativus*.'
    ),
    links: [
      {
        href: '/posts/post-inspecao-planta-gengibre.html',
        label: L(
          'Inspeção: Gengibre — gingeróis e rizoma picante',
          'Inspection: Ginger — gingerols and pungent rhizome',
          'Inspección: Jengibre — jengibreoles y rizoma picante'
        ),
      },
    ],
  },

  'unha-de-gato': {
    titleSuffix: L('alcaloides oxindólicos', 'oxindole alkaloids', 'alcaloides oxindólicos'),
    excerpt: L(
      '*Uncaria tomentosa* — casca amazônica rica em alcaloides oxindólicos pentacíclicos; fitoterapia imunomoduladora popular.',
      '*Uncaria tomentosa* — Amazonian bark rich in pentacyclic oxindole alkaloids; popular immunomodulatory phytotherapy.',
      '*Uncaria tomentosa* — corteza amazónica rica en alcaloides oxindólicos pentacíclicos.'
    ),
    etimo: L(
      '**Unha-de-gato** descreve os ganchos curvos das folhas (como garras). O nome científico **Uncaria** vem do latim *uncus* (gancho). Também conhecida como **uña de gato** na América andina.',
      '**Cat\'s claw** describes the curved leaf hooks. **Uncaria** from Latin *uncus* (hook). Also **uña de gato** in the Andes.',
      '**Unha-de-gato** describe los ganchos curvos de las hojas. **Uncaria** del latín *uncus* (gancho).'
    ),
    chemistry: [
      { marker: L('Alcaloides oxindólicos pentacíclicos (POAs)', 'Pentacyclic oxindole alkaloids (POAs)', 'Alcaloides oxindólicos pentacíclicos (POAs)'), note: L('Marcadores da casca — mitraphyllina, isomitraphyllina; perfil imunomodulador estudado.', 'Bark markers — mitraphylline, isomitraphylline; studied immunomodulatory profile.', 'Marcadores de la corteza — mitrafilina; perfil inmunomodulador estudiado.') },
      { marker: L('Alcaloides oxindólicos tetracíclicos (TOAs)', 'Tetracyclic oxindole alkaloids (TOAs)', 'Alcaloides oxindólicos tetracíclicos (TOAs)'), note: L('Rhynchophyllina e isorhynchophyllina — atividade diferente dos POAs; padronização importa.', 'Rhynchophylline and isorhynchophylline — different activity from POAs; standardization matters.', 'Rincofilina — actividad diferente de los POAs.') },
      { marker: L('Polifenóis e taninos', 'Polyphenols and tannins', 'Polifenoles y taninos'), note: L('Fração antioxidante da casca — complementa alcaloides em extratos integrais.', 'Antioxidant bark fraction — complements alkaloids in whole extracts.', 'Fracción antioxidante — complementa alcaloides.') },
      { marker: L('Quinovic acid glycosides', 'Quinovic acid glycosides', 'Glicósidos de ácido quinóvico'), note: L('Triterpenos glicosilados — anti-inflamatório leve em modelos experimentais.', 'Glycosylated triterpenes — mild anti-inflammatory in experimental models.', 'Triterpenos glicosilados — antiinflamatorio leve.') },
    ],
    uses: [
      { theme: L('Imunomodulação (tradição)', 'Immunomodulation (tradition)', 'Inmunomodulación (tradición)'), frame: L('Chás e cápsulas de casca — tradição andino-amazônica; estudos mistos em defesas imunitárias.', 'Bark teas and capsules — Andean-Amazonian tradition; mixed studies on immune defenses.', 'Infusiones y cápsulas — tradición andino-amazónica.') },
      { theme: L('Anti-inflamatório leve', 'Mild anti-inflammatory', 'Antiinflamatorio leve'), frame: L('Artrose e dores articulares leves — extratos padronizados; não substituir DMARDs.', 'Mild joint pain — standardized extracts; does not replace DMARDs.', 'Dolor articular leve — extractos estandarizados.') },
      { theme: L('Fitoterápico industrial', 'Industrial phytotherapeutic', 'Fitoterápico industrial'), frame: L('Produtos registrados no Brasil — comparar POA/TOA declarados no rótulo.', 'Registered products in Brazil — compare declared POA/TOA on label.', 'Productos registrados — comparar POA/TOA en etiqueta.') },
    ],
    cautionsExtra: L('Contraindicada em transplantes, autoimunes activos e gravidez. Pode interagir com imunossupressores e anticoagulantes. Espécies *Uncaria* diferem — confirmar *U. tomentosa*.', 'Contraindicated in transplants, active autoimmunity and pregnancy. May interact with immunosuppressants and anticoagulants.', 'Contraindicada en trasplantes y embarazo.'),
    links: [],
  },

  sucupira: {
    titleSuffix: L('furanoditerpenos do Cerrado', 'Cerrado furanoditerpenes', 'furanoditerpenos del Cerrado'),
    excerpt: L('*Pterodon emarginatus* — sementes e óleo fixo do Cerrado; furanoditerpenos (sucupirins) na medicina popular.', '*Pterodon emarginatus* — Cerrado seeds and fixed oil; furanoditerpenes in folk medicine.', '*Pterodon emarginatus* — semillas y aceite del Cerrado; furanoditerpenos.'),
    etimo: null,
    chemistry: [
      { marker: L('Furanoditerpenos (sucupirins A–D)', 'Furanoditerpenes (sucupirins A–D)', 'Furanoditerpenos (sucupirins A–D)'), note: L('Marcadores lipofílicos das sementes — atividade analgésica/anti-inflamatória em modelos animais.', 'Lipophilic seed markers — analgesic/anti-inflammatory in animal models.', 'Marcadores lipofílicos — analgésico/antiinflamatorio en animales.') },
      { marker: L('Óleo fixo das sementes', 'Seed fixed oil', 'Aceite fijo de semillas'), note: L('Ácidos graxos insaturados — base de preparações tópicas tradicionais.', 'Unsaturated fatty acids — base of traditional topical preparations.', 'Ácidos grasos insaturados — base de preparaciones tópicas.') },
      { marker: L('Flavonoides e fenólicos', 'Flavonoids and phenolics', 'Flavonoides y fenólicos'), note: L('Fração polar do extrato — antioxidante complementar.', 'Polar extract fraction — complementary antioxidant.', 'Fracción polar — antioxidante complementario.') },
      { marker: L('Lignanas', 'Lignans', 'Lignanas'), note: L('Compostos fenólicos menores nas sementes — perfil químico distintivo do género.', 'Minor phenolic compounds in seeds — distinctive genus profile.', 'Compuestos fenólicos menores — perfil distintivo del género.') },
    ],
    uses: [
      { theme: L('Analgésico popular (tópico/oral)', 'Popular analgesic (topical/oral)', 'Analgésico popular (tópico/oral)'), frame: L('Óleo e chá de sementes — tradição do Centro-Oeste; estudos em dor articular (pré-clínico).', 'Seed oil and tea — Midwest Brazil tradition; joint pain studies (preclinical).', 'Aceite e infusión — tradición del Centro-Oeste.') },
      { theme: L('Anti-inflamatório tópico', 'Topical anti-inflammatory', 'Antiinflamatorio tópico'), frame: L('Massagens com óleo — prática doméstica; não substituir AINE prescrito.', 'Oil massages — home practice; does not replace prescribed NSAIDs.', 'Masajes con aceite — práctica doméstica.') },
      { theme: L('Cosmética regional', 'Regional cosmetics', 'Cosmética regional'), frame: L('Sabonetes e pomadas artesanais — identificar origem sustentável das sementes.', 'Artisanal soaps and ointments — identify sustainable seed sourcing.', 'Jabones y pomadas artesanales.') },
    ],
    cautionsExtra: L('Sementes têm toxicidade em altas doses (estudos animais). Evitar gravidez e lactação. Produtos artesanais variam muito em concentração de furanoditerpenos.', 'Seeds toxic at high doses (animal studies). Avoid pregnancy and nursing. Artisanal products vary widely.', 'Semillas tóxicas en altas dosis. Evitar embarazo y lactancia.'),
    links: [],
  },

  copaiba: {
    titleSuffix: L('óleo-resina e β-cariofileno', 'oleoresin and β-caryophyllene', 'oleorresina y β-cariofileno'),
    excerpt: L('*Copaifera langsdorffii* — óleo-resina amazônica; β-cariofileno e ácidos copaíbicos na tradição tópica e oral.', '*Copaifera langsdorffii* — Amazonian oleoresin; β-caryophyllene and copaiba acids in topical/oral tradition.', '*Copaifera langsdorffii* — oleorresina amazónica; β-cariofileno y ácidos copaíbicos.'),
    etimo: L('**Copaíba** é nome de origem tupi (*cupá-íba*, «árvore que exsuda resina»). O óleo é obtido por perfuração do tronco — prática florestal tradicional.', '**Copaiba** from Tupi (*cupá-íba*, «tree that exudes resin»). Oil obtained by trunk tapping — traditional forest practice.', '**Copaíba** de origen tupí (*cupá-íba*, «árbol que exuda resina»).'),
    chemistry: [
      { marker: L('β-cariofileno', 'β-caryophyllene', 'β-cariofileno'), note: L('Sesquiterpeno majoritário — agonista CB2 (estudos); anti-inflamatório leve documentado.', 'Major sesquiterpene — CB2 agonist (studies); documented mild anti-inflammatory.', 'Sesquiterpeno mayoritario — agonista CB2; antiinflamatorio leve.') },
      { marker: L('Ácidos copaíbicos (copaíferólicos)', 'Copaiba acids (copaiferolic)', 'Ácidos copaíbicos'), note: L('Diterpenos ácidos na resina — marcadores de autenticidade do óleo.', 'Acid diterpenes in resin — oil authenticity markers.', 'Diterpenos ácidos — marcadores de autenticidad.') },
      { marker: L('α-copaeno e α-bergamoteno', 'α-copaene and α-bergamotene', 'α-copaeno y α-bergamoteno'), note: L('Terpenos voláteis — perfil aromático característico.', 'Volatile terpenes — characteristic aroma profile.', 'Terpenos volátiles — perfil aromático característico.') },
      { marker: L('Resina e fração insaponificável', 'Resin and unsaponifiable fraction', 'Resina y fracción insaponificable'), note: L('Base lipídica complexa — qualidade varia com espécie e região de colheita.', 'Complex lipid base — quality varies by species and harvest region.', 'Base lipídica compleja — calidad varía con especie y región.') },
    ],
    uses: [
      { theme: L('Anti-inflamatório tópico', 'Topical anti-inflammatory', 'Antiinflamatorio tópico'), frame: L('Óleo diluído em pele e mucosas (tradição) — estudos em dermatite e cicatrização leve.', 'Diluted oil on skin (tradition) — studies on dermatitis and mild wound healing.', 'Aceite diluido — estudios en dermatitis.') },
      { theme: L('Uso oral tradicional (gargarejo/chá)', 'Traditional oral use (gargle/tea)', 'Uso oral tradicional'), frame: L('Gotas em água — tradição para vias respiratórias; dose baixa e óleo de qualidade verificada.', 'Drops in water — respiratory tradition; low dose and verified quality oil.', 'Gotas en agua — tradición respiratoria; dosis baja.') },
      { theme: L('Cosmética e sabonetes', 'Cosmetics and soaps', 'Cosmética y jabones'), frame: L('Indústria e artesanato — verificar pureza (adulteração com óleos baratos é risco).', 'Industry and crafts — verify purity (adulteration with cheap oils is a risk).', 'Industria y artesanía — verificar pureza.') },
    ],
    cautionsExtra: L('Óleo puro irrita mucosas e pode causar gastrite. Contraindicado em gravidez e crianças pequenas sem orientação. Verificar espécie e ausência de solventes industriais.', 'Pure oil irritates mucous membranes and may cause gastritis. Contraindicated in pregnancy and young children without guidance.', 'Aceite puro irrita mucosas. Contraindicado en embarazo sin orientación.'),
    links: [],
  },

  andiroba: {
    titleSuffix: L('limonoides e óleo amazônico', 'limonoids and Amazonian oil', 'limonoides y aceite amazónico'),
    excerpt: L('*Carapa guianensis* — óleo de sementes rico em limonoides (andirobina); tradição tópica e repelente.', '*Carapa guianensis* — seed oil rich in limonoids (andirobin); topical and repellent tradition.', '*Carapa guianensis* — aceite de semillas rico en limonoides.'),
    etimo: L('**Andiroba** vem do tupi *nhandiroba* (nhandi = óleo + roba = amargo) — «óleo amargo».', '**Andiroba** from Tupi *nhandiroba* (nhandi = oil + roba = bitter) — «bitter oil».', '**Andiroba** del tupí *nhandiroba* — «aceite amargo».'),
    chemistry: [
      { marker: L('Limonoides (andirobina, gedunina)', 'Limonoids (andirobin, gedunin)', 'Limonoides (andirobina, gedunina)'), note: L('Triterpenos amargos das sementes — repelência de insetos e anti-inflamatório (estudos).', 'Bitter seed triterpenes — insect repellency and anti-inflammatory (studies).', 'Triterpenos amargos — repelencia de insectos.') },
      { marker: L('Ácidos graxos (oleico, palmitico)', 'Fatty acids (oleic, palmitic)', 'Ácidos grasos (oleico, palmítico)'), note: L('Base do óleo prensado — emoliente tópico tradicional.', 'Cold-pressed oil base — traditional topical emollient.', 'Base del aceite prensado — emoliente tópico.') },
      { marker: L('Triterpenos (crudeína)', 'Triterpenes (crudein)', 'Triterpenos (crudeína)'), note: L('Compostos menores — contribuem para perfil amargo e actividade biológica.', 'Minor compounds — contribute to bitter profile and bioactivity.', 'Compuestos menores — perfil amargo.') },
      { marker: L('Tocoferóis (vitamina E)', 'Tocopherols (vitamin E)', 'Tocoferoles (vitamina E)'), note: L('Antioxidante natural do óleo — estabilidade e cuidado cutâneo.', 'Natural oil antioxidant — stability and skin care.', 'Antioxidante natural — cuidado cutáneo.') },
    ],
    uses: [
      { theme: L('Repelente de insetos', 'Insect repellent', 'Repelente de insectos'), frame: L('Óleo aplicado na pele — tradição amazônica; estudos confirman actividade contra mosquitos.', 'Oil on skin — Amazonian tradition; studies confirm mosquito activity.', 'Aceite en piel — tradición amazónica.') },
      { theme: L('Emoliente e cicatrização tópica', 'Emollient and topical healing', 'Emoliente y cicatrización tópica'), frame: L('Pomadas e sabonetes — uso doméstico; não substituir tratamento de feridas infectadas.', 'Ointments and soaps — home use; does not replace infected wound treatment.', 'Pomadas y jabones — uso doméstico.') },
      { theme: L('Cosmética natural', 'Natural cosmetics', 'Cosmética natural'), frame: L('Indústria de base florestal — preferir cadeias com rastreabilidade e manejo sustentável.', 'Forest-based industry — prefer traceable sustainable chains.', 'Industria forestal — cadenas sostenibles.') },
    ],
    cautionsExtra: L('Uso oral tradicional existe mas exige orientação — limonoides podem ser irritantes. Testar alergia cutânea. Evitar contacto com olhos.', 'Traditional oral use exists but requires guidance — limonoids may be irritant. Patch-test. Avoid eye contact.', 'Uso oral exige orientación. Probar alergia cutánea.'),
    links: [],
  },

  jambu: {
    titleSuffix: L('espilanthol e anestesia oral', 'spilanthol and oral numbing', 'espilantol y anestesia oral'),
    excerpt: L('*Acmella oleracea* — alquilamidas (espilanthol) causam dormência oral; erva da culinária paraense.', '*Acmella oleracea* — alkylamides (spilanthol) cause oral numbing; Pará cuisine herb.', '*Acmella oleracea* — alquilamidas (espilantol) y cocina paraense.'),
    etimo: L('**Jambu** é nome tupi (*jambú*) para a planta e pratos que a usam. Também **agrião-do-pará** ou **paracress** em inglês.', '**Jambu** is Tupi (*jambú*) for the plant and dishes using it. Also **paracress** in English.', '**Jambu** es tupí (*jambú*). También **paracress** en inglés.'),
    chemistry: [
      { marker: L('Espilanthol (alquilamida)', 'Spilanthol (alkylamide)', 'Espilantol (alquilamida)'), note: L('Principal composto bioactivo — bloqueio de canais de sódio (sensação anestésica).', 'Main bioactive compound — sodium channel block (numbing sensation).', 'Compuesto bioactivo principal — bloqueo de canales de sodio.') },
      { marker: L('Outras alquilamidas (ex.: spilanthol)', 'Other alkylamides', 'Otras alquilamidas'), note: L('Família de N-isobutilamidas — perfil picante/anestésico variável por parte da planta.', 'N-isobutylamide family — pungent/numbing profile varies by plant part.', 'Familia de N-isobutilamidas — perfil variable.') },
      { marker: L('Flavonoides e triterpenos', 'Flavonoids and triterpenes', 'Flavonoides y triterpenos'), note: L('Fração polar — antioxidante complementar às alquilamidas.', 'Polar fraction — antioxidant complement to alkylamides.', 'Fracción polar — antioxidante complementario.') },
      { marker: L('Clorofila e carotenóides', 'Chlorophyll and carotenoids', 'Clorofila y carotenoides'), note: L('Folhas frescas — contribuição nutricional em pratos crus (tacacá).', 'Fresh leaves — nutritional contribution in raw dishes (tacacá).', 'Hojas frescas — pratos crudos (tacacá).') },
    ],
    uses: [
      { theme: L('Culinária paraense (tacacá)', 'Pará cuisine (tacacá)', 'Cocina paraense (tacacá)'), frame: L('Folhas e flores frescas — sabor anestésico característico; exposição alimentar regional.', 'Fresh leaves and flowers — characteristic numbing flavor; regional dietary exposure.', 'Hojas y flores frescas — sabor anestésico característico.') },
      { theme: L('Salivação e apetite', 'Salivation and appetite', 'Salivación y apetito'), frame: L('Tradição de estimular saliva e apetite — efeito gustativo, não clínico.', 'Tradition to stimulate saliva and appetite — gustatory effect, not clinical.', 'Tradición de estimular saliva — efecto gustativo.') },
      { theme: L('Analgésico oral leve (tradição)', 'Mild oral analgesic (tradition)', 'Analgésico oral leve (tradición)'), frame: L('Mastigar folha para dor de dente leve — prática popular; procurar dentista se persistir.', 'Chewing leaf for mild toothache — folk practice; see dentist if persistent.', 'Masticar hoja para dolor de muela — práctica popular.') },
    ],
    cautionsExtra: L('Evitar em crianças pequenas e alérgicos a Asteraceae. Extratos concentrados podem irritar mucosas. Não substituir anestésico dentário profissional.', 'Avoid in young children and Asteraceae allergy. Concentrated extracts may irritate mucous membranes.', 'Evitar en niños pequeños y alérgicos a Asteraceae.'),
    links: [],
  },

  mulungu: {
    titleSuffix: L('alcaloides eritrínicos calmantes', 'erythrinine calming alkaloids', 'alcaloides eritrínicos calmantes'),
    excerpt: L('*Erythrina mulungu* — casca com alcaloides eritrínicos; chá calmante da tradição brasileira.', '*Erythrina mulungu* — bark with erythrinine alkaloids; calming tea in Brazilian tradition.', '*Erythrina mulungu* — corteza con alcaloides eritrínicos; infusión calmante.'),
    etimo: L('**Mulungu** é nome indígena brasileiro (tupi-guarani) para árvores do género *Erythrina* — «mulungu» designa várias espécies; confirmar *E. mulungu*.', '**Mulungu** is Brazilian indigenous (Tupi-Guarani) for *Erythrina* trees — confirm *E. mulungu* species.', '**Mulungu** es nombre indígena brasileño para *Erythrina*.'),
    chemistry: [
      { marker: L('Alcaloides eritrínicos (eritravina, ertravina)', 'Erythrinine alkaloids (erythravine, ertravine)', 'Alcaloides eritrínicos'), note: L('Marcadores da casca — actividade ansiolítica/sedativa em modelos animais.', 'Bark markers — anxiolytic/sedative activity in animal models.', 'Marcadores de la corteza — actividad ansiolítica en animales.') },
      { marker: L('Flavonoides e isoflavonas', 'Flavonoids and isoflavones', 'Flavonoides e isoflavonas'), note: L('Fração fenólica — modulação complementar aos alcaloides.', 'Phenolic fraction — complementary modulation to alkaloids.', 'Fracción fenólica — modulación complementaria.') },
      { marker: L('Triterpenos e esteróis', 'Triterpenes and sterols', 'Triterpenos y esteroles'), note: L('Compostos menores no extrato integral da casca.', 'Minor compounds in whole bark extract.', 'Compuestos menores en extracto integral.') },
      { marker: L('Saponinas (traço)', 'Saponins (trace)', 'Saponinas (traza)'), note: L('Presentes em baixa concentração — relevância toxicológica em overdoses.', 'Low concentration — toxicological relevance in overdose.', 'Baja concentración — relevancia en sobredosis.') },
    ],
    uses: [
      { theme: L('Chá calmante e sono', 'Calming tea and sleep', 'Infusión calmante y sueño'), frame: L('Decocto de casca — tradição popular para ansiedade leve e insónia; dose baixa e ocasional.', 'Bark decoction — folk tradition for mild anxiety and insomnia; low occasional dose.', 'Decocción de corteza — ansiedad leve e insomnio.') },
      { theme: L('Relaxamento muscular leve', 'Mild muscle relaxation', 'Relajación muscular leve'), frame: L('Estudos pré-clínicos — **não** equivale a benzodiazepínico prescrito.', 'Preclinical studies — **not** equivalent to prescribed benzodiazepine.', 'Estudios preclínicos — **no** equivale a benzodiazepina.') },
      { theme: L('Fitoterápico registrado', 'Registered phytotherapeutic', 'Fitoterápico registrado'), frame: L('Presente em produtos industrializados — preferir formulações declaradas.', 'Present in industrial products — prefer declared formulations.', 'Productos industrializados — formulaciones declaradas.') },
    ],
    cautionsExtra: L('**Potencializa sedativos e álcool** — risco de sonolência excessiva. Contraindicado em gravidez, lactação e depressão respiratória. Espécies *Erythrina* têm alcaloides tóxicos em sementes — usar só casca identificada.', '**Potentiates sedatives and alcohol** — excess drowsiness risk. Contraindicated in pregnancy, nursing and respiratory depression.', '**Potencia sedantes y alcohol**. Contraindicado en embarazo.'),
    links: [],
  },

  maracuja: {
    titleSuffix: L('flavonoides e passiflorina', 'flavonoids and passiflorine', 'flavonoides y passiflorina'),
    excerpt: L('*Passiflora incarnata* — flavonoides e alcaloides traço; chá calmante clássico da fitoterapia.', '*Passiflora incarnata* — flavonoids and trace alkaloids; classic calming phytotherapy tea.', '*Passiflora incarnata* — flavonoides; infusión calmante clásica.'),
    etimo: L('**Maracujá** vem do tupi *moroti guaçu* («fruto que come no prato») ou *mará kuya* — nome indígena para passifloras. *Incarnata* = encarnada (cor das flores).', '**Passionflower** from Tupi *mará kuya*. *Incarnata* = flesh-colored (flowers).', '**Maracuyá** del tupí *mará kuya*. *Incarnata* = encarnada.'),
    chemistry: [
      { marker: L('Flavonoides (vitexina, isovitexina)', 'Flavonoids (vitexin, isovitexin)', 'Flavonoides (vitexina, isovitexina)'), note: L('Marcadores das partes aéreas — ligação a actividade ansiolítica leve (estudos).', 'Aerial part markers — link to mild anxiolytic activity (studies).', 'Marcadores de partes aéreas — actividad ansiolítica leve.') },
      { marker: L('Alcaloides harmanos (traço)', 'Harmala alkaloids (trace)', 'Alcaloides harmanos (traza)'), note: L('Presentes em baixíssima concentração vs *Banisteriopsis* — relevância clínica limitada em chá.', 'Very low concentration vs *Banisteriopsis* — limited clinical relevance in tea.', 'Muy baja concentración — relevancia clínica limitada en infusión.') },
      { marker: L('Passiflorina (glucosídeo)', 'Passiflorine (glucoside)', 'Passiflorina (glucósido)'), note: L('Composto histórico citado — identidade química debatida; hoje agrupado em flavonoides.', 'Historically cited compound — debated identity; now grouped with flavonoids.', 'Compuesto histórico — identidad debatida.') },
      { marker: L('Maltol e cumarinas', 'Maltol and coumarins', 'Maltol y cumarinas'), note: L('Contribuição aromática da infusão — sabor doce-característico.', 'Aromatic contribution of infusion — characteristic sweet flavor.', 'Contribución aromática — sabor dulce característico.') },
    ],
    uses: [
      { theme: L('Chá calmante e sono', 'Calming tea and sleep', 'Infusión calmante y sueño'), frame: L('Infusão vespertina — evidência moderada em insónia leve; fitoterápicos industrializados padronizados.', 'Evening infusion — moderate evidence in mild insomnia; standardized industrial products.', 'Infusión vespertina — evidencia moderada en insomnio leve.') },
      { theme: L('Ansiedade leve', 'Mild anxiety', 'Ansiedad leve'), frame: L('Estudos clínicos pequenos — **não** substituem psicoterapia ou ISRS prescrito.', 'Small clinical studies — **do not** replace psychotherapy or prescribed SSRI.', 'Estudios clínicos pequeños — **no** sustituyen psicoterapia.') },
      { theme: L('Combinação com outras calmantes', 'Combination with other calmants', 'Combinación con otras calmantes'), frame: L('Frequentemente misturada com melissa ou valeriana — somar efeitos sedativos com cautela.', 'Often mixed with lemon balm or valerian — add sedative effects cautiously.', 'Mezclada con melisa o valeriana — sumar efectos sedantes con cautela.') },
    ],
    cautionsExtra: L('Potencializa sedativos, álcool e ansiolíticos. Contraindicado em gravidez (estudos limitados). Não operar maquinaria após doses altas. Diferenciar *P. incarnata* de passifloras ornamentais.', 'Potentiates sedatives, alcohol and anxiolytics. Contraindicated in pregnancy. Do not operate machinery after high doses.', 'Potencia sedantes y alcohol. Contraindicado en embarazo.'),
    links: [],
  },

  calendula: {
    titleSuffix: L('flavonoides e pomadas cutâneas', 'flavonoids and skin ointments', 'flavonoides y pomadas cutáneas'),
    excerpt: L('*Calendula officinalis* — pétalas ricas em triterpenos e flavonoides; uso tópico em pele irritada.', '*Calendula officinalis* — petals rich in triterpenes and flavonoids; topical use for irritated skin.', '*Calendula officinalis* — pétalos ricos en triterpenos y flavonoides.'),
    etimo: L('**Calêndula** do latim *calendae* (calendas) — flor que «floresce todo o mês». **Officinalis** = da farmácia.', '**Calendula** from Latin *calendae* (calends) — flower blooming every month. **Officinalis** = of the pharmacy.', '**Caléndula** del latín *calendae* — flor que florece todo el mes.'),
    chemistry: [
      { marker: L('Triterpenos (faradiol, calendulósido)', 'Triterpenes (faradiol, calenduloside)', 'Triterpenos (faradiol, calendulósido)'), note: L('Marcadores das pétalas — anti-inflamatório tópico documentado.', 'Petal markers — documented topical anti-inflammatory.', 'Marcadores de pétalos — antiinflamatorio tópico.') },
      { marker: L('Flavonoides e carotenóides', 'Flavonoids and carotenoids', 'Flavonoides y carotenoides'), note: L('Luteína e β-caroteno — cor alaranjada e actividade antioxidante.', 'Lutein and β-carotene — orange color and antioxidant activity.', 'Luteína y β-caroteno — color anaranjado.') },
      { marker: L('Saboninas', 'Saponins', 'Saponinas'), note: L('Contribuem para espuma em extratos — irritação possível em pele sensível.', 'Contribute to extract foaming — possible irritation on sensitive skin.', 'Contribuyen a espuma — irritación posible en piel sensible.') },
      { marker: L('Polissacarídeos e mucilagem', 'Polysaccharides and mucilage', 'Polisacáridos y mucílagos'), note: L('Fração hidratante em pomadas e cremes.', 'Hydrating fraction in ointments and creams.', 'Fracción hidratante en pomadas.') },
    ],
    uses: [
      { theme: L('Pomadas e cremes cutâneos', 'Skin ointments and creams', 'Pomadas y cremas cutáneas'), frame: L('Irritação, assaduras, pequenas feridas — evidência moderada tópica; produtos registrados preferíveis.', 'Irritation, diaper rash, minor wounds — moderate topical evidence; registered products preferred.', 'Irritación, rozaduras — evidencia tópica moderada.') },
      { theme: L('Infusão leve (oral)', 'Mild oral infusion', 'Infusión leve (oral)'), frame: L('Chá de pétalas — tradição digestiva europeia; dose baixa e ocasional.', 'Petal tea — European digestive tradition; low occasional dose.', 'Infusión de pétalos — tradición digestiva europea.') },
      { theme: L('Cosmética caseira', 'Home cosmetics', 'Cosmética casera'), frame: L('Óleo macerado de pétalas — identificar alergia a Asteraceae antes de uso amplo.', 'Macerated petal oil — identify Asteraceae allergy before wide use.', 'Aceite macerado — alergia a Asteraceae.') },
    ],
    cautionsExtra: L('Alergia a Asteraceae (margarida, camomila) contraindica uso. Não aplicar em feridas profundas ou infectadas sem orientação. Uso interno em dose alta desaconselhado.', 'Asteraceae allergy contraindicates use. Do not apply to deep or infected wounds without guidance.', 'Alergia a Asteraceae contraindica uso.'),
    links: [],
  },

  barbatimao: {
    titleSuffix: L('proantocianidinas adstringentes', 'astringent proanthocyanidins', 'proantocianidinas adstringentes'),
    excerpt: L('*Stryphnodendron adstringens* — casca rica em taninos e proantocianidinas; adstringente do Cerrado.', '*Stryphnodendron adstringens* — bark rich in tannins and proanthocyanidins; Cerrado astringent.', '*Stryphnodendron adstringens* — corteza rica en taninos y proantocianidinas.'),
    etimo: null,
    chemistry: [
      { marker: L('Proantocianidinas (condensadas)', 'Proanthocyanidins (condensed)', 'Proantocianidinas (condensadas)'), note: L('Polímeros fenólicos da casca — actividade adstringente e anti-inflamatória (estudos).', 'Bark phenolic polymers — astringent and anti-inflammatory activity (studies).', 'Polímeros fenólicos — actividad adstringente e antiinflamatoria.') },
      { marker: L('Taninos hidrolisáveis', 'Hydrolysable tannins', 'Taninos hidrolizables'), note: L('Contribuem para sabor amargo-adstringente do decocto.', 'Contribute to bitter-astringent decoction taste.', 'Contribuyen al sabor amargo-adstringente.') },
      { marker: L('Flavonoides (quercetina, rutina)', 'Flavonoids (quercetin, rutin)', 'Flavonoides (quercetina, rutina)'), note: L('Fração polar — antioxidante complementar.', 'Polar fraction — complementary antioxidant.', 'Fracción polar — antioxidante complementario.') },
      { marker: L('Saponinas e esteróis', 'Saponins and sterols', 'Saponinas y esteroles'), note: L('Compostos menores — variam com idade da árvore e estação.', 'Minor compounds — vary with tree age and season.', 'Compuestos menores — varían con edad del árbol.') },
    ],
    uses: [
      { theme: L('Adstringente tópico e oral', 'Topical and oral astringent', 'Adstringente tópico y oral'), frame: L('Decocto de casca — tradição para diarreia leve, gargarejo e feridas superficiais.', 'Bark decoction — tradition for mild diarrhea, gargle and superficial wounds.', 'Decocción — diarrea leve, gárgaras y heridas superficiales.') },
      { theme: L('Cicatrização de feridas', 'Wound healing', 'Cicatrización de heridas'), frame: L('Lavagens e compressas — estudos em úlceras cutâneas leves; não substituir antibiótico se infectada.', 'Washes and compresses — studies on mild skin ulcers.', 'Lavados y compresas — úlceras cutáneas leves.') },
      { theme: L('Fitoterápico industrial', 'Industrial phytotherapeutic', 'Fitoterápico industrial'), frame: L('Produtos padronizados por proantocianidinas — comparar com chá artesanal.', 'Products standardized by proanthocyanidins — compare with artisanal tea.', 'Productos estandarizados por proantocianidinas.') },
    ],
    cautionsExtra: L('Decoctos concentrados irritam mucosas. Contraindicado em obstrução intestinal e gravidez. Uso prolongado pode reduzir absorção de minerais.', 'Concentrated decoctions irritate mucous membranes. Contraindicated in intestinal obstruction and pregnancy.', 'Decocciones concentradas irritan mucosas. Contraindicado en embarazo.'),
    links: [],
  },

  jaborandi: {
    titleSuffix: L('pilocarpina e glaucoma histórico', 'pilocarpine and historical glaucoma', 'pilocarpina y glaucoma histórico'),
    excerpt: L('*Pilocarpus microphyllus* — folhas fonte histórica de pilocarpina; alcaloide imidazólico miótico.', '*Pilocarpus microphyllus* — historical pilocarpine source; miotic imidazole alkaloid.', '*Pilocarpus microphyllus* — fuente histórica de pilocarpina.'),
    etimo: L('**Jaborandi** vem do tupi *yabor-andi* («quem faz salivar») — efeito colateral clássico da pilocarpina.', '**Jaborandi** from Tupi *yabor-andi* («what makes one salivate») — classic pilocarpine side effect.', '**Jaborandi** del tupí *yabor-andi* («lo que hace salivar»).'),
    chemistry: [
      { marker: L('Pilocarpina', 'Pilocarpine', 'Pilocarpina'), note: L('Alcaloide imidazólico principal — agonista muscarínico; extraído historicamente das folhas secas.', 'Main imidazole alkaloid — muscarinic agonist; historically extracted from dried leaves.', 'Alcaloide imidazólico principal — agonista muscarínico.') },
      { marker: L('Isopilocarpina e pilosina', 'Isopilocarpine and pilosine', 'Isopilocarpina y pilosina'), note: L('Alcaloides menores — perfil farmacológico distinto da pilocarpina pura.', 'Minor alkaloids — pharmacological profile distinct from pure pilocarpine.', 'Alcaloides menores — perfil distinto de pilocarpina pura.') },
      { marker: L('Flavonoides e óleo essencial', 'Flavonoids and essential oil', 'Flavonoides y aceite esencial'), note: L('Fração não alcaloídica das folhas — irrelevante para uso farmacológico histórico.', 'Non-alkaloid leaf fraction — irrelevant for historical pharmacological use.', 'Fracción no alcaloide — irrelevante para uso farmacológico.') },
      { marker: L('Ácido pilocárpico (traço)', 'Pilocarpic acid (trace)', 'Ácido pilocárpico (traza)'), note: L('Metabolito/impureza de interesse analítico na padronização.', 'Metabolite/impurity of analytical interest in standardization.', 'Metabolito de interés analítico.') },
    ],
    uses: [
      { theme: L('Glaucoma e xeroftalmia (histórico/farmacológico)', 'Glaucoma and xerophthalmia (historical/pharmacological)', 'Glaucoma y xeroftalmia (histórico/farmacológico)'), frame: L('Pilocarpina sintética/isolada substitui chá de folha — **uso clínico exige prescrição**.', 'Synthetic/isolated pilocarpine replaces leaf tea — **clinical use requires prescription**.', 'Pilocarpina sintética sustituye infusión — **uso clínico exige prescripción**.') },
      { theme: L('Estimulante salivar (sicca)', 'Salivary stimulant (sicca)', 'Estimulante salival (sicca)'), frame: L('Indicação moderna da pilocarpina — não replicável com chá não padronizado.', 'Modern pilocarpine indication — not replicable with non-standardized tea.', 'Indicación moderna — no replicable con infusión no estandarizada.') },
      { theme: L('Referência etnobotânica amazônica', 'Amazonian ethnobotanical reference', 'Referencia etnobotánica amazónica'), frame: L('Planta-símbolo da farmacognosia brasileira — valor educacional e histórico.', 'Symbol plant of Brazilian pharmacognosy — educational and historical value.', 'Planta-símbolo de farmacognosia brasileña.') },
    ],
    cautionsExtra: L('**Não automedicar.** Pilocarpina causa salivação, sudorese, bradicardia e broncoespasmo. Planta bruta tem concentração imprevisível. Uso restrito a contexto profissional e molécula isolada prescrita.', '**Do not self-medicate.** Pilocarpine causes salivation, sweating, bradycardia and bronchospasm. Raw plant has unpredictable concentration.', '**No automedicarse.** Pilocarpina causa salivación, sudoración y broncoespasmo.'),
    links: [],
  },

  ipecacuanha: {
    titleSuffix: L('emetina e xarope histórico', 'emetine and historical syrup', 'emetina y jarabe histórico'),
    excerpt: L('*Carapichea ipecacuanha* — raiz com emetina e cephaeline; farmacopeia histórica como emético e antiamébico.', '*Carapichea ipecacuanha* — root with emetine and cephaeline; historical pharmacopeia emetic and amebicide.', '*Carapichea ipecacuanha* — raíz con emetina y cefaleína; farmacopea histórica.'),
    etimo: L('**Ipecacuanha** vem do tupi *ipegaa-guene* ou *ipecaya* («caule seco que provoca vómito») — nome indígena documentado para a raiz emética.', '**Ipecacuanha** from Tupi *ipegaa-guene* («dry stem that provokes vomiting») — documented indigenous name.', '**Ipecacuana** del tupí *ipegaa-guene* («tallo seco que provoca vómito»).'),
    chemistry: [
      { marker: L('Emetina (alcaloide isoquinolínico)', 'Emetine (isoquinoline alkaloid)', 'Emetina (alcaloide isoquinolínico)'), note: L('Marcador principal da raiz — emético potente; antiprotozoário histórico (amebíase).', 'Main root marker — potent emetic; historical antiprotozoal (amebiasis).', 'Marcador principal — emético potente; antiprotozoario histórico.') },
      { marker: L('Cephaeline', 'Cephaeline', 'Cefaleína'), note: L('Alcaloide congénere — mais emético e menos amebicida que emetina.', 'Congener alkaloid — more emetic and less amebicidal than emetine.', 'Alcaloide congénere — más emético que emetina.') },
      { marker: L('Alcaloides secundários (ex.: psychotrine)', 'Secondary alkaloids (e.g. psychotrine)', 'Alcaloides secundarios'), note: L('Perfil completo da raiz — toxicidade cumulativa em doses repetidas.', 'Full root profile — cumulative toxicity with repeated doses.', 'Perfil completo — toxicidad acumulativa.') },
      { marker: L('Triterpenos e amidas', 'Triterpenes and amides', 'Triterpenos y amidas'), note: L('Fração não alcaloídica — menor relevância clínica histórica.', 'Non-alkaloid fraction — lesser historical clinical relevance.', 'Fracción no alcaloide — menor relevancia clínica.') },
    ],
    uses: [
      { theme: L('Emético de urgência (histórico)', 'Emergency emetic (historical)', 'Emético de urgencia (histórico)'), frame: L('Xarope de ipeca — **obsoleto** na maioria dos protocolos modernos de intoxicação; preferir carvão e serviços de urgência.', 'Ipecac syrup — **obsolete** in most modern poisoning protocols; prefer charcoal and emergency services.', 'Jarabe de ipecacuana — **obsoleto** en protocolos modernos de intoxicación.') },
      { theme: L('Antiamébico (histórico)', 'Amebicide (historical)', 'Antiamibiano (histórico)'), frame: L('Emetina injectável foi substituída por antiparasitários mais seguros — valor museológico/educacional.', 'Injectable emetine replaced by safer antiparasitics — museum/educational value.', 'Emetina inyectable sustituida por antiparasitarios más seguros.') },
      { theme: L('Referência de farmacognosia brasileira', 'Brazilian pharmacognosy reference', 'Referencia de farmacognosia brasileña'), frame: L('Espécie nativa do Atlântico — capítulo histórico da farmacopeia ocidental.', 'Atlantic Forest native — historical chapter of Western pharmacopeia.', 'Especie nativa — capítulo histórico de farmacopea occidental.') },
    ],
    cautionsExtra: L('**Tóxica — não usar sem supervisão.** Emetina cardiotóxica em doses repetidas. Xarope caseiro de raiz é imprevisível e perigoso. Conservar como referência histórica, não como protocolo doméstico.', '**Toxic — do not use without supervision.** Emetine cardiotoxic with repeated doses. Home root syrup is unpredictable and dangerous.', '**Tóxica — no usar sin supervisión.** Emetina cardiotóxica.'),
    links: [],
  },

  pfaffia: {
    titleSuffix: L('ecdisteroides e ginseng-brasileiro', 'ecdysteroids and Brazilian ginseng', 'ecdisteroides y ginseng brasileño'),
    excerpt: L('*Pfaffia glomerata* — raiz rica em ecdisteroides e pfaffic acids; «ginseng-brasileiro» adaptogénico popular.', '*Pfaffia glomerata* — root rich in ecdysteroids and pfaffic acids; popular «Brazilian ginseng».', '*Pfaffia glomerata* — raíz rica en ecdisteroides; «ginseng brasileño».'),
    etimo: null,
    chemistry: [
      { marker: L('Ecdisteroides (ecdisterona, pfafficóides)', 'Ecdysteroids (ecdysterone, pfafficoids)', 'Ecdisteroides (ecdisterona)'), note: L('Marcadores esteróides da raiz — interesse «adaptogénico» (estudos pré-clínicos).', 'Root steroid markers — «adaptogenic» interest (preclinical studies).', 'Marcadores esteroides — interés «adaptogénico» (preclínico).') },
      { marker: L('Pfaffic acids (saponinas)', 'Pfaffic acids (saponins)', 'Ácidos pfafficos (saponinas)'), note: L('Saponinas titulares do género — citotoxicidade in vitro (não extrapolar para chá).', 'Genus titular saponins — in vitro cytotoxicity (do not extrapolate to tea).', 'Saponinas del género — citotoxicidad in vitro.') },
      { marker: L('Alquilamidas e polifenóis', 'Alkylamides and polyphenols', 'Alquilamidas y polifenoles'), note: L('Fração polar — actividade antioxidante complementar.', 'Polar fraction — complementary antioxidant activity.', 'Fracción polar — actividad antioxidante complementaria.') },
      { marker: L('Minerais (enxofre, magnésio)', 'Minerals (sulfur, magnesium)', 'Minerales (azufre, magnesio)'), note: L('Perfil ash da raiz — base da tradição «remineralizante/tónica».', 'Root ash profile — basis of «remineralizing/tonic» tradition.', 'Perfil mineral — tradición «remineralizante/tónica».') },
    ],
    uses: [
      { theme: L('Tónico/adaptogénico popular', 'Popular tonic/adaptogen', 'Tónico/adaptógeno popular'), frame: L('Decocto de raiz — tradição de «fortalecimento»; evidência clínica fraca vs marketing.', 'Root decoction — «strengthening» tradition; weak clinical evidence vs marketing.', 'Decocción — tradición de «fortalecimiento»; evidencia clínica débil.') },
      { theme: L('Desempenho físico (marketing)', 'Physical performance (marketing)', 'Rendimiento físico (marketing)'), frame: L('Ecdisterona promovida em suplementos — **não** aprovada com eficácia robusta em humanos.', 'Ecdysterone promoted in supplements — **not** approved with robust human efficacy.', 'Ecdisterona en suplementos — eficacia humana no robusta.') },
      { theme: L('Chá de raiz (contexto doméstico)', 'Root tea (home context)', 'Infusión de raíz (contexto doméstico)'), frame: L('Uso ocasional em decocto — dose e espécie (*P. glomerata* vs *P. paniculata*) importam.', 'Occasional decoction use — dose and species (*P. glomerata* vs *P. paniculata*) matter.', 'Uso ocasional — dosis y especie importan.') },
    ],
    cautionsExtra: L('Evitar em doença renal, gravidez e hormonossensíveis sem orientação. Saponinas podem irritar GI. Suplementos concentrados ≠ chá tradicional.', 'Avoid in kidney disease, pregnancy and hormone-sensitive conditions without guidance.', 'Evitar en enfermedad renal y embarazo sin orientación.'),
    links: [],
  },

  aroeira: {
    titleSuffix: L('pimenta-rosa e óleos resinosos', 'pink pepper and resinous oils', 'pimienta rosa y aceites resinosos'),
    excerpt: L('*Schinus terebinthifolia* — frutos «pimenta-rosa» e folhas com óleos essenciais e taninos; tradição tópica e culinária.', '*Schinus terebinthifolia* — «pink pepper» fruits and leaves with essential oils and tannins; topical and culinary tradition.', '*Schinus terebinthifolia* — frutos «pimienta rosa» y aceites esenciales.'),
    etimo: L('**Aroeira** do latim *aroeira* (aroeiro) — árvore resinosa. **Schinus** do grego *schinos* ( lentisco). Frutos vendidos como **pimenta-rosa** (não é *Piper*).', '**Aroeira** from Latin resinous tree name. **Schinus** from Greek *schinos* (mastic). Fruits sold as **pink pepper** (not *Piper*).', '**Aroeira** del latín. Frutos como **pimienta rosa** (no es *Piper*).'),
    chemistry: [
      { marker: L('Óleo essencial (α-pineno, limoneno)', 'Essential oil (α-pinene, limonene)', 'Aceite esencial (α-pineno, limoneno)'), note: L('Folhas e frutos — aroma resinoso; irritante cutâneo em concentração.', 'Leaves and fruits — resinous aroma; skin irritant when concentrated.', 'Hojas y frutos — aroma resinoso; irritante cutáneo.') },
      { marker: L('Taninos e fenólicos', 'Tannins and phenolics', 'Taninos y fenólicos'), note: L('Casca e folhas — adstringência tradicional em banhos e decoctos.', 'Bark and leaves — traditional astringency in baths and decoctions.', 'Corteza y hojas — adstringencia tradicional.') },
      { marker: L('Anacardic acids (traço)', 'Anacardic acids (trace)', 'Ácidos anacárdicos (traza)'), note: L('Família Anacardiaceae — possível sensibilização cruzada com anacardo/manga.', 'Anacardiaceae family — possible cross-sensitization with cashew/mango.', 'Familia Anacardiaceae — sensibilización cruzada posible con anacardo/mango.') },
      { marker: L('Carotenóides nos frutos', 'Carotenoids in fruits', 'Carotenoides en frutos'), note: L('Cor vermelha dos frutos — uso culinário como «pimenta» decorativa.', 'Red fruit color — culinary use as decorative «pepper».', 'Color rojo — uso culinario decorativo.') },
    ],
    uses: [
      { theme: L('Culinária (pimenta-rosa)', 'Cuisine (pink pepper)', 'Cocina (pimienta rosa)'), frame: L('Frutos secos — condimento gourmet; dose pequena (sabor resinoso intenso).', 'Dried fruits — gourmet seasoning; small dose (intense resinous flavor).', 'Frutos secos — condimento gourmet; dosis pequeña.') },
      { theme: L('Banhos e decoctos tópicos', 'Baths and topical decoctions', 'Baños y decocciones tópicas'), frame: L('Folhas e casca — tradição para reumatismos leves (contexto popular).', 'Leaves and bark — tradition for mild rheumatism (folk context).', 'Hojas y corteza — reumatismos leves (contexto popular).') },
      { theme: L('Cosmética artesanal', 'Artisanal cosmetics', 'Cosmética artesanal'), frame: L('Extratos de folha — testar alergia Anacardiaceae antes de uso amplo.', 'Leaf extracts — test Anacardiaceae allergy before wide use.', 'Extractos — probar alergia Anacardiaceae.') },
    ],
    cautionsExtra: L('Frutos podem causar irritação oral em pessoas sensíveis a Anacardiaceae. Não confundir com pimenta preta (*Piper nigrum*). Evitar ingestão de extratos concentrados sem orientação.', 'Fruits may cause oral irritation in Anacardiaceae-sensitive people. Do not confuse with black pepper.', 'Frutos pueden irritar en sensibles a Anacardiaceae.'),
    links: [],
  },

  quina: {
    titleSuffix: L('quinina e antimalárico histórico', 'quinine and historical antimalarial', 'quinina y antimalárico histórico'),
    excerpt: L('*Cinchona* spp. — casca fonte histórica de quinina; capítulo fundacional da quimioterapia antimalárica.', '*Cinchona* spp. — bark historical source of quinine; foundational chapter of antimalarial chemotherapy.', '*Cinchona* spp. — corteza fuente histórica de quinina.'),
    etimo: L('**Quina** / **quina-quina** de origem quechua *kina* ou *quina* — casca amarga dos Andes. **Quinina** nomeia o alcaloide isolado que revolucionou o tratamento da malária.', '**Quina** from Quechua *kina* — bitter Andean bark. **Quinine** names the alkaloid that revolutionized malaria treatment.', '**Quina** del quechua *kina*. **Quinina** nombra el alcaloide antimalárico histórico.'),
    chemistry: [
      { marker: L('Quinina (alcaloide)', 'Quinine (alkaloid)', 'Quinina (alcaloide)'), note: L('Principal alcaloide da casca — amargo intenso; base histórica de antimaláricos.', 'Main bark alkaloid — intense bitterness; historical antimalarial base.', 'Principal alcaloide — amargo intenso; base antimalárica histórica.') },
      { marker: L('Quinidina e cinchonina', 'Quinidine and cinchonine', 'Quinidina y cinchonina'), note: L('Alcaloides congéneres — quinidina tornou-se antiarrítmico; perfil toxicológico próprio.', 'Congener alkaloids — quinidine became antiarrhythmic; own toxicological profile.', 'Alcaloides congéneres — quinidina como antiarrítmico.') },
      { marker: L('Cinchonidina e cinchonina', 'Cinchonidine and cinchonine', 'Cinchonidina y cinchonina'), note: L('Perfil alcaloídico total varia por espécie (*C. calisaya*, *C. officinalis*, etc.).', 'Total alkaloid profile varies by species (*C. calisaya*, *C. officinalis*, etc.).', 'Perfil alcaloide varía por especie.') },
      { marker: L('Taninos e flavonoides', 'Tannins and flavonoids', 'Taninos y flavonoides'), note: L('Fração não alcaloídica — irrelevante para actividade antimalárica histórica.', 'Non-alkaloid fraction — irrelevant for historical antimalarial activity.', 'Fracción no alcaloide — irrelevante para actividad antimalárica.') },
    ],
    uses: [
      { theme: L('Antimalárico (histórico/farmacológico)', 'Antimalarial (historical/pharmacological)', 'Antimalárico (histórico/farmacológico)'), frame: L('Quinina isolada substitui chá de casca — **uso clínico regulado**; resistências modernas limitam papel.', 'Isolated quinine replaces bark tea — **regulated clinical use**; modern resistance limits role.', 'Quinina aislada sustituye infusión — **uso clínico regulado**.') },
      { theme: L('Amargante e tónico (histórico)', 'Bitter tonic (historical)', 'Amargante y tónico (histórico)'), frame: L('Extratos amargos em bebidas tónicas — tradição europeia; dose residual sem efeito antimalárico.', 'Bitter extracts in tonic drinks — European tradition; residual dose without antimalarial effect.', 'Extractos amargos en bebidas tónicas — tradición europea.') },
      { theme: L('Referência de história da medicina', 'History of medicine reference', 'Referencia de historia de la medicina'), frame: L('Espécie cultivada em colónias — exemplo de bioprospecção andina; valor educacional BudGanja.', 'Colonial cultivation — example of Andean bioprospecting; BudGanja educational value.', 'Cultivo colonial — bioprospección andina; valor educacional.') },
    ],
    cautionsExtra: L('**Quinina é cardiotóxica e ototóxica em excesso** — síndrome cinchonismo (zumbido, visão turva). Não automedicar chá de casca. Interacções com múltiplos fármacos. Uso histórico ≠ protocolo actual de malária.', '**Quinine cardiotoxic and ototoxic in excess** — cinchonism (tinnitus, blurred vision). Do not self-medicate bark tea.', '**Quinina cardiotóxica y ototóxica en exceso** — cinchonismo. No automedicarse.'),
    links: [],
  },

  'cannabis-sativa': {
    titleSuffix: L('canabinoides THC/CBD e contexto clínico', 'THC/CBD cannabinoids and clinical context', 'canabinoides THC/CBD y contexto clínico'),
    excerpt: L('*Cannabis sativa* L. — fitocanabinoides (THC, CBD), terpenos e uso medicinal regulamentado; cautela legal e neurodesenvolvimento.', '*Cannabis sativa* L. — phytocannabinoids (THC, CBD), terpenes and regulated medicinal use; legal and neurodevelopment caution.', '*Cannabis sativa* L. — fitocanabinoides (THC, CBD) y uso medicinal regulamentado.'),
    etimo: L(
      '**Cannabis** deriva provavelmente do grego *kánnabis* (κάνναβις), possivelmente de origem escita/persa — nome antigo da fibra e da planta psicoactiva. **Sativa** = cultivada.',
      '**Cannabis** likely from Greek *kánnabis*, possibly Scythian/Persian origin — ancient name for fiber and psychoactive plant. **Sativa** = cultivated.',
      '**Cannabis** probablemente del griego *kánnabis*, posible origen escita/persa. **Sativa** = cultivada.'
    ),
    chemistry: [
      { marker: L('Δ9-THC (tetrahidrocannabinol)', 'Δ9-THC (tetrahydrocannabinol)', 'Δ9-THC (tetrahidrocannabinol)'), note: L('Principal psicoactivo — agonista CB1/CB2; efeitos analgésicos, antieméticos e psicoactivos dose-dependentes.', 'Main psychoactive — CB1/CB2 agonist; analgesic, antiemetic and psychoactive dose-dependent effects.', 'Principal psicoactivo — agonista CB1/CB2; efectos analgésicos y psicoactivos.') },
      { marker: L('CBD (canabidiol)', 'CBD (cannabidiol)', 'CBD (canabidiol)'), note: L('Não psicoactivo clássico — modula THC; interesse em epilepsia refractária e ansiedade (produtos registrados).', 'Non-classically psychoactive — modulates THC; interest in refractory epilepsy and anxiety (registered products).', 'No psicoactivo clásico — modula THC; interés en epilepsia refractaria.') },
      { marker: L('Terpenos (mirceno, limoneno, pineno)', 'Terpenes (myrcene, limonene, pinene)', 'Terpenos (mirceno, limoneno, pineno)'), note: L('Perfil volátil — «efeito entourage» discutido; modula aroma e possivelmente efeitos.', 'Volatile profile — discussed «entourage effect»; modulates aroma and possibly effects.', 'Perfil volátil — «efecto séquito» discutido.') },
      { marker: L('Canabinoides ácidos (THCA, CBDA)', 'Acid cannabinoids (THCA, CBDA)', 'Canabinoides ácidos (THCA, CBDA)'), note: L('Formas presentes na planta fresca — convertem-se com calor/decarboxilação.', 'Forms in fresh plant — convert with heat/decarboxylation.', 'Formas en planta fresca — se convierten con calor.') },
      { marker: L('Flavonoides canabinoides (canflavinas)', 'Cannabinoid flavonoids (cannflavins)', 'Flavonoides cannabinoides (canflavinas)'), note: L('Compostos fenólicos exclusivos — anti-inflamatório in vitro (investigação).', 'Exclusive phenolic compounds — in vitro anti-inflammatory (research).', 'Compuestos fenólicos exclusivos — antiinflamatorio in vitro.') },
    ],
    uses: [
      { theme: L('Uso medicinal regulamentado', 'Regulated medicinal use', 'Uso medicinal regulamentado'), frame: L('Prescrição e produtos registrados (ANVISA/RDC) — **não** equivale a uso recreativo ou automedicação com material não analisado.', 'Prescription and registered products — **not** equivalent to recreational use or self-medication with unanalyzed material.', 'Prescripción y productos registrados — **no** equivale a automedicación.') },
      { theme: L('Dor crónica, espasticidade, náusea oncológica', 'Chronic pain, spasticity, oncology nausea', 'Dolor crónico, espasticidad, náusea oncológica'), frame: L('Indicações com evidência variável — decisão clínica individualizada; preferir formulações padronizadas.', 'Indications with variable evidence — individualized clinical decision; prefer standardized formulations.', 'Indicaciones con evidencia variable — decisión clínica individualizada.') },
      { theme: L('Educação UNIFESP e legislação brasileira', 'UNIFESP education and Brazilian legislation', 'Educación UNIFESP y legislación brasileña'), frame: L('Contexto formativo do laboratório — separar ciência, política e acesso clínico legal.', 'Lab training context — separate science, policy and legal clinical access.', 'Contexto formativo — separar ciencia, política y acceso clínico legal.') },
    ],
    cautionsExtra: L(
      '**Uso medicinal sujeito a legislação e prescrição.** Em adolescentes, estudos longitudinais (ex.: Albaugh et al., JAMA Psychiatry 2021) associam cannabis a alterações no neurodesenvolvimento cortical. Não incentiva cultivo ilícito. THC psicoactivo — conduzir e operar maquinaria contraindicados. Interacções com CNS depressores.',
      '**Medicinal use subject to legislation and prescription.** In adolescents, longitudinal studies (e.g. Albaugh et al., JAMA Psychiatry 2021) link cannabis to cortical neurodevelopment changes. Does not encourage illicit cultivation.',
      '**Uso medicinal sujeto a legislación y prescripción.** En adolescentes, estudios longitudinales (Albaugh et al., 2021) asocian cannabis a alteraciones en neurodesarrollo.'
    ),
    links: [],
  },

  abacate: {
    titleSuffix: L('persina, PPO e gorduras monoinsaturadas', 'persin, PPO and monounsaturated fats', 'persina, PPO y grasas monoinsaturadas'),
    excerpt: L(
      '*Persea americana* — polpa rica em MUFA, persina defensiva e etimologia náuatle *āhuacatl*; separar planta inteira de derivados industriais.',
      '*Persea americana* — MUFA-rich pulp, defensive persin and Nahuatl *āhuacatl* etymology; separate whole fruit from industrial derivatives.',
      '*Persea americana* — pulpa rica en MUFA, persina defensiva y etimología náhuatl *āhuacatl*.'
    ),
    etimo: L(
      'A palavra portuguesa **abacate** vem do náuatle **āhuacatl** (via espanhol *aguacate*) — língua de povos indígenas mesoamericanos (México / América Central). No náuatle o mesmo vocábulo nomeia o **fruto** e também **testículo**, pela forma e pelo modo como os frutos pendem na árvore; daí a carga cultural de fertilidade / vigor frequentemente citada na etnobotânica. **Não** é palavra tupi. Nos Andes o fruto chama-se muitas vezes **palta** (tradição quéchua / povo Palta).',
      'The Portuguese **abacate** comes from Nahuatl **āhuacatl** (via Spanish *aguacate*) — language of Mesoamerican indigenous peoples. In Nahuatl the same word names the **fruit** and also **testicle**, by shape; fertility/vigor cultural charge in ethnobotany. **Not** a Tupi word. In the Andes often called **palta**.',
      'La palabra **abacate** / **aguacate** viene del náhuatl **āhuacatl** — lengua mesoamericana. Nombra el **fruto** y también **testículo** por la forma. **No** es palabra tupí. En los Andes suele llamarse **palta**.'
    ),
    chemistry: [
      { marker: L('Lipídios monoinsaturados (MUFA)', 'Monounsaturated lipids (MUFA)', 'Lípidos monoinsaturados (MUFA)'), note: L('Predominam gorduras **monoinsaturadas** (ácido oleico); também palmítico e linoleico — perfil cardioprotector alimentar.', 'Predominantly **monounsaturated** fats (oleic acid); also palmitic and linoleic — dietary cardioprotective profile.', 'Predominan grasas **monoinsaturadas** (ácido oleico); perfil cardioprotector alimentario.') },
      { marker: L('Persina', 'Persin', 'Persina'), note: L('Toxina antifúngica lipídica — concentrada em folhas, caroço e casca; tóxica para muitos animais domésticos.', 'Lipid antifungal toxin — concentrated in leaves, seed and skin; toxic to many pets.', 'Toxina antifúngica — concentrada en hojas, hueso y cáscara; tóxica para mascotas.') },
      { marker: L('Polifenol oxidase (PPO)', 'Polyphenol oxidase (PPO)', 'Polifenol oxidasa (PPO)'), note: L('Enzima que escurece a polpa cortada — reacção de pardeamento oxidativo (não indica spoilage imediato).', 'Enzyme that browns cut pulp — oxidative browning (does not indicate immediate spoilage).', 'Enzima que oscurece la pulpa cortada — pardeamiento oxidativo.') },
      { marker: L('Carotenóides e vitamina E', 'Carotenoids and vitamin E', 'Carotenoides y vitamina E'), note: L('Luteína, α-tocoferol — antioxidantes lipofílicos na polpa madura.', 'Lutein, α-tocopherol — lipophilic antioxidants in ripe pulp.', 'Luteína, α-tocoferol — antioxidantes lipofílicos en pulpa madura.') },
      { marker: L('Fibras e potássio', 'Fiber and potassium', 'Fibras y potasio'), note: L('Baixo açúcar livre relativo vs muitas frutas; fibra e potássio relevantes na matriz alimentar.', 'Low free sugar vs many fruits; fiber and potassium relevant in food matrix.', 'Bajo azúcar libre vs muchas frutas; fibra y potasio relevantes.') },
    ],
    uses: [
      { theme: L('Alimento integral (polpa madura)', 'Whole food (ripe pulp)', 'Alimento integral (pulpa madura)'), frame: L('Saladas, guacamole fresco, torradas — linha de baixo risco do laboratório; matriz alimentar intacta.', 'Salads, fresh guacamole, toast — lab low-risk line; intact food matrix.', 'Ensaladas, guacamole fresco — línea de bajo riesgo; matriz alimentaria intacta.') },
      { theme: L('Perfil lipídico cardiosaludável', 'Cardio-healthy lipid profile', 'Perfil lipídico cardiosaludable'), frame: L('Substituição de gorduras saturadas por MUFA — contexto nutricional, não «superalimento».', 'Replacing saturated fats with MUFA — nutritional context, not «superfood» claim.', 'Sustitución de grasas saturadas por MUFA — contexto nutricional.') },
      { theme: L('Etnobotânica mesoamericana', 'Mesoamerican ethnobotany', 'Etnobotánica mesoamericana'), frame: L('Fruto milenar (*āhuacatl* / *palta*) — crédito cultural e alimentar independente de marketing industrial.', 'Ancient fruit (*āhuacatl* / *palta*) — cultural and food credit independent of industrial marketing.', 'Fruto milenario — crédito cultural independiente de marketing industrial.') },
    ],
    cautionsExtra: L(
      'Polpa madura é alimento comum. Folhas, casca e caroço contêm persina — **não** alimentar animais. Extratos de folha: evitar automedicação. Derivados industriais com açúcar e aditivos têm ficha própria em Derivados de risco.',
      'Ripe pulp is common food. Leaves, skin and seed contain persin — **do not** feed to pets. Leaf extracts: avoid self-medication. Industrial derivatives with sugar and additives have separate Risk Derivatives sheet.',
      'Pulpa madura es alimento común. Hojas y carozo contienen persina — **no** alimentar animales. Derivados industriales tienen ficha propia.'
    ),
    links: [
      {
        href: '/posts/post-inspecao-derivado-abacate.html',
        label: L(
          'Inspeção: Derivados do abacate — açúcar, aditivos e química industrial',
          'Inspection: Avocado derivatives — sugar, additives and industrial chemistry',
          'Inspección: Derivados del aguacate — azúcar, aditivos y química industrial'
        ),
      },
      {
        href: '/posts/post-inspecao-derivado-cana-de-acucar.html',
        label: L(
          'Inspeção: Cana-de-açúcar / açúcares livres',
          'Inspection: Sugarcane / free sugars',
          'Inspección: Caña de azúcar / azúcares libres'
        ),
      },
    ],
  },

  coco: {
    titleSuffix: L(
      'água, polpa e óleo da drupa tropical',
      'water, pulp and oil of the tropical drupe',
      'agua, pulpa y aceite de la drupa tropical'
    ),
    excerpt: L(
      '*Cocos nucifera* — água endospérmica, polpa e óleo; etimologia do «rosto» do coco; separar fruto inteiro de derivados industriais adoçados e refinados.',
      '*Cocos nucifera* — endosperm water, pulp and oil; etymology of the coconut “face”; separate whole fruit from sweetened/refined industrial derivatives.',
      '*Cocos nucifera* — agua endospérmica, pulpa y aceite; etimología del «rostro» del coco; separar fruto entero de derivados industriales.'
    ),
    etimo: L(
      'O português **coco** (fruto) liga-se à palavra popular para **fantasma / bogeyman** (*coco*): os navegadores portugueses viram nos três «olhos» da casca um **rosto** — daí o nome do fruto e o género botânico *Cocos*. Em português do Brasil, **coco** também pode significar **cabeça** (gíria) — sentido figurado, não botânico. Nome científico: *Cocos nucifera* L. (Arecaceae).',
      'Portuguese **coco** (fruit) ties to the folk word for **bogeyman** (*coco*): Portuguese sailors saw a **face** in the three “eyes” of the shell — hence the fruit name and genus *Cocos*. In Brazilian Portuguese **coco** can also mean **head** (slang) — figurative, not botanical. Scientific name: *Cocos nucifera* L. (Arecaceae).',
      'El portugués **coco** (fruto) se liga a la palabra popular para **coco / fantasma**: los navegantes vieron un **rostro** en los tres «ojos» de la cáscara — de ahí el nombre y el género *Cocos*. En Brasil, **coco** también puede significar **cabeza** (jerga). Nombre científico: *Cocos nucifera* L.'
    ),
    chemistry: [
      {
        marker: L('Água endospérmica', 'Endosperm water', 'Agua endospérmica'),
        note: L(
          'Líquido estéril no fruto jovem — electrólitos (K, Na, Mg), açúcares naturais em dose moderada; distinto de bebidas industriais adoçadas.',
          'Sterile liquid in young fruit — electrolytes (K, Na, Mg), natural sugars in moderate dose; distinct from sweetened industrial drinks.',
          'Líquido estéril en fruto joven — electrolitos; distinto de bebidas industriales endulzadas.'
        ),
      },
      {
        marker: L('Lípidos da polpa (láurico)', 'Pulp lipids (lauric)', 'Lípidos de la pulpa (láurico)'),
        note: L(
          'Óleo rico em **ácidos gordos saturados de cadeia média** (láurico, mirístico); perfil distinto do azeite/abacate — dose e contexto alimentar.',
          'Oil rich in **medium-chain saturated fatty acids** (lauric, myristic); profile unlike olive/avocado — dose and dietary context.',
          'Aceite rico en **ácidos grasos saturados de cadena media** (láurico); dosis y contexto importan.'
        ),
      },
      {
        marker: L('Fibra e polpa', 'Fiber and pulp', 'Fibra y pulpa'),
        note: L(
          'Polpa fresca ou desidratada (cópra) — fibra e energia; coco ralado açucarado já é matriz industrial.',
          'Fresh or dried pulp (copra) — fiber and energy; sweetened shredded coconut is already an industrial matrix.',
          'Pulpa fresca o deshidratada — fibra y energía; coco rallado azucarado ya es matriz industrial.'
        ),
      },
      {
        marker: L('Coir / casca', 'Coir / husk', 'Coir / cáscara'),
        note: L(
          'Fibra da casca — uso material (cordas, substratos); **não** é alimento.',
          'Husk fiber — material use (ropes, substrates); **not** food.',
          'Fibra de la cáscara — uso material; **no** es alimento.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Água de coco fresca', 'Fresh coconut water', 'Agua de coco fresca'),
        frame: L(
          'Bebida tropical de baixo processamento — linha de crédito do laboratório; não confundir com garrafa adoçada.',
          'Low-process tropical drink — lab credit line; do not confuse with sweetened bottled products.',
          'Bebida tropical de bajo procesamiento — no confundir con botella endulzada.'
        ),
      },
      {
        theme: L('Culinária costeira e leite de coco', 'Coastal cooking and coconut milk', 'Cocina costera y leche de coco'),
        frame: L(
          'Polpa e leite em moquecas, doces tradicionais e cozinha afro-brasileira — matriz culinária, não «superalimento».',
          'Pulp and milk in stews, traditional sweets and Afro-Brazilian cooking — culinary matrix, not «superfood».',
          'Pulpa y leche en cocina tradicional afrobrasileña — matriz culinaria.'
        ),
      },
      {
        theme: L('Óleo artesanal vs refinado', 'Artisanal vs refined oil', 'Aceite artesanal vs refinado'),
        frame: L(
          'Prensagem artesanal ≠ óleo refinado industrial — ver ficha Derivados para marketing MCT e ultraprocessados.',
          'Artisanal pressing ≠ industrial refined oil — see Derivatives sheet for MCT marketing and ultra-processed products.',
          'Prensado artesanal ≠ aceite refinado industrial — ver ficha Derivados.'
        ),
      },
    ],
    cautionsExtra: L(
      'Água e polpa frescas são alimentos comuns. Óleo de coco: alta saturação — dose. Derivados industriais com açúcar e aditivos têm ficha própria em Derivados de risco. Não é aconselhamento médico.',
      'Fresh water and pulp are common foods. Coconut oil: high saturation — dose. Industrial derivatives with sugar and additives have a separate Risk Derivatives sheet. Not medical advice.',
      'Agua y pulpa frescas son alimentos comunes. Aceite de coco: alta saturación — dosis. Derivados industriales tienen ficha propia. No es consejo médico.'
    ),
    links: [
      {
        href: '/posts/post-inspecao-derivado-coco.html',
        label: L(
          'Inspeção: Derivados do coco — açúcar, óleo e química industrial',
          'Inspection: Coconut derivatives — sugar, oil and industrial chemistry',
          'Inspección: Derivados del coco — azúcar, aceite y química industrial'
        ),
      },
      {
        href: '/posts/post-inspecao-derivado-cana-de-acucar.html',
        label: L(
          'Inspeção: Cana-de-açúcar / açúcares livres',
          'Inspection: Sugarcane / free sugars',
          'Inspección: Caña de azúcar / azúcares libres'
        ),
      },
      {
        href: '/posts/post-inspecao-derivado-abacate.html',
        label: L(
          'Inspeção: Derivados do abacate (série irmã)',
          'Inspection: Avocado derivatives (sibling series)',
          'Inspección: Derivados del aguacate (serie hermana)'
        ),
      },
    ],
  },
  'tomatinho-cereja': {
    titleSuffix: L(
      'cultivo familiar e fruto fresco',
      'family growing and fresh fruit',
      'cultivo familiar y fruto fresco'
    ),
    excerpt: L(
      'Tomatinho cereja (*Solanum lycopersicum* var. *cerasiforme*) — primeiro cultivo do Diário da Sementinha: fruto fresco vs ultraprocessados «tomato».',
      'Cherry tomato (*Solanum lycopersicum* var. *cerasiforme*) — first Little Seed Diary crop: fresh fruit vs ultra-processed «tomato».',
      'Tomate cherry (*Solanum lycopersicum* var. *cerasiforme*) — primer cultivo del Diario de la Semillita: fruto fresco vs ultraprocesados «tomato».'
    ),
    etimo: L(
      '**Tomate** vem do náuatle *tomatl*; **cereja** descreve o tamanho pequeno do cultivar. O binómio **Solanum lycopersicum** (família Solanaceae) agrupa os tomates cultivados; a variedade *cerasiforme* é o grupo dos tomates cereja.',
      '**Tomato** comes from Nahuatl *tomatl*; **cherry** describes the small cultivar size. **Solanum lycopersicum** (Solanaceae) covers cultivated tomatoes; *cerasiforme* is the cherry-tomato group.',
      '**Tomate** viene del náhuatl *tomatl*; **cherry** describe el tamaño pequeño. **Solanum lycopersicum** (Solanaceae) agrupa los tomates cultivados; *cerasiforme* es el grupo cherry.'
    ),
    chemistry: [
      {
        marker: L('Licopeno', 'Lycopene', 'Licopeno'),
        note: L(
          'Carotenoide vermelho típico do fruto maduro — interesse nutricional educacional, não dose terapêutica.',
          'Red carotenoid typical of ripe fruit — educational nutrition interest, not a therapeutic dose.',
          'Carotenoide rojo típico del fruto maduro — interés nutricional educativo, no dosis terapéutica.'
        ),
      },
      {
        marker: L('Vitamina C / fibra', 'Vitamin C / fibre', 'Vitamina C / fibra'),
        note: L(
          'Fruto fresco contribui vitaminas e fibra no contexto de uma alimentação variada.',
          'Fresh fruit contributes vitamins and fibre within a varied diet.',
          'El fruto fresco aporta vitaminas y fibra en una alimentación variada.'
        ),
      },
      {
        marker: L('Alcaloides nas partes verdes', 'Alkaloids in green parts', 'Alcaloides en partes verdes'),
        note: L(
          'Folhas e partes verdes não são alimento — o laboratório inspeciona o **fruto maduro**.',
          'Leaves and green parts are not food — the lab inspects the **ripe fruit**.',
          'Hojas y partes verdes no son alimento — el laboratorio inspecciona el **fruto maduro**.'
        ),
      },
    ],
    uses: [
      {
        theme: L('Cultivo familiar', 'Family growing', 'Cultivo familiar'),
        frame: L(
          'Vaso ou canteiro com luz, água e paciência — publicado no Diário da Sementinha.',
          'Pot or bed with light, water and patience — published in the Little Seed Diary.',
          'Maceta o cantero con luz, agua y paciencia — publicado en el Diario de la Semillita.'
        ),
      },
      {
        theme: L('Fruto fresco vs ultraprocessado', 'Fresh fruit vs ultra-processed', 'Fruto fresco vs ultraprocesado'),
        frame: L(
          'Preferir o tomatinho inteiro; molhos e ketchups industriais entram na conversa de Derivados de risco.',
          'Prefer the whole cherry tomato; industrial sauces and ketchups belong in the Risk Derivatives conversation.',
          'Preferir el tomate entero; salsas y ketchups industriales entran en Derivados de riesgo.'
        ),
      },
    ],
    cautionsExtra: L(
      'Fruto fresco é alimento comum. Folhas e partes verdes da planta não se comem. Conteúdo educacional do Laboratório BudGanja — não substitui orientação profissional.',
      'Fresh fruit is common food. Leaves and green plant parts are not eaten. Educational BudGanja Lab content — not a substitute for professional guidance.',
      'El fruto fresco es alimento común. Hojas y partes verdes no se comen. Contenido educativo — no sustituye orientación profesional.'
    ),
    links: [
      {
        href: '/vida/diario/',
        label: L(
          'Diário da Sementinha — cultivos inspecionados',
          'Little Seed Diary — inspected crops',
          'Diario de la Semillita — cultivos inspeccionados'
        ),
      },
      {
        href: '/vida/',
        label: L(
          'Hub Vida — O Laboratório e a Sementinha',
          'Vida hub — The Lab and the Little Seed',
          'Hub Vida — El Laboratorio y la Semillita'
        ),
      },
    ],
  },
};

function escapeCell(text) {
  return String(text || '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function renderTable(colA, colB, rows, loc) {
  const h1 = pick(loc, colA);
  const h2 = pick(loc, colB);
  const lines = [`| ${h1} | ${h2} |`, '| --- | --- |'];
  for (const row of rows) {
    lines.push(`| ${escapeCell(pick(loc, row[0]))} | ${escapeCell(pick(loc, row[1]))} |`);
  }
  return lines.join('\n');
}

function renderPlantNotes(slug, loc) {
  const entry = NOTES[slug];
  if (!entry) return '';

  const parts = [];

  if (entry.etimo) {
    parts.push(`## ${pick(loc, SECTION.identity)}\n\n${pick(loc, entry.etimo)}`);
  }

  if (entry.chemistry && entry.chemistry.length) {
    const table = renderTable(
      TABLE.marker,
      TABLE.note,
      entry.chemistry.map((row) => [row.marker, row.note]),
      loc
    );
    parts.push(`## ${pick(loc, SECTION.chemistry)}\n\n${table}\n\n${pick(loc, LIMITS.chemistry)}`);
  }

  if (entry.uses && entry.uses.length) {
    const table = renderTable(
      TABLE.theme,
      TABLE.frame,
      entry.uses.map((row) => [row.theme, row.frame]),
      loc
    );
    parts.push(`## ${pick(loc, SECTION.uses)}\n\n${table}\n\n${pick(loc, LIMITS.uses)}`);
  }

  if (entry.cautionsExtra) {
    parts.push(`## ${pick(loc, SECTION.cautions)}\n\n${pick(loc, entry.cautionsExtra)}`);
  }

  if (entry.links && entry.links.length) {
    const linkLines = entry.links.map((link) => `- [${pick(loc, link.label)}](${link.href})`);
    parts.push(`## ${pick(loc, SECTION.links)}\n\n${linkLines.join('\n')}`);
  }

  if (!parts.length) return '';
  return '\n\n' + parts.join('\n\n') + '\n';
}

function getPlantNoteMeta(slug, loc) {
  const entry = NOTES[slug];
  if (!entry) return null;
  const locale = loc || 'pt-BR';
  return {
    titleSuffix: pick(locale, entry.titleSuffix),
    excerpt: pick(locale, entry.excerpt),
  };
}

module.exports = { NOTES, renderPlantNotes, getPlantNoteMeta, pick };

