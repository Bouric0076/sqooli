"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";

import MyModal from "@/app/components/general/modals/MyModal";
import { FormField } from "@/app/components/ui/form/FormField";
import { PrimaryButton } from "@/app/components/ui/form/PrimaryButton";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { TextInput } from "@/app/components/ui/form/TextInput";

import {
  getEducationLevels,
  getGradeLevels,
  getPrograms,
  getSubjects,
  getTopics,
  getLessonTypes,
} from "@/app/helpers/lookups";

import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { useRouter } from "next/navigation";

/* ---------------- TYPES ---------------- */

type AddLessonForm = {
  name: string;
  description: string;
  lessonTypeId: number | null;
  programId: number | null;
  subjectId: number | null;
  topicId: number | null;
  educationLevelId: number | null;
  gradeLevelId: number | null;
  start: string;
  end: string;
};

/* ---------------- COMPONENT ---------------- */

export default function AddLessonModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [lessonTypes, setLessonTypes] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const router = useRouter();

  const activeCurriculum = useCurriculumStore(
    (state) => state.activeCurriculum
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddLessonForm>({
    defaultValues: {
      lessonTypeId: null,
      programId: null,
      subjectId: null,
      topicId: null,
      educationLevelId: null,
      gradeLevelId: null,
    },
  });

  const educationLevelId = watch("educationLevelId");
  const gradeLevelId = watch("gradeLevelId");
  const subjectId = watch("subjectId");

  /* ---------------- LOAD BASE LOOKUPS ---------------- */

  useEffect(() => {
    if (!open || !activeCurriculum?.id) return;

    Promise.all([
      getLessonTypes(),
      getPrograms({ curriculumId: activeCurriculum.id }),
      getEducationLevels({ curriculumId: activeCurriculum.id }),
    ])
      .then(([lessonTypes, programs, educationLevels]) => {
        setLessonTypes(lessonTypes);
        setPrograms(programs);
        setEducationLevels(educationLevels);
      })
      .catch(() => setError("Failed to load lookups"));
  }, [open, activeCurriculum]);

  /* ---------------- LOAD GRADE LEVELS ---------------- */

  useEffect(() => {
    if (!educationLevelId || !activeCurriculum?.id) {
      setGradeLevels([]);
      setValue("gradeLevelId", null);
      return;
    }

    getGradeLevels({
      curriculumId: activeCurriculum.id,
      educationLevelId,
    }).then(setGradeLevels);
  }, [educationLevelId, activeCurriculum, setValue]);

  /* ---------------- LOAD SUBJECTS ---------------- */

  useEffect(() => {
    if (!gradeLevelId || !activeCurriculum?.id) {
      setSubjects([]);
      setValue("subjectId", null);
      return;
    }

    getSubjects({
      curriculumId: activeCurriculum.id,
      gradeLevelId,
    }).then(setSubjects);
  }, [gradeLevelId, activeCurriculum, setValue]);

  /* ---------------- LOAD TOPICS ---------------- */

  useEffect(() => {
    if (!subjectId || !activeCurriculum?.id) {
      setTopics([]);
      setValue("topicId", null);
      return;
    }

    getTopics({
      curriculumId: activeCurriculum.id,
      subjectId,
    }).then(setTopics);
  }, [subjectId, activeCurriculum, setValue]);

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: AddLessonForm) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonTypeId: data.lessonTypeId,
          curriculumId: activeCurriculum?.id,
          subjectId: data.subjectId,
          gradeLevelId: data.gradeLevelId,
          educationLevelId: data.educationLevelId,
          topicId: data.topicId,
          programId: data.programId,
          name: data.name,
          description: data.description,
          start: data.start,
          end: data.end,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setSuccess("Lesson created successfully");
      reset();

      setTimeout(() => setOpen(false), 1200);
    } catch (err: any) {
      setError(err.message || "Failed to create lesson");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-800">Lessons</h1>

        <button
          type="button"
          //   onClick={() => setOpen(true)}
          onClick={() =>
            router.push("/school/curriculum/cbc/lessons/create-lesson")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Lesson
        </button>
      </div>

      <MyModal
        title="Create Lesson"
        description="Add a new lesson"
        open={open}
        onClose={() => setOpen(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-4"
        >
          <div className="col-span-2">
            <FormField label="Lesson Name" error={errors.name?.message}>
              <TextInput
                placeholder="Enter Lesson name"
                {...register("name", { required: "Lesson name is required" })}
              />
            </FormField>
          </div>

          <FormField label="Lesson Type" error={errors.lessonTypeId?.message}>
            <Controller
              name="lessonTypeId"
              control={control}
              rules={{ required: "Lesson type is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={lessonTypes.map((l) => ({
                    label: l.name,
                    value: l.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                  placeholder="Select lesson type"
                />
              )}
            />
          </FormField>

          <FormField label="Program" error={errors.programId?.message}>
            <Controller
              name="programId"
              control={control}
              rules={{ required: "Program is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={programs.map((p) => ({
                    label: p.name,
                    value: p.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>

          <FormField
            label="Education Level"
            error={errors.educationLevelId?.message}
          >
            <Controller
              name="educationLevelId"
              control={control}
              rules={{ required: "Education Level is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={educationLevels.map((e) => ({
                    label: e.name,
                    value: e.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>

          <FormField label="Grade Level" error={errors.gradeLevelId?.message}>
            <Controller
              name="gradeLevelId"
              control={control}
              rules={{ required: "Grade is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={gradeLevels.map((g) => ({
                    label: g.name,
                    value: g.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>

          <FormField label="Subject" error={errors.subjectId?.message}>
            <Controller
              name="subjectId"
              rules={{ required: "Subject is required" }}
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={subjects.map((s) => ({
                    label: s.name,
                    value: s.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>

          <FormField label="Topic" error={errors.topicId?.message}>
            <Controller
              name="topicId"
              control={control}
              rules={{ required: "Topic is required" }}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={topics.map((t) => ({
                    label: t.name,
                    value: t.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>

          <FormField label="Start" error={errors.start?.message}>
            <TextInput
              type="datetime-local"
              {...register("start", { required: "Start time is required" })}
            />
          </FormField>

          <FormField label="End" error={errors.end?.message}>
            <TextInput
              type="datetime-local"
              {...register("end", { required: "End time is required" })}
            />
          </FormField>

          <div className="col-span-2">
            <FormField
              label="Requirements/Description"
              error={errors.description?.message}
            >
              <Controller
                name="description"
                rules={{ required: "Requirements/Description is required" }}
                control={control}
                render={({ field }) => (
                  <TextArea
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter lesson description..."
                  />
                )}
              />
            </FormField>
          </div>

          <div className="col-span-2 flex justify-end">
            <PrimaryButton disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Create Lesson"}
            </PrimaryButton>
          </div>
        </form>
      </MyModal>
    </>
  );
}
