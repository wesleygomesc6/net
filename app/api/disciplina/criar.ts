import { DisciplinaSchema } from '@/app/schemas/disciplina'
import api from '@/lib/axios'
import { DisciplinaProps } from '@/types/app/disciplina'

export async function criarDisciplina(disciplina: DisciplinaSchema) {
  const response = await api.post<DisciplinaProps>('/disciplinas', disciplina)
  return response.data
}
