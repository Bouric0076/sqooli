"use client";

type LessonMenuProps = {
  steps: string[];
  currentStep: number;
  lessonId: number | null;
  onStepClick: (step: number) => void;
};

export default function LessonMenu({
  steps,
  currentStep,
  lessonId,
  onStepClick,
}: LessonMenuProps) {
  return (
    <div className="w-1/ bg-white border-r border-gray-200 p-6">
      <h2 className="text-lg font-bold mb-4">Create Lesson</h2>

      <ol className="space-y-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isLocked = stepNumber !== 1 && lessonId === null;

          return (
            <li
              key={label}
              onClick={() => !isLocked && onStepClick(stepNumber)}
              className={`flex items-center gap-3 ${
                isLocked ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              <span
                className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold border
                  ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "text-gray-500 border-gray-300"
                  }`}
              >
                {stepNumber}
              </span>

              <span
                className={`text-sm ${
                  isActive ? "font-semibold text-blue-600" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
