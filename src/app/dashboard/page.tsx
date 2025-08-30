"use client"

import { JobCard } from "@/components/jobCard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const jobs = [
  { id: "1", title: "Frontend Developer", company: "TechCorp", location: "Remote", description: "Work with React, Next.js, and TailwindCSS." },
  { id: "2", title: "Backend Engineer", company: "DataSolutions", location: "Bangalore, India", description: "Build APIs with Node.js and PostgreSQL." },
  { id: "3", title: "UI/UX Designer", company: "Designify", location: "Delhi, India", description: "Design clean and modern user interfaces." },
  { id: "4", title: "Full Stack Developer", company: "InnovateLabs", location: "Hyderabad, India", description: "Develop end-to-end solutions using MERN stack." },
  { id: "5", title: "Mobile App Developer", company: "Appify", location: "Pune, India", description: "Build Android/iOS apps with React Native and Flutter." },
  { id: "6", title: "DevOps Engineer", company: "CloudWave", location: "Remote", description: "Manage CI/CD pipelines, Docker, and Kubernetes." },
  { id: "7", title: "Data Scientist", company: "AIWorks", location: "Mumbai, India", description: "Work with Python, TensorFlow, and data visualization." },
  { id: "8", title: "Product Manager", company: "VisionTech", location: "Remote", description: "Lead product development and cross-functional teams." },
  { id: "9", title: "QA Engineer", company: "Testify", location: "Chennai, India", description: "Ensure quality using automation tools like Selenium." },
  { id: "10", title: "Cybersecurity Analyst", company: "SecureNet", location: "Noida, India", description: "Monitor security threats and protect sensitive data." },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold hover:text-blue-400">
            Home
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        </div>

        {/* User Avatar */}
       
      </nav>

      {/* Job Cards Grid */}
      <main className="container mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
          />
        ))}
      </main>
    </div>
  )
}
