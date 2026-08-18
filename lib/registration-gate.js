'use strict';

/**
 * Porta de novos cadastros.
 * Por omissão aberta. Para fechar: ALLOW_NEW_REGISTRATIONS=0 no .env e reiniciar o site.
 */

const REGISTRATION_CLOSED_MESSAGE =
  'Cadastros novos temporariamente indisponíveis no momento. Contas já existentes podem entrar normalmente.';

function areNewRegistrationsAllowed() {
  const allow = String(process.env.ALLOW_NEW_REGISTRATIONS || '1')
    .trim()
    .toLowerCase();
  return !(allow === '0' || allow === 'false' || allow === 'no' || allow === 'off');
}

module.exports = {
  areNewRegistrationsAllowed,
  REGISTRATION_CLOSED_MESSAGE
};
