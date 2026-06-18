"use client";

import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { useSearchParams } from "next/navigation";

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
import { getLessonBasicInfo, getLessonBasicInfoToken } from "@/app/lib/lessonContent";

import { getCProgram, getCPrograms, getCProgramSlots, getInvitedProgramSlots } from "@/app/helpers/program";
import { getAvailableSlots } from "@/app/lib/slots";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number | null;
  onNext: (lessonId: number) => void;
  setLessonId: (lessonId: number) => void;
  setBasicInfoSubmitted: (v: boolean) => void;
};

export default function BasicInformationStep({
  form,
  lessonId,
  setLessonId,
  onNext,
  setBasicInfoSubmitted,
}: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = form;

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const isSlotFlow = !!token;

  const activeCurriculum = useCurriculumStore((state) => state.activeCurriculum);
  const { setActiveLesson, clearActiveLesson } = useCurriculumStore();
  const setActiveCurriculum = useCurriculumStore((state) => state.setActiveCurriculum);

  const [lessonTypes, setLessonTypes] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [subPrograms, setSubPrograms] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [slot, setSlot] = useState<any>(null);
  const [educationLevels, setEducationLevels] = useState<any[]>([]);
  const [gradeLevels, setGradeLevels] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [message, setMessage] = useState<any>(null);
  const [slotDetails, setSlotDetails] = useState<any>(null);
    const [info, setInfo] = useState<any>(null);

  // Refs to preserve intended values across the async cascade:
  // programId → subPrograms load → SubProgramId → slots load → slotId
  const pendingSubProgramId = useRef<number | null>(null);
  const pendingSlotId = useRef<number | null>(null);

  const educationLevelId = watch("educationLevelId");
  const gradeLevelId = watch("gradeLevelId");
  const subjectId = watch("subjectId");
  const programId = watch("programId");
  const SubProgramId = watch("SubProgramId");
  const slotId = watch("slotId");

  /* ---------------- LOAD EDIT DATA ---------------- */
  useEffect(() => {
    if (!lessonId) return;

    getLessonBasicInfo(lessonId).then(async (res) => {
      const d = res.data;
      console.log(d);
      setInfo(d);

      // Capture the dependent values in refs BEFORE setting programId,
      // which will trigger the cascade and may wipe them via reset effects.
      pendingSubProgramId.current = d.SubProgramId ?? null;
      pendingSlotId.current = d.slotId ?? null;

      form.setValue("name", d.name);
      form.setValue("description", d.description);
      form.setValue("requirements", d.requirements);
      form.setValue("lessonTypeId", d.lessonTypeId);
      form.setValue("programId", d.programId);       // triggers subPrograms fetch
      form.setValue("SubProgramId", d.subProgramId); // may be overwritten — saved in ref
      form.setValue("educationLevelId", d.educationLevelId);
      form.setValue("gradeLevelId", d.gradeLevelId);
      form.setValue("subjectId", d.subjectId);
      form.setValue("topicId", d.topicId);
      form.setValue("Date", d.date);
      form.setValue("start", d.start.slice(0, 16));
      form.setValue("end", d.end.slice(0, 16));

      await setLessonId(d.id);
      await setActiveLesson(d);
    });
  }, [lessonId]);

  /* ---------------- SLOT PREFILL ---------------- */
  useEffect(() => {
    if (!token) return;

    getLessonBasicInfoToken(token).then(async (res) => {
      const d = res.data;
        setInfo(d);
      form.setValue("name", d.name);
      form.setValue("description", d.description);
      form.setValue("requirements", d.requirements);
      form.setValue("lessonTypeId", d.lessonTypeId);
      form.setValue("programId", d.programId);
      form.setValue("SubProgramId", d.subProgramId);
      form.setValue("educationLevelId", d.educationLevelId);
      form.setValue("gradeLevelId", d.gradeLevelId);
      form.setValue("subjectId", d.subjectId);
      form.setValue("topicId", d.topicId);
      form.setValue("Date", d.date);
      form.setValue("start", d.start);
      form.setValue("end", d.end);
      await setLessonId(d.id);
      await setActiveLesson(d);
    });

    const fetchSlot = async () => {
      try {
        const res = await getInvitedProgramSlots({ token });
        const slot = res.data;
        console.log("Fetched slot details:", slot);

        setSlotDetails(slot);

        setValue("educationLevelId", slot.educationLevelId);
        setValue("gradeLevelId", slot.gradeLevelId);
        setValue("subjectId", slot.subjectId);
        setValue("programId", slot.programId);

        await setActiveCurriculum({
          id: slot.curriculumId,
          name: slot.curriculum,
          acronym: slot.curriculum,
        });

        setValue("Date", slot.slotDate);
        setValue("start", slot.startTime);
        setValue("end", slot.endTime);
      } catch (err) {
        console.error("Failed to fetch slot details");
      }
    };

    fetchSlot();
  }, [token, setValue]);

  /* ---------------- BASE LOOKUPS ---------------- */
  useEffect(() => {
    if (!activeCurriculum?.id) return;

    Promise.all([
      getLessonTypes(),
      getCPrograms({ curriculumId: activeCurriculum.id }),
      getEducationLevels({ curriculumId: activeCurriculum.id }),
    ]).then(([lt, pr, el]) => {
      setLessonTypes(lt);
      console.log(pr);
      setPrograms(pr);
      setEducationLevels(el);
    });
  }, [activeCurriculum]);

  /* ---------------- DEPENDENT LOOKUPS ---------------- */

  // Slot flow: re-apply programId once programs list is ready
  useEffect(() => {
    if (!isSlotFlow || !slotDetails || !programs.length) return;
    setValue("programId", slotDetails.programId);
  }, [programs, slotDetails, isSlotFlow]);

  useEffect(() => {
    if (!educationLevelId || !activeCurriculum?.id) {
      setGradeLevels([]);
      if (!isSubmitted && !isSlotFlow) {
        setValue("gradeLevelId", null);
      }
      return;
    }

    getGradeLevels({
      curriculumId: activeCurriculum.id,
      educationLevelId,
    }).then(setGradeLevels);
  }, [educationLevelId, activeCurriculum]);

  useEffect(() => {
    if (!gradeLevelId || !activeCurriculum?.id) {
      setSubjects([]);
      if (!isSubmitted && !isSlotFlow) {
        setValue("subjectId", null);
      }
      return;
    }

    getSubjects({
      curriculumId: activeCurriculum.id,
      gradeLevelId,
    }).then(setSubjects);
  }, [gradeLevelId, activeCurriculum]);

  useEffect(() => {
    if (!subjectId || !activeCurriculum?.id) {
      setTopics([]);
      if (!isSubmitted && !isSlotFlow) {
        setValue("topicId", null);
      }
      return;
    }

    getTopics({
      curriculumId: activeCurriculum.id,
      subjectId,
    }).then(setTopics);
  }, [subjectId, activeCurriculum]);

  // Fetch subPrograms when programId changes
  useEffect(() => {
    if (!programId || !activeCurriculum?.id) return;

    // alert(programId)

    getCProgram(programId).then((data) => {
      const subs = data?.data?.subPrograms || [];
      setSubPrograms(subs);
    });
  }, [programId, activeCurriculum]);

  // Once subPrograms are loaded, restore the pending SubProgramId (edit mode)
  // or fall back to whatever is currently in the form
  useEffect(() => {
          
    if (!subPrograms.length) return;

    

    const target = pendingSubProgramId.current ?? watch("SubProgramId");
    if (target) {

      setValue("SubProgramId", target, { shouldValidate: false });
      // Don't clear pendingSubProgramId yet — the SubProgramId watch
      // below needs to fire to trigger the slots fetch
    }
  }, [subPrograms]);

  // Fetch slots when SubProgramId changes
  useEffect(() => {
    if (!SubProgramId) return;

    // Now safe to clear — slots fetch is in motion
    pendingSubProgramId.current = null;

    getAvailableSlots({ id: SubProgramId.toString() }).then((data) => {
      setSlots(data?.data || []);
    });
  }, [SubProgramId]);

  // Once slots are loaded, restore the pending slotId (edit mode)
  // or fall back to whatever is currently in the form
  useEffect(() => {
    if (!slots.length) return;

    const target = pendingSlotId.current ?? watch("slotId");
    if (target) {
      setValue("slotId", target, { shouldValidate: false });
      pendingSlotId.current = null; // fully resolved
    }
  }, [slots]);

  // When slotId changes (user picks a slot manually), populate date/time fields
  useEffect(() => {
    if (!slotId || !activeCurriculum?.id) return;

    const selectedSlot = slots.find((s) => s.id === slotId);
    if (!selectedSlot) return;

    setValue("Date", selectedSlot.slotDate);
    setValue("start", selectedSlot.startTime);
    setValue("end", selectedSlot.endTime);
  }, [slotId, activeCurriculum]);

  /* ---------------- SUBMIT ---------------- */
  const submitBasicInfo = async (data: AddLessonForm) => {
    const res = await fetch("/api/lesson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lessonId: lessonId || null,
        token: token,
        lessonTypeId: data.lessonTypeId,
        curriculumId: activeCurriculum?.id,
        subjectId: data.subjectId,
        gradeLevelId: data.gradeLevelId,
        educationLevelId: data.educationLevelId,
        topicId: data.topicId,
        programId: data.programId,
        SubProgramId: data.SubProgramId,
        SlotId: data.slotId,
        name: data.name,
        description: data.description,
        Date: data.Date,
        start: data.start,
        end: data.end,
      }),
    });

    const result = await res.json();
    setMessage(result?.message);

    const lessonId_new = result?.data?.id;
    if (!lessonId_new) return;

    await setActiveLesson(result?.data);
    await setLessonId(lessonId_new);
    setBasicInfoSubmitted(true);
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <PageHeader
        title="Basic Information"
        description="Add basic information about your lesson"
      />

      {isSlotFlow && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-md text-sm">
          This lesson is based on an assigned slot. Some fields are locked.
        </div>
      )}

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
              />
            )}
          />
        </FormField>

        <div className="col-span-2">
          <FormField label="Lesson Description">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextArea {...field} placeholder="Enter description..." />
              )}
            />
          </FormField>
        </div>

        <div className="col-span-2 ">
          <FormField label="Program">
            <Controller
              name="programId"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={programs.map((p) => ({
                    label: p.programName,
                    value: p.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                  disabled={isSlotFlow}
                />
              )}
            />
          </FormField>

          <FormField label="SubProgram">
            <Controller
              name="SubProgramId"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={subPrograms.map((p) => ({
                    label: p.name,
                    value: p.id.toString(),
                  }))}
                  onChange={(v) => field.onChange(Number(v))}
                  disabled={isSlotFlow}
                />
              )}
            />
          </FormField>

          <FormField label="Slot">
            <Controller
              name="slotId"
              control={control}
              render={({ field }) => (
                <SelectInput
                  value={field.value?.toString()}
                  options={slots.map((p) => ({
                    label: `${p.slotDate} => ${p.startTime} - ${p.endTime}`,
                    value: p.id.toString(),
                  }))}
                  onChange={(v) => {
                    const selectedSlot = slots.find(
                      (s) => s.id.toString() === v
                    );
                    field.onChange(Number(v));
                    setSlot(selectedSlot);
                  }}
                  disabled={isSlotFlow}
                />
              )}
            />
          </FormField>
        </div>

        <FormField label="Education Level">
          <Controller
            name="educationLevelId"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={educationLevels?.map((e) => ({
                  label: e.name,
                  value: e.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                disabled={isSlotFlow}
              />
            )}
          />
        </FormField>

        <FormField label="Grade Level">
          <Controller
            name="gradeLevelId"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={gradeLevels?.map((g) => ({
                  label: g.name,
                  value: g.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                disabled={isSlotFlow}
              />
            )}
          />
        </FormField>

        <FormField label="Subject">
          <Controller
            name="subjectId"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={subjects?.map((s) => ({
                  label: s.name,
                  value: s.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                disabled={isSlotFlow}
              />
            )}
          />
        </FormField>

        <FormField label="Topic">
          <Controller
            name="topicId"
            control={control}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={topics?.map((t) => ({
                  label: t.name,
                  value: t.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
              />
            )}
          />
        </FormField>

        <div className="col-span-2">
          <FormField label="Lesson Date">
            <TextInput
              type="date"
              {...register("Date")}
              readOnly={true}
            />
          </FormField>
        </div>

        <FormField label="Start Time">
          <TextInput
            type="time"
            {...register("start")}
            readOnly={true}
          />
        </FormField>

        <FormField label="End Time">
          <TextInput
            type="time"
            {...register("end")}
            readOnly={true}
          />
        </FormField>

        <div className="col-span-2 flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            {isSubmitting ? "Saving..." : "Next"}
          </button>
        </div>
      </form>
    </>
  );
}