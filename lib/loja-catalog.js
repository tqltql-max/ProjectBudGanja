'use strict';

const { MAGALU_INFLUENCER, magaluStoreLink } = require('./magalu-influencer.js');

/**
 * Catálogo da loja — materiais usados nas experiências de campo e laboratório.
 * Links exclusivos da vitrine Influenciador Magalu @InspetorBudGanja.
 */
const LOJA_CATALOG = {
  title: 'Loja parceira',
  projects: [
    {
      id: 'clonadora-6',
      title: 'Clonadora de 6 estacas',
      badge: 'Baixo custo',
      summary: 'Pote de sorvete, bucha de louça e bombinha de ar — projeto documentado no laboratório.',
      manualHref: '/equipamentos/clonadora-6-estacas.html',
      image: '/imagens/clonadora.svg',
      imageAlt: 'Clonadora de 6 estacas com pote de sorvete',
      orderOffer: {
        enabled: true,
        badge: '6 estacas · montagem Inspetor BudGanja',
        headline: 'Quer a clonadora pronta?',
        summary:
          'Encomende a clonadora de 6 estacas montada e testada no laboratório — pote, buchas e bombinha 24 h, como no guia.',
        buttonLabel: 'Encomendar clonadora de 6 estacas',
        formNote: 'Resposta em até 48 h úteis · pagamento e envio combinados por e-mail ou WhatsApp.',
        packageOptions: [
          {
            id: 'montagem',
            label: 'Só montagem',
            description: 'Você compra os materiais; montamos e testamos no laboratório.',
            priceNote: 'A partir de R$ 120'
          },
          {
            id: 'completa',
            label: 'Montagem + materiais',
            description: 'Clonadora completa com pote, buchas, bombinha e teste de oxigenação.',
            priceNote: 'Sob consulta (varia com frete)'
          }
        ]
      },
      products: [
        {
          id: 'pote-sorvete',
          name: 'Pote plástico com tampa (2 L)',
          role: 'Tanque de água e suporte das estacas',
          magaluCategory: 'casa',
          links: [magaluStoreLink('potePlastico')]
        },
        {
          id: 'bombinha-ar',
          name: 'Bombinha de ar para aquário',
          role: 'Oxigenação contínua — ligar 24 h',
          magaluCategory: 'peixes',
          links: [magaluStoreLink('compressorAquario')]
        },
        {
          id: 'buchas-louca',
          name: 'Buchas de louça',
          role: 'Suporte das estacas nos furos da tampa — no Magalu procure kits de vedação/reparo de torneira',
          magaluCategory: 'casa',
          links: [magaluStoreLink('kitReparoTorneira')]
        },
        {
          id: 'gel-enraizamento',
          name: 'Gel de enraizamento',
          role: 'Opcional — acelera enraizamento',
          optional: true,
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('enraizadorPlantas')]
        }
      ]
    },
    {
      id: 'clonadora-12',
      title: 'Clonadora de 12 estacas',
      badge: 'Alto custo',
      summary: 'Balde, bomba submersa, kit de microaspersores e feltro — aspersão 24 h nas raízes.',
      manualHref: '/equipamentos/clonadora-12-estacas.html',
      image: '/imagens/aeroclonadora.jpg',
      imageAlt: 'Clonadora de 12 estacas com balde e aspersores',
      orderOffer: {
        enabled: true,
        badge: '12 estacas · aspersão 24 h',
        headline: 'Quer a clonadora pronta?',
        summary:
          'Encomende a clonadora de 12 estacas montada pelo Inspetor BudGanja — balde, bomba submersa, microaspersores e feltro.',
        buttonLabel: 'Encomendar clonadora de 12 estacas',
        formNote: 'Resposta em até 48 h úteis · pagamento e envio combinados por e-mail ou WhatsApp.',
        packageOptions: [
          {
            id: 'montagem',
            label: 'Só montagem',
            description: 'Montagem profissional do balde, bomba, aspersores e feltro.',
            priceNote: 'A partir de R$ 250'
          },
          {
            id: 'completa',
            label: 'Montagem + materiais',
            description: 'Kit completo montado — balde, bomba submersa, aspersores e feltro.',
            priceNote: 'Sob consulta'
          }
        ]
      },
      products: [
        {
          id: 'balde-rigido',
          name: 'Balde rígido com tampa (10–20 L)',
          role: 'Reservatório principal do sistema',
          magaluCategory: 'casa',
          links: [magaluStoreLink('baldePlastico')]
        },
        {
          id: 'bomba-submersa',
          name: 'Bomba submersa de aquário',
          role: 'Circula água para os microaspersores — ex. linha Arco-Íris',
          magaluCategory: 'peixes',
          links: [magaluStoreLink('bombaSubmersaAquario')]
        },
        {
          id: 'kit-aspersores',
          name: 'Kit de microaspersores para irrigação',
          role: 'Borrifa água nas bases das estacas',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('kitIrrigacao')]
        },
        {
          id: 'feltro',
          name: 'Tapete de feltro',
          role: 'Discos cortados como suporte em cada furo da tampa',
          magaluCategory: 'artesanato',
          links: [magaluStoreLink('feltroArtesanato')]
        },
        {
          id: 'gel-enraizamento-12',
          name: 'Gel de enraizamento',
          role: 'Opcional',
          optional: true,
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('enraizadorPlantas')]
        }
      ]
    },
    {
      id: 'cultivo-indoor',
      title: 'Cultivo indoor — instrumentação',
      badge: 'Ambiente',
      summary: 'Termo-higrômetro, timer, tomada inteligente, LED, exaustão e acessórios referenciados nas inspeções do guia de cultivo.',
      manualHref: '/biblioteca/inspecoes/',
      image: '/imagens/background-hero.svg',
      imageAlt: 'Equipamentos de monitorização e iluminação para cultivo indoor',
      products: [
        {
          id: 'termo-higrometro',
          name: 'Termo-higrômetro digital',
          role: 'Leitura simultânea de temperatura e UR no dossel',
          magaluCategory: 'casa',
          links: [magaluStoreLink('termoHigrometro')]
        },
        {
          id: 'timer-fotoperiodo',
          name: 'Timer digital de tomada',
          role: 'Fotoperíodo 18/6 ou 12/12 com repetibilidade',
          magaluCategory: 'casa',
          links: [magaluStoreLink('timerDigital')]
        },
        {
          id: 'tomada-inteligente',
          name: 'Tomada inteligente Wi-Fi',
          role: 'Automação e registo remoto de ciclos luz/escuro',
          magaluCategory: 'tecnologia',
          links: [magaluStoreLink('tomadaInteligente')]
        },
        {
          id: 'painel-led',
          name: 'Painel LED cultivo indoor full spectrum',
          role: 'Iluminação principal — verificar W/m² e distância ao dossel',
          magaluCategory: 'casa',
          links: [magaluStoreLink('painelLedCultivo')]
        },
        {
          id: 'exaustor-inline',
          name: 'Exaustor inline para tenda',
          role: 'Renovação de ar e pressão negativa com filtro de carvão',
          magaluCategory: 'casa',
          links: [magaluStoreLink('exaustorInline')]
        },
        {
          id: 'ventilador-circulacao',
          name: 'Ventilador de circulação oscilante',
          role: 'Movimento de ar interno — evita microclimas no dossel',
          magaluCategory: 'casa',
          links: [magaluStoreLink('ventiladorCirculacao')]
        },
        {
          id: 'ph-metro',
          name: 'Medidor de pH da água',
          role: 'Ajuste de solução nutritiva ou extrato de solo',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('phMetro')]
        },
        {
          id: 'balanca-digital',
          name: 'Balança digital de precisão',
          role: 'Dosagem de fertilizantes e amendamentos',
          magaluCategory: 'casa',
          links: [magaluStoreLink('balancaDigital')]
        },
        {
          id: 'rede-scrog',
          name: 'Rede SCROG para cultivo',
          role: 'Treino de dossel e uniformidade lumínica',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('redeScrog')]
        },
        {
          id: 'tesoura-poda',
          name: 'Tesoura de poda para plantas',
          role: 'Topping, desfolha e colheita',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('tesouraPoda')]
        },
        {
          id: 'substrato-organico',
          name: 'Substrato orgânico para plantas',
          role: 'Base do super-solo vivo',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('substratoOrganico')]
        },
        {
          id: 'perlita',
          name: 'Perlita para cultivo',
          role: 'Aeração e drenagem no substrato',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('perlitaCultivo')]
        },
        {
          id: 'fertilizante-npk',
          name: 'Fertilizante NPK para plantas',
          role: 'Nutrição mineral por fase vegetativa e floração',
          magaluCategory: 'floresJardim',
          links: [magaluStoreLink('fertilizanteNpk')]
        }
      ]
    }
  ]
};

function getLojaProject(projectId) {
  return LOJA_CATALOG.projects.find((p) => p.id === projectId) || null;
}

function getLojaAnchor(projectId) {
  return '/loja/#' + projectId;
}

function getLojaOrderFormUrl(projectId) {
  return '/loja/encomenda.html?produto=' + encodeURIComponent(String(projectId || '').trim());
}

function resolveOrderPackage(project, packageId) {
  const offer = project && project.orderOffer;
  const options = offer && offer.packageOptions;
  if (!Array.isArray(options) || !options.length) return null;
  const id = String(packageId || '').trim();
  if (!id) return null;
  return options.find(function (opt) { return opt && opt.id === id; }) || null;
}

function listOrderableProjects() {
  return LOJA_CATALOG.projects.filter((p) => p.orderOffer && p.orderOffer.enabled !== false);
}

module.exports = {
  LOJA_CATALOG,
  getLojaProject,
  getLojaAnchor,
  getLojaOrderFormUrl,
  resolveOrderPackage,
  listOrderableProjects,
  MAGALU_INFLUENCER
};
