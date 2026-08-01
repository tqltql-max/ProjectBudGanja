'use strict';

/**
 * Coloca no hub Frutos os frutos que sofrem transformação industrial
 * (catálogo + i18n + sugestões Fruto/Derivado). Abacate já tem derivado feito.
 *
 * Uso: node scripts/seed-frutos-industriais.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PLANTAS = path.join(ROOT, 'content', 'plantas.json');
const I18N = path.join(ROOT, 'content', 'plantas-i18n.json');
const SUG = path.join(ROOT, 'content', 'inspecoes-sugestoes.json');

/** Frutos do eixo «inteiro → ultraprocessado / açúcar / aditivos». */
const FRUTOS = [
  {
    id: 'abacate',
    existing: true,
    sci: 'Persea americana Mill.',
    familia: 'Lauraceae',
    nome: { pt: 'Abacate', en: 'Avocado', es: 'Aguacate' },
    summary: {
      pt: 'Fruto mesoamericano: polpa rica em MUFA — a ficha separa o fruto inteiro dos derivados industriais açucarados e aditivados.',
      en: 'Mesoamerican fruit: MUFA-rich pulp — this sheet separates the whole fruit from sugary, additive-laden industrial derivatives.',
      es: 'Fruto mesoamericano: pulpa rica en MUFA — la ficha separa el fruto entero de los derivados industriales azucarados y aditivados.'
    },
    industrial: {
      pt: 'óleo refinado, guacamole de prateleira, batidos e sobremesas com açúcar',
      en: 'refined oil, shelf guacamole, sugary shakes and desserts',
      es: 'aceite refinado, guacamole de estantería, batidos y postres con azúcar'
    },
    derivadoFeito: true,
    derivadoHref: '/posts/post-inspecao-derivado-abacate.html',
    wiki: 'https://pt.wikipedia.org/wiki/Abacate',
    tagsExtra: ['americas', 'lipidos', 'etimo']
  },
  {
    id: 'coco',
    existing: true,
    sci: 'Cocos nucifera L.',
    familia: 'Arecaceae',
    nome: { pt: 'Coco', en: 'Coconut', es: 'Coco' },
    summary: {
      pt: 'Drupa tropical: água e polpa — separar fresco de água adoçada, óleo refinado e ultraprocessados.',
      en: 'Tropical drupe: water and pulp — separate fresh from sweetened water, refined oil and ultra-processed products.',
      es: 'Drupa tropical: agua y pulpa — separar fresco de agua endulzada, aceite refinado y ultraprocesados.'
    },
    industrial: {
      pt: 'água adoçada, leite UHT, óleo refinado/MCT, coco ralado açucarado',
      en: 'sweetened water, UHT milk, refined/MCT oil, sweetened shreds',
      es: 'agua endulzada, leche UHT, aceite refinado/MCT, rallado azucarado'
    },
    derivadoFeito: true,
    derivadoHref: '/posts/post-inspecao-derivado-coco.html',
    wiki: 'https://pt.wikipedia.org/wiki/Coco',
    tagsExtra: ['tropicais', 'lipidos', 'etimo']
  },
  {
    id: 'laranja',
    sci: 'Citrus × sinensis (L.) Osbeck',
    familia: 'Rutaceae',
    nome: { pt: 'Laranja', en: 'Orange', es: 'Naranja' },
    summary: {
      pt: 'Citrino: fruto inteiro vs suco concentrado, néctares e refrigerantes «de laranja» com açúcar e aditivos.',
      en: 'Citrus: whole fruit vs concentrate juice, nectars and “orange” soft drinks with sugar and additives.',
      es: 'Cítrico: fruto entero vs jugo concentrado, néctares y refrescos «de naranja» con azúcar y aditivos.'
    },
    industrial: {
      pt: 'suco concentrado, néctar, refrigerante, aromas e corantes',
      en: 'concentrate juice, nectar, soft drinks, flavours and colours',
      es: 'jugo concentrado, néctar, refrescos, aromas y colorantes'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Laranja',
    tagsExtra: ['citricos', 'suco']
  },
  {
    id: 'acai',
    sci: 'Euterpe oleracea Mart.',
    familia: 'Arecaceae',
    nome: { pt: 'Açaí', en: 'Açaí', es: 'Açaí' },
    summary: {
      pt: 'Palmeira amazónica: polpa fresca vs bowls industriais, xaropes e mixes ultraprocessados açucarados.',
      en: 'Amazon palm: fresh pulp vs industrial bowls, syrups and sugary ultra-processed mixes.',
      es: 'Palmera amazónica: pulpa fresca vs bowls industriales, jarabes y mixes ultraprocesados azucarados.'
    },
    industrial: {
      pt: 'polpa pasteurizada, bowl/sorvete com xarope, snacks «açaí»',
      en: 'pasteurized pulp, bowl/ice cream with syrup, “açaí” snacks',
      es: 'pulpa pasteurizada, bowl/helado con jarabe, snacks «açaí»'
    },
    wiki: 'https://pt.wikipedia.org/wiki/A%C3%A7a%C3%AD',
    tagsExtra: ['amazonia', 'polpa', 'tropicais']
  },
  {
    id: 'manga',
    sci: 'Mangifera indica L.',
    familia: 'Anacardiaceae',
    nome: { pt: 'Manga', en: 'Mango', es: 'Mango' },
    summary: {
      pt: 'Fruto tropical: manga inteira vs néctares, polpas adoçadas e snacks desidratados industriais.',
      en: 'Tropical fruit: whole mango vs nectars, sweetened pulps and industrial dried snacks.',
      es: 'Fruto tropical: mango entero vs néctares, pulpas endulzadas y snacks deshidratados industriales.'
    },
    industrial: {
      pt: 'néctar, polpa adoçada, doce, chips',
      en: 'nectar, sweetened pulp, sweets, chips',
      es: 'néctar, pulpa endulzada, dulce, chips'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Manga',
    tagsExtra: ['tropicais', 'polpa']
  },
  {
    id: 'banana',
    sci: 'Musa spp.',
    familia: 'Musaceae',
    nome: { pt: 'Banana', en: 'Banana', es: 'Plátano / banana' },
    summary: {
      pt: 'Fruto cotidiano: banana inteira vs chips fritos, farinhas, snacks e sobremesas industriais.',
      en: 'Everyday fruit: whole banana vs fried chips, flours, snacks and industrial desserts.',
      es: 'Fruto cotidiano: banana entera vs chips fritos, harinas, snacks y postres industriales.'
    },
    industrial: {
      pt: 'chips, farinha, snacks e sobremesas ultraprocessadas',
      en: 'chips, flour, snacks and ultra-processed desserts',
      es: 'chips, harina, snacks y postres ultraprocesados'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Banana',
    tagsExtra: ['alimento', 'snacks']
  },
  {
    id: 'maca',
    sci: 'Malus domestica Borkh.',
    familia: 'Rosaceae',
    nome: { pt: 'Maçã', en: 'Apple', es: 'Manzana' },
    summary: {
      pt: 'Fruto temperado: maçã inteira vs sucos concentrados, purés infantis e snacks «apple» industriais.',
      en: 'Temperate fruit: whole apple vs concentrate juices, baby purées and industrial “apple” snacks.',
      es: 'Fruto templado: manzana entera vs jugos concentrados, purés infantiles y snacks «apple» industriales.'
    },
    industrial: {
      pt: 'suco concentrado, puré, chips e snacks',
      en: 'concentrate juice, purée, chips and snacks',
      es: 'jugo concentrado, puré, chips y snacks'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Ma%C3%A7%C3%A3',
    tagsExtra: ['suco', 'snacks']
  },
  {
    id: 'abacaxi',
    sci: 'Ananas comosus (L.) Merr.',
    familia: 'Bromeliaceae',
    nome: { pt: 'Abacaxi', en: 'Pineapple', es: 'Piña' },
    summary: {
      pt: 'Bromélia tropical: fruto fresco vs lata em calda, sucos e néctares com açúcar.',
      en: 'Tropical bromeliad: fresh fruit vs canned in syrup, juices and sugary nectars.',
      es: 'Bromelia tropical: fruto fresco vs lata en almíbar, jugos y néctares azucarados.'
    },
    industrial: {
      pt: 'lata em calda, suco, néctar, doces',
      en: 'canned in syrup, juice, nectar, sweets',
      es: 'lata en almíbar, jugo, néctar, dulces'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Abacaxi',
    tagsExtra: ['tropicais', 'calda']
  },
  {
    id: 'goiaba',
    sci: 'Psidium guajava L.',
    familia: 'Myrtaceae',
    nome: { pt: 'Goiaba', en: 'Guava', es: 'Guayaba' },
    summary: {
      pt: 'Fruto brasileiro comum: goiaba inteira vs goiabada, polpas e néctares ricos em açúcar.',
      en: 'Common Brazilian fruit: whole guava vs guava paste, pulps and sugar-rich nectars.',
      es: 'Fruto brasileño común: guayaba entera vs pasta de guayaba, pulpas y néctares ricos en azúcar.'
    },
    industrial: {
      pt: 'goiabada, polpa, néctar, doces de corte',
      en: 'guava paste, pulp, nectar, slab sweets',
      es: 'pasta de guayaba, pulpa, néctar, dulces'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Goiaba',
    tagsExtra: ['brasileira', 'doce']
  },
  {
    id: 'cacau',
    sci: 'Theobroma cacao L.',
    familia: 'Malvaceae',
    nome: { pt: 'Cacau', en: 'Cacao', es: 'Cacao' },
    summary: {
      pt: 'Semente/fruto amazónico-mesoamericano: amêndoa vs chocolate industrial, açúcar e ultra processamento.',
      en: 'Amazonian–Mesoamerican seed/fruit: bean vs industrial chocolate, sugar and ultra-processing.',
      es: 'Semilla/fruto amazónico-mesoamericano: almendra vs chocolate industrial, azúcar y ultraprocesamiento.'
    },
    industrial: {
      pt: 'chocolate, cacau em pó açucarado, snacks e bebidas',
      en: 'chocolate, sweetened cocoa powder, snacks and drinks',
      es: 'chocolate, cacao en polvo azucarado, snacks y bebidas'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Cacau',
    tagsExtra: ['amazonia', 'chocolate', 'lipidos']
  },
  {
    id: 'uva',
    sci: 'Vitis vinifera L.',
    familia: 'Vitaceae',
    nome: { pt: 'Uva', en: 'Grape', es: 'Uva' },
    summary: {
      pt: 'Bagão: uva inteira vs sucos concentrados, néctares e refrigerantes «de uva» com açúcar.',
      en: 'Grape: whole fruit vs concentrate juices, nectars and sugary “grape” soft drinks.',
      es: 'Uva: fruto entero vs jugos concentrados, néctares y refrescos «de uva» azucarados.'
    },
    industrial: {
      pt: 'suco concentrado, néctar, refrigerante',
      en: 'concentrate juice, nectar, soft drinks',
      es: 'jugo concentrado, néctar, refrescos'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Uva',
    tagsExtra: ['suco']
  },
  {
    id: 'morango',
    sci: 'Fragaria × ananassa Duchesne',
    familia: 'Rosaceae',
    nome: { pt: 'Morango', en: 'Strawberry', es: 'Fresa' },
    summary: {
      pt: 'Fruto vermelho: morango fresco vs iogurtes, caldas, aromas e ultraprocessados «strawberry».',
      en: 'Red fruit: fresh strawberry vs yogurts, syrups, flavours and “strawberry” ultra-processed products.',
      es: 'Fruto rojo: fresa fresca vs yogures, jarabes, aromas y ultraprocesados «strawberry».'
    },
    industrial: {
      pt: 'iogurte, calda, aroma, geleia industrial',
      en: 'yogurt, syrup, flavour, industrial jam',
      es: 'yogur, jarabe, aroma, mermelada industrial'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Morango',
    tagsExtra: ['calda', 'aroma']
  },
  {
    id: 'maracuja-fruta',
    sci: 'Passiflora edulis Sims',
    familia: 'Passifloraceae',
    nome: {
      pt: 'Maracujá (fruta)',
      en: 'Passion fruit',
      es: 'Maracuyá (fruta)'
    },
    summary: {
      pt: 'Fruto de *P. edulis*: polpa fresca vs néctares e polpas industriais adoçadas — distinto da ficha medicinal de folhas (*P. incarnata*).',
      en: '*P. edulis* fruit: fresh pulp vs industrial sweetened nectars/pulps — distinct from the medicinal leaf sheet (*P. incarnata*).',
      es: 'Fruto de *P. edulis*: pulpa fresca vs néctares y pulpas industriales endulzadas — distinto de la ficha medicinal de hojas.'
    },
    industrial: {
      pt: 'polpa pasteurizada, néctar, concentrado com açúcar',
      en: 'pasteurized pulp, nectar, sugar concentrate',
      es: 'pulpa pasteurizada, néctar, concentrado con azúcar'
    },
    wiki: 'https://pt.wikipedia.org/wiki/Passiflora_edulis',
    tagsExtra: ['polpa', 'tropicais'],
    notes:
      'Não confundir com /plantas/maracuja/ (folhas medicinais). Aqui o objecto é o fruto comestível industrializado.'
  }
];

function plantObject(f) {
  const tags = ['alimento', 'frutos', 'frutifera', 'culinaria'].concat(f.tagsExtra || []);
  const uniq = [...new Set(tags)];
  const plant = {
    id: f.id,
    slug: f.id,
    nomePopular: f.nome.pt,
    nomeCientifico: f.sci,
    familia: f.familia,
    hubCategory: 'fruto',
    summary: f.summary.pt,
    partsUsed: ['Fruto (polpa / sumo natural)', 'Preparações culinárias de baixo processamento'],
    traditionalUses: [
      'Consumo do fruto inteiro ou fresco',
      'Culinária doméstica sem ultraprocessamento'
    ],
    cautions:
      'Fruto fresco é alimento comum. Derivados industriais com açúcar, xaropes e aditivos entram na série Derivados de risco. Conteúdo educacional — não substitui orientação profissional.',
    tags: uniq,
    relatedUnifesp: false,
    cover: null,
    relatedInspections: []
  };
  if (f.derivadoFeito && f.derivadoHref) {
    plant.relatedInspections.push({
      href: f.derivadoHref,
      label: 'Inspeção: Derivados — ' + f.nome.pt,
      labelEn: 'Inspection: Derivatives — ' + f.nome.en,
      labelEs: 'Inspección: Derivados — ' + f.nome.es
    });
  }
  return plant;
}

function i18nEntry(f) {
  return {
    nomePopularEn: f.nome.en,
    nomePopularEs: f.nome.es,
    summaryEn: f.summary.en,
    summaryEs: f.summary.es,
    partsUsedEn: ['Fruit (pulp / natural juice)', 'Low-process culinary uses'],
    partsUsedEs: ['Fruto (pulpa / jugo natural)', 'Usso culinario de bajo procesamiento'],
    traditionalUsesEn: ['Whole / fresh fruit', 'Home cooking without ultra-processing'],
    traditionalUsesEs: ['Fruto entero / fresco', 'Cocina casera sin ultraprocesamiento'],
    cautionsEn:
      'Fresh fruit is common food. Industrial derivatives with sugar, syrups and additives belong in Risk derivatives. Educational content — not professional advice.',
    cautionsEs:
      'El fruto fresco es alimento común. Los derivados industriales con azúcar y aditivos entran en Derivados de riesgo. Contenido educativo — no sustituye orientación profesional.'
  };
}

function upsertSug(items, entry) {
  const i = items.findIndex((x) => x.id === entry.id);
  if (i >= 0) items[i] = Object.assign({}, items[i], entry);
  else items.push(entry);
}

function main() {
  const plantas = JSON.parse(fs.readFileSync(PLANTAS, 'utf8'));
  const plants = Array.isArray(plantas.plants) ? plantas.plants : [];

  const i18n = JSON.parse(fs.readFileSync(I18N, 'utf8'));
  if (!i18n.plants) i18n.plants = {};

  for (const f of FRUTOS) {
    const prev = plants.find((p) => (p.id || p.slug) === f.id);
    if (prev) {
      prev.hubCategory = 'fruto';
      const tags = Array.isArray(prev.tags) ? prev.tags.slice() : [];
      ['alimento', 'frutos', 'frutifera'].forEach((t) => {
        if (!tags.includes(t)) tags.push(t);
      });
      prev.tags = tags;
      if (f.derivadoFeito && f.derivadoHref) {
        const rel = Array.isArray(prev.relatedInspections)
          ? prev.relatedInspections
          : [];
        if (!rel.some((r) => r && r.href === f.derivadoHref)) {
          rel.push({
            href: f.derivadoHref,
            label: 'Inspeção: Derivados — ' + f.nome.pt,
            labelEn: 'Inspection: Derivatives — ' + f.nome.en,
            labelEs: 'Inspección: Derivados — ' + f.nome.es
          });
          prev.relatedInspections = rel;
        }
      }
      console.log('update', f.id, '→ fruto');
      // Keep richer existing i18n; only fill missing keys.
      i18n.plants[f.id] = Object.assign({}, i18nEntry(f), i18n.plants[f.id] || {});
    } else {
      plants.push(plantObject(f));
      i18n.plants[f.id] = i18nEntry(f);
      console.log('add', f.id);
    }
  }

  plantas.plants = plants;
  fs.writeFileSync(PLANTAS, JSON.stringify(plantas, null, 2) + '\n', 'utf8');
  fs.writeFileSync(I18N, JSON.stringify(i18n, null, 2) + '\n', 'utf8');

  const sug = JSON.parse(fs.readFileSync(SUG, 'utf8'));
  const items = Array.isArray(sug.items) ? sug.items : [];

  FRUTOS.forEach((f, idx) => {
    const fruitHref = '/posts/post-inspecao-planta-' + f.id + '.html';
    upsertSug(items, {
      id: 'fruto-' + f.id,
      title: f.nome.pt + ' — fruto vs indústria',
      titleEn: f.nome.en + ' — fruit vs industry',
      titleEs: f.nome.es + ' — fruto vs industria',
      tipo: 'fruto',
      priority: f.derivadoFeito ? 2 : 3,
      status: 'feita',
      why:
        'Frutos: ' +
        f.nome.pt +
        ' no hub — crédito ao fruto inteiro; sofrimento industrial = ' +
        f.industrial.pt +
        '.',
      whyEn:
        'Fruits: ' +
        f.nome.en +
        ' on hub — credit whole fruit; industrial path = ' +
        f.industrial.en +
        '.',
      whyEs:
        'Frutos: ' +
        f.nome.es +
        ' en el hub — crédito al fruto entero; vía industrial = ' +
        f.industrial.es +
        '.',
      suggestedSlug: 'inspecao-planta-' + f.id,
      doneHref: fruitHref,
      seriesHint: 'plantas-frutos',
      sources: [f.wiki, '/plantas/' + f.id + '/'],
      notes: f.notes || 'hubCategory: fruto; par com Derivados quando aplicável.'
    });

    if (!f.derivadoFeito) {
      upsertSug(items, {
        id: 'derivado-' + f.id,
        title: 'Derivados do ' + f.nome.pt + ' — ' + f.industrial.pt,
        titleEn: f.nome.en + ' derivatives — ' + f.industrial.en,
        titleEs: 'Derivados de ' + f.nome.es + ' — ' + f.industrial.es,
        tipo: 'derivado',
        priority: 3,
        status: 'ideia',
        why:
          'Derivados de risco: ' +
          f.nome.pt +
          ' inteiro vs matriz industrial (' +
          f.industrial.pt +
          '); cruzar com cana/açúcares livres.',
        whyEn:
          'Risk derivatives: whole ' +
          f.nome.en +
          ' vs industrial matrix (' +
          f.industrial.en +
          '); cross free sugars / sugarcane.',
        whyEs:
          'Derivados de riesgo: ' +
          f.nome.es +
          ' entero vs matriz industrial (' +
          f.industrial.es +
          '); cruzar azúcares libres / caña.',
        suggestedSlug: 'inspecao-derivado-' + f.id,
        seriesHint: 'plantas-derivados-risco',
        sources: [
          f.wiki,
          fruitHref,
          '/posts/post-inspecao-derivado-cana-de-acucar.html',
          '/biblioteca/inspecoes/#inspecoes-frutos'
        ],
        notes: 'Fruto ≠ vilão; foco açúcar × aditivos × dose. Ordem fila ~' + (idx + 1)
      });
    }
  });

  sug.items = items;
  sug.updatedAt = new Date().toISOString();
  fs.writeFileSync(SUG, JSON.stringify(sug, null, 2) + '\n', 'utf8');

  console.log('OK frutos industriais:', FRUTOS.length);
}

main();
