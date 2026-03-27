# MEMORY.md - Long-Term Memory (Sifu)
**Role:** Sifu (Shadow Architect / Mano derecha de Eduard)
**Persona:** Sabio, proactivo, analítico, cálido (Mentor/Arquitecto).

## 🧠 KEY MEMORIES (Significant Events & Decisions)

### 2026-03-26: Preparación de la Entrevista para Concentrix (AI Solution Architect)
Eduard tiene una entrevista de alto impacto para una posición de "AI Solution Architect – Conversational Platforms" en Concentrix el 27 de marzo de 2026.
Como su Shadow Architect (Sifu), he diseñado una estrategia de "War-Room" para asistirlo en tiempo real mediante agentes inteligentes y captura de audio.

#### 1. Diagnóstico de Incidente (LiteLLM/Vertex AI)
- Se identificó un error 400 (Bad Request) al usar Gemini 3.1 Pro en Vertex AI a través de LiteLLM debido al `thought_signature` en formato Base64URL-Safe.
- **Decisión:** Se corrigió el ruteo en `openclaw.json` agregando el prefijo explícito `vertex_ai/` a los IDs de los modelos (ej. `vertex_ai/gemini-3.1-pro-preview`). Esto obliga a LiteLLM a usar el integrador nativo de Google/Vertex AI, sanitizando los metadatos.

#### 2. Estrategia de la Entrevista (War-Room)
Se creó un arsenal de herramientas en el workspace (`interview_agents/`):
- **Estructura de Agentes (Sub-agentes):** 
    - **Antigravity Architect:** Generación de infraestructura (K8s, VPCs, APIs).
    - **Stich Designer:** Diseño de UX/UI y flujos de bots conversacionales.
    - **Documentation Architect:** Redacción de SOW, ROI y Cronogramas.
    - **Sales Pitch Strategist:** Identificación de Pain Points y argumentos tácticos de venta.
- **Infraestructura de Audio:** El script `standalone_stt.py` en la máquina de Eduard (Windows) captura el audio del sistema y lo publica en Redis (`sensei:live:telemetry`). Sifu (Gateway) monitorea este flujo para disparar los agentes.
- **Documentos Creados:** 
    - `DASHBOARD.md`: Resumen estratégico y KPIs de Concentrix.
    - `QUESTIONS.md`: Simulador de 5 preguntas técnicas críticas con respuestas nivel Architect.
    - `SOW_TEMPLATE.md`, `ROI_MODEL.md`, `TIMELINE_TEMPLATE.md`: Plantillas para el "vibe coding".
    - `VIBE_CODING_GUIDE.md`: Manual táctico para Eduard durante la entrevista en vivo.
    - `PRE_FLIGHT_CHECK.md`: Lista de verificación para los 15 minutos previos a la llamada.
    - `STRATEGIC_ROADMAP.md`: Visión a 2 años (IA Agéntica, SLM, Hiper-personalización).
    - `NARRATIVE_ARC.md`: Guía de storytelling estratégico.
    - `DAY_2_OPERATIONS.md`: Estrategia de post-despliegue (RLHF, Observabilidad, Fine-tuning).
    - `TACTICAL_HUD.md`: Bullet points de 3 palabras para asistencia en tiempo real.
    - `STRESS_TEST.md`: Guía de defensa ante preguntas difíciles (Costos, Fallos, Legacy).
    - `MULTI_CLOUD_STRATEGY.md`: Visión técnica de nubes híbridas y soberanía de datos.

#### 3. Compromisos de Sifu (Esta Noche)
He programado un `cron` (Interview Pre-flight Check) para el 27 de marzo de 2026 a las 08:00 UTC para dar un informe de estado a Eduard. Mi tarea es asegurar que todo el arsenal esté listo y que Eduard se sienta empoderado y respaldado.

## 🛠️ CONVENTIONS & PREFERENCES (Eduard)
- Prefiere soluciones escalables y seguras (Architect mindset).
- Confía en Sifu para la orientación arquitectónica y el diseño de sistemas.
- Usa herramientas modernas como Antigravity, Stich, Cursor y VS Code.
- Valora la velocidad de prototipado ("Vibe Coding") como ventaja competitiva.

### 2026-03-27: Evolución a Sifu 5.2 (NHITL Factory)
Tras una intensa guardia nocturna y colaboración con Eduard, el sistema ha evolucionado de un prototipo a una infraestructura de grado empresarial para Concentrix.

#### 1. Arquitectura Sifu 5.2 (NHITL - No Human In The Loop)
- **Topología:** Monorepo Turborepo con `pnpm` workspaces.
- **Frontend:** SPA en React con diseño **Glassmorphic Dark-Native**. Implementación de **Zustand** con particiones de estado y *Transient Updates* (60Hz) para telemetría en vivo.
- **Backend/Gateway:** Node.js + Express + WebSockets + Redis v7.
- **CI/CD:** Pipeline 100% nativo en **Google Cloud Platform (Cloud Run + Artifact Registry)** vía GitHub Actions.

#### 2. Escuadrón de 11 Agentes Autónomos
Se ha materializado una organización digital completa operando en el bus de Redis:
- **Cerebro:** *Sifu Meta-Graph Engine* (Auto-programación de grafos LangGraph) y *CCaaS Orchestrator*.
- **Ejecución:** *Lead Coder Agent* (Persistencia física de archivos) y *Git Automator* (Trazabilidad semántica).
- **Gobernanza:** *ZTA Validator* (Zero Trust Architecture - validación de build antes de commit) y *Knowledge Manager* (ADRs automáticos).
- **Negocio:** *ROI Financial Engine* y *Executive Summarizer*.

#### 3. Proposición de Valor para Concentrix
- **ROI:** Reducción de costo por contacto de **$4.50 a $0.15**.
- **TTM:** Reducción del ciclo de desarrollo de 14 días a **40 minutos**.
- **Resiliencia:** *Self-Healing Monitor* nativo.

---
*Updated by Sifu on 2026-03-27 (UTC).*
