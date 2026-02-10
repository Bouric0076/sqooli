import React from "react";
import { X } from "lucide-react";
import MyModal from "@/app/components/general/modals/MyModal";

interface Payment {
  id: string;
  amount: number;
  transactionCode: string;
  date: string;
  invoiceType: string;
  status: boolean;
  receipt: string;
  timestamp: string;
}

interface PaymentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  payment: Payment;
}

export default function PaymentDetailsModal({
  open,
  onClose,
  payment,
}: PaymentDetailsModalProps) {
  if (!open) return null;

  // console.log("Payment details:", payment);

  return (
    <MyModal
      open={open}
      onClose={onClose}
      title={
        <span className="text-sm text-gray-500">
          Payments &gt;{" "}
          <span className="font-semibold text-blue-600">
            #{payment.receipt}
          </span>
        </span>
      }
      description=""
    >
      {/* Status */}
      <div className="flex justify-center mb-3">
        <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white">
          {payment.status}
        </span>
      </div>

      {/* Amount */}
      <h2 className="text-center text-3xl font-bold mb-2">+{payment.amount}</h2>
      <p className="text-center text-gray-400 text-sm mb-4">
        {payment.receipt}
      </p>

      <div className="border-t border-gray-200 my-4" />

      {/* Details */}
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-400">Transaction Date</p>
          <p className="font-medium">{payment.timestamp}</p>
        </div>

        <div className="border-t pt-3">
          <p className="text-gray-400">Transaction Code</p>
          <p className="font-medium">{payment.receipt}</p>
        </div>

        <div className="border-t pt-3">
          <p className="text-gray-400">Invoice Type</p>
          <p className="font-medium">Lesson Payment</p>
        </div>
      </div>

      {/* Button */}
      <button className="mt-6 w-full bg-blue-400 text-white py-2 rounded-full hover:bg-blue-300 transition">
        Download Receipt
      </button>
    </MyModal>
  );
}
