'use strict';

/**
 * Derivados de risco · frutos ainda em fila.
 * Método BudGanja: fruto inteiro ≠ vilão; auditar açúcar × aditivos × dose.
 * Cruza planta-mãe + cana / açúcares livres.
 */

const fs = require('fs');
const path = require('path');
const { derivadoPost } = require('./derivados-inspecoes-posts.js');

const INSPECTED = '2026-08-24';
const HUB = '/biblioteca/inspecoes/#inspecoes-derivados';
const CANA = '/posts/post-inspecao-derivado-cana-de-acucar.html';
const WHO =
  'https://www.who.int/news-room/fact-sheets/detail/sugars-and-dental-caries';
const WHO_UP =
  'https://www.who.int/news-room/questions-and-answers/item/ultra-processed-foods';
const ANVISA =
  'https://www.gov.br/anvisa/pt-br/assuntos/alimentos/aditivos-alimentares';

function pickOrder(slug, start) {
  let seriesOrder = start;
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const existing = posts.find((p) => p.slug === slug);
    if (existing && Number(existing.seriesOrder)) return Number(existing.seriesOrder);
    const orders = posts
      .filter((p) => p.series === 'plantas-derivados-risco')
      .map((p) => Number(p.seriesOrder) || 0);
    seriesOrder = (orders.length ? Math.max(...orders) : start - 1) + 1;
  } catch (_) {
    /* keep start */
  }
  return seriesOrder;
}

/** Configuração por fruto — cada ficha muda química, produtos e alerta. */
const FRUIT_DERIVADO_CONFIGS = [
  {
    id: 'laranja',
    plantSlug: 'laranja',
    namePt: 'Laranja',
    nameEn: 'Orange',
    nameEs: 'Naranja',
    latin: 'Citrus × sinensis (L.) Osbeck',
    family: 'Rutaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Laranja',
    productsPt:
      'Suco reconstitído, néctar, refrigerante «de laranja», geleia, aroma e corantes',
    productsEn:
      'Reconstituted juice, nectar, orange soft drinks, jelly, flavour and colours',
    productsEs:
      'Jugo reconstituido, néctar, refresco «de naranja», jalea, aroma y colorantes',
    baselinePt:
      'Vitamina C, flavonoides (hesperidina), fibra no fruto inteiro; o suco perde o bagaço',
    industrialPt:
      'Concentrado + água + açúcar/xarope + acidulantes + aromas + conservantes ± corantes',
    extraAlertPt:
      'Néctar e refrigerante **não** são o sumo da fruta. No rótulo, procurar **% de suco**.',
    mapRows: [
      ['Fruto inteiro (gomos)', 'Alimento', 'Fibra, C, hesperidina; dose = peça inteira'],
      ['Sumo fresco espremido', 'Baixo processamento', 'Perde fibra; açúcares do fruto ficam livres'],
      ['Suco de concentrado', 'Reconstituição industrial', 'Água + concentrado ± açúcar ± aromas'],
      ['Néctar «de laranja»', 'Bebida adoçada', 'Pouca fruta + muita água + açúcar — ler %'],
      ['Refrigerante / aroma', 'Ultraprocessado', 'Aroma e corante podem substituir a fruta']
    ],
    chemRows: [
      ['Flavonoides / C', 'Hesperidina, ácido ascórbico no fruto'],
      ['Óleo da casca', 'Limoneno — zest culinário; não é o refrigerante'],
      ['Açúcares livres', 'Suco e néctar concentram sem o bagaço']
    ]
  },
  {
    id: 'acai',
    plantSlug: 'acai',
    namePt: 'Açaí',
    nameEn: 'Açaí',
    nameEs: 'Açaí',
    latin: 'Euterpe oleracea Mart.',
    family: 'Arecaceae',
    wiki: 'https://pt.wikipedia.org/wiki/A%C3%A7a%C3%AD',
    productsPt:
      'Polpa pasteurizada, bowl/sorvete com xarope, granola industrial, snacks «açaí»',
    productsEn:
      'Pasteurized pulp, bowl/ice cream with syrup, industrial granola, “açaí” snacks',
    productsEs:
      'Pulpa pasteurizada, bowl/helado con jarabe, granola industrial, snacks «açaí»',
    baselinePt:
      'Antocianinas e lípidos da polpa amazónica; o bowl de vitrine costuma ser xarope + granola + leite condensado',
    industrialPt:
      'Polpa + guarana/xarope + açúcar + granola ultraprocessada ± leite condensado ± aroma',
    extraAlertPt:
      '«Superfood» no copo **não** apaga o açúcar de cobertura. A polpa pura (sal/sem açúcar) não é o bowl de shopping.',
    mapRows: [
      ['Fruto / polpa tradicional', 'Alimento regional', 'Açaí com farinha/peixe — contexto amazónico'],
      ['Polpa pasteurizada', 'Processada', 'Conveniência; ler se já vem adoçada'],
      ['Bowl / sorvete de vitrine', 'Matriz açucarada', 'Xarope + granola + condensado = eixo cana'],
      ['Snack / pó «açaí»', 'Ultraprocessado possível', 'Pode ter pouca polpa real']
    ],
    chemRows: [
      ['Antocianinas', 'Cor escura da polpa — não autoriza o xarope'],
      ['Lípidos da polpa', 'Energia densa mesmo sem açúcar extra'],
      ['Xarope / guarana doce', 'Açúcares livres no copo «saudável»']
    ]
  },
  {
    id: 'manga',
    plantSlug: 'manga',
    namePt: 'Manga',
    nameEn: 'Mango',
    nameEs: 'Mango',
    latin: 'Mangifera indica L.',
    family: 'Anacardiaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Manga',
    productsPt: 'Néctar, polpa adoçada, doce, chips e snacks «mango»',
    productsEn: 'Nectar, sweetened pulp, sweets, chips and “mango” snacks',
    productsEs: 'Néctar, pulpa endulzada, dulce, chips y snacks «mango»',
    baselinePt:
      'Carotenóides, fibra e açúcares do fruto maduro; néctar e doce industrial acrescentam sacarose',
    industrialPt: 'Polpa + água + açúcar + acidulantes + conservantes ± aroma',
    extraAlertPt:
      'Anacardiaceae: quem reage a caju/manga inteira continua a precisar de ler o rótulo — o néctar não «cura» alergia.',
    mapRows: [
      ['Fruto maduro', 'Alimento', 'Fibra + carotenóides; caroço/folha ≠ polpa'],
      ['Polpa congelada', 'Processada', 'Útil; verificar açúcar adicionado'],
      ['Néctar / suco', 'Adoçado', '% de manga vs água e açúcar'],
      ['Doce / chips', 'Concentrado ou frito', 'Calda ou óleo + sal/açúcar']
    ],
    chemRows: [
      ['Mangiferina / carotenóides', 'Marcadores do fruto — não do néctar diluído'],
      ['Açúcar da calda', 'Doce e néctar cruzam [cana](' + CANA + ')'],
      ['Látex do fruto verde', 'Irritação possível — não é o eixo desta ficha']
    ]
  },
  {
    id: 'banana',
    plantSlug: 'banana',
    namePt: 'Banana',
    nameEn: 'Banana',
    nameEs: 'Plátano / banana',
    latin: 'Musa spp.',
    family: 'Musaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Banana',
    productsPt: 'Chips, farinha, snacks e sobremesas ultraprocessadas',
    productsEn: 'Chips, flour, snacks and ultra-processed desserts',
    productsEs: 'Chips, harina, snacks y postres ultraprocesados',
    baselinePt:
      'Amido resistente na verde; açúcares na madura; chips e «banana bread» industrial mudam a matriz',
    industrialPt: 'Fritura + sal/açúcar; ou farinha + açúcar + gordura + aditivos em bolos e barras',
    extraAlertPt:
      'Banana inteira ≠ chips de pacote. Farinha de banana pode ser alimento; o bolo de vitrine é outra sala.',
    mapRows: [
      ['Fruto (verde / maduro)', 'Alimento', 'Amido → açúcares com a maduração'],
      ['Farinha / biomassa', 'Processada', 'Culinária; ler se há açúcar na mistura'],
      ['Chips fritos', 'Snack', 'Óleo + sal ± açúcar — densidade energética'],
      ['Bolo / barra «banana»', 'Ultraprocessado possível', 'Pouca fruta, muito açúcar e gordura']
    ],
    chemRows: [
      ['Amido / açúcares do fruto', 'Mudam com o ponto de maduração'],
      ['Acrilamida (fritura)', 'Risco de processo em chips — ler modo de fabrico'],
      ['Potássio da polpa', 'Não resgata o pacote frito']
    ]
  },
  {
    id: 'maca',
    plantSlug: 'maca',
    namePt: 'Maçã',
    nameEn: 'Apple',
    nameEs: 'Manzana',
    latin: 'Malus domestica Borkh.',
    family: 'Rosaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Ma%C3%A7%C3%A3',
    productsPt: 'Suco concentrado, puré, chips e snacks',
    productsEn: 'Concentrate juice, purée, chips and snacks',
    productsEs: 'Jugo concentrado, puré, chips y snacks',
    baselinePt:
      'Pectina e fibra na fruta com casca; suco clarificado é açúcar livre sem o bagaço',
    industrialPt: 'Concentrado + água ± açúcar + acidulantes; puré infantil e snacks «apple»',
    extraAlertPt:
      '«Feito com maçã» no pacote de snack não devolve a peça inteira. Sumo de maçã conta como açúcares livres (OMS).',
    mapRows: [
      ['Fruto com casca', 'Alimento', 'Pectina, quercetina, mastigação'],
      ['Puré caseiro', 'Baixo processamento', 'Sem açúcar extra — ainda é fruta'],
      ['Suco de concentrado', 'Açúcares livres', 'Sem fibra; dose fácil de exagerar'],
      ['Chips / snacks «apple»', 'Ultraprocessado possível', 'Açúcar, óleo, aromas']
    ],
    chemRows: [
      ['Pectina / fibra', 'Ficam na peça; saem no suco clarificado'],
      ['Sorbitol', 'Em algumas maçãs — efeito GI individual, não pânico'],
      ['Açúcar de adição', 'Purés e sucos «para crianças» — ler rótulo']
    ]
  },
  {
    id: 'abacaxi',
    plantSlug: 'abacaxi',
    namePt: 'Abacaxi',
    nameEn: 'Pineapple',
    nameEs: 'Piña',
    latin: 'Ananas comosus (L.) Merr.',
    family: 'Bromeliaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Abacaxi',
    productsPt: 'Lata em calda, suco, néctar, doces',
    productsEn: 'Canned in syrup, juice, nectar, sweets',
    productsEs: 'Lata en almíbar, jugo, néctar, dulces',
    baselinePt:
      'Bromelina na polpa fresca; a lata em calda troca enzima e fibra por açúcar de cobertura',
    industrialPt: 'Calda (sacarose) + acidulantes + conservantes; néctar diluído',
    extraAlertPt:
      'Abacaxi em calda é **fruta + açúcar livre**. O suco «de abacaxi» de caixinha segue o mesmo eixo da [cana](' +
      CANA +
      ').',
    mapRows: [
      ['Fruto fresco', 'Alimento', 'Bromelina, fibra, água'],
      ['Lata em calda', 'Açúcar adicionado', 'Calda = açúcares livres da OMS'],
      ['Suco / néctar', 'Bebida', '% de fruta vs açúcar e água'],
      ['Doce / cristalizado', 'Concentrado', 'Açúcar como conservante e sabor']
    ],
    chemRows: [
      ['Bromelina', 'Enzima da polpa fresca — a calda não a «melhora»'],
      ['Açúcar da calda', 'Eixo cana / açúcares livres'],
      ['Acidez', 'Ácido cítrico técnico em néctares']
    ]
  },
  {
    id: 'goiaba',
    plantSlug: 'goiaba',
    namePt: 'Goiaba',
    nameEn: 'Guava',
    nameEs: 'Guayaba',
    latin: 'Psidium guajava L.',
    family: 'Myrtaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Goiaba',
    productsPt: 'Goiabada, polpa, néctar, doces de corte',
    productsEn: 'Guava paste, pulp, nectar, slab sweets',
    productsEs: 'Pasta de guayaba, pulpa, néctar, dulces de corte',
    baselinePt:
      'Vitamina C e licopeno na goiaba inteira; a goiabada industrial é polpa + muito açúcar',
    industrialPt: 'Polpa + açúcar + pectina ± conservantes; néctar diluído',
    extraAlertPt:
      'Romeu e Julieta é cultura; a **caixa industrial** ainda é açúcar × dose. Goiaba fresca continua crédito.',
    mapRows: [
      ['Fruto inteiro', 'Alimento', 'C, licopeno, sementes/fibra'],
      ['Polpa congelada', 'Processada', 'Verificar açúcar'],
      ['Goiabada / doce de corte', 'Açúcar como matriz', 'Tradicional ≠ dose livre'],
      ['Néctar', 'Bebida adoçada', '% de goiaba no rótulo']
    ],
    chemRows: [
      ['Vit. C / licopeno', 'No fruto; diluem-se no néctar'],
      ['Pectina + açúcar', 'Doce de corte — gelificação + calda'],
      ['Sementes', 'Fibra no fruto; somem no néctar peneirado']
    ]
  },
  {
    id: 'cacau',
    plantSlug: 'cacau',
    namePt: 'Cacau',
    nameEn: 'Cacao',
    nameEs: 'Cacao',
    latin: 'Theobroma cacao L.',
    family: 'Malvaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Cacau',
    productsPt:
      'Liquor, manteiga, cacau em pó açucarado, snacks e bebidas — distinto da barra já fichada',
    productsEn:
      'Liquor, butter, sweetened cocoa powder, snacks and drinks — distinct from the chocolate-bar sheet',
    productsEs:
      'Licor, manteca, cacao en polvo azucarado, snacks y bebidas — distinto de la barra ya fichada',
    baselinePt:
      'Teobromina e flavonoides na amêndoa; o pó «achocolatado» de supermercado é açúcar + leite + aroma',
    industrialPt: 'Pó + açúcar + leite em pó + emulsionantes + aromas; cruzar chocolate industrial',
    extraAlertPt:
      'Esta ficha é a **amêndoa e os semi-acabados** (liquor, manteiga, pó). A **barra / confeito** já tem casa em [Chocolate industrial](/posts/post-inspecao-derivado-chocolate.html). Não fundir as duas salas.',
    extraLinks: [
      ['Chocolate industrial (barra / matriz snack)', '/posts/post-inspecao-derivado-chocolate.html']
    ],
    mapRows: [
      ['Amêndoa / nibs', 'Alimento / ingrediente', 'Teobromina; amargo; sem açúcar de cobertura'],
      ['Liquor / manteiga / pó não açucarado', 'Semi-acabado', 'Base da indústria — ainda não é snack'],
      ['Achocolatado / pó açucarado', 'Matriz açúcar+leite', 'Primeiro ingrediente costuma ser açúcar'],
      ['Barra / confeito', 'Ver ficha chocolate', 'Ultraprocessado típico — outra inspeção']
    ],
    chemRows: [
      ['Teobromina / cafeína', 'Estimulantes da amêndoa — dose, não pânico'],
      ['Flavonoides', 'Caiem com alcalinização (Dutch process) e com açúcar'],
      ['Açúcar + leite em pó', 'Eixo cana + lácteo — ver chocolate']
    ]
  },
  {
    id: 'uva',
    plantSlug: 'uva',
    namePt: 'Uva',
    nameEn: 'Grape',
    nameEs: 'Uva',
    latin: 'Vitis vinifera L.',
    family: 'Vitaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Uva',
    productsPt: 'Suco concentrado, néctar, refrigerante',
    productsEn: 'Concentrate juice, nectar, soft drinks',
    productsEs: 'Jugo concentrado, néctar, refrescos',
    baselinePt:
      'Casca com polifenóis; suco clarificado e refrigerante «de uva» perdem casca e acrescentam açúcar',
    industrialPt: 'Mostos concentrados + água + açúcar + aromas ± corantes',
    extraAlertPt:
      'Esta ficha **não** é inspeção de vinho (álcool = outro eixo). Aqui: suco, néctar e refrigerante. Uva inteira continua crédito.',
    mapRows: [
      ['Cacho inteiro', 'Alimento', 'Casca, grainha, fibra, polifenóis'],
      ['Suco integral / concentrado', 'Açúcares livres', 'Sem casca; dose fácil'],
      ['Néctar', 'Diluído + açúcar', '% de uva no rótulo'],
      ['Refrigerante «uva»', 'Aroma ± corante', 'Pode ter pouca fruta']
    ],
    chemRows: [
      ['Resveratrol / antocianinas', 'Sobretudo na casca — o suco clarificado perde'],
      ['Frutose do mosto', 'Açúcares livres mesmo «100% uva»'],
      ['Álcool (vinho)', 'Fora de escopo — não misturar eixos']
    ]
  },
  {
    id: 'morango',
    plantSlug: 'morango',
    namePt: 'Morango',
    nameEn: 'Strawberry',
    nameEs: 'Fresa',
    latin: 'Fragaria × ananassa Duchesne',
    family: 'Rosaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Morango',
    productsPt: 'Iogurte, calda, aroma, geleia industrial',
    productsEn: 'Yogurt, syrup, flavour, industrial jam',
    productsEs: 'Yogur, jarabe, aroma, mermelada industrial',
    baselinePt:
      'Elagitaninos e vit. C no fruto fresco; «sabor morango» no iogurte pode ser aroma + corante + açúcar',
    industrialPt: 'Aroma + corante + açúcar + conservantes; calda e geleia com pouca fruta',
    extraAlertPt:
      'Preparados «sabor morango» nem sempre listam o fruto no topo. Aroma ≠ gomo.',
    mapRows: [
      ['Fruto fresco', 'Alimento', 'Água, C, polifenóis; perecível'],
      ['Geleia artesanal', 'Açúcar + fruta', 'Dose ainda conta'],
      ['Iogurte / sobremesa', 'Matriz láctea + açúcar', 'Preparados e aromas — ler lista'],
      ['Calda / aroma', 'Química de formulação', 'Pode haver zero morango real']
    ],
    chemRows: [
      ['Elagitaninos / C', 'No fruto; raros no aroma'],
      ['Corantes vermelhos', 'Podem fingir a fruta'],
      ['Açúcar da calda', 'Eixo cana em coberturas']
    ]
  },
  {
    id: 'maracuja-fruta',
    plantSlug: 'maracuja-fruta',
    namePt: 'Maracujá (fruta)',
    nameEn: 'Passion fruit',
    nameEs: 'Maracuyá (fruta)',
    latin: 'Passiflora edulis Sims',
    family: 'Passifloraceae',
    wiki: 'https://pt.wikipedia.org/wiki/Passiflora_edulis',
    productsPt: 'Polpa pasteurizada, néctar, concentrado com açúcar',
    productsEn: 'Pasteurized pulp, nectar, sugar concentrate',
    productsEs: 'Pulpa pasteurizada, néctar, concentrado con azúcar',
    baselinePt:
      'Polpa e sementes do fruto comestível; distinto da ficha de **folhas** medicinais de *Passiflora*',
    industrialPt: 'Polpa + água + açúcar + acidulantes + conservantes',
    extraAlertPt:
      'Não confundir com [Maracujá (planta / folhas)](/posts/post-inspecao-planta-maracuja.html). Aqui o objecto é o **fruto industrializado**, não o chá de folha.',
    extraLinks: [
      [
        'Maracujá — folhas / ficha medicinal (outro objecto)',
        '/posts/post-inspecao-planta-maracuja.html'
      ]
    ],
    mapRows: [
      ['Fruto aberto (polpa+sementes)', 'Alimento', 'Ácido, aroma, fibra das sementes'],
      ['Polpa pasteurizada', 'Processada', 'Conveniência; ver açúcar'],
      ['Néctar / concentrado', 'Adoçado', '% de maracujá vs xarope'],
      ['Aroma «passion fruit»', 'Formulação', 'Pode substituir a polpa']
    ],
    chemRows: [
      ['Ácidos orgânicos / aroma', 'Perfil do fruto — o néctar dilui e adoça'],
      ['Alcalóides das folhas', 'Outra ficha (*Passiflora* medicinal) — não misturar'],
      ['Açúcar de adição', 'Néctares tropicais — eixo cana']
    ]
  },
  {
    id: 'mamao',
    plantSlug: 'mamao',
    namePt: 'Mamão',
    nameEn: 'Papaya',
    nameEs: 'Papaya',
    latin: 'Carica papaya L.',
    family: 'Caricaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Mam%C3%A3o',
    productsPt: 'Néctar, polpa adoçada, doce, snacks «papaya»',
    productsEn: 'Nectar, sweetened pulp, sweets, papaya snacks',
    productsEs: 'Néctar, pulpa endulzada, dulces, snacks «papaya»',
    baselinePt:
      'Papaína na fruta verde/madura; néctar e doce industrial acrescentam açúcar. **Não é mamona** (*Ricinus*).',
    industrialPt: 'Polpa + açúcar + acidulantes ± conservantes',
    extraAlertPt:
      'Mamão ≠ **mamona** (ricina). Esta ficha é *Carica papaya* → néctar/doce. Sementes em «detox» agressivo não são o método.',
    mapRows: [
      ['Fruto maduro', 'Alimento', 'Papaína, carotenóides, água'],
      ['Polpa / néctar', 'Adoçado possível', 'Ler açúcar e % de fruta'],
      ['Doce / cristalizado', 'Calda', 'Açúcares livres'],
      ['Snack «papaya»', 'Ultraprocessado possível', 'Aroma ≠ fruto']
    ],
    chemRows: [
      ['Papaína', 'Enzima da Caricaceae — não justifica o néctar'],
      ['Carotenóides', 'Cor da polpa madura'],
      ['Confusão mamona', 'Ricinus = outro reino de risco — fora desta ficha']
    ]
  },
  {
    id: 'melancia',
    plantSlug: 'melancia',
    namePt: 'Melancia',
    nameEn: 'Watermelon',
    nameEs: 'Sandía',
    latin: 'Citrullus lanatus (Thunb.) Matsum. & Nakai',
    family: 'Cucurbitaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Melancia',
    productsPt: 'Sucos, néctares e ultraprocessados «watermelon»',
    productsEn: 'Juices, nectars and ultra-processed “watermelon” products',
    productsEs: 'Jugos, néctares y ultraprocesados «watermelon»',
    baselinePt:
      'Água, licopeno e citrulina na polpa; suco e gomas industriais acrescentam açúcar e aroma',
    industrialPt: 'Sumo + açúcar + aroma + corante; gomas e bebidas «watermelon»',
    extraAlertPt:
      'Melancia inteira é sobretudo água e um pouco de açúcar do fruto. O **néctar e o doce de goma** são outra matriz.',
    mapRows: [
      ['Fatia inteira', 'Alimento', 'Água, licopeno, citrulina; sementes à parte'],
      ['Suco fresco', 'Açúcares do fruto livres', 'Sem fibra da polpa mastigada'],
      ['Néctar / bebida', 'Adoçado + aroma', 'Corante pode fingir a fatia'],
      ['Gomas / snacks', 'Ultraprocessado', 'Açúcar como estrutura']
    ],
    chemRows: [
      ['Licopeno', 'Cor vermelha da polpa'],
      ['Citrulina', 'Aminoácido da polpa — não é suplemento desta ficha'],
      ['Açúcar + aroma', 'Bebidas e gomas — eixo cana']
    ]
  },
  {
    id: 'marolo',
    plantSlug: 'marolo',
    namePt: 'Marolo',
    nameEn: 'Marolo / araticum',
    nameEs: 'Marolo / araticum',
    latin: 'Annona crassiflora Mart.',
    family: 'Annonaceae',
    wiki: 'https://pt.wikipedia.org/wiki/Annona_crassiflora',
    productsPt: 'Polpas, néctares e licores',
    productsEn: 'Pulps, nectars and liqueurs',
    productsEs: 'Pulpas, néctares y licores',
    baselinePt:
      'Fruto do Cerrado com aroma marcado; polpa adoçada, néctar e licor industrial mudam a dose. Semente ≠ polpa.',
    industrialPt: 'Polpa + açúcar + álcool (licor) ou néctar diluído',
    extraAlertPt:
      'Annonaceae: **não** fazer extracto de semente. Crédito ao fruto fresco/regional; o licor entra no eixo álcool + açúcar (dois riscos).',
    mapRows: [
      ['Fruto fresco (Cerrado)', 'Alimento cultural', 'Polpa aromática; semente de fora'],
      ['Polpa congelada / doce', 'Açúcar possível', 'Ler rótulo'],
      ['Néctar', 'Diluído + açúcar', '% de marolo'],
      ['Licor', 'Álcool + açúcar', 'Dois eixos — não é «superalimento engarrafado»']
    ],
    chemRows: [
      ['Aroma / ésteres da polpa', 'Identidade do fruto'],
      ['Acetogeninas (semente/folha)', 'Não extrair semente — alerta botânico'],
      ['Açúcar + etanol', 'Licor = dose dupla']
    ]
  }
];

