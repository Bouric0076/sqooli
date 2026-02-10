import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";
/* =======================
   FETCH LESSON(S) (GET)
======================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // If id exists → fetch single lesson
    const backendUrl = `${process.env.BACKEND_API_URL}/LessonBooking`;

    const res = await axiosClient.get(backendUrl);

  //  console.log("LessonBooking GET response:", res.data);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("LessonBooking GET error:", error.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch LessonBooking(s)",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}