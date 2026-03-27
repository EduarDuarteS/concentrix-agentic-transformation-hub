const fs = require('fs');
const file = '/app/dist/sessions-uRDRs4f-.js';
let code = fs.readFileSync(file, 'utf8');

// Buscamos donde OpenClaw guarda el mensaje para inyectar la sanitización
if (!code.includes('delete msg.thought_signature;')) {
    code = code.replace(/const pushCandidate = \(resolve\) => \{/, 
        `const pushCandidate = (resolve) => {
            if (msg && msg.thought_signature) delete msg.thought_signature;
            if (msg && msg.parts) {
                msg.parts.forEach(p => { if (p.thought_signature) delete p.thought_signature; });
            }
        `);
    // Need to find the correct insertion point
}
