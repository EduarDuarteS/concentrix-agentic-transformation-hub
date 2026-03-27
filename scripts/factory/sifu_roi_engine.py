import redis
import json
import time
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-ROI-ENGINE] - %(message)s')
logger = logging.getLogger("RoiEngine")

class SifuRoiEngine:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.channel = "sensei:live:telemetry"
        
        # Base metrics for Concentrix
        self.base_human_cost = 4.50
        self.base_ai_cost = 0.15
        self.total_contacts = 10000
        
    def calculate_impact(self, complexity_level):
        """Calcula el impacto financiero basado en la complejidad del requerimiento"""
        # A mayor complejidad, mayor ahorro por automatización vs humano
        savings_multiplier = 1 + (complexity_level / 10)
        new_ai_cost = self.base_ai_cost * (1 - (complexity_level / 20))
        
        return {
            "aiCostPerContact": round(new_ai_cost, 2),
            "savings": round(96.6 * savings_multiplier, 1),
            "ttm": f"{max(5, 40 - complexity_level)}m",
            "selfHealing": round(94.2 + (complexity_level / 5), 1)
        }

    def run(self):
        logger.info("📈 Sifu ROI Engine en línea. Analizando impacto financiero...")
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    
                    # Si el orquestador termina un análisis de intención, recalculamos ROI
                    if data.get('agent') == 'voice_analyser':
                        logger.info("🔊 Requerimiento de voz detectado. Recalculando ROI...")
                        
                        # Extraer complejidad (simulada o real)
                        complexity = 5 # Default
                        
                        impact_metrics = self.calculate_impact(complexity)
                        
                        # Publicar actualización de ROI
                        roi_event = {
                            "type": "ROI_UPDATED",
                            "payload": impact_metrics,
                            "timestamp": datetime.now().isoformat()
                        }
                        self.redis.publish(self.channel, json.dumps(roi_event))
                        
                        # Log para el Command Center
                        self.redis.publish(self.channel, json.dumps({
                            "type": "FACTORY_LOG",
                            "agent": "ROI_Engine",
                            "message": f"Impacto financiero recalculado: Savings @ {impact_metrics['savings']}%",
                            "status": "SUCCESS",
                            "timestamp": datetime.now().isoformat()
                        }))
                        
                except Exception as e:
                    logger.error(f"Error en ROI Engine: {e}")

if __name__ == "__main__":
    engine = SifuRoiEngine()
    engine.run()
