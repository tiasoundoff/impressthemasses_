
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Digital Marketing Coach",
      content: "ImpressTheMasses transformed my entire brand presence. The Instagram story templates helped me grow my following by 300% in just 2 months!",
      rating: 5
    },
    {
      name: "Mike Rodriguez",
      role: "Startup Founder",
      content: "The pitch deck templates are incredible. I used them to raise $500K in seed funding. The designs are professional and investor-ready.",
      rating: 5
    },
    {
      name: "Emma Thompson",
      role: "Content Creator",
      content: "As a solo creator, these design packs save me hours every week. The quality is outstanding and my audience loves the professional look.",
      rating: 5
    },
    {
      name: "David Park",
      role: "E-commerce Owner", 
      content: "The brand kit gave me everything I needed to launch my store. Professional logos, colors, and social templates - all in one package!",
      rating: 5
    },
    {
      name: "Lisa Wang",
      role: "Business Coach",
      content: "My clients always ask where I get my designs. ImpressTheMasses is my secret weapon for creating stunning presentations and social content.",
      rating: 5
    },
    {
      name: "Alex Johnson",
      role: "Agency Owner",
      content: "We use these templates for client work and they never fail to impress. High quality, modern designs that deliver results every time.",
      rating: 5
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Loved by <span className="text-pink-500">10,000+</span> Creators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            See what our community of creators, coaches, and entrepreneurs are saying about our design packs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials?.map?.((testimonial, index) => (
            <motion.div
              key={testimonial?.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex"
            >
              <Card className="w-full rounded-2xl border border-gray-200/80 bg-white shadow-sm flex flex-col">
                <CardContent className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-4">
                        <p className="text-8xl text-pink-200/50 font-serif leading-none -mt-4 -ml-2">&#8220;</p>
                        <div className="flex mt-2">{renderStars(testimonial?.rating || 5)}</div>
                    </div>
                  
                  <blockquote className="text-gray-700 mb-6 -mt-8 flex-grow">
                    {testimonial?.content}
                  </blockquote>
                  
                  <div className="border-t border-gray-200/60 pt-4">
                    <div className="font-semibold text-gray-900">
                      {testimonial?.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial?.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
