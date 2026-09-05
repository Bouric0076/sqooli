import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../store'
import type { Dashboard } from './auth.types'
import { getPostAuthPath, hasAssignedDashboard, isDashboard } from './dashboard-routing'

export function RequireAuth() {
	const location = useLocation()
	const authenticated = useAppSelector((state) => state.auth.status === 'authenticated')
	if (!authenticated) return <Navigate to={`/login?returnTo=${encodeURIComponent(location.pathname + location.search)}`} replace />
	return <Outlet />
}

export function RequireDashboard({ dashboard }: { dashboard: Dashboard }) {
	const user = useAppSelector((state) => state.auth.user)
	const location = useLocation()
	if (!user) return <Navigate to="/login" replace />
	if (!hasAssignedDashboard(user) || !isDashboard(user, dashboard)) return <Navigate to="/forbidden" replace />
	if (dashboard === 'teacher' && getPostAuthPath(user) === '/teacher/onboarding' && location.pathname !== '/teacher/onboarding') return <Navigate to="/teacher/onboarding" replace />
	return <Outlet />
}
