import { z } from 'zod'

const envSchema = z.object({
	// Leave this empty in browser builds so requests use the same-origin
	// reverse proxy (`/api`). An absolute URL remains available for tools or
	// environments that intentionally call the API directly.
	VITE_API_BASE_URL: z.string().min(1).optional(),
	VITE_API_VERSION: z.string().min(1).optional(),
	VITE_GOOGLE_CLIENT_ID: z.string().min(1).optional(),
})

const parsed = envSchema.parse(import.meta.env)

export const appConfig = {
	apiBaseUrl: parsed.VITE_API_BASE_URL ?? '',
	apiVersion: parsed.VITE_API_VERSION ?? '1.0',
	googleClientId: parsed.VITE_GOOGLE_CLIENT_ID ?? '',
} as const
