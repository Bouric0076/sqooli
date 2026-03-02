"use client";
import { AddLessonForm } from "@/app/(main)/school/curriculum/[c_type]/lessons/create-lesson/page";
import { FormField } from "@/app/components/ui/form/FormField";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { TextInput } from "@/app/components/ui/form/TextInput";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import {
  getLessonTypes,
  getPrograms,
  getEducationLevels,
  getGradeLevels,
  getSubjects,
  getTopics,
} from "@/app/helpers/lookups";
import { getLessonBasicInfo } from "@/app/lib/lessonContent";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import React, { useEffect, useState } from "react";
import { UseFormReturn, Controller } from "react-hook-form";
import { AddResourceForm } from "../page";
import GeneralBreadcrumb from "@/app/components/ui/navigation/GeneralBreadcrumb";
import { useAssignmentStore } from "@/app/store/useAssignmentStore";

type Props = {
  form: UseFormReturn<AddResourceForm>;
  id?: number | null;
  ResourceType: string;
  onNext: (id: number) => void;
};

function ResourceBasicInfo({ form, id, onNext, ResourceType }: Props) {
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

  const [message, setMessage] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { activeAssignment } = useAssignmentStore();
  useEffect(() => {
    if (activeAssignment) {
      setValue("name", activeAssignment.title ?? "");
      setValue("description", activeAssignment.description ?? "");
    }
  }, [activeAssignment, setValue]);

  /* ---------------- SUBMIT STEP ---------------- */

  const submitBasicInfo = async (data: AddResourceForm) => {
    console.log(data);

    onNext(2);
  };

  //breadcrumb items
  const resourceRoutes: Record<string, string> = {
    Assignment: "/school/resources/assignments",
    Quiz: "/school/resources/quizzes",
    Lesson: "/school/resources/lessons",
    Video: "/school/resources/videos",
  };

  const resourceHref = resourceRoutes[ResourceType] ?? "/school/resources";

  /* ---------------- UI ---------------- */

  return (
    <>
      <GeneralBreadcrumb
        items={[
          { label: "Resource Management", href: "/school/resources" },
          { label: ResourceType, href: resourceHref },
          {
            label: id ? `Edit ${ResourceType}` : `Create ${ResourceType}`,
            href: resourceHref,
          },
        ]}
      />
      <PageHeader
        title="Basic Information"
        description="Add basic information about your resource"
      />
      {message}

      <form
        onSubmit={handleSubmit(submitBasicInfo)}
        className="grid grid-cols-2 gap-4 p-8"
      >
        <div className="col-span-2">
          <FormField
            label={`Enter ${ResourceType} Name`}
            error={errors.name?.message}
          >
            <TextInput
              placeholder={`Enter ${ResourceType} Name`}
              {...register("name", {
                required: `${ResourceType} name is required`,
              })}
            />
          </FormField>
        </div>
        <div className="col-span-2">
          <FormField
            label={`${ResourceType} Description`}
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
                  placeholder={`Enter ${ResourceType} description...`}
                />
              )}
            />
          </FormField>
        </div>

        {/* ACTIONS */}
        <div className="col-span-2">
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium"
            >
              {isSubmitting ? "Saving..." : "Save  & Continue"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ResourceBasicInfo;
