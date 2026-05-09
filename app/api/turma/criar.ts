import { TurmaSchema } from '@/app/schemas/turma'
import api from '@/lib/axios'
import { TurmaProps } from '@/types/app/turma'

export async function criarTurma(turma: TurmaSchema) {
  const response = await api.post<TurmaProps>('/turmas', turma)
  return response.data
}
