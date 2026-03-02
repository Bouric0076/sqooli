"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { getContract } from "@/app/helpers/lookups";
import { useRouter } from "next/navigation";

type Props = {
  onBack: () => void;
};

type ContractSection = {
  title: string;
  content: string;
};

export default function Step5Contract({ onBack }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [acceptContract, setAcceptContract] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [contractSections, setContractSections] = useState<ContractSection[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const data = await getContract({ type: "Teacher" });
        setContractSections(data);
      } catch (error) {
        console.error("Failed to load contract:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, []);

  const handleSubmit = async () => {
    if (!acceptContract || !acceptTerms) return;

    // Here you would typically call an API to save the acceptance
    // For example: await acceptContractAPI();

    // After successful submission, navigate to the next step or dashboard

    try {
      const res = await fetch("/api/accept-contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acceptTerms: true,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      console.log("Saved:", result);
      router.push("/teacher/wallet");
    } catch (error: any) {
      console.error("Save failed:", error.message);
    }
  };

  return (
    <div className="w-full max-w-3xl space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Contract</h2>

      {/* Accordion */}
      <div className="border rounded-xl divide-y bg-white">
        {loading && (
          <div className="p-4 text-sm text-gray-500">Loading contract...</div>
        )}

        {!loading &&
          contractSections.map((section, index) => (
            <div key={index}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left hover:bg-gray-50"
              >
                <span className="text-gray-700 font-medium">
                  {section.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-600 whitespace-pre-line">
                  {section.content}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Checkboxes */}
      <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={acceptContract}
            onChange={(e) => setAcceptContract(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />
          I accept all the clauses in this contract
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 accent-indigo-600"
          />
          I accept{" "}
          <span className="text-indigo-600 underline cursor-pointer">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-indigo-600 underline cursor-pointer">
            Privacy Policy
          </span>
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={!acceptContract || !acceptTerms}
          className="bg-indigo-600 text-white px-8 py-2 rounded-full disabled:opacity-50 hover:bg-indigo-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
