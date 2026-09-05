import { useQuery } from '@tanstack/react-query'
import { useQueries } from '@tanstack/react-query'
import { getCurricula, getEducationLevels, getGradeLevels, getLessonTypes, getPrograms, getSubjects, getTopics, type CatalogItem } from '../../api/catalogs'
import { getLessonBookings, getLessons, type LessonBookingListQuery, type LessonListQuery } from '../../api/lessons'
import { getTeacherProfile } from '../../api/teachers'

export const teacherQueryKeys = {
	profile: ['teacher', 'profile'] as const,
	lessons: (query: LessonListQuery) => ['teacher', 'lessons', query] as const,
	bookings: (query: LessonBookingListQuery) => ['teacher', 'bookings', query] as const,
}

export function useTeacherProfile() {
	return useQuery({
		queryKey: teacherQueryKeys.profile,
		queryFn: async () => (await getTeacherProfile()).data as unknown,
	})
}

export function useTeacherLessons(query: LessonListQuery = {}) {
	return useQuery({
		queryKey: teacherQueryKeys.lessons(query),
		queryFn: async () => (await getLessons(query)).data as unknown,
	})
}

export function useTeacherBookings(query: LessonBookingListQuery = {}) {
	return useQuery({
		queryKey: teacherQueryKeys.bookings(query),
		queryFn: async () => (await getLessonBookings(query)).data as unknown,
	})
}

function extractItems(payload: unknown): CatalogItem[] {
	if (Array.isArray(payload)) return payload as CatalogItem[]
	if (!payload || typeof payload !== 'object') return []
	const record = payload as Record<string, unknown>
	for (const key of ['data', 'items', 'results']) {
		if (Array.isArray(record[key])) return record[key] as CatalogItem[]
	}
	return []
}

export function useTeacherLessonCatalogs() {
	const results = useQueries({ queries: [
		{ queryKey: ['teacher', 'catalog', 'curricula'], queryFn: async () => (await getCurricula({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'education-levels'], queryFn: async () => (await getEducationLevels({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'grade-levels'], queryFn: async () => (await getGradeLevels({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'lesson-types'], queryFn: async () => (await getLessonTypes({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'programs'], queryFn: async () => (await getPrograms({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'subjects'], queryFn: async () => (await getSubjects({ page: 1, pageSize: 100 })).data },
		{ queryKey: ['teacher', 'catalog', 'topics'], queryFn: async () => (await getTopics({ page: 1, pageSize: 100 })).data },
	] })
	return {
		curricula: extractItems(results[0].data),
		educationLevels: extractItems(results[1].data),
		gradeLevels: extractItems(results[2].data),
		lessonTypes: extractItems(results[3].data),
		programs: extractItems(results[4].data),
		subjects: extractItems(results[5].data),
		topics: extractItems(results[6].data),
		isLoading: results.some(result => result.isLoading),
		isError: results.some(result => result.isError),
	}
}
