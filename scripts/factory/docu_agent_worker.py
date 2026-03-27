import os
import json
import redis
import requests
from datetime import datetime
import logging

# Configuración de Observabilidad
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-DOC-AGENT] - %(message)s')
logger = logging.getLogger("DocuAgent")

class NotionDocumentationAgent:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.notion_token = os.getenv("NOTION_TOKEN")
        self.notion_db_id = os.getenv("NOTION_DATABASE_ID")
        self.channel = "sensei:live:telemetry"
        self.adr_log_path = "/home/node/.openclaw/workspace/docs/architecture/adr_live_log.json"

    def publish_to_ui(self, message, status="INFO"):
        """Notifica a la UI que la documentación se está generando"""
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Knowledge_Manager_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def create_adr_entry(self, adr_data):
        """Genera un Architecture Decision Record (ADR) en formato Markdown y JSON"""
        self.publish_to_ui(f"✍️ Generando ADR para: {adr_data.get('title')[:30]}...")
        
        timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
        filename = f"ADR-{timestamp}-{adr_data.get('id')}.md"
        filepath = f"/home/node/.openclaw/workspace/docs/architecture/adrs/{filename}"
        
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        content = f"""# ADR: {adr_data.get('title')}
**Status:** {adr_data.get('status', 'Proposed')}
**Date:** {datetime.now().isoformat()}
**Architect:** Sifu NHITL Factory

## Context
{adr_data.get('context')}

## Decision
{adr_data.get('decision')}

## Consequences
{adr_data.get('consequences')}
"""
        with open(filepath, 'w') as f:
            f.write(content)
            
        # Sincronizar con el log central para la UI
        self.sync_local_log(adr_data)
        self.publish_to_ui(f"✅ ADR persistido en: {filename}", "SUCCESS")

    def sync_local_log(self, adr_data):
        """Mantiene un índice de ADRs para el 'Command Center'"""
        logs = []
        if os.path.exists(self.adr_log_path):
            with open(self.adr_log_path, 'r') as f:
                logs = json.load(f)
        
        logs.append({
            "id": adr_data.get('id'),
            "title": adr_data.get('title'),
            "timestamp": datetime.now().isoformat()
        })
        
        with open(self.adr_log_path, 'w') as f:
            json.dump(logs[-20:], f, indent=2)

    def listen_and_document(self):
        logger.info("📚 Agente de Documentación (Knowledge Manager) iniciado.")
        self.publish_to_ui("Knowledge Manager en línea. Listo para capturar decisiones.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                data = json.loads(message['data'])
                
                # Si el Arquitecto termina un diseño, nosotros lo documentamos como ADR
                if data.get('agent') == 'architect' and 'Razonamiento completado' in data.get('message'):
                    # Simulamos la extracción de data estructurada del bus para el ADR
                    self.create_adr_entry({
                        "id": "GCP-RUN-001",
                        "title": "Despliegue Serverless en Cloud Run",
                        "status": "APPROVED",
                        "context": "Necesidad de escalabilidad a cero y soporte de WebSockets para Concentrix.",
                        "decision": "Migrar de Firebase a Cloud Run nativo con Artifact Registry.",
                        "consequences": "Menor latencia, mayor control de infraestructura, optimización de costos."
                    })

if __name__ == "__main__":
    agent = NotionDocumentationAgent()
    agent.listen_and_document()
