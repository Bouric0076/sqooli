import { apiClient, apiQuery } from './client'

export type LessonListQuery = {
	page?: number
	pageSize?: number
	search?: string
}

export type CreateLessonBody = {
	lessonTypeId: number | string
	curriculumId: number | string
	subjectId: number | string
	gradeLevelId: number | string
	educationLevelId: number | string
	topicId: number | string
	programId: number | string
	subProgramId: number | string
	name: string
	description: string
	date: string
	start: string
	end: string
}

export async function getLessons(query: LessonListQuery = {}) {
	return apiClient.GET('/api/Lesson', { params: { query: { ...query, ...apiQuery() } } })
}

export async function getLesson(id: number | string) {
	return apiClient.GET('/api/Lesson/{id}', { params: { path: { id }, query: apiQuery() } })
}

export async function getLessonContent(lessonId: number) {
	return apiClient.GET('/api/lesson-content/{lessonId}', { params: { path: { lessonId }, query: apiQuery() } })
}

export async function bookLesson(body: { lessonId: number | string; paymentMethod: string; email?: string | null }) {
	return apiClient.POST('/api/LessonBooking/book-lesson', { params: { query: apiQuery() }, body })
}

export async function createLesson(body: CreateLessonBody) {
	return apiClient.POST('/api/Lesson', { params: { query: apiQuery() }, body })
}
