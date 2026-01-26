import { UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import {
  Pencil,
  Trash2,
  GripHorizontal,
  Plus,
  ArrowLeft,
  X,
} from "lucide-react";
import { useState } from "react";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function LessonContentStep({ form, lessonId, onNext }: Props) {
  const {
    register,

    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction",
      lectures: [
        {
          id: 1,
          title: "Introduction",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          quizzes: ["Quiz 1", "Quiz 2"],
          assignments: [],
        },
      ],
    },
  ]);

  /* ================= MODAL STATE ================= */

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // quizzes | assignments | editSection | editLecture
  const [modalValue, setModalValue] = useState("");
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [currentLectureId, setCurrentLectureId] = useState(null);

  /* ================= SECTION ACTIONS ================= */

  const addSection = () => {
    setSections([
      ...sections,
      {
        id: Date.now(),
        title: `Section ${sections.length + 1}`,
        lectures: [],
      },
    ]);
  };

  const deleteSection = (id) => {
    setSections(sections.filter((s) => s.id !== id));
  };

  const editSection = (id) => {
    setModalType("editSection");
    setCurrentSectionId(id);
    setModalValue("");
    setModalOpen(true);
  };

  /* ================= LECTURE ACTIONS ================= */

  const addLecture = (sectionId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: [
                ...s.lectures,
                {
                  id: Date.now(),
                  title: "New Lecture",
                  description: "Enter description...",
                  quizzes: [],
                  assignments: [],
                },
              ],
            }
          : s
      )
    );
  };

  const deleteLecture = (sectionId, lectureId) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.filter((l) => l.id !== lectureId),
            }
          : s
      )
    );
  };

  const editLecture = (sectionId, lectureId) => {
    setModalType("editLecture");
    setCurrentSectionId(sectionId);
    setCurrentLectureId(lectureId);
    setModalValue("");
    setModalOpen(true);
  };

  /* ================= ITEM ACTIONS ================= */

  const addItem = (sectionId, lectureId, type) => {
    setModalType(type); // quizzes or assignments
    setCurrentSectionId(sectionId);
    setCurrentLectureId(lectureId);
    setModalValue("");
    setModalOpen(true);
  };

  const deleteItem = (sectionId, lectureId, type, index) => {
    setSections(
      sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lectures: s.lectures.map((l) =>
                l.id === lectureId
                  ? {
                      ...l,
                      [type]: l[type].filter((_, i) => i !== index),
                    }
                  : l
              ),
            }
          : s
      )
    );
  };

  /* ================= MODAL SUBMIT ================= */

  const handleModalSubmit = () => {
    if (!modalValue) return;

    if (modalType === "editSection") {
      setSections(
        sections.map((s) =>
          s.id === currentSectionId ? { ...s, title: modalValue } : s
        )
      );
    }

    if (modalType === "editLecture") {
      setSections(
        sections.map((s) =>
          s.id === currentSectionId
            ? {
                ...s,
                lectures: s.lectures.map((l) =>
                  l.id === currentLectureId ? { ...l, title: modalValue } : l
                ),
              }
            : s
        )
      );
    }

    if (modalType === "quizzes" || modalType === "assignments") {
      setSections(
        sections.map((s) =>
          s.id === currentSectionId
            ? {
                ...s,
                lectures: s.lectures.map((l) =>
                  l.id === currentLectureId
                    ? {
                        ...l,
                        [modalType]: [...l[modalType], modalValue],
                      }
                    : l
                ),
              }
            : s
        )
      );
    }

    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalValue("");
    setCurrentLectureId(null);
    setCurrentSectionId(null);
  };

  const submitContent = async () => {
    onNext(5);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-1">Lesson Content</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the type of content that will be included in your lesson
        </p>

        {sections.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
          >
            {/* Section Header */}
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">
                  Section {sectionIndex + 1} | {section.title}
                </h3>
                <Pencil
                  size={14}
                  onClick={() => editSection(section.id)}
                  className="cursor-pointer"
                />
                <Trash2
                  size={14}
                  onClick={() => deleteSection(section.id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
              <GripHorizontal size={18} />
            </div>

            {/* Lectures */}
            {section.lectures.map((lecture, lectureIndex) => (
              <div
                key={lecture.id}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-white"
              >
                {/* Lecture Header */}
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    Lecture {lectureIndex + 1} | {lecture.title}
                    <Pencil
                      size={14}
                      onClick={() => editLecture(section.id, lecture.id)}
                      className="cursor-pointer"
                    />
                    <Trash2
                      size={14}
                      onClick={() => deleteLecture(section.id, lecture.id)}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                  <GripHorizontal size={18} />
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 mb-2">Description</p>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
                  value={lecture.description}
                  onChange={(e) =>
                    setSections(
                      sections.map((s) =>
                        s.id === section.id
                          ? {
                              ...s,
                              lectures: s.lectures.map((l) =>
                                l.id === lecture.id
                                  ? {
                                      ...l,
                                      description: e.target.value,
                                    }
                                  : l
                              ),
                            }
                          : s
                      )
                    )
                  }
                />

                {/* Quizzes */}
                <p className="text-xs text-gray-500 mb-1">Quiz(es)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {lecture.quizzes.map((q, i) => (
                    <Chip
                      key={i}
                      label={q}
                      onDelete={() =>
                        deleteItem(section.id, lecture.id, "quizzes", i)
                      }
                    />
                  ))}
                </div>

                {/* Assignments */}
                <p className="text-xs text-gray-500 mb-1">Assignment(s)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {lecture.assignments.map((a, i) => (
                    <Chip
                      key={i}
                      label={a}
                      onDelete={() =>
                        deleteItem(section.id, lecture.id, "assignments", i)
                      }
                    />
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <ActionButton
                    text="Quiz"
                    onClick={() => addItem(section.id, lecture.id, "quizzes")}
                  />
                  <ActionButton
                    text="Assignment"
                    onClick={() =>
                      addItem(section.id, lecture.id, "assignments")
                    }
                  />
                  <ActionButton
                    text="Exam"
                    onClick={() =>
                      addItem(section.id, lecture.id, "assignments")
                    }
                  />
                  <ActionButton
                    text="Other Resources"
                    onClick={() =>
                      addItem(section.id, lecture.id, "assignments")
                    }
                  />
                </div>
              </div>
            ))}

            <button
              onClick={() => addLecture(section.id)}
              className="w-full border border-gray-300 rounded-md py-2 text-sm flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Add Lecture
            </button>
          </div>
        ))}

        {/* Add Section */}
        <button
          onClick={addSection}
          className="w-full border border-gray-300 rounded-md py-2 text-sm flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Section
        </button>

        {/* Footer */}
        <div className="flex justify-between mt-6">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm">
            <ArrowLeft size={16} /> Back
          </button>

          <button
            onClick={submitContent}
            className="px-6 py-2 bg-gray-200 border-gray-300 rounded-md text-sm font-medium"
          >
            Save & Continue →
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg capitalize">
                {modalType === "editSection" && "Edit Section"}
                {modalType === "editLecture" && "Edit Lecture"}
                {(modalType === "quizzes" || modalType === "assignments") &&
                  `Add ${modalType.slice(0, -1)}`}
              </h3>
              <X className="cursor-pointer" onClick={closeModal} />
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Select item to add to this lesson
            </p>

            {/* Input */}
            <input
              type="text"
              placeholder="Type to search"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />

            {/* Footer */}
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= COMPONENTS ================= */

function Chip({ label, onDelete }) {
  return (
    <div className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-full text-xs bg-gray-100">
      {label}
      <Trash2
        size={12}
        onClick={onDelete}
        className="text-red-500 cursor-pointer"
      />
    </div>
  );
}

function ActionButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-xs hover:bg-gray-100"
    >
      <Plus size={12} /> {text}
    </button>
  );
}
