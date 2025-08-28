"use client"

import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function ProfileForm() {
  const router=useRouter()
  const [form, setForm] = useState({ name: "", email: "", bio: "" })
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("bio", form.bio)
    if (file) formData.append("file", file)

    try {
      const res = await axios.post("/api/users/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (res.data.success) {
        alert("Profile saved successfully ✅");
        router.push('/dashboard')
        
        console.log("Profile:", res.data.profile)
      } else {
        alert("Error saving profile ❌")
      }
    } catch (error) {
      console.error("Error uploading profile:", error)
      alert("Something went wrong ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-lg mx-auto mt-8 shadow-md">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" required />
          <Input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <Textarea name="bio" value={form.bio} onChange={handleChange} placeholder="About Me..." />
          <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
