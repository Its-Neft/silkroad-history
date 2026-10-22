const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace (NORMA APA 7ª ED.) with SÍNTESIS EJECUTIVA
const beforeCount = (html.match(/APA/gi) || []).length;
console.log('Before count of APA:', beforeCount);

html = html.replace(/SÍNTESIS EJECUTIVA \(NORMA APA 7ª ED\.\)/g, 'SÍNTESIS EJECUTIVA');
html = html.replace(/Referencias bibliográficas APA 7ª edición/g, 'Referencias bibliográficas oficiales y fuentes primarias');
html = html.replace(/normas APA/gi, 'estándares editoriales');
html = html.replace(/norma APA/gi, 'estándar editorial');

const afterCount = (html.match(/APA/gi) || []).length;
console.log('After count of APA:', afterCount);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');
