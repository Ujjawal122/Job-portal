"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu } from "lucide-react"
import Image from "next/image"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import job from "../../public/job-offer.png"

export default function Navbar() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)

  // ✅ Fetch user based on token → id → user details
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/current")
        if (data?.id) {
          const res = await axios.get(`/api/users/${data.id}`)
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        setUser(null)
      }
    }
    fetchUser()
  }, [])

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout")
      setUser(null)
      router.push("/")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src={job} alt="EasyJOB Logo" width={32} height={32} className="rounded-sm" />
          <span className="text-xl font-bold">EasyJOB</span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                Jobs
              </Link>
              <Link
                href={`/profile/${user._id}`}
                className="text-sm font-medium hover:text-primary"
              >
                Profile
              </Link>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
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

                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setOpen(false)}>Jobs</Link>
                    <Link
                      href={`/profile/${user._id}`}
                      onClick={() => setOpen(false)}
                    >
                      Profile
                    </Link>
                    <Button
                      size="sm"
                      className="mt-4 w-fit"
                      variant="destructive"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    className="mt-4 w-fit"
                    onClick={() => router.push("/login")}
                  >
                    Login
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
