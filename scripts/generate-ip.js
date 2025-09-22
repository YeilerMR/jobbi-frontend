// scripts/generate-env.js
const fs = require('fs');
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}

const ip = getLocalIP();
const envPath = '.env';

if (!fs.existsSync(envPath)) {
  const content = `API_URL=http://${ip}:3000\n`;
  fs.writeFileSync(envPath, content);
  console.log(`✅ Archivo .env creado con tu IP: http://${ip}:3000`);
} else {
  console.log('✅ .env ya existe, no se modificó.');
}