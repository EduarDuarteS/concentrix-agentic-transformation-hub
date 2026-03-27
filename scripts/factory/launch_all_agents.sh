#!/bin/bash
echo "📐 Sifu: Lanzando Fábrica de Software Autónoma CCaaS (Sifu 5.2 - ULTIMATE EDITION)..."

# 1. Gateway de Eventos (Node.js)
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
echo "✅ Event Gateway (Express/WS) iniciado"

# 2. Monitor de Resiliencia
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Resilience Engine iniciado"

# 3. Orquestador CCaaS (IA Brain)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ccaas_orchestrator.py &
echo "✅ CCaaS LangGraph Orchestrator iniciado"

# 4. ROI Financial Engine (NUEVO)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_roi_engine.py &
echo "✅ ROI Financial Engine iniciado"

# 5. Prompt Architect
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 6. Lead Coder
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 7. ZTA Validator
python3 /home/node/.openclaw/workspace/scripts/factory/validation_agent_worker.py &
echo "✅ ZTA Validator Agent iniciado"

# 8. Git Automator
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 9. Executive Summarizer
python3 /home/node/.openclaw/workspace/scripts/factory/summary_agent_worker.py &
echo "✅ Executive Summarizer iniciado"

# 10. Knowledge Manager
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica Autónoma operando en 10 carriles simultáneos."
echo "🎯 La infraestructura de mayor fidelidad técnica para Concentrix está LISTA."
