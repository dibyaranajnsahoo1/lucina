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
          if (target.startsWith('"')) target = JSON.parse(target);
          if (typeof target === 'string' && target.toLowerCase().includes('frontend')) {
            let content = args.CodeContent || args.ReplacementContent;
            if (content) {
              if (typeof content === 'string' && content.startsWith('"')) {
                 // It's a string literal containing quotes like "\"import React...\""
                 content = JSON.parse(content);
              }
              restored.set(target, content);
            }
          }
        }
      }
    }
  } catch (e) {}
}

for (const [filePath, content] of restored.entries()) {
  const normalized = filePath.replace(/\\\\/g, '/');
  fs.writeFileSync(normalized, content);
  console.log('Restored correctly:', normalized);
}
