"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, ArrowLeft, FileText } from "lucide-react";
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

type Attachment = {
  entityType: string;
  entityId: number;
  usageType?: string;
  topic?: { id: number; name: string } | null;
};

// Prefix for relative file URLs returned by the API (e.g. "/uploads/resource/...").
// Point this at your API origin if files aren't served from the same host as the frontend.
const FILE_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

type ResourceUploadComponentProps = {
  resourceType: "Note" | "Book" | "Video";
  titleLabel: string;
  uploadLabel: string;

  onBack?: () => void;
  onSuccess?: (resourceId: number) => void;

  // When this has a value, the component loads & edits that resource
  // instead of creating a new one.
  activeResourceId: number | null;
};

/* ---------------- Prefill target shape ----------------
   These are the ids we want to land on once each cascading
   dropdown's options have loaded. We don't set them all at once -
   we apply each one only after its list has been fetched, the same
   way getValues()-after-reset works for RHF: read/apply synchronously
   once the data backing the field actually exists.
*/
type PrefillTargets = {
  curriculumId?: number;
  educationLevelId?: number;
  gradeLevelId?: number;
  subjectId?: number;
  topicId?: number;
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
  const isEditMode = !!activeResourceId;

  /* ---------------- RESOURCE FORM STATE ---------------- */
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingResource, setIsLoadingResource] = useState(isEditMode);

  // Existing file info (edit mode) - shown until the user picks a replacement
  const [existingFileName, setExistingFileName] = useState<string | null>(null);
  const [existingFileUrl, setExistingFileUrl] = useState<string | null>(null);

  // All attachments returned for this resource (edit mode), shown read-only
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  /* ---------------- LOOKUP STATE ---------------- */
  const [curriculums, setCurriculums] = useState<Curriculum[]>([]);
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [curriculumId, setCurriculumId] = useState<number | null>(null);
  const [educationLevelId, setEducationLevelId] = useState<number | null>(null);
  const [gradeLevelId, setGradeLevelId] = useState<number | null>(null);
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const [topicId, setTopicId] = useState<number | null>(null);

  /* ---------------- PREFILL TARGETS (ref, not state) ----------------
     A ref so updating it doesn't trigger re-renders, and so the
     cascading effects below can read the *current* target synchronously
     instead of being stuck with a stale closure value.
  */
  const prefillTargets = useRef<PrefillTargets | null>(null);

  /* ---------------- LOAD EXISTING RESOURCE (edit mode) ----------------
     Response shape:
     {
       data: {
         resource: {
           id, title, resourceType, isPublic, createdAt,
           curriculumId, educationLevelId, gradeLevelId, subjectId, topicId
         },
         files: [{ id, title, url, mimeType, fileSize }],
         attachments: [{ entityType, entityId, usageType, topic: { id, name } }]
       }
     }

     The full curriculum → topic chain now lives directly on the
     resource itself, so prefill is a straight read - no extra
     hierarchy lookup needed.
  */
  useEffect(() => {
    if (!activeResourceId) return;

    let cancelled = false;

    (async () => {
      try {
        setIsLoadingResource(true);

        const res = await fetch(`/api/resource/${activeResourceId}`, {
          credentials: "include",
        });
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json.message || "Failed to load resource");
        }

        if (cancelled) return;

        const { resource, files, attachments: fetchedAttachments } = json.data;

        setTitle(resource.title ?? "");

        const primaryFile = files?.[0];
        if (primaryFile) {
          setExistingFileUrl(primaryFile.url);
          setExistingFileName(primaryFile.title ?? "Current file");
        }

        setAttachments(fetchedAttachments ?? []);

        if (resource.curriculumId) {
          prefillTargets.current = {
            curriculumId: resource.curriculumId,
            educationLevelId: resource.educationLevelId,
            gradeLevelId: resource.gradeLevelId,
            subjectId: resource.subjectId,
            topicId: resource.topicId,
          };
        }
      } catch (err) {
        console.error("Failed to load resource for edit", err);
      } finally {
        if (!cancelled) setIsLoadingResource(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeResourceId]);

  /* ---------------- LOAD CURRICULUMS ---------------- */
  useEffect(() => {
    getMyCurriculums().then((data) => {
      setCurriculums(data);

      const target = prefillTargets.current?.curriculumId;

      if (target && data.some((c: Curriculum) => c.id === target)) {
        setCurriculumId(target);
      } else if (!isEditMode && !curriculumId && data.length > 0) {
        setCurriculumId(data[0].id);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------------- CURRICULUM → EDUCATION LEVELS ----------------
     Combines the fetch + the "reset children when parent changes"
     logic in one place. If we're mid-prefill and the loaded list
     contains our target id, apply it. Otherwise, reset as before.
  */
  useEffect(() => {
    if (!curriculumId) {
      setEducationLevels([]);
      setEducationLevelId(null);
      return;
    }

    getEducationLevels({ curriculumId }).then((data) => {
      setEducationLevels(data);

      const target = prefillTargets.current?.educationLevelId;

      if (target && data.some((el: EducationLevel) => el.id === target)) {
        setEducationLevelId(target);
      } else {
        setEducationLevelId(null);
      }
    });
  }, [curriculumId]);

  /* ---------------- EDUCATION LEVEL → GRADE LEVELS ---------------- */
  useEffect(() => {
    if (!educationLevelId) {
      setGradeLevels([]);
      setGradeLevelId(null);
      return;
    }

    getGradeLevels({ educationLevelId }).then((data) => {
      setGradeLevels(data);

      const target = prefillTargets.current?.gradeLevelId;

      if (target && data.some((gl: GradeLevel) => gl.id === target)) {
        setGradeLevelId(target);
      } else {
        setGradeLevelId(null);
      }
    });
  }, [educationLevelId]);

  /* ---------------- GRADE LEVEL → SUBJECTS ---------------- */
  useEffect(() => {
    if (!gradeLevelId) {
      setSubjects([]);
      setSubjectId(null);
      return;
    }

    getSubjects({ gradeLevelId }).then((data) => {
      setSubjects(data);

      const target = prefillTargets.current?.subjectId;

      if (target && data.some((s: Subject) => s.id === target)) {
        setSubjectId(target);
      } else {
        setSubjectId(null);
      }
    });
  }, [gradeLevelId]);

  /* ---------------- SUBJECT → TOPICS ---------------- */
  useEffect(() => {
    if (!subjectId) {
      setTopics([]);
      setTopicId(null);
      return;
    }

    getTopics({ subjectId }).then((data) => {
      setTopics(data);

      const target = prefillTargets.current?.topicId;

      if (target && data.some((t: Topic) => t.id === target)) {
        setTopicId(target);
        // Prefill chain fully applied (topic is the leaf) - clear it so
        // any later, user-driven curriculum change resets normally.
        prefillTargets.current = null;
      } else {
        setTopicId(null);
      }
    });
  }, [subjectId]);

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async () => {
    const hasFile = !!file || (isEditMode && !!existingFileName);

    if (!title || !hasFile || !topicId) {
      alert("Title, topic, and file are required");
      return;
    }

    try {
      setIsSubmitting(true);

      let resourceId: number;

      if (isEditMode) {
        // 1️⃣ Update resource (full hierarchy sent here directly)
        const resourceRes = await fetch(`/api/resource/${activeResourceId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            resourceType,
            isPublic: false,
            curriculumId,
            educationLevelId,
            gradeLevelId,
            subjectId,
            topicId,
          }),
        });

        const resourceJson = await resourceRes.json();

        if (!resourceRes.ok) {
          throw new Error(resourceJson.message);
        }

        resourceId = activeResourceId as number;
      } else {
        // 1️⃣ Create resource (full hierarchy sent here directly)
        const resourceRes = await fetch("/api/resource/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            resourceType,
            isPublic: false,
            curriculumId,
            educationLevelId,
            gradeLevelId,
            subjectId,
            topicId,
          }),
        });

        const resourceJson = await resourceRes.json();

        if (!resourceRes.ok) {
          throw new Error(resourceJson.message);
        }

        resourceId = resourceJson.data.id;
      }

      // 2️⃣ Upload file - only if the user picked a new one. In edit
      // mode, no new file means "keep the existing one".
      if (file) {
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
      }

      // Note: no separate "attach to topic" call - topicId is sent
      // directly on the resource above, so it's persisted in one step.

      onSuccess?.(resourceId);

      alert(
        isEditMode
          ? "Resource updated successfully"
          : "Resource uploaded successfully"
      );
    } catch (err: any) {
      console.error("Upload error", err);
      alert(err.message || "Upload failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingResource) {
    return (
      <div className="py-16 text-center text-sm text-neutral-500">
        Loading resource…
      </div>
    );
  }

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

          {!file && existingFileName && (
            <div
              className="mt-2 flex items-center justify-center gap-1.5 text-xs text-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText className="h-3.5 w-3.5" />
              {existingFileUrl ? (
                <a
                  href={`${FILE_BASE_URL}${existingFileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-neutral-900"
                >
                  {existingFileName}
                </a>
              ) : (
                <span>{existingFileName}</span>
              )}
              <span className="text-neutral-400">(current — click drop zone to replace)</span>
            </div>
          )}

          <input
            ref={inputRef}
            type="file"
            hidden
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {attachments.length > 0 && (
          <div className="mt-3 text-xs text-neutral-500">
            Attached to:{" "}
            {attachments
              .map((a) =>
                a.entityType === "Topic" && a.topic
                  ? a.topic.name
                  : `${a.entityType} #${a.entityId}`
              )
              .join(", ")}
          </div>
        )}
      </div>

      {/* -------- Education Flow -------- */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Curriculum */}
        <select
          className="border rounded-lg px-3 py-2"
          value={curriculumId ?? ""}
          onChange={(e) =>
            setCurriculumId(e.target.value ? Number(e.target.value) : null)
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
            setEducationLevelId(e.target.value ? Number(e.target.value) : null)
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
            setGradeLevelId(e.target.value ? Number(e.target.value) : null)
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
            setSubjectId(e.target.value ? Number(e.target.value) : null)
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
            setTopicId(e.target.value ? Number(e.target.value) : null)
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
          {isEditMode ? "Save Changes →" : "Save & Submit →"}
        </button>
      </div>
    </div>
  );
}