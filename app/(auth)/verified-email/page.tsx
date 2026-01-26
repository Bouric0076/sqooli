"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Sparkles, ArrowRight } from "lucide-react";

export default function EmailVerified() {
  const [showContent, setShowContent] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Animate content in
    setTimeout(() => setShowContent(true), 100);

    // Countdown timer for auto-redirect
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          // Redirect to dashboard (replace with your actual route)
          // window.location.href = '/dashboard';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div
          className={`bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 transition-all duration-700 transform ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          {/* Success Icon with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle
                  className="w-14 h-14 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-xl font-bold text-gray-900 mb-4">
              Email Verified Successfully! 🎉
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Your email has been confirmed and your account is now active.
            </p>
            <p className="text-gray-500">Welcome to the community!</p>
          </div>

          {/* Feature Highlights */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8 border border-blue-100">
            <h2 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              You now have access to:
            </h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Full access to your personalized dashboard</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>All premium features and tools</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Priority customer support</span>
              </li>
            </ul>
          </div>

          {/* Auto-redirect Notice */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
            <p className="text-sm text-blue-800 text-center">
              Redirecting to your dashboard in{" "}
              <span className="font-bold text-blue-900">{countdown}</span>{" "}
              seconds...
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </button>
            {/* <button className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border border-gray-300 transition-colors">
              Explore Features
            </button> */}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Need help getting started?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                View our quick start guide
              </a>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <p className="text-center text-sm text-gray-500 mt-6">
          You can bookmark this page or close it safely
        </p>
      </div>
    </div>
  );
}
