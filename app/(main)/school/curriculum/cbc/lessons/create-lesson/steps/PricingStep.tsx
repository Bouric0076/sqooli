import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";

/* ================= Types ================= */

type RevenueShare = {
  user: string;
  commissionType: string;
  value: string | number;
};

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function PricingStep({ form, lessonId, onNext }: Props) {
  const {
    formState: { isSubmitting },
  } = form;

  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );

  const [rate, setRate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [revenueShares, setRevenueShares] = useState<RevenueShare[]>([]);
  const [loading, setLoading] = useState(false);

  const serviceFeeRate = 0.2;

  const serviceFee = useMemo(() => {
    return rate ? Number(rate) * serviceFeeRate : 0;
  }, [rate]);

  const youReceive = useMemo(() => {
    return rate ? Number(rate) - serviceFee : 0;
  }, [rate, serviceFee]);

  /* ================= LOAD PRICING ================= */

  useEffect(() => {
    if (!lessonId) return;

    const loadPricing = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/lesson/revenue-share?lessonId=${lessonId}`
        );

        const data = await res.json();

        setRate(String(data?.price ?? ""));
        setRevenueShares(
          Array.isArray(data?.revenueShares) ? data.revenueShares : []
        );
      } catch (err) {
        console.error("Failed to load lesson pricing", err);
      } finally {
        setLoading(false);
      }
    };

    loadPricing();
  }, [lessonId]);

  /* ================= SAVE PRICING ================= */

  const savePricing = async () => {
    if (!lessonId) return;
    form.setValue("price", rate ? Number(rate) : 0);

    try {
      setLoading(true);

      await fetch("/api/lesson/revenue-share", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          price: Number(rate),
          revenueShares: revenueShares.map((r) => ({
            userId: r.user,
            commissionType: r.commissionType,
            value: Number(r.value),
          })),
        }),
      });

      onNext(lessonId);
    } catch (err) {
      console.error("Failed to save pricing", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border border-gray-200 mt-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">Pricing</h2>
        <p className="text-sm text-gray-500">
          Setup your pricing for each lesson
        </p>
      </div>

      {/* Pricing Rows */}
      <div className="space-y-6">
        <PricingRow label="Rate per Lesson" description="Total client will see">
          <CurrencyInput
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </PricingRow>

        <PricingRow
          label="Sqooli Service Fee"
          description="Sqooli charges 20% on every transaction"
        >
          <CurrencyPill value={serviceFee} />
        </PricingRow>

        <PricingRow
          label="What you will receive"
          description="The estimated amount after service fees"
        >
          <CurrencyPill value={youReceive} />
        </PricingRow>
      </div>

      {/* Revenue Shares */}
      <div className="mt-8">
        <p className="text-sm font-medium text-gray-800">
          Do you have additional revenue shares?
        </p>
        <p className="text-xs text-gray-500 mb-3">
          Add other custom deductions on your earnings
        </p>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50"
        >
          <span className="text-lg">+</span>
          Add Revenue Shares
        </button>

        {revenueShares.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            {revenueShares.map((item, index) => (
              <li
                key={index}
                className="flex justify-between border border-gray-300 p-3 rounded-lg"
              >
                <span>{item.user}</span>
                <span>
                  {item.commissionType} : {item.value}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-12">
        <button className="text-sm text-gray-600">← Back</button>
        <button
          onClick={savePricing}
          disabled={loading || isSubmitting}
          className="bg-gray-900 text-white px-6 py-2 rounded-full text-sm"
        >
          {loading ? "Saving..." : "Save & Submit →"}
        </button>
      </div>

      {/* Modal */}
      <AddRevenueShareModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data: RevenueShare) => {
          setRevenueShares([...revenueShares, data]);
          setShowModal(false);
        }}
      />
    </div>
  );
}

/* ================= Modal ================= */

function AddRevenueShareModal({ open, onClose, onSave }: any) {
  const [user, setUser] = useState("");
  const [commissionType, setCommissionType] = useState("Fixed Value");
  const [value, setValue] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 ">
      <div className="w-full max-w-xl bg-white rounded-xl p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900">Add Revenue Shares</h3>
          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium">Select User</label>
            <input
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Type to search"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Commission Type</label>
            <div className="grid grid-cols-2 gap-3 mt-2 text-sm">
              {[
                "Fixed Value",
                "Fixed Percentage",
                "Tiered Value",
                "Tiered Percentage",
              ].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={commissionType === type}
                    onChange={() => setCommissionType(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Enter Value</label>
            <input
              type="number"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={() => onSave({ user, commissionType, value })}
            className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= Small UI Helpers ================= */

function PricingRow({ label, description, children }: any) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}

function CurrencyInput({ value, onChange }: any) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-40">
      <span className="text-xs text-gray-500">KES</span>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder="0.00"
        className="bg-transparent w-full outline-none text-sm"
      />
    </div>
  );
}

function CurrencyPill({ value }: any) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 w-40 justify-end">
      <span className="text-xs text-gray-500">KES</span>
      <span className="text-sm font-medium">{value.toFixed(2)}</span>
    </div>
  );
}
