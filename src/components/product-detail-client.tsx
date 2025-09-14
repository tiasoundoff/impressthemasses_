
'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {

  const formatPrice = (price: number) => {
    if (price === 0) return 'FREE';
    return `$${price.toFixed(2)}`;
  };

  const handlePurchase = async () => {
    try {
      // Here you would typically redirect to a checkout page or call a server action
      // For this example, we'll just show a success toast
      toast({ title: 'Purchase successful!', description: `Thank you for purchasing ${product.name}.` });
    } catch (error) {
      toast({ title: 'Purchase failed', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    }
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
      } catch (error) {
        toast({ title: 'Could not share', description: 'Something went wrong while trying to share.', variant: 'destructive' });
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({ title: 'Link copied to clipboard!' });
    }
  };

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
  );
}
