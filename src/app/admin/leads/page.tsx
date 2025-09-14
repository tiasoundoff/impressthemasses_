
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Download, Mail, UserCheck, TrendingUp } from 'lucide-react'

export default function AdminLeadsPage() {

  const handleExportCSV = () => {
    alert('This is a demo. In a real application, this would export the leads to a CSV file.');
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Lead Management
            </h1>
            <p className="text-brand-primary-light">
              Manage your email captures and lead conversion
            </p>
          </div>
          <Button
            onClick={handleExportCSV}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">Total Leads</p>
                    <p className="text-3xl font-bold text-brand-primary">0</p>
                  </div>
                  <div className="p-3 rounded-full bg-brand-accent/10">
                    <Mail className="h-6 w-6 text-brand-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">Converted</p>
                    <p className="text-3xl font-bold text-green-600">0</p>
                  </div>
                  <div className="p-3 rounded-full bg-green-50">
                    <UserCheck className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-brand-primary-light mb-1">Conversion Rate</p>
                    <p className="text-3xl font-bold text-blue-600">0%</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-50">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-brand-primary-light" />
                  <Input
                    placeholder="Search leads by email..."
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">All Sources</Button>
                <Button variant="outline" size="sm">Lead Magnet</Button>
                <Button variant="outline" size="sm">Checkout</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads List - Empty State */}
        <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary">
                Email Captures (0)
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-brand-primary mb-2">No leads found</h3>
                  <p className="text-brand-primary-light">
                    No email captures yet.
                  </p>
                </div>
            </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}
