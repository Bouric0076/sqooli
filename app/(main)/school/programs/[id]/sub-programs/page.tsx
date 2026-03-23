"use client";

import React, { useEffect, useState } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Plus, 
  Search, 
  ListFilter,
  MoreVertical
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ProgramDetailsModal from "../../components/ProgramDetailsModal";
import { useForm } from "react-hook-form";
import { ProgramRequest } from "../../types/program";
import { getCProgram } from "@/app/helpers/program";

// Types for the Sub-Program
interface SubProgram {
  id: string;
  dateAdded: string;
  name: string;
  curriculum: string;
  gradeLevel: string;
  subjects: string[];
  extraCount: number;
  createdBy: {
    name: string;
    email: string;
    avatar: string;
  };
}

export default function ProgramDetailUI() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Active");
  const [program, setProgram] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();


  const form = useForm<ProgramRequest>({
  defaultValues: {
    programId: 0,
    programName: "",
    programTypeId: 0,
    curriculumId: 0,
    programStartDate: "",
    programEndDate: "",
    hasSubPrograms: true,
    subPrograms: [],
    schedules: [],
    holidays: [],
    businessHours: [],
  },
});


useEffect(() => {
  if (id) {
    getCProgram(id)
      .then((data) => {
        const p = data?.data;

        setProgram(p);

        form.reset({
          programId: p?.id || 0,
          programName: p?.programName || "",
          programTypeId: p?.programType?.id || 0,
          curriculumId: p?.curriculumId || 0,
          programStartDate: p?.programStartDate || "",
          programEndDate: p?.programEndDate || "",
          hasSubPrograms: true,
          subPrograms: [],
          schedules: [],
          holidays: [],
          businessHours: [],
        });
      })
      .catch((err) => console.error("Error fetching program:", err))
      .finally(() => setLoading(false));
  }
}, []);

