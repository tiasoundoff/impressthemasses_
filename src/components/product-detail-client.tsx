
'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2, Star, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';
import RelatedProductsSection from './related-products-section';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE';
    return `$${price.toFixed(0)}`
  };
  
  const includedFeatures = [
    'Instant download access',
    'High-quality design files',
    'Easy to customize',
    'Commercial use license',
    'Free updates included',
  ];

  const handlePurchase = async () => {
    toast({ title: 'Redirecting to checkout...', description: `Preparing your purchase of ${product.name}.` });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}! `,
          url: window.location.href,
        });
        toast({ title: 'Shared successfully!' });
      } catch {
        // Silently fail if user cancels share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

  return (
    <>
        <div className="min-h-screen bg-white py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <Button variant="outline" className="mb-8 rounded-lg border-gray-300 text-gray-700 font-semibold hover:bg-gray-100" asChild>
                <Link href="/shop">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Shop
                </Link>
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                {/* Product Image */}
                <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl border border-gray-200/80 shadow-sm">
                    {product.featured && (
                        <div className="absolute top-4 left-4 flex items-center space-x-1.5 bg-yellow-300 rounded-lg px-3 py-1 shadow-sm">
                            <Star className="h-4 w-4 text-yellow-700 fill-current" />
                            <span className="text-xs font-bold text-yellow-800">Featured</span>
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-center">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-gray-500 font-medium">{product.category}</span>
                                {product.featured && (
                                    <div className="inline-flex items-center rounded-md bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
                                {product.name}
                            </h1>
                        </div>

                        <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-500">
                        {formatPrice(product.price)}
                        </div>

                        <div>
                        <h3 className="text-md font-bold text-gray-900 mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                        {product.description}
                        </p>
                        </div>

                        <div>
                        <h3 className="text-md font-bold text-gray-900 mb-3">What's Included</h3>
                        <ul className="space-y-2">
                            {includedFeatures.map((feature, index) => (
                                <li key={index} className="flex items-center text-gray-600">
                                    <CheckCircle2 className="h-5 w-5 mr-3 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        </div>

                        <div className="pt-6 space-y-4">
                        <Button
                            size="xl"
                            className="w-full h-14 text-lg font-bold rounded-xl text-white bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition-all shadow-lg shadow-pink-500/30 hover:shadow-xl"
                            onClick={handlePurchase}
                        >
                            <Download className="mr-2.5 h-5 w-5" />
                            {product.price === 0 ? 'Download Now' : 'Buy Now'}
                        </Button>
                        
                        <Button
                            variant="outline"
                            size="xl"
                            className="w-full h-14 text-lg font-bold rounded-xl border-gray-300 text-gray-800 hover:bg-gray-100"
                            onClick={handleShare}
                        >
                            <Share2 className="mr-2.5 h-5 w-5" />
                            Share This Pack
                        </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <RelatedProductsSection currentProductId={product.id} category={product.category} />
 </>
  );
}
