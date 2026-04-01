"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getInvitedProgramSlots, rejectProgramSlot } from "@/app/helpers/program";
import axiosClient from "@/app/lib/axiosClient";

type SlotDetails = {
  id: number;
  subjectName: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  code: string;
  curriculum: string;
  educationLevel: string;
  gradeLevel: string;
  status: string;
};

function RejectSlotInvitepage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "ready" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [slot, setSlot] = useState<SlotDetails | null>(null);

  // ================= FETCH SLOT DETAILS =================
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing invitation token.");
      return;
    }

    const fetchSlotDetails = async () => {
      try {
        const res = await getInvitedProgramSlots({ token });

        console.log("Fetched slot details:", res.data);

        setSlot(res.data);
        setStatus("ready");
      } catch (err: any) {
        setStatus("error");
        setMessage(err?.response?.data?.message || "Failed to load slot details");
      }
    };

    fetchSlotDetails();
  }, [token]);

  // ================= HANDLE REJECT =================
  const handleReject = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      await rejectProgramSlot({ token });
      setStatus("success");
      setMessage("Slot declined successfully!");
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.response?.data?.message || "Failed to decline slot");
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg text-center">
        {status === "loading" && (
          <>
            <h2 className="text-lg font-semibold mb-2">Processing...</h2>
            <p className="text-gray-500">Please wait</p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">❌ Error</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === "ready" && slot && (
          <>
            <h2 className="text-2xl font-semibold mb-4">{slot.subjectName}</h2>

            <div className="text-left mb-6">
              <p><strong>Curriculum:</strong> {slot.curriculum}</p>
              <p><strong>Education Level:</strong> {slot.educationLevel}</p>
              <p><strong>Grade Level:</strong> {slot.gradeLevel}</p>
              <p><strong>Date:</strong> {new Date(slot.slotDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
              <p><strong>Slot Code:</strong> {slot.code}</p>
            </div>

            <button
              onClick={handleReject}
              className="px-6 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700"
            >
              ❌ Confirm Reject
            </button>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold text-red-600 mb-2">❌ Slot Declined</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default RejectSlotInvitepage;