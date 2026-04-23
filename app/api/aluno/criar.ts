import { AlunoSchema } from '@/app/schemas/aluno'
import api from '@/lib/axios'
import { AlunoProps } from '@/types/app/aluno'

export async function criarAluno(aluno: AlunoSchema) {
  const response = await api.post<AlunoProps>('/alunos', aluno)
  return response.data
}
