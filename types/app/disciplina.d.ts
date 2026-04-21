export interface DisciplinaProps {
    id?: number;
    nome: string;
    codigo: string;
    createdAt?: string;
    professor?: ProfessorProps;
    turmas?: TurmaProps[];
}