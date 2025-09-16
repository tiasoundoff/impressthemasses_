
'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Star, ChevronDown } from 'lucide-react'
import { getProducts } from '@/lib/local/db'
import { cn } from '@/lib/utils'

const ShopContent = () => {
  const allProducts = getProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Packs' },
    { id: 'social_media', name: 'Social Media' },
    { id: 'presentations', name: 'Presentations' },
    { id: 'brand_kits', name: 'Brand Kits' },
  ];

  const filteredProducts = useMemo(() => {
    let products = allProducts

    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      products = products.filter(p => p.category.toLowerCase().replace(/\s/g, '_') === selectedCategory)
    }

    return products
  }, [allProducts, searchQuery, selectedCategory])

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${price.toFixed(0)}`
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Shop Design Packs
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Professional templates to elevate your brand and grow your business
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200/80 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full lg:w-auto lg:flex-1">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 text-md rounded-lg focus:ring-pink-500 border-gray-300"
                />
                <Button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-9 rounded-lg bg-pink-500 hover:bg-pink-600 text-white"
                >
                    Search
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(cat => (
                <Button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  variant={selectedCategory === cat.id ? 'default' : 'outline'}
                  className={cn(
                    'rounded-lg font-semibold',
                    selectedCategory === cat.id 
                      ? 'bg-pink-500 text-white hover:bg-pink-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                  )}
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="relative w-full lg:w-48">
              <select className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 px-4 h-12 text-gray-700 focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                <option>Newest First</option>
                <option>Oldest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>


        {/* Products Grid */}
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                    <Button size="sm" asChild className='rounded-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition-all'>
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
            <div className="text-center py-24 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button onClick={() => {setSearchQuery(''); setSelectedCategory('all');}} className='bg-pink-500 hover:bg-pink-600 text-white'>
                Clear Filters
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
