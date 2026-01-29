"use client";

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
import { useState, useEffect } from "react";
import {
  LessonSection,
  getLessonContent,
  saveLessonContent,
} from "@/app/lib/lessonContent";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function LessonContentStep({ form, lessonId, onNext, onBack }: Props) {
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

  const [sections, setSections] = useState<LessonSection[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= MODAL STATE ================= */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // quizzes | assignments | editSection | editLecture
  const [modalValue, setModalValue] = useState("");
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null
  );
  const [currentLectureIndex, setCurrentLectureIndex] = useState<number | null>(
    null
  );

  /* ================= LOAD LESSON CONTENT ================= */
  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    getLessonContent(lessonId)
      .then((res) => {
        setSections(res.sections);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  /* ================= SECTION ACTIONS ================= */
  const addSection = () => {
    setSections([
      ...sections,
      {
        title: `Section ${sections.length + 1}`,
        order: sections.length + 1,
        lectures: [],
      },
    ]);
  };

  const deleteSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const editSection = (index: number) => {
    setModalType("editSection");
    setCurrentSectionIndex(index);
    setModalValue(sections[index].title);
    setModalOpen(true);
  };

  /* ================= LECTURE ACTIONS ================= */
  const addLecture = (sectionIndex: number) => {
    setSections(
      sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              lectures: [
                ...s.lectures,
                {
                  title: "New Lecture",
                  description: "",
                  order: s.lectures.length + 1,
                  items: [],
                },
              ],
            }
          : s
      )
    );
  };

  const deleteLecture = (sectionIndex: number, lectureIndex: number) => {
    setSections(
      sections.map((s, i) =>
        i === sectionIndex
          ? {
              ...s,
              lectures: s.lectures.filter((_, li) => li !== lectureIndex),
            }
          : s
      )
    );
  };

  const editLecture = (sectionIndex: number, lectureIndex: number) => {
    setModalType("editLecture");
    setCurrentSectionIndex(sectionIndex);
    setCurrentLectureIndex(lectureIndex);
    setModalValue(sections[sectionIndex].lectures[lectureIndex].title);
    setModalOpen(true);
  };

  /* ================= ITEM ACTIONS ================= */
  const addItem = (
    sectionIndex: number,
    lectureIndex: number,
    type: "Quiz" | "Assignment" | "Exam" | "Resource"
  ) => {
    setModalType(type.toLowerCase()); // "quiz" | "assignment" | "exam" | "resource"
    setCurrentSectionIndex(sectionIndex);
    setCurrentLectureIndex(lectureIndex);
    setModalValue("");
    setModalOpen(true);
  };

  const deleteItem = (
    sectionIndex: number,
    lectureIndex: number,
    itemIndex: number
  ) => {
    setSections(
      sections.map((s, si) =>
        si === sectionIndex
          ? {
              ...s,
              lectures: s.lectures.map((l, li) =>
                li === lectureIndex
                  ? { ...l, items: l.items.filter((_, ii) => ii !== itemIndex) }
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

    if (modalType === "editSection" && currentSectionIndex !== null) {
      setSections(
        sections.map((s, i) =>
          i === currentSectionIndex ? { ...s, title: modalValue } : s
        )
      );
    }

    if (
      modalType === "editLecture" &&
      currentSectionIndex !== null &&
      currentLectureIndex !== null
    ) {
      setSections(
        sections.map((s, si) =>
          si === currentSectionIndex
            ? {
                ...s,
                lectures: s.lectures.map((l, li) =>
                  li === currentLectureIndex ? { ...l, title: modalValue } : l
                ),
              }
            : s
        )
      );
    }

    if (
      ["quiz", "assignment", "exam", "resource"].includes(modalType) &&
      currentSectionIndex !== null &&
      currentLectureIndex !== null
    ) {
      const typeCapitalized =
        modalType.charAt(0).toUpperCase() + modalType.slice(1);
      setSections(
        sections.map((s, si) =>
          si === currentSectionIndex
            ? {
                ...s,
                lectures: s.lectures.map((l, li) =>
                  li === currentLectureIndex
                    ? {
                        ...l,
                        items: [
                          ...l.items,
                          {
                            title: modalValue,
                            type: typeCapitalized,
                            order: l.items.length + 1,
                          },
                        ],
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
    setCurrentLectureIndex(null);
    setCurrentSectionIndex(null);
  };

  /* ================= SAVE ================= */
  const submitContent = async () => {
    if (!lessonId) return alert("lessonid missing");
    await saveLessonContent({ lessonId, sections });
    onNext(lessonId);
  };

  /* ================= UI ================= */
  if (loading) return <div className="p-6">Loading lesson content...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-1">Lesson Content</h2>
        <p className="text-sm text-gray-500 mb-6">
          Select the type of content that will be included in your lesson
        </p>

        {sections.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50"
          >
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">
                  Section {sectionIndex + 1} | {section.title}
                </h3>
                <Pencil
                  size={14}
                  onClick={() => editSection(sectionIndex)}
                  className="cursor-pointer"
                />
                <Trash2
                  size={14}
                  onClick={() => deleteSection(sectionIndex)}
                  className="cursor-pointer text-red-500"
                />
              </div>
              <GripHorizontal size={18} />
            </div>

            {section.lectures.map((lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-white"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    Lecture {lectureIndex + 1} | {lecture.title}
                    <Pencil
                      size={14}
                      onClick={() => editLecture(sectionIndex, lectureIndex)}
                      className="cursor-pointer"
                    />
                    <Trash2
                      size={14}
                      onClick={() => deleteLecture(sectionIndex, lectureIndex)}
                      className="cursor-pointer text-red-500"
                    />
                  </div>
                  <GripHorizontal size={18} />
                </div>

                <p className="text-xs text-gray-500 mb-2">Description</p>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-2 text-sm mb-3"
                  value={lecture.description}
                  onChange={(e) =>
                    setSections(
                      sections.map((s, si) =>
                        si === sectionIndex
                          ? {
                              ...s,
                              lectures: s.lectures.map((l, li) =>
                                li === lectureIndex
                                  ? { ...l, description: e.target.value }
                                  : l
                              ),
                            }
                          : s
                      )
                    )
                  }
                />

                <p className="text-xs text-gray-500 mb-1">Items</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {lecture.items.map((item, itemIndex) => (
                    <Chip
                      key={itemIndex}
                      label={`${item.type}: ${item.title}`}
                      onDelete={() =>
                        deleteItem(sectionIndex, lectureIndex, itemIndex)
                      }
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  {["Quiz", "Assignment", "Exam", "Resource"].map((type) => (
                    <ActionButton
                      key={type}
                      text={type}
                      onClick={() =>
                        addItem(sectionIndex, lectureIndex, type as any)
                      }
                    />
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={() => addLecture(sectionIndex)}
              className="w-full border border-gray-300 rounded-md py-2 text-sm flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Add Lecture
            </button>
          </div>
        ))}

        <button
          onClick={addSection}
          className="w-full border border-gray-300 rounded-md py-2 text-sm flex items-center justify-center gap-2"
        >
          <Plus size={14} /> Add Section
        </button>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => onBack(lessonId!)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm"
          >
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[420px] p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg capitalize">
                {modalType === "editSection" && "Edit Section"}
                {modalType === "editLecture" && "Edit Lecture"}
                {["quiz", "assignment", "exam", "resource"].includes(
                  modalType
                ) &&
                  `Add ${
                    modalType.charAt(0).toUpperCase() + modalType.slice(1)
                  }`}
              </h3>
              <X className="cursor-pointer" onClick={closeModal} />
            </div>

            <input
              type="text"
              placeholder="Type to search"
              value={modalValue}
              onChange={(e) => setModalValue(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />

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
function Chip({ label, onDelete }: { label: string; onDelete: () => void }) {
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

function ActionButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1 text-xs hover:bg-gray-100"
    >
      <Plus size={12} /> {text}
    </button>
  );
}
