import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthSession, AuthUser } from './auth.types'

type AuthState = {
	status: 'authenticated' | 'unauthenticated'
	accessToken: string | null
	user: AuthUser | null
}

const initialState: AuthState = {
	status: 'unauthenticated',
	accessToken: null,
	user: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setSession: (state, action: PayloadAction<AuthSession>) => {
			state.status = 'authenticated'
			state.accessToken = action.payload.accessToken
			state.user = action.payload.user
		},
		clearSession: (state) => {
			state.status = 'unauthenticated'
			state.accessToken = null
			state.user = null
		},
		updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
			if (state.user) state.user = { ...state.user, ...action.payload }
		},
	},
})

export const { setSession, clearSession, updateUser } = authSlice.actions
export default authSlice.reducer
