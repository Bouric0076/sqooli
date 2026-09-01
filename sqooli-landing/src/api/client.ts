import createClient from 'openapi-fetch'
import type { paths } from './generated/api'
import { appConfig } from '../config/env'
import { createApiError, createBusinessError, isBusinessFailure } from './errors'

let accessToken: string | null = null

export function setApiAccessToken(token: string | null) {
	accessToken = token
}

export const apiClient = createClient<paths>({
	baseUrl: appConfig.apiBaseUrl,
	querySerializer: (params) => {
		const search = new URLSearchParams()
		for (const [key, value] of Object.entries(params)) {
			if (value !== undefined && value !== null) search.set(key, String(value))
		}
		return search.toString()
	},
	fetch: async (request: Request) => {
		const headers = new Headers(request.headers)
		headers.set('Accept', 'application/json')
		if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`)

		const response = await fetch(new Request(request, { headers, credentials: 'include' }))
		if (response.ok) return response
		if (response.status === 401 && accessToken) {
			accessToken = null
			window.sessionStorage.removeItem('sqooli-auth-session')
			window.dispatchEvent(new CustomEvent('sqooli:session-expired'))
		}

		let payload: unknown
		try {
			payload = await response.clone().json()
		} catch {
			payload = undefined
		}
		throw createApiError(response.status, payload, response.headers)
	},
})

export function apiQuery() {
	return { 'api-version': appConfig.apiVersion } as const
}

/**
 * The API sometimes returns HTTP 200 with { status: false }. Treat that as
 * an application error instead of allowing a failed mutation to look valid.
 */
export function assertBusinessSuccess<T>(payload: T, fallbackMessage?: string): T {
	if (isBusinessFailure(payload)) throw createBusinessError(payload, fallbackMessage)
	return payload
}
