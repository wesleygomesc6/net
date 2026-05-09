import api from '@/lib/axios'
import { TurmaProps } from '@/types/app/turma'

export async function listarTurmas() {
  const response = await api.get<TurmaProps[]>('/turmas')
  return response.data
}