#!/bin/bash
echo "📐 Sifu: Lanzando Fábrica de Software Autónoma CCaaS (Sifu 5.2 - FULL STACK RE-ARMED)..."

# 1. Gateway de Eventos (Node.js) - El Corazón
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
echo "✅ Event Gateway iniciado"

# 2. Monitor de Resiliencia - El Guardián
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Monitor de Resiliencia iniciado"

# 3. Orquestador CCaaS (IA Brain) - El Cerebro
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ccaas_orchestrator.py &
echo "✅ CCaaS LangGraph Orchestrator iniciado"

# 4. Prompt Architect - El Optimizador
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 5. Lead Coder - El Músculo
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 6. ZTA Validator - El Auditor de Calidad (NUEVO)
python3 /home/node/.openclaw/workspace/scripts/factory/validation_agent_worker.py &
echo "✅ ZTA Validator Agent iniciado"

# 7. Git Automator - El DevOps
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 8. Executive Summarizer - El Reportero
python3 /home/node/.openclaw/workspace/scripts/factory/summary_agent_worker.py &
echo "✅ Executive Summarizer iniciado"

# 9. Knowledge Manager - El Escriba
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica Autónoma operando en 9 niveles de orquestación."
echo "🎯 Sistema blindado con Zero Trust Architecture (ZTA). ¡Suerte en la batalla, Maestro!"
