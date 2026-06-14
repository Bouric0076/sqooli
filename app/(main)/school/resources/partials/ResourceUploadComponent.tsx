"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, ArrowLeft } from "lucide-react";
import {
  getMyCurriculums,
  getEducationLevels,
  getGradeLevels,
  getSubjects,
  getTopics,
} from "@/app/helpers/lookups";

/* ---------------- Types ---------------- */
type Curriculum = {
  id: number;
  name: string;
  acronym?: string;
};

type EducationLevel = { id: number; name: string };
type GradeLevel = { id: number; name: string };
type Subject = { id: number; name: string };
type Topic = { id: number; name: string };

type ResourceUploadComponentProps = {
  resourceType: "Note" | "Book" | "Video";
  titleLabel: string;
  uploadLabel: string;

  onBack?: () => void;
  onSuccess?: (resourceId: number) => void;

  activeResourceId: number;
};

export default function ResourceUploadComponent({
  resourceType,
  titleLabel,
  uploadLabel,
  onBack,
  onSuccess,
  activeResourceId,
}: ResourceUploadComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- RESOURCE FORM STATE ---------------- */
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------- LOOKUP STATE ---------------- */
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [curriculumId, setCurriculumId] = useState<number | null>(
    activeResourceId || null
  );

  const [educationLevelId, setEducationLevelId] = useState<number | null>(null);
  const [gradeLevelId, setGradeLevelId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [topicId, setTopicId] = useState<number | null>(null);

  /* ---------------- LOAD CURRICULUMS ---------------- */
  useEffect(() => {
    getMyCurriculums().then((data) => {
      setCurriculums(data);

      if (!curriculumId && data.length > 0) {
        setCurriculumId(data[0].id);
      }
    });
  }, []);

  /* ---------------- CURRICULUM → EDUCATION LEVELS ---------------- */
  useEffect(() => {
    if (!curriculumId) {
      setEducationLevels([]);
      setEducationLevelId(null);
      return;
    }

    getEducationLevels({ curriculumId }).then(setEducationLevels);
  }, [curriculumId]);

  /* ---------------- RESET CASCADE WHEN CURRICULUM CHANGES ---------------- */
  useEffect(() => {
    setEducationLevelId(null);
    setGradeLevelId(null);
    setSubjectId(null);
    setTopicId(null);

    setGradeLevels([]);
    setSubjects([]);
    setTopics([]);
  }, [curriculumId]);

  /* ---------------- EDUCATION LEVEL → GRADE LEVELS ---------------- */
  useEffect(() => {
    if (!educationLevelId) {
      setGradeLevels([]);
      setGradeLevelId(null);
      return;
    }

    getGradeLevels({ educationLevelId }).then(setGradeLevels);
  }, [educationLevelId]);

  /* ---------------- GRADE LEVEL → SUBJECTS ---------------- */
  useEffect(() => {
    if (!gradeLevelId) {
      setSubjects([]);
      setSubjectId(null);
      return;
    }

    getSubjects({ gradeLevelId }).then(setSubjects);
  }, [gradeLevelId]);

  /* ---------------- SUBJECT → TOPICS ---------------- */
  useEffect(() => {
    if (!subjectId) {
      setTopics([]);
      setTopicId(null);
      return;
    }

    getTopics({ subjectId }).then(setTopics);
  }, [subjectId]);

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async () => {
    if (!title || !file || !topicId) {
      alert("Title, topic, and file are required");
      return;
    }

    try {
      setIsSubmitting(true);

      // 1️⃣ Create resource
      const resourceRes = await fetch("/api/resource/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title,
          resourceType,
          isPublic: false,
        }),
      });

      const resourceJson = await resourceRes.json();

      if (!resourceRes.ok) {
        throw new Error(resourceJson.message);
      }

      const resourceId = resourceJson.data.id;

      // 2️⃣ Upload file
      const formData = new FormData();
      formData.append("file", file);
      formData.append("Title", title);
      formData.append("Category", "resource");
      formData.append("EntityType", "Resource");
      formData.append("EntityId", resourceId.toString());
      formData.append("IsPublic", "false");

      await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      // 3️⃣ Attach resource to topic
      await fetch(`/api/resource/${resourceId}/attach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          entityType: "Topic",
          entityId: topicId,
          usageType: "primary",
        }),
      });

      onSuccess?.(resourceId);

      alert("Resource uploaded successfully");
    } catch (err: any) {
      console.error("Upload error", err);
      alert(err.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* -------- Resource Upload -------- */}
      <div className="mt-6">
        <label className="text-sm font-medium text-neutral-700">
          {titleLabel}
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border px-4 py-2.5 mb-4"
        />

        <label className="text-sm font-medium text-neutral-700 mt-4">
          {uploadLabel}
        </label>

        <div
          onClick={() => inputRef.current?.click()}
          className="mt-2 rounded-xl border border-dashed px-6 py-10 text-center cursor-pointer hover:bg-neutral-50"
        >
          <Upload className="mx-auto h-6 w-6 text-neutral-500" />

          <p className="mt-2 text-sm text-neutral-600">
            Click to upload or drag and drop
          </p>

          {file && (
            <p className="mt-2 text-xs text-neutral-700">{file.name}</p>
          )}

          <input
            ref={inputRef}
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
      </div>

      {/* -------- Education Flow -------- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Curriculum */}
        <select
          className="border rounded-lg px-3 py-2"
          value={curriculumId ?? ""}
          onChange={(e) =>
            setCurriculumId(
              e.target.value ? Number(e.target.value) : null
            )
          }
        >
          <option value="">Select curriculum</option>

          {curriculums.map((curriculum) => (
            <option key={curriculum.id} value={curriculum.id}>
              {curriculum.name}
            </option>
          ))}
        </select>

        {/* Education Level */}
        <select
          className="border rounded-lg px-3 py-2"
          value={educationLevelId ?? ""}
          onChange={(e) =>
            setEducationLevelId(
              e.target.value ? Number(e.target.value) : null
            )
          }
          disabled={!curriculumId}
        >
          <option value="">Select education level</option>

          {educationLevels.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </select>

        {/* Grade */}
        <select
          className="border rounded-lg px-3 py-2"
          value={gradeLevelId ?? ""}
          onChange={(e) =>
            setGradeLevelId(
              e.target.value ? Number(e.target.value) : null
            )
          }
          disabled={!educationLevelId}
        >
          <option value="">Select grade</option>

          {gradeLevels.map((gl) => (
            <option key={gl.id} value={gl.id}>
              {gl.name}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select
          className="border rounded-lg px-3 py-2"
          value={subjectId ?? ""}
          onChange={(e) =>
            setSubjectId(
              e.target.value ? Number(e.target.value) : null
            )
          }
          disabled={!gradeLevelId}
        >
          <option value="">Select subject</option>

          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>

        {/* Topic */}
        <select
          className="border rounded-lg px-3 py-2"
          value={topicId ?? ""}
          onChange={(e) =>
            setTopicId(
              e.target.value ? Number(e.target.value) : null
            )
          }
          disabled={!subjectId}
        >
          <option value="">Select topic</option>

          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      {/* -------- Actions -------- */}
      <div className="mt-16 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-full border px-5 py-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="rounded-full bg-neutral-900 px-6 py-2 text-sm text-white disabled:opacity-50"
        >
          Save & Submit →
        </button>
      </div>
    </div>
  );
}