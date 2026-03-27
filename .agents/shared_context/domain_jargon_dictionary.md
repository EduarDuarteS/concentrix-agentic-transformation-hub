# Domain Jargon Dictionary (Contexto Concentrix)

- **EDA (Event-Driven Architecture):** Arquitectura asíncrona respaldada por Redis. El Frontend actúa como "Emisor" o "Suscriptor", ignorando y aislando por completo la complejidad de LangGraph.
- **NHITL (Non-Human In The Loop):** Un modelo de agencia donde LangGraph toma decisiones automatizadas y solo enciende banderas (eventos de alerta) cuando hay alta incertidumbre o se requiere aprobación (ej. en el *Command Center*).
- **Self-Healing Monitor:** Subsistema de observabilidad en segundo plano (workers) que vigila la latencia o desincronización de eventos en Redis, aplicando auto-recuperación sin intervención humana de ser posible.
- **ROI / TTM:** Retorno de Inversión y "Time To Market". Son nuestras métricas guía en el *Business Dashboard*. Todo el código generado debe priorizar patrones reutilizables y modulares.
- **VibeCoding:** Metodología iterativa donde el humano dicta intenciones abstractas y el dúo de agentes AI estructuran el I/O estricto.
- **Dual-Key Governance:** La separación de poderes (Nuestra Constitución). Antigravity planifies, establece arquitecturas y audita la UI. Claude Code muta infraestructura y escribe backend en base a las firmas de estado y contratos que nosotros definimos.
- **Event Payload Schema:** La estructura de datos única y verificable de cualquier evento que viaja por Redis y cruza la red hacia el Frontend. Controlado por Zod.
