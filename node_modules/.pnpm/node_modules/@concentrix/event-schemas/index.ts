import { z } from 'zod';

// Esquema para el evento de Requerimiento Inicial
export const RequirementEventSchema = z.object({
  id: z.string().uuid(),
  type: z.literal('REQUIREMENT_RECEIVED'),
  source: z.enum(['audio', 'text', 'manual']),
  payload: z.object({
    text: z.string(),
    context: z.string().optional(),
  }),
  metadata: z.object({
    timestamp: z.string(),
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
  })
});

// Esquema para la salida del Agente Desarrollador (Código Generado)
export const CodeGenEventSchema = z.object({
  id: z.string().uuid(),
  type: z.literal('CODE_GENERATED'),
  agent: z.string(),
  payload: z.object({
    fileName: z.string(),
    filePath: z.string(),
    code: z.string(),
    language: z.string().default('jsx'),
  }),
  status: z.enum(['pending_review', 'approved', 'rejected']),
});

// Esquema para métricas de ROI (Carril Business)
export const RoiUpdateSchema = z.object({
  id: z.string().uuid(),
  type: z.literal('ROI_UPDATED'),
  payload: z.object({
    humanCost: z.number(),
    aiCost: z.number(),
    savings: z.number(),
    ttmReduction: z.string(),
  }),
});

// Esquema para logs de la Fábrica (Carril Command)
export const FactoryLogSchema = z.object({
  timestamp: z.string(),
  agent: z.string(),
  event: z.string(),
  message: z.string(),
  status: z.enum(['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'CRITICAL']),
});

export type RequirementEvent = z.infer<typeof RequirementEventSchema>;
export type CodeGenEvent = z.infer<typeof CodeGenEventSchema>;
export type RoiUpdate = z.infer<typeof RoiUpdateSchema>;
export type FactoryLog = z.infer<typeof FactoryLogSchema>;
