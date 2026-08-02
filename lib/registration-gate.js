'use strict';

/**
 * Porta de novos cadastros.
 * Por omissão fechada. Para reabrir: ALLOW_NEW_REGISTRATIONS=1 no .env e reiniciar o site.
 */

const REGISTRATION_CLOSED_MESSAGE =
  'Cadastros novos temporariamente indisponíveis no momento. Contas já existentes podem entrar normalmente.';

function areNewRegistrationsAllowed() {
  const allow = String(process.env.ALLOW_NEW_REGISTRATIONS || '')
    .trim()
    .toLowerCase();
  return allow === '1' || allow === 'true' || allow === 'yes' || allow === 'on';
}

module.exports = {
  areNewRegistrationsAllowed,
  REGISTRATION_CLOSED_MESSAGE
};
