const fs = require('fs');

const files = ['index.html', 'styles.css', 'app.js'];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  console.log(`\n=== References in ${file} ===`);
  lines.forEach((l, i) => {
    if (/apa/i.test(l)) {
      console.log(`Line ${i+1}: ${l.trim()}`);
    }
  });
});
