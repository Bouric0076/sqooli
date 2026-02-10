// src/app/store/useAssignmentStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";

type Resource = {
  id: number;
  resourceType: string;
  title: string;
  description: string;
  files: any[]; // adjust type as needed
  attachments: any[]; // adjust type as needed
  creator: any; // adjust type as needed
};

type ResourceStore = {
  activeResource: Resource | null;
  setActiveResource: (resource: Resource | null) => void;
};

export const useResourceStore = create<ResourceStore>((set) => ({
    activeResource: null,
    setActiveResource: (resource) => set({ activeResource: resource }),
}));
