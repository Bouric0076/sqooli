import type { components } from './generated/api'
import { apiClient, apiQuery } from './client'

export function getQuizzesForLesson(lessonId: number) {
	return apiClient.GET('/api/Quizzes/lesson/{lessonId}', { params: { path: { lessonId }, query: apiQuery() } })
}

export function submitQuiz(body: components['schemas']['SubmitQuizRequest']) {
	return apiClient.POST('/api/Quizzes/submit', { params: { query: apiQuery() }, body })
}

export function getExamsForLesson(lessonId: number | string) {
	return apiClient.GET('/api/exams', { params: { query: { lessonId, ...apiQuery() } } })
}

export function submitExam(body: components['schemas']['SubmitExamRequest']) {
	return apiClient.POST('/api/exams/submit', { params: { query: apiQuery() }, body })
}

export function getAssignment(id: number | string) {
	return apiClient.GET('/api/Assignment/{assignmentId}', { params: { path: { assignmentId: id }, query: apiQuery() } })
}

export function submitAssignment(body: components['schemas']['SubmitAssignmentRequest']) {
	return apiClient.POST('/api/Assignment/submit', { params: { query: apiQuery() }, body })
}
