const fs = require('fs');
const path = require('path');
const pd = path.join(__dirname, 'public');

const v = '?v=' + Date.now();

fs.readdirSync(pd).filter(f => f.endsWith('.html')).forEach(f => {
  const filePath = path.join(pd, f);
  let html = fs.readFileSync(filePath, 'utf8');

  // Add version string to CSS
  html = html.replace(/href="css\/([a-zA-Z0-9_-]+)\.css"/g, 'href="css/$1.css' + v + '"');
  // Add version string to JS
  html = html.replace(/src="js\/([a-zA-Z0-9_-]+)\.js"/g, 'src="js/$1.js' + v + '"');
  
  fs.writeFileSync(filePath, html, 'utf8');
});

console.log('Cache busters applied!');
