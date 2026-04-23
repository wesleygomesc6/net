'use client'
import { AlunoProps } from '@/types/app/aluno'
import { useEffect, useState } from 'react'
import { listarAlunos } from '../api/aluno/listar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { calcularIdade } from '../utils/calcular-idade'
import { TurmaProps } from '@/types/app/turma'

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<AlunoProps[]>([])
  const [loadingAlunos, setLoadingAlunos] = useState(false)

  useEffect(() => {
    async function fetchAlunos() {
      setLoadingAlunos(true)
      try {
        const response = await listarAlunos()
        setAlunos(response)
      } catch (error) {
        console.error('Erro ao listar alunos:', error)
      } finally {
        setLoadingAlunos(false)
      }

    }
    fetchAlunos()
  }, [])

  return (
    <div>
      <h1>Alunos</h1>
      <DataTable
        value={alunos}
        loading={loadingAlunos}
        stripedRows
        rowHover
      >
        <Column field="id" header="Matrícula" />
        <Column field="nome" header="Nome" />
        <Column field="email" header="E-mail" />
        <Column field="idade" header="Idade" body={(rowData) => {
          const { anos, meses } = calcularIdade(rowData.nascimento)
          return `${anos} anos e ${meses} meses`
        }} />
        <Column field="turmas" header="Turmas" body={(rowData) => {
          return rowData.turmas?.map((turma: TurmaProps) => turma.nome).join(', ')
        }} />
      </DataTable>

    </div>
  )
}