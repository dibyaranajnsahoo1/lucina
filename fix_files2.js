const fs = require('fs');

const filesToFix = [
  'd:/lucina-egg-bank/frontend/src/index.css',
  'd:/lucina-egg-bank/frontend/src/components/Navbar.jsx',
  'd:/lucina-egg-bank/frontend/src/components/Footer.jsx',
  'd:/lucina-egg-bank/frontend/src/components/FindDonorForm.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/Home.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/BecomeEggDonor.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/FindEggDonor.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/Blog.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/BlogPost.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/ContactUs.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/WhyLucina.jsx',
  'd:/lucina-egg-bank/frontend/src/pages/FinancialResources.jsx',
];

let fixed = 0;
for (const filePath of filesToFix) {
  if (!fs.existsSync(filePath)) {
    console.log('MISSING:', filePath);
    continue;
  }
  let raw = fs.readFileSync(filePath, 'utf8');
  if (raw.trimStart().startsWith('"')) {
    // Strip outer quotes
    raw = raw.trim();
    raw = raw.slice(1, -1); // remove first and last "
    // Unescape common escape sequences
    raw = raw
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
    fs.writeFileSync(filePath, raw, 'utf8');
    fixed++;
    console.log('Fixed:', filePath);
  } else {
    console.log('Already OK:', filePath);
  }
}
console.log('\nTotal fixed:', fixed);
