"use client";
import { useForm } from "react-hook-form";

export default function SchoolRegistrationForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("School Data:", data);
    // Next step: School Verification or Dashboard
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">
          Register your Institution
        </h2>
        <p className="text-gray-500">
          Provide school details to set up your admin workspace.
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* School Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              School Name
            </label>
            <input
              {...register("schoolName")}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="e.g. Green Valley Academy"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              School Type
            </label>
            <select
              {...register("schoolType")}
              className="p-3 border rounded-lg bg-white"
            >
              <option>Primary School</option>
              <option>High School</option>
              <option>University/College</option>
            </select>
          </div>
        </div>

        {/* Location & Capacity */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Official School Email
          </label>
          <input
            type="email"
            {...register("adminEmail")}
            className="p-3 border rounded-lg"
            placeholder="admin@school.edu"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Physical Address
          </label>
          <textarea
            {...register("address")}
            className="p-3 border rounded-lg"
            placeholder="Enter full address..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors mt-4"
        >
          Create School Profile
        </button>
      </form>
    </div>
  );
}
