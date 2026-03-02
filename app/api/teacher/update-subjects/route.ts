import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    // Use your backend API URL
    const backendUrl = `${process.env.BACKEND_API_URL}/Auth/update-subjects`;

    const res = await axiosClient.put(backendUrl, body);

    console.log(res);
    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "Update subjects error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to update subjects",
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