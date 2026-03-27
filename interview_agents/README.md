# Sifu's Interview War-Room: Concentrix Project

Este directorio contiene los cerebros (sub-agentes) para la entrevista de Eduard mañana.
Cada agente tiene un enfoque específico basado en el Job Description de "AI Solution Architect – Conversational Platforms".

## Flujo de Trabajo
1.  **Captura (PC):** `standalone_stt.py` captura audio y publica en Redis.
2.  **Puente (PC):** `sifu_listener.py` escucha Redis y envía segmentos a Sifu (Gateway).
3.  **Análisis (Gateway):** Sifu dispara estos agentes en paralelo.

## Agentes
- **Antigravity Architect:** Infraestructura, Cloud, APIs, CCaaS.
- **Stich Designer:** UX/UI de bots, flujos conversacionales, prototipos visuales.
- **Docu Architect:** ROI, Timelines, Business Case, Documentación técnica.
- **Sales Strategist:** Argumentos de venta, identificación de pain points, diferenciación.
