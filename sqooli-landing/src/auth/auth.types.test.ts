import { describe, expect, it } from 'vitest'
import { loginResponseSchema } from './auth.types'

describe('login response schema', () => {
	it('accepts nullable profile fields returned by the API', () => {
		const result = loginResponseSchema.safeParse({
			status: true,
			message: 'Login Success',
			access_token: 'test-token',
			user: {
				userId: 'user-id',
				fullName: 'Test User',
				firstName: 'Test',
				lastName: 'User',
				email: 'test@example.com',
				phone: null,
				nationalId: null,
				nationality: null,
				isEmailConfirmed: false,
				userType: 'Pending',
				userRole: 'Pending',
				dashboard: 'admin',
				role: [],
				address: null,
				profilePhoto: null,
				dob: null,
				isProfileComplete: false,
				roleObject: null,
				schools: [],
			},
		})

		expect(result.success).toBe(true)
	})
})
