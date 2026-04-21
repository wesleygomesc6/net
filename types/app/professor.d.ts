
export interface ProfessorProps {
    id?: number;
    nome: string;
    email: string;
    nascimento: string;
    createdAt?: string;
    turmas?: TurmaProps[];
}