'use strict';

/**
 * Loja Influenciador Magalu — @InspetorBudGanja
 * https://www.magazinevoce.com.br/magazineinspetorbudganja/
 *
 * Links de busca e categorias passam pelo domínio magazinevoce.com.br para
 * rastrear comissão de afiliado (formato oficial do programa).
 */
const SLUG = 'magazineinspetorbudganja';
const BASE = 'https://www.magazinevoce.com.br/' + SLUG;

const MAGALU_INFLUENCER = {
  slug: SLUG,
  name: 'Magazine Inspetor BudGanja',
  home: BASE + '/',
  vitrine: {
    ofertasDia: BASE + '/selecao/ofertasdodia/',
    tecnologia: BASE + '/selecao/ofertasdodia/?filters=category---IN--ET--TE--GA--EA--TB--CI',
    casa: BASE + '/selecao/ofertasdodia/?filters=category---UD--CM--CJ--FS',
    eletro: BASE + '/selecao/ofertasdodia/?filters=category---EP--ED',
    petShop: BASE + '/pet-shop/l/pe/',
    peixes: BASE + '/peixes/pet-shop/s/pe/ppex/',
    floresJardim: BASE + '/flores-e-jardim/l/fj/',
    artesanato: BASE + '/artesanato/l/am/'
  },
  /** Buscas alinhadas aos materiais dos guias de clonadora */
  busca: {
    potePlastico: 'pote+plastico+2+litros+tampa',
    compressorAquario: 'compressor+de+ar+aquario',
    kitReparoTorneira: 'kit+reparo+torneira',
    enraizadorPlantas: 'enraizador+plantas',
    baldePlastico: 'balde+15+litros+com+tampa',
    bombaSubmersaAquario: 'bomba+submersa+aquario',
    kitIrrigacao: 'kit+irrigacao+gotejamento',
    feltroArtesanato: 'feltro+para+artesanato',
    termoHigrometro: 'termometro+higrometro+digital',
    tomadaInteligente: 'tomada+inteligente+wifi',
    timerDigital: 'timer+digital+tomada',
    painelLedCultivo: 'painel+led+cultivo+indoor+full+spectrum',
    exaustorInline: 'exaustor+inline+tenda+cultivo',
    ventiladorCirculacao: 'ventilador+circulacao+oscilante',
    balancaDigital: 'balanca+digital+precisao',
    phMetro: 'medidor+ph+agua',
    tesouraPoda: 'tesoura+poda+plantas',
    redeScrog: 'rede+scrog+cultivo',
    substratoOrganico: 'substrato+organico+para+plantas',
    perlitaCultivo: 'perlita+para+cultivo',
    fertilizanteNpk: 'fertilizante+npk+plantas'
  }
};

function magaluBusca(query) {
  const q = String(query).trim().replace(/\s+/g, '+');
  return BASE + '/busca/' + q + '/';
}

function magaluStoreLink(queryOrKey) {
  const query = MAGALU_INFLUENCER.busca[queryOrKey] || queryOrKey;
  return {
    store: MAGALU_INFLUENCER.name,
    href: magaluBusca(query),
    affiliate: true
  };
}

module.exports = {
  MAGALU_INFLUENCER,
  magaluBusca,
  magaluStoreLink
};
