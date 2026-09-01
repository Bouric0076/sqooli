import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import type { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { store } from '../store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false },
	},
})

export default function AppProviders({ children }: { children: ReactNode }) {
	return <Provider store={store}><QueryClientProvider client={queryClient}>{children}<Toaster position="top-right" offset={24} toastOptions={{ unstyled: true, classNames: { toast: 'sqooli-toast', title: 'sqooli-toast__title', description: 'sqooli-toast__description', closeButton: 'sqooli-toast__close' } }} /></QueryClientProvider></Provider>
}
