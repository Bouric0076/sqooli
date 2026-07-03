import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

type User = {
  fullName: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userRole: string;
  userType: string;
  isEmailConfirmed: boolean;
  nationality: string;
  nationalId: string;
  phone: string;
  address: string;
  profilePhoto: string;
  gender: string;
  referralCode?: string;
  schools: [];
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

  // ── Permission state ─────────────────────────
  roles: string[];
  permissions: string[];
  isSuperAdmin: boolean;
  permissionsLoaded: boolean;

  setUser: (user: User) => void;
  clearAuth: () => void;
  logout: () => void;
  setInitialized: () => void;
  setActiveSchool: (school: School) => void;

  // ── Permission methods ───────────────────────
  fetchMe: () => Promise<void>;
  hasPermission: (permissionName: string) => boolean;
  hasAnyPermission: (permissionNames: string[]) => boolean;
  hasAllPermissions: (permissionNames: string[]) => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      initialized: false,
      activeSchool: null,

      roles: [],
      permissions: [],
      isSuperAdmin: false,
      permissionsLoaded: false,

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
          roles: [],
          permissions: [],
          isSuperAdmin: false,
          permissionsLoaded: false,
        }),

      setInitialized: () => set({ initialized: true }),

      setActiveSchool: (school) =>
        set({
          activeSchool: school,
        }),

      // ── Fetch current user's roles + permissions ──
fetchMe: async () => {
  try {
    const res = await fetch("/api/auth/me", {
      method: "GET",
      credentials: "include", // ensures httpOnly cookie is sent
    });

    if (!res.ok) throw new Error("Failed to fetch current user");

    const json = await res.json();
    const data = json.data;

    set({
      roles: data.roles ?? [],
      permissions: data.permissions ?? [],
      isSuperAdmin: data.isSuperAdmin ?? false,
      permissionsLoaded: true,
    });
  } catch (e) {
    console.error("fetchMe failed", e);
    set({ permissionsLoaded: true });
  }
},

      hasPermission: (permissionName) => {
        const { isSuperAdmin, permissions } = get();
        return isSuperAdmin || permissions.includes(permissionName);
      },

      hasAnyPermission: (permissionNames) => {
        const { isSuperAdmin, permissions } = get();
        return isSuperAdmin || permissionNames.some((p) => permissions.includes(p));
      },

      hasAllPermissions: (permissionNames) => {
        const { isSuperAdmin, permissions } = get();
        return isSuperAdmin || permissionNames.every((p) => permissions.includes(p));
      },

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
          roles: [],
          permissions: [],
          isSuperAdmin: false,
          permissionsLoaded: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        activeSchool: state.activeSchool,
        isAuthenticated: state.isAuthenticated,
        roles: state.roles,
        permissions: state.permissions,
        isSuperAdmin: state.isSuperAdmin,
      }),
    }
  )
);