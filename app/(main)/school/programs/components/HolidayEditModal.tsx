"use client";

import { FC, useState } from "react";
import { XIcon } from "./Icons";
import { Label } from "./Primitives";

export interface HolidayEntry {
  name: string;
  startDate: string;
  endDate: string;
}

interface HolidayEditModalProps {
  holiday: HolidayEntry;
  title?: string;
  onSave: (updated: HolidayEntry) => void;
  onClose: () => void;
}

export const HolidayEditModal: FC<HolidayEditModalProps> = ({
  holiday,
  title = "Edit Holiday",
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(holiday.name);
  const [startDate, setStartDate] = useState(holiday.startDate);
  const [endDate, setEndDate] = useState(holiday.endDate);

  const handleSave = () => {
    if (!name.trim()) {
      alert("Holiday name is required.");
      return;
    }
    if (!startDate || !endDate) {
      alert("Start and End dates are required.");
      return;
    }
    if (startDate > endDate) {
      alert("Start date cannot be after End date.");
      return;
    }

    onSave({ name: name.trim(), startDate, endDate });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.45)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          padding: "28px 28px 24px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          width: 400,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
          }}
        >
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111827" }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <XIcon />
          </button>
        </div>

        {/* Holiday Name */}
        <div style={{ marginBottom: 20 }}>
          <Label>Holiday Name</Label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mid Term Break"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Start / End Dates */}
        <div style={{ display: "flex", gap: 12, marginBottom: 26 }}>
          <div style={{ flex: 1 }}>
            <Label>Start Date</Label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Label>End Date</Label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #d1d5db",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              border: "1.5px solid #d1d5db",
              borderRadius: 24,
              padding: "8px 20px",
              background: "white",
              fontSize: 14,
              fontWeight: 500,
              color: "#374151",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              border: "none",
              borderRadius: 24,
              padding: "8px 22px",
              background: "#1960ae",
              fontSize: 14,
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(25,96,174,.35)",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};