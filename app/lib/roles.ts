import { Role } from "../admin/roles/page";

export async function getRoles() {
    const res = await fetch("/api/roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to get Role");
    }
  
    return res.json();
  }
  





export async function addRole(form :Role) {
    const res = await fetch("/api/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to publish Role");
    }
  
    return res.json();
  }
  
  
  

  export async function UpdateRole(form :Role) {
    const res = await fetch(`/api/roles`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to update Role");
    }
  
    return res.json();
  }
  
    export async function DeleteRole(form :Role) {
    const res = await fetch(`/api/roles`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
  
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to delete Role");
    }
  
    return res.json();
  }
  

  export async function getRolePermissions(roleId: string) {
  const res = await fetch(`/api/roles/${roleId}/permissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to get role permissions");
  }

  return res.json();
}

export async function assignPermissionsToRole(roleId: string, permissionIds: number[]) {
  const res = await fetch(`/api/roles/${roleId}/permissions`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ permissionIds }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to assign permissions");
  }

  return res.json();
}