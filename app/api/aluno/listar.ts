import api from "@/lib/axios";
import { AlunoProps } from "@/types/app/aluno";

export async function listarAlunos() {
  const response = await api.get<AlunoProps[]>('/alunos');
  return response.data;
}