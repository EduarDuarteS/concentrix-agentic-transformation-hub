# PROJECT CONTEXT: CLI EXECUTOR DIRECTIVE (CLAUDE.md)

## Project Overview
**Name:** Concentrix Agentic Transformation Hub
**Domain:** Autonomous Software Factory (NHITL) / CCaaS Solutions.
**Goal:** Build a robust, scalable architecture on GCP using EDA (Redis) and LangGraph.

## Tech Stack Requirements
- **Runtime:** Node.js v22 LTS, TypeScript 5.4.
- **Monorepo:** Turborepo with `pnpm` workspaces.
- **Backend/Gateway:** Node/Express, WebSockets (`ws`), Redis v7.
- **Cloud:** Google Cloud Platform (Cloud Run, Artifact Registry).
- **CI/CD:** GitHub Actions (Native cache, no Vercel).

## Rules of Engagement (Dual-Key Governance)
1. **CLI Specialty:** Your primary focus is infrastructure, DevOps, and backend logic (apps/gateway, packages/event-schemas).
2. **UI Boundary:** DO NOT modify the UI components in `apps/web` unless specifically instructed for data integration. UI design belongs to Antigravity.
3. **Plan Adherence:** Read `plan.md` before executing. You are not allowed to change the architecture or the plan. 
4. **Failure Limit:** Max 3 autonomous retry iterations for a single task. If it fails, escalate to the Architect Board.

## Workflow (Handshake)
- Work in dedicated feature branches (`feature/phase-X`).
- Use Conventional Commits.
- Upon completion, update `plan.md` and write `AWAITING_ANTIGRAVITY_REVIEW` to `.agents/shared_context/.agent_handshake`.

## Terminal Commands
- **Install:** `pnpm install`
- **Build:** `pnpm turbo build`
- **Deploy:** `git push origin main` (Triggers GitHub Actions).
