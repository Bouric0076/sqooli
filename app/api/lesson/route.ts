import axiosClient from "@/app/lib/axiosClient";
import { stat } from "fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendUrl = `${process.env.BACKEND_API_URL}/Lesson`;

    const res = await axiosClient.post(backendUrl, body);



    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Lesson error:",  error.response.data);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to add lesson",
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

/* =======================
   FETCH LESSON(S) (GET)
======================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    // If id exists → fetch single lesson
    const backendUrl = id
      ? `${process.env.BACKEND_API_URL}/Lesson/${id}` : token
      ? `${process.env.BACKEND_API_URL}/Lesson/token/${token}`
      : `${process.env.BACKEND_API_URL}/Lesson`;

      console.log("Fetching from backend URL:", backendUrl);
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Lesson GET error:", error.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        {
          status: false,
          message:
            error.response.data?.message || "Failed to fetch lesson(s)",
            error: error.response.data || null,
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