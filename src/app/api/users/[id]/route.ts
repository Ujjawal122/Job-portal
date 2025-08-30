import { NextResponse, NextRequest } from "next/server";
import User from "@/models/usermodel";
import { connect } from "@/db/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFormUser";

connect();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 params is async
) {
  try {
    // ✅ Require login
    await getDataFromToken(request);

    const { id } = await context.params; // 👈 await is required
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}


export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // 👈 make params async
) {
  try {
    const tokenData = await getDataFromToken(request)

    // ✅ Must await params
    const { id } = await context.params

    // 🔒 Only allow editing own profile
    if (tokenData.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    // Example update (uncomment & replace with real logic):
    // await User.findByIdAndUpdate(id, body, { new: true })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}