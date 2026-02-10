"use client";

import { use, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";

import LessonMenu from "../components/LessonMenu";
import Breadcrumb from "@/app/components/ui/navigation/Breadcrumb";

import BasicInformationStep from "./steps/BasicInformationStep";
import { LearningObjectivesStep } from "./steps/LearningObjectivesStep";
import { LessonRequirementsStep } from "./steps/LessonRequirementsStep";
import { LessonContentStep } from "./steps/LessonContentStep";
import { PricingStep } from "./steps/PricingStep";
import { ReviewPublishStep } from "./steps/ReviewPublishStep";
import { LessonSection } from "@/app/lib/lessonContent";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";

export type AddLessonForm = {
  name: string;
  description: string;
  requirements?: string;
  lessonTypeId: number | null;
  programId: number | null;
  subjectId: number | null;
  teacherId: number | null;
  topicId: number | null;
  educationLevelId: number | null;
  gradeLevelId: number | null;
  start: string;
  end: string;
  price: number;
  objectives: string[];
  lessonContent: LessonSection[];
};

export default function CreateLessonPage() {
  const [step, setStep] = useState(1);
  const { activeLesson } = useCurriculumStore();
  const [basicInfoSubmitted, setBasicInfoSubmitted] = useState(false);

  const [lessonId, setLessonId] = useState<number | null>(
    activeLesson?.id ?? null
  );

  useEffect(() => {
    setLessonId(activeLesson?.id ?? null);
  }, [activeLesson?.id]);

  useEffect(() => {
    if (step === 1 && lessonId !== null && basicInfoSubmitted) {
      setStep(2);
      setBasicInfoSubmitted(false); // reset
    }
  }, [lessonId, basicInfoSubmitted, step]);

  useEffect(() => {
    if (step === 1 && lessonId !== null) {
      setStep(2);
    }
  }, [lessonId]);

  // alert(activeLesson?.id);
  const form = useForm<AddLessonForm>({
    defaultValues: {
      lessonTypeId: null,
      programId: null,
      subjectId: null,
      topicId: null,
      educationLevelId: null,
      gradeLevelId: null,
    },
  });

  const steps = [
    "Basic Information",
    "Learning Objectives",
    "Lesson Requirements",
    "Lesson Content",
    "Pricing",
    "Review & Publish",
  ];

  /* ---------------------------------------
     Navigation Guards
  --------------------------------------- */
  const canNavigateToStep = (targetStep: number) => {
    if (targetStep === 1) return true;
    return lessonId !== null;
  };

  const goToStep = (targetStep: number) => {
    if (!canNavigateToStep(targetStep)) return;
    setStep(targetStep);
  };

  /* ---------------------------------------
     Step Renderer
  --------------------------------------- */
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <BasicInformationStep
            form={form}
            lessonId={lessonId}
            setBasicInfoSubmitted={setBasicInfoSubmitted}
            setLessonId={setLessonId}
            onNext={goToStep}
          />
        );

      case 2:
        return (
          <LearningObjectivesStep
            form={form}
            lessonId={lessonId!}
            onNext={() => goToStep(3)}
            onBack={() => goToStep(1)}
          />
        );

      case 3:
        return (
          <LessonRequirementsStep
            form={form}
            lessonId={lessonId!}
            onNext={() => goToStep(4)}
            onBack={() => goToStep(2)}
          />
        );

      case 4:
        return (
          <LessonContentStep
            form={form}
            lessonId={lessonId!}
            onNext={() => goToStep(5)}
            onBack={() => goToStep(3)}
          />
        );

      case 5:
        return (
          <PricingStep
            form={form}
            lessonId={lessonId!}
            onNext={() => goToStep(6)}
            onBack={() => goToStep(4)}
          />
        );

      case 6:
        return (
          <ReviewPublishStep
            form={form}
            lessonId={lessonId!}
            onBack={() => goToStep(5)}
            onNext={function (lessonId: number): void {
              throw new Error("Function not implemented.");
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <LessonMenu
        title={activeLesson?.id ? "Update Lesson" : "Create Lesson"}
        steps={steps}
        currentStep={step}
        lessonId={lessonId}
        onStepClick={goToStep}
      />

      {/* Main Content */}
      <div className="flex-1">
        <Breadcrumb />
        <div className="p-6">{renderStep()}</div>
      </div>
    </div>
  );
}
