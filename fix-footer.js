const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
const enPath = path.join(publicDir, 'lang/en.json');
const arPath = path.join(publicDir, 'lang/ar.json');

const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

const footerAdditions = {
  "footer.desc": { en: "Premium luxury service center specializing in Mercedes and Range Rover, Sheikh Zayed - Cairo.", ar: "مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهرة." },
  "footer.links": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.services": { en: "Our Services", ar: "خدماتنا" },
  "footer.contact": { en: "Contact Us", ar: "تواصل معنا" }
};

for (const [k, v] of Object.entries(footerAdditions)) {
  enDict[k] = v.en;
  arDict[k] = v.ar;
}

fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2), 'utf8');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    '<p>مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهرة.</p>',
    '<p data-i18n="footer.desc">مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهرة.</p>'
  );

  content = content.replace(
    '<h4>روابط سريعة</h4>',
    '<h4 data-i18n="footer.links">روابط سريعة</h4>'
  );

  content = content.replace(
    '<h4>خدماتنا</h4>',
    '<h4 data-i18n="footer.services">خدماتنا</h4>'
  );

  content = content.replace(
    '<h4>تواصل معنا</h4>',
    '<h4 data-i18n="footer.contact">تواصل معنا</h4>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Global footers patched across all pages!');
