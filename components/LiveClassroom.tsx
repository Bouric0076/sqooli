"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Video, VideoOff, Clock, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { JaaSMeeting } from "@jitsi/react-sdk";

import {
  startLesson,
  endLesson,
  joinLesson,
  getAttendance,
  getLessonStatus,
} from "@/app/lib/lessonLive";

/* ---------------- TYPES ---------------- */
type UserRole = "Teacher" | "Student";

interface LiveClassroomProps {
  roomToken: string;
  jwt?: string | null;
  role: UserRole;
  lessonId: string;
}

interface AttendanceStudent {
  studentId: number;
  fullName: string;
  joinedAt: string;
}

/* --------------- COMPONENT -------------- */
export default function LiveClassroom({
  roomToken,
  jwt,
  role,
  lessonId,
}: LiveClassroomProps) {
  const [classStarted, setClassStarted] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [attendance, setAttendance] = useState<AttendanceStudent[]>([]);

  const apiRef = useRef<any>(null);

  /* 🎥 VISIBILITY LOGIC */
  const canViewClass =
    role === "Teacher" ? classStarted : classStarted && hasJoined;

  /* ------------------ ATTENDANCE (TEACHER) ------------------ */
  const fetchAttendance = async () => {
    try {
      const res = await getAttendance(lessonId);
      const json = await res.json();
      setAttendance(json.data ?? []);
    } catch (err) {
      console.error("Failed to load attendance", err);
    }
  };

  useEffect(() => {
    if (role !== "Teacher" || !classStarted) return;

    fetchAttendance();
    const interval = setInterval(fetchAttendance, 5000);
    return () => clearInterval(interval);
  }, [role, classStarted]);

  useEffect(() => {
    // if (role !== "Student") return;

    let cancelled = false;

    const checkStatus = async () => {
      try {
        const res = await getLessonStatus(roomToken);
        const data = await res.data;

        if (!cancelled) {
          setClassStarted(data.started);
        }
      } catch (err) {
        console.error("Failed to fetch lsesson status", err);
      }
    };

    checkStatus(); // initial load
    const interval = setInterval(checkStatus, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [role, lessonId]);

  /* ------------------ JITSI SETUP ------------------ */
  const jitsiDomain =
    "8x8.vc/vpaas-magic-cookie-f86647c2c5a142a5ab7ec9e35af60f88";

  const forceJitsiFullHeight = () => {
    const el = document.querySelector(
      '[id^="jitsiMeeting-"]'
    ) as HTMLElement | null;

    if (!el) return;

    el.style.height = "100vh";
    el.style.width = "100%";
    el.style.position = "absolute";
    el.style.inset = "0";
  };

  useEffect(() => {
    const i = setInterval(forceJitsiFullHeight, 500);
    return () => clearInterval(i);
  }, []);

  /* ------------------ AUTO-START FOR TEACHER ------------------ */
  // useEffect(() => {
  //   if (role === "Teacher") {
  //     setClassStarted(true);
  //   }
  // }, [role]);

  return (
    <div className="h-screen flex bg-gray-50 relative overflow-hidden">
      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 relative">
        {/* TOGGLE MENU */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          className="absolute top-4 right-4 z-50 bg-white/90 hover:bg-white shadow rounded-full p-2"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* WAITING SCREEN */}
        <AnimatePresence>
          {!canViewClass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="w-[440px] text-center shadow-xl">
                <CardContent className="p-8">
                  <Clock className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                  <h2 className="text-xl font-bold mb-2">
                    {role === "Teacher"
                      ? "Start the class when ready"
                      : "Class hasn’t started yet"}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {role === "Teacher"
                      ? "Students will join once you start"
                      : "Waiting for the teacher"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* JITSI */}
        {canViewClass && jwt && (
          <JaaSMeeting
            roomName={roomToken}
            jwt={jwt}
            configOverwrite={{
              startWithAudioMuted: false,
              startWithVideoMuted: false,
              disableDeepLinking: true,
              prejoinPageEnabled: false,
            }}
            interfaceConfigOverwrite={{
              TOOLBAR_BUTTONS: [
                "microphone",
                "camera",
                "desktop",
                "hangup",
                "chat",
                "participants",
                "tileview",
              ],
            }}
            onApiReady={(api) => {
              apiRef.current = api;
              forceJitsiFullHeight();
            }}
            appId={"vpaas-magic-cookie-f86647c2c5a142a5ab7ec9e35af60f88"}
          />
        )}
      </div>

      {/* ================= SIDEBAR ================= */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            className="w-[300px] bg-white border-l absolute right-0 top-0 h-full z-40"
          >
            <div className="p-4 border-b font-semibold">
              {role === "Teacher" ? "Teacher Panel" : "Class Panel"}
            </div>

            {/* ACTION BUTTON */}
            <div className="p-4 border-b">
              {role === "Teacher" ? (
                <Button
                  variant={classStarted ? "destructive" : "default"}
                  className="w-full"
                  onClick={async () => {
                    if (classStarted) {
                      await endLesson(String(lessonId));
                      setClassStarted(false);
                    } else {
                      await startLesson(lessonId);
                      setClassStarted(true);
                    }
                  }}
                >
                  {classStarted ? <VideoOff /> : <Video />}
                  <span className="ml-2">
                    {classStarted ? "End Class" : "Start Class"}
                  </span>
                </Button>
              ) : (
                <Button
                  className="w-full"
                  disabled={!classStarted}
                  onClick={async () => {
                    if (!hasJoined) {
                      await joinLesson(String(lessonId));
                      setHasJoined(true);
                    } else {
                      setHasJoined(false);
                    }
                  }}
                >
                  {hasJoined ? <VideoOff /> : <Video />}
                  <span className="ml-2">
                    {hasJoined ? "Leave Class" : "Join Class"}
                  </span>
                </Button>
              )}
            </div>

            {/* ATTENDANCE */}
            {role === "Teacher" && (
              <>
                <div className="p-4 border-b flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Attendance</span>
                  <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 rounded">
                    {attendance.length}
                  </span>
                </div>

                <ul className="p-2 overflow-auto">
                  {attendance.map((s) => (
                    <li
                      key={s.studentId}
                      className="px-3 py-2 text-sm rounded hover:bg-gray-100"
                    >
                      <div className="font-medium">{s.fullName}</div>
                      <div className="text-xs text-gray-500">
                        Joined {new Date(s.joinedAt).toLocaleTimeString()}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
