import { JobCard } from "@/components/jobCard"

export default function Dashboard() {
  const jobs = [
    {
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      description: "Work with React, Next.js, and TailwindCSS.",
    },
    {
      title: "Backend Engineer",
      company: "DataSolutions",
      location: "Bangalore, India",
      description: "Build APIs with Node.js and PostgreSQL.",
    },
    {
      title: "UI/UX Designer",
      company: "Designify",
      location: "Delhi, India",
      description: "Design clean and modern user interfaces.",
    },
  ]

  return (
    <div className="container mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job, index) => (
        <JobCard
          key={index}
          title={job.title}
          company={job.company}
          location={job.location}
          description={job.description}
        />
      ))}
    </div>
  )
}
