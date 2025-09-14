
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MessageSquare, Mail, CheckCircle, Clock } from 'lucide-react'

export default function AdminSupportPage() {

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Support Inbox
            </h1>
            <p className="text-brand-primary-light">
              Manage contact form submissions and customer support
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">Unread</p>
                  <p className="text-3xl font-bold text-brand-primary">0</p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10"><Mail className="h-6 w-6 text-brand-accent" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">Read</p>
                  <p className="text-3xl font-bold text-brand-primary">0</p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10"><MessageSquare className="h-6 w-6 text-brand-accent" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">Replied</p>
                  <p className="text-3xl font-bold text-brand-primary">0</p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10"><CheckCircle className="h-6 w-6 text-brand-accent" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">Closed</p>
                  <p className="text-3xl font-bold text-brand-primary">0</p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10"><Clock className="h-6 w-6 text-brand-accent" /></div>
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
                    placeholder="Search by name, email, or subject..."
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="default" size="sm">All Messages</Button>
                <Button variant="outline" size="sm">Unread</Button>
                <Button variant="outline" size="sm">Replied</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List - Empty State */}
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-brand-primary mb-2">No messages found</h3>
          <p className="text-brand-primary-light">
            No support messages have been received yet.
          </p>
        </div>

      </div>
    </AdminLayout>
  )
}
