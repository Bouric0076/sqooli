"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { ProgramRequest } from "../types/program";
import ProgramDetailsModal from "../components/ProgramDetailsModal";

export default function ProgramForm() {
  const [hasSubPrograms, setHasSubPrograms] = useState(false);

  const [showModal, setShowModal] = useState(false);

const [programData, setProgramData] = useState<ProgramRequest>({
  programName: "",
  programTypeId: 0,
  curriculumId: 0,
  programStartDate: "",
  programEndDate: "",
  hasSubPrograms: false,
  subPrograms: [],
  schedules: [],
  holidays: [],
  businessHours: [],
});

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Program Details
        </h2>
        <p className="text-gray-500 text-sm">
          Add basic information about your program
        </p>
      </div>

      <div className="space-y-5">
        {/* Program Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Program Name
          </label>
          <input
            type="text"
            className="w-full mt-2 border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Program Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Program Type
          </label>
          <select className="w-full mt-2 border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select...</option>
          </select>
        </div>

        {/* Curriculum */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Curriculum
          </label>
          <select className="w-full mt-2 border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select...</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Program Start Date
            </label>

            <div className="relative mt-2">
              <input
                type="date"
                className="w-full border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Program End Date
            </label>

            <div className="relative mt-2">
              <input
                type="date"
                className="w-full border rounded-full px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Calendar className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Toggle + Add Button */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={hasSubPrograms}
              onChange={() => setHasSubPrograms(!hasSubPrograms)}
              className="w-5 h-5"
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Do you have more than one sub-programs
              </p>
              <p className="text-xs text-gray-500">
                Add sub-programs to your program
              </p>
            </div>
          </div>

 <button
  onClick={() => setShowModal(true)}
  className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-full"
>
  + Add Program Details
</button>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <button className="px-5 py-2 rounded-full border text-gray-600 hover:bg-gray-100">
            ← Back
          </button>

          <button className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
            Go to Preview →
          </button>
        </div>
      </div>


<ProgramDetailsModal open={showModal} onClose={() => setShowModal(false)} />

    </div>
  );
}