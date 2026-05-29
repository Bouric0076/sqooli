// services/wallet.ts

import { lookupFetcher, LookupFilters } from "./lookups";


export interface Transaction {

  id: number;
  type: "deposit" | "withdrawal";
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
  method: string;
  details: string;

}

export const fetchWallet = async () => {
    const res = await fetch("/api/wallet");
    if (!res.ok) throw new Error("Failed to fetch wallet");
    return res.json();
  };
  
  // export const fetchTransactions = async (filters?: LookupFilters ) => {
  //   const res = await fetch("/api/wallet/transactions",filters);
  //   if (!res.ok) throw new Error("Failed to fetch transactions");
  //   return res.json();
  // };

  export const fetchTransactions = (filters?: LookupFilters) =>
    lookupFetcher<Transaction>("/api/wallet/transactions", filters);
  
  export const deposit = async (data: any) => {
    const res = await fetch("/api/wallet/deposit", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Deposit failed");
    return res.json();
  };
  
  export const withdraw = async (data: any) => {
    const res = await fetch("/api/wallet/withdraw", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Withdraw failed");
    return res.json();
  };