"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { LogOut, Briefcase, Pencil } from "lucide-react"

export default function UserProfilePage() {
  const router = useRouter()
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`)
        setUser(res.data.user)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchUser()
  }, [id])

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout")
      router.push("/login")
    } catch (error: any) {
      console.error("Failed to logout:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Skeleton className="w-32 h-32 rounded-full mb-6" />
        <Skeleton className="w-48 h-6 mb-4" />
        <Skeleton className="w-64 h-4" />
      </div>
    )
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">User not found ❌</p>
    )
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* 🌌 Animated Star Background */}
      <div className="absolute inset-0 -z-10">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* 🔝 Navbar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <h1 className="text-2xl font-extrabold tracking-wide">Easy<span className="text-blue-500">JOB</span></h1>
        <div className="flex space-x-3">
          <Button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Briefcase size={18} /> Jobs
          </Button>
          <Button
            onClick={() => router.push(`/profile/${id}/edit`)}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600"
          >
            <Pencil size={18} /> Edit
          </Button>
          <Button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </div>

      {/* 🧑‍💼 Profile Card */}
      <Card className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 text-center mt-20 w-full max-w-md">
        <CardHeader>
          <Avatar className="w-28 h-28 mx-auto border-4 border-blue-500 shadow-md">
            <AvatarImage src={user.profilePic || "/default-avatar.png"} />
            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <CardTitle className="mt-4 text-2xl font-bold">{user.name}</CardTitle>
          <p className="text-gray-300">{user.email}</p>
        </CardHeader>
        <CardContent>
          <p className="mt-4 text-gray-400">{user.bio || "No bio available"}</p>
        </CardContent>
      </Card>
    </div>
  )
}
