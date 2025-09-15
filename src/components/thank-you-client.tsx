
'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Share2, ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface OrderDetails {
  id: string;
  amount: number;
  product: {
    title: string;
  };
  downloadToken: string;
}

export default function ThankYouClient({ orderDetails }: { orderDetails: OrderDetails | null }) {

  const handleShare = async () => {
    const shareText = `Just got an amazing design pack from ImpressTheMasses! 🎨 Professional templates that actually help you stand out. Check them out!`
    const shareUrl = 'https://impressthemasses.com'

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'ImpressTheMasses - Design Packs',
          text: shareText,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        toast({
          title: "Share Text Copied!",
          description: "Share text has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error('Share error:', error);
      toast({ title: 'Could not share', description: 'Something went wrong.', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-neutral-light via-white to-brand-neutral-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary mb-4">
            Thank You for Your Purchase! 🎉
          </h1>
          <p className="text-xl text-brand-primary-light">
            Your order has been confirmed and your design pack is ready for download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <div className="bg-brand-accent/10 rounded-full p-4 w-fit mx-auto mb-6">
                <Download className="h-8 w-8 text-brand-accent" />
              </div>
              <h2 className="text-2xl font-bold text-brand-primary mb-4">
                Instant Download Ready
              </h2>
              <p className="text-brand-primary-light mb-6">
                Your design pack is ready! Click below to download your files instantly.
              </p>
              {orderDetails?.downloadToken ? (
                <Button size="lg" className="w-full mb-4" asChild>
                  <Link href={`/api/download/${orderDetails.downloadToken}`}>
                    <Download className="mr-2 h-5 w-5" />
                    Download Your Pack
                  </Link>
                </Button>
              ) : (
                <Button size="lg" className="w-full mb-4" disabled>
                  <Download className="mr-2 h-5 w-5" />
                  Download Your Pack
                </Button>
              )}
              <p className="text-xs text-brand-primary-light">
                💡 Download link expires in 30 days. Save your files!
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-brand-primary mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {orderDetails?.product ? (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium text-brand-primary">Product:</span>
                      <span className="text-brand-primary-light">{orderDetails.product.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-brand-primary">Amount:</span>
                      <span className="text-brand-primary-light">
                        ${(orderDetails.amount / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-brand-primary">Order ID:</span>
                      <span className="text-brand-primary-light text-sm">
                        #{orderDetails.id?.slice(-8)}
                      </span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span className="text-brand-primary">Total:</span>
                        <span className="text-brand-accent">
                          ${(orderDetails.amount / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    <p className="text-brand-primary-light">
                      Could not load order details. Please check your email for confirmation.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-xl border-0 bg-gradient-to-r from-brand-accent/5 to-brand-accent-dark/5 mb-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-brand-primary mb-4">
              Love Your New Design Pack?
            </h2>
            <p className="text-brand-primary-light mb-6">
              Share your purchase with fellow creators and help them discover professional design templates too!
            </p>
            <Button size="lg" variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-5 w-5" />
              Share Your Pack
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-xl border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                Explore More Packs
              </h3>
              <p className="text-brand-primary-light mb-4 text-sm">
                Build your complete design library with more professional templates.
              </p>
              <Button variant="outline" asChild>
                <Link href="/shop">
                  Browse Shop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-brand-primary mb-3">
                Need Help?
              </h3>
              <p className="text-brand-primary-light mb-4 text-sm">
                Have questions about customizing your templates? We're here to help!
              </p>
              <Button variant="outline" asChild>
                <Link href="/contact">
                  Contact Support
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
