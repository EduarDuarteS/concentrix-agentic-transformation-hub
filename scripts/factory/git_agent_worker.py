import os
import json
import redis
import logging
import subprocess
from datetime import datetime

# Configuración de Observabilidad
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [SIFU-GIT-AGENT] - %(levelname)s - %(message)s')
logger = logging.getLogger("GitAutomator")

class GitAutomatorAgent:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.channel = "sensei:live:telemetry"
        self.workspace_root = "/home/node/.openclaw/workspace"

    def publish_to_ui(self, message, status="INFO"):
        """Notifica el estado de Git al Command Center"""
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": "Git_Automator_Agent",
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def commit_changes(self, file_path, message):
        """Ejecuta git add y commit de forma autónoma"""
        try:
            self.publish_to_ui(f"📦 Indexando cambios en: {file_path}")
            
            # Git Add
            subprocess.run(["git", "add", file_path], cwd=self.workspace_root, check=True)
            
            # Git Commit (Conventional Commits)
            commit_msg = f"feat(factory): {message}"
            subprocess.run(["git", "commit", "-m", commit_msg], cwd=self.workspace_root, check=True)
            
            # Obtener el hash del commit
            commit_hash = subprocess.check_output(["git", "rev-parse", "--short", "HEAD"], cwd=self.workspace_root).decode().strip()
            
            self.publish_to_ui(f"✅ Commit exitoso [{commit_hash}]: {commit_msg}", "SUCCESS")
            
        except Exception as e:
            logger.error(f"Fallo en Git Automator: {e}")
            self.publish_to_ui(f"⚠️ Error en commit: {str(e)}", "WARNING")

    def monitor_bus(self):
        logger.info("🛰️ Git Automator Agent activo. Monitoreando despliegues...")
        self.publish_to_ui("Git Automator en línea. Trazabilidad de código garantizada.")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    data = json.loads(message['data'])
                    
                    # Reacciona cuando el Coder confirma la persistencia de un archivo
                    if data.get('agent') == 'Lead_Coder_Agent' and 'persistido exitosamente' in data.get('message'):
                        # Simulamos la extracción de data para el commit
                        # En producción el Coder enviaría un evento estructurado
                        self.commit_changes(".", "automated code generation from NHITL factory")
                        
                except Exception as e:
                    logger.error(f"Error en monitor Git: {e}")

if __name__ == "__main__":
    agent = GitAutomatorAgent()
    agent.monitor_bus()
