
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, UserPlus } from 'lucide-react'

export default function AdminManagementPage() {

  const handleInvite = () => {
    alert('This is a demo. In a real application, this would open an invitation dialog.');
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Admin Management
            </h1>
            <p className="text-brand-primary-light">
              Manage admin users and permissions
            </p>
          </div>
          <Button 
            onClick={handleInvite}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Invite Admin
          </Button>
        </div>

        {/* Stats - Simplified for static display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-primary-light mb-1">
                    Total Admins
                  </p>
                  <p className="text-3xl font-bold text-brand-primary">0</p>
                </div>
                <div className="p-3 rounded-full bg-brand-accent/10">
                  <Shield className="h-6 w-6 text-brand-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
           {/* Add other static stat cards if needed */}
        </div>

        {/* Admins List - Empty State */}
        <div className="text-center py-12">
            <Shield className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No admins found</h3>
            <p className="text-brand-primary-light mb-6">
              No admin users have been created yet.
            </p>
            <Button 
              onClick={handleInvite}
              className="bg-brand-accent hover:bg-brand-accent-dark"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite First Admin
            </Button>
          </div>
      </div>
    </AdminLayout>
  )
}
