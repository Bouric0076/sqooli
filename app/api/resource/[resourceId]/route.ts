import axiosClient from "@/app/lib/axiosClient";
import { stat } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {

        const { resourceId } = await params;



    // If id exists → fetch single Resource
    const backendUrl = `${process.env.BACKEND_API_URL}/Resource/${resourceId}`;

      console.log("Fetching from backend URL:", backendUrl);
    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Resource GET error:", error.response?.data || error.message);

    if (error.response) {
      return NextResponse.json(
        {
          status: false,
          message:
            error.response.data?.message || "Failed to fetch Resource(s)",
            error: error.response.data || null,
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


export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ resourceId: string }> }
) {
  try {
    const { resourceId } = await params;
    const body = await req.json();


    const res = await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Resource/${resourceId}`,
      body
    );

    return NextResponse.json(
      { success: true, data: res.data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Resources update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: "Resources update failed " + error.message },
      { status: 500 }
    );
  }
}