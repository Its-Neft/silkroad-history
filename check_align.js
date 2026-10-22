const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const regex = /([^{}]+)\{([^}]+)\}/g;
let m;
const aligns = [];
while ((m = regex.exec(css)) !== null) {
  const sel = m[1].trim();
  const body = m[2];
  if (body.includes('text-align')) {
    const match = body.match(/text-align:\s*([^;]+);/);
    aligns.push({ sel, align: match ? match[1].trim() : 'unknown' });
  }
}

console.log('Selectors with text-align:');
aligns.forEach(a => console.log(`[${a.align}] -> ${a.sel}`));
