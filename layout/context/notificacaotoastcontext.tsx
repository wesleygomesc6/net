import { Toast } from 'primereact/toast'
import { createContext, ReactNode, useRef } from 'react'
interface NotificacaoToast {
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast'
  summary: string
  detail: string
}

interface NotificacaoToastContextType {
  exibirNotificacaoToast: (notificacaoToast: NotificacaoToast) => void
}

interface NotificacaoToastProviderProps {
  children: ReactNode
}

export const NotificacaoToastContext = createContext({} as NotificacaoToastContextType)

export default function NotificacaoToastProvider({ children }: NotificacaoToastProviderProps) {
  const toast = useRef<Toast>(null)

  const exibirNotificacaoToast = (notificacaoToast: NotificacaoToast) => {
    toast.current?.show({ ...notificacaoToast, life: 6000 })
  }

  return (
    <NotificacaoToastContext.Provider value={{ exibirNotificacaoToast }}>
      <Toast ref={toast} />
      {children}
    </NotificacaoToastContext.Provider>
  )
}
