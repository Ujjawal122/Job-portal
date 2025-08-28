import {connect} from "@/db/dbConnect"
import User from "@/models/usermodel"
import { NextRequest,NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { error } from "console"
import bcrypt from "bcrypt"


await connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json()
        const {email,password}=reqBody

        // console.log(reqBody);
        
       const user=await User.findOne({email})
    
       if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
       }

       console.log(user);

       //compare the password by using the bcrpyt
       const isValidPassword=await bcrypt.compare(password,user.password)

       if(!isValidPassword){
            return NextResponse.json({error:"User enter the Wrong Password"},{status:501})
       }
       
       //now create the token-->
       const tokenData={
            id:user._id,
            email:user.email,
            username:user.username
       }

       //create the token-->
       const token= jwt.sign(tokenData,process.env.JWT_KEY!,{expiresIn:"1d"})

       const response=NextResponse.json({
        message:"Login Successfully",
        success:true
       },{status:200})

       response.cookies.set("token",token,{
        httpOnly:true
       })

       return response;


        
    } catch (error:any) {
        console.log(error);
        
       return NextResponse.json({error:error.message||"Internal ISSUE"},{status:500})
    }
}
