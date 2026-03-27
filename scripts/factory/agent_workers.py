import redis
import json
import os
import sys
import logging
from datetime import datetime

# Rutas del Proyecto (Sifu 5.2 Monorepo)
BASE_DIR = "/home/node/.openclaw/workspace"
UI_COMPONENTS_PATH = f"{BASE_DIR}/apps/web/src/components/demo"
SALES_DATA_PATH = f"{BASE_DIR}/apps/web/src/data/sales/sales_data.json"
FACTORY_LOGS_PATH = f"{BASE_DIR}/apps/web/src/data/factory/factory_logs.json"

logging.basicConfig(level=logging.INFO, format='%(asctime)s - [%(name)s] - %(message)s')

class BaseAgentWorker:
    def __init__(self, agent_name):
        self.agent_name = agent_name
        self.logger = logging.getLogger(agent_name)
        self.redis_client = redis.Redis(
            host=os.getenv('REDIS_HOST', 'localhost'),
            port=int(os.getenv('REDIS_PORT', 6379)),
            db=0,
            decode_responses=True
        )
        self.channel = "sensei:live:telemetry"

    def publish_log(self, message, event_type="AGENT_ACTION", status="INFO"):
        """Publica logs en el carril /factory para visibilidad en tiempo real"""
        try:
            log_entry = {
                "timestamp": datetime.now().isoformat(),
                "agent": self.agent_name,
                "event": event_type,
                "message": message,
                "status": status
            }
            # Guardar en archivo para la UI
            logs = []
            if os.path.exists(FACTORY_LOGS_PATH):
                with open(FACTORY_LOGS_PATH, 'r') as f:
                    logs = json.load(f)
            logs.append(log_entry)
            with open(FACTORY_LOGS_PATH, 'w') as f:
                json.dump(logs[-50:], f, indent=2)
            
            # Publicar en Redis para el stream en vivo
            self.redis_client.publish(self.channel, json.dumps(log_entry))
        except Exception as e:
            self.logger.error(f"Error publicando log: {e}")

class DevAgentWorker(BaseAgentWorker):
    """Agente Desarrollador: Escribe componentes React en base a requerimientos"""
    def __init__(self):
        super().__init__("Lead_Dev_Agent")

    def process_requirement(self, requirement):
        self.publish_log(f"Iniciando construcción de componente para: {requirement[:30]}...", "CODE_GEN")
        # Aquí iría la llamada al LLM para generar el JSX. 
        # Para el demo, simulamos la generación de un componente robusto.
        component_name = "AgenticSolution.jsx"
        jsx_code = f"""
import React from 'react';
import {{ KpiCard }} from '../library/KpiCard';

const AgenticSolution = () => {{
  return (
    <div className="p-6 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">Solución para Concentrix</h2>
      <p className="text-slate-400 mb-6">{requirement}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KpiCard title="Eficiencia de IA" value="98%" status="optimal" />
        <KpiCard title="Latencia" value="120ms" status="good" />
      </div>
    </div>
  );
}};

export default AgenticSolution;
"""
        file_path = f"{UI_COMPONENTS_PATH}/{component_name}"
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'w') as f:
            f.write(jsx_code)
        
        self.publish_log(f"Componente {component_name} desplegado en apps/web.", "DEPLOY_SUCCESS", "SUCCESS")

class BusinessAgentWorker(BaseAgentWorker):
    """Agente de Negocio: Calcula ROI y actualiza el Dashboard de Ventas"""
    def __init__(self):
        super().__init__("Business_Strategist")

    def update_metrics(self, project_scope):
        self.publish_log("Recalculando ROI para el nuevo requerimiento...", "BUSINESS_ANALYSIS")
        
        try:
            with open(SALES_DATA_PATH, 'r') as f:
                data = json.load(f)
            
            # Lógica proactiva: Ajustar ahorro basado en el scope
            if "automatización" in project_scope.lower():
                data["roi_metrics"]["projected_savings_percentage"] += 2.5
            
            data["metadata"]["last_updated"] = datetime.now().isoformat()
            data["metadata"]["status"] = "ACTIVE_DEMO"
            
            with open(SALES_DATA_PATH, 'w') as f:
                json.dump(data, f, indent=2)
            
            self.publish_log("Métricas de ROI actualizadas exitosamente.", "ROI_UPDATED", "SUCCESS")
        except Exception as e:
            self.publish_log(f"Error en análisis de negocio: {e}", "ROI_ERROR", "ERROR")

class OrchestratorAgent(BaseAgentWorker):
    """El Cerebro de la Fábrica: Escucha el bus y delega a los workers"""
    def __init__(self):
        super().__init__("Sifu_Orchestrator")
        self.dev = DevAgentWorker()
        self.biz = BusinessAgentWorker()

    def run(self):
        self.logger.info("Fábrica de Software NHITL iniciada. Escuchando requerimientos...")
        self.publish_log("Fábrica en línea. Esperando audio/texto de la entrevista.", "SYSTEM_READY")
        
        pubsub = self.redis_client.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    if data.get('event') == 'REQUIREMENT_RECEIVED':
                        req = data.get('message', '')
                        # Delegación en paralelo
                        self.biz.update_metrics(req)
                        self.dev.process_requirement(req)
                except Exception as e:
                    self.logger.error(f"Error en orquestación: {e}")

if __name__ == "__main__":
    factory = OrchestratorAgent()
    factory.run()
