import { describe, expect, it } from 'vitest'
import { createApiError, createBusinessError } from './errors'
import { getFriendlyError } from '../lib/notifications'

describe('API error normalization', () => {
	it('normalizes the backend error envelope', () => {
		const error = createApiError(403, { Status: false, Message: 'Forbidden', Error: 'FORBIDDEN' })
		expect(error).toMatchObject({ status: 403, message: 'Forbidden', code: 'FORBIDDEN' })
	})

	it('maps validation errors to field errors', () => {
		const error = createApiError(422, { errors: { email: ['Invalid email'] } })
		expect(error.fieldErrors).toEqual({ email: ['Invalid email'] })
	})

	it('uses safe defaults for an empty server response', () => {
		expect(createApiError(401, {}).message).toContain('session has expired')
		expect(createApiError(500, {}).message).toContain('temporarily unavailable')
	})

	it('preserves a business failure returned inside an HTTP 200 envelope', () => {
		expect(createBusinessError({ status: false, message: 'Invalid credentials', error: 'INVALID_CREDENTIALS' })).toMatchObject({
			status: 400,
			message: 'Invalid credentials',
			code: 'INVALID_CREDENTIALS',
		})
	})

	it('does not expose database exception details to users', () => {
		const error = createBusinessError({ status: false, message: 'An error occurred while saving the entity changes. See the inner exception for details.' })
		const message = getFriendlyError(error, 'Could not save')
		expect(message).toContain('may already be saved')
		expect(message).not.toContain('inner exception')
	})
})
