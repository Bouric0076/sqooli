// lib/notifications.ts

import { useErrorStore } from "@/app/store/errorStore";



export const Notifications = {
  error(message: string) {
    useErrorStore.getState().setError(message);
  },

  success(message: string) {
    // future implementation
  },

  warning(message: string) {
    // future implementation
  },
};