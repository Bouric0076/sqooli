import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = `${process.env.BACKEND_API_URL}/CPrograms`;
    console.log("Fetching CPrograms with params:", Object.fromEntries(searchParams));
    console.log("Backend API URL:", endpoint);
    const res = await axiosClient.get(
      endpoint,
      {
        params: Object.fromEntries(searchParams),
      }
    );

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("CPrograms error:", error);

    if (error.response) {
      return NextResponse.json(
        { message: error.response.data?.message || "Failed to fetch CPrograms api " },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}


export async function POST(req: Request) {
  try {
    const body = await req.json();
    let backendUrl = `${process.env.BACKEND_API_URL}/CPrograms`;
    if(body.programId) {
       backendUrl = `${process.env.BACKEND_API_URL}/CPrograms/${body.programId}`;
    }

    const res = await axiosClient.post(backendUrl, body);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error(
      "program error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to add program",
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