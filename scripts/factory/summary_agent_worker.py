import os
import json
import redis
import logging
from datetime import datetime
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import SystemMessage, HumanMessage

# Configuración de Logs
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-SUMMARY-AGENT] - %(levelname)s - %(message)s')
logger = logging.getLogger("ExecutiveSummarizer")

class SummaryAgentWorker:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm = ChatVertexAI(model_name="gemini-3.1-flash-preview", temperature=0.3)
        self.channel = "sensei:live:telemetry"
        self.summary_path = "/home/node/.openclaw/workspace/apps/web/src/data/factory/executive_summary.json"
        self.conversation_buffer = []

    def publish_to_ui(self, message, status="INFO"):
        """Notifica los avances del resumen a la UI"""
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Executive_Summarizer_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def update_summary(self, new_text):
        """Genera y actualiza el resumen ejecutivo en tiempo real"""
        self.conversation_buffer.append(new_text)
        full_context = "\n".join(self.conversation_buffer)
        
        self.publish_to_ui("📉 Actualizando Resumen Ejecutivo de la reunión...", "INFO")
        
        prompt = f"""
        Actúa como un Secretario Ejecutivo de alto nivel para un Arquitecto de Soluciones.
        Basado en el progreso de la reunión: "{full_context}"
        Genera un Resumen Ejecutivo en JSON con:
        1. "key_points": Lista de los puntos más importantes tratados.
        2. "technical_decisions": Decisiones de arquitectura tomadas.
        3. "next_steps": Acciones inmediatas.
        4. "sentiment": Tono de la reunión (Positivo/Neutral/Crítico).
        
        Responde estrictamente en JSON.
        """
        
        try:
            response = self.llm.invoke([SystemMessage(content="Eres un Executive Summarizer."), HumanMessage(content=prompt)])
            summary_data = json.loads(response.content)
            
            os.makedirs(os.path.dirname(self.summary_path), exist_ok=True)
            with open(self.summary_path, 'w') as f:
                json.dump(summary_data, f, indent=2)
            
            self.publish_to_ui("✅ Resumen Ejecutivo actualizado exitosamente.", "SUCCESS")
        except Exception as e:
            logger.error(f"Error generando resumen: {e}")
            self.publish_to_ui("⚠️ Fallo al procesar el resumen.", "WARNING")

    def listen_and_summarize(self):
        logger.info("📉 Agente de Resumen Ejecutivo iniciado.")
        self.publish_to_ui("Executive Summarizer en línea. Capturando la esencia de la entrevista.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    # Escucha tanto requerimientos como logs importantes para resumir
                    if data.get('type') == 'REQUIREMENT_RECEIVED':
                        self.update_summary(f"CLIENTE: {data['payload']['text']}")
                    elif data.get('event') == 'ADR_CREATED':
                        self.update_summary(f"DECISIÓN TÉCNICA: {data['message']}")
                except Exception as e:
                    logger.error(f"Error en monitor de resumen: {e}")

if __name__ == "__main__":
    agent = SummaryAgentWorker()
    agent.listen_and_summarize()
