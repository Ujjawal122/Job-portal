import { connect } from "@/db/dbConnect"
import User from "@/models/usermodel"
import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

await connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "User does not exist" }, { status: 400 })
    }

    // compare password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 } // ✅ fixed
      )
    }

    // token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    }

    const token = jwt.sign(tokenData, process.env.JWT_KEY!, { expiresIn: "1d" })

    const response = NextResponse.json(
      {
        message: "Login Successfully",
        success: true,
        user: { id: user._id, email: user.email, username: user.username }, // 👈 return user id
      },
      { status: 200 }
    )

    response.cookies.set("token", token, { httpOnly: true })

    return response
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { error: error.message || "Internal ISSUE" },
      { status: 500 }
    )
  }
}
