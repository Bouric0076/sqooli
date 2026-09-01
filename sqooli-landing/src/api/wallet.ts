import type { components } from './generated/api'
import { apiClient, apiQuery, assertBusinessSuccess } from './client'

export type WalletListQuery = { page?: number; pageSize?: number; search?: string }

export function getWalletBalance() {
	return apiClient.GET('/api/wallet/balance', { params: { query: apiQuery() } })
}

export function getWalletTransactions(query: WalletListQuery = {}) {
	return apiClient.GET('/api/wallet/transactions', { params: { query: { ...query, ...apiQuery() } } })
}

export function topUpWalletWithMpesa(body: components['schemas']['MpesaTopupRequest']) {
	return apiClient.POST('/api/wallet/topup/mpesa', { params: { query: apiQuery() }, body })
}

export function verifyWalletPin(pin: string) {
	return apiClient.POST('/api/wallet/verify-pin', { params: { query: apiQuery() }, body: { pin } })
}

export async function setupWallet(body: components['schemas']['SetupWalletRequest']) {
	const response = await apiClient.POST('/api/wallet/setup', { params: { query: apiQuery() }, body })
	return assertBusinessSuccess(response.data, 'We could not activate your wallet.')
}
