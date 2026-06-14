import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  try {

    const curriculumId = (await cookies()).get("curriculumId")?.value;

// console.log(curriculumId)

    const backendUrl = curriculumId
      ? `${process.env.BACKEND_API_URL}/Lesson?curriculumId=${curriculumId}`  
      : `${process.env.BACKEND_API_URL}/Lesson`;
    //console.log(backendUrl)

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Lesson error:", error);

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
