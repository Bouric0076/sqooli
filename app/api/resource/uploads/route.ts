import { NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
// Fetch assignments optionally by lessonId query
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    // If no lessonId, return empty list
    // if (!lessonId) {
    //   return NextResponse.json({ assignments: [] }, { status: 200 });
    // }

    console.log("Fetching resources with type:", type);
    const endpoint =  `${process.env.BACKEND_API_URL}/Resource/resource/${type}`;
    console.log("GET resources endpoint:", endpoint);

    const res = await axiosClient.get(endpoint);

    console.log("GET resources response:", res.data);

    return NextResponse.json(res.data, { status: 200 });

  } catch (err) {
    console.error("GET resources faile", err);
    return NextResponse.json({ assignments: [] }, { status: 200 });
  }
}