function mdTable(headers, rows) {
  const head = '| ' + headers.join(' | ') + ' |';
  const sep = '| ' + headers.map(() => '-------').join(' | ') + ' |';
  const body = rows.map((r) => '| ' + r.join(' | ') + ' |').join('\n');
  return head + '\n' + sep + '\n' + body;
}

function buildFruitDerivadoBodies(cfg) {
  const planta = '/posts/post-inspecao-planta-' + cfg.plantSlug + '.html';
  const ficha = '/plantas/' + cfg.plantSlug + '/';
  const extraLinksMd = (cfg.extraLinks || [])
    .map(([label, href]) => '| [' + label + '](' + href + ') | Complemento desta ficha |')
    .join('\n');

  const of = ofPt(cfg.namePt);
  const body = `## Escopo

Inspeção editorial e **química** dos **derivados industriais ${of} ${cfg.namePt}** (*${cfg.latin}*) — resgatar a planta e o fruto inteiro, e auditar o que acontece quando vira **${cfg.productsPt}**. Cruza com a ficha botânica [${cfg.namePt} (planta)](${planta}) e com [Cana-de-açúcar / açúcares livres](${CANA}).

> **Nota metodológica:** auditoria independente BudGanja. Fontes de partida: [ficha /plantas/${cfg.plantSlug}/](${ficha}), [Wikipédia](${cfg.wiki}), orientações OMS sobre [açúcares livres](${WHO}) e debate sobre [ultraprocessados](${WHO_UP}), enquadramento brasileiro de [aditivos alimentares (Anvisa)](${ANVISA}). **Não é aconselhamento médico nem análise de uma marca concreta.** A planta não é o vilão; o foco é a **matriz alimentar transformada** (açúcar + aditivos + dose). Sem afiliação com a indústria.

${cfg.extraAlertPt}

## Objeto inspecionado

| Campo | Valor |
|-------|-------|
| Planta de origem | **${cfg.namePt}** (*${cfg.latin}*, ${cfg.family}) — [inspeção planta](${planta}) |
| Tipo BudGanja | Derivado de risco — fruto → produto industrial |
| Produtos em foco | ${cfg.productsPt} |
| Riscos químicos em foco | Açúcares livres + aditivos (conservantes, acidulantes, aromas, corantes, espessantes) |
| Data da inspeção | ${INSPECTED} |

## Hipóteses (método BudGanja)

**H1:** o fruto inteiro é quimicamente distinto de um ultraprocessado que **usa** ${cfg.namePt.toLowerCase()} (ou aroma) como marketing.  
**H2:** o dano discute-se no eixo **açúcar + densidade energética + aditivos de formulação + frequência**, não no facto de a planta existir.  
**H3:** literacia de rótulo (lista de ingredientes / funções / % de fruta) é a ferramenta repetível desta série.

## Da planta ao derivado — mapa químico

${mdTable(
  ['Etapa', 'O que é', 'Química / risco editorial'],
  cfg.mapRows
)}

## Química do fruto (baseline) vs matriz industrial

### Baseline — fruto (resumo)

${cfg.baselinePt}

${mdTable(['Classe', 'Marcadores'], cfg.chemRows)}

### O que a indústria acrescenta (funções químicas)

Lista **educacional** — não inventário de uma marca:

| Função | Exemplos típicos (rótulo / INN) | Nota BudGanja |
|--------|----------------------------------|---------------|
| Doçura / energia | Açúcar, glicose, frutose, xarope de glicose-frutose, maltodextrina | Cruza [cana / açúcares livres](${CANA}); dose e frequência |
| Acidulante | Ácido cítrico (E330), ácido ascórbico (E300) | Uso técnico; não «anula» o açúcar |
| Conservante | Sorbato de potássio (E202), benzoato de sódio (E211) | Vida de prateleira; dieta total |
| Espessante / estabilizante | Pectina, gomas, amidos modificados | Textura; elevam ultraprocessamento |
| Aroma / cor | Aromas, corantes | Podem mascarar baixa % de fruta real |
| Industrial deste fruto | ${cfg.industrialPt} | Ler ordem dos ingredientes |

**Combinação de risco (tese editorial):** quando **açúcar (ou xarope)** entra na mesma matriz que aromas + conservantes, o produto deixa de ser «fruta com um pouco de processo» e aproxima-se de um **ultraprocessado** — mesmo que a embalagem mostre o fruto.

## Riscos à saúde — enquadramento (não protocolo clínico)

| Eixo | O que o laboratório regista |
|------|----------------------------|
| Açúcares livres | OMS: limitar açúcares livres (ex. abaixo de 10% da energia; benefício adicional abaixo de 5% em alguns desfechos). Sucos, néctares e caldas podem ultrapassar isso num copo. |
| Substituição alimentar | Trocar o fruto inteiro por snack/bebida «sabor ${cfg.namePt.toLowerCase()}» |
| Aditivos | A maioria autorizada tem limites de uso; o problema editorial é o **padrão de consumo** + a **matriz** (açúcar×aditivos), não o pânico a um único E-número |
| Dose e frequência | Um néctar ocasional ≠ hábito diário de caixinha |

**Veredicto editorial:** ${cfg.namePt} merece crédito como fruto e como capítulo botânico; o **derivado açucarado e aditivado** merece leitura de rótulo e alerta de dose — com método, sem demonizar a planta.

## Como inspeccionar um rótulo (procedimento repetível)

1. Procurar **% de ${cfg.namePt.toLowerCase()}** / suco / polpa ou posição na lista de ingredientes (ordem = quantidade).  
2. Procurar **açúcar / xaropes / maltodextrina** — somar com [eixo cana](${CANA}).  
3. Listar aditivos por **função** (conservante, aroma, corante…).  
4. Comparar com o fruto inteiro ou com um sumo/polpa caseiro sem açúcar extra.  
5. Status: alimento inteiro / processado culinário / ultraprocessado industrial.

## Complementaridade

| Recurso | Papel |
|---------|-------|
| [${cfg.namePt} — planta](${planta}) | Crédito botânico e cautelas da espécie |
| [Cana-de-açúcar](${CANA}) | Açúcares livres e refinação |
| Hub [Derivados](${HUB}) | Série planta → produto de risco |
| [Anvisa — aditivos](${ANVISA}) | Enquadramento regulatório BR |
${extraLinksMd}

## Como repetir o método

1. Separar planta / fruto inteiro de derivado industrial.  
2. Mapear etapas de transformação.  
3. Tabelar classes químicas (açúcar × aditivos).  
4. Ligar a OMS (açúcares) e a literacia de rótulo.  
5. Slug \`inspecao-derivado-…\`.

## Status

**Aprovado na série Derivados de risco** — ${cfg.namePt} documentado como fruto (crédito) e como matriz industrial quando se cruzam **açúcar e aditivos químicos**.

[▶ Derivados](${HUB}) · [▶ Planta ${cfg.namePt}](${planta}) · [▶ Cana](${CANA})
`;

  const contentEn = `## Scope

Editorial and **chemical** inspection of **industrial ${cfg.nameEn} derivatives** (*${cfg.latin}*) — credit the whole fruit, audit **${cfg.productsEn}**. Cross-links: [plant sheet](${planta}), [Sugarcane / free sugars](${CANA}).

> **Method note:** independent BudGanja audit. Starting points: plant catalog, Wikipedia, WHO free sugars / ultra-processed debate, Anvisa additives framing. **Not medical advice.** Not a brand lab test. Plant ≠ villain; focus is **transformed food matrix**.

${cfg.extraAlertPt}

## Inspected object

| Field | Value |
|-------|-------|
| Origin plant | ${cfg.nameEn} — [plant inspection](${planta}) |
| BudGanja type | Risk derivative — fruit → industrial product |
| Focus | ${cfg.productsEn} |
| Chemical focus | Free sugars + additives |
| Date | ${INSPECTED} |

## Hypotheses

**H1:** whole fruit ≠ ultra-processed “${cfg.nameEn.toLowerCase()}” marketing matrix.  
**H2:** risk axis = **sugar + energy density + formulation additives + frequency**.  
**H3:** label literacy is the repeatable tool.

## Chemistry map (summary)

${mdTable(['Stage', 'What it is', 'Editorial note'], cfg.mapRows)}

Baseline: ${cfg.baselinePt}

Industrial add-ons: ${cfg.industrialPt} — sugar / HFCS / maltodextrin · citric/ascorbic acids · sorbate/benzoate · flavours/colours · thickeners. Cross [sugarcane](${CANA}).

## Health framing

WHO free-sugars limits; don’t swap whole fruit for “flavour” snacks. **Editorial verdict:** credit the fruit; alert on sugary additive-laden derivatives.

## Status

**Approved in Risk derivatives.**

[▶ Derivatives](${HUB}) · [▶ Plant](${planta}) · [▶ Sugarcane](${CANA})
`;

  const contentEs = `## Alcance

Inspección editorial y **química** de **derivados industriales de ${cfg.nameEs}** (*${cfg.latin}*) — rescatar el fruto entero y auditar **${cfg.productsEs}**. Cruces: [planta](${planta}), [caña / azúcares libres](${CANA}).

> **Nota metodológica:** auditoría independiente. No es consejo médico ni análisis de una marca. La planta no es el villano; el foco es la **matriz transformada**.

${cfg.extraAlertPt}

## Objeto

| Campo | Valor |
|-------|-------|
| Planta | ${cfg.nameEs} — [inspección planta](${planta}) |
| Tipo | Derivado de riesgo |
| Foco | ${cfg.productsEs} |
| Química | Azúcares libres + aditivos |
| Fecha | ${INSPECTED} |

## Hipótesis

**H1:** fruto entero ≠ ultraprocesado con marketing.  
**H2:** riesgo = **azúcar + densidad energética + aditivos + frecuencia**.  
**H3:** leer la etiqueta es el método repetible.

## Mapa (resumen)

Industrial: ${cfg.industrialPt} — ver tabla completa en la ficha PT. Cruce [caña](${CANA}).

## Estado

**Aprobada en Derivados de riesgo**.

[▶ Derivados](${HUB}) · [▶ Planta](${planta}) · [▶ Caña](${CANA})
`;

  return { body, contentEn, contentEs };
}

