const fs = require('fs');
const path = require('path');

const filesToFix = [
  'd:/lucina-egg-bank/frontend/src/index.css',
  'd:/lucina-egg-bank/frontend/src/App.jsx',
  'd:/lucina-egg-bank/frontend/src/main.jsx',
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
  const raw = fs.readFileSync(filePath, 'utf8');
  // If file starts with a quote, it's JSON-encoded — decode it
  if (raw.trimStart().startsWith('"')) {
    try {
      const decoded = JSON.parse(raw.trim());
      fs.writeFileSync(filePath, decoded, 'utf8');
      fixed++;
      console.log('Fixed:', filePath);
    } catch(e) {
      console.log('ERROR decoding:', filePath, e.message);
    }
  } else {
    console.log('OK (already proper):', filePath);
  }
}
console.log('\nTotal fixed:', fixed);
