# GLOSSARY: TECHNICAL VOCABULARY FOR AI ARCHITECTS (CONCENTRIX)

Eduard, usa estas palabras clave para sonar como un Senior Solution Architect especializado en Conversational AI.

---

## 1. CCaaS (CONTACT CENTER AS A SERVICE)
- **AHT (Average Handle Time):** Tiempo promedio de atención (el KPI principal que la IA debe reducir).
- **FCR (First Contact Resolution):** Resolución al primer contacto (lo que la IA debe mejorar).
- **IVR (Interactive Voice Response):** El menú de voz tradicional que la IA conversacional está reemplazando.
- **Handoff (Escalado):** El proceso de pasar de un bot a un agente humano con contexto.
- **Participant Data:** Metadatos adjuntos a una llamada en Genesys/Five9 que pasan información del bot al agente.

## 2. AI & LLM (LLM GATEWAY)
- **RAG (Retrieval-Augmented Generation):** Técnica para dar a la IA acceso a datos externos (Knowledge Bases) para evitar alucinaciones.
- **TTFT (Time To First Token):** Tiempo desde que el usuario habla hasta que la IA empieza a responder (métrica de latencia).
- **Prompt Engineering:** Diseño de instrucciones para el LLM.
- **Agentic AI (AI Agents):** IAs que no solo hablan, sino que ejecutan tareas (ej. "cancela mi pedido") mediante APIs (Herramientas).
- **Token Burn:** Consumo de tokens del LLM (métrica de coste operativo).
- **Vector Database:** Base de datos para búsqueda semántica (Pinecone, MongoDB Atlas Search, Vector Search en GCP).

## 3. INFRAESTRUCTURA & DEVOPS
- **Microservicios (K8s):** Arquitectura de software escalable en contenedores.
- **Event-Driven Architecture:** Diseño donde los sistemas reaccionan a eventos (ej. "llamada entrante").
- **mTLS (Mutual TLS):** Seguridad entre microservicios (autenticación mutua).
- **Observability (Grafana/Prometheus):** Monitoreo en tiempo real del rendimiento de la IA y latencias de API.
- **Serverless (AWS Lambda / Google Cloud Functions):** Ejecución de código sin administrar servidores (ideal para webhooks de CCaaS).

---

## CONSEJO DE SIFU (MODO ARQUITECTO):
- **Usa los acrónimos** (AHT, FCR, RAG, TTFT).
- **Explica el 'Por Qué' detrás de cada término**: *"Al reducir el TTFT mediante streaming, estamos mejorando directamente el CSAT (Customer Satisfaction) de la solución de Concentrix."*

---
*Created by Sifu (Shadow Architect) for Concentrix Interview.*
