import type { FC } from "react";
import { ArrowLeft, ArrowRight } from "./Icons";

interface WizardFooterProps {
  onBack: () => void;
  onNext: () => void;
}

export const WizardFooter: FC<WizardFooterProps> = ({ onBack, onNext }) => (
  <div style={{
    padding: "16px 44px", borderTop: "1px solid #e5e7eb",
    background: "white", display: "flex", justifyContent: "space-between", alignItems: "center",
  }}>
    <button
      onClick={onBack}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        border: "1.5px solid #d1d5db", borderRadius: 24, padding: "9px 22px",
        background: "white", fontSize: 14, fontWeight: 500, color: "#374151",
        cursor: "pointer", fontFamily: "inherit",
      }}
    >
      <ArrowLeft /> Back
    </button>
    <button
      onClick={onNext}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        border: "none", borderRadius: 24, padding: "10px 28px",
        background: "#1960ae", fontSize: 14, fontWeight: 600, color: "white",
        cursor: "pointer", fontFamily: "inherit",
        boxShadow: "0 2px 10px rgba(25,96,174,.4)",
      }}
    >
      Save & Continue <ArrowRight />
    </button>
  </div>
);
