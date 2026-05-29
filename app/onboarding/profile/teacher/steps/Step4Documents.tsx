"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  UploadCloud,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { uploadDocument, validateFile } from "@/app/helpers/fileUploader";

type Props = {
  onBack: () => void;
  onNext: () => void;
};

type DocKey = "idFront" | "idBack" | "tscCert";

export default function Step4Documents({ onBack, onNext }: Props) {
  const [files, setFiles] = useState<Record<DocKey, File | null>>({
    idFront: null,
    idBack: null,
    tscCert: null,
  });

  const [errors, setErrors] = useState<Record<DocKey, string | null>>({
    idFront: null,
    idBack: null,
    tscCert: null,
  });

  const { user } = useAuthStore();
  const userId = user?.userId;

  const handleFileUpload = (file: File, key: DocKey) => {
    const error = validateFile(file);

    if (error) {
      setErrors((prev) => ({ ...prev, [key]: error }));
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));
    setErrors((prev) => ({ ...prev, [key]: null }));
  };

  const removeFile = (key: DocKey) => {
    setFiles((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.idFront || !files.idBack || !files.tscCert) {
      alert("Please upload all required documents");
      return;
    }

    try {
      // Upload documents
      await uploadDocument(
        files.idFront,
        "National ID Front",
        userId,
        "Teacher",
        "national_id_front"
      );
      await uploadDocument(
        files.idBack,
        "National ID Back",
        userId,
        "Teacher",
        "national_id_back"
      );
      await uploadDocument(
        files.tscCert,
        "TSC Certificate",
        userId,
        "Teacher",
        "tsc_certificate"
      );

      alert("Documents uploaded successfully");
      onNext();
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err.message || "Document upload failed");
    }
  };

  const FileRow = ({
    file,
    onRemove,
  }: {
    file: File;
    onRemove: () => void;
  }) => (
    <div className="flex items-center justify-between border rounded-xl p-4 bg-gray-50">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          📄
        </div>
        <div>
          <p className="text-sm font-medium">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(0)} KB • 100% uploaded
          </p>
        </div>
      </div>
      <Trash2
        className="text-red-500 cursor-pointer"
        size={18}
        onClick={onRemove}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">Documents</h2>

      {/* Guidelines */}
      <div className="border border-orange-300 bg-orange-50 rounded-xl p-4">
        <div className="flex gap-3">
          <AlertTriangle className="text-orange-500 mt-1" size={20} />
          <div className="text-sm text-orange-700 space-y-1">
            <p>Ensure all documents are clear and legible</p>
            <p>Documents must be valid and not expired</p>
            <p>File size should not exceed specified limits</p>
            <p>Accepted formats: PDF, PNG, JPG</p>
          </div>
        </div>
      </div>

      {/* ID Front */}
      <UploadBlock
        label="Copy of National ID (Front)"
        file={files.idFront}
        error={errors.idFront}
        onUpload={(file) => handleFileUpload(file, "idFront")}
        onRemove={() => removeFile("idFront")}
        warning="Please ensure your face is clearly visible on your upload"
      />

      {/* ID Back */}
      <UploadBlock
        label="Copy of National ID (Back)"
        file={files.idBack}
        error={errors.idBack}
        onUpload={(file) => handleFileUpload(file, "idBack")}
        onRemove={() => removeFile("idBack")}
      />

      {/* TSC Cert */}
      <UploadBlock
        label="Teacher’s Service Commission License Certificate"
        file={files.tscCert}
        error={errors.tscCert}
        onUpload={(file) => handleFileUpload(file, "tscCert")}
        onRemove={() => removeFile("tscCert")}
      />

      {/* Buttons */}
      <div className="flex justify-between pt-10">
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
  );
}

/* ---------- Reusable Upload Block ---------- */

function UploadBlock({
  label,
  file,
  error,
  onUpload,
  onRemove,
  warning,
}: {
  label: string;
  file: File | null;
  error?: string | null;
  warning?: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      {file ? (
        <div>
          <div className="flex items-center justify-between border rounded-xl p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                📄
              </div>
              <div>
                <p className="text-sm font-medium">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(0)} KB • 100% uploaded
                </p>
              </div>
            </div>
            <Trash2
              className="text-red-500 cursor-pointer"
              size={18}
              onClick={onRemove}
            />
          </div>

          {warning && <p className="text-xs text-red-500 mt-1">{warning}</p>}
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-400 transition">
          <UploadCloud className="text-gray-400 mb-2" />
          <p className="text-sm text-indigo-600 font-medium">
            Click to upload{" "}
            <span className="text-gray-500">or drag and drop</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">PDF, PNG, JPG (max 10MB)</p>
          <input
            type="file"
            hidden
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
        </label>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
