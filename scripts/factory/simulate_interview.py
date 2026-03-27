import redis
import json
import time
import sys

def simulate_requirement(text):
    client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    event = {
        "event": "REQUIREMENT_RECEIVED",
        "message": text,
        "timestamp": time.time()
    }
    client.publish("sensei:live:telemetry", json.dumps(event))
    print(f"🚀 [SIMULADOR] Requerimiento enviado al bus: {text}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        simulate_requirement(sys.argv[1])
    else:
        simulate_requirement("Necesitamos un bot de automatización de reembolsos para el Contact Center de Concentrix.")
