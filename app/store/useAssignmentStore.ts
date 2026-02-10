// src/app/store/useAssignmentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Assignment = {
  id: number;
  name: string;
  title: string;
  description: string;
  sections: any[]; // adjust type as needed
};

type AssignmentStore = {
  activeAssignment: Assignment | null;
  setActiveAssignment: (assignment: Assignment | null) => void;
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  activeAssignment: null,
  setActiveAssignment: (assignment) => set({ activeAssignment: assignment }),
}));
