import type { FC } from "react";

import { CheckIcon } from "./Icons";
import { WIZARD_STEPS } from "./constants";

interface SidebarProps {
  step: number;
  done: number[];
}

export const Sidebar: FC<SidebarProps> = ({ step, done }) => (
  <div style={{ width: 252, flexShrink: 0, borderRight: "1px solid #e5e7eb", background: "white", padding: "40px 0 24px" }}>
    {WIZARD_STEPS.map(item => {
      const active   = item.id === step;
      const complete = done.includes(item.id);
      return (
        <div key={item.id} style={{ position: "relative", padding: "7px 28px 7px 34px", marginBottom: 14 }}>
          {active && (
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: "#3b82f6", borderRadius: "0 3px 3px 0" }} />
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: active ? "#3b82f6" : "#9ca3af" }}>
              {item.stepLabel}
            </span>
            {complete && (
              <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#3b82f6", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <CheckIcon />
              </span>
            )}
          </div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#111827" : "#6b7280" }}>
            {item.title}
          </p>
        </div>
      );
    })}
  </div>
);
