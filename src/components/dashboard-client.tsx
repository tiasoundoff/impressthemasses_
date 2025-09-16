
'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, ShoppingBag, Download, Star, ClipboardList, ArrowRight } from 'lucide-react';

interface Order {
  id: string;
  productId: string;
  amount: number;
  status: string;
  createdAt: string;
  product: {
    title: string;
    images: string[];
  };
}

interface DashboardClientProps {
  user: {
    name: string;
    email: string;
    joinedDate: string;
    totalOrders: number;
    totalSpent: number;
  };
  orders: Order[];
}

export default function DashboardClient({ user, orders }: DashboardClientProps) {
  const formatPrice = (price: number) => {
    return `$${(price / 100).toFixed(2)}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')?.[0] || 'User'}! 👋
          </h1>
          <p className="text-lg text-gray-600">
            Manage your design packs and download your purchases
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-pink-100 p-3 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{user?.totalOrders || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Download className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Available Downloads</p>
                  <p className="text-2xl font-bold text-gray-800">{orders?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-lg shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-100 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-800">{formatPrice(user?.totalSpent || 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Purchases */}
          <div className="lg:col-span-2">
            <Card className="border rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <ClipboardList className="h-5 w-5" />
                  <span>Your Purchases</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {orders?.length > 0 ? (
                  <div className="space-y-4">
                    {orders?.map?.((order) => (
                      <div
                        key={order?.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <Download className="h-5 w-5 text-pink-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {order?.product?.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Purchased on {formatDate(order?.createdAt || '')}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-800">
                            {formatPrice(order?.amount || 0)}
                          </span>
                          <Button size="sm" className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🛒</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No purchases yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start building your design collection today!
                    </p>
                    <Button asChild>
                      <Link href="/shop">
                        Browse Design Packs
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Account Info, Quick Actions & Recommendations */}
          <div className="space-y-6">
            <Card className="border rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <User className="h-5 w-5" />
                  <span>Account Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <p className="text-gray-800">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-gray-800">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Member Since</label>
                  <p className="text-gray-800">{formatDate(user?.joinedDate + 'T00:00:00Z')}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card className="border rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-lg" asChild>
                  <Link href="/shop">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Browse All Packs
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-lg" asChild>
                  <Link href="/#lead-magnet">
                    <Download className="mr-2 h-4 w-4" />
                    Get Free Pack
                  </Link>
                </Button>
                <Button variant="outline" className="w-full rounded-lg" asChild>
                  <Link href="/contact">
                    Support & Help
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border rounded-lg shadow-sm bg-pink-50">
                <CardHeader>
                    <CardTitle className="flex items-center text-pink-500">
                    <Star className="mr-2 h-5 w-5" />
                    Recommended for You
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                    Based on your purchases, you might like our Social Media Starter Kit - perfect for expanding your content creation toolkit!
                    </p>
                    <Button size="sm" variant="outline" className="rounded-lg" asChild>
                    <Link href="/shop?category=social_media">
                        View Recommendations
                    </Link>
                    </Button>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
