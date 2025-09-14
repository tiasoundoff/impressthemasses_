
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart } from 'lucide-react'

export default function AdminOrdersPage() {

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Orders Management
            </h1>
            <p className="text-brand-primary-light">
              View and manage customer orders
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search orders by customer email or product..."
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">All Orders</Button>
                <Button variant="outline" size="sm">Completed</Button>
                <Button variant="outline" size="sm">Pending</Button>
                <Button variant="outline" size="sm">Failed</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List - Empty State */}
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-primary mb-2">No orders found</h3>
          <p className="text-brand-primary-light mb-6">
            No orders have been placed yet.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
