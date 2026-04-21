'use client';
import { AlunoProps } from "@/types/app/aluno";
import { useEffect, useState } from "react";
import { listarAlunos } from "../api/aluno/listar";

export default function AlunosPage() {
    const [alunos, setAlunos] = useState<AlunoProps[]>([]);
 
    useEffect(() => {
        async function fetchAlunos() {
            try {
                const response = await listarAlunos();
                setAlunos(response);
            } catch (error) {
                console.error("Erro ao listar alunos:", error);
            }
        }
        fetchAlunos();
    }, []);

  return (
    <div>
      <h1>Alunos</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
    </div>
  );
}