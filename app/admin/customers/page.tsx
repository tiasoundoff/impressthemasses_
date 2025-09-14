
'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  DollarSign,
  Download,
  MoreVertical,
  Users
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from '@/hooks/use-toast'

interface Customer {
  id: string
  name: string | null
  email: string
  firstName: string | null
  lastName: string | null
  role: string
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  _count: {
    orders: number
  }
  orders: {
    amount: number
    status: string
    createdAt: string
  }[]
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const router = useRouter()

  const statusOptions = [
    { id: 'all', name: 'All Customers' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' }
  ]

  useEffect(() => {
    fetchCustomers()
  }, [searchQuery, selectedStatus])

  const fetchCustomers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...(selectedStatus !== 'all' && { status: selectedStatus })
      })
      
      const response = await fetch(`/api/admin/customers?${params}`)
      if (response.ok) {
        const data = await response.json()
        setCustomers(data.customers || [])
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusToggle = async (customerId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        setCustomers(customers.map(customer => 
          customer.id === customerId ? { ...customer, isActive: !isActive } : customer
        ))
        toast({
          title: "Success",
          description: `Customer ${!isActive ? 'activated' : 'deactivated'} successfully`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive",
      })
    }
  }

  const calculateCustomerValue = (orders: Customer['orders']) => {
    return orders
      .filter(order => order.status === 'completed')
      .reduce((total, order) => total + order.amount, 0)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getCustomerDisplayName = (customer: Customer) => {
    if (customer.firstName && customer.lastName) {
      return `${customer.firstName} ${customer.lastName}`
    }
    return customer.name || customer.email.split('@')[0]
  }

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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                {statusOptions.map((status) => (
                  <Button
                    key={status.id}
                    variant={selectedStatus === status.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    {status.name}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customers List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-24 animate-pulse border border-brand-neutral"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {customers.map((customer) => {
              const customerValue = calculateCustomerValue(customer.orders)
              const totalOrders = customer._count.orders
              
              return (
                <Card key={customer.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-brand-accent to-brand-accent-dark rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {getCustomerDisplayName(customer).charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-brand-primary">
                              {getCustomerDisplayName(customer)}
                            </h3>
                            <Badge variant={customer.isActive ? "default" : "secondary"}>
                              {customer.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                          <p className="text-sm text-brand-primary-light">
                            {customer.email}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-brand-primary-light">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Joined {formatDate(customer.createdAt)}
                            </span>
                            {customer.lastLoginAt && (
                              <span className="flex items-center gap-1">
                                <UserCheck className="h-3 w-3" />
                                Last login {formatDate(customer.lastLoginAt)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-8">
                        {/* Stats */}
                        <div className="text-center">
                          <p className="text-2xl font-bold text-brand-primary">
                            {totalOrders}
                          </p>
                          <p className="text-xs text-brand-primary-light">Orders</p>
                        </div>

                        <div className="text-center">
                          <p className="text-2xl font-bold text-brand-accent">
                            ${(customerValue / 100).toFixed(0)}
                          </p>
                          <p className="text-xs text-brand-primary-light">Total Spent</p>
                        </div>

                        {/* Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem 
                              onClick={() => router.push(`/admin/customers/${customer.id}`)}
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={() => handleStatusToggle(customer.id, customer.isActive)}
                            >
                              {customer.isActive ? (
                                <>
                                  <UserX className="h-4 w-4 mr-2" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {customers.length === 0 && !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-brand-primary-light mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-brand-primary mb-2">No customers found</h3>
            <p className="text-brand-primary-light mb-6">
              {searchQuery || selectedStatus !== 'all' 
                ? 'No customers match your current filters.' 
                : 'No customers have signed up yet.'
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
