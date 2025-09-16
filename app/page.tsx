"use client"
import ZkVaultNavbar from "@/components/Zeyo-navbar"
import { LampDemo } from "@/components/lamp-demo"
import TrustedBy from "@/components/trusted-by"
import WhyChooseZkVault from "@/components/why-choose-zkvault"
import HowZkVaultWorks from "@/components/how-zkvault-works"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import Footer from "@/components/footer"
import ZeyoNavbar from "@/components/Zeyo-navbar"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <ZeyoNavbar />
      <section id="home">
        <LampDemo />
      </section>
      <TrustedBy />
      <section id="features">
        <WhyChooseZkVault />
      </section>
      <section id="how-it-works">
        <HowZkVaultWorks />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <Footer />
    </div>
  )
}
