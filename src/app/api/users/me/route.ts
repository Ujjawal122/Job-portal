import { getDataFromToken } from "@/helpers/getDataFormUser";
import { NextResponse,NextRequest } from "next/server";
import User from "@/models/usermodel";
import {connect} from "@/db/dbConnect"

connect()
export async function GET(request:NextRequest) {
    try {
        const userID=await getDataFromToken(request)
        const user=await User.findOne({_id:userID}).select("-password")
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error:any) {
        
        return NextResponse.json({error:error.message},{status:400})
    }
    
}