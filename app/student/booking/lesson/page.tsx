"use client";

import { getLessonBasicInfo } from "@/app/lib/lessonContent";
import { useCurriculumStore } from "@/app/store/useCurriculumStore";
import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, BookOpen, CreditCard } from "lucide-react";

export default function BookingPage() {
  const { activeLesson } = useCurriculumStore();

  const [lessonId, setLessonId] = useState<number | null>(
    activeLesson?.id ?? null
  );
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  useEffect(() => {
    setLessonId(activeLesson?.id ?? null);
  }, [activeLesson?.id]);

  useEffect(() => {
    if (!lessonId) return;

    setLoading(true);
    getLessonBasicInfo(lessonId)
      .then((res) => {
        setLesson(res.data);
      })
      .finally(() => setLoading(false));
  }, [lessonId]);

  const handlePaystackPayment = async () => {
    try {
      setPayLoading(true);

      const res = await fetch("/api/payments/paystack/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          amount: lesson.price,
          email: "student@email.com", // replace with logged-in user email
          lessonName: lesson.name,
        }),
      });

      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Failed to generate payment link");
      }
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed");
    } finally {
      setPayLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  if (!lesson) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Lesson Booking</h3>

      <div className="bg-white shadow-xl rounded-2xl grid md:grid-cols-3 gap-6 overflow-hidden">
        {/* Lesson Info */}
        <div className="md:col-span-2 p-6 space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <BookOpen className="text-blue-600" />
            {lesson.name}
          </h2>

          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: lesson.description }}
          />

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-blue-600 w-4 h-4" />
              {new Date(lesson.start).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-blue-600 w-4 h-4" />
              {new Date(lesson.start).toLocaleTimeString()} -{" "}
              {new Date(lesson.end).toLocaleTimeString()}
            </div>

            <div>
              <strong>Subject:</strong> {lesson.subject}
            </div>
            <div>
              <strong>Level:</strong> {lesson.gradeLevel}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Assigned Teacher</h4>
            {lesson.assignedTeachers?.map((t: any) => (
              <div key={t.teacherId} className="flex items-center gap-2">
                <User className="w-4 h-4 text-green-600" />
                {t.name} ({t.email})
              </div>
            ))}
          </div>
        </div>

        {/* Payment Card */}
        <div className="bg-gray-50 p-6 border-l flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold">Payment Summary</h3>
            <p className="text-gray-500 text-sm mt-1">
              Complete payment to book this lesson
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-3xl font-bold text-blue-600">
              KES {lesson.price}
            </p>
          </div>

          <button
            onClick={handlePaystackPayment}
            disabled={payLoading}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition disabled:opacity-50"
          >
            <CreditCard className="w-5 h-5" />
            {payLoading ? "Redirecting to Paystack..." : "Pay with Paystack"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            You will be redirected to Paystack to complete payment securely.
          </p>
        </div>
      </div>
    </div>
  );
}
