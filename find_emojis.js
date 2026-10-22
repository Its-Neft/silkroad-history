const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Regex for emojis
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
const matches = html.match(emojiRegex);
const unique = [...new Set(matches)];
console.log('Unique emojis found in index.html:', unique);

// Also find where each emoji appears
unique.forEach(e => {
  const lines = html.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes(e)) {
      console.log(`[Line ${idx+1}] ${e} -> ${l.trim().substring(0, 80)}`);
    }
  });
});
