import { NextRequest, NextResponse } from "next/server";
import axiosClient from "@/app/lib/axiosClient";

/* ================= GET ================= */
// Fetch Enrollments optionally by lessonId query
export async function GET(
  req: NextRequest,
  context: { params: { enrollmentId: string } }
) {
  try {

   console.log("PARAMS:", await context.params);
    const { enrollmentId } = await  context.params;
    const EnrollmentId = Number(enrollmentId);

    console.log("enrollmentId ID:", EnrollmentId);


    // If no assignemntis, return empty list
    if (!EnrollmentId) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    const res = await axiosClient.get(
      `${process.env.BACKEND_API_URL}/Enrollment/${EnrollmentId}/status`
    );


    return NextResponse.json(
res.data,
    );
  } catch (err) {
    console.error("GET Enrollment failed", err);
    return NextResponse.json({ Enrollments: [] }, { status: 200 });
  }
}
