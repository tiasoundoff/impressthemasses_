
'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Gift, Mail, Download, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const LeadMagnetSection = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source: 'lead_magnet' }),
      })

      if (response?.ok) {
        setIsSubmitted(true)
        setEmail('')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Lead magnet submission error:', err)
      setError('Failed to submit. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="lead-magnet" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-brand-accent/5 to-brand-accent/10 overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-2xl mb-6"
                >
                  <Gift className="h-10 w-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-brand-primary mb-4"
                >
                  Get Your Free{' '}
                  <span className="text-brand-accent">Mini Brand Kit</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-brand-primary-light mb-8 max-w-2xl mx-auto"
                >
                  Kickstart your brand with 3 logo variations, 1 color palette, and 2 social media templates. 
                  Perfect for entrepreneurs just getting started.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary-light" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-10 h-12 border-brand-neutral focus:border-brand-accent"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="whitespace-nowrap"
                      >
                        {isLoading ? 'Sending...' : 'Get Free Kit'}
                        <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
                    )}
                  </form>
                ) : (
                  <div className="text-center max-w-md mx-auto">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-primary mb-2">
                      Check Your Email!
                    </h3>
                    <p className="text-brand-primary-light mb-4">
                      Your free Mini Brand Kit is on its way. Check your inbox for the download link.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Kit
                    </Button>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 text-center text-sm text-brand-primary-light"
              >
                <p>No spam, ever. Unsubscribe with one click.</p>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default LeadMagnetSection