function articlePt(name) {
  const n = String(name || '');
  if (/^(Açaí|Abacaxi)$/i.test(n)) return 'do';
  if (/^(Melancia|Maçã|Manga|Uva|Goiaba|Banana|Laranja)$/i.test(n)) {
    return n === 'Melancia' || n === 'Maçã' || n === 'Uva' || n === 'Goiaba' || n === 'Banana' || n === 'Laranja' || n === 'Manga'
      ? n === 'Melancia' || n === 'Maçã' || n === 'Uva' || n === 'Goiaba'
        ? 'da'
        : 'da'
      : 'do';
  }
  if (/^(Melancia|Maçã)$/i.test(n)) return 'da';
  return 'do';
}

function ofPt(name) {
  const fem = /^(Melancia|Maçã|Manga|Uva|Goiaba|Banana|Laranja|Mamão)$/i.test(name);
  // Manga, Banana, Laranja, Uva, Goiaba, Maçã, Melancia → da; others → do
  const da = /^(Melancia|Maçã|Manga|Uva|Goiaba|Banana|Laranja)$/i.test(name);
  return da ? 'da' : 'do';
}

function buildFruitDerivadoPost(cfg, seriesOrder) {
  const { body, contentEn, contentEs } = buildFruitDerivadoBodies(cfg);
  const of = ofPt(cfg.namePt);
  const slug = 'inspecao-derivado-' + cfg.id;
  const order = seriesOrder != null ? seriesOrder : pickOrder(slug, 10);
  return derivadoPost({
    title:
      'Inspeção: Derivados ' +
      of +
      ' ' +
      cfg.namePt +
      ' — açúcar, aditivos e química industrial',
    titleEn:
      'Inspection: ' +
      cfg.nameEn +
      ' derivatives — sugar, additives and industrial chemistry',
    titleEs:
      'Inspección: Derivados de ' +
      cfg.nameEs +
      ' — azúcar, aditivos y química industrial',
    excerpt:
      'Derivados de risco: do fruto (*' +
      cfg.latin +
      '*) ao ultraprocessado — ' +
      cfg.productsPt +
      '; mapa químico de açúcares livres + aditivos, cruzado com a ficha planta e com a cana.',
    excerptEn:
      'Risk derivatives: from whole ' +
      cfg.nameEn.toLowerCase() +
      ' to ultra-processed ' +
      cfg.productsEn +
      ' — chemical map of free sugars + additives, cross-linked to the plant sheet and sugarcane.',
    excerptEs:
      'Derivados de riesgo: de ' +
      cfg.nameEs.toLowerCase() +
      ' entero al ultraprocesado — ' +
      cfg.productsEs +
      '; mapa químico de azúcares libres + aditivos, cruzado con la ficha planta y la caña.',
    slug: slug,
    date: '2026-08-24T12:00:00.000Z',
    seriesOrder: order,
    seriesLabel: cfg.namePt + ' · derivado',
    coverImage: 'imagens/inspecoes/' + cfg.id + '-derivado-cover.jpg',
    sourceUrl: cfg.wiki,
    body: body,
    contentEn: contentEn,
    contentEs: contentEs
  });
}

