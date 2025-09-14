
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

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  images: string[]
  featured: boolean
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (productId) {
      fetchProduct()
      fetchRelatedProducts()
    }
  }, [productId])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products`)
      if (response?.ok) {
        const data = await response.json()
        const foundProduct = data?.products?.find((p: Product) => p?.id === productId)
        setProduct(foundProduct || null)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/products?limit=4`)
      if (response?.ok) {
        const data = await response.json()
        setRelatedProducts(data?.products?.filter((p: Product) => p?.id !== productId)?.slice(0, 3) || [])
      }
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE'
    return `$${(price / 100).toFixed(0)}`
  }

  const handlePurchase = async () => {
    try {
      if (!product) return

      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          customerEmail: '', // Could collect this via a form
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Handle free products
      if (data.free) {
        toast({
          title: "Download Ready!",
          description: `Your free pack is ready for download.`,
        })
        // Redirect to download or thank you page
        window.location.href = `/thank-you?free=true&orderId=${data.orderId}`
        return
      }

      // Redirect to Stripe checkout for paid products
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }

    } catch (error) {
      console.error('Purchase error:', error)
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share && product) {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied!",
          description: "Product link has been copied to your clipboard.",
        })
      }
    } catch (error) {
      console.error('Share error:', error)
    }
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

  const features = [
    "Instant download access",
    "High-quality design files",
    "Easy to customize",
    "Commercial use license",
    "Free updates included"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button variant="outline" className="mb-8" asChild>
          <Link href="/shop">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-xl bg-brand-neutral">
              {product?.images?.[currentImageIndex] && (
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product?.title || 'Product image'}
                  fill
                  className="object-cover"
                  priority
                />
              )}
              {product?.featured && (
                <div className="absolute top-4 left-4 flex items-center space-x-1 bg-yellow-400/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <Star className="h-3 w-3 text-yellow-700 fill-current" />
                  <span className="text-xs font-semibold text-yellow-700">Featured</span>
                </div>
              )}
            </div>

            {/* Thumbnail navigation */}
            {(product?.images?.length || 0) > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product?.images?.map?.((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors",
                      currentImageIndex === index ? "border-brand-accent" : "border-brand-neutral"
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product?.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-brand-primary/60 capitalize font-medium">
                  {product?.category?.replace('_', ' ')}
                </span>
                {product?.featured && (
                  <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-bold text-brand-primary mb-4">
                {product?.title}
              </h1>
              <div className="text-3xl font-bold text-brand-accent mb-6">
                {formatPrice(product?.price || 0)}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-brand-primary mb-3">Description</h3>
              <p className="text-brand-primary-light leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-brand-primary mb-3">What's Included</h3>
              <ul className="space-y-2">
                {features?.map?.((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-brand-primary-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                size="xl"
                className="w-full"
                onClick={handlePurchase}
              >
                <Download className="mr-2 h-5 w-5" />
                {product?.price === 0 ? 'Download Free' : 'Buy Now'}
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

            {/* Lead Magnet Teaser */}
            <Card className="bg-gradient-to-r from-brand-accent/10 to-brand-accent/5">
              <CardContent className="p-4">
                <p className="text-sm text-brand-primary mb-2">
                  💡 <strong>Want to try before you buy?</strong>
                </p>
                <p className="text-xs text-brand-primary-light mb-3">
                  Get our free Mini Brand Kit with sample templates and see the quality for yourself.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/#lead-magnet">Get Free Sample</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-brand-primary mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts?.map?.((relatedProduct) => (
                <Card key={relatedProduct?.id} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden bg-brand-neutral">
                    {relatedProduct?.images?.[0] && (
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct?.title || 'Product image'}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-brand-primary">
                      {formatPrice(relatedProduct?.price || 0)}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                      {relatedProduct?.title}
                    </h3>
                    <p className="text-brand-primary-light text-sm mb-4 line-clamp-2">
                      {relatedProduct?.description}
                    </p>
                    <Button size="sm" className="w-full" asChild>
                      <Link href={`/product/${relatedProduct?.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
