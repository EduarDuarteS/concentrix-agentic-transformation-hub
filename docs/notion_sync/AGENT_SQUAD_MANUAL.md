# 👥 Manual del Escuadrón de Agentes (NHITL Factory 5.2)

Nuestra factoría opera con 12 especialistas digitales coordinados asíncronamente. Aquí el detalle de su "ADN" técnico y funcional:

---

## 🏗️ Nivel 1: Infraestructura y Red (El Sistema Nervioso)

### 1. Gateway Agent (Node.js/Express/WS)
- **Función:** Puente de baja latencia entre la UI y el cerebro de IA.
- **Valor:** Gestiona la telemetría en vivo. Si el bus físico falla, activa un **Mock Bus** interno para garantizar la continuidad de la demo.

### 2. Resilience Agent (Python/Redis)
- **Función:** El "Heartbeat" del sistema. Vigila la integridad de los mensajes en el bus de Redis.
- **Valor:** Asegura que los 12 agentes hablen el mismo idioma sin colisiones de datos.

---

## 🧠 Nivel 2: Inteligencia Estratégica (El Cerebro)

### 3. Sifu Meta-Graph Engine (LangGraph/Python)
- **Función:** El arquitecto de nivel Staff. Su capacidad es la **Auto-Programación**.
- **Logro:** Si el sistema detecta un requerimiento para el que no fue programado, este agente escribe un nuevo grafo de LangGraph en Python y lo reinicia. ¡Es una IA que extiende su propio cerebro!

### 4. IA Architect Brain (LangGraph/Gemini 3.1 Pro)
- **Función:** Toma de decisiones de alto nivel. Selecciona el Stack tecnológico (Cloud Run, VPCs, DBs) y diseña la topología de la solución.
- **Valor:** Garantiza que el código generado siga patrones **SOLID** y arquitecturas limpias.

### 5. ROI Financial Engine
- **Función:** El "CFO Digital". Calcula en tiempo real el ahorro proyectado de cada cambio técnico.
- **Valor:** Permite al Arquitecto justificar el gasto en tokens vs. el ahorro en OPEX de la operación.

---

## 🛠️ Nivel 3: Ejecución y Calidad (La Fábrica)

### 6. Lead Coder Agent (AutoGen Style)
- **Función:** Escritura física de archivos. Domina JSX, TypeScript y Python.
- **Valor:** Traduce el plano del Arquitecto en código real, persistido en el sistema de archivos del monorepo.

### 7. Self-Healing Coder (Gemini 3.1 Pro)
- **Función:** El "Cirujano" de código. Escucha los fallos del compilador.
- **Diferenciador:** Lee los logs de error de la terminal, entiende por qué falló el build y **aplica un fix quirúrgico en segundos**. Sin intervención humana.

### 8. ZTA Validator Agent
- **Función:** Auditor de seguridad y compilación. Ejecuta `npm build` y scan de vulnerabilidades.
- **Valor:** Es el muro de contención que garantiza que el código sea seguro antes de llegar a la nube.

---

## 📜 Nivel 4: Gobierno y Cierre (La Memoria)

### 9. Knowledge Manager (Notion Sync)
- **Función:** Documentación viva. Genera ADRs (Architecture Decision Records) automáticamente.
- **Valor:** Elimina la brecha entre el código y la documentación. Todo cambio técnico queda registrado.

### 10. Executive Summarizer
- **Función:** Traductor de negocio. Genera los "Post-Meeting Reports" para el C-Level.
- **Valor:** Asegura que los patrocinadores del proyecto entiendan el progreso sin ver una sola línea de código.

---
*Este escuadrón es el que Eduard Duarte orquesta para transformar el CX en Concentrix.*