function nextDerivadoOrder() {
  try {
    const posts = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
    );
    const taken = new Set(
      posts
        .filter((p) => p.series === 'plantas-derivados-risco')
        .map((p) => Number(p.seriesOrder) || 0)
    );
    return (taken.size ? Math.max(...taken) : 6) + 1;
  } catch (_) {
    return 7;
  }
}

function buildAllFruitDerivadoPosts() {
  let next = nextDerivadoOrder();
  return FRUIT_DERIVADO_CONFIGS.map((cfg) => {
    const slug = 'inspecao-derivado-' + cfg.id;
    let order = next;
    try {
      const posts = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', 'posts.json'), 'utf8')
      );
      const existing = posts.find((p) => p.slug === slug);
      if (existing && Number(existing.seriesOrder)) {
        return buildFruitDerivadoPost(cfg, Number(existing.seriesOrder));
      }
    } catch (_) {
      /* fall through */
    }
    const post = buildFruitDerivadoPost(cfg, next);
    next += 1;
    return post;
  });
}

const FRUTOS_DERIVADOS_INSPECOES_POSTS = buildAllFruitDerivadoPosts();

module.exports = {
  FRUIT_DERIVADO_CONFIGS,
  FRUTOS_DERIVADOS_INSPECOES_POSTS,
  buildFruitDerivadoPost,
  buildFruitDerivadoBodies,
  buildAllFruitDerivadoPosts,
  ofPt,
  articlePt
};
