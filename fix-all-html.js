const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

const replacements = [
  // index.html Services List
  { regex: /<li([^>]*)>\s*تغيير الزيت\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.oil">تغيير الزيت</li>' },
  { regex: /<li([^>]*)>\s*استبدال الفلاتر\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.filter">استبدال الفلاتر</li>' },
  { regex: /<li([^>]*)>\s*فحص الفرامل\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.brakes">فحص الفرامل</li>' },
  
  { regex: /<li([^>]*)>\s*المسح الإلكتروني\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.scan">المسح الإلكتروني</li>' },
  { regex: /<li([^>]*)>\s*حل مشاكل الكهرباء\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.elec">حل مشاكل الكهرباء</li>' },
  
  { regex: /<li([^>]*)>\s*إصلاح المحرك\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.engine">إصلاح المحرك</li>' },
  { regex: /<li([^>]*)>\s*إصلاح ناقل الحركة\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.trans">إصلاح ناقل الحركة</li>' },
  
  { regex: /<li([^>]*)>\s*إزالة الخدوش\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.scratch">إزالة الخدوش</li>' },
  { regex: /<li([^>]*)>\s*دهان كامل\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.paint">دهان كامل</li>' },
  
  { regex: /<li([^>]*)>\s*تقرير شامل لحالة السيارة\s*<\/li>/g, rep: '<li$1 data-i18n="services.sub.report">تقرير شامل لحالة السيارة</li>' },

  // Footers
  { regex: /<p>\s*مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهرة\.\s*<\/p>/g, rep: '<p data-i18n="footer.desc">مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهرة.</p>' },
  { regex: /<h4([^>]*)>\s*روابط سريعة\s*<\/h4>/g, rep: '<h4$1 data-i18n="footer.links">روابط سريعة</h4>' },
  { regex: /<h4([^>]*)>\s*خدماتنا\s*<\/h4>/g, rep: '<h4$1 data-i18n="footer.services">خدماتنا</h4>' },
  { regex: /<h4([^>]*)>\s*تواصل معنا\s*<\/h4>/g, rep: '<h4$1 data-i18n="footer.contact">تواصل معنا</h4>' },
  { regex: /<a([^>]*)>\s*الصيانة الدورية\s*<\/a>/g, rep: '<a$1 data-i18n="services.maint">الصيانة الدورية</a>' },
  { regex: /<a([^>]*)>\s*التشخيص\s*<\/a>/g, rep: '<a$1 data-i18n="services.diag">التشخيص</a>' },
  { regex: /<a([^>]*)>\s*الميكانيكا\s*<\/a>/g, rep: '<a$1 data-i18n="services.mech">الميكانيكا</a>' },
  { regex: /<a([^>]*)>\s*الهيكل والدهان\s*<\/a>/g, rep: '<a$1 data-i18n="services.body">الهيكل والدهان</a>' }
];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix CSP Violation
  content = content.replace(/onerror="this\.style\.display='none'"/g, '');

  // Fix Translating Inner Content (to avoid duplicates, ensure no data-i18n is inside $1)
  replacements.forEach(r => {
    content = content.replace(r.regex, (match, p1) => {
      // If it already has data-i18n, do not replace
      if (p1 && p1.includes('data-i18n')) return match;
      if (match.includes('data-i18n')) return match;
      return r.rep.replace('$1', p1 || '');
    });
  });

  fs.writeFileSync(filePath, content, 'utf8');
});

console.log('Done fixing CSP and Translations.');
