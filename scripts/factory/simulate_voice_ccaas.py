import redis
import json
import time
import sys

def simulate_voice_req(text):
    client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    event = {
        "type": "VOICE_TRANSCRIPT_RECEIVED",
        "payload": {
            "text": text,
            "source": "AgenticVoiceGateway"
        },
        "timestamp": time.time()
    }
    client.publish("sensei:live:telemetry", json.dumps(event))
    print(f"🔊 [VOICE-SIM] Transcripción enviada a la factoría CCaaS: {text}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        simulate_voice_req(sys.argv[1])
    else:
        simulate_voice_req("Cliente molesto en Genesys Cloud. El IVR falló al procesar el reclamo de cobro duplicado. Necesitamos un agente virtual que maneje la escalación inmediata.")
