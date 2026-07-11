"use client";

import { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { ProgramRequest } from "../types/program";
import ProgramDetailsModal from "../components/ProgramDetailsModal";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { getCurriculums, getPrograms, getProgramTypes } from "@/app/helpers/lookups";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { useRouter } from "next/navigation";
import { Intake } from "../../intakes/page";

export default function ProgramForm() {
  const [showModal, setShowModal] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const [intakes, setIntakes] = useState<Intake[]>([]);
  const [loading, setLoading] = useState(false);
  const [curriculums, setCurriculums] = useState<any[]>([]);

  const router = useRouter();




  useEffect(() => {
  
    Promise.all([
      getProgramTypes(),
      getCurriculums(),
       getPrograms({}),
    ]).then(([lt, pr, dn]) => {
      setPrograms(lt);
      setCurriculums(pr);
      setIntakes(dn);
      
    });
  }, []);





  const form = useForm<ProgramRequest>({
    defaultValues: {
      programName: "",
      IntakeId: 0,
      programTypeId: 0,
      curriculumId: 0,
      programStartDate: "",
      programEndDate: "",
      hasSubPrograms: false,
      subPrograms: [],
      schedules: [],
      holidays: [],
      businessHours: [],
    },
  });

  const {
    register,
     control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;


  const IntakeId = watch("IntakeId");

  useEffect(() => {
    if (IntakeId) {
      const selectedIntake = intakes.find((i) => i.id === IntakeId);
      if (selectedIntake) {
        setValue("curriculumId", selectedIntake.curriculumId);
        setValue("programStartDate", selectedIntake.startDate);
        setValue("programEndDate", selectedIntake.endDate);
      } 
    }
    }, [IntakeId, intakes, setValue]);






  const hasSubPrograms = watch("hasSubPrograms");

  const onSubmit = (data: ProgramRequest) => {
    // console.log("Program Data:", data);
  };

  return (
    <div className="min-h-screen bg-white p-8">
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-xl shadow-sm border"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Program Details
        </h2>
        <p className="text-gray-500 text-sm">
          Add basic information about your program
        </p>
      </div>

      <div className="space-y-5">
        {/* Program Name */}
        <div>



           <FormField className="text-sm font-medium text-gray-700" label="Program Name" error={errors.programName?.message}>
             <TextInput
               type="text"
               placeholder="Enter Program Name"
               {...register("programName", { required: "Program Name is required" })}
             />
           </FormField>




        </div>

        {/* Program Type */}
        <div>
   
   <div className="grid grid-cols-2 gap-4">
       <FormField className="text-sm font-medium text-gray-700" label="Program Type" error={errors.programTypeId?.message}>
          <Controller
            name="programTypeId"
            control={control}
            rules={{ required: "Program Type is required" }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={programs.map((l) => ({
                  label: l.name,
                  value: l.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                placeholder="Select Program Type"
              />
            )}
          />
        </FormField>



        <FormField className="text-sm font-medium text-gray-700" label="Program Intake/Enrollment" error={errors.IntakeId?.message}>
          <Controller
            name="IntakeId"
            control={control}
            rules={{ required: "Intake is required" }}
            render={({ field }) => (
              <SelectInput
                value={field.value?.toString()}
                options={intakes.map((l) => ({
                  label: l.name,
                  value: l.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                placeholder="Select Intake"
              />
            )}
          />
        </FormField>



</div>


        </div>

        {/* Curriculum */}
        <div>




       <FormField className="text-sm font-medium text-gray-700" label="Curriculum" error={errors.curriculumId?.message}>
          <Controller
            name="curriculumId"
            control={control}
            
            rules={{ required: "Curriculum is required" }}
            render={({ field }) => (
              <SelectInput
               disabled={true}
                value={field.value?.toString()}
                options={curriculums.map((l) => ({
                  label: l.name,
                  value: l.id.toString(),
                }))}
                onChange={(v) => field.onChange(Number(v))}
                placeholder="Select Curriculum"
              />
            )}
          />
        </FormField>




        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
   

            <div className="">
           <FormField className="text-sm font-medium text-gray-700" label=" Program Start Date" error={errors.programStartDate?.message}>
             <TextInput
             readOnly
               type="date"
               {...register("programStartDate", { required: "Start date is required" })}
             />
           </FormField>
   
            </div>
          </div>

          <div>
            {/* <label className="text-sm font-medium text-gray-700">
              Program End Date
            </label> */}

            <div className="">
          <FormField className="text-sm font-medium text-gray-700" label=" Program End Date" error={errors.programEndDate?.message}>
             <TextInput
              readOnly
               type="date"
               {...register("programEndDate", { required: "End date is required" })}
             />
           </FormField>
   
            </div>
          </div>
        </div>

        {/* Toggle + Add Button */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register("hasSubPrograms")}
              className="w-5 h-5"
            />

            <div>
              <p className="text-sm font-medium text-gray-700">
                Do you have more than one sub-programs
              </p>
              <p className="text-xs text-gray-500">
                Add sub-programs to your program
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 border border-blue-500 text-blue-500 px-4 py-2 rounded-full"
          >
            + Add Program Details
          </button>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between pt-6">
          <button
          onClick={()=>  router.push("/school/programs")}
            type="button"
            className="px-5 py-2 rounded-full border text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Go to Preview →
          </button>
        </div>
      </div>
                                             
      <ProgramDetailsModal
        form={form}
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </form>
    </div>
  );
}