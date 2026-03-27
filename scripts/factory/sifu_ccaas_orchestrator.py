import os
import json
import redis
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

class SifuCCaaSEngine:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm_pro = ChatVertexAI(model_name=REASONING_MODEL, temperature=0.1)
        self.llm_flash = ChatVertexAI(model_name=FAST_MODEL, temperature=0.1)

    def voice_intent_analyser(self, state: CCaaSState):
        """Nodo de Triaje CCaaS: Extrae entidades de voz (Sentiment, Intent, Platform)"""
        prompt = """Analiza el transcript de voz del cliente del Contact Center. Extrae en JSON:
        - primary_intent: (ej. Refund, Technical Support, Routing Change)
        - sentiment: (1-10)
        - entities: (ej. Order ID, Agent Name, Phone)
        - platform_target: (Genesys / Amazon Connect / Five9)
        """
        response = self.llm_flash.invoke([SystemMessage(content="Eres un Analista de Voz CCaaS."), HumanMessage(content=state['voice_transcript'])])
        return {"intent_data": json.loads(response.content), "iterations": 1}

    def architecture_blueprint_node(self, state: CCaaSState):
        """Nodo Arquitecto: Diseña la automatización del flujo conversacional (IVR/Agentic)"""
        intent = state['intent_data']
        prompt = f"""Como Solution Architect en Concentrix, diseña una integración para {intent['platform_target']}.
        Requerimiento de Voz: {state['voice_transcript']}
        Propón:
        1. Flujo de Webhooks asíncronos.
        2. Lógica de Prompt Injection para el IVR.
        3. Integración con el CRM vía Lambda/Cloud Run.
        """
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        return {"ccaas_topology": {"design": response.content}}

    def automation_coder_node(self, state: CCaaSState):
        """Nodo Programador: Escribe el código del conector CCaaS en tiempo real"""
        design = state['ccaas_topology']['design']
        prompt = f"Genera un script de integración (Python/Node) para este diseño de CCaaS: {design}. Asegura el manejo de SIP/WebRTC si aplica."
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        return {"automation_code": response.content}

    def compliance_auditor_node(self, state: CCaaSState):
        """Nodo GRC: Auditoría de Seguridad y Cumplimiento PCI/GDPR"""
        code = state['automation_code']
        prompt = "Revisa este código CCaaS. Busca: 1. Fugas de PII (números de tarjeta, SSN), 2. Errores de encriptación TLS, 3. Inyección de comandos. Responde con 'COMPLIANCE: OK' o 'COMPLIANCE: FAIL'."
        response = self.llm_flash.invoke([SystemMessage(content=prompt), HumanMessage(content=code)])
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

    def run_live_ccaas_factory(self):
        graph = self.compile_ccaas_graph()
        print("🎙️ Sifu CCaaS Factory: READY")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe("sensei:live:telemetry")
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                event = json.loads(message['data'])
                if event.get('type') == 'VOICE_TRANSCRIPT_RECEIVED':
                    inputs = {"voice_transcript": event['payload']['text'], "iterations": 0}
                    print(f"🔊 Procesando voz CCaaS: {inputs['voice_transcript'][:50]}...")
                    
                    for output in graph.stream(inputs):
                        node_name = list(output.keys())[0]
                        self.redis.publish("sensei:live:telemetry", json.dumps({
                            "type": "FACTORY_LOG",
                            "agent": node_name,
                            "message": f"CCaaS Insight: Procesado en {node_name}",
                            "timestamp": datetime.now().isoformat()
                        }))
                        
                        # Si el auditor termina, enviamos el código final a la UI
                        if node_name == "auditor":
                            self.redis.publish("sensei:live:telemetry", json.dumps({
                                "type": "CODE_GEN_REQUEST",
                                "payload": {
                                    "filePath": "apps/gateway/ccaas_connector.py",
                                    "code": output['auditor'].get('automation_code', '# CCaaS Code Ready')
                                }
                            }))

if __name__ == "__main__":
    engine = SifuCCaaSEngine()
    engine.run_live_ccaas_factory()
