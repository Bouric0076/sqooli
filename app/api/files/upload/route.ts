import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Read as FormData
    const formData = await req.formData();

    const backendUrl = `${process.env.BACKEND_API_URL}/files/upload`;

    // ✅ Forward FormData directly to backend
    const res = await axiosClient.post(backendUrl, formData, {
      headers: {
        // Let axios set the boundary automatically
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("file upload response:", res.data);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("file upload error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to file upload",
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
