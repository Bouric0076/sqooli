import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");

    // UI safe fallback
    if (!lessonId) {
      return NextResponse.json(
        { price: 0, revenueShares: [] },
        { status: 200 }
      );
    }

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/lesson-revenue-share/${lessonId}/pricing`
    );

    const data = res.data?.data;

    return NextResponse.json(
      {
        price: data?.price ?? 0,
        revenueShares: Array.isArray(data?.revenueShares)
          ? data.revenueShares
          : [],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET lesson pricing failed", err);

    // UI should never break
    return NextResponse.json(
      { price: 0, revenueShares: [] },
      { status: 200 }
    );
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body?.lessonId || typeof body.price !== "number") {
      return NextResponse.json(
        { message: "lessonId and price are required" },
        { status: 400 }
      );
    }

    await axiosClient.put(
      `${process.env.BACKEND_API_URL}/lesson-revenue-share/${body.lessonId}/pricing`,
      {
        price: body.price,
        revenueShares: Array.isArray(body.revenueShares)
          ? body.revenueShares
          : [],
      }
    );

    // 🔒 UI expects minimal success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error(
      "Lesson pricing PUT error:",
      error?.response?.data || error.message
    );

    return NextResponse.json(
      { message: "Failed to save lesson pricing" },
      { status: 500 }
    );
  }
}
