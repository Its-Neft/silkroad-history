const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const lines = css.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('text-align')) {
    console.log(`Line ${idx + 1}: ${line}`);
  }
});
