import { z } from 'zod'
import { apiClient, apiQuery, assertBusinessSuccess, setApiAccessToken } from '../api/client'
import { clearStoredSession, readStoredSession, writeStoredSession } from '../lib/storage'
import { authUserSchema, currentUserResponseSchema, loginResponseSchema, type AuthSession, type AuthUser, type CurrentUserData } from './auth.types'

const loginRequestSchema = z.object({ email: z.string().email(), password: z.string().min(1) })

export class EmailVerificationRequiredError extends Error {
	readonly email: string

	constructor(email: string) {
		super('Email verification is required before signing in.')
		this.name = 'EmailVerificationRequiredError'
		this.email = email
	}
}

export function restoreSession(): AuthSession | null {
	const stored = readStoredSession()
	if (!stored || typeof stored.accessToken !== 'string' || stored.accessToken.trim().length === 0) {
		if (stored) clearStoredSession()
		return null
	}
	const user = authUserSchema.safeParse(stored.user)
	if (!user.success) {
		clearStoredSession()
		return null
	}
	if (user.data.isEmailConfirmed === false) {
		clearStoredSession()
		return null
	}
	const session = { accessToken: stored.accessToken, user: user.data }
	setApiAccessToken(session.accessToken)
	return session
}

export async function login(input: { email: string; password: string }): Promise<AuthSession> {
	const credentials = loginRequestSchema.parse({ ...input, email: input.email.trim().toLowerCase() })
	const { data, error } = await apiClient.POST('/api/Auth/login', {
		params: { query: apiQuery() },
		body: credentials,
	})
	if (error) throw error

	return finalizeLoginResponse(data, 'We could not sign you in. Please check your details and try again.', credentials.email)
}

export async function loginWithGoogle(idToken: string, referralCode?: string): Promise<AuthSession> {
	const { data, error } = await apiClient.POST('/api/Auth/google-login', {
		params: { query: apiQuery() },
		body: { idToken, referralCode },
	})
	if (error) throw error
	return finalizeLoginResponse(data, 'We could not sign you in with Google. Please try again.')
}

async function finalizeLoginResponse(data: unknown, fallbackMessage: string, fallbackEmail = ''): Promise<AuthSession> {
	assertBusinessSuccess(data, fallbackMessage)
	const parsed = loginResponseSchema.safeParse(data)
	if (!parsed.success || !parsed.data.accessToken) {
		throw new Error('We could not sign you in because the server returned an incomplete session.')
	}
	let session = parsed.data
	if (session.user.isEmailConfirmed === false) {
		throw new EmailVerificationRequiredError(session.user.email ?? fallbackEmail)
	}
	setApiAccessToken(session.accessToken)
	try {
		const currentUser = await getCurrentUser(session.user)
		session = { ...session, user: currentUser }
	} catch (error) {
		// Keep login usable in environments where the undocumented /me route is
		// unavailable. A real unauthorized response is still fatal.
		if (isUnauthorized(error)) throw error
	}
	writeStoredSession(session)
	return session
}

export async function getCurrentUser(existingUser?: AuthUser): Promise<AuthUser> {
	const response = await (apiClient as unknown as {
		GET: (path: string, options: { params: { query: ReturnType<typeof apiQuery> } }) => Promise<{ data?: unknown; error?: unknown }>
	}).GET('/api/Auth/me', { params: { query: apiQuery() } })
	if (response.error) throw response.error
	assertBusinessSuccess(response.data, 'We could not refresh your account details.')
	const parsed = currentUserResponseSchema.safeParse(response.data)
	if (!parsed.success) throw new Error('The current-user response was incomplete.')
	return mergeCurrentUser(existingUser, parsed.data.data)
}

function mergeCurrentUser(existingUser: AuthUser | undefined, current: CurrentUserData): AuthUser {
	const user = existingUser ?? { dashboard: 'student' as const }
	return {
		...user,
		userId: current.id ?? user.userId,
		email: current.email ?? current.userName ?? user.email,
		firstName: current.firstName ?? user.firstName,
		lastName: current.lastName ?? user.lastName,
		phone: current.phone ?? user.phone,
		gender: current.gender ?? user.gender,
		dob: current.dob ?? user.dob,
		address: current.address ?? user.address,
		userType: current.userType ?? user.userType,
		userRole: current.userRole ?? current.userType ?? user.userRole,
		role: current.roles?.length ? current.roles : current.role ?? user.role,
		// Prefer the backend dashboard when /me exposes it. Older deployments
		// omit that field, so use the freshly assigned role rather than retaining
		// the stale dashboard returned while the account was Pending.
		dashboard: current.dashboard ?? dashboardFromRole(current.userRole ?? current.userType) ?? user.dashboard,
		isProfileComplete: current.isProfileComplete ?? user.isProfileComplete,
		// The live endpoint calls this isVerified. Preserve a confirmed login
		// value until the backend documents whether these fields are equivalent.
		isEmailConfirmed: user.isEmailConfirmed ?? current.isVerified,
		studentEnrollment: current.studentEnrollment ?? user.studentEnrollment,
	}
}

function dashboardFromRole(role: string | undefined) {
	return ({ student: 'student', teacher: 'teacher', parent: 'parent', school: 'school', 'school-admin': 'school-admin', admin: 'admin', 'platform-admin': 'platform-admin' } as const)[role?.toLowerCase() ?? '']
}

function isUnauthorized(error: unknown): boolean {
	return typeof error === 'object' && error !== null && 'status' in error && error.status === 401
}

export function logout() {
	clearStoredSession()
	setApiAccessToken(null)
}
