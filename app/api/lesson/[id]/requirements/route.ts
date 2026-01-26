import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id: lessonId } = await context.params; // ✅ no await




    if (!lessonId) {
      return NextResponse.json(
        { message: "lessonId is required" },
        { status: 400 }
      );
    }

    const body = await req.json(); // ✅ use req, not _req



    const backendUrl = `${process.env.BACKEND_API_URL}/Lesson/${lessonId}/requirements`;

    console.log("Calling backend URL:", backendUrl);

    const res = await axiosClient.put(backendUrl, {
        lessonId:lessonId,
        requirements:body?.requirements

    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "Update lesson requirements error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to update lesson requirements",
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
