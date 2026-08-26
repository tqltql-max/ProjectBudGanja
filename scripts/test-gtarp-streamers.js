'use strict';

const { parseYoutube, parseKick, parseTwitch, slugify } = require('../lib/gtarp-streamers-service.js');

let passed = 0;
let failed = 0;

function assert(name, condition, detail) {
  if (condition) {
    passed += 1;
    console.log('  OK  ' + name);
  } else {
    failed += 1;
    console.error(' FAIL ' + name + (detail ? ' — ' + detail : ''));
  }
}

assert('youtube handle', parseYoutube('https://www.youtube.com/@hopejoyoficial').handle === '@hopejoyoficial');
assert('youtube host reject', !!parseYoutube('https://kick.com/foo').error);
assert('kick url', parseKick('https://kick.com/hopejoyoficial').handle === 'hopejoyoficial');
assert('kick handle only', parseKick('PaulinhoLOKObr').url === 'https://kick.com/PaulinhoLOKObr');
assert('twitch url', parseTwitch('https://www.twitch.tv/demo').handle === 'demo');
assert('slug accents', slugify('Hope Joy') === 'hope-joy');
assert('slug empty-ish', slugify('  ') === '');

console.log(failed ? failed + ' falha(s)' : passed + ' testes OK');
process.exit(failed ? 1 : 0);
