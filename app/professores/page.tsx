'use client'
import { ProfessorProps } from '@/types/app/professor'
import { useContext, useEffect, useState } from 'react'
import { listarProfessores } from '../api/professor/listar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { calcularIdade } from '../utils/calcular-idade'
import { TurmaProps } from '@/types/app/turma'
import { Button } from 'primereact/button'
import { Controller, useForm } from 'react-hook-form'
import { professorSchema, ProfessorSchema } from '../schemas/professor'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { criarProfessor } from '../api/professor/criar'
import { NotificacaoToastContext } from '@/layout/context/notificacaotoastcontext'

export default function ProfessoresPage() {
  const { exibirNotificacaoToast } = useContext(NotificacaoToastContext)
  const [professores, setProfessores] = useState<ProfessorProps[]>([])
  const [loadingProfessores, setLoadingProfessores] = useState(false)
  const [dialogoAberto, setDialogoAberto] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    reset,
    setFocus,
    formState: { isValid: formularioEhValido, isLoading: salvando },
  } = useForm<ProfessorSchema>({
    resolver: zodResolver(professorSchema),
    defaultValues: {
      id: undefined,
      nome: '',
      email: '',
      nascimento: new Date(),
      turmas: undefined,
    },
  })

  useEffect(() => {
    async function fetchProfessores() {
      setLoadingProfessores(true)
      try {
        const response = await listarProfessores()
        setProfessores(response)
      } catch (error) {
        console.error('Erro ao listar professores:', error)
      } finally {
        setLoadingProfessores(false)
      }
    }
    fetchProfessores()
  }, [])

  async function salvarProfessor(professor: ProfessorSchema) {
    try {
      const response = await criarProfessor(professor)
      setProfessores((prev) => [...prev, response])
      exibirNotificacaoToast({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Professor salvo com sucesso',
      })
      fecharDialogo()
    } catch (error) {
      console.error('Erro ao salvar professor:', error)
      exibirNotificacaoToast({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao salvar professor',
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
        header="Adicionar um novo professor"
        visible={dialogoAberto}
        draggable={false}
        closeOnEscape={false}
        onHide={fecharDialogo}
      >
        <form className="flex flex-column gap-3" onSubmit={handleSubmit(salvarProfessor)}>
          <InputText {...register('nome')} placeholder="Digite o nome do professor" title="digite o nome do professor" />
          <InputText
            {...register('email')}
            type="email"
            placeholder="Digite o e-mail do professor"
            title="digite o e-mail do professor"
          />
          <Controller
            control={control}
            name="nascimento"
            render={({ field }) => (
              <Calendar
                {...field}
                placeholder="dd/mm/aaaa"
                dateFormat="dd/mm/yy"
                showIcon
                mask="99/99/9999"
                maxDate={new Date()}
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
              title="salvar professor"
              disabled={!formularioEhValido || salvando}
              icon="pi pi-check"
            />
          </div>
        </form>
      </Dialog>
      <div className="flex justify-content-between">
        <span className="text-2xl uppercase font-medium">Professores</span>
        <Button
          label="Adicionar Professor"
          icon="pi pi-plus"
          outlined
          size="small"
          title="adicionar professor"
          onClick={() => {
            setTimeout(() => {
              setFocus('nome')
            }, 100)
            setDialogoAberto(true)
          }}
        />
      </div>
      <DataTable value={professores} loading={loadingProfessores} stripedRows rowHover emptyMessage="Nenhum professor encontrado">
        <Column field="id" header="Matrícula" />
        <Column field="nome" header="Nome" />
        <Column field="email" header="E-mail" />
        <Column
          field="idade"
          header="Idade"
          body={(rowData) => {
            const { anos, meses } = calcularIdade(rowData.nascimento)
            return `${anos} anos e ${meses} meses`
          }}
        />
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
