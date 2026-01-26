"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

type TextAreaProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function TextArea({ value, onChange, placeholder }: TextAreaProps) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Placeholder.configure({ placeholder })],
    content: value ?? "",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "min-h-[120px] p-2 text-sm outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="w-full rounded-xl border border-gray-300 focus-within:ring-1 focus-within:ring-blue-400">
      {/* Toolbar */}
      <div className="flex gap-2 p-2 border-b bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : ""
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : ""
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("underline") ? "bg-blue-500 text-white" : ""
          }`}
        >
          U
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bulletList") ? "bg-blue-500 text-white" : ""
          }`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("orderedList") ? "bg-blue-500 text-white" : ""
          }`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter link URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`px-2 py-1 rounded ${
            editor.isActive("link") ? "bg-blue-500 text-white" : ""
          }`}
        >
          🔗
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          className="px-2 py-1 rounded"
        >
          ❌ Link
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
