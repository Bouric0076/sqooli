"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/app/store/useAuthStore";
import { HandshakeIcon } from "lucide-react";

function InviteComponent() {
  const { user } = useAuthStore();
  const referralCode = user?.referralCode;

  const referralLink = referralCode
    ? `https://sqooli.africa/register?ref=${referralCode}`
    : "";

  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const addEmail = () => {
    const email = emailInput.trim().toLowerCase();

    if (!email) return;

    if (!isValidEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (emails.includes(email)) {
      setError("Email already added");
      return;
    }

    setEmails([...emails, email]);
    setEmailInput("");
    setError(null);
  };

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email));
  };

  const handleSendInvites = async () => {
    if (emails.length === 0) {
      setError("Please add at least one email");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emails,
          referralLink,
        }),
      });

      if (!res.ok) throw new Error("Failed to send invites");

      setSuccess("Invitations sent successfully!");
      setEmails([]);

      setTimeout(() => {
        setOpen(false);
        setSuccess(null);
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Card */}

      <button
        onClick={() => setOpen(true)}
        className="bg-purple-500 px-3 py-1 text-sm text-white rounded-lg border hover:bg-blue-500 hover:text-gray-70"
      >
        <div className="flex items-center gap-1 ">
          <HandshakeIcon className="w-5 h-5 " /> Invite & Earn
        </div>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-full max-w-md space-y-4">
            <h3 className="font-semibold text-lg">Invite friends</h3>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter email and press Add"
                className="flex-1 border rounded px-2 py-1 text-sm"
                onKeyDown={(e) => e.key === "Enter" && addEmail()}
              />
              <button
                onClick={addEmail}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Add
              </button>
            </div>

            {/* Email chips */}
            <div className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <span
                  key={email}
                  className="bg-gray-100 border rounded-full px-3 py-1 text-xs flex items-center gap-2"
                >
                  {email}
                  <button
                    onClick={() => removeEmail(email)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSendInvites}
                className="px-3 py-1  bg-purple-600 text-white rounded text-sm disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Invites"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InviteComponent;
