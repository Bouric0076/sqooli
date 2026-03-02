// services/wallet.ts

export const fetchWallet = async () => {
    const res = await fetch("/api/wallet");
    if (!res.ok) throw new Error("Failed to fetch wallet");
    return res.json();
  };
  
  export const fetchTransactions = async () => {
    const res = await fetch("/api/wallet/transactions");
    if (!res.ok) throw new Error("Failed to fetch transactions");
    return res.json();
  };
  
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