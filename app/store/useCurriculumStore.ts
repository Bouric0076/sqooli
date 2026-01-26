import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Curriculum {
  id: number;
  name: string;
  acronym: string;
}

interface CurriculumState {
  activeCurriculum: Curriculum | null;

  setActiveCurriculum: (curriculum: Curriculum) => void;
  clearActiveCurriculum: () => void;
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      activeCurriculum: null,

      setActiveCurriculum: (curriculum) =>
        set({ activeCurriculum: curriculum }),

      clearActiveCurriculum: () => set({ activeCurriculum: null }),
    }),
    {
      name: "curriculum-storage",
      partialize: (state) => ({
        activeCurriculum: state.activeCurriculum,
      }),
    }
  )
);
