'use client'
import { NotificacaoToastContext } from '@/layout/context/notificacaotoastcontext'
import { TurmaProps } from '@/types/app/turma'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { criarTurma } from '../api/turma/criar'
import { listarTurmas } from '../api/turma/listar'
import { turmaSchema, TurmaSchema } from '../schemas/turma'
import { DisciplinaProps } from '@/types/app/disciplina'
import { ProfessorProps } from '@/types/app/professor'
import { listarProfessores } from '../api/professor/listar'
import { listarDisciplinas } from '../api/disciplina/listar'

export default function TurmasPage() {
  const { exibirNotificacaoToast } = useContext(NotificacaoToastContext)
  const [turmas, setTurmas] = useState<TurmaProps[]>([])
  const [loadingTurmas, setLoadingTurmas] = useState(false)
  const [dialogoAberto, setDialogoAberto] = useState(false)
  const [professores, setProfessores] = useState<ProfessorProps[]>([])
  const [disciplinas, setDisciplinas] = useState<DisciplinaProps[]>([])

  const {
    handleSubmit,
    register,
    control,
    reset,
    setFocus,
    formState: { isValid: formularioEhValido, isLoading: salvando },
  } = useForm<TurmaSchema>({
    resolver: zodResolver(turmaSchema),
    defaultValues: {
      id: undefined,
      nome: '',
      disciplinaId: undefined,
      professorId: undefined,
    },
  })

  useEffect(() => {
    async function fetchTurmas() {
      setLoadingTurmas(true)
      try {
        const response = await listarTurmas()
        setTurmas(response)
      } catch (error) {
        console.error('Erro ao listar turmas:', error)
      } finally {
        setLoadingTurmas(false)
      }
    }
    fetchTurmas()
  }, [])

  async function salvarTurma(turma: TurmaSchema) {
    try {
      const response = await criarTurma(turma)
      setTurmas((prev) => [...prev, response])
      exibirNotificacaoToast({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Turma salvo com sucesso',
      })
      fecharDialogo()
    } catch (error) {
      console.error('Erro ao salvar turma:', error)
      exibirNotificacaoToast({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao salvar turma',
      })
    }
  }
  async function fetchProfessores() {
    try {
      const response = await listarProfessores()
      setProfessores(response)

    } catch (error) {
      console.error('Erro ao listar professores:', error)
    }
  }
  async function fetchDisciplinas() {
    try {
      const response = await listarDisciplinas()
      setDisciplinas(response)

    } catch (error) {
      console.error('Erro ao listar disciplinas:', error)
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
        header="Adicionar um novo turma"
        visible={dialogoAberto}
        draggable={false}
        closeOnEscape={false}
        onHide={fecharDialogo}
      >
        <form className="flex flex-column gap-3" onSubmit={handleSubmit(salvarTurma)}>
          <InputText {...register('nome')} placeholder="Digite o nome do turma" title="digite o nome do turma" />
          <Controller
            control={control}
            name="disciplinaId"
            render={({ field }) => (
              <Dropdown
              {...field}
              placeholder="Selecione a disciplina"
              title="selecione a disciplina"
              options={disciplinas}
              optionLabel="nome"
              optionValue="id"
              />
            )}
          />
          <Controller
            control={control}
            name="professorId"
            render={({ field }) => (
              <Dropdown
              {...field}
              placeholder="Selecione o professor"
              title="selecione o professor"
              options={professores}
              optionLabel="nome"
              optionValue="id"
              />
            )}
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
              title="salvar turma"
              disabled={!formularioEhValido || salvando}
              icon="pi pi-check"
            />
          </div>
        </form>
      </Dialog>
      <div className="flex justify-content-between">
        <span className="text-2xl uppercase font-medium">Turmas</span>
        <Button
          label="Adicionar Turma"
          icon="pi pi-plus"
          outlined
          size="small"
          title="adicionar turma"
          onClick={() => {
            setTimeout(() => {
              setFocus('nome')
            }, 100)
            setDialogoAberto(true)
            fetchDisciplinas()
            fetchProfessores()
          }}
        />
      </div>
      <DataTable value={turmas} loading={loadingTurmas} stripedRows rowHover emptyMessage="Nenhum turma encontrado">
        <Column field="id" header="Id" />
        <Column field="nome" header="Nome" />
        <Column field="disciplina.nome" header="Disciplina" />
        <Column field="professor.nome" header="Professor" />
      </DataTable>
    </div>
  )

}
