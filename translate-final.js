const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const enPath = path.join(publicDir, 'lang/en.json');
const arPath = path.join(publicDir, 'lang/ar.json');
const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

const translations = {
  "من نحن | الراشد لصيانة السيارات": "About Us | Al-Rashed",
  "قصتنا": "Our Story",
  "يضم المركز فريقًا من الفنيين المعتمدين الذين خضعوا لتدريب مكثف على أحدث التقنيات، مع استخدام قطع غيار أصلية 100% لضمان أفضل أداء وأمان لسيارتك.": "The center includes a team of certified technicians trained on the latest technologies, exclusively using 100% genuine parts to ensure peak performance and safety.",
  "قيمنا": "Our Values",
  "ابدأ الآن": "Start Now",
  "📍 الشيخ زايد": "📍 Sheikh Zayed",
  "🔍 تتبع حجزك": "🔍 Track Booking",
  "تتبع الحجز | الراشد لصيانة السيارات": "Track Booking | Al-Rashed",
  "أدخل رقم الهاتف للبحث": "Enter phone number to search",
  "ابحث برقم الهاتف الذي سجلت به الحجز لمتابعة حالة الموعد.": "Search using your registered phone number to track your appointment status.",
  "رقم الهاتف...": "Phone Number...",
  "السيارة:": "Vehicle:",
  "الخدمة:": "Service:",
  "تاريخ الطلب:": "Order Date:",
  "احجز موعدك | الراشد لصيانة السيارات": "Book Appointment | Al-Rashed",
  "مثال: أحمد محمد": "e.g., Ahmed Mohamed",
  "اختر العلامة التجارية": "Select Brand",
  "اختر الموديل": "Select Model",
  "اختر السنة": "Select Year",
  "اختر الخدمة": "Select Service",
  "السابق": "Previous",
  "التالي": "Next",
  "تم الاستلام بنجاح": "Received Successfully",
  "لقد تلقينا طلب حجزك. سيقوم أحد ممثلي خدمة العملاء بالتواصل معك قريباً لتأكيد الموعد.": "We have received your booking request. A customer service representative will contact you shortly to confirm the appointment.",
  "فروعنا | الراشد لصيانة السيارات": "Our Branches | Al-Rashed",
  "الفرع الرئيسي": "Main Branch",
  "الجيزة، مصر": "Giza, Egypt",
  "الجمعة: مغلق": "Friday: Closed",
  "العلامات التجارية | الراشد لصيانة السيارات": "Brands | Al-Rashed",
  "تواصل معنا | الراشد لصيانة السيارات": "Contact Us | Al-Rashed",
  "معرض الصور | الراشد لصيانة السيارات": "Gallery | Al-Rashed",
  "الكل": "All",
  "الورشة": "Workshop",
  "قبل وبعد": "Before & After",
  "المعدات": "Equipment",
  "الراشد لصيانة السيارات | أخصائيو مرسيدس ورينج روفر – القاهرة": "Al-Rashed Luxury Center | Mercedes & Range Rover Specialists",
  "خدماتنا | الراشد لصيانة السيارات": "Services | Al-Rashed",
  "فحص نظام ABS وESP": "ABS & ESP System Check",
  "إصلاح وصيانة المحرك": "Engine Repair & Maintenance",
  "إصلاح هيكل السيارة": "Body Repair",
  "دهان جزئي وكامل": "Partial & Full Paint",
  "حماية الطلاء بالسيراميك": "Ceramic Coating",
  "تلميع متكامل": "Full Polish",
  "فحص 200 نقطة": "200-Point Inspection",
  "الكشف عن الحوادث": "Accident Detection",
  "فحص الفريم والهيكل": "Frame & Chassis Check",
  "تقييم القيمة السوقية": "Market Value Assessment",
  "احجز خدمتك الآن": "Book Your Service Now",
  "موعد سريع وخدمة احترافية": "Fast Appointment & Pro Service",
  "استجابة سريعة": "Quick Response",
  "من نحن": "About Us",
  "العلامات": "Brands"
};

let i = 0;
// Sort keys by length descending to replace longer strings first to avoid partial matches
const sortedArKeys = Object.keys(translations).sort((a,b) => b.length - a.length);

const htmlFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix maps logic
  content = content.replace(/href="https:\/\/maps\.app\.goo\.gl\/"/g, 'href="https://maps.app.goo.gl/N2EaUySs5ZnMBoAq7"');
  // Also fix footer addresses and convert text to links
  content = content.replace(/<li>📍 الشيخ زايد<\/li>/g, '<li><a href="https://maps.app.goo.gl/N2EaUySs5ZnMBoAq7" target="_blank" style="color:var(--text);text-decoration:none;"><span data-i18n="auto_footer_zayed">📍 الشيخ زايد</span></a></li>');

  sortedArKeys.forEach(arStr => {
    const enStr = translations[arStr];
    const key = `auto_${i++}`;
    
    // Save to dicts
    if (!Object.values(arDict).includes(arStr)) {
      enDict[key] = enStr;
      arDict[key] = arStr;
    }

    // Attempt to inject data-i18n attribute directly into elements containing exactly this text, avoiding title/meta tags, but we also want Titles translated
    // Let's just do a safe replacement of the string with <span data-i18n="key">string</span>
    // UNLESS it's inside <title> or <option> or placeholder
    
    if (arStr === 'رقم الهاتف...') {
      content = content.replace(/placeholder="رقم الهاتف\.\.\."/g, `placeholder="رقم الهاتف..." data-i18n-placeholder="${key}"`);
    } else if (arStr === 'مثال: أحمد محمد') {
      content = content.replace(/placeholder="مثال: أحمد محمد"/g, `placeholder="مثال: أحمد محمد" data-i18n-placeholder="${key}"`);
    } else {
      // General replacing. We use a regex to find exactly >arStr< to inject data-i18n inside the tag
      // Or if it's floating text, span it
      const regexExactTag = new RegExp(`>\\s*${arStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`, 'g');
      content = content.replace(regexExactTag, (match) => {
        // if the tag before it is <title> or <option>, we shouldn't span it, just inject data-i18n to parent!
        return ` data-i18n="${key}">${arStr}<`;
      });

      // For anything that didn't match perfectly, span it if it's not a tag
      // Actually, injecting data-i18n="key"> is enough for >string<
      // Wait, ` data-i18n="${key}">${arStr}<` transforms `<title>foo<` to `<title data-i18n="key">foo<` Which is exactly what we want! (We just matched `>foo<` and replaced with ` data-i18n="key">foo<` -> `<title data-i18n="key">foo<`)
      
      // Let's refine the regex replacement string to not destroy the opening `>`
      const regexSafe = new RegExp(`>([\\s]*)${arStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([\\s]*)<`, 'g');
      content = content.replace(regexSafe, (match, p1, p2) => {
        // check if parent already has data-i18n (naive check: count quotes or just ignore for now)
        return ` data-i18n="${key}">${p1}${arStr}${p2}<`;
      });
    }
  });

  // Clean up any double data-i18n which is invalid HTML
  content = content.replace(/\sdata-i18n="[^"]+"\sdata-i18n="([^"]+)"/g, ' data-i18n="$1"');

  fs.writeFileSync(filePath, content, 'utf8');
});

// Since the `data-i18n` logic in main.js needs to handle `data-i18n-placeholder`, let's check `main.js` and add it if missing
const mainJsPath = path.join(publicDir, 'js/main.js');
let mainJs = fs.readFileSync(mainJsPath, 'utf8');
if (!mainJs.includes('data-i18n-placeholder')) {
  mainJs = mainJs.replace(/elements\.forEach\(el => {/g, `
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const keys = key.split('.');
      let text = translations;
      keys.forEach(k => text = text && text[k] ? text[k] : null);
      if (text) el.setAttribute('placeholder', text);
    });
    elements.forEach(el => {`);
  fs.writeFileSync(mainJsPath, mainJs, 'utf8');
}

// Special edge cases or leftover
enDict["auto_footer_zayed"] = "📍 Sheikh Zayed";
arDict["auto_footer_zayed"] = "📍 الشيخ زايد";

fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2), 'utf8');
console.log('Final translation applied!');
