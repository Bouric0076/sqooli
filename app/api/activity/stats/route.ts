import axiosClient from "@/app/lib/axiosClient";
import { NextResponse } from "next/server";

export async function GET() {

    try {

        const response = await axiosClient.get(
            `${process.env.BACKEND_API_URL}/activity-logs/stats`
        );

        return NextResponse.json(response.data);

    } catch (error: any) {

        return NextResponse.json(
            {
                message:
                    error.response?.data?.message ??
                    "Failed to fetch activity stats",
            },
            {
                status: error.response?.status ?? 500,
            }
        );
    }
}