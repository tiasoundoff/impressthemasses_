
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

    // Simulate API call
    setTimeout(() => {
      if (email.includes('test@test.com')) {
        setError('This email is blocked.')
        setIsLoading(false)
        return
      }
      setIsSubmitted(true)
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section id="lead-magnet" className="py-16 md:py-24 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl rounded-3xl" style={{ background: 'radial-gradient(circle at top, hsl(340, 100%, 98%), white 70%)' }}>
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-pink-500 rounded-3xl mb-6 shadow-lg shadow-pink-500/30"
                >
                  <Gift className="h-12 w-12 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                >
                  Get Your Free{' '}
                  <span className="text-pink-500">Mini Brand Kit</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
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
                  <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="relative flex-1 w-full">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                          className="pl-12 h-16 bg-white border-gray-200 focus:ring-pink-500 rounded-xl shadow-inner w-full"
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="whitespace-nowrap bg-pink-500 hover:bg-pink-600 text-white h-16 rounded-xl w-full sm:w-auto px-8 shadow-lg shadow-pink-500/40"
                      >
                        {isLoading ? 'Sending...' : 'Get Free Kit'}
                        <Download className="ml-2 h-5 w-5" />
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Check Your Email!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your free Mini Brand Kit is on its way. Check your inbox for the download link.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="rounded-xl"
                    >
                      Send Another Kit
                    </Button>
                  </div>
                )}
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="mt-6 text-center text-sm text-gray-500"
              >
                No spam, ever. Unsubscribe with one click.
              </motion.p>
            </CardContent>
          </Card>
      </div>
    </section>
  )
}

export default LeadMagnetSection
