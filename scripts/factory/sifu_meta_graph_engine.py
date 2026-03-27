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

class MetaGraphState(TypedDict):
    high_level_requirement: str
    proposed_graph_logic: str
    generated_python_code: str
    validation_status: str
    execution_result: str

class SifuMetaGraphEngine:
    """Motor que programa Grafos de LangGraph de forma autónoma (Self-Programming AI)"""
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
        self.llm = ChatVertexAI(model_name=REASONING_MODEL, temperature=0.1)
        self.channel = "sensei:live:telemetry"

    def graph_architect_node(self, state: MetaGraphState):
        """Diseña la lógica del flujo del grafo basado en el requerimiento de voz/texto"""
        prompt = f"""Actúa como un Meta-Arquitecto de LangGraph. 
        Requerimiento: {state['high_level_requirement']}
        Diseña un flujo de trabajo cíclico o lineal que resuelva este problema. 
        Define los nombres de los nodos y la lógica de transición.
        Responde con una descripción lógica clara."""
        
        response = self.llm.invoke([SystemMessage(content=prompt)])
        return {"proposed_graph_logic": response.content}

    def graph_coder_node(self, state: MetaGraphState):
        """Genera el código Python real que utiliza la librería langgraph"""
        prompt = f"""Genera el código Python de un StateGraph de LangGraph basado en esta lógica: 
        {state['proposed_graph_logic']}
        
        REQUISITOS ESTRICTOS:
        1. Usa la clase StateGraph.
        2. Define el TypedDict para el estado.
        3. Genera funciones placeholder para los nodos.
        4. Incluye la compilación final (workflow.compile()).
        5. NO incluyas texto explicativo, SOLO el código Python funcional.
        """
        
        response = self.llm.invoke([SystemMessage(content=prompt)])
        # Limpiar el código de bloques markdown si existen
        code = response.content.replace("```python", "").replace("```", "").strip()
        return {"generated_python_code": code}

    def graph_deployer_node(self, state: MetaGraphState):
        """Persiste el nuevo grafo programado en el monorepo"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"autonomous_graph_{timestamp}.py"
        filepath = f"apps/gateway/autonomous_agents/{filename}"
        full_path = os.path.join("/home/node/.openclaw/workspace", filepath)
        
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'w') as f:
            f.write(state['generated_python_code'])
            
        return {"validation_status": "DEPLOYED", "execution_result": filepath}

    def compile_meta_orchestrator(self):
        workflow = StateGraph(MetaGraphState)
        workflow.add_node("architect", self.graph_architect_node)
        workflow.add_node("coder", self.graph_coder_node)
        workflow.add_node("deployer", self.graph_deployer_node)
        
        workflow.set_entry_point("architect")
        workflow.add_edge("architect", "coder")
        workflow.add_edge("coder", "deployer")
        workflow.add_edge("deployer", END)
        
        return workflow.compile()

    def run(self):
        meta_graph = self.compile_meta_orchestrator()
        print("🤖 Sifu Meta-Graph Engine: ONLINE (Auto-Programming Mode)")
        
        pubsub = self.redis.pubsub()
        pubsub.subscribe(self.channel)
        
        for message in pubsub.listen():
            if message['type'] == 'message':
                event = json.loads(message['data'])
                # Disparador: Una orden directa de "crear una lógica nueva"
                if event.get('type') == 'META_GRAPH_REQUEST':
                    inputs = {"high_level_requirement": event['payload']['text']}
                    print(f"🛠️ Autoprogramando nuevo grafo para: {inputs['high_level_requirement'][:50]}...")
                    
                    for output in meta_graph.stream(inputs):
                        node_name = list(output.keys())[0]
                        self.redis.publish(self.channel, json.dumps({
                            "type": "FACTORY_LOG",
                            "agent": "Meta_Graph_Architect",
                            "message": f"Auto-programación: Nodo {node_name} completado.",
                            "status": "SUCCESS",
                            "timestamp": datetime.now().isoformat()
                        }))
                        
                        if node_name == "deployer":
                            self.redis.publish(self.channel, json.dumps({
                                "type": "FACTORY_LOG",
                                "agent": "Meta_Graph_Architect",
                                "message": f"🚀 NUEVO GRAFO GENERADO: {output['deployer']['execution_result']}",
                                "status": "CRITICAL",
                                "timestamp": datetime.now().isoformat()
                            }))

if __name__ == "__main__":
    engine = SifuMetaGraphEngine()
    engine.run()
