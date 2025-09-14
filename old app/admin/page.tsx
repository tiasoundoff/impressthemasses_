
'use client'

import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Download,
  TrendingUp,
  Mail,
  Eye,
  Folder,
  Settings
} from 'lucide-react'

interface DashboardStats {
  totalPacks: number
  totalCustomers: number
  totalOrders: number
  totalRevenue: number
  totalDownloads: number
  totalLeads: number
  recentActivity: ActivityItem[]
}

interface ActivityItem {
  id: string
  type: 'order' | 'signup' | 'upload' | 'download'
  description: string
  timestamp: string
  amount?: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-32 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  const statCards = [
    {
      title: 'Total Packs',
      value: stats?.totalPacks || 0,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Customers',
      value: stats?.totalCustomers || 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Revenue',
      value: `$${((stats?.totalRevenue || 0) / 100).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-brand-accent',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Total Downloads',
      value: stats?.totalDownloads || 0,
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Lead Captures',
      value: stats?.totalLeads || 0,
      icon: Mail,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return ShoppingCart
      case 'signup': return Users
      case 'upload': return Package
      case 'download': return Download
      default: return Eye
    }
  }

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-primary mb-2">
            Dashboard Overview
          </h1>
          <p className="text-brand-primary-light">
            Welcome to your ImpressTheMasses admin panel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-brand-primary-light mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-brand-primary">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-brand-accent" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity?.length ? (
                  stats.recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type)
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-brand-neutral-light">
                        <div className="bg-brand-accent/10 p-2 rounded-full">
                          <Icon className="h-4 w-4 text-brand-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-brand-primary">
                            {activity.description}
                          </p>
                          <p className="text-xs text-brand-primary-light">
                            {formatActivityTime(activity.timestamp)}
                          </p>
                          {activity.amount && (
                            <p className="text-sm text-brand-accent font-semibold">
                              ${(activity.amount / 100).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-brand-primary-light text-center py-8">
                    No recent activity
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Admin Area Links */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-brand-primary flex items-center">
                <Package className="h-5 w-5 mr-2 text-brand-accent" />
                Admin Areas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="/admin/packs"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <Package className="h-4 w-4 text-blue-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">Digital Packs</h3>
                      <p className="text-xs text-brand-primary-light">Manage products</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/admin/customers"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <Users className="h-4 w-4 text-green-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">Customers</h3>
                      <p className="text-xs text-brand-primary-light">User management</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/admin/orders"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-purple-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <ShoppingCart className="h-4 w-4 text-purple-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">Orders</h3>
                      <p className="text-xs text-brand-primary-light">Sales tracking</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/admin/leads"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <Mail className="h-4 w-4 text-indigo-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">Email Leads</h3>
                      <p className="text-xs text-brand-primary-light">Lead magnets</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/admin/files"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <Folder className="h-4 w-4 text-orange-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">File Storage</h3>
                      <p className="text-xs text-brand-primary-light">Asset management</p>
                    </div>
                  </div>
                </a>

                <a
                  href="/admin/support"
                  className="block p-4 rounded-lg border border-brand-neutral hover:border-brand-accent hover:bg-brand-accent/5 transition-colors duration-300 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-pink-50 p-2 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                      <Mail className="h-4 w-4 text-pink-600 group-hover:text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-primary text-sm">Support</h3>
                      <p className="text-xs text-brand-primary-light">Customer inquiries</p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-brand-neutral">
                <a
                  href="/admin/settings"
                  className="flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-brand-accent to-brand-accent-dark text-white hover:shadow-lg transition-all duration-300 group"
                >
                  <Settings className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="font-semibold text-sm">Platform Settings</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
