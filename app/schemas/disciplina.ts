import z from 'zod'

export const disciplinaSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string(),
  codigo: z.string(),
  turmas: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional()
    .nullable(),
})

export type DisciplinaSchema = z.infer<typeof disciplinaSchema>
