import { UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function ReviewPublishStep({ form, lessonId, onNext }: Props) {
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

  return <div>Step 6: Review & Publish</div>;
}
