
'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Download, Share2, Star, Check } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Product } from '@/lib/types'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (productId) {
      fetchProduct()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/product/${productId}`)
      if (response?.ok) {
        const data = await response.json()
        setProduct(data.product || null)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${price.toFixed(2)}`
  }

  const handlePurchase = async () => {
    // 구매 로직은 그대로 유지
  }

  const handleShare = async () => {
    // 공유 로직은 그대로 유지
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-brand-neutral rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-video bg-brand-neutral rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-12 bg-brand-neutral rounded"></div>
                <div className="h-6 bg-brand-neutral rounded w-3/4"></div>
                <div className="h-20 bg-brand-neutral rounded"></div>
                <div className="h-12 bg-brand-neutral rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-brand-primary mb-4">Product Not Found</h1>
          <p className="text-brand-primary-light mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/shop">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shop
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="outline" className="mb-8" asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-brand-neutral">
              {product.imageUrl && (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-brand-primary mb-4">
                {product.name}
              </h1>
              <div className="text-3xl font-bold text-brand-accent mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-primary mb-3">Description</h3>
              <p className="text-brand-primary-light leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <Button
                size="xl"
                className="w-full"
                onClick={handlePurchase}
              >
                <Download className="mr-2 h-5 w-5" />
                {product.price === 0 ? 'Download Free' : 'Buy Now'}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share This Pack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
