
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { getProducts, Product } from '@/lib/local/db';

const FeaturedPacksSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      // Simulate API call
      setTimeout(() => {
        setFeaturedProducts(getProducts().filter(p => p.featured).slice(0, 3))
        setLoading(false)
      }, 1000)
    }

    fetchFeaturedProducts()
  }, [])

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${price.toFixed(0)}`
  }

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-12 w-80 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-16" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="rounded-2xl">
                <Skeleton className="aspect-[4/3] w-full bg-gray-200 rounded-t-2xl" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-10 w-28" />
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
    <section className="py-16 md:py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
          >
            Featured Design Packs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Our most popular design packs trusted by thousands of creators worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='h-full'
            >
              <Card className="group flex flex-col h-full overflow-hidden bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
                    {formatPrice(product.price)}
                  </div>
                  {product.featured && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1.5 bg-yellow-300 rounded-lg px-3 py-1 shadow-sm">
                      <Star className="h-4 w-4 text-yellow-700 fill-current" />
                      <span className="text-xs font-bold text-yellow-800">Featured</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4">
                     <span className="text-gray-500 text-sm">{product.category}</span>
                    <Button size="sm" asChild className={'rounded-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition-all'}>
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
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" className="rounded-xl font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl'" asChild>
            <Link href="/shop">
              View All Packs
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedPacksSection
