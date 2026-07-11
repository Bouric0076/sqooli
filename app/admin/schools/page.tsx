"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCPrograms } from "@/app/helpers/program";
import Loader from "@/components/ui/Loader";
import MyModal from "@/app/components/general/modals/MyModal";
import { useForm, Controller } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import {
  addSchool,
  DeleteSchool,
  getSchools,
  UpdateSchool,
} from "@/app/lib/school";
import { getSchoolTypes } from "@/app/lib/schoolTypes";
import { getCurriculums } from "@/app/lib/curriculum";

// Matches SchoolResponseDto / GetSchoolById shape from the API
export interface Curriculum {
  id: number;
  name: string;
  acronym?: string;
}

export interface SchoolType {
  id: number;
  name: string;
}

export interface School {
  id: string;
  name: string;
  code?: string;
  email?: string;
  phone?: string;
  address?: string;
  motto?: string;
  website?: string;
  description?: string;
  logo?: string;
  adminEmail?: string;
  schoolTypeId?: number;
  schoolTypeName?: string;
  curriculums?: Curriculum[];
  curriculumIds?: number[];
  createdAt?: string;
}

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];

export default function Page() {
  const router = useRouter();
  const [schools, setSchools] = useState<School[]>([]);
  const [schoolTypes, setSchoolTypes] = useState<SchoolType[]>([]);
  const [curricula, setCurricula] = useState<Curriculum[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal & Form States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [ToDelete, setToDelete] = useState<School | null>(null);

  const form = useForm<School>({
    defaultValues: {
      id: "",
      name: "",
      code: "",
      email: "",
      phone: "",
      address: "",
      motto: "",
      website: "",
      description: "",
      adminEmail: "",
      schoolTypeId: undefined,
      curriculumIds: [],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  // ── Fetch real data ──
  useEffect(() => {
    fetchData();
    fetchSchoolTypes();
    fetchCurricula();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getSchools({})
      .then((data) => {
        setSchools(data?.data || []);
      })
      .catch((err) => console.error("Error fetching schools:", err))
      .finally(() => setLoading(false));
  };

  const fetchSchoolTypes = () => {
    getSchoolTypes()
      .then((data) => {
        setSchoolTypes(data?.data?.items || []);
      })
      .catch((err) => console.error("Error fetching school types:", err));
  };

  const fetchCurricula = () => {
    getCurriculums({})
      .then((data) => {
        setCurricula(data?.data?.items || []);
      })
      .catch((err) => console.error("Error fetching curricula:", err));
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
    reset();
    setEditingSchool(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (info: School) => {
    reset();
    setValue("id", info.id);
    setValue("name", info.name);
    setValue("code", info.code ?? "");
    setValue("email", info.email ?? "");
    setValue("phone", info.phone ?? "");
    setValue("address", info.address ?? "");
    setValue("motto", info.motto ?? "");
    setValue("website", info.website ?? "");
    setValue("description", info.description ?? "");
    setValue("schoolTypeId", info.schoolTypeId);
    setValue("curriculumIds", info.curriculums?.map((c) => c.id) || []);
    // adminEmail intentionally not set — not editable after creation
    setEditingSchool(info);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingSchool(null);
  };

  const openDeleteModal = (school: School) => {
    setToDelete(school);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setToDelete(null);
  };

  const handleSave = async () => {
    setLoading(true);

    const values = form.getValues();
    const basePayload = {
      name: values.name,
      code: values.code,
      email: values.email,
      phone: values.phone,
      address: values.address,
      motto: values.motto,
      website: values.website,
      description: values.description,
      schoolTypeId: Number(values.schoolTypeId),
      curriculumIds: values.curriculumIds,
    };

    try {
      if (editingSchool) {
        await UpdateSchool({ id: editingSchool.id, ...basePayload });
      } else {
        await addSchool({ ...basePayload, adminEmail: values.adminEmail });
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving school:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!ToDelete) return;

    setLoading(true);
    try {
      await DeleteSchool({ id: ToDelete.id });
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting school:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // Filter based on search input
  const filtered = schools.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "28px 32px",
        boxSizing: "border-box",
      }}
      className="bg-gray-100"
    >
      {/* ── Page Header ── */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: "1.25",
              letterSpacing: "-0.2px",
            }}
          >
            Schools
          </h1>
          <p
            style={{
              margin: "3px 0 0 0",
              fontSize: "13px",
              color: "#94A3B8",
              fontWeight: 400,
            }}
          >
            Manage and monitor academic Schools
          </p>
        </div>

        <button
          onClick={openCreateModal}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "#3B9EFF",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "10px 22px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>+</span>
          Create School
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "0 14px",
          marginBottom: "12px",
          height: "44px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{ flexShrink: 0, marginRight: "8px" }}
        >
          <circle cx="7" cy="7" r="4.5" stroke="#94A3B8" strokeWidth="1.4" />
          <path
            d="M10.5 10.5L13 13"
            stroke="#94A3B8"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          placeholder="Search Schools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "transparent",
          }}
        />
      </div>

      {/* ── Main Content Card ── */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #F1F5F9",
            paddingLeft: "20px",
          }}
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "14px 16px 13px",
                  fontSize: "14px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "#3B9EFF" : "#64748B",
                  background: "none",
                  border: "none",
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
                {["Name", "Code", "Curriculums", "Action"].map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "12px 20px",
                      fontSize: "12.5px",
                      fontWeight: 500,
                      color: "#94A3B8",
                      borderBottom: "1px solid #F1F5F9",
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
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
                    Loading Data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
                    No Data found.
                  </td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr
                    key={row.id}
                    style={{
                      borderBottom: idx < filtered.length - 1 ? "1px solid #F1F5F9" : "none",
                    }}
                  >
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.code || "-"}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {row.curriculums?.map((c) => c.name).join(", ") || "-"}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      <button
                        onClick={() => openEditModal(row)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#3B9EFF",
                          fontWeight: 500,
                          fontSize: "13.5px",
                          cursor: "pointer",
                          marginRight: "12px",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteModal(row)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#EF4444",
                          fontWeight: 500,
                          fontSize: "13.5px",
                          cursor: "pointer",
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

      {/* ── Add / Edit Modal ── */}
      <MyModal
        open={isAddEditModalOpen}
        title={editingSchool ? "Edit School" : "Create School"}
        onClose={closeAddEditModal}
        description=""
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="flex flex-col mb-5 gap-4">
            <FormField className="text-sm font-medium text-gray-700" label="School Name" error={errors.name?.message}>
              <TextInput
                type="text"
                placeholder="Enter School Name"
                {...register("name", { required: "School Name is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="School Code" error={errors.code?.message}>
              <TextInput
                type="text"
                placeholder="e.g. SQ-001"
                {...register("code", { required: "School Code is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Email" error={errors.email?.message}>
              <TextInput
                type="email"
                placeholder="school@example.com"
                {...register("email", { required: "Email is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Phone" error={errors.phone?.message}>
              <TextInput
                type="text"
                placeholder="e.g. 0712345678"
                {...register("phone", { required: "Phone is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Description" error={errors.description?.message}>
              <TextInput
                type="text"
                placeholder="Brief description of the school"
                {...register("description", { required: "Description is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="School Type" error={errors.schoolTypeId?.message}>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("schoolTypeId", {
                  required: "School Type is required",
                  valueAsNumber: true,
                })}
              >
                <option value="">Select a type</option>
                {schoolTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </FormField>

            {/* Curricula multi-select — backend requires at least one */}
            <FormField
              className="text-sm font-medium text-gray-700"
              label="Curricula"
              error={errors.curriculumIds?.message as string | undefined}
            >
              <Controller
                name="curriculumIds"
                control={control}
                rules={{
                  validate: (v) =>
                    (Array.isArray(v) && v.length > 0) ||
                    "Select at least one curriculum",
                }}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-2 border border-gray-200 rounded-md p-3 max-h-40 overflow-y-auto">
                    {curricula.length === 0 ? (
                      <span className="text-xs text-gray-400 col-span-2">
                        No curricula available.
                      </span>
                    ) : (
                      curricula.map((c) => {
                        const value: number[] = field.value || [];
                        const checked = value.includes(c.id);
                        return (
                          <label key={c.id} className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={(e) => {
                                const next = e.target.checked
                                  ? [...value, c.id]
                                  : value.filter((id) => id !== c.id);
                                field.onChange(next);
                              }}
                            />
                            {c.name}
                          </label>
                        );
                      })
                    )}
                  </div>
                )}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Motto (optional)">
              <TextInput type="text" placeholder="School motto" {...register("motto")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Website (optional)">
              <TextInput type="text" placeholder="https://..." {...register("website")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Address (optional)">
              <TextInput type="text" placeholder="Physical address" {...register("address")} />
            </FormField>

            {/* AdminEmail is only settable on creation — backend won't accept it on update */}
            {!editingSchool && (
              <FormField
                className="text-sm font-medium text-gray-700"
                label="School Admin Email"
                error={errors.adminEmail?.message}
              >
                <TextInput
                  type="email"
                  placeholder="admin@example.com"
                  {...register("adminEmail", {
                    required: "Admin email is required to create a school",
                  })}
                />
              </FormField>
            )}
          </div>

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </MyModal>

      {/* ── Delete Modal ── */}
      <MyModal open={isDeleteModalOpen} title="Delete" onClose={closeDeleteModal} description="">
        <div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 600, color: "#EF4444" }}>
            Delete School
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: 600 }}>"{ToDelete?.name}"</span>? This action cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
            <button
              onClick={closeDeleteModal}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid #CBD5E1",
                backgroundColor: "#fff",
                color: "#475569",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#EF4444",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </MyModal>
    </div>
  );
}