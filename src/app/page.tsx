import Navbar from "@/components/navbar"
import Hero from "@/components/home"
import Footer from "@/components/footer"
import EarthMesh from "@/components/Earth"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <EarthMesh/>
      <Footer />
    </main>
  )
}
