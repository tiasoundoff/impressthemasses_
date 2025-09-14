
'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star } from 'lucide-react'
import { getProducts } from '@/lib/local/db'

const ShopContent = () => {
  const allProducts = getProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Packs' },
    { id: 'social_media', name: 'Social Media' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'brand_kits', name: 'Brand Kits' }
  ]

  const filteredProducts = useMemo(() => {
    let products = allProducts

    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      // Assuming the local data has a category property
      // products = products.filter(p => p.category === selectedCategory)
    }

    return products
  }, [allProducts, searchQuery, selectedCategory])

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${price.toFixed(0)}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
            Shop Design Packs
          </h1>
          <p className="text-lg text-brand-primary-light max-w-2xl mx-auto">
            Professional templates to elevate your brand and grow your business
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-brand-neutral p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary-light" />
                        <Input
                            type="text"
                            placeholder="Search templates..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12"
                        />
                    </div>
                </div>
            </div>
        </div>


        {/* Products Grid */}
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-brand-primary-light">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-brand-neutral">
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-brand-primary">
                    {formatPrice(product.price)}
                  </div>
                  {product.featured && (
                    <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <Star className="h-3 w-3 text-yellow-700 fill-current" />
                      <span className="text-xs font-semibold text-yellow-700">Featured</span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-brand-primary-light text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button size="sm" asChild>
                      <Link href={`/product/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-brand-primary mb-2">No products found</h3>
              <p className="text-brand-primary-light mb-4">
                Try adjusting your search criteria.
              </p>
              <Button onClick={() => setSearchQuery('')}>
                Clear Search
              </Button>
            </div>
          )}
        </>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <ShopContent />
  )
}
