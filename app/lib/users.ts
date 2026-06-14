export interface User {
  id: string;
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string | null;
  roles: string[];
}

export interface CreateUser {
  email: string;
      FirstName:string,
  LastName:string;
  password: string;
  phoneNumber?: string;
  emailConfirmed?: boolean;
  roles?: string[];
}

export interface UpdateUser {
  id: string;
      FirstName:string,
  LastName:string;
  email?: string;
  phoneNumber?: string;
  emailConfirmed?: boolean;
  lockoutEnabled?: boolean;
  newPassword?: string;
  roles?: string[];
}

export async function getUsers(page = 1, pageSize = 10, search = "", role = "") {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
    role,
  });

  const res = await fetch(`/api/users?${params}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to get users");
  }

  return res.json();
}

export async function addUser(form: CreateUser) {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create user");
  }

  return res.json();
}

export async function updateUser(form: UpdateUser) {
  const res = await fetch("/api/users", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update user");
  }

  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch("/api/users", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to delete user");
  }

  return res.json();
}

export async function lockUser(id: string) {
  const res = await fetch(`/api/users/${id}/lock`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to lock user");
  }

  return res.json();
}

export async function unlockUser(id: string) {
  const res = await fetch(`/api/users/${id}/unlock`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to unlock user");
  }

  return res.json();
}