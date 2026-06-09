const fs = require('fs');
const p = 'C:/Users/dibya/.gemini/antigravity/brain/a63c4ad4-b7e8-4df3-99a7-3e58f1c8ad72/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(p, 'utf8').split('\n');

for (const line of lines) {
  if (line.includes('"step_index":117,')) {
     const entry = JSON.parse(line);
     const contentLines = entry.content.split('\n');
     let out = [];
     for (let l of contentLines) {
         if (l.match(/^\d+:\s/)) {
             out.push(l.replace(/^\d+:\s/, ''));
         }
     }
     fs.writeFileSync('d:/lucina-egg-bank/frontend/index.html', out.join('\n'));
     console.log('Restored index.html');
  }
}
