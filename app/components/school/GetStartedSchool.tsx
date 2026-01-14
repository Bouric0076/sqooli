import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { link } from "fs";

const GetStartedSchool = () => {
  const [completedSteps, setCompletedSteps] = useState([]);
  const router = useRouter();

  const steps = [
    {
      number: 1,
      title: "Onboard Teachers",
      description: "Invite teachers to the platform",
      link: "/school/teachers",
      action: "Go",
    },
    {
      number: 2,
      title: "Assign Grade Levels",
      link: "/school/grades",
      description: "Assign teacher to grade levels they will be teaching",
    },
    {
      number: 3,
      title: "Assign Subjects",
      link: "/school/subjects",
      description:
        "Assign teachers to the subjects like Math, Science, or History",
    },
    {
      number: 4,
      title: "Enrol Students",
      link: "/school/students",
      description: "Enrol students in your school",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center ">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Get Started</h1>
          <p className="text-sm text-gray-600">
            Setup grades, subjects and curriculums to get started
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="flex items-start gap-4 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.number === 1
                      ? "bg-blue-100 text-blue-600 border-2 border-blue-400"
                      : "bg-white text-gray-400 border-2 border-gray-300"
                  }`}
                >
                  {step.number}
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pt-1">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {/* Action Button or Arrow */}
              <div className="flex-shrink-0 pt-1">
                {step.action ? (
                  <button
                    onClick={() => router.push(step.link)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
                  >
                    {step.action}
                  </button>
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetStartedSchool;
