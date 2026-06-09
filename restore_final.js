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
      if (call.name === 'write_to_file' || call.name === 'replace_file_content') {
        const args = call.args || {};
        
        let target = args.TargetFile || args.AbsolutePath || args.Target;
        if (target) {
          // target might already be a string (correctly parsed from JSON)
          if (typeof target !== 'string') target = String(target);
          // if it still has outer quotes, strip them
          if (target.startsWith('"') && target.endsWith('"')) {
            target = JSON.parse(target);
          }
          
          if (typeof target === 'string' && target.toLowerCase().includes('frontend')) {
            let content = args.CodeContent || args.ReplacementContent;
            if (content !== undefined && content !== null) {
              // content might be a string already properly parsed from JSON (no extra quotes)
              // OR it might be a double-stringified value starting with \"
              if (typeof content !== 'string') content = String(content);
              
              // Check if it's double-encoded (starts with escaped quote)
              if (content.startsWith('"') && content.endsWith('"')) {
                try {
                  content = JSON.parse(content);
                } catch(e) {
                  // leave as is
                }
              }
              
              restored.set(target, content);
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore malformed lines
  }
}

let count = 0;
for (const [filePath, content] of restored.entries()) {
  const normalized = filePath.replace(/\\\\/g, '/');
  const dir = path.dirname(normalized);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(normalized, content, 'utf8');
  count++;
  console.log('Restored:', normalized);
}
console.log('\nTotal:', count, 'files restored');
