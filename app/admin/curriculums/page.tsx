"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCPrograms } from "@/app/helpers/program";
import Loader from "@/components/ui/Loader";
import { getCurriculums } from "@/app/helpers/lookups";
import MyModal from "@/app/components/general/modals/MyModal";
import { useForm } from "react-hook-form";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import { addCurriculum, DeleteCurriculum, UpdateCurriculum } from "@/app/lib/curriculum";

// Define the interface based on your API structure
export interface Curriculum {
  id: string;
  name: string;
  acronym: string;
  createdAt?: string; // Fallback for dateAdded
}

type Tab = "Active" | "Inactive";
const TABS: Tab[] = ["Active", "Inactive"];

export default function Page() {
  const router = useRouter();
  const [curriculums, setcurriculums] = useState<Curriculum[]>([]);
  const {loading, setLoading} = useSpinnerStore();
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [search, setSearch] = useState("");

  // ── Modal & Form States ──
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingCurriculum, setEditingCurriculum] = useState<Curriculum | null>(null);
  const [curriculumToDelete, setCurriculumToDelete] = useState<Curriculum | null>(null);

  const form = useForm<Curriculum>({
    defaultValues: {
      name: "",
      id: "",
      acronym: "",
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


  // Fetch real data
  useEffect(() => {
    fetchCurriculums();
  }, []);

  const fetchCurriculums = () => {
    setLoading(true);
    getCurriculums({})
      .then((data) => {
        setcurriculums(data || []);
      })
      .catch((err) => console.error("Error fetching curriculums:", err))
      .finally(() => setLoading(false));
  };

  // ── CRUD Handlers ──
  const openCreateModal = () => {
       reset();
    setEditingCurriculum(null);
    setIsAddEditModalOpen(true);
  };

  const openEditModal = (curriculum: Curriculum) => {
    reset();
    setValue("id",curriculum.id);
     setValue("name",curriculum.name);
     setValue("acronym",curriculum.acronym);
    setEditingCurriculum(curriculum);
    setIsAddEditModalOpen(true);
  };

  const closeAddEditModal = () => {
    setIsAddEditModalOpen(false);
    setEditingCurriculum(null);
  };

  const openDeleteModal = (curriculum: Curriculum) => {
    setCurriculumToDelete(curriculum);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCurriculumToDelete(null);
  };

  const handleSave = async () => {
    
    setLoading(true);
            const payload = {
          id: form.getValues("id"),
          name: form.getValues("name"),
          acronym: form.getValues("acronym"),
          
        }
  
    try {
      if (editingCurriculum) {
        // TODO: Replace with actual update API call
        // await updateCurriculum(editingCurriculum.id, formData);
        
        // Optimistic UI update

     
           await UpdateCurriculum(payload);
 
      } else {
        // TODO: Replace with actual create API call
        // const newCurriculum = await createCurriculum(formData);
        
        // Optimistic UI update (using a temporary ID for local state until refetch)
       await addCurriculum(payload)
     
      }
      closeAddEditModal();
    } catch (error) {
      console.error("Error saving curriculum:", error);
    }finally{
      setLoading(false);
        fetchCurriculums();
    
    }
  };

  const handleDelete = async () => {
    if (!curriculumToDelete) return;


          setLoading(true);
    try {

            const payload = {
          id: curriculumToDelete.id,
          
        }
      // TODO: Replace with actual delete API call
      // await deleteCurriculum(curriculumToDelete.id);
      
      // Optimistic UI update
await DeleteCurriculum(payload);
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting curriculum:", error);
    }finally{
      setLoading(false);
        fetchCurriculums();
    
    }
  };

  // Filter based on search input
  const filtered = curriculums.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );



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
            Curriculums
          </h1>
          <p style={{ margin: "3px 0 0 0", fontSize: "13px", color: "#94A3B8", fontWeight: 400 }}>
            Manage and monitor academic curriculums
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
          Create Curriculum
        </button>
      </div>

      {/* ── Search Bar ── */}
      <div style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "0 14px",
          marginBottom: "12px",
          height: "44px",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginRight: "8px" }}>
          <circle cx="7" cy="7" r="4.5" stroke="#94A3B8" strokeWidth="1.4" />
          <path d="M10.5 10.5L13 13" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>

        <input
          type="text"
          placeholder="Search curriculums..."
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
                {[" Name", "Acronym","Action"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 20px", fontSize: "12.5px", fontWeight: 500, color: "#94A3B8", borderBottom: "1px solid #F1F5F9" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>Loading curriculums...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#94A3B8" }}>No curriculums found.</td>
                </tr>
              ) : (
                filtered.map((row, idx) => (
                  <tr key={row.id} style={{ borderBottom: idx < filtered.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#1E293B", fontWeight: 500 }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "18px 20px", fontSize: "13.5px", color: "#475569" }}>
                      {row.acronym}
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

      {/* ── Add / Edit Modal ── */}
      {isAddEditModalOpen && (
        <div >
         
        </div>
      )}

<MyModal
open={isAddEditModalOpen}
title="Curriculum"
onClose={closeAddEditModal}
description=""
>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">


<div className="flex flex-col  mb-5 gap-5">
  
           <FormField className="text-sm font-medium text-gray-700" label="Curriculum Name" error={errors.name?.message}>
             <TextInput
               type="text"
               placeholder="Enter Program Name"
               {...register("name", { required: "Curriculum Name is required" })}
             />
           </FormField>

           <FormField className="text-sm font-medium text-gray-700" label="Curriculum Acronym" error={errors.acronym?.message}>
             <TextInput
               type="text"
               placeholder="Enter Program Acronym"
               {...register("acronym", { required: "Curriculum acronym is required" })}
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



<MyModal
open={isDeleteModalOpen}
title="Delete"
onClose={closeDeleteModal}
description=""
>
          <div>
            <h2 style={{ margin: "0 0 12px 0", fontSize: "18px", fontWeight: 600, color: "#EF4444" }}>
              Delete Curriculum
            </h2>
            <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#475569", lineHeight: "1.5" }}>
              Are you sure you want to delete <span style={{fontWeight: 600}}>"{curriculumToDelete?.name}"</span>? This action cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
              <button onClick={closeDeleteModal} style={{
                padding: "8px 16px", borderRadius: "6px", border: "1px solid #CBD5E1", backgroundColor: "#fff", color: "#475569", fontSize: "14px", fontWeight: 500, cursor: "pointer"
              }}>Cancel</button>
              <button onClick={handleDelete} style={{
                padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#EF4444", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer"
              }}>Delete</button>
            </div>
          </div>
</MyModal>



    </div>
  );
}