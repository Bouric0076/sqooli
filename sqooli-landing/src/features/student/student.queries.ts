import { useQuery } from '@tanstack/react-query'
import { getLesson, getLessonContent, getLessons, type LessonListQuery } from '../../api/lessons'
import { getMyEnrollments, getStudent, getStudents } from '../../api/student'
import { getStudentTutors, type TeacherListQuery } from '../../api/teachers'
import { getExamsForLesson, getQuizzesForLesson } from '../../api/assessments'

function extractRecords(payload: unknown): Record<string, unknown>[] {
	if (Array.isArray(payload)) return payload.filter((item): item is Record<string, unknown> => Boolean(item && typeof item === 'object'))
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results', 'lessons', 'quizzes', 'exams']) {
		if (Array.isArray(record[key])) return extractRecords(record[key])
		if (record[key] && typeof record[key] === 'object') {
			const nested = extractRecords(record[key])
			if (nested.length) return nested
		}
	}
	return []
}

export const studentQueryKeys = {
	all: ['students'] as const,
	list: (query: object) => ['students', 'list', query] as const,
	detail: (id: number | string) => ['students', 'detail', id] as const,
	lessons: ['lessons'] as const,
	lessonList: (query: LessonListQuery) => ['lessons', 'list', query] as const,
	lessonDetail: (id: number | string) => ['lessons', 'detail', id] as const,
	lessonContent: (id: number | string) => ['lessons', 'content', id] as const,
	teachers: (query: TeacherListQuery) => ['teachers', 'list', query] as const,
	assessments: (lessonId: number) => ['assessments', lessonId] as const,
	studentAssessments: ['assessments', 'student'] as const,
	enrollments: ['students', 'enrollments'] as const,
}

export function useLessons(query: LessonListQuery = {}) {
	return useQuery({
		queryKey: studentQueryKeys.lessonList(query),
		queryFn: async () => {
			const result = await getLessons(query)
			return result.data as unknown
		},
	})
}

export function useLesson(id: number | string | undefined) {
	return useQuery({
		queryKey: studentQueryKeys.lessonDetail(id ?? 'unknown'),
		enabled: id !== undefined,
		queryFn: async () => {
			if (id === undefined) throw new Error('A lesson id is required.')
			const result = await getLesson(id)
			return result.data as unknown
		},
	})
}

export function useLessonContent(id: number | undefined) {
	return useQuery({
		queryKey: studentQueryKeys.lessonContent(id ?? 'unknown'),
		enabled: id !== undefined,
		queryFn: async () => {
			if (id === undefined) throw new Error('A lesson id is required.')
			return (await getLessonContent(id)).data as unknown
		},
	})
}

export function useTeachers(query: TeacherListQuery = {}) {
	return useQuery({
		queryKey: studentQueryKeys.teachers(query),
		queryFn: async () => (await getStudentTutors(query)).data as unknown,
	})
}

export function useStudentEnrollments() {
	return useQuery({
		queryKey: studentQueryKeys.enrollments,
		queryFn: getMyEnrollments,
	})
}

export function useLessonAssessments(lessonId: number | undefined) {
	return useQuery({
		queryKey: studentQueryKeys.assessments(lessonId ?? 0),
		enabled: lessonId !== undefined,
		queryFn: async () => {
			if (lessonId === undefined) throw new Error('A lesson id is required.')
			const [quizzes, exams] = await Promise.all([getQuizzesForLesson(lessonId), getExamsForLesson(lessonId)])
			return { quizzes: quizzes.data as unknown, exams: exams.data as unknown }
		},
	})
}

export function useStudentAssessments() {
	return useQuery({
		queryKey: studentQueryKeys.studentAssessments,
		queryFn: async () => {
			const lessonResult = await getLessons({ page: 1, pageSize: 100 })
			const lessons = extractRecords(lessonResult.data)
			const results = await Promise.all(lessons.map(async lesson => {
				const rawId = lesson.id
				if (rawId === undefined || rawId === null || Number.isNaN(Number(rawId))) return []
				const lessonId = Number(rawId)
				const [quizzes, exams] = await Promise.allSettled([getQuizzesForLesson(lessonId), getExamsForLesson(lessonId)])
				const records = [
					...(quizzes.status === 'fulfilled' ? extractRecords(quizzes.value.data) : []),
					...(exams.status === 'fulfilled' ? extractRecords(exams.value.data) : []),
				]
				return records.map(assessment => ({ ...assessment, lessonId, lessonName: lesson.name }))
			}))
			return results.flat()
		},
	})
}

export function useStudents(query: { page?: number; pageSize?: number; search?: string } = {}) {
	return useQuery({
		queryKey: studentQueryKeys.list(query),
		queryFn: async () => {
			const result = await getStudents(query)
			return result.data as unknown
		},
	})
}

export function useStudent(id: number | string | undefined) {
	return useQuery({
		queryKey: studentQueryKeys.detail(id ?? 'unknown'),
		enabled: id !== undefined,
		queryFn: async () => {
			if (id === undefined) throw new Error('A student id is required.')
			const result = await getStudent(id)
			return result.data as unknown
		},
	})
}
