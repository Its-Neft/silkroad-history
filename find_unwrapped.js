const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Match tags containing significant text
// e.g. <div class="...">Some long text that is not wrapped in p or li...</div>
const tagRegex = /<([a-z0-9]+)([^>]*)>([\s\S]*?)<\/\1>/gi;

// Let's find tags where immediate text content (excluding nested tags) has > 50 characters
// and check if they are p, li, h1-h6, script, style, title, etc.
const matches = [];
let m;
const textBlockRegex = /<([a-zA-Z0-9]+)([^>]*)>([^<]{50,})<\/\1>/g;
while ((m = textBlockRegex.exec(html)) !== null) {
  const tag = m[1].toLowerCase();
  const attrs = m[2];
  const text = m[3].trim().substring(0, 60);
  if (!['p', 'li', 'h1', 'h2', 'h3', 'h4', 'script', 'style', 'title'].includes(tag)) {
    matches.push({ tag, attrs: attrs.trim(), text });
  }
}

console.log('Non-standard text blocks > 50 chars:');
matches.forEach(item => {
  console.log(`[${item.tag}] ${item.attrs} -> "${item.text}..."`);
});
