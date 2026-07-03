
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface PermissionContextValue {
  permissions: Set<string>;
  roles: string[];
  isSuperAdmin: boolean;
  schoolId: number | null;
  schoolName: string | null;
  isLoading: boolean;
  hasPermission: (permissionName: string) => boolean;
  hasAnyPermission: (permissionNames: string[]) => boolean;
  hasAllPermissions: (permissionNames: string[]) => boolean;
  refetch: () => Promise<void>;
}

export const PermissionContext = createContext<PermissionContextValue | undefined>(
  undefined
);

interface CurrentUserDto {
  id: string;
  email: string | null;
  userName: string | null;
  firstName: string | null;
  lastName: string | null;
  userType: string | null;
  isActive: boolean;
  isVerified: boolean;
  schoolId: number | null;
  schoolName: string | null;
  isSuperAdmin: boolean;
  roles: string[];
  permissions: string[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissions] = useState<Set<string>>(new Set());
  const [roles, setRoles] = useState<string[]>([]);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [schoolId, setSchoolId] = useState<number | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load current user");

      const json: ApiResponse<CurrentUserDto> = await res.json();
      const data = json.data;

      setRoles(data.roles);
      setIsSuperAdmin(data.isSuperAdmin);
      setSchoolId(data.schoolId);
      setSchoolName(data.schoolName);
      setPermissions(new Set(data.permissions));
    } catch (err) {
      console.error("Failed to load current user/permissions", err);
      setRoles([]);
      setIsSuperAdmin(false);
      setSchoolId(null);
      setSchoolName(null);
      setPermissions(new Set());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const hasPermission = useCallback(
    (permissionName: string) => isSuperAdmin || permissions.has(permissionName),
    [permissions, isSuperAdmin]
  );

  const hasAnyPermission = useCallback(
    (permissionNames: string[]) =>
      isSuperAdmin || permissionNames.some((p) => permissions.has(p)),
    [permissions, isSuperAdmin]
  );

  const hasAllPermissions = useCallback(
    (permissionNames: string[]) =>
      isSuperAdmin || permissionNames.every((p) => permissions.has(p)),
    [permissions, isSuperAdmin]
  );

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        roles,
        isSuperAdmin,
        schoolId,
        schoolName,
        isLoading,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        refetch: fetchMe,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissions() {
  const ctx = useContext(PermissionContext);
  if (!ctx) {
    throw new Error("usePermissions must be used within a PermissionProvider");
  }
  return ctx;
}