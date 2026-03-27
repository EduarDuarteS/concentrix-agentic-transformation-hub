# ARCHITECTURE DIAGRAMS (MERMAID.JS) - PRE-MADE FOR INTERVIEW

Eduard, si te piden un diagrama en vivo, aquí tienes 3 que puedes copiar y pegar en cualquier editor (como el de [Mermaid.live](https://mermaid.live/)) para impresionar gráficamente.

---

## 1. OMNICHANNEL AI FLOW (OMNI-UX)
*Ideal para explicar cómo el bot gestiona voz, chat y mensajería.*

```mermaid
graph TD
    A[Client Channel: Voice/Chat/Social] --> B[CCaaS Layer: Genesys/Five9/Amazon Connect]
    B --> C{Sifu AI Orchestrator}
    C -->|Intent NLU| D[LLM Gateway: Gemini 3.1 Pro/Flash]
    C -->|Data Context| E[CRM / Database: Salesforce/MongoDB]
    D --> F[Agentic Task Execution: Order, Booking, Payment]
    F --> G[Dynamic Response Generation]
    G --> B
    B --> H[Human Agent Handoff w/ Context Summary]
```

---

## 2. RAG PIPELINE (KNOWLEDGE-DRIVEN AI)
*Ideal para explicar cómo evitas las alucinaciones del LLM.*

```mermaid
sequenceDiagram
    participant User
    participant Bot as AI Agent
    participant VectorDB as Pinecone/MongoDB Atlas
    participant LLM as Gemini 3.1 Pro
    User->>Bot: ¿Cuál es el estado de mi pedido?
    Bot->>VectorDB: Semantic Search: "Order Status Policy"
    VectorDB-->>Bot: Context: "Orders take 5 days to ship"
    Bot->>LLM: Prompt: Context + User Query
    LLM-->>Bot: Answer: "Your order ships in 5 days."
    Bot-->>User: Respuesta validada y citada.
```

---

## 3. SECURITY & PII SANITIZATION LAYER (GRC)
*Ideal para mostrar tu nivel de Arquitecto Senior y Seguridad.*

```mermaid
graph LR
    A[Incoming Request] --> B[PII Redaction Service: Presidio/Regex]
    B -->|Sanitized Data| C[AI Engine: Vertex AI / OpenAI]
    C -->|AI Response| D[Compliance Auditor: Guardrails]
    D -->|Safe Response| E[Outgoing Response]
    B -.->|Original Data Store| F[(Secure Vault: HashiCorp Vault)]
    E --> F
```

---

## CONSEJO DE SIFU (MODO ARQUITECTO):
- **Copia el código Mermaid** y tenlo a mano en un Note. 
- Si te piden explicar la arquitectura, pégalo en un visualizador o simplemente explica los nodos: "Como vemos en mi diseño, la capa de orquestación centraliza la lógica de negocio y separa el LLM de los datos sensibles."

---
*Created by Sifu (Shadow Architect) for Concentrix Interview.*
