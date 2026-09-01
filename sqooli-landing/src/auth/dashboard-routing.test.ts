import { describe, expect, it } from 'vitest'
import { getDashboardPath, getSafeReturnTo, hasAssignedDashboard, isDashboard } from './dashboard-routing'
import type { AuthUser } from './auth.types'

const user = (dashboard: AuthUser['dashboard']): AuthUser => ({ dashboard })

describe('dashboard routing', () => {
	it('uses the backend dashboard value for parent routing', () => {
		expect(getDashboardPath(user('parent'))).toBe('/parent/dashboard')
	})

	it('maps each supported dashboard to an allowlisted path', () => {
		expect(getDashboardPath(user('student'))).toBe('/student')
		expect(getDashboardPath(user('teacher'))).toBe('/teacher/dashboard')
		expect(getDashboardPath(user('school'))).toBe('/school/dashboard')
		expect(getDashboardPath(user('admin'))).toBe('/admin/dashboard')
	})

	it('does not treat a different dashboard as authorized', () => {
		expect(isDashboard(user('parent'), 'student')).toBe(false)
		expect(isDashboard(user('teacher'), 'teacher')).toBe(true)
		expect(isDashboard(user('platform-admin'), 'admin')).toBe(true)
		expect(isDashboard(user('school-admin'), 'school')).toBe(true)
	})

	it('allows an assigned but incomplete account to use its backend dashboard', () => {
		expect(hasAssignedDashboard({ ...user('student'), userType: 'Student', userRole: 'Student', isProfileComplete: false })).toBe(true)
		expect(hasAssignedDashboard({ ...user('admin'), userType: 'Pending', userRole: 'Pending', isProfileComplete: false })).toBe(false)
	})

	it('only accepts internal post-login destinations', () => {
		expect(getSafeReturnTo('/student/lessons?upcoming=1')).toBe('/student/lessons?upcoming=1')
		expect(getSafeReturnTo('https://example.com')).toBeNull()
		expect(getSafeReturnTo('//example.com')).toBeNull()
	})
})
