import api from '@/lib/axios'
import { ProfessorProps } from '@/types/app/professor'

export async function listarProfessores() {
  const response = await api.get<ProfessorProps[]>('/professores')
  return response.data
}