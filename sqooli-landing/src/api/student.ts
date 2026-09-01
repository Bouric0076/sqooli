import { apiClient, apiQuery, assertBusinessSuccess } from './client'
import type { components } from './generated/api'

export type StudentListQuery = {
	page?: number
	pageSize?: number
	search?: string
}

export function getStudents(query: StudentListQuery = {}) {
	return apiClient.GET('/api/Student', {
		params: { query: { ...apiQuery(), ...query } },
	})
}

export function getStudent(id: number | string) {
	return apiClient.GET('/api/Student/{id}', {
		params: { path: { id: Number(id) }, query: apiQuery() },
	})
}

export function updateStudent(id: number, body: components['schemas']['StudentUpdateDto']) {
	return apiClient.PUT('/api/Student/{id}', {
		params: { path: { id }, query: apiQuery() },
		body,
	})
}

export async function getMyEnrollments() {
	const response = await apiClient.GET('/api/Student/my-enrollments', { params: { query: apiQuery() } })
	return assertBusinessSuccess(response.data, 'We could not verify your student enrollment.')
}
