#!/bin/bash
echo "📐 Sifu: Lanzando Fábrica de Software Autónoma (Sifu 5.2 - SELF-HEALING & AUTO-PROG EDITION)..."

# 1. Gateway de Eventos
cd /home/node/.openclaw/workspace/apps/gateway && node index.js &
echo "✅ Event Gateway (Node.js) iniciado"

# 2. Monitor de Resiliencia (Bus)
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Resilience Engine (Redis) iniciado"

# 3. Meta-Graph Engine (Auto-programación)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_meta_graph_engine.py &
echo "✅ Sifu Meta-Graph Engine iniciado"

# 4. Self-Healing Coder (Auto-reparación de código - NUEVO)
python3 /home/node/.openclaw/workspace/scripts/factory/self_healing_coder.py &
echo "✅ Self-Healing Coder iniciado"

# 5. Orquestador CCaaS
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ccaas_orchestrator.py &
echo "✅ CCaaS LangGraph Orchestrator iniciado"

# 6. ROI Financial Engine
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_roi_engine.py &
echo "✅ ROI Financial Engine iniciado"

# 7. Prompt Architect
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 8. Lead Coder
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 9. ZTA Validator
python3 /home/node/.openclaw/workspace/scripts/factory/validation_agent_worker.py &
echo "✅ ZTA Validator Agent iniciado"

# 10. Git Automator
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 11. Executive Summarizer
python3 /home/node/.openclaw/workspace/scripts/factory/summary_agent_worker.py &
echo "✅ Executive Summarizer iniciado"

# 12. Knowledge Manager
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica operando en 12 carriles. ¡Sistemas listos para la entrevista!"
