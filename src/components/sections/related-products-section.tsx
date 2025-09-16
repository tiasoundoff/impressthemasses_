'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getProducts } from '@/lib/local/db'

interface RelatedProductsProps {
  currentProductId: string
  category: string
}

const RelatedProductsSection = ({ currentProductId, category }: RelatedProductsProps) => {
  const allProducts = getProducts()
  
  let relatedProducts = allProducts
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 2)

  if (relatedProducts.length < 2) {
    const otherProducts = allProducts.filter(p => p.id !== currentProductId && !relatedProducts.some(rp => rp.id === p.id)).slice(0, 2 - relatedProducts.length);
    relatedProducts = [...relatedProducts, ...otherProducts];
  }


  if (relatedProducts.length === 0) {
    return null;
  }
  
  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${price.toFixed(0)}`
  }

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">You Might Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-2xl">
                 <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm">
                  {formatPrice(product.price)}
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {product.description}
                </p>
                <div className="flex items-center justify-end mt-auto pt-4">
                    <Button asChild className='rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:opacity-90 transition-all'>
                        <Link href={`/product/${product.id}`}>
                        View Details
                        </Link>
                    </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProductsSection
