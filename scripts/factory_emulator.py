import redis
import json
import time
import os
import random

REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379")

print(f"\n📡 Conectando Sifu Factory Emulator a: {REDIS_URL}")
try:
    client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
    client.ping()
    print("✅ ZTA Auto-Heal: Conexión Upstash TLS exitosa.\n")
except Exception as e:
    print(f"❌ Error crítico de capa Redis: {e}")
    exit(1)

FACTORY_CHANNEL = "sensei:live:telemetry"

def emit_event(active_node, agent, message, status="INFO", extra_type="FACTORY_LOG"):
    event = {
        "type": extra_type,
        "agent": agent,
        "message": message,
        "status": status,
        "payload": {
            "activeNode": active_node
        }
    }
    client.publish(FACTORY_CHANNEL, json.dumps(event))
    print(f"🚀 Nodo: [{active_node}] | Agente: {agent} | MSG: {message}")
    time.sleep(random.uniform(1.2, 2.5))

print("Iniciando inyección de telemetría de Sifu Factory. (El Command Center SVG cobrará vida).\nPresiona Ctrl+C para detener.\n")

while True:
    emit_event("Idle", "System", "Awaiting incoming requirement...", "INFO")
    time.sleep(2)
    
    emit_event("Voice_Input", "AudioGateway", "Requisito de voz interceptado: 'Actualizar UI de Canvas'", "INFO")
    emit_event("Voice_Input", "AudioGateway", "Transcribiendo y verificando token JWT...", "SUCCESS")
    
    emit_event("LangGraph", "ArchitectAgent", "Analizando cadena de dependencias y creando plan.md", "INFO")
    emit_event("LangGraph", "LeadCoder", "Escribiendo lógica React Async & Suspense", "INFO")
    emit_event("LangGraph", "LeadCoder", "LiveCanvas.jsx", "SUCCESS", "CODE_GENERATED")
    
    emit_event("ZTA_Audit", "SecurityValidator", "Escaneando AST por vulnerabilidades", "INFO")
    emit_event("ZTA_Audit", "SecurityValidator", "Pruebas de Zero-Trust pasadas (0 Defectos)", "SUCCESS")
    
    emit_event("Artifact", "DeployBot", "Inyectando artefacto compilado en Master DOM", "SUCCESS")
    
    emit_event("Idle", "System", "Operación de meta-programación completada. Latencia: 240ms", "INFO")
    
    print("\n--- Ciclo de Factoría Finalizado. Reiniciando simulación en 5s ---\n")
    time.sleep(5)
