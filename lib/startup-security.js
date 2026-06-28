'use strict';

const { isProductionSite, getAdminUser, getAdminPass, getGoogleClientId } = require('./utils.js');

function auditStartupSecurity() {
  const warnings = [];

  if (isProductionSite()) {
    if (!process.env.ADMIN_USER && getAdminUser() === 'admin') {
      warnings.push('Defina ADMIN_USER no .env (não use o valor padrão em produção)');
    }
    if (!process.env.RESEARCH_PASS || getAdminPass() === 'test123') {
      warnings.push('Defina RESEARCH_PASS no .env com uma senha forte para o painel admin');
    }
    if (!getGoogleClientId()) {
      warnings.push('Defina GOOGLE_CLIENT_ID no .env para activar cadastro com Google (/entrar.html)');
    }
  }

  warnings.forEach((msg) => console.warn('[segurança]', msg));
  return warnings;
}

module.exports = { auditStartupSecurity };
