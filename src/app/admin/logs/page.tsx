
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Activity } from 'lucide-react'

export default function AdminLogsPage() {

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Admin Activity Logs
            </h1>
            <p className="text-brand-primary-light">
              View all admin actions and system activities
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
                    placeholder="Search by user, entity, or details..."
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                  <Button variant="default" size="sm">All Actions</Button>
                  <Button variant="outline" size="sm">Create</Button>
                  <Button variant="outline" size="sm">Update</Button>
                  <Button variant="outline" size="sm">Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logs List - Empty State */}
        <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary flex items-center">
                <Activity className="h-5 w-5 mr-2 text-brand-accent" />
                Activity Log (0 entries)
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">No activity logs found</h3>
                  <p className="text-brand-primary-light">
                    No admin activity recorded yet.
                  </p>
                </div>
            </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}
