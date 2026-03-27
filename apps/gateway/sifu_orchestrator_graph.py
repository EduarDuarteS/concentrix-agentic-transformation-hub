import os
import json
from typing import TypedDict, List, Annotated
import redis
from langgraph.graph import StateGraph, END
from langchain_google_vertexai import ChatVertexAI
from langchain_core.messages import BaseMessage, HumanMessage, SystemMessage

# Configuración de Redis
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

# Estado del Grafo
class AgentState(TypedDict):
    requirement: str
    architecture_plan: str
    generated_code: str
    critique: str
    iterations: int
    status: str

# Inicializar LLM (Gemini 3.1 Pro via Vertex)
llm = ChatVertexAI(model_name="gemini-3.1-pro-preview")

def architect_node(state: AgentState):
    """Agente A: Antigravity Architect - Diseña el plan"""
    prompt = f"Eres el Architect Lead. Diseña un plan de componentes React para: {state['requirement']}. Responde en JSON."
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"architecture_plan": response.content, "iterations": state['iterations'] + 1}

def developer_node(state: AgentState):
    """Agente B: Lead Dev - Escribe el código"""
    prompt = f"Eres el Lead Dev. Implementa el siguiente plan arquitectónico en JSX (Tailwind): {state['architecture_plan']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"generated_code": response.content}

def critic_node(state: AgentState):
    """Agente C: QA Auditor - Revisa y critica"""
    prompt = f"Eres el QA Auditor. Revisa este código y busca errores o mejoras: {state['generated_code']}"
    response = llm.invoke([SystemMessage(content=prompt)])
    return {"critique": response.content}

def router_logic(state: AgentState):
    """Lógica de decisión: ¿Seguimos iterando o terminamos?"""
    if "PASS" in state['critique'] or state['iterations'] >= 3:
        return "end"
    return "architect"

# Construcción del Grafo
workflow = StateGraph(AgentState)

workflow.add_node("architect", architect_node)
workflow.add_node("developer", developer_node)
workflow.add_node("critic", critic_node)

workflow.set_entry_point("architect")
workflow.add_edge("architect", "developer")
workflow.add_edge("developer", "critic")
workflow.add_conditional_edges("critic", router_logic, {"architect": "architect", "end": END})

app = workflow.compile()

def start_orchestrator():
    print("🧠 Sifu LangGraph Orchestrator iniciado...")
    pubsub = redis_client.pubsub()
    pubsub.subscribe('sensei:live:telemetry')
    
    for message in pubsub.listen():
        if message['type'] == 'message':
            data = json.loads(message['data'])
            if data.get('type') == 'REQUIREMENT_RECEIVED':
                print(f"📥 Procesando requerimiento: {data['payload']['text']}")
                
                # Ejecutar el Grafo
                inputs = {
                    "requirement": data['payload']['text'],
                    "iterations": 0,
                    "status": "processing"
                }
                for output in app.stream(inputs):
                    # Notificar cada paso a Redis para la UI (Carril Factory)
                    step_log = {
                        "type": "FACTORY_LOG",
                        "agent": "LangGraph_Orchestrator",
                        "message": f"Hito completado: {list(output.keys())[0]}",
                        "timestamp": os.popen('date -Iseconds').read().strip()
                    }
                    redis_client.publish('sensei:live:telemetry', json.dumps(step_log))

if __name__ == "__main__":
    start_orchestrator()
