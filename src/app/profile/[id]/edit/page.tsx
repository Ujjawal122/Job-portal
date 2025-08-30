"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

// ✅ shadcn UI imports
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

export default function EditProfilePage() {
  const router = useRouter()

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    bio: "",
  })

  const [profileFile, setProfileFile] = useState<File | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/users/me", { withCredentials: true })
        const { username, email, bio } = res.data.user
        setForm({
          fullname: username ?? "",
          email: email ?? "",
          bio: bio ?? "",
        })
      } catch (err) {
        console.error("Fetch user failed:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("fullname", form.fullname)
      formData.append("email", form.email)
      formData.append("bio", form.bio)
      if (profileFile) formData.append("file", profileFile)
      if (resumeFile) formData.append("resume", resumeFile)

      await axios.post("/api/users/profile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      })

      alert("Profile updated successfully ✅")
      router.push("/profile/me")
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.error || "Failed to update profile ❌")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading...</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white px-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="fullname">Name</Label>
              <Input
                id="fullname"
                name="fullname"
                value={form.fullname}
                onChange={handleChange}
                placeholder="Enter your name"
                className="bg-black/40 text-white border-gray-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="bg-black/40 text-white border-gray-500"
                disabled
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="bg-black/40 text-white border-gray-500"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-1">
              <Label>Profile Image</Label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-white file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded hover:file:bg-blue-600"
              />
            </div>

            {/* Resume Upload */}
            <div className="space-y-1">
              <Label>Resume (PDF/DOC)</Label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-white file:bg-green-500 file:text-white file:px-4 file:py-2 file:rounded hover:file:bg-green-600"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
