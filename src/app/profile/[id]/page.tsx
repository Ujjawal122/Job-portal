"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function UserProfilePage() {

    const router=useRouter()
  const { id } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${id}`)  // <-- New API route for user by ID
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
    await axios.post("/api/users/logout");  
    router.push("/login");
  } catch (error: any) {
    console.error("Failed to logout:", error);
  }
};



  if (loading) return <p className="text-center mt-10">Loading profile...</p>

  if (!user) return <p className="text-center mt-10">User not found ❌</p>

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-md">

        <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>








      <img
        src={user.profilePic || "/default-avatar.png"}
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto"
      />
      <h2 className="text-2xl font-semibold text-center mt-4">{user.name}</h2>
      <p className="text-gray-500 text-center">{user.email}</p>
      <p className="mt-4">{user.bio}</p>

    </div>
  )
}
