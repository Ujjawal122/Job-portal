import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // clear cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // expire immediately
      path: "/", // important!
    });

    return response;
  } catch (error: any) {
    console.error("Logout error:", error.message);
    return NextResponse.json(
      { error: "Logout failed" },
      { status: 500 }
    );
  }
}
