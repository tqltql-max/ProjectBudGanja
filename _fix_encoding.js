const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname);

const R = '\uFFFD'; // replacement char

const FIXES = [
  // calculadoras.html specific broken strings
  ['Condutividade El' + R + 'trica' + R + 'trica', 'Condutividade Elétrica'],
  ['Condutividade El' + R + 'trica', 'Condutividade Elétrica'],
  ['Condutividade El' + R, 'Condutividade Elétrica'],
  ['solu' + R + 'o nutritiva', 'solução nutritiva'],
  ['solu' + R + 'o concentrada', 'solução concentrada'],
  ['solu' + R + 'o est' + R, 'solução está'],
  ['solu' + R + 'o na faixa', 'solução na faixa'],
  ['Concentra' + R + 'o atual', 'Concentração atual'],
  ['est' + R + ' na faixa ideal', 'está na faixa ideal'],
  ['est' + R, 'está'],
  ['' + R + '??', '📷'],
  ['' + R + '\u2014' + R, '📷'],
  ['Watts por m' + R, 'Watts por m²'],
  ['W/m' + R, 'W/m²'],
  ['' + R + 'rea', 'área'],
  ['Largura da ' + R + 'rea', 'Largura da área'],
  ['Comprimento da ' + R + 'rea', 'Comprimento da área'],
  ['dist' + R + 'ncia', 'distância'],
  ['doen' + R + 'as', 'doenças'],
  ['Propag' + R + 'o', 'Propagação'],
  ['Estresse h' + R + 'drico', 'Estresse hídrico'],
  ['defici' + R + 'ncia', 'deficiência'],
  ['vl' + R + 'idos', 'válidos'],
  ['vl' + R + 'ido', 'válido'],
  ['alcal' + R + 'no', 'alcalino'],
  ['M' + R + 'nimo', 'Mínimo'],
  ['Flora' + R + 'o', 'Floração'],
  ['gal' + R + 'es', 'galões'],
  ['recomenda' + R + 'o', 'recomendação'],
  ['Consumo di' + R + 'rio', 'Consumo diário'],
  ['Propor' + R + 'es', 'Proporções'],
  ['org' + R + 'nico', 'orgânico'],
  ['necess' + R + 'rio', 'necessário'],
  ['D' + R + 'ficit', 'Déficit'],
  ['Press' + R + 'o', 'Pressão'],
  ['Di' + R + 'ria', 'Diária'],
  ['fotoper' + R + 'odo', 'fotoperíodo'],
  ['Lux' + R + 'metro', 'Luxímetro'],
  ['C' + R + 'mera', 'Câmera'],
  ['Me' + R + 'a', 'Meça'],
  ['Dilui' + R + 'o', 'Diluição'],
  ['solu' + R + 'o', 'solução'],
  ['concentra' + R + 'o', 'concentração'],
  ['faixa ideal', 'faixa ideal'],
  ['A concentra' + R + 'o', 'A concentração'],
  ['j' + R + ' est' + R, 'já está'],
  ['N' + R + 'o ' + R + ' necess' + R + 'rio', 'Não é necessário'],
  ['mol/m' + R + '/dia', 'mol/m²/dia'],
  ['' + R + 'mol/m' + R + '/s', 'μmol/m²/s'],
  ['Di' + R + 'metro', 'Diâmetro'],
  // Luximetro
  ['Lux' + R + 'metro', 'Luxímetro'],
  // General leftover replacement chars
  ['utilit' + R + 'rios', 'utilitários'],
  ['calculadoras e utilit' + R + 'rios', 'calculadoras e utilitários'],
  ['para cultivo vegetal', 'para cultivo vegetal'],
  // Fix double accents
  ['Elétricaétrica', 'Elétrica'],
  ['m²²', 'm²'],
  ['W/m²²', 'W/m²'],
];

let fp = path.join(ROOT, 'calculadoras.html');
let c = fs.readFileSync(fp, 'utf-8');

for (const [bad, good] of FIXES) {
  while (c.includes(bad)) {
    c = c.split(bad).join(good);
  }
}

fs.writeFileSync(fp, c, 'utf-8');
console.log('Fixed calculadoras.html');

// Also fix luximetro.html and others for any remaining R chars
const others = [
  'luximetro.html',
  'admin.html',
  'pesquisas.html',
  'index.html',
  'equipamentos.html',
  'manual-clonadora.html',
  'manual-hidrocloradora.html',
  'sobre.html',
  'contato.html',
  'pesquisa-substratos.html',
];

for (const file of others) {
  fp = path.join(ROOT, file);
  if (!fs.existsSync(fp)) continue;
  c = fs.readFileSync(fp, 'utf-8');
  for (const [bad, good] of FIXES) {
    while (c.includes(bad)) {
      c = c.split(bad).join(good);
    }
  }
  // Remove any remaining lone replacement chars
  while (c.includes(R)) {
    c = c.split(R).join('');
  }
  fs.writeFileSync(fp, c, 'utf-8');
  console.log('Cleaned', file);
}

// Clean remaining R in calculadoras too
fp = path.join(ROOT, 'calculadoras.html');
c = fs.readFileSync(fp, 'utf-8');
while (c.includes(R)) {
  c = c.split(R).join('');
}
fs.writeFileSync(fp, c, 'utf-8');
console.log('Cleaned calculadoras.html remaining');

console.log('Done!');
