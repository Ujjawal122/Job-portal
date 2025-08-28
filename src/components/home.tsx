"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative bg-background border-b">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Get Your Dream Job with <span className="text-primary">EasyJOB</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl text-lg text-muted-foreground">
          EasyJOB helps job seekers and employers connect effortlessly. 
  Explore thousands of job opportunities, apply with a single click, 
  and manage your career growth — all from one simple dashboard
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
          
        </div>
      </div>
    </section>
  )
}
