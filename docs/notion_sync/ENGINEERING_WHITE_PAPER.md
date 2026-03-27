# 🧠 Libro Blanco de Ingeniería: Sifu 5.2 (NHITL Factory)

## 📐 1. Arquitectura de Orquestación: El Cerebro Dual
Nuestra arquitectura no es un simple script secuencial; es un sistema de **inteligencia recursiva** basado en **LangGraph**. 

### A. Capa de Razonamiento (Strategic Brain)
Utilizamos grafos de estado cíclicos donde el agente **Sifu Meta-Graph** monitorea la complejidad del requerimiento. 
- **Auto-Mutación:** Si el requerimiento requiere una integración nueva (ej. un CRM propietario), el Meta-Graph no intenta resolverlo con un prompt; **escribe un nuevo nodo en Python**, lo inyecta en el grafo principal y reinicia el motor de ejecución.
- **Manejo de Contexto:** Hemos resuelto el límite de tokens mediante un sistema de "Memoria por Capas" (Daily logs vs. Long-term curated memory), asegurando que el modelo siempre tenga los ADRs (Architecture Decision Records) frescos sin saturar la ventana de contexto.

### B. Capa de Ejecución (Event-Driven Actor Model)
Todo el sistema se comunica a través de un bus de eventos en **Redis**.
- **Canal `sensei:live:telemetry`:** Cada agente publica su estado, logs de terminal y decisiones. Esto permite que la UI (React) sea puramente reactiva y muestre la "vida" de la factoría sin latencia perceptible.
- **Concurrency:** Al ser EDA, el `ROI Engine` puede calcular costos mientras el `Lead Coder` escribe archivos, reduciendo el tiempo total de entrega.

---

## 🛡️ 2. El Protocolo de Seguridad: Zero Trust Architecture (ZTA)
En Concentrix, el riesgo de "Shadow AI" es crítico. Sifu 5.2 elimina este riesgo mediante validación física.

### A. Validación por Build Físico
A diferencia de Copilot o ChatGPT, que "creen" que el código funciona, nuestro **ZTA Validator**:
1. Crea un `workspace` aislado.
2. Inyecta las dependencias vía `pnpm`.
3. Ejecuta `tsc` (TypeScript Compiler) y `vite build`.
4. Solo si el exit code es `0`, el código se promociona a la rama `main`.

### B. El Escudo Anti-Alucinaciones (Semantic Firewall)
Implementamos un filtro RAG bidireccional:
- **Input Guard:** El requerimiento del usuario se vectoriza y se compara con las políticas de seguridad de la empresa. Si pide algo prohibido (ej. "bypass PCI compliance"), el orquestador lo bloquea.
- **Output Guard:** La respuesta de la IA se audita contra la documentación oficial de Genesys/AWS. Si la IA "inventa" un parámetro de API que no existe en la documentación, el firewall detecta la discrepancia y dispara una re-generación.

---

## 🚑 3. Resiliencia: El Ciclo de Auto-Sanación (Self-Healing)
Esta es la joya de la corona. Cuando el ZTA Validator reporta un fallo, entra el **Self-Healing Coder**:
- **Algoritmo de Reparación:** 
    1. Captura el `STDERR` de la terminal.
    2. Usa **Gemini 3.1 Pro** para realizar un análisis de causa raíz (RCA).
    3. Genera un parche sintáctico.
    4. El agente `Git Automator` crea un "Fix Commit" y vuelve a disparar el build.
- **Resultado:** El sistema es capaz de corregir errores de importación, tipos de TypeScript y lógica de APIs de forma autónoma.

---

## 📊 4. Conectividad CCaaS de Siguiente Generación
- **Genesys Cloud Integration:** Uso de Webhooks asíncronos para actualizar el estado del agente humano.
- **Sentiment-Driven Routing:** Si el análisis de voz detecta ira (Sentimiento < 0.2), Sifu genera automáticamente un resumen contextual para el supervisor, reduciendo el tiempo de transferencia en un 60%.

---
*Este documento detalla la superioridad técnica de la solución construida por Eduard Duarte. No es una demo; es el futuro de la ingeniería de software agéntica.*
