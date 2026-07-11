"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import MyModal from "@/app/components/general/modals/MyModal";
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import {
  addTeacher,
  DeleteTeacher,
  getTeachers,
  UpdateTeacher,
} from "@/app/lib/teacher"; // TODO: confirm this path/casing matches your project
import { getCertificateLevels } from "@/app/helpers/lookups";

// Matches TeacherResponseDto from the API
export interface Teacher {
  id: string;
  fullName: string;
  phone: string;
  gender?: string;
  nationalId?: string;
  address?: string;
  bio?: string;
  tscNumber?: string;
  dob?: string;
  workplace?: string;
  nationality?: string;
  avatarUrl?: string;
  isIndependent: boolean;
  certificateLevelId?: number;
  certificateLevelName?: string;
  email?: string;
}

export interface CertificateLevel {
  id: number;
  name: string;
}

// Only relevant on create — TeacherUpdateDto doesn't accept these
interface TeacherFormValues {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  gender: string;
  nationalId: string;
  address: string;
  bio: string;
  tscNumber: string;
  dob: string;
  workplace: string;
  nationality: string;
  avatarUrl: string;
  certificateLevelId: string;
  isIndependent: boolean;
  referralCode: string;
}

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];

export default function Page() {
  const router = useRouter();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [certificateLevels, setCertificateLevels] = useState<CertificateLevel[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal & Form States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [ToDelete, setToDelete] = useState<Teacher | null>(null);

  const form = useForm<TeacherFormValues>({
    defaultValues: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      fullName: "",
      phone: "",
      gender: "",
      nationalId: "",
      address: "",
      bio: "",
      tscNumber: "",
      dob: "",
      workplace: "",
      nationality: "",
      avatarUrl: "",
      certificateLevelId: "",
      isIndependent: true,
      referralCode: "",
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = form;

  // ── Fetch real data ──
  useEffect(() => {
    fetchData();
    fetchCertificateLevels();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getTeachers({})
      .then((data) => {
        setTeachers(data?.data || []);
      })
      .catch((err) => console.error("Error fetching teachers:", err))
      .finally(() => setLoading(false));
  };

  const fetchCertificateLevels = () => {
    getCertificateLevels()
      .then((data) => {
        setCertificateLevels(data || []);
      })
      .catch((err) => console.error("Error fetching certificate levels:", err));
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
    reset();
    setEditingTeacher(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (info: Teacher) => {
    reset();
    setValue("id", info.id);
    setValue("fullName", info.fullName);
    setValue("phone", info.phone);
    setValue("gender", info.gender ?? "");
    setValue("nationalId", info.nationalId ?? "");
    setValue("address", info.address ?? "");
    setValue("bio", info.bio ?? "");
    setValue("tscNumber", info.tscNumber ?? "");
    setValue("dob", info.dob ?? "");
    setValue("workplace", info.workplace ?? "");
    setValue("nationality", info.nationality ?? "");
    setValue("avatarUrl", info.avatarUrl ?? "");
    setValue("certificateLevelId", info.certificateLevelId ? String(info.certificateLevelId) : "");
    setValue("isIndependent", info.isIndependent);
    // email / firstName / lastName not shown in edit mode — not part of TeacherUpdateDto
    setEditingTeacher(info);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingTeacher(null);
  };

  const openDeleteModal = (teacher: Teacher) => {
    setToDelete(teacher);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setToDelete(null);
  };

  const handleSave = async () => {
    setLoading(true);

    const values = form.getValues();
    const sharedFields = {
      phone: values.phone,
      certificateLevelId: values.certificateLevelId ? Number(values.certificateLevelId) : undefined,
      nationalId: values.nationalId || undefined,
      address: values.address || undefined,
      bio: values.bio || undefined,
      gender: values.gender || undefined,
      tscNumber: values.tscNumber || undefined,
      dob: values.dob || undefined,
      workplace: values.workplace || undefined,
      nationality: values.nationality || undefined,
      avatarUrl: values.avatarUrl || undefined,
      isIndependent: values.isIndependent,
    };

    try {
      if (editingTeacher) {
        // TeacherUpdateDto: FullName + shared fields (no email/firstName/lastName)
        await UpdateTeacher({
          id: editingTeacher.id,
          fullName: values.fullName,
          ...sharedFields,
        });
      } else {
        // TeacherCreateDto: Email, FirstName, LastName + shared fields + ReferralCode?
        await addTeacher({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          referralCode: values.referralCode || undefined,
          ...sharedFields,
        });
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving teacher:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!ToDelete) return;

    setLoading(true);
    try {
      await DeleteTeacher({ id: ToDelete.id });
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // Filter based on search input
  const filtered = teachers.filter(
    (t) =>
      t.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      t.phone?.toLowerCase().includes(search.toLowerCase())
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
            Teachers
          </h1>
          <p
            style={{
              margin: "3px 0 0 0",
              fontSize: "13px",
              color: "#94A3B8",
              fontWeight: 400,
            }}
          >
            Manage and monitor teachers
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
          Create Teacher
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
          placeholder="Search Teachers..."
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
                {["Full Name", "Phone", "Certificate", "Workplace", "Independent", "Action"].map((h) => (
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
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
                    Loading Data...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>
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
                      {row.fullName}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.phone}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.certificateLevelName || "-"}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.workplace || "-"}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.isIndependent ? "Yes" : "No"}
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
        title={editingTeacher ? "Edit Teacher" : "Create Teacher"}
        onClose={closeAddEditModal}
        description=""
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="flex flex-col mb-5 gap-4">
            {editingTeacher ? (
              <>
                {/* Read-only context — not part of TeacherUpdateDto */}
                <div className="text-xs text-gray-500 bg-gray-50 rounded-md px-3 py-2">
                  Email: <span className="font-medium text-gray-700">{editingTeacher.email || "-"}</span>
                </div>

                <FormField className="text-sm font-medium text-gray-700" label="Full Name" error={errors.fullName?.message}>
                  <TextInput
                    type="text"
                    placeholder="Enter Full Name"
                    {...register("fullName", { required: "Full Name is required" })}
                  />
                </FormField>
              </>
            ) : (
              <>
                <FormField className="text-sm font-medium text-gray-700" label="Email" error={errors.email?.message}>
                  <TextInput
                    type="email"
                    placeholder="teacher@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                </FormField>

                <FormField className="text-sm font-medium text-gray-700" label="First Name" error={errors.firstName?.message}>
                  <TextInput
                    type="text"
                    placeholder="Enter First Name"
                    {...register("firstName", { required: "First Name is required" })}
                  />
                </FormField>

                <FormField className="text-sm font-medium text-gray-700" label="Last Name" error={errors.lastName?.message}>
                  <TextInput
                    type="text"
                    placeholder="Enter Last Name"
                    {...register("lastName", { required: "Last Name is required" })}
                  />
                </FormField>

                <FormField className="text-sm font-medium text-gray-700" label="Referral Code (optional)">
                  <TextInput
                    type="text"
                    placeholder="Enter referral code, if any"
                    {...register("referralCode")}
                  />
                </FormField>
              </>
            )}

            <FormField className="text-sm font-medium text-gray-700" label="Phone" error={errors.phone?.message}>
              <TextInput
                type="text"
                placeholder="e.g. 0712345678"
                {...register("phone", { required: "Phone is required" })}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Certificate Level (optional)">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("certificateLevelId")}
              >
                <option value="">Select certificate level</option>
                {certificateLevels.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Gender (optional)">
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("gender")}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Date of Birth (optional)">
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("dob")}
              />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="National ID (optional)">
              <TextInput type="text" placeholder="National ID number" {...register("nationalId")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="TSC Number (optional)">
              <TextInput type="text" placeholder="TSC registration number" {...register("tscNumber")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Workplace (optional)">
              <TextInput type="text" placeholder="Current workplace" {...register("workplace")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Nationality (optional)">
              <TextInput type="text" placeholder="e.g. Kenyan" {...register("nationality")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Address (optional)">
              <TextInput type="text" placeholder="Physical address" {...register("address")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Bio (optional)">
              <TextInput type="text" placeholder="Short bio" {...register("bio")} />
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Avatar URL (optional)">
              <TextInput type="text" placeholder="https://..." {...register("avatarUrl")} />
            </FormField>

            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" {...register("isIndependent")} />
              Independent teacher (not tied to a single school)
            </label>
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
            Delete Teacher
          </h2>
          <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
            Are you sure you want to delete{" "}
            <span style={{ fontWeight: 600 }}>"{ToDelete?.fullName}"</span>? This action cannot be undone.
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