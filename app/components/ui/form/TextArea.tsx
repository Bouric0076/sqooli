"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

type TextAreaProps = {
  value?: string;
  name?: string; // ✅ important for RHF
  onChange?: (value: any) => void;
  placeholder?: string;
};

export function TextArea({
  value = "",
  name,
  onChange,
  placeholder = "Write something...",
}: TextAreaProps) {
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value || "");
  }, [value]);

  return (
    <div className="w-full rounded-xl border border-gray-300 focus-within:ring-1 focus-within:ring-blue-400 overflow-hidden">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        config={{
          licenseKey: "GPL",
          placeholder,
          toolbar: [
            "bold",
            "italic",
            "underline",
            "bulletedList",
            "numberedList",
            "link",
            "undo",
            "redo",
          ],
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          setContent(data);

          // ✅ Support both normal and RHF-style handlers
          if (!onChange) return;

          if (name) {
            onChange({
              target: {
                name,
                value: data,
              },
            });
          } else {
            onChange(data);
          }
        }}
      />
    </div>
  );
}
