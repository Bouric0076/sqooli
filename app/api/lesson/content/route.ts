import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    if (!lessonId) {
      return NextResponse.json({ sections: [] }, { status: 200 });
    }

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/lesson-content/${lessonId}`
    );

    return NextResponse.json(
      {
        sections: Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data?.sections)
          ? res.data.sections
          : [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET lesson content failed", err);
    return NextResponse.json({ sections: [] }, { status: 200 });
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body?.lessonId || !Array.isArray(body.sections)) {
      return NextResponse.json(
        { message: "lessonId and sections are required" },
        { status: 400 }
      );
    }

    // 🔥 IMPORTANT: correct backend route
    await axiosClient.put(
      `${process.env.BACKEND_API_URL}/lesson-content/replace`,
      body
    );

    // 🔒 UI expects success, nothing else
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Lesson content PUT error:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { message: "Failed to save lesson content" },
      { status: 500 }
    );
  }
}
