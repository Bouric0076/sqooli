import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Curriculum {
  id: number;
  name: string;
  acronym: string;
}

export interface Lesson {
  id: number;
  title: string;
}

interface CurriculumState {
  // Frontend objects (optional, for UI)
  activeCurriculum: Curriculum | null;
  activeLesson: Lesson | null;

  // Backend-safe persisted IDs
  curriculumId: number | null;
  lessonId: number | null;


  // Actions
  setActiveCurriculum: (curriculum: Curriculum) => void;
  clearActiveCurriculum: () => void;

  setActiveLesson: (lesson: Lesson) => void;
  clearActiveLesson: () => void;
}

export const useCurriculumStore = create<CurriculumState>()(
  persist(
    (set) => ({
      activeCurriculum: null,
      activeLesson: null,

      curriculumId: null,
      lessonId: null,

      setActiveCurriculum: (curriculum) => {
        document.cookie = `curriculumId=${curriculum.id}; path=/`;
        set({
          activeCurriculum: curriculum,
          curriculumId: curriculum.id,
        });
      },
      

      clearActiveCurriculum: () =>
        set({
          activeCurriculum: null,
          curriculumId: null,
        }),

      setActiveLesson: (lesson) =>
        set({
          activeLesson: lesson,
          lessonId: lesson.id,
        }),

      clearActiveLesson: () =>
        set({
          activeLesson: null,
          lessonId: null,
        }),
    }),
    {
      name: "curriculum-storage",
      partialize: (state) => ({
        activeCurriculum: state.activeCurriculum,
        activeLesson: state.activeLesson,
        curriculumId: state.curriculumId,
        lessonId: state.lessonId,
      }),
      
    }
  )
);
