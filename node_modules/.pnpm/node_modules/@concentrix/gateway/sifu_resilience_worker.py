# [SIFU_EDA_MONITOR] - Self-Healing & Event Observability Worker
import redis
import json
import time
import os
import logging
from datetime import datetime

# Configuración de logs para Auditoría Senior
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-AUDITOR] - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class SifuResilienceEngine:
    def __init__(self):
        self.redis_client = redis.Redis(
            host=os.getenv('REDIS_HOST', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379)),
            db=0,
            decode_responses=True
        )
        self.telemetry_channel = "sensei:live:telemetry"
        self.factory_logs_path = "/home/node/.openclaw/workspace/apps/web/src/data/factory/factory_logs.json"
        self.kill_switch_limit = 3
        self.error_counts = {}

    def log_to_factory(self, event_type, message, status="INFO"):
        """Persiste logs en el carril /factory para visibilidad en la UI"""
        try:
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "agent": "Sifu_Resilience_Engine",
                "event": event_type,
                "message": message,
                "status": status
            }
            
            logs = []
            if os.path.exists(self.factory_logs_path):
                with open(self.factory_logs_path, 'r') as f:
                    logs = json.load(f)
            
            logs.append(log_entry)
            # Mantener solo los últimos 50 logs para performance
            logs = logs[-50:]
            
            with open(self.factory_logs_path, 'w') as f:
                json.dump(logs, f, indent=2)
        except Exception as e:
            logger.error(f"Error escribiendo en factory_logs: {e}")

    def self_heal_event(self, event_data):
        """Lógica de Auto-Sanación para eventos malformados o fallidos"""
        event_id = event_data.get('id', 'unknown')
        error_msg = event_data.get('error', 'Generic failure')
        
        self.error_counts[event_id] = self.error_counts.get(event_id, 0) + 1
        
        if self.error_counts[event_id] <= self.kill_switch_limit:
            logger.info(f"🛠️ Intentando Self-Healing para evento {event_id} (Intento {self.error_counts[event_id]})")
            self.log_to_factory("SELF_HEALING", f"Re-enrutando evento {event_id} tras fallo: {error_msg}", "WARNING")
            
            # Simulación de reparación: Limpiar metadatos basura y re-inyectar
            event_data['status'] = 'REPAIRED'
            event_data['retry_count'] = self.error_counts[event_id]
            self.redis_client.publish(self.telemetry_channel, json.dumps(event_data))
        else:
            logger.error(f"🚨 Kill-Switch activado para {event_id}. Escalando a Arquitecto Principal.")
            self.log_to_factory("KILL_SWITCH", f"Evento {event_id} bloqueado tras {self.kill_switch_limit} fallos.", "CRITICAL")

    def start_monitoring(self):
        logger.info("📐 Sifu Resilience Engine en línea. Monitoreando bus de eventos...")
        pubsub = self.redis_client.pubsub()
        pubsub.subscribe(self.telemetry_channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    if data.get('status') == 'ERROR':
                        self.self_heal_event(data)
                    else:
                        # Log de flujo normal para el carril /factory
                        self.log_to_factory("EVENT_PROCESSED", f"Evento {data.get('type')} recibido correctamente.")
                except Exception as e:
                    logger.error(f"Fallo crítico en el monitor: {e}")

if __name__ == "__main__":
    engine = SifuResilienceEngine()
    engine.start_monitoring()
