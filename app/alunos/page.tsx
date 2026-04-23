'use client'
import { AlunoProps } from '@/types/app/aluno'
import { useContext, useEffect, useState } from 'react'
import { listarAlunos } from '../api/aluno/listar'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { calcularIdade } from '../utils/calcular-idade'
import { TurmaProps } from '@/types/app/turma'
import { Button } from 'primereact/button'
import { Controller, useForm } from 'react-hook-form'
import { alunoSchema, AlunoSchema } from '../schemas/aluno'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { criarAluno } from '../api/aluno/criar'
import { NotificacaoToastContext } from '@/layout/context/notificacaotoastcontext'

export default function AlunosPage() {
  const { exibirNotificacaoToast } = useContext(NotificacaoToastContext)
  const [alunos, setAlunos] = useState<AlunoProps[]>([])
  const [loadingAlunos, setLoadingAlunos] = useState(false)
  const [dialogoAberto, setDialogoAberto] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    reset,
    setFocus,
    formState: { isValid: formularioEhValido, isLoading: salvando },
  } = useForm<AlunoSchema>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      id: undefined,
      nome: '',
      email: '',
      nascimento: new Date(),
      turmas: undefined,
    },
  })

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

  async function salvarAluno(aluno: AlunoSchema) {
    try {
      const response = await criarAluno(aluno)
      setAlunos((prev) => [...prev, response])
      exibirNotificacaoToast({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Aluno salvo com sucesso',
      })
      fecharDialogo()
    } catch (error) {
      console.error('Erro ao salvar aluno:', error)
      exibirNotificacaoToast({
        severity: 'error',
        summary: 'Erro',
        detail: 'Erro ao salvar aluno',
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
        header="Adicionar um novo aluno"
        visible={dialogoAberto}
        draggable={false}
        closeOnEscape={false}
        onHide={fecharDialogo}
      >
        <form className="flex flex-column gap-3" onSubmit={handleSubmit(salvarAluno)}>
          <InputText {...register('nome')} placeholder="Digite o nome do aluno" title="digite o nome do aluno" />
          <InputText
            {...register('email')}
            type="email"
            placeholder="Digite o e-mail do aluno"
            title="digite o e-mail do aluno"
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
              title="salvar aluno"
              disabled={!formularioEhValido || salvando}
              icon="pi pi-check"
            />
          </div>
        </form>
      </Dialog>
      <div className="flex justify-content-between">
        <span className="text-2xl uppercase font-medium">Alunos</span>
        <Button
          label="Adicionar Aluno"
          icon="pi pi-plus"
          outlined
          size="small"
          title="adicionar aluno"
          onClick={() => {
            setTimeout(() => {
              setFocus('nome')
            }, 100)
            setDialogoAberto(true)
          }}
        />
      </div>
      <DataTable value={alunos} loading={loadingAlunos} stripedRows rowHover>
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
