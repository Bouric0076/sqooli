export type ApiError = {
	status: number
	message: string
	code?: string
	fieldErrors?: Record<string, string[]>
	requestId?: string
}

export function isBusinessFailure(payload: unknown): payload is Record<string, unknown> {
	if (typeof payload !== 'object' || payload === null) return false
	const body = payload as Record<string, unknown>
	return body.status === false || body.Status === false
}

export function createBusinessError(payload: unknown, fallbackMessage = 'The request could not be completed.'): ApiError {
	const error = createApiError(400, payload)
	return { ...error, message: error.message || fallbackMessage }
}

export function createApiError(status: number, payload: unknown, headers?: Headers): ApiError {
	const body = isRecord(payload) ? payload : {}
	const message = firstString(body.message, body.Message, body.error, body.Error) ?? defaultMessage(status)
	const code = firstString(body.code, body.Code, body.error, body.Error)
	const requestId = headers?.get('x-request-id') ?? headers?.get('trace-id') ?? undefined
	const fieldErrors = isRecord(body.errors) ? Object.fromEntries(Object.entries(body.errors).flatMap(([key, value]) => {
		if (Array.isArray(value)) return [[key, value.filter((item): item is string => typeof item === 'string')]]
		return typeof value === 'string' ? [[key, [value]]] : []
	})) : undefined

	return { status, message, code, fieldErrors, requestId }
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

function firstString(...values: unknown[]) {
	return values.find((value): value is string => typeof value === 'string' && value.trim().length > 0)
}

function defaultMessage(status: number) {
	if (status === 401) return 'Your session has expired. Please sign in again.'
	if (status === 403) return 'You do not have permission to perform this action.'
	if (status === 404) return 'The requested resource was not found.'
	if (status === 422) return 'Please review the highlighted fields.'
	return status >= 500 ? 'The service is temporarily unavailable. Please try again.' : 'The request could not be completed.'
}
