"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Video, VideoOff, Clock, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveClassroom() {
  const [classStarted, setClassStarted] = useState(false);
  const [meetOpened, setMeetOpened] = useState(false);

  const [studentsOnline] = useState<string[]>([
    "Jane Doe",
    "Brian Kim",
    "Aisha Noor",
  ]);

  // ⚠️ Keep this server-side in production
  const MEET_LINK = "https://meet.google.com/dnx-igqy-woq";

  const openMeet = () => {
    window.open(
      MEET_LINK,
      "_blank",
      "noopener,noreferrer,width=1400,height=900"
    );
    setMeetOpened(true);
  };

  const startClass = () => {
    setClassStarted(true);
    openMeet();
  };

  const endClass = () => {
    setClassStarted(false);
    setMeetOpened(false);
    // backend: mark class ended + disconnect users
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* LEFT: Main Classroom Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {!classStarted && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Card className="w-[440px] text-center shadow-xl">
                <CardContent className="p-8">
                  <Clock className="w-10 h-10 mx-auto mb-4 text-gray-400" />
                  <h2 className="text-xl font-bold mb-2">
                    Class hasn’t started yet
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Please wait for the teacher to start the session
                  </p>
                  <div className="text-xs text-gray-500">
                    Connected • {studentsOnline.length} students waiting
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {classStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white"
          >
            <Card className="w-[500px] text-center bg-gray-900 border-gray-700">
              <CardContent className="p-8">
                <Video className="w-12 h-12 mx-auto mb-4 text-green-400" />
                <h2 className="text-xl font-bold mb-2">
                  Live class is in progress
                </h2>
                <p className="text-sm text-gray-300 mb-6">
                  The video session has opened in a new window.
                </p>

                <Button
                  variant="secondary"
                  onClick={openMeet}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Reopen Video
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* RIGHT: Sidebar */}
      <div className="w-[300px] bg-white border-l flex flex-col">
        {/* Teacher Controls */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-semibold mb-3">Teacher Controls</h3>

          {!classStarted ? (
            <Button className="w-full" onClick={startClass}>
              <Video className="w-4 h-4 mr-2" /> Start Class
            </Button>
          ) : (
            <Button variant="destructive" className="w-full" onClick={endClass}>
              <VideoOff className="w-4 h-4 mr-2" /> End Class
            </Button>
          )}
        </div>

        {/* Students List */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 border-b flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Students Online</span>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
              {studentsOnline.length}
            </span>
          </div>

          <ul className="p-2 space-y-1">
            {studentsOnline.map((student) => (
              <li
                key={student}
                className="px-3 py-2 rounded hover:bg-gray-100 text-sm"
              >
                {student}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
