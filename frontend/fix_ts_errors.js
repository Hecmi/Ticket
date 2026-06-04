const fs = require('fs');
let c = fs.readFileSync('src/app/core/services/ticket.service.spec.ts', 'utf8');
c = c.replace(/\}\)\);/g, '});');
fs.writeFileSync('src/app/core/services/ticket.service.spec.ts', c);
console.log('Fixed ticket service syntax');
