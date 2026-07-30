'use strict';

const { getCultivoLabModeUrl } = require('./calculadoras-registry.js');

/**
 * Roteiro semanal por fase — usado no painel do cultivador e como contexto para a IA.
 */
const PHASE_WEEK_GUIDES = {
  planejamento: [
    {
      week: 1,
      title: 'Definir o projeto',
      focus: 'Espaço, orçamento e objetivos realistas.',
      tasks: [
        'Medir área disponível (tenda, estufa ou outdoor)',
        'Listar equipamentos que já tem vs. o que falta',
        'Definir genética e número de plantas'
      ],
      tools: [{ label: 'Watts por m²', href: getCultivoLabModeUrl('watts-m2') }]
    },
    {
      week: 2,
      title: 'Substrato e vasos',
      focus: 'Preparar o meio de cultivo antes de germinar.',
      tasks: [
        'Escolher solo orgânico, super solo, coco ou hidro',
        'Calcular volume dos vasos finais',
        'Planear amendments ou nutrientes base'
      ],
      tools: [
        { label: 'Super Solo', href: '/calculadoras/super-solo.html' },
        { label: 'Volume do vaso', href: getCultivoLabModeUrl('volume') }
      ]
    },
    {
      week: 3,
      title: 'Ambiente e iluminação',
      focus: 'Garantir luz e ventilação adequadas.',
      tasks: [
        'Confirmar potência e altura da lâmpada',
        'Verificar exaustão e circulação interna',
        'Estimar custo elétrico mensal'
      ],
      tools: [
        { label: 'Luxímetro', href: '/calculadoras/luximetro.html' },
        { label: 'Custo de energia', href: getCultivoLabModeUrl('energia') }
      ]
    },
    {
      week: 4,
      title: 'Checklist final',
      focus: 'Últimos detalhes antes da germinação.',
      tasks: [
        'Calibrar medidor de pH/EC se aplicável',
        'Preparar diário de pesquisas no painel',
        'Assistir ao guia em vídeo — introdução'
      ],
      tools: [{ label: 'Guia de cultivo', href: '/biblioteca/inspecoes/' }]
    }
  ],
  germinacao: [
    {
      week: 1,
      title: 'Germinação',
      focus: 'Umidade estável e temperatura confortável.',
      tasks: [
        'Manter papel/toalha ou cubo húmido (não encharcado)',
        'Evitar luz intensa até aparecer a radícula',
        'Anotar data de cada semente que abrir'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    },
    {
      week: 2,
      title: 'Primeiras folhas',
      focus: 'Transição para pequena luz e ar suave.',
      tasks: [
        'Colocar sob luz fraca ou sol filtrado',
        'Evitar rega excessiva no plágio',
        'Preparar vasos de destino'
      ],
      tools: [{ label: 'Volume do vaso', href: getCultivoLabModeUrl('volume') }]
    },
    {
      week: 3,
      title: 'Transplante',
      focus: 'Radículas saudáveis antes de mudar de vaso.',
      tasks: [
        'Transplantar quando houver 2–3 nós',
        'Regar levemente após transplantar',
        'Monitorizar VPD no ambiente'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    }
  ],
  vegetativo: [
    {
      week: 1,
      title: 'Estabilização',
      focus: 'Planta a adaptar-se após transplant ou início veg.',
      tasks: [
        'Confirmar fotoperíodo (ex.: 18/6 indoor)',
        'Rega moderada — observar peso do vaso',
        'Primeira anotação no diário'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    },
    {
      week: 2,
      title: 'Crescimento ativo',
      focus: 'Luz e nutrientes graduais.',
      tasks: [
        'Medir intensidade luminosa (luxímetro ou DLI)',
        'Ajustar altura da lâmpada',
        'Verificar pH da água/rega se em coco ou hidro'
      ],
      tools: [
        { label: 'Luxímetro', href: '/calculadoras/luximetro.html' },
        { label: 'DLI', href: getCultivoLabModeUrl('dli') },
        { label: 'pH', href: getCultivoLabModeUrl('ph') }
      ]
    },
    {
      week: 3,
      title: 'Treino leve (opcional)',
      focus: 'LST/topping só se souber o timing da genética.',
      tasks: [
        'Observar espaço entre nós e vigor',
        'Aplicar LST ou topping se fizer sentido',
        'Manter VPD na faixa ideal'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    },
    {
      week: 4,
      title: 'Pré-flora',
      focus: 'Planta adulta e ambiente estável.',
      tasks: [
        'Confirmar plantas prontas para flip (se photoperiod)',
        'Última poda/treino antes da flora',
        'Revisar plano de nutrientes'
      ],
      tools: [{ label: 'EC', href: getCultivoLabModeUrl('ec') }]
    },
    {
      week: 5,
      title: 'Manutenção veg estendida',
      focus: 'Para ciclos veg longos ou mães.',
      tasks: [
        'Continuar registo no diário',
        'Revisar luz e VPD semanalmente',
        'Preparar flip ou manutenção de mães'
      ],
      tools: [{ label: 'DLI', href: getCultivoLabModeUrl('dli') }]
    }
  ],
  floracao: [
    {
      week: 1,
      title: 'Transição para flora',
      focus: 'Mudança de fotoperíodo (12/12) ou entrada natural na flora.',
      tasks: [
        'Confirmar 12/12 ou condição outdoor',
        'Monitorizar esticamento inicial',
        'Ajustar VPD para flora'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    },
    {
      week: 2,
      title: 'Pré-flores',
      focus: 'Primeiros pistilos — evitar stress.',
      tasks: [
        'Evitar podas agressivas',
        'Manter rega consistente',
        'Anotar início da flora no diário'
      ],
      tools: [{ label: 'pH', href: getCultivoLabModeUrl('ph') }]
    },
    {
      week: 3,
      title: 'Floração média',
      focus: 'Demanda nutricional e ambiente.',
      tasks: [
        'Acompanhar EC se fertilizar',
        'Verificar folhas inferiores (deficiências)',
        'Controlar humidade para evitar fungos'
      ],
      tools: [
        { label: 'EC', href: getCultivoLabModeUrl('ec') },
        { label: 'VPD', href: getCultivoLabModeUrl('vpd') }
      ]
    },
    {
      week: 4,
      title: 'Engorda',
      focus: 'Flores a desenvolver — estabilidade é chave.',
      tasks: [
        'Manter VPD estável',
        'Evitar mudanças bruscas de luz ou nutrientes',
        'Registar cheiros e cor das flores'
      ],
      tools: [{ label: 'Diluição', href: getCultivoLabModeUrl('diluicao') }]
    },
    {
      week: 5,
      title: 'Maturação',
      focus: 'Observar tricomas e folhas.',
      tasks: [
        'Inspecionar folhas e flores diariamente',
        'Preparar timing de flush (se aplicável)',
        'Planear data de colheita'
      ],
      tools: [{ label: 'Guia de cultivo', href: '/biblioteca/inspecoes/' }]
    },
    {
      week: 6,
      title: 'Colheita iminente',
      focus: 'Últimos dias antes do corte.',
      tasks: [
        'Definir janela de colheita',
        'Preparar área de secagem',
        'Limpar ferramentas de corte'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    }
  ],
  colheita: [
    {
      week: 1,
      title: 'Colheita e trim',
      focus: 'Corte no timing desejado.',
      tasks: [
        'Colher com plantas secas ou após flush',
        'Trim grosso e pesagem húmida',
        'Anotar pesos no diário'
      ],
      tools: []
    },
    {
      week: 2,
      title: 'Secagem',
      focus: 'Ambiente escuro, 18–22 °C, humidade moderada.',
      tasks: [
        'Manter circulação suave sem vento directo',
        'Monitorizar VPD na secagem',
        'Evitar secagem rápida demais'
      ],
      tools: [{ label: 'VPD', href: getCultivoLabModeUrl('vpd') }]
    },
    {
      week: 3,
      title: 'Cura inicial',
      focus: 'Frascos com humidade relativa controlada.',
      tasks: [
        'Transferir para frascos quando ramos estalarem',
        'Burping 1–2× por dia na primeira semana',
        'Registar aroma e textura'
      ],
      tools: []
    },
    {
      week: 4,
      title: 'Cura longa',
      focus: 'Estabilização de sabor e queima.',
      tasks: [
        'Reduzir burping gradualmente',
        'Avaliar resultado final',
        'Planear próximo ciclo no painel'
      ],
      tools: [{ label: 'Guia de cultivo', href: '/biblioteca/inspecoes/' }]
    }
  ]
};

function getWeeksForPhase(phase) {
  return PHASE_WEEK_GUIDES[phase] || PHASE_WEEK_GUIDES.planejamento || [];
}

function getCurrentWeekNumber(phaseStartedAt) {
  if (!phaseStartedAt) return 1;
  const start = new Date(phaseStartedAt);
  if (isNaN(start.getTime())) return 1;
  const diffMs = Date.now() - start.getTime();
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000)) + 1;
  return Math.max(1, weeks);
}

function getWeekGuide(phase, weekNumber) {
  const weeks = getWeeksForPhase(phase);
  if (!weeks.length) return null;
  const idx = Math.min(Math.max(1, weekNumber), weeks.length) - 1;
  return weeks[idx];
}

function buildWeeksContextForAi(phase, phaseStartedAt, guideWeekNotes) {
  const weeks = getWeeksForPhase(phase);
  const current = getCurrentWeekNumber(phaseStartedAt);
  const guide = getWeekGuide(phase, current);
  const lines = [
    'Fase: ' + (phase || 'não informada'),
    'Semana actual da fase: ' + current + ' (desde ' + (phaseStartedAt || 'data não registada') + ')',
    'Total de semanas no roteiro desta fase: ' + weeks.length
  ];
  if (guide) {
    lines.push('Roteiro da semana actual: ' + guide.title + ' — ' + guide.focus);
    lines.push('Tarefas sugeridas: ' + guide.tasks.join('; '));
  }
  const notes = guideWeekNotes && typeof guideWeekNotes === 'object' ? guideWeekNotes : {};
  const noteKeys = Object.keys(notes).filter((k) => notes[k]);
  if (noteKeys.length) {
    lines.push('Notas pessoais por semana: ' + noteKeys.map((k) => 'S' + k + ': ' + notes[k].slice(0, 120)).join(' | '));
  }
  return lines.join('\n');
}

module.exports = {
  PHASE_WEEK_GUIDES,
  getWeeksForPhase,
  getCurrentWeekNumber,
  getWeekGuide,
  buildWeeksContextForAi
};
