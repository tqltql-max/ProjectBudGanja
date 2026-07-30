'use strict';

/**
 * Gera content/plantas.json — catálogo curado inicial (~30 fichas).
 * Conteúdo educacional / etnobotânico; não é prescrição clínica.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'content', 'plantas.json');

function plant(p) {
  return Object.assign(
    {
      partsUsed: [],
      traditionalUses: [],
      cautions: 'Conteúdo educacional. Não substitui orientação de profissional de saúde. Evite automedicação.',
      tags: [],
      relatedUnifesp: false,
      cover: null
    },
    p
  );
}

const plants = [
  plant({
    id: 'babosa',
    slug: 'babosa',
    nomePopular: 'Babosa',
    nomeCientifico: 'Aloe vera',
    familia: 'Asphodelaceae',
    summary: 'Suculenta amplamente cultivada no Brasil; gel foliar usado em cuidados cutâneos tradicionais.',
    partsUsed: ['Folhas (gel)'],
    traditionalUses: ['Uso tópico em pele irritada', 'Cosmética caseira'],
    cautions: 'Uso interno exige orientação profissional; látex pode irritar. Conteúdo educacional — não substitui consulta.',
    tags: ['pele', 'domestica', 'gel']
  }),
  plant({
    id: 'camomila',
    slug: 'camomila',
    nomePopular: 'Camomila',
    nomeCientifico: 'Matricaria chamomilla',
    familia: 'Asteraceae',
    summary: 'Erva aromática clássica em chás relaxantes e preparações leves.',
    partsUsed: ['Capítulos florais'],
    traditionalUses: ['Infusões calmantes', 'Apoio ao sono e digestão leve'],
    tags: ['cha', 'calmante', 'digestao']
  }),
  plant({
    id: 'capim-limao',
    slug: 'capim-limao',
    nomePopular: 'Capim-limão',
    nomeCientifico: 'Cymbopogon citratus',
    familia: 'Poaceae',
    summary: 'Gramínea citrica comum em quintais brasileiros; folhas em chás e culinária.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Chás aromáticos', 'Aromatização de alimentos'],
    tags: ['cha', 'aromatica', 'culinaria']
  }),
  plant({
    id: 'carqueja',
    slug: 'carqueja',
    nomePopular: 'Carqueja',
    nomeCientifico: 'Baccharis trimera',
    familia: 'Asteraceae',
    summary: 'Arbusto nativo usado na tradição popular do Sul/Sudeste em chás amargos.',
    partsUsed: ['Partes aéreas'],
    traditionalUses: ['Chás digestivos tradicionais', 'Fitoterapia popular'],
    tags: ['nativa', 'digestao', 'cha']
  }),
  plant({
    id: 'cavalinha',
    slug: 'cavalinha',
    nomePopular: 'Cavalinha',
    nomeCientifico: 'Equisetum arvense',
    familia: 'Equisetaceae',
    summary: 'Planta rica em sílica na tradição popular; usada em chás e banhos.',
    partsUsed: ['Partes aéreas'],
    traditionalUses: ['Infusões tradicionais', 'Uso tópico em banhos'],
    cautions: 'Pode interagir com diuréticos e afetar rins — orientar-se com profissional. Conteúdo educacional.',
    tags: ['cha', 'mineral']
  }),
  plant({
    id: 'erva-cidreira',
    slug: 'erva-cidreira',
    nomePopular: 'Erva-cidreira',
    nomeCientifico: 'Lippia alba',
    familia: 'Verbenaceae',
    summary: 'Espécie muito cultivada no Brasil; folhas aromáticas em chás e banhos.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Chás relaxantes', 'Aromatização doméstica'],
    tags: ['cha', 'calmante', 'brasileira']
  }),
  plant({
    id: 'espinheira-santa',
    slug: 'espinheira-santa',
    nomePopular: 'Espinheira-santa',
    nomeCientifico: 'Maytenus ilicifolia',
    familia: 'Celastraceae',
    summary: 'Arbusto nativo da Mata Atlântica; folhas na fitoterapia popular gástrica.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Chás digestivos tradicionais', 'Fitoterapia brasileira'],
    tags: ['nativa', 'digestao', 'mata-atlantica']
  }),
  plant({
    id: 'guaco',
    slug: 'guaco',
    nomePopular: 'Guaco',
    nomeCientifico: 'Mikania glomerata',
    familia: 'Asteraceae',
    summary: 'Trepadeira brasileira clássica em xaropes e chás da medicina popular respiratória.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Xaropes e chás tradicionais', 'Uso popular respiratório'],
    tags: ['nativa', 'respiratorio', 'cha']
  }),
  plant({
    id: 'hortela',
    slug: 'hortela',
    nomePopular: 'Hortelã',
    nomeCientifico: 'Mentha spicata',
    familia: 'Lamiaceae',
    summary: 'Erva aromática de cultivo fácil; folhas em chás e culinária.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Chás digestivos', 'Culinária e aromatização'],
    tags: ['cha', 'culinaria', 'aromatica']
  }),
  plant({
    id: 'boldo',
    slug: 'boldo',
    nomePopular: 'Boldo',
    nomeCientifico: 'Plectranthus barbatus',
    familia: 'Lamiaceae',
    summary: 'No Brasil, “boldo” costuma referir P. barbatus (falso-boldo); folhas amargas em chás.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Chás digestivos tradicionais'],
    cautions: 'Não confundir espécies; uso prolongado exige cuidado. Conteúdo educacional.',
    tags: ['digestao', 'cha', 'domestica']
  }),
  plant({
    id: 'melissa',
    slug: 'melissa',
    nomePopular: 'Melissa',
    nomeCientifico: 'Melissa officinalis',
    familia: 'Lamiaceae',
    summary: 'Erva citrica associada a chás calmantes na tradição europeia adaptada ao Brasil.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Infusões relaxantes', 'Aromatização'],
    tags: ['cha', 'calmante', 'aromatica']
  }),
  plant({
    id: 'alecrim',
    slug: 'alecrim',
    nomePopular: 'Alecrim',
    nomeCientifico: 'Salvia rosmarinus',
    familia: 'Lamiaceae',
    summary: 'Arbusto aromático de cozinha e chás; comum em hortas urbanas.',
    partsUsed: ['Folhas', 'Ramos'],
    traditionalUses: ['Culinária', 'Chás aromáticos'],
    tags: ['culinaria', 'aromatica', 'cha']
  }),
  plant({
    id: 'gengibre',
    slug: 'gengibre',
    nomePopular: 'Gengibre',
    nomeCientifico: 'Zingiber officinale',
    familia: 'Zingiberaceae',
    summary: 'Rizoma picante usado em chás, culinária e preparações tradicionais.',
    partsUsed: ['Rizoma'],
    traditionalUses: ['Chás e decoctos', 'Culinária'],
    tags: ['cha', 'culinaria', 'rizoma']
  }),
  plant({
    id: 'curcuma',
    slug: 'curcuma',
    nomePopular: 'Cúrcuma',
    nomeCientifico: 'Curcuma longa',
    familia: 'Zingiberaceae',
    summary: 'Rizoma amarelo (açafrão-da-terra) na culinária e chás brasileiros.',
    partsUsed: ['Rizoma'],
    traditionalUses: ['Culinária', 'Chás e leites dourados tradicionais'],
    tags: ['culinaria', 'rizoma', 'cha']
  }),
  plant({
    id: 'unha-de-gato',
    slug: 'unha-de-gato',
    nomePopular: 'Unha-de-gato',
    nomeCientifico: 'Uncaria tomentosa',
    familia: 'Rubiaceae',
    summary: 'Trepadeira amazônica; casca e raiz na fitoterapia popular andino-amazônica.',
    partsUsed: ['Casca', 'Raiz'],
    traditionalUses: ['Decoctos tradicionais'],
    cautions: ['Espécie regulamentada em alguns contextos; procurar orientação profissional.'].join(' '),
    tags: ['amazonia', 'tradicional']
  }),
  plant({
    id: 'sucupira',
    slug: 'sucupira',
    nomePopular: 'Sucupira',
    nomeCientifico: 'Pterodon emarginatus',
    familia: 'Fabaceae',
    summary: 'Árvore do Cerrado; sementes e óleo na medicina popular do Centro-Oeste.',
    partsUsed: ['Sementes', 'Óleo'],
    traditionalUses: ['Uso popular tópico e oral tradicional'],
    tags: ['cerrado', 'nativa', 'oleo']
  }),
  plant({
    id: 'copaiba',
    slug: 'copaiba',
    nomePopular: 'Copaíba',
    nomeCientifico: 'Copaifera langsdorffii',
    familia: 'Fabaceae',
    summary: 'Árvore amazônica/cerrado famosa pelo óleo-resina de uso tradicional.',
    partsUsed: ['Óleo-resina'],
    traditionalUses: ['Uso tópico tradicional', 'Fitoterapia amazônica'],
    tags: ['amazonia', 'oleo', 'nativa']
  }),
  plant({
    id: 'andiroba',
    slug: 'andiroba',
    nomePopular: 'Andiroba',
    nomeCientifico: 'Carapa guianensis',
    familia: 'Meliaceae',
    summary: 'Árvore amazônica; óleo das sementes na cosmética e tradição local.',
    partsUsed: ['Óleo das sementes'],
    traditionalUses: ['Uso tópico tradicional', 'Cosmética natural'],
    tags: ['amazonia', 'oleo', 'pele']
  }),
  plant({
    id: 'jambu',
    slug: 'jambu',
    nomePopular: 'Jambu',
    nomeCientifico: 'Acmella oleracea',
    familia: 'Asteraceae',
    summary: 'Erva amazônica de sabor anestésico; usada na culinária paraense.',
    partsUsed: ['Folhas', 'Flores'],
    traditionalUses: ['Culinária regional', 'Uso tradicional oral'],
    tags: ['amazonia', 'culinaria', 'regional']
  }),
  plant({
    id: 'mulungu',
    slug: 'mulungu',
    nomePopular: 'Mulungu',
    nomeCientifico: 'Erythrina mulungu',
    familia: 'Fabaceae',
    summary: 'Árvore brasileira; casca em chás da tradição popular calmantes.',
    partsUsed: ['Casca'],
    traditionalUses: ['Chás tradicionais'],
    cautions: 'Pode potencializar sedativos — não usar sem orientação. Conteúdo educacional.',
    tags: ['nativa', 'calmante', 'cha']
  }),
  plant({
    id: 'maracuja',
    slug: 'maracuja',
    nomePopular: 'Maracujá',
    nomeCientifico: 'Passiflora incarnata',
    familia: 'Passifloraceae',
    summary: 'Passifloras usadas em chás e fitoterápicos industriais; folhas e partes aéreas.',
    partsUsed: ['Folhas', 'Partes aéreas'],
    traditionalUses: ['Chás calmantes', 'Fitoterapia popular'],
    tags: ['calmante', 'cha', 'brasileira']
  }),
  plant({
    id: 'calendula',
    slug: 'calendula',
    nomePopular: 'Calêndula',
    nomeCientifico: 'Calendula officinalis',
    familia: 'Asteraceae',
    summary: 'Flor ornamental e medicinal; pétalas em pomadas e chás leves.',
    partsUsed: ['Flores'],
    traditionalUses: ['Uso tópico em pele', 'Infusões leves'],
    tags: ['pele', 'flor', 'cha']
  }),
  plant({
    id: 'barbatimao',
    slug: 'barbatimao',
    nomePopular: 'Barbatimão',
    nomeCientifico: 'Stryphnodendron adstringens',
    familia: 'Fabaceae',
    summary: 'Árvore do Cerrado; casca adstringente na tradição popular brasileira.',
    partsUsed: ['Casca'],
    traditionalUses: ['Decoctos e uso tópico tradicional'],
    tags: ['cerrado', 'nativa', 'adstringente']
  }),
  plant({
    id: 'jaborandi',
    slug: 'jaborandi',
    nomePopular: 'Jaborandi',
    nomeCientifico: 'Pilocarpus microphyllus',
    familia: 'Rutaceae',
    summary: 'Espécie amazônica historicamente importante pela pilocarpina.',
    partsUsed: ['Folhas'],
    traditionalUses: ['Referência histórica farmacológica', 'Fitoterapia regional'],
    cautions: 'Substâncias ativas potentes — uso só com supervisão profissional. Conteúdo educacional.',
    tags: ['amazonia', 'historica', 'nativa']
  }),
  plant({
    id: 'ipecacuanha',
    slug: 'ipecacuanha',
    nomePopular: 'Ipecacuanha',
    nomeCientifico: 'Carapichea ipecacuanha',
    familia: 'Rubiaceae',
    summary: 'Planta brasileira histórica na farmacopeia; raiz de uso restrito.',
    partsUsed: ['Raiz'],
    traditionalUses: ['Referência histórica farmacêutica'],
    cautions: 'Uso tóxico se inadequado — não automedicar. Conteúdo educacional apenas.',
    tags: ['historica', 'nativa', 'farmacopeia']
  }),
  plant({
    id: 'pfaffia',
    slug: 'pfaffia',
    nomePopular: 'Pfaffia (ginseng-brasileiro)',
    nomeCientifico: 'Pfaffia glomerata',
    familia: 'Amaranthaceae',
    summary: 'Raiz conhecida como ginseng-brasileiro na tradição popular.',
    partsUsed: ['Raiz'],
    traditionalUses: ['Preparações tradicionais tonificantes'],
    tags: ['nativa', 'raiz', 'tradicional']
  }),
  plant({
    id: 'aroeira',
    slug: 'aroeira',
    nomePopular: 'Aroeira',
    nomeCientifico: 'Schinus terebinthifolia',
    familia: 'Anacardiaceae',
    summary: 'Árvore comum no Brasil; casca e folhas na medicina popular e culinária (pimenta-rosa).',
    partsUsed: ['Casca', 'Folhas', 'Frutos'],
    traditionalUses: ['Uso tópico tradicional', 'Culinária (frutos)'],
    tags: ['nativa', 'culinaria', 'pele']
  }),
  plant({
    id: 'quina',
    slug: 'quina',
    nomePopular: 'Quina',
    nomeCientifico: 'Cinchona sp.',
    familia: 'Rubiaceae',
    summary: 'Género histórico da quina; casca associada à quinine na história da medicina.',
    partsUsed: ['Casca'],
    traditionalUses: ['Referência histórica antimalárica'],
    cautions: 'Espécies e usos regulamentados; não automedicar. Conteúdo educacional.',
    tags: ['historica', 'farmacopeia']
  }),
  plant({
    id: 'cannabis-sativa',
    slug: 'cannabis-sativa',
    nomePopular: 'Cannabis (medicinal)',
    nomeCientifico: 'Cannabis sativa L.',
    familia: 'Cannabaceae',
    summary:
      'Espécie com uso terapêutico regulamentado em contextos clínicos e formativos. Destaque do curso UNIFESP e da inspeção do laboratório.',
    partsUsed: ['Flores', 'Extratos (contexto clínico)'],
    traditionalUses: [
      'Educação sobre uso terapêutico (curso UNIFESP)',
      'Referência em fitoterapia e legislação brasileira'
    ],
    cautions:
      'Uso medicinal sujeito a legislação e prescrição. Conteúdo educacional — não incentiva cultivo ilícito nem automedicação.',
    tags: ['medicinal', 'unifesp', 'legislacao', 'fitoterapia'],
    relatedUnifesp: true
  })
];

const payload = {
  updatedAt: new Date().toISOString(),
  disclaimer:
    'Fichas educacionais de plantas fitoterápicas e medicinais do Brasil. Não substituem orientação profissional de saúde nem aconselhamento jurídico.',
  plants
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log('Wrote', plants.length, 'plants →', OUT);
