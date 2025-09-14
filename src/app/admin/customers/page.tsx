
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Users } from 'lucide-react'

export default function AdminCustomersPage() {
  // Since we are not fetching real data, we'll display a static empty state.
  // The search and filter functionality will be for display purposes only.

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Customers Management
            </h1>
            <p className="text-brand-primary-light">
              View and manage your customers
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
                    placeholder="Search customers by name or email..."
                    className="pl-10"
                    disabled // Disabled as it's a static page
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">All Customers</Button>
                <Button variant="outline" size="sm">Active</Button>
                <Button variant="outline" size="sm">Inactive</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List - Empty State */}
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-primary mb-2">No customers found</h3>
          <p className="text-brand-primary-light mb-6">
            No customers have signed up yet.
          </p>
        </div>
      </div>
    </AdminLayout>
  )
}
