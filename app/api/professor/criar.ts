import { ProfessorSchema } from '@/app/schemas/professor'
import api from '@/lib/axios'
import { ProfessorProps } from '@/types/app/professor'

export async function criarProfessor(professor: ProfessorSchema) {
  const response = await api.post<ProfessorProps>('/professores', professor)
  return response.data
}
