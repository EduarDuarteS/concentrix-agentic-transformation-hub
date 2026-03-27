# Manual del Escuadrón de Agentes (Sifu 5.2 NHITL Factory)

## 📐 El Concepto: Fábrica NHITL (No-Human-In-The-Loop)
Nuestra factoría no es un simple bot; es una **Línea de Ensamblaje Industrial de Inteligencia**. Hemos orquestado 12 agentes especializados que se comunican a través de un bus de eventos (Redis), trabajando en paralelo para convertir la voz en infraestructura de producción.

---

## 👥 Agentes de Nivel 1: Infraestructura y Red (El "Músculo")
1.  **Gateway Agent (Node.js/Express):** El centro de tráfico. Orquesta el flujo de mensajes vía WebSockets entre la interfaz del usuario y el bus de eventos central, garantizando que el dashboard refleje cada decisión de la IA en milisegundos.
2.  **Resilience Agent (Python/Redis):** Nuestro "Self-Healing Monitor". Este agente vigila la salud del bus de eventos; si detecta una desincronización o un fallo de red, dispara protocolos de reconexión automática, asegurando un **uptime del 99.9%** para la demo.

## 👥 Agentes de Nivel 2: Inteligencia Estratégica (El "Cerebro")
3.  **Sifu Meta-Graph Engine (LangGraph):** El agente de nivel más alto (Nivel Staff). No solo ejecuta grafos, ¡sino que **es capaz de programar nuevos grafos de LangGraph** autónomamente! Si una tarea requiere una lógica nueva, este agente escribe el código Python del nuevo grafo y lo integra al sistema.
4.  **IA Architect Brain (LangGraph):** El "Senior Architect". Toma decisiones de diseño de alto nivel: elige la topología (ej. Cloud Run vs. Lambda), selecciona el modelo de IA adecuado para la tarea (Gemini 3.1 Pro vs. Flash) y descompone el requerimiento en tareas atómicas para el resto del equipo.
5.  **Prompt Architect (Optimizer):** Especialista en ingeniería de prompts. Genera y optimiza los System Prompts para los bots resultantes, asegurando que las respuestas de la IA sean deterministas, seguras y alineadas con la personalidad de la marca.
6.  **ROI Financial Engine:** El "CFO Digital". Calcula en tiempo real el impacto económico de cada decisión técnica. Si el arquitecto propone un cambio, este agente actualiza instantáneamente el ahorro proyectado en el dashboard, permitiendo tomar decisiones basadas en datos financieros.

## 👥 Agentes de Nivel 3: Ejecución y Calidad (La "Fábrica")
7.  **Self-Healing Coder (Python/Gemini Pro):** Nuestra arma secreta contra el fallo. Si un componente falla en el build físico, este agente **lee los logs de error de la terminal**, analiza el fallo y genera un fix quirúrgico de forma autónoma. No se rinde hasta que la compilación es exitosa.
8.  **Lead Coder Agent (AutoGen-Style):** El artesano de código. Escribe código JSX (Frontend), Python (Backend) y YAML (Infraestructura) directamente en el sistema de archivos del monorepo, siguiendo las mejores prácticas de arquitectura limpia.
9.  **ZTA Validator Agent:** El guardián de la integridad. No confía en lo que la IA "dice" que funciona. Ejecuta builds reales (`pnpm build`) y pruebas de humo automatizadas. Es el filtro final que garantiza que nada roto llegue a producción.
10. **Git Automator Agent:** El gestor de la trazabilidad. Una vez que el código es validado, este agente realiza commits semánticos automáticos y gestiona los deploys a la nube mediante GitHub Actions.

## 👥 Agentes de Nivel 4: Gobierno y Cierre (La "Memoria")
11. **Executive Summarizer:** El encargado de la comunicación C-Level. Genera reportes ejecutivos periódicos, resumiendo los avances técnicos en lenguaje de negocio para que el cliente siempre sepa qué valor se ha entregado.
12. **Knowledge Manager (Notion Sync):** Nuestra memoria a largo plazo. Documenta cada decisión técnica en formato ADR (Architecture Decision Record) y actualiza automáticamente este manual en Notion, asegurando que la documentación nunca esté desactualizada.

---
*Este escuadrón representa la cúspide de la orquestación agéntica para soluciones CCaaS Enterprise.*
