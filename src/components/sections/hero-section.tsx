
'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, Download } from 'lucide-react'
import { motion } from 'framer-motion'

const HeroSection = () => {
  const stats = [
    { number: "10K+", label: "Downloads", icon: Download },
    { number: "500+", label: "Happy Creators", icon: Users },
    { number: "50+", label: "Design Packs", icon: Sparkles }
  ]

  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-brand-accent/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-accent/5 to-transparent rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Hero Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-primary mb-6 leading-tight">
              Design That{' '}
              <span className="bg-gradient-to-r from-brand-accent to-brand-accent-dark bg-clip-text text-transparent">
                Impresses
              </span>
              <br />
              The Masses
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-primary-light mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Professional digital design templates trusted by{' '}
            <span className="font-semibold text-brand-accent">10,000+ creators</span>{' '}
            to build stunning brands and grow their businesses.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="xl" className="group" asChild>
              <Link href="/shop">
                Shop Packs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button size="xl" variant="outline" asChild>
              <Link href="#lead-magnet">
                Get Free Pack
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {stats?.map?.((stat, index) => (
              <div key={stat?.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-brand-primary mb-1">
                  {stat?.number}
                </div>
                <div className="text-brand-primary-light font-medium">
                  {stat?.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
