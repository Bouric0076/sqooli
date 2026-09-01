import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getWalletBalance, getWalletTransactions, topUpWalletWithMpesa, type WalletListQuery } from '../../api/wallet'

export const walletQueryKeys = {
	all: ['wallet'] as const,
	balance: ['wallet', 'balance'] as const,
	transactions: (query: WalletListQuery) => ['wallet', 'transactions', query] as const,
}

export function useWalletBalance() {
	return useQuery({ queryKey: walletQueryKeys.balance, queryFn: async () => (await getWalletBalance()).data as unknown, refetchInterval: 15000, refetchOnWindowFocus: true })
}

export function useWalletTransactions(query: WalletListQuery = {}) {
	return useQuery({ queryKey: walletQueryKeys.transactions(query), queryFn: async () => (await getWalletTransactions(query)).data as unknown, refetchInterval: 15000, refetchOnWindowFocus: true })
}

export function useWalletTopUp() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: topUpWalletWithMpesa,
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: walletQueryKeys.all })
		},
	})
}
