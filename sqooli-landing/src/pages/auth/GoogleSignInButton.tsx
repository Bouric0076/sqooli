import { useEffect, useRef, useState } from 'react'
import { appConfig } from '../../config/env'
import GoogleMark from './GoogleMark'

type GoogleCredentialResponse = { credential?: string }
type GooglePromptNotification = { isNotDisplayed?: () => boolean; isSkippedMoment?: () => boolean }
type GoogleIdentity = {
	initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void; auto_select?: boolean }) => void
	prompt: (notificationCallback?: (notification: GooglePromptNotification) => void) => void
}

declare global {
	interface Window {
		google?: { accounts?: { id?: GoogleIdentity } }
	}
}

type Props = {
	onCredential: (idToken: string) => void | Promise<void>
	onError?: (message: string) => void
}

let googleScriptPromise: Promise<void> | null = null

function loadGoogleIdentityScript() {
	if (window.google?.accounts?.id) return Promise.resolve()
	if (googleScriptPromise) return googleScriptPromise
	googleScriptPromise = new Promise<void>((resolve, reject) => {
		const existing = document.querySelector<HTMLScriptElement>('script[data-google-identity]')
		if (existing) {
			existing.addEventListener('load', () => resolve(), { once: true })
			existing.addEventListener('error', () => reject(new Error('Google sign-in could not be loaded.')), { once: true })
			return
		}
		const script = document.createElement('script')
		script.src = 'https://accounts.google.com/gsi/client'
		script.async = true
		script.defer = true
		script.dataset.googleIdentity = 'true'
		script.onload = () => resolve()
		script.onerror = () => reject(new Error('Google sign-in could not be loaded.'))
		document.head.appendChild(script)
	})
	return googleScriptPromise
}

export default function GoogleSignInButton({ onCredential, onError }: Props) {
	const credentialRef = useRef(onCredential)
	const errorRef = useRef(onError)
	const [isReady, setIsReady] = useState(Boolean(appConfig.googleClientId && window.google?.accounts?.id))
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		credentialRef.current = onCredential
		errorRef.current = onError
	}, [onCredential, onError])

	useEffect(() => {
		if (!appConfig.googleClientId) return
		let active = true
		loadGoogleIdentityScript().then(() => {
			if (!active || !window.google?.accounts?.id) return
			window.google.accounts.id.initialize({
				client_id: appConfig.googleClientId,
				auto_select: false,
				callback: (response) => {
					setIsLoading(false)
					if (response.credential) void credentialRef.current(response.credential)
					else errorRef.current?.('Google did not return a sign-in credential. Please try again.')
				},
			})
			setIsReady(true)
		}).catch(() => errorRef.current?.('Google sign-in is temporarily unavailable. Please try again.'))
		return () => { active = false }
	}, [])

	const signIn = () => {
		if (!appConfig.googleClientId) {
			errorRef.current?.('Google sign-in is not configured for this environment yet.')
			return
		}
		if (!isReady || !window.google?.accounts?.id) {
			errorRef.current?.('Google sign-in is still loading. Please try again shortly.')
			return
		}
		setIsLoading(true)
		window.google.accounts.id.prompt((notification) => {
			if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) setIsLoading(false)
		})
	}

	return <button type="button" className="student-account__google" onClick={signIn} disabled={isLoading} aria-busy={isLoading}><GoogleMark /><span>{isLoading ? 'Connecting to Google…' : 'Sign in with Google'}</span></button>
}
