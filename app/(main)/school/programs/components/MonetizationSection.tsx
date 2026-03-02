"use client";

import { useState } from "react";
import { CreditCard, Repeat, Tag } from "lucide-react";

type PricingModel = "free" | "one_time" | "subscription";

export default function MonetizationSection() {
  const [pricingModel, setPricingModel] = useState<PricingModel>("free");

  const [price, setPrice] = useState<number | "">("");
  const [billingCycle, setBillingCycle] = useState<
    "monthly" | "term" | "yearly"
  >("monthly");

  const isPaid = pricingModel !== "free";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Monetization & Pricing</h2>
        <p className="text-sm text-gray-500 mt-1">
          Define how this programme generates revenue.
        </p>
      </div>

      {/* Pricing Model Selection */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Tag size={18} />
          <h3 className="font-semibold text-sm">Pricing Model</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Free */}
          <div
            onClick={() => {
              setPricingModel("free");
              setPrice("");
            }}
            className={`cursor-pointer border rounded-xl p-4 text-center transition
              ${
                pricingModel === "free"
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-200 hover:shadow"
              }
            `}
          >
            <p className="font-medium text-sm">Free</p>
            <p className="text-xs mt-1 opacity-80">No payment required</p>
          </div>

          {/* One-Time */}
          <div
            onClick={() => setPricingModel("one_time")}
            className={`cursor-pointer border rounded-xl p-4 text-center transition
              ${
                pricingModel === "one_time"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-200 hover:shadow"
              }
            `}
          >
            <CreditCard size={20} className="mx-auto mb-2" />
            <p className="font-medium text-sm">One-Time Payment</p>
            <p className="text-xs mt-1 opacity-80">Single purchase fee</p>
          </div>

          {/* Subscription */}
          <div
            onClick={() => setPricingModel("subscription")}
            className={`cursor-pointer border rounded-xl p-4 text-center transition
              ${
                pricingModel === "subscription"
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-200 hover:shadow"
              }
            `}
          >
            <Repeat size={20} className="mx-auto mb-2" />
            <p className="font-medium text-sm">Subscription</p>
            <p className="text-xs mt-1 opacity-80">Recurring billing</p>
          </div>
        </div>
      </div>

      {/* Price Input */}
      {isPaid && (
        <div className="space-y-6">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price (KES)
            </label>
            <input
              type="number"
              min="0"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          {/* Billing Cycle */}
          {pricingModel === "subscription" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Billing Cycle
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["monthly", "term", "yearly"].map((cycle) => (
                  <button
                    key={cycle}
                    type="button"
                    onClick={() =>
                      setBillingCycle(cycle as "monthly" | "term" | "yearly")
                    }
                    className={`border rounded-lg px-3 py-2 text-sm capitalize transition
                      ${
                        billingCycle === cycle
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "border-gray-200 hover:bg-gray-50"
                      }
                    `}
                  >
                    {cycle}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live Pricing Summary */}
      <div className="bg-gray-50 border rounded-xl p-6">
        <h4 className="text-sm font-semibold mb-3">Pricing Summary</h4>

        {pricingModel === "free" && (
          <p className="text-green-600 text-sm">
            This programme is completely free.
          </p>
        )}

        {pricingModel === "one_time" && (
          <p className="text-gray-700 text-sm">
            One-time payment of <strong>{price ? `KES ${price}` : "—"}</strong>
          </p>
        )}

        {pricingModel === "subscription" && (
          <p className="text-gray-700 text-sm">
            Subscription of <strong>{price ? `KES ${price}` : "—"}</strong> per{" "}
            <strong>{billingCycle}</strong>
          </p>
        )}
      </div>
    </div>
  );
}
