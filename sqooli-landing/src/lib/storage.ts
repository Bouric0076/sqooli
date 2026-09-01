const SESSION_KEY = 'sqooli-auth-session'

export type StoredSession = {
	accessToken: string
	user: unknown
}

export function readStoredSession(): StoredSession | null {
	try {
		const raw = window.sessionStorage.getItem(SESSION_KEY)
		return raw ? JSON.parse(raw) as StoredSession : null
	} catch {
		return null
	}
}

export function writeStoredSession(session: StoredSession) {
	window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearStoredSession() {
	window.sessionStorage.removeItem(SESSION_KEY)
}
