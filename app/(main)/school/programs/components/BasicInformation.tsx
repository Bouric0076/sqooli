"use client";

import { FC, useEffect, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";

import { Label } from "./Primitives";
import { MultiSelect } from "./Select";
import {
  getEducationLevels,
  getGradeLevels,
  getSubjects,
} from "@/app/helpers/lookups";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { SelectInput } from "@/app/components/ui/form/SelectInput";

interface BasicInformationProps {
  form: UseFormReturn<any>;
}

export const BasicInformation: FC<BasicInformationProps> = ({ form }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitted },
  } = form;

  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [allSubjects, setAllSubjects] = useState<any[]>([]);

  const subjects = watch("subjects") || [];
  const grades = watch("grades") || [];

  const curriculumId = watch("curriculumId");
  const educationLevelId = watch("educationLevelId");

  /* ---------------- REGISTER CUSTOM FIELDS ---------------- */
  useEffect(() => {
    form.register("grades", {
      validate: (value) =>
        value && value.length > 0 ? true : "At least one grade is required",
    });

    form.register("subjects", {
      validate: (value) =>
        value && value.length > 0 ? true : "At least one subject is required",
    });
  }, [form]);

  /* ---------------- EDUCATION LEVELS ---------------- */
  useEffect(() => {
    if (!curriculumId) {
      setEducationLevels([]);
      return;
    }

    const loadEducationLevels = async () => {
      try {
        const res = await getEducationLevels({ curriculumId });
        setEducationLevels(res || []);
      } catch (err) {
        console.error("Failed to load education levels", err);
      }
    };

    loadEducationLevels();
  }, [curriculumId]);

  /* ---------------- EDUCATION → GRADE ---------------- */
  useEffect(() => {
    if (!educationLevelId || !curriculumId) {
      setGradeLevels([]);

      if (!isSubmitted) {
        setValue("grades", []);
      }

      return;
    }

    const loadGrades = async () => {
      try {
        const res = await getGradeLevels({
          curriculumId,
          educationLevelId,
        });

        setGradeLevels(res || []);
      } catch (err) {
        console.error("Failed to load grade levels", err);
      }
    };

    loadGrades();
  }, [educationLevelId, curriculumId, isSubmitted, setValue]);

  /* ---------------- GRADE + EDUCATION → SUBJECT ---------------- */
  useEffect(() => {
    if (!curriculumId || !educationLevelId || grades.length === 0) {
      setAllSubjects([]);

      if (!isSubmitted) {
        setValue("subjects", [], { shouldValidate: true });
      }

      return;
    }

    const loadSubjects = async () => {
      try {
        // 🔥 Supports backend that accepts multiple grades
        const res = await getSubjects({
          curriculumId,
          educationLevelId,
          gradeIds: grades,
        });

        setAllSubjects(res || []);
      } catch (err) {
        console.error("Failed to load subjects", err);
      }
    };

    loadSubjects();
  }, [curriculumId, educationLevelId, grades, isSubmitted, setValue]);

  /* ---------------- REMOVE STALE SUBJECTS ---------------- */
  useEffect(() => {
    if (!subjects.length || !allSubjects.length) return;

    const validIds = new Set(allSubjects.map((s) => s.id));

    const filtered = subjects.filter((id: number) =>
      validIds.has(id)
    );

    if (filtered.length !== subjects.length) {
      setValue("subjects", filtered, { shouldValidate: true });
    }
  }, [allSubjects, subjects, setValue]);

  return (
    <>
      <h2
        style={{
          margin: "0 0 4px",
          fontSize: 22,
          fontWeight: 700,
          color: "#111827",
        }}
      >
        Basic Information
      </h2>

      <p
        style={{
          margin: "0 0 26px",
          fontSize: 14,
          color: "#6b7280",
        }}
      >
        Add basic information about your resource
      </p>

      {/* Sub Program */}
      <div style={{ marginBottom: 20 }}>
        <FormField
          label="Sub-Program"
          error={errors.subProgram?.message}
        >
          <TextInput
            placeholder="Enter Sub-Program name"
            {...register("subProgram", {
              required: "Sub-Program name is required",
            })}
          />
        </FormField>
      </div>

      {/* Education + Grades */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ flex: 1 }}>
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
                  value={field.value ? field.value.toString() : ""}
                  options={educationLevels.map((e) => ({
                    label: e.name,
                    value: e.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                />
              )}
            />
          </FormField>
        </div>

        {/* Grades */}
        <div style={{ flex: 1 }}>
          <Label>Grade(s)</Label>

          <MultiSelect
            options={gradeLevels.map((s) => s.name)}
            selected={grades
              .map(
                (id: number) =>
                  gradeLevels.find((s) => s.id === id)?.name
              )
              .filter(Boolean)}
            onAdd={(name) => {
              const grade = gradeLevels.find((s) => s.name === name);
              if (!grade) return;

              if (!grades.includes(grade.id)) {
                setValue("grades", [...grades, grade.id], {
                  shouldValidate: true,
                });
              }
            }}
            onRemove={(name) => {
              const grade = gradeLevels.find((s) => s.name === name);
              if (!grade) return;

              setValue(
                "grades",
                grades.filter((id: number) => id !== grade.id),
                { shouldValidate: true }
              );
            }}
          />

          {errors.grades && (
            <p style={{ color: "red", fontSize: 12 }}>
              {errors.grades.message as string}
            </p>
          )}
        </div>
      </div>

      {/* Subjects */}
      <div style={{ marginBottom: 20 }}>
        <Label>Subject(s)</Label>

        <MultiSelect
          options={allSubjects.map((s) => s.name)}
          selected={subjects
            .map(
              (id: number) =>
                allSubjects.find((s) => s.id === id)?.name
            )
            .filter(Boolean)}
          onAdd={(name) => {
            const subject = allSubjects.find((s) => s.name === name);
            if (!subject) return;

            if (!subjects.includes(subject.id)) {
              setValue("subjects", [...subjects, subject.id], {
                shouldValidate: true,
              });
            }
          }}
          onRemove={(name) => {
            const subject = allSubjects.find((s) => s.name === name);
            if (!subject) return;

            setValue(
              "subjects",
              subjects.filter((id: number) => id !== subject.id),
              { shouldValidate: true }
            );
          }}
        />

        {errors.subjects && (
          <p style={{ color: "red", fontSize: 12 }}>
            {errors.subjects.message as string}
          </p>
        )}
      </div>

      {/* Dates */}
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <FormField
            label="Program Start Date"
            error={errors.startDate?.message}
          >
            <TextInput
              type="date"
              {...register("startDate", {
                required: "Start date is required",
              })}
            />
          </FormField>
        </div>

        <div style={{ flex: 1 }}>
          <FormField
            label="Program End Date"
            error={errors.endDate?.message}
          >
            <TextInput
              type="date"
              {...register("endDate", {
                required: "End date is required",
              })}
            />
          </FormField>
        </div>
      </div>
    </>
  );
};