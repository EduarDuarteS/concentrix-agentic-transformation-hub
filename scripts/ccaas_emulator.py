"""
Emulador CCaaS - Generador Estocástico de Telemetría (Test Payload)
Dependencias: pip install redis
"""

import redis
import json
import time
import random
import os

# 1. Conexión Ciega al Upstash Serverless de Concentrix
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
try:
    client = redis.Redis.from_url(REDIS_URL, decode_responses=True)
    # Ping de prueba
    client.ping()
except Exception as e:
    print(f"❌ Error crítico de capa Redis: {e}")
    exit(1)

# El Topic debe ser EXACTAMENTE el que Node.js (Gateway) escucha
SENSEI_CHANNEL = "sensei:live:telemetry"

# Typo corregido (ZTA)
SENTIMENTS = ["Positive", "Negative", "Frustrated", "Neutral"]
CALL_INTENTS = ["Billing Dispute", "Tech Support (No Sync)", "Cancel Service", "Plan Upgrade"]
SNIPPETS = [
    "I've been on hold for twenty minutes!", 
    "Oh, that actually fixed it, thank you.", 
    "No, I want to speak to a manager immediately.",
    "Could you repeat the IP address?"
]

def generate_telemetry():
    return {
        "timestamp": int(time.time() * 1000),
        "agent_id": f"sifu-agent-{random.randint(1, 4)}",
        "type": "ccaas_sentiment_stream",
        "payload": {
            "intent": random.choice(CALL_INTENTS),
            "sentiment": random.choice(SENTIMENTS),
            "confidence": round(random.uniform(0.65, 0.99), 2),
            "transcript_snippet": random.choice(SNIPPETS)
        }
    }

print(f"🚀 Iniciando CCaaS Engine. Apuntando a: {'Upstash (Secured)' if 'upstash' in REDIS_URL else REDIS_URL}")

try:
    while True:
        event = generate_telemetry()
        
        # 2. Publicación Inyección. Esto detona el WebSocket en el Gateway.
        client.publish(SENSEI_CHANNEL, json.dumps(event))
        print(f"📡 [Emitido] Agent: {event['agent_id']} | Intent: {event['payload']['intent']} | Sentiment: {event['payload']['sentiment']}")
        
        # 3. Flujo Aleatorio: Genera un evento realista cada 1 a 3 segundos
        time.sleep(random.uniform(1.0, 3.5))

except KeyboardInterrupt:
    print("\n🛑 Script Abortado por el Board de Arquitectura.")
