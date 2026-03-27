# Manual del Escuadrón de Agentes (Sifu 5.2 NHITL Factory)

Este documento detalla la jerarquía y responsabilidades de los 12 agentes autónomos que operan en nuestra factoría de software para Concentrix.

## 👥 Agentes de Nivel 1: Infraestructura y Red
1.  **Gateway Agent (Node.js/Express):** Orquesta el flujo de mensajes vía WebSockets entre la UI y el bus de eventos.
2.  **Resilience Agent (Python/Redis):** El "Self-Healing Monitor" que auto-sana fallos de red y desincronización de eventos en el bus.

## 👥 Agentes de Nivel 2: Inteligencia Estratégica
3.  **Sifu Meta-Graph Engine:** IA de nivel superior que programa nuevos grafos de LangGraph de forma autónoma.
4.  **IA Architect Brain (LangGraph):** Diseña la topología de la solución y toma decisiones de diseño senior.
5.  **Prompt Architect (Optimizer):** Genera y optimiza los System Prompts para los bots resultantes.
6.  **ROI Financial Engine:** Calcula el impacto en costos y ahorro operativo en tiempo real.

## 👥 Agentes de Nivel 3: Ejecución y Calidad
7.  **Self-Healing Coder:** Analiza logs de error de la terminal y re-programa código roto automáticamente.
8.  **Lead Coder Agent:** Escribe código JSX/Python real en el sistema de archivos del monorepo.
9.  **ZTA Validator Agent:** Ejecuta builds físicos y pruebas de humo para garantizar la integridad del software.
10. **Git Automator Agent:** Gestiona la trazabilidad mediante commits semánticos automáticos.

## 👥 Agentes de Nivel 4: Gobierno y Cierre
11. **Executive Summarizer:** Genera reportes de nivel C-Level sobre el progreso de la sesión.
12. **Knowledge Manager (Notion Sync):** Documenta cada decisión técnica en formato ADR (Architecture Decision Record).

---
*Documentación oficial para el Centro de Excelencia en IA.*
