const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const enPath = path.join(publicDir, 'lang/en.json');
const arPath = path.join(publicDir, 'lang/ar.json');
const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

const mappings = [
  // branches.html
  { file: 'branches.html', ar: 'الفرع الرئيسي - الشيخ زايد', en: 'Main Branch - Sheikh Zayed', key: 'branches.main' },
  { file: 'branches.html', ar: 'احصل على الاتجاهات', en: 'Get Directions', key: 'branches.directions' },
  { file: 'branches.html', ar: 'نحن متواجدون دائمًا لخدمتك', en: 'We are always here to serve you', key: 'branches.subtitle' },
  { file: 'branches.html', ar: 'بوابة 9، بيفرلي هيلز، الشيخ زايد', en: 'Gate 9, Beverly Hills, Sheikh Zayed', key: 'branches.addr_full' },
  { file: 'branches.html', ar: 'السبت إلى الخميس', en: 'Saturday to Thursday', key: 'branches.days' },
  
  // brands.html
  { file: 'brands.html', ar: 'موديلات المرسيدس المدعومة', en: 'Supported Mercedes Models', key: 'brands.merc_models' },
  { file: 'brands.html', ar: 'موديلات رينج روفر المدعومة', en: 'Supported Range Rover Models', key: 'brands.rr_models' },
  { file: 'brands.html', ar: 'وغيرها...', en: 'And more...', key: 'brands.more' },
  { file: 'brands.html', ar: 'ابدأ الآن', en: 'Start Now', key: 'brands.start' },
  { file: 'brands.html', ar: 'احجز موعد صيانة سيارتك', en: 'Book your maintenance appointment', key: 'brands.cta_book' },

  // about.html
  { file: 'about.html', ar: 'اكتشف من نحن وما يميزنا', en: 'Discover who we are and what makes us unique', key: 'about.subtitle' },
  { file: 'about.html', ar: 'تأسس مركز الراشد في قلب الشيخ زايد ليكون الوجهة الأولى...', en: 'Al-Rashed Center was established in the heart of Sheikh Zayed to be the premier destination...', key: 'about.p1' },
  { file: 'about.html', ar: 'الشهادات والاعتمادات', en: 'Certifications', key: 'about.certs' },
  { file: 'about.html', ar: 'فريق الإدارة', en: 'Management Team', key: 'about.team' },

  // services.html
  { file: 'services.html', ar: 'نقدم لك جميع الخيارات', en: 'We offer you all options', key: 'services.subtitle' },
  { file: 'services.html', ar: 'تغيير الزيت', en: 'Oil Change', key: 'services.sub.oil' },
  { file: 'services.html', ar: 'استبدال الفلاتر', en: 'Filter Replacement', key: 'services.sub.filter' },
  { file: 'services.html', ar: 'فحص الفرامل', en: 'Brake Inspection', key: 'services.sub.brakes' },
  { file: 'services.html', ar: 'المسح الإلكتروني', en: 'Electronic Scan', key: 'services.sub.scan' },
  { file: 'services.html', ar: 'حل مشاكل الكهرباء', en: 'Electrical Fixes', key: 'services.sub.elec' },
  { file: 'services.html', ar: 'إصلاح المحرك', en: 'Engine Repair', key: 'services.sub.engine' },
  { file: 'services.html', ar: 'إصلاح ناقل الحركة', en: 'Transmission Repair', key: 'services.sub.trans' },
  { file: 'services.html', ar: 'إزالة الخدوش', en: 'Scratch Removal', key: 'services.sub.scratch' },
  { file: 'services.html', ar: 'دهان كامل', en: 'Full Body Paint', key: 'services.sub.paint' },
  { file: 'services.html', ar: 'تقرير شامل لحالة السيارة', en: 'Comprehensive Vehicle Report', key: 'services.sub.report' },

  // booking.html
  { file: 'booking.html', ar: 'خطوة بخطوة', en: 'Step by Step', key: 'booking.subtitle' }
];

mappings.forEach(m => {
  enDict[m.key] = m.en;
  arDict[m.key] = m.ar;
  
  const filePath = path.join(publicDir, m.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace exact text with <tag data-i18n="key">text</tag> where tag is usually part of the match, 
    // or we just inject data-i18n="key" into the parent element. 
    // Since we don't have DOM parsing, we do:
    // replace `>Text<` with ` data-i18n="key">Text<`
    // Need to strictly replace the exact text.
    // Easiest is to replace `>${m.ar}<` with ` data-i18n="${m.key}">${m.ar}<`
    // OR if it's not wrapped in a tight tag, just wrap it in a span: `<span data-i18n="key">text</span>`
    // We will do string replace.
    const regex1 = new RegExp(`>\\s*${m.ar}\\s*<`, 'g');
    if (regex1.test(content)) {
      content = content.replace(regex1, ` data-i18n="${m.key}">${m.ar}<`);
    } else {
      // fallback: replace bare text
      content = content.replace(m.ar, `<span data-i18n="${m.key}">${m.ar}</span>`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
  }
});

fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2), 'utf8');

console.log('Inner pages translation patching complete!');
