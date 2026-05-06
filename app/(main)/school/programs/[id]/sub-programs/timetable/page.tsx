"use client";
import { useState, useEffect } from "react";
import { DesktopView } from "./components/DesktopView";
import { EditModal } from "./components/EditModal";
import { MobileView } from "./components/mobileView";
import { getSlotTimetable, moveSlot } from "@/app/helpers/program";
import { useSubProgramStore } from "@/app/store/useSubProgramStore";

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useIsMobile(bp = 768) {
  const [v, setV] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );

  useEffect(() => {
    const h = () => setV(window.innerWidth < bp);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [bp]);

  return v;
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Timetable() {
  const [weeks, setWeeks] = useState([]);
  const [activeWeek, setActiveWeek] = useState("week1");
  const [editTarget, setEditTarget] = useState(null);
  const isMobile = useIsMobile(768);
  const { activeSubProgram } = useSubProgramStore();

  useEffect(() => {
    if (activeSubProgram?.id) {
      loadTimetable();
    }
  }, [activeSubProgram]);

  const loadTimetable = async () => {
    try {
      const res = await getSlotTimetable({ subprogramId: activeSubProgram?.id });

      // 🔥 NEW API SHAPE
      const apiWeeks = res.weeks || [];

      setWeeks(apiWeeks);
    } catch (err) {
      console.error("Failed to load timetable", err);
    }
  };

  // ─────────────────────────────────────────────
  // ✏️ EDIT HANDLING (NOW USES ITEMS)
  // ─────────────────────────────────────────────
  const handleEdit = (weekId, dayKey, itemIndex, item) => {
    const week = weeks.find((w) => w.id === weekId);
    const day = week?.days.find((d) => d.key === dayKey);

    setEditTarget({
      weekId,
      dayKey,
      itemIndex,
      week,
      day,
      data: item,
    });
  };

  const handleSave = (updatedData) => {
    setWeeks((prev) =>
      prev.map((week) => {
        if (week.id !== editTarget.weekId) return week;

        return {
          ...week,
          days: week.days.map((day) => {
            if (day.key !== editTarget.dayKey) return day;

            const newItems = [...day.items];
            newItems[editTarget.itemIndex] = updatedData;

            return { ...day, items: newItems };
          }),
        };
      })
    );

    setEditTarget(null);
  };





const handleMove = async ({ from, to, item }) => {
  const snapshot = JSON.parse(JSON.stringify(weeks)); // 🧠 backup

  // ⚡ OPTIMISTIC UPDATE
  // setWeeks((prev) =>
  //   prev.map((week) => {
  //     if (week.id !== from.weekId) return week;

  //     return {
  //       ...week,
  //       days: week.days.map((day) => {
  //         // remove from source
  //         if (day.key === from.dayKey) {
  //           return {
  //             ...day,
  //             items: day.items.map((i) =>
  //               i.start === item.start && i.end === item.end
  //                 ? { ...i, subject: null, lessonId: null, type: null }
  //                 : i
  //             ),
  //           };
  //         }

  //         return day;
  //       }),
  //     };
  //   })
  // );

  // setWeeks((prev) =>
  //   prev.map((week) => {
  //     if (week.id !== to.weekId) return week;

  //     return {
  //       ...week,
  //       days: week.days.map((day) => {
  //         if (day.key !== to.dayKey) return day;

  //         return {
  //           ...day,
  //           items: day.items.map((i) =>
  //             i.start === item.start && i.end === item.end
  //               ? { ...item }
  //               : i
  //           ),
  //         };
  //       }),
  //     };
  //   })
  // );

  // 🌐 API CALL
  try {
    await moveSlot({
      subProgramId: activeSubProgram?.id,
      from,
      to,
      item,
    });

    await  loadTimetable();
  } catch (err) {
    console.error("Move failed, rolling back", err);

    // 🔄 ROLLBACK
    setWeeks(snapshot);
  }
};













  return (
    <>
      {isMobile ? (
        <MobileView
          weeks={weeks}
          onEdit={handleEdit}
          activeWeek={activeWeek}
          onWeekChange={setActiveWeek}
        />
      ) : (
<DesktopView
  weeks={weeks}
  onEdit={handleEdit}
  onMove={handleMove} // 🔥 ADD THIS
  activeWeek={activeWeek}
  onWeekChange={setActiveWeek}
/>
      )}

      {editTarget && (
        <EditModal
          editTarget={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
          isMobile={isMobile}
        />
      )}
    </>
  );
}