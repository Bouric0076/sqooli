import axiosClient from "@/app/lib/axiosClient";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  try {

    const curriculumId = (await cookies()).get("curriculumId")?.value;

// console.log(curriculumId)

    const backendUrl = `${process.env.BACKEND_API_URL}/Lesson?curriculumId=`+curriculumId;
    //console.log(backendUrl)

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Lesson error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Lessons",
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
