
'use client'

import React from 'react'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Download,
  Mail,
  Folder,
  Settings
} from 'lucide-react'
import { getProducts } from '@/lib/local/db'

export default function AdminDashboard() {
  const products = getProducts();

  const statCards = [
    {
      title: 'Total Packs',
      value: products.length,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Customers',
      value: 0,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: 0,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Revenue',
      value: `$0.00`,
      icon: DollarSign,
      color: 'text-brand-accent',
      bgColor: 'bg-pink-50',
    },
    {
      title: 'Total Downloads',
      value: 0,
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Lead Captures',
      value: 0,
      icon: Mail,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ]

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
    </AdminLayout>
  )
}
