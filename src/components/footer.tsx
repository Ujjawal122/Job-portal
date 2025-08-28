"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left - Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">MyApp</h2>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MyApp. All rights reserved.
          </p>
        </div>

        {/* Middle - Nav Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-primary">Home</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
          <Link href="/contact" className="hover:text-primary">Contact</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy</Link>
        </nav>

        {/* Right - Social Icons */}
        <div className="flex gap-4">
          <Link href="https://github.com" target="_blank" className="hover:text-primary">
            <Github className="h-5 w-5" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-primary">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
