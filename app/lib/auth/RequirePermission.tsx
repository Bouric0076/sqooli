// components/auth/RequirePermission.tsx
"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePermissions } from "./PermissionContext";

interface RequirePermissionProps {
  permission?: string;
  anyOf?: string[];
  allOf?: string[];
  redirectTo?: string; // e.g. "/unauthorized"
  children: ReactNode;
}

/**
 * Guards an entire page/route. Redirects if the user lacks permission.
 * Use in a page component, not inline in a list.
 *
 * export default function CreateUserPage() {
 *   return (
 *     <RequirePermission permission="users.create" redirectTo="/unauthorized">
 *       <CreateUserForm />
 *     </RequirePermission>
 *   );
 * }
 */
export function RequirePermission({
  permission,
  anyOf,
  allOf,
  redirectTo = "/unauthorized",
  children,
}: RequirePermissionProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading } =
    usePermissions();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="text-sm text-muted-foreground">Checking access…</span>
      </div>
    );
  }

  let allowed = true;
  if (permission) allowed = allowed && hasPermission(permission);
  if (anyOf) allowed = allowed && hasAnyPermission(anyOf);
  if (allOf) allowed = allowed && hasAllPermissions(allOf);

  if (!allowed) {
    router.replace(redirectTo);
    return null;
  }

  return <>{children}</>;
}