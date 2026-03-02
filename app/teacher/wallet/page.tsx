"use client";

import { useState } from "react";
import { Search, MoreVertical, EyeOff } from "lucide-react";

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("earnings");

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* LEFT SIDEBAR */}
      <div className="w-80 bg-white p-6 space-y-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-purple-200 flex items-center justify-center text-xl font-bold">
            🎓
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              Mathematic Excellence Academy
            </h2>
            <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded-full">
              Online School
            </span>
          </div>
        </div>

        <div className="text-sm space-y-1 text-gray-600">
          <p>Contact Information</p>
          <p>+254712 345 678</p>
          <p>mathematicexcel@gmail.com</p>
        </div>

        <button className="w-full bg-purple-600 text-white py-2 rounded-xl">
          Switch Account
        </button>

        <div className="bg-purple-50 p-4 rounded-2xl space-y-2">
          <h3 className="font-semibold text-sm">Refer & Earn with Sqooli</h3>
          <p className="text-xs text-gray-600">
            Share your unique link to students & parents to join Sqooli
          </p>
          <button className="bg-white px-3 py-1 text-sm rounded-lg border">
            Copy Link
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Wallet</h1>
          <p className="text-gray-500 text-sm">
            View your transactions and manage your wallet
          </p>
        </div>

        {/* TOP SECTION */}
        <div className="flex gap-6">
          {/* WALLET CARD */}
          <div className="w-[420px] bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-6 rounded-2xl relative overflow-hidden">
            <div className="flex justify-between items-start">
              <p className="text-sm opacity-80">A/C 000000</p>
              <MoreVertical size={18} />
            </div>

            <div className="mt-6">
              <p className="text-xs opacity-80">Available Balance</p>
              <p className="text-lg font-medium">KES 0.00</p>
            </div>

            <div className="mt-4">
              <p className="text-xs opacity-80">Actual Balance</p>
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold">KES 0.00</h2>
                <EyeOff size={18} />
              </div>
            </div>

            <div className="mt-6 text-sm opacity-90">
              <p>Saved Method:</p>
              <p>Paybill: 2*****7</p>
              <p>Account No: 0*********5463</p>
            </div>

            <div className="flex gap-3 mt-6">
              <button className="bg-white text-purple-600 px-4 py-2 rounded-xl font-medium">
                Withdraw
              </button>
              <button className="bg-white/20 px-4 py-2 rounded-xl border border-white/30">
                Edit
              </button>
            </div>
          </div>

          {/* SEARCH + TABS */}
          <div className="flex-1 bg-white rounded-2xl p-6 shadow-sm">
            <div className="relative mb-6">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border rounded-xl"
              />
            </div>

            <div className="flex gap-6 border-b pb-3 mb-4">
              <button
                onClick={() => setActiveTab("earnings")}
                className={`pb-2 ${
                  activeTab === "earnings"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Earnings
              </button>
              <button
                onClick={() => setActiveTab("topups")}
                className={`pb-2 ${
                  activeTab === "topups"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Top-Ups
              </button>
              <button
                onClick={() => setActiveTab("withdrawals")}
                className={`pb-2 ${
                  activeTab === "withdrawals"
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                Withdrawals
              </button>
            </div>

            {/* TRANSACTIONS */}
            <div className="space-y-4">
              <div className="text-xs text-gray-400">24 APR 2025</div>

              <TransactionItem />
              <TransactionItem />

              <div className="text-xs text-gray-400 mt-6">25 APR 2025</div>

              <TransactionItem />
              <TransactionItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TransactionItem() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center">
          S
        </div>
        <div>
          <p className="font-medium">Commission</p>
          <p className="text-sm text-gray-500">Campaign #123456</p>
        </div>
      </div>

      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
        Complete
      </span>
    </div>
  );
}
