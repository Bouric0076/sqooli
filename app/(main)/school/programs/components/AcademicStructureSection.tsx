"use client";

import { useState } from "react";
import { BookOpen, Layers, GraduationCap } from "lucide-react";

type Curriculum = "8-4-4" | "CBC" | "Cambridge";

export default function AcademicStructureSection() {
  const [curriculum, setCurriculum] = useState<Curriculum | "">("");

  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                         Curriculum → Grade Mapping                         */
  /* -------------------------------------------------------------------------- */

  const curriculumGrades: Record<Curriculum, string[]> = {
    "8-4-4": [
      "Class 1",
      "Class 2",
      "Class 3",
      "Class 4",
      "Class 5",
      "Class 6",
      "Class 7",
      "Class 8",
      "Form 1",
      "Form 2",
      "Form 3",
      "Form 4",
    ],
    CBC: [
      "Grade 1",
      "Grade 2",
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
      "Junior Secondary 1",
      "Junior Secondary 2",
    ],
    Cambridge: [
      "Year 1",
      "Year 2",
      "Year 3",
      "Year 4",
      "Year 5",
      "Year 6",
      "Year 7",
      "Year 8",
    ],
  };

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "Kiswahili",
    "Social Studies",
    "Computer Studies",
    "Biology",
    "Chemistry",
    "Physics",
  ];

  /* -------------------------------------------------------------------------- */

  const toggleSelection = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Academic Structure</h2>
        <p className="text-sm text-gray-500 mt-1">
          Define curriculum, grade levels and subjects for this programme.
        </p>
      </div>

      {/* Curriculum Selection */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} />
          <h3 className="font-semibold text-sm">Curriculum Tag (Mandatory)</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {["8-4-4", "CBC", "Cambridge"].map((cur) => (
            <div
              key={cur}
              onClick={() => {
                setCurriculum(cur as Curriculum);
                setSelectedGrades([]); // Reset grades when curriculum changes
              }}
              className={`cursor-pointer border p-4 rounded-xl text-center text-sm font-medium transition
                ${
                  curriculum === cur
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white border-gray-200 hover:shadow"
                }
              `}
            >
              {cur}
            </div>
          ))}
        </div>
      </div>

      {/* Grade Selection */}
      {curriculum && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layers size={18} />
            <h3 className="font-semibold text-sm">
              Grade Level(s) (Select One or More)
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto pr-2">
            {curriculumGrades[curriculum].map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() =>
                  toggleSelection(grade, selectedGrades, setSelectedGrades)
                }
                className={`border rounded-lg px-3 py-2 text-xs transition
                  ${
                    selectedGrades.includes(grade)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subject Selection */}
      {curriculum && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} />
            <h3 className="font-semibold text-sm">
              Subject(s) (Select One or More)
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                onClick={() =>
                  toggleSelection(
                    subject,
                    selectedSubjects,
                    setSelectedSubjects
                  )
                }
                className={`border rounded-lg px-3 py-2 text-xs transition
                  ${
                    selectedSubjects.includes(subject)
                      ? "bg-blue-500 text-white border-blue-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }
                `}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Live Summary Preview */}
      {(curriculum ||
        selectedGrades.length > 0 ||
        selectedSubjects.length > 0) && (
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <h4 className="text-blue-500 font-semibold mb-3 text-sm">
            Academic Structure Summary
          </h4>
          <div className="text-xs text-blue-500 space-y-1">
            <p>
              <strong>Curriculum:</strong> {curriculum || "-"}
            </p>
            <p>
              <strong>Grades:</strong>{" "}
              {selectedGrades.length > 0 ? selectedGrades.join(", ") : "-"}
            </p>
            <p>
              <strong>Subjects:</strong>{" "}
              {selectedSubjects.length > 0 ? selectedSubjects.join(", ") : "-"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
