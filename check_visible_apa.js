const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all text outside tags containing APA
const stripped = html.replace(/<[^>]+>/g, ' ');
const words = stripped.split(/\s+/);
words.forEach((w, idx) => {
  if (/apa/i.test(w)) {
    const context = words.slice(Math.max(0, idx - 5), Math.min(words.length, idx + 6)).join(' ');
    console.log(`Visible APA text: "${context}"`);
  }
});
