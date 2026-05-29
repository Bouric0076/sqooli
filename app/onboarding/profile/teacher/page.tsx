"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Step1Personal from "./steps/Step1Personal";
import Step2Qualifications from "./steps/Step2Qualifications";
import Step3Subjects from "./steps/Step3Subjects";
import Step4Documents from "./steps/Step4Documents";
import Step5Contract from "./steps/Step5Contract";
import { useRouter } from "next/navigation";
import { uploadDocument, validateFile } from "@/app/helpers/fileUploader";
import { useAuthStore } from "@/app/store/useAuthStore";

export type TeacherProfileForm = {
  fullName: string | null;
  nationalId: string;
  nationality: string | null;
  email: string | null;
  phone: string | null;
  educationLevelId: string | null;
  gradeLevelId: string | null;
  address: string;
  Role: string;
  Gender: string;
  dob: string;
  subjectIds: [];
  LicenseNumber: string;
  bio: string;
  certificateLevelID: number;
  licenses: [];
};

export default function TeacherProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<TeacherProfileForm | null>(null);
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user) return;
    setCurrentUser(user);
    //console.log(user);
  }, [user]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TeacherProfileForm>({
    defaultValues: { nationality: "Kenyan" },
  });

  const nationality = watch("nationality");

  const form = useForm<TeacherProfileForm>({
    defaultValues: {
      fullName: null,
      nationality: null,
      email: null,
      phone: null,
      educationLevelId: null,
      gradeLevelId: null,
      subjectIds: [],
    },
  });

  const steps = [
    "Personal Information",
    "Qualifications",
    "Subjects",
    "Documents",
    "Contract",
  ];

  const handleFile = async (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setUploadError("Only PNG, JPG or GIF images are allowed.");
      return;
    }

    if (file.size > maxSize) {
      setUploadError("Image must be less than 2MB.");
      return;
    }
    setFile(file); // keep the real file

    setUploadError(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: TeacherProfileForm) => {
    const payload = { ...data, profileImage: preview };
    console.log(payload);

    if (file) {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }

      // console.log(currentUser);
      if (!currentUser?.userId) {
        console.log("user id not available");
        return;
      }
      // console.log("start upload");
      const res = await uploadDocument(
        file,
        "Profile Photo",
        currentUser?.userId,
        "User",
        "profile_photo"
      );

      console.log(res);
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  return (
    <div className="min-h-screen flex">
      {/* Horizontal Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <div
          className="h-1 bg-indigo-600 transition-all duration-300"
          style={{ width: `${(step / steps.length) * 100}%` }}
        />
      </div>

      {/* Sidebar */}
      <div>
        <div>
          <img src="/logo.svg" alt="Sqooli Logo" className="h-8 mb-6" />
        </div>

        <div className="w-72 bg-white border-r border-gray-200 relative">
          {/* Vertical Step Indicator */}
          <div className="absolute top-0 bottom-10 right-0 flex flex-col justify-start gap-4">
            {steps.map((_, index) => {
              const active = step === index + 1;
              return (
                <div
                  key={index}
                  className={`w-1 rounded-full ${
                    active ? "bg-indigo-600" : ""
                  }`}
                  style={{ height: 40, transform: "translateX(50%)" }}
                />
              );
            })}
          </div>

          {/* Steps Content */}
          <div className="space-y-8 ">
            {steps.map((label, index) => {
              const current = index + 1;
              const active = step === current;
              return (
                <div key={index}>
                  <p
                    className={`text-sm ${
                      active ? "text-indigo-600 font-medium" : "text-gray-400"
                    }`}
                  >
                    Step {current}/5
                  </p>
                  <p className="text-sm text-gray-700">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center px-12 py-12">
        {/* Only rendering Step1 as example */}
        {step === 1 && (
          <Step1Personal
            register={register}
            form={form}
            control={control}
            watch={watch}
            errors={errors}
            preview={preview}
            uploadError={uploadError}
            handleFile={handleFile}
            onBack={() => {
              setStep((prev) => Math.max(prev - 1, 1));
              router.back();
            }}
            onNext={handleSubmit(onSubmit)}
            nationality={nationality}
          />
        )}

        {step === 2 && (
          <Step2Qualifications
            register={register}
            form={form}
            control={control}
            watch={watch}
            errors={errors}
            onBack={() => setStep((prev) => Math.max(prev - 1, 1))}
            onNext={handleSubmit(onSubmit)}
          />
        )}

        {step === 3 && (
          <Step3Subjects
            register={register}
            setValue={setValue}
            form={form}
            control={control}
            watch={watch}
            errors={errors}
            onBack={() => setStep((prev) => Math.max(prev - 1, 1))}
            onNext={handleSubmit(onSubmit)}
          />
        )}
        {step === 4 && (
          <Step4Documents
            register={register}
            control={control}
            form={form}
            watch={watch}
            errors={errors}
            onBack={() => setStep((prev) => Math.max(prev - 1, 1))}
            onNext={handleSubmit(onSubmit)}
          />
        )}
        {step === 5 && (
          <Step5Contract
            register={register}
            form={form}
            control={control}
            watch={watch}
            errors={errors}
            onBack={() => setStep((prev) => Math.max(prev - 1, 1))}
            onNext={handleSubmit(onSubmit)}
          />
        )}
      </div>
    </div>
  );
}
