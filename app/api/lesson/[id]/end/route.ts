import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  try {

    const { id } = await  context.params;

    const lessonId = id;
    // const { id } = await  context.params;
console.log("END LESSON PARAMS:", lessonId);



    const res = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Lesson/${lessonId}/end`
    );


    console.log("End Lesson response data:", res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {

    console.error("End Lesson error:", error);
    return NextResponse.json(
      { message: error.response?.data?.message || "Failed to end lesson" },
      { status: error.response?.status || 500 }
    );
  }
}
