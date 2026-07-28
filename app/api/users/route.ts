import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

/* ================= GET ================= */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const backendUrl = `${process.env.BACKEND_API_URL}/Users?page=${page}&pageSize=${pageSize}&search=${search}&role=${role}`;

    const res = await axiosClient.get(backendUrl);

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Users error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message || "Failed to fetch Users",
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

/* ================= POST ================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const response = await axiosClient.post(
      `${process.env.BACKEND_API_URL}/Users`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data,
         message: response?.data?.message
       },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("User creation failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to create user" },
      { status: error?.response?.status || 500 }
    );
  }
}

/* ================= PUT ================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "User id is required for update" },
        { status: 400 }
      );
    }

    const response = await axiosClient.put(
      `${process.env.BACKEND_API_URL}/Users/${body.id}`,
      body
    );

    return NextResponse.json(
      { success: true, data: response.data, message: response?.data?.message },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("User update failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to update user" },
      { status: error?.response?.status || 500 }
    );
  }
}

/* ================= DELETE ================= */
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "User id is required for delete" },
        { status: 400 }
      );
    }

   const response = await axiosClient.delete(
      `${process.env.BACKEND_API_URL}/Users/${body.id}`
    );

    return NextResponse.json({ success: true, message: response?.data?.message }, { status: 200 });
  } catch (error: any) {
    console.error("User delete failed:", error?.response?.data || error.message);

    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to delete user" },
      { status: error?.response?.status || 500 }
    );
  }
}