import os
import json
import redis
import logging
from datetime import datetime
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import SystemMessage, HumanMessage

# Configuración de Logs
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-PROMPT-ENGINEER] - %(levelname)s - %(message)s')
logger = logging.getLogger("PromptArchitect")

class PromptEngineerAgent:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm = ChatVertexAI(model_name="gemini-3.1-flash-preview", temperature=0.7)
        self.channel = "sensei:live:telemetry"

    def publish_to_ui(self, message, status="INFO"):
        """Notifica los avances de ingeniería de prompts a la UI"""
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Prompt_Architect_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def build_system_prompts(self, requirement):
        """Genera el System Prompt óptimo para la solución solicitada"""
        self.publish_to_ui(f"🧪 Construyendo System Prompts para el nuevo requerimiento...", "INFO")
        
        template = f"""
        Actúa como un experto en Prompt Engineering. 
        Basado en este requerimiento: "{requirement}", genera:
        1. Un System Prompt para un Agente de Servicio al Cliente.
        2. Un System Prompt para un Validador de Seguridad.
        3. Un conjunto de Few-Shot examples.
        
        Responde en formato JSON estructurado.
        """
        
        response = self.llm.invoke([SystemMessage(content="Eres un Principal Prompt Engineer."), HumanMessage(content=template)])
        
        try:
            prompt_data = json.loads(response.content)
            self.save_prompts(prompt_data)
            self.publish_to_ui(f"✅ Prompts optimizados y guardados en el repositorio.", "SUCCESS")
        except:
            self.publish_to_ui(f"⚠️ Error al estructurar prompts, guardando como raw.", "WARNING")

    def save_prompts(self, data):
        """Persiste los prompts en la carpeta de la fábrica"""
        path = "/home/node/.openclaw/workspace/apps/web/src/data/factory/optimized_prompts.json"
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            json.dump(data, f, indent=2)

    def listen_and_build(self):
        logger.info("🧪 Agente de Ingeniería de Prompts iniciado.")
        self.publish_to_ui("Prompt Architect en línea. Listo para optimizar instrucciones.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                data = json.loads(message['data'])
                if data.get('type') == 'REQUIREMENT_RECEIVED':
                    self.build_system_prompts(data['payload']['text'])

if __name__ == "__main__":
    agent = PromptEngineerAgent()
    agent.listen_and_build()
