"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/login", user);
      const userId = response.data.user.id; 
      console.log("User ID:", userId);

      toast.success("Login Success ✅");

      
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed ❌");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <Card className="w-full max-w-sm justify-center bg-zinc-800 text-white">
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription className="text-white">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* 👇 handle submit on form instead of button click */}
          <form onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </div>

            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                {buttonDisabled ? "No Login" : "Login"}
              </Button>
              <Link href="/signup">Visit Signup page</Link>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
