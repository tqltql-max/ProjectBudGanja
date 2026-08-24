/**
 * Neve a cair em todas as páginas — o mesmo recorte da capa de Bom dia, Inverno.
 * Não intercepta cliques. Para se prefers-reduced-motion estiver activo.
 */
(function () {
  'use strict';

  if (document.getElementById('site-snow')) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.createElement('canvas');
  canvas.id = 'site-snow';
  canvas.className = 'site-snow';
  canvas.setAttribute('aria-hidden', 'true');

  function mount() {
    if (canvas.parentNode) return;
    if (document.body) document.body.appendChild(canvas);
  }

  var ctx = null;
  var flakes = [];
  var running = true;
  var width = 0;
  var height = 0;

  function flakeFill() {
    return document.documentElement.getAttribute('data-theme') === 'dark'
      ? 'rgba(244, 247, 251, 0.78)'
      : 'rgba(210, 226, 240, 0.72)';
  }

  function resize() {
    width = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
    height = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    if (!ctx) ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.min(86, Math.max(26, Math.round(width / 16)));
    if (width < 700) count = Math.min(count, 48);
    flakes = [];
    var i;
    for (i = 0; i < count; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.7 + 0.35,
        s: Math.random() * 0.5 + 0.18,
        d: Math.random() * Math.PI * 2
      });
    }
  }

  function tick() {
    if (!running || !ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = flakeFill();
    var i;
    var f;
    for (i = 0; i < flakes.length; i++) {
      f = flakes[i];
      f.y += f.s;
      f.x += Math.sin(f.d) * 0.32;
      f.d += 0.012;
      if (f.y > height) {
        f.y = -6;
        f.x = Math.random() * width;
      }
      if (f.x < -8) f.x = width + 4;
      if (f.x > width + 8) f.x = -4;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  function hidePageSnow() {
    var local = document.querySelectorAll('.inverno-snow');
    var i;
    for (i = 0; i < local.length; i++) {
      local[i].hidden = true;
    }
  }

  function start() {
    mount();
    hidePageSnow();
    if (!canvas.parentNode) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', function () {
      running = document.visibilityState !== 'hidden';
      if (running) requestAnimationFrame(tick);
    });
    requestAnimationFrame(tick);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
