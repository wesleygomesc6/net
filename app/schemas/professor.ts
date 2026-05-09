import z from 'zod'

export const professorSchema = z.object({
  id: z.number().optional().nullable(),
  nome: z.string(),
  email: z.string().email(),
  nascimento: z.date(),
  turmas: z
    .array(
      z.object({
        id: z.string(),
      }),
    )
    .optional()
    .nullable(),
})

export type ProfessorSchema = z.infer<typeof professorSchema>
