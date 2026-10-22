const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const classes = new Set();
const matches = html.matchAll(/class=["']([^"']+)["']/g);
for (const m of matches) {
  m[1].split(/\s+/).forEach(c => classes.add(c));
}
const list = Array.from(classes).sort();
console.log('Total classes:', list.length);
const textLike = list.filter(c => /text|desc|body|lead|abstract|quote|note|content|card|box|item|info|summary|detail|list|analysis|intro|para|section|col/i.test(c));
console.log('Text-related classes:');
console.log(textLike.join('\n'));

// Let's also check all tags that contain text
const tags = new Set();
const tagMatches = html.matchAll(/<([a-z0-9]+)[\s>]/gi);
for (const tm of tagMatches) {
  tags.add(tm[1].toLowerCase());
}
console.log('\nAll HTML tags used:');
console.log(Array.from(tags).sort().join(', '));
