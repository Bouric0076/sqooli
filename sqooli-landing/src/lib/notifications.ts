import { toast } from 'sonner'

export function getFriendlyError(error: unknown, fallback: string) {
	if (error instanceof TypeError && /failed to fetch/i.test(error.message)) {
		return 'We could not complete that request. Please check your connection and try again.'
	}
	if (isApiError(error)) {
		if (error.status === 401) return 'Your session has expired. Please sign in again.'
		if (error.status === 403) return 'You do not have permission to perform that action.'
		if (error.status === 429) return 'Too many attempts. Please wait a moment and try again.'
		if (error.status >= 500) return 'Sqooli is temporarily unavailable. Please try again shortly.'
		if (error.status >= 400 && error.status < 500) return messageForValidationError(error.message, fallback)
	}
	return fallback
}

export function showError(error: unknown, fallback: string) {
	toast.error(getFriendlyError(error, fallback))
}

export function isApiError(error: unknown): error is { status: number; message?: string } {
	return typeof error === 'object' && error !== null && 'status' in error && typeof error.status === 'number'
}

function messageForValidationError(message: string | undefined, fallback: string) {
	const normalized = message?.toLowerCase() ?? ''
	if (/already exists|duplicate|already registered|email.*exist/.test(normalized)) {
		return 'An account with this email already exists. Try signing in or use another email.'
	}
	if (/password/.test(normalized)) return 'Your password must be 8+ characters and include an uppercase letter, lowercase letter, number, and symbol.'
	if (/profile|enrollment|student/.test(normalized)) {
		return message ?? 'Please complete the required account details before continuing.'
	}
	return message && !/request could not be completed/i.test(message) ? message : fallback
}
