import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendUrl = `${process.env.BACKEND_API_URL}/teacher/accept-teacher-invite`;

    const res = await axiosClient.post(backendUrl, body);
    console.log("Accept invitation response:", res.data);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Accept invitation error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to accept invitation",
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
