# Plan de Implementación: Fase 2 (plan.md)

**Proyecto:** Concentrix Agentic Transformation Hub
**Objetivo:** Andamiaje Monorepo, CI/CD y Fundaciones de la UI Dual (Business vs Tech).
**Firma Arquitectónica:** Antigravity Manager

## Hito 1: Reestructuración Bautismal (Monorepo Turborepo)
**Ejecutor:** **Claude Code CLI**
[x] 1. Inicializar el workspace de Turborepo en la raíz utilizando **pnpm**.
[x] 2. Estructurar la topología base: `apps/web`, `apps/gateway`, `packages/event-schemas`.
[x] 3. Migrar o acoplar integraciones previas (Redis, Express) dentro de `apps/gateway`.
[x] 4. Definir las dependencias base de Zod en `packages/event-schemas`.

## Hito 2: Automatización CI/CD (GitHub Actions hacia GCP)
**Ejecutor:** **Claude Code CLI**
[x] 1. Crear el directorio `.github/workflows/`.
[x] 2. Escribir `deploy-web.yml` (Deprecado por Hito 2.1).
[x] 3. Escribir `deploy-gateway.yml` (Deprecado por Hito 2.1).
[x] 4. Implementar caché nativo de GitHub hacia `.turbo`.

## Hito 2.1: Pivot DevOps (100% GCP Nativo)
**Ejecutor:** **Claude Code CLI**
[x] 1. Eliminar manifiestos antiguos de Firebase.
[x] 2. Crear `Dockerfile` (Nginx Alpine) y `nginx.conf` en `apps/web`.
[x] 3. Escribir pipeline unificado en `.github/workflows/deploy-cloudrun.yml`.
[x] 4. Configurar `google-github-actions/auth`.

## [COMPLETADO] Hito 3: Fundaciones Arquitectónicas UI y Estado Global (Zustand)
**Ejecutor:** **Antigravity Manager**
[x] 1. Establecer enrutamiento: `/business`, `/command`, `/canvas`.
[x] 2. Crear stores Zustand: `useBusinessStore`, `useCanvasStore`.
[x] 3. Instalar TailwindCSS y componentes base.
[x] 4. Implementar adaptadores de estado Transient para WebSockets.

---
**Protocolo de Sincronización:**
Status: READY_FOR_VIBECODING
Handshake Flag: `.agents/shared_context/.agent_handshake`
