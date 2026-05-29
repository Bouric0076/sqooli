import { useState } from "react";
import type { FC } from "react";

import { ChevronDown } from "./Icons";
import { inputBase } from "./constants";

interface DropdownProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ placeholder, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          ...inputBase, display: "flex", justifyContent: "space-between",
          alignItems: "center", cursor: "pointer",
          color: value ? "#111827" : "#9ca3af", paddingRight: 10,
        }}
      >
        <span>{value || placeholder}</span>
        <span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "1px solid #d1d5db", borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200,
        }}>
          {options.map(o => (
            <div
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >{o}</div>
          ))}
        </div>
      )}
    </div>
  );
};

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
}

export const MultiSelect: FC<MultiSelectProps> = ({ options, selected, onAdd, onRemove }) => {
  const [open, setOpen] = useState(false);
  const avail = options.filter(o => !selected.includes(o));
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          ...inputBase, display: "flex", justifyContent: "space-between",
          alignItems: "center", cursor: "pointer", color: "#9ca3af", paddingRight: 10,
        }}
      >
        <span>Select...</span>
        <span style={{ color: "#9ca3af" }}><ChevronDown /></span>
      </div>
      {open && avail.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "1px solid #d1d5db", borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,.1)", zIndex: 200,
        }}>
          {avail.map(o => (
            <div
              key={o}
              onClick={() => { onAdd(o); setOpen(false); }}
              style={{ padding: "9px 13px", fontSize: 14, cursor: "pointer", color: "#111827" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "")}
            >{o}</div>
          ))}
        </div>
      )}
      {selected.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {selected.map(s => (
            <span key={s} style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              background: "white", border: "1px solid #d1d5db",
              borderRadius: 20, padding: "3px 10px", fontSize: 13, color: "#374151",
            }}>
              {s}
              <span
                onClick={() => onRemove(s)}
                style={{ cursor: "pointer", color: "#6b7280", fontSize: 16, lineHeight: 1 }}
              >×</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
