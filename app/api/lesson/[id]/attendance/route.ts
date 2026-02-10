import axiosClient from "@/app/lib/axiosClient";
import { Console } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {

   // console.log("PARAMS:", await context.params);
    const { id } = await  context.params;

    const lessonIdNum = Number(id);
    const lessonId = id;

    

//     console.log("PARAMS:", context.params);
// console.log("lessonId raw value:", lessonId, typeof lessonId);


    if(isNaN(lessonIdNum)) {
      return NextResponse.json(
        { message: "Invalid lessonId" },
        { status: 400 }
      );
    }
      // console.log("Converted lessonId to number:", lessonIdNum);
    if (Number.isNaN(lessonId)) {
      return NextResponse.json(
        { message: "Invalid lessonId" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/Lesson/${lessonId}/attendance`;
    console.log("Fetching Attendance from backend URL:", backendUrl);

    const { searchParams } = new URL(req.url);

    const res = await axiosClient.get(backendUrl, {
      params: Object.fromEntries(searchParams),
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Attendance error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch attendance",
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
