"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogsIcon, Menu } from "lucide-react"
import job from "../../public/job-offer.png"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
       <Link href="/" className="flex items-center space-x-2">
          <Image 
            src={job} 
            alt="EasyJOB Logo" 
            width={32} 
            height={32} 
            className="rounded-sm"
          />
          <span className="text-xl font-bold">EasyJOB</span>
        </Link>


        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          
          
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Jobs
          </Link>
          <Button onClick={() => router.push("/login")}>Login</Button>
          
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link href="/" onClick={() => setOpen(false)}>Home</Link>
                <Link href="/about" onClick={() => setOpen(false)}>About</Link>
                <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
                <Button size="sm" className="mt-4 w-fit" onClick={() => router.push("/login")}>
                  Login
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
