import { apiClient, apiQuery, assertBusinessSuccess } from './client'

export type RegisterInitInput = {
	firstName: string
	lastName: string
	email: string
	password: string
	phone?: string
	referralCode?: string
}

export type RegistrationRole = 'Student' | 'Teacher' | 'Parent' | 'School'

export type RegistrationCompletion = {
	email: string
	role: RegistrationRole
	firstName?: string
	lastName?: string
	phone: string
	gender?: string
	dob?: string
	address?: string
	certificateLevelId?: number | string
	teacherEnrollments?: Array<{ curriculumId?: number | string; gradeLevelId?: number | string; schoolId?: number | string | null; subjectIds?: Array<number | string> }>
	studentEnrollments?: Array<{ curriculumId?: number | string; gradeLevelId?: number | string; schoolId?: number | string | null; subjectIds?: Array<number | string> }>
}

export type ProfileUpdate = {
	firstName?: string
	lastName?: string
	nationality?: string
	nationalId?: string
	email?: string
	phone?: string
	address?: string
	role?: string
	gender?: string
	dob?: string
}

export async function initiateRegistration(input: RegisterInitInput) {
	const response = await apiClient.POST('/api/Auth/register/init', {
		params: { query: apiQuery() },
		body: input,
	})
	return assertBusinessSuccess(response.data, 'We could not start your registration.')
}

export async function verifyEmail(input: { userId: string; token: string }) {
	const response = await apiClient.POST('/api/Auth/verify-email', {
		params: { query: apiQuery() },
		body: input,
	})
	return assertBusinessSuccess(response.data, 'This verification link could not be completed.')
}

export async function resendVerificationEmail(email: string) {
	const response = await apiClient.POST('/api/Auth/resend-verification-email', {
		params: { query: apiQuery() },
		body: { email },
	})
	return assertBusinessSuccess(response.data, 'We could not send a new verification email.')
}

export async function setPassword(input: { password: string; confirmPassword: string; currentPassword?: string | null }) {
	const response = await apiClient.POST('/api/Auth/set-password', {
		params: { query: apiQuery() },
		body: input,
	})
	return assertBusinessSuccess(response.data, 'We could not set your password.')
}

export async function completeRegistration(input: RegistrationCompletion) {
	const response = await apiClient.POST('/api/Auth/register/complete', {
		params: { query: apiQuery() },
		body: input,
	})
	return assertBusinessSuccess(response.data, 'We could not complete your registration.')
}

export async function updateProfile(input: ProfileUpdate) {
	const response = await apiClient.PUT('/api/Auth/update-profile', {
		params: { query: apiQuery() },
		body: input,
	})
	return assertBusinessSuccess(response.data, 'We could not save your profile.')
}
