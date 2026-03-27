# CCaaS CHEAT SHEET: GENESYS, FIVE9 & AMAZON CONNECT

Eduard, el JD menciona estas tres plataformas específicamente. Aquí tienes los conceptos clave que debes dominar para sonar como un experto en integraciones.

---

## 1. GENESYS CLOUD CX
- **Arquitectura:** API-First, Cloud-Native.
- **Integración de IA:** Genesys Cloud **Architect** es la herramienta de diseño de flujos.
- **Webhooks:** Utiliza "Data Actions" para llamar a APIs externas (tu orquestador de IA).
- **Handoff:** Se maneja mediante la transferencia a una "Queue" (cola) con "Participant Data" (donde pegas el resumen de la IA).
- **Keyword clave:** *"Genesys Cloud Data Actions"* y *"Architect Flows"*.

## 2. FIVE9
- **Arquitectura:** Enfoque fuerte en Intelligent Virtual Apps (IVA).
- **Integración de IA:** **Inference Solutions** (adquirida por Five9) es el motor de sus bots.
- **Webhooks:** "Cloud Connectors" permiten la integración con microservicios externos.
- **Handoff:** Soporta "Agent Desktop Toolkit" para pasar datos del bot al agente en tiempo real.
- **Keyword clave:** *"Five9 IVA (Intelligent Virtual Agent)"* y *"Cloud Connectors"*.

## 3. AMAZON CONNECT
- **Arquitectura:** Integración nativa con el ecosistema AWS (Lex, Lambda, Polly).
- **Integración de IA:** **Amazon Lex** es el motor NLU por defecto.
- **Webhooks:** Se usan funciones **AWS Lambda** dentro de los "Contact Flows".
- **Handoff:** "Contact Lens" proporciona análisis de sentimiento en tiempo real.
- **Keyword clave:** *"Contact Flows"* y *"Lambda Integration"*.

---

## ESTRATEGIA TRANSVERSAL (EL "SIFU ORCHESTRATOR")
No importa el CCaaS, tu propuesta debe ser:
1.  **Agnóstica:** "Mi arquitectura de orquestación de IA se comunica vía REST/Webhooks, lo que nos permite integrarnos con Genesys, Five9 o Amazon Connect indistintamente."
2.  **Streaming:** "Usamos sockets para manejar el streaming de audio/texto y reducir la latencia (TTFT) al mínimo."
3.  **Segura:** "Toda la PII se queda en nuestra capa de seguridad antes de tocar el LLM público."

---
*Created by Sifu (Shadow Architect) for Concentrix Interview.*
