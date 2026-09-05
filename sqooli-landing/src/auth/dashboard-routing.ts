import type { AuthUser, Dashboard } from './auth.types'

const dashboardPaths: Record<Dashboard, string> = {
	parent: '/parent/dashboard',
	student: '/student',
	teacher: '/teacher/dashboard',
	school: '/school/dashboard',
	'school-admin': '/school/dashboard',
	admin: '/admin/dashboard',
	'platform-admin': '/admin/dashboard',
}

export function getDashboardPath(user: AuthUser) {
	return dashboardPaths[user.dashboard]
}

/**
 * Send teachers who still need setup through onboarding before opening the
 * dashboard. A missing completion value is treated as unknown so older API
 * responses continue to use the normal dashboard route.
 */
export function getPostAuthPath(user: AuthUser) {
	if (user.dashboard === 'teacher' && user.isProfileComplete === false) return '/teacher/onboarding'
	return getDashboardPath(user)
}

export function isDashboard(user: AuthUser, dashboard: Dashboard) {
	if (dashboard === 'admin') return user.dashboard === 'admin' || user.dashboard === 'platform-admin'
	if (dashboard === 'school') return user.dashboard === 'school' || user.dashboard === 'school-admin'
	return user.dashboard === dashboard
}

/** A stale dashboard must not grant access to an account still awaiting role assignment. */
export function hasAssignedDashboard(user: AuthUser) {
	const accountTypes = [user.userType, user.userRole].filter(Boolean).map((value) => value?.toLowerCase())
	return !accountTypes.includes('pending') && accountTypes.length > 0
}

/** Only allow an internal route to be used as the post-login destination. */
export function getSafeReturnTo(value: string | null) {
	if (!value || !value.startsWith('/') || value.startsWith('//')) return null
	return value
}
