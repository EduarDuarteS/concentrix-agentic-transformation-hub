import redis
import json
import time
import sys

def trigger_meta_programming(requirement):
    client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    event = {
        "type": "META_GRAPH_REQUEST",
        "payload": {
            "text": requirement,
            "source": "Architect_Master_Control"
        },
        "timestamp": time.time()
    }
    client.publish("sensei:live:telemetry", json.dumps(event))
    print(f"🤖 [META-PROGRAMMING] Petición de generación de grafo enviada: {requirement}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        trigger_meta_programming(sys.argv[1])
    else:
        trigger_meta_programming("Necesito un flujo de agentes que maneje la escalación de quejas por redes sociales, integrando análisis de toxicidad y respuesta automática.")
