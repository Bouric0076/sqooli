// src/app/store/useAssignmentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SubProgram = {
  id: number;

};

type SubProgramStore = {
  activeSubProgram: SubProgram | null;
  setActiveSubProgram: (subprogram: SubProgram | null) => void;
};

export const useSubProgramStore = create<SubProgramStore>((set) => ({
    activeSubProgram: null,
    setActiveSubProgram: (subprogram) => set({ activeSubProgram: subprogram }),
}));
