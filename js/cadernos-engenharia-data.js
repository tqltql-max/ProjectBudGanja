/**
 * Matriz pública do curso de Agronomia / Engenharia Agronômica (ESAPP).
 * Fonte: https://www.esapp.edu.br/curso/ — Matriz Curricular 2024.
 * Cadernos próprios ficam no aparelho; isto só sugere matérias.
 */
(function (root) {
  'use strict';

  function slugify(name) {
    return String(name || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  var SKIP = /atividades de extens|atividades complementar|estagio supervisionado|trabalho de conclus|optativa/i;

  var TERMS = [
    {
      termo: 1,
      label: '1º termo',
      subjects: [
        { name: 'Química Geral e Analítica', hours: 60, icon: '⚗️' },
        { name: 'Biologia Celular', hours: 30, icon: '🧬' },
        { name: 'Zoologia', hours: 60, icon: '🐾' },
        { name: 'Morfologia e sistemática vegetal', hours: 60, icon: '🌿' },
        { name: 'Introdução às Ciências Agrárias', hours: 30, icon: '🌾' },
        { name: 'Matemática I', hours: 60, icon: '∑' },
        { name: 'Metodologia de Pesquisa', hours: 30, icon: '🔎' },
        { name: 'Interpretação e Produção de Textos I', hours: 30, icon: '✍️' }
      ]
    },
    {
      termo: 2,
      label: '2º termo',
      subjects: [
        { name: 'Introdução à Ciência do Solo', hours: 60, icon: '🪨' },
        { name: 'Bioquímica', hours: 60, icon: '⚗️' },
        { name: 'Anatomia Vegetal', hours: 30, icon: '🌿' },
        { name: 'Genética', hours: 60, icon: '🧬' },
        { name: 'Física I', hours: 60, icon: '📐' },
        { name: 'Matemática II', hours: 60, icon: '∑' },
        { name: 'Interpretação e Produção de Textos II', hours: 30, icon: '✍️' }
      ]
    },
    {
      termo: 3,
      label: '3º termo',
      subjects: [
        { name: 'Física II', hours: 60, icon: '📐' },
        { name: 'Edafologia', hours: 60, icon: '🪨' },
        { name: 'Microbiologia', hours: 60, icon: '🦠' },
        { name: 'Administração da Empresa Agropecuária I', hours: 30, icon: '📋' },
        { name: 'Estatística I', hours: 60, icon: '📊' },
        { name: 'Gestão de Recursos Ambientais', hours: 60, icon: '🌍' },
        { name: 'Informática Aplicada', hours: 30, icon: '💻' }
      ]
    },
    {
      termo: 4,
      label: '4º termo',
      subjects: [
        { name: 'Fisiologia Vegetal', hours: 60, icon: '🌿' },
        { name: 'Administração da Empresa Agropecuária II', hours: 30, icon: '📋' },
        { name: 'Estatística II', hours: 60, icon: '📊' },
        { name: 'Máquinas Agrícolas', hours: 60, icon: '🚜' },
        { name: 'Métodos de Melhoramento Vegetal', hours: 60, icon: '🌱' },
        { name: 'Ética Profissional, Legislação e Receituário Agronômico', hours: 30, icon: '⚖️' },
        { name: 'Empreendedorismo', hours: 30, icon: '💡' },
        { name: 'Gestão Comercial', hours: 30, icon: '📈' }
      ]
    },
    {
      termo: 5,
      label: '5º termo',
      subjects: [
        { name: 'Fertilidade do Solo', hours: 60, icon: '🪨' },
        { name: 'Fitopatologia I', hours: 60, icon: '🦠' },
        { name: 'Desenho Técnico', hours: 60, icon: '✏️' },
        { name: 'Entomologia Agrícola', hours: 60, icon: '🪲' },
        { name: 'Mecanização Agrícola', hours: 60, icon: '🚜' },
        { name: 'Agrometeorologia', hours: 60, icon: '🌦️' }
      ]
    },
    {
      termo: 6,
      label: '6º termo',
      subjects: [
        { name: 'Controle de Pragas', hours: 60, icon: '🪲' },
        { name: 'Propagação de Plantas', hours: 60, icon: '🌱' },
        { name: 'Zootecnia Geral', hours: 60, icon: '🐄' },
        { name: 'Hidráulica Agrícola', hours: 60, icon: '💧' },
        { name: 'Nutrição de Plantas Adubos e Adubações', hours: 60, icon: '🌾' },
        { name: 'Fitopatologia II', hours: 60, icon: '🦠' }
      ]
    },
    {
      termo: 7,
      label: '7º termo',
      subjects: [
        { name: 'Zootecnia I', hours: 60, icon: '🐄' },
        { name: 'Fruticultura', hours: 60, icon: '🍎' },
        { name: 'Manejo e Conservação do Solo e da Água', hours: 60, icon: '💧' },
        { name: 'Geoprocessamento', hours: 60, icon: '🗺️' },
        { name: 'Irrigação e Drenagem', hours: 60, icon: '💦' },
        { name: 'Difusão Tecnológica', hours: 30, icon: '📡' },
        { name: 'Biotecnologia Vegetal', hours: 30, icon: '🧬' }
      ]
    },
    {
      termo: 8,
      label: '8º termo',
      subjects: [
        { name: 'Zootecnia II', hours: 60, icon: '🐄' },
        { name: 'Construções Rurais', hours: 60, icon: '🏚️' },
        { name: 'Tecnologia de Aplicação de Defensivos', hours: 60, icon: '🚜' },
        { name: 'Agricultura I (Milho, arroz, trigo e sorgo)', hours: 60, icon: '🌽' },
        { name: 'Plantas Daninhas — Biologia e Controle', hours: 60, icon: '🌿' },
        { name: 'Gestão de Pessoas I', hours: 30, icon: '👥' }
      ]
    },
    {
      termo: 9,
      label: '9º termo',
      subjects: [
        { name: 'Tecnologia de Pós-colheita', hours: 60, icon: '📦' },
        { name: 'Tecnologia de Produtos Agropecuários', hours: 60, icon: '🧀' },
        { name: 'Olericultura', hours: 60, icon: '🥬' },
        { name: 'Agricultura II (Soja, amendoim, feijão e girassol)', hours: 60, icon: '🌻' },
        { name: 'Gestão da Cadeia de Suprimentos e Logística', hours: 30, icon: '🚚' },
        { name: 'Agricultura III (Cana-de-açúcar)', hours: 60, icon: '🎋' },
        { name: 'Gestão de Pessoas II', hours: 30, icon: '👥' }
      ]
    },
    {
      termo: 10,
      label: '10º termo',
      subjects: [
        { name: 'Gestão de Processos Agropecuários', hours: 60, icon: '📋' },
        { name: 'Agricultura de Precisão', hours: 60, icon: '📡' },
        { name: 'Agricultura IV (Cana — açúcar e álcool)', hours: 60, icon: '🎋' },
        { name: 'Silvicultura', hours: 60, icon: '🌲' },
        { name: 'Tecnologia de Produção de Sementes', hours: 60, icon: '🌱' },
        { name: 'Sistemas de Produção em Agropecuária', hours: 30, icon: '🌾' }
      ]
    }
  ];

  TERMS.forEach(function (term) {
    term.subjects.forEach(function (s) {
      s.id = slugify(s.name);
      s.termo = term.termo;
      s.skip = SKIP.test(s.name);
    });
  });

  function allSubjects() {
    var list = [];
    TERMS.forEach(function (term) {
      term.subjects.forEach(function (s) {
        list.push(s);
      });
    });
    return list;
  }

  function subjectsForTerm(n) {
    var term = TERMS.filter(function (t) { return t.termo === Number(n); })[0];
    return term ? term.subjects.slice() : [];
  }

  root.BudGanjaCadernosData = {
    source: 'https://www.esapp.edu.br/curso/',
    school: 'ESAPP',
    course: 'Agronomia — Engenharia Agronômica',
    slugify: slugify,
    TERMS: TERMS,
    allSubjects: allSubjects,
    subjectsForTerm: subjectsForTerm
  };
})(window);
