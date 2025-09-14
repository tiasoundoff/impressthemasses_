
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Save,
  Settings,
  CreditCard,
  Mail,
  Shield,
  Palette,
  Globe,
  Bell
} from 'lucide-react'
import { toast } from '@/hooks/use-toast'

interface PlatformSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  supportEmail: string
  companyName: string
  companyAddress: string
  socialMediaLinks: {
    twitter: string
    instagram: string
    linkedin: string
  }
  emailSettings: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  stripeSettings: {
    publicKey: string
    secretKey: string
    webhookSecret: string
  }
  seoSettings: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalyticsId: string
    facebookPixelId: string
  }
  securitySettings: {
    enableTwoFactorAuth: boolean
    sessionTimeout: number
    maxLoginAttempts: number
    enableEmailNotifications: boolean
  }
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSettings>({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    supportEmail: '',
    companyName: '',
    companyAddress: '',
    socialMediaLinks: {
      twitter: '',
      instagram: '',
      linkedin: ''
    },
    emailSettings: {
      smtpHost: '',
      smtpPort: '',
      smtpUsername: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: ''
    },
    stripeSettings: {
      publicKey: '',
      secretKey: '',
      webhookSecret: ''
    },
    seoSettings: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      googleAnalyticsId: '',
      facebookPixelId: ''
    },
    securitySettings: {
      enableTwoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableEmailNotifications: true
    }
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...settings, ...data.settings })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Settings updated successfully",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateSettings = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof PlatformSettings] === 'object' 
        ? { ...prev[section as keyof PlatformSettings] as any, [field]: value }
        : value
    }))
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

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
            disabled={saving}
            className="bg-brand-accent hover:bg-brand-accent-dark"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Site Name
                  </label>
                  <Input
                    value={settings.siteName}
                    onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                    placeholder="ImpressTheMasses"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Company Name
                  </label>
                  <Input
                    value={settings.companyName}
                    onChange={(e) => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="ImpressTheMasses LLC"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Site Description
                </label>
                <Textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                  placeholder="Professional digital design templates for creators and businesses"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="hello@impressthemasses.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Support Email
                  </label>
                  <Input
                    type="email"
                    value={settings.supportEmail}
                    onChange={(e) => setSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                    placeholder="support@impressthemasses.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Company Address
                </label>
                <Textarea
                  value={settings.companyAddress}
                  onChange={(e) => setSettings(prev => ({ ...prev, companyAddress: e.target.value }))}
                  placeholder="123 Main St, City, State 12345"
                  rows={2}
                />
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Stripe Public Key
                  </label>
                  <Input
                    value={settings.stripeSettings.publicKey}
                    onChange={(e) => updateSettings('stripeSettings', 'publicKey', e.target.value)}
                    placeholder="pk_test_..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Stripe Secret Key
                  </label>
                  <Input
                    type="password"
                    value={settings.stripeSettings.secretKey}
                    onChange={(e) => updateSettings('stripeSettings', 'secretKey', e.target.value)}
                    placeholder="sk_test_..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Webhook Secret
                </label>
                <Input
                  type="password"
                  value={settings.stripeSettings.webhookSecret}
                  onChange={(e) => updateSettings('stripeSettings', 'webhookSecret', e.target.value)}
                  placeholder="whsec_..."
                />
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    SMTP Host
                  </label>
                  <Input
                    value={settings.emailSettings.smtpHost}
                    onChange={(e) => updateSettings('emailSettings', 'smtpHost', e.target.value)}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    SMTP Port
                  </label>
                  <Input
                    value={settings.emailSettings.smtpPort}
                    onChange={(e) => updateSettings('emailSettings', 'smtpPort', e.target.value)}
                    placeholder="587"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    From Email
                  </label>
                  <Input
                    type="email"
                    value={settings.emailSettings.fromEmail}
                    onChange={(e) => updateSettings('emailSettings', 'fromEmail', e.target.value)}
                    placeholder="noreply@impressthemasses.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    From Name
                  </label>
                  <Input
                    value={settings.emailSettings.fromName}
                    onChange={(e) => updateSettings('emailSettings', 'fromName', e.target.value)}
                    placeholder="ImpressTheMasses"
                  />
                </div>
              </div>
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
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Meta Title
                </label>
                <Input
                  value={settings.seoSettings.metaTitle}
                  onChange={(e) => updateSettings('seoSettings', 'metaTitle', e.target.value)}
                  placeholder="ImpressTheMasses - Digital Design Packs for Creators"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-primary mb-2">
                  Meta Description
                </label>
                <Textarea
                  value={settings.seoSettings.metaDescription}
                  onChange={(e) => updateSettings('seoSettings', 'metaDescription', e.target.value)}
                  placeholder="Professional digital design templates for solo creators, coaches, and small businesses..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Google Analytics ID
                  </label>
                  <Input
                    value={settings.seoSettings.googleAnalyticsId}
                    onChange={(e) => updateSettings('seoSettings', 'googleAnalyticsId', e.target.value)}
                    placeholder="GA-XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Facebook Pixel ID
                  </label>
                  <Input
                    value={settings.seoSettings.facebookPixelId}
                    onChange={(e) => updateSettings('seoSettings', 'facebookPixelId', e.target.value)}
                    placeholder="123456789012345"
                  />
                </div>
              </div>
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
                  <p className="text-sm text-brand-primary-light">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch
                  checked={settings.securitySettings.enableTwoFactorAuth}
                  onCheckedChange={(checked) => updateSettings('securitySettings', 'enableTwoFactorAuth', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-brand-primary">Email Notifications</h4>
                  <p className="text-sm text-brand-primary-light">
                    Send email alerts for admin actions
                  </p>
                </div>
                <Switch
                  checked={settings.securitySettings.enableEmailNotifications}
                  onCheckedChange={(checked) => updateSettings('securitySettings', 'enableEmailNotifications', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Session Timeout (minutes)
                  </label>
                  <Input
                    type="number"
                    value={settings.securitySettings.sessionTimeout}
                    onChange={(e) => updateSettings('securitySettings', 'sessionTimeout', parseInt(e.target.value))}
                    min="5"
                    max="480"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-primary mb-2">
                    Max Login Attempts
                  </label>
                  <Input
                    type="number"
                    value={settings.securitySettings.maxLoginAttempts}
                    onChange={(e) => updateSettings('securitySettings', 'maxLoginAttempts', parseInt(e.target.value))}
                    min="3"
                    max="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
