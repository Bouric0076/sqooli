import { apiClient, apiQuery } from './client'

export type CatalogQuery = { page?: number; pageSize?: number; search?: string; curriculumId?: number | string; educationLevelId?: number | string; gradeLevelId?: number | string }

export type CatalogItem = {
	id?: number | string
	name: string
	curriculumId?: number | string
	educationLevelId?: number | string
	gradeLevelId?: number | string
	subjectId?: number | string
	programName?: string
	subPrograms?: { id?: number | string; name?: string }[]
	curriculum?: { id?: number | string; name?: string }
	educationLevel?: { id?: number | string; name?: string }
	gradeLevel?: { id?: number | string; name?: string }
}

export async function getCurricula(query: CatalogQuery = {}) {
	return apiClient.GET('/api/Curricula', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getCertificateLevels(query: Pick<CatalogQuery, 'page' | 'pageSize' | 'search'> = {}) {
	return apiClient.GET('/api/CertificateLevel', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getEducationLevels(query: CatalogQuery = {}) {
	return apiClient.GET('/api/Educationlevels', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getGradeLevels(query: CatalogQuery = {}) {
	return apiClient.GET('/api/GradeLevels', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getLessonTypes(query: CatalogQuery = {}) {
	return apiClient.GET('/api/LessonType', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getPrograms(query: CatalogQuery = {}) {
	return apiClient.GET('/api/Programs', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getSubjects(query: CatalogQuery = {}) {
	return apiClient.GET('/api/Subject', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getSchools(query: CatalogQuery = {}) {
	return apiClient.GET('/api/schools/my-schools', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getTopics(query: CatalogQuery = {}) {
	return apiClient.GET('/api/Topics', { params: { query: { ...query, ...apiQuery() } } })
}
