import axiosClient from "@/app/lib/axiosClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { message: "Payment reference is required" },
        { status: 400 }
      );
    }

    /**
     * Backend endpoint should:
     * - Call Paystack verify endpoint
     * - Validate transaction
     * - Return normalized response
     */
    const backendUrl = `${process.env.BACKEND_API_URL}/payment/paystack/verify`;

    const res = await axiosClient.get(backendUrl, {
      params: { reference },
    });

    console.log("Paystack verification response:", res.data);
    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("Paystack verification error:", error);

    if (error.response) {
      return NextResponse.json(
        {
          message:
            error.response.data?.message ||
            "Failed to verify Paystack payment",
        },
        { status: error.response.status },
      );
    }

    return NextResponse.json(
      { message: "Unable to connect to backend: " + error.message },
      { status: 502 },
    );
  }
}
