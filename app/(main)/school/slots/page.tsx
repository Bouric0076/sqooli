"use client";

import React, { useEffect, useState } from "react";
import {
  acceptProgramSlot,
  rejectProgramSlot,
  getInvitedProgramSlots,
} from "@/app/helpers/program";

type Slot = {
  id: number;
  subjectName: string;
  slotDate: string;
  startTime: string;
  endTime: string;
  code: string;
  status: string;
  token: string; // 🔐 needed for secure accept/decline
};

function AllSlotspage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH SLOTS =================
  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await getInvitedProgramSlots();
      console.log("Fetched slots:", res.data);
      setSlots(res.data || []);
    } catch (error) {
      console.error("Failed to fetch slots", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  // ================= ACTIONS =================
  const handleAction = async (slot: Slot, action: "accept" | "decline") => {
    try {
      if (action === "accept") {
        await acceptProgramSlot({ token: slot.token });
      } else {
        await rejectProgramSlot({ token: slot.token });
      }

      // ✅ Update UI optimistically
      setSlots((prev) =>
        prev.map((s) =>
          s.id === slot.id
            ? { ...s, status: action === "accept" ? "Accepted" : "Declined" }
            : s
        )
      );
    } catch (error) {
      console.error(`Failed to ${action} slot`, error);
      alert(`Failed to ${action} slot: ${error}`);
    }
  };

  // ================= UI =================
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Slots</h1>

      {loading ? (
        <p>Loading slots...</p>
      ) : (
        <div className="bg-white rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-3">Subject</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Code</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {slots.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No slots available
                  </td>
                </tr>
              )}

              {slots.map((slot) => (
                <tr
                  key={slot.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-medium">
                    {slot.slotSubject || "N/A"}
                  </td>

                  <td className="p-3">
                    {new Date(slot.slotDate).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    {slot.startTime} - {slot.endTime}
                  </td>

                  <td className="p-3">{slot.code}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slot.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : slot.status === "Declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {slot.status}
                    </span>
                  </td>

                  <td className="p-3 text-right space-x-2">
                    {slot.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleAction(slot, "accept")}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleAction(slot, "decline")}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllSlotspage;