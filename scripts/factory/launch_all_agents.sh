#!/bin/bash
echo "📐 Sifu: Lanzando Escuadrón de Agentes NHITL (Sifu 5.2)..."

# 1. Gateway de Eventos (Node.js) - El Corazón de la Red
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
GATEWAY_PID=$!
echo "✅ Gateway iniciado (PID: $GATEWAY_PID)"

# 2. Monitor de Resiliencia (Python) - El Guardián
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
RESILIENCE_PID=$!
echo "✅ Monitor de Resiliencia iniciado (PID: $RESILIENCE_PID)"

# 3. Orquestador LangGraph (IA Architect) - El Cerebro
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ai_architect_engine.py &
IA_ARCH_PID=$!
echo "✅ IA Architect Engine iniciado (PID: $IA_ARCH_PID)"

# 4. Agente de Documentación (Knowledge Manager) - El Escriba
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
DOCU_PID=$!
echo "✅ Knowledge Manager iniciado (PID: $DOCU_PID)"

echo "🚀 Fábrica Autónoma operando en 4 carriles paralelos."
echo "🎯 Listo para la entrevista con Concentrix."
