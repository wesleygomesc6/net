import api from '@/lib/axios'
import { DisciplinaProps } from '@/types/app/disciplina'

export async function listarDisciplinas() {
  const response = await api.get<DisciplinaProps[]>('/disciplinas')
  return response.data
}