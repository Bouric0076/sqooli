import axiosClient from "@/app/lib/axiosClient";
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
