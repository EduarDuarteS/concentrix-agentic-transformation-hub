#!/bin/bash
echo "📐 Sifu: Lanzando Escuadrón de Agentes NHITL (Sifu 5.2 - FULL STACK)..."

# 1. Gateway de Eventos (Node.js)
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
echo "✅ Gateway iniciado"

# 2. Monitor de Resiliencia
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Monitor de Resiliencia iniciado"

# 3. IA Architect (Brain)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ai_architect_engine.py &
echo "✅ IA Architect Engine iniciado"

# 4. Prompt Engineer (Optimizer)
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 5. Lead Coder (Muscle)
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 6. Git Automator (DevOps)
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 7. Knowledge Manager (Scribe)
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica Autónoma operando en 7 carriles paralelos."
echo "🎯 Sistema listo para la demostración técnica."
