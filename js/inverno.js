(function () {
  'use strict';

  var WORDS = [
    { id: "barco", href: "/posts/post-inspecao-palavra-barco.html", pt: "Barco", en: "Boat", es: "Barco", simplePt: "Casa, oficina e corpo da invernagem.", simpleEn: "Home, workshop and body of the overwintering.", simpleEs: "Casa, taller y cuerpo de la invernada." },
    { id: "mar", href: "/posts/post-inspecao-palavra-mar.html", pt: "Mar", en: "Sea", es: "Mar", simplePt: "Horizonte da travessia — no gelo, deixa de passar.", simpleEn: "Horizon of the crossing — on ice, it stops passing.", simpleEs: "Horizonte de la travesía — en el hielo, deja de pasar." },
    { id: "gelo", href: "/posts/post-inspecao-palavra-gelo.html", pt: "Gelo", en: "Ice", es: "Hielo", simplePt: "Água sólida que prende o barco.", simpleEn: "Solid water that holds the boat.", simpleEs: "Agua sólida que atrapa el barco." },
    { id: "inverno", href: "/posts/post-inspecao-palavra-inverno.html", pt: "Inverno", en: "Winter", es: "Invierno", simplePt: "Estação e cumprimento: bom dia ao frio.", simpleEn: "Season and greeting: good morning to the cold.", simpleEs: "Estación y saludo: buenos días al frío." },
    { id: "invernagem", href: "/posts/post-inspecao-palavra-invernagem.html", pt: "Invernagem", en: "Overwintering", es: "Invernada", simplePt: "Ficar o inverno inteiro no gelo — eixo do livro.", simpleEn: "Staying the whole winter in the ice — axis of the book.", simpleEs: "Quedarse todo el invierno en el hielo — eje del libro." },
    { id: "navegar", href: "/posts/post-inspecao-palavra-navegar.html", pt: "Navegar", en: "Sail", es: "Navegar", simplePt: "Conduzir o barco e a própria rota.", simpleEn: "Steering the boat and one’s own route.", simpleEs: "Conducir el barco y la propia ruta." },
    { id: "agua", href: "/posts/post-inspecao-palavra-agua.html", pt: "Água", en: "Water", es: "Agua", simplePt: "Líquido que vira terra quando congela.", simpleEn: "Liquid that becomes land when it freezes.", simpleEs: "Líquido que se vuelve tierra al congelarse." },
    { id: "neve", href: "/posts/post-inspecao-palavra-neve.html", pt: "Neve", en: "Snow", es: "Nieve", simplePt: "Cobertura branca — paisagem e ruído branco.", simpleEn: "White cover — landscape and white noise.", simpleEs: "Cubierta blanca — paisaje y ruido blanco." },
    { id: "congelado", href: "/posts/post-inspecao-palavra-congelado.html", pt: "Congelado", en: "Frozen", es: "Congelado", simplePt: "Estado do mar quando o tempo substitui o espaço.", simpleEn: "State of the sea when time replaces space.", simpleEs: "Estado del mar cuando el tiempo sustituye al espacio." },
    { id: "risco", href: "/posts/post-inspecao-palavra-risco.html", pt: "Risco", en: "Risk", es: "Riesgo", simplePt: "Perigo calculado — ofício, não romantismo.", simpleEn: "Calculated danger — craft, not romance.", simpleEs: "Peligro calculado — oficio, no romanticismo." },
    { id: "solitario", href: "/posts/post-inspecao-palavra-solitario.html", pt: "Solitário", en: "Solo", es: "Solitario", simplePt: "Sozinha no fiorde — sem romantizar o isolamento.", simpleEn: "Alone in the fjord — without romanticizing isolation.", simpleEs: "Sola en el fiordo — sin romantizar el aislamiento." },
    { id: "groenlandia", href: "/posts/post-inspecao-palavra-groenlandia.html", pt: "Groenlândia", en: "Greenland", es: "Groenlandia", simplePt: "Palco da invernagem ártica.", simpleEn: "Stage of the Arctic overwintering.", simpleEs: "Escenario de la invernada ártica." },
    { id: "anzol", href: "/posts/post-inspecao-palavra-anzol.html", pt: "Anzol", en: "Hook", es: "Anzuelo", simplePt: "Ofício miúdo no gelo — pescar para ficar.", simpleEn: "Small craft on the ice — fishing in order to stay.", simpleEs: "Oficio menudo en el hielo — pescar para quedarse." },
    { id: "livro", href: "/posts/post-inspecao-palavra-livro.html", pt: "Livro", en: "Book", es: "Libro", simplePt: "A invernagem vira página. Depois, pede para circular.", simpleEn: "Overwintering becomes a page. Then it asks to circulate.", simpleEs: "La invernada se hace página. Después pide circular." },
    { id: "balde", href: "/posts/post-inspecao-palavra-balde.html", pt: "Balde", en: "Bucket", es: "Balde", simplePt: "Utensílio da narrativa ártica — volume e limite.", simpleEn: "Tool of the Arctic narrative — volume and limit.", simpleEs: "Utensilio de la narrativa ártica — volumen y límite." },
    { id: "gesto", href: "/posts/post-inspecao-palavra-gesto.html", pt: "Gesto", en: "Gesture", es: "Gesto", simplePt: "Acto mínimo: voar, ficar, registar.", simpleEn: "Minimal act: fly, stay, record.", simpleEs: "Acto mínimo: volar, quedarse, registrar." },
    { id: "medo", href: "/posts/post-inspecao-palavra-medo.html", pt: "Medo", en: "Fear", es: "Miedo", simplePt: "Limite real da invernagem — nomear, não negar.", simpleEn: "Real limit of overwintering — name it, do not deny it.", simpleEs: "Límite real de la invernada — nombrarlo, no negarlo." },
    { id: "passar", href: "/posts/post-inspecao-palavra-passar.html", pt: "Passar", en: "Pass", es: "Pasar", simplePt: "No gelo o barco deixa de passar — e a mudinha não passa sozinha.", simpleEn: "On ice the boat stops passing — and the seedling does not pass alone.", simpleEs: "En el hielo el barco deja de pasar — y la plantita no pasa sola." },
    { id: "caminho", href: "/posts/post-inspecao-palavra-caminho.html", pt: "Caminho", en: "Path", es: "Camino", simplePt: "Rota própria — tensão produtiva com Amyr.", simpleEn: "Own route — productive tension with Amyr.", simpleEs: "Ruta propia — tensión productiva con Amyr." },
    { id: "mao", href: "/posts/post-inspecao-palavra-mao-esquerda-direita.html", pt: "Mão", en: "Hand", es: "Mano", simplePt: "Na capa: a esquerda segura o drone.", simpleEn: "On the cover: the left hand holds the drone.", simpleEs: "En la portada: la izquierda sostiene el dron." },
    { id: "luz", href: "/posts/post-inspecao-palavra-luz.html", pt: "Luz", en: "Light", es: "Luz", simplePt: "A mudinha pede luz fraca — não sol a mais.", simpleEn: "The seedling asks for weak light — not extra sun.", simpleEs: "La plantita pide luz débil — no más sol." },
    { id: "sol", href: "/posts/post-inspecao-palavra-sol.html", pt: "Sol", en: "Sun", es: "Sol", simplePt: "Não pedimos sol a mais — só ficar.", simpleEn: "We do not ask for more sun — only to stay.", simpleEs: "No pedimos más sol — solo quedarnos." },
    { id: "tempo", href: "/posts/post-inspecao-palavra-tempo.html", pt: "Tempo", en: "Time", es: "Tiempo", simplePt: "A mudinha só pede tempo — no gelo o tempo substitui o espaço.", simpleEn: "The seedling only asks for time — on ice time replaces space.", simpleEs: "La plantita solo pide tiempo — en el hielo el tiempo sustituye al espacio." },
    { id: "enjoo", href: "/posts/post-inspecao-palavra-nojinho.html", pt: "Enjoo", en: "Nausea", es: "Mareo", simplePt: "O balde não julga o enjoo.", simpleEn: "The bucket does not judge the nausea.", simpleEs: "El balde no juzga el mareo." },
    { id: "vida", href: "/posts/post-inspecao-palavra-vida.html", pt: "Vida", en: "Vida", es: "Vida", simplePt: "Ficar, registar, cuidar — o canto do laboratório.", simpleEn: "Stay, record, care — the laboratory’s corner.", simpleEs: "Quedarse, registrar, cuidar — el rincón del laboratorio." },
    { id: "fiorde", href: "/posts/post-inspecao-palavra-fiorde.html", pt: "Fiorde", en: "Fjord", es: "Fiordo", simplePt: "Onde o barco fica preso — −40 °C no fiorde.", simpleEn: "Where the boat stays locked — −40 °C in the fjord.", simpleEs: "Donde el barco queda preso — −40 °C en el fiordo." },
    { id: "drone", href: "/posts/post-inspecao-palavra-drone.html", pt: "Drone", en: "Drone", es: "Dron", simplePt: "A câmara no céu — a mão esquerda ainda conduz.", simpleEn: "The camera in the sky — the left hand still steers.", simpleEs: "La cámara en el cielo — la mano izquierda aún conduce." },
    { id: "circular", href: "/posts/post-inspecao-palavra-circular.html", pt: "Circular", en: "Circulate", es: "Circular", simplePt: "O livro pede para circular — não para ficar na estante.", simpleEn: "The book asks to circulate — not to stay on the shelf.", simpleEs: "El libro pide circular — no quedarse en el estante." },
    { id: "oficio", href: "/posts/post-inspecao-palavra-oficio.html", pt: "Ofício", en: "Craft", es: "Oficio", simplePt: "Voar, ficar, registar — o ofício no gelo.", simpleEn: "Fly, stay, record — craft on the ice.", simpleEs: "Volar, quedarse, registrar — el oficio en el hielo." },
    { id: "voar", href: "/posts/post-inspecao-palavra-voar.html", pt: "Voar", en: "Fly", es: "Volar", simplePt: "Ela sobe a câmara — o ofício inclui voar.", simpleEn: "She sends the camera up — craft includes flying.", simpleEs: "Ella sube la cámara — el oficio incluye volar." },
    { id: "ficar", href: "/posts/post-inspecao-palavra-ficar.html", pt: "Ficar", en: "Stay", es: "Quedarse", simplePt: "Pedir só ficar quando o gelo prende o barco.", simpleEn: "Ask only to stay when the ice holds the boat.", simpleEs: "Pedir solo quedarse cuando el hielo atrapa el barco." },
    { id: "registar", href: "/posts/post-inspecao-palavra-registar.html", pt: "Registar", en: "Record", es: "Registrar", simplePt: "A foto guarda o ofício: voar, ficar, registar.", simpleEn: "The photo keeps the craft: fly, stay, record.", simpleEs: "La foto guarda el oficio: volar, quedarse, registrar." },
    { id: "camara", href: "/posts/post-inspecao-palavra-camara.html", pt: "Câmara", en: "Camera", es: "Cámara", simplePt: "Está no céu porque ela a mandou para o céu.", simpleEn: "It is in the sky because she sent it there.", simpleEs: "Está en el cielo porque ella la mandó al cielo." },
    { id: "ceu", href: "/posts/post-inspecao-palavra-ceu.html", pt: "Céu", en: "Sky", es: "Cielo", simplePt: "A câmara está no céu porque ela a mandou.", simpleEn: "The camera is in the sky because she sent it.", simpleEs: "La cámara está en el cielo porque ella la mandó." },
    { id: "emprestar", href: "/posts/post-inspecao-palavra-emprestar.html", pt: "Emprestar", en: "Lend", es: "Prestar", simplePt: "Primeiro passo: empresta a quem ainda não leu.", simpleEn: "First step: lend it to someone who has not read it yet.", simpleEs: "Primer paso: préstalo a quien aún no lo leyó." },
    { id: "doar", href: "/posts/post-inspecao-palavra-doar.html", pt: "Doar", en: "Donate", es: "Donar", simplePt: "Doa a uma biblioteca — sobretudo se o título ainda não está no bairro.", simpleEn: "Donate to a library — especially if the title is not yet in the neighbourhood.", simpleEs: "Dona a una biblioteca — sobre todo si el título aún no está en el barrio." },
    { id: "estante", href: "/posts/post-inspecao-palavra-estante.html", pt: "Estante", en: "Shelf", es: "Estante", simplePt: "O gelo pede para circular. Não para ficar na estante.", simpleEn: "The ice asks to circulate. Not to stay on the shelf.", simpleEs: "El hielo pide circular. No quedarse en el estante." },
    { id: "peito", href: "/posts/post-inspecao-palavra-peito.html", pt: "Peito", en: "Chest", es: "Pecho", simplePt: "O peito ainda cabe na mão — corpo no gelo.", simpleEn: "The chest still fits in a hand — body on the ice.", simpleEs: "El pecho aún cabe en la mano — cuerpo en el hielo." },
    { id: "semente", href: "/posts/post-inspecao-palavra-semente.html", pt: "Semente", en: "Seed", es: "Semilla", simplePt: "A semente não grita. A mudinha também não.", simpleEn: "The seed does not shout. Neither does the seedling.", simpleEs: "La semilla no grita. La plantita tampoco." },
    { id: "mudinha", href: "/posts/post-inspecao-palavra-mudinha.html", pt: "Mudinha", en: "Seedling", es: "Plantita", simplePt: "Figura Vida do livro — planta jovem no gelo.", simpleEn: "Vida figure of the book — young plant on the ice.", simpleEs: "Figura Vida del libro — planta joven en el hielo." },
    { id: "estacao", href: "/posts/post-inspecao-palavra-estacao.html", pt: "Estação", en: "Season", es: "Estación", simplePt: "Inverno é estação — fase, não fim.", simpleEn: "Winter is a season — a phase, not an end.", simpleEs: "Invierno es estación — fase, no fin." },
    { id: "flor", href: "/posts/post-inspecao-palavra-flor.html", pt: "Flor", en: "Flower", es: "Flor", simplePt: "Fase em que não se força flor.", simpleEn: "A phase when you do not force the flower.", simpleEs: "Fase en que no se fuerza la flor." },
    { id: "raiz", href: "/posts/post-inspecao-palavra-raiz.html", pt: "Raiz", en: "Root", es: "Raíz", simplePt: "Fase em que se inspeciona a raiz.", simpleEn: "A phase when you inspect the root.", simpleEs: "Fase en que se inspecciona la raíz." },
    { id: "partir", href: "/posts/post-inspecao-palavra-partir.html", pt: "Partir", en: "Leave", es: "Partir", simplePt: "Tamara já sabia: partir, ficar, escrever.", simpleEn: "Tamara already knew: leave, stay, write.", simpleEs: "Tamara ya sabía: partir, quedarse, escribir." },
    { id: "escrever", href: "/posts/post-inspecao-palavra-escrever.html", pt: "Escrever", en: "Write", es: "Escribir", simplePt: "A invernagem vira página — partir, ficar, escrever.", simpleEn: "Overwintering becomes a page — leave, stay, write.", simpleEs: "La invernada se hace página — partir, quedarse, escribir." }
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

  function wordFromHash() {
    var hash = (location.hash || '').replace(/^#/, '');
    if (hash.indexOf('lexico=') === 0) return hash.slice(7);
    return '';
  }

  function selectDefaultWord() {
    var wanted = wordFromHash() || 'invernagem';
    var word = WORDS.filter(function (w) { return w.id === wanted; })[0] || WORDS[4];
    var btn = document.querySelector('.inverno-word[data-id="' + word.id + '"]');
    if (word && btn) selectWord(word, btn);
  }

  function renderPoem() {
    var el = document.getElementById('inverno-poem');
    if (!el) return;
    var raw = t('pages.inverno.poemBody', el.textContent || '');
    el.textContent = String(raw).replace(/\\n/g, '\n').replace(/\r\n/g, '\n').trim();
  }

  function initSnow() {
    var canvas = document.querySelector('.inverno-snow');
    var hero = document.querySelector('.inverno-hero');
    if (!canvas || !hero) return;
    if (document.getElementById('site-snow')) {
      canvas.hidden = true;
      return;
    }
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
          s: Math.random() * 0.18 + 0.06,
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
        f.x += Math.sin(f.d) * 0.12;
        f.d += 0.004;
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

  function initDrone() {
    var drone = document.getElementById('inverno-drone');
    if (!drone) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sections = ['capa', 'circular', 'lexico', 'poema', 'mapa'];
    var nextIndex = 0;
    var size = 104;

    function goToNext() {
      var id = sections[nextIndex % sections.length];
      nextIndex += 1;
      var target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }

    drone.addEventListener('click', goToNext);
    if (reduced) return;

    var x = Math.min(window.innerWidth * 0.78, window.innerWidth - size - 24);
    var y = Math.min(window.innerHeight * 0.58, window.innerHeight - size - 96);
    var tx = x;
    var ty = y;
    var paused = false;
    var flying = true;
    var following = false;
    var caught = false;
    var catchRadius = 58;

    function pad() {
      return {
        left: 16,
        top: 88,
        right: window.innerWidth - size - 16,
        bottom: window.innerHeight - size - 88
      };
    }

    function clampToPad(px, py) {
      var p = pad();
      return {
        x: Math.min(Math.max(px, p.left), p.right),
        y: Math.min(Math.max(py, p.top), p.bottom)
      };
    }

    function pickTarget() {
      var p = pad();
      tx = p.left + Math.random() * Math.max(40, p.right - p.left);
      ty = p.top + Math.random() * Math.max(40, p.bottom - p.top);
    }

    function apply() {
      var bank = Math.max(-18, Math.min(18, (tx - x) * 0.14));
      drone.style.setProperty('--drone-x', Math.round(x) + 'px');
      drone.style.setProperty('--drone-y', Math.round(y) + 'px');
      drone.style.setProperty('--drone-rot', bank.toFixed(1) + 'deg');
    }

    function aimAtPointer(clientX, clientY) {
      following = true;
      caught = Math.hypot(clientX - (x + size / 2), clientY - (y + size / 2)) < catchRadius;
      if (caught || paused) return;
      var next = clampToPad(clientX - size * 0.28, clientY - size * 0.92);
      tx = next.x;
      ty = next.y;
    }

    function tick() {
      if (!flying) return;
      requestAnimationFrame(tick);
      if (paused || caught) return;
      var ease = following ? 0.09 : 0.018;
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      if (!following && Math.abs(tx - x) < 8 && Math.abs(ty - y) < 8) pickTarget();
      apply();
    }

    window.addEventListener('pointermove', function (event) {
      aimAtPointer(event.clientX, event.clientY);
    }, { passive: true });
    window.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'touch' || event.pointerType === 'pen') {
        aimAtPointer(event.clientX, event.clientY);
      }
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', function () {
      following = false;
      caught = false;
      pickTarget();
    });
    drone.addEventListener('mouseenter', function () { paused = true; });
    drone.addEventListener('mouseleave', function () { paused = false; });
    drone.addEventListener('focus', function () { paused = true; });
    drone.addEventListener('blur', function () { paused = false; });
    window.addEventListener('resize', function () {
      var p = pad();
      x = Math.min(Math.max(x, p.left), p.right);
      y = Math.min(Math.max(y, p.top), p.bottom);
      if (!following) pickTarget();
    });
    document.addEventListener('visibilitychange', function () {
      flying = document.visibilityState !== 'hidden';
      if (flying) requestAnimationFrame(tick);
    });

    pickTarget();
    apply();
    requestAnimationFrame(tick);
  }

  function boot() {
    renderWords();
    selectDefaultWord();
    renderPoem();
    initSnow();
    initDrone();
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
    renderPoem();
    if (!currentId) {
      selectDefaultWord();
      return;
    }
    var word = WORDS.filter(function (w) { return w.id === currentId; })[0];
    var btn = document.querySelector('.inverno-word[data-id="' + currentId + '"]');
    if (word && btn) selectWord(word, btn);
  });
})();
