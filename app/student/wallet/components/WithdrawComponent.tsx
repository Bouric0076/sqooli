import React, { useState } from "react";

function WithdrawComponent() {
  const [show, setShow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const availableBalance = 2647;
  const minimumWithdrawal = 1000;

  /* ---------- Helpers ---------- */

  // Format with commas
  const formatNumber = (value: string) => {
    const numeric = value.replace(/,/g, "");
    if (!numeric) return "";
    return Number(numeric).toLocaleString();
  };

  // Get raw numeric value
  const getNumericValue = (value: string) => {
    return Number(value.replace(/,/g, ""));
  };

  /* ---------- Handle Input ---------- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/,/g, "");

    // Prevent negative
    if (value.startsWith("-")) return;

    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    setAmount(formatNumber(value));
    setError("");
  };

  /* ---------- Withdraw Logic ---------- */

  const handleWithdraw = async () => {
    const numericAmount = getNumericValue(amount);

    if (!numericAmount) {
      setError("Please enter an amount.");
      return;
    }

    if (numericAmount < minimumWithdrawal) {
      setError(
        `Minimum withdrawal is KES ${minimumWithdrawal.toLocaleString()}`
      );
      return;
    }

    if (numericAmount > availableBalance) {
      setError("Amount exceeds available balance.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShow(false);
      setShowSuccess(true);
      setAmount("");
    }, 1500);
  };

  const numericAmount = getNumericValue(amount);
  const isDisabled =
    loading ||
    !numericAmount ||
    numericAmount < minimumWithdrawal ||
    numericAmount > availableBalance;

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setShow(true)}
        className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm"
      >
        Withdraw
      </button>

      {/* Withdraw Modal */}
      {show && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShow(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#f5f5f7] rounded-2xl shadow-xl p-8 relative"
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Withdraw Earnings
            </h2>

            <p className="text-sm text-red-500 mb-6">
              Please note: You can only make one withdrawal every 48 Hours.
            </p>

            {/* Balance */}
            <div className="mb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Source of Funds
              </label>
              <div className="bg-indigo-100 rounded-xl px-4 py-4">
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-base font-medium text-gray-800">
                  KES {availableBalance.toLocaleString()}.00
                </p>
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Amount to withdraw
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  KES
                </span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleChange}
                  className="w-full text-gray-700 pl-14 pr-4 py-3 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Minimum Withdrawal: KES {minimumWithdrawal.toLocaleString()}
              </p>

              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={handleWithdraw}
                disabled={isDisabled}
                className={`px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition ${
                  isDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setShowSuccess(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-2xl">
              ✓
            </div>

            <h3 className="text-lg font-semibold mb-2">
              Withdrawal Successful
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              Your withdrawal request has been received and is being processed.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WithdrawComponent;
