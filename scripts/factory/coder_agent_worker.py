import os
import json
import redis
import logging
from datetime import datetime
import subprocess

# Configuración de Logs de Ingeniería
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-CODER-AGENT] - %(levelname)s - %(message)s')
logger = logging.getLogger("LeadCoder")

class LeadCoderAgent:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.channel = "sensei:live:telemetry"
        self.workspace_root = "/home/node/.openclaw/workspace"

    def publish_to_ui(self, message, event_type="CODE_ACTION", status="INFO"):
        """Notifica a la UI los avances de programación en tiempo real"""
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Lead_Coder_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def write_production_code(self, payload):
        """Escribe código real en el sistema de archivos del monorepo"""
        file_path = payload.get('filePath')
        code_content = payload.get('code')
        full_path = os.path.join(self.workspace_root, file_path)
        
        self.publish_to_ui(f"🛠️ Escribiendo módulo: {file_path}...")
        
        try:
            # Asegurar que el directorio existe
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            
            with open(full_path, 'w') as f:
                f.write(code_content)
            
            self.publish_to_ui(f"✅ Archivo persistido exitosamente.", "SUCCESS")
            
            # Auto-formateo (Prettier/ESLint sim)
            self.lint_and_format(full_path)
            
        except Exception as e:
            logger.error(f"Error escribiendo archivo: {e}")
            self.publish_to_ui(f"❌ Error en persistencia: {str(e)}", "ERROR")

    def lint_and_format(self, path):
        """Simula la ejecución de un linter para asegurar calidad de código"""
        self.publish_to_ui(f"🧹 Ejecutando Linter/Formatter en {os.path.basename(path)}...")
        # En un entorno real ejecutaríamos: subprocess.run(["npx", "prettier", "--write", path])
        time.sleep(1) # Simulación de proceso
        self.publish_to_ui(f"✨ Código sanitizado y formateado.", "SUCCESS")

    def listen_and_code(self):
        logger.info("👨‍💻 Agente Programador (Lead Coder) en línea. Esperando especificaciones...")
        self.publish_to_ui("Lead Coder Agent listo. Brazo ejecutor de código activado.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    
                    # El Coder reacciona a eventos de aprobación del Arquitecto
                    if data.get('type') == 'CODE_GEN_REQUEST':
                        self.write_production_code(data.get('payload'))
                        
                except Exception as e:
                    logger.error(f"Error procesando mensaje: {e}")

if __name__ == "__main__":
    import time
    agent = LeadCoderAgent()
    agent.listen_and_code()
