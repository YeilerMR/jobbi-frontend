const fs = require('fs');
const os = require('os');
const path = require('path');

const getLocalIpAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
};

const ip = getLocalIpAddress();
const envPath = path.resolve(process.cwd(), '.env');

let envContent = '';
if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

const newEnvContent = envContent
    .split('\n')
    .filter(line => !line.startsWith('API_URL'))
    .concat(`API_URL=http://${ip}:3000`)
    .join('\n');

fs.writeFileSync(envPath, newEnvContent);

console.log(`✅ .env actualizado con IP: ${ip}`);
