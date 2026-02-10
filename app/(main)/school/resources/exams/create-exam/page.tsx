"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useCurriculumStore } from "@/app/store/useCurriculumStore";

import LessonMenu from "../../../curriculum/cbc/lessons/components/LessonMenu";
import { useAssignmentStore } from "@/app/store/useAssignmentStore";
import ResourceBasicInfo from "../../assignments/create-assignment/basicInfo/page";
import ResourceQuestions from "../../assignments/create-assignment/questions/page";

type Question = {
  text: string;
  type: string;
  educationLevelId: number;
  gradeLevelId: number;
  subjectId: number;
  topicId: number;
  options: { text: string }[];
  correctAnswerIndex: number | null;
};

type Section = {
  title: string;
  questions: Question[];
};

export type AddResourceForm = {
  name: string;
  description: string;
  sections: Section[];
};

const ResourceType = "Exam";
export default function CreateAssignmentPage() {
  const [step, setStep] = useState(1);
  const { activeAssignment } = useAssignmentStore();

  const [id, setId] = useState<number | null>(activeAssignment?.id ?? null);

  const form = useForm<AddResourceForm>({
    defaultValues: {
      name: "",
      description: "",
      sections: [],
    },
  });

  // Sync id state if activeAssignment changes (e.g., on edit load)
  useEffect(() => {
    if (activeAssignment?.id && activeAssignment.id !== id) {
      setId(activeAssignment.id);
    }
  }, [activeAssignment?.id, id]);

  const steps = ["Basic Information", "Questions"];

  /* ---------------------------------------
     Navigation Guards
  --------------------------------------- */
  const canNavigateToStep = (targetStep: number) => {
    if (targetStep === 1) return true;
    // return id !== null;
    // console.log(form.getValues().name);
    return form.getValues().name !== ""; // allow navigation for now, but ideally should check if basic info is saved (id exists) before allowing to go to questions step
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
          <ResourceBasicInfo
            ResourceType={ResourceType}
            form={form}
            id={id}
            onNext={() => goToStep(2)}
          />
        );

      case 2:
        return (
          <ResourceQuestions
            ResourceType={ResourceType}
            form={form}
            id={id!} // safe here because navigation guard ensures id is not null
            setId={setId}
            onBack={() => goToStep(1)}
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
        title={id ? `Edit ${ResourceType}` : `Create ${ResourceType}`}
        steps={steps}
        currentStep={step}
        lessonId={id ?? undefined}
        onStepClick={goToStep}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderStep()}</div>
    </div>
  );
}
