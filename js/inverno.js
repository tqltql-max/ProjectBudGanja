(function () {
  'use strict';

  var WORDS = [
    { id: 'barco', href: '/posts/post-inspecao-palavra-barco.html', pt: 'Barco', en: 'Boat', es: 'Barco', simplePt: 'Casa, oficina e corpo da invernagem.', simpleEn: 'Home, workshop and body of the overwintering.', simpleEs: 'Casa, taller y cuerpo de la invernada.' },
    { id: 'mar', href: '/posts/post-inspecao-palavra-mar.html', pt: 'Mar', en: 'Sea', es: 'Mar', simplePt: 'Horizonte da travessia — no gelo, deixa de passar.', simpleEn: 'Horizon of the crossing — on ice, it stops passing.', simpleEs: 'Horizonte de la travesía — en el hielo, deja de pasar.' },
    { id: 'gelo', href: '/posts/post-inspecao-palavra-gelo.html', pt: 'Gelo', en: 'Ice', es: 'Hielo', simplePt: 'Água sólida que prende o barco.', simpleEn: 'Solid water that holds the boat.', simpleEs: 'Agua sólida que atrapa el barco.' },
    { id: 'inverno', href: '/posts/post-inspecao-palavra-inverno.html', pt: 'Inverno', en: 'Winter', es: 'Invierno', simplePt: 'Estação e cumprimento: bom dia ao frio.', simpleEn: 'Season and greeting: good morning to the cold.', simpleEs: 'Estación y saludo: buenos días al frío.' },
    { id: 'invernagem', href: '/posts/post-inspecao-palavra-invernagem.html', pt: 'Invernagem', en: 'Overwintering', es: 'Invernada', simplePt: 'Ficar o inverno inteiro no gelo — eixo do livro.', simpleEn: 'Staying the whole winter in the ice — axis of the book.', simpleEs: 'Quedarse todo el invierno en el hielo — eje del libro.' },
    { id: 'navegar', href: '/posts/post-inspecao-palavra-navegar.html', pt: 'Navegar', en: 'Sail', es: 'Navegar', simplePt: 'Conduzir o barco e a própria rota.', simpleEn: 'Steering the boat and one’s own route.', simpleEs: 'Conducir el barco y la propia ruta.' },
    { id: 'agua', href: '/posts/post-inspecao-palavra-agua.html', pt: 'Água', en: 'Water', es: 'Agua', simplePt: 'Líquido que vira terra quando congela.', simpleEn: 'Liquid that becomes land when it freezes.', simpleEs: 'Líquido que se vuelve tierra al congelarse.' },
    { id: 'neve', href: '/posts/post-inspecao-palavra-neve.html', pt: 'Neve', en: 'Snow', es: 'Nieve', simplePt: 'Cobertura branca — paisagem e ruído branco.', simpleEn: 'White cover — landscape and white noise.', simpleEs: 'Cubierta blanca — paisaje y ruido blanco.' },
    { id: 'congelado', href: '/posts/post-inspecao-palavra-congelado.html', pt: 'Congelado', en: 'Frozen', es: 'Congelado', simplePt: 'Estado do mar quando o tempo substitui o espaço.', simpleEn: 'State of the sea when time replaces space.', simpleEs: 'Estado del mar cuando el tiempo sustituye al espacio.' },
    { id: 'risco', href: '/posts/post-inspecao-palavra-risco.html', pt: 'Risco', en: 'Risk', es: 'Riesgo', simplePt: 'Perigo calculado — ofício, não romantismo.', simpleEn: 'Calculated danger — craft, not romance.', simpleEs: 'Peligro calculado — oficio, no romanticismo.' },
    { id: 'solitario', href: '/posts/post-inspecao-palavra-solitario.html', pt: 'Solitário', en: 'Solo', es: 'Solitario', simplePt: 'Sozinha no fiorde — sem romantizar o isolamento.', simpleEn: 'Alone in the fjord — without romanticizing isolation.', simpleEs: 'Sola en el fiordo — sin romantizar el aislamiento.' },
    { id: 'groenlandia', href: '/posts/post-inspecao-palavra-groenlandia.html', pt: 'Groenlândia', en: 'Greenland', es: 'Groenlandia', simplePt: 'Palco da invernagem ártica.', simpleEn: 'Stage of the Arctic overwintering.', simpleEs: 'Escenario de la invernada ártica.' },
    { id: 'anzol', href: '/posts/post-inspecao-palavra-anzol.html', pt: 'Anzol', en: 'Hook', es: 'Anzuelo', simplePt: 'Ofício miúdo no gelo — pescar para ficar.', simpleEn: 'Small craft on the ice — fishing in order to stay.', simpleEs: 'Oficio menudo en el hielo — pescar para quedarse.' },
    { id: 'livro', href: '/posts/post-inspecao-palavra-livro.html', pt: 'Livro', en: 'Book', es: 'Libro', simplePt: 'A invernagem vira página. Depois, pede para circular.', simpleEn: 'Overwintering becomes a page. Then it asks to circulate.', simpleEs: 'La invernada se hace página. Después pide circular.' }
  ];

  function locale() {
    try {
      return (window.BudGanjaI18n && window.BudGanjaI18n.getLocale()) || 'pt-BR';
    } catch (e) {
      return 'pt-BR';
    }
  }

  function field(word, key) {
    var loc = locale();
    if (key === 'simple') {
      if (loc === 'en') return word.simpleEn;
      if (loc === 'es') return word.simpleEs;
      return word.simplePt;
    }
    if (loc === 'en') return word.en;
    if (loc === 'es') return word.es;
    return word.pt;
  }

  function t(key, fallback) {
    if (window.BudGanjaI18n && typeof window.BudGanjaI18n.t === 'function') {
      return window.BudGanjaI18n.t(key, fallback);
    }
    return fallback;
  }

  function renderWords() {
    var root = document.getElementById('inverno-words');
    if (!root) return;
    root.innerHTML = '';
    WORDS.forEach(function (word, index) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'inverno-word';
      btn.setAttribute('role', 'listitem');
      btn.dataset.id = word.id;
      btn.textContent = field(word, 'label');
      btn.style.animationDelay = (index * 40) + 'ms';
      btn.addEventListener('click', function () {
        selectWord(word, btn);
      });
      root.appendChild(btn);
    });
  }

  function selectWord(word, btn) {
    document.querySelectorAll('.inverno-word').forEach(function (el) {
      el.classList.toggle('is-on', el === btn);
    });
    var read = document.getElementById('inverno-word-read');
    var openWrap = document.querySelector('.inverno-word-open');
    var link = document.getElementById('inverno-word-link');
    if (!read || !openWrap || !link) return;
    read.hidden = false;
    read.textContent = field(word, 'simple');
    openWrap.hidden = false;
    link.href = word.href;
    link.textContent = t('pages.inverno.openWord', 'Abrir ficha') + ' · ' + field(word, 'label');
  }

  function initSnow() {
    var canvas = document.querySelector('.inverno-snow');
    var hero = document.querySelector('.inverno-hero');
    if (!canvas || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.remove();
      return;
    }

    var ctx = canvas.getContext('2d');
    var flakes = [];
    var running = true;
    var width = 0;
    var height = 0;

    function resize() {
      var rect = hero.getBoundingClientRect();
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(70, Math.max(28, Math.round(width / 18)));
      flakes = [];
      for (var i = 0; i < count; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.6 + 0.4,
          s: Math.random() * 0.45 + 0.15,
          d: Math.random() * Math.PI * 2
        });
      }
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(244, 247, 251, 0.72)';
      flakes.forEach(function (f) {
        f.y += f.s;
        f.x += Math.sin(f.d) * 0.28;
        f.d += 0.01;
        if (f.y > height) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () {
      running = document.visibilityState !== 'hidden';
      if (running) requestAnimationFrame(tick);
    });
    requestAnimationFrame(tick);
  }

  function boot() {
    renderWords();
    initSnow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.addEventListener('budganja:locale-change', function () {
    var currentId = '';
    var on = document.querySelector('.inverno-word.is-on');
    if (on) currentId = on.dataset.id || '';
    renderWords();
    if (!currentId) return;
    var word = WORDS.filter(function (w) { return w.id === currentId; })[0];
    var btn = document.querySelector('.inverno-word[data-id="' + currentId + '"]');
    if (word && btn) selectWord(word, btn);
  });
})();
