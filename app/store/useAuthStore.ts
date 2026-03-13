import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";



type User = {
  fullName:string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
  userType: string;
  isEmailConfirmed: boolean;
  nationality:string,
  nationalId: string;
  phone:string;
  address:string;
  profilePhoto:string,
  gender:string,
  referralCode?:string;
  schools:[]
};
type School = {
  id: number;
  name: string;
  code: string;
  schoolTypeId: number;
  schoolTypeName: string;
  logo: string | null;
  
};


type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  activeSchool: School | null;
  initialized: boolean;
  setUser: (user: User) => void;
  clearAuth: () => void;
  logout: () => void;
  setInitialized: () => void;
  setActiveSchool: (school: School) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      initialized: false,
      activeSchool: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
          initialized: true,
        }),


      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          initialized: true,
        }),

      setInitialized: () => set({ initialized: true }),
      setActiveSchool: (school) =>
        set({
          activeSchool: school,
        }),

      logout: async () => {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
        } catch (e) {
          console.error("Logout API failed", e);
        }
      
        localStorage.clear();
        set({
          user: null,
          isAuthenticated: false,
          initialized: true,
        });
      }
      ,
    }),
    {
      name: "auth-storage",
      // storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        activeSchool: state.activeSchool,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
