import { FormField } from "@/app/components/ui/form/FormField";
import PageHeader from "@/app/components/ui/navigation/PageHeader";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import { Controller, UseFormReturn } from "react-hook-form";
import { AddLessonForm } from "../page";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { ArrowLeft } from "lucide-react";

type Props = {
  form: UseFormReturn<AddLessonForm>;
  lessonId?: number;
  onNext: (lessonId: number) => void;
  onBack: (lessonId: number) => void;
};

export function LessonRequirementsStep({ form, lessonId, onNext }: Props) {
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

  const handlesubmitRequirements = async (data: AddLessonForm) => {
    if (!lessonId) {
      console.error("Lesson ID is missing");
      return;
    }

    try {
      const response = await fetch(`/api/lesson/${lessonId}/requirements`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirements: data.requirements }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to update requirements", result);
        return;
      }

      console.log("Lesson requirements updated:", result);
      onNext(4);
    } catch (error) {
      console.error("Error updating requirements:", error);
    }
  };

  const submitRequirements = () => handleSubmit(handlesubmitRequirements)();

  return (
    <>
      <PageHeader
        title="Lesson Requirements"
        description="Add summary of what students require before taking your lesson"
      />
      <div className="bg-white p-8 rounded-md space-y-6">
        <form onSubmit={submitRequirements} className="grid grid-cols-2 gap-4 ">
          <div className="col-span-2">
            <FormField
              label="Lesson Requirements"
              error={errors.requirements?.message}
            >
              <Controller
                name="requirements"
                control={control}
                rules={{ required: "Lesson Requirements is required" }}
                render={({ field }) => (
                  <TextArea
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter lesson requirements..."
                  />
                )}
              />
            </FormField>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between pt-8">
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={submitRequirements}
            type="button"
            className="bg-gray-100 hover:bg-gray-200 text-sm font-medium px-6 py-2 rounded-full flex items-center gap-2"
          >
            Save & Continue →
          </button>
        </div>
      </div>
    </>
  );
}
