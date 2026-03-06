'use client'

import { useToast } from '@/lib/toast-context'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/90'
      case 'error':
        return 'bg-red-500/90'
      case 'warning':
        return 'bg-yellow-500/90'
      case 'info':
      default:
        return 'bg-blue-500/90'
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
      default:
        return 'ℹ'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getBackgroundColor(
            toast.type,
          )} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in fade-in slide-in-from-right-2 duration-300`}
        >
          <span className="text-lg font-bold">{getIcon(toast.type)}</span>
          <span className="flex-1">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
