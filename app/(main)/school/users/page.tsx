"use client";

import { useEffect, useState } from "react";
import MyModal from "@/app/components/general/modals/MyModal";
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  lockUser,
  unlockUser,
} from "@/app/lib/users";
import { getRoles } from "@/app/lib/roles";
import { Can } from "@/app/lib/auth/Can";

export interface User {
  id: string;
  firstName:string,
  lastName:string;
  userName: string | null;
  email: string | null;
  phoneNumber: string | null;
  emailConfirmed: boolean;
  lockoutEnabled: boolean;
  lockoutEnd: string | null;
  roles: string[];
}

export interface Role {
  id: string;
  name: string;
}

type FormValues = {
  id: string;
  email: string;
  firstName:string,
  lastName:string;
  password: string;
  phoneNumber: string;
  emailConfirmed: boolean;
  roles: string[];
};

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToLock, setUserToLock] = useState<User | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      id: "",
      email: "",
      password: "",
      phoneNumber: "",
      firstName:"",
      lastName:"",
      emailConfirmed: false,
      roles: [],
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const selectedRoles = watch("roles");

  // ── Fetch Data ──
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([
        getUsers(1, 100, "", "").catch((err) => {
          console.error("Error fetching users:", err);
          return null;
        }),
        getRoles().catch((err) => {
          console.error("Error fetching roles:", err);
          return null;
        }),
      ]);
      setUsers(usersRes?.data?.items || []);
      setAllRoles(rolesRes?.data?.items || []);
    } finally {
      setLoading(false);
    }
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
    reset();
    setEditingUser(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (user: User) => {
    reset();
    setValue("id", user.id);
    setValue("email", user.email || "");
    setValue("firstName", user.firstName || "");
    setValue("lastName", user.lastName || "");
    setValue("phoneNumber", user.phoneNumber || "");
    setValue("emailConfirmed", user.emailConfirmed);
    setValue("roles", user.roles || []);
    setEditingUser(user);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingUser(null);
  };

  const openDeleteModal = (user: User) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const openLockModal = (user: User) => {
    setUserToLock(user);
    setIsLockModalOpen(true);
  };

  const closeLockModal = () => {
    setIsLockModalOpen(false);
    setUserToLock(null);
  };

  const handleSave = async () => {
    setLoading(true);
    const values = form.getValues();

    try {
      if (editingUser) {
        await updateUser({
          id: values.id,
          email: values.email,
          lastName: values.lastName,
          firstName: values.firstName,
          phoneNumber: values.phoneNumber,
          emailConfirmed: values.emailConfirmed,
          roles: values.roles,
          ...(values.password ? { newPassword: values.password } : {}),
        });
      } else {
        await addUser({
          email: values.email,
          lastName: values.lastName,
          firstName: values.firstName,
          password: values.password,
          phoneNumber: values.phoneNumber,
          emailConfirmed: values.emailConfirmed,
          roles: values.roles,
        });
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    setLoading(true);
    try {
      await deleteUser(userToDelete.id);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleToggleLock = async () => {
    if (!userToLock) return;
    setLoading(true);
    try {
      if (userToLock.lockoutEnabled) {
        await unlockUser(userToLock.id);
      } else {
        await lockUser(userToLock.id);
      }
      closeLockModal();
    } catch (error) {
      console.error("Error toggling lock:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const toggleRole = (roleName: string) => {
    const current = form.getValues("roles");
    if (current.includes(roleName)) {
      setValue("roles", current.filter((r) => r !== roleName));
    } else {
      setValue("roles", [...current, roleName]);
    }
  };

  // ── Filter by tab ──
  const filtered = users.filter((u) => {
    const matchesSearch =
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.userName?.toLowerCase().includes(search.toLowerCase()) ||
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.phoneNumber?.toLowerCase().includes(search.toLowerCase());

    const isLocked = u.lockoutEnabled && u.lockoutEnd && new Date(u.lockoutEnd) > new Date();
    const matchesTab = activeTab === "Active" ? !isLocked : !!isLocked;

    return matchesSearch && matchesTab;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "28px 32px",
        boxSizing: "border-box",
      }}
      className="bg-gray-100"
    >
      {/* ── Page Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 700, color: "#0F172A", lineHeight: "1.25", letterSpacing: "-0.2px" }}>
            Users
          </h1>
          <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "#94A3B8", fontWeight: 400 }}>
            Manage and monitor system users
          </p>
        </div>

<Can permission="users.create">

        <button
          onClick={openCreateModal}
          style={{
            display: "flex", alignItems: "center", gap: "6px",
            backgroundColor: "#3B9EFF", color: "#fff", border: "none",
            borderRadius: "999px", padding: "10px 22px", fontSize: "14px",
            fontWeight: 500, cursor: "pointer", letterSpacing: "0.01em", whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>+</span>
          Create User
        </button>

        </Can>
      </div>

      {/* ── Search Bar ── */}
      <div style={{
        display: "flex", alignItems: "center", backgroundColor: "#fff",
        borderRadius: "10px", padding: "0 14px", marginBottom: "12px",
        height: "44px", boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginRight: "8px" }}>
          <circle cx="7" cy="7" r="4.5" stroke="#94A3B8" strokeWidth="1.4" />
          <path d="M10.5 10.5L13 13" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder="Search by email, username, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, border: "none", outline: "none", fontSize: "14px", color: "#374151", backgroundColor: "transparent" }}
        />
      </div>

      {/* ── Main Content Card ── */}
      <div style={{ backgroundColor: "#fff", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid #F1F5F9", paddingLeft: "20px" }}>
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 16px 13px", fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#3B9EFF" : "#64748B",
                  background: "none", border: "none",
                  borderBottom: isActive ? "2px solid #3B9EFF" : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#FAFAFA" }}>
                {["Email", "Username", "Phone", "Roles", "Verified", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left", padding: "12px 20px",
                      fontSize: "12.5px", fontWeight: 500,
                      color: "#94A3B8", borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
                    Loading users...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filtered.map((user, idx) => (
                  <tr key={user.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    {/* Email */}
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {user.email || "—"}
                    </td>

                    {/* Username */}
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {user?.firstName || "—"}
                    </td>


                    {/* Phone */}
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {user.phoneNumber || "—"}
                    </td>

                    {/* Roles */}
                    <td style={{ padding: "16px 20px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                        {user.roles && user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <span
                              key={role}
                              style={{
                                display: "inline-block",
                                padding: "2px 10px",
                                borderRadius: "999px",
                                backgroundColor: "#EFF6FF",
                                color: "#3B9EFF",
                                fontSize: "12px",
                                fontWeight: 500,
                              }}
                            >
                              {role}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: "13px", color: "#94A3B8" }}>No roles</span>
                        )}
                      </div>
                    </td>

                    {/* Email Confirmed */}
                    <td style={{ padding: "16px 20px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 10px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: 500,
                          backgroundColor: user.emailConfirmed ? "#F0FDF4" : "#FEF9C3",
                          color: user.emailConfirmed ? "#16A34A" : "#B45309",
                        }}
                      >
                        {user.emailConfirmed ? "Verified" : "Pending"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "16px 20px", fontSize: "13.5px", color: "#475569", whiteSpace: "nowrap" }}>
                      <button
                        onClick={() => openEditModal(user)}
                        style={{
                          background: "none", border: "none", color: "#3B9EFF",
                          fontWeight: 500, fontSize: "13.5px", cursor: "pointer", marginRight: "12px",
                        }}
                      >
                        Edit
                      </button>
                      {/* <button
                        onClick={() => openLockModal(user)}
                        style={{
                          background: "none", border: "none",
                          color: user.lockoutEnabled ? "#16A34A" : "#F59E0B",
                          fontWeight: 500, fontSize: "13.5px", cursor: "pointer", marginRight: "12px",
                        }}
                      >
                        {user.lockoutEnabled ? "Unlock" : "Lock"}
                      </button> */}
                      <button
                        onClick={() => openDeleteModal(user)}
                        style={{
                          background: "none", border: "none", color: "#EF4444",
                          fontWeight: 500, fontSize: "13.5px", cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit User Modal ── */}
      <MyModal
        open={isAddEditModalOpen}
        title={editingUser ? "Edit User" : "Create User"}
        onClose={closeAddEditModal}
        description=""
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">

          <div className="grid  grid-cols-2 mb-5 gap-5 ">
            <FormField className="text-sm font-medium text-gray-700" label="First name" error={errors.firstName?.message}>
              <TextInput
                type="text"
                placeholder="Enter First name"
                {...register("firstName", { required: "First name is required" })}
              />
            </FormField>


            <FormField className="text-sm font-medium text-gray-700" label="Last name" error={errors.lastName?.message}>
              <TextInput
                type="text"
                placeholder="Enter Last Name"
                {...register("lastName", { required: "Last Name is required" })}
              />
            </FormField>
          </div>


          <div className="flex flex-col mb-5 gap-5">
            {/* Email */}
            <FormField className="text-sm font-medium text-gray-700" label="Email" error={errors.email?.message}>
              <TextInput
                type="email"
                placeholder="Enter email address"
                {...register("email", { required: "Email is required" })}
              />
            </FormField>

            {/* Password */}
            <FormField
              className="text-sm font-medium text-gray-700"
              label={editingUser ? "New Password (leave blank to keep current)" : "Password"}
              error={errors.password?.message}
            >
              <TextInput
                type="password"
                placeholder={editingUser ? "Enter new password (optional)" : "Enter password"}
                {...register("password", {
                  ...(!editingUser && { required: "Password is required" }),
                })}
              />
            </FormField>

            {/* Phone Number */}
            <FormField className="text-sm font-medium text-gray-700" label="Phone Number" error={errors.phoneNumber?.message}>
              <TextInput
                type="text"
                placeholder="Enter phone number"
                {...register("phoneNumber")}
              />
            </FormField>

            {/* Email Confirmed */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input
                type="checkbox"
                id="emailConfirmed"
                {...register("emailConfirmed")}
                style={{ width: "16px", height: "16px", accentColor: "#3B9EFF", cursor: "pointer" }}
              />
              <label
                htmlFor="emailConfirmed"
                style={{ fontSize: "14px", fontWeight: 500, color: "#374151", cursor: "pointer" }}
              >
                Mark email as verified
              </label>
            </div>

            {/* Roles */}
            {allRoles.length > 0 && (
              <div>
                <p style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: 500, color: "#374151" }}>
                  Assign Roles
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {allRoles.map((role) => {
                    const isSelected = selectedRoles?.includes(role.name);
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => toggleRole(role.name)}
                        style={{
                          padding: "5px 14px",
                          borderRadius: "999px",
                          border: `1.5px solid ${isSelected ? "#3B9EFF" : "#CBD5E1"}`,
                          backgroundColor: isSelected ? "#EFF6FF" : "#fff",
                          color: isSelected ? "#3B9EFF" : "#475569",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        {role.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            {editingUser ? "Save Changes" : "Create User"}
          </button>
        </form>
      </MyModal>

      {/* ── Delete Confirmation Modal ── */}
      <MyModal open={isDeleteModalOpen} title="Delete" onClose={closeDeleteModal} description="">
        <div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 600, color: "#EF4444" }}>
            Delete User
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: 600 }}>"{userToDelete?.email}"</span>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button
              onClick={closeDeleteModal}
              style={{
                padding: "8px 16px", borderRadius: "6px", border: "1px solid #CBD5E1",
                backgroundColor: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px", borderRadius: "6px", border: "none",
                backgroundColor: "#EF4444", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </MyModal>

      {/* ── Lock / Unlock Confirmation Modal ── */}
      <MyModal
        open={isLockModalOpen}
        title={userToLock?.lockoutEnabled ? "Unlock User" : "Lock User"}
        onClose={closeLockModal}
        description=""
      >
        <div>
          <h2
            style={{
              margin: "0 0 12px 0", fontSize: "18px", fontWeight: 600,
              color: userToLock?.lockoutEnabled ? "#16A34A" : "#F59E0B",
            }}
          >
            {userToLock?.lockoutEnabled ? "Unlock User" : "Lock User"}
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
            {userToLock?.lockoutEnabled ? (
              <>
                Unlock <span style={{ fontWeight: 600 }}>"{userToLock?.email}"</span>? They will regain access to the system.
              </>
            ) : (
              <>
                Lock <span style={{ fontWeight: 600 }}>"{userToLock?.email}"</span>? They will be unable to sign in until unlocked.
              </>
            )}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button
              onClick={closeLockModal}
              style={{
                padding: "8px 16px", borderRadius: "6px", border: "1px solid #CBD5E1",
                backgroundColor: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleToggleLock}
              style={{
                padding: "8px 16px", borderRadius: "6px", border: "none",
                backgroundColor: userToLock?.lockoutEnabled ? "#16A34A" : "#F59E0B",
                color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer",
              }}
            >
              {userToLock?.lockoutEnabled ? "Yes, Unlock" : "Yes, Lock"}
            </button>
          </div>
        </div>
      </MyModal>
    </div>
  );
}