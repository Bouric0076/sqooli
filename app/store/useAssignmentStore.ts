// src/app/store/useAssignmentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Assignment = {
  id: number;
  name: string;
  title: string;
  description: string;
  sections: any[];
};

type AssignmentStore = {
  activeAssignment: Assignment | null;
  setActiveAssignment: (assignment: Assignment | null) => void;
};

export const useAssignmentStore = create<AssignmentStore>()(
  persist(
    (set) => ({
      activeAssignment: null,

      setActiveAssignment: (assignment) =>
        set({ activeAssignment: assignment }),
    }),
    {
      name: "assignment-storage",

      partialize: (state) => ({
        activeAssignment: state.activeAssignment,
      }),
    }
  )
);