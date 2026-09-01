import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { normalizePermissions } from './permissions'

export const selectAuthUser = (state: RootState) => state.auth.user
export const selectIsAuthenticated = (state: RootState) => state.auth.status === 'authenticated'
export const selectPermissions = createSelector(selectAuthUser, normalizePermissions)
