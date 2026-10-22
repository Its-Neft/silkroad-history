const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /style=["'][^"']*text-align:[^"']*["']/gi;
let m;
let found = 0;
while ((m = regex.exec(html)) !== null) {
  found++;
  console.log(m[0]);
}
console.log(`Found ${found} inline text-align attributes in index.html`);
