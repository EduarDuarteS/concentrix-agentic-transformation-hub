# Especificación Base de Dominio (spec.md)
**Proyecto:** Concentrix Agentic Transformation Hub
**Firma Arquitectónica:** Antigravity Manager

## 1. Visión Holística
El Hub es una plataforma React SPA impulsada por eventos, capaz de operar bajo el paradigma NHITL (Non-Human in the Loop). Actúa como la "Cara Visible" de un orquestador LangGraph subyacente que reacciona de forma asíncrona a través de Redis. La meta es demostrar un despliegue optimizado en GCP que maximice el ROI mediante una rápida adaptabilidad de agentes de inteligencia.

## 2. Topología del Frontend (Región de Aislamiento UI)
La SPA se segmenta bajo un esquema estricto de RBAC (Role-Based Access Control) en tres recintos de estado:
1. **Command Center:** Consola de operaciones (Admin). Visualiza el "Self-Healing Monitor", maneja escalados (fallbacks manuales) e invoca intervenciones sobre los workers en Redis.
2. **Business Dashboard:** Consola de observabilidad (Ejecutivos). Agrega telemetría del sistema para mapear ahorro de costos (ROI), con interfaces de solo lectura de alta frecuencia.
3. **Live Canvas:** Panel de iteración en tiempo real. Un lienzo donde se puede inyectar eventos de prueba a la red Redis y observar el *trace* paso a paso de LangGraph vía WebSockets.

## 3. Protocolo de Desacoplamiento (EDA Foundation)
- El frontend **nunca** invoca lógicas de LangGraph mediante llamadas HTTP síncronas bloqueantes.
- Todo intercambio humano-agente es un evento: `TIPO_EVENTO` + `PAYLOAD (Validado por Zod)`.
- El flujo es: `React (Emisor)` -> `Node Gateway (WS/HTTP)` -> `Redis (Broker)` -> `LangGraph Worker (Consumidor)`.

## 4. Gobernanza del Código y Living Docs
Según el esquema Dual-Key:
- Esta especificación alimenta de forma inmediata un posterior archivo `plan.md`.
- Toda alteración arquitectónica ejecutada por Claude (en Backend) debe estar sincronizada localmente con los archivos de la serie `docs/architecture/` (Living Documentation policy) antes del respectivo Commit.
