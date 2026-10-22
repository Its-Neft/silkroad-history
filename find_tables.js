const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = html.matchAll(/<table[^>]*>/gi);
for (const m of matches) {
  console.log(m[0]);
}
