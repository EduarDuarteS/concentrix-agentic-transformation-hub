#!/bin/bash
echo "📐 Sifu: Lanzando Fábrica de Software Autónoma (Sifu 5.2 - SELF-PROGRAMMING EDITION)..."

# 1. Gateway de Eventos
cd /home/node/.openclaw/workspace/apps/gateway && npx ts-node index.ts &
echo "✅ Event Gateway iniciado"

# 2. Monitor de Resiliencia
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Resilience Engine iniciado"

# 3. Meta-Graph Engine (IA que programa IAs - NUEVO)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_meta_graph_engine.py &
echo "✅ Sifu Meta-Graph Engine iniciado (Self-Programming)"

# 4. Orquestador CCaaS
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ccaas_orchestrator.py &
echo "✅ CCaaS LangGraph Orchestrator iniciado"

# 5. ROI Financial Engine
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_roi_engine.py &
echo "✅ ROI Financial Engine iniciado"

# 6. Prompt Architect
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 7. Lead Coder
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 8. ZTA Validator
python3 /home/node/.openclaw/workspace/scripts/factory/validation_agent_worker.py &
echo "✅ ZTA Validator Agent iniciado"

# 9. Git Automator
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 10. Executive Summarizer
python3 /home/node/.openclaw/workspace/scripts/factory/summary_agent_worker.py &
echo "✅ Executive Summarizer iniciado"

# 11. Knowledge Manager
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica operando en 11 carriles. Capacidad de auto-programación de grafos ACTIVADA."
