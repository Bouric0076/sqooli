"use client";

import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  getEducationLevels,
  getGradeLevels,
  getProgramTypes,
  getSubjects,
} from "@/app/helpers/lookups";
import { buildSchedule as generateTimeline } from "./scheduler";
import { PreviewSection } from "./PreviewSection";
import { BookIcon, CalendarIcon, CheckIcon, ClockIcon, SunIcon } from "./Icons";

/* ─────────────────────────────── UI BLOCKS ─────────────────────────────── */

function InfoRow({ label, value }: any) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 9,
        alignItems: "flex-start",
      }}
    >
      <span
        style={{
          fontSize: 13,
          color: "#9ca3af",
          minWidth: 130,
        }}
      >
        {label}
      </span>

      <span
        style={{
          fontSize: 13.5,
          color: value ? "#111827" : "#d1d5db",
          fontWeight: value ? 500 : 400,
          fontStyle: value ? "normal" : "italic",
        }}
      >
        {value || "Not set"}
      </span>
    </div>
  );
}

function Tag({ children }: any) {
  return (
    <span
      style={{
        display: "inline-block",
        background: "#eff6ff",
        color: "#1d4ed8",
        border: "1px solid #bfdbfe",
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 12.5,
        marginRight: 5,
        marginBottom: 5,
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────── MAIN ─────────────────────────────── */

export const ProgramPreview = ({
  form,
  onEditStep,
}: {
  form: UseFormReturn<any>;
  onEditStep: (step: number) => void;
}) => {
  const [programTypeName, setProgramTypeName] = useState("");
  const [curriculumName, setCurriculumName] = useState("");
  const [gradeName, setGradeName] = useState("");
  const [subjectNames, setSubjectNames] = useState<string[]>([]);

  const programName = form.watch("programName");
  const programTypeId = form.watch("programTypeId");
  const curriculumId = form.watch("curriculumId");
  const gradeLevelId = form.watch("gradeLevelId");
  const subjects = form.watch("subjects") || [];
  const startDate = form.watch("programStartDate");
  const endDate = form.watch("programEndDate");
  const days = form.watch("days") || {};
  const holidays = form.watch("holidays") || [];
  const lessonDuration = form.watch("lessonDuration") || 30;

  /* ───────── load labels ───────── */
  useEffect(() => {
    const load = async () => {
      if (programTypeId && curriculumId) {
        const types = await getProgramTypes({ curriculumId });
        setProgramTypeName(
          types?.find((t: any) => t.id === programTypeId)?.name || ""
        );
      }

      if (curriculumId) {
        const edu = await getEducationLevels({ curriculumId });
        setCurriculumName(
          edu?.find((c: any) => c.id === curriculumId)?.name || ""
        );
      }

      if (gradeLevelId && curriculumId) {
        const grades = await getGradeLevels({
          curriculumId,
          educationLevelId: gradeLevelId,
        });

        setGradeName(
          grades?.find((g: any) => g.id === gradeLevelId)?.name || ""
        );
      }

      if (subjects.length && gradeLevelId && curriculumId) {
        const all = await getSubjects({
          curriculumId,
          gradeLevelId,
        });

        setSubjectNames(
          subjects
            .map((id: number) => all.find((s: any) => s.id === id)?.name)
            .filter(Boolean)
        );
      }
    };

    load();
  }, [programTypeId, curriculumId, gradeLevelId, subjects]);

  const activeDays = Object.entries(days).filter(
    ([_, d]: any) => d?.on
  );

  const totalLessons = activeDays.reduce(
    (sum, [_, d]: any) =>
      sum +
      generateTimeline(d, lessonDuration).filter(
        (r: any) => r.type === "lesson"
      ).length,
    0
  );

  const totalBreaks = activeDays.reduce(
    (sum, [_, d]: any) => sum + (d?.breaks?.length || 0),
    0
  );

  const fmtDate = (d: any) =>
    d ? new Date(d).toLocaleDateString("en-GB") : "";

  return (
    <>
      {/* Page header */}
      {/* Page header */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #1960ae, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CheckIcon size={17} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#111827" }}>Preview</h2>
            <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>Review all settings before saving the program</p>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { icon: <BookIcon color="#1960ae" size={16} />, label: "Active Days", value: `${activeDays.length}/week`, bg: "#eff6ff", border: "#bfdbfe", vc: "#1d4ed8" },
            { icon: <ClockIcon color="#059669" size={16} />, label: "Lessons / Week", value: String(totalLessons), bg: "#ecfdf5", border: "#a7f3d0", vc: "#065f46" },
            { icon: <SunIcon color="#d97706" size={16} />, label: "Breaks Defined", value: String(totalBreaks), bg: "#fffbeb", border: "#fde68a", vc: "#92400e" },
            { icon: <SunIcon color="#7c3aed" size={16} />, label: "Holidays", value: String(holidays.length), bg: "#f5f3ff", border: "#ddd6fe", vc: "#5b21b6" },
          ].map((s, i) => (
            <div key={i} style={{ background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "11px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                {s.icon}
                <span style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
              </div>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.vc, lineHeight: 1 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Basic Info */}
      <PreviewSection label="Basic Information" onEdit={() => onEditStep(1)}>
        <InfoRow label="Program Name" value={programName} />
        <InfoRow label="Program Type" value={programTypeName} />
        <InfoRow label="Education Level" value={curriculumName} />
        <InfoRow label="Start Date" value={fmtDate(startDate)} />
        <InfoRow label="End Date" value={fmtDate(endDate)} />

        {gradeName && <Tag>{gradeName}</Tag>}

        {subjectNames.length > 0 && (
          <>
            {subjectNames.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </>
        )}
      </PreviewSection>

      {/* Weekly Schedule */}
      <PreviewSection label="Weekly Schedule" onEdit={() => onEditStep(2)}>
        {activeDays.map(([day, d]: any) => {
          const timeline = generateTimeline(d, lessonDuration);

          return (
            <div key={day} style={{ marginBottom: 12 }}>
              <strong>{day}</strong>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {timeline.map((t: any, i: number) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 12,
                      padding: "3px 8px",
                      borderRadius: 6,
                      background: t.type === "break" ? "#fef3c7" : "#eff6ff",
                    }}
                  >
                    {t.from} - {t.to}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </PreviewSection>

      {/* Holidays */}
      <PreviewSection label="Holidays" onEdit={() => onEditStep(2)}>
        {holidays.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SunIcon color="#d1d5db" size={15} />
            <p style={{ margin: 0, fontSize: 13.5, color: "#9ca3af", fontStyle: "italic" }}>No holidays defined.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {holidays.map((h, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <SunIcon color="#d97706" size={14} />
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: "#92400e" }}>{h.name}</span>
                  {h.recurring && <span style={{ fontSize: 11, fontWeight: 600, background: "#eff6ff", color: "#3b82f6", border: "1px solid #bfdbfe", borderRadius: 20, padding: "1px 7px" }}>Recurring</span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <CalendarIcon color="#d97706" />
                  <span style={{ fontSize: 12.5, color: "#b45309" }}>
                    {fmtDate(h.startDate)}{h.endDate && h.endDate !== h.startDate ? ` – ${fmtDate(h.endDate)}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PreviewSection>

      {/* Save */}
      {/* <div style={{ textAlign: "right", marginTop: 20 }}>
        <button
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 18px",
            borderRadius: 8,
            border: "none",
          }}
        >
          Save Program
        </button>
      </div> */}
    </>
  );
};