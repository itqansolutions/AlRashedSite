const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const results = [];
let mapsFound = [];

files.forEach(f => {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  const lines = code.split('\n');
  lines.forEach((line, i) => {
    if (line.match(/href="https?:\/\/[a-zA-Z0-9.\/]*map[s]?[a-zA-Z0-9.\/=?]*"/i)) {
      mapsFound.push({ file: f, line: i + 1, text: line.trim() });
    }
    if (line.match(/href="https?:\/\/goo\.gl[a-zA-Z0-9.\/=?]*"/i)) {
      mapsFound.push({ file: f, line: i + 1, text: line.trim() });
    }
    
    // Arabic that is NOT already inside data-i18n
    if (line.match(/[\u0600-\u06FF]+/) && !line.includes('data-i18n') && !line.includes('lang="ar"')) {
      const tagsMatched = line.match(/>([^<]*[\u0600-\u06FF]+[^<]*)<\//);
      if (tagsMatched) {
        results.push({ file: f, text: tagsMatched[1].trim() });
      } else if (line.match(/placeholder="([^"]*[\u0600-\u06FF]+[^"]*)"/)) {
        results.push({ file: f, text: line.match(/placeholder="([^"]*[\u0600-\u06FF]+[^"]*)"/)[1] });
      }
    }
  });
});

fs.writeFileSync('ar_remnants.json', JSON.stringify({ mapsFound, results }, null, 2));
console.log('Done scanning.');
