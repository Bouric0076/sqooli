// src/app/store/useAssignmentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Resource = {
  id: number;
  resourceType: string;
  title: string;
  description: string;
  files: any[];
  attachments: any[];
  creator: any;
};

type ResourceStore = {
  activeResource: Resource | null;
  setActiveResource: (resource: Resource | null) => void;
};

export const useResourceStore = create<ResourceStore>()(
  persist(
    (set) => ({
      activeResource: null,

      setActiveResource: (resource) =>
        set({ activeResource: resource }),
    }),
    {
      name: "resource-storage",

      partialize: (state) => ({
        activeResource: state.activeResource,
      }),
    }
  )
);