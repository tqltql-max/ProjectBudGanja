const fs = require('fs');
const path = require('path');
const classes = {};
function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.statSync(p);
    if (s.isDirectory() && !p.includes('node_modules') && !p.includes('posts')) walk(p);
    else if (f.endsWith('.html')) {
      const c = fs.readFileSync(p, 'utf8');
      const m = c.match(/<main[^>]*class="([^"]+)"/);
      if (m) {
        const rel = p.replace(process.cwd() + path.sep, '');
        classes[m[1]] = (classes[m[1]] || []).concat(rel);
      }
    }
  }
}
walk('.');
for (const k of Object.keys(classes).sort()) {
  console.log('=== ' + k + ' ===');
  classes[k].forEach(x => console.log('  ' + x));
}
