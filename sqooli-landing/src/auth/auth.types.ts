import { z } from 'zod'

export const dashboardSchema = z.enum(['parent', 'student', 'teacher', 'school', 'school-admin', 'admin', 'platform-admin'])
export type Dashboard = z.infer<typeof dashboardSchema>

export const authUserSchema = z.object({
	userId: z.string().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	email: z.string().email().optional(),
	phone: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	gender: z.string().nullable().optional(),
	dob: z.string().nullable().optional(),
	userType: z.string().optional(),
	userRole: z.string().optional(),
	isEmailConfirmed: z.boolean().nullable().optional(),
	isProfileComplete: z.boolean().nullable().optional(),
	dashboard: dashboardSchema,
	permissions: z.array(z.string()).optional(),
	permission: z.array(z.string()).optional(),
	role: z.union([z.string(), z.array(z.string())]).optional(),
	studentEnrollment: z.unknown().nullable().optional(),
}).passthrough()

export type AuthUser = z.infer<typeof authUserSchema>

export const loginResponseSchema = z.object({
	access_token: z.string().optional(),
	accessToken: z.string().optional(),
	token: z.string().optional(),
	user: authUserSchema,
	message: z.string().optional(),
	status: z.boolean().optional(),
}).passthrough().transform((response) => ({
	accessToken: response.access_token ?? response.accessToken ?? response.token ?? '',
	user: response.user,
	message: response.message,
	status: response.status,
}))

export type AuthSession = {
	accessToken: string
	user: AuthUser
}

const currentUserDataSchema = z.object({
	id: z.string().optional(),
	userName: z.string().optional(),
	email: z.string().email().optional(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	phone: z.string().nullable().optional(),
	gender: z.string().nullable().optional(),
	dob: z.string().nullable().optional(),
	address: z.string().nullable().optional(),
	userType: z.string().optional(),
	userRole: z.string().optional(),
	dashboard: dashboardSchema.optional(),
	isVerified: z.boolean().optional(),
	isActive: z.boolean().optional(),
	isProfileComplete: z.boolean().optional(),
	roles: z.array(z.string()).optional(),
	role: z.union([z.string(), z.array(z.string())]).optional(),
	schoolId: z.union([z.string(), z.number()]).nullable().optional(),
	schoolName: z.string().nullable().optional(),
	studentEnrollment: z.unknown().nullable().optional(),
}).passthrough()

export const currentUserResponseSchema = z.object({
	status: z.boolean().optional(),
	message: z.string().optional(),
	data: currentUserDataSchema,
}).passthrough()

export type CurrentUserData = z.infer<typeof currentUserDataSchema>
