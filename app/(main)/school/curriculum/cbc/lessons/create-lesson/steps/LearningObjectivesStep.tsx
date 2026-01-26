"use client";

import { Trash2, ArrowLeft } from "lucide-react";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import {
  getLessonObjectives,
  bulkReplaceLessonObjectives,
} from "@/app/lib/lessonObjectives";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function LearningObjectivesStep({
  form,
  lessonId,
  onNext,
  onBack,
}: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  const [objectives, setObjectives] = useState<string[]>(["", ""]);
  const MAX_CHARS = 60;

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value.slice(0, MAX_CHARS);
    setObjectives(updated);
  };

  const addObjective = () => setObjectives([...objectives, ""]);
  const removeObjective = (index: number) =>
    setObjectives(objectives.filter((_, i) => i !== index));

  /** Preload objectives for editing */
  useEffect(() => {
    if (!lessonId) return;

    const loadObjectives = async () => {
      try {
        const loaded = await getLessonObjectives(lessonId);
        setObjectives(loaded.length ? loaded : ["", ""]);
      } catch (err) {
        console.error("Failed to load objectives", err);
        setObjectives(["", ""]);
      }
    };

    loadObjectives();
  }, [lessonId]);

  /** Bulk replace on save */
  const submitObjectives = async () => {
    try {
      if (!lessonId) throw new Error("Lesson ID missing");

      const cleanedObjectives = objectives
        .map((o) => o.trim())
        .filter((o) => o.length > 0);
      if (!cleanedObjectives.length) return;

      await bulkReplaceLessonObjectives(lessonId, cleanedObjectives);
      onNext(lessonId);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <>
      <PageHeader
        title="Learning Objectives"
        description="Add summary of what your students can expect to learn"
      />

      <div className="bg-white p-8 rounded-md space-y-6">
        <div className="space-y-3">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-2"
            >
              <input
                type="text"
                placeholder="Enter Learning Objective"
                value={objective}
                onChange={(e) => updateObjective(index, e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {objective.length}/{MAX_CHARS} characters
              </span>
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addObjective}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1 border border-gray-300 rounded-full px-4 py-2"
        >
          + Add Objective
        </button>

        <div className="flex items-center justify-between pt-8">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            onClick={() => onBack(lessonId!)}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            type="button"
            onClick={submitObjectives}
            className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-6 py-2 rounded-full flex items-center gap-2"
          >
            Save & Continue →
          </button>
        </div>
      </div>
    </>
  );
}
