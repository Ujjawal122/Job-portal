"use client"
import Link from "next/link"
import React,{useEffect} from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { NextResponse } from "next/server"
import toast, { Toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"










export default function SignupPage(){
    const router=useRouter()//this use to find which page u want page.tsx or route.ts

    const[user,setUser]=React.useState({
        email:"",
        password:"",
        username:""

    })
    const[buttonDisabled,setButtionDisabled]=React.useState(false)
    
    const onSignup=async()=>{
        try {
            const response=await axios.post('/api/users/signup',user)
            console.log(response.data);
            router.push('/login');
            

        } catch ( error:any) {
            toast.error(error.response?.data?.error ||"Signup Failed")
            
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 &&user.username.length >0){
            setButtionDisabled(false);
        }else{
            setButtionDisabled(true);
        }
    },[user])

    return(
        <div className="flex min-h-screen items-center justify-center  bg-zinc-950 text-white">
        <Card className="w-full max-w-sm justify-center  bg-zinc-800 text-white ">
      <CardHeader>
        <CardTitle>SignUp your account</CardTitle>
        <CardDescription className="text-white">
          Enter your email below to signin to your account
        </CardDescription>
        
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">

             <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Username</Label>
               
              </div>
              <Input id="Username" type="username" required
                value={user.username}
                onChange={(e)=>setUser({...user,username:e.target.value})}
              
              />
            </div>




            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user.email}
                onChange={(e)=>setUser({...user,email:e.target.value})}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
               
              </div>
              <Input id="password" type="password" required
                value={user.password}
                onChange={(e)=>setUser({...user,password:e.target.value})}
              
              />
            </div>

          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full"
       
        onClick={onSignup}
        > {buttonDisabled ? "NO Signup":"SignUP"}
         
        </Button>
        <Link href="/login">Visit login page</Link>
       
      </CardFooter>
    </Card>
    </div>
    )
}

