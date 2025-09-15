
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
    <section className="py-16 md:py-24 bg-transparent text-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-heading mb-6"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-body max-w-2xl mx-auto"
          >
            Get professional designs in minutes, not hours. Our streamlined process gets you from idea to impact fast.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps?.map?.((step, index) => (
            <motion.div
              key={step?.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-magenta to-brand-magenta-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-cta rounded-full flex items-center justify-center text-heading font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-heading mb-4">
                {step?.title}
              </h3>
              <p className="text-subtle leading-relaxed">
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
