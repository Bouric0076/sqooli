"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { PrimaryButton } from "@/app/components/ui/form/PrimaryButton";
import { TextInput } from "@/app/components/ui/form/TextInput";
import { FormField } from "@/app/components/ui/form/FormField";

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleAccept = async () => {
    if (!token) {
      setError("Invalid or missing invitation token");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/invitations/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 space-y-5">
        <h1 className="text-xl font-semibold text-center">Accept Invitation</h1>

        {!token && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
            <XCircle className="w-5 h-5" />
            Invalid invitation link
          </div>
        )}

        {success ? (
          <div className="flex flex-col items-center gap-3 text-green-600 bg-green-50 p-4 rounded">
            <CheckCircle className="w-6 h-6" />
            <span className="text-sm font-medium">
              Invitation accepted successfully
            </span>
          </div>
        ) : (
          token && (
            <>
              <FormField label="Set Password">
                <TextInput
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormField>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                  {error}
                </div>
              )}

              <PrimaryButton
                className="w-full"
                onClick={handleAccept}
                disabled={loading || !password}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Accept Invitation"
                )}
              </PrimaryButton>
            </>
          )
        )}
      </div>
    </div>
  );
}
