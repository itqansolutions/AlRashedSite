const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));
const enPath = path.join(publicDir, 'lang/en.json');
const arPath = path.join(publicDir, 'lang/ar.json');
const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// 1. Add definitions
const additions = {
  // services.html
  "services.s.oil": { en: "Engine Oil Change", ar: "تغيير زيت المحرك" },
  "services.s.air": { en: "Air Filter Replacement", ar: "استبدال فلتر الهواء" },
  "services.s.fuel": { en: "Fuel Filter Replacement", ar: "استبدال فلتر الوقود" },
  "services.s.fluid": { en: "Fluid Level Check", ar: "فحص مستوى السوائل" },
  "services.s.tires": { en: "Tire Pressure & Insp", ar: "فحص الإطارات والضغط" },
  "services.s.ecu": { en: "ECU Data Recovery", ar: "ECU استعادة البيانات من" },
  "services.s.abs": { en: "ABS & ESP Check", ar: "و ABS فحص نظام ESP" },
  "services.s.perf": { en: "Engine Performance Analysis", ar: "تحليل أداء المحرك" },
  "services.s.susp": { en: "Suspension Maintenance", ar: "صيانة نظام التعليق" },
  "services.s.steer": { en: "Steering Repair", ar: "إصلاح نظام التوجيه" },
  "services.s.parts": { en: "Spare Parts Replacement", ar: "استبدال قطع الغيار" },
  "services.s.brakes": { en: "Brake Maintenance", ar: "صيانة الفرامل" },

  // about.html
  "about.hero.t": { en: "Al-Rashed Luxury Car Center", ar: "مركز الراشد للسيارات الفاخرة" },
  "about.v.m": { en: "Our Vision & Mission", ar: "رؤيتنا ومهمتنا" },
  "about.v.t": { en: "To become the most trusted", ar: "أن نكون الأكثر ثقة" },
  "about.m.t": { en: "Quality and Reliability", ar: "الجودة والموثوقية" },
  "about.founded.lbl": { en: "Center Founded", ar: "تأسس المركز" },
  "about.txt1": { en: "Al-Rashed Center was established in 2021 to be the specialized destination for luxury car owners in Egypt. We offer maintenance, diagnostics, and repairs for Mercedes-Benz and Range Rover vehicles to the highest quality standards.", ar: "تأسس مركز الراشد عام 2021 ليكون وجهة متخصصة لأصحاب السيارات الفاخرة في مصر. نقدم خدمات الصيانة والتشخيص والإصلاح لسيارات مرسيدس بنز ورينج روفر بأعلى معايير الجودة." },
  "about.txt2": { en: "The center includes a team of certified technicians who have undergone intensive training on the latest technologies, with the use of 100% genuine spare parts to ensure the best performance and safety for your car.", ar: "يضم المركز فريقاً من الفنيين المعتمدين الذين خضعوا لتدريب مكثف على أحدث التقنيات، مع استخدام قطع غيار أصلية 100% لضمان أفضل أداء وأمان لسيارتك." },

  // Footer & buttons
  "brands.book_today": { en: "Book your service today", ar: "احجز موعد خدمتك اليوم" },
  "footer.loose_desc": { en: "Premium luxury center specialized in Mercedes and Range Rover, Sheikh Zayed - Cairo", ar: "مركز خدمة سيارات فاخر متخصص في مرسيدس ورينج روفر، الشيخ زايد – القاهره" },
  "footer.loose_desc2": { en: "Premium luxury center specialized in Mercedes and Range Rover, Sheikh Zayed - Cairo.", ar: "مركز خدمة سيارات فاخر متخصص في.مرسيدس ورينج روفر، الشيخ زايد – القاهرة." }
};

for (const [k, v] of Object.entries(additions)) {
  enDict[k] = v.en;
  arDict[k] = v.ar;
}

fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2), 'utf8');

// 2. Search and replace
const replacements = [
  { match: /تغيير زيت المحرك/g, key: 'services.s.oil' },
  { match: /استبدال فلتر الهواء/g, key: 'services.s.air' },
  { match: /استبدال فلتر الوقود/g, key: 'services.s.fuel' },
  { match: /فحص مستوى السوائل/g, key: 'services.s.fluid' },
  { match: /فحص الإطارات والضغط/g, key: 'services.s.tires' },
  { match: /ECU\s*استعادة البيانات من/g, key: 'services.s.ecu' },
  { match: /استعادة البيانات من ECU/g, key: 'services.s.ecu' },
  { match: /(تشخيص مشاكل الكهرباء)/g, key: 'services.sub.elec' },
  { match: /فحص نظام ABS و ESP/g, key: 'services.s.abs' },
  { match: /و ABS فحص نظام ESP/g, key: 'services.s.abs' },
  { match: /تحليل أداء المحرك/g, key: 'services.s.perf' },
  { match: /صيانة نظام التعليق/g, key: 'services.s.susp' },
  { match: /إصلاح نظام التوجيه/g, key: 'services.s.steer' },
  { match: /استبدال قطع الغيار/g, key: 'services.s.parts' },

  { match: /مركز الراشد للسيارات الفاخرة/g, key: 'about.hero.t' },
  { match: /رؤيتنا ومهمتنا/g, key: 'about.v.m' },
  { match: /أن نكون الأكثر ثقة/g, key: 'about.v.t' },
  { match: /الجودة والموثوقية/g, key: 'about.m.t' },
  { match: /تأسس المركز/g, key: 'about.founded.lbl' },
  { match: /تأسس مركز الراشد عام 2021 ليكون وجهة متخصصة لأصحاب السيارات الفاخرة في مصر\. نقدم خدمات الصيانة والتشخيص والإصلاح لسيارات مرسيدس بنز ورينج روفر بأعلى معايير الجودة\./g, key: 'about.txt1' },
  { match: /يضم المركز فريقاً من الفنيين المعتمدين الذين خضعوا لتدريب مكثف على أحدث التقنيات، مع استخدام قطع غيار أصلية 100% لضمان أفضل أداء وأمان لسيارتك\./g, key: 'about.txt2' },
  
  { match: /احجز موعد خدمتك اليوم/g, key: 'brands.book_today' },

  // Footer loose bounds
  { match: /مركز خدمة سيارات فاخر متخصص في \n*.*مرسيدس ورينج روفر، الشيخ زايد – القاهره/g, key: 'footer.loose_desc' },
  { match: /مركز خدمة سيارات فاخر متخصص في\s*مرسيدس ورينج روفر، الشيخ زايد – القاهره/g, key: 'footer.loose_desc' }
];

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We find text matching and inject into its parent tag, or just wrap it in a <span data-i18n="..">
  replacements.forEach(r => {
    // Basic wrapper
    content = content.replace(r.match, (match) => {
      return `<span data-i18n="${r.key}">${match}</span>`;
    });
  });

  // Since we might wrap things twice if we run multiple times, let's clean up nested spans if any
  content = content.replace(/<span data-i18n="[^"]+"><span data-i18n="([^"]+)">([^<]+)<\/span><\/span>/g, '<span data-i18n="$1">$2</span>');

  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Fixed services strings and footer spelling bugs');
