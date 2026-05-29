// src/app/store/useSpinnerStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SpinnerStore = {
  loading: boolean;

  showSpinner: () => void;
  hideSpinner: () => void;
  setLoading: (value: boolean) => void;
};

export const useSpinnerStore = create<SpinnerStore>()(
  persist(
    (set) => ({
      loading: false,

      showSpinner: () => set({ loading: true }),

      hideSpinner: () => set({ loading: false }),

      setLoading: (value) => set({ loading: value }),
    }),
    {
      name: "spinner-storage",

      partialize: (state) => ({
        loading: state.loading,
      }),
    }
  )
);