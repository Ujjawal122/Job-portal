"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"

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

  if (loading) return <p className="text-center mt-10">Loading profile...</p>
  if (!user) return <p className="text-center mt-10">User not found ❌</p>

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      
      {/* 🌌 Moving stars background */}
      <div className="absolute inset-0 -z-10">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* 🔝 Navbar with Jobs + Logout */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-black/40 backdrop-blur-md">
        <h1 className="text-xl font-bold">EasyJOB</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Jobs
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* 🧑‍💼 User Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 shadow-lg w-full max-w-md text-center">
        <img
          src={user.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-blue-400 shadow-md"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-300">{user.email}</p>
        <p className="mt-4 text-gray-400">{user.bio || "No bio available"}</p>
      </div>
    </div>
  )
}
