const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace /css/ with css/
  content = content.replace(/href="\/css\//g, 'href="css/');
  // Replace /assets/ with assets/
  content = content.replace(/src="\/assets\//g, 'src="assets/');
  content = content.replace(/url\('\/assets\//g, "url('assets/");
  content = content.replace(/href="\/assets\//g, 'href="assets/');
  // Replace /js/ with js/
  content = content.replace(/src="\/js\//g, 'src="js/');
  
  fs.writeFileSync(filePath, content, 'utf8');
});

// Fix CSS files containing /assets/
const cssDir = path.join(publicDir, 'css');
fs.readdirSync(cssDir).filter(f => f.endsWith('.css')).forEach(file => {
  const filePath = path.join(cssDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  // In css files, assets are relative to css folder: ../assets/
  content = content.replace(/url\('\/assets\//g, "url('../assets/");
  fs.writeFileSync(filePath, content, 'utf8');
});

// Fix JS files fetching /lang/
const jsDir = path.join(publicDir, 'js');
fs.readdirSync(jsDir).filter(f => f.endsWith('.js')).forEach(file => {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/fetch\(`\/lang\//g, 'fetch(`lang/');
  content = content.replace(/fetch\('\/api/g, "fetch('api");
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Path references converted to relative!');
