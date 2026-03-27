import os
import json
import redis
import time
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import SystemMessage, HumanMessage
from datetime import datetime

# Configuración de Modelos (GCP Vertex AI)
REASONING_MODEL = "gemini-3.1-pro-preview"
FAST_MODEL = "gemini-3.1-flash-preview"

class CCaaSState(TypedDict):
    voice_transcript: str
    intent_data: Dict[str, Any]
    ccaas_topology: Dict[str, Any]
    automation_code: str
    audit_report: str
    iterations: int
    platform: str

class SifuCCaaSEngine:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm_pro = ChatVertexAI(model_name=REASONING_MODEL, temperature=0.1)
        self.llm_flash = ChatVertexAI(model_name=FAST_MODEL, temperature=0.1)
        self.channel = "sensei:live:telemetry"

    def publish_log(self, agent, message, status="INFO"):
        log_entry = {
            "type": "FACTORY_LOG",
            "agent": agent,
            "message": message,
            "status": status,
            "timestamp": datetime.now().isoformat()
        }
        self.redis.publish(self.channel, json.dumps(log_entry))

    def voice_intent_analyser(self, state: CCaaSState):
        """Nodo de Triaje CCaaS: Extrae entidades de voz (Sentiment, Intent, Platform)"""
        self.publish_log("voice_analyser", "Analizando transcript de audio para Concentrix...", "INFO")
        
        prompt = """Analiza el transcript de voz del cliente. Extrae en JSON:
        - primary_intent: (ej. Refund, Technical Support, Routing Change)
        - sentiment: (Negativo, Neutral, Positivo)
        - platform_target: (Genesys / Amazon Connect / Five9)
        - priority: (High, Medium, Low)
        """
        response = self.llm_flash.invoke([SystemMessage(content="Eres un Analista de Voz Senior de Concentrix."), HumanMessage(content=state['voice_transcript'])])
        data = json.loads(response.content)
        
        self.publish_log("voice_analyser", f"Intento detectado: {data['primary_intent']} en {data['platform_target']}", "SUCCESS")
        return {"intent_data": data, "platform": data['platform_target'], "iterations": 1}

    def architecture_blueprint_node(self, state: CCaaSState):
        """Nodo Arquitecto: Diseña la integración técnica"""
        self.publish_log("architect", f"Diseñando topología para {state['platform']}...", "INFO")
        
        intent = state['intent_data']
        prompt = f"""Diseña una solución robusta de integración.
        Plataforma: {state['platform']}
        Requerimiento: {state['voice_transcript']}
        Intento: {intent['primary_intent']}
        
        Define:
        1. Flujo de Webhooks asíncronos.
        2. Configuración de Lambda/Cloud Run para transformación de datos.
        3. Esquema de persistencia en Redis.
        """
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        self.publish_log("architect", "Plan arquitectónico finalizado y aprobado.", "SUCCESS")
        return {"ccaas_topology": {"design": response.content}}

    def automation_coder_node(self, state: CCaaSState):
        """Nodo Programador: Escribe el código del conector"""
        self.publish_log("coder", "Generando código del conector CCaaS...", "INFO")
        
        design = state['ccaas_topology']['design']
        prompt = f"Genera un script funcional en Python para este diseño: {design}. Debe incluir manejo de errores y logging corporativo."
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        
        code = response.content.replace("```python", "").replace("```", "").strip()
        self.publish_log("coder", "Módulo de automatización codificado exitosamente.", "SUCCESS")
        return {"automation_code": code}

    def compliance_auditor_node(self, state: CCaaSState):
        """Nodo GRC: Auditoría PCI/GDPR"""
        self.publish_log("auditor", "Iniciando escaneo de cumplimiento (PCI/GDPR)...", "INFO")
        
        code = state['automation_code']
        prompt = "Revisa este código. Busca: 1. PII sin enmascarar, 2. Falta de encriptación, 3. Inyección de comandos. Responde 'PASS' o 'FAIL'."
        response = self.llm_flash.invoke([SystemMessage(content=prompt), HumanMessage(content=code)])
        
        status = "SUCCESS" if "PASS" in response.content else "ERROR"
        self.publish_log("auditor", f"Resultado de auditoría: {response.content.strip()}", status)
        return {"audit_report": response.content}

    def compile_ccaas_graph(self):
        workflow = StateGraph(CCaaSState)
        workflow.add_node("voice_analyser", self.voice_intent_analyser)
        workflow.add_node("architect", self.architecture_blueprint_node)
        workflow.add_node("coder", self.automation_coder_node)
        workflow.add_node("auditor", self.compliance_auditor_node)
        
        workflow.set_entry_point("voice_analyser")
        workflow.add_edge("voice_analyser", "architect")
        workflow.add_edge("architect", "coder")
        workflow.add_edge("coder", "auditor")
        workflow.add_edge("auditor", END)
        
        return workflow.compile()

    def run(self):
        graph = self.compile_ccaas_graph()
        print("🎙️ Sifu CCaaS Factory: READY_FOR_VIBECODING")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe("sensei:live:telemetry")
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                try:
                    event = json.loads(message['data'])
                    if event.get('type') == 'VOICE_TRANSCRIPT_RECEIVED':
                        inputs = {"voice_transcript": event['payload']['text'], "iterations": 0}
                        for output in graph.stream(inputs):
                            pass # Los logs se envían desde los nodos
                except Exception as e:
                    print(f"Error: {e}")

if __name__ == "__main__":
    engine = SifuCCaaSEngine()
    engine.run()
