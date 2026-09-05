import { apiClient, apiQuery } from './client'

export type TeacherListQuery = { page?: number; pageSize?: number; search?: string }

export function getTeacherProfile() {
	return apiClient.GET('/api/Teacher/me', { params: { query: apiQuery() } })
}

export function getTeachers(query: TeacherListQuery = {}) {
	return apiClient.GET('/api/Teacher', { params: { query: { ...query, ...apiQuery() } } })
}

/**
 * The paged Teacher management endpoint is restricted for student sessions.
 * The API exposes /api/Teacher/all as the collection endpoint intended for
 * discovery, so keep that contract separate from getTeachers().
 */
export function getStudentTutors(query: Pick<TeacherListQuery, 'page' | 'pageSize' | 'search'> = {}) {
	return apiClient.GET('/api/Teacher/all', { params: { query: { ...query, ...apiQuery() } } })
}
