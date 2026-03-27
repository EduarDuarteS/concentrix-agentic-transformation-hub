# Visual Strategy: Sifu 5.2 Architecture & Flows

## 1. Governance & Interaction Model (Eduard + Sifu)
This diagram explains the "Dual-Key" system where Eduard (Architect) and Sifu (Shadow Architect/Executor) interact to ensure high-fidelity outputs.

```mermaid
graph TD
    User((Eduard - Architect)) -- "High-Level Intent / Voice" --> Sifu[Sifu - Shadow Architect]
    Sifu -- "Proposed Design / Strategy" --> User
    User -- "Approval / Refinement" --> Sifu
    
    subgraph "Execution Layer (Sifu 5.2)"
        Sifu -- "Commands" --> Claude[Claude Code - Executor]
        Sifu -- "Guidelines" --> Antigravity[Antigravity Manager - UI/Governance]
        Claude -- "Code/Actions" --> Repo[(Monorepo / Cloud)]
        Antigravity -- "Audits" --> Repo
    end
```

## 2. Agentic Workflow (AutoGen/LangGraph)
How our 12 agents collaborate using an Event-Driven Architecture (EDA) via Redis.

```mermaid
sequenceDiagram
    participant GW as Gateway Agent
    participant ORCH as Sifu Orchestrator (LangGraph)
    participant CODER as Lead Coder / Self-Healing
    participant ZTA as ZTA Validator
    participant GIT as Git Automator

    GW->>ORCH: Requirement (Voice/JSON)
    ORCH->>ORCH: Plan Generation (Reasoning Loop)
    ORCH->>CODER: Execution Task
    CODER->>CODER: Generate Code (Gemini 3.1 Pro)
    CODER->>ZTA: Submit for Physical Build
    
    alt Build Fails
        ZTA-->>CODER: Terminal Error Logs
        CODER->>CODER: Self-Healing Logic (Repair)
        CODER->>ZTA: Re-Submit Fix
    else Build Success
        ZTA-->>GIT: Validated Assets
        GIT->>GIT: Atomic Commit & Push
        GIT-->>GW: Status Update (UI Telemetry)
    end
```

## 3. Anti-Hallucination & Guardrail Controls
How we ensure 100% deterministic and safe outputs for Enterprise CCaaS.

| Control Layer | Mechanism | Purpose |
| :--- | :--- | :--- |
| **Semantic Firewall** | Vector DB / RAG | Restricts response to verified "Source of Truth" documents only. |
| **Deteriminstic Output** | Pydantic / Zod Schemas | Forces the LLM to output valid JSON that matches the system's expected types. |
| **Physical Build (ZTA)** | Terminal Execution | Never trust code without a successful `npm build` or `python test`. |
| **GRC Auditor** | PII Scrubber | Automatically masks or blocks any PII/PCI data before it leaves the secure zone. |
| **Meta-Graph Validation** | Self-Correction | Every agent output is reviewed by a second "Auditor" agent before execution. |

## 4. Monitoring & Telemetry HUD
Real-time metrics sent from the factory to the Glassmorphic Dashboard.

```mermaid
pie title Factory Resource Allocation
    "AI Inference (Gemini)" : 45
    "ZTA Validation" : 20
    "Self-Healing Cycles" : 15
    "Git/CI-CD Ops" : 10
    "Telemetry/Logging" : 10
```
