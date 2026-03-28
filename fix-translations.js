const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const indexPath = path.join(publicDir, 'index.html');
const enPath = path.join(publicDir, 'lang/en.json');
const arPath = path.join(publicDir, 'lang/ar.json');

// 1. Read files
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const enDict = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arDict = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// 2. Define our payload
const additions = {
  "hero.title.em": { en: "for Luxury Vehicles", ar: "للسيارات الفاخرة" },
  "services.sub.oil": { en: "Oil Change", ar: "تغيير الزيت" },
  "services.sub.filter": { en: "Filter Replacement", ar: "استبدال الفلاتر" },
  "services.sub.brakes": { en: "Brake Inspection", ar: "فحص الفرامل" },
  "services.sub.scan": { en: "Electronic Scan", ar: "المسح الإلكتروني" },
  "services.sub.elec": { en: "Electrical Fixes", ar: "حل مشاكل الكهرباء" },
  "services.sub.engine": { en: "Engine Repair", ar: "إصلاح المحرك" },
  "services.sub.trans": { en: "Transmission Repair", ar: "إصلاح ناقل الحركة" },
  "services.sub.scratch": { en: "Scratch Removal", ar: "إزالة الخدوش" },
  "services.sub.paint": { en: "Full Body Paint", ar: "دهان كامل" },
  "services.sub.report": { en: "Comprehensive Vehicle Report", ar: "تقرير شامل لحالة السيارة" },
  "services.all": { en: "All Services", ar: "كل الخدمات" },
  
  "reviews.1.text": { en: "\"Excellent and fast service, clean workshop, very professional technicians.\"", ar: "\"خدمة ممتازة وسريعة، ورشة نظيفة ومنظمة، والفنيين محترفين جداً.\"" },
  "reviews.1.name": { en: "Ahmed Gomaa", ar: "أحمد محمد" },
  "reviews.2.text": { en: "\"The best luxury car maintenance center in Egypt – highly recommended.\"", ar: "\"أفضل مركز صيانة لسيارات الفخامة في مصر – أنصح به بشدة.\"" },
  "reviews.2.name": { en: "Sarah Ahmed", ar: "سارة أحمد" },
  "reviews.3.text": { en: "\"Received my car right on time and in perfect condition.\"", ar: "\"استلمت سيارتي في الوقت المحدد وبجودة عالية جداً.\"" },
  "reviews.3.name": { en: "Khaled Omar", ar: "خالد عمر" }
};

// 3. Inject new keys into dictionary
for (const [k, v] of Object.entries(additions)) {
  enDict[k] = v.en;
  arDict[k] = v.ar;
}

// Write dictionaries
fs.writeFileSync(enPath, JSON.stringify(enDict, null, 2), 'utf8');
fs.writeFileSync(arPath, JSON.stringify(arDict, null, 2), 'utf8');

// 4. Update index.html
// Services
indexHtml = indexHtml.replace('<li>تغيير الزيت</li>', '<li data-i18n="services.sub.oil">تغيير الزيت</li>');
indexHtml = indexHtml.replace('<li>استبدال الفلاتر</li>', '<li data-i18n="services.sub.filter">استبدال الفلاتر</li>');
indexHtml = indexHtml.replace('<li>فحص الفرامل</li>', '<li data-i18n="services.sub.brakes">فحص الفرامل</li>');

indexHtml = indexHtml.replace('<li>المسح الإلكتروني</li>', '<li data-i18n="services.sub.scan">المسح الإلكتروني</li>');
indexHtml = indexHtml.replace('<li>حل مشاكل الكهرباء</li>', '<li data-i18n="services.sub.elec">حل مشاكل الكهرباء</li>');

indexHtml = indexHtml.replace('<li>إصلاح المحرك</li>', '<li data-i18n="services.sub.engine">إصلاح المحرك</li>');
indexHtml = indexHtml.replace('<li>إصلاح ناقل الحركة</li>', '<li data-i18n="services.sub.trans">إصلاح ناقل الحركة</li>');

indexHtml = indexHtml.replace('<li>إزالة الخدوش</li>', '<li data-i18n="services.sub.scratch">إزالة الخدوش</li>');
indexHtml = indexHtml.replace('<li>دهان كامل</li>', '<li data-i18n="services.sub.paint">دهان كامل</li>');

indexHtml = indexHtml.replace('<li>تقرير شامل لحالة السيارة</li>', '<li data-i18n="services.sub.report">تقرير شامل لحالة السيارة</li>');

// "All Services" View
indexHtml = indexHtml.replace('<p data-i18n="services.title" style="color:var(--gold); max-width:unset;">كل الخدمات</p>', '<p data-i18n="services.all" style="color:var(--gold); max-width:unset;">كل الخدمات</p>');

// Testimonials
indexHtml = indexHtml.replace('<p class="testimonial-card__text">"خدمة ممتازة وسريعة، ورشة نظيفة ومنظمة، والفنيين محترفين جداً."</p>\n          <span class="testimonial-card__author">أحمد محمد</span>', '<p class="testimonial-card__text" data-i18n="reviews.1.text">"خدمة ممتازة وسريعة، ورشة نظيفة ومنظمة، والفنيين محترفين جداً."</p>\n          <span class="testimonial-card__author" data-i18n="reviews.1.name">أحمد محمد</span>');
indexHtml = indexHtml.replace('<p class="testimonial-card__text">"أفضل مركز صيانة لسيارات الفخامة في مصر – أنصح به بشدة."</p>\n          <span class="testimonial-card__author">سارة أحمد</span>', '<p class="testimonial-card__text" data-i18n="reviews.2.text">"أفضل مركز صيانة لسيارات الفخامة في مصر – أنصح به بشدة."</p>\n          <span class="testimonial-card__author" data-i18n="reviews.2.name">سارة أحمد</span>');
indexHtml = indexHtml.replace('<p class="testimonial-card__text">"استلمت سيارتي في الوقت المحدد وبجودة عالية جداً."</p>\n          <span class="testimonial-card__author">خالد عمر</span>', '<p class="testimonial-card__text" data-i18n="reviews.3.text">"استلمت سيارتي في الوقت المحدد وبجودة عالية جداً."</p>\n          <span class="testimonial-card__author" data-i18n="reviews.3.name">خالد عمر</span>');

// Contact Strip
indexHtml = indexHtml.replace('<strong>تحدث معنا</strong>', '<strong data-i18n="whatsapp.text">تحدث معنا</strong>');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('index.html fully patched with data-i18n keys!');
