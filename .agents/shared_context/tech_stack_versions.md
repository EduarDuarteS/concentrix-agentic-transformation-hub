# Tech Stack & Environment Versions

**Documento de contexto para Agentes Autónomos (Antigravity & Claude Code)**

## 1. Frontend (Dominio de Validación: Antigravity)
- **Core:** React 18, TypeScript (Strict Mode)
- **Build Tool:** Vite
- **UI/Estilos:** TailwindCSS + componentes tipo shadcn/ui.
- **Manejo de Estado (Impuesto):** Zustand (Estado del Cliente) / Suscripción vía WebSockets o SSE (Estado de Red y Streaming).
- **Validación de Datos/Esquemas:** Zod (Se utiliza para inferir tipos de TypeScript y validar I/O de los eventos).
- **Patrón Arquitectónico:** Container/Presenter estrictamente enforced.

## 2. Backend, Workers & Orquestador (Dominio de Ejecución: Claude Code)
- **Runtime base:** Node.js (v20+ LTS).
- **Core Cognitivo/Flujos:** LangGraph.js.
- **Broker y Persistencia Efímera:** Redis (v7+) operando como Event Bus (Pub/Sub + Streams).
- **Backend API/WebSocket:** Servidor Node/Express o Fastify para puentear React con Redis.

## 3. Cloud & Infraestructura (GCP)
- **Proveedor:** Google Cloud Platform.
- **Cómputo/Host:** Cloud Run (escalado web) o GKE/Compute (Workers de LangGraph), gestionado vía **Terraform**.
- **Seguridad:** Autenticación de Servicios vía IAM y uso estricto de roles.
