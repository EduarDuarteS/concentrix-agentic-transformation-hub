# Estrategia de Ruteo Multi-Modelo (Cost vs. Reasoning)

En la Fábrica Sifu 5.2, implementamos una estrategia de ruteo dinámico para optimizar el **Token Burn** y maximizar el **Razonamiento Estratégico**.

## 🚀 1. Capa de Triaje (Fast Lane)
- **Modelo:** Gemini 3.1 Flash.
- **Uso:** Clasificación de intenciones, extracción de entidades, auditoría de cumplimiento rápida.
- **Justificación:** Latencia ultra-baja y costo reducido para tareas deterministas.

## 🧠 2. Capa de Diseño (Reasoning Lane)
- **Modelo:** Gemini 3.1 Pro.
- **Uso:** Planificación arquitectónica, generación de código complejo, resolución de conflictos.
- **Justificación:** Capacidad superior de razonamiento para manejar la complejidad de las topologías de CCaaS.

## 🛡️ 3. Protocolo de Fallback
Si el modelo Pro detecta una ambigüedad crítica o un fallo en el build (ZTA), el sistema re-ruta la tarea a un ciclo de reflexión interna (Self-Healing) antes de escalar al arquitecto humano.

---
*Documento de Referencia para la entrevista con Concentrix.*
