# 👥 Manual del Escuadrón de Agentes: Operación Sifu 5.2 (NHITL)

Nuestra factoría no es una colección de prompts; es un equipo de **especialistas digitales** coordinados por un bus de eventos de baja latencia. Aquí detallamos la lógica de cada uno:

---

## 🏗️ Nivel 1: Infraestructura y Red (El Sistema Nervioso)

### 1. Gateway Agent (Node.js/Express/WS)
- **Función:** El orquestador de tráfico. Mantiene un túnel de WebSockets bidireccional entre la interfaz del usuario y el backend.
- **Valor:** Asegura que los eventos de la IA (logs, ROI, código) se vean en tiempo real sin recargar la página. Si Redis falla, tiene un **Mock Bus** de emergencia para que la demo nunca se detenga.

### 2. Resilience Agent (Python/Redis)
- **Función:** El monitor de salud del bus. Vigila que no existan colisiones de mensajes y auto-repara el enlace de Redis si detecta latencia > 500ms.
- **Valor:** Garantiza que la "conversación" entre los otros 10 agentes sea fluida y resiliente.

---

## 🧠 Nivel 2: Inteligencia Estratégica (El Cerebro)

### 3. Sifu Meta-Graph Engine (LangGraph/Python)
- **Función:** El arquitecto de nivel superior. Su tarea es la **auto-programación**. Si el requerimiento del usuario supera los grafos actuales, este agente escribe código Python para extender el sistema dinámicamente.
- **Valor:** Convierte a la factoría en un sistema evolutivo, no estático.

### 4. IA Architect Brain (LangGraph/Gemini 3.1 Pro)
- **Función:** Toma decisiones de diseño senior. Decide qué servicios de GCP usar, qué esquemas de datos son óptimos y cómo segmentar el código para máxima mantenibilidad.
- **Valor:** Aplica patrones de diseño (SOLID, Clean Architecture) de forma automática.

### 5. ROI Financial Engine
- **Función:** El "CFO digital". Analiza cada decisión técnica y calcula el impacto en el **Costo por Resolución (CPR)**.
- **Valor:** Permite que el Arquitecto (Eduard) justifique sus decisiones no solo con técnica, sino con ahorros financieros proyectados en tiempo real.

---

## 🛠️ Nivel 3: Ejecución y Calidad (La Fábrica)

### 6. Lead Coder Agent (AutoGen Style)
- **Función:** Escribe el código físico. Está entrenado en **Vite, React y Node.js**. No genera fragmentos; genera archivos completos listos para producción.
- **Valor:** Velocidad de desarrollo 100x superior a un humano.

### 7. Self-Healing Coder (Gemini 3.1 Pro)
- **Función:** El cirujano de código. Si el build falla, este agente analiza el log de la terminal, entiende el error (ej. falta un import o un error de tipos) y **aplica el fix automáticamente**.
- **Valor:** Elimina el ciclo manual de "debug-fix-deploy". El sistema se repara solo antes de que lo notes.

### 8. ZTA Validator Agent
- **Función:** El guardián de seguridad. Ejecuta builds físicos y auditorías de seguridad (Scaneo de PII).
- **Valor:** Garantiza que nada roto o inseguro llegue a la rama principal. Es el corazón de la **Zero Trust Architecture**.

---

## 📜 Nivel 4: Gobierno y Cierre (La Memoria)

### 9. Knowledge Manager (Notion Sync)
- **Función:** Documenta cada paso. Genera ADRs (Architecture Decision Records) y actualiza este manual en Notion.
- **Valor:** Trazabilidad total. El cliente siempre sabe *qué* se hizo y *por qué*.

### 10. Executive Summarizer
- **Función:** Traduce la técnica a lenguaje de negocio. Genera los reportes para el C-Level al finalizar cada sesión.
- **Valor:** Facilita la comunicación con stakeholders no técnicos.

---
*Este escuadrón representa la cúspide de la orquestación agéntica para soluciones CCaaS Enterprise.*
