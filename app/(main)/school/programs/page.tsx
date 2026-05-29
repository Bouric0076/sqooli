"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCPrograms } from "@/app/helpers/program";
import Loader from "@/components/ui/Loader";

// Define the interface based on your API structure
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

type Tab = "Active" | "Inactive" | "Pending Approval" | "Drafts";
const TABS: Tab[] = ["Active", "Inactive", "Pending Approval", "Drafts"];

export default function ProgramsPage() {
  const router = useRouter();
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // Fetch real data
  useEffect(() => {
    setLoading(true);
    getCPrograms({})
      .then((data) => {
        setProgrammes(data || []);
      })
      .catch((err) => console.error("Error fetching programs:", err))
      .finally(() => setLoading(false));
  }, []);

  // Filter based on search input
  const filtered = programmes.filter((p) =>
    p.programName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
<Loader />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "28px 32px",
        boxSizing: "border-box",
      }}

      className="bg-gray-100"
    >
      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0F172A", lineHeight: "1.25", letterSpacing: "-0.2px" }}>
            Programs
          </h1>
          <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "#94A3B8", fontWeight: 400 }}>
            Manage and monitor academic programmes
          </p>
        </div>

        <button
          onClick={() => router.push("/school/programs/create")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#3B9EFF",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>+</span>
          Create Program
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "0 14px",
          marginBottom: "12px",
          height: "44px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginRight: "8px" }}>
          <circle cx="7" cy="7" r="4.5" stroke="#94A3B8" strokeWidth="1.4" />
          <path d="M10.5 10.5L13 13" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search programs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", color: "#374151", backgroundColor: "transparent" }}
        />
      </div>

      {/* ── Main Content Card ── */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #F1F5F9", paddingLeft: "20px" }}>
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 16px 13px",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#3B9EFF" : "#64748B",
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2px solid #3B9EFF" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#FAFAFA" }}>
                {["Program Name", "Curriculum", "Duration", "Sub-programs", "Created By", ""].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: "12.5px", fontWeight: 500, color: "#94A3B8", borderBottom: "1px solid #F1F5F9" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>Loading programs...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>No programs found.</td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F1F5F9" : "none" }}>
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
                    <td style={{ padding: "18px 20px", textAlign: "right" }}>
                      <button 
                        onClick={() => router.push(`/school/programs/${row.id}/sub-programs`)}
                        style={{ background: "none", border: "none", color: "#3B9EFF", fontWeight: 500, fontSize: "13.5px", cursor: "pointer" }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}