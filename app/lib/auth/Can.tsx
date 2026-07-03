
"use client";

import { ReactNode } from "react";
import { usePermissions } from "./PermissionContext";

interface CanProps {
  /** Single permission name required */
  permission?: string;
  /** User needs at least one of these */
  anyOf?: string[];
  /** User needs all of these */
  allOf?: string[];
  /** Shown while permissions are loading */
  fallback?: ReactNode;
  /** Shown when access is denied (defaults to nothing) */
  deniedFallback?: ReactNode;
  children: ReactNode;
}

/**
 * Conditionally renders children based on the current user's permissions.
 *
 * <Can permission="users.create">
 *   <Button>Add User</Button>
 * </Can>
 *
 * <Can anyOf={["roles.edit", "roles.delete"]}>
 *   <RoleActionsMenu />
 * </Can>
 */
export function Can({
  permission,
  anyOf,
  allOf,
  fallback = null,
  deniedFallback = null,
  children,
}: CanProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isLoading } =
    usePermissions();

  if (isLoading) return <>{fallback}</>;

  let allowed = true;

  if (permission) allowed = allowed && hasPermission(permission);
  if (anyOf) allowed = allowed && hasAnyPermission(anyOf);
  if (allOf) allowed = allowed && hasAllPermissions(allOf);

  return allowed ? <>{children}</> : <>{deniedFallback}</>;
}