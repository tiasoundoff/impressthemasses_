
'use client'

import React, { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Filter, Star, Grid, List } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
}

const ShopContent = () => {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

  const categories = [
    { id: 'all', name: 'All Packs' },
    { id: 'social_media', name: 'Social Media' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'brand_kits', name: 'Brand Kits' }
  ]

  const sortOptions = [
    { id: 'createdAt-desc', name: 'Newest First', sortBy: 'createdAt', sortOrder: 'desc' },
    { id: 'createdAt-asc', name: 'Oldest First', sortBy: 'createdAt', sortOrder: 'asc' },
    { id: 'price-asc', name: 'Price: Low to High', sortBy: 'price', sortOrder: 'asc' },
    { id: 'price-desc', name: 'Price: High to Low', sortBy: 'price', sortOrder: 'desc' },
  ]

  useEffect(() => {
    fetchProducts()
  }, [selectedCategory, sortBy, sortOrder, searchQuery])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchQuery && { search: searchQuery })
      })

      const response = await fetch(`/api/products?${params}`)
      if (response?.ok) {
        const data = await response.json()
        setProducts(data?.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${(price / 100).toFixed(0)}`
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProducts()
  }

  const handleSortChange = (value: string) => {
    const option = sortOptions.find(opt => opt.id === value)
    if (option) {
      setSortBy(option.sortBy)
      setSortOrder(option.sortOrder)
    }
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
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-brand-primary-light" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories?.map?.((category) => (
                <Button
                  key={category?.id}
                  variant={selectedCategory === category?.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category?.id || 'all')}
                  className="whitespace-nowrap"
                >
                  {category?.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="px-4 py-2 border border-brand-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {sortOptions?.map?.((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)]?.map?.((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-brand-primary-light">
                Showing {products?.length || 0} result{(products?.length || 0) !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map?.((product) => (
                <Card key={product?.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden bg-brand-neutral">
                    {product?.images?.[0] && (
                      <Image
                        src={product.images[0]}
                        alt={product?.title || 'Product image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-brand-primary">
                      {formatPrice(product?.price || 0)}
                    </div>
                    {product?.featured && (
                      <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="h-3 w-3 text-yellow-700 fill-current" />
                        <span className="text-xs font-semibold text-yellow-700">Featured</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                      {product?.title}
                    </h3>
                    <p className="text-brand-primary-light text-sm mb-4 line-clamp-3">
                      {product?.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-primary/60 capitalize font-medium">
                        {product?.category?.replace('_', ' ')}
                      </span>
                      <Button size="sm" asChild>
                        <Link href={`/product/${product?.id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {(!products || products?.length === 0) && !loading && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-brand-primary mb-2">No products found</h3>
                <p className="text-brand-primary-light mb-4">
                  Try adjusting your search criteria or browse all categories
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
