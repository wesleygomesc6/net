'use client'
import { NotificacaoToastContext } from '@/layout/context/notificacaotoastcontext'
import { DisciplinaProps } from '@/types/app/disciplina'
import { TurmaProps } from '@/types/app/turma'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { criarDisciplina } from '../api/disciplina/criar'
import { listarDisciplinas } from '../api/disciplina/listar'
import { disciplinaSchema, DisciplinaSchema } from '../schemas/disciplina'

export default function DisciplinasPage() {
  const { exibirNotificacaoToast } = useContext(NotificacaoToastContext)
  const [disciplinas, setDisciplinas] = useState<DisciplinaProps[]>([])
  const [loadingDisciplinas, setLoadingDisciplinas] = useState(false)
  const [dialogoAberto, setDialogoAberto] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    setFocus,
    formState: { isValid: formularioEhValido, isLoading: salvando },
  } = useForm<DisciplinaSchema>({
    resolver: zodResolver(disciplinaSchema),
    defaultValues: {
      id: undefined,
      nome: '',
      codigo: '',
      turmas: undefined,
    },
  })

  useEffect(() => {
    async function fetchDisciplinas() {
      setLoadingDisciplinas(true)
      try {
        const response = await listarDisciplinas()
        setDisciplinas(response)
      } catch (error) {
        console.error('Erro ao listar disciplinas:', error)
      } finally {
        setLoadingDisciplinas(false)
      }
    }
    fetchDisciplinas()
  }, [])

  async function salvarDisciplina(disciplina: DisciplinaSchema) {
    try {
      const response = await criarDisciplina(disciplina)
      setDisciplinas((prev) => [...prev, response])
      exibirNotificacaoToast({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Disciplina salvo com sucesso',
      })
      fecharDialogo()
    } catch (error) {
      console.error('Erro ao salvar disciplina:', error)
      exibirNotificacaoToast({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao salvar disciplina',
      })
    }
  }

  function fecharDialogo() {
    reset()
    setDialogoAberto(false)
  }

  return (
    <div className="flex flex-column gap-2">
      <Dialog
        className="w-11 md:w-8 lg:w-6 xl:w-4"
        header="Adicionar um novo disciplina"
        visible={dialogoAberto}
        draggable={false}
        closeOnEscape={false}
        onHide={fecharDialogo}
      >
        <form className="flex flex-column gap-3" onSubmit={handleSubmit(salvarDisciplina)}>
          <InputText {...register('nome')} placeholder="Digite o nome do disciplina" title="digite o nome do disciplina" />
          <InputText
            {...register('codigo')}
            placeholder="Digite o código do disciplina"
            title="digite o código do disciplina"
          />
          <div className="flex gap-2 justify-content-end">
            <Button
              label="Cancelar"
              severity="warning"
              size="small"
              title="cancelar"
              onClick={fecharDialogo}
              disabled={salvando}
              icon="pi pi-times"
            />
            <Button
              label="Salvar"
              type="submit"
              severity="success"
              size="small"
              title="salvar disciplina"
              disabled={!formularioEhValido || salvando}
              icon="pi pi-check"
            />
          </div>
        </form>
      </Dialog>
      <div className="flex justify-content-between">
        <span className="text-2xl uppercase font-medium">Disciplinas</span>
        <Button
          label="Adicionar Disciplina"
          icon="pi pi-plus"
          outlined
          size="small"
          title="adicionar disciplina"
          onClick={() => {
            setTimeout(() => {
              setFocus('nome')
            }, 100)
            setDialogoAberto(true)
          }}
        />
      </div>
      <DataTable value={disciplinas} loading={loadingDisciplinas} stripedRows rowHover emptyMessage="Nenhum disciplina encontrado">
        <Column field="id" header="Id" />
        <Column field="nome" header="Nome" />
        <Column field="codigo" header="Código" />
        <Column
          field="turmas"
          header="Turmas"
          body={(rowData) => {
            return rowData.turmas?.map((turma: TurmaProps) => turma.nome).join(', ')
          }}
        />
      </DataTable>
    </div>
  )
}
