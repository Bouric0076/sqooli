import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AppProviders from './app/providers'
import { restoreSession } from './auth/auth.service'
import { clearSession, setSession } from './auth/auth.slice'
import { store } from './store'
import './styles/base.css'
import './styles/components/loading.css'
import './styles/components/toasts.css'

const restoredSession = restoreSession()
if (restoredSession) store.dispatch(setSession(restoredSession))

window.addEventListener('sqooli:session-expired', () => {
	store.dispatch(clearSession())
	if (!window.location.pathname.startsWith('/login')) {
		const returnTo = `${window.location.pathname}${window.location.search}`
		window.location.assign(`/login?expired=1&returnTo=${encodeURIComponent(returnTo)}`)
	}
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AppProviders><App /></AppProviders>
	</StrictMode>,
)
