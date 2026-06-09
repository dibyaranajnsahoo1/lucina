const fs = require('fs');
const path = require('path');
const p = 'C:/Users/dibya/.gemini/antigravity/brain/a63c4ad4-b7e8-4df3-99a7-3e58f1c8ad72/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(p, 'utf8').split('\n');

const restored = new Map();

for (const line of lines) {
  if (!line.includes('view_file')) continue;
  try {
    const entry = JSON.parse(line);
    if (!entry.output) continue;
    
    // Look for file path in output
    const match = entry.output.match(/File Path: `file:\/\/\/(.*?)`/);
    if (match) {
      let filePath = match[1];
      if (filePath.toLowerCase().includes('frontend')) {
        // extract file content
        const linesOutput = entry.output.split('\n');
        let contentLines = [];
        let capturing = false;
        for (const l of linesOutput) {
          if (l.match(/^\d+:\s/)) {
            contentLines.push(l.replace(/^\d+:\s/, ''));
          }
        }
        if (contentLines.length > 0) {
          restored.set(filePath, contentLines.join('\n'));
        }
      }
    }
  } catch (e) {}
}

let count = 0;
for (const [filePath, content] of restored.entries()) {
  const normalized = filePath.replace(/\\\\/g, '/');
  // only restore if file doesn't exist
  if (fs.existsSync(normalized)) continue;
  console.log('Restoring from view_file:', normalized);
  const dir = path.dirname(normalized);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(normalized, content);
  count++;
}
console.log('Total restored from view_file:', count);
