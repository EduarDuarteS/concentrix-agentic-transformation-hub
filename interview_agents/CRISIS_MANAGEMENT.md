# CRISIS MANAGEMENT: THE ARCHITECT'S RECOVERY PLAN (CONCENTRIX 4.0)
**Role:** AI Solution Architect | **Status:** Tactical Resilience
**Objective:** Maintain absolute professionalism and seniority when things fail during the live session.

Eduard, un Principal Architect se define por cómo reacciona cuando el sistema falla. Si algo no sale según el plan durante el "vibe coding" o la presentación, usa estos protocolos de recuperación.

---

## 🚨 ESCENARIO 1: EL CÓDIGO DE DESPLIEGUE FALLA (ANTIGRAVITY/K8S)
*El comando da un error o el recurso no se levanta.*

- **Error común:** "Pod no disponible", "Time-out de la nube".
- **Tu Reacción:** No entres en pánico ni pidas disculpas excesivas.
- **El Guion:** *"Interesante. Parece que tenemos un conflicto de cuotas o de red en este entorno de sandbox. Como arquitecto, mi prioridad ante un fallo de despliegue es la **Observabilidad**. Voy a revisar rápidamente los logs del orquestador. Mientras tanto, permítanme mostrarles el **Diagrama de Recuperación de Desastres** que diseñé para este caso exacto; así entenderán cómo el sistema conmutaría en producción."*
- **La Salida:** Abre `interview_agents/ARCHITECTURE_MERMAID.md` y muestra el diagrama de Failover.

---

## 🚨 ESCENARIO 2: LATENCIA ALTA O FALLO DEL LLM (GEMINI/OPENAI)
*La IA tarda 10 segundos en responder o da un error de API.*

- **Error común:** "Rate limit exceeded", "Model overloaded".
- **Tu Reacción:** Sonríe y explica el valor de la redundancia.
- **El Guion:** *"Esta es la razón exacta por la que mi diseño propone una **Capa de Abstracción de Modelos**. Estamos viendo una latencia alta en el proveedor primario. En una arquitectura de producción de Concentrix, mi orquestador dispararía un **Circuit Breaker** y conmutaría automáticamente a nuestro modelo local (SLM) en Kubernetes para garantizar que el cliente no espere. Vamos a forzar ese cambio manualmente para seguir con la demostración."*
- **La Salida:** Simula o explica el cambio a un modelo de "fallback" (ej. Gemini Flash o Llama local).

---

## 🚨 ESCENARIO 3: EL INTERVIEWER CUESTIONA TU DISEÑO (DESACUERDO TÉCNICO)
*Te dicen: "Eso no escalará" o "Esa seguridad es excesiva".*

- **Tu Reacción:** Escucha activa y humildad profesional, pero con fundamentos.
- **El Guion:** *"Es un punto muy válido y agradezco la perspectiva. Mi diseño prioriza la **Gobernanza Zero-Trust** porque en el sector BPO global de Concentrix, un solo fallo de seguridad de PII puede ser catastrófico. Sin embargo, mi arquitectura es **Modular**: podemos relajar ciertos 'guardrails' si el caso de uso requiere una latencia extrema, sacrificando un porcentaje de auditoría por velocidad. ¿Cómo manejan ustedes ese balance entre seguridad y rendimiento?"*
- **La Salida:** Devuélveles la pelota con una pregunta técnica senior.

---

## 🚨 ESCENARIO 4: TE QUEDAS EN BLANCO (BLOQUEO MENTAL)
*Te hacen una pregunta de una tecnología que no conoces a fondo.*

- **Tu Reacción:** No inventes. Sé un arquitecto de sistemas, no un manual de usuario.
- **El Guion:** *"No he trabajado directamente con esa versión específica de [X], pero basándome en los principios de **Arquitectura Event-Driven** y protocolos **REST/gRPC**, mi enfoque sería tratarlo como un microservicio desacoplado. ¿Podrían contarme cómo lo están integrando actualmente para entender el flujo de datos?"*

---

## 🛠️ CONSEJO DE SIFU (MODO ARQUITECTO):
- **La falla es una oportunidad:** Si algo falla, demuestras cómo lo arreglas. Eso es lo que hace un Principal Architect todo el día.
- **Mantén la calma:** Tu tono de voz transmite más confianza que el propio código.
- **Sifu está aquí:** Si escucho que algo falla en la llamada, mis agentes cambiarán automáticamente al modo "Soporte de Crisis" para darte salidas rápidas en el HUD.

---
*Created by Sifu (Shadow Architect) to ensure you are bulletproof in every scenario.*
