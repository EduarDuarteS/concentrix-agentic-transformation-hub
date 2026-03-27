import os
import json
import redis
import logging
import time
from datetime import datetime
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import SystemMessage, HumanMessage

# Configuración de Inferencia de Alta Fidelidad
REASONING_MODEL = "gemini-3.1-pro-preview"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-SELF-HEALING] - %(levelname)s - %(message)s')
logger = logging.getLogger("SelfHealingCoder")

class SelfHealingCoderAgent:
    """Agente de Nivel Superior: Repara código que falló en el build físico (ZTA)"""
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm = ChatVertexAI(model_name=REASONING_MODEL, temperature=0.2)
        self.channel = "sensei:live:telemetry"

    def publish_to_ui(self, message, status="INFO"):
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Self_Healing_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def repair_code(self, file_path, error_logs, original_code):
        """Usa Gemini Pro para analizar el error de compilación y generar un fix"""
        self.publish_to_ui(f"🚑 Detectado fallo en {file_path}. Iniciando protocolo de reparación...", "WARNING")
        
        prompt = f"""
        Actúa como un Senior Fullstack Engineer. 
        El siguiente código falló en la compilación:
        
        --- ARCHIVO ---
        {file_path}
        
        --- CÓDIGO ORIGINAL ---
        {original_code}
        
        --- LOGS DE ERROR ---
        {error_logs}
        
        Tu tarea es:
        1. Identificar el error (importación faltante, error de sintaxis, tipo de dato incorrecto).
        2. Generar el CÓDIGO REPARADO completo.
        3. Responder estrictamente con el bloque de código reparado.
        """
        
        response = self.llm.invoke([SystemMessage(content="Eres un Experto en Self-Healing Code."), HumanMessage(content=prompt)])
        repaired_code = response.content.replace("```jsx", "").replace("```javascript", "").replace("```", "").strip()
        
        # Disparar nueva petición de escritura al Lead Coder
        repair_event = {
            "type": "CODE_GEN_REQUEST",
            "payload": {
                "filePath": file_path,
                "code": repaired_code,
                "fileName": os.path.basename(file_path)
            }
        }
        self.redis.publish(self.channel, json.dumps(repair_event))
        self.publish_to_ui(f"✅ Fix generado y enviado al Lead Coder para re-build.", "SUCCESS")

    def monitor_build_failures(self):
        logger.info("🚑 Self-Healing Coder activo. Vigilando fallos de compilación...")
        self.publish_to_ui("Self-Healing Coder en línea. Resiliencia de código activa.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    
                    # Reacciona si el Validador ZTA reporta un fallo crítico
                    if data.get('agent') == 'ZTA_Validator_Agent' and 'Fallo crítico' in data.get('message'):
                        # Simulamos la obtención de logs y código
                        self.repair_code(
                            file_path="apps/web/src/components/dynamic/AgentGeneratedComponent.jsx",
                            error_logs="TS2307: Cannot find module './KpiCard' or its corresponding type declarations.",
                            original_code="// Original broken code"
                        )
                        
                except Exception as e:
                    logger.error(f"Error en monitor de reparación: {e}")

if __name__ == "__main__":
    agent = SelfHealingCoderAgent()
    agent.monitor_build_failures()
