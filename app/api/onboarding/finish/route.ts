import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Required fields
    // const requiredFields = [
    //   "userId",
    //   "userRole", // dynamic user role
    //   "schoolName",
    //   "schoolEmail",
    //   "county",
    //   "city",
    //   "address",
    //   "adminEmail",
    //   "adminPhone",
    // ];

    // for (const field of requiredFields) {
    //   if (!data[field]) {
    //     return NextResponse.json(
    //       { success: false, message: `${field} is required` },
    //       { status: 400 }
    //     );
    //   }
    // }

    // Backend endpoint for finishing onboarding
    const backendUrl = `${process.env.BACKEND_API_URL}/Auth/register/complete`;

    const response = await axiosClient.post(backendUrl, data);

    console.log("Finish onboarding response:", response.data);

    // Determine next route dynamically based on userRole
    let nextRoute = "/onboarding"; // default fallback
    switch (data.userRole) {
      case "teacher":
        nextRoute = "/teacher/dashboard";
        break;
      case "student":
        nextRoute = "/student/dashboard";
        break;
      case "parent":
        nextRoute = "/parent/dashboard";
        break;
      case "schoolAdmin":
        nextRoute = "/school";
        break;
      case "admin":
        nextRoute = "/admin/dashboard";
        break;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Onboarding completed successfully",
        data: response.data,
        nextRoute,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Finish onboarding error:", error.response || error);

    if (error.response) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.response.data?.message || "Failed to finish onboarding",
        },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { success: false, message: "Unable to connect to backend: " + error.message },
      { status: 502 }
    );
  }
}
