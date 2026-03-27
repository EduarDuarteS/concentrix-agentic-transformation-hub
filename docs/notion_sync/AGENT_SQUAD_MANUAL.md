# Manual del Escuadrón de Agentes (Sifu 5.2 NHITL Factory)

Este documento detalla la jerarquía y responsabilidades de los 10 agentes autónomos que operan en nuestra factoría de software para Concentrix.

## 👥 Agentes de Nivel 1: Infraestructura y Red
1.  **Gateway Agent (Node.js/Express):** Orquesta el flujo de mensajes vía WebSockets entre la UI y el bus de eventos.
2.  **Resilience Agent (Python/Redis):** El "Self-Healing Monitor" que auto-sana fallos de red y desincronización de eventos.

## 👥 Agentes de Nivel 2: Inteligencia Estratégica
3.  **IA Architect Brain (LangGraph):** Diseña la topología de la solución y toma decisiones de diseño senior.
4.  **Prompt Architect (Optimizer):** Genera y optimiza los System Prompts para los bots resultantes.
5.  **ROI Financial Engine:** Calcula el impacto en costos y ahorro operativo en tiempo real.

## 👥 Agentes de Nivel 3: Ejecución y Calidad
6.  **Lead Coder Agent:** Escribe código JSX/Python real en el sistema de archivos del monorepo.
7.  **ZTA Validator Agent:** Ejecuta builds físicos y pruebas de humo para garantizar que nada se rompa.
8.  **Git Automator Agent:** Gestiona la trazabilidad mediante commits semánticos automáticos.

## 👥 Agentes de Nivel 4: Gobierno y Cierre
9.  **Executive Summarizer:** Genera reportes de nivel C-Level sobre el progreso de la sesión.
10. **Knowledge Manager (Notion Sync):** Documenta cada decisión técnica en formato ADR (Architecture Decision Record).

---
*Documentación oficial para el Centro de Excelencia en IA.*
