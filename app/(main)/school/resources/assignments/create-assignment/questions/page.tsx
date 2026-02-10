"use client";

import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import React, { useEffect, useState } from "react";
import { UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { AddResourceForm } from "../page";
import { Plus, Trash2, Copy, Eye } from "lucide-react";

import {
  LookupItem,
  getEducationLevels,
  getGradeLevels,
  getSubjects,
  getTopics,
} from "@/app/helpers/lookups";
import {
  getAssignment,
  addAssigment,
  UpdateAssigment,
} from "@/app/lib/assignment";
import { useAssignmentStore } from "@/app/store/useAssignmentStore";

type Props = {
  form: UseFormReturn<AddResourceForm>;
  id?: number | null;
  ResourceType: string;
  onBack: (id: number) => void;
  setId: (id: number) => void;
};

function ResourceQuestions({ form, id, setId, onBack, ResourceType }: Props) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const {
    fields: sections,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "sections",
  });

  const [loadingAssignment, setLoadingAssignment] = useState(false);
  const { setActiveAssignment } = useAssignmentStore();

  /* ================= LOAD ASSIGNMENT FOR EDIT ================= */
  useEffect(() => {
    if (!id) return;

    setLoadingAssignment(true);

    getAssignment(id)
      .then((res) => {
        const assignment = res.data;

        reset({
          name: assignment.title,
          description: assignment.description,
          sections: assignment.sections.map((section: any) => ({
            title: section.title,
            questions: section.questions.map((q: any) => ({
              text: q.text,
              type: q.questionType,
              educationLevelId: q.educationLevelId?.toString() ?? "",
              gradeLevelId: q.gradeLevelId?.toString() ?? "",
              subjectId: q.subjectId?.toString() ?? "",
              topicId: q.topicId?.toString() ?? "",
              correctAnswerIndex:
                q.options.findIndex((o: any) => o.isCorrect)?.toString() ??
                null,
              options: q.options.map((o: any) => ({ text: o.optionText })),
            })),
          })),
        });
      })
      .catch(() => alert("Failed to load " + ResourceType))
      .finally(() => setLoadingAssignment(false));
  }, [id, reset]);

  /* ================= SUBMIT ================= */
  const onSubmit = async (data: AddResourceForm) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        type: ResourceType,
        sections: data.sections.map((section) => ({
          title: section.title,
          questions: section.questions.map((question) => ({
            text: question.text,
            type: question.type,
            options:
              question.type === "true_false"
                ? [{ text: "True" }, { text: "False" }]
                : question.options?.map((o) => ({ text: o.text })) || [],
            correctAnswerIndex: question.correctAnswerIndex,
            educationLevelId: question.educationLevelId,
            gradeLevelId: question.gradeLevelId,
            subjectId: question.subjectId,
            topicId: question.topicId,
          })),
        })),
      };

      if (id) {
        await UpdateAssigment(payload as AddResourceForm, id);
        alert(ResourceType + " updated successfully");
      } else {
        const result = await addAssigment(payload as AddResourceForm);
        alert(ResourceType + " created successfully");
        setId(result.data.id);
        setActiveAssignment(result.data);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to save " + ResourceType);
    }
  };

  if (loadingAssignment) return <p className="p-6">Loading assignment...</p>;

  return (
    <>
      <GeneralBreadcrumb
        items={[
          { label: "Resource Management", href: "/school/resources" },
          { label: "Assignments", href: "/school/resources" },
          {
            label: id ? "Edit " + ResourceType : "Create " + ResourceType,
            href: "/school/resources/assignments",
          },
        ]}
      />

      <PageHeader
        title="Questions"
        description="Add questions to this resource"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Questions</h2>
          <button
            type="button"
            className="flex items-center gap-2 border px-3 py-1.5 rounded-md text-sm"
          >
            <Eye size={16} /> Preview
          </button>
        </div>

        {sections.map((section, sectionIndex) => (
          <SectionBlock
            key={section.id}
            sectionIndex={sectionIndex}
            control={control}
            register={register}
            removeSection={remove}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              title: "",
              questions: [
                { text: "", type: "", options: [], correctAnswerIndex: null },
              ],
            })
          }
          className="flex items-center gap-2 text-blue-600 text-sm"
        >
          <Plus size={16} /> Add Section
        </button>

        <div className="flex justify-end gap-3 border-t pt-4">
          <button type="submit" className="px-4 py-2 bg-gray-200 rounded-md">
            Save
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 text-white rounded-md"
            disabled={isSubmitting}
          >
            Save & Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default ResourceQuestions;

/* ================= SECTION BLOCK ================= */

function SectionBlock({ sectionIndex, control, register, removeSection }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions`,
  });

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-white">
      <input
        {...register(`sections.${sectionIndex}.title`)}
        placeholder="Section Title"
        className="w-full border rounded-md px-3 py-2"
      />

      {fields.map((question, questionIndex) => (
        <QuestionBlock
          key={question.id}
          sectionIndex={sectionIndex}
          questionIndex={questionIndex}
          control={control}
          register={register}
          removeQuestion={remove}
        />
      ))}

      <button
        type="button"
        onClick={() =>
          append({ text: "", type: "", options: [], correctAnswerIndex: null })
        }
        className="flex items-center gap-2 text-blue-600 text-sm"
      >
        <Plus size={16} /> Add Question
      </button>

      <button
        type="button"
        onClick={() => removeSection(sectionIndex)}
        className="text-red-600 text-sm"
      >
        Delete Section
      </button>
    </div>
  );
}

/* ================= QUESTION BLOCK ================= */

function QuestionBlock({
  sectionIndex,
  questionIndex,
  control,
  register,
  removeQuestion,
}: any) {
  const questionType = useWatch({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.type`,
  });

  const subjectId = useWatch({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.subjectId`,
  });

  const [educationLevels, setEducationLevels] = useState<LookupItem[]>([]);
  const [gradeLevels, setGradeLevels] = useState<LookupItem[]>([]);
  const [subjects, setSubjects] = useState<LookupItem[]>([]);
  const [topics, setTopics] = useState<LookupItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState({
    education: false,
    grade: false,
    subject: false,
    topic: false,
  });

  useEffect(() => {
    setLoading({ education: true, grade: true, subject: true, topic: false });

    Promise.all([getEducationLevels(), getGradeLevels(), getSubjects()])
      .then(([edu, grades, subs]) => {
        setEducationLevels(edu);
        setGradeLevels(grades);
        setSubjects(subs);
      })
      .catch(() => setError("Failed to load lookup data"))
      .finally(() =>
        setLoading({
          education: false,
          grade: false,
          subject: false,
          topic: false,
        })
      );
  }, []);

  useEffect(() => {
    if (!subjectId) {
      setTopics([]);
      return;
    }

    setLoading((p) => ({ ...p, topic: true }));

    getTopics({ subjectId: Number(subjectId) })
      .then(setTopics)
      .catch(() => setError("Failed to load topics"))
      .finally(() => setLoading((p) => ({ ...p, topic: false })));
  }, [subjectId]);

  return (
    <div className="border rounded-md p-4 space-y-4 bg-white">
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Question Text & Type */}
      <div className="grid md:grid-cols-3 gap-4">
        <textarea
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.text`,
            { required: "Question is required" }
          )}
          placeholder="Type question"
          className="md:col-span-2 border rounded-md px-3 py-2 h-20"
        />
        <select
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.type`,
            { required: "Question type is required" }
          )}
          className="border rounded-md px-3 py-2"
        >
          <option value="">Question Type</option>
          <option value="short_answer">Short Answer</option>
          <option value="multiple_choice">Multiple Choice</option>
          <option value="true_false">True / False</option>
        </select>
      </div>

      {/* Metadata */}
      <div className="grid md:grid-cols-4 gap-4">
        <select
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.educationLevelId`
          )}
          disabled={loading.education}
          className="border rounded-md px-3 py-2"
        >
          <option value="">
            {loading.education ? "Loading..." : "Education Level"}
          </option>
          {educationLevels.map((l) => (
            <option key={l.id} value={String(l.id)}>
              {l.name}
            </option>
          ))}
        </select>

        <select
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.gradeLevelId`
          )}
          disabled={loading.grade}
          className="border rounded-md px-3 py-2"
        >
          <option value="">
            {loading.grade ? "Loading..." : "Grade Level"}
          </option>
          {gradeLevels.map((g) => (
            <option key={g.id} value={String(g.id)}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.subjectId`
          )}
          disabled={loading.subject}
          className="border rounded-md px-3 py-2"
        >
          <option value="">{loading.subject ? "Loading..." : "Subject"}</option>
          {subjects.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.topicId`
          )}
          disabled={!topics.length || loading.topic}
          className="border rounded-md px-3 py-2"
        >
          <option value="">{loading.topic ? "Loading..." : "Topic"}</option>
          {topics.map((t) => (
            <option key={t.id} value={String(t.id)}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      {questionType === "multiple_choice" && (
        <MCQOptions
          control={control}
          register={register}
          sectionIndex={sectionIndex}
          questionIndex={questionIndex}
        />
      )}

      {questionType === "true_false" && (
        <TrueFalseOptions
          register={register}
          sectionIndex={sectionIndex}
          questionIndex={questionIndex}
        />
      )}

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" className="p-2 border rounded-md">
          <Copy size={16} />
        </button>
        <button
          type="button"
          onClick={() => removeQuestion(questionIndex)}
          className="p-2 border rounded-md text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}

/* ================= MCQ OPTIONS ================= */

function MCQOptions({ control, register, sectionIndex, questionIndex }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.questions.${questionIndex}.options`,
  });

  return (
    <div className="ml-4 border-l pl-4 space-y-2">
      <p className="text-sm font-medium">Options (select correct)</p>
      {fields.map((option, index) => (
        <div key={option.id} className="flex gap-2 items-center">
          <input
            type="radio"
            value={index}
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.correctAnswerIndex`
            )}
          />
          <input
            {...register(
              `sections.${sectionIndex}.questions.${questionIndex}.options.${index}.text`
            )}
            placeholder={`Option ${index + 1}`}
            className="flex-1 border rounded-md px-3 py-2"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ text: "" })}
        className="text-blue-600 text-sm"
      >
        <Plus size={14} /> Add Option
      </button>
    </div>
  );
}

/* ================= TRUE/FALSE OPTIONS ================= */

function TrueFalseOptions({ register, sectionIndex, questionIndex }: any) {
  return (
    <div className="ml-4 border-l pl-4 space-y-2">
      <p className="text-sm font-medium">Select correct answer</p>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value={0}
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.correctAnswerIndex`
          )}
        />
        True
      </label>

      <label className="flex items-center gap-2">
        <input
          type="radio"
          value={1}
          {...register(
            `sections.${sectionIndex}.questions.${questionIndex}.correctAnswerIndex`
          )}
        />
        False
      </label>
    </div>
  );
}
