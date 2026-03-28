const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const newFooter = '<div class="footer__bottom">\n        &copy; <span id="year"></span> AL-RASHED — <span data-i18n="footer.developed">تم التطوير بواسطة</span> <a href="https://itqansolutions.org" target="_blank" style="color:var(--gold); text-decoration:none; font-weight:bold;">Itqan Solutions</a>\n      </div>';

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace anything between <div class="footer__bottom"> and the next </div>
  content = content.replace(/<div class="footer__bottom">[\s\S]*?<\/div>/g, newFooter);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${file}`);
});
