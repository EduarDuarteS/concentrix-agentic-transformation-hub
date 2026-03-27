import os
import json
import redis
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.prompts import ChatPromptTemplate

# Configuración de Inferencia Pro
# Usamos Gemini 3.1 Pro para razonamiento y Flash para triaje (Cost-Efficiency)
REASONING_MODEL = "gemini-3.1-pro-preview"
FAST_MODEL = "gemini-3.1-flash-preview"

class AgentState(TypedDict):
    raw_requirement: str
    intent_analysis: Dict[str, Any]
    refined_spec: Dict[str, Any]
    infrastructure_code: str
    security_audit: Dict[str, Any]
    iterations: int
    status: str

class SifuArchitectEngine:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm_pro = ChatVertexAI(model_name=REASONING_MODEL, temperature=0.2)
        self.llm_flash = ChatVertexAI(model_name=FAST_MODEL, temperature=0.1)

    def intent_triage_node(self, state: AgentState):
        """Nodo de Triaje (SLM/Flash): Clasifica la intención y extrae entidades del CCaaS"""
        prompt = """Analiza el requerimiento para un Contact Center. Extrae:
        1. Plataforma (Genesys/Amazon Connect/Five9)
        2. Tipo de Integración (Webhook/SIP/WebSocket)
        3. Nivel de Complejidad (1-10)
        Responde estrictamente en JSON."""
        
        response = self.llm_flash.invoke([SystemMessage(content=prompt), HumanMessage(content=state['raw_requirement'])])
        return {"intent_analysis": json.loads(response.content), "iterations": 1}

    def architect_planner_node(self, state: AgentState):
        """Nodo Arquitecto (Gemini Pro): Diseña la topología EDA y los contratos Zod"""
        intent = state['intent_analysis']
        prompt = f"""Como Principal AI Architect, diseña una solución robusta para {intent['plataforma']}.
        Requerimiento: {state['raw_requirement']}
        Define: 
        - Flujo de eventos en Redis.
        - Estrategia de Cold Storage vs Hot Cache.
        - Esquema de validación para la entrada de audio.
        Usa un tono de Senior Solution Architect."""
        
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        return {"refined_spec": {"architecture": response.content}}

    def self_healing_coder_node(self, state: AgentState):
        """Nodo de Código Autónomo: Genera los Workers de Python/Node para la integración"""
        spec = state['refined_spec']['architecture']
        prompt = f"Genera el código del Worker de integración siguiendo esta especificación: {spec}. El código debe ser idempotente y manejar retries con backoff exponencial."
        
        response = self.llm_pro.invoke([SystemMessage(content=prompt)])
        return {"infrastructure_code": response.content}

    def security_guardrails_node(self, state: AgentState):
        """Nodo de Auditoría (Zero Trust): Busca fugas de PII o secretos en el código generado"""
        code = state['infrastructure_code']
        prompt = "Actúa como un Auditor de Seguridad GRC. Revisa este código generado por IA en busca de: 1. Hardcoded keys, 2. Falta de sanitización, 3. Inyección de prompts. Responde con 'STATUS: PASS' o 'STATUS: FAIL'."
        
        response = self.llm_flash.invoke([SystemMessage(content=prompt), HumanMessage(content=code)])
        return {"security_audit": {"report": response.content, "pass": "PASS" in response.content}}

    def compile_factory_graph(self):
        workflow = StateGraph(AgentState)
        
        workflow.add_node("triage", self.intent_triage_node)
        workflow.add_node("architect", self.architect_planner_node)
        workflow.add_node("coder", self.self_healing_coder_node)
        workflow.add_node("auditor", self.security_guardrails_node)
        
        workflow.set_entry_point("triage")
        workflow.add_edge("triage", "architect")
        workflow.add_edge("architect", "coder")
        workflow.add_edge("coder", "auditor")
        
        # Ciclo de reflexión: Si el auditor falla, volvemos al arquitecto
        workflow.add_conditional_edges(
            "auditor",
            lambda x: "end" if x["security_audit"]["pass"] else "architect",
            {"end": END, "architect": "architect"}
        )
        
        return workflow.compile()

    def run_live_factory(self):
        graph = self.compile_factory_graph()
        print("🚀 Sifu AI Architect Engine: FACTORY_LOADED")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe("sensei:live:telemetry")
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                event = json.loads(message['data'])
                if event.get('type') == 'REQUIREMENT_RECEIVED':
                    inputs = {"raw_requirement": event['payload']['text'], "iterations": 0}
                    print(f"🧠 Razonando solución para: {inputs['raw_requirement'][:50]}...")
                    
                    for output in graph.stream(inputs):
                        # Publicar el razonamiento interno al bus para que se vea en el "Command Center"
                        node_name = list(output.keys())[0]
                        self.redis.publish("sensei:live:telemetry", json.dumps({
                            "type": "FACTORY_LOG",
                            "agent": node_name,
                            "message": f"Razonamiento completado en nodo: {node_name}",
                            "timestamp": datetime.now().isoformat()
                        }))

if __name__ == "__main__":
    from datetime import datetime
    engine = SifuArchitectEngine()
    engine.run_live_factory()
