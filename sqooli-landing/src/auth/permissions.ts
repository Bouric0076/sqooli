import type { AuthUser } from './auth.types'

export type Permission = string

export function normalizePermissions(user: AuthUser | null): Permission[] {
	if (!user) return []
	const values = [
		...(user.permissions ?? []),
		...(user.permission ?? []),
		...(typeof user.role === 'string' ? [user.role] : user.role ?? []),
	]
	return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

export function hasPermission(user: AuthUser | null, permission: Permission) {
	return normalizePermissions(user).includes(permission)
}

export function hasAnyPermission(user: AuthUser | null, permissions: Permission[]) {
	const normalized = normalizePermissions(user)
	return permissions.some((permission) => normalized.includes(permission))
}
