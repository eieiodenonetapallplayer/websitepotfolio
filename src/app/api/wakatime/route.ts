import { NextResponse } from "next/server";

const WAKA_API_KEY = process.env.WAKA_API_KEY;

if (!WAKA_API_KEY) {
  throw new Error("WAKA_API_KEY is not defined in environment variables");
}

export async function GET() {
  try {
    const encodedKey = Buffer.from(WAKA_API_KEY as string, "utf-8").toString(
      "base64"
    );
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/last_7_days",
      {
        headers: {
          Authorization: `Basic ${encodedKey}`,
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching WakaTime stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch WakaTime stats" },
      { status: 500 }
    );
  }
}
