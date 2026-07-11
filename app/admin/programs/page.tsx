"use client";
import React, { useState, useMemo, useEffect } from "react";

import {  LookupItem } from "@/app/helpers/lookups";
import { getCPrograms } from "@/app/helpers/program";

interface Programme {
  id: string;
  programName: string;
  programType: string;
  curriculum: string;
  programStartDate: string;
  programEndDate: string;
  subPrograms: any[];
  createdAt?: string; // Fallback for dateAdded
}

export default function ProgramsPage() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [Programs, setPrograms] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real data
  useEffect(() => {
    setLoading(true);
    getCPrograms({})
      .then((data) => {
        setPrograms(data || []);
      })
      .catch((err) => console.error("Error fetching programs:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPrograms = useMemo(() => {
    return Programs.filter((p) => {
      const term = searchTerm.toLowerCase();

      return (
        p?.programName.toLowerCase().includes(term)
      );
    });
  }, [searchTerm]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Programs</h1>
        <p className="text-sm text-gray-500 mb-5">Manage Programs</p>
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
              <tr style={{ backgroundColor: "#FAFAFA" }}>
                {["Program Name", "Curriculum", "Duration", "Sub-programs", "Created By", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: "12.5px", fontWeight: 500, color: "#94A3B8", borderBottom: "1px solid #F1F5F9" }}>
                    {h}
                  </th>
                ))}
              </tr>
          </thead>

          <tbody>
            {filteredPrograms.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No results found
                </td>
              </tr>
            ) : (
              filteredPrograms.map((row,idx) => (
                <tr key={row.id} style={{ borderBottom: idx < filteredPrograms.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {row.programName}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.curriculum}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#64748B" }}>
                      {row.programStartDate} — {row.programEndDate}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.subPrograms?.length || 0}
                    </td>
                    <td style={{ padding: "18px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "#64748B" }}>
                          A
                        </div>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: 500, color: "#1E293B" }}>Admin</div>
                          <div style={{ fontSize: "11px", color: "#94A3B8" }}>School Staff</div>
                        </div>
                      </div>
                    </td>
       
                  </tr>
              ))
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
}
