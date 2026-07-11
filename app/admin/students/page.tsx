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
  addStudent,
  DeleteStudent,
  getStudents,
  UpdateStudent,
} from "@/app/lib/student"; // TODO: confirm this path/casing matches your project

// Matches StudentResponseDto from the API
export interface Student {
  id: string;
  admissionNumber: string;
  fullName: string;
  gender: string;
  dob: string; // yyyy-MM-dd
  email?: string;
}

// Only relevant on create — StudentUpdateDto doesn't accept these
interface StudentFormValues {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  admissionNumber: string;
  fullName: string;
  gender: string;
  dob: string;
  referralCode?: string;
}

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];
const GENDER_OPTIONS = ["Male", "Female", "Other"];

export default function Page() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal & Form States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [ToDelete, setToDelete] = useState<Student | null>(null);

  const form = useForm<StudentFormValues>({
    defaultValues: {
      id: "",
      email: "",
      firstName: "",
      lastName: "",
      admissionNumber: "",
      fullName: "",
      gender: "",
      dob: "",
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
  }, []);

  const fetchData = () => {
    setLoading(true);
    getStudents({})
      .then((data) => {
        setStudents(data?.data || []);
      })
      .catch((err) => console.error("Error fetching students:", err))
      .finally(() => setLoading(false));
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
    reset();
    setEditingStudent(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (info: Student) => {
    reset();
    setValue("id", info.id);
    setValue("fullName", info.fullName);
    setValue("gender", info.gender);
    setValue("dob", info.dob);
    // email / admissionNumber shown read-only in edit mode, not registered as editable
    setEditingStudent(info);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingStudent(null);
  };

  const openDeleteModal = (student: Student) => {
    setToDelete(student);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setToDelete(null);
  };

  const handleSave = async () => {
    setLoading(true);

    const values = form.getValues();

    try {
      if (editingStudent) {
        // StudentUpdateDto: FullName, Gender, Dob only
        await UpdateStudent({
          id: editingStudent.id,
          fullName: values.fullName,
          gender: values.gender,
          dob: values.dob,
        });
      } else {
        // StudentCreateDto: Email, FirstName, LastName, AdmissionNumber, Gender, Dob, ReferralCode?
        await addStudent({
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          admissionNumber: values.admissionNumber,
          gender: values.gender,
          dob: values.dob,
          referralCode: values.referralCode || undefined,
        });
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving student:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  const handleDelete = async () => {
    if (!ToDelete) return;

    setLoading(true);
    try {
      await DeleteStudent({ id: ToDelete.id });
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting student:", error);
    } finally {
      setLoading(false);
      fetchData();
    }
  };

  // Filter based on search input
  const filtered = students.filter(
    (s) =>
      s.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      s.admissionNumber?.toLowerCase().includes(search.toLowerCase())
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
            Students
          </h1>
          <p
            style={{
              margin: "3px 0 0 0",
              fontSize: "13px",
              color: "#94A3B8",
              fontWeight: 400,
            }}
          >
            Manage and monitor enrolled students
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
          Create Student
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
          placeholder="Search Students..."
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
                {["Full Name", "Admission No.", "Gender", "DOB", "Email", "Action"].map((h) => (
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
                      {row.admissionNumber}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.gender}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.dob}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.email || "-"}
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
        title={editingStudent ? "Edit Student" : "Create Student"}
        onClose={closeAddEditModal}
        description=""
      >
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          <div className="flex flex-col mb-5 gap-4">
            {editingStudent ? (
              <>
                {/* Read-only context — not part of StudentUpdateDto */}
                <div className="text-xs text-gray-500 bg-gray-50 rounded-md px-3 py-2">
                  <div>Admission No: <span className="font-medium text-gray-700">{editingStudent.admissionNumber}</span></div>
                  <div>Email: <span className="font-medium text-gray-700">{editingStudent.email || "-"}</span></div>
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
                    placeholder="student@example.com"
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

                <FormField className="text-sm font-medium text-gray-700" label="Admission Number" error={errors.admissionNumber?.message}>
                  <TextInput
                    type="text"
                    placeholder="e.g. ADM-0001"
                    {...register("admissionNumber", { required: "Admission Number is required" })}
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

            <FormField className="text-sm font-medium text-gray-700" label="Gender" error={errors.gender?.message}>
              <select
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select gender</option>
                {GENDER_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField className="text-sm font-medium text-gray-700" label="Date of Birth" error={errors.dob?.message}>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                {...register("dob", { required: "Date of Birth is required" })}
              />
            </FormField>
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
            Delete Student
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