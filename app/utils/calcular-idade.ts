import dayjs from 'dayjs';

export function calcularIdade(nascimento: Date| string): {anos: number, meses: number} {
    // calcular idade em anos e meses usando dayjs retornar 26 para 26 anos e 8 meses
    const dataNascimento = dayjs(nascimento);
    const hoje = dayjs();
    const idadeAnos = hoje.diff(dataNascimento, 'year');
    const idadeMeses = hoje.diff(dataNascimento.add(idadeAnos, 'year'), 'month');
    return {anos: idadeAnos, meses: idadeMeses};
}