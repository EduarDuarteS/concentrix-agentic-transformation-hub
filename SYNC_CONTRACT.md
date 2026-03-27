# Contrato de Sincronización Asíncrona (Dual-Key Handshake Protocol)

**Propósito:** Este documento define el contrato estricto de colaboración entre **Antigravity Manager** (Arquitecto/Validador) y **Claude Code CLI** (Ejecutor). Su objetivo es prevenir colisiones de estado en el repositorio y garantizar una transición de control predecible ("Handshake").

## 1. Protocolo de Handshake (Paso de Testigo)
Cuando a Claude Code se le asigne la ejecución de una Fase estructurada en `plan.md` (ej. Fase 1: Event Gateway), debe cumplir los siguientes pasos antes de devolver el control:

1. **Aislamiento de Entorno:** Trabajar preferiblemente en una rama de feature correspondiente a la fase (ej. `feature/phase-1-gateway`). Si está en `develop`, aislar mediante micro-commits locales.
2. **Micro-Commits Semánticos:** Enviar cambios granulares con mensajes bajo el convenio [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat(gateway): implement ws connection`
   - `chore(redis): set pre-start validations`
3. **Señal de Finalización:** Al terminar la Fase, Claude Code NO tiene autorización para iniciar la siguiente Fase de forma encadenada. Debe mutar explícitamente la lista de progreso en `plan.md`:
   - Cambiar `[ ] Fase X` por `[x] Fase X`.
4. **Bandera de Estado (Archivo Sentinela):** Claude Code debe modificar (o crear) `.agents/shared_context/.agent_handshake`, escribiendo exclusivamente la constante: `AWAITING_ANTIGRAVITY_REVIEW`. Esta es la bandera para que el humano detenga a Claude y retome la sesión con Antigravity.

## 2. Límites de Ejecución y Manejo de Fallos (Kill-Switch)
Si Claude Code, operando en la CLI, se atasca al implementar infraestructura backend (ej. el cliente Redis devuelve `ECONNREFUSED` recurrentemente o la compilación inicial de TypeScript sobre Node falla):

1. **Límite de Reintentos Algorítmicos:** Claude **solo tiene permitido un máximo de 3 iteraciones de reparación autónoma** (e.g., alterar el URI de conexión, reinstalar un paquete, revisar logs del shell).
2. **Bloqueo Rígido (Fallback a Humano/Arquitecto):** Si el problema persiste tras la tercera iteración, Claude Code tiene **prohibido reestructurar la arquitectura** fundacional (ej. sustituir Redis por un simple *EventEmitter* o RabbitMQ en un intento desesperado de resolver el error).
3. **Procedimiento de Aborto y Escape:**
   - Hacer un micro-commit de rollback táctico o dejar los archivos locales `Unstaged`.
   - Modificar `.agents/shared_context/.agent_handshake` añadiendo la constante `BLOCKED_REQUIRE_ARCHITECTURE_REVIEW`.
   - Detener la ejecución, imprimiendo un resumen en el log de su terminar para que Eduard D. transfiera el control a Antigravity Manager y auditen el bloqueo estructural.

## 3. Resolución de Handoff (El rol de Antigravity)
- Cuando el status marca `AWAITING_ANTIGRAVITY_REVIEW` o `BLOCKED_REQUIRE_ARCHITECTURE_REVIEW`, Antigravity entrará a la sesión en modo **VERIFICATION**.
- Antigravity auditará mediante `git diff` que Claude no haya violado el principio de agnostidicidad del Event/WebSocket Gateway.
- Antigravity planificará la resolución o dará luz verde para iniciar la siguiente fase.
