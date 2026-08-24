(function () {
  'use strict';

  var COLORS = [
    {
      id: 'branco',
      label: 'Branco',
      tone: 'white',
      text: 'Branco é atenção. 1.º elo: eu · nós — quem fala olha limpo. Não se funde com o vermelho do perigo nem com o amarelo do cuidado.'
    },
    {
      id: 'vermelho',
      label: 'Vermelho',
      tone: 'red',
      text: 'Vermelho é perigo. 3.º elo: ele · ela · eles · elas — de quem se fala; o ausente; a orelha cola elos em eles. Não se funde com a Raiva da Riley.'
    },
    {
      id: 'amarelo',
      label: 'Amarelo',
      tone: 'yellow',
      text: 'Amarelo é cuidado. 2.º elo: tu · vós — com quem se fala; ainda dá tempo; tu vs você é medida, não festa. Não se funde com a Alegria.'
    }
  ];

  var FEELINGS = [
    { id: 'alegria', href: '/posts/post-inspecao-palavra-alegria.html', label: 'Alegria', text: 'Alegria — quer o bem; aprende a partilhar o comando.' },
    { id: 'tristeza', href: '/posts/post-inspecao-palavra-tristeza.html', label: 'Tristeza', text: 'Tristeza — abre o pedido de ajuda; sem ela a Alegria não basta.' },
    { id: 'raiva', href: '/posts/post-inspecao-palavra-raiva.html', label: 'Raiva', text: 'Raiva — fogo de limite. Ofício, não vilania.' },
    { id: 'medo', href: '/posts/post-inspecao-palavra-medo.html', label: 'Medo', text: 'Medo — ensaio do risco. Protege sem apagar o caminho.' },
    { id: 'nojinho', href: '/posts/post-inspecao-palavra-nojinho.html', label: 'Nojinho', text: 'Nojinho — aversão que guarda. Recusar também é cuidar.' }
  ];

  function mountChips(rootId, items, readId, withTone) {
    var root = document.getElementById(rootId);
    var read = document.getElementById(readId);
    if (!root || !read) return;

    items.forEach(function (item, index) {
      var btn = document.createElement(item.href ? 'a' : 'button');
      if (item.href) {
        btn.href = item.href;
      } else {
        btn.type = 'button';
      }
      btn.className = 'livro-chip' + (withTone && item.tone ? ' livro-chip--' + item.tone : '');
      btn.textContent = item.label;
      btn.style.animationDelay = index * 40 + 'ms';
      btn.addEventListener(item.href ? 'mouseenter' : 'click', function () {
        root.querySelectorAll('.livro-chip').forEach(function (el) {
          el.classList.toggle('is-on', el === btn);
        });
        read.textContent = item.text;
      });
      root.appendChild(btn);
    });
    read.textContent = items[0].text;
  }

  mountChips('livro-cores', COLORS, 'livro-cor-read', true);
  mountChips('livro-emocoes', FEELINGS, 'livro-emocao-read', false);

  var generate = document.getElementById('livro-gerar');
  if (generate) {
    generate.addEventListener('click', function () {
      window.print();
    });
  }
})();
