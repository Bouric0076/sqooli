"use client";
import React, { useState, useMemo } from "react";
import PaymentDetailsModal from "./partials/PaymentDetailsModal";

const payments = [
  {
    id: 1,
    timestamp: "24 Jan 2025 11:00 AM",
    receipt: "435236787",
    lessonId: "4528249742",
    name: "Olivia Rhye",
    email: "oliviaryhe@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    amount: "KES 652.00",
    status: "Complete",
  },
  {
    id: 2,
    timestamp: "24 Jan 2025 11:00 AM",
    receipt: "435236787",
    lessonId: "4528249742",
    name: "Phoenix Baker",
    email: "phoenixbaker@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    amount: "KES 652.00",
    status: "Complete",
  },
  {
    id: 3,
    timestamp: "24 Jan 2025 11:00 AM",
    receipt: "435236787",
    lessonId: "4528249742",
    name: "Lana Steiner",
    email: "lanasteiner@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    amount: "KES 652.00",
    status: "Complete",
  },
];

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const term = searchTerm.toLowerCase();

      return (
        p.name.toLowerCase().includes(term) ||
        p.email.toLowerCase().includes(term) ||
        p.receipt.includes(term) ||
        p.lessonId.includes(term) ||
        p.status.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Payments</h1>
        <p className="text-sm text-gray-500 mb-5">Manage payments</p>
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-lg shadow px-3 py-2 mb-4">
        <input
          type="text"
          placeholder="Search by name, email, receipt, lesson ID..."
          className="w-full outline-none text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="text-gray-400">☰</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Timestamp</th>
              <th className="px-4 py-3 text-left">Receipt NO</th>
              <th className="px-4 py-3 text-left">Lesson ID</th>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left"></th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No results found
                </td>
              </tr>
            ) : (
              filteredPayments.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{p.timestamp}</td>
                  <td className="px-4 py-3">{p.receipt}</td>
                  <td className="px-4 py-3">{p.lessonId}</td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">{p.amount}</td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white">
                      {p.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-blue-600 font-medium cursor-pointer hover:underline">
                    <button onClick={() => setSelectedPayment(p)}>View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaymentDetailsModal
        open={!!selectedPayment}
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
