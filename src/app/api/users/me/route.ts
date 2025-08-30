import { NextRequest, NextResponse } from "next/server"
import { verifyJwt } from "@/lib/verifyJWT"
import { connect } from "@/db/dbConnect"
import User from "@/models/usermodel"

// ✅ GET logged-in user
export async function GET(request: NextRequest) {
  try {
    await connect()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyJwt(token) as { id: string }
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const user = await User.findById(decoded.id).select("-password") // exclude password
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (err) {
    console.error("GET /api/users error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

// ✅ Update logged-in user
export async function PUT(request: NextRequest) {
  try {
    await connect()

    const token = request.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyJwt(token) as { id: string }
    if (!decoded?.id) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      {
        name: body.name,
        email: body.email,
        bio: body.bio,
      },
      { new: true } // return updated doc
    ).select("-password")

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 })
  } catch (err) {
    console.error("PUT /api/users error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
