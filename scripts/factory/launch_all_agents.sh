#!/bin/bash
echo "📐 Sifu: Lanzando Fábrica de Software Autónoma CCaaS (Sifu 5.2 - CONCENTRIX EDITION)..."

# 1. Gateway de Eventos (Node.js)
cd /home/node/.openclaw/workspace/apps/gateway && ts-node index.ts &
echo "✅ Event Gateway iniciado"

# 2. Monitor de Resiliencia
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
echo "✅ Monitor de Resiliencia iniciado"

# 3. Orquestador CCaaS (LangGraph - Voice Optimized)
python3 /home/node/.openclaw/workspace/scripts/factory/sifu_ccaas_orchestrator.py &
echo "✅ CCaaS LangGraph Orchestrator iniciado"

# 4. Prompt Architect (Ingeniería de Prompts para IVR)
python3 /home/node/.openclaw/workspace/scripts/factory/prompt_agent_worker.py &
echo "✅ Prompt Architect Agent iniciado"

# 5. Lead Coder (Escritura de conectores SIP/Webhooks)
python3 /home/node/.openclaw/workspace/scripts/factory/coder_agent_worker.py &
echo "✅ Lead Coder Agent iniciado"

# 6. Git Automator (DevOps)
python3 /home/node/.openclaw/workspace/scripts/factory/git_agent_worker.py &
echo "✅ Git Automator Agent iniciado"

# 7. Executive Summarizer (Resumen de la Sesión)
python3 /home/node/.openclaw/workspace/scripts/factory/summary_agent_worker.py &
echo "✅ Executive Summarizer iniciado"

# 8. Knowledge Manager (ADRs)
python3 /home/node/.openclaw/workspace/scripts/factory/docu_agent_worker.py &
echo "✅ Knowledge Manager iniciado"

echo "🚀 Fábrica CCaaS operando en 8 niveles. Listo para transformar la experiencia del cliente."
