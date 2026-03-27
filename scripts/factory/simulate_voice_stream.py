import redis
import json
import time
import sys
import random

def simulate_webrtc_stream():
    client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    channel = "sensei:live:telemetry"
    
    scenarios = [
        "Cliente reporta caída de servicio en Genesys Cloud. Requiere re-enrutamiento prioritario.",
        "Solicitud de integración de Salesforce con Amazon Connect para sincronización de perfiles de clientes.",
        "Error en el IVR de pago automático. El cliente está frustrado por el cobro duplicado.",
        "Necesitamos habilitar autenticación biométrica de voz para el flujo de banca segura."
    ]
    
    print("🎙️ [WebRTC-SIM] Iniciando captura de audio en tiempo real...")
    
    for i in range(3):
        # 1. Simular ruido de fondo y buffering
        time.sleep(2)
        print(f"📡 Capturando segmento de audio {i+1}...")
        
        # 2. Publicar transcript
        transcript = random.choice(scenarios)
        event = {
            "type": "VOICE_TRANSCRIPT_RECEIVED",
            "payload": {
                "text": transcript,
                "source": "WebRTC_Gateway_Node"
            },
            "timestamp": time.time()
        }
        client.publish(channel, json.dumps(event))
        print(f"🔊 Transcript enviado: {transcript}")
        
        # 3. Simular latencia de orquestación
        time.sleep(5)

if __name__ == "__main__":
    simulate_webrtc_stream()
