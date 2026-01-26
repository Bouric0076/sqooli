import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lessonId = searchParams.get("lessonId");
    const page = searchParams.get("page") ?? "1";
    const pageSize = searchParams.get("pageSize") ?? "100";

    if (!lessonId) {
      return NextResponse.json(
        { message: "lessonId is required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/LessonObjectives`;

    const res = await axiosClient.get(backendUrl, {
      params: {
        lessonId,
        page,
        pageSize,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("LessonObjectives GET error:", error?.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch lesson objectives" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json(); // { lessonId: number, objectives: string[] }

    if (!body?.lessonId || !Array.isArray(body.objectives)) {
      return NextResponse.json(
        { message: "lessonId and objectives are required" },
        { status: 400 }
      );
    }

    const backendUrl = `${process.env.BACKEND_API_URL}/LessonObjectives/bulk-replace`;

    const res = await axiosClient.put(backendUrl, body);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("LessonObjectives BULK REPLACE error:", error?.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to save lesson objectives" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}
