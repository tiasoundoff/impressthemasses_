

'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. We'll get back to you within 24 hours.",
        })

        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-brand-primary-light max-w-3xl mx-auto">
            Have questions about our design packs? Need custom work? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-brand-primary">
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-primary mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-primary mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-brand-primary mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-primary mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us more about your project or question..."
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-brand-primary mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-accent/10 p-3 rounded-lg">
                      <Mail className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary mb-1">Email</h4>
                      <p className="text-brand-primary-light">hello@impressthemasses.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-accent/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary mb-1">Response Time</h4>
                      <p className="text-brand-primary-light">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-brand-accent/10 p-3 rounded-lg">
                      <MapPin className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-primary mb-1">Location</h4>
                      <p className="text-brand-primary-light">Serving creators worldwide</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0 bg-gradient-to-br from-brand-accent/5 to-brand-accent-dark/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-brand-primary mb-4">
                  Need Help Choosing?
                </h3>
                <p className="text-brand-primary-light mb-6">
                  Not sure which design pack is right for your brand? Try our free Mini Brand Kit to see the quality and style of our work.
                </p>
                <Button variant="outline" className="w-full">
                  Get Free Sample Pack
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
