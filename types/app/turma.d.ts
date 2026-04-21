export interface TurmaProps {
    id?: number;
    nome: string;
    disciplinaId: number;
    professorId: number;
    createdAt?: string;
    disciplina?: DisciplinaProps;
    professor?: ProfessorProps;
    alunos?: AlunoProps[];
}