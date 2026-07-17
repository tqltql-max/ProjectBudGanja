'use strict';

function getSiteUrl() {
  return String(process.env.SITE_URL || 'https://inspetorbudganja.com.br').replace(/\/$/, '');
}

function formatSorteioDate(value) {
  if (!value) return '';
  const raw = String(value).trim();
  if (!/^\d{4}-\d{2}/.test(raw)) return raw;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function pickName(vars) {
  return String(vars.name || vars.displayName || vars.nome || '').trim() || 'cultivador(a)';
}

const templates = {
  welcome(vars) {
    const siteUrl = getSiteUrl();
    const name = pickName(vars);
    return {
      subject: '[BudGanja] Bem-vindo(a) ao laboratório',
      text:
        'Olá ' + name + ',\n\n' +
        'Sua conta Google foi registada no Inspetor BudGanja — laboratório educacional de cultivo vegetal.\n\n' +
        'Próximos passos:\n' +
        '· Completar o perfil (nome e idade): ' + siteUrl + '/perfil.html\n' +
        '· Abrir o Diário de Cultivo: ' + siteUrl + '/cultivo/\n' +
        '· Ver sorteios e equipamentos: ' + siteUrl + '/sorteios/\n\n' +
        'Conteúdo exclusivo para maiores de 18 anos.\n\n' +
        '— Inspetor BudGanja\n' +
        siteUrl + '\n'
    };
  },

  sorteio_broadcast(vars) {
    const siteUrl = getSiteUrl();
    const subscriber = vars.subscriber || {};
    const config = vars.config || {};
    const name = pickName(subscriber);
    const titulo = String(config.titulo || 'Sorteio do Inspetor BudGanja').trim();
    const descricao = String(config.descricao || '').trim();
    const data = formatSorteioDate(config.dataSorteio);
    const premios = (config.premios || []).map((p) => p.label).filter(Boolean);
    const sorteioUrl = siteUrl + '/sorteios/';

    let text =
      'Olá ' + name + ',\n\n' +
      'Abrimos um novo sorteio no Inspetor BudGanja!\n\n' +
      'Título: ' + titulo + '\n';

    if (data) text += 'Data prevista: ' + data + '\n';
    if (premios.length) text += 'Prémio(s): ' + premios.join(' · ') + '\n';
    if (descricao) text += '\n' + descricao + '\n';

    text +=
      '\nParticipar agora:\n' + sorteioUrl + '\n\n' +
      '— Inspetor BudGanja\n' +
      siteUrl + '\n';

    return { subject: '[BudGanja] Novo sorteio: ' + titulo, text };
  },

  sorteio_alert_inspector(vars) {
    return {
      subject: '[BudGanja] Novo inscrito em avisos de sorteio',
      text:
        'Nova inscrição na lista de avisos de sorteios do site:\n\n' +
        'Nome: ' + (vars.name || '(sem nome)') + '\n' +
        'E-mail: ' + (vars.email || '—') + '\n' +
        'Data: ' + (vars.createdAt || new Date().toISOString()) + '\n'
    };
  },

  sorteio_broadcast_summary(vars) {
    const config = vars.config || {};
    return {
      subject: '[BudGanja] Avisos de sorteio enviados',
      text:
        'Resumo do envio de avisos de sorteio:\n\n' +
        'Sorteio: ' + (config.titulo || '—') + '\n' +
        'Total inscritos: ' + (vars.total || 0) + '\n' +
        'Enviados com sucesso: ' + (vars.sent || 0) + '\n' +
        'Falhas: ' + (vars.failed || 0) + '\n' +
        'Data: ' + new Date().toISOString() + '\n'
    };
  },

  loja_order_confirmation(vars) {
    const siteUrl = getSiteUrl();
    const order = vars.order || {};
    const name = pickName(order);
    return {
      subject: '[BudGanja] Recebemos sua encomenda — ' + (order.productTitle || 'Clonadora'),
      text:
        'Olá ' + name + ',\n\n' +
        'Recebemos seu pedido de encomenda no Inspetor BudGanja.\n\n' +
        'Produto: ' + (order.productTitle || '—') + '\n' +
        (order.packageLabel ? 'Opção: ' + order.packageLabel + (order.packagePriceNote ? ' (' + order.packagePriceNote + ')' : '') + '\n' : '') +
        'Referência: ' + (order.id || '—') + '\n\n' +
        'Vamos responder em até 48 h úteis com valores, prazo e formas de pagamento/envio.\n\n' +
        'Guia de montagem: ' + siteUrl + '/loja/\n\n' +
        '— Inspetor BudGanja\n' +
        siteUrl + '\n'
    };
  },

  loja_order_inspector(vars) {
    const order = vars.order || {};
    return {
      subject: '[BudGanja] Nova encomenda — ' + (order.productTitle || order.productId || 'Loja'),
      text:
        'Nova encomenda na loja do Inspetor BudGanja:\n\n' +
        'Produto: ' + (order.productTitle || '—') + ' (' + (order.productId || '—') + ')\n' +
        (order.packageLabel ? 'Opção: ' + order.packageLabel + (order.packagePriceNote ? ' · ' + order.packagePriceNote : '') + '\n' : '') +
        'Nome: ' + (order.nome || '—') + '\n' +
        'E-mail: ' + (order.email || '—') + '\n' +
        'Telefone/WhatsApp: ' + (order.telefone || '—') + '\n' +
        'Cidade/UF: ' + (order.cidade || '—') + '/' + (order.estado || '—') + '\n' +
        (order.mensagem ? 'Mensagem: ' + order.mensagem + '\n' : '') +
        'ID: ' + (order.id || '—') + '\n' +
        'Data: ' + (order.createdAt || new Date().toISOString()) + '\n'
    };
  },

  loja_payment_info(vars) {
    const siteUrl = getSiteUrl();
    const order = vars.order || {};
    const name = pickName(order);
    return {
      subject: '[BudGanja] Pagamento — encomenda ' + (order.id || ''),
      text:
        'Olá ' + name + ',\n\n' +
        'Seguem as informações de pagamento da sua encomenda no Inspetor BudGanja.\n\n' +
        'Referência: ' + (order.id || '—') + '\n' +
        'Produto: ' + (order.productTitle || '—') + '\n' +
        (vars.paymentInstructions ? '\n' + vars.paymentInstructions + '\n' : '') +
        (vars.amount ? 'Valor: ' + vars.amount + '\n' : '') +
        '\nQualquer dúvida, responda a este e-mail.\n\n' +
        '— Inspetor BudGanja\n' +
        siteUrl + '\n'
    };
  }
};

function renderEmailTemplate(name, vars) {
  const fn = templates[name];
  if (!fn) {
    throw new Error('Template de e-mail desconhecido: ' + name);
  }
  return fn(vars || {});
}

function listEmailTemplates() {
  return Object.keys(templates);
}

module.exports = {
  renderEmailTemplate,
  listEmailTemplates,
  getSiteUrl
};
