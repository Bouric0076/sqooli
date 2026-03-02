"use client";

import { TeacherProfileForm } from "../types";
import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import { ArrowLeft, ArrowRight, Loader2, Trash2 } from "lucide-react";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { FormField } from "@/app/components/ui/form/FormField";
import { TextArea } from "@/app/components/ui/form/TextArea";
import { SelectInput } from "@/app/components/ui/form/SelectInput";
import { useEffect, useState } from "react";
import MyModal from "@/app/components/general/modals/MyModal";
import { PrimaryButton } from "@/app/components/ui/form/PrimaryButton";
import { getCertificateLevels } from "@/app/helpers/lookups";

type Props = {
  form: UseFormReturn<TeacherProfileForm>;
  onBack: () => void;
  onNext: () => void;
};

export default function Step2Qualifications({ form, onBack, onNext }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [certificateLevels, setCertificateLevel] = useState<any[]>([]);

  useEffect(() => {
    const fetchCertificateLevels = async () => {
      try {
        const data = await getCertificateLevels();
        setCertificateLevel(data);
      } catch (error) {
        console.error("Failed to load certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateLevels();
  }, []);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "licenses",
  });

  const [newLicense, setNewLicense] = useState({
    name: "",
    organization: "",
    month: "",
    year: "",
    expiryMonth: "",
    expiryYear: "",
    url: "",
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openEditModal = (index: number) => {
    const license = fields[index];
    setEditingIndex(index);
    setNewLicense({ ...license });
    setOpenModal(true);
  };

  const handleAddLicense = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingIndex !== null) {
      update(editingIndex, newLicense);
      setEditingIndex(null);
    } else {
      append(newLicense);
    }

    setNewLicense({
      name: "",
      organization: "",
      month: "",
      year: "",
      expiryMonth: "",
      expiryYear: "",
      url: "",
    });

    setOpenModal(false);
  };

  const updateNewLicense = (field: string, value: string) => {
    setNewLicense({ ...newLicense, [field]: value });
  };

  const handleSubmitQualifications = async (data: TeacherProfileForm) => {
    try {
      const res = await fetch("/api/teacher/save-qualifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: data.bio,
          certificateLevelId: Number(data.certificateLevelID),
          licenses: data.licenses,
        }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message);

      console.log("Saved:", result);
      onNext();
    } catch (error: any) {
      console.error("Save failed:", error.message);
    }
  };

  return (
    <>
      <form
        className="w-full max-w-3xl space-y-6"
        onSubmit={handleSubmit(handleSubmitQualifications)}
      >
        <h2 className="text-2xl font-semibold text-gray-800">Qualifications</h2>

        {/* Bio */}
        <FormField label="Bio" error={errors.bio?.message}>
          <Controller
            name="bio"
            control={control}
            rules={{ required: "Bio is required" }}
            render={({ field }) => (
              <TextArea
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter a description..."
                className="h-32"
              />
            )}
          />
        </FormField>

        {/* Highest Level of Education */}
        <FormField
          label="Highest Level of Education"
          error={errors.certificateLevelID?.message}
        >
          <Controller
            name="certificateLevelID"
            control={control}
            rules={{ required: "Select your education level" }}
            render={({ field }) => (
              <SelectInput
                placeholder="Select..."
                value={field.value}
                onChange={field.onChange}
                options={certificateLevels.map((g) => ({
                  label: g.name,
                  value: g.id.toString(),
                }))}
              />
            )}
          />
        </FormField>

        {/* Licenses */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">
            Add any licenses and certifications from other institutions to boost
            your profile
          </p>

          {fields.map((license, index) => (
            <div
              key={license.id}
              className="flex items-center gap-2 border px-4 rounded bg-indigo-100 py-2"
            >
              <div className="flex-1">
                <h4 className="text-gray-600">{license.name}</h4>
              </div>

              <button
                type="button"
                onClick={() => openEditModal(index)}
                className="flex justify-center items-center text-indigo-600 hover:text-indigo-800 "
              >
                <span className="p-1 bg-white px-3 rounded"> ✎ </span>
              </button>

              <button
                type="button"
                onClick={() => remove(index)}
                className="flex justify-center items-center text-red-600 hover:text-red-800 "
              >
                <span className="p-1 bg-white px-2 rounded">
                  <Trash2 />
                </span>
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="text-sm text-indigo-600 font-medium hover:underline bg-indigo-100 py-2 px-4 rounded-2xl"
          >
            + Add Licenses or Certifications
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-8">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 border border-gray-300 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-2 rounded-full hover:bg-indigo-700"
          >
            Save & Continue <ArrowRight size={16} />
          </button>
        </div>
      </form>

      {/* Modal */}
      <MyModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Add License or Certification"
      >
        <form onSubmit={handleAddLicense} className="space-y-4">
          <FormField label="Name">
            <TextInput
              value={newLicense.name}
              onChange={(e) => updateNewLicense("name", e.target.value)}
              placeholder="Enter license or certification name"
            />
          </FormField>

          <FormField label="Issuing Organization">
            <TextInput
              value={newLicense.organization}
              onChange={(e) => updateNewLicense("organization", e.target.value)}
              placeholder="Enter issuing organization"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-6">
            <FormField label="Month Issued">
              <SelectInput
                placeholder="Month"
                value={newLicense.month}
                onChange={(val) => updateNewLicense("month", val)}
                options={[
                  { label: "January", value: "01" },
                  { label: "February", value: "02" },
                  { label: "March", value: "03" },
                  { label: "April", value: "04" },
                  { label: "May", value: "05" },
                  { label: "June", value: "06" },
                  { label: "July", value: "07" },
                  { label: "August", value: "08" },
                  { label: "September", value: "09" },
                  { label: "October", value: "10" },
                  { label: "November", value: "11" },
                  { label: "December", value: "12" },
                ]}
              />
            </FormField>

            <FormField label="Year Issued">
              <TextInput
                value={newLicense.year}
                onChange={(e) => updateNewLicense("year", e.target.value)}
                placeholder="YYYY"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField label="Expiry Month (optional)">
              <SelectInput
                placeholder="Month"
                value={newLicense.expiryMonth}
                onChange={(val) => updateNewLicense("expiryMonth", val)}
                options={[
                  { label: "January", value: "01" },
                  { label: "February", value: "02" },
                  { label: "March", value: "03" },
                  { label: "April", value: "04" },
                  { label: "May", value: "05" },
                  { label: "June", value: "06" },
                  { label: "July", value: "07" },
                  { label: "August", value: "08" },
                  { label: "September", value: "09" },
                  { label: "October", value: "10" },
                  { label: "November", value: "11" },
                  { label: "December", value: "12" },
                ]}
              />
            </FormField>

            <FormField label="Expiry Year (optional)">
              <TextInput
                value={newLicense.expiryYear}
                onChange={(e) => updateNewLicense("expiryYear", e.target.value)}
                placeholder="YYYY"
              />
            </FormField>
          </div>

          <FormField label="Credential URL (optional)">
            <TextInput
              value={newLicense.url}
              onChange={(e) => updateNewLicense("url", e.target.value)}
              placeholder="Enter credentials URL"
            />
          </FormField>

          <div className="flex justify-end">
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </PrimaryButton>
          </div>
        </form>
      </MyModal>
    </>
  );
}
