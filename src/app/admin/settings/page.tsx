
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Save, Settings, CreditCard, Mail, Shield, Globe } from 'lucide-react'

export default function AdminSettingsPage() {

  const handleSave = () => {
    alert('This is a demo. In a real application, this would save the settings.');
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2">
              Platform Settings
            </h1>
            <p className="text-brand-primary-light">
              Configure your platform settings and integrations
            </p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-brand-primary">
                <Settings className="h-5 w-5 mr-2 text-brand-accent" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Site Name" disabled />
                <Textarea placeholder="Site Description" disabled />
            </CardContent>
          </Card>

          {/* Payment Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-brand-primary">
                <CreditCard className="h-5 w-5 mr-2 text-brand-accent" />
                Payment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Stripe Public Key" disabled />
                <Input placeholder="Stripe Secret Key" type="password" disabled />
            </CardContent>
          </Card>

          {/* Email Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-brand-primary">
                <Mail className="h-5 w-5 mr-2 text-brand-accent" />
                Email Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="SMTP Host" disabled />
                <Input placeholder="SMTP Port" disabled />
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-brand-primary">
                <Globe className="h-5 w-5 mr-2 text-brand-accent" />
                SEO & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Meta Title" disabled />
                <Textarea placeholder="Meta Description" disabled />
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-bold text-brand-primary">
                <Shield className="h-5 w-5 mr-2 text-brand-accent" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-brand-primary">Two-Factor Authentication</h4>
                  <p className="text-sm text-brand-primary-light">Require 2FA for admin accounts</p>
                </div>
                <Switch disabled />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-brand-primary">Email Notifications</h4>
                  <p className="text-sm text-brand-primary-light">Send email alerts for admin actions</p>
                </div>
                <Switch disabled />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
