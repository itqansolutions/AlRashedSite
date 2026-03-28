const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace logo.svg with logo.jpg
  let newContent = content.replace(/logo\.svg/g, 'logo.jpg');
  
  // Replace workshop.jpg with about-preview.jpg specifically on index.html
  if (file === 'index.html') {
    newContent = newContent.replace(/workshop\.jpg/g, 'about-preview.jpg');
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated images in ${file}`);
  }
});
