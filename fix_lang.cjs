const fs = require('fs');
const path = require('path');
const dir = 'src/pages/lesson';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (let file of files) {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');
  if (content.includes('This module is being built. Check back soon!')) {
    let newContent = content;
    if (!newContent.includes('useSettingsStore')) {
      newContent = newContent.replace('import { staggerChild } from', 'import { useSettingsStore } from "@/store/useSettingsStore"\nimport { staggerChild } from');
    }
    
    // Add language var
    newContent = newContent.replace(/export default function \w+\(\) \{/, match => match + '\n  const language = useSettingsStore(state => state.language)');
    
    // Replace text
    newContent = newContent.replace(/<p className='text-white\/40 text-sm max-w-md'>\s*([^<]+)\s*<\/p>/m, (match, text) => {
      let parts = text.trim().split(' — ');
      let bng = parts[0] || '';
      return `<p className='text-white/40 text-sm max-w-md'>\n              {language === 'bn' \n                ? '${bng} — এই মডিউলটি তৈরি করা হচ্ছে। শীঘ্রই আবার চেক করুন!'\n                : '${bng} — This module is being built. Check back soon!'}\n            </p>`;
    });
    newContent = newContent.replace(/<span>Content coming in Phase 3–6<\/span>/g, `<span>{language === 'bn' ? 'ফেজ ৩-৬ তে কন্টেন্ট আসছে' : 'Content coming in Phase 3–6'}</span>`);
    
    fs.writeFileSync(path.join(dir, file), newContent);
    console.log('Fixed', file);
  }
}
