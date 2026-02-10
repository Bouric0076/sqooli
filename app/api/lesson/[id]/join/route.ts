import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {

   // console.log("PARAMS:", await context.params);
    const { id } = await  context.params;

    const lessonIdNum = Number(id);
    const lessonId = id;
    const res = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Lesson/${lessonId}/join`
    );

    console.log("Join Lesson response data:", res.data);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {

    console.error("Join Lesson error:", error);
    return NextResponse.json(
      { message: error.response?.data?.message || "Failed to join lesson" },
      { status: error.response?.status || 500 }
    );
  }
}
