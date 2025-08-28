import User from "@/models/usermodel";
import {connect} from "@/db/dbConnect"
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";
import { error } from "console";
import bcrypt from  "bcrypt"

//connecting the database
connect();

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json()
        const{username,email,password}=reqBody

        console.log(reqBody);

        const user=await User.findOne({email})

        if(user){
           return NextResponse.json({error:"User is already Exist"},{status:400})
        }

        //hashPassword
        const salt= await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt)

        //then make the new User-->
        const newUser=new User({
            username,
            email,
            password:hashPassword
        })
        const savedUser=await newUser.save();
        console.log(savedUser);
        
        return NextResponse.json({
            message:"User created Successfully",
            user:savedUser,
            success:true
        },{status:201})


    } catch (error:any) {
        return NextResponse.json({error:"Server Error in SignUp"},{status:500})
    }
}
