import { useState } from "react";

export function CreateTeacherModal({ open, onClose, onSave, defaultData }) {
  const [name, setName] = useState(defaultData?.name || "");
  const [phone, setPhone] = useState(defaultData?.phone || "");
  const [email, setEmail] = useState(defaultData?.email || "");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white w-[400px] rounded-2xl p-6 shadow-xl">
        <h2 className="text-[16px] font-bold mb-4">Add Teacher</h2>

        <div className="flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="border rounded-xl px-3 py-2 text-sm outline-none"
          />

          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className="border rounded-xl px-3 py-2 text-sm outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="border rounded-xl px-3 py-2 text-sm outline-none"
          />

        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => {
              if (!name || !phone) return;

              onSave({ name, phone,email });
            }}
            className="flex-1 bg-[#3B9EFF] text-white py-2 rounded-xl text-sm font-bold"
          >
            Save
          </button>

          <button
            onClick={onClose}
            className="px-3 py-2 bg-[#E2E8F0] rounded-xl text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}