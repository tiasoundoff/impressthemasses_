import React from 'react'
import HeroSection from '@/components/sections/hero-section'
import HowItWorksSection from '@/components/sections/how-it-works-section'
import FeaturedPacksSection from '@/components/sections/featured-packs-section'
import LeadMagnetSection from '@/components/sections/lead-magnet-section'
import TestimonialsSection from '@/components/sections/testimonials-section'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-brand-neutral-light/10 text-brand-primary">
      <HeroSection />
      <HowItWorksSection />
      <FeaturedPacksSection />
      <LeadMagnetSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}