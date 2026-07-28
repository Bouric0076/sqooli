"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyModal from "@/app/components/general/modals/MyModal";
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import { addRole, DeleteRole, getRoles, UpdateRole, getRolePermissions, assignPermissionsToRole } from "@/app/lib/roles";
import { getPermissions } from "@/app/lib/permissions";
import { useAuthStore } from "@/app/store/useAuthStore";

export interface Role {
  id: string;
  name: string;
  createdAt?: string;
}

export interface Permission {
  id: number;
  name: string;
  module: string | null;
  description: string | null;
}

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];

export default function Page() {
  const router = useRouter();
  const [roles, setRoles] = useState<Role[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal & Form States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isPermissionModal, setIsPermissionModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingInfo, setEditingInfo] = useState<Role | null>(null);
  const [infoToDelete, setInfoToDelete] = useState<Role | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // ── Permissions State ──
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [assignedPermissionIds, setAssignedPermissionIds] = useState<number[]>([]);
  const [permissionLoading, setPermissionLoading] = useState(false);

  const form = useForm<Role>({
    defaultValues: {
      name: "",
      id: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  // ── Fetch Data ──
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);

    Promise.all([
      getRoles()
        .then((data) => setRoles(data?.data?.items || []))
        .catch((err) => console.error("Error fetching roles:", err)),

      getPermissions()
        .then((data) => setAllPermissions(data?.data?.items || []))
        .catch((err) => console.error("Error fetching permissions:", err)),
    ]).finally(() => setLoading(false));
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
    reset();
    setEditingInfo(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (info: Role) => {
    reset();
    setValue("id", info.id);
    setValue("name", info.name);
    setEditingInfo(info);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingInfo(null);
  };

  const openDeleteModal = (info: Role) => {
    setInfoToDelete(info);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setInfoToDelete(null);
  };

  // ── Permission Modal ──
  const openPermissionModal = async (info: Role) => {
    setSelectedRole(info);
    setIsPermissionModal(true);
    setPermissionLoading(true);

    try {
      const data = await getRolePermissions(info.id);
      const assigned: Permission[] = data?.data || [];
      setAssignedPermissionIds(assigned.map((p) => p.id));
    } catch (err) {
      console.error("Error fetching role permissions:", err);
      setAssignedPermissionIds([]);
    } finally {
      setPermissionLoading(false);
    }
  };

  const closePermissionModal = () => {
    setIsPermissionModal(false);
    setSelectedRole(null);
    setAssignedPermissionIds([]);
  };

  const togglePermission = (permissionId: number) => {
    setAssignedPermissionIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const toggleModule = (modulePermissions: Permission[]) => {
    const moduleIds = modulePermissions.map((p) => p.id);
    const allSelected = moduleIds.every((id) => assignedPermissionIds.includes(id));

    if (allSelected) {
      setAssignedPermissionIds((prev) => prev.filter((id) => !moduleIds.includes(id)));
    } else {
      setAssignedPermissionIds((prev) => [...new Set([...prev, ...moduleIds])]);
    }
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    setPermissionLoading(true);

    try {
      await assignPermissionsToRole(selectedRole.id, assignedPermissionIds);
      closePermissionModal();
    } catch (error) {
      console.error("Error saving permissions:", error);
    } finally {
      setPermissionLoading(false);

          await useAuthStore.getState().fetchMe(); // refresh store -> sidebar re-renders

    }
  };

  // ── Save / Delete Handlers ──
  const handleSave = async () => {
    setLoading(true);
    const payload = {
      id: form.getValues("id"),
      name: form.getValues("name"),
    };

    try {
      if (editingInfo) {
        await UpdateRole(payload);
      } else {
        await addRole(payload);
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving Role:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!infoToDelete) return;
    setLoading(true);

    try {
      await DeleteRole({ id: infoToDelete.id });
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting Role:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // ── Filter ──
  const filtered = roles.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ── Group permissions by module ──
  const groupedPermissions = allPermissions.reduce<Record<string, Permission[]>>((acc, perm) => {
    const module = perm.module || "General";
    if (!acc[module]) acc[module] = [];
    acc[module].push(perm);
    return acc;
  }, {});

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
            Roles
          </h1>
          <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "#94A3B8", fontWeight: 400 }}>
            Manage and monitor roles
          </p>
        </div>

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
          Create Role
        </button>
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
          placeholder="Search roles..."
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
                {["Name", "Permissions", "Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: "12.5px", fontWeight: 500, color: "#94A3B8", borderBottom: "1px solid #F1F5F9" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>Loading roles...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>No roles found.</td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      <button
                        onClick={() => openPermissionModal(row)}
                        style={{ background: "none", border: "none", color: "#3B9EFF", fontWeight: 500, fontSize: "13.5px", cursor: "pointer" }}
                      >
                        Manage Permissions
                      </button>
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      <button
                        onClick={() => openEditModal(row)}
                        style={{ background: "none", border: "none", color: "#3B9EFF", fontWeight: 500, fontSize: "13.5px", cursor: "pointer", marginRight: "12px" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(row)}
                        style={{ background: "none", border: "none", color: "#EF4444", fontWeight: 500, fontSize: "13.5px", cursor: "pointer" }}
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

      {/* ── Add / Edit Role Modal ── */}
      <MyModal open={isAddEditModalOpen} title={editingInfo ? "Edit Role" : "Create Role"} onClose={closeAddEditModal} description="">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="flex flex-col mb-5 gap-5">
            <FormField className="text-sm font-medium text-gray-700" label="Role Name" error={errors.name?.message}>
              <TextInput
                type="text"
                placeholder="Enter Role Name"
                {...register("name", { required: "Role Name is required" })}
              />
            </FormField>
          </div>
          <button type="submit" className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
            Submit
          </button>
        </form>
      </MyModal>

      {/* ── Delete Confirmation Modal ── */}
      <MyModal open={isDeleteModalOpen} title="Delete" onClose={closeDeleteModal} description="">
        <div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 600, color: "#EF4444" }}>
            Delete Role
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
            Are you sure you want to delete <span style={{ fontWeight: 600 }}>"{infoToDelete?.name}"</span>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button onClick={closeDeleteModal} style={{
              padding: "8px 16px", borderRadius: "6px", border: "1px solid #CBD5E1",
              backgroundColor: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, cursor: "pointer",
            }}>Cancel</button>
            <button onClick={handleDelete} style={{
              padding: "8px 16px", borderRadius: "6px", border: "none",
              backgroundColor: "#EF4444", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer",
            }}>Delete</button>
          </div>
        </div>
      </MyModal>

      {/* ── Permissions Modal ── */}
      <MyModal open={isPermissionModal} title={`Manage Permissions — ${selectedRole?.name ?? ""}`} onClose={closePermissionModal} description="">
        <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
          {permissionLoading ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
              Loading permissions...
            </div>
          ) : Object.keys(groupedPermissions).length === 0 ? (
            <div style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
              No permissions found. Create permissions first.
            </div>
          ) : (
            Object.entries(groupedPermissions)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([module, perms]) => {
                const moduleIds = perms.map((p) => p.id);
                const allChecked = moduleIds.every((id) => assignedPermissionIds.includes(id));
                const someChecked = moduleIds.some((id) => assignedPermissionIds.includes(id)) && !allChecked;

                return (
                  <div key={module} style={{ marginBottom: "20px" }}>
                    {/* Module Header — select/deselect all in module */}
                    <label
                      style={{
                        display: "flex", alignItems: "center", gap: "10px",
                        padding: "10px 16px", backgroundColor: "#F8FAFC",
                        borderRadius: "8px", cursor: "pointer", userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={allChecked}
                        ref={(el) => { if (el) el.indeterminate = someChecked; }}
                        onChange={() => toggleModule(perms)}
                        style={{ width: "16px", height: "16px", accentColor: "#3B9EFF", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", fontWeight: 600, color: "#0F172A" }}>
                        {module}
                      </span>
                      <span style={{ fontSize: "12px", color: "#94A3B8", marginLeft: "auto" }}>
                        {moduleIds.filter((id) => assignedPermissionIds.includes(id)).length}/{moduleIds.length}
                      </span>
                    </label>

                    {/* Individual Permissions */}
                    <div style={{ paddingLeft: "16px", marginTop: "6px" }}>
                      {perms.map((perm) => {
                        const isChecked = assignedPermissionIds.includes(perm.id);
                        return (
                          <label
                            key={perm.id}
                            style={{
                              display: "flex", alignItems: "center", gap: "10px",
                              padding: "8px 12px", borderRadius: "6px", cursor: "pointer",
                              backgroundColor: isChecked ? "#EFF6FF" : "transparent",
                              transition: "background-color 0.15s ease",
                              userSelect: "none",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => togglePermission(perm.id)}
                              style={{ width: "15px", height: "15px", accentColor: "#3B9EFF", cursor: "pointer" }}
                            />
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "13.5px", fontWeight: 500, color: "#1E293B" }}>
                                {perm.name}
                              </div>
                              {perm.description && (
                                <div style={{ fontSize: "12px", color: "#94A3B8", marginTop: "1px" }}>
                                  {perm.description}
                                </div>
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })
          )}
        </div>

        {/* Footer with Save */}
        {Object.keys(groupedPermissions).length > 0 && !permissionLoading && (
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: "16px", marginTop: "16px", borderTop: "1px solid #F1F5F9",
          }}>
            <span style={{ fontSize: "13px", color: "#64748B" }}>
              {assignedPermissionIds.length} of {allPermissions.length} selected
            </span>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={closePermissionModal}
                style={{
                  padding: "8px 16px", borderRadius: "6px", border: "1px solid #CBD5E1",
                  backgroundColor: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSavePermissions}
                style={{
                  padding: "8px 20px", borderRadius: "6px", border: "none",
                  backgroundColor: "#3B9EFF", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                }}
              >
                Save Permissions
              </button>
            </div>
          </div>
        )}
      </MyModal>
    </div>
  );
}