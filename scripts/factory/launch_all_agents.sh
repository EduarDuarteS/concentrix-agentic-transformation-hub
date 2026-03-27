#!/bin/bash
echo "📐 Sifu: Lanzando Escuadrón de Agentes NHITL (Sifu 5.2 RE-ARMED)..."

# 1. Gateway de Eventos (Node.js)
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
GATEWAY_PID=$!
echo "✅ Gateway iniciado (PID: $GATEWAY_PID)"

# 2. Monitor de Resiliencia (Python)
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
RESILIENCE_PID=$!
echo "✅ Monitor de Resiliencia iniciado (PID: $RESILIENCE_PID)"

# 3. Orquestador LangGraph (IA Architect)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ai_architect_engine.py &
IA_ARCH_PID=$!
echo "✅ IA Architect Engine iniciado (PID: $IA_ARCH_PID)"

# 4. Lead Coder Agent (El Programador)
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
CODER_PID=$!
echo "✅ Lead Coder Agent iniciado (PID: $CODER_PID)"

# 5. Git Automator Agent (Trazabilidad)
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
GIT_PID=$!
echo "✅ Git Automator Agent iniciado (PID: $GIT_PID)"

# 6. Knowledge Manager (Documentación)
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
DOCU_PID=$!
echo "✅ Knowledge Manager iniciado (PID: $DOCU_PID)"

echo "🚀 Fábrica Autónoma operando en 6 carriles paralelos."
echo "🎯 La orquesta digital está completa y afinada."