useEffect(() => {
  if (id) {
    getCProgram(id)
      .then((data) => {
        const p = data?.data;

        setProgram(p);

        form.reset({
          programId: p?.id || 0,
          programName: p?.programName || "",
          programTypeId: p?.programType?.id || 0,
          curriculumId: p?.curriculumId || 0,
          programStartDate: p?.programStartDate || "",
          programEndDate: p?.programEndDate || "",
          hasSubPrograms: true,
          subPrograms: [],
          schedules: [],
          holidays: [],
          businessHours: [],
        });
      })
      .catch((err) => console.error("Error fetching program:", err))
      .finally(() => setLoading(false));
  }
}, [id]);

 


  const subPrograms: SubProgram[] = [
    {
      id: "1",
      dateAdded: "24 Jan 2026 11.00 AM",
      name: "CBC First Term 2026",
      curriculum: "CBC",
      gradeLevel: "CBC",
      subjects: ["Math", "Eng", "Kis"],
      extraCount: 4,
      createdBy: { name: "Olivia Rhye", email: "oliviarhye@gm...", avatar: "https://i.pravatar.cc/40?img=1" }
    },
    {
      id: "2",
      dateAdded: "24 Jan 2026 11.00 AM",
      name: "Tennis",
      curriculum: "CBC",
      gradeLevel: "CBC",
      subjects: ["Math", "Eng", "Kis"],
      extraCount: 4,
      createdBy: { name: "Phoenix Baker", email: "phoenixbaker@", avatar: "https://i.pravatar.cc/40?img=2" }
    },
    {
      id: "3",
      dateAdded: "24 Jan 2026 11.00 AM",
      name: "Arts & Craft",
      curriculum: "CBC",
      gradeLevel: "CBC",
      subjects: ["Math", "Eng", "Kis"],
      extraCount: 4,
      createdBy: { name: "Lana Steiner", email: "lanasteiner@gm", avatar: "https://i.pravatar.cc/40?img=3" }
    },
    {
      id: "4",
      dateAdded: "24 Jan 2026 11.00 AM",
      name: "Programming",
      curriculum: "CBC",
      gradeLevel: "CBC",
      subjects: ["Math", "Eng", "Kis"],
      extraCount: 4,
      createdBy: { name: "Demi Wilkinson", email: "demiwilkinson@", avatar: "https://i.pravatar.cc/40?img=4" }
    }
  ];



  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 text-[#1D2939]">
      {/* --- Breadcrumbs --- */}
      <nav className="flex items-center gap-2 text-sm mb-6 text-[#667085]">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="flex items-center gap-1 italic">
            <span className="not-italic">📖</span> Programs
          </span>
          <ChevronRight size={14} />
        </div>
        <span className="text-[#3B9EFF] font-medium">{program?.programName || "Program Name"}</span>
      </nav>

      {/* --- Header --- */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[32px] font-bold tracking-tight"></h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#344054] shadow-sm">
            Other Actions <ChevronDown size={16} />
          </button>
          <button  onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-[#3B9EFF] text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-blue-600 transition">
            <Plus size={18} /> Add Sub-Program
          </button>
        </div>
      </div>

      {/* --- Program Summary Bar --- */}
      <div className="grid grid-cols-6 bg-white border border-[#EAECF0] rounded-xl mb-10 shadow-sm overflow-hidden">
        <SummaryItem title={program?.programName || "Program Name"} subtitle="Date Created: 11 Jan 2026" />
        <SummaryItem title={program?.programStartDate || "12 Jan 2020"} subtitle="Program Start Date" />
        <SummaryItem title={program?.programEndDate || "12 Jan 2020"} subtitle="Program End Date" />
        <SummaryItem 
          title={program?.curriculum || "CBC"} 
          subtitle="Curriculum" 
          icon={<div className="bg-black text-white text-[8px] p-0.5 rounded font-bold mr-1">CBC</div>} 
        />
        <SummaryItem title={program?.subPrograms?.length || "4"} subtitle="Sub-program" />
        <div className="p-4 border-l border-[#EAECF0]">
          <p className="text-[12px] text-[#667085] mb-1">Status</p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ECFDF3] text-[#027A48]">
            Active
          </span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">Sub-Programs</h2>

      {/* --- Main Content Card --- */}
      <div className="bg-white border border-[#EAECF0] rounded-xl shadow-sm">
        {/* Search & Filter */}
        <div className="p-4 flex items-center justify-between border-b border-[#EAECF0] bg-[#F9FAFB] rounded-t-xl">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 border border-[#D0D5DD] rounded-full text-sm focus:outline-none"
            />
          </div>
          <button className="p-2 border border-[#D0D5DD] rounded-lg bg-white">
            <ListFilter size={20} className="text-[#344054]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#EAECF0] px-4 pt-4">
          {["Active", "Inactive", "Drafts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium relative ${
                activeTab === tab ? "text-[#3B9EFF]" : "text-[#667085]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3B9EFF]" />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#EAECF0] text-[12px] text-[#667085] font-medium">
                <th className="px-6 py-4">Date Added</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Curriculum</th>
                <th className="px-6 py-4">Grade Level</th>
                <th className="px-6 py-4">Subjects</th>
                <th className="px-6 py-4">Created By</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAECF0]">
               {program?.subPrograms?.map((subprogram) => (
                <tr key={subprogram.id} className="text-sm">
                  <td className="px-6 py-5 text-[#667085]">{subprogram.startDate}</td>
                  <td className="px-6 py-5 font-medium">{subprogram.name}</td>
                  <td className="px-6 py-5 text-[#475467]">{program.curriculum}</td>
                  <td className="px-6 py-5 text-[#475467]">

                    <div className="flex items-center gap-2">
                      {subprogram.gradeLevels.map((s) => (
                        <span key={s.gradeLevelId} className="px-2 py-0.5 bg-[#F9F5FF] text-[#6941C6] border border-[#E9D7FE] rounded-lg text-xs font-medium">
                          {s.name}
                        </span>
                      ))}
                      <span className="text-xs text-[#667085]">+{subprogram.extraCount}</span>
                    </div>


                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {subprogram.subjects.map((s) => (
                        <span key={s.subjectId} className="px-2 py-0.5 bg-[#F9F5FF] text-[#6941C6] border border-[#E9D7FE] rounded-lg text-xs font-medium">
                          {s.name}
                        </span>
                      ))}
                      <span className="text-xs text-[#667085]">+{subprogram.extraCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <img src={subprogram?.createdBy?.avatar ?? 'https://i.pravatar.cc/40?img=4'} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-[#101828]">{subprogram?.createdBy?.name ?? 'Admin'}</div>
                        <div className="text-xs text-[#667085]">{subprogram?.createdBy?.email ?? 'admin@sqooli.com'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                           type="button"
                        onClick={() => router.push(`/school/programs/${subprogram.id}/sub-programs/slots`)}
                    className="text-[#3B9EFF] font-semibold hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex items-center justify-between border-t border-[#EAECF0]">
          <div className="text-sm text-[#344054]">
            Page <span className="mx-1 px-2 py-1 border border-[#D0D5DD] rounded bg-white">1</span> of 10
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#344054] bg-[#F2F4F7] opacity-60">Previous</button>
            <button className="px-4 py-2 border border-[#D0D5DD] rounded-lg text-sm font-semibold text-[#344054] bg-[#F2F4F7]">Next</button>
          </div>
        </div>
      </div>



      <ProgramDetailsModal
        form={form}
        open={showModal}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}

function SummaryItem({ title, subtitle, icon }: { title: string; subtitle: string; icon?: React.ReactNode }) {
  return (
    <div className="p-4 border-r border-[#EAECF0] last:border-r-0">
      <p className="text-[12px] text-[#667085] mb-1">{subtitle}</p>
      <div className="flex items-center">
        {icon}
        <p className="text-sm font-bold text-[#101828]">{title}</p>
      </div>
    </div>
  );
}