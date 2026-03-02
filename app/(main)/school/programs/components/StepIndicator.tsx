"use client";

import React from "react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full overflow-x-auto">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;

        return (
          <div key={index} className="flex items-center w-full">
            {/* Step Circle */}
            <div className="flex flex-col items-center text-center min-w-[100px]">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>

              <p
                className={`mt-2 text-xs font-medium 
                  ${
                    isActive
                      ? "text-blue-500"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
              >
                {step}
              </p>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition
                  ${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
