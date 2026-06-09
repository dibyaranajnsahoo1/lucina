const fs = require('fs');
const path = require('path');
const p = 'C:/Users/dibya/.gemini/antigravity/brain/a63c4ad4-b7e8-4df3-99a7-3e58f1c8ad72/.system_generated/logs/transcript.jsonl';
const lines = fs.readFileSync(p, 'utf8').split('\n');

const restored = new Map();

for (const line of lines) {
  if (!line.includes('write_to_file') && !line.includes('replace_file_content')) continue;
  try {
    const entry = JSON.parse(line);
    if (!entry.tool_calls) continue;
    for (const call of entry.tool_calls) {
      if (call.name === 'write_to_file' || call.name === 'replace_file_content' || call.name === 'multi_replace_file_content') {
        const args = call.args || {};
        
        let target = args.TargetFile || args.AbsolutePath || args.Target;
        
        if (target) {
          if (target.startsWith('"') && target.endsWith('"')) {
            target = target.slice(1, -1);
          }
          if (typeof target === 'string' && target.toLowerCase().includes('frontend')) {
            let content = args.CodeContent || args.ReplacementContent;
            if (content) {
              if (content.startsWith('"') && content.endsWith('"')) {
                try {
                  content = JSON.parse(content);
                } catch(e) {
                  content = content.slice(1, -1).replace(/\\n/g, '\n').replace(/\\"/g, '"');
                }
              }
              // Skip multi_replace since it's partial updates
              if (call.name === 'multi_replace_file_content') continue;

              restored.set(target, content);
            }
          }
        }
      }
    }
  } catch (e) {}
}

let count = 0;
for (const [filePath, content] of restored.entries()) {
  const normalized = filePath.replace(/\\\\/g, '/');
  console.log('Restoring:', normalized);
  const dir = path.dirname(normalized);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(normalized, content);
  count++;
}
console.log('Total restored files:', count);
