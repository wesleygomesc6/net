import z from 'zod'

export const turmaSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string(),
  professorId: z.number().optional().nullable(),
  disciplinaId: z.number(),
})

export type TurmaSchema = z.infer<typeof turmaSchema>
