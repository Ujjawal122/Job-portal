"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from "axios"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ApplyPage() {
  const params = useParams()
  const jobId = params.id
  const router = useRouter()
  const [coverLetter, setCoverLetter] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!jobId) return alert("Invalid Job ID ❌")

    setLoading(true)
    try {
      await axios.post("/api/users/applications", { jobId, coverLetter })
      alert("Application submitted ✅")
      router.push("/dashboard")
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.error || "Failed to apply ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-6">
      <Card className="w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Apply for Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="min-h-[150px] bg-black/20 text-white border-gray-400"
              required
            />
            <CardFooter>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
