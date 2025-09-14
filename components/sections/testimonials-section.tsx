
'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'
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
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-brand-neutral'
        }`}
      />
    ))
  }

  return (
    <section className="py-16 md:py-24 bg-brand-neutral-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary mb-6"
          >
            Loved by{' '}
            <span className="text-brand-accent">10,000+</span>{' '}
            Creators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-brand-primary-light max-w-2xl mx-auto"
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
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-8 w-8 text-brand-accent/30 mr-2" />
                    <div className="flex">{renderStars(testimonial?.rating || 5)}</div>
                  </div>
                  
                  <blockquote className="text-brand-primary-light mb-6 leading-relaxed">
                    "{testimonial?.content}"
                  </blockquote>
                  
                  <div className="border-t border-brand-neutral pt-4">
                    <div className="font-semibold text-brand-primary">
                      {testimonial?.name}
                    </div>
                    <div className="text-brand-primary/60 text-sm">
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
