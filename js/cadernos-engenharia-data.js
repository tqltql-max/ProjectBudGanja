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

  /**
   * Estudos do laboratório — aulas-modelo Cornell.
   * Entram no caderno da matéria (aparelho); o aluno pode editar.
   * Não é material oficial da ESAPP.
   */
  var LAB_STUDIES = [
    {
      subjectId: 'biologia-celular',
      formulas: [
        'Angiosperma (Angiospermae): planta com flor; semente encerrada no fruto (ovário).',
        'Gimnosperma: semente nua (pinheiro, cicas, Ginkgo).',
        'Célula vegetal: parede (celulose) + vacúolo central + plastídios.',
        'Plasmodesmos: ponte de citoplasma. Simplasto × apoplasto.',
        'Dupla fecundação: espermatozoide + oosfera → zigoto (2n); espermatozoide + núcleos polares → endosperma (3n).',
        'Saco embrionário típico (Polygonum): 7 células / 8 núcleos.'
      ].join('\n'),
      lessons: [
        {
          id: 'lab-biologia-celular-angiosperma',
          title: 'Angiospermas — a célula da planta com flor',
          date: '2026-08-24',
          cues: [
            'Grafia: Angiosperma — não «Angiosmpérma».',
            'angio + sperma = semente no vaso (fruto)',
            '≠ gimnosperma (semente nua)',
            'célula vegetal: parede, vacúolo, plastídios',
            'plasmodesmos / simplasto × apoplasto',
            'dupla fecundação: zigoto 2n + endosperma 3n',
            'saco embrionário: 7 células / 8 núcleos',
            'mono × eudicot → caderno de Morfologia'
          ].join('\n'),
          notes: [
            'Nome certo: Angiosperma (também Angiospermae / Magnoliophyta). O pedido «Angiosmpérma» é lapso de teclado — a âncora é Angiosperma.',
            '',
            'O que é. Grupo das plantas com flor. A semente forma-se dentro de um fruto, porque o óvulo está no ovário. Étimo de trabalho: grego angeíon (vaso, recipiente) + spérma (semente). Gimnosperma = semente nua, sem fruto verdadeiro.',
            '',
            'Recorte desta matéria (Biologia Celular). Não é a aula de classificação. Aqui o objecto é a célula eucariota vegetal da angiosperma e o evento celular que a define: a dupla fecundação.',
            '',
            'Célula. Parede primária (celulose, hemicelulose, pectina). Em células de sustentação / xilema, parede secundária com lenhina. Entre duas células vizinhas está a lamela média (pectina) — o «cimento». A membrana plasmática fica por dentro da parede.',
            '',
            'Comunicação. Plasmodesmos atravessam a parede e ligam citoplasmas (simplasto). O apoplasto é o caminho pelas paredes e espaços intercelulares, fora do citoplasma. Água e iões usam os dois caminhos; proteínas grandes e RNA usam sobretudo o simplasto.',
            '',
            'Vacúolo. Nas células maduras ocupa a maior parte do volume. O tonoplasto (membrana) controla o que entra e sai. Dá turgescência (a planta «em pé»), guarda água, iões, pigmentos e compostos de defesa. Células meristemáticas têm vacúolos pequenos e citoplasma denso — ainda estão a dividir.',
            '',
            'Plastídios. Organelos da linhagem vegetal: cloroplasto (fotossíntese), cromoplasto (cor da flor/fruto), amiloplasto (amido). Origem endossimbiótica — têm DNA próprio. Mitocôndria continua a ser a central de ATP.',
            '',
            'Dupla fecundação (o marco). Do tubo polínico entram dois gâmetas masculinos. Um funde com a oosfera → zigoto (2n) → embrião. O outro funde com os núcleos polares da célula central → endosperma (em geral 3n), tecido de reserva da semente. Gimnospermas não fazem este par zigoto + endosperma triploide.',
            '',
            'Saco embrionário típico (tipo Polygonum): 7 células e 8 núcleos — 3 antípodas, 2 sinérgides, 1 oosfera, 1 célula central com 2 núcleos polares.',
            '',
            'Elo de grade. Monocotiledónea × eudicotiledónea (um ou dois cotilédones no embrião; nervação, n° floral) fica no caderno Morfologia e sistemática vegetal. Não misturar as duas aulas no mesmo bloco.',
            '',
            'Elo do laboratório. Cannabis sativa L. é angiosperma (Cannabaceae). O tricoma glandular é uma célula epidérmica modificada — exemplo, não substitui esta ficha nem a aula. Fruto ≠ fruta: ver inspeção da palavra fruto.',
            '',
            'Isto é caderno de estudo. Não é material oficial da ESAPP. Confirme na aula e no livro da disciplina.'
          ].join('\n'),
          questions: [
            'Por que a dupla fecundação é o marco celular das angiospermas, e não só «ter flor»?',
            'Onde acaba a parede de uma célula e começa a da vizinha (lamela média)?',
            'O vacúolo é vazio? O que o tonoplasto controla?',
            'Simplasto e apoplasto: qual caminho uma proteína grande pode usar?'
          ].join('\n'),
          summary: [
            'Angiosperma é a planta com flor cuja semente se fecha no fruto. Em Biologia Celular o recorte é a célula vegetal (parede de celulose, plasmodesmos, vacúolo, plastídios) e o evento único da dupla fecundação: zigoto 2n + endosperma 3n.',
            'Grafia canónica: Angiosperma. ≠ gimnosperma. Classificação (mono × eudicot) vai para Morfologia e sistemática vegetal.',
            'Caderno de estudo — completar com o que o professor disser na aula.'
          ].join('\n')
        }
      ]
    }
  ];

  function labStudyFor(subjectId) {
    var i;
    for (i = 0; i < LAB_STUDIES.length; i++) {
      if (LAB_STUDIES[i].subjectId === subjectId) return LAB_STUDIES[i];
    }
    return null;
  }

  function listLabStudies() {
    var list = [];
    LAB_STUDIES.forEach(function (pack) {
      var subject = null;
      TERMS.forEach(function (term) {
        term.subjects.forEach(function (s) {
          if (s.id === pack.subjectId) subject = s;
        });
      });
      (pack.lessons || []).forEach(function (lesson) {
        list.push({
          subjectId: pack.subjectId,
          subjectName: subject ? subject.name : pack.subjectId,
          icon: subject ? subject.icon : '📓',
          termo: subject ? subject.termo : 0,
          lessonId: lesson.id,
          title: lesson.title
        });
      });
    });
    return list;
  }

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
    LAB_STUDIES: LAB_STUDIES,
    labStudyFor: labStudyFor,
    listLabStudies: listLabStudies,
    allSubjects: allSubjects,
    subjectsForTerm: subjectsForTerm
  };
})(window);
