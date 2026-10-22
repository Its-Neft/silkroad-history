const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const matches = html.matchAll(/<div class="callout-box[^"]*">([\s\S]*?)<\/div>/g);
let count = 0;
for (const m of matches) {
  count++;
  const inner = m[1];
  // check if inner has text directly outside tags
  const directText = inner.replace(/<[^>]+>[\s\S]*?<\/[^>]+>/g, '').replace(/<[^>]+>/g, '').trim();
  if (directText.length > 20) {
    console.log(`Callout #${count} has direct text:`, directText.substring(0, 50));
  }
}
console.log(`Total callout boxes checked: ${count}`);
