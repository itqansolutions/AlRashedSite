const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // If not already there, inject
  if (!content.includes('<link rel="icon"')) {
    content = content.replace('</head>', '  <link rel="icon" href="/assets/logo.jpg" type="image/jpeg">\n</head>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected favicon into ${file}`);
  }
});
