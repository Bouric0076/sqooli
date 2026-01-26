"use client";

import { useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { FormField } from "@/app/components/ui/form/FormField";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { TextArea } from "@/app/components/ui/form/TextArea";

import {
  getEducationLevels,
  getGradeLevels,
  getPrograms,
  getSubjects,
  getTopics,
  getLessonTypes,
} from "@/app/helpers/lookups";

import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { AddLessonForm } from "../page";
import { log } from "console";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  onNext: (lessonId: number) => void;
  setLessonId: (lessonId: number) => void;
};

export default function BasicInformationStep({
  form,
  setLessonId,
  onNext,
}: Props) {
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

  const [lessonTypes, setLessonTypes] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);
  const [message, setMessage] = useState<any[]>([]);

  const educationLevelId = watch("educationLevelId");
  const gradeLevelId = watch("gradeLevelId");
  const subjectId = watch("subjectId");

  /* ---------------- BASE LOOKUPS ---------------- */

  useEffect(() => {
    if (!activeCurriculum?.id) return;

    Promise.all([
      getLessonTypes(),
      getPrograms({ curriculumId: activeCurriculum.id }),
      getEducationLevels({ curriculumId: activeCurriculum.id }),
    ]).then(([lt, pr, el]) => {
      setLessonTypes(lt);
      setPrograms(pr);
      setEducationLevels(el);
    });
  }, [activeCurriculum]);

  /* ---------------- DEPENDENT LOOKUPS ---------------- */

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

  /* ---------------- SUBMIT STEP ---------------- */

  const submitBasicInfo = async (data: AddLessonForm) => {
    // console.log(data);
    // return;
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

    console.log(result);

    setMessage(result?.message);
    const lessonId = result?.data?.id;

    // ✅ HARD GUARD
    // if (!lessonId || Number.isNaN(lessonId)) {
    //   throw new Error("Lesson ID not returned from server");
    // }
    setLessonId(lessonId);
    // ✅ Only now do we move forward
    onNext(2);
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <PageHeader
        title="Basic Information"
        description="Add basic information about your lesson"
      />
      {message}

      <form
        onSubmit={handleSubmit(submitBasicInfo)}
        className="grid grid-cols-2 gap-4 p-8"
      >
        <FormField label="Lesson Name" error={errors.name?.message}>
          <TextInput
            placeholder="Enter Lesson name"
            {...register("name", { required: "Lesson name is required" })}
          />
        </FormField>

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

        <div className="col-span-2">
          <FormField
            label="Lesson Description"
            error={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
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
            rules={{ required: "Grade Level is required" }}
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
            control={control}
            rules={{ required: "Subject is required" }}
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
        <div className="col-span-2">
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
        </div>

        <FormField label="Start Time" error={errors.start?.message}>
          <TextInput
            type="datetime-local"
            {...register("start", { required: "Start time is required" })}
          />
        </FormField>

        <FormField label="End Time" error={errors.end?.message}>
          <TextInput
            type="datetime-local"
            {...register("end", { required: "End time is required" })}
          />
        </FormField>
        {/* ACTIONS */}
        <div className="col-span-2">
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
            >
              {isSubmitting ? "Saving..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
