
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
}

// Mock data to replace the broken API call
const mockFeaturedProducts: Product[] = [
  {
    id: '1',
    title: 'Social Media Pro Kit',
    description: 'A complete kit of templates for Instagram, Facebook, and Twitter.',
    price: 4900,
    category: 'Social Media',
    images: ['/placeholder-1.png'],
    featured: true,
  },
  {
    id: '2',
    title: 'Presentation Power Pack',
    description: 'Stunning presentation templates for Keynote and PowerPoint.',
    price: 5900,
    category: 'Presentations',
    images: ['/placeholder-2.png'],
    featured: true,
  },
  {
    id: '3',
    title: 'Branding Essentials',
    description: 'Logo templates, business cards, and brand guidelines.',
    price: 7900,
    category: 'Branding',
    images: ['/placeholder-3.png'],
    featured: true,
  },
    {
    id: '4',
    title: 'UI/UX Starter Kit',
    description: 'A complete kit of templates for Instagram, Facebook, and Twitter.',
    price: 4900,
    category: 'Web Design',
    images: ['/placeholder-4.png'],
    featured: true,
  },
  {
    id: '5',
    title: 'Mobile App UI Kit',
    description: 'Stunning presentation templates for Keynote and PowerPoint.',
    price: 5900,
    category: 'App Design',
    images: ['/placeholder-5.png'],
    featured: true,
  },
  {
    id: '6',
    title: 'E-commerce Toolkit',
    description: 'Logo templates, business cards, and brand guidelines.',
    price: 7900,
    category: 'E-commerce',
    images: ['/placeholder-6.png'],
    featured: true,
  },
]

const FeaturedPacksSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      // Simulate API call
      setTimeout(() => {
        setFeaturedProducts(mockFeaturedProducts)
        setLoading(false)
      }, 1000)
    }

    fetchFeaturedProducts()
  }, [])

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${(price / 100).toFixed(0)}`
  }

  if (loading) {
    return (
        <section className="py-16 md:py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Skeleton className="h-12 w-64 mx-auto mb-6 bg-brand-neutral-light" />
                    <Skeleton className="h-6 w-96 mx-auto bg-brand-neutral-light" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => (
                        <Card key={i} className="bg-white border-brand-neutral-light shadow-sm rounded-2xl">
                            <Skeleton className="aspect-video w-full bg-brand-neutral-light" />
                            <CardContent className="p-6">
                                <Skeleton className="h-6 w-3/4 mb-2 bg-brand-neutral-light" />
                                <Skeleton className="h-4 w-full mb-4 bg-brand-neutral-light" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-1/4 bg-brand-neutral-light" />
                                    <Skeleton className="h-8 w-24 bg-brand-neutral-light" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-transparent text-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary mb-6"
          >
            Featured Design Packs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-brand-primary-light max-w-2xl mx-auto mb-8"
          >
            Our most popular design packs trusted by thousands of creators worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group overflow-hidden bg-white border-brand-neutral-light shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.title || 'Product image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-brand-primary">
                    {formatPrice(product.price || 0)}
                  </div>
                  <div className="absolute top-4 left-4 flex items-center space-x-1 bg-brand-accent/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="h-3 w-3 text-white fill-current" />
                    <span className="text-xs font-semibold text-white">Featured</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-brand-primary-light text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-brand-primary-light/60 capitalize font-medium">
                      {product.category.replace('_', ' ')}
                    </span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/product/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="xl" asChild>
            <Link href="/shop">
              View All Packs
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPacksSection
