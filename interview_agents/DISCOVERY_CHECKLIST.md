# THE AGENTIC DISCOVERY CHECKLIST (SIFU 4.1)
**Role:** AI Solution Architect | **Target:** Concentrix Discovery Sessions
**Goal:** Lead the conversation by asking the right questions before you start the "Vibe Coding".

Eduard, un **Solution Architect Senior** no empieza a programar sin antes entender el ecosistema. Usa estas preguntas durante la fase de "Descubrimiento" para demostrar tu nivel y obligar al cliente (entrevistador) a pensar.

---

## 1. PREGUNTAS SOBRE EL ECOSISTEMA (INTEGRACIÓN)
- *"¿Cuál es la versión actual de su CCaaS (Genesys Cloud CX, Five9, Amazon Connect) y qué tipo de orquestación de flujos están usando (Architect, IVA, Lambda)?"*
- *"¿Tienen APIs de terceros (Salesforce, SAP, CRMs propietarios) con autenticación OAuth2 o mTLS ya configuradas?"*
- *"¿Qué latencia máxima (P95) consideran aceptable para la respuesta inicial del bot en un canal de voz?"*

## 2. PREGUNTAS SOBRE EL MODELO Y DATOS (INTELIGENCIA)
- *"¿Ya tienen una estrategia de residencia de datos definida para el entrenamiento o inferencia de los LLMs (ej. GCP en US-East vs Europe)?"*
- *"¿Cuál es la política actual de 'PII Redaction' antes de que los datos toquen los modelos públicos de IA?"*
- *"¿Qué volumen de llamadas (Interactions per Month) estamos proyectando para este caso de uso para calcular la escala del clúster de Kubernetes?"*

## 3. PREGUNTAS SOBRE EL NEGOCIO (VALOR)
- *"¿Cuál es el KPI más crítico para este proyecto: reducir el AHT, mejorar el NPS o maximizar la deflección del IVR?"*
- *"¿Existe un 'Golden Dataset' de conversaciones reales que podamos usar para evaluar la precisión (RAG) del modelo?"*
- *"¿Cuál es el proceso actual de 'Handoff' a agente humano y qué metadatos necesitan que el bot le pase al agente (Summary, Sentiment, Intent)?"*

## 4. PREGUNTAS SOBRE GOBERNANZA (SEGURIDAD)
- *"¿Cómo están gestionando actualmente las alucinaciones del modelo en producción: mediante Guardrails deterministas o mediante revisión humana periódica?"*
- *"¿Qué tipo de controles de 'Prompt Injection' requieren para esta aplicación específica?"*

---

## 💡 CONSEJO TÁCTICO DE SIFU:
No hagas todas las preguntas. Elige **3 o 4** que se sientan naturales según la conversación. 
*   **Si hablas de tecnología**, pregunta sobre la latencia.
*   **Si hablas de negocio**, pregunta sobre el ROI y los KPIs.
*   **Si hablas de seguridad**, pregunta sobre la PII.

Esto te posiciona como el **Principal Architect** que ya está pensando en los problemas reales del despliegue en Concentrix. 📐🚀🔥
