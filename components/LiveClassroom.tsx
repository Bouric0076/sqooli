"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Video, VideoOff, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveClassroom() {
  const [classStarted, setClassStarted] = useState(false);

  const studentsOnline = ["Jane Doe", "Brian Kim", "Aisha Noor"];

  // Jitsi room (dynamic in real app)
  const ROOM_NAME = "sqooli-live-class-123";

  return (
    <div className="h-screen flex bg-gray-50">
      {/* MAIN AREA */}
      <div className="flex-1 relative overflow-hidden bg-black">
        <AnimatePresence>
          {!classStarted && (
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
          <iframe
            src={`https://meet.jit.si/${ROOM_NAME}#config.disableDeepLinking=true`}
            allow="camera; microphone; fullscreen; display-capture"
            className="absolute inset-0 w-full h-full border-none"
          />
        )}
      </div>

      {/* SIDEBAR */}
      <div className="w-[300px] bg-white border-l flex flex-col">
        {/* Teacher Controls */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-semibold mb-3">Teacher Controls</h3>

          {!classStarted ? (
            <Button className="w-full" onClick={() => setClassStarted(true)}>
              <Video className="w-4 h-4 mr-2" /> Start Class
            </Button>
          ) : (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setClassStarted(false)}
            >
              <VideoOff className="w-4 h-4 mr-2" /> End Class
            </Button>
          )}
        </div>

        {/* Students */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 border-b flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="text-sm font-semibold">Students Online</span>
            <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
              {studentsOnline.length}
            </span>
          </div>

          <ul className="p-2">
            {studentsOnline.map((student) => (
              <li
                key={student}
                className="px-3 py-2 text-sm rounded hover:bg-gray-100"
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
