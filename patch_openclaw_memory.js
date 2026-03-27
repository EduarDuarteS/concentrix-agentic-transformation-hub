const fs = require('fs');
const path = '/app/dist/sessions-uRDRs4f-.js';

console.log("📐 Sifu: Iniciando protocolo de sanitización de memoria en OpenClaw...");

if (!fs.existsSync(path)) {
    console.error("❌ Sifu Error: Archivo de sesiones no encontrado.");
    process.exit(1);
}

let code = fs.readFileSync(path, 'utf8');

// Verificamos si ya estamos parcheados
if (code.includes('delete msg.thought_signature')) {
    console.log("✅ Sifu: El sistema ya estaba sanitizado. No se requiere acción.");
    process.exit(0);
}

// Interceptamos la resolución de mensajes
const targetCode = `const pushCandidate = (resolve) => {`;
const patchCode = `const pushCandidate = (resolve) => {
    // SIFU PATCH: Sanitizar thought_signature de Vertex AI
    if (resolve && resolve.message) {
        let msg = resolve.message;
        if (msg.thought_signature) delete msg.thought_signature;
        if (msg.content && Array.isArray(msg.content)) {
             msg.content.forEach(p => { if (p.thought_signature) delete p.thought_signature; });
        }
    }
`;

if (code.includes(targetCode)) {
    code = code.replace(targetCode, patchCode);
    fs.writeFileSync(path, code, 'utf8');
    console.log("✅ ¡Memoria reparada exitosamente! OpenClaw ya no persistirá el 'thought_signature'.");
    console.log("🔄 Por favor, reinicia el contenedor (docker restart openclaw-gateway) para aplicar.");
} else {
    console.error("❌ Sifu Error: No se pudo encontrar el punto de inyección en el código compilado.");
    process.exit(1);
}
