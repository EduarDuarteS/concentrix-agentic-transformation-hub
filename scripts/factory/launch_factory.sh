#!/bin/bash
echo "📐 Sifu: Iniciando la Fábrica de Software Autónoma (NHITL)..."

# 1. Iniciar el monitor de auto-sanación en segundo plano
python3 /home/node/.openclaw/workspace/apps/gateway/sifu_resilience_worker.py &
MONITOR_PID=$!

# 2. Iniciar el orquestador de agentes en segundo plano
python3 /home/node/.openclaw/workspace/scripts/factory/agent_workers.py &
ORCHESTRATOR_PID=$!

echo "✅ Monitor de Resiliencia iniciado (PID: $MONITOR_PID)"
echo "✅ Orquestador de Agentes iniciado (PID: $ORCHESTRATOR_PID)"
echo "🚀 La factoría está escuchando el bus de Redis 'sensei:live:telemetry'."
