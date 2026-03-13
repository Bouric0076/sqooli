import { useState } from "react";
import type { FC } from "react";
import { inputBase } from "../constants";
import { CalendarIcon } from "./Icons";
import { Label } from "./Primitives";
import { Dropdown, MultiSelect } from "./Select";

export const BasicInformation: FC = () => {
  const [subProgram, setSubProgram] = useState<string>("");
  const [eduLevel, setEduLevel]     = useState<string>("");
  const [gradeLevel, setGradeLevel] = useState<string>("");
  const [subjects, setSubjects]     = useState<string[]>(["Mathematics", "English"]);
  const [startDate, setStartDate]   = useState<string>("");
  const [endDate, setEndDate]       = useState<string>("");

  return (
    <>
      <h2 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#111827" }}>Basic Information</h2>
      <p style={{ margin: "0 0 26px", fontSize: 14, color: "#6b7280" }}>Add basic information about your resource</p>

      <div style={{ marginBottom: 20 }}>
        <Label>Sub- Program</Label>
        <input value={subProgram} onChange={e => setSubProgram(e.target.value)} style={inputBase} />
      </div>

      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
          <Label>Education Level</Label>
          <Dropdown placeholder="Select..." options={["Primary", "Secondary", "Higher"]} value={eduLevel} onChange={setEduLevel} />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Grade Level</Label>
          <Dropdown placeholder="Select..." options={["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5"]} value={gradeLevel} onChange={setGradeLevel} />
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <Label>Subject(s)</Label>
        <MultiSelect
          options={["Mathematics", "English", "Science", "History", "Art", "Music"]}
          selected={subjects}
          onAdd={s => setSubjects(p => [...p, s])}
          onRemove={s => setSubjects(p => p.filter(x => x !== s))}
        />
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Label>Program Start Date</Label>
          <div style={{ position: "relative" }}>
            <input
              placeholder="DD/MM/YYYY"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              style={{ ...inputBase, paddingRight: 38, color: startDate ? "#111827" : "#9ca3af" }}
            />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
              <CalendarIcon />
            </span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Label>Program End Date</Label>
          <div style={{ position: "relative" }}>
            <input
              placeholder="DD/MM/YYYY"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              style={{ ...inputBase, paddingRight: 38, color: endDate ? "#111827" : "#9ca3af" }}
            />
            <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
              <CalendarIcon />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
