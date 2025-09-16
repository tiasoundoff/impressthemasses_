
'use client'

import React from 'react'
import { Search, Download, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: 'Browse & Choose',
      description: 'Explore our curated collection of professional design templates across social media, presentations, and branding.',
    },
    {
      icon: Download,
      title: 'Instant Download',
      description: 'Get immediate access to your design pack with all files, templates, and resources included.',
    },
    {
      icon: Rocket,
      title: 'Launch & Impress',
      description: 'Customize your templates and launch your brand with designs that truly impress the masses.',
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-transparent text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Get professional designs in minutes, not hours. Our streamlined process gets you from idea to impact fast.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps?.map?.((step, index) => (
            <motion.div
              key={step?.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="inline-flex items-center justify-center w-28 h-28 bg-pink-500 rounded-2xl">
                  <step.icon className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -top-3 -right-3 w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-3">
                {step?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step?.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
