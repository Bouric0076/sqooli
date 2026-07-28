"use client";
import { useAuthStore } from "@/app/store/useAuthStore";
import {
  ChevronDown,
  MessageSquare,
  Bell,
  ShoppingCart,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import InviteComponent from "../invite/InviteComponent";

export default function AdminTopmenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { user, activeSchool } = useAuthStore();

  // Close dropdown on outside click
  useEffect(() => {
    // if (user?.userType !== "SchoolAdmin") {
    //   router.push("/onboarding");
    // }

    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const logout = useAuthStore.getState().logout;
    await fetch("/api/auth/logout", { method: "POST" });
    logout(); // clears state & cookie
    router.push("/login"); // navigate after logout
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
          Super Admin
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
         {/* <InviteComponent /> */}
        {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button> */}
        {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <MessageSquare className="w-5 h-5 text-gray-600" />
        </button> */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
        </button>
        {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ShoppingCart className="w-5 h-5 text-gray-600" />
        </button> */}
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1"></div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-gray-200"></div>
            </div>
            <span className="text-sm font-medium text-gray-800">{user?.firstName}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {user?.firstName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/profile");
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
              >
                <User className="w-4 h-4" />
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
