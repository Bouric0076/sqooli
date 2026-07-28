"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import { ProgramRequest } from "../types/program";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { getCurriculums, getProgramTypes } from "@/app/helpers/lookups";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { useRouter, useSearchParams } from "next/navigation";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { addIntake, getIntake, UpdateIntake } from "@/app/lib/intake";
import { useSpinnerStore } from "@/app/store/useSpinnerStore";
import { ShowToast } from "@/lib/toast";
export interface IntakeRequest {
  id?: string;
  Name: string;
  price: number;
  description: string;
  colorCode: string;
  curriculumId: number;
  startDate: string;
  endDate: string;
}

export default function ProgramForm() {
  const [showModal, setShowModal] = useState(false);
  const [programs, setPrograms] = useState<any[]>([]);
  const { loading, setLoading } = useSpinnerStore();
  const [curriculums, setCurriculums] = useState<any[]>([]);

  const router = useRouter();
const searchParams = useSearchParams();
const intakeId = searchParams.get("id");



useEffect(() => {
  Promise.all([
    getProgramTypes(),
    getCurriculums(),
  ]).then(([lt, pr]) => {
    setPrograms(lt);
    setCurriculums(pr);
  });

  if (intakeId) {
    getIntake(intakeId).then((res) => {
      const data = res.data;
      setValue("id", data.id);
      setValue("Name", data.name);
      setValue("price", data.price);
      setValue("description", data.description);
      setValue("colorCode", data.colorCode);
      setValue("curriculumId", data.curriculumId);
      setValue("startDate", data.startDate);
      setValue("endDate", data.endDate);
    });
  }
}, [intakeId]);



  const form = useForm<IntakeRequest>({
    defaultValues: {
      id: intakeId || undefined,
      Name: "",
      price: 0,
      description: "",
      colorCode: "",
      curriculumId: 0,
      startDate: "",
      endDate: "",
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





  const onSubmit = (data: IntakeRequest) => {
    setLoading(true);
    var response = null;
    if (intakeId) {
      UpdateIntake(data)
        .then((res) => {
            console.log("Intake updated:", res);
               ShowToast.success(res?.message || "Success");
            router.push("/school/intakes");
        })
        .catch((err) => {
            console.error("Error updating intake:", err);
            alert("Failed to update intake. Please try again.");
        })
        .finally(() => {
            setLoading(false);
        });

    } else {
    addIntake(data)
        .then((res) => {
            console.log("Intake added:", res);
             ShowToast.success(res?.message || "Success");
            router.push("/school/intakes");
        })
        .catch((err) => {
            console.error("Error adding intake:", err);
            alert("Failed to add intake. Please try again.");
        })
        .finally(() => {
            setLoading(false);
        });
    }
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
          Intake Details
        </h2>
        <p className="text-gray-500 text-sm">
          Add basic information about your intake
        </p>
      </div>

      <div className="space-y-5">
        {/* Intake Name */}
        <div>



           <FormField className="text-sm font-medium text-gray-700" label="Intake Name" error={errors.Name?.message}>
             <TextInput
               type="text"
               placeholder="Enter Intake Name"
               {...register("Name", { required: "Intake Name is required" })}
             />
           </FormField>












        </div>

        {/* Program Type */}
        <div>
   

        <div className="grid grid-cols-2 gap-4">
           <FormField className="text-sm font-medium text-gray-700" label="Price" error={errors.price?.message}>
             <TextInput
               type="text"
               placeholder="Enter Price"
               {...register("price", { required: "Price is required" })}
             />
           </FormField>

                      <FormField className="text-sm font-medium text-gray-700" label="Color Code" error={errors.colorCode?.message}>
             <TextInput
               type="text"
               placeholder="Enter Color Code"
               {...register("colorCode", { required: "Color Code is required" })}
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
           <FormField className="text-sm font-medium text-gray-700" label="  Start Date" error={errors.startDate?.message}>
             <TextInput
               type="date"
               {...register("startDate", { required: "Start date is required" })}
             />
           </FormField>


           
   
            </div>
          </div>

          <div>
            {/* <label className="text-sm font-medium text-gray-700">
              Program End Date
            </label> */}

            <div className="">
          <FormField className="text-sm font-medium text-gray-700" label="  End Date" error={errors.endDate?.message}>
             <TextInput
               type="date"
               {...register("endDate", { required: "End date is required" })}
             />
           </FormField>
   
            </div>


          </div>
          
        </div>




            <FormField
              label="Description"
              error={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextArea
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter description..."
                  />
                )}
              />
            </FormField>










        {/* Toggle + Add Button */}
   
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
           {intakeId ? "Update" : "Submit"} →
          </button>
        </div>
      </div>

    </form>
    </div>
  );
}